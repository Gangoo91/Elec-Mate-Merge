-- The 50%-off code schemes, split properly.
--
-- 🔴 Two schemes share this table and the first version conflated them: codes
-- ending ELEC50 are mostly the EMPLOYER scheme (Dodd Group, Kane Group, SES
-- Engineering…), not colleges, so counting them as colleges reported 159
-- colleges against a real 143 codes over ~140 organisations.
--
-- 🔴 Tier comes from the PRICE, not the code suffix. ESSEXELEC50 ends ELEC50 but
-- is priced £3.50, so the suffix is not a reliable signal; £3.50 is the
-- apprentice rate and £9.99 the electrician rate, both 50% of list.
--
-- 🔴 `promo_offers.redemptions` is NOT the source of truth and is not returned.
-- It is written at creation and never updated — every row reads 0 while Stripe
-- records a redemption on KENDAL50. Take-up comes from the Stripe promotion
-- codes in admin-stripe-stats and the page joins on the code.
create or replace function public.get_college_scheme()
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  payload jsonb;
begin
  if not exists (select 1 from profiles where id = auth.uid() and admin_role is not null) then
    raise exception 'not authorized';
  end if;

  with codes as (
    select
      o.code,
      case
        when o.name ilike 'Employer scheme%' then 'employer'
        when o.name ilike 'College scheme%'  then 'college'
        else 'other'
      end as scheme,
      -- "College scheme 50%: Barnsley College" → "Barnsley College";
      -- "Employer scheme 50%: Kane Group (Electrician)" → "Kane Group".
      btrim(
        regexp_replace(
          regexp_replace(o.name, '^(College|Employer) scheme 50%:\s*', ''),
          '\s*\((Electrician|Apprentice)\)\s*$', ''
        )
      ) as org,
      o.price,
      case when o.price >= 9 then 'electrician' else 'apprentice' end as tier,
      o.is_active,
      o.created_at
    from promo_offers o
  )
  select jsonb_build_object(
    'codes', (
      select coalesce(jsonb_agg(to_jsonb(c) order by c.org, c.tier), '[]'::jsonb) from codes c
    ),
    'colleges',  (select count(distinct org)::int from codes where scheme = 'college'),
    'employers', (select count(distinct org)::int from codes where scheme = 'employer'),
    'apprentice_price',  (select max(price) filter (where tier = 'apprentice')  from codes),
    'electrician_price', (select max(price) filter (where tier = 'electrician') from codes),
    'generated_at', now()
  )
  into payload;

  return payload;
end;
$function$;

grant execute on function public.get_college_scheme() to authenticated;

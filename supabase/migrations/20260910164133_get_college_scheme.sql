-- The college 50% scheme catalogue: which college each code belongs to.
--
-- 🔴 `promo_offers.redemptions` is NOT the source of truth and must not be shown.
-- It is written at creation and never updated — every row reads 0 while Stripe
-- records a redemption on KENDAL50. This function supplies the names, prices and
-- tiers; take-up comes from the Stripe promotion codes in admin-stripe-stats and
-- the page joins the two on the code.
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
      -- Names are stored as "College scheme 50%: Barnsley College".
      btrim(regexp_replace(o.name, '^College scheme 50%:\s*', '')) as college,
      o.price,
      case when o.code like '%ELEC50' then 'electrician' else 'apprentice' end as tier,
      o.is_active,
      o.created_at
    from promo_offers o
  )
  select jsonb_build_object(
    'codes', (select coalesce(jsonb_agg(to_jsonb(c) order by c.college, c.tier), '[]'::jsonb) from codes c),
    'colleges', (select count(distinct college)::int from codes),
    'apprentice_price', (select max(price) filter (where tier = 'apprentice') from codes),
    'electrician_price', (select max(price) filter (where tier = 'electrician') from codes),
    'generated_at', now()
  )
  into payload;

  return payload;
end;
$function$;

grant execute on function public.get_college_scheme() to authenticated;

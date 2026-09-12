-- Employer scheme (30% apprentice / 40% electrician, 11 Sep 2026).
-- 1. get_college_scheme only stripped "… scheme 50%:" so the new employer
--    names ("Employer scheme 30%: NG Bailey (Apprentice)") came through with
--    the prefix still on. Strip any percentage.
-- 2. employer_outreach: the tracker's Employers tab, same shape as
--    college_outreach, synced by outreach-tracker/sync_outreach.py.
create or replace function public.get_college_scheme()
 returns jsonb
 language plpgsql
 stable security definer
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
      btrim(
        regexp_replace(
          regexp_replace(o.name, '^(College|Employer) scheme \d+%:\s*', ''),
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
    'codes', (select coalesce(jsonb_agg(to_jsonb(c) order by c.org, c.tier), '[]'::jsonb) from codes c),
    'colleges',  (select count(distinct org)::int from codes where scheme = 'college'),
    'employers', (select count(distinct org)::int from codes where scheme = 'employer'),
    'apprentice_price',  (select max(price) filter (where tier = 'apprentice')  from codes),
    'electrician_price', (select max(price) filter (where tier = 'electrician') from codes),
    'generated_at', now()
  ) into payload;
  return payload;
end;
$function$;

create table if not exists public.employer_outreach (like public.college_outreach including all);
alter table public.employer_outreach add column if not exists electrician_code text;
comment on table public.employer_outreach is 'Employers rows from the outreach tracker (tracker6.json), synced by outreach-tracker/sync_outreach.py.';
alter table public.employer_outreach enable row level security;

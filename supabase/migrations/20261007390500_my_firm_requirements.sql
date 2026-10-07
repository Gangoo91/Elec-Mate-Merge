-- ELE-2006: the worker's firm requirements (competence_requirement_sets) vs what they hold.
create or replace function public.get_my_firm_requirements()
returns jsonb
language sql
stable
security definer
set search_path = public
as $fn$
  select coalesce(jsonb_agg(jsonb_build_object(
           'employer_id', e.employer_id,
           'company_name', coalesce(nullif(trim(cp.company_name), ''), nullif(trim(p.full_name), ''), 'Your firm'),
           'set_name', s.name,
           'preset_id', s.preset_id,
           'credential_keys', to_jsonb(s.credential_keys),
           'horizon_days', s.horizon_days)
         order by e.created_at), '[]'::jsonb)
    from public.employer_employees e
    join lateral (
      select c.* from public.competence_requirement_sets c
       where c.employer_id = e.employer_id
       order by c.updated_at desc nulls last
       limit 1) s on true
    left join public.profiles p on p.id = e.employer_id
    left join public.company_profiles cp on cp.user_id = e.employer_id
   where auth.uid() is not null
     and e.user_id = auth.uid()
     and e.employer_id is not null
     and lower(coalesce(e.status, '')) <> 'archived'
     and coalesce(array_length(s.credential_keys, 1), 0) > 0;
$fn$;
revoke all on function public.get_my_firm_requirements() from public, anon;
grant execute on function public.get_my_firm_requirements() to authenticated;

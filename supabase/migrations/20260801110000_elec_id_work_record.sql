-- Work Record (opt-in): identity backed by production. Certificate COUNTS
-- only — no client data, no addresses — computed live from reports at view
-- time so the number is always current and unfakeable.

alter table public.employer_elec_id_profiles
  add column if not exists work_record_public boolean not null default false;

create or replace function public.get_elec_id_work_record(p_profile_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_user uuid;
  v_public boolean;
  result jsonb;
begin
  select e.user_id, pr.work_record_public into v_user, v_public
  from employer_elec_id_profiles pr
  join employer_employees e on e.id = pr.employee_id
  where pr.id = p_profile_id and pr.opt_out = false;

  if v_user is null or not coalesce(v_public, false) then
    return null;
  end if;

  select jsonb_build_object(
    'total_12mo', count(*) filter (where r.created_at > now() - interval '12 months'),
    'total_all', count(*),
    'active_since', to_char(min(r.created_at), 'YYYY'),
    'by_type_12mo', coalesce((
      select jsonb_object_agg(t.report_type, t.n)
      from (
        select r2.report_type, count(*) as n
        from public.reports r2
        where r2.user_id = v_user and r2.deleted_at is null
          and r2.created_at > now() - interval '12 months'
        group by r2.report_type
        order by count(*) desc
        limit 6
      ) t
    ), '{}'::jsonb)
  ) into result
  from public.reports r
  where r.user_id = v_user and r.deleted_at is null;

  return result;
end;
$$;

grant execute on function public.get_elec_id_work_record(uuid) to anon, authenticated;

create or replace function public.set_my_work_record_public(p_public boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update employer_elec_id_profiles pr
     set work_record_public = p_public
    from employer_employees e
   where e.id = pr.employee_id and e.user_id = auth.uid();
end;
$$;

revoke execute on function public.set_my_work_record_public(boolean) from public, anon;
grant execute on function public.set_my_work_record_public(boolean) to authenticated;

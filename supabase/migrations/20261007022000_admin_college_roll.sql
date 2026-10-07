-- ELE-1901 follow-up: Admin → Bulk create shows each college's learner count
-- and lists its cohorts. Those reads ran as the platform admin straight on
-- college_students / college_cohorts, whose RLS only admits staff of that
-- college, so every other college showed 0 learners and no cohorts. Serve
-- them from one SECURITY DEFINER function gated on _is_platform_admin().

create or replace function public.admin_college_roll()
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
begin
  if not public._is_platform_admin() then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  return jsonb_build_object(
    'counts', coalesce((
      select jsonb_object_agg(college_id, n) from (
        select cs.college_id, count(*) n from college_students cs
         where lower(coalesce(cs.status, 'active')) not in ('withdrawn', 'archived')
         group by cs.college_id) t), '{}'::jsonb),
    'cohorts', coalesce((
      select jsonb_agg(jsonb_build_object('id', c.id, 'college_id', c.college_id, 'name', c.name) order by c.name)
        from college_cohorts c), '[]'::jsonb)
  );
end;
$$;

revoke all on function public.admin_college_roll() from public, anon;
grant execute on function public.admin_college_roll() to authenticated;

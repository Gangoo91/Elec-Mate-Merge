-- Funding rules para 89: off-the-job training must happen in every calendar
-- month (two months without any needs a break in learning). The cohort page
-- shows who has had none this month, from any counted source.
-- Applied live as migration otj_college_monthly_activity.
drop function if exists public.get_college_otj(uuid);
create function public.get_college_otj(p_cohort uuid default null)
returns table (
  college_student_id uuid, user_id uuid, name text, cohort_id uuid, cohort_name text,
  summary jsonb, areas_30_days jsonb, unapproved_app_hours numeric, last_learning_at date,
  last_training_at date, trained_this_month boolean)
language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_college uuid;
  v_month_start date := date_trunc('month', (now() at time zone 'Europe/London'))::date;
begin
  select p.college_id into v_college from profiles p
   where p.id = auth.uid() and p.college_role is not null;
  if v_college is null and not public._is_platform_admin() then
    raise exception 'not authorised' using errcode = '42501';
  end if;

  return query
  with learners as (
    select s.id, s.user_id, coalesce(nullif(trim(s.name), ''), 'Learner') as name, s.cohort_id, c.name as cohort_name
      from college_students s
      left join college_cohorts c on c.id = s.cohort_id
     where s.user_id is not null
       and (v_college is null or s.college_id = v_college)
       and (p_cohort is null or s.cohort_id = p_cohort)
       and lower(coalesce(s.status, '')) not in ('withdrawn', 'completed', 'archived')
  ), app as (
    select t.user_id,
           sum(t.duration) filter (where not exists (select 1 from otj_capture_links l where l.time_entry_id = t.id)) as unapproved_min,
           max(t.date) filter (where not exists (
             select 1 from otj_capture_links l join college_otj_entries e on e.id = l.otj_entry_id
              where l.time_entry_id = t.id and e.verification_status = 'rejected')) as last_day
      from time_entries t
     where public._otj_is_measured(t.is_automatic, t.notes) and coalesce(t.duration, 0) > 0
       and t.user_id in (select learners.user_id from learners)
     group by t.user_id
  ), entries as (
    select e.student_id as user_id, max(e.activity_date) as last_day
      from college_otj_entries e
     where e.student_id in (select learners.user_id from learners)
       and e.verification_status <> 'rejected'
     group by e.student_id
  ), areas as (
    select x.user_id, jsonb_object_agg(x.area, x.hours order by x.hours desc) as areas
      from (select t.user_id, public._otj_area(t.activity) as area, round(sum(t.duration) / 60.0, 1) as hours
              from time_entries t
             where public._otj_is_measured(t.is_automatic, t.notes) and coalesce(t.duration, 0) > 0
               and t.date >= (now() at time zone 'Europe/London')::date - 30
               and t.user_id in (select learners.user_id from learners)
             group by 1, 2) x
     where x.hours > 0
     group by x.user_id
  )
  select l.id, l.user_id, l.name, l.cohort_id, l.cohort_name,
         public.get_otj_summary(l.user_id),
         coalesce(a.areas, '{}'::jsonb),
         round(coalesce(app.unapproved_min, 0) / 60.0, 1),
         app.last_day,
         greatest(app.last_day, en.last_day),
         coalesce(greatest(app.last_day, en.last_day) >= v_month_start, false)
    from learners l
    left join app on app.user_id = l.user_id
    left join entries en on en.user_id = l.user_id
    left join areas a on a.user_id = l.user_id
   order by l.name;
end; $$;
grant execute on function public.get_college_otj(uuid) to authenticated;

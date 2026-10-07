-- ELE-1890 follow-up: taking a lesson's register marks the lesson taught.
--
-- 1. record_lesson_delivery() now also sets college_lesson_plans.status =
--    'delivered' when the delivery date is on or after the plan's scheduled
--    date (or the plan has no date). 'delivered' is already allowed by
--    college_lesson_plans_status_check (draft/ready/published/delivered/archived).
--    Archived plans are left alone.
-- 2. undo_lesson_delivery(): the register sheet calls it when the last mark
--    for a lesson on a date is removed. It deletes that day's delivery only
--    if no attendance mark for the lesson + date remains, and puts the plan
--    back to 'ready' when no delivery on or after its scheduled date is left.
-- 3. The table comment now says what really reads the table.

create or replace function public.record_lesson_delivery(p_lesson uuid, p_date date default null)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_college uuid;
  v_cohort uuid;
  v_sched date;
  v_id uuid;
  v_date date := coalesce(p_date, (now() at time zone 'Europe/London')::date);
  v_acs text[];
begin
  select lp.college_id, lp.cohort_id, lp.scheduled_date into v_college, v_cohort, v_sched
    from college_lesson_plans lp where lp.id = p_lesson;
  if v_college is null then
    raise exception 'lesson not found' using errcode = 'P0002';
  end if;
  if not exists (select 1 from college_staff cs
                  where cs.user_id = auth.uid() and cs.college_id = v_college
                    and cs.archived_at is null and lower(cs.status) = 'active') then
    raise exception 'not authorised' using errcode = '42501';
  end if;

  select coalesce(array_agg(distinct m.ac_code order by m.ac_code), '{}')
    into v_acs from lesson_plan_ac_mapping m where m.lesson_plan_id = p_lesson;

  insert into college_lesson_deliveries (college_id, lesson_plan_id, cohort_id, delivered_on, recorded_by, ac_codes)
  values (v_college, p_lesson, v_cohort, v_date, auth.uid(), v_acs)
  on conflict (lesson_plan_id, delivered_on)
    do update set ac_codes = excluded.ac_codes
  returning id into v_id;

  if v_sched is null or v_date >= v_sched then
    update college_lesson_plans
       set status = 'delivered'
     where id = p_lesson and status is distinct from 'delivered' and status is distinct from 'archived';
  end if;
  return v_id;
end;
$$;

revoke all on function public.record_lesson_delivery(uuid, date) from public, anon;
grant execute on function public.record_lesson_delivery(uuid, date) to authenticated;

create or replace function public.undo_lesson_delivery(p_lesson uuid, p_date date)
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_college uuid;
  v_removed int := 0;
begin
  select lp.college_id into v_college from college_lesson_plans lp where lp.id = p_lesson;
  if v_college is null then
    raise exception 'lesson not found' using errcode = 'P0002';
  end if;
  if not exists (select 1 from college_staff cs
                  where cs.user_id = auth.uid() and cs.college_id = v_college
                    and cs.archived_at is null and lower(cs.status) = 'active') then
    raise exception 'not authorised' using errcode = '42501';
  end if;

  -- Only undo when the register for that lesson and day is really empty.
  if exists (select 1 from college_attendance a
              where a.lesson_plan_id = p_lesson and a.date = p_date) then
    return false;
  end if;

  delete from college_lesson_deliveries d
   where d.lesson_plan_id = p_lesson and d.delivered_on = p_date;
  get diagnostics v_removed = row_count;

  -- Back to 'ready' when no delivery that counts (on/after the scheduled date) is left.
  if not exists (select 1 from college_lesson_deliveries d
                   join college_lesson_plans lp on lp.id = d.lesson_plan_id
                  where d.lesson_plan_id = p_lesson
                    and (lp.scheduled_date is null or d.delivered_on >= lp.scheduled_date)) then
    update college_lesson_plans
       set status = 'ready'
     where id = p_lesson and status = 'delivered';
  end if;
  return v_removed > 0;
end;
$$;

revoke all on function public.undo_lesson_delivery(uuid, date) from public, anon;
grant execute on function public.undo_lesson_delivery(uuid, date) to authenticated;

comment on table public.college_lesson_deliveries is
  '[COLLEGE] A lesson actually taught: one row per lesson plan per date, written when its register is taken, with the criteria the lesson covers. Scope: per college. Written by: record_lesson_delivery (register sheet, which also sets college_lesson_plans.status = ''delivered''); removed by undo_lesson_delivery when that day''s register is emptied. Read by: Lesson plans list (LessonPlansSection, "Taught <date>") and undo_lesson_delivery; other screens use college_lesson_plans.status = ''delivered''. Rule: no direct writes; staff of the college read.';

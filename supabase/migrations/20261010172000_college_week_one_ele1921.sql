-- ELE-1921: the week-one playbook for a signed college, mirrored in the app.
-- The set-up checklist on the College Hub home groups its steps into days 1
-- to 5. Days 1 and 2 read get_college_setup_status; days 3 to 5 need a few
-- more counts, and day 5 ("review the month in numbers with your head of
-- department") is a person's tick, saved on the college.
--
-- Additive only: two new functions; the tick lives in colleges.settings
-- under week_one (the same jsonb the set-up dismissal already uses).

create or replace function public.get_college_week_one_status(p_college uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_college uuid := coalesce(p_college,
    (select college_id from college_staff where user_id = auth.uid() and archived_at is null order by created_at limit 1));
  v_learners uuid[];
begin
  if v_college is null or not public._review_staff_can(v_college) then
    return null;
  end if;
  select coalesce(array_agg(user_id), '{}') into v_learners
    from college_students where college_id = v_college and user_id is not null;

  return jsonb_build_object(
    'college_id', v_college,
    'provider_type', (select provider_type from colleges where id = v_college),
    'employers', (select count(*) from college_employers where college_id = v_college),
    'lessons_scheduled', (select count(*) from college_lesson_plans
                           where college_id = v_college and scheduled_date is not null),
    'hours_logged', (select count(*) from time_entries where user_id = any (v_learners)),
    'evidence_submitted', (select count(*) from portfolio_submissions
                            where user_id = any (v_learners) and submitted_at is not null),
    'decisions', (select count(*) from portfolio_assessment_decisions where learner_id = any (v_learners)),
    'value_reviewed_at', (select settings->'week_one'->>'value_reviewed_at' from colleges where id = v_college)
  );
end;
$$;
revoke all on function public.get_college_week_one_status(uuid) from public, anon;
grant execute on function public.get_college_week_one_status(uuid) to authenticated;

-- Day 5 tick. Any staff member at the college may tick or untick it.
create or replace function public.mark_college_week_one(p_college uuid, p_key text, p_done boolean default true)
returns void
language plpgsql
volatile
security definer
set search_path to 'public'
as $$
begin
  if p_key not in ('value_reviewed_at') then
    raise exception 'Unknown week-one step %', p_key;
  end if;
  if not public._review_staff_can(p_college) then
    raise exception 'Only staff at this college can do that' using errcode = '42501';
  end if;
  update colleges
     set settings = jsonb_set(
           coalesce(settings, '{}'::jsonb),
           '{week_one}',
           case when p_done
                then coalesce(settings->'week_one', '{}'::jsonb) || jsonb_build_object(p_key, now())
                else coalesce(settings->'week_one', '{}'::jsonb) - p_key end,
           true),
         updated_at = now()
   where id = p_college;
end;
$$;
revoke all on function public.mark_college_week_one(uuid, text, boolean) from public, anon;
grant execute on function public.mark_college_week_one(uuid, text, boolean) to authenticated;

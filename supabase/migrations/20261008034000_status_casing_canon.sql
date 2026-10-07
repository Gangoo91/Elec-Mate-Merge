-- Status casing: one canonical value set per College Hub status column.
--
-- Mixed case ('Active' vs 'active', 'Present' vs 'present', 'High' vs 'high')
-- caused a run of bugs. The fix lives in the database:
--   1. public._canon_value() maps any casing / spacing / _ / - variant of an
--      allowed value (plus a few named aliases) to its canonical spelling.
--   2. A BEFORE INSERT/UPDATE trigger "a0_canon_case" on each table rewrites
--      the column to canonical, so old app builds that write the wrong
--      casing keep working. Named a0_* so it fires before every other
--      BEFORE trigger (they fire in name order).
--   3. Existing rows are normalised and a CHECK lists the allowed values,
--      so a genuinely unknown value is rejected rather than stored.
--
-- Canonical sets (title case where the app already writes and displays it,
-- lower snake_case where the table's CHECK already says so):
--   college_students.status        Active | Break in learning | Suspended | Withdrawn | Completed | Transferred | Archived
--   college_students.risk_level    Low | Medium | High | Critical
--   college_cohorts.status         Planning | Active | Completed | Archived
--   college_courses.status         Active | Inactive | Archived
--   college_ilps.status            draft | active | archived | completed
--   college_grades.status          Pending | Submitted | Graded | Verified | Resubmission  ('final' -> Graded)
--   college_grades.grade           Distinction | Merit | Pass | Competent | Refer | Not Yet Competent | Fail  ('referred' -> Refer)
--   college_grades.assessment_type lower snake_case ('Practical Assessment' -> practical); not constrained
--   college_epa.result             Distinction | Merit | Pass | Fail
--   college_standardisation_meetings.status  scheduled | held | completed | cancelled
--   (already CHECKed, now also normalised on write) college_attendance.status,
--   college_staff.status, college_epa.status, college_iqa_findings.status/
--   finding_type/severity, college_scheduled_assessments.status/assessment_type,
--   college_work_queue_state.status, college_student_assignments.status,
--   student_risk_scores.level, college_ilp_goals.status/priority/category.

begin;

-- ── 1. Helper ───────────────────────────────────────────────────────────
create or replace function public._canon_value(p_val text, p_allowed text[], p_aliases jsonb default '{}'::jsonb)
returns text
language sql
immutable
parallel safe
set search_path = ''
as $$
  -- Key = lower case, trimmed, runs of space/_/- collapsed to one space.
  select case
    when p_val is null then null
    else coalesce(
      p_aliases ->> k.key,
      (select a from unnest(p_allowed) a
        where lower(regexp_replace(btrim(a), '[\s_-]+', ' ', 'g')) = k.key
        limit 1),
      p_val)
  end
  from (select lower(regexp_replace(btrim(coalesce(p_val, '')), '[\s_-]+', ' ', 'g')) as key) k
$$;
comment on function public._canon_value(text, text[], jsonb) is
  'Status casing: returns the canonical spelling from p_allowed that matches p_val ignoring case, spaces, _ and -, or an alias (keys in the same normalised form); otherwise p_val unchanged (so a CHECK can reject it). Used by the a0_canon_case triggers.';
revoke all on function public._canon_value(text, text[], jsonb) from public, anon;
grant execute on function public._canon_value(text, text[], jsonb) to authenticated, service_role;

-- ── 2. Per-table normalising triggers ───────────────────────────────────

-- college_students (replaces tg_normalize_college_student_status, which only
-- knew six words and wrote 'On Hold' / 'Paused' that nothing reads).
drop trigger if exists trg_normalize_college_student_status on public.college_students;
drop function if exists public.tg_normalize_college_student_status();

create or replace function public.tg_canon_college_students()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.status := public._canon_value(new.status,
    array['Active','Break in learning','Suspended','Withdrawn','Completed','Transferred','Archived'],
    '{"on break":"Break in learning","break":"Break in learning","on hold":"Break in learning","paused":"Break in learning","bil":"Break in learning"}');
  new.risk_level := public._canon_value(new.risk_level, array['Low','Medium','High','Critical']);
  return new;
end $$;
drop trigger if exists a0_canon_case on public.college_students;
create trigger a0_canon_case before insert or update on public.college_students
  for each row execute function public.tg_canon_college_students();

create or replace function public.tg_canon_college_cohorts()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.status := public._canon_value(new.status, array['Planning','Active','Completed','Archived']);
  return new;
end $$;
drop trigger if exists a0_canon_case on public.college_cohorts;
create trigger a0_canon_case before insert or update on public.college_cohorts
  for each row execute function public.tg_canon_college_cohorts();

create or replace function public.tg_canon_college_courses()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.status := public._canon_value(new.status, array['Active','Inactive','Archived']);
  return new;
end $$;
drop trigger if exists a0_canon_case on public.college_courses;
create trigger a0_canon_case before insert or update on public.college_courses
  for each row execute function public.tg_canon_college_courses();

create or replace function public.tg_canon_college_ilps()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.status := public._canon_value(new.status, array['draft','active','archived','completed']);
  return new;
end $$;
drop trigger if exists a0_canon_case on public.college_ilps;
create trigger a0_canon_case before insert or update on public.college_ilps
  for each row execute function public.tg_canon_college_ilps();

create or replace function public.tg_canon_college_grades()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.status := public._canon_value(new.status, array['Pending','Submitted','Graded','Verified','Resubmission'],
    '{"final":"Graded","marked":"Graded"}');
  new.grade := public._canon_value(new.grade, array['Distinction','Merit','Pass','Competent','Refer','Not Yet Competent','Fail'],
    '{"referred":"Refer","referral":"Refer","d":"Distinction","m":"Merit","p":"Pass"}');
  if new.assessment_type is not null then
    new.assessment_type := public._canon_value(
      lower(regexp_replace(btrim(new.assessment_type), '[\s-]+', '_', 'g')),
      array['knowledge_test','assignment','practical','presentation','observation',
            'professional_discussion','portfolio','mock_exam','written_assessment'],
      '{"practical assessment":"practical","written test":"written_assessment"}');
  end if;
  return new;
end $$;
drop trigger if exists a0_canon_case on public.college_grades;
create trigger a0_canon_case before insert or update on public.college_grades
  for each row execute function public.tg_canon_college_grades();

create or replace function public.tg_canon_college_epa()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.status := public._canon_value(new.status,
    array['Not Started','In Progress','Pre-Gateway','Gateway Ready','Complete'],
    '{"completed":"Complete"}');
  new.result := public._canon_value(new.result, array['Distinction','Merit','Pass','Fail']);
  return new;
end $$;
drop trigger if exists a0_canon_case on public.college_epa;
create trigger a0_canon_case before insert or update on public.college_epa
  for each row execute function public.tg_canon_college_epa();

create or replace function public.tg_canon_college_attendance()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.status := public._canon_value(new.status, array['Present','Late','Absent','Authorised'],
    '{"authorized":"Authorised","authorised absence":"Authorised","excused":"Authorised"}');
  return new;
end $$;
drop trigger if exists a0_canon_case on public.college_attendance;
create trigger a0_canon_case before insert or update on public.college_attendance
  for each row execute function public.tg_canon_college_attendance();

create or replace function public.tg_canon_college_staff()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.status := public._canon_value(new.status, array['Active','On Leave','Archived']);
  return new;
end $$;
drop trigger if exists a0_canon_case on public.college_staff;
create trigger a0_canon_case before insert or update on public.college_staff
  for each row execute function public.tg_canon_college_staff();

create or replace function public.tg_canon_college_iqa_findings()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.status := public._canon_value(new.status, array['Open','Closed']);
  new.finding_type := public._canon_value(new.finding_type,
    array['Good Practice','Area for Improvement','Action Required','Concern']);
  new.severity := public._canon_value(new.severity, array['minor','major','critical']);
  return new;
end $$;
drop trigger if exists a0_canon_case on public.college_iqa_findings;
create trigger a0_canon_case before insert or update on public.college_iqa_findings
  for each row execute function public.tg_canon_college_iqa_findings();

create or replace function public.tg_canon_college_scheduled_assessments()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.status := public._canon_value(new.status, array['Scheduled','Completed','Cancelled','Rescheduled']);
  new.assessment_type := public._canon_value(new.assessment_type,
    array['Observation','Professional Discussion','Portfolio Review','Gateway Meeting']);
  return new;
end $$;
drop trigger if exists a0_canon_case on public.college_scheduled_assessments;
create trigger a0_canon_case before insert or update on public.college_scheduled_assessments
  for each row execute function public.tg_canon_college_scheduled_assessments();

create or replace function public.tg_canon_college_work_queue_state()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.status := public._canon_value(new.status, array['In Progress','Completed']);
  return new;
end $$;
drop trigger if exists a0_canon_case on public.college_work_queue_state;
create trigger a0_canon_case before insert or update on public.college_work_queue_state
  for each row execute function public.tg_canon_college_work_queue_state();

create or replace function public.tg_canon_college_standardisation_meetings()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.status := public._canon_value(new.status, array['scheduled','held','completed','cancelled']);
  return new;
end $$;
drop trigger if exists a0_canon_case on public.college_standardisation_meetings;
create trigger a0_canon_case before insert or update on public.college_standardisation_meetings
  for each row execute function public.tg_canon_college_standardisation_meetings();

create or replace function public.tg_canon_college_student_assignments()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.status := public._canon_value(new.status,
    array['pre_enrollment','active','on_break','at_risk','withdrawn','completed','transferred'],
    '{"break in learning":"on_break","pre enrolment":"pre_enrollment"}');
  return new;
end $$;
drop trigger if exists a0_canon_case on public.college_student_assignments;
create trigger a0_canon_case before insert or update on public.college_student_assignments
  for each row execute function public.tg_canon_college_student_assignments();

create or replace function public.tg_canon_student_risk_scores()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.level := public._canon_value(new.level, array['low','medium','high','critical']);
  return new;
end $$;
drop trigger if exists a0_canon_case on public.student_risk_scores;
create trigger a0_canon_case before insert or update on public.student_risk_scores
  for each row execute function public.tg_canon_student_risk_scores();

create or replace function public.tg_canon_college_ilp_goals()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.status := public._canon_value(new.status,
    array['not_started','in_progress','completed','blocked','overdue','cancelled']);
  new.priority := public._canon_value(new.priority, array['low','medium','high']);
  new.category := public._canon_value(new.category,
    array['academic','behavioural','skills','employability','wellbeing','attendance','other']);
  return new;
end $$;
drop trigger if exists a0_canon_case on public.college_ilp_goals;
create trigger a0_canon_case before insert or update on public.college_ilp_goals
  for each row execute function public.tg_canon_college_ilp_goals();

-- Trigger functions run as the writer; nobody calls them directly.
do $$
declare f text;
begin
  foreach f in array array[
    'tg_canon_college_students','tg_canon_college_cohorts','tg_canon_college_courses',
    'tg_canon_college_ilps','tg_canon_college_grades','tg_canon_college_epa',
    'tg_canon_college_attendance','tg_canon_college_staff','tg_canon_college_iqa_findings',
    'tg_canon_college_scheduled_assessments','tg_canon_college_work_queue_state',
    'tg_canon_college_standardisation_meetings','tg_canon_college_student_assignments',
    'tg_canon_student_risk_scores','tg_canon_college_ilp_goals']
  loop
    execute format('revoke all on function public.%I() from public, anon', f);
    execute format('comment on function public.%I() is %L', f,
      'Status casing: BEFORE INSERT/UPDATE trigger (a0_canon_case) that rewrites status-like columns to their canonical spelling via _canon_value. See migration 20261008034000.');
  end loop;
end $$;

-- ── 3. Normalise existing rows ──────────────────────────────────────────
-- A no-op UPDATE fires a0_canon_case, which does the rewrite. Only rows whose
-- value would change are touched. The grade-recorded push is switched off for
-- the backfill so old 'final' grades don't notify learners now.
alter table public.college_grades disable trigger trg_notify_grade_recorded;

update public.college_students set status = status
 where status is distinct from public._canon_value(status,
         array['Active','Break in learning','Suspended','Withdrawn','Completed','Transferred','Archived'],
         '{"on break":"Break in learning","break":"Break in learning","on hold":"Break in learning","paused":"Break in learning","bil":"Break in learning"}')
    or risk_level is distinct from public._canon_value(risk_level, array['Low','Medium','High','Critical']);
update public.college_cohorts set status = status
 where status is distinct from public._canon_value(status, array['Planning','Active','Completed','Archived']);
update public.college_courses set status = status
 where status is distinct from public._canon_value(status, array['Active','Inactive','Archived']);
update public.college_ilps set status = status
 where status is distinct from public._canon_value(status, array['draft','active','archived','completed']);
update public.college_grades set status = status;   -- 10 rows; status, grade and assessment_type all mixed
update public.college_epa set status = status
 where result is distinct from public._canon_value(result, array['Distinction','Merit','Pass','Fail']);
update public.college_standardisation_meetings set status = status
 where status is distinct from public._canon_value(status, array['scheduled','held','completed','cancelled']);

alter table public.college_grades enable trigger trg_notify_grade_recorded;

-- ── 4. Defaults + CHECKs where missing ──────────────────────────────────
alter table public.college_ilps alter column status set default 'active';

alter table public.college_students drop constraint if exists college_students_status_canon;
alter table public.college_students add constraint college_students_status_canon check (status is null or status in
  ('Active','Break in learning','Suspended','Withdrawn','Completed','Transferred','Archived'));
alter table public.college_students drop constraint if exists college_students_risk_level_canon;
alter table public.college_students add constraint college_students_risk_level_canon check (risk_level is null or risk_level in
  ('Low','Medium','High','Critical'));
alter table public.college_cohorts drop constraint if exists college_cohorts_status_canon;
alter table public.college_cohorts add constraint college_cohorts_status_canon check (status is null or status in
  ('Planning','Active','Completed','Archived'));
alter table public.college_courses drop constraint if exists college_courses_status_canon;
alter table public.college_courses add constraint college_courses_status_canon check (status is null or status in
  ('Active','Inactive','Archived'));
alter table public.college_ilps drop constraint if exists college_ilps_status_canon;
alter table public.college_ilps add constraint college_ilps_status_canon check (status is null or status in
  ('draft','active','archived','completed'));
alter table public.college_grades drop constraint if exists college_grades_status_canon;
alter table public.college_grades add constraint college_grades_status_canon check (status is null or status in
  ('Pending','Submitted','Graded','Verified','Resubmission'));
alter table public.college_grades drop constraint if exists college_grades_grade_canon;
alter table public.college_grades add constraint college_grades_grade_canon check (grade is null or grade in
  ('Distinction','Merit','Pass','Competent','Refer','Not Yet Competent','Fail'));
alter table public.college_epa drop constraint if exists college_epa_result_canon;
alter table public.college_epa add constraint college_epa_result_canon check (result is null or result in
  ('Distinction','Merit','Pass','Fail'));
alter table public.college_standardisation_meetings drop constraint if exists college_standardisation_meetings_status_canon;
alter table public.college_standardisation_meetings add constraint college_standardisation_meetings_status_canon check (status is null or status in
  ('scheduled','held','completed','cancelled'));

commit;

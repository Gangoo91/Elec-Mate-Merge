-- ELE-1890 — lesson → register → attendance in one flow, with the lesson's
-- criteria recorded as taught.
--
-- 1. college_attendance.lesson_plan_id: which lesson a mark was taken for.
--    The register stays one mark per learner per day (the unique key every
--    register screen upserts on is unchanged); the lesson is extra context.
-- 2. college_lesson_deliveries: one row when a lesson is actually taught
--    (its register was taken), so "taught" is a fact on the record, and the
--    criteria taught are the lesson's mapped ACs (lesson_plan_ac_mapping).
-- 3. record_lesson_delivery(): called by the register sheet when it is
--    opened from a lesson and the first mark is saved.

alter table public.college_attendance
  add column if not exists lesson_plan_id uuid references public.college_lesson_plans(id) on delete set null;
create index if not exists idx_college_attendance_lesson on public.college_attendance (lesson_plan_id) where lesson_plan_id is not null;

create table if not exists public.college_lesson_deliveries (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  lesson_plan_id uuid not null references public.college_lesson_plans(id) on delete cascade,
  cohort_id uuid references public.college_cohorts(id) on delete set null,
  delivered_on date not null,
  recorded_by uuid references auth.users(id) on delete set null default auth.uid(),
  ac_codes text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique (lesson_plan_id, delivered_on)
);
create index if not exists idx_lesson_deliveries_college on public.college_lesson_deliveries (college_id, delivered_on desc);
create index if not exists idx_lesson_deliveries_cohort on public.college_lesson_deliveries (cohort_id, delivered_on desc);

comment on table public.college_lesson_deliveries is
  '[COLLEGE] A lesson actually taught: one row per lesson plan per date, written when its register is taken, with the criteria the lesson covers. Scope: per college. Used by: register sheet (record_lesson_delivery), curriculum coverage "taught", lesson plans. Rule: written only via record_lesson_delivery; staff of the college read.';

alter table public.college_lesson_deliveries enable row level security;

drop policy if exists "College staff read lesson deliveries" on public.college_lesson_deliveries;
create policy "College staff read lesson deliveries" on public.college_lesson_deliveries
  for select to authenticated
  using (college_id in (select cs.college_id from public.college_staff cs
                         where cs.user_id = auth.uid() and cs.archived_at is null and lower(cs.status) = 'active'));

revoke all on public.college_lesson_deliveries from anon;
revoke insert, update, delete on public.college_lesson_deliveries from authenticated;
grant select on public.college_lesson_deliveries to authenticated;

create or replace function public.record_lesson_delivery(p_lesson uuid, p_date date default null)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_college uuid;
  v_cohort uuid;
  v_id uuid;
  v_date date := coalesce(p_date, (now() at time zone 'Europe/London')::date);
  v_acs text[];
begin
  select lp.college_id, lp.cohort_id into v_college, v_cohort
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
  return v_id;
end;
$$;

revoke all on function public.record_lesson_delivery(uuid, date) from public, anon;
grant execute on function public.record_lesson_delivery(uuid, date) to authenticated;

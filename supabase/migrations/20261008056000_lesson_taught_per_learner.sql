-- ELE-1890 — "taught" per learner, and learners can see what was taught.
--
-- 1. college_learner_taught: one row per learner per lesson per day, written
--    only for learners marked Present or Late on that lesson's register. It is
--    kept by a trigger on college_attendance, so every writer (the register
--    sheet, its offline outbox, the attendance page, the released app) keeps
--    it right, and an undo or a change to Absent removes it.
-- 2. Learners can read their own cohort's lesson deliveries (what was taught
--    to the class), and their own taught rows.
-- 3. get_learner_taught_lessons(p_student): the learner's view (null = me)
--    or a staff member's view of one learner in their college: each lesson
--    delivered to the learner's cohort, its criteria, its resources, whether
--    the learner was there, and the lesson's published quiz if there is one.
--
-- Backward compatible: no existing function or column changes.

begin;

create table if not exists public.college_learner_taught (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  student_id uuid not null references public.college_students(id) on delete cascade,
  lesson_plan_id uuid not null references public.college_lesson_plans(id) on delete cascade,
  cohort_id uuid references public.college_cohorts(id) on delete set null,
  taught_on date not null,
  ac_codes text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique (student_id, lesson_plan_id, taught_on)
);
create index if not exists idx_learner_taught_student on public.college_learner_taught (student_id, taught_on desc);
create index if not exists idx_learner_taught_lesson on public.college_learner_taught (lesson_plan_id, taught_on);

comment on table public.college_learner_taught is
  '[COLLEGE] Criteria taught to one learner: a row per learner per lesson per day, only when the learner was Present or Late on that lesson''s register, with the lesson''s mapped ACs. Scope: per learner. Used by: learner "Taught in class" card, get_learner_taught_lessons. Rule: written only by the college_attendance trigger (tg_college_learner_taught); learner reads own, college staff read.';

alter table public.college_learner_taught enable row level security;

drop policy if exists "Learner reads own taught" on public.college_learner_taught;
create policy "Learner reads own taught" on public.college_learner_taught
  for select to authenticated
  using (student_id in (select cs.id from public.college_students cs where cs.user_id = (select auth.uid())));

drop policy if exists "College staff read taught" on public.college_learner_taught;
create policy "College staff read taught" on public.college_learner_taught
  for select to authenticated
  using (college_id in (select cs.college_id from public.college_staff cs
                         where cs.user_id = (select auth.uid()) and cs.archived_at is null and lower(cs.status) = 'active'));

revoke all on public.college_learner_taught from anon;
revoke insert, update, delete on public.college_learner_taught from authenticated;
grant select on public.college_learner_taught to authenticated;

-- Learners see what was taught to their own cohort (staff policy unchanged).
drop policy if exists "Learner reads own cohort deliveries" on public.college_lesson_deliveries;
create policy "Learner reads own cohort deliveries" on public.college_lesson_deliveries
  for select to authenticated
  using (cohort_id is not null and cohort_id in (
    select cs.cohort_id from public.college_students cs
     where cs.user_id = (select auth.uid()) and cs.cohort_id is not null));

-- Recompute one (learner, lesson, day): a row while any Present/Late mark for
-- that lesson and day exists, none otherwise. Covers morning + afternoon.
create or replace function public._sync_learner_taught(p_student uuid, p_lesson uuid, p_date date)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_college uuid;
  v_cohort uuid;
  v_acs text[];
begin
  if p_student is null or p_lesson is null or p_date is null then
    return;
  end if;
  if exists (select 1 from college_attendance a
              where a.student_id = p_student and a.lesson_plan_id = p_lesson and a.date = p_date
                and lower(coalesce(a.status, '')) in ('present', 'late')) then
    select lp.college_id, lp.cohort_id into v_college, v_cohort
      from college_lesson_plans lp where lp.id = p_lesson;
    if v_college is null then
      return;
    end if;
    select coalesce(array_agg(distinct m.ac_code order by m.ac_code), '{}')
      into v_acs from lesson_plan_ac_mapping m where m.lesson_plan_id = p_lesson;
    insert into college_learner_taught (college_id, student_id, lesson_plan_id, cohort_id, taught_on, ac_codes)
    values (v_college, p_student, p_lesson, v_cohort, p_date, v_acs)
    on conflict (student_id, lesson_plan_id, taught_on) do update set ac_codes = excluded.ac_codes;
  else
    delete from college_learner_taught t
     where t.student_id = p_student and t.lesson_plan_id = p_lesson and t.taught_on = p_date;
  end if;
end;
$$;
revoke all on function public._sync_learner_taught(uuid, uuid, date) from public, anon, authenticated;

create or replace function public.tg_college_learner_taught()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if tg_op in ('UPDATE', 'DELETE') then
    perform _sync_learner_taught(old.student_id, old.lesson_plan_id, old.date);
  end if;
  if tg_op in ('INSERT', 'UPDATE') then
    if tg_op = 'INSERT' or (new.student_id, new.lesson_plan_id, new.date)
                             is distinct from (old.student_id, old.lesson_plan_id, old.date)
                        or new.status is distinct from old.status then
      perform _sync_learner_taught(new.student_id, new.lesson_plan_id, new.date);
    end if;
  end if;
  return null;
end;
$$;
revoke all on function public.tg_college_learner_taught() from public, anon, authenticated;

drop trigger if exists z_learner_taught on public.college_attendance;
create trigger z_learner_taught
  after insert or update or delete on public.college_attendance
  for each row execute function public.tg_college_learner_taught();

-- Backfill from the registers already taken against a lesson.
insert into public.college_learner_taught (college_id, student_id, lesson_plan_id, cohort_id, taught_on, ac_codes)
select distinct on (a.student_id, a.lesson_plan_id, a.date)
       lp.college_id, a.student_id, a.lesson_plan_id, lp.cohort_id, a.date,
       coalesce((select array_agg(distinct m.ac_code order by m.ac_code) from public.lesson_plan_ac_mapping m
                  where m.lesson_plan_id = a.lesson_plan_id), '{}')
  from public.college_attendance a
  join public.college_lesson_plans lp on lp.id = a.lesson_plan_id
 where a.lesson_plan_id is not null and lower(coalesce(a.status, '')) in ('present', 'late')
on conflict (student_id, lesson_plan_id, taught_on) do nothing;

-- One learner's taught lessons. p_student null = the caller's own record.
create or replace function public.get_learner_taught_lessons(p_student uuid default null, p_limit int default 20)
returns table (
  delivery_id uuid,
  lesson_plan_id uuid,
  title text,
  delivered_on date,
  ac_codes text[],
  kit text[],
  resources jsonb,
  was_present boolean,
  quiz_id uuid,
  quiz_title text
)
language plpgsql
stable
security definer
set search_path to 'public'
as $$
declare
  v_uid uuid := auth.uid();
  v_student uuid;
  v_student_user uuid;
  v_cohort uuid;
  v_college uuid;
begin
  if v_uid is null then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  if p_student is null then
    select cs.id, cs.user_id, cs.cohort_id, cs.college_id into v_student, v_student_user, v_cohort, v_college
      from college_students cs where cs.user_id = v_uid
     order by cs.created_at desc limit 1;
    if v_student is null then
      return;
    end if;
  else
    select cs.id, cs.user_id, cs.cohort_id, cs.college_id into v_student, v_student_user, v_cohort, v_college
      from college_students cs where cs.id = p_student;
    if v_student is null then
      raise exception 'learner not found' using errcode = 'P0002';
    end if;
    if v_student_user is distinct from v_uid
       and not exists (select 1 from college_staff st
                        where st.user_id = v_uid and st.college_id = v_college
                          and st.archived_at is null and lower(st.status) = 'active') then
      raise exception 'not authorised' using errcode = '42501';
    end if;
  end if;

  return query
  with lessons as (
    select distinct on (x.lesson_plan_id, x.delivered_on) x.*
      from (
        -- Delivered to the learner's current cohort ...
        select d.id as delivery_id, d.lesson_plan_id, d.delivered_on, d.ac_codes, 0 as pri
          from college_lesson_deliveries d
         where v_cohort is not null and d.cohort_id = v_cohort
        union all
        -- ... plus anything the learner was marked present for under another class.
        select d.id, t.lesson_plan_id, t.taught_on, t.ac_codes, 1
          from college_learner_taught t
          left join college_lesson_deliveries d on d.lesson_plan_id = t.lesson_plan_id and d.delivered_on = t.taught_on
         where t.student_id = v_student
      ) x
     order by x.lesson_plan_id, x.delivered_on, x.pri
  )
  select l.delivery_id, l.lesson_plan_id, lp.title, l.delivered_on, l.ac_codes,
         coalesce(lp.resources, '{}')::text[],
         coalesce((
           select jsonb_agg(jsonb_build_object(
                    'id', r.id, 'college_id', r.college_id, 'title', r.title, 'kind', r.kind,
                    'file_path', r.file_path, 'external_url', r.external_url, 'mime_type', r.mime_type)
                  order by r.title)
             from resource_lesson_links rl
             join college_resources r on r.id = rl.resource_id
            where rl.lesson_plan_id = l.lesson_plan_id
              and r.visibility in ('cohort_members', 'college')
         ), '[]'::jsonb),
         exists (select 1 from college_learner_taught t
                  where t.student_id = v_student and t.lesson_plan_id = l.lesson_plan_id and t.taught_on = l.delivered_on),
         q.id, q.title
    from lessons l
    join college_lesson_plans lp on lp.id = l.lesson_plan_id
    left join lateral (
      select tq.id, tq.title from tutor_quizzes tq
       where tq.lesson_plan_id = l.lesson_plan_id and tq.is_published = true
         and ((v_cohort is not null and tq.cohort_id = v_cohort)
              or (v_student_user is not null and v_student_user = any(coalesce(tq.assigned_student_ids, '{}'::uuid[]))))
       order by tq.published_at desc nulls last limit 1
    ) q on true
   where coalesce(lp.status, '') <> 'draft'
   order by l.delivered_on desc, lp.title
   limit greatest(1, least(coalesce(p_limit, 20), 100));
end;
$$;

revoke all on function public.get_learner_taught_lessons(uuid, int) from public, anon;
grant execute on function public.get_learner_taught_lessons(uuid, int) to authenticated;

commit;

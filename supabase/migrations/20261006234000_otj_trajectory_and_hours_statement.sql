-- 1. Weekly trajectory from the same figures as get_otj_summary, so the
--    Student 360 chart can never disagree with the learner's hub again. It
--    replaces a client calculation that fell back to "30h/week × 20%", the
--    rule that ended in August 2025.
--
-- 2. ELE-1878 — the planned-versus-actual hours statement (funding rules
--    2025/26, paras 92–94). When fewer hours were delivered than planned, the
--    provider produces a statement: planned hours, hours delivered (with
--    proof), the reason, and confirmation the standard's minimum was met. The
--    employer and apprentice sign it; it must be in the evidence pack within
--    12 weeks of completion.

-- ── 1. Trajectory ────────────────────────────────────────────────────────
create or replace function public.get_otj_trajectory(p_user uuid default null)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  u uuid := coalesce(p_user, auth.uid());
  s jsonb;
  v_start date;
  v_end date;
  v_required numeric;
  v_today date := (now() at time zone 'Europe/London')::date;
  v_first date;
  v_points jsonb;
begin
  if not public._otj_can_read(u) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  s := public.get_otj_summary(u);
  v_start := (s->>'start_date')::date;
  v_end := (s->>'end_date')::date;
  v_required := (s->>'required_hours')::numeric;

  select least(
           (select min(activity_date) from college_otj_entries where student_id = u and verification_status <> 'rejected'),
           (select min(date) from time_entries where user_id = u and is_automatic and coalesce(duration, 0) > 0))
    into v_first;
  v_start := coalesce(v_start, v_first);
  if v_start is null then
    return jsonb_build_object('start_date', null, 'end_date', v_end, 'required_hours', v_required, 'points', '[]'::jsonb);
  end if;

  with weeks as (
    select (d::date + ((7 - extract(isodow from d::date)::int) % 7))::date as week_ending
      from generate_series(v_start, least(v_today, coalesce(v_end, v_today)), interval '7 days') g(d)
    union
    select (v_today + ((7 - extract(isodow from v_today)::int) % 7))::date
     where v_today <= coalesce(v_end, v_today)
  ), daily as (
    select activity_date as day,
           sum(duration_minutes) filter (where verification_status in ('verified', 'verified_by_employer')) as verified_min
      from college_otj_entries where student_id = u
     group by 1
  ), app as (
    select t.date as day, sum(t.duration) as app_min
      from time_entries t
     where t.user_id = u and t.is_automatic and coalesce(t.duration, 0) > 0
       and not exists (select 1 from otj_capture_links l where l.time_entry_id = t.id)
     group by 1
  )
  select jsonb_agg(jsonb_build_object(
           'week_ending', w.week_ending,
           'verified_hours', round(coalesce((select sum(verified_min) from daily where day <= w.week_ending), 0) / 60.0, 1),
           'counted_hours', round((coalesce((select sum(verified_min) from daily where day <= w.week_ending), 0)
                                  + coalesce((select sum(app_min) from app where day <= w.week_ending), 0)) / 60.0, 1),
           'planned_hours', case when v_required is not null and v_end is not null and v_end > v_start
                                 then round(v_required * least(1, greatest(0, (w.week_ending - v_start)::numeric / (v_end - v_start))), 1)
                            end)
         order by w.week_ending)
    into v_points
    from (select distinct week_ending from weeks) w;

  return jsonb_build_object('start_date', v_start, 'end_date', v_end, 'required_hours', v_required,
                            'points', coalesce(v_points, '[]'::jsonb));
end; $$;
grant execute on function public.get_otj_trajectory(uuid) to authenticated;

-- ── 2. Planned-versus-actual statement ───────────────────────────────────
create table if not exists public.otj_hours_statements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  college_student_id uuid references public.college_students(id) on delete set null,
  college_id uuid,
  planned_hours numeric not null check (planned_hours > 0),
  minimum_hours numeric,
  rpl_hours numeric not null default 0 check (rpl_hours >= 0),
  actual_hours numeric not null,
  verified_hours numeric not null,
  app_learning_hours numeric not null,
  minimum_met boolean not null,
  reason text not null check (length(trim(reason)) >= 10),
  prepared_by uuid references public.profiles(id) on delete set null,
  prepared_by_name text,
  prepared_at timestamptz not null default now(),
  learner_signed_name text,
  learner_signed_at timestamptz,
  employer_token text not null unique default encode(extensions.gen_random_bytes(24), 'hex'),
  employer_signed_name text,
  employer_signed_role text,
  employer_company text,
  employer_signed_at timestamptz,
  superseded_at timestamptz
);
create index if not exists otj_hours_statements_user_idx on public.otj_hours_statements(user_id);
alter table public.otj_hours_statements enable row level security;
drop policy if exists "otj_hours_statements: learner or staff read" on public.otj_hours_statements;
create policy "otj_hours_statements: learner or staff read" on public.otj_hours_statements
  for select to authenticated
  using (user_id = auth.uid() or public.is_staff_for_learner_user(user_id));
comment on table public.otj_hours_statements is
  '[COLLEGE] Planned-versus-actual off-the-job hours statement (funding rules 2025/26 paras 92–94). Scope: per learner. Used by: Student 360 hours panel, apprentice hours hub, public /otj-statement/:token. Rule: written only through prepare_/sign_ RPCs; a signed statement is never edited, a new one supersedes it.';

-- Columns other than signatures never change after preparation.
create or replace function public.tg_otj_statement_guard()
returns trigger language plpgsql as $$
begin
  if new.user_id is distinct from old.user_id or new.planned_hours is distinct from old.planned_hours
     or new.actual_hours is distinct from old.actual_hours or new.reason is distinct from old.reason
     or new.minimum_hours is distinct from old.minimum_hours or new.rpl_hours is distinct from old.rpl_hours
     or new.employer_token is distinct from old.employer_token or new.prepared_at is distinct from old.prepared_at then
    raise exception 'A prepared statement cannot be changed. Prepare a new one.' using errcode = 'check_violation';
  end if;
  if old.learner_signed_at is not null and new.learner_signed_at is distinct from old.learner_signed_at then
    raise exception 'Already signed by the apprentice.' using errcode = 'check_violation';
  end if;
  if old.employer_signed_at is not null and new.employer_signed_at is distinct from old.employer_signed_at then
    raise exception 'Already signed by the employer.' using errcode = 'check_violation';
  end if;
  return new;
end; $$;
drop trigger if exists trg_otj_statement_guard on public.otj_hours_statements;
create trigger trg_otj_statement_guard before update on public.otj_hours_statements
  for each row execute function public.tg_otj_statement_guard();

-- Staff prepare it from the live figures.
create or replace function public.prepare_otj_hours_statement(
  p_user uuid, p_planned_hours numeric, p_reason text, p_rpl_hours numeric default 0)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  s jsonb;
  cs record;
  v_name text;
  v_min numeric;
  v_actual numeric;
  v_row public.otj_hours_statements;
begin
  if auth.uid() is null or not public.is_staff_for_learner_user(p_user) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  if coalesce(p_planned_hours, 0) <= 0 then
    return jsonb_build_object('error', 'Enter the planned hours agreed with the employer.');
  end if;
  if length(trim(coalesce(p_reason, ''))) < 10 then
    return jsonb_build_object('error', 'Give the reason fewer hours were delivered than planned.');
  end if;
  s := public.get_otj_summary(p_user);
  v_actual := (s->>'counted_hours')::numeric;
  v_min := nullif((s->>'required_hours')::numeric, 0);
  if v_min is not null then
    v_min := greatest(187, v_min - coalesce(p_rpl_hours, 0));
  end if;
  select id, college_id into cs from college_students where id = (s->>'college_student_id')::uuid;
  select coalesce(nullif(trim(full_name), ''), 'Tutor') into v_name from profiles where id = auth.uid();

  update otj_hours_statements set superseded_at = now()
   where user_id = p_user and superseded_at is null;

  insert into otj_hours_statements (
    user_id, college_student_id, college_id, planned_hours, minimum_hours, rpl_hours,
    actual_hours, verified_hours, app_learning_hours, minimum_met, reason, prepared_by, prepared_by_name)
  values (
    p_user, cs.id, cs.college_id, round(p_planned_hours, 1), v_min, coalesce(p_rpl_hours, 0),
    v_actual, (s->>'verified_hours')::numeric, (s->>'app_learning_hours')::numeric,
    v_min is not null and v_actual >= v_min, trim(p_reason), auth.uid(), v_name)
  returning * into v_row;

  begin
    insert into user_notifications (user_id, type, title, message, link, metadata)
    values (p_user, 'otj_statement', 'Sign your off-the-job hours statement',
            'Your tutor has prepared a statement of your planned and actual off-the-job hours. Read it and sign.',
            '/apprentice/ojt-hub', jsonb_build_object('statement_id', v_row.id));
  exception when others then null;
  end;

  return jsonb_build_object('success', true, 'id', v_row.id, 'employer_token', v_row.employer_token,
                            'minimum_met', v_row.minimum_met);
end; $$;
grant execute on function public.prepare_otj_hours_statement(uuid, numeric, text, numeric) to authenticated;

-- The learner signs their own, in the app.
create or replace function public.sign_otj_hours_statement(p_id uuid, p_name text)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare r public.otj_hours_statements;
begin
  select * into r from otj_hours_statements where id = p_id;
  if r.id is null or r.user_id is distinct from auth.uid() then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  if r.superseded_at is not null then
    return jsonb_build_object('error', 'This statement has been replaced by a newer one.');
  end if;
  if r.learner_signed_at is not null then
    return jsonb_build_object('error', 'You have already signed this statement.');
  end if;
  if length(trim(coalesce(p_name, ''))) < 2 then
    return jsonb_build_object('error', 'Type your full name to sign.');
  end if;
  update otj_hours_statements set learner_signed_name = left(trim(p_name), 120), learner_signed_at = now()
   where id = p_id;
  return jsonb_build_object('success', true);
end; $$;
grant execute on function public.sign_otj_hours_statement(uuid, text) to authenticated;

-- The employer reads and signs from a link, no account.
create or replace function public.get_otj_hours_statement_public(p_token text)
returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare
  r public.otj_hours_statements;
  v_learner text;
  v_college text;
begin
  select * into r from otj_hours_statements where employer_token = p_token;
  if r.id is null then
    return jsonb_build_object('error', 'This link is not valid.');
  end if;
  select coalesce(cs.name, p.full_name) into v_learner
    from profiles p left join college_students cs on cs.id = r.college_student_id where p.id = r.user_id;
  select name into v_college from colleges where id = r.college_id;
  return jsonb_build_object(
    'learner_name', v_learner, 'college_name', v_college,
    'planned_hours', r.planned_hours, 'minimum_hours', r.minimum_hours, 'rpl_hours', r.rpl_hours,
    'actual_hours', r.actual_hours, 'verified_hours', r.verified_hours, 'app_learning_hours', r.app_learning_hours,
    'minimum_met', r.minimum_met, 'reason', r.reason,
    'prepared_by_name', r.prepared_by_name, 'prepared_at', r.prepared_at,
    'learner_signed_name', r.learner_signed_name, 'learner_signed_at', r.learner_signed_at,
    'employer_signed_name', r.employer_signed_name, 'employer_signed_role', r.employer_signed_role,
    'employer_company', r.employer_company, 'employer_signed_at', r.employer_signed_at,
    'superseded', r.superseded_at is not null);
end; $$;
grant execute on function public.get_otj_hours_statement_public(text) to anon, authenticated;

create or replace function public.sign_otj_hours_statement_employer(
  p_token text, p_name text, p_role text, p_company text)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare r public.otj_hours_statements;
begin
  select * into r from otj_hours_statements where employer_token = p_token for update;
  if r.id is null then return jsonb_build_object('error', 'This link is not valid.'); end if;
  if r.superseded_at is not null then
    return jsonb_build_object('error', 'This statement has been replaced. Ask the college for the new link.');
  end if;
  if r.employer_signed_at is not null then
    return jsonb_build_object('error', 'This statement has already been signed for the employer.');
  end if;
  if length(trim(coalesce(p_name, ''))) < 2 or length(trim(coalesce(p_company, ''))) < 2 then
    return jsonb_build_object('error', 'Add your name and your company.');
  end if;
  update otj_hours_statements
     set employer_signed_name = left(trim(p_name), 120),
         employer_signed_role = left(trim(coalesce(p_role, '')), 80),
         employer_company = left(trim(p_company), 120),
         employer_signed_at = now()
   where id = r.id;
  return jsonb_build_object('success', true);
end; $$;
grant execute on function public.sign_otj_hours_statement_employer(text, text, text, text) to anon, authenticated;

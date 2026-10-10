-- IQA extras (10 Oct 2026, batch 2 of the C&G 5357 / EQA gaps).
--
--   college_iqa_strategies          the written IQA sampling strategy, per college
--                                   and (optionally) per qualification; every
--                                   change is a new version (text + version + date),
--                                   read alongside the sampling % plans
--                                   (college_iqa_sampling).
--   college_iqa_practice_observations
--                                   the IQA watching an ASSESSOR assess (date,
--                                   assessor, learner, activity, findings,
--                                   actions). Distinct from college_observations,
--                                   which are an assessor watching a LEARNER.
--   CPD: the existing staff_cpd_entries (date, activity, hours, reflection,
--   LogCpdSheet) already holds assessor and IQA CPD; nothing new is created,
--   the IQA area now reads it (CPD tab) alongside the strategy.
--
-- Read: IQA / quality staff and EQA (read only) at the college; an assessor
-- also reads the practice observations about them and their own CPD.
-- Write: strategy and practice observations by IQA staff (college_can
-- 'iqa.sample'). Strategies and practice observations are records of a
-- quality judgement: append-only.
begin;
set local lock_timeout = '5s';

create or replace function public._iqa_can_read(p_college uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null and p_college is not null and (
       public.college_can('iqa.sample', p_college)
    or public.college_can('quality.view', p_college)
    or exists (select 1 from public.college_staff st
                where st.college_id = p_college and st.user_id = auth.uid()
                  and st.archived_at is null and st.role = 'eqa'));
$$;
revoke all on function public._iqa_can_read(uuid) from public, anon;
grant execute on function public._iqa_can_read(uuid) to authenticated;

create or replace function public._append_only_guard()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if current_user in ('authenticated', 'anon') then
    raise exception 'this is a quality record: it is never edited or deleted; add a new one' using errcode = '42501';
  end if;
  return coalesce(new, old);
end $$;

-- ── Sampling strategy ─────────────────────────────────────────────────────
create table if not exists public.college_iqa_strategies (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  qualification_code text,
  title text not null,
  body text not null,
  version integer not null,
  effective_from date not null default current_date,
  author_id uuid not null,
  author_name text,
  created_at timestamptz not null default now(),
  constraint college_iqa_strategies_title_len check (length(trim(title)) between 1 and 200),
  constraint college_iqa_strategies_body_len check (length(trim(body)) between 1 and 20000)
);
create unique index if not exists cis_version_uq
  on public.college_iqa_strategies (college_id, coalesce(qualification_code, ''), version);

create or replace function public._cis_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.author_id := coalesce(auth.uid(), new.author_id);
  if new.author_id is null then raise exception 'a strategy needs an author' using errcode = '42501'; end if;
  new.created_at := now();
  new.title := trim(new.title);
  new.body := trim(new.body);
  new.qualification_code := nullif(trim(coalesce(new.qualification_code, '')), '');
  select coalesce(nullif(trim(full_name), ''), 'IQA') into new.author_name from public.profiles where id = new.author_id;
  perform pg_advisory_xact_lock(hashtext('cis:' || new.college_id || ':' || coalesce(new.qualification_code, '')));
  select coalesce(max(version), 0) + 1 into new.version
    from public.college_iqa_strategies
   where college_id = new.college_id
     and coalesce(qualification_code, '') = coalesce(new.qualification_code, '');
  return new;
end $$;
drop trigger if exists trg_cis_before_insert on public.college_iqa_strategies;
create trigger trg_cis_before_insert before insert on public.college_iqa_strategies
  for each row execute function public._cis_before_insert();
drop trigger if exists trg_cis_append_only on public.college_iqa_strategies;
create trigger trg_cis_append_only before update or delete on public.college_iqa_strategies
  for each row execute function public._append_only_guard();

alter table public.college_iqa_strategies enable row level security;
drop policy if exists "IQA and EQA read the strategy" on public.college_iqa_strategies;
create policy "IQA and EQA read the strategy" on public.college_iqa_strategies
  for select to authenticated using (public._iqa_can_read(college_id) or public.college_can('learners.view_all', college_id));
drop policy if exists "IQA writes a new strategy version" on public.college_iqa_strategies;
create policy "IQA writes a new strategy version" on public.college_iqa_strategies
  for insert to authenticated
  with check (public.college_can('iqa.sample', college_id) and not public.current_user_is_read_only_staff());
revoke all on public.college_iqa_strategies from anon;
grant select, insert on public.college_iqa_strategies to authenticated;

comment on table public.college_iqa_strategies is
  '[COLLEGE QUALITY — IQA] The written IQA sampling strategy per college and optionally per qualification: title, body, version (auto, per college+qualification), effective_from, author. Read with the sampling % plans in college_iqa_sampling. Scope: college_id. Used by: IqaDashboardPage (Strategy tab), EQA visit pack, portfolio-export-pack (quality annex). Rule: append-only; a change is a new version.';

-- ── IQA observation of assessor practice ──────────────────────────────────
create table if not exists public.college_iqa_practice_observations (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  assessor_staff_id uuid not null references public.college_staff(id),
  assessor_name text,
  college_student_id uuid references public.college_students(id) on delete set null,
  learner_name text,
  observed_on date not null,
  activity text not null,
  findings text not null,
  actions text,
  outcome text,
  iqa_user_id uuid not null,
  iqa_name text,
  created_at timestamptz not null default now(),
  constraint ciqpo_outcome_check check (outcome is null or outcome in ('meets_standard', 'development_needed', 'not_met')),
  constraint ciqpo_activity_len check (length(trim(activity)) between 1 and 500),
  constraint ciqpo_findings_len check (length(trim(findings)) between 1 and 8000)
);
create index if not exists ciqpo_college_idx on public.college_iqa_practice_observations (college_id, observed_on desc);
create index if not exists ciqpo_assessor_idx on public.college_iqa_practice_observations (assessor_staff_id, observed_on desc);

create or replace function public._ciqpo_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.iqa_user_id := coalesce(auth.uid(), new.iqa_user_id);
  if new.iqa_user_id is null then raise exception 'an IQA observation needs an IQA' using errcode = '42501'; end if;
  new.created_at := now();
  if new.observed_on > (now() at time zone 'Europe/London')::date then
    raise exception 'the date cannot be in the future' using errcode = '22023';
  end if;
  select st.name into new.assessor_name from public.college_staff st
   where st.id = new.assessor_staff_id and st.college_id = new.college_id;
  if not found then raise exception 'that assessor is not at this college' using errcode = '22023'; end if;
  if exists (select 1 from public.college_staff st where st.id = new.assessor_staff_id and st.user_id = new.iqa_user_id) then
    raise exception 'an IQA cannot observe their own practice' using errcode = '42501';
  end if;
  if new.college_student_id is not null then
    select cs.name into new.learner_name from public.college_students cs
     where cs.id = new.college_student_id and cs.college_id = new.college_id;
    if not found then raise exception 'that learner is not at this college' using errcode = '22023'; end if;
  end if;
  select coalesce(nullif(trim(full_name), ''), 'IQA') into new.iqa_name from public.profiles where id = new.iqa_user_id;
  new.activity := trim(new.activity);
  new.findings := trim(new.findings);
  new.actions := nullif(trim(coalesce(new.actions, '')), '');
  return new;
end $$;
drop trigger if exists trg_ciqpo_before_insert on public.college_iqa_practice_observations;
create trigger trg_ciqpo_before_insert before insert on public.college_iqa_practice_observations
  for each row execute function public._ciqpo_before_insert();
drop trigger if exists trg_ciqpo_append_only on public.college_iqa_practice_observations;
create trigger trg_ciqpo_append_only before update or delete on public.college_iqa_practice_observations
  for each row execute function public._append_only_guard();

alter table public.college_iqa_practice_observations enable row level security;
drop policy if exists "IQA, EQA and the assessor read practice observations" on public.college_iqa_practice_observations;
create policy "IQA, EQA and the assessor read practice observations" on public.college_iqa_practice_observations
  for select to authenticated using (
    public._iqa_can_read(college_id)
    or exists (select 1 from public.college_staff st
                where st.id = assessor_staff_id and st.user_id = auth.uid()));
drop policy if exists "IQA records practice observations" on public.college_iqa_practice_observations;
create policy "IQA records practice observations" on public.college_iqa_practice_observations
  for insert to authenticated
  with check (public.college_can('iqa.sample', college_id) and not public.current_user_is_read_only_staff());
revoke all on public.college_iqa_practice_observations from anon;
grant select, insert on public.college_iqa_practice_observations to authenticated;

comment on table public.college_iqa_practice_observations is
  '[COLLEGE QUALITY — IQA] The IQA observing an ASSESSOR''s practice (not a learner observation): date, assessor, learner, activity, findings, actions, outcome, IQA. Scope: college_id. Used by: IqaDashboardPage (Assessor practice tab), EQA visit pack, portfolio-export-pack (quality annex). Rule: append-only; the observed assessor can read their own.';

commit;

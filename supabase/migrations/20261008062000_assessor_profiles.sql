-- ELE-1870: a lightweight assessor profile, snapshotted on every decision.
--
-- 1. assessor_profiles: one row per assessor (independent or college staff),
--    written by its owner. A learner can read the profile of anyone with an
--    active link to them, or of staff at their college / assigned to them.
-- 2. portfolio_assessment_decisions.assessor_qualifications: the deciding
--    user's qualifications at the moment of the decision. Set in the BEFORE
--    INSERT trigger (_pad_before_insert), not in record_ac_decisions, because
--    RLS also lets assessing staff insert directly and the trigger is where
--    assessor_id and content_hash are already fixed server-side. The trigger
--    overwrites whatever a client sends, and the snapshot goes into the hash.
--    Old rows are untouched (column is nullable, no backfill).
-- 3. get_portfolio_ac_state: same columns in the same order, plus
--    assessor_qualifications appended at the end.

-- ── 1. assessor_profiles ─────────────────────────────────────────────────
create table if not exists public.assessor_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  organisation text,
  qualifications text[] not null default '{}',
  qualified_since date,
  updated_at timestamptz not null default now()
);

comment on table public.assessor_profiles is
  '[PORTFOLIO] Assessor profile: name, organisation, assessing qualifications (TAQA, A1, D32/D33, IQA, AM2 assessor...). Scope: one row per assessor user. Used by: Assessor Hub /assessor, learner "Your assessors", decision snapshot (portfolio_assessment_decisions.assessor_qualifications). Rule: owner writes own row; learners read only assessors linked to them or staff at their college.';

create or replace function public._assessor_profiles_touch()
returns trigger
language plpgsql
set search_path to 'public'
as $$
begin
  new.updated_at := now();
  return new;
end; $$;

drop trigger if exists trg_assessor_profiles_touch on public.assessor_profiles;
create trigger trg_assessor_profiles_touch
  before insert or update on public.assessor_profiles
  for each row execute function public._assessor_profiles_touch();

-- Can the signed-in learner see p_owner's assessor profile? SECURITY DEFINER
-- so the check is not blocked by RLS on college_staff / college_students.
create or replace function public._learner_can_see_assessor(p_owner uuid)
returns boolean
language sql
stable security definer
set search_path to 'public'
as $$
  select auth.uid() is not null and (
       exists (select 1 from public.portfolio_assessor_links l
                where l.learner_id = auth.uid() and l.assessor_user_id = p_owner
                  and l.status = 'active')
    or exists (select 1 from public.college_student_assignments a
                where a.student_id = auth.uid()
                  and p_owner in (a.tutor_id, a.assessor_id, a.iqa_id))
    or exists (select 1 from public.college_students s
                 join public.college_staff st on st.college_id = s.college_id
                where s.user_id = auth.uid() and st.user_id = p_owner
                  and st.archived_at is null)
  );
$$;

revoke all on function public._learner_can_see_assessor(uuid) from public, anon;
grant execute on function public._learner_can_see_assessor(uuid) to authenticated;

alter table public.assessor_profiles enable row level security;

drop policy if exists "Owner reads own assessor profile" on public.assessor_profiles;
create policy "Owner reads own assessor profile" on public.assessor_profiles
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "Owner creates own assessor profile" on public.assessor_profiles;
create policy "Owner creates own assessor profile" on public.assessor_profiles
  for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "Owner updates own assessor profile" on public.assessor_profiles;
create policy "Owner updates own assessor profile" on public.assessor_profiles
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "Learner reads their assessors' profiles" on public.assessor_profiles;
create policy "Learner reads their assessors' profiles" on public.assessor_profiles
  for select to authenticated using (public._learner_can_see_assessor(user_id));

grant select, insert, update on public.assessor_profiles to authenticated;

-- ── 2. Snapshot on every decision ────────────────────────────────────────
alter table public.portfolio_assessment_decisions
  add column if not exists assessor_qualifications text[];

comment on column public.portfolio_assessment_decisions.assessor_qualifications is
  'Snapshot of the deciding assessor''s assessor_profiles.qualifications at decision time (set by _pad_before_insert, part of content_hash). Null on rows recorded before 8 Oct 2026 or when the assessor had no profile.';

-- Live definition kept; adds the qualifications snapshot and puts it in the
-- hash. concat_ws skips nulls, so a decision with no profile hashes exactly
-- as before.
create or replace function public._pad_before_insert()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if auth.uid() is not null then
    new.assessor_id := auth.uid();
  end if;
  if new.assessor_name is null then
    select coalesce(full_name, 'Assessor') into new.assessor_name from public.profiles where id = new.assessor_id;
  end if;
  -- ELE-1870: snapshot the assessor's qualifications as they stand now.
  select nullif(ap.qualifications, '{}') into new.assessor_qualifications
    from public.assessor_profiles ap where ap.user_id = new.assessor_id;
  if not found then new.assessor_qualifications := null; end if;
  new.decided_at := now();
  new.superseded_at := null; new.superseded_by := null;
  new.iqa_verdict := null; new.iqa_by := null; new.iqa_at := null; new.iqa_feedback := null;
  new.content_hash := encode(extensions.digest(
    concat_ws('|', new.learner_id, new.qualification_code, new.unit_code, new.ac_code, new.decision,
              coalesce(new.feedback, ''), array_to_string(new.evidence_item_ids, ','), new.assessor_id,
              new.decided_at, array_to_string(new.assessor_qualifications, ',')), 'sha256'), 'hex');
  return new;
end; $function$;

-- ── 3. get_portfolio_ac_state: append assessor_qualifications ────────────
-- Return type changes, so drop and recreate (same signature, same grants).
drop function if exists public.get_portfolio_ac_state(uuid);

create function public.get_portfolio_ac_state(p_user_id uuid default null::uuid)
returns table(unit_code text, unit_title text, lo_number integer, lo_text text, ac_code text, ac_text text,
              state text, evidence_item_ids uuid[], decision_id uuid, decision_feedback text,
              decided_at timestamp with time zone, assessor_name text, iqa_verdict text,
              qualification_code text, assessor_id uuid, iqa_feedback text, decision_method text,
              suggested_item_ids uuid[], decision_feedback_source text,
              decision_feedback_confirmed_at timestamp with time zone,
              assessor_qualifications text[])
language plpgsql
stable security definer
set search_path to 'public'
as $function$
declare
  v_user uuid := coalesce(p_user_id, auth.uid());
  r record;
begin
  if v_user is null or not (v_user = auth.uid() or public._can_assess(v_user)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  select * into r from public._resolve_qualification(v_user, null);
  if r.requirement_code is null then return; end if;

  return query
  with ev as (
    select c.portfolio_item_id item_id, c.unit_code u, c.ac_code a, c.source
      from public.portfolio_item_criteria c
     where c.learner_id = v_user
       and (c.qualification_code is null or c.qualification_code = r.requirement_code)
  ),
  open_items as (
    select si.portfolio_item_id, max(coalesce(ps.submitted_at, ps.created_at)) sent_at
      from public.portfolio_submission_items si
      join public.portfolio_submissions ps on ps.id = si.submission_id
     where ps.user_id = v_user and coalesce(ps.status, 'submitted') in ('submitted', 'resubmitted', 'under_review')
     group by si.portfolio_item_id
  ),
  cur as (
    select distinct on (d.unit_code, d.ac_code) d.*
      from public.portfolio_assessment_decisions d
     where d.learner_id = v_user and d.qualification_code = r.requirement_code and d.superseded_at is null
     order by d.unit_code, d.ac_code, d.decided_at desc
  )
  select qr.unit_code, qr.unit_title, qr.lo_number, qr.lo_text, qr.ac_code, qr.ac_text,
    case
      when cur.decision = 'passed' and cur.iqa_verdict = 'confirmed' then 'iqa_confirmed'
      when cur.decision = 'passed' and cur.iqa_verdict = 'not_confirmed' then 'iqa_rejected'
      when cur.decision in ('referred', 'not_yet')
           and exists (select 1 from ev join open_items o on o.portfolio_item_id = ev.item_id
                        where ev.u = qr.unit_code and ev.a = qr.ac_code and ev.source <> 'ai_suggested'
                          and o.sent_at > cur.decided_at) then 'submitted'
      when cur.decision is not null then cur.decision
      when exists (select 1 from ev join open_items o on o.portfolio_item_id = ev.item_id
                    where ev.u = qr.unit_code and ev.a = qr.ac_code and ev.source <> 'ai_suggested') then 'submitted'
      when exists (select 1 from ev where ev.u = qr.unit_code and ev.a = qr.ac_code
                    and ev.source <> 'ai_suggested') then 'claimed'
      when exists (select 1 from ev where ev.u = qr.unit_code and ev.a = qr.ac_code) then 'suggested'
      else 'not_started'
    end,
    coalesce((select array_agg(distinct ev.item_id) from ev
               where ev.u = qr.unit_code and ev.a = qr.ac_code and ev.source <> 'ai_suggested'), '{}'),
    cur.id, cur.feedback, cur.decided_at, cur.assessor_name, cur.iqa_verdict, r.requirement_code,
    cur.assessor_id, cur.iqa_feedback, cur.method,
    coalesce((select array_agg(distinct ev.item_id) from ev
               where ev.u = qr.unit_code and ev.a = qr.ac_code and ev.source = 'ai_suggested'), '{}'),
    cur.feedback_source, cur.feedback_confirmed_at,
    cur.assessor_qualifications
  from public.qualification_requirements qr
  left join cur on cur.unit_code = qr.unit_code and cur.ac_code = qr.ac_code
  where qr.qualification_code = r.requirement_code
  order by qr.unit_code, qr.lo_number, qr.ac_code;
end; $function$;

-- Same grants as the live function (authenticated + service_role only).
revoke all on function public.get_portfolio_ac_state(uuid) from public, anon;
grant execute on function public.get_portfolio_ac_state(uuid) to authenticated, service_role;

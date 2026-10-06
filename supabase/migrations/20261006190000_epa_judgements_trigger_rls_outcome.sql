-- EPA judgements: fixes from the college EPA audit (6 Oct 2026).
-- Applied 6 Oct 2026 with Andrew's approval.
--
-- #2  A learner could only ever submit one self-assessment: the demote
--     trigger ran with the caller's rights, learners have no UPDATE policy,
--     so the demote changed 0 rows and the insert then broke the
--     one-current-per-voice unique index ("Could not submit").
-- #16 Every tutor insert notified the learner, including a co-sign or an
--     edit that kept the same verdict. Notify only when the verdict changes.
-- #17 Staff policies didn't exclude archived staff, didn't check the learner
--     belongs to the row's college, and let any staff member rewrite any
--     column (AI rows included) in place. UPDATE is now limited to the
--     outcome columns; a judgement is otherwise immutable — a new verdict is
--     a new row.
-- #22 The "date EPA completed" was being stored in actual_recorded_at, so
--     when it was recorded was lost. New column actual_epa_date.

-- ── #2 ──────────────────────────────────────────────────────────────────
create or replace function public.tg_epa_judgements_demote_previous()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
begin
  if new.is_current = true then
    update public.college_epa_judgements
    set is_current = false, superseded_by = new.id, updated_at = now()
    where college_student_id = new.college_student_id
      and source = new.source
      and is_current = true;
  end if;
  return new;
end;
$function$;

-- ── #16 ─────────────────────────────────────────────────────────────────
create or replace function public.tg_notify_epa_judgement()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_user_id uuid;
  v_title   text;
  v_body    text;
  v_prev    text;
begin
  -- only authoritative tutor decisions, current, on insert or verdict change
  if new.source is distinct from 'tutor'
     or new.is_current is not true
     or not (tg_op = 'INSERT' or old.verdict is distinct from new.verdict) then
    return new;
  end if;

  -- An insert that replaces a tutor verdict with the same verdict (a co-sign,
  -- an edit to the actions) isn't news to the learner.
  if tg_op = 'INSERT' then
    select verdict into v_prev
    from public.college_epa_judgements
    where superseded_by = new.id and source = 'tutor'
    order by created_at desc
    limit 1;
    if v_prev is not null and v_prev = new.verdict then
      return new;
    end if;
  end if;

  select user_id into v_user_id
  from college_students
  where id = new.college_student_id;

  if v_user_id is null then
    return new;  -- learner not linked to an account yet
  end if;

  if new.verdict = 'ready' then
    v_title := 'EPA gateway: ready';
    v_body  := 'Your tutor confirms you''re ready for End-Point Assessment.';
  elsif new.verdict = 'almost' then
    v_title := 'EPA gateway reviewed';
    v_body  := 'You''re almost there — your tutor has set a few actions to complete before EPA. Tap to view your plan.';
  else
    v_title := 'EPA gateway reviewed';
    v_body  := 'Your tutor has reviewed your EPA readiness and added actions to complete first. Tap to view your plan.';
  end if;

  insert into push_notification_log (user_id, type, reference_id, title, body)
  values (v_user_id, 'epa', new.id::text, v_title, v_body);

  return new;
end;
$function$;

-- ── #22 ─────────────────────────────────────────────────────────────────
alter table public.college_epa_judgements
  add column if not exists actual_epa_date date;

comment on column public.college_epa_judgements.actual_epa_date is
  'The date the EPA (AM2S) was taken. actual_recorded_at is when the outcome was recorded.';

-- ── #17 ─────────────────────────────────────────────────────────────────
drop policy if exists "Staff read judgements in their college" on public.college_epa_judgements;
create policy "Staff read judgements in their college"
  on public.college_epa_judgements for select to authenticated
  using (exists (
    select 1 from public.college_staff st
    where st.user_id = (select auth.uid())
      and st.college_id = college_epa_judgements.college_id
      and st.archived_at is null
  ));

drop policy if exists "Staff write judgements in their college" on public.college_epa_judgements;
create policy "Staff write judgements in their college"
  on public.college_epa_judgements for insert to authenticated
  with check (
    exists (
      select 1 from public.college_staff st
      where st.user_id = (select auth.uid())
        and st.college_id = college_epa_judgements.college_id
        and st.archived_at is null
    )
    and exists (
      select 1 from public.college_students s
      where s.id = college_epa_judgements.college_student_id
        and s.college_id = college_epa_judgements.college_id
    )
  );

drop policy if exists "Staff update judgements in their college" on public.college_epa_judgements;
create policy "Staff update judgements in their college"
  on public.college_epa_judgements for update to authenticated
  using (exists (
    select 1 from public.college_staff st
    where st.user_id = (select auth.uid())
      and st.college_id = college_epa_judgements.college_id
      and st.archived_at is null
  ))
  with check (exists (
    select 1 from public.college_staff st
    where st.user_id = (select auth.uid())
      and st.college_id = college_epa_judgements.college_id
      and st.archived_at is null
  ));

drop policy if exists "Learner submits self judgement" on public.college_epa_judgements;
create policy "Learner submits self judgement"
  on public.college_epa_judgements for insert to authenticated
  with check (
    source = 'learner'
    and exists (
      select 1 from public.college_students cs
      where cs.id = college_epa_judgements.college_student_id
        and cs.user_id = (select auth.uid())
        and cs.college_id = college_epa_judgements.college_id
    )
  );

-- Signed-in users may only change the outcome on an existing judgement.
-- Runs as the caller (SECURITY INVOKER), so the demote trigger — SECURITY
-- DEFINER, running as the owner — and the service role are unaffected.
create or replace function public.tg_epa_judgements_outcome_only()
returns trigger
language plpgsql
set search_path = public
as $function$
begin
  if current_user not in ('authenticated', 'anon') then
    return new;
  end if;
  if (to_jsonb(new) - array['actual_outcome', 'actual_recorded_at', 'actual_recorded_by',
                             'actual_epa_date', 'updated_at'])
     is distinct from
     (to_jsonb(old) - array['actual_outcome', 'actual_recorded_at', 'actual_recorded_by',
                            'actual_epa_date', 'updated_at']) then
    raise exception 'Only the EPA outcome can be changed on a judgement — record a new verdict instead'
      using errcode = '42501';
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_epa_judgements_outcome_only on public.college_epa_judgements;
create trigger trg_epa_judgements_outcome_only
  before update on public.college_epa_judgements
  for each row execute function public.tg_epa_judgements_outcome_only();

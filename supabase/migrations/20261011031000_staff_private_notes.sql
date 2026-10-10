-- Private assessor notes on evidence and criterion decisions (10 Oct 2026).
--
-- An assessor, tutor or IQA can leave a note on a piece of evidence or a
-- criterion decision that only staff see: assessors, tutors, IQA, and EQA
-- (read only). Never the learner, never an employer. The rule lives in RLS,
-- not the UI: the learner's own id is excluded outright, and reading needs
-- _can_assess / _can_iqa or an EQA seat at the learner's college.
--
-- Append-only: a note is a record of what staff thought at the time. A
-- correction is a new note. No update or delete policy, and a guard trigger
-- stops the table owner's API roles changing one.
begin;
set local lock_timeout = '5s';

create table if not exists public.portfolio_staff_notes (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references auth.users(id) on delete cascade,
  portfolio_item_ids uuid[] not null default '{}',
  -- 'UNIT:AC' pairs, the same spelling as college_observations.acs_evidenced.
  criteria text[] not null default '{}',
  decision_id uuid references public.portfolio_assessment_decisions(id) on delete set null,
  body text not null,
  author_id uuid not null,
  author_name text,
  author_role text,
  created_at timestamptz not null default now(),
  constraint portfolio_staff_notes_body_len check (length(trim(body)) between 1 and 4000),
  constraint portfolio_staff_notes_scope check (cardinality(portfolio_item_ids) <= 50 and cardinality(criteria) <= 80)
);
create index if not exists psn_learner_idx on public.portfolio_staff_notes (learner_id, created_at desc);
create index if not exists psn_items_idx on public.portfolio_staff_notes using gin (portfolio_item_ids);

-- Who may read staff-only notes about this learner. Never the learner, never
-- while an admin is viewing the app as someone else.
create or replace function public._can_read_staff_notes(p_learner uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select auth.uid() is not null
     and p_learner is not null
     and auth.uid() <> p_learner
     and not public._viewing_as_now()
     and (
       public._can_assess(p_learner)
       or public._can_iqa(p_learner)
       or exists (select 1
                    from public.college_students cs
                    join public.college_staff st on st.college_id = cs.college_id
                   where cs.user_id = p_learner
                     and st.user_id = auth.uid()
                     and st.archived_at is null
                     and st.role = 'eqa')
     );
$$;
revoke all on function public._can_read_staff_notes(uuid) from public, anon;
grant execute on function public._can_read_staff_notes(uuid) to authenticated;

create or replace function public._psn_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- The author is whoever is signed in (a definer trigger cannot test current_user).
  new.author_id := coalesce(auth.uid(), new.author_id);
  new.created_at := now();
  if new.author_id is null then
    raise exception 'a staff note needs an author' using errcode = '42501';
  end if;
  new.body := trim(new.body);
  select coalesce(nullif(trim(full_name), ''), 'Staff') into new.author_name
    from public.profiles where id = new.author_id;
  select st.role into new.author_role
    from public.college_students cs
    join public.college_staff st on st.college_id = cs.college_id
   where cs.user_id = new.learner_id and st.user_id = new.author_id and st.archived_at is null
   order by st.created_at limit 1;
  if new.author_role is null then
    select l.role into new.author_role from public.portfolio_assessor_links l
     where l.learner_id = new.learner_id and l.assessor_user_id = new.author_id and l.status = 'active'
     limit 1;
  end if;
  -- Only evidence that belongs to this learner.
  new.portfolio_item_ids := coalesce((
    select array_agg(i.id) from public.portfolio_items i
     where i.id = any (new.portfolio_item_ids) and i.user_id = new.learner_id), '{}');
  if new.decision_id is not null and not exists (
       select 1 from public.portfolio_assessment_decisions d
        where d.id = new.decision_id and d.learner_id = new.learner_id) then
    new.decision_id := null;
  end if;
  return new;
end $$;

create or replace function public._psn_no_change()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if current_user in ('authenticated', 'anon') then
    raise exception 'a staff note is never edited or deleted; add a new note' using errcode = '42501';
  end if;
  return coalesce(new, old);
end $$;

drop trigger if exists trg_psn_before_insert on public.portfolio_staff_notes;
create trigger trg_psn_before_insert before insert on public.portfolio_staff_notes
  for each row execute function public._psn_before_insert();
drop trigger if exists trg_psn_no_change on public.portfolio_staff_notes;
create trigger trg_psn_no_change before update or delete on public.portfolio_staff_notes
  for each row execute function public._psn_no_change();

alter table public.portfolio_staff_notes enable row level security;

drop policy if exists "Staff read staff-only notes" on public.portfolio_staff_notes;
create policy "Staff read staff-only notes" on public.portfolio_staff_notes
  for select to authenticated using (public._can_read_staff_notes(learner_id));

drop policy if exists "Assessing staff add staff-only notes" on public.portfolio_staff_notes;
create policy "Assessing staff add staff-only notes" on public.portfolio_staff_notes
  for insert to authenticated
  with check (learner_id <> auth.uid()
              and public._can_assess(learner_id)
              and not public.current_user_is_read_only_staff());

revoke all on public.portfolio_staff_notes from anon;
grant select, insert on public.portfolio_staff_notes to authenticated;

comment on table public.portfolio_staff_notes is
  '[PORTFOLIO — STAFF ONLY] Private assessor notes on a piece of evidence and/or criteria (UNIT:AC) or a decision. "Only staff see this": assessors, tutors, IQA and EQA (read only); never the learner or an employer — enforced by RLS via _can_read_staff_notes(). Scope: learner_id = apprentice auth uid. Used by: AcDecisionSheet, LearnerAssessmentView (Student 360 assess, /assessor), StaffNotes. Rule: append-only (no update/delete); never in the learner copy of the evidence pack.';

commit;

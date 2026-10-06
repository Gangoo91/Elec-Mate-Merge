-- Site diary review fixes (6 Oct 2026).
--
-- 1. Shared entries: the row policy handed college staff the WHOLE row,
--    mood_rating included, while the app promises "never how the day felt".
--    RLS can't hide a column, so staff read through a function instead.
-- 2. An apprentice could delete their own OTJ rows after a tutor had signed
--    them off (the recorder policy had no status guard and the self-edit
--    trigger covers UPDATE only). Learner-recorded rows are deletable only
--    while pending; staff keep what they had.
-- 3. Days that aren't site days (college day, off, holiday, sick) so the week
--    strip, calendar and streak stop calling a college day "missed".

-- 1 ─────────────────────────────────────────────────────────────────────────
drop policy if exists "College staff read shared diary entries" on public.site_diary_entries;

create or replace function public.college_shared_diary_entries(p_learner uuid)
returns table (
  id uuid,
  date date,
  site_name text,
  supervisor text,
  tasks_completed text[],
  what_i_learned text,
  issues_or_questions text,
  photos text[],
  training_minutes integer,
  training_type text,
  unit_codes text[],
  linked_otj_entry_id uuid,
  linked_portfolio_id uuid,
  updated_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select e.id, e.date, e.site_name, e.supervisor, e.tasks_completed,
         e.what_i_learned, e.issues_or_questions, e.photos,
         e.training_minutes, e.training_type, e.unit_codes,
         e.linked_otj_entry_id, e.linked_portfolio_id, e.updated_at
  from public.site_diary_entries e
  where e.user_id = p_learner
    and e.share_with_tutor
    and public.is_staff_for_learner_user(p_learner)
  order by e.date desc, e.created_at desc;
$$;

revoke all on function public.college_shared_diary_entries(uuid) from public, anon;
grant execute on function public.college_shared_diary_entries(uuid) to authenticated;

comment on function public.college_shared_diary_entries(uuid) is
  'College staff read a learner''s diary entries the learner chose to share. Never returns mood_rating.';

-- 2 ─────────────────────────────────────────────────────────────────────────
drop policy if exists "Recorder can delete OTJ entries" on public.college_otj_entries;
create policy "Recorder can delete OTJ entries"
  on public.college_otj_entries
  for delete
  to authenticated
  using (
    recorded_by = (select auth.uid())
    and (verification_status = 'pending' or public._ch_same_college(college_id))
  );

-- 3 ─────────────────────────────────────────────────────────────────────────
create table if not exists public.site_diary_day_marks (
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null,
  kind text not null check (kind in ('college', 'off', 'holiday', 'sick')),
  created_at timestamptz not null default now(),
  primary key (user_id, date)
);

alter table public.site_diary_day_marks enable row level security;

create policy "Own day marks" on public.site_diary_day_marks
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

comment on table public.site_diary_day_marks is
  '[PORTFOLIO — OWNED BY THE APPRENTICE] A weekday in the site diary that was not a site day (college, off, holiday, sick). Scope: the apprentice''s own. Used by: Site diary week strip, calendar, streak. Rule: one mark per user per date; a diary entry on the same date wins.';

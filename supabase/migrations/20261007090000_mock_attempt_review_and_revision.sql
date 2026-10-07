-- ELE-1815 — mock exam history you can actually go back into (7 Oct 2026).
--
-- seo_mock_attempts kept a score per attempt, but which questions were wrong
-- only for banks with numeric ids (67 of 869 signed-in attempts in 30 days)
-- and never what the learner picked. Nothing could be reviewed once the
-- results page closed. Each signed-in attempt now carries:
--   exam_name    — the paper's own title, for the history list
--   retake_path  — the route the paper lives at, for "Take it again"
--   served_keys  — a stable key per question served (hash of the question
--                  text), so a later correct answer can clear a miss
--   review       — a snapshot of every question got wrong or skipped: the
--                  question, the options as shown, what was picked, the right
--                  answer, the explanation and its section/topic. Self-
--                  contained, so a past attempt reviews the same forever
--                  whichever bank it came from.
-- Anonymous public attempts never carry a review (no one to show it to).

alter table public.seo_mock_attempts
  add column if not exists exam_name text,
  add column if not exists retake_path text,
  add column if not exists served_keys text[],
  add column if not exists review jsonb;

-- The insert policy is the only gate on this table (anon can write), so the
-- new columns are bounded here.
drop policy if exists "anon can insert seo mock attempts" on public.seo_mock_attempts;
create policy "anon can insert seo mock attempts"
  on public.seo_mock_attempts
  for insert
  to anon, authenticated
  with check (
    score >= 0
    and total_questions between 1 and 100
    and score <= total_questions
    and percentage between 0 and 100
    and time_taken_seconds between 30 and 7200
    and char_length(exam_slug) between 1 and 100
    and (topic_slug is null or char_length(topic_slug) between 1 and 100)
    and (user_agent_hint is null or char_length(user_agent_hint) <= 500)
    and (referrer is null or char_length(referrer) <= 1000)
    and source = any (array['seo', 'in_app'])
    and (user_id is null or user_id = auth.uid())
    and (exam_name is null or char_length(exam_name) between 1 and 200)
    and (retake_path is null or (char_length(retake_path) between 1 and 300 and left(retake_path, 1) = '/'))
    and (served_keys is null or (user_id is not null and cardinality(served_keys) <= 100))
    and (
      review is null
      or (
        user_id is not null
        and jsonb_typeof(review) = 'array'
        and jsonb_array_length(review) <= 100
        and pg_column_size(review) <= 250000
      )
    )
  );

create index if not exists seo_mock_attempts_user_created_idx
  on public.seo_mock_attempts (user_id, created_at desc)
  where user_id is not null;

-- Questions a learner has since got right in a revision round. A miss is
-- "still to revise" until a later attempt answers it right or it is cleared here.
create table if not exists public.mock_revision_cleared (
  user_id uuid not null references auth.users (id) on delete cascade,
  question_key text not null check (char_length(question_key) between 1 and 64),
  cleared_at timestamptz not null default now(),
  primary key (user_id, question_key)
);

alter table public.mock_revision_cleared enable row level security;

create policy "Own cleared revision questions" on public.mock_revision_cleared
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

comment on table public.mock_revision_cleared is
  '[STUDY CENTRE — OWNED BY THE LEARNER] A mock-exam question the learner got right in a revision round, so it leaves their revision pile. Scope: the learner''s own. Used by: Study Centre mock history + revision. Rule: one row per user per question key (hash of the question text); re-clearing updates cleared_at.';

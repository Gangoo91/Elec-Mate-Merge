-- ELE-1815 round 4 (7 Oct 2026): spaced repetition, per-topic accuracy, pass mark.
--
-- 1. topic_stats on each signed-in attempt: { "<topic>": {"n": served, "r": right,
--    "s": section, "m": module} } — so strength is measured as a percentage of
--    what was asked, not a count of misses (which favoured topics that come up a lot).
-- 2. pass_mark on each attempt, for the pass forecast (papers differ).
-- 3. Spaced repetition for the revision pile. Getting a question right once
--    used to take it off the pile; now it comes back after 1, 3 and 7 days and
--    is "learned" after the third right answer after a gap. Wrong at any step
--    starts it again. A fresh miss in a later mock puts it back on the schedule.

alter table public.seo_mock_attempts
  add column if not exists topic_stats jsonb,
  add column if not exists pass_mark smallint;

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
    and (
      topic_stats is null
      or (user_id is not null and jsonb_typeof(topic_stats) = 'object' and pg_column_size(topic_stats) <= 20000)
    )
    and (pass_mark is null or pass_mark between 1 and 100)
  );

-- ── Spaced repetition state ────────────────────────────────────────────────
create table if not exists public.mock_revision_state (
  user_id uuid not null references auth.users (id) on delete cascade,
  question_key text not null check (char_length(question_key) between 1 and 64),
  -- 0 = due now; 1, 2 after one and two right answers; 3 = learned.
  step smallint not null default 0 check (step between 0 and 3),
  due_at timestamptz not null default now(),
  mastered_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, question_key)
);

alter table public.mock_revision_state enable row level security;

create policy "Own revision schedule" on public.mock_revision_state
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

comment on table public.mock_revision_state is
  '[STUDY CENTRE — OWNED BY THE LEARNER] Spaced-repetition schedule for mock-exam questions the learner got wrong: step 0–3, next due, learned. Scope: the learner''s own. Used by: Study Centre revision pile (mock_revision_pile / mock_revision_answer). Rule: right → +1 step, due in 1/3/7 days, learned at step 3; wrong → step 0, due now.';

-- Carry over anything already cleared under the old one-right-answer rule.
insert into public.mock_revision_state (user_id, question_key, step, due_at, mastered_at, updated_at)
select user_id, question_key, 3, cleared_at, cleared_at, cleared_at
from public.mock_revision_cleared
on conflict do nothing;

-- One answer in a revision round.
create or replace function public.mock_revision_answer(p_key text, p_right boolean)
returns table (step smallint, due_at timestamptz, mastered boolean)
language plpgsql
security invoker
set search_path = public
as $$
#variable_conflict use_column
declare
  cur public.mock_revision_state;
  last_miss timestamptz;
  base smallint;
  next_step smallint;
begin
  if auth.uid() is null then
    raise exception 'not signed in' using errcode = '42501';
  end if;
  select * into cur from public.mock_revision_state s
  where s.user_id = auth.uid() and s.question_key = p_key;

  -- A fresh miss in a mock since the schedule last moved restarts it — or a
  -- question learned once and missed again would be "learned" after one tap.
  select max(a.created_at) into last_miss
  from public.seo_mock_attempts a, jsonb_array_elements(coalesce(a.review, '[]'::jsonb)) r
  where a.user_id = auth.uid() and r.value ->> 'k' = p_key and jsonb_typeof(r.value -> 'a') = 'number';
  base := case
    when cur.user_id is null then 0
    when last_miss is not null and cur.updated_at < last_miss then 0
    else cur.step
  end;

  if p_right then
    next_step := least(base + 1, 3);
  else
    next_step := 0;
  end if;

  insert into public.mock_revision_state as s (user_id, question_key, step, due_at, mastered_at, updated_at)
  values (
    auth.uid(), p_key, next_step,
    now() + case next_step when 1 then interval '1 day' when 2 then interval '3 days' when 3 then interval '7 days' else interval '0' end,
    case when next_step = 3 then now() end,
    now()
  )
  on conflict (user_id, question_key) do update
    set step = excluded.step,
        due_at = excluded.due_at,
        mastered_at = excluded.mastered_at,
        updated_at = excluded.updated_at;

  return query select next_step, (select x.due_at from public.mock_revision_state x where x.user_id = auth.uid() and x.question_key = p_key), next_step = 3;
end;
$$;

-- The pile, now with the schedule. A question is on the pile when the latest
-- thing that happened to it in a MOCK was a wrong answer, and it hasn't been
-- learned (step 3) since. `due` = due now: no schedule yet, the schedule
-- predates that miss (a fresh miss restarts it), or due_at has passed.
drop function if exists public.mock_revision_pile(int, int);
create or replace function public.mock_revision_pile(p_days int default 120, p_limit int default 200)
returns table (
  question_key text,
  item jsonb,
  attempt_id uuid,
  exam_slug text,
  exam_name text,
  missed_at timestamptz,
  misses int,
  step smallint,
  due_at timestamptz,
  due boolean
)
language sql
stable
security invoker
set search_path = public
as $$
  with att as (
    select a.id, a.exam_slug, a.exam_name, a.created_at, a.review, a.served_keys
    from public.seo_mock_attempts a
    where a.user_id = auth.uid()
      and a.created_at > now() - make_interval(days => least(greatest(p_days, 1), 365))
      and (a.review is not null or a.served_keys is not null)
  ),
  wrong as (
    select a.id as attempt_id, a.exam_slug, a.exam_name, a.created_at,
           r.value as item, r.value ->> 'k' as k
    from att a, jsonb_array_elements(coalesce(a.review, '[]'::jsonb)) r
    where jsonb_typeof(r.value -> 'a') = 'number'
  ),
  in_review as (
    select a.id, r.value ->> 'k' as k
    from att a, jsonb_array_elements(coalesce(a.review, '[]'::jsonb)) r
  ),
  right_answers as (
    select a.created_at, sk.key as k
    from att a, unnest(coalesce(a.served_keys, '{}')) as sk(key)
    where not exists (select 1 from in_review ir where ir.id = a.id and ir.k = sk.key)
  ),
  events as (
    select k, created_at, true as is_wrong from wrong
    union all
    select k, created_at, false from right_answers
  ),
  latest as (
    select distinct on (k) k, created_at, is_wrong
    from events
    order by k, created_at desc, is_wrong desc
  ),
  counts as (
    select k, count(distinct attempt_id)::int as misses from wrong group by k
  ),
  picked as (
    select distinct on (w.k) w.k, w.item, w.attempt_id, w.exam_slug, w.exam_name, w.created_at
    from latest l
    join wrong w on w.k = l.k and w.created_at = l.created_at
    where l.is_wrong
    order by w.k
  )
  select p.k, p.item, p.attempt_id, p.exam_slug, p.exam_name, p.created_at, c.misses,
         case when s.updated_at is null or s.updated_at < p.created_at then 0::smallint else s.step end,
         case when s.updated_at is null or s.updated_at < p.created_at then p.created_at else s.due_at end,
         (s.updated_at is null or s.updated_at < p.created_at or s.due_at <= now())
  from picked p
  join counts c on c.k = p.k
  left join public.mock_revision_state s on s.user_id = auth.uid() and s.question_key = p.k
  where not (s.mastered_at is not null and s.mastered_at >= p.created_at)
  order by
    (s.updated_at is null or s.updated_at < p.created_at or s.due_at <= now()) desc,
    p.created_at desc
  limit least(greatest(p_limit, 1), 500);
$$;

-- Due now / waiting on the schedule.
drop function if exists public.mock_revision_pile_count(int);
create or replace function public.mock_revision_pile_count(p_days int default 120)
returns table (due int, scheduled int)
language sql
stable
security invoker
set search_path = public
as $$
  select count(*) filter (where p.due)::int, count(*) filter (where not p.due)::int
  from public.mock_revision_pile(p_days, 500) p;
$$;

-- Old single-right clear kept for any open tab: now one right answer.
create or replace function public.mock_revision_clear(p_key text)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  perform public.mock_revision_answer(p_key, true);
end;
$$;

-- Topic accuracy across mocks: questions asked and got right per topic, with
-- where the latest one came from (for its study link).
create or replace function public.mock_topic_stats(p_days int default 120)
returns table (topic text, asked int, got_right int, exam_slug text, section text, module text, last_seen timestamptz)
language sql
stable
security invoker
set search_path = public
as $$
  with rows as (
    select a.exam_slug, a.created_at, t.key as topic, t.value as v
    from public.seo_mock_attempts a, jsonb_each(a.topic_stats) t
    where a.user_id = auth.uid()
      and a.topic_stats is not null
      and a.created_at > now() - make_interval(days => least(greatest(p_days, 1), 365))
  ),
  latest as (
    -- 'x' = the question's real paper (weak-spots mock mixes papers).
    select distinct on (topic) topic, coalesce(v ->> 'x', exam_slug) as exam_slug, v ->> 's' as section, v ->> 'm' as module, created_at
    from rows
    order by topic, created_at desc
  )
  select r.topic, sum((r.v ->> 'n')::int)::int, sum((r.v ->> 'r')::int)::int,
         l.exam_slug, l.section, l.module, max(r.created_at)
  from rows r join latest l on l.topic = r.topic
  group by r.topic, l.exam_slug, l.section, l.module;
$$;

revoke all on function public.mock_revision_answer(text, boolean) from public, anon;
revoke all on function public.mock_revision_pile(int, int) from public, anon;
revoke all on function public.mock_revision_pile_count(int) from public, anon;
revoke all on function public.mock_topic_stats(int) from public, anon;
grant execute on function public.mock_revision_answer(text, boolean) to authenticated;
grant execute on function public.mock_revision_pile(int, int) to authenticated;
grant execute on function public.mock_revision_pile_count(int) to authenticated;
grant execute on function public.mock_topic_stats(int) to authenticated;

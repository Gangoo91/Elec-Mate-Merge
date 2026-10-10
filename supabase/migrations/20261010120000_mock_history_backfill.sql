-- Mock exam history: everyone's past sittings filled in (10 Oct 2026).
-- Andrew: "make it so its back filled with everyones history".
--
-- Topic results only started being stored on mock attempts on 7 Oct 2026, so
-- "How you're doing by topic" was empty for everyone who sat papers before
-- then. But StandardMockExam has always ALSO saved each sitting to
-- quiz_results with a per-topic category_breakdown. 561 attempts match their
-- quiz_results twin one-to-one (same learner, within 2 minutes, same score):
-- their topic results are copied across in the attempt's own format.
--
-- quiz_results that have no mock-attempt twin are the in-app topic tests
-- (Inspection & Testing, BS 7671, EV…, ~1,050 since January). They never
-- appeared in history; mock_topic_stats now counts their topics too.
--
-- Reversible: the ids filled are recorded; set their topic_stats back to null.

create table if not exists public.seo_mock_topic_backfill_20261010 (
  attempt_id uuid primary key,
  quiz_result_id uuid not null
);
comment on table public.seo_mock_topic_backfill_20261010 is
  '[STUDY] Mock attempts whose topic_stats were filled from their quiz_results twin on 10 Oct 2026. Scope: admin only. Used by: rollback. Rule: read-only.';
alter table public.seo_mock_topic_backfill_20261010 enable row level security;

with pairs as (
  select s.id as attempt_id, q.id as quiz_result_id, q.category_breakdown, s.exam_slug
  from public.quiz_results q
  join lateral (
    select s.id, s.exam_slug
    from public.seo_mock_attempts s
    where s.user_id = q.user_id
      and s.topic_stats is null
      and abs(extract(epoch from (s.created_at - q.completed_at))) < 120
      and abs(s.percentage - round(q.percentage)) <= 1
    order by abs(extract(epoch from (s.created_at - q.completed_at)))
    limit 1
  ) s on true
  where jsonb_typeof(q.category_breakdown) = 'object'
),
ins as (
  insert into public.seo_mock_topic_backfill_20261010 (attempt_id, quiz_result_id)
  select attempt_id, quiz_result_id from pairs
  on conflict do nothing
  returning attempt_id
)
update public.seo_mock_attempts a
set topic_stats = (
  select jsonb_object_agg(
           t.key,
           jsonb_build_object(
             'n', (t.value ->> 'total')::int,
             'a', (t.value ->> 'total')::int,
             'r', (t.value ->> 'correct')::int,
             'x', p.exam_slug))
  from jsonb_each(p.category_breakdown) t
  where jsonb_typeof(t.value -> 'total') = 'number'
    and jsonb_typeof(t.value -> 'correct') = 'number'
)
from pairs p
where a.id = p.attempt_id
  and a.topic_stats is null;

-- Topic accuracy across mocks AND the topic tests that have no mock twin.
create or replace function public.mock_topic_stats(p_days integer default 120)
returns table(topic text, asked integer, answered integer, got_right integer, exam_slug text, section text, module text, last_seen timestamp with time zone)
language sql stable set search_path to 'public' as $function$
  with since as (
    select now() - make_interval(days => least(greatest(p_days, 1), 730)) as d
  ),
  mock_rows as (
    select a.exam_slug, a.created_at, t.key as topic,
           (t.value ->> 'n')::int as n,
           case when jsonb_typeof(t.value -> 'a') = 'number' then (t.value ->> 'a')::int else (t.value ->> 'n')::int end as a,
           (t.value ->> 'r')::int as r,
           coalesce(t.value ->> 'x', a.exam_slug) as x,
           t.value ->> 's' as s, t.value ->> 'm' as m
    from public.seo_mock_attempts a, since, jsonb_each(a.topic_stats) t
    where a.user_id = auth.uid()
      and jsonb_typeof(a.topic_stats) = 'object'
      and a.created_at > since.d
      and jsonb_typeof(t.value -> 'n') = 'number'
      and jsonb_typeof(t.value -> 'r') = 'number'
  ),
  test_rows as (
    -- Topic tests with no mock-attempt twin (a twin's topics are already above).
    select q.assessment_id as exam_slug, q.completed_at as created_at, t.key as topic,
           (t.value ->> 'total')::int as n, (t.value ->> 'total')::int as a,
           (t.value ->> 'correct')::int as r, q.assessment_id as x,
           null::text as s, null::text as m
    from public.quiz_results q, since, jsonb_each(q.category_breakdown) t
    where q.user_id = auth.uid()
      and jsonb_typeof(q.category_breakdown) = 'object'
      and q.completed_at > since.d
      and jsonb_typeof(t.value -> 'total') = 'number'
      and jsonb_typeof(t.value -> 'correct') = 'number'
      and not exists (
        select 1 from public.seo_mock_attempts s
        where s.user_id = q.user_id
          and abs(extract(epoch from (s.created_at - q.completed_at))) < 120
      )
  ),
  rows as (select * from mock_rows union all select * from test_rows),
  latest as (
    select distinct on (topic) topic, x as exam_slug, s as section, m as module
    from rows
    order by topic, created_at desc
  )
  select r.topic, sum(r.n)::int, sum(r.a)::int, sum(r.r)::int,
         l.exam_slug, l.section, l.module, max(r.created_at)
  from rows r join latest l on l.topic = r.topic
  group by r.topic, l.exam_slug, l.section, l.module;
$function$;

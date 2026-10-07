-- ELE-1815 round 5 (7 Oct 2026): topic accuracy out of ANSWERED questions.
-- An abandoned paper counted every skipped question as wrong, so one walked-
-- away sitting painted every topic 0%. topic_stats now carries `a` (answered);
-- rows from before it fall back to `n`.

drop function if exists public.mock_topic_stats(int);
create or replace function public.mock_topic_stats(p_days int default 120)
returns table (topic text, asked int, answered int, got_right int, exam_slug text, section text, module text, last_seen timestamptz)
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
    select distinct on (topic) topic, coalesce(v ->> 'x', exam_slug) as exam_slug, v ->> 's' as section, v ->> 'm' as module, created_at
    from rows
    order by topic, created_at desc
  )
  select r.topic,
         sum((r.v ->> 'n')::int)::int,
         sum(coalesce((r.v ->> 'a')::int, (r.v ->> 'n')::int))::int,
         sum((r.v ->> 'r')::int)::int,
         l.exam_slug, l.section, l.module, max(r.created_at)
  from rows r join latest l on l.topic = r.topic
  group by r.topic, l.exam_slug, l.section, l.module;
$$;

revoke all on function public.mock_topic_stats(int) from public, anon;
grant execute on function public.mock_topic_stats(int) to authenticated;

-- ELE-1815 round 5 review fixes (7 Oct 2026).
--
-- 1. topic_stats values must be numbers. The insert policy only checked "an
--    object under 20 KB", so one row like {"x":{"n":"abc"}} made every
--    ::int cast fail — killing the weekly nudge for everyone and that
--    learner's tutor view. Checked on insert AND skipped on read.
-- 2. The schedule can't be skipped: a right answer only moves a question up
--    when it was actually due (or is new/re-missed). Drilling the same attempt
--    three times in a row used to mark it learned in minutes.

-- 1a. Insert: every topic value's n / r (and a, when present) are numbers.
create or replace function public._topic_stats_valid(p jsonb)
returns boolean
language sql
immutable
set search_path = public
as $$
  select p is null or (
    jsonb_typeof(p) = 'object'
    and not exists (
      select 1 from jsonb_each(p) e
      where jsonb_typeof(e.value) <> 'object'
         or jsonb_typeof(e.value -> 'n') is distinct from 'number'
         or jsonb_typeof(e.value -> 'r') is distinct from 'number'
         or (e.value ? 'a' and jsonb_typeof(e.value -> 'a') is distinct from 'number')
    )
  );
$$;

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
      or (user_id is not null and pg_column_size(topic_stats) <= 20000 and public._topic_stats_valid(topic_stats))
    )
    and (pass_mark is null or pass_mark between 1 and 100)
  );

-- 1b. Reads skip anything malformed that's already there.
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
      and jsonb_typeof(a.topic_stats) = 'object'
      and a.created_at > now() - make_interval(days => least(greatest(p_days, 1), 365))
      and jsonb_typeof(t.value -> 'n') = 'number'
      and jsonb_typeof(t.value -> 'r') = 'number'
  ),
  latest as (
    select distinct on (topic) topic, coalesce(v ->> 'x', exam_slug) as exam_slug, v ->> 's' as section, v ->> 'm' as module, created_at
    from rows
    order by topic, created_at desc
  )
  select r.topic,
         sum((r.v ->> 'n')::int)::int,
         sum(case when jsonb_typeof(r.v -> 'a') = 'number' then (r.v ->> 'a')::int else (r.v ->> 'n')::int end)::int,
         sum((r.v ->> 'r')::int)::int,
         l.exam_slug, l.section, l.module, max(r.created_at)
  from rows r join latest l on l.topic = r.topic
  group by r.topic, l.exam_slug, l.section, l.module;
$$;

create or replace function public.college_learner_mock_summary(p_learner uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_attempts jsonb;
  v_topics jsonb;
  v_pile int;
begin
  if not public.is_staff_for_learner_user(p_learner) then
    raise exception 'not staff for this learner' using errcode = '42501';
  end if;

  select coalesce(jsonb_agg(x order by x.created_at desc), '[]'::jsonb) into v_attempts
  from (
    select a.exam_slug, a.exam_name, a.percentage, a.passed, a.score, a.total_questions,
           coalesce(a.pass_mark, 60) as pass_mark, a.created_at
    from public.seo_mock_attempts a
    where a.user_id = p_learner
    order by a.created_at desc
    limit 30
  ) x;

  select coalesce(jsonb_agg(t order by t.pct asc, t.answered desc), '[]'::jsonb) into v_topics
  from (
    select tk.key as topic,
           sum((tk.value ->> 'n')::int) as asked,
           sum(case when jsonb_typeof(tk.value -> 'a') = 'number' then (tk.value ->> 'a')::int else (tk.value ->> 'n')::int end) as answered,
           sum((tk.value ->> 'r')::int) as got_right,
           round(100.0 * sum((tk.value ->> 'r')::int)
             / nullif(sum(case when jsonb_typeof(tk.value -> 'a') = 'number' then (tk.value ->> 'a')::int else (tk.value ->> 'n')::int end), 0))::int as pct
    from public.seo_mock_attempts a, jsonb_each(a.topic_stats) tk
    where a.user_id = p_learner
      and jsonb_typeof(a.topic_stats) = 'object'
      and a.created_at > now() - interval '120 days'
      and jsonb_typeof(tk.value -> 'n') = 'number'
      and jsonb_typeof(tk.value -> 'r') = 'number'
    group by tk.key
    having sum(case when jsonb_typeof(tk.value -> 'a') = 'number' then (tk.value ->> 'a')::int else (tk.value ->> 'n')::int end) > 0
  ) t;

  select count(*)::int into v_pile
  from public._mock_revision_pile_for(p_learner, 120, 500);

  return jsonb_build_object('attempts', v_attempts, 'topics', v_topics, 'to_revise', v_pile);
end;
$$;

create or replace function public.mock_revision_nudge_candidates(p_min_due int default 3)
returns table (user_id uuid, due int, weakest_topic text, weakest_pct int)
language sql
stable
security definer
set search_path = public
as $$
  with active as (
    select distinct a.user_id
    from public.seo_mock_attempts a
    where a.user_id is not null
      and a.created_at > now() - interval '30 days'
      and a.review is not null
  ),
  -- Study Centre notifications turned off → no nudge (same rule as the
  -- daily digest's study senders).
  eligible as (
    select u.user_id from active u
    where not exists (
      select 1 from public.notification_preferences np
      where np.user_id = u.user_id and np.category = 'study_centre' and np.enabled = false
    )
  ),
  due as (
    select u.user_id, (select count(*) from public._mock_revision_pile_for(u.user_id, 120, 500) p where p.due)::int as due
    from eligible u
  ),
  topics as (
    select a.user_id, tk.key as topic,
           sum(case when jsonb_typeof(tk.value -> 'a') = 'number' then (tk.value ->> 'a')::int else (tk.value ->> 'n')::int end) as answered,
           sum((tk.value ->> 'r')::int) as got_right
    from public.seo_mock_attempts a, jsonb_each(a.topic_stats) tk
    where a.user_id in (select user_id from eligible)
      and jsonb_typeof(a.topic_stats) = 'object'
      and a.created_at > now() - interval '120 days'
      and jsonb_typeof(tk.value -> 'n') = 'number'
      and jsonb_typeof(tk.value -> 'r') = 'number'
    group by a.user_id, tk.key
    having sum(case when jsonb_typeof(tk.value -> 'a') = 'number' then (tk.value ->> 'a')::int else (tk.value ->> 'n')::int end) >= 3
  ),
  weakest as (
    select distinct on (user_id) user_id, topic,
           round(100.0 * got_right / nullif(answered, 0))::int as pct
    from topics
    order by user_id, (got_right::numeric / nullif(answered, 0)) asc, answered desc
  )
  select d.user_id, d.due, w.topic, w.pct
  from due d
  left join weakest w on w.user_id = d.user_id
  where d.due >= greatest(p_min_due, 1)
    and not exists (
      select 1 from public.user_notifications n
      where n.user_id = d.user_id and n.type = 'mock_revision_nudge'
        and n.created_at > now() - interval '6 days'
    );
$$;

-- 2. Only a DUE right answer moves the schedule on.
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
  fresh boolean;
  base smallint;
  next_step smallint;
  next_due timestamptz;
begin
  if auth.uid() is null then
    raise exception 'not signed in' using errcode = '42501';
  end if;
  select * into cur from public.mock_revision_state s
  where s.user_id = auth.uid() and s.question_key = p_key;

  select max(a.created_at) into last_miss
  from public.seo_mock_attempts a, jsonb_array_elements(coalesce(a.review, '[]'::jsonb)) r
  where a.user_id = auth.uid() and r.value ->> 'k' = p_key and jsonb_typeof(r.value -> 'a') = 'number';

  -- New to the schedule, or missed again in a mock since it last moved.
  fresh := cur.user_id is null or (last_miss is not null and cur.updated_at < last_miss);
  base := case when fresh then 0 else cur.step end;

  if not p_right then
    next_step := 0;
    next_due := now();
  elsif fresh or cur.due_at <= now() then
    next_step := least(base + 1, 3);
    next_due := now() + case next_step when 1 then interval '1 day' when 2 then interval '3 days' else interval '7 days' end;
  else
    -- Right, but not due yet (e.g. drilling the same attempt again): keep
    -- the schedule as it is — spacing is the point.
    next_step := cur.step;
    next_due := cur.due_at;
  end if;

  insert into public.mock_revision_state as s (user_id, question_key, step, due_at, mastered_at, updated_at)
  values (auth.uid(), p_key, next_step, next_due, case when next_step = 3 then coalesce(cur.mastered_at, now()) end, now())
  on conflict (user_id, question_key) do update
    set step = excluded.step,
        due_at = excluded.due_at,
        mastered_at = excluded.mastered_at,
        updated_at = case
          when excluded.step = s.step and excluded.due_at = s.due_at then s.updated_at
          else excluded.updated_at
        end;

  return query select next_step, next_due, next_step = 3;
end;
$$;

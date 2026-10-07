-- ELE-1815 round 4 (7 Oct 2026): the weekly "questions to revise" nudge.
--
-- The pile rule now lives in ONE internal function, _mock_revision_pile_for,
-- so the learner's own view (mock_revision_pile, always for auth.uid()) and
-- the weekly nudge (service role, every active learner) can't drift apart.
-- The internal function is service-role only; the public wrapper only ever
-- passes the caller's own id.

create or replace function public._mock_revision_pile_for(p_user uuid, p_days int default 120, p_limit int default 200)
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
security definer
set search_path = public
as $$
  with att as (
    select a.id, a.exam_slug, a.exam_name, a.created_at, a.review, a.served_keys
    from public.seo_mock_attempts a
    where a.user_id = p_user
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
  left join public.mock_revision_state s on s.user_id = p_user and s.question_key = p.k
  where not (s.mastered_at is not null and s.mastered_at >= p.created_at)
  order by
    (s.updated_at is null or s.updated_at < p.created_at or s.due_at <= now()) desc,
    p.created_at desc
  limit least(greatest(p_limit, 1), 500);
$$;

revoke all on function public._mock_revision_pile_for(uuid, int, int) from public, anon, authenticated;
grant execute on function public._mock_revision_pile_for(uuid, int, int) to service_role;

-- The learner's own pile: the same rule, for the caller only.
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
security definer
set search_path = public
as $$
  select * from public._mock_revision_pile_for(auth.uid(), p_days, p_limit)
  where auth.uid() is not null;
$$;

revoke all on function public.mock_revision_pile(int, int) from public, anon;
grant execute on function public.mock_revision_pile(int, int) to authenticated;

-- Who to nudge this week: signed-in learners who sat a mock in the last 30
-- days, have at least 3 wrong answers due now, and weren't nudged in the last
-- 6 days. With their weakest topic (lowest accuracy, asked 3+ times).
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
  due as (
    select u.user_id, (select count(*) from public._mock_revision_pile_for(u.user_id, 120, 500) p where p.due)::int as due
    from active u
  ),
  topics as (
    select a.user_id, tk.key as topic,
           sum((tk.value ->> 'n')::int) as asked,
           sum((tk.value ->> 'r')::int) as got_right
    from public.seo_mock_attempts a, jsonb_each(a.topic_stats) tk
    where a.user_id in (select user_id from active)
      and a.topic_stats is not null
      and a.created_at > now() - interval '120 days'
    group by a.user_id, tk.key
    having sum((tk.value ->> 'n')::int) >= 3
  ),
  weakest as (
    select distinct on (user_id) user_id, topic,
           round(100.0 * got_right / nullif(asked, 0))::int as pct
    from topics
    order by user_id, (got_right::numeric / nullif(asked, 0)) asc, asked desc
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

revoke all on function public.mock_revision_nudge_candidates(int) from public, anon, authenticated;
grant execute on function public.mock_revision_nudge_candidates(int) to service_role;

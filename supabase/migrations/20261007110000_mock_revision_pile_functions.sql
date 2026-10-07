-- ELE-1815 review fixes (7 Oct 2026): the revision pile, worked out in the
-- database instead of the browser.
--
-- The client version fetched up to 150 full review snapshots (several MB for a
-- heavy user) on every Study Centre visit just to show a count, read the
-- OLDEST 150 attempts in the window rather than the newest, and stamped
-- "cleared" with the phone's clock. These run as the caller (RLS applies) and
-- use the server clock.
--
-- Pile rule: a question is on the pile when the latest thing that happened to
-- it was a WRONG answer (in an attempt's review with a non-null pick) and it
-- has not been cleared in a revision round since. Getting it right in a later
-- attempt (served, not in that attempt's review) takes it off. Skips count as
-- neither.

create or replace function public.mock_revision_pile(p_days int default 120, p_limit int default 200)
returns table (
  question_key text,
  item jsonb,
  attempt_id uuid,
  exam_slug text,
  exam_name text,
  missed_at timestamptz,
  misses int
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
    -- Named column: a bare `k` here resolved to in_review's k and the check
    -- never matched, so a later right answer never cleared a miss.
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
    -- Attempts it was missed in (a duplicate in one paper counts once).
    select k, count(distinct attempt_id)::int as misses from wrong group by k
  ),
  -- One row per question: a bank can hold the same question twice, and both
  -- copies missed in one paper would otherwise show twice on the pile.
  picked as (
    select distinct on (w.k) w.k, w.item, w.attempt_id, w.exam_slug, w.exam_name, w.created_at
    from latest l
    join wrong w on w.k = l.k and w.created_at = l.created_at
    where l.is_wrong
      and not exists (
        select 1 from public.mock_revision_cleared mc
        where mc.user_id = auth.uid() and mc.question_key = l.k and mc.cleared_at >= l.created_at
      )
    order by w.k
  )
  select p.k, p.item, p.attempt_id, p.exam_slug, p.exam_name, p.created_at, c.misses
  from picked p
  join counts c on c.k = p.k
  order by p.created_at desc
  limit least(greatest(p_limit, 1), 500);
$$;

create or replace function public.mock_revision_pile_count(p_days int default 120)
returns int
language sql
stable
security invoker
set search_path = public
as $$
  select count(*)::int from public.mock_revision_pile(p_days, 500);
$$;

-- Got it right in a revision round: off the pile, stamped with the server clock.
create or replace function public.mock_revision_clear(p_key text)
returns void
language sql
security invoker
set search_path = public
as $$
  insert into public.mock_revision_cleared (user_id, question_key, cleared_at)
  values (auth.uid(), p_key, now())
  on conflict (user_id, question_key) do update set cleared_at = excluded.cleared_at;
$$;

revoke all on function public.mock_revision_pile(int, int) from public, anon;
revoke all on function public.mock_revision_pile_count(int) from public, anon;
revoke all on function public.mock_revision_clear(text) from public, anon;
grant execute on function public.mock_revision_pile(int, int) to authenticated;
grant execute on function public.mock_revision_pile_count(int) to authenticated;
grant execute on function public.mock_revision_clear(text) to authenticated;

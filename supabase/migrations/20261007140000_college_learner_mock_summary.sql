-- ELE-1815 round 4 (7 Oct 2026): a learner's mock exams, for their tutor.
--
-- College staff read seo_mock_attempts through this function only (the table's
-- SELECT policy is own-rows): recent attempts with score and pass, accuracy by
-- topic, and how many wrong answers are still on the learner's revision pile.
-- Never the review snapshots themselves. Same gate as the shared site diary:
-- is_staff_for_learner_user (current staff at the learner's college).

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

  select coalesce(jsonb_agg(t order by t.pct asc, t.asked desc), '[]'::jsonb) into v_topics
  from (
    -- Accuracy out of ANSWERED questions (skips aren't knowledge); rows from
    -- before `a` existed fall back to asked.
    select tk.key as topic,
           sum((tk.value ->> 'n')::int) as asked,
           sum(coalesce((tk.value ->> 'a')::int, (tk.value ->> 'n')::int)) as answered,
           sum((tk.value ->> 'r')::int) as got_right,
           round(100.0 * sum((tk.value ->> 'r')::int)
             / nullif(sum(coalesce((tk.value ->> 'a')::int, (tk.value ->> 'n')::int)), 0))::int as pct
    from public.seo_mock_attempts a, jsonb_each(a.topic_stats) tk
    where a.user_id = p_learner
      and a.topic_stats is not null
      and a.created_at > now() - interval '120 days'
    group by tk.key
    having sum(coalesce((tk.value ->> 'a')::int, (tk.value ->> 'n')::int)) > 0
  ) t;

  -- Still on the learner's revision pile — the ONE pile rule (the learner's
  -- own count and this can't drift apart).
  select count(*)::int into v_pile
  from public._mock_revision_pile_for(p_learner, 120, 500);

  return jsonb_build_object('attempts', v_attempts, 'topics', v_topics, 'to_revise', v_pile);
end;
$$;

revoke all on function public.college_learner_mock_summary(uuid) from public, anon;
grant execute on function public.college_learner_mock_summary(uuid) to authenticated;

comment on function public.college_learner_mock_summary(uuid) is
  'College staff: a learner''s recent mock exams, accuracy by topic and wrong answers still to revise. Never returns the answers themselves.';

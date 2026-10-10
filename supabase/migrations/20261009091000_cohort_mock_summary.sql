-- ELE-1763: learners' own mock exam results, per cohort, for their tutors.
--
-- Student 360 already shows one learner's mocks (college_learner_mock_summary).
-- This adds the cohort view a curriculum lead plans from: per learner, mocks
-- sat in the last 90 days, average, pass rate, last attempt and direction of
-- travel; for the cohort, the topics it answers worst (last 120 days).
--
-- Only attempts made in the app (seo_mock_attempts with a user_id); the
-- anonymous public-page attempts have none. user_id is the AUTH uid, joined
-- through college_students.user_id (the id-space trap in the ticket).
-- Same gate as get_cohort_criteria_gaps: the cohort needs view_all/view_mine,
-- then each learner is checked with college_can; anyone refused is counted as
-- hidden and never read.

create or replace function public.get_cohort_mock_summary(p_cohort uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
declare
  v_uid uuid := auth.uid();
  v_cohorts uuid[];
  v_visible uuid[] := '{}';
  v_hidden int := 0;
  l record;
  v_learners jsonb;
  v_topics jsonb;
  v_totals jsonb;
begin
  if v_uid is null then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  if p_cohort is not null then
    if not exists (
      select 1 from public.college_cohorts c
       where c.id = p_cohort
         and (public.college_can('learners.view_all', c.college_id)
              or public.college_can('learners.view_mine', c.college_id))
    ) then
      raise exception 'not allowed' using errcode = '42501';
    end if;
    v_cohorts := array[p_cohort];
  else
    select coalesce(array_agg(c.id order by c.name), '{}'::uuid[]) into v_cohorts
      from public.college_cohorts c
      join public.college_staff st on st.id = c.tutor_id
     where st.user_id = v_uid
       and st.archived_at is null
       and lower(coalesce(c.status, 'active')) not in ('archived', 'completed', 'closed');
  end if;

  if coalesce(array_length(v_cohorts, 1), 0) > 50 then
    raise exception 'too many cohorts (50 at most)' using errcode = '22023';
  end if;

  for l in
    select cs.id roll_id, cs.college_id
      from public.college_students cs
     where cs.cohort_id = any (v_cohorts)
       and cs.user_id is not null
       and lower(coalesce(cs.status, 'active')) not in ('withdrawn', 'archived', 'completed')
     limit 500
  loop
    if public.college_can('learners.view_all', l.college_id, l.roll_id)
       or public.college_can('learners.view_mine', l.college_id, l.roll_id) then
      v_visible := v_visible || l.roll_id;
    else
      v_hidden := v_hidden + 1;
    end if;
  end loop;

  with roll as (
    select cs.id roll_id, cs.user_id, cs.name, cs.cohort_id
      from public.college_students cs
     where cs.id = any (v_visible)
  ),
  att as (
    select r.roll_id, a.percentage, a.passed, a.created_at,
           row_number() over (partition by r.roll_id order by a.created_at desc) rn
      from roll r
      join public.seo_mock_attempts a on a.user_id = r.user_id
  ),
  per as (
    select r.roll_id, r.user_id, r.name, r.cohort_id,
      count(a.*) filter (where a.created_at > now() - interval '90 days') n90,
      round(avg(a.percentage) filter (where a.created_at > now() - interval '90 days'))::int avg90,
      round(100.0 * count(a.*) filter (where a.passed and a.created_at > now() - interval '90 days')
            / nullif(count(a.*) filter (where a.created_at > now() - interval '90 days'), 0))::int pass90,
      max(a.created_at) last_at,
      count(a.*) n_all,
      round(avg(a.percentage) filter (where a.rn <= 3))::int recent_avg,
      round(avg(a.percentage) filter (where a.rn between 4 and 6))::int prior_avg
    from roll r
    left join att a on a.roll_id = r.roll_id
    group by r.roll_id, r.user_id, r.name, r.cohort_id
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'roll_id', roll_id, 'user_id', user_id, 'name', name, 'cohort_id', cohort_id,
           'attempts_90', n90, 'avg_90', avg90, 'pass_rate_90', pass90,
           'last_at', last_at, 'attempts_all', n_all,
           'recent_avg', recent_avg, 'prior_avg', prior_avg,
           'trend', case when prior_avg is null or recent_avg is null then null
                         when recent_avg - prior_avg >= 5 then 'up'
                         when prior_avg - recent_avg >= 5 then 'down'
                         else 'flat' end)
         order by last_at desc nulls last, name), '[]'::jsonb),
         jsonb_build_object(
           'learners', count(*),
           'active_90', count(*) filter (where n90 > 0),
           'attempts_90', coalesce(sum(n90), 0),
           'none_in_28_days', count(*) filter (where last_at is null or last_at < now() - interval '28 days'),
           'falling', count(*) filter (where prior_avg is not null and recent_avg is not null and prior_avg - recent_avg >= 5))
    into v_learners, v_totals
    from per;

  select coalesce(jsonb_agg(t order by t.pct asc, t.answered desc), '[]'::jsonb) into v_topics
  from (
    select tk.key as topic,
           count(distinct a.user_id) as learners,
           sum(case when jsonb_typeof(tk.value -> 'a') = 'number' then (tk.value ->> 'a')::int else (tk.value ->> 'n')::int end) as answered,
           sum((tk.value ->> 'r')::int) as got_right,
           round(100.0 * sum((tk.value ->> 'r')::int)
             / nullif(sum(case when jsonb_typeof(tk.value -> 'a') = 'number' then (tk.value ->> 'a')::int else (tk.value ->> 'n')::int end), 0))::int as pct
      from public.college_students cs
      join public.seo_mock_attempts a on a.user_id = cs.user_id
      cross join lateral jsonb_each(a.topic_stats) tk
     where cs.id = any (v_visible)
       and jsonb_typeof(a.topic_stats) = 'object'
       and a.created_at > now() - interval '120 days'
       and jsonb_typeof(tk.value -> 'n') = 'number'
       and jsonb_typeof(tk.value -> 'r') = 'number'
     group by tk.key
    having sum(case when jsonb_typeof(tk.value -> 'a') = 'number' then (tk.value ->> 'a')::int else (tk.value ->> 'n')::int end) >= 5
  ) t;

  return jsonb_build_object(
    'cohorts', to_jsonb(v_cohorts),
    'hidden', v_hidden,
    'totals', v_totals,
    'learners', v_learners,
    'topics', v_topics);
end;
$function$;

revoke all on function public.get_cohort_mock_summary(uuid) from public, anon;
grant execute on function public.get_cohort_mock_summary(uuid) to authenticated;

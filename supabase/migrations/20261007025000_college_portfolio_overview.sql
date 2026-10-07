-- College Hub "Portfolios" home (7 Oct 2026).
--
-- The old hub read college_student_assignments filtered to the caller as
-- tutor/assessor/IQA, so a tutor whose learners come from their COHORT (no
-- assignment row) saw "Total students 0". This returns the whole college in
-- one round trip; the client applies "My learners / Everyone" (useMyScope).
--
--   learners[]  one row per college_students row: cohort, qualification,
--               criteria state counts (from get_portfolio_ac_state, so the
--               six-state rules live in ONE place), last evidence date,
--               submissions waiting and the oldest one.
--   waiting[]   every open submission (submitted / resubmitted / under
--               review), oldest first. Item-level submissions have
--               category_id null, so the category is optional.
--
-- Criteria counts are only filled for learners who have joined (user_id) and
-- whom the caller may assess (_can_assess); support staff get null counts.
-- get_portfolio_ac_state runs server side per joined learner: no client
-- round trips, and it stays the single source of truth for the states.

create or replace function public.college_portfolio_overview(p_college_id uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_college uuid := p_college_id;
  v_learners jsonb := '[]'::jsonb;
  v_waiting jsonb;
  s record;
  v_counts jsonb;
  v_qual text;
  v_qual_id uuid;
  v_qual_title text;
begin
  if auth.uid() is null then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  if v_college is null then
    select st.college_id into v_college
      from college_staff st
     where st.user_id = auth.uid() and st.archived_at is null
     order by st.created_at nulls last
     limit 1;
  end if;

  if not public._review_staff_can(v_college) then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  for s in
    select cs.id, cs.user_id, cs.name, cs.cohort_id, cs.status, c.name as cohort_name
      from college_students cs
      left join college_cohorts c on c.id = cs.cohort_id
     where cs.college_id = v_college
     order by cs.name
  loop
    v_counts := null;
    v_qual := null;
    v_qual_id := null;
    v_qual_title := null;
    if s.user_id is not null then
      select rq.requirement_code, rq.qualification_id, rq.title
        into v_qual, v_qual_id, v_qual_title
        from public._resolve_qualification(s.user_id, s.id) rq;
    end if;
    if s.user_id is not null and public._can_assess(s.user_id) then
      select jsonb_build_object(
               'total', count(*),
               'not_started', count(*) filter (where st.state = 'not_started'),
               'suggested', count(*) filter (where st.state = 'suggested'),
               'claimed', count(*) filter (where st.state = 'claimed'),
               'submitted', count(*) filter (where st.state = 'submitted'),
               'referred', count(*) filter (where st.state in ('referred', 'not_yet')),
               'passed', count(*) filter (where st.state = 'passed'),
               'iqa_confirmed', count(*) filter (where st.state = 'iqa_confirmed'),
               'iqa_rejected', count(*) filter (where st.state = 'iqa_rejected'))
        into v_counts
        from public.get_portfolio_ac_state(s.user_id) st;
    end if;

    v_learners := v_learners || jsonb_build_object(
      'student_id', s.id,
      'user_id', s.user_id,
      'name', s.name,
      'cohort_id', s.cohort_id,
      'cohort_name', s.cohort_name,
      'status', s.status,
      'qualification_code', v_qual,
      'qualification_id', v_qual_id,
      'qualification_title', v_qual_title,
      'criteria', v_counts,
      'items', case when s.user_id is null then 0
                    else (select count(*) from portfolio_items pi where pi.user_id = s.user_id) end,
      'last_evidence_at', case when s.user_id is null then null
                    else (select max(greatest(pi.created_at, pi.updated_at)) from portfolio_items pi where pi.user_id = s.user_id) end,
      'witness_signed', case when s.user_id is null then 0
                    else (select count(*) from portfolio_witness_statements w where w.learner_id = s.user_id and w.status = 'signed') end,
      'waiting', case when s.user_id is null then 0
                    else (select count(*) from portfolio_submissions ps
                           where ps.user_id = s.user_id
                             and coalesce(ps.status, 'submitted') in ('submitted', 'resubmitted', 'under_review')) end,
      'oldest_waiting_at', case when s.user_id is null then null
                    else (select min(coalesce(ps.submitted_at, ps.created_at)) from portfolio_submissions ps
                           where ps.user_id = s.user_id
                             and coalesce(ps.status, 'submitted') in ('submitted', 'resubmitted', 'under_review')) end
    );
  end loop;

  select coalesce(jsonb_agg(w order by w->>'submitted_at'), '[]'::jsonb) into v_waiting
    from (
      select jsonb_build_object(
               'submission_id', ps.id,
               'student_id', cs.id,
               'user_id', cs.user_id,
               'name', cs.name,
               'cohort_id', cs.cohort_id,
               'cohort_name', c.name,
               'status', coalesce(ps.status, 'submitted'),
               'submitted_at', coalesce(ps.submitted_at, ps.created_at),
               'submission_count', coalesce(ps.submission_count, 1),
               'category_name', qc.name,
               'notes', left(ps.submission_notes, 200),
               'item_count', (select count(*) from portfolio_submission_items si where si.submission_id = ps.id),
               'first_title', (select pi.title from portfolio_submission_items si
                                 join portfolio_items pi on pi.id = si.portfolio_item_id
                                where si.submission_id = ps.id
                                order by si.added_at nulls last limit 1)
             ) as w
        from portfolio_submissions ps
        join college_students cs on cs.user_id = ps.user_id and cs.college_id = v_college
        left join college_cohorts c on c.id = cs.cohort_id
        left join qualification_categories qc on qc.id = ps.category_id
       where coalesce(ps.status, 'submitted') in ('submitted', 'resubmitted', 'under_review')
    ) x;

  return jsonb_build_object('college_id', v_college, 'learners', v_learners, 'waiting', v_waiting);
end;
$$;

revoke all on function public.college_portfolio_overview(uuid) from public, anon;
grant execute on function public.college_portfolio_overview(uuid) to authenticated;

comment on function public.college_portfolio_overview(uuid) is
  'College Hub Portfolios home: per-learner criteria states (via get_portfolio_ac_state) and every open submission, oldest first. Staff of the college only.';

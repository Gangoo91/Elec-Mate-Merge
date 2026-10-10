-- ELE-2057 Reporting feed for college data teams. ADDITIVE ONLY.
--
-- Five stable, read-only reporting datasets on the EXISTING read API
-- (college-data-api, keys in college_api_keys, ELE-1884), one row per
-- learner, built for Power BI and other BI tools:
--   learner_progress    criterion state counts (from get_portfolio_ac_state, the one read model)
--   learner_hours       off-the-job hours: planned, verified (college / employer), pending,
--                       rejected, app learning kept separate, straight-line expected to date
--   learner_reviews     progress reviews: completed, last, next, due by, overdue, unsigned
--   learner_risk        current risk level, score and top factors
--   learner_attendance  register marks and attendance % ((present + late) / marks, the
--                       hub's own rule), overall and the last 30 days
-- Learners stay the `learners` dataset. Each reporting dataset rides on an
-- existing key scope (learner_progress: decisions; learner_hours: hours;
-- learner_reviews: reviews; learner_risk: learners; learner_attendance:
-- attendance), so live keys keep working and the scope list is unchanged.
-- They are snapshots as at now: `since` is not applied, `as_at` says when.
--
-- Also (ELE-2053): the ILR dataset defaults ProgType to 34 and LearnAimRef to
-- the unit's aim reference for a learner on an Apprenticeship Unit course
-- whose own ILR fields are blank, and learner_reviews says reviews_apply =
-- false for them.
--
-- _college_interchange is replaced once: the live definition, with the ILR
-- defaults and the five branches added. Nothing else changes.

-- Criterion state counts for one learner, from get_portfolio_ac_state. That
-- function answers only to the learner or staff who may read them; this
-- helper is reachable only from the definer (the read API and college_export
-- have already checked the caller), so it reads as the learner for the one
-- call and puts the caller's claims straight back.
create or replace function public._college_ac_state_counts(p_user uuid)
returns table (qualification_code text, total int, not_started int, suggested int, claimed int,
               submitted int, referred int, not_yet int, passed int, iqa_confirmed int, iqa_rejected int)
language plpgsql volatile security definer set search_path to 'public'
as $$
declare v_prev text := current_setting('request.jwt.claims', true);
begin
  if p_user is null then return; end if;
  perform set_config('request.jwt.claims', json_build_object('sub', p_user, 'role', 'authenticated')::text, true);
  begin
    return query
      select max(t.qualification_code),
             count(*)::int,
             count(*) filter (where t.state = 'not_started')::int,
             count(*) filter (where t.state = 'suggested')::int,
             count(*) filter (where t.state = 'claimed')::int,
             count(*) filter (where t.state = 'submitted')::int,
             count(*) filter (where t.state = 'referred')::int,
             count(*) filter (where t.state = 'not_yet')::int,
             count(*) filter (where t.state = 'passed')::int,
             count(*) filter (where t.state = 'iqa_confirmed')::int,
             count(*) filter (where t.state = 'iqa_rejected')::int
        from public.get_portfolio_ac_state(p_user) t
      having count(*) > 0;
  exception when others then
    null;
  end;
  perform set_config('request.jwt.claims', coalesce(v_prev, ''), true);
end;
$$;
revoke all on function public._college_ac_state_counts(uuid) from public, anon, authenticated;

CREATE OR REPLACE FUNCTION public._college_interchange(p_college uuid, p_dataset text, p_since timestamp with time zone DEFAULT NULL::timestamp with time zone, p_limit integer DEFAULT 1000, p_offset integer DEFAULT 0)
 RETURNS json
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_limit int := least(greatest(coalesce(p_limit, 1000), 1), 50000);
  v_offset int := greatest(coalesce(p_offset, 0), 0);
  v_out json;
begin
  if p_college is null then raise exception 'college required' using errcode = '22023'; end if;

  if p_dataset = 'learners' then
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select cs.created_at as r_sort, cs.id as r_id, json_build_object(
        'learner_id', cs.id,
        'learner_reference', ilr.learn_ref_number,
        'uln', cs.uln,
        'name', cs.name,
        'email', cs.email,
        'date_of_birth', cs.date_of_birth,
        'status', cs.status,
        'cohort_code', co.code,
        'cohort_name', co.name,
        'course_code', cc.code,
        'course_name', cc.name,
        'qualification_code', q.code,
        'start_date', cs.start_date,
        'planned_end_date', cs.expected_end_date,
        'actual_end_date', cs.learning_actual_end_date,
        'employer_name', ce.company_name,
        'otj_required_hours', cs.otj_required_hours,
        'otj_verified_hours', round(coalesce(otj.minutes, 0) / 60.0, 1),
        -- Learning measured in the app, kept SEPARATE from verified hours: whether
        -- it counts as eligible off-the-job time is a college decision (ELE-2037).
        'otj_app_learning_hours', case when cs.user_id is not null
                                   then (public._otj_summary_core(cs.user_id)->>'app_learning_hours')::numeric end,
        'risk_level', cs.risk_level,
        'updated_at', cs.updated_at) as r
      from college_students cs
      left join college_student_ilr ilr on ilr.student_id = cs.id
      left join college_cohorts co on co.id = cs.cohort_id
      left join college_courses cc on cc.id = coalesce(cs.course_id, co.course_id)
      left join qualifications q on q.id = cc.qualification_id
      left join college_employers ce on ce.id = cs.employer_id
      left join lateral (
        select sum(o.duration_minutes) as minutes from college_otj_entries o
         where cs.user_id is not null and o.student_id = cs.user_id
           and o.verification_status in ('verified', 'verified_by_employer')) otj on true
      where cs.college_id = p_college
        and (p_since is null or cs.updated_at >= p_since)
      order by cs.created_at, cs.id
      limit v_limit offset v_offset) x;

  elsif p_dataset = 'hours' then
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select o.activity_date as r_sort, o.id as r_id, json_build_object(
        'entry_id', o.id,
        'learner_id', cs.id,
        'uln', cs.uln,
        'activity_date', o.activity_date,
        'minutes', o.duration_minutes,
        'hours', round(o.duration_minutes / 60.0, 2),
        'activity_type', o.activity_type,
        'title', o.title,
        'source', o.source_kind,
        'verification_status', o.verification_status,
        'verified_at', o.verified_at,
        'attested_by_name', o.attested_by_name,
        'in_working_hours', o.in_working_hours,
        'iqa_verdict', o.iqa_verdict,
        'created_at', o.created_at,
        'updated_at', o.updated_at) as r
      from college_otj_entries o
      join college_students cs on cs.user_id = o.student_id and cs.college_id = p_college
      where (p_since is null or o.updated_at >= p_since)
      order by o.activity_date, o.id
      limit v_limit offset v_offset) x;

  elsif p_dataset = 'decisions' then
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select d.decided_at as r_sort, d.id as r_id, json_build_object(
        'decision_id', d.id,
        'learner_id', cs.id,
        'uln', cs.uln,
        'qualification_code', d.qualification_code,
        'unit_code', d.unit_code,
        'ac_code', d.ac_code,
        'decision', d.decision,
        'method', d.method,
        'assessor_name', d.assessor_name,
        'decided_at', d.decided_at,
        'evidence_count', coalesce(cardinality(d.evidence_item_ids), 0),
        'iqa_verdict', d.iqa_verdict,
        'iqa_at', d.iqa_at,
        'superseded_at', d.superseded_at,
        'content_hash', d.content_hash) as r
      from portfolio_assessment_decisions d
      join college_students cs on cs.user_id = d.learner_id and cs.college_id = p_college
      where (p_since is null or greatest(d.created_at, coalesce(d.iqa_at, d.created_at),
                                         coalesce(d.superseded_at, d.created_at)) >= p_since)
      order by d.decided_at, d.id
      limit v_limit offset v_offset) x;

  elsif p_dataset = 'attendance' then
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select a.date as r_sort, a.id as r_id, json_build_object(
        'attendance_id', a.id,
        'learner_id', cs.id,
        'uln', cs.uln,
        'date', a.date,
        'session', a.session,
        'status', a.status,
        'cohort_code', co.code,
        'recorded_at', a.created_at) as r
      from college_attendance a
      join college_students cs on cs.id = a.student_id and cs.college_id = p_college
      left join college_cohorts co on co.id = a.cohort_id
      where (p_since is null or a.created_at >= p_since)
      order by a.date, a.id
      limit v_limit offset v_offset) x;

  elsif p_dataset = 'reviews' then
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select coalesce(t.held_on::timestamptz, t.scheduled_at, t.created_at) as r_sort, t.id as r_id, json_build_object(
        'review_id', t.id,
        'learner_id', cs.id,
        'uln', cs.uln,
        'status', t.status,
        'scheduled_at', t.scheduled_at,
        'held_on', t.held_on,
        'completed_at', t.completed_at,
        'mode', t.mode,
        'employer_attendance', t.employer_attendance,
        'employer_contact_name', t.employer_contact_name,
        'signed_and_locked_at', t.locked_at,
        'content_hash', t.content_hash,
        'updated_at', t.updated_at) as r
      from college_tripartite_reviews t
      join college_students cs on cs.id = t.student_id
      where t.college_id = p_college
        and (p_since is null or t.updated_at >= p_since)
      order by coalesce(t.held_on::timestamptz, t.scheduled_at, t.created_at), t.id
      limit v_limit offset v_offset) x;

  elsif p_dataset = 'ilr' then
    -- Column names are the ILR 2026/27 XML element names, so an MIS team can
    -- map them one to one. HRS1/HRS3 replace PHours/OTJActHours from 2026/27.
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select cs.created_at as r_sort, cs.id as r_id, json_build_object(
        'UKPRN', c.ukprn,
        'LearnRefNumber', ilr.learn_ref_number,
        'ULN', cs.uln,
        -- Split from the display name only when the ILR names are not set;
        -- a trailing "(...)" note is not part of a legal name.
        'FamilyName', coalesce(ilr.family_name,
                        nullif(regexp_replace(nm.clean, '^.*\s', ''), '')),
        'GivenNames', coalesce(ilr.given_names,
                        nullif(trim(regexp_replace(nm.clean, '\s*\S+$', '')), '')),
        'DateOfBirth', cs.date_of_birth,
        'Sex', ilr.sex,
        'Ethnicity', ilr.ethnicity,
        'LLDDHealthProb', ilr.lldd_health_prob,
        'NINumber', upper(replace(cs.ni_number, ' ', '')),
        'PriorLevel', ilr.prior_level,
        'PostcodePrior', upper(ilr.postcode_prior),
        'Postcode', upper(ilr.postcode),
        -- ELE-2053: an Apprenticeship Unit defaults to its unit aim reference.
        'LearnAimRef', coalesce(ilr.learn_aim_ref, ucc.unit_aim_ref),
        'AimType', ilr.aim_type,
        -- ELE-2053: ILR 2026/27 programme type 34, Apprenticeship Units.
        'ProgType', coalesce(ilr.prog_type, case when ucc.id is not null then 34 end),
        'StdCode', ilr.std_code,
        'FundModel', ilr.fund_model,
        'LearnStartDate', cs.start_date,
        'OrigLearnStartDate', ilr.orig_learn_start_date,
        'LearnPlanEndDate', cs.expected_end_date,
        'LearnActEndDate', cs.learning_actual_end_date,
        'CompStatus', ilr.comp_status,
        'Outcome', ilr.outcome,
        'WithdrawReason', ilr.withdraw_reason,
        'AchDate', ilr.ach_date,
        'DelLocPostCode', upper(ilr.del_loc_postcode),
        'EPAOrgID', ilr.epa_org_id,
        'EmpStat', ilr.emp_stat,
        'EmpId', ilr.emp_id,
        'AgreemId', ilr.agreem_id,
        'HRS1_PlannedOTJHours', round(cs.otj_required_hours)::int,
        'HRS3_ActualOTJHours', round(coalesce(otj.minutes, 0) / 60.0)::int,
        'HRS4_PlannedReductionHours', ilr.hrs_planned_reduction,
        'TNP1', ilr.tnp1_price,
        'TNP2', ilr.tnp2_price,
        -- Not ILR fields: the evidence behind HRS3. HRS3 is verified and
        -- employer-attested entries only; app learning is never folded in.
        'elecmate_verified_otj_hours', round(coalesce(otj.minutes, 0) / 60.0, 1),
        'elecmate_app_learning_hours', case when cs.user_id is not null
                                        then (public._otj_summary_core(cs.user_id)->>'app_learning_hours')::numeric end,
        'elecmate_learner_id', cs.id) as r
      from college_students cs
      join colleges c on c.id = cs.college_id
      left join college_student_ilr ilr on ilr.student_id = cs.id
      left join college_cohorts uco on uco.id = cs.cohort_id
      left join college_courses ucc on ucc.id = coalesce(cs.course_id, uco.course_id)
                                   and ucc.course_type = 'apprenticeship_unit'
      cross join lateral (select trim(regexp_replace(coalesce(cs.name, ''), '\s*\([^)]*\)\s*$', '')) as clean) nm
      left join lateral (
        select sum(o.duration_minutes) as minutes from college_otj_entries o
         where cs.user_id is not null and o.student_id = cs.user_id
           and o.verification_status in ('verified', 'verified_by_employer')) otj on true
      where cs.college_id = p_college
        and (p_since is null or greatest(cs.updated_at, coalesce(ilr.updated_at, cs.updated_at)) >= p_since)
      order by cs.created_at, cs.id
      limit v_limit offset v_offset) x;

  -- ── ELE-2057 reporting datasets: one row per learner, a snapshot as at
  -- now (p_since is not applied). Stable column order, for Power BI. ──────
  elsif p_dataset = 'learner_progress' then
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select cs.created_at as r_sort, cs.id as r_id, json_build_object(
        'learner_id', cs.id,
        'uln', cs.uln,
        'qualification_code', st.qualification_code,
        'criteria_total', coalesce(st.total, 0),
        'criteria_not_started', coalesce(st.not_started, 0),
        'criteria_suggested', coalesce(st.suggested, 0),
        'criteria_claimed', coalesce(st.claimed, 0),
        'criteria_submitted', coalesce(st.submitted, 0),
        'criteria_referred', coalesce(st.referred, 0),
        'criteria_not_yet', coalesce(st.not_yet, 0),
        'criteria_passed', coalesce(st.passed, 0),
        'criteria_iqa_confirmed', coalesce(st.iqa_confirmed, 0),
        'criteria_iqa_rejected', coalesce(st.iqa_rejected, 0),
        'criteria_achieved', coalesce(st.passed, 0) + coalesce(st.iqa_confirmed, 0),
        'achieved_percent', case when coalesce(st.total, 0) = 0 then null
                                 else round(100.0 * (st.passed + st.iqa_confirmed) / st.total, 1) end,
        'as_at', now()) as r
      from (select * from college_students s where s.college_id = p_college
             order by s.created_at, s.id limit v_limit offset v_offset) cs
      left join lateral public._college_ac_state_counts(cs.user_id) st on true) x;

  elsif p_dataset = 'learner_risk' then
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select cs.created_at as r_sort, cs.id as r_id, json_build_object(
        'learner_id', cs.id,
        'uln', cs.uln,
        'risk_level', coalesce(lower(rs.level), lower(cs.risk_level)),
        'risk_score', rs.score,
        'risk_factors', (select string_agg(f, '; ') from (
                           select coalesce(e->>'label', e->>'factor', e #>> '{}') f
                             from jsonb_array_elements(case when jsonb_typeof(rs.factors) = 'array'
                                                            then rs.factors else '[]'::jsonb end) e
                            limit 5) z),
        'risk_computed_at', rs.computed_at,
        'as_at', now()) as r
      from college_students cs
      left join lateral (
        select r2.level, r2.score, r2.factors, r2.computed_at from student_risk_scores r2
         where r2.student_id = cs.id and r2.is_current order by r2.computed_at desc limit 1) rs on true
      where cs.college_id = p_college
      order by cs.created_at, cs.id
      limit v_limit offset v_offset) x;

  elsif p_dataset = 'learner_hours' then
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select cs.created_at as r_sort, cs.id as r_id, json_build_object(
        'learner_id', cs.id,
        'uln', cs.uln,
        'planned_otj_hours', cs.otj_required_hours,
        'verified_hours', round((coalesce(h.college_min, 0) + coalesce(h.employer_min, 0)) / 60.0, 1),
        'college_verified_hours', round(coalesce(h.college_min, 0) / 60.0, 1),
        'employer_verified_hours', round(coalesce(h.employer_min, 0) / 60.0, 1),
        'pending_hours', round(coalesce(h.pending_min, 0) / 60.0, 1),
        'rejected_hours', round(coalesce(h.rejected_min, 0) / 60.0, 1),
        'app_learning_hours', case when cs.user_id is not null
                                then (public._otj_summary_core(cs.user_id)->>'app_learning_hours')::numeric end,
        'verified_percent_of_planned', case when coalesce(cs.otj_required_hours, 0) = 0 then null
          else round(100.0 * (coalesce(h.college_min, 0) + coalesce(h.employer_min, 0)) / 60.0 / cs.otj_required_hours, 1) end,
        'start_date', cs.start_date,
        'planned_end_date', cs.expected_end_date,
        'expected_hours_to_date', ex.hours,
        'hours_ahead_or_behind', case when ex.hours is null then null
          else round((coalesce(h.college_min, 0) + coalesce(h.employer_min, 0)) / 60.0 - ex.hours, 1) end,
        'as_at', now()) as r
      from college_students cs
      left join lateral (
        select sum(o.duration_minutes) filter (where o.verification_status = 'verified') as college_min,
               sum(o.duration_minutes) filter (where o.verification_status = 'verified_by_employer') as employer_min,
               sum(o.duration_minutes) filter (where o.verification_status = 'pending') as pending_min,
               sum(o.duration_minutes) filter (where o.verification_status = 'rejected') as rejected_min
          from college_otj_entries o
         where cs.user_id is not null and o.student_id = cs.user_id) h on true
      cross join lateral (
        select case when cs.otj_required_hours is null or cs.start_date is null or cs.expected_end_date is null
                         or cs.expected_end_date <= cs.start_date then null
                    else round(cs.otj_required_hours * least(1.0, greatest(0.0,
                           (public._lon(now()) - cs.start_date)::numeric / (cs.expected_end_date - cs.start_date))), 1)
               end as hours) ex
      where cs.college_id = p_college
      order by cs.created_at, cs.id
      limit v_limit offset v_offset) x;

  elsif p_dataset = 'learner_attendance' then
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select cs.created_at as r_sort, cs.id as r_id, json_build_object(
        'learner_id', cs.id,
        'uln', cs.uln,
        'sessions_marked', coalesce(a.n, 0),
        'present', coalesce(a.present, 0),
        'late', coalesce(a.late, 0),
        'absent', coalesce(a.absent, 0),
        'authorised', coalesce(a.authorised, 0),
        'attendance_percent', case when coalesce(a.n, 0) = 0 then null
                                   else round(100.0 * (a.present + a.late) / a.n, 1) end,
        'attendance_percent_last_30_days', case when coalesce(a.n30, 0) = 0 then null
                                                else round(100.0 * a.att30 / a.n30, 1) end,
        'last_marked_on', a.last_on,
        'as_at', now()) as r
      from college_students cs
      left join lateral (
        select count(*) as n,
               count(*) filter (where lower(m.status) = 'present') as present,
               count(*) filter (where lower(m.status) = 'late') as late,
               count(*) filter (where lower(m.status) = 'absent') as absent,
               count(*) filter (where lower(m.status) = 'authorised') as authorised,
               count(*) filter (where m.date >= public._lon(now()) - 30) as n30,
               count(*) filter (where m.date >= public._lon(now()) - 30 and lower(m.status) in ('present', 'late')) as att30,
               max(m.date) as last_on
          from college_attendance m where m.student_id = cs.id) a on true
      where cs.college_id = p_college
      order by cs.created_at, cs.id
      limit v_limit offset v_offset) x;

  elsif p_dataset = 'learner_reviews' then
    select coalesce(json_agg(r order by r_sort, r_id), '[]'::json) into v_out from (
      select cs.created_at as r_sort, cs.id as r_id, json_build_object(
        'learner_id', cs.id,
        'uln', cs.uln,
        'reviews_apply', not u.is_unit,
        'review_frequency_months', cs.review_frequency_months,
        'reviews_completed', coalesce(rv.done, 0),
        'last_review_on', rv.last_on,
        'next_review_scheduled_at', rv.next_at,
        'review_due_by', d.due_by,
        'review_overdue', d.due_by is not null and d.due_by < public._lon(now())
                          and (rv.next_at is null or public._lon(rv.next_at) > d.due_by),
        'awaiting_signatures', coalesce(rv.unsigned, 0),
        'as_at', now()) as r
      from college_students cs
      cross join lateral (select public._college_student_is_unit(cs.id) as is_unit) u
      left join lateral (
        select count(*) filter (where t.locked_at is not null) as done,
               max(coalesce(t.held_on, public._lon(t.scheduled_at))) filter (where t.locked_at is not null) as last_on,
               min(t.scheduled_at) filter (where t.locked_at is null and t.status <> 'cancelled'
                                             and t.scheduled_at >= now() - interval '1 day') as next_at,
               count(*) filter (where t.locked_at is not null and not (t.signatures ? 'student_signed_at')) as unsigned
          from college_tripartite_reviews t
         where t.student_id = cs.id and t.college_id = p_college) rv on true
      cross join lateral (
        select case when u.is_unit or lower(coalesce(cs.status, '')) in ('withdrawn', 'completed', 'archived')
                    then null else public.tripartite_due_by(cs.id) end as due_by) d
      where cs.college_id = p_college
      order by cs.created_at, cs.id
      limit v_limit offset v_offset) x;

  else
    raise exception 'unknown dataset %', p_dataset using errcode = '22023';
  end if;

  return v_out;
end;
$function$;
revoke all on function public._college_interchange(uuid, text, timestamptz, integer, integer) from public, anon, authenticated;
grant execute on function public._college_interchange(uuid, text, timestamptz, integer, integer) to service_role;

-- ELE-2038 (+ ELE-2039, 2041, 2042, 2044) — the learner evidence pack cites
-- the funding rules of the learner's start year (college_funding_rule_refs,
-- every paragraph verified against the official PDF), and gains:
--   training plan from the builder (in force / waiting / re-sign after change);
--   prior learning: skills scan, 187-hour floor, price reduction;
--   EPAO chosen on time (para 143 / 382);
--   plan delivered, agreed by all three (para 101, 2026/27 starts);
--   hours statement on VERIFIED actual vs PLANNED, 80% warning, 12-week due date.
-- Identical to the live function apart from those blocks and the per-item
-- paragraph lookup at the end. Comments inside still name the 2025/26 numbers
-- they were written against; the output uses the map.

CREATE OR REPLACE FUNCTION public._learner_evidence_pack(p_student uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  s college_students;
  v_today date := public._lon(now());
  v_items jsonb := '[]'::jsonb;
  v_otj jsonb;
  v_ev jsonb;
  v_ev2 jsonb;
  v_months jsonb;
  v_due date;
  v_last record;
  v_n int;
  v_att int;
  v_age int;
  v_gap_run int := 0;
  v_max_run int := 0;
  v_gap_months text[] := '{}';
  v_window int;
  v_status text;
  v_detail text;
  v_end_phase boolean;
  v_gateway_phase boolean;
  v_support boolean;
  v_plan record;
  m jsonb;
  i int;
  v_n_months int;
  -- ELE-2038/2039/2041/2042/2044
  v_year text;
  v_tp college_training_plans;
  v_tp_wait college_training_plans;
  v_left text;
  v_hb jsonb;
  v_epao jsonb;
  v_sp college_learner_starting_points;
  v_ref jsonb;
  v_rkey text;
  v_out jsonb := '[]'::jsonb;
  v_it jsonb;
begin
  select * into s from college_students where id = p_student;
  if s.id is null then raise exception 'not found' using errcode = 'P0002'; end if;
  v_end_phase := lower(coalesce(s.status, '')) in ('completed', 'withdrawn')
                 or (s.expected_end_date is not null and s.expected_end_date < v_today)
                 or s.learning_actual_end_date is not null;
  v_gateway_phase := v_end_phase or (s.expected_end_date is not null and s.expected_end_date <= v_today + 90);
  v_year := public._funding_year_for(s.start_date);

  -- helper: current (not superseded) evidence of a kind, as jsonb
  -- (inline subqueries below; plpgsql has no local functions)

  -- 1 Identity and residency (Annex A; box after 29.8)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'id_residency' and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'id_residency', 'group', 'start', 'title', 'Identity and residency',
    'para', 'Annex A; 29.8', 'kind', 'id_residency',
    'status', case when v_ev is null then 'missing' else 'ok' end,
    'detail', case when v_ev is null then 'Record the documents you saw that prove identity and the right to live and work in England.'
                   else coalesce(v_ev->>'evidence_type_seen', 'Seen') || ' · filed ' || to_char((v_ev->>'created_at')::timestamptz, 'DD Mon YYYY') end,
    'evidence', public._ev_list(v_ev));

  -- 2 ULN, NI number, date of birth (309, 315)
  v_detail := concat_ws(', ',
    case when s.uln is null or s.uln = '' then 'ULN' end,
    case when s.ni_number is null or s.ni_number = '' then 'National Insurance number' end,
    case when s.date_of_birth is null then 'date of birth' end);
  v_items := v_items || jsonb_build_object('key', 'identifiers', 'group', 'start', 'title', 'ULN, NI number and date of birth',
    'para', '309; 315', 'field', true,
    'status', case when v_detail = '' then 'ok' else 'missing' end,
    'detail', case when v_detail = '' then 'ULN ' || s.uln || ' · NI on record · born ' || to_char(s.date_of_birth, 'DD Mon YYYY')
                   else 'Missing: ' || v_detail || '.' end);

  -- 2b Eligibility self-declaration (29.4–29.7; 310.2; 317)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'eligibility_declaration' and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'eligibility', 'group', 'start', 'title', 'Eligibility declaration',
    'para', '29.4–29.7; 310.2; 317', 'kind', 'eligibility_declaration',
    'status', case when v_ev is null then 'missing' else 'ok' end,
    'detail', case when v_ev is null then 'The apprentice confirms they are not on another funded programme and that the details they gave are correct, naming what they confirm.'
                   else 'Signed ' || coalesce(to_char((v_ev->>'document_date')::date, 'DD Mon YYYY'), 'and filed') || '.' end,
    'evidence', public._ev_list(v_ev));

  -- 3 Employment for the whole programme (65; 120)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind in ('employment_contract', 'employer_declaration') and e.superseded_at is null
   order by e.created_at desc limit 1;
  v_status := case when v_ev is null then 'missing'
                   when (v_ev->>'valid_to') is not null and s.expected_end_date is not null
                        and (v_ev->>'valid_to')::date < s.expected_end_date + 90 then 'attention'
                   else 'ok' end;
  v_items := v_items || jsonb_build_object('key', 'employment', 'group', 'start', 'title', 'Employed for the whole apprenticeship',
    'para', '65; 120', 'kind', 'employment_contract',
    'status', v_status,
    'detail', case v_status
      when 'missing' then 'An extract of the contract of employment, or a signed employer declaration, covering the programme and the end-point assessment.'
      when 'attention' then 'The contract ends ' || to_char((v_ev->>'valid_to')::date, 'DD Mon YYYY') || ', before the end-point assessment is likely to finish.'
      else 'On file' || coalesce(' · runs to ' || to_char((v_ev->>'valid_to')::date, 'DD Mon YYYY'), ' · no end date') end,
    'evidence', public._ev_list(v_ev));

  -- 4 Apprenticeship agreement (66–68)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'apprenticeship_agreement' and e.superseded_at is null order by e.created_at desc limit 1;
  v_status := case when v_ev is null then 'missing'
                   when jsonb_array_length(coalesce(v_ev->'signatures', '[]'::jsonb)) < 2 then 'attention'
                   else 'ok' end;
  v_items := v_items || jsonb_build_object('key', 'agreement', 'group', 'start', 'title', 'Apprenticeship agreement',
    'para', '66–68', 'kind', 'apprenticeship_agreement', 'status', v_status,
    'detail', case v_status when 'missing' then 'A signed copy of the complete agreement between the employer and apprentice, with any revisions.'
                            when 'attention' then 'Filed, but not signed by both the employer and the apprentice.'
                            else 'Signed and filed · version ' || (v_ev->>'version') end,
    'evidence', public._ev_list(v_ev));

  -- 5 Training plan signed by all parties, re-signed after a change (95–96; 98.4.1)
  -- ELE-2039: a plan made in the builder is the record; an uploaded plan otherwise.
  select * into v_tp from college_training_plans p where p.student_id = s.id and p.status = 'in_force' order by p.version desc limit 1;
  select * into v_tp_wait from college_training_plans p where p.student_id = s.id and p.status = 'awaiting_signatures' order by p.version desc limit 1;
  if v_tp.id is not null or v_tp_wait.id is not null then
    select r.held_on, r.outcomes->>'plan_change' as change into v_plan
      from college_tripartite_reviews r
     where r.student_id = s.id and r.locked_at is not null
       and r.outcomes->>'plan_change' in ('content', 'end_date', 'otj_release')
     order by r.held_on desc limit 1;
    if v_tp_wait.id is not null then
      select string_agg(case r when 'apprentice' then 'the apprentice' when 'employer' then 'the employer' else 'the college' end, ', ')
        into v_left
        from unnest(array['apprentice', 'employer', 'provider']) r
       where not exists (select 1 from college_training_plan_signatures g
                          where g.plan_id = v_tp_wait.id and g.purpose = 'plan' and g.role = r);
    end if;
    v_status := case
      when v_tp.id is null and coalesce(s.start_date, v_today) + 42 >= v_today then 'due'
      when v_tp.id is null then 'missing'
      when v_tp_wait.id is not null then 'attention'
      when v_plan.held_on is not null and v_tp.in_force_from::date < v_plan.held_on then 'attention'
      else 'ok' end;
    v_items := v_items || jsonb_build_object('key', 'training_plan', 'group', 'start', 'title', 'Training plan, signed by all three',
      'kind', 'training_plan', 'status', v_status, 'link', 'training_plan', 'builder', true,
      'due_date', case when v_tp.id is null then coalesce(s.start_date, v_today) + 42 end,
      'detail', case
        when v_tp.id is null then 'Version ' || v_tp_wait.version || ' is waiting for ' || coalesce(v_left, 'signatures')
             || '. It must be signed by all three by ' || to_char(coalesce(s.start_date, v_today) + 42, 'DD Mon YYYY') || ' (day 42).'
        when v_tp_wait.id is not null then 'Version ' || v_tp.version || ' is in force. Version ' || v_tp_wait.version
             || ' is waiting for ' || coalesce(v_left, 'signatures') || '.'
        when v_plan.held_on is not null and v_tp.in_force_from::date < v_plan.held_on
          then 'The review on ' || to_char(v_plan.held_on, 'DD Mon YYYY') || ' changed the plan; issue a new version for the employer to re-sign.'
        else 'Version ' || v_tp.version || ' in force since ' || to_char(v_tp.in_force_from, 'DD Mon YYYY')
             || ' · signed by all three · ' || round(coalesce(v_tp.planned_otj_hours, 0)) || 'h planned' end,
      'evidence', '[]'::jsonb);
  else
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'training_plan' and e.superseded_at is null order by e.created_at desc limit 1;
  select r.held_on, r.outcomes->>'plan_change' as change into v_plan
    from college_tripartite_reviews r
   where r.student_id = s.id and r.locked_at is not null
     and r.outcomes->>'plan_change' in ('content', 'end_date', 'otj_release')
   order by r.held_on desc limit 1;
  v_status := case
    when v_ev is null and coalesce(s.start_date, v_today) + 42 >= v_today then 'due'
    when v_ev is null then 'missing'
    when (select count(distinct x->>'role') from jsonb_array_elements(coalesce(v_ev->'signatures', '[]'::jsonb)) x
           where x->>'role' in ('apprentice', 'employer', 'provider')) < 3 then 'attention'
    when v_plan.held_on is not null and coalesce((v_ev->>'document_date')::date, (v_ev->>'created_at')::date) < v_plan.held_on then 'attention'
    else 'ok' end;
  v_items := v_items || jsonb_build_object('key', 'training_plan', 'group', 'start', 'title', 'Training plan, signed by all three',
    'para', '95–96; 98.4.1', 'kind', 'training_plan', 'status', v_status,
    'due_date', case when v_ev is null then coalesce(s.start_date, v_today) + 42 end,
    'detail', case
      when v_status = 'due' then 'Agree and sign it by ' || to_char(coalesce(s.start_date, v_today) + 42, 'DD Mon YYYY') || ' (day 42).'
      when v_status = 'missing' then 'The current training plan, signed and dated by the apprentice, employer and college, with previous versions.'
      when v_plan.held_on is not null and coalesce((v_ev->>'document_date')::date, (v_ev->>'created_at')::date) < v_plan.held_on
        then 'The review on ' || to_char(v_plan.held_on, 'DD Mon YYYY') || ' changed the plan; the employer must re-sign a new version.'
      when v_status = 'attention' then 'Filed, but not signed by all three parties.'
      else 'Signed by all three · version ' || (v_ev->>'version') end,
    'evidence', public._ev_list(v_ev));
  end if;

  -- 6 Initial assessment and prior learning (35.2; 62.4)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'initial_assessment' and e.superseded_at is null order by e.created_at desc limit 1;
  select to_jsonb(e) into v_ev2 from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'rpl_summary' and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'initial_assessment', 'group', 'start', 'title', 'Initial assessment and prior learning',
    'para', '35.2; 62.4', 'kind', 'initial_assessment',
    'status', case when v_ev is null then 'missing' else 'ok' end,
    'detail', case when v_ev is null then 'The skills scan, prior-learning check and how the content, price and off-the-job hours were adjusted (or why not), agreed with the employer.'
                   else 'On file' || case when v_ev2 is not null then ' · prior learning summary filed' else ' · no prior-learning reduction recorded' end end,
    'evidence', public._ev_list(v_ev) || public._ev_list(v_ev2));

  -- 6b Prior learning: skills scan, floors, price (ELE-2042)
  select * into v_sp from college_learner_starting_points where student_id = s.id;
  v_status := case
    when v_sp.rpl_decision is null then 'missing'
    when v_sp.rpl_decision = 'none' then 'ok'
    when v_sp.ksb_scan is null or jsonb_array_length(v_sp.ksb_scan) = 0 then 'attention'
    when v_year in ('2025/26', '2026/27') and coalesce(v_sp.rpl_base_hours, 0) - coalesce(v_sp.rpl_hours_reduced, 0) < 187 then 'attention'
    when v_sp.agreed_price is null then 'attention'
    else 'ok' end;
  v_items := v_items || jsonb_build_object('key', 'prior_learning', 'group', 'start', 'title', 'Prior learning: hours and price',
    'field', true, 'status', v_status, 'link', 'starting_point',
    'detail', case
      when v_sp.rpl_decision is null then 'Record the prior learning decision: none found, or the hours taken off after a skills scan.'
      when v_sp.rpl_decision = 'none' then 'No relevant prior learning found' || coalesce(' · recorded ' || to_char(v_sp.rpl_decided_at, 'DD Mon YYYY'), '') || '.'
      when v_sp.ksb_scan is null or jsonb_array_length(v_sp.ksb_scan) = 0
        then round(v_sp.rpl_hours_reduced) || 'h taken off with no skills scan against the knowledge, skills and behaviours on file.'
      when v_year in ('2025/26', '2026/27') and coalesce(v_sp.rpl_base_hours, 0) - coalesce(v_sp.rpl_hours_reduced, 0) < 187
        then 'Planned hours are below the 187-hour floor after prior learning.'
      when v_sp.agreed_price is null
        then round(v_sp.rpl_hours_reduced) || 'h taken off (' || coalesce(v_sp.rpl_percent, 0) || '%). Record the price reduction: at least half that percentage off the funding band maximum.'
      else round(v_sp.rpl_hours_reduced) || 'h taken off (' || coalesce(v_sp.rpl_percent, 0) || '%) after the skills scan on '
           || to_char(v_sp.ksb_scan_on, 'DD Mon YYYY') || ' · price £' || to_char(v_sp.agreed_price, 'FM999G999')
           || ' (most allowed £' || to_char(v_sp.max_price, 'FM999G999') || ') · HRS4 ' || round(v_sp.rpl_hours_reduced) end);

  -- 7 Planned off-the-job hours (80; box after 94)
  if s.user_id is not null then v_otj := public._otj_summary_core(s.user_id); end if;
  v_items := v_items || jsonb_build_object('key', 'planned_otj', 'group', 'start', 'title', 'Planned off-the-job hours',
    'para', '80; 94', 'field', true,
    'status', case when v_otj is null then 'missing' when (v_otj->>'required_hours') is null then 'missing' else 'ok' end,
    'detail', case when v_otj is null then 'The learner has not joined Elec-Mate, so no hours record exists yet.'
                   when (v_otj->>'required_hours') is null then 'Set the planned hours for this learner or their course.'
                   else round((v_otj->>'required_hours')::numeric) || 'h planned (' || replace(v_otj->>'required_source', '_', ' ') || '). Must match the training plan and the ILR.' end);

  -- 8 Active learning every calendar month (88–89)
  v_months := public._otj_monthly(s.id);
  v_window := case when s.delivery_model in ('block_release', 'front_loaded') then 3 else 2 end;
  v_n_months := jsonb_array_length(v_months);
  for i in 0 .. v_n_months - 1 loop
    m := v_months->i;
    -- the current month is not over: only judge complete months
    if (m->>'month')::date = date_trunc('month', v_today)::date then continue; end if;
    if (m->>'minutes')::int = 0 then
      v_gap_run := v_gap_run + 1;
      v_gap_months := v_gap_months || to_char((m->>'month')::date, 'Mon YYYY');
      v_max_run := greatest(v_max_run, v_gap_run);
    else
      v_gap_run := 0;
    end if;
  end loop;
  v_items := v_items || jsonb_build_object('key', 'monthly_otj', 'group', 'during', 'title', 'Training every month',
    'para', case when v_window = 3 then '88' else '89' end,
    'status', case when s.user_id is null then 'missing'
                   when v_max_run >= v_window then 'attention'
                   when array_length(v_gap_months, 1) > 0 then 'attention'
                   else 'ok' end,
    'detail', case when s.user_id is null then 'No hours record: the learner has not joined Elec-Mate.'
                   when v_max_run >= v_window then 'No training in ' || array_to_string(v_gap_months, ', ')
                        || '. ' || v_window || ' months running without any means a break in learning has to be recorded.'
                   when array_length(v_gap_months, 1) > 0 then 'No training in ' || array_to_string(v_gap_months, ', ') || '.'
                   else 'Training recorded in every complete month since the start.' end,
    'months', v_months);

  -- 9 Progress reviews (97–98)
  v_due := public.tripartite_due_by(s.id);
  select count(*), count(*) filter (where r.employer_attendance = 'attended') into v_n, v_att
    from college_tripartite_reviews r where r.student_id = s.id and r.locked_at is not null;
  select r.held_on, r.employer_attendance, r.employer_invited_at, r.signatures into v_last
    from college_tripartite_reviews r where r.student_id = s.id and r.locked_at is not null
   order by r.held_on desc limit 1;
  v_status := case
    when v_due < v_today then 'missing'
    when v_last.held_on is not null and not (v_last.signatures ? 'student_signed_at') then 'attention'
    when v_n >= 2 and v_att * 2 <= v_n then 'attention'
    when v_due <= v_today + 21 then 'due'
    else 'ok' end;
  v_items := v_items || jsonb_build_object('key', 'reviews', 'group', 'during', 'title', 'Progress review every 3 months',
    'para', '97–98', 'status', v_status, 'due_date', v_due, 'link', 'reviews',
    'detail', case
      when v_due < v_today then 'Overdue: the next review was due by ' || to_char(v_due, 'DD Mon YYYY') || '.'
      when v_last.held_on is not null and not (v_last.signatures ? 'student_signed_at')
        then 'The review on ' || to_char(v_last.held_on, 'DD Mon YYYY') || ' is not signed by the apprentice yet.'
      when v_n >= 2 and v_att * 2 <= v_n then 'The employer attended ' || v_att || ' of ' || v_n || ' reviews; it must be most of them.'
      else coalesce('Last held ' || to_char(v_last.held_on, 'DD Mon YYYY') || ' · ', 'None held yet · ')
           || 'next due by ' || to_char(v_due, 'DD Mon YYYY')
           || case when v_n > 0 then ' · employer attended ' || v_att || ' of ' || v_n else '' end end);

  -- 10 Learning support check every 3 months (40.5; 97.3)
  v_support := coalesce(array_length(s.send_flags, 1), 0) > 0 or s.ehcp_ref is not null
    or exists (select 1 from college_ilps i where i.student_id = s.id and i.is_current
                and length(trim(coalesce(i.support_needs, ''))) > 0);
  if v_support then
    select r.held_on into v_last from college_tripartite_reviews r
     where r.student_id = s.id and r.locked_at is not null
       and coalesce((r.outcomes->'learning_support'->>'discussed')::boolean, false)
     order by r.held_on desc limit 1;
    v_items := v_items || jsonb_build_object('key', 'learning_support', 'group', 'during', 'title', 'Learning support reviewed every 3 months',
      'para', '40.5; 97.3', 'kind', 'learning_support_plan',
      'status', case when v_last.held_on is null then 'missing'
                     when (date_trunc('month', v_last.held_on) + interval '4 months - 1 day')::date < v_today then 'missing'
                     else 'ok' end,
      'detail', case when v_last.held_on is null then 'Support needs are recorded but no learning support review is on file.'
                     else 'Last reviewed ' || to_char(v_last.held_on, 'DD Mon YYYY') || '.' end);
  else
    v_items := v_items || jsonb_build_object('key', 'learning_support', 'group', 'during', 'title', 'Learning support reviewed every 3 months',
      'para', '40.5', 'status', 'not_applicable', 'detail', 'No support needs recorded.');
  end if;

  -- 11 English and maths (box after 58; 45.4)
  select count(*) filter (where lower(f.subject) like 'english%'),
         count(*) filter (where lower(f.subject) like 'math%')
    into v_n, v_att from college_functional_skills f where f.student_id = s.id;
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind in ('fs_decision', 'fs_exemption') and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'english_maths', 'group', 'start', 'title', 'English and maths decision',
    'para', '45.4; box after 58', 'kind', 'fs_decision',
    'status', case when v_n > 0 and v_att > 0 then 'ok' when v_ev is not null then 'ok' else 'missing' end,
    'detail', case when v_n > 0 and v_att > 0 then 'English and maths recorded (achieved, exempt or in progress).'
                   when v_ev is not null then 'Decision on file.'
                   else 'Record prior attainment or the decision on English and maths, and any exemption.' end,
    'evidence', public._ev_list(v_ev));

  -- 12 Minimum duration and working hours (76; 70)
  v_status := case
    when s.start_date is null or s.expected_end_date is null then 'missing'
    when s.expected_end_date < (s.start_date + interval '8 months')::date then 'attention'
    when s.weekly_contracted_hours is null then 'missing'
    when s.weekly_contracted_hours < 30 then 'attention'
    else 'ok' end;
  v_items := v_items || jsonb_build_object('key', 'duration', 'group', 'start', 'title', 'Duration and working hours',
    'para', '70; 76', 'field', true, 'status', v_status,
    'detail', case
      when s.start_date is null or s.expected_end_date is null then 'Set the start and planned end dates.'
      when s.expected_end_date < (s.start_date + interval '8 months')::date then 'Shorter than the 8-month minimum.'
      when s.weekly_contracted_hours is null then 'Record the apprentice''s contracted weekly hours.'
      when s.weekly_contracted_hours < 30 then s.weekly_contracted_hours || ' hours a week: keep evidence that the duration was extended to match.'
      else to_char(s.start_date, 'DD Mon YYYY') || ' to ' || to_char(s.expected_end_date, 'DD Mon YYYY') || ' · '
           || s.weekly_contracted_hours || ' hours a week' end);

  -- 13 Lawful wage (box after 72.3)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.superseded_at is null
     and (e.kind = 'wage_confirmation' or (e.kind = 'training_plan' and e.structured ? 'wage_statement'))
   order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'wage', 'group', 'start', 'title', 'Paid a lawful wage',
    'para', '72.3', 'kind', 'wage_confirmation',
    'status', case when v_ev is null then 'missing' else 'ok' end,
    'detail', case when v_ev is null then 'A copy of the employment terms or a written statement about wages.' else 'On file.' end,
    'evidence', public._ev_list(v_ev));

  -- 14 Care leavers' bursary information, 24 or younger (box after 62.4)
  v_age := case when s.date_of_birth is null then null
                else extract(year from age(coalesce(s.start_date, v_today), s.date_of_birth))::int end;
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'care_leaver_info' and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'care_leaver', 'group', 'start', 'title', 'Told about the care leavers'' bursary',
    'para', '62.4; 113', 'kind', 'care_leaver_info',
    'status', case when v_age is null then 'missing' when v_age > 24 then 'not_applicable'
                   when v_ev is null then 'missing' else 'ok' end,
    'detail', case when v_age is null then 'Record the date of birth to know whether this applies.'
                   when v_age > 24 then 'Not applicable: ' || v_age || ' at the start.'
                   when v_ev is null then 'Record that the apprentice was told about the bursary.'
                   else 'Recorded.' end,
    'evidence', public._ev_list(v_ev));

  -- 15 Contract for services with the employer (181; 190)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.employer_id = s.employer_id and s.employer_id is not null and e.kind = 'contract_for_services'
     and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'contract_for_services', 'group', 'start', 'title', 'Contract for services with the employer',
    'para', '181; 190', 'kind', 'contract_for_services', 'employer_level', true,
    'status', case when s.employer_id is null then 'missing' when v_ev is null then 'missing' else 'ok' end,
    'detail', case when s.employer_id is null then 'No employer recorded for this learner.'
                   when v_ev is null then 'The signed contract with the employer, including the no-contribution statement.'
                   else 'On file for the employer.' end,
    'evidence', public._ev_list(v_ev));

  -- 16 Gateway (119)
  v_items := v_items || jsonb_build_object('key', 'gateway', 'group', 'end', 'title', 'Gateway: ready for assessment',
    'para', '119',
    'status', case when not v_gateway_phase then 'not_yet_due'
                   when exists (select 1 from epa_gateway_checklist g where g.user_id = s.user_id and g.gateway_passed)
                     or exists (select 1 from college_epa e where e.student_id = s.id and e.gateway_date is not null)
                     then 'ok'
                   else 'due' end,
    'detail', case when not v_gateway_phase then 'From 3 months before the planned end.'
                   else 'Minimum duration met, gateway requirements met and the employer content the apprentice is ready.' end);

  -- 16a The plan was delivered: all three agree at the end (para 101, 2026/27 starts) (ELE-2039)
  v_left := null;
  if v_tp.id is not null and v_tp.delivered_requested_at is not null and v_tp.delivered_at is null then
    select string_agg(case r when 'apprentice' then 'the apprentice' when 'employer' then 'the employer' else 'the college' end, ', ')
      into v_left from unnest(array['apprentice', 'employer', 'provider']) r
     where not exists (select 1 from college_training_plan_signatures g where g.plan_id = v_tp.id and g.purpose = 'delivered' and g.role = r);
  end if;
  v_items := v_items || jsonb_build_object('key', 'training_plan_delivered', 'group', 'end', 'title', 'Training plan delivered: all three agree',
    'link', 'training_plan',
    'status', case when v_year is distinct from '2026/27' then 'not_applicable'
                   when v_tp.delivered_at is not null then 'ok'
                   when not v_gateway_phase then 'not_yet_due'
                   else 'due' end,
    'detail', case when v_year is distinct from '2026/27' then 'New in the 2026/27 rules: not required for a start before 1 August 2026.'
                   when v_tp.delivered_at is not null then 'Agreed by all three on ' || to_char(v_tp.delivered_at, 'DD Mon YYYY') || '.'
                   when not v_gateway_phase then 'At the end of the programme or in the gateway review.'
                   when v_left is not null then 'Waiting for ' || v_left || '.'
                   when v_tp.id is null then 'No plan in force in the builder to confirm.'
                   else 'Ask the apprentice, employer and college to agree the plan has been delivered.' end);

  -- 16b The assessment organisation's signed readiness checklist (NET's form for AM2S / AM2D)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'net_readiness_checklist' and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'net_readiness_checklist', 'group', 'end', 'title', 'Signed readiness checklist (NET)',
    'para', '119', 'kind', 'net_readiness_checklist',
    'status', case when not v_gateway_phase then 'not_yet_due' when v_ev is null then 'due' else 'ok' end,
    'detail', case when not v_gateway_phase then 'At gateway.'
                   when v_ev is null then 'NET''s Readiness for Assessment checklist, signed by the apprentice, employer and college. NET only accepts signatures dated within 6 months of the gateway application.'
                   else 'On file.' end,
    'evidence', public._ev_list(v_ev));

  -- 16c The EPAO chosen on time (ELE-2041)
  v_epao := public._epao_due(s.id);
  v_items := v_items || jsonb_build_object('key', case when v_epao->>'assessment_plan' = 'revised' then 'epao_on_time_revised' else 'epao_on_time' end,
    'group', 'during', 'title', 'Assessment organisation chosen on time', 'link', 'epao',
    'status', case v_epao->>'status' when 'ok' then 'ok' when 'ok_late' then 'attention' when 'overdue' then 'missing'
                                     when 'due_soon' then 'due' when 'not_yet_due' then 'not_yet_due' else 'missing' end,
    'due_date', v_epao->>'due_date',
    'detail', case v_epao->>'status'
      when 'ok' then 'Chosen ' || to_char((v_epao->>'chosen_on')::date, 'DD Mon YYYY')
                     || coalesce(', due by ' || to_char((v_epao->>'due_date')::date, 'DD Mon YYYY'), '') || '.'
      when 'ok_late' then 'Chosen ' || to_char((v_epao->>'chosen_on')::date, 'DD Mon YYYY') || ', after it was due ('
                     || to_char((v_epao->>'due_date')::date, 'DD Mon YYYY') || ').'
      when 'unknown' then 'Set the planned end date to work out when the organisation must be chosen.'
      else case when v_epao->>'assessment_plan' = 'revised'
                then 'Revised assessment plan: choose the organisation at the start, by '
                else 'Choose the organisation and agree the price at least 6 months before gateway, by ' end
           || to_char((v_epao->>'due_date')::date, 'DD Mon YYYY') || '.' end);

  -- 17 Statement that the apprentice stays employed through EPA (box after 129)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'epa_employment_statement' and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'epa_employment', 'group', 'end', 'title', 'Employed until the assessment ends',
    'para', '129', 'kind', 'epa_employment_statement',
    'status', case when not v_gateway_phase then 'not_yet_due' when v_ev is null then 'due' else 'ok' end,
    'detail', case when not v_gateway_phase then 'At gateway.'
                   when v_ev is null then 'A statement signed by the employer and college that the apprentice stays employed until the assessment is complete.'
                   else 'On file.' end,
    'evidence', public._ev_list(v_ev));

  -- 17b Agreement with the end-point assessment organisation (box after 129)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind = 'epao_agreement' and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'epao_agreement', 'group', 'end', 'title', 'Agreement with the assessment organisation',
    'para', '129', 'kind', 'epao_agreement',
    'status', case when not v_gateway_phase then 'not_yet_due' when v_ev is null then 'due' else 'ok' end,
    'detail', case when not v_gateway_phase then 'Before gateway.'
                   when v_ev is null then 'The written agreement with the end-point assessment organisation.'
                   else 'On file.' end,
    'evidence', public._ev_list(v_ev));

  -- 17c The assessment result (box after 129)
  select to_jsonb(e) into v_ev from college_learner_evidence e
   where e.student_id = s.id and e.kind in ('epa_result', 'epa_certificate') and e.superseded_at is null order by e.created_at desc limit 1;
  v_items := v_items || jsonb_build_object('key', 'epa_result', 'group', 'end', 'title', 'Assessment result',
    'para', '129', 'kind', 'epa_result',
    'status', case when lower(coalesce(s.status, '')) <> 'completed' and not exists (
                     select 1 from college_epa e where e.student_id = s.id and e.result is not null) then 'not_yet_due'
                   when v_ev is null then 'due' else 'ok' end,
    'detail', case when v_ev is null then 'The assessment organisation''s evidence of the result or the certificate.' else 'On file.' end,
    'evidence', public._ev_list(v_ev));

  -- 18 Planned versus actual hours at the end (92–94)
  -- ELE-2044: eligible ACTUAL (verified) against PLANNED, warn at 80%, due 12 weeks after the end.
  v_hb := public._hours_statement_basis(s.id);
  v_items := v_items || jsonb_build_object('key', 'otj_statement', 'group', 'end', 'title', 'Planned and actual hours at the end',
    'link', 'otj',
    'due_date', case when v_end_phase and coalesce((v_hb->>'statement_needed')::boolean, false) then v_hb->>'statement_due_by' end,
    'hours', jsonb_build_object('planned', v_hb->'planned_hours', 'verified', v_hb->'verified_hours',
                                'app_tracked', v_hb->'app_tracked_hours', 'elapsed_pct', v_hb->'elapsed_pct'),
    'status', case
      when v_hb is null or (v_hb->>'planned_hours') is null then case when v_end_phase then 'missing' else 'not_yet_due' end
      when not v_end_phase and coalesce((v_hb->>'warn_80')::boolean, false) then 'attention'
      when not v_end_phase then 'not_yet_due'
      when not coalesce((v_hb->>'statement_needed')::boolean, false) then 'ok'
      when exists (select 1 from otj_hours_statements h where h.college_student_id = s.id and h.superseded_at is null
                     and h.learner_signed_at is not null and h.employer_signed_at is not null) then 'ok'
      when (v_hb->>'statement_due_by')::date < v_today then 'missing'
      else 'due' end,
    'detail', case
      when v_hb is null or (v_hb->>'planned_hours') is null then 'Set the planned off-the-job hours to compare against.'
      when not v_end_phase and coalesce((v_hb->>'warn_80')::boolean, false)
        then (v_hb->>'elapsed_pct') || '% through: ' || (v_hb->>'verified_hours') || 'h verified against '
             || round((v_hb->>'planned_hours')::numeric) || 'h planned (' || (v_hb->>'planned_by_now') || 'h by now). If fewer than '
             || round((v_hb->>'planned_hours')::numeric) || 'h are verified by the end, a statement signed by the apprentice and employer is due within 12 weeks.'
      when not v_end_phase then 'At the end of the practical period. ' || (v_hb->>'verified_hours') || 'h verified of '
             || round((v_hb->>'planned_hours')::numeric) || 'h planned so far.'
      when not coalesce((v_hb->>'statement_needed')::boolean, false)
        then (v_hb->>'verified_hours') || 'h verified meets the ' || round((v_hb->>'planned_hours')::numeric) || 'h planned: no statement needed.'
      else (v_hb->>'verified_hours') || 'h verified against ' || round((v_hb->>'planned_hours')::numeric)
           || 'h planned. A statement signed by the apprentice and employer is due by '
           || to_char((v_hb->>'statement_due_by')::date, 'DD Mon YYYY') || ' (12 weeks after the end).' end
      || case when coalesce((v_hb->>'app_tracked_hours')::numeric, 0) > 0
              then ' App-tracked learning ' || (v_hb->>'app_tracked_hours') || 'h is shown separately and is not in this figure.'
              else '' end);

  -- 19 Breaks and changes recorded (266–277)
  select count(*) into v_n from college_learner_episodes p where p.student_id = s.id and p.kind = 'break';
  v_items := v_items || jsonb_build_object('key', 'episodes', 'group', 'during', 'title', 'Breaks and changes recorded',
    'para', '266–277', 'link', 'episodes',
    'status', case when v_max_run >= v_window and v_n = 0 then 'attention' else 'ok' end,
    'detail', case when v_max_run >= v_window and v_n = 0
                     then 'A gap of ' || v_max_run || ' months with no training and no break in learning recorded.'
                   when v_n > 0 then v_n || ' break' || case when v_n > 1 then 's' else '' end || ' in learning recorded.'
                   else 'No breaks or changes.' end);

  -- 20 The college's own requirements
  for v_plan in
    select q.* from college_evidence_requirements q
     where q.college_id = s.college_id and q.active
       and (q.cohort_id is null or q.cohort_id = s.cohort_id)
       and (q.course_id is null or q.course_id = s.course_id)
     order by q.stage, q.created_at
  loop
    select to_jsonb(e) into v_ev from college_learner_evidence e
     where e.student_id = s.id and e.requirement_id = v_plan.id and e.superseded_at is null
     order by e.created_at desc limit 1;
    v_status := case
      when v_plan.stage = 'end' and not v_gateway_phase then 'not_yet_due'
      when v_ev is null and v_plan.due_within_days is not null
           and coalesce(s.start_date, v_today) + v_plan.due_within_days >= v_today then 'due'
      when v_ev is null then 'missing'
      when v_plan.renew_months is not null
           and (coalesce((v_ev->>'document_date')::date, (v_ev->>'created_at')::date)
                + make_interval(months => v_plan.renew_months))::date < v_today then 'attention'
      when coalesce(array_length(v_plan.needs_signature_from, 1), 0) > 0
           and exists (select 1 from unnest(v_plan.needs_signature_from) r
                        where not exists (select 1 from jsonb_array_elements(coalesce(v_ev->'signatures', '[]'::jsonb)) x
                                           where x->>'role' = r)) then 'attention'
      else 'ok' end;
    v_items := v_items || jsonb_build_object('key', 'custom:' || v_plan.id, 'group', v_plan.stage, 'title', v_plan.title,
      'para', 'College requirement', 'kind', 'custom', 'requirement_id', v_plan.id, 'custom', true,
      'status', v_status,
      'due_date', case when v_ev is null and v_plan.due_within_days is not null then coalesce(s.start_date, v_today) + v_plan.due_within_days end,
      'detail', case
        when v_status = 'not_yet_due' then coalesce(v_plan.description, 'At the end of the programme.')
        when v_status = 'attention' and v_plan.renew_months is not null and v_ev is not null
             and (coalesce((v_ev->>'document_date')::date, (v_ev->>'created_at')::date) + make_interval(months => v_plan.renew_months))::date < v_today
          then 'Expired: renew every ' || v_plan.renew_months || ' months.'
        when v_status = 'attention' then 'Filed, but not signed by everyone it needs.'
        when v_ev is null then coalesce(v_plan.description, 'Required by the college.')
        else 'On file' || case when v_plan.renew_months is not null then ' · renew by ' || to_char(
               (coalesce((v_ev->>'document_date')::date, (v_ev->>'created_at')::date) + make_interval(months => v_plan.renew_months))::date,
               'DD Mon YYYY') else '' end end,
      'evidence', public._ev_list(v_ev));
  end loop;

  -- ELE-2038: cite the rules of the learner's start year, verified paragraph by paragraph.
  for v_it in select value from jsonb_array_elements(v_items) loop
    if coalesce((v_it->>'custom')::boolean, false) then
      v_out := v_out || v_it;
      continue;
    end if;
    v_rkey := case
      when v_it->>'key' = 'monthly_otj' and v_window = 3 then 'monthly_otj_block'
      when v_it->>'key' = 'learning_support' and v_it->>'status' = 'not_applicable' then 'learning_support_na'
      else v_it->>'key' end;
    v_ref := public._fr_ref(v_rkey, v_year);
    v_out := v_out || (v_it || jsonb_build_object(
      'key', case when v_it->>'key' = 'epao_on_time_revised' then 'epao_on_time' else v_it->>'key' end,
      'para', case when (v_ref->>'verified')::boolean then v_ref->>'para' end,
      'para_verified', coalesce((v_ref->>'verified')::boolean, false) and (v_ref->>'para') is not null,
      'para_note', v_ref->>'note',
      'rules_year', v_year));
  end loop;
  v_items := v_out;

  return jsonb_build_object(
    'rules', jsonb_build_object(
      'year', v_year,
      'label', case when v_year in ('2024/25', '2025/26', '2026/27')
                    then 'Apprenticeship funding rules ' || v_year || ' (start ' || coalesce(to_char(s.start_date, 'DD Mon YYYY'), 'not set') || ')'
                    when v_year is null then 'No start date: the rules year is not known'
                    else 'Started before 1 August 2024: rules for that year are not mapped' end,
      'source_url', public._funding_rules_source(v_year),
      'evidence_section', (public._fr_ref('evidence_section', v_year))->>'para',
      'signatures', (public._fr_ref('signatures', v_year))->>'para',
      'leaver_end_date', (public._fr_ref('leaver_end_date', v_year))->>'para',
      'identifiers', (public._fr_ref('identifiers', v_year))->>'para',
      'monthly', concat_ws(' and ', (public._fr_ref('monthly_otj_block', v_year))->>'para', (public._fr_ref('monthly_otj', v_year))->>'para')),
    'learner', jsonb_build_object(
      'id', s.id, 'name', s.name, 'uln', s.uln, 'status', s.status, 'start_date', s.start_date,
      'expected_end_date', s.expected_end_date, 'date_of_birth', s.date_of_birth, 'ni_number', s.ni_number,
      'weekly_contracted_hours', s.weekly_contracted_hours, 'delivery_model', s.delivery_model,
      'learning_actual_end_date', s.learning_actual_end_date, 'employer_id', s.employer_id, 'college_id', s.college_id,
      'course', (select c.name from college_courses c where c.id = s.course_id),
      'cohort', (select c.name from college_cohorts c where c.id = s.cohort_id),
      'employer', (select e.company_name from college_employers e where e.id = s.employer_id)),
    'generated_at', now(),
    'items', v_items,
    'counts', (select jsonb_object_agg(st, n) from (
                 select x->>'status' st, count(*) n from jsonb_array_elements(v_items) x group by 1) c),
    'episodes', coalesce((select jsonb_agg(to_jsonb(p) order by p.effective_date)
                            from college_learner_episodes p where p.student_id = s.id), '[]'::jsonb),
    'history', coalesce((select jsonb_agg(to_jsonb(e) - 'structured' order by e.kind, e.version desc)
                           from college_learner_evidence e where e.student_id = s.id), '[]'::jsonb));
end; $function$;

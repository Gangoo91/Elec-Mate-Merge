-- ELE-1910 Ofsted "show me": six questions answered from the real record.
--
-- college_inspection_answers(p_college, p_question) returns one answer: a
-- headline built only from counts over the college's own rows, and one line
-- per learner (attention first) that names the record it rests on and where
-- to open it. No model is involved: every sentence is assembled here from
-- retrieved rows. Sources per question:
--   employer_coplanning   college_tripartite_reviews (held, employer attendance, employer input)
--   otj_quantified        _otj_summary_core() — the same hours function the learner and OTJ pages use
--   safeguarding_under18  college_students.date_of_birth, college_staff.is_dsl, college_workplace_visits,
--                         pastoral_notes (kind 'safeguarding': counts only, and only for safeguarding readers)
--   english_maths         college_functional_skills via college_fs_gateway_status
--   progress_standard     student_ac_coverage, portfolio_assessment_decisions, college_iqa_samples
--   epa_readiness         get_gateway_readiness() — the gateway state function
-- ADDITIVE: a new function only.

create or replace function public.college_inspection_answers(p_college uuid, p_question text)
returns jsonb
language plpgsql stable security definer set search_path to 'public'
as $$
declare
  v_today date := (now() at time zone 'Europe/London')::date;
  v_lines jsonb := '[]'::jsonb;
  v_head text;
  v_counts jsonb := '{}'::jsonb;
  v_title text;
  v_sources text[];
  v_sg boolean;
  r record;
  g jsonb;
  o jsonb;
  n_total int := 0; n_a int := 0; n_b int := 0; n_c int := 0; n_d int := 0;
  v_num numeric := 0;
  v_txt text;
begin
  if auth.uid() is null or p_college is null
     or not (public.college_can('learners.view_all', p_college) or public.college_can('quality.view', p_college)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  -- ── 1. Co-planning and reviewing training with employers ───────────────
  if p_question = 'employer_coplanning' then
    v_title := 'How do you plan and review training with employers?';
    v_sources := array['college_tripartite_reviews', 'college_students'];
    for r in
      select cs.id, cs.name, coalesce(cs.review_frequency_months, 3) as every,
             cs.start_date,
             lr.id as review_id, lr.held as held, lr.employer_attendance, lr.employer_input,
             (select count(*) from college_tripartite_reviews t
               where t.student_id = cs.id and t.status = 'completed'
                 and coalesce(t.held_on, t.completed_at::date) >= v_today - 365) as held_12m,
             nx.scheduled_at as next_at
        from college_students cs
        left join lateral (
          select t.id, coalesce(t.held_on, t.completed_at::date) as held, t.employer_attendance,
                 (t.employer_input is not null and t.employer_input <> '{}'::jsonb and t.employer_input <> 'null'::jsonb) as employer_input
            from college_tripartite_reviews t
           where t.student_id = cs.id and t.status = 'completed'
           order by coalesce(t.held_on, t.completed_at::date) desc nulls last limit 1) lr on true
        left join lateral (
          select t.scheduled_at from college_tripartite_reviews t
           where t.student_id = cs.id and t.status = 'scheduled' and t.scheduled_at >= now()
           order by t.scheduled_at limit 1) nx on true
       where cs.college_id = p_college and cs.status = 'Active'
       order by cs.name
    loop
      n_total := n_total + 1;
      if r.held is not null and r.held >= v_today - (r.every * 30 + 14) then
        n_a := n_a + 1;  -- in date
        if r.employer_attendance in ('attended', 'contributed') or r.employer_input then n_b := n_b + 1; end if;
      elsif r.held is null and coalesce(r.start_date, v_today) > v_today - (r.every * 30 + 14) then
        n_d := n_d + 1;  -- not yet due
      else
        n_c := n_c + 1;  -- overdue
      end if;
      v_lines := v_lines || jsonb_build_object(
        'learner_id', r.id, 'learner_name', r.name,
        'state', case when r.held is null and coalesce(r.start_date, v_today) > v_today - (r.every * 30 + 14) then 'info'
                      when r.held is not null and r.held >= v_today - (r.every * 30 + 14) then 'ok' else 'attention' end,
        'text', case
          when r.held is null then 'No progress review held yet'
            || case when r.next_at is not null then '; next booked for ' || to_char(r.next_at at time zone 'Europe/London', 'FMDD Mon YYYY') else '' end || '.'
          else 'Last review ' || to_char(r.held, 'FMDD Mon YYYY')
            || case r.employer_attendance when 'attended' then ', employer attended'
                                          when 'contributed' then ', employer contributed in writing'
                                          when 'invited_no_response' then ', employer invited but did not respond'
                                          else case when r.employer_input then ', employer input recorded' else ', no employer attendance recorded' end end
            || '. ' || r.held_12m || ' held in the last 12 months; agreed every ' || r.every || ' months'
            || case when r.next_at is not null then '; next ' || to_char(r.next_at at time zone 'Europe/London', 'FMDD Mon') else '; none booked' end || '.'
        end,
        'record', case when r.review_id is not null then 'review' else 'learner' end,
        'record_id', coalesce(r.review_id, r.id),
        'href', '/college?section=student360&studentId=' || r.id || '#reviews',
        'at', r.held);
    end loop;
    v_counts := jsonb_build_object('learners', n_total, 'in_date', n_a, 'employer_involved', n_b, 'overdue', n_c, 'not_yet_due', n_d);
    v_head := case when n_total = 0 then 'No active learners on record.'
      else n_a || ' of ' || n_total || ' active learners have a progress review in date with their employer'
        || '; the employer attended or contributed to ' || n_b || ' of those. '
        || n_c || ' ' || case when n_c = 1 then 'is' else 'are' end || ' overdue'
        || case when n_d > 0 then ' and ' || n_d || ' not yet due.' else '.' end end;

  -- ── 2. Off-the-job training, quantified ─────────────────────────────────
  elsif p_question = 'otj_quantified' then
    v_title := 'How much off-the-job training are apprentices getting?';
    v_sources := array['college_otj_entries', 'learning activity', 'user_otj_programmes', '_otj_summary_core'];
    for r in
      select cs.id, cs.name, cs.user_id from college_students cs
       where cs.college_id = p_college and cs.status = 'Active' order by cs.name
    loop
      n_total := n_total + 1;
      o := case when r.user_id is not null then public._otj_summary_core(r.user_id) else null end;
      v_num := v_num + coalesce((o->>'verified_hours')::numeric, 0);
      v_txt := coalesce(o->>'risk', 'no_plan');
      if v_txt = 'on_track' then n_a := n_a + 1;
      elsif v_txt = 'slightly_behind' then n_b := n_b + 1;
      elsif v_txt = 'behind' then n_c := n_c + 1;
      else n_d := n_d + 1; end if;
      v_lines := v_lines || jsonb_build_object(
        'learner_id', r.id, 'learner_name', r.name,
        'state', case v_txt when 'on_track' then 'ok' when 'no_plan' then 'info' else 'attention' end,
        'text', case
          when o is null then 'Not linked to an Elec-Mate account, so no hours are recorded.'
          when o->>'required_hours' is null then coalesce(o->>'counted_hours', '0') || ' h counted; no planned hours set, so pace cannot be judged.'
          else coalesce(o->>'counted_hours', '0') || ' h of ' || (o->>'required_hours') || ' h counted ('
            || coalesce(o->>'verified_hours', '0') || ' h verified or attested, ' || coalesce(o->>'pending_hours', '0') || ' h awaiting a decision)'
            || case when o->>'planned_to_date_hours' is not null then '; ' || (o->>'planned_to_date_hours') || ' h planned by today' else '' end
            || case when o->>'weekly_needed_hours' is not null then '; ' || (o->>'weekly_needed_hours') || ' h a week needed to finish on time' else '' end
            || '. ' || case v_txt when 'on_track' then 'On track.' when 'slightly_behind' then 'Slightly behind.' when 'behind' then 'Behind.' else '' end
        end,
        'record', 'learner', 'record_id', r.id,
        'href', '/college?section=student360&studentId=' || r.id || '#otj',
        'at', null);
    end loop;
    v_counts := jsonb_build_object('learners', n_total, 'on_track', n_a, 'slightly_behind', n_b, 'behind', n_c, 'no_plan', n_d, 'verified_hours', round(v_num, 1));
    v_head := case when n_total = 0 then 'No active learners on record.'
      else round(v_num, 1) || ' hours of off-the-job training verified or attested across ' || n_total || ' active learners. '
        || n_a || ' on track, ' || n_b || ' slightly behind, ' || n_c || ' behind'
        || case when n_d > 0 then ', ' || n_d || ' without a plan to measure against.' else '.' end end;

  -- ── 3. Safeguarding under-18s in workshops and at work ─────────────────
  elsif p_question = 'safeguarding_under18' then
    v_title := 'How do you keep under-18s safe in workshops and at work?';
    v_sources := array['college_students', 'college_staff', 'college_workplace_visits', 'pastoral_notes'];
    v_sg := public.college_can('safeguarding.read', p_college);
    select string_agg(s.name, ', ' order by s.name) into v_txt from college_staff s
     where s.college_id = p_college and s.archived_at is null and (coalesce(s.is_dsl, false) or coalesce(s.is_deputy_dsl, false));
    for r in
      select cs.id, cs.name, cs.date_of_birth,
             extract(year from age(v_today, cs.date_of_birth))::int as age_years,
             (cs.date_of_birth + interval '18 years')::date as turns_18,
             wv.visit_date, wv.purpose,
             (select count(*) from pastoral_notes pn where pn.student_id = cs.id and pn.kind = 'safeguarding' and pn.closed_at is null) as sg_open
        from college_students cs
        left join lateral (
          select w.visit_date, w.purpose from college_workplace_visits w
           where w.student_id = cs.id order by w.visit_date desc limit 1) wv on true
       where cs.college_id = p_college and cs.status = 'Active'
         and (cs.date_of_birth is null or cs.date_of_birth > v_today - interval '18 years')
       order by cs.date_of_birth nulls first, cs.name
    loop
      if r.date_of_birth is null then
        n_d := n_d + 1;
        continue;
      end if;
      n_total := n_total + 1;
      if r.visit_date is not null and r.visit_date >= v_today - 183 then n_a := n_a + 1; end if;
      if r.sg_open > 0 then n_b := n_b + 1; end if;
      v_lines := v_lines || jsonb_build_object(
        'learner_id', r.id, 'learner_name', r.name,
        'state', case when r.visit_date is not null and r.visit_date >= v_today - 183 then 'ok' else 'attention' end,
        'text', 'Aged ' || r.age_years || ' (18 on ' || to_char(r.turns_18, 'FMDD Mon YYYY') || '). '
          || case when r.visit_date is not null then 'Last workplace visit ' || to_char(r.visit_date, 'FMDD Mon YYYY')
                    || case when r.purpose is not null then ' (' || replace(r.purpose, '_', ' ') || ')' else '' end || '.'
                  else 'No workplace visit recorded.' end
          || case when v_sg and r.sg_open > 0 then ' ' || r.sg_open || ' open safeguarding ' || case when r.sg_open = 1 then 'record' else 'records' end || ' with the DSL.' else '' end,
        'record', 'learner', 'record_id', r.id,
        'href', '/college?section=student360&studentId=' || r.id || '#support',
        'at', r.visit_date);
    end loop;
    v_counts := jsonb_build_object('under_18', n_total, 'visited_6m', n_a, 'no_dob', n_d,
                                   'open_safeguarding', case when v_sg then n_b end, 'dsl', v_txt);
    v_head := n_total || ' active ' || case when n_total = 1 then 'learner is' else 'learners are' end || ' under 18'
      || case when n_total > 0 then '; ' || n_a || ' had a workplace visit in the last six months' else '' end || '. '
      || case when v_txt is not null then 'Designated safeguarding lead: ' || v_txt || '.' else 'No designated safeguarding lead is recorded on the staff list.' end
      || case when n_d > 0 then ' ' || n_d || ' active ' || case when n_d = 1 then 'learner has' else 'learners have' end || ' no date of birth, so their age is unknown.' else '' end;
    if n_d > 0 then
      v_lines := v_lines || jsonb_build_object(
        'learner_id', null, 'learner_name', 'Dates of birth missing',
        'state', 'attention',
        'text', n_d || ' active ' || case when n_d = 1 then 'learner has' else 'learners have' end || ' no date of birth on record. Add it in Data and API, ILR fields.',
        'record', 'page', 'record_id', null, 'href', '/college/settings/data', 'at', null);
    end if;

  -- ── 4. English and maths ────────────────────────────────────────────────
  elsif p_question = 'english_maths' then
    v_title := 'Where is each apprentice with English and maths?';
    v_sources := array['college_functional_skills', 'college_fs_gateway_status'];
    for r in
      select f.student_id as id, f.name, f.maths_status, f.english_status, f.maths_level, f.english_level,
             coalesce(f.fs_gateway_clear, false) as clear, f.latest_exam_date
        from college_fs_gateway_status f
       where f.college_id = p_college
       order by coalesce(f.fs_gateway_clear, false), f.name
    loop
      n_total := n_total + 1;
      if r.clear then n_a := n_a + 1;
      elsif r.maths_status = 'not_started' and r.english_status = 'not_started' then n_c := n_c + 1;
      else n_b := n_b + 1; end if;
      v_lines := v_lines || jsonb_build_object(
        'learner_id', r.id, 'learner_name', r.name,
        'state', case when r.clear then 'ok' when r.maths_status = 'not_started' and r.english_status = 'not_started' then 'attention' else 'info' end,
        'text', 'Maths ' || replace(r.maths_level, '_', ' ') || ': ' || replace(r.maths_status, '_', ' ')
          || '. English ' || replace(r.english_level, '_', ' ') || ': ' || replace(r.english_status, '_', ' ') || '.'
          || case when r.latest_exam_date is not null then ' Latest exam ' || to_char(r.latest_exam_date, 'FMDD Mon YYYY') || '.' else '' end,
        'record', 'learner', 'record_id', r.id,
        'href', '/college?section=student360&studentId=' || r.id || '#epa',
        'at', r.latest_exam_date);
    end loop;
    v_counts := jsonb_build_object('learners', n_total, 'clear', n_a, 'in_progress', n_b, 'nothing_recorded', n_c);
    v_head := case when n_total = 0 then 'No active learners on record.'
      else n_a || ' of ' || n_total || ' active learners have English and maths cleared for gateway (passed or exempt). '
        || n_b || ' in progress; ' || n_c || ' with nothing recorded yet.' end;

  -- ── 5. Progress against the standard ────────────────────────────────────
  elsif p_question = 'progress_standard' then
    v_title := 'What progress are apprentices making against the standard?';
    v_sources := array['student_ac_coverage', 'portfolio_assessment_decisions', 'college_iqa_samples'];
    for r in
      select cs.id, cs.name, cs.user_id,
             (select count(*) from student_ac_coverage c where c.student_id = cs.id) as ac_total,
             (select count(*) from student_ac_coverage c where c.student_id = cs.id and c.status = 'assessed') as ac_done,
             ld.id as decision_id, ld.decided_at, ld.decision, ld.unit_code, ld.ac_code, ld.iqa_verdict,
             (select count(*) from portfolio_assessment_decisions d
               where cs.user_id is not null and d.learner_id = cs.user_id and d.decided_at >= now() - interval '30 days') as d30
        from college_students cs
        left join lateral (
          select d.id, d.decided_at, d.decision, d.unit_code, d.ac_code, d.iqa_verdict
            from portfolio_assessment_decisions d
           where cs.user_id is not null and d.learner_id = cs.user_id
           order by d.decided_at desc limit 1) ld on true
       where cs.college_id = p_college and cs.status = 'Active'
       order by cs.name
    loop
      n_total := n_total + 1;
      n_b := n_b + r.d30;
      if r.ac_total > 0 then
        v_num := v_num + (r.ac_done::numeric / r.ac_total);
        n_a := n_a + 1;
      end if;
      v_lines := v_lines || jsonb_build_object(
        'learner_id', r.id, 'learner_name', r.name,
        'state', case when r.ac_total = 0 then 'info'
                      when r.decided_at is null or r.decided_at < now() - interval '60 days' then 'attention' else 'ok' end,
        'text', case when r.ac_total = 0 then 'No criteria mapped yet.'
                     else r.ac_done || ' of ' || r.ac_total || ' criteria assessed (' || round(100.0 * r.ac_done / r.ac_total) || '%).' end
          || case when r.decided_at is not null
               then ' Latest decision ' || to_char(r.decided_at at time zone 'Europe/London', 'FMDD Mon YYYY') || ': ' || replace(r.decision, '_', ' ')
                    || ' on ' || r.unit_code || ' AC ' || r.ac_code
                    || case r.iqa_verdict when 'confirmed' then ', IQA confirmed' when 'not_confirmed' then ', IQA not confirmed' else '' end || '.'
               else ' No assessment decisions yet.' end,
        'record', case when r.decision_id is not null then 'decision' else 'learner' end,
        'record_id', coalesce(r.decision_id, r.id),
        'href', case when r.decision_id is not null then '/college/students/' || r.id || '/evidence'
                     else '/college?section=student360&studentId=' || r.id || '#assess' end,
        'at', r.decided_at);
    end loop;
    select count(*) into n_c from college_iqa_samples s
      join college_iqa_sampling p on p.id = s.sampling_plan_id
     where p.college_id = p_college and s.sampled_at >= now() - interval '90 days';
    select max(s.sampled_at)::date::text into v_txt from college_iqa_samples s
      join college_iqa_sampling p on p.id = s.sampling_plan_id where p.college_id = p_college;
    for r in
      select s.sampling_plan_id, s.sampled_at, s.verdict, coalesce(s.target_title_snapshot, s.observation_title_snapshot, s.otj_title_snapshot) as title,
             s.iqa_name_snapshot, cs.id as student_id, cs.name
        from college_iqa_samples s
        join college_iqa_sampling p on p.id = s.sampling_plan_id
        left join college_students cs on cs.user_id = s.learner_user_id and cs.college_id = p_college
       where p.college_id = p_college
       order by s.sampled_at desc limit 3
    loop
      v_lines := v_lines || jsonb_build_object(
        'learner_id', r.student_id, 'learner_name', 'IQA sample' || coalesce(': ' || r.name, ''),
        'state', 'info',
        'text', coalesce(r.iqa_name_snapshot, 'IQA') || ' sampled ' || coalesce('"' || r.title || '"', 'a decision')
          || ' on ' || to_char(r.sampled_at at time zone 'Europe/London', 'FMDD Mon YYYY') || coalesce(': ' || replace(r.verdict, '_', ' '), '') || '.',
        'record', 'iqa_sample', 'record_id', r.sampling_plan_id,
        'href', '/college/iqa/sampling/' || r.sampling_plan_id,
        'at', r.sampled_at);
    end loop;
    v_counts := jsonb_build_object('learners', n_total, 'avg_assessed_pct', case when n_a > 0 then round(100 * v_num / n_a) end,
                                   'decisions_30d', n_b, 'iqa_samples_90d', n_c, 'latest_iqa', v_txt);
    v_head := case when n_total = 0 then 'No active learners on record.'
      else case when n_a > 0 then 'On average ' || round(100 * v_num / n_a) || '% of mapped criteria are assessed across ' || n_a || ' learners. '
                else 'No learner has criteria mapped yet. ' end
        || n_b || ' assessment ' || case when n_b = 1 then 'decision' else 'decisions' end || ' in the last 30 days; '
        || n_c || ' IQA ' || case when n_c = 1 then 'sample' else 'samples' end || ' in the last 90 days'
        || case when v_txt is not null then ', latest ' || to_char(v_txt::date, 'FMDD Mon YYYY') || '.' else '.' end end;

  -- ── 6. EPA readiness ────────────────────────────────────────────────────
  elsif p_question = 'epa_readiness' then
    v_title := 'Which apprentices are ready for end-point assessment, and what is in the way?';
    v_sources := array['get_gateway_readiness', 'college_epa', 'epa_gateway_declarations'];
    for r in
      select cs.id, cs.name, cs.user_id, cs.expected_end_date from college_students cs
       where cs.college_id = p_college and cs.status = 'Active' order by cs.expected_end_date nulls last, cs.name
    loop
      n_total := n_total + 1;
      g := null;
      if r.user_id is not null then
        begin
          g := public.get_gateway_readiness(r.user_id);
        exception when others then g := null;
        end;
      end if;
      if coalesce((g->>'gateway_passed')::boolean, false) then n_a := n_a + 1;
      elsif g->>'overall' = 'green' then n_b := n_b + 1;
      elsif g->>'overall' = 'amber' then n_c := n_c + 1;
      else n_d := n_d + 1; end if;
      select string_agg(i->>'label', ', ') into v_txt
        from jsonb_array_elements(coalesce(g->'items', '[]'::jsonb)) i where i->>'state' = 'red';
      v_lines := v_lines || jsonb_build_object(
        'learner_id', r.id, 'learner_name', r.name,
        'state', case when coalesce((g->>'gateway_passed')::boolean, false) or g->>'overall' = 'green' then 'ok'
                      when g is null then 'info' else 'attention' end,
        'text', case
          when g is null then 'No gateway checklist yet (not linked to an account or no route set).'
          when coalesce((g->>'gateway_passed')::boolean, false) then 'Gateway passed'
            || case when g->>'epa_booking_date' is not null then '; assessment booked for ' || to_char((g->>'epa_booking_date')::date, 'FMDD Mon YYYY') else '; assessment not booked yet' end || '.'
          else (g->>'met') || ' of ' || (g->>'total') || ' gateway requirements met'
            || case when v_txt is not null then '. Still needed: ' || v_txt else '' end || '.'
        end
          || case when r.expected_end_date is not null then ' Planned end ' || to_char(r.expected_end_date, 'FMDD Mon YYYY') || '.' else '' end,
        'record', 'learner', 'record_id', r.id,
        'href', '/college?section=student360&studentId=' || r.id || '#epa',
        'at', null);
    end loop;
    v_counts := jsonb_build_object('learners', n_total, 'gateway_passed', n_a, 'ready', n_b, 'nearly', n_c, 'not_ready', n_d);
    v_head := case when n_total = 0 then 'No active learners on record.'
      else n_a || ' through gateway, ' || n_b || ' meeting every gateway requirement, ' || n_c || ' close and '
        || n_d || ' with requirements still missing, out of ' || n_total || ' active learners.' end;

  else
    raise exception 'unknown question %', p_question using errcode = '22023';
  end if;

  -- attention first, then the rest, each group in its original order
  select coalesce(jsonb_agg(l order by case l->>'state' when 'attention' then 0 when 'info' then 1 else 2 end, ord), '[]'::jsonb)
    into v_lines from jsonb_array_elements(v_lines) with ordinality as x(l, ord);

  return jsonb_build_object(
    'question', p_question,
    'title', v_title,
    'headline', v_head,
    'counts', v_counts,
    'lines', v_lines,
    'sources', to_jsonb(v_sources),
    'safeguarding_detail', case when p_question = 'safeguarding_under18' then v_sg end,
    'taken_at', now());
end;
$$;
revoke all on function public.college_inspection_answers(uuid, text) from public, anon;
grant execute on function public.college_inspection_answers(uuid, text) to authenticated;
comment on function public.college_inspection_answers(uuid, text) is
  '[COLLEGE] ELE-1910 inspector questions answered from the record: headline counts and one line per learner linking to the review, decision, sample or learner area it rests on. No AI. Rule: staff with learners.view_all or quality.view; safeguarding counts only for safeguarding readers.';

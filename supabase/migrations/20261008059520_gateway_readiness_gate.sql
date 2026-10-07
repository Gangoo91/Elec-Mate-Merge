-- ELE-1872: gateway readiness is the real gate, per standard, one truth for
-- learner and tutor.
--
-- get_gateway_readiness(p_learner) returns each gateway requirement as a line
-- with a state (green = met, amber = in hand / waiting on someone else,
-- red = missing), a plain sentence, and a link key saying exactly what is
-- missing ('coverage', 'hours', 'start_date', 'english_maths',
-- 'declaration_learner', 'declaration_provider', 'declaration_employer',
-- 'net_checklist'). The client maps the key to the learner's or the tutor's
-- screen. It replaces the weighted score as the headline; the AM2 practice
-- estimate stays a separate, secondary figure (the simulator is untouched).
--
-- Sources, all existing: criteria from get_portfolio_ac_state (Passed and IQA
-- confirmed count); hours from _otj_summary_core; English and maths from
-- epa_gateway_checklist and college_functional_skills; declarations from
-- epa_gateway_declarations; NET's Readiness for Assessment checklist from
-- college_learner_evidence (kind net_readiness_checklist); the start date from
-- college_students (else user_otj_programmes); the minimum duration from
-- apprenticeship_standard_rules below.
begin;
set local lock_timeout = '5s';

-- ── Minimum duration, by standard ─────────────────────────────────────────
create table if not exists public.apprenticeship_standard_rules (
  standard_code text primary key,
  min_duration_months integer not null check (min_duration_months between 1 and 120),
  source text not null,
  updated_at timestamptz not null default now()
);
comment on table public.apprenticeship_standard_rules is
  '[COLLEGE ↔ APPRENTICE] Gateway rules per apprenticeship standard (ELE-1872). min_duration_months = the shortest practical period before gateway. Row ''*'' is the default for every standard; a standard_code row (e.g. ST0152) overrides it. Scope: reference data, readable by any signed-in user, written by migrations only. Used by: get_gateway_readiness (learner Readiness view, Student 360 EPA readiness).';
alter table public.apprenticeship_standard_rules enable row level security;
drop policy if exists "apprenticeship_standard_rules: signed-in read" on public.apprenticeship_standard_rules;
create policy "apprenticeship_standard_rules: signed-in read" on public.apprenticeship_standard_rules
  for select to authenticated using (true);
revoke all on public.apprenticeship_standard_rules from anon;
revoke insert, update, delete on public.apprenticeship_standard_rules from authenticated;
grant select on public.apprenticeship_standard_rules to authenticated;

-- The same 8-month minimum the funding evidence pack already checks
-- (_learner_evidence_pack, item "Duration and working hours", funding rules
-- para 70/76). Per-standard rows can be added when a standard says otherwise.
insert into public.apprenticeship_standard_rules (standard_code, min_duration_months, source)
values ('*', 8, 'Apprenticeship funding rules: minimum duration of the practical period (8 months), as used by the funding evidence pack')
on conflict (standard_code) do nothing;

-- ── The gate ───────────────────────────────────────────────────────────────
create or replace function public.get_gateway_readiness(p_learner uuid default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  u uuid := coalesce(p_learner, auth.uid());
  q record;
  st record;
  g public.epa_gateway_checklist;
  s jsonb;
  v_items jsonb := '[]'::jsonb;
  v_is_epa boolean;
  v_total int := 0; v_passed int := 0; v_with int := 0; v_back int := 0; v_todo int := 0;
  v_start date; v_end date; v_min int; v_min_src text; v_met date; v_today date := (now() at time zone 'Europe/London')::date;
  v_counted numeric; v_required numeric; v_planned numeric;
  v_subject text; v_ok boolean; v_fs text; v_waived boolean;
  v_signed record; v_pending record;
  v_net boolean;
  v_state text;
  v_overall text;
  v_label text;
begin
  if auth.uid() is null or u is null or not (auth.uid() = u or public._can_assess(u)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  select * into q from public._resolve_qualification(u, null) limit 1;
  select * into st from public._gateway_standard(coalesce(q.course_code, q.code, q.requirement_code));
  v_is_epa := st.standard_code is not null;
  select * into g from public.epa_gateway_checklist where user_id = u order by updated_at desc nulls last limit 1;
  s := public._otj_summary_core(u);

  -- 1 Criteria
  select count(*),
         count(*) filter (where a.state in ('passed', 'iqa_confirmed')),
         count(*) filter (where a.state = 'submitted'),
         count(*) filter (where a.state in ('referred', 'not_yet', 'iqa_rejected')),
         count(*) filter (where a.state in ('not_started', 'suggested', 'claimed'))
    into v_total, v_passed, v_with, v_back, v_todo
    from public.get_portfolio_ac_state(u) a;
  v_state := case when v_total > 0 and v_passed >= v_total then 'green'
                  when v_total > 0 and v_back = 0 and v_todo = 0 then 'amber'
                  else 'red' end;
  v_label := case st.route when 'am2' then 'Every other NVQ unit complete'
                           when 'am2e' then 'Experienced Worker Qualification criteria passed'
                           else 'Every qualification criterion passed' end;
  v_items := v_items || jsonb_build_object('key', 'criteria', 'label', v_label, 'state', v_state, 'link', 'coverage',
    'sentence', case
      when v_total = 0 then 'No qualification is set on the record, so there are no criteria to check.'
      when v_state = 'green' then 'All ' || v_total || ' criteria passed by the assessor.'
      else v_passed || ' of ' || v_total || ' passed.'
           || case when v_back > 0 then ' ' || v_back || ' sent back for more.' else '' end
           || case when v_todo > 0 then ' ' || v_todo || ' not yet sent to the assessor.' else '' end
           || case when v_with > 0 then ' ' || v_with || ' with the assessor.' else '' end
      end,
    'figures', jsonb_build_object('passed', v_passed, 'total', v_total, 'with_assessor', v_with, 'sent_back', v_back, 'not_sent', v_todo));

  if v_is_epa then
    -- 2 Minimum duration
    select cs.start_date, cs.expected_end_date into v_start, v_end
      from public.college_students cs where cs.id = q.college_student_id;
    if v_start is null then
      select p.start_date, p.end_date into v_start, v_end from public.user_otj_programmes p where p.user_id = u;
    end if;
    select r.min_duration_months, r.source into v_min, v_min_src
      from public.apprenticeship_standard_rules r
     where r.standard_code in (st.standard_code, '*')
     order by (r.standard_code = '*') limit 1;
    v_met := case when v_start is not null and v_min is not null then (v_start + make_interval(months => v_min))::date end;
    v_state := case when v_start is null or v_min is null then 'red' when v_today >= v_met then 'green' else 'amber' end;
    v_items := v_items || jsonb_build_object('key', 'duration', 'label', 'Minimum time on programme', 'state', v_state,
      'link', 'start_date',
      'sentence', case
        when v_start is null then 'No start date on the record, so the minimum time on programme cannot be checked.'
        when v_state = 'green' then 'Started ' || to_char(v_start, 'FMDD Mon YYYY') || '. The ' || v_min || '-month minimum was met on ' || to_char(v_met, 'FMDD Mon YYYY') || '.'
        else 'Started ' || to_char(v_start, 'FMDD Mon YYYY') || '. The ' || v_min || '-month minimum is met on ' || to_char(v_met, 'FMDD Mon YYYY') || '.'
      end,
      'figures', jsonb_build_object('start_date', v_start, 'planned_end_date', v_end, 'min_months', v_min, 'met_on', v_met, 'source', v_min_src));

    -- 3 Off-the-job hours
    v_counted := coalesce((s->>'counted_hours')::numeric, 0);
    v_required := nullif((s->>'required_hours')::numeric, 0);
    v_planned := (s->>'planned_to_date_hours')::numeric;
    v_state := case when v_required is null then 'red'
                    when v_counted >= v_required then 'green'
                    when v_planned is null or v_counted + 0.5 >= v_planned then 'amber'
                    else 'red' end;
    v_items := v_items || jsonb_build_object('key', 'otj', 'label', 'Off-the-job training hours', 'state', v_state, 'link', 'hours',
      'sentence', case
        when v_required is null then 'No off-the-job hours target on the record yet.'
        when v_state = 'green' then round(v_counted) || ' of ' || round(v_required) || ' hours counted. Target met.'
        when v_state = 'amber' then round(v_counted) || ' of ' || round(v_required) || ' hours counted, on track for the plan.'
        else round(v_counted) || ' of ' || round(v_required) || ' hours counted, ' || round(v_planned - v_counted) || ' behind the plan to date.'
      end,
      'figures', jsonb_build_object('counted', v_counted, 'required', v_required, 'planned_to_date', v_planned));

    -- 4, 5 English and maths
    v_waived := coalesce(g.english_maths_not_required, false);
    foreach v_subject in array array['english', 'maths'] loop
      v_ok := case v_subject when 'english' then coalesce(g.english_level2_achieved, false) else coalesce(g.maths_level2_achieved, false) end;
      select f.status into v_fs from public.college_functional_skills f
       where f.student_id in (u, q.college_student_id) and f.subject = v_subject
       order by (f.status in ('passed', 'exempt')) desc, f.updated_at desc nulls last limit 1;
      v_state := case when v_ok or v_waived or v_fs in ('passed', 'exempt') then 'green'
                      when v_fs in ('in_progress', 'pending_results', 'resit') then 'amber'
                      else 'red' end;
      v_items := v_items || jsonb_build_object('key', v_subject, 'label', case v_subject when 'english' then 'English' else 'Maths' end,
        'state', v_state, 'link', 'english_maths',
        'sentence', case
          when v_ok then 'Level 2 achieved.'
          when v_waived then 'Not required: the employer''s decision, as the apprentice was 19 or over at the start.'
          when v_fs = 'exempt' then 'Exempt, recorded by the college.'
          when v_fs = 'passed' then 'Passed, recorded by the college.'
          when v_fs = 'pending_results' then 'Exam taken, waiting for the result.'
          when v_fs in ('in_progress', 'resit') then 'In progress with the college.'
          else 'No Level 2 result, exemption or decision recorded yet.'
        end);
    end loop;
  end if;

  -- Declarations (EPA standards sign them; other routes record the checklist)
  if v_is_epa then
    select d.signed_at, d.signer_name into v_signed from public.epa_gateway_declarations d
     where d.learner_id = u and d.kind = 'employer' and d.signed_at is not null and d.superseded_at is null
     order by d.signed_at desc limit 1;
    select d.created_at into v_pending from public.epa_gateway_declarations d
     where d.learner_id = u and d.kind = 'employer' and d.signed_at is null and d.superseded_at is null
       and d.token_expires_at > now() order by d.created_at desc limit 1;
    v_state := case when v_signed.signed_at is not null then 'green'
                     when v_pending.created_at is not null or coalesce(g.employer_satisfied, false) then 'amber'
                     else 'red' end;
    v_items := v_items || jsonb_build_object('key', 'behaviours', 'label', 'Behaviours and readiness, signed by the employer',
      'state', v_state, 'link', 'declaration_employer',
      'sentence', case
        when v_state = 'green' then 'Signed by ' || coalesce(v_signed.signer_name, 'the employer') || ' on ' || to_char(v_signed.signed_at at time zone 'Europe/London', 'FMDD Mon YYYY') || '.'
        when v_pending.created_at is not null then 'Sent to the employer to sign; not signed yet.'
        when coalesce(g.employer_satisfied, false) then 'Ticked on the checklist, but the employer has not signed the declaration.'
        else 'The employer has not been asked to sign yet.'
      end);

    select d.signed_at, d.signer_name into v_signed from public.epa_gateway_declarations d
     where d.learner_id = u and d.kind = 'provider' and d.signed_at is not null and d.superseded_at is null
     order by d.signed_at desc limit 1;
    v_state := case when v_signed.signed_at is not null then 'green'
                     when coalesce(g.provider_satisfied, false) then 'amber' else 'red' end;
    v_items := v_items || jsonb_build_object('key', 'provider', 'label', 'Training provider declaration',
      'state', v_state, 'link', 'declaration_provider',
      'sentence', case
        when v_state = 'green' then 'Signed by ' || coalesce(v_signed.signer_name, 'the college') || ' on ' || to_char(v_signed.signed_at at time zone 'Europe/London', 'FMDD Mon YYYY') || '.'
        when v_state = 'amber' then 'Ticked on the checklist, but the college has not signed the declaration.'
        else 'The college has not signed its readiness declaration yet.'
      end);

    select d.signed_at into v_signed from public.epa_gateway_declarations d
     where d.learner_id = u and d.kind = 'learner' and d.signed_at is not null and d.superseded_at is null
     order by d.signed_at desc limit 1;
    v_items := v_items || jsonb_build_object('key', 'learner', 'label', 'Apprentice declaration',
      'state', case when v_signed.signed_at is not null then 'green' else 'red' end, 'link', 'declaration_learner',
      'sentence', case when v_signed.signed_at is not null
        then 'Signed on ' || to_char(v_signed.signed_at at time zone 'Europe/London', 'FMDD Mon YYYY') || '.'
        else 'The apprentice has not signed their gateway declaration yet.' end);

    -- NET's Readiness for Assessment checklist (AM2S, AM2D)
    select exists (select 1 from public.college_learner_evidence e
                    where e.student_id = q.college_student_id and e.kind = 'net_readiness_checklist'
                      and e.superseded_at is null) into v_net;
    v_items := v_items || jsonb_build_object('key', 'net_checklist', 'label', 'NET Readiness for Assessment checklist',
      'state', case when v_net then 'green' else 'red' end, 'link', 'net_checklist',
      'sentence', case when v_net then 'Signed copy on file.'
        else 'NET''s checklist, signed by the apprentice, employer and college, is not on file yet.' end);
  else
    v_items := v_items
      || jsonb_build_object('key', 'employer', 'label', 'Employer sign-off',
           'state', case when coalesce(g.employer_satisfied, false) then 'green' else 'red' end, 'link', 'declaration_employer',
           'sentence', case when coalesce(g.employer_satisfied, false) then 'Recorded on the checklist.' else 'Not recorded yet.' end)
      || jsonb_build_object('key', 'provider', 'label', 'Training provider sign-off',
           'state', case when coalesce(g.provider_satisfied, false) then 'green' else 'red' end, 'link', 'declaration_provider',
           'sentence', case when coalesce(g.provider_satisfied, false) then 'Recorded on the checklist.' else 'Not recorded yet.' end);
  end if;

  select case when bool_and(i->>'state' = 'green') then 'green'
              when bool_or(i->>'state' = 'red') then 'red' else 'amber' end
    into v_overall from jsonb_array_elements(v_items) i;

  return jsonb_build_object(
    'route', coalesce(st.route, 'none'),
    'assessment', st.assessment,
    'standard_code', st.standard_code,
    'standard_title', st.standard_title,
    'college_student_id', q.college_student_id,
    'overall', v_overall,
    'met', (select count(*) from jsonb_array_elements(v_items) i where i->>'state' = 'green'),
    'total', jsonb_array_length(v_items),
    'gateway_passed', coalesce(g.gateway_passed, false),
    'gateway_passed_at', g.gateway_passed_at,
    'epa_booking_date', g.epa_booking_date,
    'items', v_items,
    'taken_at', now());
end;
$$;
revoke all on function public.get_gateway_readiness(uuid) from public, anon;
grant execute on function public.get_gateway_readiness(uuid) to authenticated;

commit;

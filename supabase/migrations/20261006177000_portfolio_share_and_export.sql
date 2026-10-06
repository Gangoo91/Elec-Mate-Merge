-- Portfolio 2.0 backbone, step 3 (ELE-1860 / ELE-1881 / ELE-1885).
--
-- Found 6 Oct: the shared-portfolio page and both structured exports call
-- get_shared_portfolio_structured / get_shared_portfolio_export_data /
-- get_portfolio_export_data, which DO NOT EXIST in production. The Feb
-- migrations defining them were never applied and would fail (they use columns
-- and a table that don't exist). Every share link and structured export was broken.
--
-- Also: portfolio_shares had a SELECT policy for the public role listing every
-- active share token. Every share read goes through SECURITY DEFINER functions,
-- so the policy is dropped.
--
-- One builder, _portfolio_structured(), produces the shape the app's types
-- expect (src/hooks/portfolio/usePortfolioExportData.ts,
-- src/hooks/portfolio/useSharedPortfolioStructured.ts) from the real schema,
-- using the one qualification resolver. A share includes only the entries the
-- learner chose (entry_ids / portfolio_item_id) when they chose any.

do $$
declare p record;
begin
  for p in select policyname from pg_policies
            where schemaname = 'public' and tablename = 'portfolio_shares'
              and 'public' = any(roles) and cmd = 'SELECT' loop
    execute format('drop policy %I on public.portfolio_shares', p.policyname);
  end loop;
end $$;

create or replace function public._portfolio_structured(
  p_user_id uuid,
  p_entry_ids uuid[] default null,
  p_for_share boolean default false)
returns jsonb
language plpgsql stable security definer set search_path to 'public'
as $$
declare
  r record;
  v_name text;
  v_student public.college_students%rowtype;
  v_college_name text;
  v_employer text;
  v_apprentice jsonb;
  v_units jsonb;
  v_ksb jsonb;
  v_otj jsonb;
  v_entries jsonb;
  v_hours numeric;
  v_target numeric;
  v_filter boolean := p_entry_ids is not null and array_length(p_entry_ids, 1) is not null;
begin
  select * into r from public._resolve_qualification(p_user_id, null);
  select coalesce(full_name, username) into v_name from public.profiles where id = p_user_id;

  if r.college_student_id is not null then
    select * into v_student from public.college_students where id = r.college_student_id;
    select name into v_college_name from public.colleges where id = v_student.college_id;
    if v_student.employer_id is not null then
      select to_jsonb(e)->>'name' into v_employer from public.college_employers e where e.id = v_student.employer_id;
    end if;
  end if;

  v_apprentice := jsonb_build_object(
    'name', coalesce(v_name, 'Apprentice'),
    'qualification', coalesce(r.title, 'Not selected'),
    'code', coalesce(r.code, ''),
    'awarding_body', coalesce(r.awarding_body, ''),
    'level', coalesce(r.level, ''),
    'employer', coalesce(v_employer, ''),
    'training_provider', coalesce(v_college_name, ''),
    'start_date', v_student.start_date,
    'expected_end', v_student.expected_end_date);

  with ev as (
    select distinct
      coalesce(
        (regexp_match(s, 'Unit\s*([A-Za-z0-9/._-]+)'))[1],
        (regexp_match(s, '^\s*([A-Za-z0-9/._-]+)\s+AC\b'))[1],
        (regexp_match(s, '([A-Za-z0-9/._-]+)\s*AC\b'))[1]) as unit_code,
      (regexp_match(s, 'AC\s*([0-9]+(?:\.[0-9]+)*)'))[1] as ac_code
    from public.portfolio_items pi, unnest(pi.assessment_criteria_met) s
    where pi.user_id = p_user_id
      and (not v_filter or pi.id = any(p_entry_ids))
  ),
  cov as (
    select unit_code, ac_code from public.student_ac_coverage
     where r.college_student_id is not null
       and student_id = r.college_student_id
       and qualification_code = r.requirement_code
       and status not in ('not_started', 'in_progress')
       and not v_filter
  ),
  met as (select unit_code, ac_code from ev union select unit_code, ac_code from cov),
  acs as (
    select qr.unit_code, qr.unit_title, qr.lo_number, qr.lo_text, qr.ac_code, qr.ac_text,
           exists (select 1 from met m where m.unit_code = qr.unit_code and m.ac_code = qr.ac_code) as is_met
      from public.qualification_requirements qr
     where qr.qualification_code = r.requirement_code
  ),
  los as (
    select unit_code, max(unit_title) unit_title, lo_number, max(lo_text) lo_text,
           jsonb_agg(jsonb_build_object(
             'ac_text', trim(coalesce(ac_code, '') || ' ' || coalesce(ac_text, '')),
             'is_met', is_met) order by ac_code) acs
      from acs group by unit_code, lo_number
  )
  select coalesce(jsonb_agg(u order by u->>'unit_code'), '[]'::jsonb) into v_units
    from (
      select jsonb_build_object(
               'unit_code', unit_code,
               'unit_title', max(unit_title),
               'learning_outcomes', jsonb_agg(jsonb_build_object(
                  'lo_number', coalesce(lo_number::text, ''),
                  'lo_text', coalesce(lo_text, ''),
                  'assessment_criteria', acs) order by lo_number)) u
        from los group by unit_code) x;

  select jsonb_build_object(
    'knowledge', coalesce(jsonb_agg(k order by so, kc) filter (where k_type = 'knowledge'), '[]'::jsonb),
    'behaviours', coalesce(jsonb_agg(k order by so, kc) filter (where k_type like 'behaviour%'), '[]'::jsonb))
    into v_ksb
    from (
      select ak.ksb_type k_type, ak.sort_order so, ak.ksb_code kc,
             jsonb_build_object(
               'code', coalesce(ak.ksb_code, ''),
               'title', ak.title,
               'route', 'core',
               'status', coalesce(ukp.status, 'not_started'),
               'delivering_units', '[]'::jsonb) k
        from public.apprenticeship_ksbs ak
        left join public.user_ksb_progress ukp on ukp.ksb_id = ak.id and ukp.user_id = p_user_id
       where r.qualification_id is not null and ak.qualification_id = r.qualification_id) z;

  if r.college_student_id is not null then
    select coalesce(sum(duration_minutes), 0) / 60.0 into v_hours
      from public.college_otj_entries
     where student_id = p_user_id
       and verification_status in ('verified', 'verified_by_employer');
    v_target := coalesce(v_student.otj_required_hours, 0);
  else
    select current_hours, target_hours into v_hours, v_target
      from public.compliance_goals
     where user_id = p_user_id and status = 'active'
     order by updated_at desc limit 1;
  end if;
  v_otj := jsonb_build_object(
    'current', round(coalesce(v_hours, 0), 1),
    'target', coalesce(v_target, 0),
    'percentage', case when coalesce(v_target, 0) > 0
                       then least(100, round(100 * coalesce(v_hours, 0) / v_target)) else 0 end);

  select coalesce(jsonb_agg(
           jsonb_build_object(
             'id', pi.id, 'title', pi.title, 'description', pi.description,
             'category', pi.category, 'skills_demonstrated', pi.skills_demonstrated,
             'learning_outcomes_met', pi.learning_outcomes_met,
             'assessment_criteria_met', pi.assessment_criteria_met,
             'grade', pi.grade, 'created_at', pi.created_at)
           || case when p_for_share then jsonb_build_object(
                'supervisor_feedback', pi.supervisor_feedback,
                'reflection_notes', pi.reflection_notes,
                'file_url', pi.file_url, 'file_type', pi.file_type,
                'files', coalesce(pi.storage_urls, '[]'::jsonb)) else '{}'::jsonb end
           order by pi.created_at desc), '[]'::jsonb)
    into v_entries
    from public.portfolio_items pi
   where pi.user_id = p_user_id
     and (not v_filter or pi.id = any(p_entry_ids));

  return jsonb_build_object(
    'apprentice', v_apprentice,
    'units', coalesce(v_units, '[]'::jsonb),
    'ksb_summary', coalesce(v_ksb, jsonb_build_object('knowledge', '[]'::jsonb, 'behaviours', '[]'::jsonb)),
    'otj_hours', v_otj,
    'entries', v_entries);
end;
$$;
revoke all on function public._portfolio_structured(uuid, uuid[], boolean) from public, anon, authenticated;

create or replace function public.get_portfolio_export_data(p_user_id uuid)
returns jsonb
language plpgsql stable security definer set search_path to 'public'
as $$
begin
  if auth.uid() is null or not (auth.uid() = p_user_id or public._can_assess(p_user_id)) then
    return jsonb_build_object('error', 'Unauthorised');
  end if;
  return public._portfolio_structured(p_user_id, null, false);
end;
$$;
revoke all on function public.get_portfolio_export_data(uuid) from public, anon;
grant execute on function public.get_portfolio_export_data(uuid) to authenticated;

create or replace function public._share_scope(p_entry_ids uuid[], p_item uuid)
returns uuid[] language sql immutable as $$
  select case
    when p_entry_ids is not null and array_length(p_entry_ids, 1) is not null then p_entry_ids
    when p_item is not null then array[p_item]
    else null end;
$$;

create or replace function public.get_shared_portfolio_export_data(p_share_token text)
returns jsonb
language plpgsql stable security definer set search_path to 'public'
as $$
declare s public.portfolio_shares%rowtype;
begin
  select * into s from public.portfolio_shares
   where token = p_share_token and is_active and (expires_at is null or expires_at > now());
  if s.id is null then
    return jsonb_build_object('error', 'Invalid or expired share link');
  end if;
  return public._portfolio_structured(s.user_id, public._share_scope(s.entry_ids, s.portfolio_item_id), false);
end;
$$;
grant execute on function public.get_shared_portfolio_export_data(text) to anon, authenticated;

create or replace function public.get_shared_portfolio_structured(p_share_token text)
returns jsonb
language plpgsql volatile security definer set search_path to 'public'
as $$
declare
  s public.portfolio_shares%rowtype;
  v jsonb;
  v_scope uuid[];
  v_comments jsonb;
  v_submissions jsonb;
begin
  select * into s from public.portfolio_shares
   where token = p_share_token and is_active and (expires_at is null or expires_at > now());
  if s.id is null then
    return jsonb_build_object('error', 'Invalid or expired share link');
  end if;
  v_scope := public._share_scope(s.entry_ids, s.portfolio_item_id);
  v := public._portfolio_structured(s.user_id, v_scope, true);

  select coalesce(jsonb_agg(jsonb_build_object(
           'id', pc.id, 'context_type', coalesce(pc.context_type, 'evidence'),
           'context_id', pc.evidence_id, 'parent_id', pc.parent_id,
           'author_name', pc.author_name, 'author_role', pc.author_role,
           'author_initials', pc.author_initials, 'content', pc.content,
           'requires_action', coalesce(pc.requires_action, false),
           'is_resolved', coalesce(pc.is_resolved, false), 'created_at', pc.created_at)
           order by pc.created_at desc), '[]'::jsonb)
    into v_comments
    from public.portfolio_comments pc
   where pc.user_id = s.user_id
     and (v_scope is null or pc.evidence_id = any(v_scope));

  if v_scope is null then
    select coalesce(jsonb_agg(jsonb_build_object(
             'id', ps.id, 'category_id', ps.category_id,
             'category_name', coalesce(qc.name, 'Unit'),
             'qualification_id', ps.qualification_id, 'status', ps.status,
             'submitted_at', ps.submitted_at, 'reviewed_at', ps.reviewed_at,
             'assessor_feedback', ps.assessor_feedback, 'grade', ps.grade,
             'action_required', ps.action_required, 'strengths_noted', ps.strengths_noted,
             'areas_for_improvement', ps.areas_for_improvement,
             'submission_count', coalesce(ps.submission_count, 1),
             'signed_off_at', ps.signed_off_at)
             order by ps.submitted_at desc nulls last), '[]'::jsonb)
      into v_submissions
      from public.portfolio_submissions ps
      left join public.qualification_categories qc on qc.id = ps.category_id
     where ps.user_id = s.user_id;
  end if;

  update public.portfolio_shares
     set view_count = coalesce(view_count, 0) + 1, last_viewed_at = now()
   where id = s.id;

  return v
    || jsonb_build_object('apprentice', (v->'apprentice') || jsonb_build_object(
         'share_title', coalesce(s.title, 'Portfolio'), 'share_description', s.description))
    || jsonb_build_object('comments', v_comments, 'submissions', coalesce(v_submissions, '[]'::jsonb));
end;
$$;
grant execute on function public.get_shared_portfolio_structured(text) to anon, authenticated;

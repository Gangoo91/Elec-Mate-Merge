-- Site Safety in both hubs, phase 5: the firm's safety picture (ELE-2031, ELE-1985).
--
-- One read of everything the firm's Site Safety holds, for the Employer Hub's
-- Site Safety home. SECURITY INVOKER: it reads under the caller's own RLS, so a
-- manager sees exactly what the firm policies already let them read, and
-- anyone else gets zeros.
--
-- The score is built only from evidence the firm has. Each part is null when
-- there is nothing to measure, and the score itself is null ("not started")
-- until at least two parts have data. It is never 100 for an empty firm.
--
-- Read-only and new: nothing existing is changed.

create or replace function public.get_firm_safety_overview(p_employer_id uuid)
returns jsonb
language plpgsql
stable
security invoker
set search_path = public
as $$
declare
  v_now timestamptz := now();
  v_today date := current_date;
  v_30 date := current_date - 30;
  v_90 date := current_date - 90;
  v_managers uuid[];
  r jsonb := '{}'::jsonb;
  -- counts
  n_permits_live int; n_isolations_open int; n_fw_due int; n_coshh_overdue int; n_coshh int;
  n_nm_30 int; n_nm_90 int; n_nm_closed_90 int; n_acc_30 int; n_riddor int;
  n_brief_30 int; n_brief_signed_30 int; n_rams int; n_rams_issued int;
  n_shared_90 int; n_countersigned_90 int; n_records_30 int;
  -- score parts (0..1, null = nothing to measure)
  s_briefings numeric; s_incidents numeric; s_countersign numeric; s_coshh numeric; s_rams numeric;
  v_parts numeric[];
  v_score int;
begin
  if p_employer_id is null or p_employer_id not in (select public.my_employer_scope()) then
    return jsonb_build_object('score', null, 'parts', '{}'::jsonb);
  end if;

  select array_agg(x) into v_managers from public.safety_firm_manager_ids(p_employer_id) x;

  select count(*) into n_permits_live from public.permits_to_work
   where employer_id = p_employer_id and status = 'active' and end_time >= v_now;
  select count(*) into n_isolations_open from public.safe_isolation_records
   where employer_id = p_employer_id and coalesce(status, '') not in ('re_energised', 'completed', 'cancelled');
  select count(*) into n_fw_due from public.fire_watch_records
   where employer_id = p_employer_id and status = 'awaiting_follow_up'
     and follow_up_completed_at is null and follow_up_due_at <= v_now;
  select count(*), count(*) filter (where review_date < v_today)
    into n_coshh, n_coshh_overdue
    from public.coshh_assessments where employer_id = p_employer_id;
  select count(*) filter (where incident_date >= v_30),
         count(*) filter (where incident_date >= v_90),
         count(*) filter (where incident_date >= v_90 and status = 'closed')
    into n_nm_30, n_nm_90, n_nm_closed_90
    from public.near_miss_reports where employer_id = p_employer_id;
  select count(*) filter (where incident_date >= v_30),
         count(*) filter (where is_riddor_reportable and not coalesce(riddor_reported, false))
    into n_acc_30, n_riddor
    from public.accident_records where employer_id = p_employer_id;

  -- Toolbox talks in the last 30 days, and how many of their attendees signed.
  select count(*),
         coalesce(sum(least(
           jsonb_array_length(case when jsonb_typeof(attendee_signatures) = 'array' then attendee_signatures else '[]'::jsonb end),
           greatest(jsonb_array_length(case when jsonb_typeof(attendees) = 'array' then attendees else '[]'::jsonb end), 1)
         )), 0)
    into n_brief_30, n_brief_signed_30
    from public.team_briefings
   where employer_id = p_employer_id and coalesce(status, '') <> 'cancelled' and briefing_date >= v_30;

  select count(*), count(*) filter (where pdf_url is not null)
    into n_rams, n_rams_issued
    from public.rams_documents where employer_id = p_employer_id and created_at >= v_90;

  -- Team records shared with the firm in 90 days, and how many the firm has
  -- countersigned.
  with shared as (
    select user_id, firm_countersigned_at from public.permits_to_work where employer_id = p_employer_id and created_at >= v_90
    union all select user_id, firm_countersigned_at from public.coshh_assessments where employer_id = p_employer_id and created_at >= v_90
    union all select user_id, firm_countersigned_at from public.safe_isolation_records where employer_id = p_employer_id and created_at >= v_90
    union all select user_id, firm_countersigned_at from public.fire_watch_records where employer_id = p_employer_id and created_at >= v_90
    union all select user_id, firm_countersigned_at from public.pre_use_checks where employer_id = p_employer_id and created_at >= v_90
    union all select user_id, firm_countersigned_at from public.inspection_records where employer_id = p_employer_id and created_at >= v_90
    union all select user_id, firm_countersigned_at from public.safety_observations where employer_id = p_employer_id and created_at >= v_90
    union all select user_id, firm_countersigned_at from public.electrician_site_diary where employer_id = p_employer_id and created_at >= v_90
    union all select user_id, firm_countersigned_at from public.near_miss_reports where employer_id = p_employer_id and created_at >= v_90
    union all select user_id, firm_countersigned_at from public.accident_records where employer_id = p_employer_id and created_at >= v_90
    union all select user_id, firm_countersigned_at from public.rams_documents where employer_id = p_employer_id and created_at >= v_90
  )
  select count(*) filter (where not (user_id = any (coalesce(v_managers, array[]::uuid[])))),
         count(*) filter (where not (user_id = any (coalesce(v_managers, array[]::uuid[]))) and firm_countersigned_at is not null)
    into n_shared_90, n_countersigned_90
    from shared;

  select
    (select count(*) from public.permits_to_work where employer_id = p_employer_id and created_at >= v_30)
  + (select count(*) from public.coshh_assessments where employer_id = p_employer_id and created_at >= v_30)
  + (select count(*) from public.safe_isolation_records where employer_id = p_employer_id and created_at >= v_30)
  + (select count(*) from public.pre_use_checks where employer_id = p_employer_id and created_at >= v_30)
  + (select count(*) from public.inspection_records where employer_id = p_employer_id and created_at >= v_30)
  + (select count(*) from public.safety_observations where employer_id = p_employer_id and created_at >= v_30)
  + (select count(*) from public.electrician_site_diary where employer_id = p_employer_id and created_at >= v_30)
  + (select count(*) from public.team_briefings where employer_id = p_employer_id and created_at >= v_30)
  + (select count(*) from public.rams_documents where employer_id = p_employer_id and created_at >= v_30)
    into n_records_30;

  -- Score parts: only where there is something to measure.
  s_briefings := case
    when n_brief_30 = 0 then null
    else least(1, n_brief_signed_30::numeric / greatest((
      select coalesce(sum(greatest(jsonb_array_length(case when jsonb_typeof(attendees) = 'array' then attendees else '[]'::jsonb end), 1)), 0)
        from public.team_briefings
       where employer_id = p_employer_id and coalesce(status, '') <> 'cancelled' and briefing_date >= v_30
    ), 1)) end;
  s_incidents := case when n_nm_90 = 0 then null else n_nm_closed_90::numeric / n_nm_90 end;
  s_countersign := case when n_shared_90 = 0 then null else n_countersigned_90::numeric / n_shared_90 end;
  s_coshh := case when n_coshh = 0 then null else 1 - (n_coshh_overdue::numeric / n_coshh) end;
  s_rams := case when n_rams = 0 then null else n_rams_issued::numeric / n_rams end;

  select array_agg(x) into v_parts
    from unnest(array[s_briefings, s_incidents, s_countersign, s_coshh, s_rams]) x
   where x is not null;
  v_score := case
    when coalesce(array_length(v_parts, 1), 0) < 2 then null
    else round(100 * (select avg(x) from unnest(v_parts) x))::int
  end;

  return jsonb_build_object(
    'permits_live', n_permits_live,
    'isolations_open', n_isolations_open,
    'fire_watch_follow_ups_due', n_fw_due,
    'coshh_total', n_coshh,
    'coshh_reviews_overdue', n_coshh_overdue,
    'near_misses_30d', n_nm_30,
    'accidents_30d', n_acc_30,
    'riddor_pending', n_riddor,
    'briefings_30d', n_brief_30,
    'briefing_signatures_30d', n_brief_signed_30,
    'rams_90d', n_rams,
    'rams_issued_90d', n_rams_issued,
    'team_shared_90d', n_shared_90,
    'to_countersign', n_shared_90 - n_countersigned_90,
    'records_30d', n_records_30,
    'score', v_score,
    'parts', jsonb_build_object(
      'briefings_signed', round(s_briefings * 100),
      'near_misses_closed', round(s_incidents * 100),
      'team_records_countersigned', round(s_countersign * 100),
      'coshh_in_date', round(s_coshh * 100),
      'rams_issued', round(s_rams * 100)
    )
  );
end;
$$;

revoke all on function public.get_firm_safety_overview(uuid) from public, anon;
grant execute on function public.get_firm_safety_overview(uuid) to authenticated;

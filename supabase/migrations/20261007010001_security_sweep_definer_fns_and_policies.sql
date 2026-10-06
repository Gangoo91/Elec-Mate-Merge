-- App-wide security sweep, 7 Oct 2026 (after the photo-share hole).
-- Every item was checked against its callers (app code, edge functions, cron,
-- other SQL functions) before changing access. Exposure needs BOTH a policy
-- that allows it AND a table/function grant; each item below had both.
-- Customer share tables (photo_share_links, completion_signoffs) are NOT here:
-- their open policies go with the release (migrations/pending/RELEASE_*.sql).

-- ── 1. SECURITY DEFINER functions any visitor could call ──────────────
-- These run with the owner's rights and check nothing. Proven callable by the
-- public key (get_auth_user_email_by_id → 200). get_auth_user_emails() handed
-- every user's email to anyone; others listed users with emails, switched off
-- the payment/follow-up crons, drove the AI and PDF queues, or deleted data.
-- None is called by the app: only by edge functions (service role), pg_cron
-- (owner) or other SECURITY DEFINER functions (owner rights) — unaffected.
do $$
declare r record;
begin
  for r in select p.oid::regprocedure sig from pg_proc p
           where p.pronamespace = 'public'::regnamespace and p.proname = any(array['_diag_notif_insert', 'check_ai_rate_limit', 'cleanup_ai_cache', 'cleanup_ai_queue', 'cleanup_cost_query_cache', 'cleanup_expired_cables_cache', 'cleanup_expired_circuit_design_cache', 'cleanup_expired_course_cache', 'cleanup_expired_course_dates_cache', 'cleanup_expired_design_exports', 'cleanup_expired_education_cache', 'cleanup_expired_guide_cache', 'cleanup_expired_installation_cache', 'cleanup_expired_market_insights_cache', 'cleanup_expired_materials_weekly_cache', 'cleanup_expired_oauth_states', 'cleanup_expired_phone_codes', 'cleanup_expired_pricing_data', 'cleanup_expired_rams_cache', 'cleanup_expired_temp_pdfs', 'cleanup_expired_tool_cache', 'cleanup_expired_tools_cache', 'cleanup_hs_query_cache', 'cleanup_pdf_queue', 'cleanup_rag_cache', 'complete_pdf_job', 'disable_failed_payments_cron', 'disable_quote_followup_cron', 'disable_task_cron_jobs', 'disable_xero_autosync_cron', 'enqueue_ai_request', 'fail_ai_job', 'fail_pdf_job', 'get_abandoned_checkout_users', 'get_auth_user_email_by_id', 'get_auth_user_emails', 'get_certificate_insights', 'get_chat_messages_with_upvote_status', 'get_lifetime_engagement', 'get_next_ai_job', 'get_next_pdf_job', 'get_unfinished_certificate_users', 'increment_outreach_counters', 'log_board_scan_analysis', 'lti_cleanup_expired', 'mark_quote_viewed', 'normalize_compliance_statuses', 'prune_practical_work_facets_to_8', 'reap_stuck_cost_engineer_jobs', 'recompute_contact_engagement', 'reconcile_cancel_survey_outcomes', 'record_email_open', 'record_training_correction', 'resolve_unmatched_store_cancel_reasons', 'setup_failed_payments_cron', 'setup_quote_followup_cron', 'setup_task_cron_jobs', 'time', 'with', 'zone,integer)'])
  loop
    execute format('revoke execute on function %s from public, anon, authenticated', r.sig);
    execute format('grant execute on function %s to service_role', r.sig);
  end loop;
end $$;

-- Called by the app for signed-in users only: no signed-out access.
do $$
declare r record;
begin
  for r in select p.oid::regprocedure sig from pg_proc p
           where p.pronamespace = 'public'::regnamespace and p.proname = any(array['get_available_peer_supporters', 'get_peer_supporter_by_id', 'trigger_materials_weekly_refresh', 'archive_old_accident_records', 'fn_check_price_alerts', 'prune_practical_work_to_8_archive', 'get_employer_apprentice_college_progress', 'get_employer_pending_otj_attestations'])
  loop
    execute format('revoke execute on function %s from public, anon', r.sig);
    execute format('grant execute on function %s to authenticated, service_role', r.sig);
  end loop;
end $$;

-- archive_old_accident_records(NULL) archived EVERY user's accident records
-- older than 3 years, and any user id could be passed. Now only the caller's.
create or replace function public.archive_old_accident_records(target_user_id uuid default null)
 returns integer
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  archived_count int;
  three_years_ago date := current_date - interval '3 years';
begin
  if auth.uid() is null or (target_user_id is not null and target_user_id <> auth.uid()) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
  update accident_records
     set is_archived = true, archived_at = now()
   where user_id = auth.uid()
     and incident_date < three_years_ago
     and is_archived = false;
  get diagnostics archived_count = row_count;
  return archived_count;
end;
$function$;

-- fn_check_price_alerts returned any user's alerts for any id passed.
CREATE OR REPLACE FUNCTION public.fn_check_price_alerts(p_user_id uuid)
 RETURNS TABLE(alert_id uuid, product_id uuid, product_name text, product_brand text, product_url text, image_url text, supplier_name text, current_price numeric, price_when_saved numeric, price_drop_pct numeric, savings numeric)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
AS $function$
BEGIN
  RETURN QUERY
  SELECT
    a.id AS alert_id,
    a.product_id,
    p.name AS product_name,
    p.brand::TEXT AS product_brand,
    p.product_url AS product_url,
    p.image_url AS image_url,
    s.name::TEXT AS supplier_name,
    p.current_price,
    a.price_when_saved,
    ROUND(((a.price_when_saved - p.current_price) / a.price_when_saved) * 100, 1) AS price_drop_pct,
    ROUND(a.price_when_saved - p.current_price, 2) AS savings
  FROM public.marketplace_price_alerts a
  JOIN public.marketplace_products p ON a.product_id = p.id
  JOIN public.marketplace_suppliers s ON p.supplier_id = s.id
  WHERE
    a.user_id = p_user_id
    -- Only your own alerts (any user id used to work).
    AND p_user_id = auth.uid()
    AND a.is_active = TRUE
    AND p.current_price IS NOT NULL
    AND p.current_price < a.price_when_saved
    AND (a.last_alerted_price IS NULL OR p.current_price < a.last_alerted_price);
END;
$function$;

-- prune_practical_work_to_8_archive deletes knowledge-base rows; admin console only.
CREATE OR REPLACE FUNCTION public.prune_practical_work_to_8_archive()
 RETURNS TABLE(total_facets_before bigint, total_facets_after bigint, facets_archived bigint, sources_affected bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  before_count BIGINT;
  after_count BIGINT;
  archived_count BIGINT;
  sources_count BIGINT;
BEGIN
  -- Admin console only: it deletes knowledge-base rows.
  PERFORM public._assert_is_admin();
  -- Count before
  SELECT COUNT(*) INTO before_count FROM practical_work_intelligence;
  
  -- Archive excess facets (rank 9+) from gold sources only
  WITH ranked_facets AS (
    SELECT 
      pwi.*,
      ROW_NUMBER() OVER (
        PARTITION BY pwi.practical_work_id 
        ORDER BY pwi.confidence_score DESC, pwi.created_at ASC
      ) AS rank
    FROM practical_work_intelligence pwi
    INNER JOIN practical_work pw ON pwi.practical_work_id = pw.id
    WHERE LENGTH(pw.content) >= 100 
      AND pw.content NOT ILIKE '%APPENDIX%'
  ),
  to_archive AS (
    SELECT * FROM ranked_facets WHERE rank > 8
  )
  INSERT INTO practical_work_intelligence_archive (
    id, practical_work_id, activity_types, equipment_category, 
    equipment_subcategory, facet_hash, confidence_score, 
    original_created_at, rank_at_archive, full_data
  )
  SELECT 
    id, practical_work_id, activity_types, equipment_category,
    equipment_subcategory, facet_hash, confidence_score,
    created_at, rank, row_to_json(to_archive.*)::jsonb
  FROM to_archive;
  
  GET DIAGNOSTICS archived_count = ROW_COUNT;
  
  -- Delete archived facets from main table
  WITH ranked_facets AS (
    SELECT 
      pwi.id,
      ROW_NUMBER() OVER (
        PARTITION BY pwi.practical_work_id 
        ORDER BY pwi.confidence_score DESC, pwi.created_at ASC
      ) AS rank
    FROM practical_work_intelligence pwi
    INNER JOIN practical_work pw ON pwi.practical_work_id = pw.id
    WHERE LENGTH(pw.content) >= 100 
      AND pw.content NOT ILIKE '%APPENDIX%'
  )
  DELETE FROM practical_work_intelligence
  WHERE id IN (SELECT id FROM ranked_facets WHERE rank > 8);
  
  -- Count after
  SELECT COUNT(*) INTO after_count FROM practical_work_intelligence;
  
  -- Count affected sources
  SELECT COUNT(DISTINCT practical_work_id) INTO sources_count 
  FROM practical_work_intelligence_archive;
  
  RETURN QUERY SELECT before_count, after_count, archived_count, sources_count;
END;
$function$;

-- ── 2. Policies ───────────────────────────────────────────────────────
-- AI caches readable by anyone. rams_semantic_cache: 298/312 rows carry a
-- site location, 301 assessor names, 23 phone numbers; circuit_design_cache_v4
-- job inputs carry addresses/clients. The app never reads any cache (edge
-- functions use the service role); these SELECT policies served no one.
do $$
declare r record;
begin
  for r in select tablename, policyname from pg_policies
           where schemaname = 'public' and cmd = 'SELECT' and qual = 'true'
             and roles && array['public','anon']::name[]
             and tablename = any(array['circuit_design_cache','circuit_design_cache_v3','circuit_design_cache_v4','circuit_level_cache','circuit_partial_cache','circuit_rag_cache','installation_method_cache','rams_partial_cache','rams_rag_cache','rams_semantic_cache'])
  loop
    execute format('drop policy %I on public.%I', r.policyname, r.tablename);
  end loop;
end $$;

-- quote_email_events: two INSERT policies WITH CHECK (true) let anyone forge
-- opens/clicks on any quote. Writers are edge functions (service role) and
-- send-quote-reminder (as the quote's owner).
do $$
declare r record;
begin
  for r in select policyname from pg_policies
           where schemaname='public' and tablename='quote_email_events' and cmd='INSERT' and with_check='true'
  loop execute format('drop policy %I on public.quote_email_events', r.policyname); end loop;
end $$;
create policy "Owners log events on their own quotes" on public.quote_email_events
  for insert to authenticated
  with check (exists (select 1 from public.quotes q where q.id = quote_id and q.user_id = (select auth.uid())));

-- user_consents: INSERT WITH CHECK (true) let anyone write consent records
-- for ANY user. Sign-up writes them before the account exists (user_id null)
-- or as the new user.
do $$
declare r record;
begin
  for r in select policyname from pg_policies
           where schemaname='public' and tablename='user_consents' and cmd='INSERT' and with_check='true'
  loop execute format('drop policy %I on public.user_consents', r.policyname); end loop;
end $$;
create policy "Consent is recorded for yourself or before sign-in" on public.user_consents
  for insert to anon, authenticated
  with check (user_id is null or user_id = (select auth.uid()));

-- elec_id_training_requests: "Workers can view and respond to training
-- requests" (FOR ALL, every role) only checked that the worker profile
-- EXISTS, so anyone could read, change or delete every request. Now the
-- worker must be the signed-in user.
drop policy if exists "Workers can view and respond to training requests" on public.elec_id_training_requests;
create policy "Workers can view and respond to training requests" on public.elec_id_training_requests
  for all to authenticated
  using (exists (
    select 1 from public.employer_elec_id_profiles p
    join public.employer_employees e on e.id = p.employee_id
    where p.id = elec_id_training_requests.worker_profile_id and e.user_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.employer_elec_id_profiles p
    join public.employer_employees e on e.id = p.employee_id
    where p.id = elec_id_training_requests.worker_profile_id and e.user_id = (select auth.uid())
  ));

-- install_planner_results: anyone could list every row with share_enabled
-- (no token condition). Nothing in the app or edge functions reads this table
-- (checked 7 Oct 2026; 0 rows), so the open policy is simply removed.
do $$
declare r record;
begin
  for r in select policyname from pg_policies
           where schemaname='public' and tablename='install_planner_results' and cmd='SELECT'
             and roles && array['public','anon']::name[] and qual ilike '%share_enabled%'
  loop execute format('drop policy %I on public.install_planner_results', r.policyname); end loop;
end $$;

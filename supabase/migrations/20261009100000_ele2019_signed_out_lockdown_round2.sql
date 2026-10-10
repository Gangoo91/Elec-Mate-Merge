-- ELE-2019 round 2 (9 Oct): what signed-out visitors (the public app key) could
-- still read, write or call after 20261006147000 / 148000.
--
-- SAFE NOW: every reader of what this closes is a service-role edge function,
-- a signed-in screen, or a SECURITY DEFINER token RPC. Checked against HEAD
-- (web) and c4b438a06 (iOS build 49, the native bundle live users run).
--
-- Held for release (supabase/release-held/20261009102000_*): the referral_codes
-- open read (iOS build 49 sign-up still reads it signed-out) and the
-- push_notification_log insert (iOS build 49 college batch send still writes it).

-- ─── 1. Tables with RLS switched OFF: anyone could read, write and delete ───
-- 43,860 rows of customer activity (names, actions) in a one-off backup copy.
-- Nothing reads it (types.ts only).
alter table public.customer_activity_log_dupe_backup_20260830 enable row level security;
revoke all on public.customer_activity_log_dupe_backup_20260830 from anon, authenticated;

-- Safety RAG ingest tables: no reader anywhere (types.ts only).
alter table public.safety_facets_chunks enable row level security;
alter table public.safety_facets_ingest_queue enable row level security;
revoke insert, update, delete on public.safety_facets_chunks, public.safety_facets_ingest_queue
  from anon, authenticated;

-- Board-scanner manufacturer knowledge: read and written only by the
-- service-role functions board-read-enhanced, analyze-corrections and
-- update-manufacturer-knowledge.
alter table public.board_manufacturer_knowledge enable row level security;
revoke insert, update, delete on public.board_manufacturer_knowledge from anon, authenticated;

-- Weekly jobs cache: the job-vacancies hook reads it (keep that, signed in or
-- not); only jobs-weekly-refresh (service role) writes it.
alter table public.jobs_weekly_cache enable row level security;
drop policy if exists "Anyone can read the weekly jobs cache" on public.jobs_weekly_cache;
create policy "Anyone can read the weekly jobs cache"
  on public.jobs_weekly_cache for select to anon, authenticated using (true);
revoke insert, update, delete on public.jobs_weekly_cache from anon, authenticated;

-- ─── 2. The BS 7671 RAG: two tables were still open to the web ───
-- bs7671_embeddings (2,557 rows of regulation text) and bs7671_known_reg_numbers.
-- Readers: service-role edge functions (rag-retrieval, circuit-rag,
-- bs7671-citation-verifier, designer agents, enrichment) and the signed-in
-- admin consoles. Signed-in users keep read, matching the other bs7671_* tables.
drop policy if exists "Public read access for BS 7671 embeddings" on public.bs7671_embeddings;
drop policy if exists "Signed-in users read BS 7671 embeddings" on public.bs7671_embeddings;
create policy "Signed-in users read BS 7671 embeddings"
  on public.bs7671_embeddings for select to authenticated using (true);

drop policy if exists "anyone can read known reg numbers" on public.bs7671_known_reg_numbers;
drop policy if exists "Signed-in users read known reg numbers" on public.bs7671_known_reg_numbers;
create policy "Signed-in users read known reg numbers"
  on public.bs7671_known_reg_numbers for select to authenticated using (true);

-- regulations_intelligence: 47,588 rows derived from BS 7671. Same readers
-- (service-role RAG + signed-in admin consoles).
drop policy if exists "Public read access for regulations intelligence" on public.regulations_intelligence;
drop policy if exists "Signed-in users read regulations intelligence" on public.regulations_intelligence;
create policy "Signed-in users read regulations intelligence"
  on public.regulations_intelligence for select to authenticated using (true);

-- ─── 3. Scope share links: every link (client names, scope, signatures) listable ───
-- The public page has used get_scope_share_by_token / sign_scope_share since
-- 21a50d6f2 (web). The owner keeps "Users manage own scope share links"; the
-- edge functions (send-scope-email, scope-signed-webhook, email-open) use the
-- service role.
drop policy if exists "Public read scope share links by token" on public.scope_share_links;

-- ─── 4. Internal pipeline / ops tables open to the web ───
-- No client reader (types.ts only); writers are service-role.
drop policy if exists "Admins can view ingest logs" on public.pricing_ingest_log;   -- was `true`
drop policy if exists "Anyone can view pipeline runs" on public.pipeline_run_log;
drop policy if exists "Anyone can view scraper health" on public.scraper_health_logs;
drop policy if exists "Queue is publicly readable" on public.tools_scrape_queue;
drop policy if exists "anon_read_marketplace_scrape_jobs" on public.marketplace_scrape_jobs;

-- batch_jobs / batch_progress: read by the signed-in admin enrichment consoles.
drop policy if exists "Anyone can view batch jobs" on public.batch_jobs;
drop policy if exists "Admins view batch jobs" on public.batch_jobs;
create policy "Admins view batch jobs"
  on public.batch_jobs for select to authenticated using (public.is_admin());
drop policy if exists "Anyone can view batch progress" on public.batch_progress;
drop policy if exists "Admins view batch progress" on public.batch_progress;
create policy "Admins view batch progress"
  on public.batch_progress for select to authenticated using (public.is_admin());

-- Global chat: only the admin console reads it in the app today.
drop policy if exists "Anyone can view messages" on public.global_chat_messages;
drop policy if exists "Signed-in users view messages" on public.global_chat_messages;
create policy "Signed-in users view messages"
  on public.global_chat_messages for select to authenticated using (true);
drop policy if exists "Anyone can view comments" on public.global_chat_comments;
drop policy if exists "Signed-in users view comments" on public.global_chat_comments;
create policy "Signed-in users view comments"
  on public.global_chat_comments for select to authenticated using (true);

-- ─── 5. "Service role can insert" policies that were really for everyone ───
-- circuit_design_partials: only designer-agent-v3 (service role) writes; the
-- app reads its own rows.
drop policy if exists "Service role can insert circuit partials" on public.circuit_design_partials;

-- push_notification_log: anyone, signed out included, could drop a fake
-- notification into any user's bell. Signed-out is closed now; the signed-in
-- insert goes at release (iOS build 49's college batch send still writes it).
drop policy if exists "Service role can insert push log" on public.push_notification_log;
drop policy if exists "Signed-in users insert push log (release-held removal)" on public.push_notification_log;
create policy "Signed-in users insert push log (release-held removal)"
  on public.push_notification_log for insert to authenticated with check (true);

-- ─── 6. Owner-run (SECURITY DEFINER) views readable by the public key ───
-- Readers are service-role edge functions only (outreach-ingest-leads,
-- send-outreach-campaign, admin-mate-health, submit-benchmark-snapshot) or
-- nothing at all.
revoke all on public.outreach_leads_overview from anon, authenticated;
revoke all on public.seo_gsc_latest from anon, authenticated;
revoke all on public.scraper_health_summary from anon, authenticated;
revoke all on public.agent_tool_error_summary from anon, authenticated;
revoke all on public.agent_tool_error_summary_7d from anon, authenticated;
revoke all on public.national_benchmark_medians from anon, authenticated;
revoke all on public.v_portfolio_stats_by_college from anon;

-- ─── 7. soft_delete_report: a signed-out caller passed the owner check ───
-- `IF auth.uid() != p_user_id` is NULL (not true) when auth.uid() is NULL, so
-- the anon key could soft-delete any user's certificate given their user id
-- and report id. Proven 9 Oct: anon got 'not_found' (check passed) where a
-- stranger gets 'permission_denied'. The app calls it signed in only.
create or replace function public.soft_delete_report(p_user_id uuid, p_report_id text)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_id uuid;
  v_current_user_id uuid;
  v_deleted_at timestamptz;
begin
  v_current_user_id := auth.uid();

  -- Owner check. IS DISTINCT FROM so a signed-out (NULL) caller is refused too.
  if v_current_user_id is null or v_current_user_id is distinct from p_user_id then
    return jsonb_build_object(
      'success', false,
      'error', 'permission_denied',
      'message', 'You do not have permission to delete this report'
    );
  end if;

  select id, deleted_at into v_id, v_deleted_at
  from public.reports
  where report_id = p_report_id
    and user_id = p_user_id;

  if v_id is null then
    return jsonb_build_object(
      'success', false,
      'error', 'not_found',
      'message', 'Report not found or you do not have access to it'
    );
  end if;

  if v_deleted_at is not null then
    return jsonb_build_object(
      'success', true,
      'message', 'Report was already deleted',
      'already_deleted', true
    );
  end if;

  update public.reports
  set deleted_at = now(),
      updated_at = now()
  where id = v_id;

  return jsonb_build_object(
    'success', true,
    'message', 'Report deleted successfully',
    'report_id', p_report_id
  );
end;
$function$;

revoke execute on function public.soft_delete_report(uuid, text) from public, anon;
grant execute on function public.soft_delete_report(uuid, text) to authenticated, service_role;

-- ─── 8. TRUNCATE ───
-- Supabase's default grants gave anon TRUNCATE on 701 public tables and
-- authenticated on 742. PostgREST has no TRUNCATE verb, so this was not
-- reachable through the API, and RLS never applies to TRUNCATE. No function
-- truncates. Removed as hardening, including for future tables.
revoke truncate on all tables in schema public from anon, authenticated;
alter default privileges in schema public revoke truncate on tables from anon, authenticated;

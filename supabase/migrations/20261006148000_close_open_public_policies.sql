-- SECURITY sweep (6 Oct). Policies written "for the service role" but created
-- for role PUBLIC (which includes signed-out visitors). The service role
-- bypasses RLS anyway, so these policies did nothing for it — they only opened
-- the tables to everyone holding the public app key.
--
-- Verified with the public key before the fix (count-only reads, and an UPDATE
-- matching zero rows to prove write access without changing anything):
--   bs7671_* (regulations RAG)     readable AND writable by signed-out visitors
--   failed_payment_emails          265 rows readable, writable
--   email_tracking_events          53,148 rows readable, writable
--   business_ai_waitlist           16 rows readable
--   accounting_oauth_states        121 rows readable
--   user_presence                  2,166 rows readable
--   health_checks, oauth_states, agent_* readable and/or writable
--
-- Every replacement below keeps what real users and admins already had.
-- Edge functions that touch these tables were checked: each uses the service
-- role for the access these policies pretended to grant.

-- Regulations RAG: "Admin write" + "Authenticated read" already exist.
drop policy if exists "Service all bs7671_chunks" on public.bs7671_chunks;
drop policy if exists "Service all bs7671_chunks_staging" on public.bs7671_chunks_staging;
drop policy if exists "Service all bs7671_cross_refs" on public.bs7671_cross_refs;
drop policy if exists "Service all bs7671_editions" on public.bs7671_editions;
drop policy if exists "Service all bs7671_facet_failures" on public.bs7671_facet_failures;
drop policy if exists "Service all bs7671_facets" on public.bs7671_facets;
drop policy if exists "Service all bs7671_figures" on public.bs7671_figures;
drop policy if exists "Service all bs7671_ingest_jobs" on public.bs7671_ingest_jobs;
drop policy if exists "Service all bs7671_page_summaries" on public.bs7671_page_summaries;
drop policy if exists "Service all bs7671_regulations" on public.bs7671_regulations;
drop policy if exists "Service all bs7671_tables" on public.bs7671_tables;

-- Payments: owner read + admin read already exist; admin actions run in edge functions.
drop policy if exists "Service role full access on failed_payment_emails" on public.failed_payment_emails;

-- Email tracking: written and read only by edge functions (service role).
drop policy if exists "Service role full access" on public.email_tracking_events;

-- Health checks: admin read already exists.
drop policy if exists "Service role full access on health_checks" on public.health_checks;

-- Waitlist: owner insert/select exist. join-waitlist UPSERTs as the user, and
-- the open policy was the only thing allowing the ON CONFLICT update.
drop policy if exists "Service role full access" on public.business_ai_waitlist;
drop policy if exists "Users can update their own waitlist entry" on public.business_ai_waitlist;
create policy "Users can update their own waitlist entry" on public.business_ai_waitlist
  for update to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Agent tables: no client access at all; edge functions use the service role.
drop policy if exists "Admins can manage incidents" on public.agent_incidents;
drop policy if exists "Admins can manage workspace versions" on public.agent_workspace_versions;
drop policy if exists "Service role can insert usage" on public.agent_usage;
drop policy if exists "Service role can update usage" on public.agent_usage;

-- OAuth state: callbacks read with the service role. Users keep their own rows.
drop policy if exists "Anyone can read accounting oauth states" on public.accounting_oauth_states;
drop policy if exists "Users can read own accounting oauth states" on public.accounting_oauth_states;
create policy "Users can read own accounting oauth states" on public.accounting_oauth_states
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Callback can read state (anon allowed)" on public.oauth_states;

-- Presence: your own row, and Elec-Mate admins (Admin dashboards).
drop policy if exists "Users can view presence" on public.user_presence;
drop policy if exists "Users read own presence" on public.user_presence;
create policy "Users read own presence" on public.user_presence
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Admins read presence" on public.user_presence;
create policy "Admins read presence" on public.user_presence
  for select to authenticated
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.admin_role is not null));

-- Promo codes: only admin pages read the table; sign-up uses describe-offer
-- and create-checkout (service role). Admin read/insert/update policies exist.
drop policy if exists "Public can validate offer codes" on public.promo_offers;

-- Peer supporters: signed-in users looking for support, not the open web.
drop policy if exists "Anyone can view available supporters" on public.mental_health_peer_supporters;
drop policy if exists "Signed-in users view available supporters" on public.mental_health_peer_supporters;
create policy "Signed-in users view available supporters" on public.mental_health_peer_supporters
  for select to authenticated using (is_available = true and is_active = true);

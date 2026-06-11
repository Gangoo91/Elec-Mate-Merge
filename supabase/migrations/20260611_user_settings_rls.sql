-- ============================================================================
-- Security — enable RLS on public.user_settings (advisor ERROR: rls_disabled).
--
-- user_settings is a per-user key/value store (user_id, key, value) but had RLS
-- DISABLED and zero policies, so any authenticated request could read or write
-- every user's settings. Scope it to the owner.
--
-- Safe — verified the only consumers are:
--   * PrivacyTab (client) — reads/upserts its OWN row (user_id = current user).
--   * user-data-export edge fn — uses the service_role admin client, which
--     bypasses RLS, so GDPR export is unaffected.
--
-- Rollback at the bottom.
-- ============================================================================

alter table public.user_settings enable row level security;

create policy "user_settings: owner select" on public.user_settings
  for select to authenticated using (user_id = (select auth.uid()));

create policy "user_settings: owner insert" on public.user_settings
  for insert to authenticated with check (user_id = (select auth.uid()));

create policy "user_settings: owner update" on public.user_settings
  for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "user_settings: owner delete" on public.user_settings
  for delete to authenticated using (user_id = (select auth.uid()));

-- ============================================================================
-- ROLLBACK:
--   drop policy if exists "user_settings: owner select" on public.user_settings;
--   drop policy if exists "user_settings: owner insert" on public.user_settings;
--   drop policy if exists "user_settings: owner update" on public.user_settings;
--   drop policy if exists "user_settings: owner delete" on public.user_settings;
--   alter table public.user_settings disable row level security;
-- ============================================================================

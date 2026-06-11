-- ============================================================================
-- Employer settings spine — Slice 0
--
-- 1. company_profiles gains office_address + notification_email so ALL
--    employer company settings live per-account (same table electricians use)
-- 2. app_settings becomes what it really is: platform config —
--    reads limited to rows marked is_public (admin/service write unchanged);
--    the broad "any user reads everything" policies are dropped
-- 3. Secrets and per-company keys evacuated from app_settings
--    (elevenlabs_api_key moved to vault separately — NOT in this file)
--
-- Rollback: drop the two columns and recreate the dropped read policies
-- (definitions were dashboard-created, recorded here for real rollback):
--   create policy "Users can read app settings" on public.app_settings
--     for select using (true);
--   create policy "Authenticated users can read settings" on public.app_settings
--     for select using (auth.role() = 'authenticated');
--   update public.app_settings set is_public = false
--    where key in ('maintenance_message','trial_days','max_file_upload_mb');
-- ============================================================================

alter table public.company_profiles
  add column if not exists office_address text,
  add column if not exists notification_email text;

-- Reads: only rows explicitly marked public
drop policy if exists "Users can read app settings" on public.app_settings;
drop policy if exists "Authenticated users can read settings" on public.app_settings;
-- (kept: "Public settings readable" is_public=true, "Admins can manage settings",
--  "Service role can manage settings")

-- Platform config clients legitimately read
update public.app_settings set is_public = true
 where key in ('maintenance_message', 'trial_days', 'max_file_upload_mb');

-- Per-company keys never belonged here (all empty — verified before delete),
-- and the ElevenLabs credentials now live in vault
delete from public.app_settings
 where key in (
   'elevenlabs_api_key', 'elevenlabs_agent_id',
   'company_name', 'company_address', 'company_phone', 'company_email',
   'company_number', 'company_vat_number', 'company_website',
   'bank_account_name', 'bank_sort_code', 'bank_account_number',
   'brand_primary_color', 'brand_secondary_color', 'company_logo_url',
   'business_notification_email', 'office_lat', 'office_lng', 'office_address'
 );

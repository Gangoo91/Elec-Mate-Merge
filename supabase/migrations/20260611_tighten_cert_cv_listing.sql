-- ============================================================================
-- Storage — stop cross-user enumeration of certificates / CV documents.
--
-- Both buckets had a wide-open SELECT policy ("Authenticated can view
-- certificates" / "Authenticated can read CV documents" = bucket_id only, no
-- owner check), so ANY authenticated user could enumerate every other user's
-- certificate and CV inventory via the storage API. These are PII.
--
-- Safe to drop because:
--   * Owner-scoped SELECT policies already exist (foldername[1] = auth.uid()),
--     so users still see their own.
--   * Both buckets are PUBLIC, so share-link DOWNLOADS bypass RLS entirely and
--     are unaffected (the design the certificates feature relies on).
--   * No flow lists another user's folder: certificatePdfExists() has no callers,
--     and no employer/worker flow reads employees' cert/CV files.
--
-- This only removes an unused over-permission; nothing in the app reads across
-- users. Rollback at the bottom.
-- ============================================================================

drop policy if exists "Authenticated can view certificates" on storage.objects;
drop policy if exists "Authenticated can read CV documents" on storage.objects;

-- ============================================================================
-- ROLLBACK:
--   create policy "Authenticated can view certificates" on storage.objects
--     for select to authenticated using (bucket_id = 'certificates');
--   create policy "Authenticated can read CV documents" on storage.objects
--     for select to authenticated using (bucket_id = 'cv-documents');
-- ============================================================================

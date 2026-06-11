-- ============================================================================
-- APPLIED 2026-06-11 (after the signed-URL display code was deployed). Kept in
-- history for reproducibility; already recorded, so a re-run is a no-op on prod.
--
-- This flips portfolio-evidence + evidence-files from PUBLIC to PRIVATE and
-- scopes read access. It will 403 every stored public URL — which is exactly
-- why the app must first ship the evidence-URL resolver (src/lib/evidenceUrl.ts
-- + <EvidenceImage>) so display sites serve signed URLs. Once that build is
-- deployed, apply this; the UI is unaffected (it already signs), and the world
-- can no longer read learner evidence by guessing URLs.
--
-- Findings that made this safe + minimal:
--   * Object paths are uniformly `<owner_uid>/<file>`  -> owner check is foldername[1].
--   * The INSERT/UPDATE/DELETE policies are ALREADY owner-scoped — only the two
--     SELECT policies are wide open ("bucket_id = ..."), so we replace just those.
--   * evidence-files is currently empty; portfolio-evidence holds the live data.
-- ============================================================================

-- ---- portfolio-evidence: owner OR same-college staff may read --------------
drop policy if exists "Authenticated can view portfolio evidence" on storage.objects;

create policy "portfolio-evidence: owner or same-college staff read"
on storage.objects for select to authenticated
using (
  bucket_id = 'portfolio-evidence'
  and (
    (storage.foldername(name))[1] = (select auth.uid())::text
    or exists (
      select 1 from public.college_students cs
      where cs.user_id::text = (storage.foldername(name))[1]
        and public._ch_same_college(cs.college_id)
    )
  )
);

-- ---- evidence-files: owner only (empty bucket; no cross-college consumer) --
drop policy if exists "Authenticated can view evidence files" on storage.objects;

create policy "evidence-files: owner read"
on storage.objects for select to authenticated
using (
  bucket_id = 'evidence-files'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

-- ---- Flip the buckets private (public-URL downloads now 403) ---------------
update storage.buckets set public = false where id in ('portfolio-evidence', 'evidence-files');

-- ============================================================================
-- ROLLBACK (re-open if the deployed code can't sign for some reason):
--   update storage.buckets set public = true where id in ('portfolio-evidence','evidence-files');
--   drop policy if exists "portfolio-evidence: owner or same-college staff read" on storage.objects;
--   drop policy if exists "evidence-files: owner read" on storage.objects;
--   create policy "Authenticated can view portfolio evidence" on storage.objects
--     for select to authenticated using (bucket_id = 'portfolio-evidence');
--   create policy "Authenticated can view evidence files" on storage.objects
--     for select to authenticated using (bucket_id = 'evidence-files');
-- ============================================================================

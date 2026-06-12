-- ============================================================================
-- Storage — re-open portfolio-evidence to public (deliberate product decision).
--
-- The supervisor-verification flow (/verify-evidence/:token) is anonymous, no
-- login: an external supervisor opens a token link and must SEE the learner's
-- evidence photos to sign them off. Anonymous viewers cannot mint signed URLs,
-- so the bucket has to serve public-URL downloads. Portfolio evidence is
-- work-product that is *meant* to be shared for verification, so public is the
-- right trade-off here (Andrew's call, 2026-06-11). The earlier lockdown flip
-- broke this flow.
--
-- evidence-files stays PRIVATE (empty bucket, no anonymous consumer).
-- The owner / same-college-staff SELECT policy added during the lockdown is kept
-- — it scopes the authenticated storage API; public-URL downloads bypass RLS and
-- are what the supervisor page relies on.
--
-- Rollback: update storage.buckets set public = false where id = 'portfolio-evidence';
-- ============================================================================

update storage.buckets set public = true where id = 'portfolio-evidence';

-- Site Safety photos: stop any signed-in user listing or reading everyone's files.
--
-- Two bucket-wide SELECT policies let ANY authenticated user list and read every
-- object in the bucket — including accident and injury photos:
--   "Authenticated can view safety photos"  (safety-photos)
--   "authenticated read briefing-photos"    (briefing-photos)
-- Both buckets already have owner-folder SELECT policies, and every object in
-- both sits in its owner's folder (checked 6 Oct 2026: 283 / 283 and 9 / 9), so
-- owners keep full access. Nothing in the app reads another user's files in
-- these buckets: safety-photos is served by public URL (unaffected — the public
-- endpoint does not consult RLS; paths are unguessable once listing is gone),
-- and briefing-photos signed URLs are only created by the owner.
--
-- Deliberately NOT changed: "authenticated read briefings" — that bucket holds
-- signatures uploaded by workers and viewed by their employer (Employer Hub).
--
-- Follow-up (not here): make safety-photos private and serve signed URLs; that
-- needs every reader (app + PDF functions) moved off getPublicUrl first.

drop policy if exists "Authenticated can view safety photos" on storage.objects;
drop policy if exists "authenticated read briefing-photos" on storage.objects;

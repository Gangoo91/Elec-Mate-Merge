-- inspection-photos: "Users can view inspection photos" let ANY signed-in user
-- list every user's 1,365 certificate photos (bucket-wide SELECT). The app
-- shows them by public URL (the bucket is public) and never lists or signs, so
-- read is scoped to the caller's own files — their folder, or files they
-- uploaded (46 sit under a shared emergency-lighting/ folder). Delete/upsert
-- still work: they need SELECT on the caller's own object, which this keeps.
drop policy if exists "Users can view inspection photos" on storage.objects;
create policy "Users can view their own inspection photos"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'inspection-photos'
    and (owner = (select auth.uid()) or (storage.foldername(name))[1] = (select auth.uid())::text)
  );

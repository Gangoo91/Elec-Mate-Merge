-- safety-documents (private, 20261006170000) let owners READ their PDFs but
-- not DELETE them, so a deleted accident record's PDF — injury details —
-- would stay in storage for ever. Owners may now delete their own folder.
drop policy if exists "Owners delete their safety documents" on storage.objects;
create policy "Owners delete their safety documents"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'safety-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);

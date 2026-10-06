-- Review finding (6 Oct). Photo uploads upsert. "Manage own employee photos"
-- only covers the original uploader, so a manager replacing a photo the owner
-- uploaded (or vice versa) failed on the UPDATE half of the upsert.
drop policy if exists "Firm updates employee photos" on storage.objects;
create policy "Firm updates employee photos" on storage.objects
  for update to authenticated
  using (bucket_id = 'employee-photos' and public.can_write_employee_photo(name))
  with check (bucket_id = 'employee-photos' and public.can_write_employee_photo(name));

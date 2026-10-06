-- Site Safety PDFs: the bucket generate-safety-record-pdf has always uploaded to
-- did not exist. Every upload failed and the function fell back to returning
-- the PDF inline, so no safety record ever had a stored copy and briefings kept
-- only PDFMonkey's download link, which expires after 7 days.
--
-- PRIVATE: these include accident and injury records. The function stores the
-- object path in <table>.pdf_url and hands out short-lived signed URLs.
-- Owners may read their own folder (<user id>/...); the function writes with
-- the service role.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('safety-documents', 'safety-documents', false, 52428800, array['application/pdf'])
on conflict (id) do nothing;

drop policy if exists "Owners read their safety documents" on storage.objects;
create policy "Owners read their safety documents"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'safety-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);

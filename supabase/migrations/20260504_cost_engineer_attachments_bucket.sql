-- Cost Engineer attachments storage bucket.
-- Users upload floor plans (images), specifications (PDFs) and other job
-- documents for the Cost Engineer to read alongside their description.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cost-engineer-attachments',
  'cost-engineer-attachments',
  false,
  52428800, -- 50 MB
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif',
    'application/pdf'
  ]
)
ON CONFLICT (id) DO UPDATE
  SET file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

-- User-scoped path: cost-engineer-attachments/{user_id}/...
DROP POLICY IF EXISTS "Users manage own cost engineer attachments" ON storage.objects;
CREATE POLICY "Users manage own cost engineer attachments"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'cost-engineer-attachments'
    AND (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'cost-engineer-attachments'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

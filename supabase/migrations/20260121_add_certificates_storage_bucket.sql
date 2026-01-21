-- Create storage bucket for permanent certificate PDFs
-- PDFMonkey URLs expire after 7 days, so we save PDFs to Supabase Storage for permanent access
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'certificates',
  'certificates',
  true,  -- Public for getPublicUrl() to work
  52428800, -- 50MB limit per file (some certificates with photos can be large)
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS policies for certificates bucket
-- Users can only upload to their own folder (user_id/filename)
CREATE POLICY "Users can upload their own certificates"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'certificates' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can view their own certificates
CREATE POLICY "Users can view their own certificates"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'certificates' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Public can view certificates (needed for public URLs and sharing)
CREATE POLICY "Public can view certificates"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'certificates');

-- Users can update their own certificates
CREATE POLICY "Users can update their own certificates"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'certificates' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can delete their own certificates
CREATE POLICY "Users can delete their own certificates"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'certificates' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Add storage_path column to reports table for referencing stored PDFs
ALTER TABLE public.reports
ADD COLUMN IF NOT EXISTS storage_path TEXT;

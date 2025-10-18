-- Create storage bucket for RAMS PDFs
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'rams-pdfs',
  'rams-pdfs',
  false,
  10485760, -- 10MB limit
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects for rams-pdfs bucket
CREATE POLICY "Users can upload their own RAMS PDFs"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'rams-pdfs' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own RAMS PDFs"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'rams-pdfs' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own RAMS PDFs"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'rams-pdfs' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Add pdf_url column to rams_documents if not exists
ALTER TABLE public.rams_documents 
ADD COLUMN IF NOT EXISTS pdf_url TEXT;
-- Create temp-pdfs storage bucket for temporary PDF links
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'temp-pdfs', 
  'temp-pdfs', 
  true,
  10485760, -- 10MB limit
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- RLS policy for authenticated users to upload their own temp PDFs
CREATE POLICY "Users can upload their own temp PDFs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'temp-pdfs' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- RLS policy for public read access to temp PDFs
CREATE POLICY "Temp PDFs are publicly readable"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'temp-pdfs');

-- RLS policy for users to delete their own temp PDFs
CREATE POLICY "Users can delete their own temp PDFs"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'temp-pdfs' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Function to cleanup expired temp PDFs (older than 7 days)
CREATE OR REPLACE FUNCTION cleanup_expired_temp_pdfs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public', 'storage'
AS $$
BEGIN
  DELETE FROM storage.objects
  WHERE bucket_id = 'temp-pdfs'
    AND created_at < NOW() - INTERVAL '7 days';
END;
$$;

-- Comment explaining the cleanup function
COMMENT ON FUNCTION cleanup_expired_temp_pdfs() IS 
'Deletes temporary PDF files older than 7 days from the temp-pdfs bucket. Should be called by a cron job.';
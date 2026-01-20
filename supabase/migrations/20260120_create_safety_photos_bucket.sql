-- Create storage bucket for safety photos
-- This bucket was missing, causing "violates security" errors on upload
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'safety-photos',
  'safety-photos',
  true,  -- Public for getPublicUrl() to work
  10485760, -- 10MB limit per file
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS policies for safety-photos bucket
-- Users can only upload to their own folder (user_id/filename)
CREATE POLICY "Users can upload their own safety photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'safety-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can view their own safety photos
CREATE POLICY "Users can view their own safety photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'safety-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Public can view safety photos (needed for public URLs)
CREATE POLICY "Public can view safety photos"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'safety-photos');

-- Users can update their own safety photos
CREATE POLICY "Users can update their own safety photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'safety-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can delete their own safety photos
CREATE POLICY "Users can delete their own safety photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'safety-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

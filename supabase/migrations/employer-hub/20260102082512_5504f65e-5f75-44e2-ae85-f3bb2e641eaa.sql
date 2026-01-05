-- Create storage bucket for employee photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('employee-photos', 'employee-photos', true);

-- Allow public read access
CREATE POLICY "Public read access for employee photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'employee-photos');

-- Allow anyone to upload employee photos
CREATE POLICY "Anyone can upload employee photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'employee-photos');

-- Allow anyone to update employee photos
CREATE POLICY "Anyone can update employee photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'employee-photos');

-- Allow anyone to delete employee photos
CREATE POLICY "Anyone can delete employee photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'employee-photos');
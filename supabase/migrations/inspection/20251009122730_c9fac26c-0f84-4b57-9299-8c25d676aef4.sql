-- Create inspection_photos table
CREATE TABLE IF NOT EXISTS public.inspection_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('eicr', 'eic')),
  item_id TEXT NOT NULL,
  file_path TEXT NOT NULL,
  thumbnail_path TEXT,
  ai_analysis JSONB,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.inspection_photos ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own inspection photos"
  ON public.inspection_photos
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own inspection photos"
  ON public.inspection_photos
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own inspection photos"
  ON public.inspection_photos
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own inspection photos"
  ON public.inspection_photos
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create storage bucket for inspection photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('inspection-photos', 'inspection-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for inspection-photos bucket
CREATE POLICY "Users can view inspection photos"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'inspection-photos');

CREATE POLICY "Users can upload their own inspection photos"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'inspection-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own inspection photos"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'inspection-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own inspection photos"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'inspection-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create index for better query performance
CREATE INDEX idx_inspection_photos_report ON public.inspection_photos(report_id, report_type);
CREATE INDEX idx_inspection_photos_user ON public.inspection_photos(user_id);

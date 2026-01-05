-- Add versioning columns to reports table
ALTER TABLE public.reports 
ADD COLUMN IF NOT EXISTS version INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS parent_report_id UUID REFERENCES public.reports(id),
ADD COLUMN IF NOT EXISTS is_latest_version BOOLEAN DEFAULT true;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_reports_parent_version ON public.reports(parent_report_id, version);
CREATE INDEX IF NOT EXISTS idx_reports_latest_version ON public.reports(is_latest_version) WHERE is_latest_version = true;

-- Create storage bucket for PDF certificates
INSERT INTO storage.buckets (id, name, public) 
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for certificates bucket
CREATE POLICY "Users can view own certificates"
ON storage.objects FOR SELECT
USING (bucket_id = 'certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload own certificates"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own certificates"
ON storage.objects FOR UPDATE
USING (bucket_id = 'certificates' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own certificates"
ON storage.objects FOR DELETE
USING (bucket_id = 'certificates' AND auth.uid()::text = (storage.foldername(name))[1]);
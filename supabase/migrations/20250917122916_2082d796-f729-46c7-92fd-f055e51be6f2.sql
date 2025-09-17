-- Create storage bucket for CPD evidence files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cpd-evidence', 'cpd-evidence', false);

-- Create storage policies for CPD evidence files
CREATE POLICY "Users can upload their own CPD evidence" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'cpd-evidence' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own CPD evidence" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'cpd-evidence' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own CPD evidence" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'cpd-evidence' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own CPD evidence" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'cpd-evidence' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Add evidence_files column to enhanced_cpd_entries table
ALTER TABLE public.enhanced_cpd_entries 
ADD COLUMN evidence_files jsonb DEFAULT '[]'::jsonb;
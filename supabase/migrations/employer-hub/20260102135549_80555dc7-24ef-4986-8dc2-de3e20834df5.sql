-- Create job_pack_documents table for storing attached documents
CREATE TABLE public.job_pack_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_pack_id UUID NOT NULL REFERENCES public.job_packs(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL DEFAULT 'Other',
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  is_required BOOLEAN DEFAULT true,
  generated_by TEXT DEFAULT 'Manual',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create job_pack_acknowledgements table for tracking worker acknowledgements
CREATE TABLE public.job_pack_acknowledgements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_pack_id UUID NOT NULL REFERENCES public.job_packs(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  acknowledged_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  signature_data TEXT,
  device_info TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(job_pack_id, employee_id)
);

-- Add new columns to job_packs table
ALTER TABLE public.job_packs 
ADD COLUMN IF NOT EXISTS sent_to_workers_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS briefing_content TEXT,
ADD COLUMN IF NOT EXISTS required_certifications TEXT[] DEFAULT '{}';

-- Enable RLS on new tables
ALTER TABLE public.job_pack_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_pack_acknowledgements ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for job_pack_documents
CREATE POLICY "Allow all access to job_pack_documents"
ON public.job_pack_documents
FOR ALL
USING (true)
WITH CHECK (true);

-- Create RLS policies for job_pack_acknowledgements
CREATE POLICY "Allow all access to job_pack_acknowledgements"
ON public.job_pack_acknowledgements
FOR ALL
USING (true)
WITH CHECK (true);

-- Create updated_at trigger for job_pack_documents
CREATE TRIGGER update_job_pack_documents_updated_at
BEFORE UPDATE ON public.job_pack_documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for job pack documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('job-pack-documents', 'job-pack-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for job-pack-documents bucket
CREATE POLICY "Allow public read access to job pack documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'job-pack-documents');

CREATE POLICY "Allow authenticated upload to job pack documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'job-pack-documents');

CREATE POLICY "Allow authenticated update to job pack documents"
ON storage.objects FOR UPDATE
USING (bucket_id = 'job-pack-documents');

CREATE POLICY "Allow authenticated delete from job pack documents"
ON storage.objects FOR DELETE
USING (bucket_id = 'job-pack-documents');
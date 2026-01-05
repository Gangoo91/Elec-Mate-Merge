-- Create job_packs table for job documentation management
CREATE TABLE public.job_packs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  client text NOT NULL,
  location text NOT NULL,
  scope text,
  hazards text[] DEFAULT '{}',
  assigned_workers uuid[] DEFAULT '{}',
  status text DEFAULT 'Draft',
  rams_generated boolean DEFAULT false,
  method_statement_generated boolean DEFAULT false,
  briefing_pack_generated boolean DEFAULT false,
  start_date date,
  estimated_value numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_packs ENABLE ROW LEVEL SECURITY;

-- Create policy for all access (development mode)
CREATE POLICY "Allow all access to job_packs" 
ON public.job_packs 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create trigger function for job_packs updated_at
CREATE OR REPLACE FUNCTION public.update_job_packs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for updated_at
CREATE TRIGGER update_job_packs_updated_at
BEFORE UPDATE ON public.job_packs
FOR EACH ROW
EXECUTE FUNCTION public.update_job_packs_updated_at();
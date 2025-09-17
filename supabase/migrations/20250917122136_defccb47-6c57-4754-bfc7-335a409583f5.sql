-- Create CPD entries table
CREATE TABLE IF NOT EXISTS public.cpd_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  professional_body_id UUID REFERENCES public.professional_bodies(id),
  title TEXT NOT NULL,
  description TEXT,
  activity_type TEXT NOT NULL,
  category TEXT NOT NULL,
  hours NUMERIC NOT NULL,
  date_completed DATE NOT NULL,
  learning_outcomes TEXT[],
  evidence_files JSONB DEFAULT '[]'::jsonb,
  verification_status TEXT DEFAULT 'pending',
  is_verified BOOLEAN DEFAULT false,
  verified_by UUID,
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for CPD entries
ALTER TABLE public.cpd_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for CPD entries
CREATE POLICY "Users can manage their own CPD entries"
  ON public.cpd_entries
  FOR ALL
  USING (auth.uid() = user_id);

-- Create CPD evidence files table
CREATE TABLE IF NOT EXISTS public.cpd_evidence_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cpd_entry_id UUID NOT NULL REFERENCES public.cpd_entries(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ocr_text TEXT,
  verification_status TEXT DEFAULT 'pending'
);

-- Enable RLS for CPD evidence files
ALTER TABLE public.cpd_evidence_files ENABLE ROW LEVEL SECURITY;

-- Create policies for CPD evidence files
CREATE POLICY "Users can manage their own CPD evidence files"
  ON public.cpd_evidence_files
  FOR ALL
  USING (auth.uid() = user_id);

-- Create professional bodies table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.professional_bodies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  annual_cpd_hours INTEGER NOT NULL DEFAULT 30,
  renewal_period_months INTEGER NOT NULL DEFAULT 12,
  website_url TEXT,
  categories JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for professional bodies (publicly readable)
ALTER TABLE public.professional_bodies ENABLE ROW LEVEL SECURITY;

-- Create policy for professional bodies
CREATE POLICY "Professional bodies are publicly readable"
  ON public.professional_bodies
  FOR SELECT
  USING (true);

-- Insert default professional bodies for UK electricians
INSERT INTO public.professional_bodies (name, code, description, annual_cpd_hours, categories) VALUES
  ('NICEIC', 'NICEIC', 'National Inspection Council for Electrical Installation Contracting', 30, '[
    {"id": "technical-skills", "name": "Technical Skills", "min_hours": 10},
    {"id": "regulations-standards", "name": "Regulations & Standards", "min_hours": 8},
    {"id": "safety-health", "name": "Safety & Health", "min_hours": 6},
    {"id": "business-commercial", "name": "Business & Commercial", "min_hours": 3},
    {"id": "professional-ethics", "name": "Professional Ethics", "min_hours": 3}
  ]'::jsonb),
  ('ECA', 'ECA', 'Electrical Contractors Association', 30, '[
    {"id": "technical-skills", "name": "Technical Skills", "min_hours": 12},
    {"id": "regulations-standards", "name": "Regulations & Standards", "min_hours": 8},
    {"id": "safety-health", "name": "Safety & Health", "min_hours": 5},
    {"id": "business-commercial", "name": "Business & Commercial", "min_hours": 5}
  ]'::jsonb),
  ('SELECT', 'SELECT', 'SELECT (Electrical Contractors)', 30, '[
    {"id": "technical-skills", "name": "Technical Skills", "min_hours": 10},
    {"id": "regulations-standards", "name": "Regulations & Standards", "min_hours": 10},
    {"id": "safety-health", "name": "Safety & Health", "min_hours": 5},
    {"id": "business-commercial", "name": "Business & Commercial", "min_hours": 5}
  ]'::jsonb),
  ('NAPIT', 'NAPIT', 'National Association of Professional Inspectors and Testers', 30, '[
    {"id": "technical-skills", "name": "Technical Skills", "min_hours": 12},
    {"id": "regulations-standards", "name": "Regulations & Standards", "min_hours": 8},
    {"id": "safety-health", "name": "Safety & Health", "min_hours": 6},
    {"id": "customer-service", "name": "Customer Service", "min_hours": 4}
  ]'::jsonb),
  ('STROMA', 'STROMA', 'STROMA Certification', 30, '[
    {"id": "technical-skills", "name": "Technical Skills", "min_hours": 10},
    {"id": "regulations-standards", "name": "Regulations & Standards", "min_hours": 10},
    {"id": "safety-health", "name": "Safety & Health", "min_hours": 5},
    {"id": "environmental-sustainability", "name": "Environmental Sustainability", "min_hours": 5}
  ]'::jsonb),
  ('ELECSA', 'ELECSA', 'ELECSA (Part of NICEIC Group)', 30, '[
    {"id": "technical-skills", "name": "Technical Skills", "min_hours": 10},
    {"id": "regulations-standards", "name": "Regulations & Standards", "min_hours": 8},
    {"id": "safety-health", "name": "Safety & Health", "min_hours": 6},
    {"id": "digital-technology", "name": "Digital Technology", "min_hours": 6}
  ]'::jsonb)
ON CONFLICT (code) DO NOTHING;

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for CPD entries
CREATE TRIGGER update_cpd_entries_updated_at
  BEFORE UPDATE ON public.cpd_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add triggers for professional bodies
CREATE TRIGGER update_professional_bodies_updated_at
  BEFORE UPDATE ON public.professional_bodies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
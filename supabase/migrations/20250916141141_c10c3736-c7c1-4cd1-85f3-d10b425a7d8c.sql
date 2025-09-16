-- Create professional bodies table with real CPD requirements
CREATE TABLE public.professional_bodies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  annual_cpd_hours INTEGER NOT NULL,
  renewal_period_months INTEGER NOT NULL DEFAULT 12,
  categories JSONB NOT NULL DEFAULT '[]'::jsonb,
  requirements JSONB NOT NULL DEFAULT '{}'::jsonb,
  assessment_cycle TEXT NOT NULL DEFAULT 'annual',
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user professional memberships table
CREATE TABLE public.user_professional_memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  professional_body_id UUID NOT NULL REFERENCES public.professional_bodies(id),
  membership_number TEXT,
  registration_date DATE,
  renewal_date DATE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create enhanced CPD entries table
CREATE TABLE public.cpd_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  professional_body_id UUID REFERENCES public.professional_bodies(id),
  title TEXT NOT NULL,
  description TEXT,
  activity_type TEXT NOT NULL,
  category TEXT NOT NULL,
  hours DECIMAL(5,2) NOT NULL,
  date_completed DATE NOT NULL,
  learning_outcomes TEXT[],
  evidence_files JSONB DEFAULT '[]'::jsonb,
  verification_status TEXT DEFAULT 'pending',
  is_verified BOOLEAN DEFAULT false,
  verified_by TEXT,
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create CPD evidence files table
CREATE TABLE public.cpd_evidence_files (
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

-- Create CPD portfolios table
CREATE TABLE public.cpd_portfolios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  professional_body_id UUID NOT NULL REFERENCES public.professional_bodies(id),
  title TEXT NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_hours DECIMAL(6,2) NOT NULL,
  compliance_percentage INTEGER NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  pdf_url TEXT,
  status TEXT DEFAULT 'draft'
);

-- Enable RLS
ALTER TABLE public.professional_bodies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_professional_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cpd_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cpd_evidence_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cpd_portfolios ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Professional bodies are viewable by everyone" 
ON public.professional_bodies FOR SELECT USING (true);

CREATE POLICY "Users can manage their own memberships" 
ON public.user_professional_memberships FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own CPD entries" 
ON public.cpd_entries FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own evidence files" 
ON public.cpd_evidence_files FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own portfolios" 
ON public.cpd_portfolios FOR ALL USING (auth.uid() = user_id);

-- Create storage bucket for CPD evidence
INSERT INTO storage.buckets (id, name, public) VALUES ('cpd-evidence', 'cpd-evidence', false);

-- Create storage policies for CPD evidence
CREATE POLICY "Users can upload their own CPD evidence" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'cpd-evidence' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own CPD evidence" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'cpd-evidence' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own CPD evidence" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'cpd-evidence' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own CPD evidence" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'cpd-evidence' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add triggers for timestamps
CREATE TRIGGER update_professional_bodies_updated_at
BEFORE UPDATE ON public.professional_bodies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_professional_memberships_updated_at
BEFORE UPDATE ON public.user_professional_memberships
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cpd_entries_updated_at
BEFORE UPDATE ON public.cpd_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert real professional body requirements
INSERT INTO public.professional_bodies (name, code, description, annual_cpd_hours, categories, requirements) VALUES
('NICEIC', 'NICEIC', 'National Inspection Council for Electrical Installation Contracting', 30, 
 '[
   {"id": "technical", "name": "Technical Training", "min_hours": 20, "description": "Technical knowledge and skills development"},
   {"id": "safety", "name": "Health & Safety", "min_hours": 5, "description": "Health and safety awareness and training"},
   {"id": "business", "name": "Business Skills", "min_hours": 5, "description": "Business development and management skills"}
 ]'::jsonb,
 '{
   "assessment_method": "Annual technical assessment",
   "evidence_required": ["Course certificates", "Training records", "Work examples"],
   "renewal_deadline": "Annual registration anniversary"
 }'::jsonb),

('IET', 'IET', 'Institution of Engineering and Technology', 35,
 '[
   {"id": "technical", "name": "Technical Development", "min_hours": 25, "description": "Engineering and technical competence"},
   {"id": "professional", "name": "Professional Skills", "min_hours": 5, "description": "Management and professional development"},
   {"id": "sustainability", "name": "Sustainability", "min_hours": 5, "description": "Environmental and sustainability awareness"}
 ]'::jsonb,
 '{
   "assessment_method": "Professional development record",
   "evidence_required": ["Certificates", "Learning logs", "Reflective statements"],
   "renewal_deadline": "Annual membership renewal"
 }'::jsonb),

('NAPIT', 'NAPIT', 'National Association of Professional Inspectors and Testers', 30,
 '[
   {"id": "technical", "name": "Technical Training", "min_hours": 20, "description": "Technical competency and regulations"},
   {"id": "safety", "name": "Safety Training", "min_hours": 5, "description": "Health and safety compliance"},
   {"id": "standards", "name": "Standards Update", "min_hours": 5, "description": "Current standards and regulations"}
 ]'::jsonb,
 '{
   "assessment_method": "Annual competency assessment",
   "evidence_required": ["Training certificates", "Assessment records", "CPD log"],
   "renewal_deadline": "Registration anniversary"
 }'::jsonb),

('ELECSA', 'ELECSA', 'Electrical Contractors Association', 30,
 '[
   {"id": "technical", "name": "Technical Training", "min_hours": 20, "description": "Technical skills and knowledge"},
   {"id": "regulations", "name": "Regulations Update", "min_hours": 5, "description": "Current regulations and standards"},
   {"id": "safety", "name": "Health & Safety", "min_hours": 5, "description": "Safety procedures and compliance"}
 ]'::jsonb,
 '{
   "assessment_method": "Periodic assessment",
   "evidence_required": ["Course certificates", "Training records", "Work portfolio"],
   "renewal_deadline": "Annual assessment"
 }'::jsonb);
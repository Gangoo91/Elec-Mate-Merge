-- Create qualifications table to store awarding body qualifications
CREATE TABLE public.qualifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  awarding_body TEXT NOT NULL,
  level TEXT NOT NULL,
  title TEXT NOT NULL,
  code TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create qualification categories table
CREATE TABLE public.qualification_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  qualification_id UUID NOT NULL REFERENCES public.qualifications(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  required_entries INTEGER NOT NULL DEFAULT 1,
  learning_outcomes TEXT[],
  assessment_criteria TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user qualification selections table
CREATE TABLE public.user_qualification_selections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  qualification_id UUID NOT NULL REFERENCES public.qualifications(id) ON DELETE CASCADE,
  selected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  progress_percentage INTEGER DEFAULT 0,
  target_completion_date DATE
);

-- Create qualification templates table for pre-populated portfolio entries
CREATE TABLE public.qualification_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  qualification_category_id UUID NOT NULL REFERENCES public.qualification_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  skills TEXT[],
  evidence_requirements TEXT[],
  template_content JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qualification_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_qualification_selections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qualification_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for qualifications (public read)
CREATE POLICY "Anyone can view qualifications" 
ON public.qualifications 
FOR SELECT 
USING (true);

-- RLS Policies for qualification categories (public read)
CREATE POLICY "Anyone can view qualification categories" 
ON public.qualification_categories 
FOR SELECT 
USING (true);

-- RLS Policies for user qualification selections
CREATE POLICY "Users can view their own qualification selections" 
ON public.user_qualification_selections 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own qualification selections" 
ON public.user_qualification_selections 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own qualification selections" 
ON public.user_qualification_selections 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own qualification selections" 
ON public.user_qualification_selections 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for qualification templates (public read)
CREATE POLICY "Anyone can view qualification templates" 
ON public.qualification_templates 
FOR SELECT 
USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_qualifications_updated_at
BEFORE UPDATE ON public.qualifications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample qualification data
INSERT INTO public.qualifications (awarding_body, level, title, code, description) VALUES
('EAL', 'Level 2', 'Diploma in Electrical Installation', 'EAL-L2-EI', 'Level 2 qualification covering electrical installation fundamentals'),
('EAL', 'Level 3', 'Advanced Diploma in Electrical Installation', 'EAL-L3-AEI', 'Advanced electrical installation qualification'),
('EAL', 'Level 3', 'NVQ Diploma in Electrotechnical Technology', 'EAL-L3-NVQ', 'NVQ qualification for electrotechnical competence'),
('City & Guilds', 'Level 2', 'Electrical Installation', 'CG-2365-L2', 'Level 2 electrical installation qualification'),
('City & Guilds', 'Level 3', 'Electrical Installation', 'CG-2365-L3', 'Level 3 electrical installation qualification'),
('City & Guilds', 'Level 3', 'Inspection & Testing', 'CG-2391', 'Inspection and testing of electrical installations'),
('MOET', 'Level 3', 'Maintenance Operability Electrical Testing', 'MOET-L3', 'Electrical testing and maintenance qualification');

-- Insert sample categories for EAL Level 2
INSERT INTO public.qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT 
  q.id,
  'Health & Safety',
  'Health and safety procedures and regulations in electrical work',
  'Shield',
  'hsl(0, 84%, 60%)',
  3,
  ARRAY['Understand electrical safety regulations', 'Apply safe working practices', 'Identify electrical hazards'],
  ARRAY['Demonstrate knowledge of electrical safety laws', 'Show competence in safe isolation procedures', 'Complete risk assessments']
FROM public.qualifications q WHERE q.code = 'EAL-L2-EI';

INSERT INTO public.qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT 
  q.id,
  'Electrical Theory',
  'Fundamental electrical principles and calculations',
  'Zap',
  'hsl(220, 84%, 60%)',
  4,
  ARRAY['Understand electrical theory', 'Perform electrical calculations', 'Apply Ohms law'],
  ARRAY['Calculate voltage, current and resistance', 'Demonstrate understanding of AC/DC theory', 'Show competence in power calculations']
FROM public.qualifications q WHERE q.code = 'EAL-L2-EI';

INSERT INTO public.qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT 
  q.id,
  'Installation Practice',
  'Practical electrical installation skills and techniques',
  'Wrench',
  'hsl(120, 84%, 60%)',
  5,
  ARRAY['Install electrical systems', 'Use electrical tools safely', 'Follow installation procedures'],
  ARRAY['Complete cable installations', 'Install electrical accessories', 'Demonstrate use of electrical tools']
FROM public.qualifications q WHERE q.code = 'EAL-L2-EI';

INSERT INTO public.qualification_categories (qualification_id, name, description, icon, color, required_entries, learning_outcomes, assessment_criteria)
SELECT 
  q.id,
  'Testing & Inspection',
  'Testing and inspection of electrical installations',
  'Search',
  'hsl(280, 84%, 60%)',
  3,
  ARRAY['Test electrical installations', 'Use testing equipment', 'Complete inspection certificates'],
  ARRAY['Perform electrical tests', 'Use multimeters and test equipment', 'Complete inspection and test certificates']
FROM public.qualifications q WHERE q.code = 'EAL-L2-EI';

-- Update portfolio_items table to link to qualification categories
ALTER TABLE public.portfolio_items 
ADD COLUMN qualification_category_id UUID REFERENCES public.qualification_categories(id),
ADD COLUMN learning_outcomes_met TEXT[],
ADD COLUMN assessment_criteria_met TEXT[];

-- Create compliance tracking for qualification progress
CREATE TABLE public.qualification_compliance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  qualification_id UUID NOT NULL REFERENCES public.qualifications(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.qualification_categories(id) ON DELETE CASCADE,
  required_entries INTEGER NOT NULL,
  completed_entries INTEGER DEFAULT 0,
  compliance_percentage INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for compliance tracking
ALTER TABLE public.qualification_compliance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own qualification compliance" 
ON public.qualification_compliance 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own qualification compliance" 
ON public.qualification_compliance 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own qualification compliance" 
ON public.qualification_compliance 
FOR UPDATE 
USING (auth.uid() = user_id);
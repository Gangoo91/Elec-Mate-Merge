-- First create the generic updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Elec-ID Profiles - Core identity for each worker
CREATE TABLE public.elec_id_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  elec_id_number TEXT NOT NULL UNIQUE,
  ecs_card_type TEXT DEFAULT 'gold',
  ecs_card_number TEXT,
  ecs_expiry_date DATE,
  bio TEXT,
  specialisations TEXT[],
  profile_views INTEGER DEFAULT 0,
  shareable_link TEXT,
  is_verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Elec-ID Skills - Worker skills with proficiency levels
CREATE TABLE public.elec_id_skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.elec_id_profiles(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  skill_level TEXT NOT NULL DEFAULT 'intermediate',
  years_experience INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Elec-ID Work History - Portable employment history
CREATE TABLE public.elec_id_work_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.elec_id_profiles(id) ON DELETE CASCADE,
  employer_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  projects TEXT[],
  is_verified BOOLEAN DEFAULT false,
  verified_by_employer BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Elec-ID Training - Training records owned by workers
CREATE TABLE public.elec_id_training (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.elec_id_profiles(id) ON DELETE CASCADE,
  training_name TEXT NOT NULL,
  provider TEXT,
  completed_date DATE,
  expiry_date DATE,
  certificate_id TEXT,
  funded_by TEXT,
  status TEXT DEFAULT 'valid',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Elec-ID Qualifications - Formal qualifications
CREATE TABLE public.elec_id_qualifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.elec_id_profiles(id) ON DELETE CASCADE,
  qualification_name TEXT NOT NULL,
  qualification_type TEXT NOT NULL,
  awarding_body TEXT,
  grade TEXT,
  date_achieved DATE,
  certificate_number TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.elec_id_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.elec_id_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.elec_id_work_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.elec_id_training ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.elec_id_qualifications ENABLE ROW LEVEL SECURITY;

-- Create permissive policies (matching existing pattern)
CREATE POLICY "Allow all access to elec_id_profiles" ON public.elec_id_profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to elec_id_skills" ON public.elec_id_skills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to elec_id_work_history" ON public.elec_id_work_history FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to elec_id_training" ON public.elec_id_training FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to elec_id_qualifications" ON public.elec_id_qualifications FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_elec_id_profiles_employee_id ON public.elec_id_profiles(employee_id);
CREATE INDEX idx_elec_id_profiles_elec_id_number ON public.elec_id_profiles(elec_id_number);
CREATE INDEX idx_elec_id_skills_profile_id ON public.elec_id_skills(profile_id);
CREATE INDEX idx_elec_id_work_history_profile_id ON public.elec_id_work_history(profile_id);
CREATE INDEX idx_elec_id_training_profile_id ON public.elec_id_training(profile_id);
CREATE INDEX idx_elec_id_qualifications_profile_id ON public.elec_id_qualifications(profile_id);

-- Trigger for updated_at on profiles
CREATE TRIGGER update_elec_id_profiles_updated_at
  BEFORE UPDATE ON public.elec_id_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
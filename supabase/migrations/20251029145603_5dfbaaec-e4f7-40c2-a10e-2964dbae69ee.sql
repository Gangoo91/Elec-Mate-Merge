-- Create installation_procedures table for structured installation steps
CREATE TABLE IF NOT EXISTS public.installation_procedures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES public.installation_knowledge(id),
  procedure_type TEXT NOT NULL,
  procedure_title TEXT NOT NULL,
  steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  safety_requirements JSONB DEFAULT '[]'::jsonb,
  tools_required TEXT[] DEFAULT ARRAY[]::text[],
  materials_required TEXT[] DEFAULT ARRAY[]::text[],
  estimated_time_minutes INTEGER,
  skill_level TEXT,
  regulations_cited TEXT[] DEFAULT ARRAY[]::text[],
  confidence_score NUMERIC DEFAULT 0.8,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create design_patterns_structured table for design intelligence
CREATE TABLE IF NOT EXISTS public.design_patterns_structured (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES public.design_knowledge(id),
  pattern_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  calculation_formula TEXT,
  input_parameters JSONB DEFAULT '{}'::jsonb,
  example_values JSONB DEFAULT '{}'::jsonb,
  regulations_cited TEXT[] DEFAULT ARRAY[]::text[],
  constraints JSONB DEFAULT '[]'::jsonb,
  typical_applications TEXT[] DEFAULT ARRAY[]::text[],
  confidence_score NUMERIC DEFAULT 0.8,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create inspection_procedures table
CREATE TABLE IF NOT EXISTS public.inspection_procedures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES public.inspection_testing_knowledge(id),
  test_type TEXT NOT NULL,
  test_name TEXT NOT NULL,
  test_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  equipment_required TEXT[] DEFAULT ARRAY[]::text[],
  acceptance_criteria JSONB DEFAULT '{}'::jsonb,
  regulations_cited TEXT[] DEFAULT ARRAY[]::text[],
  typical_values JSONB DEFAULT '{}'::jsonb,
  frequency TEXT,
  confidence_score NUMERIC DEFAULT 0.8,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create maintenance_schedules table
CREATE TABLE IF NOT EXISTS public.maintenance_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES public.maintenance_knowledge(id),
  equipment_type TEXT NOT NULL,
  maintenance_type TEXT NOT NULL,
  title TEXT NOT NULL,
  procedure_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  frequency TEXT,
  estimated_duration_minutes INTEGER,
  required_qualifications TEXT[] DEFAULT ARRAY[]::text[],
  safety_precautions JSONB DEFAULT '[]'::jsonb,
  regulations_cited TEXT[] DEFAULT ARRAY[]::text[],
  confidence_score NUMERIC DEFAULT 0.8,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create project_templates table
CREATE TABLE IF NOT EXISTS public.project_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID REFERENCES public.project_mgmt_knowledge(id),
  template_type TEXT NOT NULL,
  title TEXT NOT NULL,
  phases JSONB NOT NULL DEFAULT '[]'::jsonb,
  deliverables JSONB DEFAULT '[]'::jsonb,
  required_documents TEXT[] DEFAULT ARRAY[]::text[],
  typical_duration_days INTEGER,
  team_roles TEXT[] DEFAULT ARRAY[]::text[],
  regulations_cited TEXT[] DEFAULT ARRAY[]::text[],
  risk_factors JSONB DEFAULT '[]'::jsonb,
  confidence_score NUMERIC DEFAULT 0.8,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create hazard_step_links table (links hazards to procedures)
CREATE TABLE IF NOT EXISTS public.hazard_step_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hazard_id UUID REFERENCES public.regulation_hazards_extracted(id),
  procedure_id UUID REFERENCES public.installation_procedures(id),
  step_number INTEGER,
  relevance_score NUMERIC DEFAULT 0.8,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.installation_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_patterns_structured ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inspection_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hazard_step_links ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public read access" ON public.installation_procedures FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.design_patterns_structured FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.inspection_procedures FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.maintenance_schedules FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.project_templates FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.hazard_step_links FOR SELECT USING (true);

-- Service role management policies
CREATE POLICY "Service manages data" ON public.installation_procedures FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service manages data" ON public.design_patterns_structured FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service manages data" ON public.inspection_procedures FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service manages data" ON public.maintenance_schedules FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service manages data" ON public.project_templates FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service manages data" ON public.hazard_step_links FOR ALL USING (auth.role() = 'service_role');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_installation_procedures_type ON public.installation_procedures(procedure_type);
CREATE INDEX IF NOT EXISTS idx_design_patterns_type ON public.design_patterns_structured(pattern_type);
CREATE INDEX IF NOT EXISTS idx_inspection_procedures_type ON public.inspection_procedures(test_type);
CREATE INDEX IF NOT EXISTS idx_maintenance_schedules_type ON public.maintenance_schedules(equipment_type);
CREATE INDEX IF NOT EXISTS idx_project_templates_type ON public.project_templates(template_type);
CREATE INDEX IF NOT EXISTS idx_hazard_step_links_hazard ON public.hazard_step_links(hazard_id);
CREATE INDEX IF NOT EXISTS idx_hazard_step_links_procedure ON public.hazard_step_links(procedure_id);
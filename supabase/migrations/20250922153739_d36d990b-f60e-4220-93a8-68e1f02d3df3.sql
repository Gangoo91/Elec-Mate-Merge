-- Enhanced Risk Assessment and Method Statement System
-- Create new tables for tasks, enhanced hazards, and linking system

-- Tasks table for dynamic task management
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  estimated_duration TEXT,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
  linked_hazards TEXT[], -- Array of hazard IDs
  linked_method_steps TEXT[], -- Array of method step IDs
  prerequisites TEXT[], -- Other task IDs that must be completed first
  responsible_person TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enhanced hazards table with linking capabilities
CREATE TABLE public.enhanced_hazards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  hazard_id TEXT NOT NULL,
  hazard_name TEXT NOT NULL,
  category TEXT NOT NULL,
  linked_tasks TEXT[] DEFAULT '{}',
  linked_risks TEXT[] DEFAULT '{}',
  linked_method_statements TEXT[] DEFAULT '{}',
  frequency INTEGER DEFAULT 0,
  last_used TIMESTAMP WITH TIME ZONE DEFAULT now(),
  custom_controls TEXT[],
  is_custom BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RAMS-Method Statement linking table
CREATE TABLE public.rams_method_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  rams_id UUID,
  method_statement_id UUID,
  task_ids TEXT[],
  hazard_ids TEXT[],
  link_type TEXT NOT NULL DEFAULT 'primary' CHECK (link_type IN ('primary', 'secondary', 'reference')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Document relationships for cross-referencing
CREATE TABLE public.document_relationships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  source_type TEXT NOT NULL,
  source_id UUID NOT NULL,
  target_type TEXT NOT NULL,
  target_id UUID NOT NULL,
  relationship_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Custom hazards created by users
CREATE TABLE public.custom_hazards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  default_controls TEXT[],
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Usage analytics for smart suggestions
CREATE TABLE public.usage_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  action_type TEXT NOT NULL,
  context_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enhanced_hazards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rams_method_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_hazards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tasks
CREATE POLICY "Users can manage their own tasks" 
ON public.tasks 
FOR ALL 
USING (auth.uid() = user_id);

-- RLS Policies for enhanced_hazards
CREATE POLICY "Users can view all hazards" 
ON public.enhanced_hazards 
FOR SELECT 
USING (true);

CREATE POLICY "Users can manage their own custom hazards" 
ON public.enhanced_hazards 
FOR ALL 
USING (auth.uid() = user_id OR user_id IS NULL);

-- RLS Policies for rams_method_links
CREATE POLICY "Users can manage their own links" 
ON public.rams_method_links 
FOR ALL 
USING (auth.uid() = user_id);

-- RLS Policies for document_relationships
CREATE POLICY "Users can manage their own document relationships" 
ON public.document_relationships 
FOR ALL 
USING (auth.uid() = user_id);

-- RLS Policies for custom_hazards
CREATE POLICY "Users can manage their own custom hazards" 
ON public.custom_hazards 
FOR ALL 
USING (auth.uid() = user_id);

-- RLS Policies for usage_analytics
CREATE POLICY "Users can view their own analytics" 
ON public.usage_analytics 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create analytics entries" 
ON public.usage_analytics 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create indexes for better performance
CREATE INDEX idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_enhanced_hazards_category ON public.enhanced_hazards(category);
CREATE INDEX idx_enhanced_hazards_user_id ON public.enhanced_hazards(user_id);
CREATE INDEX idx_rams_method_links_user_id ON public.rams_method_links(user_id);
CREATE INDEX idx_document_relationships_user_id ON public.document_relationships(user_id);
CREATE INDEX idx_custom_hazards_user_id ON public.custom_hazards(user_id);
CREATE INDEX idx_usage_analytics_user_id ON public.usage_analytics(user_id);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_enhanced_hazards_updated_at
  BEFORE UPDATE ON public.enhanced_hazards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_custom_hazards_updated_at
  BEFORE UPDATE ON public.custom_hazards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default hazard data from existing hazard categories
INSERT INTO public.enhanced_hazards (hazard_id, hazard_name, category, is_custom)
SELECT 
  LOWER(REPLACE(hazard, ' ', '_')),
  hazard,
  'Electrical Hazards',
  false
FROM (
  VALUES 
    ('Live electrical circuits'),
    ('Faulty electrical equipment'),
    ('Exposed electrical connections'),
    ('Inadequate earthing'),
    ('Overloaded circuits'),
    ('Working in wet conditions near electricity'),
    ('Arc flash'),
    ('Electric shock from tools'),
    ('Lightning during outdoor work'),
    ('Static electricity discharge')
) AS electrical_hazards(hazard);

INSERT INTO public.enhanced_hazards (hazard_id, hazard_name, category, is_custom)
SELECT 
  LOWER(REPLACE(hazard, ' ', '_')),
  hazard,
  'Working at Height',
  false
FROM (
  VALUES 
    ('Falls from ladders'),
    ('Falls from scaffolding'),
    ('Falls through roof lights'),
    ('Falls from mobile elevated work platforms'),
    ('Falls from cherry pickers'),
    ('Working near unprotected edges'),
    ('Unstable working platforms'),
    ('Equipment falling from height'),
    ('Wind affecting stability at height'),
    ('Poor visibility at height')
) AS height_hazards(hazard);

INSERT INTO public.enhanced_hazards (hazard_id, hazard_name, category, is_custom)
SELECT 
  LOWER(REPLACE(hazard, ' ', '_')),
  hazard,
  'Manual Handling',
  false
FROM (
  VALUES 
    ('Heavy lifting of equipment'),
    ('Awkward lifting positions'),
    ('Repetitive movements'),
    ('Pulling cables through conduits'),
    ('Moving electrical panels'),
    ('Carrying tools up stairs'),
    ('Working in confined spaces'),
    ('Prolonged kneeling or crouching'),
    ('Overhead cable installation'),
    ('Team lifting coordination')
) AS manual_hazards(hazard);

INSERT INTO public.enhanced_hazards (hazard_id, hazard_name, category, is_custom)
SELECT 
  LOWER(REPLACE(hazard, ' ', '_')),
  hazard,
  'Fire & Explosion',
  false
FROM (
  VALUES 
    ('Hot work near flammable materials'),
    ('Sparks from electrical equipment'),
    ('Gas leaks in vicinity'),
    ('Overheating electrical components'),
    ('Flammable adhesives and solvents'),
    ('Fuel storage areas'),
    ('Dust accumulation'),
    ('Blocked fire exits during work'),
    ('Electrical arcing'),
    ('Chemical reactions')
) AS fire_hazards(hazard);
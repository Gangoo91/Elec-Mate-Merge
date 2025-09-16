-- Create CPD entries table for enhanced tracking
CREATE TABLE public.cpd_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL,
  activity TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  hours NUMERIC NOT NULL,
  provider TEXT,
  description TEXT,
  learning_outcomes TEXT,
  reflection_notes TEXT,
  skills_gained TEXT[],
  evidence_files JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'pending'::text,
  is_automatic BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cpd_entries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own CPD entries" 
ON public.cpd_entries 
FOR ALL 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_cpd_entries_updated_at
BEFORE UPDATE ON public.cpd_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create professional body categories table
CREATE TABLE public.professional_body_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  professional_body_id UUID NOT NULL,
  category_name TEXT NOT NULL,
  required_hours INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.professional_body_categories ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Professional body categories are publicly readable" 
ON public.professional_body_categories 
FOR SELECT 
USING (true);

-- Update professional_bodies table to include cpd_hours_required
ALTER TABLE public.professional_bodies 
ADD COLUMN cpd_hours_required INTEGER DEFAULT 35;
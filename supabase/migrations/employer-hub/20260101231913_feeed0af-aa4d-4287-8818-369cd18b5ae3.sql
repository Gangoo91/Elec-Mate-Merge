-- Create incidents table for accident/near miss logging
CREATE TABLE public.incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  incident_type text NOT NULL DEFAULT 'Near Miss',
  severity text NOT NULL DEFAULT 'Low',
  job_id uuid REFERENCES public.jobs(id) ON DELETE SET NULL,
  reported_by text,
  reported_at timestamp with time zone NOT NULL DEFAULT now(),
  location text,
  status text NOT NULL DEFAULT 'Open',
  actions_taken text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;

-- Create policy for all access (no auth in this app)
CREATE POLICY "Allow all access to incidents" ON public.incidents
FOR ALL USING (true) WITH CHECK (true);

-- Create RAMS table for risk assessments and method statements
CREATE TABLE public.rams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  job_id uuid REFERENCES public.jobs(id) ON DELETE SET NULL,
  client text,
  location text,
  scope_of_work text,
  hazards text[] DEFAULT '{}',
  control_measures text[] DEFAULT '{}',
  ppe_required text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'Draft',
  approved_by text,
  approved_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.rams ENABLE ROW LEVEL SECURITY;

-- Create policy for all access
CREATE POLICY "Allow all access to rams" ON public.rams
FOR ALL USING (true) WITH CHECK (true);
-- Create vacancies table for job adverts
CREATE TABLE public.vacancies (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  location text NOT NULL,
  type text DEFAULT 'Full-time',
  status text DEFAULT 'Open',
  salary_min numeric,
  salary_max numeric,
  salary_period text DEFAULT 'per year',
  description text,
  requirements text[] DEFAULT '{}',
  benefits text[] DEFAULT '{}',
  closing_date date,
  views integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (development)
CREATE POLICY "Allow all access to vacancies" 
ON public.vacancies 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_vacancies_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_vacancies_updated_at
BEFORE UPDATE ON public.vacancies
FOR EACH ROW
EXECUTE FUNCTION public.update_vacancies_updated_at();
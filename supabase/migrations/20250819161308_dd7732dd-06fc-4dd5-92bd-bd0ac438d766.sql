-- Enable pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create cron job to refresh projects every 12 hours
SELECT cron.schedule(
  'refresh-electrical-projects',
  '0 */12 * * *', -- Every 12 hours at minute 0
  $$
  SELECT
    net.http_post(
        url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/schedule-projects-refresh',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8"}'::jsonb,
        body:='{"scheduled": true}'::jsonb
    ) as request_id;
  $$
);

-- Add enhanced project tracking columns if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'major_projects' AND column_name = 'category') THEN
    ALTER TABLE public.major_projects ADD COLUMN category text DEFAULT 'Infrastructure';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'major_projects' AND column_name = 'electrical_scope') THEN
    ALTER TABLE public.major_projects ADD COLUMN electrical_scope text DEFAULT 'General Electrical';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'major_projects' AND column_name = 'technologies') THEN
    ALTER TABLE public.major_projects ADD COLUMN technologies text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'major_projects' AND column_name = 'tender_deadline') THEN
    ALTER TABLE public.major_projects ADD COLUMN tender_deadline date;
  END IF;
END $$;

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_major_projects_category ON public.major_projects(category);

-- Create index for electrical scope filtering  
CREATE INDEX IF NOT EXISTS idx_major_projects_electrical_scope ON public.major_projects(electrical_scope);

-- Create index for tender deadline filtering
CREATE INDEX IF NOT EXISTS idx_major_projects_tender_deadline ON public.major_projects(tender_deadline);

-- Add comments to explain new columns
COMMENT ON COLUMN public.major_projects.category IS 'Project category (Healthcare, Transport, Education, Renewable Energy, etc.)';
COMMENT ON COLUMN public.major_projects.electrical_scope IS 'Specific electrical work scope (HV, LV, Lighting, etc.)';
COMMENT ON COLUMN public.major_projects.technologies IS 'Array of technologies involved in the project';
COMMENT ON COLUMN public.major_projects.tender_deadline IS 'Deadline for tender submissions';
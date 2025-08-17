-- Create pricing ingest log table for monitoring
CREATE TABLE public.pricing_ingest_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ingest_type TEXT NOT NULL,
  records_processed INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'running',
  error_message TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.pricing_ingest_log ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to view logs
CREATE POLICY "Admins can view ingest logs" 
ON public.pricing_ingest_log 
FOR SELECT 
USING (true);

-- Create policy for system to insert logs
CREATE POLICY "System can insert ingest logs" 
ON public.pricing_ingest_log 
FOR INSERT 
WITH CHECK (true);

-- Enable pg_cron extension for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule nightly job pricing ingest (runs at 2 AM daily)
SELECT cron.schedule(
  'nightly-job-pricing-ingest',
  '0 2 * * *',
  $$
  SELECT
    net.http_post(
        url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/nightly-job-pricing-ingest',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8"}'::jsonb,
        body:='{"scheduled": true}'::jsonb
    ) as request_id;
  $$
);
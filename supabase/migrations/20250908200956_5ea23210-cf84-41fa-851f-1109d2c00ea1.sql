-- Update cache expiry times from 7 days to 14 days (bi-weekly)
ALTER TABLE public.tools_weekly_cache 
ALTER COLUMN expires_at SET DEFAULT (now() + '14 days'::interval);

ALTER TABLE public.materials_weekly_cache 
ALTER COLUMN expires_at SET DEFAULT (now() + '14 days'::interval);

-- Update live_education_cache to bi-weekly as well
ALTER TABLE public.live_education_cache 
ALTER COLUMN expires_at SET DEFAULT (now() + '14 days'::interval);

-- Update function to return next bi-weekly refresh
CREATE OR REPLACE FUNCTION public.get_next_biweekly_refresh()
 RETURNS timestamp with time zone
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Calculate next bi-weekly Sunday at 2 AM UTC (every 2 weeks)
  RETURN date_trunc('week', CURRENT_DATE + interval '2 weeks') + interval '2 hours';
END;
$function$;
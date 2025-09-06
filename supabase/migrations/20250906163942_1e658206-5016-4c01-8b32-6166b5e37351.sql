-- Create function to get next Sunday refresh time
CREATE OR REPLACE FUNCTION public.get_next_sunday_market_refresh()
RETURNS timestamp with time zone
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Calculate next Sunday at 2 AM UTC
  RETURN date_trunc('week', CURRENT_DATE + interval '1 week') + interval '2 hours';
END;
$function$

-- Create function to cleanup expired market insights cache
CREATE OR REPLACE FUNCTION public.cleanup_expired_market_insights_cache()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  DELETE FROM public.market_insights_cache 
  WHERE expires_at < now();
END;
$function$
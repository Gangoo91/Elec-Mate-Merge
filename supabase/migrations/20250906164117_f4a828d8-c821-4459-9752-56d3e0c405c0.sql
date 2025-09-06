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
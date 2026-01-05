-- Fix: Set immutable search_path on the prevention function to address security linter warning
CREATE OR REPLACE FUNCTION public.prevent_certificate_number_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  IF OLD.certificate_number IS DISTINCT FROM NEW.certificate_number THEN
    RAISE EXCEPTION 'Certificate number cannot be modified after creation';
  END IF;
  RETURN NEW;
END;
$function$;
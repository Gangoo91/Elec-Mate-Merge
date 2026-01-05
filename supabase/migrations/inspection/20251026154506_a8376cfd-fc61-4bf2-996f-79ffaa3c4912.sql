-- Step 1: Drop the existing unique constraint that doesn't account for soft deletes
ALTER TABLE reports DROP CONSTRAINT IF EXISTS unique_certificate_number;

-- Step 2: Create a partial unique index that only applies to non-deleted records
CREATE UNIQUE INDEX unique_certificate_number_active 
ON reports (certificate_number) 
WHERE deleted_at IS NULL;

-- Step 3: Temporarily disable the prevention function
CREATE OR REPLACE FUNCTION public.prevent_certificate_number_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Temporarily disabled for migration
  RETURN NEW;
END;
$function$;

-- Step 4: Clean up legacy certificate number suffixes
UPDATE reports 
SET certificate_number = REGEXP_REPLACE(certificate_number, '-R[0-9]+$', '') 
WHERE certificate_number ~ '-R[0-9]+$' 
  AND deleted_at IS NULL;

-- Step 5: Restore the original prevention function
CREATE OR REPLACE FUNCTION public.prevent_certificate_number_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF OLD.certificate_number IS DISTINCT FROM NEW.certificate_number THEN
    RAISE EXCEPTION 'Certificate number cannot be modified after creation';
  END IF;
  RETURN NEW;
END;
$function$;

-- Step 6: Add comment
COMMENT ON COLUMN reports.certificate_number IS 'Format: {PREFIX}-{YEAR}-{SEQUENTIAL} (e.g., EICR-2025-0001). Unique constraint only applies to active (non-deleted) records.';
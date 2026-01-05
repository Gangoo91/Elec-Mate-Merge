-- Temporarily replace the function to allow certificate number updates
CREATE OR REPLACE FUNCTION public.prevent_certificate_number_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $$
BEGIN
  -- Temporarily allow all updates for migration
  RETURN NEW;
END;
$$;

-- Fix existing duplicate certificate numbers
DO $$
DECLARE
  duplicate_cert RECORD;
  duplicate_row RECORD;
  suffix_counter INT;
BEGIN
  -- Loop through each certificate number that has duplicates
  FOR duplicate_cert IN (
    SELECT certificate_number
    FROM public.reports
    GROUP BY certificate_number
    HAVING COUNT(*) > 1
  )
  LOOP
    suffix_counter := 1;
    
    -- For each duplicate certificate, update all but the first (oldest) one
    FOR duplicate_row IN (
      SELECT id
      FROM public.reports
      WHERE certificate_number = duplicate_cert.certificate_number
      ORDER BY created_at
      OFFSET 1  -- Skip the first (oldest) record
    )
    LOOP
      -- Update with unique suffix
      UPDATE public.reports
      SET certificate_number = duplicate_cert.certificate_number || '-R' || suffix_counter
      WHERE id = duplicate_row.id;
      
      suffix_counter := suffix_counter + 1;
    END LOOP;
  END LOOP;
END $$;

-- Add unique constraint on certificate_number
ALTER TABLE public.reports 
ADD CONSTRAINT unique_certificate_number UNIQUE (certificate_number);

-- Restore the original function to prevent certificate number updates
CREATE OR REPLACE FUNCTION public.prevent_certificate_number_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $$
BEGIN
  IF OLD.certificate_number IS DISTINCT FROM NEW.certificate_number THEN
    RAISE EXCEPTION 'Certificate number cannot be modified after creation';
  END IF;
  RETURN NEW;
END;
$$;

-- Create function to generate sequential certificate numbers
CREATE OR REPLACE FUNCTION public.generate_certificate_number(
  p_report_type TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_year TEXT;
  v_prefix TEXT;
  v_max_number INTEGER;
  v_new_number TEXT;
  v_certificate_number TEXT;
BEGIN
  -- Get current year
  v_year := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;
  
  -- Set prefix based on report type
  CASE p_report_type
    WHEN 'eicr' THEN v_prefix := 'EICR';
    WHEN 'eic' THEN v_prefix := 'EIC';
    WHEN 'minor-works' THEN v_prefix := 'MW';
    ELSE v_prefix := 'CERT';
  END CASE;
  
  -- Get the highest number for this year and type
  SELECT COALESCE(
    MAX(
      NULLIF(
        regexp_replace(
          SPLIT_PART(certificate_number, '-', 3),
          '[^0-9]',
          '',
          'g'
        ),
        ''
      )::INTEGER
    ),
    0
  ) INTO v_max_number
  FROM public.reports
  WHERE certificate_number LIKE v_prefix || '-' || v_year || '-%'
    AND deleted_at IS NULL;
  
  -- Generate new sequential number (padded to 4 digits)
  v_new_number := LPAD((v_max_number + 1)::TEXT, 4, '0');
  
  -- Construct final certificate number
  v_certificate_number := v_prefix || '-' || v_year || '-' || v_new_number;
  
  RETURN v_certificate_number;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.generate_certificate_number(TEXT) TO authenticated;
-- Create function to bulk insert certificate metadata
CREATE OR REPLACE FUNCTION public.bulk_insert_certificates(
  p_user_id uuid,
  p_certificates jsonb
)
RETURNS TABLE(
  success_count integer,
  error_count integer,
  errors jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  cert_record jsonb;
  success_cnt integer := 0;
  error_cnt integer := 0;
  error_list jsonb := '[]'::jsonb;
  v_customer_id uuid;
  v_customer_name text;
  v_certificate_number text;
  v_report_type text;
BEGIN
  FOR cert_record IN SELECT * FROM jsonb_array_elements(p_certificates)
  LOOP
    BEGIN
      v_customer_name := TRIM(cert_record->>'customer_name');
      v_certificate_number := TRIM(cert_record->>'certificate_number');
      v_report_type := LOWER(TRIM(cert_record->>'report_type'));
      
      -- Validate report type
      IF v_report_type NOT IN ('eicr', 'eic', 'minor-works') THEN
        RAISE EXCEPTION 'Invalid report type: %. Must be EICR, EIC, or minor-works', v_report_type;
      END IF;
      
      -- Check for duplicate certificate number
      IF EXISTS (
        SELECT 1 FROM public.reports 
        WHERE certificate_number = v_certificate_number 
        AND user_id = p_user_id 
        AND deleted_at IS NULL
      ) THEN
        RAISE EXCEPTION 'Certificate number % already exists', v_certificate_number;
      END IF;
      
      -- Try to find existing customer by name
      SELECT id INTO v_customer_id
      FROM public.customers
      WHERE user_id = p_user_id
      AND LOWER(name) = LOWER(v_customer_name)
      LIMIT 1;
      
      -- Create customer if not found
      IF v_customer_id IS NULL THEN
        INSERT INTO public.customers (user_id, name)
        VALUES (p_user_id, v_customer_name)
        RETURNING id INTO v_customer_id;
      END IF;
      
      -- Insert certificate record
      INSERT INTO public.reports (
        user_id,
        customer_id,
        certificate_number,
        report_type,
        report_id,
        status,
        inspection_date,
        installation_address,
        inspector_name,
        client_name,
        data
      ) VALUES (
        p_user_id,
        v_customer_id,
        v_certificate_number,
        v_report_type,
        v_certificate_number, -- Use certificate number as report_id
        COALESCE(NULLIF(TRIM(cert_record->>'status'), ''), 'draft'),
        NULLIF(cert_record->>'inspection_date', '')::date,
        NULLIF(TRIM(cert_record->>'installation_address'), ''),
        NULLIF(TRIM(cert_record->>'inspector_name'), ''),
        NULLIF(TRIM(cert_record->>'client_name'), ''),
        '{}'::jsonb
      );
      
      success_cnt := success_cnt + 1;
      
    EXCEPTION WHEN OTHERS THEN
      error_cnt := error_cnt + 1;
      error_list := error_list || jsonb_build_object(
        'row', cert_record,
        'error', SQLERRM
      );
    END;
  END LOOP;
  
  RETURN QUERY SELECT success_cnt, error_cnt, error_list;
END;
$$;
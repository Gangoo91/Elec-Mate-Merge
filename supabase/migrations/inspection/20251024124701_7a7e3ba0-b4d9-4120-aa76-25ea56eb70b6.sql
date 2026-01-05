-- Function to bulk insert customers with validation and error handling
CREATE OR REPLACE FUNCTION public.bulk_insert_customers(
  p_user_id uuid,
  p_customers jsonb
) RETURNS TABLE(
  success_count integer,
  error_count integer,
  errors jsonb
) AS $$
DECLARE
  customer_record jsonb;
  success_cnt integer := 0;
  error_cnt integer := 0;
  error_list jsonb := '[]'::jsonb;
BEGIN
  FOR customer_record IN SELECT * FROM jsonb_array_elements(p_customers)
  LOOP
    BEGIN
      INSERT INTO public.customers (
        user_id,
        name,
        email,
        phone,
        address,
        notes
      ) VALUES (
        p_user_id,
        customer_record->>'name',
        NULLIF(TRIM(customer_record->>'email'), ''),
        NULLIF(TRIM(customer_record->>'phone'), ''),
        NULLIF(TRIM(customer_record->>'address'), ''),
        NULLIF(TRIM(customer_record->>'notes'), '')
      );
      success_cnt := success_cnt + 1;
    EXCEPTION WHEN OTHERS THEN
      error_cnt := error_cnt + 1;
      error_list := error_list || jsonb_build_object(
        'row', customer_record,
        'error', SQLERRM
      );
    END;
  END LOOP;
  
  RETURN QUERY SELECT success_cnt, error_cnt, error_list;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
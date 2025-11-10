-- Create sequence for invoice number generation
CREATE SEQUENCE IF NOT EXISTS invoice_number_seq START 1;

-- Grant usage to authenticated users
GRANT USAGE ON SEQUENCE invoice_number_seq TO authenticated;

-- Create function to generate sequential invoice numbers atomically
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  next_num INTEGER;
  invoice_num TEXT;
BEGIN
  -- Get next sequence number atomically
  next_num := nextval('invoice_number_seq');
  
  -- Format as Invoice/001, Invoice/002, etc.
  invoice_num := 'Invoice/' || LPAD(next_num::TEXT, 3, '0');
  
  RETURN invoice_num;
END;
$$;

-- Create function for standalone invoice numbers (with S prefix)
CREATE OR REPLACE FUNCTION generate_standalone_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  next_num INTEGER;
  invoice_num TEXT;
  last_standalone_num INTEGER;
BEGIN
  -- Find the highest standalone invoice number
  SELECT COALESCE(
    MAX(
      CASE 
        WHEN invoice_number ~ '^Invoice/S\d+$' 
        THEN SUBSTRING(invoice_number FROM 'Invoice/S(\d+)')::INTEGER
        ELSE 0
      END
    ), 0
  ) INTO last_standalone_num
  FROM quotes
  WHERE invoice_raised = true 
  AND invoice_number LIKE 'Invoice/S%';
  
  -- Increment for next number
  next_num := last_standalone_num + 1;
  
  -- Format as Invoice/S001, Invoice/S002, etc.
  invoice_num := 'Invoice/S' || LPAD(next_num::TEXT, 3, '0');
  
  RETURN invoice_num;
END;
$$;
-- ELE-966: Fix race condition in generate_standalone_invoice_number
--
-- The old function used MAX() + increment which is not atomic.
-- Two concurrent calls get the same MAX, both generate the same number,
-- and the second INSERT fails with a duplicate key (23505).
--
-- Fix: use a proper Postgres sequence (same pattern as invoice_number_seq
-- which already works correctly for quote-derived invoices).

-- 1. Create the sequence, seeded above the current max standalone invoice number.
--    Current max is Invoice/S141 so we start at 142.
CREATE SEQUENCE IF NOT EXISTS standalone_invoice_number_seq START 142;

-- 2. If there are already rows, advance the sequence to be safe
--    (handles the case where rows were added between migration authoring and deployment).
SELECT setval(
  'standalone_invoice_number_seq',
  GREATEST(
    141,
    COALESCE(
      (
        SELECT MAX(
          CASE
            WHEN invoice_number ~ '^Invoice/S\d+$'
            THEN SUBSTRING(invoice_number FROM 'Invoice/S(\d+)')::INTEGER
            ELSE 0
          END
        )
        FROM quotes
        WHERE invoice_raised = true
          AND invoice_number ~ '^Invoice/S\d+$'
      ),
      141
    )
  )
);

-- 3. Replace the function to use the sequence (atomic, no race condition)
CREATE OR REPLACE FUNCTION generate_standalone_invoice_number()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  next_num INTEGER;
BEGIN
  next_num := nextval('standalone_invoice_number_seq');
  RETURN 'Invoice/S' || LPAD(next_num::TEXT, 3, '0');
END;
$$;

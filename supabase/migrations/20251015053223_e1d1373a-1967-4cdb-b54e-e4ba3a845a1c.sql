-- Step 7: Add Database Constraints for Fresh PDF Generation

-- Remove pdf_url column entirely (S3 signed URLs expire anyway)
ALTER TABLE quotes DROP COLUMN IF EXISTS pdf_url;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_quotes_pdf_document_id ON quotes(pdf_document_id);

-- Add updated_at trigger to auto-update timestamp
CREATE OR REPLACE FUNCTION update_quotes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_quotes_updated_at ON quotes;
CREATE TRIGGER trigger_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_quotes_updated_at();
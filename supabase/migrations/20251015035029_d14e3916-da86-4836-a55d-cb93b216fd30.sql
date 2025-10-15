-- Add PDF metadata tracking to quotes table
ALTER TABLE quotes
ADD COLUMN IF NOT EXISTS pdf_document_id text,
ADD COLUMN IF NOT EXISTS pdf_url text,
ADD COLUMN IF NOT EXISTS pdf_generated_at timestamptz,
ADD COLUMN IF NOT EXISTS pdf_version integer DEFAULT 0;

-- Add index for efficient PDF document lookups
CREATE INDEX IF NOT EXISTS idx_quotes_pdf_document_id ON quotes(pdf_document_id);

-- Add comment for documentation
COMMENT ON COLUMN quotes.pdf_document_id IS 'PDFMonkey document ID for tracking generated PDFs';
COMMENT ON COLUMN quotes.pdf_url IS 'Cached download URL for the latest PDF version';
COMMENT ON COLUMN quotes.pdf_generated_at IS 'Timestamp when PDF was last generated';
COMMENT ON COLUMN quotes.pdf_version IS 'Incremental version counter for PDF regenerations';
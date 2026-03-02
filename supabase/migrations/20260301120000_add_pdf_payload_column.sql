-- Add pdf_payload column to reports table
-- Stores the formatted (snake_case) JSON data that was sent to PDFMonkey
-- when the user successfully generates a PDF from the form UI.
-- This ensures email resends and the reports page use the same formatted data.
ALTER TABLE reports ADD COLUMN IF NOT EXISTS pdf_payload jsonb;

-- Add a comment explaining the column's purpose
COMMENT ON COLUMN reports.pdf_payload IS 'Formatted PDF payload (snake_case) saved during successful PDF generation from the form UI. Used by email resend, reports viewer, and bulk export to produce populated PDFs.';

-- Add pdf_url column to quotes table to store the generated PDF URL
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS pdf_url TEXT;
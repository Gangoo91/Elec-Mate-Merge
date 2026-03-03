-- Add entity linking columns + metadata to photo_analyses table
-- Allows photos to be linked to portfolios, diary entries, projects, quotes, invoices

ALTER TABLE photo_analyses ADD COLUMN IF NOT EXISTS linked_portfolio_id uuid;
ALTER TABLE photo_analyses ADD COLUMN IF NOT EXISTS linked_diary_entry_id uuid;
ALTER TABLE photo_analyses ADD COLUMN IF NOT EXISTS linked_project_id uuid;
ALTER TABLE photo_analyses ADD COLUMN IF NOT EXISTS linked_quote_id uuid;
ALTER TABLE photo_analyses ADD COLUMN IF NOT EXISTS linked_invoice_id uuid;
ALTER TABLE photo_analyses ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
ALTER TABLE photo_analyses ADD COLUMN IF NOT EXISTS ai_description text;

-- Indexes for fast lookups by entity
CREATE INDEX IF NOT EXISTS idx_photo_analyses_portfolio ON photo_analyses (linked_portfolio_id) WHERE linked_portfolio_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_photo_analyses_diary ON photo_analyses (linked_diary_entry_id) WHERE linked_diary_entry_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_photo_analyses_project ON photo_analyses (linked_project_id) WHERE linked_project_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_photo_analyses_quote ON photo_analyses (linked_quote_id) WHERE linked_quote_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_photo_analyses_invoice ON photo_analyses (linked_invoice_id) WHERE linked_invoice_id IS NOT NULL;

-- ELE-956: Quote versioning + variations
--
-- Quotes become versioned: a v2 supersedes v1 with a documented reason.
-- Used for renegotiations and on-site change orders ("customer added 2
-- sockets"). Each version is its own quote row linked via parent_quote_id;
-- only the latest accepted version is active. Final invoices reconcile from
-- the latest accepted version, with a "Variations on this job" panel listing
-- what was added/removed/changed across versions.

ALTER TABLE quotes
  ADD COLUMN IF NOT EXISTS parent_quote_id UUID
    REFERENCES quotes(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS version_number INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS supersedes_id UUID
    REFERENCES quotes(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS variation_reason TEXT,
  ADD COLUMN IF NOT EXISTS variation_type TEXT
    CHECK (variation_type IS NULL OR variation_type IN (
      'renegotiation',
      'change_order',
      'addition',
      'deletion',
      'correction'
    )),
  ADD COLUMN IF NOT EXISTS is_active_version BOOLEAN DEFAULT TRUE;

COMMENT ON COLUMN quotes.parent_quote_id IS
  'The original v1 quote this version chains from. NULL on v1 itself.';
COMMENT ON COLUMN quotes.version_number IS
  'Sequence within a chain — v1 is 1, first variation is 2, etc.';
COMMENT ON COLUMN quotes.supersedes_id IS
  'The quote this version directly supersedes (parent for v2, v2 for v3, etc.)';
COMMENT ON COLUMN quotes.variation_reason IS
  'Free-text explanation surfaced to the client in the public diff view.';
COMMENT ON COLUMN quotes.variation_type IS
  'Why this variation was raised — drives copy in client emails + diff view.';
COMMENT ON COLUMN quotes.is_active_version IS
  'TRUE for the version currently in force. FALSE on superseded versions.';

CREATE INDEX IF NOT EXISTS idx_quotes_parent_quote
  ON quotes(parent_quote_id) WHERE parent_quote_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_quotes_active_version_chain
  ON quotes(parent_quote_id, is_active_version)
  WHERE is_active_version = TRUE;

-- Status value 'superseded' added implicitly (text column, no enum).
-- Application code (useQuoteStorage.createVariation) sets:
--   - new row: parent_quote_id, supersedes_id, version_number, variation_*
--   - parent: status='superseded', is_active_version=FALSE

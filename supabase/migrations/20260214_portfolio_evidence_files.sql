-- P2: Portfolio Evidence Files junction table
-- Replaces the portfolio_items.storage_urls JSONB blob with a proper relational table.
-- Enables SQL-level queries, cascade deletes, and indexing on evidence files.

CREATE TABLE IF NOT EXISTS public.portfolio_evidence_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_item_id UUID NOT NULL REFERENCES public.portfolio_items(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL DEFAULT 'unknown',
  file_size BIGINT NOT NULL DEFAULT 0,
  storage_path TEXT, -- path within the portfolio-evidence bucket
  public_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_pef_portfolio_item ON public.portfolio_evidence_files(portfolio_item_id);
CREATE INDEX IF NOT EXISTS idx_pef_user ON public.portfolio_evidence_files(user_id);

-- RLS
ALTER TABLE public.portfolio_evidence_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own evidence files"
  ON public.portfolio_evidence_files FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own evidence files"
  ON public.portfolio_evidence_files FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own evidence files"
  ON public.portfolio_evidence_files FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own evidence files"
  ON public.portfolio_evidence_files FOR DELETE
  USING (auth.uid() = user_id);

-- Data migration: copy existing storage_urls JSONB entries into the new table.
-- Each element in storage_urls is: { id, name, type, size, url, uploadDate }
INSERT INTO public.portfolio_evidence_files (
  portfolio_item_id,
  user_id,
  file_name,
  file_type,
  file_size,
  public_url,
  metadata,
  created_at
)
SELECT
  pi.id AS portfolio_item_id,
  pi.user_id,
  COALESCE(f->>'name', 'Unknown') AS file_name,
  COALESCE(f->>'type', 'unknown') AS file_type,
  COALESCE((f->>'size')::bigint, 0) AS file_size,
  f->>'url' AS public_url,
  jsonb_build_object(
    'legacy_id', f->>'id',
    'upload_date', f->>'uploadDate'
  ) AS metadata,
  COALESCE((f->>'uploadDate')::timestamptz, pi.created_at) AS created_at
FROM public.portfolio_items pi,
  jsonb_array_elements(pi.storage_urls) AS f
WHERE pi.storage_urls IS NOT NULL
  AND jsonb_array_length(pi.storage_urls) > 0;

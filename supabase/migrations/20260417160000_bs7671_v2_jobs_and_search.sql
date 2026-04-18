-- ═══════════════════════════════════════════════════════════════════════════
-- BS 7671 v2 — ingest job tracking + hybrid search function
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 1. Ingest job tracking ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bs7671_ingest_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edition_id UUID NOT NULL REFERENCES public.bs7671_editions(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  -- pending → parsing → embedding → finalising → completed | failed | cancelled
  total_pages INTEGER,
  regulations_created INTEGER DEFAULT 0,
  chunks_staged INTEGER DEFAULT 0,
  chunks_embedded INTEGER DEFAULT 0,
  tables_created INTEGER DEFAULT 0,
  figures_created INTEGER DEFAULT 0,
  cross_refs_created INTEGER DEFAULT 0,
  error_message TEXT,
  started_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_bs7671_ingest_jobs_status
  ON public.bs7671_ingest_jobs(status);
CREATE INDEX IF NOT EXISTS idx_bs7671_ingest_jobs_edition
  ON public.bs7671_ingest_jobs(edition_id);

ALTER TABLE public.bs7671_ingest_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin manage bs7671_ingest_jobs" ON public.bs7671_ingest_jobs FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL));

CREATE POLICY "Service all bs7671_ingest_jobs" ON public.bs7671_ingest_jobs FOR ALL
  USING (true) WITH CHECK (true);

-- Temporary staging table for chunks awaiting embedding. Kept separate from
-- bs7671_chunks so partial ingests don't pollute the live table and so we can
-- batch-embed without blocking.
CREATE TABLE IF NOT EXISTS public.bs7671_chunks_staging (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.bs7671_ingest_jobs(id) ON DELETE CASCADE,
  edition_id UUID NOT NULL REFERENCES public.bs7671_editions(id) ON DELETE CASCADE,
  regulation_id UUID REFERENCES public.bs7671_regulations(id) ON DELETE CASCADE,
  chunk_type TEXT NOT NULL,
  content TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  page_number INTEGER,
  char_start INTEGER,
  char_end INTEGER,
  ocr_confidence NUMERIC(5,2),
  metadata JSONB DEFAULT '{}',
  embed_status TEXT DEFAULT 'pending',
  -- pending | embedded | skipped | failed
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bs7671_staging_job_status
  ON public.bs7671_chunks_staging(job_id, embed_status);

ALTER TABLE public.bs7671_chunks_staging ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service all bs7671_chunks_staging" ON public.bs7671_chunks_staging FOR ALL
  USING (true) WITH CHECK (true);

CREATE POLICY "Admin read bs7671_chunks_staging" ON public.bs7671_chunks_staging FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL));

-- ─── 2. Hybrid search RPC ───────────────────────────────────────────────
-- Combines three strategies, preferring cheaper over expensive:
--   (1) Exact reg-number match via btree index — sub-10ms
--   (2) Optional Part/Chapter/Appendix filter
--   (3) Vector similarity (HNSW index on embedding)
-- Caller supplies a query embedding (1 OpenAI call) and optional filters.
-- Returns chunks + their parent regulation metadata.

CREATE OR REPLACE FUNCTION public.search_bs7671_v2(
  query_embedding VECTOR(3072) DEFAULT NULL,
  reg_number_filter TEXT DEFAULT NULL,
  part_number_filter INTEGER DEFAULT NULL,
  chapter_number_filter INTEGER DEFAULT NULL,
  chunk_type_filter TEXT DEFAULT NULL,
  edition_filter UUID DEFAULT NULL,
  active_edition_only BOOLEAN DEFAULT TRUE,
  match_threshold NUMERIC DEFAULT 0.5,
  match_count INTEGER DEFAULT 10
)
RETURNS TABLE (
  chunk_id UUID,
  regulation_id UUID,
  reg_number TEXT,
  title TEXT,
  part TEXT,
  chapter TEXT,
  section TEXT,
  chunk_type TEXT,
  content TEXT,
  page_number INTEGER,
  edition_code TEXT,
  introduced_in TEXT,
  updated_in TEXT,
  similarity NUMERIC
) LANGUAGE plpgsql STABLE AS $$
DECLARE
  target_edition_id UUID;
BEGIN
  -- Resolve the edition context
  IF edition_filter IS NOT NULL THEN
    target_edition_id := edition_filter;
  ELSIF active_edition_only THEN
    SELECT id INTO target_edition_id FROM public.bs7671_editions WHERE is_active = true LIMIT 1;
  END IF;

  RETURN QUERY
  SELECT
    c.id AS chunk_id,
    r.id AS regulation_id,
    r.reg_number,
    r.title,
    r.part,
    r.chapter,
    r.section,
    c.chunk_type,
    c.content,
    c.page_number,
    e.edition_code,
    r.introduced_in,
    r.updated_in,
    CASE
      WHEN query_embedding IS NOT NULL THEN (1 - (c.embedding <=> query_embedding))::NUMERIC
      ELSE 1.0::NUMERIC
    END AS similarity
  FROM public.bs7671_chunks c
  LEFT JOIN public.bs7671_regulations r ON r.id = c.regulation_id
  JOIN public.bs7671_editions e ON e.id = c.edition_id
  WHERE
    (target_edition_id IS NULL OR c.edition_id = target_edition_id)
    AND (reg_number_filter IS NULL OR r.reg_number = reg_number_filter OR r.reg_number LIKE reg_number_filter || '%')
    AND (part_number_filter IS NULL OR r.part_number = part_number_filter)
    AND (chapter_number_filter IS NULL OR r.chapter_number = chapter_number_filter)
    AND (chunk_type_filter IS NULL OR c.chunk_type = chunk_type_filter)
    AND (query_embedding IS NULL OR (1 - (c.embedding <=> query_embedding)) >= match_threshold)
  ORDER BY
    -- Exact reg-number match wins hardest
    CASE WHEN reg_number_filter IS NOT NULL AND r.reg_number = reg_number_filter THEN 0 ELSE 1 END,
    -- Then similarity if embedding provided, else reg_number order
    CASE WHEN query_embedding IS NOT NULL THEN (c.embedding <=> query_embedding) ELSE 0 END ASC,
    r.reg_number
  LIMIT match_count;
END;
$$;

COMMENT ON FUNCTION public.search_bs7671_v2 IS
  'Hybrid search over bs7671 v2 knowledge. Exact reg-number match is fast-pathed (btree). Optional part/chapter/chunk_type filters. Vector similarity used if query_embedding provided. Defaults to active edition.';

-- ─── 3. Lookup helper — get full regulation with all chunks ─────────────
CREATE OR REPLACE FUNCTION public.get_bs7671_regulation(
  p_reg_number TEXT,
  p_edition_id UUID DEFAULT NULL
)
RETURNS TABLE (
  reg_id UUID,
  reg_number TEXT,
  title TEXT,
  part TEXT,
  chapter TEXT,
  section TEXT,
  full_text TEXT,
  page_number INTEGER,
  introduced_in TEXT,
  updated_in TEXT,
  edition_code TEXT,
  cross_refs TEXT[]
) LANGUAGE plpgsql STABLE AS $$
DECLARE
  target_edition UUID;
BEGIN
  IF p_edition_id IS NOT NULL THEN
    target_edition := p_edition_id;
  ELSE
    SELECT id INTO target_edition FROM public.bs7671_editions WHERE is_active = true LIMIT 1;
  END IF;

  RETURN QUERY
  SELECT
    r.id,
    r.reg_number,
    r.title,
    r.part,
    r.chapter,
    r.section,
    r.full_text,
    r.page_number,
    r.introduced_in,
    r.updated_in,
    e.edition_code,
    COALESCE(
      (SELECT ARRAY_AGG(DISTINCT cr.target_reg_number)
       FROM public.bs7671_cross_refs cr
       WHERE cr.source_reg_number = r.reg_number),
      ARRAY[]::TEXT[]
    ) AS cross_refs
  FROM public.bs7671_regulations r
  JOIN public.bs7671_editions e ON e.id = r.edition_id
  WHERE r.edition_id = target_edition AND r.reg_number = p_reg_number;
END;
$$;

COMMENT ON FUNCTION public.get_bs7671_regulation IS
  'Fetch a single regulation with its full text + outgoing cross-references in one call. Defaults to active edition.';

-- ═══════════════════════════════════════════════════════════════════════════
-- BS 7671 v2 — multimodal upgrade
--
-- Adds per-page vision captions + image storage so the RAG is genuinely
-- compliance-grade: the AI can actually SEE the figures, diagrams, tables and
-- warning labels that plain OCR text cannot capture.
--
-- Pipeline addition:
--   1. Client renders each page as PNG at 150 DPI
--   2. PNG uploaded to iet-docs/page-images/{edition_id}/page-N.png
--   3. Edge fn sends the PNG to GPT-5-mini vision with a focused prompt
--   4. Visual summary embedded (3072D) and stored here
--   5. When chunks are later embedded, the relevant page's visual summary is
--      concatenated onto the chunk text → the embedding encodes both text AND
--      visual context
--   6. search_bs7671_v2 returns page image URLs alongside text chunks so
--      Ask Dave / cert validators can show the actual diagram in answers
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.bs7671_page_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edition_id UUID NOT NULL REFERENCES public.bs7671_editions(id) ON DELETE CASCADE,
  page_number INTEGER NOT NULL,
  visual_summary TEXT NOT NULL,
  -- GPT-generated description of figures, tables, diagrams, photos, labels on the page.
  -- "TEXT_ONLY" when a page has no visual content worth captioning.
  has_figures BOOLEAN DEFAULT false,
  has_tables BOOLEAN DEFAULT false,
  has_diagrams BOOLEAN DEFAULT false,
  has_warnings BOOLEAN DEFAULT false,
  image_path TEXT,
  -- Storage path: 'page-images/{edition_id}/page-{N}.png' inside the iet-docs bucket
  embedding VECTOR(3072),
  -- Embedding of the visual_summary. Enables retrieval by visual intent
  -- ("show me an earthing diagram") not just textual.
  vision_model TEXT DEFAULT 'gpt-5-mini-2025-08-07',
  vision_cost_usd NUMERIC(10, 6),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (edition_id, page_number)
);

-- HNSW vector index — same reasoning as chunks table (3072D)
CREATE INDEX IF NOT EXISTS idx_bs7671_page_summaries_embedding
  ON public.bs7671_page_summaries
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

CREATE INDEX IF NOT EXISTS idx_bs7671_page_summaries_edition
  ON public.bs7671_page_summaries(edition_id);

CREATE INDEX IF NOT EXISTS idx_bs7671_page_summaries_has_figures
  ON public.bs7671_page_summaries(edition_id, page_number)
  WHERE has_figures = true OR has_tables = true OR has_diagrams = true;

ALTER TABLE public.bs7671_page_summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated read bs7671_page_summaries"
  ON public.bs7671_page_summaries FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin write bs7671_page_summaries" ON public.bs7671_page_summaries FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL));

CREATE POLICY "Service all bs7671_page_summaries" ON public.bs7671_page_summaries FOR ALL
  USING (true) WITH CHECK (true);

-- ─── Update job tracking to include vision progress ─────────────────────
ALTER TABLE public.bs7671_ingest_jobs
  ADD COLUMN IF NOT EXISTS pages_captioned INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS pages_captioned_total INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS vision_cost_total_usd NUMERIC(10, 4) DEFAULT 0;

-- ─── Extend the hybrid search to include page visuals ───────────────────
-- Replaces the original search_bs7671_v2 with a version that:
--   - Returns the chunk's page image URL (signed at call time by caller)
--   - Returns the page's visual summary
--   - Optionally boosts chunks whose page has high visual relevance to the query
CREATE OR REPLACE FUNCTION public.search_bs7671_v2(
  query_embedding VECTOR(3072) DEFAULT NULL,
  reg_number_filter TEXT DEFAULT NULL,
  part_number_filter INTEGER DEFAULT NULL,
  chapter_number_filter INTEGER DEFAULT NULL,
  chunk_type_filter TEXT DEFAULT NULL,
  edition_filter UUID DEFAULT NULL,
  active_edition_only BOOLEAN DEFAULT TRUE,
  match_threshold NUMERIC DEFAULT 0.5,
  match_count INTEGER DEFAULT 10,
  include_visuals BOOLEAN DEFAULT TRUE
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
  similarity NUMERIC,
  -- Visual context joined from bs7671_page_summaries when include_visuals = true
  page_image_path TEXT,
  page_visual_summary TEXT,
  page_has_figures BOOLEAN,
  page_has_tables BOOLEAN,
  page_has_diagrams BOOLEAN
) LANGUAGE plpgsql STABLE AS $$
DECLARE
  target_edition_id UUID;
BEGIN
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
    END AS similarity,
    CASE WHEN include_visuals THEN ps.image_path ELSE NULL END AS page_image_path,
    CASE WHEN include_visuals THEN ps.visual_summary ELSE NULL END AS page_visual_summary,
    CASE WHEN include_visuals THEN COALESCE(ps.has_figures, false) ELSE false END AS page_has_figures,
    CASE WHEN include_visuals THEN COALESCE(ps.has_tables, false) ELSE false END AS page_has_tables,
    CASE WHEN include_visuals THEN COALESCE(ps.has_diagrams, false) ELSE false END AS page_has_diagrams
  FROM public.bs7671_chunks c
  LEFT JOIN public.bs7671_regulations r ON r.id = c.regulation_id
  JOIN public.bs7671_editions e ON e.id = c.edition_id
  LEFT JOIN public.bs7671_page_summaries ps
    ON include_visuals AND ps.edition_id = c.edition_id AND ps.page_number = c.page_number
  WHERE
    (target_edition_id IS NULL OR c.edition_id = target_edition_id)
    AND (reg_number_filter IS NULL OR r.reg_number = reg_number_filter OR r.reg_number LIKE reg_number_filter || '%')
    AND (part_number_filter IS NULL OR r.part_number = part_number_filter)
    AND (chapter_number_filter IS NULL OR r.chapter_number = chapter_number_filter)
    AND (chunk_type_filter IS NULL OR c.chunk_type = chunk_type_filter)
    AND (query_embedding IS NULL OR (1 - (c.embedding <=> query_embedding)) >= match_threshold)
  ORDER BY
    CASE WHEN reg_number_filter IS NOT NULL AND r.reg_number = reg_number_filter THEN 0 ELSE 1 END,
    CASE WHEN query_embedding IS NOT NULL THEN (c.embedding <=> query_embedding) ELSE 0 END ASC,
    r.reg_number
  LIMIT match_count;
END;
$$;

-- ─── Dedicated visual search — find pages whose visuals match a query ──
-- e.g. "show me a TN-C-S earthing diagram" → returns matching page images
-- ranked by visual summary similarity. Useful when text retrieval misses
-- because the reg text only says "see Figure 2.1(i)".
CREATE OR REPLACE FUNCTION public.search_bs7671_visuals(
  query_embedding VECTOR(3072),
  edition_filter UUID DEFAULT NULL,
  active_edition_only BOOLEAN DEFAULT TRUE,
  require_figures BOOLEAN DEFAULT FALSE,
  match_threshold NUMERIC DEFAULT 0.5,
  match_count INTEGER DEFAULT 5
)
RETURNS TABLE (
  page_summary_id UUID,
  edition_id UUID,
  edition_code TEXT,
  page_number INTEGER,
  visual_summary TEXT,
  image_path TEXT,
  has_figures BOOLEAN,
  has_tables BOOLEAN,
  has_diagrams BOOLEAN,
  similarity NUMERIC
) LANGUAGE plpgsql STABLE AS $$
DECLARE
  target_edition_id UUID;
BEGIN
  IF edition_filter IS NOT NULL THEN
    target_edition_id := edition_filter;
  ELSIF active_edition_only THEN
    SELECT id INTO target_edition_id FROM public.bs7671_editions WHERE is_active = true LIMIT 1;
  END IF;

  RETURN QUERY
  SELECT
    ps.id AS page_summary_id,
    ps.edition_id,
    e.edition_code,
    ps.page_number,
    ps.visual_summary,
    ps.image_path,
    ps.has_figures,
    ps.has_tables,
    ps.has_diagrams,
    (1 - (ps.embedding <=> query_embedding))::NUMERIC AS similarity
  FROM public.bs7671_page_summaries ps
  JOIN public.bs7671_editions e ON e.id = ps.edition_id
  WHERE
    (target_edition_id IS NULL OR ps.edition_id = target_edition_id)
    AND ps.visual_summary IS NOT NULL
    AND ps.visual_summary <> 'TEXT_ONLY'
    AND (NOT require_figures OR ps.has_figures = true OR ps.has_tables = true OR ps.has_diagrams = true)
    AND (1 - (ps.embedding <=> query_embedding)) >= match_threshold
  ORDER BY ps.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

COMMENT ON TABLE public.bs7671_page_summaries IS
  'Per-page vision captions generated by GPT-5-mini. Captures figures, tables, diagrams, photos and warning labels that pure OCR text cannot. Embeddings enable visual-intent retrieval. image_path points to PNG in iet-docs/page-images/.';
COMMENT ON FUNCTION public.search_bs7671_v2 IS
  'Hybrid search with multimodal extensions. Returns text chunks joined with their page visual context (image URL, visual summary, has_figures flags). Set include_visuals=false to skip the join for purely textual queries.';
COMMENT ON FUNCTION public.search_bs7671_visuals IS
  'Dedicated visual search. Given a query embedding, finds pages whose visual content (figures/tables/diagrams) best matches. For queries like "show me earthing diagrams" where text retrieval alone misses.';

-- ═══════════════════════════════════════════════════════════════════════════
-- BS 7671 v2 knowledge schema
--
-- Replaces the single-table bs7671_embeddings + regulations_intelligence with a
-- normalised model that supports:
--   - multiple editions (2018+A3:2024, 2018+A4:2026, future amendments)
--   - multi-resolution chunks (regulation | paragraph | section | preamble)
--   - structured appendix tables (cable CCC, Zs limits) as JSONB not blobs
--   - figures + captions
--   - cross-reference graph (the "see 544.1.1" network)
--   - amendment provenance (when each reg was introduced / last updated)
--
-- Vectors are 3072D (text-embedding-3-large). HNSW index required since ivfflat
-- caps at 2000 dims.
--
-- Old bs7671_embeddings + regulations_intelligence stay live as read-only during
-- cutover. Nothing in this migration touches them.
-- ═══════════════════════════════════════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS vector;

-- ─── 1. Editions ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bs7671_editions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edition_code TEXT UNIQUE NOT NULL,
  -- e.g. '2018+A4:2026'
  base_edition TEXT NOT NULL,
  -- e.g. '2018'
  amendment TEXT NOT NULL,
  -- e.g. 'A4:2026'
  published_date DATE,
  source_pdf_path TEXT,
  -- Storage path in iet-docs bucket
  ocr_confidence_avg NUMERIC(5,2),
  is_active BOOLEAN DEFAULT false,
  -- Only the canonical current edition has is_active=true. Enforced partial UQ below.
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Only one active edition at a time
CREATE UNIQUE INDEX IF NOT EXISTS idx_bs7671_editions_single_active
  ON public.bs7671_editions(is_active) WHERE is_active = true;

-- ─── 2. Regulations (canonical numbered refs) ───────────────────────────
CREATE TABLE IF NOT EXISTS public.bs7671_regulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edition_id UUID NOT NULL REFERENCES public.bs7671_editions(id) ON DELETE CASCADE,
  reg_number TEXT NOT NULL,
  -- e.g. '411.3.3'
  title TEXT,
  part TEXT,
  -- e.g. 'Part 4 — Protection for Safety'
  part_number INTEGER,
  chapter TEXT,
  -- e.g. 'Chapter 41 — Protection Against Electric Shock'
  chapter_number INTEGER,
  section TEXT,
  -- e.g. '411 — Protective measure: automatic disconnection of supply'
  section_number TEXT,
  -- The parent section number (e.g. '411.3' for reg 411.3.3)
  introduced_in TEXT,
  -- First amendment that added this reg (e.g. 'A1:2020')
  updated_in TEXT,
  -- Most recent amendment that changed this reg (e.g. 'A4:2026')
  full_text TEXT,
  -- Cached consolidated text across all chunks (for fast display without joining chunks)
  page_number INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (edition_id, reg_number)
);

CREATE INDEX IF NOT EXISTS idx_bs7671_regulations_reg_number
  ON public.bs7671_regulations(reg_number);
CREATE INDEX IF NOT EXISTS idx_bs7671_regulations_part
  ON public.bs7671_regulations(part_number, chapter_number);
CREATE INDEX IF NOT EXISTS idx_bs7671_regulations_edition
  ON public.bs7671_regulations(edition_id);

-- ─── 3. Chunks (multi-resolution) ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bs7671_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edition_id UUID NOT NULL REFERENCES public.bs7671_editions(id) ON DELETE CASCADE,
  regulation_id UUID REFERENCES public.bs7671_regulations(id) ON DELETE CASCADE,
  -- Nullable: preamble / part intros / foreword have no regulation number
  chunk_type TEXT NOT NULL CHECK (chunk_type IN ('regulation', 'paragraph', 'section', 'preamble')),
  -- regulation = whole numbered reg as one retrieval unit
  -- paragraph  = finer-grained sub-chunk for precise retrieval
  -- section    = broader context (e.g. whole 411.3 section)
  -- preamble   = intros, prefaces, notes without a reg number
  content TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  -- md5/sha of normalised content — dedupes identical chunks on re-ingest
  embedding VECTOR(3072),
  page_number INTEGER,
  char_start INTEGER,
  char_end INTEGER,
  ocr_confidence NUMERIC(5,2),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (edition_id, content_hash)
);

-- HNSW vector index — required for 3072D (ivfflat caps at 2000)
CREATE INDEX IF NOT EXISTS idx_bs7671_chunks_embedding
  ON public.bs7671_chunks
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

CREATE INDEX IF NOT EXISTS idx_bs7671_chunks_edition
  ON public.bs7671_chunks(edition_id);
CREATE INDEX IF NOT EXISTS idx_bs7671_chunks_regulation
  ON public.bs7671_chunks(regulation_id);
CREATE INDEX IF NOT EXISTS idx_bs7671_chunks_type
  ON public.bs7671_chunks(chunk_type);
CREATE INDEX IF NOT EXISTS idx_bs7671_chunks_metadata
  ON public.bs7671_chunks USING GIN (metadata);

-- ─── 4. Tables (Appendix 4 cable CCC, etc.) ─────────────────────────────
CREATE TABLE IF NOT EXISTS public.bs7671_tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edition_id UUID NOT NULL REFERENCES public.bs7671_editions(id) ON DELETE CASCADE,
  table_number TEXT NOT NULL,
  -- e.g. '4D2A', '41.1', '7.1(i)'
  title TEXT,
  appendix TEXT,
  -- e.g. 'Appendix 4'
  structured_data JSONB,
  -- Parsed rows — shape depends on table type. Example for cable CCC:
  --   {"columns": ["csa", "installation_method", "ccc"], "rows": [...]}
  raw_text TEXT,
  -- Fallback when auto-parse fails or for embedding context
  embedding VECTOR(3072),
  -- Embed title + raw_text so semantic search finds "cable current capacity" etc.
  page_number INTEGER,
  auto_parse_confidence NUMERIC(5,2),
  -- 0-100: heuristic confidence that structured_data is correct
  reviewed BOOLEAN DEFAULT false,
  -- Admin flips this true after manual verification
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (edition_id, table_number)
);

CREATE INDEX IF NOT EXISTS idx_bs7671_tables_embedding
  ON public.bs7671_tables
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

CREATE INDEX IF NOT EXISTS idx_bs7671_tables_edition
  ON public.bs7671_tables(edition_id);
CREATE INDEX IF NOT EXISTS idx_bs7671_tables_reviewed
  ON public.bs7671_tables(reviewed) WHERE reviewed = false;

-- ─── 5. Figures ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bs7671_figures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edition_id UUID NOT NULL REFERENCES public.bs7671_editions(id) ON DELETE CASCADE,
  figure_number TEXT NOT NULL,
  -- e.g. '41.1', '2.1(i)'
  caption TEXT,
  embedding VECTOR(3072),
  -- Embed the caption so "diagram of TN-C-S earthing" matches Figure 2.1(i)
  page_number INTEGER,
  image_path TEXT,
  -- Optional: storage path if we extract the figure image itself
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (edition_id, figure_number)
);

CREATE INDEX IF NOT EXISTS idx_bs7671_figures_embedding
  ON public.bs7671_figures
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

CREATE INDEX IF NOT EXISTS idx_bs7671_figures_edition
  ON public.bs7671_figures(edition_id);

-- ─── 6. Cross-reference graph ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bs7671_cross_refs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_chunk_id UUID REFERENCES public.bs7671_chunks(id) ON DELETE CASCADE,
  source_reg_number TEXT,
  -- Denormalised for fast graph traversal without joining chunks
  target_reg_number TEXT NOT NULL,
  target_document_type TEXT DEFAULT 'bs7671',
  -- Future: 'gn3', 'osg' for cross-document refs
  ref_context TEXT,
  -- The sentence containing the reference (for citation display)
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bs7671_cross_refs_source_reg
  ON public.bs7671_cross_refs(source_reg_number);
CREATE INDEX IF NOT EXISTS idx_bs7671_cross_refs_target_reg
  ON public.bs7671_cross_refs(target_reg_number);

-- ─── 7. RLS ─────────────────────────────────────────────────────────────
ALTER TABLE public.bs7671_editions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bs7671_regulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bs7671_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bs7671_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bs7671_figures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bs7671_cross_refs ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read (needed for Ask Dave + cert validators)
CREATE POLICY "Authenticated read bs7671_editions"
  ON public.bs7671_editions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated read bs7671_regulations"
  ON public.bs7671_regulations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated read bs7671_chunks"
  ON public.bs7671_chunks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated read bs7671_tables"
  ON public.bs7671_tables FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated read bs7671_figures"
  ON public.bs7671_figures FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated read bs7671_cross_refs"
  ON public.bs7671_cross_refs FOR SELECT TO authenticated USING (true);

-- Admins can write (manual corrections, table review flip)
CREATE POLICY "Admin write bs7671_editions" ON public.bs7671_editions FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL));

CREATE POLICY "Admin write bs7671_regulations" ON public.bs7671_regulations FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL));

CREATE POLICY "Admin write bs7671_chunks" ON public.bs7671_chunks FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL));

CREATE POLICY "Admin write bs7671_tables" ON public.bs7671_tables FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL));

CREATE POLICY "Admin write bs7671_figures" ON public.bs7671_figures FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL));

CREATE POLICY "Admin write bs7671_cross_refs" ON public.bs7671_cross_refs FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL));

-- Service role (edge functions) ALL — RLS bypass via service key, explicit for clarity
CREATE POLICY "Service all bs7671_editions" ON public.bs7671_editions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service all bs7671_regulations" ON public.bs7671_regulations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service all bs7671_chunks" ON public.bs7671_chunks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service all bs7671_tables" ON public.bs7671_tables FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service all bs7671_figures" ON public.bs7671_figures FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service all bs7671_cross_refs" ON public.bs7671_cross_refs FOR ALL USING (true) WITH CHECK (true);

-- ─── 8. Updated-at trigger on editions ──────────────────────────────────
CREATE OR REPLACE FUNCTION public.touch_bs7671_editions_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_bs7671_editions_touch ON public.bs7671_editions;
CREATE TRIGGER trg_bs7671_editions_touch
  BEFORE UPDATE ON public.bs7671_editions
  FOR EACH ROW EXECUTE FUNCTION public.touch_bs7671_editions_updated_at();

-- ─── 9. Seed active edition (A4:2026) ───────────────────────────────────
INSERT INTO public.bs7671_editions (edition_code, base_edition, amendment, published_date, is_active, notes)
VALUES (
  '2018+A4:2026',
  '2018',
  'A4:2026',
  '2026-01-01',
  true,
  'Amendment 4 to BS 7671:2018. Adds AFDD requirements, TN-C-S (PNB) updates, new Schedule of Tests columns, model form changes. Ingested from scanned+OCR PDF (BS7671_merged.pdf on founder Desktop, 604 pages).'
)
ON CONFLICT (edition_code) DO NOTHING;

-- ─── 10. Storage bucket for source PDFs ─────────────────────────────────
-- The PDFs themselves live in storage (36MB+ blows through edge-fn 6MB body limit).
-- Ingest edge fn reads server-side from here.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'iet-docs',
  'iet-docs',
  false,
  -- Not public. Admin-only browse via signed URL.
  1073741824,
  -- 1GB ceiling per file. OCR'd + deskewed PDFs are big — BS7671 A4:2026 is 473MB at full
  -- resolution with --deskew. Compression would save size but compromise the "see it
  -- perfectly" requirement. Storage cost is trivial for 3-4 reference docs.
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO UPDATE
  SET file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Admins can upload / read / delete PDFs in this bucket
CREATE POLICY "Admins can manage iet-docs" ON storage.objects FOR ALL TO authenticated
  USING (
    bucket_id = 'iet-docs'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL)
  )
  WITH CHECK (
    bucket_id = 'iet-docs'
    AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND admin_role IS NOT NULL)
  );

-- ─── Comments ───────────────────────────────────────────────────────────
COMMENT ON TABLE public.bs7671_editions IS
  'One row per BS 7671 edition + amendment. Exactly one row has is_active=true (the canonical version Ask Dave queries). Historical editions retained for auditing.';
COMMENT ON TABLE public.bs7671_regulations IS
  'Canonical numbered regulations (e.g. 411.3.3). Hierarchy preserved via part/chapter/section columns. Amendment provenance via introduced_in / updated_in.';
COMMENT ON TABLE public.bs7671_chunks IS
  'Multi-resolution chunks with 3072D embeddings (text-embedding-3-large). Retrieve at regulation-level for citation queries, paragraph-level for precise, section-level for context. Dedup via (edition_id, content_hash).';
COMMENT ON TABLE public.bs7671_tables IS
  'Structured appendix tables (cable CCC, Zs, etc.) as JSONB. Enables exact numeric lookups that fuzzy embedding retrieval cannot do reliably. auto_parse_confidence flags tables that need human review before use.';
COMMENT ON TABLE public.bs7671_figures IS
  'Figure captions + page refs. Captions embedded so semantic search can surface "diagram of TN-C-S earthing" → Figure 2.1(i).';
COMMENT ON TABLE public.bs7671_cross_refs IS
  'Graph of inter-regulation references ("see 544.1.1"). Enables dependency traversal in Ask Dave and cert validators.';

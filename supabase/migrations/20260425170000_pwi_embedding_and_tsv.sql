-- ─────────────────────────────────────────────────────────────────────────
-- practical_work_intelligence — vector + BM25 readiness for Elec-AI
-- ─────────────────────────────────────────────────────────────────────────
-- Adds the embedding/tsv columns + helpers/indexes/RPCs needed to fan the
-- 200k practitioner-knowledge corpus into Elec-AI alongside bs7671_facets.
-- Applied live on 2026-04-25; this file captures the DDL for reproducibility.

-- ─── 1. tsv builder: IMMUTABLE so it can be used in generated columns / batch updates
CREATE OR REPLACE FUNCTION pwi_build_tsv(
  p_primary_topic text,
  p_equipment_category text,
  p_equipment_subcategory text,
  p_keywords text[],
  p_facet_type text,
  p_installation_method text,
  p_related_topics text[],
  p_bs7671_zones text[],
  p_common_defects text[],
  p_activity_types text[]
) RETURNS tsvector
LANGUAGE sql IMMUTABLE PARALLEL SAFE AS $$
  SELECT
    setweight(to_tsvector('english'::regconfig, coalesce(p_primary_topic, '')), 'A') ||
    setweight(to_tsvector('english'::regconfig, coalesce(p_equipment_category, '')), 'B') ||
    setweight(to_tsvector('english'::regconfig, coalesce(p_equipment_subcategory, '')), 'B') ||
    setweight(to_tsvector('english'::regconfig, coalesce(array_to_string(p_keywords, ' '), '')), 'B') ||
    setweight(to_tsvector('english'::regconfig, coalesce(p_facet_type, '')), 'C') ||
    setweight(to_tsvector('english'::regconfig, coalesce(p_installation_method, '')), 'C') ||
    setweight(to_tsvector('english'::regconfig, coalesce(array_to_string(p_related_topics, ' '), '')), 'C') ||
    setweight(to_tsvector('english'::regconfig, coalesce(array_to_string(p_bs7671_zones, ' '), '')), 'C') ||
    setweight(to_tsvector('english'::regconfig, coalesce(array_to_string(p_common_defects, ' '), '')), 'D') ||
    setweight(to_tsvector('english'::regconfig, coalesce(array_to_string(p_activity_types, ' '), '')), 'D')
$$;

-- ─── 2. Nullable bookkeeping/embedding columns (metadata-only ALTER)
ALTER TABLE practical_work_intelligence
  ADD COLUMN IF NOT EXISTS embedding halfvec(3072),
  ADD COLUMN IF NOT EXISTS embedding_status text,
  ADD COLUMN IF NOT EXISTS embedding_attempted_at timestamptz,
  ADD COLUMN IF NOT EXISTS embedding_error text,
  ADD COLUMN IF NOT EXISTS tsv tsvector;

COMMENT ON COLUMN practical_work_intelligence.embedding IS
  'halfvec(3072) — same encoder as bs7671_facets so vector results merge via RRF.';
COMMENT ON COLUMN practical_work_intelligence.embedding_status IS
  'pending | embedding | embedded | failed — drives the resumable bulk-embed job.';
COMMENT ON COLUMN practical_work_intelligence.tsv IS
  'Weighted tsvector populated by the embed driver. A=primary_topic, B=equipment+keywords, C=facet_type+method+topics+zones, D=defects+activities.';

-- ─── 3. Indexes (HNSW built post-bulk-embed in a separate concurrent step)
CREATE INDEX IF NOT EXISTS idx_pwi_tsv ON practical_work_intelligence USING gin (tsv);
CREATE INDEX IF NOT EXISTS idx_pwi_bs7671_regulations ON practical_work_intelligence USING gin (bs7671_regulations);
CREATE INDEX IF NOT EXISTS idx_pwi_keywords ON practical_work_intelligence USING gin (keywords);
CREATE INDEX IF NOT EXISTS idx_pwi_zones ON practical_work_intelligence USING gin (bs7671_zones);
CREATE INDEX IF NOT EXISTS idx_pwi_equipment_category
  ON practical_work_intelligence (equipment_category)
  WHERE equipment_category IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_pwi_facet_type
  ON practical_work_intelligence (facet_type)
  WHERE facet_type IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_pwi_embedding_pending
  ON practical_work_intelligence (id)
  WHERE embedding IS NULL;

-- HNSW: built post-bulk-embed via:
--   CREATE INDEX CONCURRENTLY idx_pwi_embedding
--     ON practical_work_intelligence USING hnsw (embedding halfvec_cosine_ops)
--     WITH (m = 16, ef_construction = 64);
-- Skipped here so the migration is fast on fresh installs; the bulk-embed
-- job creates it once data is populated.

-- ─── 4. Helpers used by the embed driver
CREATE OR REPLACE FUNCTION pwi_populate_tsv_for_ids(p_ids uuid[])
RETURNS void
LANGUAGE sql AS $$
  UPDATE practical_work_intelligence
  SET tsv = pwi_build_tsv(
    primary_topic, equipment_category, equipment_subcategory,
    keywords, facet_type, installation_method, related_topics,
    bs7671_zones, common_defects, activity_types
  )
  WHERE id = ANY(p_ids);
$$;

CREATE OR REPLACE FUNCTION pwi_apply_embedding_batch(
  p_ids uuid[],
  p_embeddings text[]
) RETURNS int
LANGUAGE plpgsql AS $$
DECLARE
  updated_count int;
BEGIN
  WITH input AS (
    SELECT
      unnest(p_ids) AS id,
      unnest(p_embeddings) AS emb
  ),
  upd AS (
    UPDATE practical_work_intelligence p
    SET
      embedding = (i.emb::halfvec(3072)),
      embedding_status = 'embedded',
      embedding_attempted_at = now(),
      embedding_error = NULL,
      tsv = pwi_build_tsv(
        p.primary_topic, p.equipment_category, p.equipment_subcategory,
        p.keywords, p.facet_type, p.installation_method, p.related_topics,
        p.bs7671_zones, p.common_defects, p.activity_types
      )
    FROM input i
    WHERE p.id = i.id
    RETURNING 1
  )
  SELECT COUNT(*) INTO updated_count FROM upd;
  RETURN updated_count;
END;
$$;

GRANT EXECUTE ON FUNCTION pwi_build_tsv(text, text, text, text[], text, text, text[], text[], text[], text[])
  TO service_role, authenticated, anon;
GRANT EXECUTE ON FUNCTION pwi_populate_tsv_for_ids(uuid[])
  TO service_role, authenticated, anon;
GRANT EXECUTE ON FUNCTION pwi_apply_embedding_batch(uuid[], text[])
  TO service_role, authenticated, anon;

-- ─── 5. Hybrid search RPC — vector + BM25 + RRF
-- Mirrors search_bs7671_v3 shape so the Elec-AI retrieval pipeline can fan
-- both queries in parallel and merge results without re-shaping.
CREATE OR REPLACE FUNCTION search_practical_v1(
  query_embedding halfvec(3072) DEFAULT NULL,
  query_text text DEFAULT NULL,
  equipment_filter text DEFAULT NULL,
  facet_type_filter text DEFAULT NULL,
  reg_filter text[] DEFAULT NULL,
  min_confidence numeric DEFAULT 0.5,
  match_count int DEFAULT 10,
  vector_weight numeric DEFAULT 1.0,
  bm25_weight numeric DEFAULT 1.0,
  rrf_k int DEFAULT 60
) RETURNS TABLE (
  facet_id uuid,
  primary_topic text,
  equipment_category text,
  equipment_subcategory text,
  facet_type text,
  installation_method text,
  bs7671_regulations text[],
  bs7671_zones text[],
  keywords text[],
  test_procedures jsonb,
  common_defects text[],
  troubleshooting_steps text[],
  inspection_checklist text[],
  acceptance_criteria jsonb,
  typical_duration_minutes integer,
  skill_level text,
  tools_required text[],
  confidence_score numeric,
  vector_score numeric,
  bm25_score numeric,
  rrf_score numeric,
  retrieval_source text
)
LANGUAGE sql STABLE PARALLEL SAFE AS $$
  WITH vector_candidates AS (
    SELECT
      pwi.id as fid,
      ROW_NUMBER() OVER (ORDER BY pwi.embedding <=> query_embedding) AS vrank,
      1 - (pwi.embedding <=> query_embedding)::numeric AS vscore
    FROM practical_work_intelligence pwi
    WHERE query_embedding IS NOT NULL
      AND pwi.embedding IS NOT NULL
      AND pwi.confidence_score >= min_confidence
      AND (equipment_filter IS NULL OR pwi.equipment_category = equipment_filter)
      AND (facet_type_filter IS NULL OR pwi.facet_type = facet_type_filter)
      AND (reg_filter IS NULL OR pwi.bs7671_regulations && reg_filter)
    ORDER BY pwi.embedding <=> query_embedding
    LIMIT GREATEST(match_count * 4, 40)
  ),
  bm25_candidates AS (
    SELECT
      pwi.id as fid,
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(pwi.tsv, websearch_to_tsquery('english', query_text)) DESC) AS brank,
      ts_rank_cd(pwi.tsv, websearch_to_tsquery('english', query_text))::numeric AS bscore
    FROM practical_work_intelligence pwi
    WHERE query_text IS NOT NULL AND query_text <> ''
      AND pwi.tsv @@ websearch_to_tsquery('english', query_text)
      AND pwi.confidence_score >= min_confidence
      AND (equipment_filter IS NULL OR pwi.equipment_category = equipment_filter)
      AND (facet_type_filter IS NULL OR pwi.facet_type = facet_type_filter)
      AND (reg_filter IS NULL OR pwi.bs7671_regulations && reg_filter)
    ORDER BY ts_rank_cd(pwi.tsv, websearch_to_tsquery('english', query_text)) DESC
    LIMIT GREATEST(match_count * 4, 40)
  ),
  fused AS (
    SELECT
      coalesce(v.fid, b.fid) AS fid,
      v.vscore,
      b.bscore,
      (vector_weight * COALESCE(1.0 / (rrf_k + v.vrank), 0))
        + (bm25_weight * COALESCE(1.0 / (rrf_k + b.brank), 0)) AS rrf
    FROM vector_candidates v
    FULL OUTER JOIN bm25_candidates b ON b.fid = v.fid
  )
  SELECT
    pwi.id,
    pwi.primary_topic,
    pwi.equipment_category,
    pwi.equipment_subcategory,
    pwi.facet_type,
    pwi.installation_method,
    pwi.bs7671_regulations,
    pwi.bs7671_zones,
    pwi.keywords,
    to_jsonb(pwi.test_procedures) as test_procedures,
    pwi.common_defects,
    pwi.troubleshooting_steps,
    pwi.inspection_checklist,
    pwi.acceptance_criteria,
    pwi.typical_duration_minutes,
    pwi.skill_level,
    pwi.tools_required,
    pwi.confidence_score,
    f.vscore,
    f.bscore,
    f.rrf,
    CASE
      WHEN f.vscore IS NOT NULL AND f.bscore IS NOT NULL THEN 'hybrid'
      WHEN f.vscore IS NOT NULL THEN 'vector'
      ELSE 'bm25'
    END AS retrieval_source
  FROM fused f
  JOIN practical_work_intelligence pwi ON pwi.id = f.fid
  ORDER BY f.rrf DESC
  LIMIT match_count;
$$;

GRANT EXECUTE ON FUNCTION search_practical_v1(halfvec, text, text, text, text[], numeric, int, numeric, numeric, int)
  TO service_role, authenticated, anon;

COMMENT ON FUNCTION search_practical_v1 IS
  'Hybrid (vector + BM25 + RRF) search over practical_work_intelligence. Mirrors search_bs7671_v3 shape so both can be fanned in parallel from the Elec-AI retrieval pipeline.';

-- search_bs7671_v3 — fix multi-word query recall
--
-- Problem: the original used `websearch_to_tsquery` which AND-joins all words.
-- A natural-language query like "Max Zs for B32 TN-S" required every token to
-- appear in the same facet → 0 results, even though 281 Zs-related facets
-- exist. Compounded by the edge function not passing query_embedding, so the
-- vector path was empty too — leaving only strict-AND BM25.
--
-- Fix: build TWO tsqueries. Strict-AND (websearch) for high-precision phrase
-- matches, plus a relaxed OR-of-stemmed-tokens so partial matches still surface
-- and rank below strict matches via ts_rank_cd. Hyphens / slashes / other
-- non-word chars are stripped before tsquery construction so inputs like
-- "TN-S" or "B32/C20" don't choke to_tsquery.
--
-- Verified: "Max Zs for B32 TN-S" → 5 relevant facets (was 0).
-- Regression check: simple queries ("Zs", "earthing TN-C-S", "RCD type B
-- disconnection time", "Table 41.3", "supplementary bonding bathroom") all
-- still return relevant results.

CREATE OR REPLACE FUNCTION public.search_bs7671_v3(
  query_embedding halfvec DEFAULT NULL::halfvec,
  query_text text DEFAULT NULL::text,
  document_types text[] DEFAULT NULL::text[],
  reg_number_filter text DEFAULT NULL::text,
  zones_filter text[] DEFAULT NULL::text[],
  system_types_filter text[] DEFAULT NULL::text[],
  equipment_filter text DEFAULT NULL::text,
  protection_filter text DEFAULT NULL::text,
  facet_type_filter text DEFAULT NULL::text,
  match_count integer DEFAULT 20,
  vector_weight numeric DEFAULT 0.6,
  bm25_weight numeric DEFAULT 0.4,
  rrf_k integer DEFAULT 60,
  expand_graph boolean DEFAULT true,
  graph_expand_limit integer DEFAULT 5
)
RETURNS TABLE(
  facet_id uuid, chunk_id uuid, regulation_id uuid, reg_number text, reg_title text,
  part text, chapter text, section text, edition_code text, document_type text,
  page_number integer, facet_type text, primary_topic text, content text,
  context_prefix text, system_types text[], bs7671_zones text[],
  equipment_category text, protection_method text, keywords text[],
  page_image_path text, page_visual_summary text,
  vector_score numeric, bm25_score numeric, rrf_score numeric,
  retrieval_source text
)
LANGUAGE plpgsql
STABLE
AS $function$
DECLARE
  ts_query TSQUERY;
  ts_query_strict TSQUERY;
  cleaned_text text;
BEGIN
  IF query_text IS NOT NULL AND length(trim(query_text)) > 0 THEN
    ts_query_strict := websearch_to_tsquery('english', query_text);

    cleaned_text := regexp_replace(query_text, '[^[:alnum:][:space:]]+', ' ', 'g');
    BEGIN
      ts_query := to_tsquery(
        'english',
        replace(plainto_tsquery('english', cleaned_text)::text, ' & ', ' | ')
      );
    EXCEPTION WHEN OTHERS THEN
      ts_query := ts_query_strict;
    END;
    IF ts_query IS NULL OR ts_query::text = '' THEN
      ts_query := ts_query_strict;
    END IF;
  END IF;

  RETURN QUERY
  WITH
  candidates AS (
    SELECT f.*
    FROM public.bs7671_facets f
    WHERE
      (document_types IS NULL OR f.document_type = ANY(document_types))
      AND (reg_number_filter IS NULL OR EXISTS (
        SELECT 1 FROM public.bs7671_regulations r
        WHERE r.id = f.regulation_id
          AND (r.reg_number = reg_number_filter OR r.reg_number LIKE reg_number_filter || '%')
      ))
      AND (zones_filter IS NULL OR f.bs7671_zones && zones_filter)
      AND (system_types_filter IS NULL OR f.system_types && system_types_filter)
      AND (equipment_filter IS NULL OR f.equipment_category = equipment_filter)
      AND (protection_filter IS NULL OR f.protection_method = protection_filter)
      AND (facet_type_filter IS NULL OR f.facet_type = facet_type_filter)
  ),
  vector_ranked AS (
    SELECT
      f.id,
      ROW_NUMBER() OVER (ORDER BY f.embedding <=> query_embedding) AS rank_v,
      (1 - (f.embedding <=> query_embedding))::NUMERIC AS score_v
    FROM candidates f
    WHERE query_embedding IS NOT NULL AND f.embedding IS NOT NULL
    ORDER BY f.embedding <=> query_embedding
    LIMIT match_count * 4
  ),
  bm25_ranked AS (
    SELECT
      f.id,
      ROW_NUMBER() OVER (ORDER BY ts_rank_cd(f.tsv, ts_query) DESC) AS rank_b,
      ts_rank_cd(f.tsv, ts_query)::NUMERIC AS score_b
    FROM candidates f
    WHERE ts_query IS NOT NULL AND f.tsv @@ ts_query
    ORDER BY ts_rank_cd(f.tsv, ts_query) DESC
    LIMIT match_count * 4
  ),
  fused AS (
    SELECT
      COALESCE(v.id, b.id) AS id,
      COALESCE(v.score_v, 0) AS vector_score,
      COALESCE(b.score_b, 0) AS bm25_score,
      (
        vector_weight * COALESCE(1.0 / (rrf_k + v.rank_v), 0)
        + bm25_weight * COALESCE(1.0 / (rrf_k + b.rank_b), 0)
      )::NUMERIC AS rrf_score,
      CASE
        WHEN v.id IS NOT NULL AND b.id IS NOT NULL THEN 'hybrid'
        WHEN v.id IS NOT NULL THEN 'vector'
        ELSE 'bm25'
      END AS retrieval_source
    FROM vector_ranked v
    FULL OUTER JOIN bm25_ranked b ON v.id = b.id
  ),
  graph_expanded_reg_ids AS (
    SELECT DISTINCT cr.target_reg_number
    FROM public.bs7671_cross_refs cr
    JOIN fused ON fused.id IN (SELECT id FROM fused)
    JOIN public.bs7671_facets f ON f.id = fused.id
    JOIN public.bs7671_regulations r ON r.id = f.regulation_id
    WHERE expand_graph
      AND cr.source_reg_number = r.reg_number
    LIMIT graph_expand_limit
  ),
  graph_facets AS (
    SELECT
      f.id,
      0::NUMERIC AS vector_score,
      0::NUMERIC AS bm25_score,
      (0.1 / rrf_k)::NUMERIC AS rrf_score,
      'graph_expand'::TEXT AS retrieval_source
    FROM public.bs7671_facets f
    JOIN public.bs7671_regulations r ON r.id = f.regulation_id
    WHERE expand_graph
      AND r.reg_number IN (SELECT target_reg_number FROM graph_expanded_reg_ids)
      AND f.id NOT IN (SELECT id FROM fused)
    LIMIT graph_expand_limit * 3
  ),
  all_hits AS (
    SELECT * FROM fused
    UNION ALL
    SELECT * FROM graph_facets
  )
  SELECT
    f.id AS facet_id,
    c.id AS chunk_id,
    r.id AS regulation_id,
    r.reg_number,
    r.title AS reg_title,
    r.part,
    r.chapter,
    r.section,
    e.edition_code,
    e.document_type,
    c.page_number,
    f.facet_type,
    f.primary_topic,
    f.content,
    f.context_prefix,
    f.system_types,
    f.bs7671_zones,
    f.equipment_category,
    f.protection_method,
    f.keywords,
    ps.image_path AS page_image_path,
    ps.visual_summary AS page_visual_summary,
    ah.vector_score,
    ah.bm25_score,
    ah.rrf_score,
    ah.retrieval_source
  FROM all_hits ah
  JOIN public.bs7671_facets f ON f.id = ah.id
  JOIN public.bs7671_chunks c ON c.id = f.chunk_id
  LEFT JOIN public.bs7671_regulations r ON r.id = f.regulation_id
  JOIN public.bs7671_editions e ON e.id = f.edition_id
  LEFT JOIN public.bs7671_page_summaries ps
    ON ps.edition_id = f.edition_id AND ps.page_number = c.page_number
  ORDER BY ah.rrf_score DESC
  LIMIT match_count;
END;
$function$;

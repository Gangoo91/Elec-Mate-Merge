-- Resolve qualification_requirement_mappings inside match_qualification_acs so a
-- learner enrolled under a mapped code (e.g. EAL 603/3895/8) retrieves the ACs
-- stored under the canonical requirement code (601/7345/2). Canonical codes that
-- already have direct rows are unaffected.
--
-- Also corrects the 8202 qualification title (was mislabelled "T Level"; 8202 is
-- the C&G Level 3 Advanced Technical Diploma in Electrical Installation — the real
-- C&G T Level is 8710, for which we hold no LO/AC data).

CREATE OR REPLACE FUNCTION public.match_qualification_acs(
  q_embedding vector, qual_code text, max_results integer DEFAULT 12,
  similarity_threshold double precision DEFAULT 0.5)
RETURNS TABLE(id uuid, qualification_code text, unit_code text, unit_title text,
  lo_number integer, lo_text text, ac_code text, ac_text text, similarity double precision)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
  WITH resolved AS (
    SELECT CASE
      WHEN EXISTS (SELECT 1 FROM public.qualification_requirements WHERE qualification_code = qual_code)
        THEN qual_code
      ELSE COALESCE(
        (SELECT requirement_code FROM public.qualification_requirement_mappings
          WHERE qualification_code = qual_code AND is_primary = true LIMIT 1),
        qual_code)
    END AS code
  )
  SELECT qr.id, qr.qualification_code, qr.unit_code, qr.unit_title, qr.lo_number,
    qr.lo_text, qr.ac_code, qr.ac_text, 1 - (qr.embedding <=> q_embedding) AS similarity
  FROM public.qualification_requirements qr, resolved
  WHERE qr.qualification_code = resolved.code
    AND qr.embedding IS NOT NULL
    AND 1 - (qr.embedding <=> q_embedding) >= similarity_threshold
  ORDER BY qr.embedding <=> q_embedding ASC
  LIMIT max_results;
$function$;

UPDATE qualifications
SET title = 'Level 3 Advanced Technical Diploma in Electrical Installation', updated_at = NOW()
WHERE code = '8202'
  AND title <> 'Level 3 Advanced Technical Diploma in Electrical Installation';

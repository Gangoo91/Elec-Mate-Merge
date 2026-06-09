import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { ValidationError, handleError } from '../_shared/errors.ts';
import { validateRequired } from '../_shared/validation.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { captureException } from '../_shared/sentry.ts';

// BS 7671 RAG search — queries bs7671_facets (A4:2026 BS 7671 + GN3 + OSG)
// via the search_bs7671_v3 RPC. No embedding required (text-only BM25 + RRF).
//
// Backward-compatible response shape: { success, regulations, query, resultsCount, searchMethod, requestId }
// Fast-path: if the query contains a regulation number (e.g. "411.3.2"),
// look it up directly in bs7671_regulations + bs7671_facets first.

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'bs7671-rag-search' });

  try {
    const body = await req.json();
    const query: string = body.query;
    const matchCount: number =
      typeof body.match_count === 'number'
        ? body.match_count
        : typeof body.matchCount === 'number'
          ? body.matchCount
          : 8;
    const documentTypes: string[] | undefined = Array.isArray(body.document_types)
      ? body.document_types
      : Array.isArray(body.documentTypes)
        ? body.documentTypes
        : undefined;

    validateRequired(query, 'query');

    if (matchCount < 1 || matchCount > 50) {
      throw new ValidationError('match_count must be between 1 and 50');
    }

    logger.info('BS 7671 RAG search initiated (A4:2026 facets)', {
      query,
      matchCount,
      documentTypes,
    });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // ── Fast path: direct regulation-number lookup ───────────────────────
    const extractRegulationNumbers = (q: string): string[] => {
      const regPattern = /\b(\d{3}(?:\.\d+){0,2})\b/g;
      const matches = q.match(regPattern) || [];
      return [...new Set(matches)];
    };

    const regNumbers = extractRegulationNumbers(query);
    if (regNumbers.length > 0) {
      logger.debug('Trying direct regulation lookup first', { regNumbers });

      const { data: regs, error: regError } = await supabase
        .from('bs7671_regulations')
        .select(
          'id, reg_number, title, part, chapter, section, full_text, page_number, edition_id, bs7671_editions(edition_code, document_type, amendment, is_active)'
        )
        .in('reg_number', regNumbers)
        .limit(matchCount);

      if (!regError && regs && regs.length > 0) {
        const activeRegs = regs.filter(
          (r: any) => r.bs7671_editions?.is_active !== false
        );

        if (activeRegs.length > 0) {
          logger.info('✅ Direct regulation lookup succeeded', { count: activeRegs.length });

          const regulations = activeRegs.map((r: any) => ({
            id: r.id,
            regulation_number: r.reg_number,
            section: r.section || '',
            content: r.full_text || r.title,
            amendment: r.bs7671_editions?.amendment || '',
            edition_code: r.bs7671_editions?.edition_code || '',
            document_type: r.bs7671_editions?.document_type || 'bs7671',
            page_number: r.page_number,
            metadata: { part: r.part, chapter: r.chapter, title: r.title },
            similarity: 0.95,
          }));

          return new Response(
            JSON.stringify({
              success: true,
              regulations,
              query,
              resultsCount: regulations.length,
              searchMethod: 'direct',
              requestId,
            }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 200,
            }
          );
        }
      }
    }

    // ── Hybrid search via search_bs7671_v3 (queries bs7671_facets) ────────
    logger.debug('Hybrid search via search_bs7671_v3', { documentTypes });

    const { data: facetResults, error: searchError } = await logger.time(
      'search_bs7671_v3',
      () =>
        withTimeout(
          supabase.rpc('search_bs7671_v3', {
            query_text: query,
            document_types: documentTypes ?? null,
            match_count: matchCount,
          }),
          Timeouts.STANDARD,
          'BS 7671 facet hybrid search'
        )
    );

    if (searchError) {
      logger.error('search_bs7671_v3 error', { error: searchError });
      throw searchError;
    }

    logger.info('Facet search completed', {
      resultsCount: facetResults?.length || 0,
    });

    const regulations = (facetResults || []).map((f: any) => ({
      id: f.facet_id,
      regulation_number: f.reg_number || '',
      section: f.section || '',
      content: f.context_prefix ? `${f.context_prefix}\n\n${f.content}` : f.content,
      amendment: '', // edition_code carries the amendment info
      edition_code: f.edition_code || '',
      document_type: f.document_type || 'bs7671',
      page_number: f.page_number,
      metadata: {
        part: f.part,
        chapter: f.chapter,
        title: f.reg_title,
        primary_topic: f.primary_topic,
        facet_type: f.facet_type,
        zones: f.bs7671_zones,
        equipment: f.equipment_category,
        protection: f.protection_method,
        keywords: f.keywords,
      },
      similarity: typeof f.rrf_score === 'number' ? f.rrf_score : 0.8,
    }));

    return new Response(
      JSON.stringify({
        success: true,
        regulations,
        query,
        resultsCount: regulations.length,
        searchMethod: 'facet_hybrid_v3',
        requestId,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    await captureException(error, { functionName: 'bs7671-rag-search', requestUrl: req.url, requestMethod: req.method });
    logger.error('BS 7671 RAG search error', {
      error: error instanceof Error ? error.message : String(error),
    });
    return handleError(error);
  }
});

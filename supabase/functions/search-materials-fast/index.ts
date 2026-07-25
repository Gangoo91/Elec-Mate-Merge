import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { ValidationError, handleError } from '../_shared/errors.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { captureException } from '../_shared/sentry.ts';
import { searchMaterials } from '../_shared/marketplace-pricing.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'search-materials-fast' });

  try {
    const {
      query,
      categoryFilter,
      supplierFilter,
      limit = 50,
      similarityThreshold = 0.2,
      // ELE-1393 — trade-phrase synonyms expanded client-side (single source of
      // truth: src/data/materialSynonyms.ts). e.g. "2 gang socket" arrives with
      // ["double socket","twin socket","13a double",…] so the search matches
      // supplier/catalogue names that only use the formal wording.
      expansions = [],
    } = await req.json();

    // Input validation
    if (!query || query.trim().length === 0) {
      throw new ValidationError('Search query is required');
    }
    if (limit < 1 || limit > 100) {
      throw new ValidationError('Limit must be between 1 and 100');
    }

    // Search terms = the typed query plus any synonym expansions, deduped
    // case-insensitively and capped so a phrase never fans out to a huge number
    // of parallel searches.
    const extraTerms = Array.isArray(expansions)
      ? expansions.map((t: unknown) => String(t ?? '').trim()).filter(Boolean)
      : [];
    const seenTerm = new Set<string>();
    const searchTerms: string[] = [];
    for (const t of [query.trim(), ...extraTerms]) {
      const key = t.toLowerCase();
      if (t && !seenTerm.has(key)) {
        seenTerm.add(key);
        searchTerms.push(t);
      }
    }
    const boundedTerms = searchTerms.slice(0, 6);

    logger.info('Fuzzy search initiated', {
      query,
      categoryFilter,
      supplierFilter,
      limit,
      similarityThreshold,
    });

    // Connect to Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // ── Live pipeline + trade catalogue, in parallel.
    // Live prices go through the SAME tuned matcher as the AI cost engineer
    // (cost_engineer_match_product RPC via _shared/marketplace-pricing):
    // relevance-ranked, junk-name exclusion, cable boosts, category-aware
    // with broad fallback — so wizard prices always agree with AI prices.
    const liveCategory = categoryFilter && categoryFilter !== 'all' ? categoryFilter : null;
    const supplier = supplierFilter && supplierFilter !== 'all' ? supplierFilter : null;

    // Run the live pipeline + catalogue fuzzy search for every term in
    // parallel, then merge. With one term (no synonyms) this is the same two
    // searches as before; with synonyms it unions the matches.
    const perTerm = await logger.time(
      'live pipeline + catalogue search (all terms, parallel)',
      async () =>
        await Promise.all(
          boundedTerms.map(async (term) => {
            const [live, cat] = await Promise.all([
              searchMaterials(supabase, {
                query: term,
                category: liveCategory,
                limit: Math.min(16, limit),
              }).catch((err) => {
                logger.error('Live marketplace search failed', { error: err, term });
                return [];
              }),
              supabase.rpc('search_materials_fuzzy', {
                search_query: term,
                category_filter: liveCategory,
                supplier_filter: supplier,
                similarity_threshold: similarityThreshold,
                result_limit: limit,
              }),
            ]);
            if (cat?.error) {
              logger.error('Fuzzy search failed', { error: cat.error, term });
            }
            return { live: ((live as any[]) || []), cat: ((cat?.data as any[]) || []) };
          })
        )
    );

    const liveHits = perTerm.flatMap((r) => r.live);
    const catalogueRows = perTerm.flatMap((r) => r.cat);

    const liveMaterials = (liveHits || []).map((hit: any) => ({
      id: hit.id,
      name: hit.name,
      category: hit.category || 'Materials',
      price: `£${(hit.unitPrice || 0).toFixed(2)}`,
      priceValue: Number(hit.unitPrice) || 0,
      supplier: hit.supplier || hit.brand || 'Supplier',
      image: hit.imageUrl || '/placeholder.svg',
      stockStatus: hit.stockStatus || 'Unknown',
      productUrl: hit.productUrl,
      scrapedAt: hit.scrapedAt,
      isOnSale: !!hit.isOnSale,
      discountPercentage: hit.discountPercentage ? Number(hit.discountPercentage) : 0,
      regularPrice: hit.regularPrice ? Number(hit.regularPrice) : null,
      highlights: [],
      similarity: 1,
      isFuzzyMatch: false,
      source: 'live',
    }));

    const catalogueMaterials = (catalogueRows || []).map((item: any) => ({
      id: item.id,
      name: item.item_name,
      category: item.category || 'Materials',
      price: typeof item.base_cost === 'number' ? `£${item.base_cost.toFixed(2)}` : '£0.00',
      priceValue: typeof item.base_cost === 'number' ? item.base_cost : 0,
      supplier: item.wholesaler || 'Unknown',
      image: '/placeholder.svg',
      stockStatus: item.in_stock ? 'In Stock' : 'Out of Stock',
      productUrl: item.product_url,
      highlights: [],
      similarity: item.similarity_score,
      isFuzzyMatch: item.similarity_score < 0.8,
      source: 'catalogue',
    }))
      // Best trigram matches first so they survive the limit when synonym
      // terms have widened the result set.
      .sort((a, b) => (b.similarity || 0) - (a.similarity || 0));

    // Live pipeline prices lead; catalogue backfills. Dedup rows repeated
    // across synonym terms and cap to the requested limit.
    const seenRow = new Set<string>();
    const materials = [...liveMaterials, ...catalogueMaterials]
      .filter((m) => {
        const key = `${m.source}:${m.id ?? m.name}`;
        if (seenRow.has(key)) return false;
        seenRow.add(key);
        return true;
      })
      .slice(0, limit);

    // Get suggestions if no results found
    let suggestions: string[] = [];
    if (materials.length === 0) {
      // Try a more relaxed search to get suggestions
      const { data: suggestionResults } = await supabase.rpc('search_materials_fuzzy', {
        search_query: query.trim(),
        category_filter: null,
        supplier_filter: null,
        similarity_threshold: 0.1,
        result_limit: 5,
      });

      if (suggestionResults && suggestionResults.length > 0) {
        suggestions = suggestionResults.map((item: any) => item.item_name);
      }
    }

    logger.info('Fuzzy search completed successfully', {
      materialsCount: materials.length,
      hasSuggestions: suggestions.length > 0,
      requestId,
    });

    return new Response(
      JSON.stringify({
        success: true,
        materials,
        query,
        resultsCount: materials.length,
        searchMethod: 'live_pipeline+fuzzy_trigram',
        suggestions,
        filters: {
          category: categoryFilter,
          supplier: supplierFilter,
        },
        requestId,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    await captureException(error, { functionName: 'search-materials-fast', requestUrl: req.url, requestMethod: req.method });
    logger.error('Fuzzy search failed', { error });
    return handleError(error);
  }
});

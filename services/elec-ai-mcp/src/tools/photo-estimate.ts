/**
 * Photo estimate tool — estimate_from_photo
 * Photo-to-quote pipeline: analyse photo -> extract materials -> lookup pricing -> generate quote.
 */

import type { UserContext } from '../auth.js';
import { analysePhoto } from './vision.js';
import { lookupPricingGuidance } from './knowledge.js';
import { generateQuote } from './quoting.js';
import { attachPhotoToEntity } from './vision.js';

export async function estimateFromPhoto(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.image_url !== 'string' || args.image_url.trim().length === 0) {
    throw new Error('image_url is required');
  }

  // 1. Analyse the photo
  const analysis = await analysePhoto(
    {
      image_url: args.image_url,
      context: typeof args.context === 'string' ? args.context : undefined,
    },
    user
  );

  // 2. Check if it's a receipt (wrong tool)
  if (analysis.analysis_type === 'receipt') {
    throw new Error(
      'This appears to be a receipt, not a job. Use add_receipt_to_quote or add_receipt_to_invoice instead.'
    );
  }

  // 3. Extract material keywords from analysis
  const observations: Array<{ description?: string; recommendation?: string }> =
    Array.isArray(analysis.observations) ? analysis.observations : [];
  const summary = typeof analysis.summary === 'string' ? analysis.summary : '';
  const details = typeof analysis.details === 'object' && analysis.details ? analysis.details : {};
  const jobDescription =
    typeof args.job_description === 'string' ? args.job_description : '';

  // Build a search query from observations + summary + job description
  const materialKeywords = [
    summary,
    jobDescription,
    ...observations.map((o) => o.description || ''),
    ...observations.map((o) => o.recommendation || ''),
  ]
    .filter(Boolean)
    .join(' ')
    .slice(0, 500); // Limit query length

  // 4. Lookup pricing guidance from RAG
  let pricingData: Record<string, unknown> = {};
  try {
    pricingData = (await lookupPricingGuidance({ query: materialKeywords }, user)) as Record<
      string,
      unknown
    >;
  } catch {
    // RAG lookup failed — continue without pricing data
  }

  // 5. Build estimated line items from analysis
  const estimatedItems: Array<{
    description: string;
    category: string;
    quantity: number;
    unit_price: number;
    unit: string;
    source: string;
  }> = [];

  // Extract items from RAG pricing results
  const ragResults = Array.isArray(pricingData.results) ? pricingData.results : [];
  for (const result of ragResults.slice(0, 10)) {
    if (typeof result !== 'object' || result === null) continue;
    const r = result as Record<string, unknown>;
    const itemDesc = (r.title as string) || (r.description as string) || '';
    const price = typeof r.price === 'number' ? r.price : typeof r.unit_price === 'number' ? r.unit_price : 0;

    if (itemDesc && price > 0) {
      estimatedItems.push({
        description: itemDesc,
        category: 'materials',
        quantity: 1,
        unit_price: price,
        unit: (r.unit as string) || 'each',
        source: 'RAG pricing database',
      });
    }
  }

  // Extract board details if consumer unit analysis
  const boardDetails = details as Record<string, unknown>;
  if (analysis.analysis_type === 'consumer_unit' && boardDetails.board_make) {
    const boardDesc = `${boardDetails.board_make || ''} ${boardDetails.board_model || ''} consumer unit`.trim();
    const totalWays = typeof boardDetails.total_ways === 'number' ? boardDetails.total_ways : 0;

    if (!estimatedItems.some((i) => i.description.toLowerCase().includes('consumer unit'))) {
      estimatedItems.push({
        description: `${boardDesc}${totalWays > 0 ? ` (${totalWays}-way)` : ''}`,
        category: 'materials',
        quantity: 1,
        unit_price: 0,
        unit: 'each',
        source: 'Photo analysis — verify price with supplier',
      });
    }
  }

  const estimatedTotal = estimatedItems.reduce(
    (sum, item) => sum + item.quantity * item.unit_price,
    0
  );

  // 6. Create quote if client_data provided
  let quoteId: string | undefined;
  let quoteNumber: string | undefined;

  if (typeof args.client_data === 'object' && args.client_data !== null) {
    try {
      const quoteItems = estimatedItems.map((item) => ({
        description: item.description,
        category: item.category,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        unit: item.unit,
        notes: `Source: ${item.source}`,
      }));

      if (quoteItems.length > 0) {
        const quoteResult = (await generateQuote(
          {
            client_data: args.client_data,
            items: quoteItems,
            notes: `Estimate based on photo analysis. Verify quantities and prices on site.\n\nPhoto analysis: ${summary}`,
          },
          user
        )) as Record<string, unknown>;

        quoteId = quoteResult.quote_id as string;
        quoteNumber = quoteResult.quote_number as string;

        // Link photo to quote
        if (quoteId && analysis.photo_analysis_id) {
          try {
            await attachPhotoToEntity(
              {
                image_url: args.image_url,
                entity_type: 'quote',
                entity_id: quoteId,
              },
              user
            );
          } catch {
            // Photo linking failed — non-critical
          }
        }
      }
    } catch {
      // Quote creation failed — still return the estimate
    }
  }

  return {
    photo_analysis_id: analysis.photo_analysis_id,
    analysis_summary: summary,
    estimated_items: estimatedItems,
    estimated_total: Math.round(estimatedTotal * 100) / 100,
    quote_id: quoteId,
    quote_number: quoteNumber,
    message: 'Estimate based on photo analysis. Verify quantities on site.',
  };
}

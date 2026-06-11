import type { SiteVisit } from '@/types/siteVisit';
import type { SurveyAnalysisResult } from '@/types/surveyAnalysis';
import type { QuoteItem } from '@/types/quote';
import { ACCESSORY_TYPES } from '@/data/siteVisit/accessoryTypes';
import { getRoomLabel } from '@/data/siteVisit/roomTypes';

/**
 * Transforms a site visit's captured scope into QuoteItem[] for the quote
 * wizard WITHOUT prices. The hardcoded FALLBACK_PRICES table is gone
 * (a double socket was £5.50 forever; unknown items silently priced £0) —
 * real prices come from the site-survey AI analysis when available
 * (transformAnalysisToQuoteItems below); this is the unpriced fallback and
 * every line is explicitly marked so nothing reads as deliberately free.
 */
export function transformScopeToQuoteItems(visit: SiteVisit): QuoteItem[] {
  const items: QuoteItem[] = [];

  for (const room of visit.rooms) {
    const roomLabel = room.roomName || getRoomLabel(room.roomType);

    for (const item of room.items) {
      const accessory = ACCESSORY_TYPES.find((a) => a.id === item.itemType);

      items.push({
        id: crypto.randomUUID(),
        description: `${roomLabel} — ${item.itemDescription}`,
        quantity: item.quantity,
        unit: item.unit || accessory?.defaultUnit || 'each',
        unitPrice: 0,
        totalPrice: 0,
        category: 'materials',
        subcategory: roomLabel,
        // No marker note: item notes print on the client PDF. Zero-priced
        // lines are flagged to the electrician in the quote wizard instead.
      });
    }
  }

  return items;
}

/**
 * Transforms a completed site-survey AI analysis into QuoteItem[] —
 * live-priced materials plus the labour estimate the old handoff dropped.
 */
export function transformAnalysisToQuoteItems(analysis: SurveyAnalysisResult): QuoteItem[] {
  const items: QuoteItem[] = [];

  for (const material of analysis.materials_list || []) {
    const unitPrice = Number(material.est_price_gbp) || 0;
    items.push({
      id: crypto.randomUUID(),
      description: material.description,
      quantity: material.quantity || 1,
      unit: material.unit || 'each',
      unitPrice,
      totalPrice: unitPrice * (material.quantity || 1),
      category: 'materials',
      // Deliberately NO notes: item notes render on the client-facing quote
      // PDF — supplier names leak sourcing/margin and internal price flags
      // read badly. Zero-priced lines are surfaced in the wizard instead.
    });
  }

  const labour = analysis.labour_estimate;
  const labourTotal = Number(analysis.cost_summary?.labour_gbp) || 0;
  const totalHours = Number(labour?.total_hours) || 0;
  if (totalHours > 0 && labourTotal > 0) {
    const hourlyRate = Math.round((labourTotal / totalHours) * 100) / 100;
    const breakdown = (labour.breakdown || []).map((t) => `${t.task} (${t.hours}h)`).join(' · ');
    items.push({
      id: crypto.randomUUID(),
      description: 'Electrical installation labour',
      quantity: totalHours,
      unit: 'hours',
      unitPrice: hourlyRate,
      totalPrice: labourTotal,
      category: 'labour',
      hours: totalHours,
      hourlyRate,
      notes: breakdown || undefined,
    });
  }

  return items;
}

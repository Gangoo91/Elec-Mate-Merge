/**
 * Quote/Invoice calculations (ELE-888 + ELE-891).
 *
 * Order of operations on the way to a grand total:
 *   1. Per-item adjustment   — `itemAdjustmentPercent` on each line
 *   2. Per-category adjustment — `settings.categoryAdjustments`
 *   3. Global discount         — `settings.discount{Enabled,Type,Value}`
 *   4. Overhead + profit (invoice flow only)
 *   5. VAT                     — applied on the net post-discount amount
 *
 * Anything calling this should treat the returned values as the source of
 * truth. The hooks (useQuoteBuilder, useInvoiceBuilder) wrap this; UI
 * surfaces (QuoteDetailView, PublicQuoteView, PDF templates) read from it.
 */

import type { QuoteItem, QuoteSettings } from '@/types/quote';

type Cat = 'labour' | 'materials' | 'equipment' | 'manual';

export interface CategoryBreakdown {
  category: Cat;
  rawSubtotal: number;
  itemAdjustedSubtotal: number;
  categoryAdjustmentPercent: number;
  categoryAdjustmentDelta: number;
  finalSubtotal: number;
}

export interface QuoteTotals {
  itemAdjustedSubtotal: number;
  categoryAdjustmentDelta: number;
  subtotal: number;
  discountAmount: number;
  netAfterDiscount: number;
  overhead: number;
  profit: number;
  vatAmount: number;
  total: number;
  categories: CategoryBreakdown[];
}

const round2 = (n: number) => Math.round(n * 100) / 100;

export function getItemBaseTotal(item: QuoteItem): number {
  return (item.quantity || 0) * (item.unitPrice || 0);
}

export function getItemAdjustedTotal(item: QuoteItem): number {
  const base = getItemBaseTotal(item);
  const adj = item.itemAdjustmentPercent;
  if (typeof adj === 'number' && adj !== 0) {
    return base * (1 + adj / 100);
  }
  return base;
}

function categoryKey(item: QuoteItem): Cat {
  return (item.category as Cat) || 'manual';
}

function getCategoryAdjustmentPercent(
  category: Cat,
  settings?: QuoteSettings | null
): number {
  const adjustments = settings?.categoryAdjustments;
  if (!adjustments) return 0;
  if (category === 'labour') return adjustments.labour || 0;
  if (category === 'materials') return adjustments.materials || 0;
  if (category === 'equipment') return adjustments.equipment || 0;
  return 0;
}

export function buildCategoryBreakdowns(
  items: QuoteItem[],
  settings?: QuoteSettings | null
): CategoryBreakdown[] {
  const buckets: Record<string, CategoryBreakdown> = {};
  for (const item of items) {
    const cat = categoryKey(item);
    if (!buckets[cat]) {
      buckets[cat] = {
        category: cat,
        rawSubtotal: 0,
        itemAdjustedSubtotal: 0,
        categoryAdjustmentPercent: getCategoryAdjustmentPercent(cat, settings),
        categoryAdjustmentDelta: 0,
        finalSubtotal: 0,
      };
    }
    buckets[cat].rawSubtotal += getItemBaseTotal(item);
    buckets[cat].itemAdjustedSubtotal += getItemAdjustedTotal(item);
  }

  for (const bucket of Object.values(buckets)) {
    const adjPct = bucket.categoryAdjustmentPercent;
    if (adjPct !== 0) {
      bucket.categoryAdjustmentDelta = bucket.itemAdjustedSubtotal * (adjPct / 100);
    }
    bucket.finalSubtotal = bucket.itemAdjustedSubtotal + bucket.categoryAdjustmentDelta;
  }
  return Object.values(buckets);
}

interface ComputeOptions {
  /** Invoice flow uses overhead+profit; quote flow leaves them at 0. */
  applyOverheadAndProfit?: boolean;
}

/**
 * Returns items with per-category markup absorbed into their unit / total
 * prices when `absorbCategoryAdjustments` is true. Used by customer-facing
 * surfaces (PublicQuoteView, PDF payload) when the electrician has opted
 * in via `settings.hideMarkupFromCustomer` — the markup line is hidden in
 * the totals block and instead baked into the line items so the subtotal
 * still reconciles to the sum of displayed items.
 *
 * Per-item adjustments (`itemAdjustmentPercent`) are already baked into
 * `getItemAdjustedTotal` and are left visible on the line — those are
 * typically transparent labels (evening rate etc.) that the customer
 * expects to see. Only per-category markup is hidden here.
 */
export function getDisplayItems(
  items: QuoteItem[],
  settings: QuoteSettings | null | undefined,
  opts: { absorbCategoryAdjustments?: boolean } = {}
): QuoteItem[] {
  if (!opts.absorbCategoryAdjustments) return items;
  const adjustments = settings?.categoryAdjustments;
  if (!adjustments) return items;
  return items.map((item) => {
    const pct = getCategoryAdjustmentPercent(categoryKey(item), settings);
    if (pct === 0) return item;
    const multiplier = 1 + pct / 100;
    const baseQty = item.quantity || 0;
    const itemAdjusted = getItemAdjustedTotal(item);
    const newTotal = round2(itemAdjusted * multiplier);
    const newUnit = baseQty > 0 ? round2(newTotal / baseQty) : item.unitPrice;
    return { ...item, unitPrice: newUnit, totalPrice: newTotal };
  });
}

export function computeQuoteTotals(
  items: QuoteItem[],
  settings: QuoteSettings | null | undefined,
  options: ComputeOptions = {}
): QuoteTotals {
  const categories = buildCategoryBreakdowns(items, settings);

  const itemAdjustedSubtotal = round2(
    categories.reduce((sum, c) => sum + c.itemAdjustedSubtotal, 0)
  );
  const categoryAdjustmentDelta = round2(
    categories.reduce((sum, c) => sum + c.categoryAdjustmentDelta, 0)
  );
  const subtotal = round2(itemAdjustedSubtotal + categoryAdjustmentDelta);

  const overhead = options.applyOverheadAndProfit
    ? round2(subtotal * ((settings?.overheadPercentage || 0) / 100))
    : 0;
  const profit = options.applyOverheadAndProfit
    ? round2((subtotal + overhead) * ((settings?.profitMargin || 0) / 100))
    : 0;

  const baseForDiscount = subtotal + overhead + profit;
  let discountAmount = 0;
  if (settings?.discountEnabled && (settings.discountValue || 0) > 0) {
    if (settings.discountType === 'percentage') {
      discountAmount = baseForDiscount * ((settings.discountValue || 0) / 100);
    } else {
      discountAmount = Math.min(settings.discountValue || 0, baseForDiscount);
    }
  }
  discountAmount = round2(discountAmount);

  const netAfterDiscount = round2(baseForDiscount - discountAmount);
  const vatAmount = settings?.vatRegistered
    ? round2(netAfterDiscount * ((settings.vatRate || 0) / 100))
    : 0;
  const total = round2(netAfterDiscount + vatAmount);

  return {
    itemAdjustedSubtotal,
    categoryAdjustmentDelta,
    subtotal,
    discountAmount,
    netAfterDiscount,
    overhead,
    profit,
    vatAmount,
    total,
    categories,
  };
}

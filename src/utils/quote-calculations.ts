/**
 * Quote/Invoice calculations (ELE-888 + ELE-891).
 *
 * Order of operations on the way to a grand total:
 *   1. Per-item adjustment   — `itemAdjustmentPercent` on each line
 *   2. Per-category adjustment — `settings.categoryAdjustments`
 *   3. Global discount         — `settings.discount{Enabled,Type,Value}`
 *   4. VAT                     — applied on the net post-discount amount
 *
 * ELE-1473 — there is no overhead/profit step any more. Quotes and invoices
 * both price off the line items alone, so the same job produces the same
 * total in either. Profit is carried by the hourly rate and the material
 * markup, both of which move the line prices the customer can see.
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
  reverseCharge: boolean;
  notionalVat: number;
  labourNet: number;
  cisRate: number;
  cisAmount: number;
  /** ELE-1571 — third-party grant taken off the VAT-INCLUSIVE total. */
  grantAmount: number;
  grantLabel: string;
  netPayable: number;
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
  /**
   * ELE-1473 — LEGACY ONLY. Do not set this on any new quote or invoice.
   *
   * Overhead and profit percentages are no longer applied to quotes or
   * invoices. Profit belongs in what the electrician actually prices: their
   * hourly rate and their material markup (see `categoryAdjustments` and the
   * per-item markup in InvoiceItemsStep). Adding a further percentage on top
   * of those double-counted it, and because there was no line item for it the
   * customer-facing total silently disagreed with the quote for the same job.
   *
   * Reported three times before it was traced: ELE-326 (Mar 2026),
   * ELE-1010 (May 2026), ELE-1473 (Aug 2026).
   *
   * This flag survives for ONE reason: invoices raised before the removal have
   * `overhead`/`profit` amounts stored against them, and their CIS deduction
   * was withheld from a labour share of a base that included those amounts.
   * Re-rendering such an invoice must reproduce the figures that were issued.
   * Gate it on stored values (`overhead > 0 || profit > 0`), never on settings.
   */
  legacyOverheadAndProfit?: boolean;
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

  // Always 0 for anything raised today — see `legacyOverheadAndProfit`.
  const overhead = options.legacyOverheadAndProfit
    ? round2(subtotal * ((settings?.overheadPercentage || 0) / 100))
    : 0;
  const profit = options.legacyOverheadAndProfit
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
  // Under VAT reverse charge (DRC) the subcontractor charges £0 VAT — the
  // customer accounts for it to HMRC. We still expose the notional VAT below.
  const vatAmount =
    settings?.vatRegistered && !settings?.reverseCharge
      ? round2(netAfterDiscount * ((settings.vatRate || 0) / 100))
      : 0;
  const total = round2(netAfterDiscount + vatAmount);

  // ── CIS + VAT reverse charge (construction invoicing) ────────────────
  // Reverse charge (DRC): VAT is £0 on the invoice; we state the notional VAT
  // so the customer can account for it to HMRC.
  const reverseCharge = !!settings?.reverseCharge;
  const notionalVat = reverseCharge
    ? round2(netAfterDiscount * ((settings?.vatRate ?? 20) / 100))
    : 0;
  // CIS is withheld from the LABOUR element only, ex-VAT. We take labour's
  // share of the post-discount net, so any overhead/profit/discount is
  // allocated proportionally; for a plain labour+materials invoice this is
  // simply the labour subtotal.
  const labourFinal = categories.find((c) => c.category === 'labour')?.finalSubtotal ?? 0;
  const labourNet = subtotal > 0 ? round2(netAfterDiscount * (labourFinal / subtotal)) : 0;
  const cisRate = settings?.cisEnabled ? settings?.cisRate || 0 : 0;
  const cisAmount = settings?.cisEnabled ? round2(labourNet * (cisRate / 100)) : 0;

  /*
   * ELE-1571 — third-party grant (OZEV EV chargepoint grant and similar).
   *
   * Deliberately NOT the existing discount, which comes off the ex-VAT net and
   * has VAT recalculated on the reduced figure. A grant is not a price
   * reduction: it is consideration paid by a third party, so VAT remains due
   * on the FULL value of the supply and only the customer's share falls.
   * Running it through the discount would under-declare VAT to HMRC.
   *
   * So it behaves exactly like CIS — a deduction from the gross total, after
   * VAT, leaving `total` and `vatAmount` untouched:
   *
   *   £1,000 inc VAT − £500 grant = £500 for the customer to pay,
   *   with VAT still declared on the full £1,000.
   *
   * Capped at what is left after CIS so the payable can never go negative —
   * a stale grant on a quote later reduced would otherwise show a credit.
   */
  const grantLabel = (settings?.grantLabel || '').trim() || 'Grant';
  const rawGrant = settings?.grantEnabled ? Number(settings?.grantAmount) || 0 : 0;
  const afterCis = round2(total - cisAmount);
  const grantAmount = rawGrant > 0 ? round2(Math.min(rawGrant, Math.max(0, afterCis))) : 0;

  // What the customer actually pays once CIS is withheld and any grant applied.
  const netPayable = round2(afterCis - grantAmount);

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
    reverseCharge,
    notionalVat,
    labourNet,
    cisRate,
    cisAmount,
    grantAmount,
    grantLabel,
    netPayable,
    categories,
  };
}

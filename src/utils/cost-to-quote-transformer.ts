import { QuoteItem, Quote, QuoteClient, JobDetails, QuoteSettings } from '@/types/quote';
import { v4 as uuidv4 } from 'uuid';

export interface CostEngineerMaterial {
  item: string;
  quantity: number;
  unitPrice: number;
  supplier: string;
  total: number;
}

export interface CostEngineerOutput {
  materials: CostEngineerMaterial[];
  labour: {
    hours: number;
    rate: number;
    total: number;
  };
  totalCost: number;
  /**
   * The price the electrician CHOSE on the results screen (minimum / target /
   * premium tier), ex VAT. Materials at cost plus labour is break-even; the
   * tier adds overheads, contingency and profit. When set, the lines are
   * scaled so the quote comes to this figure. Only the Cost Engineer results
   * screen sets it, so older callers keep their behaviour.
   */
  sellTotalExVat?: number;
  /** The materials markup the estimate used (e.g. 15) — materials go on the quote at cost + this. */
  materialsMarkupPercent?: number;
  vatAmount?: number;
  breakdown?: {
    materialsTotal: number;
    labourTotal: number;
  };
  valueEngineering?: string[];
}

/**
 * Transforms Cost Engineer output into Quote Builder format
 * Converts AI-generated cost breakdown into formal quotation items
 */
export function transformCostOutputToQuoteItems(
  costOutput: CostEngineerOutput,
  conversationId?: string
): QuoteItem[] {
  const quoteItems: QuoteItem[] = [];

  // Add material items
  costOutput.materials.forEach((material) => {
    quoteItems.push({
      id: uuidv4(),
      description: material.item,
      quantity: material.quantity,
      unit: determineUnit(material.item),
      unitPrice: material.unitPrice,
      totalPrice: material.total,
      category: 'materials',
      subcategory: categorizeMaterial(material.item),
      materialCode: generateMaterialCode(material.item),
      notes: `Supplier: ${material.supplier}`,
    });
  });

  // Add labour item
  if (costOutput.labour.hours > 0) {
    quoteItems.push({
      id: uuidv4(),
      description: 'Electrical Installation Labour',
      quantity: costOutput.labour.hours,
      unit: 'hours',
      unitPrice: costOutput.labour.rate,
      totalPrice: costOutput.labour.total,
      category: 'labour',
      workerType: 'Qualified Electrician',
      hours: costOutput.labour.hours,
      hourlyRate: costOutput.labour.rate,
    });
  }

  return priceToSellTotal(quoteItems, costOutput.sellTotalExVat, costOutput.materialsMarkupPercent);
}

/**
 * Materials at cost + the estimate's own markup (prices a client can check
 * online stay believable), and the rest of the chosen price — overheads,
 * contingency, profit — carried by the labour rate, which is how a trade
 * quote is normally built. Falls back to an even lift when there is no
 * labour line or the remainder would put labour below cost.
 */
export function priceToSellTotal(
  items: QuoteItem[],
  sellTotal?: number,
  markupPercent?: number
): QuoteItem[] {
  if (!sellTotal || !(sellTotal > 0)) return items;
  const round2 = (n: number) => Math.round(n * 100) / 100;
  const labourIdx = items.findIndex((i) => i.category === 'labour');
  const labour = labourIdx >= 0 ? items[labourIdx] : null;
  const markup = Number.isFinite(markupPercent) ? Math.max(0, Number(markupPercent)) : 0;
  if (labour && Number(labour.quantity) > 0) {
    const materials = items
      .filter((_, k) => k !== labourIdx)
      .map((i) => {
        const unitPrice = round2((Number(i.unitPrice) || 0) * (1 + markup / 100));
        return { ...i, unitPrice, totalPrice: round2(unitPrice * (Number(i.quantity) || 0)) };
      });
    const materialsSell = materials.reduce((s, i) => s + i.totalPrice, 0);
    const labourSell = round2(sellTotal - materialsSell);
    if (labourSell >= (Number(labour.totalPrice) || 0)) {
      const rate = round2(labourSell / Number(labour.quantity));
      const out = [...materials];
      out.splice(labourIdx, 0, {
        ...labour,
        unitPrice: rate,
        hourlyRate: rate,
        totalPrice: round2(rate * Number(labour.quantity)),
      });
      // A rate rounded to the penny over 200 hours misses by pence; settle
      // them on a quantity-1 line so the quote equals the chosen price.
      const drift = round2(sellTotal - out.reduce((s, i) => s + i.totalPrice, 0));
      // The dearest quantity-1 line, so the pennies can never push a line
      // below zero (review).
      let one = -1;
      out.forEach((i, k) => {
        if (k !== labourIdx && Number(i.quantity) === 1 && (one < 0 || i.totalPrice > out[one].totalPrice)) one = k;
      });
      if (drift !== 0 && one >= 0 && out[one].totalPrice + drift > 0) {
        const price = round2(out[one].totalPrice + drift);
        out[one] = { ...out[one], unitPrice: price, totalPrice: price };
      }
      return out;
    }
  }
  return scaleToSellTotal(items, sellTotal);
}

/**
 * 10 Oct 2026 — the tier price used to be dropped on the way to the quote:
 * the lines carried materials at cost plus labour (break-even), so a job
 * priced at "Target £26,244" arrived as a £15,968 quote, the margin gone
 * without a word. Every line is lifted by the same factor so the quote
 * totals the chosen price; the client sees sell prices, not a margin line.
 * The last line absorbs the rounding so the total lands to the penny.
 */
export function scaleToSellTotal(items: QuoteItem[], sellTotal?: number): QuoteItem[] {
  const base = items.reduce((s, i) => s + (Number(i.totalPrice) || 0), 0);
  if (!sellTotal || !(sellTotal > 0) || base <= 0 || Math.abs(sellTotal - base) < 0.01)
    return items;
  const factor = sellTotal / base;
  const round2 = (n: number) => Math.round(n * 100) / 100;
  const scaled = items.map((i) => {
    const unitPrice = round2((Number(i.unitPrice) || 0) * factor);
    return {
      ...i,
      unitPrice,
      totalPrice: round2(unitPrice * (Number(i.quantity) || 0)),
      ...(i.hourlyRate !== undefined ? { hourlyRate: unitPrice } : {}),
    };
  });
  const drift = round2(sellTotal - scaled.reduce((s, i) => s + i.totalPrice, 0));
  // The quote builder re-prices every line as quantity × unit price, so
  // rounding pennies only survive on a quantity-1 line. Without one, the
  // total lands within a few pence of the tier, which is fine.
  let idx = -1;
  scaled.forEach((i, k) => {
    if (Number(i.quantity) === 1 && (idx < 0 || i.totalPrice > scaled[idx].totalPrice)) idx = k;
  });
  if (drift !== 0 && idx >= 0 && scaled[idx].totalPrice + drift > 0) {
    const it = scaled[idx];
    const totalPrice = round2(it.totalPrice + drift);
    scaled[idx] = { ...it, totalPrice, unitPrice: totalPrice };
  }
  return scaled;
}

/**
 * Creates a complete Quote object from Cost Engineer output
 */
export function createQuoteFromCostOutput(
  costOutput: CostEngineerOutput,
  client: QuoteClient,
  jobDetails: JobDetails,
  settings: Partial<QuoteSettings> = {},
  conversationId?: string
): Partial<Quote> {
  const items = transformCostOutputToQuoteItems(costOutput, conversationId);

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  // ELE-1473 — no overhead/profit percentage is added here. The Cost Engineer
  // already prices to sell: its own margin settings (target/min/max margin and
  // per-job overhead, set in BusinessSettingsDialog) shape the rates and prices
  // in `costOutput`. Adding a further 15% + 20% on top double-counted the
  // margin and produced a quote total the electrician could not account for.
  const defaultSettings: QuoteSettings = {
    overheadPercentage: 0,
    profitMargin: 0,
    vatRate: settings.vatRate || 20,
    vatRegistered: settings.vatRegistered ?? true,
  };

  const overhead = 0;
  const profit = 0;
  const vatAmount = defaultSettings.vatRegistered ? subtotal * (defaultSettings.vatRate / 100) : 0;
  const total = subtotal + vatAmount;

  return {
    quoteNumber: generateQuoteNumber(),
    client,
    jobDetails,
    items,
    settings: defaultSettings,
    subtotal,
    overhead,
    profit,
    vatAmount,
    total,
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    notes: costOutput.valueEngineering?.join('\n'),
  };
}

function determineUnit(itemName: string): string {
  const itemLower = itemName.toLowerCase();

  if (itemLower.includes('cable') || itemLower.includes('wire')) return 'metres';
  if (itemLower.includes('conduit') || itemLower.includes('trunking')) return 'metres';
  if (itemLower.includes('mcb') || itemLower.includes('rcbo') || itemLower.includes('switch'))
    return 'units';
  if (itemLower.includes('board') || itemLower.includes('panel')) return 'units';
  if (itemLower.includes('socket') || itemLower.includes('light')) return 'units';
  if (itemLower.includes('clip') || itemLower.includes('cleat')) return 'units';

  return 'units';
}

function categorizeMaterial(itemName: string): string {
  const itemLower = itemName.toLowerCase();

  if (itemLower.includes('cable') || itemLower.includes('wire')) return 'Cables & Conductors';
  if (itemLower.includes('mcb') || itemLower.includes('rcbo') || itemLower.includes('rcd'))
    return 'Protection Devices';
  if (itemLower.includes('board') || itemLower.includes('panel') || itemLower.includes('enclosure'))
    return 'Distribution Equipment';
  if (itemLower.includes('socket') || itemLower.includes('switch')) return 'Accessories';
  if (itemLower.includes('conduit') || itemLower.includes('trunking')) return 'Cable Management';
  if (itemLower.includes('clip') || itemLower.includes('cleat') || itemLower.includes('tie'))
    return 'Fixings & Supports';

  return 'General Materials';
}

function generateMaterialCode(itemName: string): string {
  const category = categorizeMaterial(itemName)
    .replace(/[^A-Z]/g, '')
    .substring(0, 3);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${category}-${random}`;
}

function generateQuoteNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().substring(2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `Q${year}${month}-${random}`;
}

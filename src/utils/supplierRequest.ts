/**
 * A price-free materials list for a merchant (ELE-1795, from ELE-1118).
 *
 * The site-visit "Wholesaler RFQ" built this text inline; a finished quote
 * needs the same thing — the electrician's prices must never reach the
 * merchant — so the list and the message live here, shared by both.
 */
import type { QuoteItem } from '@/types/quote';

export interface SupplierLine {
  id: string;
  quantity: number;
  unit: string;
  description: string;
  /** Sent unless the electrician unticks it. */
  include: boolean;
  /** Where it came from, for the sheet's grouping. */
  kind: 'materials' | 'equipment' | 'other';
}

/** Counted, not measured: shown as "2 × Double socket", not "2 each — …". */
const COUNT_UNITS = /^(?:each|ea|item|items|no\.?|nr|pcs?|pieces?|units?|x)?$/i;

/** Past this, mail apps and WhatsApp cut a prefilled message off. */
export const MAX_PREFILL_URL = 1800;

/** One line of the message: "• 100 m — 2.5mm T&E" or "• 2 × Double socket". */
export const supplierLineText = (l: Pick<SupplierLine, 'quantity' | 'unit' | 'description'>) => {
  const qty = Number.isInteger(l.quantity) ? String(l.quantity) : String(+l.quantity.toFixed(2));
  return COUNT_UNITS.test((l.unit || '').trim())
    ? `• ${qty} × ${l.description.trim()}`
    : `• ${qty} ${l.unit.trim()} — ${l.description.trim()}`;
};

/** One spelling per unit, so "m", "metres" and "M" merge into one line. */
const UNIT_ALIASES: [RegExp, string][] = [
  [/^(?:m|mtrs?|metres?|meters?)$/i, 'm'],
  [/^(?:each|ea|item|items|no\.?|nr|pcs?|pieces?|units?|x)?$/i, 'each'],
  [/^(?:packs?|pkts?|packets?)$/i, 'pack'],
  [/^(?:box|boxes|bx)$/i, 'box'],
  [/^(?:rolls?|reels?|drums?)$/i, 'roll'],
  [/^(?:lengths?|lgths?)$/i, 'length'],
];
export const normaliseUnit = (unit: string) => {
  const u = unit.trim();
  for (const [re, to] of UNIT_ALIASES) if (re.test(u)) return to;
  return u;
};
const tidy = (s: string) => s.replace(/\s+/g, ' ').trim();

/*
 * Prices written INTO a description. Electricians type them there — "Materials
 * £20 / Labour £45", "outside light (£60)", "two hours at £45 per hour",
 * "Travel @ 0.58p/mile" (41 of 4,442 live non-labour lines, 2 Oct 2026) — and
 * a description goes to the merchant word for word. The price fields are
 * never sent; this takes the money out of the words too.
 */
const MONEY_LINE =
  /^\s*(?:materials?|labou?r|total|sub-?total|price|cost|vat|fee|charge)\b[^a-z]*£/i;
const MONEY_BITS: RegExp[] = [
  /\(\s*[^()]*£[^()]*\)/g, // "(£60)", "( £6 )", "(includes filler + £10)"
  /\s*(?:@|\bat\b)\s*£?\s*\d[\d,.]*\s*p?\s*(?:\/|\bper\b)\s*[a-z]+/gi, // "@ 0.58p/mile", "at £45 per hour"
  /£\s*\d[\d,]*(?:\.\d+)?(?:\s*(?:\+|plus|inc\.?|ex\.?)\s*vat)?/gi, // "£1,250.00 + VAT"
  /£/g, // a stray sign with the figure still to be typed
  /\b\d[\d,.]*\s*p\s*\/\s*[a-z]+/gi, // "58p/mile"
];
export const withoutPrices = (description: string): string => {
  const lines = description
    .split(/\n+/)
    .filter((l) => !MONEY_LINE.test(l))
    .map((l) => MONEY_BITS.reduce((t, re) => t.replace(re, ' '), l))
    .map((l) => tidy(l.replace(/\s+([,.;:)])/g, '$1').replace(/\(\s*\)/g, '')))
    .map((l) => l.replace(/(?:\s*(?:and|&|\+|,|-|—))+$/i, '').trim())
    .filter(Boolean);
  return lines.join('; ');
};

/**
 * A quote's materials list: the materials lines and their quantities, with no
 * price anywhere (not even one typed into a description). The same item on
 * several lines is merged into one total; any line can be unticked.
 */
export function supplierLinesFromQuote(items: QuoteItem[]): SupplierLine[] {
  const out = new Map<string, SupplierLine>();
  for (const it of items) {
    // The materials that were quoted — nothing else. Labour, equipment
    // (tool/plant hire in the builder) and hand-typed extras stay out.
    if (it.category !== 'materials') continue;
    const description = withoutPrices(it.description || '');
    const quantity = Number(it.quantity) || 0;
    if (!description || quantity <= 0) continue;
    const unit = normaliseUnit(it.unit || '');
    const kind: SupplierLine['kind'] =
      it.category === 'materials'
        ? 'materials'
        : it.category === 'equipment'
          ? 'equipment'
          : 'other';
    const key = `${description.toLowerCase()}|${unit.toLowerCase()}`;
    const seen = out.get(key);
    if (seen) {
      seen.quantity += quantity;
      // A material source is enough to keep a merged line in.
      if (kind === 'materials') {
        seen.include = true;
        seen.kind = 'materials';
      }
    } else {
      out.set(key, { id: key, quantity, unit, description, include: kind === 'materials', kind });
    }
  }
  return [...out.values()];
}

/** The message itself — no prices, ever. */
export function supplierRequestText(opts: {
  lines: Pick<SupplierLine, 'quantity' | 'unit' | 'description'>[];
  companyName?: string;
  reference?: string;
  siteAddress?: string;
  /**
   * 'list' — just the materials and quantities under a short heading (a
   * quote's materials list). 'rfq' — the site visit's request for prices.
   */
  style?: 'list' | 'rfq';
}): string {
  const company = opts.companyName?.trim() || '';
  const items = opts.lines.filter((l) => l.description?.trim()).map(supplierLineText);
  if (opts.style === 'list') {
    const head = [`Materials list${company ? ` — ${company}` : ''}`];
    const about = [opts.reference, opts.siteAddress].filter(Boolean).join(' · ');
    if (about) head.push(about);
    return [...head, '', ...items].join('\n');
  }
  const parts: string[] = [`Request for Quotation${company ? ` — ${company}` : ''}`];
  if (opts.reference) parts.push(`Ref: ${opts.reference}`);
  if (opts.siteAddress) parts.push(`Site: ${opts.siteAddress}`);
  parts.push(
    '',
    'Please quote your best price and availability for the following:',
    '',
    ...items,
    '',
    'Many thanks.'
  );
  if (company) parts.push(company);
  return parts.join('\n');
}

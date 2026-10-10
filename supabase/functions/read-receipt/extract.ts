/**
 * read-receipt: the prompt and the clean-up, kept apart from the HTTP handler
 * so the sample run (scripts/receipts/run-receipt-samples.ts) uses exactly
 * what the function uses.
 */

export const RECEIPT_MODEL = 'gpt-5.4-mini-2026-03-17';

export const SYSTEM_PROMPT = `You read UK receipts and supplier bills for an electrical contracting firm and return the figures as JSON.

Return ONLY this JSON object:
{
  "kind": "receipt" | "bill",
  "supplier": string | null,
  "supplier_vat_number": string | null,
  "date": "YYYY-MM-DD" | null,
  "invoice_number": string | null,
  "lines": [{ "code": string | null, "description": string, "quantity": number | null, "unit_price": number | null, "net": number | null, "vat_rate": number | null }],
  "net": number | null,
  "vat": number | null,
  "gross": number | null,
  "currency": "GBP",
  "category": "materials" | "tools" | "fuel" | "parking" | "travel" | "food" | "accommodation" | "subcontract" | "other",
  "confidence": number,
  "notes": string | null
}

Rules:
- Copy figures exactly as printed. Never invent a figure. Use null for anything not on the document.
- "gross" is the amount actually paid or due, including VAT. "net" is before VAT. "vat" is the VAT amount.
- If only the gross and a VAT amount are printed, net = gross - vat. If the document says no VAT, or the supplier is not VAT registered, vat = 0 and net = gross.
- "bill" means a supplier invoice (an invoice number, account or payment terms). A till receipt, card slip or ticket is "receipt".
- "supplier_vat_number" is the seller's UK VAT registration number (e.g. GB 123 4567 89), never the buyer's.
- Dates on UK documents are day first: 03/04/2026 is 3 April 2026.
- Amounts are numbers with no £ sign and no thousands separators.
- "lines" are the goods or services, at most 40. Leave out subtotal, VAT, total, change and payment lines.
- "code" is the product code, part number or catalogue number printed against the line, exactly as printed; null if none.
- "confidence" is 0 to 1: how sure you are that supplier, date and gross are right.
- "notes": one short line only if something is unclear (torn, faded, two totals), otherwise null.`;

export type ReceiptKind = 'receipt' | 'bill';

export interface ReceiptLine {
  /** The wholesaler's product code, when printed (ELE-2066 bill vs PO check). */
  code: string | null;
  description: string;
  quantity: number | null;
  unit_price: number | null;
  net: number | null;
  vat_rate: number | null;
}

export interface ReceiptExtraction {
  kind: ReceiptKind;
  supplier: string | null;
  supplier_vat_number: string | null;
  date: string | null;
  invoice_number: string | null;
  lines: ReceiptLine[];
  net: number | null;
  vat: number | null;
  gross: number | null;
  currency: 'GBP';
  category: string;
  confidence: number;
  notes: string | null;
  /** Our own check: net + VAT = gross (to the penny), when all three are there. */
  totals_agree: boolean | null;
}

const CATEGORIES = [
  'materials',
  'tools',
  'fuel',
  'parking',
  'travel',
  'food',
  'accommodation',
  'subcontract',
  'other',
];

function num(v: unknown): number | null {
  if (typeof v === 'number' && Number.isFinite(v)) return Math.round(v * 100) / 100;
  if (typeof v === 'string') {
    const t = v.replace(/[£,\s]/g, '');
    if (/^-?\d+(\.\d+)?$/.test(t)) return Math.round(Number(t) * 100) / 100;
  }
  return null;
}

function str(v: unknown, max = 200): string | null {
  if (typeof v !== 'string') return null;
  const t = v.replace(/\s+/g, ' ').trim();
  return t ? t.slice(0, max) : null;
}

function isoDate(v: unknown): string | null {
  const t = str(v, 20);
  if (!t) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
    const d = new Date(`${t}T00:00:00Z`);
    return Number.isNaN(d.getTime()) ? null : t;
  }
  const m = t.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})$/);
  if (m) {
    const y = m[3].length === 2 ? `20${m[3]}` : m[3];
    return `${y}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
  }
  return null;
}

function vatNumber(v: unknown): string | null {
  const t = str(v, 30);
  if (!t) return null;
  const digits = t.replace(/[^0-9]/g, '');
  if (digits.length !== 9 && digits.length !== 12) return null;
  return `GB${digits}`;
}

/** Whatever came back → the shape the app stores. Never throws. */
export function normaliseExtraction(raw: unknown): ReceiptExtraction {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const lines = (Array.isArray(r.lines) ? r.lines : [])
    .slice(0, 40)
    .map((l) => {
      const x = (l && typeof l === 'object' ? l : {}) as Record<string, unknown>;
      return {
        code: str(x.code, 40),
        description: str(x.description, 200) ?? '',
        quantity: num(x.quantity),
        unit_price: num(x.unit_price),
        net: num(x.net),
        vat_rate: num(x.vat_rate),
      };
    })
    .filter((l) => l.description);
  let net = num(r.net);
  let vat = num(r.vat);
  const gross = num(r.gross);
  if (gross != null && vat != null && net == null) net = Math.round((gross - vat) * 100) / 100;
  if (gross != null && net != null && vat == null) vat = Math.round((gross - net) * 100) / 100;
  const totals_agree =
    gross != null && net != null && vat != null ? Math.abs(net + vat - gross) <= 0.02 : null;
  const cat = str(r.category, 30)?.toLowerCase() ?? 'other';
  const conf = typeof r.confidence === 'number' ? Math.max(0, Math.min(1, r.confidence)) : 0.5;
  return {
    kind: r.kind === 'bill' ? 'bill' : 'receipt',
    supplier: str(r.supplier, 120),
    supplier_vat_number: vatNumber(r.supplier_vat_number),
    date: isoDate(r.date),
    invoice_number: str(r.invoice_number, 60),
    lines,
    net,
    vat,
    gross,
    currency: 'GBP',
    category: CATEGORIES.includes(cat) ? cat : 'other',
    confidence: Math.round(conf * 100) / 100,
    notes: str(r.notes, 200),
    totals_agree,
  };
}

/** The user message: the file as an image or as a PDF file part. */
export function buildMessages(mime: string, base64: string, fileName = 'receipt') {
  const dataUrl = `data:${mime};base64,${base64}`;
  const part = mime.startsWith('image/')
    ? { type: 'image_url', image_url: { url: dataUrl, detail: 'high' } }
    : { type: 'file', file: { filename: fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`, file_data: dataUrl } };
  return [
    { role: 'system', content: SYSTEM_PROMPT },
    {
      role: 'user',
      content: [{ type: 'text', text: 'Read this receipt or bill and return the JSON.' }, part],
    },
  ];
}

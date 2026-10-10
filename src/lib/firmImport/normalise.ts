/**
 * ELE-2067 — turning one row of somebody else's export into the normalised
 * record import_firm_rows reads. Dates go to ISO (UK day-first unless the
 * file proves otherwise), money to plain numbers, statuses to a small set.
 */
import type { ColumnMap, FieldDef, ImportKind, NormalRow, ParsedFile } from './types';
import { KIND_FIELDS } from './types';

export type DateOrder = 'dmy' | 'mdy';

const UK_POSTCODE = /\b([A-Z]{1,2}[0-9][0-9A-Z]?)\s*([0-9][A-Z]{2})\b/i;

/**
 * A Date's calendar day where it was made (local parts). toISOString would
 * give the UTC day, which is the day before for a local-midnight date in
 * British Summer Time.
 */
export function localIsoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function cellText(v: unknown): string {
  if (v === null || v === undefined) return '';
  if (v instanceof Date) return isNaN(v.getTime()) ? '' : localIsoDate(v);
  return String(v)
    .replace(/\u00a0/g, ' ')
    .trim();
}

export function normName(v: string): string {
  return v.trim().replace(/\s+/g, ' ').toLowerCase();
}

/** "£1,234.50", "1234.5", "(12.00)", "1.234,50"? (UK files use the first forms). */
export function parseMoney(v: unknown): number | null {
  if (typeof v === 'number') return isFinite(v) ? Math.round(v * 100) / 100 : null;
  let s = cellText(v);
  if (!s) return null;
  let neg = false;
  if (/^\(.*\)$/.test(s)) {
    neg = true;
    s = s.slice(1, -1);
  }
  s = s.replace(/[£$€,\s]|GBP/gi, '');
  if (s.startsWith('-')) {
    neg = !neg;
    s = s.slice(1);
  }
  if (!/^\d*\.?\d+$/.test(s)) return null;
  const n = Math.round(parseFloat(s) * 100) / 100;
  return neg ? -n : n;
}

export function excelSerialToIso(n: number): string | null {
  // Excel day 25569 = 1970-01-01. Only accept a sensible range (1990–2100).
  // Whole days in UTC, so the time zone of the device never moves the date.
  if (n < 32874 || n > 73051) return null;
  const d = new Date(Math.floor(n - 25569) * 86400 * 1000);
  return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

const MONTHS: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

function iso(y: number, m: number, d: number): string | null {
  if (y < 100) y += y < 70 ? 2000 : 1900;
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (dt.getUTCMonth() !== m - 1) return null;
  return dt.toISOString().slice(0, 10);
}

/** Any of: 2026-03-04, 04/03/2026, 4/3/26, 4 Mar 2026, 04-Mar-2026, an Excel serial, a Date. */
export function parseDate(v: unknown, order: DateOrder = 'dmy'): string | null {
  if (v instanceof Date) return isNaN(v.getTime()) ? null : localIsoDate(v);
  if (typeof v === 'number') return excelSerialToIso(v);
  const s = cellText(v);
  if (!s) return null;
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return iso(+m[1], +m[2], +m[3]);
  m = s.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})/);
  if (m) {
    const a = +m[1];
    const b = +m[2];
    return order === 'mdy' ? iso(+m[3], a, b) : iso(+m[3], b, a);
  }
  m = s.match(/^(\d{1,2})(?:st|nd|rd|th)?[\s-]+([A-Za-z]{3,9})[\s,-]+(\d{2,4})/);
  if (m && MONTHS[m[2].slice(0, 3).toLowerCase()]) {
    return iso(+m[3], MONTHS[m[2].slice(0, 3).toLowerCase()], +m[1]);
  }
  if (/^\d{5}(\.\d+)?$/.test(s)) return excelSerialToIso(parseFloat(s));
  return null;
}

/** Look at every date column: a first part over 12 proves day-first, a second part over 12 proves month-first. */
export function detectDateOrder(values: string[], fallback: DateOrder = 'dmy'): DateOrder {
  let dmy = 0;
  let mdy = 0;
  for (const v of values) {
    const m = v.match(/^(\d{1,2})[/.-](\d{1,2})[/.-]\d{2,4}/);
    if (!m) continue;
    if (+m[1] > 12) dmy++;
    if (+m[2] > 12) mdy++;
  }
  if (dmy && !mdy) return 'dmy';
  if (mdy && !dmy) return 'mdy';
  return fallback;
}

export function extractPostcode(s: string): string | null {
  const m = s.match(UK_POSTCODE);
  return m ? `${m[1].toUpperCase()} ${m[2].toUpperCase()}` : null;
}

/** Plain-language statuses → the few the import understands. */
export function normStatus(kind: ImportKind, raw: string): string {
  const s = raw.trim().toLowerCase();
  if (kind === 'invoices') {
    // Powered Now's accounts export uses numeric codes (0 Raised … 6 Over Paid).
    if (/^\d$/.test(s))
      return (
        (
          { '4': 'paid', '6': 'paid', '0': 'unpaid', '1': 'unpaid', '5': 'unpaid' } as Record<
            string,
            string
          >
        )[s] ?? 'unpaid'
      );
    if (/void|cancel|delet|written off|credit/.test(s)) return 'void';
    if (/draft|not sent|unsent/.test(s)) return 'draft';
    if (/part|unpaid|overdue|outstanding|awaiting|due|sent|issued|approved|raised|open/.test(s))
      return 'unpaid';
    if (/paid|settled|closed|complete/.test(s)) return 'paid';
    return 'unpaid';
  }
  if (kind === 'quotes') {
    if (/^\d$/.test(s))
      return (
        ({ '2': 'accepted', '3': 'declined', '1': 'sent', '0': 'draft' } as Record<string, string>)[
          s
        ] ?? 'draft'
      );
    if (/accept|won|approved|convert|job created|booked/.test(s)) return 'accepted';
    if (/declin|reject|lost|expired|cancel|archiv/.test(s)) return 'declined';
    if (/sent|issued|awaiting|pending|open|quoted|submitted/.test(s)) return 'sent';
    return 'draft';
  }
  if (kind === 'jobs') {
    if (/cancel|lost|declin|void/.test(s)) return 'cancelled';
    if (/complete|completed|done|finished|closed|invoiced|paid|archiv/.test(s)) return 'complete';
    if (/quote|estimate/.test(s)) return 'quoted';
    if (/enquir|lead|new request|request/.test(s)) return 'enquiry';
    return 'open';
  }
  return s;
}

function readField(
  row: Record<string, unknown>,
  def: FieldDef,
  cols: string[] | undefined
): unknown {
  if (!cols || cols.length === 0) return undefined;
  if (cols.length === 1) return row[cols[0]];
  const parts = cols.map((c) => cellText(row[c])).filter(Boolean);
  return parts.join(def.join === 'space' ? ' ' : ', ');
}

export interface NormaliseOptions {
  dateOrder: DateOrder;
  /**
   * Invoices: what a row means when the file says nothing about payment (no
   * status, amount due, amount paid or paid date). The wizard asks; it is
   * never assumed.
   */
  invoiceStatus?: 'paid' | 'unpaid';
}

/** An invoices file that cannot tell paid from unpaid, so the wizard must ask. */
export function invoicesNeedStatusAnswer(map: ColumnMap): boolean {
  return !['status', 'amount_due', 'amount_paid', 'paid_date'].some((k) => map[k]?.length);
}

/** One file → normalised records for its kind. Rows sharing a document number become one document with lines. */
export function normaliseFile(
  file: ParsedFile,
  kind: ImportKind,
  map: ColumnMap,
  opts: NormaliseOptions
): NormalRow[] {
  const defs = KIND_FIELDS[kind];
  const out: NormalRow[] = [];
  const byNumber = new Map<string, NormalRow>();

  for (const row of file.rows) {
    const r: NormalRow = {};
    for (const def of defs) {
      const raw = readField(row, def, map[def.key]);
      if (raw === undefined) continue;
      if (def.type === 'money' || def.type === 'number') {
        const n = parseMoney(raw);
        if (n !== null) r[def.key] = n;
      } else if (def.type === 'date') {
        const d = parseDate(raw, opts.dateOrder);
        if (d) r[def.key] = d;
      } else if (def.type === 'status') {
        const t = cellText(raw);
        if (t) r[def.key] = normStatus(kind, t);
      } else if (def.type === 'email') {
        const t = cellText(raw).toLowerCase();
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) r[def.key] = t;
      } else {
        const t = cellText(raw);
        if (t) r[def.key] = t;
      }
    }

    // ── Per-kind tidying ──
    if (kind === 'customers' || kind === 'staff') {
      // Contact lists that mix suppliers in (Powered Now) — customers only.
      const typeCol = file.headers.find((h) => /^(type|contact ?type)$/i.test(h.trim()));
      if (kind === 'customers' && typeCol && /supplier/i.test(cellText(row[typeCol]))) continue;
      // An empty name column with first/last name columns beside it.
      if (!r.name) {
        const pick = (re: RegExp) => file.headers.find((h) => re.test(h.replace(/[^a-z]/gi, '')));
        const first = pick(/^(first ?name|forename|givenname|firstname)$/i);
        const last = pick(/^(last ?name|surname|familyname|lastname)$/i);
        const full = [first, last]
          .map((c) => (c ? cellText(row[c]) : ''))
          .filter(Boolean)
          .join(' ');
        if (full) r.name = full;
      }
    }
    if (kind === 'customers') {
      if (!r.phone && r.mobile) r.phone = r.mobile;
      if (!r.name && r.company_name) r.name = r.company_name;
      if (!r.postcode && typeof r.address === 'string')
        r.postcode = extractPostcode(r.address) ?? undefined;
    }
    if (kind === 'sites' && !r.customer_name && !r.customer_ref) {
      // Commusoft work addresses: a landlord company with no landlord name.
      const co = file.headers.find((h) => /company ?name$/i.test(h.trim()));
      const t = co ? cellText(row[co]) : '';
      if (t) r.customer_name = t;
    }
    if (kind === 'sites') {
      const site = r.site_name ? String(r.site_name) : '';
      const first = typeof r.address === 'string' ? r.address.split(',')[0].trim() : '';
      if (site && first && site.toLowerCase().endsWith(first.toLowerCase())) {
        // "Flat 2, 18 Dock Street" + "18 Dock Street, Salford" → "Flat 2, 18 Dock Street, Salford"
        r.address = site + String(r.address).slice(String(r.address).indexOf(first) + first.length);
      } else if (
        site &&
        typeof r.address === 'string' &&
        !r.address.toLowerCase().includes(site.toLowerCase())
      ) {
        r.address = `${site}, ${r.address}`;
      } else if (!r.address && r.site_name) {
        r.address = r.site_name;
      }
      if (!r.postcode && typeof r.address === 'string')
        r.postcode = extractPostcode(r.address) ?? undefined;
    }
    if (kind === 'jobs') {
      if (!r.title && r.description)
        r.title = String(r.description).split(/[\n.]/)[0].slice(0, 120);
      if (!r.ref && r.job_number) r.ref = r.job_number;
      if (!r.status) r.status = r.completed_date ? 'complete' : 'open';
    }
    if (kind === 'invoices') {
      if (
        r.amount_paid === undefined &&
        typeof r.amount_due === 'number' &&
        typeof r.total === 'number'
      ) {
        r.amount_paid = Math.max(0, Math.round((r.total - r.amount_due) * 100) / 100);
      }
      if (!r.status) {
        if (typeof r.amount_due === 'number') {
          r.status = r.amount_due <= 0.005 && (r.total as number) > 0 ? 'paid' : 'unpaid';
        } else if (
          typeof r.amount_paid === 'number' &&
          typeof r.total === 'number' &&
          r.total > 0
        ) {
          r.status = r.amount_paid >= r.total - 0.005 ? 'paid' : 'unpaid';
        } else if (r.paid_date) {
          r.status = 'paid';
        } else {
          r.status = opts.invoiceStatus ?? 'unpaid';
        }
      }
    }
    if (kind === 'staff') {
      if (!r.name && r.email) r.name = String(r.email).split('@')[0];
    }

    // Link to the customer by ID where the file gives one, else by name.
    if (kind !== 'customers' && kind !== 'price_book' && kind !== 'staff' && kind !== 'assets') {
      if (!r.customer_ref && r.customer_name)
        r.customer_ref = `name:${normName(String(r.customer_name))}`;
      if (!r.customer_postcode && typeof r.customer_address === 'string') {
        r.customer_postcode = extractPostcode(r.customer_address) ?? undefined;
      }
    }
    if (kind === 'customers' && !r.ref && r.name) r.ref = `name:${normName(String(r.name))}`;

    // Jobber-style wide line items: "Line Item 1 Name", "Line Item 1 Quantity" …
    const wide: { description?: string; quantity?: number; unit_price?: number; total?: number }[] =
      [];
    if (kind === 'quotes' || kind === 'invoices') {
      for (const h of file.headers) {
        const m = h.match(
          /^line\s*item\s*(\d+)\s*(name|description|quantity|qty|unit\s*price|total)$/i
        );
        if (!m) continue;
        const n = +m[1] - 1;
        const v = row[h];
        if (cellText(v) === '') continue;
        wide[n] = wide[n] ?? {};
        const what = m[2].toLowerCase().replace(/\s/g, '');
        if (what === 'name' || what === 'description') {
          wide[n].description = wide[n].description
            ? `${wide[n].description}: ${cellText(v)}`
            : cellText(v);
        } else if (what === 'quantity' || what === 'qty')
          wide[n].quantity = parseMoney(v) ?? undefined;
        else if (what === 'unitprice') wide[n].unit_price = parseMoney(v) ?? undefined;
        else if (what === 'total') wide[n].total = parseMoney(v) ?? undefined;
      }
    }

    // Quotes and invoices: one row per line item is common. Group by number.
    if ((kind === 'quotes' || kind === 'invoices') && r.number) {
      const line =
        r.item_description || r.item_total !== undefined
          ? {
              description: r.item_description,
              quantity: r.item_quantity,
              unit_price: r.item_unit_price,
              total: r.item_total,
            }
          : null;
      delete r.item_description;
      delete r.item_quantity;
      delete r.item_unit_price;
      delete r.item_total;
      const key = String(r.number);
      const prev = byNumber.get(key);
      if (prev) {
        if (line) (prev.items as unknown[]).push(line);
        // Fill gaps from later rows (some exports repeat the header fields only on the first line).
        for (const [k, v] of Object.entries(r)) if (prev[k] === undefined) prev[k] = v;
        continue;
      }
      r.items = [...(line ? [line] : []), ...wide.filter(Boolean)];
      byNumber.set(key, r);
    } else if (kind === 'quotes' || kind === 'invoices') {
      r.items = wide.filter(Boolean);
      delete r.item_description;
      delete r.item_quantity;
      delete r.item_unit_price;
      delete r.item_total;
    }

    // Drop undefined keys; skip rows with nothing in them.
    for (const k of Object.keys(r)) if (r[k] === undefined || r[k] === '') delete r[k];
    if (Object.keys(r).length === 0) continue;
    out.push(r);
  }

  // A document total missing from the file: sum its lines.
  if (kind === 'quotes' || kind === 'invoices') {
    for (const r of out) {
      const items = (r.items as { total?: number; unit_price?: number; quantity?: number }[]) ?? [];
      if (r.total === undefined && items.length) {
        const sum = items.reduce(
          (s, it) => s + (it.total ?? (it.unit_price ?? 0) * (it.quantity ?? 1)),
          0
        );
        const vat = typeof r.vat === 'number' ? r.vat : 0;
        r.subtotal = r.subtotal ?? Math.round(sum * 100) / 100;
        r.total = Math.round(((r.subtotal as number) + vat) * 100) / 100;
      }
      if (r.total === undefined && typeof r.subtotal === 'number') {
        r.total = Math.round((r.subtotal + (typeof r.vat === 'number' ? r.vat : 0)) * 100) / 100;
      }
      // Subtotal and total but no VAT column: the VAT is the difference.
      if (
        r.vat === undefined &&
        typeof r.subtotal === 'number' &&
        typeof r.total === 'number' &&
        r.total - r.subtotal > 0.005
      ) {
        r.vat = Math.round((r.total - r.subtotal) * 100) / 100;
      }
    }
  }
  return out;
}

/** Every date-looking value in the mapped date columns, for detectDateOrder. */
export function dateSamples(file: ParsedFile, kind: ImportKind, map: ColumnMap): string[] {
  const cols = KIND_FIELDS[kind].filter((d) => d.type === 'date').flatMap((d) => map[d.key] ?? []);
  const out: string[] = [];
  for (const row of file.rows.slice(0, 500)) for (const c of cols) out.push(cellText(row[c]));
  return out.filter(Boolean);
}

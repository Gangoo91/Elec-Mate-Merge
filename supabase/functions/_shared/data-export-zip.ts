/**
 * The "Download My Data" ZIP (ELE-1812, 4 Oct 2026).
 *
 *   Read me first.html           summary: what's inside, counts, file links
 *   spreadsheets/<section>.csv    one per kind of record — opens in Excel
 *   data/<table>.json             the same records, machine-readable
 *   data/_account.json            profile, export details, file list
 *
 * Photos and documents are listed with 7-day download links rather than
 * bundled — a portfolio of site photos would make the ZIP huge.
 *
 * Written by hand on the runtime's native gzip, not JSZip: for the heaviest
 * real account (45 MB of records) JSZip took 21.7 s of CPU and ~590 MB of
 * memory; Supabase allows 2 s and 256 MB. Native compression does the same
 * in ~0.3 s, and each table is compressed as it arrives so only one table is
 * ever held in memory.
 */

type Row = Record<string, unknown>;
export interface ExportFile {
  bucket: string;
  path: string;
  created_at?: string;
  size?: string;
  type?: string;
  downloadUrl?: string | null;
}

/** Plain-English names for the tables people care about most. */
const FRIENDLY: Record<string, string> = {
  reports: 'Certificates and reports',
  quotes: 'Quotes',
  invoices: 'Invoices',
  customers: 'Clients',
  calendar_events: 'Calendar',
  jobs: 'Jobs',
  time_entries: 'Time entries',
  portfolio_items: 'Portfolio evidence',
  quiz_attempts: 'Quiz and mock exam results',
  site_visits: 'Site visits',
  safe_isolation_records: 'Safe isolation records',
  pre_use_checks: 'Pre-use checks',
  user_safety_documents: 'Safety documents',
  mental_health_mood_entries: 'Wellbeing - mood check-ins',
  mental_health_journal_entries: 'Wellbeing - journal',
  mental_health_sleep_entries: 'Wellbeing - sleep log',
  mental_health_safety_plans: 'Wellbeing - safety plan',
  user_settings: 'Settings',
  security_audit_log: 'Account activity log',
  user_events: 'App activity',
};

export const PRIORITY = ['reports', 'quotes', 'invoices', 'customers', 'jobs', 'calendar_events'];

const titleCase = (t: string) => t.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
export const sectionName = (table: string) => FRIENDLY[table] ?? titleCase(table);

export const sortTables = (tables: string[]) =>
  [...tables].sort((a, b) => {
    const ia = PRIORITY.indexOf(a);
    const ib = PRIORITY.indexOf(b);
    if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    return sectionName(a).localeCompare(sectionName(b));
  });

const fileSafe = (s: string) =>
  s
    .replace(/[\\/:*?"<>|]+/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

// Excel shows at most 32,767 characters in a cell; longer values (a whole
// certificate's form data) break the row. The JSON copy keeps them whole.
const CELL_MAX = 32000;

function csvCell(v: unknown): string {
  if (v === null || v === undefined) return '';
  let s = typeof v === 'object' ? JSON.stringify(v) : String(v);
  if (s.length > CELL_MAX) s = s.slice(0, CELL_MAX) + ' … [cut here — full value in the data folder]';
  // Guard against spreadsheet formula injection from user-entered text.
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

// Readable columns first, plumbing last — the database returns them in
// storage order, which put "id, data, status, pdf_url" ahead of the client.
const FIRST = [
  'certificate_number',
  'report_type',
  'quote_number',
  'invoice_number',
  'name',
  'full_name',
  'title',
  'client_name',
  'company_name',
  'installation_address',
  'address',
  'postcode',
  'email',
  'phone',
  'status',
  'inspection_date',
  'date',
  'total',
  'mood',
  'notes',
  'created_at',
  'updated_at',
];
const isPlumbing = (k: string) =>
  k === 'id' || k.endsWith('_id') || k === 'data' || k.endsWith('_payload') || k.startsWith('pdf_');
function orderColumns(cols: string[]): string[] {
  const first = FIRST.filter((c) => cols.includes(c));
  const rest = cols.filter((c) => !first.includes(c));
  return [
    ...first,
    ...rest.filter((c) => !isPlumbing(c)).sort(),
    ...rest.filter(isPlumbing).sort(),
  ];
}

export function toCsv(rows: Row[]): string {
  const seen = new Set<string>();
  for (const r of rows) for (const k of Object.keys(r)) seen.add(k);
  const cols = orderColumns([...seen]);
  const lines = [cols.map(csvCell).join(',')];
  for (const r of rows) lines.push(cols.map((c) => csvCell(r[c])).join(','));
  // BOM so Excel opens UTF-8 (£, accents) correctly.
  return '﻿' + lines.join('\r\n');
}

// ── Minimal ZIP writer on native gzip ─────────────────────────────────────
// gzip = header + raw DEFLATE + CRC-32 + size, so the runtime computes the
// CRC too; we lift the DEFLATE body and the CRC into ZIP records.

const enc = new TextEncoder();

async function gzipParts(data: Uint8Array) {
  const gz = new Uint8Array(
    await new Response(new Blob([data as BlobPart]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer()
  );
  const flg = gz[3];
  let p = 10;
  if (flg & 4) p += 2 + (gz[p] | (gz[p + 1] << 8)); // FEXTRA
  if (flg & 8) while (gz[p++] !== 0); // FNAME
  if (flg & 16) while (gz[p++] !== 0); // FCOMMENT
  if (flg & 2) p += 2; // FHCRC
  const t = gz.length - 8;
  const crc = (gz[t] | (gz[t + 1] << 8) | (gz[t + 2] << 16) | (gz[t + 3] << 24)) >>> 0;
  return { deflated: gz.subarray(p, t), crc };
}

function dosDateTime(d: Date) {
  const time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
  const date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  return { time, date };
}

export class ZipWriter {
  private chunks: Uint8Array[] = [];
  private central: Uint8Array[] = [];
  private offset = 0;
  private count = 0;
  private names = new Set<string>();
  private stamp = dosDateTime(new Date());

  /** Adds a file; a repeated name gets " (2)" so nothing is overwritten. */
  async add(name: string, content: string | Uint8Array) {
    let n = name;
    for (let i = 2; this.names.has(n); i++) n = name.replace(/(\.[^.]+)?$/, ` (${i})$1`);
    this.names.add(n);

    const data = typeof content === 'string' ? enc.encode(content) : content;
    const { deflated, crc } = await gzipParts(data);
    const nameBytes = enc.encode(n);
    const { time, date } = this.stamp;

    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true); // version needed
    local.setUint16(6, 0x0800, true); // UTF-8 names
    local.setUint16(8, 8, true); // DEFLATE
    local.setUint16(10, time, true);
    local.setUint16(12, date, true);
    local.setUint32(14, crc, true);
    local.setUint32(18, deflated.length, true);
    local.setUint32(22, data.length, true);
    local.setUint16(26, nameBytes.length, true);
    local.setUint16(28, 0, true);

    const cd = new DataView(new ArrayBuffer(46));
    cd.setUint32(0, 0x02014b50, true);
    cd.setUint16(4, 20, true);
    cd.setUint16(6, 20, true);
    cd.setUint16(8, 0x0800, true);
    cd.setUint16(10, 8, true);
    cd.setUint16(12, time, true);
    cd.setUint16(14, date, true);
    cd.setUint32(16, crc, true);
    cd.setUint32(20, deflated.length, true);
    cd.setUint32(24, data.length, true);
    cd.setUint16(28, nameBytes.length, true);
    cd.setUint32(42, this.offset, true);

    this.chunks.push(new Uint8Array(local.buffer), nameBytes, deflated);
    this.central.push(new Uint8Array(cd.buffer), nameBytes);
    this.offset += 30 + nameBytes.length + deflated.length;
    this.count++;
  }

  finish(): Uint8Array {
    const cdSize = this.central.reduce((s, c) => s + c.length, 0);
    const end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true);
    end.setUint16(8, this.count, true);
    end.setUint16(10, this.count, true);
    end.setUint32(12, cdSize, true);
    end.setUint32(16, this.offset, true);
    const parts = [...this.chunks, ...this.central, new Uint8Array(end.buffer)];
    const out = new Uint8Array(parts.reduce((s, p) => s + p.length, 0));
    let o = 0;
    for (const p of parts) {
      out.set(p, o);
      o += p.length;
    }
    this.chunks = [];
    this.central = [];
    return out;
  }
}

// ── Read me first.html ─────────────────────────────────────────────────────

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export interface SummarySection {
  table: string;
  rows: number;
  total: number;
  csv: string;
}

export function summaryHtml(opts: {
  name: string;
  exportedAt: string;
  sections: SummarySection[];
  files: ExportFile[];
  filesTotal: number;
}): string {
  const when = new Date(opts.exportedAt).toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    dateStyle: 'long',
    timeStyle: 'short',
  });
  const truncated = opts.sections.filter((s) => s.total > s.rows);
  const rows = opts.sections
    .map(
      (s) =>
        `<tr><td>${esc(sectionName(s.table))}${s.total > s.rows ? ' <span class="cap">latest only</span>' : ''}</td><td class="n">${s.rows.toLocaleString('en-GB')}</td><td><code>${esc(s.csv)}</code></td></tr>`
    )
    .join('');
  const fileRows = opts.files
    .map((f) => {
      const label = esc(f.path.split('/').pop() ?? f.path);
      const date = f.created_at
        ? ` <span>${esc(new Date(f.created_at).toLocaleDateString('en-GB', { timeZone: 'Europe/London' }))}</span>`
        : '';
      return `<li>${f.downloadUrl ? `<a href="${esc(f.downloadUrl)}">${label}</a>` : label}${date}</li>`;
    })
    .join('');

  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Your Elec-Mate data</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#F4F6F9;color:#0C1B2A;font:16px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}
.wrap{max-width:780px;margin:40px auto;padding:0 16px}.card{background:#fff;border:1px solid #E6E9EE;border-radius:18px;overflow:hidden}
.in{padding:32px 36px}@media(max-width:520px){.in{padding:24px 20px}}
.eyebrow{margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#B5840A}
h1{margin:0 0 10px;font-size:28px;line-height:1.15;letter-spacing:-.5px}h2{margin:34px 0 10px;font-size:19px}
p{margin:0 0 14px;color:#51606F}p strong{color:#0C1B2A}
.panel{background:#FFFAEC;border:1px solid #EFD489;border-radius:14px;padding:16px 20px;margin:18px 0}
.panel p{margin:0;color:#0C1B2A;font-size:14px}
table{width:100%;border-collapse:collapse;font-size:14px}th,td{text-align:left;padding:10px 12px 10px 0;border-bottom:1px solid #E6E9EE;vertical-align:top}
th{font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:#51606F}td.n,th.n{text-align:right;font-variant-numeric:tabular-nums;font-weight:700}
code{font-size:12.5px;color:#51606F;word-break:break-all}.cap{display:inline-block;margin-left:6px;font-size:11px;font-weight:700;color:#B5840A}
ul{padding-left:18px}li{margin:4px 0;font-size:14px;word-break:break-all}li span{color:#8B95A3;margin-left:6px}a{color:#0C1B2A;font-weight:600}
.foot{padding:18px 36px;background:#F8FAFC;border-top:1px solid #E6E9EE;font-size:12px;color:#8B95A3}
</style></head><body><div class="wrap"><div class="card"><div class="in">
<p class="eyebrow">Your data</p>
<h1>Your Elec-Mate data</h1>
<p>${opts.name ? `<strong>${esc(opts.name)}</strong> · ` : ''}exported ${esc(when)} (UK time)</p>
<p>This is a copy of the data we hold about you and your work in Elec-Mate — your right of access and data portability under UK GDPR (Articles 15 and 20).</p>
<div class="panel"><p><strong>How to use it.</strong> The <strong>spreadsheets</strong> folder has one file per kind of record — they open in Excel, Numbers or Google Sheets. The <strong>data</strong> folder has the same records as JSON, for moving to another system. Certificate PDFs can also be saved one by one from each certificate in the app.</p></div>
<h2>What's inside</h2>
<table><thead><tr><th>Records</th><th class="n">Rows</th><th>File</th></tr></thead><tbody>${rows}</tbody></table>
${truncated.length ? `<p style="margin-top:14px;font-size:14px">Marked <strong>latest only</strong>: these logs are very long, so the newest 20,000 rows are included. Email us if you want the rest and we'll send it.</p>` : ''}
<h2>Photos and documents (${opts.filesTotal.toLocaleString('en-GB')})</h2>
${
  opts.files.length
    ? `<p style="font-size:14px">Each link downloads the file. Links work for <strong>7 days</strong> from the export — after that, export again from Settings → Privacy.${opts.filesTotal > opts.files.length ? ` The newest ${opts.files.length.toLocaleString('en-GB')} are linked here; email us for the rest.` : ''}</p><ul>${fileRows}</ul>`
    : '<p>None stored.</p>'
}
<h2>Questions</h2>
<p>Email <strong>info@elec-mate.com</strong> or reply to the email this came with.</p>
</div><div class="foot">Elec-Mate Ltd · Company 16416291 · ICO registration ZB935897</div></div></div></body></html>`;
}

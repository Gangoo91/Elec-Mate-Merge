/**
 * ELE-2067 — "Export everything": a zip of every record type as CSV plus
 * every file the firm holds in storage (certificates, RAMS, invoice PDFs,
 * photos). Built in the browser from two owner-only RPCs
 * (get_firm_export_manifest, export_firm_table). For very large firms the
 * edge function employer-full-export builds the same zip on the server.
 */
import JSZip from 'jszip';
import Papa from 'papaparse';
import { supabase } from '@/integrations/supabase/client';

export interface ExportFile {
  bucket: string;
  path: string;
  size: number;
  type: string | null;
  public: boolean;
}

export interface ExportManifest {
  counts: Record<string, number>;
  files: ExportFile[];
  file_bytes: number;
  generated_at: string;
}

export const EXPORT_LABEL: Record<string, string> = {
  customers: 'Customers',
  sites: 'Sites',
  jobs: 'Jobs',
  quotes: 'Quotes',
  invoices: 'Invoices',
  credit_notes: 'Credit notes',
  price_book: 'Price book',
  staff: 'Team',
  staff_cards: 'Team cards and tickets',
  timesheets: 'Timesheets',
  expenses: 'Expenses',
  leave: 'Leave',
  kit: 'Kit register',
  vehicles: 'Vehicles',
  certificates: 'Certificates',
  rams: 'RAMS',
  method_statements: 'Method statements',
  briefings: 'Briefings',
  near_misses: 'Near misses',
  accidents: 'Accidents',
  incidents: 'Incidents',
  tasks: 'Job tasks',
  job_notes: 'Job notes',
  job_issues: 'Snags and issues',
  job_photos: 'Job photo records',
  suppliers: 'Suppliers',
  purchase_orders: 'Purchase orders',
  diary: 'Diary',
  contracts: 'Maintenance contracts',
  leads: 'Leads',
  enquiries: 'Enquiries',
};

/** Over this the browser build gets slow on a phone; we say so before it starts. */
export const LARGE_EXPORT_BYTES = 250 * 1024 * 1024;

export async function getExportManifest(firm: string): Promise<ExportManifest> {
  const { data, error } = await supabase.rpc(
    'get_firm_export_manifest' as never,
    { p_firm: firm } as never
  );
  if (error) throw new Error(error.message);
  return data as unknown as ExportManifest;
}

/**
 * A text cell a spreadsheet would run as a formula (=, +, -, @, tab, CR at
 * the start) gets a leading apostrophe, so a customer name like
 * "=HYPERLINK(...)" opens as text in Excel or Sheets. Plain numbers stay as
 * they are.
 */
export function safeCsvText(s: string): string {
  if (/^-?\d+(\.\d+)?$/.test(s)) return s;
  return /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
}

function toCell(v: unknown): string | number | boolean | null {
  if (v === null || v === undefined) return null;
  if (typeof v === 'object') return safeCsvText(JSON.stringify(v));
  if (typeof v === 'string') return safeCsvText(v);
  return v as string | number | boolean;
}

async function fetchAll(
  firm: string,
  key: string,
  expected: number
): Promise<Record<string, unknown>[]> {
  const out: Record<string, unknown>[] = [];
  const page = 500;
  for (let offset = 0; offset < Math.max(expected, 1); offset += page) {
    const { data, error } = await supabase.rpc(
      'export_firm_table' as never,
      {
        p_firm: firm,
        p_key: key,
        p_offset: offset,
        p_limit: page,
      } as never
    );
    if (error) throw new Error(`${EXPORT_LABEL[key] ?? key}: ${error.message}`);
    const rows = (data as unknown as Record<string, unknown>[]) ?? [];
    out.push(...rows);
    if (rows.length < page) break;
  }
  return out;
}

async function downloadFile(f: ExportFile): Promise<Blob> {
  if (f.public) {
    const { data } = supabase.storage.from(f.bucket).getPublicUrl(f.path);
    const res = await fetch(data.publicUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.blob();
  }
  const { data, error } = await supabase.storage.from(f.bucket).download(f.path);
  if (error || !data) throw new Error(error?.message ?? 'not found');
  return data;
}

export interface ExportProgress {
  stage: 'records' | 'files' | 'zipping';
  done: number;
  total: number;
  label?: string;
}

export interface ExportResult {
  blob: Blob;
  fileName: string;
  recordCounts: Record<string, number>;
  filesIncluded: number;
  filesFailed: { path: string; reason: string }[];
}

export async function buildFirmExport(
  firm: string,
  firmName: string,
  manifest: ExportManifest,
  opts: { includeFiles: boolean },
  onProgress?: (p: ExportProgress) => void
): Promise<ExportResult> {
  const zip = new JSZip();
  const recordCounts: Record<string, number> = {};
  const keys = Object.keys(manifest.counts);

  let i = 0;
  for (const key of keys) {
    i++;
    onProgress?.({
      stage: 'records',
      done: i - 1,
      total: keys.length,
      label: EXPORT_LABEL[key] ?? key,
    });
    const expected = manifest.counts[key] ?? 0;
    if (!expected) {
      recordCounts[key] = 0;
      continue;
    }
    const rows = await fetchAll(firm, key, expected);
    recordCounts[key] = rows.length;
    const cols = Array.from(
      rows.reduce((s, r) => (Object.keys(r).forEach((k) => s.add(k)), s), new Set<string>())
    );
    const csv = Papa.unparse({
      fields: cols,
      data: rows.map((r) => cols.map((c) => toCell(r[c]))),
    });
    zip.file(`records/${key}.csv`, '\ufeff' + csv);
  }
  onProgress?.({ stage: 'records', done: keys.length, total: keys.length });

  let filesIncluded = 0;
  const filesFailed: { path: string; reason: string }[] = [];
  if (opts.includeFiles && manifest.files.length) {
    const queue = [...manifest.files];
    let done = 0;
    const worker = async () => {
      for (let f = queue.shift(); f; f = queue.shift()) {
        try {
          const blob = await downloadFile(f);
          const rel = f.path.startsWith(`${firm}/`) ? f.path.slice(firm.length + 1) : f.path;
          zip.file(`files/${f.bucket}/${rel}`, blob);
          filesIncluded++;
        } catch (e) {
          filesFailed.push({
            path: `${f.bucket}/${f.path}`,
            reason: e instanceof Error ? e.message : String(e),
          });
        }
        done++;
        onProgress?.({ stage: 'files', done, total: manifest.files.length });
      }
    };
    await Promise.all([worker(), worker(), worker(), worker()]);
  }

  const lines = [
    `Full export for ${firmName}`,
    `Made ${new Date().toLocaleString('en-GB')} from Elec-Mate.`,
    '',
    'Records (one CSV per type, in records/):',
    ...keys.map((k) => `  ${(EXPORT_LABEL[k] ?? k).padEnd(26)} ${recordCounts[k] ?? 0}`),
    '',
    opts.includeFiles
      ? `Files (in files/, by storage area): ${filesIncluded} of ${manifest.files.length} included.`
      : 'Files were not included in this export (records only).',
    ...(filesFailed.length
      ? [
          '',
          'Files that could not be included:',
          ...filesFailed.map((f) => `  ${f.path}: ${f.reason}`),
        ]
      : []),
    '',
    'Certificate form data is in the certificate PDFs; the CSV lists each certificate.',
    'Open the CSV files in Excel, Numbers or Google Sheets.',
  ];
  zip.file('README.txt', lines.join('\r\n'));
  zip.file(
    'manifest.json',
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        counts: recordCounts,
        files: manifest.files.length,
        files_included: filesIncluded,
      },
      null,
      2
    )
  );

  onProgress?.({ stage: 'zipping', done: 0, total: 1 });
  const blob = await zip.generateAsync(
    { type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } },
    (m) => onProgress?.({ stage: 'zipping', done: Math.round(m.percent), total: 100 })
  );
  const safe =
    firmName
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase() || 'firm';
  return {
    blob,
    fileName: `${safe}-elec-mate-export-${new Date().toISOString().slice(0, 10)}.zip`,
    recordCounts,
    filesIncluded,
    filesFailed,
  };
}

export function saveBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

/** Server-built export (edge function employer-full-export). Returns a signed link, or null when the function is not live. */
export async function requestServerExport(
  includeFiles: boolean
): Promise<{ url: string; size: number } | null> {
  const { data, error } = await supabase.functions.invoke('employer-full-export', {
    body: { include_files: includeFiles },
  });
  if (error) return null;
  const d = data as { url?: string; size?: number };
  return d?.url ? { url: d.url, size: d.size ?? 0 } : null;
}

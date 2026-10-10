/**
 * ELE-2067 — read an export file in the browser: CSV, TSV or Excel.
 * Nothing leaves the device until the person presses Import.
 */
import Papa from 'papaparse';
import type { ParsedFile } from './types';

export const MAX_FILE_BYTES = 40 * 1024 * 1024;
export const ACCEPT = '.csv,.tsv,.txt,.xlsx,.xls';

let seq = 0;

function tidyHeaders(raw: unknown[]): string[] {
  const seen = new Map<string, number>();
  return raw.map((h, i) => {
    let name =
      String(h ?? '')
        .replace(/^\ufeff/, '')
        .trim() || `Column ${i + 1}`;
    const n = seen.get(name) ?? 0;
    seen.set(name, n + 1);
    if (n > 0) name = `${name} (${n + 1})`;
    return name;
  });
}

function fromMatrix(name: string, size: number, matrix: unknown[][]): ParsedFile {
  // Skip leading blank rows and a Joblogic-style second row of "Required" hints.
  let start = 0;
  while (start < matrix.length && matrix[start].every((c) => String(c ?? '').trim() === ''))
    start++;
  const headers = tidyHeaders(matrix[start] ?? []);
  let body = matrix.slice(start + 1);
  if (
    body[0] &&
    body[0].filter((c) => /^(required|optional|mandatory)\b/i.test(String(c ?? '').trim()))
      .length >= 2
  ) {
    body = body.slice(1);
  }
  const rows: Record<string, unknown>[] = [];
  for (const r of body) {
    if (!r || r.every((c) => String(c ?? '').trim() === '')) continue;
    const o: Record<string, unknown> = {};
    headers.forEach((h, i) => {
      o[h] = r[i] ?? '';
    });
    rows.push(o);
  }
  return { id: `f${++seq}`, name, size, headers, rows };
}

type SheetCell = { t?: string; v?: unknown; z?: unknown; w?: string };
type Ssf = {
  is_date: (fmt: string | number) => boolean;
  parse_date_code: (v: number) => { y: number; m: number; d: number } | null;
};

/** Date-formatted number cells → 'YYYY-MM-DD' text, straight from the serial. */
export function datesToIso(sheet: Record<string, unknown>, ssf: Ssf): void {
  for (const [addr, raw] of Object.entries(sheet)) {
    if (addr.startsWith('!')) continue;
    const cell = raw as SheetCell;
    if (cell?.t !== 'n' || typeof cell.v !== 'number' || cell.z === undefined) continue;
    let isDate = false;
    try {
      isDate = ssf.is_date(cell.z as string | number);
    } catch {
      isDate = false;
    }
    if (!isDate) continue;
    const p = ssf.parse_date_code(cell.v);
    if (!p || !p.y) continue;
    const iso = `${String(p.y).padStart(4, '0')}-${String(p.m).padStart(2, '0')}-${String(p.d).padStart(2, '0')}`;
    cell.t = 's';
    cell.v = iso;
    cell.w = iso;
    delete cell.z;
  }
}

export async function parseExportFile(file: File): Promise<ParsedFile> {
  if (file.size > MAX_FILE_BYTES) {
    throw new Error(
      `${file.name} is over 40 MB. Split it, or send it to us with "Move me across for free".`
    );
  }
  const lower = file.name.toLowerCase();
  if (lower.endsWith('.xlsx') || lower.endsWith('.xls')) {
    const XLSX = await import('xlsx');
    const buf = await file.arrayBuffer();
    // cellDates would hand back a JS Date at local midnight, which reads a
    // day early once it goes through toISOString in British Summer Time.
    // Read the raw serial and turn date-formatted cells into the calendar
    // date the sheet shows, with no time zone involved.
    const wb = XLSX.read(buf, { type: 'array', cellDates: false, cellNF: true });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    if (!sheet) throw new Error(`${file.name} has no sheets.`);
    datesToIso(sheet, XLSX.SSF);
    const matrix = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, raw: true, defval: '' });
    return fromMatrix(file.name, file.size, matrix);
  }
  const text = await file.text();
  const parsed = Papa.parse<string[]>(text, {
    skipEmptyLines: 'greedy',
    delimiter: lower.endsWith('.tsv') ? '\t' : '',
  });
  if (parsed.errors.length && !parsed.data.length) {
    throw new Error(`${file.name} could not be read as CSV.`);
  }
  return fromMatrix(file.name, file.size, parsed.data as unknown[][]);
}

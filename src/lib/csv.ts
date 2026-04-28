/* ==========================================================================
   csv.ts — small CSV utilities for client-side exports.
   Quotes any cell that contains a comma, quote, newline, carriage return, or
   leading whitespace. Doubles internal quotes. Adds a UTF-8 BOM when triggered
   via downloadCsv() so Excel on Windows opens it as UTF-8 (£, é, etc).
   ========================================================================== */

export function csvCell(value: unknown): string {
  if (value == null) return '';
  let s: string;
  if (typeof value === 'string') s = value;
  else if (typeof value === 'number' || typeof value === 'boolean') s = String(value);
  else s = JSON.stringify(value);
  if (/[",\n\r]/.test(s) || /^\s/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function rowsToCsv<T extends Record<string, unknown>>(
  rows: T[],
  columns: Array<{ key: keyof T & string; header: string }>
): string {
  const head = columns.map((c) => csvCell(c.header)).join(',');
  const body = rows
    .map((r) => columns.map((c) => csvCell(r[c.key])).join(','))
    .join('\n');
  return `${head}\n${body}`;
}

/** Trigger a browser download for a CSV string. Adds a UTF-8 BOM. */
export function downloadCsv(csv: string, filename: string): void {
  const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

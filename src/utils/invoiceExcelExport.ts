/**
 * Invoice Summary Excel export — ELE-1328.
 *
 * Users without an accounting integration need a year-end spreadsheet for
 * their accountant. Builds an .xlsx titled "Invoice Summary - [Company]" over
 * a selectable issued-date range.
 *
 * Data completeness: this module fetches its OWN rows from the database with
 * explicit pagination — the invoices page state is both potentially stale and
 * subject to PostgREST's default 1,000-row cap, either of which would silently
 * truncate a year-end export.
 */

import * as XLSX from 'xlsx';
import { supabase } from '@/integrations/supabase/client';
// Content-agnostic blob saver: browser <a download>, native Filesystem+Share.
import { openOrDownloadBlobPdf } from '@/utils/pdf-download';
// Single source of truth for CIS maths (labour-share × rate) — same function
// the invoice builder uses, so the export matches the invoice the client saw.
import { computeQuoteTotals } from '@/utils/quote-calculations';
import type { QuoteItem, QuoteSettings } from '@/types/quote';

export interface InvoiceExportRange {
  from: Date;
  to: Date;
}

/** Slim, export-shaped row mapped straight from the quotes table. */
export interface ExportInvoiceRow {
  invoiceNumber: string;
  date: Date | null;
  due: Date | null;
  clientName: string;
  clientMobile: string;
  clientPhone: string;
  clientEmail: string;
  tax: number;
  subtotal: number;
  total: number;
  paid: number;
  paidDate: Date | null;
  paymentDetails: string;
  cisRate: number;
  cisDeducted: number;
  netPayable: number;
  status: string;
  vatTreatment: 'Standard' | 'Reverse charge' | 'No VAT';
}

const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const MONEY_FMT = '£#,##0.00';
const DATE_FMT = 'dd/mm/yyyy';
const PAGE_SIZE = 1000;

const toDate = (v: unknown): Date | null => {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(String(v));
  return isNaN(d.getTime()) ? null : d;
};

const money = (n: unknown): number => {
  const v = typeof n === 'number' ? n : parseFloat(String(n ?? ''));
  return isNaN(v) ? 0 : Math.round(v * 100) / 100;
};

const dateOnly = (d: Date): string => d.toISOString().split('T')[0];

/**
 * Fetch EVERY invoice row on the signed-in account, paginating past the
 * PostgREST per-request cap. Slim column set — no items/settings blobs except
 * the fields the export needs.
 */
export async function fetchAllInvoicesForExport(): Promise<ExportInvoiceRow[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not signed in');

  // deno-lint style note: plain any-ish rows from PostgREST, mapped immediately.
  const rows: Record<string, unknown>[] = [];
  for (let page = 0; ; page++) {
    const { data, error } = await supabase
      .from('quotes')
      .select(
        'invoice_number, invoice_date, created_at, invoice_due_date, invoice_status, invoice_paid_at, ' +
          'invoice_payment_method, invoice_payment_reference, client_data, ' +
          'subtotal, vat_amount, total, total_paid, settings, items, overhead, profit'
      )
      .eq('user_id', user.id)
      .eq('invoice_raised', true)
      .is('deleted_at', null)
      // Secondary sort on id: invoice_date ties across a page boundary would
      // otherwise let PostgREST duplicate/skip rows between pages.
      .order('invoice_date', { ascending: true })
      .order('id', { ascending: true })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
    if (error) throw error;
    rows.push(...(data ?? []));
    if (!data || data.length < PAGE_SIZE) break;
  }

  return rows
    .filter((r) => r.invoice_number)
    .map((r) => {
      const client = (r.client_data ?? {}) as Record<string, unknown>;
      const settings = (r.settings ?? {}) as Record<string, unknown>;
      const reverseCharge = settings.reverseCharge === true || settings.reverseCharge === 'true';
      const tax = money(r.vat_amount);
      const total = money(r.total);
      const status = String(r.invoice_status ?? 'draft');
      const paid = status === 'paid' ? total : money(r.total_paid);

      // CIS — recompute the deduction with the app's own calculator, anchored
      // to the STORED total so the export never contradicts the invoice.
      let cisRate = 0;
      let cisDeducted = 0;
      if (settings.cisEnabled === true || settings.cisEnabled === 'true') {
        try {
          const totals = computeQuoteTotals(
            (r.items ?? []) as QuoteItem[],
            settings as unknown as QuoteSettings,
            { applyOverheadAndProfit: money(r.overhead) > 0 || money(r.profit) > 0 }
          );
          cisRate = totals.cisRate;
          cisDeducted = totals.cisAmount;
        } catch (e) {
          console.warn('[invoiceExcelExport] CIS recompute failed for', r.invoice_number, e);
        }
      }

      return {
        invoiceNumber: String(r.invoice_number),
        // Some invoices predate the invoice_date column or were raised via
        // paths that never set it — fall back to created_at so a missing
        // date can never silently drop an invoice from the export.
        date: toDate(r.invoice_date) ?? toDate(r.created_at),
        due: toDate(r.invoice_due_date),
        clientName: String(client.name ?? ''),
        clientMobile: String(client.mobile ?? ''),
        clientPhone: String(client.phone ?? ''),
        clientEmail: String(client.email ?? ''),
        tax,
        subtotal: money(r.subtotal),
        total,
        paid,
        paidDate: toDate(r.invoice_paid_at),
        paymentDetails: [r.invoice_payment_method, r.invoice_payment_reference]
          .filter(Boolean)
          .join(' · '),
        cisRate,
        cisDeducted,
        netPayable: Math.round((total - cisDeducted) * 100) / 100,
        status: status.charAt(0).toUpperCase() + status.slice(1),
        vatTreatment: reverseCharge ? 'Reverse charge' : tax > 0 ? 'Standard' : 'No VAT',
      } satisfies ExportInvoiceRow;
    });
}

/** Rows issued inside the range (inclusive), oldest first. */
export function filterInvoicesForExport(
  rows: ExportInvoiceRow[],
  range: InvoiceExportRange
): ExportInvoiceRow[] {
  const from = new Date(range.from);
  from.setHours(0, 0, 0, 0);
  const to = new Date(range.to);
  to.setHours(23, 59, 59, 999);
  return rows.filter((r) => r.date && r.date >= from && r.date <= to);
}

const HEADER = [
  'Invoice',
  'Date',
  'Due',
  'Client',
  'Mobile',
  'Phone',
  'Client email',
  'Tax',
  'Subtotal',
  'Total',
  'Taxable',
  'Paid',
  'Paid date',
  'Balance due',
  'Payment details',
  'CIS rate',
  'CIS deducted',
  'Net payable',
  'Status',
  'VAT treatment',
] as const;

const LAST_COL = 'T'; // 20 columns, A..T
// Column letters for typed formatting. Money: H I J K L N Q R. Dates: B C M.
const MONEY_COLS = ['H', 'I', 'J', 'K', 'L', 'N', 'Q', 'R'];
const DATE_COLS = ['B', 'C', 'M'];
const HEADER_ROW = 4; // 1-based: title, range, blank, header

function applyCellFormats(sheet: XLSX.WorkSheet, dataRowCount: number) {
  for (let i = 0; i < dataRowCount; i++) {
    const excelRow = HEADER_ROW + 1 + i;
    for (const col of MONEY_COLS) {
      const cell = sheet[`${col}${excelRow}`];
      if (cell && cell.t === 'n') cell.z = MONEY_FMT;
    }
    for (const col of DATE_COLS) {
      const cell = sheet[`${col}${excelRow}`];
      if (cell) cell.z = DATE_FMT;
    }
  }
}

export async function exportInvoiceSummaryXlsx(
  rows: ExportInvoiceRow[],
  companyName: string,
  range: InvoiceExportRange
): Promise<number> {
  const inRange = filterInvoicesForExport(rows, range);
  const fromStr = dateOnly(range.from);
  const toStr = dateOnly(range.to);

  const body = inRange.map((r) => [
    r.invoiceNumber,
    r.date,
    r.due,
    r.clientName,
    r.clientMobile,
    r.clientPhone,
    r.clientEmail,
    r.tax,
    r.subtotal,
    r.total,
    // Taxable: DRC supplies are taxable (customer accounts for the VAT), so
    // they count here even though the Tax column is £0 for them.
    r.tax > 0 || r.vatTreatment === 'Reverse charge' ? r.subtotal : 0,
    r.paid,
    r.paidDate,
    Math.max(0, Math.round((r.total - r.paid) * 100) / 100),
    r.paymentDetails,
    r.cisRate > 0 ? `${r.cisRate}%` : '',
    r.cisDeducted,
    r.netPayable,
    r.status,
    r.vatTreatment,
  ]);

  const aoa: unknown[][] = [
    [`Invoice Summary - ${companyName || 'Elec-Mate'}`],
    [`${fromStr} to ${toStr}`],
    [],
    [...HEADER],
    ...body,
  ];

  const sheet = XLSX.utils.aoa_to_sheet(aoa, { cellDates: true });
  applyCellFormats(sheet, body.length);

  // Live totals row — SUM formulas so the accountant's edits recalculate.
  if (body.length > 0) {
    const firstData = HEADER_ROW + 1;
    const lastData = HEADER_ROW + body.length;
    const totalsRow = lastData + 1;
    sheet[`A${totalsRow}`] = { t: 's', v: 'Totals' };
    for (const col of MONEY_COLS) {
      sheet[`${col}${totalsRow}`] = {
        t: 'n',
        f: `SUM(${col}${firstData}:${col}${lastData})`,
        z: MONEY_FMT,
      };
    }
    sheet['!ref'] = `A1:${LAST_COL}${totalsRow}`;
  }

  // Merged title + range rows across the full width, filterable header.
  sheet['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: HEADER.length - 1 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: HEADER.length - 1 } },
  ];
  sheet['!autofilter'] = { ref: `A${HEADER_ROW}:${LAST_COL}${HEADER_ROW + body.length}` };
  sheet['!cols'] = HEADER.map((h, i) => ({
    // Date objects stringify long ("Mon Jul 13 2026 …") — size those columns
    // to the rendered dd/mm/yyyy instead, and cap the rest at a sane width.
    wch: Math.min(
      40,
      Math.max(
        h.length + 2,
        ...body.map((r) => (r[i] instanceof Date ? 12 : String(r[i] ?? '').length + 2)),
        10
      )
    ),
  }));

  // ── Summary sheet — the numbers an accountant asks for first ─────────────
  const sum = (fn: (r: ExportInvoiceRow) => number) =>
    Math.round(inRange.reduce((acc, r) => acc + fn(r), 0) * 100) / 100;
  const byStatus = (s: string) => inRange.filter((r) => r.status === s);
  const reverseChargeRows = inRange.filter((r) => r.vatTreatment === 'Reverse charge');
  const cisRows = inRange.filter((r) => r.cisDeducted > 0);

  // [label, value, isMoney] — money flags drive the cell format so inserting
  // a row can't silently misformat its neighbours.
  const summaryLines: ([string, number, boolean] | [])[] = [
    ['Invoices in period', inRange.length, false],
    ['Total invoiced (inc VAT)', sum((r) => r.total), true],
    ['Total collected', sum((r) => r.paid), true],
    ['Outstanding balance', sum((r) => Math.max(0, r.total - r.paid)), true],
    [],
    ['VAT charged (output VAT)', sum((r) => r.tax), true],
    ['Reverse charge invoices', reverseChargeRows.length, false],
    ['Reverse charge net value', sum((r) => (r.vatTreatment === 'Reverse charge' ? r.total : 0)), true],
    [],
    ['CIS invoices', cisRows.length, false],
    ['CIS deducted in period', sum((r) => r.cisDeducted), true],
    ['Net payable after CIS', sum((r) => r.netPayable), true],
    [],
    ['Paid invoices', byStatus('Paid').length, false],
    ['Sent / awaiting payment', byStatus('Sent').length, false],
    ['Overdue', byStatus('Overdue').length, false],
    ['Draft', byStatus('Draft').length, false],
  ];

  const summaryAoa: unknown[][] = [
    [`Invoice Summary - ${companyName || 'Elec-Mate'}`],
    [`Period: ${fromStr} to ${toStr}`],
    [],
    ...summaryLines.map((l) => (l.length ? [l[0], l[1]] : [])),
  ];
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryAoa);
  summarySheet['!cols'] = [{ wch: 30 }, { wch: 16 }];
  summaryLines.forEach((l, i) => {
    if (l.length && l[2]) {
      const cell = summarySheet[`B${4 + i}`]; // data starts at Excel row 4
      if (cell && cell.t === 'n') cell.z = MONEY_FMT;
    }
  });

  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, summarySheet, 'Summary');
  XLSX.utils.book_append_sheet(book, sheet, 'Invoices');

  const buffer = XLSX.write(book, { type: 'array', bookType: 'xlsx', cellDates: true });
  const blob = new Blob([buffer], { type: XLSX_MIME });
  await openOrDownloadBlobPdf(blob, `Invoice-Summary-${fromStr}--${toStr}.xlsx`);
  return inRange.length;
}

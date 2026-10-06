import { rowsToCsv, downloadCsv } from '@/lib/csv';
import { formatGBP, formatMargin, type FinancePeriod, type FinanceSummary } from '@/lib/financeDefinitions';
import type { LedgerEntry } from '@/services/employerAccountsService';

/**
 * P&L and ledger exports for Accounts and Reports. Same figures as the screen —
 * the exports read the shared finance model, they never recompute.
 */

const periodText = (p: FinancePeriod) =>
  p.from && p.to
    ? `${new Date(`${p.from}T12:00:00`).toLocaleDateString('en-GB')} to ${new Date(`${p.to}T12:00:00`).toLocaleDateString('en-GB')}`
    : 'All time';

const fileStamp = (p: FinancePeriod) => (p.from && p.to ? `${p.from}_to_${p.to}` : 'all-time');

/** P&L lines in display order — used by CSV, PDF and the screen alike. */
export function pnlLines(s: FinanceSummary): { section: string; line: string; amount: number }[] {
  return [
    { section: 'Revenue', line: 'Invoiced (sent, overdue and paid)', amount: s.invoiced },
    { section: 'Costs', line: 'Materials (purchase orders)', amount: s.materials },
    { section: 'Costs', line: 'Supplier invoices (not on a PO)', amount: s.supplierInvoices },
    { section: 'Costs', line: 'Expenses (approved claims)', amount: s.expenses },
    { section: 'Costs', line: 'Labour (approved timesheets, overtime included)', amount: s.labour },
    { section: 'Costs', line: 'Other job costs', amount: s.otherCosts },
    { section: 'Costs', line: 'Total costs', amount: s.totalCosts },
    { section: 'Profit', line: 'Gross profit (invoiced less costs)', amount: s.grossProfit },
    { section: 'Cash', line: 'Cash in (invoices paid in the period)', amount: s.paidIn },
    { section: 'Cash', line: 'Outstanding today (sent and overdue, unpaid)', amount: s.outstanding },
    { section: 'Cash', line: 'Of which overdue', amount: s.overdue },
  ];
}

export function exportPnlCsv(s: FinanceSummary, period: FinancePeriod) {
  const rows = pnlLines(s).map((l) => ({ ...l, amount: l.amount.toFixed(2) }));
  rows.push({ section: 'Profit', line: 'Margin %', amount: s.marginPct === null ? '' : s.marginPct.toFixed(1) });
  const csv =
    `Profit and loss,${periodText(period)}\n` +
    rowsToCsv(rows, [
      { key: 'section', header: 'Section' },
      { key: 'line', header: 'Line' },
      { key: 'amount', header: 'Amount (GBP)' },
    ]);
  downloadCsv(csv, `profit-and-loss_${fileStamp(period)}.csv`);
}

export function exportLedgerCsv(entries: LedgerEntry[], period: FinancePeriod) {
  const rows = entries.map((e) => ({
    date: e.entry_date,
    direction: e.direction === 'in' ? 'Money in' : 'Money out',
    category: e.category,
    reference: e.reference ?? '',
    counterparty: e.counterparty ?? '',
    amount: (e.direction === 'in' ? e.amount : -e.amount).toFixed(2),
  }));
  const csv = rowsToCsv(rows, [
    { key: 'date', header: 'Date' },
    { key: 'direction', header: 'Direction' },
    { key: 'category', header: 'Category' },
    { key: 'reference', header: 'Reference' },
    { key: 'counterparty', header: 'Counterparty' },
    { key: 'amount', header: 'Amount (GBP)' },
  ]);
  downloadCsv(csv, `ledger_${fileStamp(period)}.csv`);
}

/** One PDF: P&L summary then the ledger. jsPDF is loaded on demand. */
export async function exportAccountsPdf(
  s: FinanceSummary,
  entries: LedgerEntry[],
  period: FinancePeriod,
  businessName?: string | null
) {
  const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable'),
  ]);
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const left = 14;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(businessName ? `${businessName} — accounts` : 'Accounts', left, 18);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`${period.label} · ${periodText(period)}`, left, 25);
  doc.text(`Generated ${new Date().toLocaleString('en-GB')}`, left, 30);

  autoTable(doc, {
    startY: 36,
    head: [['Profit and loss', 'Amount']],
    body: [
      ...pnlLines(s).map((l) => [l.line, formatGBP(l.amount)]),
      ['Margin', formatMargin(s.marginPct)],
    ],
    styles: { fontSize: 9 },
    headStyles: { fillColor: [30, 30, 30] },
    columnStyles: { 1: { halign: 'right' } },
  });

  const afterPnl = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 120;
  autoTable(doc, {
    startY: afterPnl + 8,
    head: [['Date', 'Category', 'Reference', 'Counterparty', 'In', 'Out']],
    body: entries.map((e) => [
      new Date(`${e.entry_date}T12:00:00`).toLocaleDateString('en-GB'),
      e.category,
      e.reference ?? '',
      e.counterparty ?? '',
      e.direction === 'in' ? formatGBP(e.amount) : '',
      e.direction === 'out' ? formatGBP(e.amount) : '',
    ]),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [30, 30, 30] },
    columnStyles: { 4: { halign: 'right' }, 5: { halign: 'right' } },
  });

  const finalY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 250;
  doc.setFontSize(8);
  doc.text(
    'Gross profit is invoiced less costs. Labour is gross pay before PAYE, NI and pension. Not a statutory set of accounts.',
    left,
    Math.min(finalY + 8, 287)
  );

  doc.save(`accounts_${fileStamp(period)}.pdf`);
}

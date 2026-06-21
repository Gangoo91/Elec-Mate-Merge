/**
 * Project Pack — assembler (v1).
 *
 * v1 builds a single jsPDF document: the branded cover sheet + a project
 * expenses summary, saved/shared via saveOrSharePdf. v2 will additionally
 * merge the project's document PDFs (quote/cert/invoice/RAMS/site-visit) with
 * pdf-lib once their PDF bytes are confirmed retrievable.
 */
import type jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveOrSharePdf } from '@/utils/save-or-share-pdf';
import { getBrandColour, addAccentBar, readableTextOn } from '@/utils/pdfBrand';
import { getCategoryConfig, type Expense } from '@/types/expense';
import {
  generateProjectPackCover,
  loadImageAsDataUrl,
  type ProjectPackCoverData,
} from './projectPackCover';

const gbpExact = (n: number): string =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n || 0);

const fmtDate = (iso?: string): string => {
  if (!iso) return '—';
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? '—'
    : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

/** Append a branded "Project expenses" summary page to an existing pack doc. */
export function addExpensesSummaryPage(
  doc: jsPDF,
  opts: { expenses: Expense[]; total: number; brandHex?: string }
): void {
  const brand = getBrandColour(opts.brandHex);
  const margin = 16;
  doc.addPage();
  addAccentBar(doc, brand, 4);

  let y = 24;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(brand[0], brand[1], brand[2]);
  doc.text('PROJECT EXPENSES', margin, y, { charSpace: 0.6 });

  y += 9;
  doc.setFontSize(18);
  doc.setTextColor(17, 24, 39);
  doc.text(`${gbpExact(opts.total)} total spend`, margin, y);
  y += 6;

  autoTable(doc, {
    startY: y,
    head: [['Date', 'Category', 'Details', 'Amount']],
    body: opts.expenses.map((e) => [
      fmtDate(e.date),
      getCategoryConfig(e.category).label,
      e.vendor || e.description || '—',
      gbpExact(e.amount),
    ]),
    foot: [['', '', 'Total', gbpExact(opts.total)]],
    headStyles: {
      fillColor: brand,
      textColor: readableTextOn(brand),
      fontStyle: 'bold',
      fontSize: 9,
    },
    footStyles: { fillColor: [248, 250, 252], textColor: [17, 24, 39], fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 2.5 },
    columnStyles: {
      0: { cellWidth: 28 },
      3: { halign: 'right', cellWidth: 28 },
    },
    margin: { left: margin, right: margin },
  });
}

export interface BuildProjectPackOptions {
  cover: ProjectPackCoverData;
  expenses: Expense[];
  expenseTotal: number;
  brandHex?: string;
  fileName: string;
}

/**
 * Build the v1 project pack (cover + expenses summary) and save/share it.
 * Resolves the company logo + scheme badge to data URLs for the cover.
 */
export async function buildAndSaveProjectPack(opts: BuildProjectPackOptions): Promise<void> {
  const [logoDataUrl, schemeLogoDataUrl] = await Promise.all([
    loadImageAsDataUrl(opts.cover.company.logo_url),
    loadImageAsDataUrl(opts.cover.schemeLogoDataUrl),
  ]);

  const doc = generateProjectPackCover({ ...opts.cover, logoDataUrl, schemeLogoDataUrl });

  if (opts.expenses.length > 0) {
    addExpensesSummaryPage(doc, {
      expenses: opts.expenses,
      total: opts.expenseTotal,
      brandHex: opts.brandHex,
    });
  }

  await saveOrSharePdf(doc, opts.fileName);
}

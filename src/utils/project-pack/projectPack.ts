/**
 * Project Pack — assembler.
 *
 * The client builds the branded cover + expenses summary (jsPDF). For the full
 * handover pack we hand those bytes to the `assemble-project-pack` edge
 * function, which merges the project's linked document PDFs (quotes, certs,
 * invoices) server-side (no browser CORS) and returns a signed URL.
 *
 * buildAndSaveProjectPack() is the cover-only fallback (used if the server
 * merge fails) — saves the cover + expenses locally.
 */
import type jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { saveOrSharePdf } from '@/utils/save-or-share-pdf';
import { openOrDownloadPdf } from '@/utils/pdf-download';
import { supabase } from '@/integrations/supabase/client';
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
}

/** Build the cover + expenses-summary jsPDF doc (resolves logo + scheme badge). */
export async function buildProjectPackDoc(opts: BuildProjectPackOptions): Promise<jsPDF> {
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
  return doc;
}

/** Cover-only fallback: save the cover + expenses summary locally. */
export async function buildAndSaveProjectPack(
  opts: BuildProjectPackOptions & { fileName: string }
): Promise<void> {
  const doc = await buildProjectPackDoc(opts);
  await saveOrSharePdf(doc, opts.fileName);
}

export interface AssembleResult {
  included: string[];
  skipped: string[];
  pageCount?: number;
}

/**
 * Full pack: build the cover, then merge the project's linked document PDFs
 * server-side and open the result. Throws on failure so the caller can fall
 * back to buildAndSaveProjectPack.
 */
export async function assembleProjectPackServer(
  opts: BuildProjectPackOptions & { projectId: string; fileName: string }
): Promise<AssembleResult> {
  const doc = await buildProjectPackDoc(opts);
  const coverBase64 = doc.output('datauristring'); // data:application/pdf;base64,...

  const { data, error } = await supabase.functions.invoke('assemble-project-pack', {
    body: { projectId: opts.projectId, coverBase64, fileName: opts.fileName },
  });
  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  if (data?.url) await openOrDownloadPdf(data.url, opts.fileName);

  return {
    included: data?.included ?? [],
    skipped: data?.skipped ?? [],
    pageCount: data?.pageCount,
  };
}

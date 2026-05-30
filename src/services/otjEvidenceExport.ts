import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Papa from 'papaparse';
import { saveOrSharePdf } from '@/utils/save-or-share-pdf';
import { buildOtjHtml } from './otjEvidenceHtml';

/* ==========================================================================
   OTJ evidence pack export. The PDF is rendered from the editorial HTML
   template (otjEvidenceHtml) via html2canvas → jsPDF, so the in-app output
   matches the headless-Chrome design preview. CSV via papaparse.
   ========================================================================== */

const LOGO_URL = '/images/elec-mate-logo-512.png';
const PAGE_PX_W = 794; // A4 @ 96dpi
const PAGE_PX_H = 1123;

export interface OtjExportEntry {
  date: string;
  title: string;
  activityType: string;
  source: string;
  status: string;
  durationMinutes: number;
  verifier: string | null;
  evidenceCount: number;
}

export interface OtjVerification {
  date: string;
  title: string;
  durationMinutes: number;
  verifierName: string;
  verifierRole: string;
  verifierContact: string | null;
  statement: string;
  verifiedAt: string | null;
}

export interface OtjExportData {
  learner: {
    name: string;
    uln: string | null;
    standard: string | null;
    level: string | null;
    provider: string | null;
    employer: string | null;
    startDate: string | null;
    endDate: string | null;
  };
  totalTargetHours: number;
  summary: {
    defensibleHours: number;
    pendingHours: number;
    verificationRatePct: number;
    totalEntries: number;
  };
  entries: OtjExportEntry[];
  verifications: OtjVerification[];
}

async function loadImageDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const r = new FileReader();
      r.onloadend = () => resolve(typeof r.result === 'string' ? r.result : null);
      r.onerror = () => resolve(null);
      r.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function exportOtjEvidencePack(data: OtjExportData): Promise<void> {
  const logo = (await loadImageDataUrl(LOGO_URL)) ?? '';
  const generated = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const html = buildOtjHtml(data, logo, generated);

  // Render the template inside an isolated off-screen iframe so the app's
  // global CSS can't bleed into the document.
  const iframe = document.createElement('iframe');
  iframe.setAttribute('aria-hidden', 'true');
  iframe.style.cssText = `position:fixed;left:-10000px;top:0;width:${PAGE_PX_W}px;height:${PAGE_PX_H}px;border:0;background:#fff`;
  document.body.appendChild(iframe);

  try {
    const idoc = iframe.contentDocument;
    if (!idoc) throw new Error('Could not prepare the document');
    idoc.open();
    idoc.write(html);
    idoc.close();

    // Let layout settle, then wait for fonts + images.
    await new Promise((r) => setTimeout(r, 60));
    try {
      await (idoc as Document & { fonts?: { ready?: Promise<unknown> } }).fonts?.ready;
    } catch {
      /* fonts API optional */
    }
    await Promise.all(
      Array.from(idoc.images).map((im) =>
        im.complete
          ? Promise.resolve()
          : new Promise<void>((res) => {
              im.onload = () => res();
              im.onerror = () => res();
            })
      )
    );

    const pages = Array.from(idoc.querySelectorAll<HTMLElement>('.page'));
    const pdf = new jsPDF('p', 'mm', 'a4');
    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i], {
        scale: 2,
        backgroundColor: '#ffffff',
        width: PAGE_PX_W,
        height: PAGE_PX_H,
        windowWidth: PAGE_PX_W,
        windowHeight: PAGE_PX_H,
        useCORS: true,
        logging: false,
      });
      const img = canvas.toDataURL('image/jpeg', 0.92);
      if (i > 0) pdf.addPage();
      pdf.addImage(img, 'JPEG', 0, 0, 210, 297);
    }

    const stamp = new Date().toISOString().split('T')[0];
    const safe = data.learner.name.replace(/[^a-zA-Z0-9]/g, '_') || 'Apprentice';
    await saveOrSharePdf(pdf, `${safe}_Off-the-Job_Record_${stamp}.pdf`);
  } finally {
    document.body.removeChild(iframe);
  }
}

export function exportOtjCsv(data: OtjExportData): void {
  const rows = data.entries.map((e) => ({
    Date: e.date,
    Activity: e.title,
    Type: e.activityType,
    Source: e.source,
    Status: e.status,
    Hours: (e.durationMinutes / 60).toFixed(2),
    Verifier: e.verifier ?? '',
    Evidence: e.evidenceCount,
  }));
  const csv = Papa.unparse(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().split('T')[0];
  const safe = data.learner.name.replace(/[^a-zA-Z0-9]/g, '_') || 'Apprentice';
  a.href = url;
  a.download = `${safe}_Off-the-Job_Log_${stamp}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

import Papa from 'papaparse';
import { buildOtjHtml } from './otjEvidenceHtml';
import { printHtmlDocument } from '@/utils/printHtmlDocument';

/* ==========================================================================
   OTJ evidence pack export. The PDF is produced by rendering the editorial
   HTML template (otjEvidenceHtml) through the browser's own print engine
   (window.print on an off-screen iframe), so the output is vector-crisp and
   pixel-matches the design — html2canvas was dropping inter-word spaces and
   softening text. The user picks "Save as PDF" in the print dialog. CSV via
   papaparse.
   ========================================================================== */

const LOGO_URL = '/images/elec-mate-logo-512.png';

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
  await printHtmlDocument(html);
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

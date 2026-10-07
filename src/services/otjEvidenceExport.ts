import Papa from 'papaparse';

/* ==========================================================================
   OTJ log export: the CSV only. The PDF is rendered in PDFMonkey by the
   learner-document-pdf edge function (kind otj_log, ELE-2017).
   ========================================================================== */

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

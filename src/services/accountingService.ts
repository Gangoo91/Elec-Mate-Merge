// Accounting Export Service - Backend-ready abstraction layer
// Formats data for different accounting software exports

import { AccountingExport, AccountingProvider, PayrollEntry } from './types';
import { format } from 'date-fns';
import { Capacitor } from '@capacitor/core';
import { saveOrShareFile } from '@/utils/save-or-share-file';

// Generate export data for accounting software
export const createAccountingExport = (
  provider: AccountingProvider,
  entries: PayrollEntry[],
  periodStart: string,
  periodEnd: string
): AccountingExport => {
  const totalHours = entries.reduce((sum, e) => sum + e.regularHours + e.overtimeHours, 0);
  const totalCost = entries.reduce((sum, e) => sum + e.grossPay, 0);

  return {
    id: `EXP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    provider,
    entries,
    period: { start: periodStart, end: periodEnd },
    status: 'draft',
    totalHours,
    totalCost,
    createdAt: new Date().toISOString(),
  };
};

// Format for Xero CSV import
export const formatForXero = (entries: PayrollEntry[]): string => {
  const headers = [
    'Employee ID',
    'Employee Name',
    'Pay Period Start',
    'Pay Period End',
    'Ordinary Hours',
    'Overtime Hours',
    'Hourly Rate',
    'Gross Pay',
    'Leave Days',
    'Leave Detail',
    ...PAY_LAW_HEADERS,
  ];

  const rows = entries.map((e) => [
    e.employeeId,
    csvCell(e.employeeName),
    e.periodStart,
    e.periodEnd,
    e.regularHours.toFixed(2),
    e.overtimeHours.toFixed(2),
    e.hourlyRate.toFixed(2),
    e.grossPay.toFixed(2),
    e.leaveDays.toFixed(1),
    csvCell(e.leaveDetail),
    ...payLawCells(e),
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
};

// Format for Sage CSV import
export const formatForSage = (entries: PayrollEntry[]): string => {
  const headers = [
    'Emp No',
    'Name',
    'Week Start',
    'Week End',
    'Basic Hours',
    'OT Hours',
    'Rate',
    'Total',
    'Hol Days',
    ...PAY_LAW_HEADERS,
  ];

  const rows = entries.map((e) => [
    e.employeeId,
    csvCell(e.employeeName),
    format(new Date(e.periodStart), 'dd/MM/yyyy'),
    format(new Date(e.periodEnd), 'dd/MM/yyyy'),
    e.regularHours.toFixed(2),
    e.overtimeHours.toFixed(2),
    e.hourlyRate.toFixed(2),
    e.grossPay.toFixed(2),
    e.leaveDays.toFixed(1),
    ...payLawCells(e),
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
};

// Format for QuickBooks CSV import
export const formatForQuickBooks = (entries: PayrollEntry[]): string => {
  const headers = [
    'Employee',
    'Pay Period',
    'Regular Hours',
    'Overtime Hours',
    'Pay Rate',
    'Gross Wages',
    'Leave Days',
    'Job Allocations',
    ...PAY_LAW_HEADERS,
  ];

  const rows = entries.map((e) => {
    const jobAllocations = e.jobBreakdown.map((j) => `${j.jobTitle}: ${j.hours}h`).join('; ');

    return [
      csvCell(e.employeeName),
      `${e.periodStart} to ${e.periodEnd}`,
      e.regularHours.toFixed(2),
      e.overtimeHours.toFixed(2),
      e.hourlyRate.toFixed(2),
      e.grossPay.toFixed(2),
      e.leaveDays.toFixed(1),
      csvCell(jobAllocations),
      ...payLawCells(e),
    ];
  });

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
};

// Format for generic CSV export
export const formatForGenericCSV = (entries: PayrollEntry[]): string => {
  const headers = [
    'Employee ID',
    'Employee Name',
    'Period Start',
    'Period End',
    'Pay Type',
    'Regular Hours',
    'Overtime Hours',
    'Hourly Rate',
    'Overtime Rate',
    'Regular Pay',
    'Overtime Pay',
    'Gross Pay',
    'Leave Days',
    'Leave Detail',
    ...PAY_LAW_HEADERS,
  ];

  const payTypeLabel: Record<PayrollEntry['payType'], string> = {
    hourly: 'Hourly',
    annual: 'Salaried',
    day_rate: 'Day rate',
  };

  const rows = entries.map((e) => {
    const regularPay = e.regularHours * e.hourlyRate;
    const overtimePay = e.overtimeHours * e.hourlyRate * e.overtimeMultiplier;

    return [
      e.employeeId,
      csvCell(e.employeeName),
      e.periodStart,
      e.periodEnd,
      payTypeLabel[e.payType] ?? e.payType,
      e.regularHours.toFixed(2),
      e.overtimeHours.toFixed(2),
      e.hourlyRate.toFixed(2),
      (e.hourlyRate * e.overtimeMultiplier).toFixed(2),
      regularPay.toFixed(2),
      overtimePay.toFixed(2),
      e.grossPay.toFixed(2),
      e.leaveDays.toFixed(1),
      csvCell(e.leaveDetail),
      ...payLawCells(e),
    ];
  });

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
};

// Get CSV content based on provider
export const getExportCSV = (provider: AccountingProvider, entries: PayrollEntry[]): string => {
  switch (provider) {
    case 'xero':
      return formatForXero(entries);
    case 'sage':
      return formatForSage(entries);
    case 'quickbooks':
    case 'intuit':
      return formatForQuickBooks(entries);
    case 'csv':
    default:
      return formatForGenericCSV(entries);
  }
};

// Hours-only payroll file — for office managers, who approve hours but must
// never see pay rates or money (can_see_firm_money). Same per-day overtime
// split as the priced files, so the hours always agree with the owner's export.
export const formatHoursOnlyCSV = (entries: PayrollEntry[]): string => {
  const headers = [
    'Employee ID',
    'Employee Name',
    'Period Start',
    'Period End',
    'Regular Hours',
    'Overtime Hours',
    'Total Hours',
    'Leave Days',
    'Leave Detail',
    'Job Allocations',
    ...HOURS_LAW_HEADERS,
  ];
  const rows = entries.map((e) => [
    e.employeeId,
    csvCell(e.employeeName),
    e.periodStart,
    e.periodEnd,
    e.regularHours.toFixed(2),
    e.overtimeHours.toFixed(2),
    (e.regularHours + e.overtimeHours).toFixed(2),
    e.leaveDays.toFixed(1),
    csvCell(e.leaveDetail),
    csvCell(e.jobBreakdown.map((j) => `${j.jobTitle}: ${j.hours.toFixed(2)}h`).join('; ')),
    ...hoursLawCells(e),
  ]);
  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
};

/* ELE-2062: holiday and SSP columns, added at the END of every file so an
   import mapping set up on the old columns keeps working. */
const num2 = (n: number | null | undefined) => (n == null ? '' : n.toFixed(2));
const PAY_LAW_HEADERS = [
  'Holiday Hours',
  'Holiday Pay',
  'Holiday Accrued Hours',
  'Rolled-up Holiday Pay',
  'SSP Days',
  'SSP Pay',
  'Holiday/SSP Estimate',
  'Holiday/SSP Notes',
];
const payLawCells = (e: PayrollEntry): string[] => [
  num2(e.holidayHours),
  num2(e.holidayPay),
  num2(e.holidayAccruedHours),
  num2(e.rolledUpHolidayPay),
  e.sspDays != null ? String(e.sspDays) : '',
  num2(e.sspPay),
  e.payLawEstimate ? 'Estimate' : '',
  csvCell(e.payLawNotes ?? ''),
];
const HOURS_LAW_HEADERS = ['Holiday Hours', 'Holiday Accrued Hours', 'SSP Days', 'Notes'];
const hoursLawCells = (e: PayrollEntry): string[] => [
  num2(e.holidayHours),
  num2(e.holidayAccruedHours),
  e.sspDays != null ? String(e.sspDays) : '',
  csvCell(e.payLawNotes ?? ''),
];

/** Quote a CSV cell — names like "Smith, J" or a job called 'Unit 4 "B"' must
 *  not split the row in Excel/Xero. */
function csvCell(value: string): string {
  return `"${(value ?? '').replace(/"/g, '""')}"`;
}

export interface ExportResult {
  filename: string;
  /** 'share-sheet' = the phone's share sheet opened (Save to Files, email…). */
  method: 'share-sheet' | 'download' | 'opened-tab';
  cancelled: boolean;
}

/**
 * Get a CSV off the device — and make it actually arrive on a phone.
 *
 * The old version built an <a download> and clicked it. Inside the iOS app
 * (WKWebView) that silently does nothing, so a boss exporting payroll from the
 * van got no file and no error (ELE-1952). Order of preference:
 *   1. Native app → saveOrShareFile (writes to cache, opens the share sheet).
 *   2. Phone/tablet browser with the Web Share API → share the File itself, so
 *      it can go straight to Files, email or WhatsApp.
 *   3. Anything else → an object-URL download (desktop browsers).
 *
 * MUST be called straight from the tap handler: navigator.share() needs the
 * user gesture, so nothing is awaited before it is called.
 */
export const saveCSVFile = async (csv: string, filename: string): Promise<ExportResult> => {
  // BOM so Excel opens £ and accented names correctly
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });

  if (Capacitor.isNativePlatform()) {
    const r = await saveOrShareFile(blob, filename);
    return { filename, method: r.method, cancelled: r.cancelled };
  }

  // Phones and tablets only — desktop Chrome/Safari also implement
  // navigator.share, and a share sheet is the wrong answer on a laptop.
  const coarsePointer =
    typeof window !== 'undefined' &&
    ((typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches) ||
      (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0 && window.innerWidth < 1024));
  if (coarsePointer && typeof navigator !== 'undefined' && typeof File !== 'undefined') {
    try {
      const file = new File([blob], filename, { type: 'text/csv' });
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: filename });
          return { filename, method: 'share-sheet', cancelled: false };
        } catch (err) {
          if ((err as Error)?.name === 'AbortError') {
            return { filename, method: 'share-sheet', cancelled: true };
          }
          // NotAllowedError etc. — fall through to a plain download
        }
      }
    } catch {
      // File constructor unsupported — fall through
    }
  }

  const r = await saveOrShareFile(blob, filename);
  return { filename, method: r.method, cancelled: r.cancelled };
};

export const exportFilename = (
  kind: AccountingProvider | 'hours',
  periodStart: string,
  periodEnd: string
): string =>
  kind === 'hours'
    ? `hours-${periodStart}-to-${periodEnd}.csv`
    : `payroll-${kind}-${periodStart}-to-${periodEnd}.csv`;

// Download (or share) the payroll CSV for one provider
export const downloadExportCSV = (
  provider: AccountingProvider,
  entries: PayrollEntry[],
  periodStart: string,
  periodEnd: string
): Promise<ExportResult> =>
  saveCSVFile(getExportCSV(provider, entries), exportFilename(provider, periodStart, periodEnd));

// Hours only, no money — the office manager's export
export const downloadHoursCSV = (
  entries: PayrollEntry[],
  periodStart: string,
  periodEnd: string
): Promise<ExportResult> =>
  saveCSVFile(formatHoursOnlyCSV(entries), exportFilename('hours', periodStart, periodEnd));

// Get provider display name
export const getProviderName = (provider: AccountingProvider): string => {
  const names: Record<AccountingProvider, string> = {
    xero: 'Xero',
    sage: 'Sage',
    quickbooks: 'QuickBooks',
    intuit: 'Intuit',
    csv: 'Generic CSV',
  };
  return names[provider] || provider;
};

// Format for job cost breakdown (useful for job financials)
export const generateJobCostReport = (
  entries: PayrollEntry[]
): Array<{
  jobId: string;
  jobTitle: string;
  totalHours: number;
  totalCost: number;
  workers: Array<{ name: string; hours: number; cost: number }>;
}> => {
  const jobMap = new Map<
    string,
    {
      jobId: string;
      jobTitle: string;
      totalHours: number;
      totalCost: number;
      workers: Map<string, { name: string; hours: number; cost: number }>;
    }
  >();

  entries.forEach((entry) => {
    entry.jobBreakdown.forEach((job) => {
      const existing = jobMap.get(job.jobId) || {
        jobId: job.jobId,
        jobTitle: job.jobTitle,
        totalHours: 0,
        totalCost: 0,
        workers: new Map(),
      };

      existing.totalHours += job.hours;
      existing.totalCost += job.cost;

      const worker = existing.workers.get(entry.employeeId) || {
        name: entry.employeeName,
        hours: 0,
        cost: 0,
      };
      worker.hours += job.hours;
      worker.cost += job.cost;
      existing.workers.set(entry.employeeId, worker);

      jobMap.set(job.jobId, existing);
    });
  });

  return Array.from(jobMap.values()).map((job) => ({
    jobId: job.jobId,
    jobTitle: job.jobTitle,
    totalHours: job.totalHours,
    totalCost: job.totalCost,
    workers: Array.from(job.workers.values()),
  }));
};

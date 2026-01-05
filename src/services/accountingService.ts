// Accounting Export Service - Backend-ready abstraction layer
// Formats data for different accounting software exports

import { AccountingExport, AccountingProvider, PayrollEntry } from './types';
import { format } from 'date-fns';

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
  ];

  const rows = entries.map(e => [
    e.employeeId,
    e.employeeName,
    e.periodStart,
    e.periodEnd,
    e.regularHours.toFixed(2),
    e.overtimeHours.toFixed(2),
    e.hourlyRate.toFixed(2),
    e.grossPay.toFixed(2),
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
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
  ];

  const rows = entries.map(e => [
    e.employeeId,
    `"${e.employeeName}"`,
    format(new Date(e.periodStart), 'dd/MM/yyyy'),
    format(new Date(e.periodEnd), 'dd/MM/yyyy'),
    e.regularHours.toFixed(2),
    e.overtimeHours.toFixed(2),
    e.hourlyRate.toFixed(2),
    e.grossPay.toFixed(2),
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
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
    'Job Allocations',
  ];

  const rows = entries.map(e => {
    const jobAllocations = e.jobBreakdown
      .map(j => `${j.jobTitle}: ${j.hours}h`)
      .join('; ');

    return [
      `"${e.employeeName}"`,
      `${e.periodStart} to ${e.periodEnd}`,
      e.regularHours.toFixed(2),
      e.overtimeHours.toFixed(2),
      e.hourlyRate.toFixed(2),
      e.grossPay.toFixed(2),
      `"${jobAllocations}"`,
    ];
  });

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
};

// Format for generic CSV export
export const formatForGenericCSV = (entries: PayrollEntry[]): string => {
  const headers = [
    'Employee ID',
    'Employee Name',
    'Period Start',
    'Period End',
    'Regular Hours',
    'Overtime Hours',
    'Hourly Rate',
    'Overtime Rate',
    'Regular Pay',
    'Overtime Pay',
    'Gross Pay',
  ];

  const rows = entries.map(e => {
    const regularPay = e.regularHours * e.hourlyRate;
    const overtimePay = e.overtimeHours * e.hourlyRate * 1.5;

    return [
      e.employeeId,
      `"${e.employeeName}"`,
      e.periodStart,
      e.periodEnd,
      e.regularHours.toFixed(2),
      e.overtimeHours.toFixed(2),
      e.hourlyRate.toFixed(2),
      (e.hourlyRate * 1.5).toFixed(2),
      regularPay.toFixed(2),
      overtimePay.toFixed(2),
      e.grossPay.toFixed(2),
    ];
  });

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
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

// Download CSV file
export const downloadExportCSV = (provider: AccountingProvider, entries: PayrollEntry[], periodStart: string, periodEnd: string): void => {
  const csv = getExportCSV(provider, entries);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const filename = `payroll-export-${provider}-${periodStart}-to-${periodEnd}.csv`;
  
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

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
export const generateJobCostReport = (entries: PayrollEntry[]): Array<{
  jobId: string;
  jobTitle: string;
  totalHours: number;
  totalCost: number;
  workers: Array<{ name: string; hours: number; cost: number }>;
}> => {
  const jobMap = new Map<string, {
    jobId: string;
    jobTitle: string;
    totalHours: number;
    totalCost: number;
    workers: Map<string, { name: string; hours: number; cost: number }>;
  }>();

  entries.forEach(entry => {
    entry.jobBreakdown.forEach(job => {
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

  return Array.from(jobMap.values()).map(job => ({
    jobId: job.jobId,
    jobTitle: job.jobTitle,
    totalHours: job.totalHours,
    totalCost: job.totalCost,
    workers: Array.from(job.workers.values()),
  }));
};

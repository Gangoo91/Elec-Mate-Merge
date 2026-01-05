// Service layer types - Backend-ready interfaces

export type LeaveType = 'annual' | 'sick' | 'unpaid' | 'compassionate' | 'training' | 'bank_holiday';
export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export type AccountingProvider = 'xero' | 'sage' | 'quickbooks' | 'intuit' | 'csv';

export interface HolidayAllowance {
  id: string;
  employeeId: string;
  yearStart: string; // ISO date
  yearEnd: string;
  totalDays: number;
  usedDays: number;
  pendingDays: number;
  carriedOver: number;
  bankHolidays: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  halfDay?: 'am' | 'pm';
  totalDays: number;
  status: LeaveStatus;
  reason?: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectedReason?: string;
  createdAt: string;
}

export interface PayrollEntry {
  employeeId: string;
  employeeName: string;
  periodStart: string;
  periodEnd: string;
  regularHours: number;
  overtimeHours: number;
  hourlyRate: number;
  grossPay: number;
  jobBreakdown: Array<{
    jobId: string;
    jobTitle: string;
    hours: number;
    cost: number;
  }>;
}

export interface AccountingExport {
  id: string;
  provider: AccountingProvider;
  entries: PayrollEntry[];
  period: { start: string; end: string };
  status: 'draft' | 'exported' | 'synced';
  totalHours: number;
  totalCost: number;
  createdAt: string;
  exportedAt?: string;
}

export interface TimesheetFilters {
  employeeId?: string;
  jobId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface LeaveFilters {
  employeeId?: string;
  type?: LeaveType;
  status?: LeaveStatus;
  startDate?: string;
  endDate?: string;
}

export interface JobLabourSummary {
  jobId: string;
  jobTitle: string;
  budgetedLabour: number;
  actualLabour: number;
  approvedHours: number;
  pendingHours: number;
  variance: number;
  variancePercent: number;
}

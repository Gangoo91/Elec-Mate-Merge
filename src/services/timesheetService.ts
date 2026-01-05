// Timesheet Service - Backend-ready abstraction layer
// Currently uses mock data, swap implementations for Supabase

import { TimesheetEntry } from '@/contexts/EmployerContext';
import { TimesheetFilters, PayrollEntry, JobLabourSummary } from './types';

// Mock implementation - replace with Supabase calls
export const getTimesheets = async (filters: TimesheetFilters): Promise<TimesheetEntry[]> => {
  // In production: return supabase.from('timesheets').select('*').match(filters);
  console.log('getTimesheets called with filters:', filters);
  return [];
};

export const getTimesheetById = async (id: string): Promise<TimesheetEntry | null> => {
  // In production: return supabase.from('timesheets').select('*').eq('id', id).single();
  console.log('getTimesheetById called:', id);
  return null;
};

export const createTimesheet = async (entry: Omit<TimesheetEntry, 'id'>): Promise<TimesheetEntry> => {
  // In production: return supabase.from('timesheets').insert(entry).select().single();
  const id = `TS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  return { ...entry, id };
};

export const updateTimesheet = async (id: string, updates: Partial<TimesheetEntry>): Promise<TimesheetEntry | null> => {
  // In production: return supabase.from('timesheets').update(updates).eq('id', id).select().single();
  console.log('updateTimesheet called:', id, updates);
  return null;
};

export const approveTimesheet = async (id: string, approvedBy: string): Promise<boolean> => {
  // In production: return supabase.from('timesheets').update({ status: 'Approved', approvedBy, approvedAt: new Date().toISOString() }).eq('id', id);
  console.log('approveTimesheet called:', id, approvedBy);
  return true;
};

export const rejectTimesheet = async (id: string, rejectedBy: string, reason?: string): Promise<boolean> => {
  // In production: return supabase.from('timesheets').update({ status: 'Rejected', rejectedBy, rejectedReason: reason }).eq('id', id);
  console.log('rejectTimesheet called:', id, rejectedBy, reason);
  return true;
};

// Calculate labour costs for a job from approved timesheets
export const calculateJobLabour = (
  timesheets: TimesheetEntry[],
  employees: Array<{ id: string; hourlyRate?: number }>,
  jobId: string
): JobLabourSummary => {
  const jobTimesheets = timesheets.filter(ts => ts.jobId === jobId);
  
  const getHourlyRate = (employeeId: string): number => {
    const emp = employees.find(e => e.id === employeeId);
    return emp?.hourlyRate || 25;
  };

  const approvedTimesheets = jobTimesheets.filter(ts => ts.status === 'Approved');
  const pendingTimesheets = jobTimesheets.filter(ts => ts.status === 'Pending');

  const approvedHours = approvedTimesheets.reduce((sum, ts) => sum + ts.totalHours, 0);
  const pendingHours = pendingTimesheets.reduce((sum, ts) => sum + ts.totalHours, 0);
  
  const actualLabour = approvedTimesheets.reduce((sum, ts) => {
    return sum + (ts.totalHours * getHourlyRate(ts.employeeId));
  }, 0);

  return {
    jobId,
    jobTitle: jobTimesheets[0]?.jobTitle || '',
    budgetedLabour: 0, // Set from job budget
    actualLabour,
    approvedHours,
    pendingHours,
    variance: 0,
    variancePercent: 0,
  };
};

// Generate payroll entries for export
export const generatePayrollEntries = (
  timesheets: TimesheetEntry[],
  employees: Array<{ id: string; name: string; hourlyRate?: number }>,
  periodStart: string,
  periodEnd: string
): PayrollEntry[] => {
  const approvedTimesheets = timesheets.filter(ts => 
    ts.status === 'Approved' &&
    ts.date >= periodStart &&
    ts.date <= periodEnd
  );

  // Group by employee
  const employeeMap = new Map<string, TimesheetEntry[]>();
  approvedTimesheets.forEach(ts => {
    const existing = employeeMap.get(ts.employeeId) || [];
    employeeMap.set(ts.employeeId, [...existing, ts]);
  });

  const payrollEntries: PayrollEntry[] = [];

  employeeMap.forEach((entries, employeeId) => {
    const emp = employees.find(e => e.id === employeeId);
    if (!emp) return;

    const hourlyRate = emp.hourlyRate || 25;
    const regularHours = entries.reduce((sum, ts) => sum + Math.min(ts.totalHours, 8), 0);
    const overtimeHours = entries.reduce((sum, ts) => sum + Math.max(ts.totalHours - 8, 0), 0);
    const grossPay = (regularHours * hourlyRate) + (overtimeHours * hourlyRate * 1.5);

    // Group by job
    const jobMap = new Map<string, { jobId: string; jobTitle: string; hours: number; cost: number }>();
    entries.forEach(ts => {
      const existing = jobMap.get(ts.jobId) || { jobId: ts.jobId, jobTitle: ts.jobTitle, hours: 0, cost: 0 };
      existing.hours += ts.totalHours;
      existing.cost += ts.totalHours * hourlyRate;
      jobMap.set(ts.jobId, existing);
    });

    payrollEntries.push({
      employeeId,
      employeeName: emp.name,
      periodStart,
      periodEnd,
      regularHours,
      overtimeHours,
      hourlyRate,
      grossPay,
      jobBreakdown: Array.from(jobMap.values()),
    });
  });

  return payrollEntries;
};

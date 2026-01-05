// Leave/Holiday Service - Backend-ready abstraction layer
// Currently uses mock data, swap implementations for Supabase

import { LeaveRequest, HolidayAllowance, LeaveFilters, LeaveType } from './types';
import { differenceInBusinessDays, parseISO, isWeekend, eachDayOfInterval, format } from 'date-fns';

// Calculate business days between dates (excluding weekends)
export const calculateLeaveDays = (startDate: string, endDate: string, halfDay?: 'am' | 'pm'): number => {
  if (halfDay) return 0.5;
  
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  
  const allDays = eachDayOfInterval({ start, end });
  const businessDays = allDays.filter(day => !isWeekend(day));
  
  return businessDays.length;
};

// Mock implementation - replace with Supabase calls
export const getLeaveRequests = async (filters: LeaveFilters): Promise<LeaveRequest[]> => {
  // In production: return supabase.from('leave_requests').select('*').match(filters);
  console.log('getLeaveRequests called with filters:', filters);
  return [];
};

export const getLeaveRequestById = async (id: string): Promise<LeaveRequest | null> => {
  // In production: return supabase.from('leave_requests').select('*').eq('id', id).single();
  console.log('getLeaveRequestById called:', id);
  return null;
};

export const createLeaveRequest = async (request: Omit<LeaveRequest, 'id' | 'createdAt'>): Promise<LeaveRequest> => {
  // In production: return supabase.from('leave_requests').insert({ ...request, createdAt: new Date().toISOString() }).select().single();
  const id = `LR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  return { 
    ...request, 
    id, 
    createdAt: new Date().toISOString() 
  };
};

export const approveLeaveRequest = async (id: string, approvedBy: string): Promise<boolean> => {
  // In production: return supabase.from('leave_requests').update({ status: 'approved', approvedBy, approvedDate: new Date().toISOString() }).eq('id', id);
  console.log('approveLeaveRequest called:', id, approvedBy);
  return true;
};

export const rejectLeaveRequest = async (id: string, rejectedBy: string, reason?: string): Promise<boolean> => {
  // In production: return supabase.from('leave_requests').update({ status: 'rejected', rejectedReason: reason }).eq('id', id);
  console.log('rejectLeaveRequest called:', id, rejectedBy, reason);
  return true;
};

export const cancelLeaveRequest = async (id: string): Promise<boolean> => {
  // In production: return supabase.from('leave_requests').update({ status: 'cancelled' }).eq('id', id);
  console.log('cancelLeaveRequest called:', id);
  return true;
};

// Holiday allowance operations
export const getHolidayAllowance = async (employeeId: string, year?: number): Promise<HolidayAllowance | null> => {
  // In production: return supabase.from('holiday_allowances').select('*').eq('employeeId', employeeId).eq('year', year).single();
  console.log('getHolidayAllowance called:', employeeId, year);
  return null;
};

export const getAllHolidayAllowances = async (year?: number): Promise<HolidayAllowance[]> => {
  // In production: return supabase.from('holiday_allowances').select('*').eq('year', year);
  console.log('getAllHolidayAllowances called:', year);
  return [];
};

export const updateHolidayAllowance = async (id: string, updates: Partial<HolidayAllowance>): Promise<boolean> => {
  // In production: return supabase.from('holiday_allowances').update(updates).eq('id', id);
  console.log('updateHolidayAllowance called:', id, updates);
  return true;
};

// Check for leave clashes (multiple people off same day)
export const checkLeaveClashes = (
  leaveRequests: LeaveRequest[],
  newRequest: { startDate: string; endDate: string; employeeId: string },
  maxAllowedOff: number = 2
): { hasClash: boolean; clashingEmployees: string[] } => {
  const newStart = parseISO(newRequest.startDate);
  const newEnd = parseISO(newRequest.endDate);
  const newDays = eachDayOfInterval({ start: newStart, end: newEnd });
  
  const clashingEmployees: string[] = [];
  
  newDays.forEach(day => {
    if (isWeekend(day)) return;
    
    const dayStr = format(day, 'yyyy-MM-dd');
    const employeesOff = leaveRequests
      .filter(lr => 
        lr.status === 'approved' &&
        lr.employeeId !== newRequest.employeeId &&
        lr.startDate <= dayStr &&
        lr.endDate >= dayStr
      )
      .map(lr => lr.employeeName);
    
    if (employeesOff.length >= maxAllowedOff) {
      employeesOff.forEach(emp => {
        if (!clashingEmployees.includes(emp)) {
          clashingEmployees.push(emp);
        }
      });
    }
  });
  
  return {
    hasClash: clashingEmployees.length > 0,
    clashingEmployees,
  };
};

// Get leave type display name
export const getLeaveTypeName = (type: LeaveType): string => {
  const names: Record<LeaveType, string> = {
    annual: 'Annual Leave',
    sick: 'Sick Leave',
    unpaid: 'Unpaid Leave',
    compassionate: 'Compassionate Leave',
    training: 'Training',
    bank_holiday: 'Bank Holiday',
  };
  return names[type] || type;
};

// Get leave type colour
export const getLeaveTypeColour = (type: LeaveType): string => {
  const colours: Record<LeaveType, string> = {
    annual: 'bg-primary/20 text-primary',
    sick: 'bg-destructive/20 text-destructive',
    unpaid: 'bg-muted text-muted-foreground',
    compassionate: 'bg-info/20 text-info',
    training: 'bg-warning/20 text-warning',
    bank_holiday: 'bg-success/20 text-success',
  };
  return colours[type] || 'bg-muted text-muted-foreground';
};

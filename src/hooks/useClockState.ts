import { useState, useEffect, useCallback } from 'react';
import { useCreateTimesheet } from './useTimesheets';
import { toast } from 'sonner';

interface ClockState {
  employeeId: string;
  employeeName: string;
  jobId: string;
  jobTitle: string;
  clockInTime: string; // ISO timestamp
}

const CLOCK_STATE_KEY = 'employer_clock_state';

export const useClockState = () => {
  const [clockState, setClockState] = useState<ClockState | null>(null);
  const [duration, setDuration] = useState<string>('00:00:00');
  const createTimesheet = useCreateTimesheet();

  // Load clock state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CLOCK_STATE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ClockState;
        setClockState(parsed);
      } catch {
        localStorage.removeItem(CLOCK_STATE_KEY);
      }
    }
  }, []);

  // Update duration every second when clocked in
  useEffect(() => {
    if (!clockState) {
      setDuration('00:00:00');
      return;
    }

    const updateDuration = () => {
      const start = new Date(clockState.clockInTime).getTime();
      const now = Date.now();
      const diff = Math.floor((now - start) / 1000);
      
      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;
      
      setDuration(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    updateDuration();
    const interval = setInterval(updateDuration, 1000);
    
    return () => clearInterval(interval);
  }, [clockState]);

  const clockIn = useCallback((
    employeeId: string,
    employeeName: string,
    jobId: string,
    jobTitle: string
  ) => {
    const newState: ClockState = {
      employeeId,
      employeeName,
      jobId,
      jobTitle,
      clockInTime: new Date().toISOString(),
    };
    
    localStorage.setItem(CLOCK_STATE_KEY, JSON.stringify(newState));
    setClockState(newState);
    toast.success(`Clocked in to ${jobTitle}`);
  }, []);

  const clockOut = useCallback(async (breakMinutes: number = 0) => {
    if (!clockState) {
      toast.error('Not currently clocked in');
      return false;
    }

    const clockOutTime = new Date().toISOString();
    const clockInDate = new Date(clockState.clockInTime);
    const clockOutDate = new Date(clockOutTime);
    
    // Calculate total hours
    const diffMs = clockOutDate.getTime() - clockInDate.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const totalHours = Math.max(0, diffHours - (breakMinutes / 60));

    try {
      await createTimesheet.mutateAsync({
        employee_id: clockState.employeeId,
        job_id: clockState.jobId,
        date: clockInDate.toISOString().split('T')[0],
        clock_in: clockState.clockInTime,
        clock_out: clockOutTime,
        break_minutes: breakMinutes,
        total_hours: parseFloat(totalHours.toFixed(2)),
        status: 'Pending',
        notes: null,
        approved_by: null,
        approved_at: null,
      });

      localStorage.removeItem(CLOCK_STATE_KEY);
      setClockState(null);
      toast.success(`Clocked out. ${totalHours.toFixed(1)} hours logged.`);
      return true;
    } catch (error) {
      console.error('Failed to clock out:', error);
      toast.error('Failed to save timesheet');
      return false;
    }
  }, [clockState, createTimesheet]);

  const cancelClockIn = useCallback(() => {
    localStorage.removeItem(CLOCK_STATE_KEY);
    setClockState(null);
    toast.info('Clock in cancelled');
  }, []);

  return {
    isClockedIn: !!clockState,
    clockState,
    duration,
    clockIn,
    clockOut,
    cancelClockIn,
    isClockingOut: createTimesheet.isPending,
  };
};

import { useState, useMemo, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTeamLeaveRequests } from '@/hooks/useTeamLeave';
import {
  splitDailyOvertime,
  grossPay,
  labourCost,
  DEFAULT_OVERTIME_TERMS,
  type OvertimeTerms,
} from '@/utils/payCalculations';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { ManualTimeEntryDialog } from '@/components/employer/dialogs/ManualTimeEntryDialog';
import { LeaveTabContent } from '@/components/employer/sections/LeaveTabContent';
import { downloadExportCSV, getProviderName } from '@/services/accountingService';
import {
  format,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  isWithinInterval,
  parseISO,
  eachDayOfInterval,
  isToday,
} from 'date-fns';
import {
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Play,
  Square,
  RefreshCw,
  Link2,
  Zap,
  Coffee,
  X,
  Check,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AccountingProvider, PayrollEntry } from '@/services/types';
import {
  useTimesheets,
  useApproveTimesheet,
  useRejectTimesheet,
  useBatchApproveTimesheets,
  useBatchRejectTimesheets,
} from '@/hooks/useTimesheets';
import { useEmployees } from '@/hooks/useEmployees';
import { useActiveJobs } from '@/hooks/useJobs';
import { useClockState } from '@/hooks/useClockState';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  Dot,
  PulseDot,
  Eyebrow,
  EmptyState,
  LoadingBlocks,
  IconButton,
  Divider,
  PrimaryButton,
  SecondaryButton,
  selectTriggerClass,
  selectContentClass,
  checkboxClass,
  type Tone,
} from '@/components/employer/editorial';

interface DisplayTimesheet {
  id: string;
  employeeId: string;
  employeeName: string;
  jobId: string;
  jobTitle: string;
  date: string;
  clockIn: string;
  clockOut: string;
  breakMins: number;
  totalHours: number;
  status: string;
  notes?: string;
  /** Open clock-in (no clock_out yet) — on the clock right now, not approvable. */
  isLive: boolean;
}

const formatTimeFromISO = (isoString: string | null): string => {
  if (!isoString) return '--:--';
  try {
    return format(parseISO(isoString), 'HH:mm');
  } catch {
    return '--:--';
  }
};

const getInitials = (name: string): string =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const statusTone = (status: string): Tone => {
  if (status === 'Approved') return 'emerald';
  if (status === 'Pending') return 'amber';
  if (status === 'Rejected') return 'red';
  return 'yellow';
};

interface AccountingConnection {
  provider: AccountingProvider;
  isConnected: boolean;
  lastSync: string | null;
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// 'intuit' deliberately absent — it produced a byte-identical file to
// QuickBooks (same company, same format) and read as two integrations.
const ACCOUNTING_PROVIDERS: { id: AccountingProvider; name: string }[] = [
  { id: 'xero', name: 'Xero' },
  { id: 'sage', name: 'Sage' },
  { id: 'quickbooks', name: 'QuickBooks' },
  { id: 'csv', name: 'CSV Export' },
];

export const TimesheetsSection = () => {
  const isMobile = useIsMobile();
  const { data: rawTimesheets = [], isLoading: timesheetsLoading, refetch: refetchTimesheets } = useTimesheets();
  const { data: employees = [], isLoading: employeesLoading } = useEmployees();
  const { data: jobs = [], isLoading: jobsLoading } = useActiveJobs();

  const {
    isClockedIn,
    clockState,
    duration,
    clockIn,
    clockOut,
    isClockingOut,
    isOnBreak,
    breakMinutes,
    startBreak,
    endBreak,
  } = useClockState();

  const approveTimesheetMutation = useApproveTimesheet();
  const rejectTimesheetMutation = useRejectTimesheet();
  const batchApproveMutation = useBatchApproveTimesheets();
  const batchRejectMutation = useBatchRejectTimesheets();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterEmployee, setFilterEmployee] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [activeTab, setActiveTab] = useState('week');
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [detailTimesheet, setDetailTimesheet] = useState<DisplayTimesheet | null>(null);

  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const [selectedTimesheetIds, setSelectedTimesheetIds] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);


  const timesheets: DisplayTimesheet[] = useMemo(() => {
    return rawTimesheets.map((ts) => {
      const employee = employees.find((e) => e.id === ts.employee_id);
      const job = jobs.find((j) => j.id === ts.job_id);

      return {
        id: ts.id,
        employeeId: ts.employee_id,
        employeeName: employee?.name || 'Unknown',
        jobId: ts.job_id || '',
        jobTitle: job?.title || 'Unknown Job',
        date: ts.date,
        clockIn: formatTimeFromISO(ts.clock_in),
        clockOut: formatTimeFromISO(ts.clock_out),
        breakMins: ts.break_minutes,
        totalHours: ts.total_hours || 0,
        status: ts.status,
        notes: ts.notes || undefined,
        isLive: !!ts.clock_in && !ts.clock_out,
      };
    });
  }, [rawTimesheets, employees, jobs]);

  const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
  const weekLabel = `${format(currentWeekStart, 'd MMM')} – ${format(currentWeekEnd, 'd MMM')}`;

  const goToPreviousWeek = () => setCurrentWeekStart((prev) => subWeeks(prev, 1));
  const goToNextWeek = () => setCurrentWeekStart((prev) => addWeeks(prev, 1));
  const goToThisWeek = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
    setSelectedDay(null);
  };

  const weekTimesheets = useMemo(() => {
    return timesheets.filter((ts) => {
      const tsDate = parseISO(ts.date);
      return isWithinInterval(tsDate, { start: currentWeekStart, end: currentWeekEnd });
    });
  }, [timesheets, currentWeekStart, currentWeekEnd]);

  const filteredTimesheets = weekTimesheets.filter((ts) => {
    const matchesSearch =
      ts.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ts.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEmployee = filterEmployee === 'all' || ts.employeeId === filterEmployee;
    const matchesStatus = filterStatus === 'all' || ts.status === filterStatus;
    const matchesDay =
      !selectedDay || format(parseISO(ts.date), 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd');
    const matchesTab =
      activeTab === 'week' ||
      (activeTab === 'pending' && ts.status === 'Pending') ||
      (activeTab === 'approved' && ts.status === 'Approved');
    return matchesSearch && matchesEmployee && matchesStatus && matchesDay && matchesTab;
  });

  // O(1) employee lookups — these run inside per-row loops on a section that
  // re-renders every second while someone is on the clock.
  const employeesById = useMemo(
    () => new Map(employees.map((e) => [e.id, e])),
    [employees]
  );

  // hourly_rate is canonical for every pay_type — AddEmployeeDialog derives it
  // on write (annual ÷ 2080, day rate ÷ 8). No rate on record = null; £ figures
  // must never invent a number for those workers.
  const getHourlyRate = useCallback(
    (employeeId: string): number | null => {
      const emp = employeesById.get(employeeId);
      return emp && emp.hourly_rate > 0 ? emp.hourly_rate : null;
    },
    [employeesById]
  );

  const calculateLabourCost = useCallback(
    (employeeId: string, hours: number): number => (getHourlyRate(employeeId) ?? 0) * hours,
    [getHourlyRate]
  );

  // Per-worker overtime terms — firms pay 1×, 1.2×, 1.5×… over differing
  // daily thresholds, so both live on the employee record.
  const getOvertimeTerms = useCallback(
    (employeeId: string): OvertimeTerms => {
      const emp = employeesById.get(employeeId);
      return {
        multiplier: emp?.overtime_multiplier ?? DEFAULT_OVERTIME_TERMS.multiplier,
        threshold: emp?.overtime_threshold_hours ?? DEFAULT_OVERTIME_TERMS.threshold,
      };
    },
    [employeesById]
  );

  // Live (open) entries carry no hours yet — keep them out of the numbers.
  const settledTimesheets = useMemo(() => weekTimesheets.filter((ts) => !ts.isLive), [weekTimesheets]);
  const liveCount = weekTimesheets.length - settledTimesheets.length;

  const workersWithoutRate = useMemo(() => {
    const ids = new Set(settledTimesheets.map((ts) => ts.employeeId));
    return [...ids].filter((id) => getHourlyRate(id) === null).length;
  }, [settledTimesheets, getHourlyRate]);

  // Overtime-aware cost of a set of entries — the SAME maths the payroll
  // export uses, so the dashboard and the CSV can never disagree.
  const costOfEntries = useCallback(
    (entries: DisplayTimesheet[]): number => {
      const byEmployee = new Map<string, DisplayTimesheet[]>();
      entries.forEach((ts) => {
        const list = byEmployee.get(ts.employeeId) ?? [];
        list.push(ts);
        byEmployee.set(ts.employeeId, list);
      });
      let total = 0;
      byEmployee.forEach((list, employeeId) => {
        total += labourCost(list, getHourlyRate(employeeId) ?? 0, getOvertimeTerms(employeeId));
      });
      return total;
    },
    [getHourlyRate, getOvertimeTerms]
  );

  const {
    totalHours,
    approvedHours,
    pendingCount,
    totalLabourCost,
    approvedLabourCost,
    overtimeHours,
    overtimeCost,
  } = useMemo(() => {
    const approved = settledTimesheets.filter((ts) => ts.status === 'Approved');

    // Per-day, per-worker overtime at each worker's own terms
    const byEmployee = new Map<string, DisplayTimesheet[]>();
    settledTimesheets.forEach((ts) => {
      const list = byEmployee.get(ts.employeeId) ?? [];
      list.push(ts);
      byEmployee.set(ts.employeeId, list);
    });
    let otHours = 0;
    let otCost = 0;
    byEmployee.forEach((list, employeeId) => {
      const terms = getOvertimeTerms(employeeId);
      const { overtimeHours: ot } = splitDailyOvertime(list, terms.threshold);
      otHours += ot;
      otCost += (getHourlyRate(employeeId) ?? 0) * ot * terms.multiplier;
    });

    return {
      totalHours: settledTimesheets.reduce((sum, ts) => sum + ts.totalHours, 0),
      approvedHours: approved.reduce((sum, ts) => sum + ts.totalHours, 0),
      pendingCount: settledTimesheets.filter((ts) => ts.status === 'Pending').length,
      totalLabourCost: costOfEntries(settledTimesheets),
      approvedLabourCost: costOfEntries(approved),
      overtimeHours: otHours,
      overtimeCost: otCost,
    };
  }, [settledTimesheets, costOfEntries, getHourlyRate, getOvertimeTerms]);

  const { data: teamLeave = [] } = useTeamLeaveRequests();
  const onLeaveToday = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return teamLeave.filter(
      (lr) => lr.status === 'approved' && lr.startDate <= today && lr.endDate >= today
    ).length;
  }, [teamLeave]);

  const weekDays = eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd });
  const dailyBreakdown = weekDays.map((day) => {
    const dayTimesheets = weekTimesheets.filter(
      (ts) => format(parseISO(ts.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
    const hours = dayTimesheets.reduce((sum, ts) => sum + ts.totalHours, 0);
    const approved = dayTimesheets
      .filter((ts) => ts.status === 'Approved')
      .reduce((sum, ts) => sum + ts.totalHours, 0);
    const pending = dayTimesheets
      .filter((ts) => ts.status === 'Pending')
      .reduce((sum, ts) => sum + ts.totalHours, 0);
    const rejected = dayTimesheets
      .filter((ts) => ts.status === 'Rejected')
      .reduce((sum, ts) => sum + ts.totalHours, 0);
    return { day, hours, approved, pending, rejected, count: dayTimesheets.length };
  });

  const maxDailyHours = Math.max(...dailyBreakdown.map((d) => d.hours), 8);

  const employeeBreakdown = useMemo(
    () =>
      employees
        .map((emp) => {
          // Maths from settled entries only — but a worker whose ONLY entry is a
          // live clock-in must still appear (their "On the clock" row renders
          // under this breakdown), so inclusion counts every week entry.
          const allRows = weekTimesheets.filter((ts) => ts.employeeId === emp.id);
          const empTimesheets = allRows.filter((ts) => !ts.isLive);
          const hours = empTimesheets.reduce((sum, ts) => sum + ts.totalHours, 0);
          const terms = getOvertimeTerms(emp.id);
          const { overtimeHours: overtime } = splitDailyOvertime(empTimesheets, terms.threshold);
          const cost = labourCost(empTimesheets, getHourlyRate(emp.id) ?? 0, terms);
          const days = new Set(empTimesheets.map((ts) => ts.date)).size;
          const pending = empTimesheets.filter((ts) => ts.status === 'Pending').length;
          const approved = empTimesheets.filter((ts) => ts.status === 'Approved').length;
          return {
            ...emp,
            totalHours: hours,
            entries: allRows.length,
            cost,
            overtime,
            days,
            pending,
            approved,
          };
        })
        .filter((e) => e.entries > 0),
    [employees, weekTimesheets, getOvertimeTerms, getHourlyRate]
  );

  const generatePayrollEntries = (): PayrollEntry[] => {
    const approvedTimesheets = settledTimesheets.filter((ts) => ts.status === 'Approved');

    // Group per employee, then split regular vs overtime per DAY (over 8h/day),
    // so the export's Overtime Hours column carries real numbers instead of 0.00.
    const byEmployee = new Map<string, DisplayTimesheet[]>();
    approvedTimesheets.forEach((ts) => {
      const list = byEmployee.get(ts.employeeId) ?? [];
      list.push(ts);
      byEmployee.set(ts.employeeId, list);
    });

    return [...byEmployee.entries()].map(([employeeId, entries]) => {
      const hourlyRate = getHourlyRate(employeeId) ?? 0;
      const { multiplier, threshold } = getOvertimeTerms(employeeId);
      const { regularHours, overtimeHours } = splitDailyOvertime(entries, threshold);

      const jobBreakdown: PayrollEntry['jobBreakdown'] = [];
      entries.forEach((ts) => {
        const jobEntry = jobBreakdown.find((j) => j.jobId === ts.jobId);
        const cost = ts.totalHours * hourlyRate;
        if (jobEntry) {
          jobEntry.hours += ts.totalHours;
          jobEntry.cost += cost;
        } else {
          jobBreakdown.push({ jobId: ts.jobId, jobTitle: ts.jobTitle, hours: ts.totalHours, cost });
        }
      });

      return {
        employeeId,
        employeeName: entries[0].employeeName,
        regularHours,
        overtimeHours,
        hourlyRate,
        overtimeMultiplier: multiplier,
        grossPay: grossPay(regularHours, overtimeHours, hourlyRate, multiplier),
        periodStart: format(currentWeekStart, 'yyyy-MM-dd'),
        periodEnd: format(currentWeekEnd, 'yyyy-MM-dd'),
        jobBreakdown,
      };
    });
  };

  const handleClockIn = () => {
    if (!selectedEmployeeId) {
      toast.error('Please select an employee before clocking in.');
      return;
    }
    if (!selectedJobId) {
      toast.error('Please select a job before clocking in.');
      return;
    }

    const job = jobs.find((j) => j.id === selectedJobId);
    const employee = employees.find((e) => e.id === selectedEmployeeId);
    if (job && employee) {
      clockIn(employee.id, employee.name, selectedJobId, job.title);
    }
  };

  const handleClockOut = async () => {
    // Break minutes tracked by the hook (Break button) are applied automatically
    await clockOut();
  };

  const handleApprove = (id: string) => {
    approveTimesheetMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success('Timesheet approved');
          setDetailTimesheet(null);
        },
        onError: (err) =>
          toast.error(err instanceof Error ? err.message : 'Failed to approve timesheet'),
      }
    );
  };

  const handleReject = (id: string) => {
    rejectTimesheetMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Timesheet rejected');
        setDetailTimesheet(null);
      },
      onError: (err) =>
        toast.error(err instanceof Error ? err.message : 'Failed to reject timesheet'),
    });
  };

  const handleBatchApprove = () => {
    batchApproveMutation.mutate(
      { ids: selectedTimesheetIds },
      {
        onSuccess: (count) => {
          toast.success(`${count} timesheet${count === 1 ? '' : 's'} approved`);
          setSelectedTimesheetIds([]);
          setIsSelectMode(false);
        },
        onError: (err) =>
          toast.error(err instanceof Error ? err.message : 'Failed to approve timesheets'),
      }
    );
  };

  const handleBatchReject = () => {
    batchRejectMutation.mutate(selectedTimesheetIds, {
      onSuccess: (count) => {
        toast.success(`${count} timesheet${count === 1 ? '' : 's'} rejected`);
        setSelectedTimesheetIds([]);
        setIsSelectMode(false);
      },
      onError: (err) =>
        toast.error(err instanceof Error ? err.message : 'Failed to reject timesheets'),
    });
  };

  const toggleTimesheetSelection = (id: string) => {
    setSelectedTimesheetIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAllPending = () => {
    // Live (open) entries aren't approvable — someone is still on the clock
    const pendingIds = filteredTimesheets
      .filter((ts) => ts.status === 'Pending' && !ts.isLive)
      .map((ts) => ts.id);
    setSelectedTimesheetIds(pendingIds);
  };

  const handleExport = (provider: AccountingProvider) => {
    const entries = generatePayrollEntries();
    if (entries.length === 0) {
      toast.error('No approved timesheets to export');
      return;
    }
    // Never ship £0.00 pay lines into accounting software — a missing rate
    // must be fixed on the team record, not laundered through an export.
    const noRate = entries.filter((e) => e.hourlyRate <= 0);
    if (noRate.length > 0) {
      toast.error(
        `${noRate.map((e) => e.employeeName).join(', ')} ${noRate.length === 1 ? 'has' : 'have'} no hourly rate set — add rates in Team before exporting payroll`
      );
      return;
    }
    downloadExportCSV(
      provider,
      entries,
      format(currentWeekStart, 'yyyy-MM-dd'),
      format(currentWeekEnd, 'yyyy-MM-dd')
    );
    toast.success(`Timesheet data exported for ${getProviderName(provider)}`);
  };

  const refresh = async () => {
    await refetchTimesheets();
    toast.success('Timesheets refreshed');
  };

  const activeJobs = jobs.filter((j) => j.status === 'Active');
  const isLoading = timesheetsLoading || employeesLoading || jobsLoading;

  const tabs = [
    { value: 'week', label: 'This week', count: weekTimesheets.length },
    { value: 'pending', label: 'Pending', count: pendingCount },
    {
      value: 'approved',
      label: 'Approved',
      count: weekTimesheets.filter((t) => t.status === 'Approved').length,
    },
    { value: 'leave', label: 'Leave' },
  ];

  return (
    <PageFrame>
      <PageHero
        eyebrow="People"
        title="Timesheets"
        description="Hours, leave and approvals for the whole team."
        tone="amber"
        actions={
          <div className="flex items-center gap-2">
            <ManualTimeEntryDialog
              trigger={
                <PrimaryButton>
                  <Plus className="h-4 w-4 mr-1.5" />
                  Add entry
                </PrimaryButton>
              }
            />
            <SecondaryButton onClick={() => setIsExportOpen(true)}>
              <Download className="h-4 w-4 mr-1.5" />
              Export
            </SecondaryButton>
            <IconButton onClick={refresh} aria-label="Refresh timesheets">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </div>
        }
      />

      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <>
          <StatStrip
            columns={4}
            stats={[
              {
                label: 'Hours this week',
                value: totalHours.toFixed(1),
                tone: 'amber',
                sub: `${approvedHours.toFixed(1)} approved${liveCount > 0 ? ` · ${liveCount} on the clock` : ''}`,
              },
              {
                label: 'Pending approval',
                value: pendingCount,
                tone: 'orange',
                sub: pendingCount === 1 ? '1 entry' : `${pendingCount} entries`,
              },
              {
                label: 'On leave today',
                value: onLeaveToday,
                tone: 'blue',
                sub: onLeaveToday === 0 ? 'Everyone in' : 'See leave tab',
              },
              {
                label: 'Overtime',
                value: `£${Math.round(overtimeCost).toLocaleString()}`,
                tone: 'emerald',
                accent: true,
                sub:
                  workersWithoutRate > 0
                    ? `${overtimeHours.toFixed(1)}h OT · ${workersWithoutRate} no rate set`
                    : `${overtimeHours.toFixed(1)}h at each worker's OT rate`,
              },
            ]}
          />

          <ListCard>
            <ListCardHeader
              tone="amber"
              title="Week"
              meta={
                <span className="text-[11.5px] text-white tabular-nums">{weekLabel}</span>
              }
              action="Today"
              onAction={goToThisWeek}
            />
            <div className="px-5 sm:px-6 py-4 flex items-center gap-3">
              <IconButton onClick={goToPreviousWeek} aria-label="Previous week">
                <ChevronLeft className="h-4 w-4" />
              </IconButton>
              <div className="flex-1 overflow-x-auto hide-scrollbar">
                <div className="flex gap-2 min-w-max">
                  {dailyBreakdown.map((data, idx) => {
                    const isSelected =
                      selectedDay &&
                      format(data.day, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd');
                    const isTodayDate = isToday(data.day);
                    const heightPct = Math.min((data.hours / maxDailyHours) * 100, 100);

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDay(isSelected ? null : data.day)}
                        className={cn(
                          'flex flex-col items-center min-w-[60px] sm:min-w-[68px] h-[112px] px-2 py-2 rounded-xl border transition-colors touch-manipulation',
                          isSelected
                            ? 'bg-elec-yellow border-elec-yellow text-black'
                            : isTodayDate
                              ? 'bg-white/[0.04] border-elec-yellow/40 text-white'
                              : 'bg-white/[0.02] border-white/[0.06] text-white hover:bg-white/[0.05]'
                        )}
                      >
                        <span
                          className={cn(
                            'text-[10px] font-semibold uppercase tracking-[0.14em]',
                            isSelected ? 'text-black' : 'text-white'
                          )}
                        >
                          {DAYS_OF_WEEK[idx]}
                        </span>
                        <span
                          className={cn(
                            'mt-0.5 text-[15px] font-semibold tabular-nums',
                            isSelected ? 'text-black' : 'text-white'
                          )}
                        >
                          {format(data.day, 'd')}
                        </span>
                        <div
                          className={cn(
                            'mt-1.5 w-7 flex-1 rounded overflow-hidden flex items-end',
                            isSelected ? 'bg-black/20' : 'bg-white/[0.06]'
                          )}
                        >
                          {data.hours > 0 && (
                            <div
                              className={cn(
                                'w-full',
                                isSelected ? 'bg-black' : 'bg-elec-yellow'
                              )}
                              style={{ height: `${heightPct}%` }}
                            />
                          )}
                        </div>
                        <span
                          className={cn(
                            'mt-1 text-[10px] font-medium tabular-nums',
                            isSelected ? 'text-black' : 'text-white'
                          )}
                        >
                          {data.hours.toFixed(1)}h
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <IconButton onClick={goToNextWeek} aria-label="Next week">
                <ChevronRight className="h-4 w-4" />
              </IconButton>
            </div>
            <div className="px-5 sm:px-6 pb-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.06] pt-3">
              <div className="flex items-center gap-1.5">
                <Dot tone="emerald" />
                <span className="text-[11px] text-white">Approved</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Dot tone="amber" />
                <span className="text-[11px] text-white">Pending</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Dot tone="red" />
                <span className="text-[11px] text-white">Rejected</span>
              </div>
              {selectedDay && (
                <button
                  onClick={() => setSelectedDay(null)}
                  className="ml-auto text-[11.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                >
                  Clear day filter
                </button>
              )}
            </div>
          </ListCard>

          <ListCard>
            <ListCardHeader
              tone={isClockedIn ? 'emerald' : 'amber'}
              title={isClockedIn ? 'On the clock' : 'Clock in'}
              meta={
                isClockedIn ? (
                  <Pill tone="emerald">{duration}</Pill>
                ) : (
                  <span className="text-[11.5px] text-white">Select worker and job</span>
                )
              }
            />
            <div className="px-5 sm:px-6 py-5">
              {isClockedIn ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Eyebrow>Active job</Eyebrow>
                      <div className="mt-2 text-[15px] font-semibold text-white truncate">
                        {clockState?.jobTitle || 'Unknown job'}
                      </div>
                      <div className="mt-1 text-[12px] text-white">
                        On the clock
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[28px] sm:text-[36px] font-semibold text-white tabular-nums leading-none">
                        {duration}
                      </div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white">
                        Elapsed
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <SecondaryButton
                      onClick={isOnBreak ? endBreak : startBreak}
                      fullWidth
                      className={isOnBreak ? 'border-amber-500/40 text-amber-400' : undefined}
                    >
                      <Coffee className="h-4 w-4 mr-2" />
                      {isOnBreak
                        ? `End break${breakMinutes > 0 ? ` · ${breakMinutes}m` : ''}`
                        : breakMinutes > 0
                          ? `Break · ${breakMinutes}m taken`
                          : 'Break'}
                    </SecondaryButton>
                    <PrimaryButton
                      onClick={handleClockOut}
                      disabled={isClockingOut}
                      fullWidth
                    >
                      {isClockingOut ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Square className="h-4 w-4 mr-2" />
                      )}
                      Clock out
                    </PrimaryButton>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
                    <SelectTrigger className={`${selectTriggerClass} flex-1`}>
                      <SelectValue placeholder="Select worker…" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {employees
                        .filter((e) => e.status === 'Active' || e.status === 'active')
                        .map((emp) => (
                          <SelectItem key={emp.id} value={emp.id}>
                            {emp.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                    <SelectTrigger className={`${selectTriggerClass} flex-1`}>
                      <SelectValue placeholder="Select job…" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {activeJobs.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <PrimaryButton onClick={handleClockIn}>
                    <Play className="h-4 w-4 mr-2" />
                    Clock in
                  </PrimaryButton>
                </div>
              )}
            </div>
          </ListCard>

          <FilterBar
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search worker or job…"
            actions={
              <>
                <SecondaryButton onClick={() => setIsFiltersOpen(true)}>Filters</SecondaryButton>
                {isSelectMode ? (
                  <PrimaryButton
                    onClick={() => {
                      setIsSelectMode(false);
                      setSelectedTimesheetIds([]);
                    }}
                  >
                    Done
                  </PrimaryButton>
                ) : (
                  <SecondaryButton onClick={() => setIsSelectMode(true)}>Select</SecondaryButton>
                )}
              </>
            }
          />

          {(filterEmployee !== 'all' || filterStatus !== 'all') && (
            <div className="flex flex-wrap gap-2">
              {filterEmployee !== 'all' && (
                <button
                  onClick={() => setFilterEmployee('all')}
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11.5px] text-white touch-manipulation"
                >
                  {employees.find((e) => e.id === filterEmployee)?.name}
                  <X className="h-3 w-3" />
                </button>
              )}
              {filterStatus !== 'all' && (
                <button
                  onClick={() => setFilterStatus('all')}
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11.5px] text-white touch-manipulation"
                >
                  {filterStatus}
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          )}

          {isSelectMode && selectedTimesheetIds.length > 0 && (
            <ListCard>
              <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Pill tone="yellow">{selectedTimesheetIds.length} selected</Pill>
                  <button
                    onClick={selectAllPending}
                    className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                  >
                    Select all pending
                  </button>
                </div>
                <div className="flex gap-2">
                  <SecondaryButton onClick={handleBatchReject} size="sm">
                    <X className="h-3.5 w-3.5 mr-1.5" />
                    Reject
                  </SecondaryButton>
                  <PrimaryButton onClick={handleBatchApprove} size="sm">
                    <Check className="h-3.5 w-3.5 mr-1.5" />
                    Approve
                  </PrimaryButton>
                </div>
              </div>
            </ListCard>
          )}

          {activeTab === 'leave' ? (
            <LeaveTabContent />
          ) : (
            <>
              {employeeBreakdown.length === 0 ? (
                <EmptyState
                  title="No timesheets this week"
                  description={
                    selectedDay
                      ? `No entries for ${format(selectedDay, 'EEEE, d MMMM')}.`
                      : 'Add a manual entry or have your team clock in to populate this week.'
                  }
                />
              ) : (
                <div className="space-y-6">
                  {employeeBreakdown.map((emp) => {
                    const empRows = filteredTimesheets.filter((ts) => ts.employeeId === emp.id);
                    if (empRows.length === 0) return null;

                    return (
                      <ListCard key={emp.id}>
                        <ListCardHeader
                          tone="amber"
                          title={
                            <span className="flex items-center gap-2.5">
                              <Avatar initials={getInitials(emp.name)} size="sm" />
                              <span className="text-[14px] font-semibold text-white">
                                {emp.name}
                              </span>
                            </span>
                          }
                          meta={
                            <span className="flex items-center gap-2 text-[11.5px] text-white tabular-nums">
                              <span>{emp.totalHours.toFixed(1)}h</span>
                              <span className="text-white/30">·</span>
                              <span>{emp.days}d</span>
                              {emp.overtime > 0 && (
                                <>
                                  <span className="text-white/30">·</span>
                                  <Pill tone="emerald">{emp.overtime.toFixed(1)}h OT</Pill>
                                </>
                              )}
                              <span className="text-white/30">·</span>
                              <span className="font-semibold text-white">
                                £{Math.round(emp.cost).toLocaleString()}
                              </span>
                            </span>
                          }
                        />
                        <ListBody>
                          {empRows.map((ts) => {
                            // Base-rate value of this single entry. OT premium is a
                            // per-DAY concept, so it lives on the worker's header £,
                            // not on individual rows — hence "base" in the label.
                            const rowBaseCost = calculateLabourCost(ts.employeeId, ts.totalHours);
                            const isSelected = selectedTimesheetIds.includes(ts.id);
                            return (
                              <ListRow
                                key={ts.id}
                                accent={ts.isLive ? 'emerald' : statusTone(ts.status)}
                                lead={
                                  isSelectMode && !ts.isLive && ts.status === 'Pending' ? (
                                    <Checkbox
                                      checked={isSelected}
                                      onCheckedChange={() => toggleTimesheetSelection(ts.id)}
                                      className={checkboxClass}
                                    />
                                  ) : undefined
                                }
                                title={
                                  <span className="flex items-center gap-2 text-white">
                                    <span className="font-mono tabular-nums text-[13px]">
                                      {ts.isLive ? `${ts.clockIn}–now` : `${ts.clockIn}–${ts.clockOut}`}
                                    </span>
                                    {!ts.isLive && (
                                      <>
                                        <span className="text-white/30">·</span>
                                        <span className="font-semibold tabular-nums">
                                          {ts.totalHours.toFixed(1)}h
                                        </span>
                                      </>
                                    )}
                                  </span>
                                }
                                subtitle={
                                  <span className="text-white/55">
                                    {format(parseISO(ts.date), 'EEE, d MMM')} · {ts.jobTitle}
                                  </span>
                                }
                                trailing={
                                  ts.isLive ? (
                                    <Pill tone="emerald">On the clock</Pill>
                                  ) : (
                                    <>
                                      <span className="hidden sm:inline text-[12px] tabular-nums text-white/60">
                                        £{Math.round(rowBaseCost).toLocaleString()} base
                                      </span>
                                      <Pill tone={statusTone(ts.status)}>{ts.status}</Pill>
                                    </>
                                  )
                                }
                                onClick={
                                  isSelectMode
                                    ? ts.isLive || ts.status !== 'Pending'
                                      ? undefined
                                      : () => toggleTimesheetSelection(ts.id)
                                    : () => setDetailTimesheet(ts)
                                }
                              />
                            );
                          })}
                        </ListBody>
                      </ListCard>
                    );
                  })}
                </div>
              )}
            </>
          )}

          <Divider label="Week summary" />

          <StatStrip
            columns={4}
            stats={[
              { label: 'Entries', value: weekTimesheets.length },
              { label: 'Workers', value: employeeBreakdown.length, tone: 'amber' },
              {
                label: 'Labour spend',
                value: `£${Math.round(totalLabourCost).toLocaleString()}`,
                tone: 'amber',
                accent: true,
              },
              {
                label: 'Approved spend',
                value: `£${Math.round(approvedLabourCost).toLocaleString()}`,
                tone: 'emerald',
              },
            ]}
          />
        </>
      )}

      {/* Filters sheet */}
      <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={
            isMobile
              ? 'h-auto max-h-[85vh] p-0 rounded-t-2xl bg-[hsl(0_0%_10%)] border-t border-white/[0.06]'
              : 'w-full sm:max-w-md p-0 bg-[hsl(0_0%_10%)] border-l border-white/[0.06]'
          }
        >
          <SheetHeader className="px-5 py-4 border-b border-white/[0.06]">
            <SheetTitle className="text-white text-[15px] font-semibold">Filters</SheetTitle>
          </SheetHeader>
          <div className="p-5 space-y-5">
            <div>
              <Eyebrow>Worker</Eyebrow>
              <div className="mt-2">
                <Select value={filterEmployee} onValueChange={setFilterEmployee}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="All workers" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="all">All workers</SelectItem>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Eyebrow>Status</Eyebrow>
              <div className="mt-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <PrimaryButton onClick={() => setIsFiltersOpen(false)} fullWidth>
              Apply
            </PrimaryButton>
          </div>
        </SheetContent>
      </Sheet>

      {/* Export sheet */}
      <Sheet open={isExportOpen} onOpenChange={setIsExportOpen}>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={
            isMobile
              ? 'h-auto max-h-[85vh] p-0 rounded-t-2xl bg-[hsl(0_0%_10%)] border-t border-white/[0.06] overflow-y-auto'
              : 'w-full sm:max-w-md p-0 bg-[hsl(0_0%_10%)] border-l border-white/[0.06] overflow-y-auto'
          }
        >
          <SheetHeader className="px-5 py-4 border-b border-white/[0.06]">
            <SheetTitle className="text-white text-[15px] font-semibold">
              Export to payroll
            </SheetTitle>
          </SheetHeader>
          <div className="p-5 space-y-4">
            <StatStrip
              columns={2}
              stats={[
                {
                  label: 'Approved hours',
                  value: approvedHours.toFixed(1),
                  tone: 'emerald',
                },
                {
                  label: 'Approved spend',
                  value: `£${Math.round(approvedLabourCost).toLocaleString()}`,
                  tone: 'amber',
                  accent: true,
                },
              ]}
            />

            <ListCard>
              <ListCardHeader tone="amber" title="Providers" />
              <ListBody>
                {ACCOUNTING_PROVIDERS.map((provider) => {
                  return (
                    <ListRow
                      key={provider.id}
                      lead={<Avatar initials={getInitials(provider.name)} size="sm" />}
                      title={provider.name}
                      subtitle={'CSV formatted for ' + provider.name + ' import'}
                      trailing={
                        <button
                          onClick={() => handleExport(provider.id)}
                          className="h-9 px-3 inline-flex items-center gap-1.5 rounded-full bg-elec-yellow text-black text-[12px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Export CSV
                        </button>
                      }
                    />
                  );
                })}
              </ListBody>
            </ListCard>
          </div>
        </SheetContent>
      </Sheet>

      {/* Approve / reject detail sheet */}
      <Sheet
        open={!!detailTimesheet}
        onOpenChange={(open) => !open && setDetailTimesheet(null)}
      >
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={
            isMobile
              ? 'h-auto max-h-[85vh] p-0 rounded-t-2xl bg-[hsl(0_0%_10%)] border-t border-white/[0.06] overflow-y-auto'
              : 'w-full sm:max-w-md p-0 bg-[hsl(0_0%_10%)] border-l border-white/[0.06] overflow-y-auto'
          }
        >
          {detailTimesheet && (
            <>
              <SheetHeader className="px-5 py-4 border-b border-white/[0.06]">
                <SheetTitle className="text-white text-[15px] font-semibold flex items-center gap-2.5">
                  <Avatar initials={getInitials(detailTimesheet.employeeName)} size="sm" />
                  {detailTimesheet.employeeName}
                </SheetTitle>
              </SheetHeader>
              <div className="p-5 space-y-4">
                <StatStrip
                  columns={3}
                  stats={[
                    {
                      label: 'Hours',
                      value: detailTimesheet.totalHours.toFixed(1),
                      tone: 'amber',
                    },
                    {
                      label: 'Base cost',
                      value: `£${Math.round(
                        calculateLabourCost(
                          detailTimesheet.employeeId,
                          detailTimesheet.totalHours
                        )
                      ).toLocaleString()}`,
                      sub: 'Excl. any OT uplift',
                      tone: 'amber',
                      accent: true,
                    },
                    {
                      label: 'Status',
                      value: detailTimesheet.status,
                      tone: statusTone(detailTimesheet.status),
                    },
                  ]}
                />

                <ListCard>
                  <ListCardHeader tone="amber" title="Entry" />
                  <ListBody>
                    <ListRow
                      title="Date"
                      trailing={
                        <span className="text-[13px] text-white tabular-nums">
                          {format(parseISO(detailTimesheet.date), 'EEE, d MMM yyyy')}
                        </span>
                      }
                    />
                    <ListRow
                      title="Job"
                      trailing={
                        <span className="text-[13px] text-white truncate max-w-[200px]">
                          {detailTimesheet.jobTitle}
                        </span>
                      }
                    />
                    <ListRow
                      title="Clock in"
                      trailing={
                        <span className="font-mono tabular-nums text-[13px] text-white">
                          {detailTimesheet.clockIn}
                        </span>
                      }
                    />
                    <ListRow
                      title="Clock out"
                      trailing={
                        <span className="font-mono tabular-nums text-[13px] text-white">
                          {detailTimesheet.clockOut}
                        </span>
                      }
                    />
                    <ListRow
                      title="Break"
                      trailing={
                        <span className="text-[13px] text-white tabular-nums">
                          {detailTimesheet.breakMins} mins
                        </span>
                      }
                    />
                    <ListRow
                      title="Hourly rate"
                      trailing={
                        <span className="text-[13px] text-white tabular-nums">
                          {(() => {
                            const rate = getHourlyRate(detailTimesheet.employeeId);
                            return rate !== null ? `£${rate.toFixed(2)}/hr` : 'No rate set';
                          })()}
                        </span>
                      }
                    />
                    {detailTimesheet.notes && (
                      <ListRow
                        title="Notes"
                        subtitle={detailTimesheet.notes}
                      />
                    )}
                  </ListBody>
                </ListCard>

                {detailTimesheet.isLive ? (
                  <div className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3.5">
                    <PulseDot tone="emerald" />
                    <span className="text-[13px] text-emerald-400 font-medium">
                      Still on the clock — approve once they've clocked out
                    </span>
                  </div>
                ) : detailTimesheet.status === 'Pending' ? (
                  <div className="flex gap-2">
                    <SecondaryButton
                      onClick={() => handleReject(detailTimesheet.id)}
                      fullWidth
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </SecondaryButton>
                    <PrimaryButton
                      onClick={() => handleApprove(detailTimesheet.id)}
                      fullWidth
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </PrimaryButton>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </PageFrame>
  );
};

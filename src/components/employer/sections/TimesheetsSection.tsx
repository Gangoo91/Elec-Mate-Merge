import { useState, useMemo } from 'react';
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

const ACCOUNTING_PROVIDERS: { id: AccountingProvider; name: string }[] = [
  { id: 'xero', name: 'Xero' },
  { id: 'sage', name: 'Sage' },
  { id: 'quickbooks', name: 'QuickBooks' },
  { id: 'intuit', name: 'Intuit' },
  { id: 'csv', name: 'CSV Export' },
];

export const TimesheetsSection = () => {
  const { data: rawTimesheets = [], isLoading: timesheetsLoading, refetch: refetchTimesheets } = useTimesheets();
  const { data: employees = [], isLoading: employeesLoading } = useEmployees();
  const { data: jobs = [], isLoading: jobsLoading } = useActiveJobs();

  const { isClockedIn, clockState, duration, clockIn, clockOut, isClockingOut } = useClockState();

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

  const [accountingConnections, setAccountingConnections] = useState<AccountingConnection[]>([
    { provider: 'xero', isConnected: false, lastSync: null },
    { provider: 'sage', isConnected: false, lastSync: null },
    { provider: 'quickbooks', isConnected: false, lastSync: null },
    { provider: 'intuit', isConnected: false, lastSync: null },
    { provider: 'csv', isConnected: true, lastSync: null },
  ]);
  const [syncInProgress, setSyncInProgress] = useState<AccountingProvider | null>(null);

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

  const getHourlyRate = (employeeId: string): number => {
    const emp = employees.find((e) => e.id === employeeId);
    return emp?.hourly_rate || 25;
  };

  const calculateLabourCost = (employeeId: string, hours: number): number => {
    return getHourlyRate(employeeId) * hours;
  };

  const totalHours = weekTimesheets.reduce((sum, ts) => sum + ts.totalHours, 0);
  const approvedHours = weekTimesheets
    .filter((ts) => ts.status === 'Approved')
    .reduce((sum, ts) => sum + ts.totalHours, 0);
  const pendingCount = weekTimesheets.filter((ts) => ts.status === 'Pending').length;
  const totalLabourCost = weekTimesheets.reduce(
    (sum, ts) => sum + calculateLabourCost(ts.employeeId, ts.totalHours),
    0
  );
  const approvedLabourCost = weekTimesheets
    .filter((ts) => ts.status === 'Approved')
    .reduce((sum, ts) => sum + calculateLabourCost(ts.employeeId, ts.totalHours), 0);

  const overtimeHours = weekTimesheets.reduce(
    (sum, ts) => sum + Math.max(ts.totalHours - 8, 0),
    0
  );
  const overtimeCost = weekTimesheets.reduce((sum, ts) => {
    const ot = Math.max(ts.totalHours - 8, 0);
    return sum + calculateLabourCost(ts.employeeId, ot);
  }, 0);

  const onLeaveToday = 0;

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

  const employeeBreakdown = employees
    .map((emp) => {
      const empTimesheets = weekTimesheets.filter((ts) => ts.employeeId === emp.id);
      const hours = empTimesheets.reduce((sum, ts) => sum + ts.totalHours, 0);
      const cost = calculateLabourCost(emp.id, hours);
      const overtime = empTimesheets.reduce(
        (sum, ts) => sum + Math.max(ts.totalHours - 8, 0),
        0
      );
      const days = new Set(empTimesheets.map((ts) => ts.date)).size;
      const pending = empTimesheets.filter((ts) => ts.status === 'Pending').length;
      const approved = empTimesheets.filter((ts) => ts.status === 'Approved').length;
      return {
        ...emp,
        totalHours: hours,
        entries: empTimesheets.length,
        cost,
        overtime,
        days,
        pending,
        approved,
      };
    })
    .filter((e) => e.entries > 0);

  const generatePayrollEntries = (): PayrollEntry[] => {
    const approvedTimesheets = weekTimesheets.filter((ts) => ts.status === 'Approved');
    const employeeMap = new Map<string, PayrollEntry>();

    approvedTimesheets.forEach((ts) => {
      const existing = employeeMap.get(ts.employeeId);
      const hourlyRate = getHourlyRate(ts.employeeId);
      const pay = ts.totalHours * hourlyRate;

      if (existing) {
        existing.regularHours += ts.totalHours;
        existing.grossPay += pay;
        const jobEntry = existing.jobBreakdown.find((j) => j.jobId === ts.jobId);
        if (jobEntry) {
          jobEntry.hours += ts.totalHours;
          jobEntry.cost += pay;
        } else {
          existing.jobBreakdown.push({
            jobId: ts.jobId,
            jobTitle: ts.jobTitle,
            hours: ts.totalHours,
            cost: pay,
          });
        }
      } else {
        employeeMap.set(ts.employeeId, {
          employeeId: ts.employeeId,
          employeeName: ts.employeeName,
          regularHours: ts.totalHours,
          overtimeHours: 0,
          hourlyRate,
          grossPay: pay,
          periodStart: format(currentWeekStart, 'yyyy-MM-dd'),
          periodEnd: format(currentWeekEnd, 'yyyy-MM-dd'),
          jobBreakdown: [
            {
              jobId: ts.jobId,
              jobTitle: ts.jobTitle,
              hours: ts.totalHours,
              cost: pay,
            },
          ],
        });
      }
    });

    return Array.from(employeeMap.values());
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
    await clockOut(0);
  };

  const handleApprove = (id: string) => {
    approveTimesheetMutation.mutate(
      { id, approvedBy: 'Admin' },
      {
        onSuccess: () => {
          toast.success('Timesheet approved');
          setDetailTimesheet(null);
        },
        onError: () => toast.error('Failed to approve timesheet'),
      }
    );
  };

  const handleReject = (id: string) => {
    rejectTimesheetMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Timesheet rejected');
        setDetailTimesheet(null);
      },
      onError: () => toast.error('Failed to reject timesheet'),
    });
  };

  const handleBatchApprove = () => {
    batchApproveMutation.mutate(
      { ids: selectedTimesheetIds, approvedBy: 'Admin' },
      {
        onSuccess: () => {
          toast.success(`${selectedTimesheetIds.length} timesheets approved`);
          setSelectedTimesheetIds([]);
          setIsSelectMode(false);
        },
        onError: () => toast.error('Failed to approve timesheets'),
      }
    );
  };

  const handleBatchReject = () => {
    batchRejectMutation.mutate(selectedTimesheetIds, {
      onSuccess: () => {
        toast.success(`${selectedTimesheetIds.length} timesheets rejected`);
        setSelectedTimesheetIds([]);
        setIsSelectMode(false);
      },
      onError: () => toast.error('Failed to reject timesheets'),
    });
  };

  const toggleTimesheetSelection = (id: string) => {
    setSelectedTimesheetIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAllPending = () => {
    const pendingIds = filteredTimesheets
      .filter((ts) => ts.status === 'Pending')
      .map((ts) => ts.id);
    setSelectedTimesheetIds(pendingIds);
  };

  const handleConnectProvider = (provider: AccountingProvider) => {
    setAccountingConnections((prev) =>
      prev.map((conn) =>
        conn.provider === provider
          ? { ...conn, isConnected: true, lastSync: new Date().toISOString() }
          : conn
      )
    );
    toast.success(`${getProviderName(provider)} connected successfully`);
  };

  const handleSyncProvider = (provider: AccountingProvider) => {
    setSyncInProgress(provider);
    setTimeout(() => {
      setAccountingConnections((prev) =>
        prev.map((conn) =>
          conn.provider === provider ? { ...conn, lastSync: new Date().toISOString() } : conn
        )
      );
      setSyncInProgress(null);
      toast.success(`${approvedHours.toFixed(1)} hours synced to ${getProviderName(provider)}`);
    }, 2000);
  };

  const handleExport = (provider: AccountingProvider) => {
    const entries = generatePayrollEntries();
    if (entries.length === 0) {
      toast.error('No approved timesheets to export');
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

  const refresh = () => {
    refetchTimesheets();
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
                sub: `${approvedHours.toFixed(1)} approved`,
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
                sub: `${overtimeHours.toFixed(1)}h above 8h/day`,
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
                        Started · GPS verified
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
                    <SecondaryButton disabled fullWidth>
                      <Coffee className="h-4 w-4 mr-2" />
                      Break
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
                            const labourCost = calculateLabourCost(ts.employeeId, ts.totalHours);
                            const isSelected = selectedTimesheetIds.includes(ts.id);
                            return (
                              <ListRow
                                key={ts.id}
                                accent={statusTone(ts.status)}
                                lead={
                                  isSelectMode ? (
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
                                      {ts.clockIn}–{ts.clockOut}
                                    </span>
                                    <span className="text-white/30">·</span>
                                    <span className="font-semibold tabular-nums">
                                      {ts.totalHours.toFixed(1)}h
                                    </span>
                                  </span>
                                }
                                subtitle={
                                  <span className="text-white">
                                    {format(parseISO(ts.date), 'EEE, d MMM')} · {ts.jobTitle}
                                  </span>
                                }
                                trailing={
                                  <>
                                    <span className="hidden sm:inline text-[12px] tabular-nums text-white">
                                      £{Math.round(labourCost).toLocaleString()}
                                    </span>
                                    <Pill tone={statusTone(ts.status)}>{ts.status}</Pill>
                                  </>
                                }
                                onClick={
                                  isSelectMode
                                    ? () => toggleTimesheetSelection(ts.id)
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
          side="bottom"
          className="h-auto max-h-[85vh] p-0 rounded-t-2xl bg-[hsl(0_0%_10%)] border-t border-white/[0.06]"
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
          side="bottom"
          className="h-auto max-h-[85vh] p-0 rounded-t-2xl bg-[hsl(0_0%_10%)] border-t border-white/[0.06] overflow-y-auto"
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
                  const conn = accountingConnections.find((c) => c.provider === provider.id);
                  const isConnected = conn?.isConnected;
                  const isSyncing = syncInProgress === provider.id;

                  return (
                    <ListRow
                      key={provider.id}
                      lead={<Avatar initials={getInitials(provider.name)} size="sm" />}
                      title={provider.name}
                      subtitle={
                        isConnected && conn?.lastSync
                          ? `Last sync · ${format(parseISO(conn.lastSync), 'dd/MM HH:mm')}`
                          : isConnected
                            ? 'Connected'
                            : 'Not connected'
                      }
                      trailing={
                        provider.id === 'csv' ? (
                          <button
                            onClick={() => handleExport('csv')}
                            className="h-9 px-3 inline-flex items-center gap-1.5 rounded-full bg-elec-yellow text-black text-[12px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
                          >
                            <Download className="h-3.5 w-3.5" />
                            Download
                          </button>
                        ) : isConnected ? (
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleExport(provider.id)}
                              className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08] transition-colors touch-manipulation"
                              aria-label="Download CSV"
                            >
                              <Download className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleSyncProvider(provider.id)}
                              disabled={isSyncing || approvedHours === 0}
                              className="h-9 px-3 inline-flex items-center gap-1.5 rounded-full bg-elec-yellow text-black text-[12px] font-semibold hover:bg-elec-yellow/90 disabled:opacity-50 transition-colors touch-manipulation"
                            >
                              {isSyncing ? (
                                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Zap className="h-3.5 w-3.5" />
                              )}
                              Sync
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleConnectProvider(provider.id)}
                            className="h-9 px-3 inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-[12px] font-medium hover:bg-white/[0.08] transition-colors touch-manipulation"
                          >
                            <Link2 className="h-3.5 w-3.5" />
                            Connect
                          </button>
                        )
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
          side="bottom"
          className="h-auto max-h-[85vh] p-0 rounded-t-2xl bg-[hsl(0_0%_10%)] border-t border-white/[0.06] overflow-y-auto"
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
                      label: 'Cost',
                      value: `£${Math.round(
                        calculateLabourCost(
                          detailTimesheet.employeeId,
                          detailTimesheet.totalHours
                        )
                      ).toLocaleString()}`,
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
                          £{getHourlyRate(detailTimesheet.employeeId)}/hr
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

                {detailTimesheet.status === 'Pending' && (
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
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </PageFrame>
  );
};

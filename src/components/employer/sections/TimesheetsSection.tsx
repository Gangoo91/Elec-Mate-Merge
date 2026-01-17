import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { ManualTimeEntryDialog } from "@/components/employer/dialogs/ManualTimeEntryDialog";
import { LeaveTabContent } from "@/components/employer/sections/LeaveTabContent";
import { downloadExportCSV, getProviderName } from "@/services/accountingService";
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, isWithinInterval, parseISO, eachDayOfInterval, isToday } from "date-fns";
import { 
  Clock, 
  Search, 
  Download,
  Calendar,
  User,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Play,
  Square,
  FileSpreadsheet,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  PoundSterling,
  Check,
  X,
  RefreshCw,
  Link2,
  Settings,
  TrendingUp,
  Zap,
  Users,
  Coffee,
  Filter,
  CalendarDays,
  FileText,
  Palmtree,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AccountingProvider, PayrollEntry } from "@/services/types";
import { useTimesheets, useApproveTimesheet, useRejectTimesheet, useBatchApproveTimesheets, useBatchRejectTimesheets } from "@/hooks/useTimesheets";
import { useEmployees } from "@/hooks/useEmployees";
import { useActiveJobs } from "@/hooks/useJobs";
import { useClockState } from "@/hooks/useClockState";

// Normalised timesheet type for display
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

// Helper to format time from ISO timestamp
const formatTimeFromISO = (isoString: string | null): string => {
  if (!isoString) return '--:--';
  try {
    return format(parseISO(isoString), 'HH:mm');
  } catch {
    return '--:--';
  }
};

// Types
interface XeroSyncState {
  isConnected: boolean;
  lastSync: string | null;
  pendingEntries: number;
  syncInProgress: boolean;
}

interface AccountingConnection {
  provider: AccountingProvider;
  isConnected: boolean;
  lastSync: string | null;
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const ACCOUNTING_PROVIDERS: { id: AccountingProvider; name: string; icon: string }[] = [
  { id: 'xero', name: 'Xero', icon: '🔵' },
  { id: 'sage', name: 'Sage', icon: '🟢' },
  { id: 'quickbooks', name: 'QuickBooks', icon: '🟡' },
  { id: 'intuit', name: 'Intuit', icon: '🔴' },
  { id: 'csv', name: 'CSV Export', icon: '📄' },
];

export const TimesheetsSection = () => {
  const isMobile = useIsMobile();
  
  // Supabase data hooks
  const { data: rawTimesheets = [], isLoading: timesheetsLoading } = useTimesheets();
  const { data: employees = [], isLoading: employeesLoading } = useEmployees();
  const { data: jobs = [], isLoading: jobsLoading } = useActiveJobs();
  
  // Clock state hook
  const { 
    isClockedIn, 
    clockState, 
    duration, 
    clockIn, 
    clockOut, 
    isClockingOut 
  } = useClockState();
  
  // Mutations
  const approveTimesheetMutation = useApproveTimesheet();
  const rejectTimesheetMutation = useRejectTimesheet();
  const batchApproveMutation = useBatchApproveTimesheets();
  const batchRejectMutation = useBatchRejectTimesheets();
  
  // Core state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEmployee, setFilterEmployee] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
  const [activeTab, setActiveTab] = useState("time-entries");
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isWorkerBreakdownOpen, setIsWorkerBreakdownOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Week navigation
  const [currentWeekStart, setCurrentWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  
  // Batch selection
  const [selectedTimesheetIds, setSelectedTimesheetIds] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  
  // Accounting integrations
  const [accountingConnections, setAccountingConnections] = useState<AccountingConnection[]>([
    { provider: 'xero', isConnected: false, lastSync: null },
    { provider: 'sage', isConnected: false, lastSync: null },
    { provider: 'quickbooks', isConnected: false, lastSync: null },
    { provider: 'intuit', isConnected: false, lastSync: null },
    { provider: 'csv', isConnected: true, lastSync: null },
  ]);
  const [syncInProgress, setSyncInProgress] = useState<AccountingProvider | null>(null);

  // Transform raw Supabase timesheets to display format with employee/job names
  const timesheets: DisplayTimesheet[] = useMemo(() => {
    return rawTimesheets.map(ts => {
      const employee = employees.find(e => e.id === ts.employee_id);
      const job = jobs.find(j => j.id === ts.job_id);
      
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

  // Week navigation
  const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
  const weekLabel = `${format(currentWeekStart, 'd MMM')} - ${format(currentWeekEnd, 'd MMM')}`;

  const goToPreviousWeek = () => setCurrentWeekStart(prev => subWeeks(prev, 1));
  const goToNextWeek = () => setCurrentWeekStart(prev => addWeeks(prev, 1));
  const goToThisWeek = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
    setSelectedDay(null);
  };

  // Filter timesheets for current week
  const weekTimesheets = useMemo(() => {
    return timesheets.filter(ts => {
      const tsDate = parseISO(ts.date);
      return isWithinInterval(tsDate, { start: currentWeekStart, end: currentWeekEnd });
    });
  }, [timesheets, currentWeekStart, currentWeekEnd]);

  // Apply search and filters (including day filter)
  const filteredTimesheets = weekTimesheets.filter(ts => {
    const matchesSearch = ts.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ts.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEmployee = filterEmployee === "all" || ts.employeeId === filterEmployee;
    const matchesStatus = filterStatus === "all" || ts.status === filterStatus;
    const matchesDay = !selectedDay || format(parseISO(ts.date), 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd');
    return matchesSearch && matchesEmployee && matchesStatus && matchesDay;
  });

  // Calculate labour costs using employee hourly rates
  const getHourlyRate = (employeeId: string): number => {
    const emp = employees.find(e => e.id === employeeId);
    return emp?.hourly_rate || 25;
  };

  const calculateLabourCost = (employeeId: string, hours: number): number => {
    return getHourlyRate(employeeId) * hours;
  };

  // Calculate stats
  const totalHours = filteredTimesheets.reduce((sum, ts) => sum + ts.totalHours, 0);
  const approvedHours = filteredTimesheets.filter(ts => ts.status === "Approved").reduce((sum, ts) => sum + ts.totalHours, 0);
  const pendingCount = filteredTimesheets.filter(ts => ts.status === "Pending").length;
  const totalLabourCost = filteredTimesheets.reduce((sum, ts) => sum + calculateLabourCost(ts.employeeId, ts.totalHours), 0);
  const approvedLabourCost = filteredTimesheets
    .filter(ts => ts.status === "Approved")
    .reduce((sum, ts) => sum + calculateLabourCost(ts.employeeId, ts.totalHours), 0);

  // Weekly calendar data
  const weekDays = eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd });
  const dailyBreakdown = weekDays.map(day => {
    const dayTimesheets = weekTimesheets.filter(ts => 
      format(parseISO(ts.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
    const hours = dayTimesheets.reduce((sum, ts) => sum + ts.totalHours, 0);
    const approved = dayTimesheets.filter(ts => ts.status === "Approved").reduce((sum, ts) => sum + ts.totalHours, 0);
    const pending = dayTimesheets.filter(ts => ts.status === "Pending").reduce((sum, ts) => sum + ts.totalHours, 0);
    const rejected = dayTimesheets.filter(ts => ts.status === "Rejected").reduce((sum, ts) => sum + ts.totalHours, 0);
    return { day, hours, approved, pending, rejected, count: dayTimesheets.length };
  });

  const maxDailyHours = Math.max(...dailyBreakdown.map(d => d.hours), 8);

  // Group by employee for breakdown
  const employeeBreakdown = employees.map(emp => {
    const empTimesheets = weekTimesheets.filter(ts => ts.employeeId === emp.id);
    const hours = empTimesheets.reduce((sum, ts) => sum + ts.totalHours, 0);
    const cost = calculateLabourCost(emp.id, hours);
    return { ...emp, totalHours: hours, entries: empTimesheets.length, cost };
  }).filter(e => e.entries > 0);

  // Generate payroll entries for export
  const generatePayrollEntries = (): PayrollEntry[] => {
    const approvedTimesheets = weekTimesheets.filter(ts => ts.status === "Approved");
    const employeeMap = new Map<string, PayrollEntry>();

    approvedTimesheets.forEach(ts => {
      const existing = employeeMap.get(ts.employeeId);
      const hourlyRate = getHourlyRate(ts.employeeId);
      const pay = ts.totalHours * hourlyRate;
      
      if (existing) {
        existing.regularHours += ts.totalHours;
        existing.grossPay += pay;
        const jobEntry = existing.jobBreakdown.find(j => j.jobId === ts.jobId);
        if (jobEntry) {
          jobEntry.hours += ts.totalHours;
          jobEntry.cost += pay;
        } else {
          existing.jobBreakdown.push({
            jobId: ts.jobId,
            jobTitle: ts.jobTitle,
            hours: ts.totalHours,
            cost: pay
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
          jobBreakdown: [{
            jobId: ts.jobId,
            jobTitle: ts.jobTitle,
            hours: ts.totalHours,
            cost: pay
          }]
        });
      }
    });

    return Array.from(employeeMap.values());
  };

  // Handlers
  const handleClockIn = () => {
    if (!selectedEmployeeId) {
      toast.error("Please select an employee before clocking in.");
      return;
    }
    if (!selectedJobId) {
      toast.error("Please select a job before clocking in.");
      return;
    }

    const job = jobs.find(j => j.id === selectedJobId);
    const employee = employees.find(e => e.id === selectedEmployeeId);
    if (job && employee) {
      clockIn(employee.id, employee.name, selectedJobId, job.title);
    }
  };

  const handleClockOut = async () => {
    const success = await clockOut(0);
    // Toast is shown by useClockState hook
  };

  const handleApprove = (id: string) => {
    approveTimesheetMutation.mutate({ id, approvedBy: 'Admin' }, {
      onSuccess: () => toast.success("Timesheet approved"),
      onError: () => toast.error("Failed to approve timesheet"),
    });
  };

  const handleReject = (id: string) => {
    rejectTimesheetMutation.mutate(id, {
      onSuccess: () => toast.success("Timesheet rejected"),
      onError: () => toast.error("Failed to reject timesheet"),
    });
  };

  // Batch actions
  const handleBatchApprove = () => {
    batchApproveMutation.mutate({ ids: selectedTimesheetIds, approvedBy: 'Admin' }, {
      onSuccess: () => {
        toast.success(`${selectedTimesheetIds.length} timesheets approved`);
        setSelectedTimesheetIds([]);
        setIsSelectMode(false);
      },
      onError: () => toast.error("Failed to approve timesheets"),
    });
  };

  const handleBatchReject = () => {
    batchRejectMutation.mutate(selectedTimesheetIds, {
      onSuccess: () => {
        toast.success(`${selectedTimesheetIds.length} timesheets rejected`);
        setSelectedTimesheetIds([]);
        setIsSelectMode(false);
      },
      onError: () => toast.error("Failed to reject timesheets"),
    });
  };

  const toggleTimesheetSelection = (id: string) => {
    setSelectedTimesheetIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectAllPending = () => {
    const pendingIds = filteredTimesheets.filter(ts => ts.status === "Pending").map(ts => ts.id);
    setSelectedTimesheetIds(pendingIds);
  };

  // Accounting handlers
  const handleConnectProvider = (provider: AccountingProvider) => {
    setAccountingConnections(prev => 
      prev.map(conn => 
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
      setAccountingConnections(prev => 
        prev.map(conn => 
          conn.provider === provider 
            ? { ...conn, lastSync: new Date().toISOString() }
            : conn
        )
      );
      setSyncInProgress(null);
      toast.success(`${approvedHours.toFixed(1)} hours synced to ${getProviderName(provider)}`);
    }, 2000);
  };

  const handleExport = (provider: AccountingProvider) => {
    const entries = generatePayrollEntries();
    if (entries.length === 0) {
      toast.error("No approved timesheets to export");
      return;
    }
    downloadExportCSV(provider, entries, format(currentWeekStart, 'yyyy-MM-dd'), format(currentWeekEnd, 'yyyy-MM-dd'));
    toast.success(`Timesheet data exported for ${getProviderName(provider)}`);
  };

  const activeJobs = jobs.filter(j => j.status === "Active");

  // Loading state
  const isLoading = timesheetsLoading || employeesLoading || jobsLoading;

  // Render timesheet card
  const renderTimesheetCard = (ts: typeof filteredTimesheets[0]) => {
    const labourCost = calculateLabourCost(ts.employeeId, ts.totalHours);
    const hourlyRate = getHourlyRate(ts.employeeId);
    const isSelected = selectedTimesheetIds.includes(ts.id);
    
    return (
      <Card 
        key={ts.id} 
        className={cn(
          "bg-elec-gray border-border overflow-hidden transition-all",
          isSelected && "ring-2 ring-elec-yellow border-elec-yellow"
        )}
        onClick={() => isSelectMode && toggleTimesheetSelection(ts.id)}
      >
        <CardContent className="p-4">
          {/* Header with avatar and status */}
          <div className="flex items-start gap-3 mb-4">
            {isSelectMode && (
              <Checkbox 
                checked={isSelected}
                onCheckedChange={() => toggleTimesheetSelection(ts.id)}
                className="mt-1"
              />
            )}
            <div className="w-12 h-12 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-elec-yellow font-semibold">
              {ts.employeeName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="font-semibold text-foreground truncate">{ts.employeeName}</h4>
                  <p className="text-sm text-muted-foreground truncate flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 flex-shrink-0" />
                    {ts.jobTitle}
                  </p>
                </div>
                <Badge className={cn(
                  "flex-shrink-0 text-xs",
                  ts.status === "Approved" && "bg-success/20 text-success border-success/30",
                  ts.status === "Pending" && "bg-warning/20 text-warning border-warning/30",
                  ts.status === "Rejected" && "bg-destructive/20 text-destructive border-destructive/30"
                )}>
                  {ts.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Time bar */}
          <div className="mb-4 p-3 bg-surface rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{ts.clockIn}</span>
              </div>
              <div className="text-lg font-bold text-elec-yellow">{ts.totalHours}h</div>
              <span className="text-sm font-medium">{ts.clockOut}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all",
                  ts.status === "Approved" && "bg-success",
                  ts.status === "Pending" && "bg-warning",
                  ts.status === "Rejected" && "bg-destructive"
                )}
                style={{ width: `${Math.min((ts.totalHours / 10) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Info row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{format(parseISO(ts.date), 'EEE, d MMM')}</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-foreground">£{labourCost.toFixed(0)}</span>
              <span className="text-xs text-muted-foreground ml-1">@ £{hourlyRate}/hr</span>
            </div>
          </div>

          {/* Action buttons */}
          {ts.status === "Pending" && !isSelectMode && (
            <div className="flex gap-2">
              <Button 
                size="lg"
                variant="outline" 
                onClick={(e) => { e.stopPropagation(); handleReject(ts.id); }} 
                className="flex-1 h-12 touch-feedback text-destructive hover:text-destructive"
              >
                <X className="h-5 w-5 mr-2" />
                Reject
              </Button>
              <Button 
                size="lg"
                onClick={(e) => { e.stopPropagation(); handleApprove(ts.id); }} 
                className="flex-1 h-12 touch-feedback"
              >
                <Check className="h-5 w-5 mr-2" />
                Approve
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Compact Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-elec-yellow/20">
              <Clock className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Timesheets</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Track, approve, export</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <ManualTimeEntryDialog 
              trigger={
                <Button variant="outline" size="sm" className="gap-1.5 touch-feedback">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add</span>
                </Button>
              }
            />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5 touch-feedback">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto max-h-[80vh]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <FileSpreadsheet className="h-5 w-5 text-elec-yellow" />
                    Export to Accounting Software
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-3 pb-6">
                  {ACCOUNTING_PROVIDERS.map(provider => {
                    const conn = accountingConnections.find(c => c.provider === provider.id);
                    const isConnected = conn?.isConnected;
                    const isSyncing = syncInProgress === provider.id;
                    
                    return (
                      <div 
                        key={provider.id}
                        className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{provider.icon}</span>
                          <div>
                            <p className="font-medium text-foreground">{provider.name}</p>
                            {isConnected && conn?.lastSync && (
                              <p className="text-xs text-muted-foreground">
                                Last sync: {format(parseISO(conn.lastSync), 'dd/MM HH:mm')}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {provider.id === 'csv' ? (
                            <Button 
                              size="sm" 
                              onClick={() => handleExport('csv')}
                              className="gap-1.5"
                            >
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                          ) : isConnected ? (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleExport(provider.id)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleSyncProvider(provider.id)}
                                disabled={isSyncing || approvedHours === 0}
                                className="gap-1.5"
                              >
                                {isSyncing ? (
                                  <RefreshCw className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Zap className="h-4 w-4" />
                                )}
                                Sync
                              </Button>
                            </>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleConnectProvider(provider.id)}
                              className="gap-1.5"
                            >
                              <Link2 className="h-4 w-4" />
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Ready to export:</span>
                      <span className="font-medium text-foreground">{approvedHours.toFixed(1)} hrs • £{approvedLabourCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Week Navigator - Compact */}
        <div className="flex items-center justify-between p-2 bg-surface rounded-lg">
          <Button variant="ghost" size="icon" onClick={goToPreviousWeek} className="h-9 w-9">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{weekLabel}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={goToThisWeek} className="text-xs h-8 px-2">
              Today
            </Button>
            <Button variant="ghost" size="icon" onClick={goToNextWeek} className="h-9 w-9">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Clock In/Out Card - Streamlined */}
      <Card className={cn(
        "relative overflow-hidden border transition-all",
        isClockedIn 
          ? 'bg-success/10 border-success/50' 
          : 'bg-elec-gray border-border'
      )}>
        <CardContent className="p-4">
          {isClockedIn ? (
            // Clocked In State - Expanded
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center">
                      <Clock className="h-7 w-7 text-success" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-success animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">On the Clock</p>
                    <p className="text-3xl font-mono font-bold text-success tracking-wide">{duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-success/20 rounded-full">
                  <MapPin className="h-3.5 w-3.5 text-success" />
                  <span className="text-xs text-success font-medium">GPS</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 bg-surface rounded-lg">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground truncate">{clockState?.jobTitle || 'Unknown Job'}</span>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 h-12 touch-feedback" disabled>
                  <Coffee className="h-5 w-5 mr-2" />
                  Break
                </Button>
                <Button 
                  onClick={handleClockOut} 
                  variant="destructive" 
                  className="flex-1 h-12 touch-feedback"
                  disabled={isClockingOut}
                >
                  {isClockingOut ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <Square className="h-5 w-5 mr-2" />
                  )}
                  Clock Out
                </Button>
              </div>
            </div>
          ) : (
            // Ready to Clock In State - Compact
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
                <SelectTrigger className="flex-1 bg-surface h-12">
                  <SelectValue placeholder="Select employee..." />
                </SelectTrigger>
                <SelectContent>
                  {employees.filter(e => e.status === 'Active' || e.status === 'active').map(emp => (
                    <SelectItem key={emp.id} value={emp.id}>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {emp.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                <SelectTrigger className="flex-1 bg-surface h-12">
                  <SelectValue placeholder="Select job..." />
                </SelectTrigger>
                <SelectContent>
                  {activeJobs.map(job => (
                    <SelectItem key={job.id} value={job.id}>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        {job.title}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleClockIn} className="h-12 px-6 touch-feedback gap-2">
                <Play className="h-5 w-5" />
                Clock In
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2-Column Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <span className="text-xs text-muted-foreground">Hours</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">{totalHours.toFixed(1)}</span>
              <span className="text-sm text-success">({approvedHours.toFixed(1)} approved)</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <PoundSterling className="h-4 w-4 text-elec-yellow" />
              <span className="text-xs text-muted-foreground">Labour Cost</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">£{totalLabourCost.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-elec-gray border-border">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span className="text-xs text-muted-foreground">Approved</span>
            </div>
            <span className="text-2xl font-bold text-success">{weekTimesheets.filter(t => t.status === "Approved").length}</span>
          </CardContent>
        </Card>
        
        <Card className={cn("bg-elec-gray border-border", pendingCount > 0 && "border-warning/50")}>
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="h-4 w-4 text-warning" />
              <span className="text-xs text-muted-foreground">Pending</span>
            </div>
            <span className="text-2xl font-bold text-warning">{pendingCount}</span>
          </CardContent>
        </Card>
      </div>

      {/* Horizontal Scrollable Weekly Calendar */}
      <div className="overflow-x-auto hide-scrollbar -mx-4 px-4">
        <div className="flex gap-2 min-w-max pb-2">
          {dailyBreakdown.map((data, idx) => {
            const isSelected = selectedDay && format(data.day, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd');
            const isTodayDate = isToday(data.day);
            
            return (
              <button
                key={idx}
                onClick={() => setSelectedDay(isSelected ? null : data.day)}
                className={cn(
                  "flex flex-col items-center p-3 rounded-xl min-w-[72px] transition-all touch-feedback",
                  isSelected 
                    ? "bg-elec-yellow text-elec-dark" 
                    : isTodayDate 
                      ? "bg-elec-yellow/20 border border-elec-yellow/50" 
                      : "bg-surface border border-transparent"
                )}
              >
                <span className={cn(
                  "text-xs font-medium mb-1",
                  isSelected ? "text-elec-dark" : "text-muted-foreground"
                )}>
                  {DAYS_OF_WEEK[idx]}
                </span>
                <span className={cn(
                  "text-lg font-bold mb-2",
                  isSelected ? "text-elec-dark" : "text-foreground"
                )}>
                  {format(data.day, 'd')}
                </span>
                
                {/* Hours bar */}
                <div className={cn(
                  "w-full h-12 rounded-lg overflow-hidden relative",
                  isSelected ? "bg-elec-dark/20" : "bg-muted/50"
                )}>
                  {data.hours > 0 && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 flex flex-col"
                      style={{ height: `${Math.min((data.hours / maxDailyHours) * 100, 100)}%` }}
                    >
                      {data.approved > 0 && (
                        <div 
                          className={cn(
                            "flex-1",
                            isSelected ? "bg-elec-dark" : "bg-success"
                          )}
                          style={{ flex: data.approved / data.hours }}
                        />
                      )}
                      {data.pending > 0 && (
                        <div 
                          className={cn(
                            "flex-1",
                            isSelected ? "bg-elec-dark/70" : "bg-warning"
                          )}
                          style={{ flex: data.pending / data.hours }}
                        />
                      )}
                    </div>
                  )}
                </div>
                
                <span className={cn(
                  "text-xs font-medium mt-1.5",
                  isSelected ? "text-elec-dark" : "text-foreground"
                )}>
                  {data.hours.toFixed(1)}h
                </span>
                {data.count > 0 && (
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "mt-1 text-[10px] px-1.5 py-0",
                      isSelected && "bg-elec-dark/30 text-elec-dark"
                    )}
                  >
                    {data.count}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Status Legend */}
      <div className="flex justify-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-success" />
          <span className="text-xs text-muted-foreground">Approved</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-warning" />
          <span className="text-xs text-muted-foreground">Pending</span>
        </div>
      </div>

      {/* Tabs: Time Entries / Leave / Export */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3 bg-surface">
          <TabsTrigger value="time-entries" className="gap-1.5 text-xs sm:text-sm">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Time</span> Entries
          </TabsTrigger>
          <TabsTrigger value="leave" className="gap-1.5 text-xs sm:text-sm">
            <Palmtree className="h-4 w-4" />
            Leave
          </TabsTrigger>
          <TabsTrigger value="workers" className="gap-1.5 text-xs sm:text-sm">
            <Users className="h-4 w-4" />
            Workers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="time-entries" className="mt-4 space-y-4">
          {/* Filters */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              {!searchQuery && (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              )}
              <Input
                placeholder="Search..."
                className={cn("bg-surface h-10", !searchQuery && "pl-10")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10 flex-shrink-0">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Worker</label>
                    <Select value={filterEmployee} onValueChange={setFilterEmployee}>
                      <SelectTrigger className="w-full bg-surface">
                        <SelectValue placeholder="All workers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Workers</SelectItem>
                        {employees.map(emp => (
                          <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Status</label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full bg-surface">
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" onClick={() => setIsFiltersOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <Button 
              variant={isSelectMode ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setIsSelectMode(!isSelectMode);
                if (isSelectMode) setSelectedTimesheetIds([]);
              }}
              className="h-10 px-3"
            >
              {isSelectMode ? "Done" : "Select"}
            </Button>
          </div>

          {/* Active filters / day filter */}
          {(selectedDay || filterEmployee !== "all" || filterStatus !== "all") && (
            <div className="flex flex-wrap gap-2">
              {selectedDay && (
                <Badge variant="secondary" className="gap-1.5 pr-1">
                  {format(selectedDay, 'EEE, d MMM')}
                  <button onClick={() => setSelectedDay(null)} className="ml-1 p-0.5 hover:bg-muted rounded">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filterEmployee !== "all" && (
                <Badge variant="secondary" className="gap-1.5 pr-1">
                  {employees.find(e => e.id === filterEmployee)?.name}
                  <button onClick={() => setFilterEmployee("all")} className="ml-1 p-0.5 hover:bg-muted rounded">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filterStatus !== "all" && (
                <Badge variant="secondary" className="gap-1.5 pr-1">
                  {filterStatus}
                  <button onClick={() => setFilterStatus("all")} className="ml-1 p-0.5 hover:bg-muted rounded">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Batch Action Bar */}
          {isSelectMode && selectedTimesheetIds.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-elec-yellow/10 rounded-lg border border-elec-yellow/30">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{selectedTimesheetIds.length} selected</span>
                <Button variant="ghost" size="sm" onClick={selectAllPending} className="text-xs h-7">
                  Select All Pending
                </Button>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleBatchReject}
                  className="gap-1 h-8"
                >
                  <X className="h-3.5 w-3.5" />
                  Reject
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleBatchApprove}
                  className="gap-1 h-8"
                >
                  <Check className="h-3.5 w-3.5" />
                  Approve
                </Button>
              </div>
            </div>
          )}

          {/* Timesheet Cards */}
          {isMobile ? (
            <div className="space-y-3">
              {filteredTimesheets.length === 0 ? (
                <Card className="bg-elec-gray border-border">
                  <CardContent className="p-8 text-center">
                    <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-foreground font-medium mb-1">No timesheets found</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedDay ? `No entries for ${format(selectedDay, 'EEEE, d MMMM')}` : 'No entries for this week'}
                    </p>
                    <ManualTimeEntryDialog 
                      trigger={
                        <Button className="mt-4 gap-2">
                          <Plus className="h-4 w-4" />
                          Add Entry
                        </Button>
                      }
                    />
                  </CardContent>
                </Card>
              ) : (
                filteredTimesheets.map(renderTimesheetCard)
              )}
            </div>
          ) : (
            // Desktop Table
            <Card className="bg-elec-gray border-border">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {isSelectMode && <TableHead className="w-10"></TableHead>}
                      <TableHead>Worker</TableHead>
                      <TableHead>Job</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-20"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTimesheets.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={isSelectMode ? 8 : 7} className="text-center py-8">
                          <p className="text-muted-foreground">No timesheets found</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTimesheets.map((ts) => {
                        const labourCost = calculateLabourCost(ts.employeeId, ts.totalHours);
                        const isSelected = selectedTimesheetIds.includes(ts.id);
                        
                        return (
                          <TableRow 
                            key={ts.id} 
                            className={cn(isSelected && "bg-elec-yellow/5")}
                          >
                            {isSelectMode && (
                              <TableCell>
                                <Checkbox 
                                  checked={isSelected}
                                  onCheckedChange={() => toggleTimesheetSelection(ts.id)}
                                />
                              </TableCell>
                            )}
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-medium text-elec-yellow">
                                  {ts.employeeName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <span className="font-medium">{ts.employeeName}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                                <span className="truncate max-w-[140px]">{ts.jobTitle}</span>
                              </div>
                            </TableCell>
                            <TableCell>{format(parseISO(ts.date), 'EEE, d MMM')}</TableCell>
                            <TableCell>
                              <span className="font-mono">{ts.clockIn}-{ts.clockOut}</span>
                              <span className="text-muted-foreground ml-1">({ts.totalHours}h)</span>
                            </TableCell>
                            <TableCell>
                              <span className="font-medium">£{labourCost.toFixed(0)}</span>
                            </TableCell>
                            <TableCell>
                              <Badge className={cn(
                                "text-xs",
                                ts.status === "Approved" && "bg-success/20 text-success",
                                ts.status === "Pending" && "bg-warning/20 text-warning",
                                ts.status === "Rejected" && "bg-destructive/20 text-destructive"
                              )}>
                                {ts.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {ts.status === "Pending" && !isSelectMode && (
                                <div className="flex gap-1">
                                  <Button size="sm" variant="ghost" onClick={() => handleReject(ts.id)}>
                                    <X className="h-4 w-4 text-destructive" />
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => handleApprove(ts.id)}>
                                    <Check className="h-4 w-4 text-success" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="leave" className="mt-4">
          <LeaveTabContent />
        </TabsContent>

        <TabsContent value="workers" className="mt-4 space-y-3">
          {employeeBreakdown.length === 0 ? (
            <Card className="bg-elec-gray border-border">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No worker entries this week</p>
              </CardContent>
            </Card>
          ) : (
            employeeBreakdown.map((emp) => (
              <Card key={emp.id} className="bg-elec-gray border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow font-semibold">
                        {emp.avatar_initials}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{emp.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {emp.entries} {emp.entries === 1 ? 'entry' : 'entries'} this week
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-foreground">{emp.totalHours.toFixed(1)}h</p>
                      <p className="text-sm text-success font-medium">£{emp.cost.toFixed(0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
          
          {/* Week Summary */}
          <Card className="bg-gradient-to-br from-primary/10 via-card to-card border-elec-yellow/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-elec-yellow/20">
                  <TrendingUp className="h-5 w-5 text-elec-yellow" />
                </div>
                <h3 className="font-semibold text-foreground">Week Summary</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-foreground">{weekTimesheets.length}</p>
                  <p className="text-xs text-muted-foreground">Total Entries</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-elec-yellow">£{totalLabourCost.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Labour Spend</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

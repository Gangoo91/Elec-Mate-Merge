import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { useEmployees } from '@/hooks/useEmployees';
import {
  useTeamLeaveRequests,
  useTeamAllowances,
  useAddTeamLeave,
  useDecideLeave,
  useTeamAssignments,
  type TeamLeaveRequest,
} from '@/hooks/useTeamLeave';
import {
  format,
  parseISO,
  eachDayOfInterval,
  isWeekend,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval as getDays,
  addMonths,
  subMonths,
  addDays,
  startOfDay,
} from 'date-fns';
import {
  Palmtree,
  Calendar as CalendarIcon,
  Plus,
  Check,
  X,
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  User,
  Briefcase,
} from 'lucide-react';
import { cn } from '@/lib/utils';
type LeaveType = 'annual' | 'sick' | 'unpaid' | 'compassionate' | 'training' | 'bank_holiday';

const LEAVE_TYPES: { value: LeaveType; label: string; colour: string }[] = [
  { value: 'annual', label: 'Annual Leave', colour: 'bg-elec-yellow/20 text-elec-yellow' },
  { value: 'sick', label: 'Sick Leave', colour: 'bg-destructive/20 text-destructive' },
  { value: 'unpaid', label: 'Unpaid Leave', colour: 'bg-[hsl(0_0%_12%)] text-white' },
  { value: 'compassionate', label: 'Compassionate', colour: 'bg-info/20 text-info' },
  { value: 'training', label: 'Training', colour: 'bg-warning/20 text-warning' },
  { value: 'bank_holiday', label: 'Bank Holiday', colour: 'bg-success/20 text-success' },
];

// Widened to string — TeamLeaveRequest carries lowercased DB strings, and both
// helpers already fall back safely on unknown values
const getLeaveTypeInfo = (type: string) =>
  LEAVE_TYPES.find((t) => t.value === type) || LEAVE_TYPES[0];

const getStatusColour = (status: string): string => {
  switch (status) {
    case 'approved':
      return 'bg-success/20 text-success border-success/30';
    case 'pending':
      return 'bg-warning/20 text-warning border-warning/30';
    case 'rejected':
      return 'bg-destructive/20 text-destructive border-destructive/30';
    case 'cancelled':
      return 'bg-[hsl(0_0%_12%)] text-white border-white/[0.08]';
    default:
      return 'bg-[hsl(0_0%_12%)] text-white';
  }
};

export function LeaveTabContent() {
  const { data: employees = [] } = useEmployees();
  const { data: leaveRequests = [] } = useTeamLeaveRequests();
  const { data: holidayAllowances = [] } = useTeamAllowances();
  const { data: allAssignments = [] } = useTeamAssignments();
  const addLeave = useAddTeamLeave();
  const decideLeave = useDecideLeave();

  // Belt-and-braces roster scoping on top of the table's per-company RLS.
  // Live assignment statuses are 'assigned' | 'confirmed' | 'declined' — a
  // declined assignment is not a booking, so it must not flag a clash.
  const rosterIds = new Set(employees.map((e) => e.id));
  const assignments = allAssignments.filter(
    (a) =>
      rosterIds.has(a.employeeId) &&
      !['declined', 'removed', 'completed', 'cancelled', 'ended'].includes(a.status)
  );

  /**
   * What the owner needs BEFORE hitting Approve: is this worker booked on a
   * job for those dates, and who else is already off at the same time?
   */
  const getConflicts = (lr: TeamLeaveRequest) => {
    const jobClashes = assignments.filter(
      (a) =>
        a.employeeId === lr.employeeId &&
        a.startDate <= lr.endDate &&
        (a.endDate === null || a.endDate >= lr.startDate)
    );
    const alsoOff = leaveRequests.filter(
      (other) =>
        other.id !== lr.id &&
        other.employeeId !== lr.employeeId &&
        other.status === 'approved' &&
        other.startDate <= lr.endDate &&
        other.endDate >= lr.startDate
    );
    return { jobClashes, alsoOff };
  };

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [leaveType, setLeaveType] = useState<LeaveType>('annual');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [halfDayPeriod, setHalfDayPeriod] = useState<'am' | 'pm'>('am');
  const [reason, setReason] = useState('');
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [selectedCalDay, setSelectedCalDay] = useState<Date | null>(null);

  // Calculate business days for the request
  const calculateDays = (): number => {
    if (isHalfDay) return 0.5;
    if (!startDate || !endDate) return 0;
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    return days.filter((day) => !isWeekend(day)).length;
  };

  const handleSubmitRequest = async () => {
    // A half day is a single date — don't demand (or trust) a range
    const effectiveEnd = isHalfDay ? startDate : endDate;
    if (!selectedEmployee || !startDate || !effectiveEnd) {
      toast({
        title: 'Missing Information',
        description: 'Please select an employee and dates.',
        variant: 'destructive',
      });
      return;
    }

    const employee = employees.find((e) => e.id === selectedEmployee);
    if (!employee) return;

    const totalDays = calculateDays();

    // Confirm only once the insert has actually landed — a failed write
    // behind a success toast is silent data loss
    try {
      await addLeave.mutateAsync({
        employeeId: selectedEmployee,
        employeeName: employee.name,
        type: leaveType,
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(effectiveEnd, 'yyyy-MM-dd'),
        halfDay: isHalfDay ? halfDayPeriod : undefined,
        totalDays,
        reason,
      });
    } catch {
      toast({
        title: 'Could not submit request',
        description: 'The leave request was not saved. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Request Submitted',
      description: `Leave request for ${employee.name} has been submitted.`,
    });

    // Reset form
    setShowRequestForm(false);
    setSelectedEmployee('');
    setStartDate(undefined);
    setEndDate(undefined);
    setReason('');
    setIsHalfDay(false);
  };

  const handleApprove = async (id: string) => {
    try {
      await decideLeave.mutateAsync({ id, decision: 'approved' });
      toast({ title: 'Leave Approved', description: 'The leave request has been approved.' });
    } catch {
      toast({ title: 'Could not approve', variant: 'destructive' });
    }
  };

  const handleReject = async (id: string) => {
    try {
      await decideLeave.mutateAsync({ id, decision: 'rejected', reason: 'Declined by manager' });
      toast({
        title: 'Leave Rejected',
        description: 'The leave request has been rejected.',
        variant: 'destructive',
      });
    } catch {
      toast({ title: 'Could not reject', variant: 'destructive' });
    }
  };

  // Get calendar data for team view
  const monthStart = startOfMonth(calendarMonth);
  const monthEnd = endOfMonth(calendarMonth);
  const monthDays = getDays({ start: monthStart, end: monthEnd });

  // Next-7-days coverage — the owner's "can I staff next week?" answer
  // without opening a calendar and decoding dots.
  // Midnight-normalised: getEmployeesOffOnDate compares against parseISO
  // (midnight) leave bounds, so a clock-time "today" would miss leave that
  // ends today and show a worker as in when they're off.
  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(startOfDay(new Date()), i));

  const getEmployeesOffOnDate = (date: Date) => {
    return leaveRequests.filter((lr) => {
      if (lr.status !== 'approved' && lr.status !== 'pending') return false;
      const start = parseISO(lr.startDate);
      const end = parseISO(lr.endDate);
      return date >= start && date <= end;
    });
  };

  const pendingRequests = leaveRequests.filter((lr) => lr.status === 'pending');

  return (
    <div className="space-y-4">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Leave & Holidays</h3>
        <Button size="sm" onClick={() => setShowRequestForm(!showRequestForm)} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Request Leave
        </Button>
      </div>

      {/* Next-7-days coverage strip */}
      <Card className="bg-[hsl(0_0%_12%)] border-white/[0.06]">
        <CardContent className="p-3">
          <h4 className="text-sm font-medium text-white mb-2">Coverage — next 7 days</h4>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {next7Days.map((day) => {
              const off = getEmployeesOffOnDate(day);
              const weekend = isWeekend(day);
              const today = isSameDay(day, new Date());
              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    'min-w-[92px] flex-1 rounded-xl border p-2',
                    weekend
                      ? 'border-white/[0.04] bg-white/[0.02] opacity-60'
                      : off.length > 0
                        ? 'border-warning/30 bg-warning/[0.06]'
                        : 'border-white/[0.06] bg-white/[0.02]',
                    today && 'ring-1 ring-elec-yellow/50'
                  )}
                >
                  <p
                    className={cn(
                      'text-[10px] font-semibold uppercase tracking-wide mb-1',
                      today ? 'text-elec-yellow' : 'text-white/60'
                    )}
                  >
                    {today ? 'Today' : format(day, 'EEE d')}
                  </p>
                  {off.length === 0 ? (
                    <p className="text-xs text-success">All in</p>
                  ) : (
                    <div className="space-y-0.5">
                      {off.slice(0, 3).map((lr) => (
                        <p
                          key={lr.id}
                          className={cn(
                            'text-[11px] truncate',
                            lr.status === 'approved' ? 'text-white' : 'text-warning'
                          )}
                        >
                          {lr.employeeName.split(' ')[0]}
                          {lr.status === 'pending' ? '?' : ''}
                        </p>
                      ))}
                      {off.length > 3 && (
                        <p className="text-[10px] text-white/60">+{off.length - 3} more</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Request Form */}
      {showRequestForm && (
        <Card className="bg-surface border-elec-yellow/30">
          <CardContent className="p-4 space-y-4">
            <h4 className="font-medium text-white">New Leave Request</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Employee</Label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees
                      .filter((e) => e.status !== 'Archived')
                      .map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Leave Type</Label>
                <Select value={leaveType} onValueChange={(v) => setLeaveType(v as LeaveType)}>
                  <SelectTrigger className="bg-[hsl(0_0%_12%)] border-white/[0.08] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LEAVE_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-[hsl(0_0%_12%)]"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-[hsl(0_0%_12%)]"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) => (startDate ? date < startDate : false)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch checked={isHalfDay} onCheckedChange={setIsHalfDay} />
                <Label>Half Day</Label>
              </div>
              {isHalfDay && (
                <Select
                  value={halfDayPeriod}
                  onValueChange={(v) => setHalfDayPeriod(v as 'am' | 'pm')}
                >
                  <SelectTrigger className="w-24 h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="am">AM</SelectItem>
                    <SelectItem value="pm">PM</SelectItem>
                  </SelectContent>
                </Select>
              )}
              <div className="ml-auto text-sm">
                <span className="text-white">Total:</span>
                <span className="ml-1 font-semibold text-white">{calculateDays()} days</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Reason (Optional)</Label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Add a note about this leave request..."
                className="bg-[hsl(0_0%_12%)] resize-none"
                rows={2}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowRequestForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitRequest}
                disabled={addLeave.isPending}
                className="flex-1 gap-1.5"
              >
                <Check className="h-4 w-4" />
                {addLeave.isPending ? 'Submitting…' : 'Submit Request'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Holiday Allowance Cards */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white">Holiday Allowances</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {holidayAllowances.map((ha) => {
            const employee = employees.find((e) => e.id === ha.employeeId);
            if (!employee) return null;

            const remaining = ha.totalDays + ha.carriedOver - ha.usedDays - ha.pendingDays;
            const usedPercent =
              ((ha.usedDays + ha.pendingDays) / (ha.totalDays + ha.carriedOver)) * 100;

            return (
              <Card key={ha.id} className="bg-[hsl(0_0%_12%)] border-white/[0.06]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow text-sm font-semibold">
                      {employee.avatar_initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{employee.name}</p>
                      <p className="text-xs text-white">{employee.role}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">Used</span>
                      <span className="font-medium text-white">
                        {ha.usedDays + ha.pendingDays} / {ha.totalDays + ha.carriedOver} days
                      </span>
                    </div>
                    <Progress value={usedPercent} className="h-2" />
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex gap-3">
                        <span className="text-success">{remaining} remaining</span>
                        {ha.pendingDays > 0 && (
                          <span className="text-warning">{ha.pendingDays} pending</span>
                        )}
                      </div>
                      {ha.carriedOver > 0 && (
                        <span className="text-white">+{ha.carriedOver} carried</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium text-white">Pending Requests</h4>
            <Badge variant="secondary" className="bg-warning/20 text-warning">
              {pendingRequests.length}
            </Badge>
          </div>

          {pendingRequests.map((lr) => {
            const typeInfo = getLeaveTypeInfo(lr.type);
            const { jobClashes, alsoOff } = getConflicts(lr);
            return (
              <Card key={lr.id} className="bg-[hsl(0_0%_12%)] border-warning/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-warning" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-medium text-white">{lr.employeeName}</p>
                        <Badge className={cn('text-xs', typeInfo.colour)}>{typeInfo.label}</Badge>
                      </div>
                      <p className="text-sm text-white mb-2">
                        {format(parseISO(lr.startDate), 'd MMM')} -{' '}
                        {format(parseISO(lr.endDate), 'd MMM yyyy')}
                        <span className="mx-2">•</span>
                        {lr.totalDays} {lr.totalDays === 1 ? 'day' : 'days'}
                      </p>
                      {lr.reason && (
                        <p className="text-sm text-white italic mb-3">"{lr.reason}"</p>
                      )}
                      {(jobClashes.length > 0 || alsoOff.length > 0) && (
                        <div className="rounded-lg border border-warning/30 bg-warning/10 p-2.5 mb-3 space-y-1.5">
                          {jobClashes.map((a) => (
                            <p
                              key={a.id}
                              className="text-xs text-warning flex items-start gap-1.5"
                            >
                              <Briefcase className="h-3.5 w-3.5 mt-px flex-shrink-0" />
                              <span>
                                Booked on <span className="font-medium">{a.jobTitle}</span>{' '}
                                {format(parseISO(a.startDate), 'd MMM')}
                                {a.endDate ? ` – ${format(parseISO(a.endDate), 'd MMM')}` : ' onwards'}
                              </span>
                            </p>
                          ))}
                          {alsoOff.length > 0 && (
                            <p className="text-xs text-warning flex items-start gap-1.5">
                              <AlertCircle className="h-3.5 w-3.5 mt-px flex-shrink-0" />
                              <span>
                                Also off then:{' '}
                                {[...new Set(alsoOff.map((o) => o.employeeName))].join(', ')}
                              </span>
                            </p>
                          )}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(lr.id)}
                          className="gap-1 h-9 flex-1"
                        >
                          <X className="h-4 w-4" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(lr.id)}
                          className="gap-1 h-9 flex-1"
                        >
                          <Check className="h-4 w-4" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* All Requests List */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-white">All Requests</h4>
        {leaveRequests.length === 0 ? (
          <Card className="bg-[hsl(0_0%_12%)] border-white/[0.06]">
            <CardContent className="p-8 text-center">
              <Palmtree className="h-12 w-12 text-white mx-auto mb-3" />
              <p className="text-white font-medium mb-1">No leave requests</p>
              <p className="text-sm text-white">
                Use the button above to create a new request.
              </p>
            </CardContent>
          </Card>
        ) : (
          leaveRequests
            .filter((lr) => lr.status !== 'pending')
            .map((lr) => {
              const typeInfo = getLeaveTypeInfo(lr.type);
              return (
                <Card key={lr.id} className="bg-[hsl(0_0%_12%)] border-white/[0.06]">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-medium text-elec-yellow">
                        {lr.employeeName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-white text-sm truncate">
                            {lr.employeeName}
                          </p>
                          <Badge className={cn('text-xs', typeInfo.colour)}>{typeInfo.label}</Badge>
                        </div>
                        <p className="text-xs text-white">
                          {format(parseISO(lr.startDate), 'd MMM')} -{' '}
                          {format(parseISO(lr.endDate), 'd MMM')} • {lr.totalDays}d
                        </p>
                      </div>
                      <Badge className={cn('text-xs capitalize', getStatusColour(lr.status))}>
                        {lr.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })
        )}
      </div>

      {/* Team Calendar View */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-white">Team Calendar</h4>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-white min-w-[100px] text-center">
              {format(calendarMonth, 'MMMM yyyy')}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card className="bg-[hsl(0_0%_12%)] border-white/[0.08] overflow-hidden">
          <CardContent className="p-2">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="text-center text-xs text-white py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Padding for first week */}
              {Array.from({ length: (monthStart.getDay() + 6) % 7 }).map((_, i) => (
                <div key={`pad-${i}`} className="aspect-square" />
              ))}

              {monthDays.map((day) => {
                const employeesOff = getEmployeesOffOnDate(day);
                const isWeekendDay = isWeekend(day);
                const isToday = isSameDay(day, new Date());
                const isSelected = selectedCalDay && isSameDay(day, selectedCalDay);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() =>
                      setSelectedCalDay(isSelected ? null : day)
                    }
                    className={cn(
                      'aspect-square rounded-md flex flex-col items-center justify-center relative text-xs touch-manipulation',
                      isWeekendDay && 'bg-white/[0.04] text-white',
                      isToday && 'ring-2 ring-elec-yellow',
                      employeesOff.length > 0 && !isWeekendDay && 'bg-warning/10',
                      isSelected && 'bg-elec-yellow/20 ring-2 ring-elec-yellow'
                    )}
                  >
                    <span className={cn('font-medium', isToday && 'text-elec-yellow')}>
                      {format(day, 'd')}
                    </span>
                    {employeesOff.length > 0 && (
                      <div className="absolute bottom-0.5 flex gap-0.5">
                        {employeesOff.slice(0, 3).map((lr, i) => (
                          <div
                            key={i}
                            className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              lr.status === 'approved' ? 'bg-success' : 'bg-warning'
                            )}
                          />
                        ))}
                        {employeesOff.length > 3 && (
                          <span className="text-[8px] text-white">
                            +{employeesOff.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tapped-day detail — names, not just dots */}
            {selectedCalDay && (
              <div className="mt-2 rounded-lg bg-white/[0.04] border border-white/[0.08] p-2.5">
                <p className="text-xs font-medium text-white mb-1.5">
                  {format(selectedCalDay, 'EEEE, d MMMM')}
                </p>
                {getEmployeesOffOnDate(selectedCalDay).length === 0 ? (
                  <p className="text-xs text-success">Everyone in</p>
                ) : (
                  <div className="space-y-1">
                    {getEmployeesOffOnDate(selectedCalDay).map((lr) => {
                      const typeInfo = getLeaveTypeInfo(lr.type);
                      return (
                        <div key={lr.id} className="flex items-center gap-2">
                          <div
                            className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              lr.status === 'approved' ? 'bg-success' : 'bg-warning'
                            )}
                          />
                          <span className="text-xs text-white">{lr.employeeName}</span>
                          <Badge className={cn('text-[10px]', typeInfo.colour)}>
                            {typeInfo.label}
                          </Badge>
                          {lr.status === 'pending' && (
                            <span className="text-[10px] text-warning">pending</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Legend */}
            <div className="flex justify-center gap-4 mt-3 pt-2 border-t border-white/[0.08]">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-xs text-white">Approved</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span className="text-xs text-white">Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

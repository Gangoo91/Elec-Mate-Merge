import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { useEmployer } from "@/contexts/EmployerContext";
import { format, parseISO, eachDayOfInterval, isWeekend, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval as getDays, addMonths, subMonths } from "date-fns";
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
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeaveType, LeaveStatus } from "@/data/employerMockData";

const LEAVE_TYPES: { value: LeaveType; label: string; colour: string }[] = [
  { value: 'annual', label: 'Annual Leave', colour: 'bg-elec-yellow/20 text-elec-yellow' },
  { value: 'sick', label: 'Sick Leave', colour: 'bg-destructive/20 text-destructive' },
  { value: 'unpaid', label: 'Unpaid Leave', colour: 'bg-muted text-muted-foreground' },
  { value: 'compassionate', label: 'Compassionate', colour: 'bg-info/20 text-info' },
  { value: 'training', label: 'Training', colour: 'bg-warning/20 text-warning' },
  { value: 'bank_holiday', label: 'Bank Holiday', colour: 'bg-success/20 text-success' },
];

const getLeaveTypeInfo = (type: LeaveType) => LEAVE_TYPES.find(t => t.value === type) || LEAVE_TYPES[0];

const getStatusColour = (status: LeaveStatus): string => {
  switch (status) {
    case 'approved': return 'bg-success/20 text-success border-success/30';
    case 'pending': return 'bg-warning/20 text-warning border-warning/30';
    case 'rejected': return 'bg-destructive/20 text-destructive border-destructive/30';
    case 'cancelled': return 'bg-muted text-muted-foreground border-muted';
    default: return 'bg-muted text-muted-foreground';
  }
};

export function LeaveTabContent() {
  const { 
    employees, 
    holidayAllowances, 
    leaveRequests,
    addLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    getEmployeeAllowance
  } = useEmployer();
  
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [leaveType, setLeaveType] = useState<LeaveType>("annual");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [halfDayPeriod, setHalfDayPeriod] = useState<'am' | 'pm'>('am');
  const [reason, setReason] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  // Calculate business days for the request
  const calculateDays = (): number => {
    if (isHalfDay) return 0.5;
    if (!startDate || !endDate) return 0;
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    return days.filter(day => !isWeekend(day)).length;
  };

  const handleSubmitRequest = () => {
    if (!selectedEmployee || !startDate || !endDate) {
      toast({
        title: "Missing Information",
        description: "Please select an employee and dates.",
        variant: "destructive",
      });
      return;
    }

    const employee = employees.find(e => e.id === selectedEmployee);
    if (!employee) return;

    const totalDays = calculateDays();
    
    addLeaveRequest({
      employeeId: selectedEmployee,
      employeeName: employee.name,
      type: leaveType,
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      halfDay: isHalfDay ? halfDayPeriod : undefined,
      totalDays,
      status: 'pending',
      reason,
    });

    toast({
      title: "Request Submitted",
      description: `Leave request for ${employee.name} has been submitted.`,
    });

    // Reset form
    setShowRequestForm(false);
    setSelectedEmployee("");
    setStartDate(undefined);
    setEndDate(undefined);
    setReason("");
    setIsHalfDay(false);
  };

  const handleApprove = (id: string) => {
    approveLeaveRequest(id, "Manager");
    toast({
      title: "Leave Approved",
      description: "The leave request has been approved.",
    });
  };

  const handleReject = (id: string) => {
    rejectLeaveRequest(id, "Declined by manager");
    toast({
      title: "Leave Rejected",
      description: "The leave request has been rejected.",
      variant: "destructive",
    });
  };

  // Get calendar data for team view
  const monthStart = startOfMonth(calendarMonth);
  const monthEnd = endOfMonth(calendarMonth);
  const monthDays = getDays({ start: monthStart, end: monthEnd });

  const getEmployeesOffOnDate = (date: Date) => {
    return leaveRequests.filter(lr => {
      if (lr.status !== 'approved' && lr.status !== 'pending') return false;
      const start = parseISO(lr.startDate);
      const end = parseISO(lr.endDate);
      return date >= start && date <= end;
    });
  };

  const pendingRequests = leaveRequests.filter(lr => lr.status === 'pending');

  return (
    <div className="space-y-4">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Leave & Holidays</h3>
        <Button 
          size="sm" 
          onClick={() => setShowRequestForm(!showRequestForm)}
          className="gap-1.5"
        >
          <Plus className="h-4 w-4" />
          Request Leave
        </Button>
      </div>

      {/* Request Form */}
      {showRequestForm && (
        <Card className="bg-surface border-elec-yellow/30">
          <CardContent className="p-4 space-y-4">
            <h4 className="font-medium text-foreground">New Leave Request</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Employee</Label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger className="bg-elec-gray">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.filter(e => e.status !== 'Archived').map(emp => (
                      <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Leave Type</Label>
                <Select value={leaveType} onValueChange={(v) => setLeaveType(v as LeaveType)}>
                  <SelectTrigger className="bg-elec-gray">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LEAVE_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
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
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-elec-gray">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
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
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-elec-gray">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) => startDate ? date < startDate : false}
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
                <Select value={halfDayPeriod} onValueChange={(v) => setHalfDayPeriod(v as 'am' | 'pm')}>
                  <SelectTrigger className="w-24 bg-elec-gray">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="am">AM</SelectItem>
                    <SelectItem value="pm">PM</SelectItem>
                  </SelectContent>
                </Select>
              )}
              <div className="ml-auto text-sm">
                <span className="text-muted-foreground">Total:</span>
                <span className="ml-1 font-semibold text-foreground">{calculateDays()} days</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Reason (Optional)</Label>
              <Textarea 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Add a note about this leave request..."
                className="bg-elec-gray resize-none"
                rows={2}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowRequestForm(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSubmitRequest} className="flex-1 gap-1.5">
                <Check className="h-4 w-4" />
                Submit Request
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Holiday Allowance Cards */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Holiday Allowances</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {holidayAllowances.slice(0, 4).map((ha) => {
            const employee = employees.find(e => e.id === ha.employeeId);
            if (!employee) return null;
            
            const remaining = ha.totalDays + ha.carriedOver - ha.usedDays - ha.pendingDays;
            const usedPercent = ((ha.usedDays + ha.pendingDays) / (ha.totalDays + ha.carriedOver)) * 100;
            
            return (
              <Card key={ha.id} className="bg-elec-gray border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center text-elec-yellow text-sm font-semibold">
                      {employee.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{employee.name}</p>
                      <p className="text-xs text-muted-foreground">{employee.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Used</span>
                      <span className="font-medium text-foreground">
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
                        <span className="text-muted-foreground">+{ha.carriedOver} carried</span>
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
            <h4 className="text-sm font-medium text-muted-foreground">Pending Requests</h4>
            <Badge variant="secondary" className="bg-warning/20 text-warning">
              {pendingRequests.length}
            </Badge>
          </div>
          
          {pendingRequests.map((lr) => {
            const typeInfo = getLeaveTypeInfo(lr.type);
            return (
              <Card key={lr.id} className="bg-elec-gray border-warning/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-warning" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-medium text-foreground">{lr.employeeName}</p>
                        <Badge className={cn("text-xs", typeInfo.colour)}>
                          {typeInfo.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {format(parseISO(lr.startDate), 'd MMM')} - {format(parseISO(lr.endDate), 'd MMM yyyy')}
                        <span className="mx-2">•</span>
                        {lr.totalDays} {lr.totalDays === 1 ? 'day' : 'days'}
                      </p>
                      {lr.reason && (
                        <p className="text-sm text-muted-foreground italic mb-3">"{lr.reason}"</p>
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
        <h4 className="text-sm font-medium text-muted-foreground">All Requests</h4>
        {leaveRequests.length === 0 ? (
          <Card className="bg-elec-gray border-border">
            <CardContent className="p-8 text-center">
              <Palmtree className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-foreground font-medium mb-1">No leave requests</p>
              <p className="text-sm text-muted-foreground">
                Use the button above to create a new request.
              </p>
            </CardContent>
          </Card>
        ) : (
          leaveRequests.filter(lr => lr.status !== 'pending').slice(0, 5).map((lr) => {
            const typeInfo = getLeaveTypeInfo(lr.type);
            return (
              <Card key={lr.id} className="bg-elec-gray border-border">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 text-xs font-medium text-elec-yellow">
                      {lr.employeeName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground text-sm truncate">{lr.employeeName}</p>
                        <Badge className={cn("text-xs", typeInfo.colour)}>
                          {typeInfo.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {format(parseISO(lr.startDate), 'd MMM')} - {format(parseISO(lr.endDate), 'd MMM')} • {lr.totalDays}d
                      </p>
                    </div>
                    <Badge className={cn("text-xs capitalize", getStatusColour(lr.status))}>
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
          <h4 className="text-sm font-medium text-muted-foreground">Team Calendar</h4>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-foreground min-w-[100px] text-center">
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
        
        <Card className="bg-elec-gray border-border overflow-hidden">
          <CardContent className="p-2">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="text-center text-xs text-muted-foreground py-1">
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
                
                return (
                  <div 
                    key={day.toISOString()}
                    className={cn(
                      "aspect-square rounded-md flex flex-col items-center justify-center relative text-xs",
                      isWeekendDay && "bg-muted/30 text-muted-foreground",
                      isToday && "ring-2 ring-elec-yellow",
                      employeesOff.length > 0 && !isWeekendDay && "bg-warning/10"
                    )}
                  >
                    <span className={cn(
                      "font-medium",
                      isToday && "text-elec-yellow"
                    )}>
                      {format(day, 'd')}
                    </span>
                    {employeesOff.length > 0 && (
                      <div className="absolute bottom-0.5 flex gap-0.5">
                        {employeesOff.slice(0, 3).map((lr, i) => (
                          <div 
                            key={i}
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              lr.status === 'approved' ? "bg-success" : "bg-warning"
                            )}
                          />
                        ))}
                        {employeesOff.length > 3 && (
                          <span className="text-[8px] text-muted-foreground">+{employeesOff.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="flex justify-center gap-4 mt-3 pt-2 border-t border-border">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-xs text-muted-foreground">Approved</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span className="text-xs text-muted-foreground">Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

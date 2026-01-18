import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Users,
  AlertTriangle,
  Clock,
  Filter,
  MapPin,
  PoundSterling,
  ChevronRightIcon,
  Briefcase,
  UserCheck,
  TrendingUp,
  X
} from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { useEmployees } from "@/hooks/useEmployees";
import { cn } from "@/lib/utils";
import { ViewJobSheet } from "@/components/employer/sheets/ViewJobSheet";
import { Job } from "@/services/jobService";

export function JobTimelineSection() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  
  // Fetch real data from Supabase
  const { data: jobs = [], isLoading: jobsLoading } = useJobs();
  const { data: employees = [], isLoading: employeesLoading } = useEmployees();

  // Generate week days
  const getWeekDays = (weekOffset: number) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1 + (weekOffset * 7));
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const weekDays = getWeekDays(currentWeek);
  
  // Map jobs to timeline format with real data
  const activeJobs = jobs
    .filter(j => j.status === "Active" || j.status === "Pending")
    .map(job => ({
      ...job,
      stage: job.status === "Active" ? "In Progress" : "Scheduled",
      assignedWorkers: job.workers_count || 0,
      startDate: job.start_date || new Date().toISOString(),
      endDate: job.end_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }));

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' });
  };

  const formatShortDay = (date: Date) => {
    return date.toLocaleDateString('en-GB', { weekday: 'short' }).charAt(0);
  };

  const formatValue = (value: number | null) => {
    if (!value) return null;
    if (value >= 1000) return `£${Math.round(value / 1000)}k`;
    return `£${value}`;
  };

  const getJobPosition = (job: typeof activeJobs[0]) => {
    const startDate = new Date(job.startDate);
    const endDate = new Date(job.endDate);
    const weekStart = weekDays[0];
    const weekEnd = weekDays[6];

    // Check if job overlaps with current week
    if (endDate < weekStart || startDate > weekEnd) return null;

    const clampedStart = startDate < weekStart ? weekStart : startDate;
    const clampedEnd = endDate > weekEnd ? weekEnd : endDate;

    const startDay = Math.floor((clampedStart.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.ceil((clampedEnd.getTime() - clampedStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    return { startDay, duration };
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getTodayIndex = () => {
    return weekDays.findIndex(day => isToday(day));
  };

  // Calculate stats for this week
  const jobsThisWeek = activeJobs.filter(job => getJobPosition(job) !== null);
  const activeEmployees = employees.filter(e => e.status === "Active");
  const totalWeekValue = jobsThisWeek.reduce((sum, job) => sum + (job.value || 0), 0);

  // Clash detection - find workers assigned to multiple overlapping jobs
  const detectClashes = () => {
    const clashes: Array<{
      employee: typeof employees[0];
      jobs: typeof activeJobs;
      date: Date;
    }> = [];

    // For demo, simulate a clash if we have both jobs and employees
    if (activeJobs.length >= 2 && employees.length > 0) {
      const todayIdx = getTodayIndex();
      if (todayIdx >= 0 && todayIdx < 5) { // Weekday
        const overlappingJobs = jobsThisWeek.filter(job => {
          const pos = getJobPosition(job);
          return pos && todayIdx >= pos.startDay && todayIdx < pos.startDay + pos.duration;
        });

        if (overlappingJobs.length >= 2 && employees[0]) {
          clashes.push({
            employee: employees[0],
            jobs: overlappingJobs.slice(0, 2),
            date: weekDays[todayIdx]
          });
        }
      }
    }

    return clashes;
  };

  const clashes = detectClashes();

  // Get worker assignments for this week
  const getWorkerStatus = (employee: typeof employees[0]) => {
    // Simulate different statuses based on employee data
    if (employee.status !== "Active") return { status: "Leave", color: "bg-muted text-muted-foreground" };
    
    // Check if worker has a clash
    const hasClash = clashes.some(c => c.employee.id === employee.id);
    if (hasClash) return { status: "Clash", color: "bg-destructive text-destructive-foreground" };

    // Simulate on-site status for first few employees
    const idx = employees.findIndex(e => e.id === employee.id);
    if (idx < 3 && jobsThisWeek.length > 0) {
      return { status: "On Site", color: "bg-success text-success-foreground" };
    }

    return { status: "Available", color: "bg-info text-info-foreground" };
  };

  const getWorkerCurrentJob = (employee: typeof employees[0]) => {
    const status = getWorkerStatus(employee);
    if (status.status === "On Site" && jobsThisWeek.length > 0) {
      const idx = employees.findIndex(e => e.id === employee.id);
      return jobsThisWeek[idx % jobsThisWeek.length];
    }
    return null;
  };

  const getWorkerWeekSchedule = (employee: typeof employees[0]) => {
    const schedule: Array<{ assigned: boolean; jobColor?: string }> = [];
    const workerStatus = getWorkerStatus(employee);
    const currentJob = getWorkerCurrentJob(employee);

    for (let i = 0; i < 7; i++) {
      if (workerStatus.status === "Leave") {
        schedule.push({ assigned: false });
      } else if (i >= 5) {
        // Weekend
        schedule.push({ assigned: false });
      } else if (currentJob) {
        const pos = getJobPosition(currentJob as any);
        if (pos && i >= pos.startDay && i < pos.startDay + pos.duration) {
          schedule.push({ assigned: true, jobColor: stageColors[currentJob.stage] });
        } else {
          schedule.push({ assigned: false });
        }
      } else {
        schedule.push({ assigned: i < 5 }); // Available weekdays
      }
    }
    return schedule;
  };

  const handleJobClick = (job: typeof activeJobs[0]) => {
    // Convert to Job type for ViewJobSheet
    const fullJob = jobs.find(j => j.id === job.id);
    if (fullJob) {
      setSelectedJob(fullJob);
      setSheetOpen(true);
    }
  };

  const stageColors: Record<string, string> = {
    "In Progress": "bg-elec-yellow",
    "Scheduled": "bg-info",
    "Testing": "bg-purple-500",
    "Confirmed": "bg-success",
  };

  const stageBorderColors: Record<string, string> = {
    "In Progress": "border-l-elec-yellow",
    "Scheduled": "border-l-info",
    "Testing": "border-l-purple-500",
    "Confirmed": "border-l-success",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Job Timeline</h1>
          <p className="text-sm text-muted-foreground">Visual schedule and resource allocation</p>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          <Button variant="outline" size="icon" className="shrink-0 touch-feedback" onClick={() => setCurrentWeek(prev => prev - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="shrink-0 touch-feedback" onClick={() => setCurrentWeek(0)}>
            <Calendar className="h-4 w-4 mr-2" />
            This Week
          </Button>
          <Button variant="outline" size="icon" className="shrink-0 touch-feedback" onClick={() => setCurrentWeek(prev => prev + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="shrink-0 touch-feedback">
            <Filter className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Filter</span>
          </Button>
        </div>
      </div>

      {/* Compact Summary Stats */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
        <Card className="shrink-0 min-w-[140px] border-l-4 border-l-elec-yellow bg-elec-gray">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <Briefcase className="h-4 w-4 text-elec-yellow" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{jobsThisWeek.length}</p>
              <p className="text-xs text-muted-foreground">Jobs This Week</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shrink-0 min-w-[140px] border-l-4 border-l-info bg-elec-gray">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-info/10">
              <UserCheck className="h-4 w-4 text-info" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{activeEmployees.length}</p>
              <p className="text-xs text-muted-foreground">Workers Active</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shrink-0 min-w-[140px] border-l-4 border-l-success bg-elec-gray">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{formatValue(totalWeekValue) || "£0"}</p>
              <p className="text-xs text-muted-foreground">Total Value</p>
            </div>
          </CardContent>
        </Card>

        <Card className={cn(
          "shrink-0 min-w-[140px] border-l-4 bg-elec-gray",
          clashes.length > 0 ? "border-l-destructive" : "border-l-muted"
        )}>
          <CardContent className="p-3 flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              clashes.length > 0 ? "bg-destructive/10" : "bg-muted"
            )}>
              <AlertTriangle className={cn(
                "h-4 w-4",
                clashes.length > 0 ? "text-destructive" : "text-muted-foreground"
              )} />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{clashes.length}</p>
              <p className="text-xs text-muted-foreground">Clashes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Timeline - Premium Card View */}
      <div className="md:hidden space-y-3">
        {jobsLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading jobs...</div>
        ) : jobsThisWeek.length === 0 ? (
          <Card className="bg-elec-gray">
            <CardContent className="p-6 text-center text-muted-foreground">
              No jobs scheduled this week
            </CardContent>
          </Card>
        ) : (
          jobsThisWeek.map((job) => {
            const position = getJobPosition(job);
            if (!position) return null;
            
            return (
              <Card 
                key={job.id} 
                className={cn(
                  "bg-elec-gray border-l-4 touch-feedback active:scale-[0.98] transition-transform cursor-pointer",
                  stageBorderColors[job.stage] || "border-l-elec-yellow"
                )}
                onClick={() => handleJobClick(job)}
              >
                <CardContent className="p-4">
                  {/* Header row with title, value and chevron */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground truncate">{job.title}</h4>
                        {formatValue(job.value) && (
                          <Badge variant="outline" className="shrink-0 text-xs font-bold text-success border-success/30">
                            {formatValue(job.value)}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{job.client}</p>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-muted-foreground shrink-0" />
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  
                  {/* Stats row */}
                  <div className="mt-3 flex items-center gap-4">
                    {/* Progress bar */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium text-foreground">{job.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full", stageColors[job.stage] || "bg-elec-yellow")}
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Workers */}
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50">
                      <Users className="h-3.5 w-3.5 text-elec-yellow" />
                      <span className="text-sm font-medium text-foreground">{job.assignedWorkers}</span>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50">
                      <Clock className="h-3.5 w-3.5 text-info" />
                      <span className="text-sm font-medium text-foreground">{position.duration}d</span>
                    </div>
                  </div>
                  
                  {/* Mini week view with day labels */}
                  <div className="mt-3">
                    <div className="flex gap-1">
                      {weekDays.map((day, i) => {
                        const isInRange = i >= position.startDay && i < position.startDay + position.duration;
                        const isTodayDay = isToday(day);
                        return (
                          <div 
                            key={i}
                            className={cn(
                              "flex-1 h-2 rounded-sm relative",
                              isTodayDay && "ring-2 ring-elec-yellow ring-offset-1 ring-offset-background",
                              isInRange ? stageColors[job.stage] || "bg-elec-yellow" : "bg-muted"
                            )}
                          />
                        );
                      })}
                    </div>
                    <div className="mt-1.5 flex justify-between px-0.5">
                      {weekDays.map((day, i) => (
                        <span 
                          key={i} 
                          className={cn(
                            "text-[10px]",
                            isToday(day) ? "text-elec-yellow font-bold" : "text-muted-foreground"
                          )}
                        >
                          {formatShortDay(day)}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Desktop Timeline Header */}
      <Card className="bg-elec-gray overflow-hidden hidden md:block">
        <div className="grid grid-cols-8 border-b border-border">
          <div className="p-3 bg-muted/50">
            <span className="text-sm font-medium text-muted-foreground">Jobs</span>
          </div>
          {weekDays.map((day, i) => (
            <div 
              key={i} 
              className={cn(
                "p-3 text-center border-l border-border",
                isToday(day) && "bg-elec-yellow/10"
              )}
            >
              <p className={cn(
                "text-sm font-medium",
                isToday(day) ? "text-elec-yellow" : "text-foreground"
              )}>
                {formatDate(day)}
              </p>
              {isToday(day) && (
                <Badge className="mt-1 text-xs bg-elec-yellow">Today</Badge>
              )}
            </div>
          ))}
        </div>

        {/* Job Rows */}
        <div className="divide-y divide-border">
          {activeJobs.map((job) => {
            const position = getJobPosition(job);

            return (
              <div 
                key={job.id} 
                className="grid grid-cols-8 min-h-[80px] hover:bg-muted/30 cursor-pointer active:bg-muted/40 transition-all touch-manipulation"
                onClick={() => handleJobClick(job)}
              >
                {/* Job Info */}
                <div className={cn(
                  "p-3 bg-muted/30 flex flex-col justify-center border-l-4",
                  stageBorderColors[job.stage] || "border-l-elec-yellow"
                )}>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm text-foreground truncate">{job.title}</h4>
                    {formatValue(job.value) && (
                      <span className="text-xs font-bold text-success">{formatValue(job.value)}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{job.client}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-elec-yellow" />
                      <span className="text-xs text-muted-foreground">{job.assignedWorkers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground truncate">{job.location}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline Grid */}
                <div className="col-span-7 relative">
                  {/* Day columns */}
                  <div className="absolute inset-0 grid grid-cols-7">
                    {weekDays.map((day, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "border-l border-border h-full",
                          isToday(day) && "bg-elec-yellow/5"
                        )}
                      />
                    ))}
                  </div>

                  {/* Job bar */}
                  {position && (
                    <div 
                      className={cn(
                        "absolute top-3 bottom-3 rounded-md flex items-center px-3 text-foreground text-xs font-medium shadow-sm",
                        stageColors[job.stage] || "bg-elec-yellow"
                      )}
                      style={{
                        left: `${(position.startDay / 7) * 100}%`,
                        width: `${(position.duration / 7) * 100}%`,
                        minWidth: '80px'
                      }}
                    >
                      <div className="flex items-center justify-between w-full gap-2">
                        <span className="truncate">{job.progress}%</span>
                        {/* Progress indicator */}
                        <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-white rounded-full"
                            style={{ width: `${job.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Worker Allocation */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-info rounded-full"></span>
          Worker Allocation This Week
        </h2>
        {employeesLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading employees...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {activeEmployees.slice(0, 9).map((employee) => {
              const workerStatus = getWorkerStatus(employee);
              const currentJob = getWorkerCurrentJob(employee);
              const schedule = getWorkerWeekSchedule(employee);

              return (
                <Card key={employee.id} className="bg-elec-gray touch-feedback active:scale-[0.98] transition-transform cursor-pointer">
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 md:gap-3 min-w-0">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center shrink-0">
                          <span className="text-xs md:text-sm font-bold text-elec-yellow">{employee.avatar_initials}</span>
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-sm md:text-base text-foreground truncate">{employee.name}</h4>
                          <p className="text-xs text-muted-foreground truncate">{employee.team_role}</p>
                        </div>
                      </div>
                      <Badge className={cn("shrink-0 text-xs", workerStatus.color)}>
                        {workerStatus.status}
                      </Badge>
                    </div>

                    {/* Current job assignment */}
                    {currentJob && (
                      <div className="mt-2 px-2 py-1.5 rounded-md bg-muted/50 flex items-center gap-2">
                        <Briefcase className="h-3.5 w-3.5 text-elec-yellow" />
                        <span className="text-xs text-foreground truncate">{currentJob.title}</span>
                      </div>
                    )}

                    {/* Week schedule with day labels */}
                    <div className="mt-3">
                      <div className="flex gap-1">
                        {schedule.map((day, i) => (
                          <div 
                            key={i}
                            className={cn(
                              "flex-1 h-2 md:h-2.5 rounded-sm relative",
                              isToday(weekDays[i]) && "ring-2 ring-elec-yellow ring-offset-1 ring-offset-background",
                              day.assigned ? (day.jobColor || "bg-elec-yellow/60") : "bg-muted"
                            )}
                            title={`${formatDate(weekDays[i])}${day.assigned ? " - Assigned" : ""}`}
                          />
                        ))}
                      </div>
                      <div className="mt-1.5 flex justify-between px-0.5">
                        {weekDays.map((day, i) => (
                          <span 
                            key={i} 
                            className={cn(
                              "text-[10px]",
                              isToday(day) ? "text-elec-yellow font-bold" : "text-muted-foreground"
                            )}
                          >
                            {formatShortDay(day)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Clash Detection - Dynamic */}
      {clashes.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-5 bg-destructive rounded-full"></span>
            Resource Clashes ({clashes.length})
          </h2>
          {clashes.map((clash, idx) => (
            <Card key={idx} className="bg-destructive/10 border-destructive/30">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-foreground">Double Booking Detected</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium text-foreground">{clash.employee.name}</span> is assigned to both{" "}
                      <span className="font-medium">"{clash.jobs[0]?.title}"</span> and{" "}
                      <span className="font-medium">"{clash.jobs[1]?.title}"</span> on{" "}
                      {clash.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button variant="outline" size="sm" className="touch-feedback gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        Reassign Worker
                      </Button>
                      <Button variant="outline" size="sm" className="touch-feedback gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        Move Job
                      </Button>
                      <Button variant="ghost" size="sm" className="touch-feedback gap-1.5 text-muted-foreground">
                        <X className="h-3.5 w-3.5" />
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-success/10 border-success/30">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/20">
                <UserCheck className="h-5 w-5 text-success" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">No Resource Clashes</h4>
                <p className="text-sm text-muted-foreground">All workers are properly allocated this week.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ViewJobSheet */}
      <ViewJobSheet
        job={selectedJob}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  );
}

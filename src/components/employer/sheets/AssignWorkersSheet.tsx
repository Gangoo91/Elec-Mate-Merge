import { useState, useMemo } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { useEmployees } from "@/hooks/useEmployees";
import { useCreateJobAssignment, useCheckForClashes } from "@/hooks/useJobAssignments";
import { Job } from "@/services/jobService";
import { Employee } from "@/services/employeeService";
import { JobAssignmentWithDetails } from "@/services/jobAssignmentService";
import { WorkerCard } from "./WorkerCard";
import { WorkerFilterPills } from "./WorkerFilterPills";
import { AssignmentDetailsSheet, AssignmentDetails } from "./AssignmentDetailsSheet";
import {
  Search, UserPlus, MapPin, Users, X, ChevronRight, 
  Building2, Calendar, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AssignWorkersSheetProps {
  job: Job;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingAssignments: JobAssignmentWithDetails[];
}

export function AssignWorkersSheet({ job, open, onOpenChange, existingAssignments }: AssignWorkersSheetProps) {
  const { data: employees = [], isLoading: loadingEmployees } = useEmployees();
  const createAssignment = useCreateJobAssignment();
  const checkClashes = useCheckForClashes();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedWorkerIds, setSelectedWorkerIds] = useState<string[]>([]);
  const [clashWarnings, setClashWarnings] = useState<Record<string, JobAssignmentWithDetails[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetailsSheet, setShowDetailsSheet] = useState(false);

  // Filter out already assigned workers
  const assignedEmployeeIds = existingAssignments.map(a => a.employee_id);

  // Get unique roles for filter pills
  const uniqueRoles = useMemo(() => {
    const roles = new Set(employees.map(e => e.role));
    return ["All", ...Array.from(roles)];
  }, [employees]);

  // Calculate worker counts per role
  const workerCounts = useMemo(() => {
    const counts: Record<string, number> = { All: 0 };
    employees.forEach(emp => {
      if (assignedEmployeeIds.includes(emp.id)) return;
      counts.All = (counts.All || 0) + 1;
      counts[emp.role] = (counts[emp.role] || 0) + 1;
    });
    return counts;
  }, [employees, assignedEmployeeIds]);

  const availableWorkers = useMemo(() => {
    return employees.filter(emp => {
      // Filter out already assigned
      if (assignedEmployeeIds.includes(emp.id)) return false;
      // Filter by role
      if (selectedFilter !== "All" && emp.role !== selectedFilter) return false;
      // Filter by search
      if (searchQuery) {
        const search = searchQuery.toLowerCase();
        return emp.name.toLowerCase().includes(search) ||
          emp.role.toLowerCase().includes(search);
      }
      return true;
    });
  }, [employees, assignedEmployeeIds, searchQuery, selectedFilter]);

  const selectedWorkers = useMemo(() => {
    return employees.filter(e => selectedWorkerIds.includes(e.id));
  }, [employees, selectedWorkerIds]);

  const handleWorkerToggle = async (employeeId: string) => {
    if (selectedWorkerIds.includes(employeeId)) {
      setSelectedWorkerIds(prev => prev.filter(id => id !== employeeId));
      setClashWarnings(prev => {
        const updated = { ...prev };
        delete updated[employeeId];
        return updated;
      });
    } else {
      setSelectedWorkerIds(prev => [...prev, employeeId]);

      // Check for clashes
      const startDate = job.start_date || new Date().toISOString().split('T')[0];
      const clashes = await checkClashes.mutateAsync({
        employeeId,
        startDate,
        endDate: job.end_date || null,
        excludeJobId: job.id,
      });

      if (clashes.length > 0) {
        setClashWarnings(prev => ({ ...prev, [employeeId]: clashes }));
      }
    }
  };

  const handleRemoveWorker = (employeeId: string) => {
    setSelectedWorkerIds(prev => prev.filter(id => id !== employeeId));
    setClashWarnings(prev => {
      const updated = { ...prev };
      delete updated[employeeId];
      return updated;
    });
  };

  const handleAssign = async (details: AssignmentDetails) => {
    if (selectedWorkerIds.length === 0 || !details.startDate) {
      return;
    }

    setIsSubmitting(true);

    try {
      for (const employeeId of selectedWorkerIds) {
        await createAssignment.mutateAsync({
          assignment: {
            job_id: job.id,
            employee_id: employeeId,
            start_date: details.startDate,
            end_date: details.endDate || null,
            notes: details.notes || null,
            notify_email: details.sendEmail,
            assigned_by: 'Admin',
          },
          jobTitle: job.title,
          jobLocation: job.location,
          sendNotification: true,
        });
      }

      toast({
        title: "Workers Assigned",
        description: `${selectedWorkerIds.length} worker(s) have been assigned to ${job.title}`,
      });

      // Reset and close
      setSelectedWorkerIds([]);
      setClashWarnings({});
      setShowDetailsSheet(false);
      onOpenChange(false);
    } catch (error) {
      console.error('Error assigning workers:', error);
      toast({
        title: "Error",
        description: "Failed to assign workers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearSelection = () => {
    setSelectedWorkerIds([]);
    setClashWarnings({});
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg p-0 !h-full grid grid-rows-[auto_1fr_auto] overflow-hidden">
          {/* Sticky Header - Compact Job Info */}
          <div className="bg-background border-b overflow-hidden">
            {/* Job Header */}
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-lg bg-elec-yellow/10">
                      <UserPlus className="h-4 w-4 text-elec-yellow" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Assign Workers
                    </span>
                  </div>
                  <h2 className="font-bold text-lg text-foreground truncate">
                    {job.title}
                  </h2>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1 truncate">
                      <Building2 className="h-3.5 w-3.5" />
                      {job.client}
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="shrink-0 -mr-2 -mt-1"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Sticky Search */}
            <div className="px-4 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base bg-muted/50 border-transparent focus:border-elec-yellow focus:bg-background"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Filter Pills */}
            <div className="px-4 pb-3">
              <WorkerFilterPills
                filters={uniqueRoles}
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
                workerCounts={workerCounts}
              />
            </div>
          </div>

          {/* Worker List - wrapped in container with min-h-0 for grid */}
          <div className="overflow-hidden min-h-0">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-2">
                {loadingEmployees ? (
                  // Loading Skeleton
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="p-4 rounded-lg border">
                        <div className="flex items-center gap-4">
                          <Skeleton className="h-7 w-7 rounded-full" />
                          <Skeleton className="h-14 w-14 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : availableWorkers.length === 0 ? (
                  // Empty State
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="p-4 rounded-full bg-muted mb-4">
                      <Users className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {searchQuery || selectedFilter !== "All" 
                        ? "No workers found" 
                        : "All workers assigned"}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-[200px]">
                      {searchQuery 
                        ? "Try adjusting your search or filters"
                        : selectedFilter !== "All"
                          ? `No ${selectedFilter}s available`
                          : "Every team member is already on this job"}
                    </p>
                    {(searchQuery || selectedFilter !== "All") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-3"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedFilter("All");
                        }}
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                ) : (
                  availableWorkers.map((employee) => (
                    <WorkerCard
                      key={employee.id}
                      employee={employee}
                      isSelected={selectedWorkerIds.includes(employee.id)}
                      onToggle={() => handleWorkerToggle(employee.id)}
                      clashWarnings={clashWarnings[employee.id]}
                    />
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Floating Selection Footer - conditionally rendered */}
          {selectedWorkerIds.length > 0 ? (
            <div className="border-t bg-background pb-[env(safe-area-inset-bottom)]">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Overlapping Avatars */}
                    <div className="flex -space-x-2">
                      {selectedWorkers.slice(0, 4).map((worker, idx) => (
                        <Avatar 
                          key={worker.id} 
                          className="h-8 w-8 border-2 border-background"
                          style={{ zIndex: 4 - idx }}
                        >
                          {worker.photo_url ? (
                            <AvatarImage src={worker.photo_url} alt={worker.name} />
                          ) : null}
                          <AvatarFallback className="text-xs bg-elec-yellow text-elec-yellow-foreground">
                            {worker.avatar_initials}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {selectedWorkerIds.length > 4 && (
                        <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                          <span className="text-xs font-medium">+{selectedWorkerIds.length - 4}</span>
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-foreground">
                      {selectedWorkerIds.length} selected
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearSelection}
                    className="text-muted-foreground"
                  >
                    Clear all
                  </Button>
                </div>
                
                <Button
                  onClick={() => setShowDetailsSheet(true)}
                  className="w-full h-14 text-base font-semibold gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  Continue to Assignment
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="hidden" />
          )}
        </SheetContent>
      </Sheet>

      {/* Assignment Details Bottom Sheet */}
      <AssignmentDetailsSheet
        open={showDetailsSheet}
        onOpenChange={setShowDetailsSheet}
        selectedWorkers={selectedWorkers}
        clashWarnings={clashWarnings}
        job={job}
        onAssign={handleAssign}
        onRemoveWorker={handleRemoveWorker}
        isSubmitting={isSubmitting}
      />
    </>
  );
}

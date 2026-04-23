import { useState, useMemo } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { useEmployees } from '@/hooks/useEmployees';
import { useCreateJobAssignment, useCheckForClashes } from '@/hooks/useJobAssignments';
import { Job } from '@/services/jobService';
import { JobAssignmentWithDetails } from '@/services/jobAssignmentService';
import { WorkerCard } from './WorkerCard';
import { WorkerFilterPills } from './WorkerFilterPills';
import { AssignmentDetailsSheet, AssignmentDetails } from './AssignmentDetailsSheet';
import {
  Search,
  UserPlus,
  MapPin,
  Users,
  X,
  ChevronRight,
  Building2,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PrimaryButton,
  SecondaryButton,
  IconButton,
  Eyebrow,
  inputClass,
  SuccessCheckmark,
} from '@/components/employer/editorial';

interface AssignWorkersSheetProps {
  job: Job;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingAssignments: JobAssignmentWithDetails[];
}

export function AssignWorkersSheet({
  job,
  open,
  onOpenChange,
  existingAssignments,
}: AssignWorkersSheetProps) {
  const { data: employees = [], isLoading: loadingEmployees } = useEmployees();
  const createAssignment = useCreateJobAssignment();
  const checkClashes = useCheckForClashes();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedWorkerIds, setSelectedWorkerIds] = useState<string[]>([]);
  const [clashWarnings, setClashWarnings] = useState<Record<string, JobAssignmentWithDetails[]>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetailsSheet, setShowDetailsSheet] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const assignedEmployeeIds = existingAssignments.map((a) => a.employee_id);

  const uniqueRoles = useMemo(() => {
    const roles = new Set(employees.map((e) => e.role));
    return ['All', ...Array.from(roles)];
  }, [employees]);

  const workerCounts = useMemo(() => {
    const counts: Record<string, number> = { All: 0 };
    employees.forEach((emp) => {
      if (assignedEmployeeIds.includes(emp.id)) return;
      counts.All = (counts.All || 0) + 1;
      counts[emp.role] = (counts[emp.role] || 0) + 1;
    });
    return counts;
  }, [employees, assignedEmployeeIds]);

  const availableWorkers = useMemo(() => {
    return employees.filter((emp) => {
      if (assignedEmployeeIds.includes(emp.id)) return false;
      if (selectedFilter !== 'All' && emp.role !== selectedFilter) return false;
      if (searchQuery) {
        const search = searchQuery.toLowerCase();
        return emp.name.toLowerCase().includes(search) || emp.role.toLowerCase().includes(search);
      }
      return true;
    });
  }, [employees, assignedEmployeeIds, searchQuery, selectedFilter]);

  const selectedWorkers = useMemo(() => {
    return employees.filter((e) => selectedWorkerIds.includes(e.id));
  }, [employees, selectedWorkerIds]);

  const handleWorkerToggle = async (employeeId: string) => {
    if (selectedWorkerIds.includes(employeeId)) {
      setSelectedWorkerIds((prev) => prev.filter((id) => id !== employeeId));
      setClashWarnings((prev) => {
        const updated = { ...prev };
        delete updated[employeeId];
        return updated;
      });
    } else {
      setSelectedWorkerIds((prev) => [...prev, employeeId]);

      const startDate = job.start_date || new Date().toISOString().split('T')[0];
      const clashes = await checkClashes.mutateAsync({
        employeeId,
        startDate,
        endDate: job.end_date || null,
        excludeJobId: job.id,
      });

      if (clashes.length > 0) {
        setClashWarnings((prev) => ({ ...prev, [employeeId]: clashes }));
      }
    }
  };

  const handleRemoveWorker = (employeeId: string) => {
    setSelectedWorkerIds((prev) => prev.filter((id) => id !== employeeId));
    setClashWarnings((prev) => {
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
        title: 'Workers assigned',
        description: `${selectedWorkerIds.length} worker(s) have been assigned to ${job.title}`,
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedWorkerIds([]);
        setClashWarnings({});
        setShowDetailsSheet(false);
        onOpenChange(false);
      }, 700);
    } catch (error) {
      console.error('Error assigning workers:', error);
      toast({
        title: 'Error',
        description: 'Failed to assign workers. Please try again.',
        variant: 'destructive',
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
      <SuccessCheckmark show={showSuccess} />
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
        >
          <div className="flex flex-col h-full bg-[hsl(0_0%_8%)]">
            <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>

            <div className="flex-shrink-0 border-b border-white/[0.06]">
              <div className="px-5 pb-3 pt-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <UserPlus className="h-3.5 w-3.5 text-elec-yellow" />
                      <Eyebrow>Assign workers</Eyebrow>
                    </div>
                    <h2 className="text-[20px] font-semibold text-white leading-tight truncate">
                      {job.title}
                    </h2>
                    <div className="flex items-center gap-3 mt-1 text-[12.5px] text-white">
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
                  <IconButton
                    aria-label="Close"
                    onClick={() => onOpenChange(false)}
                    className="shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </IconButton>
                </div>
              </div>

              <div className="px-5 pb-3">
                <div className="relative">
                  {!searchQuery && (
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                  )}
                  <input
                    placeholder="Search by name or role…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(inputClass, !searchQuery && 'pl-10')}
                  />
                  {searchQuery && (
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/[0.08]"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  )}
                </div>
              </div>

              <div className="px-5 pb-3">
                <WorkerFilterPills
                  filters={uniqueRoles}
                  selectedFilter={selectedFilter}
                  onFilterChange={setSelectedFilter}
                  workerCounts={workerCounts}
                />
              </div>
            </div>

            <div className="flex-1 overflow-hidden min-h-0">
              <ScrollArea className="h-full">
                <div className="p-5 space-y-2">
                  {loadingEmployees ? (
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="p-4 rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)]"
                        >
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
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="p-4 rounded-full bg-white/[0.04] mb-4">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-1">
                        {searchQuery || selectedFilter !== 'All'
                          ? 'No workers found'
                          : 'All workers assigned'}
                      </h3>
                      <p className="text-sm text-white max-w-[220px]">
                        {searchQuery
                          ? 'Try adjusting your search or filters'
                          : selectedFilter !== 'All'
                            ? `No ${selectedFilter}s available`
                            : 'Every team member is already on this job'}
                      </p>
                      {(searchQuery || selectedFilter !== 'All') && (
                        <SecondaryButton
                          size="sm"
                          className="mt-4"
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedFilter('All');
                          }}
                        >
                          Clear filters
                        </SecondaryButton>
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

            {selectedWorkerIds.length > 0 && (
              <div className="flex-shrink-0 border-t border-white/[0.06] p-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {selectedWorkers.slice(0, 4).map((worker, idx) => (
                        <Avatar
                          key={worker.id}
                          className="h-8 w-8 border-2 border-[hsl(0_0%_8%)]"
                          style={{ zIndex: 4 - idx }}
                        >
                          {worker.photo_url ? (
                            <AvatarImage src={worker.photo_url} alt={worker.name} />
                          ) : null}
                          <AvatarFallback className="text-xs bg-elec-yellow text-black">
                            {worker.avatar_initials}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {selectedWorkerIds.length > 4 && (
                        <div className="h-8 w-8 rounded-full bg-white/[0.08] border-2 border-[hsl(0_0%_8%)] flex items-center justify-center">
                          <span className="text-[11px] font-medium text-white">
                            +{selectedWorkerIds.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-white">
                      {selectedWorkerIds.length} selected
                    </span>
                  </div>
                  <button
                    onClick={handleClearSelection}
                    className="text-[12px] font-medium text-white hover:text-elec-yellow transition-colors"
                  >
                    Clear all
                  </button>
                </div>

                <PrimaryButton onClick={() => setShowDetailsSheet(true)} fullWidth size="lg">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Continue to assignment
                  <ChevronRight className="h-4 w-4 ml-2" />
                </PrimaryButton>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

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

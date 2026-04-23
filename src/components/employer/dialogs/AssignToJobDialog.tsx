import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEmployer, type Employee } from '@/contexts/EmployerContext';
import { useJobs } from '@/hooks/useJobs';
import { toast } from '@/hooks/use-toast';
import { Briefcase, MapPin, Check, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Field,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
  fieldLabelClass,
} from '@/components/employer/editorial';

interface AssignToJobDialogProps {
  employee: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignToJobDialog({ employee, open, onOpenChange }: AssignToJobDialogProps) {
  const isMobile = useIsMobile();
  const { assignEmployeeToJob } = useEmployer();
  const { data: jobs = [] } = useJobs();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  if (!employee) return null;

  const activeJobs = jobs.filter((j) => j.status === 'Active' || j.status === 'Pending');

  const filteredJobs = activeJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = () => {
    if (!selectedJobId) {
      toast({
        title: 'Select a Job',
        description: 'Please select a job to assign the employee to.',
        variant: 'destructive',
      });
      return;
    }

    const selectedJob = jobs.find((j) => j.id === selectedJobId);

    if (!selectedJob) return;

    assignEmployeeToJob(
      employee.id,
      selectedJob.id,
      selectedJob.title,
      selectedJob.location,
      startDate,
      notes || undefined
    );

    toast({
      title: 'Employee Assigned',
      description: `${employee.name} has been assigned to ${selectedJob.title}.`,
    });

    setSelectedJobId(null);
    setNotes('');
    setSearchQuery('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'bg-[hsl(0_0%_8%)] border-white/[0.08]',
          isMobile
            ? 'max-w-[95vw] h-[90vh] p-0 flex flex-col'
            : 'sm:max-w-lg max-h-[85vh] p-0 flex flex-col'
        )}
      >
        <div className="flex-shrink-0 p-4 pb-0">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Briefcase className="h-5 w-5 text-elec-yellow" />
              Assign to Job
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-3 p-3 bg-white/[0.04] border border-white/[0.08] rounded-xl mt-4">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center font-bold text-elec-yellow flex-shrink-0">
              {employee.avatar}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-white truncate">{employee.name}</p>
              <p className="text-[12.5px] text-white">{employee.role}</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 py-4">
            <div className="relative">
              {!searchQuery && (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
              )}
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(inputClass, !searchQuery && 'pl-10')}
              />
            </div>

            <div className="space-y-2">
              <label className={fieldLabelClass}>Select job</label>
              <div className="space-y-2">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => {
                    const isSelected = selectedJobId === job.id;
                    return (
                      <div
                        key={job.id}
                        onClick={() => setSelectedJobId(job.id)}
                        className={cn(
                          'cursor-pointer transition-all rounded-xl border p-3',
                          isSelected
                            ? 'border-elec-yellow/60 bg-elec-yellow/5 ring-1 ring-elec-yellow/40'
                            : 'border-white/[0.08] bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_12%)]'
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-[13px] text-white truncate">
                                {job.title}
                              </p>
                              {isSelected && (
                                <Check className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-[11.5px] text-white">{job.client}</p>
                            <p className="text-[11.5px] text-white flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-[11px] flex-shrink-0 border-white/[0.15] text-white',
                              job.status === 'Active' && 'border-emerald-500/40 text-emerald-400'
                            )}
                          >
                            {job.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-[11px] text-white">
                          <span>
                            {job.assignedWorkers}/{job.totalWorkers} assigned
                          </span>
                          <span>{job.progress}% complete</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <Briefcase className="h-8 w-8 text-white mx-auto mb-2" />
                    <p className="text-[12.5px] text-white">No jobs found</p>
                  </div>
                )}
              </div>
            </div>

            <Field label="Start date">
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Notes (optional)">
              <Textarea
                id="notes"
                placeholder="Add any notes about this assignment..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className={textareaClass}
              />
            </Field>
          </div>
        </ScrollArea>

        <div className="flex-shrink-0 p-4 pt-2 border-t border-white/[0.06]">
          <div className="flex gap-2">
            <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
              Cancel
            </SecondaryButton>
            <PrimaryButton onClick={handleAssign} disabled={!selectedJobId} fullWidth>
              Assign to Job
            </PrimaryButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

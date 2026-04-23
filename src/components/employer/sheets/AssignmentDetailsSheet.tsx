import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, Loader2, X, AlertTriangle, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Employee } from '@/services/employeeService';
import { JobAssignmentWithDetails } from '@/services/jobAssignmentService';
import { Job } from '@/services/jobService';
import {
  SheetShell,
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
  fieldLabelClass,
  checkboxClass,
} from '@/components/employer/editorial';

interface AssignmentDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedWorkers: Employee[];
  clashWarnings: Record<string, JobAssignmentWithDetails[]>;
  job: Job;
  onAssign: (details: AssignmentDetails) => Promise<void>;
  onRemoveWorker: (employeeId: string) => void;
  isSubmitting: boolean;
}

export interface AssignmentDetails {
  startDate: string;
  endDate: string;
  notes: string;
  sendEmail: boolean;
}

export function AssignmentDetailsSheet({
  open,
  onOpenChange,
  selectedWorkers,
  clashWarnings,
  job,
  onAssign,
  onRemoveWorker,
  isSubmitting,
}: AssignmentDetailsSheetProps) {
  const [startDate, setStartDate] = useState(
    job.start_date || new Date().toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(job.end_date || '');
  const [notes, setNotes] = useState('');
  const [sendEmail, setSendEmail] = useState(true);

  const hasClashes = Object.keys(clashWarnings).length > 0;

  const handleSubmit = async () => {
    await onAssign({
      startDate,
      endDate,
      notes,
      sendEmail,
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="Assignment"
          title="Assignment details"
          description="Configure dates and notification settings."
          footer={
            <>
              <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                Back
              </SecondaryButton>
              <PrimaryButton
                onClick={handleSubmit}
                disabled={isSubmitting || selectedWorkers.length === 0 || !startDate}
                fullWidth
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Assigning
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Assign {selectedWorkers.length} worker
                    {selectedWorkers.length > 1 ? 's' : ''}
                  </>
                )}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow={`Workers · ${selectedWorkers.length}`}>
            <div className="flex flex-wrap gap-2">
              {selectedWorkers.map((worker) => {
                const hasClash = clashWarnings[worker.id]?.length > 0;
                return (
                  <div
                    key={worker.id}
                    className={cn(
                      'flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border transition-all',
                      hasClash
                        ? 'bg-amber-400/10 border-amber-400/30'
                        : 'bg-white/[0.06] border-white/[0.08]'
                    )}
                  >
                    <Avatar className="h-6 w-6">
                      {worker.photo_url ? (
                        <AvatarImage src={worker.photo_url} alt={worker.name} />
                      ) : null}
                      <AvatarFallback className="text-xs bg-elec-yellow/10 text-elec-yellow">
                        {worker.avatar_initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[12.5px] font-medium text-white">
                      {worker.name.split(' ')[0]}
                    </span>
                    {hasClash && <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />}
                    <button
                      onClick={() => onRemoveWorker(worker.id)}
                      className="h-5 w-5 rounded-full hover:bg-white/[0.08] flex items-center justify-center"
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                );
              })}
            </div>
          </FormCard>

          {hasClashes && (
            <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
                <div>
                  <p className="font-medium text-amber-400 text-sm">Schedule conflicts detected</p>
                  <p className="text-xs text-white">
                    Some workers have overlapping job assignments
                  </p>
                </div>
              </div>
            </div>
          )}

          <FormCard eyebrow="Schedule">
            <FormGrid cols={2}>
              <Field label="Start date" required>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="End date" hint="Optional">
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Briefing notes">
            <Field label="Notes" hint="Optional — shared with assigned workers">
              <Textarea
                placeholder="Add any instructions or notes for the workers…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={cn(textareaClass, 'min-h-[100px]')}
              />
            </Field>
          </FormCard>

          <div
            className="flex items-center gap-3 p-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] cursor-pointer"
            onClick={() => setSendEmail(!sendEmail)}
          >
            <Checkbox
              checked={sendEmail}
              onCheckedChange={(checked) => setSendEmail(checked as boolean)}
              className={checkboxClass}
            />
            <div className="flex-1">
              <p className="font-medium text-white flex items-center gap-2">
                <Mail className="h-4 w-4 text-white" />
                Send email notification
              </p>
              <p className={fieldLabelClass + ' !mb-0 mt-0.5'}>
                Workers will receive job details and a calendar invite.
              </p>
            </div>
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

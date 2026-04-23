import { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Copy, Loader2 } from 'lucide-react';
import { useCreateJob } from '@/hooks/useJobs';
import { useJobChecklist, useAddChecklistItem } from '@/hooks/useJobChecklists';
import { useJobLabelAssignments, useAssignLabel } from '@/hooks/useJobLabels';
import { toast } from 'sonner';
import { Job } from '@/services/jobService';
import {
  SheetShell,
  FormCard,
  Field,
  PrimaryButton,
  SecondaryButton,
  SuccessCheckmark,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  checkboxClass,
  fieldLabelClass,
} from '@/components/employer/editorial';

interface CopyJobSheetProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const stages = [
  { id: 'Quoted', label: 'Quoted', status: 'Pending', progress: 0 },
  { id: 'Confirmed', label: 'Confirmed', status: 'On Hold', progress: 0 },
  { id: 'Scheduled', label: 'Scheduled', status: 'Active', progress: 0 },
  { id: 'In Progress', label: 'In Progress', status: 'Active', progress: 25 },
  { id: 'Testing', label: 'Testing', status: 'Active', progress: 90 },
  { id: 'Complete', label: 'Complete', status: 'Completed', progress: 100 },
];

export function CopyJobSheet({ job, open, onOpenChange }: CopyJobSheetProps) {
  const [title, setTitle] = useState('');
  const [targetStage, setTargetStage] = useState('Quoted');
  const [copyLabels, setCopyLabels] = useState(true);
  const [copyChecklist, setCopyChecklist] = useState(true);
  const [copyDescription, setCopyDescription] = useState(true);
  const [isCopying, setIsCopying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const createJob = useCreateJob();
  const { data: checklistItems = [] } = useJobChecklist(job?.id || '');
  const { data: labelAssignments = [] } = useJobLabelAssignments(job?.id || '');
  const addChecklistItem = useAddChecklistItem();
  const assignLabel = useAssignLabel();

  // Reset form when job changes
  useEffect(() => {
    if (job) {
      setTitle(`Copy of ${job.title}`);
      setTargetStage('Quoted');
    }
  }, [job]);

  const handleCopy = async () => {
    if (!job || !title.trim()) return;

    setIsCopying(true);
    const stage = stages.find((s) => s.id === targetStage) || stages[0];

    try {
      const newJob = await createJob.mutateAsync({
        title: title.trim(),
        client: job.client,
        location: job.location,
        lat: job.lat,
        lng: job.lng,
        status: stage.status as any,
        progress: stage.progress,
        value: job.value || 0,
        workers_count: 0,
        start_date: null,
        end_date: null,
        description: copyDescription ? job.description : null,
      });

      if (copyLabels && labelAssignments.length > 0) {
        for (const assignment of labelAssignments) {
          try {
            await assignLabel.mutateAsync({
              jobId: newJob.id,
              labelId: assignment.label_id,
            });
          } catch (e) {
            console.error('Failed to copy label:', e);
          }
        }
      }

      if (copyChecklist && checklistItems.length > 0) {
        for (const item of checklistItems) {
          try {
            await addChecklistItem.mutateAsync({
              jobId: newJob.id,
              title: item.title,
            });
          } catch (e) {
            console.error('Failed to copy checklist item:', e);
          }
        }
      }

      toast.success('Job copied successfully');
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
        setTitle('');
      }, 700);
    } catch (error) {
      toast.error('Failed to copy job');
    } finally {
      setIsCopying(false);
    }
  };

  if (!job) return null;

  return (
    <>
      <SuccessCheckmark show={showSuccess} />
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
        >
          <SheetShell
            eyebrow="Duplicate job"
            title="Copy job"
            description={`Create a new job based on ${job.title}.`}
            footer={
              <>
                <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  onClick={handleCopy}
                  disabled={!title.trim() || isCopying}
                  fullWidth
                >
                  {isCopying ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Copying
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy job
                    </>
                  )}
                </PrimaryButton>
              </>
            }
          >
            <FormCard eyebrow="New job">
              <Field label="New job title" required>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`Copy of ${job.title}`}
                  className={inputClass}
                />
              </Field>
              <Field label="Target stage">
                <Select value={targetStage} onValueChange={setTargetStage}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {stages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        {stage.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormCard>

            <FormCard eyebrow="Copy options">
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={copyDescription}
                  onCheckedChange={(checked) => setCopyDescription(checked as boolean)}
                  className={checkboxClass}
                />
                <span className={fieldLabelClass + ' !mb-0'}>Copy description</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={copyLabels}
                  onCheckedChange={(checked) => setCopyLabels(checked as boolean)}
                  className={checkboxClass}
                />
                <span className={fieldLabelClass + ' !mb-0'}>
                  Copy labels ({labelAssignments.length})
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={copyChecklist}
                  onCheckedChange={(checked) => setCopyChecklist(checked as boolean)}
                  className={checkboxClass}
                />
                <span className={fieldLabelClass + ' !mb-0'}>
                  Copy checklist items ({checklistItems.length})
                </span>
              </label>
            </FormCard>
          </SheetShell>
        </SheetContent>
      </Sheet>
    </>
  );
}

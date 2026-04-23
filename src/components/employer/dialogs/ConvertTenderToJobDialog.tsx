import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Briefcase, Loader2, Trophy } from 'lucide-react';
import { useCreateJob } from '@/hooks/useJobs';
import { useUpdateTender, type Tender } from '@/hooks/useTenders';
import { toast } from 'sonner';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  textareaClass,
} from '@/components/employer/editorial';

interface ConvertTenderToJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tender: Tender | null;
}

export function ConvertTenderToJobDialog({
  open,
  onOpenChange,
  tender,
}: ConvertTenderToJobDialogProps) {
  const createJobMutation = useCreateJob();
  const updateTenderMutation = useUpdateTender();

  const [formData, setFormData] = useState({
    title: '',
    client: '',
    location: '',
    value: 0,
    description: '',
    status: 'Pending' as const,
    workers_count: 1,
    start_date: '',
  });

  useEffect(() => {
    if (tender) {
      setFormData({
        title: tender.title,
        client: tender.client,
        location: '',
        value: tender.value || 0,
        description: tender.description || '',
        status: 'Pending',
        workers_count: 1,
        start_date: '',
      });
    }
  }, [tender]);

  const handleSubmit = async () => {
    if (!tender) return;

    try {
      await createJobMutation.mutateAsync({
        title: formData.title,
        client: formData.client,
        location: formData.location || 'TBC',
        lat: null,
        lng: null,
        status: formData.status,
        progress: 0,
        start_date: formData.start_date || null,
        end_date: null,
        value: formData.value,
        workers_count: formData.workers_count,
        description: formData.description || null,
      });

      await updateTenderMutation.mutateAsync({
        id: tender.id,
        data: {
          notes:
            `${tender.notes || ''}\n\n[Converted to job on ${new Date().toLocaleDateString('en-GB')}]`.trim(),
        },
      });

      toast.success('Job created from tender!', {
        description: `"${formData.title}" has been added to your jobs.`,
      });

      onOpenChange(false);
    } catch (error: any) {
      console.error('Error converting tender:', error);
      toast.error('Failed to create job', {
        description: error.message,
      });
    }
  };

  if (!tender) return null;

  const isSubmitting = createJobMutation.isPending || updateTenderMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Trophy className="h-5 w-5 text-emerald-400" />
            Convert Won Tender to Job
          </DialogTitle>
          <DialogDescription className="text-white">
            Create a new job from the won tender. Review and adjust the details below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Source Info */}
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
            <p className="text-[11px] text-emerald-300">Converting from tender:</p>
            <p className="font-medium text-emerald-400">{tender.title}</p>
            <p className="text-[12.5px] text-white">
              {tender.client} • £{Number(tender.value).toLocaleString()}
            </p>
          </div>

          <FormCard eyebrow="Job details">
            <Field label="Job title" required>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter job title"
                className={inputClass}
              />
            </Field>

            <Field label="Client" required>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="Client name"
                className={inputClass}
              />
            </Field>

            <Field label="Location">
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Site address"
                className={inputClass}
              />
            </Field>

            <FormGrid cols={2}>
              <Field label="Value (£)">
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  className={inputClass}
                />
              </Field>
              <Field label="Workers">
                <Input
                  id="workers"
                  type="number"
                  min={1}
                  value={formData.workers_count}
                  onChange={(e) =>
                    setFormData({ ...formData, workers_count: Number(e.target.value) })
                  }
                  className={inputClass}
                />
              </Field>
            </FormGrid>

            <FormGrid cols={2}>
              <Field label="Initial status">
                <Select
                  value={formData.status}
                  onValueChange={(value: 'Pending' | 'Active') =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Start date">
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className={inputClass}
                />
              </Field>
            </FormGrid>

            <Field label="Description">
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Job description and scope of works"
                rows={3}
                className={textareaClass}
              />
            </Field>
          </FormCard>
        </div>

        <DialogFooter className="gap-2">
          <SecondaryButton onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </SecondaryButton>
          <PrimaryButton
            onClick={handleSubmit}
            disabled={!formData.title || !formData.client || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Briefcase className="h-4 w-4 mr-2" />
                Create Job
              </>
            )}
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

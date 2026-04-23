import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateJob } from '@/hooks/useJobs';
import { toast } from '@/hooks/use-toast';
import { Briefcase, Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
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

const JOB_STATUSES = ['Active', 'Pending', 'On Hold'];

interface AddJobDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddJobDialog({ trigger, open: controlledOpen, onOpenChange }: AddJobDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const isMobile = useIsMobile();
  const createJob = useCreateJob();

  const [formData, setFormData] = useState({
    title: '',
    client: '',
    location: '',
    status: 'Active',
    value: '',
    startDate: '',
    endDate: '',
    workersCount: '1',
    description: '',
  });

  // Voice form registration
  const voiceContext = useOptionalVoiceFormContext();

  useEffect(() => {
    if (!open || !voiceContext) return;

    voiceContext.registerForm({
      formId: 'create-job',
      formName: 'Create Job',
      fields: [
        { name: 'title', label: 'Job Title', type: 'text', required: true },
        { name: 'client', label: 'Client', type: 'text', required: true },
        { name: 'location', label: 'Location', type: 'text', required: true },
        { name: 'status', label: 'Status', type: 'text' },
        { name: 'value', label: 'Job Value', type: 'text' },
        { name: 'startDate', label: 'Start Date', type: 'text' },
        { name: 'endDate', label: 'End Date', type: 'text' },
        { name: 'workersCount', label: 'Workers Required', type: 'text' },
        { name: 'description', label: 'Description', type: 'text' },
      ],
      onFillField: (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
      },
      onSubmit: () => {
        const form = document.getElementById('job-form') as HTMLFormElement;
        if (form) form.requestSubmit();
      },
      onCancel: () => setOpen(false),
    });

    return () => voiceContext.unregisterForm('create-job');
  }, [open, voiceContext]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.client || !formData.location) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in job title, client and location.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createJob.mutateAsync({
        title: formData.title,
        client: formData.client,
        location: formData.location,
        status: formData.status as 'Active' | 'Pending' | 'Completed' | 'On Hold' | 'Cancelled',
        value: formData.value ? parseFloat(formData.value) : 0,
        start_date: formData.startDate || null,
        end_date: formData.endDate || null,
        workers_count: parseInt(formData.workersCount) || 1,
        description: formData.description || null,
        progress: 0,
        lat: null,
        lng: null,
      });

      toast({
        title: 'Job Created',
        description: `${formData.title} has been created successfully.`,
      });

      setFormData({
        title: '',
        client: '',
        location: '',
        status: 'Active',
        value: '',
        startDate: '',
        endDate: '',
        workersCount: '1',
        description: '',
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create job. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const formContent = (
    <form id="job-form" onSubmit={handleSubmit} className="space-y-4 pt-2">
      <FormCard eyebrow="Job details">
        <Field label="Job title" required>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="e.g. Commercial Rewiring"
            className={inputClass}
          />
        </Field>
        <FormGrid cols={2}>
          <Field label="Client" required>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => setFormData((prev) => ({ ...prev, client: e.target.value }))}
              placeholder="e.g. Tesco Express"
              className={inputClass}
            />
          </Field>
          <Field label="Location" required>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="e.g. Manchester, M1 4BD"
              className={inputClass}
            />
          </Field>
        </FormGrid>
      </FormCard>

      <FormCard eyebrow="Financial & status">
        <FormGrid cols={2}>
          <Field label="Job value (£)">
            <Input
              id="value"
              type="number"
              value={formData.value}
              onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
              placeholder="50000"
              className={inputClass}
            />
          </Field>
          <Field label="Status">
            <Select
              value={formData.status}
              onValueChange={(val) => setFormData((prev) => ({ ...prev, status: val }))}
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {JOB_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FormGrid>
      </FormCard>

      <FormCard eyebrow="Schedule">
        <FormGrid cols={2}>
          <Field label="Start date">
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
              className={inputClass}
            />
          </Field>
          <Field label="End date">
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
              className={inputClass}
            />
          </Field>
        </FormGrid>
      </FormCard>

      <FormCard eyebrow="Team & scope">
        <Field label="Workers required">
          <Input
            id="workers"
            type="number"
            min="1"
            value={formData.workersCount}
            onChange={(e) => setFormData((prev) => ({ ...prev, workersCount: e.target.value }))}
            className={inputClass}
          />
        </Field>
        <Field label="Description">
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the scope of work..."
            rows={4}
            className={textareaClass}
          />
        </Field>
      </FormCard>

      <div className="flex gap-3 pt-2">
        <SecondaryButton onClick={() => setOpen(false)} fullWidth>
          Cancel
        </SecondaryButton>
        <PrimaryButton type="submit" disabled={createJob.isPending} fullWidth>
          {createJob.isPending ? 'Creating...' : 'Create Job'}
        </PrimaryButton>
      </div>
    </form>
  );

  const header = (
    <div className="flex items-center gap-3 text-white">
      <div className="p-2 rounded-lg bg-elec-yellow/10">
        <Briefcase className="h-5 w-5 text-elec-yellow" />
      </div>
      Create New Job
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        {trigger !== null && (
          <DrawerTrigger asChild>
            {trigger || (
              <Button className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Job
              </Button>
            )}
          </DrawerTrigger>
        )}
        <DrawerContent className="max-h-[90vh] bg-[hsl(0_0%_8%)] border-white/[0.08]">
          <DrawerHeader className="pb-4 border-b border-white/[0.06]">
            <DrawerTitle>{header}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 overflow-y-auto">{formContent}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger !== null && (
        <DialogTrigger asChild>
          {trigger || (
            <Button className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              New Job
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <DialogHeader className="pb-4 border-b border-white/[0.06]">
          <DialogTitle>{header}</DialogTitle>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}

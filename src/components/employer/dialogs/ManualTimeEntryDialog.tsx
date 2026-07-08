import { useState, useEffect, type ReactNode, type FormEvent } from 'react';
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
} from '@/components/ui/responsive-form-modal';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Clock, Plus, Loader2 } from 'lucide-react';
import { useEmployees } from '@/hooks/useEmployees';
import { useActiveJobs } from '@/hooks/useJobs';
import { useCreateTimesheet } from '@/hooks/useTimesheets';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
import {
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';

interface ManualTimeEntryDialogProps {
  trigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ManualTimeEntryDialog({
  trigger,
  open: controlledOpen,
  onOpenChange,
}: ManualTimeEntryDialogProps) {
  const { data: employees = [] } = useEmployees();
  const { data: jobs = [] } = useActiveJobs();
  const createTimesheet = useCreateTimesheet();

  const [internalOpen, setInternalOpen] = useState(false);

  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [formData, setFormData] = useState({
    employeeId: '',
    jobId: '',
    date: new Date().toISOString().split('T')[0],
    clockIn: '08:00',
    clockOut: '17:00',
    breakMins: '60',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !formData.employeeId ||
      !formData.jobId ||
      !formData.date ||
      !formData.clockIn ||
      !formData.clockOut
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const [inHours, inMins] = formData.clockIn.split(':').map(Number);
    const [outHours, outMins] = formData.clockOut.split(':').map(Number);
    const totalMinutes =
      outHours * 60 + outMins - (inHours * 60 + inMins) - parseInt(formData.breakMins);
    const totalHours = Math.round((totalMinutes / 60) * 100) / 100;

    if (totalHours <= 0) {
      toast.error('Clock out time must be after clock in time.');
      return;
    }

    const clockInISO = `${formData.date}T${formData.clockIn}:00`;
    const clockOutISO = `${formData.date}T${formData.clockOut}:00`;

    try {
      await createTimesheet.mutateAsync({
        employee_id: formData.employeeId,
        job_id: formData.jobId,
        date: formData.date,
        clock_in: clockInISO,
        clock_out: clockOutISO,
        break_minutes: parseInt(formData.breakMins),
        total_hours: totalHours,
        status: 'Pending',
        notes: null,
        approved_by: null,
        approved_at: null,
      });

      const employee = employees.find((e) => e.id === formData.employeeId);
      toast.success(`${totalHours} hours logged for ${employee?.name || 'employee'}.`);

      setFormData({
        employeeId: '',
        jobId: '',
        date: new Date().toISOString().split('T')[0],
        clockIn: '08:00',
        clockOut: '17:00',
        breakMins: '60',
      });
      setOpen(false);
    } catch (error) {
      toast.error('Failed to add time entry');
    }
  };

  const activeJobs = jobs.filter((j) => j.status === 'Active');
  const activeEmployees = employees.filter((e) => e.status === 'Active');

  const voiceContext = useOptionalVoiceFormContext();

  useEffect(() => {
    if (!open || !voiceContext) return;

    voiceContext.registerForm({
      formId: 'manual-time-entry',
      formName: 'Manual Time Entry',
      fields: [
        { name: 'employee', label: 'Employee', type: 'text', required: true },
        { name: 'job', label: 'Job', type: 'text', required: true },
        { name: 'date', label: 'Date', type: 'text', required: true },
        { name: 'clockIn', label: 'Clock In Time', type: 'text', required: true },
        { name: 'clockOut', label: 'Clock Out Time', type: 'text', required: true },
        { name: 'breakMins', label: 'Break Minutes', type: 'text' },
      ],
      onFillField: (field, value) => {
        switch (field) {
          case 'employee':
            const emp = activeEmployees.find((e) =>
              e.name.toLowerCase().includes(value.toLowerCase())
            );
            if (emp) setFormData((prev) => ({ ...prev, employeeId: emp.id }));
            break;
          case 'job':
            const job = activeJobs.find((j) => j.title.toLowerCase().includes(value.toLowerCase()));
            if (job) setFormData((prev) => ({ ...prev, jobId: job.id }));
            break;
          case 'date':
            setFormData((prev) => ({ ...prev, date: value }));
            break;
          case 'clockIn':
            setFormData((prev) => ({ ...prev, clockIn: value }));
            break;
          case 'clockOut':
            setFormData((prev) => ({ ...prev, clockOut: value }));
            break;
          case 'breakMins':
            setFormData((prev) => ({ ...prev, breakMins: value }));
            break;
        }
      },
      onSubmit: () => {
        const form = document.getElementById('time-entry-form') as HTMLFormElement;
        if (form) form.requestSubmit();
      },
      onCancel: () => setOpen(false),
    });

    return () => voiceContext.unregisterForm('manual-time-entry');
  }, [open, voiceContext, activeEmployees, activeJobs]);

  return (
    // Drawer (bottom sheet) on mobile, centred dialog on desktop — a
    // multi-field form in a centred modal broke the native-app mandate
    <ResponsiveFormModal
      open={open}
      onOpenChange={setOpen}
      trigger={
        trigger !== null
          ? trigger || (
              <SecondaryButton size="sm">
                <Plus className="h-4 w-4 mr-1.5" />
                Add entry
              </SecondaryButton>
            )
          : undefined
      }
    >
      <ResponsiveFormModalContent className="sm:max-w-md">
        <ResponsiveFormModalHeader>
          <ResponsiveFormModalTitle className="flex items-center gap-2 text-white">
            <Clock className="h-5 w-5 text-elec-yellow" />
            Add manual time entry
          </ResponsiveFormModalTitle>
        </ResponsiveFormModalHeader>
        <ResponsiveFormModalBody>
          <form id="time-entry-form" onSubmit={handleSubmit} className="space-y-4">
          <FormCard eyebrow="Entry">
            <Field label="Employee" required>
              <Select
                value={formData.employeeId}
                onValueChange={(val) => setFormData((prev) => ({ ...prev, employeeId: val }))}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select employee..." />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {activeEmployees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Job" required>
              <Select
                value={formData.jobId}
                onValueChange={(val) => setFormData((prev) => ({ ...prev, jobId: val }))}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select job..." />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {activeJobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Date" required>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                className={inputClass}
              />
            </Field>
            <FormGrid cols={3}>
              <Field label="Clock in" required>
                <Input
                  type="time"
                  value={formData.clockIn}
                  onChange={(e) => setFormData((prev) => ({ ...prev, clockIn: e.target.value }))}
                  className={inputClass}
                />
              </Field>
              <Field label="Clock out" required>
                <Input
                  type="time"
                  value={formData.clockOut}
                  onChange={(e) => setFormData((prev) => ({ ...prev, clockOut: e.target.value }))}
                  className={inputClass}
                />
              </Field>
              <Field label="Break (mins)">
                <Select
                  value={formData.breakMins}
                  onValueChange={(val) => setFormData((prev) => ({ ...prev, breakMins: val }))}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="45">45</SelectItem>
                    <SelectItem value="60">60</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>
          </FormCard>

          <div className="flex gap-2 pt-1">
            <SecondaryButton onClick={() => setOpen(false)} fullWidth>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={createTimesheet.isPending} fullWidth>
              {createTimesheet.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add entry'
              )}
            </PrimaryButton>
          </div>
          </form>
        </ResponsiveFormModalBody>
      </ResponsiveFormModalContent>
    </ResponsiveFormModal>
  );
}

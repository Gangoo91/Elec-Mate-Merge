import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOnQuiet as chipOn,
  inputCn,
  labelCn,
  selectTriggerCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { useCreateEPA } from '@/hooks/college/useCollegeEPA';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { SuccessCheckmark } from '@/components/college/primitives';
import type { EPAStatus } from '@/services/college';

const STATUSES: { value: EPAStatus; label: string }[] = [
  { value: 'Not Started', label: 'Not started' },
  { value: 'In Progress', label: 'In progress' },
  { value: 'Pre-Gateway', label: 'Pre-gateway' },
  { value: 'Gateway Ready', label: 'Gateway ready' },
  { value: 'Complete', label: 'Complete' },
];

interface AddEPARecordSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddEPARecordSheet({ open, onOpenChange }: AddEPARecordSheetProps) {
  const { data: students, isLoading: studentsLoading } = useCollegeStudents();
  const createEPA = useCreateEPA();
  const { toast } = useToast();
  const { triggerSuccess } = useHapticFeedback();

  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [status, setStatus] = useState<EPAStatus>('Not Started');
  const [gatewayDate, setGatewayDate] = useState('');
  const [epaDate, setEpaDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const resetForm = useCallback(() => {
    setSelectedStudentId('');
    setStatus('Not Started');
    setGatewayDate('');
    setEpaDate('');
    setNotes('');
    setShowSuccess(false);
  }, []);

  const handleOpenChange = useCallback(
    (value: boolean) => {
      if (!value) {
        resetForm();
      }
      onOpenChange(value);
    },
    [onOpenChange, resetForm]
  );

  const handleCreate = async () => {
    if (!selectedStudentId) {
      toast({
        title: 'Student required',
        description: 'Please select a student for this EPA record.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createEPA.mutateAsync({
        student_id: selectedStudentId,
        status,
        gateway_date: gatewayDate || null,
        epa_date: epaDate || null,
        notes: notes || null,
        result: null,
        updated_by: null,
      });

      triggerSuccess();
      setShowSuccess(true);

      const studentName = students?.find((s) => s.id === selectedStudentId)?.name ?? 'student';

      toast({
        title: 'EPA record created',
        description: `EPA record for ${studentName} has been created successfully.`,
      });

      setTimeout(() => {
        setShowSuccess(false);
        handleOpenChange(false);
      }, 700);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to create EPA record. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sortedStudents = (students ?? [])
    .filter((s) => s.status === 'Active')
    .sort((a, b) => a.name.localeCompare(b.name));

  const studentOptions = sortedStudents.map((s) => ({ value: s.id, label: s.name }));

  return (
    <FormSheet
      open={open}
      onOpenChange={handleOpenChange}
      width="wide"
      eyebrow="End Point Assessment"
      title="Add EPA record"
      description="Create a new End Point Assessment record for an active learner."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-5 lg:grid-cols-2"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            disabled={isSubmitting}
            className={buttonSecondaryCn}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreate}
            disabled={isSubmitting || !selectedStudentId}
            className={buttonPrimaryCn}
          >
            {isSubmitting ? 'Creating…' : 'Create record'}
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <p className={labelCn}>Student</p>
          <div>
            <MobileSelectPicker
              value={selectedStudentId}
              onValueChange={setSelectedStudentId}
              options={studentOptions}
              title="Select a student"
              placeholder={
                studentsLoading
                  ? 'Loading students…'
                  : studentOptions.length === 0
                    ? 'No active students found'
                    : 'Select a student'
              }
              triggerClassName={selectTriggerCn}
              disabled={studentsLoading || studentOptions.length === 0}
            />
          </div>
        </div>

        <div>
          <p className={labelCn}>Initial status</p>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {STATUSES.map((s) => (
              <button
                key={s.value}
                type="button"
                aria-pressed={status === s.value}
                onClick={() => setStatus(s.value)}
                className={cn(chipBase, status === s.value ? chipOn : chipOff)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-6">
          <div>
            <label className={labelCn} htmlFor="epa-add-gateway">
              Gateway date (optional)
            </label>
            <input
              id="epa-add-gateway"
              type="date"
              value={gatewayDate}
              onChange={(e) => setGatewayDate(e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="epa-add-date">
              EPA date (optional)
            </label>
            <input
              id="epa-add-date"
              type="date"
              value={epaDate}
              onChange={(e) => setEpaDate(e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
      </div>

      <div>
        <label className={labelCn} htmlFor="epa-add-notes">
          Notes
        </label>
        <textarea
          id="epa-add-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any initial notes about this EPA record…"
          className={cn(textareaCn, 'min-h-[160px]')}
        />
      </div>
      <SuccessCheckmark show={showSuccess} />
    </FormSheet>
  );
}

import { useState, useCallback } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateEPA } from '@/hooks/college/useCollegeEPA';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
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
  textareaClass,
} from '@/components/college/primitives';
import type { EPAStatus } from '@/services/college';

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

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="End Point Assessment"
          title="Add EPA record"
          description="Create a new End Point Assessment record"
          footer={
            <>
              <SecondaryButton
                fullWidth
                onClick={() => handleOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={handleCreate}
                disabled={isSubmitting || !selectedStudentId}
              >
                {isSubmitting ? 'Creating…' : 'Create Record →'}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Student">
            <Select
              value={selectedStudentId}
              onValueChange={setSelectedStudentId}
              disabled={studentsLoading}
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent className={`${selectContentClass} max-h-[280px]`}>
                {sortedStudents.map((student) => (
                  <SelectItem
                    key={student.id}
                    value={student.id}
                    className="h-11 touch-manipulation"
                  >
                    {student.name}
                  </SelectItem>
                ))}
                {sortedStudents.length === 0 && (
                  <div className="p-4 text-center text-[13px] text-white">
                    No active students found
                  </div>
                )}
              </SelectContent>
            </Select>
          </FormCard>

          <FormCard eyebrow="Initial Status">
            <Select value={status} onValueChange={(val) => setStatus(val as EPAStatus)}>
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                <SelectItem value="Not Started" className="h-11 touch-manipulation">
                  Not Started
                </SelectItem>
                <SelectItem value="In Progress" className="h-11 touch-manipulation">
                  In Progress
                </SelectItem>
                <SelectItem value="Pre-Gateway" className="h-11 touch-manipulation">
                  Pre-Gateway
                </SelectItem>
                <SelectItem value="Gateway Ready" className="h-11 touch-manipulation">
                  Gateway Ready
                </SelectItem>
                <SelectItem value="Complete" className="h-11 touch-manipulation">
                  Complete
                </SelectItem>
              </SelectContent>
            </Select>
          </FormCard>

          <FormCard eyebrow="Dates (Optional)">
            <Field label="Gateway Date">
              <input
                type="date"
                value={gatewayDate}
                onChange={(e) => setGatewayDate(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="EPA Date">
              <input
                type="date"
                value={epaDate}
                onChange={(e) => setEpaDate(e.target.value)}
                className={inputClass}
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any initial notes about this EPA record..."
              className={`${textareaClass} min-h-[120px]`}
            />
          </FormCard>
        </SheetShell>
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}

import { useState, useMemo } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateILP } from '@/hooks/college/useCollegeILP';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { useToast } from '@/hooks/use-toast';
import {
  SheetShell,
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  SuccessCheckmark,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/college/primitives';
import type { ILPTarget } from '@/services/college';

interface CreateILPSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TargetStatus = ILPTarget['status'];

interface NewTarget {
  description: string;
  target_date: string;
}

export function CreateILPSheet({ open, onOpenChange }: CreateILPSheetProps) {
  const { data: students = [] } = useCollegeStudents();
  const { data: staffList = [] } = useCollegeStaff();
  const createILP = useCreateILP();
  const { toast } = useToast();
  const { triggerSuccess } = useHapticFeedback();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [targets, setTargets] = useState<NewTarget[]>([{ description: '', target_date: '' }]);
  const [supportNeeds, setSupportNeeds] = useState('');
  const [reviewDate, setReviewDate] = useState('');
  const [reviewerId, setReviewerId] = useState('');

  const activeStudents = useMemo(() => {
    return students.filter((s) => s.status === 'Active');
  }, [students]);

  const tutors = useMemo(() => {
    return staffList.filter((s) => s.role === 'tutor');
  }, [staffList]);

  const handleTargetChange = (index: number, field: keyof NewTarget, value: string) => {
    setTargets((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddTarget = () => {
    setTargets((prev) => [...prev, { description: '', target_date: '' }]);
  };

  const handleRemoveTarget = (index: number) => {
    setTargets((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setStudentId('');
    setTargets([{ description: '', target_date: '' }]);
    setSupportNeeds('');
    setReviewDate('');
    setReviewerId('');
  };

  const handleSubmit = async () => {
    if (!studentId) return;
    setIsSubmitting(true);

    try {
      const validTargets: ILPTarget[] = targets
        .filter((t) => t.description.trim() && t.target_date)
        .map((t) => ({
          description: t.description.trim(),
          target_date: t.target_date,
          status: 'Pending' as TargetStatus,
        }));

      await createILP.mutateAsync({
        student_id: studentId,
        targets: validTargets.length > 0 ? validTargets : null,
        support_needs: supportNeeds.trim() || null,
        review_date: reviewDate || null,
        last_reviewed: null,
        reviewed_by: reviewerId || null,
        status: 'Active',
      });

      const selectedStudent = students.find((s) => s.id === studentId);

      setShowSuccess(true);
      triggerSuccess(true);

      toast({
        title: 'ILP Created',
        description: `Individual Learning Plan for ${selectedStudent?.name ?? 'student'} has been created successfully.`,
      });

      setTimeout(() => {
        setShowSuccess(false);
        resetForm();
        onOpenChange(false);
      }, 700);
    } catch (error) {
      console.error('Failed to create ILP:', error);
      toast({
        title: 'Creation Failed',
        description: 'There was an error creating the ILP. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasValidTarget = targets.some((t) => t.description.trim() && t.target_date);
  const canSubmit = !isSubmitting && !!studentId && hasValidTarget;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="Individual Learning Plan"
          title="Create new ILP"
          description="Set up an Individual Learning Plan for a student"
          footer={
            <>
              <SecondaryButton
                fullWidth
                onClick={() => {
                  resetForm();
                  onOpenChange(false);
                }}
                disabled={isSubmitting}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton fullWidth onClick={handleSubmit} disabled={!canSubmit}>
                {isSubmitting ? 'Creating…' : 'Create ILP →'}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Student">
            <Select value={studentId} onValueChange={setStudentId}>
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Choose a student" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {activeStudents.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormCard>

          <FormCard eyebrow="Initial Targets">
            {targets.map((target, index) => (
              <div
                key={index}
                className="rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.08] p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                    <span className="text-[13px] font-medium text-white">Target {index + 1}</span>
                  </div>
                  {targets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTarget(index)}
                      className="h-8 w-8 rounded-full flex items-center justify-center text-white hover:text-red-400 hover:bg-red-500/10 touch-manipulation transition-colors"
                      aria-label="Remove target"
                    >
                      ×
                    </button>
                  )}
                </div>

                <Field label="Description" required>
                  <textarea
                    value={target.description}
                    onChange={(e) => handleTargetChange(index, 'description', e.target.value)}
                    placeholder="Describe the learning target…"
                    className={`${textareaClass} min-h-[80px]`}
                  />
                </Field>

                <Field label="Due Date" required>
                  <input
                    type="date"
                    value={target.target_date}
                    onChange={(e) => handleTargetChange(index, 'target_date', e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddTarget}
              className="w-full h-11 text-[12.5px] font-medium text-white hover:text-elec-yellow border border-dashed border-white/[0.12] hover:border-elec-yellow/40 rounded-xl touch-manipulation transition-colors"
            >
              + Add Another Target
            </button>
          </FormCard>

          <FormCard eyebrow="Support Needs">
            <textarea
              value={supportNeeds}
              onChange={(e) => setSupportNeeds(e.target.value)}
              placeholder="Enter support needs, separated by commas (e.g. Dyslexia support, Extra time in assessments, Hearing loop)"
              className={`${textareaClass} min-h-[100px]`}
            />
            <p className="text-[11px] text-white">Separate multiple needs with commas</p>
          </FormCard>

          <FormCard eyebrow="Review Schedule">
            <FormGrid cols={2}>
              <Field label="First Review Date">
                <input
                  type="date"
                  value={reviewDate}
                  onChange={(e) => setReviewDate(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Assigned Reviewer">
                <Select value={reviewerId} onValueChange={setReviewerId}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select tutor" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {tutors.map((tutor) => (
                      <SelectItem key={tutor.id} value={tutor.id}>
                        {tutor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>
          </FormCard>
        </SheetShell>
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}

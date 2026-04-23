import { useState, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
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
import { useHapticFeedback, SuccessCheckmark } from '@/components/college/ui/HapticFeedback';
import { useToast } from '@/hooks/use-toast';
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

const inputClass =
  'h-11 w-full px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation';

const textareaClass =
  'w-full px-4 py-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation resize-none';

const selectTriggerClass =
  'h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-elec-yellow/60 touch-manipulation data-[state=open]:border-elec-yellow/60';

const selectContentClass =
  'z-[100] max-w-[calc(100vw-2rem)] bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white';

const eyebrow = 'text-[10px] font-medium uppercase tracking-[0.16em] text-white/55';

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
      }, 1200);
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
  const canSubmit = !isSubmitting && studentId && hasValidTarget;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)]">
        <div className="flex flex-col h-full">
          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <SheetHeader className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
            <div className={eyebrow}>Individual Learning Plan</div>
            <SheetTitle className="text-[20px] font-semibold text-white mt-1 text-left">
              Create new ILP
            </SheetTitle>
            <p className="text-[12.5px] text-white/55 mt-1 text-left">
              Set up an Individual Learning Plan for a student
            </p>
          </SheetHeader>

          {/* Scrollable Form */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
            {/* Student Selection */}
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Student</div>
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
            </div>

            {/* Initial Targets */}
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Initial Targets</div>

              {targets.map((target, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06] p-4 space-y-3"
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
                        className="h-8 w-8 rounded-full flex items-center justify-center text-white/75 hover:text-red-400 hover:bg-red-500/10 touch-manipulation transition-colors"
                        aria-label="Remove target"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[11.5px] text-white/60">Description *</div>
                    <textarea
                      value={target.description}
                      onChange={(e) => handleTargetChange(index, 'description', e.target.value)}
                      placeholder="Describe the learning target…"
                      className={`${textareaClass} min-h-[80px]`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[11.5px] text-white/60">Due Date *</div>
                    <input
                      type="date"
                      value={target.target_date}
                      onChange={(e) => handleTargetChange(index, 'target_date', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddTarget}
                className="w-full h-11 text-[12.5px] font-medium text-white/70 hover:text-elec-yellow border border-dashed border-white/[0.12] hover:border-elec-yellow/40 rounded-xl touch-manipulation transition-colors"
              >
                + Add Another Target
              </button>
            </div>

            {/* Support Needs */}
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Support Needs</div>
              <textarea
                value={supportNeeds}
                onChange={(e) => setSupportNeeds(e.target.value)}
                placeholder="Enter support needs, separated by commas (e.g. Dyslexia support, Extra time in assessments, Hearing loop)"
                className={`${textareaClass} min-h-[100px]`}
              />
              <p className="text-[11px] text-white/70">Separate multiple needs with commas</p>
            </div>

            {/* Review Schedule */}
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Review Schedule</div>

              <div className="space-y-1.5">
                <div className="text-[11.5px] text-white/60">First Review Date</div>
                <input
                  type="date"
                  value={reviewDate}
                  onChange={(e) => setReviewDate(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <div className="text-[11.5px] text-white/60">Assigned Reviewer</div>
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
              </div>
            </div>
          </div>

          {/* Footer */}
          <SheetFooter className="flex-shrink-0 border-t border-white/[0.06] p-4 flex-row gap-2">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
              disabled={isSubmitting}
              className="flex-1 h-11 text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation border border-white/[0.08] rounded-full"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="flex-1 h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
            >
              {isSubmitting ? 'Creating…' : 'Create ILP →'}
            </button>
          </SheetFooter>
        </div>

        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}

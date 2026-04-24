import { useState, useEffect, useMemo } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCollegeILP, useUpdateILP } from '@/hooks/college/useCollegeILP';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useToast } from '@/hooks/use-toast';
import {
  SheetShell,
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  LoadingState,
  SuccessCheckmark,
  EmptyState,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/college/primitives';
import type { ILPTarget } from '@/services/college';

interface ILPTargetsSheetProps {
  ilpId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TargetStatus = ILPTarget['status'];

interface EditableTarget {
  description: string;
  target_date: string;
  status: TargetStatus;
}

const statusOptions: TargetStatus[] = ['Pending', 'In Progress', 'Achieved', 'Overdue'];

export function ILPTargetsSheet({ ilpId, open, onOpenChange }: ILPTargetsSheetProps) {
  const { data: ilp, isLoading } = useCollegeILP(ilpId!);
  const { data: students = [] } = useCollegeStudents();
  const updateILP = useUpdateILP();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [targets, setTargets] = useState<EditableTarget[]>([]);

  const student = useMemo(() => {
    if (!ilp?.student_id) return null;
    return students.find((s) => s.id === ilp.student_id) ?? null;
  }, [ilp, students]);

  useEffect(() => {
    if (ilp) {
      const existingTargets = ilp.targets ?? [];
      setTargets(
        existingTargets.map((t) => ({
          description: t.description,
          target_date: t.target_date,
          status: t.status,
        }))
      );
    }
  }, [ilp]);

  const handleTargetChange = (index: number, field: keyof EditableTarget, value: string) => {
    setTargets((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddTarget = () => {
    setTargets((prev) => [
      ...prev,
      { description: '', target_date: '', status: 'Pending' as TargetStatus },
    ]);
  };

  const handleRemoveTarget = (index: number) => {
    setTargets((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!ilpId) return;
    setIsSubmitting(true);

    try {
      const validTargets = targets.filter((t) => t.description.trim() && t.target_date);

      await updateILP.mutateAsync({
        id: ilpId,
        updates: {
          targets: validTargets as ILPTarget[],
        },
      });

      setShowSuccess(true);
      toast({
        title: 'Targets Updated',
        description: `Targets for ${student?.name ?? 'student'} have been updated successfully.`,
      });

      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
      }, 700);
    } catch (error) {
      console.error('Failed to update targets:', error);
      toast({
        title: 'Update Failed',
        description: 'There was an error updating the targets. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!ilpId) return null;

  const hasValidTargets = targets.some((t) => t.description.trim() && t.target_date);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="ILP Targets"
          title="Edit targets"
          description={student?.name ?? 'Loading…'}
          footer={
            <>
              <SecondaryButton
                fullWidth
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={handleSubmit}
                disabled={isSubmitting || !hasValidTargets}
              >
                {isSubmitting ? 'Saving…' : 'Save Targets →'}
              </PrimaryButton>
            </>
          }
        >
          {isLoading ? (
            <LoadingState />
          ) : (
            <>
              {targets.map((target, index) => (
                <FormCard key={index}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                      <span className="text-[13px] font-medium text-white">
                        Target {index + 1}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveTarget(index)}
                      className="h-8 w-8 rounded-full flex items-center justify-center text-white hover:text-red-400 hover:bg-red-500/10 touch-manipulation transition-colors"
                      aria-label="Remove target"
                    >
                      ×
                    </button>
                  </div>

                  <Field label="Description" required>
                    <textarea
                      value={target.description}
                      onChange={(e) =>
                        handleTargetChange(index, 'description', e.target.value)
                      }
                      placeholder="Describe the target…"
                      className={`${textareaClass} min-h-[80px]`}
                    />
                  </Field>

                  <FormGrid cols={2}>
                    <Field label="Due Date" required>
                      <input
                        type="date"
                        value={target.target_date}
                        onChange={(e) =>
                          handleTargetChange(index, 'target_date', e.target.value)
                        }
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Status">
                      <Select
                        value={target.status}
                        onValueChange={(value) => handleTargetChange(index, 'status', value)}
                      >
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className={selectContentClass}>
                          {statusOptions.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </FormGrid>
                </FormCard>
              ))}

              {targets.length === 0 && (
                <EmptyState title="No targets yet. Add one below." />
              )}

              <button
                type="button"
                onClick={handleAddTarget}
                className="w-full h-11 text-[12.5px] font-medium text-white hover:text-elec-yellow border border-dashed border-white/[0.12] hover:border-elec-yellow/40 rounded-xl touch-manipulation transition-colors"
              >
                + Add New Target
              </button>
            </>
          )}
        </SheetShell>
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}

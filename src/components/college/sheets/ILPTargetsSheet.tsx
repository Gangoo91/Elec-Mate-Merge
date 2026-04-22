import { useState, useEffect, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
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
import { LoadingState } from '@/components/college/primitives';
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

const inputClass =
  'h-11 w-full px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 touch-manipulation';

const textareaClass =
  'w-full px-4 py-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 touch-manipulation min-h-[80px] resize-none';

const selectTriggerClass =
  'h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-elec-yellow/60 touch-manipulation data-[state=open]:border-elec-yellow/60';

const selectContentClass =
  'z-[100] max-w-[calc(100vw-2rem)] bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white';

const eyebrow = 'text-[10px] font-medium uppercase tracking-[0.16em] text-white/40';

export function ILPTargetsSheet({ ilpId, open, onOpenChange }: ILPTargetsSheetProps) {
  const { data: ilp, isLoading } = useCollegeILP(ilpId!);
  const { data: students = [] } = useCollegeStudents();
  const updateILP = useUpdateILP();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
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

      toast({
        title: 'Targets Updated',
        description: `Targets for ${student?.name ?? 'student'} have been updated successfully.`,
      });

      onOpenChange(false);
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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)]">
        <div className="flex flex-col h-full">
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <SheetHeader className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
            <div className={eyebrow}>ILP Targets</div>
            <SheetTitle className="text-[20px] font-semibold text-white mt-1 text-left">
              Edit targets
            </SheetTitle>
            <p className="text-[12.5px] text-white/55 mt-1 text-left">
              {student?.name ?? 'Loading…'}
            </p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
            {isLoading ? (
              <LoadingState />
            ) : (
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={eyebrow}>Targets ({targets.length})</div>
                  </div>

                  {targets.map((target, index) => (
                    <div
                      key={index}
                      className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4 space-y-3"
                    >
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
                          className="h-8 w-8 rounded-full flex items-center justify-center text-white/50 hover:text-red-400 hover:bg-red-500/10 touch-manipulation transition-colors"
                          aria-label="Remove target"
                        >
                          ×
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-[11.5px] text-white/60">Description *</div>
                        <textarea
                          value={target.description}
                          onChange={(e) =>
                            handleTargetChange(index, 'description', e.target.value)
                          }
                          placeholder="Describe the target…"
                          className={textareaClass}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <div className="text-[11.5px] text-white/60">Due Date *</div>
                          <input
                            type="date"
                            value={target.target_date}
                            onChange={(e) =>
                              handleTargetChange(index, 'target_date', e.target.value)
                            }
                            className={inputClass}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <div className="text-[11.5px] text-white/60">Status</div>
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
                        </div>
                      </div>
                    </div>
                  ))}

                  {targets.length === 0 && (
                    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-10 text-center">
                      <div className="text-[13px] text-white/70">
                        No targets yet. Add one below.
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleAddTarget}
                  className="w-full h-11 text-[12.5px] font-medium text-white/70 hover:text-elec-yellow border border-dashed border-white/[0.12] hover:border-elec-yellow/40 rounded-xl touch-manipulation transition-colors"
                >
                  + Add New Target
                </button>
              </>
            )}
          </div>

          <SheetFooter className="flex-shrink-0 border-t border-white/[0.06] p-4 flex-row gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1 h-11 text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation border border-white/[0.08] rounded-full"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !hasValidTargets}
              className="flex-1 h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
            >
              {isSubmitting ? 'Saving…' : 'Save Targets →'}
            </button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

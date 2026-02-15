import { useState, useEffect, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
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
import { cn } from '@/lib/utils';
import { Target, Loader2, Save, Plus, X, Edit } from 'lucide-react';
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
  const [targets, setTargets] = useState<EditableTarget[]>([]);

  const student = useMemo(() => {
    if (!ilp?.student_id) return null;
    return students.find((s) => s.id === ilp.student_id) ?? null;
  }, [ilp, students]);

  // Initialise targets from ILP data
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
      {
        description: '',
        target_date: '',
        status: 'Pending' as TargetStatus,
      },
    ]);
  };

  const handleRemoveTarget = (index: number) => {
    setTargets((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!ilpId) return;
    setIsSubmitting(true);

    try {
      // Filter out empty targets
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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <SheetHeader className="flex-shrink-0 border-b border-border px-4 pb-4">
            <SheetTitle className="text-xl text-left flex items-center gap-2">
              <Edit className="h-5 w-5 text-elec-yellow" />
              Edit Targets
            </SheetTitle>
            <p className="text-sm text-white text-left">{student?.name ?? 'Loading...'}</p>
          </SheetHeader>

          {/* Scrollable Form */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                {/* Existing Targets */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                    Targets ({targets.length})
                  </h4>

                  {targets.map((target, index) => (
                    <Card key={index} className="border-white/10 relative">
                      <CardContent className="p-3 space-y-3">
                        {/* Remove button */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-elec-yellow shrink-0" />
                            <span className="text-sm font-medium text-white">
                              Target {index + 1}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-11 w-11 touch-manipulation text-white hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemoveTarget(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Description */}
                        <div>
                          <Label htmlFor={`target-desc-${index}`}>Description *</Label>
                          <Textarea
                            id={`target-desc-${index}`}
                            value={target.description}
                            onChange={(e) =>
                              handleTargetChange(index, 'description', e.target.value)
                            }
                            placeholder="Describe the target..."
                            className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                          />
                        </div>

                        {/* Due Date & Status */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor={`target-date-${index}`}>Due Date *</Label>
                            <Input
                              id={`target-date-${index}`}
                              type="date"
                              value={target.target_date}
                              onChange={(e) =>
                                handleTargetChange(index, 'target_date', e.target.value)
                              }
                              className="h-11 touch-manipulation"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`target-status-${index}`}>Status</Label>
                            <Select
                              value={target.status}
                              onValueChange={(value) => handleTargetChange(index, 'status', value)}
                            >
                              <SelectTrigger className="h-11 touch-manipulation">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {statusOptions.map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {status}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {targets.length === 0 && (
                    <Card className="border-white/10">
                      <CardContent className="p-6 text-center">
                        <Target className="h-8 w-8 mx-auto text-white mb-2" />
                        <p className="text-sm text-white">No targets yet. Add one below.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Add New Target */}
                <Button
                  variant="outline"
                  className="w-full h-11 touch-manipulation gap-2 border-dashed border-white/20 text-white hover:border-elec-yellow hover:text-elec-yellow"
                  onClick={handleAddTarget}
                >
                  <Plus className="h-4 w-4" />
                  Add New Target
                </Button>
              </>
            )}
          </div>

          {/* Footer */}
          <SheetFooter className="flex-shrink-0 border-t border-border p-4 flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1 h-11 touch-manipulation"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-11 touch-manipulation gap-2"
              onClick={handleSubmit}
              disabled={isSubmitting || !hasValidTargets}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Targets
                </>
              )}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

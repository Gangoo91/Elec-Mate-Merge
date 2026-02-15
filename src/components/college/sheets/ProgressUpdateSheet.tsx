import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCollegeStudent, useUpdateCollegeStudent } from '@/hooks/college/useCollegeStudents';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback, SuccessCheckmark } from '@/components/college/ui/HapticFeedback';
import { TrendingUp, Loader2, Save, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressUpdateSheetProps {
  studentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RISK_LEVELS = [
  { value: 'none', label: 'None', colour: 'text-white' },
  { value: 'low', label: 'Low', colour: 'text-success' },
  { value: 'medium', label: 'Medium', colour: 'text-warning' },
  { value: 'high', label: 'High', colour: 'text-orange-400' },
  { value: 'critical', label: 'Critical', colour: 'text-destructive' },
] as const;

export function ProgressUpdateSheet({ studentId, open, onOpenChange }: ProgressUpdateSheetProps) {
  const { data: student, isLoading } = useCollegeStudent(studentId || '');
  const updateStudentMutation = useUpdateCollegeStudent();
  const { toast } = useToast();
  const { triggerSuccess } = useHapticFeedback();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newProgress, setNewProgress] = useState('');
  const [newRisk, setNewRisk] = useState('');
  const [notes, setNotes] = useState('');

  // Populate form when student data loads
  useEffect(() => {
    if (student) {
      setNewProgress(String(student.progress_percent ?? 0));
      setNewRisk(student.risk_level?.toLowerCase() || 'none');
      setNotes('');
    }
  }, [student]);

  // Reset form when sheet closes
  useEffect(() => {
    if (!open) {
      setNewProgress('');
      setNewRisk('');
      setNotes('');
      setShowSuccess(false);
    }
  }, [open]);

  const currentProgress = student?.progress_percent ?? 0;
  const parsedNewProgress = parseInt(newProgress) || 0;
  const progressDelta = parsedNewProgress - currentProgress;

  const handleSubmit = async () => {
    if (!studentId) return;
    setIsSubmitting(true);

    try {
      await updateStudentMutation.mutateAsync({
        id: studentId,
        updates: {
          progress_percent: parsedNewProgress,
          risk_level:
            newRisk === 'none' ? 'Low' : newRisk.charAt(0).toUpperCase() + newRisk.slice(1),
        },
      });

      // Show success animation
      setShowSuccess(true);
      triggerSuccess(true);

      toast({
        title: 'Progress Updated',
        description: `${student?.name}'s progress updated to ${parsedNewProgress}%.`,
      });

      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
      }, 1200);
    } catch (error) {
      console.error('Failed to update progress:', error);
      toast({
        title: 'Update Failed',
        description: 'There was an error updating progress. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!studentId) return null;

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
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              Update Progress
            </SheetTitle>
            <p className="text-sm text-white text-left">
              {isLoading ? 'Loading student...' : `Update progress for ${student?.name}`}
            </p>
          </SheetHeader>

          {/* Scrollable Form */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
              </div>
            ) : (
              <>
                {/* Current Progress Display */}
                <Card className="border-white/10">
                  <CardContent className="p-4 space-y-3">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                      Current Progress
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">Overall Completion</span>
                      <span className="text-lg font-bold text-white">{currentProgress}%</span>
                    </div>
                    <Progress value={currentProgress} className="h-2" />
                    <div className="flex items-center gap-2 text-sm text-white">
                      <AlertTriangle
                        className={cn(
                          'h-4 w-4',
                          student?.risk_level === 'High'
                            ? 'text-destructive'
                            : student?.risk_level === 'Medium'
                              ? 'text-warning'
                              : 'text-success'
                        )}
                      />
                      <span>
                        Current risk level:{' '}
                        <span className="font-medium">{student?.risk_level || 'None'}</span>
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* New Progress Input */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                    New Progress
                  </h4>
                  <div>
                    <Label htmlFor="new-progress">Progress Percentage *</Label>
                    <Input
                      id="new-progress"
                      type="number"
                      min={0}
                      max={100}
                      value={newProgress}
                      onChange={(e) => setNewProgress(e.target.value)}
                      className="h-11 touch-manipulation"
                      placeholder="0 - 100"
                    />
                    {progressDelta !== 0 && newProgress !== '' && (
                      <p
                        className={cn(
                          'text-xs mt-1 font-medium',
                          progressDelta > 0 ? 'text-success' : 'text-destructive'
                        )}
                      >
                        {progressDelta > 0 ? '+' : ''}
                        {progressDelta}% from current
                      </p>
                    )}
                  </div>
                </div>

                {/* Risk Level */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                    Risk Level
                  </h4>
                  <div>
                    <Label htmlFor="risk-level">Risk Assessment *</Label>
                    <Select value={newRisk} onValueChange={setNewRisk}>
                      <SelectTrigger className="h-11 touch-manipulation">
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        {RISK_LEVELS.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <span className={level.colour}>{level.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                    Progress Notes
                  </h4>
                  <div>
                    <Label htmlFor="progress-notes">Notes (optional)</Label>
                    <Textarea
                      id="progress-notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="touch-manipulation text-base min-h-[120px]"
                      placeholder="Add any notes about this progress update..."
                    />
                  </div>
                </div>
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
              disabled={
                isSubmitting ||
                isLoading ||
                newProgress === '' ||
                parsedNewProgress < 0 ||
                parsedNewProgress > 100
              }
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Progress
                </>
              )}
            </Button>
          </SheetFooter>
        </div>

        {/* Success overlay */}
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}

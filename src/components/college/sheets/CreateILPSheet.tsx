import { useState, useMemo } from 'react';
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
import { useCreateILP } from '@/hooks/college/useCollegeILP';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { useHapticFeedback, SuccessCheckmark } from '@/components/college/ui/HapticFeedback';
import { useToast } from '@/hooks/use-toast';
import {
  ClipboardList,
  Loader2,
  Save,
  Target,
  Plus,
  X,
  Calendar,
  Heart,
  UserCheck,
} from 'lucide-react';
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
      // Build valid targets array
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

      // Show success animation
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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <SheetHeader className="flex-shrink-0 border-b border-border px-4 pb-4">
            <SheetTitle className="text-xl text-left flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-elec-yellow" />
              Create New ILP
            </SheetTitle>
            <p className="text-sm text-white text-left">
              Set up an Individual Learning Plan for a student
            </p>
          </SheetHeader>

          {/* Scrollable Form */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
            {/* Student Selection */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Student
              </h4>
              <div>
                <Label htmlFor="ilp-student">Select Student *</Label>
                <Select value={studentId} onValueChange={setStudentId}>
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue placeholder="Choose a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeStudents.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Initial Targets */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Initial Targets
              </h4>

              {targets.map((target, index) => (
                <Card key={index} className="border-white/10 relative">
                  <CardContent className="p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-elec-yellow shrink-0" />
                        <span className="text-sm font-medium text-white">Target {index + 1}</span>
                      </div>
                      {targets.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-11 w-11 touch-manipulation text-white hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleRemoveTarget(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`new-target-desc-${index}`}>Description *</Label>
                      <Textarea
                        id={`new-target-desc-${index}`}
                        value={target.description}
                        onChange={(e) => handleTargetChange(index, 'description', e.target.value)}
                        placeholder="Describe the learning target..."
                        className="touch-manipulation text-base min-h-[80px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`new-target-date-${index}`}>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          Due Date *
                        </span>
                      </Label>
                      <Input
                        id={`new-target-date-${index}`}
                        type="date"
                        value={target.target_date}
                        onChange={(e) => handleTargetChange(index, 'target_date', e.target.value)}
                        className="h-11 touch-manipulation"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                variant="outline"
                className="w-full h-11 touch-manipulation gap-2 border-dashed border-white/20 text-white hover:border-elec-yellow hover:text-elec-yellow"
                onClick={handleAddTarget}
              >
                <Plus className="h-4 w-4" />
                Add Another Target
              </Button>
            </div>

            {/* Support Needs */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Support Needs
              </h4>
              <div>
                <Label htmlFor="ilp-support">
                  <span className="flex items-center gap-1.5">
                    <Heart className="h-3.5 w-3.5" />
                    Additional Support
                  </span>
                </Label>
                <Textarea
                  id="ilp-support"
                  value={supportNeeds}
                  onChange={(e) => setSupportNeeds(e.target.value)}
                  placeholder="Enter support needs, separated by commas (e.g. Dyslexia support, Extra time in assessments, Hearing loop)"
                  className="touch-manipulation text-base min-h-[100px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                />
                <p className="text-xs text-white mt-1">Separate multiple needs with commas</p>
              </div>
            </div>

            {/* Review Details */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Review Schedule
              </h4>

              <div>
                <Label htmlFor="ilp-review-date">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    First Review Date
                  </span>
                </Label>
                <Input
                  id="ilp-review-date"
                  type="date"
                  value={reviewDate}
                  onChange={(e) => setReviewDate(e.target.value)}
                  className="h-11 touch-manipulation"
                />
              </div>

              <div>
                <Label htmlFor="ilp-reviewer">
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="h-3.5 w-3.5" />
                    Assigned Reviewer
                  </span>
                </Label>
                <Select value={reviewerId} onValueChange={setReviewerId}>
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue placeholder="Select tutor" />
                  </SelectTrigger>
                  <SelectContent>
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
          <SheetFooter className="flex-shrink-0 border-t border-border p-4 flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1 h-11 touch-manipulation"
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-11 touch-manipulation gap-2"
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Create ILP
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

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCollegeGrade } from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { RubricGradingDialog } from '@/components/college/dialogs/RubricGradingDialog';
import {
  ClipboardCheck,
  Loader2,
  Zap,
  Wrench,
  Search,
  TestTube,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface RubricGradingSheetProps {
  assessmentId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartRubric?: (assessmentId: string) => void;
}

const RUBRIC_CATEGORIES = [
  {
    name: 'Panel Building',
    criteriaCount: 3,
    codes: ['PB1', 'PB2', 'PB3'],
    icon: Zap,
    colour: 'text-elec-yellow',
    bgColour: 'bg-elec-yellow/10 border-elec-yellow/20',
  },
  {
    name: 'Wiring Systems',
    criteriaCount: 3,
    codes: ['WS1', 'WS2', 'WS3'],
    icon: Wrench,
    colour: 'text-info',
    bgColour: 'bg-info/10 border-info/20',
  },
  {
    name: 'Fault Finding',
    criteriaCount: 2,
    codes: ['FF1', 'FF2'],
    icon: Search,
    colour: 'text-amber-500',
    bgColour: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    name: 'Testing',
    criteriaCount: 3,
    codes: ['TS1', 'TS2', 'TS3'],
    icon: TestTube,
    colour: 'text-success',
    bgColour: 'bg-success/10 border-success/20',
  },
  {
    name: 'Safe Working',
    criteriaCount: 2,
    codes: ['SW1', 'SW2'],
    icon: ShieldCheck,
    colour: 'text-purple-400',
    bgColour: 'bg-purple-400/10 border-purple-400/20',
  },
] as const;

const TOTAL_CRITERIA = RUBRIC_CATEGORIES.reduce((sum, cat) => sum + cat.criteriaCount, 0);

export function RubricGradingSheet({
  assessmentId,
  open,
  onOpenChange,
  onStartRubric,
}: RubricGradingSheetProps) {
  const { data: grade, isLoading } = useCollegeGrade(assessmentId || '');
  const { data: students = [] } = useCollegeStudents();
  const [rubricDialogOpen, setRubricDialogOpen] = useState(false);

  const student = grade ? students.find((s) => s.id === grade.student_id) : null;

  const handleStartRubric = () => {
    if (!assessmentId) return;

    // Close this sheet first
    onOpenChange(false);

    // If a callback was provided, use it
    if (onStartRubric) {
      onStartRubric(assessmentId);
      return;
    }

    // Otherwise, open the RubricGradingDialog directly
    // Small delay to let sheet close animation complete
    setTimeout(() => {
      setRubricDialogOpen(true);
    }, 300);
  };

  return (
    <>
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
                <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
                Rubric Grading
              </SheetTitle>
              <p className="text-sm text-white text-left">
                {isLoading
                  ? 'Loading assessment...'
                  : grade
                    ? `${grade.unit_name} - ${student?.name || 'Unknown'}`
                    : 'Select an assessment to begin rubric grading'}
              </p>
            </SheetHeader>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
                </div>
              ) : !grade ? (
                <Card className="border-white/10">
                  <CardContent className="p-8 text-center space-y-3">
                    <ClipboardCheck className="h-12 w-12 mx-auto text-white" />
                    <p className="text-white font-medium">No Assessment Selected</p>
                    <p className="text-sm text-white">
                      Please select an assessment from the grades list to begin rubric grading.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Assessment Info Card */}
                  <Card className="border-white/10">
                    <CardContent className="p-4 space-y-3">
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                        Assessment Details
                      </h4>
                      <p className="text-base font-medium text-white">{grade.unit_name}</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-white text-xs">Student</p>
                          <p className="text-white font-medium">{student?.name || 'Unknown'}</p>
                        </div>
                        <div>
                          <p className="text-white text-xs">Type</p>
                          <p className="text-white font-medium">{grade.assessment_type}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-white border-white/20">
                          {grade.status}
                        </Badge>
                        <Badge variant="outline" className="text-white border-white/20">
                          {TOTAL_CRITERIA} criteria
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Rubric Categories */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                      Rubric Categories
                    </h4>
                    <p className="text-sm text-white">
                      This assessment covers {TOTAL_CRITERIA} criteria across{' '}
                      {RUBRIC_CATEGORIES.length} categories. Each criterion is scored from Not Met
                      to Exceeded.
                    </p>

                    <div className="space-y-2">
                      {RUBRIC_CATEGORIES.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <Card key={category.name} className={`border ${category.bgColour}`}>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`h-10 w-10 rounded-lg flex items-center justify-center ${category.bgColour}`}
                                >
                                  <IconComponent className={`h-5 w-5 ${category.colour}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-white">{category.name}</p>
                                  <p className="text-xs text-white">
                                    {category.criteriaCount}{' '}
                                    {category.criteriaCount === 1 ? 'criterion' : 'criteria'} (
                                    {category.codes.join(', ')})
                                  </p>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="text-white border-white/20 shrink-0"
                                >
                                  {category.criteriaCount}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  {/* Scoring Guide */}
                  <Card className="border-white/10">
                    <CardContent className="p-4 space-y-3">
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                        Scoring Guide
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-elec-yellow/40" />
                          <span className="text-white">4 = Exceeded</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-success/40" />
                          <span className="text-white">3 = Met</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-amber-500/40" />
                          <span className="text-white">2 = Partially Met</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-destructive/40" />
                          <span className="text-white">1 = Not Met</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {/* Footer */}
            <SheetFooter className="flex-shrink-0 border-t border-border p-4 flex-row gap-2">
              <Button
                variant="outline"
                className="flex-1 h-11 touch-manipulation"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 h-11 touch-manipulation gap-2"
                onClick={handleStartRubric}
                disabled={!assessmentId || isLoading || !grade}
              >
                <ClipboardCheck className="h-4 w-4" />
                Start Full Rubric Assessment
                <ChevronRight className="h-4 w-4" />
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Full Rubric Grading Dialog (opened when user taps "Start Full Rubric Assessment") */}
      <RubricGradingDialog
        open={rubricDialogOpen}
        onOpenChange={setRubricDialogOpen}
        assessmentId={assessmentId}
      />
    </>
  );
}

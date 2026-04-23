import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { useCollegeGrade } from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { RubricGradingDialog } from '@/components/college/dialogs/RubricGradingDialog';
import { Pill, LoadingState, type Tone } from '@/components/college/primitives';

interface RubricGradingSheetProps {
  assessmentId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartRubric?: (assessmentId: string) => void;
}

const RUBRIC_CATEGORIES: { name: string; criteriaCount: number; codes: string[]; tone: Tone }[] = [
  { name: 'Panel Building', criteriaCount: 3, codes: ['PB1', 'PB2', 'PB3'], tone: 'yellow' },
  { name: 'Wiring Systems', criteriaCount: 3, codes: ['WS1', 'WS2', 'WS3'], tone: 'blue' },
  { name: 'Fault Finding', criteriaCount: 2, codes: ['FF1', 'FF2'], tone: 'amber' },
  { name: 'Testing', criteriaCount: 3, codes: ['TS1', 'TS2', 'TS3'], tone: 'green' },
  { name: 'Safe Working', criteriaCount: 2, codes: ['SW1', 'SW2'], tone: 'purple' },
];

const TOTAL_CRITERIA = RUBRIC_CATEGORIES.reduce((sum, cat) => sum + cat.criteriaCount, 0);

const eyebrow = 'text-[10px] font-medium uppercase tracking-[0.16em] text-white/55';

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
    onOpenChange(false);
    if (onStartRubric) {
      onStartRubric(assessmentId);
      return;
    }
    setTimeout(() => {
      setRubricDialogOpen(true);
    }, 300);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)]">
          <div className="flex flex-col h-full">
            {/* Drag Handle */}
            <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <SheetHeader className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
              <div className={eyebrow}>Rubric Grading</div>
              <SheetTitle className="text-[20px] font-semibold text-white mt-1 text-left">
                {grade ? grade.unit_name : 'Rubric grading'}
              </SheetTitle>
              <p className="text-[12.5px] text-white/55 mt-1 text-left">
                {isLoading
                  ? 'Loading assessment…'
                  : grade
                    ? student?.name || 'Unknown student'
                    : 'Select an assessment to begin rubric grading'}
              </p>
            </SheetHeader>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
              {isLoading ? (
                <LoadingState />
              ) : !grade ? (
                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-10 text-center">
                  <div className="text-[14px] font-medium text-white">No Assessment Selected</div>
                  <p className="mt-2 text-[12.5px] text-white/75 max-w-md mx-auto leading-relaxed">
                    Please select an assessment from the grades list to begin rubric grading.
                  </p>
                </div>
              ) : (
                <>
                  {/* Assessment Info Card */}
                  <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                    <div className={eyebrow}>Assessment Details</div>
                    <p className="text-[15px] font-medium text-white">{grade.unit_name}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[11px] text-white/55 uppercase tracking-wider">Student</p>
                        <p className="text-[13px] text-white font-medium mt-0.5">
                          {student?.name || 'Unknown'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-white/55 uppercase tracking-wider">Type</p>
                        <p className="text-[13px] text-white font-medium mt-0.5">
                          {grade.assessment_type}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Pill tone="yellow">{grade.status}</Pill>
                      <Pill tone="blue">{TOTAL_CRITERIA} criteria</Pill>
                    </div>
                  </div>

                  {/* Rubric Categories */}
                  <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                    <div className={eyebrow}>Rubric Categories</div>
                    <p className="text-[12.5px] text-white/60 leading-relaxed">
                      This assessment covers {TOTAL_CRITERIA} criteria across{' '}
                      {RUBRIC_CATEGORIES.length} categories. Each criterion is scored from Not Met
                      to Exceeded.
                    </p>

                    <div className="space-y-2">
                      {RUBRIC_CATEGORIES.map((category) => (
                        <div
                          key={category.name}
                          className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]"
                        >
                          <span
                            className={`inline-block h-1.5 w-1.5 rounded-full shrink-0 ${
                              category.tone === 'yellow'
                                ? 'bg-elec-yellow'
                                : category.tone === 'blue'
                                  ? 'bg-blue-400'
                                  : category.tone === 'amber'
                                    ? 'bg-amber-400'
                                    : category.tone === 'green'
                                      ? 'bg-green-400'
                                      : 'bg-purple-400'
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-medium text-white">{category.name}</p>
                            <p className="text-[11.5px] text-white/75">
                              {category.codes.join(', ')}
                            </p>
                          </div>
                          <Pill tone={category.tone}>{category.criteriaCount}</Pill>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scoring Guide */}
                  <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                    <div className={eyebrow}>Scoring Guide</div>
                    <div className="grid grid-cols-2 gap-2 text-[12.5px]">
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                        <span className="text-white/80">4 = Exceeded</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
                        <span className="text-white/80">3 = Met</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
                        <span className="text-white/80">2 = Partially Met</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
                        <span className="text-white/80">1 = Not Met</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <SheetFooter className="flex-shrink-0 border-t border-white/[0.06] p-4 flex-row gap-2">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex-1 h-11 text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation border border-white/[0.08] rounded-full"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStartRubric}
                disabled={!assessmentId || isLoading || !grade}
                className="flex-1 h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
              >
                Start Rubric Assessment →
              </button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      <RubricGradingDialog
        open={rubricDialogOpen}
        onOpenChange={setRubricDialogOpen}
        assessmentId={assessmentId}
      />
    </>
  );
}

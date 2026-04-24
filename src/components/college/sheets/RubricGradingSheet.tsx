import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useCollegeGrade } from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { RubricGradingDialog } from '@/components/college/dialogs/RubricGradingDialog';
import {
  Pill,
  LoadingState,
  SheetShell,
  FormCard,
  FormGrid,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  EmptyState,
  type Tone,
} from '@/components/college/primitives';

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
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
        >
          <SheetShell
            eyebrow="Rubric Grading"
            title={grade ? grade.unit_name : 'Rubric grading'}
            description={
              isLoading
                ? 'Loading assessment…'
                : grade
                  ? student?.name || 'Unknown student'
                  : 'Select an assessment to begin rubric grading'
            }
            footer={
              <>
                <SecondaryButton fullWidth onClick={() => onOpenChange(false)}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  fullWidth
                  onClick={handleStartRubric}
                  disabled={!assessmentId || isLoading || !grade}
                >
                  Start Rubric Assessment →
                </PrimaryButton>
              </>
            }
          >
            {isLoading ? (
              <LoadingState />
            ) : !grade ? (
              <EmptyState
                title="No Assessment Selected"
                description="Please select an assessment from the grades list to begin rubric grading."
              />
            ) : (
              <>
                <FormCard eyebrow="Assessment Details">
                  <p className="text-[15px] font-medium text-white">{grade.unit_name}</p>
                  <FormGrid cols={2}>
                    <div>
                      <Eyebrow>Student</Eyebrow>
                      <p className="text-[13px] text-white font-medium mt-0.5">
                        {student?.name || 'Unknown'}
                      </p>
                    </div>
                    <div>
                      <Eyebrow>Type</Eyebrow>
                      <p className="text-[13px] text-white font-medium mt-0.5">
                        {grade.assessment_type}
                      </p>
                    </div>
                  </FormGrid>
                  <div className="flex gap-2 flex-wrap">
                    <Pill tone="yellow">{grade.status}</Pill>
                    <Pill tone="blue">{TOTAL_CRITERIA} criteria</Pill>
                  </div>
                </FormCard>

                <FormCard eyebrow="Rubric Categories">
                  <p className="text-[12.5px] text-white leading-relaxed">
                    This assessment covers {TOTAL_CRITERIA} criteria across{' '}
                    {RUBRIC_CATEGORIES.length} categories. Each criterion is scored from Not Met
                    to Exceeded.
                  </p>

                  <div className="space-y-2">
                    {RUBRIC_CATEGORIES.map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center gap-3 p-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.08]"
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
                          <p className="text-[11.5px] text-white">
                            {category.codes.join(', ')}
                          </p>
                        </div>
                        <Pill tone={category.tone}>{category.criteriaCount}</Pill>
                      </div>
                    ))}
                  </div>
                </FormCard>

                <FormCard eyebrow="Scoring Guide">
                  <div className="grid grid-cols-2 gap-2 text-[12.5px]">
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                      <span className="text-white">4 = Exceeded</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
                      <span className="text-white">3 = Met</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span className="text-white">2 = Partially Met</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
                      <span className="text-white">1 = Not Met</span>
                    </div>
                  </div>
                </FormCard>
              </>
            )}
          </SheetShell>
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

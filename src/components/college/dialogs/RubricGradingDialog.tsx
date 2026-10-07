import { useState, useEffect, useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  checkboxCn,
  checkRowCn,
  labelCn,
  selectTriggerCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { CommentThread } from '@/components/college/comments';
import { useCollegeGrades, useGradeAssessment } from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { cn } from '@/lib/utils';

interface RubricGradingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentId?: string;
}

interface CriterionScore {
  criterionCode: string;
  criterionText: string;
  score: number; // 0-4 (0=Not Assessed, 1=Not Met, 2=Partially Met, 3=Met, 4=Exceeded)
  feedback: string;
  evidenceLinked: boolean;
}

// Rubric criteria based on AM2 standards
const defaultCriteria = [
  {
    code: 'PB1',
    text: 'Select and install enclosures and mounting systems',
    category: 'Panel Building',
  },
  { code: 'PB2', text: 'Install busbars and distribution systems', category: 'Panel Building' },
  { code: 'PB3', text: 'Install circuit protection devices', category: 'Panel Building' },
  { code: 'WS1', text: 'Install cable containment systems', category: 'Wiring Systems' },
  { code: 'WS2', text: 'Install cables in containment systems', category: 'Wiring Systems' },
  { code: 'WS3', text: 'Install and terminate SWA cables', category: 'Wiring Systems' },
  { code: 'FF1', text: 'Identify symptoms and causes of faults', category: 'Fault Finding' },
  { code: 'FF2', text: 'Apply safe isolation procedures', category: 'Fault Finding' },
  { code: 'TS1', text: 'Conduct visual inspections', category: 'Testing' },
  { code: 'TS2', text: 'Test continuity of protective conductors', category: 'Testing' },
  { code: 'TS3', text: 'Test insulation resistance', category: 'Testing' },
  { code: 'SW1', text: 'Conduct risk assessments', category: 'Safe Working' },
  { code: 'SW2', text: 'Select and use appropriate PPE', category: 'Safe Working' },
];

const scoreLabels = [
  { value: 0, label: 'Not assessed', color: 'text-white' },
  { value: 1, label: 'Not met', color: 'text-orange-300' },
  { value: 2, label: 'Partially met', color: 'text-orange-300' },
  { value: 3, label: 'Met', color: 'text-emerald-400' },
  { value: 4, label: 'Exceeded', color: 'text-emerald-400' },
];

export function RubricGradingDialog({
  open,
  onOpenChange,
  assessmentId,
}: RubricGradingDialogProps) {
  const { data: grades = [] } = useCollegeGrades();
  const { data: students = [] } = useCollegeStudents();
  const { data: staff = [] } = useCollegeStaff();
  const gradeAssessmentMutation = useGradeAssessment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('criteria');
  const [assessorId, setAssessorId] = useState('');
  const [overallFeedback, setOverallFeedback] = useState('');
  const [signedOff, setSignedOff] = useState(false);
  const [criteriaScores, setCriteriaScores] = useState<CriterionScore[]>([]);

  // Get the selected assessment
  const grade = grades.find((a) => a.id === assessmentId);
  const student = grade ? students.find((s) => s.id === grade.student_id) : null;
  const assessors = staff.filter((s) => s.role === 'tutor');

  // Initialize criteria scores when dialog opens
  useEffect(() => {
    if (open && assessmentId) {
      const initialScores = defaultCriteria.map((c) => ({
        criterionCode: c.code,
        criterionText: c.text,
        score: 0,
        feedback: '',
        evidenceLinked: false,
      }));
      setCriteriaScores(initialScores);
      setActiveTab('criteria');
      setSignedOff(false);
      setOverallFeedback('');
    }
  }, [open, assessmentId]);

  // Calculate grade based on criteria scores
  const gradeCalculation = useMemo(() => {
    const assessedCriteria = criteriaScores.filter((c) => c.score > 0);
    if (assessedCriteria.length === 0) {
      return { grade: 'Not Graded', percentage: 0, color: 'text-white' };
    }

    const totalScore = assessedCriteria.reduce((sum, c) => sum + c.score, 0);
    const maxPossible = assessedCriteria.length * 4;
    const percentage = Math.round((totalScore / maxPossible) * 100);

    let calculatedGrade = 'Not Yet Competent';
    let color = 'text-orange-300';

    if (percentage >= 90) {
      calculatedGrade = 'Distinction';
      color = 'text-emerald-400';
    } else if (percentage >= 75) {
      calculatedGrade = 'Merit';
      color = 'text-emerald-400';
    } else if (percentage >= 60) {
      calculatedGrade = 'Pass';
      color = 'text-emerald-400';
    } else if (percentage >= 40) {
      calculatedGrade = 'Refer';
      color = 'text-orange-300';
    }

    // Check if any criteria are "Not Met"
    const hasNotMet = assessedCriteria.some((c) => c.score === 1);
    if (hasNotMet && percentage >= 60) {
      calculatedGrade = 'Refer';
      color = 'text-orange-300';
    }

    return { grade: calculatedGrade, percentage, color };
  }, [criteriaScores]);

  // Group criteria by category
  const groupedCriteria = useMemo(() => {
    const groups: Record<string, typeof defaultCriteria> = {};
    defaultCriteria.forEach((c) => {
      if (!groups[c.category]) {
        groups[c.category] = [];
      }
      groups[c.category].push(c);
    });
    return groups;
  }, []);

  const updateCriterionScore = (code: string, field: keyof CriterionScore, value: string | number | boolean) => {
    setCriteriaScores((prev) =>
      prev.map((c) => (c.criterionCode === code ? { ...c, [field]: value } : c))
    );
  };

  const handleSubmit = async () => {
    if (!assessmentId || !assessorId) return;

    setIsSubmitting(true);

    try {
      gradeAssessmentMutation.mutate({
        id: assessmentId,
        grade: gradeCalculation.grade,
        score: gradeCalculation.percentage,
        feedback: overallFeedback,
        assessorId,
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Failed to record grade:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAIFeedback = () => {
    // Get scored criteria
    const scoredCriteria = criteriaScores.filter((c) => c.score > 0);
    const strengths = scoredCriteria.filter((c) => c.score >= 3);
    const improvements = scoredCriteria.filter((c) => c.score <= 2);

    let feedback = '';

    if (strengths.length > 0) {
      feedback += '**Strengths demonstrated:**\n';
      strengths.forEach((c) => {
        feedback += `- ${c.criterionText} (${scoreLabels[c.score].label})\n`;
      });
      feedback += '\n';
    }

    if (improvements.length > 0) {
      feedback += '**Areas for development:**\n';
      improvements.forEach((c) => {
        feedback += `- ${c.criterionText} - needs further practice\n`;
      });
      feedback += '\n';
    }

    // Add grade-specific guidance
    if (gradeCalculation.grade === 'Distinction') {
      feedback +=
        'Outstanding work! You have exceeded expectations across the assessment criteria.';
    } else if (gradeCalculation.grade === 'Merit') {
      feedback +=
        'Very good performance. Continue to build on your strengths while addressing the development areas.';
    } else if (gradeCalculation.grade === 'Pass') {
      feedback +=
        'You have met the required standard. Focus on the areas for development to achieve higher grades.';
    } else if (gradeCalculation.grade === 'Refer') {
      feedback +=
        'Some criteria require resubmission. Please review the feedback and gather additional evidence.';
    } else {
      feedback +=
        'Please review the assessment criteria carefully and work with your assessor to improve.';
    }

    setOverallFeedback(feedback);
  };

  const assessedCount = criteriaScores.filter((c) => c.score > 0).length;
  const totalCriteria = criteriaScores.length;

  if (!grade) return null;

  const sectionTitleCn = 'text-[15px] font-semibold text-white';
  const tabs = [
    { id: 'criteria', label: 'Criteria' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'signoff', label: 'Sign off' },
  ];
  const counts = [
    { label: 'Exceeded', value: criteriaScores.filter((c) => c.score === 4).length, tone: 'text-emerald-400' },
    { label: 'Met', value: criteriaScores.filter((c) => c.score === 3).length, tone: 'text-emerald-400' },
    { label: 'Partially', value: criteriaScores.filter((c) => c.score === 2).length, tone: 'text-orange-300' },
    { label: 'Not met', value: criteriaScores.filter((c) => c.score === 1).length, tone: 'text-orange-300' },
  ];

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Rubric grading"
      title={grade?.unit_name ?? 'Assessment'}
      description={`${student?.name ?? 'Unknown learner'}${grade?.assessment_type ? ` · ${grade.assessment_type}` : ''}. Score each criterion 1 to 4, then sign off.`}
      subheader={
        <div className="space-y-3 py-3">
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[13px] font-medium text-white">Overall grade</span>
              <span className={cn('text-[15px] font-semibold', gradeCalculation.color)}>
                {gradeCalculation.grade}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-elec-yellow transition-all"
                style={{ width: `${gradeCalculation.percentage}%` }}
              />
            </div>
            <p className="mt-1 text-[12px] tabular-nums text-white">
              {assessedCount}/{totalCriteria} criteria assessed ({gradeCalculation.percentage}%)
            </p>
          </div>
          <div className="flex gap-2 lg:hidden" role="tablist">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={activeTab === t.id}
                onClick={() => setActiveTab(t.id)}
                className={chipCn(activeTab === t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      }
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 pt-5 lg:grid-cols-[minmax(0,1fr)_26rem]"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className={buttonSecondaryCn}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !assessorId || !signedOff || assessedCount === 0}
            className={buttonPrimaryCn}
          >
            {isSubmitting ? 'Saving…' : 'Submit grade'}
          </button>
        </div>
      }
    >
      {/* Criteria */}
      <div className={cn('space-y-7', activeTab === 'criteria' ? 'block' : 'hidden', 'lg:block')}>
        <p className="text-[12px] text-white">
          – not assessed · 1 not met · 2 partially met · 3 met · 4 exceeded
        </p>
        {Object.entries(groupedCriteria).map(([category, criteria]) => (
          <section key={category}>
            <h3 className={sectionTitleCn}>{category}</h3>
            <ul className="mt-2 divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {criteria.map((criterion) => {
                const score = criteriaScores.find((c) => c.criterionCode === criterion.code);
                const currentScore = score?.score || 0;

                return (
                  <li key={criterion.code} className="py-3.5">
                    <div className="flex items-start gap-3">
                      <span className="w-9 shrink-0 pt-0.5 font-mono text-[12px] font-semibold text-white">
                        {criterion.code}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-medium text-white">{criterion.text}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          {scoreLabels.map((sl) => (
                            <button
                              key={sl.value}
                              type="button"
                              aria-pressed={currentScore === sl.value}
                              aria-label={`${criterion.code}: ${sl.label}`}
                              className={cn(chipCn(currentScore === sl.value), 'w-10 px-0 tabular-nums')}
                              onClick={() => updateCriterionScore(criterion.code, 'score', sl.value)}
                            >
                              {sl.value === 0 ? '–' : sl.value}
                            </button>
                          ))}
                          <span className={cn('ml-1.5 text-[12.5px] font-medium', scoreLabels[currentScore].color)}>
                            {scoreLabels[currentScore].label}
                          </span>
                        </div>
                        {currentScore > 0 && (
                          <div className="mt-2.5">
                            <label className="sr-only" htmlFor={`rubric-fb-${criterion.code}`}>
                              Feedback on {criterion.code}
                            </label>
                            <textarea
                              id={`rubric-fb-${criterion.code}`}
                              placeholder="Feedback on this criterion (optional)"
                              value={score?.feedback || ''}
                              onChange={(e) =>
                                updateCriterionScore(criterion.code, 'feedback', e.target.value)
                              }
                              className={cn(textareaCn, 'min-h-[64px] text-[14px] md:text-[14px]')}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <div className="space-y-8 lg:sticky lg:top-0 lg:border-l lg:border-white/[0.08] lg:pl-10">
        {/* Feedback */}
        <section className={cn('space-y-4', activeTab === 'feedback' ? 'block' : 'hidden', 'lg:block')}>
          <div className="flex items-end justify-between gap-3">
            <label className={cn(labelCn, 'mb-0 text-[15px] font-semibold')} htmlFor="rubric-overall">
              Overall feedback
            </label>
            <button
              type="button"
              onClick={generateAIFeedback}
              className="h-9 shrink-0 px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
            >
              Draft from scores
            </button>
          </div>
          <textarea
            id="rubric-overall"
            value={overallFeedback}
            onChange={(e) => setOverallFeedback(e.target.value)}
            placeholder="Overall feedback for the learner"
            className={cn(textareaCn, 'min-h-[180px]')}
          />

          <dl className="grid grid-cols-4 divide-x divide-white/[0.08] border-y border-white/[0.08] py-3 text-center">
            {counts.map((c) => (
              <div key={c.label}>
                <dd className={cn('text-[18px] font-semibold tabular-nums', c.value > 0 ? c.tone : 'text-white')}>
                  {c.value}
                </dd>
                <dt className="text-[12px] text-white">{c.label}</dt>
              </div>
            ))}
          </dl>

          <div className="space-y-2 pt-2">
            <h3 className={sectionTitleCn}>Discussion and comments</h3>
            <p className="text-[12.5px] text-white">
              Leave notes, ask for a second opinion or discuss with colleagues using @mentions.
            </p>
            <CommentThread contextType="assessment" contextId={grade.id} />
          </div>
        </section>

        {/* Sign off */}
        <section
          className={cn(
            'space-y-5 lg:border-t lg:border-white/[0.08] lg:pt-6',
            activeTab === 'signoff' ? 'block' : 'hidden',
            'lg:block'
          )}
        >
          <h3 className={sectionTitleCn}>Sign off</h3>
          <dl className="divide-y divide-white/[0.06] text-[13px]">
            {(
              [
                ['Learner', student?.name ?? '—'],
                ['Grade', gradeCalculation.grade],
                ['Score', `${gradeCalculation.percentage}%`],
                ['Criteria assessed', `${assessedCount}/${totalCriteria}`],
                ['Assessment type', grade?.assessment_type ?? '—'],
              ] as [string, string][]
            ).map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 py-2">
                <dt className="text-white">{k}</dt>
                <dd className="min-w-0 truncate text-right font-medium tabular-nums text-white">{v}</dd>
              </div>
            ))}
          </dl>

          <div>
            <p className={labelCn}>Assessed by</p>
            <MobileSelectPicker
              value={assessorId}
              onValueChange={setAssessorId}
              title="Assessed by"
              placeholder={assessors.length === 0 ? 'No tutors available' : 'Select assessor'}
              disabled={assessors.length === 0}
              triggerClassName={selectTriggerCn}
              options={assessors.map((assessor) => ({
                value: assessor.id,
                label: `${assessor.name} (${assessor.role})`,
              }))}
            />
          </div>

          <label htmlFor="signoff" className={cn(checkRowCn, 'items-start')}>
            <Checkbox
              id="signoff"
              checked={signedOff}
              onCheckedChange={(checked) => setSignedOff(checked as boolean)}
              className={cn(checkboxCn, 'mt-0.5')}
            />
            <span className="grid gap-1">
              <span className="text-[14px] font-medium text-white">
                I confirm this assessment is accurate
              </span>
              <span className="text-[12.5px] leading-snug text-white">
                By signing off, you confirm that you have assessed all criteria fairly and provided
                appropriate feedback.
              </span>
            </span>
          </label>
        </section>
      </div>
    </FormSheet>
  );
}

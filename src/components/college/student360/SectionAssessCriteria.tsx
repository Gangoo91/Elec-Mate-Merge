/**
 * SectionAssessCriteria — Student 360's assessment loop (ELE-1867 / ELE-1871).
 *
 * The same LearnerAssessmentView the learner and independent assessors use,
 * in assessor mode for tutors and assessors, IQA mode for IQAs, admins and
 * heads of department. Decisions write portfolio_assessment_decisions; the
 * learner sees them at once in their College area.
 */
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { cn } from '@/lib/utils';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import { LearnerAssessmentView } from '@/components/assessment/LearnerAssessmentView';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';

const IQA_ROLES = new Set(['iqa', 'admin', 'head_of_department']);
/** Roles that can record decisions (mirrors _can_assess). Support staff see nothing here. */
const ASSESS_ROLES = new Set(['tutor', 'assessor', 'iqa', 'admin', 'head_of_department']);

export function SectionAssessCriteria({
  id,
  studentName,
  userId,
}: {
  id?: string;
  studentName: string;
  userId: string | null;
}) {
  const { staff } = useMyCollegeContext();
  const mode = staff?.role && IQA_ROLES.has(staff.role) ? 'iqa' : 'assessor';
  const first = studentName.split(' ')[0] || 'This learner';
  if (staff && staff.role && !ASSESS_ROLES.has(staff.role)) return null;

  return (
    <section id={id} className="scroll-mt-24 space-y-3">
      <div className="space-y-1">
        <HubSectionHeading>Assess criteria</HubSectionHeading>
        <p className="text-[13px] text-white">
          Tap the criteria you have evidence for, then record passed, needs more or not yet. {first} sees
          your decision and feedback straight away.
          {mode === 'iqa' ? ' As IQA you can confirm passed criteria.' : ''}
        </p>
      </div>
      {userId ? (
        <LearnerAssessmentView learnerId={userId} mode={mode} learnerName={studentName} aboveBottomNav />
      ) : (
        <div className={cn('rounded-2xl border border-white/[0.14] p-5', CARD_SURFACE)}>
          <p className="text-[14.5px] font-semibold text-white">{first} hasn't joined yet</p>
          <p className="mt-1 text-[13px] text-white">
            Their evidence lives in their own Elec-Mate account. Send them the cohort join code and their
            criteria appear here as soon as they join.
          </p>
        </div>
      )}
    </section>
  );
}

export default SectionAssessCriteria;

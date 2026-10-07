import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormSheet } from '@/components/forms/FormSheet';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY, chipCn } from '@/components/college/ui/CollegeUi';
import StudentRequirementsPanel from './StudentRequirementsPanel';
import EPAGatewayChecklist from './EPAGatewayChecklist';
import type { PortfolioLearner } from './useCollegePortfolioOverview';

/* ==========================================================================
   PortfolioToolsSheet — the two tools the old Portfolio hub kept on its
   student page that live nowhere else: extra evidence requirements a tutor
   sets for one learner, and the EPA gateway checklist. Criteria decisions
   and the evidence itself live in Student 360, linked from the top.
   ========================================================================== */

type Tab = 'requirements' | 'gateway';

export function PortfolioToolsSheet({
  learner,
  onOpenChange,
}: {
  learner: PortfolioLearner | null;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('requirements');
  const open = !!learner;
  const ready = !!learner?.user_id && !!learner?.qualification_id;
  const go = (hash: string) => {
    if (!learner) return;
    onOpenChange(false);
    navigate(`/college?section=student360&studentId=${encodeURIComponent(learner.student_id)}#${hash}`);
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Portfolio"
      title={learner?.name ?? ''}
      description={learner?.qualification_title ?? (learner?.cohort_name ? `Cohort: ${learner.cohort_name}` : undefined)}
      subheader={
        ready ? (
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Portfolio tools">
            <button type="button" role="tab" aria-selected={tab === 'requirements'} className={chipCn(tab === 'requirements')} onClick={() => setTab('requirements')}>
              Extra requirements
            </button>
            <button type="button" role="tab" aria-selected={tab === 'gateway'} className={chipCn(tab === 'gateway')} onClick={() => setTab('gateway')}>
              EPA gateway
            </button>
          </div>
        ) : undefined
      }
    >
      <div className="flex flex-wrap gap-2">
        <button type="button" className={COLLEGE_BTN_PRIMARY} onClick={() => go('assess')}>
          Assess criteria
        </button>
        <button type="button" className={COLLEGE_BTN} onClick={() => go('portfolio')}>
          See their evidence
        </button>
      </div>
      {!learner ? null : !learner.user_id ? (
        <p className="text-[13.5px] text-white">
          {learner.name.split(' ')[0]} hasn't joined Elec-Mate yet, so there is no portfolio to set requirements on. Send them the
          cohort join code from their cohort page.
        </p>
      ) : !learner.qualification_id ? (
        <p className="text-[13.5px] text-white">
          No qualification is set for {learner.name.split(' ')[0]} yet. Set their course or qualification on Student 360 and these
          tools appear here.
        </p>
      ) : tab === 'requirements' ? (
        <StudentRequirementsPanel studentId={learner.user_id} qualificationId={learner.qualification_id} />
      ) : (
        <EPAGatewayChecklist studentId={learner.user_id} qualificationId={learner.qualification_id} />
      )}
    </FormSheet>
  );
}

export default PortfolioToolsSheet;

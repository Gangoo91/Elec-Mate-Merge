/**
 * ElectricalEpaPanel — the electrical-only EPA pieces, under the AM2 task list
 * (ELE-1907), for the learner's EPA page and the tutor's Student 360:
 *
 *   PlanVersionCard   ELE-2054  the assessment plan by start date
 *   Am2ExposureCard   ELE-2049  safe isolation, I&T and fault finding on site
 *   NET checklist     ELE-2050  NET's AM2S v1 Candidate Checklist and booking pack
 *   GoldCardRoad      ELE-2055  after the AM2S: ECS Gold Card and JIB grading
 *
 * One mount point so the host pages carry a single line each.
 */
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LC_FRAME, lcChip } from '@/components/apprentice-hub/college-hub/learnerUi';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY } from '@/components/college/ui/CollegeUi';
import { Am2ExposureCard } from '@/components/epa/Am2ExposureCard';
import { GoldCardRoad } from '@/components/epa/GoldCardRoad';
import { PlanVersionCard } from '@/components/epa/PlanVersionCard';
import { useNetChecklist, usePlanVersion, type PlanVersion } from '@/hooks/epa/useElectricalEpa';
import { ALL_ITEMS, NET_AM2S_FORM } from '@/data/net/am2sV1Checklist';

function NetChecklistEntry({
  learnerId,
  audience,
  collegeStudentId,
}: {
  learnerId: string;
  audience: 'learner' | 'tutor';
  collegeStudentId?: string | null;
}) {
  const navigate = useNavigate();
  const { data } = useNetChecklist(learnerId);
  if (!data || !data.context.applicable) return null;
  const ratings = data.checklist?.ratings ?? {};
  const rated = ALL_ITEMS.filter((i) => ratings[i.key]?.k && ratings[i.key]?.e).length;
  const sigs = (['candidate', 'employer', 'provider'] as const).filter(
    (k) => data.signatures[k]?.signed_at && !data.signatures[k]?.stale
  ).length;
  const path =
    audience === 'learner'
      ? '/apprentice/net-checklist'
      : `/college/net-checklist/${collegeStudentId ?? data.context.college_student_id ?? ''}`;
  const mySigNeeded =
    audience === 'learner' &&
    data.ready_to_sign &&
    (!data.signatures.candidate?.signed_at || data.signatures.candidate?.stale);

  return (
    <section className={LC_FRAME} data-testid="net-checklist-entry">
      <div className="px-4 pb-3 pt-4 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <p className="text-[13px] font-medium text-white">NET {NET_AM2S_FORM.name}</p>
          <span
            className={lcChip(
              data.all_signed ? 'done' : sigs > 0 || rated > 0 ? 'action' : 'neutral'
            )}
          >
            {data.all_signed ? 'Signed by all three' : `${sigs} of 3 signed`}
          </span>
        </div>
        <h3 className="mt-1 text-[15px] font-semibold leading-snug text-white">
          {`${rated} of ${ALL_ITEMS.length} items rated, ${data.gaps.below.length} below Adequate.`}
        </h3>
        <p className="mt-1 text-[12.5px] leading-snug text-white">
          NET will not book the AM2S without this form signed by the apprentice, employer and
          college.
          {data.apply_by
            ? ` Apply by ${new Date(`${data.apply_by}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}.`
            : ''}
        </p>
      </div>
      <div className="border-t border-white/[0.08] px-4 py-3 sm:px-5">
        <button
          type="button"
          onClick={() => navigate(path)}
          className={cn(mySigNeeded ? COLLEGE_BTN_PRIMARY : COLLEGE_BTN, 'w-full sm:w-auto')}
          data-testid="net-checklist-open"
        >
          {mySigNeeded
            ? 'Sign your declaration'
            : audience === 'learner'
              ? 'Open the checklist'
              : 'Open the checklist and booking pack'}
        </button>
      </div>
    </section>
  );
}

export function ElectricalEpaPanel({
  learnerId,
  audience,
  collegeStudentId,
  name,
  plan: given,
}: {
  learnerId: string;
  audience: 'learner' | 'tutor';
  collegeStudentId?: string | null;
  name?: string;
  plan?: PlanVersion | null;
}) {
  const fetched = usePlanVersion(given === undefined ? learnerId : null);
  const plan = given !== undefined ? given : fetched.data;
  return (
    <div className="space-y-5" data-testid="electrical-epa-panel">
      <PlanVersionCard plan={plan} audience={audience} />
      <Am2ExposureCard learnerId={learnerId} audience={audience} name={name} />
      <NetChecklistEntry
        learnerId={learnerId}
        audience={audience}
        collegeStudentId={collegeStudentId}
      />
      <GoldCardRoad
        learnerId={learnerId}
        audience={audience}
        name={name}
        compact={audience === 'learner'}
      />
    </div>
  );
}

export default ElectricalEpaPanel;

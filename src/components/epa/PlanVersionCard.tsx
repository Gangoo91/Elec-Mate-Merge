/**
 * PlanVersionCard — which assessment plan the learner is on, chosen by their
 * start date, and its end assessment (ELE-2054). From
 * get_learner_plan_version: Skills England's version windows (ST0152 1.0,
 * 1.1, 1.2, the revised plan from 17 Dec 2026; ST1017 likewise) and NET's
 * end assessment by start date (original AM2S before Sept 2023, AM2S v1 from
 * Sept 2023 to 16 Dec 2026).
 *
 * Structure only. Where the revised plan's criteria map or end assessment is
 * not loaded, it says so instead of showing the current plan's.
 */
import { cn } from '@/lib/utils';
import { LC_CARD, lcChip } from '@/components/apprentice-hub/college-hub/learnerUi';
import type { PlanVersion } from '@/hooks/epa/useElectricalEpa';

const fmt = (iso: string | null | undefined) =>
  iso
    ? new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

const GAP: Record<string, string> = {
  start_date: 'the learner’s start date',
  standard_version_for_date: 'the standard version for this start date',
  end_assessment_for_date: 'the end assessment for this start date',
  criteria_map_for_revised_plan: 'the criteria map for the revised plan',
  qualification_version: 'the qualification specification version',
};

const versionLabel = (v?: string) =>
  !v ? '' : v.startsWith('revised') ? 'revised assessment plan' : `v${v}`;

export function PlanVersionCard({
  plan,
  audience,
}: {
  plan: PlanVersion | null;
  audience: 'learner' | 'tutor';
}) {
  if (!plan || plan.status === 'no_standard') return null;
  const s = plan.standard;
  const ea = plan.end_assessment;
  const revised = plan.status === 'revised_plan';
  const window =
    s?.effective_from || s?.effective_to
      ? `for starts ${s?.effective_from ? fmt(s.effective_from) : 'any date'} to ${s?.effective_to ? fmt(s.effective_to) : 'now'}`
      : '';
  const contentGaps = plan.gaps.filter(
    (g) => g !== 'qualification_version' || audience === 'tutor'
  );

  return (
    <section className={LC_CARD} data-testid="plan-version" data-status={plan.status}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-[13px] font-medium text-white">Assessment plan by start date</p>
        <span className={lcChip(revised || plan.status !== 'current' ? 'action' : 'done')}>
          {revised ? 'Revised plan' : plan.status === 'current' ? 'Matched' : 'Check'}
        </span>
      </div>
      <h3
        className="mt-1 text-[15px] font-semibold leading-snug text-white"
        data-testid="plan-version-headline"
      >
        {plan.status === 'no_start_date'
          ? `${s?.code ?? 'Standard'}: no start date recorded, so the plan version cannot be chosen.`
          : `${s?.code} ${versionLabel(s?.version)}${window ? `, ${window}` : ''}. End assessment: ${
              ea
                ? `${ea.assessment_code} ${ea.assessment_version === 'original' ? '(original)' : (ea.assessment_version ?? '')}`.trim()
                : 'not recorded yet'
            }.`}
      </h3>
      <p className="mt-1 text-[12.5px] leading-snug text-white">
        {plan.start_date ? `Started ${fmt(plan.start_date)}. ` : ''}
        {revised
          ? audience === 'learner'
            ? 'You started on the revised plan from 17 December 2026. Your college will confirm what it means for your end-point assessment.'
            : 'Starts from 17 December 2026 are on the revised plan (Skills England). Its criteria map and end assessment are not loaded yet, so the AM2S v1 task list is not shown for this learner.'
          : ea?.assessment_version === 'original'
            ? 'Started before September 2023: NET’s original AM2S applies, not the AM2S v1.'
            : 'The plan version follows the start date, from the Skills England version log.'}
      </p>
      {audience === 'tutor' && contentGaps.length > 0 && (
        <p className={cn('mt-2 text-[12.5px] text-white')} data-testid="plan-version-gaps">
          Still to load: {contentGaps.map((g) => GAP[g] ?? g).join(', ')}.
        </p>
      )}
      {s?.source_url && (
        <a
          href={s.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex min-h-11 items-center text-[12.5px] font-semibold text-elec-yellow underline underline-offset-2 touch-manipulation"
        >
          Skills England version log
        </a>
      )}
    </section>
  );
}

export default PlanVersionCard;

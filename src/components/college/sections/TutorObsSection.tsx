import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import {
  useTutorObservations,
  type ObservationGrade,
  type ObservationKind,
  type TutorObservation,
} from '@/hooks/useTutorObservations';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';

/* ==========================================================================
   TutorObsSection — 360 view of observations OF tutors.
   ELE-935 (K3). Aggregates peer / IQA / HoD / learning walks / standardisation
   so a HoD can see at-a-glance which tutors have recent observations and
   which haven't.

   Content only — CollegeDashboard draws the masthead. Colour encodes state
   and nothing else: Inadequate is the red word, Requires improvement and a
   tutor with no observation in twelve months are volt, everything else is
   white. The per-tutor grid of tinted cards is now one list.
   ========================================================================== */

const KIND_LABEL: Record<ObservationKind, string> = {
  peer: 'Peer',
  iqa: 'IQA',
  hod: 'HoD',
  learning_walk: 'Learning walk',
  standardisation: 'Standardisation',
  self: 'Self',
  external: 'External',
};

const GRADE_LABEL: Record<ObservationGrade, string> = {
  outstanding: 'Outstanding',
  good: 'Good',
  requires_improvement: 'Requires improvement',
  inadequate: 'Inadequate',
  developmental: 'Developmental',
};

function gradeTone(grade: ObservationGrade | null): string {
  if (grade === 'inadequate') return 'text-red-300';
  if (grade === 'requires_improvement') return 'text-elec-yellow';
  return 'text-white';
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function TutorObsSection() {
  const { rollup, observations, loading, error } = useTutorObservations();
  const [openId, setOpenId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      </div>
    );
  }

  // Tutors with no observations in the last 12 months are an Ofsted risk —
  // they sort to the top of the list.
  const tutorsWithoutObs = rollup.filter((r) => r.total_obs_12m === 0);
  const sortedRollup = [...rollup].sort((a, b) => {
    const gap = Number(a.total_obs_12m > 0) - Number(b.total_obs_12m > 0);
    if (gap !== 0) return gap;
    return a.tutor_name.localeCompare(b.tutor_name);
  });
  const unacknowledged = observations.filter((o) => !o.tutor_acknowledged).length;
  const obs12m = rollup.reduce((sum, r) => sum + r.total_obs_12m, 0);
  const inadequate = observations.filter((o) => o.grade === 'inadequate').length;

  return (
    <div className="space-y-8 sm:space-y-10">
      {error && (
        <div className="rounded-2xl border border-red-400/40 px-4 py-3 text-[13px] text-white">
          {error}
        </div>
      )}

      {rollup.length > 0 && (
        <HubKpiRow>
          <HubKpi
            accent
            label="Observations"
            value={String(obs12m)}
            verdict="In the last 12 months"
            context={`Across ${rollup.length} tutor${rollup.length === 1 ? '' : 's'}`}
          />
          <HubKpi
            label="Not observed"
            value={String(tutorsWithoutObs.length)}
            verdict={
              tutorsWithoutObs.length > 0 ? 'No observation in 12 months' : 'Every tutor observed'
            }
            sentiment={tutorsWithoutObs.length > 0 ? 'bad' : 'neutral'}
          />
          <HubKpi
            label="Awaiting tutor"
            value={String(unacknowledged)}
            verdict={unacknowledged > 0 ? 'Not yet acknowledged' : 'All acknowledged'}
          />
          <HubKpi
            label="Inadequate"
            value={String(inadequate)}
            verdict={inadequate > 0 ? 'Needs a follow-up plan' : 'None recorded'}
            sentiment={inadequate > 0 ? 'bad' : 'neutral'}
          />
        </HubKpiRow>
      )}

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>By tutor</HubSectionHeading>
          {rollup.length > 0 && (
            <span
              className={cn(
                'text-[11px] font-semibold tabular-nums',
                tutorsWithoutObs.length > 0 ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {tutorsWithoutObs.length > 0
                ? `${tutorsWithoutObs.length} not observed`
                : `${rollup.length} tutor${rollup.length === 1 ? '' : 's'}`}
            </span>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={cn(
            '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          {sortedRollup.length === 0 ? (
            <p className="px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
              No observations recorded yet.
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {sortedRollup.map((r) => {
                const none = r.total_obs_12m === 0;
                const breakdown = [
                  r.peer_count > 0 ? `${r.peer_count} peer` : null,
                  r.iqa_count > 0 ? `${r.iqa_count} IQA` : null,
                  r.hod_count > 0 ? `${r.hod_count} HoD` : null,
                  r.walk_count > 0 ? `${r.walk_count} walk` : null,
                  r.standardisation_count > 0 ? `${r.standardisation_count} standardisation` : null,
                  r.last_observed_at ? `last ${fmtDate(r.last_observed_at)}` : null,
                ]
                  .filter(Boolean)
                  .join(' · ');
                return (
                  <li key={r.tutor_staff_id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'h-8 w-[3px] shrink-0 rounded-full',
                        none ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                        {r.tutor_name}
                      </span>
                      <span
                        className={cn(
                          'mt-0.5 block truncate text-[12px] leading-tight',
                          none ? 'font-semibold text-elec-yellow' : 'text-white'
                        )}
                      >
                        {none
                          ? 'No observation in the last 12 months'
                          : `${r.total_obs_12m} in 12 months · ${breakdown}`}
                      </span>
                    </span>
                    {r.latest_grade && (
                      <span
                        className={cn(
                          'shrink-0 text-[12px] font-semibold',
                          gradeTone(r.latest_grade)
                        )}
                      >
                        {GRADE_LABEL[r.latest_grade]}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>Latest observations</HubSectionHeading>
          {observations.length > 0 && (
            <span
              className={cn(
                'text-[11px] font-semibold tabular-nums',
                unacknowledged > 0 ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {unacknowledged > 0
                ? `${unacknowledged} awaiting tutor`
                : `${observations.length} on record`}
            </span>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={cn(
            '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          {observations.length === 0 ? (
            <p className="px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
              Nothing observed yet.
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {observations.slice(0, 12).map((o) => (
                <ObservationRow
                  key={o.id}
                  o={o}
                  open={openId === o.id}
                  onToggle={() => setOpenId((v) => (v === o.id ? null : o.id))}
                />
              ))}
            </ul>
          )}
        </motion.div>
      </motion.section>
    </div>
  );
}

/** Tap to open the detail — strengths, development, agreed actions. Closed
 *  by default so twelve observations stay twelve rows, not twelve pages. */
function ObservationRow({
  o,
  open,
  onToggle,
}: {
  o: TutorObservation;
  open: boolean;
  onToggle: () => void;
}) {
  const hasDetail = !!(
    o.focus_area ||
    o.strengths ||
    o.areas_for_development ||
    (o.agreed_actions && o.agreed_actions.length > 0)
  );
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
      >
        <span
          aria-hidden="true"
          className={cn(
            'h-8 w-[3px] shrink-0 rounded-full',
            o.tutor_acknowledged ? 'bg-white/[0.25]' : 'bg-elec-yellow'
          )}
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {o.tutor_name_snapshot ?? 'Tutor'} · {KIND_LABEL[o.observation_kind]}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {[
              `By ${o.observer_name_snapshot ?? 'unknown'}`,
              fmtDate(o.observed_at),
              o.location,
              o.tutor_acknowledged ? null : 'awaiting tutor',
            ]
              .filter(Boolean)
              .join(' · ')}
          </span>
        </span>
        {o.grade && (
          <span className={cn('shrink-0 text-[12px] font-semibold', gradeTone(o.grade))}>
            {GRADE_LABEL[o.grade]}
          </span>
        )}
        <ChevronRight
          className={cn(
            'h-4 w-4 shrink-0 text-white transition-transform',
            open && 'rotate-90'
          )}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="space-y-3 px-4 pb-4 pl-[31px] text-[12.5px] leading-relaxed text-white sm:px-5 sm:pl-[35px]">
          {!hasDetail && <p>No written detail on this observation.</p>}
          {o.focus_area && (
            <p>
              <span className="font-semibold">Focus.</span> {o.focus_area}
            </p>
          )}
          {o.strengths && (
            <p>
              <span className="font-semibold">Strengths.</span> {o.strengths}
            </p>
          )}
          {o.areas_for_development && (
            <p>
              <span className="font-semibold">Development.</span> {o.areas_for_development}
            </p>
          )}
          {o.agreed_actions && o.agreed_actions.length > 0 && (
            <div>
              <span className="font-semibold">Agreed actions</span>
              <ul className="mt-1 list-disc space-y-0.5 pl-5">
                {o.agreed_actions.map((a, i) => (
                  <li key={i}>
                    {a.action}
                    {a.target_date ? ` · by ${fmtDate(a.target_date)}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </li>
  );
}

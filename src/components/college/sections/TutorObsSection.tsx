import { motion } from 'framer-motion';
import {
  useTutorObservations,
  type ObservationGrade,
  type ObservationKind,
} from '@/hooks/useTutorObservations';
import { Pill, SectionHeader, itemVariants, type Tone } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

/* ==========================================================================
   TutorObsSection — 360 view of observations OF tutors.
   ELE-935 (K3). Aggregates peer / IQA / HoD / learning walks / standardisation
   so a HoD can see at-a-glance which tutors have recent observations and
   which haven't.
   ========================================================================== */

const KIND_LABEL: Record<ObservationKind, string> = {
  peer: 'Peer obs',
  iqa: 'IQA',
  hod: 'HoD',
  learning_walk: 'Walk',
  standardisation: 'Standardisation',
  self: 'Self',
  external: 'External',
};

const GRADE_TONE: Record<ObservationGrade, Tone> = {
  outstanding: 'emerald',
  good: 'cyan',
  requires_improvement: 'amber',
  inadequate: 'red',
  developmental: 'blue',
};

const GRADE_LABEL: Record<ObservationGrade, string> = {
  outstanding: 'Outstanding',
  good: 'Good',
  requires_improvement: 'Requires improvement',
  inadequate: 'Inadequate',
  developmental: 'Developmental',
};

export function TutorObsSection() {
  const { rollup, observations, loading, error } = useTutorObservations();

  // Tutors with no observations in the last 12 months are an Ofsted risk —
  // surface them at the top.
  const tutorsWithoutObs = rollup
    .filter((r) => r.total_obs_12m === 0)
    .sort((a, b) => a.tutor_name.localeCompare(b.tutor_name));

  return (
    <motion.section variants={itemVariants} initial="hidden" animate="visible" className="space-y-4">
      <SectionHeader eyebrow="Quality assurance" title="Lesson observation 360" />
      <p className="text-[13px] text-white/70 leading-relaxed -mt-2">
        Peer, IQA, HoD, learning walks and standardisation observations across every tutor. Spot
        tutors who haven't been observed recently and review action points.
      </p>

      {loading && <div className="text-sm text-white/60">Loading…</div>}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {!loading && rollup.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center text-sm text-white/40">
          No observations recorded yet.
        </div>
      )}

      {!loading && rollup.length > 0 && (
        <>
          {/* Per-tutor rollup grid */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rollup.map((r) => (
              <div
                key={r.tutor_staff_id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-white">{r.tutor_name}</div>
                    <div className="mt-1 text-xs text-white/60">
                      {r.total_obs_12m} observation{r.total_obs_12m === 1 ? '' : 's'} · 12 months
                    </div>
                  </div>
                  {r.latest_grade && (
                    <Pill tone={GRADE_TONE[r.latest_grade]}>
                      {GRADE_LABEL[r.latest_grade]}
                    </Pill>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] text-white/60">
                  {r.peer_count > 0 && <Tag label={`${r.peer_count} peer`} />}
                  {r.iqa_count > 0 && <Tag label={`${r.iqa_count} IQA`} />}
                  {r.hod_count > 0 && <Tag label={`${r.hod_count} HoD`} />}
                  {r.walk_count > 0 && <Tag label={`${r.walk_count} walk`} />}
                  {r.standardisation_count > 0 && (
                    <Tag label={`${r.standardisation_count} stand.`} />
                  )}
                </div>
                {r.last_observed_at && (
                  <div className="mt-3 text-[11px] text-white/50">
                    Last: {new Date(r.last_observed_at).toLocaleDateString('en-GB')}
                  </div>
                )}
              </div>
            ))}
          </div>

          {tutorsWithoutObs.length > 0 && (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              <strong>Risk:</strong> {tutorsWithoutObs.length} tutor
              {tutorsWithoutObs.length === 1 ? '' : 's'} with no observation in the last 12 months —{' '}
              {tutorsWithoutObs.map((t) => t.tutor_name).join(', ')}.
            </div>
          )}

          {/* Recent observations list */}
          <SectionHeader eyebrow="Recent" title="Latest observations" />
          <ul className="space-y-2">
            {observations.slice(0, 12).map((o) => (
              <li
                key={o.id}
                className={cn(
                  'rounded-2xl border bg-white/5 p-4',
                  o.tutor_acknowledged ? 'border-white/10' : 'border-elec-yellow/30'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white">
                      {o.tutor_name_snapshot ?? 'Tutor'} ·{' '}
                      <span className="text-white/70">{KIND_LABEL[o.observation_kind]}</span>
                    </div>
                    <div className="mt-1 text-xs text-white/60">
                      Observed by {o.observer_name_snapshot ?? 'unknown'} on{' '}
                      {new Date(o.observed_at).toLocaleDateString('en-GB')}
                      {o.location ? ` · ${o.location}` : ''}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {o.grade && (
                      <Pill tone={GRADE_TONE[o.grade]}>{GRADE_LABEL[o.grade]}</Pill>
                    )}
                    {!o.tutor_acknowledged && <Pill tone="amber">Unacknowledged</Pill>}
                  </div>
                </div>
                {o.focus_area && (
                  <div className="mt-2 text-xs text-white/60">
                    <span className="text-white/40">Focus:</span> {o.focus_area}
                  </div>
                )}
                {(o.strengths || o.areas_for_development) && (
                  <div className="mt-2 grid gap-2 sm:grid-cols-2 text-xs">
                    {o.strengths && (
                      <div className="rounded-lg bg-black/20 p-2">
                        <div className="text-emerald-300 font-medium">Strengths</div>
                        <div className="mt-1 text-white/80">{o.strengths}</div>
                      </div>
                    )}
                    {o.areas_for_development && (
                      <div className="rounded-lg bg-black/20 p-2">
                        <div className="text-amber-300 font-medium">Development</div>
                        <div className="mt-1 text-white/80">{o.areas_for_development}</div>
                      </div>
                    )}
                  </div>
                )}
                {o.agreed_actions && o.agreed_actions.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-xs text-white/70 space-y-0.5">
                    {o.agreed_actions.map((a, i) => (
                      <li key={i}>
                        {a.action}
                        {a.target_date
                          ? ` · by ${new Date(a.target_date).toLocaleDateString('en-GB')}`
                          : ''}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </motion.section>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] font-medium text-white/70">
      {label}
    </span>
  );
}

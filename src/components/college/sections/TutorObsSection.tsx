import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import {
  useTutorObservations,
  type ObservationGrade,
  type ObservationKind,
  type TutorObservation,
} from '@/hooks/useTutorObservations';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_CARD,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { VIS_CARD, VisHead } from '@/components/college/student360/Student360Visuals';
import { BarList, Donut, StatusPill, type Tone } from '@/components/college/quality/QualityKit';
import { QualityLoading, QualityScreen } from '@/components/college/quality/QualityHubKit';

/* ==========================================================================
   TutorObsSection — observations OF tutors (ELE-935 K3). Peer, IQA, head of
   department, learning walks and standardisation in one place, so a head of
   department can see who has been observed recently and who has not.
   Content only; CollegeDashboard draws the masthead.
   ========================================================================== */

const KIND_LABEL: Record<ObservationKind, string> = {
  peer: 'Peer',
  iqa: 'IQA',
  hod: 'Head of department',
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

const GRADE_TONE: Record<ObservationGrade, Tone> = {
  outstanding: 'good',
  good: 'good',
  requires_improvement: 'warn',
  inadequate: 'bad',
  developmental: 'info',
};

const HELP: PageHelpContent = {
  id: 'college-lesson-observations',
  title: 'Lesson observations',
  what: 'Every observation of a tutor’s teaching in one place: peer, IQA, head of department, learning walks and standardisation. Use it to make sure every tutor is observed at least once a year and that actions are followed up.',
  steps: [
    { title: 'Check who is due', body: 'Tutors with no observation in the last 12 months sit at the top in orange. Arrange an observation for them first; this page records observations, it does not book them.' },
    { title: 'Look at the spread', body: 'The charts show the grades given and the kinds of observation, so you can see whether it is all peer reviews or a proper mix.' },
    { title: 'Read the detail', body: 'Tap an observation to see the focus, strengths, development points and agreed actions.' },
  ],
  notes: [
    { title: 'Awaiting tutor', body: 'The tutor has not yet acknowledged the write-up. Ask them to read and sign it.' },
    { title: 'Developmental', body: 'An ungraded observation for development only.' },
  ],
  legend: [
    { swatch: 'bg-emerald-500', label: 'Outstanding or good' },
    { swatch: 'bg-orange-400', label: 'Requires improvement' },
    { swatch: 'bg-red-500', label: 'Inadequate' },
    { swatch: 'bg-sky-400', label: 'Developmental' },
  ],
};

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

type ObsFilter = 'all' | 'awaiting' | 'concern' | 'inadequate';

export function TutorObsSection() {
  const { rollup, observations, loading, error } = useTutorObservations();
  const [openId, setOpenId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ObsFilter>('all');
  const [showAll, setShowAll] = useState(false);

  const view = useMemo(() => {
    const tutorsWithoutObs = rollup.filter((r) => r.total_obs_12m === 0);
    const sortedRollup = [...rollup].sort((a, b) => {
      const gap = Number(a.total_obs_12m > 0) - Number(b.total_obs_12m > 0);
      return gap !== 0 ? gap : a.tutor_name.localeCompare(b.tutor_name);
    });
    const unacknowledged = observations.filter((o) => !o.tutor_acknowledged).length;
    const obs12m = rollup.reduce((sum, r) => sum + r.total_obs_12m, 0);
    const concern = observations.filter((o) => o.grade === 'inadequate' || o.grade === 'requires_improvement').length;
    const inadequate = observations.filter((o) => o.grade === 'inadequate').length;
    const grades = new Map<ObservationGrade, number>();
    const kinds = new Map<ObservationKind, number>();
    for (const o of observations) {
      if (o.grade) grades.set(o.grade, (grades.get(o.grade) ?? 0) + 1);
      kinds.set(o.observation_kind, (kinds.get(o.observation_kind) ?? 0) + 1);
    }
    return { tutorsWithoutObs, sortedRollup, unacknowledged, obs12m, concern, inadequate, grades, kinds };
  }, [rollup, observations]);

  const listed = useMemo(() => {
    const base =
      filter === 'awaiting'
        ? observations.filter((o) => !o.tutor_acknowledged)
        : filter === 'concern'
          ? observations.filter((o) => o.grade === 'inadequate' || o.grade === 'requires_improvement')
          : filter === 'inadequate'
            ? observations.filter((o) => o.grade === 'inadequate')
            : observations;
    return showAll ? base : base.slice(0, 12);
  }, [observations, filter, showAll]);
  const listedTotal =
    filter === 'awaiting'
      ? view.unacknowledged
      : filter === 'concern'
        ? view.concern
        : filter === 'inadequate'
          ? view.inadequate
          : observations.length;

  const header = (
    <CollegePageHeader
      eyebrow="Quality & compliance"
      title="Lesson observations"
      description="Who has been observed teaching, how it went, and who is due. Every tutor should be observed at least once a year."
      help={HELP}
    />
  );

  if (loading) {
    return (
      <QualityScreen>
        {header}
        <QualityLoading />
      </QualityScreen>
    );
  }

  const covered = rollup.length - view.tutorsWithoutObs.length;

  return (
    <QualityScreen>
      {header}

      {error && <div className={cn(COLLEGE_CARD, 'border-red-400/40 text-[13px] text-white')}>Observations could not be loaded: {error}</div>}

      <CollegeStats
        items={[
          { label: 'Observations', value: String(view.obs12m), sub: `last 12 months, ${rollup.length} tutor${rollup.length === 1 ? '' : 's'}` },
          {
            label: 'Not observed',
            value: String(view.tutorsWithoutObs.length),
            sub: view.tutorsWithoutObs.length > 0 ? 'none in 12 months' : 'every tutor observed',
            warn: view.tutorsWithoutObs.length > 0,
          },
          {
            label: 'Awaiting tutor',
            value: String(view.unacknowledged),
            sub: view.unacknowledged > 0 ? 'not yet acknowledged' : 'all acknowledged',
            warn: view.unacknowledged > 0,
            onClick: () => setFilter('awaiting'),
          },
          {
            label: 'Inadequate',
            value: String(view.inadequate),
            sub: view.inadequate > 0 ? 'needs a follow-up plan' : 'none recorded',
            warn: view.inadequate > 0,
            onClick: () => setFilter('inadequate'),
          },
        ]}
      />

      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
        <motion.div variants={itemVariants} className={VIS_CARD}>
          <VisHead title="Tutors observed" sub="At least once in the last 12 months" />
          <div className="mt-4">
            <Donut
              emptyText="No tutors on the roll yet"
              centre={rollup.length > 0 ? `${Math.round((100 * covered) / rollup.length)}%` : '0'}
              centreSub="observed"
              segments={[
                { label: 'Observed', n: covered, tone: 'good' },
                { label: 'Not observed', n: view.tutorsWithoutObs.length, tone: 'warn' },
              ]}
            />
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className={VIS_CARD}>
          <VisHead title="Grades given" sub={`${observations.length} observation${observations.length === 1 ? '' : 's'} on record`} />
          <div className="mt-4">
            <Donut
              emptyText="No graded observations yet"
              centreSub="graded"
              segments={(Object.keys(GRADE_LABEL) as ObservationGrade[]).map((g) => ({
                label: GRADE_LABEL[g],
                n: view.grades.get(g) ?? 0,
                tone: g === 'outstanding' ? 'volt' : GRADE_TONE[g],
              }))}
            />
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className={VIS_CARD}>
          <VisHead title="Kinds of observation" sub="A mix is stronger evidence than one kind" />
          <div className="mt-4">
            {view.kinds.size === 0 ? (
              <Donut segments={[]} emptyText="Nothing observed yet" />
            ) : (
              <BarList
                rows={[...view.kinds.entries()]
                  .sort((a, b) => b[1] - a[1])
                  .map(([k, n]) => ({ label: KIND_LABEL[k] ?? k, n }))}
              />
            )}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-2 xl:gap-6">
        <section className="space-y-4">
          <CollegeSectionTitle
            title="By tutor"
            sub={
              rollup.length === 0
                ? undefined
                : view.tutorsWithoutObs.length > 0
                  ? `${view.tutorsWithoutObs.length} not observed in 12 months, shown first`
                  : `${rollup.length} tutor${rollup.length === 1 ? '' : 's'}, all observed`
            }
          />
          {view.sortedRollup.length === 0 ? (
            <CollegeEmpty title="No tutors yet" body="Tutors appear here once they are added to the college and observed." />
          ) : (
            <motion.ul variants={itemVariants} className={COLLEGE_LIST}>
              {view.sortedRollup.map((r) => {
                const none = r.total_obs_12m === 0;
                const breakdown = [
                  r.peer_count > 0 ? `${r.peer_count} peer` : null,
                  r.iqa_count > 0 ? `${r.iqa_count} IQA` : null,
                  r.hod_count > 0 ? `${r.hod_count} head of dept` : null,
                  r.walk_count > 0 ? `${r.walk_count} walk` : null,
                  r.standardisation_count > 0 ? `${r.standardisation_count} standardisation` : null,
                ]
                  .filter(Boolean)
                  .join(' · ');
                return (
                  <li key={r.tutor_staff_id} className="flex min-h-[64px] items-center gap-3 px-5 py-3 sm:px-6">
                    <span aria-hidden className={cn('h-9 w-1 shrink-0 rounded-full', none ? 'bg-orange-400' : 'bg-white/[0.14]')} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14.5px] font-semibold leading-tight text-white">{r.tutor_name}</span>
                      <span className="mt-1 block truncate text-[12.5px] leading-tight text-white">
                        {none
                          ? 'No observation in the last 12 months'
                          : `${r.total_obs_12m} in 12 months${breakdown ? ` · ${breakdown}` : ''}${r.last_observed_at ? ` · last ${fmtDate(r.last_observed_at)}` : ''}`}
                      </span>
                    </span>
                    {none ? (
                      <StatusPill tone="warn">Due</StatusPill>
                    ) : r.latest_grade ? (
                      <StatusPill tone={GRADE_TONE[r.latest_grade]}>{GRADE_LABEL[r.latest_grade]}</StatusPill>
                    ) : null}
                  </li>
                );
              })}
            </motion.ul>
          )}
        </section>

        <section className="space-y-4">
          <CollegeSectionTitle title="Latest observations" sub={`${listedTotal} ${filter === 'all' ? 'on record' : 'match'}`} />
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {(
              [
                ['all', `All · ${observations.length}`],
                ['awaiting', `Awaiting tutor · ${view.unacknowledged}`],
                ['concern', `Below good · ${view.concern}`],
                ['inadequate', `Inadequate · ${view.inadequate}`],
              ] as Array<[ObsFilter, string]>
            ).map(([k, label]) => (
              <button key={k} type="button" className={chipCn(filter === k)} onClick={() => setFilter(k)}>
                {label}
              </button>
            ))}
          </div>
          {listed.length === 0 ? (
            <CollegeEmpty
              title={observations.length === 0 ? 'Nothing observed yet' : 'Nothing matches'}
              body={
                observations.length === 0
                  ? 'Observations recorded by peers, IQA, heads of department and learning walks appear here.'
                  : 'Try All to see every observation.'
              }
            />
          ) : (
            <motion.ul variants={itemVariants} className={COLLEGE_LIST}>
              {listed.map((o) => (
                <ObservationRow key={o.id} o={o} open={openId === o.id} onToggle={() => setOpenId((v) => (v === o.id ? null : o.id))} />
              ))}
            </motion.ul>
          )}
          {!showAll && listedTotal > 12 && (
            <button type="button" onClick={() => setShowAll(true)} className="h-11 px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation">
              Show all {listedTotal}
            </button>
          )}
        </section>
      </div>
    </QualityScreen>
  );
}

/** Tap to open the detail: focus, strengths, development, agreed actions. */
function ObservationRow({ o, open, onToggle }: { o: TutorObservation; open: boolean; onToggle: () => void }) {
  const hasDetail = !!(o.focus_area || o.strengths || o.areas_for_development || (o.agreed_actions && o.agreed_actions.length > 0));
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex min-h-[64px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-6"
      >
        <span aria-hidden className={cn('h-9 w-1 shrink-0 rounded-full', o.tutor_acknowledged ? 'bg-white/[0.14]' : 'bg-orange-400')} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14.5px] font-semibold leading-tight text-white">
            {o.tutor_name_snapshot ?? 'Tutor'} · {KIND_LABEL[o.observation_kind]}
          </span>
          <span className="mt-1 block truncate text-[12.5px] leading-tight text-white">
            {[`By ${o.observer_name_snapshot ?? 'unknown'}`, fmtDate(o.observed_at), o.location, o.tutor_acknowledged ? null : 'awaiting tutor']
              .filter(Boolean)
              .join(' · ')}
          </span>
        </span>
        {o.grade && <StatusPill tone={GRADE_TONE[o.grade]} className="hidden sm:inline-flex">{GRADE_LABEL[o.grade]}</StatusPill>}
        <ChevronRight className={cn('h-4 w-4 shrink-0 text-white transition-transform', open && 'rotate-90')} aria-hidden />
      </button>
      {open && (
        <div className="space-y-3 px-5 pb-4 text-[13px] leading-relaxed text-white sm:px-6 sm:pl-[44px]">
          {o.grade && <StatusPill tone={GRADE_TONE[o.grade]} className="sm:hidden">{GRADE_LABEL[o.grade]}</StatusPill>}
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

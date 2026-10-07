import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownAZ, ArrowDown01, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_CARD,
  COLLEGE_LIST,
  COLLEGE_BTN,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';
import { getActingCollegeId } from '@/hooks/college/useCollegeAccess';
import { useCohortEpaReadiness, type CohortLearner } from '@/hooks/useCohortEpaReadiness';
import { EpaCalibrationCard } from '@/components/college/student360/EpaCalibrationCard';
import { EPA_STATUS_LABEL, type EpaReadinessStatus } from '@/lib/epa/readiness';
import { VERDICT_LABEL, ageLabel } from '@/hooks/college/epaReadinessModels';
import { GatewayMeetingSheet } from '@/components/college/sheets/GatewayMeetingSheet';
import { useMyLearners } from '@/components/college/assessment/useMyLearners';
import {
  Bars,
  Pipeline,
  ScopeToggle,
  initialsOf,
  useScope,
} from '@/components/college/assessment/AssessmentKit';
import {
  BGatewayReadiness,
  readinessItems,
  type GatewayFix,
} from '@/components/college/assessment/BGatewayReadiness';

/* ==========================================================================
   CohortEpaPage — /college/epa
   One line per apprentice answering "who, why, what next": the shared
   readiness model (AM2S practice + gateway — what the learner sees), the
   one effective verdict (tutor, else the assisted prediction), and every
   gateway item still to do as a link to where it gets fixed (ELE-1872).

   6 Oct 2026: counts, sort and filters all use the effective verdict. Before,
   the "Ready" filter matched if ANY voice said ready (the learner's own
   included) while the tiles used tutor→AI→learner, so a tile could say 2
   Ready while the filter showed 4.

   7 Oct 2026: rebuilt on the College kit. Mine first (ELE-1886), the
   readiness pipeline and verdict spread as charts, and the gateway items
   readable per learner with each orange item one tap from its fix.
   ========================================================================== */

type SortKey = 'readiness' | 'name' | 'age' | 'todo';
type FilterKey = 'all' | 'sign_off' | 'ready' | 'almost' | 'not_yet' | 'refer' | 'no_verdict';

const STAGES: Array<{ key: EpaReadinessStatus | 'none'; cls: string }> = [
  { key: 'none', cls: 'bg-white/40' },
  { key: 'starting', cls: 'bg-white' },
  { key: 'building', cls: 'bg-sky-400' },
  { key: 'am2_ready', cls: 'bg-sky-300' },
  { key: 'gateway_ready', cls: 'bg-elec-yellow' },
  { key: 'gateway_passed', cls: 'bg-emerald-500' },
];

const HELP: PageHelpContent = {
  id: 'college-cohort-epa',
  title: 'Gateway readiness',
  what: 'Every apprentice’s road to end-point assessment on one page: how far through their practice and portfolio they are, which gateway items are still open, and the verdict on whether they are ready.',
  steps: [
    {
      title: 'Start with your learners',
      body: 'My learners shows the cohorts you lead. Switch to Everyone for the whole college.',
    },
    {
      title: 'Read the orange items',
      body: 'Each learner lists what the gateway still needs. Tap an orange item to go straight to where it is fixed: their portfolio, hours, or the gateway checklist.',
    },
    {
      title: 'Sign off the verdict',
      body: 'When the assisted prediction is newer than yours, the learner shows Needs your sign-off. Open them and record your verdict.',
    },
  ],
  legend: [
    {
      swatch: 'bg-orange-400',
      label: 'Still to do',
      body: 'A gateway item that is not done yet. Tap it to fix it.',
    },
    {
      swatch: 'bg-emerald-400',
      label: 'Done',
      body: 'Recorded on the gateway checklist or met by the record.',
    },
    {
      swatch: 'bg-elec-yellow',
      label: 'Sign-offs done',
      body: 'Every gateway item is ticked; ready to put forward.',
    },
  ],
  notes: [
    {
      title: 'The verdict',
      body: 'The tutor’s verdict counts. Where there is none, the assisted prediction shows, marked as a prediction, until a tutor signs it off.',
    },
    {
      title: 'Same picture as the learner',
      body: 'Readiness is the model the apprentice sees in their own app, so you are both looking at the same thing.',
    },
  ],
};

export default function CohortEpaPage() {
  const navigate = useNavigate();
  const [collegeId, setCollegeId] = useState<string | null>(null);
  const [collegeChecked, setCollegeChecked] = useState(false);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setCollegeChecked(true);
        return;
      }
      // The college being acted for first, then an active staff row (what the
      // data rules check), then the profile.
      let id = getActingCollegeId();
      if (!id) {
        const { data: staff } = await supabase
          .from('college_staff')
          .select('college_id')
          .eq('user_id', user.id)
          .is('archived_at', null)
          .limit(1)
          .maybeSingle();
        id = (staff as { college_id?: string | null } | null)?.college_id ?? null;
      }
      if (!id) {
        id = await getMyCollegeId(user.id).catch(() => null);
      }
      setCollegeId(id);
      setCollegeChecked(true);
    })();
  }, []);

  const { learners, loading, error, refresh } = useCohortEpaReadiness({ collegeId });
  const my = useMyLearners();
  const [scope, setScope] = useScope('cohort-epa', my);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [stage, setStage] = useState<string>('all');
  const [sort, setSort] = useState<SortKey>('readiness');
  const [query, setQuery] = useState('');
  const [cohort, setCohort] = useState<string>('all');
  const [cohortNames, setCohortNames] = useState<Map<string, string>>(new Map());
  const [epaIdByStudent, setEpaIdByStudent] = useState<Map<string, string>>(new Map());
  const [gateway, setGateway] = useState<{ epaId: string; studentId: string } | null>(null);

  useEffect(() => {
    const ids = Array.from(new Set(learners.map((l) => l.cohort_id).filter(Boolean) as string[]));
    if (ids.length === 0) return;
    void supabase
      .from('college_cohorts')
      .select('id, name')
      .in('id', ids)
      .then(({ data }) =>
        setCohortNames(
          new Map(((data ?? []) as Array<{ id: string; name: string }>).map((c) => [c.id, c.name]))
        )
      );
  }, [learners]);

  // The EPA record per learner, so the gateway checklist opens in place.
  useEffect(() => {
    const ids = learners.map((l) => l.id);
    if (ids.length === 0) return;
    void supabase
      .from('college_epa')
      .select('id, student_id')
      .in('student_id', ids)
      .then(({ data }) =>
        setEpaIdByStudent(
          new Map(
            ((data ?? []) as Array<{ id: string; student_id: string }>).map((e) => [
              e.student_id,
              e.id,
            ])
          )
        )
      );
  }, [learners]);

  const isMine = (l: CohortLearner) => my.isMine({ studentId: l.id, cohortId: l.cohort_id });
  const scoped = useMemo(
    () => (scope === 'mine' ? learners.filter(isMine) : learners),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [learners, scope, my.studentIds, my.cohortIds]
  );
  const mineCount = useMemo(
    () => learners.filter(isMine).length, // eslint-disable-next-line react-hooks/exhaustive-deps
    [learners, my.studentIds, my.cohortIds]
  );

  const verdictOf = (l: CohortLearner) => l.effective?.judgement.verdict ?? null;
  const stageOf = (l: CohortLearner) => l.readiness?.status ?? 'none';
  const todoOf = (l: CohortLearner) => readinessItems(l).filter((i) => !i.done).length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = scoped.filter(
      (l) =>
        (cohort === 'all' || l.cohort_id === cohort) &&
        (stage === 'all' || stageOf(l) === stage) &&
        (!q || l.name.toLowerCase().includes(q) || (l.course_code ?? '').toLowerCase().includes(q))
    );
    if (filter === 'sign_off') list = list.filter((l) => l.needs_sign_off);
    else if (filter === 'no_verdict') list = list.filter((l) => !l.effective);
    else if (filter !== 'all') list = list.filter((l) => verdictOf(l) === filter);

    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'age')
      list.sort(
        (a, b) =>
          new Date(a.effective?.judgement.created_at ?? 0).getTime() -
          new Date(b.effective?.judgement.created_at ?? 0).getTime()
      );
    else if (sort === 'todo') list.sort((a, b) => todoOf(a) - todoOf(b));
    else list.sort((a, b) => (b.readiness?.score ?? -1) - (a.readiness?.score ?? -1));
    return list;
  }, [scoped, filter, sort, query, cohort, stage]);

  const counts = useMemo(() => {
    const c = { ready: 0, almost: 0, not_yet: 0, refer: 0, no_verdict: 0, sign_off: 0 };
    for (const l of scoped) {
      const v = verdictOf(l);
      if (!v) c.no_verdict += 1;
      else if (v in c) c[v as 'ready' | 'almost' | 'not_yet' | 'refer'] += 1;
      if (l.needs_sign_off) c.sign_off += 1;
    }
    return c;
  }, [scoped]);

  const stageCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const l of scoped) m.set(stageOf(l), (m.get(stageOf(l)) ?? 0) + 1);
    return m;
  }, [scoped]);
  const allClear = scoped.filter((l) => l.readiness && todoOf(l) === 0).length;
  const withGatewayDate = scoped.filter((l) => l.gateway_date).length;

  const cohortOptions = Array.from(cohortNames.entries()).sort((a, b) => a[1].localeCompare(b[1]));

  const fix = (l: CohortLearner, f: GatewayFix) => {
    if (f.kind === 'path') {
      navigate(f.to);
      return;
    }
    if (f.kind === 'gateway') {
      const epaId = epaIdByStudent.get(l.id);
      if (epaId) {
        setGateway({ epaId, studentId: l.id });
        return;
      }
      navigate(`/college/students/${l.id}#epa`);
      return;
    }
    navigate(`/college/students/${l.id}${f.hash ? `#${f.hash}` : ''}`);
  };

  const filterOpts: Array<[FilterKey, string, number]> = [
    ['all', 'All', scoped.length],
    ['sign_off', 'Needs your sign-off', counts.sign_off],
    ['ready', 'Ready', counts.ready],
    ['almost', 'Almost', counts.almost],
    ['not_yet', 'Not yet', counts.not_yet],
    ['refer', 'Refer', counts.refer],
    ['no_verdict', 'No verdict', counts.no_verdict],
  ];

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title="Gateway readiness"
        backTo="/college?section=assessmenthub"
      />
      <HubBody pushContext="Get notified when an apprentice is ready for gateway">
        <CollegePageHeader
          eyebrow="End-point assessment"
          title="Gateway readiness"
          description="Who is ready, who is close, and exactly what each apprentice still needs before gateway. Tap anything orange to fix it."
          help={HELP}
          actions={
            <ScopeToggle
              scope={scope}
              onChange={setScope}
              my={my}
              mineCount={mineCount}
              allCount={learners.length}
            />
          }
        />

        <CollegeStats
          items={[
            {
              label: 'Needs your sign-off',
              value: String(counts.sign_off),
              sub: counts.sign_off ? 'Prediction newer than your verdict' : 'All verdicts signed',
              warn: counts.sign_off > 0,
              onClick: () => setFilter('sign_off'),
            },
            {
              label: 'Ready',
              value: String(counts.ready),
              sub: `${counts.almost} almost`,
              good: counts.ready > 0,
              onClick: () => setFilter('ready'),
            },
            {
              label: 'Every gateway item done',
              value: String(allClear),
              sub: `of ${scoped.length} apprentices`,
              good: allClear > 0,
            },
            {
              label: 'Gateway dates set',
              value: String(withGatewayDate),
              sub: withGatewayDate ? 'Dates in the diary' : 'None booked yet',
            },
          ]}
        />

        <section className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className={cn(COLLEGE_CARD, 'h-full')}>
            <CollegeSectionTitle
              title="Where they are"
              sub="Each apprentice on the road to gateway. Tap a stage to list them."
              action={
                stage !== 'all' ? (
                  <button
                    type="button"
                    onClick={() => setStage('all')}
                    className="h-11 px-1 text-[13px] font-semibold text-elec-yellow"
                  >
                    Show all
                  </button>
                ) : undefined
              }
            />
            <div className="mt-5">
              <Pipeline
                stages={STAGES.map((s) => ({
                  key: s.key,
                  label: s.key === 'none' ? 'No account' : EPA_STATUS_LABEL[s.key],
                  n: stageCounts.get(s.key) ?? 0,
                  cls: s.cls,
                }))}
                onPick={(k) => setStage(k === stage ? 'all' : k)}
              />
            </div>
          </div>
          <div className={cn(COLLEGE_CARD, 'h-full')}>
            <CollegeSectionTitle
              title="The verdicts"
              sub="Tutor’s verdict, else the assisted prediction."
            />
            <div className="mt-4">
              <Bars
                rows={[
                  { key: 'ready', label: 'Ready', n: counts.ready, cls: 'bg-emerald-500' },
                  { key: 'almost', label: 'Almost', n: counts.almost, cls: 'bg-elec-yellow' },
                  { key: 'not_yet', label: 'Not yet', n: counts.not_yet, cls: 'bg-orange-400' },
                  { key: 'refer', label: 'Refer', n: counts.refer, cls: 'bg-orange-600' },
                  {
                    key: 'no_verdict',
                    label: 'No verdict',
                    n: counts.no_verdict,
                    cls: 'bg-white/50',
                  },
                ]}
                labelWidth="6.5rem"
                onPick={(k) => setFilter(k as FilterKey)}
              />
            </div>
          </div>
        </section>

        <EpaCalibrationCard collegeId={collegeId} />

        <section className="space-y-4">
          <CollegeSectionTitle
            title="Apprentices"
            sub={`${filtered.length} shown${scope === 'mine' ? ' from your cohorts' : ''}`}
            action={
              <button
                type="button"
                onClick={() =>
                  setSort(
                    sort === 'readiness'
                      ? 'todo'
                      : sort === 'todo'
                        ? 'name'
                        : sort === 'name'
                          ? 'age'
                          : 'readiness'
                  )
                }
                className={COLLEGE_BTN}
              >
                {sort === 'name' ? (
                  <ArrowDownAZ className="h-4 w-4" />
                ) : (
                  <ArrowDown01 className="h-4 w-4" />
                )}
                {sort === 'readiness'
                  ? 'Most ready'
                  : sort === 'todo'
                    ? 'Fewest to do'
                    : sort === 'name'
                      ? 'Name'
                      : 'Oldest verdict'}
              </button>
            }
          />
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <label className="relative flex-1">
              <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find an apprentice or course"
                aria-label="Search learners"
                className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
              />
            </label>
            {cohortOptions.length > 1 && (
              <select
                value={cohort}
                onChange={(e) => setCohort(e.target.value)}
                aria-label="Cohort"
                className="h-11 rounded-xl border border-white/[0.15] bg-background px-3 text-[14px] text-white [color-scheme:dark] touch-manipulation lg:w-72"
              >
                <option value="all">All cohorts</option>
                {cohortOptions.map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {filterOpts.map(([k, label, n]) => (
              <button
                key={k}
                type="button"
                aria-pressed={filter === k}
                onClick={() => setFilter(k)}
                className={chipCn(filter === k)}
              >
                {label} <span className="tabular-nums">{n}</span>
              </button>
            ))}
          </div>

          {!collegeChecked || (loading && !!collegeId) ? (
            <div className="space-y-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-[120px] animate-pulse rounded-3xl bg-white/[0.04]" />
              ))}
            </div>
          ) : !collegeId ? (
            <CollegeEmpty
              title="No college linked"
              body="Your account isn’t linked to a college, so there’s no cohort to show."
            />
          ) : error ? (
            <CollegeEmpty
              title="Couldn’t load the cohort"
              body={error}
              action={
                <button type="button" onClick={() => void refresh()} className={COLLEGE_BTN}>
                  Try again
                </button>
              }
            />
          ) : learners.length === 0 ? (
            <CollegeEmpty
              title="No apprentices on programme yet"
              body="Add learners to a cohort and their readiness shows here."
            />
          ) : filtered.length === 0 ? (
            <CollegeEmpty
              title="Nobody matches this view"
              body={
                scope === 'mine'
                  ? 'Try Everyone, another filter, or clear the search.'
                  : 'Try another filter or clear the search.'
              }
            />
          ) : (
            <ul className={COLLEGE_LIST}>
              {filtered.map((l) => (
                <li key={l.id}>
                  <LearnerRow
                    learner={l}
                    mine={scope === 'all' && isMine(l)}
                    cohortName={l.cohort_id ? cohortNames.get(l.cohort_id) : undefined}
                    onOpen={() => navigate(`/college/students/${l.id}#epa`)}
                    onFix={(f) => fix(l, f)}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>

        <GatewayMeetingSheet
          epaId={gateway?.epaId ?? null}
          studentId={gateway?.studentId ?? null}
          open={!!gateway}
          onOpenChange={(o) => {
            if (!o) {
              setGateway(null);
              void refresh();
            }
          }}
        />
      </HubBody>
    </HubPage>
  );
}

/* ────────────────────────────────────────────────────────
   Row: who, verdict, next step | the gateway items
   ──────────────────────────────────────────────────────── */

function LearnerRow({
  learner: l,
  cohortName,
  mine,
  onOpen,
  onFix,
}: {
  learner: CohortLearner;
  cohortName?: string;
  mine: boolean;
  onOpen: () => void;
  onFix: (f: GatewayFix) => void;
}) {
  const eff = l.effective;
  const v = eff?.judgement.verdict;
  const age = ageLabel(eff?.judgement.created_at);
  const r = l.readiness;
  const bad = v === 'refer' || v === 'not_yet';
  return (
    <div className="grid grid-cols-1 gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-6">
      <button
        type="button"
        onClick={onOpen}
        className="flex min-w-0 items-start gap-3 text-left touch-manipulation group"
      >
        <span
          aria-hidden="true"
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[13.5px] font-bold',
            l.needs_sign_off ? 'bg-orange-500 text-black' : 'bg-white/[0.1] text-white'
          )}
        >
          {initialsOf(l.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="truncate text-[15px] font-semibold text-white group-hover:underline">
              {l.name}
            </span>
            {mine && (
              <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10.5px] font-bold text-black">
                Yours
              </span>
            )}
            {l.needs_sign_off && (
              <span className="shrink-0 rounded-full bg-orange-500 px-2 py-0.5 text-[10.5px] font-bold text-black">
                Needs your sign-off
              </span>
            )}
          </span>
          <span className="mt-0.5 block truncate text-[12.5px] text-white">
            {[
              l.course_code,
              cohortName,
              l.gateway_date ? `Gateway ${formatDate(l.gateway_date)}` : null,
            ]
              .filter(Boolean)
              .join(' · ')}
          </span>
          <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-white">
            {r ? (
              <span className="inline-flex items-center gap-2">
                <span className="relative h-1.5 w-16 overflow-hidden rounded-full bg-white/[0.1]">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-elec-yellow"
                    style={{ width: `${Math.max(0, Math.min(100, r.score))}%` }}
                  />
                </span>
                <span className="font-semibold tabular-nums">{r.score}</span>{' '}
                {EPA_STATUS_LABEL[r.status]}
              </span>
            ) : (
              <span>No account linked</span>
            )}
            <span className={cn('font-semibold', bad && 'text-orange-300')}>
              {eff && v
                ? `${eff.isPrediction ? 'Prediction' : 'Tutor'}: ${VERDICT_LABEL[v] ?? v}${age ? ` · ${age}` : ''}`
                : 'No verdict'}
            </span>
          </span>
          {(l.next_action || l.top_blocker) && (
            <span className="mt-1.5 line-clamp-2 block text-[13px] leading-snug text-white">
              {l.next_action ? (
                <>
                  <span className="font-semibold">Next:</span> {l.next_action.action}
                  {l.next_action.target_date && ` (by ${formatDate(l.next_action.target_date)})`}
                </>
              ) : (
                <>
                  <span className="font-semibold">Blocker:</span> {l.top_blocker}
                </>
              )}
            </span>
          )}
        </span>
      </button>
      <div className="min-w-0 lg:border-l lg:border-white/[0.06] lg:pl-6">
        <BGatewayReadiness learner={l} onFix={onFix} />
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  // Date-only strings are local dates, not UTC midnight.
  const d = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(`${iso}T00:00:00`) : new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

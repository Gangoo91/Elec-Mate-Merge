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
} from '@/components/college/ui/CollegeUi';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';
import { getActingCollegeId } from '@/hooks/college/useCollegeAccess';
import { useCohortEpaReadiness, type CohortLearner } from '@/hooks/useCohortEpaReadiness';
import { EpaCalibrationCard } from '@/components/college/student360/EpaCalibrationCard';
import { EPA_STATUS_LABEL, type EpaReadinessStatus } from '@/lib/epa/readiness';
import { VERDICT_LABEL, ageLabel } from '@/hooks/college/epaReadinessModels';
import { TextTabs } from '@/components/college/assessment/AssessmentTabs';
import { GatewayMeetingSheet } from '@/components/college/sheets/GatewayMeetingSheet';
import { useMyLearners } from '@/components/college/assessment/useMyLearners';
import { ScopeToggle, initialsOf, useScope } from '@/components/college/assessment/AssessmentKit';
import {
  BGatewayReadiness,
  readinessItems,
  type CriteriaPassed,
  type GatewayFix,
} from '@/components/college/assessment/BGatewayReadiness';
import {
  passedOf,
  useCollegePortfolioOverview,
} from '@/components/college/portfolio/useCollegePortfolioOverview';
import { useGatewayForecastMany } from '@/hooks/epa/useGatewayForecast';
import {
  FORECAST_HELP_NOTE,
  forecastSortKey,
  isOffPace,
  type GatewayForecast,
} from '@/lib/epa/gatewayForecast';
import { GatewayForecastLine } from '@/components/college/student360/GatewayForecastPanel';
import { FigureLine } from '@/components/college/QueueFigures';

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

type SortKey = 'readiness' | 'forecast' | 'name' | 'age' | 'todo';
type FilterKey =
  'all' | 'sign_off' | 'off_pace' | 'ready' | 'almost' | 'not_yet' | 'refer' | 'no_verdict';

const VERDICT_ROWS: Array<{
  key: 'ready' | 'almost' | 'not_yet' | 'refer' | 'no_verdict';
  label: string;
  cls: string;
}> = [
  { key: 'ready', label: 'Ready', cls: 'bg-emerald-400' },
  { key: 'almost', label: 'Almost', cls: 'bg-elec-yellow' },
  { key: 'not_yet', label: 'Not yet', cls: 'bg-orange-400' },
  { key: 'refer', label: 'Refer', cls: 'bg-orange-600' },
  { key: 'no_verdict', label: 'No verdict yet', cls: 'bg-white/50' },
];

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
      body: 'My learners shows the cohorts you lead. Switch to Whole college for the whole college.',
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
    FORECAST_HELP_NOTE,
    {
      title: 'Sort by forecast, filter Off pace',
      body: 'The sort button steps through to Soonest forecast: the earliest gateway forecast first, with anyone who will not get there at this pace last. Off pace lists everyone behind or close to their planned end.',
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
  // Criteria passed per learner, from get_portfolio_ac_state on the server.
  const { data: overview } = useCollegePortfolioOverview();
  const criteriaOf = useMemo(() => {
    const m = new Map<string, CriteriaPassed>();
    for (const x of overview?.learners ?? [])
      if (x.criteria)
        m.set(x.student_id, { passed: passedOf(x.criteria), total: x.criteria.total });
    return (id: string) => m.get(id) ?? null;
  }, [overview]);
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

  // When each learner will be ready at this pace (get_gateway_forecast_many).
  const { data: forecasts, isLoading: forecastsLoading } = useGatewayForecastMany(
    learners.map((l) => l.user_id ?? '').filter(Boolean)
  );
  const forecastOf = (l: CohortLearner): GatewayForecast | null =>
    (l.user_id && forecasts?.[l.user_id]) || null;

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
  const todoOf = (l: CohortLearner) =>
    readinessItems(l, criteriaOf(l.id)).filter((i) => !i.done).length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = scoped.filter(
      (l) =>
        (cohort === 'all' || l.cohort_id === cohort) &&
        (stage === 'all' || stageOf(l) === stage) &&
        (!q || l.name.toLowerCase().includes(q) || (l.course_code ?? '').toLowerCase().includes(q))
    );
    if (filter === 'sign_off') list = list.filter((l) => l.needs_sign_off);
    else if (filter === 'off_pace') list = list.filter((l) => isOffPace(forecastOf(l)));
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
    else if (sort === 'forecast')
      list.sort((a, b) => forecastSortKey(forecastOf(a)) - forecastSortKey(forecastOf(b)));
    else list.sort((a, b) => (b.readiness?.score ?? -1) - (a.readiness?.score ?? -1));
    return list;
    // todoOf reads criteriaOf, which is listed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scoped, filter, sort, query, cohort, stage, criteriaOf, forecasts]);

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

  // The figures as one status line (showcase pass, 10 Oct).
  const ready = !(!collegeChecked || (loading && learners.length === 0));
  const offPace = scoped.filter((l) => isOffPace(forecastOf(l))).length;
  const summary = !ready ? (
    'Who is ready, who is close, and what each apprentice still needs before gateway.'
  ) : (
    <FigureLine
      items={[
        {
          n: scoped.length,
          label: scoped.length === 1 ? 'apprentice' : 'apprentices',
        },
        counts.sign_off > 0
          ? { n: counts.sign_off, label: 'to sign off', tone: 'warn' }
          : { n: null, label: 'No sign-offs waiting', tone: 'good' },
        { n: allClear, label: 'with every item done', tone: allClear ? 'good' : undefined },
        withGatewayDate > 0
          ? { n: withGatewayDate, label: 'with a gateway date' }
          : offPace > 0
            ? { n: offPace, label: 'behind the forecast' }
            : { n: null, label: '' },
      ]}
    />
  );
  // Where the cohort is, in words: the furthest step reached and the biggest group.
  const furthest = [...STAGES].reverse().find((st) => (stageCounts.get(st.key) ?? 0) > 0);
  const stageName = (k: string) =>
    k === 'none' ? 'no account' : EPA_STATUS_LABEL[k as EpaReadinessStatus].toLowerCase();
  const occupied = STAGES.filter((st) => (stageCounts.get(st.key) ?? 0) > 0)
    .map((st) => `${stageCounts.get(st.key)} ${stageName(st.key)}`)
    .join(', ');
  const roadLine =
    scoped.length === 0
      ? 'Each apprentice on the road to gateway.'
      : furthest && ['none', 'starting', 'building'].includes(furthest.key)
        ? `Early days: ${occupied}. Nobody at AM2 practice yet.`
        : `${occupied}. Tap a step to list them.`;
  // The gateway items most often still open across the cohort: where the
  // cohort as a whole needs teaching or sign-off next.
  const commonGaps = (() => {
    const m = new Map<string, { label: string; n: number }>();
    for (const l of scoped) {
      if (!l.readiness) continue;
      for (const i of readinessItems(l, criteriaOf(l.id)))
        if (!i.done) m.set(i.key, { label: i.label, n: (m.get(i.key)?.n ?? 0) + 1 });
    }
    return [...m.values()].sort((a, b) => b.n - a.n).slice(0, 3);
  })();
  const withAccount = scoped.filter((l) => l.readiness).length;
  const judged = counts.ready + counts.almost + counts.not_yet + counts.refer;
  const verdictLine =
    judged === 0
      ? 'No verdicts yet. They come once there is evidence to judge.'
      : `${judged} judged so far, by the tutor or the assisted prediction.`;

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
      navigate(`/college?section=student360&studentId=${l.id}#epa`);
      return;
    }
    navigate(`/college?section=student360&studentId=${l.id}${f.hash ? `#${f.hash}` : ''}`);
  };

  const filterOpts: Array<[FilterKey, string, number]> = [
    ['all', 'All', scoped.length],
    ['sign_off', 'Needs your sign-off', counts.sign_off],
    ['off_pace', 'Off pace', scoped.filter((l) => isOffPace(forecastOf(l))).length],
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
          description={summary}
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

        {/* On a phone the apprentices come first; the charts follow them. */}
        <div className="flex flex-col gap-8 sm:gap-10">
          {/* Showcase pass (10 Oct): one card, the road on the left and the
              verdicts beside it, read in plain words so an early cohort
              (mostly zeros) still says something useful. */}
          <section className="order-last flex flex-col gap-4 sm:order-none">
            <div className={cn(COLLEGE_CARD, 'p-0 sm:p-0')}>
              <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                <div className="min-w-0 p-5 sm:p-6">
                  <CollegeSectionTitle
                    title="Where they are"
                    sub={roadLine}
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
                  <div
                    className="mt-5 flex h-2.5 gap-[3px] overflow-hidden rounded-full bg-white/[0.06]"
                    aria-hidden
                  >
                    {STAGES.map((st) => {
                      const n = stageCounts.get(st.key) ?? 0;
                      return n > 0 ? (
                        <div key={st.key} className={st.cls} style={{ flexGrow: n }} />
                      ) : null;
                    })}
                  </div>
                  <ol className="mt-4 grid grid-cols-3 gap-x-3 gap-y-3 sm:grid-cols-6">
                    {STAGES.map((st, i) => {
                      const n = stageCounts.get(st.key) ?? 0;
                      const on = stage === st.key;
                      return (
                        <li key={st.key} className="min-w-0">
                          <button
                            type="button"
                            onClick={() => setStage(on ? 'all' : st.key)}
                            aria-pressed={on}
                            className={cn(
                              'block min-h-11 w-full rounded-lg py-1 text-left touch-manipulation transition-colors hover:bg-white/[0.04]',
                              on && 'bg-white/[0.06]'
                            )}
                          >
                            <span className="flex items-center gap-1.5">
                              <span
                                aria-hidden
                                className={cn(
                                  'h-2 w-2 shrink-0 rounded-full',
                                  n > 0 ? st.cls : 'bg-white/[0.18]'
                                )}
                              />
                              <span className="text-[12px] font-medium text-white">
                                Step {i + 1}
                              </span>
                            </span>
                            <span className="mt-1 block text-[22px] font-bold leading-none tabular-nums text-white">
                              {n}
                            </span>
                            <span className="mt-1 block text-[12.5px] leading-tight text-white">
                              {st.key === 'none' ? 'No account' : EPA_STATUS_LABEL[st.key]}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                  {commonGaps.length > 0 && (
                    <div className="mt-5 border-t border-white/[0.06] pt-4">
                      <p className="text-[13px] font-semibold text-white">Most often still open</p>
                      <ul className="mt-1">
                        {commonGaps.map((g) => (
                          <li
                            key={g.label}
                            className="flex items-center gap-2.5 py-1.5 text-[13.5px] text-white"
                          >
                            <span
                              aria-hidden
                              className="h-2 w-2 shrink-0 rounded-full bg-orange-400"
                            />
                            <span className="min-w-0 flex-1 truncate">{g.label}</span>
                            <span className="shrink-0 tabular-nums">
                              <b className="font-semibold">{g.n}</b> of {withAccount}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="min-w-0 border-t border-white/[0.08] p-5 sm:p-6 xl:border-l xl:border-t-0">
                  <CollegeSectionTitle title="The verdicts" sub={verdictLine} />
                  <ul className="mt-3 divide-y divide-white/[0.06]">
                    {VERDICT_ROWS.map((v) => {
                      const n = counts[v.key];
                      return (
                        <li key={v.key}>
                          <button
                            type="button"
                            onClick={() => setFilter(v.key as FilterKey)}
                            className="flex min-h-11 w-full items-center gap-2.5 text-left text-[13.5px] text-white touch-manipulation transition-colors hover:bg-white/[0.03]"
                          >
                            <span
                              aria-hidden
                              className={cn('h-2 w-2 shrink-0 rounded-full', v.cls)}
                            />
                            <span className="flex-1">{v.label}</span>
                            <span className="font-semibold tabular-nums">{n}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <EpaCalibrationCard collegeId={collegeId} />
          </section>

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
                        ? 'forecast'
                        : sort === 'forecast'
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
                    : sort === 'forecast'
                      ? 'Soonest forecast'
                      : sort === 'todo'
                        ? 'Fewest to do'
                        : sort === 'name'
                          ? 'Name'
                          : 'Oldest verdict'}
                </button>
              }
            />
            {/* Filters: quiet text tabs over the list, the cohort as a second
                rail, then the search. No selects (phone standard, rule 10). */}
            <div className="space-y-2">
              <TextTabs
                ariaLabel="Which apprentices to show"
                value={filter}
                onChange={setFilter}
                items={filterOpts.map(([k, label, n]) => ({ key: k, label, count: n }))}
              />
              {cohortOptions.length > 1 && (
                <TextTabs
                  ariaLabel="Cohort"
                  className="border-b-0"
                  value={cohort}
                  onChange={setCohort}
                  items={[
                    { key: 'all', label: 'All cohorts' },
                    ...cohortOptions.map(([id, name]) => ({ key: id, label: name })),
                  ]}
                />
              )}
              <label className="relative block lg:max-w-md">
                <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find an apprentice or course"
                  aria-label="Search learners"
                  className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-7 pr-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                />
              </label>
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
                    ? 'Try Whole college, another filter, or clear the search.'
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
                      criteria={criteriaOf(l.id)}
                      forecast={forecastOf(l)}
                      forecastLoading={forecastsLoading}
                      onOpen={() => navigate(`/college?section=student360&studentId=${l.id}#epa`)}
                      onFix={(f) => fix(l, f)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

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
  criteria,
  forecast,
  forecastLoading,
}: {
  learner: CohortLearner;
  cohortName?: string;
  criteria: CriteriaPassed | null;
  forecast: GatewayForecast | null;
  forecastLoading?: boolean;
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
        className="flex min-w-0 items-start gap-3 rounded-xl text-left touch-manipulation group active:bg-white/[0.04]"
      >
        {/* Neutral avatar; "Needs your sign-off" in orange says it. */}
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.1] text-[13.5px] font-bold text-white"
        >
          {initialsOf(l.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block break-words text-[15px] font-semibold leading-snug text-white group-hover:underline">
            {l.name}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 empty:hidden">
            {mine && (
              <span className="shrink-0 rounded-full border border-white/[0.4] px-2 py-0.5 text-[12px] font-semibold text-white">
                Yours
              </span>
            )}
            {l.needs_sign_off && (
              <span className="shrink-0 rounded-full border border-orange-400/60 px-2 py-0.5 text-[12px] font-semibold text-orange-300">
                Needs your sign-off
              </span>
            )}
          </span>
          <span className="mt-0.5 block text-[13px] text-white">
            {[cohortName, l.gateway_date ? `Gateway ${formatDate(l.gateway_date)}` : null]
              .filter(Boolean)
              .join(' · ')}
          </span>
          <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-white">
            {r ? (
              <span>
                Stage: <span className="font-semibold">{EPA_STATUS_LABEL[r.status]}</span>
              </span>
            ) : (
              <span>No account linked</span>
            )}
            <span className={cn('font-semibold', bad && 'text-orange-400')}>
              {eff && v
                ? `${eff.isPrediction ? 'Prediction' : 'Tutor'}: ${VERDICT_LABEL[v] ?? v}${age ? ` · ${age}` : ''}`
                : 'No verdict'}
            </span>
          </span>
          {l.user_id && (
            <GatewayForecastLine forecast={forecast} loading={forecastLoading} className="mt-1.5" />
          )}
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
        <BGatewayReadiness learner={l} onFix={onFix} criteria={criteria} />
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  // Date-only strings are local dates, not UTC midnight.
  const d = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(`${iso}T00:00:00`) : new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

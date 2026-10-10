/**
 * EPATrackingSection — EPA admin: status records, gateway dates, outcomes.
 *
 * 7 Oct 2026: rebuilt on the College kit (CollegeUi). Header with help, the
 * dates that matter as figures, the pipeline and the results as charts, the
 * records list beside the gateway countdown on a wide screen. Mine first
 * (ELE-1886). The per-learner gateway items live on /college/epa (ELE-1872),
 * one tap away.
 *
 * 8 Oct 2026: the gateway figures read the real gate. The side panel was
 * EPACountdown, a home-made readiness score from the typed progress figure
 * and attendance ("Knowledge 46% — needs 54% more"); it is now each
 * apprentice's get_gateway_readiness lines (get_gateway_readiness_many),
 * nearest EPA date first, and the readiness card counts who has every line
 * met rather than the "Gateway Ready" status someone typed.
 */
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { useNavigate } from 'react-router-dom';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegeLinkCard,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import { FilterChips, FilterSheetButton, RowMenu } from '@/components/college/people/peopleKit';
import { useMyLearners } from '@/components/college/assessment/useMyLearners';
import {
  Bars,
  Pipeline,
  ScopeToggle,
  initialsOf,
  useScope,
} from '@/components/college/assessment/AssessmentKit';
import { useCollegeEPAs } from '@/hooks/college/useCollegeEPA';
import { useGatesMany } from '@/hooks/college/useGatesMany';
import { useGatewayForecastMany } from '@/hooks/epa/useGatewayForecast';
import { FORECAST_HELP_NOTE, forecastSortKey, isOffPace } from '@/lib/epa/gatewayForecast';
import { GatewayForecastLine } from '@/components/college/student360/GatewayForecastPanel';
import type { EPAStatus } from '@/services/college/collegeEPAService';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeCohorts } from '@/hooks/college/useCollegeCohorts';
import { EPADetailSheet } from '@/components/college/sheets/EPADetailSheet';
import { GatewayMeetingSheet } from '@/components/college/sheets/GatewayMeetingSheet';
import { AddEPARecordSheet } from '@/components/college/sheets/AddEPARecordSheet';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';

interface EPATrackingSectionProps {
  onNavigate?: (section: string) => void;
}

const DAY_MS = 86_400_000;

const STEPS: EPAStatus[] = [
  'Not Started',
  'In Progress',
  'Pre-Gateway',
  'Gateway Ready',
  'Complete',
];

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const statusChipCn = (status: string | null) =>
  cn(
    'inline-flex h-6 shrink-0 items-center rounded-full border px-2 text-[12px] font-semibold',
    status === 'Complete' || status === 'Gateway Ready'
      ? 'border-emerald-400/60 text-emerald-300'
      : 'border-white/[0.16] text-white'
  );

/** The real gate for up to 500 learners (shared with the Assessment hub and reports). */
const useGates = useGatesMany;

function whenLabel(days: number, date: Date): string {
  const d = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  if (days < 0) return `EPA date passed ${d}`;
  if (days === 0) return 'EPA date is today';
  return `EPA ${d}, in ${days} ${days === 1 ? 'day' : 'days'}`;
}

const STEP_CLS: Record<EPAStatus, string> = {
  'Not Started': 'bg-white/50',
  'In Progress': 'bg-white',
  'Pre-Gateway': 'bg-sky-400',
  'Gateway Ready': 'bg-elec-yellow',
  Complete: 'bg-emerald-500',
};

const RESULTS: Array<{ label: string; cls: string }> = [
  { label: 'Distinction', cls: 'bg-emerald-400' },
  { label: 'Merit', cls: 'bg-emerald-600' },
  { label: 'Pass', cls: 'bg-white' },
  { label: 'Fail', cls: 'bg-orange-500' },
];

const HELP: PageHelpContent = {
  id: 'college-epa-admin',
  title: 'EPA admin',
  what: 'The end-point assessment record for every apprentice: where they are in the pipeline, their gateway and EPA dates, and the result once they have sat it.',
  steps: [
    {
      title: 'Add a record',
      body: 'When an apprentice enters the pipeline, add their EPA record. Move them along as they go.',
    },
    {
      title: 'Hold the gateway meeting',
      body: 'From a learner’s menu, open the gateway meeting: tick the checklist, set the date and notes.',
    },
    {
      title: 'Check what is missing',
      body: 'Heading to EPA lists each apprentice with a date, nearest first, with how many gateway lines are met and the first one still open. Gateway readiness has every line, each a link to where it is fixed.',
    },
  ],
  legend: [
    {
      swatch: 'bg-emerald-500',
      label: 'Gateway ready or complete',
      body: 'Every gateway line met, or through EPA with a result.',
    },
    {
      swatch: 'bg-orange-500',
      label: 'Open',
      body: 'A gateway line still to meet, or an EPA date that has passed.',
    },
  ],
  notes: [
    {
      title: 'Where the gateway figures come from',
      body: 'From the gateway check itself: minimum time on programme, off-the-job hours, criteria passed, English and maths, the NET checklist and the signed declarations. The stage on an EPA record is what someone set; the gateway lines are what the record shows.',
    },
    FORECAST_HELP_NOTE,
    {
      title: 'Sort by forecast, filter Off pace',
      body: 'Soonest forecast lists the records by gateway forecast, earliest first. Off pace keeps everyone behind or close to their planned end.',
    },
  ],
};

export function EPATrackingSection({ onNavigate }: EPATrackingSectionProps) {
  const { data: epaRecords = [], isLoading: epasLoading } = useCollegeEPAs();
  const { data: students = [] } = useCollegeStudents();
  const { data: cohorts = [] } = useCollegeCohorts();

  const navigate = useNavigate();
  const my = useMyLearners();
  const [scope, setScope] = useScope('epa-admin', my);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [offPaceOnly, setOffPaceOnly] = useState(false);
  const [byForecast, setByForecast] = useState(false);
  const [selectedEpaId, setSelectedEpaId] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [gatewaySheetOpen, setGatewaySheetOpen] = useState(false);
  const [addRecordSheetOpen, setAddRecordSheetOpen] = useState(false);

  const queryClient = useQueryClient();
  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['college-epa'] });
  };

  const studentById = useMemo(() => new Map(students.map((s) => [s.id, s])), [students]);
  const activeCohorts = useMemo(
    () => cohorts.filter((c) => (c.status ?? '').toLowerCase() === 'active'),
    [cohorts]
  );
  const cohortName = (cohortId?: string | null) =>
    !cohortId ? 'Unassigned' : cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';

  const mineCount = epaRecords.filter((r) => my.isMine({ studentId: r.student_id })).length;
  const records = useMemo(
    () =>
      scope === 'mine'
        ? epaRecords.filter((r) => my.isMine({ studentId: r.student_id }))
        : epaRecords,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [epaRecords, scope, my.studentIds]
  );
  const countOf = (status: EPAStatus) => records.filter((r) => r.status === status).length;
  const resultCount = (label: string) =>
    records.filter((r) => (r.result ?? '').toLowerCase() === label.toLowerCase()).length;
  const notStarted = countOf('Not Started');
  const complete = countOf('Complete');

  const now = Date.now();
  const gatewayIn30 = records.filter((r) => {
    if (!r.gateway_date || r.status === 'Complete') return false;
    const t = new Date(r.gateway_date).getTime();
    return t >= now - DAY_MS && t <= now + 30 * DAY_MS;
  }).length;
  const epaBooked = records.filter(
    (r) => r.epa_date && r.status !== 'Complete' && new Date(r.epa_date).getTime() >= now - DAY_MS
  ).length;

  // The real gate for every scoped apprentice with an app account.
  const scopedStudents = useMemo(
    () =>
      students.filter(
        (s) =>
          (s.status ?? '').toLowerCase() === 'active' &&
          !!s.user_id &&
          (scope === 'all' ||
            my.isMine({ studentId: s.id, userId: s.user_id, cohortId: s.cohort_id }))
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [students, scope, my.studentIds, my.cohortIds]
  );
  const {
    data: gates,
    isLoading: gatesLoading,
    error: gatesError,
  } = useGates(scopedStudents.map((s) => s.user_id as string));
  const gateFor = (userId: string | null | undefined) =>
    userId ? gates?.[userId]?.items : undefined;
  const allMet = scopedStudents.filter((s) => {
    const items = gateFor(s.user_id);
    return !!items?.length && items.every((i) => i.state === 'green');
  }).length;

  // Heading to EPA: a date from the EPA record, else the planned end, nearest first.
  const heading = useMemo(() => {
    const out: Array<{ id: string; userId: string; name: string; date: Date; days: number }> = [];
    for (const s of scopedStudents) {
      const rec = epaRecords.find((r) => r.student_id === s.id);
      if (rec?.status === 'Complete') continue;
      const cohort = cohorts.find((c) => c.id === s.cohort_id);
      const when =
        rec?.epa_date || rec?.gateway_date || s.expected_end_date || cohort?.end_date || null;
      if (!when) continue;
      const date = new Date(when);
      const days = Math.ceil((date.getTime() - Date.now()) / DAY_MS);
      if (days > 183) continue;
      out.push({ id: s.id, userId: s.user_id as string, name: s.name, date, days });
    }
    return out.sort((a, b) => a.days - b.days);
  }, [scopedStudents, epaRecords, cohorts]);
  const [showAllHeading, setShowAllHeading] = useState(false);
  useEffect(() => setShowAllHeading(false), [scope]);

  const summary = epasLoading
    ? 'Every apprentice\u2019s EPA record: where they are, their gateway and assessment dates, and their result.'
    : [
        `${records.length} EPA ${records.length === 1 ? 'record' : 'records'}${scope === 'mine' ? ' for your learners' : ''}.`,
        gatewayIn30 > 0
          ? `${gatewayIn30} with a gateway in the next 30 days.`
          : 'No gateway dates in the next 30 days.',
        epaBooked > 0 ? `${epaBooked} with an EPA date booked.` : '',
        notStarted > 0 ? `${notStarted} not started.` : '',
        complete > 0 ? `${complete} through EPA.` : '',
      ]
        .filter(Boolean)
        .join(' ');

  // When each apprentice will be ready at this pace (get_gateway_forecast_many).
  const forecastIds = useMemo(
    () =>
      records
        .map((r) => (r.student_id ? studentById.get(r.student_id)?.user_id : null))
        .filter((x): x is string => !!x),
    [records, studentById]
  );
  const { data: forecasts, isLoading: forecastsLoading } = useGatewayForecastMany(forecastIds);
  const forecastFor = (studentId: string | null | undefined) => {
    const uid = studentId ? studentById.get(studentId)?.user_id : null;
    return (uid && forecasts?.[uid]) || null;
  };
  const offPaceCount = records.filter((r) => isOffPace(forecastFor(r.student_id))).length;

  const q = searchQuery.trim().toLowerCase();
  const filteredRecords = useMemo(
    () =>
      records
        .filter((epa) => !offPaceOnly || isOffPace(forecastFor(epa.student_id)))
        .filter((epa) => {
          const student = epa.student_id ? studentById.get(epa.student_id) : undefined;
          const matchesSearch = !q || (student?.name ?? '').toLowerCase().includes(q);
          const matchesStatus = filterStatus === 'all' || epa.status === filterStatus;
          const matchesCohort = filterCohort === 'all' || student?.cohort_id === filterCohort;
          return matchesSearch && matchesStatus && matchesCohort;
        })
        // Furthest along first — gateway-ready apprentices are the ones an
        // assessor has to act on.
        .sort((a, b) =>
          byForecast
            ? forecastSortKey(forecastFor(a.student_id)) -
              forecastSortKey(forecastFor(b.student_id))
            : STEPS.indexOf(b.status ?? 'Not Started') - STEPS.indexOf(a.status ?? 'Not Started')
        ),
    // forecastFor reads forecasts and studentById, both listed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [records, studentById, q, filterStatus, filterCohort, offPaceOnly, byForecast, forecasts]
  );

  const openDetail = (epaId: string) => {
    setSelectedEpaId(epaId);
    setDetailSheetOpen(true);
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} className="space-y-8 sm:space-y-10">
      <CollegePageHeader
        eyebrow="End-point assessment"
        title="EPA admin"
        description={summary}
        help={HELP}
        actions={
          <>
            <ScopeToggle
              scope={scope}
              onChange={setScope}
              my={my}
              mineCount={mineCount}
              allCount={epaRecords.length}
            />
            <button
              type="button"
              onClick={() => setAddRecordSheetOpen(true)}
              className={COLLEGE_BTN_PRIMARY}
            >
              Add an EPA record
            </button>
          </>
        }
      />
      {/* On a phone the records come first and the charts follow them. */}
      <div className="flex flex-col gap-8 sm:gap-10">
        <div className="order-last grid grid-cols-1 items-stretch gap-4 sm:order-none lg:grid-cols-2 xl:grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(0,3fr)]">
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={cn(COLLEGE_CARD, 'h-full lg:col-span-2 xl:col-span-1')}
          >
            <CollegeSectionTitle
              title="The pipeline"
              sub="Left to right towards EPA. Tap a stage to list it."
            />
            <div className="mt-5">
              <Pipeline
                stages={STEPS.map((st) => ({
                  key: st,
                  label: st,
                  n: countOf(st),
                  cls: STEP_CLS[st],
                }))}
                onPick={(k) => setFilterStatus(filterStatus === k ? 'all' : k)}
              />
            </div>
          </motion.section>
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={cn(COLLEGE_CARD, 'h-full')}
          >
            <CollegeSectionTitle
              title="Results"
              sub={complete ? `${complete} through EPA` : 'None through EPA yet'}
            />
            <div className="mt-4">
              <Bars
                rows={RESULTS.map((r) => ({ label: r.label, n: resultCount(r.label), cls: r.cls }))}
                labelWidth="5.5rem"
              />
            </div>
          </motion.section>
          <CollegeLinkCard
            title="Gateway readiness"
            figure={
              gatesLoading
                ? undefined
                : gatesError
                  ? undefined
                  : `${allMet} of ${scopedStudents.length}`
            }
            body={
              gatesError
                ? 'The gateway check did not load. Open it to see every line per apprentice.'
                : gatesLoading
                  ? 'Checking every apprentice against the gateway\u2026'
                  : 'Apprentices with every gateway line met. Open it for what each one still needs, each line a link to where it is fixed.'
            }
            onClick={() => navigate('/college/epa')}
          />
        </div>

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_440px]">
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="min-w-0 space-y-4"
          >
            <CollegeSectionTitle
              title="EPA records"
              sub={`${filteredRecords.length} shown, ${byForecast ? 'soonest gateway forecast first' : 'furthest along first'}`}
            />
            <motion.div variants={itemVariants} className="space-y-3">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find an apprentice"
                aria-label="Search apprentices"
                className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
              />
              <FilterChips
                label="EPA step"
                value={filterStatus}
                onChange={setFilterStatus}
                items={[
                  { value: 'all', label: 'All', count: records.length },
                  ...STEPS.map((st) => ({ value: st, label: st, count: countOf(st) })),
                ]}
              />
              <div className="flex flex-wrap items-center gap-2">
                <div
                  role="radiogroup"
                  aria-label="Order"
                  className="inline-flex rounded-xl border border-white/[0.12] p-0.5"
                >
                  {(
                    [
                      [false, 'Furthest along'],
                      [true, 'Soonest forecast'],
                    ] as const
                  ).map(([v, label]) => (
                    <button
                      key={label}
                      type="button"
                      role="radio"
                      aria-checked={byForecast === v}
                      onClick={() => setByForecast(v)}
                      className={cn(
                        'h-11 rounded-[10px] px-3 text-[13px] font-semibold transition-colors touch-manipulation',
                        byForecast === v
                          ? 'bg-white text-black'
                          : 'text-white hover:bg-white/[0.06]'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  aria-pressed={offPaceOnly}
                  onClick={() => setOffPaceOnly((v) => !v)}
                  className={cn(
                    COLLEGE_BTN,
                    offPaceOnly && 'border-orange-400 text-orange-300 hover:border-orange-400'
                  )}
                >
                  Off pace only <span className="tabular-nums">{offPaceCount}</span>
                </button>
                {activeCohorts.length > 1 && (
                  <FilterSheetButton
                    label="Cohort"
                    value={filterCohort}
                    onChange={setFilterCohort}
                    items={[
                      { value: 'all', label: 'All cohorts' },
                      ...activeCohorts.map((c) => ({ value: c.id, label: c.name })),
                    ]}
                  />
                )}
              </div>
            </motion.div>

            {epasLoading ? (
              <div className="space-y-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-[72px] animate-pulse rounded-2xl bg-white/[0.04]" />
                ))}
              </div>
            ) : filteredRecords.length === 0 ? (
              <CollegeEmpty
                title={
                  epaRecords.length === 0 ? 'No EPA records yet' : 'Nothing matches these filters'
                }
                body={
                  epaRecords.length === 0
                    ? 'Add one when an apprentice enters the pipeline.'
                    : scope === 'mine'
                      ? 'Try Everyone, another stage, or clear the search.'
                      : 'Try another stage or clear the search.'
                }
              />
            ) : (
              <motion.ul variants={itemVariants} className={COLLEGE_LIST}>
                {filteredRecords.map((epa) => {
                  const student = epa.student_id ? studentById.get(epa.student_id) : undefined;
                  const step = STEPS.indexOf(epa.status ?? 'Not Started') + 1;
                  const mine = scope === 'all' && my.isMine({ studentId: epa.student_id });
                  const reason = [
                    cohortName(student?.cohort_id),
                    `Step ${step} of ${STEPS.length}`,
                    epa.gateway_date ? `Gateway ${shortDate(epa.gateway_date)}` : null,
                    epa.epa_date ? `EPA ${shortDate(epa.epa_date)}` : null,
                  ]
                    .filter(Boolean)
                    .join(' · ');

                  return (
                    <li key={epa.id} className="flex items-stretch">
                      <button
                        type="button"
                        onClick={() => openDetail(epa.id)}
                        className="flex min-w-0 flex-1 items-center gap-3 py-3.5 pl-4 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:pl-5"
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[13.5px] font-bold',
                            'bg-white/[0.1] text-white'
                          )}
                        >
                          {initialsOf(student?.name)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="min-w-0 break-words text-[15px] font-semibold leading-snug text-white">
                              {student?.name ?? 'Unknown apprentice'}
                            </span>
                            <span className={statusChipCn(epa.status)}>
                              {epa.status ?? 'Unknown'}
                            </span>
                            {mine && (
                              <span className="shrink-0 rounded-full border border-white/[0.4] px-2 py-0.5 text-[12px] font-semibold text-white">
                                Yours
                              </span>
                            )}
                          </span>
                          <span className="mt-1 line-clamp-2 block text-[13px] leading-snug text-white md:line-clamp-1 md:text-[12.5px]">
                            {reason}
                          </span>
                          {student?.user_id && epa.status !== 'Complete' && (
                            <GatewayForecastLine
                              forecast={forecastFor(epa.student_id)}
                              loading={forecastsLoading}
                              className="mt-1"
                            />
                          )}
                          <span className="mt-2 flex gap-1" aria-hidden="true">
                            {STEPS.map((st, i) => (
                              <span
                                key={st}
                                className={cn(
                                  'h-1 w-8 rounded-full',
                                  i < step
                                    ? STEP_CLS[epa.status ?? 'Not Started']
                                    : 'bg-white/[0.1]'
                                )}
                              />
                            ))}
                          </span>
                        </span>
                        {epa.result && (
                          <span className="shrink-0 text-[13px] font-semibold text-white">
                            {epa.result}
                          </span>
                        )}
                        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                      </button>

                      <RowMenu
                        title={student?.name ?? 'This apprentice'}
                        items={[
                          { label: 'View details', onClick: () => openDetail(epa.id) },
                          {
                            label: 'Gateway meeting',
                            separated: true,
                            onClick: () => {
                              setSelectedEpaId(epa.id);
                              setSelectedStudentId(epa.student_id);
                              setGatewaySheetOpen(true);
                            },
                          },
                          ...(epa.student_id
                            ? [
                                {
                                  label: 'Open learner',
                                  onClick: () =>
                                    navigate(
                                      `/college?section=student360&studentId=${epa.student_id}#epa`
                                    ),
                                },
                              ]
                            : []),
                          { label: 'Add assessment', onClick: () => onNavigate?.('grading') },
                          { label: 'View portfolio', onClick: () => onNavigate?.('portfolio') },
                        ]}
                      />
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </motion.section>

          <motion.aside
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="min-w-0 space-y-4 xl:sticky xl:top-16"
          >
            <CollegeSectionTitle
              title="Heading to EPA"
              sub="Next six months, nearest first, against the gateway check."
            />
            <motion.div variants={itemVariants}>
              {heading.length === 0 ? (
                <CollegeEmpty
                  title="Nobody due in the next six months"
                  body="Apprentices appear here once an EPA date, gateway date or planned end date falls within six months."
                />
              ) : (
                <ul className={COLLEGE_LIST}>
                  {(showAllHeading ? heading : heading.slice(0, 6)).map((h) => {
                    const items = gateFor(h.userId);
                    const met = items?.filter((i) => i.state === 'green').length ?? 0;
                    const open = items?.find((i) => i.state !== 'green');
                    return (
                      <li key={h.id}>
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/college?section=student360&studentId=${encodeURIComponent(h.id)}#epa`
                            )
                          }
                          className="flex min-h-[64px] w-full items-center gap-3 px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-5"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block break-words text-[15px] font-semibold leading-snug text-white">
                              {h.name}
                            </span>
                            <span
                              className={cn(
                                'mt-0.5 block truncate text-[12.5px]',
                                h.days < 0 ? 'text-orange-300' : 'text-white'
                              )}
                            >
                              {whenLabel(h.days, h.date)}
                            </span>
                            {open && (
                              <span className="mt-0.5 block truncate text-[12.5px] text-white">
                                Next: {open.label}
                              </span>
                            )}
                          </span>
                          <span className="shrink-0 text-right text-[12.5px] text-white">
                            {items?.length ? (
                              <>
                                <span
                                  className={cn(
                                    'block text-[14px] font-bold tabular-nums',
                                    met === items.length ? 'text-emerald-400' : 'text-white'
                                  )}
                                >
                                  {met} of {items.length}
                                </span>
                                gateway lines met
                              </>
                            ) : gatesLoading ? (
                              'Checking\u2026'
                            ) : (
                              'No gate'
                            )}
                          </span>
                          <ChevronRight
                            className="h-4 w-4 shrink-0 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      </li>
                    );
                  })}
                  {heading.length > 6 && !showAllHeading && (
                    <li>
                      <button
                        type="button"
                        onClick={() => setShowAllHeading(true)}
                        className="flex h-12 w-full items-center justify-center text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.04]"
                      >
                        {heading.length - 6} more
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </motion.div>
          </motion.aside>
        </div>
      </div>

      <EPADetailSheet
        epaId={selectedEpaId}
        open={detailSheetOpen}
        onOpenChange={setDetailSheetOpen}
      />
      <GatewayMeetingSheet
        epaId={selectedEpaId}
        studentId={selectedStudentId}
        open={gatewaySheetOpen}
        onOpenChange={setGatewaySheetOpen}
      />
      <AddEPARecordSheet open={addRecordSheetOpen} onOpenChange={setAddRecordSheetOpen} />
    </PullToRefresh>
  );
}

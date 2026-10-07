/**
 * EPATrackingSection — EPA admin: status records, gateway dates, outcomes.
 *
 * 7 Oct 2026: rebuilt on the College kit (CollegeUi). Header with help, the
 * dates that matter as figures, the pipeline and the results as charts, the
 * records list beside the gateway countdown on a wide screen. Mine first
 * (ELE-1886). The per-learner gateway items live on /college/epa (ELE-1872),
 * one tap away.
 */
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { useNavigate } from 'react-router-dom';
import {
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegeLinkCard,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { useMyLearners } from '@/components/college/assessment/useMyLearners';
import { Bars, Pipeline, ScopeToggle, initialsOf, useScope } from '@/components/college/assessment/AssessmentKit';
import { EPACountdown } from '@/components/college/widgets/EPACountdown';
import { useCollegeEPAs } from '@/hooks/college/useCollegeEPA';
import type { EPAStatus } from '@/services/college/collegeEPAService';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeCohorts } from '@/hooks/college/useCollegeCohorts';
import { EPADetailSheet } from '@/components/college/sheets/EPADetailSheet';
import { GatewayMeetingSheet } from '@/components/college/sheets/GatewayMeetingSheet';
import { AddEPARecordSheet } from '@/components/college/sheets/AddEPARecordSheet';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface EPATrackingSectionProps {
  onNavigate?: (section: string) => void;
}

const DAY_MS = 86_400_000;

const STEPS: EPAStatus[] = ['Not Started', 'In Progress', 'Pre-Gateway', 'Gateway Ready', 'Complete'];

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const statusChipCn = (status: string | null) =>
  cn(
    'inline-flex h-6 shrink-0 items-center rounded-full border px-2 text-[10.5px] font-semibold',
    status === 'Gateway Ready'
      ? 'border-elec-yellow bg-elec-yellow text-black'
      : status === 'Complete'
        ? 'border-emerald-400/50 text-white'
        : 'border-white/[0.16] text-white'
  );

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
    { title: 'Add a record', body: 'When an apprentice enters the pipeline, add their EPA record. Move them along as they go.' },
    { title: 'Hold the gateway meeting', body: 'From a learner’s menu, open the gateway meeting: tick the checklist, set the date and notes.' },
    { title: 'Check what is missing', body: 'Gateway readiness lists, per learner, every item still open with a link to fix it.' },
  ],
  legend: [
    { swatch: 'bg-elec-yellow', label: 'Gateway ready', body: 'Ready to put forward to the assessment organisation.' },
    { swatch: 'bg-emerald-500', label: 'Complete', body: 'Through EPA, with a result.' },
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
    () => (scope === 'mine' ? epaRecords.filter((r) => my.isMine({ studentId: r.student_id })) : epaRecords),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [epaRecords, scope, my.studentIds]
  );
  const countOf = (status: EPAStatus) => records.filter((r) => r.status === status).length;
  const resultCount = (label: string) =>
    records.filter((r) => (r.result ?? '').toLowerCase() === label.toLowerCase()).length;
  const gatewayReady = countOf('Gateway Ready');
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

  const q = searchQuery.trim().toLowerCase();
  const filteredRecords = useMemo(
    () =>
      records
        .filter((epa) => {
          const student = epa.student_id ? studentById.get(epa.student_id) : undefined;
          const matchesSearch = !q || (student?.name ?? '').toLowerCase().includes(q);
          const matchesStatus = filterStatus === 'all' || epa.status === filterStatus;
          const matchesCohort = filterCohort === 'all' || student?.cohort_id === filterCohort;
          return matchesSearch && matchesStatus && matchesCohort;
        })
        // Furthest along first — gateway-ready apprentices are the ones an
        // assessor has to act on.
        .sort((a, b) => STEPS.indexOf(b.status ?? 'Not Started') - STEPS.indexOf(a.status ?? 'Not Started')),
    [records, studentById, q, filterStatus, filterCohort]
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
        description="Every apprentice’s EPA record: where they are, their gateway and assessment dates, and their result."
        help={HELP}
        actions={
          <>
            <ScopeToggle scope={scope} onChange={setScope} my={my} mineCount={mineCount} allCount={epaRecords.length} />
            <button type="button" onClick={() => setAddRecordSheetOpen(true)} className={COLLEGE_BTN_PRIMARY}>
              Add an EPA record
            </button>
          </>
        }
      />

      <CollegeStats
        items={[
          {
            label: 'Gateway in 30 days',
            value: String(gatewayIn30),
            sub: gatewayIn30 > 0 ? 'Get the meetings booked' : 'No gateway dates this month',
            warn: gatewayIn30 > 0,
          },
          {
            label: 'EPA dates booked',
            value: String(epaBooked),
            sub: gatewayReady > 0 ? `${gatewayReady} gateway ready` : 'Assessment dates in the diary',
          },
          {
            label: 'Not started',
            value: String(notStarted),
            sub: notStarted > 0 ? 'No EPA activity yet' : 'Everyone has begun',
            warn: notStarted > 0,
            onClick: () => setFilterStatus('Not Started'),
          },
          {
            label: 'Complete',
            value: String(complete),
            sub: `${records.length} in the pipeline`,
            good: complete > 0,
            onClick: () => setFilterStatus('Complete'),
          },
        ]}
      />

      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2 xl:grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(0,3fr)]">
        <motion.section variants={itemVariants} initial="hidden" animate="visible" className={cn(COLLEGE_CARD, 'h-full lg:col-span-2 xl:col-span-1')}>
          <CollegeSectionTitle title="The pipeline" sub="Left to right towards EPA. Tap a stage to list it." />
          <div className="mt-5">
            <Pipeline
              stages={STEPS.map((st) => ({ key: st, label: st, n: countOf(st), cls: STEP_CLS[st] }))}
              onPick={(k) => setFilterStatus(filterStatus === k ? 'all' : k)}
            />
          </div>
        </motion.section>
        <motion.section variants={itemVariants} initial="hidden" animate="visible" className={cn(COLLEGE_CARD, 'h-full')}>
          <CollegeSectionTitle title="Results" sub={complete ? `${complete} through EPA` : 'None through EPA yet'} />
          <div className="mt-4">
            <Bars rows={RESULTS.map((r) => ({ label: r.label, n: resultCount(r.label), cls: r.cls }))} labelWidth="5.5rem" />
          </div>
        </motion.section>
        <CollegeLinkCard
          title="Gateway readiness"
          figure={String(gatewayReady)}
          warn={false}
          body={`Gateway ready now. Per apprentice, every gateway item still open, each one a link to where it is fixed.`}
          onClick={() => navigate('/college/epa')}
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_440px]">
        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="min-w-0 space-y-4">
          <CollegeSectionTitle title="EPA records" sub={`${filteredRecords.length} shown, furthest along first`} />
          <motion.div variants={itemVariants} className="space-y-3">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find an apprentice"
              aria-label="Search apprentices"
              className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
            />
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
              <button type="button" onClick={() => setFilterStatus('all')} className={chipCn(filterStatus === 'all')}>
                All {records.length}
              </button>
              {STEPS.map((s) => (
                <button key={s} type="button" onClick={() => setFilterStatus(s)} className={chipCn(filterStatus === s)}>
                  {s} {countOf(s)}
                </button>
              ))}
            </div>
            {activeCohorts.length > 1 && (
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
                <button type="button" onClick={() => setFilterCohort('all')} className={chipCn(filterCohort === 'all')}>
                  All cohorts
                </button>
                {activeCohorts.map((cohort) => (
                  <button
                    key={cohort.id}
                    type="button"
                    onClick={() => setFilterCohort(cohort.id)}
                    className={chipCn(filterCohort === cohort.id)}
                  >
                    {cohort.name}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {epasLoading ? (
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[72px] animate-pulse rounded-2xl bg-white/[0.04]" />
              ))}
            </div>
          ) : filteredRecords.length === 0 ? (
            <CollegeEmpty
              title={epaRecords.length === 0 ? 'No EPA records yet' : 'Nothing matches these filters'}
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
                const ready = epa.status === 'Gateway Ready';
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
                          ready ? 'bg-elec-yellow text-black' : 'bg-white/[0.1] text-white'
                        )}
                      >
                        {initialsOf(student?.name)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="truncate text-[15px] font-semibold leading-tight text-white">
                            {student?.name ?? 'Unknown apprentice'}
                          </span>
                          <span className={statusChipCn(epa.status)}>{epa.status ?? 'Unknown'}</span>
                          {mine && <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10.5px] font-bold text-black">Yours</span>}
                        </span>
                        <span className="mt-1 block truncate text-[12.5px] leading-tight text-white">{reason}</span>
                        <span className="mt-2 flex gap-1" aria-hidden="true">
                          {STEPS.map((st, i) => (
                            <span key={st} className={cn('h-1 w-8 rounded-full', i < step ? STEP_CLS[epa.status ?? 'Not Started'] : 'bg-white/[0.1]')} />
                          ))}
                        </span>
                      </span>
                      {epa.result && <span className="shrink-0 text-[13px] font-semibold text-white">{epa.result}</span>}
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                    </button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          aria-label="More actions"
                          className="mr-2 flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-xl text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
                        >
                          <MoreHorizontal className="h-4 w-4" aria-hidden />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="h-11" onClick={() => openDetail(epa.id)}>
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="h-11"
                          onClick={() => {
                            setSelectedEpaId(epa.id);
                            setSelectedStudentId(epa.student_id);
                            setGatewaySheetOpen(true);
                          }}
                        >
                          Gateway meeting
                        </DropdownMenuItem>
                        {epa.student_id && (
                          <DropdownMenuItem className="h-11" onClick={() => navigate(`/college/students/${epa.student_id}#epa`)}>
                            Open learner
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="h-11" onClick={() => onNavigate?.('grading')}>
                          Add assessment
                        </DropdownMenuItem>
                        <DropdownMenuItem className="h-11" onClick={() => onNavigate?.('portfolio')}>
                          View portfolio
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </motion.section>

        <motion.aside variants={containerVariants} initial="hidden" animate="visible" className="min-w-0 space-y-4 xl:sticky xl:top-16">
          <CollegeSectionTitle title="Gateway countdown" sub="Days to EPA and the gaps to close first." />
          <motion.div variants={itemVariants}>
            <EPACountdown />
          </motion.div>
        </motion.aside>
      </div>

      <EPADetailSheet epaId={selectedEpaId} open={detailSheetOpen} onOpenChange={setDetailSheetOpen} />
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

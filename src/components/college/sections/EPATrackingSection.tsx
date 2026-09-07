/**
 * EPATrackingSection — EPA admin: status records, gateway dates, outcomes.
 *
 * Rebuilt on the shared hub language. CollegeDashboard draws the masthead;
 * this is content only:
 *
 *   KPI row → gateway-ready alert → readiness widget → add a record →
 *   filters → records
 *
 * What went: the PageHero, the five-cell colour-toned StatStrip, the
 * `bg-[hsl(0_0%_12%)]` "action required" panel with its blue rule, the
 * emerald avatar rings and the volt-washed progress segments.
 *
 * The hub's "At gateway" KPI already counts Pre-Gateway + Gateway Ready, and
 * its card carries "ready to submit". This row carries the dates instead:
 * gateway meetings falling in the next 30 days, EPA dates actually booked,
 * and the two ends of the pipeline.
 */
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubAlertLine, HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
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

const chipCn = (active: boolean) =>
  cn(
    'inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-3.5 text-[12.5px] font-medium transition-colors touch-manipulation',
    active
      ? 'border-elec-yellow text-elec-yellow'
      : 'border-white/[0.12] text-white hover:bg-white/[0.06]'
  );

const statusChipCn = (status: string | null) =>
  cn(
    'inline-flex h-6 shrink-0 items-center rounded-full border px-2 text-[11px] font-medium',
    status === 'Gateway Ready'
      ? 'border-elec-yellow/40 text-elec-yellow'
      : 'border-white/[0.15] text-white'
  );

export function EPATrackingSection({ onNavigate }: EPATrackingSectionProps) {
  const { data: epaRecords = [], isLoading: epasLoading } = useCollegeEPAs();
  const { data: students = [] } = useCollegeStudents();
  const { data: cohorts = [] } = useCollegeCohorts();

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

  const countOf = (status: EPAStatus) => epaRecords.filter((r) => r.status === status).length;
  const gatewayReady = countOf('Gateway Ready');
  const notStarted = countOf('Not Started');
  const complete = countOf('Complete');

  const now = Date.now();
  const gatewayIn30 = epaRecords.filter((r) => {
    if (!r.gateway_date || r.status === 'Complete') return false;
    const t = new Date(r.gateway_date).getTime();
    return t >= now - DAY_MS && t <= now + 30 * DAY_MS;
  }).length;
  const epaBooked = epaRecords.filter(
    (r) => r.epa_date && r.status !== 'Complete' && new Date(r.epa_date).getTime() >= now - DAY_MS
  ).length;

  const q = searchQuery.trim().toLowerCase();
  const filteredRecords = useMemo(
    () =>
      epaRecords
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
    [epaRecords, studentById, q, filterStatus, filterCohort]
  );

  const openDetail = (epaId: string) => {
    setSelectedEpaId(epaId);
    setDetailSheetOpen(true);
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} className="space-y-8 sm:space-y-10">
      <HubKpiRow>
        <HubKpi
          accent
          label="Gateway in 30 days"
          value={String(gatewayIn30)}
          verdict={gatewayIn30 > 0 ? 'Get the gateway meetings booked' : 'No gateway dates this month'}
          sentiment={gatewayIn30 > 0 ? 'bad' : 'neutral'}
        />
        <HubKpi
          label="EPA dates booked"
          value={String(epaBooked)}
          verdict={epaBooked > 0 ? 'Assessment dates in the diary' : 'No EPA dates booked yet'}
          context={gatewayReady > 0 ? `${gatewayReady} gateway ready` : undefined}
        />
        <HubKpi
          label="Not started"
          value={String(notStarted)}
          verdict={notStarted > 0 ? 'Records with no EPA activity yet' : 'Everyone has begun'}
          onClick={() => setFilterStatus('Not Started')}
        />
        <HubKpi
          label="Complete"
          value={String(complete)}
          verdict={complete > 0 ? 'Through EPA' : 'None through EPA yet'}
          context={epaRecords.length > 0 ? `${epaRecords.length} in the pipeline` : undefined}
          onClick={() => setFilterStatus('Complete')}
        />
      </HubKpiRow>

      {gatewayReady > 0 && (
        <HubAlertLine
          text={`${gatewayReady} apprentice${gatewayReady === 1 ? '' : 's'} gateway ready — review and schedule EPA`}
          onClick={() => setFilterStatus('Gateway Ready')}
        />
      )}

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubSectionHeading>Gateway readiness</HubSectionHeading>
        <motion.div variants={itemVariants}>
          <EPACountdown />
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <HubSectionHeading>EPA records</HubSectionHeading>
          {/* The one solid volt control on this screen. */}
          <button
            type="button"
            onClick={() => setAddRecordSheetOpen(true)}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 sm:w-auto"
          >
            Add an EPA record
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by apprentice"
            aria-label="Search apprentices"
            className="h-11 w-full border-0 border-b border-white/[0.18] bg-transparent px-0 text-[14px] text-white placeholder:text-white placeholder:opacity-60 focus:border-elec-yellow focus:outline-none"
          />
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            <button type="button" onClick={() => setFilterStatus('all')} className={chipCn(filterStatus === 'all')}>
              All · {epaRecords.length}
            </button>
            {STEPS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilterStatus(s)}
                className={chipCn(filterStatus === s)}
              >
                {s} · {countOf(s)}
              </button>
            ))}
          </div>
          {activeCohorts.length > 1 && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
              <button
                type="button"
                onClick={() => setFilterCohort('all')}
                className={chipCn(filterCohort === 'all')}
              >
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

        <motion.div
          variants={itemVariants}
          className={cn(
            '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          {epasLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
            </div>
          ) : filteredRecords.length === 0 ? (
            <p className="px-4 py-6 text-[13px] text-white sm:px-5">
              {epaRecords.length === 0
                ? 'No EPA records yet — add one when an apprentice enters the pipeline.'
                : 'Nothing matches these filters.'}
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {filteredRecords.map((epa) => {
                const student = epa.student_id ? studentById.get(epa.student_id) : undefined;
                const step = STEPS.indexOf(epa.status ?? 'Not Started') + 1;
                const ready = epa.status === 'Gateway Ready';
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
                      className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-8 w-[3px] shrink-0 rounded-full',
                          ready ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="truncate text-[14px] font-semibold leading-tight text-white">
                            {student?.name ?? 'Unknown apprentice'}
                          </span>
                          <span className={statusChipCn(epa.status)}>{epa.status ?? 'Unknown'}</span>
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                          {reason}
                        </span>
                      </span>
                      {epa.result && (
                        <span className="shrink-0 text-[13px] font-semibold text-white">{epa.result}</span>
                      )}
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                    </button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          aria-label="More actions"
                          className="flex h-11 w-11 shrink-0 items-center justify-center self-center text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
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
            </ul>
          )}
        </motion.div>
      </motion.section>

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

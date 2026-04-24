import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EPACountdown } from '@/components/college/widgets/EPACountdown';
import { useCollegeEPAs } from '@/hooks/college/useCollegeEPA';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeCohorts } from '@/hooks/college/useCollegeCohorts';
import { EPADetailSheet } from '@/components/college/sheets/EPADetailSheet';
import { GatewayMeetingSheet } from '@/components/college/sheets/GatewayMeetingSheet';
import { AddEPARecordSheet } from '@/components/college/sheets/AddEPARecordSheet';
import { EPACardSkeletonList } from '@/components/college/ui/EPACardSkeleton';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { useQueryClient } from '@tanstack/react-query';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PageFrame,
  PeopleListRow,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  Pill,
  EmptyState,
  SectionHeader,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';

interface EPATrackingSectionProps {
  onNavigate?: (section: string) => void;
}

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

  const filteredRecords = epaRecords.filter((epa) => {
    const student = students.find((s) => s.id === epa.student_id);
    const matchesSearch = student?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || epa.status === filterStatus;
    const matchesCohort = filterCohort === 'all' || student?.cohort_id === filterCohort;
    return matchesSearch && matchesStatus && matchesCohort;
  });

  const statusCounts = {
    notStarted: epaRecords.filter((r) => r.status === 'Not Started').length,
    inProgress: epaRecords.filter((r) => r.status === 'In Progress').length,
    preGateway: epaRecords.filter((r) => r.status === 'Pre-Gateway').length,
    gatewayReady: epaRecords.filter((r) => r.status === 'Gateway Ready').length,
    complete: epaRecords.filter((r) => r.status === 'Complete').length,
  };

  const statusTone = (status: string | null): Tone =>
    status === 'Not Started'
      ? 'yellow'
      : status === 'In Progress'
        ? 'amber'
        : status === 'Pre-Gateway'
          ? 'blue'
          : status === 'Gateway Ready'
            ? 'yellow'
            : status === 'Complete'
              ? 'green'
              : 'yellow';

  const gradeTone = (grade?: string): Tone =>
    grade === 'Distinction'
      ? 'green'
      : grade === 'Merit'
        ? 'blue'
        : grade === 'Pass'
          ? 'yellow'
          : grade === 'Fail'
            ? 'red'
            : 'yellow';

  const getStudentInfo = (studentId: string | null) => {
    if (!studentId) return { name: 'Unknown', initials: '?', photoUrl: undefined, cohortId: undefined };
    const student = students.find((s) => s.id === studentId);
    const name = student?.name || 'Unknown';
    const parts = name.split(' ').filter(Boolean);
    const initials =
      parts.length >= 2
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
        : name.substring(0, 2).toUpperCase();
    return {
      name,
      initials,
      photoUrl: student?.photo_url ?? undefined,
      cohortId: student?.cohort_id ?? undefined,
    };
  };
  const getCohortName = (cohortId?: string) =>
    !cohortId ? 'Unassigned' : cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';

  const getStatusStep = (status: string | null): number =>
    status === 'Not Started'
      ? 1
      : status === 'In Progress'
        ? 2
        : status === 'Pre-Gateway'
          ? 3
          : status === 'Gateway Ready'
            ? 4
            : status === 'Complete'
              ? 5
              : 0;
  const getProgressPercent = (status: string | null) => (getStatusStep(status) / 5) * 100;

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <PageFrame>
        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="Assessment · EPA"
            title="End point assessment"
            description={`${epaRecords.length} apprentice${epaRecords.length === 1 ? '' : 's'} in EPA pipeline.`}
            tone="green"
            actions={
              <button
                onClick={() => setAddRecordSheetOpen(true)}
                className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                Add EPA record →
              </button>
            }
          />
        </motion.div>

        {/* Pipeline */}
        <motion.div variants={itemVariants}>
          <StatStrip
            columns={5}
            stats={[
              { value: statusCounts.notStarted, label: 'Not Started', sub: 'Pre-pipeline' },
              { value: statusCounts.inProgress, label: 'In Progress', sub: 'Training', tone: 'amber' },
              { value: statusCounts.preGateway, label: 'Pre-Gateway', sub: 'Preparing', tone: 'blue' },
              {
                value: statusCounts.gatewayReady,
                label: 'Gateway Ready',
                sub: 'Ready to assess',
                tone: 'yellow',
                accent: statusCounts.gatewayReady > 0,
              },
              { value: statusCounts.complete, label: 'Complete', sub: 'EPA passed', tone: 'green' },
            ]}
          />
        </motion.div>

        {statusCounts.gatewayReady > 0 && (
          <motion.div variants={itemVariants}>
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 flex items-center gap-4">
              <span aria-hidden className="w-[3px] h-10 rounded-full bg-blue-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                  Action required
                </div>
                <div className="mt-1 text-[15px] font-medium text-white">
                  {statusCounts.gatewayReady} apprentice
                  {statusCounts.gatewayReady !== 1 ? 's' : ''} gateway ready
                </div>
                <div className="mt-0.5 text-[12px] text-white">
                  Review and schedule EPA assessments.
                </div>
              </div>
              <button
                onClick={() => setFilterStatus('Gateway Ready')}
                className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap shrink-0"
              >
                View →
              </button>
            </div>
          </motion.div>
        )}

        <motion.section variants={itemVariants} className="space-y-5">
          <SectionHeader eyebrow="Insights" title="Gateway readiness analysis" />
          <EPACountdown />
        </motion.section>

        <motion.div variants={itemVariants}>
          <FilterBar
            tabs={[
              { value: 'all', label: 'All', count: epaRecords.length },
              { value: 'In Progress', label: 'In Progress', count: statusCounts.inProgress },
              { value: 'Pre-Gateway', label: 'Pre-Gateway', count: statusCounts.preGateway },
              { value: 'Gateway Ready', label: 'Gateway Ready', count: statusCounts.gatewayReady },
              { value: 'Complete', label: 'Complete', count: statusCounts.complete },
            ]}
            activeTab={filterStatus}
            onTabChange={setFilterStatus}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search apprentices…"
            actions={
              <select
                value={filterCohort}
                onChange={(e) => setFilterCohort(e.target.value)}
                className="h-10 px-3 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation data-[state=open]:border-elec-yellow/60"
              >
                <option value="all">All Cohorts</option>
                {cohorts
                  .filter((c) => c.status === 'Active')
                  .map((cohort) => (
                    <option key={cohort.id} value={cohort.id}>
                      {cohort.name}
                    </option>
                  ))}
              </select>
            }
          />
        </motion.div>

        {epasLoading ? (
          <EPACardSkeletonList count={4} />
        ) : filteredRecords.length === 0 ? (
          <EmptyState title="No EPA records" description="Try adjusting filters, or add a new record." />
        ) : (
          <motion.div variants={itemVariants}>
            <ListCard>
              {filteredRecords.map((epa) => {
                const studentInfo = getStudentInfo(epa.student_id);
                const progressPercent = getProgressPercent(epa.status);
                const step = getStatusStep(epa.status);

                return (
                  <PeopleListRow
                    key={epa.id}
                    id={epa.id}
                    lead={{
                      kind: 'avatar',
                      name: studentInfo.name,
                      photoUrl: studentInfo.photoUrl ?? null,
                      ringTone: 'emerald',
                    }}
                    title={studentInfo.name}
                    titleChips={
                      epa.result ? (
                        <Pill tone={gradeTone(epa.result)}>{epa.result}</Pill>
                      ) : null
                    }
                    subtitle={getCohortName(studentInfo.cohortId)}
                    status={{
                      label: epa.status ?? 'Unknown',
                      tone: statusTone(epa.status),
                    }}
                    meta={
                      <div className="space-y-2.5">
                        <div>
                          <div className="flex items-baseline justify-between text-[10.5px]">
                            <span className="text-white uppercase tracking-[0.12em]">
                              EPA progress
                            </span>
                            <span className="font-medium text-white tabular-nums">
                              {Math.round(progressPercent)}%
                            </span>
                          </div>
                          <div className="mt-1.5 flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <span
                                key={s}
                                aria-hidden
                                className={
                                  step >= s
                                    ? 'flex-1 h-1 rounded-full bg-elec-yellow/80'
                                    : 'flex-1 h-1 rounded-full bg-white/[0.08]'
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white">
                          {epa.gateway_date && (
                            <span className="tabular-nums">
                              Gateway{' '}
                              {new Date(epa.gateway_date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </span>
                          )}
                          {epa.epa_date && (
                            <span className="tabular-nums">
                              EPA{' '}
                              {new Date(epa.epa_date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                    }
                    onOpen={() => {
                      setSelectedEpaId(epa.id);
                      setDetailSheetOpen(true);
                    }}
                    actions={[
                      {
                        label: 'View details',
                        onClick: () => {
                          setSelectedEpaId(epa.id);
                          setDetailSheetOpen(true);
                        },
                      },
                      {
                        label: 'Gateway meeting',
                        onClick: () => {
                          setSelectedEpaId(epa.id);
                          setSelectedStudentId(epa.student_id);
                          setGatewaySheetOpen(true);
                        },
                        divider: true,
                      },
                      {
                        label: 'Add assessment',
                        onClick: () => onNavigate?.('grading'),
                      },
                      {
                        label: 'View portfolio',
                        onClick: () => onNavigate?.('portfolio'),
                      },
                    ]}
                  />
                );
              })}
            </ListCard>
          </motion.div>
        )}

        <EPADetailSheet epaId={selectedEpaId} open={detailSheetOpen} onOpenChange={setDetailSheetOpen} />
        <GatewayMeetingSheet
          epaId={selectedEpaId}
          studentId={selectedStudentId}
          open={gatewaySheetOpen}
          onOpenChange={setGatewaySheetOpen}
        />
        <AddEPARecordSheet open={addRecordSheetOpen} onOpenChange={setAddRecordSheetOpen} />
      </PageFrame>
    </PullToRefresh>
  );
}

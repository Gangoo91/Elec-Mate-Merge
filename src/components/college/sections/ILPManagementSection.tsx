import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCollegeILPs, useOverdueILPReviews } from '@/hooks/college/useCollegeILP';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { useCollegeCohorts } from '@/hooks/college/useCollegeCohorts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ILPDetailSheet } from '@/components/college/sheets/ILPDetailSheet';
import { ILPReviewSheet } from '@/components/college/sheets/ILPReviewSheet';
import { ILPTargetsSheet } from '@/components/college/sheets/ILPTargetsSheet';
import { CreateILPSheet } from '@/components/college/sheets/CreateILPSheet';
import { ILPCardSkeletonList } from '@/components/college/ui/ILPCardSkeleton';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { useQueryClient } from '@tanstack/react-query';
import { SwipeableCard } from '@/components/college/ui/SwipeableCard';
import {
  PageFrame,
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
import { cn } from '@/lib/utils';

export function ILPManagementSection() {
  const { data: ilps = [], isLoading: ilpsLoading } = useCollegeILPs();
  const { data: overdueReviews = [] } = useOverdueILPReviews();
  const { data: students = [] } = useCollegeStudents();
  const { data: staff = [] } = useCollegeStaff();
  const { data: cohorts = [] } = useCollegeCohorts();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [selectedIlpId, setSelectedIlpId] = useState<string | null>(null);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [detailInitialTab, setDetailInitialTab] = useState<'targets' | 'support' | 'history'>(
    'targets'
  );
  const [reviewSheetOpen, setReviewSheetOpen] = useState(false);
  const [targetsSheetOpen, setTargetsSheetOpen] = useState(false);
  const [createSheetOpen, setCreateSheetOpen] = useState(false);

  const queryClient = useQueryClient();
  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['college-ilps'] });
  };

  const filteredILPs = ilps.filter((ilp) => {
    const student = students.find((s) => s.id === ilp.student_id);
    const targets = ilp.targets ?? [];
    const matchesSearch =
      student?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      targets.some((t) => t.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || ilp.status === filterStatus;
    const matchesCohort = filterCohort === 'all' || student?.cohort_id === filterCohort;
    return matchesSearch && matchesStatus && matchesCohort;
  });

  const statusTone = (status: string | null): Tone =>
    status === 'Active'
      ? 'green'
      : status === 'Draft'
        ? 'amber'
        : status === 'Completed'
          ? 'blue'
          : 'yellow';

  const targetTone = (status: string): Tone =>
    status === 'Achieved'
      ? 'green'
      : status === 'In Progress'
        ? 'blue'
        : status === 'Overdue'
          ? 'amber'
          : 'yellow';

  const getStudentInfo = (studentId: string | null) => {
    const student = students.find((s) => s.id === studentId);
    const initials = student?.name
      ? student.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : '?';
    return {
      name: student?.name || 'Unknown',
      initials,
      photoUrl: student?.photo_url ?? undefined,
      cohortId: student?.cohort_id,
    };
  };
  const getCohortName = (cohortId?: string | null) =>
    !cohortId ? 'Unassigned' : cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';
  const getTutorName = (reviewedBy: string | null) =>
    !reviewedBy ? 'Unassigned' : staff.find((s) => s.id === reviewedBy)?.name || 'Unknown';

  const getTargetProgress = (targets: (typeof ilps)[0]['targets']) => {
    const safe = targets ?? [];
    if (safe.length === 0) return 0;
    const achieved = safe.filter((t) => t.status === 'Achieved').length;
    return Math.round((achieved / safe.length) * 100);
  };

  const isReviewOverdue = (reviewDate: string | null) =>
    !!reviewDate && new Date(reviewDate) < new Date();
  const isReviewDueSoon = (reviewDate: string | null) => {
    if (!reviewDate) return false;
    const date = new Date(reviewDate);
    const now = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return date >= now && date <= weekFromNow;
  };

  const activeCount = ilps.filter((i) => i.status === 'Active').length;
  const completedCount = ilps.filter((i) => i.status === 'Completed').length;

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <PageFrame>
        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="Assessment · ILP"
            title="Individual Learning Plans"
            description={`${activeCount} active plan${activeCount === 1 ? '' : 's'}.`}
            tone="orange"
            actions={
              <button
                onClick={() => setCreateSheetOpen(true)}
                className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                Create ILP →
              </button>
            }
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatStrip
            columns={3}
            stats={[
              { value: activeCount, label: 'Active ILPs', sub: 'In progress', tone: 'green' },
              {
                value: overdueReviews.length,
                label: 'Overdue Reviews',
                sub: 'Need completing',
                tone: 'red',
                accent: overdueReviews.length > 0,
              },
              { value: completedCount, label: 'Completed', sub: 'Plan fulfilled', tone: 'blue' },
            ]}
          />
        </motion.div>

        {overdueReviews.length > 0 && (
          <motion.section variants={itemVariants} className="space-y-5">
            <SectionHeader eyebrow="Priority" title="Overdue reviews" />
            <ListCard>
              {overdueReviews.slice(0, 5).map((ilp) => {
                const student = getStudentInfo(ilp.student_id);
                return (
                  <div
                    key={ilp.id}
                    className="flex items-center gap-4 px-5 sm:px-6 py-4"
                  >
                    <Avatar className="h-9 w-9 shrink-0 ring-1 ring-white/[0.08]">
                      <AvatarImage src={student.photoUrl} />
                      <AvatarFallback className="bg-red-500/10 text-red-400 text-xs font-semibold">
                        {student.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-medium text-white truncate">
                        {student.name}
                      </div>
                      <div className="mt-0.5 text-[11.5px] text-white/75 truncate">
                        {getCohortName(student.cohortId)}
                      </div>
                    </div>
                    {ilp.review_date && (
                      <Pill tone="red">
                        Due{' '}
                        {new Date(ilp.review_date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </Pill>
                    )}
                  </div>
                );
              })}
            </ListCard>
          </motion.section>
        )}

        <motion.div variants={itemVariants}>
          <FilterBar
            tabs={[
              { value: 'all', label: 'All', count: ilps.length },
              { value: 'Active', label: 'Active', count: activeCount },
              { value: 'Draft', label: 'Draft', count: ilps.filter((i) => i.status === 'Draft').length },
              { value: 'Completed', label: 'Completed', count: completedCount },
            ]}
            activeTab={filterStatus}
            onTabChange={setFilterStatus}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search ILPs, students or targets…"
            actions={
              <select
                value={filterCohort}
                onChange={(e) => setFilterCohort(e.target.value)}
                className="h-10 px-3 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
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

        {ilpsLoading ? (
          <ILPCardSkeletonList count={4} />
        ) : filteredILPs.length === 0 ? (
          <EmptyState title="No ILPs found" description="Try adjusting filters or create a new ILP." />
        ) : (
          <motion.div variants={itemVariants}>
            <ListCard>
              {filteredILPs.map((ilp) => {
                const studentInfo = getStudentInfo(ilp.student_id);
                const targets = ilp.targets ?? [];
                const progress = getTargetProgress(ilp.targets);
                const overdue = isReviewOverdue(ilp.review_date);
                const dueSoon = isReviewDueSoon(ilp.review_date);

                return (
                  <SwipeableCard
                    key={ilp.id}
                    leftActions={[
                      {
                        label: 'Review',
                        onClick: () => {
                          setSelectedIlpId(ilp.id);
                          setReviewSheetOpen(true);
                        },
                        className: 'bg-emerald-500/90 text-white',
                      },
                      {
                        label: 'Targets',
                        onClick: () => {
                          setSelectedIlpId(ilp.id);
                          setTargetsSheetOpen(true);
                        },
                        className: 'bg-blue-500/90 text-white',
                      },
                    ]}
                  >
                    <div className="group flex items-start gap-4 px-5 sm:px-6 py-5 hover:bg-[hsl(0_0%_15%)] transition-colors">
                      <span
                        aria-hidden
                        className={cn(
                          'w-[3px] self-stretch rounded-full shrink-0',
                          overdue ? 'bg-red-400' : dueSoon ? 'bg-amber-400' : 'bg-transparent'
                        )}
                      />
                      <Avatar className="h-10 w-10 shrink-0 ring-1 ring-white/[0.08]">
                        <AvatarImage src={studentInfo.photoUrl} />
                        <AvatarFallback className="bg-orange-500/10 text-orange-400 text-xs font-semibold">
                          {studentInfo.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-[15px] font-medium text-white truncate">
                              {studentInfo.name}
                            </div>
                            <div className="mt-0.5 text-[11.5px] text-white/75 truncate">
                              {getCohortName(studentInfo.cohortId)} · Tutor · {getTutorName(ilp.reviewed_by)}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <Pill tone={statusTone(ilp.status)}>{ilp.status || 'Unknown'}</Pill>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button
                                  className="text-white/75 hover:text-white text-[18px] leading-none px-1 touch-manipulation"
                                  aria-label="Options"
                                >
                                  ⋯
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  className="h-11"
                                  onClick={() => {
                                    setSelectedIlpId(ilp.id);
                                    setDetailInitialTab('targets');
                                    setDetailSheetOpen(true);
                                  }}
                                >
                                  View ILP
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="h-11"
                                  onClick={() => {
                                    setSelectedIlpId(ilp.id);
                                    setReviewSheetOpen(true);
                                  }}
                                >
                                  Conduct review
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="h-11"
                                  onClick={() => {
                                    setSelectedIlpId(ilp.id);
                                    setTargetsSheetOpen(true);
                                  }}
                                >
                                  Edit targets
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {targets.length > 0 && (
                          <div className="mt-3">
                            <div className="flex items-baseline justify-between text-[11.5px]">
                              <span className="text-white/75 uppercase tracking-[0.12em]">
                                Targets
                              </span>
                              <span className="font-medium text-white tabular-nums">
                                {targets.filter((t) => t.status === 'Achieved').length}/{targets.length} · {progress}%
                              </span>
                            </div>
                            <div className="mt-1.5 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-elec-yellow/80 rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {targets.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {targets.slice(0, 4).map((target, i) => (
                              <Pill key={i} tone={targetTone(target.status)}>
                                {target.description.length > 32
                                  ? target.description.substring(0, 32) + '…'
                                  : target.description}
                              </Pill>
                            ))}
                            {targets.length > 4 && (
                              <span className="text-[11px] text-white/70 px-1.5 py-0.5">
                                +{targets.length - 4}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/75">
                          {ilp.last_reviewed && (
                            <span className="tabular-nums">
                              Reviewed{' '}
                              {new Date(ilp.last_reviewed).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </span>
                          )}
                          {ilp.review_date && (
                            <span
                              className={cn(
                                'tabular-nums',
                                overdue && 'text-red-400',
                                !overdue && dueSoon && 'text-amber-400'
                              )}
                            >
                              {overdue ? 'Overdue' : dueSoon ? 'Due' : 'Next'}{' '}
                              {new Date(ilp.review_date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </SwipeableCard>
                );
              })}
            </ListCard>
          </motion.div>
        )}

        <ILPDetailSheet
          ilpId={selectedIlpId}
          open={detailSheetOpen}
          onOpenChange={setDetailSheetOpen}
          initialTab={detailInitialTab}
          onConductReview={() => {
            setDetailSheetOpen(false);
            setTimeout(() => setReviewSheetOpen(true), 300);
          }}
          onEditTargets={() => {
            setDetailSheetOpen(false);
            setTimeout(() => setTargetsSheetOpen(true), 300);
          }}
        />
        <ILPReviewSheet ilpId={selectedIlpId} open={reviewSheetOpen} onOpenChange={setReviewSheetOpen} />
        <ILPTargetsSheet
          ilpId={selectedIlpId}
          open={targetsSheetOpen}
          onOpenChange={setTargetsSheetOpen}
        />
        <CreateILPSheet open={createSheetOpen} onOpenChange={setCreateSheetOpen} />
      </PageFrame>
    </PullToRefresh>
  );
}

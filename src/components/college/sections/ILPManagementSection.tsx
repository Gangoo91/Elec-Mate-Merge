import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
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
import { HubIlpSheet } from '@/components/college/sheets/HubIlpSheet';
import { ILPCardSkeletonList } from '@/components/college/ui/ILPCardSkeleton';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { useQueryClient, useQuery } from '@tanstack/react-query';
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
import { cn } from '@/lib/utils';

export function ILPManagementSection() {
  const { data: ilps = [], isLoading: ilpsLoading } = useCollegeILPs();
  const { data: overdueReviews = [] } = useOverdueILPReviews();
  const { data: students = [] } = useCollegeStudents();
  const { data: staff = [] } = useCollegeStaff();
  const { data: cohorts = [] } = useCollegeCohorts();

  // Goals are unified with Student 360 in college_ilp_goals — pull them for the
  // listed ILPs and key by ilp_id so the Hub list shows the same goals 360 does.
  const ilpIds = useMemo(() => ilps.map((i) => i.id), [ilps]);
  const { data: allGoals = [] } = useQuery({
    queryKey: ['college-ilp-goals', ilpIds],
    queryFn: async () => {
      if (!ilpIds.length) return [] as Array<{ ilp_id: string; title: string; status: string }>;
      const { data } = await supabase
        .from('college_ilp_goals')
        .select('ilp_id, title, status')
        .in('ilp_id', ilpIds);
      return (data ?? []) as Array<{ ilp_id: string; title: string; status: string }>;
    },
    enabled: ilpIds.length > 0,
  });
  const goalsByIlp = useMemo(() => {
    const m = new Map<string, Array<{ title: string; status: string }>>();
    for (const g of allGoals) {
      const arr = m.get(g.ilp_id) ?? [];
      arr.push({ title: g.title, status: g.status });
      m.set(g.ilp_id, arr);
    }
    return m;
  }, [allGoals]);
  const goalDone = (status: string) => status === 'completed' || status === 'verified';

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  // The unified ILP editor (shared with Student 360). `viewStudent` opens an
  // existing learner's plan; `createOpen` shows the learner picker first.
  const [viewStudent, setViewStudent] = useState<{ id: string; name: string } | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const queryClient = useQueryClient();
  const refreshIlps = () => {
    void queryClient.invalidateQueries({ queryKey: ['college-ilps'] });
    void queryClient.invalidateQueries({ queryKey: ['college-ilp-goals'] });
  };
  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['college-ilps'] });
    await queryClient.invalidateQueries({ queryKey: ['college-ilp-goals'] });
  };

  const openIlp = (studentId: string | null) => {
    if (!studentId) return;
    const student = students.find((s) => s.id === studentId);
    setViewStudent({ id: studentId, name: student?.name || 'Learner' });
  };

  const filteredILPs = ilps.filter((ilp) => {
    const student = students.find((s) => s.id === ilp.student_id);
    const goals = goalsByIlp.get(ilp.id) ?? [];
    const matchesSearch =
      student?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goals.some((g) => (g.title ?? '').toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus =
      filterStatus === 'all' || (ilp.status ?? '').toLowerCase() === filterStatus;
    const matchesCohort = filterCohort === 'all' || student?.cohort_id === filterCohort;
    return matchesSearch && matchesStatus && matchesCohort;
  });

  // Status is unified-lowercase (active / draft / archived) to match Student 360.
  const statusTone = (status: string | null): Tone => {
    const s = (status ?? '').toLowerCase();
    return s === 'active' ? 'green' : s === 'draft' ? 'amber' : s === 'archived' ? 'blue' : 'yellow';
  };
  const statusLabel = (status: string | null): string => {
    const s = (status ?? '').toLowerCase();
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : 'Unknown';
  };

  const targetTone = (status: string): Tone =>
    status === 'completed' || status === 'verified'
      ? 'green'
      : status === 'evidence_submitted'
        ? 'blue'
        : status === 'in_progress'
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

  const getTargetProgress = (goals: Array<{ status: string }>) => {
    if (goals.length === 0) return 0;
    const done = goals.filter((g) => goalDone(g.status)).length;
    return Math.round((done / goals.length) * 100);
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

  const statusIs = (i: { status: string | null }, s: string) =>
    (i.status ?? '').toLowerCase() === s;
  const activeCount = ilps.filter((i) => statusIs(i, 'active')).length;
  const draftCount = ilps.filter((i) => statusIs(i, 'draft')).length;
  const archivedCount = ilps.filter((i) => statusIs(i, 'archived')).length;

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
                onClick={() => setCreateOpen(true)}
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
              { value: archivedCount, label: 'Archived', sub: 'Prior versions', tone: 'blue' },
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
                      <div className="mt-0.5 text-[11.5px] text-white truncate">
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
              { value: 'active', label: 'Active', count: activeCount },
              { value: 'draft', label: 'Draft', count: draftCount },
              { value: 'archived', label: 'Archived', count: archivedCount },
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

        {ilpsLoading ? (
          <ILPCardSkeletonList count={4} />
        ) : filteredILPs.length === 0 ? (
          <EmptyState title="No ILPs found" description="Try adjusting filters or create a new ILP." />
        ) : (
          <motion.div variants={itemVariants}>
            <ListCard>
              {filteredILPs.map((ilp) => {
                const studentInfo = getStudentInfo(ilp.student_id);
                const targets = goalsByIlp.get(ilp.id) ?? [];
                const progress = getTargetProgress(targets);
                const overdue = isReviewOverdue(ilp.review_date);
                const dueSoon = isReviewDueSoon(ilp.review_date);

                return (
                  <PeopleListRow
                    key={ilp.id}
                    id={ilp.id}
                    accent={overdue ? 'red' : dueSoon ? 'amber' : 'none'}
                    lead={{
                      kind: 'avatar',
                      name: studentInfo.name,
                      photoUrl: studentInfo.photoUrl ?? null,
                      ringTone: overdue ? 'red' : dueSoon ? 'amber' : 'none',
                    }}
                    title={studentInfo.name}
                    subtitle={
                      <>
                        {getCohortName(studentInfo.cohortId)}
                        <span className="mx-1.5 text-white/25">·</span>
                        Tutor · {getTutorName(ilp.reviewed_by)}
                      </>
                    }
                    status={{
                      label: statusLabel(ilp.status),
                      tone: statusTone(ilp.status),
                    }}
                    meta={
                      <div className="space-y-2.5">
                        {targets.length > 0 && (
                          <div>
                            <div className="flex items-baseline justify-between text-[10.5px]">
                              <span className="text-white uppercase tracking-[0.12em]">
                                Targets
                              </span>
                              <span className="font-medium text-white tabular-nums">
                                {targets.filter((t) => goalDone(t.status)).length}/
                                {targets.length} · {progress}%
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
                          <div className="flex flex-wrap gap-1">
                            {targets.slice(0, 3).map((target, i) => {
                              const label = target.title ?? '';
                              return (
                                <Pill key={i} tone={targetTone(target.status)}>
                                  {label.length > 28 ? label.substring(0, 28) + '…' : label}
                                </Pill>
                              );
                            })}
                            {targets.length > 3 && (
                              <span className="text-[11px] text-white px-1.5 py-0.5">
                                +{targets.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white">
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
                    }
                    onOpen={() => openIlp(ilp.student_id)}
                    actions={[
                      {
                        label: 'Open ILP',
                        onClick: () => openIlp(ilp.student_id),
                      },
                    ]}
                  />
                );
              })}
            </ListCard>
          </motion.div>
        )}

        {/* Unified ILP editor — same data + UI as Student 360 (writes
            college_ilps + college_ilp_goals, never the legacy JSONB targets). */}
        <HubIlpSheet
          mode="view"
          open={viewStudent !== null}
          onOpenChange={(o) => {
            if (!o) setViewStudent(null);
          }}
          student={viewStudent}
          onClosed={refreshIlps}
        />
        <HubIlpSheet
          mode="create"
          open={createOpen}
          onOpenChange={setCreateOpen}
          students={students.map((s) => ({
            id: s.id,
            name: s.name,
            photo_url: s.photo_url,
            cohort_id: s.cohort_id,
          }))}
          getCohortName={getCohortName}
          onClosed={refreshIlps}
        />
      </PageFrame>
    </PullToRefresh>
  );
}

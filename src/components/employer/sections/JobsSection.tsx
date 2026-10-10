import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RefreshCw, Plus, Filter } from 'lucide-react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { AddJobDialog, type NewJobForm } from '@/components/employer/dialogs/AddJobDialog';
import {
  ResumeDraftChip,
  clearDraft,
  timeAgoShort,
  useSavedDraft,
} from '@/components/employer/dialogs/formSheetKit';
import { useAuth } from '@/contexts/AuthContext';
import { ViewJobSheet } from '@/components/employer/sheets/ViewJobSheet';
import { JobFilterSheet, JobFilters } from '@/components/employer/sheets/JobFilterSheet';
import { useJobs } from '@/hooks/useJobs';
import { useJobSignals } from '@/hooks/useJobSignals';
import { Job, JobStatus } from '@/services/jobService';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { jobStage, stageLabel, stageDef } from '@/lib/jobStages';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PageFrame, PageHero, StatStrip, LoadingBlocks } from '@/components/employer/editorial';
import {
  frameClass,
  twoColClass,
  colClass,
  panel,
  PanelTitle,
  HeroActions,
  HeroPrimary,
  ToolButton,
  ToolBadge,
  StatusPill,
  Initials,
  Row,
  PlainEmpty,
  Segments,
  SearchField,
  FilterRow,
} from '@/components/employer/pageParts/PageParts';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { JOBS_HELP } from '@/components/employer/help/jobs';

type AssignedWorker = {
  id: string;
  name: string;
  avatar_initials?: string | null;
  photo_url?: string | null;
};

const getInitials = (name: string): string => {
  if (!name) return '?';
  return (
    name
      .split(' ')
      // Words only: a client like "DEMO — Mrs Patel" gave "D—".
      .filter((part) => /^[\p{L}\p{N}]/u.test(part))
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || '?'
  );
};

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const formatMoney = (n: number) => {
  if (!n) return null;
  if (n >= 1000) {
    const k = n / 1000;
    return '£' + (k % 1 === 0 ? k.toString() : k.toFixed(1)) + 'k';
  }
  return '£' + n.toString();
};

const TAB_VALUES = ['all', 'active', 'pending', 'on_hold', 'completed'] as const;
type TabValue = (typeof TAB_VALUES)[number];

const tabMatchesJob = (tab: TabValue, status: JobStatus) => {
  switch (tab) {
    case 'all':
      return true;
    case 'active':
      return status === 'Active';
    case 'pending':
      return status === 'Pending';
    case 'on_hold':
      return status === 'On Hold';
    case 'completed':
      return status === 'Completed';
  }
};

export function JobsSection() {
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = !!roleInfo?.canSeeMoney;
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebouncedValue(searchQuery, 300);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedJobSnapshot, setSelectedJob] = useState<Job | null>(null);
  const [showJobSheet, setShowJobSheet] = useState(false);
  const { user } = useAuth();
  const jobDraft = useSavedDraft<NewJobForm>('new-job', user?.id);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [activeTab, setActiveTab] = useState<TabValue>('all');
  const { data: jobs = [], isLoading, refetch, isRefetching, isFetching } = useJobs();
  const [searchParams, setSearchParams] = useSearchParams();

  // The open sheet reads the LIVE row, so a save (status → Completed, a new
  // completed_at) shows straight away instead of a stale snapshot.
  const selectedJob = useMemo(
    () =>
      (selectedJobSnapshot && jobs.find((j) => j.id === selectedJobSnapshot.id)) ||
      selectedJobSnapshot,
    [jobs, selectedJobSnapshot]
  );

  // ?job=<id> opens that job's sheet (from a client, the Overview, or "Back to
  // job" in a section a shortcut opened). ELE-1960: the param now STAYS in the
  // URL while the sheet is open, so phone/browser back from a shortcut lands
  // on this job again instead of an unfiltered list.
  // ?new=1 opens the New job form (the Jobs hub's primary button).
  useEffect(() => {
    if (searchParams.get('new') !== '1') return;
    setShowAddDialog(true);
    const next = new URLSearchParams(searchParams);
    next.delete('new');
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  const urlJobId = searchParams.get('job');
  const urlSection = searchParams.get('section') ?? 'jobs';
  useEffect(() => {
    if (urlSection !== 'jobs' || !urlJobId || jobs.length === 0) return;
    const match = jobs.find((j) => j.id === urlJobId);
    if (!match) {
      // A job created a moment ago is not in the list until the refetch lands.
      if (isFetching) return;
      // Archived / deleted / not ours — drop the dead param.
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete('job');
          return next;
        },
        { replace: true }
      );
      return;
    }
    setSelectedJob(match);
    setShowJobSheet(true);
  }, [urlJobId, urlSection, jobs, isFetching, setSearchParams]);

  const openJobSheet = (job: Job) => {
    setSelectedJob(job);
    setShowJobSheet(true);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('job', job.id);
        return next;
      },
      { replace: true }
    );
  };

  const handleJobSheetOpenChange = (open: boolean) => {
    setShowJobSheet(open);
    if (open) return;
    // Deferred: a shortcut closes the sheet and navigates in the same tick.
    // Only strip ?job= if we are still on the Jobs page afterwards — the
    // history entry behind a shortcut must keep it so "back" reopens the job.
    window.setTimeout(() => {
      const now = new URLSearchParams(window.location.search);
      if ((now.get('section') ?? 'jobs') !== 'jobs' || !now.get('job')) return;
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete('job');
          return next;
        },
        { replace: true }
      );
    }, 0);
  };
  const { data: jobSignals } = useJobSignals();

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const { data: allAssignments = [] } = useQuery({
    queryKey: ['all-job-assignments'],
    queryFn: async () => {
      const { data, error } = await supabase.from('employer_job_assignments').select(`
          job_id,
          employee:employer_employees(id, name, avatar_initials, photo_url)
        `);
      if (error) throw error;
      return data || [];
    },
  });

  const assignmentsByJob = useMemo(() => {
    const map = new Map<string, AssignedWorker[]>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    allAssignments.forEach((a: any) => {
      if (a.employee) {
        const jobId = a.job_id;
        if (!map.has(jobId)) map.set(jobId, []);
        map.get(jobId)!.push({
          id: a.employee.id,
          name: a.employee.name,
          avatar_initials: a.employee.avatar_initials,
          photo_url: a.employee.photo_url,
        });
      }
    });
    return map;
  }, [allAssignments]);

  useEffect(() => {
    const channel = supabase
      .channel(realtimeChannelName('jobs-realtime-updates'))
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'employer_job_assignments' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['employer-jobs'] });
          queryClient.invalidateQueries({ queryKey: ['all-job-assignments'] });
        }
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'employer_jobs' }, () => {
        queryClient.invalidateQueries({ queryKey: ['employer-jobs'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const maxJobValue = useMemo(() => {
    return Math.max(...jobs.map((j) => j.value || 0), 500000);
  }, [jobs]);

  const [filters, setFilters] = useState<JobFilters>({
    statuses: [],
    minValue: 0,
    maxValue: maxJobValue,
  });

  // Widen the value filter ceiling when a bigger job loads in — a state
  // update is an effect, not a memo
  useEffect(() => {
    if (maxJobValue > 500000) {
      setFilters((f) => (f.maxValue === 500000 ? { ...f, maxValue: maxJobValue } : f));
    }
  }, [maxJobValue]);

  const activeFilterCount =
    filters.statuses.length + (filters.minValue > 0 || filters.maxValue < maxJobValue ? 1 : 0);

  const filteredJobs = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesSearch =
        !term ||
        job.title.toLowerCase().includes(term) ||
        job.client.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term);
      const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(job.status);
      const jobValue = job.value || 0;
      const matchesValue = jobValue >= filters.minValue && jobValue <= filters.maxValue;
      const matchesTab = tabMatchesJob(activeTab, job.status);
      return matchesSearch && matchesStatus && matchesValue && matchesTab;
    });
  }, [jobs, debouncedSearch, filters, activeTab]);

  const counts = useMemo(() => {
    const active = jobs.filter((j) => j.status === 'Active').length;
    const pending = jobs.filter((j) => j.status === 'Pending').length;
    const onHold = jobs.filter((j) => j.status === 'On Hold').length;
    // ELE-1960: counted from the completion date the database stamps when a
    // job moves to Completed — not updated_at, which any later edit bumps.
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const completed30d = jobs.filter((j) => {
      if (j.status !== 'Completed' || !j.completed_at) return false;
      return Date.parse(j.completed_at) >= cutoff;
    }).length;
    return { active, pending, onHold, completed30d };
  }, [jobs]);

  const tabs: { value: TabValue; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: jobs.length },
    { value: 'active', label: 'Active', count: counts.active },
    { value: 'pending', label: 'Pending', count: counts.pending },
    { value: 'on_hold', label: 'On hold', count: counts.onHold },
    {
      value: 'completed',
      label: 'Completed',
      count: jobs.filter((j) => j.status === 'Completed').length,
    },
  ];

  // Live jobs by stage, for the side panel on desktop.
  const byStage = useMemo(() => {
    const live = jobs.filter((j) => j.status !== 'Completed' && j.status !== 'Cancelled');
    const map = new Map<string, { label: string; bar: string; count: number }>();
    live.forEach((j) => {
      const d = stageDef(jobStage(j));
      const cur = map.get(d.id) ?? { label: d.label, bar: d.bar, count: 0 };
      cur.count += 1;
      map.set(d.id, cur);
    });
    return [...map.values()];
  }, [jobs]);

  const handleJobClick = (job: Job) => openJobSheet(job);

  // Live "Before you start" lines for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] =
    !isLoading && jobs.length === 0
      ? [
          {
            text: 'No jobs yet. Add your first one to book people onto it.',
            fixLabel: 'New job',
            onFix: () => setShowAddDialog(true),
          },
        ]
      : [];

  // Jobs that need chasing: an incident, an overdue invoice or a certificate
  // running out. Drawn from the same signals the rows show.
  const attention = useMemo(
    () =>
      jobs
        .map((job) => {
          const sig = jobSignals?.get(job.id);
          if (!sig) return null;
          const reasons: string[] = [];
          if (sig.incidents > 0)
            reasons.push(`${sig.incidents} incident${sig.incidents === 1 ? '' : 's'}`);
          if (sig.overdueInvoices > 0) reasons.push('Invoice overdue');
          if (sig.expiringCerts > 0) reasons.push('Certificate expiring');
          return reasons.length
            ? { job, reasons, red: sig.incidents > 0 || sig.overdueInvoices > 0 }
            : null;
        })
        .filter(Boolean) as { job: Job; reasons: string[]; red: boolean }[],
    [jobs, jobSignals]
  );

  const liveLine = (() => {
    if (jobs.length === 0) return 'No jobs yet. Add one to book people onto it.';
    const parts: string[] = [];
    parts.push(`${counts.active} active`);
    if (counts.pending > 0) parts.push(`${counts.pending} pending`);
    if (counts.onHold > 0) parts.push(`${counts.onHold} on hold`);
    const first = parts.join(', ');
    if (attention.length > 0)
      return `${first}. ${attention.length} ${attention.length === 1 ? 'job needs' : 'jobs need'} chasing.`;
    return `${first}. Nothing needs chasing.`;
  })();

  const heroActions = (
    <HeroActions>
      <HeroPrimary
        data-help="jobs.new"
        onClick={() => setShowAddDialog(true)}
        icon={<Plus className="h-4 w-4" />}
      >
        New job
      </HeroPrimary>
      <ToolButton
        label="Filter jobs"
        onClick={() => setShowFilterSheet(true)}
        icon={<Filter className="h-4 w-4" />}
      >
        <ToolBadge count={activeFilterCount} />
      </ToolButton>
      <ToolButton
        label="Refresh jobs"
        onClick={() => refetch()}
        disabled={isRefetching}
        icon={<RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />}
      />
      <PageHelpButton
        help={JOBS_HELP}
        blockers={helpBlockers}
        askContext={{ page: 'jobs', tab: activeTab }}
      />
    </HeroActions>
  );

  if (isLoading) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Jobs" description="Loading your jobs." />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const clearAll = () => {
    setSearchQuery('');
    setActiveTab('all');
    setFilters({ statuses: [], minValue: 0, maxValue: maxJobValue });
  };

  const listMeta =
    filteredJobs.length === jobs.length
      ? `${jobs.length}`
      : `${filteredJobs.length} of ${jobs.length}`;

  return (
    <PullToRefresh onRefresh={handleRefresh} isRefreshing={isRefetching}>
      <PageFrame className={frameClass}>
        <PageHero title="Jobs" description={liveLine} actions={heroActions} />

        <HowItWorks
          help={JOBS_HELP}
          blockers={helpBlockers}
          askContext={{ page: 'jobs', tab: activeTab }}
        />

        {jobDraft && !showAddDialog && (
          <ResumeDraftChip
            label={jobDraft.v.title?.trim() || 'untitled job'}
            detail={[jobDraft.v.client?.trim(), `saved ${timeAgoShort(jobDraft.savedAt)}`]
              .filter(Boolean)
              .join(' · ')}
            onResume={() => setShowAddDialog(true)}
            onDiscard={() => clearDraft('new-job', user?.id)}
          />
        )}

        <StatStrip
          columns={4}
          stats={[
            { label: 'Active', value: counts.active, onClick: () => setActiveTab('active') },
            { label: 'Pending', value: counts.pending, onClick: () => setActiveTab('pending') },
            {
              label: 'On hold',
              value: counts.onHold,
              tone: counts.onHold > 0 ? 'yellow' : undefined,
              onClick: () => setActiveTab('on_hold'),
            },
            {
              label: 'Completed',
              value: counts.completed30d,
              sub: 'Last 30 days',
              onClick: () => setActiveTab('completed'),
            },
          ]}
        />

        <FilterRow>
          <div data-help="jobs.tabs">
            <Segments
              items={tabs}
              value={activeTab}
              onChange={(v) => setActiveTab(v as TabValue)}
            />
          </div>
          <SearchField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search title, client or location"
            className="lg:w-72"
          />
        </FilterRow>

        <div className={twoColClass}>
          <div className={colClass}>
            <section data-help="jobs.list">
              <PanelTitle
                title="Jobs"
                meta={listMeta}
                action={
                  activeFilterCount > 0 || searchQuery || activeTab !== 'all'
                    ? 'Clear filters'
                    : undefined
                }
                onAction={clearAll}
              />
              {filteredJobs.length === 0 ? (
                <PlainEmpty
                  text={
                    jobs.length === 0
                      ? 'Your jobs will appear here, with who is on them, the dates and the stage.'
                      : 'No jobs match this search or filter.'
                  }
                  action={jobs.length === 0 ? 'New job' : 'Clear filters'}
                  onAction={() => (jobs.length === 0 ? setShowAddDialog(true) : clearAll())}
                />
              ) : (
                <div className={`${panel} overflow-hidden`}>
                  <div className="divide-y divide-white/[0.07]">
                    {filteredJobs.map((job) => {
                      const workers = assignmentsByJob.get(job.id) || [];
                      const sig = jobSignals?.get(job.id);
                      const dates = [formatDate(job.start_date), formatDate(job.end_date)]
                        .filter(Boolean)
                        .join(' to ');
                      const detailParts = [
                        job.client,
                        job.location,
                        canSeeMoney ? formatMoney(Number(job.value) || 0) : null,
                        dates || null,
                        workers.length > 0
                          ? `${workers.length} ${workers.length === 1 ? 'worker' : 'workers'}`
                          : null,
                      ].filter(Boolean) as string[];
                      const flags: { text: string; red?: boolean; green?: boolean }[] = [];
                      if (sig && sig.incidents > 0)
                        flags.push({
                          text: `${sig.incidents} incident${sig.incidents === 1 ? '' : 's'}`,
                          red: true,
                        });
                      if (sig && sig.overdueInvoices > 0)
                        flags.push({ text: 'Invoice overdue', red: true });
                      if (sig && sig.expiringCerts > 0) flags.push({ text: 'Cert expiring' });
                      if (sig && sig.invoiced > 0 && sig.invoiced - sig.paid > 0.5)
                        flags.push({ text: `${formatMoney(sig.invoiced - sig.paid)} due` });
                      if (sig && sig.invoiced > 0 && sig.invoiced - sig.paid <= 0.5)
                        flags.push({ text: 'Paid', green: true });
                      const stage = jobStage(job);
                      const cancelled = job.status === 'Cancelled';
                      return (
                        <Row
                          key={job.id}
                          onClick={() => handleJobClick(job)}
                          lead={
                            <Initials
                              text={getInitials(job.client || job.title)}
                              className="hidden sm:flex"
                            />
                          }
                          title={job.title}
                          detail={detailParts.join(' · ')}
                          meta={
                            flags.length > 0 ? (
                              <span>
                                {flags.map((f, i) => (
                                  <span
                                    key={f.text}
                                    className={
                                      f.red
                                        ? 'text-red-400'
                                        : f.green
                                          ? 'text-emerald-400'
                                          : 'text-elec-yellow'
                                    }
                                  >
                                    {i > 0 && <span className="text-white"> · </span>}
                                    {f.text}
                                  </span>
                                ))}
                              </span>
                            ) : undefined
                          }
                          trailing={
                            <>
                              {typeof job.progress === 'number' && job.progress > 0 && (
                                <span className="hidden text-[13px] tabular-nums text-white sm:inline">
                                  {job.progress}%
                                </span>
                              )}
                              <StatusPill
                                tone={cancelled ? 'red' : 'neutral'}
                                dot={cancelled ? undefined : stageDef(stage).bar}
                              >
                                {cancelled ? 'Cancelled' : stageLabel(stage)}
                              </StatusPill>
                            </>
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className={colClass}>
            <section>
              <PanelTitle
                title="Needs chasing"
                meta={attention.length > 0 ? `${attention.length}` : undefined}
              />
              {attention.length === 0 ? (
                <PlainEmpty text="Nothing to chase. Jobs with an incident, an overdue invoice or an expiring certificate show here." />
              ) : (
                <div className={`${panel} overflow-hidden`}>
                  <div className="divide-y divide-white/[0.07]">
                    {attention.slice(0, 6).map(({ job, reasons, red }) => (
                      <Row
                        key={job.id}
                        onClick={() => handleJobClick(job)}
                        title={job.title}
                        detail={
                          <span className={red ? 'text-red-400' : 'text-elec-yellow'}>
                            {reasons.join(' · ')}
                          </span>
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>

            {byStage.length > 0 && (
              <section className="hidden lg:block">
                <PanelTitle title="By stage" meta="Live jobs" />
                <div className={`${panel} overflow-hidden`}>
                  <div className="divide-y divide-white/[0.07]">
                    {byStage.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center justify-between gap-3 px-4 py-3 text-[14px] text-white sm:px-5"
                      >
                        <span className="flex items-center gap-2">
                          <span aria-hidden className={`h-2 w-2 rounded-full ${s.bar}`} />
                          {s.label}
                        </span>
                        <span className="font-semibold tabular-nums">{s.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>

        <AddJobDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          onCreated={(job) => openJobSheet(job)}
        />

        <JobFilterSheet
          open={showFilterSheet}
          onOpenChange={setShowFilterSheet}
          filters={filters}
          onFiltersChange={setFilters}
          maxJobValue={maxJobValue}
        />

        <ViewJobSheet
          job={selectedJob}
          open={showJobSheet}
          onOpenChange={handleJobSheetOpenChange}
        />
      </PageFrame>
    </PullToRefresh>
  );
}

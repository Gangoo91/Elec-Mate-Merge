import { useState, useMemo, useEffect, useCallback } from 'react';
import { RefreshCw, Plus, Filter } from 'lucide-react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { AddJobDialog } from '@/components/employer/dialogs/AddJobDialog';
import { ViewJobSheet } from '@/components/employer/sheets/ViewJobSheet';
import { JobFilterSheet, JobFilters } from '@/components/employer/sheets/JobFilterSheet';
import { useJobs } from '@/hooks/useJobs';
import { Job, JobStatus } from '@/services/jobService';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  PrimaryButton,
  type Tone,
} from '@/components/employer/editorial';

type AssignedWorker = {
  id: string;
  name: string;
  avatar_initials?: string | null;
  photo_url?: string | null;
};

const getInitials = (name: string): string => {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
};

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const formatMoney = (n: number) => {
  if (!n) return '£0';
  if (n >= 1000) {
    const k = n / 1000;
    return '£' + (k % 1 === 0 ? k.toString() : k.toFixed(1)) + 'k';
  }
  return '£' + n.toString();
};

const statusToTone = (status: JobStatus): Tone => {
  switch (status) {
    case 'Active':
      return 'amber';
    case 'Pending':
      return 'blue';
    case 'On Hold':
      return 'orange';
    case 'Completed':
      return 'emerald';
    case 'Cancelled':
      return 'red';
    default:
      return 'amber';
  }
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
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebouncedValue(searchQuery, 300);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobSheet, setShowJobSheet] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [activeTab, setActiveTab] = useState<TabValue>('all');
  const { data: jobs = [], isLoading, refetch, isRefetching } = useJobs();

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
      .channel('jobs-realtime-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'employer_job_assignments' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['employer-jobs'] });
          queryClient.invalidateQueries({ queryKey: ['all-job-assignments'] });
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'employer_jobs' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['employer-jobs'] });
        }
      )
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

  useMemo(() => {
    if (filters.maxValue === 500000 && maxJobValue > 500000) {
      setFilters((f) => ({ ...f, maxValue: maxJobValue }));
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
      const matchesStatus =
        filters.statuses.length === 0 || filters.statuses.includes(job.status);
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
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const completed30d = jobs.filter((j) => {
      if (j.status !== 'Completed') return false;
      const ts = j.updated_at ? Date.parse(j.updated_at) : 0;
      return ts >= cutoff;
    }).length;
    return { active, pending, onHold, completed30d };
  }, [jobs]);

  const tabs = useMemo(
    () => [
      { value: 'all', label: 'All', count: jobs.length },
      { value: 'active', label: 'Active', count: counts.active },
      { value: 'pending', label: 'Pending', count: counts.pending },
      { value: 'on_hold', label: 'On hold', count: counts.onHold },
      { value: 'completed', label: 'Completed', count: jobs.filter((j) => j.status === 'Completed').length },
    ],
    [jobs, counts]
  );

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setShowJobSheet(true);
  };

  const heroActions = (
    <>
      <PrimaryButton onClick={() => setShowAddDialog(true)}>
        <Plus className="h-4 w-4 mr-1.5" />
        New job
      </PrimaryButton>
      <IconButton
        onClick={() => setShowFilterSheet(true)}
        aria-label="Filter jobs"
        className="relative"
      >
        <Filter className="h-4 w-4" />
        {activeFilterCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 min-w-[16px] px-1 rounded-full bg-elec-yellow text-black text-[9px] font-bold flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </IconButton>
      <IconButton
        onClick={() => refetch()}
        disabled={isRefetching}
        aria-label="Refresh jobs"
      >
        <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
      </IconButton>
    </>
  );

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Operations"
          title="Jobs"
          description="Active jobs, assignments and status."
          tone="amber"
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <PullToRefresh onRefresh={handleRefresh} isRefreshing={isRefetching}>
      <PageFrame>
        <PageHero
          eyebrow="Operations"
          title="Jobs"
          description="Active jobs, assignments and status."
          tone="amber"
          actions={heroActions}
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Active', value: counts.active, tone: 'amber' },
            { label: 'Pending', value: counts.pending, tone: 'blue' },
            { label: 'On hold', value: counts.onHold, tone: 'orange' },
            {
              label: 'Completed 30d',
              value: counts.completed30d,
              tone: 'emerald',
              accent: true,
            },
          ]}
        />

        <FilterBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(v) => setActiveTab(v as TabValue)}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search title, client or location…"
        />

        {filteredJobs.length === 0 ? (
          <EmptyState
            title="No jobs match these filters"
            description={
              jobs.length === 0
                ? 'Create your first job to start scheduling people, costs and progress.'
                : 'Adjust the search, tab or filters to see more results.'
            }
            action={jobs.length === 0 ? 'New job' : 'Clear filters'}
            onAction={() => {
              if (jobs.length === 0) {
                setShowAddDialog(true);
              } else {
                setSearchQuery('');
                setActiveTab('all');
                setFilters({ statuses: [], minValue: 0, maxValue: maxJobValue });
              }
            }}
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="amber"
              title="Jobs"
              meta={<Pill tone="amber">{filteredJobs.length}</Pill>}
            />
            <ListBody>
              {filteredJobs.map((job) => {
                const workers = assignmentsByJob.get(job.id) || [];
                const dates = [formatDate(job.start_date), formatDate(job.end_date)]
                  .filter(Boolean)
                  .join(' → ');
                const subtitleParts = [
                  job.client,
                  job.location,
                  formatMoney(Number(job.value) || 0),
                  dates || null,
                  workers.length > 0
                    ? `${workers.length} ${workers.length === 1 ? 'worker' : 'workers'}`
                    : null,
                ].filter(Boolean) as string[];
                return (
                  <ListRow
                    key={job.id}
                    lead={<Avatar initials={getInitials(job.client || job.title)} />}
                    title={job.title}
                    subtitle={subtitleParts.join(' · ')}
                    accent={statusToTone(job.status)}
                    trailing={
                      <>
                        {typeof job.progress === 'number' && job.progress > 0 && (
                          <span className="text-[11px] tabular-nums text-white">
                            {job.progress}%
                          </span>
                        )}
                        <Pill tone={statusToTone(job.status)}>{job.status}</Pill>
                      </>
                    }
                    onClick={() => handleJobClick(job)}
                  />
                );
              })}
            </ListBody>
          </ListCard>
        )}

        <AddJobDialog open={showAddDialog} onOpenChange={setShowAddDialog} />

        <JobFilterSheet
          open={showFilterSheet}
          onOpenChange={setShowFilterSheet}
          filters={filters}
          onFiltersChange={setFilters}
          maxJobValue={maxJobValue}
        />

        <ViewJobSheet job={selectedJob} open={showJobSheet} onOpenChange={setShowJobSheet} />
      </PageFrame>
    </PullToRefresh>
  );
}

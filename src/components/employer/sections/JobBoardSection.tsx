import { useState, useMemo } from 'react';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { JOB_BOARD_HELP } from '@/components/employer/help/jobs';
import { Input } from '@/components/ui/input';
import { RefreshCw, Plus, X, Filter, Archive, LayoutTemplate, Kanban, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileKanban } from '@/components/employer/MobileKanban';
import { ViewJobSheet } from '@/components/employer/sheets/ViewJobSheet';
import { CopyJobSheet } from '@/components/employer/sheets/CopyJobSheet';
import { ArchivedJobsSheet } from '@/components/employer/sheets/ArchivedJobsSheet';
import { JobTemplatesSheet } from '@/components/employer/JobTemplatesSheet';
import { JobCardContextMenu } from '@/components/employer/JobCardContextMenu';
import {
  useJobs,
  useUpdateJob,
  useCreateJob,
  useArchiveJob,
  useSetJobAsTemplate,
} from '@/hooks/useJobs';
import {
  JOB_STAGES,
  jobStage,
  progressForStage,
  statusForStage,
  isJobStage,
  type JobStage,
} from '@/lib/jobStages';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { useAllJobLabelAssignments, JobLabel } from '@/hooks/useJobLabels';
import { useAllJobChecklistSummaries } from '@/hooks/useJobChecklists';
import { JobLabelStrips } from '@/components/employer/JobLabelPicker';
import { JobChecklistProgress } from '@/components/employer/JobChecklist';
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import {
  PageFrame,
  PageHero,
  StatStrip,
  LoadingBlocks,
  PrimaryButton,
  inputClass,
  checkboxClass,
  type Tone,
} from '@/components/employer/editorial';
import {
  frameClass,
  PanelTitle,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  ToolButton,
  ToolBadge,
  StatusPill,
  Initials,
  Row,
  RowList,
  PlainEmpty,
  SearchField,
} from '@/components/employer/pageParts/PageParts';

type ViewMode = 'kanban' | 'list';

interface StageDef {
  id: JobStage;
  label: string;
  tone: Tone;
  bar: string;
}

// One stage model for the board, timeline, diary and job list (ELE-1961).
// board_stage is always set now (backfilled, and kept in step with status by
// the sync_job_stage trigger), so there is no status/progress guesswork here.
const stages: StageDef[] = JOB_STAGES.map((s) => ({
  id: s.id,
  label: s.label,
  tone: s.tone,
  bar: s.bar,
}));

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '—';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export function JobBoardSection() {
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedJob, setDraggedJob] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<(typeof jobs)[number] | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [quickAddStage, setQuickAddStage] = useState<JobStage | null>(null);
  const [quickAddTitle, setQuickAddTitle] = useState('');
  const [quickAddClient, setQuickAddClient] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [mobileAddSignal, setMobileAddSignal] = useState(0);
  const [copySheetJob, setCopySheetJob] = useState<(typeof jobs)[number] | null>(null);

  const queryClient = useQueryClient();
  // Office managers dispatch but never see money (ELE-1831).
  const { data: role } = useEmployerRole();
  const showMoney = role?.canSeeMoney ?? false;
  const { data: jobsData = [], isLoading, refetch } = useJobs();
  const { data: labelAssignments = [] } = useAllJobLabelAssignments();
  const { data: checklistSummaries = {} } = useAllJobChecklistSummaries();
  const updateJob = useUpdateJob();
  const createJob = useCreateJob();
  const archiveJob = useArchiveJob();
  const setAsTemplate = useSetJobAsTemplate();

  const labelsByJob = useMemo(() => {
    const map = new Map<string, JobLabel[]>();
    labelAssignments.forEach((a) => {
      if (!map.has(a.job_id)) map.set(a.job_id, []);
      if (a.label) map.get(a.job_id)!.push(a.label);
    });
    return map;
  }, [labelAssignments]);

  // Real assigned crews for the mobile cards (was hardcoded []). Same
  // query/key as JobsSection so the cache is shared.
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

  const workersByJob = useMemo(() => {
    const map = new Map<string, Array<{ initials: string; name?: string }>>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    allAssignments.forEach((a: any) => {
      if (!a.employee) return;
      if (!map.has(a.job_id)) map.set(a.job_id, []);
      map.get(a.job_id)!.push({
        initials: a.employee.avatar_initials || getInitials(a.employee.name || ''),
        name: a.employee.name,
      });
    });
    return map;
  }, [allAssignments]);

  // Cancelled jobs are dead work — they must not reappear in a live column
  // (or count in the stat strip / pipeline total) off their stale progress.
  const jobs = jobsData
    .filter((job) => job.status !== 'Cancelled')
    .map((job) => ({
      ...job,
      stage: jobStage(job) as JobStage,
    }));

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCompleted = !hideCompleted || job.stage !== 'Complete';
    return matchesSearch && matchesCompleted;
  });

  const getJobsForStage = (stageId: string) => filteredJobs.filter((job) => job.stage === stageId);

  const getStageValue = (stageId: string) =>
    getJobsForStage(stageId).reduce((sum, job) => sum + (job.value || 0), 0);

  // Compact money that doesn't lie: £600 stays £600, £1.5k, £12k.
  const fmtCompact = (n: number) => {
    if (!n) return '£0';
    if (n >= 1000) return `£${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}k`;
    return `£${Math.round(n)}`;
  };

  const handleDragStart = (jobId: string) => setDraggedJob(jobId);

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    if (dragOverStage !== stageId) setDragOverStage(stageId);
  };

  const handleDrop = async (stageId: string) => {
    setDragOverStage(null);
    if (!draggedJob) return;

    const job = jobs.find((j) => j.id === draggedJob);
    if (!job || job.stage === stageId || !isJobStage(stageId)) {
      setDraggedJob(null);
      return;
    }

    const draggedJobRow = jobs.find((j) => j.id === draggedJob);
    const progress = progressForStage(stageId, draggedJobRow?.progress ?? 0);

    try {
      await updateJob.mutateAsync({
        id: draggedJob,
        updates: { board_stage: stageId, status: statusForStage(stageId), progress },
      });
      toast.success(`Moved to ${stages.find((s) => s.id === stageId)?.label ?? stageId}`);
    } catch (error) {
      toast.error('Failed to move job');
    }

    setDraggedJob(null);
  };

  const handleJobClick = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setSheetOpen(true);
    }
  };

  const handleQuickAdd = async (stageId: JobStage) => {
    if (!quickAddTitle.trim() || !quickAddClient.trim()) return;

    const progress = progressForStage(stageId, 0);

    try {
      await createJob.mutateAsync({
        title: quickAddTitle.trim(),
        client: quickAddClient.trim(),
        location: 'TBC',
        status: statusForStage(stageId),
        progress,
        board_stage: stageId,
        value: 0,
        workers_count: 0,
        lat: null,
        lng: null,
        start_date: null,
        end_date: null,
        description: null,
        client_phone: null,
        client_email: null,
      });
      toast.success('Job created');
      setQuickAddStage(null);
      setQuickAddTitle('');
      setQuickAddClient('');
    } catch (error) {
      toast.error('Failed to create job');
    }
  };

  const handleMobileQuickAdd = async (title: string, stageIdRaw: string) => {
    const stageId: JobStage = isJobStage(stageIdRaw) ? stageIdRaw : 'Enquiry';
    const progress = progressForStage(stageId, 0);

    try {
      await createJob.mutateAsync({
        title: title.trim(),
        client: 'TBC',
        location: 'TBC',
        status: statusForStage(stageId),
        progress,
        board_stage: stageId,
        value: 0,
        workers_count: 0,
        lat: null,
        lng: null,
        start_date: null,
        end_date: null,
        description: null,
        client_phone: null,
        client_email: null,
      });
      toast.success('Job created');
    } catch (error) {
      toast.error('Failed to create job');
    }
  };

  const handleArchiveJob = async (jobId: string) => {
    try {
      await archiveJob.mutateAsync(jobId);
      toast.success('Job archived');
    } catch (error) {
      toast.error('Failed to archive job');
    }
  };

  const handleMoveJob = async (jobId: string, stageId: string) => {
    if (!isJobStage(stageId)) return;
    const movingJob = jobs.find((j) => j.id === jobId);
    const progress = progressForStage(stageId, movingJob?.progress ?? 0);
    try {
      await updateJob.mutateAsync({
        id: jobId,
        updates: { board_stage: stageId, status: statusForStage(stageId), progress },
      });
      toast.success(`Moved to ${stageId}`);
    } catch (error) {
      toast.error('Failed to move job');
    }
  };

  const handleSetTemplate = async (jobId: string, isTemplate: boolean) => {
    try {
      await setAsTemplate.mutateAsync({ id: jobId, isTemplate });
      toast.success(isTemplate ? 'Saved as template' : 'Removed from templates');
    } catch (error) {
      toast.error('Failed to update template status');
    }
  };

  const handleRefresh = async () => {
    await refetch();
    queryClient.invalidateQueries({ queryKey: ['job-label-assignments'] });
    queryClient.invalidateQueries({ queryKey: ['job-checklist-summaries'] });
  };

  const totalJobs = jobs.length;
  const pipelineCount = jobs.filter((j) => j.stage === 'Enquiry' || j.stage === 'Quoted').length;
  const bookedCount = jobs.filter((j) => j.stage === 'Confirmed' || j.stage === 'Scheduled').length;
  const onSiteCount = jobs.filter((j) => j.stage === 'In Progress' || j.stage === 'Testing').length;
  const onHoldCount = jobs.filter((j) => j.stage === 'On Hold').length;
  const pipelineValue = jobs.reduce((sum, j) => sum + (j.value || 0), 0);

  const mobileKanbanItems = filteredJobs.map((job) => {
    const jobLabels = labelsByJob.get(job.id) || [];
    const checklistData = checklistSummaries[job.id];

    return {
      id: job.id,
      title: job.title,
      subtitle: job.client,
      value: showMoney && job.value ? fmtCompact(job.value) : undefined,
      progress: job.progress,
      stage: job.stage,
      location: job.location,
      workersCount: job.workers_count,
      checklistTotal: checklistData?.total || 0,
      checklistCompleted: checklistData?.completed || 0,
      badges: jobLabels.map((label) => ({
        label: label.name,
        color: label.colour,
      })),
      assignedWorkers: workersByJob.get(job.id) || [],
    };
  });

  const mobileStages = stages.map((stage) => ({
    id: stage.id,
    label: stage.label,
    color: stage.bar,
  }));

  // One live line: where the board stands, and anything stuck.
  const liveLine = (() => {
    if (totalJobs === 0) return 'No jobs on the board yet. Add one to start at Enquiry.';
    const parts = [`${totalJobs} ${totalJobs === 1 ? 'job' : 'jobs'} on the board`];
    if (showMoney && pipelineValue > 0) parts[0] += `, ${fmtCompact(pipelineValue)} in all`;
    const tail =
      onHoldCount > 0
        ? `${onHoldCount} on hold.`
        : isMobile
          ? 'Press and hold a card to move it.'
          : 'Drag a card to move it; the timeline and diary move with it.';
    return `${parts.join('')}. ${tail}`;
  })();

  const startAdd = () => {
    if (isMobile) {
      setViewMode('kanban');
      setMobileAddSignal((n) => n + 1);
    } else {
      setViewMode('kanban');
      setQuickAddStage('Enquiry');
    }
  };

  const heroActions = (
    <HeroActions>
      <HeroPrimary data-help="jobboard.add" onClick={startAdd} icon={<Plus className="h-4 w-4" />}>
        Add job
      </HeroPrimary>
      <HeroSecondary
        data-help="jobboard.templates"
        label="Templates"
        onClick={() => setShowTemplates(true)}
        icon={<LayoutTemplate className="h-4 w-4" />}
      >
        Templates
      </HeroSecondary>
      <HeroSecondary
        data-help="jobboard.archived"
        label="Archived jobs"
        onClick={() => setShowArchived(true)}
        icon={<Archive className="h-4 w-4" />}
      >
        Archived
      </HeroSecondary>
      <ToolButton
        label="Refresh"
        onClick={handleRefresh}
        icon={<RefreshCw className="h-4 w-4" />}
      />
      <PageHelpButton help={JOB_BOARD_HELP} askContext={{ page: 'jobboard', tab: viewMode }} />
    </HeroActions>
  );

  if (isLoading) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Job board" description="Loading the board." />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <PageFrame className={frameClass}>
      <PageHero title="Job board" description={liveLine} actions={heroActions} />

      <HowItWorks help={JOB_BOARD_HELP} askContext={{ page: 'jobboard', tab: viewMode }} />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Enquiry and quoted', value: pipelineCount, sub: 'Not won yet' },
          { label: 'Confirmed and scheduled', value: bookedCount, sub: 'Won, waiting to start' },
          { label: 'In progress and testing', value: onSiteCount, sub: 'On site now' },
          {
            label: 'On hold',
            value: onHoldCount,
            tone: onHoldCount > 0 ? 'yellow' : undefined,
            sub: onHoldCount > 0 ? 'Waiting on something' : 'Nothing stuck',
          },
        ]}
      />

      <div className="flex items-center gap-2">
        <SearchField
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search jobs"
          className="flex-1 lg:max-w-sm"
        />
        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger asChild>
            <ToolButton label="Filters" icon={<Filter className="h-4 w-4" />}>
              <ToolBadge count={hideCompleted ? 1 : 0} />
            </ToolButton>
          </PopoverTrigger>
          <PopoverContent
            className="w-64 p-4 bg-[hsl(0_0%_12%)] border-white/[0.08] text-white"
            align="end"
          >
            <div className="space-y-3">
              <div className="text-[13px] font-semibold text-white">Filters</div>
              <label
                htmlFor="hide-completed"
                className="flex min-h-[44px] items-center gap-2.5 cursor-pointer touch-manipulation"
              >
                <Checkbox
                  id="hide-completed"
                  checked={hideCompleted}
                  onCheckedChange={(checked) => setHideCompleted(checked as boolean)}
                  className={checkboxClass}
                />
                <span className="text-[14px] text-white">Hide completed jobs</span>
              </label>
            </div>
          </PopoverContent>
        </Popover>
        <div
          role="tablist"
          aria-label="View"
          className="flex h-11 shrink-0 items-center rounded-full border border-white/[0.12] bg-white/[0.04] p-0.5"
        >
          {(
            [
              { id: 'kanban', label: 'Board', icon: Kanban },
              { id: 'list', label: 'List', icon: List },
            ] as const
          ).map((v) => {
            const Icon = v.icon;
            const on = viewMode === v.id;
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-label={`${v.label} view`}
                onClick={() => setViewMode(v.id)}
                className={cn(
                  'inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-[13px] font-semibold touch-manipulation transition-colors',
                  on ? 'bg-elec-yellow text-black' : 'text-white hover:bg-white/[0.06]'
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{v.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {viewMode === 'kanban' ? (
        isMobile ? (
          <PullToRefresh onRefresh={handleRefresh}>
            <div data-help="jobboard.board">
              <MobileKanban
                items={mobileKanbanItems}
                stages={mobileStages}
                onItemClick={handleJobClick}
                onStageChange={(itemId, newStage) => handleMoveJob(itemId, newStage)}
                onArchive={handleArchiveJob}
                onQuickAdd={handleMobileQuickAdd}
                addSignal={mobileAddSignal}
              />
            </div>
          </PullToRefresh>
        ) : filteredJobs.length === 0 && quickAddStage === null ? (
          <PlainEmpty
            text={
              jobs.length === 0
                ? 'Your jobs appear here as cards, one column per stage from Enquiry to Complete.'
                : 'No jobs match this search or filter.'
            }
            action={jobs.length === 0 ? 'Add job' : 'Clear search'}
            onAction={() => {
              if (jobs.length === 0) setQuickAddStage('Enquiry');
              else {
                setSearchQuery('');
                setHideCompleted(false);
              }
            }}
          />
        ) : (
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4" data-help="jobboard.board">
            {stages.map((stage) => {
              const stageJobs = getJobsForStage(stage.id);
              const stageValue = getStageValue(stage.id);
              // Only the hovered column lights up — not every column at once.
              const isDragTarget = draggedJob !== null && dragOverStage === stage.id;

              return (
                <div
                  key={stage.id}
                  className={cn(
                    'min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.08] to-white/[0.04] transition-colors',
                    isDragTarget && 'border-elec-yellow'
                  )}
                  onDragOver={(e) => handleDragOver(e, stage.id)}
                  onDrop={() => handleDrop(stage.id)}
                >
                  <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
                    <span aria-hidden className={cn('h-2 w-2 shrink-0 rounded-full', stage.bar)} />
                    <h2 className="text-[15px] font-semibold text-white">{stage.label}</h2>
                    <span className="text-[13px] tabular-nums text-white">{stageJobs.length}</span>
                    {showMoney && stageValue > 0 && (
                      <span className="ml-auto text-[13px] tabular-nums text-white">
                        {fmtCompact(stageValue)}
                      </span>
                    )}
                  </div>
                  <div className="divide-y divide-white/[0.07]">
                    {stageJobs.map((job) => {
                      const jobLabels = labelsByJob.get(job.id) || [];
                      const checklistData = checklistSummaries[job.id];

                      return (
                        <JobCardContextMenu
                          key={job.id}
                          stages={stages.map((s) => ({
                            id: s.id,
                            label: s.label,
                            color: '',
                          }))}
                          currentStage={job.stage}
                          isTemplate={job.is_template}
                          onCopy={() => setCopySheetJob(job)}
                          onArchive={() => handleArchiveJob(job.id)}
                          onMove={(stageId) => handleMoveJob(job.id, stageId)}
                          onOpenLabels={() => handleJobClick(job.id)}
                          onOpenChecklist={() => handleJobClick(job.id)}
                          onOpenDetails={() => handleJobClick(job.id)}
                          onMarkAsTemplate={() => handleSetTemplate(job.id, !job.is_template)}
                        >
                          <div
                            draggable
                            onDragStart={() => handleDragStart(job.id)}
                            onDragEnd={() => {
                              // Cancelled drag (Escape / dropped outside a
                              // column) must not leave a column highlighted.
                              setDraggedJob(null);
                              setDragOverStage(null);
                            }}
                            className={cn(
                              'group relative cursor-grab active:cursor-grabbing transition-opacity',
                              draggedJob === job.id && 'opacity-50'
                            )}
                          >
                            <button
                              type="button"
                              onClick={() => handleJobClick(job.id)}
                              className="block w-full px-4 py-3 text-left touch-manipulation transition-colors hover:bg-white/[0.04]"
                            >
                              <p className="text-[14.5px] font-semibold leading-snug text-white line-clamp-2">
                                {job.title}
                              </p>
                              <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-white">
                                <span className="truncate">{job.client}</span>
                                {showMoney && (job.value || 0) > 0 && (
                                  <span className="shrink-0 tabular-nums">
                                    · {fmtCompact(job.value || 0)}
                                  </span>
                                )}
                                {job.progress > 0 && job.progress < 100 && (
                                  <span className="ml-auto shrink-0 tabular-nums">
                                    {job.progress}%
                                  </span>
                                )}
                              </p>
                            </button>
                            {(jobLabels.length > 0 ||
                              (checklistData && checklistData.total > 0)) && (
                              <div className="px-4 pb-3 -mt-1 space-y-2">
                                {jobLabels.length > 0 && <JobLabelStrips labels={jobLabels} />}
                                {checklistData && checklistData.total > 0 && (
                                  <JobChecklistProgress
                                    completed={checklistData.completed}
                                    total={checklistData.total}
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        </JobCardContextMenu>
                      );
                    })}

                    {quickAddStage === stage.id ? (
                      <div className="px-4 py-3 space-y-2 bg-[hsl(0_0%_10%)]">
                        <Input
                          placeholder="Job title"
                          value={quickAddTitle}
                          onChange={(e) => setQuickAddTitle(e.target.value)}
                          className={inputClass}
                          autoFocus
                        />
                        <Input
                          placeholder="Client name"
                          value={quickAddClient}
                          onChange={(e) => setQuickAddClient(e.target.value)}
                          className={inputClass}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleQuickAdd(stage.id);
                            if (e.key === 'Escape') setQuickAddStage(null);
                          }}
                        />
                        <div className="flex gap-2">
                          <PrimaryButton
                            onClick={() => handleQuickAdd(stage.id)}
                            disabled={
                              !quickAddTitle.trim() || !quickAddClient.trim() || createJob.isPending
                            }
                            fullWidth
                          >
                            Add job
                          </PrimaryButton>
                          <button
                            onClick={() => {
                              setQuickAddStage(null);
                              setQuickAddTitle('');
                              setQuickAddClient('');
                            }}
                            aria-label="Cancel"
                            className="h-11 w-11 shrink-0 rounded-full bg-white/[0.06] border border-white/[0.1] text-white inline-flex items-center justify-center hover:bg-white/[0.1] transition-colors touch-manipulation"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setQuickAddStage(stage.id)}
                        className="w-full h-11 px-4 flex items-center gap-2 text-[13px] font-semibold text-white hover:bg-white/[0.04] transition-colors touch-manipulation"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add job</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : filteredJobs.length === 0 ? (
        <PlainEmpty
          text="No jobs match this search or filter."
          action="Clear search"
          onAction={() => {
            setSearchQuery('');
            setHideCompleted(false);
          }}
        />
      ) : (
        <section>
          <PanelTitle title="All jobs" meta={`${filteredJobs.length}`} />
          <RowList>
            {filteredJobs.map((job) => {
              const def = stages.find((s) => s.id === job.stage);
              return (
                <Row
                  key={job.id}
                  onClick={() => handleJobClick(job.id)}
                  lead={
                    <Initials
                      text={getInitials(job.client || job.title)}
                      className="hidden sm:flex"
                    />
                  }
                  title={job.title}
                  detail={[
                    job.client,
                    showMoney ? `£${(job.value || 0).toLocaleString()}` : null,
                    job.progress > 0 ? `${job.progress}%` : null,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                  trailing={<StatusPill dot={def?.bar}>{def?.label ?? job.stage}</StatusPill>}
                />
              );
            })}
          </RowList>
        </section>
      )}

      <ViewJobSheet job={selectedJob} open={sheetOpen} onOpenChange={setSheetOpen} />
      <CopyJobSheet
        job={copySheetJob}
        open={!!copySheetJob}
        onOpenChange={(open) => !open && setCopySheetJob(null)}
      />
      <ArchivedJobsSheet open={showArchived} onOpenChange={setShowArchived} />
      <JobTemplatesSheet open={showTemplates} onOpenChange={setShowTemplates} />
    </PageFrame>
  );
}

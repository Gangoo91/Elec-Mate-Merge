import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import {
  RefreshCw,
  Plus,
  X,
  Filter,
  Archive,
  LayoutTemplate,
  Kanban,
  List,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileKanban } from '@/components/employer/MobileKanban';
import { ViewJobSheet } from '@/components/employer/sheets/ViewJobSheet';
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
import { useAllJobLabelAssignments, JobLabel } from '@/hooks/useJobLabels';
import { useAllJobChecklistSummaries } from '@/hooks/useJobChecklists';
import { JobLabelStrips } from '@/components/employer/JobLabelPicker';
import { JobChecklistProgress } from '@/components/employer/JobChecklist';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  Avatar,
  IconButton,
  EmptyState,
  LoadingBlocks,
  FilterBar,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  checkboxClass,
  type Tone,
} from '@/components/employer/editorial';

type ViewMode = 'kanban' | 'list';

interface StageDef {
  id: string;
  label: string;
  tone: Tone;
}

const stages: StageDef[] = [
  { id: 'Quoted', label: 'Quoted', tone: 'amber' },
  { id: 'Confirmed', label: 'Confirmed', tone: 'cyan' },
  { id: 'Scheduled', label: 'Scheduled', tone: 'blue' },
  { id: 'In Progress', label: 'In Progress', tone: 'yellow' },
  { id: 'Testing', label: 'Testing', tone: 'purple' },
  { id: 'Complete', label: 'Complete', tone: 'emerald' },
];

const stageToStatusMap: Record<string, { status: string; progress: number }> = {
  Quoted: { status: 'Pending', progress: 0 },
  Confirmed: { status: 'On Hold', progress: 0 },
  Scheduled: { status: 'Active', progress: 0 },
  'In Progress': { status: 'Active', progress: 25 },
  Testing: { status: 'Active', progress: 90 },
  Complete: { status: 'Completed', progress: 100 },
};

const getStageFromJob = (job: { status: string; progress: number }): string => {
  if (job.status === 'Completed') return 'Complete';
  if (job.status === 'Pending') return 'Quoted';
  if (job.status === 'On Hold') return 'Confirmed';
  if (job.progress >= 90) return 'Testing';
  if (job.progress > 0) return 'In Progress';
  return 'Scheduled';
};

const getStageTone = (stageId: string): Tone =>
  stages.find((s) => s.id === stageId)?.tone ?? 'yellow';

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '—';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getValueTone = (value: number): Tone => {
  if (value >= 10000) return 'emerald';
  if (value >= 5000) return 'yellow';
  if (value >= 1000) return 'cyan';
  return 'amber';
};

export function JobBoardSection() {
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedJob, setDraggedJob] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<(typeof jobs)[number] | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [quickAddStage, setQuickAddStage] = useState<string | null>(null);
  const [quickAddTitle, setQuickAddTitle] = useState('');
  const [quickAddClient, setQuickAddClient] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [, setCopySheetJob] = useState<(typeof jobs)[number] | null>(null);

  const queryClient = useQueryClient();
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

  const jobs = jobsData.map((job) => ({
    ...job,
    stage: getStageFromJob(job),
  }));

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCompleted = !hideCompleted || job.stage !== 'Complete';
    return matchesSearch && matchesCompleted;
  });

  const getJobsForStage = (stageId: string) =>
    filteredJobs.filter((job) => job.stage === stageId);

  const getStageValue = (stageId: string) =>
    getJobsForStage(stageId).reduce((sum, job) => sum + (job.value || 0), 0);

  const handleDragStart = (jobId: string) => setDraggedJob(jobId);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (stageId: string) => {
    if (!draggedJob) return;

    const job = jobs.find((j) => j.id === draggedJob);
    if (!job || job.stage === stageId) {
      setDraggedJob(null);
      return;
    }

    const { status, progress } = stageToStatusMap[stageId];

    try {
      await updateJob.mutateAsync({
        id: draggedJob,
        updates: { status: status as any, progress },
      });
      toast.success(`Moved to ${stageId}`);
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

  const handleQuickAdd = async (stageId: string) => {
    if (!quickAddTitle.trim() || !quickAddClient.trim()) return;

    const { status, progress } = stageToStatusMap[stageId];

    try {
      await createJob.mutateAsync({
        title: quickAddTitle.trim(),
        client: quickAddClient.trim(),
        location: 'TBC',
        status: status as any,
        progress,
        value: 0,
        workers_count: 0,
        lat: null,
        lng: null,
        start_date: null,
        end_date: null,
        description: null,
      });
      toast.success('Job created');
      setQuickAddStage(null);
      setQuickAddTitle('');
      setQuickAddClient('');
    } catch (error) {
      toast.error('Failed to create job');
    }
  };

  const handleMobileQuickAdd = async (title: string, stageId: string) => {
    const { status, progress } = stageToStatusMap[stageId];

    try {
      await createJob.mutateAsync({
        title: title.trim(),
        client: 'TBC',
        location: 'TBC',
        status: status as any,
        progress,
        value: 0,
        workers_count: 0,
        lat: null,
        lng: null,
        start_date: null,
        end_date: null,
        description: null,
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
    const { status, progress } = stageToStatusMap[stageId];
    try {
      await updateJob.mutateAsync({
        id: jobId,
        updates: { status: status as any, progress },
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
  const todoCount = jobs.filter((j) => j.stage === 'Quoted' || j.stage === 'Confirmed').length;
  const inProgressCount = jobs.filter(
    (j) => j.stage === 'Scheduled' || j.stage === 'In Progress'
  ).length;
  const reviewCount = jobs.filter((j) => j.stage === 'Testing').length;
  const doneCount = jobs.filter((j) => j.stage === 'Complete').length;
  const pipelineValue = jobs.reduce((sum, j) => sum + (j.value || 0), 0);

  const mobileKanbanItems = filteredJobs.map((job) => {
    const jobLabels = labelsByJob.get(job.id) || [];
    const checklistData = checklistSummaries[job.id];

    return {
      id: job.id,
      title: job.title,
      subtitle: job.client,
      value: job.value ? `£${(job.value / 1000).toFixed(0)}k` : undefined,
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
      assignedWorkers: [],
    };
  });

  const mobileStages = stages.map((stage) => ({
    id: stage.id,
    label: stage.label,
    color: '',
  }));

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Operations"
          title="Job Board"
          description="Kanban view of every job — drag cards between columns."
          tone="blue"
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <PageHero
        eyebrow="Operations"
        title="Job Board"
        description="Kanban view of every job — drag cards between columns."
        tone="blue"
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <SecondaryButton onClick={() => setShowTemplates(true)}>
              <LayoutTemplate className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Templates</span>
            </SecondaryButton>
            <SecondaryButton onClick={() => setShowArchived(true)}>
              <Archive className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Archived</span>
            </SecondaryButton>
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <button
                  className="h-11 px-5 inline-flex items-center gap-2 rounded-full bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.1] transition-all touch-manipulation text-[13px] font-medium"
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                  {hideCompleted && <Pill tone="yellow">1</Pill>}
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-60 p-4 bg-[hsl(0_0%_12%)] border-white/[0.06] text-white"
                align="end"
              >
                <div className="space-y-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                    Filters
                  </div>
                  <label
                    htmlFor="hide-completed"
                    className="flex items-center gap-2.5 cursor-pointer touch-manipulation"
                  >
                    <Checkbox
                      id="hide-completed"
                      checked={hideCompleted}
                      onCheckedChange={(checked) => setHideCompleted(checked as boolean)}
                      className={checkboxClass}
                    />
                    <span className="text-[13px] text-white">Hide completed jobs</span>
                  </label>
                </div>
              </PopoverContent>
            </Popover>
            <div className="flex items-center bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full p-1 h-11">
              <button
                onClick={() => setViewMode('kanban')}
                aria-label="Kanban view"
                className={cn(
                  'h-9 w-9 inline-flex items-center justify-center rounded-full transition-colors touch-manipulation',
                  viewMode === 'kanban'
                    ? 'bg-elec-yellow text-black'
                    : 'text-white hover:bg-white/[0.06]'
                )}
              >
                <Kanban className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List view"
                className={cn(
                  'h-9 w-9 inline-flex items-center justify-center rounded-full transition-colors touch-manipulation',
                  viewMode === 'list'
                    ? 'bg-elec-yellow text-black'
                    : 'text-white hover:bg-white/[0.06]'
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            <IconButton onClick={handleRefresh} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </div>
        }
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'To do', value: todoCount, tone: 'orange' },
          { label: 'In progress', value: inProgressCount, tone: 'blue' },
          { label: 'Review', value: reviewCount, tone: 'amber' },
          { label: 'Done', value: doneCount, tone: 'emerald' },
        ]}
      />

      <FilterBar
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search jobs…"
      />

      {viewMode === 'kanban' ? (
        isMobile ? (
          <PullToRefresh onRefresh={handleRefresh}>
            <MobileKanban
              items={mobileKanbanItems}
              stages={mobileStages}
              onItemClick={handleJobClick}
              onStageChange={async (itemId, newStage) => {
                const { status, progress } = stageToStatusMap[newStage];
                try {
                  await updateJob.mutateAsync({
                    id: itemId,
                    updates: { status: status as any, progress },
                  });
                  toast.success(`Moved to ${newStage}`);
                } catch (error) {
                  toast.error('Failed to move job');
                }
              }}
              onArchive={handleArchiveJob}
              onQuickAdd={handleMobileQuickAdd}
            />
          </PullToRefresh>
        ) : filteredJobs.length === 0 ? (
          <EmptyState
            title="No jobs yet"
            description="Add your first job to start populating the board."
            action="Add job"
            onAction={() => setQuickAddStage('Quoted')}
          />
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar -mx-1 px-1">
            {stages.map((stage) => {
              const stageJobs = getJobsForStage(stage.id);
              const stageValue = getStageValue(stage.id);
              const isDragTarget = draggedJob !== null;

              return (
                <div
                  key={stage.id}
                  className="w-[300px] flex-shrink-0"
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(stage.id)}
                >
                  <ListCard
                    className={cn(
                      'transition-colors',
                      isDragTarget && 'ring-1 ring-elec-yellow/30'
                    )}
                  >
                    <ListCardHeader
                      tone={stage.tone}
                      title={stage.label}
                      meta={
                        <div className="flex items-center gap-2">
                          <Pill tone={stage.tone}>{stageJobs.length}</Pill>
                          <span className="text-[11px] tabular-nums text-white">
                            £{(stageValue / 1000).toFixed(0)}k
                          </span>
                        </div>
                      }
                    />
                    <ListBody>
                      {stageJobs.map((job) => {
                        const jobLabels = labelsByJob.get(job.id) || [];
                        const checklistData = checklistSummaries[job.id];
                        const valueTone = getValueTone(job.value || 0);

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
                            onCopy={() => {
                              setSelectedJob(job);
                              setCopySheetJob(job);
                            }}
                            onArchive={() => handleArchiveJob(job.id)}
                            onMove={(stageId) => handleMoveJob(job.id, stageId)}
                            onOpenLabels={() => handleJobClick(job.id)}
                            onOpenChecklist={() => handleJobClick(job.id)}
                            onOpenDetails={() => handleJobClick(job.id)}
                            onMarkAsTemplate={() =>
                              handleSetTemplate(job.id, !job.is_template)
                            }
                          >
                            <div
                              draggable
                              onDragStart={() => handleDragStart(job.id)}
                              className={cn(
                                'group relative cursor-grab active:cursor-grabbing transition-all',
                                draggedJob === job.id && 'opacity-50'
                              )}
                            >
                              <ListRow
                                onClick={() => handleJobClick(job.id)}
                                lead={
                                  <Avatar
                                    initials={getInitials(job.client || job.title)}
                                  />
                                }
                                title={job.title}
                                subtitle={
                                  <span className="flex items-center gap-1.5">
                                    <span className="truncate">{job.client}</span>
                                    <span className="text-white">·</span>
                                    <span className="tabular-nums text-white">
                                      £{((job.value || 0) / 1000).toFixed(0)}k
                                    </span>
                                  </span>
                                }
                                trailing={
                                  <Pill tone={valueTone}>
                                    {job.progress > 0 && job.progress < 100
                                      ? `${job.progress}%`
                                      : stage.label}
                                  </Pill>
                                }
                              />
                              {(jobLabels.length > 0 ||
                                (checklistData && checklistData.total > 0)) && (
                                <div className="px-4 sm:px-5 pb-3 -mt-2 space-y-2">
                                  {jobLabels.length > 0 && (
                                    <JobLabelStrips labels={jobLabels} />
                                  )}
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
                        <div className="px-4 sm:px-5 py-3.5 space-y-2 bg-[hsl(0_0%_10%)]">
                          <Input
                            placeholder="Job title…"
                            value={quickAddTitle}
                            onChange={(e) => setQuickAddTitle(e.target.value)}
                            className={inputClass}
                            autoFocus
                          />
                          <Input
                            placeholder="Client name…"
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
                                !quickAddTitle.trim() ||
                                !quickAddClient.trim() ||
                                createJob.isPending
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
                              className="h-11 w-11 rounded-full bg-white/[0.06] border border-white/[0.1] text-white inline-flex items-center justify-center hover:bg-white/[0.1] transition-colors touch-manipulation"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setQuickAddStage(stage.id)}
                          className="w-full h-11 px-4 sm:px-5 flex items-center gap-2 text-[12.5px] font-medium text-white hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add job</span>
                        </button>
                      )}
                    </ListBody>
                  </ListCard>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <ListCard>
          <ListCardHeader
            tone="blue"
            title="All jobs"
            meta={<Pill tone="blue">{filteredJobs.length}</Pill>}
          />
          {filteredJobs.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <div className="text-base font-medium text-white">No jobs match</div>
              <p className="mt-2 text-[12.5px] text-white">
                Try clearing the search or filters.
              </p>
            </div>
          ) : (
            <ListBody>
              {filteredJobs.map((job) => {
                const valueTone = getValueTone(job.value || 0);
                const stageTone = getStageTone(job.stage);
                return (
                  <ListRow
                    key={job.id}
                    onClick={() => handleJobClick(job.id)}
                    lead={<Avatar initials={getInitials(job.client || job.title)} />}
                    title={job.title}
                    subtitle={
                      <span className="flex items-center gap-1.5">
                        <span className="truncate">{job.client}</span>
                        <span className="text-white">·</span>
                        <span className="tabular-nums text-white">
                          £{(job.value || 0).toLocaleString()}
                        </span>
                      </span>
                    }
                    trailing={
                      <>
                        <Pill tone={valueTone}>{job.progress}%</Pill>
                        <Pill tone={stageTone}>{job.stage}</Pill>
                      </>
                    }
                  />
                );
              })}
            </ListBody>
          )}
        </ListCard>
      )}

      {totalJobs > 0 && (
        <div className="text-[11px] text-white text-center tabular-nums">
          {totalJobs} jobs · £{(pipelineValue / 1000).toFixed(0)}k pipeline
        </div>
      )}

      <ViewJobSheet job={selectedJob} open={sheetOpen} onOpenChange={setSheetOpen} />
      <ArchivedJobsSheet open={showArchived} onOpenChange={setShowArchived} />
      <JobTemplatesSheet open={showTemplates} onOpenChange={setShowTemplates} />
    </PageFrame>
  );
}

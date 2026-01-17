import { useState, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuickStats, QuickStat } from "@/components/employer/QuickStats";
import {
  Kanban,
  List,
  Search,
  MapPin,
  Users,
  Calendar,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  PoundSterling,
  Plus,
  Filter,
  X,
  CheckSquare,
  Archive,
  LayoutTemplate,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileKanban } from "@/components/employer/MobileKanban";
import { ViewJobSheet } from "@/components/employer/sheets/ViewJobSheet";
import { ArchivedJobsSheet } from "@/components/employer/sheets/ArchivedJobsSheet";
import { JobTemplatesSheet } from "@/components/employer/JobTemplatesSheet";
import { JobCardContextMenu } from "@/components/employer/JobCardContextMenu";
import { DueDateBadge } from "@/components/employer/DueDateBadge";
import { useJobs, useUpdateJob, useCreateJob, useArchiveJob, useSetJobAsTemplate } from "@/hooks/useJobs";
import { useAllJobLabelAssignments, JobLabel } from "@/hooks/useJobLabels";
import { useAllJobChecklistSummaries } from "@/hooks/useJobChecklists";
import { JobLabelStrips } from "@/components/employer/JobLabelPicker";
import { JobChecklistProgress } from "@/components/employer/JobChecklist";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";

type ViewMode = "kanban" | "list";

const stages = [
  { id: "Quoted", label: "Quoted", color: "bg-muted" },
  { id: "Confirmed", label: "Confirmed", color: "bg-info/20" },
  { id: "Scheduled", label: "Scheduled", color: "bg-warning/20" },
  { id: "In Progress", label: "In Progress", color: "bg-elec-yellow/20" },
  { id: "Testing", label: "Testing", color: "bg-purple-500/20" },
  { id: "Complete", label: "Complete", color: "bg-success/20" },
];

// Map stage back to job status/progress
const stageToStatusMap: Record<string, { status: string; progress: number }> = {
  'Quoted': { status: 'Pending', progress: 0 },
  'Confirmed': { status: 'On Hold', progress: 0 },
  'Scheduled': { status: 'Active', progress: 0 },
  'In Progress': { status: 'Active', progress: 25 },
  'Testing': { status: 'Active', progress: 90 },
  'Complete': { status: 'Completed', progress: 100 },
};

// Map job status/progress to pipeline stage
const getStageFromJob = (job: { status: string; progress: number }): string => {
  if (job.status === "Completed") return "Complete";
  if (job.status === "Pending") return "Quoted";
  if (job.status === "On Hold") return "Confirmed";
  if (job.progress >= 90) return "Testing";
  if (job.progress > 0) return "In Progress";
  return "Scheduled";
};

export function JobBoardSection() {
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedJob, setDraggedJob] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<typeof jobs[number] | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [quickAddStage, setQuickAddStage] = useState<string | null>(null);
  const [quickAddTitle, setQuickAddTitle] = useState("");
  const [quickAddClient, setQuickAddClient] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [copySheetJob, setCopySheetJob] = useState<typeof jobs[number] | null>(null);
  
  const queryClient = useQueryClient();
  const { data: jobsData = [], isLoading, refetch } = useJobs();
  const { data: labelAssignments = [] } = useAllJobLabelAssignments();
  const { data: checklistSummaries = {} } = useAllJobChecklistSummaries();
  const updateJob = useUpdateJob();
  const createJob = useCreateJob();
  const archiveJob = useArchiveJob();
  const setAsTemplate = useSetJobAsTemplate();
  
  // Group labels by job
  const labelsByJob = useMemo(() => {
    const map = new Map<string, JobLabel[]>();
    labelAssignments.forEach(a => {
      if (!map.has(a.job_id)) {
        map.set(a.job_id, []);
      }
      if (a.label) {
        map.get(a.job_id)!.push(a.label);
      }
    });
    return map;
  }, [labelAssignments]);
  
  // Transform jobs with stage
  const jobs = jobsData.map(job => ({
    ...job,
    stage: getStageFromJob(job),
  }));

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCompleted = !hideCompleted || job.stage !== "Complete";
    return matchesSearch && matchesCompleted;
  });

  const getJobsForStage = (stageId: string) => 
    filteredJobs.filter(job => job.stage === stageId);

  const getStageValue = (stageId: string) => 
    getJobsForStage(stageId).reduce((sum, job) => sum + (job.value || 0), 0);

  const handleDragStart = (jobId: string) => {
    setDraggedJob(jobId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (stageId: string) => {
    if (!draggedJob) return;
    
    const job = jobs.find(j => j.id === draggedJob);
    if (!job || job.stage === stageId) {
      setDraggedJob(null);
      return;
    }
    
    const { status, progress } = stageToStatusMap[stageId];
    
    try {
      await updateJob.mutateAsync({
        id: draggedJob,
        updates: { status: status as any, progress }
      });
      toast.success(`Moved to ${stageId}`);
    } catch (error) {
      toast.error("Failed to move job");
    }
    
    setDraggedJob(null);
  };

  const handleJobClick = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
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
        location: "TBC",
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
      toast.success("Job created");
      setQuickAddStage(null);
      setQuickAddTitle("");
      setQuickAddClient("");
    } catch (error) {
      toast.error("Failed to create job");
    }
  };

  // Quick add handler for mobile kanban (title only, client set to TBC)
  const handleMobileQuickAdd = async (title: string, stageId: string) => {
    const { status, progress } = stageToStatusMap[stageId];
    
    try {
      await createJob.mutateAsync({
        title: title.trim(),
        client: "TBC",
        location: "TBC",
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
      toast.success("Job created");
    } catch (error) {
      toast.error("Failed to create job");
    }
  };

  const getStageColor = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    return stage?.color || "bg-muted";
  };

  const handleArchiveJob = async (jobId: string) => {
    try {
      await archiveJob.mutateAsync(jobId);
      toast.success("Job archived");
    } catch (error) {
      toast.error("Failed to archive job");
    }
  };

  const handleMoveJob = async (jobId: string, stageId: string) => {
    const { status, progress } = stageToStatusMap[stageId];
    try {
      await updateJob.mutateAsync({ id: jobId, updates: { status: status as any, progress } });
      toast.success(`Moved to ${stageId}`);
    } catch (error) {
      toast.error("Failed to move job");
    }
  };

  const handleSetTemplate = async (jobId: string, isTemplate: boolean) => {
    try {
      await setAsTemplate.mutateAsync({ id: jobId, isTemplate });
      toast.success(isTemplate ? "Saved as template" : "Removed from templates");
    } catch (error) {
      toast.error("Failed to update template status");
    }
  };

  const handleRefresh = async () => {
    await refetch();
    queryClient.invalidateQueries({ queryKey: ['job-label-assignments'] });
    queryClient.invalidateQueries({ queryKey: ['job-checklist-summaries'] });
  };

  // Calculate stats
  const totalJobs = jobs.length;
  const inProgressCount = jobs.filter(j => j.stage === "In Progress").length;
  const pipelineValue = jobs.reduce((sum, j) => sum + (j.value || 0), 0);

  // Mobile Kanban data - transform to expected format with checklist and label data
  const mobileKanbanItems = filteredJobs.map(job => {
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
      badges: jobLabels.map(label => ({
        label: label.name,
        color: label.colour,
      })),
      assignedWorkers: [], // Could be populated from job assignments if needed
    };
  });

  const mobileStages = stages.map(stage => ({
    id: stage.id,
    label: stage.label,
    color: stage.color,
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Live Job Board</h1>
          <p className="text-sm text-muted-foreground">Drag jobs between stages to update their status</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            {!searchQuery && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            )}
            <Input
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn("w-full bg-elec-gray", !searchQuery && "pl-9")}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => setShowTemplates(true)}
            >
              <LayoutTemplate className="h-4 w-4" />
              <span className="hidden sm:inline">Templates</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => setShowArchived(true)}
            >
              <Archive className="h-4 w-4" />
              <span className="hidden sm:inline">Archived</span>
            </Button>
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                  {hideCompleted && (
                    <Badge variant="secondary" className="ml-1 h-5 px-1.5">1</Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-3" align="end">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">Filters</p>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="hide-completed"
                      checked={hideCompleted}
                      onCheckedChange={(checked) => setHideCompleted(checked as boolean)}
                    />
                    <label htmlFor="hide-completed" className="text-sm text-muted-foreground cursor-pointer">
                      Hide completed jobs
                    </label>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "kanban" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("kanban")}
                className="touch-feedback"
              >
                <Kanban className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="touch-feedback"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Stats Row - Horizontal Scroll */}
      <QuickStats
        stats={[
          {
            icon: Kanban,
            value: totalJobs,
            label: "Total Jobs",
            color: "yellow",
          },
          {
            icon: TrendingUp,
            value: inProgressCount,
            label: "In Progress",
            color: "blue",
          },
          {
            icon: AlertTriangle,
            value: 0,
            label: "Issues",
            color: "orange",
          },
          {
            icon: PoundSterling,
            value: `£${(pipelineValue / 1000).toFixed(0)}k`,
            label: "Pipeline",
            color: "green",
          },
        ]}
      />

      {/* Kanban Board - Mobile uses MobileKanban with Pull to Refresh */}
      {viewMode === "kanban" && (
        isMobile ? (
          <PullToRefresh onRefresh={handleRefresh}>
            <MobileKanban
              items={mobileKanbanItems}
              stages={mobileStages}
              onItemClick={handleJobClick}
              onStageChange={async (itemId, newStage) => {
                const { status, progress } = stageToStatusMap[newStage];
                try {
                  await updateJob.mutateAsync({ id: itemId, updates: { status: status as any, progress } });
                  toast.success(`Moved to ${newStage}`);
                } catch (error) {
                  toast.error("Failed to move job");
                }
              }}
              onArchive={handleArchiveJob}
              onQuickAdd={handleMobileQuickAdd}
            />
          </PullToRefresh>
        ) : (
          <div className="overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex gap-4 min-w-max">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  className={cn(
                    "w-72 flex-shrink-0 transition-all",
                    draggedJob && "opacity-80"
                  )}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(stage.id)}
                >
                  <div className={cn("rounded-lg p-3 mb-3", stage.color)}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">{stage.label}</h3>
                      <Badge variant="secondary" className="bg-background/50">
                        {getJobsForStage(stage.id).length}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      £{(getStageValue(stage.id) / 1000).toFixed(0)}k value
                    </p>
                  </div>

                  <div className="space-y-3">
                    {getJobsForStage(stage.id).map((job) => {
                      const jobLabels = labelsByJob.get(job.id) || [];
                      const checklistData = checklistSummaries[job.id];
                      
                      return (
                        <JobCardContextMenu
                          key={job.id}
                          stages={stages}
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
                          onMarkAsTemplate={() => handleSetTemplate(job.id, !job.is_template)}
                        >
                          <Card
                            draggable
                            onDragStart={() => handleDragStart(job.id)}
                            onClick={() => handleJobClick(job.id)}
                            className={cn(
                              "cursor-pointer bg-elec-gray hover:shadow-md transition-all hover:scale-[1.02]",
                              draggedJob === job.id && "opacity-50 scale-95 rotate-2"
                            )}
                          >
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              {/* Labels at top */}
                              {jobLabels.length > 0 && (
                                <JobLabelStrips labels={jobLabels} />
                              )}
                              
                              <div>
                                <h4 className="font-medium text-foreground">{job.title}</h4>
                                <p className="text-sm text-muted-foreground">{job.client}</p>
                              </div>

                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>{job.location.split(",")[0]}</span>
                              </div>

                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  <span>{job.end_date || "No end date"}</span>
                                </div>
                                <div className="flex items-center gap-1 text-elec-yellow">
                                  <PoundSterling className="h-3 w-3" />
                                  <span>£{((job.value || 0) / 1000).toFixed(0)}k</span>
                                </div>
                              </div>

                              {/* Checklist Progress */}
                              {checklistData && checklistData.total > 0 && (
                                <div className="flex items-center gap-2 text-xs">
                                  <CheckSquare className="h-3 w-3 text-muted-foreground" />
                                  <JobChecklistProgress 
                                    completed={checklistData.completed} 
                                    total={checklistData.total} 
                                  />
                                </div>
                              )}

                              {job.stage === "In Progress" && job.workers_count > 0 && (
                                <div className="flex items-center justify-between pt-2 border-t border-border">
                                  <div className="flex items-center gap-1 text-xs">
                                    <Users className="h-3 w-3 text-success" />
                                    <span className="text-success">
                                      {job.workers_count} workers
                                    </span>
                                  </div>
                                </div>
                              )}

                              {job.progress > 0 && job.stage !== "Complete" && (
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Progress</span>
                                    <span className="text-elec-yellow">{job.progress}%</span>
                                  </div>
                                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-elec-yellow rounded-full"
                                      style={{ width: `${job.progress}%` }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                        </JobCardContextMenu>
                      );
                    })}

                    {/* Quick Add Card */}
                    {quickAddStage === stage.id ? (
                      <Card className="border-dashed border-2 border-elec-yellow/50 bg-elec-yellow/5">
                        <CardContent className="p-3 space-y-2">
                          <Input
                            placeholder="Job title..."
                            value={quickAddTitle}
                            onChange={(e) => setQuickAddTitle(e.target.value)}
                            className="h-8 text-sm"
                            autoFocus
                          />
                          <Input
                            placeholder="Client name..."
                            value={quickAddClient}
                            onChange={(e) => setQuickAddClient(e.target.value)}
                            className="h-8 text-sm"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleQuickAdd(stage.id);
                              if (e.key === 'Escape') setQuickAddStage(null);
                            }}
                          />
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="flex-1 h-7"
                              onClick={() => handleQuickAdd(stage.id)}
                              disabled={!quickAddTitle.trim() || !quickAddClient.trim() || createJob.isPending}
                            >
                              Add Job
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-7 px-2"
                              onClick={() => {
                                setQuickAddStage(null);
                                setQuickAddTitle("");
                                setQuickAddClient("");
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <button
                        onClick={() => setQuickAddStage(stage.id)}
                        className="w-full border-2 border-dashed border-border rounded-lg p-3 text-center hover:border-elec-yellow/50 hover:bg-elec-yellow/5 transition-colors group"
                      >
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground group-hover:text-elec-yellow">
                          <Plus className="h-4 w-4" />
                          Add Job
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-3">
          {filteredJobs.map((job) => {
            const jobLabels = labelsByJob.get(job.id) || [];
            
            return (
              <Card 
                key={job.id} 
                className="bg-elec-gray touch-feedback cursor-pointer"
                onClick={() => handleJobClick(job.id)}
              >
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-start md:items-center gap-3 md:gap-4">
                      <Badge className={cn("text-foreground text-[10px] md:text-xs flex-shrink-0", getStageColor(job.stage))}>
                        {job.stage}
                      </Badge>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="font-medium text-foreground text-sm md:text-base truncate">{job.title}</h4>
                          {jobLabels.length > 0 && (
                            <div className="flex gap-1">
                              {jobLabels.slice(0, 2).map(label => (
                                <div 
                                  key={label.id}
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: label.colour }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground">{job.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6">
                      <div className="text-left md:text-right">
                        <p className="text-sm font-medium text-foreground">
                          £{(job.value || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">{job.progress}% complete</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Job Detail Sheet */}
      <ViewJobSheet
        job={selectedJob}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />

      {/* Archived Jobs Sheet */}
      <ArchivedJobsSheet
        open={showArchived}
        onOpenChange={setShowArchived}
      />

      {/* Templates Sheet */}
      <JobTemplatesSheet
        open={showTemplates}
        onOpenChange={setShowTemplates}
      />
    </div>
  );
}

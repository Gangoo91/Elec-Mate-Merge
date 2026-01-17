import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { useJobPacks, useUpdateJobPackDocument, useUpdateJobPack } from "@/hooks/useJobPacks";
import { useEmployees } from "@/hooks/useEmployees";
import { useJobs } from "@/hooks/useJobs";
import { AddJobPackDialog } from "@/components/employer/dialogs/AddJobPackDialog";
import { ViewJobPackSheet } from "@/components/employer/sheets/ViewJobPackSheet";
import { JobPack } from "@/services/jobPackService";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Package, 
  Search, 
  FileText, 
  ClipboardList, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Zap,
  RefreshCw,
  Send,
  MapPin,
  PoundSterling,
  ChevronRight,
  Briefcase,
  Plus,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

type StatusTab = 'all' | 'Draft' | 'In Progress' | 'Complete';

const statusConfig = {
  "Draft": { color: "bg-muted text-muted-foreground border-muted", icon: Clock, accent: "muted" },
  "In Progress": { color: "bg-info/20 text-info border-info/30", icon: Zap, accent: "info" },
  "Complete": { color: "bg-success/20 text-success border-success/30", icon: CheckCircle2, accent: "success" },
};

export const JobPacksSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewJobPack, setShowNewJobPack] = useState(false);
  const [selectedJobPack, setSelectedJobPack] = useState<JobPack | null>(null);
  const [showJobPackSheet, setShowJobPackSheet] = useState(false);
  const [activeTab, setActiveTab] = useState<StatusTab>('all');
  
  const { data: jobPacks = [], isLoading, refetch, isRefetching } = useJobPacks();
  const { data: employees = [] } = useEmployees();
  const { data: jobs = [] } = useJobs();
  const updateDocument = useUpdateJobPackDocument();
  const updateJobPack = useUpdateJobPack();
  const isMobile = useIsMobile();

  // Find jobs without job packs (awaiting pack creation)
  const jobPackJobIds = useMemo(() => 
    new Set(jobPacks.map(jp => jp.title.toLowerCase())),
    [jobPacks]
  );
  
  const jobsAwaitingPack = useMemo(() => 
    jobs.filter(j => 
      (j.status === "Active" || j.status === "Pending") && 
      !jobPackJobIds.has(j.title.toLowerCase())
    ).slice(0, 5),
    [jobs, jobPackJobIds]
  );

  const filteredJobPacks = useMemo(() => {
    let filtered = jobPacks;
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(jp => jp.status === activeTab);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(jp =>
        jp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        jp.client.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [jobPacks, activeTab, searchQuery]);

  const stats = {
    total: jobPacks.length,
    draft: jobPacks.filter(jp => jp.status === "Draft").length,
    inProgress: jobPacks.filter(jp => jp.status === "In Progress").length,
    complete: jobPacks.filter(jp => jp.status === "Complete").length,
    awaiting: jobsAwaitingPack.length,
  };

  const handleGenerateDocument = async (
    e: React.MouseEvent,
    jobPackId: string, 
    documentType: 'rams_generated' | 'method_statement_generated' | 'briefing_pack_generated',
    documentName: string
  ) => {
    e.stopPropagation();
    try {
      await updateDocument.mutateAsync({ id: jobPackId, documentType, status: true });
      toast({
        title: `${documentName} Generated`,
        description: `${documentName} has been auto-generated.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to generate ${documentName}.`,
        variant: "destructive",
      });
    }
  };

  const handleSendToWorkers = async (e: React.MouseEvent, jobPack: JobPack) => {
    e.stopPropagation();
    try {
      await updateJobPack.mutateAsync({
        id: jobPack.id,
        updates: {
          status: "In Progress",
          sent_to_workers_at: new Date().toISOString(),
        }
      });
      toast({
        title: "Job Pack Sent",
        description: `${jobPack.title} has been sent to assigned workers.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send job pack.",
        variant: "destructive",
      });
    }
  };

  const handleJobPackClick = (jobPack: JobPack) => {
    setSelectedJobPack(jobPack);
    setShowJobPackSheet(true);
  };

  const getDocumentProgress = (jobPack: JobPack) => {
    const docs = [jobPack.rams_generated, jobPack.method_statement_generated, jobPack.briefing_pack_generated];
    return docs.filter(Boolean).length;
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-20" />)}
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in pb-24">
      {/* Header - Stacked on mobile */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <Package className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow shrink-0" />
              <span className="truncate">Job Packs</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">
              Manage jobs, documents & workers
            </p>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-9 w-9"
              onClick={() => refetch()}
              disabled={isRefetching}
            >
              <RefreshCw className={cn("h-4 w-4", isRefetching && "animate-spin")} />
            </Button>
            {/* Desktop-only inline button */}
            <div className="hidden sm:block">
              <AddJobPackDialog 
                open={showNewJobPack} 
                onOpenChange={setShowNewJobPack}
              />
            </div>
          </div>
        </div>
        
        {/* Mobile full-width create button */}
        <div className="sm:hidden">
          <AddJobPackDialog 
            open={showNewJobPack} 
            onOpenChange={setShowNewJobPack}
            trigger={
              <Button className="w-full h-11 gap-2 text-sm font-medium">
                <Plus className="h-4 w-4" />
                Create New Job Pack
              </Button>
            }
          />
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        {!searchQuery && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        )}
        <Input
          placeholder="Search job packs..."
          className={cn("h-12 text-base", !searchQuery && "pl-10")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Status Tabs - Horizontal scrollable */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
        <Button
          variant={activeTab === 'all' ? "default" : "outline"}
          size="sm"
          className={cn("shrink-0 h-9", activeTab === 'all' && "bg-elec-yellow")}
          onClick={() => setActiveTab('all')}
        >
          All
          <Badge variant="secondary" className="ml-1.5 bg-background/20 text-xs">
            {stats.total}
          </Badge>
        </Button>
        <Button
          variant={activeTab === 'Draft' ? "default" : "outline"}
          size="sm"
          className={cn("shrink-0 h-9 gap-1.5", activeTab === 'Draft' && "bg-muted text-foreground")}
          onClick={() => setActiveTab('Draft')}
        >
          <Clock className="h-3.5 w-3.5" />
          Draft
          <Badge variant="secondary" className="ml-1 bg-background/20 text-xs">
            {stats.draft}
          </Badge>
        </Button>
        <Button
          variant={activeTab === 'In Progress' ? "default" : "outline"}
          size="sm"
          className={cn("shrink-0 h-9 gap-1.5", activeTab === 'In Progress' && "bg-info text-info-foreground")}
          onClick={() => setActiveTab('In Progress')}
        >
          <Zap className="h-3.5 w-3.5" />
          In Progress
          <Badge variant="secondary" className="ml-1 bg-background/20 text-xs">
            {stats.inProgress}
          </Badge>
        </Button>
        <Button
          variant={activeTab === 'Complete' ? "default" : "outline"}
          size="sm"
          className={cn("shrink-0 h-9 gap-1.5", activeTab === 'Complete' && "bg-success text-success-foreground")}
          onClick={() => setActiveTab('Complete')}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Complete
          <Badge variant="secondary" className="ml-1 bg-background/20 text-xs">
            {stats.complete}
          </Badge>
        </Button>
      </div>

      {/* Jobs Awaiting Pack - Only show on "All" tab */}
      {activeTab === 'all' && jobsAwaitingPack.length > 0 && (
        <div className="p-4 rounded-xl bg-elec-yellow/5 border border-elec-yellow/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-elec-yellow/20">
                <Briefcase className="h-4 w-4 text-elec-yellow" />
              </div>
              <span className="font-semibold text-foreground text-sm">Jobs Awaiting Pack</span>
              <Badge variant="secondary" className="text-xs">{jobsAwaitingPack.length}</Badge>
            </div>
          </div>
          <div className="space-y-2">
            {jobsAwaitingPack.map(job => (
              <div 
                key={job.id}
                className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground text-sm truncate">{job.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{job.client}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="shrink-0 h-8 gap-1 text-elec-yellow hover:text-elec-yellow"
                  onClick={() => setShowNewJobPack(true)}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Create Pack
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Job Pack Cards */}
      <div className="space-y-3">
        {filteredJobPacks.length === 0 && (
          <Card className="border-dashed border-2">
            <CardContent className="py-12 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-elec-yellow/10 flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-elec-yellow" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {activeTab === 'all' ? 'No job packs yet' : `No ${activeTab.toLowerCase()} packs`}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 max-w-sm mx-auto">
                Job packs bundle jobs with auto-generated RAMS, method statements, and briefing packs.
              </p>
              <Button onClick={() => setShowNewJobPack(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Job Pack
              </Button>
            </CardContent>
          </Card>
        )}
        
        {filteredJobPacks.map((jobPack) => {
          const StatusIcon = statusConfig[jobPack.status as keyof typeof statusConfig]?.icon || Clock;
          const statusStyle = statusConfig[jobPack.status as keyof typeof statusConfig];
          const assignedEmployees = employees.filter(e => 
            jobPack.assigned_workers?.includes(e.id)
          );
          const docProgress = getDocumentProgress(jobPack);
          const allDocsReady = docProgress === 3;
          const canSend = allDocsReady && jobPack.status === 'Draft' && assignedEmployees.length > 0;
          
          return (
            <Card 
              key={jobPack.id} 
              className={cn(
                "overflow-hidden transition-all touch-feedback",
                "border-l-4",
                statusStyle?.accent === 'muted' && "border-l-muted-foreground/50",
                statusStyle?.accent === 'info' && "border-l-info",
                statusStyle?.accent === 'success' && "border-l-success"
              )}
              onClick={() => handleJobPackClick(jobPack)}
            >
              <CardContent className="p-4">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground text-base truncate">{jobPack.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                      <span className="truncate">{jobPack.client}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 shrink-0">
                        <MapPin className="h-3 w-3" />
                        {jobPack.location}
                      </span>
                    </div>
                  </div>
                  <Badge className={cn("shrink-0", statusStyle?.color)}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {jobPack.status}
                  </Badge>
                </div>

                {/* Hazards Row */}
                {jobPack.hazards && jobPack.hazards.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {jobPack.hazards.slice(0, 3).map((hazard) => (
                      <Badge 
                        key={hazard} 
                        variant="outline" 
                        className="text-[10px] py-0.5 px-2 bg-warning/10 text-warning border-warning/30"
                      >
                        <AlertTriangle className="h-2.5 w-2.5 mr-1" />
                        {hazard}
                      </Badge>
                    ))}
                    {jobPack.hazards.length > 3 && (
                      <Badge variant="outline" className="text-[10px] py-0.5 px-2">
                        +{jobPack.hazards.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Documents Progress */}
                <div className="flex items-center gap-3 mb-3 p-2.5 rounded-lg bg-muted/30">
                  <div className="flex gap-2">
                    <div className={cn(
                      "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md",
                      jobPack.rams_generated 
                        ? "bg-success/20 text-success" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      <FileText className="h-3 w-3" />
                      RAMS
                    </div>
                    <div className={cn(
                      "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md",
                      jobPack.method_statement_generated 
                        ? "bg-success/20 text-success" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      <ClipboardList className="h-3 w-3" />
                      Method
                    </div>
                    <div className={cn(
                      "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md",
                      jobPack.briefing_pack_generated 
                        ? "bg-success/20 text-success" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      <BookOpen className="h-3 w-3" />
                      Brief
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-auto">{docProgress}/3</span>
                </div>

                {/* Footer: Workers + Actions */}
                <div className="flex items-center justify-between gap-3">
                  {/* Assigned Workers */}
                  <div className="flex items-center gap-2 min-w-0">
                    {assignedEmployees.length > 0 ? (
                      <>
                        <div className="flex -space-x-2">
                          {assignedEmployees.slice(0, 3).map((emp, i) => (
                            <div 
                              key={emp.id}
                              className="w-7 h-7 rounded-full bg-elec-yellow/20 border-2 border-card flex items-center justify-center"
                              style={{ zIndex: 3 - i }}
                            >
                              <span className="text-[10px] font-bold text-elec-yellow">
                                {emp.avatar_initials || emp.name.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                          ))}
                          {assignedEmployees.length > 3 && (
                            <div className="w-7 h-7 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                              <span className="text-[10px] font-medium text-muted-foreground">
                                +{assignedEmployees.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {assignedEmployees.length} worker{assignedEmployees.length !== 1 ? 's' : ''}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        No workers assigned
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                    {!allDocsReady && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs gap-1"
                        onClick={(e) => {
                          if (!jobPack.rams_generated) {
                            handleGenerateDocument(e, jobPack.id, 'rams_generated', 'RAMS');
                          } else if (!jobPack.method_statement_generated) {
                            handleGenerateDocument(e, jobPack.id, 'method_statement_generated', 'Method Statement');
                          } else {
                            handleGenerateDocument(e, jobPack.id, 'briefing_pack_generated', 'Briefing Pack');
                          }
                        }}
                      >
                        <Zap className="h-3 w-3" />
                        Generate
                      </Button>
                    )}
                    {canSend && (
                      <Button
                        size="sm"
                        className="h-8 text-xs gap-1"
                        onClick={(e) => handleSendToWorkers(e, jobPack)}
                      >
                        <Send className="h-3 w-3" />
                        Send
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Value if present */}
                {jobPack.estimated_value && (
                  <div className="flex items-center justify-end gap-1 mt-2 text-xs text-muted-foreground">
                    <PoundSterling className="h-3 w-3" />
                    {jobPack.estimated_value.toLocaleString()}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* View/Edit Job Pack Sheet */}
      <ViewJobPackSheet
        jobPack={selectedJobPack}
        open={showJobPackSheet}
        onOpenChange={setShowJobPackSheet}
      />

      {/* Mobile FAB for quick access */}
      {isMobile && (
        <FloatingActionButton
          icon={<Plus className="h-6 w-6" />}
          onClick={() => setShowNewJobPack(true)}
          label="Create new job pack"
        />
      )}
    </div>
  );
};

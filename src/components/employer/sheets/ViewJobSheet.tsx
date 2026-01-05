import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { StatusBadge } from "@/components/employer/StatusBadge";
import { AssignWorkersSheet } from "@/components/employer/sheets/AssignWorkersSheet";
import { CopyJobSheet } from "@/components/employer/sheets/CopyJobSheet";
import { JobLabelPicker } from "@/components/employer/JobLabelPicker";
import { JobChecklist } from "@/components/employer/JobChecklist";
import { JobActivityFeed } from "@/components/employer/JobActivityFeed";
import { DueDateBadge } from "@/components/employer/DueDateBadge";
import { toast } from "@/hooks/use-toast";
import { useUpdateJob, useDeleteJob, useArchiveJob, useSetJobAsTemplate } from "@/hooks/useJobs";
import { useJobAssignments, useRemoveWorkerFromJob } from "@/hooks/useJobAssignments";
import { useLogJobActivity } from "@/hooks/useJobComments";
import { Job, JobStatus } from "@/services/jobService";
import { 
  MapPin, Calendar, PoundSterling, Users, Trash2, Save, 
  Edit3, X, Phone, MessageSquare, Navigation, FileText,
  Clock, Camera, FolderOpen, UserPlus, Loader2, 
  Copy, Archive, LayoutTemplate, MoreVertical, ChevronDown,
  ListChecks, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ViewJobSheetProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getStatusColour = (status: string) => {
  switch (status) {
    case "Active": return "bg-success/10 border-success/30";
    case "Pending": return "bg-warning/10 border-warning/30";
    case "Completed": return "bg-muted border-muted-foreground/30";
    case "On Hold": return "bg-info/10 border-info/30";
    case "Cancelled": return "bg-destructive/10 border-destructive/30";
    default: return "bg-muted border-border";
  }
};

export function ViewJobSheet({ job, open, onOpenChange }: ViewJobSheetProps) {
  const updateJob = useUpdateJob();
  const deleteJob = useDeleteJob();
  const archiveJob = useArchiveJob();
  const setAsTemplate = useSetJobAsTemplate();
  const removeWorker = useRemoveWorkerFromJob();
  const logActivity = useLogJobActivity();
  
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<JobStatus>("Active");
  const [progress, setProgress] = useState(0);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showAssignSheet, setShowAssignSheet] = useState(false);
  const [showCopySheet, setShowCopySheet] = useState(false);
  
  // Collapsible sections state
  const [checklistOpen, setChecklistOpen] = useState(true);
  const [activityOpen, setActivityOpen] = useState(false);
  const [workersOpen, setWorkersOpen] = useState(true);

  // Fetch assigned workers
  const { data: assignments = [], isLoading: loadingAssignments } = useJobAssignments(job?.id || "");
  
  // Reset form when job changes
  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setClient(job.client);
      setLocation(job.location);
      setStatus(job.status);
      setProgress(job.progress);
      setValue(job.value?.toString() || "");
      setDescription(job.description || "");
      setIsEditing(false);
      setChecklistOpen(true);
      setActivityOpen(false);
      setWorkersOpen(true);
    }
  }, [job]);
  
  const handleSave = async () => {
    if (!job) return;
    
    const oldStatus = job.status;
    const oldProgress = job.progress;
    
    try {
      await updateJob.mutateAsync({
        id: job.id,
        updates: {
          title,
          client,
          location,
          status,
          progress,
          value: value ? parseFloat(value) : 0,
          description,
        }
      });
      
      if (oldStatus !== status) {
        logActivity.mutate({
          jobId: job.id,
          content: `Status changed from ${oldStatus} to ${status}`,
          commentType: 'status_change',
        });
      }
      
      if (oldProgress !== progress) {
        logActivity.mutate({
          jobId: job.id,
          content: `Progress updated to ${progress}%`,
          commentType: 'progress',
        });
      }
      
      toast({
        title: "Job Updated",
        description: `${title} has been updated.`,
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update job.",
        variant: "destructive",
      });
    }
  };
  
  const handleDelete = async () => {
    if (!job) return;
    
    try {
      await deleteJob.mutateAsync(job.id);
      toast({
        title: "Job Deleted",
        description: `${job.title} has been deleted.`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete job.",
        variant: "destructive",
      });
    }
  };
  
  const handleProgressChange = async (newProgress: number[]) => {
    if (!job) return;
    const oldProgress = progress;
    setProgress(newProgress[0]);
    
    try {
      await updateJob.mutateAsync({
        id: job.id,
        updates: { progress: newProgress[0] }
      });
      
      if (oldProgress !== newProgress[0]) {
        logActivity.mutate({
          jobId: job.id,
          content: `Progress updated to ${newProgress[0]}%`,
          commentType: 'progress',
        });
      }
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const handleRemoveWorker = async (employeeId: string, employeeName: string) => {
    if (!job) return;
    
    try {
      await removeWorker.mutateAsync({ jobId: job.id, employeeId });
      toast({
        title: "Worker Removed",
        description: `${employeeName} has been removed from this job.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove worker.",
        variant: "destructive",
      });
    }
  };

  const handleNavigate = () => {
    if (!job) return;
    const query = encodeURIComponent(job.location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };
  
  const handleArchive = async () => {
    if (!job) return;
    
    try {
      await archiveJob.mutateAsync(job.id);
      toast({
        title: "Job Archived",
        description: `${job.title} has been archived.`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to archive job.",
        variant: "destructive",
      });
    }
  };

  const handleToggleTemplate = async () => {
    if (!job) return;
    
    const newTemplateStatus = !job.is_template;
    try {
      await setAsTemplate.mutateAsync({ id: job.id, isTemplate: newTemplateStatus });
      toast({
        title: newTemplateStatus ? "Saved as Template" : "Removed from Templates",
        description: newTemplateStatus 
          ? `${job.title} is now a template.` 
          : `${job.title} is no longer a template.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update template status.",
        variant: "destructive",
      });
    }
  };

  if (!job) return null;
  
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  const calculateDuration = () => {
    if (!job.start_date || !job.end_date) return null;
    const start = new Date(job.start_date);
    const end = new Date(job.end_date);
    const months = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
    return months === 1 ? "1 month" : `${months} months`;
  };
  
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto p-0">
          {/* Hero Header */}
          <div className={cn("p-6 border-b", getStatusColour(job.status))}>
            <SheetHeader className="text-left space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <SheetTitle className="text-xl font-bold text-foreground leading-tight">
                      {job.title}
                    </SheetTitle>
                    {job.is_template && (
                      <Badge variant="outline" className="text-xs gap-1 bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                        <LayoutTemplate className="h-3 w-3" />
                        Template
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-1">{job.client}</p>
                </div>
                <div className="flex items-center gap-2">
                  <DueDateBadge endDate={job.end_date} isCompleted={job.status === 'Completed'} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setShowCopySheet(true)} className="gap-2">
                        <Copy className="h-4 w-4" />
                        Copy Job
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleToggleTemplate} className="gap-2">
                        <LayoutTemplate className="h-4 w-4" />
                        {job.is_template ? "Remove from Templates" : "Save as Template"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleArchive} className="gap-2 text-warning focus:text-warning">
                        <Archive className="h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Labels */}
              <JobLabelPicker jobId={job.id} />
              
              {/* Quick Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 h-10 gap-2">
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="flex-1 h-10 gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Message
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 h-10 gap-2"
                  onClick={handleNavigate}
                >
                  <Navigation className="h-4 w-4" />
                  Navigate
                </Button>
              </div>
            </SheetHeader>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Progress Section */}
            <Card className="border-elec-yellow/20 bg-elec-yellow/5">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">Job Progress</span>
                  <span className="text-2xl font-bold text-elec-yellow">{progress}%</span>
                </div>
                <Slider
                  value={[progress]}
                  onValueChange={handleProgressChange}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Start</span>
                  <span>Complete</span>
                </div>
              </CardContent>
            </Card>

            {/* Key Info Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-elec-gray/50">
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-elec-yellow/10">
                    <MapPin className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium text-foreground truncate">{job.location}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-elec-gray/50">
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <PoundSterling className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Value</p>
                    <p className="text-sm font-bold text-success">£{(job.value || 0).toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-elec-gray/50">
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-info/10">
                    <Calendar className="h-4 w-4 text-info" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-sm font-medium text-foreground">{calculateDuration() || "-"}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-elec-gray/50">
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <Users className="h-4 w-4 text-warning" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Workers</p>
                    <p className="text-sm font-medium text-foreground">{assignments.length} assigned</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dates */}
            <Card className="bg-elec-gray/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Schedule</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="text-sm font-medium text-foreground">{formatDate(job.start_date)}</p>
                  </div>
                  <div className="h-px w-8 bg-border" />
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">End Date</p>
                    <p className="text-sm font-medium text-foreground">{formatDate(job.end_date)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {job.description && (
              <Card className="bg-elec-gray/50">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Description</p>
                  <p className="text-sm text-foreground leading-relaxed">{job.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Assigned Workers Section - Collapsible */}
            <Collapsible open={workersOpen} onOpenChange={setWorkersOpen}>
              <Card className="bg-elec-gray/50">
                <CollapsibleTrigger asChild>
                  <CardContent className="p-4 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Assigned Workers</span>
                        <Badge variant="secondary" className="text-xs">{assignments.length}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 text-elec-yellow"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowAssignSheet(true);
                          }}
                        >
                          <UserPlus className="h-3.5 w-3.5" />
                          Assign
                        </Button>
                        <ChevronDown className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform",
                          workersOpen && "rotate-180"
                        )} />
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="p-4 pt-0 space-y-2">
                    {loadingAssignments ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                      </div>
                    ) : assignments.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-sm text-muted-foreground">No workers assigned yet</p>
                      </div>
                    ) : (
                      assignments.map((assignment) => (
                        <div key={assignment.id} className="flex items-center gap-3 p-2 rounded-lg bg-background">
                          <Avatar className="h-8 w-8 bg-elec-yellow/10">
                            <AvatarFallback className="text-elec-yellow text-xs font-medium">
                              {assignment.employee?.avatar_initials || "??"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground truncate">
                              {assignment.employee?.name || "Unknown"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {assignment.role_on_job || assignment.employee?.role || "Worker"}
                            </p>
                          </div>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive">
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remove Worker?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove {assignment.employee?.name} from this job?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleRemoveWorker(assignment.employee_id, assignment.employee?.name || "")}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Remove
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      ))
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Checklist Section - Collapsible */}
            <Collapsible open={checklistOpen} onOpenChange={setChecklistOpen}>
              <Card className="bg-elec-gray/50">
                <CollapsibleTrigger asChild>
                  <CardContent className="p-4 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ListChecks className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Checklist</span>
                      </div>
                      <ChevronDown className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        checklistOpen && "rotate-180"
                      )} />
                    </div>
                  </CardContent>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="p-4 pt-0">
                    <JobChecklist jobId={job.id} />
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Activity Section - Collapsible */}
            <Collapsible open={activityOpen} onOpenChange={setActivityOpen}>
              <Card className="bg-elec-gray/50">
                <CollapsibleTrigger asChild>
                  <CardContent className="p-4 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Activity</span>
                      </div>
                      <ChevronDown className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        activityOpen && "rotate-180"
                      )} />
                    </div>
                  </CardContent>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="p-4 pt-0">
                    <JobActivityFeed jobId={job.id} />
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
            
            {/* Quick Links */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wide px-1">Quick Links</p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-12 justify-start gap-2">
                  <FileText className="h-4 w-4 text-elec-yellow" />
                  Job Pack
                </Button>
                <Button variant="outline" className="h-12 justify-start gap-2">
                  <Clock className="h-4 w-4 text-elec-yellow" />
                  Timesheets
                </Button>
                <Button variant="outline" className="h-12 justify-start gap-2">
                  <Camera className="h-4 w-4 text-elec-yellow" />
                  Photos
                </Button>
                <Button variant="outline" className="h-12 justify-start gap-2">
                  <FolderOpen className="h-4 w-4 text-elec-yellow" />
                  Documents
                </Button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-border">
              <Button onClick={() => setIsEditing(true)} className="flex-1 h-12 gap-2">
                <Edit3 className="h-4 w-4" />
                Edit Job
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon" className="h-12 w-12">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Job?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{job.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Edit Mode Dialog */}
            {isEditing && (
              <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
                <div className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-foreground">Edit Job</h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4 p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Job Title
                      </Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="h-12 bg-background border-border/60 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="client" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Client
                      </Label>
                      <Input
                        id="client"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        className="h-12 bg-background border-border/60 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="h-12 bg-background border-border/60 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-[100px] bg-background border-border/60 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Status
                      </Label>
                      <Select value={status} onValueChange={(v) => setStatus(v as JobStatus)}>
                        <SelectTrigger className="h-12 bg-background border-border/60 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="On Hold">On Hold</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="value" className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                        <PoundSterling className="h-3.5 w-3.5" />
                        Value (£)
                      </Label>
                      <Input
                        id="value"
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="h-12 bg-background border-border/60 focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} disabled={updateJob.isPending} className="flex-1 h-12 font-semibold gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="h-12 px-6">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Assign Workers Sheet */}
      {job && (
        <AssignWorkersSheet
          job={job}
          open={showAssignSheet}
          onOpenChange={setShowAssignSheet}
          existingAssignments={assignments}
        />
      )}

      {/* Copy Job Sheet */}
      <CopyJobSheet
        job={job}
        open={showCopySheet}
        onOpenChange={setShowCopySheet}
      />
    </>
  );
}

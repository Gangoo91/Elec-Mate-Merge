import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Search,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Clock,
  Calendar,
  Wrench,
  Package,
  Shield,
  MapPin,
  Plus,
  Loader2,
  Eye,
  Trash2,
  X,
  FileQuestion,
  Bug,
  Timer
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { format } from "date-fns";
import {
  useJobIssues,
  useJobIssueStats,
  useCreateJobIssue,
  useUpdateJobIssueStatus,
  useDeleteJobIssue,
  type JobIssue,
  type CreateJobIssueInput,
  type IssueType,
  type IssueSeverity,
  type IssueStatus
} from "@/hooks/useJobIssues";
import { useJobs } from "@/hooks/useJobs";
import { useEmployees } from "@/hooks/useEmployees";

import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { SwipeableRow } from "@/components/ui/swipeable-row";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const issueTypeIcons: Record<IssueType, React.ElementType> = {
  "Snag": Bug,
  "Variation": FileQuestion,
  "RFI": FileQuestion,
  "Defect": AlertTriangle,
  "Delay": Timer,
  "Other": AlertCircle,
};

const severityColors: Record<IssueSeverity, string> = {
  "Critical": "bg-destructive text-destructive-foreground",
  "High": "bg-destructive/80 text-destructive-foreground",
  "Medium": "bg-warning text-warning-foreground",
  "Low": "bg-muted text-muted-foreground",
};

const statusColors: Record<IssueStatus, string> = {
  "Open": "bg-destructive/20 text-destructive",
  "In Progress": "bg-warning/20 text-warning",
  "Resolved": "bg-success/20 text-success",
  "Closed": "bg-muted text-muted-foreground",
  "Rejected": "bg-muted text-muted-foreground",
};

function JobIssuesSkeleton() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    </div>
  );
}

export function JobIssuesSection() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<IssueStatus | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<JobIssue | null>(null);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [showResolveSheet, setShowResolveSheet] = useState(false);
  const [resolveIssueId, setResolveIssueId] = useState<string | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<CreateJobIssueInput>>({
    job_id: "",
    title: "",
    description: "",
    issue_type: "Snag",
    severity: "Medium",
    status: "Open",
    location: "",
    photos: [],
  });

  // Data fetching
  const { data: issues = [], isLoading, error, refetch } = useJobIssues();
  const { data: stats } = useJobIssueStats();
  const { data: jobs = [] } = useJobs();
  const { data: employees = [] } = useEmployees();
  const createJobIssue = useCreateJobIssue();
  const updateJobIssueStatus = useUpdateJobIssueStatus();
  const deleteJobIssue = useDeleteJobIssue();

  const handleRefresh = useCallback(async () => {
    await refetch();
    toast({ title: "Issues refreshed" });
  }, [refetch]);

  const handleResolve = (issueId: string) => {
    setResolveIssueId(issueId);
    setResolutionNotes("");
    setShowResolveSheet(true);
  };

  const handleConfirmResolve = async () => {
    if (resolveIssueId) {
      await updateJobIssueStatus.mutateAsync({
        id: resolveIssueId,
        status: "Resolved",
        resolution_notes: resolutionNotes,
      });
      setShowResolveSheet(false);
      setResolveIssueId(null);
      setResolutionNotes("");
    }
  };

  const handleStatusChange = async (issueId: string, status: IssueStatus) => {
    await updateJobIssueStatus.mutateAsync({ id: issueId, status });
  };

  const handleCreate = async () => {
    if (!formData.job_id || !formData.title) {
      toast({ title: "Error", description: "Please fill in required fields", variant: "destructive" });
      return;
    }

    try {
      await createJobIssue.mutateAsync(formData as CreateJobIssueInput);
      setShowCreateSheet(false);
      resetForm();
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteJobIssue.mutateAsync(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      job_id: "",
      title: "",
      description: "",
      issue_type: "Snag",
      severity: "Medium",
      status: "Open",
      location: "",
      photos: [],
    });
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.job?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? issue.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return <JobIssuesSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load issues</h3>
        <p className="text-sm text-foreground/70 mb-4">{error.message}</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  const content = (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Live Issues</h1>
            <p className="text-sm text-muted-foreground">Track and resolve job blockers in real-time</p>
          </div>
          <Button onClick={() => setShowCreateSheet(true)} className="touch-feedback">
            <Plus className="h-4 w-4 mr-2" />
            Report Issue
          </Button>
        </div>

        <div className="relative">
          {!searchQuery && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          )}
          <Input
            placeholder="Search issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn("w-full bg-elec-gray h-12", !searchQuery && "pl-9")}
          />
        </div>
      </div>

      {/* Summary Stats - Clickable filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card
          className={cn(
            "bg-elec-gray cursor-pointer transition-all touch-feedback",
            statusFilter === "Open" && "ring-2 ring-destructive"
          )}
          onClick={() => setStatusFilter(statusFilter === "Open" ? null : "Open")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-destructive">{stats?.open || 0}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Open</p>
              </div>
              <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-destructive opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card
          className={cn(
            "bg-elec-gray cursor-pointer transition-all touch-feedback",
            statusFilter === "In Progress" && "ring-2 ring-warning"
          )}
          onClick={() => setStatusFilter(statusFilter === "In Progress" ? null : "In Progress")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-warning">{stats?.inProgress || 0}</p>
                <p className="text-xs md:text-sm text-muted-foreground">In Progress</p>
              </div>
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-warning opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card
          className={cn(
            "bg-elec-gray cursor-pointer transition-all touch-feedback",
            statusFilter === "Resolved" && "ring-2 ring-success"
          )}
          onClick={() => setStatusFilter(statusFilter === "Resolved" ? null : "Resolved")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-success">{stats?.resolved || 0}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Resolved</p>
              </div>
              <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-success opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-destructive/10 border-destructive/30 touch-feedback">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl md:text-2xl font-bold text-destructive">
                  {(stats?.critical || 0) + (stats?.high || 0)}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">High Priority</p>
              </div>
              <AlertTriangle className="h-6 w-6 md:h-8 md:w-8 text-destructive opacity-70" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      {filteredIssues.length === 0 && (
        <Card className="bg-elec-gray">
          <CardContent className="p-6 md:p-8 text-center">
            <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-success mx-auto mb-4" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">No issues found</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              {statusFilter ? `No ${statusFilter.toLowerCase()} issues` : "All clear! No issues reported yet."}
            </p>
            <Button onClick={() => setShowCreateSheet(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Report First Issue
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Issues List */}
      <div className="space-y-3">
        {filteredIssues.map((issue) => {
          const IssueIcon = issueTypeIcons[issue.issue_type] || AlertCircle;

          const issueCard = (
            <Card
              key={issue.id}
              className={cn(
                "bg-elec-gray overflow-hidden touch-feedback",
                (issue.severity === "High" || issue.severity === "Critical") && "border-l-4 border-l-destructive"
              )}
            >
              <CardContent className="p-3 md:p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                      issue.status === "Resolved" || issue.status === "Closed"
                        ? "bg-success/20"
                        : "bg-destructive/20"
                    )}>
                      <IssueIcon className={cn(
                        "h-5 w-5",
                        issue.status === "Resolved" || issue.status === "Closed"
                          ? "text-success"
                          : "text-destructive"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-foreground text-sm">{issue.title}</h4>
                        <Badge className={severityColors[issue.severity] + " text-[10px]"}>
                          {issue.severity}
                        </Badge>
                        <Badge className={statusColors[issue.status] + " text-[10px]"}>
                          {issue.status}
                        </Badge>
                      </div>
                      {issue.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {issue.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Wrench className="h-3 w-3" />
                          {issue.job?.title || "No job"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(issue.created_at), "dd MMM yyyy")}
                        </span>
                        {issue.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {issue.location}
                          </span>
                        )}
                        {issue.due_date && (
                          <span className="flex items-center gap-1 text-warning">
                            <Timer className="h-3 w-3" />
                            Due: {format(new Date(issue.due_date), "dd MMM")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {issue.resolution_notes && (
                    <div className="p-2 bg-success/10 rounded-lg">
                      <p className="text-xs text-success">
                        <CheckCircle className="h-3 w-3 inline mr-1" />
                        <strong>Resolution:</strong> {issue.resolution_notes}
                      </p>
                    </div>
                  )}

                  {issue.status !== "Resolved" && issue.status !== "Closed" && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 touch-feedback"
                        onClick={() => setSelectedIssue(issue)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleResolve(issue.id)}
                        className="flex-1 touch-feedback"
                        disabled={updateJobIssueStatus.isPending}
                      >
                        {updateJobIssueStatus.isPending ? (
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mr-1" />
                        )}
                        Resolve
                      </Button>
                    </div>
                  )}

                  {(issue.status === "Resolved" || issue.status === "Closed") && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 touch-feedback"
                        onClick={() => setSelectedIssue(issue)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );

          // Wrap with swipeable on mobile for unresolved issues
          if (isMobile && issue.status !== "Resolved" && issue.status !== "Closed") {
            return (
              <SwipeableRow
                key={issue.id}
                rightAction={{
                  icon: <CheckCircle className="h-6 w-6" />,
                  label: "Resolve",
                  onClick: () => handleResolve(issue.id),
                  variant: "success"
                }}
                leftAction={{
                  icon: <Trash2 className="h-6 w-6" />,
                  label: "Delete",
                  onClick: () => setDeleteConfirmId(issue.id),
                  variant: "destructive"
                }}
              >
                {issueCard}
              </SwipeableRow>
            );
          }

          return issueCard;
        })}
      </div>

      {/* Create Issue Sheet */}
      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl flex flex-col">
          <div className="flex flex-col h-full bg-background">
            <SheetHeader className="p-4 border-b border-border">
              <SheetTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                Report New Issue
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
              {/* Job Selection */}
              <div className="space-y-2">
                <Label>Job *</Label>
                <Select
                  value={formData.job_id}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, job_id: v }))}
                >
                  <SelectTrigger className="h-12 bg-elec-gray">
                    <SelectValue placeholder="Select a job" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-elec-gray">
                    {jobs.map(job => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title} - {job.client}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label>Issue Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Brief description of the issue"
                  className="h-12 bg-elec-gray"
                />
              </div>

              {/* Issue Type & Severity */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Issue Type</Label>
                  <Select
                    value={formData.issue_type}
                    onValueChange={(v) => setFormData(prev => ({ ...prev, issue_type: v as IssueType }))}
                  >
                    <SelectTrigger className="h-12 bg-elec-gray">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-elec-gray">
                      <SelectItem value="Snag">Snag</SelectItem>
                      <SelectItem value="Variation">Variation</SelectItem>
                      <SelectItem value="RFI">RFI</SelectItem>
                      <SelectItem value="Defect">Defect</SelectItem>
                      <SelectItem value="Delay">Delay</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Severity</Label>
                  <Select
                    value={formData.severity}
                    onValueChange={(v) => setFormData(prev => ({ ...prev, severity: v as IssueSeverity }))}
                  >
                    <SelectTrigger className="h-12 bg-elec-gray">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-elec-gray">
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={formData.location || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Where on site is this issue?"
                  className="h-12 bg-elec-gray"
                />
              </div>

              {/* Assign To */}
              <div className="space-y-2">
                <Label>Assign To</Label>
                <Select
                  value={formData.assigned_to || ""}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, assigned_to: v || undefined }))}
                >
                  <SelectTrigger className="h-12 bg-elec-gray">
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-elec-gray">
                    {employees.map(emp => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name} - {emp.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={formData.due_date || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value || undefined }))}
                  className="h-12 bg-elec-gray"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed description of the issue..."
                  className="min-h-[100px] bg-elec-gray"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-background">
              <Button
                onClick={handleCreate}
                className="w-full h-14 text-base font-semibold"
                disabled={createJobIssue.isPending}
              >
                {createJobIssue.isPending ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Plus className="h-5 w-5 mr-2" />
                )}
                Report Issue
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Resolve Issue Sheet */}
      <Sheet open={showResolveSheet} onOpenChange={setShowResolveSheet}>
        <SheetContent side="bottom" className="h-[50vh] p-0 rounded-t-2xl flex flex-col">
          <div className="flex flex-col h-full bg-background">
            <SheetHeader className="p-4 border-b border-border">
              <SheetTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Resolve Issue
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
              <div className="space-y-2">
                <Label>Resolution Notes</Label>
                <Textarea
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  placeholder="Describe how the issue was resolved..."
                  className="min-h-[120px] bg-elec-gray"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-background">
              <Button
                onClick={handleConfirmResolve}
                className="w-full h-14 text-base font-semibold bg-success hover:bg-success/90"
                disabled={updateJobIssueStatus.isPending}
              >
                {updateJobIssueStatus.isPending ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-5 w-5 mr-2" />
                )}
                Mark as Resolved
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* View Issue Details Sheet */}
      <Sheet open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl flex flex-col">
          {selectedIssue && (
            <div className="flex flex-col h-full bg-background">
              <SheetHeader className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <SheetTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-elec-yellow" />
                    Issue Details
                  </SheetTitle>
                  <Badge className={statusColors[selectedIssue.status]}>
                    {selectedIssue.status}
                  </Badge>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
                {/* Issue Header */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{selectedIssue.title}</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className={severityColors[selectedIssue.severity]}>
                      {selectedIssue.severity}
                    </Badge>
                    <Badge variant="outline">{selectedIssue.issue_type}</Badge>
                  </div>
                </div>

                {/* Job Info */}
                <Card className="bg-elec-gray">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground mb-2">{selectedIssue.job?.title}</h4>
                    <p className="text-sm text-foreground/70">{selectedIssue.job?.client}</p>
                  </CardContent>
                </Card>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-elec-gray p-3 rounded-lg">
                    <p className="text-xs text-foreground/70 mb-1">Reported</p>
                    <p className="font-semibold text-foreground">
                      {format(new Date(selectedIssue.created_at), "dd MMM yyyy")}
                    </p>
                  </div>
                  {selectedIssue.location && (
                    <div className="bg-elec-gray p-3 rounded-lg">
                      <p className="text-xs text-foreground/70 mb-1">Location</p>
                      <p className="font-semibold text-foreground">{selectedIssue.location}</p>
                    </div>
                  )}
                  {selectedIssue.due_date && (
                    <div className="bg-elec-gray p-3 rounded-lg">
                      <p className="text-xs text-foreground/70 mb-1">Due Date</p>
                      <p className="font-semibold text-foreground">
                        {format(new Date(selectedIssue.due_date), "dd MMM yyyy")}
                      </p>
                    </div>
                  )}
                  {selectedIssue.assigned_employee && (
                    <div className="bg-elec-gray p-3 rounded-lg">
                      <p className="text-xs text-foreground/70 mb-1">Assigned To</p>
                      <p className="font-semibold text-foreground">{selectedIssue.assigned_employee.name}</p>
                    </div>
                  )}
                </div>

                {/* Description */}
                {selectedIssue.description && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Description</h4>
                    <p className="text-sm text-foreground/80 bg-elec-gray p-3 rounded-lg">
                      {selectedIssue.description}
                    </p>
                  </div>
                )}

                {/* Resolution */}
                {selectedIssue.resolution_notes && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-success flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Resolution
                    </h4>
                    <p className="text-sm text-foreground/80 bg-success/10 p-3 rounded-lg border border-success/20">
                      {selectedIssue.resolution_notes}
                    </p>
                    {selectedIssue.resolved_at && (
                      <p className="text-xs text-foreground/50">
                        Resolved on {format(new Date(selectedIssue.resolved_at), "dd MMM yyyy 'at' HH:mm")}
                      </p>
                    )}
                  </div>
                )}

                {/* Status Update */}
                {selectedIssue.status !== "Resolved" && selectedIssue.status !== "Closed" && (
                  <div className="space-y-2">
                    <Label>Update Status</Label>
                    <Select
                      value={selectedIssue.status}
                      onValueChange={(v) => handleStatusChange(selectedIssue.id, v as IssueStatus)}
                    >
                      <SelectTrigger className="h-12 bg-elec-gray">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-gray border-elec-gray">
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border bg-background space-y-2">
                {selectedIssue.status !== "Resolved" && selectedIssue.status !== "Closed" && (
                  <Button
                    onClick={() => {
                      setSelectedIssue(null);
                      handleResolve(selectedIssue.id);
                    }}
                    className="w-full h-14 text-base font-semibold bg-success hover:bg-success/90"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Resolve Issue
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    setDeleteConfirmId(selectedIssue.id);
                    setSelectedIssue(null);
                  }}
                  className="w-full h-12 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Issue
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="bg-background border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Issue?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the issue record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteJobIssue.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );

  return isMobile ? (
    <PullToRefresh onRefresh={handleRefresh} className="h-full">
      {content}
    </PullToRefresh>
  ) : content;
}

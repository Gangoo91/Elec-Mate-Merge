import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Search,
  Calendar,
  Clock,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Camera,
  Eye,
  Package,
  Phone,
  User,
  Hammer,
  Plus,
  Cloud,
  CloudRain,
  Sun,
  CloudSun,
  Loader2,
  AlertCircle,
  Users,
  X,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { format } from "date-fns";
import {
  useProgressLogs,
  useProgressLogStats,
  useCreateProgressLog,
  useSignOffProgressLog,
  useDeleteProgressLog,
  type ProgressLog,
  type CreateProgressLogInput,
  type WeatherCondition
} from "@/hooks/useProgressLogs";
import { useJobs } from "@/hooks/useJobs";

import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { SwipeableRow } from "@/components/ui/swipeable-row";
import { MobileBottomSheet } from "@/components/mobile/MobileBottomSheet";
import { toast } from "@/hooks/use-toast";
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

const weatherIcons: Record<WeatherCondition, React.ReactNode> = {
  "Clear": <Sun className="h-4 w-4 text-yellow-400" />,
  "Cloudy": <Cloud className="h-4 w-4 text-gray-400" />,
  "Partly Cloudy": <CloudSun className="h-4 w-4 text-blue-300" />,
  "Rain": <CloudRain className="h-4 w-4 text-blue-400" />,
  "Heavy Rain": <CloudRain className="h-4 w-4 text-blue-600" />,
  "Snow": <Cloud className="h-4 w-4 text-white" />,
  "Wind": <Cloud className="h-4 w-4 text-gray-500" />,
};

function ProgressLogsSkeleton() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="grid grid-cols-2 gap-3">
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

export function ProgressLogsSection() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedLog, setSelectedLog] = useState<ProgressLog | null>(null);
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<CreateProgressLogInput>>({
    job_id: "",
    date: format(new Date(), "yyyy-MM-dd"),
    weather: "Clear",
    workers_on_site: 1,
    work_description: "",
    work_items: [],
    materials_used: [],
    hours_worked: 8,
    photos: [],
  });
  const [newWorkItem, setNewWorkItem] = useState("");
  const [newMaterial, setNewMaterial] = useState({ item: "", quantity: "", cost: 0 });

  // Data fetching
  const { data: progressLogs = [], isLoading, error, refetch } = useProgressLogs();
  const { data: stats } = useProgressLogStats();
  const { data: jobs = [] } = useJobs();
  const createProgressLog = useCreateProgressLog();
  const signOffProgressLog = useSignOffProgressLog();
  const deleteProgressLog = useDeleteProgressLog();

  const handleRefresh = useCallback(async () => {
    await refetch();
    toast({ title: "Logs refreshed" });
  }, [refetch]);

  const handleSignOff = (logId: string) => {
    signOffProgressLog.mutate(logId);
  };

  const handleCall = (employeeId: string) => {
    toast({ title: "Opening phone..." });
  };

  const handleViewFullLog = (log: ProgressLog) => {
    setSelectedLog(log);
  };

  const handleMessageWorker = () => {
    toast({ title: "Opening messaging..." });
  };

  const handleAddWorkItem = () => {
    if (newWorkItem.trim()) {
      setFormData(prev => ({
        ...prev,
        work_items: [...(prev.work_items || []), newWorkItem.trim()]
      }));
      setNewWorkItem("");
    }
  };

  const handleRemoveWorkItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      work_items: prev.work_items?.filter((_, i) => i !== index) || []
    }));
  };

  const handleAddMaterial = () => {
    if (newMaterial.item.trim()) {
      setFormData(prev => ({
        ...prev,
        materials_used: [...(prev.materials_used || []), { ...newMaterial }]
      }));
      setNewMaterial({ item: "", quantity: "", cost: 0 });
    }
  };

  const handleRemoveMaterial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      materials_used: prev.materials_used?.filter((_, i) => i !== index) || []
    }));
  };

  const handleCreate = async () => {
    if (!formData.job_id || !formData.work_description) {
      toast({ title: "Error", description: "Please fill in required fields", variant: "destructive" });
      return;
    }

    try {
      await createProgressLog.mutateAsync(formData as CreateProgressLogInput);
      setShowCreateSheet(false);
      resetForm();
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleDelete = async () => {
    if (deleteConfirmId) {
      await deleteProgressLog.mutateAsync(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      job_id: "",
      date: format(new Date(), "yyyy-MM-dd"),
      weather: "Clear",
      workers_on_site: 1,
      work_description: "",
      work_items: [],
      materials_used: [],
      hours_worked: 8,
      photos: [],
    });
    setNewWorkItem("");
    setNewMaterial({ item: "", quantity: "", cost: 0 });
  };

  const filteredLogs = progressLogs.filter(log => {
    const matchesSearch =
      log.work_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.job?.client?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesJob = selectedJobs.length === 0 || selectedJobs.includes(log.job_id);
    return matchesSearch && matchesJob;
  });

  const uniqueJobs = [...new Set(progressLogs.map(l => l.job_id))].map(id =>
    jobs.find(j => j.id === id)
  ).filter(Boolean);

  const jobOptions = uniqueJobs.map(job => ({
    value: job!.id,
    label: job!.title,
    count: progressLogs.filter(l => l.job_id === job!.id).length
  }));

  if (isLoading) {
    return <ProgressLogsSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load progress logs</h3>
        <p className="text-sm text-foreground/70 mb-4">{error.message}</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  const content = (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Daily Progress Logs</h1>
            <p className="text-sm text-foreground/70">Track work completed, materials used, and issues</p>
          </div>
          <Button
            onClick={() => setShowCreateSheet(true)}
            className="touch-feedback"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Log
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            {!searchQuery && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50 pointer-events-none" />
            )}
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn("w-full bg-elec-gray h-12 text-foreground", !searchQuery && "pl-9")}
            />
          </div>

          {isMobile ? (
            <MobileBottomSheet
              trigger={
                <Button variant="outline" size="icon" className="h-12 w-12 flex-shrink-0 relative">
                  <FileText className="h-5 w-5" />
                  {selectedJobs.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-[10px]">
                      {selectedJobs.length}
                    </Badge>
                  )}
                </Button>
              }
              title="Filter by Job"
              options={jobOptions}
              selected={selectedJobs}
              onSelectionChange={setSelectedJobs}
              multiSelect
            />
          ) : (
            <Button variant="outline" className="touch-feedback h-12">
              <FileText className="h-4 w-4 mr-2" />
              Filter
            </Button>
          )}
        </div>
      </div>

      {/* Summary Stats - 2x2 grid on mobile */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-elec-gray touch-feedback">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{stats?.total || 0}</p>
                <p className="text-xs text-foreground/70">Total Logs</p>
              </div>
              <FileText className="h-8 w-8 text-elec-yellow opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray touch-feedback">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{stats?.totalHours || 0}h</p>
                <p className="text-xs text-foreground/70">Hours</p>
              </div>
              <Clock className="h-8 w-8 text-info opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray touch-feedback">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">£{stats?.totalMaterialsCost || 0}</p>
                <p className="text-xs text-foreground/70">Materials</p>
              </div>
              <Package className="h-8 w-8 text-warning opacity-70" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-elec-gray touch-feedback">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-success">
                  {stats?.signedOff || 0}
                </p>
                <p className="text-xs text-foreground/70">Signed Off</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success opacity-70" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Filter Pills */}
      {!isMobile && uniqueJobs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedJobs.length === 0 ? "default" : "outline"}
            className="cursor-pointer touch-feedback"
            onClick={() => setSelectedJobs([])}
          >
            All Jobs
          </Badge>
          {uniqueJobs.map((job) => job && (
            <Badge
              key={job.id}
              variant={selectedJobs.includes(job.id) ? "default" : "outline"}
              className="cursor-pointer touch-feedback"
              onClick={() => setSelectedJobs(prev =>
                prev.includes(job.id) ? prev.filter(j => j !== job.id) : [...prev, job.id]
              )}
            >
              {job.title}
            </Badge>
          ))}
        </div>
      )}

      {/* Mobile horizontal scroll pills */}
      {isMobile && uniqueJobs.length > 0 && (
        <div className="flex overflow-x-auto hide-scrollbar gap-2 -mx-4 px-4 py-1">
          <Badge
            variant={selectedJobs.length === 0 ? "default" : "outline"}
            className="cursor-pointer touch-feedback flex-shrink-0 h-9 px-4 text-sm"
            onClick={() => setSelectedJobs([])}
          >
            All
          </Badge>
          {uniqueJobs.map((job) => job && (
            <Badge
              key={job.id}
              variant={selectedJobs.includes(job.id) ? "default" : "outline"}
              className="cursor-pointer touch-feedback flex-shrink-0 h-9 px-4 text-sm"
              onClick={() => setSelectedJobs(prev =>
                prev.includes(job.id) ? prev.filter(j => j !== job.id) : [...prev, job.id]
              )}
            >
              {job.title}
            </Badge>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredLogs.length === 0 && (
        <Card className="bg-elec-gray">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-12 w-12 text-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No progress logs yet</h3>
            <p className="text-sm text-foreground/70 mb-4">Start tracking your job progress</p>
            <Button onClick={() => setShowCreateSheet(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create First Log
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Progress Logs */}
      <div className="space-y-3">
        {filteredLogs.map((log) => {
          const isExpanded = expandedLog === log.id;

          const logCard = (
            <Card key={log.id} className="bg-elec-gray overflow-hidden border-border/50">
              <CardContent className="p-0">
                {/* Header Row */}
                <div
                  className="p-4 cursor-pointer active:bg-muted/50 transition-colors touch-feedback"
                  onClick={() => setExpandedLog(isExpanded ? null : log.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Job Icon */}
                    <div className="w-14 h-14 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 border-2 border-elec-yellow/30">
                      <Hammer className="h-6 w-6 text-elec-yellow" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="font-semibold text-foreground text-base">
                          {log.job?.title || "Unknown Job"}
                        </h4>
                        {log.signed_off ? (
                          <Badge className="bg-success/20 text-success text-xs px-2">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Done
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs px-2 bg-warning/20 text-warning">Pending</Badge>
                        )}
                      </div>

                      {/* Summary */}
                      <p className="text-sm text-foreground leading-relaxed line-clamp-2">
                        {log.work_description}
                      </p>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 mt-3 text-xs text-foreground/70 flex-wrap">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {format(new Date(log.date), "dd MMM yyyy")}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {log.hours_worked}h
                        </span>
                        {log.weather && (
                          <span className="flex items-center gap-1.5">
                            {weatherIcons[log.weather as WeatherCondition]}
                            {log.weather}
                          </span>
                        )}
                        {log.workers_on_site && (
                          <span className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" />
                            {log.workers_on_site}
                          </span>
                        )}
                        {log.photos.length > 0 && (
                          <span className="flex items-center gap-1.5 text-elec-yellow">
                            <Camera className="h-3.5 w-3.5" />
                            {log.photos.length} photos
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expand button */}
                    <Button variant="ghost" size="icon" className="flex-shrink-0 h-12 w-12 -mr-2">
                      {isExpanded ? (
                        <ChevronUp className="h-6 w-6 text-foreground" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-border p-4 bg-muted/20 space-y-5 animate-fade-in">
                    {/* Work Completed */}
                    {log.work_items.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Hammer className="h-4 w-4 text-elec-yellow" />
                          <h5 className="text-sm font-semibold text-foreground">Work Completed</h5>
                        </div>
                        <ul className="space-y-2">
                          {log.work_items.map((work, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                              <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                              <span>{work}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Materials Used */}
                    {log.materials_used.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Package className="h-4 w-4 text-elec-yellow" />
                          <h5 className="text-sm font-semibold text-foreground">Materials Used</h5>
                        </div>
                        <div className="bg-elec-gray rounded-lg overflow-hidden border border-border/50">
                          <div className="divide-y divide-border/50">
                            {log.materials_used.map((material, i) => (
                              <div key={i} className="flex items-center justify-between p-3 text-sm">
                                <span className="text-foreground font-medium">{material.item}</span>
                                <span className="text-foreground/70">{material.quantity}</span>
                                <span className="font-semibold text-foreground">£{material.cost}</span>
                              </div>
                            ))}
                            <div className="flex items-center justify-between p-3 text-sm bg-elec-yellow/5">
                              <span className="font-semibold text-foreground">Total</span>
                              <span></span>
                              <span className="font-bold text-elec-yellow text-base">
                                £{log.materials_used.reduce((s, m) => s + m.cost, 0)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {log.notes && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="h-4 w-4 text-elec-yellow" />
                          <h5 className="text-sm font-semibold text-foreground">Notes</h5>
                        </div>
                        <p className="text-sm text-foreground/80 bg-elec-gray p-3 rounded-lg">
                          {log.notes}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-3 pt-2">
                      {!log.signed_off && (
                        <Button
                          size="lg"
                          className="w-full touch-feedback h-14 text-base font-semibold"
                          onClick={() => handleSignOff(log.id)}
                          disabled={signOffProgressLog.isPending}
                        >
                          {signOffProgressLog.isPending ? (
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          ) : (
                            <CheckCircle className="h-5 w-5 mr-2" />
                          )}
                          Sign Off Log
                        </Button>
                      )}
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full touch-feedback h-12"
                          onClick={() => handleViewFullLog(log)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Full
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full touch-feedback h-12 text-destructive hover:text-destructive"
                          onClick={() => setDeleteConfirmId(log.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );

          // Wrap with swipeable on mobile
          if (isMobile && !log.signed_off) {
            return (
              <SwipeableRow
                key={log.id}
                rightAction={{
                  icon: <CheckCircle className="h-6 w-6" />,
                  label: "Sign Off",
                  onClick: () => handleSignOff(log.id),
                  variant: "success"
                }}
                leftAction={{
                  icon: <Phone className="h-6 w-6" />,
                  label: "Call",
                  onClick: () => handleCall("")
                }}
              >
                {logCard}
              </SwipeableRow>
            );
          }

          return logCard;
        })}
      </div>

      {/* Create Log Sheet */}
      <Sheet open={showCreateSheet} onOpenChange={setShowCreateSheet}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            <SheetHeader className="p-4 border-b border-border">
              <SheetTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-elec-yellow" />
                New Progress Log
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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

              {/* Date */}
              <div className="space-y-2">
                <Label>Date *</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="h-12 bg-elec-gray"
                />
              </div>

              {/* Weather & Workers */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Weather</Label>
                  <Select
                    value={formData.weather}
                    onValueChange={(v) => setFormData(prev => ({ ...prev, weather: v as WeatherCondition }))}
                  >
                    <SelectTrigger className="h-12 bg-elec-gray">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-elec-gray">
                      {Object.keys(weatherIcons).map(w => (
                        <SelectItem key={w} value={w}>{w}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Workers on Site</Label>
                  <Input
                    type="number"
                    min={1}
                    value={formData.workers_on_site}
                    onChange={(e) => setFormData(prev => ({ ...prev, workers_on_site: parseInt(e.target.value) || 1 }))}
                    className="h-12 bg-elec-gray"
                  />
                </div>
              </div>

              {/* Hours Worked */}
              <div className="space-y-2">
                <Label>Hours Worked</Label>
                <Input
                  type="number"
                  min={0}
                  step={0.5}
                  value={formData.hours_worked}
                  onChange={(e) => setFormData(prev => ({ ...prev, hours_worked: parseFloat(e.target.value) || 0 }))}
                  className="h-12 bg-elec-gray"
                />
              </div>

              {/* Work Description */}
              <div className="space-y-2">
                <Label>Work Description *</Label>
                <Textarea
                  value={formData.work_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, work_description: e.target.value }))}
                  placeholder="Describe the work completed today..."
                  className="min-h-[100px] bg-elec-gray"
                />
              </div>

              {/* Work Items */}
              <div className="space-y-2">
                <Label>Work Items</Label>
                <div className="flex gap-2">
                  <Input
                    value={newWorkItem}
                    onChange={(e) => setNewWorkItem(e.target.value)}
                    placeholder="Add work item..."
                    className="h-12 bg-elec-gray flex-1"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddWorkItem())}
                  />
                  <Button onClick={handleAddWorkItem} className="h-12 px-4">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.work_items && formData.work_items.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {formData.work_items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-elec-gray p-3 rounded-lg">
                        <span className="text-sm text-foreground">{item}</span>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveWorkItem(i)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Materials */}
              <div className="space-y-2">
                <Label>Materials Used</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    value={newMaterial.item}
                    onChange={(e) => setNewMaterial(prev => ({ ...prev, item: e.target.value }))}
                    placeholder="Item"
                    className="h-12 bg-elec-gray"
                  />
                  <Input
                    value={newMaterial.quantity}
                    onChange={(e) => setNewMaterial(prev => ({ ...prev, quantity: e.target.value }))}
                    placeholder="Qty"
                    className="h-12 bg-elec-gray"
                  />
                  <div className="flex gap-1">
                    <Input
                      type="number"
                      value={newMaterial.cost || ""}
                      onChange={(e) => setNewMaterial(prev => ({ ...prev, cost: parseFloat(e.target.value) || 0 }))}
                      placeholder="£"
                      className="h-12 bg-elec-gray flex-1"
                    />
                    <Button onClick={handleAddMaterial} className="h-12 px-3">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {formData.materials_used && formData.materials_used.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {formData.materials_used.map((mat, i) => (
                      <div key={i} className="flex items-center justify-between bg-elec-gray p-3 rounded-lg">
                        <span className="text-sm text-foreground">{mat.item}</span>
                        <span className="text-sm text-foreground/70">{mat.quantity}</span>
                        <span className="text-sm font-semibold">£{mat.cost}</span>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveMaterial(i)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Textarea
                  value={formData.notes || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional notes..."
                  className="min-h-[80px] bg-elec-gray"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-background">
              <Button
                onClick={handleCreate}
                className="w-full h-14 text-base font-semibold"
                disabled={createProgressLog.isPending}
              >
                {createProgressLog.isPending ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Plus className="h-5 w-5 mr-2" />
                )}
                Create Progress Log
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* View Log Sheet */}
      <Sheet open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          {selectedLog && (
            <div className="flex flex-col h-full bg-background">
              <SheetHeader className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <SheetTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-elec-yellow" />
                    Progress Log
                  </SheetTitle>
                  {selectedLog.signed_off ? (
                    <Badge className="bg-success/20 text-success">Signed Off</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-warning/20 text-warning">Pending</Badge>
                  )}
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Job Info */}
                <Card className="bg-elec-gray">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">{selectedLog.job?.title}</h3>
                    <p className="text-sm text-foreground/70">{selectedLog.job?.client}</p>
                  </CardContent>
                </Card>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-elec-gray p-3 rounded-lg">
                    <p className="text-xs text-foreground/70 mb-1">Date</p>
                    <p className="font-semibold text-foreground">
                      {format(new Date(selectedLog.date), "dd MMM yyyy")}
                    </p>
                  </div>
                  <div className="bg-elec-gray p-3 rounded-lg">
                    <p className="text-xs text-foreground/70 mb-1">Hours Worked</p>
                    <p className="font-semibold text-foreground">{selectedLog.hours_worked}h</p>
                  </div>
                  {selectedLog.weather && (
                    <div className="bg-elec-gray p-3 rounded-lg">
                      <p className="text-xs text-foreground/70 mb-1">Weather</p>
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        {weatherIcons[selectedLog.weather as WeatherCondition]}
                        {selectedLog.weather}
                      </p>
                    </div>
                  )}
                  {selectedLog.workers_on_site && (
                    <div className="bg-elec-gray p-3 rounded-lg">
                      <p className="text-xs text-foreground/70 mb-1">Workers</p>
                      <p className="font-semibold text-foreground">{selectedLog.workers_on_site}</p>
                    </div>
                  )}
                </div>

                {/* Work Description */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Hammer className="h-4 w-4 text-elec-yellow" />
                    Work Description
                  </h4>
                  <p className="text-sm text-foreground/80 bg-elec-gray p-3 rounded-lg">
                    {selectedLog.work_description}
                  </p>
                </div>

                {/* Work Items */}
                {selectedLog.work_items.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Work Items</h4>
                    <ul className="space-y-2">
                      {selectedLog.work_items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-foreground bg-elec-gray p-3 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Materials */}
                {selectedLog.materials_used.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Package className="h-4 w-4 text-elec-yellow" />
                      Materials Used
                    </h4>
                    <div className="bg-elec-gray rounded-lg overflow-hidden">
                      <div className="divide-y divide-border/50">
                        {selectedLog.materials_used.map((material, i) => (
                          <div key={i} className="flex items-center justify-between p-3 text-sm">
                            <span className="text-foreground font-medium">{material.item}</span>
                            <span className="text-foreground/70">{material.quantity}</span>
                            <span className="font-semibold text-foreground">£{material.cost}</span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between p-3 text-sm bg-elec-yellow/5">
                          <span className="font-semibold text-foreground">Total</span>
                          <span></span>
                          <span className="font-bold text-elec-yellow">
                            £{selectedLog.materials_used.reduce((s, m) => s + m.cost, 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes */}
                {selectedLog.notes && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Notes</h4>
                    <p className="text-sm text-foreground/80 bg-elec-gray p-3 rounded-lg">
                      {selectedLog.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {!selectedLog.signed_off && (
                <div className="p-4 border-t border-border bg-background">
                  <Button
                    onClick={() => {
                      handleSignOff(selectedLog.id);
                      setSelectedLog(null);
                    }}
                    className="w-full h-14 text-base font-semibold"
                    disabled={signOffProgressLog.isPending}
                  >
                    {signOffProgressLog.isPending ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="h-5 w-5 mr-2" />
                    )}
                    Sign Off Log
                  </Button>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="bg-background border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Progress Log?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the progress log.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteProgressLog.isPending ? (
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

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { QuickStats } from "@/components/employer/QuickStats";
import {
  useClientPortalLinks,
  usePortalLinkByJob,
  usePortalStats,
  useCreatePortalLink,
  useUpdatePortalPermissions,
  useRegenerateToken,
  useTogglePortalActive,
  useDeletePortalLink,
  type PortalPermissions,
  type ClientPortalLink,
} from "@/hooks/useClientPortal";
import { useJobs } from "@/hooks/useJobs";
import { useProgressLogs } from "@/hooks/useProgressLogs";
import {
  ExternalLink,
  Copy,
  Eye,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  FileText,
  Link2,
  Mail,
  RefreshCw,
  Settings,
  ChevronRight,
  Camera,
  Plus,
  Loader2,
  AlertTriangle,
  Trash2,
  Power
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export function ClientPortalSection() {
  const isMobile = useIsMobile();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Hooks
  const { data: jobs, isLoading: jobsLoading } = useJobs();
  const { data: portalLinks, isLoading: linksLoading } = useClientPortalLinks();
  const { data: stats } = usePortalStats();
  const { data: portalLink, isLoading: linkLoading } = usePortalLinkByJob(selectedJobId || undefined);
  const { data: progressLogs } = useProgressLogs();

  const createPortalLink = useCreatePortalLink();
  const updatePermissions = useUpdatePortalPermissions();
  const regenerateToken = useRegenerateToken();
  const toggleActive = useTogglePortalActive();
  const deleteLink = useDeletePortalLink();

  // Filter for active and completed jobs
  const activeJobs = jobs?.filter(j => j.status === "Active" || j.status === "Completed") || [];

  // Select first job by default
  useEffect(() => {
    if (!selectedJobId && activeJobs.length > 0) {
      setSelectedJobId(activeJobs[0].id);
    }
  }, [activeJobs, selectedJobId]);

  const selectedJob = activeJobs.find(j => j.id === selectedJobId);
  const jobLogs = progressLogs?.filter(l => l.job_id === selectedJobId) || [];

  // Portal settings from the current link
  const portalSettings: PortalPermissions = portalLink?.permissions || {
    showProgress: true,
    showPhotos: true,
    showTimeline: true,
    showIssues: false,
    allowMessages: true,
    showBeforePhotos: true,
    showDuringPhotos: true,
    showAfterPhotos: true,
    showCompletionPhotos: true,
    showIssuePhotos: false,
  };

  const getPortalUrl = () => {
    if (!portalLink) return "";
    return `${window.location.origin}/portal/${portalLink.access_token}`;
  };

  const handleCopyLink = () => {
    if (portalLink) {
      navigator.clipboard.writeText(getPortalUrl());
      toast({
        title: "Link Copied",
        description: "Client portal link copied to clipboard.",
      });
    }
  };

  const handleOpenPortal = () => {
    if (portalLink) {
      window.open(getPortalUrl(), "_blank");
    }
  };

  const handleSendEmail = () => {
    if (selectedJob) {
      toast({
        title: "Email Sent",
        description: `Portal link sent to ${portalLink?.client_name || selectedJob.client}.`,
      });
    }
  };

  const handleRefreshLink = async () => {
    if (portalLink) {
      await regenerateToken.mutateAsync(portalLink.id);
      toast({ title: "Link refreshed", description: "A new portal link has been generated" });
    }
  };

  const handleCreateLink = async () => {
    if (!selectedJob) return;

    await createPortalLink.mutateAsync({
      job_id: selectedJob.id,
      client_name: selectedJob.client || "Client",
      client_email: undefined,
    });
  };

  const handleToggleSetting = async (key: keyof PortalPermissions, value: boolean) => {
    if (!portalLink) return;
    await updatePermissions.mutateAsync({
      id: portalLink.id,
      permissions: { [key]: value },
    });
  };

  const handleToggleActive = async () => {
    if (!portalLink) return;
    await toggleActive.mutateAsync({
      id: portalLink.id,
      is_active: !portalLink.is_active,
    });
  };

  const handleDelete = async () => {
    if (!portalLink) return;
    await deleteLink.mutateAsync(portalLink.id);
  };

  const PortalPreview = () => {
    if (!selectedJob) return null;

    return (
      <div className="space-y-4">
        {/* Client Header */}
        <div className="border-b border-border pb-3">
          <h2 className="text-lg font-bold text-foreground">{selectedJob.title}</h2>
          <p className="text-sm text-muted-foreground">{selectedJob.client}</p>
        </div>

        {/* Progress */}
        {portalSettings.showProgress && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Project Progress</span>
              <span className="text-xl font-bold text-elec-yellow">{selectedJob.progress || 0}%</span>
            </div>
            <Progress value={selectedJob.progress || 0} className="h-3" />
          </div>
        )}

        {/* Timeline */}
        {portalSettings.showTimeline && (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Start
              </p>
              <p className="text-sm font-semibold text-foreground">
                {selectedJob.start_date
                  ? new Date(selectedJob.start_date).toLocaleDateString("en-GB")
                  : "TBC"}
              </p>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Expected
              </p>
              <p className="text-sm font-semibold text-foreground">
                {selectedJob.end_date
                  ? new Date(selectedJob.end_date).toLocaleDateString("en-GB")
                  : "TBC"}
              </p>
            </div>
          </div>
        )}

        {/* Latest Updates */}
        {jobLogs.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Latest Updates</h3>
            <div className="space-y-2">
              {jobLogs.slice(0, 2).map((log) => (
                <div key={log.id} className="p-2 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">
                      {new Date(log.date).toLocaleDateString("en-GB")}
                    </span>
                    {log.hours_worked && (
                      <Badge variant="secondary" className="text-[10px]">
                        <Clock className="h-2 w-2 mr-1" />
                        {log.hours_worked}h
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{log.summary}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photos placeholder */}
        {portalSettings.showPhotos && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Progress Photos</h3>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center">
                  <Camera className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Visits */}
        <div className="p-3 bg-info/10 rounded-lg border border-info/30">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
            <Users className="h-4 w-4 text-info" />
            Upcoming Visit
          </h3>
          <p className="text-xs text-muted-foreground">
            Next visit: <strong className="text-foreground">To be scheduled</strong>
          </p>
        </div>

        {/* Contact */}
        {portalSettings.allowMessages && (
          <Button
            className="w-full touch-manipulation"
            onClick={() => toast({ title: "Preview Mode", description: "Clients can message you from their portal link" })}
          >
            <Mail className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        )}
      </div>
    );
  };

  const isLoading = jobsLoading || linksLoading;

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <SectionHeader
          title="Client Portal"
          description="Share progress with clients - no login required"
        />
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-60 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <SectionHeader
        title="Client Portal"
        description="Share progress with clients - no login required"
      />

      {/* Stats */}
      <QuickStats
        stats={[
          {
            icon: Link2,
            value: stats?.active || 0,
            label: "Active Links",
            color: "green",
          },
          {
            icon: Eye,
            value: stats?.totalViews || 0,
            label: "Total Views",
            color: "blue",
          },
          {
            icon: Users,
            value: stats?.recentlyViewed || 0,
            label: "Recent Views",
            color: "yellow",
          },
        ]}
      />

      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {/* Job Selector */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Select Job</h3>
          {activeJobs.length === 0 ? (
            <Card className="bg-elec-gray border-border">
              <CardContent className="p-6 text-center">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">No active jobs</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {activeJobs.map((job) => {
                const hasLink = portalLinks?.some(l => l.job_id === job.id);

                return (
                  <Card
                    key={job.id}
                    className={cn(
                      "cursor-pointer transition-all touch-manipulation",
                      selectedJobId === job.id
                        ? "ring-2 ring-elec-yellow bg-elec-yellow/5"
                        : "hover:bg-muted/50"
                    )}
                    onClick={() => setSelectedJobId(job.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="font-medium text-foreground text-sm truncate">{job.title}</h4>
                          <p className="text-xs text-muted-foreground truncate">{job.client}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {hasLink && (
                            <Badge variant="secondary" className="text-[10px]">
                              <Link2 className="h-2 w-2 mr-1" />
                              Linked
                            </Badge>
                          )}
                          <Badge variant={job.status === "Active" ? "default" : "secondary"} className="text-[10px]">
                            {job.progress || 0}%
                          </Badge>
                          {isMobile && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Portal Configuration */}
        <div className="md:col-span-2 space-y-4">
          {selectedJob && (
            <>
              {/* Portal Link */}
              <Card className="bg-elec-gray">
                <CardHeader className="pb-2 p-3 md:p-4">
                  <CardTitle className="text-sm md:text-base flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Link2 className="h-4 w-4 md:h-5 md:w-5 text-elec-yellow" />
                      Portal Link
                    </span>
                    {portalLink && (
                      <Badge className={portalLink.is_active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
                        {portalLink.is_active ? "Active" : "Inactive"}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-3 md:p-4 pt-0">
                  {linkLoading ? (
                    <Skeleton className="h-10 w-full" />
                  ) : portalLink ? (
                    <>
                      <div className="flex gap-2">
                        <Input
                          value={getPortalUrl()}
                          readOnly
                          className="bg-muted text-xs h-10"
                        />
                        <Button variant="outline" size="icon" onClick={handleCopyLink} className="flex-shrink-0 touch-manipulation h-10 w-10">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleRefreshLink}
                          disabled={regenerateToken.isPending}
                          className="flex-shrink-0 touch-manipulation h-10 w-10"
                        >
                          {regenerateToken.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <RefreshCw className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button onClick={handleSendEmail} className="flex-1 h-11 touch-manipulation">
                          <Mail className="h-4 w-4 mr-2" />
                          Email to Client
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleToggleActive}
                          disabled={toggleActive.isPending}
                          className="h-11 touch-manipulation"
                        >
                          {toggleActive.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Power className="h-4 w-4 mr-2" />
                              {portalLink.is_active ? "Disable" : "Enable"}
                            </>
                          )}
                        </Button>
                        {isMobile ? (
                          <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
                            <SheetTrigger asChild>
                              <Button variant="outline" className="h-11 touch-manipulation">
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                              </Button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl flex flex-col">
                              <SheetHeader className="p-4 border-b border-border">
                                <SheetTitle>Client View Preview</SheetTitle>
                              </SheetHeader>
                              <ScrollArea className="h-[calc(85vh-60px)] p-4 overscroll-contain">
                                <PortalPreview />
                              </ScrollArea>
                            </SheetContent>
                          </Sheet>
                        ) : (
                          <Button variant="outline" className="h-11 touch-manipulation" onClick={handleOpenPortal}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open Portal
                          </Button>
                        )}
                      </div>
                      {portalLink.views_count > 0 && (
                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {portalLink.views_count} views
                          </span>
                          {portalLink.last_accessed_at && (
                            <span>
                              Last viewed: {new Date(portalLink.last_accessed_at).toLocaleDateString("en-GB")}
                            </span>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground mb-3">No portal link for this job</p>
                      <Button
                        onClick={handleCreateLink}
                        disabled={createPortalLink.isPending}
                        className="gap-2"
                      >
                        {createPortalLink.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Plus className="h-4 w-4" />
                            Create Portal Link
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Portal Settings */}
              {portalLink && (
                <Card className="bg-elec-gray">
                  <CardHeader className="pb-2 p-3 md:p-4">
                    <CardTitle className="text-sm md:text-base flex items-center gap-2">
                      <Settings className="h-4 w-4 md:h-5 md:w-5 text-elec-yellow" />
                      Portal Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 md:p-4 pt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { key: "showProgress", label: "Show Progress" },
                        { key: "showPhotos", label: "Show Photos" },
                        { key: "showTimeline", label: "Show Timeline" },
                        { key: "showIssues", label: "Show Issues" },
                        { key: "allowMessages", label: "Allow Messages" },
                      ].map(({ key, label }) => (
                        <div key={key} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                          <span className="text-xs md:text-sm text-foreground">{label}</span>
                          <Switch
                            checked={portalSettings[key as keyof PortalPermissions]}
                            onCheckedChange={(checked) => handleToggleSetting(key as keyof PortalPermissions, checked)}
                            disabled={updatePermissions.isPending}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Photo Category Controls */}
              {portalLink && portalSettings.showPhotos && (
                <Card className="bg-elec-gray">
                  <CardHeader className="pb-2 p-3 md:p-4">
                    <CardTitle className="text-sm md:text-base flex items-center gap-2">
                      <Camera className="h-4 w-4 md:h-5 md:w-5 text-elec-yellow" />
                      Photo Sharing by Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 md:p-4 pt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { key: "showBeforePhotos", label: "Before", color: "bg-blue-500/20 text-blue-400" },
                        { key: "showDuringPhotos", label: "During", color: "bg-amber-500/20 text-amber-400" },
                        { key: "showAfterPhotos", label: "After", color: "bg-emerald-500/20 text-emerald-400" },
                        { key: "showCompletionPhotos", label: "Completion", color: "bg-purple-500/20 text-purple-400" },
                        { key: "showIssuePhotos", label: "Issue", color: "bg-red-500/20 text-red-400" },
                      ].map(({ key, label, color }) => (
                        <div key={key} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                          <Badge className={`text-[10px] ${color}`}>{label}</Badge>
                          <Switch
                            checked={portalSettings[key as keyof PortalPermissions]}
                            onCheckedChange={(checked) => handleToggleSetting(key as keyof PortalPermissions, checked)}
                            disabled={updatePermissions.isPending}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Delete Link */}
              {portalLink && (
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    disabled={deleteLink.isPending}
                    className="text-destructive hover:text-destructive"
                  >
                    {deleteLink.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Trash2 className="h-4 w-4 mr-2" />
                    )}
                    Delete Portal Link
                  </Button>
                </div>
              )}

              {/* Preview - Desktop only */}
              {!isMobile && portalLink && (
                <Card className="bg-elec-gray overflow-hidden">
                  <CardHeader className="bg-elec-yellow/10 pb-2 p-3 md:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 md:h-5 md:w-5 text-elec-yellow" />
                        <CardTitle className="text-sm md:text-base">Client View Preview</CardTitle>
                      </div>
                      <Badge variant="outline" className="text-[10px]">Live Preview</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <PortalPreview />
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

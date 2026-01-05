import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ExternalLink,
  Copy,
  Eye,
  Image,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  AlertTriangle,
  FileText,
  Link2,
  Mail,
  RefreshCw,
  Settings,
  ChevronRight,
  Camera
} from "lucide-react";
import { jobs, progressLogs, jobIssues, jobPhotos, PhotoCategory } from "@/data/employerMockData";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const categoryColors: Record<PhotoCategory, string> = {
  Before: "bg-blue-500/20 text-blue-400",
  During: "bg-amber-500/20 text-amber-400",
  After: "bg-emerald-500/20 text-emerald-400",
  Completion: "bg-purple-500/20 text-purple-400",
  Issue: "bg-red-500/20 text-red-400"
};

export function ClientPortalSection() {
  const isMobile = useIsMobile();
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [portalSettings, setPortalSettings] = useState({
    showProgress: true,
    showPhotos: true,
    showBeforePhotos: true,
    showDuringPhotos: true,
    showAfterPhotos: true,
    showCompletionPhotos: true,
    showIssuePhotos: false,
    showTimeline: true,
    showIssues: false,
    allowMessages: true,
  });
  const [previewOpen, setPreviewOpen] = useState(false);

  const activeJobs = jobs.filter(j => j.status === "Active" || j.status === "Completed");
  const jobLogs = progressLogs.filter(l => l.jobId === selectedJob.id);
  const jobIssuesList = jobIssues.filter(i => i.jobId === selectedJob.id);

  const handleCopyLink = () => {
    toast({
      title: "Link Copied",
      description: "Client portal link copied to clipboard."
    });
  };

  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: `Portal link sent to ${selectedJob.client}.`
    });
  };

  const handleRefreshLink = () => {
    toast({
      title: "Link Refreshed",
      description: "A new secure portal link has been generated."
    });
  };

  const PortalPreview = () => (
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
            <span className="text-xl font-bold text-elec-yellow">{selectedJob.progress}%</span>
          </div>
          <Progress value={selectedJob.progress} className="h-3" />
        </div>
      )}

      {/* Timeline */}
      {portalSettings.showTimeline && (
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Start
            </p>
            <p className="text-sm font-semibold text-foreground">{selectedJob.startDate}</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Expected
            </p>
            <p className="text-sm font-semibold text-foreground">{selectedJob.endDate}</p>
          </div>
        </div>
      )}

      {/* Latest Updates */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2">Latest Updates</h3>
        <div className="space-y-2">
          {jobLogs.slice(0, 2).map((log) => (
            <div key={log.id} className="p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground">{log.date}</span>
                <Badge variant="secondary" className="text-[10px]">
                  <Clock className="h-2 w-2 mr-1" />
                  {log.hoursWorked}h
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{log.summary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Photos - Enhanced with categories */}
      {portalSettings.showPhotos && (() => {
        const clientPhotos = jobPhotos.filter(p => 
          p.jobId === selectedJob.id && 
          p.sharedWithClient &&
          ((p.category === "Before" && portalSettings.showBeforePhotos) ||
           (p.category === "During" && portalSettings.showDuringPhotos) ||
           (p.category === "After" && portalSettings.showAfterPhotos) ||
           (p.category === "Completion" && portalSettings.showCompletionPhotos) ||
           (p.category === "Issue" && portalSettings.showIssuePhotos))
        );
        
        if (clientPhotos.length === 0) return null;
        
        return (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Progress Photos ({clientPhotos.length})</h3>
            <div className="flex gap-2 flex-wrap">
              {clientPhotos.slice(0, 6).map((photo) => (
                <div key={photo.id} className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center relative">
                  <Camera className="h-5 w-5 text-muted-foreground" />
                  <Badge className={`absolute -top-1 -right-1 text-[7px] px-1 py-0 ${categoryColors[photo.category]}`}>
                    {photo.category.slice(0, 3)}
                  </Badge>
                </div>
              ))}
              {clientPhotos.length > 6 && (
                <div className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">+{clientPhotos.length - 6}</span>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* Upcoming Visits */}
      <div className="p-3 bg-info/10 rounded-lg border border-info/30">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
          <Users className="h-4 w-4 text-info" />
          Upcoming Visit
        </h3>
        <p className="text-xs text-muted-foreground">
          Next visit: <strong className="text-foreground">Tomorrow, 8:00 AM</strong>
        </p>
      </div>

      {/* Contact */}
      {portalSettings.allowMessages && (
        <Button className="w-full touch-feedback">
          <Mail className="h-4 w-4 mr-2" />
          Send Message
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-foreground">Client Portal</h1>
        <p className="text-sm text-muted-foreground">Share progress with clients - no login required</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {/* Job Selector */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Select Job</h3>
          <div className="space-y-2">
            {activeJobs.map((job) => (
              <Card 
                key={job.id}
                className={cn(
                  "cursor-pointer transition-all touch-feedback",
                  selectedJob.id === job.id 
                    ? "ring-2 ring-elec-yellow bg-elec-yellow/5" 
                    : "hover:bg-muted/50"
                )}
                onClick={() => setSelectedJob(job)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-medium text-foreground text-sm truncate">{job.title}</h4>
                      <p className="text-xs text-muted-foreground truncate">{job.client}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant={job.status === "Active" ? "default" : "secondary"} className="text-[10px]">
                        {job.progress}%
                      </Badge>
                      {isMobile && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Portal Configuration */}
        <div className="md:col-span-2 space-y-4">
          {/* Portal Link */}
          <Card className="bg-elec-gray">
            <CardHeader className="pb-2 p-3 md:p-4">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Link2 className="h-4 w-4 md:h-5 md:w-5 text-elec-yellow" />
                Portal Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-3 md:p-4 pt-0">
              <div className="flex gap-2">
                <Input 
                  value={`https://portal.elec-mate.uk/job/${selectedJob.id}?token=abc123xyz`}
                  readOnly
                  className="bg-muted text-xs"
                />
                <Button variant="outline" size="icon" onClick={handleCopyLink} className="flex-shrink-0 touch-feedback">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleRefreshLink} className="flex-shrink-0 touch-feedback">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleSendEmail} className="flex-1 touch-feedback">
                  <Mail className="h-4 w-4 mr-2" />
                  Email to Client
                </Button>
                {isMobile ? (
                  <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="flex-1 touch-feedback">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[85vh] p-0">
                      <SheetHeader className="p-4 border-b border-border">
                        <SheetTitle>Client View Preview</SheetTitle>
                      </SheetHeader>
                      <ScrollArea className="h-[calc(85vh-60px)] p-4">
                        <PortalPreview />
                      </ScrollArea>
                    </SheetContent>
                  </Sheet>
                ) : (
                  <Button variant="outline" className="flex-1 touch-feedback">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Preview
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Portal Settings */}
          <Card className="bg-elec-gray">
            <CardHeader className="pb-2 p-3 md:p-4">
              <CardTitle className="text-sm md:text-base flex items-center gap-2">
                <Settings className="h-4 w-4 md:h-5 md:w-5 text-elec-yellow" />
                Portal Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(portalSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <span className="text-xs md:text-sm capitalize text-foreground">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <Switch 
                      checked={value}
                      onCheckedChange={(checked) => 
                        setPortalSettings(prev => ({ ...prev, [key]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Photo Category Controls */}
          {portalSettings.showPhotos && (
            <Card className="bg-elec-gray">
              <CardHeader className="pb-2 p-3 md:p-4">
                <CardTitle className="text-sm md:text-base flex items-center gap-2">
                  <Camera className="h-4 w-4 md:h-5 md:w-5 text-elec-yellow" />
                  Photo Sharing by Category
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 md:p-4 pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(['Before', 'During', 'After', 'Completion', 'Issue'] as PhotoCategory[]).map((category) => {
                    const key = `show${category}Photos` as keyof typeof portalSettings;
                    const count = jobPhotos.filter(p => p.jobId === selectedJob.id && p.category === category && p.sharedWithClient).length;
                    return (
                      <div key={category} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Badge className={`text-[10px] ${categoryColors[category]}`}>{category}</Badge>
                          <span className="text-xs text-muted-foreground">({count} shared)</span>
                        </div>
                        <Switch 
                          checked={portalSettings[key] as boolean}
                          onCheckedChange={(checked) => 
                            setPortalSettings(prev => ({ ...prev, [key]: checked }))
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Preview - Desktop only */}
          {!isMobile && (
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
        </div>
      </div>
    </div>
  );
}

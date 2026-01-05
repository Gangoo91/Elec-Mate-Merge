import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Hammer
} from "lucide-react";
import { progressLogs, jobs, employees, jobPhotos, PhotoCategory } from "@/data/employerMockData";
import { getPhotosByIds } from "@/services/photoService";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { PhotoViewer } from "@/components/employer/PhotoViewer";

import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { SwipeableRow } from "@/components/ui/swipeable-row";
import { MobileBottomSheet } from "@/components/mobile/MobileBottomSheet";
import { toast } from "@/hooks/use-toast";
import { ViewProgressLogSheet } from "@/components/employer/sheets/ViewProgressLogSheet";

const categoryColors: Record<PhotoCategory, string> = {
  Before: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  During: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  After: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Completion: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Issue: "bg-red-500/20 text-red-400 border-red-500/30"
};

export function ProgressLogsSection() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedLogPhotos, setSelectedLogPhotos] = useState<typeof jobPhotos>([]);
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  const handleRefresh = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: "Logs refreshed" });
  }, []);

  // Updated to use photoIds for filtering
  const handleOpenPhotoViewer = (logId: string, photoIds: string[], startIndex: number = 0) => {
    const photos = getPhotosByIds(photoIds);
    setSelectedLogPhotos(photos);
    setCurrentPhotoIndex(startIndex);
    setViewerOpen(true);
  };

  const handleSignOff = (logId: string) => {
    toast({ title: "Log signed off successfully" });
  };

  const handleCall = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    toast({ title: `Calling ${employee?.name || "worker"}...` });
  };

  const handleViewFullLog = (logId: string) => {
    setSelectedLogId(logId);
  };

  const handleMessageWorker = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    toast({ title: `Opening message to ${employee?.name || "worker"}...` });
  };

  const filteredLogs = progressLogs.filter(log => {
    const matchesSearch = 
      log.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesJob = selectedJobs.length === 0 || selectedJobs.includes(log.jobId);
    return matchesSearch && matchesJob;
  });

  const uniqueJobs = [...new Set(progressLogs.map(l => l.jobId))].map(id => 
    jobs.find(j => j.id === id)
  ).filter(Boolean);

  const jobOptions = uniqueJobs.map(job => ({
    value: job!.id,
    label: job!.title,
    count: progressLogs.filter(l => l.jobId === job!.id).length
  }));

  const totalMaterialsCost = progressLogs.reduce((sum, log) => 
    sum + log.materialsUsed.reduce((s, m) => s + m.cost, 0), 0
  );

  const totalHours = progressLogs.reduce((sum, log) => sum + log.hoursWorked, 0);

  const selectedLog = selectedLogId ? progressLogs.find(l => l.id === selectedLogId) : null;

  const content = (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Daily Progress Logs</h1>
          <p className="text-sm text-foreground/70">Track work completed, materials used, and issues</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full bg-elec-gray h-12 text-foreground"
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
                <p className="text-2xl font-bold text-foreground">{progressLogs.length}</p>
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
                <p className="text-2xl font-bold text-foreground">{totalHours}h</p>
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
                <p className="text-2xl font-bold text-foreground">£{totalMaterialsCost}</p>
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
                  {progressLogs.filter(l => l.signedOff).length}
                </p>
                <p className="text-xs text-foreground/70">Signed Off</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success opacity-70" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Filter Pills - Scrollable horizontal on mobile */}
      {!isMobile && (
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
      {isMobile && (
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

      {/* Progress Logs */}
      <div className="space-y-3">
        {filteredLogs.map((log) => {
          const isExpanded = expandedLog === log.id;
          const employee = employees.find(e => e.id === log.employeeId);
          // Use photoIds for filtering instead of jobId
          const logJobPhotos = log.photoIds ? getPhotosByIds(log.photoIds) : [];

          const logCard = (
            <Card key={log.id} className="bg-elec-gray overflow-hidden border-border/50">
              <CardContent className="p-0">
                {/* Header Row - Full width touch target */}
                <div 
                  className="p-4 cursor-pointer active:bg-muted/50 transition-colors touch-feedback"
                  onClick={() => setExpandedLog(isExpanded ? null : log.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Larger Avatar */}
                    <div className="w-14 h-14 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 border-2 border-elec-yellow/30">
                      {employee?.photo ? (
                        <img 
                          src={employee.photo} 
                          alt={employee.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-bold text-elec-yellow">
                          {employee?.avatar || log.employeeName.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="font-semibold text-foreground text-base">{log.employeeName}</h4>
                        {log.signedOff ? (
                          <Badge className="bg-success/20 text-success text-xs px-2">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Done
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs px-2 bg-warning/20 text-warning">Pending</Badge>
                        )}
                      </div>
                      
                      {/* Summary - WHITE text */}
                      <p className="text-sm text-foreground leading-relaxed line-clamp-2">
                        {log.summary}
                      </p>
                      
                      {/* Metadata - Lighter but still visible */}
                      <div className="flex items-center gap-4 mt-3 text-xs text-foreground/70 flex-wrap">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {log.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {log.hoursWorked}h
                        </span>
                        {logJobPhotos.length > 0 && (
                          <span className="flex items-center gap-1.5 text-elec-yellow">
                            <Camera className="h-3.5 w-3.5" />
                            {logJobPhotos.length} photos
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Expand button - Larger touch target */}
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
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Hammer className="h-4 w-4 text-elec-yellow" />
                        <h5 className="text-sm font-semibold text-foreground">Work Completed</h5>
                      </div>
                      <ul className="space-y-2">
                        {log.workCompleted.map((work, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            <span>{work}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Materials Used */}
                    {log.materialsUsed.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Package className="h-4 w-4 text-elec-yellow" />
                          <h5 className="text-sm font-semibold text-foreground">Materials Used</h5>
                        </div>
                        <div className="bg-elec-gray rounded-lg overflow-hidden border border-border/50">
                          <div className="divide-y divide-border/50">
                            {log.materialsUsed.map((material, i) => (
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
                                £{log.materialsUsed.reduce((s, m) => s + m.cost, 0)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Photos - Larger thumbnails for mobile */}
                    {logJobPhotos.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Camera className="h-4 w-4 text-elec-yellow" />
                            <h5 className="text-sm font-semibold text-foreground">Photos ({logJobPhotos.length})</h5>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-10 text-sm gap-2 text-elec-yellow"
                            onClick={() => handleOpenPhotoViewer(log.id, log.photoIds || [])}
                          >
                            <Eye className="h-4 w-4" />
                            View All
                          </Button>
                        </div>
                        {/* 3-column grid on mobile for larger thumbnails */}
                        <div className={cn(
                          "grid gap-3",
                          isMobile ? "grid-cols-3" : "grid-cols-4"
                        )}>
                          {logJobPhotos.slice(0, isMobile ? 3 : 4).map((photo, i) => (
                            <div 
                              key={photo.id} 
                              className="aspect-square bg-muted/50 rounded-xl flex items-center justify-center relative cursor-pointer hover:ring-2 ring-elec-yellow/50 transition-all touch-feedback border border-border/30"
                              onClick={() => handleOpenPhotoViewer(log.id, log.photoIds || [], i)}
                            >
                              <Camera className="h-8 w-8 text-foreground/40" />
                              <Badge 
                                className={`absolute -top-1.5 -right-1.5 text-[9px] px-1.5 py-0.5 ${categoryColors[photo.category]}`}
                              >
                                {photo.category.slice(0, 3)}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions - Full width stacked buttons on mobile */}
                    <div className="flex flex-col gap-3 pt-2">
                      {!log.signedOff && (
                        <Button 
                          size="lg" 
                          className="w-full touch-feedback h-14 text-base font-semibold"
                          onClick={() => handleSignOff(log.id)}
                        >
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Sign Off Log
                        </Button>
                      )}
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="w-full touch-feedback h-12"
                          onClick={() => handleViewFullLog(log.id)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Full
                        </Button>
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="w-full touch-feedback h-12"
                          onClick={() => handleMessageWorker(log.employeeId)}
                        >
                          <User className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );

          // Wrap with swipeable on mobile
          if (isMobile && !log.signedOff) {
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
                  onClick: () => handleCall(log.employeeId)
                }}
              >
                {logCard}
              </SwipeableRow>
            );
          }

          return logCard;
        })}
      </div>

      {/* Photo Viewer */}
      <PhotoViewer
        photos={selectedLogPhotos}
        currentIndex={currentPhotoIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onNavigate={setCurrentPhotoIndex}
      />

      {/* Full Log Sheet */}
      {selectedLog && (
        <ViewProgressLogSheet
          log={selectedLog}
          employee={employees.find(e => e.id === selectedLog.employeeId)}
          photos={selectedLog.photoIds ? getPhotosByIds(selectedLog.photoIds) : []}
          isOpen={!!selectedLogId}
          onClose={() => setSelectedLogId(null)}
          onSignOff={() => handleSignOff(selectedLog.id)}
          onMessage={() => handleMessageWorker(selectedLog.employeeId)}
          onCall={() => handleCall(selectedLog.employeeId)}
        />
      )}
    </div>
  );

  return isMobile ? (
    <PullToRefresh onRefresh={handleRefresh} className="h-full">
      {content}
    </PullToRefresh>
  ) : content;
}

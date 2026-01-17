import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FeatureTile } from "@/components/employer/FeatureTile";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { QuickStats } from "@/components/employer/QuickStats";
import { ToolboxTalkLibrary } from "@/components/employer/ToolboxTalkLibrary";
import { BriefingEditor } from "@/components/employer/BriefingEditor";
import { DigitalSignOff } from "@/components/employer/DigitalSignOff";
import { BriefingViewer } from "@/components/employer/BriefingViewer";
import { downloadBriefingPDF } from "@/utils/briefing-pdf";
import {
  useBriefings,
  useBriefingStats,
  useCreateBriefing,
  useCreateBriefingFromTemplate,
  useCompleteBriefing,
  useDeleteBriefing,
  type Briefing,
  type BriefingType,
} from "@/hooks/useBriefings";
import { useBriefingAttendees } from "@/hooks/useBriefingSignatures";
import { type ToolboxTalkTemplate } from "@/hooks/useToolboxTalkTemplates";
import { useEmployees } from "@/hooks/useEmployees";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Plus,
  Calendar,
  ClipboardCheck,
  QrCode,
  FileText,
  Search,
  CheckCircle2,
  UserCheck,
  Loader2,
  RefreshCw,
  AlertTriangle,
  Trash2,
  Clock,
  MapPin,
  BookOpen,
  PenTool,
  Eye,
  Download,
  Edit3,
} from "lucide-react";

const statusColors: Record<string, string> = {
  "Scheduled": "bg-yellow-500/20 text-yellow-400",
  "Completed": "bg-green-500/20 text-green-400",
  "Cancelled": "bg-red-500/20 text-red-400",
};

const briefingTypes: BriefingType[] = [
  "Toolbox Talk",
  "Site Induction",
  "Safety Briefing",
  "Method Statement",
  "Emergency Procedures",
  "PPE Reminder"
];

export function BriefingsSection() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewBriefing, setShowNewBriefing] = useState(false);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [selectedBriefingId, setSelectedBriefingId] = useState<string | null>(null);
  const [showViewer, setShowViewer] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showSignOff, setShowSignOff] = useState(false);
  const [selectedBriefing, setSelectedBriefing] = useState<Briefing | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [briefingType, setBriefingType] = useState<BriefingType>("Toolbox Talk");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [presenter, setPresenter] = useState("");
  const [content, setContent] = useState("");

  // Hooks
  const { data: briefings, isLoading, error, refetch } = useBriefings();
  const { data: stats } = useBriefingStats();
  const { data: employees } = useEmployees();
  const { companyProfile } = useCompanyProfile();
  const createBriefing = useCreateBriefing();
  const createFromTemplate = useCreateBriefingFromTemplate();
  const completeBriefing = useCompleteBriefing();
  const deleteBriefing = useDeleteBriefing();
  const { data: attendees } = useBriefingAttendees(selectedBriefingId || undefined);

  // Filter by search
  const filteredBriefings = briefings?.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.briefing_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.location?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const scheduledBriefings = filteredBriefings.filter(b => b.status === "Scheduled");
  const completedBriefings = filteredBriefings.filter(b => b.status === "Completed");

  const handleCreateBriefing = async () => {
    if (!title || !date) return;

    await createBriefing.mutateAsync({
      title,
      briefing_type: briefingType,
      date,
      time: time || undefined,
      location: location || undefined,
      presenter: presenter || undefined,
      content: content || undefined,
      status: "Scheduled",
    });

    // Reset form
    setTitle("");
    setBriefingType("Toolbox Talk");
    setDate("");
    setTime("");
    setLocation("");
    setPresenter("");
    setContent("");
    setShowNewBriefing(false);
  };

  const handleComplete = async (briefing: Briefing) => {
    await completeBriefing.mutateAsync(briefing.id);
  };

  const handleDelete = async (id: string) => {
    await deleteBriefing.mutateAsync(id);
  };

  // Handle selecting a template from the library
  const handleSelectTemplate = async (template: ToolboxTalkTemplate) => {
    // Set today's date as default
    const today = new Date().toISOString().split("T")[0];

    await createFromTemplate.mutateAsync({
      templateId: template.id,
      date: today,
    });

    setShowTemplateLibrary(false);
  };

  // Handle viewing a briefing
  const handleViewBriefing = (briefing: Briefing) => {
    setSelectedBriefingId(briefing.id);
    setSelectedBriefing(briefing);
    setShowViewer(true);
  };

  // Handle editing a briefing
  const handleEditBriefing = (briefing: Briefing) => {
    setSelectedBriefing(briefing);
    setShowViewer(false);
    setShowEditor(true);
  };

  // Handle sign-off
  const handleSignOff = (briefing: Briefing) => {
    setSelectedBriefing(briefing);
    setShowViewer(false);
    setShowSignOff(true);
  };

  // Handle PDF export
  const handleExportPdf = async (briefing: Briefing) => {
    try {
      await downloadBriefingPDF({
        briefing,
        attendees: attendees || [],
        companyName: companyProfile?.company_name || "Your Company"
      });
      toast({
        title: "PDF exported",
        description: "Briefing document has been downloaded.",
      });
    } catch {
      toast({
        title: "Export failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <p className="text-muted-foreground">Failed to load briefings</p>
        <Button onClick={() => refetch()} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SectionHeader
          title="Safety Briefings"
          description="Toolbox talks, inductions, and safety briefings"
        />

        <Sheet open={showNewBriefing} onOpenChange={setShowNewBriefing}>
          <SheetTrigger asChild>
            <Button className="gap-2 h-11 touch-manipulation">
              <Plus className="h-4 w-4" />
              New Briefing
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
            <div className="flex flex-col h-full bg-background">
              <SheetHeader className="p-4 border-b border-border">
                <SheetTitle>Schedule Briefing</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    placeholder="e.g. Weekly Safety Briefing..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Briefing Type</Label>
                  <Select value={briefingType} onValueChange={(v) => setBriefingType(v as BriefingType)}>
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      {briefingTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="h-11 touch-manipulation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="h-11 touch-manipulation"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    placeholder="Site address or meeting point..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Presenter</Label>
                  <Select value={presenter} onValueChange={setPresenter}>
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue placeholder="Select presenter..." />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      {employees?.map(emp => (
                        <SelectItem key={emp.id} value={emp.name}>{emp.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Content / Agenda</Label>
                  <Textarea
                    placeholder="Briefing content or discussion points..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[100px] touch-manipulation"
                  />
                </div>
              </div>

              <div className="p-4 border-t border-border bg-background">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewBriefing(false)}
                    className="flex-1 h-11 touch-manipulation"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateBriefing}
                    disabled={!title || !date || createBriefing.isPending}
                    className="flex-1 h-11 touch-manipulation"
                  >
                    {createBriefing.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Schedule"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search */}
      <div className="relative">
        {!searchQuery && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        )}
        <Input
          placeholder="Search briefings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn("h-11 touch-manipulation", !searchQuery && "pl-9")}
        />
      </div>

      {/* Quick Stats */}
      <QuickStats
        stats={[
          {
            icon: CheckCircle2,
            value: isLoading ? "-" : (stats?.completed || 0),
            label: "Completed",
            color: "green",
          },
          {
            icon: Calendar,
            value: isLoading ? "-" : (stats?.scheduled || 0),
            label: "Scheduled",
            color: "yellow",
            pulse: (stats?.scheduled || 0) > 0,
          },
          {
            icon: UserCheck,
            value: isLoading ? "-" : (stats?.avgAttendance || 100),
            label: "Attendance",
            color: "blue",
            suffix: "%",
          },
        ]}
      />

      {/* Quick Actions */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <FeatureTile
            icon={Plus}
            title="New Briefing"
            description="Schedule a briefing"
            onClick={() => setShowNewBriefing(true)}
            compact
          />
          <FeatureTile
            icon={BookOpen}
            title="Template Library"
            description="50+ toolbox talks"
            onClick={() => setShowTemplateLibrary(true)}
            compact
          />
          <FeatureTile
            icon={PenTool}
            title="Sign-off Sheet"
            description="Digital signatures"
            onClick={() => {
              if (scheduledBriefings.length > 0) {
                handleSignOff(scheduledBriefings[0]);
              } else {
                toast({
                  title: "No scheduled briefings",
                  description: "Schedule a briefing first to use sign-off.",
                });
              }
            }}
            compact
          />
          <FeatureTile
            icon={Download}
            title="Export PDF"
            description="Download reports"
            onClick={() => {
              if (completedBriefings.length > 0) {
                setSelectedBriefingId(completedBriefings[0].id);
                handleExportPdf(completedBriefings[0]);
              } else {
                toast({
                  title: "No completed briefings",
                  description: "Complete a briefing first to export.",
                });
              }
            }}
            compact
          />
        </div>
      </div>

      {/* Upcoming Briefings */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-warning rounded-full"></span>
          Upcoming
        </h2>

        {isLoading ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <Card key={i} className="bg-elec-gray border-border">
                <CardContent className="p-4">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : scheduledBriefings.length === 0 ? (
          <Card className="bg-elec-gray border-border">
            <CardContent className="p-6 text-center">
              <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No upcoming briefings scheduled</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNewBriefing(true)}
                className="mt-3 gap-2"
              >
                <Plus className="h-4 w-4" />
                Schedule One
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {scheduledBriefings.map((briefing) => (
              <Card key={briefing.id} className="hover:bg-muted/50 transition-colors border-l-4 border-l-warning">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-lg bg-warning/10">
                        <Calendar className="h-4 w-4 text-warning" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm md:text-base truncate">{briefing.title}</p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
                          {briefing.briefing_type && (
                            <Badge variant="outline" className="text-xs">{briefing.briefing_type}</Badge>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(briefing.date).toLocaleDateString("en-GB")}
                            {briefing.time && ` at ${briefing.time.slice(0, 5)}`}
                          </span>
                        </div>
                        {briefing.location && (
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {briefing.location}
                          </p>
                        )}
                        {briefing.attendee_count !== undefined && briefing.attendee_count > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {briefing.attendee_count} team members invited
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={statusColors["Scheduled"]}>
                        Scheduled
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleViewBriefing(briefing)}
                          className="h-8 w-8 p-0 touch-manipulation"
                          title="View"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditBriefing(briefing)}
                          className="h-8 w-8 p-0 touch-manipulation"
                          title="Edit"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSignOff(briefing)}
                          className="h-8 text-xs touch-manipulation bg-blue-500/10 border-blue-500/30 text-blue-400"
                        >
                          <PenTool className="h-3 w-3 mr-1" />
                          Sign-off
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleComplete(briefing)}
                          disabled={completeBriefing.isPending}
                          className="h-8 text-xs touch-manipulation"
                        >
                          {completeBriefing.isPending ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <>
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Complete
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(briefing.id)}
                          disabled={deleteBriefing.isPending}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive touch-manipulation"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recent Briefings */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-success rounded-full"></span>
          Recent Briefings
        </h2>

        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-elec-gray border-border">
                <CardContent className="p-4">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : completedBriefings.length === 0 ? (
          <Card className="bg-elec-gray border-border">
            <CardContent className="p-6 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No completed briefings yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {completedBriefings.slice(0, 10).map((briefing) => {
              const attendancePercent = briefing.attendee_count && briefing.attendee_count > 0
                ? Math.round((briefing.acknowledged_count || 0) / briefing.attendee_count * 100)
                : 100;

              return (
                <Card key={briefing.id} className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 rounded-lg bg-success/10">
                          <Users className="h-4 w-4 text-success" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm md:text-base truncate">{briefing.title}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
                            {briefing.briefing_type && (
                              <Badge variant="outline" className="text-xs">{briefing.briefing_type}</Badge>
                            )}
                            <span>{new Date(briefing.date).toLocaleDateString("en-GB")}</span>
                          </div>
                          {briefing.attendee_count !== undefined && briefing.attendee_count > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {briefing.acknowledged_count || 0}/{briefing.attendee_count} attended
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={statusColors["Completed"]}>
                          {briefing.attendee_count && briefing.attendee_count > 0
                            ? `${attendancePercent}%`
                            : "Complete"}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewBriefing(briefing)}
                            className="h-8 w-8 p-0 touch-manipulation"
                            title="View"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedBriefingId(briefing.id);
                              handleExportPdf(briefing);
                            }}
                            className="h-8 w-8 p-0 touch-manipulation"
                            title="Export PDF"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(briefing.id)}
                            disabled={deleteBriefing.isPending}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive touch-manipulation"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Template Library Sheet */}
      <Sheet open={showTemplateLibrary} onOpenChange={setShowTemplateLibrary}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 border-b border-border shrink-0">
              <SheetTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-elec-yellow" />
                Toolbox Talk Templates
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto p-4">
              <ToolboxTalkLibrary
                onSelectTemplate={handleSelectTemplate}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Briefing Viewer */}
      {selectedBriefingId && (
        <BriefingViewer
          open={showViewer}
          onOpenChange={(open) => {
            setShowViewer(open);
            if (!open) {
              setSelectedBriefingId(null);
              setSelectedBriefing(null);
            }
          }}
          briefingId={selectedBriefingId}
          onEdit={handleEditBriefing}
          onSignOff={handleSignOff}
          onExportPdf={handleExportPdf}
        />
      )}

      {/* Briefing Editor */}
      {selectedBriefing && (
        <BriefingEditor
          open={showEditor}
          onOpenChange={(open) => {
            setShowEditor(open);
            if (!open) {
              setSelectedBriefing(null);
            }
          }}
          briefing={selectedBriefing}
          onSaved={() => {
            refetch();
          }}
        />
      )}

      {/* Digital Sign-Off */}
      {selectedBriefing && (
        <DigitalSignOff
          open={showSignOff}
          onOpenChange={(open) => {
            setShowSignOff(open);
            if (!open) {
              setSelectedBriefing(null);
            }
          }}
          briefing={selectedBriefing}
          onComplete={() => {
            refetch();
          }}
        />
      )}
    </div>
  );
}

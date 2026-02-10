import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Users,
  Calendar,
  Clock,
  MapPin,
  User,
  AlertTriangle,
  CheckCircle2,
  X,
  Download,
  Edit3,
  PenTool,
  Image,
  Share2,
  QrCode,
  Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBriefingWithAttendees, type Briefing } from "@/hooks/useBriefings";
import { generateBriefingQRData } from "@/hooks/useBriefingSignatures";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface BriefingViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefingId: string;
  onEdit?: (briefing: Briefing) => void;
  onSignOff?: (briefing: Briefing) => void;
  onExportPdf?: (briefing: Briefing) => void;
}

export function BriefingViewer({
  open,
  onOpenChange,
  briefingId,
  onEdit,
  onSignOff,
  onExportPdf,
}: BriefingViewerProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("content");

  const { data: briefing, isLoading } = useBriefingWithAttendees(briefingId);

  // Copy QR link to clipboard
  const handleCopyLink = () => {
    if (!briefing) return;
    const link = generateBriefingQRData(briefing.id);
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied",
      description: "Sign-off link copied to clipboard.",
    });
  };

  if (isLoading) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0">
          <div className="p-4 space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (!briefing) {
    return null;
  }

  // Calculate stats
  const signed = briefing.attendees?.filter(a => a.acknowledged).length || 0;
  const total = briefing.attendees?.length || 0;
  const completionRate = total > 0 ? Math.round((signed / total) * 100) : 0;

  // Get risk level styling
  const riskColour = briefing.risk_level === "high"
    ? "text-red-400 border-red-500/50 bg-red-500/10"
    : briefing.risk_level === "medium"
    ? "text-amber-400 border-amber-500/50 bg-amber-500/10"
    : "text-green-400 border-green-500/50 bg-green-500/10";

  // Get status styling
  const statusColour = briefing.status === "Completed"
    ? "bg-green-500/10 text-green-400 border-green-500/30"
    : briefing.status === "Scheduled"
    ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
    : "bg-muted text-muted-foreground";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 pb-3 border-b border-border shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-xl", riskColour)}>
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <SheetTitle className="text-left line-clamp-1">{briefing.title}</SheetTitle>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="outline" className={cn("text-xs", statusColour)}>
                      {briefing.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {briefing.briefing_type || "Briefing"}
                    </Badge>
                    {briefing.risk_level && (
                      <Badge variant="outline" className={cn("text-xs", riskColour)}>
                        {briefing.risk_level === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {briefing.risk_level.charAt(0).toUpperCase() + briefing.risk_level.slice(1)} Risk
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="shrink-0 touch-manipulation"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          {/* Info Bar */}
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex flex-wrap gap-4 text-sm">
              {briefing.date && (
                <span className="flex items-center gap-1.5 text-muted-foreground min-w-0">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span className="truncate">{format(new Date(briefing.date), "dd MMM yyyy")}</span>
                </span>
              )}
              {briefing.time && (
                <span className="flex items-center gap-1.5 text-muted-foreground min-w-0">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span className="truncate">{briefing.time}</span>
                </span>
              )}
              {briefing.location && (
                <span className="flex items-center gap-1.5 text-muted-foreground min-w-0">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="truncate">{briefing.location}</span>
                </span>
              )}
              {briefing.presenter && (
                <span className="flex items-center gap-1.5 text-muted-foreground min-w-0">
                  <User className="h-4 w-4 shrink-0" />
                  <span className="truncate">{briefing.presenter}</span>
                </span>
              )}
              {briefing.duration_minutes && (
                <span className="flex items-center gap-1.5 text-muted-foreground min-w-0">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span className="truncate">{briefing.duration_minutes} min</span>
                </span>
              )}
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="mx-4 mt-4 grid grid-cols-3">
              <TabsTrigger value="content" className="text-xs h-11 touch-manipulation">
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                Content
              </TabsTrigger>
              <TabsTrigger value="attendees" className="text-xs h-11 touch-manipulation">
                <Users className="h-3.5 w-3.5 mr-1.5" />
                Attendees ({total})
              </TabsTrigger>
              <TabsTrigger value="photos" className="text-xs h-11 touch-manipulation">
                <Image className="h-3.5 w-3.5 mr-1.5" />
                Photos
              </TabsTrigger>
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content" className="flex-1 overflow-hidden mt-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  {briefing.content ? (
                    <div
                      className="prose prose-sm prose-invert max-w-none [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-base [&_h3]:font-medium [&_h3]:mt-3 [&_h3]:mb-2 [&_p]:mb-2 [&_ul]:mb-3 [&_li]:mb-1 [&_table]:w-full [&_td]:py-1 [&_td]:px-2 [&_th]:py-1 [&_th]:px-2 [&_th]:text-left [&_th]:font-medium [&_tr]:border-b [&_tr]:border-border/50"
                      dangerouslySetInnerHTML={{ __html: briefing.content }}
                    />
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">No content added yet</p>
                      {onEdit && (
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => onEdit(briefing)}
                        >
                          <Edit3 className="h-4 w-4 mr-2" />
                          Add Content
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Presenter Signature */}
                  {briefing.presenter_signature_url && (
                    <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
                      <p className="text-sm font-medium text-foreground mb-2">Presenter Signature</p>
                      <img
                        src={briefing.presenter_signature_url}
                        alt="Presenter signature"
                        className="h-16 object-contain"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        {briefing.presenter || "Presenter"}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Attendees Tab */}
            <TabsContent value="attendees" className="flex-1 overflow-hidden mt-0">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-muted/50 text-center">
                      <p className="text-xl font-bold text-foreground">{total}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 text-center">
                      <p className="text-xl font-bold text-green-400">{signed}</p>
                      <p className="text-xs text-muted-foreground">Signed</p>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-500/10 text-center">
                      <p className="text-xl font-bold text-amber-400">{total - signed}</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completion</span>
                      <span className="font-medium">{completionRate}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Attendee List */}
                  <div className="space-y-2">
                    {briefing.attendees?.map((attendee) => (
                      <div
                        key={attendee.id}
                        className={cn(
                          "p-3 rounded-lg border",
                          attendee.acknowledged
                            ? "bg-green-500/5 border-green-500/20"
                            : "bg-muted/50 border-border"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "p-2 rounded-lg",
                              attendee.acknowledged ? "bg-green-500/10" : "bg-muted"
                            )}>
                              {attendee.acknowledged ? (
                                <CheckCircle2 className="h-4 w-4 text-green-400" />
                              ) : (
                                <Clock className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-sm text-foreground">
                                {attendee.employee?.name || attendee.guest_name || "Unknown"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {attendee.guest_company && `${attendee.guest_company} • `}
                                {attendee.acknowledged && attendee.acknowledged_at
                                  ? `Signed ${format(new Date(attendee.acknowledged_at), "HH:mm")} via ${attendee.signed_via || "manual"}`
                                  : "Pending"}
                              </p>
                            </div>
                          </div>
                          {attendee.signature_url && (
                            <img
                              src={attendee.signature_url}
                              alt="Signature"
                              className="h-10 w-16 object-contain opacity-70"
                            />
                          )}
                        </div>
                      </div>
                    ))}

                    {(!briefing.attendees || briefing.attendees.length === 0) && (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground">No attendees added yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos" className="flex-1 overflow-hidden mt-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  {briefing.photo_evidence && briefing.photo_evidence.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {briefing.photo_evidence.map((photo, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-lg overflow-hidden border border-border"
                        >
                          <img
                            src={photo}
                            alt={`Photo evidence ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">No photos added yet</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border shrink-0">
            <div className="flex gap-2 mb-3">
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="flex-1 h-11 touch-manipulation"
              >
                <Copy className="h-4 w-4 mr-1.5" />
                Copy Link
              </Button>
              {onEdit && (
                <Button
                  variant="outline"
                  onClick={() => onEdit(briefing)}
                  className="flex-1 h-11 touch-manipulation"
                >
                  <Edit3 className="h-4 w-4 mr-1.5" />
                  Edit
                </Button>
              )}
            </div>
            <div className="flex gap-3">
              {onSignOff && briefing.status === "Scheduled" && (
                <Button
                  onClick={() => onSignOff(briefing)}
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 touch-manipulation"
                >
                  <PenTool className="h-4 w-4 mr-2" />
                  Sign-Off
                </Button>
              )}
              {onExportPdf && (
                <Button
                  onClick={() => onExportPdf(briefing)}
                  className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

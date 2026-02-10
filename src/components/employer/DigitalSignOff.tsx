import { useState, useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SignatureCapture } from "@/components/ui/signature-capture";
import {
  PenTool,
  Users,
  CheckCircle2,
  Clock,
  X,
  ChevronRight,
  UserPlus,
  Building2,
  AlertTriangle,
  Loader2,
  MapPin,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useBriefingAttendees,
  useSignOffAttendee,
  useUploadSignature,
  useAddBriefingAttendee,
  type BriefingAttendee,
} from "@/hooks/useBriefingSignatures";
import { type Briefing } from "@/hooks/useBriefings";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface DigitalSignOffProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefing: Briefing;
  onComplete?: () => void;
}

type ViewMode = "list" | "sign" | "add-guest";

export function DigitalSignOff({
  open,
  onOpenChange,
  briefing,
  onComplete,
}: DigitalSignOffProps) {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedAttendee, setSelectedAttendee] = useState<BriefingAttendee | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestCompany, setGuestCompany] = useState("");
  const [captureLocation, setCaptureLocation] = useState(true);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const { data: attendees = [], isLoading } = useBriefingAttendees(briefing.id);
  const signOff = useSignOffAttendee();
  const uploadSignature = useUploadSignature();
  const addAttendee = useAddBriefingAttendee();

  // Get device info
  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    const platform = navigator.platform;
    return `${platform} - ${ua.substring(0, 100)}`;
  };

  // Request location
  const requestLocation = useCallback(() => {
    if (!captureLocation) return;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // Location denied or unavailable - continue without it
          setLocation(null);
        }
      );
    }
  }, [captureLocation]);

  // Handle selecting attendee to sign
  const handleSelectAttendee = (attendee: BriefingAttendee) => {
    setSelectedAttendee(attendee);
    setViewMode("sign");
    requestLocation();
  };

  // Handle signature capture
  const handleSignatureCapture = async (signatureData: string) => {
    if (!selectedAttendee || !signatureData) return;

    try {
      // Upload signature to storage
      const signatureBlob = await fetch(signatureData).then(r => r.blob());
      const signatureUrl = await uploadSignature.mutateAsync({
        briefingId: briefing.id,
        attendeeId: selectedAttendee.id,
        signatureBlob,
      });

      // Sign off the attendee
      await signOff.mutateAsync({
        id: selectedAttendee.id,
        signature_url: signatureUrl,
        signed_via: "manual",
        device_info: getDeviceInfo(),
        location_lat: location?.lat,
        location_lng: location?.lng,
      });

      // Reset and go back to list
      setSelectedAttendee(null);
      setViewMode("list");

      // Check if all attendees have signed
      const remaining = attendees.filter(a => !a.acknowledged && a.id !== selectedAttendee.id);
      if (remaining.length === 0) {
        toast({
          title: "All signed!",
          description: "All attendees have signed off on this briefing.",
        });
        onComplete?.();
      }
    } catch {
      // Error handled by mutation
    }
  };

  // Handle adding guest
  const handleAddGuest = async () => {
    if (!guestName.trim()) return;

    try {
      const newAttendee = await addAttendee.mutateAsync({
        briefing_id: briefing.id,
        guest_name: guestName.trim(),
        guest_company: guestCompany.trim() || undefined,
      });

      // Immediately select for signing
      setGuestName("");
      setGuestCompany("");
      setSelectedAttendee(newAttendee);
      setViewMode("sign");
      requestLocation();
    } catch {
      // Error handled by mutation
    }
  };

  // Calculate stats
  const signed = attendees.filter(a => a.acknowledged).length;
  const pending = attendees.filter(a => !a.acknowledged).length;
  const completionRate = attendees.length > 0
    ? Math.round((signed / attendees.length) * 100)
    : 0;

  // Get risk level styling
  const riskColour = briefing.risk_level === "high"
    ? "text-red-400 border-red-500/50"
    : briefing.risk_level === "medium"
    ? "text-amber-400 border-amber-500/50"
    : "text-green-400 border-green-500/50";

  if (isLoading) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0">
          <div className="p-4 space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 pb-3 border-b border-border shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10">
                  <PenTool className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <SheetTitle className="text-left">
                    {viewMode === "sign" ? "Sign Attendance" :
                     viewMode === "add-guest" ? "Add Guest" :
                     "Attendance Sign-Off"}
                  </SheetTitle>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {briefing.title}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (viewMode !== "list") {
                    setViewMode("list");
                    setSelectedAttendee(null);
                  } else {
                    onOpenChange(false);
                  }
                }}
                className="shrink-0 touch-manipulation"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          {viewMode === "list" && (
            <>
              {/* Stats Card */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {signed}/{attendees.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Signed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{completionRate}%</p>
                    <p className="text-sm text-muted-foreground">Complete</p>
                  </div>
                </div>

                {/* Briefing Info */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {briefing.briefing_type || "Briefing"}
                  </Badge>
                  {briefing.risk_level && (
                    <Badge variant="outline" className={cn("text-xs", riskColour)}>
                      {briefing.risk_level === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {briefing.risk_level.charAt(0).toUpperCase() + briefing.risk_level.slice(1)} Risk
                    </Badge>
                  )}
                  {briefing.date && (
                    <Badge variant="outline" className="text-xs">
                      {format(new Date(briefing.date), "dd MMM yyyy")}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Attendees List */}
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-2">
                  {/* Pending Section */}
                  {pending > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Pending ({pending})
                      </p>
                      <div className="space-y-2">
                        {attendees
                          .filter(a => !a.acknowledged)
                          .map((attendee) => (
                            <Button
                              key={attendee.id}
                              variant="outline"
                              className="w-full justify-between h-14 px-4"
                              onClick={() => handleSelectAttendee(attendee)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-amber-500/10">
                                  <Users className="h-4 w-4 text-amber-400" />
                                </div>
                                <div className="text-left">
                                  <p className="font-medium text-sm">
                                    {attendee.employee?.name || attendee.guest_name || "Unknown"}
                                  </p>
                                  {attendee.guest_company && (
                                    <p className="text-xs text-muted-foreground">
                                      {attendee.guest_company}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Signed Section */}
                  {signed > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-400" />
                        Signed ({signed})
                      </p>
                      <div className="space-y-2">
                        {attendees
                          .filter(a => a.acknowledged)
                          .map((attendee) => (
                            <div
                              key={attendee.id}
                              className="flex items-center justify-between p-4 rounded-lg bg-green-500/5 border border-green-500/20"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-green-500/10">
                                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                                </div>
                                <div>
                                  <p className="font-medium text-sm text-foreground">
                                    {attendee.employee?.name || attendee.guest_name || "Unknown"}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Signed {attendee.acknowledged_at
                                      ? format(new Date(attendee.acknowledged_at), "HH:mm")
                                      : ""}
                                    {attendee.signed_via && ` via ${attendee.signed_via}`}
                                  </p>
                                </div>
                              </div>
                              {attendee.signature_url && (
                                <img
                                  src={attendee.signature_url}
                                  alt="Signature"
                                  className="h-10 w-20 object-contain opacity-70"
                                />
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {attendees.length === 0 && (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium text-foreground mb-2">No Attendees</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add team members or guests to begin sign-off
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Footer */}
              <div className="p-4 border-t border-border shrink-0">
                <Button
                  onClick={() => setViewMode("add-guest")}
                  className="w-full h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Guest / Visitor
                </Button>
              </div>
            </>
          )}

          {viewMode === "sign" && selectedAttendee && (
            <>
              {/* Signing For */}
              <div className="p-4 border-b border-border">
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <p className="text-xs text-muted-foreground mb-1">Signing for</p>
                  <p className="text-lg font-semibold text-foreground">
                    {selectedAttendee.employee?.name || selectedAttendee.guest_name || "Unknown"}
                  </p>
                  {selectedAttendee.guest_company && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Building2 className="h-3 w-3" />
                      {selectedAttendee.guest_company}
                    </p>
                  )}
                </div>

                {/* Location & Device Info */}
                <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                  {location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-green-400" />
                      Location captured
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Smartphone className="h-3 w-3" />
                    {navigator.platform}
                  </span>
                </div>
              </div>

              {/* Signature Canvas */}
              <div className="flex-1 p-4">
                <SignatureCapture
                  onCapture={handleSignatureCapture}
                  onCancel={() => {
                    setViewMode("list");
                    setSelectedAttendee(null);
                  }}
                  height={200}
                  variant="dark"
                />

                {(signOff.isPending || uploadSignature.isPending) && (
                  <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving signature...
                  </div>
                )}
              </div>
            </>
          )}

          {viewMode === "add-guest" && (
            <>
              {/* Guest Form */}
              <div className="flex-1 p-4 space-y-4">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4">
                  <p className="text-sm text-foreground flex items-center gap-2">
                    <UserPlus className="h-4 w-4 text-amber-400" />
                    Add visitors, subcontractors, or guests who need to sign off
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    placeholder="Enter guest name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="h-11 touch-manipulation"
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <Label>Company (Optional)</Label>
                  <Input
                    placeholder="Enter company name"
                    value={guestCompany}
                    onChange={(e) => setGuestCompany(e.target.value)}
                    className="h-11 touch-manipulation"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border shrink-0">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setViewMode("list");
                      setGuestName("");
                      setGuestCompany("");
                    }}
                    className="flex-1 h-12"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddGuest}
                    disabled={!guestName.trim() || addAttendee.isPending}
                    className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  >
                    {addAttendee.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <PenTool className="h-4 w-4 mr-2" />
                    )}
                    Add & Sign
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

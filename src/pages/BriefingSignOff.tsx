import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileText,
  CheckCircle,
  Clock,
  Calendar,
  MapPin,
  User,
  Users,
  AlertTriangle,
  Loader2,
  PenTool,
  Building2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import SignaturePad from "@/components/forms/SignaturePad";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Briefing {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  briefing_type: string | null;
  date: string | null;
  time: string | null;
  location: string | null;
  presenter: string | null;
  status: string;
  risk_level: string | null;
  attendees: Array<{
    id: string;
    employee_id: string | null;
    acknowledged: boolean;
    acknowledged_at: string | null;
    signature_url: string | null;
    guest_name: string | null;
    guest_company: string | null;
    employee: {
      id: string;
      name: string;
    } | null;
  }>;
}

const BriefingSignOff = () => {
  const { briefingId } = useParams<{ briefingId: string }>();
  const [briefing, setBriefing] = useState<Briefing | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestCompany, setGuestCompany] = useState("");
  const [signatureData, setSignatureData] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const signaturePadRef = useRef<any>(null);

  useEffect(() => {
    if (briefingId) {
      loadBriefing();
    }
  }, [briefingId]);

  const loadBriefing = async () => {
    if (!briefingId) return;

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("briefings")
        .select(`
          *,
          attendees:briefing_attendees(
            id,
            employee_id,
            acknowledged,
            acknowledged_at,
            signature_url,
            guest_name,
            guest_company,
            employee:employer_employees(id, name)
          )
        `)
        .eq("id", briefingId)
        .single();

      if (error || !data) {
        throw new Error("Briefing not found");
      }

      setBriefing(data as Briefing);
    } catch (error) {
      console.error("Error loading briefing:", error);
      toast({
        title: "Error",
        description: "Briefing not found or has been removed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOff = async () => {
    if (!briefing) return;
    if (!signatureData) {
      toast({
        title: "Signature required",
        description: "Please provide your signature to sign off",
        variant: "destructive",
      });
      return;
    }

    // Validate guest info or selected attendee
    if (isGuest && !guestName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    if (!isGuest && !selectedAttendee) {
      toast({
        title: "Select your name",
        description: "Please select your name from the list or sign as a guest",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      // Upload signature
      const signatureBlob = dataURLtoBlob(signatureData);
      const fileName = `public-signatures/${briefing.id}/${Date.now()}.png`;

      const { error: uploadError } = await supabase.storage
        .from("visual-uploads")
        .upload(fileName, signatureBlob, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("visual-uploads")
        .getPublicUrl(fileName);

      // Get device info
      const deviceInfo = navigator.userAgent.substring(0, 200);

      // Get location if available
      let location: { lat?: number; lng?: number } = {};
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
        });
        location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      } catch {
        // Location not available - continue without it
      }

      if (isGuest) {
        // Create new attendee record for guest
        const { error: insertError } = await supabase
          .from("briefing_attendees")
          .insert({
            briefing_id: briefing.id,
            guest_name: guestName.trim(),
            guest_company: guestCompany.trim() || null,
            acknowledged: true,
            acknowledged_at: new Date().toISOString(),
            signature_url: publicUrl,
            signed_via: "qr_code",
            device_info: deviceInfo,
            location_lat: location.lat,
            location_lng: location.lng,
          });

        if (insertError) throw insertError;
      } else {
        // Update existing attendee record
        const { error: updateError } = await supabase
          .from("briefing_attendees")
          .update({
            acknowledged: true,
            acknowledged_at: new Date().toISOString(),
            signature_url: publicUrl,
            signed_via: "qr_code",
            device_info: deviceInfo,
            location_lat: location.lat,
            location_lng: location.lng,
            updated_at: new Date().toISOString(),
          })
          .eq("id", selectedAttendee);

        if (updateError) throw updateError;
      }

      setShowSuccess(true);
      toast({
        title: "Signed off successfully",
        description: "Thank you for signing off on this briefing.",
      });

      // Reload briefing to show updated state
      loadBriefing();
    } catch (error) {
      console.error("Error signing off:", error);
      toast({
        title: "Sign off failed",
        description: "Could not complete sign off. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const dataURLtoBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const clearSignature = () => {
    setSignatureData("");
    if (signaturePadRef.current?.clear) {
      signaturePadRef.current.clear();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-elec-navy flex items-center justify-center">
        <div className="text-center text-elec-light">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-elec-yellow" />
          <p>Loading briefing...</p>
        </div>
      </div>
    );
  }

  if (!briefing) {
    return (
      <div className="min-h-screen bg-elec-navy flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-elec-gray border-elec-gray">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-xl font-bold text-foreground mb-2">Briefing Not Found</h1>
            <p className="text-muted-foreground">
              This briefing may have been removed or the link is invalid.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get pending attendees (not yet signed)
  const pendingAttendees = briefing.attendees?.filter(a => !a.acknowledged) || [];
  const signedAttendees = briefing.attendees?.filter(a => a.acknowledged) || [];
  const totalAttendees = briefing.attendees?.length || 0;
  const signedCount = signedAttendees.length;
  const completionRate = totalAttendees > 0 ? Math.round((signedCount / totalAttendees) * 100) : 0;

  // Get risk level styling
  const riskColour = briefing.risk_level === "high"
    ? "text-red-400 border-red-500/50 bg-red-500/10"
    : briefing.risk_level === "medium"
    ? "text-amber-400 border-amber-500/50 bg-amber-500/10"
    : "text-green-400 border-green-500/50 bg-green-500/10";

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-elec-navy flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-elec-gray border-green-500/30">
          <CardContent className="pt-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Successfully Signed Off</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for signing off on "{briefing.title}".
              Your attendance has been recorded.
            </p>
            <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
              <p>You can close this page now.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-elec-navy">
      <div className="container mx-auto px-4 py-6 max-w-lg">
        <div className="bg-elec-gray/95 backdrop-blur-sm rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5">
            <div className="flex items-start gap-3">
              <div className={cn("p-2.5 rounded-xl bg-white/10", riskColour)}>
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h1 className="text-lg font-bold leading-tight">{briefing.title}</h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="border-white/30 text-white text-xs">
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
          </div>

          {/* Info Bar */}
          <div className="p-4 border-b border-border bg-muted/30">
            <div className="flex flex-wrap gap-3 text-sm">
              {briefing.date && (
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(briefing.date), "dd MMM yyyy")}
                </span>
              )}
              {briefing.time && (
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {briefing.time}
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
            </div>

            {/* Progress */}
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {signedCount} of {totalAttendees} signed
                </span>
                <span className="font-medium text-foreground">{completionRate}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          </div>

          {/* Sign Off Section */}
          <div className="p-4 space-y-4">
            <Card className="bg-muted/30 border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <PenTool className="h-4 w-4 text-blue-400" />
                  Sign Off
                </CardTitle>
                <CardDescription className="text-xs">
                  Select your name or sign as a guest
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Toggle between existing attendee and guest */}
                <div className="flex gap-2">
                  <Button
                    variant={!isGuest ? "default" : "outline"}
                    onClick={() => setIsGuest(false)}
                    className={cn(
                      "flex-1 h-11 touch-manipulation",
                      !isGuest && "bg-blue-600 hover:bg-blue-700"
                    )}
                  >
                    <Users className="h-4 w-4 mr-1.5" />
                    I'm on the list
                  </Button>
                  <Button
                    variant={isGuest ? "default" : "outline"}
                    onClick={() => setIsGuest(true)}
                    className={cn(
                      "flex-1 h-11 touch-manipulation",
                      isGuest && "bg-blue-600 hover:bg-blue-700"
                    )}
                  >
                    <User className="h-4 w-4 mr-1.5" />
                    I'm a guest
                  </Button>
                </div>

                {!isGuest ? (
                  // Select from pending attendees
                  <div className="space-y-2">
                    <Label className="text-sm">Select your name</Label>
                    {pendingAttendees.length > 0 ? (
                      <ScrollArea className="h-40">
                        <div className="space-y-2">
                          {pendingAttendees.map((attendee) => (
                            <button
                              key={attendee.id}
                              onClick={() => setSelectedAttendee(attendee.id)}
                              className={cn(
                                "w-full p-3 rounded-lg border text-left transition-colors touch-manipulation",
                                selectedAttendee === attendee.id
                                  ? "bg-blue-500/20 border-blue-500"
                                  : "bg-muted/50 border-border hover:border-blue-500/50"
                              )}
                            >
                              <p className="font-medium text-foreground truncate">
                                {attendee.employee?.name || attendee.guest_name || "Unknown"}
                              </p>
                              {attendee.guest_company && (
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {attendee.guest_company}
                                </p>
                              )}
                            </button>
                          ))}
                        </div>
                      </ScrollArea>
                    ) : (
                      <div className="p-4 text-center text-muted-foreground bg-muted/50 rounded-lg">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-400" />
                        <p className="text-sm">All attendees have signed off!</p>
                        <p className="text-xs mt-1">Sign as a guest if you need to add your signature.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  // Guest form
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="guestName">Your Name *</Label>
                      <Input
                        id="guestName"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Enter your full name"
                        className="h-11 touch-manipulation"
                      />
                    </div>
                    <div>
                      <Label htmlFor="guestCompany">Company (optional)</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="guestCompany"
                          value={guestCompany}
                          onChange={(e) => setGuestCompany(e.target.value)}
                          placeholder="Your company name"
                          className="h-11 pl-10 touch-manipulation"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Signature */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Your Signature *</Label>
                    {signatureData && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearSignature}
                        className="h-11 text-sm text-muted-foreground touch-manipulation"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                  <div className="rounded-lg overflow-hidden border border-border bg-white">
                    <SignaturePad
                      ref={signaturePadRef}
                      onSignatureChange={setSignatureData}
                      className="w-full"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Draw your signature above using your finger or stylus
                  </p>
                </div>

                {/* Submit */}
                <Button
                  onClick={handleSignOff}
                  disabled={submitting || !signatureData || (!isGuest && !selectedAttendee) || (isGuest && !guestName.trim())}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white touch-manipulation"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Signing off...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Sign Off
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Already signed list */}
            {signedAttendees.length > 0 && (
              <Card className="bg-muted/30 border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Already Signed ({signedAttendees.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1.5">
                    {signedAttendees.map((attendee) => (
                      <div
                        key={attendee.id}
                        className="flex items-center justify-between gap-2 p-2 rounded bg-green-500/5"
                      >
                        <span className="text-sm text-foreground truncate min-w-0 flex-1">
                          {attendee.employee?.name || attendee.guest_name}
                        </span>
                        <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">
                          {attendee.acknowledged_at
                            ? format(new Date(attendee.acknowledged_at), "HH:mm")
                            : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 pb-6 text-center">
            <p className="text-xs text-muted-foreground">
              Powered by Elec-Mate • Secure Digital Sign-Off
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BriefingSignOff;

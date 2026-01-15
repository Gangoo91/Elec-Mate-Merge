import { useState, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  ClipboardCheck,
  X,
  Check,
  AlertTriangle,
  XCircle,
  Loader2,
  Camera,
  History,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SignatureCanvas from "react-signature-canvas";
import {
  useVehicleChecks,
  useLatestCheck,
  useHasCheckedToday,
  useCreateCheck,
  useUploadDefectPhotos,
  CHECK_ITEMS,
  type CheckStatus,
} from "@/hooks/useVehicleChecks";
import type { Vehicle } from "@/hooks/useFleet";
import { supabase } from "@/integrations/supabase/client";

interface DailyCheckSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Vehicle;
}

type ViewMode = "check" | "history";

export function DailyCheckSheet({
  open,
  onOpenChange,
  vehicle,
}: DailyCheckSheetProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("check");
  const [checkState, setCheckState] = useState<Record<string, boolean>>({});
  const [mileage, setMileage] = useState(vehicle.mileage?.toString() || "");
  const [defectsFound, setDefectsFound] = useState(false);
  const [defectDetails, setDefectDetails] = useState("");
  const [notes, setNotes] = useState("");
  const sigRef = useRef<SignatureCanvas>(null);

  const { data: checks = [] } = useVehicleChecks(vehicle.id);
  const { data: latestCheck } = useLatestCheck(vehicle.id);
  const { data: hasCheckedToday } = useHasCheckedToday(vehicle.id);
  const createCheck = useCreateCheck();
  const uploadPhotos = useUploadDefectPhotos();

  // Initialize check state with all items checked by default
  const initializeCheckState = () => {
    const state: Record<string, boolean> = {};
    Object.values(CHECK_ITEMS).flat().forEach((item) => {
      state[item.key] = true;
    });
    state["dashboard_warnings"] = false; // This one is inverted (false = no warnings = good)
    return state;
  };

  useState(() => {
    setCheckState(initializeCheckState());
  });

  const handleCheckChange = (key: string, checked: boolean) => {
    setCheckState((prev) => ({ ...prev, [key]: checked }));
  };

  const handleSubmit = async () => {
    let signatureUrl: string | undefined;

    // Upload signature if drawn
    if (sigRef.current && !sigRef.current.isEmpty()) {
      const dataUrl = sigRef.current.toDataURL("image/png");
      const blob = await fetch(dataUrl).then((r) => r.blob());
      const file = new File([blob], "signature.png", { type: "image/png" });

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const fileName = `vehicle-check-signatures/${user.id}/${vehicle.id}/${Date.now()}.png`;
        const { data, error } = await supabase.storage
          .from("visual-uploads")
          .upload(fileName, file);

        if (!error && data) {
          const { data: urlData } = supabase.storage
            .from("visual-uploads")
            .getPublicUrl(data.path);
          signatureUrl = urlData.publicUrl;
        }
      }
    }

    createCheck.mutate(
      {
        vehicle_id: vehicle.id,
        check_date: new Date().toISOString().split("T")[0],
        check_time: new Date().toTimeString().split(" ")[0].slice(0, 5),
        mileage: mileage ? parseInt(mileage) : undefined,
        tyres_ok: checkState.tyres_ok ?? true,
        lights_ok: checkState.lights_ok ?? true,
        mirrors_ok: checkState.mirrors_ok ?? true,
        bodywork_ok: checkState.bodywork_ok ?? true,
        windscreen_ok: checkState.windscreen_ok ?? true,
        wipers_ok: checkState.wipers_ok ?? true,
        registration_visible: checkState.registration_visible ?? true,
        oil_level_ok: checkState.oil_level_ok ?? true,
        coolant_ok: checkState.coolant_ok ?? true,
        washer_fluid_ok: checkState.washer_fluid_ok ?? true,
        horn_ok: checkState.horn_ok ?? true,
        seatbelt_ok: checkState.seatbelt_ok ?? true,
        dashboard_warnings: checkState.dashboard_warnings ?? false,
        first_aid_kit: checkState.first_aid_kit ?? true,
        fire_extinguisher: checkState.fire_extinguisher ?? true,
        defects_found: defectsFound,
        defect_details: defectDetails || undefined,
        signature_url: signatureUrl,
        notes: notes || undefined,
        status: "pass", // Will be calculated by the hook
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          // Reset form
          setCheckState(initializeCheckState());
          setDefectsFound(false);
          setDefectDetails("");
          setNotes("");
          sigRef.current?.clear();
        },
      }
    );
  };

  const getStatusBadge = (status: CheckStatus) => {
    switch (status) {
      case "pass":
        return <Badge className="bg-green-500/20 text-green-400 border-0">Pass</Badge>;
      case "minor_defects":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-0">Minor Defects</Badge>;
      case "major_defects":
        return <Badge className="bg-orange-500/20 text-orange-400 border-0">Major Defects</Badge>;
      case "fail":
        return <Badge className="bg-red-500/20 text-red-400 border-0">Fail</Badge>;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 pb-3 border-b border-border shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-green-500/10">
                  <ClipboardCheck className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <SheetTitle className="text-left">Daily Vehicle Check</SheetTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {vehicle.registration} - {vehicle.make} {vehicle.model}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="shrink-0 h-11 w-11 touch-manipulation"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Tab Toggle */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setViewMode("check")}
              className={cn(
                "flex-1 py-4 text-base font-medium transition-colors touch-manipulation min-h-[52px]",
                viewMode === "check"
                  ? "text-green-400 border-b-2 border-green-400"
                  : "text-muted-foreground"
              )}
            >
              New Check
            </button>
            <button
              onClick={() => setViewMode("history")}
              className={cn(
                "flex-1 py-4 text-base font-medium transition-colors touch-manipulation min-h-[52px]",
                viewMode === "history"
                  ? "text-green-400 border-b-2 border-green-400"
                  : "text-muted-foreground"
              )}
            >
              History ({checks.length})
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {viewMode === "check" ? (
              <div className="p-4 space-y-6">
                {/* Already Checked Today Alert */}
                {hasCheckedToday && (
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400">
                        Vehicle checked today at{" "}
                        {latestCheck?.check_time?.slice(0, 5)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Mileage */}
                <div>
                  <Label className="text-sm font-medium">Current Mileage</Label>
                  <Input
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    placeholder="e.g. 45000"
                    className="h-11 mt-1.5 touch-manipulation text-base"
                  />
                </div>

                {/* Exterior Checks */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Exterior Checks
                  </h3>
                  <div className="space-y-3">
                    {CHECK_ITEMS.exterior.map((item) => (
                      <label
                        key={item.key}
                        className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/50 touch-manipulation min-h-[52px]"
                      >
                        <Checkbox
                          checked={checkState[item.key] ?? true}
                          onCheckedChange={(checked) =>
                            handleCheckChange(item.key, checked as boolean)
                          }
                          className="h-6 w-6 touch-manipulation"
                        />
                        <span className="text-base">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Fluid Checks */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    Fluid Levels
                  </h3>
                  <div className="space-y-3">
                    {CHECK_ITEMS.fluids.map((item) => (
                      <label
                        key={item.key}
                        className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/50 touch-manipulation min-h-[52px]"
                      >
                        <Checkbox
                          checked={checkState[item.key] ?? true}
                          onCheckedChange={(checked) =>
                            handleCheckChange(item.key, checked as boolean)
                          }
                          className="h-6 w-6 touch-manipulation"
                        />
                        <span className="text-base">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Interior Checks */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                    Interior & Safety
                  </h3>
                  <div className="space-y-3">
                    {CHECK_ITEMS.interior.map((item) => (
                      <label
                        key={item.key}
                        className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/50 touch-manipulation min-h-[52px]"
                      >
                        <Checkbox
                          checked={checkState[item.key] ?? (item.key === "dashboard_warnings" ? false : true)}
                          onCheckedChange={(checked) =>
                            handleCheckChange(item.key, checked as boolean)
                          }
                          className="h-6 w-6 touch-manipulation"
                        />
                        <span className="text-base">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Defects Section */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    Defects
                  </h3>
                  <label className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card/50 mb-3 touch-manipulation min-h-[52px]">
                    <Checkbox
                      checked={defectsFound}
                      onCheckedChange={(checked) => setDefectsFound(checked as boolean)}
                      className="h-6 w-6 touch-manipulation"
                    />
                    <span className="text-base">Defects found</span>
                  </label>

                  {defectsFound && (
                    <Textarea
                      value={defectDetails}
                      onChange={(e) => setDefectDetails(e.target.value)}
                      placeholder="Describe defects found..."
                      className="min-h-[100px] touch-manipulation text-base"
                    />
                  )}
                </div>

                {/* Notes */}
                <div>
                  <Label className="text-sm font-medium">Additional Notes</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any other observations..."
                    className="mt-1.5 touch-manipulation text-base"
                  />
                </div>

                {/* Signature */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Signature</Label>
                  <div className="border border-border rounded-xl bg-white overflow-hidden touch-manipulation">
                    <SignatureCanvas
                      ref={sigRef}
                      canvasProps={{
                        className: "w-full h-32",
                        style: { width: "100%", height: "128px" },
                      }}
                      backgroundColor="white"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => sigRef.current?.clear()}
                    className="mt-2 h-10 touch-manipulation text-sm"
                  >
                    Clear Signature
                  </Button>
                </div>

                {/* Submit */}
                <Button
                  onClick={handleSubmit}
                  disabled={createCheck.isPending}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 touch-manipulation text-base"
                >
                  {createCheck.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Complete Check
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="p-4">
                {checks.length === 0 ? (
                  <div className="text-center py-12">
                    <History className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-sm text-muted-foreground">No checks recorded yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {checks.map((check) => (
                      <div
                        key={check.id}
                        className={cn(
                          "p-4 rounded-xl border bg-card/50 touch-manipulation",
                          check.status === "fail" || check.status === "major_defects"
                            ? "border-red-500/30"
                            : check.status === "minor_defects"
                            ? "border-yellow-500/30"
                            : "border-border"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-foreground text-base">
                              {new Date(check.check_date).toLocaleDateString("en-GB", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                              })}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {check.check_time?.slice(0, 5)}
                              {check.driver?.name && ` • ${check.driver.name}`}
                            </p>
                          </div>
                          {getStatusBadge(check.status)}
                        </div>

                        {check.mileage && (
                          <p className="text-sm text-muted-foreground mb-1">
                            Mileage: {check.mileage.toLocaleString()}
                          </p>
                        )}

                        {check.defects_found && check.defect_details && (
                          <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <p className="text-sm text-red-400">
                              <AlertTriangle className="h-4 w-4 inline mr-1.5" />
                              {check.defect_details}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

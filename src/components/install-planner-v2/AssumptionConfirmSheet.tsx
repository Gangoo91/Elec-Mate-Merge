import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { AlertCircle, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AssumptionConfirmSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  confirmationData: {
    confirmationId: string;
    interpretedRequirements: {
      load?: number;
      distance?: number;
      voltage?: number;
      phases?: string;
      environment?: string;
      loadType?: string;
    };
    criticalMissing: string[];
  } | null;
  onConfirm: (confirmedAnalysis: any) => void;
}

export function AssumptionConfirmSheet({
  open,
  onOpenChange,
  confirmationData,
  onConfirm
}: AssumptionConfirmSheetProps) {
  const [load, setLoad] = useState("");
  const [distance, setDistance] = useState("");
  const [voltage, setVoltage] = useState("");
  const [phases, setPhases] = useState("");
  const [environment, setEnvironment] = useState("");

  // Pre-fill from interpretedRequirements
  useEffect(() => {
    if (confirmationData?.interpretedRequirements) {
      const reqs = confirmationData.interpretedRequirements;
      setLoad(reqs.load?.toString() || "");
      setDistance(reqs.distance?.toString() || "");
      setVoltage(reqs.voltage?.toString() || "230");
      setPhases(reqs.phases || "single");
      setEnvironment(reqs.environment || "");
    }
  }, [confirmationData]);

  const handleConfirm = () => {
    if (!confirmationData) return;

    const confirmedAnalysis = {
      interpretedRequirements: {
        load: parseFloat(load) || undefined,
        distance: parseFloat(distance) || undefined,
        voltage: parseFloat(voltage) || 230,
        phases: phases || "single",
        environment: environment || "Indoor dry locations",
        loadType: confirmationData.interpretedRequirements.loadType
      },
      criticalMissing: confirmationData.criticalMissing.filter(
        field => {
          if (field === "load" && load) return false;
          if (field === "distance" && distance) return false;
          return true;
        }
      )
    };

    onConfirm(confirmedAnalysis);
    onOpenChange(false);
  };

  if (!confirmationData) return null;

  const missingFields = confirmationData.criticalMissing || [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-[85vh] rounded-t-2xl sm:h-auto sm:max-h-[90vh] sm:rounded-t-none"
      >
        <SheetHeader className="sticky top-0 bg-background/95 backdrop-blur pb-4 border-b">
          <SheetTitle className="text-lg sm:text-xl flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Confirm Assumptions
          </SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto p-4 space-y-4 pb-24">
          {missingFields.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Missing critical info: {missingFields.join(", ")}. Please fill below.
              </AlertDescription>
            </Alert>
          )}

          <MobileInputWrapper
            label="Load"
            placeholder="e.g., 9.5"
            value={load}
            onChange={setLoad}
            type="number"
            inputMode="decimal"
            step="0.1"
            unit="kW"
            hint="Total load in kilowatts"
            error={missingFields.includes("load") && !load ? "Load is required" : undefined}
          />

          <MobileInputWrapper
            label="Cable Run Distance"
            placeholder="e.g., 25"
            value={distance}
            onChange={setDistance}
            type="number"
            inputMode="numeric"
            step="1"
            unit="m"
            hint="One-way cable length in metres"
            error={missingFields.includes("distance") && !distance ? "Distance is required" : undefined}
          />

          <MobileInputWrapper
            label="Voltage"
            placeholder="230"
            value={voltage}
            onChange={setVoltage}
            type="number"
            inputMode="numeric"
            unit="V"
            hint="Usually 230V for single-phase"
          />

          <MobileSelectWrapper
            label="Phases"
            value={phases}
            onValueChange={setPhases}
            options={[
              { value: "single", label: "Single Phase" },
              { value: "three", label: "Three Phase" }
            ]}
            hint="Select single or three phase"
          />

          <MobileSelectWrapper
            label="Environment"
            value={environment}
            onValueChange={setEnvironment}
            options={[
              { value: "", label: "Select environment" },
              { value: "Indoor dry locations", label: "Indoor Dry" },
              { value: "Outdoor exposed", label: "Outdoor Exposed" },
              { value: "Underground", label: "Underground" },
              { value: "Loft space", label: "Loft Space" },
              { value: "Plant room", label: "Plant Room" }
            ]}
            placeholder="Select environment"
            hint="Installation location type"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={
              missingFields.includes("load") && !load ||
              missingFields.includes("distance") && !distance
            }
            className="flex-1"
          >
            Confirm & Continue
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

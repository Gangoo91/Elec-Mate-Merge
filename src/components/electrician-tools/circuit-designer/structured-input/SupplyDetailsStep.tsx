import * as React from "react";
import { IOSInput } from "@/components/ui/ios-input";
import { IOSSelect } from "@/components/ui/ios-select";
import { Info, Zap, ChevronDown, Building2, Calendar, Wrench, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface SupplyDetailsStepProps {
  voltage: number;
  setVoltage: (value: number) => void;
  phases: 'single' | 'three';
  setPhases: (value: 'single' | 'three') => void;
  ze: number;
  setZe: (value: number) => void;
  earthingSystem: 'TN-S' | 'TN-C-S' | 'TT';
  setEarthingSystem: (value: 'TN-S' | 'TN-C-S' | 'TT') => void;
  pscc: number | undefined;
  setPscc: (value: number | undefined) => void;
  ambientTemp: number;
  setAmbientTemp: (value: number) => void;
  installationMethod: string;
  setInstallationMethod: (value: string) => void;
  groupingFactor: number;
  setGroupingFactor: (value: number) => void;
  installationType: 'domestic' | 'commercial' | 'industrial';
  mainSwitchRating: number | undefined;
  setMainSwitchRating: (value: number | undefined) => void;
  propertyAge: 'new-build' | 'modern' | 'older' | 'very-old' | undefined;
  setPropertyAge: (value: 'new-build' | 'modern' | 'older' | 'very-old' | undefined) => void;
}

export const SupplyDetailsStep = ({
  voltage,
  setVoltage,
  phases,
  setPhases,
  ze,
  setZe,
  earthingSystem,
  setEarthingSystem,
  pscc,
  setPscc,
  ambientTemp,
  setAmbientTemp,
  installationMethod,
  setInstallationMethod,
  groupingFactor,
  setGroupingFactor,
  installationType,
  mainSwitchRating,
  setMainSwitchRating,
  propertyAge,
  setPropertyAge
}: SupplyDetailsStepProps) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  // Get main switch rating options based on installation type
  const mainSwitchOptions = React.useMemo(() => {
    switch (installationType) {
      case 'domestic':
        return [
          { value: "60", label: "60A" },
          { value: "80", label: "80A" },
          { value: "100", label: "100A (Standard)" },
          { value: "125", label: "125A" },
        ];
      case 'commercial':
        return [
          { value: "100", label: "100A" },
          { value: "125", label: "125A" },
          { value: "160", label: "160A" },
          { value: "200", label: "200A (Standard)" },
          { value: "250", label: "250A" },
          { value: "315", label: "315A" },
          { value: "400", label: "400A" },
        ];
      case 'industrial':
        return [
          { value: "160", label: "160A" },
          { value: "200", label: "200A" },
          { value: "250", label: "250A" },
          { value: "315", label: "315A" },
          { value: "400", label: "400A (Standard)" },
          { value: "500", label: "500A" },
          { value: "630", label: "630A" },
          { value: "800", label: "800A" },
          { value: "1000", label: "1000A" },
        ];
      default:
        return [
          { value: "60", label: "60A" },
          { value: "80", label: "80A" },
          { value: "100", label: "100A (Standard)" },
          { value: "125", label: "125A" },
        ];
    }
  }, [installationType]);

  // Combined supply type (voltage + phases)
  const supplyType = phases === 'single'
    ? (voltage === 110 ? '110-single' : '230-single')
    : '400-three';

  const handleSupplyTypeChange = (value: string) => {
    switch (value) {
      case '110-single':
        setVoltage(110);
        setPhases('single');
        break;
      case '230-single':
        setVoltage(230);
        setPhases('single');
        break;
      case '400-three':
        setVoltage(400);
        setPhases('three');
        break;
    }
  };

  // Auto-fill Ze based on earthing system
  React.useEffect(() => {
    if (earthingSystem === 'TN-S' || earthingSystem === 'TN-C-S') {
      if (ze === 0.35 || ze === 200) setZe(0.35);
    } else if (earthingSystem === 'TT') {
      if (ze === 0.35) setZe(200);
    }
  }, [earthingSystem]);

  // Premium section header component
  const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
    <div className="flex items-center gap-2 mb-4">
      <div className="p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
        <Icon className="h-4 w-4 text-elec-yellow" />
      </div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
    </div>
  );

  // Premium info alert
  const InfoAlert = ({ children, variant = 'info' }: { children: React.ReactNode; variant?: 'info' | 'warning' }) => (
    <div
      className={cn(
        "flex items-start gap-2 p-3 rounded-xl border",
        "bg-gradient-to-br from-amber-950/20 to-black/10 backdrop-blur",
        variant === 'warning'
          ? "border-amber-500/30 text-amber-200"
          : "border-blue-500/30 text-blue-200"
      )}
    >
      {variant === 'warning' ? (
        <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
      ) : (
        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
      )}
      <p className="text-xs leading-relaxed">{children}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Smart defaults info */}
      <InfoAlert>
        Smart defaults pre-filled based on your installation type. Adjust only if you have specific requirements.
      </InfoAlert>

      {/* Property Context Section */}
      <div className="space-y-4">
        <SectionHeader icon={Calendar} title="Property Context" />

        <IOSSelect
          label="Property Age"
          value={propertyAge || ''}
          onValueChange={(v) => setPropertyAge((v as any) || undefined)}
          placeholder="Select age (helps AI adjust factors)..."
          options={[
            { value: "new-build", label: "New Build (< 5 years)" },
            { value: "modern", label: "Modern (5-20 years)" },
            { value: "older", label: "Older (20-40 years)" },
            { value: "very-old", label: "Very Old (40+ years)" },
          ]}
          hint="Adjusts diversity factors and upgrade recommendations"
        />
      </div>

      {/* Primary Supply Section */}
      <div className="space-y-4">
        <SectionHeader icon={Zap} title="Primary Supply" />

        <IOSSelect
          label="Supply Type *"
          value={supplyType}
          onValueChange={handleSupplyTypeChange}
          options={[
            { value: "110-single", label: "110V Single Phase", description: "Site/Temporary supply" },
            { value: "230-single", label: "230V Single Phase", description: "UK Standard domestic" },
            { value: "400-three", label: "400V Three Phase", description: "Commercial/Industrial" },
          ]}
        />

        {supplyType === '110-single' && (
          <InfoAlert variant="warning">
            110V requires transformers. Ensure proper labelling and verify supply source.
          </InfoAlert>
        )}

        {supplyType === '400-three' && (
          <InfoAlert>
            400V three-phase provides higher capacity. Phase balance is critical for compliance.
          </InfoAlert>
        )}
      </div>

      {/* Consumer Unit Details */}
      <div className="space-y-4">
        <SectionHeader icon={Building2} title="Consumer Unit Details" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <IOSSelect
            label="Main Switch Rating"
            value={mainSwitchRating?.toString() || ''}
            onValueChange={(v) => setMainSwitchRating(v ? Number(v) : undefined)}
            placeholder="Auto"
            options={mainSwitchOptions}
          />

          <IOSSelect
            label="Number of Ways"
            value="auto"
            onValueChange={() => {}}
            options={[
              { value: "auto", label: "Auto (Based on circuits)" },
              { value: "6", label: "6 Way" },
              { value: "8", label: "8 Way" },
              { value: "10", label: "10 Way" },
              { value: "12", label: "12 Way" },
              { value: "16", label: "16 Way" },
              { value: "18", label: "18 Way" },
            ]}
          />

          <IOSSelect
            label="Type"
            value="split-load"
            onValueChange={() => {}}
            options={[
              { value: "split-load", label: "Split Load (Standard)" },
              { value: "high-integrity", label: "High Integrity" },
              { value: "main-switch", label: "Main Switch Only" },
            ]}
          />
        </div>
        <p className="text-ios-caption-1 text-white/50">AI will auto-select if not specified</p>
      </div>

      {/* Earthing System */}
      <div className="space-y-4">
        <SectionHeader icon={Wrench} title="Earthing & Protection" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <IOSSelect
            label="Earthing System *"
            value={earthingSystem}
            onValueChange={(v: any) => setEarthingSystem(v)}
            options={[
              { value: "TN-S", label: "TN-S (PME)" },
              { value: "TN-C-S", label: "TN-C-S (Most common)" },
              { value: "TT", label: "TT (Rod earthing)" },
            ]}
            hint="Check your consumer unit label"
          />

          <IOSInput
            label="Ze (Ω) *"
            type="number"
            value={ze.toString()}
            onChange={(e) => setZe(Number(e.target.value))}
            hint={`Typical: ${earthingSystem === 'TT' ? '200Ω' : '0.35Ω'}`}
          />
        </div>

        <IOSInput
          label="PSCC (kA)"
          type="number"
          value={pscc?.toString() || ''}
          onChange={(e) => setPscc(e.target.value ? Number(e.target.value) : undefined)}
          placeholder="Leave blank to auto-calculate"
          hint="AI will calculate based on Ze if not provided"
        />
      </div>

      {/* Advanced Settings */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between h-12 px-4 rounded-xl",
              "bg-gradient-to-br from-amber-950/30 to-black/20 border border-amber-800/20",
              "hover:bg-amber-900/20 hover:border-amber-600/30",
              "transition-all duration-ios-fast",
              "touch-manipulation"
            )}
          >
            <span className="flex items-center gap-2 font-medium text-white/80">
              Advanced Settings
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-white/60 transition-transform duration-ios-normal",
                showAdvanced && "rotate-180"
              )}
            />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <IOSSelect
              label="Default Installation Method"
              value={installationMethod}
              onValueChange={setInstallationMethod}
              options={[
                { value: "clipped-direct", label: "Clipped Direct", description: "Most common" },
                { value: "in-conduit", label: "In Conduit" },
                { value: "in-trunking", label: "In Trunking" },
                { value: "buried-direct", label: "Buried Direct" },
                { value: "in-insulation", label: "In Thermal Insulation" },
              ]}
            />

            <IOSInput
              label="Ambient Temperature (°C)"
              type="number"
              value={ambientTemp.toString()}
              onChange={(e) => setAmbientTemp(Number(e.target.value))}
              hint="Standard: 25°C"
            />
          </div>

          <IOSInput
            label="Cable Grouping Factor"
            type="number"
            value={groupingFactor.toString()}
            onChange={(e) => setGroupingFactor(Number(e.target.value))}
            hint="1.0 = no grouping (default)"
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

/**
 * Step 4: Installation Details Per Circuit
 * Collect detailed installation parameters for each circuit to reduce AI guessing
 */

import { CircuitInput } from "@/types/installation-design";
import { Badge } from "@/components/ui/badge";
import { Info, Zap, Wrench, MapPin } from "lucide-react";
import { IOSSelect } from "@/components/ui/ios-select";
import { cn } from "@/lib/utils";

interface InstallationDetailsStepProps {
  circuits: CircuitInput[];
  onUpdate: (circuits: CircuitInput[]) => void;
  installationType: 'domestic' | 'commercial' | 'industrial';
}

const DOMESTIC_INSTALL_METHODS = [
  { value: 'auto', label: 'Auto (let AI decide)' },
  { value: 'clipped_direct', label: 'Clipped Direct (most common)' },
  { value: 'pvc_conduit', label: 'PVC Conduit (concealed)' },
  { value: 'in_wall', label: 'In Wall (chased/buried)' },
  { value: 'surface_pvc', label: 'Surface Mini Trunking' },
  { value: 'loft_joists', label: 'Across Joists (loft)' },
  { value: 'thermal_insulation', label: 'In Thermal Insulation' },
];

const COMMERCIAL_INSTALL_METHODS = [
  { value: 'auto', label: 'Auto (let AI decide)' },
  { value: 'dado_trunking', label: 'Dado Trunking (office desks)' },
  { value: 'pvc_trunking', label: 'PVC Trunking (general office)' },
  { value: 'steel_trunking', label: 'Steel Trunking (fire-rated)' },
  { value: 'cable_basket', label: 'Cable Basket (ceiling void)' },
  { value: 'perforated_tray', label: 'Perforated Cable Tray' },
  { value: 'steel_conduit', label: 'Steel Conduit (visible areas)' },
  { value: 'pvc_conduit', label: 'PVC Conduit (concealed)' },
  { value: 'skirting_trunking', label: 'Skirting Trunking (perimeter)' },
];

const INDUSTRIAL_INSTALL_METHODS = [
  { value: 'auto', label: 'Auto (let AI decide)' },
  { value: 'cable_ladder', label: 'Cable Ladder (heavy cables)' },
  { value: 'heavy_duty_tray', label: 'Heavy-Duty Tray' },
  { value: 'galvanised_conduit', label: 'Galvanised Conduit' },
  { value: 'flexible_conduit', label: 'Flexible Conduit (motors)' },
  { value: 'swa_cleats', label: 'SWA Cleats (clipped direct)' },
  { value: 'cable_basket', label: 'Cable Basket' },
  { value: 'outdoor_tray', label: 'Outdoor Tray (galvanised)' },
];

export const InstallationDetailsStep = ({ circuits, onUpdate, installationType }: InstallationDetailsStepProps) => {

  const getInstallMethodOptions = () => {
    switch (installationType) {
      case 'domestic':
        return DOMESTIC_INSTALL_METHODS;
      case 'commercial':
        return COMMERCIAL_INSTALL_METHODS;
      case 'industrial':
        return INDUSTRIAL_INSTALL_METHODS;
      default:
        return DOMESTIC_INSTALL_METHODS;
    }
  };

  const updateCircuit = (index: number, field: keyof CircuitInput, value: any) => {
    const updated = [...circuits];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
          <Wrench className="h-5 w-5 text-elec-yellow" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Installation Details</h2>
          <p className="text-sm text-white/50">Refine each circuit's installation method</p>
        </div>
      </div>

      {/* Info Alert */}
      <div
        className={cn(
          "flex items-start gap-2 p-3 rounded-xl border",
          "bg-white/5 backdrop-blur",
          "border-blue-500/30"
        )}
      >
        <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-400" />
        <p className="text-xs leading-relaxed text-blue-200">
          More details = faster AI processing. Use "Auto" for any field you're unsure about.
        </p>
      </div>

      {/* Circuit Cards */}
      <div className="space-y-4">
        {circuits.map((circuit, index) => (
          <div
            key={circuit.id}
            className={cn(
              "p-4 rounded-xl",
              "bg-white/5 backdrop-blur border border-white/10",
              "transition-all duration-ios-fast",
              "hover:border-white/20"
            )}
          >
            {/* Circuit Header */}
            <div className="flex items-start justify-between gap-2 mb-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-lg bg-elec-yellow/10">
                    <Zap className="h-3.5 w-3.5 text-elec-yellow" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-white/10 border-0 text-white/80 text-xs"
                  >
                    Circuit {index + 1}
                  </Badge>
                </div>
                <h3 className="text-sm font-medium text-white truncate pl-1">
                  {circuit.name || 'Unnamed Circuit'}
                </h3>
                <p className="text-xs text-white/50 pl-1">
                  {circuit.loadType} • {circuit.loadPower}W • {circuit.cableLength}m
                </p>
              </div>
              {circuit.specialLocation && circuit.specialLocation !== 'none' && (
                <Badge
                  className="bg-orange-500/20 text-orange-300 border-0 text-xs capitalize shrink-0"
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  {circuit.specialLocation}
                </Badge>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Installation Method */}
              <IOSSelect
                label="Cable Installation Method"
                value={circuit.installMethod || 'auto'}
                onValueChange={(value) => updateCircuit(index, 'installMethod', value)}
                options={getInstallMethodOptions()}
              />

              {/* Protection Device Type */}
              <IOSSelect
                label="Protection Device Preference"
                value={circuit.protectionType || 'auto'}
                onValueChange={(value) => updateCircuit(index, 'protectionType', value)}
                options={[
                  { value: 'auto', label: 'Auto (let AI decide)' },
                  { value: 'MCB', label: 'MCB Only' },
                  { value: 'RCBO', label: 'RCBO (30mA Type AC)' },
                  { value: 'RCBO-TypeA', label: 'RCBO (30mA Type A)' },
                  { value: 'RCBO-TypeB', label: 'RCBO (30mA Type B)' },
                ]}
              />

              {/* Bathroom Zone (if bathroom circuit) */}
              {circuit.specialLocation === 'bathroom' && (
                <IOSSelect
                  label="Bathroom Zone"
                  value={circuit.bathroomZone || 'outside_zones'}
                  onValueChange={(value) => updateCircuit(index, 'bathroomZone', value)}
                  options={[
                    { value: 'zone_0', label: 'Zone 0' },
                    { value: 'zone_1', label: 'Zone 1' },
                    { value: 'zone_2', label: 'Zone 2' },
                    { value: 'outside_zones', label: 'Outside Zones' },
                  ]}
                  hint="Determines IP rating and wiring requirements"
                />
              )}

              {/* Outdoor Installation Type */}
              {circuit.specialLocation === 'outdoor' && (
                <IOSSelect
                  label="Outdoor Installation Type"
                  value={circuit.outdoorInstall || 'wall_mounted'}
                  onValueChange={(value) => updateCircuit(index, 'outdoorInstall', value)}
                  options={[
                    { value: 'buried', label: 'Buried in Ground' },
                    { value: 'overhead', label: 'Overhead Line' },
                    { value: 'wall_mounted', label: 'Wall Mounted' },
                    { value: 'other', label: 'Other' },
                  ]}
                  hint="Affects cable type and protection requirements"
                />
              )}

              {/* Auto-calculated values */}
              {circuit.calculatedIb && (
                <div className="flex flex-wrap gap-3 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                    <span className="text-xs text-white/60">Design:</span>
                    <span className="text-xs font-semibold text-elec-yellow">
                      {circuit.calculatedIb.toFixed(1)}A
                    </span>
                  </div>
                  {circuit.suggestedMCB && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-xs text-white/60">MCB:</span>
                      <span className="text-xs font-semibold text-white">
                        {circuit.suggestedMCB}A
                      </span>
                    </div>
                  )}
                  {circuit.calculatedDiversity && circuit.calculatedDiversity < 1 && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-xs text-white/60">Diversity:</span>
                      <span className="text-xs font-semibold text-white">
                        {(circuit.calculatedDiversity * 100).toFixed(0)}%
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {circuits.length === 0 && (
        <div
          className={cn(
            "p-8 text-center rounded-xl",
            "bg-white/[0.03] border-2 border-dashed border-white/[0.08]"
          )}
        >
          <div className="inline-flex p-4 rounded-xl bg-white/5 mb-4">
            <Wrench className="h-10 w-10 text-white/40" />
          </div>
          <h3 className="text-base font-semibold text-white mb-2">
            No Circuits to Configure
          </h3>
          <p className="text-sm text-white/50">
            Add circuits in the previous step to configure installation details
          </p>
        </div>
      )}
    </div>
  );
};

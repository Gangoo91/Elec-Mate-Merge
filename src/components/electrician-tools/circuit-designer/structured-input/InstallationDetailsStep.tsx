/**
 * Step 4: Installation Details Per Circuit
 * Collect detailed installation parameters for each circuit to reduce AI guessing
 */

import { CircuitInput } from "@/types/installation-design";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Badge } from "@/components/ui/badge";
import { Info, Zap, Shield, MapPin } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface InstallationDetailsStepProps {
  circuits: CircuitInput[];
  onUpdate: (circuits: CircuitInput[]) => void;
}

export const InstallationDetailsStep = ({ circuits, onUpdate }: InstallationDetailsStepProps) => {
  
  const updateCircuit = (index: number, field: keyof CircuitInput, value: any) => {
    const updated = [...circuits];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <Alert className="p-2.5 sm:p-3 bg-blue-500/10 border-blue-500/30">
        <Info className="h-3.5 w-3.5 text-blue-400" />
        <AlertDescription className="text-xs text-foreground/80">
          More details = faster AI processing. Use "Auto" for any field you're unsure about.
        </AlertDescription>
      </Alert>

      <div className="space-y-0 divide-y divide-border/30">
        {circuits.map((circuit, index) => (
          <div key={circuit.id} className="py-4 first:pt-0">
            {/* Compact circuit header */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-foreground flex items-center gap-1.5 mb-1">
                  <Zap className="h-3.5 w-3.5 text-elec-yellow shrink-0" />
                  <span className="truncate">{circuit.name}</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  {circuit.loadType} • {circuit.loadPower}W • {circuit.cableLength}m
                </p>
              </div>
              {circuit.specialLocation && circuit.specialLocation !== 'none' && (
                <Badge variant="warning" className="text-xs capitalize shrink-0">
                  {circuit.specialLocation}
                </Badge>
              )}
            </div>

            {/* Form fields */}
            <div className="space-y-3">
              
              {/* Installation Method */}
              <MobileSelectWrapper
                compact
                label="Cable Installation Method"
                value={circuit.installMethod || 'auto'}
                onValueChange={(value) => updateCircuit(index, 'installMethod', value)}
                options={[
                  { value: 'auto', label: 'Auto (let AI decide)' },
                  { value: 'method_c', label: 'Method C - Clipped Direct' },
                  { value: 'method_a', label: 'Method A - Enclosed in Conduit' },
                  { value: 'method_b', label: 'Method B - In Trunking' },
                  { value: 'method_d', label: 'Method D - Buried Direct' },
                  { value: 'method_e', label: 'Method E - In Conduit/Trunking' },
                  { value: 'method_f', label: 'Method F - In Thermal Insulation' },
                ]}
              />

              {/* Protection Device Type */}
              <MobileSelectWrapper
                compact
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
                <MobileSelectWrapper
                  compact
                  label="Bathroom Zone"
                  value={circuit.bathroomZone || 'outside_zones'}
                  onValueChange={(value) => updateCircuit(index, 'bathroomZone', value)}
                  options={[
                    { value: 'zone_0', label: 'Zone 0' },
                    { value: 'zone_1', label: 'Zone 1' },
                    { value: 'zone_2', label: 'Zone 2' },
                    { value: 'outside_zones', label: 'Outside Zones' },
                  ]}
                />
              )}

              {/* Outdoor Installation Type */}
              {circuit.specialLocation === 'outdoor' && (
                <MobileSelectWrapper
                  compact
                  label="Outdoor Installation Type"
                  value={circuit.outdoorInstall || 'wall_mounted'}
                  onValueChange={(value) => updateCircuit(index, 'outdoorInstall', value)}
                  options={[
                    { value: 'buried', label: 'Buried in Ground' },
                    { value: 'overhead', label: 'Overhead Line' },
                    { value: 'wall_mounted', label: 'Wall Mounted' },
                    { value: 'other', label: 'Other' },
                  ]}
                />
              )}

              {/* Show auto-calculated values as info */}
              {circuit.calculatedIb && (
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground pt-3 border-t border-border/20">
                  <span>Design: <strong className="text-elec-yellow">{circuit.calculatedIb.toFixed(1)}A</strong></span>
                  {circuit.suggestedMCB && (
                    <span>MCB: <strong className="text-elec-yellow">{circuit.suggestedMCB}A</strong></span>
                  )}
                  {circuit.calculatedDiversity && circuit.calculatedDiversity < 1 && (
                    <span>Diversity: <strong className="text-elec-yellow">{(circuit.calculatedDiversity * 100).toFixed(0)}%</strong></span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

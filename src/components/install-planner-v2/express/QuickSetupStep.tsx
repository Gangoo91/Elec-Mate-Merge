import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { InstallPlanDataV2 } from "../types";
import { SmartInput } from "../SmartInput";

interface QuickSetupStepProps {
  planData: InstallPlanDataV2;
  updatePlanData: (data: InstallPlanDataV2) => void;
}

type LocationType = 'inside' | 'outside' | 'underground' | 'loft' | 'plant-room' | 'data-center';

const commonCircuits = [
  { value: 'ring-main', label: 'Ring Main (32A)', load: 7360, voltage: 230, phases: 'single' as const, location: 'inside' as LocationType },
  { value: 'lighting', label: 'Lighting Circuit', load: 1000, voltage: 230, phases: 'single' as const, location: 'inside' as LocationType },
  { value: 'cooker', label: 'Electric Cooker', load: 9200, voltage: 230, phases: 'single' as const, location: 'inside' as LocationType },
  { value: 'shower', label: 'Electric Shower', load: 8500, voltage: 230, phases: 'single' as const, location: 'inside' as LocationType },
  { value: 'ev-charger', label: 'EV Charger (7kW)', load: 7000, voltage: 230, phases: 'single' as const, location: 'outside' as LocationType },
  { value: 'heat-pump', label: 'Air Source Heat Pump', load: 5000, voltage: 230, phases: 'single' as const, location: 'outside' as LocationType },
  { value: 'immersion', label: 'Immersion Heater', load: 3000, voltage: 230, phases: 'single' as const, location: 'inside' as LocationType },
  { value: 'fire-alarm', label: 'Fire Alarm Circuit', load: 500, voltage: 230, phases: 'single' as const, location: 'inside' as LocationType },
  { value: 'emergency-light', label: 'Emergency Lighting', load: 800, voltage: 230, phases: 'single' as const, location: 'inside' as LocationType },
  { value: 'outdoor-socket', label: 'Outdoor Socket', load: 3000, voltage: 230, phases: 'single' as const, location: 'outside' as LocationType },
  { value: 'custom', label: 'Custom Load', load: 0, voltage: 230, phases: 'single' as const, location: 'inside' as LocationType }
];

const installationLocations = [
  { value: 'inside', label: 'Inside building (protected routes)' },
  { value: 'outside', label: 'Outside building (weatherproof)' },
  { value: 'underground', label: 'Underground (buried)' },
  { value: 'loft', label: 'Loft/ceiling void' },
  { value: 'plant-room', label: 'Plant room/switch room' }
];

const cableRunMethods = [
  { value: 'clipped-direct', label: 'Clipped direct to surface' },
  { value: 'trunking-perforated', label: 'In perforated trunking' },
  { value: 'trunking-enclosed', label: 'In enclosed trunking' },
  { value: 'conduit-surface', label: 'In surface conduit' },
  { value: 'conduit-embedded', label: 'In conduit (buried in walls)' },
  { value: 'cable-tray', label: 'On cable tray' },
  { value: 'buried-direct', label: 'Direct burial' },
  { value: 'loft-free', label: 'In loft (clear of insulation)' },
  { value: 'loft-insulation-contact', label: 'In loft (touching insulation)' }
];

export const QuickSetupStep = ({ planData, updatePlanData }: QuickSetupStepProps) => {
  const handleCircuitTypeChange = (value: string) => {
    const circuit = commonCircuits.find(c => c.value === value);
    if (circuit) {
      // Set fire protection based on circuit type
      let fireProtection: 'none' | 'fire-alarm' | 'escape-route' | 'fire-compartment' = 'none';
      if (value === 'fire-alarm') fireProtection = 'fire-alarm';
      if (value === 'emergency-light') fireProtection = 'escape-route';

      updatePlanData({
        ...planData,
        loadType: value,
        totalLoad: circuit.load,
        voltage: circuit.voltage,
        phases: circuit.phases,
        location: circuit.location,
        cableRun: circuit.location === 'underground' ? 'buried-direct' : 'clipped-direct',
        mechanicalProtection: circuit.location === 'outside' || circuit.location === 'underground',
        fireProtection,
        installationMethod: 'clipped-direct',
        cableType: 'pvc-twin-earth' // Will be auto-selected by engine
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Smart Natural Language Input */}
      <SmartInput onParsed={(parsed) => updatePlanData({ ...planData, ...parsed })} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Circuit Type */}
        <div className="space-y-2 md:col-span-2">
          <Label>What are you installing?</Label>
          <Select value={planData.loadType} onValueChange={handleCircuitTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select circuit type" />
            </SelectTrigger>
            <SelectContent>
              {commonCircuits.map(circuit => (
                <SelectItem key={circuit.value} value={circuit.value}>
                  {circuit.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Load (if custom) */}
        {planData.loadType === 'custom' && (
          <div className="space-y-2">
            <Label>Load (Watts)</Label>
            <Input
              type="number"
              value={planData.totalLoad || ''}
              onChange={(e) => updatePlanData({
                ...planData,
                totalLoad: parseFloat(e.target.value) || 0
              })}
              placeholder="Enter load in watts"
            />
          </div>
        )}

        {/* Installation Location */}
        {planData.loadType && (
          <div className="space-y-2">
            <Label>Where is the cable going?</Label>
            <Select 
              value={planData.location || 'inside'} 
              onValueChange={(value: any) => updatePlanData({
                ...planData,
                location: value,
                mechanicalProtection: value === 'outside' || value === 'underground'
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {installationLocations.map(loc => (
                  <SelectItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Cable Run Method */}
        {planData.loadType && (
          <div className="space-y-2">
            <Label>How will the cable be run?</Label>
            <Select 
              value={planData.cableRun || 'clipped-direct'} 
              onValueChange={(value: any) => updatePlanData({
                ...planData,
                cableRun: value,
                installationMethod: value
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cableRunMethods.map(method => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Cable Length Slider */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <Label>Cable Length</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={planData.cableLength}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  const clampedValue = Math.min(Math.max(value, 1), 200);
                  updatePlanData({
                    ...planData,
                    cableLength: clampedValue
                  });
                }}
                min={1}
                max={200}
                step={2}
                className="w-20 text-right"
              />
              <span className="text-lg font-bold text-primary">m</span>
            </div>
          </div>
          <Slider
            value={[planData.cableLength]}
            onValueChange={([value]) => updatePlanData({
              ...planData,
              cableLength: value
            })}
            min={1}
            max={200}
            step={2}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1m</span>
            <span>50m</span>
            <span>100m</span>
            <span>150m</span>
            <span>200m</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      {planData.loadType && planData.totalLoad > 0 && (
        <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-muted-foreground">Load</div>
              <div className="text-lg font-bold text-foreground">{planData.totalLoad}W</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Current</div>
              <div className="text-lg font-bold text-primary">
                {(planData.totalLoad / planData.voltage).toFixed(1)}A
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Distance</div>
              <div className="text-lg font-bold text-foreground">{planData.cableLength}m</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

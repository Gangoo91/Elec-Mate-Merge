import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { InstallPlanDataV2 } from "../types";

interface QuickSetupStepProps {
  planData: InstallPlanDataV2;
  updatePlanData: (data: InstallPlanDataV2) => void;
}

const commonCircuits = [
  { value: 'ring-main', label: 'Ring Main (32A)', load: 7360, voltage: 230, phases: 'single' as const },
  { value: 'lighting', label: 'Lighting Circuit', load: 1000, voltage: 230, phases: 'single' as const },
  { value: 'cooker', label: 'Electric Cooker', load: 9200, voltage: 230, phases: 'single' as const },
  { value: 'shower', label: 'Electric Shower', load: 8500, voltage: 230, phases: 'single' as const },
  { value: 'ev-charger', label: 'EV Charger (7kW)', load: 7000, voltage: 230, phases: 'single' as const },
  { value: 'immersion', label: 'Immersion Heater', load: 3000, voltage: 230, phases: 'single' as const },
  { value: 'heat-pump', label: 'Air Source Heat Pump', load: 5000, voltage: 230, phases: 'single' as const },
  { value: 'custom', label: 'Custom Load', load: 0, voltage: 230, phases: 'single' as const }
];

export const QuickSetupStep = ({ planData, updatePlanData }: QuickSetupStepProps) => {
  const handleCircuitTypeChange = (value: string) => {
    const circuit = commonCircuits.find(c => c.value === value);
    if (circuit) {
      updatePlanData({
        ...planData,
        loadType: value,
        totalLoad: circuit.load,
        voltage: circuit.voltage,
        phases: circuit.phases,
        installationMethod: value === 'ring-main' ? 'clipped-direct' : 'clipped-direct',
        cableType: 'pvc-twin-earth'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Circuit Type */}
        <div className="space-y-2">
          <Label className="text-white">What are you installing?</Label>
          <Select value={planData.loadType} onValueChange={handleCircuitTypeChange}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
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
            <Label className="text-white">Load (Watts)</Label>
            <Input
              type="number"
              value={planData.totalLoad || ''}
              onChange={(e) => updatePlanData({
                ...planData,
                totalLoad: parseFloat(e.target.value) || 0
              })}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Enter load in watts"
            />
          </div>
        )}

        {/* Cable Length Slider */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center justify-between">
            <Label className="text-white">Cable Length</Label>
            <span className="text-2xl font-bold text-blue-400">{planData.cableLength}m</span>
          </div>
          <Slider
            value={[planData.cableLength]}
            onValueChange={([value]) => updatePlanData({
              ...planData,
              cableLength: value
            })}
            min={1}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>1m</span>
            <span>25m</span>
            <span>50m</span>
            <span>75m</span>
            <span>100m</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      {planData.loadType && planData.totalLoad > 0 && (
        <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-slate-400">Load</div>
              <div className="text-lg font-bold text-white">{planData.totalLoad}W</div>
            </div>
            <div>
              <div className="text-sm text-slate-400">Current</div>
              <div className="text-lg font-bold text-blue-400">
                {(planData.totalLoad / planData.voltage).toFixed(1)}A
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-400">Distance</div>
              <div className="text-lg font-bold text-white">{planData.cableLength}m</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

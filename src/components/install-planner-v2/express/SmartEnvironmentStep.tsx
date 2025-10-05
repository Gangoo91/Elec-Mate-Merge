import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Shield, Layers } from "lucide-react";
import { InstallPlanDataV2 } from "../types";

interface SmartEnvironmentStepProps {
  planData: InstallPlanDataV2;
  updatePlanData: (data: InstallPlanDataV2) => void;
}

export const SmartEnvironmentStep = ({ planData, updatePlanData }: SmartEnvironmentStepProps) => {
  const updateEnvironment = (field: string, value: any) => {
    const finalApplied = {
      ...planData.environmentalProfile.finalApplied,
      [field]: value
    };
    
    updatePlanData({
      ...planData,
      environmentalProfile: {
        ...planData.environmentalProfile,
        userOverrides: {
          ...planData.environmentalProfile.userOverrides,
          [field]: value
        },
        finalApplied
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Auto-detected conditions */}
      <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
        <div className="flex items-center gap-2 mb-3">
          <Badge className="bg-green-500 text-white">Auto-Detected</Badge>
          <span className="text-sm text-slate-300">Based on your installation type</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <span className="text-slate-400">Ambient:</span>
            <span className="ml-2 text-white font-medium">30°C</span>
          </div>
          <div>
            <span className="text-slate-400">Earthing:</span>
            <span className="ml-2 text-white font-medium">TN-S</span>
          </div>
          <div>
            <span className="text-slate-400">Ze:</span>
            <span className="ml-2 text-white font-medium">0.35Ω</span>
          </div>
          <div>
            <span className="text-slate-400">Grouping:</span>
            <span className="ml-2 text-white font-medium">1 cable</span>
          </div>
        </div>
      </div>

      {/* Override options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-white flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-amber-400" />
            Ambient Temperature
          </Label>
          <Input
            type="number"
            value={planData.environmentalProfile.finalApplied.ambientTemp}
            onChange={(e) => updateEnvironment('ambientTemp', parseFloat(e.target.value) || 30)}
            className="bg-slate-700 border-slate-600 text-white"
          />
          <p className="text-xs text-slate-400">Typical indoor: 25-30°C</p>
        </div>

        <div className="space-y-2">
          <Label className="text-white flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-400" />
            Earthing System
          </Label>
          <Select 
            value={planData.environmentalProfile.finalApplied.earthing}
            onValueChange={(value) => updateEnvironment('earthing', value)}
          >
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TN-S">TN-S (Separate protective earth)</SelectItem>
              <SelectItem value="TN-C-S">TN-C-S (Combined then separate)</SelectItem>
              <SelectItem value="TT">TT (Earth electrode at installation)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-white">Ze (External Earth Fault Loop Impedance)</Label>
          <Input
            type="number"
            step="0.01"
            value={planData.environmentalProfile.finalApplied.ze}
            onChange={(e) => updateEnvironment('ze', parseFloat(e.target.value) || 0.35)}
            className="bg-slate-700 border-slate-600 text-white"
          />
          <p className="text-xs text-slate-400">TN-S typical: 0.35Ω, TN-C-S typical: 0.35Ω</p>
        </div>

        <div className="space-y-2">
          <Label className="text-white flex items-center gap-2">
            <Layers className="h-4 w-4 text-purple-400" />
            Cable Grouping
          </Label>
          <Select 
            value={planData.environmentalProfile.finalApplied.grouping.toString()}
            onValueChange={(value) => updateEnvironment('grouping', parseInt(value))}
          >
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 cable (no derating)</SelectItem>
              <SelectItem value="2">2 cables (0.80)</SelectItem>
              <SelectItem value="3">3 cables (0.70)</SelectItem>
              <SelectItem value="4">4-5 cables (0.65)</SelectItem>
              <SelectItem value="6">6-8 cables (0.60)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Conditions summary */}
      <div className="space-y-2">
        <Label className="text-white">Installation Conditions</Label>
        <Select 
          value={planData.environmentalProfile.finalApplied.conditions}
          onValueChange={(value) => updateEnvironment('conditions', value)}
        >
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Indoor dry locations">Indoor dry locations</SelectItem>
            <SelectItem value="Indoor damp locations">Indoor damp locations (kitchens, bathrooms)</SelectItem>
            <SelectItem value="Outdoor">Outdoor (weatherproof)</SelectItem>
            <SelectItem value="Underground">Underground</SelectItem>
            <SelectItem value="High temperature">High temperature areas</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

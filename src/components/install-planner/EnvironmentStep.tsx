
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InstallPlanData } from "./types";
import { Thermometer, Shield, Zap, AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import EnvironmentalContextManager from "./EnvironmentalContextManager";

interface EnvironmentStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const EnvironmentStep = ({ planData, updatePlanData }: EnvironmentStepProps) => {
  // Initialize environmental settings if not present
  const environmentalSettings = planData.environmentalSettings || {
    ambientTemperature: planData.ambientTemperature || 30,
    environmentalConditions: planData.environmentalConditions || "Indoor dry locations",
    earthingSystem: planData.earthingSystem || "TN-S",
    ze: planData.ze || 0.35,
    globalGroupingFactor: planData.groupingFactor || 1,
    specialRequirements: planData.specialRequirements || [],
    installationZones: []
  };

  const circuits = planData.circuits || [];

  const handleEnvironmentalSettingsUpdate = (settings: typeof environmentalSettings) => {
    updatePlanData({ 
      environmentalSettings: settings,
      // Maintain backward compatibility
      ambientTemperature: settings.ambientTemperature,
      environmentalConditions: settings.environmentalConditions,
      earthingSystem: settings.earthingSystem,
      ze: settings.ze,
      groupingFactor: settings.globalGroupingFactor,
      specialRequirements: settings.specialRequirements
    });
  };

  const handleCircuitsUpdate = (updatedCircuits: typeof circuits) => {
    updatePlanData({ circuits: updatedCircuits });
  };

  // Check for environmental warnings
  const hasHighTemperature = environmentalSettings.ambientTemperature > 40;
  const hasTTSystem = environmentalSettings.earthingSystem === "TT";
  const hasSwimmingPoolRequirement = environmentalSettings.specialRequirements.includes("Swimming pool areas");
  const hasHazardousEnvironment = environmentalSettings.environmentalConditions.includes("explosive") || 
                                  environmentalSettings.environmentalConditions.includes("Corrosive");

  if (planData.designMode === "single") {
    // For single circuit mode, show simplified environmental controls
    return (
      <div className="space-y-6">

        <EnvironmentalContextManager
          environmentalSettings={environmentalSettings}
          circuits={[]}
          onUpdateEnvironmentalSettings={handleEnvironmentalSettingsUpdate}
          onUpdateCircuits={() => {}}
        />

        {/* Environment Warnings for Single Circuit */}
        {hasHighTemperature && (
          <Alert className="bg-red-500/10 border-red-500/30">
            <AlertTriangle className="h-4 w-4 text-red-300" />
            <AlertDescription className="text-red-200">
              <strong>High Temperature Warning:</strong> Ambient temperature above 40°C requires special consideration for cable selection and derating factors.
            </AlertDescription>
          </Alert>
        )}

        {hasTTSystem && (
          <Alert className="bg-amber-500/10 border-amber-500/30">
            <Info className="h-4 w-4 text-amber-300" />
            <AlertDescription className="text-amber-200">
              <strong>TT System:</strong> Additional earth electrode required. RCD protection mandatory for all circuits.
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  }

  // Multi-circuit mode with full environmental management
  return (
    <div className="space-y-6">

      <EnvironmentalContextManager
        environmentalSettings={environmentalSettings}
        circuits={circuits}
        onUpdateEnvironmentalSettings={handleEnvironmentalSettingsUpdate}
        onUpdateCircuits={handleCircuitsUpdate}
      />

      {/* Multi-Circuit Environmental Warnings */}
      <div className="space-y-4">
        {hasHighTemperature && (
          <Alert className="bg-red-500/10 border-red-500/30">
            <AlertTriangle className="h-4 w-4 text-red-300" />
            <AlertDescription className="text-red-200">
              <strong>High Temperature Warning:</strong> Global ambient temperature above 40°C affects all circuits. 
              Consider creating cooler installation zones for sensitive circuits.
            </AlertDescription>
          </Alert>
        )}

        {hasTTSystem && (
          <Alert className="bg-amber-500/10 border-amber-500/30">
            <Info className="h-4 w-4 text-amber-300" />
            <AlertDescription className="text-amber-200">
              <strong>TT System:</strong> All {circuits.filter(c => c.enabled).length} active circuits require RCD protection. 
              Earth electrode and bonding requirements apply to entire installation.
            </AlertDescription>
          </Alert>
        )}

        {hasSwimmingPoolRequirement && (
          <Alert className="bg-blue-500/10 border-blue-500/30">
            <Info className="h-4 w-4 text-blue-300" />
            <AlertDescription className="text-blue-200">
              <strong>Swimming Pool Installation:</strong> BS 7671 Section 702 applies. Zone classifications, 
              additional protection, and special earthing arrangements required for affected circuits.
            </AlertDescription>
          </Alert>
        )}

        {hasHazardousEnvironment && (
          <Alert className="bg-purple-500/10 border-purple-500/30">
            <AlertTriangle className="h-4 w-4 text-purple-300" />
            <AlertDescription className="text-purple-200">
              <strong>Hazardous Environment:</strong> Special cable types, increased protection ratings, 
              and additional safety measures required. Consider ATEX compliance where applicable.
            </AlertDescription>
          </Alert>
        )}

        {environmentalSettings.installationZones && environmentalSettings.installationZones.length > 1 && (
          <Alert className="bg-green-500/10 border-green-500/30">
            <Info className="h-4 w-4 text-green-300" />
            <AlertDescription className="text-green-200">
              <strong>Multi-Zone Installation:</strong> You have defined {environmentalSettings.installationZones.length} installation zones. 
              Each zone's environmental conditions will be applied to its assigned circuits during analysis.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Installation Summary */}
      <Card className="bg-elec-yellow/5 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center justify-center gap-2 text-center">
            <Shield className="h-5 w-5" />
            Environmental Configuration Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-6">
          <div className="grid grid-cols-2 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Global Temperature</div>
              <div className="text-2xl font-bold text-elec-yellow">{environmentalSettings.ambientTemperature}°C</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Earthing System</div>
              <div className="text-2xl font-bold text-blue-400">{environmentalSettings.earthingSystem}</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Installation Zones</div>
              <div className="text-2xl font-bold text-green-400">{environmentalSettings.installationZones?.length || 0}</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Active Circuits</div>
              <div className="text-2xl font-bold text-purple-400">{circuits.filter(c => c.enabled).length}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnvironmentStep;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { InstallPlanData } from "./types";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Zap, Settings, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getSimplifiedLoadTypeOptions, isLoadTypeSupported, SIMPLIFIED_CIRCUIT_TEMPLATES } from "./SimplifiedCircuitDefaults";

interface LoadTypeSelectionStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const LoadTypeSelectionStep = ({ planData, updatePlanData }: LoadTypeSelectionStepProps) => {
  const loadTypeOptions = getSimplifiedLoadTypeOptions(planData.installationType);
  const selectedTemplate = planData.loadType ? SIMPLIFIED_CIRCUIT_TEMPLATES[planData.loadType] : null;
  const isSupported = planData.loadType ? isLoadTypeSupported(planData.loadType) : true;

  const handleLoadTypeChange = (loadType: string) => {
    const template = SIMPLIFIED_CIRCUIT_TEMPLATES[loadType];
    if (template) {
      // Auto-populate with template defaults for bulletproof experience
      updatePlanData({
        loadType,
        totalLoad: template.totalLoad,
        voltage: template.voltage,
        phases: template.phases,
        powerFactor: template.powerFactor || 0.85,
        cableType: template.recommendedCableType,
        installationMethod: template.recommendedInstallationMethod,
        protectiveDevice: template.recommendedProtectiveDevice
      });
    } else {
      updatePlanData({ loadType });
    }
  };

  const getCategoryIcon = (installationType: string) => {
    switch (installationType) {
      case "domestic": return <Lightbulb className="h-5 w-5" />;
      case "commercial": return <Settings className="h-5 w-5" />;
      case "industrial": return <Zap className="h-5 w-5" />;
      default: return <Settings className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (installationType: string) => {
    switch (installationType) {
      case "domestic": return "bg-blue-500/20 text-blue-300";
      case "commercial": return "bg-purple-500/20 text-purple-300";
      case "industrial": return "bg-orange-500/20 text-orange-300";
      default: return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <div className="space-y-8">
      {/* Load Type Selection */}
      <MobileSelectWrapper
        label="Load Type"
        placeholder="Select the type of electrical load"
        value={planData.loadType || ""}
        onValueChange={handleLoadTypeChange}
        options={loadTypeOptions}
        hint={`Showing ${loadTypeOptions.length} bulletproof options for ${planData.installationType} installations`}
      />

      {/* Support Status */}
      {planData.loadType && (
        <Alert className={`${isSupported 
          ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30" 
          : "bg-gradient-to-r from-red-500/10 to-rose-500/10 border-red-500/30"
        } rounded-xl`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isSupported ? "bg-green-500/20" : "bg-red-500/20"}`}>
              {isSupported ? (
                <CheckCircle2 className="h-5 w-5 text-green-300" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-300" />
              )}
            </div>
            <AlertDescription className={isSupported ? "text-green-200" : "text-red-200"}>
              <div className="font-semibold mb-2">
                {isSupported ? "✓ Fully Supported Load Type" : "⚠ Limited Support"}
              </div>
              <div className="text-sm">
                {isSupported 
                  ? "This load type has bulletproof calculations with accurate cable sizing and compliance checks."
                  : "This load type may have limited template data. Consider selecting a supported alternative."
                }
              </div>
            </AlertDescription>
          </div>
        </Alert>
      )}

      {/* Template Preview */}
      {selectedTemplate && (
        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-blue-300 flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                {getCategoryIcon(planData.installationType || "")}
              </div>
              <div>
                <div className="text-lg">{selectedTemplate.name}</div>
                <div className="text-sm font-normal text-blue-200/80">Template defaults will be applied</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <div className="text-xs text-blue-200/70 uppercase tracking-wide mb-1">Typical Load</div>
                <div className="text-lg font-semibold text-blue-100">{selectedTemplate.totalLoad}W</div>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <div className="text-xs text-blue-200/70 uppercase tracking-wide mb-1">Supply</div>
                <div className="text-lg font-semibold text-blue-100">
                  {selectedTemplate.voltage}V {selectedTemplate.phases === "three" ? "3-Phase" : "1-Phase"}
                </div>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <div className="text-xs text-blue-200/70 uppercase tracking-wide mb-1">Cable Type</div>
                <div className="text-sm font-medium text-blue-100 capitalize">
                  {selectedTemplate.recommendedCableType.replace('-', ' ')}
                </div>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <div className="text-xs text-blue-200/70 uppercase tracking-wide mb-1">Installation</div>
                <div className="text-sm font-medium text-blue-100 capitalize">
                  {selectedTemplate.recommendedInstallationMethod.replace('-', ' ')}
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-500/5 rounded-lg">
              <div className="text-sm text-blue-200/90 mb-3">
                <span className="font-semibold">Description:</span> {selectedTemplate.description}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedTemplate.typicalApplications.map((app, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-blue-500/20 text-blue-200 border-blue-500/30"
                  >
                    {app}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Installation Type Badge */}
      {planData.installationType && (
        <div className="flex justify-center">
          <Badge className={`${getCategoryColor(planData.installationType)} border-0 px-4 py-2 text-sm`}>
            {getCategoryIcon(planData.installationType)}
            <span className="ml-2 capitalize">{planData.installationType} Installation</span>
          </Badge>
        </div>
      )}
    </div>
  );
};

export default LoadTypeSelectionStep;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { InstallPlanData } from "./types";
import { 
  Home, Building, Factory, Zap, Lightbulb, Fan, Microwave, 
  Hospital, School, ShoppingCart, Warehouse, Truck, Ship,
  Flame, Snowflake, Car, Cpu, Wind, Sun, AlertTriangle
} from "lucide-react";
import { getAvailableTemplatesForInstallationType, CIRCUIT_TEMPLATES } from "./CircuitDefaults";

interface InstallationTypeStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const InstallationTypeStep = ({ planData, updatePlanData }: InstallationTypeStepProps) => {
  // Simplified to 3 main installation categories that matter for calculations
  const installationTypes = [
    { value: "domestic", label: "Domestic", icon: Home, description: "Houses, flats, domestic properties" },
    { value: "commercial", label: "Commercial", icon: Building, description: "Offices, shops, public buildings" },
    { value: "industrial", label: "Industrial", icon: Factory, description: "Factories, warehouses, heavy industry" }
  ];

  // For multi-circuit mode, show installation purpose and environment selection
  if (planData.designMode === "multi") {
    // Installation purpose options
    const installationPurposeOptions = [
      { value: "new-installation", label: "New installation" },
      { value: "circuit-addition", label: "Circuit addition/extension" },
      { value: "system-upgrade", label: "System upgrade/replacement" },
      { value: "emergency-repair", label: "Emergency repair" },
      { value: "temporary-installation", label: "Temporary installation" },
      { value: "compliance-upgrade", label: "Compliance upgrade" }
    ];

    // Format options for dropdown
    const installationTypeOptions = installationTypes.map(type => ({
      value: type.value,
      label: type.label
    }));

    return (
      <div className="space-y-8">
        <MobileSelectWrapper
          label="Installation Purpose"
          placeholder="Select installation purpose"
          value={planData.installationPurpose || ""}
          onValueChange={(value) => updatePlanData({ installationPurpose: value })}
          options={installationPurposeOptions}
          hint="Choose the type of electrical work being performed"
        />

        <MobileSelectWrapper
          label="Installation Environment"
          placeholder="Select installation environment"
          value={planData.installationType || ""}
          onValueChange={(value) => updatePlanData({ installationType: value })}
          options={installationTypeOptions}
          hint="Choose the environment type that matches your installation location"
        />

        {planData.installationPurpose && planData.installationType && (
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-2 text-green-400">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Configuration Complete</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Helper function to map template keys to load type options with icons and categories
  const getLoadTypeFromTemplate = (templateKey: string) => {
    const template = CIRCUIT_TEMPLATES[templateKey];
    if (!template) return null;
    
    // Map template keys to appropriate icons and categories
    const getIconAndCategory = (key: string) => {
      if (key.includes('lighting')) return { icon: Lightbulb, category: "Lighting" };
      if (key.includes('power') || key.includes('socket')) return { icon: Zap, category: "Power" };
      if (key.includes('heating') || key.includes('heat-pump')) return { icon: Fan, category: "Heating" };
      if (key.includes('cooker') || key.includes('kitchen')) return { icon: Microwave, category: "Kitchen" };
      if (key.includes('motor') || key.includes('pump') || key.includes('fan')) return { icon: Fan, category: "Motors" };
      if (key.includes('hvac') || key.includes('cooling')) return { icon: Snowflake, category: "HVAC" };
      if (key.includes('welding') || key.includes('furnace') || key.includes('arc')) return { icon: Flame, category: "Industrial" };
      if (key.includes('crane') || key.includes('hoist')) return { icon: Warehouse, category: "Material Handling" };
      if (key.includes('ev') || key.includes('charging')) return { icon: Car, category: "Transport" };
      if (key.includes('emergency') || key.includes('fire')) return { icon: Zap, category: "Safety" };
      if (key.includes('it') || key.includes('server') || key.includes('ups') || key.includes('data')) return { icon: Cpu, category: "IT & Data" };
      if (key.includes('medical') || key.includes('hospital')) return { icon: Hospital, category: "Healthcare" };
      if (key.includes('solar') || key.includes('renewable') || key.includes('battery')) return { icon: Sun, category: "Renewable" };
      if (key.includes('grain') || key.includes('irrigation') || key.includes('livestock')) return { icon: Wind, category: "Agricultural" };
      if (key.includes('education') || key.includes('classroom') || key.includes('lab')) return { icon: School, category: "Educational" };
      if (key.includes('retail') || key.includes('pos') || key.includes('hospitality')) return { icon: ShoppingCart, category: "Commercial" };
      
      // Default fallback
      return { icon: Zap, category: "Specialised" };
    };
    
    const { icon, category } = getIconAndCategory(templateKey);
    
    return {
      value: templateKey,
      label: template.name,
      icon,
      description: template.description,
      category
    };
  };

  // Get context-aware load types based on installation environment
  const getAvailableLoadTypes = () => {
    if (!planData.installationType) {
      return []; // No load types available until installation type is selected
    }
    
    const availableTemplates = getAvailableTemplatesForInstallationType(planData.installationType);
    const loadTypes = availableTemplates
      .map(getLoadTypeFromTemplate)
      .filter(Boolean); // Remove any null entries
    
    return loadTypes;
  };

  const availableLoadTypes = getAvailableLoadTypes();

  // Format options for dropdowns
  const installationTypeOptions = installationTypes.map(type => ({
    value: type.value,
    label: type.label
  }));

  const loadTypeOptions = availableLoadTypes.map(load => ({
    value: load.value,
    label: load.label
  }));

  // Installation purpose options
  const installationPurposeOptions = [
    { value: "new-installation", label: "New installation" },
    { value: "circuit-addition", label: "Circuit addition/extension" },
    { value: "system-upgrade", label: "System upgrade/replacement" },
    { value: "emergency-repair", label: "Emergency repair" },
    { value: "temporary-installation", label: "Temporary installation" },
    { value: "compliance-upgrade", label: "Compliance upgrade" }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8">
        <MobileSelectWrapper
          label="Installation Purpose"
          placeholder="Select installation purpose"
          value={planData.installationPurpose || ""}
          onValueChange={(value) => updatePlanData({ installationPurpose: value })}
          options={installationPurposeOptions}
        />

        <MobileSelectWrapper
          label="Installation Environment"
          placeholder="Select installation environment"
          value={planData.installationType || ""}
          onValueChange={(value) => updatePlanData({ 
            installationType: value, 
            loadType: "" // Clear load type when installation type changes
          })}
          options={installationTypeOptions}
        />

        <MobileSelectWrapper
          label="Load Type & Specialisation"
          placeholder={planData.installationType ? "Select load type" : "Select installation environment first"}
          value={planData.loadType || ""}
          onValueChange={(value) => updatePlanData({ loadType: value })}
          options={loadTypeOptions}
          disabled={!planData.installationType || availableLoadTypes.length === 0}
          hint={planData.installationType ? 
            `Available load types for ${planData.installationType} installations` : 
            "Choose installation environment to see relevant load types"
          }
        />
      </div>

      {/* Show message when no load types are available */}
      {planData.installationType && availableLoadTypes.length === 0 && (
        <Card className="bg-amber-500/10 border-amber-500/30">
          <CardHeader>
            <CardTitle className="text-amber-300 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              No Load Types Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-200">
              No specific load types are defined for <strong>{planData.installationType}</strong> installations.
              You may need to select a different installation environment or contact support.
            </p>
          </CardContent>
        </Card>
      )}

      {planData.installationPurpose && planData.installationType && planData.loadType && (
        <Card className="bg-green-500/10 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Selection Complete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-200">
              You've selected a <strong>{planData.loadType}</strong> circuit for a{' '}
              <strong>{planData.installationType}</strong> installation. Click Next to continue with load details.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InstallationTypeStep;

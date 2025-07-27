
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid } from "lucide-react";
import { InstallPlanData, Circuit } from "./types";
import EnhancedCircuitTypeSelector from "./EnhancedCircuitTypeSelector";
import MobileInstallationTemplates from "./MobileInstallationTemplates";
import EnhancedMultiCircuitEditor from "./EnhancedMultiCircuitEditor";
import QuickActionButtons from "./QuickActionButtons";
import BulkCircuitActions from "./BulkCircuitActions";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { createCircuitFromTemplate, getAvailableTemplatesForInstallationType } from "./CircuitDefaults";

interface MultiCircuitManagerProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const MultiCircuitManager: React.FC<MultiCircuitManagerProps> = ({ 
  planData, 
  updatePlanData 
}) => {
  const [activeView, setActiveView] = useState("quick-actions");
  const circuits = planData.circuits || [];

  const viewOptions = [
    { value: "quick-actions", label: "Quick Add Circuits" },
    { value: "templates", label: "Use Installation Templates" },
    { value: "advanced", label: "Advanced Circuit Selection" },
    { value: "editor", label: "Configure Circuits" },
  ];

  const addCircuitFromType = (circuitType: string) => {
    try {
      const newCircuit = createCircuitFromTemplate(circuitType, planData.installationType);
      const updatedCircuits = [...circuits, newCircuit];
      updatePlanData({ circuits: updatedCircuits });
      setActiveView("editor");
    } catch (error) {
      console.error("Failed to create circuit from template:", error);
      // Fallback to basic circuit creation
      const basicCircuit: Circuit = {
        id: crypto.randomUUID(),
        name: `${circuitType.charAt(0).toUpperCase() + circuitType.slice(1)} Circuit`,
        loadType: circuitType,
        totalLoad: 1000,
        voltage: 230,
        phases: "single",
        cableLength: 30,
        installationMethod: planData.installationType === "industrial" ? "tray" : 
                           planData.installationType === "commercial" ? "trunking" : "clipped-direct",
        cableType: planData.installationType === "domestic" ? "t&e" : "swa",
        protectiveDevice: "mcb",
        enabled: true
      };
      const updatedCircuits = [...circuits, basicCircuit];
      updatePlanData({ circuits: updatedCircuits });
      setActiveView("editor");
    }
  };

  const removeLastCircuit = () => {
    if (circuits.length > 0) {
      const updatedCircuits = circuits.slice(0, -1);
      updatePlanData({ circuits: updatedCircuits });
    }
  };

  const applyTemplate = (templateCircuits: Circuit[]) => {
    updatePlanData({ circuits: templateCircuits });
    setActiveView("editor");
  };

  const updateCircuits = (updatedCircuits: Circuit[]) => {
    updatePlanData({ circuits: updatedCircuits });
  };

  const canProceed = circuits.length > 0 && circuits.some(c => c.enabled);

  return (
    <div className="space-y-6">
      <MobileSelectWrapper
        label="Circuit Design Action"
        placeholder="Select an action"
        value={activeView}
        onValueChange={setActiveView}
        options={viewOptions}
      />

      <div className="mt-6">
        {activeView === "quick-actions" && (
          <div className="space-y-6">
            <QuickActionButtons
              circuits={circuits}
              onAddCircuit={addCircuitFromType}
              onRemoveLastCircuit={removeLastCircuit}
              onUseTemplate={() => setActiveView("templates")}
              installationType={planData.installationType}
            />
            
            {circuits.length > 1 && (
              <BulkCircuitActions
                circuits={circuits}
                onUpdateCircuits={updateCircuits}
                installationType={planData.installationType}
              />
            )}
          </div>
        )}

        {activeView === "templates" && (
          <MobileInstallationTemplates 
            installationType={planData.installationType}
            onApplyTemplate={applyTemplate}
          />
        )}

        {activeView === "advanced" && (
          <EnhancedCircuitTypeSelector 
            onAddCircuit={addCircuitFromType}
            existingCircuits={circuits}
            installationType={planData.installationType}
          />
        )}

        {activeView === "editor" && (
          circuits.length > 0 ? (
            <EnhancedMultiCircuitEditor 
              circuits={circuits}
              onUpdateCircuits={updateCircuits}
              installationType={planData.installationType}
            />
          ) : (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardContent className="text-center py-12">
                <Grid className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Circuits Added</h3>
                <p className="text-muted-foreground mb-4">
                  Start by adding circuits using the dropdown above.
                </p>
              </CardContent>
            </Card>
          )
        )}
      </div>

      {/* Progress Indicator */}
      {canProceed && (
        <Card className="bg-green-500/10 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <Grid className="h-5 w-5" />
              Multi-Circuit Design Ready
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-200">
              You have configured {circuits.filter(c => c.enabled).length} active circuits with accurate BS 7671 defaults. 
              Click Next to proceed with environmental settings and comprehensive analysis.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MultiCircuitManager;

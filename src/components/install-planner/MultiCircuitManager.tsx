
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid } from "lucide-react";
import { InstallPlanData, Circuit } from "./types";
import CircuitTypeSelector from "./CircuitTypeSelector";
import MobileInstallationTemplates from "./MobileInstallationTemplates";
import EnhancedMultiCircuitEditor from "./EnhancedMultiCircuitEditor";
import QuickActionButtons from "./QuickActionButtons";
import BulkCircuitActions from "./BulkCircuitActions";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { SIMPLIFIED_CIRCUIT_TEMPLATES } from "./SimplifiedCircuitDefaults";

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
    const template = SIMPLIFIED_CIRCUIT_TEMPLATES[circuitType as keyof typeof SIMPLIFIED_CIRCUIT_TEMPLATES];
    const newCircuit: Circuit = template ? {
      id: crypto.randomUUID(),
      name: `Circuit ${circuits.length + 1}`,
      enabled: true,
      loadType: circuitType,
      totalLoad: template.totalLoad,
      voltage: template.voltage,
      phases: template.phases,
      powerFactor: template.powerFactor,
      cableType: template.recommendedCableType,
      cableLength: template.cableLength,
      installationMethod: template.recommendedInstallationMethod,
      protectiveDevice: template.recommendedProtectiveDevice
    } : {
      id: crypto.randomUUID(),
      name: `Circuit ${circuits.length + 1}`,
      enabled: true,
      loadType: circuitType,
      totalLoad: 3000,
      voltage: 230,
      phases: "single",
      powerFactor: 0.95,
      cableType: "pvc-twin-earth",
      cableLength: 20,
      installationMethod: "clips-direct-on-surface",
      protectiveDevice: "mcb-b"
    };

    const updatedCircuits = [...circuits, newCircuit];
    updatePlanData({ circuits: updatedCircuits });
    setActiveView("editor");
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
          <CircuitTypeSelector 
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
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 text-green-400">
            <Grid className="h-4 w-4" />
            <span className="text-sm font-medium">Circuits Configured</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiCircuitManager;

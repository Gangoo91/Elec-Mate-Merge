
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Grid, Plus, Settings, Download } from "lucide-react";
import { InstallPlanData, Circuit } from "./types";
import CircuitTypeSelector from "./CircuitTypeSelector";
import InstallationTemplates from "./InstallationTemplates";
import MultiCircuitEditor from "./MultiCircuitEditor";
import { v4 as uuidv4 } from "uuid";

interface MultiCircuitManagerProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const MultiCircuitManager: React.FC<MultiCircuitManagerProps> = ({ 
  planData, 
  updatePlanData 
}) => {
  const [activeTab, setActiveTab] = useState("templates");
  const circuits = planData.circuits || [];

  const addCircuitFromType = (circuitType: string) => {
    const circuitDefaults = {
      lighting: { name: "Lighting Circuit", totalLoad: 800, voltage: 230, phases: "single" as const, cableLength: 25 },
      power: { name: "Power Circuit", totalLoad: 2300, voltage: 230, phases: "single" as const, cableLength: 30 },
      cooker: { name: "Cooker Circuit", totalLoad: 7000, voltage: 230, phases: "single" as const, cableLength: 15 },
      heating: { name: "Heating Circuit", totalLoad: 3000, voltage: 230, phases: "single" as const, cableLength: 20 },
      "ev-charging": { name: "EV Charging", totalLoad: 7400, voltage: 230, phases: "single" as const, cableLength: 25 },
      hvac: { name: "HVAC System", totalLoad: 8000, voltage: 400, phases: "three" as const, cableLength: 30 },
      "it-equipment": { name: "IT Equipment", totalLoad: 3000, voltage: 230, phases: "single" as const, cableLength: 40 },
      emergency: { name: "Emergency Systems", totalLoad: 1000, voltage: 230, phases: "single" as const, cableLength: 50 },
      motor: { name: "Motor Load", totalLoad: 15000, voltage: 400, phases: "three" as const, cableLength: 50 },
      welding: { name: "Welding Equipment", totalLoad: 12000, voltage: 400, phases: "three" as const, cableLength: 20 },
      crane: { name: "Crane & Hoist", totalLoad: 25000, voltage: 400, phases: "three" as const, cableLength: 75 },
      furnace: { name: "Industrial Furnace", totalLoad: 50000, voltage: 400, phases: "three" as const, cableLength: 30 },
      medical: { name: "Medical Equipment", totalLoad: 5000, voltage: 230, phases: "single" as const, cableLength: 35 }
    };

    const defaults = circuitDefaults[circuitType as keyof typeof circuitDefaults] || circuitDefaults.power;
    
    const newCircuit: Circuit = {
      id: uuidv4(),
      loadType: circuitType,
      installationMethod: planData.installationType === "industrial" ? "tray" : 
                         planData.installationType === "commercial" ? "trunking" : "clipped-direct",
      cableType: planData.installationType === "domestic" ? "t&e" : "swa",
      protectiveDevice: circuitType === "lighting" ? "mcb" : "rcbo",
      enabled: true,
      ...defaults
    };

    const updatedCircuits = [...circuits, newCircuit];
    updatePlanData({ circuits: updatedCircuits });
    setActiveTab("editor");
  };

  const applyTemplate = (templateCircuits: Circuit[]) => {
    updatePlanData({ circuits: templateCircuits });
    setActiveTab("editor");
  };

  const updateCircuits = (updatedCircuits: Circuit[]) => {
    updatePlanData({ circuits: updatedCircuits });
  };

  const canProceed = circuits.length > 0 && circuits.some(c => c.enabled);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Multi-Circuit Installation Design</h2>
          <p className="text-muted-foreground">
            Design multiple circuits for your {planData.installationType} installation.
          </p>
        </div>
        <Badge variant="outline" className="border-blue-400/30 text-blue-400">
          {circuits.filter(c => c.enabled).length} Active Circuits
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-elec-dark border border-elec-yellow/20">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="add-circuits" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Circuits
          </TabsTrigger>
          <TabsTrigger value="editor" className="flex items-center gap-2" disabled={circuits.length === 0}>
            <Settings className="h-4 w-4" />
            Configure Circuits
            {circuits.length > 0 && (
              <Badge variant="secondary" className="ml-1 bg-elec-yellow/20 text-elec-yellow">
                {circuits.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="templates">
            <InstallationTemplates 
              installationType={planData.installationType}
              onApplyTemplate={applyTemplate}
            />
          </TabsContent>

          <TabsContent value="add-circuits">
            <CircuitTypeSelector 
              onAddCircuit={addCircuitFromType}
              existingCircuits={circuits}
              installationType={planData.installationType}
            />
          </TabsContent>

          <TabsContent value="editor">
            {circuits.length > 0 ? (
              <MultiCircuitEditor 
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
                    Start by using a template or adding individual circuits.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab("templates")}
                      className="border-elec-yellow/30 hover:bg-elec-yellow/10"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("add-circuits")}
                      className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Circuits
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </div>
      </Tabs>

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
              You have configured {circuits.filter(c => c.enabled).length} active circuits. 
              Click Next to proceed with environmental settings and analysis.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MultiCircuitManager;

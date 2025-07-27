
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Zap, Cable } from "lucide-react";
import { Circuit } from "./types";
import CircuitControls from "./CircuitControls";

interface MultiCircuitEditorProps {
  circuits: Circuit[];
  onUpdateCircuits: (circuits: Circuit[]) => void;
  installationType: string;
}

const MultiCircuitEditor: React.FC<MultiCircuitEditorProps> = ({ 
  circuits, 
  onUpdateCircuits,
  installationType 
}) => {
  const [expandedCircuit, setExpandedCircuit] = useState<string | null>(null);

  const updateCircuit = (id: string, updates: Partial<Circuit>) => {
    const updatedCircuits = circuits.map(circuit => 
      circuit.id === id ? { ...circuit, ...updates } : circuit
    );
    onUpdateCircuits(updatedCircuits);
  };

  const deleteCircuit = (id: string) => {
    const updatedCircuits = circuits.filter(circuit => circuit.id !== id);
    onUpdateCircuits(updatedCircuits);
    if (expandedCircuit === id) {
      setExpandedCircuit(null);
    }
  };

  const duplicateCircuit = (circuit: Circuit) => {
    const newCircuit: Circuit = {
      ...circuit,
      id: crypto.randomUUID(),
      name: `${circuit.name} (Copy)`
    };
    const updatedCircuits = [...circuits, newCircuit];
    onUpdateCircuits(updatedCircuits);
  };

  const toggleExpanded = (id: string) => {
    setExpandedCircuit(expandedCircuit === id ? null : id);
  };

  const getLoadTypeIcon = (loadType: string) => {
    switch (loadType) {
      case "lighting": return "LT";
      case "power": return "PW";
      case "cooker": return "CK";
      case "shower": return "SH";
      case "heating": return "HT";
      case "ev-charging": return "EV";
      case "motor-small": return "MS";
      case "motor-large": return "ML";
      case "motor": return "MT";
      case "hvac": return "AC";
      case "it-equipment": return "IT";
      case "commercial-lighting": return "CL";
      case "commercial-power": return "CP";
      case "emergency": return "EM";
      case "medical": return "MD";
      case "welding": return "WD";
      case "crane": return "CR";
      case "furnace": return "FN";
      default: return "GN";
    }
  };

  if (circuits.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Circuit Configuration</h3>
        <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
          {circuits.filter(c => c.enabled).length} / {circuits.length} Active
        </Badge>
      </div>

      <div className="space-y-4">
        {circuits.map((circuit) => (
          <Card key={circuit.id} className={`border-2 transition-all ${
            circuit.enabled ? 'border-elec-yellow/30 bg-elec-gray' : 'border-gray-600/30 bg-gray-800/30'
          }`}>
            <CardHeader 
              className="cursor-pointer"
              onClick={() => toggleExpanded(circuit.id)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="h-10 w-10 rounded bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <div className="text-xs font-bold text-elec-yellow">{getLoadTypeIcon(circuit.loadType)}</div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base">
                      {circuit.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {circuit.totalLoad}W • {circuit.voltage}V • {circuit.cableLength}m
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <CircuitControls
                    circuit={circuit}
                    onToggleEnabled={(enabled) => updateCircuit(circuit.id, { enabled })}
                    onDuplicate={() => duplicateCircuit(circuit)}
                    onDelete={() => deleteCircuit(circuit.id)}
                    onToggleExpanded={() => toggleExpanded(circuit.id)}
                    isExpanded={expandedCircuit === circuit.id}
                    canDelete={circuits.length > 1}
                  />
                </div>
              </div>
            </CardHeader>

            {expandedCircuit === circuit.id && (
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Settings */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-elec-yellow flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Circuit Details
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`name-${circuit.id}`}>Circuit Name</Label>
                        <Input
                          id={`name-${circuit.id}`}
                          value={circuit.name}
                          onChange={(e) => updateCircuit(circuit.id, { name: e.target.value })}
                          className="bg-elec-dark border-elec-yellow/30"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`load-${circuit.id}`}>Total Load (W)</Label>
                        <Input
                          id={`load-${circuit.id}`}
                          type="number"
                          value={circuit.totalLoad}
                          onChange={(e) => updateCircuit(circuit.id, { totalLoad: Number(e.target.value) })}
                          className="bg-elec-dark border-elec-yellow/30"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <MobileSelectWrapper
                            label="Voltage (V)"
                            value={circuit.voltage.toString()}
                            onValueChange={(value) => updateCircuit(circuit.id, { voltage: Number(value) })}
                            options={[
                              { value: "230", label: "230V" },
                              { value: "400", label: "400V" }
                            ]}
                          />
                        </div>

                        <div>
                          <MobileSelectWrapper
                            label="Phases"
                            value={circuit.phases}
                            onValueChange={(value: "single" | "three") => updateCircuit(circuit.id, { phases: value })}
                            options={[
                              { value: "single", label: "Single" },
                              { value: "three", label: "Three" }
                            ]}
                          />
                        </div>
                      </div>

                      {circuit.phases === "three" && (
                        <div>
                          <Label htmlFor={`pf-${circuit.id}`}>Power Factor</Label>
                          <Input
                            id={`pf-${circuit.id}`}
                            type="number"
                            step="0.01"
                            min="0.1"
                            max="1"
                            value={circuit.powerFactor || 0.85}
                            onChange={(e) => updateCircuit(circuit.id, { powerFactor: Number(e.target.value) })}
                            className="bg-elec-dark border-elec-yellow/30"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Installation Settings */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-elec-yellow flex items-center gap-2">
                      <Cable className="h-4 w-4" />
                      Installation Details
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`length-${circuit.id}`}>Cable Length (m)</Label>
                        <Input
                          id={`length-${circuit.id}`}
                          type="number"
                          value={circuit.cableLength}
                          onChange={(e) => updateCircuit(circuit.id, { cableLength: Number(e.target.value) })}
                          className="bg-elec-dark border-elec-yellow/30"
                        />
                      </div>

                      <div>
                        <MobileSelectWrapper
                          label="Installation Method"
                          value={circuit.installationMethod}
                          onValueChange={(value) => updateCircuit(circuit.id, { installationMethod: value })}
                          options={[
                            { value: "clipped-direct", label: "Clipped Direct (BS7671: C)" },
                            { value: "enclosed-conduit", label: "Enclosed in Conduit (BS7671: A1)" },
                            { value: "trunking", label: "Trunking (BS7671: B1)" },
                            { value: "conduit", label: "Surface Conduit (BS7671: A2)" },
                            { value: "tray", label: "Cable Tray (BS7671: E)" },
                            { value: "ladder", label: "Cable Ladder (BS7671: F)" },
                            { value: "basket", label: "Cable Basket (BS7671: G)" },
                            { value: "buried-direct", label: "Buried Direct (BS7671: D1)" },
                            { value: "ducted", label: "Ducted Underground (BS7671: D2)" },
                            { value: "touching-wall", label: "Touching Wall (BS7671: C)" },
                            { value: "spaced-from-wall", label: "Spaced from Wall (BS7671: C)" },
                            { value: "in-air", label: "Free Air (BS7671: E, F, G)" }
                          ]}
                        />
                      </div>

                      <div>
                        <MobileSelectWrapper
                          label="Cable Type"
                          value={circuit.cableType}
                          onValueChange={(value) => updateCircuit(circuit.id, { cableType: value })}
                          options={[
                            { value: "t&e", label: "Twin & Earth (T&E) - BS7671 Table 4E4A" },
                            { value: "swa", label: "Steel Wire Armoured (SWA) - BS7671 Table 4E1A" },
                            { value: "xlpe", label: "XLPE Single Core - BS7671 Table 4E1A" },
                            { value: "pvc-single", label: "PVC Single Core - BS7671 Table 4E2A" },
                            { value: "pvc-multicore", label: "PVC Multicore - BS7671 Table 4E3A" },
                            { value: "mineral", label: "Mineral Insulated - BS7671 Table 4J1A" },
                            { value: "aluminium", label: "Aluminium Conductor - BS7671 Table 4E5A" },
                            { value: "lsf", label: "Low Smoke & Fume (LSF)" },
                            { value: "lszh", label: "Low Smoke Zero Halogen (LSZH)" },
                            { value: "fire-resistant", label: "Fire Resistant Cable" },
                            { value: "data-cable", label: "Data/Communications Cable" }
                          ]}
                        />
                      </div>

                      <div>
                        <MobileSelectWrapper
                          label="Protective Device"
                          value={circuit.protectiveDevice}
                          onValueChange={(value) => updateCircuit(circuit.id, { protectiveDevice: value })}
                          options={[
                            { value: "mcb-b", label: "MCB Type B (3-5 x In)" },
                            { value: "mcb-c", label: "MCB Type C (5-10 x In)" },
                            { value: "mcb-d", label: "MCB Type D (10-20 x In)" },
                            { value: "rcbo-b", label: "RCBO Type B (30mA)" },
                            { value: "rcbo-c", label: "RCBO Type C (30mA)" },
                            { value: "rcbo-100ma", label: "RCBO 100mA (Fire Protection)" },
                            { value: "rcd-30ma", label: "RCD 30mA + MCB" },
                            { value: "rcd-100ma", label: "RCD 100mA + MCB" },
                            { value: "afdd", label: "AFDD (Arc Fault Device)" },
                            { value: "spd", label: "SPD (Surge Protection)" },
                            { value: "fuse-bs88", label: "BS88 Fuse" },
                            { value: "mccb", label: "MCCB (Moulded Case)" }
                          ]}
                        />
                      </div>

                      <div>
                        <Label htmlFor={`notes-${circuit.id}`}>Notes (Optional)</Label>
                        <Textarea
                          id={`notes-${circuit.id}`}
                          value={circuit.notes || ""}
                          onChange={(e) => updateCircuit(circuit.id, { notes: e.target.value })}
                          className="bg-elec-dark border-elec-yellow/30"
                          placeholder="Additional notes or requirements..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MultiCircuitEditor;

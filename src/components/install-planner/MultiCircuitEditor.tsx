
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Copy, Settings, Zap, Cable } from "lucide-react";
import { Circuit } from "./types";
import { v4 as uuidv4 } from "uuid";

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
      id: uuidv4(),
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
      case "lighting": return "💡";
      case "power": return "🔌";
      case "cooker": return "🍳";
      case "heating": return "🔥";
      case "ev-charging": return "🚗";
      case "motor": return "⚙️";
      case "hvac": return "❄️";
      case "it-equipment": return "💻";
      case "emergency": return "🚨";
      case "medical": return "🏥";
      default: return "⚡";
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getLoadTypeIcon(circuit.loadType)}</div>
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {circuit.name}
                      {!circuit.enabled && (
                        <Badge variant="outline" className="border-gray-600/30 text-gray-400">
                          Disabled
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {circuit.totalLoad}W • {circuit.voltage}V • {circuit.cableLength}m
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={circuit.enabled}
                    onCheckedChange={(enabled) => updateCircuit(circuit.id, { enabled })}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpanded(circuit.id);
                    }}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {expandedCircuit === circuit.id && (
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor={`voltage-${circuit.id}`}>Voltage (V)</Label>
                          <Select 
                            value={circuit.voltage.toString()} 
                            onValueChange={(value) => updateCircuit(circuit.id, { voltage: Number(value) })}
                          >
                            <SelectTrigger className="bg-elec-dark border-elec-yellow/30">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-elec-dark border-elec-yellow/20">
                              <SelectItem value="230">230V</SelectItem>
                              <SelectItem value="400">400V</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor={`phases-${circuit.id}`}>Phases</Label>
                          <Select 
                            value={circuit.phases} 
                            onValueChange={(value: "single" | "three") => updateCircuit(circuit.id, { phases: value })}
                          >
                            <SelectTrigger className="bg-elec-dark border-elec-yellow/30">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-elec-dark border-elec-yellow/20">
                              <SelectItem value="single">Single</SelectItem>
                              <SelectItem value="three">Three</SelectItem>
                            </SelectContent>
                          </Select>
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
                        <Label htmlFor={`method-${circuit.id}`}>Installation Method</Label>
                        <Select 
                          value={circuit.installationMethod} 
                          onValueChange={(value) => updateCircuit(circuit.id, { installationMethod: value })}
                        >
                          <SelectTrigger className="bg-elec-dark border-elec-yellow/30">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-elec-dark border-elec-yellow/20">
                            <SelectItem value="clipped-direct">Clipped Direct</SelectItem>
                            <SelectItem value="trunking">Trunking</SelectItem>
                            <SelectItem value="conduit">Conduit</SelectItem>
                            <SelectItem value="tray">Cable Tray</SelectItem>
                            <SelectItem value="buried-direct">Buried Direct</SelectItem>
                            <SelectItem value="ducted">Ducted</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor={`cable-type-${circuit.id}`}>Cable Type</Label>
                        <Select 
                          value={circuit.cableType} 
                          onValueChange={(value) => updateCircuit(circuit.id, { cableType: value })}
                        >
                          <SelectTrigger className="bg-elec-dark border-elec-yellow/30">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-elec-dark border-elec-yellow/20">
                            <SelectItem value="t&e">T&E (Twin & Earth)</SelectItem>
                            <SelectItem value="swa">SWA (Steel Wire Armoured)</SelectItem>
                            <SelectItem value="xlpe">XLPE (Cross-linked Polyethylene)</SelectItem>
                            <SelectItem value="pvc">PVC (Single Core)</SelectItem>
                            <SelectItem value="mineral">Mineral Insulated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor={`protection-${circuit.id}`}>Protective Device</Label>
                        <Select 
                          value={circuit.protectiveDevice} 
                          onValueChange={(value) => updateCircuit(circuit.id, { protectiveDevice: value })}
                        >
                          <SelectTrigger className="bg-elec-dark border-elec-yellow/30">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-elec-dark border-elec-yellow/20">
                            <SelectItem value="mcb">MCB</SelectItem>
                            <SelectItem value="rcbo">RCBO</SelectItem>
                            <SelectItem value="rcd">RCD + MCB</SelectItem>
                          </SelectContent>
                        </Select>
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

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-elec-yellow/10">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => duplicateCircuit(circuit)}
                    className="border-elec-yellow/30 hover:bg-elec-yellow/10"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteCircuit(circuit.id)}
                    className="border-red-400/30 text-red-400 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
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


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus, Copy, Edit, Power, Zap, Cable } from "lucide-react";
import { Circuit, InstallPlanData } from "./types";
import { toast } from "@/hooks/use-toast";

interface MultiCircuitManagerProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const MultiCircuitManager: React.FC<MultiCircuitManagerProps> = ({ 
  planData, 
  updatePlanData 
}) => {
  const [editingCircuit, setEditingCircuit] = useState<string | null>(null);

  const circuits = planData.circuits || [];

  const loadTypes = [
    "lighting", "power", "heating", "cooker", "shower", "immersion",
    "motor", "ev-charging", "socket-outlets", "fixed-appliance", "other"
  ];

  const installationMethods = [
    "surface-clipping", "conduit", "trunking", "buried-direct",
    "ducting", "cable-tray", "basket-tray", "overhead"
  ];

  const cableTypes = [
    "pvc", "xlpe", "lsf", "lszh", "swa", "micc", "fep"
  ];

  const protectiveDevices = [
    "mcb-b", "mcb-c", "mcb-d", "rcbo-b", "rcbo-c", "fuse-bs88", "fuse-bs1361"
  ];

  const generateCircuitId = () => {
    return `circuit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const createNewCircuit = (): Circuit => ({
    id: generateCircuitId(),
    name: `Circuit ${circuits.length + 1}`,
    loadType: "lighting",
    totalLoad: 1000,
    voltage: planData.voltage,
    phases: "single",
    powerFactor: 0.85,
    cableLength: 20,
    installationMethod: planData.installationMethod || "surface-clipping",
    cableType: planData.cableType || "pvc",
    protectiveDevice: "mcb-b",
    enabled: true,
    notes: ""
  });

  const addCircuit = () => {
    const newCircuit = createNewCircuit();
    const updatedCircuits = [...circuits, newCircuit];
    updatePlanData({ circuits: updatedCircuits });
    setEditingCircuit(newCircuit.id);
    
    toast({
      title: "Circuit Added",
      description: `${newCircuit.name} has been added to the installation plan.`
    });
  };

  const duplicateCircuit = (circuit: Circuit) => {
    const duplicatedCircuit: Circuit = {
      ...circuit,
      id: generateCircuitId(),
      name: `${circuit.name} (Copy)`
    };
    const updatedCircuits = [...circuits, duplicatedCircuit];
    updatePlanData({ circuits: updatedCircuits });
    
    toast({
      title: "Circuit Duplicated",
      description: `${duplicatedCircuit.name} has been created.`
    });
  };

  const removeCircuit = (circuitId: string) => {
    const circuit = circuits.find(c => c.id === circuitId);
    const updatedCircuits = circuits.filter(c => c.id !== circuitId);
    updatePlanData({ circuits: updatedCircuits });
    
    if (editingCircuit === circuitId) {
      setEditingCircuit(null);
    }
    
    toast({
      title: "Circuit Removed",
      description: `${circuit?.name || 'Circuit'} has been removed from the installation plan.`
    });
  };

  const updateCircuit = (circuitId: string, updates: Partial<Circuit>) => {
    const updatedCircuits = circuits.map(circuit =>
      circuit.id === circuitId ? { ...circuit, ...updates } : circuit
    );
    updatePlanData({ circuits: updatedCircuits });
  };

  const toggleCircuit = (circuitId: string) => {
    updateCircuit(circuitId, { 
      enabled: !circuits.find(c => c.id === circuitId)?.enabled 
    });
  };

  const getCircuitIcon = (loadType: string) => {
    switch (loadType) {
      case "lighting": return "💡";
      case "power": return "🔌";
      case "heating": return "🔥";
      case "cooker": return "🍳";
      case "ev-charging": return "🚗";
      case "motor": return "⚙️";
      default: return "⚡";
    }
  };

  const getTotalSystemLoad = () => {
    return circuits
      .filter(c => c.enabled)
      .reduce((total, circuit) => total + circuit.totalLoad, 0);
  };

  const getEnabledCircuitsCount = () => {
    return circuits.filter(c => c.enabled).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Multi-Circuit Installation Planner</h2>
          <p className="text-muted-foreground">
            Design and analyse multiple electrical circuits for comprehensive installation planning.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
            {getEnabledCircuitsCount()} Active Circuits
          </Badge>
          <Badge variant="outline" className="border-green-400/30 text-green-400">
            {(getTotalSystemLoad() / 1000).toFixed(1)}kW Total
          </Badge>
        </div>
      </div>

      {/* System Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Power className="h-5 w-5 text-elec-yellow" />
            System Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
              <div className="text-2xl font-bold text-elec-yellow">{circuits.length}</div>
              <div className="text-sm text-muted-foreground">Total Circuits</div>
            </div>
            <div className="text-center p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
              <div className="text-2xl font-bold text-green-400">{getEnabledCircuitsCount()}</div>
              <div className="text-sm text-muted-foreground">Active Circuits</div>
            </div>
            <div className="text-center p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
              <div className="text-2xl font-bold text-blue-400">{(getTotalSystemLoad() / 1000).toFixed(1)}kW</div>
              <div className="text-sm text-muted-foreground">Total Load</div>
            </div>
            <div className="text-center p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
              <div className="text-2xl font-bold text-amber-400">{planData.voltage}V</div>
              <div className="text-sm text-muted-foreground">System Voltage</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Circuits List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Circuit Configuration</h3>
          <Button onClick={addCircuit} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Circuit
          </Button>
        </div>

        {circuits.length === 0 ? (
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="text-center py-12">
              <Cable className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Circuits Defined</h3>
              <p className="text-muted-foreground mb-4">
                Start building your installation by adding electrical circuits.
              </p>
              <Button onClick={addCircuit} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Circuit
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {circuits.map((circuit) => (
              <Card 
                key={circuit.id} 
                className={`border-elec-yellow/20 bg-elec-gray transition-all ${
                  !circuit.enabled ? 'opacity-60' : ''
                } ${editingCircuit === circuit.id ? 'ring-2 ring-elec-yellow/50' : ''}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={circuit.enabled}
                        onCheckedChange={() => toggleCircuit(circuit.id)}
                        className="border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getCircuitIcon(circuit.loadType)}</span>
                        <div>
                          <h4 className="font-semibold">{circuit.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {circuit.loadType} • {circuit.totalLoad}W • {circuit.cableLength}m
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={circuit.enabled ? 'border-green-400/30 text-green-400' : 'border-red-400/30 text-red-400'}
                      >
                        {circuit.enabled ? 'Active' : 'Disabled'}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingCircuit(editingCircuit === circuit.id ? null : circuit.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => duplicateCircuit(circuit)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCircuit(circuit.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {editingCircuit === circuit.id && (
                  <CardContent className="border-t border-elec-yellow/20 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`name-${circuit.id}`}>Circuit Name</Label>
                        <Input
                          id={`name-${circuit.id}`}
                          value={circuit.name}
                          onChange={(e) => updateCircuit(circuit.id, { name: e.target.value })}
                          className="bg-elec-dark border-elec-yellow/20 mt-1"
                        />
                      </div>

                      <div>
                        <Label>Load Type</Label>
                        <Select 
                          value={circuit.loadType} 
                          onValueChange={(value) => updateCircuit(circuit.id, { loadType: value })}
                        >
                          <SelectTrigger className="bg-elec-dark border-elec-yellow/20 mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-elec-dark border-elec-yellow/20">
                            {loadTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor={`load-${circuit.id}`}>Total Load (W)</Label>
                        <Input
                          id={`load-${circuit.id}`}
                          type="number"
                          value={circuit.totalLoad}
                          onChange={(e) => updateCircuit(circuit.id, { totalLoad: parseInt(e.target.value) || 0 })}
                          className="bg-elec-dark border-elec-yellow/20 mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`length-${circuit.id}`}>Cable Length (m)</Label>
                        <Input
                          id={`length-${circuit.id}`}
                          type="number"
                          value={circuit.cableLength}
                          onChange={(e) => updateCircuit(circuit.id, { cableLength: parseInt(e.target.value) || 0 })}
                          className="bg-elec-dark border-elec-yellow/20 mt-1"
                        />
                      </div>

                      <div>
                        <Label>Installation Method</Label>
                        <Select 
                          value={circuit.installationMethod} 
                          onValueChange={(value) => updateCircuit(circuit.id, { installationMethod: value })}
                        >
                          <SelectTrigger className="bg-elec-dark border-elec-yellow/20 mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-elec-dark border-elec-yellow/20">
                            {installationMethods.map((method) => (
                              <SelectItem key={method} value={method}>
                                {method.charAt(0).toUpperCase() + method.slice(1).replace('-', ' ')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Cable Type</Label>
                        <Select 
                          value={circuit.cableType} 
                          onValueChange={(value) => updateCircuit(circuit.id, { cableType: value })}
                        >
                          <SelectTrigger className="bg-elec-dark border-elec-yellow/20 mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-elec-dark border-elec-yellow/20">
                            {cableTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.toUpperCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Protective Device</Label>
                        <Select 
                          value={circuit.protectiveDevice} 
                          onValueChange={(value) => updateCircuit(circuit.id, { protectiveDevice: value })}
                        >
                          <SelectTrigger className="bg-elec-dark border-elec-yellow/20 mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-elec-dark border-elec-yellow/20">
                            {protectiveDevices.map((device) => (
                              <SelectItem key={device} value={device}>
                                {device.toUpperCase().replace('-', ' ')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Phases</Label>
                        <Select 
                          value={circuit.phases} 
                          onValueChange={(value: "single" | "three") => updateCircuit(circuit.id, { phases: value })}
                        >
                          <SelectTrigger className="bg-elec-dark border-elec-yellow/20 mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-elec-dark border-elec-yellow/20">
                            <SelectItem value="single">Single Phase</SelectItem>
                            <SelectItem value="three">Three Phase</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="md:col-span-2 lg:col-span-1">
                        <Label htmlFor={`pf-${circuit.id}`}>Power Factor</Label>
                        <Input
                          id={`pf-${circuit.id}`}
                          type="number"
                          step="0.01"
                          min="0.1"
                          max="1"
                          value={circuit.powerFactor}
                          onChange={(e) => updateCircuit(circuit.id, { powerFactor: parseFloat(e.target.value) || 0.85 })}
                          className="bg-elec-dark border-elec-yellow/20 mt-1"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor={`notes-${circuit.id}`}>Circuit Notes</Label>
                      <Input
                        id={`notes-${circuit.id}`}
                        value={circuit.notes || ""}
                        onChange={(e) => updateCircuit(circuit.id, { notes: e.target.value })}
                        placeholder="Additional notes or specifications..."
                        className="bg-elec-dark border-elec-yellow/20 mt-1"
                      />
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiCircuitManager;


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Cable, Shield, Settings, Eye, EyeOff, Power, Grid } from "lucide-react";
import { InstallPlanData, Circuit } from "./types";

interface VisualCircuitDesignerProps {
  planData: InstallPlanData;
  recommendedCable?: {
    size: string;
    ratedCurrent: number;
  };
}

const VisualCircuitDesigner: React.FC<VisualCircuitDesignerProps> = ({ 
  planData, 
  recommendedCable 
}) => {
  const [showLabels, setShowLabels] = useState(true);
  const [highlightComponent, setHighlightComponent] = useState<string | null>(null);
  const [selectedCircuit, setSelectedCircuit] = useState<string | null>(null);

  const isMultiCircuit = planData.designMode === "multi";
  const activeCircuits = planData.circuits?.filter(c => c.enabled) || [];
  
  // For single circuit mode, create a circuit object from plan data
  const singleCircuitData: Circuit = {
    id: "single",
    name: "Main Circuit",
    loadType: planData.loadType,
    totalLoad: planData.totalLoad,
    voltage: planData.voltage,
    phases: planData.phases,
    cableLength: planData.cableLength,
    installationMethod: planData.installationMethod,
    cableType: planData.cableType,
    protectiveDevice: planData.protectiveDevice,
    enabled: true
  };

  const currentCircuit = isMultiCircuit 
    ? (selectedCircuit ? activeCircuits.find(c => c.id === selectedCircuit) : activeCircuits[0])
    : singleCircuitData;

  const getLoadTypeName = (loadType: string) => {
    return loadType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getSupplyVoltage = () => {
    return planData.phases === "single" ? `${planData.voltage}V 1φ` : `${planData.voltage}V 3φ`;
  };

  const getTotalSystemLoad = () => {
    if (isMultiCircuit) {
      return activeCircuits.reduce((sum, circuit) => sum + circuit.totalLoad, 0);
    }
    return planData.totalLoad;
  };

  const CircuitComponent = ({ 
    id, 
    children, 
    className, 
    label 
  }: { 
    id: string; 
    children: React.ReactNode; 
    className?: string;
    label?: string;
  }) => (
    <div
      className={`relative transition-all duration-200 ${
        highlightComponent === id ? 'scale-110 z-10' : ''
      } ${className}`}
      onMouseEnter={() => setHighlightComponent(id)}
      onMouseLeave={() => setHighlightComponent(null)}
    >
      {children}
      {showLabels && label && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-center bg-elec-dark px-2 py-1 rounded border border-elec-yellow/30 whitespace-nowrap">
          {label}
        </div>
      )}
    </div>
  );

  if (!currentCircuit) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Visual Circuit Designer
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <Cable className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Active Circuits</h3>
          <p className="text-muted-foreground">
            Enable at least one circuit to see the visual design.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {isMultiCircuit ? <Grid className="h-5 w-5 text-elec-yellow" /> : <Zap className="h-5 w-5 text-elec-yellow" />}
            Visual Circuit Designer
            {isMultiCircuit && <Badge variant="outline" className="border-blue-400/30 text-blue-400">Multi-Circuit</Badge>}
          </CardTitle>
          <div className="flex items-center gap-2">
            {isMultiCircuit && activeCircuits.length > 1 && (
              <Select value={selectedCircuit || activeCircuits[0]?.id} onValueChange={setSelectedCircuit}>
                <SelectTrigger className="w-48 border-elec-yellow/30 hover:bg-elec-yellow/10">
                  <SelectValue placeholder="Select circuit to view" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  {activeCircuits.map((circuit) => (
                    <SelectItem key={circuit.id} value={circuit.id}>
                      {circuit.name} - {circuit.loadType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLabels(!showLabels)}
              className="border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              {showLabels ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showLabels ? "Hide Labels" : "Show Labels"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mobile-friendly linear flow */}
        <div className="flex flex-col space-y-6 p-4 bg-elec-dark rounded-lg border border-elec-yellow/20">
          
          {/* Circuit Flow Title */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Circuit Flow</h3>
            <p className="text-sm text-muted-foreground">Supply → Protection → Cable → Load</p>
          </div>

          {/* Linear Circuit Flow */}
          <div className="flex flex-col space-y-4">
            
            {/* Supply */}
            <div className="flex items-center justify-between p-4 bg-elec-yellow/10 rounded-lg border border-elec-yellow/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-elec-yellow/20 border-2 border-elec-yellow rounded-lg flex items-center justify-center">
                  <Power className="h-6 w-6 text-elec-yellow" />
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">Supply</p>
                  <p className="text-sm text-muted-foreground">{getSupplyVoltage()}</p>
                </div>
              </div>
              <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                ORIGIN
              </Badge>
            </div>

            {/* Connection Line */}
            <div className="flex justify-center">
              <div className="w-1 h-6 bg-gradient-to-b from-elec-yellow to-blue-400"></div>
            </div>

            {/* Protection */}
            <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/20 border-2 border-blue-400 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-blue-400">Protection</p>
                  <p className="text-sm text-muted-foreground">{recommendedCable?.ratedCurrent || 32}A {currentCircuit.protectiveDevice.toUpperCase()}</p>
                </div>
              </div>
              <Badge variant="outline" className="border-blue-400/30 text-blue-400">
                MCB/RCBO
              </Badge>
            </div>

            {/* Connection Line */}
            <div className="flex justify-center">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-gray-400"></div>
            </div>

            {/* Cable */}
            <div className="flex items-center justify-between p-4 bg-gray-500/10 rounded-lg border border-gray-400/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-500/20 border-2 border-gray-400 rounded-lg flex items-center justify-center">
                  <Cable className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-300">Cable</p>
                  <p className="text-sm text-muted-foreground">{recommendedCable?.size || "TBD"} {currentCircuit.cableType.toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">{currentCircuit.cableLength}m · {currentCircuit.installationMethod.replace('-', ' ')}</p>
                </div>
              </div>
              <Badge variant="outline" className="border-gray-400/30 text-gray-400">
                CONDUCTOR
              </Badge>
            </div>

            {/* Connection Line */}
            <div className="flex justify-center">
              <div className="w-1 h-6 bg-gradient-to-b from-gray-400 to-green-400"></div>
            </div>

            {/* Load */}
            <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-400/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500/20 border-2 border-green-400 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-green-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-green-400">Load</p>
                  <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                    <div>Power: {currentCircuit.totalLoad}W</div>
                    <div>Type: {getLoadTypeName(currentCircuit.loadType)}</div>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="border-green-400/30 text-green-400">
                EQUIPMENT
              </Badge>
            </div>
          </div>

          {/* Circuit Calculations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4 bg-elec-dark/60 rounded-lg border border-elec-yellow/20">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Design Current</p>
              <p className="text-lg font-bold text-elec-yellow">
                {(currentCircuit.phases === "single" 
                  ? currentCircuit.totalLoad / currentCircuit.voltage 
                  : currentCircuit.totalLoad / (currentCircuit.voltage * Math.sqrt(3))
                ).toFixed(1)}A
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Cable Capacity</p>
              <p className="text-lg font-bold text-green-400">
                {recommendedCable?.ratedCurrent || "TBD"}A
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Installation</p>
              <p className="text-sm font-medium text-blue-400 capitalize">
                {planData.installationType}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Environment</p>
              <p className="text-sm font-medium text-amber-400">
                {planData.ambientTemperature}°C
              </p>
            </div>
          </div>
          
          {/* Multi-circuit system overview for multi-circuit mode */}
          {isMultiCircuit && (
            <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-400/20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-blue-400">System Overview</h4>
                <Badge variant="outline" className="border-blue-400/30 text-blue-400">
                  {activeCircuits.length} Circuits
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-2 bg-blue-500/5 rounded">
                  <div className="text-blue-400 font-medium">{(getTotalSystemLoad() / 1000).toFixed(1)}kW</div>
                  <div className="text-xs text-muted-foreground">Total Load</div>
                </div>
                <div className="text-center p-2 bg-green-500/5 rounded">
                  <div className="text-green-400 font-medium">{activeCircuits.length}</div>
                  <div className="text-xs text-muted-foreground">Active Circuits</div>
                </div>
                <div className="text-center p-2 bg-amber-500/5 rounded">
                  <div className="text-amber-400 font-medium">{planData.voltage}V</div>
                  <div className="text-xs text-muted-foreground">System Voltage</div>
                </div>
                <div className="text-center p-2 bg-purple-500/5 rounded">
                  <div className="text-purple-400 font-medium">{planData.environmentalSettings?.earthingSystem || planData.earthingSystem}</div>
                  <div className="text-xs text-muted-foreground">Earthing</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Component Details */}
        {highlightComponent && (
          <div className="mt-4 p-3 bg-elec-yellow/10 border border-elec-yellow/30 rounded">
            <div className="text-sm">
              {highlightComponent === "supply" && "Main electrical supply providing power to the circuit"}
              {highlightComponent === "distribution" && "Distribution board splitting supply to multiple circuits"}
              {highlightComponent === "protection" && "Protective device (MCB/RCBO) for overcurrent and earth fault protection"}
              {highlightComponent === "cable" && `Cable run using ${currentCircuit.installationMethod} installation method`}
              {highlightComponent === "load" && `${currentCircuit.loadType} load consuming ${currentCircuit.totalLoad}W`}
              {highlightComponent === "installation" && "Installation method affects cable current carrying capacity"}
              {highlightComponent === "earth" && "Earth fault protection path"}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VisualCircuitDesigner;

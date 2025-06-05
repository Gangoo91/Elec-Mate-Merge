
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

  const getLoadIcon = (loadType: string) => {
    switch (loadType) {
      case "lighting": return "💡";
      case "motor": return "⚙️";
      case "heating": return "🔥";
      case "cooker": return "🍳";
      case "ev-charging": return "🚗";
      case "power": return "🔌";
      default: return "⚡";
    }
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
        <div className="relative p-8 bg-elec-dark rounded-lg border border-elec-yellow/20 min-h-96">
          
          {/* Supply */}
          <CircuitComponent
            id="supply"
            className="absolute top-4 left-8"
            label={`Supply ${getSupplyVoltage()}`}
          >
            <div className="w-16 h-12 bg-elec-yellow/20 border-2 border-elec-yellow rounded flex items-center justify-center font-bold text-elec-yellow">
              {getSupplyVoltage()}
            </div>
          </CircuitComponent>

          {/* Main Distribution Board (for multi-circuit) */}
          {isMultiCircuit && (
            <CircuitComponent
              id="distribution"
              className="absolute top-4 left-32"
              label="Distribution Board"
            >
              <div className="w-16 h-12 bg-gray-500/20 border-2 border-gray-400 rounded flex items-center justify-center">
                <Power className="h-6 w-6 text-gray-400" />
              </div>
            </CircuitComponent>
          )}

          {/* Protective Device */}
          <CircuitComponent
            id="protection"
            className={`absolute top-4 ${isMultiCircuit ? 'left-56' : 'left-32'}`}
            label={`${recommendedCable?.ratedCurrent || 32}A ${currentCircuit.protectiveDevice.toUpperCase()}`}
          >
            <div className="w-12 h-12 bg-blue-500/20 border-2 border-blue-400 rounded flex items-center justify-center">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
          </CircuitComponent>

          {/* Cable Run */}
          <div className={`absolute top-10 ${isMultiCircuit ? 'left-72 right-48' : 'left-48 right-48'}`}>
            <CircuitComponent
              id="cable"
              label={`${recommendedCable?.size || "TBD"} ${currentCircuit.cableType.toUpperCase()} - ${currentCircuit.cableLength}m`}
            >
              <div className="flex items-center">
                <Cable className="h-6 w-6 text-gray-400 mr-2" />
                <div className="flex-1 h-1 bg-gradient-to-r from-gray-400 to-gray-600 relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-elec-yellow/30 to-transparent"></div>
                </div>
                <Cable className="h-6 w-6 text-gray-400 ml-2" />
              </div>
            </CircuitComponent>
          </div>

          {/* Installation Method Indicator */}
          <CircuitComponent
            id="installation"
            className="absolute top-20 left-1/2 transform -translate-x-1/2"
            label={currentCircuit.installationMethod.replace('-', ' ').toUpperCase()}
          >
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              {currentCircuit.installationMethod.replace('-', ' ')}
            </Badge>
          </CircuitComponent>

          {/* Load */}
          <CircuitComponent
            id="load"
            className="absolute top-4 right-8"
            label={`${currentCircuit.totalLoad}W ${currentCircuit.loadType.toUpperCase()}`}
          >
            <div className="w-16 h-12 bg-green-500/20 border-2 border-green-400 rounded flex items-center justify-center text-2xl">
              {getLoadIcon(currentCircuit.loadType)}
            </div>
          </CircuitComponent>

          {/* Multi-circuit system overview */}
          {isMultiCircuit && (
            <div className="absolute bottom-20 left-4 right-4 bg-elec-dark/60 border border-blue-400/20 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-blue-400">System Overview</h4>
                <Badge variant="outline" className="border-blue-400/30 text-blue-400">
                  {activeCircuits.length} Circuits
                </Badge>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className="text-center">
                  <div className="text-blue-400 font-medium">{(getTotalSystemLoad() / 1000).toFixed(1)}kW</div>
                  <div className="text-muted-foreground">Total Load</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-medium">{activeCircuits.length}</div>
                  <div className="text-muted-foreground">Active Circuits</div>
                </div>
                <div className="text-center">
                  <div className="text-amber-400 font-medium">{planData.voltage}V</div>
                  <div className="text-muted-foreground">System Voltage</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 font-medium">{planData.earthingSystem}</div>
                  <div className="text-muted-foreground">Earthing</div>
                </div>
              </div>
            </div>
          )}

          {/* Circuit Information Panel */}
          <div className="absolute bottom-4 left-4 right-4 bg-elec-dark/80 border border-elec-yellow/20 rounded p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Design Current</div>
                <div className="font-bold text-elec-yellow">
                  {(currentCircuit.phases === "single" 
                    ? currentCircuit.totalLoad / currentCircuit.voltage 
                    : currentCircuit.totalLoad / (currentCircuit.voltage * Math.sqrt(3))
                  ).toFixed(1)}A
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Cable Capacity</div>
                <div className="font-bold text-green-400">
                  {recommendedCable?.ratedCurrent || "TBD"}A
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Installation</div>
                <div className="font-bold text-blue-400">
                  {planData.installationType}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Environment</div>
                <div className="font-bold text-amber-400">
                  {planData.ambientTemperature}°C
                </div>
              </div>
            </div>
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
            {/* Supply to Distribution/Protection */}
            <line 
              x1="100" y1="20" 
              x2={isMultiCircuit ? "128" : "128"} y2="20" 
              stroke="#F7DC6F" strokeWidth="2" 
            />
            {isMultiCircuit && (
              <>
                {/* Distribution to Protection */}
                <line x1="172" y1="20" x2="224" y2="20" stroke="#F7DC6F" strokeWidth="2" />
                {/* Protection to Cable start */}
                <line x1="268" y1="20" x2="288" y2="20" stroke="#F7DC6F" strokeWidth="2" />
              </>
            )}
            {!isMultiCircuit && (
              <>
                {/* Protection to Cable start */}
                <line x1="172" y1="20" x2="192" y2="20" stroke="#F7DC6F" strokeWidth="2" />
              </>
            )}
            {/* Cable end to Load */}
            <line 
              x1="calc(100% - 192px)" y1="20" 
              x2="calc(100% - 100px)" y2="20" 
              stroke="#F7DC6F" strokeWidth="2" 
            />
          </svg>

          {/* Earth Symbol */}
          <div className="absolute bottom-16 right-8">
            <CircuitComponent
              id="earth"
              label="Earth"
            >
              <div className="text-green-400 text-lg">⏚</div>
            </CircuitComponent>
          </div>
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

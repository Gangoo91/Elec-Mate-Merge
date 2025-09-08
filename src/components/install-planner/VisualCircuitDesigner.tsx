
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
    <div className="space-y-4">
      {/* Header - Mobile optimized */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 py-3 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
        <div className="flex items-center gap-2">
          {isMultiCircuit ? <Grid className="h-5 w-5 text-elec-yellow" /> : <Zap className="h-5 w-5 text-elec-yellow" />}
          <h3 className="text-lg font-semibold text-elec-yellow">Visual Circuit Designer</h3>
          {isMultiCircuit && <Badge variant="outline" className="border-blue-400/30 text-blue-400">Multi-Circuit</Badge>}
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {isMultiCircuit && activeCircuits.length > 1 && (
            <Select value={selectedCircuit || activeCircuits[0]?.id} onValueChange={setSelectedCircuit}>
              <SelectTrigger className="w-full sm:w-48 border-elec-yellow/30 hover:bg-elec-yellow/10 h-10">
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
            className="border-elec-yellow/30 hover:bg-elec-yellow/10 h-10 px-3"
          >
            {showLabels ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            <span className="hidden sm:inline">{showLabels ? "Hide Labels" : "Show Labels"}</span>
            <span className="sm:hidden">{showLabels ? "Hide" : "Show"}</span>
          </Button>
        </div>
      </div>

      {/* Circuit Flow - Full Width Mobile Design */}
      <div className="space-y-4">
        {/* Circuit Flow Title */}
        <div className="text-center py-3 bg-elec-dark/30 rounded-lg border border-elec-yellow/20">
          <h4 className="text-base font-semibold text-elec-yellow mb-1">Circuit Flow</h4>
          <p className="text-sm text-muted-foreground">Supply → Protection → Cable → Load</p>
        </div>

        {/* Vertical Circuit Flow - Enhanced Mobile Design */}
        <div className="space-y-2">
          {/* Supply */}
          <div className="w-full p-5 bg-gradient-to-r from-elec-yellow/15 to-elec-yellow/5 rounded-xl border border-elec-yellow/40 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="w-14 h-14 bg-gradient-to-br from-elec-yellow/30 to-elec-yellow/10 border-2 border-elec-yellow rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-elec-yellow text-xl mb-1">Supply</p>
                  <p className="text-base text-elec-light/80 font-medium">{getSupplyVoltage()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Line */}
          <div className="flex justify-center py-1">
            <div className="w-1 h-6 bg-gradient-to-b from-elec-yellow via-elec-yellow/70 to-blue-400 rounded-full shadow-sm"></div>
          </div>

          {/* Protection */}
          <div className="w-full p-5 bg-gradient-to-r from-blue-500/15 to-blue-500/5 rounded-xl border border-blue-400/40 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-blue-500/10 border-2 border-blue-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-blue-400 text-xl mb-1">Protection</p>
                  <p className="text-base text-elec-light/80 font-medium">{recommendedCable?.ratedCurrent || 32}A</p>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Line */}
          <div className="flex justify-center py-1">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-400 via-blue-400/70 to-gray-400 rounded-full shadow-sm"></div>
          </div>

          {/* Cable */}
          <div className="w-full p-5 bg-gradient-to-r from-gray-500/15 to-gray-500/5 rounded-xl border border-gray-400/40 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-500/30 to-gray-500/10 border-2 border-gray-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-300 text-xl mb-1">Cable</p>
                  <p className="text-base text-elec-light/80 font-medium">{recommendedCable?.size || "TBD"} {currentCircuit.cableType.toUpperCase()}</p>
                  <p className="text-sm text-elec-light/60 mt-1">{currentCircuit.cableLength}m · {currentCircuit.installationMethod.replace('-', ' ')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Line */}
          <div className="flex justify-center py-1">
            <div className="w-1 h-6 bg-gradient-to-b from-gray-400 via-gray-400/70 to-green-400 rounded-full shadow-sm"></div>
          </div>

          {/* Load */}
          <div className="w-full p-5 bg-gradient-to-r from-green-500/15 to-green-500/5 rounded-xl border border-green-400/40 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500/30 to-green-500/10 border-2 border-green-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-green-400 text-xl mb-1">Load</p>
                  <div className="space-y-1">
                    <p className="text-base text-elec-light/80 font-medium">Power: {currentCircuit.totalLoad}W</p>
                    <p className="text-sm text-elec-light/60">Type: {getLoadTypeName(currentCircuit.loadType)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Circuit Calculations - Mobile Optimized */}
        <div className="p-4 bg-elec-dark/60 rounded-lg border border-elec-yellow/20">
          <h5 className="text-sm font-medium text-elec-yellow mb-3 text-center">Circuit Calculations</h5>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-elec-gray/30 rounded">
              <p className="text-xs text-muted-foreground mb-1">Design Current</p>
              <p className="text-lg font-bold text-elec-yellow">
                {(currentCircuit.phases === "single" 
                  ? currentCircuit.totalLoad / currentCircuit.voltage 
                  : currentCircuit.totalLoad / (currentCircuit.voltage * Math.sqrt(3))
                ).toFixed(1)}A
              </p>
            </div>
            <div className="text-center p-3 bg-elec-gray/30 rounded">
              <p className="text-xs text-muted-foreground mb-1">Cable Capacity</p>
              <p className="text-lg font-bold text-green-400">
                {recommendedCable?.ratedCurrent || "TBD"}A
              </p>
            </div>
            <div className="text-center p-3 bg-elec-gray/30 rounded">
              <p className="text-xs text-muted-foreground mb-1">Installation</p>
              <p className="text-sm font-medium text-blue-400 capitalize">
                {planData.installationType}
              </p>
            </div>
            <div className="text-center p-3 bg-elec-gray/30 rounded">
              <p className="text-xs text-muted-foreground mb-1">Environment</p>
              <p className="text-sm font-medium text-amber-400">
                {planData.ambientTemperature}°C
              </p>
            </div>
          </div>
        </div>
        
        {/* Multi-circuit system overview for multi-circuit mode */}
        {isMultiCircuit && (
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/20">
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-sm font-medium text-blue-400">System Overview</h5>
              <Badge variant="outline" className="border-blue-400/30 text-blue-400">
                {activeCircuits.length} Circuits
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-blue-500/10 rounded">
                <div className="text-blue-400 font-medium text-lg">{(getTotalSystemLoad() / 1000).toFixed(1)}kW</div>
                <div className="text-xs text-muted-foreground">Total Load</div>
              </div>
              <div className="text-center p-3 bg-green-500/10 rounded">
                <div className="text-green-400 font-medium text-lg">{activeCircuits.length}</div>
                <div className="text-xs text-muted-foreground">Active Circuits</div>
              </div>
              <div className="text-center p-3 bg-amber-500/10 rounded">
                <div className="text-amber-400 font-medium text-lg">{planData.voltage}V</div>
                <div className="text-xs text-muted-foreground">System Voltage</div>
              </div>
              <div className="text-center p-3 bg-purple-500/10 rounded">
                <div className="text-purple-400 font-medium text-lg">{planData.environmentalSettings?.earthingSystem || planData.earthingSystem}</div>
                <div className="text-xs text-muted-foreground">Earthing</div>
              </div>
            </div>
          </div>
        )}
      </div>

      
      {/* Component Details */}
      {highlightComponent && (
        <div className="p-3 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
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
    </div>
  );
};

export default VisualCircuitDesigner;

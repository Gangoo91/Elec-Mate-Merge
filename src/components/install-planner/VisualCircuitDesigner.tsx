
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Cable, Shield, Settings, Eye, EyeOff } from "lucide-react";
import { InstallPlanData } from "./types";

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

  const getLoadIcon = () => {
    switch (planData.loadType) {
      case "lighting": return "💡";
      case "motor": return "⚙️";
      case "heating": return "🔥";
      case "cooker": return "🍳";
      case "ev-charging": return "🚗";
      default: return "⚡";
    }
  };

  const getSupplyVoltage = () => {
    return planData.phases === "single" ? `${planData.voltage}V 1φ` : `${planData.voltage}V 3φ`;
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
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-center bg-elec-dark px-2 py-1 rounded border border-elec-yellow/30">
          {label}
        </div>
      )}
    </div>
  );

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Visual Circuit Designer
          </CardTitle>
          <div className="flex items-center gap-2">
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

          {/* Protective Device */}
          <CircuitComponent
            id="protection"
            className="absolute top-4 left-32"
            label={`${recommendedCable?.ratedCurrent || 32}A ${planData.protectiveDevice.toUpperCase()}`}
          >
            <div className="w-12 h-12 bg-blue-500/20 border-2 border-blue-400 rounded flex items-center justify-center">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
          </CircuitComponent>

          {/* Cable Run */}
          <div className="absolute top-10 left-48 right-48">
            <CircuitComponent
              id="cable"
              label={`${recommendedCable?.size || "TBD"} ${planData.cableType.toUpperCase()} - ${planData.cableLength}m`}
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
            label={planData.installationMethod.replace('-', ' ').toUpperCase()}
          >
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              {planData.installationMethod.replace('-', ' ')}
            </Badge>
          </CircuitComponent>

          {/* Load */}
          <CircuitComponent
            id="load"
            className="absolute top-4 right-8"
            label={`${planData.totalLoad}W ${planData.loadType.toUpperCase()}`}
          >
            <div className="w-16 h-12 bg-green-500/20 border-2 border-green-400 rounded flex items-center justify-center text-2xl">
              {getLoadIcon()}
            </div>
          </CircuitComponent>

          {/* Circuit Information Panel */}
          <div className="absolute bottom-4 left-4 right-4 bg-elec-dark/80 border border-elec-yellow/20 rounded p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Design Current</div>
                <div className="font-bold text-elec-yellow">
                  {(planData.phases === "single" 
                    ? planData.totalLoad / planData.voltage 
                    : planData.totalLoad / (planData.voltage * Math.sqrt(3))
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
            {/* Supply to Protection */}
            <line x1="100" y1="20" x2="128" y2="20" stroke="#F7DC6F" strokeWidth="2" />
            {/* Protection to Cable start */}
            <line x1="172" y1="20" x2="192" y2="20" stroke="#F7DC6F" strokeWidth="2" />
            {/* Cable end to Load */}
            <line x1="calc(100% - 192px)" y1="20" x2="calc(100% - 100px)" y2="20" stroke="#F7DC6F" strokeWidth="2" />
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
              {highlightComponent === "protection" && "Protective device (MCB/RCBO) for overcurrent and earth fault protection"}
              {highlightComponent === "cable" && `Cable run using ${planData.installationMethod} installation method`}
              {highlightComponent === "load" && `${planData.loadType} load consuming ${planData.totalLoad}W`}
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

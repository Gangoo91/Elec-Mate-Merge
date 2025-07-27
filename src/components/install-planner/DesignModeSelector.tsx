
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cable, Zap, ArrowRight, CheckCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InstallPlanData } from "./types";

interface DesignModeSelectorProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const DesignModeSelector: React.FC<DesignModeSelectorProps> = ({ 
  planData, 
  updatePlanData 
}) => {
  const currentMode = planData.designMode || "single";

  const selectMode = (mode: "single" | "multi") => {
    updatePlanData({ 
      designMode: mode,
      // Initialize circuits array for multi-circuit mode
      circuits: mode === "multi" ? (planData.circuits || []) : undefined
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-xl sm:text-2xl font-bold">Choose Design Mode</h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
          Select your installation type to get started with professional electrical design.
        </p>
      </div>

      {/* Mode Selector - Toggle Style */}
      <Card className="border-elec-yellow/20 bg-elec-gray max-w-2xl mx-auto">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card 
              className={`cursor-pointer border-2 transition-all active:scale-95 ${
                currentMode === "single" 
                  ? 'border-elec-yellow bg-elec-yellow/10 shadow-lg' 
                  : 'border-elec-yellow/20 hover:border-elec-yellow/40 hover:bg-elec-yellow/5'
              }`}
              onClick={() => selectMode("single")}
            >
              <CardContent className="p-4 text-center space-y-3">
                <div className={`p-3 rounded-full w-fit mx-auto ${
                  currentMode === "single" ? 'bg-elec-yellow/20' : 'bg-elec-yellow/10'
                }`}>
                  <Cable className="h-6 w-6 text-elec-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-base flex items-center justify-center gap-2">
                    Single Circuit
                    {currentMode === "single" && <CheckCircle className="h-4 w-4 text-green-400" />}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Individual appliance or circuit
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-1">
                  <Badge variant="outline" className="text-xs">Quick</Badge>
                  <Badge variant="outline" className="text-xs">2-5 min</Badge>
                </div>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer border-2 transition-all active:scale-95 ${
                currentMode === "multi" 
                  ? 'border-elec-yellow bg-elec-yellow/10 shadow-lg' 
                  : 'border-elec-yellow/20 hover:border-elec-yellow/40 hover:bg-elec-yellow/5'
              }`}
              onClick={() => selectMode("multi")}
            >
              <CardContent className="p-4 text-center space-y-3">
                <div className={`p-3 rounded-full w-fit mx-auto ${
                  currentMode === "multi" ? 'bg-elec-yellow/20' : 'bg-elec-yellow/10'
                }`}>
                  <Zap className="h-6 w-6 text-elec-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-base flex items-center justify-center gap-2">
                    Multi-Circuit
                    {currentMode === "multi" && <CheckCircle className="h-4 w-4 text-green-400" />}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Complete installation system
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-1">
                  <Badge variant="outline" className="text-xs">Comprehensive</Badge>
                  <Badge variant="outline" className="text-xs">10-30 min</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Contextual Information */}
      {currentMode && (
        <Card className="border-elec-yellow/20 bg-elec-gray max-w-2xl mx-auto">
          <CardContent className="p-4">
            <div className="text-center space-y-4">
              <h4 className="font-medium text-elec-yellow">
                {currentMode === "single" ? "Single Circuit Design" : "Multi-Circuit Installation"}
              </h4>
              
              <div className="space-y-3 text-sm text-muted-foreground">
                {currentMode === "single" ? (
                  <>
                    <div>
                      <p className="font-medium text-elec-yellow mb-2">Ideal for:</p>
                      <p>Individual appliances, socket circuits, lighting circuits, or simple upgrades.</p>
                    </div>
                    <div>
                      <p className="font-medium text-elec-yellow mb-2">Features:</p>
                      <p>Fast cable sizing, protection calculations, and BS 7671 compliance checking.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="font-medium text-elec-yellow mb-2">Ideal for:</p>
                      <p>New builds, rewires, commercial installations, or complex multi-zone systems.</p>
                    </div>
                    <div>
                      <p className="font-medium text-elec-yellow mb-2">Features:</p>
                      <p>System-wide analysis, diversity calculations, supply sizing, and environmental zoning.</p>
                    </div>
                    <div>
                      <p className="font-medium text-elec-yellow mb-2">Benefits:</p>
                      <p>Optimised load balancing, consumer unit selection, and comprehensive compliance documentation.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DesignModeSelector;

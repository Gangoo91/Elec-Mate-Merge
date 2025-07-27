
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

      {/* Mode Selector - Clean Toggle Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <Card 
          className={`cursor-pointer border-2 transition-all active:scale-95 ${
            currentMode === "single" 
              ? 'border-elec-yellow bg-elec-gray shadow-lg' 
              : 'border-elec-yellow/20 hover:border-elec-yellow/40 bg-elec-gray'
          }`}
          onClick={() => selectMode("single")}
        >
          <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
            <Cable className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow mx-auto" />
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <h3 className="font-semibold text-base sm:text-lg text-elec-yellow">Single Circuit</h3>
                {currentMode === "single" && <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Individual appliance or circuit</p>
              <div className="flex justify-center gap-2 pt-1 sm:pt-2">
                <span className="text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">Quick</span>
                <span className="text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">2-5 min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer border-2 transition-all active:scale-95 ${
            currentMode === "multi" 
              ? 'border-elec-yellow bg-elec-gray shadow-lg' 
              : 'border-elec-yellow/20 hover:border-elec-yellow/40 bg-elec-gray'
          }`}
          onClick={() => selectMode("multi")}
        >
          <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
            <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow mx-auto" />
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <h3 className="font-semibold text-base sm:text-lg text-elec-yellow">Multi-Circuit</h3>
                {currentMode === "multi" && <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Complete installation system</p>
              <div className="flex justify-center gap-2 pt-1 sm:pt-2">
                <span className="text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">Comprehensive</span>
                <span className="text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">10-30 min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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

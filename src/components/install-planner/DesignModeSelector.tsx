
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cable, Zap, ArrowRight, CheckCircle, Info, Sparkles } from "lucide-react";
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
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-elec-yellow/10 border border-elec-yellow/20 rounded-full">
          <Sparkles className="h-4 w-4 text-elec-yellow" />
          <span className="text-xs font-medium text-elec-yellow">Step 1 of {currentMode === "multi" ? "5" : "6"}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-elec-yellow to-yellow-400 bg-clip-text text-transparent">
          Choose Design Mode
        </h2>
        <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Select your installation type to get started with professional electrical design and BS 7671 compliance.
        </p>
      </div>

      {/* Mode Selector - Enhanced with glassmorphism */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <Card 
          className={`group cursor-pointer border-2 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
            currentMode === "single" 
              ? 'border-elec-yellow bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 shadow-2xl shadow-elec-yellow/20' 
              : 'border-elec-yellow/30 hover:border-elec-yellow/60 bg-elec-gray/80 hover:bg-gradient-to-br hover:from-elec-yellow/5 hover:to-transparent'
          }`}
          onClick={() => selectMode("single")}
        >
          <CardContent className="p-6 sm:p-8 text-center space-y-4">
            <div className={`relative transition-transform duration-300 ${currentMode === "single" ? 'animate-pulse' : 'group-hover:rotate-6'}`}>
              <Cable className={`h-10 w-10 sm:h-12 sm:w-12 mx-auto transition-colors duration-300 ${
                currentMode === "single" ? 'text-elec-yellow' : 'text-elec-yellow/80 group-hover:text-elec-yellow'
              }`} />
              {currentMode === "single" && (
                <div className="absolute -top-1 -right-1">
                  <CheckCircle className="h-6 w-6 text-green-400 bg-elec-gray rounded-full" />
                </div>
              )}
            </div>
            <div className="space-y-3">
              <h3 className={`font-bold text-lg sm:text-xl transition-colors duration-300 ${
                currentMode === "single" ? 'text-elec-yellow' : 'text-white group-hover:text-elec-yellow'
              }`}>
                Single Circuit
              </h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Individual appliance or circuit design
              </p>
              <div className={`text-xs px-3 py-1 rounded-full border inline-block transition-all duration-300 ${
                currentMode === "single" 
                  ? 'text-elec-yellow bg-elec-yellow/10 border-elec-yellow/30' 
                  : 'text-white/60 border-white/20 group-hover:text-elec-yellow group-hover:border-elec-yellow/30'
              }`}>
                Fast & Simple
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`group cursor-pointer border-2 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
            currentMode === "multi" 
              ? 'border-elec-yellow bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 shadow-2xl shadow-elec-yellow/20' 
              : 'border-elec-yellow/30 hover:border-elec-yellow/60 bg-elec-gray/80 hover:bg-gradient-to-br hover:from-elec-yellow/5 hover:to-transparent'
          }`}
          onClick={() => selectMode("multi")}
        >
          <CardContent className="p-6 sm:p-8 text-center space-y-4">
            <div className={`relative transition-transform duration-300 ${currentMode === "multi" ? 'animate-pulse' : 'group-hover:scale-110'}`}>
              <Zap className={`h-10 w-10 sm:h-12 sm:w-12 mx-auto transition-colors duration-300 ${
                currentMode === "multi" ? 'text-elec-yellow' : 'text-elec-yellow/80 group-hover:text-elec-yellow'
              }`} />
              {currentMode === "multi" && (
                <div className="absolute -top-1 -right-1">
                  <CheckCircle className="h-6 w-6 text-green-400 bg-elec-gray rounded-full" />
                </div>
              )}
            </div>
            <div className="space-y-3">
              <h3 className={`font-bold text-lg sm:text-xl transition-colors duration-300 ${
                currentMode === "multi" ? 'text-elec-yellow' : 'text-white group-hover:text-elec-yellow'
              }`}>
                Multi-Circuit
              </h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Complete installation system design
              </p>
              <div className={`text-xs px-3 py-1 rounded-full border inline-block transition-all duration-300 ${
                currentMode === "multi" 
                  ? 'text-elec-yellow bg-elec-yellow/10 border-elec-yellow/30' 
                  : 'text-white/60 border-white/20 group-hover:text-elec-yellow group-hover:border-elec-yellow/30'
              }`}>
                Comprehensive
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Information Panel */}
      {currentMode && (
        <div className="max-w-4xl mx-auto">
          <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-gray to-elec-gray/50 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="font-bold text-xl text-elec-yellow mb-2">
                    {currentMode === "single" ? "Single Circuit Design" : "Multi-Circuit Installation"}
                  </h4>
                  <div className="h-1 w-16 bg-gradient-to-r from-elec-yellow to-transparent mx-auto rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentMode === "single" ? (
                    <>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                          <p className="font-semibold text-elec-yellow">Ideal for:</p>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed pl-4">
                          Individual appliances, socket circuits, lighting circuits, or simple upgrades.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                          <p className="font-semibold text-elec-yellow">Features:</p>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed pl-4">
                          Fast cable sizing, protection calculations, and BS 7671 compliance checking.
                        </p>
                      </div>
                      <div className="space-y-3 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <p className="font-semibold text-green-400">Time Estimate:</p>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed pl-4">
                          Complete in 2-3 minutes
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                          <p className="font-semibold text-elec-yellow">Ideal for:</p>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed pl-4">
                          New builds, rewires, commercial installations, or complex multi-zone systems.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                          <p className="font-semibold text-elec-yellow">Features:</p>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed pl-4">
                          System-wide analysis, diversity calculations, supply sizing, and environmental zoning.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                          <p className="font-semibold text-elec-yellow">Benefits:</p>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed pl-4">
                          Optimised load balancing, consumer unit selection, and comprehensive compliance documentation.
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Continue Button */}
                {currentMode && (
                  <div className="text-center pt-4 border-t border-elec-yellow/20">
                    <Button 
                      className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                      onClick={() => {
                        // This will be handled by the parent component's navigation
                        const event = new CustomEvent('proceedToNext');
                        window.dispatchEvent(event);
                      }}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DesignModeSelector;

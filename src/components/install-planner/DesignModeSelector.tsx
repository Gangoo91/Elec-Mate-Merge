
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cable, Zap, ArrowRight, CheckCircle } from "lucide-react";
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
      <div>
        <h2 className="text-2xl font-bold mb-2">Choose Design Mode</h2>
        <p className="text-muted-foreground">
          Select whether you want to design a single circuit or plan multiple circuits for a complete installation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Single Circuit Mode */}
        <Card 
          className={`cursor-pointer border-2 transition-all hover:scale-105 ${
            currentMode === "single" 
              ? 'border-elec-yellow bg-elec-yellow/10' 
              : 'border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40'
          }`}
          onClick={() => selectMode("single")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-elec-yellow/20 rounded">
                <Cable className="h-6 w-6 text-elec-yellow" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  Single Circuit Design
                  {currentMode === "single" && <CheckCircle className="h-5 w-5 text-green-400" />}
                </div>
                <p className="text-sm text-muted-foreground font-normal">
                  Design and analyse one electrical circuit
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-elec-yellow">Perfect for:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Single appliance installations</li>
                  <li>• Individual circuit upgrades</li>
                  <li>• Quick cable sizing calculations</li>
                  <li>• Simple domestic installations</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-elec-yellow">Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Focused single-circuit analysis</li>
                  <li>• Faster design process</li>
                  <li>• Detailed cable recommendations</li>
                  <li>• BS 7671 compliance checking</li>
                </ul>
              </div>

              {currentMode === "single" && (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  Currently selected mode
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Multi-Circuit Mode */}
        <Card 
          className={`cursor-pointer border-2 transition-all hover:scale-105 ${
            currentMode === "multi" 
              ? 'border-elec-yellow bg-elec-yellow/10' 
              : 'border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40'
          }`}
          onClick={() => selectMode("multi")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-elec-yellow/20 rounded">
                <Zap className="h-6 w-6 text-elec-yellow" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  Multi-Circuit Installation
                  {currentMode === "multi" && <CheckCircle className="h-5 w-5 text-green-400" />}
                </div>
                <p className="text-sm text-muted-foreground font-normal">
                  Plan complete electrical installations
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-elec-yellow">Perfect for:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Complete house rewires</li>
                  <li>• New build installations</li>
                  <li>• Commercial electrical design</li>
                  <li>• Complex multi-circuit systems</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-elec-yellow">Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Multiple circuit management</li>
                  <li>• System-wide load analysis</li>
                  <li>• Diversity factor calculations</li>
                  <li>• Supply sizing recommendations</li>
                </ul>
              </div>

              {currentMode === "multi" && (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  Currently selected mode
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mode Comparison */}
      <Card className="border-elec-yellow/20 bg-elec-dark/30">
        <CardHeader>
          <CardTitle className="text-lg">Mode Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h4 className="font-medium mb-2">Analysis Scope</h4>
              <div className="space-y-1 text-sm">
                <div className="text-muted-foreground">Single: One circuit</div>
                <div className="text-muted-foreground">Multi: Entire installation</div>
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-medium mb-2">Design Time</h4>
              <div className="space-y-1 text-sm">
                <div className="text-muted-foreground">Single: 2-5 minutes</div>
                <div className="text-muted-foreground">Multi: 10-30 minutes</div>
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-medium mb-2">Report Detail</h4>
              <div className="space-y-1 text-sm">
                <div className="text-muted-foreground">Single: Circuit-focused</div>
                <div className="text-muted-foreground">Multi: System-wide</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      {currentMode && (
        <div className="flex justify-center">
          <Button 
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
            size="lg"
          >
            Continue with {currentMode === "single" ? "Single Circuit" : "Multi-Circuit"} Design
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default DesignModeSelector;

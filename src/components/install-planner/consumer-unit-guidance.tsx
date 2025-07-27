import React from "react";
import { ResultCard } from "@/components/ui/result-card";
import { Package, CheckCircle } from "lucide-react";

interface ConsumerUnitGuidanceProps {
  totalCircuits: number;
  recommendedMainSwitch: number;
}

export const ConsumerUnitGuidance: React.FC<ConsumerUnitGuidanceProps> = ({
  totalCircuits,
  recommendedMainSwitch
}) => {

  return (
    <ResultCard 
      icon={<Package className="h-5 w-5" />}
      title="Consumer Unit Selection"
      status="info"
      className="w-full"
    >
      <div className="space-y-4">
        <div className="space-y-3">
          <h4 className="font-medium text-elec-yellow">Requirements</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="text-sm text-muted-foreground">Minimum Ways</span>
              <div className="text-right">
                <span className="font-medium text-elec-yellow">{totalCircuits + 2} ways</span>
                <p className="text-xs text-muted-foreground">({totalCircuits} circuits + 2 spare)</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="text-sm text-muted-foreground">Main Switch Rating</span>
              <span className="font-medium text-elec-yellow">{recommendedMainSwitch}A minimum</span>
            </div>
          </div>
        </div>


        {/* Quick Buying Guide */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-elec-yellow">Quick Buying Checklist:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Verify main switch rating meets calculated requirements</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Ensure sufficient ways for current circuits plus future expansion</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Check RCD/RCBO compatibility for your protection strategy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Confirm SPD (surge protection) compatibility if required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Verify earthing system compatibility (TN-S, TN-C-S, TT)</span>
            </div>
          </div>
        </div>
      </div>
    </ResultCard>
  );
};
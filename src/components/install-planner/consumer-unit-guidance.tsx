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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Minimum Ways</p>
              <p className="font-medium text-elec-yellow">{totalCircuits + 2} ways</p>
              <p className="text-xs text-muted-foreground">({totalCircuits} circuits + 2 spare)</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Main Switch Rating</p>
              <p className="font-medium text-elec-yellow">{recommendedMainSwitch}A minimum</p>
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
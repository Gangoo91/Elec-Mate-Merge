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
        {/* Requirements */}
        <div className="space-y-3">
          <h4 className="font-medium text-primary">Requirements</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="text-sm text-muted-foreground">Minimum Ways</span>
              <span className="font-bold text-primary">{totalCircuits + 2} ways</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="text-sm text-muted-foreground">Main Switch Rating</span>
              <span className="font-bold text-primary">{recommendedMainSwitch}A minimum</span>
            </div>
          </div>
        </div>

        {/* Buying Checklist */}
        <div className="space-y-3">
          <h4 className="font-medium text-primary">Buying Checklist</h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2 p-2">
              <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">Main switch rating meets requirements</span>
            </div>
            <div className="flex items-start gap-2 p-2">
              <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">Sufficient ways for circuits + spares</span>
            </div>
            <div className="flex items-start gap-2 p-2">
              <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">RCD/RCBO compatibility checked</span>
            </div>
            <div className="flex items-start gap-2 p-2">
              <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">Earthing system compatibility verified</span>
            </div>
          </div>
        </div>
      </div>
    </ResultCard>
  );
};
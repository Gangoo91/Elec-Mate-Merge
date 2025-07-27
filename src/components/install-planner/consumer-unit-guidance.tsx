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
      <div className="space-y-6">
        {/* Requirements */}
        <div className="space-y-4">
          <h4 className="font-medium text-primary text-center">Requirements</h4>
          
          <div className="text-center space-y-4">
            <div>
              <div className="text-muted-foreground text-sm mb-1">Minimum Ways</div>
              <div className="text-primary font-bold text-2xl">{totalCircuits + 2}</div>
              <div className="text-primary font-medium">ways</div>
            </div>
            
            <div>
              <div className="text-muted-foreground text-sm mb-1">Main Switch Rating</div>
              <div className="text-primary font-bold text-2xl">{recommendedMainSwitch}A</div>
              <div className="text-primary font-medium">minimum</div>
            </div>
          </div>
        </div>

        {/* Buying Checklist */}
        <div className="space-y-4">
          <h4 className="font-medium text-primary text-center">Buying Checklist</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-left">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground leading-relaxed">Main switch rating meets requirements</span>
            </div>
            <div className="flex items-start gap-3 text-left">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground leading-relaxed">Sufficient ways for circuits + spares</span>
            </div>
            <div className="flex items-start gap-3 text-left">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground leading-relaxed">RCD/RCBO compatibility checked</span>
            </div>
            <div className="flex items-start gap-3 text-left">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground leading-relaxed">Earthing system compatibility verified</span>
            </div>
          </div>
        </div>
      </div>
    </ResultCard>
  );
};
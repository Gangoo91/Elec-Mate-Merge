import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface Hazard {
  hazard: string;
  likelihood: number;
  severity: number;
  riskRating: number;
  controls: string[];
  residualRisk: number;
}

interface RiskAssessment {
  hazards: Hazard[];
}

interface RiskMatrixData {
  riskAssessment?: RiskAssessment;
  requiredPPE?: string[];
  methodStatement?: string[];
  emergencyProcedures?: string[];
}

interface RiskMatrixCardProps {
  data: RiskMatrixData;
}

const getRiskColor = (rating: number) => {
  if (rating >= 15) return { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/40" };
  if (rating >= 10) return { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/40" };
  if (rating >= 5) return { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/40" };
  return { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/40" };
};

export const RiskMatrixCard = ({ data }: RiskMatrixCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const highestRisk = data.riskAssessment?.hazards?.reduce(
    (max, h) => Math.max(max, h.riskRating), 
    0
  ) || 0;
  
  const riskColor = getRiskColor(highestRisk);
  
  // Calculate compliance score based on residual vs initial risk reduction
  const calculateComplianceScore = () => {
    if (!data.riskAssessment?.hazards || data.riskAssessment.hazards.length === 0) return 0;
    
    const totalReduction = data.riskAssessment.hazards.reduce((sum, h) => {
      const reduction = ((h.riskRating - h.residualRisk) / h.riskRating) * 100;
      return sum + reduction;
    }, 0);
    
    return Math.round(totalReduction / data.riskAssessment.hazards.length);
  };
  
  const complianceScore = calculateComplianceScore();
  
  return (
    <Card className="border-elec-yellow/20 bg-gradient-to-br from-red-500/5 to-transparent hover:border-elec-yellow/30 transition-all">
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30">
            ⚠️ Risk Assessment
          </Badge>
          {complianceScore > 0 && (
            <Badge variant="outline" className={`text-xs ${
              complianceScore >= 70 ? 'bg-green-500/10 border-green-500/30 text-green-400' :
              complianceScore >= 50 ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' :
              'bg-orange-500/10 border-orange-500/30 text-orange-400'
            }`}>
              {complianceScore}% Risk Reduction
            </Badge>
          )}
        </div>

        {/* Risk Summary - Always Visible */}
        <div className="space-y-3">
          <div className={`${riskColor.bg} border ${riskColor.border} rounded p-3`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className={`h-5 w-5 ${riskColor.text}`} />
              <p className="text-xs text-foreground/70">Highest Risk Rating</p>
            </div>
            <p className={`text-3xl font-bold ${riskColor.text}`}>
              {highestRisk}/25
            </p>
            <p className="text-xs text-foreground/70 mt-1">
              {highestRisk >= 15 ? "High Risk" : highestRisk >= 10 ? "Medium-High Risk" : highestRisk >= 5 ? "Medium Risk" : "Low Risk"}
            </p>
          </div>

          {/* PPE Summary */}
          {data.requiredPPE && data.requiredPPE.length > 0 && (
            <div className="bg-muted/30 rounded p-3">
              <p className="text-xs text-foreground/70 mb-2">Required PPE</p>
              <div className="flex flex-wrap gap-2 gap-y-2">
                {data.requiredPPE.map((ppe, idx) => (
                  <Badge key={idx} variant="outline" className="text-[10px] bg-background/50">
                    {ppe}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Expandable Risk Details */}
        <Collapsible open={showDetails} onOpenChange={setShowDetails}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between text-xs h-8"
            >
              <span>View Risk Breakdown (5×5 Matrix)</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 pt-3">
            {/* Hazards Breakdown */}
            {data.riskAssessment?.hazards && data.riskAssessment.hazards.length > 0 && (
              <div className="space-y-3">
                {data.riskAssessment.hazards.map((hazard, idx) => {
                  const hazardColor = getRiskColor(hazard.riskRating);
                  const residualColor = getRiskColor(hazard.residualRisk);
                  
                  return (
                    <div key={idx} className="border border-border/50 rounded p-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-foreground flex-1">
                          {hazard.hazard}
                        </p>
                        <div className="flex gap-2">
                          <Badge className={`${hazardColor.bg} ${hazardColor.text} border-none text-[10px]`}>
                            Initial: {hazard.riskRating}
                          </Badge>
                          <Badge className={`${residualColor.bg} ${residualColor.text} border-none text-[10px]`}>
                            Residual: {hazard.residualRisk}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-xs space-y-1">
                        <div className="flex gap-4 flex-wrap">
                          <span className="text-foreground/70">Likelihood: L{hazard.likelihood}</span>
                          <span className="text-foreground/70">Severity: S{hazard.severity}</span>
                          <span className="text-foreground/70">Risk: {hazard.riskRating}</span>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-border/30">
                        <p className="text-xs font-semibold text-foreground mb-1">Control Measures:</p>
                        <ul className="text-xs text-foreground/90 space-y-1">
                          {hazard.controls.map((control, cidx) => (
                            <li key={cidx} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-elec-yellow flex-shrink-0" />
                              {control}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Method Statement */}
            {data.methodStatement && data.methodStatement.length > 0 && (
              <div className="space-y-2 border-t border-border/50 pt-3">
                <p className="text-xs font-semibold text-foreground">Method Statement</p>
                <ol className="text-xs text-foreground/90 space-y-1 list-decimal list-inside">
                  {data.methodStatement.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Emergency Procedures */}
            {data.emergencyProcedures && data.emergencyProcedures.length > 0 && (
              <div className="space-y-2 border-t border-border/50 pt-3">
                <p className="text-xs font-semibold text-red-400">Emergency Procedures</p>
                <ul className="text-xs text-foreground/90 space-y-1">
                  {data.emergencyProcedures.map((procedure, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                      {procedure}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  AlertTriangle, 
  CheckCircle, 
  Construction, 
  Eye, 
  FileText, 
  ChevronDown,
  Thermometer,
  Zap,
  Shield,
  Wrench
} from "lucide-react";
import { RealWorldValidationResult } from "@/services/realWorldValidation";

interface RealWorldValidationPanelProps {
  validation: RealWorldValidationResult;
  calculationType: string;
}

const RealWorldValidationPanel: React.FC<RealWorldValidationPanelProps> = ({
  validation,
  calculationType
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'border-red-600 bg-red-900/20';
      case 'high': return 'border-orange-500 bg-orange-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-900/20';
      default: return 'border-green-500 bg-green-900/20';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-400 animate-pulse" />;
      case 'high': return <AlertTriangle className="h-5 w-5 text-orange-400" />;
      case 'medium': return <Eye className="h-5 w-5 text-yellow-400" />;
      default: return <CheckCircle className="h-5 w-5 text-green-400" />;
    }
  };

  const getConditionIcon = (conditionName: string) => {
    if (conditionName.includes('Temperature')) return <Thermometer className="h-4 w-4" />;
    if (conditionName.includes('Motor') || conditionName.includes('Harmonic')) return <Zap className="h-4 w-4" />;
    if (conditionName.includes('Emergency') || conditionName.includes('Critical')) return <Shield className="h-4 w-4" />;
    return <Construction className="h-4 w-4" />;
  };

  return (
    <Card className={`border-2 ${getRiskColor(validation.overallRisk)}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            {getRiskIcon(validation.overallRisk)}
            Real-World Validation
          </CardTitle>
          <Badge 
            variant={validation.overallRisk === 'critical' ? 'destructive' : 'outline'}
            className="text-xs"
          >
            {validation.overallRisk.toUpperCase()} RISK
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Risk Summary */}
        <Alert className={getRiskColor(validation.overallRisk)}>
          <AlertDescription>
            <div className="font-medium mb-2">
              {validation.overallRisk === 'critical' && '🚨 CRITICAL: Immediate attention required'}
              {validation.overallRisk === 'high' && '⚠️ HIGH RISK: Additional precautions needed'}
              {validation.overallRisk === 'medium' && '⚡ MEDIUM RISK: Enhanced monitoring recommended'}
              {validation.overallRisk === 'low' && '✅ LOW RISK: Standard practices apply'}
            </div>
            {validation.conditions.length > 0 ? (
              <p className="text-sm">
                {validation.conditions.length} real-world condition(s) identified that may affect this {calculationType} calculation.
              </p>
            ) : (
              <p className="text-sm">No significant real-world conditions identified. Standard design parameters apply.</p>
            )}
          </AlertDescription>
        </Alert>

        {/* Identified Conditions */}
        {validation.conditions.length > 0 && (
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:text-elec-yellow transition-colors">
              <Construction className="h-4 w-4" />
              Identified Conditions ({validation.conditions.length})
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              {validation.conditions.map((condition, index) => (
                <div key={index} className="border border-gray-600 rounded-lg p-3 bg-elec-dark/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getConditionIcon(condition.name)}
                      <span className="font-medium text-sm">{condition.name}</span>
                    </div>
                    <Badge 
                      variant={condition.impact === 'critical' ? 'destructive' : 'outline'}
                      className="text-xs"
                    >
                      {condition.impact}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{condition.description}</p>
                  <p className="text-xs mt-1">
                    Adjustment Factor: <span className="font-mono">{condition.adjustmentFactor}</span>
                  </p>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Practical Recommendations */}
        {validation.practicalRecommendations.length > 0 && (
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:text-elec-yellow transition-colors">
              <Wrench className="h-4 w-4" />
              Practical Recommendations ({validation.practicalRecommendations.length})
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 mt-2">
              {validation.practicalRecommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-2 text-sm p-2 bg-blue-500/10 rounded border border-blue-500/20">
                  <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span className="text-blue-200">{rec}</span>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Field Considerations */}
        {validation.fieldConsiderations.length > 0 && (
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:text-elec-yellow transition-colors">
              <Eye className="h-4 w-4" />
              Field Considerations ({validation.fieldConsiderations.length})
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 mt-2">
              {validation.fieldConsiderations.map((consideration, index) => (
                <div key={index} className="flex items-start gap-2 text-sm p-2 bg-amber-500/10 rounded border border-amber-500/20">
                  <div className="w-1 h-1 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                  <span className="text-amber-200">{consideration}</span>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Installation Notes */}
        {validation.installationNotes.length > 0 && (
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:text-elec-yellow transition-colors">
              <FileText className="h-4 w-4" />
              Installation Notes ({validation.installationNotes.length})
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 mt-2">
              {validation.installationNotes.map((note, index) => (
                <div key={index} className="flex items-start gap-2 text-sm p-2 bg-gray-500/10 rounded border border-gray-500/20">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                  <span className="text-gray-300">{note}</span>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Professional Disclaimer */}
        <Alert className="border-slate-500/50 bg-slate-500/10">
          <Shield className="h-4 w-4 text-slate-400" />
          <AlertDescription className="text-xs text-slate-300">
            <strong>Real-World Validation:</strong> These conditions represent common field scenarios that may affect your calculation. 
            Always verify actual site conditions and consult with experienced engineers for complex installations.
            {validation.overallRisk === 'critical' && (
              <div className="mt-2 text-red-300 font-medium">
                ⚠️ Critical conditions detected - do not proceed without professional consultation.
              </div>
            )}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default RealWorldValidationPanel;

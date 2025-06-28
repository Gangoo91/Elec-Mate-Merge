
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Info, Settings, Zap } from "lucide-react";
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
      case 'critical': return 'bg-red-900/20 border-red-600';
      case 'high': return 'bg-orange-900/20 border-orange-600';
      case 'medium': return 'bg-yellow-900/20 border-yellow-600';
      default: return 'bg-green-900/20 border-green-600';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'critical': return <Zap className="h-4 w-4 text-red-400" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-400" />;
      case 'medium': return <Info className="h-4 w-4 text-yellow-400" />;
      default: return <CheckCircle className="h-4 w-4 text-green-400" />;
    }
  };

  return (
    <Card className={`${getRiskColor(validation.overallRisk)} border-2`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Real-World Validation Panel</CardTitle>
          <Badge 
            variant={validation.overallRisk === 'critical' ? 'destructive' : 'default'}
            className="ml-auto"
          >
            {validation.overallRisk.toUpperCase()} RISK
          </Badge>
        </div>
        <CardDescription>
          Environmental and installation conditions for {calculationType}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Identified Conditions */}
        {validation.conditions.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              {getRiskIcon(validation.overallRisk)}
              Identified Real-World Conditions ({validation.conditions.length})
            </h4>
            <div className="grid gap-2">
              {validation.conditions.map((condition, index) => (
                <Alert key={index} className="py-2">
                  <AlertDescription>
                    <div className="flex justify-between items-start">
                      <div>
                        <strong>{condition.name}</strong>
                        <p className="text-xs text-muted-foreground mt-1">
                          {condition.description}
                        </p>
                      </div>
                      <Badge 
                        variant={condition.impact === 'critical' ? 'destructive' : 'outline'}
                        className="text-xs"
                      >
                        {condition.impact}
                      </Badge>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Practical Recommendations */}
        {validation.practicalRecommendations.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2">Practical Recommendations</h4>
            <ul className="space-y-1 text-sm">
              {validation.practicalRecommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Field Considerations */}
        {validation.fieldConsiderations.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2">Field Considerations</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {validation.fieldConsiderations.map((consideration, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-400">→</span>
                  <span>{consideration}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Installation Notes */}
        {validation.installationNotes.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2">Installation Notes</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {validation.installationNotes.map((note, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Risk Assessment Summary */}
        <Alert className={getRiskColor(validation.overallRisk)}>
          <AlertDescription>
            <div className="flex items-center gap-2 mb-2">
              {getRiskIcon(validation.overallRisk)}
              <strong>Overall Risk Assessment: {validation.overallRisk.toUpperCase()}</strong>
            </div>
            {validation.overallRisk === 'critical' && (
              <p className="text-sm text-red-300">
                🚨 CRITICAL: Professional consultation required before installation. 
                Additional safety measures and specialist expertise needed.
              </p>
            )}
            {validation.overallRisk === 'high' && (
              <p className="text-sm text-orange-300">
                ⚠️ HIGH: Enhanced precautions required. Consider additional safety measures 
                and monitoring during installation.
              </p>
            )}
            {validation.overallRisk === 'medium' && (
              <p className="text-sm text-yellow-300">
                ℹ️ MEDIUM: Standard precautions apply with additional considerations 
                for the identified conditions.
              </p>
            )}
            {validation.overallRisk === 'low' && (
              <p className="text-sm text-green-300">
                ✅ LOW: Standard installation practices apply. Monitor conditions as needed.
              </p>
            )}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default RealWorldValidationPanel;

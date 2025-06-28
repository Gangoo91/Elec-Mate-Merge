
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Shield } from "lucide-react";
import { ValidationResult } from "@/services/calculatorValidation";

interface ValidationIndicatorProps {
  validation: ValidationResult | null;
  calculationType: string;
}

const ValidationIndicator: React.FC<ValidationIndicatorProps> = ({ 
  validation, 
  calculationType 
}) => {
  if (!validation) {
    return null;
  }

  return (
    <div className="space-y-3">
      {/* Standards Compliance Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={validation.standardsCompliance.bs7671 ? "default" : "destructive"}
          className="flex items-center gap-1"
        >
          {validation.standardsCompliance.bs7671 ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <XCircle className="h-3 w-3" />
          )}
          BS 7671
        </Badge>
        
        <Badge 
          variant={validation.standardsCompliance.iet ? "default" : "destructive"}
          className="flex items-center gap-1"
        >
          {validation.standardsCompliance.iet ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <XCircle className="h-3 w-3" />
          )}
          IET
        </Badge>

        <Badge 
          variant={validation.standardsCompliance.safety ? "default" : "destructive"}
          className="flex items-center gap-1"
        >
          {validation.standardsCompliance.safety ? (
            <Shield className="h-3 w-3" />
          ) : (
            <XCircle className="h-3 w-3" />
          )}
          Safety
        </Badge>
      </div>

      {/* Validation Status */}
      <Alert className={validation.isValid ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"}>
        <div className="flex items-center gap-2">
          {validation.isValid ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <AlertDescription className="font-medium">
            {validation.isValid ? 'Calculation Valid' : 'Validation Issues Detected'}
          </AlertDescription>
        </div>
      </Alert>

      {/* Errors */}
      {validation.errors.length > 0 && (
        <Alert className="border-red-500/50 bg-red-500/10">
          <XCircle className="h-4 w-4 text-red-500" />
          <AlertDescription>
            <div className="font-medium text-red-300 mb-1">Errors:</div>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {validation.errors.map((error, index) => (
                <li key={index} className="text-red-200">{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Warnings */}
      {validation.warnings.length > 0 && (
        <Alert className="border-amber-500/50 bg-amber-500/10">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertDescription>
            <div className="font-medium text-amber-300 mb-1">Warnings:</div>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {validation.warnings.map((warning, index) => (
                <li key={index} className="text-amber-200">{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Professional Notice */}
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Shield className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-xs text-blue-200">
          <strong>Professional Notice:</strong> This {calculationType} calculation has been validated against BS 7671 and IET standards. 
          Always verify critical calculations with a qualified electrician before implementation.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ValidationIndicator;

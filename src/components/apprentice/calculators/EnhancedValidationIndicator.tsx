
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Zap } from "lucide-react";
import { SafetyValidationResult } from "@/services/safetyValidation";

interface EnhancedValidationIndicatorProps {
  validation: SafetyValidationResult | null;
  calculationType: string;
}

const EnhancedValidationIndicator: React.FC<EnhancedValidationIndicatorProps> = ({ 
  validation, 
  calculationType 
}) => {
  if (!validation) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Safety Status Header */}
      <div className="flex flex-wrap gap-2 items-center">
        <Badge 
          variant={validation.isValid ? "default" : "destructive"}
          className="flex items-center gap-1 text-sm"
        >
          {validation.isValid ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          {validation.isValid ? 'Safety Compliant' : 'Safety Issues Detected'}
        </Badge>
        
        {/* Safety Factors Display */}
        {validation.safetyFactors.safetyMargin > 0 && (
          <Badge variant="outline" className="text-xs">
            Safety Margin: {validation.safetyFactors.safetyMargin.toFixed(2)}
          </Badge>
        )}
      </div>

      {/* Critical Safety Alerts - Highest Priority */}
      {validation.criticalAlerts.length > 0 && (
        <Alert className="border-red-600 bg-red-900/20 border-2">
          <Zap className="h-5 w-5 text-red-400 animate-pulse" />
          <AlertDescription>
            <div className="font-bold text-red-300 mb-2 text-lg">⚠️ CRITICAL SAFETY ALERT</div>
            <ul className="list-disc list-inside space-y-2">
              {validation.criticalAlerts.map((alert, index) => (
                <li key={index} className="text-red-200 font-medium">{alert}</li>
              ))}
            </ul>
            <div className="mt-3 p-2 bg-red-800/30 rounded border border-red-600/50">
              <p className="text-red-100 text-sm font-medium">
                🚨 DO NOT PROCEED with installation until these issues are resolved.
                Consult a qualified electrician immediately.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Errors */}
      {validation.errors.length > 0 && (
        <Alert className="border-red-500/50 bg-red-500/10">
          <XCircle className="h-4 w-4 text-red-500" />
          <AlertDescription>
            <div className="font-medium text-red-300 mb-1">Calculation Errors:</div>
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
            <div className="font-medium text-amber-300 mb-1">Safety Warnings:</div>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {validation.warnings.map((warning, index) => (
                <li key={index} className="text-amber-200">{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Compliance Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Badge 
          variant={validation.complianceChecks.bs7671 ? "default" : "destructive"}
          className="flex items-center gap-1 justify-center"
        >
          {validation.complianceChecks.bs7671 ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <XCircle className="h-3 w-3" />
          )}
          BS 7671
        </Badge>
        
        <Badge 
          variant={validation.complianceChecks.iet ? "default" : "destructive"}
          className="flex items-center gap-1 justify-center"
        >
          {validation.complianceChecks.iet ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <XCircle className="h-3 w-3" />
          )}
          IET
        </Badge>

        <Badge 
          variant={validation.complianceChecks.buildingRegs ? "default" : "destructive"}
          className="flex items-center gap-1 justify-center"
        >
          {validation.complianceChecks.buildingRegs ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <XCircle className="h-3 w-3" />
          )}
          Building Regs
        </Badge>

        <Badge 
          variant={validation.complianceChecks.cdm ? "default" : "destructive"}
          className="flex items-center gap-1 justify-center"
        >
          {validation.complianceChecks.cdm ? (
            <CheckCircle className="h-3 w-3" />
          ) : (
            <XCircle className="h-3 w-3" />
          )}
          CDM
        </Badge>
      </div>

      {/* Safety Factors Detail */}
      {(validation.safetyFactors.temperatureDerating < 1.0 || 
        validation.safetyFactors.groupingFactor < 1.0) && (
        <Alert className="border-blue-500/50 bg-blue-500/10">
          <AlertDescription>
            <div className="font-medium text-blue-300 mb-2">Applied Safety Factors:</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {validation.safetyFactors.temperatureDerating < 1.0 && (
                <div className="text-blue-200">
                  Temperature derating: {(validation.safetyFactors.temperatureDerating * 100).toFixed(0)}%
                </div>
              )}
              {validation.safetyFactors.groupingFactor < 1.0 && (
                <div className="text-blue-200">
                  Grouping factor: {(validation.safetyFactors.groupingFactor * 100).toFixed(0)}%
                </div>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Professional Disclaimer */}
      <Alert className="border-slate-500/50 bg-slate-500/10">
        <AlertDescription className="text-xs text-slate-300">
          <strong>Professional Notice:</strong> These calculations include safety factors and real-world conditions. 
          However, all electrical work must be designed, installed, and certified by qualified personnel. 
          This tool is for guidance only and does not replace professional electrical design or inspection.
          {validation.criticalAlerts.length > 0 && (
            <div className="mt-2 text-red-300 font-medium">
              ⚠️ Critical safety issues detected - professional consultation required immediately.
            </div>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default EnhancedValidationIndicator;

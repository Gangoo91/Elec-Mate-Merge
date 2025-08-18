import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Shield } from "lucide-react";
import { SimpleValidationResult } from "@/services/simplifiedValidation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SimpleValidationIndicatorProps {
  validation: SimpleValidationResult | null;
  calculationType: string;
}

const SimpleValidationIndicator = ({ validation, calculationType }: SimpleValidationIndicatorProps) => {
  if (!validation) return null;

  const getValidationIcon = () => {
    if (validation.criticalAlerts.length > 0) {
      return <XCircle className="h-5 w-5 text-destructive" />;
    } else if (validation.warnings.length > 0) {
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    } else if (validation.isValid) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
  };

  const getValidationStatus = () => {
    if (validation.criticalAlerts.length > 0) {
      return { text: "Critical Issues", variant: "destructive" as const };
    } else if (validation.warnings.length > 0) {
      return { text: "Warnings", variant: "default" as const };
    } else if (validation.isValid) {
      return { text: "Compliant", variant: "default" as const };
    }
    return { text: "Issues Found", variant: "destructive" as const };
  };

  const status = getValidationStatus();

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg">Safety Validation</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {getValidationIcon()}
            <Badge variant={status.variant} className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
              {status.text}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Safety Factors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Temperature</div>
            <div className="text-lg font-semibold text-elec-yellow">
              {(validation.safetyFactors.temperatureDerating * 100).toFixed(0)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Grouping</div>
            <div className="text-lg font-semibold text-elec-yellow">
              {(validation.safetyFactors.groupingFactor * 100).toFixed(0)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Safety Margin</div>
            <div className="text-lg font-semibold text-elec-yellow">
              {(validation.safetyFactors.safetyMargin * 100).toFixed(0)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">BS 7671</div>
            <div className="text-lg font-semibold">
              {validation.complianceChecks.bs7671 ? (
                <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive mx-auto" />
              )}
            </div>
          </div>
        </div>

        {/* Critical Alerts */}
        {validation.criticalAlerts.length > 0 && (
          <Alert variant="destructive" className="border-red-500/20 bg-red-950/20">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-medium text-red-400 mb-2">CRITICAL SAFETY ALERTS:</div>
              <ul className="list-disc list-inside space-y-1">
                {validation.criticalAlerts.map((alert, index) => (
                  <li key={index} className="text-sm">{alert}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Errors */}
        {validation.errors.length > 0 && (
          <Alert variant="destructive" className="border-red-500/20 bg-red-950/20">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-medium text-red-400 mb-2">ERRORS:</div>
              <ul className="list-disc list-inside space-y-1">
                {validation.errors.map((error, index) => (
                  <li key={index} className="text-sm">{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Warnings */}
        {validation.warnings.length > 0 && (
          <Alert className="border-yellow-500/20 bg-yellow-950/20">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <AlertDescription>
              <div className="font-medium text-yellow-400 mb-2">WARNINGS:</div>
              <ul className="list-disc list-inside space-y-1">
                {validation.warnings.map((warning, index) => (
                  <li key={index} className="text-sm text-yellow-100">{warning}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Success message */}
        {validation.isValid && validation.warnings.length === 0 && validation.criticalAlerts.length === 0 && (
          <Alert className="border-green-500/20 bg-green-950/20">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-100">
              <div className="font-medium">Calculation passed all safety validations.</div>
              <div className="text-sm text-green-200 mt-1">
                This design meets BS 7671 requirements and professional safety standards.
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default SimpleValidationIndicator;
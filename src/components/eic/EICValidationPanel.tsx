
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  Shield,
  FileText
} from 'lucide-react';
import { useEICValidation, ValidationRule } from '@/hooks/useEICValidation';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';
import { cn } from '@/lib/utils';

interface EICValidationPanelProps {
  formData: any;
  className?: string;
}

const EICValidationPanel: React.FC<EICValidationPanelProps> = ({ formData, className = '' }) => {
  const validation = useEICValidation(formData);
  const isMobile = useIsMobile();
  const haptics = useHaptics();

  const getIconForSeverity = (severity: ValidationRule['severity']) => {
    switch (severity) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-elec-yellow/80" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getAlertVariant = (severity: ValidationRule['severity']) => {
    switch (severity) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <div className={cn(
      className,
      isMobile ? "-mx-4" : "rounded-xl border border-border/30 bg-card/30"
    )}>
      {/* Section Header */}
      <div className={cn(
        "flex items-center justify-between",
        isMobile ? "px-4 py-4 bg-card/30 border-y border-border/20" : "p-4 border-b border-border/30"
      )}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center shrink-0">
            <Shield className="h-5 w-5 text-elec-yellow" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground">EIC Validation & Compliance</h3>
          </div>
        </div>
        <Badge
          variant={validation.isValid ? 'default' : 'destructive'}
          className={cn(
            "gap-1 touch-manipulation",
            validation.isValid && "bg-green-500/20 text-green-400 border-green-500/30"
          )}
          onClick={() => haptics.tap()}
        >
          {validation.isValid ? (
            <>
              <CheckCircle className="h-3 w-3" />
              Valid
            </>
          ) : (
            <>
              <AlertTriangle className="h-3 w-3" />
              Issues Found
            </>
          )}
        </Badge>
      </div>

      {/* Content */}
      <div className={cn("space-y-4", isMobile ? "px-4 py-4" : "p-4")}>

        {/* Completion Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Completion Progress</span>
            <span className="text-muted-foreground">{validation.completionPercentage}%</span>
          </div>
          <Progress value={validation.completionPercentage} className="h-2" />
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-red-600">{validation.errors.length}</div>
            <div className="text-xs text-muted-foreground">Errors</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-amber-600">{validation.warnings.length}</div>
            <div className="text-xs text-muted-foreground">Warnings</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-600">
              {validation.isValid ? '✓' : '✗'}
            </div>
            <div className="text-xs text-muted-foreground">Status</div>
          </div>
        </div>

        {/* Validation Issues */}
        {validation.errors.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Critical Issues (Must Fix)
            </h4>
            {validation.errors.map((error, index) => (
              <Alert key={index} variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <p className="font-medium">{error.message}</p>
                    {error.regulation && (
                      <p className="text-xs text-muted-foreground">
                        Reference: {error.regulation}
                      </p>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {validation.warnings.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-amber-700 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Recommendations
            </h4>
            {validation.warnings.map((warning, index) => (
              <Alert key={index}>
                {getIconForSeverity(warning.severity)}
                <AlertDescription>
                  <div className="space-y-1">
                    <p className="font-medium">{warning.message}</p>
                    {warning.regulation && (
                      <p className="text-xs text-muted-foreground">
                        Reference: {warning.regulation}
                      </p>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Success State */}
        {validation.isValid && validation.completionPercentage >= 90 && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>EIC Ready for Generation!</strong> All required fields are complete and validation checks have passed. 
              You can now generate the official certificate.
            </AlertDescription>
          </Alert>
        )}

        {/* Legal Compliance Note */}
        <div className={cn(
          "pt-4 border-t",
          isMobile ? "border-border/20" : "border-border/30"
        )}>
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium mb-1">Legal Requirements:</p>
              <p>
                This EIC must comply with BS 7671:2018 and Building Regulations.
                All declarations require competent person signatures.
                Keep records for minimum 6 years.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EICValidationPanel;

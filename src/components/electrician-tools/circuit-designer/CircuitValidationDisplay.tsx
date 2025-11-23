import { AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ValidationIssue {
  circuitIndex: number;
  circuitName: string;
  rule: string;
  regulation: string;
  severity: 'error' | 'warning';
  message: string;
  currentValue: any;
  expectedValue: any;
  fieldAffected: string;
}

interface CircuitValidationDisplayProps {
  validationPassed?: boolean;
  validationIssues?: ValidationIssue[];
  autoFixSuggestions?: string[];
}

export const CircuitValidationDisplay = ({
  validationPassed,
  validationIssues = [],
  autoFixSuggestions = []
}: CircuitValidationDisplayProps) => {
  // If validation passed or no issues, don't show anything
  if (validationPassed === undefined || (validationPassed && validationIssues.length === 0)) {
    return null;
  }

  const errors = validationIssues.filter(i => i.severity === 'error');
  const warnings = validationIssues.filter(i => i.severity === 'warning');

  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          {validationPassed ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Design Valid with Warnings
            </>
          ) : (
            <>
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Validation Issues Detected
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="flex flex-wrap gap-2">
          {errors.length > 0 && (
            <Badge variant="destructive" className="gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.length} Error{errors.length !== 1 ? 's' : ''}
            </Badge>
          )}
          {warnings.length > 0 && (
            <Badge variant="secondary" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              {warnings.length} Warning{warnings.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        {/* Grouped Issues by Circuit */}
        <div className="space-y-3">
          {Object.entries(
            validationIssues.reduce((acc, issue) => {
              if (!acc[issue.circuitName]) acc[issue.circuitName] = [];
              acc[issue.circuitName].push(issue);
              return acc;
            }, {} as Record<string, ValidationIssue[]>)
          ).map(([circuitName, issues]) => (
            <div key={circuitName} className="space-y-2">
              <h4 className="font-semibold text-sm">{circuitName}</h4>
              {issues.map((issue, idx) => (
                <Alert
                  key={idx}
                  variant={issue.severity === 'error' ? 'destructive' : 'default'}
                  className="py-2"
                >
                  <AlertDescription className="text-xs sm:text-sm">
                    <div className="flex items-start gap-2">
                      {issue.severity === 'error' ? (
                        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                      )}
                      <div className="space-y-1">
                        <p className="font-medium">{issue.message}</p>
                        <p className="text-xs opacity-80">
                          Regulation: {issue.regulation}
                        </p>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          ))}
        </div>

        {/* Auto-Fix Suggestions */}
        {autoFixSuggestions.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            <h4 className="font-semibold text-sm">Suggested Fixes:</h4>
            <ul className="space-y-1 text-xs sm:text-sm">
              {autoFixSuggestions.map((suggestion, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary shrink-0">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

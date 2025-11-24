import { AlertTriangle, CheckCircle2, AlertCircle, XCircle, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

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

  const totalIssues = validationIssues.length;

  return (
    <Card className="border-destructive/30 bg-gradient-to-br from-destructive/5 via-destructive/3 to-background shadow-lg">
      <CardHeader className="pb-4 space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 p-2 rounded-lg bg-destructive/10 border border-destructive/20">
              <ShieldAlert className="h-5 w-5 text-destructive" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold text-foreground">
                Validation Errors ({totalIssues})
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Please fix errors before generating design
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {errors.length > 0 && (
              <Badge variant="destructive" className="gap-1.5 px-3 py-1 text-xs font-semibold shadow-sm">
                <XCircle className="h-3.5 w-3.5" />
                {errors.length} Error{errors.length !== 1 ? 's' : ''}
              </Badge>
            )}
            {warnings.length > 0 && (
              <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs font-semibold shadow-sm bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20">
                <AlertTriangle className="h-3.5 w-3.5" />
                {warnings.length} Warning{warnings.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <Separator className="opacity-50" />
      
      <CardContent className="pt-6 space-y-4">

        {/* Grouped Issues by Circuit */}
        <div className="space-y-4">
          {Object.entries(
            validationIssues.reduce((acc, issue) => {
              if (!acc[issue.circuitName]) acc[issue.circuitName] = [];
              acc[issue.circuitName].push(issue);
              return acc;
            }, {} as Record<string, ValidationIssue[]>)
          ).map(([circuitName, issues]) => (
            <Card key={circuitName} className="border-destructive/20 bg-background/50 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-destructive shrink-0" />
                  <CardTitle className="text-base font-semibold">{circuitName}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                {issues.map((issue, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-destructive/10 bg-destructive/5 p-3 space-y-2"
                  >
                    <div className="flex items-start gap-2.5">
                      {issue.severity === 'error' ? (
                        <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-yellow-600 dark:text-yellow-400" />
                      )}
                      <div className="flex-1 space-y-1.5">
                        <p className="text-sm font-medium text-foreground leading-relaxed">
                          {issue.message}
                        </p>
                        <p className="text-xs text-muted-foreground bg-muted/50 rounded px-2 py-1 inline-block">
                          {issue.regulation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Auto-Fix Suggestions */}
        {autoFixSuggestions.length > 0 && (
          <div className="space-y-3 pt-4">
            <Separator className="opacity-50" />
            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-sm text-foreground">Suggested Fixes</h4>
              </div>
              <ul className="space-y-2">
                {autoFixSuggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <span className="text-primary shrink-0 font-bold">→</span>
                    <span className="text-muted-foreground">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

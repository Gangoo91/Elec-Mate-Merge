import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ComplianceScoreGaugeProps {
  passCount: number;
  failCount: number;
  requiresTestingCount: number;
  totalChecks: number;
}

export const ComplianceScoreGauge = ({ 
  passCount, 
  failCount, 
  requiresTestingCount,
  totalChecks 
}: ComplianceScoreGaugeProps) => {
  const passPercentage = totalChecks > 0 ? Math.round((passCount / totalChecks) * 100) : 0;
  const failPercentage = totalChecks > 0 ? Math.round((failCount / totalChecks) * 100) : 0;
  const testingPercentage = totalChecks > 0 ? Math.round((requiresTestingCount / totalChecks) * 100) : 0;

  const getOverallStatus = () => {
    if (failCount > 0) return { text: 'Action Required', color: 'text-red-500', bg: 'bg-red-500/10' };
    if (requiresTestingCount > 0) return { text: 'Testing Required', color: 'text-amber-500', bg: 'bg-amber-500/10' };
    return { text: 'Compliant', color: 'text-green-500', bg: 'bg-green-500/10' };
  };

  const status = getOverallStatus();

  return (
    <Card className="p-4 sm:p-6 bg-card border-border/40">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Compliance Overview</h3>
          <div className={`px-3 py-1 rounded-full ${status.bg}`}>
            <span className={`text-sm font-medium ${status.color}`}>{status.text}</span>
          </div>
        </div>

        {/* Visual breakdown */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center space-y-1">
            <div className="bg-green-500/10 p-3 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto" />
            </div>
            <p className="text-2xl font-bold text-foreground">{passCount}</p>
            <p className="text-xs text-muted-foreground">Passed</p>
          </div>
          <div className="text-center space-y-1">
            <div className="bg-red-500/10 p-3 rounded-lg">
              <XCircle className="h-6 w-6 text-red-500 mx-auto" />
            </div>
            <p className="text-2xl font-bold text-foreground">{failCount}</p>
            <p className="text-xs text-muted-foreground">Failed</p>
          </div>
          <div className="text-center space-y-1">
            <div className="bg-amber-500/10 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-amber-500 mx-auto" />
            </div>
            <p className="text-2xl font-bold text-foreground">{requiresTestingCount}</p>
            <p className="text-xs text-muted-foreground">Testing Needed</p>
          </div>
        </div>

        {/* Progress bars */}
        <div className="space-y-3 pt-2">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Pass Rate</span>
              <span className="text-xs font-medium text-green-500">{passPercentage}%</span>
            </div>
            <Progress value={passPercentage} className="h-2 bg-muted/30" />
          </div>
          
          {failCount > 0 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Failures</span>
                <span className="text-xs font-medium text-red-500">{failPercentage}%</span>
              </div>
              <Progress value={failPercentage} className="h-2 bg-muted/30 [&>div]:bg-red-500" />
            </div>
          )}
          
          {requiresTestingCount > 0 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Requires Testing</span>
                <span className="text-xs font-medium text-amber-500">{testingPercentage}%</span>
              </div>
              <Progress value={testingPercentage} className="h-2 bg-muted/30 [&>div]:bg-amber-500" />
            </div>
          )}
        </div>

        {/* Overall score */}
        <div className="pt-4 border-t border-border/40">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Overall Compliance Score</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{passPercentage}%</span>
            <span className="text-sm text-muted-foreground">of checks passed</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

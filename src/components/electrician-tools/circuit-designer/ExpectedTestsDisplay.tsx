import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

interface ExpectedTestValues {
  r1r2: {
    at20C: number;
    at70C: number;
    value: string;
    regulation: string;
  };
  zs: {
    expected: number;
    maxPermitted: number;
    marginPercent: number;
    compliant: boolean;
    regulation: string;
  };
  insulationResistance: {
    testVoltage: string;
    minResistance: string;
    regulation: string;
  };
  rcd?: {
    ratingmA: number;
    maxTripTimeMs: number;
    testCurrentMultiple: number;
    regulation: string;
  };
}

interface ExpectedTestsDisplayProps {
  expectedTests?: ExpectedTestValues;
  circuitName: string;
}

export const ExpectedTestsDisplay = ({
  expectedTests,
  circuitName
}: ExpectedTestsDisplayProps) => {
  if (!expectedTests) return null;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4 space-y-2">
        <CardTitle className="text-lg sm:text-xl">
          Expected Test Results
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Use these values for EIC testing and commissioning
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* R1+R2 */}
        <div className="space-y-3 p-4 rounded-lg border border-border/50 bg-card/50">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-sm sm:text-base">R1+R2 (Continuity)</h4>
            <Badge variant="outline" className="text-xs shrink-0">
              {expectedTests.r1r2.regulation}
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">At 20°C</p>
              <p className="font-mono text-lg">{expectedTests.r1r2.at20C.toFixed(4)}Ω</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">At 70°C (Test)</p>
              <p className="font-mono text-lg font-bold text-primary">{expectedTests.r1r2.at70C.toFixed(4)}Ω</p>
            </div>
          </div>
        </div>

        {/* Zs */}
        <div className="space-y-3 p-4 rounded-lg border border-border/50 bg-card/50">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-sm sm:text-base">Earth Fault Loop Impedance (Zs)</h4>
            {expectedTests.zs.compliant ? (
              <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-xs font-medium">PASS</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-destructive">
                <XCircle className="h-5 w-5" />
                <span className="text-xs font-medium">FAIL</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Expected Zs</p>
              <p className={`font-mono text-lg font-bold ${expectedTests.zs.compliant ? 'text-green-600 dark:text-green-400' : 'text-destructive'}`}>
                {expectedTests.zs.expected.toFixed(3)}Ω
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Maximum Permitted</p>
              <p className="font-mono text-lg">{expectedTests.zs.maxPermitted.toFixed(3)}Ω</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-border/30">
            <span className="text-xs text-muted-foreground">{expectedTests.zs.regulation}</span>
            <Badge
              variant={expectedTests.zs.compliant ? 'default' : 'destructive'}
              className="text-xs w-fit"
            >
              {expectedTests.zs.marginPercent >= 0
                ? `${expectedTests.zs.marginPercent.toFixed(1)}% safety margin`
                : 'Non-compliant'}
            </Badge>
          </div>
        </div>

        {/* Insulation Resistance */}
        <div className="space-y-3 p-4 rounded-lg border border-border/50 bg-card/50">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-sm sm:text-base">Insulation Resistance</h4>
            <Badge variant="outline" className="text-xs shrink-0">
              {expectedTests.insulationResistance.regulation}
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Test Voltage</p>
              <p className="font-mono text-lg">{expectedTests.insulationResistance.testVoltage}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Minimum Required</p>
              <p className="font-mono text-lg font-bold text-primary">{expectedTests.insulationResistance.minResistance}</p>
            </div>
          </div>
        </div>

        {/* RCD Test (if applicable) */}
        {expectedTests.rcd && (
          <div className="space-y-3 p-4 rounded-lg border border-border/50 bg-card/50">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-semibold text-sm sm:text-base">RCD Operation Test</h4>
              <Badge variant="outline" className="text-xs shrink-0">
                {expectedTests.rcd.regulation}
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">RCD Rating</p>
                <p className="font-mono text-lg">{expectedTests.rcd.ratingmA}mA</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Max Trip Time (1×IΔn)</p>
                <p className="font-mono text-lg font-bold text-primary">&lt; {expectedTests.rcd.maxTripTimeMs}ms</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground pt-2 border-t border-border/30">
              Test at {expectedTests.rcd.testCurrentMultiple}× and 5× rated current
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

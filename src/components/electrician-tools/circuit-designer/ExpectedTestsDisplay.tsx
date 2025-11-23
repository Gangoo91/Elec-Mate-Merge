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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg">
          Expected Test Results
        </CardTitle>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Use these values for EIC testing and commissioning
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* R1+R2 */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">R1+R2 (Continuity)</h4>
            <Badge variant="outline" className="text-xs">
              {expectedTests.r1r2.regulation}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">At 20°C</p>
              <p className="font-mono">{expectedTests.r1r2.at20C.toFixed(4)}Ω</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">At 70°C (Test)</p>
              <p className="font-mono font-bold">{expectedTests.r1r2.at70C.toFixed(4)}Ω</p>
            </div>
          </div>
        </div>

        {/* Zs */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Earth Fault Loop Impedance (Zs)</h4>
            {expectedTests.zs.compliant ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-destructive" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Expected Zs</p>
              <p className="font-mono font-bold">{expectedTests.zs.expected.toFixed(3)}Ω</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Maximum Permitted</p>
              <p className="font-mono">{expectedTests.zs.maxPermitted.toFixed(3)}Ω</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-muted-foreground">{expectedTests.zs.regulation}</span>
            <Badge
              variant={expectedTests.zs.compliant ? 'default' : 'destructive'}
              className="text-xs"
            >
              {expectedTests.zs.marginPercent >= 0
                ? `${expectedTests.zs.marginPercent.toFixed(1)}% margin`
                : 'Non-compliant'}
            </Badge>
          </div>
        </div>

        {/* Insulation Resistance */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Insulation Resistance</h4>
            <Badge variant="outline" className="text-xs">
              {expectedTests.insulationResistance.regulation}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Test Voltage</p>
              <p className="font-mono">{expectedTests.insulationResistance.testVoltage}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Minimum Required</p>
              <p className="font-mono font-bold">{expectedTests.insulationResistance.minResistance}</p>
            </div>
          </div>
        </div>

        {/* RCD Test (if applicable) */}
        {expectedTests.rcd && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">RCD Operation Test</h4>
              <Badge variant="outline" className="text-xs">
                {expectedTests.rcd.regulation}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">RCD Rating</p>
                <p className="font-mono">{expectedTests.rcd.ratingmA}mA</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Max Trip Time (1×IΔn)</p>
                <p className="font-mono font-bold">&lt; {expectedTests.rcd.maxTripTimeMs}ms</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              Test at {expectedTests.rcd.testCurrentMultiple}× and 5× rated current
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

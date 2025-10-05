import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, Cable, Zap, TrendingDown, Shield } from "lucide-react";
import { InstallPlanDataV2, CalculationResult } from "../types";

interface ResultsStepProps {
  planData: InstallPlanDataV2;
  updatePlanData: (data: InstallPlanDataV2) => void;
  result: CalculationResult | null;
}

export const ResultsStep = ({ result }: ResultsStepProps) => {
  if (!result) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-muted-foreground">
          <p>Calculating...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Compliance Status */}
      <div className={`p-6 rounded-xl ${
        result.compliant 
          ? 'bg-green-500/10 border-2 border-green-500/50' 
          : 'bg-red-500/10 border-2 border-red-500/50'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          {result.compliant ? (
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          ) : (
            <AlertTriangle className="h-8 w-8 text-red-500" />
          )}
          <div>
            <h3 className="text-2xl font-bold text-foreground">
              {result.compliant ? 'BS 7671 Compliant' : 'Non-Compliant'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {result.compliant 
                ? 'Installation meets all electrical safety standards' 
                : 'Installation requires adjustments to meet standards'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Cable className="h-5 w-5 text-primary" />
              Cable Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary mb-2">
              {result.recommendedCableSize}mm²
            </div>
            <div className="text-sm text-foreground">
              Capacity: {result.deratedCapacity.toFixed(1)}A (derated)
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Base capacity: {result.capacity}A
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-yellow/5 border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Shield className="h-5 w-5 text-elec-yellow" />
              Protection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-elec-yellow mb-2">
              {result.protectiveDevice}
            </div>
            <div className="text-sm text-foreground">
              Overcurrent protection device
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-primary" />
              Voltage Drop
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary mb-2">
              {result.voltageDropPercent.toFixed(2)}%
            </div>
            <div className="text-sm text-foreground">
              {result.voltageDrop.toFixed(2)}V drop
            </div>
            <Badge className={result.voltageDropPercent <= 3 ? 'bg-green-500' : 'bg-amber-500'}>
              {result.voltageDropPercent <= 3 ? 'Within limits' : 'Review required'}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-green-500/5 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-500" />
              Safety Margin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-400 mb-2">
              {result.safetyMargin.toFixed(1)}%
            </div>
            <div className="text-sm text-foreground">
              Capacity above requirement
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Zs: {result.zs.toFixed(3)}Ω
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Derating Factors */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Applied Derating Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-muted-foreground">Temperature</div>
              <div className="text-2xl font-bold text-primary">{result.factors.temperature}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Grouping</div>
              <div className="text-2xl font-bold text-primary">{result.factors.grouping}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Overall</div>
              <div className="text-2xl font-bold text-primary">{result.factors.overall.toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-400 mb-2">Warnings</h4>
              <ul className="space-y-1">
                {result.warnings.map((warning, idx) => (
                  <li key={idx} className="text-sm text-foreground">• {warning}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="font-semibold text-primary mb-2">Recommendations</h4>
              <ul className="space-y-1">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm text-foreground">• {rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

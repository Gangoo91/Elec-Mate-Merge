
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Calculator, TrendingUp } from 'lucide-react';
import { ZsCalculationResult } from '@/utils/zsCalculations';

interface ZsResultsDisplayProps {
  result: ZsCalculationResult | null;
  showBreakdown?: boolean;
}

export const ZsResultsDisplay: React.FC<ZsResultsDisplayProps> = ({
  result,
  showBreakdown = true
}) => {
  if (!result) return null;

  const { zs, formula, breakdown, compliance } = result;

  const getComplianceColor = () => {
    if (!compliance.maxAllowed) return 'text-gray-400';
    return compliance.isCompliant ? 'text-green-400' : 'text-red-400';
  };

  const getComplianceIcon = () => {
    if (!compliance.maxAllowed) return <AlertTriangle className="h-5 w-5 text-gray-400" />;
    return compliance.isCompliant 
      ? <CheckCircle className="h-5 w-5 text-green-400" />
      : <XCircle className="h-5 w-5 text-red-400" />;
  };

  const getMarginPercentage = () => {
    if (!compliance.maxAllowed || !compliance.margin) return null;
    return ((compliance.margin / compliance.maxAllowed) * 100).toFixed(1);
  };

  return (
    <div className="space-y-4">
      {/* Main Result */}
      <Card className="bg-gradient-to-br from-card to-background border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculation Result
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground mb-2">
              Zs = {zs.toFixed(3)} Ω
            </div>
            <p className="text-sm text-gray-400">{formula}</p>
          </div>

          {showBreakdown && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-semibold text-foreground">{breakdown.ze.toFixed(3)} Ω</div>
                <div className="text-xs text-gray-400">Ze (External)</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-semibold text-foreground">{breakdown.r1r2.toFixed(3)} Ω</div>
                <div className="text-xs text-gray-400">R1 + R2</div>
              </div>
              {breakdown.additionalResistances && breakdown.additionalResistances > 0 && (
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-semibold text-foreground">{breakdown.additionalResistances.toFixed(3)} Ω</div>
                  <div className="text-xs text-gray-400">Additional</div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Compliance Check */}
      {compliance.maxAllowed && (
        <Card className={`border ${compliance.isCompliant ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${getComplianceColor()}`}>
              {getComplianceIcon()}
              Regulation Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Device:</span>
              <Badge variant="outline" className="text-foreground">
                {compliance.deviceType} {compliance.rating}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Maximum Zs:</span>
              <span className="font-semibold text-elec-yellow">
                {compliance.maxAllowed.toFixed(3)} Ω
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Measured Zs:</span>
              <span className={`font-semibold ${getComplianceColor()}`}>
                {zs.toFixed(3)} Ω
              </span>
            </div>
            
            {compliance.margin !== null && (
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Safety Margin:</span>
                <div className="text-right">
                  <span className={`font-semibold ${getComplianceColor()}`}>
                    {compliance.margin > 0 ? '+' : ''}{compliance.margin.toFixed(3)} Ω
                  </span>
                  {getMarginPercentage() && (
                    <div className="text-xs text-gray-400">
                      ({getMarginPercentage()}% margin)
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className={`p-3 rounded-lg border ${
              compliance.isCompliant 
                ? 'border-green-500/30 bg-green-500/10' 
                : 'border-red-500/30 bg-red-500/10'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {getComplianceIcon()}
                <span className={`font-semibold ${getComplianceColor()}`}>
                  {compliance.isCompliant ? 'PASS' : 'FAIL'}
                </span>
              </div>
              <p className="text-sm text-gray-300">
                {compliance.isCompliant 
                  ? 'Circuit meets BS7671 requirements for automatic disconnection.'
                  : 'Circuit exceeds maximum Zs limit. Remedial action required.'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ZsResultsDisplay;

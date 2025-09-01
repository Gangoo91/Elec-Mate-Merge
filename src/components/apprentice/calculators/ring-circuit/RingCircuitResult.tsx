import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Eye, TrendingUp, BarChart3 } from "lucide-react";
import WhyThisMatters from "@/components/common/WhyThisMatters";

interface RingCircuitResult {
  r1: number;
  r2: number;
  rn: number;
  r1PlusR2: number;
  isValid: boolean;
  continuityStatus: string;
  recommendations: string[];
  warnings: string[];
  validationDetails: {
    endToEndChecks: ValidationCheck[];
    crossConnectionChecks: ValidationCheck[];
    mathematicalChecks: ValidationCheck[];
    cableComparisonChecks: ValidationCheck[];
  };
  expectedValues?: {
    r1Expected: number;
    r2Expected: number;
    toleranceRange: number;
  };
}

interface ValidationCheck {
  description: string;
  status: 'pass' | 'fail' | 'warning';
  actualValue?: number;
  expectedValue?: number;
  tolerance?: number;
  message: string;
}

interface RingCircuitResultProps {
  result: RingCircuitResult;
}

const RingCircuitResult: React.FC<RingCircuitResultProps> = ({ result }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="h-3 w-3 text-yellow-400 flex-shrink-0" />;
      case 'fail':
        return <AlertTriangle className="h-3 w-3 text-red-400 flex-shrink-0" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-green-500/10 border-green-500/30';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30';
      case 'fail':
        return 'bg-red-500/10 border-red-500/30';
      default:
        return 'bg-elec-dark/30';
    }
  };

  const whyThisMattersPoints = [
    "Ring circuit testing ensures electrical safety and code compliance for socket outlet circuits",
    "Proper continuity confirms the ring is intact and will operate correctly under fault conditions",
    "Cross-connection testing verifies that protective devices will operate when needed",
    "R1+R2 values are critical for earth fault loop impedance calculations and safety"
  ];

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <Card className="bg-elec-card border-elec-yellow/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg sm:text-xl">Test Results</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Alert */}
          <Alert className={`border ${result.isValid ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
            {result.isValid ? (
              <CheckCircle className="h-4 w-4 text-green-400" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-400" />
            )}
            <AlertDescription className={result.isValid ? 'text-green-400' : 'text-red-400'}>
              <div className="font-medium">{result.continuityStatus}</div>
            </AlertDescription>
          </Alert>

          {/* Calculated Values */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-4 rounded-lg bg-elec-dark/30 border border-elec-yellow/20">
              <div className="text-xs text-muted-foreground mb-1">R1 (Live)</div>
              <div className="text-lg font-bold text-elec-yellow">{result.r1.toFixed(3)} Ω</div>
              {result.expectedValues && (
                <div className="text-xs text-muted-foreground mt-2">
                  Expected: {result.expectedValues.r1Expected.toFixed(3)} Ω
                </div>
              )}
            </div>
            
            <div className="p-4 rounded-lg bg-elec-dark/30 border border-elec-yellow/20">
              <div className="text-xs text-muted-foreground mb-1">R2 (CPC)</div>
              <div className="text-lg font-bold text-elec-yellow">{result.r2.toFixed(3)} Ω</div>
              {result.expectedValues && (
                <div className="text-xs text-muted-foreground mt-2">
                  Expected: {result.expectedValues.r2Expected.toFixed(3)} Ω
                </div>
              )}
            </div>
            
            <div className="p-4 rounded-lg bg-elec-dark/30 border border-elec-yellow/20">
              <div className="text-xs text-muted-foreground mb-1">Rn (Neutral)</div>
              <div className="text-lg font-bold text-elec-yellow">{result.rn.toFixed(3)} Ω</div>
            </div>
            
            <div className="p-4 rounded-lg bg-elec-dark/30 border border-elec-yellow/20">
              <div className="text-xs text-muted-foreground mb-1">R1 + R2</div>
              <div className="text-lg font-bold text-elec-yellow">{result.r1PlusR2.toFixed(3)} Ω</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Card className="bg-elec-card border-elec-yellow/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-lg">Detailed Test Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(result.validationDetails).map(([category, checks]) => {
            if (checks.length === 0) return null;
            
            return (
              <div key={category} className="bg-elec-dark/30 rounded-lg p-4">
                <h5 className="font-medium text-elec-light mb-3 text-sm capitalize">
                  {category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h5>
                <div className="space-y-3">
                  {checks.map((check, index) => (
                    <div key={index} className={`flex items-start gap-3 p-3 rounded border text-sm ${getStatusColor(check.status)}`}>
                      {getStatusIcon(check.status)}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-elec-light">{check.description}</div>
                        <div className="text-muted-foreground mt-1">{check.message}</div>
                        {check.actualValue !== undefined && (
                          <div className="mt-2 flex flex-wrap gap-4 text-xs">
                            <span>Actual: {check.actualValue.toFixed(3)}Ω</span>
                            {check.expectedValue && (
                              <span>Expected: {check.expectedValue.toFixed(3)}Ω</span>
                            )}
                            {check.tolerance && (
                              <span>Tolerance: ±{check.tolerance.toFixed(3)}Ω</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <Alert className="bg-yellow-500/10 border-yellow-500/30">
          <AlertTriangle className="h-4 w-4 text-yellow-400" />
          <AlertDescription>
            <div className="font-medium text-yellow-400 mb-2">Warnings:</div>
            <ul className="space-y-1">
              {result.warnings.map((warning, index) => (
                <li key={index} className="text-sm text-yellow-300">• {warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <Card className="bg-elec-card border-elec-yellow/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-elec-light">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2"></span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Why This Matters */}
      <WhyThisMatters 
        title="Why Ring Circuit Testing Matters"
        points={whyThisMattersPoints}
      />
    </div>
  );
};

export default RingCircuitResult;
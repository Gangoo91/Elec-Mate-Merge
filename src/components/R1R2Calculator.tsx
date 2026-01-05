import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calculator, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { analyseR1R2, R1R2Calculation } from '@/utils/r1r2Calculator';
import { TestResult } from '@/types/testResult';

interface R1R2CalculatorProps {
  result: TestResult;
  onUpdate?: (field: keyof TestResult, value: string) => void;
  className?: string;
}

const R1R2Calculator: React.FC<R1R2CalculatorProps> = ({ result, onUpdate, className }) => {
  const [cableLength, setCableLength] = useState<string>('');
  const [temperatureCorrection, setTemperatureCorrection] = useState<string>('1.2');
  const [calculation, setCalculation] = useState<R1R2Calculation | null>(null);

  useEffect(() => {
    if (cableLength && parseFloat(cableLength) > 0) {
      const length = parseFloat(cableLength);
      const tempCorrection = parseFloat(temperatureCorrection) || 1.2;
      const calc = analyseR1R2(result, length, tempCorrection);
      setCalculation(calc);
    } else {
      setCalculation(null);
    }
  }, [cableLength, temperatureCorrection, result]);

  const handleCalculate = () => {
    if (calculation && onUpdate) {
      onUpdate('r1r2', calculation.expectedR1R2.toString());
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          R1+R2 Calculator & Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cable-length">Cable Length (m)</Label>
            <Input
              id="cable-length"
              type="number"
              placeholder="Enter length"
              value={cableLength}
              onChange={(e) => setCableLength(e.target.value)}
              step="0.1"
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="temp-correction">Temperature Factor</Label>
            <Input
              id="temp-correction"
              type="number"
              value={temperatureCorrection}
              onChange={(e) => setTemperatureCorrection(e.target.value)}
              step="0.1"
              min="1.0"
              max="2.0"
            />
          </div>
        </div>

        {calculation && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium text-muted-foreground">Expected R1+R2</div>
                <div className="text-lg font-semibold">{calculation.expectedR1R2}Ω</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium text-muted-foreground">Actual R1+R2</div>
                <div className="text-lg font-semibold">
                  {calculation.actualR1R2 ? `${calculation.actualR1R2}Ω` : 'Not recorded'}
                </div>
              </div>
            </div>

            {calculation.actualR1R2 && (
              <div className="flex items-center gap-2">
                {calculation.isWithinTolerance ? (
                  <Badge variant="outline" className="gap-1 text-green-700 border-green-300">
                    <CheckCircle className="h-3 w-3" />
                    Within tolerance ({calculation.tolerancePercentage}%)
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Outside tolerance ({calculation.tolerancePercentage}%)
                  </Badge>
                )}
              </div>
            )}

            {calculation.warnings.length > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    {calculation.warnings.map((warning, index) => (
                      <div key={index} className="text-sm">{warning}</div>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {calculation.recommendations.length > 0 && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-medium mb-1">Recommendations:</div>
                  <ul className="text-sm space-y-1">
                    {calculation.recommendations.map((rec, index) => (
                      <li key={index} className="ml-2">• {rec}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {onUpdate && (
              <Button 
                onClick={handleCalculate}
                size="sm" 
                className="w-full"
                disabled={!calculation.expectedR1R2}
              >
                Use Expected Value ({calculation.expectedR1R2}Ω)
              </Button>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <div className="font-medium mb-1">Cable Info:</div>
          <div>Live: {result.liveSize} • CPC: {result.cpcSize || result.liveSize}</div>
          <div>Temperature correction accounts for conductor heating under load</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default R1R2Calculator;

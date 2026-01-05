import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Calculator, Zap } from 'lucide-react';

interface PowerCalculatorProps {
  className?: string;
}

export const PowerCalculator: React.FC<PowerCalculatorProps> = ({ className }) => {
  const [calcType, setCalcType] = useState<'power' | 'voltage' | 'current' | 'resistance'>('power');
  const [voltage, setVoltage] = useState<string>('');
  const [current, setCurrent] = useState<string>('');
  const [resistance, setResistance] = useState<string>('');
  const [power, setPower] = useState<string>('');

  const result = useMemo(() => {
    const V = parseFloat(voltage) || 0;
    const I = parseFloat(current) || 0;
    const R = parseFloat(resistance) || 0;
    const P = parseFloat(power) || 0;

    if (calcType === 'power') {
      if (V > 0 && I > 0) {
        return { value: (V * I).toFixed(2), unit: 'W', formula: 'P = V × I' };
      } else if (I > 0 && R > 0) {
        return { value: (I * I * R).toFixed(2), unit: 'W', formula: 'P = I² × R' };
      } else if (V > 0 && R > 0) {
        return { value: ((V * V) / R).toFixed(2), unit: 'W', formula: 'P = V² ÷ R' };
      }
    } else if (calcType === 'voltage') {
      if (P > 0 && I > 0) {
        return { value: (P / I).toFixed(2), unit: 'V', formula: 'V = P ÷ I' };
      } else if (I > 0 && R > 0) {
        return { value: (I * R).toFixed(2), unit: 'V', formula: 'V = I × R' };
      } else if (P > 0 && R > 0) {
        return { value: Math.sqrt(P * R).toFixed(2), unit: 'V', formula: 'V = √(P × R)' };
      }
    } else if (calcType === 'current') {
      if (P > 0 && V > 0) {
        return { value: (P / V).toFixed(2), unit: 'A', formula: 'I = P ÷ V' };
      } else if (V > 0 && R > 0) {
        return { value: (V / R).toFixed(2), unit: 'A', formula: 'I = V ÷ R' };
      } else if (P > 0 && R > 0) {
        return { value: Math.sqrt(P / R).toFixed(2), unit: 'A', formula: 'I = √(P ÷ R)' };
      }
    } else if (calcType === 'resistance') {
      if (V > 0 && I > 0) {
        return { value: (V / I).toFixed(2), unit: 'Ω', formula: 'R = V ÷ I' };
      } else if (P > 0 && I > 0) {
        return { value: (P / (I * I)).toFixed(2), unit: 'Ω', formula: 'R = P ÷ I²' };
      } else if (V > 0 && P > 0) {
        return { value: ((V * V) / P).toFixed(2), unit: 'Ω', formula: 'R = V² ÷ P' };
      }
    }

    return null;
  }, [calcType, voltage, current, resistance, power]);

  const clearAll = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setPower('');
  };

  return (
    <Card className={`p-6 bg-card border-border/20 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-elec-dark/10">
          <Calculator className="w-5 h-5 text-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Interactive Power Calculator</h3>
      </div>

      <div className="grid gap-6">
        {/* Calculation Type */}
        <div className="space-y-2">
          <Label htmlFor="calc-type" className="text-sm font-medium text-foreground">
            Calculate:
          </Label>
          <Select value={calcType} onValueChange={(value) => setCalcType(value as any)}>
            <SelectTrigger id="calc-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="power">Power (P)</SelectItem>
              <SelectItem value="voltage">Voltage (V)</SelectItem>
              <SelectItem value="current">Current (I)</SelectItem>
              <SelectItem value="resistance">Resistance (R)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {calcType !== 'voltage' && (
            <div className="space-y-2">
              <Label htmlFor="voltage" className="text-sm font-medium text-foreground">
                Voltage (V)
              </Label>
              <Input
                id="voltage"
                type="number"
                placeholder="e.g., 230"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="bg-background"
              />
            </div>
          )}

          {calcType !== 'current' && (
            <div className="space-y-2">
              <Label htmlFor="current" className="text-sm font-medium text-foreground">
                Current (A)
              </Label>
              <Input
                id="current"
                type="number"
                placeholder="e.g., 13"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="bg-background"
              />
            </div>
          )}

          {calcType !== 'resistance' && (
            <div className="space-y-2">
              <Label htmlFor="resistance" className="text-sm font-medium text-foreground">
                Resistance (Ω)
              </Label>
              <Input
                id="resistance"
                type="number"
                placeholder="e.g., 17.6"
                value={resistance}
                onChange={(e) => setResistance(e.target.value)}
                className="bg-background"
              />
            </div>
          )}

          {calcType !== 'power' && (
            <div className="space-y-2">
              <Label htmlFor="power" className="text-sm font-medium text-foreground">
                Power (W)
              </Label>
              <Input
                id="power"
                type="number"
                placeholder="e.g., 3000"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className="bg-background"
              />
            </div>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className="bg-elec-dark/10 border border-elec-yellow/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-elec-yellow" />
              <span className="text-sm font-medium text-elec-yellow">Result</span>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {result.value} {result.unit}
            </div>
            <div className="text-sm text-muted-foreground">
              Using: {result.formula}
            </div>
          </div>
        )}

        {/* Helper Text */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>💡 <strong>Tip:</strong> Enter any two known values to calculate the third.</p>
          <p>⚡ Common UK voltages: 230V (single-phase), 400V (three-phase)</p>
          <p>📖 Remember: These calculations apply to resistive loads</p>
        </div>

        {/* Clear Button */}
        <button
          onClick={clearAll}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear all values
        </button>
      </div>
    </Card>
  );
};
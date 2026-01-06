import React, { useState, useMemo } from 'react';
import { Info } from 'lucide-react';
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultValue,
} from "@/components/calculators/shared";

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
        return { value: (V * I).toFixed(2), unit: 'W', formula: 'P = V × I', label: 'Power' };
      } else if (I > 0 && R > 0) {
        return { value: (I * I * R).toFixed(2), unit: 'W', formula: 'P = I² × R', label: 'Power' };
      } else if (V > 0 && R > 0) {
        return { value: ((V * V) / R).toFixed(2), unit: 'W', formula: 'P = V² ÷ R', label: 'Power' };
      }
    } else if (calcType === 'voltage') {
      if (P > 0 && I > 0) {
        return { value: (P / I).toFixed(2), unit: 'V', formula: 'V = P ÷ I', label: 'Voltage' };
      } else if (I > 0 && R > 0) {
        return { value: (I * R).toFixed(2), unit: 'V', formula: 'V = I × R', label: 'Voltage' };
      } else if (P > 0 && R > 0) {
        return { value: Math.sqrt(P * R).toFixed(2), unit: 'V', formula: 'V = √(P × R)', label: 'Voltage' };
      }
    } else if (calcType === 'current') {
      if (P > 0 && V > 0) {
        return { value: (P / V).toFixed(2), unit: 'A', formula: 'I = P ÷ V', label: 'Current' };
      } else if (V > 0 && R > 0) {
        return { value: (V / R).toFixed(2), unit: 'A', formula: 'I = V ÷ R', label: 'Current' };
      } else if (P > 0 && R > 0) {
        return { value: Math.sqrt(P / R).toFixed(2), unit: 'A', formula: 'I = √(P ÷ R)', label: 'Current' };
      }
    } else if (calcType === 'resistance') {
      if (V > 0 && I > 0) {
        return { value: (V / I).toFixed(2), unit: 'Ω', formula: 'R = V ÷ I', label: 'Resistance' };
      } else if (P > 0 && I > 0) {
        return { value: (P / (I * I)).toFixed(2), unit: 'Ω', formula: 'R = P ÷ I²', label: 'Resistance' };
      } else if (V > 0 && P > 0) {
        return { value: ((V * V) / P).toFixed(2), unit: 'Ω', formula: 'R = V² ÷ P', label: 'Resistance' };
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

  // Check if we have enough inputs for calculation
  const hasValidInputs = () => {
    const V = parseFloat(voltage) || 0;
    const I = parseFloat(current) || 0;
    const R = parseFloat(resistance) || 0;
    const P = parseFloat(power) || 0;

    const values = [V, I, R, P].filter(v => v > 0);
    return values.length >= 2;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <CalculatorCard
        category="power"
        title="Interactive Power Calculator"
        description="Calculate power, voltage, current, or resistance from known values"
      >
        {/* Calculation Type Selector */}
        <CalculatorSelect
          label="Calculate"
          value={calcType}
          onChange={(value) => setCalcType(value as 'power' | 'voltage' | 'current' | 'resistance')}
          options={[
            { value: "power", label: "Power (P)" },
            { value: "voltage", label: "Voltage (V)" },
            { value: "current", label: "Current (I)" },
            { value: "resistance", label: "Resistance (R)" },
          ]}
        />

        {/* Input Grid - Show relevant inputs based on what we're calculating */}
        <CalculatorInputGrid columns={2}>
          {calcType !== 'voltage' && (
            <CalculatorInput
              label="Voltage"
              unit="V"
              type="text"
              inputMode="decimal"
              placeholder="e.g., 230"
              value={voltage}
              onChange={setVoltage}
              hint="UK: 230V single-phase"
            />
          )}

          {calcType !== 'current' && (
            <CalculatorInput
              label="Current"
              unit="A"
              type="text"
              inputMode="decimal"
              placeholder="e.g., 13"
              value={current}
              onChange={setCurrent}
              hint="Load current"
            />
          )}

          {calcType !== 'resistance' && (
            <CalculatorInput
              label="Resistance"
              unit="Ω"
              type="text"
              inputMode="decimal"
              placeholder="e.g., 17.6"
              value={resistance}
              onChange={setResistance}
              hint="Load resistance"
            />
          )}

          {calcType !== 'power' && (
            <CalculatorInput
              label="Power"
              unit="W"
              type="text"
              inputMode="decimal"
              placeholder="e.g., 3000"
              value={power}
              onChange={setPower}
              hint="Power consumption"
            />
          )}
        </CalculatorInputGrid>

        {/* Action Buttons */}
        <CalculatorActions
          category="power"
          onCalculate={() => {}} // Auto-calculates via useMemo
          onReset={clearAll}
          calculateLabel="Auto-calculates"
          isDisabled={true}
          showReset={true}
        />
      </CalculatorCard>

      {/* Result */}
      {result && (
        <CalculatorResult category="power">
          <ResultValue
            label={result.label}
            value={result.value}
            unit={result.unit}
            category="power"
            size="lg"
          />
          <p className="text-sm text-white/60 mt-2">
            <span className="font-medium">Formula:</span> {result.formula}
          </p>
        </CalculatorResult>
      )}

      {/* Helper Tips */}
      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-2">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <div className="text-sm text-blue-200 space-y-1">
            <p><strong>Tip:</strong> Enter any two known values to calculate the third.</p>
            <p>Common UK voltages: 230V (single-phase), 400V (three-phase)</p>
            <p className="text-blue-200/70">Note: These calculations apply to resistive loads</p>
          </div>
        </div>
      </div>
    </div>
  );
};

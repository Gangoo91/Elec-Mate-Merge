/**
 * CircuitTestForm - Single circuit test form for swipe view
 *
 * All test sections visible at once (no accordions)
 * Compact grid layout for related fields
 * Conditional three-phase section with L1/L2/L3 inputs
 */

import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Textarea } from '@/components/ui/textarea';
import { TestResult } from '@/types/testResult';
import { circuitTypes } from '@/types/circuitTypes';
import {
  bsStandardOptions,
  protectiveDeviceCurveOptions,
  protectiveDeviceRatingOptions,
  rcdBsStandardOptions,
  bsStandardRequiresCurve
} from '@/types/protectiveDeviceTypes';
import { cableSizeOptions, referenceMethodOptions } from '@/types/cableTypes';
import { insulationTestVoltageOptions } from '@/types/testOptions';
import { wiringTypeOptions, rcdTypeOptions } from '@/types/wiringTypes';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';
import { cn } from '@/lib/utils';

interface CircuitTestFormProps {
  result: TestResult;
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
}

// Compact input with debouncing
const CompactInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  step?: string;
  inputMode?: 'text' | 'decimal' | 'numeric';
  className?: string;
}> = ({ value, onChange, placeholder, type = 'text', step, inputMode, className }) => {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback((newValue: string) => {
    setLocalValue(newValue);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onChange(newValue), 300);
  }, [onChange]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <Input
      value={localValue}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      step={step}
      inputMode={inputMode}
      className={cn("h-11 text-base touch-manipulation", className)}
    />
  );
};

const CircuitTestForm: React.FC<CircuitTestFormProps> = ({ result, onUpdate }) => {
  const showCurveSelector = bsStandardRequiresCurve(result.bsStandard || '');
  const isThreePhase = result.phaseType === '3P';

  // Auto-fill maxZs when device details change
  const autoFillMaxZs = useCallback((bsStandard: string, curve: string, rating: string) => {
    if (!bsStandard || !rating) return;
    const needsCurve = bsStandardRequiresCurve(bsStandard);
    if (needsCurve && !curve) return;
    const maxZs = getMaxZsFromDeviceDetails(bsStandard, curve, rating);
    if (maxZs !== null) {
      onUpdate(result.id, 'maxZs', maxZs.toString());
    }
  }, [onUpdate, result.id]);

  const handleBsStandardChange = useCallback((value: string) => {
    onUpdate(result.id, 'bsStandard', value);
    autoFillMaxZs(value, result.protectiveDeviceCurve || '', result.protectiveDeviceRating || '');
  }, [onUpdate, result.id, result.protectiveDeviceCurve, result.protectiveDeviceRating, autoFillMaxZs]);

  const handleCurveChange = useCallback((value: string) => {
    onUpdate(result.id, 'protectiveDeviceCurve', value);
    autoFillMaxZs(result.bsStandard || '', value, result.protectiveDeviceRating || '');
  }, [onUpdate, result.id, result.bsStandard, result.protectiveDeviceRating, autoFillMaxZs]);

  const handleRatingChange = useCallback((value: string) => {
    onUpdate(result.id, 'protectiveDeviceRating', value);
    autoFillMaxZs(result.bsStandard || '', result.protectiveDeviceCurve || '', value);
  }, [onUpdate, result.id, result.bsStandard, result.protectiveDeviceCurve, autoFillMaxZs]);

  return (
    <div className="space-y-4 pb-4">
      {/* CIRCUIT DETAILS */}
      <section className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
        <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          Circuit Details
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Designation</Label>
            <CompactInput
              value={result.circuitDesignation || ''}
              onChange={(v) => onUpdate(result.id, 'circuitDesignation', v)}
              placeholder="e.g., C1"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Points</Label>
            <CompactInput
              value={result.pointsServed || ''}
              onChange={(v) => onUpdate(result.id, 'pointsServed', v)}
              placeholder="e.g., 10"
              type="number"
              inputMode="numeric"
            />
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          <Label className="text-xs text-muted-foreground">Description</Label>
          <CompactInput
            value={result.circuitDescription || ''}
            onChange={(v) => onUpdate(result.id, 'circuitDescription', v)}
            placeholder="e.g., Ground Floor Lighting"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Wiring Type</Label>
            <MobileSelectPicker
              value={result.typeOfWiring || ''}
              onValueChange={(v) => onUpdate(result.id, 'typeOfWiring', v)}
              options={wiringTypeOptions}
              placeholder="Select"
              title="Type of Wiring"
              triggerClassName="h-11 text-base"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Ref. Method</Label>
            <MobileSelectPicker
              value={result.referenceMethod || ''}
              onValueChange={(v) => onUpdate(result.id, 'referenceMethod', v)}
              options={referenceMethodOptions}
              placeholder="Select"
              title="Reference Method"
              triggerClassName="h-11 text-base"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Live (mm²)</Label>
            <MobileSelectPicker
              value={result.liveSize || ''}
              onValueChange={(v) => onUpdate(result.id, 'liveSize', v)}
              options={cableSizeOptions}
              placeholder="Select"
              title="Live Conductor Size"
              triggerClassName="h-11 text-base"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">CPC (mm²)</Label>
            <MobileSelectPicker
              value={result.cpcSize || ''}
              onValueChange={(v) => onUpdate(result.id, 'cpcSize', v)}
              options={cableSizeOptions}
              placeholder="Select"
              title="CPC Size"
              triggerClassName="h-11 text-base"
            />
          </div>
        </div>
        {/* Phase Type Selector */}
        <div className="mt-3 space-y-1.5">
          <Label className="text-xs text-muted-foreground">Phase Type</Label>
          <MobileSelectPicker
            value={result.phaseType || '1P'}
            onValueChange={(v) => onUpdate(result.id, 'phaseType', v)}
            options={[
              { value: '1P', label: 'Single Phase' },
              { value: '3P', label: 'Three Phase' },
            ]}
            placeholder="Select"
            title="Phase Type"
            triggerClassName="h-11 text-base"
          />
        </div>
      </section>

      {/* PROTECTIVE DEVICE */}
      <section className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
        <h4 className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          Protective Device
        </h4>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">BS (EN) Standard</Label>
          <MobileSelectPicker
            value={result.bsStandard || ''}
            onValueChange={handleBsStandardChange}
            options={bsStandardOptions}
            placeholder="Select standard"
            title="BS (EN) Standard"
            triggerClassName="h-11 text-base"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Curve {!showCurveSelector && <span className="text-[10px]">(N/A)</span>}
            </Label>
            <MobileSelectPicker
              value={result.protectiveDeviceCurve || ''}
              onValueChange={handleCurveChange}
              options={protectiveDeviceCurveOptions}
              placeholder="Select"
              title="Device Curve"
              triggerClassName="h-11 text-base"
              disabled={!showCurveSelector}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Rating (A)</Label>
            <MobileSelectPicker
              value={result.protectiveDeviceRating || ''}
              onValueChange={handleRatingChange}
              options={protectiveDeviceRatingOptions}
              placeholder="Select"
              title="Device Rating"
              triggerClassName="h-11 text-base"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">kA Rating</Label>
            <CompactInput
              value={result.protectiveDeviceKaRating || ''}
              onChange={(v) => onUpdate(result.id, 'protectiveDeviceKaRating', v)}
              placeholder="e.g., 6"
              type="number"
              step="0.5"
              inputMode="decimal"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Max Zs (Ω)</Label>
            <CompactInput
              value={result.maxZs || ''}
              onChange={(v) => onUpdate(result.id, 'maxZs', v)}
              placeholder="Auto"
              type="number"
              step="0.01"
              inputMode="decimal"
            />
          </div>
        </div>
      </section>

      {/* RCD DETAILS */}
      <section className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
        <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
          RCD Details
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">RCD Standard</Label>
            <MobileSelectPicker
              value={result.rcdBsStandard || ''}
              onValueChange={(v) => onUpdate(result.id, 'rcdBsStandard', v)}
              options={rcdBsStandardOptions}
              placeholder="Select"
              title="RCD BS Standard"
              triggerClassName="h-11 text-base"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">RCD Type</Label>
            <MobileSelectPicker
              value={result.rcdType || ''}
              onValueChange={(v) => onUpdate(result.id, 'rcdType', v)}
              options={rcdTypeOptions}
              placeholder="Select"
              title="RCD Type"
              triggerClassName="h-11 text-base"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">IΔn (mA)</Label>
            <MobileSelectPicker
              value={result.rcdRating || ''}
              onValueChange={(v) => onUpdate(result.id, 'rcdRating', v)}
              options={[
                { value: '10mA', label: '10mA' },
                { value: '30mA', label: '30mA' },
                { value: '100mA', label: '100mA' },
                { value: '300mA', label: '300mA' },
                { value: '500mA', label: '500mA' },
              ]}
              placeholder="Select"
              title="RCD Rating (mA)"
              triggerClassName="h-11 text-base"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Current (A)</Label>
            <CompactInput
              value={result.rcdRatingA || ''}
              onChange={(v) => onUpdate(result.id, 'rcdRatingA', v)}
              placeholder="e.g., 40"
              type="number"
              inputMode="numeric"
            />
          </div>
        </div>
      </section>

      {/* CONTINUITY */}
      <section className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/20">
        <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          Continuity
        </h4>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">r₁ (Ω)</Label>
            <CompactInput
              value={result.ringR1 || ''}
              onChange={(v) => onUpdate(result.id, 'ringR1', v)}
              placeholder="r₁"
              type="number"
              step="0.001"
              inputMode="decimal"
              className="h-10 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">rₙ (Ω)</Label>
            <CompactInput
              value={result.ringRn || ''}
              onChange={(v) => onUpdate(result.id, 'ringRn', v)}
              placeholder="rₙ"
              type="number"
              step="0.001"
              inputMode="decimal"
              className="h-10 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">r₂ (Ω)</Label>
            <CompactInput
              value={result.ringR2 || ''}
              onChange={(v) => onUpdate(result.id, 'ringR2', v)}
              placeholder="r₂"
              type="number"
              step="0.001"
              inputMode="decimal"
              className="h-10 text-sm"
            />
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          <Label className="text-xs text-muted-foreground">R₁+R₂ (Ω)</Label>
          <CompactInput
            value={result.r1r2 || ''}
            onChange={(v) => onUpdate(result.id, 'r1r2', v)}
            placeholder="e.g., 0.5"
            type="number"
            step="0.001"
            inputMode="decimal"
          />
        </div>
      </section>

      {/* INSULATION RESISTANCE */}
      <section className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
        <h4 className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Insulation Resistance
        </h4>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Test Voltage</Label>
          <MobileSelectPicker
            value={result.insulationTestVoltage || ''}
            onValueChange={(v) => onUpdate(result.id, 'insulationTestVoltage', v)}
            options={insulationTestVoltageOptions}
            placeholder="Select"
            title="Test Voltage"
            triggerClassName="h-11 text-base"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">L-L (MΩ)</Label>
            <CompactInput
              value={result.insulationLiveNeutral || ''}
              onChange={(v) => onUpdate(result.id, 'insulationLiveNeutral', v)}
              placeholder=">1.0"
              type="number"
              step="0.1"
              inputMode="decimal"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">L-E (MΩ)</Label>
            <CompactInput
              value={result.insulationLiveEarth || ''}
              onChange={(v) => onUpdate(result.id, 'insulationLiveEarth', v)}
              placeholder=">1.0"
              type="number"
              step="0.1"
              inputMode="decimal"
            />
          </div>
        </div>
      </section>

      {/* Zs & POLARITY */}
      <section className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
        <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Zs & Polarity
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Polarity</Label>
            <MobileSelectPicker
              value={result.polarity || ''}
              onValueChange={(v) => onUpdate(result.id, 'polarity', v)}
              options={[
                { value: '✓', label: '✓ Correct' },
                { value: '✗', label: '✗ Reversed' },
              ]}
              placeholder="Select"
              title="Polarity"
              triggerClassName="h-11 text-base"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Zs (Ω)</Label>
            <CompactInput
              value={result.zs || ''}
              onChange={(v) => onUpdate(result.id, 'zs', v)}
              placeholder="e.g., 0.5"
              type="number"
              step="0.01"
              inputMode="decimal"
            />
          </div>
        </div>
      </section>

      {/* THREE-PHASE SECTION - Conditional */}
      {isThreePhase && (
        <section className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
          <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Phase Readings (3-Phase)
          </h4>

          {/* Phase Rotation */}
          <div className="space-y-1.5 mb-4">
            <Label className="text-xs text-muted-foreground">Phase Sequence</Label>
            <MobileSelectPicker
              value={result.phaseRotation || ''}
              onValueChange={(v) => onUpdate(result.id, 'phaseRotation', v)}
              options={[
                { value: 'L1-L2-L3 ✓', label: 'L1-L2-L3 ✓ (Clockwise)' },
                { value: 'L1-L3-L2', label: 'L1-L3-L2 (Anti-clockwise)' },
              ]}
              placeholder="Select"
              title="Phase Rotation"
              triggerClassName="h-11 text-base"
            />
          </div>

          {/* L-L Voltage */}
          <div className="space-y-1.5 mb-4">
            <Label className="text-xs text-muted-foreground">L-L Voltage (V)</Label>
            <CompactInput
              value={result.lineToLineVoltage || ''}
              onChange={(v) => onUpdate(result.id, 'lineToLineVoltage', v)}
              placeholder="e.g., 400"
              type="number"
              inputMode="numeric"
            />
          </div>

          {/* Phase Balance - L1/L2/L3 */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Load Balance (A)</Label>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <Label className="text-[10px] text-center block text-purple-300">L1</Label>
                <CompactInput
                  value={result.phaseBalanceL1 || ''}
                  onChange={(v) => onUpdate(result.id, 'phaseBalanceL1', v)}
                  placeholder="L1"
                  type="number"
                  step="0.1"
                  inputMode="decimal"
                  className="h-10 text-sm text-center"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] text-center block text-purple-300">L2</Label>
                <CompactInput
                  value={result.phaseBalanceL2 || ''}
                  onChange={(v) => onUpdate(result.id, 'phaseBalanceL2', v)}
                  placeholder="L2"
                  type="number"
                  step="0.1"
                  inputMode="decimal"
                  className="h-10 text-sm text-center"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] text-center block text-purple-300">L3</Label>
                <CompactInput
                  value={result.phaseBalanceL3 || ''}
                  onChange={(v) => onUpdate(result.id, 'phaseBalanceL3', v)}
                  placeholder="L3"
                  type="number"
                  step="0.1"
                  inputMode="decimal"
                  className="h-10 text-sm text-center"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RCD TEST */}
      <section className="bg-pink-500/10 rounded-xl p-4 border border-pink-500/20">
        <h4 className="text-xs font-semibold text-pink-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
          RCD Test
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">1×IΔn (ms)</Label>
            <CompactInput
              value={result.rcdOneX || ''}
              onChange={(v) => onUpdate(result.id, 'rcdOneX', v)}
              placeholder="e.g., 28"
              type="number"
              inputMode="numeric"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Test Button</Label>
            <MobileSelectPicker
              value={result.rcdTestButton || ''}
              onValueChange={(v) => onUpdate(result.id, 'rcdTestButton', v)}
              options={[
                { value: 'Pass', label: 'Pass' },
                { value: 'Fail', label: 'Fail' },
                { value: 'N/A', label: 'N/A' },
              ]}
              placeholder="Select"
              title="RCD Test Button"
              triggerClassName="h-11 text-base"
            />
          </div>
        </div>
      </section>

      {/* OTHER TESTS */}
      <section className="bg-muted/30 rounded-xl p-4 border border-border/30">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          Other Tests
        </h4>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">AFDD</Label>
            <MobileSelectPicker
              value={result.afddTest || ''}
              onValueChange={(v) => onUpdate(result.id, 'afddTest', v)}
              options={[
                { value: '✓', label: '✓' },
                { value: '✗', label: '✗' },
                { value: 'N/A', label: 'N/A' },
              ]}
              placeholder="-"
              title="AFDD Test"
              triggerClassName="h-11 text-base"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">PFC (kA)</Label>
            <CompactInput
              value={result.pfc || ''}
              onChange={(v) => onUpdate(result.id, 'pfc', v)}
              placeholder="kA"
              type="number"
              step="0.1"
              inputMode="decimal"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Func.</Label>
            <MobileSelectPicker
              value={result.functionalTesting || ''}
              onValueChange={(v) => onUpdate(result.id, 'functionalTesting', v)}
              options={[
                { value: '✓', label: '✓' },
                { value: '✗', label: '✗' },
                { value: 'N/A', label: 'N/A' },
              ]}
              placeholder="-"
              title="Functional Test"
              triggerClassName="h-11 text-base"
            />
          </div>
        </div>
      </section>

      {/* NOTES */}
      <section className="bg-slate-500/10 rounded-xl p-4 border border-slate-500/20">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          Notes / Remarks
        </h4>
        <Textarea
          value={result.notes || ''}
          onChange={(e) => onUpdate(result.id, 'notes', e.target.value)}
          placeholder="Any additional notes..."
          className="min-h-[80px] touch-manipulation text-base resize-none"
        />
      </section>
    </div>
  );
};

export default CircuitTestForm;

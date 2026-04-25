import React, { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
// No icons — clean design
import { cn } from '@/lib/utils';
import {
  useEVChargingSmartForm,
  TestResultValidation,
} from '@/hooks/inspection/useEVChargingSmartForm';

interface EVChargingTestScheduleProps {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: unknown) => void;
}

type TestResult = 'pass' | 'fail' | '';

// Section header — gradient line style
const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

// Pass/Fail toggle buttons
const TestResultToggle: React.FC<{
  value: TestResult;
  onChange: (value: TestResult) => void;
}> = ({ value, onChange }) => (
  <div className="grid grid-cols-2 gap-2">
    <button
      type="button"
      onClick={() => onChange(value === 'pass' ? '' : 'pass')}
      className={cn(
        'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
        value === 'pass'
          ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
          : 'bg-white/[0.05] border border-white/[0.08] text-white'
      )}
    >
      Pass
    </button>
    <button
      type="button"
      onClick={() => onChange(value === 'fail' ? '' : 'fail')}
      className={cn(
        'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
        value === 'fail'
          ? 'bg-red-500/20 border border-red-500/40 text-red-400'
          : 'bg-white/[0.05] border border-white/[0.08] text-white'
      )}
    >
      Fail
    </button>
  </div>
);

// Validation badge — text-only, no icons
const ValidationBadge: React.FC<{ validation: TestResultValidation | undefined }> = ({
  validation,
}) => {
  if (!validation) return null;

  return (
    <span
      className={cn(
        'text-[10px] font-bold px-1.5 py-0.5 rounded ml-2',
        validation.status === 'pass' && 'bg-green-500/15 text-green-400',
        validation.status === 'fail' && 'bg-red-500/15 text-red-400',
        validation.status === 'warning' && 'bg-orange-500/15 text-orange-400'
      )}
    >
      {validation.status.toUpperCase()}
    </span>
  );
};

const inputClass = 'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const labelClass = 'text-white text-xs mb-1.5 block';

const EVChargingTestSchedule: React.FC<EVChargingTestScheduleProps> = ({ formData, onUpdate }) => {
  const { calculateZs, calculateVoltageDrop, validateTestResults } = useEVChargingSmartForm();

  // Temperature correction toggle (default: on)
  const [applyTempCorrection, setApplyTempCorrection] = useState(true);

  // Track if Zs was manually entered vs calculated
  const [zsIsManual, setZsIsManual] = useState(false);

  const updateTestResult = (field: string, value: unknown) => {
    const currentResults = formData.testResults || {};
    onUpdate('testResults', { ...currentResults, [field]: value });
  };

  const testResults = formData.testResults || {};

  // Auto-calculate Zs from Ze + R1+R2 when both values exist
  const calculatedZs = useMemo(() => {
    const ze = parseFloat(formData.ze);
    const r1r2 = parseFloat(testResults.r1r2);

    if (!isNaN(ze) && !isNaN(r1r2) && ze > 0 && r1r2 > 0) {
      return calculateZs(ze, r1r2, applyTempCorrection);
    }
    return null;
  }, [formData.ze, testResults.r1r2, applyTempCorrection, calculateZs]);

  // Auto-update Zs when calculated (unless manually entered)
  useEffect(() => {
    if (calculatedZs && !zsIsManual) {
      const currentZs = parseFloat(testResults.zs);
      // Only update if different (avoid loops)
      if (isNaN(currentZs) || Math.abs(currentZs - calculatedZs.calculatedZs) > 0.001) {
        updateTestResult('zs', calculatedZs.calculatedZs.toFixed(2));
      }
    }
  }, [calculatedZs, zsIsManual]);

  // Handle manual Zs entry
  const handleZsChange = (value: string) => {
    setZsIsManual(true);
    updateTestResult('zs', value);
  };

  // Reset to calculated Zs
  const resetToCalculated = () => {
    if (calculatedZs) {
      setZsIsManual(false);
      updateTestResult('zs', calculatedZs.calculatedZs.toFixed(2));
    }
  };

  // Auto-calculate voltage drop from cable data
  const voltageDrop = useMemo(() => {
    const cableSize = formData.cableSize;
    const cableLength = formData.cableLength;
    const current = formData.ratedCurrent;
    const cableType = formData.cableType;
    if (cableSize && cableLength && current) {
      return calculateVoltageDrop(cableSize, cableLength, current, cableType);
    }
    return null;
  }, [
    formData.cableSize,
    formData.cableLength,
    formData.ratedCurrent,
    formData.cableType,
    calculateVoltageDrop,
  ]);

  // Auto-update voltage drop in test results when calculated
  useEffect(() => {
    if (voltageDrop && !testResults.voltageDrop) {
      updateTestResult('voltageDrop', voltageDrop.voltageDropV.toString());
    }
  }, [voltageDrop]);

  // Validate all test results
  const validations = useMemo(() => {
    const maxZs = parseFloat(testResults.maxZs);
    const results = validateTestResults(testResults, !isNaN(maxZs) ? maxZs : undefined);

    // Convert array to lookup object
    const lookup: Record<string, TestResultValidation> = {};
    results.forEach((v) => {
      lookup[v.field] = v;
    });
    return lookup;
  }, [testResults, validateTestResults]);

  return (
    <div className="space-y-5 px-4 py-2">
      {/* Circuit Tests */}
      <div>
        <SectionTitle title="Circuit Tests" />

        {/* Ambient Temperature */}
        {/* Ambient temp + correction in one compact row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-24 shrink-0">
            <label className={labelClass}>Temp (°C)</label>
            <Input
              placeholder="20"
              inputMode="decimal"
              value={testResults.ambientTemperature || ''}
              onChange={(e) => updateTestResult('ambientTemperature', e.target.value)}
              className={inputClass}
            />
          </div>
          <label className="flex-1 flex items-center justify-between rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 cursor-pointer touch-manipulation mt-5">
            <div>
              <span className="text-xs font-medium text-white block">1.2× Correction</span>
              <span className="text-[10px] text-white">70°C operating temp</span>
            </div>
            <Switch
              checked={applyTempCorrection}
              onCheckedChange={setApplyTempCorrection}
              className="data-[state=checked]:bg-elec-yellow shrink-0"
            />
          </label>
        </div>

        {/* Zs Auto-calculation */}
        {calculatedZs && (
          <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 mb-4">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-lg font-bold text-elec-yellow tabular-nums">
                {calculatedZs.calculatedZs.toFixed(2)}Ω
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-white">Calculated Zs</p>
                <p className="text-[10px] text-white">
                  Ze ({formData.ze}) + R1+R2 ({testResults.r1r2}) ×{' '}
                  {applyTempCorrection ? '1.2' : '1.0'}
                </p>
              </div>
            </div>
            {zsIsManual && (
              <button
                type="button"
                onClick={resetToCalculated}
                className="text-[10px] font-medium text-elec-yellow touch-manipulation"
              >
                Reset
              </button>
            )}
          </div>
        )}

        {/* Continuity & Impedance */}
        <div className="space-y-3 mb-4">
          <p className="text-[11px] font-medium text-white uppercase tracking-wider">
            Continuity & Impedance
          </p>
          <div className="grid grid-cols-2 gap-3 items-start">
            <div>
              <label htmlFor="r1r2" className={labelClass}>R1+R2 (&Omega;)</label>
              <Input
                id="r1r2"
                placeholder="0.25"
                inputMode="decimal"
                step="0.01"
                value={testResults.r1r2 || ''}
                onChange={(e) => updateTestResult('r1r2', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="r2" className={labelClass}>R2 (&Omega;)</label>
              <Input
                id="r2"
                placeholder="0.12"
                inputMode="decimal"
                step="0.01"
                value={testResults.r2 || ''}
                onChange={(e) => updateTestResult('r2', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <div className="flex items-center mb-1.5">
                <label htmlFor="zs" className="text-white text-xs">Zs (&Omega;)</label>
                <ValidationBadge validation={validations.zs} />
              </div>
              <div className="relative">
                <Input
                  id="zs"
                  placeholder="0.60"
                  inputMode="decimal"
                  step="0.01"
                  value={testResults.zs || ''}
                  onChange={(e) => handleZsChange(e.target.value)}
                  className={cn(
                    inputClass,
                    validations.zs?.status === 'pass' && 'border-green-500/50',
                    validations.zs?.status === 'fail' && 'border-red-500/50'
                  )}
                />
                {!zsIsManual && calculatedZs && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-bold px-1 py-0.5 rounded bg-blue-500/15 text-blue-400">
                    Auto
                  </span>
                )}
              </div>
              {validations.zs && (
                <p
                  className={cn(
                    'text-[10px] mt-1',
                    validations.zs.status === 'pass' ? 'text-green-400' : 'text-red-400'
                  )}
                >
                  {validations.zs.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="maxZs" className={labelClass}>Max Zs (&Omega;)</label>
              <Input
                id="maxZs"
                placeholder="1.09"
                inputMode="decimal"
                step="0.01"
                value={testResults.maxZs || ''}
                onChange={(e) => updateTestResult('maxZs', e.target.value)}
                className={cn(inputClass, 'bg-white/[0.04]')}
                readOnly={!!testResults.maxZs && formData.protectionDeviceType}
              />
              {testResults.maxZs && formData.protectionDeviceType && (
                <p className="text-[10px] text-blue-400 mt-1">Auto-filled</p>
              )}
            </div>
          </div>
        </div>

        {/* Insulation & Polarity */}
        <div className="space-y-3">
          <p className="text-[11px] font-medium text-white uppercase tracking-wider">
            Insulation & Polarity
          </p>
          <div className="grid grid-cols-2 gap-3 items-start">
            <div>
              <div className="flex items-center mb-1.5">
                <label htmlFor="insulationResistance" className="text-white text-xs">
                  Insulation (M&Omega;)
                </label>
                <ValidationBadge validation={validations.insulationResistance} />
              </div>
              <Input
                id="insulationResistance"
                placeholder=">200"
                inputMode="decimal"
                step="0.01"
                value={testResults.insulationResistance || ''}
                onChange={(e) => updateTestResult('insulationResistance', e.target.value)}
                className={cn(
                  inputClass,
                  validations.insulationResistance?.status === 'pass' && 'border-green-500/50',
                  validations.insulationResistance?.status === 'fail' && 'border-red-500/50'
                )}
              />
              <p className="text-[10px] text-white mt-1">Min 1M&Omega; required</p>
            </div>
            <div>
              <div className="flex items-center mb-1.5">
                <label className="text-white text-xs">Polarity</label>
                <ValidationBadge validation={validations.polarity} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateTestResult('polarity', testResults.polarity === 'correct' ? '' : 'correct')}
                  className={cn(
                    'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                    testResults.polarity === 'correct'
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.05] border border-white/[0.08] text-white'
                  )}
                >
                  Correct
                </button>
                <button
                  type="button"
                  onClick={() => updateTestResult('polarity', testResults.polarity === 'incorrect' ? '' : 'incorrect')}
                  className={cn(
                    'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                    testResults.polarity === 'incorrect'
                      ? 'bg-red-500/20 border border-red-500/40 text-red-400'
                      : 'bg-white/[0.05] border border-white/[0.08] text-white'
                  )}
                >
                  Incorrect
                </button>
              </div>
            </div>
            {formData.earthElectrodeInstalled && (
              <div>
                <label htmlFor="earthElectrodeRa" className={labelClass}>
                  Earth Electrode Ra (&Omega;)
                </label>
                <Input
                  id="earthElectrodeRa"
                  placeholder="150"
                  inputMode="decimal"
                  step="0.01"
                  value={testResults.earthElectrodeRa || ''}
                  onChange={(e) => updateTestResult('earthElectrodeRa', e.target.value)}
                  className={inputClass}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Tests */}
      <div>
        <SectionTitle title="Additional Tests" />

        <div className="grid grid-cols-2 gap-3 items-start">
          <div>
            <label htmlFor="continuityPE" className={labelClass}>PE Continuity (&Omega;)</label>
            <Input
              id="continuityPE"
              placeholder="0.15"
              inputMode="decimal"
              step="0.01"
              value={testResults.continuityPE || ''}
              onChange={(e) => updateTestResult('continuityPE', e.target.value)}
              className={inputClass}
            />
            <p className="text-[10px] text-white mt-1">Protective earth conductor</p>
          </div>
          <div>
            <label htmlFor="voltageDrop" className={labelClass}>Voltage Drop (V)</label>
            <Input
              id="voltageDrop"
              placeholder="—"
              inputMode="decimal"
              step="0.01"
              value={testResults.voltageDrop || ''}
              onChange={(e) => updateTestResult('voltageDrop', e.target.value)}
              className={inputClass}
            />
            <div className="flex items-center gap-1.5 mt-1">
              <p className="text-[10px] text-white">Max 5% (11.5V)</p>
              {voltageDrop && (
                <span
                  className={cn(
                    'text-[10px] font-bold px-1.5 py-0.5 rounded',
                    voltageDrop.satisfactory
                      ? 'bg-green-500/15 text-green-400'
                      : 'bg-red-500/15 text-red-400'
                  )}
                >
                  {voltageDrop.percentOf230V}%
                </span>
              )}
            </div>
          </div>
          {formData.supplyPhases === 'three' && (
            <div>
              <label className={labelClass}>Phase Rotation</label>
              <MobileSelectPicker
                label="Phase Rotation"
                value={testResults.phaseRotation || ''}
                onValueChange={(value) => updateTestResult('phaseRotation', value)}
                options={[
                  { value: 'L1-L2-L3', label: 'L1-L2-L3 (Correct)' },
                  { value: 'L1-L3-L2', label: 'L1-L3-L2 (Reversed)' },
                  { value: 'N/A', label: 'N/A' },
                ]}
                placeholder="Select"
              />
              <p className="text-[10px] text-white mt-1">3-phase rotation check</p>
            </div>
          )}
        </div>

        {/* Voltage Drop result */}
        {voltageDrop && (
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 mt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">
                {voltageDrop.voltageDropV}V ({voltageDrop.percentOf230V}%)
              </span>
              <span
                className={cn(
                  'text-[10px] font-bold px-1.5 py-0.5 rounded',
                  voltageDrop.satisfactory
                    ? 'bg-green-500/15 text-green-400'
                    : 'bg-red-500/15 text-red-400'
                )}
              >
                {voltageDrop.satisfactory ? 'OK' : '>5%'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* RCD Tests */}
      <div>
        <SectionTitle title="RCD Tests" />

        <div className="grid grid-cols-2 gap-3 items-start">
          <div>
            <div className="flex items-center mb-1.5">
              <label htmlFor="rcdTripTime" className="text-white text-xs">
                Trip @ I&Delta;n (ms)
              </label>
              <ValidationBadge validation={validations.rcdTripTime} />
            </div>
            <Input
              id="rcdTripTime"
              placeholder="25"
              inputMode="numeric"
              step="1"
              value={testResults.rcdTripTime || ''}
              onChange={(e) => updateTestResult('rcdTripTime', e.target.value)}
              className={cn(
                inputClass,
                validations.rcdTripTime?.status === 'pass' && 'border-green-500/50',
                validations.rcdTripTime?.status === 'fail' && 'border-red-500/50'
              )}
            />
            {validations.rcdTripTime ? (
              <p
                className={cn(
                  'text-[10px] mt-1',
                  validations.rcdTripTime.status === 'pass' ? 'text-green-400' : 'text-red-400'
                )}
              >
                {validations.rcdTripTime.message}
              </p>
            ) : (
              <p className="text-[10px] text-white mt-1">Max 300ms</p>
            )}
          </div>
          <div>
            <div className="flex items-center mb-1.5">
              <label htmlFor="rcdTripTimeX5" className="text-white text-xs">
                Trip @ 5xI&Delta;n (ms)
              </label>
              <ValidationBadge validation={validations.rcdTripTimeX5} />
            </div>
            <Input
              id="rcdTripTimeX5"
              placeholder="12"
              inputMode="numeric"
              step="1"
              value={testResults.rcdTripTimeX5 || ''}
              onChange={(e) => updateTestResult('rcdTripTimeX5', e.target.value)}
              className={cn(
                inputClass,
                validations.rcdTripTimeX5?.status === 'pass' && 'border-green-500/50',
                validations.rcdTripTimeX5?.status === 'fail' && 'border-red-500/50'
              )}
            />
            {validations.rcdTripTimeX5 ? (
              <p
                className={cn(
                  'text-[10px] mt-1',
                  validations.rcdTripTimeX5.status === 'pass' ? 'text-green-400' : 'text-red-400'
                )}
              >
                {validations.rcdTripTimeX5.message}
              </p>
            ) : (
              <p className="text-[10px] text-white mt-1">Max 40ms</p>
            )}
          </div>
        </div>

        {/* RCD Reference — compact */}
        <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 mt-3">
          <p className="text-[11px] font-medium text-white mb-1.5">RCD Limits</p>
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-white">IΔn trip</span>
            <span className="text-elec-yellow font-bold">≤ 300ms</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-white">5×IΔn trip</span>
            <span className="text-elec-yellow font-bold">≤ 40ms</span>
          </div>
        </div>
      </div>

      {/* Functional Tests */}
      <div>
        <SectionTitle title="Functional Tests" />

        <div className="space-y-3">
          {/* Functional Test */}
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <label className="text-white text-xs font-medium block">Functional Test</label>
              <p className="text-[10px] text-white">Powers up & communicates</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button type="button" onClick={() => updateTestResult('functionalTest', testResults.functionalTest === 'pass' ? '' : 'pass')} className={cn('h-9 px-4 rounded-lg text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all', testResults.functionalTest === 'pass' ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow' : 'bg-white/[0.05] border border-white/[0.08] text-white')}>Pass</button>
              <button type="button" onClick={() => updateTestResult('functionalTest', testResults.functionalTest === 'fail' ? '' : 'fail')} className={cn('h-9 px-4 rounded-lg text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all', testResults.functionalTest === 'fail' ? 'bg-red-500/20 border border-red-500/40 text-red-400' : 'bg-white/[0.05] border border-white/[0.08] text-white')}>Fail</button>
            </div>
          </div>

          {/* Load Test */}
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <label className="text-white text-xs font-medium block">Load Test</label>
              <p className="text-[10px] text-white">Charging with EV or load box</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button type="button" onClick={() => updateTestResult('loadTest', testResults.loadTest === 'pass' ? '' : 'pass')} className={cn('h-9 px-4 rounded-lg text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all', testResults.loadTest === 'pass' ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow' : 'bg-white/[0.05] border border-white/[0.08] text-white')}>Pass</button>
              <button type="button" onClick={() => updateTestResult('loadTest', testResults.loadTest === 'fail' ? '' : 'fail')} className={cn('h-9 px-4 rounded-lg text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all', testResults.loadTest === 'fail' ? 'bg-red-500/20 border border-red-500/40 text-red-400' : 'bg-white/[0.05] border border-white/[0.08] text-white')}>Fail</button>
            </div>
          </div>

          {/* RCD Test Button */}
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <label className="text-white text-xs font-medium block">RCD Test Button</label>
              <p className="text-[10px] text-white">Built-in RCD button check</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button type="button" onClick={() => updateTestResult('rcdTestButton', testResults.rcdTestButton === 'pass' ? '' : 'pass')} className={cn('h-9 px-4 rounded-lg text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all', testResults.rcdTestButton === 'pass' ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow' : 'bg-white/[0.05] border border-white/[0.08] text-white')}>Pass</button>
              <button type="button" onClick={() => updateTestResult('rcdTestButton', testResults.rcdTestButton === 'fail' ? '' : 'fail')} className={cn('h-9 px-4 rounded-lg text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all', testResults.rcdTestButton === 'fail' ? 'bg-red-500/20 border border-red-500/40 text-red-400' : 'bg-white/[0.05] border border-white/[0.08] text-white')}>Fail</button>
            </div>
          </div>

          {/* Load Current */}
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <label className="text-white text-xs font-medium block">Load Current (A)</label>
              <p className="text-[10px] text-white">Measured at full rate</p>
            </div>
            <div className="w-24 shrink-0">
              <Input
                placeholder="32"
                inputMode="decimal"
                step="0.01"
                value={testResults.loadTestCurrent || ''}
                onChange={(e) => updateTestResult('loadTestCurrent', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Verification Checklist — flat list */}
        <div className="mt-4 space-y-2">
          <p className="text-[11px] font-medium text-white uppercase tracking-wider mb-2">Verification Checklist</p>
          {[
            { id: 'chargerPowerUp', field: 'chargerPowerUpVerified', label: 'Charger powers up correctly' },
            { id: 'ledIndicators', field: 'ledIndicatorsVerified', label: 'LED indicators function correctly' },
            { id: 'cableSecure', field: 'cableSecureVerified', label: 'Cable/connector secure and undamaged' },
            { id: 'earthContinuity', field: 'earthContinuityVerified', label: 'Earth continuity to exposed parts' },
          ].map((item) => (
            <label
              key={item.id}
              htmlFor={item.id}
              className="flex items-center gap-3 cursor-pointer touch-manipulation py-1"
            >
              <Checkbox
                id={item.id}
                checked={formData[item.field] || false}
                onCheckedChange={(checked) => onUpdate(item.field, checked)}
                className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
              />
              <span className="text-xs text-white">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Smart Features */}
      <div>
        <SectionTitle title="Smart Features" />

        <div className="space-y-2">
          <label htmlFor="smartChargingEnabled" className="flex items-center gap-3 cursor-pointer touch-manipulation py-1">
            <Checkbox
              id="smartChargingEnabled"
              checked={formData.smartChargingEnabled || false}
              onCheckedChange={(checked) => onUpdate('smartChargingEnabled', checked)}
              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <div>
              <span className="text-xs font-medium text-white block">Smart Charging</span>
              <span className="text-[10px] text-white">App control, scheduling</span>
            </div>
          </label>

          <label htmlFor="loadManagement" className="flex items-center gap-3 cursor-pointer touch-manipulation py-1">
            <Checkbox
              id="loadManagement"
              checked={formData.loadManagement || false}
              onCheckedChange={(checked) => onUpdate('loadManagement', checked)}
              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <div>
              <span className="text-xs font-medium text-white block">Load Management</span>
              <span className="text-[10px] text-white">CT clamp or similar</span>
            </div>
          </label>
        </div>

        {formData.loadManagement && (
          <div className="mt-3">
            <label className={labelClass}>Load Management Type</label>
            <MobileSelectPicker
              label="Load Management Type"
              value={formData.loadManagementType || ''}
              onValueChange={(value) => onUpdate('loadManagementType', value)}
              options={[
                { value: 'ct-clamp', label: 'CT Clamp' },
                { value: 'dynamic', label: 'Dynamic Load Balancing' },
                { value: 'static', label: 'Static Limit' },
                { value: 'solar-integration', label: 'Solar Integration' },
              ]}
              placeholder="Select type"
            />
          </div>
        )}
      </div>

      {/* Test Equipment */}
      <div>
        <SectionTitle title="Test Equipment" />

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className={labelClass}>Instrument Model</label>
            <Input
              placeholder="e.g., Megger MFT-X1"
              value={formData.testInstrumentModel || ''}
              onChange={(e) => onUpdate('testInstrumentModel', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Serial Number</label>
            <Input
              placeholder="Serial number"
              value={formData.testInstrumentSerial || ''}
              onChange={(e) => onUpdate('testInstrumentSerial', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Calibration Date</label>
          <Input
            type="date"
            value={formData.testInstrumentCalDate || ''}
            onChange={(e) => onUpdate('testInstrumentCalDate', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
};

export default EVChargingTestSchedule;

import React, { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import { EVSectionHeader } from './EVSectionHeader';
import {
  useEVChargingSmartForm,
  TestResultValidation,
} from '@/hooks/inspection/useEVChargingSmartForm';

interface EVChargingTestScheduleProps {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: unknown) => void;
}

// Section card — brighter step, the only box on the page
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

// Paper-form underline input
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const selectTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 touch-manipulation';

// Pass/fail verdict buttons — semantic green/red, SOLID when selected
const verdictCn = (selected: boolean, tone: 'pass' | 'fail') =>
  cn(
    'h-11 rounded-lg text-sm font-semibold transition-all touch-manipulation active:scale-[0.98]',
    selected && tone === 'pass' && 'bg-green-500 border border-green-500 text-black',
    selected && tone === 'fail' && 'bg-red-500 border border-red-500 text-white',
    !selected && 'bg-white/[0.06] border border-white/[0.12] text-white'
  );

// Validation badge — text-only
const ValidationBadge: React.FC<{ validation: TestResultValidation | undefined }> = ({
  validation,
}) => {
  if (!validation) return null;

  return (
    <span
      className={cn(
        'text-[11px] font-semibold ml-2',
        validation.status === 'pass' && 'text-green-400',
        validation.status === 'fail' && 'text-red-400',
        validation.status === 'warning' && 'text-amber-300'
      )}
    >
      {validation.status.toUpperCase()}
    </span>
  );
};

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
    <div className="py-2 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Circuit Tests — wide */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <EVSectionHeader title="Circuit Tests" />

        {/* Ambient temp + correction in one compact row */}
        <div className="flex items-end gap-4">
          <div className="w-24 shrink-0">
            <label className={labelCn}>Temp (°C)</label>
            <Input
              placeholder="20"
              inputMode="decimal"
              value={testResults.ambientTemperature || ''}
              onChange={(e) => updateTestResult('ambientTemperature', e.target.value)}
              className={inputCn}
            />
          </div>
          <label className="flex-1 flex items-center justify-between rounded-xl bg-white/[0.05] px-3.5 py-3 cursor-pointer touch-manipulation">
            <div>
              <span className="text-sm font-medium text-white block">1.2× correction</span>
              <span className="text-[11px] text-white/85">70°C operating temp</span>
            </div>
            <Switch
              checked={applyTempCorrection}
              onCheckedChange={setApplyTempCorrection}
              className="data-[state=checked]:bg-elec-yellow shrink-0"
            />
          </label>
        </div>

        {/* Zs auto-calculation */}
        {calculatedZs && (
          <div className="flex items-center gap-3 rounded-xl bg-white/[0.05] px-3.5 py-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-lg font-bold text-elec-yellow tabular-nums">
                {calculatedZs.calculatedZs.toFixed(2)}Ω
              </span>
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-white">Calculated Zs</p>
                <p className="text-[11px] text-white/85">
                  Ze ({formData.ze}) + R1+R2 ({testResults.r1r2}) ×{' '}
                  {applyTempCorrection ? '1.2' : '1.0'}
                </p>
              </div>
            </div>
            {zsIsManual && (
              <button
                type="button"
                onClick={resetToCalculated}
                className="h-11 px-3 rounded-lg text-xs font-semibold text-elec-yellow touch-manipulation shrink-0"
              >
                Reset
              </button>
            )}
          </div>
        )}

        {/* Continuity & impedance */}
        <div className="space-y-4">
          <p className="text-[13px] font-semibold text-white">Continuity and impedance</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 items-start">
            <div>
              <label htmlFor="r1r2" className={labelCn}>
                R1+R2 (&Omega;)
              </label>
              <Input
                id="r1r2"
                placeholder="0.25"
                inputMode="decimal"
                step="0.01"
                value={testResults.r1r2 || ''}
                onChange={(e) => updateTestResult('r1r2', e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <label htmlFor="r2" className={labelCn}>
                R2 (&Omega;)
              </label>
              <Input
                id="r2"
                placeholder="0.12"
                inputMode="decimal"
                step="0.01"
                value={testResults.r2 || ''}
                onChange={(e) => updateTestResult('r2', e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <div className="flex items-center mb-1">
                <label htmlFor="zs" className="text-[12px] font-medium text-white">
                  Zs (&Omega;)
                </label>
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
                    inputCn,
                    validations.zs?.status === 'pass' && 'border-green-500',
                    validations.zs?.status === 'fail' && 'border-red-500'
                  )}
                />
                {!zsIsManual && calculatedZs && (
                  <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-blue-400">
                    Auto
                  </span>
                )}
              </div>
              {validations.zs && (
                <p
                  className={cn(
                    'text-[11px] mt-1',
                    validations.zs.status === 'pass' ? 'text-green-400' : 'text-red-400'
                  )}
                >
                  {validations.zs.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="maxZs" className={labelCn}>
                Max Zs (&Omega;)
              </label>
              <Input
                id="maxZs"
                placeholder="1.09"
                inputMode="decimal"
                step="0.01"
                value={testResults.maxZs || ''}
                onChange={(e) => updateTestResult('maxZs', e.target.value)}
                className={inputCn}
                readOnly={!!testResults.maxZs && formData.protectionDeviceType}
              />
              {testResults.maxZs && formData.protectionDeviceType && (
                <p className="text-[11px] text-blue-400 mt-1">Auto-filled</p>
              )}
            </div>
          </div>
        </div>

        {/* Insulation & polarity */}
        <div className="space-y-4">
          <p className="text-[13px] font-semibold text-white">Insulation and polarity</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 items-start">
            <div>
              <div className="flex items-center mb-1">
                <label
                  htmlFor="insulationResistance"
                  className="text-[12px] font-medium text-white"
                >
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
                  inputCn,
                  validations.insulationResistance?.status === 'pass' && 'border-green-500',
                  validations.insulationResistance?.status === 'fail' && 'border-red-500'
                )}
              />
              <p className="text-[11px] text-white/85 mt-1">Min 1M&Omega; required</p>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <label className="text-[12px] font-medium text-white">Polarity</label>
                <ValidationBadge validation={validations.polarity} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    updateTestResult(
                      'polarity',
                      testResults.polarity === 'correct' ? '' : 'correct'
                    )
                  }
                  className={verdictCn(testResults.polarity === 'correct', 'pass')}
                >
                  Correct
                </button>
                <button
                  type="button"
                  onClick={() =>
                    updateTestResult(
                      'polarity',
                      testResults.polarity === 'incorrect' ? '' : 'incorrect'
                    )
                  }
                  className={verdictCn(testResults.polarity === 'incorrect', 'fail')}
                >
                  Incorrect
                </button>
              </div>
            </div>
            {formData.earthElectrodeInstalled && (
              <div>
                <label htmlFor="earthElectrodeRa" className={labelCn}>
                  Earth Electrode Ra (&Omega;)
                </label>
                <Input
                  id="earthElectrodeRa"
                  placeholder="150"
                  inputMode="decimal"
                  step="0.01"
                  value={testResults.earthElectrodeRa || ''}
                  onChange={(e) => updateTestResult('earthElectrodeRa', e.target.value)}
                  className={inputCn}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Tests */}
      <div className={cardCn}>
        <EVSectionHeader title="Additional Tests" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 items-start">
          <div>
            <label htmlFor="continuityPE" className={labelCn}>
              PE Continuity (&Omega;)
            </label>
            <Input
              id="continuityPE"
              placeholder="0.15"
              inputMode="decimal"
              step="0.01"
              value={testResults.continuityPE || ''}
              onChange={(e) => updateTestResult('continuityPE', e.target.value)}
              className={inputCn}
            />
            <p className="text-[11px] text-white/85 mt-1">Protective earth conductor</p>
          </div>
          <div>
            <label htmlFor="voltageDrop" className={labelCn}>
              Voltage Drop (V)
            </label>
            <Input
              id="voltageDrop"
              placeholder="—"
              inputMode="decimal"
              step="0.01"
              value={testResults.voltageDrop || ''}
              onChange={(e) => updateTestResult('voltageDrop', e.target.value)}
              className={inputCn}
            />
            <div className="flex items-center gap-2 mt-1">
              <p className="text-[11px] text-white/85">Max 5% (11.5V)</p>
              {voltageDrop && (
                <span
                  className={cn(
                    'text-[11px] font-semibold',
                    voltageDrop.satisfactory ? 'text-green-400' : 'text-red-400'
                  )}
                >
                  {voltageDrop.percentOf230V}%
                </span>
              )}
            </div>
          </div>
          {formData.supplyPhases === 'three' && (
            <div>
              <label className={labelCn}>Phase Rotation</label>
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
                triggerClassName={selectTriggerCn}
              />
              <p className="text-[11px] text-white/85 mt-1">3-phase rotation check</p>
            </div>
          )}
        </div>

        {/* Voltage drop result */}
        {voltageDrop && (
          <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">
                {voltageDrop.voltageDropV}V ({voltageDrop.percentOf230V}%)
              </span>
              <span
                className={cn(
                  'text-[11px] font-semibold',
                  voltageDrop.satisfactory ? 'text-green-400' : 'text-red-400'
                )}
              >
                {voltageDrop.satisfactory ? 'OK' : '>5%'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* RCD Tests */}
      <div className={cardCn}>
        <EVSectionHeader title="RCD Tests" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 items-start">
          <div>
            <div className="flex items-center mb-1">
              <label htmlFor="rcdTripTime" className="text-[12px] font-medium text-white">
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
                inputCn,
                validations.rcdTripTime?.status === 'pass' && 'border-green-500',
                validations.rcdTripTime?.status === 'fail' && 'border-red-500'
              )}
            />
            {validations.rcdTripTime ? (
              <p
                className={cn(
                  'text-[11px] mt-1',
                  validations.rcdTripTime.status === 'pass' ? 'text-green-400' : 'text-red-400'
                )}
              >
                {validations.rcdTripTime.message}
              </p>
            ) : (
              <p className="text-[11px] text-white/85 mt-1">Max 300ms</p>
            )}
          </div>
          <div>
            <div className="flex items-center mb-1">
              <label htmlFor="rcdTripTimeX5" className="text-[12px] font-medium text-white">
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
                inputCn,
                validations.rcdTripTimeX5?.status === 'pass' && 'border-green-500',
                validations.rcdTripTimeX5?.status === 'fail' && 'border-red-500'
              )}
            />
            {validations.rcdTripTimeX5 ? (
              <p
                className={cn(
                  'text-[11px] mt-1',
                  validations.rcdTripTimeX5.status === 'pass' ? 'text-green-400' : 'text-red-400'
                )}
              >
                {validations.rcdTripTimeX5.message}
              </p>
            ) : (
              <p className="text-[11px] text-white/85 mt-1">Max 40ms</p>
            )}
          </div>
        </div>

        {/* RCD reference — compact */}
        <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
          <p className="text-[12px] font-medium text-white mb-1.5">RCD Limits</p>
          <div className="flex items-center justify-between text-[12px] mb-1">
            <span className="text-white/85">IΔn trip</span>
            <span className="text-elec-yellow font-semibold">≤ 300ms</span>
          </div>
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-white/85">5×IΔn trip</span>
            <span className="text-elec-yellow font-semibold">≤ 40ms</span>
          </div>
        </div>
      </div>

      {/* Functional Tests — wide */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <EVSectionHeader title="Functional Tests" />

        <div className="space-y-3">
          {/* Functional Test */}
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <label className="text-sm font-medium text-white block">Functional Test</label>
              <p className="text-[11px] text-white/85">Powers up and communicates</p>
            </div>
            <div className="grid grid-cols-2 gap-2 shrink-0">
              <button
                type="button"
                onClick={() =>
                  updateTestResult(
                    'functionalTest',
                    testResults.functionalTest === 'pass' ? '' : 'pass'
                  )
                }
                className={cn(verdictCn(testResults.functionalTest === 'pass', 'pass'), 'px-5')}
              >
                Pass
              </button>
              <button
                type="button"
                onClick={() =>
                  updateTestResult(
                    'functionalTest',
                    testResults.functionalTest === 'fail' ? '' : 'fail'
                  )
                }
                className={cn(verdictCn(testResults.functionalTest === 'fail', 'fail'), 'px-5')}
              >
                Fail
              </button>
            </div>
          </div>

          {/* Load Test */}
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <label className="text-sm font-medium text-white block">Load Test</label>
              <p className="text-[11px] text-white/85">Charging with EV or load box</p>
            </div>
            <div className="grid grid-cols-2 gap-2 shrink-0">
              <button
                type="button"
                onClick={() =>
                  updateTestResult('loadTest', testResults.loadTest === 'pass' ? '' : 'pass')
                }
                className={cn(verdictCn(testResults.loadTest === 'pass', 'pass'), 'px-5')}
              >
                Pass
              </button>
              <button
                type="button"
                onClick={() =>
                  updateTestResult('loadTest', testResults.loadTest === 'fail' ? '' : 'fail')
                }
                className={cn(verdictCn(testResults.loadTest === 'fail', 'fail'), 'px-5')}
              >
                Fail
              </button>
            </div>
          </div>

          {/* RCD Test Button */}
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <label className="text-sm font-medium text-white block">RCD Test Button</label>
              <p className="text-[11px] text-white/85">Built-in RCD button check</p>
            </div>
            <div className="grid grid-cols-2 gap-2 shrink-0">
              <button
                type="button"
                onClick={() =>
                  updateTestResult(
                    'rcdTestButton',
                    testResults.rcdTestButton === 'pass' ? '' : 'pass'
                  )
                }
                className={cn(verdictCn(testResults.rcdTestButton === 'pass', 'pass'), 'px-5')}
              >
                Pass
              </button>
              <button
                type="button"
                onClick={() =>
                  updateTestResult(
                    'rcdTestButton',
                    testResults.rcdTestButton === 'fail' ? '' : 'fail'
                  )
                }
                className={cn(verdictCn(testResults.rcdTestButton === 'fail', 'fail'), 'px-5')}
              >
                Fail
              </button>
            </div>
          </div>

          {/* Load Current */}
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <label className="text-sm font-medium text-white block">Load Current (A)</label>
              <p className="text-[11px] text-white/85">Measured at full rate</p>
            </div>
            <div className="w-24 shrink-0">
              <Input
                placeholder="32"
                inputMode="decimal"
                step="0.01"
                value={testResults.loadTestCurrent || ''}
                onChange={(e) => updateTestResult('loadTestCurrent', e.target.value)}
                className={inputCn}
              />
            </div>
          </div>
        </div>

        {/* Verification checklist — flat list */}
        <div className="space-y-1">
          <p className="text-[13px] font-semibold text-white mb-2">Verification Checklist</p>
          {[
            { id: 'chargerPowerUp', field: 'chargerPowerUpVerified', label: 'Charger powers up correctly' },
            { id: 'ledIndicators', field: 'ledIndicatorsVerified', label: 'LED indicators function correctly' },
            { id: 'cableSecure', field: 'cableSecureVerified', label: 'Cable/connector secure and undamaged' },
            { id: 'earthContinuity', field: 'earthContinuityVerified', label: 'Earth continuity to exposed parts' },
          ].map((item) => (
            <label
              key={item.id}
              htmlFor={item.id}
              className="flex items-center gap-3 cursor-pointer touch-manipulation min-h-[44px] py-1.5"
            >
              <Checkbox
                id={item.id}
                checked={formData[item.field] || false}
                onCheckedChange={(checked) => onUpdate(item.field, checked)}
                className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
              />
              <span className="text-sm text-white">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Smart Features */}
      <div className={cardCn}>
        <EVSectionHeader title="Smart Features" />

        <div className="space-y-1">
          <label
            htmlFor="smartChargingEnabled"
            className="flex items-center gap-3 cursor-pointer touch-manipulation min-h-[44px] py-1.5"
          >
            <Checkbox
              id="smartChargingEnabled"
              checked={formData.smartChargingEnabled || false}
              onCheckedChange={(checked) => onUpdate('smartChargingEnabled', checked)}
              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <div>
              <span className="text-sm font-medium text-white block">Smart Charging</span>
              <span className="text-[11px] text-white/85">App control, scheduling</span>
            </div>
          </label>

          <label
            htmlFor="loadManagement"
            className="flex items-center gap-3 cursor-pointer touch-manipulation min-h-[44px] py-1.5"
          >
            <Checkbox
              id="loadManagement"
              checked={formData.loadManagement || false}
              onCheckedChange={(checked) => onUpdate('loadManagement', checked)}
              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <div>
              <span className="text-sm font-medium text-white block">Load Management</span>
              <span className="text-[11px] text-white/85">CT clamp or similar</span>
            </div>
          </label>
        </div>

        {formData.loadManagement && (
          <div>
            <label className={labelCn}>Load Management Type</label>
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
              triggerClassName={selectTriggerCn}
            />
          </div>
        )}
      </div>

      {/* Test Equipment */}
      <div className={cardCn}>
        <EVSectionHeader title="Test Equipment" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className={labelCn}>Instrument Model</label>
            <Input
              placeholder="e.g. Megger MFT-X1"
              value={formData.testInstrumentModel || ''}
              onChange={(e) => onUpdate('testInstrumentModel', e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn}>Serial Number</label>
            <Input
              placeholder="Serial number"
              value={formData.testInstrumentSerial || ''}
              onChange={(e) => onUpdate('testInstrumentSerial', e.target.value)}
              className={inputCn}
            />
          </div>
        </div>

        <div>
          <label className={labelCn}>Calibration Date</label>
          <Input
            type="date"
            value={formData.testInstrumentCalDate || ''}
            onChange={(e) => onUpdate('testInstrumentCalDate', e.target.value)}
            className={inputCn}
          />
        </div>
      </div>
    </div>
  );
};

export default EVChargingTestSchedule;

import React, { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import {
  RCD_RATINGS,
  RCD_TYPES,
  TEST_EQUIPMENT,
  INSULATION_TEST_VOLTAGES,
} from '@/constants/minorWorksOptions';
import { useMinorWorksSmartForm } from '@/hooks/useMinorWorksSmartForm';

interface MWTestingTabProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
  isMobile?: boolean;
}

/* ── Local helpers ─────────────────────────────────────────────── */

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const FormField = ({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">
      {label}
      {required && ' *'}
    </Label>
    {children}
    {hint && <span className="text-[10px] text-white block mt-1">{hint}</span>}
  </div>
);

const inputClasses =
  'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]';

/** Toggle button row — used for pass/fail, voltage, etc. */
const ToggleButtons = ({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string; color?: string }[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex gap-1.5">
    {options.map((opt) => {
      const isActive = value === opt.value;
      const activeColor =
        opt.color === 'green'
          ? 'bg-green-500/20 border-green-500/40 text-green-400'
          : opt.color === 'red'
            ? 'bg-red-500/20 border-red-500/40 text-red-400'
            : opt.color === 'amber'
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
              : 'bg-elec-yellow/20 border-elec-yellow/40 text-elec-yellow';
      return (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            'h-11 px-3 rounded-lg border text-sm font-medium touch-manipulation transition-colors flex-1',
            isActive ? activeColor : 'bg-white/[0.06] border-white/[0.08] text-white'
          )}
        >
          {opt.label}
        </button>
      );
    })}
  </div>
);

const GradientHeader = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-2 mt-2">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

/* ── Component ─────────────────────────────────────────────────── */

const MWTestingTab: React.FC<MWTestingTabProps> = ({ formData, onUpdate }) => {
  const [recentInstruments, setRecentInstruments] = useState<string[]>([]);

  // Smart form hook for saved instruments from Business Settings
  const { getAvailableInstruments, hasSavedTestEquipment, loadTestEquipment } = useMinorWorksSmartForm();
  const savedInstruments = getAvailableInstruments();

  // Load recent instruments on mount
  useEffect(() => {
    const loadInstruments = async () => {
      try {
        const { offlineStorage } = await import('@/utils/offlineStorage');
        const instruments = await offlineStorage.getRecentInstruments();
        setRecentInstruments(instruments);
      } catch (e) {
        console.error('Failed to load recent instruments', e);
      }
    };
    loadInstruments();
  }, []);

  // Auto-fill serial and calibration when instrument is selected
  const loadInstrumentDetails = async (make: string) => {
    if (!make || make === 'other') return;
    try {
      const { offlineStorage } = await import('@/utils/offlineStorage');
      const details = await offlineStorage.getInstrumentDetails(make);
      if (details) {
        if (!formData.testEquipmentSerial && details.serialNumber) {
          onUpdate('testEquipmentSerial', details.serialNumber);
        }
        if (!formData.testEquipmentCalDate && details.calibrationDate) {
          onUpdate('testEquipmentCalDate', details.calibrationDate);
        }
      }
    } catch (e) {
      console.error('Failed to load instrument details', e);
    }
  };

  // Save instrument details when serial or calibration changes
  useEffect(() => {
    const saveInstrumentDetails = async () => {
      const make = formData.testEquipmentModel;
      if (!make || make === 'other') return;

      const serial = formData.testEquipmentSerial;
      const calibration = formData.testEquipmentCalDate;

      if (serial) {
        try {
          const { offlineStorage } = await import('@/utils/offlineStorage');
          await offlineStorage.saveInstrumentDetails(make, {
            serialNumber: serial,
            calibrationDate: calibration || '',
          });
        } catch (e) {
          console.error('Failed to save instrument details', e);
        }
      }
    };

    const timer = setTimeout(() => {
      saveInstrumentDetails();
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.testEquipmentSerial, formData.testEquipmentCalDate, formData.testEquipmentModel]);

  // Save instrument to recent list and load its details
  const handleInstrumentSelect = async (value: string) => {
    onUpdate('testEquipmentModel', value);

    if (value && value !== 'other') {
      const savedInstrument = savedInstruments.find((i) => i.value === value);
      if (savedInstrument) {
        if (savedInstrument.serialNumber) {
          onUpdate('testEquipmentSerial', savedInstrument.serialNumber);
        }
        if (savedInstrument.calibrationDate) {
          onUpdate('testEquipmentCalDate', savedInstrument.calibrationDate);
        }
        return;
      }

      const updated = [value, ...recentInstruments.filter((i) => i !== value)].slice(0, 3);
      setRecentInstruments(updated);

      try {
        const { offlineStorage } = await import('@/utils/offlineStorage');
        await offlineStorage.saveRecentInstrument(value);
      } catch (e) {
        console.error('Failed to save recent instrument', e);
      }

      loadInstrumentDetails(value);
    }
  };

  // Build options list with saved instruments from Business Settings at top
  const instrumentOptions = useMemo(() => {
    const savedOptions = savedInstruments.map((instrument) => ({
      value: instrument.value,
      label: instrument.label,
      description: 'From Business Settings',
    }));

    const recentOptions = recentInstruments
      .filter((instrument) => !savedInstruments.some((s) => s.value === instrument))
      .map((instrument) => ({
        value: instrument,
        label: instrument,
        description: 'Recently used',
      }));

    const allUsed = [...savedInstruments.map((s) => s.value), ...recentInstruments];
    const mainOptions = TEST_EQUIPMENT.filter((opt) => !allUsed.includes(opt.value));

    return [...savedOptions, ...recentOptions, ...mainOptions];
  }, [recentInstruments, savedInstruments]);

  // Auto-calculate max Zs from protective device details
  useEffect(() => {
    const bsEn = formData.overcurrentDeviceBsEn || formData.bsEnStandard || '';
    const deviceType = formData.protectiveDeviceType || '';
    const rating = formData.protectiveDeviceRating || '';

    if (bsEn && rating) {
      import('@/utils/zsCalculations').then(({ getMaxZsFromDeviceDetails }) => {
        // Extract curve from device type (e.g., 'mcb-type-b' → 'B')
        const curve = deviceType.includes('type-b') ? 'B'
          : deviceType.includes('type-c') ? 'C'
          : deviceType.includes('type-d') ? 'D'
          : 'B';
        const maxZs = getMaxZsFromDeviceDetails(bsEn, curve, rating);
        if (maxZs && maxZs !== formData.maxPermittedZs) {
          onUpdate('maxPermittedZs', String(maxZs));
        }
      }).catch(() => {});
    }
  }, [formData.overcurrentDeviceBsEn, formData.bsEnStandard, formData.protectiveDeviceType, formData.protectiveDeviceRating]);

  // Check if Zs is within limits
  const isZsValid = () => {
    if (!formData.earthFaultLoopImpedance || !formData.maxPermittedZs) return null;
    const measured = parseFloat(formData.earthFaultLoopImpedance);
    const max = parseFloat(formData.maxPermittedZs);
    if (isNaN(measured) || isNaN(max)) return null;
    return measured <= max;
  };

  const zsValidation = isZsValid();

  // Zs margin calculation (percentage headroom)
  const zsMargin = useMemo(() => {
    if (!formData.earthFaultLoopImpedance || !formData.maxPermittedZs) return null;
    const measured = parseFloat(formData.earthFaultLoopImpedance);
    const max = parseFloat(formData.maxPermittedZs);
    if (isNaN(measured) || isNaN(max) || max === 0) return null;
    const margin = max - measured;
    const percent = (margin / max) * 100;
    return { margin: Math.round(margin * 100) / 100, percent: Math.round(percent) };
  }, [formData.earthFaultLoopImpedance, formData.maxPermittedZs]);

  // PFC vs kA breaking capacity check (Reg 434.5.1)
  const pfcKaCheck = useMemo(() => {
    if (!formData.prospectiveFaultCurrent || !formData.protectiveDeviceKaRating) return null;
    const pfc = parseFloat(formData.prospectiveFaultCurrent);
    const ka = parseFloat(formData.protectiveDeviceKaRating);
    if (isNaN(pfc) || isNaN(ka)) return null;
    return { pass: pfc <= ka, pfc, ka };
  }, [formData.prospectiveFaultCurrent, formData.protectiveDeviceKaRating]);

  // RA x IDn <= 50V check for TT systems (Reg 411.5.3)
  const raIdnResult = useMemo(() => {
    if (formData.earthingArrangement !== 'TT') return null;
    if (!formData.earthElectrodeResistance) return null;
    const ra = parseFloat(formData.earthElectrodeResistance);
    if (isNaN(ra)) return null;
    const idn = parseFloat(formData.rcdIdn || '30');
    if (isNaN(idn)) return null;
    const touchVoltage = ra * (idn / 1000);
    return { pass: touchVoltage <= 50, touchVoltage: Math.round(touchVoltage * 100) / 100 };
  }, [formData.earthingArrangement, formData.earthElectrodeResistance, formData.rcdIdn]);

  const raIdnCheck = raIdnResult?.pass ?? null;
  const raIdnValue = raIdnResult?.touchVoltage ?? 0;

  // Check insulation resistance values — handles infinite readings (>999, inf)
  const checkInsulationValue = (value: string) => {
    if (!value) return null;
    const trimmed = value.trim();
    if (/^>\s*\d+/.test(trimmed) || trimmed === '\u221E' || trimmed.toLowerCase() === 'infinity') {
      return true;
    }
    const num = parseFloat(trimmed);
    if (isNaN(num)) return null;
    return num >= 1; // Minimum 1 MOhm per BS 7671 Reg 643.3
  };

  // Calibration expiry helper
  const calibrationStatus = useMemo(() => {
    if (!formData.testEquipmentCalDate) return null;
    const calDate = new Date(formData.testEquipmentCalDate);
    const today = new Date();
    const monthsAgo =
      (today.getFullYear() - calDate.getFullYear()) * 12 +
      (today.getMonth() - calDate.getMonth());
    return monthsAgo > 12 ? 'expired' : 'valid';
  }, [formData.testEquipmentCalDate]);

  return (
    <div className="space-y-4">
      {/* ── Dead Testing ──────────────────────────────────────── */}
      <GradientHeader title="Dead Testing" />

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FormField label="R1+R2 (Ω)">
            <div className="relative">
              <Input
                value={formData.continuityR1R2 || ''}
                onChange={(e) => onUpdate('continuityR1R2', e.target.value)}
                placeholder="e.g. 0.45"
                className={cn(inputClasses, 'pr-10')}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-sm">
                Ω
              </span>
            </div>
          </FormField>
          <FormField label="R2 (Ω)">
            <div className="relative">
              <Input
                value={formData.r2Continuity || ''}
                onChange={(e) => onUpdate('r2Continuity', e.target.value)}
                placeholder="e.g. 0.25"
                className={cn(inputClasses, 'pr-10')}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-sm">
                Ω
              </span>
            </div>
          </FormField>
        </div>

        <FormField label="Polarity" required>
          <ToggleButtons
            options={[
              { value: 'correct', label: 'Correct', color: 'green' },
              { value: 'incorrect', label: 'Incorrect', color: 'red' },
            ]}
            value={formData.polarity || ''}
            onChange={(v) => onUpdate('polarity', v)}
          />
          {formData.polarity === 'correct' && (
            <span className="text-xs text-green-400 mt-1 block">Polarity confirmed</span>
          )}
          {formData.polarity === 'incorrect' && (
            <span className="text-xs text-red-400 mt-1 block">
              Polarity fault — must be corrected
            </span>
          )}
        </FormField>

        {/* Ring Circuit Continuity - shown only for ring circuits */}
        {formData.circuitType === 'ring' && (
          <div className="space-y-3">
            <SectionTitle title="Ring Circuit Continuity" />

            <span className="text-[10px] text-white uppercase tracking-wide">End-to-End</span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'r₁ (L)', field: 'ringR1', placeholder: '0.52' },
                { label: 'rₙ (N)', field: 'ringRn', placeholder: '0.52' },
                { label: 'r₂ (CPC)', field: 'ringR2', placeholder: '0.87' },
              ].map(({ label, field, placeholder }) => (
                <FormField key={field} label={label}>
                  <div className="relative">
                    <Input
                      value={formData[field] || ''}
                      onChange={(e) => onUpdate(field, e.target.value)}
                      placeholder={placeholder}
                      className={cn(inputClasses, 'pr-8')}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-sm">
                      Ω
                    </span>
                  </div>
                </FormField>
              ))}
            </div>

            <span className="text-[10px] text-white uppercase tracking-wide">Cross-Connect</span>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'r₁ (L)', field: 'ringR1Cross', placeholder: '0.26' },
                { label: 'rₙ (N)', field: 'ringRnCross', placeholder: '0.26' },
                { label: 'r₂ (CPC)', field: 'ringR2Cross', placeholder: '0.43' },
              ].map(({ label, field, placeholder }) => (
                <FormField key={field} label={label}>
                  <div className="relative">
                    <Input
                      value={formData[field] || ''}
                      onChange={(e) => onUpdate(field, e.target.value)}
                      placeholder={placeholder}
                      className={cn(inputClasses, 'pr-8')}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-sm">
                      Ω
                    </span>
                  </div>
                </FormField>
              ))}
            </div>

            <FormField label="R₁+R₂ (Ring Final)">
              <div className="relative">
                <Input
                  value={formData.ringFinalContinuity || ''}
                  onChange={(e) => onUpdate('ringFinalContinuity', e.target.value)}
                  placeholder="0.69"
                  className={cn(inputClasses, 'pr-8')}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-sm">
                  Ω
                </span>
              </div>
            </FormField>
          </div>
        )}


        <FormField label="Test Voltage">
          <ToggleButtons
            options={INSULATION_TEST_VOLTAGES.map((v) => ({
              value: v.value,
              label: v.value,
            }))}
            value={formData.insulationTestVoltage || '500V'}
            onChange={(v) => onUpdate('insulationTestVoltage', v)}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-3">
          {[
            { field: 'insulationLiveNeutral', label: 'L-N (MΩ)' },
            { field: 'insulationLiveEarth', label: 'L-E (MΩ)' },
            { field: 'insulationNeutralEarth', label: 'N-E (MΩ)' },
            { field: 'insulationLiveLive', label: 'L-L (MΩ)' },
          ].map(({ field, label }) => {
            const isValid = checkInsulationValue(formData[field]);
            return (
              <FormField key={field} label={label}>
                <Input
                  value={formData[field] || ''}
                  onChange={(e) => onUpdate(field, e.target.value)}
                  placeholder="≥1MΩ"
                  className={cn(
                    inputClasses,
                    isValid === true && 'border-green-500/50',
                    isValid === false && 'border-red-500/50'
                  )}
                />
                {isValid === true && (
                  <span className="text-xs text-green-400 mt-0.5 block">Pass</span>
                )}
                {isValid === false && (
                  <span className="text-xs text-red-400 mt-0.5 block">Below 1MΩ</span>
                )}
              </FormField>
            );
          })}
        </div>
      </div>

      {/* ── Live Testing ──────────────────────────────────────── */}
      <GradientHeader title="Live Testing" />

      <div className="space-y-4">

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Zs (Ω)" required>
            <div className="relative">
              <Input
                value={formData.earthFaultLoopImpedance || ''}
                onChange={(e) => onUpdate('earthFaultLoopImpedance', e.target.value)}
                placeholder="e.g. 0.85"
                className={cn(
                  inputClasses,
                  'pr-10',
                  zsValidation === true && 'border-green-500/50',
                  zsValidation === false && 'border-red-500/50'
                )}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-sm">
                Ω
              </span>
            </div>
          </FormField>
          <FormField label="Max Permitted Zs" hint="Auto-calculated">
            <Input
              value={formData.maxPermittedZs || ''}
              readOnly
              placeholder="Auto"
              className={cn(inputClasses, 'cursor-not-allowed opacity-60')}
            />
          </FormField>
        </div>

        {zsValidation !== null && (
          <div
            className={cn(
              'rounded-lg px-3 py-2 text-xs border',
              zsValidation === false
                ? 'border-red-500/30 bg-red-500/10 text-red-200'
                : zsMargin && zsMargin.percent < 20
                  ? 'border-amber-500/30 bg-amber-500/10 text-amber-200'
                  : 'border-green-500/30 bg-green-500/10 text-green-200'
            )}
          >
            {zsValidation === false
              ? `Zs ${formData.earthFaultLoopImpedance}Ω exceeds max ${formData.maxPermittedZs}Ω — disconnection time not met (Reg 411.4.5)`
              : zsMargin
                ? zsMargin.percent < 20
                  ? `Zs ${formData.earthFaultLoopImpedance}Ω vs max ${formData.maxPermittedZs}Ω — only ${zsMargin.percent}% margin. Consider temperature rise`
                  : `Zs ${formData.earthFaultLoopImpedance}Ω vs max ${formData.maxPermittedZs}Ω — ${zsMargin.percent}% margin`
                : 'Zs is within acceptable limits'}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <FormField label="Ipf (kA)" required>
            <Input
              value={formData.prospectiveFaultCurrent || ''}
              onChange={(e) => onUpdate('prospectiveFaultCurrent', e.target.value)}
              placeholder="e.g. 2.5"
              className={cn(
                inputClasses,
                pfcKaCheck?.pass === true && 'border-green-500/50',
                pfcKaCheck?.pass === false && 'border-red-500/50'
              )}
            />
            {pfcKaCheck?.pass === true && (
              <span className="text-xs text-green-400 mt-0.5 block">
                Ipf {pfcKaCheck.pfc}kA \u2264 {pfcKaCheck.ka}kA breaking capacity
              </span>
            )}
            {pfcKaCheck?.pass === false && (
              <span className="text-xs text-red-400 mt-0.5 block">
                Ipf {pfcKaCheck.pfc}kA exceeds {pfcKaCheck.ka}kA (Reg 434.5.1)
              </span>
            )}
            {!formData.protectiveDeviceKaRating && formData.prospectiveFaultCurrent && (
              <span className="text-xs text-amber-400 mt-0.5 block">
                Set breaking capacity (kA) on Circuit tab to verify
              </span>
            )}
          </FormField>
          <FormField label="Ze (Ω)">
            <div className="relative">
              <Input
                value={formData.externalImpedance || ''}
                onChange={(e) => onUpdate('externalImpedance', e.target.value)}
                placeholder="e.g. 0.35"
                className={cn(inputClasses, 'pr-10')}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-sm">
                Ω
              </span>
            </div>
          </FormField>
        </div>

        <FormField label="Functional Testing">
          <ToggleButtons
            options={[
              { value: 'pass', label: 'Pass', color: 'green' },
              { value: 'fail', label: 'Fail', color: 'red' },
              { value: 'na', label: 'N/A', color: 'amber' },
            ]}
            value={formData.functionalTesting || ''}
            onChange={(v) => onUpdate('functionalTesting', v)}
          />
        </FormField>

        {/* Phase Rotation - only for 3-phase supplies */}
        {formData.supplyPhases === '3' && (
          <FormField label="Phase Rotation">
            <ToggleButtons
              options={[
                { value: 'clockwise', label: 'CW (L1-L2-L3)' },
                { value: 'anti-clockwise', label: 'ACW (L1-L3-L2)' },
              ]}
              value={formData.phaseRotation || ''}
              onChange={(v) => onUpdate('phaseRotation', v)}
            />
          </FormField>
        )}
      </div>

      {/* ── RCD Testing ───────────────────────────────────────── */}
      {(formData.protectionRcd ||
        formData.protectionRcbo ||
        formData.protectionAfdd ||
        formData.protectionSpd) && (
        <>
          <GradientHeader title="RCD Testing" />

          <div className="space-y-4">
            {/* RCD/RCBO Testing */}
            {(formData.protectionRcd || formData.protectionRcbo) && (
              <div className="space-y-4">

                <div className="grid grid-cols-2 gap-3">
                  <FormField label="RCD Type">
                    <MobileSelectPicker
                      options={RCD_TYPES}
                      value={formData.rcdType || ''}
                      onValueChange={(v) => onUpdate('rcdType', v)}
                      placeholder="Select type"
                      title="RCD Type"
                    />
                  </FormField>
                  <FormField label="Rating (mA)">
                    <MobileSelectPicker
                      options={RCD_RATINGS}
                      value={formData.rcdRating || ''}
                      onValueChange={(v) => onUpdate('rcdRating', v)}
                      placeholder="Select"
                      title="RCD Rating"
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <FormField label="1x I\u0394n (ms)" hint="<300ms">
                    <div className="relative">
                      <Input
                        value={formData.rcdOneX || ''}
                        onChange={(e) => onUpdate('rcdOneX', e.target.value)}
                        placeholder="<300"
                        className={cn(
                          inputClasses,
                          'pr-10',
                          formData.rcdOneX &&
                            parseFloat(formData.rcdOneX) <= 300 &&
                            'border-green-500/50',
                          formData.rcdOneX &&
                            parseFloat(formData.rcdOneX) > 300 &&
                            'border-red-500/50'
                        )}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-sm">
                        ms
                      </span>
                    </div>
                    {formData.rcdOneX && parseFloat(formData.rcdOneX) <= 300 && (
                      <span className="text-xs text-green-400 block">Pass</span>
                    )}
                    {formData.rcdOneX && parseFloat(formData.rcdOneX) > 300 && (
                      <span className="text-xs text-red-400 block">Exceeds 300ms</span>
                    )}
                  </FormField>
                  <FormField label="5x I\u0394n (ms)" hint="<40ms">
                    <div className="relative">
                      <Input
                        value={formData.rcdFiveX || ''}
                        onChange={(e) => onUpdate('rcdFiveX', e.target.value)}
                        placeholder="<40"
                        className={cn(
                          inputClasses,
                          'pr-10',
                          formData.rcdFiveX &&
                            parseFloat(formData.rcdFiveX) <= 40 &&
                            'border-green-500/50',
                          formData.rcdFiveX &&
                            parseFloat(formData.rcdFiveX) > 40 &&
                            'border-red-500/50'
                        )}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-sm">
                        ms
                      </span>
                    </div>
                    {formData.rcdFiveX && parseFloat(formData.rcdFiveX) <= 40 && (
                      <span className="text-xs text-green-400 block">Pass</span>
                    )}
                  </FormField>
                  <FormField label="\u00BDx I\u0394n">
                    <ToggleButtons
                      options={[
                        { value: 'pass', label: 'Pass', color: 'green' },
                        { value: 'fail', label: 'Fail', color: 'red' },
                      ]}
                      value={formData.rcdHalfX || ''}
                      onChange={(v) => onUpdate('rcdHalfX', v)}
                    />
                  </FormField>
                </div>

                <FormField label="Test Button">
                  <ToggleButtons
                    options={[
                      { value: 'pass', label: 'Pass', color: 'green' },
                      { value: 'fail', label: 'Fail', color: 'red' },
                    ]}
                    value={formData.rcdTestButton || ''}
                    onChange={(v) => onUpdate('rcdTestButton', v)}
                  />
                </FormField>

                {/* RCBO Trip Time - only when RCBO fitted */}
                {formData.protectionRcbo && (
                  <FormField label="RCBO Trip Time (ms)">
                    <div className="relative">
                      <Input
                        value={formData.rcboTripTime || ''}
                        onChange={(e) => onUpdate('rcboTripTime', e.target.value)}
                        placeholder="e.g. 18"
                        className={cn(inputClasses, 'pr-10')}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-sm">
                        ms
                      </span>
                    </div>
                  </FormField>
                )}
              </div>
            )}

            {/* AFDD Testing */}
            {formData.protectionAfdd && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Test Button">
                    <ToggleButtons
                      options={[
                        { value: 'pass', label: 'Pass', color: 'green' },
                        { value: 'fail', label: 'Fail', color: 'red' },
                      ]}
                      value={formData.afddTestButton || ''}
                      onChange={(v) => onUpdate('afddTestButton', v)}
                    />
                  </FormField>
                  <FormField label="Trip Time (ms)">
                    <div className="relative">
                      <Input
                        value={formData.afddTripTime || ''}
                        onChange={(e) => onUpdate('afddTripTime', e.target.value)}
                        placeholder="e.g. 30"
                        className={cn(inputClasses, 'pr-10')}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-sm">
                        ms
                      </span>
                    </div>
                  </FormField>
                </div>
                <span className="text-[10px] text-white block">
                  NOTE: Not all AFDDs have a test button
                </span>
              </div>
            )}

            {/* SPD Testing */}
            {formData.protectionSpd && (
              <div className="space-y-4">
                <FormField label="Indicator Status">
                  <ToggleButtons
                    options={[
                      { value: 'green', label: 'Green (OK)', color: 'green' },
                      { value: 'red', label: 'Red (Replace)', color: 'red' },
                      { value: 'na', label: 'N/A', color: 'amber' },
                    ]}
                    value={formData.spdIndicatorStatus || ''}
                    onChange={(v) => onUpdate('spdIndicatorStatus', v)}
                  />
                </FormField>
                <FormField label="Visual Inspection">
                  <ToggleButtons
                    options={[
                      { value: 'satisfactory', label: 'Satisfactory', color: 'green' },
                      { value: 'unsatisfactory', label: 'Unsatisfactory', color: 'red' },
                    ]}
                    value={formData.spdVisualInspection || ''}
                    onChange={(v) => onUpdate('spdVisualInspection', v)}
                  />
                </FormField>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04]">
                  <Checkbox
                    id="spdTestButton"
                    checked={formData.spdTestButton || false}
                    onCheckedChange={(c) => onUpdate('spdTestButton', c)}
                    className="h-6 w-6 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 touch-manipulation"
                  />
                  <Label htmlFor="spdTestButton" className="text-sm text-white cursor-pointer">
                    SPD test button operates correctly
                  </Label>
                </div>
                <span className="text-[10px] text-white block">
                  NOTE: Not all SPDs have visible functionality indication
                </span>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Earth Electrode (TT only) ─────────────────────────── */}
      {formData.earthingArrangement === 'TT' && (
        <>
          <GradientHeader title="Earth Electrode" />

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="RA (Ω)" required hint="Required for TT (Reg 411.5.3)">
                <div className="relative">
                  <Input
                    value={formData.earthElectrodeResistance || ''}
                    onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)}
                    placeholder="e.g. 12"
                    className={cn(
                      inputClasses,
                      'pr-10',
                      raIdnCheck === true && 'border-green-500/50',
                      raIdnCheck === false && 'border-red-500/50'
                    )}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-sm">
                    Ω
                  </span>
                </div>
              </FormField>
            </div>

            {raIdnCheck !== null && (
              <div
                className={cn(
                  'rounded-lg px-3 py-2 text-xs border',
                  raIdnCheck
                    ? 'border-green-500/30 bg-green-500/10 text-green-200'
                    : 'border-red-500/30 bg-red-500/10 text-red-200'
                )}
              >
                {raIdnCheck
                  ? `RA \u00D7 I\u0394n = ${raIdnValue}V \u2264 50V — touch voltage safe (Reg 411.5.3)`
                  : `RA \u00D7 I\u0394n = ${raIdnValue}V exceeds 50V limit — earth electrode resistance too high for ${formData.rcdIdn || '30'}mA RCD (Reg 411.5.3)`}
              </div>
            )}

            {formData.earthingArrangement === 'TT' &&
              !formData.rcdIdn &&
              formData.earthElectrodeResistance && (
                <div className="rounded-lg px-3 py-2 text-xs border border-amber-500/30 bg-amber-500/10 text-amber-200">
                  Set RCD I\u0394n on Circuit tab to verify RA \u00D7 I\u0394n \u2264 50V compliance
                </div>
              )}
          </div>
        </>
      )}

      {/* ── Test Equipment ────────────────────────────────────── */}
      <GradientHeader title="Test Equipment" />

      <button
        type="button"
        onClick={() => {
          const equipment = loadTestEquipment?.();
          if (equipment) {
            if (equipment.testEquipmentModel) onUpdate('testEquipmentModel', equipment.testEquipmentModel);
            if (equipment.testEquipmentSerial) onUpdate('testEquipmentSerial', equipment.testEquipmentSerial);
            if (equipment.testEquipmentCalDate) onUpdate('testEquipmentCalDate', equipment.testEquipmentCalDate);
          }
        }}
        className="w-full h-9 rounded-lg text-xs font-medium bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow touch-manipulation active:scale-[0.98]"
      >
        Load from Business Settings
      </button>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2 items-end">
          <FormField label="Instrument">
            <MobileSelectPicker
              options={instrumentOptions}
              value={formData.testEquipmentModel || ''}
              onValueChange={handleInstrumentSelect}
              placeholder="Select"
              title="Test Instrument"
            />
          </FormField>
          <FormField label="Serial No.">
            <Input
              value={formData.testEquipmentSerial || ''}
              onChange={(e) => onUpdate('testEquipmentSerial', e.target.value)}
              placeholder="Serial number"
              className={inputClasses}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-2 items-end">
          <FormField label="Calibration">
            <Input
              type="date"
              value={formData.testEquipmentCalDate || ''}
              onChange={(e) => onUpdate('testEquipmentCalDate', e.target.value)}
              className={cn(inputClasses, 'text-xs')}
              style={{ fontSize: '12px' }}
            />
          </FormField>
          <FormField label="Temp (°C)">
            <Input
              value={formData.testTemperature || '20°C'}
              onChange={(e) => onUpdate('testTemperature', e.target.value)}
              placeholder="20°C"
              className={inputClasses}
            />
          </FormField>
        </div>
        {calibrationStatus === 'expired' && (
          <p className="text-[10px] text-red-400">Calibration may be expired (&gt;12 months)</p>
        )}
      </div>
    </div>
  );
};

export default MWTestingTab;

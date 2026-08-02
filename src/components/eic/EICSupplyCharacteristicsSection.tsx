import React, { useEffect } from 'react';
import { useHaptic } from '@/hooks/useHaptic';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import useReadingKeypad from '@/hooks/useReadingKeypad';

interface EICSupplyCharacteristicsSectionProps {
  formData: Record<string, string | boolean>;
  onUpdate: (field: string, value: string | boolean) => void;
}

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const chipBase =
  'h-11 rounded-xl text-xs transition-all touch-manipulation active:scale-[0.98]';

/** Canonical supplyVoltage is the chip form ('230V'/'400V'). The provider seed
 * and the design-import path historically stored bare '230'/'400' — map those
 * on read so the chips light, while a mount effect upgrades the stored value. */
const normaliseSupplyVoltage = (value: string): string =>
  value === '230' ? '230V' : value === '400' ? '400V' : value;
const chipOn = 'bg-elec-yellow border border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border border-white/[0.12] text-white font-medium';

const SectionHeading = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const FormField = ({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}{required && ' *'}</Label>
    {children}
    {hint && <span className="text-[11px] text-white block mt-1">{hint}</span>}
  </div>
);

// Smart device configuration - BS standard determines available types and ratings
const DEVICE_CONFIG: Record<
  string,
  { types: { value: string; label: string }[]; ratings: string[] }
> = {
  'BS EN 60898': {
    types: [
      { value: 'B', label: 'Type B' },
      { value: 'C', label: 'Type C' },
      { value: 'D', label: 'Type D' },
    ],
    ratings: ['6', '10', '16', '20', '25', '32', '40', '50', '63', '80', '100', '125'],
  },
  'BS EN 61009': {
    types: [
      { value: 'A', label: 'Type A (RCBO)' },
      { value: 'AC', label: 'Type AC (RCBO)' },
      { value: 'B', label: 'Type B (RCBO)' },
    ],
    ratings: ['6', '10', '16', '20', '25', '32', '40', '50', '63'],
  },
  'BS EN 60947-2': {
    types: [
      { value: 'B', label: 'Type B' },
      { value: 'C', label: 'Type C' },
      { value: 'D', label: 'Type D' },
    ],
    ratings: [
      '16', '20', '25', '32', '40', '50', '63', '80', '100',
      '125', '160', '200', '250', '315', '400', '500', '630',
      '800', '1000', '1250',
    ],
  },
  'BS 88-2': {
    types: [
      { value: 'gG', label: 'gG (General Purpose)' },
      { value: 'gM', label: 'gM (Motor)' },
      { value: 'aM', label: 'aM (Motor Starter)' },
    ],
    ratings: [
      '2', '4', '6', '10', '16', '20', '25', '32', '40', '50',
      '63', '80', '100', '125', '160', '200', '250', '315',
      '400', '500', '630', '800', '1000', '1250',
    ],
  },
  'BS 88-3': {
    types: [{ value: 'gG', label: 'gG (General Purpose)' }],
    ratings: ['5', '15', '20', '30', '45', '60', '80', '100'],
  },
  'BS 1361': {
    types: [
      { value: 'I', label: 'Type I (House Service)' },
      { value: 'II', label: 'Type II (Consumer Unit)' },
    ],
    ratings: ['5', '15', '20', '30', '45', '60', '80', '100'],
  },
  'BS 3036': {
    types: [
      { value: 'S1A', label: 'S1A (Rewirable)' },
      { value: 'S2A', label: 'S2A (Rewirable)' },
    ],
    ratings: ['5', '15', '20', '30', '45', '60', '100'],
  },
  other: {
    types: [
      { value: 'B', label: 'Type B' },
      { value: 'C', label: 'Type C' },
      { value: 'D', label: 'Type D' },
      { value: 'gG', label: 'gG Fuse' },
      { value: 'aM', label: 'aM Fuse' },
      { value: 'other', label: 'Other' },
    ],
    ratings: [
      '6', '10', '16', '20', '25', '32', '40', '50', '63', '80',
      '100', '125', '160', '200', '250', '315', '400', '500', '630',
    ],
  },
};

// BS 7671:2018+A4:2026 — TN-C-S splits into PME / PNB. `value` stays as the
// legacy code (templates/normaliser compare these); the TN-C-S options carry a
// `variant` tracked in `tncsVariant` (legacy 'tncs' with no variant = PME).
const EARTHING_OPTIONS: { key: string; value: string; variant?: 'pme' | 'pnb'; label: string }[] = [
  { key: 'tnc', value: 'tnc', label: 'TN-C' },
  { key: 'tncs-pme', value: 'tncs', variant: 'pme', label: 'TN-C-S (PME)' },
  { key: 'tncs-pnb', value: 'tncs', variant: 'pnb', label: 'TN-C-S (PNB)' },
  { key: 'tns', value: 'tns', label: 'TN-S' },
  { key: 'tt', value: 'tt', label: 'TT' },
  { key: 'it', value: 'it', label: 'IT' },
];

/** Numeric supply readings the keypad serves — free-number inputs only.
 * Nominal voltage is chips (230V/400V/Other) so it stays keypad-free. */
const KEYPAD_META = {
  supplyFrequency: { label: 'Frequency — supply', unit: 'Hz' },
  prospectiveFaultCurrent: { label: 'Ipf — prospective fault current', unit: 'kA' },
  externalZe: { label: 'Ze — external loop impedance', unit: 'Ω' },
};
const KEYPAD_SEQUENCE = ['supplyFrequency', 'prospectiveFaultCurrent', 'externalZe'];

const EICSupplyCharacteristicsSection: React.FC<EICSupplyCharacteristicsSectionProps> = ({
  formData,
  onUpdate,
}) => {
  // Reading keypad — shared MW pattern. Values flow through the existing
  // onUpdate path; getValue mirrors what each input renders (frequency
  // defaults to '50' exactly like its value prop).
  const keypad = useReadingKeypad({
    meta: KEYPAD_META,
    sequence: KEYPAD_SEQUENCE,
    getValue: (field) =>
      field === 'supplyFrequency'
        ? String(formData.supplyFrequency ?? '50')
        : String(formData[field] ?? ''),
    setValue: (field, value) => onUpdate(field, value),
  });

  const storedVoltage = String(formData.supplyVoltage ?? '');
  const supplyVoltage = normaliseSupplyVoltage(storedVoltage);

  // Write path — upgrade a legacy bare '230'/'400' (provider seed, design
  // import, old saves) to the canonical chip form so the certificate prints
  // '230V' and every consumer sees one format.
  useEffect(() => {
    if (storedVoltage !== supplyVoltage) {
      onUpdate('supplyVoltage', supplyVoltage);
    }
  }, [storedVoltage, supplyVoltage, onUpdate]);

  // Get available types based on selected BS standard
  const getAvailableTypes = () => {
    const bsStandard = formData.supplyDeviceBsEn || '';
    return DEVICE_CONFIG[bsStandard]?.types || DEVICE_CONFIG['other'].types;
  };

  // Get available ratings based on selected BS standard
  const getAvailableRatings = () => {
    const bsStandard = formData.supplyDeviceBsEn || '';
    return DEVICE_CONFIG[bsStandard]?.ratings || DEVICE_CONFIG['other'].ratings;
  };

  // Handle BS standard change - reset type and rating if they're no longer valid
  const handleBsStandardChange = (value: string) => {
    onUpdate('supplyDeviceBsEn', value);

    const config = DEVICE_CONFIG[value] || DEVICE_CONFIG['other'];

    // Reset type if current value is not in the new options
    if (
      formData.supplyDeviceType &&
      !config.types.some((t) => t.value === formData.supplyDeviceType)
    ) {
      onUpdate('supplyDeviceType', '');
    }

    // Reset rating if current value is not in the new options
    if (formData.supplyDeviceRating && !config.ratings.includes(formData.supplyDeviceRating)) {
      onUpdate('supplyDeviceRating', '');
    }
  };

  const handlePhasesChange = (value: string) => {
    onUpdate('phases', value);

    // Auto-set supply voltage based on phases
    if (value === 'single' && formData.supplyVoltage !== '230V') {
      onUpdate('supplyVoltage', '230V');
    } else if (value === 'three' && formData.supplyVoltage !== '400V') {
      onUpdate('supplyVoltage', '400V');
    }
  };

  // A TN-C-S option matches when the arrangement is 'tncs' AND the variant
  // lines up (legacy 'tncs' with no variant is treated as PME). Other types
  // match by value.
  const isEarthingActive = (option: (typeof EARTHING_OPTIONS)[number]) => {
    if (option.value !== 'tncs') return formData.earthingArrangement === option.value;
    if (formData.earthingArrangement !== 'tncs') return false;
    return (formData.tncsVariant || 'pme') === (option.variant || 'pme');
  };

  const handleEarthingArrangementChange = (option: (typeof EARTHING_OPTIONS)[number]) => {
    onUpdate('earthingArrangement', option.value);
    onUpdate('tncsVariant', option.variant || '');

    // Auto-set PME status — PNB is a distinct TN-C-S variant, not PME.
    if (option.value === 'tncs') {
      const pmeValue = option.variant === 'pnb' ? 'no' : 'yes';
      if (formData.supplyPME !== pmeValue) {
        onUpdate('supplyPME', pmeValue);
      }
    } else if (['tnc', 'tns', 'tt', 'it'].includes(option.value) && formData.supplyPME !== 'no') {
      onUpdate('supplyPME', 'no');
    }
  };

  // Common UK supply presets — one tap fills voltage + phases + earthing + PME + live conductor.
  // Covers ~95% of UK domestic + small commercial. User can still edit any field after.
  const applyPreset = (values: Record<string, string>) => {
    Object.entries(values).forEach(([field, value]) => onUpdate(field, value));
  };


  const haptic = useHaptic();
  return (
    <div
      // lg:contents — on desktop each card becomes its own grid item of the
      // parent 2-col grid (the MW per-card layout), so sections of different
      // heights no longer leave multi-card blank bands. Events still bubble
      // through display:contents, so the delegated haptic keeps working.
      className="space-y-4 lg:space-y-0 lg:contents"
      // Delegated press haptic — every chip/button tap in this section buzzes
      // like the MW tabs without wiring each onClick individually.
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) haptic.light();
      }}
    >
      {/* Supply Details */}
      <div className={cardCn}>
        <SectionHeading title="Supply details" />

        {/* Quick-start presets — covers most UK installations */}
        <div>
          <Label className={labelCn}>Quick start</Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                key: 'dom-tncs',
                label: 'Domestic',
                sub: '1ph 230V TN-C-S',
                values: {
                  supplyVoltage: '230V',
                  phases: 'single',
                  earthingArrangement: 'tncs',
                  tncsVariant: 'pme',
                  supplyPME: 'yes',
                  liveCondutorType: 'ac-1ph-2w',
                },
              },
              {
                key: 'com-tncs',
                label: 'Commercial',
                sub: '3ph 400V TN-C-S',
                values: {
                  supplyVoltage: '400V',
                  phases: 'three',
                  earthingArrangement: 'tncs',
                  tncsVariant: 'pme',
                  supplyPME: 'yes',
                  liveCondutorType: 'ac-3ph-4w',
                },
              },
              {
                key: 'tt-1ph',
                label: 'TT supply',
                sub: '1ph 230V electrode',
                values: {
                  supplyVoltage: '230V',
                  phases: 'single',
                  earthingArrangement: 'tt',
                  tncsVariant: '',
                  supplyPME: 'no',
                  liveCondutorType: 'ac-1ph-2w',
                },
              },
            ].map((preset) => {
              // Lit when every preset field matches the form — MW presets
              // reflect state so a returning user sees what was applied.
              const isActive = Object.entries(preset.values).every(([field, value]) =>
                field === 'supplyVoltage'
                  ? supplyVoltage === value
                  : String(formData[field] ?? '') === value
              );
              return (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => applyPreset(preset.values)}
                  className={cn(
                    'h-12 rounded-xl touch-manipulation active:scale-[0.98] flex flex-col items-center justify-center gap-0.5 px-1 transition-all',
                    isActive
                      ? 'bg-elec-yellow border border-elec-yellow'
                      : 'bg-white/[0.06] border border-white/[0.12]'
                  )}
                >
                  <span
                    className={cn(
                      'text-[11px] font-semibold leading-none',
                      isActive ? 'text-black' : 'text-white'
                    )}
                  >
                    {preset.label}
                  </span>
                  <span
                    className={cn(
                      'text-[10px] leading-none text-center',
                      isActive ? 'text-black/70' : 'text-white'
                    )}
                  >
                    {preset.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Voltage + Phases as toggle buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Voltage" required>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: '230V', label: '230V' },
                { value: '400V', label: '400V' },
                { value: 'other', label: 'Other' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onUpdate('supplyVoltage', opt.value)}
                  className={cn(
                    chipBase,
                    supplyVoltage === opt.value ? chipOn : chipOff
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </FormField>
          <FormField label="Phases" required>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'single', label: 'Single' },
                { value: 'three', label: 'Three' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handlePhasesChange(opt.value)}
                  className={cn(
                    chipBase,
                    formData.phases === opt.value ? chipOn : chipOff
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </FormField>
        </div>

        <FormField label="Frequency (Hz)">
          <Input
            id="supplyFrequency"
            type="text"
            inputMode="decimal"
            value={formData.supplyFrequency ?? '50'}
            onChange={(e) => onUpdate('supplyFrequency', e.target.value)}
            placeholder="50"
            className={inputCn}
            {...keypad.field('supplyFrequency')}
          />
        </FormField>
      </div>

      {/* Earthing Arrangement */}
      <div className={cardCn}>
        <SectionHeading title="Earthing arrangement" />
        <div className="grid grid-cols-3 gap-2">
          {EARTHING_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => handleEarthingArrangementChange(opt)}
              className={cn(
                chipBase,
                'text-[11px]',
                isEarthingActive(opt) ? chipOn : chipOff
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <FormField label="PME">
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { value: 'unknown', label: 'Unknown' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onUpdate('supplyPME', opt.value)}
                className={cn(
                  chipBase,
                  formData.supplyPME === opt.value ? chipOn : chipOff
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {formData.earthingArrangement === 'tncs' &&
            (formData.tncsVariant || 'pme') !== 'pnb' &&
            formData.supplyPME !== 'yes' && (
              <span className="text-[11px] text-elec-yellow block mt-1">TN-C-S systems typically have PME</span>
            )}
        </FormField>
      </div>

      {/* Number and Type of Live Conductors */}
      <div className={cardCn}>
        <SectionHeading title="Number and type of live conductors" />
        <FormField label="Live conductor configuration" required>
          <MobileSelectPicker
            value={(formData.liveCondutorType as string) || ''}
            onValueChange={(value) => onUpdate('liveCondutorType', value)}
            options={[
              { value: 'ac-1ph-2w', label: 'AC: 1-phase, 2-wire' },
              { value: 'ac-2ph-3w', label: 'AC: 2-phase, 3-wire' },
              { value: 'ac-3ph-3w', label: 'AC: 3-phase, 3-wire' },
              { value: 'ac-3ph-4w', label: 'AC: 3-phase, 4-wire' },
              { value: 'dc-2w', label: 'DC: 2-wire' },
              { value: 'dc-3w', label: 'DC: 3-wire' },
              { value: 'other', label: 'Other' },
            ]}
            placeholder="Select configuration"
            title="Live Conductor Configuration"
            triggerClassName={pickerTriggerCn}
          />
        </FormField>
      </div>

      {/* Nature of Supply Parameters */}
      <div className={cardCn}>
        <SectionHeading title="Nature of supply parameters" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Ipf (kA)" required>
            <Input
              id="prospectiveFaultCurrent"
              type="text"
              inputMode="decimal"
              value={formData.prospectiveFaultCurrent || ''}
              onChange={(e) => onUpdate('prospectiveFaultCurrent', e.target.value)}
              placeholder="16"
              className={inputCn}
              {...keypad.field('prospectiveFaultCurrent')}
            />
          </FormField>
          <FormField label="Ze (Ω)" required>
            <Input
              id="externalZe"
              type="text"
              inputMode="decimal"
              value={formData.externalZe || ''}
              onChange={(e) => onUpdate('externalZe', e.target.value)}
              placeholder="0.35"
              className={inputCn}
              {...keypad.field('externalZe')}
            />
          </FormField>
        </div>

        {/* Polarity + Other Sources as toggle buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onUpdate('supplyPolarityConfirmed', !formData.supplyPolarityConfirmed)}
            className={cn(
              chipBase,
              'flex items-center justify-center',
              formData.supplyPolarityConfirmed ? chipOn : chipOff
            )}
          >
            Polarity confirmed
          </button>
          <button
            type="button"
            onClick={() => onUpdate('otherSourcesOfSupply', !formData.otherSourcesOfSupply)}
            className={cn(
              chipBase,
              'flex items-center justify-center',
              formData.otherSourcesOfSupply ? chipOn : chipOff
            )}
          >
            Other sources
          </button>
        </div>

        {formData.otherSourcesOfSupply && (
          <FormField label="Details of other sources">
            <Input
              id="otherSourcesDetails"
              value={formData.otherSourcesDetails || ''}
              onChange={(e) => onUpdate('otherSourcesDetails', e.target.value)}
              placeholder="e.g., Solar PV, Generator"
              className={inputCn}
            />
          </FormField>
        )}
      </div>

      {/* Supply Protective Device */}
      <div className={cardCn}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">Supply protective device</h2>
          <button
            type="button"
            onClick={() => {
              if (formData.supplyDeviceRating === 'LIM') {
                onUpdate('supplyDeviceRating', '');
              } else {
                onUpdate('supplyDeviceRating', 'LIM');
              }
            }}
            className={cn(
              'h-11 px-4 rounded-xl text-sm touch-manipulation transition-colors shrink-0 border',
              formData.supplyDeviceRating === 'LIM' ? chipOn : chipOff
            )}
          >
            LIM
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
          <FormField label="BS (EN)">
            <MobileSelectPicker
              value={(formData.supplyDeviceBsEn as string) || ''}
              onValueChange={handleBsStandardChange}
              disabled={formData.supplyDeviceRating === 'LIM'}
              options={[
                { value: 'BS EN 60898', label: 'BS EN 60898 (MCB)' },
                { value: 'BS EN 61009', label: 'BS EN 61009 (RCBO)' },
                { value: 'BS EN 60947-2', label: 'BS EN 60947-2 (MCCB)' },
                { value: 'BS 88-2', label: 'BS 88-2 (HRC Fuse)' },
                { value: 'BS 88-3', label: 'BS 88-3 (Fuse)' },
                { value: 'BS 1361', label: 'BS 1361 (Fuse)' },
                { value: 'BS 3036', label: 'BS 3036 (Rewirable Fuse)' },
                { value: 'other', label: 'Other' },
              ]}
              placeholder="Select BS standard"
              title="BS (EN) Standard"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
          <FormField label="Type">
            <MobileSelectPicker
              value={(formData.supplyDeviceType as string) || ''}
              onValueChange={(value) => onUpdate('supplyDeviceType', value)}
              disabled={formData.supplyDeviceRating === 'LIM'}
              options={getAvailableTypes().map((t) => ({ value: t.value, label: t.label }))}
              placeholder="Select type"
              title="Device Type"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
          <FormField label="Rated current (A)">
            <MobileSelectPicker
              value={
                formData.supplyDeviceRating === 'LIM' ? '' : (formData.supplyDeviceRating as string) || ''
              }
              onValueChange={(value) => onUpdate('supplyDeviceRating', value)}
              disabled={formData.supplyDeviceRating === 'LIM'}
              options={getAvailableRatings().map((rating) => ({ value: rating, label: `${rating}A` }))}
              placeholder={
                formData.supplyDeviceRating === 'LIM' ? 'LIM' : 'Select rating'
              }
              title="Rated Current"
              triggerClassName={pickerTriggerCn}
            />
          </FormField>
        </div>
      </div>

      {/* Scroll room so the last reading can rise clear of the keypad */}
      {keypad.spacer}

      {/* Reading keypad — coarse-pointer devices only */}
      {keypad.element}
    </div>
  );
};

export default EICSupplyCharacteristicsSection;

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FormSelectSheet from '@/components/ui/form-select-sheet';
import { useEICRSmartForm } from '@/hooks/inspection/useEICRSmartForm';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import useReadingKeypad from '@/hooks/useReadingKeypad';
import {
  FieldLimitationBadge,
  FieldNotesInput,
  isFieldMarker,
} from '@/components/field-limitations';

// Fields managed by this section (for memoization comparison)
const SUPPLY_SECTION_FIELDS = [
  'phases',
  'supplyAcDc',
  'conductorConfiguration',
  'supplyVoltage',
  'supplyFrequency',
  'supplyPME',
  'externalZe',
  'prospectiveFaultCurrent',
  'supplyPolarityConfirmed',
  'otherSourcesOfSupply',
  'otherSourcesOfSupplyPresent',
  'dcConductorConfig',
  'mainProtectiveDevice',
  'mainProtectiveDeviceCustom',
  'mainProtectiveDeviceLimit',
  'mainSwitchRating',
  'breakingCapacity',
  'mainSwitchPoles',
  'fuseDeviceRating',
  'mainSwitchVoltageRating',
  'fuseSubType',
  'breakingCapacityCustom',
  'earthingArrangement',
  'earthElectrodeType',
  'rcdMainSwitch',
  'rcdRating',
  'rcdType',
  'rcdTimeDelay',
  'rcdMeasuredTime',
  'rcdBreakingCapacity',
  // ELE-849 — limitation reason notes, sibling to their marker-capable fields
  'externalZeNotes',
  'prospectiveFaultCurrentNotes',
  'otherSourcesOfSupplyNotes',
  'earthingArrangementNotes',
  'earthElectrodeTypeNotes',
  'supplyFrequencyNotes',
] as const;

interface SupplyCharacteristicsSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const sheetTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 hover:border-white/[0.3]';

const chipBase = 'h-11 rounded-xl text-xs transition-all touch-manipulation active:scale-[0.98]';
const chipOn = 'bg-elec-yellow border border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border border-white/[0.12] text-white font-medium';
const chipPass = 'bg-green-500 border border-green-500 text-black font-semibold';

const SectionHeading = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const FormField = ({
  label,
  required,
  hint,
  trailing,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div>
    {/* h-8 clears the N/A / LIM badges and keeps every field on one baseline. */}
    <div className="mb-2 flex h-8 items-center justify-between gap-2">
      <Label className={cn(labelCn, 'mb-0')}>
        {label}
        {required && ' *'}
      </Label>
      {trailing}
    </div>
    {children}
    {hint && <span className="text-[11px] text-white/85 block mt-1">{hint}</span>}
  </div>
);

/** Numeric supply readings the keypad serves — free-number inputs only.
 * Voltage is chips and the device ratings are nameplate values, so they
 * stay keypad-free. */
const KEYPAD_META = {
  supplyFrequency: { label: 'Frequency — supply', unit: 'Hz' },
  externalZe: { label: 'Ze — external loop impedance', unit: 'Ω' },
  prospectiveFaultCurrent: { label: 'Ipf — prospective fault current', unit: 'kA' },
  rcdMeasuredTime: { label: 'RCD — measured operating time', unit: 'ms' },
};
const KEYPAD_SEQUENCE = [
  'supplyFrequency',
  'externalZe',
  'prospectiveFaultCurrent',
  'rcdMeasuredTime',
];

/**
 * SupplyCharacteristicsSection - Best-in-class mobile form for supply & earthing details
 * Edge-to-edge design with large touch targets and native app feel
 *
 * Performance optimised with React.memo for selective re-rendering
 */
const SupplyCharacteristicsSectionInner = ({
  formData,
  onUpdate,
}: SupplyCharacteristicsSectionProps) => {
  const haptic = useHaptic();
  const { suggestions } = useEICRSmartForm(formData, onUpdate);
  const ipfSuggestion = suggestions.find((s) => s.field === 'prospectiveFaultCurrent');

  // The smart-form hook emits the Ze-derived Ipf as an integer amps string
  // below 1000 A and a one-decimal kA string above — the Ipf field records
  // kA, so normalise the amps branch before offering it as a one-tap apply.
  const ipfSuggestionKa = ipfSuggestion
    ? ipfSuggestion.value.includes('.')
      ? ipfSuggestion.value
      : String(parseFloat((Number(ipfSuggestion.value) / 1000).toFixed(2)))
    : '';

  // Reading keypad — shared MW pattern. Values flow through the existing
  // onUpdate path; getValue mirrors what each input renders (frequency
  // defaults to '50' exactly like its value prop).
  const keypad = useReadingKeypad({
    meta: KEYPAD_META,
    sequence: KEYPAD_SEQUENCE,
    getValue: (field) =>
      field === 'supplyFrequency'
        ? String(formData.supplyFrequency || '50')
        : String(formData[field] ?? ''),
    setValue: (field, value) => onUpdate(field, value),
  });

  // Auto-set common voltage based on phases
  const handlePhasesChange = (value: string) => {
    haptic.light();
    // Toggle off if already selected
    if (formData.phases === value) {
      onUpdate('phases', '');
      return;
    }
    onUpdate('phases', value);

    // Auto-suggest common voltages
    if (value === '1' && !formData.supplyVoltage) {
      onUpdate('supplyVoltage', '230');
    } else if (value === '3' && !formData.supplyVoltage) {
      onUpdate('supplyVoltage', '400');
    }
  };

  const isTNCSSsystem = formData.earthingArrangement === 'TN-C-S' || formData.earthingArrangement === 'TN-C-S-PNB';

  // Auto-set PME based on earthing arrangement
  React.useEffect(() => {
    if (isTNCSSsystem && formData.supplyPME !== 'yes') {
      onUpdate('supplyPME', 'yes');
    } else if (
      formData.earthingArrangement &&
      !isTNCSSsystem &&
      formData.supplyPME === 'yes'
    ) {
      onUpdate('supplyPME', 'no');
    }

    // Auto-set earth electrode type to N/A for TN systems
    if (
      (formData.earthingArrangement === 'TN-S' || isTNCSSsystem) &&
      formData.earthElectrodeType !== 'n/a'
    ) {
      onUpdate('earthElectrodeType', 'n/a');
    }

    // Smart: TT earthing → auto-enable RCD with 30mA
    if (formData.earthingArrangement === 'TT' && formData.rcdMainSwitch !== 'yes') {
      onUpdate('rcdMainSwitch', 'yes');
      onUpdate('rcdRating', '30mA');
    }
  }, [formData.earthingArrangement]);

  // Show RCD fields only when RCD main switch is yes
  const showRCDFields = formData.rcdMainSwitch === 'yes';

  // Handle main protective device selection
  const handleMainProtectiveDeviceChange = (value: string) => {
    haptic.light();
    if (value === '__clear__') {
      onUpdate('mainProtectiveDevice', '');
      onUpdate('mainProtectiveDeviceCustom', 'false');
    } else if (value === 'other') {
      onUpdate('mainProtectiveDevice', '');
      onUpdate('mainProtectiveDeviceCustom', 'true');
    } else {
      onUpdate('mainProtectiveDevice', value);
      onUpdate('mainProtectiveDeviceCustom', 'false');
    }
  };

  // Get earthing arrangement info
  const getEarthingInfo = (arrangement: string) => {
    const info: { [key: string]: string } = {
      'TN-C': 'Combined neutral and protective conductor throughout',
      'TN-S': 'Separate neutral and protective conductors',
      'TN-C-S': 'Protective Multiple Earthing (PME)',
      'TN-C-S-PNB': 'Protective Neutral Bonding (PNB)',
      TT: 'Installation earth electrode independent of supply',
      IT: 'Isolated or impedance earthed supply',
    };
    return info[arrangement] || '';
  };

  // Main protective device types (rating entered separately below)
  const mainProtectiveDeviceOptions = [
    // Fuses
    { value: 'BS 1361 Fuse', label: 'BS 1361 Cartridge Fuse', group: 'Fuses' },
    { value: 'BS 88 HRC Fuse', label: 'BS 88 HRC Fuse', group: 'Fuses' },
    { value: 'BS 3036 Rewireable Fuse', label: 'BS 3036 Rewireable Fuse', group: 'Fuses' },
    // MCBs
    { value: 'MCB Type B', label: 'MCB Type B', group: 'MCBs' },
    { value: 'MCB Type C', label: 'MCB Type C', group: 'MCBs' },
    { value: 'MCB Type D', label: 'MCB Type D', group: 'MCBs' },
    // Moulded Case
    { value: 'MCCB', label: 'MCCB', group: 'Moulded Case' },
    // Switches / Isolators (to BS EN 60947-3)
    { value: 'Switch Disconnector', label: 'Switch-Disconnector (BS EN 60947-3)', group: 'Switches' },
    { value: 'Isolator', label: 'Isolator (BS EN 60947-3)', group: 'Switches' },
    // RCDs
    { value: 'RCD Main Switch', label: 'RCD Main Switch', group: 'RCDs' },
    { value: 'RCBO', label: 'RCBO', group: 'RCDs' },
    // Limitation / not-verified ('Other (specify)' free-text is added automatically
    // by FormSelectSheet's allowCustom — don't duplicate it here).
    { value: 'LIM', label: 'Limitation (LIM)', group: 'Other' },
    { value: 'N/V', label: 'Not Verified (N/V)', group: 'Other' },
  ];

  const knownDeviceValues = mainProtectiveDeviceOptions.map((d) => d.value);

  // Smart breaking capacity options based on selected device type
  const deviceBreakingCapacity: Record<string, string[]> = {
    'BS 1361 Fuse': ['16.5', '33'],
    'BS 88 HRC Fuse': ['50', '80', '120'],
    'BS 3036 Rewireable Fuse': ['1', '2', '4'],
    'MCB Type B': ['6', '10', '15', '25'],
    'MCB Type C': ['6', '10', '15', '25'],
    'MCB Type D': ['6', '10', '15', '25'],
    MCCB: ['16', '25', '36', '50', '70'],
    'Switch Disconnector': [],
    Isolator: [],
    'RCD Main Switch': [],
    RCBO: ['6', '10'],
  };

  const currentBreakingCapacities = deviceBreakingCapacity[formData.mainProtectiveDevice] || [];

  // Section-wide LIM/N/A limitation marker for the Main Protective Device.
  // Owns its own key now (ELE-1370) so this section no longer writes the
  // mainSwitch* keys — those belong to the consumer-unit Main Switch (the
  // board), which is what the PDF reads. Falls back to a legacy value stored
  // in mainSwitchRating so certs saved before the decouple still show LIM/N/A.
  const mpdLimit =
    formData.mainProtectiveDeviceLimit ||
    (formData.mainSwitchRating === 'LIM' || formData.mainSwitchRating === 'N/A'
      ? formData.mainSwitchRating
      : '');

  /*
   * ELE-1608 — the panel's sub-fields lock for EITHER marker.
   *
   * They locked on 'LIM' only, so marking the section N/A stamped "N/A" into
   * every field and then left them all editable — the section read as answered
   * and behaved as unanswered. LIM ("could not inspect") and N/A ("there is no
   * main switch") are different statements about the installation, but both
   * are complete answers, and neither leaves sub-fields to fill in.
   */
  const mpdLocked = mpdLimit === 'LIM' || mpdLimit === 'N/A';

  // Check if custom input should be shown
  const showCustomProtectiveDevice =
    formData.mainProtectiveDeviceCustom === 'true' ||
    (formData.mainProtectiveDevice && !knownDeviceValues.includes(formData.mainProtectiveDevice));

  // Earthing arrangement options
  const earthingOptions = [
    { value: 'TN-C', label: 'TN-C' },
    { value: 'TN-S', label: 'TN-S' },
    { value: 'TN-C-S', label: 'TN-C-S (PME)' },
    { value: 'TN-C-S-PNB', label: 'TN-C-S (PNB)' },
    { value: 'TT', label: 'TT' },
    { value: 'IT', label: 'IT' },
  ];

  return (
    <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-4 lg:space-y-0">
      {/* Supply details */}
      <div className={cardCn}>
        <SectionHeading title="Supply details" />

        {/* Phases + Voltage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Phases" required>
            <div className="grid grid-cols-3 gap-2" data-field="phases">
              {[
                { value: '1', label: 'Single' },
                { value: '2', label: 'Two' },
                { value: '3', label: 'Three' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handlePhasesChange(option.value)}
                  className={cn(chipBase, formData.phases === option.value ? chipOn : chipOff)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FormField>
          <FormField label="Voltage" required>
            <div className="grid grid-cols-3 gap-2" data-field="supplyVoltage">
              {[
                { value: '230', label: '230V' },
                { value: '400', label: '400V' },
                { value: '230/400', label: 'Both' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onUpdate('supplyVoltage', formData.supplyVoltage === option.value ? '' : option.value);
                  }}
                  className={cn(
                    chipBase,
                    formData.supplyVoltage === option.value ? chipOn : chipOff
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FormField>
        </div>

        {/* AC/DC + Wires + Hz */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
          <FormField label="AC/DC">
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'ac', label: 'AC' },
                { value: 'dc', label: 'DC' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onUpdate('supplyAcDc', formData.supplyAcDc === option.value ? '' : option.value);
                  }}
                  className={cn(
                    chipBase,
                    (formData.supplyAcDc || 'ac') === option.value ? chipOn : chipOff
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FormField>
          <FormField label="Wires">
            <FormSelectSheet
              value={formData.supplyAcDc === 'dc' ? (formData.dcConductorConfig || '') : (formData.conductorConfiguration || '')}
              onValueChange={(value) => {
                if (formData.supplyAcDc === 'dc') {
                  onUpdate('dcConductorConfig', value);
                } else {
                  onUpdate('conductorConfiguration', value);
                }
              }}
              label={formData.supplyAcDc === 'dc' ? 'DC conductor configuration' : 'Conductor configuration'}
              placeholder="—"
              className={sheetTriggerCn}
              options={
                formData.supplyAcDc === 'dc'
                  ? [
                      { value: 'dc-2-wire', label: 'DC 2-wire' },
                      { value: 'dc-3-wire', label: 'DC 3-wire' },
                      { value: 'dc-other', label: 'DC Other' },
                    ]
                  : [
                      { value: '2-wire', label: '2-wire', description: '1-phase, 2-wire' },
                      { value: '3-wire', label: '3-wire', description: '2-phase or 3-phase, 3-wire' },
                      { value: '4-wire', label: '4-wire', description: '3-phase, 4-wire' },
                    ]
              }
            />
          </FormField>
          <FormField
            label="Hz"
            trailing={
              <FieldLimitationBadge
                compact
                value={formData.supplyFrequency || ''}
                markers={['LIM', 'N/A']}
                onChange={(v) => onUpdate('supplyFrequency', v)}
              />
            }
          >
            <Input
              type="text"
              inputMode="decimal"
              value={isFieldMarker(formData.supplyFrequency) ? formData.supplyFrequency : (formData.supplyFrequency || '50')}
              onChange={(e) => onUpdate('supplyFrequency', e.target.value)}
              placeholder="50"
              disabled={isFieldMarker(formData.supplyFrequency)}
              className={cn(inputCn, isFieldMarker(formData.supplyFrequency) && 'opacity-60')}
              {...keypad.field('supplyFrequency')}
            />
            <FieldNotesInput
              parentValue={formData.supplyFrequency || ''}
              value={formData.supplyFrequencyNotes || ''}
              onChange={(v) => onUpdate('supplyFrequencyNotes', v)}
              placeholder="Reason"
            />
          </FormField>
        </div>

        {/* Ze + Ipf */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField
            label="External Ze (Ω)"
            trailing={
              <FieldLimitationBadge
                compact
                value={formData.externalZe || ''}
                markers={['LIM']}
                onChange={(v) => onUpdate('externalZe', v)}
              />
            }
          >
            {isFieldMarker(formData.externalZe) ? (
              <Input value={formData.externalZe} disabled className={cn(inputCn, 'opacity-60')} />
            ) : (
              <Input
                type="text"
                inputMode="decimal"
                value={formData.externalZe || ''}
                onChange={(e) => onUpdate('externalZe', e.target.value)}
                placeholder="0.35"
                className={inputCn}
                {...keypad.field('externalZe')}
              />
            )}
            <FieldNotesInput
              parentValue={formData.externalZe || ''}
              value={formData.externalZeNotes || ''}
              onChange={(v) => onUpdate('externalZeNotes', v)}
              placeholder="Reason (e.g. meter room locked)"
            />
          </FormField>
          <FormField
            label="Ipf at origin (kA)"
            trailing={
              <FieldLimitationBadge
                compact
                value={formData.prospectiveFaultCurrent || ''}
                markers={['LIM']}
                onChange={(v) => onUpdate('prospectiveFaultCurrent', v)}
              />
            }
          >
            {isFieldMarker(formData.prospectiveFaultCurrent) ? (
              <Input
                value={formData.prospectiveFaultCurrent}
                disabled
                className={cn(inputCn, 'opacity-60')}
              />
            ) : (
              <Input
                type="text"
                inputMode="decimal"
                value={formData.prospectiveFaultCurrent || ''}
                onChange={(e) => onUpdate('prospectiveFaultCurrent', e.target.value)}
                placeholder={ipfSuggestion ? `~${ipfSuggestionKa}` : '16'}
                className={inputCn}
                {...keypad.field('prospectiveFaultCurrent')}
              />
            )}
            {/* One-tap apply for the Ze-derived estimate — never written silently */}
            {ipfSuggestion && !formData.prospectiveFaultCurrent && (
              <button
                type="button"
                onClick={() => {
                  haptic.light();
                  onUpdate('prospectiveFaultCurrent', ipfSuggestionKa);
                }}
                className="mt-2 inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-xs font-medium text-white transition-all touch-manipulation active:scale-[0.98]"
              >
                <span>≈ {ipfSuggestionKa} kA from Ze</span>
                <span className="font-semibold text-elec-yellow">Apply</span>
              </button>
            )}
            <FieldNotesInput
              parentValue={formData.prospectiveFaultCurrent || ''}
              value={formData.prospectiveFaultCurrentNotes || ''}
              onChange={(v) => onUpdate('prospectiveFaultCurrentNotes', v)}
              placeholder="Reason (e.g. not measurable from here)"
            />
          </FormField>
        </div>

        {/* Polarity + Other sources */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <FormField label="Polarity">
            <button
              type="button"
              onClick={() => {
                haptic.light();
                onUpdate('supplyPolarityConfirmed', formData.supplyPolarityConfirmed === 'true' ? 'false' : 'true');
              }}
              className={cn(
                chipBase,
                'w-full flex items-center justify-center',
                formData.supplyPolarityConfirmed === 'true' ? chipPass : chipOff
              )}
            >
              Confirmed
            </button>
          </FormField>
          {/* A4:2026 — Other sources of supply tick-box */}
          <FormField
            label="Other sources"
            trailing={
              <FieldLimitationBadge
                compact
                value={formData.otherSourcesOfSupplyPresent === 'N/A' ? 'N/A' : ''}
                markers={['N/A']}
                onChange={(v) => {
                  if (v === 'N/A') {
                    onUpdate('otherSourcesOfSupplyPresent', 'N/A');
                    onUpdate('otherSourcesOfSupply', '');
                  } else {
                    onUpdate('otherSourcesOfSupplyPresent', 'false');
                  }
                }}
              />
            }
          >
            <button
              type="button"
              disabled={formData.otherSourcesOfSupplyPresent === 'N/A'}
              onClick={() => {
                haptic.light();
                onUpdate('otherSourcesOfSupplyPresent', formData.otherSourcesOfSupplyPresent === 'true' ? 'false' : 'true');
              }}
              className={cn(
                chipBase,
                'w-full flex items-center justify-center',
                formData.otherSourcesOfSupplyPresent === 'true' ? chipOn : chipOff,
                formData.otherSourcesOfSupplyPresent === 'N/A' && 'opacity-40'
              )}
            >
              {formData.otherSourcesOfSupplyPresent === 'N/A' ? 'N/A' : 'Present'}
            </button>
            <FieldNotesInput
              parentValue={formData.otherSourcesOfSupplyPresent === 'N/A' ? 'N/A' : ''}
              value={formData.otherSourcesOfSupplyNotes || ''}
              onChange={(v) => onUpdate('otherSourcesOfSupplyNotes', v)}
              placeholder="Reason (e.g. cabin-only install, no secondary source)"
            />
          </FormField>
        </div>
        {formData.otherSourcesOfSupplyPresent === 'true' && (
          <FormField label="Other sources — details (continuation sheet)">
            <Input
              value={formData.otherSourcesOfSupply || ''}
              onChange={(e) => onUpdate('otherSourcesOfSupply', e.target.value)}
              placeholder="Solar PV, generator, battery storage..."
              className={inputCn}
            />
          </FormField>
        )}
      </div>

      {/* Main protective device */}
      <div className={cardCn}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">Main protective device</h2>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                haptic.light();
                if (mpdLimit === 'LIM') {
                  onUpdate('mainProtectiveDeviceLimit', '');
                  if (formData.mainSwitchRating === 'LIM') onUpdate('mainSwitchRating', '');
                } else {
                  onUpdate('mainProtectiveDeviceLimit', 'LIM');
                  onUpdate('mainProtectiveDevice', '');
                  onUpdate('mainProtectiveDeviceCustom', 'false');
                  onUpdate('breakingCapacity', '');
                  onUpdate('fuseDeviceRating', '');
                  onUpdate('mainSwitchVoltageRating', '');
                }
              }}
              className={cn(
                'h-11 px-4 rounded-xl text-xs touch-manipulation transition-all active:scale-[0.98]',
                mpdLimit === 'LIM' ? chipOn : chipOff
              )}
            >
              LIM
            </button>
            {/* ELE-855 — N/A when no main switch exists */}
            <button
              type="button"
              onClick={() => {
                haptic.light();
                if (mpdLimit === 'N/A') {
                  onUpdate('mainProtectiveDeviceLimit', '');
                  if (formData.mainSwitchRating === 'N/A') onUpdate('mainSwitchRating', '');
                } else {
                  onUpdate('mainProtectiveDeviceLimit', 'N/A');
                  onUpdate('mainProtectiveDevice', 'N/A');
                  onUpdate('mainProtectiveDeviceCustom', 'false');
                  onUpdate('breakingCapacity', 'N/A');
                  onUpdate('fuseDeviceRating', 'N/A');
                  onUpdate('mainSwitchVoltageRating', 'N/A');
                }
              }}
              className={cn(
                'h-11 px-4 rounded-xl text-xs touch-manipulation transition-all active:scale-[0.98]',
                mpdLimit === 'N/A' ? chipOn : chipOff
              )}
            >
              N/A
            </button>
          </div>
        </div>
        <FormField label="Device" required>
          <div data-field="mainProtectiveDevice">
          <FormSelectSheet
            value={showCustomProtectiveDevice ? 'other' : formData.mainProtectiveDevice || ''}
            onValueChange={handleMainProtectiveDeviceChange}
            disabled={mpdLocked}
            label="Main protective device"
            placeholder="Select device"
            allowCustom
            customLabel="Other (specify)"
            options={mainProtectiveDeviceOptions}
            className={cn(sheetTriggerCn, mpdLocked && 'opacity-40')}
          />
        </div>
        </FormField>

        {/* BS 88 Fuse sub-type (gG, gM, aM, Type 2/3/4) */}
        {formData.mainProtectiveDevice === 'BS 88 HRC Fuse' && (
          <FormField label="Fuse type">
            <FormSelectSheet
              value={formData.fuseSubType || ''}
              onValueChange={(value) => {
                haptic.light();
                onUpdate('fuseSubType', value);
              }}
              label="Fuse type"
              placeholder="Select fuse type"
              className={sheetTriggerCn}
              options={[
                { value: 'gG', label: 'gG — General Purpose', group: 'Application' },
                { value: 'gM', label: 'gM — Motor Circuit', group: 'Application' },
                { value: 'aM', label: 'aM — Motor Starter', group: 'Application' },
                { value: 'Type 2', label: 'Type 2', group: 'Utilisation Category' },
                { value: 'Type 3', label: 'Type 3', group: 'Utilisation Category' },
                { value: 'Type 4', label: 'Type 4', group: 'Utilisation Category' },
              ]}
            />
          </FormField>
        )}

        {showCustomProtectiveDevice && (
          <FormField label="Custom device">
            <Input
              value={formData.mainProtectiveDevice || ''}
              onChange={(e) => onUpdate('mainProtectiveDevice', e.target.value)}
              placeholder="e.g. 125A BS 88 Fuse"
              disabled={mpdLocked}
              className={cn(inputCn, mpdLocked && 'opacity-40')}
            />
          </FormField>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
          <FormField
            label="kA"
            trailing={
              <FieldLimitationBadge
                compact
                value={formData.breakingCapacity || ''}
                markers={['LIM']}
                onChange={(v) => onUpdate('breakingCapacity', v)}
              />
            }
          >
            {isFieldMarker(formData.breakingCapacity) ? (
              <Input
                value={formData.breakingCapacity}
                disabled
                className={cn(inputCn, 'opacity-60')}
              />
            ) : currentBreakingCapacities.length > 0 ? (
              <FormSelectSheet
                value={formData.breakingCapacity || ''}
                onValueChange={(value) => {
                  haptic.light();
                  if (value === '__custom__') { onUpdate('breakingCapacity', '__custom__'); }
                  else { onUpdate('breakingCapacity', value); }
                }}
                disabled={mpdLocked}
                label="Breaking capacity (kA)"
                placeholder="Select kA"
                allowCustom
                customLabel="Other (specify)"
                options={currentBreakingCapacities.map((kA) => ({ value: kA, label: `${kA} kA` }))}
                className={cn(sheetTriggerCn, mpdLocked && 'opacity-40')}
              />
            ) : (
              <Input
                value={formData.breakingCapacity || ''}
                onChange={(e) => onUpdate('breakingCapacity', e.target.value)}
                placeholder={
                  currentBreakingCapacities.length === 0 && formData.mainProtectiveDevice
                    ? 'N/A'
                    : 'e.g., 6'
                }
                type="number"
                min="0"
                step="0.1"
                disabled={mpdLocked}
                className={cn(inputCn, mpdLocked && 'opacity-40')}
              />
            )}
          </FormField>
          <FormField
            label="Fuse (A)"
            trailing={
              <FieldLimitationBadge
                compact
                value={formData.fuseDeviceRating || ''}
                markers={['N/A']}
                onChange={(v) => onUpdate('fuseDeviceRating', v)}
              />
            }
          >
            <Input
              type={isFieldMarker(formData.fuseDeviceRating) ? 'text' : 'number'}
              min="0"
              value={formData.fuseDeviceRating || ''}
              onChange={(e) => onUpdate('fuseDeviceRating', e.target.value)}
              placeholder="100"
              disabled={mpdLocked || isFieldMarker(formData.fuseDeviceRating)}
              className={cn(inputCn, (mpdLocked || isFieldMarker(formData.fuseDeviceRating)) && 'opacity-40')}
              inputMode="numeric"
            />
          </FormField>
          <FormField
            label="Volts (V)"
            trailing={
              <FieldLimitationBadge
                compact
                value={formData.mainSwitchVoltageRating || ''}
                markers={['N/A']}
                onChange={(v) => onUpdate('mainSwitchVoltageRating', v)}
              />
            }
          >
            <Input
              type={isFieldMarker(formData.mainSwitchVoltageRating) ? 'text' : 'number'}
              min="0"
              value={formData.mainSwitchVoltageRating || ''}
              onChange={(e) => onUpdate('mainSwitchVoltageRating', e.target.value)}
              placeholder="230"
              disabled={mpdLocked || isFieldMarker(formData.mainSwitchVoltageRating)}
              className={cn(inputCn, (mpdLocked || isFieldMarker(formData.mainSwitchVoltageRating)) && 'opacity-40')}
              inputMode="numeric"
            />
          </FormField>
        </div>

        {/* Custom kA input when "Other (specify)" selected */}
        {formData.breakingCapacity === '__custom__' && (
          <FormField label="Custom breaking capacity (kA)">
            <Input
              value={formData.breakingCapacityCustom || ''}
              onChange={(e) => onUpdate('breakingCapacityCustom', e.target.value)}
              placeholder="e.g. 100"
              type="number"
              min="0"
              step="0.1"
              className={inputCn}
            />
          </FormField>
        )}
      </div>

      {/* Earthing system */}
      <div className={cardCn}>
        <SectionHeading title="Earthing system" />
        <FormField
          label="Earthing arrangement"
          required
          trailing={
            <FieldLimitationBadge
              compact
              value={formData.earthingArrangement || ''}
              markers={['LIM', 'N/A']}
              onChange={(v) => onUpdate('earthingArrangement', v)}
            />
          }
        >
          {isFieldMarker(formData.earthingArrangement) ? (
            <Input
              value={formData.earthingArrangement}
              disabled
              className={cn(inputCn, 'opacity-60')}
            />
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {earthingOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onUpdate('earthingArrangement', formData.earthingArrangement === option.value ? '' : option.value);
                  }}
                  className={cn(
                    chipBase,
                    'px-1 text-[11px]',
                    formData.earthingArrangement === option.value ? chipOn : chipOff
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
          <FieldNotesInput
            parentValue={formData.earthingArrangement || ''}
            value={formData.earthingArrangementNotes || ''}
            onChange={(v) => onUpdate('earthingArrangementNotes', v)}
            placeholder="Reason (e.g. meter room locked — could not confirm)"
          />
        </FormField>
        <FormField
          label="Electrode type"
          trailing={
            <FieldLimitationBadge
              compact
              value={formData.earthElectrodeType || ''}
              markers={['LIM']}
              onChange={(v) => onUpdate('earthElectrodeType', v)}
            />
          }
        >
          {isFieldMarker(formData.earthElectrodeType) ? (
            <Input
              value={formData.earthElectrodeType}
              disabled
              className={cn(inputCn, 'opacity-60')}
            />
          ) : (
          <FormSelectSheet
            value={formData.earthElectrodeType || ''}
            onValueChange={(value) => {
              haptic.light();
              onUpdate('earthElectrodeType', value);
            }}
            label="Earth electrode type"
            placeholder="Select"
            allowCustom
            customLabel="Other"
            className={sheetTriggerCn}
            options={[
              { value: 'rod', label: 'Rod' },
              { value: 'tape', label: 'Tape' },
              { value: 'plate', label: 'Plate' },
              { value: 'structural', label: 'Steel' },
              { value: 'n/a', label: 'N/A' },
            ]}
          />
          )}
          <FieldNotesInput
            parentValue={formData.earthElectrodeType || ''}
            value={formData.earthElectrodeTypeNotes || ''}
            onChange={(v) => onUpdate('earthElectrodeTypeNotes', v)}
            placeholder="Reason"
          />
        </FormField>
      </div>

      {/* RCD protection */}
      <div className={cardCn}>
        <SectionHeading title="RCD protection" />
        {/* Row 1: RCD main + rating */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
          <FormField label="RCD main">
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    const newValue = formData.rcdMainSwitch === option.value ? '' : option.value;
                    onUpdate('rcdMainSwitch', newValue);
                    // ELE-1246 — clear ALL RCD detail fields when the main switch
                    // isn't an RCD, not just the rating: stale type/time values
                    // were surviving in formData and printing on the PDF.
                    if (newValue !== 'yes') {
                      onUpdate('rcdRating', '');
                      onUpdate('rcdType', '');
                      onUpdate('rcdTimeDelay', '');
                      onUpdate('rcdMeasuredTime', '');
                      onUpdate('rcdBreakingCapacity', '');
                    }
                  }}
                  className={cn(
                    chipBase,
                    formData.rcdMainSwitch === option.value ? chipOn : chipOff
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FormField>
          {showRCDFields && (
            <div className="sm:col-span-2">
              <FormField label="Rating (mA)" required>
                <div className="grid grid-cols-4 gap-2">
                  {['30', '100', '300', '500'].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => {
                        haptic.light();
                        onUpdate('rcdRating', formData.rcdRating === `${rating}mA` ? '' : `${rating}mA`);
                      }}
                      className={cn(
                        chipBase,
                        formData.rcdRating === `${rating}mA` ? chipOn : chipOff
                      )}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </FormField>
            </div>
          )}
        </div>

        {/* Row 2: Type */}
        {showRCDFields && (
          <FormField label="RCD type" required>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {['AC', 'A', 'A-APR', 'F', 'EV', 'B', 'B+', 'S'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onUpdate('rcdType', formData.rcdType === `Type ${type}` ? '' : `Type ${type}`);
                  }}
                  className={cn(
                    chipBase,
                    'px-1 text-[11px]',
                    formData.rcdType === `Type ${type}` ? chipOn : chipOff
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </FormField>
        )}

        {/* Row 3: Delay + Measured */}
        {showRCDFields && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <FormField label="Time delay (ms)">
              <FormSelectSheet
                value={formData.rcdTimeDelay || ''}
                onValueChange={(value) => {
                  haptic.light();
                  onUpdate('rcdTimeDelay', value);
                }}
                label="RCD time delay"
                placeholder="Select"
                className={sheetTriggerCn}
                options={[
                  { value: '0', label: '0ms (Instantaneous)' },
                  { value: '40', label: '40ms' },
                  { value: '150', label: '150ms' },
                  { value: '200', label: '200ms' },
                  { value: '300', label: '300ms' },
                  { value: '500', label: '500ms' },
                ]}
              />
            </FormField>
            <FormField label="Measured (ms)">
              <Input
                type="text"
                inputMode="numeric"
                value={formData.rcdMeasuredTime || ''}
                onChange={(e) => onUpdate('rcdMeasuredTime', e.target.value)}
                placeholder="18"
                className={inputCn}
                {...keypad.field('rcdMeasuredTime')}
              />
            </FormField>
          </div>
        )}

        {/* Row 4: RCD breaking capacity (A4:2026 Section J) */}
        {showRCDFields && (
          <FormField label="RCD breaking capacity (kA)">
            <Input
              type="number"
              min="0"
              step="0.1"
              value={formData.rcdBreakingCapacity || ''}
              onChange={(e) => onUpdate('rcdBreakingCapacity', e.target.value)}
              placeholder="e.g., 6"
              className={inputCn}
              inputMode="decimal"
            />
          </FormField>
        )}

        {formData.rcdMainSwitch === 'no' && (
          <p className="text-[11px] text-elec-yellow">
            Consider circuit-level RCD protection for BS 7671 compliance
          </p>
        )}
      </div>

      {/* Scroll room so the last reading can rise clear of the keypad */}
      {keypad.spacer}

      {/* Reading keypad — coarse-pointer devices only */}
      {keypad.element}
    </div>
  );
};

// Memoized component - only re-renders when SUPPLY_SECTION_FIELDS change
const SupplyCharacteristicsSection = React.memo(
  SupplyCharacteristicsSectionInner,
  (prevProps, nextProps) => {
    // Compare only the fields this section cares about
    for (const field of SUPPLY_SECTION_FIELDS) {
      if (prevProps.formData[field] !== nextProps.formData[field]) {
        return false; // Re-render needed
      }
    }
    return prevProps.onUpdate === nextProps.onUpdate;
  }
);

SupplyCharacteristicsSection.displayName = 'SupplyCharacteristicsSection';

export default SupplyCharacteristicsSection;

import React, { useMemo, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import FormSelectSheet from '@/components/ui/form-select-sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, Info, Zap, Building2, Plug, Shield, Globe, Check } from 'lucide-react';
import { useEICRSmartForm } from '@/hooks/inspection/useEICRSmartForm';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';
import {
  FieldLimitationBadge,
  FieldNotesInput,
  isFieldMarker,
} from '@/components/field-limitations';

// Fields managed by this section (for memoization comparison)
const SUPPLY_SECTION_FIELDS = [
  'dnoName',
  'mpan',
  'cutoutLocation',
  'serviceEntry',
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
  'mainProtectiveDevice',
  'mainProtectiveDeviceCustom',
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
  'dnoNameNotes',
  'mpanNotes',
  'cutoutLocationNotes',
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

const SectionTitle = ({ title }: { icon?: any; title: string; color?: string; isMobile?: boolean }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
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
    <div className="flex items-center justify-between gap-2 mb-1.5">
      <Label className="text-white text-xs">
        {label}
        {required && ' *'}
      </Label>
      {trailing}
    </div>
    {children}
    {hint && <span className="text-xs text-white block mt-1">{hint}</span>}
  </div>
);

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
  const isMobile = useIsMobile();
  const haptic = useHaptic();
  const { getWarningsForField, suggestions } = useEICRSmartForm(formData, onUpdate);
  const ipfSuggestion = suggestions.find((s) => s.field === 'prospectiveFaultCurrent');

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

  // Auto-set earthing arrangement when PME is set to Yes
  const handleSupplyPMEChange = (value: string) => {
    haptic.light();
    // Toggle off if already selected
    if (formData.supplyPME === value) {
      onUpdate('supplyPME', '');
      return;
    }
    onUpdate('supplyPME', value);
    if (value === 'yes' && !isTNCSSsystem) {
      onUpdate('earthingArrangement', 'TN-C-S');
    }
  };

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
    // Switches / Isolators
    { value: 'Switch Disconnector', label: 'Switch Disconnector', group: 'Switches' },
    { value: 'Isolator', label: 'Isolator', group: 'Switches' },
    // RCDs
    { value: 'RCD Main Switch', label: 'RCD Main Switch', group: 'RCDs' },
    { value: 'RCBO', label: 'RCBO', group: 'RCDs' },
  ];

  const knownDeviceValues = mainProtectiveDeviceOptions.map((d) => d.value);

  // Smart rating options based on selected device type
  const deviceRatings: Record<string, string[]> = {
    'BS 1361 Fuse': ['45', '60', '80', '100'],
    'BS 88 HRC Fuse': ['2', '4', '6', '10', '16', '20', '25', '32', '40', '50', '63', '80', '100', '125', '160', '200', '250', '315', '400', '500', '630', '800', '1000', '1250'],
    'BS 3036 Rewireable Fuse': ['5', '15', '20', '30', '45', '60'],
    'MCB Type B': ['6', '10', '16', '20', '25', '32', '40', '50', '63', '80', '100'],
    'MCB Type C': ['6', '10', '16', '20', '25', '32', '40', '50', '63', '80', '100'],
    'MCB Type D': ['6', '10', '16', '20', '25', '32', '40', '50', '63', '80', '100'],
    MCCB: [
      '16',
      '20',
      '25',
      '32',
      '40',
      '50',
      '63',
      '80',
      '100',
      '125',
      '160',
      '200',
      '250',
      '315',
      '400',
      '500',
      '630',
    ],
    'Switch Disconnector': ['32', '40', '63', '80', '100', '125', '160', '200'],
    Isolator: ['32', '40', '63', '80', '100', '125', '160'],
    'RCD Main Switch': ['25', '40', '63', '80', '100'],
    RCBO: ['6', '10', '16', '20', '25', '32', '40', '50', '63'],
  };

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

  const currentRatings = deviceRatings[formData.mainProtectiveDevice] || [];
  const currentBreakingCapacities = deviceBreakingCapacity[formData.mainProtectiveDevice] || [];

  // Check if custom input should be shown
  const showCustomProtectiveDevice =
    formData.mainProtectiveDeviceCustom === 'true' ||
    (formData.mainProtectiveDevice && !knownDeviceValues.includes(formData.mainProtectiveDevice));

  // Common DNO options (including Northern Ireland)
  const dnoOptions = [
    'UK Power Networks',
    'Western Power Distribution',
    'Scottish Power Energy Networks',
    'Northern Powergrid',
    'Electricity North West',
    'SSE Networks (SSEN)',
    'National Grid Electricity Distribution',
    'NIE Networks (Northern Ireland)',
  ];

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
    <div className={cn('space-y-6', '')}>
      {/* Supply Authority Section */}
      <div>
        <SectionTitle icon={Building2} title="Supply Authority" color="blue" isMobile={isMobile} />
        <div className="space-y-3 py-3">
          {/* Row 1: DNO + MPAN */}
          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField
              label="DNO"
              trailing={
                <FieldLimitationBadge
                  compact
                  value={formData.dnoName || ''}
                  markers={['LIM']}
                  onChange={(v) => onUpdate('dnoName', v)}
                />
              }
            >
              {isFieldMarker(formData.dnoName) ? (
                <Input
                  value={formData.dnoName}
                  disabled
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] opacity-60"
                />
              ) : (
                <FormSelectSheet
                  value={formData.dnoName || ''}
                  onValueChange={(value) => onUpdate('dnoName', value)}
                  label="Distribution Network Operator"
                  placeholder="Select DNO"
                  options={dnoOptions.map((dno) => ({ value: dno, label: dno }))}
                  allowCustom
                  customLabel="Other DNO"
                />
              )}
              <FieldNotesInput
                parentValue={formData.dnoName || ''}
                value={formData.dnoNameNotes || ''}
                onChange={(v) => onUpdate('dnoNameNotes', v)}
                placeholder="Reason (e.g. not displayed on cutout)"
              />
            </FormField>
            <FormField
              label="MPAN"
              trailing={
                <FieldLimitationBadge
                  compact
                  value={formData.mpan || ''}
                  markers={['LIM', 'N/A']}
                  onChange={(v) => onUpdate('mpan', v)}
                />
              }
            >
              <Input
                value={formData.mpan || ''}
                onChange={(e) => onUpdate('mpan', e.target.value)}
                placeholder="12 345 678 901 234"
                disabled={isFieldMarker(formData.mpan)}
                className={cn(
                  'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]',
                  isFieldMarker(formData.mpan) && 'opacity-60'
                )}
              />
              <FieldNotesInput
                parentValue={formData.mpan || ''}
                value={formData.mpanNotes || ''}
                onChange={(v) => onUpdate('mpanNotes', v)}
                placeholder="Reason (e.g. sub-distribution, no MPAN)"
              />
            </FormField>
          </div>

          {/* Row 2: Cutout + Service Entry */}
          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField
              label="Cutout Location"
              trailing={
                <FieldLimitationBadge
                  compact
                  value={formData.cutoutLocation || ''}
                  markers={['LIM']}
                  onChange={(v) => onUpdate('cutoutLocation', v)}
                />
              }
            >
              <Input
                value={formData.cutoutLocation || ''}
                onChange={(e) => onUpdate('cutoutLocation', e.target.value)}
                placeholder="Under stairs"
                disabled={isFieldMarker(formData.cutoutLocation)}
                className={cn(
                  'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]',
                  isFieldMarker(formData.cutoutLocation) && 'opacity-60'
                )}
              />
              <FieldNotesInput
                parentValue={formData.cutoutLocation || ''}
                value={formData.cutoutLocationNotes || ''}
                onChange={(v) => onUpdate('cutoutLocationNotes', v)}
                placeholder="Reason (e.g. locked meter room)"
              />
            </FormField>
            <FormField
              label="Service Entry"
              trailing={
                <FieldLimitationBadge
                  compact
                  value={formData.serviceEntry || ''}
                  markers={['N/A']}
                  onChange={(v) => onUpdate('serviceEntry', v)}
                />
              }
            >
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { value: 'overhead', label: 'Over' },
                  { value: 'underground', label: 'Under' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      haptic.light();
                      onUpdate('serviceEntry', formData.serviceEntry === option.value ? '' : option.value);
                    }}
                    disabled={isFieldMarker(formData.serviceEntry)}
                    className={cn(
                      'h-11 rounded-lg font-semibold transition-all touch-manipulation text-sm active:scale-[0.98]',
                      formData.serviceEntry === option.value
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] text-white border border-white/[0.08]',
                      isFieldMarker(formData.serviceEntry) && 'opacity-40 cursor-not-allowed'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </FormField>
          </div>
        </div>
      </div>

      {/* Supply Details Section */}
      <div>
        <SectionTitle icon={Plug} title="Supply Details" color="yellow" isMobile={isMobile} />
        <div className="space-y-3 py-3">
          {/* Row 1: Phases + Voltage */}
          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField label="Phases *">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: '1', label: 'Single' },
                  { value: '2', label: 'Two' },
                  { value: '3', label: 'Three' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handlePhasesChange(option.value)}
                    className={cn(
                      'h-11 rounded-lg font-semibold transition-all touch-manipulation text-sm active:scale-[0.98]',
                      formData.phases === option.value
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] text-white border border-white/[0.08]'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </FormField>
            <FormField label="Voltage *">
              <div className="grid grid-cols-3 gap-1.5">
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
                      'h-11 rounded-lg font-semibold transition-all touch-manipulation text-[11px] active:scale-[0.98]',
                      formData.supplyVoltage === option.value
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] text-white border border-white/[0.08]'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </FormField>
          </div>

          {/* Row 2: AC/DC + Wires + Hz + PME */}
          <div className="grid grid-cols-4 gap-2">
            <FormField label="AC/DC">
              <div className="grid grid-cols-2 gap-1">
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
                      'h-11 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                      (formData.supplyAcDc || 'ac') === option.value
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] text-white border border-white/[0.08]'
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
                label={formData.supplyAcDc === 'dc' ? 'DC Conductor Configuration' : 'Conductor Configuration'}
                placeholder="—"
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
                value={isFieldMarker(formData.supplyFrequency) ? formData.supplyFrequency : (formData.supplyFrequency || '50')}
                onChange={(e) => onUpdate('supplyFrequency', e.target.value)}
                placeholder="50"
                disabled={isFieldMarker(formData.supplyFrequency)}
                className={cn(
                  'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]',
                  isFieldMarker(formData.supplyFrequency) && 'opacity-60'
                )}
              />
              <FieldNotesInput
                parentValue={formData.supplyFrequency || ''}
                value={formData.supplyFrequencyNotes || ''}
                onChange={(v) => onUpdate('supplyFrequencyNotes', v)}
                placeholder="Reason"
              />
            </FormField>
            <FormField label="PME">
              <div className="grid grid-cols-2 gap-1">
                {[
                  { value: 'yes', label: 'Y' },
                  { value: 'no', label: 'N' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSupplyPMEChange(option.value)}
                    className={cn(
                      'h-11 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                      formData.supplyPME === option.value
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] text-white border border-white/[0.08]'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </FormField>
          </div>

          {/* Row 3: Ze + Ipf */}
          <div className="grid grid-cols-2 gap-3 items-end">
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
                <Input
                  value={formData.externalZe}
                  disabled
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] opacity-60"
                />
              ) : (
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.externalZe || ''}
                  onChange={(e) => onUpdate('externalZe', e.target.value)}
                  placeholder="0.35"
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                  inputMode="decimal"
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
              label="Ipf at Origin (kA)"
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
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] opacity-60"
                />
              ) : (
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.prospectiveFaultCurrent || ''}
                  onChange={(e) => onUpdate('prospectiveFaultCurrent', e.target.value)}
                  placeholder={ipfSuggestion ? `~${ipfSuggestion.value}` : '16'}
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                  inputMode="decimal"
                />
              )}
              <FieldNotesInput
                parentValue={formData.prospectiveFaultCurrent || ''}
                value={formData.prospectiveFaultCurrentNotes || ''}
                onChange={(v) => onUpdate('prospectiveFaultCurrentNotes', v)}
                placeholder="Reason (e.g. not measurable from here)"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField label="Polarity">
              <button
                type="button"
                onClick={() => {
                  haptic.light();
                  onUpdate('supplyPolarityConfirmed', formData.supplyPolarityConfirmed === 'true' ? 'false' : 'true');
                }}
                className={cn(
                  'w-full h-11 rounded-lg font-semibold transition-all touch-manipulation text-sm active:scale-[0.98] flex items-center justify-center gap-2',
                  formData.supplyPolarityConfirmed === 'true'
                    ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white'
                )}
              >
                {formData.supplyPolarityConfirmed === 'true' && <Check className="h-3.5 w-3.5" />}
                Confirmed
              </button>
            </FormField>
            {/* A4:2026 — Other sources of supply tick-box */}
            <FormField
              label="Other Sources"
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
                  'w-full h-11 rounded-lg font-semibold transition-all touch-manipulation text-sm active:scale-[0.98] flex items-center justify-center gap-2',
                  formData.otherSourcesOfSupplyPresent === 'true'
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white',
                  formData.otherSourcesOfSupplyPresent === 'N/A' && 'opacity-40'
                )}
              >
                {formData.otherSourcesOfSupplyPresent === 'true' && <Check className="h-3.5 w-3.5" />}
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
            <FormField label="Other Sources — details (continuation sheet)">
              <Input
                value={formData.otherSourcesOfSupply || ''}
                onChange={(e) => onUpdate('otherSourcesOfSupply', e.target.value)}
                placeholder="Solar PV, generator, battery storage..."
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </FormField>
          )}
        </div>
      </div>

      {/* Main Protective Device Section */}
      <div>
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] pb-1 mb-3">
          <div>
            <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
            <h2 className="text-xs font-medium text-white uppercase tracking-wider">Main Protective Device</h2>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                haptic.light();
                if (formData.mainSwitchRating === 'LIM') {
                  onUpdate('mainSwitchRating', '');
                } else {
                  onUpdate('mainSwitchRating', 'LIM');
                  onUpdate('mainProtectiveDevice', '');
                  onUpdate('mainProtectiveDeviceCustom', 'false');
                  onUpdate('breakingCapacity', '');
                  onUpdate('fuseDeviceRating', '');
                  onUpdate('mainSwitchPoles', '');
                  onUpdate('mainSwitchVoltageRating', '');
                }
              }}
              className={cn(
                'h-8 px-3 rounded-lg text-[10px] font-semibold touch-manipulation transition-colors active:scale-[0.98]',
                formData.mainSwitchRating === 'LIM'
                  ? 'bg-orange-500/20 border border-orange-500/40 text-orange-400'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              LIM
            </button>
            {/* ELE-855 — N/A when no main switch exists */}
            <button
              type="button"
              onClick={() => {
                haptic.light();
                if (formData.mainSwitchRating === 'N/A') {
                  onUpdate('mainSwitchRating', '');
                } else {
                  onUpdate('mainSwitchRating', 'N/A');
                  onUpdate('mainProtectiveDevice', 'N/A');
                  onUpdate('mainProtectiveDeviceCustom', 'false');
                  onUpdate('breakingCapacity', 'N/A');
                  onUpdate('fuseDeviceRating', 'N/A');
                  onUpdate('mainSwitchPoles', 'N/A');
                  onUpdate('mainSwitchVoltageRating', 'N/A');
                }
              }}
              className={cn(
                'h-8 px-3 rounded-lg text-[10px] font-semibold touch-manipulation transition-colors active:scale-[0.98]',
                formData.mainSwitchRating === 'N/A'
                  ? 'bg-zinc-500/20 border border-zinc-500/40 text-zinc-300'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              N/A
            </button>
          </div>
        </div>
        <div className="space-y-3 py-3">
          <div className="grid grid-cols-2 gap-3 items-end">
          <FormField label="Device *">
            <FormSelectSheet
              value={showCustomProtectiveDevice ? 'other' : formData.mainProtectiveDevice || ''}
              onValueChange={handleMainProtectiveDeviceChange}
              disabled={formData.mainSwitchRating === 'LIM'}
              label="Main Protective Device"
              placeholder="Select device"
              allowCustom
              customLabel="Other (specify)"
              options={mainProtectiveDeviceOptions}
              className={cn(formData.mainSwitchRating === 'LIM' && 'opacity-40')}
            />
          </FormField>
          <FormField label="Rating (A)">
              {formData.mainSwitchRating === 'LIM' ? (
                <Input
                  value="LIM"
                  disabled
                  className="h-11 text-base touch-manipulation opacity-40"
                />
              ) : currentRatings.length > 0 ? (
                <FormSelectSheet
                  value={formData.mainSwitchRating || ''}
                  onValueChange={(value) => {
                    haptic.light();
                    if (value === '__custom__') { onUpdate('mainSwitchRating', '__custom__'); }
                    else { onUpdate('mainSwitchRating', value); }
                  }}
                  label="Rating (A)"
                  placeholder="Select rating"
                  allowCustom
                  customLabel="Other (specify)"
                  options={currentRatings.map((r) => ({ value: r, label: `${r}A` }))}
                />
              ) : (
                <Input
                  value={formData.mainSwitchRating || ''}
                  onChange={(e) => onUpdate('mainSwitchRating', e.target.value)}
                  placeholder="e.g., 100"
                  type="number"
                  min="0"
                  className="h-11 text-base touch-manipulation"
                />
              )}
            </FormField>
          </div>

          {/* Custom rating input when "Other (specify)" selected */}
          {formData.mainSwitchRating === '__custom__' && (
            <FormField label="Custom Rating (A)">
              <Input
                value={formData.fuseDeviceRating || ''}
                onChange={(e) => onUpdate('fuseDeviceRating', e.target.value)}
                placeholder="e.g. 800"
                type="number"
                min="0"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
          )}

          {/* BS 88 Fuse sub-type (gG, gM, aM, Type 2/3/4) */}
          {formData.mainProtectiveDevice === 'BS 88 HRC Fuse' && (
            <FormField label="Fuse Type">
              <FormSelectSheet
                value={formData.fuseSubType || ''}
                onValueChange={(value) => {
                  haptic.light();
                  onUpdate('fuseSubType', value);
                }}
                label="Fuse Type"
                placeholder="Select fuse type"
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
            <FormField label="Custom Device">
              <Input
                value={formData.mainProtectiveDevice || ''}
                onChange={(e) => onUpdate('mainProtectiveDevice', e.target.value)}
                placeholder="e.g. 125A BS 88 Fuse"
                disabled={formData.mainSwitchRating === 'LIM'}
                className={cn('h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]', formData.mainSwitchRating === 'LIM' && 'opacity-40')}
              />
            </FormField>
          )}

          <div className="grid grid-cols-4 gap-2">
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
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] opacity-60"
                />
              ) : currentBreakingCapacities.length > 0 ? (
                <FormSelectSheet
                  value={formData.breakingCapacity || ''}
                  onValueChange={(value) => {
                    haptic.light();
                    if (value === '__custom__') { onUpdate('breakingCapacity', '__custom__'); }
                    else { onUpdate('breakingCapacity', value); }
                  }}
                  disabled={formData.mainSwitchRating === 'LIM'}
                  label="Breaking Capacity (kA)"
                  placeholder="Select kA"
                  allowCustom
                  customLabel="Other (specify)"
                  options={currentBreakingCapacities.map((kA) => ({ value: kA, label: `${kA} kA` }))}
                  className={cn(formData.mainSwitchRating === 'LIM' && 'opacity-40')}
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
                  disabled={formData.mainSwitchRating === 'LIM'}
                  className={cn('h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]', formData.mainSwitchRating === 'LIM' && 'opacity-40')}
                />
              )}
            </FormField>
            <FormField
              label="Poles"
              trailing={
                <FieldLimitationBadge
                  compact
                  value={formData.mainSwitchPoles || ''}
                  markers={['N/A']}
                  onChange={(v) => onUpdate('mainSwitchPoles', v)}
                />
              }
            >
              {isFieldMarker(formData.mainSwitchPoles) ? (
                <Input value={formData.mainSwitchPoles} disabled className="h-11 bg-white/[0.06] border-white/[0.08] opacity-60" />
              ) : (
                <FormSelectSheet
                  value={formData.mainSwitchPoles || ''}
                  onValueChange={(value) => {
                    haptic.light();
                    onUpdate('mainSwitchPoles', value);
                  }}
                  disabled={formData.mainSwitchRating === 'LIM'}
                  label="Poles"
                  placeholder="—"
                  options={[
                    { value: '1', label: '1P' },
                    { value: '2', label: '2P' },
                    { value: '3', label: '3P' },
                    { value: '4', label: '4P' },
                  ]}
                  className={cn(formData.mainSwitchRating === 'LIM' && 'opacity-40')}
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
                disabled={formData.mainSwitchRating === 'LIM' || isFieldMarker(formData.fuseDeviceRating)}
                className={cn('h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]', (formData.mainSwitchRating === 'LIM' || isFieldMarker(formData.fuseDeviceRating)) && 'opacity-40')}
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
                disabled={formData.mainSwitchRating === 'LIM' || isFieldMarker(formData.mainSwitchVoltageRating)}
                className={cn('h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]', (formData.mainSwitchRating === 'LIM' || isFieldMarker(formData.mainSwitchVoltageRating)) && 'opacity-40')}
                inputMode="numeric"
              />
            </FormField>
          </div>

          {/* Custom kA input when "Other (specify)" selected */}
          {formData.breakingCapacity === '__custom__' && (
            <FormField label="Custom Breaking Capacity (kA)">
              <Input
                value={formData.breakingCapacityCustom || ''}
                onChange={(e) => onUpdate('breakingCapacityCustom', e.target.value)}
                placeholder="e.g. 100"
                type="number"
                min="0"
                step="0.1"
                className="h-11 text-base touch-manipulation"
              />
            </FormField>
          )}
        </div>
      </div>

      {/* Earthing System Section */}
      <div>
        <SectionTitle title="Earthing System" />
        <div className="space-y-3 py-3">
          <FormField
            label="Earthing Arrangement"
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
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] opacity-60"
              />
            ) : (
              <div className="grid grid-cols-5 gap-2">
                {earthingOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      haptic.light();
                      onUpdate('earthingArrangement', formData.earthingArrangement === option.value ? '' : option.value);
                    }}
                    className={cn(
                      'h-11 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                      formData.earthingArrangement === option.value
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] text-white border border-white/[0.08]'
                    )}
                  >
                    {option.value}
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
            label="Electrode Type"
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
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] opacity-60"
              />
            ) : (
            <FormSelectSheet
              value={formData.earthElectrodeType || ''}
              onValueChange={(value) => {
                haptic.light();
                onUpdate('earthElectrodeType', value);
              }}
              label="Earth Electrode Type"
              placeholder="Select"
              allowCustom
              customLabel="Other"
              options={[
                { value: 'rod', label: 'Rod' },
                { value: 'tape', label: 'Tape' },
                { value: 'plate', label: 'Plate' },
                { value: 'structural', label: 'Steel' },
                { value: 'water-pipe', label: 'Water Pipe' },
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
      </div>

      {/* RCD Protection Section */}
      <div>
        <SectionTitle title="RCD Protection" />
        <div className="space-y-3 py-3">
          {/* Row 1: RCD Switch + Rating */}
          <div className="grid grid-cols-3 gap-2">
            <FormField label="RCD Main">
              <div className="grid grid-cols-2 gap-1.5">
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
                      if (newValue !== 'yes') onUpdate('rcdRating', '');
                    }}
                    className={cn(
                      'h-11 rounded-lg font-semibold transition-all touch-manipulation text-sm active:scale-[0.98]',
                      formData.rcdMainSwitch === option.value
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] text-white border border-white/[0.08]'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </FormField>
            {showRCDFields && (
              <div className="col-span-2">
                <FormField label="Rating (mA) *">
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
                          'h-11 rounded-lg font-semibold transition-all touch-manipulation text-sm active:scale-[0.98]',
                          formData.rcdRating === `${rating}mA`
                            ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                            : 'bg-white/[0.05] text-white border border-white/[0.08]'
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
            <FormField label="RCD Type *">
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
                        'h-11 rounded-lg font-semibold transition-all touch-manipulation text-[10px] active:scale-[0.98]',
                        formData.rcdType === `Type ${type}`
                          ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                          : 'bg-white/[0.05] text-white border border-white/[0.08]'
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
            <div className="grid grid-cols-2 gap-3 items-end">
              <FormField label="Time Delay (ms)">
                <FormSelectSheet
                  value={formData.rcdTimeDelay || ''}
                  onValueChange={(value) => {
                    haptic.light();
                    onUpdate('rcdTimeDelay', value);
                  }}
                  label="RCD Time Delay"
                  placeholder="Select"
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
                  type="number"
                  min="0"
                  step="1"
                  value={formData.rcdMeasuredTime || ''}
                  onChange={(e) => onUpdate('rcdMeasuredTime', e.target.value)}
                  placeholder="18"
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                  inputMode="numeric"
                />
              </FormField>
            </div>
          )}

          {/* Row 4: RCD Breaking Capacity (A4:2026 Section J) */}
          {showRCDFields && (
            <FormField label="RCD Breaking Capacity (kA)">
              <Input
                type="number"
                min="0"
                step="0.1"
                value={formData.rcdBreakingCapacity || ''}
                onChange={(e) => onUpdate('rcdBreakingCapacity', e.target.value)}
                placeholder="e.g., 6"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                inputMode="decimal"
              />
            </FormField>
          )}

          {formData.rcdMainSwitch === 'no' && (
            <p className="text-[11px] text-amber-400/80">
              Consider circuit-level RCD protection for BS 7671 compliance
            </p>
          )}
        </div>
      </div>
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

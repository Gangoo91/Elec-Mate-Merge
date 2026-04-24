import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import FormSelectSheet from '@/components/ui/form-select-sheet';
import { Zap, Info, Link2, Cable, CircuitBoard, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';
import { useEICRSmartForm } from '@/hooks/inspection/useEICRSmartForm';
import {
  FieldLimitationBadge,
  FieldNotesInput,
  isFieldMarker,
} from '@/components/field-limitations';

// Fields managed by this section (for memoization comparison)
const EARTHING_SECTION_FIELDS = [
  'earthElectrodeType',
  'earthElectrodeResistance',
  'earthElectrodeLocation',
  'maximumDemand',
  'maximumDemandUnit',
  'meansOfEarthingDistributor',
  'meansOfEarthingElectrode',
  'mainEarthingConductorType',
  'mainEarthingConductorSize',
  'mainEarthingConductorSizeCustom',
  'earthingConductorContinuityVerified',
  'mainBondingConductorType',
  'mainBondingSize',
  'mainBondingSizeCustom',
  'bondingCompliance',
  'bondingConductorContinuityVerified',
  'mainBondingLocations',
  'supplementaryBondingSize',
  'supplementaryBondingSizeCustom',
  'equipotentialBonding',
  // ELE-849 — limitation reason notes
  'meansOfEarthingNotes',
  'mainEarthingConductorTypeNotes',
  'mainEarthingConductorSizeNotes',
  'earthingConductorContinuityVerifiedNotes',
  'mainBondingConductorTypeNotes',
  'mainBondingSizeNotes',
  'bondingConductorContinuityVerifiedNotes',
  'supplementaryBondingSizeNotes',
  'bondingComplianceNotes',
] as const;

interface EarthingBondingSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  isOpen?: boolean;
  onToggle?: () => void;
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
        {label}{required && ' *'}
      </Label>
      {trailing}
    </div>
    {children}
    {hint && <span className="text-[10px] text-white block mt-1">{hint}</span>}
  </div>
);

/**
 * EarthingBondingSection - Best-in-class mobile form for earthing & bonding details
 * Edge-to-edge design with large touch targets and native app feel
 *
 * Performance optimised with React.memo for selective re-rendering
 */
const EarthingBondingSectionInner = ({ formData, onUpdate }: EarthingBondingSectionProps) => {
  const { getWarningsForField } = useEICRSmartForm(formData);
  const isMobile = useIsMobile();
  const haptic = useHaptic();

  const showEarthElectrodeResistance =
    formData.earthElectrodeType &&
    formData.earthElectrodeType !== 'n/a' &&
    formData.earthElectrodeType !== '';

  const showCustomMainBonding = formData.mainBondingSize === 'custom';
  const showCustomSupplementaryBonding = formData.supplementaryBondingSize === 'custom';

  // Parse existing main bonding locations into checkboxes
  const parseMainBondingLocations = (value: string = ''): Set<string> => {
    const normalized = value.toLowerCase().trim();
    const locations = new Set<string>();

    if (normalized.includes('water')) locations.add('water');
    if (normalized.includes('gas')) locations.add('gas');
    if (normalized.includes('oil')) locations.add('oil');
    if (normalized.includes('structural steel') || normalized.includes('steel'))
      locations.add('structural-steel');
    if (normalized.includes('lightning')) locations.add('lightning-protection');
    if (normalized.includes('telecom')) locations.add('telecoms');

    return locations;
  };

  const [bondingLocations, setBondingLocations] = useState<Set<string>>(() =>
    parseMainBondingLocations(formData.mainBondingLocations)
  );
  const [otherBonding, setOtherBonding] = useState<string>(() => {
    const value = formData.mainBondingLocations || '';
    const knownServices = ['water', 'gas', 'oil', 'structural steel', 'steel', 'lightning', 'telecom'];
    const parts = value
      .split(',')
      .map((s: string) => s.trim())
      .filter((s: string) => s);
    const otherParts = parts.filter(
      (part: string) => !knownServices.some((service) => part.toLowerCase().includes(service))
    );
    return otherParts.join(', ');
  });

  // Sync state when formData changes externally
  useEffect(() => {
    setBondingLocations(parseMainBondingLocations(formData.mainBondingLocations));
  }, [formData.mainBondingLocations]);

  const handleBondingLocationChange = (service: string, checked: boolean) => {
    haptic.light();
    const updatedLocations = new Set(bondingLocations);

    if (checked) {
      updatedLocations.add(service);
    } else {
      updatedLocations.delete(service);
    }

    setBondingLocations(updatedLocations);
    updateMainBondingLocations(updatedLocations, otherBonding);
  };

  const handleOtherBondingChange = (value: string) => {
    setOtherBonding(value);
    updateMainBondingLocations(bondingLocations, value);
  };

  const updateMainBondingLocations = (locations: Set<string>, other: string) => {
    const serviceLabels: Record<string, string> = {
      water: 'Water',
      gas: 'Gas',
      oil: 'Oil',
      'structural-steel': 'Structural Steel',
      'lightning-protection': 'Lightning Protection',
      telecoms: 'Telecommunications',
    };

    const parts = Array.from(locations).map((s) => serviceLabels[s] || s);
    if (other.trim()) {
      parts.push(other.trim());
    }

    onUpdate('mainBondingLocations', parts.join(', '));
  };

  // Conductor size options
  const conductorSizes = ['none', '6', '10', '16', '25', '35', 'custom'];
  const supplementarySizes = ['2.5', '4', '6', '10', 'not-required', 'custom'];

  // Bonding services
  const bondingServices = [
    { id: 'water', label: 'Water' },
    { id: 'gas', label: 'Gas' },
    { id: 'oil', label: 'Oil' },
    { id: 'structural-steel', label: 'Structural Steel' },
    { id: 'lightning-protection', label: 'Lightning' },
    { id: 'telecoms', label: 'Telecoms' },
  ];

  return (
    <div className={cn('space-y-6', '')}>
      {/* Earth Electrode Section */}
      {showEarthElectrodeResistance && (
        <div>
          <SectionTitle icon={Zap} title="Earth Electrode" color="yellow" isMobile={isMobile} />
          <div className={cn('space-y-4 py-4', '')}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Electrode Resistance/Impedance, RA/Ze (Ω)"
                required
                hint="Typical values: TT systems <200Ω"
              >
                <Input
                  value={formData.earthElectrodeResistance || ''}
                  onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)}
                  placeholder="e.g., 21"
                  type="number"
                  step="0.01"
                  min="0"
                  className="h-11 text-base touch-manipulation"
                />
              </FormField>
              <FormField
                label="Electrode Location"
                hint="Physical location of the earth electrode"
              >
                <Input
                  value={formData.earthElectrodeLocation || ''}
                  onChange={(e) => onUpdate('earthElectrodeLocation', e.target.value)}
                  placeholder="e.g., Front garden, near meter"
                  className="h-11 text-base touch-manipulation"
                />
              </FormField>
            </div>
          </div>
        </div>
      )}

      {/* Maximum Demand (Section J — BS 7671:2018+A4:2026) */}
      <div>
        <SectionTitle title="Maximum Demand" />
        <div className="py-3">
          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField label="Maximum Demand (load)">
              <Input
                type="number"
                min="0"
                step="0.1"
                value={formData.maximumDemand || ''}
                onChange={(e) => onUpdate('maximumDemand', e.target.value)}
                placeholder="e.g., 100"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
                inputMode="decimal"
              />
            </FormField>
            <FormField label="Unit">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'kva', label: 'kVA' },
                  { value: 'amps', label: 'A' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      haptic.light();
                      onUpdate('maximumDemandUnit', opt.value);
                    }}
                    className={cn(
                      'h-11 rounded-lg font-semibold transition-all touch-manipulation text-sm active:scale-[0.98]',
                      (formData.maximumDemandUnit || 'amps') === opt.value
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] text-white border border-white/[0.08]'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </FormField>
          </div>
        </div>
      </div>

      {/* Means of Earthing Section */}
      <div>
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] pb-1 mb-3">
          <div>
            <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
            <h2 className="text-xs font-medium text-white uppercase tracking-wider">Means of Earthing</h2>
          </div>
          <FieldLimitationBadge
            compact
            value={formData.meansOfEarthingDistributor === 'LIM' ? 'LIM' : ''}
            markers={['LIM']}
            onChange={(v) => {
              if (v === 'LIM') {
                onUpdate('meansOfEarthingDistributor', 'LIM');
                onUpdate('meansOfEarthingElectrode', 'false');
              } else {
                onUpdate('meansOfEarthingDistributor', 'false');
              }
            }}
          />
        </div>
        <div className="py-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={formData.meansOfEarthingDistributor === 'LIM'}
              onClick={() => {
                haptic.light();
                onUpdate('meansOfEarthingDistributor', formData.meansOfEarthingDistributor === 'true' ? 'false' : 'true');
              }}
              className={cn(
                'h-11 rounded-lg font-semibold transition-all touch-manipulation text-sm active:scale-[0.98] flex items-center justify-center gap-2',
                formData.meansOfEarthingDistributor === 'true'
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white',
                formData.meansOfEarthingDistributor === 'LIM' && 'opacity-40'
              )}
            >
              {formData.meansOfEarthingDistributor === 'true' && <Check className="h-3.5 w-3.5" />}
              Distributor
            </button>
            <button
              type="button"
              disabled={formData.meansOfEarthingDistributor === 'LIM'}
              onClick={() => {
                haptic.light();
                onUpdate('meansOfEarthingElectrode', formData.meansOfEarthingElectrode === 'true' ? 'false' : 'true');
              }}
              className={cn(
                'h-11 rounded-lg font-semibold transition-all touch-manipulation text-sm active:scale-[0.98] flex items-center justify-center gap-2',
                formData.meansOfEarthingElectrode === 'true'
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white',
                formData.meansOfEarthingDistributor === 'LIM' && 'opacity-40'
              )}
            >
              {formData.meansOfEarthingElectrode === 'true' && <Check className="h-3.5 w-3.5" />}
              Electrode
            </button>
          </div>
          <FieldNotesInput
            parentValue={formData.meansOfEarthingDistributor === 'LIM' ? 'LIM' : ''}
            value={formData.meansOfEarthingNotes || ''}
            onChange={(v) => onUpdate('meansOfEarthingNotes', v)}
            placeholder="Reason (e.g. meter room locked)"
          />
        </div>
      </div>

      {/* Main Earthing Conductor Section */}
      <div>
        <SectionTitle title="Main Earthing Conductor" />
        <div className="space-y-3 py-3">
          {/* Row 1: Material + Size */}
          <div className="grid grid-cols-3 gap-2">
            <FormField
              label="Material"
              required
              trailing={
                <FieldLimitationBadge
                  compact
                  value={formData.mainEarthingConductorType || ''}
                  markers={['LIM']}
                  onChange={(v) => onUpdate('mainEarthingConductorType', v)}
                />
              }
            >
              {isFieldMarker(formData.mainEarthingConductorType) ? (
                <Input
                  value={formData.mainEarthingConductorType}
                  disabled
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] opacity-60"
                />
              ) : (
                <div className="grid grid-cols-2 gap-1">
                  {[
                    { value: 'Cu', label: 'Cu' },
                    { value: 'Al', label: 'Al' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        haptic.light();
                        onUpdate('mainEarthingConductorType', formData.mainEarthingConductorType === option.value ? '' : option.value);
                      }}
                      className={cn(
                        'h-11 rounded-lg font-semibold transition-all touch-manipulation text-sm active:scale-[0.98]',
                        formData.mainEarthingConductorType === option.value
                          ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                          : 'bg-white/[0.05] text-white border border-white/[0.08]'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
              <FieldNotesInput
                parentValue={formData.mainEarthingConductorType || ''}
                value={formData.mainEarthingConductorTypeNotes || ''}
                onChange={(v) => onUpdate('mainEarthingConductorTypeNotes', v)}
                placeholder="Reason"
              />
            </FormField>
            <FormField
              label="Size"
              required
              trailing={
                <FieldLimitationBadge
                  compact
                  value={formData.mainEarthingConductorSize || ''}
                  markers={['LIM']}
                  onChange={(v) => onUpdate('mainEarthingConductorSize', v)}
                />
              }
            >
              {isFieldMarker(formData.mainEarthingConductorSize) ? (
                <Input
                  value={formData.mainEarthingConductorSize}
                  disabled
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] opacity-60"
                />
              ) : (
                <FormSelectSheet
                  value={formData.mainEarthingConductorSize || ''}
                  onValueChange={(value) => {
                    haptic.light();
                    onUpdate('mainEarthingConductorSize', value);
                  }}
                  placeholder="mm²"
                  label="Earthing Conductor Size"
                  allowCustom
                  customLabel="Custom size"
                  options={conductorSizes
                    .filter((s) => s !== 'custom')
                    .map((size) => ({
                      value: size,
                      label: size === 'none' ? 'None' : `${size}mm²`,
                    }))}
                />
              )}
              <FieldNotesInput
                parentValue={formData.mainEarthingConductorSize || ''}
                value={formData.mainEarthingConductorSizeNotes || ''}
                onChange={(v) => onUpdate('mainEarthingConductorSizeNotes', v)}
                placeholder="Reason"
              />
            </FormField>
            <FormField label="Verified">
              {/* 3-way toggle: Yes / No / N/V */}
              <div className="grid grid-cols-3 gap-1">
                {[
                  { value: 'true', label: 'Yes', activeClass: 'bg-green-500/20 border-green-500/40 text-green-400' },
                  { value: 'false', label: 'No', activeClass: 'bg-zinc-500/20 border-zinc-500/40 text-zinc-300' },
                  { value: 'N/V', label: 'N/V', activeClass: 'bg-slate-500/20 border-slate-500/40 text-slate-300' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      haptic.light();
                      onUpdate('earthingConductorContinuityVerified', formData.earthingConductorContinuityVerified === opt.value ? '' : opt.value);
                    }}
                    className={cn(
                      'h-11 rounded-lg font-semibold transition-all touch-manipulation text-[11px] active:scale-[0.98] border',
                      formData.earthingConductorContinuityVerified === opt.value
                        ? opt.activeClass
                        : 'bg-white/[0.05] border-white/[0.08] text-white'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <FieldNotesInput
                parentValue={formData.earthingConductorContinuityVerified === 'N/V' ? 'N/V' : ''}
                value={formData.earthingConductorContinuityVerifiedNotes || ''}
                onChange={(v) => onUpdate('earthingConductorContinuityVerifiedNotes', v)}
                placeholder="Reason (e.g. conductor concealed)"
              />
            </FormField>
          </div>

          {formData.mainEarthingConductorSize === 'custom' && (
            <FormField label="Custom Size">
              <Input
                value={formData.mainEarthingConductorSizeCustom || ''}
                onChange={(e) => onUpdate('mainEarthingConductorSizeCustom', e.target.value)}
                placeholder="50mm²"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </FormField>
          )}
        </div>
      </div>

      {/* Main Protective Bonding Section */}
      <div>
        <SectionTitle title="Main Protective Bonding" />
        <div className="space-y-3 py-3">
          {/* Row 1: Material + Size */}
          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField
              label="Material"
              required
              trailing={
                <FieldLimitationBadge
                  compact
                  value={formData.mainBondingConductorType || ''}
                  markers={['LIM']}
                  onChange={(v) => onUpdate('mainBondingConductorType', v)}
                />
              }
            >
              {isFieldMarker(formData.mainBondingConductorType) ? (
                <Input
                  value={formData.mainBondingConductorType}
                  disabled
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] opacity-60"
                />
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'Cu', label: 'Copper (Cu)' },
                    { value: 'Al', label: 'Aluminium (Al)' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        haptic.light();
                        onUpdate('mainBondingConductorType', formData.mainBondingConductorType === option.value ? '' : option.value);
                      }}
                      className={cn(
                        'h-11 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                        formData.mainBondingConductorType === option.value
                          ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                          : 'bg-white/[0.05] text-white border border-white/[0.08]'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
              <FieldNotesInput
                parentValue={formData.mainBondingConductorType || ''}
                value={formData.mainBondingConductorTypeNotes || ''}
                onChange={(v) => onUpdate('mainBondingConductorTypeNotes', v)}
                placeholder="Reason"
              />
            </FormField>
            <FormField
              label="Size"
              required
              trailing={
                <FieldLimitationBadge
                  compact
                  value={formData.mainBondingSize || ''}
                  markers={['LIM', 'N/A']}
                  onChange={(v) => onUpdate('mainBondingSize', v)}
                />
              }
            >
              {isFieldMarker(formData.mainBondingSize) ? (
                <Input
                  value={formData.mainBondingSize}
                  disabled
                  className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] opacity-60"
                />
              ) : (
                <FormSelectSheet
                  value={formData.mainBondingSize || ''}
                  onValueChange={(value) => {
                    haptic.light();
                    onUpdate('mainBondingSize', value);
                  }}
                  placeholder="Select size"
                  label="Main Bonding Size"
                  allowCustom
                  customLabel="Custom size"
                  options={conductorSizes
                    .filter((s) => s !== 'custom')
                    .map((size) => ({
                      value: size,
                      label: size === 'none' ? 'None' : `${size}mm²`,
                    }))}
                />
              )}
              <FieldNotesInput
                parentValue={formData.mainBondingSize || ''}
                value={formData.mainBondingSizeNotes || ''}
                onChange={(v) => onUpdate('mainBondingSizeNotes', v)}
                placeholder="Reason (e.g. no bonding services present)"
              />
            </FormField>
          </div>

          {/* Row 2: Compliance (ELE-849 — 4-way with N/V added) */}
          <FormField label="Compliance" required>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: 'satisfactory', label: 'Satisfactory', activeClass: 'bg-green-500/20 border-green-500/40 text-green-400' },
                { value: 'unsatisfactory', label: 'Unsatisfactory', activeClass: 'bg-red-500/20 border-red-500/40 text-red-400' },
                { value: 'N/V', label: 'N/V', activeClass: 'bg-slate-500/20 border-slate-500/40 text-slate-300' },
                { value: 'not-applicable', label: 'N/A', activeClass: 'bg-elec-yellow/20 border-elec-yellow/40 text-elec-yellow' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onUpdate('bondingCompliance', formData.bondingCompliance === option.value ? '' : option.value);
                  }}
                  className={cn(
                    'h-11 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98] border',
                    formData.bondingCompliance === option.value
                      ? option.activeClass
                      : 'bg-white/[0.05] border-white/[0.08] text-white'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <FieldNotesInput
              parentValue={formData.bondingCompliance === 'N/V' ? 'N/V' : ''}
              value={formData.bondingComplianceNotes || ''}
              onChange={(v) => onUpdate('bondingComplianceNotes', v)}
              placeholder="Reason (e.g. bonding not fully inspected)"
            />
          </FormField>

          {/* Smart validation warnings */}
          {[...getWarningsForField('mainBondingSize'), ...getWarningsForField('bondingCompliance')].map((w, i) => (
            <p key={i} className="text-[10px] text-amber-400/80">{w.message}{w.regulation ? ` (${w.regulation})` : ''}</p>
          ))}

          {showCustomMainBonding && (
            <FormField label="Custom Size">
              <Input
                value={formData.mainBondingSizeCustom || ''}
                onChange={(e) => onUpdate('mainBondingSizeCustom', e.target.value)}
                placeholder="35mm²"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </FormField>
          )}

          {/* Row 2: Continuity verified — 3-way toggle (Yes/No/N/V) */}
          <FormField label="Continuity Verified">
            <div className="grid grid-cols-3 gap-1">
              {[
                { value: 'true', label: 'Yes', activeClass: 'bg-green-500/20 border-green-500/40 text-green-400' },
                { value: 'false', label: 'No', activeClass: 'bg-zinc-500/20 border-zinc-500/40 text-zinc-300' },
                { value: 'N/V', label: 'N/V', activeClass: 'bg-slate-500/20 border-slate-500/40 text-slate-300' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onUpdate('bondingConductorContinuityVerified', formData.bondingConductorContinuityVerified === opt.value ? '' : opt.value);
                  }}
                  className={cn(
                    'h-11 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98] border',
                    formData.bondingConductorContinuityVerified === opt.value
                      ? opt.activeClass
                      : 'bg-white/[0.05] border-white/[0.08] text-white'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <FieldNotesInput
              parentValue={formData.bondingConductorContinuityVerified === 'N/V' ? 'N/V' : ''}
              value={formData.bondingConductorContinuityVerifiedNotes || ''}
              onChange={(v) => onUpdate('bondingConductorContinuityVerifiedNotes', v)}
              placeholder="Reason (e.g. conductor not accessible)"
            />
          </FormField>

          {/* Row 3: Bonding Locations — 3x2 grid */}
          <FormField label="Bonding Locations">
            <div className="grid grid-cols-3 gap-2">
              {bondingServices.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleBondingLocationChange(service.id, !bondingLocations.has(service.id))}
                  className={cn(
                    'h-11 rounded-lg font-semibold transition-all touch-manipulation text-xs flex items-center justify-center gap-1.5 active:scale-[0.98]',
                    bondingLocations.has(service.id)
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.05] text-white border border-white/[0.08]'
                  )}
                >
                  {service.label}
                </button>
              ))}
            </div>
          </FormField>

          <FormField label="Other Services">
            <Input
              value={otherBonding}
              onChange={(e) => handleOtherBondingChange(e.target.value)}
              placeholder="Lightning protection, Metal pipework"
              className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
            />
          </FormField>
        </div>
      </div>

      {/* Supplementary Bonding Section */}
      <div>
        <SectionTitle title="Supplementary Bonding" />
        <div className="space-y-3 py-3">
          <FormField
            label="Conductor Size"
            trailing={
              <FieldLimitationBadge
                compact
                value={formData.supplementaryBondingSize || ''}
                markers={['LIM']}
                onChange={(v) => onUpdate('supplementaryBondingSize', v)}
              />
            }
          >
            {isFieldMarker(formData.supplementaryBondingSize) ? (
              <Input
                value={formData.supplementaryBondingSize}
                disabled
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] opacity-60"
              />
            ) : (
              <FormSelectSheet
                value={formData.supplementaryBondingSize || ''}
                onValueChange={(value) => {
                  haptic.light();
                  onUpdate('supplementaryBondingSize', value);
                }}
                placeholder="Select size"
                label="Supplementary Bonding Size"
                allowCustom
                customLabel="Custom size"
                options={supplementarySizes
                  .filter((s) => s !== 'custom')
                  .map((size) => ({
                    value: size,
                    label: size === 'not-required' ? 'Not Required' : `${size}mm²`,
                  }))}
              />
            )}
            <FieldNotesInput
              parentValue={formData.supplementaryBondingSize || ''}
              value={formData.supplementaryBondingSizeNotes || ''}
              onChange={(v) => onUpdate('supplementaryBondingSizeNotes', v)}
              placeholder="Reason"
            />
          </FormField>

          <FormField label="Equipotential Bonding">
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: 'present', label: 'Present & OK' },
                { value: 'present-unsatisfactory', label: 'Unsatisfactory' },
                { value: 'not-present', label: 'Not Present' },
                { value: 'not-required', label: 'Not Required' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onUpdate('equipotentialBonding', formData.equipotentialBonding === option.value ? '' : option.value);
                  }}
                  className={cn(
                    'h-11 rounded-lg font-semibold transition-all touch-manipulation text-[10px] active:scale-[0.98]',
                    formData.equipotentialBonding === option.value
                      ? option.value === 'present'
                        ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                        : option.value === 'present-unsatisfactory' || option.value === 'not-present'
                          ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                          : 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.05] text-white border border-white/[0.08]'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </FormField>

          {showCustomSupplementaryBonding && (
            <FormField label="Custom Size">
              <Input
                value={formData.supplementaryBondingSizeCustom || ''}
                onChange={(e) => onUpdate('supplementaryBondingSizeCustom', e.target.value)}
                placeholder="16mm²"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </FormField>
          )}

          <p className="text-[10px] text-white">
            Supplementary bonding may be required in special locations (Reg 415.2)
          </p>
        </div>
      </div>
    </div>
  );
};

// Memoized component - only re-renders when EARTHING_SECTION_FIELDS change
const EarthingBondingSection = React.memo(EarthingBondingSectionInner, (prevProps, nextProps) => {
  // Compare only the fields this section cares about
  for (const field of EARTHING_SECTION_FIELDS) {
    if (prevProps.formData[field] !== nextProps.formData[field]) {
      return false; // Re-render needed
    }
  }
  return prevProps.onUpdate === nextProps.onUpdate;
});

EarthingBondingSection.displayName = 'EarthingBondingSection';

export default EarthingBondingSection;

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Zap, Info, Link2, Cable, CircuitBoard, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';
import { useEICRSmartForm } from '@/hooks/inspection/useEICRSmartForm';

// Fields managed by this section (for memoization comparison)
const EARTHING_SECTION_FIELDS = [
  'earthElectrodeType',
  'earthElectrodeResistance',
  'earthElectrodeLocation',
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
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">
      {label}{required && ' *'}
    </Label>
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
                label="Earth Electrode Resistance (Ω)"
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

      {/* Means of Earthing Section */}
      <div>
        <SectionTitle title="Means of Earthing" />
        <div className="py-3">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                haptic.light();
                onUpdate('meansOfEarthingDistributor', formData.meansOfEarthingDistributor === 'true' ? 'false' : 'true');
              }}
              className={cn(
                'h-11 rounded-lg font-semibold transition-all touch-manipulation text-sm active:scale-[0.98] flex items-center justify-center gap-2',
                formData.meansOfEarthingDistributor === 'true'
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              {formData.meansOfEarthingDistributor === 'true' && <Check className="h-3.5 w-3.5" />}
              Distributor
            </button>
            <button
              type="button"
              onClick={() => {
                haptic.light();
                onUpdate('meansOfEarthingElectrode', formData.meansOfEarthingElectrode === 'true' ? 'false' : 'true');
              }}
              className={cn(
                'h-11 rounded-lg font-semibold transition-all touch-manipulation text-sm active:scale-[0.98] flex items-center justify-center gap-2',
                formData.meansOfEarthingElectrode === 'true'
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              {formData.meansOfEarthingElectrode === 'true' && <Check className="h-3.5 w-3.5" />}
              Electrode
            </button>
          </div>
        </div>
      </div>

      {/* Main Earthing Conductor Section */}
      <div>
        <SectionTitle title="Main Earthing Conductor" />
        <div className="space-y-3 py-3">
          {/* Row 1: Material + Size */}
          <div className="grid grid-cols-3 gap-2">
            <FormField label="Material *">
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
            </FormField>
            <FormField label="Size *">
              <Select
                value={formData.mainEarthingConductorSize || ''}
                onValueChange={(value) => {
                  haptic.light();
                  onUpdate('mainEarthingConductorSize', value === '__clear__' ? '' : value);
                }}
              >
                <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08]">
                  <SelectValue placeholder="mm²" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__clear__">Clear</SelectItem>
                  {conductorSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size === 'custom' ? 'Custom' : size === 'none' ? 'None' : `${size}mm²`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Verified">
              <button
                type="button"
                onClick={() => {
                  haptic.light();
                  onUpdate('earthingConductorContinuityVerified', formData.earthingConductorContinuityVerified === 'true' ? 'false' : 'true');
                }}
                className={cn(
                  'w-full h-11 rounded-lg font-semibold transition-all touch-manipulation text-sm active:scale-[0.98] flex items-center justify-center gap-1.5',
                  formData.earthingConductorContinuityVerified === 'true'
                    ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white'
                )}
              >
                {formData.earthingConductorContinuityVerified === 'true' && <Check className="h-3.5 w-3.5" />}
                {formData.earthingConductorContinuityVerified === 'true' ? 'Yes' : 'No'}
              </button>
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
            <FormField label="Material *">
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
            </FormField>
            <FormField label="Size *">
              <Select
                value={formData.mainBondingSize || ''}
                onValueChange={(value) => {
                  haptic.light();
                  onUpdate('mainBondingSize', value === '__clear__' ? '' : value);
                }}
              >
                <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08]">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__clear__">Clear</SelectItem>
                  {conductorSizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size === 'custom' ? 'Custom' : size === 'none' ? 'None' : `${size}mm²`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          {/* Row 2: Compliance */}
          <FormField label="Compliance *">
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'satisfactory', label: 'Satisfactory' },
                { value: 'unsatisfactory', label: 'Unsatisfactory' },
                { value: 'not-applicable', label: 'N/A' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onUpdate('bondingCompliance', formData.bondingCompliance === option.value ? '' : option.value);
                  }}
                  className={cn(
                    'h-11 rounded-lg font-semibold transition-all touch-manipulation text-sm active:scale-[0.98]',
                    formData.bondingCompliance === option.value
                      ? option.value === 'satisfactory'
                        ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                        : option.value === 'unsatisfactory'
                          ? 'bg-red-500/20 border border-red-500/40 text-red-400'
                          : 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.05] text-white border border-white/[0.08]'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
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

          {/* Row 2: Continuity verified toggle */}
          <button
            type="button"
            onClick={() => {
              haptic.light();
              onUpdate('bondingConductorContinuityVerified', formData.bondingConductorContinuityVerified === 'true' ? 'false' : 'true');
            }}
            className={cn(
              'w-full h-11 rounded-lg text-sm font-semibold transition-all touch-manipulation active:scale-[0.98] flex items-center justify-center gap-2',
              formData.bondingConductorContinuityVerified === 'true'
                ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                : 'bg-white/[0.05] border border-white/[0.08] text-white'
            )}
          >
            {formData.bondingConductorContinuityVerified === 'true' && <Check className="h-3.5 w-3.5" />}
            Continuity Verified
          </button>

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
          <FormField label="Conductor Size">
            <Select
              value={formData.supplementaryBondingSize || ''}
              onValueChange={(value) => {
                haptic.light();
                onUpdate('supplementaryBondingSize', value === '__clear__' ? '' : value);
              }}
            >
              <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08]">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__clear__">Clear</SelectItem>
                {supplementarySizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size === 'custom' ? 'Custom' : size === 'not-required' ? 'Not Required' : `${size}mm²`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

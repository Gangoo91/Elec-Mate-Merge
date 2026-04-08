import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Check } from 'lucide-react';
import InputWithValidation from './InputWithValidation';
import { cn } from '@/lib/utils';

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const FormField = ({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>
    {children}
    {hint && <span className="text-[10px] text-white block mt-1">{hint}</span>}
  </div>
);

interface EarthingAndBondingSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
}

const EarthingAndBondingSection: React.FC<EarthingAndBondingSectionProps> = ({
  formData,
  onUpdate,
}) => {
  const isPMESelected = formData.earthElectrodeType === 'pme';
  const isSupplementaryBondingNotRequired = formData.supplementaryBondingSize === 'not-required';

  // Parse existing main bonding locations into checkboxes
  const parseMainBondingLocations = (value: string = ''): Set<string> => {
    const normalized = value.toLowerCase().trim();
    const locations = new Set<string>();

    if (normalized.includes('water')) locations.add('water');
    if (normalized.includes('gas')) locations.add('gas');
    if (normalized.includes('oil')) locations.add('oil');
    if (normalized.includes('structural steel') || normalized.includes('steel'))
      locations.add('structural-steel');
    if (normalized.includes('lightning')) locations.add('lightning');
    if (normalized.includes('telecom')) locations.add('telecoms');

    return locations;
  };

  const [bondingLocations, setBondingLocations] = useState<Set<string>>(() =>
    parseMainBondingLocations(formData.mainBondingLocations)
  );
  const [otherBonding, setOtherBonding] = useState<string>(() => {
    const value = formData.mainBondingLocations || '';
    const knownServices = ['water', 'gas', 'oil', 'structural steel', 'steel', 'telecom'];
    const parts = value
      .split(',')
      .map((s: string) => s.trim())
      .filter((s: string) => s);
    const otherParts = parts.filter(
      (part: string) => !knownServices.some((service) => part.toLowerCase().includes(service))
    );
    return otherParts.join(', ');
  });
  const [otherChecked, setOtherChecked] = useState<boolean>(() => {
    const value = formData.mainBondingLocations || '';
    const knownServices = ['water', 'gas', 'oil', 'structural steel', 'steel', 'telecom'];
    const parts = value
      .split(',')
      .map((s: string) => s.trim())
      .filter((s: string) => s);
    return parts.some(
      (part: string) => !knownServices.some((service) => part.toLowerCase().includes(service))
    );
  });

  // Sync state when formData changes externally
  useEffect(() => {
    setBondingLocations(parseMainBondingLocations(formData.mainBondingLocations));
  }, [formData.mainBondingLocations]);

  const handleBondingLocationChange = (service: string, checked: boolean) => {
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
      lightning: 'Lightning Protection',
      telecoms: 'Telecommunications',
    };

    const parts = Array.from(locations).map((s) => serviceLabels[s] || s);
    if (other.trim()) {
      parts.push(other.trim());
    }

    onUpdate('mainBondingLocations', parts.join(', '));
  };

  return (
    <div className="space-y-4">
      {/* Earth Electrode */}
      <SectionTitle title="Earth Electrode" />
      <div className="space-y-3">
        <FormField label="Electrode Type">
          <div className="grid grid-cols-3 gap-1">
            {[
              { value: 'rod', label: 'Rod' },
              { value: 'plate', label: 'Plate' },
              { value: 'tape', label: 'Tape' },
              { value: 'foundation', label: 'Foundation' },
              { value: 'pme', label: 'PME' },
              { value: 'other', label: 'Other' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  const newVal = formData.earthElectrodeType === opt.value ? '' : opt.value;
                  onUpdate('earthElectrodeType', newVal);
                  if (newVal === 'pme') onUpdate('earthElectrodeResistance', '');
                }}
                className={cn(
                  'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                  formData.earthElectrodeType === opt.value
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </FormField>

        {!isPMESelected && (
          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField label="Resistance (Ω)">
              <Input
                type="text"
                inputMode="decimal"
                value={formData.earthElectrodeResistance || ''}
                onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)}
                placeholder="e.g., 0.5"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </FormField>
            <FormField label="Location">
              <Input
                value={formData.earthElectrodeLocation || ''}
                onChange={(e) => onUpdate('earthElectrodeLocation', e.target.value)}
                placeholder="e.g., Garden adjacent to building"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </FormField>
          </div>
        )}
      </div>


      {/* Means of Earthing */}
      <SectionTitle title="Means of Earthing" />

      <FormField label="Means of Earthing" required>
        <div className="grid grid-cols-2 gap-2 items-end mt-1.5">
          <button
            type="button"
            className={cn(
              'h-11 rounded-lg text-xs font-medium touch-manipulation transition-all',
              formData.meansOfEarthing === 'distributor'
                ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                : 'bg-white/[0.05] border border-white/[0.08] text-white'
            )}
            onClick={() =>
              onUpdate(
                'meansOfEarthing',
                formData.meansOfEarthing === 'distributor' ? '' : 'distributor'
              )
            }
          >
            Distributor's facility
          </button>
          <button
            type="button"
            className={cn(
              'h-11 rounded-lg text-xs font-medium touch-manipulation transition-all',
              formData.meansOfEarthing === 'electrode'
                ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                : 'bg-white/[0.05] border border-white/[0.08] text-white'
            )}
            onClick={() =>
              onUpdate(
                'meansOfEarthing',
                formData.meansOfEarthing === 'electrode' ? '' : 'electrode'
              )
            }
          >
            Installation earth electrode
          </button>
        </div>
      </FormField>

      {/* Maximum Demand */}
      <SectionTitle title="Maximum Demand" />
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2 items-end">
          <div className="col-span-2">
            <FormField label="Load">
              <Input
                type="text"
                inputMode="decimal"
                value={formData.maximumDemand || ''}
                onChange={(e) => onUpdate('maximumDemand', e.target.value)}
                placeholder="e.g., 60"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
              />
            </FormField>
          </div>
          <FormField label="Unit">
            <div className="grid grid-cols-2 gap-1">
              {[
                { value: 'amps', label: 'A' },
                { value: 'kva', label: 'kVA' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onUpdate('maximumDemandUnit', opt.value)}
                  className={cn(
                    'h-11 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                    (formData.maximumDemandUnit || 'amps') === opt.value
                      ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                      : 'bg-white/[0.05] border border-white/[0.08] text-white'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </FormField>
        </div>
      </div>

      {/* Main Protective Conductors */}
      <SectionTitle title="Main Protective Conductors" />

      {/* Earthing Conductor */}
      <div className="space-y-2">
        <Label className="text-white text-xs font-medium block">Earthing Conductor</Label>
        <div className="grid grid-cols-3 gap-1">
          {['Copper', 'Aluminium', 'Steel'].map((mat) => (
            <button
              key={mat}
              type="button"
              onClick={() => onUpdate('earthingConductorMaterial', formData.earthingConductorMaterial === mat.toLowerCase() ? '' : mat.toLowerCase())}
              className={cn(
                'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                formData.earthingConductorMaterial === mat.toLowerCase()
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              {mat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-1">
          {['6', '10', '16', '25', '35', '50'].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onUpdate('earthingConductorCsa', formData.earthingConductorCsa === size ? '' : size)}
              className={cn(
                'h-10 rounded-lg font-medium transition-all touch-manipulation text-[10px] active:scale-[0.98]',
                formData.earthingConductorCsa === size
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              {size}mm²
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onUpdate('earthingConductorVerified', !formData.earthingConductorVerified)}
          className={cn(
            'w-full h-9 rounded-lg font-medium transition-all touch-manipulation text-xs active:scale-[0.98] flex items-center justify-center gap-1.5',
            formData.earthingConductorVerified
              ? 'bg-green-500/20 border border-green-500/40 text-green-400'
              : 'bg-white/[0.05] border border-white/[0.08] text-white'
          )}
        >
          {formData.earthingConductorVerified && <Check className="h-3 w-3" />}
          Connection / Continuity Verified
        </button>
      </div>

      {/* Main Protective Bonding Conductors */}
      <div className="space-y-2">
        <Label className="text-white text-xs font-medium block">Main Protective Bonding Conductors</Label>
        <div className="grid grid-cols-3 gap-1">
          {['Copper', 'Aluminium', 'Steel'].map((mat) => (
            <button
              key={mat}
              type="button"
              onClick={() => onUpdate('mainBondingMaterial', formData.mainBondingMaterial === mat.toLowerCase() ? '' : mat.toLowerCase())}
              className={cn(
                'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                formData.mainBondingMaterial === mat.toLowerCase()
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              {mat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-1">
          {['6mm', '10mm', '16mm', '25mm', '35mm', '50mm'].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onUpdate('mainBondingSize', formData.mainBondingSize === size ? '' : size)}
              className={cn(
                'h-10 rounded-lg font-medium transition-all touch-manipulation text-[10px] active:scale-[0.98]',
                formData.mainBondingSize === size
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              {size}²
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onUpdate('mainBondingVerified', !formData.mainBondingVerified)}
          className={cn(
            'w-full h-9 rounded-lg font-medium transition-all touch-manipulation text-xs active:scale-[0.98] flex items-center justify-center gap-1.5',
            formData.mainBondingVerified
              ? 'bg-green-500/20 border border-green-500/40 text-green-400'
              : 'bg-white/[0.05] border border-white/[0.08] text-white'
          )}
        >
          {formData.mainBondingVerified && <Check className="h-3 w-3" />}
          Connection / Continuity Verified
        </button>
      </div>

      {/* Bonding Connections */}
      <SectionTitle title="Bonding Connections To" />
      <div className="grid grid-cols-3 gap-1">
        {[
          { key: 'water', label: 'Water' },
          { key: 'gas', label: 'Gas' },
          { key: 'oil', label: 'Oil' },
          { key: 'structural-steel', label: 'Steel' },
          { key: 'lightning', label: 'Lightning' },
          { key: 'other', label: 'Other' },
        ].map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              if (key === 'other') {
                const newVal = !otherChecked;
                setOtherChecked(newVal);
                if (!newVal) { setOtherBonding(''); updateMainBondingLocations(bondingLocations, ''); }
              } else {
                handleBondingLocationChange(key, !bondingLocations.has(key));
              }
            }}
            className={cn(
              'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98] flex items-center justify-center gap-1',
              (key === 'other' ? otherChecked : bondingLocations.has(key))
                ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                : 'bg-white/[0.05] border border-white/[0.08] text-white'
            )}
          >
            {(key === 'other' ? otherChecked : bondingLocations.has(key)) && <Check className="h-3 w-3" />}
            {label}
          </button>
        ))}
      </div>

      {otherChecked && (
        <FormField label="Specify Other">
          <Input
            value={otherBonding}
            onChange={(e) => handleOtherBondingChange(e.target.value)}
            placeholder="e.g., Central heating pipework"
            className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08]"
          />
        </FormField>
      )}

      {/* Supplementary Bonding */}
      <SectionTitle title="Supplementary Bonding" />
      <div className="space-y-2">
        <FormField label="Size">
          <div className="grid grid-cols-5 gap-1">
            {[
              { value: '2.5mm', label: '2.5' },
              { value: '4mm', label: '4' },
              { value: '6mm', label: '6' },
              { value: '10mm', label: '10' },
              { value: 'not-required', label: 'N/R' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onUpdate('supplementaryBondingSize', formData.supplementaryBondingSize === opt.value ? '' : opt.value)}
                className={cn(
                  'h-10 rounded-lg font-semibold transition-all touch-manipulation text-[10px] active:scale-[0.98]',
                  formData.supplementaryBondingSize === opt.value
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white'
                )}
              >
                {opt.label}{opt.value !== 'not-required' ? 'mm²' : ''}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="Equipotential Bonding">
          <div className="grid grid-cols-3 gap-1">
            {[
              { value: 'satisfactory', label: '✓ OK' },
              { value: 'unsatisfactory', label: '✗ Unsat' },
              { value: 'not-applicable', label: 'N/A' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onUpdate('equipotentialBonding', formData.equipotentialBonding === opt.value ? '' : opt.value)}
                className={cn(
                  'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98]',
                  formData.equipotentialBonding === opt.value
                    ? opt.value === 'satisfactory'
                      ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                      : opt.value === 'unsatisfactory'
                        ? 'bg-red-500/20 border border-red-500/40 text-red-400'
                        : 'bg-white/[0.08] border border-white/[0.15] text-white'
                    : 'bg-white/[0.05] border border-white/[0.08] text-white'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </FormField>
      </div>
    </div>
  );
};

export default EarthingAndBondingSection;

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
import InputWithValidation from './InputWithValidation';

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
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: unknown) => void;
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
      .map((s) => s.trim())
      .filter((s) => s);
    const otherParts = parts.filter(
      (part) => !knownServices.some((service) => part.toLowerCase().includes(service))
    );
    return otherParts.join(', ');
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
      telecoms: 'Telecommunications',
    };

    const parts = Array.from(locations).map((s) => serviceLabels[s] || s);
    if (other.trim()) {
      parts.push(other.trim());
    }

    onUpdate('mainBondingLocations', parts.join(', '));
  };

  const meansOfEarthingOptions = [
    { value: 'distributor', label: "Distributor's facility" },
    { value: 'electrode', label: 'Installation earth electrode' },
  ];

  const earthElectrodeTypeOptions = [
    { value: 'rod', label: 'Earth Rod' },
    { value: 'plate', label: 'Earth Plate' },
    { value: 'tape', label: 'Earth Tape' },
    { value: 'foundation', label: 'Foundation Earth' },
    { value: 'pme', label: 'PME (No electrode required)' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="space-y-4">
      {/* Earth Electrode */}
      <SectionTitle title="Earth Electrode" />
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-white text-xs">Earth Electrode</Label>
          <div className="flex items-center gap-2">
            <Checkbox
              id="earthElectrodeNA"
              checked={formData.earthElectrodeNA || false}
              onCheckedChange={(checked) => {
                onUpdate('earthElectrodeNA', checked);
                if (checked) {
                  onUpdate('earthElectrodeType', '');
                  onUpdate('earthElectrodeResistance', '');
                  onUpdate('earthElectrodeLocation', '');
                }
              }}
            />
            <Label htmlFor="earthElectrodeNA" className="text-xs text-white cursor-pointer">
              N/A
            </Label>
          </div>
        </div>
        {formData.earthElectrodeNA ? (
          <p className="text-xs text-white p-2 border border-elec-yellow/30 bg-elec-yellow/5 rounded-lg">
            Earth electrode marked as not applicable
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2 items-end">
            <FormField label="Earth Electrode Type">
              <div className="flex flex-wrap gap-1.5">
                {earthElectrodeTypeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onUpdate('earthElectrodeType', formData.earthElectrodeType === opt.value ? '' : opt.value);
                      if (opt.value === 'pme') {
                        onUpdate('earthElectrodeResistance', '');
                      }
                    }}
                    className={`px-2.5 py-1.5 rounded-md text-xs font-medium touch-manipulation transition-all ${
                      formData.earthElectrodeType === opt.value
                        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                        : 'bg-white/[0.05] border border-white/[0.08] text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </FormField>

            {!isPMESelected && (
              <InputWithValidation
                id="earthElectrodeResistance"
                label="Earth Electrode Resistance (Ω)"
                value={formData.earthElectrodeResistance || ''}
                onChange={(value) => onUpdate('earthElectrodeResistance', value)}
                placeholder="e.g., 0.5"
                type="number"
                step="0.1"
                helpText="Maximum 200Ω for TT systems"
              />
            )}

            {isPMESelected && (
              <div className="flex items-center p-2">
                <p className="text-xs text-white">
                  No earth electrode resistance measurement required for PME installations
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Means of Earthing */}
      <SectionTitle title="Means of Earthing" />
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {meansOfEarthingOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() =>
                onUpdate(
                  'meansOfEarthing',
                  formData.meansOfEarthing === opt.value ? '' : opt.value
                )
              }
              className={`px-3 py-2 rounded-md text-xs font-medium touch-manipulation transition-all ${
                formData.meansOfEarthing === opt.value
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Maximum Demand */}
      <SectionTitle title="Maximum Demand" />
      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField label="Maximum Demand (Load)">
          <Input
            id="maximumDemand"
            type="number"
            step="0.1"
            value={formData.maximumDemand || ''}
            onChange={(e) => onUpdate('maximumDemand', e.target.value)}
            placeholder="e.g., 60"
            className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow"
          />
        </FormField>
        <FormField label="Unit">
          <Select
            value={formData.maximumDemandUnit || 'amps'}
            onValueChange={(value) => onUpdate('maximumDemandUnit', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
              <SelectItem value="kva">kVA</SelectItem>
              <SelectItem value="amps">Amps</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      {/* Earth Electrode Location */}
      {!isPMESelected && !formData.earthElectrodeNA && (
        <>
          <SectionTitle title="Earth Electrode Location" />
          <FormField label="Earth Electrode Location">
            <Input
              id="earthElectrodeLocation"
              value={formData.earthElectrodeLocation || ''}
              onChange={(e) => onUpdate('earthElectrodeLocation', e.target.value)}
              placeholder="e.g., Garden adjacent to main building"
              className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow"
            />
          </FormField>
        </>
      )}

      {/* Main Protective Conductors */}
      <SectionTitle title="Main Protective Conductors" />

      {/* Earthing Conductor */}
      <div className="space-y-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
        <div className="flex items-center justify-between">
          <Label className="text-white text-xs font-medium">Earthing Conductor</Label>
          <div className="flex items-center gap-2">
            <Checkbox
              id="earthingConductorNA"
              checked={formData.earthingConductorNA || false}
              onCheckedChange={(checked) => {
                onUpdate('earthingConductorNA', checked);
                if (checked) {
                  onUpdate('earthingConductorMaterial', '');
                  onUpdate('earthingConductorCsa', '');
                  onUpdate('earthingConductorVerified', false);
                }
              }}
            />
            <Label htmlFor="earthingConductorNA" className="text-xs text-white cursor-pointer">
              N/A
            </Label>
          </div>
        </div>
        {formData.earthingConductorNA ? (
          <p className="text-xs text-white p-2 border border-elec-yellow/30 bg-elec-yellow/5 rounded-lg">
            Earthing conductor marked as not applicable
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2 items-end">
            <FormField label="Material">
              <Select
                value={formData.earthingConductorMaterial || ''}
                onValueChange={(value) => onUpdate('earthingConductorMaterial', value)}
              >
                <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
                  <SelectItem value="copper">Copper</SelectItem>
                  <SelectItem value="aluminium">Aluminium</SelectItem>
                  <SelectItem value="steel">Steel</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="csa (mm²)">
              <Input
                id="earthingConductorCsa"
                type="number"
                step="0.5"
                value={formData.earthingConductorCsa || ''}
                onChange={(e) => onUpdate('earthingConductorCsa', e.target.value)}
                placeholder="e.g., 16"
                className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow"
              />
            </FormField>
            <div className="flex items-end col-span-2">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/30 w-full h-11">
                <Checkbox
                  id="earthingConductorVerified"
                  checked={formData.earthingConductorVerified === true}
                  onCheckedChange={(checked) =>
                    onUpdate('earthingConductorVerified', checked)
                  }
                  className="border-green-500/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <Label
                  htmlFor="earthingConductorVerified"
                  className="text-xs text-white cursor-pointer"
                >
                  Verified
                </Label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Protective Bonding Conductors */}
      <div className="space-y-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
        <div className="flex items-center justify-between">
          <Label className="text-white text-xs font-medium">
            Main Protective Bonding Conductors
          </Label>
          <div className="flex items-center gap-2">
            <Checkbox
              id="mainBondingNA"
              checked={formData.mainBondingNA || false}
              onCheckedChange={(checked) => {
                onUpdate('mainBondingNA', checked);
                if (checked) {
                  onUpdate('mainBondingMaterial', '');
                  onUpdate('mainBondingSize', '');
                  onUpdate('mainBondingVerified', false);
                }
              }}
            />
            <Label htmlFor="mainBondingNA" className="text-xs text-white cursor-pointer">
              N/A
            </Label>
          </div>
        </div>
        {formData.mainBondingNA ? (
          <p className="text-xs text-white p-2 border border-elec-yellow/30 bg-elec-yellow/5 rounded-lg">
            Main bonding conductors marked as not applicable
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2 items-end">
            <FormField label="Material">
              <Select
                value={formData.mainBondingMaterial || ''}
                onValueChange={(value) => onUpdate('mainBondingMaterial', value)}
              >
                <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
                  <SelectItem value="copper">Copper</SelectItem>
                  <SelectItem value="aluminium">Aluminium</SelectItem>
                  <SelectItem value="steel">Steel</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="csa (mm²)">
              <Select
                value={formData.mainBondingSize || ''}
                onValueChange={(value) => onUpdate('mainBondingSize', value)}
              >
                <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
                  <SelectItem value="6mm">6mm²</SelectItem>
                  <SelectItem value="10mm">10mm²</SelectItem>
                  <SelectItem value="16mm">16mm²</SelectItem>
                  <SelectItem value="25mm">25mm²</SelectItem>
                  <SelectItem value="35mm">35mm²</SelectItem>
                  <SelectItem value="custom">Other/Custom</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <div className="flex items-end col-span-2">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/30 w-full h-11">
                <Checkbox
                  id="mainBondingVerified"
                  checked={formData.mainBondingVerified === true}
                  onCheckedChange={(checked) => onUpdate('mainBondingVerified', checked)}
                  className="border-green-500/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <Label htmlFor="mainBondingVerified" className="text-xs text-white cursor-pointer">
                  Verified
                </Label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bonding Connections */}
      <SectionTitle title="Bonding Connections To" />
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'bondingToWater', label: 'Water pipes' },
            { id: 'bondingToGas', label: 'Gas pipes' },
            { id: 'bondingToOil', label: 'Oil pipes' },
            { id: 'bondingToStructuralSteel', label: 'Structural steel' },
            { id: 'bondingToLightningProtection', label: 'Lightning protection' },
            { id: 'bondingToOther', label: 'Other' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onUpdate(item.id, !formData[item.id])}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium touch-manipulation transition-all ${
                formData[item.id]
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              }`}
            >
              <Checkbox
                id={item.id}
                checked={formData[item.id] === true}
                onCheckedChange={(checked) => onUpdate(item.id, checked)}
                className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black pointer-events-none"
              />
              {item.label}
            </button>
          ))}
        </div>
        {formData.bondingToOther && (
          <FormField label="Specify Other">
            <Input
              id="bondingOtherSpecify"
              value={formData.bondingOtherSpecify || ''}
              onChange={(e) => onUpdate('bondingOtherSpecify', e.target.value)}
              placeholder="e.g., Metal pipework, Central heating"
              className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow"
            />
          </FormField>
        )}
      </div>

      {/* Legacy Bonding Locations */}
      <SectionTitle title="Legacy Bonding Locations" />
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'water', label: 'Water' },
            { id: 'gas', label: 'Gas' },
            { id: 'oil', label: 'Oil' },
            { id: 'structural-steel', label: 'Structural Steel' },
            { id: 'telecoms', label: 'Telecommunications' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleBondingLocationChange(item.id, !bondingLocations.has(item.id))}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium touch-manipulation transition-all ${
                bondingLocations.has(item.id)
                  ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              }`}
            >
              <Checkbox
                id={`eic-bonding-${item.id}`}
                checked={bondingLocations.has(item.id)}
                onCheckedChange={(checked) =>
                  handleBondingLocationChange(item.id, checked as boolean)
                }
                className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black pointer-events-none"
              />
              {item.label}
            </button>
          ))}
        </div>
        <FormField label="Other Services">
          <Input
            id="eic-bonding-other"
            value={otherBonding}
            onChange={(e) => handleOtherBondingChange(e.target.value)}
            placeholder="e.g., Lightning protection, Metal pipework"
            className="h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow"
          />
        </FormField>
        <span className="text-[10px] text-white block">
          Select all services with main protective bonding installed
        </span>
      </div>

      {/* Supplementary Bonding */}
      <SectionTitle title="Supplementary Bonding" />
      <div className="space-y-3">
        <FormField label="Supplementary Bonding Required">
          <Select
            value={formData.supplementaryBonding || ''}
            onValueChange={(value) => onUpdate('supplementaryBonding', value)}
          >
            <SelectTrigger id="supplementaryBonding" className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="n/a">N/A</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <div className="grid grid-cols-2 gap-2 items-end">
          <FormField label="Supplementary Bonding Size">
            <Select
              value={formData.supplementaryBondingSize || ''}
              onValueChange={(value) => onUpdate('supplementaryBondingSize', value)}
            >
              <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
                <SelectValue placeholder="Select conductor size" />
              </SelectTrigger>
              <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
                <SelectItem value="2.5mm">2.5mm²</SelectItem>
                <SelectItem value="4mm">4mm²</SelectItem>
                <SelectItem value="6mm">6mm²</SelectItem>
                <SelectItem value="10mm">10mm²</SelectItem>
                <SelectItem value="not-required">Not Required</SelectItem>
                <SelectItem value="custom">Other/Custom</SelectItem>
                <SelectItem value="n/a">N/A</SelectItem>
              </SelectContent>
            </Select>
            {formData.supplementaryBondingSize === 'custom' && (
              <Input
                placeholder="Enter custom size (mm²)"
                value={formData.supplementaryBondingSizeCustom || ''}
                onChange={(e) => onUpdate('supplementaryBondingSizeCustom', e.target.value)}
                className="mt-2 h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow"
                inputMode="numeric"
              />
            )}
            {isSupplementaryBondingNotRequired && (
              <span className="text-[10px] text-white block mt-1">
                Supplementary bonding may not be required if RCD protection is installed
              </span>
            )}
          </FormField>

          <FormField label="Equipotential Bonding">
            <Select
              value={formData.equipotentialBonding || ''}
              onValueChange={(value) => onUpdate('equipotentialBonding', value)}
            >
              <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
                <SelectItem value="satisfactory">Satisfactory</SelectItem>
                <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                <SelectItem value="not-applicable">Not Applicable</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </div>
    </div>
  );
};

export default EarthingAndBondingSection;

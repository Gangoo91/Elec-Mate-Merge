import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { Zap } from 'lucide-react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';
import InputWithValidation from './InputWithValidation';

interface EarthingAndBondingSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const EarthingAndBondingSection: React.FC<EarthingAndBondingSectionProps> = ({ formData, onUpdate, isOpen, onToggle }) => {
  const isPMESelected = formData.earthElectrodeType === 'pme';
  const isSupplementaryBondingNotRequired = formData.supplementaryBondingSize === 'not-required';

  // Parse existing main bonding locations into checkboxes
  const parseMainBondingLocations = (value: string = ''): Set<string> => {
    const normalized = value.toLowerCase().trim();
    const locations = new Set<string>();
    
    if (normalized.includes('water')) locations.add('water');
    if (normalized.includes('gas')) locations.add('gas');
    if (normalized.includes('oil')) locations.add('oil');
    if (normalized.includes('structural steel') || normalized.includes('steel')) locations.add('structural-steel');
    if (normalized.includes('telecom')) locations.add('telecoms');
    
    return locations;
  };

  const [bondingLocations, setBondingLocations] = useState<Set<string>>(() => 
    parseMainBondingLocations(formData.mainBondingLocations)
  );
  const [otherBonding, setOtherBonding] = useState<string>(() => {
    const value = formData.mainBondingLocations || '';
    const knownServices = ['water', 'gas', 'oil', 'structural steel', 'steel', 'telecom'];
    const parts = value.split(',').map(s => s.trim()).filter(s => s);
    const otherParts = parts.filter(part => 
      !knownServices.some(service => part.toLowerCase().includes(service))
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
      'water': 'Water',
      'gas': 'Gas',
      'oil': 'Oil',
      'structural-steel': 'Structural Steel',
      'telecoms': 'Telecommunications'
    };
    
    const parts = Array.from(locations).map(s => serviceLabels[s] || s);
    if (other.trim()) {
      parts.push(other.trim());
    }
    
    onUpdate('mainBondingLocations', parts.join(', '));
  };

  return (
    <Card className="border border-border bg-card overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <SectionHeader 
          title="Earthing & Bonding" 
          icon={Zap}
          isOpen={isOpen}
          color="amber-500"
        />
        <CollapsibleContent>
          <CardContent className="space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="earthElectrodeType" className="font-medium text-sm">Earth Electrode Type</Label>
            <MobileSelectPicker
              value={formData.earthElectrodeType || ''}
              onValueChange={(value) => {
                onUpdate('earthElectrodeType', value);
                if (value === 'pme') {
                  onUpdate('earthElectrodeResistance', '');
                }
              }}
              options={[
                { value: 'rod', label: 'Earth Rod' },
                { value: 'plate', label: 'Earth Plate' },
                { value: 'tape', label: 'Earth Tape' },
                { value: 'foundation', label: 'Foundation Earth' },
                { value: 'pme', label: 'PME (No electrode required)' },
                { value: 'other', label: 'Other' },
              ]}
              placeholder="Select electrode type"
              title="Earth Electrode Type"
            />
          </div>

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
              <p className="text-xs text-muted-foreground">
                No earth electrode resistance measurement required for PME installations
              </p>
            </div>
          )}
        </div>

        {/* Means of Earthing (IET Form) */}
        <div className="space-y-3">
          <Label className="font-medium text-sm">Means of Earthing</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer touch-manipulation ${
                formData.meansOfEarthing === 'distributor'
                  ? "bg-green-500/15 border-green-500/50"
                  : "bg-white/[0.03] border-white/[0.08]"
              }`}
              onClick={() => onUpdate('meansOfEarthing', formData.meansOfEarthing === 'distributor' ? '' : 'distributor')}
            >
              <Checkbox
                id="meansEarthingDistributor"
                checked={formData.meansOfEarthing === 'distributor'}
                onCheckedChange={(checked) => onUpdate('meansOfEarthing', checked ? 'distributor' : '')}
                className="border-green-500/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />
              <Label htmlFor="meansEarthingDistributor" className="text-sm font-medium cursor-pointer">
                Distributor's facility
              </Label>
            </div>
            <div
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer touch-manipulation ${
                formData.meansOfEarthing === 'electrode'
                  ? "bg-blue-500/15 border-blue-500/50"
                  : "bg-white/[0.03] border-white/[0.08]"
              }`}
              onClick={() => onUpdate('meansOfEarthing', formData.meansOfEarthing === 'electrode' ? '' : 'electrode')}
            >
              <Checkbox
                id="meansEarthingElectrode"
                checked={formData.meansOfEarthing === 'electrode'}
                onCheckedChange={(checked) => onUpdate('meansOfEarthing', checked ? 'electrode' : '')}
                className="border-blue-500/40 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
              <Label htmlFor="meansEarthingElectrode" className="text-sm font-medium cursor-pointer">
                Installation earth electrode
              </Label>
            </div>
          </div>
        </div>

        {/* Maximum Demand (IET Form) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="maximumDemand" className="font-medium text-sm">Maximum Demand (Load)</Label>
            <Input
              id="maximumDemand"
              type="number"
              step="0.1"
              value={formData.maximumDemand || ''}
              onChange={(e) => onUpdate('maximumDemand', e.target.value)}
              placeholder="e.g., 60"
              className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maximumDemandUnit" className="font-medium text-sm">Unit</Label>
            <MobileSelectPicker
              value={formData.maximumDemandUnit || 'amps'}
              onValueChange={(value) => onUpdate('maximumDemandUnit', value)}
              options={[
                { value: 'kva', label: 'kVA' },
                { value: 'amps', label: 'Amps' },
              ]}
              placeholder="Select unit"
              title="Maximum Demand Unit"
            />
          </div>
        </div>

        {/* Earth Electrode Location (IET Form) */}
        {!isPMESelected && (
          <div className="space-y-2">
            <Label htmlFor="earthElectrodeLocation" className="font-medium text-sm">Earth Electrode Location</Label>
            <Input
              id="earthElectrodeLocation"
              value={formData.earthElectrodeLocation || ''}
              onChange={(e) => onUpdate('earthElectrodeLocation', e.target.value)}
              placeholder="e.g., Garden adjacent to main building"
              className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
            />
          </div>
        )}

        {/* Main Protective Conductors (IET Form) */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-purple-400 border-b border-white/10 pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
            Main Protective Conductors
          </h4>

          {/* Earthing Conductor */}
          <div className="space-y-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <Label className="font-medium text-sm text-purple-300">Earthing Conductor</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="earthingConductorMaterial" className="text-xs text-white/60">Material</Label>
                <MobileSelectPicker
                  value={formData.earthingConductorMaterial || ''}
                  onValueChange={(value) => onUpdate('earthingConductorMaterial', value)}
                  options={[
                    { value: 'copper', label: 'Copper' },
                    { value: 'aluminium', label: 'Aluminium' },
                    { value: 'steel', label: 'Steel' },
                    { value: 'other', label: 'Other' },
                  ]}
                  placeholder="Select material"
                  title="Earthing Conductor Material"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="earthingConductorCsa" className="text-xs text-white/60">csa (mm²)</Label>
                <Input
                  id="earthingConductorCsa"
                  type="number"
                  step="0.5"
                  value={formData.earthingConductorCsa || ''}
                  onChange={(e) => onUpdate('earthingConductorCsa', e.target.value)}
                  placeholder="e.g., 16"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="flex items-end">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/30 w-full h-11">
                  <Checkbox
                    id="earthingConductorVerified"
                    checked={formData.earthingConductorVerified === true}
                    onCheckedChange={(checked) => onUpdate('earthingConductorVerified', checked)}
                    className="border-green-500/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <Label htmlFor="earthingConductorVerified" className="text-xs cursor-pointer">
                    Verified
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Protective Bonding Conductors */}
          <div className="space-y-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <Label className="font-medium text-sm text-purple-300">Main Protective Bonding Conductors</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mainBondingMaterial" className="text-xs text-white/60">Material</Label>
                <MobileSelectPicker
                  value={formData.mainBondingMaterial || ''}
                  onValueChange={(value) => onUpdate('mainBondingMaterial', value)}
                  options={[
                    { value: 'copper', label: 'Copper' },
                    { value: 'aluminium', label: 'Aluminium' },
                    { value: 'steel', label: 'Steel' },
                    { value: 'other', label: 'Other' },
                  ]}
                  placeholder="Select material"
                  title="Main Bonding Material"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainBondingCsa" className="text-xs text-white/60">csa (mm²)</Label>
                <MobileSelectPicker
                  value={formData.mainBondingSize || ''}
                  onValueChange={(value) => onUpdate('mainBondingSize', value)}
                  options={[
                    { value: '6mm', label: '6mm²' },
                    { value: '10mm', label: '10mm²' },
                    { value: '16mm', label: '16mm²' },
                    { value: '25mm', label: '25mm²' },
                    { value: '35mm', label: '35mm²' },
                    { value: 'custom', label: 'Other/Custom' },
                  ]}
                  placeholder="Select size"
                  title="Main Bonding csa"
                />
              </div>
              <div className="flex items-end">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/30 w-full h-11">
                  <Checkbox
                    id="mainBondingVerified"
                    checked={formData.mainBondingVerified === true}
                    onCheckedChange={(checked) => onUpdate('mainBondingVerified', checked)}
                    className="border-green-500/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <Label htmlFor="mainBondingVerified" className="text-xs cursor-pointer">
                    Verified
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bonding Connections (IET Form) */}
        <div className="space-y-3">
          <Label className="font-medium text-sm">Bonding Connections To:</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bondingToWater"
                checked={formData.bondingToWater === true}
                onCheckedChange={(checked) => onUpdate('bondingToWater', checked)}
              />
              <label htmlFor="bondingToWater" className="text-sm cursor-pointer">Water pipes</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bondingToGas"
                checked={formData.bondingToGas === true}
                onCheckedChange={(checked) => onUpdate('bondingToGas', checked)}
              />
              <label htmlFor="bondingToGas" className="text-sm cursor-pointer">Gas pipes</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bondingToOil"
                checked={formData.bondingToOil === true}
                onCheckedChange={(checked) => onUpdate('bondingToOil', checked)}
              />
              <label htmlFor="bondingToOil" className="text-sm cursor-pointer">Oil pipes</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bondingToStructuralSteel"
                checked={formData.bondingToStructuralSteel === true}
                onCheckedChange={(checked) => onUpdate('bondingToStructuralSteel', checked)}
              />
              <label htmlFor="bondingToStructuralSteel" className="text-sm cursor-pointer">Structural steel</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bondingToLightningProtection"
                checked={formData.bondingToLightningProtection === true}
                onCheckedChange={(checked) => onUpdate('bondingToLightningProtection', checked)}
              />
              <label htmlFor="bondingToLightningProtection" className="text-sm cursor-pointer">Lightning protection</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bondingToOther"
                checked={formData.bondingToOther === true}
                onCheckedChange={(checked) => onUpdate('bondingToOther', checked)}
              />
              <label htmlFor="bondingToOther" className="text-sm cursor-pointer">Other</label>
            </div>
          </div>
          {formData.bondingToOther && (
            <div className="space-y-2 mt-3">
              <Label htmlFor="bondingOtherSpecify" className="text-sm font-normal">Specify Other</Label>
              <Input
                id="bondingOtherSpecify"
                value={formData.bondingOtherSpecify || ''}
                onChange={(e) => onUpdate('bondingOtherSpecify', e.target.value)}
                placeholder="e.g., Metal pipework, Central heating"
                className="touch-manipulation h-11"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="supplementaryBondingSize" className="font-medium text-sm">Supplementary Bonding Size</Label>
            <MobileSelectPicker
              value={formData.supplementaryBondingSize || ''}
              onValueChange={(value) => onUpdate('supplementaryBondingSize', value)}
              options={[
                { value: '2.5mm', label: '2.5mm²' },
                { value: '4mm', label: '4mm²' },
                { value: '6mm', label: '6mm²' },
                { value: '10mm', label: '10mm²' },
                { value: 'not-required', label: 'Not Required' },
                { value: 'custom', label: 'Other/Custom' },
              ]}
              placeholder="Select conductor size"
              title="Supplementary Bonding Size"
            />
            {formData.supplementaryBondingSize === 'custom' && (
              <Input
                placeholder="Enter custom size (mm²)"
                value={formData.supplementaryBondingSizeCustom || ''}
                onChange={(e) => onUpdate('supplementaryBondingSizeCustom', e.target.value)}
                className="mt-2 touch-manipulation"
                inputMode="numeric"
              />
            )}
            {isSupplementaryBondingNotRequired && (
              <p className="text-xs text-muted-foreground mt-1">
                Supplementary bonding may not be required if RCD protection is installed
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="equipotentialBonding" className="font-medium text-sm">Equipotential Bonding</Label>
            <MobileSelectPicker
              value={formData.equipotentialBonding || ''}
              onValueChange={(value) => onUpdate('equipotentialBonding', value)}
              options={[
                { value: 'satisfactory', label: 'Satisfactory' },
                { value: 'unsatisfactory', label: 'Unsatisfactory' },
                { value: 'not-applicable', label: 'Not Applicable' },
              ]}
              placeholder="Select status"
              title="Equipotential Bonding"
            />
          </div>
        </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default EarthingAndBondingSection;

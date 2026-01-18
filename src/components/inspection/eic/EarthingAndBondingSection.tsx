import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
            <Select
              value={formData.earthElectrodeType || ''}
              onValueChange={(value) => {
                onUpdate('earthElectrodeType', value);
                // Clear resistance value when PME is selected
                if (value === 'pme') {
                  onUpdate('earthElectrodeResistance', '');
                }
              }}
            >
              <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow h-11">
                <SelectValue placeholder="Select electrode type" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                <SelectItem value="rod">Earth Rod</SelectItem>
                <SelectItem value="plate">Earth Plate</SelectItem>
                <SelectItem value="tape">Earth Tape</SelectItem>
                <SelectItem value="foundation">Foundation Earth</SelectItem>
                <SelectItem value="pme">PME (No electrode required)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
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
            <Select
              value={formData.maximumDemandUnit || 'amps'}
              onValueChange={(value) => onUpdate('maximumDemandUnit', value)}
            >
              <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow h-11">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                <SelectItem value="kva">kVA</SelectItem>
                <SelectItem value="amps">Amps</SelectItem>
              </SelectContent>
            </Select>
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
                <Select
                  value={formData.earthingConductorMaterial || ''}
                  onValueChange={(value) => onUpdate('earthingConductorMaterial', value)}
                >
                  <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-purple-500 focus:ring-purple-500 h-11">
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                    <SelectItem value="copper">Copper</SelectItem>
                    <SelectItem value="aluminium">Aluminium</SelectItem>
                    <SelectItem value="steel">Steel</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
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
                <Select
                  value={formData.mainBondingMaterial || ''}
                  onValueChange={(value) => onUpdate('mainBondingMaterial', value)}
                >
                  <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-purple-500 focus:ring-purple-500 h-11">
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                    <SelectItem value="copper">Copper</SelectItem>
                    <SelectItem value="aluminium">Aluminium</SelectItem>
                    <SelectItem value="steel">Steel</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainBondingCsa" className="text-xs text-white/60">csa (mm²)</Label>
                <Select
                  value={formData.mainBondingSize || ''}
                  onValueChange={(value) => onUpdate('mainBondingSize', value)}
                >
                  <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-purple-500 focus:ring-purple-500 h-11">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                    <SelectItem value="6mm">6mm²</SelectItem>
                    <SelectItem value="10mm">10mm²</SelectItem>
                    <SelectItem value="16mm">16mm²</SelectItem>
                    <SelectItem value="25mm">25mm²</SelectItem>
                    <SelectItem value="35mm">35mm²</SelectItem>
                    <SelectItem value="custom">Other/Custom</SelectItem>
                  </SelectContent>
                </Select>
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

        <div className="space-y-3">
          <Label className="font-medium text-sm">Legacy Bonding Locations</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="eic-bonding-water"
                checked={bondingLocations.has('water')}
                onCheckedChange={(checked) => handleBondingLocationChange('water', checked as boolean)}
              />
              <label
                htmlFor="eic-bonding-water"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Water
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="eic-bonding-gas"
                checked={bondingLocations.has('gas')}
                onCheckedChange={(checked) => handleBondingLocationChange('gas', checked as boolean)}
              />
              <label
                htmlFor="eic-bonding-gas"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Gas
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="eic-bonding-oil"
                checked={bondingLocations.has('oil')}
                onCheckedChange={(checked) => handleBondingLocationChange('oil', checked as boolean)}
              />
              <label
                htmlFor="eic-bonding-oil"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Oil
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="eic-bonding-steel"
                checked={bondingLocations.has('structural-steel')}
                onCheckedChange={(checked) => handleBondingLocationChange('structural-steel', checked as boolean)}
              />
              <label
                htmlFor="eic-bonding-steel"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Structural Steel
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="eic-bonding-telecoms"
                checked={bondingLocations.has('telecoms')}
                onCheckedChange={(checked) => handleBondingLocationChange('telecoms', checked as boolean)}
              />
              <label
                htmlFor="eic-bonding-telecoms"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Telecommunications
              </label>
            </div>
          </div>
          <div className="space-y-2 mt-3">
            <Label htmlFor="eic-bonding-other" className="text-sm font-normal">
              Other Services
            </Label>
            <Input
              id="eic-bonding-other"
              value={otherBonding}
              onChange={(e) => handleOtherBondingChange(e.target.value)}
              placeholder="e.g., Lightning protection, Metal pipework"
              className="touch-manipulation"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Select all services with main protective bonding installed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="supplementaryBondingSize" className="font-medium text-sm">Supplementary Bonding Size</Label>
            <Select
              value={formData.supplementaryBondingSize || ''}
              onValueChange={(value) => onUpdate('supplementaryBondingSize', value)}
            >
              <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow h-11">
                <SelectValue placeholder="Select conductor size" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                <SelectItem value="2.5mm">2.5mm²</SelectItem>
                <SelectItem value="4mm">4mm²</SelectItem>
                <SelectItem value="6mm">6mm²</SelectItem>
                <SelectItem value="10mm">10mm²</SelectItem>
                <SelectItem value="not-required">Not Required</SelectItem>
                <SelectItem value="custom">Other/Custom</SelectItem>
              </SelectContent>
            </Select>
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
            <Select
              value={formData.equipotentialBonding || ''}
              onValueChange={(value) => onUpdate('equipotentialBonding', value)}
            >
              <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow h-11">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                <SelectItem value="satisfactory">Satisfactory</SelectItem>
                <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                <SelectItem value="not-applicable">Not Applicable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default EarthingAndBondingSection;

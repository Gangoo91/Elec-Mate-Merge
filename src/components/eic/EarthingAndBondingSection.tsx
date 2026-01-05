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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mainBondingSize" className="font-medium text-sm">Main Bonding Conductor Size</Label>
            <Select
              value={formData.mainBondingSize || ''}
              onValueChange={(value) => onUpdate('mainBondingSize', value)}
            >
              <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow h-11">
                <SelectValue placeholder="Select conductor size" />
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
            {formData.mainBondingSize === 'custom' && (
              <Input
                placeholder="Enter custom size (mm²)"
                value={formData.mainBondingSizeCustom || ''}
                onChange={(e) => onUpdate('mainBondingSizeCustom', e.target.value)}
                className="mt-2 touch-manipulation"
                inputMode="numeric"
              />
            )}
          </div>

          <div>
            <Label htmlFor="bondingCompliance" className="font-medium text-sm">Bonding Compliance</Label>
            <Select
              value={formData.bondingCompliance || ''}
              onValueChange={(value) => onUpdate('bondingCompliance', value)}
            >
              <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow h-11">
                <SelectValue placeholder="Select compliance" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                <SelectItem value="satisfactory">Satisfactory</SelectItem>
                <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                <SelectItem value="not-applicable">Not Applicable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="font-medium text-sm">Main Bonding Locations</Label>
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

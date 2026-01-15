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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mainBondingSize" className="font-medium text-sm">Main Bonding Conductor Size</Label>
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
              placeholder="Select conductor size"
              title="Main Bonding Conductor Size"
            />
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
            <MobileSelectPicker
              value={formData.bondingCompliance || ''}
              onValueChange={(value) => onUpdate('bondingCompliance', value)}
              options={[
                { value: 'satisfactory', label: 'Satisfactory' },
                { value: 'unsatisfactory', label: 'Unsatisfactory' },
                { value: 'not-applicable', label: 'Not Applicable' },
              ]}
              placeholder="Select compliance"
              title="Bonding Compliance"
            />
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

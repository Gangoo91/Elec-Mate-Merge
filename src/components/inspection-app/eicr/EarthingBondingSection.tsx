import React, { useMemo, useState, useEffect } from 'react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Zap, Info } from 'lucide-react';

interface EarthingBondingSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

const EarthingBondingSection = ({ formData, onUpdate, isOpen = true, onToggle }: EarthingBondingSectionProps) => {
  const showEarthElectrodeResistance = formData.earthElectrodeType && 
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
    if (normalized.includes('structural steel') || normalized.includes('steel')) locations.add('structural-steel');
    if (normalized.includes('telecom')) locations.add('telecoms');
    
    // Extract 'other' text - everything that's not a known service
    const knownServices = ['water', 'gas', 'oil', 'structural steel', 'steel', 'telecom'];
    const parts = value.split(',').map(s => s.trim()).filter(s => s);
    const otherParts = parts.filter(part => 
      !knownServices.some(service => part.toLowerCase().includes(service))
    );
    
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
    <div className="eicr-section-card">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <SectionHeader
          title="Earthing & Bonding"
          icon={Zap}
          isOpen={isOpen}
          color="amber-500"
        />
        <CollapsibleContent>
          <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">
            {/* Earth Electrode */}
            {showEarthElectrodeResistance && (
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  Earth Electrode
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="earthElectrodeResistance">
                    Earth Electrode Resistance (Ω) *
                  </Label>
                  <Input
                    id="earthElectrodeResistance"
                    value={formData.earthElectrodeResistance || ''}
                    onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)}
                    placeholder="e.g., 21"
                    type="number"
                    step="0.01"
                    min="0"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Measured in Ohms (Ω). Typical values: TT systems &lt;200Ω
                  </p>
                </div>
              </div>
            )}

            {showEarthElectrodeResistance && <Separator className="my-6" />}

            {/* Main Protective Bonding */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                Main Protective Bonding
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mainBondingSize">
                    Main Bonding Conductor Size *
                  </Label>
                  <MobileSelectPicker
                    value={formData.mainBondingSize || ''}
                    onValueChange={(value) => onUpdate('mainBondingSize', value)}
                    options={[
                      { value: '6mm', label: '6mm²' },
                      { value: '10mm', label: '10mm²' },
                      { value: '16mm', label: '16mm²' },
                      { value: '25mm', label: '25mm²' },
                      { value: 'custom', label: 'Other/Custom' },
                    ]}
                    placeholder="Select conductor size"
                    title="Main Bonding Conductor Size"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Typical sizes: 10mm² for most domestic installations
                  </p>
                </div>

                {showCustomMainBonding && (
                  <div className="space-y-2">
                    <Label htmlFor="mainBondingSizeCustom">
                      Custom Main Bonding Size
                    </Label>
                    <Input
                      id="mainBondingSizeCustom"
                      value={formData.mainBondingSizeCustom || ''}
                      onChange={(e) => onUpdate('mainBondingSizeCustom', e.target.value)}
                      placeholder="e.g., 35mm²"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="bondingCompliance">
                    Bonding Compliance *
                  </Label>
                  <MobileSelectPicker
                    value={formData.bondingCompliance || ''}
                    onValueChange={(value) => onUpdate('bondingCompliance', value)}
                    options={[
                      { value: 'satisfactory', label: 'Satisfactory' },
                      { value: 'unsatisfactory', label: 'Unsatisfactory' },
                      { value: 'not-applicable', label: 'Not Applicable' },
                    ]}
                    placeholder="Select compliance status"
                    title="Bonding Compliance"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Main Bonding Locations
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bonding-water"
                        checked={bondingLocations.has('water')}
                        onCheckedChange={(checked) => handleBondingLocationChange('water', checked as boolean)}
                      />
                      <label
                        htmlFor="bonding-water"
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Water
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bonding-gas"
                        checked={bondingLocations.has('gas')}
                        onCheckedChange={(checked) => handleBondingLocationChange('gas', checked as boolean)}
                      />
                      <label
                        htmlFor="bonding-gas"
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Gas
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bonding-oil"
                        checked={bondingLocations.has('oil')}
                        onCheckedChange={(checked) => handleBondingLocationChange('oil', checked as boolean)}
                      />
                      <label
                        htmlFor="bonding-oil"
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Oil
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bonding-steel"
                        checked={bondingLocations.has('structural-steel')}
                        onCheckedChange={(checked) => handleBondingLocationChange('structural-steel', checked as boolean)}
                      />
                      <label
                        htmlFor="bonding-steel"
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Structural Steel
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bonding-telecoms"
                        checked={bondingLocations.has('telecoms')}
                        onCheckedChange={(checked) => handleBondingLocationChange('telecoms', checked as boolean)}
                      />
                      <label
                        htmlFor="bonding-telecoms"
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Telecommunications
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2 mt-3">
                    <Label htmlFor="bonding-other" className="text-sm font-normal">
                      Other Services
                    </Label>
                    <Input
                      id="bonding-other"
                      value={otherBonding}
                      onChange={(e) => handleOtherBondingChange(e.target.value)}
                      placeholder="e.g., Lightning protection, Metal pipework"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Select all services with main protective bonding installed
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Supplementary Bonding */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                Supplementary Bonding
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="supplementaryBondingSize">
                    Supplementary Bonding Conductor Size
                  </Label>
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
                    title="Supplementary Bonding Conductor Size"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Required in locations with increased risk (e.g., bathrooms)
                  </p>
                </div>

                {showCustomSupplementaryBonding && (
                  <div className="space-y-2">
                    <Label htmlFor="supplementaryBondingSizeCustom">
                      Custom Supplementary Bonding Size
                    </Label>
                    <Input
                      id="supplementaryBondingSizeCustom"
                      value={formData.supplementaryBondingSizeCustom || ''}
                      onChange={(e) => onUpdate('supplementaryBondingSizeCustom', e.target.value)}
                      placeholder="e.g., 16mm²"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="equipotentialBonding">
                    Equipotential Bonding Status
                  </Label>
                  <MobileSelectPicker
                    value={formData.equipotentialBonding || ''}
                    onValueChange={(value) => onUpdate('equipotentialBonding', value)}
                    options={[
                      { value: 'present', label: 'Present and Satisfactory' },
                      { value: 'present-unsatisfactory', label: 'Present but Unsatisfactory' },
                      { value: 'not-present', label: 'Not Present' },
                      { value: 'not-required', label: 'Not Required' },
                    ]}
                    placeholder="Select status"
                    title="Equipotential Bonding Status"
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">BS 7671 Requirement</p>
                    <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                      Main bonding must be provided to incoming services. Supplementary bonding may be required in special locations where automatic disconnection times cannot be met.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default EarthingBondingSection;

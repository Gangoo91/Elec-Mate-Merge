import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    <Card className="border border-border bg-card overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <SectionHeader 
          title="Earthing & Bonding" 
          icon={Zap}
          isOpen={isOpen}
          color="amber-500"
        />
        <CollapsibleContent>
          <CardContent className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
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
                  <Select 
                    value={formData.mainBondingSize || ''} 
                    onValueChange={(value) => onUpdate('mainBondingSize', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                      <SelectValue placeholder="Select conductor size" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                      <SelectItem value="6mm">6mm²</SelectItem>
                      <SelectItem value="10mm">10mm²</SelectItem>
                      <SelectItem value="16mm">16mm²</SelectItem>
                      <SelectItem value="25mm">25mm²</SelectItem>
                      <SelectItem value="custom">Other/Custom</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Select 
                    value={formData.bondingCompliance || ''} 
                    onValueChange={(value) => onUpdate('bondingCompliance', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                      <SelectValue placeholder="Select compliance status" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                      <SelectItem value="satisfactory">Satisfactory</SelectItem>
                      <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                      <SelectItem value="not-applicable">Not Applicable</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Select 
                    value={formData.supplementaryBondingSize || ''} 
                    onValueChange={(value) => onUpdate('supplementaryBondingSize', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                      <SelectValue placeholder="Select conductor size" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                      <SelectItem value="2.5mm">2.5mm²</SelectItem>
                      <SelectItem value="4mm">4mm²</SelectItem>
                      <SelectItem value="6mm">6mm²</SelectItem>
                      <SelectItem value="10mm">10mm²</SelectItem>
                      <SelectItem value="not-required">Not Required</SelectItem>
                      <SelectItem value="custom">Other/Custom</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Select 
                    value={formData.equipotentialBonding || ''} 
                    onValueChange={(value) => onUpdate('equipotentialBonding', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation border-white/30 focus:border-amber-500 focus:ring-amber-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                      <SelectItem value="present">Present and Satisfactory</SelectItem>
                      <SelectItem value="present-unsatisfactory">Present but Unsatisfactory</SelectItem>
                      <SelectItem value="not-present">Not Present</SelectItem>
                      <SelectItem value="not-required">Not Required</SelectItem>
                    </SelectContent>
                  </Select>
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
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default EarthingBondingSection;

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
    <Card className="border border-border/30 bg-card overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <SectionHeader
          title="Earthing & Bonding"
          icon={Zap}
          isOpen={isOpen}
          color="green-500"
        />
        <CollapsibleContent>
          <CardContent className="p-4 space-y-6">
            {/* Earth Electrode */}
            {showEarthElectrodeResistance && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                  Earth Electrode
                </h3>
                <div className="space-y-1.5">
                  <Label htmlFor="earthElectrodeResistance">
                    Earth Electrode Resistance (Ω) <span className="text-elec-yellow">*</span>
                  </Label>
                  <Input
                    id="earthElectrodeResistance"
                    value={formData.earthElectrodeResistance || ''}
                    onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)}
                    placeholder="e.g., 21"
                    type="number"
                    step="0.01"
                    min="0"
                  />
                  <p className="text-xs text-muted-foreground">
                    Measured in Ohms (Ω). Typical values: TT systems &lt;200Ω
                  </p>
                </div>
              </div>
            )}

            {showEarthElectrodeResistance && <Separator className="bg-border/30" />}

            {/* Main Protective Bonding */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                Main Protective Bonding
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="mainBondingSize">
                    Main Bonding Conductor Size <span className="text-elec-yellow">*</span>
                  </Label>
                  <Select
                    value={formData.mainBondingSize || ''}
                    onValueChange={(value) => onUpdate('mainBondingSize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select conductor size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6mm">6mm²</SelectItem>
                      <SelectItem value="10mm">10mm²</SelectItem>
                      <SelectItem value="16mm">16mm²</SelectItem>
                      <SelectItem value="25mm">25mm²</SelectItem>
                      <SelectItem value="custom">Other/Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Typical sizes: 10mm² for most domestic installations
                  </p>
                </div>

                {showCustomMainBonding && (
                  <div className="space-y-1.5">
                    <Label htmlFor="mainBondingSizeCustom">Custom Main Bonding Size</Label>
                    <Input
                      id="mainBondingSizeCustom"
                      value={formData.mainBondingSizeCustom || ''}
                      onChange={(e) => onUpdate('mainBondingSizeCustom', e.target.value)}
                      placeholder="e.g., 35mm²"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="bondingCompliance">
                    Bonding Compliance <span className="text-elec-yellow">*</span>
                  </Label>
                  <Select
                    value={formData.bondingCompliance || ''}
                    onValueChange={(value) => onUpdate('bondingCompliance', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select compliance status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="satisfactory">Satisfactory</SelectItem>
                      <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                      <SelectItem value="not-applicable">Not Applicable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Main Bonding Locations</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/30 transition-colors">
                      <Checkbox
                        id="bonding-water"
                        checked={bondingLocations.has('water')}
                        onCheckedChange={(checked) => handleBondingLocationChange('water', checked as boolean)}
                      />
                      <Label htmlFor="bonding-water" className="cursor-pointer text-sm font-normal">
                        Water
                      </Label>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/30 transition-colors">
                      <Checkbox
                        id="bonding-gas"
                        checked={bondingLocations.has('gas')}
                        onCheckedChange={(checked) => handleBondingLocationChange('gas', checked as boolean)}
                      />
                      <Label htmlFor="bonding-gas" className="cursor-pointer text-sm font-normal">
                        Gas
                      </Label>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/30 transition-colors">
                      <Checkbox
                        id="bonding-oil"
                        checked={bondingLocations.has('oil')}
                        onCheckedChange={(checked) => handleBondingLocationChange('oil', checked as boolean)}
                      />
                      <Label htmlFor="bonding-oil" className="cursor-pointer text-sm font-normal">
                        Oil
                      </Label>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/30 transition-colors">
                      <Checkbox
                        id="bonding-steel"
                        checked={bondingLocations.has('structural-steel')}
                        onCheckedChange={(checked) => handleBondingLocationChange('structural-steel', checked as boolean)}
                      />
                      <Label htmlFor="bonding-steel" className="cursor-pointer text-sm font-normal">
                        Structural Steel
                      </Label>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/30 transition-colors">
                      <Checkbox
                        id="bonding-telecoms"
                        checked={bondingLocations.has('telecoms')}
                        onCheckedChange={(checked) => handleBondingLocationChange('telecoms', checked as boolean)}
                      />
                      <Label htmlFor="bonding-telecoms" className="cursor-pointer text-sm font-normal">
                        Telecommunications
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="bonding-other">Other Services</Label>
                    <Input
                      id="bonding-other"
                      value={otherBonding}
                      onChange={(e) => handleOtherBondingChange(e.target.value)}
                      placeholder="e.g., Lightning protection, Metal pipework"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Select all services with main protective bonding installed
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-border/30" />

            {/* Supplementary Bonding */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                Supplementary Bonding
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="supplementaryBondingSize">Supplementary Bonding Conductor Size</Label>
                  <Select
                    value={formData.supplementaryBondingSize || ''}
                    onValueChange={(value) => onUpdate('supplementaryBondingSize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select conductor size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2.5mm">2.5mm²</SelectItem>
                      <SelectItem value="4mm">4mm²</SelectItem>
                      <SelectItem value="6mm">6mm²</SelectItem>
                      <SelectItem value="10mm">10mm²</SelectItem>
                      <SelectItem value="not-required">Not Required</SelectItem>
                      <SelectItem value="custom">Other/Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Required in locations with increased risk (e.g., bathrooms)
                  </p>
                </div>

                {showCustomSupplementaryBonding && (
                  <div className="space-y-1.5">
                    <Label htmlFor="supplementaryBondingSizeCustom">Custom Supplementary Bonding Size</Label>
                    <Input
                      id="supplementaryBondingSizeCustom"
                      value={formData.supplementaryBondingSizeCustom || ''}
                      onChange={(e) => onUpdate('supplementaryBondingSizeCustom', e.target.value)}
                      placeholder="e.g., 16mm²"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="equipotentialBonding">Equipotential Bonding Status</Label>
                  <Select
                    value={formData.equipotentialBonding || ''}
                    onValueChange={(value) => onUpdate('equipotentialBonding', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="present">Present and Satisfactory</SelectItem>
                      <SelectItem value="present-unsatisfactory">Present but Unsatisfactory</SelectItem>
                      <SelectItem value="not-present">Not Present</SelectItem>
                      <SelectItem value="not-required">Not Required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-3 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-elec-yellow mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-elec-yellow font-medium">BS 7671 Requirement</p>
                    <p className="text-xs text-elec-yellow/70 mt-1">
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

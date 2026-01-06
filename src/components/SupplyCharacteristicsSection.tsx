
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Info, Zap } from 'lucide-react';

interface SupplyCharacteristicsSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

const SupplyCharacteristicsSection = ({ formData, onUpdate }: SupplyCharacteristicsSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  // Auto-set common voltage based on phases
  const handlePhasesChange = (value: string) => {
    onUpdate('phases', value);
    
    // Auto-suggest common voltages
    if (value === '1' && !formData.supplyVoltage) {
      onUpdate('supplyVoltage', '230');
    } else if (value === '3' && !formData.supplyVoltage) {
      onUpdate('supplyVoltage', '400');
    }
  };

  // Auto-set PME based on earthing arrangement
  React.useEffect(() => {
    if (formData.earthingArrangement === 'TN-C-S' && formData.supplyPME !== 'yes') {
      onUpdate('supplyPME', 'yes');
    } else if (formData.earthingArrangement && formData.earthingArrangement !== 'TN-C-S' && formData.supplyPME === 'yes') {
      onUpdate('supplyPME', 'no');
    }
    
    // Auto-set earth electrode type to N/A for TN systems
    if ((formData.earthingArrangement === 'TN-S' || formData.earthingArrangement === 'TN-C-S') && 
        formData.earthElectrodeType !== 'n/a') {
      onUpdate('earthElectrodeType', 'n/a');
    }
  }, [formData.earthingArrangement]);

  // Auto-set earthing arrangement when PME is set to Yes
  const handleSupplyPMEChange = (value: string) => {
    onUpdate('supplyPME', value);
    if (value === 'yes' && formData.earthingArrangement !== 'TN-C-S') {
      onUpdate('earthingArrangement', 'TN-C-S');
    }
  };

  // Show RCD fields only when RCD main switch is yes
  const showRCDFields = formData.rcdMainSwitch === 'yes';

  // Handle main protective device selection
  const handleMainProtectiveDeviceChange = (value: string) => {
    if (value === 'other') {
      onUpdate('mainProtectiveDevice', '');
      onUpdate('mainProtectiveDeviceCustom', 'true');
    } else {
      onUpdate('mainProtectiveDevice', value);
      onUpdate('mainProtectiveDeviceCustom', 'false');
    }
  };

  // Check if custom input should be shown
  const showCustomProtectiveDevice = formData.mainProtectiveDeviceCustom === 'true' || 
    (formData.mainProtectiveDevice && !['100A BS 88 Fuse', '80A BS 88 Fuse', '63A BS 88 Fuse', '32A BS 1361 Fuse', '100A MCCB', '80A MCCB', '63A MCCB', '100A MCB Type B', '80A MCB Type B', '63A MCB Type B', '100A MCB Type C', '80A MCB Type C', '63A MCB Type C'].includes(formData.mainProtectiveDevice));

  // Get earthing arrangement info
  const getEarthingInfo = (arrangement: string) => {
    const info: { [key: string]: string } = {
      'TN-S': 'Separate neutral and protective conductors throughout',
      'TN-C-S': 'Combined neutral and protective conductor in supply, separate in installation (PME)',
      'TT': 'Installation earth electrode independent of supply earth',
      'IT': 'Isolated or impedance earthed supply with installation earth electrode'
    };
    return info[arrangement] || '';
  };

  return (
    <Card className="border border-border/30 bg-card overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SectionHeader
          title="Supply & Earthing Characteristics"
          icon={Zap}
          isOpen={isOpen}
          color="purple-500"
        />
        <CollapsibleContent>
          <CardContent className="p-4 space-y-6">
            {/* Supply Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                Supply Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phases">Number of Phases <span className="text-elec-yellow">*</span></Label>
                  <Select value={formData.phases || ''} onValueChange={handlePhasesChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Single Phase</SelectItem>
                      <SelectItem value="3">Three Phase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="supplyVoltage">Supply Voltage <span className="text-elec-yellow">*</span></Label>
                  <Select value={formData.supplyVoltage || ''} onValueChange={(value) => onUpdate('supplyVoltage', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select voltage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="230">230V (Single Phase)</SelectItem>
                      <SelectItem value="400">400V (Three Phase)</SelectItem>
                      <SelectItem value="230/400">230/400V (Both)</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {formData.supplyVoltage === 'other' && (
                <div className="space-y-1.5">
                  <Label htmlFor="supplyVoltageCustom">Custom Voltage</Label>
                  <Input
                    id="supplyVoltageCustom"
                    value={formData.supplyVoltageCustom || ''}
                    onChange={(e) => onUpdate('supplyVoltageCustom', e.target.value)}
                    placeholder="Enter custom voltage (e.g., 240V)"
                  />
                </div>
              )}
              <p className="text-xs text-elec-yellow/70 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-elec-yellow"></span>
                {formData.phases === '1' ? 'Typically 230V for single phase' :
                 formData.phases === '3' ? 'Typically 400V for three phase' :
                 'Select nominal voltage'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="supplyFrequency">Frequency (Hz)</Label>
                  <Input
                    id="supplyFrequency"
                    value={formData.supplyFrequency || '50'}
                    onChange={(e) => onUpdate('supplyFrequency', e.target.value)}
                    placeholder="50"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="supplyPME">Supply PME</Label>
                  <Select value={formData.supplyPME || ''} onValueChange={handleSupplyPMEChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Yes/No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  {formData.supplyPME === 'yes' && formData.earthingArrangement === 'TN-C-S' && (
                    <p className="text-xs text-green-500 flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      Correct - PME typically uses TN-C-S
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator className="bg-border/30" />

            {/* Main Protective Device */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                Main Protective Device
              </h3>
              <div className="space-y-1.5">
                <Label htmlFor="mainProtectiveDevice">Main Protective Device <span className="text-elec-yellow">*</span></Label>
                <Select
                  value={showCustomProtectiveDevice ? 'other' : (formData.mainProtectiveDevice || '')}
                  onValueChange={handleMainProtectiveDeviceChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select protective device" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100A BS 88 Fuse">100A BS 88 Fuse</SelectItem>
                    <SelectItem value="80A BS 88 Fuse">80A BS 88 Fuse</SelectItem>
                    <SelectItem value="63A BS 88 Fuse">63A BS 88 Fuse</SelectItem>
                    <SelectItem value="32A BS 1361 Fuse">32A BS 1361 Fuse</SelectItem>
                    <SelectItem value="100A MCCB">100A MCCB</SelectItem>
                    <SelectItem value="80A MCCB">80A MCCB</SelectItem>
                    <SelectItem value="63A MCCB">63A MCCB</SelectItem>
                    <SelectItem value="100A MCB Type B">100A MCB Type B</SelectItem>
                    <SelectItem value="80A MCB Type B">80A MCB Type B</SelectItem>
                    <SelectItem value="63A MCB Type B">63A MCB Type B</SelectItem>
                    <SelectItem value="100A MCB Type C">100A MCB Type C</SelectItem>
                    <SelectItem value="80A MCB Type C">80A MCB Type C</SelectItem>
                    <SelectItem value="63A MCB Type C">63A MCB Type C</SelectItem>
                    <SelectItem value="other">Other (specify)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Common protective devices per BS 7671</p>
              </div>
              {showCustomProtectiveDevice && (
                <div className="space-y-1.5">
                  <Label htmlFor="mainProtectiveDeviceCustomValue">Custom Device</Label>
                  <Input
                    id="mainProtectiveDeviceCustomValue"
                    value={formData.mainProtectiveDevice || ''}
                    onChange={(e) => onUpdate('mainProtectiveDevice', e.target.value)}
                    placeholder="e.g. 125A BS 88 Fuse"
                  />
                  <p className="text-xs text-muted-foreground">Include rating, type, and standard</p>
                </div>
              )}
            </div>

            <Separator className="bg-border/30" />

            {/* Earthing System */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                Earthing System
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="earthingArrangement">Earthing Arrangement <span className="text-elec-yellow">*</span></Label>
                  <Select value={formData.earthingArrangement || ''} onValueChange={(value) => onUpdate('earthingArrangement', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TN-S">TN-S</SelectItem>
                      <SelectItem value="TN-C-S">TN-C-S</SelectItem>
                      <SelectItem value="TT">TT</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                    </SelectContent>
                  </Select>
                  {formData.earthingArrangement && (
                    <p className="text-xs text-muted-foreground">
                      {getEarthingInfo(formData.earthingArrangement)}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="earthElectrodeType">Earth Electrode Type</Label>
                  <Select value={formData.earthElectrodeType || ''} onValueChange={(value) => onUpdate('earthElectrodeType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rod">Rod</SelectItem>
                      <SelectItem value="tape">Tape</SelectItem>
                      <SelectItem value="plate">Plate</SelectItem>
                      <SelectItem value="structural">Structural Steel</SelectItem>
                      <SelectItem value="water-pipe">Water Pipe</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="n/a">N/A (TN-S/TN-C-S)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="bg-border/30" />

            {/* RCD Protection */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                RCD Protection
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="rcdMainSwitch">RCD Main Switch</Label>
                  <Select value={formData.rcdMainSwitch || ''} onValueChange={(value) => onUpdate('rcdMainSwitch', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Yes/No" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {showRCDFields && (
                  <div className="space-y-1.5">
                    <Label htmlFor="rcdRating">RCD Rating <span className="text-elec-yellow">*</span></Label>
                    <Select value={formData.rcdRating || ''} onValueChange={(value) => onUpdate('rcdRating', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30mA">30mA</SelectItem>
                        <SelectItem value="100mA">100mA</SelectItem>
                        <SelectItem value="300mA">300mA</SelectItem>
                        <SelectItem value="500mA">500mA</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-elec-yellow/70">30mA typical for domestic</p>
                  </div>
                )}
              </div>

              {formData.rcdMainSwitch === 'no' && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-amber-400 font-medium">No RCD Main Switch</p>
                      <p className="text-xs text-amber-400/70 mt-1">
                        Consider if additional RCD protection is provided at circuit level for BS 7671 compliance
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default SupplyCharacteristicsSection;

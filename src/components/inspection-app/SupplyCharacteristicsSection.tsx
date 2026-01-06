
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
    <Card className="border border-border bg-card overflow-hidden relative">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SectionHeader 
          title="Supply & Earthing Characteristics" 
          icon={Zap}
          isOpen={isOpen}
          color="purple-500"
        />
        <CollapsibleContent>
          <CardContent className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
            Supply Details
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phases">Number of Phases *</Label>
              <Select value={formData.phases || ''} onValueChange={handlePhasesChange}>
                <SelectTrigger className="h-11 touch-manipulation border-white/10 focus:border-purple-500 focus:ring-purple-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                  <SelectItem value="1">Single Phase</SelectItem>
                  <SelectItem value="3">Three Phase</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplyVoltage">Supply Voltage *</Label>
              <Select value={formData.supplyVoltage || ''} onValueChange={(value) => onUpdate('supplyVoltage', value)}>
                <SelectTrigger className="h-11 touch-manipulation border-white/10 focus:border-purple-500 focus:ring-purple-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                  <SelectValue placeholder="Select voltage" />
                </SelectTrigger>
                <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                  <SelectItem value="230">230V (Single Phase)</SelectItem>
                  <SelectItem value="400">400V (Three Phase)</SelectItem>
                  <SelectItem value="230/400">230/400V (Both)</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {formData.supplyVoltage === 'other' && (
                <Input
                  id="supplyVoltageCustom"
                  value={formData.supplyVoltageCustom || ''}
                  onChange={(e) => onUpdate('supplyVoltageCustom', e.target.value)}
                  placeholder="Enter custom voltage (e.g., 240V)"
                  className="h-11 text-base touch-manipulation border-white/10 focus:border-purple-500 focus:ring-purple-500 mt-2"
                />
              )}
              <p className="text-xs text-blue-400 mt-1 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-blue-400 block"></span>
                {formData.phases === '1' ? 'Typically 230V for single phase' : 
                 formData.phases === '3' ? 'Typically 400V for three phase' : 
                 'Select nominal voltage'}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplyFrequency">Frequency (Hz)</Label>
                <Input
                  id="supplyFrequency"
                  value={formData.supplyFrequency || '50'}
                  onChange={(e) => onUpdate('supplyFrequency', e.target.value)}
                  placeholder="50"
                  className="h-11 text-base touch-manipulation border-white/10 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplyPME">Supply PME</Label>
                <Select value={formData.supplyPME || ''} onValueChange={handleSupplyPMEChange}>
                  <SelectTrigger className="h-11 touch-manipulation border-white/10 focus:border-purple-500 focus:ring-purple-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                    <SelectValue placeholder="Yes/No" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                {formData.supplyPME === 'yes' && formData.earthingArrangement === 'TN-C-S' && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    Correct - PME typically uses TN-C-S
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
            Main Protective Device
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mainProtectiveDevice">Main Protective Device *</Label>
              <Select 
                value={showCustomProtectiveDevice ? 'other' : (formData.mainProtectiveDevice || '')} 
                onValueChange={handleMainProtectiveDeviceChange}
              >
                <SelectTrigger className="h-11 touch-manipulation border-white/10 focus:border-purple-500 focus:ring-purple-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                  <SelectValue placeholder="Select protective device" />
                </SelectTrigger>
                <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
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
              <p className="text-xs text-muted-foreground mt-1">
                Common protective devices per BS 7671
              </p>
            </div>
            {showCustomProtectiveDevice && (
              <div className="space-y-2">
                <Label htmlFor="mainProtectiveDeviceCustomValue">Custom Device</Label>
                <Input
                  id="mainProtectiveDeviceCustomValue"
                  value={formData.mainProtectiveDevice || ''}
                  onChange={(e) => onUpdate('mainProtectiveDevice', e.target.value)}
                  placeholder="e.g. 125A BS 88 Fuse"
                  className="h-11 text-base touch-manipulation border-white/10 focus:border-purple-500 focus:ring-purple-500"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Include rating, type, and standard
                </p>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
            Earthing System
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="earthingArrangement">Earthing Arrangement *</Label>
              <Select value={formData.earthingArrangement || ''} onValueChange={(value) => onUpdate('earthingArrangement', value)}>
                <SelectTrigger className="h-11 touch-manipulation border-white/10 focus:border-purple-500 focus:ring-purple-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                  <SelectItem value="TN-S">TN-S</SelectItem>
                  <SelectItem value="TN-C-S">TN-C-S</SelectItem>
                  <SelectItem value="TT">TT</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                </SelectContent>
              </Select>
              {formData.earthingArrangement && (
                <p className="text-xs text-white/70 mt-1 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-white/70 block"></span>
                  {getEarthingInfo(formData.earthingArrangement)}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="earthElectrodeType">Earth Electrode Type</Label>
              <Select value={formData.earthElectrodeType || ''} onValueChange={(value) => onUpdate('earthElectrodeType', value)}>
                <SelectTrigger className="h-11 touch-manipulation border-white/10 focus:border-purple-500 focus:ring-purple-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                  <SelectItem value="rod">Rod</SelectItem>
                  <SelectItem value="tape">Tape</SelectItem>
                  <SelectItem value="plate">Plate</SelectItem>
                  <SelectItem value="structural">Structural Steel</SelectItem>
                  <SelectItem value="water-pipe">Water Pipe</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="n/a">N/A (TN-S/TN-C-S)</SelectItem>
                </SelectContent>
              </Select>
              {(formData.earthingArrangement === 'TN-S' || formData.earthingArrangement === 'TN-C-S') && (
                <p className="text-xs text-muted-foreground mt-1">
                  Usually N/A for TN systems
                </p>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
            RCD Protection
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rcdMainSwitch">RCD Main Switch</Label>
              <Select value={formData.rcdMainSwitch || ''} onValueChange={(value) => onUpdate('rcdMainSwitch', value)}>
                <SelectTrigger className="h-11 touch-manipulation border-white/10 focus:border-purple-500 focus:ring-purple-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                  <SelectValue placeholder="Yes/No" />
                </SelectTrigger>
                <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {showRCDFields && (
              <div className="space-y-2">
                <Label htmlFor="rcdRating">RCD Rating *</Label>
                <Select value={formData.rcdRating || ''} onValueChange={(value) => onUpdate('rcdRating', value)}>
                  <SelectTrigger className="h-11 touch-manipulation border-white/10 focus:border-purple-500 focus:ring-purple-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                    <SelectItem value="30mA">30mA</SelectItem>
                    <SelectItem value="100mA">100mA</SelectItem>
                    <SelectItem value="300mA">300mA</SelectItem>
                    <SelectItem value="500mA">500mA</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-400 block"></span>
                  30mA typical for domestic installations
                </p>
              </div>
            )}
          </div>
          
          {formData.rcdMainSwitch === 'no' && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800 font-medium">No RCD Main Switch</p>
                  <p className="text-xs text-amber-700 mt-1">
                    Consider if additional RCD protection is provided at circuit level for compliance with BS 7671
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

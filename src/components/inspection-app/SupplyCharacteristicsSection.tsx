
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
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
    <div className="eicr-section-card">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SectionHeader
          title="Supply & Earthing Characteristics"
          icon={Zap}
          isOpen={isOpen}
          color="purple-500"
        />
        <CollapsibleContent>
          <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">
        {/* DNO / Supply Authority Details */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
            Supply Authority
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dnoName">DNO (Distribution Network Operator)</Label>
              <MobileSelectPicker
                value={formData.dnoName || ''}
                onValueChange={(value) => onUpdate('dnoName', value)}
                options={[
                  { value: 'UK Power Networks', label: 'UK Power Networks' },
                  { value: 'Western Power Distribution', label: 'Western Power Distribution' },
                  { value: 'Scottish Power Energy Networks', label: 'Scottish Power Energy Networks' },
                  { value: 'Northern Powergrid', label: 'Northern Powergrid' },
                  { value: 'Electricity North West', label: 'Electricity North West' },
                  { value: 'SSE Networks', label: 'SSE Networks (SSEN)' },
                  { value: 'National Grid Electricity Distribution', label: 'National Grid Electricity Distribution' },
                  { value: 'other', label: 'Other' },
                ]}
                placeholder="Select DNO"
                title="DNO (Distribution Network Operator)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mpan">MPAN (Meter Point Admin Number)</Label>
              <Input
                id="mpan"
                value={formData.mpan || ''}
                onChange={(e) => onUpdate('mpan', e.target.value)}
                placeholder="e.g., 12 345 678 901 234"
                className="h-11 text-base touch-manipulation border-white/10 focus:border-purple-500 focus:ring-purple-500"
              />
              <p className="text-xs text-muted-foreground">Found on electricity bill (optional)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cutoutLocation">Cutout Location</Label>
              <Input
                id="cutoutLocation"
                value={formData.cutoutLocation || ''}
                onChange={(e) => onUpdate('cutoutLocation', e.target.value)}
                placeholder="e.g., Under stairs cupboard"
                className="h-11 text-base touch-manipulation border-white/10 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceEntry">Service Entry Point</Label>
              <Input
                id="serviceEntry"
                value={formData.serviceEntry || ''}
                onChange={(e) => onUpdate('serviceEntry', e.target.value)}
                placeholder="e.g., Front of property"
                className="h-11 text-base touch-manipulation border-white/10 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
            Supply Details
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phases">Number of Phases *</Label>
              <MobileSelectPicker
                value={formData.phases || ''}
                onValueChange={handlePhasesChange}
                options={[
                  { value: '1', label: 'Single Phase' },
                  { value: '3', label: 'Three Phase' },
                ]}
                placeholder="Select"
                title="Number of Phases"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplyVoltage">Supply Voltage *</Label>
              <MobileSelectPicker
                value={formData.supplyVoltage || ''}
                onValueChange={(value) => onUpdate('supplyVoltage', value)}
                options={[
                  { value: '230', label: '230V (Single Phase)' },
                  { value: '400', label: '400V (Three Phase)' },
                  { value: '230/400', label: '230/400V (Both)' },
                  { value: 'other', label: 'Other' },
                ]}
                placeholder="Select voltage"
                title="Supply Voltage"
              />
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
                <MobileSelectPicker
                  value={formData.supplyPME || ''}
                  onValueChange={handleSupplyPMEChange}
                  options={[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                  ]}
                  placeholder="Yes/No"
                  title="Supply PME"
                />
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
              <MobileSelectPicker
                value={showCustomProtectiveDevice ? 'other' : (formData.mainProtectiveDevice || '')}
                onValueChange={handleMainProtectiveDeviceChange}
                options={[
                  { value: '100A BS 88 Fuse', label: '100A BS 88 Fuse' },
                  { value: '80A BS 88 Fuse', label: '80A BS 88 Fuse' },
                  { value: '63A BS 88 Fuse', label: '63A BS 88 Fuse' },
                  { value: '32A BS 1361 Fuse', label: '32A BS 1361 Fuse' },
                  { value: '100A MCCB', label: '100A MCCB' },
                  { value: '80A MCCB', label: '80A MCCB' },
                  { value: '63A MCCB', label: '63A MCCB' },
                  { value: '100A MCB Type B', label: '100A MCB Type B' },
                  { value: '80A MCB Type B', label: '80A MCB Type B' },
                  { value: '63A MCB Type B', label: '63A MCB Type B' },
                  { value: '100A MCB Type C', label: '100A MCB Type C' },
                  { value: '80A MCB Type C', label: '80A MCB Type C' },
                  { value: '63A MCB Type C', label: '63A MCB Type C' },
                  { value: 'other', label: 'Other (specify)' },
                ]}
                placeholder="Select protective device"
                title="Main Protective Device"
              />
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
              <MobileSelectPicker
                value={formData.earthingArrangement || ''}
                onValueChange={(value) => onUpdate('earthingArrangement', value)}
                options={[
                  { value: 'TN-S', label: 'TN-S', description: 'Separate neutral and protective conductors' },
                  { value: 'TN-C-S', label: 'TN-C-S', description: 'Combined in supply, separate in installation (PME)' },
                  { value: 'TT', label: 'TT', description: 'Installation earth electrode independent of supply' },
                  { value: 'IT', label: 'IT', description: 'Isolated or impedance earthed supply' },
                ]}
                placeholder="Select"
                title="Earthing Arrangement"
              />
              {formData.earthingArrangement && (
                <p className="text-xs text-white/70 mt-1 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-white/70 block"></span>
                  {getEarthingInfo(formData.earthingArrangement)}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="earthElectrodeType">Earth Electrode Type</Label>
              <MobileSelectPicker
                value={formData.earthElectrodeType || ''}
                onValueChange={(value) => onUpdate('earthElectrodeType', value)}
                options={[
                  { value: 'rod', label: 'Rod' },
                  { value: 'tape', label: 'Tape' },
                  { value: 'plate', label: 'Plate' },
                  { value: 'structural', label: 'Structural Steel' },
                  { value: 'water-pipe', label: 'Water Pipe' },
                  { value: 'other', label: 'Other' },
                  { value: 'n/a', label: 'N/A (TN-S/TN-C-S)' },
                ]}
                placeholder="Select"
                title="Earth Electrode Type"
              />
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
              <MobileSelectPicker
                value={formData.rcdMainSwitch || ''}
                onValueChange={(value) => onUpdate('rcdMainSwitch', value)}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ]}
                placeholder="Yes/No"
                title="RCD Main Switch"
              />
            </div>
            {showRCDFields && (
              <div className="space-y-2">
                <Label htmlFor="rcdRating">RCD Rating *</Label>
                <MobileSelectPicker
                  value={formData.rcdRating || ''}
                  onValueChange={(value) => onUpdate('rcdRating', value)}
                  options={[
                    { value: '30mA', label: '30mA' },
                    { value: '100mA', label: '100mA' },
                    { value: '300mA', label: '300mA' },
                    { value: '500mA', label: '500mA' },
                  ]}
                  placeholder="Select rating"
                  title="RCD Rating"
                />
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
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SupplyCharacteristicsSection;

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { SectionHeader } from '@/components/ui/section-header';
import { Shield, Zap } from 'lucide-react';
import {
  protectiveDeviceTypes,
  protectiveDeviceRatings,
  cableTypeOptions,
  referenceMethodOptions
} from '@/types/enhancedCircuitTypes';
import { cableSizeOptions } from '@/types/cableTypes';

interface SmartCircuitDetailsProps {
  formData: any;
  handleUpdate: (field: string, value: any) => void;
  openSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
  installationMethods: Array<{ value: string; label: string }>;
}

export const SmartCircuitDetails: React.FC<SmartCircuitDetailsProps> = ({
  formData,
  handleUpdate,
  openSections,
  toggleSection,
  installationMethods,
}) => {
  return (
    <Card className="overflow-hidden bg-card border border-border">
      <Collapsible open={openSections.circuit} onOpenChange={() => toggleSection('circuit')}>
        <SectionHeader 
          title="Part 4: Circuit Details & Protection" 
          icon={Shield}
          isOpen={openSections.circuit}
          color="blue-500"
        />
        <CollapsibleContent>
          <CardContent className="space-y-6 pt-6">
            
            {/* Basic Circuit Information */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="distributionBoard">Distribution Board</Label>
                <Input
                  id="distributionBoard"
                  placeholder="e.g., DB1, Main Board"
                  value={formData.distributionBoard}
                  onChange={(e) => handleUpdate('distributionBoard', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="circuitDesignation">Circuit Designation *</Label>
                <Input
                  id="circuitDesignation"
                  placeholder="e.g., C1, L1"
                  value={formData.circuitDesignation}
                  onChange={(e) => handleUpdate('circuitDesignation', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="circuitDescription">Circuit Description</Label>
                <Input
                  id="circuitDescription"
                  placeholder="e.g., Kitchen sockets"
                  value={formData.circuitDescription}
                  onChange={(e) => handleUpdate('circuitDescription', e.target.value)}
                />
              </div>
            </div>

            <Separator />

            {/* Protective Device Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <Label className="text-sm font-medium">Protective Device</Label>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="protectiveDeviceType">Type *</Label>
                  <MobileSelectPicker
                    value={formData.protectiveDeviceType}
                    onValueChange={(value) => handleUpdate('protectiveDeviceType', value)}
                    options={protectiveDeviceTypes.map(device => ({
                      value: device.value,
                      label: `${device.label} - ${device.description}`,
                    }))}
                    placeholder="Select type"
                    title="Protective Device Type"
                  />
                </div>

                <div>
                  <Label htmlFor="protectiveDeviceRating">Rating (A) *</Label>
                  <MobileSelectPicker
                    value={formData.protectiveDeviceRating}
                    onValueChange={(value) => handleUpdate('protectiveDeviceRating', value)}
                    options={protectiveDeviceRatings.map(rating => ({
                      value: rating.value,
                      label: `${rating.label} (${rating.typical.join(', ')})`,
                    }))}
                    placeholder="Rating"
                    title="Protective Device Rating"
                  />
                </div>

                <div>
                  <Label htmlFor="protectiveDeviceKaRating">Short Circuit Capacity (kA)</Label>
                  <MobileSelectPicker
                    value={formData.protectiveDeviceKaRating}
                    onValueChange={(value) => handleUpdate('protectiveDeviceKaRating', value)}
                    options={[
                      { value: '6', label: '6kA' },
                      { value: '10', label: '10kA' },
                      { value: '16', label: '16kA' },
                    ]}
                    placeholder="kA Rating"
                    title="Short Circuit Capacity"
                  />
                </div>
              </div>
              
              {/* Protection checkboxes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="flex items-center space-x-3 p-4 min-h-[48px] rounded-lg bg-card/50">
                  <Checkbox
                    id="protectionRcd"
                    checked={formData.protectionRcd}
                    onCheckedChange={(checked) => handleUpdate('protectionRcd', checked)}
                    className="border-white/50 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                  />
                  <Label htmlFor="protectionRcd" className="text-base md:text-sm font-medium cursor-pointer">RCD Protected</Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 min-h-[48px] rounded-lg bg-card/50">
                  <Checkbox
                    id="protectionRcbo"
                    checked={formData.protectionRcbo}
                    onCheckedChange={(checked) => handleUpdate('protectionRcbo', checked)}
                    className="border-white/50 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                  />
                  <Label htmlFor="protectionRcbo" className="text-base md:text-sm font-medium cursor-pointer">RCBO</Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 min-h-[48px] rounded-lg bg-card/50">
                  <Checkbox
                    id="protectionAfdd"
                    checked={formData.protectionAfdd}
                    onCheckedChange={(checked) => handleUpdate('protectionAfdd', checked)}
                    className="border-white/50 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                  />
                  <Label htmlFor="protectionAfdd" className="text-base md:text-sm font-medium cursor-pointer">AFDD</Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 min-h-[48px] rounded-lg bg-card/50">
                  <Checkbox
                    id="protectionSpd"
                    checked={formData.protectionSpd}
                    onCheckedChange={(checked) => handleUpdate('protectionSpd', checked)}
                    className="border-white/50 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                  />
                  <Label htmlFor="protectionSpd" className="text-base md:text-sm font-medium cursor-pointer">SPD</Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Cable & Conductor Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                <Label className="text-sm font-medium">Cable & Conductors</Label>
              </div>
              
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <div>
                  <Label htmlFor="liveConductorSize" className="text-sm font-semibold">Live Conductor (mm²) *</Label>
                  <MobileSelectPicker
                    value={formData.liveConductorSize}
                    onValueChange={(value) => handleUpdate('liveConductorSize', value)}
                    options={cableSizeOptions.map(size => ({
                      value: size.value.replace('mm', ''),
                      label: size.label,
                    }))}
                    placeholder="Select size"
                    title="Live Conductor Size"
                  />
                </div>

                <div>
                  <Label htmlFor="cpcSize" className="text-sm font-semibold">CPC Size (mm²) *</Label>
                  <MobileSelectPicker
                    value={formData.cpcSize}
                    onValueChange={(value) => handleUpdate('cpcSize', value)}
                    options={cableSizeOptions.map(size => ({
                      value: size.value.replace('mm', ''),
                      label: size.label,
                    }))}
                    placeholder="Select size"
                    title="CPC Size"
                  />
                </div>

                <div>
                  <Label htmlFor="cableType" className="text-sm font-semibold">Cable Type *</Label>
                  <MobileSelectPicker
                    value={formData.cableType}
                    onValueChange={(value) => handleUpdate('cableType', value)}
                    options={cableTypeOptions.map(cable => ({
                      value: cable.value,
                      label: `${cable.label} - ${cable.description}`,
                    }))}
                    placeholder="Select type"
                    title="Cable Type"
                  />
                </div>

                <div>
                  <Label htmlFor="installationMethod" className="text-sm font-semibold">Installation Method</Label>
                  <MobileSelectPicker
                    value={formData.installationMethod}
                    onValueChange={(value) => handleUpdate('installationMethod', value)}
                    options={installationMethods.map(method => ({
                      value: method.value,
                      label: method.label,
                    }))}
                    placeholder="Method"
                    title="Installation Method"
                  />
                </div>
              </div>
            </div>

            {/* Reference Method */}
            <div>
              <Label htmlFor="referenceMethod">Reference Method (for rating) *</Label>
              <MobileSelectPicker
                value={formData.referenceMethod}
                onValueChange={(value) => handleUpdate('referenceMethod', value)}
                options={referenceMethodOptions.map(method => ({
                  value: method.value,
                  label: `${method.label} - ${method.description}`,
                }))}
                placeholder="Select method"
                title="Reference Method"
              />
            </div>

          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
                  <Select value={formData.protectiveDeviceType} onValueChange={(value) => handleUpdate('protectiveDeviceType', value)}>
                    <SelectTrigger className="justify-start text-left">
                      <SelectValue placeholder="Select type" className="text-left" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-50">
                      {protectiveDeviceTypes.map(device => (
                        <SelectItem key={device.value} value={device.value} className="text-left">
                          <div className="text-left">
                            <div className="font-medium">{device.label}</div>
                            <div className="text-xs text-muted-foreground">{device.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="protectiveDeviceRating">Rating (A) *</Label>
                  <Select value={formData.protectiveDeviceRating} onValueChange={(value) => handleUpdate('protectiveDeviceRating', value)}>
                    <SelectTrigger className="justify-start text-left">
                      <SelectValue placeholder="Rating" className="text-left" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-50">
                      {protectiveDeviceRatings.map(rating => (
                        <SelectItem key={rating.value} value={rating.value} className="text-left">
                          <div className="text-left">
                            <div className="font-medium">{rating.label}</div>
                            <div className="text-xs text-muted-foreground">
                              Typical: {rating.typical.join(', ')}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="protectiveDeviceKaRating">Short Circuit Capacity (kA)</Label>
                  <Select value={formData.protectiveDeviceKaRating} onValueChange={(value) => handleUpdate('protectiveDeviceKaRating', value)}>
                    <SelectTrigger className="justify-start text-left">
                      <SelectValue placeholder="kA Rating" className="text-left" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-50">
                      <SelectItem value="6" className="text-left">6kA</SelectItem>
                      <SelectItem value="10" className="text-left">10kA</SelectItem>
                      <SelectItem value="16" className="text-left">16kA</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Select value={formData.liveConductorSize} onValueChange={(value) => handleUpdate('liveConductorSize', value)}>
                    <SelectTrigger className="justify-start text-left h-12 min-h-[48px]">
                      <SelectValue placeholder="Select size" className="text-left" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-50">
                      {cableSizeOptions.map(size => (
                        <SelectItem key={size.value} value={size.value.replace('mm', '')} className="text-left">
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="cpcSize" className="text-sm font-semibold">CPC Size (mm²) *</Label>
                  <Select value={formData.cpcSize} onValueChange={(value) => handleUpdate('cpcSize', value)}>
                    <SelectTrigger className="justify-start text-left h-12 min-h-[48px]">
                      <SelectValue placeholder="Select size" className="text-left" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-50">
                      {cableSizeOptions.map(size => (
                        <SelectItem key={size.value} value={size.value.replace('mm', '')} className="text-left">
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="cableType" className="text-sm font-semibold">Cable Type *</Label>
                  <Select value={formData.cableType} onValueChange={(value) => handleUpdate('cableType', value)}>
                    <SelectTrigger className="justify-start text-left h-12 min-h-[48px]">
                      <SelectValue placeholder="Select type" className="text-left" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-50">
                      {cableTypeOptions.map(cable => (
                        <SelectItem key={cable.value} value={cable.value} className="text-left">
                          <div className="text-left">
                            <div className="font-medium">{cable.label}</div>
                            <div className="text-xs text-muted-foreground">{cable.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="installationMethod" className="text-sm font-semibold">Installation Method</Label>
                  <Select value={formData.installationMethod} onValueChange={(value) => handleUpdate('installationMethod', value)}>
                    <SelectTrigger className="justify-start text-left h-12 min-h-[48px]">
                      <SelectValue placeholder="Method" className="text-left" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-50">
                      {installationMethods.map(method => (
                        <SelectItem key={method.value} value={method.value} className="text-left">{method.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Reference Method */}
            <div>
              <Label htmlFor="referenceMethod">Reference Method (for rating) *</Label>
              <Select value={formData.referenceMethod} onValueChange={(value) => handleUpdate('referenceMethod', value)}>
                <SelectTrigger className="justify-start text-left">
                  <SelectValue placeholder="Select method" className="text-left" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-50">
                  {referenceMethodOptions.map(method => (
                    <SelectItem key={method.value} value={method.value} className="text-left">
                      <div className="text-left">
                        <div className="font-medium">{method.label}</div>
                        <div className="text-xs text-muted-foreground">{method.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
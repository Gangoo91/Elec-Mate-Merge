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
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <Label htmlFor="overcurrentDeviceBsEn">BS (EN) Standard</Label>
                  <Select value={formData.overcurrentDeviceBsEn} onValueChange={(value) => handleUpdate('overcurrentDeviceBsEn', value)}>
                    <SelectTrigger className="justify-start text-left h-11 touch-manipulation">
                      <SelectValue placeholder="Select standard" className="text-left" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-50">
                      <SelectItem value="BS EN 60898" className="text-left">BS EN 60898</SelectItem>
                      <SelectItem value="BS EN 61009" className="text-left">BS EN 61009</SelectItem>
                      <SelectItem value="BS 3036" className="text-left">BS 3036</SelectItem>
                      <SelectItem value="BS 1361" className="text-left">BS 1361</SelectItem>
                      <SelectItem value="BS 88" className="text-left">BS 88</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="protectiveDeviceType">Type *</Label>
                  <Select value={formData.protectiveDeviceType} onValueChange={(value) => handleUpdate('protectiveDeviceType', value)}>
                    <SelectTrigger className="justify-start text-left h-11 touch-manipulation">
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
                    <SelectTrigger className="justify-start text-left h-11 touch-manipulation">
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
                    <SelectTrigger className="justify-start text-left h-11 touch-manipulation">
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
                    className="h-5 w-5 border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow touch-manipulation"
                  />
                  <Label htmlFor="protectionRcd" className="text-base md:text-sm font-medium cursor-pointer">RCD Protected</Label>
                </div>

                <div className="flex items-center space-x-3 p-4 min-h-[48px] rounded-lg bg-card/50">
                  <Checkbox
                    id="protectionRcbo"
                    checked={formData.protectionRcbo}
                    onCheckedChange={(checked) => handleUpdate('protectionRcbo', checked)}
                    className="h-5 w-5 border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow touch-manipulation"
                  />
                  <Label htmlFor="protectionRcbo" className="text-base md:text-sm font-medium cursor-pointer">RCBO</Label>
                </div>

                <div className="flex items-center space-x-3 p-4 min-h-[48px] rounded-lg bg-card/50">
                  <Checkbox
                    id="protectionAfdd"
                    checked={formData.protectionAfdd}
                    onCheckedChange={(checked) => handleUpdate('protectionAfdd', checked)}
                    className="h-5 w-5 border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow touch-manipulation"
                  />
                  <Label htmlFor="protectionAfdd" className="text-base md:text-sm font-medium cursor-pointer">AFDD</Label>
                </div>

                <div className="flex items-center space-x-3 p-4 min-h-[48px] rounded-lg bg-card/50">
                  <Checkbox
                    id="protectionSpd"
                    checked={formData.protectionSpd}
                    onCheckedChange={(checked) => handleUpdate('protectionSpd', checked)}
                    className="h-5 w-5 border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow touch-manipulation"
                  />
                  <Label htmlFor="protectionSpd" className="text-base md:text-sm font-medium cursor-pointer">SPD</Label>
                </div>
              </div>

              {/* RCD Details - IET Required */}
              {(formData.protectionRcd || formData.protectionRcbo) && (
                <div className="mt-4 p-4 bg-blue-50/30 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <Label className="text-sm font-medium">RCD Details (IET Required)</Label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="rcdBsEn" className="text-sm font-medium">BS (EN) Standard</Label>
                      <Select value={formData.rcdBsEn} onValueChange={(value) => handleUpdate('rcdBsEn', value)}>
                        <SelectTrigger className="justify-start text-left h-11 touch-manipulation">
                          <SelectValue placeholder="Select" className="text-left" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border z-50">
                          <SelectItem value="BS EN 61008" className="text-left">BS EN 61008</SelectItem>
                          <SelectItem value="BS EN 61009" className="text-left">BS EN 61009</SelectItem>
                          <SelectItem value="BS EN 62423" className="text-left">BS EN 62423</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="rcdType" className="text-sm font-medium">Type</Label>
                      <Select value={formData.rcdType} onValueChange={(value) => handleUpdate('rcdType', value)}>
                        <SelectTrigger className="justify-start text-left h-11 touch-manipulation">
                          <SelectValue placeholder="Select" className="text-left" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border z-50">
                          <SelectItem value="AC" className="text-left">Type AC</SelectItem>
                          <SelectItem value="A" className="text-left">Type A</SelectItem>
                          <SelectItem value="F" className="text-left">Type F</SelectItem>
                          <SelectItem value="B" className="text-left">Type B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="rcdRatingAmps" className="text-sm font-medium">Rating (A)</Label>
                      <Input
                        id="rcdRatingAmps"
                        type="number"
                        placeholder="e.g., 63"
                        value={formData.rcdRatingAmps || ''}
                        onChange={(e) => handleUpdate('rcdRatingAmps', e.target.value)}
                        className="h-11 touch-manipulation text-base"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rcdIdn" className="text-sm font-medium">IΔn (mA)</Label>
                      <Select value={formData.rcdIdn} onValueChange={(value) => handleUpdate('rcdIdn', value)}>
                        <SelectTrigger className="justify-start text-left h-11 touch-manipulation">
                          <SelectValue placeholder="Select" className="text-left" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border z-50">
                          <SelectItem value="10" className="text-left">10mA</SelectItem>
                          <SelectItem value="30" className="text-left">30mA</SelectItem>
                          <SelectItem value="100" className="text-left">100mA</SelectItem>
                          <SelectItem value="300" className="text-left">300mA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* AFDD Details - IET Required */}
              {formData.protectionAfdd && (
                <div className="mt-4 p-4 bg-purple-50/30 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <Label className="text-sm font-medium">AFDD Details (IET Required)</Label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="afddBsEn" className="text-sm font-medium">BS (EN) Standard</Label>
                      <Select value={formData.afddBsEn} onValueChange={(value) => handleUpdate('afddBsEn', value)}>
                        <SelectTrigger className="justify-start text-left h-11 touch-manipulation">
                          <SelectValue placeholder="Select" className="text-left" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border z-50">
                          <SelectItem value="BS EN 62606" className="text-left">BS EN 62606</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="afddRating" className="text-sm font-medium">Rating (A)</Label>
                      <Input
                        id="afddRating"
                        type="number"
                        placeholder="e.g., 16"
                        value={formData.afddRating || ''}
                        onChange={(e) => handleUpdate('afddRating', e.target.value)}
                        className="h-11 touch-manipulation text-base"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SPD Details - IET Required */}
              {formData.protectionSpd && (
                <div className="mt-4 p-4 bg-green-50/30 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <Label className="text-sm font-medium">SPD Details (IET Required)</Label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="spdBsEn" className="text-sm font-medium">BS (EN) Standard</Label>
                      <Select value={formData.spdBsEn} onValueChange={(value) => handleUpdate('spdBsEn', value)}>
                        <SelectTrigger className="justify-start text-left h-11 touch-manipulation">
                          <SelectValue placeholder="Select" className="text-left" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border z-50">
                          <SelectItem value="BS EN 61643-11" className="text-left">BS EN 61643-11</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="spdType" className="text-sm font-medium">Type</Label>
                      <Select value={formData.spdType} onValueChange={(value) => handleUpdate('spdType', value)}>
                        <SelectTrigger className="justify-start text-left h-11 touch-manipulation">
                          <SelectValue placeholder="Select" className="text-left" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border z-50">
                          <SelectItem value="1" className="text-left">Type 1</SelectItem>
                          <SelectItem value="2" className="text-left">Type 2</SelectItem>
                          <SelectItem value="3" className="text-left">Type 3</SelectItem>
                          <SelectItem value="1+2" className="text-left">Type 1+2</SelectItem>
                          <SelectItem value="2+3" className="text-left">Type 2+3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
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
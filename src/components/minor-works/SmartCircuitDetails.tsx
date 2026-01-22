import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { SectionHeader } from '@/components/ui/section-header';
import { Shield } from 'lucide-react';
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
                <div className="space-y-2">
                  <Label htmlFor="protectiveDeviceType">Type *</Label>
                  <Select value={formData.protectiveDeviceType} onValueChange={(value) => handleUpdate('protectiveDeviceType', value)}>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {protectiveDeviceTypes.map((d) => (
                        <SelectItem key={d.value} value={d.value}>
                          <div className="flex flex-col">
                            <span>{d.label}</span>
                            {d.description && (
                              <span className="text-xs text-white/50">{d.description}</span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="protectiveDeviceRating">Rating (A) *</Label>
                  <Select value={formData.protectiveDeviceRating} onValueChange={(value) => handleUpdate('protectiveDeviceRating', value)}>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {protectiveDeviceRatings.map((r) => (
                        <SelectItem key={r.value} value={r.value}>
                          <div className="flex flex-col">
                            <span>{r.label}</span>
                            <span className="text-xs text-white/50">Typical: {r.typical.join(', ')}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="protectiveDeviceKaRating">Short Circuit Capacity (kA)</Label>
                  <Select value={formData.protectiveDeviceKaRating} onValueChange={(value) => handleUpdate('protectiveDeviceKaRating', value)}>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                      <SelectValue placeholder="kA Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">
                        <div className="flex flex-col">
                          <span>6kA</span>
                          <span className="text-xs text-white/50">Standard domestic</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="10">
                        <div className="flex flex-col">
                          <span>10kA</span>
                          <span className="text-xs text-white/50">Enhanced domestic/light commercial</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="16">
                        <div className="flex flex-col">
                          <span>16kA</span>
                          <span className="text-xs text-white/50">Commercial</span>
                        </div>
                      </SelectItem>
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
                    className="border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                  />
                  <Label htmlFor="protectionRcd" className="text-base md:text-sm font-medium cursor-pointer">RCD Protected</Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 min-h-[48px] rounded-lg bg-card/50">
                  <Checkbox
                    id="protectionRcbo"
                    checked={formData.protectionRcbo}
                    onCheckedChange={(checked) => handleUpdate('protectionRcbo', checked)}
                    className="border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                  />
                  <Label htmlFor="protectionRcbo" className="text-base md:text-sm font-medium cursor-pointer">RCBO</Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 min-h-[48px] rounded-lg bg-card/50">
                  <Checkbox
                    id="protectionAfdd"
                    checked={formData.protectionAfdd}
                    onCheckedChange={(checked) => handleUpdate('protectionAfdd', checked)}
                    className="border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                  />
                  <Label htmlFor="protectionAfdd" className="text-base md:text-sm font-medium cursor-pointer">AFDD</Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 min-h-[48px] rounded-lg bg-card/50">
                  <Checkbox
                    id="protectionSpd"
                    checked={formData.protectionSpd}
                    onCheckedChange={(checked) => handleUpdate('protectionSpd', checked)}
                    className="border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
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
                <div className="space-y-2">
                  <Label htmlFor="liveConductorSize" className="text-sm font-semibold">Live Conductor (mm²) *</Label>
                  <Select value={formData.liveConductorSize} onValueChange={(value) => handleUpdate('liveConductorSize', value)}>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {cableSizeOptions.map((s) => (
                        <SelectItem key={s.value.replace('mm', '')} value={s.value.replace('mm', '')}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpcSize" className="text-sm font-semibold">CPC Size (mm²) *</Label>
                  <Select value={formData.cpcSize} onValueChange={(value) => handleUpdate('cpcSize', value)}>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {cableSizeOptions.map((s) => (
                        <SelectItem key={s.value.replace('mm', '')} value={s.value.replace('mm', '')}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cableType" className="text-sm font-semibold">Cable Type *</Label>
                  <Select value={formData.cableType} onValueChange={(value) => handleUpdate('cableType', value)}>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {cableTypeOptions.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          <div className="flex flex-col">
                            <span>{c.label}</span>
                            {c.description && (
                              <span className="text-xs text-white/50">{c.description}</span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="installationMethod" className="text-sm font-semibold">Installation Method</Label>
                  <Select value={formData.installationMethod} onValueChange={(value) => handleUpdate('installationMethod', value)}>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent>
                      {installationMethods.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Reference Method */}
            <div className="space-y-2">
              <Label htmlFor="referenceMethod">Reference Method (for rating) *</Label>
              <Select value={formData.referenceMethod} onValueChange={(value) => handleUpdate('referenceMethod', value)}>
                <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-base">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {referenceMethodOptions.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      <div className="flex flex-col">
                        <span>{m.label}</span>
                        {m.description && (
                          <span className="text-xs text-white/50">{m.description}</span>
                        )}
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
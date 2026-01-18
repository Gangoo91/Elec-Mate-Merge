import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CircuitBoard, Shield, Cable } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MWCircuitTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const MWCircuitTab: React.FC<MWCircuitTabProps> = ({ formData, onUpdate }) => {
  const [openSections, setOpenSections] = useState({
    circuit: true,
    protection: true,
    cable: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getCompletionPercentage = (section: string) => {
    switch (section) {
      case 'circuit': {
        const fields = ['circuitDesignation'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'protection': {
        const fields = ['protectiveDeviceType', 'protectiveDeviceRating'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'cable': {
        const fields = ['liveConductorSize'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Circuit Details */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.circuit} onOpenChange={() => toggleSection('circuit')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Circuit Details"
              icon={CircuitBoard}
              isOpen={openSections.circuit}
              color="purple-500"
              completionPercentage={getCompletionPercentage('circuit')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Distribution Board</Label>
                  <Input
                    value={formData.distributionBoard || ''}
                    onChange={(e) => onUpdate('distributionBoard', e.target.value)}
                    placeholder="e.g., Main DB, Sub DB"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Circuit Designation *</Label>
                  <Input
                    value={formData.circuitDesignation || ''}
                    onChange={(e) => onUpdate('circuitDesignation', e.target.value)}
                    placeholder="e.g., Circuit 1, MCB 5"
                    className={cn("h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500", !formData.circuitDesignation && "border-red-500/50")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Circuit Description</Label>
                <Input
                  value={formData.circuitDescription || ''}
                  onChange={(e) => onUpdate('circuitDescription', e.target.value)}
                  placeholder="e.g., Kitchen sockets, Lighting circuit"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Protective Device */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.protection} onOpenChange={() => toggleSection('protection')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Protective Device"
              icon={Shield}
              isOpen={openSections.protection}
              color="red-500"
              completionPercentage={getCompletionPercentage('protection')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">BS (EN) Standard</Label>
                  <Select value={formData.overcurrentDeviceBsEn || ''} onValueChange={(v) => onUpdate('overcurrentDeviceBsEn', v)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-red-500 focus:ring-red-500">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="BS EN 60898">BS EN 60898</SelectItem>
                      <SelectItem value="BS EN 61009">BS EN 61009</SelectItem>
                      <SelectItem value="BS 3036">BS 3036</SelectItem>
                      <SelectItem value="BS 1361">BS 1361</SelectItem>
                      <SelectItem value="BS 88">BS 88</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Device Type *</Label>
                  <Select value={formData.protectiveDeviceType || ''} onValueChange={(v) => onUpdate('protectiveDeviceType', v)}>
                    <SelectTrigger className={cn("h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-red-500 focus:ring-red-500", !formData.protectiveDeviceType && "border-red-500/50")}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="mcb-type-b">MCB Type B</SelectItem>
                      <SelectItem value="mcb-type-c">MCB Type C</SelectItem>
                      <SelectItem value="mcb-type-d">MCB Type D</SelectItem>
                      <SelectItem value="rcbo-type-a">RCBO Type A</SelectItem>
                      <SelectItem value="rcbo-type-ac">RCBO Type AC</SelectItem>
                      <SelectItem value="fuse-bs88">Fuse BS88</SelectItem>
                      <SelectItem value="fuse-bs3036">Fuse BS3036</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Rating (A) *</Label>
                  <Select value={formData.protectiveDeviceRating || ''} onValueChange={(v) => onUpdate('protectiveDeviceRating', v)}>
                    <SelectTrigger className={cn("h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-red-500 focus:ring-red-500", !formData.protectiveDeviceRating && "border-red-500/50")}>
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="6">6A</SelectItem>
                      <SelectItem value="10">10A</SelectItem>
                      <SelectItem value="16">16A</SelectItem>
                      <SelectItem value="20">20A</SelectItem>
                      <SelectItem value="25">25A</SelectItem>
                      <SelectItem value="32">32A</SelectItem>
                      <SelectItem value="40">40A</SelectItem>
                      <SelectItem value="50">50A</SelectItem>
                      <SelectItem value="63">63A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Breaking Capacity (kA)</Label>
                  <Select value={formData.protectiveDeviceKaRating || ''} onValueChange={(v) => onUpdate('protectiveDeviceKaRating', v)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-red-500 focus:ring-red-500">
                      <SelectValue placeholder="kA rating" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="3">3kA</SelectItem>
                      <SelectItem value="6">6kA</SelectItem>
                      <SelectItem value="10">10kA</SelectItem>
                      <SelectItem value="15">15kA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Protection Types */}
              <div className="space-y-3">
                <Label className="text-sm">Additional Protection</Label>
                <div className="flex flex-wrap gap-4">
                  {[
                    { id: 'protectionRcd', label: 'RCD' },
                    { id: 'protectionRcbo', label: 'RCBO' },
                    { id: 'protectionAfdd', label: 'AFDD' },
                    { id: 'protectionSpd', label: 'SPD' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center gap-2 p-3 min-h-[44px] rounded-lg bg-card/50">
                      <Checkbox
                        id={item.id}
                        checked={formData[item.id] || false}
                        onCheckedChange={(c) => onUpdate(item.id, c)}
                        className="h-5 w-5 border-white/40 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 touch-manipulation"
                      />
                      <Label htmlFor={item.id} className="text-sm cursor-pointer">{item.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* RCD Details - IET Required */}
              {(formData.protectionRcd || formData.protectionRcbo) && (
                <div className="p-4 bg-blue-50/30 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <Label className="text-sm font-medium">RCD Details (IET Required)</Label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">BS (EN) Standard</Label>
                      <Select value={formData.rcdBsEn || ''} onValueChange={(v) => onUpdate('rcdBsEn', v)}>
                        <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                          <SelectItem value="BS EN 61008">BS EN 61008</SelectItem>
                          <SelectItem value="BS EN 61009">BS EN 61009</SelectItem>
                          <SelectItem value="BS EN 62423">BS EN 62423</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Type</Label>
                      <Select value={formData.rcdType || ''} onValueChange={(v) => onUpdate('rcdType', v)}>
                        <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                          <SelectItem value="AC">Type AC</SelectItem>
                          <SelectItem value="A">Type A</SelectItem>
                          <SelectItem value="F">Type F</SelectItem>
                          <SelectItem value="B">Type B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Rating (A)</Label>
                      <Input
                        type="number"
                        value={formData.rcdRatingAmps || ''}
                        onChange={(e) => onUpdate('rcdRatingAmps', e.target.value)}
                        placeholder="e.g., 63"
                        className="h-11 text-base touch-manipulation border-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">IΔn (mA)</Label>
                      <Select value={formData.rcdIdn || ''} onValueChange={(v) => onUpdate('rcdIdn', v)}>
                        <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                          <SelectItem value="10">10mA</SelectItem>
                          <SelectItem value="30">30mA</SelectItem>
                          <SelectItem value="100">100mA</SelectItem>
                          <SelectItem value="300">300mA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* AFDD Details - IET Required */}
              {formData.protectionAfdd && (
                <div className="p-4 bg-purple-50/30 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <Label className="text-sm font-medium">AFDD Details (IET Required)</Label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">BS (EN) Standard</Label>
                      <Select value={formData.afddBsEn || ''} onValueChange={(v) => onUpdate('afddBsEn', v)}>
                        <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                          <SelectItem value="BS EN 62606">BS EN 62606</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Rating (A)</Label>
                      <Input
                        type="number"
                        value={formData.afddRating || ''}
                        onChange={(e) => onUpdate('afddRating', e.target.value)}
                        placeholder="e.g., 16"
                        className="h-11 text-base touch-manipulation border-white/30"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SPD Details - IET Required */}
              {formData.protectionSpd && (
                <div className="p-4 bg-green-50/30 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <Label className="text-sm font-medium">SPD Details (IET Required)</Label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">BS (EN) Standard</Label>
                      <Select value={formData.spdBsEn || ''} onValueChange={(v) => onUpdate('spdBsEn', v)}>
                        <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                          <SelectItem value="BS EN 61643-11">BS EN 61643-11</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Type</Label>
                      <Select value={formData.spdType || ''} onValueChange={(v) => onUpdate('spdType', v)}>
                        <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                          <SelectItem value="1">Type 1</SelectItem>
                          <SelectItem value="2">Type 2</SelectItem>
                          <SelectItem value="3">Type 3</SelectItem>
                          <SelectItem value="1+2">Type 1+2</SelectItem>
                          <SelectItem value="2+3">Type 2+3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Cable & Installation */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.cable} onOpenChange={() => toggleSection('cable')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Cable & Installation"
              icon={Cable}
              isOpen={openSections.cable}
              color="green-500"
              completionPercentage={getCompletionPercentage('cable')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Live Conductor Size *</Label>
                  <Select value={formData.liveConductorSize || ''} onValueChange={(v) => onUpdate('liveConductorSize', v)}>
                    <SelectTrigger className={cn("h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-green-500 focus:ring-green-500", !formData.liveConductorSize && "border-red-500/50")}>
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="1.0">1.0mm2</SelectItem>
                      <SelectItem value="1.5">1.5mm2</SelectItem>
                      <SelectItem value="2.5">2.5mm2</SelectItem>
                      <SelectItem value="4.0">4.0mm2</SelectItem>
                      <SelectItem value="6.0">6.0mm2</SelectItem>
                      <SelectItem value="10.0">10.0mm2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">CPC Size</Label>
                  <Select value={formData.cpcSize || ''} onValueChange={(v) => onUpdate('cpcSize', v)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="1.0">1.0mm2</SelectItem>
                      <SelectItem value="1.5">1.5mm2</SelectItem>
                      <SelectItem value="2.5">2.5mm2</SelectItem>
                      <SelectItem value="4.0">4.0mm2</SelectItem>
                      <SelectItem value="6.0">6.0mm2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Cable Type</Label>
                  <Select value={formData.cableType || ''} onValueChange={(v) => onUpdate('cableType', v)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="twin-earth">Twin & Earth</SelectItem>
                      <SelectItem value="swa">SWA</SelectItem>
                      <SelectItem value="flex">Flex</SelectItem>
                      <SelectItem value="singles">Singles</SelectItem>
                      <SelectItem value="micc">MICC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Installation Method</Label>
                  <Select value={formData.installationMethod || ''} onValueChange={(v) => onUpdate('installationMethod', v)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="Method" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="clipped-direct">Clipped Direct</SelectItem>
                      <SelectItem value="conduit">In Conduit</SelectItem>
                      <SelectItem value="trunking">In Trunking</SelectItem>
                      <SelectItem value="buried">Buried</SelectItem>
                      <SelectItem value="thermally-insulated">Thermally Insulated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Reference Method</Label>
                  <Input
                    value={formData.referenceMethod || ''}
                    onChange={(e) => onUpdate('referenceMethod', e.target.value)}
                    placeholder="e.g., A, B, C"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default MWCircuitTab;

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';
import { Cable } from 'lucide-react';
import { cableSizeOptions } from '@/types/cableTypes';

interface EICElectricalInstallationSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const EICElectricalInstallationSection = ({ formData, onUpdate, isOpen, onToggle }: EICElectricalInstallationSectionProps) => {
  const hasRCDProtection = formData.rcdMainSwitch === 'yes' || formData.rcdMainSwitch === 'rcbo';
  const showRCDFields = formData.rcdMainSwitch && formData.rcdMainSwitch !== 'no';

  const handleRCDMainSwitchChange = (value: string) => {
    onUpdate('rcdMainSwitch', value);
    
    // Clear RCD fields when "No" is selected
    if (value === 'no') {
      onUpdate('rcdRating', '');
      onUpdate('rcdType', '');
    }
  };

  return (
    <Card className="border border-border bg-card overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <SectionHeader 
          title="Electrical Installation Details" 
          icon={Cable}
          isOpen={isOpen}
          color="amber-500"
        />
        <CollapsibleContent>
          <CardContent className="space-y-6 p-4 sm:p-6">
        {/* Main Protective Device */}
        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-elec-gray pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
            Main Protective Device
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="mainProtectiveDevice" className="font-medium text-sm">Device Type *</Label>
              <Select value={formData.mainProtectiveDevice || ''} onValueChange={(value) => onUpdate('mainProtectiveDevice', value)}>
                <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                  <SelectItem value="mcb">MCB</SelectItem>
                  <SelectItem value="mccb">MCCB</SelectItem>
                  <SelectItem value="fuse">Fuse</SelectItem>
                  <SelectItem value="switch-fuse">Switch Fuse</SelectItem>
                  <SelectItem value="isolator">Isolator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mainSwitchRating" className="font-medium text-sm">Rating (A) *</Label>
              <Select value={formData.mainSwitchRating || ''} onValueChange={(value) => onUpdate('mainSwitchRating', value)}>
                <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                  <SelectItem value="16">16A</SelectItem>
                  <SelectItem value="20">20A</SelectItem>
                  <SelectItem value="25">25A</SelectItem>
                  <SelectItem value="32">32A</SelectItem>
                  <SelectItem value="40">40A</SelectItem>
                  <SelectItem value="50">50A</SelectItem>
                  <SelectItem value="63">63A</SelectItem>
                  <SelectItem value="80">80A</SelectItem>
                  <SelectItem value="100">100A</SelectItem>
                  <SelectItem value="125">125A</SelectItem>
                  <SelectItem value="160">160A</SelectItem>
                  <SelectItem value="200">200A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="breakingCapacity" className="font-medium text-sm">Breaking Capacity (kA) *</Label>
              <Select value={formData.breakingCapacity || ''} onValueChange={(value) => onUpdate('breakingCapacity', value)}>
                <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select capacity" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                  <SelectItem value="3">3kA</SelectItem>
                  <SelectItem value="6">6kA</SelectItem>
                  <SelectItem value="10">10kA</SelectItem>
                  <SelectItem value="16">16kA</SelectItem>
                  <SelectItem value="25">25kA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* RCD Protection */}
        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-elec-gray pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
            RCD Protection
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="rcdMainSwitch" className="font-medium text-sm">RCD Main Switch</Label>
              <Select value={formData.rcdMainSwitch || ''} onValueChange={handleRCDMainSwitchChange}>
                <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select RCD type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="rcbo">RCBO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {showRCDFields ? (
              <>
                <div>
                  <Label htmlFor="rcdRating" className="font-medium text-sm">RCD Rating (mA)</Label>
                  <Select value={formData.rcdRating || ''} onValueChange={(value) => onUpdate('rcdRating', value)}>
                    <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                      <SelectItem value="30">30mA</SelectItem>
                      <SelectItem value="100">100mA</SelectItem>
                      <SelectItem value="300">300mA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="rcdType" className="font-medium text-sm">RCD Type</Label>
                  <Select value={formData.rcdType || ''} onValueChange={(value) => onUpdate('rcdType', value)}>
                    <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                      <SelectItem value="ac">AC Type</SelectItem>
                      <SelectItem value="a">A Type</SelectItem>
                      <SelectItem value="b">B Type</SelectItem>
                      <SelectItem value="f">F Type</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              formData.rcdMainSwitch === 'no' && (
                <div className="md:col-span-2 flex items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-md">
                  <p className="text-sm text-gray-600 text-center">
                    RCD rating and type fields are not applicable when no RCD protection is installed
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        <Separator />

        {/* Distribution Board */}
        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-elec-gray pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
            Distribution Board
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="boardSize" className="font-medium text-sm">Number of Ways</Label>
              <Select value={formData.boardSize || ''} onValueChange={(value) => onUpdate('boardSize', value)}>
                <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select number of ways" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                  <SelectItem value="4">4 Way</SelectItem>
                  <SelectItem value="6">6 Way</SelectItem>
                  <SelectItem value="8">8 Way</SelectItem>
                  <SelectItem value="10">10 Way</SelectItem>
                  <SelectItem value="12">12 Way</SelectItem>
                  <SelectItem value="16">16 Way</SelectItem>
                  <SelectItem value="18">18 Way</SelectItem>
                  <SelectItem value="20">20 Way</SelectItem>
                  <SelectItem value="24">24 Way</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="boardType" className="font-medium text-sm">Board Type</Label>
              <Select value={formData.boardType || ''} onValueChange={(value) => onUpdate('boardType', value)}>
                <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select board type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                  <SelectItem value="metal">Metal Clad</SelectItem>
                  <SelectItem value="plastic">Plastic</SelectItem>
                  <SelectItem value="flush">Flush Mount</SelectItem>
                  <SelectItem value="surface">Surface Mount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="boardLocation" className="font-medium text-sm">Board Location</Label>
              <Select value={formData.boardLocation || ''} onValueChange={(value) => onUpdate('boardLocation', value)}>
                <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                  <SelectItem value="kitchen">Kitchen</SelectItem>
                  <SelectItem value="utility">Utility Room</SelectItem>
                  <SelectItem value="garage">Garage</SelectItem>
                  <SelectItem value="hallway">Hallway</SelectItem>
                  <SelectItem value="cupboard">Cupboard</SelectItem>
                  <SelectItem value="basement">Basement</SelectItem>
                  <SelectItem value="plant-room">Plant Room</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Supply Cables */}
        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-foreground border-b border-elec-gray pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
            Supply Cables
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="intakeCableSize" className="font-medium text-sm">Intake Cable Size</Label>
              <Select value={formData.intakeCableSize || ''} onValueChange={(value) => onUpdate('intakeCableSize', value)}>
                <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select cable size" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                  {cableSizeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Other/Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="intakeCableType" className="font-medium text-sm">Intake Cable Type</Label>
              <Select value={formData.intakeCableType || ''} onValueChange={(value) => onUpdate('intakeCableType', value)}>
                <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select cable type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                  <SelectItem value="pvc">PVC</SelectItem>
                  <SelectItem value="xlpe">XLPE</SelectItem>
                  <SelectItem value="paper">Paper Insulated</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tailsSize" className="font-medium text-sm">Meter Tails Size</Label>
              <Select value={formData.tailsSize || ''} onValueChange={(value) => onUpdate('tailsSize', value)}>
                <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select tails size" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                  <SelectItem value="16mm">16mm²</SelectItem>
                  <SelectItem value="25mm">25mm²</SelectItem>
                  <SelectItem value="35mm">35mm²</SelectItem>
                  <SelectItem value="50mm">50mm²</SelectItem>
                  <SelectItem value="custom">Other/Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tailsLength" className="font-medium text-sm">Meter Tails Length</Label>
              <Select value={formData.tailsLength || ''} onValueChange={(value) => onUpdate('tailsLength', value)}>
                <SelectTrigger className="bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select length" />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                  <SelectItem value="1m">1m</SelectItem>
                  <SelectItem value="1.5m">1.5m</SelectItem>
                  <SelectItem value="2m">2m</SelectItem>
                  <SelectItem value="2.5m">2.5m</SelectItem>
                  <SelectItem value="3m">3m</SelectItem>
                  <SelectItem value="4m">4m</SelectItem>
                  <SelectItem value="5m">5m</SelectItem>
                  <SelectItem value="custom">Custom Length</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default EICElectricalInstallationSection;
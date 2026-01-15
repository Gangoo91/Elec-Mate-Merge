import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
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
              <MobileSelectPicker
                value={formData.mainProtectiveDevice || ''}
                onValueChange={(value) => onUpdate('mainProtectiveDevice', value)}
                options={[
                  { value: 'mcb', label: 'MCB' },
                  { value: 'mccb', label: 'MCCB' },
                  { value: 'fuse', label: 'Fuse' },
                  { value: 'switch-fuse', label: 'Switch Fuse' },
                  { value: 'isolator', label: 'Isolator' },
                ]}
                placeholder="Select device type"
                title="Device Type"
              />
            </div>
            <div>
              <Label htmlFor="mainSwitchRating" className="font-medium text-sm">Rating (A) *</Label>
              <MobileSelectPicker
                value={formData.mainSwitchRating || ''}
                onValueChange={(value) => onUpdate('mainSwitchRating', value)}
                options={[
                  { value: '16', label: '16A' },
                  { value: '20', label: '20A' },
                  { value: '25', label: '25A' },
                  { value: '32', label: '32A' },
                  { value: '40', label: '40A' },
                  { value: '50', label: '50A' },
                  { value: '63', label: '63A' },
                  { value: '80', label: '80A' },
                  { value: '100', label: '100A' },
                  { value: '125', label: '125A' },
                  { value: '160', label: '160A' },
                  { value: '200', label: '200A' },
                ]}
                placeholder="Select rating"
                title="Rating (A)"
              />
            </div>
            <div>
              <Label htmlFor="breakingCapacity" className="font-medium text-sm">Breaking Capacity (kA) *</Label>
              <MobileSelectPicker
                value={formData.breakingCapacity || ''}
                onValueChange={(value) => onUpdate('breakingCapacity', value)}
                options={[
                  { value: '3', label: '3kA' },
                  { value: '6', label: '6kA' },
                  { value: '10', label: '10kA' },
                  { value: '16', label: '16kA' },
                  { value: '25', label: '25kA' },
                ]}
                placeholder="Select capacity"
                title="Breaking Capacity"
              />
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
              <MobileSelectPicker
                value={formData.rcdMainSwitch || ''}
                onValueChange={handleRCDMainSwitchChange}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'rcbo', label: 'RCBO' },
                ]}
                placeholder="Select RCD type"
                title="RCD Main Switch"
              />
            </div>

            {showRCDFields ? (
              <>
                <div>
                  <Label htmlFor="rcdRating" className="font-medium text-sm">RCD Rating (mA)</Label>
                  <MobileSelectPicker
                    value={formData.rcdRating || ''}
                    onValueChange={(value) => onUpdate('rcdRating', value)}
                    options={[
                      { value: '30', label: '30mA' },
                      { value: '100', label: '100mA' },
                      { value: '300', label: '300mA' },
                    ]}
                    placeholder="Select rating"
                    title="RCD Rating"
                  />
                </div>
                <div>
                  <Label htmlFor="rcdType" className="font-medium text-sm">RCD Type</Label>
                  <MobileSelectPicker
                    value={formData.rcdType || ''}
                    onValueChange={(value) => onUpdate('rcdType', value)}
                    options={[
                      { value: 'ac', label: 'AC Type' },
                      { value: 'a', label: 'A Type' },
                      { value: 'b', label: 'B Type' },
                      { value: 'f', label: 'F Type' },
                    ]}
                    placeholder="Select type"
                    title="RCD Type"
                  />
                </div>
              </>
            ) : (
              formData.rcdMainSwitch === 'no' && (
                <div className="md:col-span-2 flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-md">
                  <p className="text-sm text-white/70 text-center">
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
              <MobileSelectPicker
                value={formData.boardSize || ''}
                onValueChange={(value) => onUpdate('boardSize', value)}
                options={[
                  { value: '4', label: '4 Way' },
                  { value: '6', label: '6 Way' },
                  { value: '8', label: '8 Way' },
                  { value: '10', label: '10 Way' },
                  { value: '12', label: '12 Way' },
                  { value: '16', label: '16 Way' },
                  { value: '18', label: '18 Way' },
                  { value: '20', label: '20 Way' },
                  { value: '24', label: '24 Way' },
                ]}
                placeholder="Select number of ways"
                title="Number of Ways"
              />
            </div>
            <div>
              <Label htmlFor="boardType" className="font-medium text-sm">Board Type</Label>
              <MobileSelectPicker
                value={formData.boardType || ''}
                onValueChange={(value) => onUpdate('boardType', value)}
                options={[
                  { value: 'metal', label: 'Metal Clad' },
                  { value: 'plastic', label: 'Plastic' },
                  { value: 'flush', label: 'Flush Mount' },
                  { value: 'surface', label: 'Surface Mount' },
                ]}
                placeholder="Select board type"
                title="Board Type"
              />
            </div>
            <div>
              <Label htmlFor="boardLocation" className="font-medium text-sm">Board Location</Label>
              <MobileSelectPicker
                value={formData.boardLocation || ''}
                onValueChange={(value) => onUpdate('boardLocation', value)}
                options={[
                  { value: 'kitchen', label: 'Kitchen' },
                  { value: 'utility', label: 'Utility Room' },
                  { value: 'garage', label: 'Garage' },
                  { value: 'hallway', label: 'Hallway' },
                  { value: 'cupboard', label: 'Cupboard' },
                  { value: 'basement', label: 'Basement' },
                  { value: 'plant-room', label: 'Plant Room' },
                  { value: 'other', label: 'Other' },
                ]}
                placeholder="Select location"
                title="Board Location"
              />
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
              <MobileSelectPicker
                value={formData.intakeCableSize || ''}
                onValueChange={(value) => onUpdate('intakeCableSize', value)}
                options={[
                  ...cableSizeOptions.map((option) => ({ value: option.value, label: option.label })),
                  { value: 'custom', label: 'Other/Custom' },
                ]}
                placeholder="Select cable size"
                title="Intake Cable Size"
              />
            </div>
            <div>
              <Label htmlFor="intakeCableType" className="font-medium text-sm">Intake Cable Type</Label>
              <MobileSelectPicker
                value={formData.intakeCableType || ''}
                onValueChange={(value) => onUpdate('intakeCableType', value)}
                options={[
                  { value: 'pvc', label: 'PVC' },
                  { value: 'xlpe', label: 'XLPE' },
                  { value: 'paper', label: 'Paper Insulated' },
                  { value: 'other', label: 'Other' },
                ]}
                placeholder="Select cable type"
                title="Intake Cable Type"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tailsSize" className="font-medium text-sm">Meter Tails Size</Label>
              <MobileSelectPicker
                value={formData.tailsSize || ''}
                onValueChange={(value) => onUpdate('tailsSize', value)}
                options={[
                  { value: '16mm', label: '16mm²' },
                  { value: '25mm', label: '25mm²' },
                  { value: '35mm', label: '35mm²' },
                  { value: '50mm', label: '50mm²' },
                  { value: 'custom', label: 'Other/Custom' },
                ]}
                placeholder="Select tails size"
                title="Meter Tails Size"
              />
            </div>
            <div>
              <Label htmlFor="tailsLength" className="font-medium text-sm">Meter Tails Length</Label>
              <MobileSelectPicker
                value={formData.tailsLength || ''}
                onValueChange={(value) => onUpdate('tailsLength', value)}
                options={[
                  { value: '1m', label: '1m' },
                  { value: '1.5m', label: '1.5m' },
                  { value: '2m', label: '2m' },
                  { value: '2.5m', label: '2.5m' },
                  { value: '3m', label: '3m' },
                  { value: '4m', label: '4m' },
                  { value: '5m', label: '5m' },
                  { value: 'custom', label: 'Custom Length' },
                ]}
                placeholder="Select length"
                title="Meter Tails Length"
              />
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
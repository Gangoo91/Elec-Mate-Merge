import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cableSizeOptions } from '@/types/cableTypes';

interface EICElectricalInstallationSectionProps {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: string) => void;
}

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const FormField = ({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>
    {children}
    {hint && <span className="text-[10px] text-white block mt-1">{hint}</span>}
  </div>
);

const EICElectricalInstallationSection = ({
  formData,
  onUpdate,
}: EICElectricalInstallationSectionProps) => {
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
    <div className="space-y-4">
      {/* Main Protective Device */}
      <SectionTitle title="Main Protective Device" />
      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField label="Device Type" required>
          <Select
            value={formData.mainProtectiveDevice || ''}
            onValueChange={(value) => onUpdate('mainProtectiveDevice', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Select device type" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
              <SelectItem value="mcb">MCB</SelectItem>
              <SelectItem value="mccb">MCCB</SelectItem>
              <SelectItem value="fuse">Fuse</SelectItem>
              <SelectItem value="switch-fuse">Switch Fuse</SelectItem>
              <SelectItem value="isolator">Isolator</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Rating (A)" required>
          <Select
            value={formData.mainSwitchRating || ''}
            onValueChange={(value) => onUpdate('mainSwitchRating', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
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
        </FormField>
        <FormField label="Breaking Capacity (kA)" required>
          <Select
            value={formData.breakingCapacity || ''}
            onValueChange={(value) => onUpdate('breakingCapacity', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Select capacity" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
              <SelectItem value="3">3kA</SelectItem>
              <SelectItem value="6">6kA</SelectItem>
              <SelectItem value="10">10kA</SelectItem>
              <SelectItem value="16">16kA</SelectItem>
              <SelectItem value="25">25kA</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>

      {/* RCD Protection */}
      <SectionTitle title="RCD Protection" />
      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField label="RCD Main Switch">
          <Select
            value={formData.rcdMainSwitch || ''}
            onValueChange={handleRCDMainSwitchChange}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Select RCD type" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="rcbo">RCBO</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        {showRCDFields ? (
          <>
            <FormField label="RCD Rating (mA)">
              <Select
                value={formData.rcdRating || ''}
                onValueChange={(value) => onUpdate('rcdRating', value)}
              >
                <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
                  <SelectItem value="30">30mA</SelectItem>
                  <SelectItem value="100">100mA</SelectItem>
                  <SelectItem value="300">300mA</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="RCD Type">
              <Select
                value={formData.rcdType || ''}
                onValueChange={(value) => onUpdate('rcdType', value)}
              >
                <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
                  <SelectItem value="ac">AC Type</SelectItem>
                  <SelectItem value="a">A Type</SelectItem>
                  <SelectItem value="b">B Type</SelectItem>
                  <SelectItem value="f">F Type</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </>
        ) : (
          formData.rcdMainSwitch === 'no' && (
            <div className="col-span-2 flex items-center justify-center p-4 bg-white/[0.03] border border-white/10 rounded-md">
              <p className="text-sm text-white text-center">
                RCD rating and type fields are not applicable when no RCD protection is
                installed
              </p>
            </div>
          )
        )}
      </div>

      {/* Distribution Board */}
      <SectionTitle title="Distribution Board" />
      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField label="Number of Ways">
          <Select
            value={formData.boardSize || ''}
            onValueChange={(value) => onUpdate('boardSize', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Select number of ways" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
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
        </FormField>
        <FormField label="Board Type">
          <Select
            value={formData.boardType || ''}
            onValueChange={(value) => onUpdate('boardType', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Select board type" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
              <SelectItem value="metal">Metal Clad</SelectItem>
              <SelectItem value="plastic">Plastic</SelectItem>
              <SelectItem value="flush">Flush Mount</SelectItem>
              <SelectItem value="surface">Surface Mount</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Board Location">
          <Select
            value={formData.boardLocation || ''}
            onValueChange={(value) => onUpdate('boardLocation', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
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
        </FormField>
      </div>

      {/* Supply Cables */}
      <SectionTitle title="Supply Cables" />
      <div className="grid grid-cols-2 gap-2 items-end">
        <FormField label="Intake Cable Size">
          <Select
            value={formData.intakeCableSize || ''}
            onValueChange={(value) => onUpdate('intakeCableSize', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Select cable size" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
              {cableSizeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
              <SelectItem value="custom">Other/Custom</SelectItem>
              <SelectItem value="LIM">LIM (Limited access)</SelectItem>
              <SelectItem value="N/A">N/A</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Intake Cable Type">
          <Select
            value={formData.intakeCableType || ''}
            onValueChange={(value) => onUpdate('intakeCableType', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Select cable type" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
              <SelectItem value="pvc">PVC</SelectItem>
              <SelectItem value="xlpe">XLPE</SelectItem>
              <SelectItem value="paper">Paper Insulated</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="LIM">LIM (Limited access)</SelectItem>
              <SelectItem value="N/A">N/A</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Meter Tails Size">
          <Select
            value={formData.tailsSize || ''}
            onValueChange={(value) => onUpdate('tailsSize', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Select tails size" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
              <SelectItem value="16mm">16mm²</SelectItem>
              <SelectItem value="25mm">25mm²</SelectItem>
              <SelectItem value="35mm">35mm²</SelectItem>
              <SelectItem value="50mm">50mm²</SelectItem>
              <SelectItem value="custom">Other/Custom</SelectItem>
              <SelectItem value="LIM">LIM (Limited access)</SelectItem>
              <SelectItem value="N/A">N/A</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Meter Tails Length">
          <Select
            value={formData.tailsLength || ''}
            onValueChange={(value) => onUpdate('tailsLength', value)}
          >
            <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] focus:border-elec-yellow focus:ring-elec-yellow">
              <SelectValue placeholder="Select length" />
            </SelectTrigger>
            <SelectContent className="bg-white/[0.06] border-white/[0.08] text-foreground z-50">
              <SelectItem value="1m">1m</SelectItem>
              <SelectItem value="1.5m">1.5m</SelectItem>
              <SelectItem value="2m">2m</SelectItem>
              <SelectItem value="2.5m">2.5m</SelectItem>
              <SelectItem value="3m">3m</SelectItem>
              <SelectItem value="4m">4m</SelectItem>
              <SelectItem value="5m">5m</SelectItem>
              <SelectItem value="custom">Custom Length</SelectItem>
              <SelectItem value="LIM">LIM (Limited access)</SelectItem>
              <SelectItem value="N/A">N/A</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>
    </div>
  );
};

export default EICElectricalInstallationSection;

/**
 * InstallationStep - Supply & Earthing Details for EIC
 *
 * Mobile-optimized segmented controls and selection grids
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Plug, Cable } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InstallationStepProps {
  data: any;
  onChange: (updates: any) => void;
  isMobile?: boolean;
}

// Segmented control component for touch-friendly selection
const SegmentedControl: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}> = ({ value, onChange, options, className }) => (
  <div className={cn('flex rounded-lg bg-muted p-1 gap-1', className)}>
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        onClick={() => onChange(option.value)}
        className={cn(
          'flex-1 px-3 py-2.5 rounded-md text-sm font-medium transition-all touch-manipulation',
          'min-h-[44px]',
          value === option.value
            ? 'bg-elec-yellow text-black shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {option.label}
      </button>
    ))}
  </div>
);

// Selection grid for earthing arrangements
const SelectionGrid: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; description?: string }[];
  columns?: number;
}> = ({ value, onChange, options, columns = 3 }) => (
  <div className={cn('grid gap-2', `grid-cols-${columns}`)}>
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        onClick={() => onChange(option.value)}
        className={cn(
          'p-3 rounded-lg border-2 text-center transition-all touch-manipulation',
          'min-h-[60px] flex flex-col items-center justify-center gap-1',
          value === option.value
            ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
            : 'border-border bg-card hover:border-elec-yellow/50'
        )}
      >
        <span className="font-semibold text-sm">{option.label}</span>
        {option.description && (
          <span className="text-xs text-muted-foreground">{option.description}</span>
        )}
      </button>
    ))}
  </div>
);

export const InstallationStep: React.FC<InstallationStepProps> = ({ data, onChange, isMobile }) => {
  const handleChange = (field: string, value: string) => {
    onChange({ [field]: value });
  };

  const phaseOptions = [
    { value: 'single', label: 'Single Phase' },
    { value: 'three', label: 'Three Phase' },
  ];

  const earthingOptions = [
    { value: 'TN-S', label: 'TN-S', description: 'Separate earth' },
    { value: 'TN-C-S', label: 'TN-C-S', description: 'PME' },
    { value: 'TT', label: 'TT', description: 'Earth electrode' },
    { value: 'IT', label: 'IT', description: 'Isolated' },
  ];

  const installationTypes = [
    { value: 'domestic', label: 'Domestic' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'agricultural', label: 'Agricultural' },
  ];

  return (
    <div className="space-y-6">
      {/* Installation Type */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <Zap className="h-5 w-5 text-elec-yellow" />
            </div>
            Installation Type
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Type of Installation</Label>
            <div className="grid grid-cols-2 gap-2">
              {installationTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleChange('installationType', type.value)}
                  className={cn(
                    'p-3 rounded-lg border-2 text-center transition-all touch-manipulation min-h-[48px]',
                    data.installationType === type.value
                      ? 'border-elec-yellow bg-elec-yellow/10'
                      : 'border-border hover:border-elec-yellow/50'
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Number of Phases <span className="text-destructive">*</span></Label>
            <SegmentedControl
              value={data.phases || ''}
              onChange={(v) => handleChange('phases', v)}
              options={phaseOptions}
            />
          </div>
        </CardContent>
      </Card>

      {/* Supply Characteristics */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <Plug className="h-5 w-5 text-elec-yellow" />
            </div>
            Supply Characteristics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplyVoltage" className="text-sm font-medium">
                Voltage (V)
              </Label>
              <Select
                value={data.supplyVoltage || ''}
                onValueChange={(v) => handleChange('supplyVoltage', v)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="230">230V</SelectItem>
                  <SelectItem value="400">400V</SelectItem>
                  <SelectItem value="415">415V</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplyFrequency" className="text-sm font-medium">
                Frequency (Hz)
              </Label>
              <Select
                value={data.supplyFrequency || '50'}
                onValueChange={(v) => handleChange('supplyFrequency', v)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50Hz</SelectItem>
                  <SelectItem value="60">60Hz</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="externalLoopImpedance" className="text-sm font-medium">
                Ze (Ω)
              </Label>
              <Input
                id="externalLoopImpedance"
                type="number"
                step="0.01"
                value={data.externalLoopImpedance || ''}
                onChange={(e) => handleChange('externalLoopImpedance', e.target.value)}
                placeholder="e.g. 0.35"
                className={cn('h-12', isMobile && 'text-[16px]')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prospectiveFaultCurrent" className="text-sm font-medium">
                PFC (kA)
              </Label>
              <Input
                id="prospectiveFaultCurrent"
                type="number"
                step="0.1"
                value={data.prospectiveFaultCurrent || ''}
                onChange={(e) => handleChange('prospectiveFaultCurrent', e.target.value)}
                placeholder="e.g. 4.5"
                className={cn('h-12', isMobile && 'text-[16px]')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earthing Arrangement */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <Shield className="h-5 w-5 text-elec-yellow" />
            </div>
            Earthing Arrangement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Earthing System <span className="text-destructive">*</span></Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {earthingOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleChange('earthingArrangement', option.value)}
                  className={cn(
                    'p-3 rounded-lg border-2 text-center transition-all touch-manipulation',
                    'min-h-[70px] flex flex-col items-center justify-center gap-1',
                    data.earthingArrangement === option.value
                      ? 'border-elec-yellow bg-elec-yellow/10'
                      : 'border-border hover:border-elec-yellow/50'
                  )}
                >
                  <span className="font-bold text-base">{option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </button>
              ))}
            </div>
          </div>

          {data.earthingArrangement === 'TT' && (
            <div className="space-y-2">
              <Label htmlFor="earthElectrodeResistance" className="text-sm font-medium">
                Earth Electrode Resistance (Ω)
              </Label>
              <Input
                id="earthElectrodeResistance"
                type="number"
                step="0.1"
                value={data.earthElectrodeResistance || ''}
                onChange={(e) => handleChange('earthElectrodeResistance', e.target.value)}
                placeholder="e.g. 200"
                className={cn('h-12', isMobile && 'text-[16px]')}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Protective Device */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <Cable className="h-5 w-5 text-elec-yellow" />
            </div>
            Main Protective Device
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mainProtectiveDevice" className="text-sm font-medium">
                Device Type
              </Label>
              <Select
                value={data.mainProtectiveDevice || ''}
                onValueChange={(v) => handleChange('mainProtectiveDevice', v)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main-switch">Main Switch</SelectItem>
                  <SelectItem value="mccb">MCCB</SelectItem>
                  <SelectItem value="isolator">Isolator</SelectItem>
                  <SelectItem value="rcd-main">RCD Main Switch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainSwitchRating" className="text-sm font-medium">
                Rating (A)
              </Label>
              <Select
                value={data.mainSwitchRating || ''}
                onValueChange={(v) => handleChange('mainSwitchRating', v)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">60A</SelectItem>
                  <SelectItem value="80">80A</SelectItem>
                  <SelectItem value="100">100A</SelectItem>
                  <SelectItem value="125">125A</SelectItem>
                  <SelectItem value="160">160A</SelectItem>
                  <SelectItem value="200">200A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mainSwitchLocation" className="text-sm font-medium">
              Location
            </Label>
            <Input
              id="mainSwitchLocation"
              value={data.mainSwitchLocation || ''}
              onChange={(e) => handleChange('mainSwitchLocation', e.target.value)}
              placeholder="e.g. Consumer unit in hallway"
              className={cn('h-12', isMobile && 'text-[16px]')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mainEarthingConductorSize" className="text-sm font-medium">
                Main Earth Size (mm²)
              </Label>
              <Select
                value={data.mainEarthingConductorSize || ''}
                onValueChange={(v) => handleChange('mainEarthingConductorSize', v)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10mm²</SelectItem>
                  <SelectItem value="16">16mm²</SelectItem>
                  <SelectItem value="25">25mm²</SelectItem>
                  <SelectItem value="35">35mm²</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainBondingConductorSize" className="text-sm font-medium">
                Main Bonding Size (mm²)
              </Label>
              <Select
                value={data.mainBondingConductorSize || ''}
                onValueChange={(v) => handleChange('mainBondingConductorSize', v)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10mm²</SelectItem>
                  <SelectItem value="16">16mm²</SelectItem>
                  <SelectItem value="25">25mm²</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstallationStep;

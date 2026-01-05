
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { ProtectiveDevice } from '@/utils/zsCalculations';

interface ProtectiveDeviceSelectorProps {
  device: ProtectiveDevice | null;
  onDeviceChange: (device: ProtectiveDevice) => void;
}

const DEVICE_OPTIONS: ProtectiveDevice[] = [
  // MCB Type B
  { type: 'mcb', curve: 'typeB', rating: 6, label: 'MCB B6' },
  { type: 'mcb', curve: 'typeB', rating: 10, label: 'MCB B10' },
  { type: 'mcb', curve: 'typeB', rating: 16, label: 'MCB B16' },
  { type: 'mcb', curve: 'typeB', rating: 20, label: 'MCB B20' },
  { type: 'mcb', curve: 'typeB', rating: 25, label: 'MCB B25' },
  { type: 'mcb', curve: 'typeB', rating: 32, label: 'MCB B32' },
  { type: 'mcb', curve: 'typeB', rating: 40, label: 'MCB B40' },
  { type: 'mcb', curve: 'typeB', rating: 50, label: 'MCB B50' },
  { type: 'mcb', curve: 'typeB', rating: 63, label: 'MCB B63' },
  
  // MCB Type C
  { type: 'mcb', curve: 'typeC', rating: 6, label: 'MCB C6' },
  { type: 'mcb', curve: 'typeC', rating: 10, label: 'MCB C10' },
  { type: 'mcb', curve: 'typeC', rating: 16, label: 'MCB C16' },
  { type: 'mcb', curve: 'typeC', rating: 20, label: 'MCB C20' },
  { type: 'mcb', curve: 'typeC', rating: 25, label: 'MCB C25' },
  { type: 'mcb', curve: 'typeC', rating: 32, label: 'MCB C32' },
  { type: 'mcb', curve: 'typeC', rating: 40, label: 'MCB C40' },
  { type: 'mcb', curve: 'typeC', rating: 50, label: 'MCB C50' },
  { type: 'mcb', curve: 'typeC', rating: 63, label: 'MCB C63' },
  
  // BS 88-2 HRC Fuses
  { type: 'bs88_2', rating: 6, label: 'BS 88-2 HRC 6A' },
  { type: 'bs88_2', rating: 10, label: 'BS 88-2 HRC 10A' },
  { type: 'bs88_2', rating: 16, label: 'BS 88-2 HRC 16A' },
  { type: 'bs88_2', rating: 20, label: 'BS 88-2 HRC 20A' },
  { type: 'bs88_2', rating: 25, label: 'BS 88-2 HRC 25A' },
  { type: 'bs88_2', rating: 32, label: 'BS 88-2 HRC 32A' },
  { type: 'bs88_2', rating: 40, label: 'BS 88-2 HRC 40A' },
  { type: 'bs88_2', rating: 50, label: 'BS 88-2 HRC 50A' },
  { type: 'bs88_2', rating: 63, label: 'BS 88-2 HRC 63A' },
  
  // BS 88-3 Fuses
  { type: 'bs88_3', rating: 5, label: 'BS 88-3 5A' },
  { type: 'bs88_3', rating: 16, label: 'BS 88-3 16A' },
  { type: 'bs88_3', rating: 20, label: 'BS 88-3 20A' },
  { type: 'bs88_3', rating: 32, label: 'BS 88-3 32A' },
  { type: 'bs88_3', rating: 45, label: 'BS 88-3 45A' },
  { type: 'bs88_3', rating: 63, label: 'BS 88-3 63A' },
  
  // BS 3036 Rewirable Fuses
  { type: 'bs3036', rating: 5, label: 'BS 3036 5A' },
  { type: 'bs3036', rating: 15, label: 'BS 3036 15A' },
  { type: 'bs3036', rating: 20, label: 'BS 3036 20A' },
  { type: 'bs3036', rating: 30, label: 'BS 3036 30A' },
  { type: 'bs3036', rating: 45, label: 'BS 3036 45A' },
  
  // BS 1362 Plug-Top Fuses
  { type: 'bs1362', rating: 3, label: 'BS 1362 3A' },
  { type: 'bs1362', rating: 13, label: 'BS 1362 13A' },
];

export const ProtectiveDeviceSelector: React.FC<ProtectiveDeviceSelectorProps> = ({
  device,
  onDeviceChange
}) => {
  const handleDeviceChange = (value: string) => {
    const selectedDevice = DEVICE_OPTIONS.find(d => 
      `${d.type}-${d.curve || 'none'}-${d.rating}` === value
    );
    if (selectedDevice) {
      onDeviceChange(selectedDevice);
    }
  };

  const getDeviceValue = (device: ProtectiveDevice) => {
    return `${device.type}-${device.curve || 'none'}-${device.rating}`;
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          Protective Device
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="device-select" className="text-foreground">
            Select Protective Device Type
          </Label>
          <Select 
            value={device ? getDeviceValue(device) : ''} 
            onValueChange={handleDeviceChange}
          >
            <SelectTrigger className="bg-elec-gray border-elec-gray text-foreground">
              <SelectValue placeholder="Choose protective device..." />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-elec-gray text-foreground">
              <div className="text-xs text-gray-400 px-2 py-1 font-semibold">MCB Type B</div>
              {DEVICE_OPTIONS.filter(d => d.type === 'mcb' && d.curve === 'typeB').map((device) => (
                <SelectItem 
                  key={getDeviceValue(device)} 
                  value={getDeviceValue(device)}
                  className="text-foreground hover:bg-neutral-600"
                >
                  {device.label}
                </SelectItem>
              ))}
              
              <div className="text-xs text-gray-400 px-2 py-1 font-semibold border-t border-border mt-1 pt-2">MCB Type C</div>
              {DEVICE_OPTIONS.filter(d => d.type === 'mcb' && d.curve === 'typeC').map((device) => (
                <SelectItem 
                  key={getDeviceValue(device)} 
                  value={getDeviceValue(device)}
                  className="text-foreground hover:bg-neutral-600"
                >
                  {device.label}
                </SelectItem>
              ))}
              
              <div className="text-xs text-gray-400 px-2 py-1 font-semibold border-t border-border mt-1 pt-2">BS 88-2 HRC Fuses</div>
              {DEVICE_OPTIONS.filter(d => d.type === 'bs88_2').map((device) => (
                <SelectItem 
                  key={getDeviceValue(device)} 
                  value={getDeviceValue(device)}
                  className="text-foreground hover:bg-neutral-600"
                >
                  {device.label}
                </SelectItem>
              ))}
              
              <div className="text-xs text-gray-400 px-2 py-1 font-semibold border-t border-border mt-1 pt-2">BS 88-3 Fuses</div>
              {DEVICE_OPTIONS.filter(d => d.type === 'bs88_3').map((device) => (
                <SelectItem 
                  key={getDeviceValue(device)} 
                  value={getDeviceValue(device)}
                  className="text-foreground hover:bg-neutral-600"
                >
                  {device.label}
                </SelectItem>
              ))}
              
              <div className="text-xs text-gray-400 px-2 py-1 font-semibold border-t border-border mt-1 pt-2">BS 3036 Rewirable Fuses</div>
              {DEVICE_OPTIONS.filter(d => d.type === 'bs3036').map((device) => (
                <SelectItem 
                  key={getDeviceValue(device)} 
                  value={getDeviceValue(device)}
                  className="text-foreground hover:bg-neutral-600"
                >
                  {device.label}
                </SelectItem>
              ))}
              
              <div className="text-xs text-gray-400 px-2 py-1 font-semibold border-t border-border mt-1 pt-2">BS 1362 Plug-Top Fuses</div>
              {DEVICE_OPTIONS.filter(d => d.type === 'bs1362').map((device) => (
                <SelectItem 
                  key={getDeviceValue(device)} 
                  value={getDeviceValue(device)}
                  className="text-foreground hover:bg-neutral-600"
                >
                  {device.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProtectiveDeviceSelector;

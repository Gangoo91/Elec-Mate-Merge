
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Shield } from 'lucide-react';
import InputWithValidation from './InputWithValidation';

interface ProtectiveDevicesSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const ProtectiveDevicesSection: React.FC<ProtectiveDevicesSectionProps> = ({ formData, onUpdate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-elec-gray flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Main Protective Device
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="mainProtectiveDevice">Type *</Label>
            <MobileSelectPicker
              value={formData.mainProtectiveDevice || ''}
              onValueChange={(value) => onUpdate('mainProtectiveDevice', value)}
              options={[
                { value: 'MCB', label: 'MCB' },
                { value: 'RCBO', label: 'RCBO' },
                { value: 'fuse', label: 'Fuse' },
                { value: 'isolator', label: 'Isolator' },
                { value: 'other', label: 'Other' },
              ]}
              placeholder="Device type"
              title="Main Protective Device Type"
            />
          </div>
          
          <InputWithValidation
            id="mainSwitchRating"
            label="Rating (A)"
            value={formData.mainSwitchRating || ''}
            onChange={(value) => onUpdate('mainSwitchRating', value)}
            placeholder="e.g., 100"
            type="number"
            helpText="Current rating in Amperes"
          />
          
          <div>
            <Label htmlFor="mainSwitchLocation">Location</Label>
            <Input
              id="mainSwitchLocation"
              placeholder="e.g., Consumer unit"
              value={formData.mainSwitchLocation || ''}
              onChange={(e) => onUpdate('mainSwitchLocation', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProtectiveDevicesSection;

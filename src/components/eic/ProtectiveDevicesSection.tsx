
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
            <Select
              value={formData.mainProtectiveDevice || ''}
              onValueChange={(value) => onUpdate('mainProtectiveDevice', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Device type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MCB">MCB</SelectItem>
                <SelectItem value="RCBO">RCBO</SelectItem>
                <SelectItem value="fuse">Fuse</SelectItem>
                <SelectItem value="isolator">Isolator</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
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

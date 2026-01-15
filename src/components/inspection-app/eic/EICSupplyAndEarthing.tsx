
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';

interface EICSupplyAndEarthingProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const EICSupplyAndEarthing: React.FC<EICSupplyAndEarthingProps> = ({ formData, onUpdate }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-elec-gray">Supply Characteristics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="supplyVoltage">Nominal Voltage (V) *</Label>
              <MobileSelectPicker
                value={formData.supplyVoltage || ''}
                onValueChange={(value) => onUpdate('supplyVoltage', value)}
                options={[
                  { value: '230/400', label: '230/400V' },
                  { value: '240/415', label: '240/415V' },
                  { value: '110', label: '110V' },
                  { value: 'other', label: 'Other' },
                ]}
                placeholder="Voltage"
                title="Nominal Voltage"
              />
            </div>
            <div>
              <Label htmlFor="supplyFrequency">Frequency (Hz) *</Label>
              <MobileSelectPicker
                value={formData.supplyFrequency || '50'}
                onValueChange={(value) => onUpdate('supplyFrequency', value)}
                options={[
                  { value: '50', label: '50 Hz' },
                  { value: '60', label: '60 Hz' },
                ]}
                placeholder="Frequency"
                title="Supply Frequency"
              />
            </div>
            <div>
              <Label htmlFor="phases">Number of Phases</Label>
              <MobileSelectPicker
                value={formData.phases || ''}
                onValueChange={(value) => onUpdate('phases', value)}
                options={[
                  { value: '1', label: 'Single Phase' },
                  { value: '3', label: 'Three Phase' },
                ]}
                placeholder="Phases"
                title="Number of Phases"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="earthingArrangement">Earthing Arrangement *</Label>
              <MobileSelectPicker
                value={formData.earthingArrangement || ''}
                onValueChange={(value) => onUpdate('earthingArrangement', value)}
                options={[
                  { value: 'TN-C-S', label: 'TN-C-S (PME)' },
                  { value: 'TN-S', label: 'TN-S' },
                  { value: 'TT', label: 'TT' },
                  { value: 'IT', label: 'IT' },
                ]}
                placeholder="Select earthing arrangement"
                title="Earthing Arrangement"
              />
            </div>
            <div>
              <Label htmlFor="supplyType">Supply Type</Label>
              <MobileSelectPicker
                value={formData.supplyType || ''}
                onValueChange={(value) => onUpdate('supplyType', value)}
                options={[
                  { value: 'mains', label: 'Mains Supply' },
                  { value: 'generator', label: 'Generator' },
                  { value: 'ups', label: 'UPS' },
                  { value: 'other', label: 'Other' },
                ]}
                placeholder="Supply type"
                title="Supply Type"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-elec-gray">Main Protective Device</CardTitle>
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
                title="Main Protective Device"
              />
            </div>
            <div>
              <Label htmlFor="mainSwitchRating">Rating (A)</Label>
              <Input
                id="mainSwitchRating"
                placeholder="e.g., 100"
                value={formData.mainSwitchRating || ''}
                onChange={(e) => onUpdate('mainSwitchRating', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="mainSwitchLocation">Location</Label>
              <Input
                id="mainSwitchLocation"
                placeholder="e.g., Consumer unit"
                value={formData.mainSwitchLocation || ''}
                onChange={(e) => onUpdate('mainSwitchLocation', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-elec-gray">Earthing and Bonding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="earthElectrodeType">Earth Electrode Type</Label>
              <MobileSelectPicker
                value={formData.earthElectrodeType || ''}
                onValueChange={(value) => onUpdate('earthElectrodeType', value)}
                options={[
                  { value: 'rod', label: 'Earth Rod' },
                  { value: 'plate', label: 'Earth Plate' },
                  { value: 'tape', label: 'Earth Tape' },
                  { value: 'pme', label: 'PME Terminal' },
                  { value: 'other', label: 'Other' },
                ]}
                placeholder="Electrode type"
                title="Earth Electrode Type"
              />
            </div>
            <div>
              <Label htmlFor="earthElectrodeResistance">Earth Electrode Resistance (Ω)</Label>
              <Input
                id="earthElectrodeResistance"
                placeholder="e.g., 2.5"
                value={formData.earthElectrodeResistance || ''}
                onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mainBondingConductor">Main Bonding Conductor (mm²)</Label>
              <MobileSelectPicker
                value={formData.mainBondingConductor || ''}
                onValueChange={(value) => onUpdate('mainBondingConductor', value)}
                options={[
                  { value: '6', label: '6 mm²' },
                  { value: '10', label: '10 mm²' },
                  { value: '16', label: '16 mm²' },
                  { value: '25', label: '25 mm²' },
                ]}
                placeholder="Conductor size"
                title="Main Bonding Conductor"
              />
            </div>
            <div>
              <Label htmlFor="supplementaryBonding">Supplementary Bonding Required</Label>
              <MobileSelectPicker
                value={formData.supplementaryBonding || ''}
                onValueChange={(value) => onUpdate('supplementaryBonding', value)}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                  { value: 'notApplicable', label: 'Not Applicable' },
                ]}
                placeholder="Required?"
                title="Supplementary Bonding Required"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICSupplyAndEarthing;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
              <Select
                value={formData.supplyVoltage || ''}
                onValueChange={(value) => onUpdate('supplyVoltage', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Voltage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="230/400">230/400V</SelectItem>
                  <SelectItem value="240/415">240/415V</SelectItem>
                  <SelectItem value="110">110V</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="supplyFrequency">Frequency (Hz) *</Label>
              <Select
                value={formData.supplyFrequency || '50'}
                onValueChange={(value) => onUpdate('supplyFrequency', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50 Hz</SelectItem>
                  <SelectItem value="60">60 Hz</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="phases">Number of Phases</Label>
              <Select
                value={formData.phases || ''}
                onValueChange={(value) => onUpdate('phases', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Phases" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Single Phase</SelectItem>
                  <SelectItem value="3">Three Phase</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="earthingArrangement">Earthing Arrangement *</Label>
              <Select
                value={formData.earthingArrangement || ''}
                onValueChange={(value) => onUpdate('earthingArrangement', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select earthing arrangement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TN-C-S">TN-C-S (PME)</SelectItem>
                  <SelectItem value="TN-S">TN-S</SelectItem>
                  <SelectItem value="TT">TT</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="supplyType">Supply Type</Label>
              <Select
                value={formData.supplyType || ''}
                onValueChange={(value) => onUpdate('supplyType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Supply type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mains">Mains Supply</SelectItem>
                  <SelectItem value="generator">Generator</SelectItem>
                  <SelectItem value="ups">UPS</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
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
              <Select
                value={formData.mainProtectiveDevice || ''}
                onValueChange={(value) => onUpdate('mainProtectiveDevice', value)}
              >
                <SelectTrigger>
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
              <Select
                value={formData.earthElectrodeType || ''}
                onValueChange={(value) => onUpdate('earthElectrodeType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Electrode type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rod">Earth Rod</SelectItem>
                  <SelectItem value="plate">Earth Plate</SelectItem>
                  <SelectItem value="tape">Earth Tape</SelectItem>
                  <SelectItem value="pme">PME Terminal</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="earthElectrodeLocation">Earth Electrode Location</Label>
              <Input
                id="earthElectrodeLocation"
                placeholder="e.g., Garden, Front of property"
                value={formData.earthElectrodeLocation || ''}
                onChange={(e) => onUpdate('earthElectrodeLocation', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="earthElectrodeResistance">Earth Electrode Resistance (Ω)</Label>
              <Input
                id="earthElectrodeResistance"
                placeholder="e.g., 2.5"
                value={formData.earthElectrodeResistance || ''}
                onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="mainBondingConductor">Main Bonding Conductor (mm²)</Label>
              <Select
                value={formData.mainBondingConductor || ''}
                onValueChange={(value) => onUpdate('mainBondingConductor', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Conductor size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 mm²</SelectItem>
                  <SelectItem value="10">10 mm²</SelectItem>
                  <SelectItem value="16">16 mm²</SelectItem>
                  <SelectItem value="25">25 mm²</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="supplementaryBonding">Supplementary Bonding Required</Label>
              <Select
                value={formData.supplementaryBonding || ''}
                onValueChange={(value) => onUpdate('supplementaryBonding', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Required?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="notApplicable">Not Applicable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICSupplyAndEarthing;

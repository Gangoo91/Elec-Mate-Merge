
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Target } from 'lucide-react';
import { ZsTestResult } from './types';
import { getMcbZsLimit, getFuseZsLimit, type FuseType } from '@/data/zsLimits';

interface BasicZsTestCardProps {
  currentTest: ZsTestResult;
  onUpdateTest: (field: string, value: string) => void;
  onAddTest: () => void;
}

const BasicZsTestCard = ({ currentTest, onUpdateTest, onAddTest }: BasicZsTestCardProps) => {
  const protectiveDevices = [
    { value: 'mcb-b6', label: 'MCB Type B 6A' },
    { value: 'mcb-b10', label: 'MCB Type B 10A' },
    { value: 'mcb-b16', label: 'MCB Type B 16A' },
    { value: 'mcb-b20', label: 'MCB Type B 20A' },
    { value: 'mcb-b32', label: 'MCB Type B 32A' },
    { value: 'mcb-c16', label: 'MCB Type C 16A' },
    { value: 'mcb-c20', label: 'MCB Type C 20A' },
    { value: 'mcb-c32', label: 'MCB Type C 32A' },
    { value: 'fuse-5', label: '5A Fuse' },
    { value: 'fuse-13', label: '13A Fuse' },
    { value: 'fuse-20', label: '20A Fuse' },
    { value: 'fuse-32', label: '32A Fuse' }
  ];

  const getMaxZs = (device: string) => {
    // Use central BS 7671 data so this card always stays in sync
    if (device.startsWith('mcb-')) {
      const [, curveAndRating] = device.split('-'); // e.g. "b6"
      const curveLetter = curveAndRating?.[0]?.toLowerCase();
      const rating = parseInt(curveAndRating.slice(1), 10);
      if (isNaN(rating)) return '';

      const curveMap: Record<string, 'typeB' | 'typeC' | 'typeD'> = {
        b: 'typeB',
        c: 'typeC',
        d: 'typeD'
      };
      const curve = curveMap[curveLetter ?? ''];
      if (!curve) return '';

      const result = getMcbZsLimit(curve, rating, '0.4s');
      return result ? result.maxZs.toFixed(2) : '';
    }

    if (device.startsWith('fuse-')) {
      const rating = parseInt(device.split('-')[1] ?? '', 10);
      if (isNaN(rating)) return '';

      // 5A, 20A, 30/32A rewirable fuses (BS 3036), 13A plug fuse (BS 1362)
      const isPlugTop = rating === 13;
      const fuseType: FuseType = isPlugTop ? 'bs1362' : 'bs3036';
      const fuseRating = rating === 32 ? 30 : rating; // 30A BS 3036 corresponds to legacy "32A" fuse labelling

      const result = getFuseZsLimit(fuseType, fuseRating, '0.4s');
      return result ? result.maxZs.toFixed(2) : '';
    }

    return '';
  };

  const calculateTemperatureCorrection = (zs: number, testTemp: number, maxTemp: number = 70): number => {
    const factor = (230 + maxTemp) / (230 + testTemp);
    return zs * factor;
  };

  const updateCurrentTest = (field: string, value: string) => {
    let updatedTest = {...currentTest, [field]: value};
    
    if (field === 'protectiveDevice') {
      updatedTest.zsMaxPermitted = getMaxZs(value);
    }
    
    if ((field === 'zsReading' || field === 'temperature') && updatedTest.zsReading && updatedTest.temperature) {
      const zsReading = parseFloat(updatedTest.zsReading);
      const testTemp = parseFloat(updatedTest.temperature);
      if (!isNaN(zsReading) && !isNaN(testTemp)) {
        const corrected = calculateTemperatureCorrection(zsReading, testTemp);
        updatedTest.correctedZs = corrected.toFixed(2);
      }
    }
    
    onUpdateTest(field, updatedTest[field as keyof ZsTestResult] as string);
  };

  return (
    <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/20">
      <CardHeader>
        <CardTitle className="text-red-400 flex items-center gap-2">
          <Target className="h-6 w-6" />
          Earth Fault Loop Impedance (Zs) Testing
        </CardTitle>
        <CardDescription className="text-gray-300">
          Measure and verify earth fault loop impedance - BS 7671 Regulation 612.9
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="circuitRef">Circuit Reference</Label>
            <Input
              id="circuitRef"
              placeholder="e.g., C1, Ring 1"
              value={currentTest.circuitRef}
              onChange={(e) => updateCurrentTest('circuitRef', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="protectiveDevice">Protective Device</Label>
            <Select value={currentTest.protectiveDevice} onValueChange={(value) => updateCurrentTest('protectiveDevice', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select protective device" />
              </SelectTrigger>
              <SelectContent>
                {protectiveDevices.map((device) => (
                  <SelectItem key={device.value} value={device.value}>
                    {device.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zsReading">Zs Reading (Ω)</Label>
            <Input
              id="zsReading"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={currentTest.zsReading}
              onChange={(e) => updateCurrentTest('zsReading', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zsMaxPermitted">Max Permitted Zs (Ω)</Label>
            <Input
              id="zsMaxPermitted"
              type="number"
              step="0.01"
              placeholder="Auto-filled"
              value={currentTest.zsMaxPermitted}
              onChange={(e) => updateCurrentTest('zsMaxPermitted', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="temperature">Test Temperature (°C)</Label>
            <Input
              id="temperature"
              type="number"
              placeholder="20"
              value={currentTest.temperature}
              onChange={(e) => updateCurrentTest('temperature', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Test Notes</Label>
            <Input
              id="notes"
              placeholder="Additional observations"
              value={currentTest.notes}
              onChange={(e) => updateCurrentTest('notes', e.target.value)}
            />
          </div>
        </div>

        <Button 
          onClick={onAddTest}
          className="w-full bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
          disabled={!currentTest.circuitRef || !currentTest.zsReading || !currentTest.protectiveDevice}
        >
          <Calculator className="h-4 w-4 mr-2" />
          Add Zs Test Result
        </Button>
      </CardContent>
    </Card>
  );
};

export default BasicZsTestCard;

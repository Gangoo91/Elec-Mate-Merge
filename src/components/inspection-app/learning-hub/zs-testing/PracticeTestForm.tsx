
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator } from 'lucide-react';
import { ZsTestResult, protectiveDevices, testMethods } from './types';

interface PracticeTestFormProps {
  currentTest: ZsTestResult;
  onUpdateTest: (field: string, value: string) => void;
  onAddTest: () => void;
}

const PracticeTestForm = ({ currentTest, onUpdateTest, onAddTest }: PracticeTestFormProps) => {
  const getMaxZsForDevice = (deviceValue: string): string => {
    const device = protectiveDevices.find(d => d.value === deviceValue);
    return device?.maxZs || '';
  };

  const calculateTemperatureCorrection = (zs: number, testTemp: number): number => {
    const factor = (230 + 70) / (230 + testTemp);
    return zs * factor;
  };

  const handleDeviceChange = (value: string) => {
    onUpdateTest('protectiveDevice', value);
    
    const device = protectiveDevices.find(d => d.value === value);
    if (device) {
      onUpdateTest('zsMaxPermitted', device.maxZs);
      const rating = device.label.match(/(\d+)A/);
      if (rating) {
        onUpdateTest('deviceRating', rating[1]);
      }
    }
  };

  const handleZsReadingChange = (value: string) => {
    onUpdateTest('zsReading', value);
    
    if (value && currentTest.temperature) {
      const zsReading = parseFloat(value);
      const testTemp = parseFloat(currentTest.temperature);
      
      if (!isNaN(zsReading) && !isNaN(testTemp)) {
        const corrected = calculateTemperatureCorrection(zsReading, testTemp);
        onUpdateTest('correctedZs', corrected.toFixed(2));
      }
    }
  };

  const handleTemperatureChange = (value: string) => {
    onUpdateTest('temperature', value);
    
    if (currentTest.zsReading && value) {
      const zsReading = parseFloat(currentTest.zsReading);
      const testTemp = parseFloat(value);
      
      if (!isNaN(zsReading) && !isNaN(testTemp)) {
        const corrected = calculateTemperatureCorrection(zsReading, testTemp);
        onUpdateTest('correctedZs', corrected.toFixed(2));
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="circuitRef">Circuit Reference</Label>
          <Input
            id="circuitRef"
            placeholder="e.g., C1, Ring 1"
            value={currentTest.circuitRef}
            onChange={(e) => onUpdateTest('circuitRef', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="testMethod">Test Method</Label>
          <Select 
            value={currentTest.testMethod} 
            onValueChange={(value) => onUpdateTest('testMethod', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select test method" />
            </SelectTrigger>
            <SelectContent>
              {testMethods.map((method) => (
                <SelectItem key={method.value} value={method.value}>
                  {method.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="protectiveDevice">Protective Device</Label>
          <Select 
            value={currentTest.protectiveDevice} 
            onValueChange={handleDeviceChange}
          >
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
          <Label htmlFor="zsMaxPermitted">Max Permitted Zs (Ω)</Label>
          <Input
            id="zsMaxPermitted"
            type="number"
            step="0.01"
            placeholder="Auto-filled"
            value={currentTest.zsMaxPermitted}
            onChange={(e) => onUpdateTest('zsMaxPermitted', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="zsReading">Zs Reading (Ω)</Label>
          <Input
            id="zsReading"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={currentTest.zsReading}
            onChange={(e) => handleZsReadingChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="temperature">Test Temperature (°C)</Label>
          <Input
            id="temperature"
            type="number"
            placeholder="20"
            value={currentTest.temperature}
            onChange={(e) => handleTemperatureChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="correctedZs">Corrected Zs (Ω)</Label>
          <Input
            id="correctedZs"
            type="number"
            step="0.01"
            placeholder="Auto-calculated"
            value={currentTest.correctedZs}
            readOnly
            className="bg-gray-100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Test Notes</Label>
          <Input
            id="notes"
            placeholder="Additional observations"
            value={currentTest.notes}
            onChange={(e) => onUpdateTest('notes', e.target.value)}
          />
        </div>
      </div>

      {currentTest.zsReading && currentTest.temperature && (
        <div className="bg-card rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2">Temperature Correction Calculation</h4>
          <div className="text-sm text-white space-y-1">
            <p>Measured Zs: {currentTest.zsReading}Ω at {currentTest.temperature}°C</p>
            <p>Correction factor: (230 + 70) / (230 + {currentTest.temperature}) = {((300) / (230 + parseFloat(currentTest.temperature || '20'))).toFixed(3)}</p>
            <p>Corrected Zs: {currentTest.correctedZs}Ω (at 70°C conductor temperature)</p>
            {currentTest.zsMaxPermitted && (
              <p className={`font-medium ${parseFloat(currentTest.correctedZs) <= parseFloat(currentTest.zsMaxPermitted) ? 'text-green-400' : 'text-red-400'}`}>
                {parseFloat(currentTest.correctedZs) <= parseFloat(currentTest.zsMaxPermitted) ? 'PASS' : 'FAIL'} 
                - Limit: {currentTest.zsMaxPermitted}Ω
              </p>
            )}
          </div>
        </div>
      )}

      <Button 
        onClick={onAddTest}
        className="w-full bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
        disabled={!currentTest.circuitRef || !currentTest.zsReading || !currentTest.protectiveDevice}
      >
        <Calculator className="h-4 w-4 mr-2" />
        Add Zs Test Result
      </Button>
    </div>
  );
};

export default PracticeTestForm;

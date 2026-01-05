
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { insulationTestVoltageOptions } from '@/types/testOptions';

interface TestMethodInfoProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

const TestMethodInfo = ({ formData, onUpdate }: TestMethodInfoProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gradient-to-r from-elec-gray/10 to-elec-gray/5 rounded-xl border border-elec-yellow/30 shadow-lg">
        <div className="space-y-2">
          <Label htmlFor="testMethod" className="text-sm">Test Method Applied</Label>
          <Input
            id="testMethod"
            value={formData.testMethod || ''}
            onChange={(e) => onUpdate('testMethod', e.target.value)}
            placeholder="BS 7671 Method 1, 2, or 3"
            className="h-10 text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="testVoltage" className="text-sm">Test Voltage Applied</Label>
          <Select 
            value={formData.testVoltage || ''} 
            onValueChange={(value) => onUpdate('testVoltage', value)}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Select test voltage..." />
            </SelectTrigger>
            <SelectContent className="bg-background z-50 max-h-[200px] overflow-y-auto">
              {insulationTestVoltageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="testNotes" className="text-sm">Test Notes & Observations</Label>
        <Textarea
          id="testNotes"
          value={formData.testNotes || ''}
          onChange={(e) => onUpdate('testNotes', e.target.value)}
          placeholder="Record any deviations from standard test procedures, limitations encountered, or additional observations..."
          className="min-h-[80px] md:min-h-[120px] resize-none text-sm"
        />
      </div>
    </div>
  );
};

export default TestMethodInfo;

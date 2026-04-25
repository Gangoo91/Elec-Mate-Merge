import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { insulationTestVoltageOptions } from '@/types/testOptions';

interface TestMethodInfoProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

const testMethodOptions = [
  { value: 'Method 1', label: 'Method 1 — Live conductors, no isolation' },
  { value: 'Method 2', label: 'Method 2 — Safe isolation applied' },
  { value: 'Method 3', label: 'Method 3 — Isolation of protective devices' },
  { value: 'Method 1 & 2', label: 'Method 1 & 2 — Combined' },
  { value: 'Method 2 & 3', label: 'Method 2 & 3 — Combined' },
];

const TestMethodInfo = ({ formData, onUpdate }: TestMethodInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="testMethod" className="text-xs text-white">
            Test Method Applied
          </Label>
          <MobileSelectPicker
            value={formData.testMethod || ''}
            onValueChange={(value) => onUpdate('testMethod', value)}
            options={testMethodOptions}
            placeholder="Select BS 7671 method..."
            title="Test Method Applied"
            triggerClassName="bg-white/[0.06] border-white/[0.08] text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="testVoltage" className="text-xs text-white">
            Test Voltage Applied
          </Label>
          <MobileSelectPicker
            value={formData.testVoltage || ''}
            onValueChange={(value) => onUpdate('testVoltage', value)}
            options={insulationTestVoltageOptions}
            placeholder="Select test voltage..."
            title="Test Voltage"
            triggerClassName="bg-white/[0.06] border-white/[0.08] text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="testNotes" className="text-xs text-white">
          Test Notes & Observations
        </Label>
        <Textarea
          id="testNotes"
          value={formData.testNotes || ''}
          onChange={(e) => onUpdate('testNotes', e.target.value)}
          placeholder="Deviations, limitations, or additional observations..."
          className="min-h-[100px] resize-none text-base touch-manipulation bg-white/[0.06] border-white/[0.08] placeholder:text-white/30"
          style={{ fontSize: '16px' }}
        />
      </div>
    </div>
  );
};

export default TestMethodInfo;

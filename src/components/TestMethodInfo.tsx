
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { insulationTestVoltageOptions } from '@/types/testOptions';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface TestMethodInfoProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

const TestMethodInfo = ({ formData, onUpdate }: TestMethodInfoProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <div className={cn(
        "grid gap-4",
        isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 p-4 bg-gradient-to-r from-elec-gray/10 to-elec-gray/5 rounded-xl border border-elec-yellow/30"
      )}>
        <div className="space-y-2">
          <Label htmlFor="testMethod" className="text-sm font-medium text-foreground/80">Test Method Applied</Label>
          <Input
            id="testMethod"
            value={formData.testMethod || ''}
            onChange={(e) => onUpdate('testMethod', e.target.value)}
            placeholder="BS 7671 Method 1, 2, or 3"
            className="h-11 text-base touch-manipulation bg-card/50 border-border/30"
            style={{ fontSize: '16px' }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="testVoltage" className="text-sm font-medium text-foreground/80">Test Voltage Applied</Label>
          <MobileSelectPicker
            value={formData.testVoltage || ''}
            onValueChange={(value) => onUpdate('testVoltage', value)}
            options={insulationTestVoltageOptions}
            placeholder="Select test voltage..."
            title="Test Voltage"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="testNotes" className="text-sm font-medium text-foreground/80">Test Notes & Observations</Label>
        <Textarea
          id="testNotes"
          value={formData.testNotes || ''}
          onChange={(e) => onUpdate('testNotes', e.target.value)}
          placeholder="Record any deviations from standard test procedures, limitations encountered, or additional observations..."
          className="min-h-[100px] resize-none text-base touch-manipulation bg-card/50 border-border/30"
          style={{ fontSize: '16px' }}
        />
      </div>
    </div>
  );
};

export default TestMethodInfo;

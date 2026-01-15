
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Calculator } from 'lucide-react';
import { PolarityTestResult, testMethods } from './types';

interface PracticeTestFormProps {
  currentTest: PolarityTestResult;
  onUpdateTest: (field: string, value: string) => void;
  onAddTest: () => void;
}

const PracticeTestForm = ({ currentTest, onUpdateTest, onAddTest }: PracticeTestFormProps) => {
  const canAddTest = currentTest.circuitRef && 
    (currentTest.socketOutlets !== 'pending' || 
     currentTest.lightingPoints !== 'pending' || 
     currentTest.isolatorSwitches !== 'pending');

  return (
    <div className="space-y-6">
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Practice Polarity Testing</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="circuitRef">Circuit Reference</Label>
            <Input
              id="circuitRef"
              placeholder="e.g., C1, Ring Main"
              value={currentTest.circuitRef}
              onChange={(e) => onUpdateTest('circuitRef', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="testMethod">Test Method</Label>
            <MobileSelectPicker
              value={currentTest.testMethod}
              onValueChange={(value) => onUpdateTest('testMethod', value)}
              options={testMethods}
              placeholder="Select test method"
              title="Test Method"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="socketOutlets">Socket Outlets</Label>
            <MobileSelectPicker
              value={currentTest.socketOutlets}
              onValueChange={(value) => onUpdateTest('socketOutlets', value)}
              options={[
                { value: 'pass', label: 'Pass' },
                { value: 'fail', label: 'Fail' },
                { value: 'n/a', label: 'N/A' },
              ]}
              placeholder="Test result"
              title="Socket Outlets"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lightingPoints">Lighting Points</Label>
            <MobileSelectPicker
              value={currentTest.lightingPoints}
              onValueChange={(value) => onUpdateTest('lightingPoints', value)}
              options={[
                { value: 'pass', label: 'Pass' },
                { value: 'fail', label: 'Fail' },
                { value: 'n/a', label: 'N/A' },
              ]}
              placeholder="Test result"
              title="Lighting Points"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="isolatorSwitches">Isolator Switches</Label>
            <MobileSelectPicker
              value={currentTest.isolatorSwitches}
              onValueChange={(value) => onUpdateTest('isolatorSwitches', value)}
              options={[
                { value: 'pass', label: 'Pass' },
                { value: 'fail', label: 'Fail' },
                { value: 'n/a', label: 'N/A' },
              ]}
              placeholder="Test result"
              title="Isolator Switches"
            />
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <Label htmlFor="notes">Test Notes</Label>
          <Input
            id="notes"
            placeholder="Additional observations or defects noted"
            value={currentTest.notes}
            onChange={(e) => onUpdateTest('notes', e.target.value)}
          />
        </div>

        <Button 
          onClick={onAddTest}
          className="w-full bg-purple-500/20 text-foreground border border-purple-500/30 hover:bg-purple-500/30"
          disabled={!canAddTest}
        >
          <Calculator className="h-4 w-4 mr-2" />
          Add Polarity Test Result
        </Button>
      </div>
    </div>
  );
};

export default PracticeTestForm;

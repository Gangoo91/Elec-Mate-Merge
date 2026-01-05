
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
            <Select value={currentTest.testMethod} onValueChange={(value) => onUpdateTest('testMethod', value)}>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="socketOutlets">Socket Outlets</Label>
            <Select value={currentTest.socketOutlets} onValueChange={(value) => onUpdateTest('socketOutlets', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Test result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pass">Pass</SelectItem>
                <SelectItem value="fail">Fail</SelectItem>
                <SelectItem value="n/a">N/A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lightingPoints">Lighting Points</Label>
            <Select value={currentTest.lightingPoints} onValueChange={(value) => onUpdateTest('lightingPoints', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Test result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pass">Pass</SelectItem>
                <SelectItem value="fail">Fail</SelectItem>
                <SelectItem value="n/a">N/A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="isolatorSwitches">Isolator Switches</Label>
            <Select value={currentTest.isolatorSwitches} onValueChange={(value) => onUpdateTest('isolatorSwitches', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Test result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pass">Pass</SelectItem>
                <SelectItem value="fail">Fail</SelectItem>
                <SelectItem value="n/a">N/A</SelectItem>
              </SelectContent>
            </Select>
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

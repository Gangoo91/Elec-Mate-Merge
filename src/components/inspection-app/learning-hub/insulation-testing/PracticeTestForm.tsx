
import React from 'react';
import { Calculator, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InsulationTestResult, testVoltages } from './types';

interface PracticeTestFormProps {
  currentTest: InsulationTestResult;
  onUpdateTest: (field: string, value: string) => void;
  onAddTest: () => void;
}

const PracticeTestForm = ({ currentTest, onUpdateTest, onAddTest }: PracticeTestFormProps) => (
  <div className="space-y-6">
    <div className="bg-card border border-border rounded-lg p-4">
      <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
        <Calculator className="h-4 w-4" />
        Practice Test Recording
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
          <Label htmlFor="testVoltage">Test Voltage</Label>
          <Select value={currentTest.testVoltage} onValueChange={(value) => onUpdateTest('testVoltage', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select test voltage" />
            </SelectTrigger>
            <SelectContent>
              {testVoltages.map((voltage) => (
                <SelectItem key={voltage.value} value={voltage.value}>
                  {voltage.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="liveNeutral">Live-Neutral (MΩ)</Label>
          <Input
            id="liveNeutral"
            placeholder="e.g., >999 or 150"
            value={currentTest.liveNeutral}
            onChange={(e) => onUpdateTest('liveNeutral', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="liveEarth">Live-Earth (MΩ)</Label>
          <Input
            id="liveEarth"
            placeholder="e.g., >999 or 250"
            value={currentTest.liveEarth}
            onChange={(e) => onUpdateTest('liveEarth', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="neutralEarth">Neutral-Earth (MΩ)</Label>
          <Input
            id="neutralEarth"
            placeholder="e.g., >999 or 180"
            value={currentTest.neutralEarth}
            onChange={(e) => onUpdateTest('neutralEarth', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="temperature">Temperature (°C)</Label>
          <Input
            id="temperature"
            type="number"
            placeholder="20"
            value={currentTest.temperature}
            onChange={(e) => onUpdateTest('temperature', e.target.value)}
          />
        </div>
      </div>

      {currentTest.temperature !== '20' && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
          <div className="text-blue-400 font-medium mb-2">Temperature Corrected Values (20°C reference)</div>
          <div className="text-sm text-white space-y-1">
            <p>Live-Neutral: {currentTest.correctedValues.liveNeutral || 'N/A'} MΩ</p>
            <p>Live-Earth: {currentTest.correctedValues.liveEarth || 'N/A'} MΩ</p>
            <p>Neutral-Earth: {currentTest.correctedValues.neutralEarth || 'N/A'} MΩ</p>
          </div>
        </div>
      )}

      <div className="space-y-2 mb-4">
        <Label htmlFor="notes">Test Notes</Label>
        <Input
          id="notes"
          placeholder="Additional observations"
          value={currentTest.notes}
          onChange={(e) => onUpdateTest('notes', e.target.value)}
        />
      </div>

      <Button 
        onClick={onAddTest}
        className="w-full bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30"
        disabled={!currentTest.circuitRef || (!currentTest.liveNeutral && !currentTest.liveEarth && !currentTest.neutralEarth)}
      >
        <Calculator className="h-4 w-4 mr-2" />
        Add Insulation Test Result
      </Button>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="h-4 w-4 text-yellow-400" />
        <h4 className="font-medium text-yellow-400">BS 7671 Acceptance Criteria</h4>
      </div>
      <div className="space-y-1 text-sm text-white">
        <p>• Minimum insulation resistance: 1.0 MΩ for circuits up to 500V (Table 61)</p>
        <p>• Test voltage: Minimum 250V DC, typically 500V DC for LV circuits</p>
        <p>• Temperature correction: Apply when test temperature differs significantly from 20°C</p>
        <p>• Test duration: Apply test voltage for 1 minute minimum</p>
        <p>• Safety: Ensure all electronic equipment is disconnected or protected</p>
        <p>• Higher values expected: New installations typically show &gt;100MΩ</p>
      </div>
    </div>
  </div>
);

export default PracticeTestForm;

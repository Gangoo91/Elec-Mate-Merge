
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Zap, Check, X, AlertTriangle } from 'lucide-react';

interface TestEntryProps {
  reportType: string;
  onComplete: () => void;
}

interface Circuit {
  ref: string;
  description: string;
  type: string;
}

interface TestResult {
  circuitRef: string;
  continuityR1: string;
  continuityR2: string;
  insulation: string;
  polarityOk: boolean;
  zs: string;
  rcd30mA: string;
  rcd150mA: string;
  resultsOk: boolean;
  notes: string;
}

const TestEntrySection = ({ reportType, onComplete }: TestEntryProps) => {
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [currentCircuit, setCurrentCircuit] = useState<string>('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [completedTests, setCompletedTests] = useState<string[]>([]);
  const [currentResult, setCurrentResult] = useState<TestResult>({
    circuitRef: '',
    continuityR1: '',
    continuityR2: '',
    insulation: '',
    polarityOk: true,
    zs: '',
    rcd30mA: '',
    rcd150mA: '',
    resultsOk: true,
    notes: '',
  });

  useEffect(() => {
    // Load saved circuits
    const savedCircuits = localStorage.getItem('eicr-circuits');
    if (savedCircuits) {
      const parsedCircuits = JSON.parse(savedCircuits);
      setCircuits(parsedCircuits);
      if (parsedCircuits.length > 0 && !currentCircuit) {
        setCurrentCircuit(parsedCircuits[0].ref);
      }
    }

    // Load saved test results
    const savedResults = localStorage.getItem('eicr-test-results');
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults);
      setTestResults(parsedResults);
      const completed = parsedResults.map((r: TestResult) => r.circuitRef);
      setCompletedTests(completed);
    }
  }, []);

  useEffect(() => {
    if (currentCircuit) {
      const existingResult = testResults.find(r => r.circuitRef === currentCircuit);
      if (existingResult) {
        setCurrentResult(existingResult);
      } else {
        setCurrentResult({
          circuitRef: currentCircuit,
          continuityR1: '',
          continuityR2: '',
          insulation: '',
          polarityOk: true,
          zs: '',
          rcd30mA: '',
          rcd150mA: '',
          resultsOk: true,
          notes: '',
        });
      }
    }
  }, [currentCircuit, testResults]);

  const updateCurrentResult = (field: keyof TestResult, value: any) => {
    setCurrentResult(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveCurrentResult = () => {
    const updatedResults = testResults.filter(r => r.circuitRef !== currentCircuit);
    updatedResults.push(currentResult);
    
    setTestResults(updatedResults);
    
    if (!completedTests.includes(currentCircuit)) {
      setCompletedTests([...completedTests, currentCircuit]);
    }
    
    // Save to localStorage
    localStorage.setItem('eicr-test-results', JSON.stringify(updatedResults));
    
    // Find next uncompleted circuit
    const nextCircuit = circuits.find(c => !completedTests.includes(c.ref) && c.ref !== currentCircuit);
    if (nextCircuit) {
      setCurrentCircuit(nextCircuit.ref);
    }
  };

  const allCircuitsTested = circuits.length > 0 && completedTests.length >= circuits.length;

  const handleComplete = () => {
    localStorage.setItem('eicr-testing-complete', 'true');
    onComplete();
  };

  const getCircuitById = (ref: string) => {
    return circuits.find(c => c.ref === ref);
  };

  const isValidValue = (value: string): boolean => {
    return value !== undefined && value !== null && value.trim() !== '';
  };

  const canSaveResult = (): boolean => {
    // Basic validation for required fields
    return (
      isValidValue(currentResult.continuityR1) &&
      isValidValue(currentResult.insulation) &&
      isValidValue(currentResult.zs)
    );
  };

  return (
    <div className="space-y-6">
      {/* Circuit Selection */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
                <Zap className="h-6 w-6 text-elec-yellow" />
              </div>
              <div>
                <CardTitle>Test Results Entry</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {completedTests.length}/{circuits.length} circuits tested
                </p>
              </div>
            </div>
            <div>
              <Select 
                value={currentCircuit} 
                onValueChange={setCurrentCircuit}
              >
                <SelectTrigger className="w-56 bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50">
                  <SelectValue placeholder="Select circuit" />
                </SelectTrigger>
                <SelectContent>
                  {circuits.map((circuit) => (
                    <SelectItem key={circuit.ref} value={circuit.ref}>
                      <div className="flex items-center gap-2">
                        {circuit.ref}: {circuit.description}
                        {completedTests.includes(circuit.ref) && (
                          <Check className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Current Circuit Testing */}
      {currentCircuit && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle>
              {getCircuitById(currentCircuit)?.ref}: {getCircuitById(currentCircuit)?.description}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Continuity Tests */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Continuity Tests</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="continuityR1">R₁ Continuity (Ω)</Label>
                  <Input
                    id="continuityR1"
                    type="text"
                    value={currentResult.continuityR1}
                    onChange={(e) => updateCurrentResult('continuityR1', e.target.value)}
                    placeholder="e.g., 0.18"
                    className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                  />
                </div>

                <div>
                  <Label htmlFor="continuityR2">R₂ Continuity (Ω)</Label>
                  <Input
                    id="continuityR2"
                    type="text"
                    value={currentResult.continuityR2}
                    onChange={(e) => updateCurrentResult('continuityR2', e.target.value)}
                    placeholder="e.g., 0.16"
                    className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                  />
                </div>
              </div>
            </div>

            {/* Insulation Resistance */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Insulation Resistance</h3>
              <div>
                <Label htmlFor="insulation">Insulation Resistance (MΩ)</Label>
                <Input
                  id="insulation"
                  type="text"
                  value={currentResult.insulation}
                  onChange={(e) => updateCurrentResult('insulation', e.target.value)}
                  placeholder="e.g., >200"
                  className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                />
              </div>
            </div>

            {/* Polarity */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Polarity</h3>
              <div className="flex items-center gap-3">
                <Switch
                  checked={currentResult.polarityOk}
                  onCheckedChange={(checked) => updateCurrentResult('polarityOk', checked)}
                />
                <Label>Polarity correct</Label>
              </div>
            </div>

            {/* Earth Fault Loop Impedance */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Earth Fault Loop Impedance</h3>
              <div>
                <Label htmlFor="zs">Zs Value (Ω)</Label>
                <Input
                  id="zs"
                  type="text"
                  value={currentResult.zs}
                  onChange={(e) => updateCurrentResult('zs', e.target.value)}
                  placeholder="e.g., 0.31"
                  className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                />
              </div>
            </div>

            {/* RCD Test (if applicable) */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">RCD Testing (if applicable)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rcd30mA">RCD Trip Time at 30mA (ms)</Label>
                  <Input
                    id="rcd30mA"
                    type="text"
                    value={currentResult.rcd30mA}
                    onChange={(e) => updateCurrentResult('rcd30mA', e.target.value)}
                    placeholder="e.g., 34"
                    className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                  />
                </div>

                <div>
                  <Label htmlFor="rcd150mA">RCD Trip Time at 150mA (ms)</Label>
                  <Input
                    id="rcd150mA"
                    type="text"
                    value={currentResult.rcd150mA}
                    onChange={(e) => updateCurrentResult('rcd150mA', e.target.value)}
                    placeholder="e.g., 20"
                    className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                  />
                </div>
              </div>
            </div>

            {/* Results Assessment */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Results Assessment</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <RadioGroup 
                    value={currentResult.resultsOk ? 'pass' : 'fail'}
                    onValueChange={(value) => updateCurrentResult('resultsOk', value === 'pass')}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pass" id="pass" />
                      <Label htmlFor="pass">Pass</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fail" id="fail" />
                      <Label htmlFor="fail">Fail</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes and Observations</Label>
                  <Input
                    id="notes"
                    type="text"
                    value={currentResult.notes}
                    onChange={(e) => updateCurrentResult('notes', e.target.value)}
                    placeholder="Any additional notes about this circuit..."
                    className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                  />
                </div>
              </div>
            </div>

            {/* Save Results Button */}
            <div className="flex justify-end">
              <Button
                onClick={saveCurrentResult}
                disabled={!canSaveResult()}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                Save Results for This Circuit
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Testing Completion */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Testing Completion</h3>
              <div className="space-y-1">
                {allCircuitsTested ? (
                  <p className="text-sm text-green-400">
                    ✓ All circuits tested - ready to proceed
                  </p>
                ) : (
                  <p className="text-sm text-yellow-400">
                    ⚠ {circuits.length - completedTests.length} circuits remaining to test
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Complete testing for all circuits to proceed to the summary
                </p>
              </div>
            </div>
            <Button
              onClick={handleComplete}
              disabled={!allCircuitsTested}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 disabled:opacity-50"
            >
              Complete Testing
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestEntrySection;

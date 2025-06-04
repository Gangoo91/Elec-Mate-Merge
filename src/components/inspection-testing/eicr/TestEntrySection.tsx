
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestTube, Plus, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
import { ReportType } from './DigitalEICRForm';
import { useEICR } from '@/contexts/EICRContext';

interface TestResult {
  id: string;
  circuitRef: string;
  testType: string;
  expectedValue?: number;
  measuredValue?: number;
  unit: string;
  result: 'pass' | 'fail' | 'n/a';
  notes: string;
}

interface Circuit {
  ref: string;
  description: string;
  type: string;
  protectiveDevice: string;
  rating: string;
}

interface TestEntryProps {
  reportType: ReportType;
  onComplete: () => void;
}

const TestEntrySection = ({ reportType, onComplete }: TestEntryProps) => {
  const { addFault, addCircuit } = useEICR();
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [currentCircuit, setCurrentCircuit] = useState('');
  const [activeTestType, setActiveTestType] = useState('continuity');

  // Test types based on report type
  const getTestTypes = () => {
    const baseTests = [
      'continuity',
      'insulation-resistance',
      'polarity',
      'earth-fault-loop',
      'rcd-operation'
    ];

    if (reportType === 'initial-verification') {
      return [...baseTests, 'phase-sequence', 'voltage', 'functional-testing'];
    }

    return baseTests;
  };

  const testTypeLabels: Record<string, string> = {
    'continuity': 'Continuity of Protective Conductors',
    'insulation-resistance': 'Insulation Resistance',
    'polarity': 'Polarity',
    'earth-fault-loop': 'Earth Fault Loop Impedance',
    'rcd-operation': 'RCD Operation',
    'phase-sequence': 'Phase Sequence',
    'voltage': 'Supply Voltage',
    'functional-testing': 'Functional Testing',
  };

  const testLimits: Record<string, { min?: number; max?: number; unit: string }> = {
    'continuity': { max: 0.05, unit: 'Ω' },
    'insulation-resistance': { min: 1.0, unit: 'MΩ' },
    'earth-fault-loop': { max: 1.44, unit: 'Ω' },
    'rcd-operation': { max: 300, unit: 'ms' },
    'voltage': { min: 216.2, max: 253, unit: 'V' },
  };

  useEffect(() => {
    // Initialize with a default circuit if none exist
    if (circuits.length === 0) {
      setCircuits([
        {
          ref: 'C1',
          description: 'Downstairs lights',
          type: 'lighting',
          protectiveDevice: 'MCB',
          rating: '6A',
        },
      ]);
    }
  }, [circuits.length]);

  const addNewCircuit = () => {
    const newRef = `C${circuits.length + 1}`;
    const newCircuit: Circuit = {
      ref: newRef,
      description: '',
      type: 'lighting',
      protectiveDevice: 'MCB',
      rating: '6A',
    };
    setCircuits(prev => [...prev, newCircuit]);
    setCurrentCircuit(newRef);
  };

  const updateCircuit = (ref: string, field: keyof Circuit, value: string) => {
    setCircuits(prev =>
      prev.map(circuit =>
        circuit.ref === ref ? { ...circuit, [field]: value } : circuit
      )
    );
  };

  const addTestResult = () => {
    if (!currentCircuit) return;

    const newResult: TestResult = {
      id: `${currentCircuit}-${activeTestType}-${Date.now()}`,
      circuitRef: currentCircuit,
      testType: activeTestType,
      measuredValue: undefined,
      unit: testLimits[activeTestType]?.unit || '',
      result: 'n/a',
      notes: '',
    };

    setTestResults(prev => [...prev, newResult]);
  };

  const updateTestResult = (id: string, field: keyof TestResult, value: any) => {
    setTestResults(prev =>
      prev.map(result => {
        if (result.id === id) {
          const updated = { ...result, [field]: value };
          
          // Auto-calculate result based on measured value
          if (field === 'measuredValue' && value !== undefined) {
            const limits = testLimits[result.testType];
            if (limits) {
              if (limits.min !== undefined && value < limits.min) {
                updated.result = 'fail';
              } else if (limits.max !== undefined && value > limits.max) {
                updated.result = 'fail';
              } else {
                updated.result = 'pass';
              }

              // Add fault if test fails
              if (updated.result === 'fail') {
                const circuit = circuits.find(c => c.ref === result.circuitRef);
                addFault({
                  circuitRef: result.circuitRef,
                  circuitType: circuit?.type as any || 'other',
                  faultCode: getFaultCode(result.testType, value, limits),
                  description: `${testTypeLabels[result.testType]} test failure: ${value}${result.unit}`,
                  location: `Circuit ${result.circuitRef} - ${circuit?.description || 'Unknown'}`,
                  remedy: getRemedyRecommendation(result.testType),
                });
              }
            }
          }
          
          return updated;
        }
        return result;
      })
    );
  };

  const getFaultCode = (testType: string, value: number, limits: any): 'C1' | 'C2' | 'C3' => {
    if (testType === 'insulation-resistance' && value < 0.5) return 'C1';
    if (testType === 'earth-fault-loop' && value > limits.max) return 'C2';
    if (testType === 'rcd-operation' && value > limits.max) return 'C2';
    return 'C3';
  };

  const getRemedyRecommendation = (testType: string): string => {
    const remedies: Record<string, string> = {
      'continuity': 'Check and tighten all protective conductor connections',
      'insulation-resistance': 'Investigate and rectify insulation fault',
      'earth-fault-loop': 'Check earthing arrangements and protective conductor continuity',
      'rcd-operation': 'RCD to be replaced or repaired by competent person',
    };
    return remedies[testType] || 'Further investigation required';
  };

  const removeTestResult = (id: string) => {
    setTestResults(prev => prev.filter(result => result.id !== id));
  };

  const getTestProgress = () => {
    const testTypes = getTestTypes();
    const completedTests = new Set(testResults.map(r => `${r.circuitRef}-${r.testType}`));
    const totalRequired = circuits.length * testTypes.length;
    const completed = Array.from(completedTests).length;
    return { completed, total: totalRequired, percentage: (completed / totalRequired) * 100 };
  };

  const canComplete = () => {
    const progress = getTestProgress();
    return progress.completed >= progress.total * 0.8; // Allow completion at 80% for flexibility
  };

  const handleComplete = () => {
    // Add all circuits to EICR context
    circuits.forEach(circuit => {
      addCircuit({
        ref: circuit.ref,
        type: circuit.type as any,
        description: circuit.description,
        protective_device: circuit.protectiveDevice,
        rating: circuit.rating,
        conductor_csa: '2.5mm²', // Default value
        earthing_conductor: '1.5mm²', // Default value
        max_zs: testLimits['earth-fault-loop']?.max || 1.44,
        overall_condition: 'satisfactory',
      });
    });

    onComplete();
  };

  const progress = getTestProgress();
  const failedTests = testResults.filter(r => r.result === 'fail').length;

  return (
    <div className="space-y-6">
      {/* Progress Summary */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-elec-yellow" />
              Testing & Measurements Progress
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">
                {progress.completed}/{progress.total} Tests
              </Badge>
              {failedTests > 0 && (
                <Badge variant="destructive">
                  {failedTests} Failed
                </Badge>
              )}
            </div>
          </div>
          <div className="w-full bg-elec-dark rounded-full h-2">
            <div
              className="bg-elec-yellow h-2 rounded-full transition-all"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="circuits">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="circuits">Circuit Management</TabsTrigger>
          <TabsTrigger value="testing">Test Results Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="circuits" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Circuit Information</CardTitle>
                <Button onClick={addNewCircuit} size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Circuit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {circuits.map((circuit) => (
                <div key={circuit.ref} className="p-4 border border-elec-yellow/20 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <Label>Circuit Ref</Label>
                      <Input
                        value={circuit.ref}
                        onChange={(e) => updateCircuit(circuit.ref, 'ref', e.target.value)}
                        className="bg-elec-dark border-elec-yellow/20"
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input
                        value={circuit.description}
                        onChange={(e) => updateCircuit(circuit.ref, 'description', e.target.value)}
                        placeholder="e.g., Downstairs lights"
                        className="bg-elec-dark border-elec-yellow/20"
                      />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Select
                        value={circuit.type}
                        onValueChange={(value) => updateCircuit(circuit.ref, 'type', value)}
                      >
                        <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lighting">Lighting</SelectItem>
                          <SelectItem value="power">Power</SelectItem>
                          <SelectItem value="cooker">Cooker</SelectItem>
                          <SelectItem value="shower">Shower</SelectItem>
                          <SelectItem value="immersion">Immersion</SelectItem>
                          <SelectItem value="heating">Heating</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Protection</Label>
                      <Select
                        value={circuit.protectiveDevice}
                        onValueChange={(value) => updateCircuit(circuit.ref, 'protectiveDevice', value)}
                      >
                        <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MCB">MCB</SelectItem>
                          <SelectItem value="RCBO">RCBO</SelectItem>
                          <SelectItem value="Fuse">Fuse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Rating</Label>
                      <Input
                        value={circuit.rating}
                        onChange={(e) => updateCircuit(circuit.ref, 'rating', e.target.value)}
                        placeholder="e.g., 6A"
                        className="bg-elec-dark border-elec-yellow/20"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Test Results Entry</CardTitle>
                <div className="flex gap-2">
                  <Select value={currentCircuit} onValueChange={setCurrentCircuit}>
                    <SelectTrigger className="w-32 bg-elec-dark border-elec-yellow/20">
                      <SelectValue placeholder="Circuit" />
                    </SelectTrigger>
                    <SelectContent>
                      {circuits.map(circuit => (
                        <SelectItem key={circuit.ref} value={circuit.ref}>
                          {circuit.ref}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={activeTestType} onValueChange={setActiveTestType}>
                    <SelectTrigger className="w-48 bg-elec-dark border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {getTestTypes().map(type => (
                        <SelectItem key={type} value={type}>
                          {testTypeLabels[type]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={addTestResult} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Test
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {testResults.map((result) => {
                const limits = testLimits[result.testType];
                return (
                  <div
                    key={result.id}
                    className={`p-4 border rounded-lg ${
                      result.result === 'fail'
                        ? 'border-red-500/50 bg-red-500/10'
                        : result.result === 'pass'
                        ? 'border-green-500/50 bg-green-500/10'
                        : 'border-elec-yellow/20'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">
                          {result.circuitRef} - {testTypeLabels[result.testType]}
                        </h4>
                        {limits && (
                          <p className="text-sm text-muted-foreground">
                            Limits: {limits.min ? `≥${limits.min}` : ''}{limits.min && limits.max ? ', ' : ''}{limits.max ? `≤${limits.max}` : ''} {limits.unit}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {result.result === 'pass' && <CheckCircle className="h-4 w-4 text-green-400" />}
                        {result.result === 'fail' && <AlertTriangle className="h-4 w-4 text-red-400" />}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeTestResult(result.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Measured Value</Label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            step="0.001"
                            value={result.measuredValue || ''}
                            onChange={(e) => updateTestResult(result.id, 'measuredValue', parseFloat(e.target.value) || undefined)}
                            className="bg-elec-dark border-elec-yellow/20"
                          />
                          <span className="flex items-center px-3 text-sm bg-elec-dark border border-elec-yellow/20 rounded">
                            {result.unit}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Label>Result</Label>
                        <Select
                          value={result.result}
                          onValueChange={(value) => updateTestResult(result.id, 'result', value)}
                        >
                          <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pass">Pass</SelectItem>
                            <SelectItem value="fail">Fail</SelectItem>
                            <SelectItem value="n/a">N/A</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Notes</Label>
                        <Input
                          value={result.notes}
                          onChange={(e) => updateTestResult(result.id, 'notes', e.target.value)}
                          placeholder="Additional notes..."
                          className="bg-elec-dark border-elec-yellow/20"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Completion Actions */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="pt-6">
          {failedTests > 0 && (
            <Alert className="mb-4 bg-red-500/10 border-red-500/30">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">
                <strong>{failedTests} test failures detected.</strong> These will be automatically
                classified with appropriate fault codes in the EICR.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">
                {canComplete() 
                  ? 'Testing complete - ready to proceed to review'
                  : `${progress.total - progress.completed} tests remaining`
                }
              </p>
              <p className="text-sm text-muted-foreground">
                All test results will be included in the final report
              </p>
            </div>
            <Button
              onClick={handleComplete}
              disabled={!canComplete()}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
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

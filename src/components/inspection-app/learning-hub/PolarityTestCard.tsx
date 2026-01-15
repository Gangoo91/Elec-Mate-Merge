
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { CheckCircle2, AlertTriangle, Calculator, BookOpen, Zap, RotateCcw } from 'lucide-react';

interface PolarityTestResult {
  circuitRef: string;
  testMethod: string;
  socketOutlets: string;
  lightingPoints: string;
  isolatorSwitches: string;
  result: 'pass' | 'fail' | 'pending';
  notes: string;
}

const PolarityTestCard = () => {
  const [testResults, setTestResults] = useState<PolarityTestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<PolarityTestResult>({
    circuitRef: '',
    testMethod: 'dead',
    socketOutlets: '',
    lightingPoints: '',
    isolatorSwitches: '',
    result: 'pending',
    notes: ''
  });

  const testMethods = [
    { value: 'dead', label: 'Dead Testing (Preferred)' },
    { value: 'live', label: 'Live Testing (Where necessary)' }
  ];

  const handleAddTest = () => {
    if (currentTest.circuitRef && (currentTest.socketOutlets || currentTest.lightingPoints || currentTest.isolatorSwitches)) {
      const allCorrect = (currentTest.socketOutlets === 'correct' || !currentTest.socketOutlets) &&
                        (currentTest.lightingPoints === 'correct' || !currentTest.lightingPoints) &&
                        (currentTest.isolatorSwitches === 'correct' || !currentTest.isolatorSwitches);

      const result: PolarityTestResult = {
        ...currentTest,
        result: allCorrect ? 'pass' : 'fail'
      };

      setTestResults([...testResults, result]);
      setCurrentTest({
        circuitRef: '',
        testMethod: 'dead',
        socketOutlets: '',
        lightingPoints: '',
        isolatorSwitches: '',
        result: 'pending',
        notes: ''
      });
    }
  };

  const handleRemoveTest = (index: number) => {
    setTestResults(testResults.filter((_, i) => i !== index));
  };

  const updateCurrentTest = (field: string, value: string) => {
    setCurrentTest({...currentTest, [field]: value});
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-2 border-indigo-500/20">
        <CardHeader>
          <CardTitle className="text-indigo-400 flex items-center gap-2">
            <RotateCcw className="h-6 w-6" />
            Polarity Testing
          </CardTitle>
          <CardDescription className="text-white">
            Verify correct polarity of all electrical connections - BS 7671 Regulation 612.6
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Test Procedure Overview */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-indigo-400" />
              <h4 className="font-medium text-indigo-400">Polarity Test Procedure</h4>
            </div>
            <div className="space-y-2 text-sm text-white">
              <p><strong>Dead Testing (Preferred):</strong> Use continuity tester between phase at origin and switched contacts</p>
              <p><strong>Live Testing:</strong> Use approved voltage indicator to confirm phase at all outlets</p>
              <p><strong>Check:</strong> Socket outlets (correct phase/neutral), lighting switches, isolator switches</p>
              <p><strong>Verify:</strong> All single-pole devices are connected in the phase conductor only</p>
            </div>
          </div>

          <SmartTabs 
            tabs={[
              {
                value: "basic-tests",
                label: "Test Results",
                content: (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="circuitRef">Circuit Reference</Label>
                      <Input
                        id="circuitRef"
                        placeholder="e.g., C1, Lighting 1"
                        value={currentTest.circuitRef}
                        onChange={(e) => updateCurrentTest('circuitRef', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="testMethod">Test Method</Label>
                      <MobileSelectPicker
                        value={currentTest.testMethod}
                        onValueChange={(value) => updateCurrentTest('testMethod', value)}
                        options={testMethods}
                        placeholder="Select test method"
                        title="Test Method"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="socketOutlets">Socket Outlets</Label>
                      <MobileSelectPicker
                        value={currentTest.socketOutlets}
                        onValueChange={(value) => updateCurrentTest('socketOutlets', value)}
                        options={[
                          { value: 'correct', label: 'Correct Polarity' },
                          { value: 'incorrect', label: 'Incorrect Polarity' },
                          { value: 'not-tested', label: 'Not Tested' },
                        ]}
                        placeholder="Select result"
                        title="Socket Outlets"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lightingPoints">Lighting Points</Label>
                      <MobileSelectPicker
                        value={currentTest.lightingPoints}
                        onValueChange={(value) => updateCurrentTest('lightingPoints', value)}
                        options={[
                          { value: 'correct', label: 'Correct Polarity' },
                          { value: 'incorrect', label: 'Incorrect Polarity' },
                          { value: 'not-tested', label: 'Not Tested' },
                        ]}
                        placeholder="Select result"
                        title="Lighting Points"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="isolatorSwitches">Isolator Switches</Label>
                      <MobileSelectPicker
                        value={currentTest.isolatorSwitches}
                        onValueChange={(value) => updateCurrentTest('isolatorSwitches', value)}
                        options={[
                          { value: 'correct', label: 'Correct Polarity' },
                          { value: 'incorrect', label: 'Incorrect Polarity' },
                          { value: 'not-tested', label: 'Not Tested' },
                        ]}
                        placeholder="Select result"
                        title="Isolator Switches"
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
                )
              },
              {
                value: "guidance",
                label: "Testing Guidance",
                content: (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-4 w-4 text-blue-400" />
                      <h4 className="font-medium text-blue-400">Common Polarity Issues</h4>
                    </div>
                    <div className="space-y-2 text-sm text-white">
                      <p>• <strong>Reversed socket wiring:</strong> Phase and neutral swapped at socket outlet</p>
                      <p>• <strong>Switch line connections:</strong> Neutral switched instead of phase</p>
                      <p>• <strong>Lamp holder connections:</strong> Phase connected to outer contact instead of centre</p>
                      <p>• <strong>Edison screw fittings:</strong> Phase must connect to centre contact</p>
                    </div>
                  </div>
                )
              }
            ]}
            defaultValue="basic-tests"
            className="w-full"
          />

          <Button 
            onClick={handleAddTest}
            className="w-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/30"
            disabled={!currentTest.circuitRef || (!currentTest.socketOutlets && !currentTest.lightingPoints && !currentTest.isolatorSwitches)}
          >
            <Calculator className="h-4 w-4 mr-2" />
            Add Polarity Test Result
          </Button>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Polarity Test Results
              </h4>
              <div className="space-y-3">
                {testResults.map((test, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div className="font-medium text-foreground">{test.circuitRef}</div>
                          <div className="text-sm text-white/80">({test.testMethod === 'dead' ? 'Dead Test' : 'Live Test'})</div>
                          <Badge 
                            variant={test.result === 'pass' ? 'default' : 'destructive'}
                            className={test.result === 'pass' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                          >
                            {test.result.toUpperCase()}
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveTest(index)}
                          className="text-red-400 border-red-500/30 hover:bg-red-500/20"
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        {test.socketOutlets && (
                          <div>
                            <span className="text-white/80">Sockets:</span>
                            <span className={`ml-1 ${test.socketOutlets === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                              {test.socketOutlets === 'correct' ? 'Correct' : test.socketOutlets === 'incorrect' ? 'Incorrect' : 'N/T'}
                            </span>
                          </div>
                        )}
                        {test.lightingPoints && (
                          <div>
                            <span className="text-white/80">Lighting:</span>
                            <span className={`ml-1 ${test.lightingPoints === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                              {test.lightingPoints === 'correct' ? 'Correct' : test.lightingPoints === 'incorrect' ? 'Incorrect' : 'N/T'}
                            </span>
                          </div>
                        )}
                        {test.isolatorSwitches && (
                          <div>
                            <span className="text-white/80">Isolators:</span>
                            <span className={`ml-1 ${test.isolatorSwitches === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                              {test.isolatorSwitches === 'correct' ? 'Correct' : test.isolatorSwitches === 'incorrect' ? 'Incorrect' : 'N/T'}
                            </span>
                          </div>
                        )}
                      </div>
                      {test.notes && (
                        <div className="mt-2 text-sm text-white/80">
                          Notes: {test.notes}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Regulation Reference */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <h4 className="font-medium text-yellow-400">BS 7671 Polarity Requirements</h4>
            </div>
            <div className="space-y-1 text-sm text-white">
              <p>• All single-pole switches and protective devices must be in the phase conductor</p>
              <p>• Centre contact of Edison screw lampholders connected to phase conductor</p>
              <p>• Socket outlets: Phase (L) to right terminal when viewed from front</p>
              <p>• Polarity must be correct at every point in the installation</p>
              <p>• Dead testing preferred to avoid working on live circuits</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PolarityTestCard;

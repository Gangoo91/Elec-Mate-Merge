import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { Calculator, AlertTriangle, Zap, BookOpen, Target, Eye, Lightbulb, Users, RotateCcw, Settings, CheckCircle2 } from 'lucide-react';

interface RingTestResult {
  circuitRef: string;
  leg1Reading: string;
  leg2Reading: string;
  crossConnectReading: string;
  finalR1R2: string;
  result: 'pass' | 'fail' | 'investigation' | 'pending';
  notes: string;
}

const EnhancedContinuityRingTestCard = () => {
  const [testResults, setTestResults] = useState<RingTestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<RingTestResult>({
    circuitRef: '',
    leg1Reading: '',
    leg2Reading: '',
    crossConnectReading: '',
    finalR1R2: '',
    result: 'pending',
    notes: ''
  });

  const handleAddTest = () => {
    if (currentTest.circuitRef && currentTest.leg1Reading && currentTest.leg2Reading) {
      const leg1 = parseFloat(currentTest.leg1Reading);
      const leg2 = parseFloat(currentTest.leg2Reading);
      const crossConnect = parseFloat(currentTest.crossConnectReading);
      
      // Calculate final R1+R2 (legs in parallel)
      const calculatedR1R2 = (leg1 * leg2) / (leg1 + leg2);
      
      // Determine result based on readings
      let result: 'pass' | 'fail' | 'investigation' | 'pending' = 'pending';
      const legDifference = Math.abs(leg1 - leg2);
      const averageLeg = (leg1 + leg2) / 2;
      const percentageDifference = (legDifference / averageLeg) * 100;
      
      if (percentageDifference > 20) {
        result = 'investigation';
      } else if (calculatedR1R2 <= 1.67) {
        result = 'pass';
      } else {
        result = 'fail';
      }

      const testResult: RingTestResult = {
        ...currentTest,
        finalR1R2: calculatedR1R2.toFixed(3),
        result
      };

      setTestResults([...testResults, testResult]);
      setCurrentTest({
        circuitRef: '',
        leg1Reading: '',
        leg2Reading: '',
        crossConnectReading: '',
        finalR1R2: '',
        result: 'pending',
        notes: ''
      });
    }
  };

  const handleRemoveTest = (index: number) => {
    setTestResults(testResults.filter((_, i) => i !== index));
  };

  const RingCircuitDiagram = () => (
    <div className="bg-background p-4 rounded-lg border border-border">
      <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
        <RotateCcw className="h-4 w-4 text-purple-400" />
        Ring Final Circuit Configuration
      </h4>
      <div className="bg-card p-6 rounded border text-sm">
        <div className="text-center text-gray-300 mb-4">Distribution Board</div>
        <div className="flex justify-center mb-4">
          <div className="border-2 border-purple-400 p-2 rounded">
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-red-400">L1</div>
                <div className="text-green-400">E1</div>
              </div>
              <div className="text-center">
                <div className="text-red-400">L2</div>
                <div className="text-green-400">E2</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="border border-gray-500 p-2 rounded mb-2">
              <div className="text-foreground text-xs">Socket 1</div>
            </div>
          </div>
          <div className="text-center">
            <div className="border border-gray-500 p-2 rounded mb-2">
              <div className="text-foreground text-xs">Socket 2</div>
            </div>
          </div>
          <div className="text-center">
            <div className="border border-gray-500 p-2 rounded mb-2">
              <div className="text-foreground text-xs">Socket 3</div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="border border-gray-500 p-2 rounded inline-block">
            <div className="text-foreground text-xs">Final Socket</div>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-400 text-center">
          Two cables form a ring - both legs must be tested separately
        </div>
      </div>
    </div>
  );

  const RingTestStepDiagram = () => (
    <div className="bg-background p-4 rounded-lg border border-border">
      <h4 className="text-foreground font-medium mb-3 flex items-center gap-2">
        <Eye className="h-4 w-4 text-green-400" />
        Ring Circuit Testing Steps
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded">
          <div className="text-blue-400 font-medium mb-2">Step 1: Test Leg 1</div>
          <div className="border-2 border-blue-400 p-3 rounded text-center">
            <div className="text-foreground mb-2">At DB: Link L1↔E1</div>
            <div className="text-yellow-400 mb-2">Test at Socket: L↔E</div>
            <div className="text-xs text-gray-400">
              This tests one leg of the ring
            </div>
          </div>
        </div>
        <div className="bg-card p-4 rounded">  
          <div className="text-purple-400 font-medium mb-2">Step 2: Test Leg 2</div>
          <div className="border-2 border-purple-400 p-3 rounded text-center">
            <div className="text-foreground mb-2">At DB: Link L2↔E2</div>
            <div className="text-yellow-400 mb-2">Test at Socket: L↔E</div>
            <div className="text-xs text-gray-400">
              This tests the other leg
            </div>
          </div>
        </div>
        <div className="bg-card p-4 rounded">
          <div className="text-green-400 font-medium mb-2">Step 3: Cross-Connect</div>
          <div className="border-2 border-green-400 p-3 rounded text-center">
            <div className="text-foreground mb-2">At DB: Link L1↔E2</div>
            <div className="text-yellow-400 mb-2">Test at Socket: L↔E</div>
            <div className="text-xs text-gray-400">
              Verifies ring integrity
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const smartTabs = [
    {
      value: "why",
      label: "Why Test?",
      icon: <Lightbulb className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-purple-400" />
                <h4 className="font-medium text-purple-400">Why Ring Circuit Testing is Essential</h4>
              </div>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <RotateCcw className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Ring Integrity Verification</p>
                    <p>Ensures both legs of the ring are continuous and properly connected - a broken ring becomes a dangerous radial circuit.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Load Distribution</p>
                    <p>Confirms current can flow through both legs equally, preventing overloading and overheating of cables.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Safety Compliance</p>
                    <p>Ring circuits carry higher loads (32A vs 20A radial) - broken rings create serious fire and shock hazards.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-red-400" />
                <h4 className="font-medium text-red-400">Real-World Consequences</h4>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Broken Ring (Undetected):</strong> Kitchen ring with one leg disconnected - all load through single 2.5mm² cable, causing overheating and potential fire</p>
                <p><strong>Cross-Connected Ring:</strong> Legs wrongly connected - creates figure-of-eight circuit with unequal load sharing and overloading</p>
                <p><strong>Multiple Breaks:</strong> Ring circuit with several poor connections - creates multiple radial spurs exceeding safe loading limits</p>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-yellow-400" />
                <h4 className="font-medium text-yellow-400">Professional Implications</h4>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• <strong>Legal Responsibility:</strong> Failure to properly test ring circuits is professional negligence</p>
                <p>• <strong>Insurance Claims:</strong> Improper testing can void insurance cover for fire damage</p>
                <p>• <strong>Building Regulations:</strong> Part P compliance requires proper testing of all ring circuits</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      value: "how",
      label: "How to Test",
      icon: <Settings className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <RingCircuitDiagram />
          <RingTestStepDiagram />
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-green-400" />
              <h4 className="font-medium text-green-400">Detailed Testing Procedure</h4>
            </div>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="border-l-4 border-blue-400 pl-4">
                <h5 className="font-medium text-foreground mb-2">Phase 1: Prepare for Testing</h5>
                <div className="space-y-1">
                  <p>• Ensure complete safe isolation of ring circuit</p>
                  <p>• Identify both legs of ring at distribution board (L1/E1 and L2/E2)</p>
                  <p>• Remove all loads and ensure socket outlets are accessible</p>
                  <p>• Select appropriate test instrument (low-resistance ohmmeter)</p>
                </div>
              </div>
              
              <div className="border-l-4 border-purple-400 pl-4">
                <h5 className="font-medium text-foreground mb-2">Phase 2: Test Individual Legs</h5>
                <div className="space-y-1">
                  <p>• <strong>Leg 1:</strong> Link L1 to E1 at DB, test L-E at furthest socket</p>
                  <p>• <strong>Leg 2:</strong> Link L2 to E2 at DB, test L-E at same socket</p>
                  <p>• Both readings should be similar (within 20% of each other)</p>
                  <p>• Record both values for comparison and calculation</p>
                </div>
              </div>
              
              <div className="border-l-4 border-green-400 pl-4">
                <h5 className="font-medium text-foreground mb-2">Phase 3: Cross-Connection Test</h5>
                <div className="space-y-1">
                  <p>• Link L1 to E2 at distribution board (cross-connect)</p>
                  <p>• Test L-E at the same socket outlet</p>
                  <p>• This reading should be approximately twice the parallel value</p>
                  <p>• Confirms ring is complete and not cross-connected</p>
                </div>
              </div>
              
              <div className="border-l-4 border-yellow-400 pl-4">
                <h5 className="font-medium text-foreground mb-2">Phase 4: Calculate Final R1+R2</h5>
                <div className="space-y-1">
                  <p>• Formula: R1+R2 = (Leg1 × Leg2) ÷ (Leg1 + Leg2)</p>
                  <p>• This gives the parallel resistance of both legs</p>
                  <p>• Must not exceed 1.67Ω for 32A ring final circuits</p>
                  <p>• Record final calculated value on test certificate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      value: "expect",
      label: "What to Expect",
      icon: <Calculator className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="h-4 w-4 text-blue-400" />
                <h4 className="font-medium text-blue-400">Typical Test Results Analysis</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <h5 className="text-foreground font-medium">Healthy Ring Circuit</h5>
                  <div className="bg-green-500/10 p-3 rounded border border-green-500/20">
                    <p className="text-green-400 font-medium mb-1">Example: 30m 2.5mm² Ring</p>
                    <div className="space-y-1 text-gray-300">
                      <p>• Leg 1: 1.20Ω</p>
                      <p>• Leg 2: 1.25Ω</p>
                      <p>• Cross-connect: 2.45Ω</p>
                      <p>• Final R1+R2: 0.61Ω ✓</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h5 className="text-foreground font-medium">Problem Indicators</h5>
                  <div className="bg-red-500/10 p-3 rounded border border-red-500/20">
                    <p className="text-red-400 font-medium mb-1">Warning Signs</p>
                    <div className="space-y-1 text-gray-300">
                      <p>• Leg difference {'>'}20%</p>
                      <p>• Infinite reading on one leg</p>
                      <p>• Cross-connect ≠ sum of legs</p>
                      <p>• Final R1+R2 {'>'} 1.67Ω</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <h4 className="font-medium text-orange-400">Common Ring Circuit Problems</h4>
              </div>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex gap-3">
                  <div className="bg-red-500 text-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">!</div>
                  <div>
                    <p className="font-medium text-foreground">Broken Ring (One Leg Open)</p>
                    <p>Symptoms: One leg shows infinite resistance, other leg shows double expected value</p>
                    <p>Action: Locate and repair break before energising</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-red-500 text-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">!</div>
                  <div>
                    <p className="font-medium text-foreground">Cross-Connected Ring</p>
                    <p>Symptoms: Cross-connect reading doesn't match sum of individual legs</p>
                    <p>Action: Check connections at distribution board for correct leg identification</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-yellow-500 text-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">!</div>
                  <div>
                    <p className="font-medium text-foreground">High Resistance Joints</p>
                    <p>Symptoms: Inconsistent readings, higher than expected resistance values</p>
                    <p>Action: Inspect all connections and junction boxes for loose or corroded terminals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      value: "practice",
      label: "Practice",
      icon: <Target className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-blue-400" />
              <h4 className="font-medium text-blue-400">Practice Ring Circuit Testing</h4>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Enter your test readings below. The system will automatically calculate the final R1+R2 value and determine the pass/fail status.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="circuitRef" className="text-foreground">Circuit Reference</Label>
                <Input
                  id="circuitRef"
                  value={currentTest.circuitRef}
                  onChange={(e) => setCurrentTest({...currentTest, circuitRef: e.target.value})}
                  placeholder="e.g., C1, RFC1"
                  className="bg-card border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="notes" className="text-foreground">Notes</Label>
                <Input
                  id="notes"
                  value={currentTest.notes}
                  onChange={(e) => setCurrentTest({...currentTest, notes: e.target.value})}
                  placeholder="Additional notes"
                  className="bg-card border-border text-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <Label htmlFor="leg1Reading" className="text-foreground">Leg 1 Reading (Ω)</Label>
                <Input
                  id="leg1Reading"
                  type="number"
                  step="0.001"
                  value={currentTest.leg1Reading}
                  onChange={(e) => setCurrentTest({...currentTest, leg1Reading: e.target.value})}
                  placeholder="0.000"
                  className="bg-card border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="leg2Reading" className="text-foreground">Leg 2 Reading (Ω)</Label>
                <Input
                  id="leg2Reading"
                  type="number"
                  step="0.001"
                  value={currentTest.leg2Reading}
                  onChange={(e) => setCurrentTest({...currentTest, leg2Reading: e.target.value})}
                  placeholder="0.000"
                  className="bg-card border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="crossConnectReading" className="text-foreground">Cross-Connect Reading (Ω)</Label>
                <Input
                  id="crossConnectReading"
                  type="number"
                  step="0.001"
                  value={currentTest.crossConnectReading}
                  onChange={(e) => setCurrentTest({...currentTest, crossConnectReading: e.target.value})}
                  placeholder="0.000"
                  className="bg-card border-border text-foreground"
                />
              </div>
            </div>

            <Button 
              onClick={handleAddTest}
              disabled={!currentTest.circuitRef || !currentTest.leg1Reading || !currentTest.leg2Reading}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-foreground"
            >
              Add Ring Test Result
            </Button>
          </div>

          {testResults.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                Recorded Test Results
              </h4>
              <div className="space-y-3">
                {testResults.map((result, index) => (
                  <div key={index} className="bg-muted p-3 rounded border border-border">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{result.circuitRef}</span>
                        <Badge 
                          variant={result.result === 'pass' ? 'default' : result.result === 'fail' ? 'destructive' : 'secondary'}
                          className={
                            result.result === 'pass' ? 'bg-green-600 text-foreground' :
                            result.result === 'fail' ? 'bg-red-600 text-foreground' :
                            'bg-yellow-600 text-foreground'
                          }
                        >
                          {result.result === 'investigation' ? 'Needs Investigation' : result.result.toUpperCase()}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveTest(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-300">
                      <div>Leg 1: {result.leg1Reading}Ω</div>
                      <div>Leg 2: {result.leg2Reading}Ω</div>
                      <div>Cross: {result.crossConnectReading}Ω</div>
                      <div>Final R1+R2: {result.finalR1R2}Ω</div>
                    </div>
                    {result.notes && (
                      <div className="mt-2 text-sm text-gray-400">
                        Notes: {result.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-yellow-400" />
              <h4 className="font-medium text-yellow-400">BS 7671 Ring Circuit Requirements</h4>
            </div>
            <div className="space-y-1 text-sm text-gray-300">
              <p>• Final R1+R2 must not exceed 1.67Ω for 32A ring final circuits</p>
              <p>• Both legs should be within 20% of each other to ensure proper load distribution</p>
              <p>• Cross-connection test verifies ring integrity and proper connections</p>
              <p>• Temperature correction may be required for final certificate values</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <RotateCcw className="h-6 w-6" />
            Enhanced Ring Circuit Continuity Testing Module
          </CardTitle>
          <CardDescription className="text-gray-300">
            Comprehensive learning module for ring final circuit continuity testing - BS 7671 Regulation 612.2.2
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SmartTabs 
            tabs={smartTabs}
            defaultValue="why"
            className="w-full"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedContinuityRingTestCard;

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { CheckCircle2, AlertTriangle, Calculator, BookOpen, Zap } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface RingTestResult {
  circuitRef: string;
  r1: string;
  rn: string;
  r2: string;
  crossTestResults: {
    r1rn: string;
    r1r2: string;
  };
  result: 'pass' | 'fail' | 'pending';
  notes: string;
}

const ContinuityRingTestCard = () => {
  const [testResults, setTestResults] = useState<RingTestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<RingTestResult>({
    circuitRef: '',
    r1: '',
    rn: '',
    r2: '',
    crossTestResults: {
      r1rn: '',
      r1r2: ''
    },
    result: 'pending',
    notes: ''
  });
  const isMobile = useIsMobile();

  const handleAddTest = () => {
    if (currentTest.circuitRef && currentTest.r1 && currentTest.rn && currentTest.r2) {
      const r1 = parseFloat(currentTest.r1);
      const rn = parseFloat(currentTest.rn);
      const r2 = parseFloat(currentTest.r2);
      
      // Check if readings are similar (within 0.05Ω tolerance)
      const tolerance = 0.05;
      const r1rnDiff = Math.abs(r1 - rn);
      const allSimilar = r1rnDiff <= tolerance;
      
      const result: RingTestResult = {
        ...currentTest,
        result: allSimilar ? 'pass' : 'fail'
      };

      setTestResults([...testResults, result]);
      setCurrentTest({
        circuitRef: '',
        r1: '',
        rn: '',
        r2: '',
        crossTestResults: {
          r1rn: '',
          r1r2: ''
        },
        result: 'pending',
        notes: ''
      });
    }
  };

  const handleRemoveTest = (index: number) => {
    setTestResults(testResults.filter((_, i) => i !== index));
  };

  const updateCurrentTest = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      if (parent === 'crossTestResults') {
        setCurrentTest({
          ...currentTest,
          crossTestResults: {
            ...currentTest.crossTestResults,
            [child]: value
          }
        });
      }
    } else {
      setCurrentTest({...currentTest, [field]: value});
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-2 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Ring Final Circuit Continuity Test
          </CardTitle>
          <CardDescription className="text-gray-300">
            Comprehensive ring circuit testing - BS 7671 Appendix 15
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Test Procedure Overview */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-green-400" />
              <h4 className="font-medium text-green-400">Ring Circuit Test Procedure</h4>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>Step 1:</strong> Identify both ends of ring at distribution board</p>
              <p><strong>Step 2:</strong> Test end-to-end resistance of each conductor (R1, Rn, R2)</p>
              <p><strong>Step 3:</strong> Cross-connect conductors and test at each socket</p>
              <p><strong>Step 4:</strong> Verify readings confirm proper ring formation</p>
            </div>
          </div>

          <SmartTabs 
            tabs={[
              {
                value: "end-to-end",
                label: "End-to-End Tests",
                content: (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="circuitRef">Circuit Reference</Label>
                      <Input
                        id="circuitRef"
                        placeholder="e.g., Ring 1, Ring 2"
                        value={currentTest.circuitRef}
                        onChange={(e) => updateCurrentTest('circuitRef', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="r1">R1 (Line) End-to-End (Ω)</Label>
                      <Input
                        id="r1"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={currentTest.r1}
                        onChange={(e) => updateCurrentTest('r1', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rn">Rn (Neutral) End-to-End (Ω)</Label>
                      <Input
                        id="rn"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={currentTest.rn}
                        onChange={(e) => updateCurrentTest('rn', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="r2">R2 (CPC) End-to-End (Ω)</Label>
                      <Input
                        id="r2"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={currentTest.r2}
                        onChange={(e) => updateCurrentTest('r2', e.target.value)}
                      />
                    </div>
                  </div>
                )
              },
              {
                value: "cross-tests",
                label: "Cross-Connection Tests",
                content: (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="r1rn">R1+Rn Cross-Connection (Ω)</Label>
                      <Input
                        id="r1rn"
                        type="number"
                        step="0.01"
                        placeholder="Highest reading at sockets"
                        value={currentTest.crossTestResults.r1rn}
                        onChange={(e) => updateCurrentTest('crossTestResults.r1rn', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="r1r2">R1+R2 Cross-Connection (Ω)</Label>
                      <Input
                        id="r1r2"
                        type="number"
                        step="0.01"
                        placeholder="Highest reading at sockets"
                        value={currentTest.crossTestResults.r1r2}
                        onChange={(e) => updateCurrentTest('crossTestResults.r1r2', e.target.value)}
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
              }
            ]}
            defaultValue="end-to-end"
            className="w-full"
          />

          <Button 
            onClick={handleAddTest}
            className="w-full bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
            disabled={!currentTest.circuitRef || !currentTest.r1 || !currentTest.rn || !currentTest.r2}
          >
            <Calculator className="h-4 w-4 mr-2" />
            Add Ring Test Result
          </Button>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Ring Test Results
              </h4>
              <div className="space-y-3">
                {testResults.map((test, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div className="font-medium text-foreground">{test.circuitRef}</div>
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
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                        <div>
                          <span className="text-gray-400">R1:</span>
                          <span className="text-foreground ml-1">{test.r1}Ω</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Rn:</span>
                          <span className="text-foreground ml-1">{test.rn}Ω</span>
                        </div>
                        <div>
                          <span className="text-gray-400">R2:</span>
                          <span className="text-foreground ml-1">{test.r2}Ω</span>
                        </div>
                        <div>
                          <span className="text-gray-400">R1+Rn:</span>
                          <span className="text-foreground ml-1">{test.crossTestResults.r1rn}Ω</span>
                        </div>
                        <div>
                          <span className="text-gray-400">R1+R2:</span>
                          <span className="text-foreground ml-1">{test.crossTestResults.r1r2}Ω</span>
                        </div>
                      </div>
                      {test.notes && (
                        <div className="mt-2 text-sm text-gray-400">
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
              <h4 className="font-medium text-yellow-400">Ring Circuit Test Criteria</h4>
            </div>
            <div className="space-y-1 text-sm text-gray-300">
              <p>• End-to-end readings for R1 and Rn should be similar (within 0.05Ω)</p>
              <p>• R1+R2 reading should not exceed 1.67Ω at any socket</p>
              <p>• Cross-connection readings confirm ring integrity</p>
              <p>• Highest reading should be approximately (R1+R2)/4</p>
              <p>• Significant deviations indicate wiring faults or interconnections</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuityRingTestCard;

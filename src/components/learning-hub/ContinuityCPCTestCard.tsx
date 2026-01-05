
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, Zap, Calculator, BookOpen } from 'lucide-react';

interface CPCTestResult {
  circuitRef: string;
  r1r2Reading: string;
  maxPermissible: string;
  result: 'pass' | 'fail' | 'pending';
  notes: string;
}

const ContinuityCPCTestCard = () => {
  const [testResults, setTestResults] = useState<CPCTestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<CPCTestResult>({
    circuitRef: '',
    r1r2Reading: '',
    maxPermissible: '',
    result: 'pending',
    notes: ''
  });

  const handleAddTest = () => {
    if (currentTest.circuitRef && currentTest.r1r2Reading) {
      const reading = parseFloat(currentTest.r1r2Reading);
      const maxValue = parseFloat(currentTest.maxPermissible);
      
      const result: CPCTestResult = {
        ...currentTest,
        result: maxValue && reading <= maxValue ? 'pass' : reading > maxValue ? 'fail' : 'pending'
      };

      setTestResults([...testResults, result]);
      setCurrentTest({
        circuitRef: '',
        r1r2Reading: '',
        maxPermissible: '',
        result: 'pending',
        notes: ''
      });
    }
  };

  const handleRemoveTest = (index: number) => {
    setTestResults(testResults.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-500/10 to-green-500/10 border-2 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6" />
            Circuit Protective Conductor (CPC) Continuity Test
          </CardTitle>
          <CardDescription className="text-gray-300">
            R1+R2 method testing for protective conductor continuity - BS 7671 Regulation 612.2.1
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Test Procedure Overview */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-blue-400" />
              <h4 className="font-medium text-blue-400">Test Procedure</h4>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>1.</strong> Ensure circuit is safely isolated and secured</p>
              <p><strong>2.</strong> At distribution board, temporarily connect line and CPC together</p>
              <p><strong>3.</strong> Test between line and CPC at furthest point of circuit</p>
              <p><strong>4.</strong> Record highest reading (this is your R1+R2 value)</p>
              <p><strong>5.</strong> Compare with maximum permissible values</p>
            </div>
          </div>

          {/* Test Input Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="circuitRef">Circuit Reference</Label>
              <Input
                id="circuitRef"
                placeholder="e.g., C1, C2, etc."
                value={currentTest.circuitRef}
                onChange={(e) => setCurrentTest({...currentTest, circuitRef: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="r1r2Reading">R1+R2 Reading (Ω)</Label>
              <Input
                id="r1r2Reading"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={currentTest.r1r2Reading}
                onChange={(e) => setCurrentTest({...currentTest, r1r2Reading: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxPermissible">Max Permissible (Ω)</Label>
              <Input
                id="maxPermissible"
                type="number"
                step="0.01"
                placeholder="1.67 for ring circuits"
                value={currentTest.maxPermissible}
                onChange={(e) => setCurrentTest({...currentTest, maxPermissible: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                placeholder="Additional observations"
                value={currentTest.notes}
                onChange={(e) => setCurrentTest({...currentTest, notes: e.target.value})}
              />
            </div>
          </div>

          <Button 
            onClick={handleAddTest}
            className="w-full bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30"
            disabled={!currentTest.circuitRef || !currentTest.r1r2Reading}
          >
            <Calculator className="h-4 w-4 mr-2" />
            Add Test Result
          </Button>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Test Results
              </h4>
              <div className="space-y-3">
                {testResults.map((test, index) => (
                  <Card key={index} className="bg-card border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="font-medium text-foreground">{test.circuitRef}</div>
                          <div className="text-sm text-gray-300">
                            R1+R2: {test.r1r2Reading}Ω
                          </div>
                          <div className="text-sm text-gray-300">
                            Max: {test.maxPermissible}Ω
                          </div>
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
              <h4 className="font-medium text-yellow-400">Acceptance Criteria</h4>
            </div>
            <div className="space-y-1 text-sm text-gray-300">
              <p>• Ring final circuits: R1+R2 ≤ 1.67Ω (BS 7671 Table 41.4)</p>
              <p>• Radial circuits: R1+R2 must not exceed values in BS 7671 Table 41.4</p>
              <p>• Test current: Minimum 200mA DC for protective conductors</p>
              <p>• Account for test lead resistance in measurements</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuityCPCTestCard;

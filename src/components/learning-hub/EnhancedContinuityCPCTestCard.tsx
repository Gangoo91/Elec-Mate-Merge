import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { CheckCircle2, AlertTriangle, Zap, Calculator, BookOpen, Target, Eye, Lightbulb, Users, Shield } from 'lucide-react';

interface CPCTestResult {
  circuitRef: string;
  r1r2Reading: string;
  maxPermissible: string;
  result: 'pass' | 'fail' | 'pending';
  notes: string;
}

const EnhancedContinuityCPCTestCard = () => {
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
            Enhanced CPC Continuity Testing Module
          </CardTitle>
          <CardDescription className="text-white">
            Comprehensive learning module for Circuit Protective Conductor continuity testing - BS 7671 Regulation 612.2.1
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SmartTabs 
            tabs={[
              {
                value: "why",
                label: "Why Test?",
                icon: <Lightbulb className="h-4 w-4" />,
                content: (
                  <div className="space-y-4">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="h-4 w-4 text-blue-400" />
                        <h4 className="font-medium text-blue-400">Why CPC Continuity Testing is Critical</h4>
                      </div>
                      <div className="space-y-3 text-sm text-white">
                        <div className="flex items-start gap-2">
                          <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-foreground">Life Safety Protection</p>
                            <p>Ensures protective conductors can carry fault current safely, preventing electric shock and fire hazards.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-foreground">Equipment Protection</p>
                            <p>Verifies protective devices will operate correctly during earth faults, protecting electrical equipment.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <BookOpen className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-foreground">Legal Compliance</p>
                            <p>Required by BS 7671 for all new installations and periodic inspections - failure to test is a legal liability.</p>
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
                icon: <Calculator className="h-4 w-4" />,
                content: (
                  <div className="space-y-6">
                    {/* Test Input Form */}
                    <div className="bg-card border border-border rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Calculator className="h-4 w-4" />
                        Practice Test Recording
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="circuitRef">Circuit Reference</Label>
                          <Input
                            id="circuitRef"
                            placeholder="e.g., C1, Kitchen Ring"
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
                          <Label htmlFor="notes">Test Notes</Label>
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
                        className="w-full mt-4 bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30"
                        disabled={!currentTest.circuitRef || !currentTest.r1r2Reading}
                      >
                        <Calculator className="h-4 w-4 mr-2" />
                        Add Test Result
                      </Button>
                    </div>

                    {/* Test Results */}
                    {testResults.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          CPC Test Results
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
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                                  <div>
                                    <span className="text-white/80">Reading:</span>
                                    <span className="text-foreground ml-1">{test.r1r2Reading}Ω</span>
                                  </div>
                                  <div>
                                    <span className="text-white/80">Max:</span>
                                    <span className="text-foreground ml-1">{test.maxPermissible}Ω</span>
                                  </div>
                                  <div>
                                    <span className="text-white/80">Status:</span>
                                    <span className={`ml-1 ${test.result === 'pass' ? 'text-green-400' : 'text-red-400'}`}>
                                      {test.result === 'pass' ? 'PASS' : 'FAIL'}
                                    </span>
                                  </div>
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
                  </div>
                )
              }
            ]}
            defaultValue="why"
            className="w-full"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedContinuityCPCTestCard;
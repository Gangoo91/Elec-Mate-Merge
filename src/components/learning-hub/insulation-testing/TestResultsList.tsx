
import React from 'react';
import { Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InsulationTestResult } from './types';

interface TestResultsListProps {
  testResults: InsulationTestResult[];
  onRemoveTest: (index: number) => void;
}

const TestResultsList = ({ testResults, onRemoveTest }: TestResultsListProps) => {
  if (testResults.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-foreground flex items-center gap-2">
        <Zap className="h-4 w-4" />
        Your Test Results
      </h4>
      <div className="space-y-3">
        {testResults.map((test, index) => (
          <Card key={index} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="font-medium text-foreground">{test.circuitRef}</div>
                  <div className="text-sm text-white/80">({test.testVoltage}V DC)</div>
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
                  onClick={() => onRemoveTest(index)}
                  className="text-red-400 border-red-500/30 hover:bg-red-500/20"
                >
                  Remove
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="text-white/80">L-N:</span>
                  <span className="text-foreground ml-1">{test.liveNeutral || 'N/T'} MΩ</span>
                  {test.correctedValues.liveNeutral && (
                    <span className="text-blue-400 ml-1">({test.correctedValues.liveNeutral})</span>
                  )}
                </div>
                <div>
                  <span className="text-white/80">L-E:</span>
                  <span className="text-foreground ml-1">{test.liveEarth || 'N/T'} MΩ</span>
                  {test.correctedValues.liveEarth && (
                    <span className="text-blue-400 ml-1">({test.correctedValues.liveEarth})</span>
                  )}
                </div>
                <div>
                  <span className="text-white/80">N-E:</span>
                  <span className="text-foreground ml-1">{test.neutralEarth || 'N/T'} MΩ</span>
                  {test.correctedValues.neutralEarth && (
                    <span className="text-blue-400 ml-1">({test.correctedValues.neutralEarth})</span>
                  )}
                </div>
              </div>
              {test.temperature !== '20' && (
                <div className="mt-2 text-xs text-blue-400">
                  Temperature corrected from {test.temperature}°C to 20°C
                </div>
              )}
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
  );
};

export default TestResultsList;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw } from 'lucide-react';
import { PolarityTestResult } from './types';

interface TestResultsListProps {
  testResults: PolarityTestResult[];
  onRemoveTest: (index: number) => void;
}

const TestResultsList = ({ testResults, onRemoveTest }: TestResultsListProps) => {
  if (testResults.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-foreground flex items-center gap-2">
        <RotateCcw className="h-4 w-4" />
        Polarity Test Results
      </h4>
      
      <div className="space-y-3">
        {testResults.map((test, index) => (
          <Card key={index} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="font-medium text-foreground">{test.circuitRef}</div>
                  <div className="text-sm text-gray-400">
                    ({test.testMethod === 'dead' ? 'Dead Test' : 'Live Test'})
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
                  onClick={() => onRemoveTest(index)}
                  className="text-red-400 border-red-500/30 hover:bg-red-500/20"
                >
                  Remove
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                {test.socketOutlets !== 'pending' && (
                  <div>
                    <span className="text-gray-400">Sockets:</span>
                    <span className={`ml-1 ${
                      test.socketOutlets === 'pass' ? 'text-green-400' : 
                      test.socketOutlets === 'fail' ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {test.socketOutlets === 'pass' ? 'Pass' : 
                       test.socketOutlets === 'fail' ? 'Fail' : 'N/A'}
                    </span>
                  </div>
                )}
                
                {test.lightingPoints !== 'pending' && (
                  <div>
                    <span className="text-gray-400">Lighting:</span>
                    <span className={`ml-1 ${
                      test.lightingPoints === 'pass' ? 'text-green-400' : 
                      test.lightingPoints === 'fail' ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {test.lightingPoints === 'pass' ? 'Pass' : 
                       test.lightingPoints === 'fail' ? 'Fail' : 'N/A'}
                    </span>
                  </div>
                )}
                
                {test.isolatorSwitches !== 'pending' && (
                  <div>
                    <span className="text-gray-400">Isolators:</span>
                    <span className={`ml-1 ${
                      test.isolatorSwitches === 'pass' ? 'text-green-400' : 
                      test.isolatorSwitches === 'fail' ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {test.isolatorSwitches === 'pass' ? 'Pass' : 
                       test.isolatorSwitches === 'fail' ? 'Fail' : 'N/A'}
                    </span>
                  </div>
                )}
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
  );
};

export default TestResultsList;

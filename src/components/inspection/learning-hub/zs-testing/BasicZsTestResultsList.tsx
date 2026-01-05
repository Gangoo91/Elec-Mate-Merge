
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';
import { ZsTestResult } from './types';

interface BasicZsTestResultsListProps {
  testResults: ZsTestResult[];
  onRemoveTest: (index: number) => void;
}

const BasicZsTestResultsList = ({ testResults, onRemoveTest }: BasicZsTestResultsListProps) => {
  if (testResults.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-foreground flex items-center gap-2">
        <Zap className="h-4 w-4" />
        Zs Test Results
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
                  onClick={() => onRemoveTest(index)}
                  className="text-red-400 border-red-500/30 hover:bg-red-500/20"
                >
                  Remove
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div>
                  <span className="text-gray-400">Measured:</span>
                  <span className="text-foreground ml-1">{test.zsReading}Ω</span>
                </div>
                <div>
                  <span className="text-gray-400">Corrected:</span>
                  <span className="text-foreground ml-1">{test.correctedZs}Ω</span>
                </div>
                <div>
                  <span className="text-gray-400">Max:</span>
                  <span className="text-foreground ml-1">{test.zsMaxPermitted}Ω</span>
                </div>
                <div>
                  <span className="text-gray-400">Temp:</span>
                  <span className="text-foreground ml-1">{test.temperature}°C</span>
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
  );
};

export default BasicZsTestResultsList;

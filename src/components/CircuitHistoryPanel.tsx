import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { History, TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import { TestResult } from '@/types/testResult';

interface CircuitHistoryEntry {
  id: string;
  date: string;
  testType: 'EICR' | 'EIC' | 'Minor Works';
  inspector: string;
  testResult: TestResult;
  overallCondition: 'Satisfactory' | 'Unsatisfactory' | 'Requires Investigation';
}

interface CircuitHistoryPanelProps {
  circuitId: string;
  circuitDescription: string;
  className?: string;
}

// Mock data - in real implementation this would come from Supabase
const mockHistoryData: CircuitHistoryEntry[] = [
  {
    id: '1',
    date: '2024-01-15',
    testType: 'EICR',
    inspector: 'John Smith',
    overallCondition: 'Satisfactory',
    testResult: {
      id: '1',
      circuitNumber: '1',
      circuitDescription: 'Kitchen Ring Main',
      r1r2: '0.18',
      insulationLiveNeutral: '>500',
      zs: '0.35',
      rcdOneX: '28',
      // ... other fields
    } as TestResult
  },
  {
    id: '2',
    date: '2023-01-20',
    testType: 'EICR',
    inspector: 'Sarah Johnson',
    overallCondition: 'Satisfactory',
    testResult: {
      id: '2',
      circuitNumber: '1',
      circuitDescription: 'Kitchen Ring Main',
      r1r2: '0.16',
      insulationLiveNeutral: '>500',
      zs: '0.32',
      rcdOneX: '25',
      // ... other fields
    } as TestResult
  }
];

const CircuitHistoryPanel: React.FC<CircuitHistoryPanelProps> = ({
  circuitId,
  circuitDescription,
  className
}) => {
  const [historyData, setHistoryData] = useState<CircuitHistoryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<CircuitHistoryEntry | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    // In real implementation, fetch from Supabase
    setHistoryData(mockHistoryData);
  }, [circuitId]);

  const getTestValueTrend = (current: string, previous: string, testType: string) => {
    const currentVal = parseFloat(current);
    const previousVal = parseFloat(previous);
    
    if (isNaN(currentVal) || isNaN(previousVal)) return null;
    
    const percentChange = ((currentVal - previousVal) / previousVal) * 100;
    const isIncreasing = currentVal > previousVal;
    
    // Determine if trend is concerning based on test type
    let isConcerning = false;
    if (testType === 'zs' || testType === 'r1r2') {
      isConcerning = isIncreasing && Math.abs(percentChange) > 10;
    } else if (testType === 'insulation') {
      isConcerning = !isIncreasing && Math.abs(percentChange) > 20;
    }
    
    return {
      percentChange: Math.abs(percentChange),
      isIncreasing,
      isConcerning,
      icon: isIncreasing ? TrendingUp : TrendingDown
    };
  };

  const compareResults = (current: TestResult, previous: TestResult) => {
    const comparisons = [];
    
    if (current.r1r2 && previous.r1r2) {
      const trend = getTestValueTrend(current.r1r2, previous.r1r2, 'r1r2');
      comparisons.push({
        test: 'R1+R2',
        current: current.r1r2,
        previous: previous.r1r2,
        trend
      });
    }
    
    if (current.zs && previous.zs) {
      const trend = getTestValueTrend(current.zs, previous.zs, 'zs');
      comparisons.push({
        test: 'Zs',
        current: current.zs,
        previous: previous.zs,
        trend
      });
    }
    
    if (current.insulationLiveNeutral && previous.insulationLiveNeutral) {
      const currentVal = current.insulationLiveNeutral.replace('>', '');
      const previousVal = previous.insulationLiveNeutral.replace('>', '');
      const trend = getTestValueTrend(currentVal, previousVal, 'insulation');
      comparisons.push({
        test: 'Insulation L-N',
        current: current.insulationLiveNeutral,
        previous: previous.insulationLiveNeutral,
        trend
      });
    }
    
    return comparisons;
  };

  if (historyData.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <History className="h-4 w-4" />
            Circuit History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              No historical test data available for this circuit.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <History className="h-4 w-4" />
          Circuit History: {circuitDescription}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant={!showComparison ? "default" : "outline"}
            size="sm"
            onClick={() => setShowComparison(false)}
          >
            Timeline
          </Button>
          <Button
            variant={showComparison ? "default" : "outline"}
            size="sm"
            onClick={() => setShowComparison(true)}
            disabled={historyData.length < 2}
          >
            Compare
          </Button>
        </div>

        {!showComparison ? (
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {historyData.map((entry, index) => (
                <Card key={entry.id} className="p-3 cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedEntry(entry)}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">{entry.date}</div>
                      <div className="text-xs text-muted-foreground">
                        {entry.testType} • {entry.inspector}
                      </div>
                    </div>
                    <Badge variant={entry.overallCondition === 'Satisfactory' ? 'outline' : 'destructive'}>
                      {entry.overallCondition}
                    </Badge>
                  </div>
                  
                  {selectedEntry?.id === entry.id && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <div className="font-medium">R1+R2</div>
                          <div>{entry.testResult.r1r2 || 'N/A'}Ω</div>
                        </div>
                        <div>
                          <div className="font-medium">Zs</div>
                          <div>{entry.testResult.zs || 'N/A'}Ω</div>
                        </div>
                        <div>
                          <div className="font-medium">Insulation</div>
                          <div>{entry.testResult.insulationLiveNeutral || 'N/A'}MΩ</div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="space-y-4">
            <div className="text-sm font-medium">
              Comparing latest two test results:
            </div>
            
            {historyData.length >= 2 && (
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Latest ({historyData[0].date})</span>
                  <span>Previous ({historyData[1].date})</span>
                </div>
                
                {compareResults(historyData[0].testResult, historyData[1].testResult).map((comparison, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="font-medium text-sm">{comparison.test}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{comparison.current}</span>
                      {comparison.trend && (
                        <div className={`flex items-center gap-1 ${comparison.trend.isConcerning ? 'text-red-600' : 'text-muted-foreground'}`}>
                          <comparison.trend.icon className="h-3 w-3" />
                          <span className="text-xs">
                            {comparison.trend.percentChange.toFixed(1)}%
                          </span>
                        </div>
                      )}
                      <span className="text-sm text-muted-foreground">{comparison.previous}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CircuitHistoryPanel;

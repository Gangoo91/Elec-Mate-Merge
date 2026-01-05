
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Play } from 'lucide-react';

interface TestType {
  id: string;
  name: string;
  unit: string;
  description: string;
  icon: string;
  requiredForAll?: boolean;
  requiredForCircuits?: string[];
}

interface MobileTestTypeCardProps {
  testType: TestType;
  circuits: any[];
  completedTests: Set<string>;
  onStartTest: (testTypeId: string) => void;
}

const MobileTestTypeCard = ({ testType, circuits, completedTests, onStartTest }: MobileTestTypeCardProps) => {
  const applicableCircuits = circuits.filter((circuit: any) => {
    if (testType.requiredForAll) return true;
    if (testType.requiredForCircuits) {
      const circuitType = circuit.circuitDescription?.toLowerCase() || '';
      return testType.requiredForCircuits.some(type => 
        circuitType.includes(type)
      );
    }
    return false;
  });

  const completedCount = applicableCircuits.filter((circuit: any) => 
    completedTests.has(`${testType.id}-${circuit.id}`)
  ).length;

  const isComplete = completedCount === applicableCircuits.length && applicableCircuits.length > 0;
  const progressPercentage = applicableCircuits.length > 0 ? (completedCount / applicableCircuits.length) * 100 : 0;

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">{testType.icon}</span>
              <div>
                <h3 className="font-semibold text-sm">{testType.name}</h3>
                <p className="text-xs text-muted-foreground">{testType.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isComplete ? "default" : "secondary"} className="text-xs">
                {completedCount}/{applicableCircuits.length} circuits
              </Badge>
              {isComplete && <CheckCircle className="h-4 w-4 text-green-500" />}
            </div>
          </div>
          <Button
            onClick={() => onStartTest(testType.id)}
            size="sm"
            variant={isComplete ? "outline" : "default"}
            className="ml-4"
          >
            {isComplete ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Review
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start
              </>
            )}
          </Button>
        </div>
        
        {!isComplete && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-2"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MobileTestTypeCard;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, FileCheck, AlertTriangle } from 'lucide-react';
import { TestFlow } from '@/types/inspection-testing';
import { testFlows } from '@/data/inspection-testing/testFlows';

interface TestFlowSelectorProps {
  onSelectFlow: (flow: TestFlow) => void;
  mode: 'electrician' | 'apprentice';
}

const TestFlowSelector = ({ onSelectFlow, mode }: TestFlowSelectorProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTestTypeIcon = (type: string) => {
    switch (type) {
      case 'continuity': return '🔌';
      case 'insulation-resistance': return '⚡';
      case 'earth-fault-loop': return '🌍';
      case 'rcd-test': return '🛡️';
      case 'polarity': return '🔄';
      default: return '📋';
    }
  };

  const getTotalEstimatedTime = (flow: TestFlow) => {
    return flow.steps.reduce((total, step) => total + (step.estimatedTime || 0), 0);
  };

  const filteredFlows = mode === 'apprentice' 
    ? testFlows.filter(flow => flow.difficulty === 'beginner' || flow.difficulty === 'intermediate')
    : testFlows;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFlows.map((flow) => (
          <Card key={flow.id} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getTestTypeIcon(flow.type)}</span>
                  <div>
                    <CardTitle className="text-lg">{flow.name}</CardTitle>
                    <Badge className={getDifficultyColor(flow.difficulty)} variant="secondary">
                      {flow.difficulty}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {getTotalEstimatedTime(flow)}min
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>{flow.description}</CardDescription>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <FileCheck className="h-4 w-4 text-green-400" />
                  {flow.steps.length} Test Steps
                </div>
                
                {flow.prerequisites && flow.prerequisites.length > 0 && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-amber-400">
                      <AlertTriangle className="h-4 w-4" />
                      Prerequisites:
                    </div>
                    <ul className="text-xs text-muted-foreground ml-6 space-y-1">
                      {flow.prerequisites.slice(0, 2).map((prereq, index) => (
                        <li key={index}>• {prereq}</li>
                      ))}
                      {flow.prerequisites.length > 2 && (
                        <li>• +{flow.prerequisites.length - 2} more...</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              
              <Button 
                onClick={() => onSelectFlow(flow)}
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                Start {flow.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {mode === 'apprentice' && (
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-300 mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Learning Mode</span>
            </div>
            <p className="text-sm text-blue-200">
              You're in apprentice mode. Advanced tests are hidden to focus on foundational procedures. 
              Complete beginner and intermediate tests to unlock more advanced workflows.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestFlowSelector;

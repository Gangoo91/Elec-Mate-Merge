
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TestFlow } from '@/types/inspection-testing';
import { Play, Clock, CheckCircle } from 'lucide-react';

interface SimplifiedTestFlowSelectorProps {
  testFlows: TestFlow[];
  onSelect: (flow: TestFlow) => void;
  selectedFlow?: TestFlow;
}

const SimplifiedTestFlowSelector: React.FC<SimplifiedTestFlowSelectorProps> = ({
  testFlows,
  onSelect,
  selectedFlow
}) => {
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {testFlows.map((flow) => {
          const totalSteps = flow.steps.length;
          
          return (
            <Card 
              key={flow.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedFlow?.id === flow.id 
                  ? 'border-elec-yellow bg-elec-yellow/10' 
                  : 'border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40'
              }`}
              onClick={() => onSelect(flow)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-white">
                    {flow.title}
                  </CardTitle>
                  {flow.difficulty && (
                    <Badge 
                      variant="outline"
                      className={`${getDifficultyColor(flow.difficulty)} border-current`}
                    >
                      {flow.difficulty}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {flow.description}
                </p>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-elec-yellow" />
                    <span>{flow.estimatedDuration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>{totalSteps} steps</span>
                  </div>
                </div>

                {flow.isComprehensive && (
                  <Badge className="w-full justify-center bg-elec-yellow text-black">
                    Comprehensive Testing
                  </Badge>
                )}

                <Button 
                  className="w-full"
                  variant={selectedFlow?.id === flow.id ? 'default' : 'outline'}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(flow);
                  }}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {selectedFlow?.id === flow.id ? 'Selected' : 'Select Test Flow'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {testFlows.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No test flows available.</p>
        </div>
      )}
    </div>
  );
};

export default SimplifiedTestFlowSelector;

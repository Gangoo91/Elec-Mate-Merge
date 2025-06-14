
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TestFlow, TestType } from '@/types/inspection-testing';
import { Play, Clock, CheckCircle } from 'lucide-react';

interface EnhancedTestFlowSelectorProps {
  testFlows: TestFlow[];
  onSelect: (flow: TestFlow) => void;
  selectedFlow?: TestFlow;
}

const EnhancedTestFlowSelector: React.FC<EnhancedTestFlowSelectorProps> = ({
  testFlows,
  onSelect,
  selectedFlow
}) => {
  const [filterType, setFilterType] = useState<TestType | 'all'>('all');

  const validTestTypes: TestType[] = ['eicr', 'eic', 'minor-works', 'pat', 'comprehensive'];

  const filteredFlows = testFlows.filter(flow => 
    filterType === 'all' || flow.type === filterType
  );

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: TestType) => {
    switch (type) {
      case 'eicr': return '📋';
      case 'eic': return '⚡';
      case 'minor-works': return '🔧';
      case 'pat': return '🔌';
      case 'comprehensive': return '🏆';
      default: return '📝';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filterType === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterType('all')}
        >
          All Tests
        </Button>
        {validTestTypes.map(type => (
          <Button
            key={type}
            variant={filterType === type ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType(type)}
          >
            {getTypeIcon(type)} {type.toUpperCase()}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFlows.map((flow) => (
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
                  {getTypeIcon(flow.type)} {flow.title}
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
                  <span>{flow.steps.length} steps</span>
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
        ))}
      </div>

      {filteredFlows.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No test flows found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedTestFlowSelector;

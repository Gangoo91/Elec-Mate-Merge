
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Shield, TestTube, Zap, Eye, CheckCircle } from 'lucide-react';
import { TestFlow } from '@/types/inspection-testing';
import { useIsMobile } from '@/hooks/use-mobile';

interface TestFlowSelectorProps {
  flows: TestFlow[];
  onSelectFlow: (flow: TestFlow) => void;
  mode: 'electrician' | 'apprentice';
}

const TestFlowSelector = ({ flows, onSelectFlow, mode }: TestFlowSelectorProps) => {
  const isMobile = useIsMobile();

  const getFlowIcon = (type: string) => {
    switch (type) {
      case 'safe-isolation': return Shield;
      case 'continuity': return Zap;
      case 'insulation-resistance': return TestTube;
      case 'earth-fault-loop': return Zap;
      case 'rcd-test': return Shield;
      case 'polarity': return CheckCircle;
      case 'visual-inspection': return Eye;
      case 'all-tests': return TestTube;
      default: return TestTube;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  const getEstimatedTime = (flow: TestFlow) => {
    return flow.steps.reduce((total, step) => total + step.estimatedTime, 0);
  };

  const getButtonText = (flowName: string) => {
    // For long flow names (>20 characters), use "Start Test" to prevent overflow
    if (flowName.length > 20) {
      return 'Start Test';
    }
    return `Start ${flowName}`;
  };

  return (
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
      {flows.map((flow) => {
        const Icon = getFlowIcon(flow.type);
        const estimatedTime = getEstimatedTime(flow);
        const buttonText = getButtonText(flow.name);
        
        return (
          <Card
            key={flow.id}
            className="border-elec-yellow/20 bg-elec-dark hover:bg-elec-dark/80 transition-colors cursor-pointer"
            onClick={() => onSelectFlow(flow)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Icon className="h-6 w-6 text-elec-yellow flex-shrink-0" />
                <Badge className={getDifficultyColor(flow.difficulty)} variant="outline">
                  {flow.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight">
                {flow.name}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {flow.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  ~{estimatedTime} min
                </div>
                <div className="flex items-center gap-1">
                  <TestTube className="h-3 w-3" />
                  {flow.steps.length} steps
                </div>
              </div>

              {flow.isComprehensive && (
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 w-full justify-center">
                  Complete Testing Suite
                </Badge>
              )}

              <div className="space-y-2">
                <h4 className="text-xs font-medium text-elec-yellow">Key Standards:</h4>
                <div className="flex flex-wrap gap-1">
                  {flow.regulatoryStandards?.slice(0, 2).map((standard, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {standard.split(' ')[0]}
                    </Badge>
                  ))}
                  {flow.regulatoryStandards && flow.regulatoryStandards.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{flow.regulatoryStandards.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <Button 
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 text-sm px-3 py-2 h-auto min-h-[2.5rem] whitespace-normal leading-tight"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectFlow(flow);
                }}
              >
                <span className="truncate">{buttonText}</span>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TestFlowSelector;

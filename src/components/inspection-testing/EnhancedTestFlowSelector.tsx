
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, CheckCircle, AlertTriangle, BookOpen, Shield, Zap, Star } from 'lucide-react';
import { TestFlow, TestType } from '@/types/inspection-testing';

interface EnhancedTestFlowSelectorProps {
  flows: TestFlow[];
  onSelectFlow: (flow: TestFlow) => void;
  mode: 'electrician' | 'apprentice';
}

const EnhancedTestFlowSelector = ({ flows, onSelectFlow, mode }: EnhancedTestFlowSelectorProps) => {
  const getTypeIcon = (type: TestType) => {
    switch (type) {
      case 'safe-isolation': return Shield;
      case 'continuity': return Zap;
      case 'insulation-resistance': return BookOpen;
      case 'earth-fault-loop': return CheckCircle;
      case 'rcd-test': return AlertTriangle;
      case 'all-tests': return Star;
      default: return CheckCircle;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getEstimatedTime = (flow: TestFlow) => {
    return flow.steps.reduce((total, step) => total + step.estimatedTime, 0);
  };

  // Group flows by category for better organisation
  const comprehensiveFlows = flows.filter(flow => flow.isComprehensive || flow.type === 'all-tests');
  const specificTestFlows = flows.filter(flow => !flow.isComprehensive && flow.type !== 'all-tests');

  // Recommend flows based on mode
  const getRecommendedFlows = () => {
    if (mode === 'apprentice') {
      return flows.filter(flow => 
        flow.difficulty === 'beginner' || 
        (flow.difficulty === 'intermediate' && flow.id.includes('enhanced'))
      );
    } else {
      return flows.filter(flow => 
        flow.isComprehensive || 
        flow.id.includes('professional') ||
        flow.id.includes('enhanced')
      );
    }
  };

  const recommendedFlows = getRecommendedFlows();

  return (
    <div className="space-y-6">
      {/* Recommended Flows */}
      {recommendedFlows.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold">
              Recommended for {mode === 'apprentice' ? 'Learning' : 'Professional'} Mode
            </h3>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {recommendedFlows.slice(0, 4).map((flow) => {
              const TypeIcon = getTypeIcon(flow.type);
              const estimatedTime = getEstimatedTime(flow);
              
              return (
                <Card key={flow.id} className="border-elec-yellow/30 bg-elec-gray hover:border-elec-yellow/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="h-5 w-5 text-elec-yellow" />
                        <CardTitle className="text-base">{flow.name}</CardTitle>
                      </div>
                      <Badge variant="outline" className={getDifficultyColor(flow.difficulty)}>
                        {flow.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {flow.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>~{estimatedTime} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>{flow.steps.length} steps</span>
                        </div>
                      </div>
                      {flow.isComprehensive && (
                        <Badge variant="outline" className="text-xs">
                          Comprehensive
                        </Badge>
                      )}
                    </div>

                    {flow.prerequisites && flow.prerequisites.length > 0 && (
                      <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30">
                        <p className="text-xs text-blue-200 font-medium mb-1">Prerequisites:</p>
                        <ul className="text-xs text-blue-200 space-y-1">
                          {flow.prerequisites.slice(0, 2).map((prereq, index) => (
                            <li key={index}>• {prereq}</li>
                          ))}
                          {flow.prerequisites.length > 2 && (
                            <li className="text-blue-300">• +{flow.prerequisites.length - 2} more...</li>
                          )}
                        </ul>
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => onSelectFlow(flow)}
                      className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                    >
                      Select This Procedure
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Comprehensive Testing Procedures */}
      {comprehensiveFlows.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Complete Testing Procedures</h3>
          
          <div className="grid gap-4">
            {comprehensiveFlows.map((flow) => {
              const TypeIcon = getTypeIcon(flow.type);
              const estimatedTime = getEstimatedTime(flow);
              
              return (
                <Card key={flow.id} className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="h-5 w-5 text-elec-yellow" />
                        <CardTitle className="text-base">{flow.name}</CardTitle>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className={getDifficultyColor(flow.difficulty)}>
                          {flow.difficulty}
                        </Badge>
                        <Badge variant="outline" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                          Complete Suite
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {flow.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>~{estimatedTime} min total</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>{flow.steps.length} steps</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => onSelectFlow(flow)}
                      className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                    >
                      Begin Complete Testing Procedure
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Specific Test Procedures */}
      {specificTestFlows.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Individual Test Procedures</h3>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {specificTestFlows.map((flow) => {
              const TypeIcon = getTypeIcon(flow.type);
              const estimatedTime = getEstimatedTime(flow);
              
              return (
                <Card key={flow.id} className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader className="pb-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="h-4 w-4 text-elec-yellow" />
                        <CardTitle className="text-sm">{flow.name}</CardTitle>
                      </div>
                      <Badge variant="outline" className={`${getDifficultyColor(flow.difficulty)} text-xs`}>
                        {flow.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {flow.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>~{estimatedTime} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>{flow.steps.length} steps</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => onSelectFlow(flow)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Select
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode-specific guidance */}
      <Alert className={mode === 'apprentice' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-green-500/10 border-green-500/30'}>
        <BookOpen className={`h-4 w-4 ${mode === 'apprentice' ? 'text-blue-400' : 'text-green-400'}`} />
        <AlertDescription className={mode === 'apprentice' ? 'text-blue-200' : 'text-green-200'}>
          <strong>{mode === 'apprentice' ? 'Learning Mode:' : 'Professional Mode:'}</strong>
          {mode === 'apprentice' 
            ? ' Enhanced educational content, detailed explanations, and learning tips are included with all procedures to support your development.'
            : ' Procedures focus on efficiency and compliance with professional standards, regulatory requirements, and certification needs.'
          }
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default EnhancedTestFlowSelector;

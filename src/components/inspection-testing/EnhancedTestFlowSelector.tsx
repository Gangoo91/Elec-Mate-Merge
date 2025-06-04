
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Shield, TestTube, Zap, Eye, CheckCircle, Star, BookOpen } from 'lucide-react';
import { TestFlow } from '@/types/inspection-testing';
import { useIsMobile } from '@/hooks/use-mobile';

interface EnhancedTestFlowSelectorProps {
  flows: TestFlow[];
  onSelectFlow: (flow: TestFlow) => void;
  mode: 'electrician' | 'apprentice';
}

const EnhancedTestFlowSelector = ({ flows, onSelectFlow, mode }: EnhancedTestFlowSelectorProps) => {
  const isMobile = useIsMobile();

  // Separate comprehensive and individual flows
  const comprehensiveFlows = flows.filter(flow => flow.isComprehensive);
  const individualFlows = flows.filter(flow => !flow.isComprehensive);

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

  const FlowCard = ({ flow, featured = false }: { flow: TestFlow; featured?: boolean }) => {
    const Icon = getFlowIcon(flow.type);
    const estimatedTime = getEstimatedTime(flow);
    
    return (
      <Card
        className={`border-elec-yellow/20 bg-elec-dark hover:bg-elec-dark/80 transition-all cursor-pointer ${
          featured ? 'ring-2 ring-elec-yellow/40 shadow-lg' : ''
        }`}
        onClick={() => onSelectFlow(flow)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Icon className={`h-6 w-6 ${featured ? 'text-elec-yellow' : 'text-elec-yellow'} flex-shrink-0`} />
              {featured && <Star className="h-4 w-4 text-elec-yellow" />}
            </div>
            <Badge className={getDifficultyColor(flow.difficulty)} variant="outline">
              {flow.difficulty}
            </Badge>
          </div>
          <CardTitle className={`leading-tight ${featured ? 'text-elec-yellow' : ''}`}>
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
            className={`w-full text-sm px-3 py-2 h-auto min-h-[2.5rem] ${
              featured 
                ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90' 
                : 'bg-elec-yellow/80 text-black hover:bg-elec-yellow'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectFlow(flow);
            }}
          >
            <span className="truncate">
              {featured ? 'Start Complete Testing' : `Start ${flow.name}`}
            </span>
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Comprehensive Testing Section */}
      {comprehensiveFlows.length > 0 && (
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-elec-yellow" />
              Recommended: Complete Testing Procedures
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive testing procedures that cover all BS 7671 requirements in the correct sequence. 
              Perfect for {mode === 'apprentice' ? 'learning the complete process' : 'professional certification work'}.
            </p>
          </div>
          
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4`}>
            {comprehensiveFlows.map((flow) => (
              <FlowCard key={flow.id} flow={flow} featured={true} />
            ))}
          </div>
        </div>
      )}

      {/* Individual Tests Section */}
      {individualFlows.length > 0 && (
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
              <BookOpen className="h-5 w-5" />
              Individual Test Procedures
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Focused procedures for specific testing requirements. Ideal for targeted practice or 
              when you need to perform a specific test in isolation.
            </p>
          </div>
          
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
            {individualFlows.map((flow) => (
              <FlowCard key={flow.id} flow={flow} />
            ))}
          </div>
        </div>
      )}

      {/* Educational Note for Apprentices */}
      {mode === 'apprentice' && (
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Learning Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-200 text-sm">
              <strong>For apprentices:</strong> Start with the Complete Testing Suite to understand the full process, 
              then use individual procedures to practice specific skills. Each test includes detailed explanations 
              of why each step is important and what the results mean.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedTestFlowSelector;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { TestFlow } from '@/types/inspection-testing';
import { testFlows } from '@/data/inspection-testing/testFlows';
import { useIsMobile } from '@/hooks/use-mobile';

interface TestFlowSelectorProps {
  onSelectFlow: (flow: TestFlow) => void;
  mode: 'electrician' | 'apprentice';
}

const TestFlowSelector = ({ onSelectFlow, mode }: TestFlowSelectorProps) => {
  const isMobile = useIsMobile();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return <CheckCircle className="h-4 w-4" />;
      case 'intermediate': return <AlertTriangle className="h-4 w-4" />;
      case 'advanced': return <Zap className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getTotalEstimatedTime = (flow: TestFlow) => {
    return flow.steps.reduce((total, step) => total + (step.estimatedTime || 0), 0);
  };

  // Separate comprehensive flow from individual tests
  const comprehensiveFlow = testFlows.find(flow => flow.isComprehensive);
  const individualFlows = testFlows.filter(flow => !flow.isComprehensive);

  return (
    <div className="space-y-6">
      {/* Comprehensive Testing - Featured */}
      {comprehensiveFlow && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Comprehensive Testing
          </h3>
          
          <Card className="border-2 border-elec-yellow bg-gradient-to-br from-elec-gray to-elec-dark hover:border-elec-yellow/80 transition-all cursor-pointer shadow-lg">
            <CardHeader className={isMobile ? "pb-4" : ""}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-lg' : 'text-xl'}`}>
                    {comprehensiveFlow.name}
                    <Badge className="bg-elec-yellow text-black">
                      FEATURED
                    </Badge>
                  </CardTitle>
                  <CardDescription className={`mt-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
                    {comprehensiveFlow.description}
                  </CardDescription>
                </div>
                {!isMobile && (
                  <Badge className={`${getDifficultyColor(comprehensiveFlow.difficulty)} flex items-center gap-1`}>
                    {getDifficultyIcon(comprehensiveFlow.difficulty)}
                    {comprehensiveFlow.difficulty}
                  </Badge>
                )}
              </div>
              {isMobile && (
                <Badge className={`${getDifficultyColor(comprehensiveFlow.difficulty)} flex items-center gap-1 w-fit`}>
                  {getDifficultyIcon(comprehensiveFlow.difficulty)}
                  {comprehensiveFlow.difficulty}
                </Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-4 text-sm`}>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{getTotalEstimatedTime(comprehensiveFlow)} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <span>{comprehensiveFlow.steps.length} test steps</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  <span>All BS 7671 Tests</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Includes:</h4>
                <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-2 text-xs`}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>
                    <span>Visual Inspection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
                    <span>Continuity Testing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full shrink-0"></div>
                    <span>Insulation Resistance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full shrink-0"></div>
                    <span>Polarity Testing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full shrink-0"></div>
                    <span>Earth Fault Loop</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full shrink-0"></div>
                    <span>RCD Testing</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => onSelectFlow(comprehensiveFlow)}
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium"
                size={isMobile ? "default" : "lg"}
              >
                Start Comprehensive Testing
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Individual Test Flows */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Individual Test Procedures</h3>
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4`}>
          {individualFlows.map((flow) => (
            <Card 
              key={flow.id} 
              className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all cursor-pointer shadow-sm"
              onClick={() => onSelectFlow(flow)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-2">
                    <CardTitle className={isMobile ? "text-base" : "text-lg"}>{flow.name}</CardTitle>
                    <CardDescription className="mt-1 text-sm">
                      {flow.description}
                    </CardDescription>
                  </div>
                  <Badge className={`${getDifficultyColor(flow.difficulty)} shrink-0 text-xs`}>
                    {flow.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{getTotalEstimatedTime(flow)} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span>{flow.steps.length} steps</span>
                  </div>
                </div>

                {flow.regulatoryStandards && flow.regulatoryStandards.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Standards:</span> {flow.regulatoryStandards[0]}
                  </div>
                )}

                <Button 
                  onClick={() => onSelectFlow(flow)}
                  variant="outline" 
                  className="w-full"
                  size={isMobile ? "sm" : "default"}
                >
                  Select Test
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {mode === 'apprentice' && (
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <h4 className="font-medium text-blue-200 mb-2">💡 Learning Recommendation</h4>
          <p className="text-sm text-blue-300 leading-relaxed">
            Start with individual test procedures to understand each testing method before attempting 
            the comprehensive "All Tests in One Go" option. This will help build your confidence and 
            ensure you understand the requirements for each test type.
          </p>
        </div>
      )}
    </div>
  );
};

export default TestFlowSelector;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TestFlow } from "@/types/inspection-testing";
import { Clock, CheckCircle, AlertTriangle, FileText } from "lucide-react";

interface SimplifiedTestFlowSelectorProps {
  flows: TestFlow[];
  onSelectFlow: (flow: TestFlow) => void;
  mode: 'electrician' | 'apprentice';
}

const SimplifiedTestFlowSelector = ({ flows, onSelectFlow, mode }: SimplifiedTestFlowSelectorProps) => {
  // Filter and organize flows for simplified display
  const essentialFlows = flows.filter(flow => 
    flow.id === 'safe-isolation-procedure' ||
    flow.id === 'domestic-eicr-standard' ||
    flow.id === 'commercial-eicr-comprehensive' ||
    flow.id === 'new-installation-testing'
  );

  const getFlowIcon = (flowId: string) => {
    switch (flowId) {
      case 'safe-isolation-procedure':
        return <AlertTriangle className="h-6 w-6 text-orange-400" />;
      case 'domestic-eicr-standard':
        return <FileText className="h-6 w-6 text-blue-400" />;
      case 'commercial-eicr-comprehensive':
        return <FileText className="h-6 w-6 text-purple-400" />;
      case 'new-installation-testing':
        return <CheckCircle className="h-6 w-6 text-green-400" />;
      default:
        return <CheckCircle className="h-6 w-6 text-elec-yellow" />;
    }
  };

  const getFlowDescription = (flow: TestFlow) => {
    switch (flow.id) {
      case 'safe-isolation-procedure':
        return 'Essential safety procedures for electrical isolation';
      case 'domestic-eicr-standard':
        return 'Complete periodic inspection for residential properties';
      case 'commercial-eicr-comprehensive':
        return 'Comprehensive testing for commercial installations';
      case 'new-installation-testing':
        return 'Initial verification for new electrical installations';
      default:
        return flow.description;
    }
  };

  const getTotalTime = (flow: TestFlow) => {
    return flow.steps.reduce((total, step) => total + step.estimatedTime, 0);
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-gray to-elec-gray/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Choose Your Testing Procedure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select a standardised testing procedure to begin. Each procedure includes step-by-step guidance
            {mode === 'apprentice' ? ' with educational content' : ' for professional compliance'} and automatic EICR integration.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {essentialFlows.map((flow) => (
          <Card 
            key={flow.id} 
            className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all cursor-pointer group"
            onClick={() => onSelectFlow(flow)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getFlowIcon(flow.id)}
                  <div>
                    <CardTitle className="text-lg group-hover:text-elec-yellow transition-colors">
                      {flow.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        ~{getTotalTime(flow)} min
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {flow.steps.length} steps
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {getFlowDescription(flow)}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Key Features:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {flow.id === 'safe-isolation-procedure' && (
                    <>
                      <Badge variant="secondary" className="text-xs">Safety First</Badge>
                      <Badge variant="secondary" className="text-xs">Proving Dead</Badge>
                      <Badge variant="secondary" className="text-xs">Lock Off</Badge>
                    </>
                  )}
                  {flow.id.includes('eicr') && (
                    <>
                      <Badge variant="secondary" className="text-xs">Auto EICR</Badge>
                      <Badge variant="secondary" className="text-xs">Fault Codes</Badge>
                      <Badge variant="secondary" className="text-xs">BS 7671</Badge>
                    </>
                  )}
                  {flow.id === 'new-installation-testing' && (
                    <>
                      <Badge variant="secondary" className="text-xs">Initial Verification</Badge>
                      <Badge variant="secondary" className="text-xs">Full Testing</Badge>
                      <Badge variant="secondary" className="text-xs">Certification</Badge>
                    </>
                  )}
                </div>
              </div>

              <Button 
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 group-hover:bg-elec-yellow/80"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectFlow(flow);
                }}
              >
                Start Testing Procedure
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {mode === 'apprentice' && (
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-blue-200">Learning Mode Active</p>
                <p className="text-sm text-blue-300">
                  Each procedure includes detailed explanations and learning objectives to help you understand the why behind each step.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SimplifiedTestFlowSelector;

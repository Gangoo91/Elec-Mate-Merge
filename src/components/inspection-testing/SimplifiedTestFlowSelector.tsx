
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TestFlow } from "@/types/inspection-testing";
import { Clock, CheckCircle, AlertTriangle, FileText, Shield, Zap } from "lucide-react";

interface SimplifiedTestFlowSelectorProps {
  flows: TestFlow[];
  onSelectFlow: (flow: TestFlow) => void;
  mode: 'electrician' | 'apprentice';
}

const SimplifiedTestFlowSelector = ({ flows, onSelectFlow, mode }: SimplifiedTestFlowSelectorProps) => {
  const getFlowIcon = (flowId: string) => {
    if (flowId.includes('domestic')) return FileText;
    if (flowId.includes('commercial')) return Zap;
    if (flowId.includes('safe-isolation')) return Shield;
    return CheckCircle;
  };

  const getFlowDescription = (flow: TestFlow) => {
    return flow.description;
  };

  const getTotalTime = (flow: TestFlow) => {
    return flow.steps.reduce((total, step) => total + step.estimatedTime, 0);
  };

  const getFlowFeatures = (flow: TestFlow) => {
    const features = [];
    
    if (flow.id.includes('domestic')) {
      features.push('Domestic Property');
      features.push('Single/Three Phase');
      features.push('Consumer Unit');
    } else if (flow.id.includes('commercial')) {
      features.push('Commercial Property');
      features.push('Distribution Boards');
      features.push('Advanced Testing');
    }
    
    features.push('Auto EICR');
    features.push('BS 7671:2018+A2:2022');
    features.push('C1/C2/C3/FI Codes');
    
    return features;
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-gray to-elec-gray/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            UK EICR Testing Procedures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select a standardised UK EICR testing procedure compliant with BS 7671:2018+A2:2022. 
            Each procedure includes step-by-step guidance
            {mode === 'apprentice' ? ' with educational content' : ' for professional compliance'} 
            and automatic EICR report generation with proper fault classification.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {flows.map((flow) => {
          const Icon = getFlowIcon(flow.id);
          const estimatedTime = getTotalTime(flow);
          const features = getFlowFeatures(flow);
          
          return (
            <Card 
              key={flow.id} 
              className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all cursor-pointer group"
              onClick={() => onSelectFlow(flow)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-elec-yellow" />
                    <div>
                      <CardTitle className="text-lg group-hover:text-elec-yellow transition-colors">
                        {flow.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          ~{estimatedTime} min
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {flow.steps.length} steps
                        </Badge>
                        <Badge variant="outline" className={
                          flow.difficulty === 'beginner' ? 'text-green-300 border-green-500/30' :
                          flow.difficulty === 'intermediate' ? 'text-yellow-300 border-yellow-500/30' :
                          'text-red-300 border-red-500/30'
                        }>
                          {flow.difficulty}
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
                    {features.slice(0, 6).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* UK Compliance Badge */}
                <div className="flex items-center gap-2 p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <span className="text-xs text-blue-300 font-medium">
                    BS 7671:2018+A2:2022 Compliant
                  </span>
                </div>

                <Button 
                  className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFlow(flow);
                  }}
                >
                  Start EICR Testing
                </Button>
              </CardContent>
            </Card>
          );
        })}
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
                  Each procedure includes detailed explanations of UK electrical regulations, safety requirements, 
                  and learning objectives to help you understand BS 7671 compliance requirements.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* UK Standards Notice */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-green-400" />
            <div>
              <p className="font-medium text-green-200">UK Electrical Standards Compliance</p>
              <p className="text-sm text-green-300">
                All testing procedures follow current UK electrical installation standards including BS 7671:2018+A2:2022, 
                IET Guidance Note 3, and Health & Safety at Work Act 1974 requirements. 
                EICR reports use standardised C1, C2, C3, and FI fault classification codes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimplifiedTestFlowSelector;

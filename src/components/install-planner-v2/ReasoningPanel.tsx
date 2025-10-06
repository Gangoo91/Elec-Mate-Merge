import { Brain, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ReasoningStep {
  agent: string;
  status: 'pending' | 'active' | 'complete';
  reasoning?: string;
}

interface ReasoningPanelProps {
  steps: ReasoningStep[];
  isVisible: boolean;
}

const agentIcons: Record<string, string> = {
  'designer': '🎨',
  'cost-engineer': '💰',
  'installer': '🔧',
  'commissioning': '✅',
  'cache': '⚡'
};

const agentNames: Record<string, string> = {
  'designer': 'Circuit Designer',
  'cost-engineer': 'Cost Engineer',
  'installer': 'Installation Planner',
  'commissioning': 'Commissioning Expert',
  'cache': 'Cached Response'
};

export const ReasoningPanel = ({ steps, isVisible }: ReasoningPanelProps) => {
  if (!isVisible || steps.length === 0) return null;

  return (
    <Card className="bg-elec-card/50 border-elec-yellow/20 p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Brain className="h-4 w-4 text-elec-yellow" />
        <h3 className="text-sm font-semibold text-white">AI Reasoning Process</h3>
      </div>
      
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-2 rounded-lg bg-elec-dark/50"
          >
            <div className="flex-shrink-0 mt-0.5">
              {step.status === 'active' && (
                <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
              )}
              {step.status === 'complete' && (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )}
              {step.status === 'pending' && (
                <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{agentIcons[step.agent] || '🤖'}</span>
                <span className="text-sm font-medium text-white">
                  {agentNames[step.agent] || step.agent}
                </span>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    step.status === 'active' ? 'border-elec-yellow/50 text-elec-yellow' :
                    step.status === 'complete' ? 'border-green-500/50 text-green-500' :
                    'border-muted-foreground/30 text-muted-foreground'
                  }`}
                >
                  {step.status}
                </Badge>
              </div>
              
              {step.reasoning && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.reasoning}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Loader2, AlertTriangle, Shield, Handshake } from "lucide-react";

interface ThinkingStep {
  agent: string;
  message: string;
  progress?: number;
  completed?: boolean;
  challenge?: {
    challenger: string;
    issue: string;
    resolution?: 'accepted' | 'defended' | 'compromised';
  };
}

interface AgentThinkingPanelProps {
  steps: ThinkingStep[];
  currentAgent?: string;
  isVisible: boolean;
}

const AGENT_EMOJI: Record<string, string> = {
  designer: '📐',
  'cost-engineer': '💰',
  installer: '🔧',
  'health-safety': '⚠️',
  commissioning: '✅',
  inspector: '🔍'
};

const AGENT_NAMES: Record<string, string> = {
  designer: 'Circuit Designer',
  'cost-engineer': 'Cost Engineer',
  installer: 'Installation Planner',
  'health-safety': 'Health & Safety',
  commissioning: 'Commissioning Expert',
  inspector: 'Inspector'
};

export const AgentThinkingPanel = ({
  steps,
  currentAgent,
  isVisible
}: AgentThinkingPanelProps) => {
  if (!isVisible || steps.length === 0) return null;

  const activeStep = steps.find(s => s.agent === currentAgent && !s.completed);
  const completedSteps = steps.filter(s => s.completed);

  return (
    <Card className="bg-elec-card/50 border-elec-yellow/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
          Agent Thinking
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Current Agent Progress */}
        {activeStep && (
          <div className="p-3 rounded-lg bg-elec-dark/50 border border-elec-yellow/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{AGENT_EMOJI[activeStep.agent]}</span>
              <span className="text-sm font-medium text-white">
                {AGENT_NAMES[activeStep.agent]}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              {activeStep.message}
            </p>
            {activeStep.progress !== undefined && (
              <Progress value={activeStep.progress} className="h-1.5" />
            )}
          </div>
        )}

        {/* Completed Steps */}
        {completedSteps.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground">Completed:</p>
            {completedSteps.map((step, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  <span>{AGENT_EMOJI[step.agent]}</span>
                  <span>{step.message}</span>
                </div>
                
                {/* Show challenge if present */}
                {step.challenge && (
                  <div className="ml-5 pl-3 border-l-2 border-elec-yellow/30 space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <AlertTriangle className="h-3 w-3 text-amber-500" />
                      <span className="text-amber-500">
                        {AGENT_EMOJI[step.challenge.challenger]} challenged: {step.challenge.issue}
                      </span>
                    </div>
                    
                    {step.challenge.resolution === 'accepted' && (
                      <div className="flex items-center gap-2 text-xs text-green-500">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Design revised ✓</span>
                      </div>
                    )}
                    
                    {step.challenge.resolution === 'defended' && (
                      <div className="flex items-center gap-2 text-xs text-blue-500">
                        <Shield className="h-3 w-3" />
                        <span>Original design maintained</span>
                      </div>
                    )}
                    
                    {step.challenge.resolution === 'compromised' && (
                      <div className="flex items-center gap-2 text-xs text-elec-yellow">
                        <Handshake className="h-3 w-3" />
                        <span>Consensus reached</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GitBranch, ArrowRight, Zap, Calculator, Shield, Wrench, Clipboard, CheckCircle2, Settings } from 'lucide-react';
import { AgentType } from '@/types/agent-request';

interface AgentFlowDiagramProps {
  currentAgent: AgentType;
  onQuickForward: (targetAgent: AgentType) => void;
}

const AGENT_FLOW_PATHS: Record<AgentType, AgentType[]> = {
  'designer': ['cost-engineer', 'installer', 'health-safety'],
  'cost-engineer': ['designer', 'installer', 'project-manager'],
  'installer': ['health-safety', 'commissioning'],
  'health-safety': ['installer', 'commissioning'],
  'commissioning': ['maintenance', 'project-manager'],
  'maintenance': ['commissioning', 'designer'],
  'project-manager': ['designer', 'cost-engineer', 'installer'],
  'tutor': []
};

const AGENT_META: Record<AgentType, { name: string; icon: typeof Zap; color: string }> = {
  'designer': { name: 'Circuit Designer', icon: Zap, color: 'text-blue-400' },
  'cost-engineer': { name: 'Cost Engineer', icon: Calculator, color: 'text-green-400' },
  'installer': { name: 'Installation Specialist', icon: Wrench, color: 'text-blue-400' },
  'health-safety': { name: 'Health & Safety', icon: Shield, color: 'text-orange-400' },
  'commissioning': { name: 'Testing & Commissioning', icon: CheckCircle2, color: 'text-purple-400' },
  'maintenance': { name: 'Maintenance Specialist', icon: Settings, color: 'text-cyan-400' },
  'project-manager': { name: 'Project Manager', icon: Clipboard, color: 'text-pink-400' },
  'tutor': { name: 'AI Tutor', icon: Clipboard, color: 'text-yellow-400' }
};

export const AgentFlowDiagram = ({ currentAgent, onQuickForward }: AgentFlowDiagramProps) => {
  const suggestedAgents = AGENT_FLOW_PATHS[currentAgent] || [];

  if (suggestedAgents.length === 0) return null;

  return (
    <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-background">
      <CardHeader>
        <div className="flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Workflow Suggestions</CardTitle>
        </div>
        <CardDescription>
          Quick forward your work to the next specialist
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {suggestedAgents.map(agentId => {
            const meta = AGENT_META[agentId];
            const Icon = meta.icon;
            
            return (
              <Button
                key={agentId}
                variant="outline"
                className="gap-2 hover:border-elec-yellow/50 hover:bg-elec-yellow/10"
                onClick={() => onQuickForward(agentId)}
              >
                <Icon className={`h-4 w-4 ${meta.color}`} />
                {meta.name}
                <ArrowRight className="h-3 w-3 ml-1 text-muted-foreground" />
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

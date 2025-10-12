import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface AgentHealthBannerProps {
  unhealthyAgents: string[];
  onDismiss?: () => void;
}

const AGENT_NAMES: Record<string, string> = {
  'designer': 'Circuit Designer',
  'cost-engineer': 'Cost Engineer',
  'installer': 'Installation Specialist',
  'health-safety': 'Health & Safety',
  'commissioning': 'Testing & Commissioning',
  'project-manager': 'Project Manager'
};

export const AgentHealthBanner = ({ unhealthyAgents, onDismiss }: AgentHealthBannerProps) => {
  if (unhealthyAgents.length === 0) {
    return (
      <Alert className="border-success/50 bg-success/10">
        <CheckCircle2 className="h-4 w-4 text-success" />
        <AlertDescription className="text-sm text-success">
          All agents online and ready
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive" className="border-orange-500/50 bg-orange-500/10">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="text-sm">
        <span className="font-semibold">Some agents temporarily unavailable:</span>{' '}
        {unhealthyAgents.map(agent => AGENT_NAMES[agent] || agent).join(', ')}
        {'. '}
        <span className="text-muted-foreground">You can still use other agents.</span>
      </AlertDescription>
    </Alert>
  );
};

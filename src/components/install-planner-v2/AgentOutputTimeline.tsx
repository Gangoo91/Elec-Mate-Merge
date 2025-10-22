import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentOutput {
  agent: string;
  timestamp: string;
  hasError?: boolean;
}

interface AgentOutputTimelineProps {
  outputs: AgentOutput[];
  currentAgent?: string;
}

const getAgentEmoji = (agent: string) => {
  const emojis: Record<string, string> = {
    'designer': '📐',
    'cost-engineer': '💷',
    'installer': '🔧',
    'health-safety': '⚠️',
    'commissioning': '✅',
    'project-manager': '📋'
  };
  return emojis[agent] || '🤖';
};

const getAgentName = (agent: string) => {
  const names: Record<string, string> = {
    'designer': 'Circuit Designer',
    'cost-engineer': 'Cost Engineer',
    'installer': 'Installation Specialist',
    'health-safety': 'Health & Safety',
    'commissioning': 'Testing & Commissioning',
    'project-manager': 'Project Manager'
  };
  return names[agent] || agent;
};

export const AgentOutputTimeline = ({ outputs, currentAgent }: AgentOutputTimelineProps) => {
  if (outputs.length === 0) return null;

  return (
    <Card className="bg-elec-card border-elec-border p-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-4 w-4 text-elec-yellow" />
        <h3 className="text-sm font-semibold text-foreground">Consultation History</h3>
        <Badge variant="outline" className="ml-auto text-xs">
          {outputs.length} {outputs.length === 1 ? 'specialist' : 'specialists'}
        </Badge>
      </div>
      
      <div className="space-y-3">
        {outputs.map((output, index) => {
          const isCurrent = output.agent === currentAgent;
          const isCompleted = !output.hasError && !isCurrent;
          
          return (
            <motion.div
              key={`${output.agent}-${output.timestamp}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg border transition-all",
                isCompleted && "bg-green-500/5 border-green-500/20",
                isCurrent && "bg-elec-yellow/5 border-elec-yellow/30",
                output.hasError && "bg-red-500/5 border-red-500/20",
                !isCompleted && !isCurrent && !output.hasError && "bg-muted/5 border-muted/20"
              )}
            >
              <span className="text-xl shrink-0">{getAgentEmoji(output.agent)}</span>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{getAgentName(output.agent)}</span>
                  {isCompleted && <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}
                  {output.hasError && <AlertCircle className="h-3.5 w-3.5 text-red-500" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(output.timestamp).toLocaleString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: 'numeric',
                    month: 'short'
                  })}
                </p>
              </div>
              
              {isCurrent && (
                <div className="flex items-center gap-1.5 text-xs text-elec-yellow">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow animate-pulse" />
                  Active
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};
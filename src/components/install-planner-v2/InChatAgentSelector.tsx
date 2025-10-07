import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Zap, Calculator, Wrench, Shield, ClipboardCheck, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Agent {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
}

const AGENTS: Agent[] = [
  {
    id: 'designer',
    name: 'Designer',
    icon: Zap,
    description: 'Circuit design & cable sizing',
    color: 'text-yellow-500',
  },
  {
    id: 'cost-engineer',
    name: 'Cost Engineer',
    icon: Calculator,
    description: 'Material costs & pricing',
    color: 'text-green-500',
  },
  {
    id: 'installer',
    name: 'Installer',
    icon: Wrench,
    description: 'Installation guidance',
    color: 'text-blue-500',
  },
  {
    id: 'health-safety',
    name: 'H&S Specialist',
    icon: Shield,
    description: 'Safety requirements',
    color: 'text-red-500',
  },
  {
    id: 'commissioning',
    name: 'Commissioning',
    icon: ClipboardCheck,
    description: 'Testing & inspection',
    color: 'text-purple-500',
  },
  {
    id: 'project-manager',
    name: 'Project Manager',
    icon: FolderKanban,
    description: 'Timeline & coordination',
    color: 'text-orange-500',
  },
];

interface InChatAgentSelectorProps {
  selectedAgent: string | null;
  onSelectAgent: (agentId: string | null) => void;
  activeAgents: string[];
  className?: string;
}

export const InChatAgentSelector = ({
  selectedAgent,
  onSelectAgent,
  activeAgents,
  className,
}: InChatAgentSelectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAgentClick = (agentId: string) => {
    if (selectedAgent === agentId) {
      // Deselect if clicking the same agent
      onSelectAgent(null);
      setIsExpanded(false);
    } else {
      onSelectAgent(agentId);
      setIsExpanded(false);
    }
  };

  const selectedAgentData = AGENTS.find(a => a.id === selectedAgent);

  return (
    <div className={cn("w-full", className)}>
      {/* Compact mode - Show selected agent or expand button */}
      {!isExpanded && (
        <div className="flex items-center gap-2">
          {selectedAgent && selectedAgentData ? (
            <div className="flex items-center gap-2 bg-elec-card/50 border border-elec-yellow/30 rounded-xl px-3 py-2">
              <selectedAgentData.icon className={cn("h-4 w-4", selectedAgentData.color)} />
              <span className="text-sm font-medium text-elec-yellow">
                {selectedAgentData.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelectAgent(null)}
                className="h-5 w-5 p-0 hover:bg-elec-yellow/20"
              >
                ×
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(true)}
              className="text-xs border-dashed border-elec-yellow/30 hover:border-elec-yellow/60"
            >
              🎯 Choose Specialist Agent
            </Button>
          )}
        </div>
      )}

      {/* Expanded mode - Show all agents */}
      {isExpanded && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Select a specialist agent:</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="h-6 text-xs"
            >
              Cancel
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {AGENTS.map((agent) => {
              const Icon = agent.icon;
              const isActive = activeAgents.includes(agent.id);
              const isSelected = selectedAgent === agent.id;
              
              return (
                <button
                  key={agent.id}
                  onClick={() => handleAgentClick(agent.id)}
                  className={cn(
                    "relative flex flex-col items-start gap-1 p-3 rounded-xl border transition-all",
                    "hover:scale-105 hover:shadow-lg",
                    isSelected && "bg-elec-yellow/10 border-elec-yellow shadow-lg scale-105",
                    !isSelected && isActive && "bg-green-500/5 border-green-500/30",
                    !isSelected && !isActive && "bg-elec-card/30 border-border/50 hover:border-border"
                  )}
                >
                  {isActive && !isSelected && (
                    <div className="absolute top-2 right-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                  )}
                  
                  {isSelected && (
                    <div className="absolute top-2 right-2">
                      <Check className="h-4 w-4 text-elec-yellow" />
                    </div>
                  )}
                  
                  <Icon className={cn("h-5 w-5", agent.color)} />
                  <div className="text-left">
                    <p className="text-sm font-medium">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

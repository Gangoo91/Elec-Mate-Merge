import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lightbulb, Calculator, Wrench, Shield, CheckCircle, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentSuggestion {
  agent: string;
  reason: string;
  priority?: string;
}

interface AgentSuggestionsProps {
  suggestions: AgentSuggestion[];
  onSelectAgent: (agentId: string) => void;
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

export const AgentSuggestions = ({ suggestions, onSelectAgent }: AgentSuggestionsProps) => {
  if (suggestions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-2 mt-3 p-3 rounded-lg bg-elec-card/30 border border-elec-yellow/20"
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Lightbulb className="h-3.5 w-3.5 text-elec-yellow" />
        <span className="font-medium">Suggested next steps:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.agent}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectAgent(suggestion.agent)}
              className={cn(
                "h-auto py-2 px-3 flex-col items-start gap-1 hover:bg-elec-yellow/10 hover:border-elec-yellow transition-all",
                suggestion.priority === 'high' && "border-elec-yellow/40"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{getAgentEmoji(suggestion.agent)}</span>
                <span className="text-xs font-semibold">{getAgentName(suggestion.agent)}</span>
                {suggestion.priority === 'high' && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-elec-yellow/20 text-elec-yellow font-medium">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground text-left leading-snug">
                {suggestion.reason}
              </p>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

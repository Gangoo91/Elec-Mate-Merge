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
      className="flex flex-col gap-3 mt-4 p-4 rounded-lg bg-gradient-to-r from-elec-dark/80 to-elec-grey/50 border border-elec-yellow/30"
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <Lightbulb className="h-4 w-4 text-elec-yellow" />
        <span>Who would you like to consult next?</span>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1.5 sm:gap-2">
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
                "h-auto w-full sm:w-auto py-1.5 sm:py-2 px-2 sm:px-3 flex-col items-start gap-0.5 sm:gap-1 hover:bg-elec-yellow/10 hover:border-elec-yellow transition-all",
                suggestion.priority === 'high' && "border-elec-yellow/40"
              )}
            >
              <div className="flex items-center gap-2 w-full">
                <span className="text-lg">{getAgentEmoji(suggestion.agent)}</span>
                <div className="flex-1">
                  <span className="text-sm font-semibold block">{getAgentName(suggestion.agent)}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {suggestion.reason}
                  </p>
                </div>
                {suggestion.priority === 'high' && (
                  <span className="text-[9px] px-2 py-1 rounded bg-elec-yellow/20 text-elec-yellow font-medium">
                    Recommended
                  </span>
                )}
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

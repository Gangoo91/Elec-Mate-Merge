import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lightbulb, Calculator, Wrench, Shield, CheckCircle, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentSuggestion {
  agent: string;
  reason: string;
  priority?: 'high' | 'medium' | 'low';
  contextHint?: string; // What info from previous agent makes this relevant
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

  // Sort by priority
  const sortedSuggestions = [...suggestions].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority || 'medium'] - priorityOrder[b.priority || 'medium'];
  });

  const getPriorityBadge = (priority?: string) => {
    if (priority === 'high') {
      return (
        <span className="text-[10px] px-2 py-0.5 rounded bg-elec-yellow/20 text-elec-yellow font-medium whitespace-nowrap">
          Recommended
        </span>
      );
    }
    if (priority === 'low') {
      return (
        <span className="text-[10px] px-2 py-0.5 rounded bg-muted/20 text-muted-foreground font-medium whitespace-nowrap">
          Optional
        </span>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 mt-4 p-4 rounded-lg bg-gradient-to-r from-elec-dark/80 to-elec-grey/50 border border-elec-yellow/30"
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Lightbulb className="h-4 w-4 text-elec-yellow" />
        <span>Who would you like to consult next?</span>
      </div>
      
      <div className="flex flex-col gap-2">
        {sortedSuggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.agent}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectAgent(suggestion.agent)}
              className={cn(
                "h-auto w-full py-2.5 px-3 flex items-start gap-3 hover:bg-elec-yellow/10 hover:border-elec-yellow transition-all text-left",
                suggestion.priority === 'high' && "border-elec-yellow/50 bg-elec-yellow/5"
              )}
            >
              <span className="text-xl shrink-0 mt-0.5">{getAgentEmoji(suggestion.agent)}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold">{getAgentName(suggestion.agent)}</span>
                  {getPriorityBadge(suggestion.priority)}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {suggestion.reason}
                </p>
                {suggestion.contextHint && (
                  <p className="text-[10px] text-elec-yellow/60 mt-1.5 italic">
                    💡 {suggestion.contextHint}
                  </p>
                )}
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

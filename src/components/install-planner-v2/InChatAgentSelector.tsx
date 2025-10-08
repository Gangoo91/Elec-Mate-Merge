import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, Calculator, Wrench, Shield, CheckCircle, ClipboardList,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type AgentType = 'designer' | 'cost-engineer' | 'installer' | 'health-safety' | 'commissioning' | 'project-manager';

interface Agent {
  id: AgentType;
  name: string;
  icon: typeof Lightbulb;
  color: string;
  description: string;
}

const AGENTS: Agent[] = [
  { id: 'designer', name: 'Designer', icon: Lightbulb, color: 'text-blue-400', description: 'Circuit design & cable sizing' },
  { id: 'cost-engineer', name: 'Cost', icon: Calculator, color: 'text-green-400', description: 'Material costs & quotes' },
  { id: 'installer', name: 'Installer', icon: Wrench, color: 'text-orange-400', description: 'Practical installation advice' },
  { id: 'health-safety', name: 'H&S', icon: Shield, color: 'text-red-400', description: 'Safety requirements' },
  { id: 'commissioning', name: 'Testing', icon: CheckCircle, color: 'text-purple-400', description: 'Inspection & testing' },
  { id: 'project-manager', name: 'Manager', icon: ClipboardList, color: 'text-yellow-400', description: 'Project coordination' }
];

interface InChatAgentSelectorProps {
  selectedAgent: AgentType | null;
  onAgentSelect: (agentId: AgentType | null) => void;
  activeAgents?: string[];
  className?: string;
}

export const InChatAgentSelector = ({
  selectedAgent, onAgentSelect, activeAgents = [], className
}: InChatAgentSelectorProps) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const visibleCount = 3;

  return (
    <div className={cn("relative", className)}>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-2 flex-wrap">
        <Button variant="ghost" size="sm" onClick={() => onAgentSelect(null)}
          className={cn("h-8 text-xs", selectedAgent === null && "bg-elec-yellow/20 text-elec-yellow")}>
          Auto
        </Button>
        {AGENTS.map((agent) => {
          const Icon = agent.icon;
          const isSelected = selectedAgent === agent.id;
          const isComplete = activeAgents.includes(agent.id) && !isSelected;
          return (
            <Button key={agent.id} variant="ghost" size="sm"
              onClick={() => onAgentSelect(isSelected ? null : agent.id)}
              className={cn("h-8 gap-2 text-xs relative",
                isSelected && "bg-elec-yellow/20 text-elec-yellow",
                isComplete && "bg-green-500/10 text-green-400")}>
              <Icon className={cn("h-3.5 w-3.5", agent.color)} />
              <span>{agent.name}</span>
              {isComplete && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1">
                <CheckCircle className="h-3 w-3 text-green-400 fill-current" />
              </motion.div>}
            </Button>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="md:hidden overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="flex gap-2 snap-x snap-mandatory pb-2">
          <Button variant="ghost" size="sm" onClick={() => onAgentSelect(null)}
            className={cn("h-10 text-xs flex-shrink-0 snap-center", selectedAgent === null && "bg-elec-yellow/20 text-elec-yellow")}
            aria-label="Auto select agent">
            Auto
          </Button>
          {AGENTS.map((agent) => {
            const Icon = agent.icon;
            const isSelected = selectedAgent === agent.id;
            const isComplete = activeAgents.includes(agent.id) && !isSelected;
            return (
              <Button key={agent.id} variant="ghost" size="sm"
                onClick={() => onAgentSelect(isSelected ? null : agent.id)}
                className={cn("h-10 gap-2 text-xs flex-shrink-0 relative min-w-[100px] snap-center",
                  isSelected && "bg-elec-yellow/20 text-elec-yellow",
                  isComplete && "bg-green-500/10 text-green-400")}
                aria-label={`Select ${agent.name} agent`}>
                <Icon className={cn("h-3.5 w-3.5", agent.color)} />
                <span>{agent.name}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedAgent && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-1 w-1 rounded-full bg-elec-yellow animate-pulse" />
            <span>Directing to <span className="text-elec-yellow font-medium">
              {AGENTS.find(a => a.id === selectedAgent)?.name}
            </span></span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

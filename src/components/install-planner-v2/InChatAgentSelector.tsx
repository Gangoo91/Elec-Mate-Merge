import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, Calculator, Wrench, Shield, CheckCircle, ClipboardList,
  ChevronLeft, ChevronRight, ArrowRight
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
  { id: 'cost-engineer', name: 'Costing', icon: Calculator, color: 'text-green-400', description: 'Materials & labour pricing' },
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
  photoUploadSlot?: React.ReactNode;
}

export const InChatAgentSelector = ({
  selectedAgent, onAgentSelect, activeAgents = [], className, photoUploadSlot
}: InChatAgentSelectorProps) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const visibleCount = 3;
  
  // Agent dependency chain
  const agentOrder: AgentType[] = ['designer', 'cost-engineer', 'installer', 'health-safety', 'commissioning', 'project-manager'];

  return (
    <div className={cn("relative", className)}>
      {/* Agent Dependency Flow (Mobile & Desktop) */}
      {activeAgents.length > 0 && (
        <div className="flex items-center gap-1 mb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 pb-1">
          {agentOrder.map((agentId, idx) => {
            const agent = AGENTS.find(a => a.id === agentId);
            if (!agent) return null;
            const Icon = agent.icon;
            const isActive = activeAgents.includes(agentId);
            const isComplete = isActive;
            
            return (
              <div key={agentId} className="flex items-center flex-shrink-0">
                <div className={cn(
                  "flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] transition-all",
                  isComplete ? "bg-green-500/10 text-green-400" : "bg-white/5 text-white/30"
                )}>
                  <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  <span className="hidden sm:inline">{agent.name}</span>
                </div>
                {idx < agentOrder.length - 1 && (
                  <ArrowRight className={cn(
                    "h-2.5 w-2.5 mx-0.5 flex-shrink-0",
                    isComplete ? "text-green-400/40" : "text-white/20"
                  )} />
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-1.5 flex-wrap">
        <Button variant="ghost" size="sm" onClick={() => onAgentSelect(null)}
          className={cn("h-7 text-xs px-2.5", selectedAgent === null && "bg-elec-yellow/20 text-elec-yellow")}>
          Auto
        </Button>
        {AGENTS.map((agent) => {
          const Icon = agent.icon;
          const isSelected = selectedAgent === agent.id;
          const isComplete = activeAgents.includes(agent.id) && !isSelected;
          return (
            <Button key={agent.id} variant="ghost" size="sm"
              onClick={() => onAgentSelect(isSelected ? null : agent.id)}
              className={cn("h-7 gap-1.5 text-xs px-2.5 relative",
                isSelected && "bg-elec-yellow/20 text-elec-yellow",
                isComplete && "bg-green-500/10 text-green-400")}>
              <Icon className={cn("h-3 w-3", agent.color)} />
              <span>{agent.name}</span>
              {isComplete && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1">
                <CheckCircle className="h-3 w-3 text-green-400 fill-current" />
              </motion.div>}
            </Button>
          );
        })}
        {photoUploadSlot && (
          <>
            <div className="w-px h-5 bg-white/10 mx-1" />
            {photoUploadSlot}
          </>
        )}
      </div>

      {/* Phase 1: Compact Mobile - Icon-only buttons */}
      <div className="md:hidden overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="flex gap-1 snap-x snap-mandatory pb-0.5">
          <Button variant="ghost" size="sm" onClick={() => onAgentSelect(null)}
            className={cn("h-7 text-xs flex-shrink-0 snap-center px-2", selectedAgent === null && "bg-elec-yellow/20 text-elec-yellow")}
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
                className={cn("h-7 gap-1 text-xs flex-shrink-0 relative snap-center px-2",
                  isSelected && "bg-elec-yellow/20 text-elec-yellow",
                  isComplete && "bg-green-500/10 text-green-400")}
                aria-label={`Select ${agent.name} agent`}
                title={agent.description}>
                <Icon className={cn("h-3 w-3", agent.color)} />
                <span className="hidden sm:inline text-[11px]">{agent.name}</span>
              </Button>
            );
          })}
          {photoUploadSlot && (
            <>
              <div className="w-px h-4 bg-white/10 mx-1 self-center" />
              {photoUploadSlot}
            </>
          )}
        </div>
      </div>

    </div>
  );
};

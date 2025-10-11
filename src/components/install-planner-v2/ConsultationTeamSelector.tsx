import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, Gauge, Users, Lightbulb, Calculator, Wrench, 
  Shield, CheckCircle, ClipboardList, ArrowRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type ConsultationMode = 'full' | 'quick' | 'custom' | null;
export type AgentType = 'designer' | 'cost-engineer' | 'installer' | 'health-safety' | 'commissioning' | 'project-manager';

interface ConsultationOption {
  mode: ConsultationMode;
  icon: typeof Zap;
  title: string;
  description: string;
  agents: AgentType[];
  estimatedTime: string;
  gradient: string;
  badge?: string;
}

const CONSULTATION_OPTIONS: ConsultationOption[] = [
  {
    mode: 'full',
    icon: Zap,
    title: 'Full Consultation',
    description: 'Complete design package from all 6 specialists',
    agents: ['designer', 'cost-engineer', 'installer', 'health-safety', 'commissioning', 'project-manager'],
    estimatedTime: '5-10 min',
    gradient: 'from-elec-yellow/20 to-transparent',
    badge: 'Complete'
  },
  {
    mode: 'quick',
    icon: Gauge,
    title: 'Quick Design',
    description: 'Fast design + pricing estimate only',
    agents: ['designer', 'cost-engineer'],
    estimatedTime: '2-3 min',
    gradient: 'from-blue-500/20 to-transparent',
    badge: 'Fast'
  },
  {
    mode: 'custom',
    icon: Users,
    title: 'Custom Selection',
    description: 'Pick specific specialists you need',
    agents: [],
    estimatedTime: 'Variable',
    gradient: 'from-purple-500/20 to-transparent',
    badge: 'Flexible'
  }
];

const AGENT_INFO = [
  { id: 'designer' as AgentType, icon: Lightbulb, name: 'Circuit Designer', color: 'text-blue-400' },
  { id: 'cost-engineer' as AgentType, icon: Calculator, name: 'Cost Engineer', color: 'text-green-400' },
  { id: 'installer' as AgentType, icon: Wrench, name: 'Installer', color: 'text-orange-400' },
  { id: 'health-safety' as AgentType, icon: Shield, name: 'H&S', color: 'text-red-400' },
  { id: 'commissioning' as AgentType, icon: CheckCircle, name: 'Testing', color: 'text-purple-400' },
  { id: 'project-manager' as AgentType, icon: ClipboardList, name: 'Manager', color: 'text-yellow-400' }
];

interface ConsultationTeamSelectorProps {
  onModeSelect: (mode: ConsultationMode, agents: AgentType[]) => void;
  className?: string;
}

export const ConsultationTeamSelector = ({ onModeSelect, className }: ConsultationTeamSelectorProps) => {
  return (
    <div className={cn("space-y-6 p-4 md:p-6", className)}>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Choose Your Consultation Team</h2>
        <p className="text-sm text-white/60">Select how you'd like to work with our specialists</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {CONSULTATION_OPTIONS.map((option) => {
          const Icon = option.icon;
          return (
            <motion.div
              key={option.mode}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={cn(
                  "relative overflow-hidden border border-white/10 bg-gradient-to-br cursor-pointer transition-all hover:border-white/20",
                  option.gradient
                )}
                onClick={() => onModeSelect(option.mode, option.agents)}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/5">
                        <Icon className="h-6 w-6 text-elec-yellow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{option.title}</h3>
                        {option.badge && (
                          <Badge variant="outline" className="mt-1 text-xs">
                            {option.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-white/70">{option.description}</p>

                  {option.agents.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {option.agents.map(agentId => {
                        const agent = AGENT_INFO.find(a => a.id === agentId);
                        if (!agent) return null;
                        const AgentIcon = agent.icon;
                        return (
                          <div 
                            key={agentId}
                            className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/10"
                          >
                            <AgentIcon className={cn("h-3 w-3", agent.color)} />
                            <span className="text-xs text-white/80">{agent.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-white/50">{option.estimatedTime}</span>
                    <ArrowRight className="h-4 w-4 text-white/30" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center">
        <p className="text-xs text-white/40">All consultations are BS 7671:2018+A2:2022 compliant</p>
      </div>
    </div>
  );
};

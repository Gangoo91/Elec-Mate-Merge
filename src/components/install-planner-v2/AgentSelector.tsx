import { Card } from '@/components/ui/card';

interface Agent {
  id: string;
  name: string;
  emoji: string;
  description: string;
  expertise: string;
  comingSoon?: boolean;
}

const AVAILABLE_AGENTS: Agent[] = [
  // Working Agents
  {
    id: 'designer',
    name: 'Circuit Designer',
    emoji: '📐',
    description: 'BS 7671 compliant circuit design',
    expertise: 'Cable sizing, protective devices, voltage drop calculations',
  },
  {
    id: 'cost-engineer',
    name: 'Cost Engineer',
    emoji: '💷',
    description: 'Full project quotes with materials, labour and timescales',
    expertise: 'Material pricing, labour estimates, project timescales, quote generation',
  },
  {
    id: 'installer',
    name: 'Installation Specialist',
    emoji: '🔧',
    description: 'Practical installation guidance',
    expertise: 'Step-by-step procedures, tool requirements, time estimates',
  },
  {
    id: 'maintenance',
    name: 'Maintenance Specialist',
    emoji: '🛠️',
    description: 'Equipment maintenance procedures and testing schedules',
    expertise: 'Preventive maintenance, testing procedures, equipment servicing',
  },
  {
    id: 'health-safety',
    name: 'Health & Safety Officer',
    emoji: '⚠️',
    description: 'Risk assessments, PPE requirements and safety procedures',
    expertise: 'Risk assessments, RAMS documents, PPE requirements, emergency procedures',
  },
];

interface AgentSelectorProps {
  onSelectAgent: (agentId: string) => void;
}

export const AgentSelector = ({ onSelectAgent }: AgentSelectorProps) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="text-5xl mb-3">👋</div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Who do you want to talk to?
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Select a specialist agent to begin your consultation. They'll guide you through their
          expertise and suggest who to speak with next.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {AVAILABLE_AGENTS.map((agent) => (
          <Card
            key={agent.id}
            onClick={() => !agent.comingSoon && onSelectAgent(agent.id)}
            className={`group p-4 md:p-6 transition-all duration-200 ${
              agent.comingSoon
                ? 'cursor-not-allowed opacity-60 border-dashed border-muted-foreground/30'
                : 'cursor-pointer hover:border-elec-yellow/50 hover:bg-elec-card/50 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-2 md:space-y-3 relative">
              {agent.comingSoon && (
                <div className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                  Coming Soon
                </div>
              )}
              <div
                className={`text-4xl md:text-5xl lg:text-6xl transition-transform ${!agent.comingSoon && 'group-hover:scale-110'}`}
              >
                {agent.emoji}
              </div>
              <div className="space-y-1">
                <h3
                  className={`text-base md:text-lg font-semibold text-foreground transition-colors ${!agent.comingSoon && 'group-hover:text-elec-yellow'}`}
                >
                  {agent.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-tight truncate">
                  {agent.description}
                </p>
                <p className="text-[10px] md:text-xs text-muted-foreground/70 italic pt-1 hidden sm:block">
                  {agent.expertise}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

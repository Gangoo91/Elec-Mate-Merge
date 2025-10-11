import { Card } from "@/components/ui/card";

interface Agent {
  id: string;
  name: string;
  emoji: string;
  description: string;
  expertise: string;
}

const AVAILABLE_AGENTS: Agent[] = [
  {
    id: 'designer',
    name: 'Circuit Designer',
    emoji: '📐',
    description: 'BS 7671 compliant circuit design',
    expertise: 'Cable sizing, protective devices, voltage drop calculations'
  },
  {
    id: 'cost-engineer',
    name: 'Cost Engineer',
    emoji: '💷',
    description: 'Material pricing & budget estimates',
    expertise: 'Accurate costing, supplier comparisons, value engineering'
  },
  {
    id: 'installer',
    name: 'Installation Specialist',
    emoji: '🔧',
    description: 'Practical installation guidance',
    expertise: 'Step-by-step procedures, tool requirements, time estimates'
  },
  {
    id: 'health-safety',
    name: 'Health & Safety Officer',
    emoji: '⚠️',
    description: 'Site safety & compliance',
    expertise: 'Risk assessments, PPE requirements, safe working practices'
  },
  {
    id: 'commissioning',
    name: 'Testing & Commissioning',
    emoji: '✅',
    description: 'Testing procedures & certification',
    expertise: 'Test sequences, acceptable values, certification requirements'
  },
  {
    id: 'project-manager',
    name: 'Project Manager',
    emoji: '📋',
    description: 'Project coordination & handover',
    expertise: 'Scheduling, documentation, certification handover'
  }
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
          Select a specialist agent to begin your consultation. They'll guide you through their expertise and suggest who to speak with next.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {AVAILABLE_AGENTS.map(agent => (
          <Card
            key={agent.id}
            onClick={() => onSelectAgent(agent.id)}
            className="group cursor-pointer p-5 md:p-6 hover:border-elec-yellow/50 hover:bg-elec-card/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="text-5xl md:text-6xl transition-transform group-hover:scale-110">
                {agent.emoji}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-elec-yellow transition-colors">
                  {agent.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {agent.description}
                </p>
                <p className="text-[10px] md:text-xs text-muted-foreground/70 italic pt-1">
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

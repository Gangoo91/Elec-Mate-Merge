import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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
    id: 'compliance',
    name: 'Compliance Specialist',
    emoji: '📋',
    description: 'Building regs & statutory compliance',
    expertise: 'Part P, EICR requirements, notification procedures'
  }
];

interface AgentSelectorProps {
  onStartConsultation: (selectedAgents: string[]) => void;
}

export const AgentSelector = ({ onStartConsultation }: AgentSelectorProps) => {
  const [mode, setMode] = useState<'full' | 'quick' | 'custom'>('full');
  const [customAgents, setCustomAgents] = useState<string[]>([
    'designer',
    'cost-engineer',
    'installer'
  ]);

  const handleAgentToggle = (agentId: string) => {
    setCustomAgents(prev =>
      prev.includes(agentId)
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const handleStart = () => {
    let agents: string[];
    
    if (mode === 'full') {
      agents = AVAILABLE_AGENTS.map(a => a.id);
    } else if (mode === 'quick') {
      agents = ['designer', 'cost-engineer'];
    } else {
      agents = customAgents;
    }

    if (agents.length === 0) {
      return; // Prevent starting with no agents
    }

    onStartConsultation(agents);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="text-6xl mb-4">💡</div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Choose Your Consultation Team
        </h2>
        <p className="text-muted-foreground">
          Select which specialist agents will help design your installation
        </p>
      </div>

      <RadioGroup value={mode} onValueChange={(val) => setMode(val as any)}>
        <div className="space-y-3">
          {/* Full Consultation */}
          <div className="flex items-start gap-2.5 p-4 rounded-lg border border-border bg-elec-grey hover:bg-elec-grey/80 transition-colors">
            <RadioGroupItem value="full" id="full" className="mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0 space-y-1">
              <Label htmlFor="full" className="text-base font-semibold cursor-pointer block leading-tight">
                Full Consultation (All 6 Agents)
              </Label>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Complete design package: design → costing → installation → safety → testing → compliance
              </p>
            </div>
          </div>

          {/* Quick Design */}
          <div className="flex items-start gap-2.5 p-4 rounded-lg border border-border bg-elec-grey hover:bg-elec-grey/80 transition-colors">
            <RadioGroupItem value="quick" id="quick" className="mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0 space-y-1">
              <Label htmlFor="quick" className="text-base font-semibold cursor-pointer block leading-tight">
                Quick Design (Designer + Cost Engineer)
              </Label>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Fast design + pricing estimate only
              </p>
            </div>
          </div>

          {/* Custom Selection */}
          <div className="flex items-start gap-2.5 p-4 rounded-lg border border-border bg-elec-grey hover:bg-elec-grey/80 transition-colors">
            <RadioGroupItem value="custom" id="custom" className="mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0 space-y-1">
              <Label htmlFor="custom" className="text-base font-semibold cursor-pointer block leading-tight">
                Custom Selection
              </Label>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Choose specific agents for your needs
              </p>

              {mode === 'custom' && (
                <div className="grid grid-cols-1 gap-2.5 mt-3 pt-3 border-t border-border/50">
                  {AVAILABLE_AGENTS.map(agent => (
                    <div
                      key={agent.id}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-elec-card border border-border hover:bg-elec-card/80 transition-colors"
                    >
                      <Checkbox
                        id={agent.id}
                        checked={customAgents.includes(agent.id)}
                        onCheckedChange={() => handleAgentToggle(agent.id)}
                        className="mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <Label
                          htmlFor={agent.id}
                          className="text-sm font-medium cursor-pointer flex items-center gap-2 leading-tight"
                        >
                          <span className="text-base">{agent.emoji}</span>
                          <span className="flex-1">{agent.name}</span>
                        </Label>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {agent.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </RadioGroup>

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleStart}
          disabled={mode === 'custom' && customAgents.length === 0}
          className="px-8"
        >
          Start Consultation
        </Button>
      </div>
    </div>
  );
};

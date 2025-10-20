import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Zap, Calculator, Wrench, Shield, CheckCircle2, Clipboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Agent {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  expertise: string[];
}

const AGENTS: Agent[] = [
  {
    id: 'designer',
    name: 'Circuit Designer',
    icon: Zap,
    color: 'text-elec-yellow',
    description: 'BS 7671 compliant circuit design and cable sizing',
    expertise: ['Circuit calculations', 'Cable sizing', 'Consumer unit layouts', 'Voltage drop analysis']
  },
  {
    id: 'cost-engineer',
    name: 'Cost Engineer',
    icon: Calculator,
    color: 'text-green-400',
    description: 'Material pricing and labour cost estimates',
    expertise: ['Material pricing', 'Labour costs', 'Project estimates', 'Quote generation']
  },
  {
    id: 'installer',
    name: 'Installation Specialist',
    icon: Wrench,
    color: 'text-blue-400',
    description: 'Step-by-step installation methods and practical guidance',
    expertise: ['Installation methods', 'Practical tips', 'Tool selection', 'Best practices']
  },
  {
    id: 'health-safety',
    name: 'Health & Safety',
    icon: Shield,
    color: 'text-orange-400',
    description: 'Risk assessments, method statements, safety procedures',
    expertise: ['Risk assessments', 'RAMS documents', 'PPE requirements', 'Safety procedures']
  },
  {
    id: 'commissioning',
    name: 'Testing & Commissioning',
    icon: CheckCircle2,
    color: 'text-purple-400',
    description: 'Test procedures, certification, compliance verification',
    expertise: ['Testing procedures', 'EIC completion', 'Compliance checks', 'Fault diagnosis']
  },
  {
    id: 'project-manager',
    name: 'Project Manager',
    icon: Clipboard,
    color: 'text-pink-400',
    description: 'Scheduling, coordination, handover documentation',
    expertise: ['Project planning', 'Coordination', 'Documentation', 'Client communication']
  }
];

const AgentSelectorPage = () => {
  const navigate = useNavigate();

  const handleAgentSelect = (agentId: string) => {
    if (agentId === 'designer') {
      // Navigate to dedicated Circuit Designer page
      navigate('/electrician/circuit-designer', {
        state: { fromAgentSelector: true }
      });
    } else if (agentId === 'cost-engineer') {
      // Navigate to dedicated Cost Engineer page
      navigate('/electrician/cost-engineer', {
        state: { fromAgentSelector: true }
      });
    } else {
      // Navigate to AI chat with pre-selected agent
      navigate('/electrician/install-planner?mode=ai', {
        state: { preSelectedAgent: agentId }
      });
    }
  };

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 py-4 sm:py-6">
        <div className="space-y-6 animate-fade-in">
          {/* Back Button */}
          <Link to="/electrician">
            <Button variant="outline" size="sm" className="gap-2 touch-manipulation h-10">
              <ArrowLeft className="h-4 w-4" /> Back to Electrical Hub
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              AI Design Consultation
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Choose your specialist agent to begin
            </p>
          </div>

          {/* Agent Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {AGENTS.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <Card 
                  key={agent.id}
                  className="group hover:border-elec-yellow/40 transition-all duration-300 cursor-pointer"
                  onClick={() => handleAgentSelect(agent.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <IconComponent className={`h-8 w-8 ${agent.color} transition-transform group-hover:scale-110`} />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">{agent.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {agent.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Expertise:
                      </p>
                      <ul className="space-y-1">
                        {agent.expertise.map((item, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-elec-yellow mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full mt-4 touch-manipulation"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAgentSelect(agent.id);
                        }}
                      >
                        Consult {agent.name}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentSelectorPage;

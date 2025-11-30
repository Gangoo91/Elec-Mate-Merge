import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Zap, Calculator, Wrench, Shield, CheckCircle2, Clipboard, Settings, GraduationCap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Agent {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  expertise: string[];
  comingSoon?: boolean;
}

const getGradientForColor = (color: string): string => {
  const gradients: Record<string, string> = {
    'text-elec-yellow': 'from-yellow-500 to-yellow-600',
    'text-green-400': 'from-green-500 to-emerald-600',
    'text-blue-400': 'from-blue-500 to-blue-600',
    'text-orange-400': 'from-orange-500 to-red-500',
    'text-purple-400': 'from-purple-500 to-purple-600',
    'text-pink-400': 'from-pink-500 to-rose-500',
    'text-cyan-400': 'from-cyan-500 to-teal-500',
    'text-indigo-400': 'from-indigo-500 to-indigo-600',
  };
  return gradients[color] || 'from-gray-500 to-gray-600';
};

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
    id: 'commissioning',
    name: 'Testing & Commissioning',
    icon: CheckCircle2,
    color: 'text-purple-400',
    description: 'Test procedures, certification, compliance verification',
    expertise: ['Testing procedures', 'EIC completion', 'Compliance checks', 'Fault diagnosis']
  },
  {
    id: 'maintenance',
    name: 'Maintenance Specialist',
    icon: Settings,
    color: 'text-cyan-400',
    description: 'Periodic inspections, preventive maintenance & fault diagnosis',
    expertise: ['Periodic inspections', 'Preventive maintenance', 'Fault diagnosis', 'Equipment servicing']
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
    id: 'project-manager',
    name: 'Project Manager',
    icon: Clipboard,
    color: 'text-pink-400',
    description: 'Scheduling, coordination, handover documentation',
    expertise: ['Project planning', 'Coordination', 'Documentation', 'Client communication'],
    comingSoon: true
  },
  {
    id: 'tutor',
    name: 'Training Tutor',
    icon: GraduationCap,
    color: 'text-indigo-400',
    description: 'Educational guidance, exam prep & concept explanations',
    expertise: ['Level 3 guidance', 'Concept explanations', 'Exam preparation', 'Practice questions'],
    comingSoon: true
  }
];

const AgentSelectorPage = () => {
  const navigate = useNavigate();

  const handleAgentSelect = (agentId: string, comingSoon?: boolean) => {
    if (comingSoon) return;
    
    const routes: Record<string, string> = {
      'designer': '/electrician/circuit-designer',
      'cost-engineer': '/electrician/cost-engineer',
      'installer': '/electrician/installation-specialist',
      'health-safety': '/electrician/health-safety',
      'commissioning': '/electrician/commissioning',
      'project-manager': '/electrician/project-manager',
      'maintenance': '/electrician/maintenance',
      'tutor': '/electrician/tutor'
    };

    const route = routes[agentId];
    if (route) {
      navigate(route, { state: { fromAgentSelector: true } });
    } else {
      // Fallback to AI chat
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {AGENTS.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <Card 
                  key={agent.id}
                  className={`
                    group relative overflow-hidden
                    border-2 border-elec-yellow/10 
                    hover:border-elec-yellow/40 
                    hover:shadow-2xl hover:scale-[1.02]
                    transition-all duration-300 
                    ${agent.comingSoon ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  onClick={() => handleAgentSelect(agent.id, agent.comingSoon)}
                >
                  {/* Coming Soon Badge */}
                  {agent.comingSoon && (
                    <div className="absolute top-3 right-3 z-10">
                      <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs font-semibold">
                        Coming Soon
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-3 space-y-2 sm:space-y-4 p-4 sm:p-6 lg:p-8 text-left">
                    {/* Large Gradient Icon Circle */}
                    <div className={`
                      w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full 
                      flex items-center justify-center
                      bg-gradient-to-br ${getGradientForColor(agent.color)}
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
                    </div>

                    {/* Agent Name */}
                    <CardTitle className="text-lg sm:text-xl font-bold text-left">
                      {agent.name}
                    </CardTitle>

                    {/* Description */}
                    <CardDescription className="text-sm leading-relaxed text-left text-white/90">
                      {agent.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
                    {/* Expertise List */}
                    <div className="space-y-2 text-left">
                      <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                        Expertise
                      </p>
                      <ul className="space-y-1">
                        {agent.expertise.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="text-xs text-white/80 flex items-start gap-2">
                            <span className="text-elec-yellow mt-0.5 font-bold">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hover CTA Indicator */}
                    {!agent.comingSoon && (
                      <div className="hidden sm:block mt-6 pt-4 border-t border-elec-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-sm text-elec-yellow font-medium flex items-center gap-2">
                          Click to consult
                          <ArrowRight className="h-4 w-4" />
                        </p>
                      </div>
                    )}
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

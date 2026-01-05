import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Zap, Calculator, Wrench, Shield, CheckCircle2, Clipboard, Settings, GraduationCap, Sparkles, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Agent {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  bgGradient: string;
  description: string;
  expertise: string[];
  comingSoon?: boolean;
}

const AGENTS: Agent[] = [
  {
    id: 'designer',
    name: 'Circuit Designer',
    icon: Zap,
    gradient: 'from-amber-400 to-yellow-500',
    bgGradient: 'from-amber-500/20 to-yellow-500/10',
    description: 'BS 7671 compliant circuit design and cable sizing',
    expertise: ['Circuit calculations', 'Cable sizing', 'Consumer unit layouts', 'Voltage drop analysis']
  },
  {
    id: 'cost-engineer',
    name: 'Cost Engineer',
    icon: Calculator,
    gradient: 'from-emerald-400 to-green-500',
    bgGradient: 'from-emerald-500/20 to-green-500/10',
    description: 'Full project quotes with materials, labour and timescales',
    expertise: ['Material pricing', 'Labour estimates', 'Project timescales', 'Quote generation']
  },
  {
    id: 'installer',
    name: 'Installation Specialist',
    icon: Wrench,
    gradient: 'from-blue-400 to-blue-500',
    bgGradient: 'from-blue-500/20 to-blue-500/10',
    description: 'Step-by-step installation methods and practical guidance',
    expertise: ['Installation methods', 'Practical tips', 'Tool selection', 'Best practices']
  },
  {
    id: 'maintenance',
    name: 'Maintenance Specialist',
    icon: Settings,
    gradient: 'from-cyan-400 to-teal-500',
    bgGradient: 'from-cyan-500/20 to-teal-500/10',
    description: 'Periodic inspections, preventive maintenance & fault diagnosis',
    expertise: ['Periodic inspections', 'Preventive maintenance', 'Fault diagnosis', 'Equipment servicing']
  },
  {
    id: 'health-safety',
    name: 'Health & Safety',
    icon: Shield,
    gradient: 'from-orange-400 to-red-500',
    bgGradient: 'from-orange-500/20 to-red-500/10',
    description: 'Risk assessments, PPE requirements and safety procedures',
    expertise: ['Risk assessments', 'RAMS documents', 'PPE requirements', 'Emergency procedures']
  },
  {
    id: 'commissioning',
    name: 'Testing & Commissioning',
    icon: CheckCircle2,
    gradient: 'from-purple-400 to-purple-500',
    bgGradient: 'from-purple-500/20 to-purple-500/10',
    description: 'Test procedures, EICR defect coding and fault diagnosis',
    expertise: ['Testing procedures', 'EICR photo analysis', 'Defect coding (C1-C3)', 'Fault diagnosis'],
    comingSoon: true
  },
  {
    id: 'project-manager',
    name: 'Project Manager',
    icon: Clipboard,
    gradient: 'from-pink-400 to-rose-500',
    bgGradient: 'from-pink-500/20 to-rose-500/10',
    description: 'Scheduling, coordination, handover documentation',
    expertise: ['Project planning', 'Coordination', 'Documentation', 'Client communication'],
    comingSoon: true
  },
  {
    id: 'tutor',
    name: 'Training Tutor',
    icon: GraduationCap,
    gradient: 'from-indigo-400 to-indigo-500',
    bgGradient: 'from-indigo-500/20 to-indigo-500/10',
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
      navigate('/electrician/install-planner?mode=ai', {
        state: { preSelectedAgent: agentId }
      });
    }
  };

  // Separate available and coming soon agents
  const availableAgents = AGENTS.filter(a => !a.comingSoon);
  const comingSoonAgents = AGENTS.filter(a => a.comingSoon);

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10 pb-safe">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
              <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                AI Design Consultation
              </h1>
              <p className="text-sm text-white/60">Choose your specialist agent to begin</p>
            </div>
          </div>
          <Link to="/electrician">
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4 border-white/20 text-white/70 hover:text-white hover:bg-white/10 gap-2 touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Hub
            </Button>
          </Link>
        </header>
        {/* Available Agents Section */}
        <section className="space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2.5 px-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Available Agents</h2>
            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
              {availableAgents.length} Active
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {availableAgents.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <button
                  key={agent.id}
                  onClick={() => handleAgentSelect(agent.id, agent.comingSoon)}
                  className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation w-full"
                >
                  <Card className={`relative overflow-hidden border-white/10 bg-gradient-to-br ${agent.bgGradient} backdrop-blur-sm hover:border-white/20 active:scale-[0.98] transition-all duration-200 h-full group`}>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <CardHeader className="relative p-4 sm:p-5 space-y-3">
                      {/* Icon with gradient background */}
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${agent.gradient} shadow-lg group-active:scale-95 transition-transform`}>
                        <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                      </div>

                      {/* Agent Name */}
                      <CardTitle className="text-base sm:text-lg font-bold text-white">
                        {agent.name}
                      </CardTitle>

                      {/* Description */}
                      <p className="text-sm text-white/70 leading-relaxed">
                        {agent.description}
                      </p>
                    </CardHeader>

                    <CardContent className="relative pt-0 px-4 sm:px-5 pb-4 sm:pb-5">
                      {/* Expertise Tags - Horizontal scroll on mobile */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                        {agent.expertise.slice(0, 3).map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-[10px] sm:text-xs bg-white/10 text-white/80 rounded-md border border-white/10"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* CTA - Always visible */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <span className="text-sm font-medium text-elec-yellow">
                          Start Consultation
                        </span>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 group-hover:bg-elec-yellow/20 group-active:bg-elec-yellow/30 transition-colors">
                          <ArrowRight className="h-4 w-4 text-elec-yellow group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </button>
              );
            })}
          </div>
        </section>

        {/* Coming Soon Agents Section */}
        <section className="space-y-4 sm:space-y-5">
          <div className="flex items-center gap-2.5 px-1">
            <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <h2 className="text-lg sm:text-xl font-bold text-white/60">Coming Soon</h2>
            <Badge variant="secondary" className="bg-white/10 text-white/50 border-white/20 text-xs">
              {comingSoonAgents.length} Planned
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {comingSoonAgents.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <Card
                  key={agent.id}
                  className="relative overflow-hidden border-white/5 bg-white/5 backdrop-blur-sm opacity-60 h-full"
                >
                  {/* Coming Soon Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <Badge variant="secondary" className="bg-white/10 text-white/60 border-white/20 text-xs font-medium">
                      Coming Soon
                    </Badge>
                  </div>

                  <CardHeader className="p-4 sm:p-5 space-y-3">
                    {/* Icon with muted gradient */}
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${agent.gradient} opacity-50`}>
                      <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>

                    {/* Agent Name */}
                    <CardTitle className="text-base sm:text-lg font-bold text-white/60">
                      {agent.name}
                    </CardTitle>

                    {/* Description */}
                    <p className="text-sm text-white/40 leading-relaxed">
                      {agent.description}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-0 px-4 sm:px-5 pb-4 sm:pb-5">
                    {/* Expertise Tags - Muted */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {agent.expertise.slice(0, 3).map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-[10px] sm:text-xs bg-white/5 text-white/40 rounded-md border border-white/5"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AgentSelectorPage;

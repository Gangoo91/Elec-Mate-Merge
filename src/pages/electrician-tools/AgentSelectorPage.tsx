import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Zap, Calculator, Wrench, Shield, CheckCircle2, Clipboard, Settings, GraduationCap, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Animation variants - Smooth, fast entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

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
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10 ">
        <div className="px-4 py-2">
          <button
            onClick={() => navigate('/electrician')}
            className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Electrician Hub</span>
          </button>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 py-4 space-y-6"
      >
        {/* Hero Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
            <Sparkles className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Design Consultation</h1>
            <p className="text-sm text-white/50">Choose your specialist agent</p>
          </div>
        </motion.div>
        {/* Build Partners Section */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
            <h2 className="text-base font-bold text-white">Build Partners</h2>
            <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs">
              {availableAgents.length} Active
            </Badge>
          </div>

          <motion.div variants={containerVariants} className="space-y-2">
            {availableAgents.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <motion.button
                  key={agent.id}
                  variants={itemVariants}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAgentSelect(agent.id, agent.comingSoon)}
                  className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
                >
                  <div className="relative overflow-hidden bg-white/[0.03] border border-white/[0.08] rounded-2xl group active:bg-white/[0.06] transition-colors">
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        {/* Icon with gradient background */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${agent.gradient}`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Agent Name */}
                          <h3 className="text-[15px] font-bold text-white">
                            {agent.name}
                          </h3>
                          {/* Description */}
                          <p className="text-[13px] text-white/70 line-clamp-1">
                            {agent.description}
                          </p>
                        </div>

                        {/* Arrow indicator */}
                        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/[0.08] flex items-center justify-center group-active:bg-white/[0.12] transition-colors">
                          <ArrowRight className="h-4 w-4 text-white/70" />
                        </div>
                      </div>

                      {/* Expertise Tags - horizontal scroll */}
                      <div className="flex gap-1.5 mt-3 overflow-x-auto scrollbar-hide -mx-1 px-1">
                        {agent.expertise.map((item, idx) => (
                          <span
                            key={idx}
                            className="flex-shrink-0 px-2.5 py-1 text-[11px] bg-white/[0.05] text-white/80 rounded-lg border border-white/[0.08]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.section>

        {/* Coming Soon Section */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
            <h2 className="text-base font-bold text-white/50">Coming Soon</h2>
            <Badge variant="secondary" className="bg-white/10 text-white/40 border-white/10 text-xs">
              {comingSoonAgents.length} Planned
            </Badge>
          </div>

          <div className="space-y-2">
            {comingSoonAgents.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <div
                  key={agent.id}
                  className="relative overflow-hidden bg-white/[0.02] border border-white/[0.05] rounded-2xl opacity-60"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-3">
                      {/* Icon with muted gradient */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${agent.gradient} opacity-50`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Agent Name with Badge */}
                        <div className="flex items-center gap-2">
                          <h3 className="text-[15px] font-bold text-white/60">
                            {agent.name}
                          </h3>
                          <Badge variant="secondary" className="bg-white/10 text-white/40 border-white/10 text-[10px]">
                            Soon
                          </Badge>
                        </div>
                        {/* Description */}
                        <p className="text-[13px] text-white/40 line-clamp-1">
                          {agent.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default AgentSelectorPage;

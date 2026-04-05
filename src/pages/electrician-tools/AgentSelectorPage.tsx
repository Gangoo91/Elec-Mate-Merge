import { ArrowLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SavedResultsCard } from '@/components/electrician-tools/saved-results';
import { useSavedAgentResults } from '@/hooks/useSavedAgentResults';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

interface Agent {
  id: string;
  name: string;
  description: string;
  expertise: string[];
  gradient: string;
  textColour: string;
  pillBg: string;
  glowColour: string;
}

const AGENTS: Agent[] = [
  {
    id: 'designer',
    name: 'Circuit Designer',
    description: 'BS 7671 compliant circuit design and cable sizing',
    expertise: ['Circuit calculations', 'Cable sizing', 'CU layouts', 'Voltage drop'],
    gradient: 'from-blue-500 via-blue-400 to-cyan-400',
    textColour: 'text-blue-400',
    pillBg: 'bg-blue-500/10',
    glowColour: 'rgba(96,165,250,0.2)',
  },
  {
    id: 'cost-engineer',
    name: 'Cost Engineer',
    description: 'Full project quotes with materials, labour and timescales',
    expertise: ['Material pricing', 'Labour estimates', 'Timescales', 'Quotes'],
    gradient: 'from-elec-yellow via-amber-400 to-elec-yellow',
    textColour: 'text-elec-yellow',
    pillBg: 'bg-elec-yellow/10',
    glowColour: 'rgba(250,204,21,0.2)',
  },
  {
    id: 'installer',
    name: 'Installation Specialist',
    description: 'Step-by-step installation methods and practical guidance',
    expertise: ['Methods', 'Practical tips', 'Tool selection', 'Best practices'],
    gradient: 'from-blue-400 via-blue-300 to-cyan-300',
    textColour: 'text-blue-300',
    pillBg: 'bg-blue-400/10',
    glowColour: 'rgba(147,197,253,0.2)',
  },
  {
    id: 'maintenance',
    name: 'Maintenance Specialist',
    description: 'Periodic inspections, preventive maintenance & fault diagnosis',
    expertise: ['Inspections', 'Fault diagnosis', 'Servicing', 'Preventive'],
    gradient: 'from-emerald-500 via-teal-400 to-emerald-500',
    textColour: 'text-emerald-400',
    pillBg: 'bg-emerald-500/10',
    glowColour: 'rgba(52,211,153,0.2)',
  },
  {
    id: 'health-safety',
    name: 'Health & Safety',
    description: 'Risk assessments, PPE requirements and safety procedures',
    expertise: ['RAMS', 'Risk assessments', 'PPE', 'Emergency procedures'],
    gradient: 'from-orange-500 via-amber-400 to-red-500',
    textColour: 'text-orange-400',
    pillBg: 'bg-orange-500/10',
    glowColour: 'rgba(251,146,60,0.2)',
  },
];

const AgentSelectorPage = () => {
  const navigate = useNavigate();
  const { totalCount } = useSavedAgentResults();

  const handleAgentSelect = (agentId: string) => {
    const routes: Record<string, string> = {
      designer: '/electrician/circuit-designer',
      'cost-engineer': '/electrician/cost-engineer',
      installer: '/electrician/installation-specialist',
      'health-safety': '/electrician/health-safety',
      commissioning: '/electrician/commissioning',
      'project-manager': '/electrician/project-manager',
      maintenance: '/electrician/maintenance',
      tutor: '/electrician/tutor',
    };

    const route = routes[agentId];
    if (route) {
      navigate(route, { state: { fromAgentSelector: true } });
    } else {
      navigate('/electrician/install-planner?mode=ai', {
        state: { preSelectedAgent: agentId },
      });
    }
  };

  return (
    <div className="bg-background min-h-screen pb-8">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="px-4 py-2 max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/electrician')}
            className="flex items-center gap-2 text-white active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
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
        className="px-4 py-5 space-y-6 max-w-3xl mx-auto"
      >
        {/* Hero */}
        <motion.div variants={itemVariants}>
          <div className="relative overflow-hidden glass-premium rounded-2xl glow-yellow">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-elec-yellow/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 p-6 text-center">
              <h1 className="text-2xl font-bold text-white tracking-tight mb-1">
                <span className="text-elec-yellow">AI</span> Design Consultation
              </h1>
              <p className="text-sm text-white">Your specialist team, always on call</p>
              {totalCount > 0 && (
                <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-white/[0.04] ring-1 ring-white/[0.06]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                  </span>
                  <span className="text-[11px] text-white">{totalCount} consultations completed</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Saved Results */}
        <motion.div variants={itemVariants}>
          <SavedResultsCard />
        </motion.div>

        {/* AI Team */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Your AI Team
          </h2>

          <motion.div variants={containerVariants} className="space-y-3">
            {AGENTS.map((agent) => (
              <motion.button
                key={agent.id}
                variants={itemVariants}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAgentSelect(agent.id)}
                className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation group"
              >
                <div
                  className="relative glass-premium rounded-2xl overflow-hidden transition-all duration-200 group-hover:border-white/20"
                  style={{ '--glow': agent.glowColour } as React.CSSProperties}
                >
                  {/* Coloured accent line */}
                  <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-50 group-hover:opacity-80 transition-opacity', agent.gradient)} />

                  <div className="flex items-center gap-4 p-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-semibold text-white tracking-tight mb-1">
                        {agent.name}
                      </h3>
                      <p className="text-[13px] text-white leading-relaxed mb-2.5">
                        {agent.description}
                      </p>
                      {/* Expertise tags — text only, no icons */}
                      <div className="flex flex-wrap gap-1.5">
                        {agent.expertise.map((tag) => (
                          <span
                            key={tag}
                            className={cn(
                              'text-[10px] font-medium px-2 py-0.5 rounded-md',
                              agent.pillBg,
                              agent.textColour
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.05] border border-white/[0.08] group-hover:bg-white/[0.10] transition-all">
                      <ChevronRight className="h-4 w-4 text-white group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default AgentSelectorPage;

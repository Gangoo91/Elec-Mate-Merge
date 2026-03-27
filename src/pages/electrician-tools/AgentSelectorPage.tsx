 
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Calculator,
  Wrench,
  Shield,
  Settings,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SavedResultsCard } from '@/components/electrician-tools/saved-results';
import { useSavedAgentResults } from '@/hooks/useSavedAgentResults';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

interface Agent {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  expertise: string[];
  colour: string; // Tailwind colour name (without prefix)
}

const AGENTS: Agent[] = [
  {
    id: 'designer',
    name: 'Circuit Designer',
    icon: Zap,
    description: 'BS 7671 compliant circuit design and cable sizing',
    expertise: ['Circuit calculations', 'Cable sizing', 'CU layouts', 'Voltage drop'],
    colour: 'blue-500',
  },
  {
    id: 'cost-engineer',
    name: 'Cost Engineer',
    icon: Calculator,
    description: 'Full project quotes with materials, labour and timescales',
    expertise: ['Material pricing', 'Labour estimates', 'Timescales', 'Quotes'],
    colour: 'green-500',
  },
  {
    id: 'installer',
    name: 'Installation Specialist',
    icon: Wrench,
    description: 'Step-by-step installation methods and practical guidance',
    expertise: ['Methods', 'Practical tips', 'Tool selection', 'Best practices'],
    colour: 'orange-500',
  },
  {
    id: 'maintenance',
    name: 'Maintenance Specialist',
    icon: Settings,
    description: 'Periodic inspections, preventive maintenance & fault diagnosis',
    expertise: ['Inspections', 'Fault diagnosis', 'Servicing', 'Preventive'],
    colour: 'slate-400',
  },
  {
    id: 'health-safety',
    name: 'Health & Safety',
    icon: Shield,
    description: 'Risk assessments, PPE requirements and safety procedures',
    expertise: ['RAMS', 'Risk assessments', 'PPE', 'Emergency procedures'],
    colour: 'red-500',
  },
];

// Map colour names to Tailwind classes (can't use dynamic class names)
const COLOUR_CLASSES: Record<
  string,
  { bg: string; bgLight: string; text: string; border: string; ring: string }
> = {
  'blue-500': {
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
    ring: 'ring-blue-500/15',
  },
  'green-500': {
    bg: 'bg-green-500',
    bgLight: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/20',
    ring: 'ring-green-500/15',
  },
  'orange-500': {
    bg: 'bg-orange-500',
    bgLight: 'bg-orange-500/10',
    text: 'text-orange-400',
    border: 'border-orange-500/20',
    ring: 'ring-orange-500/15',
  },
  'slate-400': {
    bg: 'bg-slate-400',
    bgLight: 'bg-slate-400/10',
    text: 'text-slate-300',
    border: 'border-slate-400/20',
    ring: 'ring-slate-400/15',
  },
  'red-500': {
    bg: 'bg-red-500',
    bgLight: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/20',
    ring: 'ring-red-500/15',
  },
};

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
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
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
        className="px-4 py-5 space-y-6"
      >
        {/* Hero */}
        <motion.div variants={itemVariants} className="text-center py-4">
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-2xl bg-elec-yellow/10 ring-2 ring-elec-yellow/20 flex items-center justify-center mx-auto mb-4"
          >
            <Sparkles className="h-8 w-8 text-elec-yellow" />
          </motion.div>
          <h1 className="text-[24px] font-bold text-white tracking-tight mb-1">
            <span className="text-elec-yellow">AI</span> Design Consultation
          </h1>
          <p className="text-[13px] text-white">Your specialist team, always on call</p>
          {totalCount > 0 && (
            <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-white/[0.04] ring-1 ring-white/[0.06]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              <span className="text-[11px] text-white">{totalCount} consultations completed</span>
            </div>
          )}
        </motion.div>

        {/* Saved Results */}
        <motion.div variants={itemVariants}>
          <SavedResultsCard />
        </motion.div>

        {/* AI Team */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-2.5">
            <h2 className="text-[15px] font-bold text-white">Your AI Team</h2>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-500/10 text-green-400 ring-1 ring-green-500/15">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              {AGENTS.length} ready
            </span>
          </div>

          <motion.div variants={containerVariants} className="space-y-2.5">
            {AGENTS.map((agent) => {
              const IconComponent = agent.icon;
              const c = COLOUR_CLASSES[agent.colour];

              return (
                <motion.button
                  key={agent.id}
                  variants={itemVariants}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAgentSelect(agent.id)}
                  className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-xl touch-manipulation"
                >
                  <div
                    className={cn(
                      'rounded-xl overflow-hidden',
                      'bg-white/[0.10] ring-1 ring-white/[0.15]',
                      'active:bg-white/[0.18]',
                      'transition-all duration-150',
                      'group'
                    )}
                  >
                    <div className="flex items-center gap-3.5 p-4">
                      {/* Coloured accent bar */}
                      <div
                        className={cn('w-1 self-stretch rounded-full -ml-1', c.bg, 'opacity-60')}
                      />

                      {/* Icon with agent colour */}
                      <div
                        className={cn(
                          'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ring-1',
                          c.bgLight,
                          c.ring,
                          'group-active:ring-2 transition-all'
                        )}
                      >
                        <IconComponent className={cn('h-5.5 w-5.5', c.text)} />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-semibold text-white tracking-tight mb-1">
                          {agent.name}
                        </h3>
                        <p className="text-[12px] text-white leading-relaxed line-clamp-1">
                          {agent.description}
                        </p>
                        {/* Expertise tags */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {agent.expertise.map((tag) => (
                            <span
                              key={tag}
                              className={cn(
                                'text-[10px] font-medium px-1.5 py-0.5 rounded',
                                c.bgLight,
                                c.text
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div
                        className={cn(
                          'flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center',
                          c.bgLight,
                          'ring-1',
                          c.ring,
                          'group-active:ring-2 transition-all'
                        )}
                      >
                        <ArrowRight className={cn('h-4 w-4', c.text)} />
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default AgentSelectorPage;

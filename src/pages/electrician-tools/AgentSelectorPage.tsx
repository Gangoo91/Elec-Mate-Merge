import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Calculator,
  Wrench,
  Shield,
  CheckCircle2,
  Clipboard,
  Settings,
  GraduationCap,
  Sparkles,
  Lock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SavedResultsCard } from '@/components/electrician-tools/saved-results';
import { cn } from '@/lib/utils';

// Animation variants — fast, snappy entrance
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
  description: string;
  expertise: string[];
  comingSoon?: boolean;
}

const AGENTS: Agent[] = [
  {
    id: 'designer',
    name: 'Circuit Designer',
    icon: Zap,
    description: 'BS 7671 compliant circuit design and cable sizing',
    expertise: [
      'Circuit calculations',
      'Cable sizing',
      'Consumer unit layouts',
      'Voltage drop analysis',
    ],
  },
  {
    id: 'cost-engineer',
    name: 'Cost Engineer',
    icon: Calculator,
    description: 'Full project quotes with materials, labour and timescales',
    expertise: ['Material pricing', 'Labour estimates', 'Project timescales', 'Quote generation'],
  },
  {
    id: 'installer',
    name: 'Installation Specialist',
    icon: Wrench,
    description: 'Step-by-step installation methods and practical guidance',
    expertise: ['Installation methods', 'Practical tips', 'Tool selection', 'Best practices'],
  },
  {
    id: 'maintenance',
    name: 'Maintenance Specialist',
    icon: Settings,
    description: 'Periodic inspections, preventive maintenance & fault diagnosis',
    expertise: [
      'Periodic inspections',
      'Preventive maintenance',
      'Fault diagnosis',
      'Equipment servicing',
    ],
  },
  {
    id: 'health-safety',
    name: 'Health & Safety',
    icon: Shield,
    description: 'Risk assessments, PPE requirements and safety procedures',
    expertise: ['Risk assessments', 'RAMS documents', 'PPE requirements', 'Emergency procedures'],
  },
  {
    id: 'commissioning',
    name: 'Testing & Commissioning',
    icon: CheckCircle2,
    description: 'Test procedures, EICR defect coding and fault diagnosis',
    expertise: [
      'Testing procedures',
      'EICR photo analysis',
      'Defect coding (C1-C3)',
      'Fault diagnosis',
    ],
    comingSoon: true,
  },
  {
    id: 'project-manager',
    name: 'Project Manager',
    icon: Clipboard,
    description: 'Scheduling, coordination, handover documentation',
    expertise: ['Project planning', 'Coordination', 'Documentation', 'Client communication'],
    comingSoon: true,
  },
  {
    id: 'tutor',
    name: 'Training Tutor',
    icon: GraduationCap,
    description: 'Educational guidance, exam prep & concept explanations',
    expertise: [
      'Level 3 guidance',
      'Concept explanations',
      'Exam preparation',
      'Practice questions',
    ],
    comingSoon: true,
  },
];

const AgentSelectorPage = () => {
  const navigate = useNavigate();

  const handleAgentSelect = (agentId: string, comingSoon?: boolean) => {
    if (comingSoon) return;

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

  const availableAgents = AGENTS.filter((a) => !a.comingSoon);
  const comingSoonAgents = AGENTS.filter((a) => a.comingSoon);

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
        className="px-4 py-4 space-y-6"
      >
        {/* Hero Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
            <Sparkles className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Design Consultation</h1>
            <p className="text-sm text-white">Choose your specialist agent</p>
          </div>
        </motion.div>

        {/* Saved Results Card */}
        <motion.div variants={itemVariants}>
          <SavedResultsCard />
        </motion.div>

        {/* Build Partners Section */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
            <h2 className="text-base font-bold text-white">Build Partners</h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20">
              {availableAgents.length} Active
            </span>
          </div>

          <motion.div variants={containerVariants} className="space-y-3">
            {availableAgents.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <motion.button
                  key={agent.id}
                  variants={itemVariants}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAgentSelect(agent.id, agent.comingSoon)}
                  className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-xl touch-manipulation"
                >
                  <div
                    className={cn(
                      'rounded-xl p-4',
                      'bg-white/[0.04] border border-white/[0.06]',
                      'active:bg-white/[0.08]',
                      'transition-colors duration-150',
                      'group'
                    )}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center group-active:bg-elec-yellow/20 transition-colors">
                        <IconComponent className="h-5 w-5 text-elec-yellow" />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-semibold text-white tracking-tight">
                          {agent.name}
                        </h3>
                        <p className="text-[13px] text-white line-clamp-1 mt-0.5">
                          {agent.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/[0.04] flex items-center justify-center border border-white/[0.06] group-active:bg-white/[0.08] transition-colors">
                        <ArrowRight className="h-4 w-4 text-white group-active:text-elec-yellow transition-colors" />
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
            <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <h2 className="text-base font-bold text-white">Coming Soon</h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.06] text-white border border-white/[0.08]">
              {comingSoonAgents.length} Planned
            </span>
          </div>

          <div className="space-y-3">
            {comingSoonAgents.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <div
                  key={agent.id}
                  className={cn(
                    'rounded-xl p-4 opacity-40',
                    'bg-white/[0.04] border border-white/[0.06]'
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Icon — muted */}
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[15px] font-semibold text-white tracking-tight">
                          {agent.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.06] text-white border border-white/[0.08]">
                          <Lock className="h-2.5 w-2.5" />
                          Soon
                        </span>
                      </div>
                      <p className="text-[13px] text-white line-clamp-1 mt-0.5">
                        {agent.description}
                      </p>
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

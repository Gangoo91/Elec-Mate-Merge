import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Bot, Calculator, Paintbrush, ClipboardCheck, Wrench, Zap, BookOpen, Mic } from 'lucide-react';
import { AIAgentCard } from './AIAgentCard';

const agents = [
  {
    name: 'Voice Quotes & Invoices',
    description: 'Talk to it, send professional quotes and invoices in 2 minutes.',
    icon: Mic,
    gradient: 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10',
    iconBg: 'bg-emerald-500',
  },
  {
    name: 'Cost Engineer',
    description: 'Accurate estimates using current UK material prices and labour rates.',
    icon: Calculator,
    gradient: 'bg-gradient-to-br from-blue-500/20 to-blue-600/10',
    iconBg: 'bg-blue-500',
  },
  {
    name: 'Designer',
    description: 'Circuit design assistance with load calculations and cable sizing.',
    icon: Paintbrush,
    gradient: 'bg-gradient-to-br from-purple-500/20 to-purple-600/10',
    iconBg: 'bg-purple-500',
  },
  {
    name: 'Inspector',
    description: 'Inspection guidance and BS7671 compliance checking.',
    icon: ClipboardCheck,
    gradient: 'bg-gradient-to-br from-green-500/20 to-green-600/10',
    iconBg: 'bg-green-500',
  },
  {
    name: 'Maintenance Pro',
    description: 'Fault diagnosis and maintenance scheduling assistance.',
    icon: Wrench,
    gradient: 'bg-gradient-to-br from-orange-500/20 to-orange-600/10',
    iconBg: 'bg-orange-500',
  },
  {
    name: 'Regulations Guide',
    description: '18th Edition BS7671 guidance and interpretation.',
    icon: Zap,
    gradient: 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/10',
    iconBg: 'bg-yellow-500',
  },
  {
    name: 'Study Coach',
    description: 'Exam preparation and learning path recommendations.',
    icon: BookOpen,
    gradient: 'bg-gradient-to-br from-pink-500/20 to-pink-600/10',
    iconBg: 'bg-pink-500',
  },
  {
    name: 'General Assistant',
    description: 'Your all-round electrical knowledge companion.',
    icon: Bot,
    gradient: 'bg-gradient-to-br from-indigo-500/20 to-indigo-600/10',
    iconBg: 'bg-indigo-500',
  },
];

export const AIAgentsCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="w-full py-16 sm:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 mb-4">
            <Bot className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-400">AI-Powered</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            8 Specialist AI Agents
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Purpose-built AI assistants trained on UK electrical regulations, ready to help with any task.
          </p>
        </motion.div>

        {/* Mobile: Horizontal scroll */}
        <div className="sm:hidden -mx-6 px-6">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {agents.map((agent) => (
              <div key={agent.name} className="snap-start">
                <AIAgentCard {...agent} />
              </div>
            ))}
          </div>
          {/* Scroll hint */}
          <p className="text-center text-white/40 text-xs mt-2">Swipe to see more</p>
        </div>

        {/* Desktop: Grid */}
        <motion.div
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {agents.map((agent) => (
            <AIAgentCard key={agent.name} {...agent} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

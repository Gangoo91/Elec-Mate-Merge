import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Bot, Calculator, Paintbrush, ClipboardCheck, Wrench, Zap, BookOpen, Mic } from 'lucide-react';
import { AIAgentCard } from './AIAgentCard';

const agents = [
  {
    name: 'Voice Quotes',
    description: 'Talk to it, send professional quotes and invoices in 2 minutes.',
    icon: Mic,
    gradient: 'bg-gradient-to-br from-emerald-500/15 to-emerald-600/5',
    iconBg: 'bg-emerald-500',
  },
  {
    name: 'Cost Engineer',
    description: 'Accurate estimates using current UK material prices and labour rates.',
    icon: Calculator,
    gradient: 'bg-gradient-to-br from-blue-500/15 to-blue-600/5',
    iconBg: 'bg-blue-500',
  },
  {
    name: 'Designer',
    description: 'Circuit design assistance with load calculations and cable sizing.',
    icon: Paintbrush,
    gradient: 'bg-gradient-to-br from-purple-500/15 to-purple-600/5',
    iconBg: 'bg-purple-500',
  },
  {
    name: 'Inspector',
    description: 'Inspection guidance and BS7671 compliance checking.',
    icon: ClipboardCheck,
    gradient: 'bg-gradient-to-br from-green-500/15 to-green-600/5',
    iconBg: 'bg-green-500',
  },
  {
    name: 'Maintenance',
    description: 'Fault diagnosis and maintenance scheduling assistance.',
    icon: Wrench,
    gradient: 'bg-gradient-to-br from-orange-500/15 to-orange-600/5',
    iconBg: 'bg-orange-500',
  },
  {
    name: 'Regulations',
    description: '18th Edition BS7671 guidance and interpretation.',
    icon: Zap,
    gradient: 'bg-gradient-to-br from-yellow-500/15 to-yellow-600/5',
    iconBg: 'bg-yellow-500',
  },
  {
    name: 'Study Coach',
    description: 'Exam preparation and learning path recommendations.',
    icon: BookOpen,
    gradient: 'bg-gradient-to-br from-pink-500/15 to-pink-600/5',
    iconBg: 'bg-pink-500',
  },
  {
    name: 'Assistant',
    description: 'Your all-round electrical knowledge companion.',
    icon: Bot,
    gradient: 'bg-gradient-to-br from-indigo-500/15 to-indigo-600/5',
    iconBg: 'bg-indigo-500',
  },
];

export const AIAgentsCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="w-full py-12 sm:py-20 bg-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/20 mb-4">
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-medium text-indigo-400">AI-Powered</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            8 Specialist AI Agents
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-sm sm:text-base">
            Purpose-built AI assistants trained on UK electrical regulations.
          </p>
        </motion.div>

        {/* Mobile: Horizontal scroll */}
        <div className="sm:hidden -mx-5 px-5">
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
            {agents.map((agent) => (
              <div key={agent.name} className="snap-start">
                <AIAgentCard {...agent} />
              </div>
            ))}
          </div>
          <p className="text-center text-white/30 text-[10px] mt-3 uppercase tracking-wider">Swipe for more</p>
        </div>

        {/* Desktop: Grid */}
        <motion.div
          className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {agents.map((agent) => (
            <AIAgentCard key={agent.name} {...agent} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

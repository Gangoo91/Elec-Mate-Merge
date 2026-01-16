import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Wrench, Building2, BookOpen } from 'lucide-react';
import { HubCard } from './HubCard';

const hubs = [
  {
    title: 'Apprentice Hub',
    description: 'Structured learning paths, progress tracking, and exam preparation for your training.',
    icon: GraduationCap,
    features: ['Level 2 & 3', 'Progress Tracking', 'AM2 Prep'],
    href: '/apprentice',
    gradient: 'bg-gradient-to-br from-blue-500/15 to-blue-600/5',
    iconColor: 'text-blue-400',
  },
  {
    title: 'Electrician Hub',
    description: 'AI-powered tools, certificates, and calculators for professional electrical work.',
    icon: Wrench,
    features: ['AI Agents', 'Certificates', 'Calculators'],
    href: '/electrician',
    gradient: 'bg-gradient-to-br from-yellow-500/15 to-amber-600/5',
    iconColor: 'text-yellow-400',
  },
  {
    title: 'Study Centre',
    description: 'Master BS7671 with thousands of practice questions and adaptive learning.',
    icon: BookOpen,
    features: ['6,800+ Questions', 'Adaptive Learning', 'Exam Mode'],
    href: '/study-centre',
    gradient: 'bg-gradient-to-br from-green-500/15 to-emerald-600/5',
    iconColor: 'text-green-400',
  },
  {
    title: 'Employer Hub',
    description: 'Manage your team, track jobs, and monitor apprentice progress from one place.',
    icon: Building2,
    features: ['Team Management', 'Job Tracking', 'Analytics'],
    href: '/employer',
    gradient: 'bg-gradient-to-br from-purple-500/15 to-purple-600/5',
    iconColor: 'text-purple-400',
    comingSoon: true,
  },
];

export const HubsGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="w-full py-12 sm:py-20 bg-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Four Hubs, One Platform
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-sm sm:text-base">
            Whether you're training, working on-site, or managing a team — we've got you covered.
          </p>
        </motion.div>

        {/* Grid - 2 columns on mobile */}
        <motion.div
          className="grid grid-cols-2 gap-3 sm:gap-5"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {hubs.map((hub, index) => (
            <motion.div
              key={hub.title}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              <HubCard {...hub} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

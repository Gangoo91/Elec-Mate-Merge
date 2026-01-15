import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Wrench, Building2, BookOpen } from 'lucide-react';
import { HubCard } from './HubCard';

const hubs = [
  {
    title: 'Apprentice Hub',
    description: 'Complete your training with structured learning paths, progress tracking, and exam preparation.',
    icon: GraduationCap,
    features: ['Level 2 & 3 Courses', 'Progress Tracking', 'AM2 Prep'],
    href: '/apprentice',
    gradient: 'bg-gradient-to-br from-blue-500/20 to-blue-600/10',
    iconColor: 'text-blue-400',
  },
  {
    title: 'Electrician Hub',
    description: 'Professional tools, certificates, and AI assistants for daily electrical work.',
    icon: Wrench,
    features: ['AI Agents', 'Certificates', 'Calculations'],
    href: '/electrician',
    gradient: 'bg-gradient-to-br from-yellow-500/20 to-amber-600/10',
    iconColor: 'text-yellow-400',
  },
  {
    title: 'Study Centre',
    description: 'Master BS7671 with thousands of practice questions and adaptive learning.',
    icon: BookOpen,
    features: ['6,800+ Questions', 'Adaptive Learning', 'Exam Mode'],
    href: '/study-centre',
    gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-600/10',
    iconColor: 'text-green-400',
  },
  {
    title: 'Employer Hub',
    description: 'Manage your team, track jobs, and monitor apprentice progress from one dashboard.',
    icon: Building2,
    features: ['Team Management', 'Job Tracking', 'Analytics'],
    href: '/employer',
    gradient: 'bg-gradient-to-br from-purple-500/20 to-purple-600/10',
    iconColor: 'text-purple-400',
    comingSoon: true,
  },
];

export const HubsGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="w-full py-16 sm:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Four Hubs, One Platform
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Whether you're training, working on-site, or managing a team - Elec-Mate has you covered.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid sm:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {hubs.map((hub) => (
            <HubCard key={hub.title} {...hub} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

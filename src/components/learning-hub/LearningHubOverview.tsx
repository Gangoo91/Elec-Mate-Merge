import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Zap,
  Shield,
  Wrench,
  Brain,
  ChevronRight,
  AlertTriangle,
  Gauge,
  Timer,
  CircuitBoard,
  TestTube2,
  ArrowRight,
} from 'lucide-react';
import { LearningSection } from '../LearningHub';
import { cn } from '@/lib/utils';

interface LearningHubOverviewProps {
  onNavigateToSection: (section: LearningSection) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 28 },
  },
};

const LearningHubOverview = ({ onNavigateToSection }: LearningHubOverviewProps) => {
  const navigate = useNavigate();

  const learningModules = [
    {
      id: 'testing' as LearningSection,
      title: 'Testing Procedures',
      subtitle: 'Continuity, IR, RCD & Zs testing',
      icon: Zap,
      iconBg: 'bg-amber-500',
      contentCount: '8 procedures',
    },
    {
      id: 'fault-finding' as LearningSection,
      title: 'Fault Finding',
      subtitle: 'Earth faults, shorts & open circuits',
      icon: Wrench,
      iconBg: 'bg-red-500',
      contentCount: '6 techniques',
    },
    {
      id: 'regulations' as LearningSection,
      title: 'Regulations',
      subtitle: 'BS 7671 tables & Zs values',
      icon: BookOpen,
      iconBg: 'bg-blue-500',
      contentCount: 'Full reference',
    },
    {
      id: 'quiz' as LearningSection,
      title: 'Knowledge Quiz',
      subtitle: '2391-style questions',
      icon: Brain,
      iconBg: 'bg-purple-500',
      contentCount: '300+ questions',
    },
  ];

  const testSequence = [
    { label: 'CPC', sub: 'Cont.', colour: 'bg-green-500' },
    { label: 'Ring', sub: 'R1+R2', colour: 'bg-emerald-500' },
    { label: 'Insulation', sub: 'IR', colour: 'bg-blue-500' },
    { label: 'Polarity', sub: 'Dead', colour: 'bg-cyan-500' },
    { label: 'EFLI', sub: 'Ze / Zs', colour: 'bg-amber-500' },
    { label: 'PFC', sub: 'Ipf', colour: 'bg-orange-500' },
    { label: 'RCD', sub: 'Trip', colour: 'bg-red-500' },
    { label: 'Functional', sub: 'Op.', colour: 'bg-purple-500' },
  ];

  const quickRef = [
    {
      title: 'IR Test Voltages',
      icon: Gauge,
      colour: 'text-blue-400',
      bg: 'bg-blue-500/15 border-blue-500/20',
      items: ['SELV: 250V DC', 'Up to 500V: 500V DC', '500V+: 1000V DC'],
    },
    {
      title: 'RCD Trip Times',
      icon: Timer,
      colour: 'text-red-400',
      bg: 'bg-red-500/15 border-red-500/20',
      items: ['½×IΔn: Must NOT trip', '1×IΔn: ≤300ms', '5×IΔn: ≤40ms'],
    },
    {
      title: 'Min IR Values',
      icon: TestTube2,
      colour: 'text-green-400',
      bg: 'bg-green-500/15 border-green-500/20',
      items: ['SELV/PELV: ≥0.5MΩ', 'Up to 500V: ≥1.0MΩ', 'Over 500V: ≥1.0MΩ'],
    },
    {
      title: 'Equipment',
      icon: CircuitBoard,
      colour: 'text-amber-400',
      bg: 'bg-amber-500/15 border-amber-500/20',
      items: ['Multifunction tester', 'Voltage indicator (GS38)', 'Lock-off kit & proving unit'],
    },
  ];

  const handleModuleClick = (module: (typeof learningModules)[0]) => {
    if (module.id === 'regulations') {
      navigate('/tools/regulation-search');
    } else {
      onNavigateToSection(module.id);
    }
  };

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="show">
      {/* ── Safe Isolation Banner ── */}
      <motion.div variants={itemVariants}>
        <button
          type="button"
          onClick={() => onNavigateToSection('testing')}
          className="w-full text-left touch-manipulation active:scale-[0.98] transition-transform"
        >
          <div className="rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-500/15 to-red-500/5 p-4 lg:p-5">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/20">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] lg:text-base font-semibold text-white">
                  Always Isolate Before Testing
                </p>
                <p className="text-[13px] lg:text-sm text-white mt-0.5">
                  Safe isolation is life-critical — follow GS38 procedures every time
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-white flex-shrink-0" />
            </div>
          </div>
        </button>
      </motion.div>

      {/* ── Testing Sequence ── */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wide">
            Required Test Sequence
          </h2>
        </div>

        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 lg:p-5">
          {/* Dead vs Live labels */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider bg-green-500/20 border border-green-500/30 rounded-full px-2.5 py-0.5">
              Dead Tests
            </span>
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[11px] font-bold text-white uppercase tracking-wider bg-amber-500/20 border border-amber-500/30 rounded-full px-2.5 py-0.5">
              Live Tests
            </span>
          </div>

          {/* Sequence chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
            {testSequence.map((step, i) => (
              <div key={step.label} className="flex items-center gap-1.5 flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-9 h-9 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center',
                      step.colour
                    )}
                  >
                    <span className="text-[11px] lg:text-xs font-bold text-white">{i + 1}</span>
                  </div>
                  <span className="text-[10px] lg:text-[11px] font-medium text-white mt-1 text-center leading-tight">
                    {step.label}
                  </span>
                  <span className="text-[9px] lg:text-[10px] text-white text-center leading-tight">
                    {step.sub}
                  </span>
                </div>
                {i < testSequence.length - 1 && (
                  <ArrowRight className="h-3 w-3 text-white flex-shrink-0 mt-[-12px]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Learning Modules ── */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wide">
            Learning Modules
          </h2>
        </div>

        {/* Mobile: iOS-style list */}
        <div className="lg:hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          {learningModules.map((module) => {
            const IconComponent = module.icon;

            return (
              <motion.div
                key={module.id}
                variants={itemVariants}
                onClick={() => handleModuleClick(module)}
                className="flex items-center gap-3.5 p-4 cursor-pointer touch-manipulation active:bg-white/[0.04] transition-colors"
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg',
                    module.iconBg
                  )}
                >
                  <IconComponent className="h-5.5 w-5.5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold text-white leading-tight">
                    {module.title}
                  </h3>
                  <p className="text-[13px] text-white leading-tight mt-0.5">{module.subtitle}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[11px] font-medium text-white bg-white/10 rounded-full px-2.5 py-1">
                    {module.contentCount}
                  </span>
                  <ChevronRight className="h-4 w-4 text-white" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop: Card grid */}
        <div className="hidden lg:grid grid-cols-2 gap-4">
          {learningModules.map((module) => {
            const IconComponent = module.icon;

            return (
              <motion.div
                key={module.id}
                variants={itemVariants}
                onClick={() => handleModuleClick(module)}
                className={cn(
                  'group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 cursor-pointer',
                  'hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-200'
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg',
                      module.iconBg
                    )}
                  >
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="text-lg font-semibold text-white leading-tight">
                      {module.title}
                    </h3>
                    <p className="text-sm text-white leading-relaxed mt-1">{module.subtitle}</p>
                    <span className="inline-block text-xs font-medium text-white bg-white/10 rounded-full px-3 py-1 mt-3">
                      {module.contentCount}
                    </span>
                  </div>

                  <ChevronRight className="h-5 w-5 text-white group-hover:translate-x-0.5 transition-transform flex-shrink-0 mt-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Quick Reference ── */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wide">
            Quick Reference
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickRef.map((ref) => {
            const IconComponent = ref.icon;

            return (
              <div key={ref.title} className={cn('rounded-xl border p-3.5 lg:p-4', ref.bg)}>
                <div className="flex items-center gap-2 mb-2.5">
                  <IconComponent className={cn('h-4 w-4', ref.colour)} />
                  <h3 className="text-[12px] lg:text-[13px] font-semibold text-white">
                    {ref.title}
                  </h3>
                </div>
                <ul className="space-y-1.5">
                  {ref.items.map((item) => (
                    <li
                      key={item}
                      className="text-[11px] lg:text-[12px] text-white leading-tight flex items-start gap-1.5"
                    >
                      <span className="text-white mt-[3px] flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Safety Notice ── */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <Shield className="h-4 w-4 text-elec-yellow flex-shrink-0" />
          <p className="text-[12px] lg:text-sm text-white">
            Follow safe isolation procedures before every test. Always use a proving unit (GS38
            compliant) to confirm your test instrument is working correctly.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LearningHubOverview;

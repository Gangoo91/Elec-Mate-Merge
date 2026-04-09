import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Zap,
  Wrench,
  Brain,
  ChevronRight,
} from 'lucide-react';
import { LearningSection } from '../LearningHub';
import { BusinessCard } from '@/components/business-hub';

interface LearningHubOverviewProps {
  onNavigateToSection: (section: LearningSection) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const tests = [
  { label: 'CPC', abbrev: 'Cont.' },
  { label: 'Ring', abbrev: 'R1+R2' },
  { label: 'IR', abbrev: 'Insul.' },
  { label: 'Polar.', abbrev: 'Dead' },
  { label: 'EFLI', abbrev: 'Ze/Zs' },
  { label: 'PFC', abbrev: 'Ipf' },
  { label: 'RCD', abbrev: 'Trip' },
  { label: 'Func.', abbrev: 'Op.' },
];

const LearningHubOverview = ({ onNavigateToSection }: LearningHubOverviewProps) => {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="px-4 py-4 space-y-5"
    >
      {/* Safety Banner */}
      <motion.div variants={itemVariants}>
        <button
          type="button"
          onClick={() => onNavigateToSection('testing')}
          className="w-full text-left touch-manipulation active:scale-[0.98] transition-transform"
        >
          <div className="relative rounded-2xl bg-white/[0.03] border border-red-500/20 p-4 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-red-500 via-rose-400 to-red-500 opacity-60" />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/60 rounded-l-2xl" />
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold text-red-400">Always Isolate Before Testing</p>
                <p className="text-[12px] text-white mt-1">Safe isolation is life-critical — follow GS38 procedures every time</p>
              </div>
              <ChevronRight className="h-5 w-5 text-red-400 shrink-0 ml-3" />
            </div>
          </div>
        </button>
      </motion.div>

      {/* Required Test Sequence */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Required Test Sequence
        </h2>

        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 space-y-3 overflow-hidden relative">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 opacity-40" />

          {/* Test strip with inline Dead/Live labels */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1 items-end">
            {tests.map((test, i) => {
              const isLive = i >= 4;
              return (
                <React.Fragment key={i}>
                  {i === 0 && (
                    <div className="shrink-0 mr-0.5">
                      <p className="text-[9px] font-semibold text-amber-400 uppercase tracking-wider mb-1.5">Dead</p>
                    </div>
                  )}
                  {i === 4 && (
                    <div className="shrink-0 flex flex-col items-center mx-1">
                      <p className="text-[9px] font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">Live</p>
                    </div>
                  )}
                  <div
                    className={`w-[68px] shrink-0 rounded-xl p-2 text-center border ${
                      isLive
                        ? 'bg-emerald-500/[0.06] border-emerald-500/15'
                        : 'bg-amber-500/[0.06] border-amber-500/15'
                    }`}
                  >
                    <p className={`text-base font-bold ${isLive ? 'text-emerald-400' : 'text-amber-400'}`}>{i + 1}</p>
                    <p className="text-[10px] text-white font-semibold mt-0.5 leading-tight">{test.label}</p>
                    <p className="text-[9px] text-white mt-0.5 leading-tight">{test.abbrev}</p>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Learning Modules */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Learning Modules
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="Testing"
            description="8 procedures"
            icon={Zap}
            onClick={() => onNavigateToSection('testing')}
            variant="compact"
            accentColor="from-amber-500 via-yellow-400 to-amber-400"
            iconColor="text-amber-400"
            iconBg="bg-amber-500/10 border border-amber-500/20"
          />
          <BusinessCard
            title="Fault Finding"
            description="6 techniques"
            icon={Wrench}
            onClick={() => onNavigateToSection('fault-finding')}
            variant="compact"
            accentColor="from-red-500 via-rose-400 to-red-400"
            iconColor="text-red-400"
            iconBg="bg-red-500/10 border border-red-500/20"
          />
          <BusinessCard
            title="Regulations"
            description="BS 7671 reference"
            icon={BookOpen}
            onClick={() => onNavigateToSection('regulations')}
            variant="compact"
            accentColor="from-blue-500 via-blue-400 to-cyan-400"
            iconColor="text-blue-400"
            iconBg="bg-blue-500/10 border border-blue-500/20"
          />
          <BusinessCard
            title="Quiz"
            description="300+ questions"
            icon={Brain}
            onClick={() => onNavigateToSection('quiz')}
            variant="compact"
            accentColor="from-purple-500 via-violet-400 to-purple-400"
            iconColor="text-purple-400"
            iconBg="bg-purple-500/10 border border-purple-500/20"
          />
        </div>
      </motion.section>

      {/* Quick Reference */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Quick Reference
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {/* IR Test Voltages */}
          <div className="relative rounded-2xl bg-white/[0.03] border border-blue-500/15 p-4 space-y-2.5 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/40 rounded-l-2xl" />
            <p className="text-[13px] font-bold text-blue-400">IR Test Voltages</p>
            <div className="space-y-1 text-[12px] text-white">
              <div className="flex justify-between"><span>500V</span><span className="font-semibold">≥1MΩ</span></div>
              <div className="flex justify-between"><span>250V</span><span className="font-semibold">≥0.5MΩ</span></div>
              <div className="flex justify-between"><span>1000V</span><span className="font-semibold">≥1MΩ</span></div>
            </div>
          </div>
          {/* RCD Trip Times */}
          <div className="relative rounded-2xl bg-white/[0.03] border border-red-500/15 p-4 space-y-2.5 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/40 rounded-l-2xl" />
            <p className="text-[13px] font-bold text-red-400">RCD Trip Times</p>
            <div className="space-y-1 text-[12px] text-white">
              <div className="flex justify-between"><span>30mA (1×)</span><span className="font-semibold">≤300ms</span></div>
              <div className="flex justify-between"><span>30mA (5×)</span><span className="font-semibold">≤40ms</span></div>
              <div className="flex justify-between"><span>50% rated</span><span className="font-semibold">No trip</span></div>
            </div>
          </div>
          {/* Min IR Values */}
          <div className="relative rounded-2xl bg-white/[0.03] border border-emerald-500/15 p-4 space-y-2.5 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/40 rounded-l-2xl" />
            <p className="text-[13px] font-bold text-emerald-400">Min IR Values</p>
            <div className="space-y-1 text-[12px] text-white">
              <div className="flex justify-between"><span>SELV/PELV</span><span className="font-semibold">0.25MΩ</span></div>
              <div className="flex justify-between"><span>Up to 500V</span><span className="font-semibold">0.5MΩ</span></div>
              <div className="flex justify-between"><span>Over 500V</span><span className="font-semibold">1.0MΩ</span></div>
            </div>
          </div>
          {/* Equipment */}
          <div className="relative rounded-2xl bg-white/[0.03] border border-amber-500/15 p-4 space-y-2.5 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/40 rounded-l-2xl" />
            <p className="text-[13px] font-bold text-amber-400">Equipment</p>
            <div className="space-y-1 text-[12px] text-white">
              <p>Multifunction tester</p>
              <p>Loop impedance meter</p>
              <p>GS38 proving unit</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Safety Notice */}
      <motion.div variants={itemVariants}>
        <div className="relative rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/40 rounded-l-2xl" />
          <p className="text-[12px] font-semibold text-amber-400 mb-1">Safety Reminder</p>
          <p className="text-[11px] text-white leading-relaxed">
            Follow safe isolation procedures before every test. Always use a proving unit (GS38 compliant) to confirm your test instrument is working correctly.
          </p>
        </div>
      </motion.div>
    </motion.main>
  );
};

export default LearningHubOverview;

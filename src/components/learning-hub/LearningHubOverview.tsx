import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Zap,
  Wrench,
  Brain,
  ChevronRight,
  Shield,
  AlertTriangle,
  HelpCircle,
  ClipboardList,
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
      className="px-4 py-4 space-y-6"
    >
      {/* Safety Banner — brighter, more prominent */}
      <motion.div variants={itemVariants}>
        <button
          type="button"
          onClick={() => onNavigateToSection('testing')}
          className="w-full text-left touch-manipulation active:scale-[0.98] transition-transform"
        >
          <div className="relative rounded-2xl bg-red-500/15 border border-red-500/30 p-4 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-red-500 via-rose-400 to-red-500" />
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500 rounded-l-2xl" />
            <div className="flex items-center justify-between pl-2">
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold text-white">Always Isolate Before Testing</p>
                <p className="text-[12px] text-red-200 mt-1">Safe isolation is life-critical — follow GS38 procedures every time</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-red-500/30 flex items-center justify-center shrink-0 ml-3">
                <ChevronRight className="h-5 w-5 text-red-300" />
              </div>
            </div>
          </div>
        </button>
      </motion.div>

      {/* Required Test Sequence — brighter cards */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-[11px] font-bold text-white/70 uppercase tracking-widest px-0.5">
          Required Test Sequence
        </h2>

        <div className="rounded-2xl bg-white/[0.06] border border-white/[0.12] p-4 space-y-3 overflow-hidden relative">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 opacity-60" />

          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1 items-end">
            {tests.map((test, i) => {
              const isLive = i >= 4;
              return (
                <React.Fragment key={i}>
                  {i === 0 && (
                    <div className="shrink-0 mr-0.5">
                      <p className="text-[9px] font-bold text-amber-400 uppercase tracking-widest mb-1.5">Dead</p>
                    </div>
                  )}
                  {i === 4 && (
                    <div className="shrink-0 flex flex-col items-center mx-1.5">
                      <div className="w-px h-6 bg-white/20 mb-1" />
                      <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5">Live</p>
                    </div>
                  )}
                  <div
                    className={`w-[68px] shrink-0 rounded-xl p-2.5 text-center border ${
                      isLive
                        ? 'bg-emerald-500/[0.12] border-emerald-500/25'
                        : 'bg-amber-500/[0.12] border-amber-500/25'
                    }`}
                  >
                    <p className={`text-lg font-black ${isLive ? 'text-emerald-400' : 'text-amber-400'}`}>{i + 1}</p>
                    <p className="text-[10px] text-white font-semibold mt-0.5 leading-tight">{test.label}</p>
                    <p className="text-[9px] text-white/60 mt-0.5 leading-tight">{test.abbrev}</p>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Learning Modules — hero variant for more visual weight */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-[11px] font-bold text-white/70 uppercase tracking-widest px-0.5">
          Learning Modules
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="Testing"
            description="10 test procedures"
            icon={Zap}
            onClick={() => onNavigateToSection('testing')}
            variant="hero"
          />
          <BusinessCard
            title="Fault Finding"
            description="8 diagnostic tools"
            icon={Wrench}
            onClick={() => onNavigateToSection('fault-finding')}
            variant="hero"
          />
          <BusinessCard
            title="Regulations"
            description="9 reference tools"
            icon={BookOpen}
            onClick={() => onNavigateToSection('regulations')}
            variant="hero"
          />
          <BusinessCard
            title="Quiz"
            description="460 questions"
            icon={Brain}
            onClick={() => onNavigateToSection('quiz')}
            variant="hero"
          />
        </div>
      </motion.section>

      {/* Quick Reference — brighter contrast */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-[11px] font-bold text-white/70 uppercase tracking-widest px-0.5">
          Quick Reference
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative rounded-2xl bg-white/[0.06] border border-amber-500/20 p-4 space-y-2 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/60 rounded-l-2xl" />
            <p className="text-[13px] font-bold text-amber-400">Zs 80% Limits</p>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between"><span className="text-white/80">6A Type B</span><span className="font-bold text-white">5.82Ω</span></div>
              <div className="flex justify-between"><span className="text-white/80">32A Type B</span><span className="font-bold text-yellow-400">1.09Ω</span></div>
              <div className="flex justify-between"><span className="text-white/80">40A Type B</span><span className="font-bold text-white">0.87Ω</span></div>
            </div>
          </div>
          <div className="relative rounded-2xl bg-white/[0.06] border border-red-500/20 p-4 space-y-2 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/60 rounded-l-2xl" />
            <p className="text-[13px] font-bold text-red-400">RCD 30mA</p>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between"><span className="text-white/80">0.5× (15mA)</span><span className="font-bold text-white">No trip</span></div>
              <div className="flex justify-between"><span className="text-white/80">1× (30mA)</span><span className="font-bold text-yellow-400">≤300ms</span></div>
              <div className="flex justify-between"><span className="text-white/80">5× (150mA)</span><span className="font-bold text-yellow-400">≤40ms</span></div>
            </div>
          </div>
          <div className="relative rounded-2xl bg-white/[0.06] border border-blue-500/20 p-4 space-y-2 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/60 rounded-l-2xl" />
            <p className="text-[13px] font-bold text-blue-400">IR Minimum</p>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between"><span className="text-white/80">SELV ≤50V</span><span className="font-bold text-white">0.5MΩ</span></div>
              <div className="flex justify-between"><span className="text-white/80">LV ≤500V</span><span className="font-bold text-yellow-400">1.0MΩ</span></div>
              <div className="flex justify-between"><span className="text-white/80">500-1000V</span><span className="font-bold text-white">1.0MΩ</span></div>
            </div>
          </div>
          <div className="relative rounded-2xl bg-white/[0.06] border border-emerald-500/20 p-4 space-y-2 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/60 rounded-l-2xl" />
            <p className="text-[13px] font-bold text-emerald-400">Disconnection</p>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between"><span className="text-white/80">Sockets ≤63A</span><span className="font-bold text-white">0.4s</span></div>
              <div className="flex justify-between"><span className="text-white/80">Fixed equip</span><span className="font-bold text-white">5s</span></div>
              <div className="flex justify-between"><span className="text-white/80">TT (230V)</span><span className="font-bold text-white">0.2s</span></div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* On-Site Essentials — brighter list items */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-[11px] font-bold text-white/70 uppercase tracking-widest px-0.5">
          On-Site Essentials
        </h2>
        <div className="space-y-2">
          {[
            { icon: HelpCircle, colour: 'yellow', title: 'Common Questions', desc: '20 plain-English regulation answers', section: 'regulations' as LearningSection },
            { icon: AlertTriangle, colour: 'orange', title: 'EICR Coding Guide', desc: 'C1, C2, C3, FI — with examples', section: 'regulations' as LearningSection },
            { icon: ClipboardList, colour: 'blue', title: 'Compliance Checklists', desc: 'New install, CU change, EICR, EV, PV', section: 'regulations' as LearningSection },
          ].map((item, i) => {
            const colourMap: Record<string, { bg: string; border: string; icon: string }> = {
              yellow: { bg: 'bg-yellow-400/15', border: 'border-yellow-400/25', icon: 'text-yellow-400' },
              orange: { bg: 'bg-orange-400/15', border: 'border-orange-400/25', icon: 'text-orange-400' },
              blue: { bg: 'bg-blue-400/15', border: 'border-blue-400/25', icon: 'text-blue-400' },
            };
            const c = colourMap[item.colour];
            return (
              <button
                key={i}
                type="button"
                onClick={() => onNavigateToSection(item.section)}
                className="w-full text-left touch-manipulation active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.12] p-3.5 hover:bg-white/[0.08] transition-colors">
                  <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center shrink-0`}>
                    <item.icon className={`h-5 w-5 ${c.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-white">{item.title}</p>
                    <p className="text-[11px] text-white/60">{item.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-white/30 shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* BS 7671 Badge */}
      <motion.div variants={itemVariants}>
        <div className="relative rounded-2xl bg-yellow-400/[0.08] border border-yellow-400/20 p-4 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400/60 rounded-l-2xl" />
          <div className="flex items-center justify-between pl-1">
            <div>
              <p className="text-[12px] font-bold text-yellow-400">BS 7671:2018+A3:2024</p>
              <p className="text-[11px] text-white/70 leading-relaxed mt-0.5">
                All content verified against the current edition. A4 update coming.
              </p>
            </div>
            <Shield className="h-8 w-8 text-yellow-400/30 shrink-0 ml-3" />
          </div>
        </div>
      </motion.div>
    </motion.main>
  );
};

export default LearningHubOverview;

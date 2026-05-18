import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Wrench, GraduationCap } from 'lucide-react';
import { PageFrame, itemVariants } from '@/components/college/primitives';
import DailyAITipsTab from '@/components/apprentice/ojt/enhanced/DailyAITipsTab';
import HelpBotTab from '@/components/apprentice/ojt/enhanced/HelpBotTab';
import { cn } from '@/lib/utils';

type View = 'dave' | 'tips';

export default function AdvancedHelp() {
  const navigate = useNavigate();
  // Daily Tips routes here with ?prompt= for "Ask Dave" handoff; HelpBotTab
  // reads the param and auto-sends. We just default to the Dave view.
  const [view, setView] = useState<View>('dave');

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8 max-w-6xl xl:max-w-7xl">
      {/* Back nav — matches apprentice hub */}
      <motion.div variants={itemVariants}>
        <button
          type="button"
          onClick={() => navigate('/apprentice')}
          className="inline-flex items-center gap-1.5 h-9 px-2 -ml-2 text-[13px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      {/* Editorial hero — same yellow-eyebrow pattern as /apprentice/am2 */}
      <motion.div variants={itemVariants} className="space-y-2 sm:space-y-2.5">
        <div className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
          Apprentice · AI tutor
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05] text-white">
          Ask Dave
        </h1>
        <p className="text-[13px] sm:text-sm text-white/70 max-w-2xl leading-relaxed">
          Master sparky with 20+ years on UK installs. Grounded in BS 7671, GN3, OSG and AM4:2026 —
          and reads your practice history so the advice fits where you actually are.
        </p>

        {/* Capability strip — what Dave is wired into */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Capability icon={<BookOpen className="h-3 w-3" />} label="BS 7671 RAG" />
          <Capability icon={<Wrench className="h-3 w-3" />} label="200k practical jobs" />
          <Capability icon={<GraduationCap className="h-3 w-3" />} label="Your course LO/ACs" />
        </div>
      </motion.div>

      {/* Mode toggle — Dave / Daily tips. Two pill buttons rather than a
          tab strip, fits the editorial scheme better at this density. */}
      <motion.div variants={itemVariants} className="flex gap-2">
        <ModeBtn active={view === 'dave'} onClick={() => setView('dave')} label="Ask Dave" />
        <ModeBtn active={view === 'tips'} onClick={() => setView('tips')} label="Daily tips" />
      </motion.div>

      {/* Body */}
      {view === 'dave' ? (
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] overflow-hidden"
        >
          <HelpBotTab />
        </motion.div>
      ) : (
        <motion.div variants={itemVariants}>
          <DailyAITipsTab />
        </motion.div>
      )}

      {/* Footnote — kept compact, no longer competing for attention */}
      <motion.p
        variants={itemVariants}
        className="text-[10.5px] text-white/40 leading-relaxed max-w-2xl"
      >
        Learning support, not a replacement. Always verify safety-critical decisions with your
        supervisor or the official BS 7671 / IET guidance.
      </motion.p>
    </PageFrame>
  );
}

function Capability({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium text-elec-yellow/85 bg-elec-yellow/[0.06] border border-elec-yellow/25 px-2 py-0.5 rounded-full">
      {icon}
      {label}
    </span>
  );
}

function ModeBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-9 px-4 rounded-full text-[12.5px] font-semibold touch-manipulation transition-colors',
        active
          ? 'bg-elec-yellow text-black'
          : 'bg-white/[0.04] text-white/80 border border-white/[0.10] hover:bg-white/[0.08]'
      )}
    >
      {label}
    </button>
  );
}

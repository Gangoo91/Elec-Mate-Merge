/**
 * DailyAITipsTab
 *
 * Personalised tip set composed live from `useDailyTips()`, which reads
 * the apprentice's real signals (AM2 scores, calibration blind-spots,
 * portfolio gaps, OTJ pending hours, attendance, AC coverage, practice
 * rhythm). Tips are ranked by priority — the most actionable item lives
 * at the top.
 *
 * Editorial visual language matches the rest of the apprentice hub:
 * yellow eyebrows, monochrome cards, numbered prompt-style buttons. No
 * gamification chrome — this is a serious tool, not a streaks app.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDailyTips, type DailyTip } from '@/hooks/useDailyTips';
import { useStudentSnapshot } from '@/hooks/useStudentSnapshot';
import { RegulationDetailSheet } from '@/components/electrician-tools/ai-tools/chat';

const DailyAITipsTab = () => {
  const navigate = useNavigate();
  const { tips, isLoading, isEmpty } = useDailyTips();
  const snapshot = useStudentSnapshot();
  const [regSheet, setRegSheet] = useState<{ open: boolean; reg: string | null }>({
    open: false,
    reg: null,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-white/55">
          <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
          <span className="text-[13px]">Reading your training record…</span>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="px-4 sm:px-6 py-10 sm:py-14 text-center max-w-md mx-auto space-y-3">
        <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow/85">
          Daily focus
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-tight">
          Your tips kick in once you start practising.
        </h2>
        <p className="text-[13px] text-white/65 leading-relaxed">
          Run a single AM2 simulator session and the daily tips become personalised — driven by
          your weak areas, blind-spot regs, and portfolio progress.
        </p>
        <button
          type="button"
          onClick={() => navigate('/apprentice/am2-simulator')}
          className="mt-3 inline-flex items-center gap-1.5 h-11 px-5 rounded-xl bg-elec-yellow text-black font-semibold text-[13px] touch-manipulation"
        >
          Start with AM2 readiness
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-7">
      {/* Editorial header — today's date + a one-line summary of why these
          specific tips have surfaced today. */}
      <div className="space-y-2">
        <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow/85">
          {today} · Personalised for you
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-tight max-w-xl">
          {topSummary(snapshot)}
        </h2>
        <p className="text-[12.5px] text-white/55 leading-relaxed max-w-xl">
          {tips.length} tip{tips.length === 1 ? '' : 's'} ranked by what'll move you fastest,
          based on your actual training record. Top of the list first.
        </p>
      </div>

      {/* Tip stack — ranked. Each tip is its own editorial card. */}
      <div className="space-y-2.5">
        {tips.map((tip, i) => (
          <TipCard
            key={tip.id}
            tip={tip}
            index={i}
            onAction={() => {
              if (tip.actionHref) navigate(tip.actionHref);
            }}
            onAskDave={() => {
              if (tip.askDave) {
                // Route into Dave with the prompt prefilled via query string.
                // HelpBotTab reads ?prompt= on mount in a follow-up patch.
                navigate(`/apprentice/advanced-help?prompt=${encodeURIComponent(tip.askDave)}`);
              }
            }}
            onRegClick={(reg) => setRegSheet({ open: true, reg })}
          />
        ))}
      </div>

      {/* Footnote — reminds them this is real data, not generic content */}
      <p className="text-[10.5px] text-white/40 leading-relaxed max-w-xl">
        Tips refresh as your training record updates. AM2 scores, portfolio uploads, OTJ logs and
        college attendance all feed this view.
      </p>

      <RegulationDetailSheet
        isOpen={regSheet.open}
        regulationNumber={regSheet.reg}
        onClose={() => setRegSheet({ open: false, reg: null })}
        onAskFollowUp={(seed) => {
          setRegSheet({ open: false, reg: null });
          navigate(`/apprentice/advanced-help?prompt=${encodeURIComponent(seed)}`);
        }}
      />
    </div>
  );
};

/* ─── Tip card ───────────────────────────────────────────────────────── */

interface TipCardProps {
  tip: DailyTip;
  index: number;
  onAction: () => void;
  onAskDave: () => void;
  onRegClick: (reg: string) => void;
}

function TipCard({ tip, index, onAction, onAskDave, onRegClick }: TipCardProps) {
  const isPriority = index === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04, ease: 'easeOut' }}
      className={cn(
        'rounded-2xl border overflow-hidden',
        isPriority
          ? 'border-elec-yellow/35 bg-gradient-to-br from-elec-yellow/[0.06] to-elec-yellow/[0.01]'
          : 'border-white/[0.08] bg-[hsl(0_0%_10%)]'
      )}
    >
      <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-3">
        {/* Eyebrow row */}
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] font-mono tabular-nums text-elec-yellow/70">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              {tip.eyebrow}
            </span>
          </div>
          {isPriority && (
            <span className="inline-flex items-center gap-1 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-elec-yellow/85 bg-elec-yellow/[0.08] border border-elec-yellow/30 px-2 py-0.5 rounded-full">
              <Sparkles className="h-2.5 w-2.5" />
              Top priority
            </span>
          )}
        </div>

        {/* Title + body */}
        <div className="space-y-1.5">
          <h3 className="text-[15px] sm:text-base font-semibold text-white tracking-tight leading-snug">
            {tip.title}
          </h3>
          <p className="text-[12.5px] text-white/65 leading-relaxed">{tip.body}</p>
        </div>

        {/* Optional reg pill */}
        {tip.regNumber && (
          <button
            type="button"
            onClick={() => onRegClick(tip.regNumber!)}
            className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-elec-yellow underline decoration-elec-yellow/30 decoration-[1.5px] underline-offset-[3px] hover:decoration-elec-yellow/80 transition-colors touch-manipulation"
          >
            <BookOpen className="h-3 w-3" />
            Reg {tip.regNumber}
          </button>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={onAction}
            className={cn(
              'inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-[12px] font-semibold touch-manipulation transition-colors',
              isPriority
                ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                : 'bg-white/[0.06] text-white hover:bg-white/[0.10] border border-white/[0.08]'
            )}
          >
            {tip.actionLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          {tip.askDave && (
            <button
              type="button"
              onClick={onAskDave}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-[12px] font-medium text-white/80 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] touch-manipulation transition-colors"
            >
              Ask Dave
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Headline composer ──────────────────────────────────────────────── */

function topSummary(snap: ReturnType<typeof useStudentSnapshot>): string {
  const greeting = snap.firstName ? `${snap.firstName}, here's` : 'Here\'s';
  if (snap.weakAreas.length > 0) {
    return `${greeting} where to put 20 minutes today.`;
  }
  if (snap.overconfidentWrongs > 0) {
    return `${greeting} the gaps to close before AM2.`;
  }
  if (snap.recentPracticeCount === 0) {
    return `${greeting} a way back in.`;
  }
  return `${greeting} what to focus on today.`;
}

export default DailyAITipsTab;

import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

/* ==========================================================================
   HubHero — typography-led hero for the college hub. Name, course, and the
   single most-actionable status pill (latest EPA verdict if there is one).
   Mirrors the editorial pattern used on Student 360 / EPA cards: eyebrow +
   white headline + soft subline, no decorative icons.
   ========================================================================== */

interface Props {
  studentName: string | null;
  courseName: string | null;
  latestVerdict: string | null;
  latestGrade: string | null;
}

const VERDICT_LABEL: Record<string, string> = {
  ready: 'EPA ready',
  on_track: 'On track',
  needs_focus: 'Needs focus',
  not_yet: 'Not yet ready',
  refer: 'Refer',
};

const VERDICT_TONE: Record<string, string> = {
  ready: 'text-emerald-300 border-emerald-400/30 bg-emerald-500/[0.07]',
  on_track: 'text-emerald-200 border-emerald-400/20 bg-emerald-500/[0.05]',
  needs_focus: 'text-amber-300 border-amber-400/30 bg-amber-500/[0.07]',
  not_yet: 'text-rose-300 border-rose-400/30 bg-rose-500/[0.07]',
  refer: 'text-rose-300 border-rose-400/30 bg-rose-500/[0.07]',
};

export function HubHero({ studentName, courseName, latestVerdict, latestGrade }: Props) {
  const navigate = useNavigate();
  const verdictTone = latestVerdict
    ? (VERDICT_TONE[latestVerdict] ?? 'text-white border-white/[0.12] bg-white/[0.03]')
    : '';
  const verdictLabel = latestVerdict ? (VERDICT_LABEL[latestVerdict] ?? latestVerdict) : null;

  const firstName = studentName?.split(' ')[0] ?? null;

  return (
    <div className="space-y-3">
      <motion.button
        onClick={() => navigate(-1)}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-1 -ml-1 h-9 px-2 rounded-lg text-[13px] font-medium text-white/85 hover:text-white hover:bg-white/[0.04] transition-colors touch-manipulation"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-[10px] lg:text-[11px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
          Apprentice · From your college
        </div>
        <h1 className="mt-1 sm:mt-1.5 text-[22px] sm:text-[28px] lg:text-[40px] font-semibold text-white tracking-tight leading-[1.1]">
          {firstName ? `${firstName}'s college hub` : 'My college hub'}
        </h1>
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          {courseName && (
            <span className="text-[12.5px] sm:text-[13px] text-white/90">{courseName}</span>
          )}
          {verdictLabel && (
            <span
              className={cn(
                'inline-flex items-center h-6 px-2.5 rounded-full border text-[10.5px] font-medium uppercase tracking-[0.14em]',
                verdictTone
              )}
            >
              {verdictLabel}
              {latestGrade && (
                <span className="ml-1.5 normal-case tracking-normal text-white/85">
                  · {latestGrade}
                </span>
              )}
            </span>
          )}
        </div>
        <p className="mt-3 text-[12.5px] sm:text-[13px] text-white/95 leading-snug max-w-2xl">
          Everything from your tutor — your plan, quizzes, hours, and pre-EPA brief — in one place.
          Action it here and your college sees it instantly.
        </p>
      </motion.div>
    </div>
  );
}

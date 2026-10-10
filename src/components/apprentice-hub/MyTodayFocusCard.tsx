import {
  LC_FRAME,
  plainActionLabel,
  plainWords,
} from '@/components/apprentice-hub/college-hub/learnerUi';
import { useNavigate } from 'react-router-dom';
import { useLoggingReminders } from '@/hooks/useLoggingReminders';
import { motion } from 'framer-motion';
import { ChevronRight, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApprenticeDailyBrief, type ActionKind } from '@/hooks/useApprenticeDailyBrief';

/* ==========================================================================
   MyTodayFocusCard — the one to three things worth doing today.

   REDESIGNED 2026-08-31. Two things made this the ugliest card in the hub:

   🔴 THE CARD WAS VOLT-TINTED. `bg-white/[0.05]` with a volt border.
      Translucent volt over a near-black ground does not read as a soft
      yellow — it goes KHAKI. Sat next to the neutral "This week" card it
      looked like a rendering fault. Volt on this ground is only ever solid,
      and it belongs on a control, never on 500px of card.

   🔴 A SOLID VOLT PILL ON EVERY ROW. Three here, four on the card beside it:
      seven maximum-emphasis buttons on one screen, so the eye had nowhere to
      rest and none of them read as more important than any other. The row
      IS the action now — same shape as HubWorkList: a rule, the words, a
      chevron. That also fixes the tap target, which was a 36px pill.

   ⚠️ Inner rows were `bg-black/20` — DARKER than the card containing them,
      which reads as holes punched in the surface rather than items on it.
   ========================================================================== */

function resolveHref(kind: ActionKind, target?: string): string {
  // College Hub is hub-and-spoke (/apprentice/college/<section>) — map each
  // daily-brief action to its focused sub-page.
  switch (kind) {
    case 'open_quiz':
      return target
        ? `/apprentice/college/activities?quiz=${target}`
        : '/apprentice/college/activities';
    case 'open_otj':
      return '/apprentice/college/activities#otj';
    case 'open_portfolio':
      return '/apprentice/college/activities#portfolio';
    case 'open_ac':
      return '/apprentice/college/progress';
    case 'open_epa_brief':
      return '/apprentice/college/epa';
    case 'open_reflection':
      return '/apprentice/college/voice';
    default:
      return '/apprentice/college-plan';
  }
}

export function MyTodayFocusCard() {
  // Settings → Reminders drops the AI's "log your hours" suggestion (ELE-1804).
  const { hidden: hideReminders } = useLoggingReminders();
  const { brief, loading, refreshing, refresh } = useApprenticeDailyBrief();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className={cn(LC_FRAME, 'p-5 animate-pulse')}>
        <div className="h-3 w-24 rounded-full bg-white/10" />
        <div className="mt-3 h-5 w-2/3 rounded-full bg-white/10" />
        <div className="mt-4 space-y-2">
          {[0, 1].map((i) => (
            <div key={i} className="h-14 rounded-xl bg-white/[0.04]" />
          ))}
        </div>
      </div>
    );
  }
  if (!brief) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={LC_FRAME}
    >
      <div className="flex items-start justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-white">Today's focus</div>
          <h3 className="mt-1.5 text-[17px] font-semibold leading-snug text-white">
            {plainWords(brief.headline ?? brief.greeting ?? 'Pick one thing today.')}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={refreshing}
          aria-label="Refresh today's focus"
          // -mr-2/-mt-2 keeps a 44px target without pushing the icon off the
          // card's optical edge.
          className="-mr-2 -mt-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:bg-white/[0.06] disabled:opacity-60"
        >
          <RefreshCw className={cn('h-4 w-4', refreshing && 'animate-spin')} />
        </button>
      </div>

      {brief.bullets.length > 0 && (
        <ul className="mt-4 divide-y divide-white/[0.10] border-t border-white/[0.10]">
          {brief.bullets
            .filter((b) => !hideReminders || b.action_kind !== 'open_otj')
            .map((b, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => navigate(resolveHref(b.action_kind, b.action_target))}
                  className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold leading-snug text-white">
                      {plainWords(b.title)}
                    </span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-white">
                      {plainWords(b.why)}
                    </span>
                    <span className="mt-1.5 block text-[13px] font-semibold text-white underline decoration-white/40 underline-offset-4">
                      {plainActionLabel(b.action_kind, b.action_label)}
                    </span>
                  </span>
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                </button>
              </li>
            ))}
        </ul>
      )}

      {brief.encouragement && (
        <p className="border-t border-white/[0.10] px-4 py-3.5 text-[12.5px] leading-relaxed text-white sm:px-5">
          {plainWords(brief.encouragement)}
        </p>
      )}
    </motion.section>
  );
}

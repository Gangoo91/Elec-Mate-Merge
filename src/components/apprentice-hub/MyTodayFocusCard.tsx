import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useApprenticeDailyBrief, type ActionKind } from '@/hooks/useApprenticeDailyBrief';

/* ==========================================================================
   MyTodayFocusCard — 1-3 bullets of what to do today. Lazy-on-open caching.
   ELE-900 (B5).
   ========================================================================== */

function resolveHref(kind: ActionKind, target?: string): string {
  switch (kind) {
    case 'open_quiz':
      return target ? `/apprentice/college-plan?quiz=${target}` : '/apprentice/college-plan#quizzes';
    case 'open_otj':
      return '/apprentice/college-plan#otj';
    case 'open_portfolio':
      return '/apprentice/college-plan#portfolio';
    case 'open_ac':
      return '/apprentice/college-plan#ac-coverage';
    case 'open_epa_brief':
      return '/apprentice/college-plan#epa';
    case 'open_reflection':
      return '/apprentice/college-plan#reflection';
    default:
      return '/apprentice/college-plan';
  }
}

export function MyTodayFocusCard() {
  const { brief, loading, refreshing, refresh } = useApprenticeDailyBrief();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/60">
        Loading today's focus…
      </div>
    );
  }
  if (!brief) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-elec-yellow/30 bg-elec-yellow/[0.06] p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
            Today's focus
          </div>
          <h3 className="mt-2 text-lg font-semibold text-white leading-snug">
            {brief.headline ?? brief.greeting ?? 'Pick one thing today.'}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={refreshing}
          aria-label="Refresh today's focus"
          className="rounded-full border border-white/10 bg-white/5 p-2 text-white/60 hover:text-white touch-manipulation disabled:opacity-40"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {brief.bullets.length > 0 && (
        <ul className="mt-4 space-y-3">
          {brief.bullets.map((b, i) => (
            <li
              key={i}
              className="rounded-xl border border-white/10 bg-black/20 p-3"
            >
              <div className="text-sm font-medium text-white">{b.title}</div>
              <p className="mt-1 text-xs text-white/70 leading-relaxed">{b.why}</p>
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => navigate(resolveHref(b.action_kind, b.action_target))}
                  className="inline-flex items-center h-9 px-3 rounded-full bg-elec-yellow text-black text-[12px] font-semibold touch-manipulation"
                >
                  {b.action_label} →
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {brief.encouragement && (
        <p className="mt-4 text-xs text-white/60 italic">{brief.encouragement}</p>
      )}
    </motion.section>
  );
}

import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Clock,
  Eye,
  Target,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useMyProgressCheck } from '@/hooks/useMyProgressCheck';

/**
 * Apprentice-facing "where to focus next" — the supportive end of the
 * college → apprentice loop. Shows only learning-focus nudges (the RPC strips
 * anything pastoral/safeguarding and we never show a risk level), so it reads
 * as coaching, not a warning. Renders nothing when there's nothing to nudge.
 *
 * Every row is ACTIONABLE — it routes to the tool that clears the nudge
 * (log hours, capture evidence, open the college plan), so this is a
 * checklist the learner can work through, not a wall of advice.
 */

interface FocusAction {
  icon: LucideIcon;
  cta: string;
  /** Route to navigate to, or 'capture' to open the shared capture sheet. */
  to: string;
}

const ACTION_BY_KEY: Record<string, FocusAction> = {
  otj_none: { icon: Clock, cta: 'Log hours', to: '/apprentice/ojt-hub' },
  behind_pace: { icon: Clock, cta: 'Log hours', to: '/apprentice/ojt-hub' },
  portfolio_empty: { icon: Camera, cta: 'Capture', to: 'capture' },
  portfolio_stale: { icon: Camera, cta: 'Capture', to: 'capture' },
  ac_velocity_zero: { icon: Camera, cta: 'Capture', to: 'capture' },
  no_observations: { icon: Eye, cta: 'Open plan', to: '/apprentice/college-plan' },
  attendance_low: { icon: CalendarDays, cta: 'Open plan', to: '/apprentice/college-plan' },
  attendance_unknown: { icon: CalendarDays, cta: 'Open plan', to: '/apprentice/college-plan' },
  ilp_overdue: { icon: Target, cta: 'Review goals', to: '/apprentice/college-plan' },
};

const FALLBACK_ACTION: FocusAction = {
  icon: Target,
  cta: 'Open plan',
  to: '/apprentice/college-plan',
};

export function MyProgressCheckCard() {
  const navigate = useNavigate();
  const { focus, loading } = useMyProgressCheck();

  if (loading || focus.length === 0) return null;

  const act = (action: FocusAction) => {
    if (action.to === 'capture') {
      window.dispatchEvent(new CustomEvent('elecmate:open-capture'));
    } else {
      navigate(action.to);
    }
  };

  return (
    <section
      aria-label="Where to focus next"
      className="relative bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-2xl overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />

      <div className="px-4 sm:px-5 pt-4 pb-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
          Where to focus next
        </span>
        <p className="mt-1 text-[12.5px] text-white/55 leading-snug">
          Small steps now save a scramble later — each one takes a minute.
        </p>
      </div>

      <ul className="divide-y divide-white/[0.05] border-t border-white/[0.05]">
        {focus.slice(0, 4).map((f, i) => {
          const action = (f.key && ACTION_BY_KEY[f.key]) || FALLBACK_ACTION;
          const Icon = action.icon;
          return (
            <li key={`${f.key ?? 'focus'}-${i}`}>
              <button
                type="button"
                onClick={() => act(action)}
                className="group w-full flex items-center gap-3 px-4 sm:px-5 py-3 text-left touch-manipulation hover:bg-white/[0.06] transition-colors"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-elec-yellow/20 bg-elec-yellow/[0.06]">
                  <Icon className="h-4 w-4 text-elec-yellow" strokeWidth={2} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[13.5px] font-medium text-white leading-snug">
                    {f.label}
                  </span>
                  {f.detail && (
                    <span className="mt-0.5 block text-[11.5px] text-white/50 leading-snug">
                      {f.detail}
                    </span>
                  )}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-elec-yellow">
                  {action.cta}
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

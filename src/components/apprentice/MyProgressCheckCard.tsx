import { useNavigate } from 'react-router-dom';
import { useMyProgressCheck } from '@/hooks/useMyProgressCheck';
import { HubWorkList, type HubWorkItem } from '@/components/hub/HubPrimitives';

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
  cta: string;
  /** Route to navigate to, or 'capture' to open the shared capture sheet. */
  to: string;
}

const ACTION_BY_KEY: Record<string, FocusAction> = {
  otj_none: { cta: 'Log hours', to: '/apprentice/ojt-hub' },
  behind_pace: { cta: 'Log hours', to: '/apprentice/ojt-hub' },
  portfolio_empty: { cta: 'Capture', to: 'capture' },
  portfolio_stale: { cta: 'Capture', to: 'capture' },
  ac_velocity_zero: { cta: 'Capture', to: 'capture' },
  no_observations: { cta: 'Open plan', to: '/apprentice/college-plan' },
  attendance_low: { cta: 'Open plan', to: '/apprentice/college-plan' },
  attendance_unknown: { cta: 'Open plan', to: '/apprentice/college-plan' },
  ilp_overdue: { cta: 'Review goals', to: '/apprentice/college-plan' },
};

const FALLBACK_ACTION: FocusAction = {
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

  /*
   * HubWorkList, not a private copy of it.
   *
   * This was a hand-built version of the same thing: a flat
   * `bg-[hsl(0_0%_10%)]` slab, a grey sub-line, near-invisible
   * `divide-white/[0.05]` rules, and each row led by an icon in a yellow
   * rounded square. The hub language deliberately has no icons on these rows —
   * what kind of thing it is is already legible from the words, so a 3px rule
   * does the separating and the type carries the meaning. Reusing the
   * primitive also means this list now matches the identical one on the OJT
   * hub and the Apprentice Hub, which it did not.
   */
  const items: HubWorkItem[] = focus.slice(0, 4).map((f, i) => {
    const action = (f.key && ACTION_BY_KEY[f.key]) || FALLBACK_ACTION;
    return {
      id: `${f.key ?? 'focus'}-${i}`,
      title: f.label,
      reason: f.detail || action.cta,
      trailing: action.cta,
      onClick: () => act(action),
    };
  });

  return <HubWorkList label="Where to focus next" items={items} unit="thing" visible={4} />;
}

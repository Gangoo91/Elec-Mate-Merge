/**
 * NextUpCard — the ranked "what next", as a row of cards.
 *
 * The whole point is the second line on each card. "Time to study" was sent
 * 5,362 times and says nothing; "You opened MOET · Module 6 · Section 3 but
 * never finished it" is the same nudge with a reason attached, and the reason
 * is what earns the tap. So the reason is not a subtitle here — it is the
 * content, and the title is the verb in front of it.
 *
 * The ranking comes from `get_next_best_actions`, the same function the morning
 * plan and the peak-hour push read. A learner arriving from a notification sees
 * the sentence they were sent, rather than landing on a menu that has forgotten
 * why they came.
 *
 * Shape: this began as one wide card with the runners-up listed underneath. At
 * the hub's 1600px it became a banner with a single short sentence adrift in
 * it, and capping its width left it orphaned in the left third of a page whose
 * every other row spans the full grid. Three cards in the page's own
 * auto-fit grid solves both — it fills the width, it matches what sits below
 * it, and the top-ranked one still reads as primary because it is the only one
 * carrying the volt surface.
 *
 * Built from CARD_BASE / CARD_PRIMARY / CARD_NEUTRAL rather than its own
 * surfaces, so it is literally made of the same stuff as the rest of the hub.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';

import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_NEUTRAL, CARD_PRIMARY } from '@/components/ui/card-recipe';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { useHaptic } from '@/hooks/useHaptic';
import { useNextBestActions, type NextAction } from '@/hooks/useNextBestActions';

/** What sort of nudge this is. A quiet eyebrow above the title. */
const KIND_LABEL: Record<string, string> = {
  finish_section: 'Unfinished',
  mock_followup: 'After your mock',
  streak_risk: 'Your streak',
  weak_topic: 'Weak spot',
  resume: 'Where you left off',
  daily_goal: "Today's goal",
  xp_rival: 'Leaderboard',
  first_step: 'Getting started',
};

/** The verb. It should match what the learner expects to land on. */
const KIND_CTA: Record<string, string> = {
  finish_section: 'Finish it',
  mock_followup: 'Practise this',
  streak_risk: 'Study now',
  weak_topic: 'Practise this',
  resume: 'Continue',
  daily_goal: 'Earn the rest',
  xp_rival: 'Catch up',
  first_step: 'Browse courses',
};

function ActionCard({
  action,
  primary,
  onOpen,
}: {
  action: NextAction;
  primary: boolean;
  onOpen: () => void;
}) {
  const haptic = useHaptic();
  return (
    <button
      type="button"
      onClick={() => {
        haptic.light();
        onOpen();
      }}
      className={cn(
        CARD_BASE,
        primary ? CARD_PRIMARY : CARD_NEUTRAL,
        // The min-height only earns its keep in the desktop row, where it keeps
        // the three verbs on one line together. Stacked on a phone the cards
        // have no one to line up with, and it just adds dead space under the
        // shorter ones.
        'touch-manipulation p-4 sm:min-h-[148px] lg:hover:-translate-y-0.5'
      )}
    >
      <span
        className={cn(
          'text-[10px] font-semibold uppercase tracking-[0.18em]',
          primary ? 'text-black/70' : 'text-white'
        )}
      >
        {KIND_LABEL[action.kind] ?? 'Next up'}
      </span>

      <span
        className={cn(
          'mt-1.5 text-[16px] font-bold leading-tight tracking-tight transition-colors sm:text-[17px]',
          primary ? 'text-black' : 'text-white group-hover:text-elec-yellow'
        )}
      >
        {action.title}
      </span>

      {/* The reason. The line doing the work, so it gets the room. */}
      <span
        className={cn(
          'mt-1 text-[12px] leading-relaxed',
          primary ? 'text-black/70' : 'text-white'
        )}
      >
        {action.reason}
      </span>

      {/* Pushed to the bottom so the three cards' verbs line up across the row
          however long the reasons above them run. */}
      <span
        className={cn(
          'mt-auto flex items-center gap-1.5 pt-3 text-[12px] font-semibold',
          primary ? 'text-black' : 'text-white'
        )}
      >
        {KIND_CTA[action.kind] ?? 'Open'}
        <ArrowRight
          aria-hidden
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </button>
  );
}

export interface NextUpCardProps {
  /** Current study streak, shown beside the heading when it is worth keeping. */
  streak?: number;
  className?: string;
}

export function NextUpCard({ streak, className }: NextUpCardProps) {
  const navigate = useNavigate();
  const { actions, isLoading } = useNextBestActions(3);

  // No skeleton. This sits above the fold, and a pulsing block that resolves
  // into a different height shoves everything under it — worse than the row
  // simply appearing.
  if (isLoading || actions.length === 0) return null;

  return (
    <motion.section
      aria-label="What to do next"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('theme-v2 space-y-3', className)}
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
          What to do next
        </h2>
        {typeof streak === 'number' && streak >= 2 && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-elec-yellow/25 bg-elec-yellow/[0.08] py-1 pl-2 pr-2.5 text-[11.5px] font-semibold tabular-nums text-white">
            <Flame aria-hidden className="h-3.5 w-3.5 text-elec-yellow" />
            {streak} day{streak === 1 ? '' : 's'}
          </span>
        )}
      </motion.div>

      {/* The hub's own auto-fit grid, so this row and "Start something" below
          it break at exactly the same widths. */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] sm:gap-3"
      >
        {actions.slice(0, 3).map((a, i) => (
          <ActionCard
            key={a.kind}
            action={a}
            primary={i === 0}
            onOpen={() => navigate(a.route)}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}

export default NextUpCard;

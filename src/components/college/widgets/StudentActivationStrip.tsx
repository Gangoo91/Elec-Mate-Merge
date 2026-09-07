import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useCollegeActivation } from '@/hooks/useCollegeActivation';

/* ==========================================================================
   StudentActivationStrip — "are my apprentices actually in the app yet?"

   Bulk-add loads roster records; this shows how many have signed up and
   redeemed their join code (activated) against still pending, with the
   chase list. "Share join link" opens the existing invite sheet.

   Hub card language: 15px volt title, the figure on the right, a neutral
   bar, and two h-11 footer actions. The share action is volt TEXT — the
   Students page has its own primary, and a second solid volt button on
   the same screen is the defect this dialect exists to stop.
   ========================================================================== */

interface Props {
  /** Opens the CreateInviteSheet so the admin can hand out / share the code. */
  onShareInvite: () => void;
  /** The page's resolved college — passed through so the count scopes correctly. */
  collegeId?: string;
}

const FOOT =
  'flex h-11 flex-1 items-center justify-center px-3 text-[12.5px] font-semibold transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09]';

export function StudentActivationStrip({ onShareInvite, collegeId }: Props) {
  const { total, activated, pending, pct, pendingLearners, loading } =
    useCollegeActivation(collegeId);
  const [showPending, setShowPending] = useState(false);

  // Nothing loaded yet → the section's own empty state guides setup instead.
  if (loading || total === 0) return null;

  const allIn = pending === 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}
    >
      <div className="flex items-end justify-between gap-4 px-4 py-3.5 sm:px-5">
        <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
          Apprentice activation
        </h3>
        <span className="text-[11px] font-semibold tabular-nums text-white">
          {activated}/{total} · {pct}% in the app
        </span>
      </div>

      <div className="px-4 pb-3.5 sm:px-5">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.10]">
          <div className="h-full rounded-full bg-white" style={{ width: `${Math.max(pct, 2)}%` }} />
        </div>
      </div>

      {allIn ? (
        <p className="border-t border-white/[0.10] px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
          Every enrolled apprentice has signed in.
        </p>
      ) : (
        <div className="flex border-t border-white/[0.10]">
          <button
            type="button"
            onClick={() => setShowPending((v) => !v)}
            className={cn(FOOT, 'text-white')}
          >
            {pending} not signed up yet · {showPending ? 'Hide' : 'Who?'}
          </button>
          <span aria-hidden="true" className="w-px bg-white/[0.10]" />
          <button type="button" onClick={onShareInvite} className={cn(FOOT, 'font-bold text-elec-yellow')}>
            Share join link
          </button>
        </div>
      )}

      {showPending && !allIn && (
        <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
          {pendingLearners.slice(0, 40).map((l) => (
            <li key={l.id} className="flex items-center gap-3 px-4 py-3 sm:px-5">
              <span aria-hidden="true" className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]" />
              <span className="min-w-0 flex-1 truncate text-[14px] font-semibold leading-tight text-white">
                {l.name}
              </span>
              <span className="min-w-0 shrink truncate text-[12px] text-white">
                {l.email ?? 'no email'}
              </span>
            </li>
          ))}
          {pendingLearners.length > 40 && (
            <li className="px-4 py-3 text-[12px] font-semibold text-white sm:px-5">
              +{pendingLearners.length - 40} more
            </li>
          )}
        </ul>
      )}
    </motion.section>
  );
}

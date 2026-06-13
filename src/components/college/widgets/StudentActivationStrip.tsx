import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCollegeActivation } from '@/hooks/useCollegeActivation';

/* ==========================================================================
   StudentActivationStrip — "are my apprentices actually in the app yet?"

   Bulk-add loads roster records; this shows how many have signed up + redeemed
   their join code (activated) vs still pending, with the chase list. The
   "Share join link" CTA opens the existing invite sheet — emailing the cohort
   their links is the next slice.
   ========================================================================== */

interface Props {
  /** Opens the CreateInviteSheet so the admin can hand out / share the code. */
  onShareInvite: () => void;
  /** The page's resolved college — passed through so the count scopes correctly. */
  collegeId?: string;
}

export function StudentActivationStrip({ onShareInvite, collegeId }: Props) {
  const { total, activated, pending, pct, pendingLearners, loading } =
    useCollegeActivation(collegeId);
  const [showPending, setShowPending] = useState(false);

  // Nothing loaded yet → the section's own empty state guides setup instead.
  if (loading || total === 0) return null;

  const allIn = pending === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_9%)] p-4 sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
            Apprentice activation
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-[22px] font-semibold text-white tabular-nums">
              {activated}
              <span className="text-white/40">/{total}</span>
            </span>
            <span
              className={`text-[12px] font-medium ${allIn ? 'text-green-400' : 'text-white/55'}`}
            >
              {pct}% in the app
            </span>
          </div>
        </div>
        {!allIn && (
          <button
            onClick={onShareInvite}
            className="h-9 shrink-0 rounded-lg bg-elec-yellow px-3 text-[12.5px] font-semibold text-black touch-manipulation"
          >
            Share join link →
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full ${allIn ? 'bg-green-400' : 'bg-elec-yellow'}`}
          style={{ width: `${Math.max(pct, 3)}%` }}
        />
      </div>

      {allIn ? (
        <p className="mt-2.5 text-[12px] text-green-400/80">
          Every enrolled apprentice has signed in. 🎉
        </p>
      ) : (
        <button
          onClick={() => setShowPending((v) => !v)}
          className="mt-2.5 text-[12px] font-medium text-white/55 hover:text-white/80 touch-manipulation"
        >
          {pending} not signed up yet · {showPending ? 'hide' : 'who?'}
        </button>
      )}

      {showPending && !allIn && (
        <div className="mt-3 space-y-1.5 border-t border-white/[0.06] pt-3">
          {pendingLearners.slice(0, 40).map((l) => (
            <div key={l.id} className="flex items-center justify-between gap-3 text-[12.5px]">
              <span className="truncate text-white/85">{l.name}</span>
              <span className="shrink-0 truncate text-white/40">{l.email ?? 'no email'}</span>
            </div>
          ))}
          {pendingLearners.length > 40 && (
            <div className="pt-1 text-[11px] text-white/40">
              +{pendingLearners.length - 40} more
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

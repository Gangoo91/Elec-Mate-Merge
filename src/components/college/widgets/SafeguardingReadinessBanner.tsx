import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCollegeSafeguardingReadiness } from '@/hooks/useCollegeSafeguardingReadiness';

/* ==========================================================================
   SafeguardingReadinessBanner — the loud, impossible-to-miss config gate.

   Renders ONLY when the college can't route a safeguarding concern to a
   designated person (no DSL/deputy with a linked account). A logged safeguarding
   disclosure is always recorded, but without a routable DSL the alert reaches
   nobody — so this makes the gap unmissable and one tap from being fixed.

   It distinguishes two states:
     - a DSL is flagged but has no account (can't receive) → invite/link them
     - no DSL is designated at all → assign one
   Quiet (renders nothing) the moment a routable DSL exists.
   ========================================================================== */

export function SafeguardingReadinessBanner() {
  const navigate = useNavigate();
  const { loading, canRoute, unlinkedLeads } = useCollegeSafeguardingReadiness();

  if (loading || canRoute) return null;

  const hasUnlinked = unlinkedLeads.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-rose-500/30 bg-rose-500/[0.07] overflow-hidden"
      role="alert"
    >
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-start gap-3">
          <span aria-hidden className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-400 animate-pulse" />
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-300">
              Safeguarding not configured
            </div>
            <p className="mt-1.5 text-[13.5px] font-medium text-white leading-snug">
              {hasUnlinked
                ? `${unlinkedLeads.join(', ')} ${unlinkedLeads.length === 1 ? 'is' : 'are'} marked as a safeguarding lead but ${unlinkedLeads.length === 1 ? 'has' : 'have'} no account — so safeguarding alerts can't reach them.`
                : 'No Designated Safeguarding Lead is set up to receive alerts.'}
            </p>
            <p className="mt-1.5 text-[12px] text-white/70 leading-snug">
              Concerns are still recorded, but until a DSL with an account is in place a logged
              safeguarding concern won't reach a designated person. This is a statutory requirement —
              set it up before going live with learners.
            </p>
            <button
              onClick={() => navigate('/college?section=tutors')}
              className="mt-3 inline-flex items-center h-9 px-4 rounded-full bg-rose-500/90 hover:bg-rose-500 text-white text-[12.5px] font-semibold transition-colors touch-manipulation"
            >
              {hasUnlinked ? 'Link their account →' : 'Assign a DSL →'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

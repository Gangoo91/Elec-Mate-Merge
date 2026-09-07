import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useSafeguardingQueue, type SafeguardingConcern } from '@/hooks/useSafeguardingQueue';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { chipBase, chipOff, chipOn } from '@/components/forms/fieldStyles';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';

/* ==========================================================================
   SafeguardingQueueSection — the DSL's source-of-truth list of safeguarding
   concerns. Seen here whether or not a push notification was delivered, which
   is what makes the safeguarding flow safe.

   Strictly DSL-only: non-leads see a neutral "designated leads only" panel that
   never reveals whether any concern exists.

   Rebuilt on the shared hub language (CollegeDashboard draws the masthead, so
   this is content only). The one red word on the page is a concern that is
   open and nobody has yet acknowledged — `pastoral_notes` has no assignee
   column, so "unassigned" can only mean "no lead has claimed it". Overdue is
   volt text; actioned is white.
   ========================================================================== */

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function SafeguardingQueueSection() {
  const { loading, isDsl, concerns, openConcerns, openCount } = useSafeguardingQueue();
  const [tab, setTab] = useState<'open' | 'all'>('open');

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      </div>
    );
  }

  if (!isDsl) {
    // The gate. Neutral, and it never says whether a concern exists.
    return (
      <motion.div variants={itemVariants} initial="hidden" animate="visible">
        <div
          className={cn(
            'rounded-2xl border border-elec-yellow/35 px-5 py-8 text-center',
            CARD_SURFACE
          )}
        >
          <div className="text-[15px] font-semibold tracking-tight text-elec-yellow">
            Designated leads only
          </div>
          <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-white">
            The safeguarding queue is visible only to Designated Safeguarding Leads. If you need
            access, ask an administrator to confirm your role.
          </p>
        </div>
      </motion.div>
    );
  }

  const list = tab === 'open' ? openConcerns : concerns;
  const unacknowledged = openConcerns.filter((c) => !c.isAcknowledged).length;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
        <HubSectionHeading>Concerns</HubSectionHeading>
        <span
          className={cn(
            'text-[11px] font-semibold tabular-nums',
            unacknowledged > 0 ? 'text-red-300' : 'text-white'
          )}
        >
          {unacknowledged > 0
            ? `${unacknowledged} not yet acknowledged`
            : openCount > 0
              ? `${openCount} open`
              : 'Nothing open'}
        </span>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
        {(['open', 'all'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(chipBase, 'px-4 text-[12.5px]', tab === t ? chipOn : chipOff)}
          >
            {t === 'open' ? `Open · ${openCount}` : `All · ${concerns.length}`}
          </button>
        ))}
      </motion.div>

      {list.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className={cn(
            '-mx-4 border-y border-elec-yellow/35 px-4 py-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5',
            CARD_SURFACE
          )}
        >
          <div className="text-[14px] font-semibold text-white">
            {tab === 'open' ? 'No open safeguarding concerns' : 'No safeguarding concerns logged'}
          </div>
          <p className="mt-1 text-[12.5px] leading-snug text-white">
            {tab === 'open'
              ? 'Open concerns appear here the moment they are logged.'
              : 'When a concern is logged it is recorded here and routed to you.'}
          </p>
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} className="space-y-3">
          {list.map((c) => (
            <ConcernCard key={c.id} concern={c} />
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}

function ConcernCard({ concern }: { concern: SafeguardingConcern }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [acking, setAcking] = useState(false);

  const overdue =
    concern.isOpen &&
    concern.actionByDate != null &&
    new Date(concern.actionByDate).getTime() < Date.now();
  const needsLead = concern.isOpen && !concern.isAcknowledged;

  // Canonical full student profile (Student360Page) — not the thin in-dashboard
  // section duplicate.
  const openRecord = () =>
    navigate(`/college?section=student360&studentId=${concern.studentId}`, {
      state: { from: '/college?section=safeguardingqueue' },
    });

  const acknowledge = async () => {
    setAcking(true);
    try {
      const { error } = await supabase.rpc('acknowledge_safeguarding_concern', {
        p_concern_id: concern.id,
      });
      if (error) throw error;
      toast({ title: 'Acknowledged', description: 'Recorded that you have seen this concern.' });
      await queryClient.invalidateQueries({ queryKey: ['safeguarding-queue'] });
    } catch (e) {
      toast({
        title: 'Could not acknowledge',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setAcking(false);
    }
  };

  return (
    <div
      className={cn(
        '-mx-4 overflow-hidden border-y sm:mx-0 sm:rounded-2xl sm:border-x',
        needsLead ? 'border-elec-yellow/70' : 'border-elec-yellow/35',
        CARD_SURFACE
      )}
    >
      <button
        type="button"
        onClick={openRecord}
        className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
      >
        <span
          aria-hidden="true"
          className={cn(
            'mt-0.5 h-8 w-[3px] shrink-0 rounded-full',
            concern.isOpen ? 'bg-elec-yellow' : 'bg-white/[0.25]'
          )}
        />
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-3">
            <span className="min-w-0 truncate text-[14px] font-semibold leading-tight text-white">
              {concern.studentName}
            </span>
            <span
              className={cn(
                'shrink-0 text-[12px] font-semibold',
                needsLead ? 'text-red-300' : overdue ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {needsLead
                ? 'Not yet acknowledged'
                : concern.isOpen
                  ? overdue
                    ? 'Overdue'
                    : 'Open'
                  : 'Actioned'}
            </span>
          </span>
          <span className="mt-0.5 block text-[12px] leading-tight text-white">
            Logged {fmtDate(concern.createdAt)} · by {concern.authorName}
          </span>
          {concern.title && (
            <span className="mt-2.5 block text-[13px] font-medium leading-snug text-white">
              {concern.title}
            </span>
          )}
          <span className="mt-1 line-clamp-3 block text-[12.5px] leading-relaxed text-white">
            {concern.body}
          </span>
          {concern.actionRequired && (
            <span className="mt-3 block border-t border-white/[0.10] pt-2.5">
              <span className="block text-[11px] font-semibold text-white">Action required</span>
              <span className="mt-0.5 block text-[12px] leading-snug text-white">
                {concern.actionRequired}
              </span>
              {concern.actionByDate && (
                <span
                  className={cn(
                    'mt-0.5 block text-[11.5px] tabular-nums',
                    overdue ? 'font-semibold text-elec-yellow' : 'text-white'
                  )}
                >
                  By {fmtDate(concern.actionByDate)}
                </span>
              )}
            </span>
          )}
        </span>
        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>

      {/* Footer — acknowledge + open. Siblings of the body button (no nesting). */}
      <div className="flex items-center justify-between gap-3 border-t border-white/[0.10] px-4 sm:px-5">
        {concern.isAcknowledged ? (
          <span className="flex h-11 items-center text-[12px] text-white">
            Acknowledged{concern.acknowledgedAt ? ` ${fmtDate(concern.acknowledgedAt)}` : ''}
          </span>
        ) : (
          <button
            type="button"
            onClick={acknowledge}
            disabled={acking}
            className="-ml-2 flex h-11 items-center px-2 text-[12.5px] font-bold text-elec-yellow transition-colors touch-manipulation disabled:text-white"
          >
            {acking ? 'Acknowledging…' : 'Acknowledge'}
          </button>
        )}
        <button
          type="button"
          onClick={openRecord}
          className="-mr-2 flex h-11 items-center px-2 text-[12.5px] font-medium text-white transition-colors touch-manipulation hover:text-elec-yellow"
        >
          Open learner record
        </button>
      </div>
    </div>
  );
}

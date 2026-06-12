import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useSafeguardingQueue, type SafeguardingConcern } from '@/hooks/useSafeguardingQueue';
import {
  PageFrame,
  PageHero,
  ListCard,
  EmptyState,
  LoadingState,
  Pill,
  itemVariants,
} from '@/components/college/primitives';

/* ==========================================================================
   SafeguardingQueueSection — the DSL's source-of-truth list of safeguarding
   concerns. Seen here whether or not a push notification was delivered, which
   is what makes the safeguarding flow safe.

   Strictly DSL-only: non-leads see a neutral "designated leads only" panel that
   never reveals whether any concern exists.
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
      <PageFrame>
        <LoadingState />
      </PageFrame>
    );
  }

  if (!isDsl) {
    return (
      <PageFrame>
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-5 py-8 text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Designated leads only
            </div>
            <p className="mt-3 text-[13px] text-white/80 leading-relaxed max-w-md mx-auto">
              The safeguarding queue is visible only to Designated Safeguarding Leads. If you need
              access, ask an administrator to confirm your role.
            </p>
          </div>
        </motion.div>
      </PageFrame>
    );
  }

  const list = tab === 'open' ? openConcerns : concerns;

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Quality & Compliance · Safeguarding"
          title="Safeguarding queue"
          description="Every safeguarding concern logged at your college, in one place — visible to you whether or not an alert reached your device. Confidential to designated leads."
          tone="red"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center gap-1.5 mb-5">
        {(['open', 'all'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              'h-8 px-3.5 rounded-full text-[12px] font-medium border transition-colors touch-manipulation',
              tab === t
                ? 'bg-rose-500/[0.12] border-rose-500/35 text-rose-200'
                : 'bg-[hsl(0_0%_13%)] border-white/[0.08] text-white/80 hover:border-white/[0.18]',
            ].join(' ')}
          >
            {t === 'open' ? `Open${openCount ? ` · ${openCount}` : ''}` : `All · ${concerns.length}`}
          </button>
        ))}
      </motion.div>

      {list.length === 0 ? (
        <EmptyState
          title={tab === 'open' ? 'No open safeguarding concerns' : 'No safeguarding concerns logged'}
          description={
            tab === 'open'
              ? 'Open concerns appear here the moment they are logged.'
              : 'When a concern is logged it is recorded here and routed to you.'
          }
        />
      ) : (
        <motion.div variants={itemVariants} className="space-y-3">
          {list.map((c) => (
            <ConcernCard key={c.id} concern={c} />
          ))}
        </motion.div>
      )}
    </PageFrame>
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

  // Canonical full student profile (Student360Page) — not the thin in-dashboard
  // section duplicate.
  const openRecord = () => navigate(`/college/students/${concern.studentId}`);

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
    <ListCard>
      <button
        onClick={openRecord}
        className="group block w-full text-left px-5 sm:px-6 py-4 sm:py-5 hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm sm:text-[15px] font-semibold text-white truncate">
              {concern.studentName}
            </div>
            <div className="mt-0.5 text-[11.5px] text-white/60">
              Logged {fmtDate(concern.createdAt)} · by {concern.authorName}
            </div>
          </div>
          <div className="shrink-0">
            {concern.isOpen ? (
              overdue ? (
                <Pill tone="red">Overdue</Pill>
              ) : (
                <Pill tone="amber">Open</Pill>
              )
            ) : (
              <Pill tone="emerald">Actioned</Pill>
            )}
          </div>
        </div>

        {concern.title && (
          <div className="mt-2.5 text-[13px] font-medium text-white/90">{concern.title}</div>
        )}
        <p className="mt-1.5 text-[12.5px] text-white/80 leading-relaxed line-clamp-3">
          {concern.body}
        </p>

        {concern.actionRequired && (
          <div className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5">
            <div className="text-[10px] uppercase tracking-[0.16em] text-white/50">Action required</div>
            <div className="mt-1 text-[12px] text-white/85 leading-snug">{concern.actionRequired}</div>
            {concern.actionByDate && (
              <div className={`mt-1 text-[11px] ${overdue ? 'text-rose-300' : 'text-white/55'}`}>
                By {fmtDate(concern.actionByDate)}
              </div>
            )}
          </div>
        )}
      </button>

      {/* Footer — acknowledge + open. Siblings of the body button (no nesting). */}
      <div className="px-5 sm:px-6 py-3 flex items-center justify-between gap-3">
        {concern.isAcknowledged ? (
          <span className="text-[11.5px] text-emerald-300/90">
            ✓ Acknowledged{concern.acknowledgedAt ? ` ${fmtDate(concern.acknowledgedAt)}` : ''}
          </span>
        ) : (
          <button
            onClick={acknowledge}
            disabled={acking}
            className="inline-flex items-center h-8 px-3.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-200 text-[12px] font-semibold hover:bg-rose-500/25 disabled:opacity-50 transition-colors touch-manipulation"
          >
            {acking ? 'Acknowledging…' : 'Acknowledge'}
          </button>
        )}
        <button
          onClick={openRecord}
          className="text-[11.5px] font-medium text-white/45 hover:text-white/80 transition-colors touch-manipulation"
        >
          Open learner record →
        </button>
      </div>
    </ListCard>
  );
}

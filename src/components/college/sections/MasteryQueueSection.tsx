/**
 * MasteryQueueSection — tutor approves or rejects AC sign-off proposals.
 * ELE-906 (B11).
 *
 * Rebuilt on the shared hub language. CollegeDashboard draws the masthead;
 * this is content only:
 *
 *   filters → the queue
 *
 * What went: the SectionHeader eyebrow, `bg-white/5` chips at 28px, the
 * `text-white/60` and `/70` copy, emerald/blue pills and a `bg-black/20` notes
 * box punched into each card. Each proposal is now a row: learner and
 * criterion, the evidence and score beneath, the decision on the right.
 *
 * No solid volt on this screen on purpose: every pending row carries an
 * Approve, and a page of them would be a page of volt slabs. Approve is a
 * volt-text control, Reject a white one, both 44px.
 *
 * Data unchanged: `useMasteryProposals` (server-filtered by status, 200 rows)
 * and the `decide_ac_signoff` RPC. No KPI row — the hook only loads the
 * selected status, so counts for the other statuses would be a second query
 * this page does not make.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import { useMasteryProposals, type ProposalStatus } from '@/hooks/useMasteryProposals';
import { useToast } from '@/hooks/use-toast';

const TABS: Array<{ key: ProposalStatus | 'all'; label: string }> = [
  { key: 'pending', label: 'Awaiting decision' },
  { key: 'auto_approved', label: 'Auto-approved' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'all', label: 'All' },
];

const STATUS_LABEL: Record<string, string> = {
  pending: 'Awaiting decision',
  auto_approved: 'Auto-approved',
  approved: 'Approved',
  rejected: 'Rejected',
  expired: 'Expired',
};

const chipCn = (active: boolean) =>
  cn(
    'inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-3.5 text-[12.5px] font-medium transition-colors touch-manipulation',
    active
      ? 'border-elec-yellow text-elec-yellow'
      : 'border-white/[0.12] text-white hover:bg-white/[0.06]'
  );

export function MasteryQueueSection() {
  const [status, setStatus] = useState<ProposalStatus | 'all'>('pending');
  const { proposals, loading, error, decide } = useMasteryProposals({ status });
  const { toast } = useToast();
  const [busyId, setBusyId] = useState<string | null>(null);

  const handle = async (id: string, next: 'approved' | 'rejected') => {
    setBusyId(id);
    try {
      await decide(id, next);
      toast({ title: next === 'approved' ? 'Sign-off approved' : 'Proposal rejected' });
    } catch (e) {
      toast({
        title: 'Could not save decision',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <HubSectionHeading>Criterion sign-off proposals</HubSectionHeading>
      <motion.p variants={itemVariants} className="max-w-prose text-[13px] leading-relaxed text-white">
        When a learner's evidence clears the mastery threshold for an assessment criterion, the
        sign-off is proposed here. Approve it and the criterion is marked achieved on their record.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {TABS.map((t) => (
          <button key={t.key} type="button" onClick={() => setStatus(t.key)} className={chipCn(status === t.key)}>
            {t.label}
          </button>
        ))}
      </motion.div>

      {error && (
        <motion.p variants={itemVariants} className="text-[13px] font-medium text-red-300">
          {error}
        </motion.p>
      )}

      <motion.div
        variants={itemVariants}
        className={cn(
          '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
          CARD_SURFACE
        )}
      >
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
          </div>
        ) : proposals.length === 0 ? (
          <p className="px-4 py-6 text-[13px] text-white sm:px-5">
            {status === 'pending' ? 'Nothing awaiting a decision.' : 'Nothing in this queue.'}
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.10]">
            {proposals.map((p) => {
              const pending = p.status === 'pending';
              const busy = busyId === p.id;
              const score = p.score_pct != null ? `${Math.round(p.score_pct)}%` : null;
              const threshold = p.threshold_pct ? `threshold ${p.threshold_pct}%` : null;
              const reason = [
                p.ac_title,
                p.evidence_kind.replace(/_/g, ' '),
                score && threshold ? `${score} against ${threshold}` : (score ?? threshold),
              ]
                .filter(Boolean)
                .join(' · ');
              return (
                <li key={p.id} className="px-4 py-3.5 sm:px-5">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'h-8 w-[3px] shrink-0 rounded-full',
                        p.status === 'rejected' ? 'bg-red-400' : pending ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                        {p.student_name || 'Learner'} · {p.ac_code || p.ac_id}
                      </span>
                      <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">{reason}</span>
                      {p.decision_notes && (
                        <span className="mt-1 block text-[12px] leading-snug text-white">
                          Notes · {p.decision_notes}
                        </span>
                      )}
                    </span>
                    {pending ? (
                      <span className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => handle(p.id, 'rejected')}
                          className="flex h-11 items-center rounded-full px-3 text-[12.5px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.06] disabled:opacity-60"
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => handle(p.id, 'approved')}
                          className="flex h-11 items-center rounded-full border border-elec-yellow px-4 text-[12.5px] font-bold text-elec-yellow transition-colors touch-manipulation hover:bg-white/[0.06] disabled:opacity-60"
                        >
                          {busy ? 'Saving…' : 'Approve'}
                        </button>
                      </span>
                    ) : (
                      <span
                        className={cn(
                          'shrink-0 text-[12px] font-semibold',
                          p.status === 'rejected' ? 'text-red-300' : 'text-white'
                        )}
                      >
                        {STATUS_LABEL[p.status] ?? p.status}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </motion.div>
    </motion.section>
  );
}

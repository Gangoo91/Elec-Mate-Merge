import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMasteryProposals, type ProposalStatus } from '@/hooks/useMasteryProposals';
import { useToast } from '@/hooks/use-toast';
import {
  Pill,
  SectionHeader,
  itemVariants,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';

/* ==========================================================================
   MasteryQueueSection — tutor approves / rejects AC sign-off proposals.
   ELE-906 (B11).
   ========================================================================== */

const TABS: Array<{ key: ProposalStatus | 'all'; label: string }> = [
  { key: 'pending', label: 'Pending' },
  { key: 'auto_approved', label: 'Auto-approved' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'all', label: 'All' },
];

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
    <motion.section variants={itemVariants} initial="hidden" animate="visible" className="space-y-4">
      <SectionHeader eyebrow="Mastery loop" title="AC sign-off proposals" />
      <p className="text-[13px] text-white/70 leading-relaxed -mt-2">
        When a learner clears the mastery threshold on evidence, we propose the AC sign-off here. One tap to approve.
      </p>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setStatus(t.key)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs touch-manipulation',
              status === t.key
                ? 'border-elec-yellow bg-elec-yellow/10 text-elec-yellow'
                : 'border-white/10 bg-white/5 text-white/70'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading && <div className="text-sm text-white/60">Loading proposals…</div>}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {!loading && proposals.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-white/40">
          Nothing in this queue.
        </div>
      )}

      {!loading && proposals.length > 0 && (
        <ul className="space-y-2">
          {proposals.map((p) => (
            <li
              key={p.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white">
                    {p.student_name || 'Learner'} —{' '}
                    <span className="text-white/80">{p.ac_code || p.ac_id}</span>
                  </div>
                  {p.ac_title && (
                    <div className="text-xs text-white/60 mt-1">{p.ac_title}</div>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Pill tone="emerald">
                      {p.score_pct != null ? `${Math.round(p.score_pct)}%` : '—'}
                      {p.threshold_pct ? ` ≥ ${p.threshold_pct}%` : ''}
                    </Pill>
                    <Pill tone="blue">{p.evidence_kind.replace('_', ' ')}</Pill>
                    <Pill
                      tone={
                        p.status === 'pending'
                          ? 'amber'
                          : p.status === 'approved' || p.status === 'auto_approved'
                            ? 'emerald'
                            : p.status === 'rejected'
                              ? 'red'
                              : 'blue'
                      }
                    >
                      {p.status.replace('_', ' ')}
                    </Pill>
                  </div>
                </div>
                {p.status === 'pending' && (
                  <div className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      disabled={busyId === p.id}
                      onClick={() => handle(p.id, 'rejected')}
                      className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/10 touch-manipulation"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      disabled={busyId === p.id}
                      onClick={() => handle(p.id, 'approved')}
                      className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300 hover:bg-emerald-500/20 touch-manipulation"
                    >
                      Approve
                    </button>
                  </div>
                )}
              </div>
              {p.decision_notes && (
                <div className="mt-2 rounded-lg bg-black/20 px-3 py-2 text-xs text-white/60">
                  Notes: {p.decision_notes}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </motion.section>
  );
}

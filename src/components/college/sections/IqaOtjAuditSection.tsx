import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useIqaOtjAudit, type IqaOtjQueueRow, type IqaVerdict } from '@/hooks/useIqaOtjAudit';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';

/* ==========================================================================
   IqaOtjAuditSection — IQA samples assessor-verified OTJ entries.
   ELE-893 (A1).

   Content only — CollegeDashboard draws the masthead. The queue is one list;
   tapping a row opens the verdict form in place, and "Record verdict" is the
   single solid volt control on the page. Agreement below 70% is the one red
   figure; 70–90% is volt; 90%+ is white.
   ========================================================================== */

const VERDICT_LABEL: Record<IqaVerdict, string> = {
  agree: 'Agree with assessor',
  partial: 'Partial agreement',
  disagree: 'Disagree',
  escalate: 'Escalate',
};

function agreeTone(pct: number | null): string {
  if (pct === null) return 'text-white';
  if (pct < 70) return 'text-red-300';
  if (pct < 90) return 'text-elec-yellow';
  return 'text-white';
}

export function IqaOtjAuditSection() {
  const navigate = useNavigate();
  const { queue, rollup, loading, error, record } = useIqaOtjAudit();
  const { toast } = useToast();
  const [activeEntry, setActiveEntry] = useState<IqaOtjQueueRow | null>(null);
  const [verdict, setVerdict] = useState<IqaVerdict | null>(null);
  const [feedback, setFeedback] = useState('');
  const [followup, setFollowup] = useState(false);
  const [saving, setSaving] = useState(false);

  const openRow = (row: IqaOtjQueueRow) => {
    if (activeEntry?.id === row.id) {
      setActiveEntry(null);
      return;
    }
    setActiveEntry(row);
    setVerdict(null);
    setFeedback('');
    setFollowup(false);
  };

  const handleSave = async () => {
    if (!activeEntry || !verdict) {
      toast({ title: 'Pick a verdict', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      await record(activeEntry.id, verdict, feedback.trim() || undefined, followup);
      toast({ title: 'IQA verdict recorded' });
      setActiveEntry(null);
      setVerdict(null);
      setFeedback('');
      setFollowup(false);
    } catch (e) {
      toast({
        title: 'Could not record',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      </div>
    );
  }

  const drifting = rollup.filter((r) => r.agree_pct !== null && r.agree_pct < 70).length;

  return (
    <div className="space-y-8 sm:space-y-10">
      {error && (
        <div className="rounded-2xl border border-red-400/40 px-4 py-3 text-[13px] text-white">
          {error}
        </div>
      )}

      {/* The queue first — it is the work. */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>To sample</HubSectionHeading>
          <span className="text-[11px] font-semibold tabular-nums text-white">
            {queue.length === 0
              ? 'Nothing waiting'
              : `${queue.length} entr${queue.length === 1 ? 'y' : 'ies'}`}
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={cn(
            '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          {queue.length === 0 ? (
            <p className="px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
              No assessor-verified off-the-job entries to sample. Check back when assessors verify
              new entries.
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {queue.map((row) => {
                const open = activeEntry?.id === row.id;
                const age =
                  row.days_since_verified !== null
                    ? `${Math.round(row.days_since_verified)}d`
                    : undefined;
                return (
                  <li key={row.id}>
                    <button
                      type="button"
                      onClick={() => openRow(row)}
                      aria-expanded={open}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-8 w-[3px] shrink-0 rounded-full',
                          open ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                          {row.student_name ?? 'Learner'} · {row.title}
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                          {[
                            new Date(row.activity_date).toLocaleDateString('en-GB'),
                            `${Math.round(row.duration_minutes / 60)}h`,
                            row.unit_codes && row.unit_codes.length > 0
                              ? row.unit_codes.join(', ')
                              : null,
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                        </span>
                      </span>
                      {age && (
                        <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                          {age}
                        </span>
                      )}
                      <ChevronRight
                        className={cn(
                          'h-4 w-4 shrink-0 text-white transition-transform',
                          open && 'rotate-90'
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 px-4 pb-4 sm:px-5"
                      >
                        {row.description && (
                          <p className="whitespace-pre-wrap text-[12.5px] leading-relaxed text-white">
                            {row.description}
                          </p>
                        )}
                        {row.verification_rationale && (
                          <p className="text-[12.5px] leading-relaxed text-white">
                            <span className="font-semibold">Assessor said.</span>{' '}
                            {row.verification_rationale}
                          </p>
                        )}

                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {(['agree', 'partial', 'disagree', 'escalate'] as IqaVerdict[]).map(
                            (v) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => setVerdict(v)}
                                className={cn(
                                  chipBase,
                                  'px-3 text-[12.5px]',
                                  verdict === v ? chipOn : chipOff
                                )}
                              >
                                {VERDICT_LABEL[v]}
                              </button>
                            )
                          )}
                        </div>

                        <textarea
                          rows={3}
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="Feedback for the assessor and the audit trail (optional unless disagree or escalate)"
                          className={cn(textareaCn, 'w-full')}
                        />

                        <div className="flex min-h-11 items-center gap-3">
                          <Switch
                            id={`followup-${row.id}`}
                            checked={followup}
                            onCheckedChange={setFollowup}
                          />
                          <Label htmlFor={`followup-${row.id}`} className="text-[12.5px] text-white">
                            Follow-up required (creates a QIP-style action)
                          </Label>
                        </div>

                        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                          <button
                            type="button"
                            onClick={() => setActiveEntry(null)}
                            className={cn(buttonSecondaryCn, 'px-5 w-full sm:w-auto')}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSave}
                            disabled={!verdict || saving}
                            className={cn(buttonPrimaryCn, 'px-5 w-full sm:w-auto')}
                          >
                            {saving ? 'Saving…' : 'Record verdict'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </motion.div>
      </motion.section>

      {/* Per-assessor agreement over 90 days. */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>Assessor agreement</HubSectionHeading>
          <span
            className={cn(
              'text-[11px] font-semibold tabular-nums',
              drifting > 0 ? 'text-red-300' : 'text-white'
            )}
          >
            {drifting > 0
              ? `${drifting} below 70%`
              : rollup.length > 0
                ? '90 days'
                : 'No samples yet'}
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={cn(
            '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          {rollup.length === 0 ? (
            <p className="px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
              Agreement rates appear here once you have recorded a verdict.
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {rollup.map((r) => (
                <li
                  key={r.assessor_user_id}
                  className="flex items-center gap-3 px-4 py-3.5 sm:px-5"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-8 w-[3px] shrink-0 rounded-full',
                      r.agree_pct !== null && r.agree_pct < 90 ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                    )}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                      {r.assessor_name ?? 'Unknown assessor'}
                    </span>
                    <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                      {r.sampled_count} sampled · {r.agree_count} agree · {r.partial_count} partial ·{' '}
                      {r.disagree_count + r.escalate_count} disagree
                    </span>
                  </span>
                  <span
                    className={cn(
                      'shrink-0 text-[13px] font-semibold tabular-nums',
                      agreeTone(r.agree_pct)
                    )}
                  >
                    {r.agree_pct === null ? '—' : `${r.agree_pct}%`}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {/* Sampling plans, findings, standardisation and the coverage
              matrix live on the IQA dashboard. Router navigation — the old
              <a href> reloaded the whole app. */}
          <button
            type="button"
            onClick={() => navigate('/college/iqa')}
            className="flex h-11 w-full items-center justify-center border-t border-white/[0.10] text-[12.5px] font-semibold text-elec-yellow transition-colors touch-manipulation hover:bg-white/[0.06]"
          >
            Open the IQA dashboard
          </button>
        </motion.div>
      </motion.section>
    </div>
  );
}

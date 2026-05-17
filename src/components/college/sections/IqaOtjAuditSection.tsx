import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIqaOtjAudit, type IqaOtjQueueRow, type IqaVerdict } from '@/hooks/useIqaOtjAudit';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Pill,
  PrimaryButton,
  SecondaryButton,
  SectionHeader,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';

/* ==========================================================================
   IqaOtjAuditSection — IQA samples assessor-verified OTJ entries.
   ELE-893 (A1).
   ========================================================================== */

const VERDICT_TONE: Record<IqaVerdict, Tone> = {
  agree: 'emerald',
  partial: 'amber',
  disagree: 'orange',
  escalate: 'red',
};

const VERDICT_LABEL: Record<IqaVerdict, string> = {
  agree: 'Agree with assessor',
  partial: 'Partial agreement',
  disagree: 'Disagree',
  escalate: 'Escalate',
};

export function IqaOtjAuditSection() {
  const { queue, rollup, loading, error, record } = useIqaOtjAudit();
  const { toast } = useToast();
  const [activeEntry, setActiveEntry] = useState<IqaOtjQueueRow | null>(null);
  const [verdict, setVerdict] = useState<IqaVerdict | null>(null);
  const [feedback, setFeedback] = useState('');
  const [followup, setFollowup] = useState(false);
  const [saving, setSaving] = useState(false);

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

  return (
    <motion.section variants={itemVariants} initial="hidden" animate="visible" className="space-y-4">
      <SectionHeader eyebrow="IQA · OTJ audit" title="Sample assessor-verified entries" />
      <p className="text-[13px] text-white/70 leading-relaxed -mt-2">
        Audit a percentage of assessor-verified OTJ entries against the supplied evidence. Verdicts
        feed the per-assessor agreement rate so you can spot drift early.
      </p>

      {/* Assessor rollup */}
      {!loading && rollup.length > 0 && (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {rollup.map((r) => (
            <div
              key={r.assessor_user_id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">
                    {r.assessor_name ?? 'Unknown assessor'}
                  </div>
                  <div className="text-xs text-white/60">{r.sampled_count} sampled · 90 days</div>
                </div>
                <Pill
                  tone={
                    r.agree_pct === null
                      ? 'blue'
                      : r.agree_pct >= 90
                        ? 'emerald'
                        : r.agree_pct >= 70
                          ? 'amber'
                          : 'red'
                  }
                >
                  {r.agree_pct === null ? '—' : `${r.agree_pct}%`}
                </Pill>
              </div>
              <div className="mt-3 flex gap-1.5 text-[11px] text-white/60">
                <span>{r.agree_count} agree</span>
                <span>·</span>
                <span>{r.partial_count} partial</span>
                <span>·</span>
                <span>{r.disagree_count + r.escalate_count} disagree</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Queue */}
      {loading && <div className="text-sm text-white/60">Loading…</div>}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {!loading && queue.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center text-sm text-white/40">
          No assessor-verified OTJ entries to sample. Check back when assessors verify new
          entries.
        </div>
      )}

      {!loading && queue.length > 0 && (
        <ul className="space-y-2">
          {queue.map((row) => (
            <li
              key={row.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white">
                    {row.student_name ?? 'Learner'} — {row.title}
                  </div>
                  <div className="mt-1 text-xs text-white/60">
                    {new Date(row.activity_date).toLocaleDateString('en-GB')} ·{' '}
                    {Math.round(row.duration_minutes / 60)}h · verified{' '}
                    {row.days_since_verified !== null
                      ? `${Math.round(row.days_since_verified)} days ago`
                      : 'recently'}
                  </div>
                  {row.unit_codes && row.unit_codes.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {row.unit_codes.map((u) => (
                        <span
                          key={u}
                          className="inline-block rounded-md border border-white/10 px-2 py-0.5 text-[10px] font-medium text-white/70"
                        >
                          {u}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveEntry(row);
                    setVerdict(null);
                    setFeedback('');
                    setFollowup(false);
                  }}
                  className="rounded-lg border border-elec-yellow/40 bg-elec-yellow/10 px-3 py-1.5 text-xs font-semibold text-elec-yellow touch-manipulation"
                >
                  Sample →
                </button>
              </div>

              {row.description && (
                <p className="text-[12.5px] text-white/80 leading-snug whitespace-pre-wrap">
                  {row.description}
                </p>
              )}

              {row.verification_rationale && (
                <div className="rounded-lg bg-black/20 px-3 py-2 text-[12px] text-white/70">
                  <span className="text-white/40">Assessor said:</span>{' '}
                  {row.verification_rationale}
                </div>
              )}

              {/* Inline verdict form when this row is active */}
              {activeEntry?.id === row.id && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 border-t border-white/10 pt-3 space-y-3"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['agree', 'partial', 'disagree', 'escalate'] as IqaVerdict[]).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setVerdict(v)}
                        className={cn(
                          'rounded-xl border px-3 py-2.5 text-left text-xs font-semibold touch-manipulation transition-colors',
                          verdict === v
                            ? 'border-elec-yellow bg-elec-yellow/10 text-white'
                            : 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10'
                        )}
                      >
                        {VERDICT_LABEL[v]}
                      </button>
                    ))}
                  </div>

                  <Textarea
                    rows={3}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Feedback for assessor + audit trail (optional unless verdict is disagree/escalate)"
                    className="touch-manipulation text-base border-white/30 focus:border-yellow-500"
                  />

                  <div className="flex items-center gap-3">
                    <Switch
                      id={`followup-${row.id}`}
                      checked={followup}
                      onCheckedChange={setFollowup}
                    />
                    <Label htmlFor={`followup-${row.id}`} className="text-xs text-white">
                      Followup required (creates QIP-style action)
                    </Label>
                  </div>

                  <div className="flex justify-end gap-2">
                    <SecondaryButton onClick={() => setActiveEntry(null)}>Cancel</SecondaryButton>
                    <PrimaryButton onClick={handleSave} disabled={!verdict || saving}>
                      {saving ? 'Saving…' : 'Record verdict'}
                    </PrimaryButton>
                  </div>
                </motion.div>
              )}
            </li>
          ))}
        </ul>
      )}
    </motion.section>
  );
}

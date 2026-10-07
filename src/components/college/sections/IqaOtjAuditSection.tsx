import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useIqaOtjAudit, type IqaOtjQueueRow, type IqaVerdict } from '@/hooks/useIqaOtjAudit';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { buttonPrimaryCn, buttonSecondaryCn, textareaCn } from '@/components/forms/fieldStyles';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_CARD,
  COLLEGE_LINK,
  COLLEGE_LIST,
  COLLEGE_ROW,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { BarList, Donut } from '@/components/college/quality/QualityKit';
import { uniqueLabels } from '@/components/college/quality/IqaVisuals';

/* ==========================================================================
   IqaOtjAuditSection — IQA samples assessor-verified OTJ entries.
   ELE-893 (A1).

   Content only — CollegeDashboard draws the masthead. The queue is one list;
   tapping a row opens the verdict form in place, and "Record verdict" is the
   single solid volt control on the page. Agreement: below 70% red, 70–89%
   orange, 90%+ green (College Hub redesign, 7 Oct 2026).
   ========================================================================== */

const VERDICT_LABEL: Record<IqaVerdict, string> = {
  agree: 'Agree with assessor',
  partial: 'Partial agreement',
  disagree: 'Disagree',
  escalate: 'Escalate',
};

const HELP: PageHelpContent = {
  id: 'college-iqa-otj-audit',
  title: 'Off-the-job audit',
  what: 'An internal quality check on off-the-job hours. You sample entries an assessor has already verified and say whether you agree with their decision, so the hours you claim for funding stand up.',
  steps: [
    { title: 'Pick an entry', body: 'The list shows verified entries waiting for an IQA check, oldest sign-off first by days. Tap one to read it and what the assessor said.' },
    { title: 'Give your verdict', body: 'Agree, partial agreement, disagree or escalate. Add feedback for the assessor. You cannot record a disagree or escalate verdict without it.' },
    { title: 'Flag a follow-up', body: 'Switch on follow-up required when something needs doing. It marks the verdict as needing follow-up on the audit record; it does not create a task, so agree the next step with the assessor.' },
  ],
  notes: [
    { title: 'Assessor agreement', body: 'How often you agreed with each assessor over the last 90 days. Below 70% is a sign they need standardisation or support.' },
  ],
  legend: [
    { swatch: 'bg-emerald-500', label: '90% agreement or more' },
    { swatch: 'bg-orange-400', label: '70 to 89%' },
    { swatch: 'bg-red-500', label: 'Below 70%' },
  ],
};

/** Disagree and escalate must say why: the assessor and the audit trail need it. */
function feedbackRequired(v: IqaVerdict | null): boolean {
  return v === 'disagree' || v === 'escalate';
}

/** Under an hour reads in minutes ("20 min"), not "0h". */
function fmtDuration(mins: number | null | undefined): string {
  const m = Math.max(0, Math.round(mins ?? 0));
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r === 0 ? `${h}h` : `${h}h ${r}m`;
}

function agreeTone(pct: number | null): 'good' | 'warn' | 'bad' | 'neutral' {
  if (pct === null) return 'neutral';
  if (pct < 70) return 'bad';
  if (pct < 90) return 'warn';
  return 'good';
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
    if (feedbackRequired(verdict) && !feedback.trim()) {
      toast({ title: 'Add feedback for the assessor', description: 'It is needed when you disagree or escalate.', variant: 'destructive' });
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

  const sampledRollup = rollup.filter((r) => r.sampled_count > 0);
  const drifting = rollup.filter((r) => r.agree_pct !== null && r.agree_pct < 70).length;
  const totals = rollup.reduce(
    (t, r) => ({
      sampled: t.sampled + r.sampled_count,
      agree: t.agree + r.agree_count,
      partial: t.partial + r.partial_count,
      disagree: t.disagree + r.disagree_count,
      escalate: t.escalate + r.escalate_count,
    }),
    { sampled: 0, agree: 0, partial: 0, disagree: 0, escalate: 0 }
  );
  const overallAgree = totals.sampled > 0 ? Math.round((totals.agree / totals.sampled) * 100) : null;
  const oldest = queue.reduce<number | null>(
    (m, r) => (r.days_since_verified !== null && (m === null || r.days_since_verified > m) ? r.days_since_verified : m),
    null
  );

  return (
    <div className="space-y-8 sm:space-y-10">
      <CollegePageHeader
        eyebrow="Quality and compliance"
        title="Off-the-job audit"
        description="Sample off-the-job entries an assessor has already verified and record whether you agree, so the hours claimed for funding stand up."
        help={HELP}
        actions={
          <button type="button" onClick={() => navigate('/college/iqa')} className={COLLEGE_BTN}>
            Open the IQA dashboard
          </button>
        }
      />

      {error && (
        <div className="rounded-2xl border border-red-400/40 px-4 py-3 text-[13px] text-white">{error}</div>
      )}

      <CollegeStats
        items={[
          { label: 'To sample', value: String(queue.length), sub: queue.length === 0 ? 'Nothing waiting' : 'Verified, not yet checked', warn: queue.length > 0 },
          { label: 'Oldest waiting', value: oldest === null ? '—' : `${Math.round(oldest)}d`, sub: 'Since the assessor verified it', warn: oldest !== null && oldest > 30 },
          { label: 'Sampled · 90 days', value: String(totals.sampled), sub: `${sampledRollup.length} assessor${sampledRollup.length === 1 ? '' : 's'} sampled` },
          {
            label: 'Agreement',
            value: overallAgree === null ? '—' : `${overallAgree}%`,
            sub: drifting > 0 ? `${drifting} assessor${drifting === 1 ? '' : 's'} below 70%` : 'Agree with the assessor',
            warn: drifting > 0,
            good: overallAgree !== null && overallAgree >= 90,
          },
        ]}
      />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-5">
        {/* The queue first — it is the work. */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
          <CollegeSectionTitle
            title="To sample"
            sub={queue.length === 0 ? 'Nothing waiting' : 'Tap an entry to read it and record your verdict'}
          />

          {queue.length === 0 ? (
            <CollegeEmpty
              title="Nothing to sample"
              body="No assessor-verified off-the-job entries are waiting. They appear here as soon as an assessor verifies new entries."
            />
          ) : (
            <motion.ul variants={itemVariants} className={COLLEGE_LIST}>
              {queue.map((row) => {
                const open = activeEntry?.id === row.id;
                const age = row.days_since_verified !== null ? `${Math.round(row.days_since_verified)}d` : undefined;
                return (
                  <li key={row.id} className={cn(open && 'bg-white/[0.03]')}>
                    <button type="button" onClick={() => openRow(row)} aria-expanded={open} className={COLLEGE_ROW}>
                      <span
                        aria-hidden="true"
                        className={cn('h-9 w-[3px] shrink-0 rounded-full', open ? 'bg-elec-yellow' : 'bg-white/[0.25]')}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                          {row.student_name ?? 'Learner'} · {row.title}
                        </span>
                        <span className="mt-0.5 block truncate text-[12.5px] leading-tight text-white">
                          {[
                            new Date(row.activity_date).toLocaleDateString('en-GB'),
                            fmtDuration(row.duration_minutes),
                            row.unit_codes && row.unit_codes.length > 0 ? row.unit_codes.join(', ') : null,
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                        </span>
                      </span>
                      {age && (
                        <span className="shrink-0 text-right">
                          <span className="block text-[13px] font-semibold tabular-nums text-white">{age}</span>
                          <span className="block text-[11px] text-white">waiting</span>
                        </span>
                      )}
                      <ChevronRight
                        className={cn('h-4 w-4 shrink-0 text-white transition-transform', open && 'rotate-90')}
                        aria-hidden="true"
                      />
                    </button>

                    {open && (
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 px-5 pb-5 sm:px-6">
                        {row.description && (
                          <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-white">{row.description}</p>
                        )}
                        {row.verification_rationale && (
                          <p className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[13px] leading-relaxed text-white">
                            <span className="font-semibold">The assessor said: </span>
                            {row.verification_rationale}
                          </p>
                        )}

                        <div>
                          <p className="mb-2 text-[12.5px] font-semibold text-white">Your verdict</p>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {(['agree', 'partial', 'disagree', 'escalate'] as IqaVerdict[]).map((v) => (
                              <button key={v} type="button" onClick={() => setVerdict(v)} className={cn(chipCn(verdict === v), 'h-11')}>
                                {VERDICT_LABEL[v]}
                              </button>
                            ))}
                          </div>
                        </div>

                        <textarea
                          rows={3}
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder={
                            verdict && feedbackRequired(verdict)
                              ? 'Feedback for the assessor (needed for this verdict)'
                              : 'Feedback for the assessor and the audit trail (needed if you disagree or escalate)'
                          }
                          className={cn(textareaCn, 'w-full')}
                        />

                        <div className="flex min-h-11 items-center gap-3">
                          <Switch id={`followup-${row.id}`} checked={followup} onCheckedChange={setFollowup} />
                          <Label htmlFor={`followup-${row.id}`} className="text-[13px] text-white">
                            Follow-up required (marked on the audit record)
                          </Label>
                        </div>

                        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                          <button type="button" onClick={() => setActiveEntry(null)} className={cn(buttonSecondaryCn, 'w-full px-5 sm:w-auto')}>
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSave}
                            disabled={!verdict || saving || (feedbackRequired(verdict) && !feedback.trim())}
                            className={cn(buttonPrimaryCn, 'w-full px-5 sm:w-auto')}
                          >
                            {saving ? 'Saving…' : 'Record verdict'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </li>
                );
              })}
            </motion.ul>
          )}
        </motion.section>

        {/* Per-assessor agreement over 90 days. */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
          <CollegeSectionTitle
            title="Assessor agreement"
            sub={drifting > 0 ? `${drifting} below 70% · last 90 days` : sampledRollup.length > 0 ? 'How often you agreed · last 90 days' : 'No samples yet'}
          />
          <motion.div variants={itemVariants} className={COLLEGE_CARD}>
            {sampledRollup.length === 0 ? (
              <p className="text-[13px] leading-snug text-white">
                No verdicts in the last 90 days. Agreement rates appear here once you record a verdict on an entry from the list.
              </p>
            ) : (
              <>
                <BarList
                  max={100}
                  suffix="%"
                  rows={sampledRollup.map((r, i, all) => ({
                    label: uniqueLabels(all.map((x) => x.assessor_name ?? 'Unknown assessor'))[i],
                    sub: `${r.sampled_count} sampled · ${r.disagree_count + r.escalate_count} disagree`,
                    n: r.agree_pct ?? 0,
                    tone: agreeTone(r.agree_pct),
                  }))}
                />
                <div className="mt-6 border-t border-white/[0.06] pt-5">
                  <p className="mb-3 text-[13px] font-semibold text-white">All verdicts</p>
                  <Donut
                    centre={String(totals.sampled)}
                    centreSub="sampled"
                    segments={[
                      { label: 'Agree', n: totals.agree, tone: 'good' },
                      { label: 'Partial agreement', n: totals.partial, tone: 'warn' },
                      { label: 'Disagree', n: totals.disagree, tone: 'bad' },
                      { label: 'Escalated', n: totals.escalate, tone: 'info' },
                    ]}
                  />
                </div>
              </>
            )}
            {/* Sampling plans, findings, standardisation and the coverage
                matrix live on the IQA dashboard. Router navigation. */}
            <div className="mt-4 border-t border-white/[0.06] pt-2">
              <button type="button" onClick={() => navigate('/college/iqa')} className={COLLEGE_LINK}>
                Open the IQA dashboard
              </button>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

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
  COLLEGE_LINK,
  CollegeEmpty,
  CollegeSectionTitle,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import {
  QBTN as COLLEGE_BTN,
  QBTN_PRIMARY,
  QCARD as COLLEGE_CARD,
  QLIST as COLLEGE_LIST,
  QROW as COLLEGE_ROW,
  QualityHeader,
} from '@/components/college/quality/QualityHubKit';
import { plural } from '@/components/college/quality/qualityText';
import { BarList, Donut } from '@/components/college/quality/QualityKit';
import { uniqueLabels } from '@/components/college/quality/IqaVisuals';

/* ==========================================================================
   IqaOtjAuditSection — IQA samples assessor-verified OTJ entries.
   ELE-893 (A1).

   Content only — CollegeDashboard draws the masthead. The queue is one list;
   tapping a row opens the verdict form in place, and "Record verdict" is the
   single solid volt control on the page. Agreement: below 70% red, 70–89%
   orange, 90%+ green (College Hub redesign, 7 Oct 2026).

   8 Oct 2026: the header sentence carries the counts (no figure tiles);
   "Sample one at random" opens a random waiting entry, so the sample is not
   always the oldest; the list shows 15 at a time. The queue read is capped
   at 100 rows (useIqaOtjAudit), so a full queue says "100 or more".
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
    {
      title: 'Pick an entry',
      body: 'The list shows verified entries waiting for an IQA check, oldest sign-off first by days. Tap one to read it and what the assessor said.',
    },
    {
      title: 'Give your verdict',
      body: 'Agree, partial agreement, disagree or escalate. Add feedback for the assessor. You cannot record a disagree or escalate verdict without it.',
    },
    {
      title: 'Flag a follow-up',
      body: 'Switch on follow-up required when something needs doing. It marks the verdict as needing follow-up on the audit record; it does not create a task, so agree the next step with the assessor.',
    },
  ],
  notes: [
    {
      title: 'Assessor agreement',
      body: 'How often you agreed with each assessor over the last 90 days. Below 70% is a sign they need standardisation or support.',
    },
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
  const [shown, setShown] = useState(15);

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
      toast({
        title: 'Add feedback for the assessor',
        description: 'It is needed when you disagree or escalate.',
        variant: 'destructive',
      });
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
  const overallAgree =
    totals.sampled > 0 ? Math.round((totals.agree / totals.sampled) * 100) : null;
  const oldest = queue.reduce<number | null>(
    (m, r) =>
      r.days_since_verified !== null && (m === null || r.days_since_verified > m)
        ? r.days_since_verified
        : m,
    null
  );

  const capped = queue.length >= 100;
  /* IQA sampling should not always take the oldest entry: pick one at random
     and bring it into view, opened. */
  const sampleRandom = () => {
    if (queue.length === 0) return;
    const i = Math.floor(Math.random() * queue.length);
    const row = queue[i];
    if (i >= shown) setShown(i + 1);
    setActiveEntry(row);
    setVerdict(null);
    setFeedback('');
    setFollowup(false);
    window.setTimeout(
      () =>
        document
          .getElementById(`otj-${row.id}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      120
    );
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      <QualityHeader
        eyebrow="Quality and compliance"
        title="Off-the-job audit"
        summary={
          queue.length === 0
            ? 'Nothing waiting. Verified off-the-job entries appear here for you to check.'
            : `${capped ? '100 or more' : queue.length} verified ${queue.length === 1 ? 'entry is' : 'entries are'} waiting for an IQA check${
                oldest !== null
                  ? `; the oldest was verified ${plural(Math.round(oldest), 'day')} ago`
                  : ''
              }.`
        }
        sub={
          totals.sampled === 0
            ? 'No verdicts in the last 90 days.'
            : `Last 90 days: ${plural(totals.sampled, 'entry', 'entries')} checked, you agreed with the assessor on ${overallAgree}%${
                drifting > 0
                  ? `; ${plural(drifting, 'assessor')} below 70% need standardisation`
                  : ''
              }.`
        }
        help={HELP}
        actions={
          <button type="button" onClick={() => navigate('/college/iqa')} className={COLLEGE_BTN}>
            Open the IQA dashboard
          </button>
        }
        primary={
          queue.length > 0 ? (
            <button type="button" onClick={sampleRandom} className={QBTN_PRIMARY}>
              Sample one at random
            </button>
          ) : undefined
        }
      />

      {error && (
        <div className="rounded-2xl border border-orange-400/50 px-4 py-3 text-[13px] text-white">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-5">
        {/* The queue first — it is the work. */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <CollegeSectionTitle
            title="To sample"
            sub={
              queue.length === 0
                ? 'Nothing waiting'
                : 'Oldest sign-off first. Tap an entry to read it and record your verdict.'
            }
          />

          {queue.length === 0 ? (
            <CollegeEmpty
              title="Nothing to sample"
              body="No assessor-verified off-the-job entries are waiting. They appear here as soon as an assessor verifies new entries."
            />
          ) : (
            <motion.ul variants={itemVariants} className={COLLEGE_LIST}>
              {queue.slice(0, shown).map((row) => {
                const open = activeEntry?.id === row.id;
                const age =
                  row.days_since_verified !== null
                    ? plural(Math.round(row.days_since_verified), 'day')
                    : undefined;
                return (
                  <li
                    key={row.id}
                    id={`otj-${row.id}`}
                    className={cn('scroll-mt-24', open && 'bg-white/[0.03]')}
                  >
                    <button
                      type="button"
                      onClick={() => openRow(row)}
                      aria-expanded={open}
                      className={COLLEGE_ROW}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-[14px] font-semibold leading-snug text-white sm:truncate">
                          {row.title}
                        </span>
                        <span className="mt-0.5 block text-[12.5px] leading-snug text-white sm:truncate">
                          {[
                            row.student_name ?? 'Learner',
                            new Date(row.activity_date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            }),
                            fmtDuration(row.duration_minutes),
                            row.unit_codes && row.unit_codes.length > 0
                              ? row.unit_codes.join(', ')
                              : null,
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                        </span>
                        {/* Phone: how long since sign-off is its own line, so the
                            title keeps the width. */}
                        {age && (
                          <span className="mt-0.5 block text-[12.5px] font-semibold text-white sm:hidden">
                            Verified {age} ago
                          </span>
                        )}
                      </span>
                      {age && (
                        <span className="hidden shrink-0 text-right sm:block">
                          <span className="block text-[13px] font-semibold tabular-nums text-white">
                            {age}
                          </span>
                          <span className="block text-[12px] text-white">since verified</span>
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
                        className="space-y-4 px-4 pb-5 sm:px-5"
                      >
                        {row.description && (
                          <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-white">
                            {row.description}
                          </p>
                        )}
                        {row.verification_rationale && (
                          <p className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[13px] leading-relaxed text-white">
                            <span className="font-semibold">The assessor said: </span>
                            {row.verification_rationale}
                          </p>
                        )}

                        <div>
                          <p className="mb-2 text-[12.5px] font-semibold text-white">
                            Your verdict
                          </p>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {(['agree', 'partial', 'disagree', 'escalate'] as IqaVerdict[]).map(
                              (v) => (
                                <button
                                  key={v}
                                  type="button"
                                  onClick={() => setVerdict(v)}
                                  className={cn(chipCn(verdict === v), 'h-11')}
                                >
                                  {VERDICT_LABEL[v]}
                                </button>
                              )
                            )}
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
                          <Switch
                            id={`followup-${row.id}`}
                            checked={followup}
                            onCheckedChange={setFollowup}
                          />
                          <Label htmlFor={`followup-${row.id}`} className="text-[13px] text-white">
                            Follow-up required (marked on the audit record)
                          </Label>
                        </div>

                        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                          <button
                            type="button"
                            onClick={() => setActiveEntry(null)}
                            className={cn(buttonSecondaryCn, 'w-full px-5 sm:w-auto')}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSave}
                            disabled={
                              !verdict || saving || (feedbackRequired(verdict) && !feedback.trim())
                            }
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
          {queue.length > shown && (
            <button type="button" onClick={() => setShown((n) => n + 15)} className={COLLEGE_BTN}>
              Show 15 more ({queue.length - shown}
              {capped ? '+' : ''} left)
            </button>
          )}
        </motion.section>

        {/* Per-assessor agreement over 90 days. */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <CollegeSectionTitle
            title="Assessor agreement"
            sub={
              drifting > 0
                ? `${drifting} below 70% · last 90 days`
                : sampledRollup.length > 0
                  ? 'How often you agreed · last 90 days'
                  : 'No samples yet'
            }
          />
          <motion.div variants={itemVariants} className={COLLEGE_CARD}>
            {sampledRollup.length === 0 ? (
              <p className="text-[13px] leading-snug text-white">
                No verdicts in the last 90 days. Agreement rates appear here once you record a
                verdict on an entry from the list.
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
              <button
                type="button"
                onClick={() => navigate('/college/iqa')}
                className={COLLEGE_LINK}
              >
                Open the IQA dashboard
              </button>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

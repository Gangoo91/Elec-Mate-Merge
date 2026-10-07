/**
 * MasteryQueueSection — tutor approves or rejects criterion sign-off
 * proposals. ELE-906 (B11).
 *
 * Redesigned 7 Oct 2026 on the College Hub kit. CollegeDashboard draws the
 * masthead and ground; this is the body:
 *
 *   header → figures → score against threshold → statuses → the queue
 *
 * ELE-1889: the College inbox row with Approve / Reject on it, tick boxes to
 * approve or reject several at once, and a desktop keyboard (j/k move,
 * Shift+A approve, Shift+R reject, x tick). ELE-1886: "My learners" first.
 *
 * Data: useMasteryProposals (server-filtered by status, 200 rows) and the
 * decide_ac_signoff RPC (called once per proposal for bulk; there is no bulk
 * RPC). ELE-1867: approving now records a real "passed" decision through
 * record_ac_decisions (the one way to pass a criterion), filed as assessed by
 * questioning for a quiz score; the learner is told. Rejecting leaves the
 * criterion as it was. The figures describe the status being viewed.
 */
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { supabase } from '@/integrations/supabase/client';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  CollegeEmpty,
  CollegePageHeader,
  CollegeStats,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import {
  Bars,
  BulkBar,
  KeyHint,
  QueueGroup,
  QueueRow,
  ScopeToggle,
  daysSince,
  useQueueKeys,
  useScope,
  useSelection,
  waitingLabel,
} from '@/components/college/assessment/AssessmentKit';
import { useMyLearners } from '@/components/college/assessment/useMyLearners';
import { useMasteryProposals, type MasteryProposal, type ProposalStatus } from '@/hooks/useMasteryProposals';
import { useToast } from '@/hooks/use-toast';

const TABS: Array<{ key: ProposalStatus | 'all'; label: string }> = [
  { key: 'pending', label: 'Awaiting decision' },
  { key: 'auto_approved', label: 'Auto-approved' },
  { key: 'approved', label: 'Passed' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'all', label: 'All' },
];

const STATUS_LABEL: Record<string, string> = {
  pending: 'Awaiting decision',
  auto_approved: 'Auto-approved',
  approved: 'Passed',
  rejected: 'Rejected',
  expired: 'Expired',
};

const EVIDENCE_LABEL: Record<string, string> = {
  quiz_attempt: 'Quiz',
  otj_entry: 'Off-the-job',
  portfolio_item: 'Portfolio',
  observation: 'Observation',
  manual: 'Manual',
};

const HELP: PageHelpContent = {
  id: 'college-mastery-queue',
  title: 'Criteria sign-off',
  what: 'When a learner’s evidence scores over the mastery threshold for an assessment criterion, it is put forward here. Pass it and a passed decision is recorded in your name, the same as in Assess criteria, and the learner is told; reject it and the criterion stays as it was.',
  steps: [
    { title: 'Check the evidence', body: 'Each row shows the learner, the criterion, what the evidence was and how it scored against the threshold.' },
    { title: 'Pass or reject', body: 'Pass records a passed decision on the criterion. Reject leaves it open for more evidence. For needs more or not yet with feedback, use Assess criteria in Student 360.' },
    { title: 'Many at once', body: 'Tick rows and Pass or Reject them together. On a computer: j and k move, Shift+A passes, Shift+R rejects, x ticks.' },
  ],
  legend: [
    { swatch: 'bg-emerald-500', label: 'Well over the threshold', body: '10 points or more above it.' },
    { swatch: 'bg-orange-500', label: 'Waiting a week or more', body: 'Decide these first.' },
  ],
  notes: [{ title: 'Auto-approved', body: 'Cleared the bar under the college’s automatic rule. That is not a pass: only an assessor’s decision passes a criterion.' }],
};

export function MasteryQueueSection() {
  const [status, setStatus] = useState<ProposalStatus | 'all'>('pending');
  const { proposals: all, loading, error, decide, refetch } = useMasteryProposals({ status });
  const { toast } = useToast();
  const my = useMyLearners();
  const [scope, setScope] = useScope('masteryqueue', my);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [bulkBusy, setBulkBusy] = useState(false);

  const mine = useMemo(
    () => all.filter((p) => my.isMine({ studentId: p.student_id })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [all, my.loading]
  );
  const proposals = scope === 'mine' ? mine : all;

  const handle = async (id: string, next: 'approved' | 'rejected') => {
    setBusyId(id);
    try {
      await decide(id, next);
      toast({
        title: next === 'approved' ? 'Criterion passed' : 'Proposal rejected',
        description: next === 'approved' ? 'Recorded as a passed decision. The learner has been told.' : undefined,
      });
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

  const pendingKeys = useMemo(() => proposals.filter((p) => p.status === 'pending').map((p) => p.id), [proposals]);
  const keys = useMemo(() => proposals.map((p) => p.id), [proposals]);
  const sel = useSelection(keys);
  const ticked = Array.from(sel.selected).filter((k) => pendingKeys.includes(k));

  // No bulk RPC: decide_ac_signoff once per proposal, then one refetch.
  const bulk = async (next: 'approved' | 'rejected') => {
    if (ticked.length === 0) return;
    setBulkBusy(true);
    let ok = 0;
    for (const id of ticked) {
      const { error: e } = await supabase.rpc('decide_ac_signoff', { p_proposal_id: id, p_status: next, p_notes: null });
      if (!e) ok += 1;
    }
    await refetch();
    setBulkBusy(false);
    sel.clear();
    toast({
      title: `${next === 'approved' ? 'Passed' : 'Rejected'} ${ok}${ok < ticked.length ? ` of ${ticked.length}` : ''}`,
      variant: ok < ticked.length ? 'destructive' : undefined,
    });
  };

  const kb = useQueueKeys({
    keys,
    onOpen: (k) => pendingKeys.includes(k) && sel.toggle(k),
    onToggle: (k) => pendingKeys.includes(k) && sel.toggle(k),
    onClear: () => sel.clear(),
    // Shift+A / Shift+R, never a bare key: decide_ac_signoff only accepts
    // approved or rejected, so there is no way back to pending to undo.
    extra: {
      A: (k) => pendingKeys.includes(k) && void handle(k, 'approved'),
      R: (k) => pendingKeys.includes(k) && void handle(k, 'rejected'),
    },
  });

  const margins = proposals
    .filter((p) => p.score_pct != null && p.threshold_pct != null)
    .map((p) => (p.score_pct as number) - (p.threshold_pct as number));
  const learners = new Set(proposals.map((p) => p.student_id)).size;
  const ages = proposals.filter((p) => p.status === 'pending').map((p) => daysSince(p.created_at) ?? 0);
  const oldest = ages.length ? Math.max(...ages) : null;
  const kinds = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of proposals) m.set(p.evidence_kind, (m.get(p.evidence_kind) ?? 0) + 1);
    return Array.from(m.entries()).map(([k, n]) => ({ label: EVIDENCE_LABEL[k] ?? k, n, cls: 'bg-white' }));
  }, [proposals]);

  const urgentRows = proposals.filter((p) => p.status === 'pending' && (daysSince(p.created_at) ?? 0) >= 7);
  const otherRows = proposals.filter((p) => !urgentRows.includes(p));
  const tabLabel = TABS.find((t) => t.key === status)?.label ?? 'Proposals';

  const renderRow = (p: MasteryProposal) => {
    const pending = p.status === 'pending';
    const busy = busyId === p.id;
    const age = daysSince(p.created_at);
    const score = p.score_pct != null ? `${Math.round(p.score_pct)}%` : null;
    const scoreLine =
      score && p.threshold_pct ? `${score} against ${p.threshold_pct}%` : (score ?? (p.threshold_pct ? `Threshold ${p.threshold_pct}%` : null));
    return (
      <li key={p.id} data-qkey={p.id}>
        <QueueRow
          name={p.student_name || 'Learner'}
          kind={EVIDENCE_LABEL[p.evidence_kind] ?? p.evidence_kind.replace(/_/g, ' ')}
          mine={scope === 'all' && my.isMine({ studentId: p.student_id })}
          title={[p.ac_code || p.ac_id, p.ac_title].filter(Boolean).join(' ')}
          body={[scoreLine, p.decision_notes ? `Notes: ${p.decision_notes}` : null].filter(Boolean).join(' · ') || undefined}
          meta={
            <>
              <b className="font-semibold">{pending ? waitingLabel(age) : (STATUS_LABEL[p.status] ?? p.status)}</b>
              {!pending && p.decided_at
                ? ` · ${new Date(p.decided_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
                : ''}
            </>
          }
          urgent={pending && age !== null && age >= 7}
          onOpen={() => pending && sel.toggle(p.id)}
          selectable={pending}
          selected={sel.has(p.id)}
          onToggle={() => sel.toggle(p.id)}
          focused={kb.focus === p.id}
          stackTrailing={pending}
          trailing={
            pending ? (
              <span className="flex shrink-0 items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void handle(p.id, 'rejected')}
                  className="inline-flex h-11 items-center rounded-xl px-3 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06] disabled:opacity-60"
                >
                  Reject
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void handle(p.id, 'approved')}
                  className="inline-flex h-11 min-w-[92px] items-center justify-center rounded-xl border border-white/[0.18] px-3 text-[13px] font-bold text-white touch-manipulation hover:border-elec-yellow disabled:opacity-60"
                >
                  {busy ? 'Saving…' : 'Pass'}
                </button>
              </span>
            ) : (
              <span className={cn('shrink-0 text-[12.5px] font-semibold', p.status === 'rejected' ? 'text-orange-300' : 'text-white')}>
                {STATUS_LABEL[p.status] ?? p.status}
              </span>
            )
          }
        />
      </li>
    );
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      <CollegePageHeader
        eyebrow="Assessment"
        title={
          loading
            ? 'Gathering proposals…'
            : status === 'pending'
              ? proposals.length === 0
                ? 'No sign-offs to decide'
                : `${proposals.length} ${proposals.length === 1 ? 'sign-off' : 'sign-offs'} to decide`
              : `Criteria sign-off: ${tabLabel.toLowerCase()}`
        }
        description="When a learner’s evidence clears the mastery threshold for a criterion, it is put forward here. Pass it and a passed decision is recorded in your name; the learner is told."
        help={HELP}
        actions={<ScopeToggle scope={scope} onChange={setScope} my={my} mineCount={mine.length} allCount={all.length} />}
      />

      <CollegeStats
        items={[
          { label: status === 'pending' ? 'To decide' : tabLabel, value: loading ? '—' : String(proposals.length), sub: status === 'all' ? 'Every status' : 'In this view' },
          { label: 'Learners', value: loading ? '—' : String(learners), sub: 'With a proposal here' },
          {
            label: 'Oldest waiting',
            value: oldest === null ? '—' : `${oldest}d`,
            sub: oldest === null ? 'Nothing waiting' : oldest >= 7 ? 'Over a week: decide today' : 'Under a week',
            warn: oldest !== null && oldest >= 7,
          },
          {
            label: 'Average margin',
            value: margins.length ? `${Math.round(margins.reduce((a, b) => a + b, 0) / margins.length)} pts` : '—',
            sub: 'Score above the threshold',
          },
        ]}
      />

      {!loading && proposals.length > 0 && (
        <section className={cn(COLLEGE_CARD, 'grid gap-6 lg:grid-cols-2')}>
          <div className="min-w-0">
            <p className="mb-3 text-[13px] font-semibold text-white">How far over the threshold</p>
            <Bars
              rows={[
                { label: 'Under it', n: margins.filter((m) => m < 0).length, cls: 'bg-orange-500' },
                { label: 'Just over (0 to 4)', n: margins.filter((m) => m >= 0 && m < 5).length, cls: 'bg-elec-yellow' },
                { label: '5 to 9 over', n: margins.filter((m) => m >= 5 && m < 10).length, cls: 'bg-white' },
                { label: '10 or more over', n: margins.filter((m) => m >= 10).length, cls: 'bg-emerald-500' },
              ]}
            />
          </div>
          <div className="min-w-0">
            <p className="mb-3 text-[13px] font-semibold text-white">Where the evidence came from</p>
            {kinds.length ? <Bars rows={kinds} /> : <p className="text-[13px] text-white">No evidence types yet.</p>}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {TABS.map((t) => (
              <button key={t.key} type="button" onClick={() => setStatus(t.key)} className={chipCn(status === t.key)}>
                {t.label}
              </button>
            ))}
          </div>
          <KeyHint
            items={[
              ['j k', 'move'],
              ['Shift A', 'pass'],
              ['Shift R', 'reject'],
              ['x', 'tick'],
            ]}
          />
        </div>

        {pendingKeys.length > 1 && (
          <button
            type="button"
            onClick={() => (ticked.length === pendingKeys.length ? sel.clear() : sel.setAll(pendingKeys))}
            className="h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            {ticked.length === pendingKeys.length ? 'Untick all' : `Tick all ${pendingKeys.length}`}
          </button>
        )}

        {error && (
          <div className="rounded-2xl border border-orange-500/40 px-4 py-3 text-[13.5px] text-white">
            Couldn’t load the proposals: {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[84px] animate-pulse rounded-2xl bg-white/[0.04]" />
            ))}
          </div>
        ) : proposals.length === 0 ? (
          <CollegeEmpty
            title={status === 'pending' ? 'Nothing awaiting a decision' : 'Nothing in this view'}
            body={
              scope === 'mine' && all.length > 0
                ? `${all.length} for other tutors’ learners. Switch to Everyone to see them.`
                : 'Proposals appear when a learner’s quiz, off-the-job or portfolio evidence clears the mastery threshold for a criterion.'
            }
          />
        ) : (
          <>
            {urgentRows.length > 0 && (
              <QueueGroup title="Waiting a week or more" urgent count={urgentRows.length}>
                {urgentRows.map(renderRow)}
              </QueueGroup>
            )}
            {otherRows.length > 0 && (
              <QueueGroup title={urgentRows.length ? 'Everything else' : tabLabel} count={otherRows.length}>
                {otherRows.map(renderRow)}
              </QueueGroup>
            )}
          </>
        )}
      </section>

      <BulkBar count={ticked.length} onClear={sel.clear}>
        <button type="button" onClick={() => void bulk('rejected')} disabled={bulkBusy} className={COLLEGE_BTN}>
          Reject
        </button>
        <button type="button" onClick={() => void bulk('approved')} disabled={bulkBusy} className={COLLEGE_BTN_PRIMARY}>
          {bulkBusy ? 'Saving…' : `Pass ${ticked.length}`}
        </button>
      </BulkBar>
    </div>
  );
}

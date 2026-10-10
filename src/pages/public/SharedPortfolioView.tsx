/**
 * SharedPortfolioView — /view/:token (ELE-2016)
 *
 * The page someone opens from a portfolio share link: an assessor, employer,
 * EPAO or a new college. Rebuilt 6 Oct on the landing design (PublicPageShell)
 * as one page rather than five tabs, because a reviewer reads a portfolio top
 * to bottom: who this is → how far they are → the evidence itself → by unit.
 *
 * No login. Data comes from token-scoped SECURITY DEFINER functions; evidence
 * files are signed by sign-shared-portfolio-evidence.
 * Feedback left here is advisory: an official decision needs an assessor
 * account. "Become their assessor" asks the learner for one (request_to_assess);
 * the learner sends the invite.
 *
 * ELE-1885: a share can carry a PIN. Its link is /view/<public_token>;
 * get_share_gate says a PIN is needed and unlock_shared_portfolio swaps the
 * right PIN for the real token, which every other call then uses.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { Download, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useSharedPortfolioStructured,
  type SharedCriterion,
  type SharedDecision,
  type SharedEvidenceEntry,
  type SharedWitness,
} from '@/hooks/portfolio/useSharedPortfolioStructured';
import { downloadLearnerDocument } from '@/lib/documents/learnerDocuments';
import { STATE_LABEL, STATE_SWATCH, type AcState } from '@/hooks/portfolio/usePortfolioAcState';
import { assessorWithQualifications } from '@/lib/assessorQualifications';
import {
  PublicCard,
  PublicEyebrow,
  PublicH1,
  PublicPageShell,
  PUBLIC_PRIMARY_CTA,
  PUBLIC_SECONDARY_CTA,
} from '@/components/public/PublicPageShell';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 ' +
  'text-base text-white placeholder:text-white/70 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation';
const textareaCn =
  'min-h-[90px] w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base ' +
  'text-white caret-elec-yellow placeholder:text-white/70 focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation';
// Chips are border and text only; the page's one solid yellow control is its primary action.
const chipOn = 'border-elec-yellow text-elec-yellow font-semibold';
const chipOff = 'border-white/[0.2] text-white font-medium';
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[24px] font-bold leading-tight tracking-[-0.02em] text-white sm:text-[28px]">
    {children}
  </h2>
);

const ROLES = [
  { key: 'assessor', label: 'Assessor' },
  { key: 'tutor', label: 'Tutor' },
  { key: 'employer', label: 'Employer' },
  { key: 'other', label: 'Other' },
];

const KSB_LABEL: Record<string, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  evidence_submitted: 'Evidence added',
  completed: 'Completed',
  verified: 'Verified',
};

const when = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';
// "6 Oct", with the year only when it isn't this year.
const shortDate = (iso: string | null | undefined) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    ...(d.getFullYear() === new Date().getFullYear() ? {} : { year: 'numeric' }),
  });
};
// The declared type wins; the file name is only a fallback when no type was stored.
const isImage = (f: { type?: string; url?: string }) =>
  f.type ? f.type.startsWith('image') : /\.(jpe?g|png|webp|heic|gif)(\?|$)/i.test(f.url ?? '');

// ELE-1885: what the assessor has decided, per criterion.
type RecordState = 'passed' | 'needs_more' | 'with_assessor';
const recordState = (d: SharedDecision): RecordState =>
  d.state === 'passed' ? 'passed' : d.state === 'submitted' ? 'with_assessor' : 'needs_more';
const RECORD_LABEL: Record<RecordState, string> = {
  passed: 'Passed',
  needs_more: 'Needs more',
  with_assessor: 'With the assessor',
};
const RECORD_PILL: Record<RecordState, string> = {
  passed: 'border-emerald-400 text-emerald-300',
  needs_more: 'border-orange-400 text-orange-300',
  with_assessor: 'border-sky-400 text-sky-200',
};

// ELE-2016: the criteria states LearnerAssessmentView uses, worded for
// someone reading the learner's portfolio.
const CRITERION_LABEL: Record<AcState, string> = {
  ...STATE_LABEL,
  claimed: 'Claimed by the learner',
  submitted: 'With the assessor',
};
const CRITERION_ORDER: AcState[] = [
  'iqa_confirmed',
  'passed',
  'submitted',
  'referred',
  'not_yet',
  'iqa_rejected',
  'claimed',
  'not_started',
];
const isPassedState = (st: string) => st === 'passed' || st === 'iqa_confirmed';

function witnessLine(w: SharedWitness) {
  const who = [w.witness_name || 'A witness', w.witness_role].filter(Boolean).join(', ');
  return `Witnessed by ${who}${w.witness_company ? ` at ${w.witness_company}` : ''}${
    w.signed_at ? `, ${shortDate(w.signed_at)}` : ''
  }`;
}

function WitnessStatement({ w }: { w: SharedWitness }) {
  return (
    <div className="border-t border-white/[0.1] pt-3">
      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-elec-yellow">
        Witness statement
      </p>
      <p className="mt-1 text-[15px] font-semibold leading-snug text-white">{witnessLine(w)}</p>
      <details className="group mt-1">
        <summary className="flex h-11 cursor-pointer list-none items-center text-[14px] font-semibold text-elec-yellow underline-offset-4 hover:underline touch-manipulation [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">Read the statement</span>
          <span className="hidden group-open:inline">Hide the statement</span>
        </summary>
        <div className="space-y-3 pb-1">
          {w.statement && (
            <p className="whitespace-pre-line text-[15px] leading-relaxed text-white">
              {w.statement}
            </p>
          )}
          {w.criteria.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {w.criteria.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/[0.16] px-2.5 py-1 text-[12.5px] text-white"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
          {w.statement_hash && (
            <div>
              <p className="text-[13px] font-medium text-white">Fingerprint</p>
              <p className="mt-0.5 break-all font-mono text-[12px] text-white">
                {w.statement_hash}
              </p>
              <p className="mt-1 text-[12.5px] text-white">
                Taken when the witness signed. If a word of the statement changed, this would no
                longer match.
              </p>
            </div>
          )}
        </div>
      </details>
    </div>
  );
}

function SharedPortfolioBody({ token }: { token: string }) {
  const { data, isLoading, error, reloadComments, reloadSubmissions, anonClient } =
    useSharedPortfolioStructured(token);

  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRole, setReviewerRole] = useState('assessor');
  const [signed, setSigned] = useState<Record<string, string>>({});
  const [openUnit, setOpenUnit] = useState<string | null>(null);
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});
  const [feedbackDraft, setFeedbackDraft] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ id: string; text: string; bad?: boolean } | null>(null);
  const [downloading, setDownloading] = useState(false);
  // "Become their assessor" (ELE-2016)
  const [askOpen, setAskOpen] = useState(false);
  const [askEmail, setAskEmail] = useState('');
  const [askOrg, setAskOrg] = useState('');
  const [askRole, setAskRole] = useState<'assessor' | 'iqa' | 'epa_assessor'>('assessor');
  const [askState, setAskState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [askError, setAskError] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // One call signs every file this share covers. Signed links last an hour,
  // so re-sign at 50 minutes, and once more if an image fails to load.
  const [signState, setSignState] = useState<'loading' | 'done' | 'failed'>('loading');
  const [signRound, setSignRound] = useState(0);
  useEffect(() => {
    if (!token) return;
    let active = true;
    anonClient.functions
      .invoke('sign-shared-portfolio-evidence', { body: { token } })
      .then(({ data: res, error: e }) => {
        if (!active) return;
        if (e || !res?.signed) {
          setSignState('failed');
          return;
        }
        setSigned(res.signed as Record<string, string>);
        setSignState('done');
      })
      .catch(() => active && setSignState('failed'));
    const timer = window.setTimeout(() => setSignRound((n) => n + 1), 50 * 60 * 1000);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [token, anonClient, signRound]);
  const resignOnce = useMemo(() => {
    let done = false;
    return () => {
      if (done) return;
      done = true;
      setSignRound((n) => n + 1);
    };
  }, [signRound]);

  const filesFor = (e: SharedEvidenceEntry) => {
    const list = (Array.isArray(e.files) ? e.files : []).filter((f) => f?.url);
    if (list.length === 0 && e.file_url)
      list.push({ name: 'Attachment', type: e.file_type ?? undefined, url: e.file_url });
    return list.map((f) => ({
      ...f,
      href: signed[f.url!] ?? (f.url!.includes('/storage/v1/object/') ? undefined : f.url),
    }));
  };

  // ELE-1917: when the assessment record is present, "done" means PASSED by
  // the assessor, the same figure the learner and their college read. The
  // older is_met flag counts any evidence at all and would disagree with the
  // record further down this page.
  const passedKeys = useMemo(() => {
    const decisions = data?.decisions;
    if (!Array.isArray(decisions)) return null;
    return new Set(
      decisions
        // state, not decision: a pass the IQA queried reads as needs more.
        .filter((d) => d.state === 'passed')
        .map((d) => `${d.unit_code}|${d.ac_code}`)
    );
  }, [data]);
  // The unit list carries "1.1 identify the scope of BS 7671": the criterion
  // code is its first word.
  const isDone = useCallback(
    (unit: string, ac: { ac_text: string; is_met: boolean }) => {
      if (!passedKeys) return ac.is_met;
      const code = ac.ac_text.trim().split(/\s+/)[0] ?? '';
      return passedKeys.has(`${unit}|${code}`);
    },
    [passedKeys]
  );

  const stats = useMemo(() => {
    if (!data) return null;
    // ELE-2016: with the criteria record, "passed" is the assessor's figure,
    // the one the learner and their college read.
    if (Array.isArray(data.criteria) && data.criteria.length > 0) {
      return {
        met: data.criteria.filter((c) => isPassedState(c.state)).length,
        total: data.criteria.length,
        items: data.entries.length,
      };
    }
    let met = 0;
    let total = 0;
    for (const u of data.units)
      for (const lo of u.learning_outcomes)
        for (const ac of lo.assessment_criteria) {
          total += 1;
          if (isDone(u.unit_code, ac)) met += 1;
        }
    return { met, total, items: data.entries.length };
  }, [data, isDone]);

  // Assessment record, grouped by unit in the order the server sent it.
  const record = useMemo(() => {
    const decisions = data?.decisions ?? [];
    const counts: Record<RecordState, number> = { passed: 0, needs_more: 0, with_assessor: 0 };
    const units: { code: string; title: string | null; rows: SharedDecision[] }[] = [];
    for (const d of decisions) {
      counts[recordState(d)] += 1;
      let u = units.find((x) => x.code === d.unit_code);
      if (!u) units.push((u = { code: d.unit_code, title: d.unit_title, rows: [] }));
      u.rows.push(d);
    }
    return { counts, units, total: decisions.length };
  }, [data]);
  // Units and criteria in the states LearnerAssessmentView uses (ELE-2016).
  const criteriaUnits = useMemo(() => {
    const list = data?.criteria;
    if (!Array.isArray(list) || list.length === 0) return null;
    const units: { code: string; title: string | null; rows: SharedCriterion[] }[] = [];
    for (const c of list) {
      let u = units.find((x) => x.code === c.unit_code);
      if (!u) units.push((u = { code: c.unit_code, title: c.unit_title, rows: [] }));
      u.rows.push(c);
    }
    const counts = {} as Record<AcState, number>;
    for (const c of list) counts[c.state as AcState] = (counts[c.state as AcState] ?? 0) + 1;
    return { units, counts };
  }, [data]);
  // What the learner mapped each item to. Never an AI suggestion.
  const mappedFor = (id: string) => {
    const rows = data?.item_criteria;
    if (!Array.isArray(rows)) return null;
    return rows.filter((r) => r.item_id === id).map((r) => `${r.unit_code} AC ${r.ac_code}`);
  };
  const witnessesFor = (id: string) =>
    (data?.witnesses ?? []).filter((w) => w.portfolio_item_id === id);
  const otherWitnesses = useMemo(() => {
    const shown = new Set((data?.entries ?? []).map((e) => e.id));
    return (data?.witnesses ?? []).filter(
      (w) => !w.portfolio_item_id || !shown.has(w.portfolio_item_id)
    );
  }, [data]);

  const commentsFor = (id: string) => (data?.comments ?? []).filter((c) => c.context_id === id);
  const pending = (data?.submissions ?? []).filter((s) =>
    ['submitted', 'resubmitted', 'under_review'].includes(s.status)
  );

  const sendComment = async (evidenceId: string) => {
    const content = commentDraft[evidenceId]?.trim();
    if (!token || !content) return;
    if (!reviewerName.trim()) {
      setNotice({ id: evidenceId, text: 'Add your name at the top first.', bad: true });
      return;
    }
    setBusy(evidenceId);
    const { data: res, error: e } = await anonClient.rpc('add_share_comment', {
      p_share_token: token,
      p_author_name: reviewerName.trim(),
      p_author_role: reviewerRole,
      p_content: content,
      p_evidence_id: evidenceId,
    });
    setBusy(null);
    const r = res as { success?: boolean; error?: string } | null;
    if (e || !r?.success) {
      setNotice({
        id: evidenceId,
        text: r?.error ?? 'Could not send. Check your connection and try again.',
        bad: true,
      });
      return;
    }
    setCommentDraft((p) => ({ ...p, [evidenceId]: '' }));
    setNotice({ id: evidenceId, text: 'Sent. The apprentice has been notified.' });
    void reloadComments();
  };

  const sendFeedback = async (submissionId: string) => {
    const content = feedbackDraft[submissionId]?.trim();
    if (!token || !content) return;
    if (!reviewerName.trim()) {
      setNotice({ id: submissionId, text: 'Add your name at the top first.', bad: true });
      return;
    }
    setBusy(submissionId);
    const { data: res, error: e } = await anonClient.rpc('review_shared_submission', {
      p_share_token: token,
      p_submission_id: submissionId,
      p_reviewer_name: reviewerName.trim(),
      p_reviewer_role: reviewerRole,
      p_action: 'feedback',
      p_feedback: content,
    });
    setBusy(null);
    const r = res as { success?: boolean; error?: string } | null;
    if (e || !r?.success) {
      setNotice({
        id: submissionId,
        text: r?.error ?? 'Could not send. Check your connection and try again.',
        bad: true,
      });
      return;
    }
    setFeedbackDraft((p) => ({ ...p, [submissionId]: '' }));
    setNotice({ id: submissionId, text: 'Feedback sent. The apprentice has been notified.' });
    void reloadSubmissions();
    void reloadComments();
  };

  const askToAssess = async () => {
    if (!token) return;
    setAskError(null);
    if (reviewerName.trim().length < 2) {
      setAskError('Add your name first.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(askEmail.trim())) {
      setAskError('Add the email you want the invite sent to.');
      return;
    }
    setAskState('sending');
    const { data: res, error: e } = await anonClient.rpc(
      'request_to_assess' as never,
      {
        p_share_token: token,
        p_name: reviewerName.trim(),
        p_email: askEmail.trim(),
        p_role: askRole,
        p_organisation: askOrg.trim() || null,
      } as never
    );
    const r = res as { success?: boolean; error?: string } | null;
    if (e || !r?.success) {
      setAskState('idle');
      setAskError(r?.error ?? 'Could not send. Check your connection and try again.');
      return;
    }
    setAskState('sent');
  };

  const download = async () => {
    if (!token) return;
    setDownloading(true);
    setDownloadError(null);
    try {
      // Rendered in PDFMonkey from the share, scoped to what it covers (ELE-2017).
      await downloadLearnerDocument({ kind: 'shared_portfolio', token }, anonClient);
    } catch (e) {
      setDownloadError((e as Error).message);
    } finally {
      setDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <PublicPageShell>
        <PublicEyebrow>Shared portfolio</PublicEyebrow>
        <div className="mt-6 flex items-center gap-2 text-[15px] text-white">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading the portfolio…
        </div>
      </PublicPageShell>
    );
  }

  if (error || !data || !stats) {
    const expired = !!error && /expired|invalid/i.test(error);
    return (
      <PublicPageShell>
        <PublicEyebrow>Shared portfolio</PublicEyebrow>
        <PublicH1>{expired ? 'This link has expired' : "This portfolio can't be opened"}</PublicH1>
        <p className="mt-4 text-[17px] leading-[1.55] text-white">
          {expired
            ? 'The apprentice has turned this link off or it has run out. Ask them for a new one.'
            : 'Check the link you were sent, or ask the apprentice to share it again.'}
        </p>
      </PublicPageShell>
    );
  }

  const a = data.apprentice;
  const subtitle = [
    a.qualification !== 'Not selected' ? a.qualification : null,
    a.training_provider || null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <PublicPageShell width="wide">
      <div className="mx-auto max-w-[56rem]">
        {/* Who */}
        <PublicEyebrow>
          {a.share_title && a.share_title !== 'Portfolio' ? a.share_title : 'Shared portfolio'}
        </PublicEyebrow>
        <PublicH1>{a.name}</PublicH1>
        {subtitle && <p className="mt-3 text-[17px] leading-[1.55] text-white">{subtitle}</p>}
        {a.share_description && (
          <p className="mt-2 text-[15px] leading-[1.55] text-white">{a.share_description}</p>
        )}

        {/* How far */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <PublicCard>
            <p className="font-mono text-[30px] font-bold tabular-nums text-white">
              {stats.met}
              <span className="text-[18px]"> / {stats.total}</span>
            </p>
            <p className="mt-1 text-[14px] text-white">
              {passedKeys ? 'criteria passed by the assessor' : 'criteria evidenced'}
            </p>
          </PublicCard>
          <PublicCard>
            <p className="font-mono text-[30px] font-bold tabular-nums text-white">{stats.items}</p>
            <p className="mt-1 text-[14px] text-white">
              piece{stats.items === 1 ? '' : 's'} of evidence shared
            </p>
          </PublicCard>
          <PublicCard>
            {data.otj && data.otj.verified_hours != null ? (
              <>
                <p className="font-mono text-[30px] font-bold tabular-nums text-white">
                  {data.otj.verified_hours}
                  {(data.otj.required_hours ?? 0) > 0 && (
                    <span className="text-[18px]"> / {data.otj.required_hours}h</span>
                  )}
                  {!((data.otj.required_hours ?? 0) > 0) && <span className="text-[18px]">h</span>}
                </p>
                <p className="mt-1 text-[14px] text-white">
                  verified off-the-job hours
                  {data.otj.frozen_at ? `, to ${when(data.otj.frozen_at)}` : ''}
                </p>
              </>
            ) : data.otj_hours.target > 0 ? (
              <>
                <p className="font-mono text-[30px] font-bold tabular-nums text-white">
                  {data.otj_hours.current}
                  <span className="text-[18px]"> / {data.otj_hours.target}h</span>
                </p>
                <p className="mt-1 text-[14px] text-white">verified off-the-job hours</p>
              </>
            ) : (
              <>
                <p className="font-mono text-[30px] font-bold tabular-nums text-white">
                  {data.otj_hours.current}h
                </p>
                <p className="mt-1 text-[14px] text-white">off-the-job hours logged</p>
              </>
            )}
          </PublicCard>
        </div>

        <button
          type="button"
          onClick={download}
          disabled={downloading}
          className={cn(PUBLIC_SECONDARY_CTA, 'mt-4 sm:w-auto')}
        >
          {downloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {downloading ? 'Making the PDF…' : 'Download as PDF'}
        </button>
        {downloadError && <p className="mt-2 text-[14px] text-red-300">{downloadError}</p>}

        {/* Reviewer */}
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <PublicCard className="space-y-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
                Advisory only
              </p>
              <h2 className="mt-1 text-[18px] font-bold text-white">Leaving feedback?</h2>
              <p className="mt-1 text-[14px] text-white">
                Add your name once and it goes on every comment. Comments here help{' '}
                {a.name.split(' ')[0]} improve; they do not pass or fail anything.
              </p>
            </div>
            <div>
              <label
                htmlFor="reviewer-name"
                className="mb-1 block text-[13px] font-medium text-white"
              >
                Your name
              </label>
              <input
                id="reviewer-name"
                className={inputCn}
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <fieldset>
              <legend className="mb-2 text-[13px] font-medium text-white">You are their</legend>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    aria-pressed={reviewerRole === r.key}
                    onClick={() => setReviewerRole(r.key)}
                    className={cn(
                      'h-11 rounded-full border px-4 text-[14px] touch-manipulation',
                      reviewerRole === r.key ? chipOn : chipOff
                    )}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </PublicCard>

          <PublicCard className="space-y-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
                Official decisions
              </p>
              <h2 className="mt-1 text-[18px] font-bold text-white">Become their assessor</h2>
              <p className="mt-1 text-[14px] text-white">
                To pass criteria, you need {a.name.split(' ')[0]}'s invite. Ask here and they get
                your request in Elec-Mate. Assessor accounts are free.
              </p>
            </div>
            {askState === 'sent' ? (
              <p role="status" className="text-[15px] font-semibold text-emerald-300">
                Request sent. When {a.name.split(' ')[0]} invites you, the link goes to{' '}
                {askEmail.trim()}.
              </p>
            ) : !askOpen ? (
              <button
                type="button"
                onClick={() => setAskOpen(true)}
                className={cn(PUBLIC_PRIMARY_CTA, 'h-12 text-[15px] sm:w-auto')}
              >
                Ask to be their assessor
              </button>
            ) : (
              <>
                <div>
                  <label
                    htmlFor="ask-email"
                    className="mb-1 block text-[13px] font-medium text-white"
                  >
                    Your email
                  </label>
                  <input
                    id="ask-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    className={inputCn}
                    value={askEmail}
                    onChange={(e) => setAskEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="ask-org"
                    className="mb-1 block text-[13px] font-medium text-white"
                  >
                    Organisation (optional)
                  </label>
                  <input
                    id="ask-org"
                    className={inputCn}
                    value={askOrg}
                    onChange={(e) => setAskOrg(e.target.value)}
                    autoComplete="organization"
                  />
                </div>
                <fieldset>
                  <legend className="mb-2 text-[13px] font-medium text-white">As their</legend>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        ['assessor', 'Assessor'],
                        ['iqa', 'IQA'],
                        ['epa_assessor', 'End-point assessor'],
                      ] as const
                    ).map(([k, label]) => (
                      <button
                        key={k}
                        type="button"
                        aria-pressed={askRole === k}
                        onClick={() => setAskRole(k)}
                        className={cn(
                          'h-11 rounded-full border px-4 text-[14px] touch-manipulation',
                          askRole === k ? chipOn : chipOff
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>
                {!reviewerName.trim() && (
                  <p className="text-[13px] text-white">
                    Your name comes from the box on the left.
                  </p>
                )}
                {askError && (
                  <p role="alert" className="text-[14px] text-red-300">
                    {askError}
                  </p>
                )}
                <button
                  type="button"
                  disabled={askState === 'sending'}
                  onClick={() => void askToAssess()}
                  className={cn(PUBLIC_PRIMARY_CTA, 'h-12 text-[15px] sm:w-auto')}
                >
                  {askState === 'sending' ? 'Sending…' : 'Send my request'}
                </button>
              </>
            )}
          </PublicCard>
        </div>

        {/* Evidence */}
        <section className="mt-12 space-y-4">
          <H2>Evidence</H2>
          {data.entries.length === 0 && (
            <p className="text-[15px] text-white">No evidence has been shared yet.</p>
          )}
          {data.entries.map((e) => {
            const files = filesFor(e);
            const thread = commentsFor(e.id);
            const witnesses = witnessesFor(e.id);
            return (
              <PublicCard key={e.id} className="space-y-4">
                <div>
                  <h3 className="text-[19px] font-bold leading-snug text-white">{e.title}</h3>
                  <p className="mt-1 text-[13px] text-white">
                    {when(e.created_at)}
                    {e.category ? ` · ${e.category}` : ''}
                  </p>
                </div>
                {e.description && (
                  <p className="whitespace-pre-line text-[15px] leading-relaxed text-white">
                    {e.description}
                  </p>
                )}

                {files.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {files.map((f, i) =>
                      !f.href ? (
                        signState === 'loading' ? (
                          <div
                            key={i}
                            className="aspect-square animate-pulse rounded-xl border border-white/[0.1] bg-white/[0.04]"
                            aria-label="Loading file"
                          />
                        ) : (
                          <div
                            key={i}
                            className="flex aspect-square items-center justify-center rounded-xl border border-white/[0.12] p-2 text-center text-[12.5px] text-white"
                          >
                            File unavailable
                          </div>
                        )
                      ) : isImage(f) ? (
                        <a
                          key={i}
                          href={f.href}
                          target="_blank"
                          rel="noreferrer"
                          className="block aspect-square overflow-hidden rounded-xl border border-white/[0.12] touch-manipulation"
                        >
                          <img
                            src={f.href}
                            alt={f.name ?? 'Evidence photo'}
                            loading="lazy"
                            onError={resignOnce}
                            className="h-full w-full object-cover"
                          />
                        </a>
                      ) : (
                        <a
                          key={i}
                          href={f.href}
                          target="_blank"
                          rel="noreferrer"
                          className="col-span-3 flex min-h-11 items-center rounded-xl border border-white/[0.12] px-4 text-[14px] font-semibold text-white touch-manipulation sm:col-span-4"
                        >
                          <span className="truncate">Open {f.name ?? 'file'}</span>
                        </a>
                      )
                    )}
                  </div>
                )}

                {(mappedFor(e.id) ?? e.assessment_criteria_met ?? []).length > 0 && (
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-elec-yellow">
                      Mapped by {a.name.split(' ')[0]}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {(mappedFor(e.id) ?? e.assessment_criteria_met ?? []).map((c) => (
                        <span
                          key={c}
                          className="rounded-full border border-white/[0.16] px-2.5 py-1 text-[12.5px] text-white"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {e.reflection_notes && (
                  <div className="border-t border-white/[0.1] pt-3">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-elec-yellow">
                      In their words
                    </p>
                    <p className="mt-1 whitespace-pre-line text-[15px] leading-relaxed text-white">
                      {e.reflection_notes}
                    </p>
                  </div>
                )}

                {witnesses.map((w) => (
                  <WitnessStatement key={w.id} w={w} />
                ))}

                {/* Thread */}
                <div className="space-y-3 border-t border-white/[0.1] pt-3">
                  {thread.map((c) => (
                    <div key={c.id} className="rounded-xl border border-white/[0.1] p-3">
                      <p className="text-[13px] font-semibold text-white">
                        {c.author_name}
                        <span className="font-normal">
                          {' '}
                          · {c.author_role} · {when(c.created_at)}
                        </span>
                      </p>
                      <p className="mt-1 whitespace-pre-line text-[14px] text-white">{c.content}</p>
                    </div>
                  ))}
                  <label htmlFor={`c-${e.id}`} className="block text-[13px] font-medium text-white">
                    Comment on this
                  </label>
                  <textarea
                    id={`c-${e.id}`}
                    className={textareaCn}
                    value={commentDraft[e.id] ?? ''}
                    onChange={(ev) => setCommentDraft((p) => ({ ...p, [e.id]: ev.target.value }))}
                    placeholder="What's good, what's missing"
                  />
                  {notice?.id === e.id && (
                    <p
                      role="status"
                      className={cn(
                        'text-[14px]',
                        notice.bad ? 'text-red-300' : 'text-emerald-300'
                      )}
                    >
                      {notice.text}
                    </p>
                  )}
                  <button
                    type="button"
                    disabled={busy === e.id || !(commentDraft[e.id] ?? '').trim()}
                    onClick={() => sendComment(e.id)}
                    className={cn(PUBLIC_SECONDARY_CTA, 'h-12 text-[15px] sm:w-auto')}
                  >
                    {busy === e.id ? 'Sending…' : 'Send comment'}
                  </button>
                </div>
              </PublicCard>
            );
          })}
        </section>

        {/* Submitted units */}
        {pending.length > 0 && (
          <section className="mt-12 space-y-4">
            <H2>Submitted for assessment</H2>
            {pending.map((s) => (
              <PublicCard key={s.id} className="space-y-3">
                <h3 className="text-[18px] font-bold text-white">{s.category_name}</h3>
                <p className="text-[13px] text-white">
                  {s.submission_count > 1 ? `Attempt ${s.submission_count}` : 'First submission'} ·{' '}
                  {when(s.submitted_at)}
                </p>
                <label htmlFor={`f-${s.id}`} className="block text-[13px] font-medium text-white">
                  Your feedback (advisory)
                </label>
                <textarea
                  id={`f-${s.id}`}
                  className={textareaCn}
                  value={feedbackDraft[s.id] ?? ''}
                  onChange={(ev) => setFeedbackDraft((p) => ({ ...p, [s.id]: ev.target.value }))}
                  placeholder="Strengths, gaps, and what to add"
                />
                {notice?.id === s.id && (
                  <p
                    role="status"
                    className={cn('text-[14px]', notice.bad ? 'text-red-300' : 'text-emerald-300')}
                  >
                    {notice.text}
                  </p>
                )}
                <button
                  type="button"
                  disabled={busy === s.id || !(feedbackDraft[s.id] ?? '').trim()}
                  onClick={() => sendFeedback(s.id)}
                  className={cn(PUBLIC_SECONDARY_CTA, 'h-12 text-[15px] sm:w-auto')}
                >
                  {busy === s.id ? 'Sending…' : 'Send feedback'}
                </button>
              </PublicCard>
            ))}
          </section>
        )}

        {/* Assessment record (ELE-1885) */}
        {(record.total > 0 || otherWitnesses.length > 0) && (
          <section className="mt-12 space-y-4">
            <H2>Assessment record</H2>
            <p className="text-[15px] leading-[1.55] text-white">
              What {a.name.split(' ')[0]}'s assessor has decided so far, criterion by criterion.
              This is read-only.
            </p>
            {record.total > 0 && (
              <>
                <div className="grid grid-cols-3 gap-3">
                  {(['passed', 'needs_more', 'with_assessor'] as RecordState[]).map((k) => (
                    <PublicCard key={k} className="p-4 sm:p-5">
                      <p className="font-mono text-[26px] font-bold tabular-nums text-white">
                        {record.counts[k]}
                      </p>
                      <p className="mt-1 text-[13.5px] leading-snug text-white">
                        {RECORD_LABEL[k].toLowerCase()}
                      </p>
                    </PublicCard>
                  ))}
                </div>
                {record.units.map((u) => (
                  <PublicCard key={u.code} className="p-0 sm:p-0">
                    <p className="px-5 pt-5 text-[15px] font-bold leading-snug text-white sm:px-6">
                      <span className="font-mono">{u.code}</span>
                      {u.title ? ` ${u.title}` : ''}
                    </p>
                    <ul className="mt-2 divide-y divide-white/[0.08]">
                      {u.rows.map((d) => {
                        const st = recordState(d);
                        return (
                          <li key={d.ac_code} className="px-5 py-4 sm:px-6">
                            <div className="flex items-start gap-3">
                              <span className="w-12 shrink-0 font-mono text-[13px] font-bold text-white">
                                {d.ac_code}
                              </span>
                              <span className="min-w-0 flex-1 text-[14px] leading-snug text-white">
                                {d.ac_text ?? ''}
                              </span>
                              <span
                                className={cn(
                                  'shrink-0 rounded-full border px-2.5 py-0.5 text-[12px] font-semibold',
                                  RECORD_PILL[st]
                                )}
                              >
                                {RECORD_LABEL[st]}
                              </span>
                            </div>
                            {d.decided_at && (
                              <div className="mt-2 space-y-1 pl-[3.75rem]">
                                <p className="text-[13px] text-white">
                                  {st === 'with_assessor'
                                    ? 'Sent back for more, then resubmitted. '
                                    : ''}
                                  {d.decision === 'passed' ? 'Passed' : 'Needs more'} by{' '}
                                  {assessorWithQualifications(
                                    d.assessor_name || 'the assessor',
                                    d.assessor_qualifications
                                  )}
                                  {d.assessed_at
                                    ? d.assessed_at === 'Independent assessor'
                                      ? ', independent assessor'
                                      : ` at ${d.assessed_at}`
                                    : ''}
                                  , {when(d.decided_at)}
                                  {d.iqa_verdict === 'confirmed'
                                    ? '. Confirmed by quality assurance.'
                                    : ''}
                                  {d.iqa_verdict === 'not_confirmed'
                                    ? '. Queried by quality assurance.'
                                    : ''}
                                </p>
                                {d.feedback && (
                                  <p className="whitespace-pre-line text-[14px] leading-relaxed text-white">
                                    {d.feedback}
                                  </p>
                                )}
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </PublicCard>
                ))}
              </>
            )}
            {otherWitnesses.length > 0 && (
              <PublicCard className="space-y-1">
                <h3 className="text-[18px] font-bold text-white">Witness statements</h3>
                {otherWitnesses.map((w) => (
                  <WitnessStatement key={w.id} w={w} />
                ))}
              </PublicCard>
            )}
          </section>
        )}

        {/* By unit: the criteria record, in LearnerAssessmentView's states */}
        {criteriaUnits && (
          <section className="mt-12 space-y-4">
            <H2>Progress by unit</H2>
            <p className="text-[15px] leading-[1.55] text-white">
              Every criterion of the qualification, in the state the assessment record shows.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Key">
              {CRITERION_ORDER.filter((k) => (criteriaUnits.counts[k] ?? 0) > 0).map((k) => (
                <span key={k} className="inline-flex items-center gap-2 text-[13px] text-white">
                  <span className={cn('h-2.5 w-2.5 rounded-full', STATE_SWATCH[k])} aria-hidden />
                  {CRITERION_LABEL[k]}{' '}
                  <span className="font-mono tabular-nums">{criteriaUnits.counts[k]}</span>
                </span>
              ))}
            </div>
            <PublicCard className="p-0 sm:p-0">
              <ul className="divide-y divide-white/[0.08]">
                {criteriaUnits.units.map((u) => {
                  const passed = u.rows.filter((r) => isPassedState(r.state)).length;
                  const open = openUnit === u.code;
                  return (
                    <li key={u.code}>
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => setOpenUnit(open ? null : u.code)}
                        className="flex min-h-[60px] w-full items-center gap-4 px-5 py-3 text-left touch-manipulation sm:px-6"
                      >
                        <span className="w-14 shrink-0 font-mono text-[14px] font-bold text-white">
                          {u.code}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[15px] font-semibold leading-snug text-white">
                            {u.title}
                          </span>
                          <span
                            className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-white/[0.08]"
                            aria-hidden
                          >
                            {u.rows.map((r) => (
                              <span
                                key={r.ac_code}
                                className={cn('h-full flex-1', STATE_SWATCH[r.state as AcState])}
                              />
                            ))}
                          </span>
                        </span>
                        <span className="shrink-0 font-mono text-[14px] tabular-nums text-white">
                          {passed}/{u.rows.length}
                        </span>
                      </button>
                      {open && (
                        <ul className="space-y-2 px-5 pb-5 sm:px-6">
                          {u.rows.map((r) => (
                            <li
                              key={r.ac_code}
                              className="flex items-start gap-3 text-[14px] text-white"
                            >
                              <span className="w-10 shrink-0 font-mono text-[13px] font-bold">
                                {r.ac_code}
                              </span>
                              <span className="min-w-0 flex-1 leading-snug">{r.ac_text}</span>
                              <span className="inline-flex shrink-0 items-center gap-1.5 text-[12px] font-semibold">
                                <span
                                  className={cn(
                                    'h-2 w-2 rounded-full',
                                    STATE_SWATCH[r.state as AcState]
                                  )}
                                  aria-hidden
                                />
                                {CRITERION_LABEL[r.state as AcState] ?? r.state}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </PublicCard>
          </section>
        )}

        {/* By unit (before the criteria record existed) */}
        {!criteriaUnits && data.units.length > 0 && (
          <section className="mt-12 space-y-4">
            <H2>Progress by unit</H2>
            <PublicCard className="p-0 sm:p-0">
              <ul className="divide-y divide-white/[0.08]">
                {data.units.map((u) => {
                  const acs = u.learning_outcomes.flatMap((lo) => lo.assessment_criteria);
                  const met = acs.filter((x) => isDone(u.unit_code, x)).length;
                  const open = openUnit === u.unit_code;
                  return (
                    <li key={u.unit_code}>
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => setOpenUnit(open ? null : u.unit_code)}
                        className="flex min-h-[60px] w-full items-center gap-4 px-5 py-3 text-left touch-manipulation sm:px-6"
                      >
                        <span className="w-14 shrink-0 font-mono text-[14px] font-bold text-white">
                          {u.unit_code}
                        </span>
                        <span className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-white">
                          {u.unit_title}
                        </span>
                        <span className="shrink-0 font-mono text-[14px] tabular-nums text-white">
                          {met}/{acs.length}
                        </span>
                      </button>
                      {open && (
                        <div className="space-y-4 px-5 pb-5 sm:px-6">
                          {u.learning_outcomes.map((lo) => (
                            <div key={lo.lo_number}>
                              <p className="text-[13px] font-semibold text-elec-yellow">
                                LO {lo.lo_number} {lo.lo_text}
                              </p>
                              <ul className="mt-2 space-y-1.5">
                                {lo.assessment_criteria.map((ac, i) => (
                                  <li key={i} className="flex gap-3 text-[14px] text-white">
                                    <span
                                      className={cn(
                                        'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold',
                                        isDone(u.unit_code, ac)
                                          ? 'border-elec-yellow bg-elec-yellow text-black'
                                          : 'border-white/[0.3] text-transparent'
                                      )}
                                      aria-label={
                                        isDone(u.unit_code, ac)
                                          ? passedKeys
                                            ? 'Passed'
                                            : 'Evidenced'
                                          : passedKeys
                                            ? 'Not passed yet'
                                            : 'Not yet evidenced'
                                      }
                                    >
                                      ✓
                                    </span>
                                    <span>{ac.ac_text}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </PublicCard>
          </section>
        )}

        {/* KSBs */}
        {(data.ksb_summary.knowledge.length > 0 || data.ksb_summary.behaviours.length > 0) && (
          <section className="mt-12 space-y-4">
            <H2>Knowledge, skills and behaviours</H2>
            <div className="grid gap-4 lg:grid-cols-2">
              {[
                { label: 'Knowledge', list: data.ksb_summary.knowledge },
                { label: 'Behaviours', list: data.ksb_summary.behaviours },
              ]
                .filter((g) => g.list.length > 0)
                .map((g) => (
                  <PublicCard key={g.label} className="p-0 sm:p-0">
                    <p className="px-5 pt-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-elec-yellow sm:px-6">
                      {g.label}
                    </p>
                    <ul className="mt-2 divide-y divide-white/[0.08]">
                      {g.list.map((k) => (
                        <li
                          key={k.code + k.title}
                          className="flex items-start gap-3 px-5 py-3 sm:px-6"
                        >
                          <span className="w-10 shrink-0 font-mono text-[13px] font-bold text-white">
                            {k.code}
                          </span>
                          <span className="min-w-0 flex-1 text-[14px] leading-snug text-white">
                            {k.title}
                          </span>
                          <span
                            className={cn(
                              'shrink-0 rounded-full border px-2 py-0.5 text-[12px] font-semibold',
                              k.status === 'verified' || k.status === 'completed'
                                ? 'border-emerald-400 text-emerald-300'
                                : 'border-white/[0.2] text-white'
                            )}
                          >
                            {KSB_LABEL[k.status] ?? k.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </PublicCard>
                ))}
            </div>
          </section>
        )}
      </div>
    </PublicPageShell>
  );
}

/* ── ELE-1885: the PIN gate ─────────────────────────────────────────────── */

// The gate's own anon client (no session), like useSharedPortfolioStructured's.
const gateClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
type GateRpc = (
  fn: string,
  args: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;
const gateRpc = gateClient.rpc.bind(gateClient) as unknown as GateRpc;
const unlockedKey = (t: string) => `elec-mate-share-unlocked:${t}`;

function readUnlocked(t: string): string | null {
  try {
    return window.sessionStorage.getItem(unlockedKey(t));
  } catch {
    return null;
  }
}

function PinGate({ urlToken, onUnlocked }: { urlToken: string; onUnlocked: (t: string) => void }) {
  const [pin, setPin] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [lockedUntil, setLockedUntil] = useState<string | null>(null);

  useEffect(() => {
    void gateRpc('get_share_gate', { p_token: urlToken }).then(({ data }) => {
      const d = data as { locked_until?: string | null } | null;
      if (d?.locked_until) setLockedUntil(d.locked_until);
    });
  }, [urlToken]);

  const time = (iso: string) =>
    new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  const submit = async () => {
    if (!/^[0-9]{4,8}$/.test(pin) || busy) return;
    setBusy(true);
    setMessage(null);
    const { data, error } = await gateRpc('unlock_shared_portfolio', {
      p_token: urlToken,
      p_pin: pin,
    });
    setBusy(false);
    const d = data as {
      token?: string;
      error?: string;
      attempts_left?: number;
      locked_until?: string;
    } | null;
    if (error || !d) {
      setMessage('Could not check the PIN. Check your connection and try again.');
      return;
    }
    if (d.token) {
      try {
        window.sessionStorage.setItem(unlockedKey(urlToken), d.token);
      } catch {
        /* storage blocked: the PIN is asked again next time */
      }
      onUnlocked(d.token);
      return;
    }
    setPin('');
    if (d.error === 'locked' && d.locked_until) {
      setLockedUntil(d.locked_until);
      return;
    }
    if (d.error === 'wrong_pin') {
      setMessage(
        d.attempts_left === 1
          ? 'That PIN is not right. One more try before the link locks for 15 minutes.'
          : `That PIN is not right. ${d.attempts_left} tries left.`
      );
      return;
    }
    setMessage('This link has expired or been turned off. Ask the apprentice for a new one.');
  };

  const locked = !!lockedUntil && new Date(lockedUntil) > new Date();

  return (
    <PublicPageShell>
      <div className="mx-auto max-w-[28rem]">
        <PublicEyebrow>Shared portfolio</PublicEyebrow>
        <PublicH1>Enter the PIN</PublicH1>
        <p className="mt-4 text-[17px] leading-[1.55] text-white">
          The apprentice protected this portfolio with a PIN. They will have given it to you
          separately from the link.
        </p>
        <PublicCard className="mt-8 space-y-5">
          {locked ? (
            <p role="alert" className="text-[15px] font-semibold text-orange-300">
              Too many wrong PINs. Try again after {time(lockedUntil!)}.
            </p>
          ) : (
            <>
              <div>
                <label
                  htmlFor="share-pin"
                  className="mb-1 block text-[13px] font-medium text-white"
                >
                  PIN
                </label>
                <input
                  id="share-pin"
                  className={cn(inputCn, 'font-mono text-[22px] tracking-[0.4em]')}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={8}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') void submit();
                  }}
                />
              </div>
              {message && (
                <p role="alert" className="text-[14px] text-red-300">
                  {message}
                </p>
              )}
              <button
                type="button"
                disabled={busy || !/^[0-9]{4,8}$/.test(pin)}
                onClick={() => void submit()}
                className={PUBLIC_PRIMARY_CTA}
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Open the portfolio
              </button>
            </>
          )}
        </PublicCard>
      </div>
    </PublicPageShell>
  );
}

export default function SharedPortfolioView() {
  const { token: urlToken = '' } = useParams<{ token: string }>();
  // undefined while checking; the token every data call uses once known.
  const [token, setToken] = useState<string | undefined>(undefined);
  const [needsPin, setNeedsPin] = useState(false);

  useEffect(() => {
    let active = true;
    setToken(undefined);
    setNeedsPin(false);
    const remembered = urlToken ? readUnlocked(urlToken) : null;
    void gateRpc('get_share_gate', { p_token: urlToken }).then(({ data, error }) => {
      if (!active) return;
      const d = data as { pin_required?: boolean } | null;
      if (!error && d?.pin_required) {
        if (remembered) setToken(remembered);
        else setNeedsPin(true);
      } else {
        setToken(urlToken);
      }
    });
    return () => {
      active = false;
    };
  }, [urlToken]);

  if (needsPin && !token) {
    return (
      <PinGate
        urlToken={urlToken}
        onUnlocked={(t) => {
          setNeedsPin(false);
          setToken(t);
        }}
      />
    );
  }
  if (!token) {
    return (
      <PublicPageShell>
        <PublicEyebrow>Shared portfolio</PublicEyebrow>
        <div className="mt-6 flex items-center gap-2 text-[15px] text-white">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading the portfolio…
        </div>
      </PublicPageShell>
    );
  }
  return <SharedPortfolioBody key={token} token={token} />;
}

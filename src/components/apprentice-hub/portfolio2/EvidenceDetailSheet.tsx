/**
 * EvidenceDetailSheet — the single place to work on one piece of evidence
 * (ELE-1893; finishes ELE-1867 / ELE-1868 / ELE-1869 on the learner side).
 *
 *   media → what you did → the criteria it covers (state + who says so:
 *   you, the AI's suggestion, your assessor) → the decision and feedback,
 *   with "Send again" → witness statements → comments → the audit trail.
 *
 * Actions: claim / unclaim, find criteria with AI (stored as suggestions,
 * never claims), ask a witness, submit for assessment (with the signed
 * declaration, ELE-1875), share, check quality, edit, delete.
 *
 * There is no "Verified" a learner can set. Evidence reads as witnessed only
 * when a witness has signed, and as passed only when an assessor decided it.
 */
import { assessorWithQualifications } from '@/lib/assessorQualifications';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  FileText,
  Loader2,
  Pencil,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { downloadLearnerDocument } from '@/lib/documents/learnerDocuments';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { EvidenceImage } from '@/components/shared/EvidenceImage';
import { openEvidence } from '@/lib/evidenceUrl';
import { copyToClipboard } from '@/utils/clipboard';
import { shortHash } from '@/lib/portfolio/contentHash';
import { usePortfolioComments } from '@/hooks/portfolio/usePortfolioComments';
import { usePortfolioSharing } from '@/hooks/portfolio/usePortfolioSharing';
import { useAIEvidenceTagger } from '@/hooks/portfolio/useAIEvidenceTagger';
import { useEvidenceValidator } from '@/hooks/portfolio/useEvidenceValidator';
import { EvidenceValidationReport } from '@/components/portfolio-hub/ai/EvidenceValidationReport';
import {
  notifyPortfolioChanged,
  type ItemCriterion,
  type ItemWitness,
  type PortfolioItemView,
  type UsePortfolioResult,
} from '@/hooks/portfolio/usePortfolio';
import type { AcState } from '@/hooks/portfolio/usePortfolioAcState';
import { notifyDoNextChanged } from '@/hooks/useMyDoNext';
import { AskWitnessSheet } from './AskWitnessSheet';
import { ObservationPanel } from './ObservationPanel';
import { aiProvenanceLine } from '@/hooks/portfolio/usePortfolioAcState';
import { SubmitEvidenceSheet } from './SubmitEvidenceSheet';
import {
  ITEM_STATE_CHIP,
  itemStateLabel,
  P_BTN,
  P_BTN_PRIMARY,
  P_INPUT,
  P_LINK,
  StateChip,
  fmtDate,
  fmtDateTime,
} from './ui';

const SOURCE_LABEL: Record<ItemCriterion['source'], string> = {
  learner: 'You',
  ai_suggested: 'AI suggestion',
  assessor: 'Your assessor',
};
const LOCKED = new Set<AcState>(['passed', 'iqa_confirmed', 'submitted']);
const NEEDS = new Set<AcState>(['referred', 'not_yet', 'iqa_rejected']);
const isImage = (type: string, url: string) =>
  type ? type.startsWith('image') : /\.(jpe?g|png|webp|heic|gif)(\?|$)/i.test(url);

interface AuditEvent {
  id: number;
  action: string;
  actor_role: string;
  summary: Record<string, unknown>;
  content_hash: string | null;
  created_at: string;
}

const AUDIT_LABEL: Record<string, string> = {
  evidence_added: 'Evidence added',
  evidence_edited: 'Evidence changed',
  evidence_deleted: 'Evidence deleted',
  criterion_claimed: 'Criterion claimed',
  criterion_suggested: 'AI suggested a criterion',
  criterion_suggestion_confirmed: 'Suggestion confirmed',
  criterion_unclaimed: 'Criterion unclaimed',
  criterion_tagged_by_assessor: 'Assessor tied a criterion',
  item_submitted: 'Sent for assessment',
  decision_passed: 'Passed',
  decision_referred: 'Needs more',
  decision_not_yet: 'Not yet',
  decision_superseded: 'Earlier decision replaced',
  iqa_confirmed: 'IQA confirmed',
  iqa_not_confirmed: 'IQA queried',
  witness_requested: 'Witness asked',
  witness_signed: 'Witness signed',
  witness_withdrawn: 'Witness request withdrawn',
  shared: 'Shared',
  supervisor_verified: 'Supervisor countersigned',
  observation_recorded: 'Assessor recorded it',
  observation_acknowledged: 'You acknowledged it',
};

const ROLE_LABEL: Record<string, string> = {
  learner: 'you',
  assessor: 'assessor',
  iqa: 'IQA',
  staff: 'college',
  witness: 'witness',
  system: 'system',
};

export function EvidenceDetailSheet({
  item,
  portfolio,
  open,
  onOpenChange,
  onEdit,
  onInviteAssessor,
}: {
  item: PortfolioItemView | null;
  portfolio: UsePortfolioResult;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onEdit?: (itemId: string) => void;
  /** No college and no assessor yet: Submit becomes "invite an assessor". */
  onInviteAssessor?: () => void;
}) {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const { getCommentsForEvidence, addComment } = usePortfolioComments();
  const { createShareLink, getShareUrl } = usePortfolioSharing();
  const { analyze, isAnalyzing } = useAIEvidenceTagger();
  const { validate, isValidating, result: validation } = useEvidenceValidator();

  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [witnessOpen, setWitnessOpen] = useState(false);
  const [witnessToken, setWitnessToken] = useState<string | null>(null);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerQ, setPickerQ] = useState('');
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [comment, setComment] = useState('');
  const [audit, setAudit] = useState<AuditEvent[]>([]);
  const [openStatement, setOpenStatement] = useState<string | null>(null);
  const [ackComment, setAckComment] = useState('');

  const itemId = item?.id ?? null;

  const loadAudit = useCallback(async () => {
    if (!itemId || !portfolio.learnerId) return;
    const [direct, decisions, witnesses, observed] = await Promise.all([
      supabase
        .from('portfolio_audit_events' as never)
        .select('id, action, actor_role, summary, content_hash, created_at')
        .eq('learner_id', portfolio.learnerId)
        .eq('object_id', itemId)
        .order('created_at', { ascending: false })
        .limit(80),
      supabase
        .from('portfolio_audit_events' as never)
        .select('id, action, actor_role, summary, content_hash, created_at')
        .eq('learner_id', portfolio.learnerId)
        .eq('object_type', 'assessment_decision')
        .contains('summary', { evidence_item_ids: [itemId] } as never)
        .order('created_at', { ascending: false })
        .limit(40),
      supabase
        .from('portfolio_audit_events' as never)
        .select('id, action, actor_role, summary, content_hash, created_at')
        .eq('learner_id', portfolio.learnerId)
        .eq('object_type', 'witness_statement')
        .contains('summary', { portfolio_item_id: itemId } as never)
        .order('created_at', { ascending: false })
        .limit(20),
      supabase
        .from('portfolio_audit_events' as never)
        .select('id, action, actor_role, summary, content_hash, created_at')
        .eq('learner_id', portfolio.learnerId)
        .eq('object_type', 'college_observation')
        .contains('summary', { portfolio_item_id: itemId } as never)
        .order('created_at', { ascending: false })
        .limit(10),
    ]);
    const all = [
      ...((direct.data ?? []) as unknown as AuditEvent[]),
      ...((decisions.data ?? []) as unknown as AuditEvent[]),
      ...((witnesses.data ?? []) as unknown as AuditEvent[]),
      ...((observed.data ?? []) as unknown as AuditEvent[]),
    ];
    const seen = new Set<number>();
    setAudit(
      all
        .filter((e) => (seen.has(e.id) ? false : (seen.add(e.id), true)))
        .sort((a, b) => b.created_at.localeCompare(a.created_at) || b.id - a.id)
    );
  }, [itemId, portfolio.learnerId]);

  useEffect(() => {
    if (open) {
      setShareUrl(null);
      setConfirmDelete(false);
      setPickerOpen(false);
      setPickerQ('');
      void loadAudit();
    }
  }, [open, loadAudit, item?.contentHash, item?.criteria.length, item?.submission?.id]);

  /* ─── Criteria ─────────────────────────────────────────────────────── */
  const learnerClaims = useMemo(
    () => (item?.claimed ?? []).filter((c) => c.source === 'learner'),
    [item?.claimed]
  );

  const writeClaims = async (
    next: { unit_code: string; ac_code: string }[],
    key: string,
    suggested?: unknown[]
  ) => {
    if (!item) return false;
    setBusyKey(key);
    const { error } = await supabase.rpc(
      'set_portfolio_item_criteria' as never,
      {
        p_item_id: item.id,
        p_claimed: next,
        p_suggested: suggested ?? null,
      } as never
    );
    setBusyKey(null);
    if (error) {
      toast({ title: 'Not saved', description: error.message, variant: 'destructive' });
      return false;
    }
    notifyPortfolioChanged();
    return true;
  };

  const claim = (c: { unit_code: string; ac_code: string }) =>
    writeClaims(
      [...learnerClaims.map(({ unit_code, ac_code }) => ({ unit_code, ac_code })), c],
      `claim-${c.unit_code}-${c.ac_code}`
    );
  const unclaim = (c: ItemCriterion) =>
    writeClaims(
      learnerClaims
        .filter((x) => !(x.unit_code === c.unit_code && x.ac_code === c.ac_code))
        .map(({ unit_code, ac_code }) => ({ unit_code, ac_code })),
      `unclaim-${c.unit_code}-${c.ac_code}`
    );
  const claimAllSuggested = () =>
    writeClaims(
      [
        ...learnerClaims.map(({ unit_code, ac_code }) => ({ unit_code, ac_code })),
        ...(item?.suggested ?? []).map(({ unit_code, ac_code }) => ({ unit_code, ac_code })),
      ],
      'claim-all'
    );

  const findWithAi = async () => {
    if (!item) return;
    const file = item.files.find((f) => isImage(f.type, f.url) || f.type.includes('pdf'));
    if (!file) {
      toast({
        title: 'Add a photo or document first',
        description: 'The AI reads the file to suggest criteria.',
      });
      return;
    }
    const res = await analyze({
      evidenceUrl: file.url,
      evidenceType: isImage(file.type, file.url) ? 'image' : 'document',
      title: item.title,
      description: item.description,
      qualificationCode: portfolio.qualificationCode,
    });
    const matches = (res?.matchedCriteria ?? []).filter((m) => m.unitCode && m.acCode);
    if (!matches.length) {
      toast({
        title: 'No matches found',
        description: 'Claim the criteria yourself from the list.',
      });
      return;
    }
    await writeClaims(
      learnerClaims.map(({ unit_code, ac_code }) => ({ unit_code, ac_code })),
      'ai',
      matches.map((m) => ({
        unit_code: m.unitCode,
        ac_code: m.acCode,
        confidence: Math.round(m.confidence),
        reason: m.reason,
      }))
    );
    toast({
      title: `${matches.length} suggestion${matches.length === 1 ? '' : 's'} added`,
      description: 'They do not count until you claim them.',
    });
  };

  const pickerResults = useMemo(() => {
    if (!item) return [];
    const q = pickerQ.trim().toLowerCase();
    const have = new Set(
      item.criteria
        .filter((c) => c.source !== 'ai_suggested')
        .map((c) => `${c.unit_code}|${c.ac_code}`)
    );
    return portfolio.ac.rows
      .filter((r) => !have.has(`${r.unit_code}|${r.ac_code}`))
      .filter(
        (r) =>
          !q ||
          `${r.unit_code} ${r.ac_code}`.toLowerCase().includes(q) ||
          `${r.unit_code} ac ${r.ac_code}`.toLowerCase().includes(q) ||
          (r.ac_text ?? '').toLowerCase().includes(q) ||
          (r.unit_title ?? '').toLowerCase().includes(q)
      )
      .slice(0, 30);
  }, [item, pickerQ, portfolio.ac.rows]);

  /* ─── Witness ──────────────────────────────────────────────────────── */
  // The signed statement with its evidence snapshot and fingerprints, as a
  // PDFMonkey document (ELE-2017).
  const downloadWitness = async (statementId: string) => {
    setBusyKey(`wpdf-${statementId}`);
    try {
      await downloadLearnerDocument({ kind: 'witness_statement', statementId });
    } catch (e) {
      toast({
        title: 'Could not make the PDF',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setBusyKey(null);
    }
  };
  const withdraw = async (w: ItemWitness) => {
    setBusyKey(`w-${w.id}`);
    const { error } = await supabase
      .from('portfolio_witness_statements' as never)
      .update({ status: 'withdrawn' } as never)
      .eq('id', w.id);
    setBusyKey(null);
    if (error) {
      toast({
        title: 'Could not withdraw',
        description: 'Check your connection and try again.',
        variant: 'destructive',
      });
      return;
    }
    toast({ title: 'Request withdrawn', description: 'That link no longer works.' });
    notifyPortfolioChanged();
  };

  /* ─── Share ────────────────────────────────────────────────────────── */
  const share = async () => {
    if (!item) return;
    setBusyKey('share');
    const s = await createShareLink({
      entryIds: [item.id],
      title: item.title,
      description: item.description,
      expiresIn: '7d',
    });
    setBusyKey(null);
    if (s) {
      const url = getShareUrl(s.token);
      setShareUrl(url);
      void loadAudit();
    }
  };

  /* ─── Delete ───────────────────────────────────────────────────────── */
  const deletable =
    !!item && !item.submission && !item.claimed.some((c) => c.decidedOnThisItem) && !item.witnessed;
  const remove = async () => {
    if (!item || !user) return;
    setBusyKey('delete');
    const paths = item.files
      .map((f) => f.url.match(/portfolio-evidence\/(.+)$/)?.[1])
      .filter((p): p is string => !!p);
    const { error } = await supabase
      .from('portfolio_items')
      .delete()
      .eq('id', item.id)
      .eq('user_id', user.id);
    if (!error && paths.length) await supabase.storage.from('portfolio-evidence').remove(paths);
    setBusyKey(null);
    if (error) {
      toast({ title: 'Not deleted', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Evidence deleted' });
    notifyPortfolioChanged();
    onOpenChange(false);
  };

  /* ─── Comments ─────────────────────────────────────────────────────── */
  const threads = item ? getCommentsForEvidence(item.id) : [];
  const sendComment = async () => {
    if (!item || !user || !comment.trim()) return;
    const name = (profile?.full_name as string | undefined) || 'Apprentice';
    try {
      await addComment({
        contextType: 'evidence',
        contextId: item.id,
        authorId: user.id,
        authorName: name,
        authorRole: 'student',
        authorInitials: name
          .split(' ')
          .map((p) => p[0])
          .join('')
          .toUpperCase()
          .slice(0, 2),
        content: comment.trim(),
        mentions: [],
        requiresAction: false,
        isResolved: false,
      });
      setComment('');
    } catch {
      toast({
        title: 'Comment not sent',
        description: 'Check your connection and try again.',
        variant: 'destructive',
      });
    }
  };

  /* ─── Observation (ELE-1873) ───────────────────────────────────────── */
  const acknowledge = async () => {
    if (!item?.observation?.id) return;
    setBusyKey('ack');
    const { error } = await supabase.rpc(
      'acknowledge_college_observation' as never,
      { p_id: item.observation.id, p_comment: ackComment.trim() || null } as never
    );
    setBusyKey(null);
    if (error) {
      toast({ title: 'Not saved', description: error.message, variant: 'destructive' });
      return;
    }
    setAckComment('');
    toast({
      title: 'Acknowledged',
      description: `${item.observation.observer_name.split(' ')[0] || 'Your assessor'} has been told.`,
    });
    notifyPortfolioChanged();
    notifyDoNextChanged();
    void loadAudit();
  };

  if (!item) return null;
  const isObservation = !!item.observation;

  const decided = item.claimed.filter((c) => c.decided_at);
  const needsMore = item.claimed.filter((c) => NEEDS.has(c.state));
  const resend = needsMore.length > 0;
  const canSubmit = item.claimed.length > 0 && (!item.submission?.open || resend);
  const pending = item.witnesses.find((w) => w.status === 'requested');

  const primary = (() => {
    if (item.next.key === 'acknowledge')
      return { label: 'Acknowledge', onClick: () => void acknowledge() };
    if (resend) return { label: 'Send again', onClick: () => setSubmitOpen(true) };
    if (item.next.key === 'confirm')
      return { label: 'Claim all suggestions', onClick: () => void claimAllSuggested() };
    if (item.next.key === 'claim')
      return { label: 'Claim a criterion', onClick: () => setPickerOpen(true) };
    if (item.next.key === 'witness')
      return { label: 'Ask a witness', onClick: () => setWitnessOpen(true) };
    if (item.next.key === 'submit' && !portfolio.canReachAssessor && onInviteAssessor)
      return { label: 'Invite an assessor', onClick: onInviteAssessor };
    if (canSubmit) return { label: 'Submit for assessment', onClick: () => setSubmitOpen(true) };
    return null;
  })();

  const workRows: [string, string | undefined][] = [
    ['Date of work', item.workDate ? fmtDate(item.workDate) : undefined],
    ['Site', item.metadata.siteRef as string | undefined],
    ['What you did', item.metadata.role as string | undefined],
    [
      'Witness named',
      (item.metadata.witness as { name?: string; role?: string } | undefined)?.name
        ? [
            (item.metadata.witness as { name?: string }).name,
            (item.metadata.witness as { role?: string }).role,
          ]
            .filter(Boolean)
            .join(', ')
        : undefined,
    ],
  ];

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        width="wide"
        eyebrow={`Evidence · ${fmtDate(item.workDate ?? item.createdAt)}`}
        title={item.title}
        headerTrailing={
          <span
            className={cn(
              'rounded-full border px-2.5 py-1 text-[12px] font-semibold',
              ITEM_STATE_CHIP[item.state]
            )}
          >
            {itemStateLabel(item)}
          </span>
        }
        footer={
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between lg:!ml-0 lg:!max-w-none">
            <div className="grid grid-cols-4 gap-1 sm:flex sm:gap-2">
              <button
                type="button"
                className={cn(P_BTN, 'whitespace-nowrap px-2 sm:px-4')}
                onClick={() => void share()}
                disabled={busyKey === 'share'}
              >
                <Share2 className="h-4 w-4" /> <span className="hidden sm:inline">Share</span>
              </button>
              <button
                type="button"
                className={cn(P_BTN, 'whitespace-nowrap px-2 sm:px-4')}
                onClick={() => {
                  setShowReport(true);
                  if (!validation)
                    void validate({
                      portfolioItemId: item.id,
                      evidenceText: [item.title, item.description, item.reflection]
                        .filter(Boolean)
                        .join('\n'),
                      evidenceUrls: item.files
                        .filter((f) => isImage(f.type, f.url))
                        .map((f) => f.url),
                      claimedACs: item.claimed.map((c) => `${c.unit_code} AC ${c.ac_code}`),
                      qualificationCode: portfolio.qualificationCode ?? '',
                    } as never);
                }}
              >
                <ShieldCheck className="h-4 w-4" />{' '}
                <span className="hidden sm:inline">Check quality</span>
              </button>
              {onEdit && !isObservation && (
                <button
                  type="button"
                  className={cn(P_BTN, 'whitespace-nowrap px-2 sm:px-4')}
                  onClick={() => onEdit(item.id)}
                >
                  <Pencil className="h-4 w-4" /> <span className="hidden sm:inline">Edit</span>
                </button>
              )}
              {!isObservation && (
                <button
                  type="button"
                  className={cn(P_BTN, 'whitespace-nowrap px-2 sm:px-4')}
                  onClick={() => setConfirmDelete(true)}
                  aria-label="Delete evidence"
                >
                  <Trash2 className="h-4 w-4" /> <span className="hidden sm:inline">Delete</span>
                </button>
              )}
            </div>
            {primary ? (
              <button
                type="button"
                className={cn(P_BTN_PRIMARY, 'w-full whitespace-nowrap sm:w-auto sm:px-8')}
                onClick={primary.onClick}
              >
                {(busyKey === 'claim-all' || busyKey === 'ack') && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {primary.label}
              </button>
            ) : (
              <p className="text-center text-[13px] font-medium text-white sm:text-right">
                {item.next.label}
              </p>
            )}
          </div>
        }
        bodyClassName="space-y-8"
      >
        {/* Next step + share link + delete confirm (an observation's panel carries its own) */}
        {!isObservation && (
          <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-4">
            <p className="text-[12px] font-medium text-white">Next step</p>
            <p className="mt-0.5 text-[15px] font-semibold text-white">{item.next.label}</p>
          </div>
        )}

        {item.observation && (
          <ObservationPanel
            obs={item.observation}
            files={item.files}
            comment={ackComment}
            onComment={setAckComment}
            onAcknowledge={() => void acknowledge()}
            busy={busyKey === 'ack'}
          />
        )}

        {shareUrl && (
          <div className="flex flex-col gap-2 rounded-2xl border border-elec-yellow/40 p-4 sm:flex-row sm:items-center">
            <p className="min-w-0 flex-1 break-all font-mono text-[13px] text-white">{shareUrl}</p>
            <button
              type="button"
              className={P_BTN}
              onClick={async () => {
                await copyToClipboard(shareUrl);
                toast({ title: 'Link copied', description: 'It works for 7 days.' });
              }}
            >
              <Copy className="h-4 w-4" /> Copy
            </button>
          </div>
        )}

        {confirmDelete && (
          <div className="rounded-2xl border border-orange-500/40 bg-orange-500/10 p-4">
            {deletable ? (
              <>
                <p className="text-[14px] text-white">
                  Delete this evidence and its files? This cannot be undone.
                </p>
                <div className="mt-3 flex gap-2">
                  <button type="button" className={P_BTN} onClick={() => setConfirmDelete(false)}>
                    Keep it
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 text-[14px] font-semibold text-black touch-manipulation"
                    onClick={() => void remove()}
                    disabled={busyKey === 'delete'}
                  >
                    {busyKey === 'delete' ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </>
            ) : (
              <p className="text-[14px] text-white">
                This evidence has been sent to your assessor, decided on or witnessed, so it is part
                of your record and cannot be deleted. Add to it or capture new evidence instead.
              </p>
            )}
          </div>
        )}

        {/* Decision: first, on every screen size */}
        {decided.length > 0 && (
          <section
            className={cn(
              'rounded-2xl border p-4',
              resend
                ? 'border-orange-500/40 bg-orange-500/[0.08]'
                : 'border-emerald-400/30 bg-emerald-500/[0.06]'
            )}
          >
            <h3 className="text-[13px] font-semibold text-white">Your assessor's decision</h3>
            <ul className="mt-2 space-y-3">
              {decided.map((c) => (
                <li key={`${c.unit_code}-${c.ac_code}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[12.5px] text-elec-yellow">
                      {c.unit_code} AC {c.ac_code}
                    </span>
                    <StateChip state={c.state} />
                  </div>
                  {c.decision_feedback && (
                    <p className="mt-1 text-[14px] leading-relaxed text-white">
                      "{c.decision_feedback}"
                    </p>
                  )}
                  <p className="mt-0.5 text-[12px] text-white">
                    {assessorWithQualifications(
                      c.assessor_name ?? 'Assessor',
                      c.assessor_qualifications
                    )}{' '}
                    · {fmtDate(c.decided_at)}
                  </p>
                  {c.decision_feedback &&
                    aiProvenanceLine(
                      c.decision_feedback_source,
                      c.assessor_name,
                      c.decision_feedback_confirmed_at ?? c.decided_at
                    ) && (
                      <p className="mt-0.5 text-[12px] text-white">
                        {aiProvenanceLine(
                          c.decision_feedback_source,
                          c.assessor_name,
                          c.decision_feedback_confirmed_at ?? c.decided_at
                        )}
                      </p>
                    )}
                </li>
              ))}
            </ul>
            {resend && (
              <button
                type="button"
                className={cn(P_BTN_PRIMARY, 'mt-4 w-full sm:w-auto')}
                onClick={() => setSubmitOpen(true)}
              >
                <Send className="h-4 w-4" /> Send again
              </button>
            )}
          </section>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          {/* LEFT: the evidence itself */}
          <div className="space-y-8">
            {item.files.length > 0 ? (
              <section>
                <h3 className="mb-3 text-[13px] font-semibold text-white">Files</h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {item.files.map((f, i) => (
                    <button
                      key={`${f.url}-${i}`}
                      type="button"
                      onClick={() => void openEvidence(f.url)}
                      className="group overflow-hidden rounded-xl border border-white/[0.1] text-left touch-manipulation"
                    >
                      {isImage(f.type, f.url) ? (
                        <EvidenceImage
                          src={f.url}
                          alt={f.name}
                          className="aspect-[4/3] w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex aspect-[4/3] w-full items-center justify-center bg-white/[0.04]">
                          <FileText className="h-8 w-8 text-white" />
                        </div>
                      )}
                      <div className="flex items-center gap-1 px-2 py-1.5">
                        <span className="min-w-0 flex-1 truncate text-[11.5px] text-white">
                          {f.name}
                        </span>
                        <ExternalLink className="h-3 w-3 shrink-0 text-white" />
                      </div>
                      {f.sha256 && (
                        <p
                          className="px-2 pb-1.5 font-mono text-[10.5px] text-white"
                          title={f.sha256}
                        >
                          SHA-256 {shortHash(f.sha256)}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </section>
            ) : isObservation ? null : (
              <p className="rounded-2xl border border-dashed border-white/[0.2] p-4 text-[13px] text-white">
                No files yet. A photo of the finished work or a test sheet makes this much stronger.
                Use Edit to add one.
              </p>
            )}

            {(item.description || item.reflection) && (
              <section className="space-y-4">
                {item.description && (
                  <div>
                    <h3 className="mb-1 text-[13px] font-semibold text-white">
                      {isObservation
                        ? item.observation?.kind === 'professional_discussion'
                          ? 'Summary of your answers'
                          : 'What was observed'
                        : 'What you did'}
                    </h3>
                    <p className="whitespace-pre-line text-[14px] leading-relaxed text-white">
                      {item.description}
                    </p>
                  </div>
                )}
                {item.reflection && (
                  <div>
                    <h3 className="mb-1 text-[13px] font-semibold text-white">Reflection</h3>
                    <p className="whitespace-pre-line text-[14px] leading-relaxed text-white">
                      {item.reflection}
                    </p>
                  </div>
                )}
              </section>
            )}

            {workRows.some(([, v]) => v) && (
              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {workRows
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[12px] font-medium text-white">{k}</dt>
                      <dd className="text-[14px] text-white">{v}</dd>
                    </div>
                  ))}
              </dl>
            )}

            {/* Witnesses (an observation is the assessor's own evidence: no witness needed) */}
            {!isObservation && (
              <section>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-[13px] font-semibold text-white">Witness</h3>
                  {!pending && (
                    <button
                      type="button"
                      className={P_LINK}
                      onClick={() => {
                        setWitnessToken(null);
                        setWitnessOpen(true);
                      }}
                    >
                      Ask a witness
                    </button>
                  )}
                </div>
                {item.witnesses.length === 0 && !item.countersigned ? (
                  <p className="text-[13px] text-white">
                    Nobody has signed for this yet. A supervisor who saw you do it can sign from a
                    link, no account needed.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {item.countersigned && (
                      <li className="rounded-xl border border-white/[0.1] p-3 text-[13px] text-white">
                        Countersigned by your supervisor through the older QR check.
                      </li>
                    )}
                    {item.witnesses.map((w) => (
                      <li key={w.id} className="rounded-xl border border-white/[0.1] p-3">
                        {w.status === 'signed' ? (
                          <>
                            <button
                              type="button"
                              onClick={() => setOpenStatement(openStatement === w.id ? null : w.id)}
                              className="flex w-full items-start justify-between gap-3 text-left touch-manipulation"
                            >
                              <span className="text-[14px] font-semibold text-white">
                                Witnessed by {w.witness_name}
                                {w.witness_role ? `, ${w.witness_role}` : ''}
                                {w.witness_company ? ` at ${w.witness_company}` : ''}
                              </span>
                              <span className="shrink-0 text-[12px] text-white">
                                {fmtDate(w.signed_at)}
                              </span>
                            </button>
                            {openStatement === w.id && (
                              <div className="mt-2 space-y-2">
                                <p className="whitespace-pre-line text-[14px] leading-relaxed text-white">
                                  {w.statement}
                                </p>
                                {w.statement_hash && (
                                  <p className="font-mono text-[11px] text-white">
                                    Signed fingerprint {shortHash(w.statement_hash)}
                                  </p>
                                )}
                                <button
                                  type="button"
                                  className={P_BTN}
                                  disabled={busyKey === `wpdf-${w.id}`}
                                  onClick={() => void downloadWitness(w.id)}
                                >
                                  {busyKey === `wpdf-${w.id}`
                                    ? 'Making the PDF…'
                                    : 'Download statement (PDF)'}
                                </button>
                              </div>
                            )}
                          </>
                        ) : new Date(w.expires_at).getTime() < Date.now() ? (
                          // ELE-1869: the link stops working after 30 days; say so rather than "Waiting".
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-[13px] text-white">
                              <span className="font-semibold text-orange-300">Link expired</span> on{' '}
                              {fmtDate(w.expires_at)}
                              {w.witness_email ? ` · sent to ${w.witness_email}` : ''}. Nobody
                              signed it.
                            </p>
                            <button
                              type="button"
                              className={P_BTN}
                              onClick={() => {
                                setWitnessToken(null);
                                setWitnessOpen(true);
                              }}
                            >
                              Ask again
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-[13px] text-white">
                              Waiting{w.witness_email ? ` for ${w.witness_email}` : ''} · asked{' '}
                              {fmtDate(w.created_at)} · link works until {fmtDate(w.expires_at)}
                            </p>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                className={P_BTN}
                                onClick={() => {
                                  setWitnessToken(w.token);
                                  setWitnessOpen(true);
                                }}
                              >
                                Share again
                              </button>
                              <button
                                type="button"
                                className={P_BTN}
                                onClick={() => void withdraw(w)}
                                disabled={busyKey === `w-${w.id}`}
                              >
                                Withdraw
                              </button>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}
          </div>

          {/* RIGHT: criteria, decision, comments, audit */}
          <div className="space-y-8">
            {item.submission && (
              <p className="text-[13px] text-white">
                Last sent for assessment {fmtDateTime(item.submission.submitted_at)}, signed with
                your declaration.
              </p>
            )}

            {/* Criteria */}
            <section>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-[13px] font-semibold text-white">
                  Criteria this covers{item.claimed.length ? ` · ${item.claimed.length}` : ''}
                </h3>
                <button type="button" className={P_LINK} onClick={() => setPickerOpen((o) => !o)}>
                  {pickerOpen ? 'Close' : 'Add a criterion'}
                </button>
              </div>

              {pickerOpen && (
                <div className="mb-4 rounded-2xl border border-white/[0.12] p-3">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-1 top-3.5 h-4 w-4 text-white" />
                    <input
                      autoFocus
                      className={cn(P_INPUT, 'pl-7')}
                      placeholder="Search by unit, AC or words"
                      value={pickerQ}
                      onChange={(e) => setPickerQ(e.target.value)}
                    />
                  </div>
                  {portfolio.ac.rows.length === 0 ? (
                    <p className="mt-3 text-[13px] text-white">
                      Choose your qualification first to claim criteria.
                    </p>
                  ) : (
                    <ul className="mt-2 max-h-72 divide-y divide-white/[0.06] overflow-y-auto">
                      {pickerResults.map((r) => (
                        <li key={`${r.unit_code}-${r.ac_code}`}>
                          <button
                            type="button"
                            disabled={!!busyKey}
                            onClick={() =>
                              void claim({ unit_code: r.unit_code, ac_code: r.ac_code })
                            }
                            className="flex min-h-[48px] w-full items-start gap-3 py-2 text-left touch-manipulation"
                          >
                            <span className="shrink-0 font-mono text-[12.5px] text-elec-yellow">
                              {r.unit_code} AC {r.ac_code}
                            </span>
                            <span className="text-[13px] text-white">{r.ac_text}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {item.claimed.length === 0 ? (
                <p className="text-[13px] text-white">
                  Nothing claimed yet. Claim each criterion this evidence really shows; that is what
                  your assessor will judge.
                </p>
              ) : (
                <ul className="divide-y divide-white/[0.06] rounded-2xl border border-white/[0.1]">
                  {item.claimed.map((c) => {
                    const locked =
                      LOCKED.has(c.state) || c.source === 'assessor' || !!item.submission?.open;
                    return (
                      <li
                        key={`${c.unit_code}-${c.ac_code}`}
                        className="flex items-start gap-3 p-3"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[12.5px] text-elec-yellow">
                              {c.unit_code} AC {c.ac_code}
                            </span>
                            <StateChip state={c.state} />
                            <span className="text-[11.5px] text-white">
                              by {SOURCE_LABEL[c.source]}
                            </span>
                          </div>
                          {c.ac_text && (
                            <p className="mt-1 text-[13px] leading-snug text-white">{c.ac_text}</p>
                          )}
                        </div>
                        {!locked && (
                          <button
                            type="button"
                            aria-label={`Unclaim ${c.unit_code} AC ${c.ac_code}`}
                            onClick={() => void unclaim(c)}
                            disabled={!!busyKey}
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white touch-manipulation hover:text-elec-yellow"
                          >
                            {busyKey === `unclaim-${c.unit_code}-${c.ac_code}` ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <X className="h-4 w-4" />
                            )}
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* AI suggestions: never a claim until confirmed */}
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h4 className="text-[12.5px] font-semibold text-white">
                    Suggested criteria{item.suggested.length ? ` · ${item.suggested.length}` : ''}
                  </h4>
                  <button
                    type="button"
                    className={P_LINK}
                    onClick={() => void findWithAi()}
                    disabled={isAnalyzing || !!busyKey}
                  >
                    {isAnalyzing ? (
                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-1 h-4 w-4" />
                    )}
                    {isAnalyzing ? 'Reading…' : 'Find matching criteria'}
                  </button>
                </div>
                {item.suggested.length === 0 ? (
                  <p className="text-[12.5px] text-white">
                    No suggestions. They never count until you claim them, so check each one against
                    what you actually did.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {item.suggested.map((c) => (
                      <li
                        key={`${c.unit_code}-${c.ac_code}`}
                        className="flex items-start gap-3 rounded-xl border border-dashed border-white/[0.25] p-3"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[12.5px] text-elec-yellow">
                              {c.unit_code} AC {c.ac_code}
                            </span>
                            {c.confidence !== null && (
                              <span className="text-[11.5px] text-white">
                                {c.confidence}% match
                              </span>
                            )}
                          </div>
                          {c.ac_text && (
                            <p className="mt-1 text-[13px] leading-snug text-white">{c.ac_text}</p>
                          )}
                          {c.ai_reason && (
                            <p className="mt-1 text-[12px] italic leading-snug text-white">
                              {c.ai_reason}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => void claim({ unit_code: c.unit_code, ac_code: c.ac_code })}
                          disabled={!!busyKey}
                          className={cn(P_BTN, 'h-11 shrink-0 px-3')}
                        >
                          {busyKey === `claim-${c.unit_code}-${c.ac_code}` ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                          Claim
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            {/* Comments */}
            <section>
              <h3 className="mb-3 text-[13px] font-semibold text-white">Comments</h3>
              {threads.length === 0 ? (
                <p className="text-[13px] text-white">
                  No comments yet. Ask your tutor a question about this evidence here.
                </p>
              ) : (
                <ul className="space-y-3">
                  {threads.map((t) =>
                    [t.rootComment, ...t.replies].map((c) => (
                      <li key={c.id} className="rounded-xl border border-white/[0.08] p-3">
                        <p className="text-[12px] font-semibold text-white">
                          {c.authorName} · {c.authorRole === 'student' ? 'you' : c.authorRole} ·{' '}
                          {fmtDate(c.createdAt)}
                        </p>
                        <p className="mt-1 whitespace-pre-line text-[14px] text-white">
                          {c.content}
                        </p>
                        {c.requiresAction && !c.isResolved && (
                          <p className="mt-1 text-[12px] font-semibold text-orange-300">
                            Needs a reply from you
                          </p>
                        )}
                      </li>
                    ))
                  )}
                </ul>
              )}
              <div className="mt-3 flex items-end gap-2">
                <textarea
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment"
                  className="min-h-[44px] flex-1 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base text-white caret-elec-yellow placeholder:text-white/25 focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                />
                <button
                  type="button"
                  aria-label="Send comment"
                  className={cn(P_BTN_PRIMARY, 'w-11 px-0')}
                  disabled={!comment.trim()}
                  onClick={() => void sendComment()}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </section>

            {/* Audit trail */}
            <section>
              <h3 className="mb-1 text-[13px] font-semibold text-white">Audit trail</h3>
              <p className="mb-3 text-[12.5px] text-white">
                Every change to this evidence, kept for your assessor and the awarding body. It
                cannot be edited.
                {item.contentHash && (
                  <>
                    {' '}
                    Current fingerprint{' '}
                    <span className="font-mono">{shortHash(item.contentHash)}</span>.
                  </>
                )}
              </p>
              {audit.length === 0 ? (
                <p className="text-[13px] text-white">Nothing recorded yet.</p>
              ) : (
                <ol className="space-y-2 border-l border-white/[0.14] pl-4">
                  {audit.map((e) => {
                    const crit =
                      e.summary.unit_code && e.summary.ac_code
                        ? ` · ${e.summary.unit_code} AC ${e.summary.ac_code}`
                        : '';
                    return (
                      <li key={e.id} className="relative">
                        <span
                          className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-white/[0.6]"
                          aria-hidden
                        />
                        <p className="text-[13px] text-white">
                          <span className="font-semibold">
                            {AUDIT_LABEL[e.action] ?? e.action.replace(/_/g, ' ')}
                          </span>
                          {crit}
                          {e.summary.backfilled ? ' (recorded when the trail began)' : ''}
                        </p>
                        <p className="text-[11.5px] text-white">
                          {fmtDateTime(e.created_at)} · by{' '}
                          {ROLE_LABEL[e.actor_role] ?? e.actor_role}
                          {e.content_hash ? ` · ${shortHash(e.content_hash)}` : ''}
                        </p>
                      </li>
                    );
                  })}
                </ol>
              )}
            </section>
          </div>
        </div>
      </FormSheet>

      <AskWitnessSheet
        item={item}
        open={witnessOpen}
        onOpenChange={setWitnessOpen}
        existingToken={witnessToken}
      />
      <SubmitEvidenceSheet
        items={[item]}
        open={submitOpen}
        onOpenChange={setSubmitOpen}
        resend={resend}
      />
      <EvidenceValidationReport
        open={showReport}
        onOpenChange={setShowReport}
        result={validation}
        isLoading={isValidating}
      />
    </>
  );
}

/**
 * QsReviewPage — the worker-side QS review queue as a routed page.
 *
 * For workers who are a QS (or the owner-QS / principal QS): review, sign off
 * or return certificates submitted for Qualifying Supervisor review. Reuses the
 * exact data layer behind QSReviewsSection (the QsReviewQueue hooks + mutations
 * + QsCertReviewBody read-only body), so the worker and employer sides share one
 * source of truth.
 *
 * The old bottom-sheet "queue → detail" flow becomes two in-page views driven by
 * local state (list ⇄ detail), with an in-page back control. The shell
 * (WorkerToolPage) renders the masthead, hero and team-access guard, so this page
 * owns only its content, filters, summary stats and its own loading/empty states.
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ShieldCheck, Undo2, ArrowLeft, ExternalLink, Pencil } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { openPrintRegister } from '@/utils/printRegister';
import SignatureInput from '@/components/signature/SignatureInput';
import QsCertReviewBody from '@/components/employer/sections/QsCertReviewBody';
import { QsReviewComments } from '@/components/employer/sections/QsReviewComments';
import { ReportPdfViewer } from '@/components/reports/ReportPdfViewer';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import {
  StatStrip,
  SplitLayout,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  Field,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  EmptyState,
  LoadingBlocks,
  inputClass,
  textareaClass,
  type Tone,
} from '@/components/employer/editorial';
import {
  useQsReviewQueue,
  useMyQsReviews,
  useQsReviewReport,
  useApproveQsReview,
  useReturnQsReview,
  type QsQueueItem,
} from '@/hooks/useQsReviewQueue';
import { useQsTeamContext, useSubmitForQsReview } from '@/hooks/useQsReview';

const TYPE_LABEL: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
};

const STATUS_TONE: Record<string, Tone> = {
  pending: 'amber',
  approved: 'emerald',
  returned: 'red',
  cancelled: 'blue',
};

const STATUS_LABEL: Record<string, string> = {
  pending: 'Awaiting',
  approved: 'Approved',
  returned: 'Returned',
  cancelled: 'Cancelled',
};

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '—';

/** Compact relative timestamp — "today", "3d ago", "2w ago". */
const relativeTime = (iso: string | null): string => {
  if (!iso) return '—';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '—';
  const diffMs = Date.now() - then;
  const day = 86_400_000;
  const days = Math.floor(diffMs / day);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 28) return `${Math.floor(days / 7)}w ago`;
  return formatDate(iso);
};

type ScopeTab = 'pending' | 'approved' | 'returned' | 'all';

/* ────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────── */

export default function QsReviewPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Worker Tools is originator-first: the default view is the worker's OWN certs
  // + the QS's feedback on them. A worker who is ALSO a QS gets the reviewer
  // queue as a second tab, so they see both sides.
  const { data: teamCtx } = useQsTeamContext();
  const amIQs = !!teamCtx?.am_i_qs;
  const [side, setSide] = useState<'mine' | 'review'>('mine');
  const effectiveSide = side === 'review' && amIQs ? 'review' : 'mine';
  const isReview = effectiveSide === 'review';

  const mineQuery = useMyQsReviews();
  const reviewQuery = useQsReviewQueue('all');
  const { data: allItems = [], isLoading } = isReview ? reviewQuery : mineQuery;

  const [tab, setTab] = useState<ScopeTab>('pending');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const switchSide = (next: 'mine' | 'review') => {
    setSide(next);
    setSelectedId(null);
    setTab('pending');
  };

  const counts = useMemo(() => {
    const c = { pending: 0, approved: 0, returned: 0, cancelled: 0 };
    for (const it of allItems) {
      if (it.status in c) c[it.status as keyof typeof c] += 1;
    }
    return c;
  }, [allItems]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allItems
      .filter((it) => (tab === 'all' ? true : it.status === tab))
      .filter((it) => {
        if (!q) return true;
        return [
          it.client_name,
          it.installation_address,
          it.electrician_name,
          it.certificate_number,
          it.report_id,
          TYPE_LABEL[it.report_type] || it.report_type,
        ]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q));
      })
      .sort((a, b) => {
        // Newest activity first — reviewed_at for decided items, else submitted_at.
        const at = new Date(a.reviewed_at || a.submitted_at).getTime();
        const bt = new Date(b.reviewed_at || b.submitted_at).getTime();
        return bt - at;
      });
  }, [allItems, tab, search]);

  const selectedItem = useMemo(
    () => allItems.find((it) => it.review_id === selectedId) ?? null,
    [allItems, selectedId]
  );

  const handleExport = async () => {
    const ok = await openPrintRegister({
      title: 'QS Review Register',
      subtitle: 'Qualifying Supervisor certificate sign-off record',
      columns: [
        'Certificate',
        'Type',
        'Client',
        'Electrician',
        'Submitted',
        'Status',
        'Reviewed by',
        'Reviewed',
      ],
      rows: allItems.map((it) => [
        it.report_id,
        it.report_type.toUpperCase(),
        it.client_name,
        it.electrician_name,
        it.submitted_at ? new Date(it.submitted_at).toLocaleDateString('en-GB') : null,
        it.status,
        it.reviewer_name,
        it.reviewed_at ? new Date(it.reviewed_at).toLocaleDateString('en-GB') : null,
      ]),
    });
    if (!ok) toast({ title: 'Pop-up blocked', variant: 'destructive' });
  };

  // ── Detail view (mobile) ─────────────────────────────────
  // On phones the list and detail are separate in-page views: tapping a row
  // opens the detail full-width, with an in-page back control. On desktop the
  // detail lives alongside the queue in a master-detail split (below), so this
  // dedicated view only renders below the lg breakpoint.
  if (selectedItem) {
    return (
      <WorkerToolPage
        eyebrow="Quality"
        title="QS Reviews"
        description={
          effectiveSide === 'mine'
            ? "Your QS's feedback on certificates you submitted — see the comments, edit, and resend."
            : 'Review the certificate, then countersign or return it to the electrician.'
        }
      >
        <div className="lg:hidden">
          <QsReviewDetail item={selectedItem} onBack={() => setSelectedId(null)} side={effectiveSide} />
        </div>
        {/* Desktop falls through to the split queue+detail layout. */}
        <div className="hidden lg:block">
          <QueueAndDetail
            isLoading={isLoading}
            allItems={allItems}
            filtered={filtered}
            counts={counts}
            tab={tab}
            setTab={setTab}
            search={search}
            setSearch={setSearch}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            selectedItem={selectedItem}
            onSetupTeam={() => navigate('/employer?section=team')}
            side={effectiveSide}
            amIQs={amIQs}
            onSwitchSide={switchSide}
          />
        </div>
      </WorkerToolPage>
    );
  }

  // ── Queue view ───────────────────────────────────────────
  return (
    <WorkerToolPage
      eyebrow="Quality"
      title="QS Reviews"
      description={
        effectiveSide === 'mine'
          ? 'Certificates you sent for QS sign-off — see the QS’s comments, edit the cert, and resubmit.'
          : 'Certificates submitted for Qualifying Supervisor sign-off. Review the full technical detail, then approve and countersign — or return with comments.'
      }
      actions={
        allItems.length > 0 ? (
          <SecondaryButton size="sm" onClick={handleExport}>
            Export register
          </SecondaryButton>
        ) : undefined
      }
    >
      <QueueAndDetail
        isLoading={isLoading}
        allItems={allItems}
        filtered={filtered}
        counts={counts}
        tab={tab}
        setTab={setTab}
        search={search}
        setSearch={setSearch}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        selectedItem={selectedItem}
        onSetupTeam={() => navigate('/employer?section=team')}
        side={effectiveSide}
        amIQs={amIQs}
        onSwitchSide={switchSide}
      />
    </WorkerToolPage>
  );
}

/* ────────────────────────────────────────────────────────
   Queue + detail composition
   Full-width counts span the canvas; below them a master-detail split uses the
   width on desktop — the review queue on the left, the selected certificate's
   review on the right. Mobile stays single column (the queue here; the detail
   is a separate in-page view driven by selectedId). No data hooks live in
   here — it is purely presentational over the page's existing state.
   ──────────────────────────────────────────────────────── */

interface QueueAndDetailProps {
  isLoading: boolean;
  allItems: QsQueueItem[];
  filtered: QsQueueItem[];
  counts: { pending: number; approved: number; returned: number; cancelled: number };
  tab: ScopeTab;
  setTab: (t: ScopeTab) => void;
  search: string;
  setSearch: (s: string) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  selectedItem: QsQueueItem | null;
  onSetupTeam: () => void;
  side: 'mine' | 'review';
  amIQs: boolean;
  onSwitchSide: (s: 'mine' | 'review') => void;
}

function QueueAndDetail({
  isLoading,
  allItems,
  filtered,
  counts,
  tab,
  setTab,
  search,
  setSearch,
  selectedId,
  setSelectedId,
  selectedItem,
  onSetupTeam,
  side,
  amIQs,
  onSwitchSide,
}: QueueAndDetailProps) {
  // Originator ⇄ reviewer toggle — only shown to a worker who is also a QS.
  const sideToggle = amIQs ? (
    <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
      {(
        [
          { key: 'mine', label: 'My certificates' },
          { key: 'review', label: 'To review' },
        ] as const
      ).map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onSwitchSide(key)}
          className={
            side === key
              ? 'h-9 rounded-lg bg-elec-yellow/15 border border-elec-yellow/30 text-elec-yellow text-[13px] font-semibold touch-manipulation'
              : 'h-9 rounded-lg text-white/70 text-[13px] font-semibold touch-manipulation'
          }
        >
          {label}
        </button>
      ))}
    </div>
  ) : null;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {sideToggle}
        <LoadingBlocks />
      </div>
    );
  }

  if (allItems.length === 0) {
    return (
      <div className="space-y-4">
        {sideToggle}
        <EmptyState
          title={side === 'mine' ? 'No QS feedback yet' : 'No certificates awaiting review'}
          description={
            side === 'mine'
              ? 'Certificates you send to your Qualifying Supervisor for sign-off show here — with their comments and what to action.'
              : 'When a team member submits an EICR, EIC or Minor Works certificate for Qualifying Supervisor sign-off, it will appear here. Team members link automatically when they sign in with the email on their roster entry.'
          }
          action={side === 'review' ? 'Set up your team' : undefined}
          onAction={side === 'review' ? onSetupTeam : undefined}
        />
      </div>
    );
  }

  const queue = (
    <div className="space-y-6">
      {sideToggle}
      {/* Filter + search */}
      <FilterBar
        tabs={[
          { value: 'pending', label: 'Awaiting', count: counts.pending },
          { value: 'approved', label: 'Approved', count: counts.approved },
          { value: 'returned', label: 'Returned', count: counts.returned },
          { value: 'all', label: 'All', count: allItems.length },
        ]}
        activeTab={tab}
        onTabChange={(v) => setTab(v as ScopeTab)}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search client, address, electrician…"
      />

      {filtered.length === 0 ? (
        <EmptyState
          title={search.trim() ? 'No matching reviews' : 'Nothing here'}
          description={
            search.trim()
              ? 'Try a different client, address or electrician name.'
              : tab === 'pending'
                ? 'No certificates are awaiting sign-off.'
                : `No ${tab} reviews.`
          }
        />
      ) : (
        <ListCard>
          <ListCardHeader
            title={tab === 'all' ? 'All reviews' : `${STATUS_LABEL[tab] ?? tab} reviews`}
            meta={<Pill tone="amber">{filtered.length}</Pill>}
            tone="amber"
          />
          <ListBody>
            {filtered.map((item) => (
              <ListRow
                key={item.review_id}
                accent={STATUS_TONE[item.status]}
                className={item.review_id === selectedId ? 'bg-[hsl(0_0%_15%)]' : undefined}
                title={
                  <span>
                    {TYPE_LABEL[item.report_type] || item.report_type.toUpperCase()}
                    {item.client_name ? ` — ${item.client_name}` : ''}
                  </span>
                }
                subtitle={
                  <span>
                    {item.electrician_name} · {item.installation_address || 'No address'} ·{' '}
                    {item.status === 'pending'
                      ? `submitted ${relativeTime(item.submitted_at)}`
                      : `${STATUS_LABEL[item.status]?.toLowerCase() ?? item.status} ${relativeTime(item.reviewed_at)}`}
                  </span>
                }
                trailing={
                  <Pill tone={STATUS_TONE[item.status]}>
                    {STATUS_LABEL[item.status] ?? item.status}
                  </Pill>
                }
                onClick={() => setSelectedId(item.review_id)}
              />
            ))}
          </ListBody>
        </ListCard>
      )}
    </div>
  );

  // Right-hand pane (desktop only): the selected review, or a prompt to pick one.
  const detailPane = selectedItem ? (
    <QsReviewDetail item={selectedItem} onBack={() => setSelectedId(null)} side={side} />
  ) : (
    <div className="rounded-2xl border border-dashed border-white/[0.10] bg-[hsl(0_0%_10%)] px-6 py-16 text-center">
      <p className="text-sm font-medium text-white/70">Select a certificate to review</p>
      <p className="mt-1 text-[12.5px] text-white/45">
        Choose a row from the queue to see the full technical detail and countersign or return it.
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Summary counts — span the full width */}
      <StatStrip
        columns={4}
        stats={[
          {
            label: 'Awaiting',
            value: counts.pending,
            accent: counts.pending > 0,
            onClick: () => setTab('pending'),
          },
          {
            label: 'Approved',
            value: counts.approved,
            tone: 'emerald',
            onClick: () => setTab('approved'),
          },
          {
            label: 'Returned',
            value: counts.returned,
            tone: 'red',
            onClick: () => setTab('returned'),
          },
          { label: 'Total', value: allItems.length, onClick: () => setTab('all') },
        ]}
      />

      {/* Mobile: queue only (tap a row → in-page detail view). */}
      <div className="lg:hidden">{queue}</div>

      {/* Desktop: master-detail split using the width. */}
      <div className="hidden lg:block">
        <SplitLayout ratio="1-1" primary={queue} secondary={detailPane} />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Detail field
   ──────────────────────────────────────────────────────── */

function DetailField({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-[0.14em] text-white/40">{label}</p>
      <p className="text-sm text-white truncate">{value || '—'}</p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Detail view — read-only cert summary + technical body + decision
   In-page replacement for the old detail bottom sheet. All data hooks,
   mutations, handlers, the profile-name useEffect and validation are carried
   over unchanged in behaviour.
   ──────────────────────────────────────────────────────── */

function QsReviewDetail({
  item,
  onBack,
  side = 'review',
}: {
  item: QsQueueItem;
  onBack: () => void;
  /** 'review' = QS reviewing someone's cert (approve/return); 'mine' = the
   *  originator acting on QS feedback (edit + resubmit). */
  side?: 'review' | 'mine';
}) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data: detail, isLoading, isError } = useQsReviewReport(item.review_id);
  const approveMutation = useApproveQsReview();
  const returnMutation = useReturnQsReview();
  const submitMutation = useSubmitForQsReview();

  const handleResubmit = async () => {
    try {
      await submitMutation.mutateAsync({ reportId: item.report_id });
      toast({ title: 'Sent to your QS', description: 'Your QS will re-review the certificate.' });
      onBack();
    } catch (err) {
      toast({
        title: 'Resubmit failed',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Open the team member's cert in the normal editable I&T form — load + save
  // already work for a team QS (see reportCloud + the "QS can update team
  // reports" RLS policy). Mirrors the QS Review bench's Edit action.
  const handleEdit = () => {
    const t = item.report_type;
    const id = encodeURIComponent(item.report_id);
    if (['pat-testing', 'testing-only'].includes(t)) {
      navigate(`/electrician/inspection-testing/${t}/${id}`);
    } else {
      navigate(`/electrician/inspection-testing?section=${t}&reportId=${id}`);
    }
  };

  const [reviewerName, setReviewerName] = useState('');
  const [signature, setSignature] = useState<string | null>(null);
  const [comments, setComments] = useState('');
  const [mode, setMode] = useState<'view' | 'approve' | 'return'>('view');
  const [pdfOpen, setPdfOpen] = useState(false);
  const [commentTarget, setCommentTarget] = useState('');

  // Pre-fill the reviewer's name from their profile — typing it every
  // approval is needless friction.
  useEffect(() => {
    if (reviewerName) return;
    let cancelled = false;
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle();
      if (!cancelled && profile?.full_name) {
        setReviewerName((current) => current || profile.full_name || '');
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.review_id]);

  const handleApprove = async () => {
    if (!signature || !reviewerName.trim()) {
      toast({
        title: 'Signature required',
        description: 'Add your name and signature to countersign.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await approveMutation.mutateAsync({
        reviewId: item.review_id,
        signature,
        reviewerName: reviewerName.trim(),
        comments: comments.trim() || undefined,
      });
      toast({
        title: 'Certificate approved',
        description: 'Your countersignature will appear on the generated PDF.',
      });
      onBack();
    } catch (error) {
      toast({
        title: 'Could not approve',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleReturn = async () => {
    if (!comments.trim()) {
      toast({
        title: 'Comments required',
        description: 'Tell the electrician what needs changing.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await returnMutation.mutateAsync({ reviewId: item.review_id, comments: comments.trim() });
      toast({ title: 'Certificate returned', description: 'The electrician has been notified.' });
      onBack();
    } catch (error) {
      toast({
        title: 'Could not return',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Decisions are only allowed once the certificate itself loaded — if the
  // electrician deleted it, the RPC errors and there is nothing to countersign.
  const isPending = item.status === 'pending' && !!detail && !isError;
  const isWorking = approveMutation.isPending || returnMutation.isPending;
  const canApprove = !!signature && !!reviewerName.trim() && !isWorking;
  const canReturn = !!comments.trim() && !isWorking;

  return (
    <div className="space-y-5">
      {/* In-page back control */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to queue
      </button>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <h3 className="text-lg font-semibold text-white truncate">
            {TYPE_LABEL[item.report_type] || item.report_type} review
          </h3>
          <Pill tone={STATUS_TONE[item.status]}>{STATUS_LABEL[item.status] ?? item.status}</Pill>
        </div>
        <button
          type="button"
          onClick={handleEdit}
          className="shrink-0 inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation transition-transform active:scale-[0.98]"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit cert
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
        </div>
      )}

      {!isLoading && isError && (
        <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 px-4 py-3">
          <p className="text-sm text-orange-300">
            This certificate is no longer available — it may have been deleted by the electrician.
            It cannot be reviewed.
          </p>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {/* Certificate summary */}
          <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-4 sm:p-5 space-y-4">
            <h4 className="text-[15px] font-semibold text-white flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
              Certificate
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <DetailField label="Client" value={item.client_name} />
              <DetailField label="Certificate no." value={item.certificate_number} />
              <DetailField label="Address" value={item.installation_address} />
              <DetailField label="Inspection date" value={item.inspection_date} />
              <DetailField label="Submitted by" value={item.electrician_name} />
              <DetailField label="Inspector on cert" value={item.inspector_name} />
            </div>
            {item.submitted_note && (
              <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/40">
                  Note from electrician
                </p>
                <p className="text-sm text-white/80 whitespace-pre-wrap">{item.submitted_note}</p>
              </div>
            )}
            {item?.report_id && (
              <>
                <button
                  type="button"
                  onClick={() => setPdfOpen(true)}
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-elec-yellow touch-manipulation"
                >
                  View PDF
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
                {/* Shared I&T viewer — generates the cert PDF on demand. */}
                <ReportPdfViewer
                  reportId={item.report_id}
                  open={pdfOpen}
                  onOpenChange={setPdfOpen}
                />
              </>
            )}
          </div>

          {/* Full technical review — observations, test schedule, declarations */}
          {detail?.report?.data && (
            <QsCertReviewBody
              reportType={item.report_type}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data={detail.report.data as Record<string, any>}
              onAddComment={setCommentTarget}
            />
          )}

          {/* Itemised QS comments — targeted notes + electrician replies */}
          <QsReviewComments
            reviewId={item.review_id}
            authorName={reviewerName}
            prefillTarget={commentTarget}
          />

          {/* Prior decision (non-pending) */}
          {!isPending && (
            <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-4 py-3 space-y-1">
              <p className="text-sm font-medium text-white">
                {STATUS_LABEL[item.status] ?? item.status}
              </p>
              <p className="text-xs text-white/60">
                {item.reviewer_name ? `By ${item.reviewer_name}` : ''}
                {item.reviewed_at ? ` on ${formatDate(item.reviewed_at)}` : ''}
              </p>
              {item.review_comments && (
                <p className="text-sm text-white/80 whitespace-pre-wrap">{item.review_comments}</p>
              )}
            </div>
          )}

          {/* Originator — act on the QS's feedback (edit + resubmit) */}
          {side === 'mine' && (
            <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-4 sm:p-5 space-y-3">
              <h4 className="text-[15px] font-semibold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                {item.status === 'returned'
                  ? 'Action your QS feedback'
                  : item.status === 'approved'
                    ? 'Approved by your QS'
                    : 'Awaiting your QS'}
              </h4>
              <p className="text-[13px] text-white/70">
                {item.status === 'returned'
                  ? 'Edit the certificate to address the comments above, then send it back for review.'
                  : item.status === 'approved'
                    ? 'Your QS has countersigned this certificate.'
                    : 'Your QS has this for review. You can still edit and re-send if needed.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <PrimaryButton size="lg" fullWidth onClick={handleEdit}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit certificate
                </PrimaryButton>
                {item.status !== 'approved' && (
                  <SecondaryButton
                    size="lg"
                    fullWidth
                    onClick={handleResubmit}
                    disabled={submitMutation.isPending}
                  >
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    {submitMutation.isPending ? 'Sending…' : 'Resubmit to QS'}
                  </SecondaryButton>
                )}
              </div>
            </div>
          )}

          {/* Decision */}
          {side === 'review' && isPending && mode === 'view' && (
            <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-4 sm:p-5 space-y-4">
              <h4 className="text-[15px] font-semibold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Decision
              </h4>
              <div className="flex flex-col gap-3">
                <PrimaryButton size="lg" fullWidth onClick={() => setMode('approve')}>
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Approve &amp; countersign
                </PrimaryButton>
                <SecondaryButton size="lg" fullWidth onClick={() => setMode('return')}>
                  <Undo2 className="h-4 w-4 mr-2" />
                  Return with comments
                </SecondaryButton>
              </div>
            </div>
          )}

          {side === 'review' && isPending && mode === 'approve' && (
            <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-4 sm:p-5 space-y-4">
              <h4 className="text-[15px] font-semibold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Countersign as Qualifying Supervisor
              </h4>
              <Field label="Your full name" required>
                <input
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Your full name"
                  className={inputClass}
                />
              </Field>
              <Field label="Signature" required>
                <SignatureInput value={signature ?? undefined} onChange={setSignature} />
              </Field>
              <Field label="Comments" hint="Optional — appears on the record.">
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Comments (optional)"
                  className={`${textareaClass} min-h-[80px]`}
                />
              </Field>
              <div className="flex flex-col gap-3">
                <PrimaryButton size="lg" fullWidth disabled={!canApprove} onClick={handleApprove}>
                  {isWorking ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <ShieldCheck className="h-4 w-4 mr-2" />
                  )}
                  Confirm approval
                </PrimaryButton>
                <SecondaryButton
                  size="lg"
                  fullWidth
                  disabled={isWorking}
                  onClick={() => setMode('view')}
                >
                  Back
                </SecondaryButton>
              </div>
            </div>
          )}

          {side === 'review' && isPending && mode === 'return' && (
            <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-4 sm:p-5 space-y-4">
              <h4 className="text-[15px] font-semibold text-white flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                Return to electrician
              </h4>
              <Field label="What needs changing?" required>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="What needs changing? (required)"
                  className={`${textareaClass} min-h-[120px]`}
                />
              </Field>
              <div className="flex flex-col gap-3">
                <DestructiveButton size="lg" fullWidth disabled={!canReturn} onClick={handleReturn}>
                  {isWorking ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Undo2 className="h-4 w-4 mr-2" />
                  )}
                  Return certificate
                </DestructiveButton>
                <SecondaryButton
                  size="lg"
                  fullWidth
                  disabled={isWorking}
                  onClick={() => setMode('view')}
                >
                  Back
                </SecondaryButton>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/**
 * QsReviewPage — the worker-side QS review page (ELE-1975).
 *
 * Two sides:
 *  - My certificates: the worker's own certs that went to a QS, returned first,
 *    with the QS's reasons and comments and an edit + resubmit path.
 *  - To review (team members with the QS role): the firm's sign-off queue.
 *    This is the working path for a QS who is NOT the firm owner; they never
 *    need the Employer Hub.
 *
 * Shares the data layer, cards, decision panel and reason chips with the
 * Employer Hub QS reviews section, so the two sides cannot drift.
 * Deep links: ?review=<id> opens a review; &side=review starts on To review.
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, ShieldCheck, ArrowLeft, Pencil, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { openPrintRegister } from '@/utils/printRegister';
import QsCertReviewBody from '@/components/employer/sections/QsCertReviewBody';
import { QsReviewComments } from '@/components/employer/sections/QsReviewComments';
import { ReportPdfViewer } from '@/components/reports/ReportPdfViewer';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import { WT_QS_HELP } from '@/components/worker-tools/help/worker-help-2';
import {
  StatStrip,
  FilterBar,
  PrimaryButton,
  SecondaryButton,
  EmptyState,
  LoadingBlocks,
} from '@/components/employer/editorial';
import {
  useQsReviewQueue,
  useMyQsReviews,
  useQsReviewReport,
  useQsReviewStats,
  type QsQueueItem,
} from '@/hooks/useQsReviewQueue';
import { useQsTeamContext, useSubmitForQsReview } from '@/hooks/useQsReview';
import { certificateHref } from '@/utils/certificate-href';
import {
  QsQueueCard,
  CommonReturnsPanel,
  QS_TYPE_LABEL,
  formatSignoffTime,
  waitedFor,
} from '@/components/employer/sections/QSReviewsSection';
import { QsDecisionPanel, useMyFullName } from '@/components/employer/qs/QsDecisionPanel';
import { QsStatusBadge, ReturnReasonList } from '@/components/employer/qs/returnReasons';
import { formatUKDate } from '@/utils/collegeHelpers';

type ScopeTab = 'pending' | 'returned' | 'approved' | 'all';
type Side = 'mine' | 'review';

const card =
  'rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4 sm:p-5';

export default function QsReviewPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const { data: teamCtx } = useQsTeamContext();
  const amIQs = !!teamCtx?.am_i_qs || !!teamCtx?.am_i_principal_qs;
  const isFirmOwner = !!user?.id && teamCtx?.employer_id === user.id;
  const [side, setSide] = useState<Side>('mine');
  const effectiveSide: Side = side === 'review' && amIQs ? 'review' : 'mine';
  const isReview = effectiveSide === 'review';

  const mineQuery = useMyQsReviews();
  const reviewQuery = useQsReviewQueue('all');
  const { data: stats } = useQsReviewStats();
  const { data: allItems = [], isLoading } = isReview ? reviewQuery : mineQuery;

  const [tab, setTab] = useState<ScopeTab>('pending');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Deep link from the bell / push: ?review=<id> opens that certificate.
  // ?side=review starts on the reviewer queue (a colleague's cert to sign).
  // Looks in the starting side first, then the other, then drops the params.
  const [searchParams, setSearchParams] = useSearchParams();
  const reviewParam = searchParams.get('review');
  const sideParam = searchParams.get('side');
  const [linkTried, setLinkTried] = useState<Side | null>(null);
  useEffect(() => {
    if (!reviewParam) return;
    if (linkTried === null) {
      if (sideParam === 'review' && !teamCtx) return; // wait for the QS context
      const start: Side = sideParam === 'review' && amIQs ? 'review' : 'mine';
      setSide(start);
      setLinkTried(start);
      return;
    }
    if (isLoading || effectiveSide !== linkTried) return;
    const hit = allItems.find((it) => it.review_id === reviewParam);
    if (!hit && linkTried === 'mine' && amIQs && sideParam !== 'review') {
      setSide('review');
      setLinkTried('review');
      return;
    }
    if (hit) {
      setSelectedId(hit.review_id);
      setTab(hit.status === 'cancelled' ? 'all' : hit.status);
    } else {
      toast({ title: 'That review is no longer here', description: 'It may have been cancelled.' });
    }
    setLinkTried(null);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('review');
        next.delete('side');
        return next;
      },
      { replace: true }
    );
  }, [reviewParam, sideParam, amIQs, teamCtx, linkTried, isLoading, effectiveSide, allItems, setSearchParams, toast]);

  const switchSide = (next: Side) => {
    setSide(next);
    setSelectedId(null);
    setTab(next === 'mine' ? 'returned' : 'pending');
  };

  // Originators land on Returned when something needs fixing, else Waiting.
  const [defaulted, setDefaulted] = useState(false);
  useEffect(() => {
    if (defaulted || isLoading || reviewParam || isReview) return;
    setDefaulted(true);
    if (allItems.some((i) => i.status === 'returned')) setTab('returned');
  }, [defaulted, isLoading, reviewParam, isReview, allItems]);

  const counts = useMemo(() => {
    const c = { pending: 0, approved: 0, returned: 0 };
    for (const it of allItems) if (it.status in c) c[it.status as keyof typeof c] += 1;
    return c;
  }, [allItems]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allItems
      .filter((it) => (tab === 'all' ? true : it.status === tab))
      .filter(
        (it) =>
          !q ||
          [it.client_name, it.installation_address, it.electrician_name, it.certificate_number, it.report_id, it.job_title]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(q))
      )
      .sort((a, b) =>
        tab === 'pending' && isReview
          ? new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime()
          : new Date(b.reviewed_at || b.submitted_at).getTime() - new Date(a.reviewed_at || a.submitted_at).getTime()
      );
  }, [allItems, tab, search, isReview]);

  // Opening a certificate on a phone starts at its top, not mid-page.
  useEffect(() => {
    if (selectedId && typeof window !== 'undefined' && window.innerWidth < 1024) {
      window.scrollTo({ top: 0 });
    }
  }, [selectedId]);

  const selectedItem = useMemo(
    () => allItems.find((it) => it.review_id === selectedId) ?? null,
    [allItems, selectedId]
  );

  const handleDecided = (status: 'approved' | 'returned') => {
    setSelectedId(null);
    setTab(status);
  };

  const handleExport = async () => {
    const ok = await openPrintRegister({
      title: 'QS Review Register',
      subtitle: 'Qualifying Supervisor certificate sign-off record',
      columns: ['Certificate', 'Type', 'Client', 'Electrician', 'Submitted', 'Status', 'Reviewed by', 'Reviewed'],
      rows: allItems.map((it) => [
        it.certificate_number || it.report_id,
        QS_TYPE_LABEL[it.report_type] || it.report_type.toUpperCase(),
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

  const description = isReview
    ? 'Certificates your team sent for Qualifying Supervisor sign-off. Check the detail, then countersign or send it back with reasons.'
    : 'Certificates you sent for QS sign-off. If one comes back, the reasons and comments are here. Fix it and resubmit.';

  const sideToggle = amIQs ? (
    <div
      className="grid grid-cols-2 gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] p-1"
      data-help="wt-qs.side"
    >
      {(
        [
          { key: 'mine', label: 'My certificates' },
          { key: 'review', label: `To review${stats?.waiting ? ` (${stats.waiting})` : ''}` },
        ] as const
      ).map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => switchSide(key)}
          className={
            effectiveSide === key
              ? 'h-11 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation'
              : 'h-11 rounded-full text-white text-[13px] font-semibold touch-manipulation'
          }
        >
          {label}
        </button>
      ))}
    </div>
  ) : null;

  const statStrip = isReview ? (
    <StatStrip
      columns={4}
      stats={[
        {
          label: 'Waiting',
          value: stats?.waiting ?? counts.pending,
          sub: stats?.oldest_waiting_at ? `Oldest ${waitedFor(stats.oldest_waiting_at)}` : 'All clear',
          onClick: () => setTab('pending'),
        },
        { label: 'Returned this month', value: stats?.returned_month ?? 0, onClick: () => setTab('returned') },
        { label: 'Approved this month', value: stats?.approved_month ?? 0, onClick: () => setTab('approved') },
        { label: 'Average sign-off', value: formatSignoffTime(stats?.avg_hours_to_signoff), sub: 'Last 90 days' },
      ]}
    />
  ) : (
    <StatStrip
      columns={3}
      stats={[
        { label: 'Needs fixing', value: counts.returned, onClick: () => setTab('returned') },
        { label: 'With your QS', value: counts.pending, onClick: () => setTab('pending') },
        { label: 'Approved', value: counts.approved, onClick: () => setTab('approved') },
      ]}
    />
  );

  const emptyAll = isReview
    ? {
        title: 'Nothing to review',
        description:
          'When someone on your team sends an EICR, EIC or Minor Works for sign-off it shows here, and the bell tells you.',
        action: 'See my certificates',
        onAction: () => switchSide('mine'),
      }
    : {
        title: 'Nothing sent for QS sign-off yet',
        description:
          'Finish a certificate and send it for QS review from the certificate. Your QS’s decision and any comments come back here.',
        action: 'Open my certificates',
        onAction: () => navigate('/electrician/inspection-testing'),
      };

  const tabEmpty: Record<ScopeTab, string> = isReview
    ? {
        pending: 'Nothing waiting for your sign-off.',
        returned: 'Nothing you have sent back.',
        approved: 'Nothing approved yet.',
        all: 'No reviews yet.',
      }
    : {
        pending: 'Nothing with your QS right now.',
        returned: 'Nothing to fix. Good work.',
        approved: 'Nothing approved yet.',
        all: 'Nothing sent yet.',
      };

  const queue = (
    <div className="space-y-5">
      <div data-help="wt-qs.tabs">
        <FilterBar
          tabs={[
            { value: 'pending', label: isReview ? 'Waiting' : 'With QS', count: counts.pending },
            { value: 'returned', label: 'Returned', count: counts.returned },
            { value: 'approved', label: 'Approved', count: counts.approved },
            { value: 'all', label: 'All', count: allItems.length },
          ]}
          activeTab={tab}
          onTabChange={(v) => setTab(v as ScopeTab)}
        />
      </div>
      <FilterBar search={search} onSearchChange={setSearch} searchPlaceholder="Search client, address, job" />
      {filtered.length === 0 ? (
        <EmptyState
          title={search.trim() ? 'No matching reviews' : tabEmpty[tab]}
          description={search.trim() ? 'Try a different client, address or job.' : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 gap-3" data-help="wt-qs.list">
          {filtered.map((item) => (
            <QsQueueCard
              key={item.review_id}
              item={item}
              selected={item.review_id === selectedId}
              personLabel={isReview ? 'electrician' : 'reviewer'}
              onOpen={() => setSelectedId(item.review_id)}
            />
          ))}
        </div>
      )}
    </div>
  );

  const content = isLoading ? (
    <div className="space-y-4">
      {sideToggle}
      <LoadingBlocks />
    </div>
  ) : allItems.length === 0 ? (
    <div className="space-y-4">
      {sideToggle}
      <EmptyState {...emptyAll} />
      {isReview && isFirmOwner && (
        <EmptyState
          title="No QS on your team yet?"
          description="Give someone the QS role in your Employer Hub team so certificates reach them."
          action="Open Team"
          onAction={() => navigate('/employer?section=team')}
        />
      )}
    </div>
  ) : (
    <div className="space-y-6">
      {/* On a phone the open certificate takes the screen; the summary waits. */}
      <div className={selectedItem ? 'hidden lg:block space-y-6' : 'space-y-6'}>
        {sideToggle}
        {statStrip}
        {isReview && <CommonReturnsPanel stats={stats} />}
      </div>
      {/* One render of each: on a phone the open certificate replaces the
          queue; on a desktop they sit side by side. */}
      <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
        <div className={selectedItem ? 'hidden lg:block min-w-0' : 'min-w-0'}>{queue}</div>
        <div className={selectedItem ? 'min-w-0' : 'hidden lg:block min-w-0'}>
          {selectedItem ? (
            <QsReviewDetail
              item={selectedItem}
              side={effectiveSide}
              canSign={stats?.can_sign !== false}
              onBack={() => setSelectedId(null)}
              onDecided={handleDecided}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-white/[0.16] bg-white/[0.03] px-6 py-16 text-center">
              <p className="text-sm font-medium text-white">Pick a certificate</p>
              <p className="mt-1 text-[12.5px] text-white">Its full detail opens here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <WorkerToolPage
      eyebrow="Quality"
      title="QS reviews"
      help={WT_QS_HELP}
      description={description}
      actions={
        allItems.length > 0 ? <SecondaryButton onClick={handleExport}>Export register</SecondaryButton> : undefined
      }
    >
      {content}
    </WorkerToolPage>
  );
}

/* ────────────────────────────────────────────────────────
   Detail — summary, why it came back, the technical body, comments, decision
   ──────────────────────────────────────────────────────── */

function DetailField({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white">{label}</p>
      <p className="mt-0.5 text-sm text-white break-words">{value || '–'}</p>
    </div>
  );
}

function QsReviewDetail({
  item,
  side,
  canSign,
  onBack,
  onDecided,
}: {
  item: QsQueueItem;
  side: Side;
  canSign: boolean;
  onBack: () => void;
  onDecided: (status: 'approved' | 'returned') => void;
}) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data: detail, isLoading, isError } = useQsReviewReport(item.review_id);
  const submitMutation = useSubmitForQsReview();
  const myName = useMyFullName();
  const [pdfOpen, setPdfOpen] = useState(false);
  const [commentTarget, setCommentTarget] = useState('');

  const handleResubmit = async () => {
    try {
      await submitMutation.mutateAsync({ reportId: item.report_id });
      toast({ title: 'Sent back to your QS', description: 'They will review it again.' });
      onBack();
    } catch (err) {
      toast({
        title: 'Resubmit failed',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = () => navigate(certificateHref(item.report_type, item.report_id));
  const decidable = side === 'review' && item.status === 'pending' && !!detail && !isError;

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex h-11 items-center gap-1.5 text-[13px] font-semibold text-white touch-manipulation"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to the list
      </button>

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
            {QS_TYPE_LABEL[item.report_type] || item.report_type}
            {item.certificate_number ? ` ${item.certificate_number}` : ''}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white break-words">{item.client_name || 'Certificate'}</h3>
          <div className="mt-2">
            <QsStatusBadge status={item.status} />
          </div>
        </div>
        <button
          type="button"
          onClick={handleEdit}
          className="shrink-0 inline-flex items-center gap-1.5 h-11 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation active:scale-[0.98]"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit cert
        </button>
      </div>

      {/* Why it came back — first thing the electrician sees. */}
      {side === 'mine' && item.status === 'returned' && (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/[0.08] p-4 sm:p-5 space-y-3" data-help="wt-qs.why">
          <h4 className="text-[15px] font-semibold text-white">
            Why it came back{item.reviewer_name ? ` from ${item.reviewer_name}` : ''}
          </h4>
          <ReturnReasonList codes={item.return_reasons} />
          {item.review_comments && <p className="text-sm text-white whitespace-pre-wrap">{item.review_comments}</p>}
          <p className="text-[12.5px] text-white">Comments against a circuit or observation are below, with its name.</p>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-white" />
        </div>
      )}

      {!isLoading && isError && (
        <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 px-4 py-3">
          <p className="text-sm text-white">
            This certificate is no longer available. It may have been deleted, so it cannot be reviewed.
          </p>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className={`${card} space-y-4`}>
            <div className="grid grid-cols-2 gap-3">
              <DetailField label="Address" value={item.installation_address} />
              <DetailField label="Inspection date" value={formatUKDate(item.inspection_date)} />
              <DetailField label="Sent by" value={item.electrician_name} />
              <DetailField label="Sent" value={formatUKDate(item.submitted_at)} />
            </div>
            {item.job_title && (
              <p className="inline-flex items-center gap-1.5 text-[13px] text-white">
                <Briefcase className="h-3.5 w-3.5" aria-hidden />
                {item.job_title}
              </p>
            )}
            {item.submitted_note && (
              <div className="border-t border-white/[0.1] pt-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white">Note from the electrician</p>
                <p className="mt-0.5 text-sm text-white whitespace-pre-wrap">{item.submitted_note}</p>
              </div>
            )}
            <SecondaryButton onClick={() => setPdfOpen(true)}>View PDF</SecondaryButton>
            <ReportPdfViewer reportId={item.report_id} open={pdfOpen} onOpenChange={setPdfOpen} />
          </div>

          {/* Originator — act on the feedback */}
          {side === 'mine' && item.status !== 'cancelled' && (
            <div className={`${card} space-y-3`}>
              <h4 className="text-[15px] font-semibold text-white">
                {item.status === 'returned'
                  ? 'Fix it and send it back'
                  : item.status === 'approved'
                    ? 'Approved by your QS'
                    : 'With your QS'}
              </h4>
              <p className="text-[13px] text-white">
                {item.status === 'returned'
                  ? 'Edit the certificate to sort out the reasons above, then resubmit it.'
                  : item.status === 'approved'
                    ? 'Your QS has countersigned this certificate.'
                    : `Sent ${waitedFor(item.submitted_at)} ago. You can still edit it and resend if you need to.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <PrimaryButton data-help="wt-qs.edit" size="lg" fullWidth onClick={handleEdit}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit certificate
                </PrimaryButton>
                {item.status !== 'approved' && (
                  <SecondaryButton
                    data-help="wt-qs.resubmit"
                    size="lg"
                    fullWidth
                    onClick={handleResubmit}
                    disabled={submitMutation.isPending}
                  >
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    {submitMutation.isPending ? 'Sending' : 'Resubmit to QS'}
                  </SecondaryButton>
                )}
              </div>
            </div>
          )}

          {/* Reviewer — prior decision */}
          {side === 'review' && item.status !== 'pending' && (
            <div className={`${card} space-y-2`}>
              <h4 className="text-[15px] font-semibold text-white">
                {item.status === 'approved' ? 'Approved' : item.status === 'returned' ? 'Returned' : 'Cancelled'}
                {item.reviewer_name ? ` by ${item.reviewer_name}` : ''}
                {item.reviewed_at ? ` on ${formatUKDate(item.reviewed_at)}` : ''}
              </h4>
              <ReturnReasonList codes={item.return_reasons} />
              {item.review_comments && <p className="text-sm text-white whitespace-pre-wrap">{item.review_comments}</p>}
            </div>
          )}

          {decidable && (
            <QsDecisionPanel item={item} canSign={canSign} onDecided={onDecided} dataHelpPrefix="wt-qs" />
          )}

          <div data-help="wt-qs.comments">
            <QsReviewComments reviewId={item.review_id} authorName={myName} prefillTarget={commentTarget} />
          </div>

          {detail?.report?.data && (
            <QsCertReviewBody
              reportType={item.report_type}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data={detail.report.data as Record<string, any>}
              onAddComment={side === 'review' ? setCommentTarget : undefined}
            />
          )}
        </>
      )}
    </div>
  );
}

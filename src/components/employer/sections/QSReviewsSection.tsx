import { openPrintRegister } from '@/utils/printRegister';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, Pencil, Briefcase, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { FormSheet } from '@/components/forms/FormSheet';
import QsCertReviewBody from '@/components/employer/sections/QsCertReviewBody';
import TeamCertificatesSection from '@/components/inspection/TeamCertificatesSection';
import { QsReviewComments } from '@/components/employer/sections/QsReviewComments';
import { ReportPdfViewer } from '@/components/reports/ReportPdfViewer';
import { formatUKDate } from '@/utils/collegeHelpers';
import {
  frameClass,
  twoColClass,
  colClass,
  panel,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  PlainEmpty,
  Segments,
  SearchField,
} from '@/components/employer/pageParts/PageParts';
import {
  PageFrame,
  PageHero,
  StatStrip,
  LoadingBlocks,
  SecondaryButton,
} from '@/components/employer/editorial';
import {
  useQsReviewQueue,
  useQsReviewReport,
  useQsReviewStats,
  type QsQueueItem,
  type QsReviewStats,
} from '@/hooks/useQsReviewQueue';
import { useQsTeamContext } from '@/hooks/useQsReview';
import { certificateHref } from '@/utils/certificate-href';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { QS_REVIEWS_HELP } from '@/components/employer/help/jobs-quality';
import { QsDecisionPanel, useMyFullName } from '@/components/employer/qs/QsDecisionPanel';
import { QsStatusBadge, ReturnReasonList } from '@/components/employer/qs/returnReasons';

/* ==========================================================================
   QS reviews (ELE-1975) — the Employer Hub sign-off queue.

   Waiting / Returned / Approved / All, with the firm's numbers on top and a
   "Common returns" panel built from the reasons the QS ticks, so recurring
   mistakes are visible and can be coached. The same component renders inside
   the I&T QS bench (`embedded`), without the page hero.
   ========================================================================== */

export const QS_TYPE_LABEL: Record<string, string> = {
  eicr: 'EICR',
  eic: 'EIC',
  'minor-works': 'Minor Works',
};

type Tab = 'pending' | 'returned' | 'approved' | 'all' | 'team';

const shortDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '';

/** "3 hours", "2 days" — how long something has waited. */
export function waitedFor(iso: string | null | undefined): string {
  if (!iso) return '';
  const ms = Date.now() - new Date(iso).getTime();
  if (!Number.isFinite(ms) || ms < 0) return '';
  const h = Math.floor(ms / 3_600_000);
  if (h < 1) return 'under an hour';
  if (h < 48) return `${h} hour${h === 1 ? '' : 's'}`;
  const d = Math.floor(h / 24);
  return `${d} days`;
}

export function formatSignoffTime(hours: number | null | undefined): string {
  if (hours === null || hours === undefined) return '–';
  if (hours < 1) return '< 1 h';
  if (hours < 48) return `${Math.round(hours)} h`;
  return `${(hours / 24).toFixed(1)} d`;
}

/* ── Common returns panel ─────────────────────────────────────────────── */

export function CommonReturnsPanel({ stats }: { stats: QsReviewStats | undefined }) {
  const reasons = stats?.common_reasons ?? [];
  const decided = stats?.decided_recent ?? 0;
  const returned = stats?.returned_recent ?? 0;
  if (!stats?.has_queue || decided === 0) return null;
  const max = Math.max(1, ...reasons.map((r) => r.count));
  return (
    <section
      data-help="qsreviews.common"
      className="-mx-4 sm:mx-0 rounded-none sm:rounded-2xl border-y sm:border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4 sm:p-5 space-y-4"
    >
      <div>
        <h2 className="text-[15px] font-semibold tracking-tight text-white">Common returns</h2>
        <p className="mt-1 text-[13px] text-white">
          {returned === 0
            ? `None of the last ${decided} certificates came back. Nothing to coach.`
            : `${returned} of the last ${decided} certificates came back.`}
        </p>
      </div>
      {reasons.length === 0 && returned > 0 ? (
        <p className="text-[13px] text-white">
          These returns have no reasons ticked. Tick a reason next time you return one and the
          pattern shows here.
        </p>
      ) : (
        <ul className="space-y-3">
          {reasons.slice(0, 6).map((r) => (
            <li key={r.code} className="space-y-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[13.5px] font-medium text-white">{r.label}</span>
                <span className="shrink-0 text-[12.5px] tabular-nums text-white">
                  {r.count} of the last {decided}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full rounded-full bg-red-400"
                  style={{ width: `${Math.round((r.count / max) * 100)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* ── Queue card ───────────────────────────────────────────────────────── */

export function QsQueueCard({
  item,
  onOpen,
  selected,
  personLabel = 'electrician',
}: {
  item: QsQueueItem;
  onOpen: () => void;
  selected?: boolean;
  personLabel?: 'electrician' | 'reviewer';
}) {
  const when =
    item.status === 'pending'
      ? `Waiting ${waitedFor(item.submitted_at)}`
      : item.status === 'cancelled'
        ? `Cancelled ${shortDate(item.reviewed_at || item.submitted_at)}`
        : `${item.status === 'approved' ? 'Approved' : 'Returned'} ${shortDate(item.reviewed_at)}`;
  const who =
    personLabel === 'reviewer'
      ? item.reviewer_name
        ? `QS ${item.reviewer_name}`
        : 'Sent to your QS'
      : item.electrician_name;
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'group w-full text-left rounded-2xl border p-4 touch-manipulation transition-colors',
        'bg-gradient-to-b from-white/[0.07] to-white/[0.03] hover:border-white/[0.3]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
        selected ? 'border-elec-yellow' : 'border-white/[0.12]'
      )}
    >
      <div className="flex items-center gap-2">
        <span className="shrink-0 rounded-md border border-white/[0.2] px-1.5 py-0.5 text-[12px] font-semibold text-white">
          {QS_TYPE_LABEL[item.report_type] || item.report_type.toUpperCase()}
        </span>
        {item.certificate_number && (
          <span className="min-w-0 truncate font-mono text-[11.5px] text-white">
            {item.certificate_number}
          </span>
        )}
        <span className="ml-auto">
          <QsStatusBadge
            status={item.status}
            label={item.status === 'pending' ? 'Waiting' : undefined}
          />
        </span>
      </div>
      <p className="mt-2.5 text-[15px] font-semibold tracking-tight text-white truncate">
        {item.client_name || 'No client name'}
      </p>
      <p className="mt-0.5 text-[12.5px] text-white truncate">
        {item.installation_address || 'No address'}
      </p>
      {item.job_title && (
        <p className="mt-1.5 inline-flex max-w-full items-center gap-1.5 text-[12px] text-white">
          <Briefcase className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="truncate">{item.job_title}</span>
        </p>
      )}
      {item.status === 'returned' && (item.return_reasons?.length ?? 0) > 0 && (
        <ReturnReasonList codes={item.return_reasons} className="mt-2.5" />
      )}
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/[0.08] pt-3">
        <span className="min-w-0 truncate text-[12px] text-white">
          {who}
          {who ? ' · ' : ''}
          {when}
        </span>
        <span className="shrink-0 text-[12.5px] font-semibold text-elec-yellow">Open</span>
      </div>
    </button>
  );
}

/* ── Section ──────────────────────────────────────────────────────────── */

export function QSReviewsSection({ embedded = false }: { embedded?: boolean } = {}) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('pending');
  const [search, setSearch] = useState('');
  const { data: items = [], isLoading, isError, refetch } = useQsReviewQueue('all');
  const { data: stats } = useQsReviewStats();
  const { data: qsCtx } = useQsTeamContext();
  const [openId, setOpenId] = useState<string | null>(null);
  const openItem = useMemo(
    () => items.find((i) => i.review_id === openId) ?? null,
    [items, openId]
  );

  // Team Certificates reads reports directly; its row access only covers the
  // company owner or the principal QS, so only offer the tab to them.
  const canSeeTeamCerts = !qsCtx?.is_team_member || !!qsCtx?.am_i_principal_qs;
  const canSign = stats?.can_sign !== false;
  useEffect(() => {
    if (!canSeeTeamCerts && tab === 'team') setTab('pending');
  }, [canSeeTeamCerts, tab]);

  // Deep link from the bell / push: ?review=<id> opens that certificate on the
  // tab it belongs to, then drops the param.
  const [searchParams, setSearchParams] = useSearchParams();
  const reviewParam = searchParams.get('review');
  useEffect(() => {
    if (!reviewParam || isLoading) return;
    const hit = items.find((i) => i.review_id === reviewParam);
    if (hit) {
      setTab(hit.status === 'cancelled' ? 'all' : hit.status);
      setOpenId(hit.review_id);
    } else if (!isError) {
      toast({ title: 'That review is no longer in your queue' });
    }
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('review');
        return next;
      },
      { replace: true }
    );
  }, [reviewParam, isLoading, isError, items, setSearchParams]);

  const counts = useMemo(() => {
    const c = { pending: 0, returned: 0, approved: 0 };
    for (const it of items) if (it.status in c) c[it.status as keyof typeof c] += 1;
    return c;
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items
      .filter((it) => (tab === 'all' || tab === 'team' ? true : it.status === tab))
      .filter(
        (it) =>
          !q ||
          [
            it.client_name,
            it.installation_address,
            it.electrician_name,
            it.certificate_number,
            it.report_id,
            it.job_title,
          ]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(q))
      )
      .sort((a, b) =>
        tab === 'pending'
          ? new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime()
          : new Date(b.reviewed_at || b.submitted_at).getTime() -
            new Date(a.reviewed_at || a.submitted_at).getTime()
      );
  }, [items, tab, search]);

  const exportRegister = async () => {
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
      rows: items.map((it) => [
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

  const isOwnerSide = !qsCtx?.is_team_member;
  const helpBlockers: HelpBlocker[] = [];
  if (!isError && !isLoading && items.length === 0 && isOwnerSide) {
    helpBlockers.push({
      text: 'Nothing has been sent for sign-off yet. Someone on your team needs the QS role, and the team sends certificates from the certificate form.',
      fixLabel: 'Open Team',
      onFix: () => navigate('/employer?section=team'),
    });
  }

  const oldest = stats?.oldest_waiting_at
    ? `Oldest ${waitedFor(stats.oldest_waiting_at)}`
    : 'All clear';
  const statStrip = (
    <StatStrip
      columns={4}
      stats={[
        {
          label: 'Waiting',
          value: stats?.waiting ?? counts.pending,
          tone: (stats?.waiting ?? counts.pending) > 0 ? 'yellow' : undefined,
          sub: oldest,
          onClick: () => setTab('pending'),
        },
        {
          label: 'Returned this month',
          value: stats?.returned_month ?? 0,
          onClick: () => setTab('returned'),
        },
        {
          label: 'Approved this month',
          value: stats?.approved_month ?? 0,
          onClick: () => setTab('approved'),
        },
        {
          label: 'Average sign-off',
          value: formatSignoffTime(stats?.avg_hours_to_signoff),
          sub: 'Approved, last 90 days',
        },
      ]}
    />
  );

  // The figure strip carries the counts; the tabs carry labels only.
  const tabs: { value: Tab; label: string }[] = [
    { value: 'pending', label: 'Waiting' },
    { value: 'returned', label: 'Returned' },
    { value: 'approved', label: 'Approved' },
    { value: 'all', label: 'All' },
    ...(canSeeTeamCerts ? [{ value: 'team' as Tab, label: 'Team certificates' }] : []),
  ];

  const emptyCopy: Record<Exclude<Tab, 'team'>, { title: string; description: string }> = {
    pending: {
      title: 'Nothing waiting for sign-off',
      description:
        'When someone on your team sends an EICR, EIC or Minor Works for QS sign-off it lands here, and the bell tells you.',
    },
    returned: {
      title: 'Nothing sent back',
      description:
        'Certificates you return with reasons show here until the electrician resubmits them.',
    },
    approved: {
      title: 'Nothing approved yet',
      description: 'Countersigned certificates show here, ready for the register.',
    },
    all: {
      title: 'No reviews yet',
      description: isOwnerSide
        ? 'Give someone on your team the QS role in Team. Their certificates then come here for sign-off.'
        : 'Certificates your team sends for sign-off show here.',
    },
  };

  const body = (
    <>
      {!canSign && stats?.has_queue && (
        <div className={cn(panel, 'px-4 py-3 sm:px-5')}>
          <p className="text-[14px] text-white">
            You can see the queue. Only the owner, an admin manager or a team member with the QS
            role can countersign or return.
          </p>
        </div>
      )}

      {isError && tab !== 'team' && (
        <PlainEmpty
          text="Couldn't load the review queue. Certificates may still be waiting for sign-off."
          action="Try again"
          onAction={() => refetch()}
        />
      )}

      <div className={embedded ? 'space-y-5' : twoColClass}>
        <div className={embedded ? 'space-y-5' : colClass}>
          <div
            data-help="qsreviews.scope"
            className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between"
          >
            <Segments items={tabs} value={tab} onChange={setTab} wrap={tabs.length > 4} />
            {tab !== 'team' && (
              <SearchField
                value={search}
                onChange={setSearch}
                placeholder="Search reviews"
                className="xl:w-60"
              />
            )}
          </div>

          {tab === 'team' ? (
            <TeamCertificatesSection />
          ) : isLoading ? (
            <LoadingBlocks />
          ) : isError ? null : filtered.length === 0 ? (
            <PlainEmpty
              text={
                search.trim()
                  ? 'No reviews match that client, address, electrician or job.'
                  : emptyCopy[tab].description
              }
              action={!search.trim() && tab === 'all' && isOwnerSide ? 'Open Team' : undefined}
              onAction={
                !search.trim() && tab === 'all' && isOwnerSide
                  ? () => navigate('/employer?section=team')
                  : undefined
              }
            />
          ) : (
            <div
              className={cn('grid grid-cols-1 gap-3 md:grid-cols-2', embedded && 'xl:grid-cols-3')}
              data-help="qsreviews.list"
            >
              {filtered.map((item) => (
                <QsQueueCard
                  key={item.review_id}
                  item={item}
                  onOpen={() => setOpenId(item.review_id)}
                />
              ))}
            </div>
          )}
        </div>

        {stats?.has_queue && (stats?.decided_recent ?? 0) > 0 && (
          <div className={embedded ? '' : colClass}>
            <CommonReturnsPanel stats={stats} />
          </div>
        )}
      </div>

      <QsReviewDetailSheet
        item={openItem}
        canSign={canSign}
        onClose={() => setOpenId(null)}
        onDecided={(status) => {
          setOpenId(null);
          setTab(status);
        }}
      />
    </>
  );

  if (embedded) {
    return (
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[13px] text-white">
            {counts.pending > 0 ? `${counts.pending} waiting for sign-off` : 'Nothing waiting'}
          </p>
          <PageHelpButton
            help={QS_REVIEWS_HELP}
            blockers={helpBlockers}
            askContext={{ page: 'qsreviews', tab }}
          />
        </div>
        {statStrip}
        {body}
      </div>
    );
  }

  const waitingNow = stats?.waiting ?? counts.pending;
  const liveLine = isLoading
    ? 'Loading the review queue.'
    : waitingNow > 0
      ? `${waitingNow} ${waitingNow === 1 ? 'certificate' : 'certificates'} waiting for sign-off${stats?.oldest_waiting_at ? `, the oldest for ${waitedFor(stats.oldest_waiting_at)}` : ''}.`
      : items.length > 0
        ? 'Nothing waiting for sign-off.'
        : 'Certificates your team sends for QS sign-off land here.';
  const oldestPending = items
    .filter((i) => i.status === 'pending')
    .sort((a, b) => new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime())[0];

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="QS reviews"
        description={liveLine}
        actions={
          <HeroActions>
            {oldestPending && (
              <HeroPrimary
                onClick={() => {
                  setTab('pending');
                  setOpenId(oldestPending.review_id);
                }}
              >
                Review the oldest
              </HeroPrimary>
            )}
            {items.length > 0 && (
              <HeroSecondary
                data-help="qsreviews.export"
                label="Export register"
                labelOnPhone={!oldestPending}
                onClick={exportRegister}
                icon={<FileText className="h-4 w-4" />}
              >
                Export register
              </HeroSecondary>
            )}
            <PageHelpButton
              help={QS_REVIEWS_HELP}
              blockers={helpBlockers}
              askContext={{ page: 'qsreviews', tab }}
            />
          </HeroActions>
        }
      />
      <HowItWorks
        help={QS_REVIEWS_HELP}
        blockers={helpBlockers}
        askContext={{ page: 'qsreviews', tab }}
      />
      {statStrip}
      <div className="space-y-6 sm:space-y-8">{body}</div>
    </PageFrame>
  );
}

/* ── Detail sheet ─────────────────────────────────────────────────────── */

function DetailField({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="text-[12px] font-medium text-white">{label}</p>
      <p className="mt-0.5 text-[14px] font-medium text-white break-words">{value || '–'}</p>
    </div>
  );
}

export function QsReviewDetailSheet({
  item,
  canSign,
  onClose,
  onDecided,
}: {
  item: QsQueueItem | null;
  canSign: boolean;
  onClose: () => void;
  onDecided: (status: 'approved' | 'returned') => void;
}) {
  const navigate = useNavigate();
  const { data: detail, isLoading, isError } = useQsReviewReport(item?.review_id ?? null);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [commentTarget, setCommentTarget] = useState('');
  const reviewerName = useMyFullName();

  const editCert = () => {
    if (!item) return;
    onClose();
    navigate(certificateHref(item.report_type, item.report_id));
  };

  const decidable = item?.status === 'pending' && !!detail && !isError;

  return (
    <FormSheet
      open={!!item}
      onOpenChange={(o) => !o && onClose()}
      width="wide"
      eyebrow={item ? `${QS_TYPE_LABEL[item.report_type] || item.report_type} review` : undefined}
      title={item?.client_name || 'Certificate'}
      description={item?.certificate_number ? `Certificate ${item.certificate_number}` : undefined}
      headerTrailing={
        item ? (
          <button
            type="button"
            data-help="qsreviews.edit"
            onClick={editCert}
            className="inline-flex h-11 items-center gap-1.5 rounded-full bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation active:scale-[0.98]"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit cert
          </button>
        ) : null
      }
    >
      {item && (
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-8 space-y-5 lg:space-y-0">
          <div className="space-y-5 min-w-0">
            {isLoading && (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              </div>
            )}
            {!isLoading && isError && (
              <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 px-4 py-3">
                <p className="text-sm text-white">
                  This certificate is no longer available. It may have been deleted, so it cannot be
                  reviewed.
                </p>
              </div>
            )}

            <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <QsStatusBadge status={item.status} />
                {item.status === 'pending' && (
                  <span className="text-[12.5px] text-white">
                    Waiting {waitedFor(item.submitted_at)}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                <DetailField label="Address" value={item.installation_address} />
                <DetailField label="Inspection date" value={formatUKDate(item.inspection_date)} />
                <DetailField label="Sent by" value={item.electrician_name} />
                <DetailField label="Inspector on cert" value={item.inspector_name} />
              </div>
              {item.submitted_note && (
                <div className="border-t border-white/[0.1] pt-3">
                  <p className="text-[12px] font-medium text-white">Note from the electrician</p>
                  <p className="mt-0.5 text-sm text-white whitespace-pre-wrap">
                    {item.submitted_note}
                  </p>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <SecondaryButton onClick={() => setPdfOpen(true)}>View PDF</SecondaryButton>
                {item.job_id && (
                  <SecondaryButton
                    onClick={() => {
                      onClose();
                      navigate(`/employer?section=jobs&job=${item.job_id}`);
                    }}
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Open job
                  </SecondaryButton>
                )}
              </div>
              <ReportPdfViewer reportId={item.report_id} open={pdfOpen} onOpenChange={setPdfOpen} />
            </div>

            {detail?.report?.data && (
              <QsCertReviewBody
                reportType={item.report_type}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data={detail.report.data as Record<string, any>}
                onAddComment={setCommentTarget}
              />
            )}
          </div>

          <div className="space-y-5 lg:sticky lg:top-0 lg:self-start">
            {!decidable && item.status !== 'pending' && (
              <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4 sm:p-5 space-y-2">
                <h4 className="text-[15px] font-semibold text-white">
                  {item.status === 'approved'
                    ? 'Approved'
                    : item.status === 'returned'
                      ? 'Returned'
                      : 'Cancelled'}
                  {item.reviewer_name ? ` by ${item.reviewer_name}` : ''}
                  {item.reviewed_at ? ` on ${shortDate(item.reviewed_at)}` : ''}
                </h4>
                <ReturnReasonList codes={item.return_reasons} />
                {item.review_comments && (
                  <p className="text-sm text-white whitespace-pre-wrap">{item.review_comments}</p>
                )}
              </div>
            )}
            {decidable && <QsDecisionPanel item={item} canSign={canSign} onDecided={onDecided} />}
            <QsReviewComments
              reviewId={item.review_id}
              authorName={reviewerName}
              prefillTarget={commentTarget}
            />
          </div>
        </div>
      )}
    </FormSheet>
  );
}

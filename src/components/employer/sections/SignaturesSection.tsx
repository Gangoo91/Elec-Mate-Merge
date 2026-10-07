import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';
import {
  Ban,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  FileSignature,
  FileText,
  Loader2,
  Mail,
  Plus,
  RefreshCw,
  Share2,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { FormSheet } from '@/components/forms/FormSheet';
import { JobContextBar } from '@/components/employer/JobContextBar';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { SIGNATURES_HELP } from '@/components/employer/help/finance-ops';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  EmptyState,
  LoadingBlocks,
  IconButton,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  type Tone,
} from '@/components/employer/editorial';
import { RequestSignatureSheet } from '@/components/employer/sheets/RequestSignatureSheet';
import { RecordPaperSignatureSheet } from '@/components/employer/sheets/RecordPaperSignatureSheet';
import { SignableDocumentView } from '@/components/signature/SignableDocumentView';
import { copyToClipboard } from '@/utils/clipboard';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import {
  useSignatureRequests,
  useChaseSignatureRequest,
  useRevokeSignatureRequest,
  useApplySignedVariation,
  useDeleteSignatureRequest,
  useSignatureImage,
  usePaperScan,
  isPaperSignature,
  displayStatus,
  isOpenRequest,
  nextChaseAt,
  signingUrl,
  type DisplayStatus,
  type SignatureRequest,
} from '@/hooks/useSignatureRequests';
import { ukDate, signedGbp } from '@/lib/signatures/types';
import {
  buildSignedCopyPdf,
  downloadBlob,
  signedCopyFilename,
} from '@/lib/signatures/signedCopyPdf';

type FilterTab = 'waiting' | 'signed' | 'declined' | 'closed' | 'all';

const STATUS_TONE: Record<DisplayStatus, Tone> = {
  'Not sent': 'amber',
  Sent: 'blue',
  Opened: 'purple',
  Signed: 'emerald',
  Declined: 'red',
  Expired: 'orange',
  Revoked: 'orange',
};

const STATUS_LABEL: Record<DisplayStatus, string> = {
  'Not sent': 'Link ready',
  Sent: 'Sent',
  Opened: 'Opened',
  Signed: 'Signed',
  Declined: 'Declined',
  Expired: 'Expired',
  Revoked: 'Cancelled',
};

function initials(name: string) {
  const parts = (name || '?').trim().split(/\s+/);
  return parts.length === 1
    ? parts[0].slice(0, 2).toUpperCase()
    : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const ago = (iso?: string | null) => (iso ? `${formatDistanceToNowStrict(new Date(iso))} ago` : '');

function lastEvent(s: SignatureRequest): string {
  const st = displayStatus(s);
  if (st === 'Signed' && isPaperSignature(s)) return `signed on paper ${ukDate(s.paper_signed_on)}`;
  if (st === 'Signed') return `signed ${ukDate(s.signed_at)}`;
  if (st === 'Declined') return `declined ${ago(s.declined_at || s.updated_at)}`;
  if (st === 'Revoked') return `cancelled ${ago(s.revoked_at || s.updated_at)}`;
  if (st === 'Expired') return `expired ${ukDate(s.expires_at)}`;
  if (st === 'Opened')
    return `opened ${ago(s.last_viewed_at || s.first_viewed_at || s.updated_at)}`;
  if (st === 'Sent') return `sent ${ago(s.last_sent_at || s.created_at)}`;
  return `created ${ago(s.created_at)}`;
}

const needsVariationAction = (s: SignatureRequest) =>
  s.document_type === 'Variation' && s.status === 'Signed' && !s.applied_at;

export function SignaturesSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const jobId = searchParams.get('job');
  const requestParam = searchParams.get('request');
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<FilterTab>('waiting');
  const [showNew, setShowNew] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);

  const { data: list = [], isLoading, error, refetch, isFetching } = useSignatureRequests(jobId);

  // Deep link from a notification: ?request=<id>
  useEffect(() => {
    if (requestParam) setDetailId(requestParam);
  }, [requestParam]);

  const closeDetail = () => {
    setDetailId(null);
    if (searchParams.get('request')) {
      const next = new URLSearchParams(searchParams);
      next.delete('request');
      setSearchParams(next, { replace: true });
    }
  };

  const counts = useMemo(() => {
    const c = { waiting: 0, opened: 0, signed: 0, signed30: 0, declined: 0, closed: 0, action: 0 };
    const cutoff = Date.now() - 30 * 86400000;
    for (const s of list) {
      const st = displayStatus(s);
      if (isOpenRequest(s)) c.waiting++;
      if (st === 'Opened') c.opened++;
      if (st === 'Signed') {
        c.signed++;
        if (s.signed_at && new Date(s.signed_at).getTime() >= cutoff) c.signed30++;
      }
      if (st === 'Declined') c.declined++;
      if (st === 'Expired' || st === 'Revoked') c.closed++;
      if (needsVariationAction(s)) c.action++;
    }
    return c;
  }, [list]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return list.filter((s) => {
      if (
        q &&
        ![s.document_title, s.signer_name, s.signer_email, s.document_type, s.job?.title]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
      )
        return false;
      const st = displayStatus(s);
      if (tab === 'waiting') return isOpenRequest(s);
      if (tab === 'signed') return st === 'Signed';
      if (tab === 'declined') return st === 'Declined';
      if (tab === 'closed') return st === 'Expired' || st === 'Revoked';
      return true;
    });
  }, [list, search, tab]);

  const detail = list.find((s) => s.id === detailId) ?? null;

  // Live "Before you start" line for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] =
    counts.action > 0
      ? [
          {
            text:
              counts.action === 1
                ? '1 signed variation has not been added to the job value yet.'
                : `${counts.action} signed variations have not been added to the job value yet.`,
            fixLabel: 'Open it',
            onFix: () => {
              const first = list.find(needsVariationAction);
              if (first) setDetailId(first.id);
            },
          },
        ]
      : [];

  if (error) {
    return (
      <PageFrame>
        <PageHero eyebrow="Money" title="Signatures" tone="indigo" />
        <EmptyState
          title="Could not load signature requests"
          description="Check your connection and try again."
          action="Try again"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  return (
    <>
      <PageFrame>
        <PageHero
          eyebrow="Money"
          title="Signatures"
          description="Clients sign the actual document on their phone. Every request for the whole office."
          tone="indigo"
          actions={
            <div className="flex items-center gap-2">
              <PrimaryButton data-help="signatures.request" onClick={() => setShowNew(true)}>
                <Plus className="mr-1.5 h-4 w-4" />
                Request signature
              </PrimaryButton>
              <IconButton onClick={() => refetch()} aria-label="Refresh" disabled={isFetching}>
                <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
              </IconButton>
              <PageHelpButton
                help={SIGNATURES_HELP}
                blockers={helpBlockers}
                askContext={{ page: 'signatures', tab }}
              />
            </div>
          }
        />

        <HowItWorks
          help={SIGNATURES_HELP}
          blockers={helpBlockers}
          askContext={{ page: 'signatures', tab }}
        />
        <JobContextBar what="Signatures" />

        <StatStrip
          columns={4}
          stats={[
            {
              label: 'Waiting',
              value: isLoading ? '—' : counts.waiting,
              tone: 'orange',
              onClick: () => setTab('waiting'),
            },
            {
              label: 'Opened',
              value: isLoading ? '—' : counts.opened,
              tone: 'purple',
              onClick: () => setTab('waiting'),
            },
            {
              label: 'Signed 30 days',
              value: isLoading ? '—' : counts.signed30,
              tone: 'emerald',
              onClick: () => setTab('signed'),
            },
            {
              label: 'Declined',
              value: isLoading ? '—' : counts.declined,
              tone: 'red',
              onClick: () => setTab('declined'),
            },
          ]}
        />

        {counts.action > 0 ? (
          <button
            type="button"
            onClick={() => {
              const first = list.find(needsVariationAction);
              if (first) setDetailId(first.id);
            }}
            className="-mx-4 sm:mx-0 flex w-[calc(100%+2rem)] sm:w-full items-center justify-between gap-3 border-y sm:border sm:rounded-2xl border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-left touch-manipulation"
          >
            <span className="min-w-0">
              <span className="block text-[14px] font-semibold text-white">
                {counts.action === 1 ? '1 signed variation' : `${counts.action} signed variations`}{' '}
                to add to the job value
              </span>
              <span className="block text-[12.5px] text-white">
                The client has agreed. Open it to update the job.
              </span>
            </span>
            <span aria-hidden className="text-white">
              ›
            </span>
          </button>
        ) : null}

        <div data-help="signatures.tabs">
          <FilterBar
            tabs={[
              { value: 'waiting', label: 'Waiting', count: counts.waiting },
              { value: 'signed', label: 'Signed', count: counts.signed },
              { value: 'declined', label: 'Declined', count: counts.declined },
              { value: 'closed', label: 'Expired or cancelled', count: counts.closed },
              { value: 'all', label: 'All', count: list.length },
            ]}
            activeTab={tab}
            onTabChange={(v) => setTab(v as FilterTab)}
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search document, client or job…"
          />
        </div>

        {isLoading ? (
          <LoadingBlocks />
        ) : filtered.length === 0 ? (
          <EmptyState
            title={
              search
                ? 'Nothing matches that search'
                : tab === 'waiting'
                  ? 'Nothing waiting for a signature'
                  : 'Nothing here yet'
            }
            description={
              search
                ? 'Try another name, document or job.'
                : 'Send a quote, a variation, a handover or a certificate. The client signs it on their phone.'
            }
            action={!search ? 'Request signature' : undefined}
            onAction={!search ? () => setShowNew(true) : undefined}
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="indigo"
              title="Requests"
              meta={<Pill tone="indigo">{filtered.length}</Pill>}
            />
            <div data-help="signatures.list">
              <ListBody>
                {filtered.map((s) => {
                  const st = displayStatus(s);
                  return (
                    <ListRow
                      key={s.id}
                      lead={<Avatar initials={initials(s.signer_name)} />}
                      title={s.document_title}
                      subtitle={[s.signer_name, s.job?.title, lastEvent(s)]
                        .filter(Boolean)
                        .join(' · ')}
                      trailing={
                        <>
                          {needsVariationAction(s) ? (
                            <Pill tone="emerald">Add to job value</Pill>
                          ) : null}
                          <Pill tone={STATUS_TONE[st]}>
                            {st === 'Signed' && isPaperSignature(s)
                              ? 'Signed on paper'
                              : STATUS_LABEL[st]}
                          </Pill>
                        </>
                      }
                      onClick={() => setDetailId(s.id)}
                    />
                  );
                })}
              </ListBody>
            </div>
          </ListCard>
        )}
      </PageFrame>

      <RequestSignatureSheet
        open={showNew}
        onOpenChange={setShowNew}
        jobId={jobId}
        initialType={jobId ? 'Handover' : 'Quote'}
      />

      <SignatureDetailSheet request={detail} open={!!detailId && !!detail} onClose={closeDetail} />
    </>
  );
}

// ---------------------------------------------------------------- detail

function Fact({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="shrink-0 text-[13px] text-white">{label}</span>
      <span
        className={cn(
          'min-w-0 text-right text-[13.5px] font-medium text-white break-words',
          mono && 'font-mono text-[11.5px] break-all'
        )}
      >
        {value}
      </span>
    </div>
  );
}

function Step({ done, label, when }: { done: boolean; label: string; when?: string | null }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={cn(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
          done ? 'border-emerald-400 bg-emerald-500 text-black' : 'border-white/[0.25]'
        )}
      >
        {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
      </span>
      <span className="min-w-0">
        <span className="block text-[14px] font-medium text-white">{label}</span>
        {when ? <span className="block text-[12.5px] text-white">{when}</span> : null}
      </span>
    </li>
  );
}

function describeDevice(ua?: string | null) {
  if (!ua) return 'Not recorded';
  const os = /iPhone/.test(ua)
    ? 'iPhone'
    : /iPad/.test(ua)
      ? 'iPad'
      : /Android/.test(ua)
        ? 'Android'
        : /Mac OS X/.test(ua)
          ? 'Mac'
          : /Windows/.test(ua)
            ? 'Windows'
            : 'Other';
  const br = /Edg\//.test(ua)
    ? 'Edge'
    : /CriOS|Chrome\//.test(ua)
      ? 'Chrome'
      : /FxiOS|Firefox\//.test(ua)
        ? 'Firefox'
        : /Safari\//.test(ua)
          ? 'Safari'
          : 'browser';
  return `${os}, ${br}`;
}

function SignatureDetailSheet({
  request: r,
  open,
  onClose,
}: {
  request: SignatureRequest | null;
  open: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const chase = useChaseSignatureRequest();
  const revoke = useRevokeSignatureRequest();
  const apply = useApplySignedVariation();
  const remove = useDeleteSignatureRequest();
  const { data: signatureImg, isLoading: imgLoading } = useSignatureImage(r);
  const { data: scan, isLoading: scanLoading } = usePaperScan(r);
  const [downloading, setDownloading] = useState(false);
  const [confirmRevoke, setConfirmRevoke] = useState(false);
  const [paperOpen, setPaperOpen] = useState(false);

  useEffect(() => {
    setConfirmRevoke(false);
    setPaperOpen(false);
  }, [r?.id]);
  useEffect(() => () => (scan?.url ? URL.revokeObjectURL(scan.url) : undefined), [scan?.url]);

  if (!r) return null;
  const st = displayStatus(r);
  const open_ = isOpenRequest(r);
  const chaseAt = nextChaseAt(r);
  const link = r.access_token ? signingUrl(r.access_token) : null;
  const hashMatches = !!r.signed_document_hash && r.signed_document_hash === r.document_hash;
  const paper = isPaperSignature(r);
  const scanIsImage = !!scan && /^image\//.test(scan.mime);

  const copy = async () => {
    if (!link) return;
    if (await copyToClipboard(link)) toast.success('Signing link copied');
    else toast.error('Could not copy the link');
  };
  const share = async () => {
    if (!link) return;
    try {
      if (navigator.share)
        await navigator.share({
          title: r.document_title,
          text: `Please read and sign: ${r.document_title}`,
          url: link,
        });
      else await copy();
    } catch {
      /* cancelled */
    }
  };
  const download = async () => {
    setDownloading(true);
    try {
      const { data: cp } = await supabase
        .from('company_profiles')
        .select('company_name')
        .eq('user_id', r.user_id)
        .maybeSingle();
      const blob = await buildSignedCopyPdf({
        requestId: r.id,
        documentTitle: r.document_title,
        documentType: r.document_type ?? null,
        document: r.document_snapshot ?? null,
        companyName: cp?.company_name || 'The company',
        signerName: r.signer_name,
        signedAt: r.signed_at ?? null,
        statement: r.statement_text ?? null,
        method: r.signature_method ?? null,
        ipAddress: r.ip_address,
        userAgent: r.signer_user_agent,
        documentHash: r.signed_document_hash ?? r.document_hash ?? null,
        signatureDataUrl: signatureImg ?? null,
        paper: paper
          ? {
              signedOn: r.paper_signed_on ?? null,
              recordedBy: r.recorded_by_name ?? null,
              recordedAt: r.recorded_at ?? null,
              declaration: r.paper_declaration ?? null,
              scanSha256: r.paper_sha256 ?? null,
              scan: scan ? { blob: scan.blob, mime: scan.mime } : null,
            }
          : null,
      });
      downloadBlob(blob, signedCopyFilename(r.document_title));
    } catch {
      toast.error('Could not build the signed copy');
    } finally {
      setDownloading(false);
    }
  };

  const footer = (
    <div className="flex flex-wrap gap-2">
      {st === 'Signed' ? (
        <>
          {needsVariationAction(r) ? (
            <PrimaryButton
              data-help="signatures.apply"
              onClick={() => apply.mutate(r.id)}
              disabled={apply.isPending}
              className="flex-1"
            >
              {apply.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="mr-2 h-4 w-4" />
              )}
              Add {signedGbp((r.document_snapshot as { change?: number } | null)?.change)} to job
              value
            </PrimaryButton>
          ) : null}
          <SecondaryButton
            onClick={download}
            disabled={downloading || imgLoading || (paper && scanLoading)}
            className="flex-1"
          >
            {downloading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Download signed copy
          </SecondaryButton>
        </>
      ) : open_ ? (
        <>
          <SecondaryButton onClick={copy} className="flex-1">
            <Copy className="mr-2 h-4 w-4" /> Copy link
          </SecondaryButton>
          <SecondaryButton onClick={share} className="flex-1">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </SecondaryButton>
          <PrimaryButton
            data-help="signatures.chase"
            onClick={() => chase.mutate(r)}
            disabled={chase.isPending || !r.signer_email || !!chaseAt || (r.send_count ?? 0) >= 6}
            className="flex-1 basis-full sm:basis-auto"
          >
            {chase.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            {!r.signer_email
              ? 'No email to chase'
              : chaseAt
                ? `Chase again ${formatDistanceToNowStrict(chaseAt, { addSuffix: true })}`
                : (r.send_count ?? 0) === 0
                  ? 'Email it to them'
                  : 'Chase by email'}
          </PrimaryButton>
        </>
      ) : (
        <SecondaryButton onClick={onClose} fullWidth>
          Close
        </SecondaryButton>
      )}
    </div>
  );

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={(o) => !o && onClose()}
        eyebrow={
          r.document_type
            ? `${r.document_type === 'Completion' ? 'Handover' : r.document_type} · Signatures`
            : 'Signatures'
        }
        title={r.document_title}
        headerTrailing={<Pill tone={STATUS_TONE[st]}>{STATUS_LABEL[st]}</Pill>}
        width="wide"
        footer={footer}
      >
        <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10 space-y-6 lg:space-y-0">
          <div className="space-y-6">
            {/* Who and where it is */}
            <section className="rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <Avatar initials={initials(r.signer_name)} />
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold text-white">{r.signer_name}</p>
                  <p className="truncate text-[13px] text-white">
                    {[r.signer_email, r.signer_phone].filter(Boolean).join(' · ') ||
                      'No email or mobile'}
                  </p>
                </div>
              </div>
              <ol className="mt-5 space-y-3">
                <Step
                  done
                  label={`Created${r.created_by_name ? ` by ${r.created_by_name}` : ''}`}
                  when={ukDate(r.created_at, true)}
                />
                {paper && !(r.send_count ?? 0) ? null : (
                  <Step
                    done={(r.send_count ?? 0) > 0 || r.status !== 'Pending'}
                    label={
                      (r.send_count ?? 0) > 1
                        ? `Emailed ${r.send_count} times`
                        : (r.send_count ?? 0) === 1
                          ? 'Emailed'
                          : 'Link ready to send'
                    }
                    when={
                      r.last_sent_at
                        ? `Last ${ukDate(r.last_sent_at, true)}`
                        : r.signer_email
                          ? null
                          : 'Copy the link and text it'
                    }
                  />
                )}
                {paper && !r.first_viewed_at ? null : (
                  <Step
                    done={!!r.first_viewed_at}
                    label={
                      r.first_viewed_at
                        ? `Opened${(r.view_count ?? 0) > 1 ? ` ${r.view_count} times` : ''}`
                        : 'Not opened yet'
                    }
                    when={r.last_viewed_at ? `Last ${ukDate(r.last_viewed_at, true)}` : null}
                  />
                )}
                {st === 'Signed' && paper ? (
                  <>
                    <Step done label="Signed on paper" when={ukDate(r.paper_signed_on)} />
                    <Step
                      done
                      label={`Recorded by ${r.recorded_by_name || 'the office'}`}
                      when={ukDate(r.recorded_at, true)}
                    />
                  </>
                ) : st === 'Signed' ? (
                  <Step done label="Signed" when={ukDate(r.signed_at, true)} />
                ) : st === 'Declined' ? (
                  <Step
                    done
                    label="Declined"
                    when={[ukDate(r.declined_at, true), r.decline_reason && `“${r.decline_reason}”`]
                      .filter(Boolean)
                      .join(' · ')}
                  />
                ) : st === 'Revoked' ? (
                  <Step done label="Link cancelled" when={ukDate(r.revoked_at, true)} />
                ) : st === 'Expired' ? (
                  <Step done={false} label="Link expired" when={ukDate(r.expires_at)} />
                ) : (
                  <Step
                    done={false}
                    label="Waiting for signature"
                    when={r.expires_at ? `Link works until ${ukDate(r.expires_at)}` : null}
                  />
                )}
              </ol>
            </section>

            {/* Evidence: paper */}
            {st === 'Signed' && paper ? (
              <section className="space-y-3">
                <h3 className="text-[15px] font-semibold text-white">Signature record</h3>
                <div className="overflow-hidden rounded-2xl border border-white/[0.1]">
                  <div className="flex items-center gap-2 border-b border-white/[0.1] bg-white/[0.04] px-4 py-3">
                    <FileSignature className="h-4 w-4 shrink-0 text-white" />
                    <p className="text-[13.5px] font-semibold text-white">
                      Signed on paper, recorded by {r.recorded_by_name || 'the office'} on{' '}
                      {ukDate(r.recorded_at)}
                    </p>
                  </div>
                  {scanLoading ? (
                    <div className="flex h-40 items-center justify-center bg-white">
                      <Loader2 className="h-5 w-5 animate-spin text-slate-500" />
                    </div>
                  ) : scan && scanIsImage ? (
                    <a href={scan.url} target="_blank" rel="noopener" className="block bg-white">
                      <img
                        src={scan.url}
                        alt={`The paper signed by ${r.signer_name}`}
                        className="max-h-80 w-full object-contain"
                      />
                    </a>
                  ) : scan ? (
                    <div className="flex items-center gap-3 px-4 py-4">
                      <FileText className="h-7 w-7 shrink-0 text-white" />
                      <span className="min-w-0 flex-1 text-[13.5px] text-white">
                        PDF scan of the signed paper
                      </span>
                      <SecondaryButton
                        onClick={() => window.open(scan.url, '_blank', 'noopener')}
                        className="h-11 shrink-0"
                      >
                        Open the scan
                      </SecondaryButton>
                    </div>
                  ) : (
                    <div className="px-4 py-4 text-[13px] text-white">
                      The scan could not be loaded. Try again.
                    </div>
                  )}
                  <div className="divide-y divide-white/[0.08] px-4">
                    <Fact label="Signed by" value={r.signer_name} />
                    <Fact label="Date signed" value={ukDate(r.paper_signed_on)} />
                    <Fact label="How" value="On paper (scan attached)" />
                    <Fact
                      label="Recorded by"
                      value={`${r.recorded_by_name || 'The office'}, ${ukDate(r.recorded_at, true)}`}
                    />
                    {r.paper_declaration ? (
                      <Fact label="Declared" value={r.paper_declaration} />
                    ) : null}
                    <Fact
                      label="Scan fingerprint"
                      value={
                        <span className="inline-flex items-start gap-1.5">
                          {scan?.matches ? (
                            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" />
                          ) : null}
                          <span>
                            {r.paper_sha256 ? `${r.paper_sha256.slice(0, 16)}…` : 'Not recorded'}
                          </span>
                        </span>
                      }
                      mono
                    />
                    <Fact
                      label="Document fingerprint"
                      value={
                        r.signed_document_hash
                          ? `${r.signed_document_hash.slice(0, 16)}…`
                          : 'Not recorded'
                      }
                      mono
                    />
                  </div>
                </div>
                {scan && !scan.matches ? (
                  <p className="text-[13px] text-white">
                    The scan no longer matches the fingerprint recorded with it. Contact support.
                  </p>
                ) : null}
                {r.document_type === 'Variation' && r.applied_at ? (
                  <p className="text-[13px] text-white">
                    Added to the job value on {ukDate(r.applied_at)}.
                  </p>
                ) : null}
              </section>
            ) : null}

            {/* Evidence */}
            {st === 'Signed' && !paper ? (
              <section className="space-y-3">
                <h3 className="text-[15px] font-semibold text-white">Signature record</h3>
                <div className="overflow-hidden rounded-2xl border border-white/[0.1]">
                  <div className="flex h-36 items-center justify-center bg-white">
                    {imgLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-slate-500" />
                    ) : signatureImg ? (
                      <img
                        src={signatureImg}
                        alt={`Signature of ${r.signer_name}`}
                        className="h-full w-full object-contain p-3"
                      />
                    ) : (
                      <span className="text-[13px] text-slate-600">
                        Signature image not available
                      </span>
                    )}
                  </div>
                  <div className="divide-y divide-white/[0.08] px-4">
                    <Fact label="Signed by" value={r.signer_name} />
                    <Fact label="When" value={ukDate(r.signed_at, true)} />
                    <Fact
                      label="How"
                      value={
                        r.signature_method === 'typed'
                          ? 'Typed name'
                          : r.signature_method === 'drawn'
                            ? 'Drawn on screen'
                            : 'Electronic'
                      }
                    />
                    <Fact label="IP address" value={r.ip_address || 'Not recorded'} />
                    <Fact label="Device" value={describeDevice(r.signer_user_agent)} />
                    {r.statement_text ? <Fact label="Agreed" value={r.statement_text} /> : null}
                    <Fact
                      label="Fingerprint"
                      value={
                        <span className="inline-flex items-start gap-1.5">
                          {hashMatches ? (
                            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" />
                          ) : null}
                          <span>
                            {r.signed_document_hash
                              ? `${r.signed_document_hash.slice(0, 16)}…`
                              : 'Not recorded'}
                          </span>
                        </span>
                      }
                      mono
                    />
                  </div>
                </div>
                {r.document_type === 'Variation' && r.applied_at ? (
                  <p className="text-[13px] text-white">
                    Added to the job value on {ukDate(r.applied_at)}.
                  </p>
                ) : null}
              </section>
            ) : null}

            {/* Links out and housekeeping */}
            <section className="space-y-2">
              {open_ ? (
                <SecondaryButton
                  fullWidth
                  data-help="signatures.record-paper"
                  onClick={() => setPaperOpen(true)}
                >
                  <FileSignature className="mr-2 h-4 w-4" />
                  Record a paper signature
                </SecondaryButton>
              ) : null}
              {r.job_id ? (
                <SecondaryButton
                  fullWidth
                  onClick={() => {
                    onClose();
                    navigate(`/employer?section=jobs&job=${r.job_id}`);
                  }}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open the job{r.job?.title ? `: ${r.job.title}` : ''}
                </SecondaryButton>
              ) : null}
              {open_ && link ? (
                <SecondaryButton fullWidth onClick={() => window.open(link, '_blank', 'noopener')}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  See their page
                </SecondaryButton>
              ) : null}
              {open_ ? (
                confirmRevoke ? (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3">
                    <p className="text-[13.5px] text-white">
                      The link stops working straight away. You can send a new one later.
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <SecondaryButton onClick={() => setConfirmRevoke(false)} fullWidth>
                        Keep it
                      </SecondaryButton>
                      <DestructiveButton
                        onClick={() => revoke.mutate(r.id)}
                        disabled={revoke.isPending}
                        fullWidth
                      >
                        {revoke.isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Ban className="mr-2 h-4 w-4" />
                        )}
                        Cancel link
                      </DestructiveButton>
                    </div>
                  </div>
                ) : (
                  <SecondaryButton fullWidth onClick={() => setConfirmRevoke(true)}>
                    <Ban className="mr-2 h-4 w-4" />
                    Cancel this link
                  </SecondaryButton>
                )
              ) : null}
              {st !== 'Signed' && !open_ ? (
                <DestructiveButton
                  fullWidth
                  onClick={() => remove.mutate(r.id, { onSuccess: onClose })}
                  disabled={remove.isPending}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove from the list
                </DestructiveButton>
              ) : null}
            </section>
          </div>

          {/* The document as the client sees it */}
          <section className="space-y-3">
            <h3 className="text-[15px] font-semibold text-white">
              {st === 'Signed' && paper
                ? 'The document they signed on paper'
                : `What they ${st === 'Signed' ? 'signed' : 'see'}`}
            </h3>
            {r.document_snapshot ? (
              <SignableDocumentView document={r.document_snapshot} tone="dark" />
            ) : (
              <div className="rounded-2xl border border-dashed border-white/[0.16] p-5 text-[14px] text-white">
                This request was sent before documents were attached, so there is no copy of what
                they saw.
              </div>
            )}
            {r.message ? (
              <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-4">
                <p className="text-[12px] font-medium text-white">Your note to them</p>
                <p className="mt-1 whitespace-pre-line text-[13.5px] text-white">{r.message}</p>
              </div>
            ) : null}
          </section>
        </div>
      </FormSheet>
      <RecordPaperSignatureSheet request={r} open={paperOpen} onOpenChange={setPaperOpen} />
    </>
  );
}

export default SignaturesSection;

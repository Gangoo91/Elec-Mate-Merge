import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import {
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  FileSignature,
  Loader2,
  Search,
  Send,
  Share2,
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';
import { Input } from '@/components/ui/input';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  Field,
  PrimaryButton,
  SecondaryButton,
  Pill,
  inputClass,
} from '@/components/employer/editorial';
import { SignableDocumentView } from '@/components/signature/SignableDocumentView';
import {
  PaperSignatureFields,
  usePaperForm,
} from '@/components/employer/signatures/PaperSignatureFields';
import { copyToClipboard } from '@/utils/clipboard';
import { cn } from '@/lib/utils';
import { useJobs } from '@/hooks/useJobs';
import {
  useCreateSignatureRequest,
  useLatestDocumentSignatureRequest,
  useRecordPaperSignature,
  PAPER_DECLARATION,
  useSignableCertificates,
  displayStatus,
  isOpenRequest,
  signingUrl,
  type CreatedSignatureRequest,
  type DocumentType,
  type RecordedPaper,
} from '@/hooks/useSignatureRequests';
import {
  SIGNABLE_HELP,
  gbp,
  ukDate,
  type DocumentSnapshot,
  type SignableType,
} from '@/lib/signatures/types';

/**
 * Send a real document for the client to sign (ELE-1993).
 *
 * Opened from the thing being signed (a quote, an invoice, a variation, a job
 * for its handover, a contract) with the document fixed, or from the
 * Signatures register with a picker. The right-hand column shows exactly what
 * the client will see, built by the same server function that freezes the
 * copy on send. Wide on desktop, one column on a phone.
 *
 * "Signed on paper" mode records a signature the client already made on a
 * printed copy: same document picker, then who signed, the date, a photo or
 * PDF of the paper and the office's declaration (record_paper_signature).
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

const PICKABLE: SignableType[] = ['Quote', 'Variation', 'Handover', 'Certificate'];

const EXPIRY = [
  { days: 7, label: '7 days' },
  { days: 14, label: '14 days' },
  { days: 30, label: '30 days' },
];

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const textareaCls =
  'w-full resize-none rounded-xl border border-white/[0.12] bg-white/[0.05] px-3.5 py-3 text-base text-white placeholder:text-white/40 caret-elec-yellow focus:border-elec-yellow focus:outline-none min-h-[96px] touch-manipulation';

export interface RequestSignatureSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Fixed type. Omit to let the office choose (the register). */
  documentType?: SignableType | Extract<DocumentType, 'Quote' | 'Invoice'>;
  documentId?: string | null;
  /** Display only; the server names the request from the document. */
  documentTitle?: string;
  jobId?: string | null;
  defaultName?: string | null;
  defaultEmail?: string | null;
  defaultPhone?: string | null;
  /** Starting choice when the type is not fixed. */
  initialType?: SignableType;
  /** A variation started from a job issue. */
  variationDraft?: { issueId?: string | null; description?: string | null } | null;
  onCreated?: (r: CreatedSignatureRequest) => void;
  /** Start in "Signed on paper" mode. */
  initialMode?: SignMode;
  /** Called with the request id after a paper signature is recorded. */
  onPaperRecorded?: (id: string) => void;
}

type SignMode = 'link' | 'paper';

interface QuoteRow {
  id: string;
  quote_number: string | null;
  total: number | null;
  status: string | null;
  employer_job_id: string | null;
  client_data: { name?: string; email?: string; phone?: string } | null;
  job_details: { title?: string } | null;
  created_at: string;
}

function useFirmQuotes(enabled: boolean) {
  return useQuery({
    queryKey: ['signable-quotes'],
    enabled,
    staleTime: 30_000,
    queryFn: async (): Promise<QuoteRow[]> => {
      const { data, error } = await db
        .from('quotes')
        .select(
          'id, quote_number, total, status, employer_job_id, client_data, job_details, created_at'
        )
        .eq('invoice_raised', false)
        .is('deleted_at', null)
        .neq('is_active_version', false)
        .order('created_at', { ascending: false })
        .limit(80);
      if (error) throw error;
      return (data ?? []) as QuoteRow[];
    },
  });
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        'h-11 rounded-full border px-4 text-[13.5px] touch-manipulation transition-colors',
        on ? chipOn : chipOff
      )}
    >
      {children}
    </button>
  );
}

function PickRow({
  selected,
  title,
  sub,
  trailing,
  onClick,
  multi,
}: {
  selected: boolean;
  title: string;
  sub?: string | null;
  trailing?: string | null;
  onClick: () => void;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'flex w-full min-h-[56px] items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left touch-manipulation transition-colors',
        selected
          ? 'border-elec-yellow bg-white/[0.08]'
          : 'border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06]'
      )}
    >
      <span
        className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center border',
          multi ? 'rounded-md' : 'rounded-full',
          selected ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.3]'
        )}
      >
        {selected ? <Check className="h-4 w-4" /> : null}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold text-white">{title}</span>
        {sub ? <span className="block truncate text-[12.5px] text-white">{sub}</span> : null}
      </span>
      {trailing ? (
        <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
          {trailing}
        </span>
      ) : null}
    </button>
  );
}

function SectionTitle({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h3 className="flex items-baseline gap-2 text-[15px] font-semibold tracking-tight text-white">
      <span className="text-[12px] font-semibold tabular-nums text-elec-yellow">{n}</span>
      {children}
    </h3>
  );
}

export function RequestSignatureSheet({
  open,
  onOpenChange,
  documentType,
  documentId,
  documentTitle,
  jobId,
  defaultName,
  defaultEmail,
  defaultPhone,
  variationDraft,
  onCreated,
  initialType,
  initialMode,
  onPaperRecorded,
}: RequestSignatureSheetProps) {
  const fixedType = documentType as SignableType | undefined;
  const fixedDoc = !!documentId;

  const [type, setType] = useState<SignableType>(fixedType ?? initialType ?? 'Quote');
  const [docId, setDocId] = useState<string | null>(documentId ?? null);
  const [job, setJob] = useState<string>(jobId ?? '');
  const [reportIds, setReportIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [varDesc, setVarDesc] = useState('');
  const [varValue, setVarValue] = useState('');
  const [varSign, setVarSign] = useState<'+' | '-'>('+');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [days, setDays] = useState(14);
  const [created, setCreated] = useState<(CreatedSignatureRequest & { signer: string }) | null>(
    null
  );
  const [debounced, setDebounced] = useState('');
  const [mode, setMode] = useState<SignMode>(initialMode ?? 'link');
  const [recorded, setRecorded] = useState<(RecordedPaper & { signer: string }) | null>(null);
  const [paperError, setPaperError] = useState<string | null>(null);
  const paper = usePaperForm(open);
  const recordPaper = useRecordPaperSignature();

  const createRequest = useCreateSignatureRequest();
  const { data: jobs = [] } = useJobs();
  const { data: quotes = [], isLoading: quotesLoading } = useFirmQuotes(
    open && type === 'Quote' && !fixedDoc
  );
  const { data: certs = [], isLoading: certsLoading } = useSignableCertificates(
    debounced,
    open && (type === 'Certificate' || type === 'Handover') && !fixedDoc
  );
  const { data: existing } = useLatestDocumentSignatureRequest(
    open && docId ? (type as DocumentType) : undefined,
    open && docId ? docId : undefined
  );

  // Reset every time the sheet opens
  useEffect(() => {
    if (!open) return;
    setType(fixedType ?? initialType ?? 'Quote');
    setDocId(documentId ?? null);
    setJob(jobId ?? '');
    setReportIds([]);
    setSearch('');
    setVarDesc(variationDraft?.description ?? '');
    setVarValue('');
    setVarSign('+');
    setName(defaultName ?? '');
    setEmail(defaultEmail ?? '');
    setPhone(defaultPhone ?? '');
    setMessage('');
    setDays(14);
    setCreated(null);
    setMode(initialMode ?? 'link');
    setRecorded(null);
    setPaperError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(search), 250);
    return () => clearTimeout(id);
  }, [search]);

  const selectedJob = jobs.find((j) => j.id === job);

  // Prefill the signer from the job or quote when the office has not typed one
  useEffect(() => {
    if (!open || name.trim()) return;
    if (type === 'Quote' && docId) {
      const q = quotes.find((x) => x.id === docId);
      if (q?.client_data?.name) {
        setName(q.client_data.name.trim());
        if (!email && q.client_data.email) setEmail(q.client_data.email);
        if (!phone && q.client_data.phone) setPhone(q.client_data.phone);
      }
    } else if ((type === 'Handover' || type === 'Variation') && selectedJob?.client) {
      setName(String(selectedJob.client).trim());
    } else if (type === 'Certificate' && docId) {
      const c = certs.find((x) => x.id === docId);
      if (c?.client_name) setName(c.client_name.trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, type, docId, job, quotes.length, certs.length]);

  const value = Number(varValue.replace(/[£,\s]/g, ''));
  const signedValue = Number.isFinite(value) ? (varSign === '-' ? -value : value) : NaN;
  const isNewVariation = type === 'Variation' && !docId;

  const options = useMemo(() => {
    if (type === 'Handover') return { report_ids: reportIds };
    if (isNewVariation) {
      return {
        ...(variationDraft?.issueId ? { issue_id: variationDraft.issueId } : { job_id: job }),
        job_id: job || undefined,
        value: Number.isFinite(signedValue) ? signedValue : null,
        description: varDesc.trim() || null,
      };
    }
    return job ? { job_id: job } : {};
  }, [type, reportIds, isNewVariation, variationDraft?.issueId, job, signedValue, varDesc]);

  const docReady =
    type === 'Handover'
      ? !!(docId || job)
      : isNewVariation
        ? !!job && varDesc.trim().length > 2 && Number.isFinite(signedValue) && signedValue !== 0
        : !!docId;

  const previewKey = JSON.stringify([
    type,
    docId,
    type === 'Handover' ? docId || job : null,
    options,
  ]);
  const { data: preview, isFetching: previewLoading } = useQuery({
    queryKey: ['signature-preview', previewKey],
    enabled: open && docReady && !created,
    staleTime: 10_000,
    queryFn: async (): Promise<{ document: DocumentSnapshot; statement: string } | null> => {
      const { data, error } = await db.rpc('preview_signature_document', {
        p_document_type: type,
        p_document_id: type === 'Handover' ? docId || job : docId,
        p_options: options,
      });
      if (error) throw error;
      return data ?? null;
    },
  });

  const emailOk = !email.trim() || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());
  const canSend = docReady && name.trim().length >= 2 && emailOk && !createRequest.isPending;
  const isPaper = mode === 'paper';
  const canRecord =
    docReady &&
    name.trim().length >= 2 &&
    paper.dateOk &&
    !!paper.state.file &&
    paper.state.declared &&
    !recordPaper.isPending;

  const handleRecord = async () => {
    if (!canRecord || !paper.state.file) return;
    setPaperError(null);
    try {
      const res = await recordPaper.mutateAsync({
        documentType: type,
        documentId: type === 'Handover' ? docId || job : docId,
        options,
        signerName: name.trim(),
        signedOn: paper.state.signedOn,
        file: paper.state.file,
        declaration: paper.state.declared,
      });
      setRecorded({ ...res, signer: name.trim() });
      onPaperRecorded?.(res.id);
    } catch (e) {
      setPaperError((e as Error).message);
    }
  };

  const handleSend = async () => {
    if (!canSend) return;
    try {
      const res = await createRequest.mutateAsync({
        document_type: type,
        document_id: type === 'Handover' ? docId || job : docId,
        signer_name: name.trim(),
        signer_email: email.trim() || null,
        signer_phone: phone.trim() || null,
        message: message.trim() || null,
        expires_in_days: days,
        options,
      });
      setCreated({ ...res, signer: name.trim() });
      onCreated?.(res);
    } catch {
      /* toast from the hook */
    }
  };

  const link = created ? signingUrl(created.access_token) : '';
  const copyLink = async () => {
    if (await copyToClipboard(link)) toast.success('Signing link copied');
    else toast.error('Could not copy. Press and hold the link to copy it.');
  };
  const shareLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: created?.document_title,
          text: `Please read and sign: ${created?.document_title}`,
          url: link,
        });
      } else {
        await copyLink();
      }
    } catch {
      /* cancelled */
    }
  };

  const typeLocked = !!fixedType;
  const title = recorded
    ? 'Paper signature recorded'
    : created
      ? 'Ready to sign'
      : isPaper
        ? 'Record a paper signature'
        : typeLocked
          ? `Get ${type === 'Handover' ? 'the handover' : `this ${type.toLowerCase()}`} signed`
          : 'Request a signature';

  // ---------------------------------------------------------------- paper recorded
  if (recorded) {
    return (
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        eyebrow="Signatures · paper"
        title={title}
        width="wide"
        footer={
          <PrimaryButton onClick={() => onOpenChange(false)} fullWidth size="lg">
            Done
          </PrimaryButton>
        }
      >
        <div className="lg:grid lg:grid-cols-2 lg:gap-10 space-y-5 lg:space-y-0">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-300" />
              <div className="min-w-0">
                <p className="text-[16px] font-semibold text-white">{recorded.document_title}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-white">
                  Signed on paper by {recorded.signer} on {ukDate(recorded.signed_on)}. Recorded by
                  you today, with the scan attached.
                </p>
              </div>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-white lg:pt-2">
            It is in Signatures under Signed. Download the signed copy there: the document, a
            signature page that says it was signed on paper, and the scan. Any open link for this
            document has been cancelled.
          </p>
        </div>
      </FormSheet>
    );
  }

  // ---------------------------------------------------------------- success
  if (created) {
    return (
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        eyebrow="Signatures"
        title={title}
        width="wide"
        footer={
          <PrimaryButton onClick={() => onOpenChange(false)} fullWidth size="lg">
            Done
          </PrimaryButton>
        }
      >
        <div className="lg:grid lg:grid-cols-2 lg:gap-10 space-y-5 lg:space-y-0">
          <div className="space-y-5">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-300" />
                <div className="min-w-0">
                  <p className="text-[16px] font-semibold text-white">{created.document_title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-white">
                    {created.emailed
                      ? `Emailed to ${created.signer}. They open it, read the document and sign with their finger.`
                      : `Send this link to ${created.signer} by text or WhatsApp. They open it, read the document and sign with their finger.`}
                  </p>
                </div>
              </div>
            </div>
            <Field label="Signing link">
              <div className="break-all rounded-xl border border-white/[0.12] bg-white/[0.04] p-3 text-[13px] text-white select-all">
                {link}
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <SecondaryButton onClick={copyLink} fullWidth>
                <Copy className="mr-2 h-4 w-4" /> Copy link
              </SecondaryButton>
              <SecondaryButton onClick={shareLink} fullWidth>
                <Share2 className="mr-2 h-4 w-4" /> Share
              </SecondaryButton>
              <SecondaryButton
                onClick={() => window.open(link, '_blank', 'noopener')}
                fullWidth
                className="col-span-2 sm:col-span-1"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> Open their page
              </SecondaryButton>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-white lg:pt-2">
            The link works for {days} days and can be used once. You will get a notification when it
            is signed, and the signed copy will be in Signatures. Sending this document again
            cancels this link.
          </p>
        </div>
      </FormSheet>
    );
  }

  // ---------------------------------------------------------------- form
  const filteredQuotes = quotes
    .filter((q) => {
      const s = search.trim().toLowerCase();
      if (!s) return true;
      return [q.quote_number, q.client_data?.name, q.job_details?.title]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(s));
    })
    .sort((a, b) =>
      job ? Number(b.employer_job_id === job) - Number(a.employer_job_id === job) : 0
    );

  const jobOptions = jobs
    .filter((j) => !j.is_template)
    .map((j) => ({ value: j.id, label: j.title, description: j.client ?? undefined }));

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Signatures"
      title={title}
      description={
        isPaper
          ? 'For a client who signed a printed copy. Add a photo or PDF of the signed paper.'
          : typeLocked
            ? documentTitle
            : 'The client reads the actual document on their phone and signs it.'
      }
      width="wide"
      footer={
        <div className="flex gap-2">
          <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
            Cancel
          </SecondaryButton>
          {isPaper ? (
            <PrimaryButton
              data-help="signatures.paper-save"
              onClick={handleRecord}
              disabled={!canRecord}
              fullWidth
              size="lg"
            >
              {recordPaper.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileSignature className="mr-2 h-4 w-4" />
              )}
              Record paper signature
            </PrimaryButton>
          ) : (
            <PrimaryButton
              data-help="signatures.send"
              onClick={handleSend}
              disabled={!canSend}
              fullWidth
              size="lg"
            >
              {createRequest.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {email.trim() ? 'Send for signature' : 'Create signing link'}
            </PrimaryButton>
          )}
        </div>
      }
    >
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 space-y-6 lg:space-y-0">
        {/* Left: what and who */}
        <div className="space-y-6">
          <div
            className="grid grid-cols-2 gap-1 rounded-full border border-white/[0.12] bg-white/[0.04] p-1"
            role="tablist"
            aria-label="How they sign"
            data-help="signatures.mode"
          >
            {(
              [
                ['link', 'Send a link'],
                ['paper', 'Signed on paper'],
              ] as const
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => {
                  setMode(m);
                  setPaperError(null);
                }}
                className={cn(
                  'h-11 rounded-full text-[13.5px] touch-manipulation transition-colors',
                  mode === m ? 'bg-elec-yellow font-semibold text-black' : 'font-medium text-white'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {existing && isOpenRequest(existing) ? (
            <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[14px] font-semibold text-white">
                  Already waiting on {existing.signer_name}
                </p>
                <Pill tone="orange">{displayStatus(existing)}</Pill>
              </div>
              <p className="mt-1 text-[13px] text-white">
                Sent {format(new Date(existing.created_at), 'd MMM')}.{' '}
                {isPaper
                  ? 'Recording a paper signature here cancels that link. To keep its history, record it from the request in Signatures instead.'
                  : 'Sending again cancels that link and sends a fresh one.'}
              </p>
            </div>
          ) : existing?.status === 'Signed' ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <p className="text-[14px] font-semibold text-white">
                Signed by {existing.signer_name} on {ukDate(existing.signed_at, true)}
              </p>
              <p className="mt-1 text-[13px] text-white">
                {isPaper
                  ? 'Recording again adds a new signed record.'
                  : 'Sending again asks for a new signature.'}
              </p>
            </div>
          ) : null}

          <section className="space-y-3">
            <SectionTitle n={1}>What they sign</SectionTitle>
            {!typeLocked ? (
              <>
                <div className="flex flex-wrap gap-2" data-help="signatures.type">
                  {PICKABLE.map((t) => (
                    <Chip
                      key={t}
                      on={type === t}
                      onClick={() => {
                        setType(t);
                        setDocId(null);
                        setReportIds([]);
                        setSearch('');
                      }}
                    >
                      {t}
                    </Chip>
                  ))}
                </div>
                <p className="text-[13px] text-white">{SIGNABLE_HELP[type]}</p>
              </>
            ) : null}

            {/* Quote picker */}
            {type === 'Quote' && !fixedDoc ? (
              <div className="space-y-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search quote number or client"
                    className={cn(inputClass, 'pl-7')}
                  />
                </div>
                <div className="max-h-[300px] space-y-2 overflow-y-auto pr-1">
                  {quotesLoading ? (
                    <p className="py-4 text-[13px] text-white">Loading quotes…</p>
                  ) : filteredQuotes.length === 0 ? (
                    <p className="py-4 text-[13px] text-white">No quotes found.</p>
                  ) : (
                    filteredQuotes.slice(0, 40).map((q) => (
                      <PickRow
                        key={q.id}
                        selected={docId === q.id}
                        onClick={() => {
                          setDocId(q.id);
                          if (q.employer_job_id) setJob(q.employer_job_id);
                          if (q.client_data?.name) setName(q.client_data.name.trim());
                          if (q.client_data?.email) setEmail(q.client_data.email);
                          if (q.client_data?.phone) setPhone(q.client_data.phone);
                        }}
                        title={`Quote ${q.quote_number ?? ''}`}
                        sub={
                          [q.client_data?.name, q.job_details?.title].filter(Boolean).join(' · ') ||
                          null
                        }
                        trailing={q.total != null ? gbp(q.total) : null}
                      />
                    ))
                  )}
                </div>
              </div>
            ) : null}

            {/* Job picker for variation and handover */}
            {(type === 'Variation' || type === 'Handover') &&
            !fixedDoc &&
            !variationDraft?.issueId ? (
              <Field label="Job" required>
                <MobileSelectPicker
                  value={job}
                  onValueChange={setJob}
                  options={jobOptions}
                  placeholder="Choose the job"
                  title="Which job?"
                />
              </Field>
            ) : null}

            {isNewVariation ? (
              <div className="space-y-4">
                <Field label="What is changing" required>
                  <textarea
                    value={varDesc}
                    onChange={(e) => setVarDesc(e.target.value)}
                    placeholder="e.g. Add two double sockets in the kitchen and move the cooker switch"
                    className={textareaCls}
                    maxLength={4000}
                  />
                </Field>
                <Field
                  label="Price change"
                  required
                  hint="Include VAT if your prices to this client do."
                >
                  <div className="flex items-end gap-2">
                    <div className="flex shrink-0 gap-1.5">
                      <Chip on={varSign === '+'} onClick={() => setVarSign('+')}>
                        Extra
                      </Chip>
                      <Chip on={varSign === '-'} onClick={() => setVarSign('-')}>
                        Saving
                      </Chip>
                    </div>
                    <Input
                      inputMode="decimal"
                      value={varValue}
                      onChange={(e) => setVarValue(e.target.value)}
                      placeholder="£0.00"
                      className={inputClass}
                    />
                  </div>
                </Field>
              </div>
            ) : null}

            {/* Certificate pickers */}
            {(type === 'Certificate' || type === 'Handover') && !fixedDoc ? (
              <div className="space-y-2">
                {type === 'Handover' ? (
                  <p className="text-[13px] font-medium text-white">
                    Certificates to hand over{' '}
                    {reportIds.length ? `(${reportIds.length} chosen)` : '(optional)'}
                  </p>
                ) : null}
                <div className="relative">
                  <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search certificate number, client or address"
                    className={cn(inputClass, 'pl-7')}
                  />
                </div>
                <div className="max-h-[300px] space-y-2 overflow-y-auto pr-1">
                  {certsLoading ? (
                    <p className="py-4 text-[13px] text-white">Loading certificates…</p>
                  ) : certs.length === 0 ? (
                    <p className="py-4 text-[13px] text-white">No finished certificates found.</p>
                  ) : (
                    certs.map((c) => {
                      const on = type === 'Handover' ? reportIds.includes(c.id) : docId === c.id;
                      return (
                        <PickRow
                          key={c.id}
                          multi={type === 'Handover'}
                          selected={on}
                          onClick={() => {
                            if (type === 'Handover') {
                              setReportIds((ids) =>
                                on ? ids.filter((x) => x !== c.id) : [...ids, c.id].slice(0, 30)
                              );
                            } else {
                              setDocId(c.id);
                              if (c.client_name && !name.trim()) setName(c.client_name.trim());
                            }
                          }}
                          title={`${c.label} ${c.certificate_number}`}
                          sub={[
                            c.client_name,
                            c.installation_address,
                            c.inspection_date ? ukDate(c.inspection_date) : null,
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                          trailing={c.has_pdf ? 'PDF' : null}
                        />
                      );
                    })
                  )}
                </div>
              </div>
            ) : null}
          </section>

          {isPaper ? (
            <section className="space-y-4">
              <SectionTitle n={2}>Who signed and when</SectionTitle>
              <Field label="Who signed" required>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 120))}
                  placeholder="Their full name, as on the paper"
                  className={inputClass}
                  autoComplete="off"
                />
              </Field>
              <PaperSignatureFields form={paper} compact />
              {paperError ? (
                <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-[14px] leading-relaxed text-white">
                  {paperError}
                </div>
              ) : null}
            </section>
          ) : (
            <section className="space-y-4">
              <SectionTitle n={2}>Who signs</SectionTitle>
              <Field label="Name" required>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Client's full name"
                  className={inputClass}
                  autoComplete="off"
                />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Email"
                  hint={
                    email.trim() && !emailOk
                      ? 'That email does not look right.'
                      : 'Leave blank to copy the link yourself.'
                  }
                >
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@example.com"
                    className={inputClass}
                  />
                </Field>
                <Field label="Mobile">
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07…"
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field label="Note to the client (optional)">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={1000}
                  placeholder="e.g. As discussed on site this morning."
                  className={textareaCls}
                />
              </Field>
              <Field label="Link works for">
                <div className="flex flex-wrap gap-2">
                  {EXPIRY.map((o) => (
                    <Chip key={o.days} on={days === o.days} onClick={() => setDays(o.days)}>
                      {o.label}
                    </Chip>
                  ))}
                </div>
              </Field>
            </section>
          )}
        </div>

        {/* Right: what they will see */}
        <section className="space-y-3 lg:sticky lg:top-0 lg:self-start">
          <SectionTitle n={3}>
            {isPaper ? 'The document they signed' : 'What they will see'}
          </SectionTitle>
          {!docReady ? (
            <div className="rounded-2xl border border-dashed border-white/[0.16] p-6 text-[14px] text-white">
              {type === 'Variation'
                ? 'Choose the job, say what is changing and the price change. The page they sign appears here.'
                : type === 'Handover'
                  ? 'Choose the job. Add the certificates you are handing over.'
                  : `Choose the ${type.toLowerCase()} to see the page they will sign.`}
            </div>
          ) : previewLoading && !preview ? (
            <div className="flex h-40 items-center justify-center rounded-2xl border border-white/[0.1]">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            </div>
          ) : preview?.document ? (
            <>
              <SignableDocumentView document={preview.document} tone="dark" />
              <div className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-4">
                <p className="text-[12px] font-medium text-white">
                  {isPaper ? 'You confirm' : 'They tick'}
                </p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-white">
                  {isPaper ? PAPER_DECLARATION : preview.statement}
                </p>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4 text-[14px] text-white">
              That document could not be found for this company.
            </div>
          )}
        </section>
      </div>
    </FormSheet>
  );
}

export default RequestSignatureSheet;

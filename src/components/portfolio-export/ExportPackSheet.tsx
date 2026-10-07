/**
 * ExportPackSheet — "Export my record" (apprentice) and "Export pack" /
 * "Gateway pack" (college), ELE-1881 / ELE-1883 / ELE-2017.
 *
 * Packs are built server-side by the portfolio-export-pack edge function:
 * an indexed ZIP with a PDFMonkey summary, every evidence file named and
 * fingerprinted, declarations, hours and the audit trail; or the EPAO gateway
 * pack PDF with its supporting files. A pack is kept for good and can be made
 * again at any time; each download link lasts 24 hours.
 *
 * The gateway part also carries the three signatures the pack needs: the
 * apprentice's (in their own portfolio), the employer's (a link with no
 * account) and the provider's (here, by the tutor).
 *
 * Apprentices can make and download their own copy of the gateway pack
 * (Andrew, 7 Oct): it holds everything about them but leaves out the college's
 * filed funding and contract documents. They never see the college's copy.
 */
import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Download, FileText, Loader2, RotateCw, Send, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { SignatureCapture } from '@/components/ui/signature-capture';
import { downloadLearnerDocument } from '@/lib/documents/learnerDocuments';
import {
  fmtBytes,
  gatewayLinkFor,
  isStale,
  useGatewayDeclarations,
  usePortfolioExports,
  type DeclarationKind,
  type ExportKind,
  type PortfolioExport,
} from '@/hooks/portfolio/usePortfolioExports';

const CARD =
  '-mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5 sm:mx-0 sm:rounded-3xl sm:border-x sm:p-6';
const BTN_PRIMARY =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-4 text-[14px] font-semibold text-black transition-opacity touch-manipulation hover:opacity-90 disabled:opacity-40';
const BTN =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.14] px-4 text-[14px] font-semibold text-white transition-colors touch-manipulation hover:border-elec-yellow disabled:opacity-40';
const INPUT =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation';

const KIND_LABEL: Record<ExportKind, string> = {
  evidence_pack: 'Evidence pack',
  gateway_pack: 'EPA gateway pack',
};

const fmtWhen = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/London',
      })
    : '';

export interface ExportPackSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Auth user id of the apprentice; null = the signed-in apprentice. */
  learnerUserId: string | null;
  learnerName?: string;
  mode: 'learner' | 'staff';
  /** Staff opening "Gateway pack" land on the gateway card first. */
  focus?: ExportKind;
}

export function ExportPackSheet({ open, onOpenChange, learnerUserId, learnerName, mode, focus }: ExportPackSheetProps) {
  const ex = usePortfolioExports(learnerUserId, {
    enabled: open,
    // The apprentice sees their own gateway copies, never the college's (it holds the college's documents).
    ownGatewayCopiesOnly: mode === 'learner',
  });
  const gw = useGatewayDeclarations(learnerUserId, { enabled: open });
  const isEpa = gw.data?.standard?.route === 'am2s' || gw.data?.standard?.route === 'am2d';
  const first = (learnerName ?? '').split(' ')[0] || 'this apprentice';

  const startPack = async (kind: ExportKind) => {
    try {
      await ex.start(kind);
      toast.success(`${KIND_LABEL[kind]} started`, { description: 'It takes under a minute. It will appear in the list when ready.' });
    } catch (e) {
      toast.error('Could not start the pack', { description: e instanceof Error ? e.message : undefined });
    }
  };

  const gatewayFirst = mode === 'staff' && focus === 'gateway_pack';

  const evidenceCard = (
    <section className={CARD}>
      <h3 className="text-[15px] font-semibold tracking-tight text-white">Evidence pack</h3>
      <p className="mt-1 text-[13px] leading-snug text-white">
        {mode === 'learner'
          ? 'Your whole portfolio in one ZIP you can keep, send to a new provider or hand to an assessor.'
          : `${first}'s whole portfolio in one ZIP, for an assessor, IQA, EQA or inspector.`}
      </p>
      <ul className="mt-3 space-y-1.5 text-[13px] text-white">
        {[
          'A designed PDF summary: units, criteria, evidence, decisions and IQA',
          'Every evidence file, named by item and checked against its fingerprint',
          'An index linking each criterion to its evidence and decision',
          'Witness statements and signed declarations with their fingerprints',
          'Off-the-job hours log and the planned-versus-actual statement',
          'The gateway checklist and the full audit trail',
        ].map((t) => (
          <li key={t} className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
            {t}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={cn(BTN_PRIMARY, 'mt-4 w-full sm:w-auto')}
        disabled={!!ex.starting || ex.exports.some((e) => e.kind === 'evidence_pack' && e.status === 'building' && !isStale(e))}
        onClick={() => void startPack('evidence_pack')}
      >
        {ex.starting === 'evidence_pack' ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
        Make evidence pack
      </button>
    </section>
  );

  // Single PDFs rendered in PDFMonkey on request (ELE-2017): the transfer pack
  // for a new provider (ELE-1882) and the off-the-job hours log.
  const [pdfBusy, setPdfBusy] = useState<'transfer_pack' | 'otj_log' | null>(null);
  const getPdf = async (kind: 'transfer_pack' | 'otj_log') => {
    if (pdfBusy) return;
    setPdfBusy(kind);
    try {
      await downloadLearnerDocument({ kind, learnerId: learnerUserId });
    } catch (e) {
      toast.error('Could not make the PDF', { description: e instanceof Error ? e.message : undefined });
    } finally {
      setPdfBusy(null);
    }
  };
  const documentsCard = (
    <section className={CARD}>
      <h3 className="text-[15px] font-semibold tracking-tight text-white">Single documents</h3>
      <p className="mt-1 text-[13px] leading-snug text-white">
        {mode === 'learner'
          ? 'One PDF each, made from your record now.'
          : `One PDF each, made from ${first}'s record now.`}
      </p>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        <button type="button" className={cn(BTN, 'w-full')} disabled={!!pdfBusy} onClick={() => void getPdf('transfer_pack')}>
          {pdfBusy === 'transfer_pack' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Transfer pack
        </button>
        <button type="button" className={cn(BTN, 'w-full')} disabled={!!pdfBusy} onClick={() => void getPdf('otj_log')}>
          {pdfBusy === 'otj_log' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Off-the-job hours
        </button>
      </div>
      <p className="mt-3 text-[12.5px] leading-snug text-white">
        The transfer pack is the record a new training provider needs: providers, every decision with its assessor and
        provider, the evidence index, witness statements, hours, reviews, declarations and the audit trail.
      </p>
    </section>
  );

  const gatewayCard =
    mode === 'staff' ? (
      <GatewayCard
        first={first}
        gw={gw}
        isEpa={isEpa}
        building={ex.exports.some((e) => e.kind === 'gateway_pack' && e.status === 'building' && !isStale(e))}
        starting={ex.starting === 'gateway_pack'}
        onMake={() => void startPack('gateway_pack')}
      />
    ) : isEpa ? (
      <LearnerDeclarationCard
        gw={gw}
        building={ex.exports.some((e) => e.kind === 'gateway_pack' && e.status === 'building' && !isStale(e))}
        starting={ex.starting === 'gateway_pack'}
        onMake={() => void startPack('gateway_pack')}
      />
    ) : null;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow={mode === 'learner' ? 'Portfolio' : 'Export'}
      title={mode === 'learner' ? 'Export my record' : `Export pack${learnerName ? ` · ${learnerName}` : ''}`}
      description={
        mode === 'learner'
          ? 'Make a copy of everything you have done, any time. Each pack is kept; the download link lasts 24 hours and you can get a new one whenever you like.'
          : 'Build the evidence pack or the EPA gateway pack from the live record. Each pack is kept with who made it; download links last 24 hours.'
      }
      width="wide"
    >
      <div className="grid gap-5 py-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-5">
          {gatewayFirst ? (
            <>
              {gatewayCard}
              {evidenceCard}
              {documentsCard}
            </>
          ) : (
            <>
              {evidenceCard}
              {documentsCard}
              {gatewayCard}
            </>
          )}
        </div>
        <HistoryCard ex={ex} mode={mode} />
      </div>
    </FormSheet>
  );
}

// ── History ───────────────────────────────────────────────────────────────

function HistoryCard({ ex, mode }: { ex: ReturnType<typeof usePortfolioExports>; mode: 'learner' | 'staff' }) {
  const [busy, setBusy] = useState<string | null>(null);
  const get = async (e: PortfolioExport, file: 'zip' | 'pdf') => {
    setBusy(`${e.id}:${file}`);
    try {
      await ex.download(e, file);
    } catch (err) {
      toast.error('Download failed', { description: err instanceof Error ? err.message : undefined });
    } finally {
      setBusy(null);
    }
  };
  return (
    <section className={CARD}>
      <div className="flex items-end justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight text-white">{mode === 'learner' ? 'Your packs' : 'Packs made'}</h3>
          <p className="mt-0.5 text-[12.5px] text-white">Newest first. Every pack is kept.</p>
        </div>
        <button type="button" className={cn(BTN, 'h-10 px-3')} onClick={() => void ex.reload()} aria-label="Refresh">
          <RotateCw className="h-4 w-4" />
        </button>
      </div>
      {ex.loading ? (
        <div className="mt-4 space-y-2">
          {[0, 1].map((k) => (
            <div key={k} className="h-20 animate-pulse rounded-2xl bg-white/[0.04]" />
          ))}
        </div>
      ) : ex.error ? (
        <p className="mt-4 text-[13px] text-orange-300">{ex.error}</p>
      ) : ex.exports.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-white/[0.14] p-4 text-[13px] text-white">
          No packs yet. Make one and it will appear here, ready to download.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08]">
          {ex.exports.map((e) => {
            const stale = isStale(e);
            const failed = e.status === 'failed' || stale;
            return (
              <li key={e.id} className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-white">
                      {KIND_LABEL[e.kind]}
                      {e.kind === 'gateway_pack' && e.requested_role === 'learner'
                        ? mode === 'learner'
                          ? ' · your copy'
                          : ' · apprentice’s copy'
                        : ''}
                    </p>
                    <p className="mt-0.5 text-[12px] text-white">
                      {fmtWhen(e.created_at)}
                      {e.requested_by_name ? ` · by ${e.requested_by_name}` : ''}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
                      failed
                        ? 'border-orange-500/40 bg-orange-500/10 text-orange-300'
                        : e.status === 'ready'
                          ? 'border-emerald-400/40 bg-emerald-500/[0.12] text-emerald-300'
                          : 'border-sky-400/40 bg-sky-500/[0.12] text-sky-200'
                    )}
                  >
                    {failed ? 'Failed' : e.status === 'ready' ? 'Ready' : 'Building'}
                  </span>
                </div>
                {e.status === 'building' && !stale && (
                  <p className="flex items-center gap-2 text-[12.5px] text-white">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-elec-yellow" />
                    {e.progress || 'Working'}…
                  </p>
                )}
                {failed && <p className="text-[12.5px] text-orange-300">{e.error || 'The build stopped. Make it again.'}</p>}
                {e.status === 'ready' && (
                  <>
                    <p className="text-[12px] text-white">
                      {[
                        e.file_count ? `${e.file_count} files` : '',
                        fmtBytes(e.zip_bytes),
                        e.pdf_pages ? `PDF ${e.pdf_pages} pages` : '',
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button type="button" className={cn(BTN, 'w-full')} disabled={!!busy} onClick={() => void get(e, 'zip')}>
                        {busy === `${e.id}:zip` ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                        ZIP
                      </button>
                      <button type="button" className={cn(BTN, 'w-full')} disabled={!!busy} onClick={() => void get(e, 'pdf')}>
                        {busy === `${e.id}:pdf` ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                        PDF
                      </button>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

// ── Gateway (college) ─────────────────────────────────────────────────────

function GatewayCard({
  first,
  gw,
  isEpa,
  building,
  starting,
  onMake,
}: {
  first: string;
  gw: ReturnType<typeof useGatewayDeclarations>;
  isEpa: boolean;
  building: boolean;
  starting: boolean;
  onMake: () => void;
}) {
  const [signing, setSigning] = useState(false);
  const [linkBusy, setLinkBusy] = useState(false);
  const [lastLink, setLastLink] = useState<string | null>(null);
  const std = gw.data?.standard;
  const pendingToken = gw.data?.employer_pending?.token ?? null;
  const link = lastLink ?? (pendingToken ? gatewayLinkFor(pendingToken) : null);

  const makeLink = async () => {
    setLinkBusy(true);
    try {
      const r = await gw.requestEmployerLink();
      const url = gatewayLinkFor(r.token);
      setLastLink(url);
      await copy(url);
    } catch (e) {
      toast.error('Could not make the link', { description: e instanceof Error ? e.message : undefined });
    } finally {
      setLinkBusy(false);
    }
  };

  return (
    <section className={CARD}>
      <h3 className="text-[15px] font-semibold tracking-tight text-white">EPA gateway pack</h3>
      <p className="mt-1 text-[13px] leading-snug text-white">
        {std?.code
          ? `${std.title} (${std.code}), assessed by the ${std.assessment}. What the assessment organisation receives at gateway: the readiness checklist, the three declarations, qualification and English and maths evidence, and the hours statement, with the supporting files.`
          : gw.loading
            ? 'Checking the apprentice’s standard…'
            : `${first}'s course does not end in the AM2S (ST0152) or AM2D (ST1017). You can still make the pack for the college’s own sign-off.`}
      </p>
      {gw.error && <p className="mt-2 text-[12.5px] text-orange-300">{gw.error}</p>}

      <ul className="mt-4 divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08]">
        <DeclRow
          label="Apprentice declaration"
          signed={gw.signedOf('learner')}
          todo={`${first} signs it in their portfolio (Portfolio → Export my record).`}
        />
        <DeclRow
          label="Employer: behaviours and readiness"
          signed={gw.signedOf('employer')}
          todo={
            gw.data?.employer_pending
              ? `Link sent ${fmtWhen(gw.data.employer_pending.created_at)}${gw.data.employer_pending.requested_by_name ? ` by ${gw.data.employer_pending.requested_by_name}` : ''}. Waiting for the employer.`
              : 'Send the employer a link. They read and sign with no account.'
          }
          action={
            <div className="flex flex-wrap gap-2">
              <button type="button" className={cn(BTN, 'h-10 px-3 text-[13px]')} disabled={linkBusy} onClick={() => void makeLink()}>
                {linkBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {gw.data?.employer_pending || gw.signedOf('employer') ? 'New link' : 'Make link'}
              </button>
              {link && (
                <>
                  <button type="button" className={cn(BTN, 'h-10 px-3 text-[13px]')} onClick={() => void copy(link)}>
                    <Copy className="h-4 w-4" /> Copy
                  </button>
                  {typeof navigator !== 'undefined' && 'share' in navigator && (
                    <button
                      type="button"
                      className={cn(BTN, 'h-10 px-3 text-[13px]')}
                      onClick={() =>
                        void navigator
                          .share({ title: 'Gateway declaration', text: `Please read and sign ${first}'s gateway declaration`, url: link })
                          .catch(() => undefined)
                      }
                    >
                      <Share2 className="h-4 w-4" /> Share
                    </button>
                  )}
                </>
              )}
            </div>
          }
        />
        <DeclRow
          label="Training provider readiness"
          signed={gw.signedOf('provider')}
          todo="You sign this when the checklist is right."
          action={
            !signing ? (
              <button type="button" className={cn(BTN, 'h-10 px-3 text-[13px]')} onClick={() => setSigning(true)}>
                {gw.signedOf('provider') ? 'Sign again' : 'Sign'}
              </button>
            ) : null
          }
        />
      </ul>

      {signing && gw.data && (
        <div className="mt-4">
          <SignForm
            statement={gw.data.statements.provider}
            onCancel={() => setSigning(false)}
            onSign={async (name, sig) => {
              await gw.sign('provider', name, sig);
              setSigning(false);
              toast.success('Readiness declaration signed');
            }}
          />
        </div>
      )}

      {!isEpa && !gw.loading && std && (
        <p className="mt-3 text-[12.5px] text-white">Declarations are worded for an apprenticeship end-point assessment.</p>
      )}

      <button type="button" className={cn(BTN_PRIMARY, 'mt-4 w-full sm:w-auto')} disabled={building || starting} onClick={onMake}>
        {starting || building ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
        Make gateway pack
      </button>
      <p className="mt-2 text-[12px] text-white">
        Anything the app does not hold, such as the awarding body certificate and NET’s Readiness for Assessment
        checklist, is listed in the pack as “to attach”. {first} can also make their own copy, without the
        college’s funding and contract documents.
      </p>
    </section>
  );
}

function DeclRow({
  label,
  signed,
  todo,
  action,
}: {
  label: string;
  signed: { signer_name: string | null; signer_role: string | null; signer_company: string | null; signed_at: string } | null;
  todo: string;
  action?: React.ReactNode;
}) {
  return (
    <li className="space-y-2 p-4">
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className={cn('mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full', signed ? 'bg-emerald-400' : 'bg-orange-400')}
        />
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold text-white">{label}</p>
          <p className="mt-0.5 text-[12.5px] leading-snug text-white">
            {signed
              ? `Signed by ${signed.signer_name ?? ''}${signed.signer_role ? `, ${signed.signer_role}` : ''}${signed.signer_company ? ` (${signed.signer_company})` : ''} · ${fmtWhen(signed.signed_at)}`
              : todo}
          </p>
        </div>
      </div>
      {action && <div className="pl-5">{action}</div>}
    </li>
  );
}

// ── Gateway (apprentice) ──────────────────────────────────────────────────

function LearnerDeclarationCard({
  gw,
  building,
  starting,
  onMake,
}: {
  gw: ReturnType<typeof useGatewayDeclarations>;
  building: boolean;
  starting: boolean;
  onMake: () => void;
}) {
  const [signing, setSigning] = useState(false);
  const mine = gw.signedOf('learner');
  const std = gw.data?.standard;
  return (
    <section className={CARD}>
      <h3 className="text-[15px] font-semibold tracking-tight text-white">Your EPA gateway</h3>
      <p className="mt-1 text-[13px] leading-snug text-white">
        Before your {std?.assessment ?? 'end-point assessment'}, your college sends a gateway pack to the assessment
        organisation. It includes your signed declaration. Sign it when your tutor says you are ready.
      </p>

      <div className="mt-4 rounded-2xl border border-white/[0.08] p-4">
        <p className="text-[14px] font-semibold text-white">Your declaration</p>
        {mine && !signing ? (
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-[13.5px] text-white">
              <Check className="h-4 w-4 text-emerald-400" /> Signed {fmtWhen(mine.signed_at)}
            </p>
            <button type="button" className={cn(BTN, 'h-10 px-3 text-[13px]')} onClick={() => setSigning(true)}>
              Sign again
            </button>
          </div>
        ) : signing && gw.data ? (
          <div className="mt-3">
            <SignForm
              statement={gw.data.statements.learner}
              onCancel={() => setSigning(false)}
              onSign={async (name, sig) => {
                await gw.sign('learner', name, sig);
                setSigning(false);
                toast.success('Declaration signed');
              }}
            />
          </div>
        ) : (
          <button type="button" className={cn(BTN, 'mt-3')} disabled={!gw.data} onClick={() => setSigning(true)}>
            Read and sign
          </button>
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-white/[0.08] p-4">
        <p className="text-[14px] font-semibold text-white">Your copy of the gateway pack</p>
        <p className="mt-1 text-[13px] leading-snug text-white">
          The same readiness checklist, declarations, English and maths and hours your college sends, as a PDF and
          ZIP you can keep. The college&rsquo;s own funding and contract documents are left out of your copy.
        </p>
        <button
          type="button"
          className={cn(BTN_PRIMARY, 'mt-3 w-full sm:w-auto')}
          disabled={building || starting}
          onClick={onMake}
        >
          {starting || building ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
          Make my gateway pack
        </button>
        <p className="mt-2 text-[12px] leading-snug text-white">
          NET&rsquo;s own Readiness for Assessment checklist is signed separately on NET&rsquo;s form; the pack lists it
          under &ldquo;to attach&rdquo;.
        </p>
      </div>
    </section>
  );
}

// ── Sign form ─────────────────────────────────────────────────────────────

function SignForm({
  statement,
  onSign,
  onCancel,
}: {
  statement: string;
  onSign: (name: string, signature: string | null) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState('');
  const [sig, setSig] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const ready = agreed && name.trim().length >= 2 && !!sig;
  useEffect(() => setAgreed(false), [statement]);
  const submit = async () => {
    setBusy(true);
    try {
      await onSign(name.trim(), sig);
    } catch (e) {
      toast.error('Not signed', { description: e instanceof Error ? e.message : undefined });
    } finally {
      setBusy(false);
    }
  };
  const id = useMemo(() => `sign-${Math.random().toString(36).slice(2, 8)}`, []);
  return (
    <div className="space-y-4 rounded-2xl border border-white/[0.1] p-4">
      <p className="rounded-xl border-l-4 border-elec-yellow bg-white/[0.03] p-3 text-[14px] leading-relaxed text-white">{statement}</p>
      <button
        type="button"
        role="checkbox"
        aria-checked={agreed}
        onClick={() => setAgreed((a) => !a)}
        className="flex min-h-[44px] w-full items-center gap-3 text-left touch-manipulation"
      >
        <span
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border',
            agreed ? 'border-elec-yellow bg-elec-yellow' : 'border-white/[0.4]'
          )}
        >
          {agreed && <Check className="h-4 w-4 text-black" />}
        </span>
        <span className="text-[14px] font-medium text-white">I have read this and it is true</span>
      </button>
      <div>
        <label htmlFor={id} className="mb-1 block text-[12px] font-medium text-white">
          Type your full name
        </label>
        <input id={id} className={INPUT} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </div>
      <div>
        <p className="mb-2 text-[12px] font-medium text-white">Sign here</p>
        <SignatureCapture variant="dark" showActions={false} onCapture={setSig} height={140} />
      </div>
      <div className="flex gap-2">
        <button type="button" className={cn(BTN_PRIMARY, 'flex-1 sm:flex-none')} disabled={!ready || busy} onClick={() => void submit()}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          Sign
        </button>
        <button type="button" className={BTN} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Link copied', { description: 'Paste it into an email or message to the employer.' });
  } catch {
    toast.message('Copy this link', { description: text });
  }
}

export type { DeclarationKind };
export default ExportPackSheet;

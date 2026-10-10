import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Loader2, RefreshCw, Search, Trash2 } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  inputCn,
  textareaCn,
  labelCn,
  cardCn,
  chipBase,
  chipOn,
  chipOff,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { useJobs } from '@/hooks/useJobs';
import { useActingFirmId } from '@/hooks/useFirmPriceBook';
import { useCreateQuote } from '@/hooks/useFinance';
import type { Quote } from '@/services/financeService';
import type { Job } from '@/services/jobService';
import { calcEmployerTotals } from '@/utils/employerMoney';
import { autoCompleteOff } from '@/lib/textEntry';
import {
  draftAIQuote,
  firmVatRate,
  aiDraftToLineItems,
  type AIQuoteResult,
  type AIQuoteLabour,
  type AIQuoteMaterial,
  type AIQuoteStamp,
} from '@/services/aiQuoteService';
import { LineSourceTag } from './LineSourceTag';

/* ==========================================================================
   AI quote sheet (ELE-1990).

   Job → Drafting → Review, then "Save draft and review" writes a normal DRAFT
   quote (createQuote: the owner's numbering, linked to the job) and hands it
   to the quote builder for the final check and send. Nothing is sent from
   here, and nothing here shows a buy price or a markup.
   ========================================================================== */

type Step = 'job' | 'drafting' | 'review';
type Mode = 'job' | 'describe';

const STAGES = [
  'Reading the job',
  'Matching your price book',
  'Checking your own past jobs of this type',
  'Timing the labour against practical work data',
  'Pricing the draft',
];

const money = (n: number) =>
  `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const round2 = (n: number) => Math.round(n * 100) / 100;

function timeAgo(iso: string): string {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 2) return 'just now';
  if (mins < 60) return `${mins} minutes ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? '' : 's'} ago`;
  const days = Math.round(hrs / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

const isOpenJob = (j: Job) =>
  !j.is_template && !j.archived_at && !['completed', 'cancelled'].includes(String(j.status).toLowerCase());

export function AIQuoteSheet({
  open,
  onOpenChange,
  initialJobId,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Preselect a job (deep link ?job=). */
  initialJobId?: string | null;
  /** The saved draft, ready for the quote builder's edit mode. */
  onSaved: (quote: Quote) => void;
}) {
  const { data: firmId } = useActingFirmId();
  const { data: jobs = [] } = useJobs();
  const createQuote = useCreateQuote();

  const [step, setStep] = useState<Step>('job');
  const [mode, setMode] = useState<Mode>('job');
  const [search, setSearch] = useState('');
  const [jobId, setJobId] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [jobType, setJobType] = useState('');
  const [notes, setNotes] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');

  const [result, setResult] = useState<AIQuoteResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState(0);
  const [labour, setLabour] = useState<AIQuoteLabour[]>([]);
  const [materials, setMaterials] = useState<AIQuoteMaterial[]>([]);
  const [scope, setScope] = useState('');
  // ELE-2060: CIS is only deducted when the customer is a contractor under
  // CIS (never a homeowner) and the firm is not gross. The firm default is a
  // starting point; the person drafting decides per quote.
  const [cisChoice, setCisChoice] = useState<boolean | null>(null);
  const runSeq = useRef(0);

  const job = jobs.find((j) => j.id === jobId) ?? null;

  // Fresh each time it opens; a deep-linked job is preselected.
  useEffect(() => {
    if (!open) return;
    setStep('job');
    setResult(null);
    setError(null);
    setNotes('');
    setCisChoice(null);
    if (initialJobId) {
      setMode('job');
      setJobId(initialJobId);
    }
  }, [open, initialJobId]);

  // Picking a job fills what the AI reads from it.
  useEffect(() => {
    if (!job) return;
    setDescription(job.description ?? '');
    setJobType(job.job_type ?? '');
  }, [job?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const jobTypes = useMemo(() => {
    const seen = new Map<string, string>();
    for (const j of jobs) {
      const t = j.job_type?.trim();
      if (t && !seen.has(t.toLowerCase())) seen.set(t.toLowerCase(), t);
    }
    return Array.from(seen.values()).slice(0, 8);
  }, [jobs]);

  const listed = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs
      .filter(isOpenJob)
      .filter(
        (j) =>
          !q ||
          `${j.title} ${j.client} ${j.location} ${j.job_type ?? ''}`.toLowerCase().includes(q)
      )
      .slice(0, 40);
  }, [jobs, search]);

  const canDraft =
    !!firmId &&
    (mode === 'job'
      ? !!jobId && (description.trim().length >= 8 || !!job?.title)
      : description.trim().length >= 8 && clientName.trim().length > 0);

  // Staged progress while the one request runs (it usually takes 20 to 40 s).
  useEffect(() => {
    if (step !== 'drafting' || error) return;
    setStage(0);
    const t = window.setInterval(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), 6000);
    return () => window.clearInterval(t);
  }, [step, error]);

  const run = async (refresh = false) => {
    if (!firmId) return;
    const seq = ++runSeq.current;
    setError(null);
    setStep('drafting');
    try {
      const res = await draftAIQuote({
        firmId,
        jobId: mode === 'job' ? jobId : null,
        description: description.trim(),
        jobType: jobType.trim() || null,
        notes: notes.trim() || null,
        refresh,
      });
      if (seq !== runSeq.current) return;
      setResult(res);
      setLabour(res.draft.labour);
      setMaterials(res.draft.materials);
      setScope(res.draft.scope);
      setStage(STAGES.length);
      setStep('review');
    } catch (e) {
      if (seq !== runSeq.current) return;
      setError(e instanceof Error ? e.message : 'The AI draft failed. Try again.');
    }
  };

  const firm = result?.context.firm;
  const vatRate = firm ? firmVatRate(firm) : 20;
  const deductCis = cisChoice ?? !!firm?.cisEnabled;
  const totals = calcEmployerTotals(
    [
      ...labour.map((l) => ({ total: round2(l.hours * l.rate), type: 'labour' })),
      ...materials.map((m) => ({ total: round2(m.quantity * m.unitPrice), type: 'material' })),
    ],
    {
      vatRate,
      reverseCharge: !!firm?.reverseCharge,
      cisEnabled: deductCis,
      cisRate: 20,
    }
  );
  const labourHours = round2(labour.reduce((s, l) => s + l.hours, 0));
  const fromBook = materials.filter((m) => m.source === 'price_book').length;
  const estimated = materials.length - fromBook;
  const history = result?.context.history ?? null;
  const histAvg = history && history.count > 0 ? Number(history.avg_hours) : null;

  /** Scale the labour lines so they add up to the firm's own average. */
  const applyHistoryHours = () => {
    if (!histAvg || labourHours <= 0) return;
    const factor = histAvg / labourHours;
    setLabour((prev) => {
      const scaled = prev.map((l) => ({
        ...l,
        hours: Math.max(0.25, Math.round(l.hours * factor * 4) / 4),
      }));
      // Put any rounding difference on the longest task so the total is exact.
      const diff = round2(histAvg - scaled.reduce((s, l) => s + l.hours, 0));
      if (diff !== 0 && scaled.length) {
        const i = scaled.reduce((best, l, idx) => (l.hours > scaled[best].hours ? idx : best), 0);
        scaled[i] = { ...scaled[i], hours: Math.max(0.25, round2(scaled[i].hours + diff)) };
      }
      return scaled.map((l) => ({ ...l, total: round2(l.hours * l.rate) }));
    });
  };

  const save = async () => {
    if (!result || !firm) return;
    const client = mode === 'job' ? job?.client || result.context.job?.client || '' : clientName.trim();
    const validUntil = new Date(Date.now() + (firm.validityDays || 30) * 86_400_000)
      .toISOString()
      .slice(0, 10);
    const lineItems = aiDraftToLineItems(labour, materials);
    const stamp: AIQuoteStamp = {
      runId: result.runId,
      generatedAt: result.createdAt,
      model: result.model,
      jobType: result.context.jobType,
      fromPriceBook: fromBook,
      estimated,
      labourHours,
      historyAvgHours: histAvg,
      historyCount: history?.count ?? 0,
      assumptions: result.draft.assumptions,
      siteChecks: result.draft.siteChecks,
    };
    const base = {
      quote_number: '',
      client: client || 'Client',
      client_address: mode === 'job' ? job?.location || null : clientAddress.trim() || null,
      client_email: mode === 'job' ? job?.client_email || null : clientEmail.trim() || null,
      client_phone: mode === 'job' ? job?.client_phone || null : null,
      job_title: result.draft.jobTitle,
      description: scope.trim() || null,
      value: totals.total,
      status: 'Draft',
      sent_date: null,
      valid_until: validUntil,
      job_id: mode === 'job' ? jobId : null,
      created_by: null,
      line_items: lineItems,
      notes: null,
      vat_rate: vatRate,
      reverse_charge: firm.reverseCharge,
      cis_enabled: deductCis,
      cis_rate: 20,
      subtotal: totals.subtotal,
      vat_amount: totals.vatAmount,
      cis_amount: totals.cisAmount,
      settings: { aiQuote: stamp },
    };
    const created = await createQuote.mutateAsync(base as unknown as Omit<Quote, 'id' | 'created_at' | 'updated_at'>);
    onSaved({
      ...(base as unknown as Quote),
      id: created.id,
      quote_number: created.quote_number,
      created_at: created.created_at,
      updated_at: created.updated_at,
      settings: {
        aiQuote: stamp,
        vatRate,
        vatRegistered: vatRate > 0,
        reverseCharge: firm.reverseCharge,
        cisEnabled: deductCis,
        ...(deductCis ? { cisRate: 20 } : {}),
      },
    });
  };

  const stepIndex = step === 'job' ? 0 : step === 'drafting' ? 1 : 2;

  const footer =
    step === 'job' ? (
      <div className="flex gap-2">
        <button type="button" onClick={() => onOpenChange(false)} className={cn(buttonSecondaryCn, 'flex-1')}>
          Cancel
        </button>
        <button type="button" data-help="aiquote.draft" disabled={!canDraft} onClick={() => run(false)} className={cn(buttonPrimaryCn, 'flex-[2]')}>
          Draft my quote
        </button>
      </div>
    ) : step === 'drafting' ? (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            runSeq.current++;
            setStep('job');
            setError(null);
          }}
          className={cn(buttonSecondaryCn, 'flex-1')}
        >
          Back
        </button>
        {error && (
          <button type="button" onClick={() => run(false)} className={cn(buttonPrimaryCn, 'flex-[2]')}>
            Try again
          </button>
        )}
      </div>
    ) : (
      <div className="flex gap-2">
        <button type="button" onClick={() => setStep('job')} className={cn(buttonSecondaryCn, 'flex-1')}>
          Change the job
        </button>
        <button
          type="button"
          disabled={createQuote.isPending || (labour.length === 0 && materials.length === 0)}
          onClick={save}
          className={cn(buttonPrimaryCn, 'flex-[2] inline-flex items-center justify-center gap-2')}
        >
          {createQuote.isPending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          Save draft and review
        </button>
      </div>
    );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="AI quote"
      title={step === 'review' && result ? result.draft.jobTitle : 'Draft a quote from a job'}
      description={
        step === 'review'
          ? 'Check every line. Nothing is sent until you send it from the quote builder.'
          : 'Priced from your own price book and your own past jobs.'
      }
      width="wide"
      bodyClassName="space-y-5 pt-4"
      subheader={
        <ol className="flex gap-2 py-3" aria-label="Progress">
          {['The job', 'Drafting', 'Review'].map((label, i) => (
            <li key={label} className="flex-1">
              <div
                className={cn(
                  'h-1 rounded-full',
                  i < stepIndex ? 'bg-elec-yellow' : i === stepIndex ? 'bg-elec-yellow' : 'bg-white/[0.12]'
                )}
              />
              <span className="mt-1.5 block text-[11.5px] font-medium text-white">{label}</span>
            </li>
          ))}
        </ol>
      }
      footer={footer}
    >
      {step === 'job' && (
        <div className="space-y-5 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Start from" data-help="aiquote.mode">
              {(
                [
                  ['job', 'From a job'],
                  ['describe', 'Describe the work'],
                ] as const
              ).map(([v, label]) => (
                <button
                  key={v}
                  type="button"
                  role="radio"
                  aria-checked={mode === v}
                  onClick={() => setMode(v)}
                  className={cn(chipBase, mode === v ? chipOn : chipOff)}
                >
                  {label}
                </button>
              ))}
            </div>

            {mode === 'job' ? (
              <section className={cardCn} aria-label="Pick a job">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search jobs, clients, addresses"
                    aria-label="Search jobs"
                    className={cn(inputCn, 'pl-7')}
                    autoComplete={autoCompleteOff}
                  />
                </div>
                {listed.length === 0 ? (
                  <p className="text-[13px] text-white">
                    No open jobs match. Switch to Describe the work to quote something new.
                  </p>
                ) : (
                  <ul className="max-h-[42vh] space-y-2 overflow-y-auto overscroll-contain pr-1 lg:max-h-[52vh]">
                    {listed.map((j) => {
                      const on = j.id === jobId;
                      return (
                        <li key={j.id}>
                          <button
                            type="button"
                            onClick={() => setJobId(j.id)}
                            aria-pressed={on}
                            className={cn(
                              'flex min-h-[56px] w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors touch-manipulation',
                              on
                                ? 'border-elec-yellow bg-white/[0.08]'
                                : 'border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06]'
                            )}
                          >
                            <span
                              className={cn(
                                'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                                on ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/30'
                              )}
                              aria-hidden
                            >
                              {on && <Check className="h-3 w-3" />}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[14px] font-medium text-white">{j.title}</span>
                              <span className="block truncate text-[12px] text-white">
                                {[j.client, j.location].filter(Boolean).join(' · ')}
                              </span>
                            </span>
                            {j.job_type && (
                              <span className="shrink-0 rounded-full border border-white/20 px-2 py-0.5 text-[11px] text-white">
                                {j.job_type}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            ) : (
              <section className={cardCn} aria-label="Customer">
                <div>
                  <label className={labelCn} htmlFor="aiq-client">
                    Customer name <span className="text-elec-yellow">*</span>
                  </label>
                  <input
                    id="aiq-client"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className={inputCn}
                    placeholder="e.g. Mrs Patel"
                    autoComplete={autoCompleteOff}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCn} htmlFor="aiq-email">
                      Email
                    </label>
                    <input
                      id="aiq-email"
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className={inputCn}
                      autoComplete={autoCompleteOff}
                    />
                  </div>
                  <div>
                    <label className={labelCn} htmlFor="aiq-address">
                      Site address
                    </label>
                    <input
                      id="aiq-address"
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      className={inputCn}
                      autoComplete={autoCompleteOff}
                    />
                  </div>
                </div>
              </section>
            )}
          </div>

          <section className={cardCn} aria-label="The work">
            <div>
              <label className={labelCn} htmlFor="aiq-desc">
                What needs doing <span className="text-elec-yellow">*</span>
              </label>
              <textarea
                id="aiq-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={cn(textareaCn, 'min-h-[130px]')}
                placeholder="e.g. Replace the 8-way fuse board with an 18th Edition consumer unit, SPD and RCBOs. Three-bed semi, board in the hall cupboard."
              />
            </div>
            <div>
              <label className={labelCn} htmlFor="aiq-type">
                Job type
              </label>
              <input
                id="aiq-type"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className={inputCn}
                placeholder="e.g. Consumer unit"
                autoComplete={autoCompleteOff}
              />
              {jobTypes.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {jobTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setJobType(t)}
                      className={cn(chipBase, 'px-3 text-[13px]', jobType.toLowerCase() === t.toLowerCase() ? chipOn : chipOff)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
              <p className="mt-1.5 text-[12px] text-white">
                The AI compares labour with your own finished jobs of this type.
              </p>
            </div>
            <div>
              <label className={labelCn} htmlFor="aiq-notes">
                Anything else it should know
              </label>
              <textarea
                id="aiq-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={cn(textareaCn, 'min-h-[80px]')}
                placeholder="Access, number of circuits, finishes, anything already on site"
              />
            </div>
          </section>
        </div>
      )}

      {step === 'drafting' && (
        <section className={cn(cardCn, 'mx-auto lg:max-w-2xl')} aria-live="polite">
          {error ? (
            <>
              <h2 className="text-[15px] font-semibold text-white">The draft did not finish</h2>
              <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 text-[13px] text-white">
                {error}
              </p>
              <p className="text-[13px] text-white">
                You have not been charged for a quote. Try again, or go back and change the
                description.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-[15px] font-semibold text-white">Drafting your quote</h2>
              <p className="text-[13px] text-white">Usually takes 20 to 40 seconds. Keep this open.</p>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.1]">
                <div
                  className="h-full rounded-full bg-elec-yellow transition-all duration-700"
                  style={{ width: `${Math.round(((stage + 1) / (STAGES.length + 1)) * 100)}%` }}
                />
              </div>
              <ol className="space-y-3">
                {STAGES.map((label, i) => (
                  <li key={label} className="flex items-center gap-3">
                    <span
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
                        i < stage ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/25'
                      )}
                      aria-hidden
                    >
                      {i < stage ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : i === stage ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
                      ) : null}
                    </span>
                    <span className={cn('text-[14px] text-white', i === stage && 'font-semibold')}>{label}</span>
                  </li>
                ))}
              </ol>
            </>
          )}
        </section>
      )}

      {step === 'review' && result && (
        <div className="space-y-5 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-8 lg:space-y-0">
          {/* Left: the totals and what the draft is based on */}
          <div className="space-y-5">
            <section className={cardCn} aria-label="Totals">
              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-white">
                    {firm?.reverseCharge ? 'Total (reverse charge)' : vatRate > 0 ? 'Total inc VAT' : 'Total (no VAT)'}
                  </p>
                  <p className="text-[32px] font-semibold leading-none tracking-tight text-white tabular-nums">
                    {money(totals.total)}
                  </p>
                </div>
                <p className="text-right text-[12px] text-white">
                  {labour.length + materials.length} lines
                  <br />
                  {labourHours} hrs labour
                </p>
              </div>
              <dl className="space-y-1.5 border-t border-white/[0.1] pt-3 text-[13px] text-white">
                <div className="flex justify-between">
                  <dt>Labour</dt>
                  <dd className="tabular-nums">{money(totals.labourNet)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Materials</dt>
                  <dd className="tabular-nums">{money(round2(totals.subtotal - totals.labourNet))}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>
                    {firm?.reverseCharge
                      ? 'VAT, reverse charge'
                      : vatRate > 0
                        ? `VAT ${vatRate}%`
                        : 'VAT, not registered'}
                  </dt>
                  <dd className="tabular-nums">{money(totals.vatAmount)}</dd>
                </div>
                {totals.cisAmount > 0 && (
                  <div className="flex justify-between">
                    <dt>Less CIS 20% of labour</dt>
                    <dd className="tabular-nums">−{money(totals.cisAmount)}</dd>
                  </div>
                )}
              </dl>
              <button
                type="button"
                role="switch"
                aria-checked={deductCis}
                onClick={() => setCisChoice(!deductCis)}
                className="flex min-h-11 w-full touch-manipulation items-center justify-between gap-3 rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-left"
              >
                <span className="min-w-0">
                  <span className="block text-[13px] font-medium text-white">Deduct CIS at 20%</span>
                  <span className="block text-[12px] text-white">
                    Only when your customer is a contractor under CIS. Never for a homeowner, and
                    not if you have gross payment status.
                  </span>
                </span>
                <span
                  className={cn(
                    'shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold',
                    deductCis ? 'bg-elec-yellow text-black' : 'border border-white/20 text-white'
                  )}
                >
                  {deductCis ? 'On' : 'Off'}
                </span>
              </button>
              <p className="text-[12px] text-white">
                VAT follows your firm settings. Change it in the quote builder.
              </p>
            </section>

            <section className={cardCn} aria-label="Where the prices came from">
              <h2 className="text-[15px] font-semibold text-white">Where the prices came from</h2>
              <ul className="space-y-2 text-[13px] text-white">
                <li className="flex items-center justify-between gap-3">
                  <LineSourceTag source="price_book" />
                  <span>
                    {fromBook} of {materials.length} materials
                  </span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <LineSourceTag source="ai_estimate" />
                  <span>
                    {estimated} material{estimated === 1 ? '' : 's'} to check
                  </span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <LineSourceTag source={result.context.labourRateSource} />
                  <span>{money(result.context.labourRate)} an hour</span>
                </li>
              </ul>
              {result.context.priceBookCount === 0 && (
                <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 text-[12.5px] text-white">
                  Your price book is empty, so every material is an AI estimate. Add your usual
                  items in Money, Price book and the next draft uses your own prices.
                </p>
              )}
              {result.context.labourRateSource === 'default_rate' && (
                <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 text-[12.5px] text-white">
                  No charge-out rate is set, so labour uses £45 an hour. Set your rate in Settings.
                </p>
              )}
              {result.cached && (
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.1] pt-3">
                  <p className="text-[12.5px] text-white">
                    Same job and prices as a draft made {timeAgo(result.createdAt)}, so it was not
                    charged again.
                  </p>
                  <button
                    type="button"
                    onClick={() => run(true)}
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-3 text-[13px] font-medium text-white touch-manipulation"
                  >
                    <RefreshCw className="h-4 w-4" aria-hidden />
                    Draft again
                  </button>
                </div>
              )}
            </section>

            <section className={cardCn} aria-label="Scope of works">
              <label className={labelCn} htmlFor="aiq-scope">
                Scope of works (shown to the customer)
              </label>
              <textarea
                id="aiq-scope"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className={cn(textareaCn, 'min-h-[110px]')}
              />
            </section>
          </div>

          {/* Right: the lines */}
          <div className="space-y-5">
            <section className={cardCn} aria-label="Labour">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-[15px] font-semibold text-white">Labour</h2>
                <span className="text-[13px] text-white tabular-nums">{labourHours} hrs</span>
              </div>
              {histAvg != null && history ? (
                <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-2.5">
                  <p className="text-[13px] text-white">
                    Based on your last {history.count} {history.job_type} job
                    {history.count === 1 ? '' : 's'}, {histAvg} hours
                    {history.avg_quoted_hours != null ? ` (you quoted ${history.avg_quoted_hours})` : ''}.
                    This draft has {labourHours} hours.
                  </p>
                  {Math.abs(histAvg - labourHours) >= 0.25 && (
                    <button
                      type="button"
                      onClick={applyHistoryHours}
                      className="mt-2 inline-flex h-11 items-center rounded-xl border border-white/[0.15] bg-white/[0.06] px-3 text-[13px] font-medium text-white touch-manipulation"
                    >
                      Use {histAvg} hours
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-[12.5px] text-white">
                  {result.context.jobType
                    ? `No finished ${result.context.jobType} jobs with approved timesheets yet, so hours are the AI's estimate from practical work timings.`
                    : 'Set a job type to compare these hours with your own past jobs.'}
                </p>
              )}
              <ul className="divide-y divide-white/[0.08]">
                {labour.map((l) => (
                  <li key={l.id} className="flex items-start gap-3 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-medium text-white">{l.description}</p>
                      {l.basis && <p className="mt-0.5 text-[12px] text-white">{l.basis}</p>}
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <LineSourceTag source={l.source} />
                        <span className="text-[12.5px] text-white tabular-nums">
                          {l.hours} hrs × {money(l.rate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="text-[14px] font-semibold text-white tabular-nums">
                        {money(round2(l.hours * l.rate))}
                      </span>
                      <button
                        type="button"
                        onClick={() => setLabour((p) => p.filter((x) => x.id !== l.id))}
                        aria-label={`Remove ${l.description}`}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/[0.06] touch-manipulation"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className={cardCn} aria-label="Materials">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-[15px] font-semibold text-white">Materials</h2>
                <span className="text-[13px] text-white">
                  {fromBook} from your price book
                </span>
              </div>
              <ul className="divide-y divide-white/[0.08]">
                {materials.map((m) => (
                  <li key={m.id} className="flex items-start gap-3 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-medium text-white">{m.description}</p>
                      {m.note && <p className="mt-0.5 text-[12px] text-white">{m.note}</p>}
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <LineSourceTag source={m.source} />
                        <span className="text-[12.5px] text-white tabular-nums">
                          {m.quantity} {m.unit} × {money(m.unitPrice)}
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="text-[14px] font-semibold text-white tabular-nums">
                        {money(round2(m.quantity * m.unitPrice))}
                      </span>
                      <button
                        type="button"
                        onClick={() => setMaterials((p) => p.filter((x) => x.id !== m.id))}
                        aria-label={`Remove ${m.description}`}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/[0.06] touch-manipulation"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {(result.draft.siteChecks.length > 0 || result.draft.assumptions.length > 0) && (
              <section className={cardCn} aria-label="Before you send">
                {result.draft.siteChecks.length > 0 && (
                  <div>
                    <h2 className="text-[15px] font-semibold text-white">Confirm on site</h2>
                    <ul className="mt-2 space-y-1.5">
                      {result.draft.siteChecks.map((c) => (
                        <li key={c} className="text-[13px] leading-snug text-white">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {result.draft.assumptions.length > 0 && (
                  <div className="border-t border-white/[0.1] pt-4">
                    <h3 className="text-sm font-semibold text-white">The price assumes</h3>
                    <ul className="mt-2 space-y-1.5">
                      {result.draft.assumptions.map((c) => (
                        <li key={c} className="text-[13px] leading-snug text-white">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      )}
    </FormSheet>
  );
}

export default AIQuoteSheet;

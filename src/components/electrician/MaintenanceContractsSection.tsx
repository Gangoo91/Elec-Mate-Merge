/**
 * Maintenance contracts — the electrician-defined half of the renewals page
 * (ELE-430). List of active cadences with pause/resume/end, and a bottom
 * sheet to set a new one up. Visits are generated nightly server-side; this
 * surface only manages the contracts themselves.
 */
import React, { useMemo, useState } from 'react';
import { RotateCw, Plus, FileText, Loader2, Mail, PenLine, Check } from 'lucide-react';
import { openOrDownloadPdf } from '@/utils/pdf-download';
import { toast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  useMaintenanceContracts,
  FREQUENCY_LABELS,
  type ContractFrequency,
  type ContractClientType,
  type MaintenanceContract,
} from '@/hooks/useMaintenanceContracts';
import { cn } from '@/lib/utils';
import { PANEL } from '@/components/electrician/shared/surfaces';

const underlineCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow shadow-none transition-colors hover:border-white/[0.3] ' +
  'focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none ' +
  '[color-scheme:dark] touch-manipulation';

const labelCn = 'mb-1 block text-[12px] font-medium text-white';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const chipBase =
  'h-11 rounded-xl border px-3 text-[13px] touch-manipulation transition-colors';

const JOB_TYPE_SUGGESTIONS = [
  'PAT testing',
  'Fire alarm service',
  'Emergency lighting test',
  'EICR',
  'Maintenance visit',
];

const FREQUENCIES: ContractFrequency[] = [
  'monthly',
  'quarterly',
  'six_monthly',
  'annually',
  'two_yearly',
  'three_yearly',
  'five_yearly',
  'weekly',
  'custom',
];

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatDue(dateStr: string): string {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function daysToDue(dateStr: string): number {
  return Math.ceil(
    (new Date(dateStr + 'T12:00:00').getTime() - Date.now()) / 86_400_000
  );
}

export interface ContractPrefill {
  customerName?: string;
  customerId?: string | null;
  jobType?: string;
  amount?: number | null;
  frequency?: ContractFrequency;
  clientType?: ContractClientType;
}

interface MaintenanceContractsSectionProps {
  /**
   * Opens the create sheet pre-filled — the renewal detail sheet's "put this
   * on a contract" and the quote/invoice "make it recurring" entry points
   * land here. A new object reference re-opens the sheet.
   */
  prefill?: ContractPrefill | null;
}

export function MaintenanceContractsSection({ prefill }: MaintenanceContractsSectionProps) {
  const { contracts, isLoading, createContract, creating, setStatus } =
    useMaintenanceContracts();
  const queryClient = useQueryClient();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [pdfBusy, setPdfBusy] = useState<string | null>(null);
  const [sendBusy, setSendBusy] = useState<string | null>(null);

  /** Email the client the signing link — /agreement/{token}, one tap to sign. */
  const handleSendForSignature = async (contractId: string) => {
    setSendBusy(contractId);
    try {
      const { data, error } = await supabase.functions.invoke('maintenance-agreement', {
        body: { action: 'send', contract_id: contractId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({ title: `Sent for signature to ${data?.to || 'the customer'}` });
      queryClient.invalidateQueries({ queryKey: ['maintenance-contracts'] });
    } catch (err) {
      toast({
        title: `Could not send: ${err instanceof Error ? err.message : 'unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setSendBusy(null);
    }
  };

  /*
   * The signable agreement document — parties, service, schedule, price,
   * terms, signature lines. Hand-over URL (expires ~1h), never stored.
   */
  const handleContractPdf = async (contractId: string) => {
    setPdfBusy(contractId);
    try {
      const { data, error } = await supabase.functions.invoke(
        'generate-maintenance-contract-pdf',
        { body: { contract_id: contractId } }
      );
      if (error) throw error;
      if (!data?.url) throw new Error(data?.error || 'No document returned');
      await openOrDownloadPdf(data.url as string, (data.filename as string) || 'Maintenance-Agreement.pdf');
    } catch (err) {
      toast({
        title: `Could not generate the agreement: ${err instanceof Error ? err.message : 'unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setPdfBusy(null);
    }
  };

  // Form state
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [jobType, setJobType] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<ContractFrequency>('quarterly');
  const [customDays, setCustomDays] = useState('30');
  const [startDate, setStartDate] = useState(todayIso());
  const [autoInvoice, setAutoInvoice] = useState(false);
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [emailCustomer, setEmailCustomer] = useState(false);
  const [clientType, setClientType] = useState<ContractClientType>('domestic');

  React.useEffect(() => {
    if (!prefill) return;
    if (prefill.customerName) setCustomerName(prefill.customerName);
    if (prefill.customerId) setCustomerId(prefill.customerId);
    if (prefill.jobType) setJobType(prefill.jobType);
    if (prefill.frequency) setFrequency(prefill.frequency);
    if (prefill.clientType) setClientType(prefill.clientType);
    if (prefill.amount != null && prefill.amount > 0) {
      setAutoInvoice(true);
      setInvoiceAmount(String(prefill.amount));
    }
    setSheetOpen(true);
  }, [prefill]);

  // The customer book, for picking rather than retyping. Recent first when
  // the field is empty; filtered as they type. Tapping links customer_id so
  // the visit emails and the agreement PDF know where to go.
  const { data: customers = [] } = useQuery({
    queryKey: ['customers-for-contracts'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];
      const { data } = await supabase
        .from('customers')
        .select('id, name, email, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(300);
      return data || [];
    },
    enabled: sheetOpen,
  });

  const suggestions = useMemo(() => {
    if (customerId) return [];
    const q = customerName.trim().toLowerCase();
    // Empty field: the most recent customers, ready to tap. Typing: filter.
    if (q.length < 2) return customers.slice(0, 6);
    return customers
      .filter((c) => String(c.name || '').toLowerCase().includes(q))
      .slice(0, 6);
  }, [customers, customerName, customerId]);

  /*
   * The annuity headline — what the active contracts are worth per year.
   * Watching this number build is the whole point of the feature.
   */
  const contractedPerYear = useMemo(() => {
    const perYear: Record<string, number> = {
      weekly: 52,
      monthly: 12,
      quarterly: 4,
      six_monthly: 2,
      annually: 1,
    };
    return contracts
      .filter((c) => c.status === 'active')
      .reduce((sum, c) => {
        const amount = Number(c.default_invoice_amount) || 0;
        if (!amount) return sum;
        const visits =
          c.frequency === 'custom'
            ? 365 / Math.max(1, c.frequency_custom_days || 30)
            : perYear[c.frequency] || 1;
        return sum + amount * visits;
      }, 0);
  }, [contracts]);

  /*
   * "Looks like regular work" — customers with 2+ completed certs are
   * contract customers who don't know it yet. Mined from the electrician's
   * own reports; anyone already on an active contract drops out.
   */
  const { data: repeatCandidates = [] } = useQuery({
    queryKey: ['contract-candidates'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];
      const { data } = await supabase
        .from('reports')
        .select('customer_id, client_name, installation_address')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .is('deleted_at', null)
        .limit(500);
      const groups = new Map<string, { name: string; customerId: string | null; count: number }>();
      for (const r of data || []) {
        const key =
          (r.customer_id as string) ||
          String(r.installation_address || '').trim().toLowerCase();
        if (!key) continue;
        const existing = groups.get(key);
        if (existing) existing.count += 1;
        else
          groups.set(key, {
            name: (r.client_name as string) || (r.installation_address as string) || 'Customer',
            customerId: (r.customer_id as string) || null,
            count: 1,
          });
      }
      return [...groups.values()].filter((g) => g.count >= 2).sort((a, b) => b.count - a.count);
    },
  });

  const candidates = useMemo(() => {
    const onContract = new Set(
      contracts
        .filter((c) => c.status === 'active')
        .flatMap((c) => [c.customer_id, c.customer_name.trim().toLowerCase()])
        .filter(Boolean)
    );
    return repeatCandidates
      .filter(
        (g) => !onContract.has(g.customerId || '') && !onContract.has(g.name.trim().toLowerCase())
      )
      .slice(0, 3);
  }, [repeatCandidates, contracts]);

  const canSave = customerName.trim().length > 0 && jobType.trim().length > 0 && !!startDate;

  const resetForm = () => {
    setCustomerName('');
    setCustomerId(null);
    setJobType('');
    setDescription('');
    setFrequency('quarterly');
    setCustomDays('30');
    setStartDate(todayIso());
    setAutoInvoice(false);
    setInvoiceAmount('');
    setEmailCustomer(false);
    setClientType('domestic');
  };

  const handleSave = () => {
    createContract({
      customer_id: customerId,
      customer_name: customerName.trim(),
      job_type: jobType.trim(),
      description: description.trim() || null,
      frequency,
      frequency_custom_days: frequency === 'custom' ? Math.max(1, parseInt(customDays, 10) || 30) : null,
      start_date: startDate,
      reminder_days_before: 7,
      auto_create_invoice: autoInvoice,
      default_invoice_amount: Number(invoiceAmount) || null,
      auto_email_customer: emailCustomer,
      client_type: clientType,
    });
    setSheetOpen(false);
    resetForm();
  };

  const active = contracts.filter((c) => c.status !== 'ended');

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">
            Maintenance contracts
          </h2>
          {contractedPerYear > 0 && (
            <p className="mt-0.5 text-[12px] font-semibold tabular-nums text-elec-yellow">
              £{Math.round(contractedPerYear).toLocaleString('en-GB')}/year contracted
            </p>
          )}
        </div>
        <button
          onClick={() => setSheetOpen(true)}
          className="flex h-9 flex-shrink-0 items-center gap-1.5 rounded-xl bg-elec-yellow px-3 text-[13px] font-semibold text-black touch-manipulation"
        >
          <Plus className="h-4 w-4" />
          New contract
        </button>
      </div>

      {isLoading ? null : active.length === 0 ? (
        <div className={cn(PANEL, 'p-4')}>
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-elec-yellow/10 p-2">
              <RotateCw className="h-4 w-4 text-elec-yellow" />
            </div>
            <p className="text-[12.5px] leading-snug text-white">
              Repeat work on a schedule — quarterly PAT rounds, six-monthly fire alarm services,
              annual maintenance visits. Each visit drops into your tasks automatically, with an
              optional draft invoice and customer reminder email.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {active.map((c: MaintenanceContract) => {
            const days = daysToDue(c.next_due_date);
            return (
              <div
                key={c.id}
                className={cn(PANEL, 'flex flex-col p-4', c.status === 'paused' && 'opacity-70')}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.10]">
                    <RotateCw className="h-4 w-4 text-elec-yellow" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold leading-snug text-white">
                      {c.job_type}
                    </p>
                    <p className="truncate text-[12.5px] text-white">{c.customer_name}</p>
                  </div>
                  <span
                    className={cn(
                      'flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                      c.status === 'paused'
                        ? 'bg-amber-500/10 text-amber-300'
                        : 'bg-emerald-500/10 text-emerald-300'
                    )}
                  >
                    {c.status === 'paused' ? 'Paused' : 'Active'}
                  </span>
                </div>

                <div className="mt-3 flex items-end justify-between gap-3 border-t border-white/[0.08] pt-3">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                      Next visit
                    </p>
                    <p className="mt-0.5 text-[14px] font-semibold tabular-nums text-white">
                      {formatDue(c.next_due_date)}
                    </p>
                    <p className="text-[11.5px] tabular-nums text-elec-yellow">
                      {c.status === 'paused'
                        ? 'On hold'
                        : days <= 0
                          ? 'Due now'
                          : `in ${days} day${days === 1 ? '' : 's'}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-semibold tabular-nums text-white">
                      {c.default_invoice_amount
                        ? `£${Number(c.default_invoice_amount).toFixed(2)}`
                        : '—'}
                      <span className="font-normal"> · {FREQUENCY_LABELS[c.frequency]}</span>
                    </p>
                    {c.auto_email_customer && (
                      <p className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-white">
                        <Mail className="h-3 w-3 text-elec-yellow" /> Reminds the customer
                      </p>
                    )}
                    {c.client_signed_at ? (
                      <p className="mt-0.5 flex items-center justify-end gap-1 text-[11px] font-medium text-emerald-300">
                        <Check className="h-3 w-3" /> Signed by {c.client_signed_name || 'the client'}
                      </p>
                    ) : c.sent_for_signature_at ? (
                      <p className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-white">
                        <PenLine className="h-3 w-3 text-elec-yellow" /> Awaiting signature
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {!c.client_signed_at && (
                    <button
                      onClick={() => handleSendForSignature(c.id)}
                      disabled={sendBusy === c.id}
                      className="flex h-9 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-elec-yellow px-3 text-[12px] font-semibold text-black touch-manipulation disabled:bg-white/[0.08] disabled:text-white/70"
                    >
                      {sendBusy === c.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <PenLine className="h-3.5 w-3.5" />
                      )}
                      {c.sent_for_signature_at ? 'Re-send' : 'Send to sign'}
                    </button>
                  )}
                  <button
                    onClick={() => handleContractPdf(c.id)}
                    disabled={pdfBusy === c.id}
                    aria-label="Contract PDF"
                    className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl border border-elec-yellow/40 bg-elec-yellow/10 px-3 text-[12px] font-medium text-elec-yellow touch-manipulation disabled:opacity-60"
                  >
                    {pdfBusy === c.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <FileText className="h-3.5 w-3.5" />
                    )}
                    Agreement
                  </button>
                  <button
                    onClick={() =>
                      setStatus({ id: c.id, status: c.status === 'paused' ? 'active' : 'paused' })
                    }
                    className="h-9 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-[12px] font-medium text-white touch-manipulation"
                  >
                    {c.status === 'paused' ? 'Resume' : 'Pause'}
                  </button>
                  <button
                    onClick={() => setStatus({ id: c.id, status: 'ended' })}
                    className="h-9 rounded-xl border border-white/[0.12] px-3 text-[12px] font-medium text-white touch-manipulation"
                  >
                    End
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mined from their own certs: 2+ completed jobs for the same customer
          is a contract waiting to be asked for. */}
      {candidates.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
              ·
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/65">
              Looks like regular work
            </span>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
          {candidates.map((g) => (
            <div
              key={g.customerId || g.name}
              className={cn(PANEL, 'flex items-center justify-between gap-3 px-4 py-3')}
            >
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-white">{g.name}</p>
                <p className="text-[11.5px] text-white">
                  {g.count} jobs done — put them on a contract?
                </p>
              </div>
              <button
                onClick={() => {
                  setCustomerName(g.name);
                  setCustomerId(g.customerId);
                  setSheetOpen(true);
                }}
                className="h-9 flex-shrink-0 rounded-xl border border-elec-yellow/40 bg-elec-yellow/10 px-3 text-[12px] font-medium text-elec-yellow touch-manipulation"
              >
                Set up
              </button>
            </div>
          ))}
          </div>
        </div>
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex h-full flex-col bg-background">
            <SheetHeader className="border-b border-white/10 px-4 py-3">
              {/* max-w keeps the form a readable column on desktop — a
                  phone-first sheet stretched across a big screen reads as
                  mile-wide underlines and lost chips. */}
              <div className="mx-auto w-full max-w-3xl lg:max-w-5xl 2xl:max-w-6xl">
                <SheetTitle className="text-left text-base text-white">
                  New maintenance contract
                </SheetTitle>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 py-5 pb-24 sm:px-8">
              {/* Phone: one column. Desktop: a proper two-column form — a
                  single narrow column adrift in a wide sheet reads as broken. */}
              <div className="mx-auto grid w-full max-w-3xl gap-5 sm:grid-cols-2 sm:gap-x-10 lg:max-w-5xl lg:gap-x-14 2xl:max-w-6xl 2xl:gap-x-20">
              <div className="sm:col-span-2">
                <label className={labelCn}>Customer</label>
                {customerId ? (
                  <div className="flex items-center justify-between rounded-xl border border-elec-yellow/40 bg-elec-yellow/10 px-3.5 py-2.5">
                    <span className="truncate text-[14px] font-semibold text-white">
                      {customerName}
                    </span>
                    <button
                      onClick={() => {
                        setCustomerId(null);
                        setCustomerName('');
                      }}
                      className="flex-shrink-0 text-[12px] font-medium text-elec-yellow touch-manipulation"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <>
                    <Input
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        setCustomerId(null);
                      }}
                      className={underlineCn}
                      placeholder="Type a name, or pick below"
                    />
                    {suggestions.length > 0 && (
                      <div className="mt-2.5">
                        <p className="mb-1.5 text-[11px] font-medium text-white">
                          {customerName.trim().length < 2 ? 'Your customers' : 'Matches'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {suggestions.map((s) => (
                            <button
                              key={s.id as string}
                              onClick={() => {
                                setCustomerName(String(s.name || ''));
                                setCustomerId(s.id as string);
                              }}
                              className={cn(chipBase, chipOff)}
                            >
                              {String(s.name || '')}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className={labelCn}>Who is the client?</label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      { v: 'domestic', label: 'Homeowner', hint: 'Consumer rights apply' },
                      { v: 'business', label: 'Business', hint: 'Commercial terms' },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.v}
                      onClick={() => setClientType(opt.v)}
                      className={cn(
                        chipBase,
                        'h-auto py-2 text-center',
                        clientType === opt.v ? chipOn : chipOff
                      )}
                    >
                      <span className="block text-[13px]">{opt.label}</span>
                      <span className={cn('block text-[10px]', clientType === opt.v ? 'text-black/70' : 'text-white')}>
                        {opt.hint}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className={labelCn}>What's the work?</label>
                <Input
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className={underlineCn}
                  placeholder="e.g. Quarterly PAT testing"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {JOB_TYPE_SUGGESTIONS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setJobType(t)}
                      className={cn(chipBase, jobType === t ? chipOn : chipOff)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelCn}>How often?</label>
                <div className="grid grid-cols-3 gap-2">
                  {FREQUENCIES.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFrequency(f)}
                      className={cn(chipBase, frequency === f ? chipOn : chipOff)}
                    >
                      {FREQUENCY_LABELS[f]}
                    </button>
                  ))}
                </div>
                {frequency === 'custom' && (
                  <div className="mt-3">
                    <label className={labelCn}>Every how many days?</label>
                    <Input
                      type="number"
                      inputMode="numeric"
                      value={customDays}
                      onChange={(e) => setCustomDays(e.target.value)}
                      className={underlineCn}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className={labelCn}>First visit</label>
                <div className="mb-2 flex flex-wrap gap-2">
                  {(
                    [
                      { label: 'Next week', days: 7 },
                      { label: 'Two weeks', days: 14 },
                      { label: 'Next month', days: 30 },
                    ] as const
                  ).map((opt) => {
                    const d = new Date();
                    d.setDate(d.getDate() + opt.days);
                    const iso = d.toISOString().slice(0, 10);
                    return (
                      <button
                        key={opt.label}
                        onClick={() => setStartDate(iso)}
                        className={cn(chipBase, startDate === iso ? chipOn : chipOff)}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                <Input
                  type="date"
                  value={startDate}
                  min={todayIso()}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={underlineCn}
                />
              </div>

              <div>
                <label className={labelCn}>
                  Price per visit (£) <span className="font-normal">(optional)</span>
                </label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(e.target.value)}
                  className={underlineCn}
                  placeholder="0.00"
                />
                <p className="mt-1 text-[11.5px] text-white">
                  Printed on the agreement, and used for draft invoices if you switch them on.
                </p>
              </div>

              <div>
                <label className={labelCn}>
                  Notes <span className="font-normal">(optional)</span>
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={cn(underlineCn, 'min-h-[64px] resize-none py-2')}
                  placeholder="Scope, access arrangements…"
                />
              </div>

              <div className="grid gap-4 border-t border-white/[0.1] pt-4 sm:col-span-2 sm:grid-cols-2 sm:gap-x-10">
                <label className="flex cursor-pointer items-center justify-between gap-4">
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold text-white">
                      Draft the invoice for me
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-white">
                      A draft invoice at the price above is created alongside each visit — review
                      and send.
                    </span>
                  </span>
                  <Switch checked={autoInvoice} onCheckedChange={setAutoInvoice} />
                </label>

                <label className="flex cursor-pointer items-center justify-between gap-4">
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold text-white">
                      Email the customer before each visit
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-white">
                      A week before each visit they get a branded reminder in your name, with a
                      button to book you. Needs an email on their customer record.
                    </span>
                  </span>
                  <Switch checked={emailCustomer} onCheckedChange={setEmailCustomer} />
                </label>
              </div>
              </div>
            </div>

            <div className="border-t border-white/10 bg-background p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="mx-auto w-full max-w-3xl lg:max-w-5xl 2xl:max-w-6xl">
                <button
                  onClick={handleSave}
                  disabled={!canSave || creating}
                  className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation disabled:bg-white/[0.08] disabled:text-white/70"
                >
                  Set up contract
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

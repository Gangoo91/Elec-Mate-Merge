import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { createInvoice } from '@/services/financeService';
import { FormCard } from '@/components/employer/editorial';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';

/* ELE-2065 staged and progress payments. A quote carries settings.stages
   ([{ id, label, percent }]); when a stage is marked done on the job (or on the
   accepted quote) it raises its own draft invoice for that share of the quote,
   linked back by invoice settings.stageOf / stageId. A deposit paid when the
   customer accepted is taken off the LAST stage, then earlier stages if it is
   bigger than the last stage, so no stage is ever billed below zero. Each
   credited stage carries settings.depositCredit and total_paid (the same
   credit the Electrical Hub uses for a deposit, ELE-1760); finance_invoice_rows
   reads depositCredit so the deposit is counted once (M3). The quote's CIS
   carries onto each stage: the stage is split into its labour and other share
   of the quote, so the CIS on the stage invoices adds up to the quote's. */

interface StageRow {
  id: string;
  label: string;
  percent: number;
  invoice_id?: string | null;
  done_at?: string | null;
}

interface StagedQuote {
  id: string;
  quote_number: string | null;
  client_data: { name?: string; email?: string; phone?: string } | null;
  settings: Record<string, unknown> | null;
  subtotal: number;
  vat_amount: number;
  total: number;
  acceptance_status: string | null;
  status: string | null;
  employer_job_id: string | null;
  job_details: { title?: string } | null;
  deposit_paid_at: string | null;
  deposit_amount_pennies: number | null;
  customer_id: string | null;
  items: unknown;
}

interface StageInvoice {
  id: string;
  invoice_number: string | null;
  invoice_status: string | null;
  total: number;
  settings: Record<string, unknown> | null;
}

const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n || 0);
const r2 = (n: number) => Math.round(n * 100) / 100;

const QUOTE_COLS =
  'id, quote_number, client_data, settings, subtotal, vat_amount, total, acceptance_status, status, employer_job_id, job_details, deposit_paid_at, deposit_amount_pennies, customer_id, items';

function useStagedQuotes(filter: { quoteId?: string; jobId?: string }) {
  return useQuery({
    queryKey: ['staged-quotes', filter.quoteId ?? null, filter.jobId ?? null],
    enabled: !!(filter.quoteId || filter.jobId),
    queryFn: async () => {
      let q = supabase
        .from('quotes')
        .select(QUOTE_COLS)
        .is('deleted_at', null)
        .not('settings->stages', 'is', null);
      q = filter.quoteId
        ? q.eq('id', filter.quoteId)
        : q.eq('employer_job_id' as never, filter.jobId as never);
      const { data: quotes, error } = await q;
      if (error) throw error;
      const staged = ((quotes ?? []) as unknown as StagedQuote[]).filter(
        (x) =>
          Array.isArray(x.settings?.stages) &&
          (x.settings!.stages as unknown[]).length > 0 &&
          !(x.settings as { stageOf?: string }).stageOf
      );
      if (!staged.length) return { quotes: [] as StagedQuote[], invoices: [] as StageInvoice[] };
      const { data: inv, error: invErr } = await supabase
        .from('quotes')
        .select('id, invoice_number, invoice_status, total, settings')
        .is('deleted_at', null)
        .in('settings->>stageOf' as never, staged.map((s) => s.id) as never);
      if (invErr) throw invErr;
      return { quotes: staged, invoices: (inv ?? []) as unknown as StageInvoice[] };
    },
  });
}

/** A stage's net / VAT / gross. The last stage takes whatever is left, so the
 *  stage invoices always add up to the quote to the penny. */
function stageAmounts(quote: StagedQuote, stages: StageRow[], index: number) {
  const share = (i: number) => {
    const pct = (Number(stages[i]?.percent) || 0) / 100;
    return { net: r2(Number(quote.subtotal) * pct), vat: r2(Number(quote.vat_amount) * pct) };
  };
  if (index < stages.length - 1) {
    const { net, vat } = share(index);
    return { net, vat, gross: r2(net + vat) };
  }
  let netBefore = 0;
  let vatBefore = 0;
  for (let i = 0; i < stages.length - 1; i++) {
    const x = share(i);
    netBefore += x.net;
    vatBefore += x.vat;
  }
  const net = r2(Number(quote.subtotal) - netBefore);
  const vat = r2(Number(quote.vat_amount) - vatBefore);
  return { net, vat, gross: r2(net + vat) };
}

const num = (v: unknown): number | null => {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string' && /^-?[0-9]+(\.[0-9]+)?$/.test(v.trim())) return Number(v.trim());
  return null;
};

/** Labour's share of the quote's net, by the same rule as the SQL
 *  _doc_cis_amount (category 'labour'; or no category and type 'labour'; or
 *  neither and priced by the hour or day; category adjustments applied). */
function quoteLabourFraction(
  items: unknown,
  settings: Record<string, unknown> | null
): number {
  const adj = (settings?.categoryAdjustments ?? {}) as Record<string, unknown>;
  const pct = (cat: string) =>
    cat === 'labour' || cat === 'materials' || cat === 'equipment' ? (num(adj[cat]) ?? 0) : 0;
  let sub = 0;
  let labour = 0;
  for (const raw of Array.isArray(items) ? items : []) {
    if (!raw || typeof raw !== 'object') continue;
    const i = raw as Record<string, unknown>;
    const q = num(i.quantity);
    const u = num(i.unitPrice);
    const v =
      q !== null && u !== null
        ? q * u * (1 + (num(i.itemAdjustmentPercent) ?? 0) / 100)
        : (num(i.totalPrice) ?? num(i.total) ?? 0);
    const cat = typeof i.category === 'string' ? i.category : '';
    const type = typeof i.type === 'string' ? i.type : '';
    const isLabour =
      cat === 'labour' ||
      (cat === '' && type === 'labour') ||
      (cat === '' && type === '' && (i.unit === 'hour' || i.unit === 'day'));
    sub += v * (1 + pct(cat) / 100);
    if (isLabour) labour += v * (1 + (cat === 'labour' ? pct('labour') : 0) / 100);
  }
  return sub > 0 ? Math.min(Math.max(labour / sub, 0), 1) : 0;
}

/** The deposit credit each stage carries. Stages already invoiced keep what
 *  they were given; what is left of the deposit goes on the stages not yet
 *  invoiced, last stage first, never more than a stage's own gross. */
function stageDepositCredits(
  grosses: number[],
  given: (number | null)[],
  deposit: number
): number[] {
  const out = grosses.map((_, i) => (given[i] == null ? 0 : r2(Math.max(given[i] as number, 0))));
  let left = r2(deposit - out.reduce((a, b) => a + b, 0));
  for (let i = grosses.length - 1; i >= 0 && left > 0; i--) {
    if (given[i] != null) continue;
    const take = r2(Math.min(left, Math.max(grosses[i], 0)));
    out[i] = take;
    left = r2(left - take);
  }
  return out;
}

const isAccepted = (q: StagedQuote) =>
  q.acceptance_status === 'accepted' ||
  q.acceptance_status === 'accepted_pending_deposit' ||
  q.status === 'approved';

function StageList({
  quote,
  invoices,
  showTitle,
}: {
  quote: StagedQuote;
  invoices: StageInvoice[];
  showTitle: boolean;
}) {
  const qc = useQueryClient();
  const [, setSearchParams] = useSearchParams();
  const [busy, setBusy] = useState<string | null>(null);
  const stages = (quote.settings?.stages as StageRow[]) ?? [];
  const settings = (quote.settings ?? {}) as Record<string, unknown>;
  const deposit = quote.deposit_paid_at ? Number(quote.deposit_amount_pennies || 0) / 100 : 0;
  const accepted = isAccepted(quote);

  const invoiceFor = (s: StageRow) =>
    invoices.find(
      (i) =>
        (i.settings as { stageId?: string } | null)?.stageId === s.id &&
        (i.settings as { stageOf?: string } | null)?.stageOf === quote.id
    ) ?? (s.invoice_id ? invoices.find((i) => i.id === s.invoice_id) : undefined);

  // What each stage carries of the deposit (already invoiced: what it was given).
  const credits = (list: StageInvoice[]) =>
    stageDepositCredits(
      stages.map((_, i) => stageAmounts(quote, stages, i).gross),
      stages.map((s) => {
        const inv = list.find(
          (i) =>
            (i.settings as { stageId?: string } | null)?.stageId === s.id &&
            (i.settings as { stageOf?: string } | null)?.stageOf === quote.id
        );
        if (!inv) return null;
        if (/^(cancelled|canceled|void|voided)$/i.test(inv.invoice_status ?? '')) return 0;
        return num((inv.settings as { depositCredit?: unknown } | null)?.depositCredit) ?? 0;
      }),
      deposit
    );
  const shownCredits = credits(invoices);

  const raise = async (s: StageRow, index: number) => {
    setBusy(s.id);
    try {
      // Re-read: someone else may have raised it a moment ago.
      const { data: fresh } = await supabase
        .from('quotes')
        .select('id, invoice_number, invoice_status, total, settings')
        .is('deleted_at', null)
        .eq('settings->>stageOf' as never, quote.id as never);
      const freshList = (fresh ?? []) as unknown as StageInvoice[];
      if (
        freshList.some((i) => (i.settings as { stageId?: string } | null)?.stageId === s.id)
      ) {
        toast.info('That stage has already been invoiced.');
        await qc.invalidateQueries({ queryKey: ['staged-quotes'] });
        return;
      }
      const { net, vat, gross } = stageAmounts(quote, stages, index);
      // M3: this stage's share of the paid deposit, worked out from the
      // stage invoices as they are now.
      const credit = credits(freshList)[index] ?? 0;
      const vatRate = Number(settings.vatRate ?? 20);
      const label = `${s.label} (${s.percent}% of quote ${quote.quote_number ?? ''})`.trim();
      const due = new Date(Date.now() + 14 * 86_400_000).toISOString().slice(0, 10);
      // M3: the quote's CIS carries onto the stage. The stage is split into
      // its labour and other share, so CIS is withheld from labour only.
      const cisOn = settings.cisEnabled === true || settings.cisEnabled === 'true';
      const cisRate = num(settings.cisRate) ?? 20;
      const labourNet = cisOn ? r2(net * quoteLabourFraction(quote.items, settings)) : 0;
      const line = (description: string, value: number, labour: boolean) => ({
        id: crypto.randomUUID(),
        description,
        quantity: 1,
        unit: 'stage',
        unitPrice: value,
        total: value,
        totalPrice: value,
        type: labour ? 'labour' : 'material',
        category: labour ? 'labour' : 'materials',
      });
      const lines =
        cisOn && labourNet > 0
          ? [
              line(`${label}: labour`, labourNet, true),
              ...(r2(net - labourNet) !== 0
                ? [line(`${label}: materials and other`, r2(net - labourNet), false)]
                : []),
            ]
          : [{ ...line(label, net, false), category: 'stage' }];
      const created = await createInvoice({
        invoice_number: '',
        client: quote.client_data?.name || 'Client',
        project: quote.job_details?.title ?? null,
        amount: gross,
        status: 'Draft',
        due_date: due,
        paid_date: null,
        job_id: quote.employer_job_id,
        quote_id: quote.id,
        line_items: lines,
        notes:
          credit > 0
            ? `${gbp(credit)} of the ${gbp(deposit)} deposit paid when the quote was accepted has been taken off this stage.`
            : null,
        vat_rate: settings.vatRegistered === false ? 0 : vatRate,
        reverse_charge: settings.reverseCharge === true,
        cis_enabled: cisOn,
        ...(cisOn ? { cis_rate: cisRate } : {}),
        subtotal: net,
        vat_amount: vat,
        ...({
          client_email: quote.client_data?.email ?? null,
          client_phone: quote.client_data?.phone ?? null,
          client_id: quote.customer_id,
        } as object),
      } as never);

      // Link the stage invoice back to its quote, and credit its deposit share.
      const { data: row } = await supabase
        .from('quotes')
        .select('settings')
        .eq('id', created.id)
        .maybeSingle();
      const invSettings = ((row as { settings?: Record<string, unknown> } | null)?.settings ??
        {}) as Record<string, unknown>;
      const { error: linkErr } = await supabase
        .from('quotes')
        .update({
          settings: {
            ...invSettings,
            stageOf: quote.id,
            stageId: s.id,
            stageLabel: s.label,
            ...(credit > 0 ? { depositCredit: credit } : {}),
          } as never,
          ...(credit > 0 ? { total_paid: Math.min(credit, gross) } : {}),
        } as never)
        .eq('id', created.id);
      if (linkErr) throw linkErr;

      const nextStages = stages.map((x) =>
        x.id === s.id ? { ...x, invoice_id: created.id, done_at: new Date().toISOString() } : x
      );
      const { error: qErr } = await supabase
        .from('quotes')
        .update({ settings: { ...settings, stages: nextStages } as never })
        .eq('id', quote.id);
      if (qErr) throw qErr;

      await Promise.all([
        qc.invalidateQueries({ queryKey: ['staged-quotes'] }),
        qc.invalidateQueries({ queryKey: ['invoices'] }),
        qc.invalidateQueries({ queryKey: ['quotes'] }),
      ]);
      toast.success(
        `${s.label} invoiced: ${created.invoice_number ?? 'draft'} for ${gbp(gross)}. Open it to send.`
      );
    } catch (e) {
      toast.error((e as Error).message || 'Could not raise the stage invoice');
    } finally {
      setBusy(null);
    }
  };

  const nextIndex = stages.findIndex((s) => !invoiceFor(s));

  return (
    <div className="space-y-2">
      {showTitle && (
        <p className="text-[13px] font-semibold text-white">
          Quote {quote.quote_number} · {gbp(Number(quote.total))}
        </p>
      )}
      {!accepted && (
        <p className="text-[13px] text-white">
          Stages can be invoiced once the customer accepts the quote.
        </p>
      )}
      <div className="divide-y divide-white/[0.07] overflow-hidden rounded-xl border border-white/[0.08]">
        {stages.map((s, i) => {
          const inv = invoiceFor(s);
          const amount = stageAmounts(quote, stages, i).gross;
          const status = inv
            ? `${inv.invoice_number ?? 'Invoice'} · ${(inv.invoice_status ?? 'draft').replace(/^./, (c) => c.toUpperCase())}`
            : 'Not done yet';
          return (
            <div
              key={s.id}
              className="flex min-h-[60px] items-center gap-3 px-3 py-2.5"
              data-testid={`stage-${s.id}`}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-white">
                  {s.label} · {s.percent}%
                </p>
                <p className="truncate text-[12.5px] text-white">
                  {gbp(amount)} · {status}
                  {(shownCredits[i] ?? 0) > 0 ? ` · less ${gbp(shownCredits[i])} deposit` : ''}
                </p>
              </div>
              {inv ? (
                <button
                  type="button"
                  onClick={() => setSearchParams({ section: 'quotes', invoice: inv.id })}
                  className="inline-flex h-11 shrink-0 items-center rounded-full border border-white/[0.14] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
                >
                  Open
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!accepted || !!busy}
                  onClick={() => raise(s, i)}
                  className={cn(
                    'inline-flex h-11 shrink-0 items-center rounded-full px-4 text-[13px] font-semibold touch-manipulation disabled:opacity-50',
                    // One yellow action: the next stage to invoice. Later
                    // stages are outlined so the order reads at a glance.
                    i === nextIndex
                      ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                      : 'border border-white/[0.14] text-white hover:bg-white/[0.06]'
                  )}
                >
                  {busy === s.id ? 'Raising' : 'Done, invoice it'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** True when the job has a quote billed in stages, so a one-off "Invoice this
 *  job" would bill the whole quote again on top of the stage invoices. */
export function useJobHasStagedQuote(jobId?: string): boolean {
  const { data } = useStagedQuotes({ jobId });
  return !!data?.quotes.length;
}

/** On an accepted quote's sheet. Renders nothing for a quote without stages. */
export function QuotePaymentStages({ quoteId }: { quoteId: string }) {
  const { data } = useStagedQuotes({ quoteId });
  const q = data?.quotes[0];
  if (!q) return null;
  return (
    <FormCard eyebrow="Payment stages">
      <StageList quote={q} invoices={data!.invoices} showTitle={false} />
    </FormCard>
  );
}

/** On the job sheet: every staged quote for the job. Nothing when there are none. */
export function JobPaymentStages({ jobId }: { jobId: string }) {
  const { data } = useStagedQuotes({ jobId });
  if (!data?.quotes.length) return null;
  return (
    <FormCard eyebrow="Payment stages">
      <p className="text-[13px] text-white">
        Mark a stage done when the work is done. It raises a draft invoice for that stage.
      </p>
      <div className="space-y-4">
        {data.quotes.map((q) => (
          <StageList
            key={q.id}
            quote={q}
            invoices={data.invoices}
            showTitle={data.quotes.length > 1}
          />
        ))}
      </div>
    </FormCard>
  );
}

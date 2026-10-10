import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { buttonSecondaryCn, inputCn, labelCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { providerWords } from '@/lib/collegeProviderType';

/* ==========================================================================
   Admin → Colleges → Hub colleges: billing and access requests.

   CollegeBillingAdmin (ELE-1922), per college: the pricing model (to be
   confirmed by Andrew until set; prices show PRICE PLACEHOLDER while empty),
   this academic year's learner count (taken once; a second take is a
   correction with a note), the cohorts the agreement covers, invoices raised
   in Elec-Mate's own invoicing (number, amount, sent / paid), and a VAT watch
   on the last 12 months of college invoicing. No Stripe, no card payments.

   CollegeAccessRequestsAdmin (ELE-1924): requests from /for-colleges.

   Everything goes through platform-admin-only RPCs.
   ========================================================================== */

interface AdminCollege {
  id: string;
  name: string;
  code: string;
  is_demo: boolean;
  provider_type: string | null;
  pricing_model: 'to_confirm' | 'college_funded';
  college_price_pence: number | null;
  setup_fee_pence: number | null;
  renewal_date: string | null;
  po_number: string | null;
  billing_contact_name: string | null;
  billing_contact_email: string | null;
  payment_terms_days: number;
  academic_year: string;
  live: { linked: number; no_cohort: number };
  cohorts: Array<{ id: string; name: string; billing_linked: boolean }>;
  count: {
    id: string;
    learner_count: number;
    computed_count: number;
    counted_on: string;
    corrections: unknown[];
  } | null;
  invoices: Array<{
    id: string;
    description: string;
    amount_pence: number;
    invoice_number: string | null;
    status: 'draft' | 'sent' | 'paid' | 'void';
    issued_on: string | null;
    due_on: string | null;
    paid_on: string | null;
  }>;
}

interface Overview {
  vat_threshold_pence: number;
  invoiced_12m_pence: number;
  colleges: AdminCollege[];
}

const money = (p: number) =>
  (p / 100).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
const pence = (s: string) => {
  const n = Number(s.replace(/[£,\s]/g, ''));
  return Number.isFinite(n) && s.trim() !== '' ? Math.round(n * 100) : null;
};
const day = (iso: string | null) =>
  iso
    ? new Date(`${iso.slice(0, 10)}T12:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

function Placeholder() {
  return (
    <span className="rounded border border-dashed border-elec-yellow px-1.5 py-0.5 font-mono text-[12px] font-semibold text-elec-yellow">
      PRICE PLACEHOLDER
    </span>
  );
}

export function CollegeBillingAdmin() {
  const { toast } = useToast();
  const [data, setData] = useState<Overview | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase.rpc('admin_college_billing_overview' as never);
    if (error) {
      toast({
        title: 'Could not load billing',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }
    setData(data as unknown as Overview);
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const rpc = async (fn: string, args: Record<string, unknown>, done: string) => {
    const { error } = await supabase.rpc(fn as never, args as never);
    if (error) {
      toast({ title: 'Not saved', description: error.message, variant: 'destructive' });
      return false;
    }
    toast({ title: done });
    await load();
    return true;
  };

  if (!data) return null;
  const vatPct = Math.min(
    100,
    Math.round((data.invoiced_12m_pence / data.vat_threshold_pence) * 100)
  );

  return (
    <section className="space-y-4" data-testid="college-billing-admin">
      <h3 className="text-[15px] font-semibold tracking-tight text-white">
        Billing and learner counts
      </h3>
      <div className="rounded-2xl border border-white/[0.08] p-4">
        <p className="text-[12.5px] text-white">
          College invoicing, last 12 months (sent and paid)
        </p>
        <p className="mt-1 text-[20px] font-bold tabular-nums text-white">
          {money(data.invoiced_12m_pence)}{' '}
          <span className="text-[13px] font-medium">
            of the {money(data.vat_threshold_pence)} VAT threshold
          </span>
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className={cn('h-full rounded-full', vatPct >= 75 ? 'bg-orange-400' : 'bg-elec-yellow')}
            style={{ width: `${vatPct}%` }}
          />
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-white">
          Only college invoices recorded here. The threshold is on all taxable turnover, so check
          the whole business too.
        </p>
      </div>

      <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08]">
        {data.colleges.map((c) => (
          <AdminCollegeRow
            key={c.id}
            c={c}
            open={open === c.id}
            onToggle={() => setOpen(open === c.id ? null : c.id)}
            rpc={rpc}
          />
        ))}
      </ul>
    </section>
  );
}

function AdminCollegeRow({
  c,
  open,
  onToggle,
  rpc,
}: {
  c: AdminCollege;
  open: boolean;
  onToggle: () => void;
  rpc: (fn: string, args: Record<string, unknown>, done: string) => Promise<boolean>;
}) {
  const [price, setPrice] = useState(
    c.college_price_pence !== null ? String(c.college_price_pence / 100) : ''
  );
  const [setup, setSetup] = useState(
    c.setup_fee_pence !== null ? String(c.setup_fee_pence / 100) : ''
  );
  const [renewal, setRenewal] = useState(c.renewal_date ?? '');
  const [po, setPo] = useState(c.po_number ?? '');
  const [contact, setContact] = useState(c.billing_contact_email ?? '');
  const [model, setModel] = useState(c.pricing_model);
  const [countNote, setCountNote] = useState('');
  const [countOverride, setCountOverride] = useState('');
  const [inv, setInv] = useState({ description: '', amount: '', number: '', issued: '' });

  return (
    <li className="px-4 py-3">
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-[44px] w-full items-center gap-3 text-left touch-manipulation"
      >
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold text-white">
            {c.name} {c.is_demo && <span className="text-[12px] font-normal">(demo)</span>}
          </span>
          <span className="block text-[12px] text-white">
            {providerWords(c.provider_type).label} · {c.academic_year}:{' '}
            {c.count
              ? `${c.count.learner_count} counted`
              : `not counted (${c.live.linked} on linked cohorts)`}
          </span>
        </span>
        <span className="text-[12px] text-white">
          {c.pricing_model === 'to_confirm' ? (
            'Model to confirm'
          ) : c.college_price_pence !== null ? (
            `${money(c.college_price_pence)}/learner`
          ) : (
            <Placeholder />
          )}
        </span>
      </button>

      {open && (
        <div className="mt-3 space-y-5 border-t border-white/[0.06] pt-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <span className={labelCn}>Pricing model</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {(['to_confirm', 'college_funded'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setModel(m)}
                    className={cn(
                      'h-11 rounded-full border px-3.5 text-[12.5px] font-semibold touch-manipulation',
                      model === m
                        ? 'border-white bg-white text-black'
                        : 'border-white/[0.14] text-white'
                    )}
                  >
                    {m === 'to_confirm' ? 'To confirm (Andrew)' : 'College pays per learner'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCn} htmlFor={`p-${c.id}`}>
                Price per learner per year (£) {price === '' && <Placeholder />}
              </label>
              <input
                id={`p-${c.id}`}
                inputMode="decimal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <label className={labelCn} htmlFor={`s-${c.id}`}>
                Set-up fee (£) {setup === '' && <Placeholder />}
              </label>
              <input
                id={`s-${c.id}`}
                inputMode="decimal"
                value={setup}
                onChange={(e) => setSetup(e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <label className={labelCn} htmlFor={`r-${c.id}`}>
                Renewal date
              </label>
              <input
                id={`r-${c.id}`}
                type="date"
                value={renewal}
                onChange={(e) => setRenewal(e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <label className={labelCn} htmlFor={`po-${c.id}`}>
                Purchase order
              </label>
              <input
                id={`po-${c.id}`}
                value={po}
                onChange={(e) => setPo(e.target.value)}
                className={inputCn}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCn} htmlFor={`bc-${c.id}`}>
                Invoices go to (email)
              </label>
              <input
                id={`bc-${c.id}`}
                type="email"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className={inputCn}
              />
            </div>
          </div>
          <button
            type="button"
            className={buttonSecondaryCn}
            onClick={() =>
              void rpc(
                'admin_save_college_billing',
                {
                  p_college: c.id,
                  p_patch: {
                    pricing_model: model,
                    college_price_pence: pence(price),
                    setup_fee_pence: pence(setup),
                    renewal_date: renewal,
                    po_number: po,
                    billing_contact_email: contact,
                  },
                },
                'Billing saved'
              )
            }
          >
            Save billing
          </button>

          <div className="space-y-2">
            <p className="text-[13.5px] font-semibold text-white">Linked cohorts</p>
            <ul className="space-y-1">
              {c.cohorts.map((co) => (
                <li key={co.id} className="flex items-center gap-3">
                  <span className="min-w-0 flex-1 truncate text-[13px] text-white">{co.name}</span>
                  <button
                    type="button"
                    onClick={() =>
                      void rpc(
                        'admin_set_cohort_billing_linked',
                        { p_cohort: co.id, p_linked: !co.billing_linked },
                        'Cohort updated'
                      )
                    }
                    className={cn(
                      'h-11 rounded-full border px-3 text-[12px] font-semibold touch-manipulation',
                      co.billing_linked
                        ? 'border-emerald-400/60 text-emerald-300'
                        : 'border-white/[0.2] text-white'
                    )}
                  >
                    {co.billing_linked ? 'Linked' : 'Not linked'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-[13.5px] font-semibold text-white">
              Learner count for {c.academic_year}
            </p>
            <p className="text-[12.5px] text-white">
              {c.count
                ? `${c.count.learner_count} counted on ${day(c.count.counted_on)} (roll said ${c.count.computed_count}). A new take is a correction and needs a note.`
                : `Not taken. The roll has ${c.live.linked} learners on linked cohorts${c.live.no_cohort ? ` and ${c.live.no_cohort} with no cohort` : ''}.`}
            </p>
            <div className="grid gap-2 sm:grid-cols-[120px_1fr_auto] sm:items-end">
              <div>
                <label className={labelCn} htmlFor={`co-${c.id}`}>
                  Figure
                </label>
                <input
                  id={`co-${c.id}`}
                  inputMode="numeric"
                  placeholder={String(c.live.linked)}
                  value={countOverride}
                  onChange={(e) => setCountOverride(e.target.value.replace(/\D/g, ''))}
                  className={inputCn}
                />
              </div>
              <div>
                <label className={labelCn} htmlFor={`cn-${c.id}`}>
                  Note {c.count ? '(required)' : '(optional)'}
                </label>
                <input
                  id={`cn-${c.id}`}
                  value={countNote}
                  onChange={(e) => setCountNote(e.target.value)}
                  className={inputCn}
                />
              </div>
              <button
                type="button"
                className={buttonSecondaryCn}
                onClick={() =>
                  void rpc(
                    'admin_record_learner_count',
                    {
                      p_college: c.id,
                      p_count: countOverride ? Number(countOverride) : null,
                      p_note: countNote || null,
                    },
                    c.count ? 'Count corrected' : 'Count taken'
                  )
                }
              >
                {c.count ? 'Correct count' : 'Take count'}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[13.5px] font-semibold text-white">Invoices</p>
            <p className="text-[12.5px] text-white">
              Make the invoice in Elec-Mate&apos;s own invoicing, then record it here so the college
              sees it.
            </p>
            {c.invoices.length > 0 && (
              <ul className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.08]">
                {c.invoices.map((i) => (
                  <li key={i.id} className="flex flex-wrap items-center gap-2 px-3 py-2">
                    <span className="min-w-0 flex-1 text-[13px] text-white">
                      {i.invoice_number ? `${i.invoice_number} · ` : ''}
                      {i.description} · {money(i.amount_pence)}
                    </span>
                    <span className="text-[12px] text-white">{i.status}</span>
                    {i.status !== 'paid' && i.status !== 'void' && (
                      <button
                        type="button"
                        className="h-11 px-2 text-[12px] font-semibold text-elec-yellow touch-manipulation"
                        onClick={() =>
                          void rpc(
                            'admin_set_college_invoice_status',
                            {
                              p_invoice: i.id,
                              p_status: i.status === 'draft' ? 'sent' : 'paid',
                              p_on: null,
                            },
                            'Invoice updated'
                          )
                        }
                      >
                        {i.status === 'draft' ? 'Mark sent' : 'Mark paid'}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                aria-label="What for"
                placeholder="What for, e.g. 2026/27 licence"
                value={inv.description}
                onChange={(e) => setInv({ ...inv, description: e.target.value })}
                className={inputCn}
              />
              <input
                aria-label="Amount (£, before VAT)"
                placeholder="Amount £ before VAT"
                inputMode="decimal"
                value={inv.amount}
                onChange={(e) => setInv({ ...inv, amount: e.target.value })}
                className={inputCn}
              />
              <input
                aria-label="Invoice number"
                placeholder="Invoice number"
                value={inv.number}
                onChange={(e) => setInv({ ...inv, number: e.target.value })}
                className={inputCn}
              />
              <input
                aria-label="Date sent"
                type="date"
                value={inv.issued}
                onChange={(e) => setInv({ ...inv, issued: e.target.value })}
                className={inputCn}
              />
            </div>
            <button
              type="button"
              className={buttonSecondaryCn}
              disabled={!inv.description.trim() || pence(inv.amount) === null}
              onClick={() =>
                void rpc(
                  'admin_record_college_invoice',
                  {
                    p_college: c.id,
                    p_payload: {
                      description: inv.description,
                      amount_pence: pence(inv.amount),
                      invoice_number: inv.number,
                      issued_on: inv.issued,
                      learner_count_id: c.count?.id ?? '',
                    },
                  },
                  'Invoice recorded'
                ).then(
                  (ok) => ok && setInv({ description: '', amount: '', number: '', issued: '' })
                )
              }
            >
              Record invoice
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

interface AccessRequest {
  id: string;
  created_at: string;
  name: string;
  email: string;
  organisation: string;
  role: string | null;
  provider_type: string | null;
  learner_estimate: number | null;
  programmes: string | null;
  message: string | null;
  status: 'new' | 'replied' | 'code_sent' | 'closed';
}

const NEXT: Record<AccessRequest['status'], AccessRequest['status']> = {
  new: 'replied',
  replied: 'code_sent',
  code_sent: 'closed',
  closed: 'new',
};
const STATUS_LABEL: Record<AccessRequest['status'], string> = {
  new: 'New',
  replied: 'Replied',
  code_sent: 'Code sent',
  closed: 'Closed',
};

export function CollegeAccessRequestsAdmin() {
  const [rows, setRows] = useState<AccessRequest[] | null>(null);
  const load = useCallback(async () => {
    const { data } = await supabase.rpc(
      'admin_list_college_access_requests' as never,
      { p_limit: 50 } as never
    );
    setRows((data ?? []) as unknown as AccessRequest[]);
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  if (!rows) return null;

  return (
    <section className="space-y-3" data-testid="college-access-requests">
      <h3 className="text-[15px] font-semibold tracking-tight text-white">
        Access requests from /for-colleges
      </h3>
      {rows.length === 0 ? (
        <p className="text-[13px] text-white">None yet. Each request also emails founder@.</p>
      ) : (
        <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08]">
          {rows.map((r) => (
            <li key={r.id} className="space-y-1 px-4 py-3">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-white">
                    {r.organisation}{' '}
                    <span className="text-[12px] font-normal">
                      · {providerWords(r.provider_type).label}
                    </span>
                  </p>
                  <p className="text-[12.5px] text-white">
                    {r.name}
                    {r.role ? `, ${r.role}` : ''} ·{' '}
                    <a className="underline" href={`mailto:${r.email}`}>
                      {r.email}
                    </a>{' '}
                    · {day(r.created_at)}
                  </p>
                  <p className="text-[12.5px] text-white">
                    {[
                      r.learner_estimate ? `about ${r.learner_estimate} learners` : null,
                      r.programmes,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  {r.message && (
                    <p className="mt-1 text-[13px] leading-relaxed text-white">{r.message}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    void supabase
                      .rpc(
                        'admin_set_college_access_request' as never,
                        { p_id: r.id, p_status: NEXT[r.status], p_notes: null } as never
                      )
                      .then(() => load())
                  }
                  className="h-11 shrink-0 rounded-full border border-white/[0.14] px-3 text-[12px] font-semibold text-white touch-manipulation"
                  title="Move to the next status"
                >
                  {STATUS_LABEL[r.status]}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

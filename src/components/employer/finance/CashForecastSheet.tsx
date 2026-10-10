/**
 * Finance → Cash forecast (ELE-2074). The next 8 weeks of money in and out,
 * with a running balance and the low point. An estimate, owner and admins only.
 *
 * Every figure comes from get_cash_forecast; this sheet lays it out and lets the
 * owner add what the app cannot see (bank balance, VAT quarters, rent, retention
 * releases, stage payments). It goes live on invoice, booking and order changes.
 */
import { useEffect, useState, type FormEvent } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import FormSheet from '@/components/forms/FormSheet';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
} from '@/components/employer/editorial';
import {
  FigureStrip,
  PlainEmpty,
  Row,
  Tag,
  panel,
  PanelTitle,
  rowBtnSecondary,
  rowsClass,
} from '@/components/employer/pageParts/PageParts';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import {
  CASH_KIND_LABEL,
  gbp0,
  lowPointLine,
  useCashForecast,
  useCashOwnerItems,
  useDeleteCashItem,
  useSaveCashItem,
  useSaveCashSettings,
  type CashForecast,
  type CashOwnerItem,
  type CashWeek,
} from '@/hooks/useCashForecast';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

export const gbp2 = (n: number) =>
  `${n < 0 ? '−' : ''}£${Math.abs(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const short = (d: string) =>
  new Date(`${d.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
export const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const VAT_OPTIONS: { value: number | null; label: string }[] = [
  { value: null, label: 'Not VAT registered' },
  { value: 1, label: 'Mar, Jun, Sep, Dec' },
  { value: 2, label: 'Apr, Jul, Oct, Jan' },
  { value: 3, label: 'May, Aug, Nov, Feb' },
];

export function CashForecastSheet({
  open,
  firm,
  onClose,
}: {
  open: boolean;
  firm: string | null | undefined;
  onClose: () => void;
}) {
  const { data: f, isLoading, isError, refetch } = useCashForecast(firm, open);
  const saveSettings = useSaveCashSettings();
  const { data: owned = [] } = useCashOwnerItems(firm, open);
  const [openWeek, setOpenWeek] = useState<number | null>(null);
  const [editing, setEditing] = useState<Partial<CashOwnerItem> | null>(null);

  // Live: a paid invoice, a booking or an order changes the forecast.
  useRealtimeInvalidate(
    'cash-forecast',
    firm
      ? [
          { table: 'quotes', filter: `user_id=eq.${firm}` },
          { table: 'employer_jobs', filter: `user_id=eq.${firm}` },
          { table: 'employer_material_orders', filter: `employer_id=eq.${firm}` },
          { table: 'employer_subcontractor_statements', filter: `employer_id=eq.${firm}` },
          { table: 'employer_cash_items', filter: `employer_id=eq.${firm}` },
        ]
      : [],
    [['cash-forecast']],
    open && !!firm
  );

  const low = lowPointLine(f);
  const description = f
    ? `An estimate from your invoices, bookings, timesheets, CIS, VAT and bills. ${low ?? ''}`.trim()
    : 'An estimate from your invoices, bookings, timesheets, CIS, VAT and bills.';

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={(o) => !o && onClose()}
        width="wide"
        eyebrow="Cash forecast"
        title="The next 8 weeks"
        description={description}
        footer={
          <div className="flex justify-end gap-2">
            <SecondaryButton onClick={onClose} className="flex-1 sm:flex-none sm:px-6">
              Close
            </SecondaryButton>
            {f && (
              <PrimaryButton
                type="submit"
                form={SETTINGS_FORM_ID}
                disabled={saveSettings.isPending}
                className="flex-1 sm:flex-none sm:px-6"
              >
                {saveSettings.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Save your numbers'
                )}
              </PrimaryButton>
            )}
          </div>
        }
        bodyClassName="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-6 items-start"
      >
        {isLoading ? (
          <div className={cn(panel, 'lg:col-span-2')}>
            <PlainEmpty bare text="Working out the forecast…" />
          </div>
        ) : isError || !f ? (
          <div className={cn(panel, 'lg:col-span-2')}>
            <PlainEmpty
              bare
              text="The forecast did not load."
              action={
                <button type="button" onClick={() => refetch()} className={rowBtnSecondary}>
                  Try again
                </button>
              }
            />
          </div>
        ) : (
          <>
            <div className="min-w-0 space-y-5">
              <FigureStrip
                figures={[
                  {
                    label: 'In the bank',
                    value: f.has_balance ? gbp0(f.opening_balance) : 'Not set',
                    sub:
                      f.has_balance && f.balance_on
                        ? `On ${short(f.balance_on)}`
                        : 'Add it under Your numbers',
                  },
                  { label: 'Coming in', value: gbp0(f.totals.money_in), sub: '8 weeks' },
                  { label: 'Going out', value: gbp0(f.totals.money_out), sub: '8 weeks' },
                  {
                    label: f.has_balance ? 'Lowest point' : 'Weakest week',
                    value: f.low
                      ? f.has_balance
                        ? gbp0(f.low.balance)
                        : `Week ${f.low.week}`
                      : '—',
                    sub: f.low
                      ? `Week ${f.low.week}, ${short(f.low.start)} to ${short(f.low.end)}`
                      : undefined,
                    tone: f.has_balance && f.low && f.low.balance < 0 ? 'red' : undefined,
                  },
                ]}
              />

              <section>
                <PanelTitle title="Week by week" meta="Tap a week for what is in it" />
                <div className={cn(panel, 'overflow-hidden')}>
                  <div className={rowsClass}>
                    {f.weeks.map((w) => (
                      <WeekRow
                        key={w.week}
                        w={w}
                        f={f}
                        open={openWeek === w.week}
                        onToggle={() => setOpenWeek((o) => (o === w.week ? null : w.week))}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-white">
                  This is an estimate, not your bank. Invoices land on their due date moved by how
                  late that customer usually pays. Wages use the last 4 weeks of approved timesheets
                  at cost ({gbp2(Number(f.assumptions.labour_weekly))} a week, paid{' '}
                  {f.assumptions.pay_frequency.replace('_', ' ')}). Subcontractors are paid net of
                  CIS, and the CIS goes to HMRC on the 22nd. Invoices with CIS count what the
                  customer pays after the deduction. Supplier bills fall due{' '}
                  {f.assumptions.supplier_terms_days} days after the order; ones already past that
                  are taken as paid. Things you add count from the day after your bank balance, so
                  nothing already in it is counted twice.
                </p>
              </section>
            </div>

            <div className="min-w-0 space-y-5">
              {f.low && (
                <section>
                  <PanelTitle title="What drives the low point" />
                  <div className={cn(panel, 'overflow-hidden')}>
                    {f.low.drivers.length === 0 ? (
                      <PlainEmpty bare text="Nothing goes out that week." />
                    ) : (
                      <div className={rowsClass}>
                        {f.low.drivers.map((d, i) => (
                          <Row
                            key={`${d.kind}-${d.date}-${i}`}
                            title={d.label}
                            detail={`${short(d.date)} · ${d.note ?? CASH_KIND_LABEL[d.kind]}`}
                            wrapDetail
                            amount={`−${gbp2(d.amount)}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )}

              <SettingsCard firm={firm} f={f} save={saveSettings} />

              <section>
                <PanelTitle
                  title="Things only you know"
                  meta={owned.length > 0 ? owned.length : undefined}
                />
                <div className={cn(panel, 'overflow-hidden')}>
                  {owned.length === 0 ? (
                    <PlainEmpty
                      bare
                      stacked
                      text="Rent, van finance, insurance, retention releases and stage payments the app cannot see."
                    />
                  ) : (
                    <div className={rowsClass}>
                      {owned.map((o) => (
                        <Row
                          key={o.id}
                          title={o.label}
                          detail={`${o.direction === 'in' ? 'In' : 'Out'} · ${repeatLabel(o)}`}
                          amount={`${o.direction === 'in' ? '+' : '−'}${gbp2(o.amount)}`}
                          onClick={() => setEditing(o)}
                        />
                      ))}
                    </div>
                  )}
                  <div className="border-t border-white/[0.07] px-4 py-3 sm:px-5">
                    <button
                      type="button"
                      onClick={() =>
                        setEditing({
                          direction: 'out',
                          kind: 'recurring',
                          repeat: 'monthly',
                          first_date: todayIso(),
                        })
                      }
                      className={rowBtnSecondary}
                    >
                      <Plus className="h-4 w-4" />
                      Add money in or out
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
      </FormSheet>
      <CashItemSheet firm={firm} item={editing} onClose={() => setEditing(null)} />
    </>
  );
}

export function repeatLabel(o: CashOwnerItem) {
  const from = short(o.first_date);
  switch (o.repeat) {
    case 'weekly':
      return `Every week from ${from}`;
    case 'monthly':
      return `Every month from ${from}`;
    case 'quarterly':
      return `Every quarter from ${from}`;
    default:
      return `On ${from}`;
  }
}

export function WeekRow({
  w,
  f,
  open,
  onToggle,
}: {
  w: CashWeek;
  f: CashForecast;
  open: boolean;
  onToggle: () => void;
}) {
  const items = f.items.filter((i) => i.week === w.week);
  const isLow = f.low?.week === w.week;
  const neg = f.has_balance && w.balance < 0;
  return (
    <div>
      <Row
        title={`Week ${w.week} · ${short(w.start)} to ${short(w.end)}`}
        detail={`In ${gbp0(w.money_in)} · out ${gbp0(w.money_out)}`}
        amount={
          <span className={neg ? 'text-red-400' : undefined}>
            {f.has_balance ? gbp0(w.balance) : `${w.net >= 0 ? '+' : ''}${gbp0(w.net)}`}
          </span>
        }
        status={
          isLow ? (
            <Tag tone={neg ? 'red' : 'yellow'}>{f.has_balance ? 'Lowest' : 'Weakest'}</Tag>
          ) : undefined
        }
        onClick={onToggle}
        chevron={false}
      />
      {open && (
        <div className="border-t border-white/[0.07] bg-white/[0.02]">
          {items.length === 0 ? (
            <p className="px-4 py-3 text-[13px] text-white sm:px-5">Nothing expected this week.</p>
          ) : (
            <ul className={rowsClass}>
              {items.map((i, n) => (
                <li
                  key={`${i.kind}-${i.date}-${n}`}
                  className="flex items-start justify-between gap-3 px-4 py-2.5 sm:px-5"
                >
                  <span className="min-w-0">
                    <span className="block break-words text-[14px] font-medium text-white">
                      {i.label}
                    </span>
                    <span className="block text-[12px] text-white">
                      {CASH_KIND_LABEL[i.kind]} ·{' '}
                      {i.late ? `was ${short(i.date)}, late` : short(i.date)}
                      {i.note ? ` · ${i.note}` : ''}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'shrink-0 text-[14px] font-semibold tabular-nums',
                      i.direction === 'in' ? 'text-emerald-400' : 'text-white'
                    )}
                  >
                    {i.direction === 'in' ? '+' : '−'}
                    {gbp2(i.amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export const SETTINGS_FORM_ID = 'cash-forecast-settings';

export function SettingsCard({
  firm,
  f,
  save,
}: {
  firm: string | null | undefined;
  f: CashForecast;
  save: ReturnType<typeof useSaveCashSettings>;
}) {
  const [balance, setBalance] = useState('');
  const [vat, setVat] = useState<number | null>(null);
  const [terms, setTerms] = useState('30');
  useEffect(() => {
    setBalance(f.settings?.opening_balance != null ? String(f.settings.opening_balance) : '');
    setVat(f.settings?.vat_stagger ?? null);
    setTerms(String(f.settings?.supplier_terms_days ?? 30));
  }, [f.settings]);

  const submit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!firm) return;
    const t = Math.round(Number(terms));
    if (!Number.isFinite(t) || t < 0 || t > 120) {
      toast({
        title: 'Check the supplier terms',
        description: 'Between 0 and 120 days.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await save.mutateAsync({
        firm,
        opening_balance: balance.trim() === '' ? null : Number(balance),
        balance_on: balance.trim() === '' ? null : todayIso(),
        vat_stagger: vat,
        supplier_terms_days: t,
      });
      toast({ title: 'Saved' });
    } catch (e) {
      toast({ title: 'Not saved', description: (e as Error).message, variant: 'destructive' });
    }
  };

  return (
    <form id={SETTINGS_FORM_ID} onSubmit={submit}>
      <FormCard eyebrow="Your numbers">
        <FormGrid cols={2}>
          <Field label="In the bank today (£)" hint="Leave empty to see money in and out only.">
            <Input
              type="number"
              inputMode="decimal"
              step="0.01"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="4250"
              className={inputClass}
            />
          </Field>
          <Field label="Supplier terms (days)">
            <Input
              type="number"
              inputMode="numeric"
              min="0"
              max="120"
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className={inputClass}
            />
          </Field>
        </FormGrid>
        <div>
          <p className="mb-2 text-[12px] font-medium text-white">VAT quarters end in</p>
          <div className="grid grid-cols-2 gap-2">
            {VAT_OPTIONS.map((o) => (
              <button
                key={String(o.value)}
                type="button"
                aria-pressed={vat === o.value}
                onClick={() => setVat(o.value)}
                className={cn(
                  'min-h-11 rounded-2xl border px-3 py-2 text-[12.5px] touch-manipulation',
                  vat === o.value ? chipOn : chipOff
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[12px] text-white">
            VAT is due 1 month and 7 days after the quarter ends: the VAT on your invoices less the
            VAT on your purchase orders.
          </p>
        </div>
      </FormCard>
    </form>
  );
}

export function CashItemSheet({
  firm,
  item,
  onClose,
}: {
  firm: string | null | undefined;
  item: Partial<CashOwnerItem> | null;
  onClose: () => void;
}) {
  const save = useSaveCashItem();
  const del = useDeleteCashItem();
  const [d, setD] = useState<Partial<CashOwnerItem>>({});
  const [amount, setAmount] = useState('');
  useEffect(() => {
    if (!item) return;
    setD(item);
    setAmount(item.amount ? String(item.amount) : '');
  }, [item]);

  const submit = async () => {
    if (!firm) return;
    const a = Number(amount);
    if (!d.label?.trim() || !(a > 0) || !d.first_date) {
      toast({ title: 'Add a name, an amount and a date', variant: 'destructive' });
      return;
    }
    try {
      await save.mutateAsync({
        firm,
        item: {
          id: d.id,
          direction: d.direction ?? 'out',
          kind: d.kind ?? 'other',
          label: d.label.trim(),
          amount: Math.round(a * 100) / 100,
          first_date: d.first_date,
          repeat: d.repeat ?? 'none',
          end_date: d.repeat && d.repeat !== 'none' ? d.end_date || null : null,
        },
      });
      onClose();
    } catch (e) {
      toast({ title: 'Not saved', description: (e as Error).message, variant: 'destructive' });
    }
  };

  const remove = async () => {
    if (!d.id) return;
    try {
      await del.mutateAsync(d.id);
      onClose();
    } catch (e) {
      toast({ title: 'Not removed', description: (e as Error).message, variant: 'destructive' });
    }
  };

  const kinds: { value: CashOwnerItem['kind']; label: string; dir: 'in' | 'out' | 'both' }[] = [
    { value: 'recurring', label: 'Regular cost', dir: 'out' },
    { value: 'retention', label: 'Retention release', dir: 'in' },
    { value: 'stage', label: 'Stage payment', dir: 'in' },
    { value: 'other', label: 'Other', dir: 'both' },
  ];

  return (
    <FormSheet
      open={!!item}
      onOpenChange={(o) => !o && onClose()}
      width="wide"
      eyebrow="Cash forecast"
      title={d.id ? 'Edit' : 'Add money in or out'}
      footer={
        <div className="flex gap-2">
          {d.id ? (
            <SecondaryButton fullWidth onClick={remove} disabled={del.isPending}>
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </SecondaryButton>
          ) : (
            <SecondaryButton fullWidth onClick={onClose}>
              Cancel
            </SecondaryButton>
          )}
          <PrimaryButton fullWidth onClick={submit} disabled={save.isPending}>
            {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
          </PrimaryButton>
        </div>
      }
      bodyClassName="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 items-start"
    >
      <FormCard eyebrow="What it is">
        <div className="grid grid-cols-2 gap-2">
          {(['out', 'in'] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              aria-pressed={d.direction === dir}
              onClick={() =>
                setD((p) => ({
                  ...p,
                  direction: dir,
                  kind:
                    dir === 'in'
                      ? p.kind === 'recurring'
                        ? 'retention'
                        : p.kind
                      : p.kind === 'retention' || p.kind === 'stage'
                        ? 'recurring'
                        : p.kind,
                }))
              }
              className={cn(
                'h-11 rounded-full border text-[13px] touch-manipulation',
                d.direction === dir ? chipOn : chipOff
              )}
            >
              {dir === 'out' ? 'Money out' : 'Money in'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {kinds
            .filter((k) => k.dir === 'both' || k.dir === d.direction)
            .map((k) => (
              <button
                key={k.value}
                type="button"
                aria-pressed={d.kind === k.value}
                onClick={() => setD((p) => ({ ...p, kind: k.value }))}
                className={cn(
                  'min-h-11 rounded-2xl border px-3 py-2 text-[12.5px] touch-manipulation',
                  d.kind === k.value ? chipOn : chipOff
                )}
              >
                {k.label}
              </button>
            ))}
        </div>
        <FormGrid cols={2}>
          <Field label="Name">
            <Input
              value={d.label ?? ''}
              onChange={(e) => setD((p) => ({ ...p, label: e.target.value }))}
              placeholder={d.direction === 'in' ? 'Retention, Hill Street' : 'Unit rent'}
              className={inputClass}
            />
          </Field>
          <Field label="Amount (£)">
            <Input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={inputClass}
            />
          </Field>
        </FormGrid>
      </FormCard>
      <FormCard eyebrow="When">
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              ['none', 'Once'],
              ['weekly', 'Every week'],
              ['monthly', 'Every month'],
              ['quarterly', 'Every quarter'],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              type="button"
              aria-pressed={(d.repeat ?? 'none') === val}
              onClick={() => setD((p) => ({ ...p, repeat: val }))}
              className={cn(
                'h-11 rounded-full border text-[13px] touch-manipulation',
                (d.repeat ?? 'none') === val ? chipOn : chipOff
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <FormGrid cols={2}>
          <Field label={(d.repeat ?? 'none') === 'none' ? 'Date' : 'First date'}>
            <Input
              type="date"
              value={d.first_date ?? ''}
              onChange={(e) => setD((p) => ({ ...p, first_date: e.target.value }))}
              className={inputClass}
            />
          </Field>
          {(d.repeat ?? 'none') !== 'none' && (
            <Field label="Until" hint="Optional">
              <Input
                type="date"
                value={d.end_date ?? ''}
                onChange={(e) => setD((p) => ({ ...p, end_date: e.target.value || null }))}
                className={inputClass}
              />
            </Field>
          )}
        </FormGrid>
      </FormCard>
    </FormSheet>
  );
}

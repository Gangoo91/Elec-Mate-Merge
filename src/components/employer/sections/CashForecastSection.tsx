/**
 * Finance › Cash forecast as its own page (10 Oct 2026, Andrew: "the cash
 * forecast page should be its own page not a draw up… make it excellent").
 *
 * Same figures and settings as before (get_cash_forecast, ELE-2074), laid out
 * as a finance page should be:
 *  - the running total through the eight weeks is the hero: a bold line that
 *    turns red where it dips below £0, with money in and out as quiet bars;
 *  - the weeks as a real table (in, out, net, running total), each opening to
 *    what is in it;
 *  - "Your numbers" in the house form style (underline fields, a compact
 *    choice for VAT quarters), with the small print folded away.
 * Owner and admins only: the RPC refuses anyone else.
 */
import { Fragment, useEffect, useMemo, useState, type FormEvent } from 'react';
import { ChevronDown, Loader2, Plus } from 'lucide-react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';
import { PageFrame, PageHero, LoadingBlocks, PrimaryButton } from '@/components/employer/editorial';
import {
  frameClass,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  Row,
  rowsClass,
  rowBtnSecondary,
} from '@/components/employer/pageParts/PageParts';
import { useOfficeFirmId } from '@/hooks/useFirmPaySettings';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import {
  CASH_KIND_LABEL,
  gbp0,
  lowPointLine,
  useCashForecast,
  useCashOwnerItems,
  useSaveCashSettings,
  type CashForecast,
  type CashOwnerItem,
} from '@/hooks/useCashForecast';
import {
  CashItemSheet,
  VAT_OPTIONS,
  gbp2,
  repeatLabel,
  short,
  todayIso,
} from '@/components/employer/finance/CashForecastSheet';
import { SectionHead, StatCards, areaCard } from '@/components/employer/hubs/AreaPage';
import { matePad } from '@/components/employer/hubs/HubPanels';
import { YELLOW_HEX, WHITE_HEX, chartTick, moneyTick } from '@/components/employer/finance/chartStyle';
import type { Section } from '@/pages/employer/EmployerDashboard';

const RED_HEX = 'rgb(248,113,113)';

/** Signed money: +£120 / −£55. */
const signed = (n: number) => `${n >= 0 ? '+' : '−'}${gbp0(Math.abs(n))}`;

interface WeekLine {
  week: number;
  start: string;
  end: string;
  in: number;
  out: number;
  net: number;
  /** From the bank balance when set, otherwise the running total from today. */
  running: number;
}

function weekLines(f: CashForecast): WeekLine[] {
  let run = f.has_balance ? Number(f.opening_balance) || 0 : 0;
  return f.weeks.map((w) => {
    const inn = Number(w.money_in) || 0;
    const out = Number(w.money_out) || 0;
    const net = inn - out;
    run = f.has_balance ? Number(w.balance) || 0 : run + net;
    return { week: w.week, start: w.start, end: w.end, in: inn, out, net, running: run };
  });
}

export function CashForecastSection({ onNavigate }: { onNavigate?: (s: Section) => void }) {
  const { data: firm } = useOfficeFirmId();
  const { data: f, isLoading, isError, refetch } = useCashForecast(firm, true);
  const { data: owned = [] } = useCashOwnerItems(firm, true);
  const [editing, setEditing] = useState<Partial<CashOwnerItem> | null>(null);

  // Live: a paid invoice, a booking or an order changes the forecast.
  useRealtimeInvalidate(
    'cash-forecast-page',
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
    !!firm
  );

  const lines = useMemo(() => (f ? weekLines(f) : []), [f]);
  const addItem = () =>
    setEditing({ direction: 'out', kind: 'recurring', repeat: 'monthly', first_date: todayIso() });

  if (isLoading) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Cash forecast" description="Working out the next 8 weeks." />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  if (isError || !f) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Cash forecast" description="The forecast is for the owner and admins." />
        <div className={cn(areaCard, 'px-4 py-5 sm:px-5')}>
          <p className="text-[14px] text-white">
            The forecast did not load. It is only open to the firm owner and admins.
          </p>
          <button type="button" onClick={() => refetch()} className={cn(rowBtnSecondary, 'mt-3')}>
            Try again
          </button>
        </div>
      </PageFrame>
    );
  }

  const endRun = lines.length ? lines[lines.length - 1].running : 0;
  const lowest = lines.reduce<WeekLine | null>((m, l) => (!m || l.running < m.running ? l : m), null);
  const low = lowPointLine(f);

  return (
    <PageFrame className={cn(frameClass, matePad)}>
      <PageHero
        title="Cash forecast"
        description={
          low ??
          'The next 8 weeks of money in and out, from your invoices, bookings, timesheets, CIS, VAT and bills.'
        }
        actions={
          <HeroActions>
            <HeroPrimary onClick={addItem}>Add money in or out</HeroPrimary>
            {onNavigate && (
              <HeroSecondary onClick={() => onNavigate('quotes')}>Quotes & invoices</HeroSecondary>
            )}
          </HeroActions>
        }
      />

      <StatCards
        stats={[
          {
            label: 'In the bank',
            value: f.has_balance ? gbp0(f.opening_balance) : 'Not set',
            sub:
              f.has_balance && f.balance_on
                ? `On ${short(f.balance_on)}`
                : 'Add it under Your numbers to see your balance',
          },
          { label: 'Coming in', value: gbp0(f.totals.money_in), sub: 'Next 8 weeks' },
          { label: 'Going out', value: gbp0(f.totals.money_out), sub: 'Next 8 weeks' },
          {
            label: f.has_balance ? 'In 8 weeks' : 'Net, 8 weeks',
            value: f.has_balance ? gbp0(endRun) : signed(endRun),
            sub: lowest ? `Lowest in week ${lowest.week}, ${short(lowest.start)}` : undefined,
            tone: endRun < 0 ? 'red' : undefined,
          },
        ]}
      />

      <section>
        <SectionHead
          title={f.has_balance ? 'Your balance' : 'Running total'}
          meta={f.has_balance ? 'Next 8 weeks, from your bank balance' : 'Next 8 weeks, from today'}
        />
        <div className={cn(areaCard, 'px-2 pb-4 pt-5 sm:px-4')}>
          <ForecastChart lines={lines} hasBalance={f.has_balance} />
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 px-2">
            <Key line text={f.has_balance ? 'Balance' : 'Running total'} />
            <Key cls="bg-elec-yellow" text="Coming in" />
            <Key cls="bg-white/60" text="Going out" />
            <Key dashed text="£0" />
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-start">
        <section className="min-w-0">
          <SectionHead title="Week by week" meta="Tap a week for what is in it" />
          <WeekTable f={f} lines={lines} />
          <HowWorkedOut f={f} />
        </section>

        <div className="min-w-0 space-y-8">
          {f.low && (
            <section>
              <SectionHead title="What drives the low point" meta={`Week ${f.low.week}`} />
              <div className={cn(areaCard, 'overflow-hidden')}>
                {f.low.drivers.length === 0 ? (
                  <p className="px-4 py-4 text-[14px] text-white sm:px-5">Nothing goes out that week.</p>
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

          <NumbersCard firm={firm} f={f} />

          <section>
            <SectionHead
              title="Things only you know"
              meta={owned.length > 0 ? `${owned.length}` : undefined}
              action="Add"
              onAction={addItem}
            />
            <div className={cn(areaCard, 'overflow-hidden')}>
              {owned.length === 0 ? (
                <div className="px-4 py-4 sm:px-5">
                  <p className="text-[14px] leading-relaxed text-white">
                    Rent, van finance, insurance, retention releases and stage payments the app cannot
                    see.
                  </p>
                  <button type="button" onClick={addItem} className={cn(rowBtnSecondary, 'mt-3')}>
                    <Plus className="h-4 w-4" />
                    Add money in or out
                  </button>
                </div>
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
            </div>
          </section>
        </div>
      </div>

      <CashItemSheet firm={firm} item={editing} onClose={() => setEditing(null)} />
    </PageFrame>
  );
}

/* ── Chart ──────────────────────────────────────────────────────────── */

function Key({ cls, text, line, dashed }: { cls?: string; text: string; line?: boolean; dashed?: boolean }) {
  return (
    <span className="flex items-center gap-2 text-[12.5px] text-white">
      {line ? (
        <span className="h-[3px] w-5 rounded-full bg-white" />
      ) : dashed ? (
        <span className="w-5 border-t border-dashed border-red-400" />
      ) : (
        <span className={cn('h-2.5 w-2.5 rounded-[3px]', cls)} />
      )}
      {text}
    </span>
  );
}

interface Point extends WeekLine {
  label: string;
  outNeg: number;
}

function Tip({ active, payload, hasBalance }: { active?: boolean; payload?: { payload: Point }[]; hasBalance: boolean }) {
  const p = active && payload?.[0]?.payload;
  if (!p) return null;
  return (
    <div className="min-w-[190px] rounded-xl border border-white/[0.12] bg-[hsl(0_0%_11%)] px-3.5 py-3 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.8)]">
      <p className="text-[12.5px] font-semibold text-white">
        Week {p.week}, {short(p.start)} to {short(p.end)}
      </p>
      <div className="mt-2 space-y-1 text-[12.5px] tabular-nums text-white">
        <p className="flex justify-between gap-4">
          <span>Coming in</span>
          <span>{gbp0(p.in)}</span>
        </p>
        <p className="flex justify-between gap-4">
          <span>Going out</span>
          <span>{gbp0(p.out)}</span>
        </p>
        <p className={cn('flex justify-between gap-4 font-semibold', p.net < 0 && 'text-red-400')}>
          <span>Net</span>
          <span>{signed(p.net)}</span>
        </p>
        <p
          className={cn(
            'flex justify-between gap-4 border-t border-white/[0.1] pt-1 font-semibold',
            p.running < 0 && 'text-red-400'
          )}
        >
          <span>{hasBalance ? 'Balance' : 'Running total'}</span>
          <span>{hasBalance ? gbp0(p.running) : signed(p.running)}</span>
        </p>
      </div>
    </div>
  );
}

/** A dot on the running line: white above £0, red below. */
function RunDot(props: { cx?: number; cy?: number; payload?: Point }) {
  const { cx, cy, payload } = props;
  if (cx == null || cy == null || !payload) return null;
  const below = payload.running < 0;
  return (
    <circle cx={cx} cy={cy} r={4.5} fill={below ? RED_HEX : WHITE_HEX} stroke="hsl(0 0% 12%)" strokeWidth={2} />
  );
}

/**
 * The running total (or balance) is the story: a bold line with a dot per
 * week, red where it is below £0. Money in sits above the axis in yellow and
 * money out below it in soft white, so a week's push and pull read at a glance.
 */
function ForecastChart({ lines, hasBalance }: { lines: WeekLine[]; hasBalance: boolean }) {
  // A phone has room for week numbers, not eight dates; the tip and table give dates.
  const narrow = useIsMobile();
  const data: Point[] = lines.map((l) => ({
    ...l,
    label: narrow ? `W${l.week}` : short(l.start),
    outNeg: -l.out,
  }));
  return (
    <div className="h-[280px] sm:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 0 }} barGap={0} barCategoryGap="38%" stackOffset="sign">
          <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.07)" strokeDasharray="3 4" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={chartTick} tickMargin={10} interval={0} />
          <YAxis
            width={56}
            tickLine={false}
            axisLine={false}
            tick={chartTick}
            tickCount={5}
            tickFormatter={(v: number) => (v < 0 ? `−${moneyTick(-v)}` : moneyTick(v))}
          />
          <ReferenceLine y={0} stroke={RED_HEX} strokeOpacity={0.7} strokeDasharray="5 5" />
          <Tooltip content={<Tip hasBalance={hasBalance} />} cursor={{ fill: 'rgba(255,255,255,0.05)', radius: 8 }} />
          <Bar dataKey="in" stackId="flow" fill={YELLOW_HEX} radius={[5, 5, 0, 0]} maxBarSize={28} isAnimationActive={false} />
          <Bar dataKey="outNeg" stackId="flow" fill="rgba(255,255,255,0.55)" radius={[0, 0, 5, 5]} maxBarSize={28} isAnimationActive={false} />
          <Line
            type="monotone"
            dataKey="running"
            stroke={WHITE_HEX}
            strokeWidth={3}
            dot={<RunDot />}
            activeDot={{ r: 6, fill: WHITE_HEX }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ── Week table ─────────────────────────────────────────────────────── */

function WeekTable({ f, lines }: { f: CashForecast; lines: WeekLine[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const lowWeek = lines.reduce<WeekLine | null>((m, l) => (!m || l.running < m.running ? l : m), null)?.week;
  const cols =
    'grid grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))_28px] items-center gap-3 px-4 sm:px-5';
  return (
    <div className={cn(areaCard, 'overflow-hidden')}>
      {/* Column heads: desktop and tablet */}
      <div className={cn(cols, 'hidden h-11 border-b border-white/[0.08] text-[12.5px] font-medium text-white sm:grid')}>
        <span>Week</span>
        <span className="text-right">In</span>
        <span className="text-right">Out</span>
        <span className="text-right">Net</span>
        <span className="text-right">{f.has_balance ? 'Balance' : 'Running'}</span>
        <span />
      </div>
      <div className={rowsClass}>
        {lines.map((l) => {
          const isOpen = open === l.week;
          const items = f.items.filter((i) => i.week === l.week);
          return (
            <Fragment key={l.week}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : l.week)}
                aria-expanded={isOpen}
                className="block w-full text-left touch-manipulation transition-colors hover:bg-white/[0.04]"
              >
                {/* Desktop row */}
                <div className={cn(cols, 'hidden min-h-[56px] py-2 sm:grid')}>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-[14.5px] font-semibold text-white">
                      Week {l.week}
                      {l.week === lowWeek && (
                        <span className="rounded-full border border-white/[0.18] px-2 py-0.5 text-[11px] font-semibold text-white">
                          Lowest
                        </span>
                      )}
                    </span>
                    <span className="block text-[12.5px] text-white">
                      {short(l.start)} to {short(l.end)}
                    </span>
                  </span>
                  <span className="text-right text-[14px] tabular-nums text-white">{gbp0(l.in)}</span>
                  <span className="text-right text-[14px] tabular-nums text-white">{gbp0(l.out)}</span>
                  <span className={cn('text-right text-[14px] font-semibold tabular-nums', l.net < 0 ? 'text-red-400' : 'text-white')}>
                    {signed(l.net)}
                  </span>
                  <span className={cn('text-right text-[14px] font-semibold tabular-nums', l.running < 0 ? 'text-red-400' : 'text-white')}>
                    {f.has_balance ? gbp0(l.running) : signed(l.running)}
                  </span>
                  <ChevronDown className={cn('h-4 w-4 justify-self-end text-white transition-transform', isOpen && 'rotate-180')} />
                </div>
                {/* Phone row */}
                <div className="flex min-h-[60px] items-center gap-3 px-4 py-3 sm:hidden">
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14.5px] font-semibold text-white">
                      Week {l.week} · {short(l.start)}
                    </span>
                    <span className="block text-[12.5px] tabular-nums text-white">
                      In {gbp0(l.in)} · out {gbp0(l.out)}
                    </span>
                  </span>
                  <span className="text-right">
                    <span className={cn('block text-[14.5px] font-semibold tabular-nums', l.running < 0 ? 'text-red-400' : 'text-white')}>
                      {f.has_balance ? gbp0(l.running) : signed(l.running)}
                    </span>
                    <span className={cn('block text-[12px] tabular-nums', l.net < 0 ? 'text-red-400' : 'text-white')}>
                      {signed(l.net)} this week
                    </span>
                  </span>
                </div>
              </button>
              {isOpen && (
                <div className="border-t border-white/[0.07] bg-white/[0.025]">
                  {items.length === 0 ? (
                    <p className="px-4 py-3 text-[13px] text-white sm:px-5">Nothing expected this week.</p>
                  ) : (
                    <ul className={rowsClass}>
                      {items.map((i, n) => (
                        <li key={`${i.kind}-${i.date}-${n}`} className="flex items-start justify-between gap-3 px-4 py-2.5 sm:px-5">
                          <span className="min-w-0">
                            <span className="block break-words text-[14px] font-medium text-white">{i.label}</span>
                            <span className="block text-[12px] text-white">
                              {CASH_KIND_LABEL[i.kind]} · {i.late ? `was ${short(i.date)}, late` : short(i.date)}
                              {i.note ? ` · ${i.note}` : ''}
                            </span>
                          </span>
                          <span
                            className={cn(
                              'shrink-0 text-[14px] font-semibold tabular-nums',
                              i.direction === 'in' ? 'text-elec-yellow' : 'text-white'
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
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

function HowWorkedOut({ f }: { f: CashForecast }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex h-11 items-center gap-1.5 text-[13.5px] font-semibold text-elec-yellow touch-manipulation"
      >
        How this is worked out
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          An estimate, not your bank. Invoices land on their due date, moved by how late that customer
          usually pays. Wages use the last 4 weeks of approved timesheets at cost (
          {gbp2(Number(f.assumptions.labour_weekly))} a week, paid{' '}
          {f.assumptions.pay_frequency.replace('_', ' ')}). Subcontractors are paid net of CIS, and the CIS
          goes to HMRC on the 22nd. Invoices with CIS count what the customer pays after the deduction.
          Supplier bills fall due {f.assumptions.supplier_terms_days} days after the order; ones already
          past that are taken as paid. Things you add count from the day after your bank balance, so
          nothing already in it is counted twice.
        </p>
      )}
    </div>
  );
}

/* ── Your numbers ───────────────────────────────────────────────────── */

const fieldCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 ' +
  'text-base font-medium text-white placeholder:text-white/40 caret-elec-yellow transition-colors ' +
  'hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus-visible:ring-0 touch-manipulation';

function NumbersCard({ firm, f }: { firm: string | null | undefined; f: CashForecast }) {
  const save = useSaveCashSettings();
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
      toast({ title: 'Check the supplier terms', description: 'Between 0 and 120 days.', variant: 'destructive' });
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
    } catch (err) {
      toast({ title: 'Not saved', description: (err as Error).message, variant: 'destructive' });
    }
  };

  return (
    <section>
      <SectionHead title="Your numbers" meta="What the app cannot see" />
      <form onSubmit={submit} className={cn(areaCard, 'space-y-5 px-4 py-4 sm:px-5 sm:py-5')}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-[12.5px] font-medium text-white">In the bank today</span>
            <span className="flex items-center gap-1">
              <span className="text-base font-medium text-white">£</span>
              <input
                type="number"
                inputMode="decimal"
                step="0.01"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="e.g. 4250"
                className={fieldCn}
              />
            </span>
            <span className="mt-1.5 block text-[12px] text-white">Leave empty to see money in and out only.</span>
          </label>
          <label className="block">
            <span className="mb-1 block text-[12.5px] font-medium text-white">Supplier terms</span>
            <span className="flex items-center gap-2">
              <input
                type="number"
                inputMode="numeric"
                min="0"
                max="120"
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                className={fieldCn}
              />
              <span className="shrink-0 text-[14px] text-white">days</span>
            </span>
          </label>
        </div>

        <fieldset>
          <legend className="mb-2 text-[12.5px] font-medium text-white">VAT quarters end in</legend>
          <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-white/[0.12]">
            {VAT_OPTIONS.map((o, i) => {
              const on = vat === o.value;
              return (
                <button
                  key={String(o.value)}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setVat(o.value)}
                  className={cn(
                    'flex min-h-11 items-center gap-2 px-3 py-2 text-left text-[13px] touch-manipulation transition-colors',
                    i % 2 === 1 && 'border-l border-white/[0.12]',
                    i >= 2 && 'border-t border-white/[0.12]',
                    on ? 'bg-white text-black font-semibold' : 'text-white hover:bg-white/[0.05]'
                  )}
                >
                  <span
                    aria-hidden
                    className={cn('h-2 w-2 shrink-0 rounded-full', on ? 'bg-elec-yellow ring-2 ring-black/20' : 'bg-white/30')}
                  />
                  {o.label}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-white">
            VAT is due 1 month and 7 days after the quarter ends: the VAT on your invoices less the VAT on your
            purchase orders.
          </p>
        </fieldset>

        <div className="flex justify-end border-t border-white/[0.08] pt-4">
          <PrimaryButton type="submit" disabled={save.isPending} className="px-6">
            {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save your numbers'}
          </PrimaryButton>
        </div>
      </form>
    </section>
  );
}

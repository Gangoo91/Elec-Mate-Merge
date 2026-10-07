import { useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, RefreshCw, Search, Upload } from 'lucide-react';
import { PageFrame, PageHero, StatStrip, IconButton } from '@/components/employer/editorial';
import { PageHelpButton, HowItWorks, type PageHelpContent, type HelpBlocker } from '@/components/hub/PageHelp';
import {
  inputCn,
  labelCn,
  cardCn,
  grid2Cn,
  chipBase,
  chipOn,
  chipOff,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { useSuppliers } from '@/hooks/useFinance';
import {
  useFirmPriceBook,
  useActingFirmId,
  gbp,
  daysSince,
  PRICE_BOOK_STALE_DAYS,
  type FirmPriceBookItem,
} from '@/hooks/useFirmPriceBook';
import { EditPriceBookItemSheet } from '../dialogs/EditPriceBookItemSheet';
import { ImportPriceBookDialog } from '../dialogs/ImportPriceBookDialog';

/* ==========================================================================
   Price book (ELE-1991) — ONE list for the firm.

   It is the owner's Electrical Hub price book (materials_lists), not a copy:
   an item added here shows there and the other way round. Quotes, purchase
   orders and van stock read it. Stock levels live with van stock, not here.

   Office managers see names and sell prices; buy price, markup and the last
   price paid are owner/admin only — the database returns them as null.
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'employer-price-book',
  title: 'The price book',
  what: (
    <>
      One price list for the whole firm. It is the same list the owner keeps in the Electrical
      Hub, so a price changed here is changed there too. Quotes, purchase orders and van stock all
      use it.
    </>
  ),
  steps: [
    { title: 'Add what you buy and sell', body: 'Add items one by one, import a merchant price list, or save lines from a quote in the Electrical Hub.' },
    { title: 'Set buy, markup and sell', body: 'Give a buy price and markup and the sell price works itself out. Quotes use the sell price.' },
    { title: 'Keep it honest', body: 'When a supplier invoice is matched to an order, the price you actually paid shows against the item, so you spot price rises.' },
  ],
  notes: [
    { title: 'Who sees what', body: 'Office managers see sell prices only. Buy prices, markup and what you paid are for the owner and admins.' },
    { title: 'Labour rates', body: 'Your day and hourly rates sit under Labour & markup. They feed quotes and job profit.' },
  ],
  tasks: [
    {
      title: 'Add an item',
      steps: [
        'On the Items tab, tap Add item.',
        'Give it a name, the unit it is sold by, a category and the usual supplier.',
        'Enter the Buy price (£) and Markup (%), and the sell price works itself out. Or type the Sell price (£) straight in.',
        'Tap Add to price book.',
      ],
      tour: [
        { target: 'pricebook.tabs', text: 'Items', caption: 'Start on the Items tab.', opens: true },
        { target: 'pricebook.add', caption: 'Tap Add item to add something you buy or fit.' },
      ],
    },
    {
      title: 'Import a merchant price list',
      steps: [
        'Tap Import.',
        'Choose a CSV or Excel file. Columns are matched by their headings: name or description, price, unit, category and supplier.',
        'Check the rows it found, then tap Import … items.',
      ],
      after: 'Items already in the book get the new price. The rest are added.',
      tour: [
        { target: 'pricebook.tabs', text: 'Items', caption: 'Start on the Items tab.', opens: true },
        { target: 'pricebook.import', caption: 'Tap Import and pick your CSV or Excel price list.' },
      ],
    },
    {
      title: 'Fix the items that need a check',
      steps: [
        'Tap Needs a check. It lists items with no sell price, prices over 60 days old, or a last paid price above the book.',
        'Tap an item and update the price.',
        'Tap Save changes.',
      ],
      tour: [
        { target: 'pricebook.check', caption: 'Tap Needs a check to see items that are unpriced or out of date.' },
        { target: 'pricebook.list', caption: 'Tap an item to update its price.', optional: true },
      ],
    },
    {
      title: 'Use it in a quote',
      steps: [
        'Go to Quotes & Invoices and tap New quote.',
        'Tap Pick from … price-book items and choose the lines.',
        'They come in at the sell price. Purchase orders use the buy price.',
      ],
    },
    {
      title: 'Set your labour rates and markup',
      steps: [
        'Tap the Labour & markup tab.',
        'Enter your Day rate (£), Hourly rate (£) and default Markup (%).',
        'Tap Save rates.',
      ],
      after: 'The default markup is used when an item has no markup of its own.',
      who: 'Only the owner can change the rates. Others see them.',
      tour: [
        { target: 'pricebook.tabs', text: 'Labour', caption: 'Tap Labour & markup.', opens: true },
        { target: 'pricebook.save-rates', caption: 'Enter your rates, then tap Save rates.', optional: true },
      ],
    },
  ],
};

type Tab = 'items' | 'rates';
type Filter = 'all' | 'attention';
const ALL = 'All';
const PAGE = 60;

/** Edge-to-edge on a phone, inset card from sm: up. */
const listCardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] overflow-hidden';

function needsAttention(i: FirmPriceBookItem) {
  if (i.sell_price == null) return true;
  const age = daysSince(i.price_updated_at);
  if (age != null && age > PRICE_BOOK_STALE_DAYS) return true;
  if (i.last_paid_price != null && i.buy_price != null && i.last_paid_price > i.buy_price * 1.02) return true;
  return false;
}

function attentionReason(i: FirmPriceBookItem): string | null {
  if (i.sell_price == null) return 'No sell price';
  if (i.last_paid_price != null && i.buy_price != null && i.last_paid_price > i.buy_price * 1.02) {
    return `Paid ${gbp(i.last_paid_price)}`;
  }
  const age = daysSince(i.price_updated_at);
  if (age != null && age > PRICE_BOOK_STALE_DAYS) return `${age} days old`;
  return null;
}

export function PriceBookSection() {
  const qc = useQueryClient();
  const { data: role } = useEmployerRole();
  const moneyVisible = role?.canSeeMoney ?? false;
  const isOwner = role?.role === 'owner';
  const { data: firmId } = useActingFirmId();
  const { data: items = [], isLoading, isError, refetch, isFetching } = useFirmPriceBook();
  const { data: suppliers = [] } = useSuppliers();

  const [tab, setTab] = useState<Tab>('items');
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(ALL);
  const [limit, setLimit] = useState(PAGE);
  const [editing, setEditing] = useState<FirmPriceBookItem | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showImport, setShowImport] = useState(false);

  // The firm's rates live on the OWNER's company profile.
  const { data: rates } = useQuery({
    queryKey: ['firm-rates', firmId],
    enabled: !!firmId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('company_profiles')
        .select('day_rate, hourly_rate, markup')
        .eq('user_id', firmId as string)
        .maybeSingle();
      if (error) throw error;
      return (data ?? null) as { day_rate: number | null; hourly_rate: number | null; markup: number | null } | null;
    },
  });
  const defaultMarkup = rates?.markup != null && rates.markup > 0 ? Number(rates.markup) : 30;

  const [dayRate, setDayRate] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [markup, setMarkup] = useState('');
  const [savingRates, setSavingRates] = useState(false);
  useEffect(() => {
    setDayRate(rates?.day_rate != null ? String(rates.day_rate) : '');
    setHourlyRate(rates?.hourly_rate != null ? String(rates.hourly_rate) : '');
    setMarkup(rates?.markup != null ? String(rates.markup) : '');
  }, [rates]);

  const saveRates = async () => {
    if (!isOwner || !firmId) return;
    setSavingRates(true);
    const n = (v: string) => (v.trim() === '' ? null : Number(v));
    const { error } = await supabase
      .from('company_profiles')
      .update({ day_rate: n(dayRate), hourly_rate: n(hourlyRate), markup: n(markup) } as never)
      .eq('user_id', firmId);
    setSavingRates(false);
    if (error) {
      toast.error('Could not save your rates. Try again.');
      return;
    }
    qc.invalidateQueries({ queryKey: ['firm-rates'] });
    qc.invalidateQueries({ queryKey: ['company-profile'] });
    toast.success('Rates saved');
  };

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const i of items) counts.set(i.category, (counts.get(i.category) ?? 0) + 1);
    return [ALL, ...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c)];
  }, [items]);

  const stats = useMemo(() => {
    const priced = items.filter((i) => i.sell_price != null).length;
    const attention = items.filter(needsAttention).length;
    const paidMore = items.filter(
      (i) => i.last_paid_price != null && i.buy_price != null && i.last_paid_price > i.buy_price * 1.02
    ).length;
    const withBuy = items.filter((i) => i.buy_price != null && i.markup_percent != null);
    const avgMarkup = withBuy.length
      ? Math.round(withBuy.reduce((s, i) => s + (i.markup_percent ?? 0), 0) / withBuy.length)
      : null;
    return { priced, attention, paidMore, avgMarkup };
  }, [items]);

  const filtered = useMemo(() => {
    const words = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter(
      (i) =>
        (filter === 'all' || needsAttention(i)) &&
        (category === ALL || i.category === category) &&
        words.every((w) => `${i.name} ${i.supplier ?? ''} ${i.category}`.toLowerCase().includes(w))
    );
  }, [items, search, category, filter]);

  useEffect(() => setLimit(PAGE), [search, category, filter]);

  const openNew = () => {
    setEditing(null);
    setShowEdit(true);
  };

  // Live "Before you start" lines for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] = [];
  if (!isLoading && !isError && items.length === 0) {
    helpBlockers.push({
      text: 'Nothing in the price book yet, so quotes and orders have no prices to pull in.',
      fixLabel: 'Import a price list',
      onFix: () => {
        setTab('items');
        setShowImport(true);
      },
    });
  }
  if (isOwner && rates !== undefined && rates?.day_rate == null && rates?.hourly_rate == null) {
    helpBlockers.push({
      text: 'No labour rates set, so quotes and job profit have no rate for your time.',
      fixLabel: 'Set your rates',
      onFix: () => setTab('rates'),
    });
  }
  const openItem = (i: FirmPriceBookItem) => {
    setEditing(i);
    setShowEdit(true);
  };

  return (
    <PageFrame>
      <PageHero
        eyebrow="Money"
        title="Price book"
        description="One price list for quotes and orders, shared with your Electrical Hub price book."
        tone="amber"
        actions={
          <>
            <PageHelpButton help={HELP} blockers={helpBlockers} askContext={{ page: 'pricebook', tab }} />
            <IconButton onClick={() => refetch()} aria-label="Refresh">
              <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
            </IconButton>
          </>
        }
      />

      <HowItWorks help={HELP} blockers={helpBlockers} askContext={{ page: 'pricebook', tab }} />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Items', value: items.length.toLocaleString(), tone: 'amber' },
          { label: 'With a sell price', value: stats.priced.toLocaleString(), tone: 'emerald' },
          {
            label: 'Need a check',
            value: stats.attention.toLocaleString(),
            tone: stats.attention > 0 ? 'orange' : 'emerald',
            onClick: () => {
              setTab('items');
              setFilter('attention');
            },
          },
          moneyVisible
            ? {
                label: stats.paidMore > 0 ? 'Paid above book' : 'Average markup',
                value:
                  stats.paidMore > 0
                    ? stats.paidMore.toLocaleString()
                    : stats.avgMarkup != null
                      ? `${stats.avgMarkup}%`
                      : '—',
                tone: stats.paidMore > 0 ? 'red' : 'blue',
              }
            : { label: 'Categories', value: Math.max(0, categories.length - 1), tone: 'blue' },
        ]}
      />

      <div className="flex gap-2" role="tablist" aria-label="Price book" data-help="pricebook.tabs">
        {(
          [
            ['items', 'Items'],
            ['rates', moneyVisible ? 'Labour & markup' : 'Labour rates'],
          ] as const
        ).map(([v, label]) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={tab === v}
            onClick={() => setTab(v)}
            className={cn(chipBase, 'rounded-full px-5 text-[14px]', tab === v ? chipOn : chipOff)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'items' ? (
        <section className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search items or suppliers"
                aria-label="Search the price book"
                className={cn(inputCn, 'pl-7')}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 lg:flex">
              <button
                type="button"
                data-help="pricebook.import"
                onClick={() => setShowImport(true)}
                className={cn(buttonSecondaryCn, 'inline-flex items-center justify-center gap-2 px-4')}
              >
                <Upload className="h-4 w-4" aria-hidden /> Import
              </button>
              <button
                type="button"
                data-help="pricebook.add"
                onClick={openNew}
                className={cn(buttonPrimaryCn, 'inline-flex items-center justify-center gap-2 px-5')}
              >
                <Plus className="h-4 w-4" aria-hidden /> Add item
              </button>
            </div>
          </div>

          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar sm:mx-0 sm:flex-wrap sm:px-0">
            <button
              type="button"
              data-help="pricebook.check"
              onClick={() => setFilter(filter === 'attention' ? 'all' : 'attention')}
              className={cn(chipBase, 'shrink-0 whitespace-nowrap rounded-full px-4 text-[13px]', filter === 'attention' ? chipOn : chipOff)}
            >
              Needs a check · {stats.attention}
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(chipBase, 'shrink-0 whitespace-nowrap rounded-full px-4 text-[13px]', category === c ? chipOn : chipOff)}
              >
                {c}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 animate-pulse rounded-xl bg-white/[0.05]" />
              ))}
            </div>
          ) : isError ? (
            <div className={cn(listCardCn, 'p-6 text-center')}>
              <p className="text-[15px] font-semibold text-white">Couldn't load the price book</p>
              <button type="button" onClick={() => refetch()} className="mt-2 h-11 text-[14px] font-semibold text-elec-yellow touch-manipulation">
                Try again
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className={cn(listCardCn, 'p-6 text-center sm:p-10')}>
              <p className="text-[16px] font-semibold text-white">Nothing in the price book yet</p>
              <p className="mx-auto mt-1 max-w-md text-[13px] text-white">
                Add the things you buy and fit most, or import a merchant price list. Lines saved
                from quotes in the Electrical Hub land here too.
              </p>
              <div className="mx-auto mt-4 flex max-w-sm gap-2">
                <button type="button" onClick={() => setShowImport(true)} className={cn(buttonSecondaryCn, 'flex-1 px-4')}>
                  Import
                </button>
                <button type="button" onClick={openNew} className={cn(buttonPrimaryCn, 'flex-1 px-4')}>
                  Add item
                </button>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className={cn(listCardCn, 'p-6 text-center')}>
              <p className="text-[14px] text-white">
                {filter === 'attention' ? 'Every item is priced and up to date.' : 'Nothing matches that search.'}
              </p>
            </div>
          ) : (
            <div className={listCardCn}>
              {/* Desktop column headings */}
              <div
                className={cn(
                  'hidden border-b border-white/[0.1] px-5 py-3 text-[12px] font-semibold text-white lg:grid lg:gap-4',
                  moneyVisible ? 'lg:grid-cols-[minmax(0,2.4fr)_0.9fr_0.7fr_0.9fr_1fr_1.1fr]' : 'lg:grid-cols-[minmax(0,2.6fr)_1fr_1.2fr]'
                )}
              >
                <span>Item</span>
                {moneyVisible && <span className="text-right">Buy</span>}
                {moneyVisible && <span className="text-right">Markup</span>}
                <span className="text-right">Sell</span>
                {moneyVisible && <span className="text-right">Last paid</span>}
                <span className="pl-3">Supplier</span>
              </div>
              <ul className="divide-y divide-white/[0.08]" data-help="pricebook.list">
                {filtered.slice(0, limit).map((i) => {
                  const reason = attentionReason(i);
                  return (
                    <li key={`${i.list_id}-${i.item_id}`}>
                      <button
                        type="button"
                        onClick={() => openItem(i)}
                        className={cn(
                          'grid w-full min-h-[64px] items-center gap-x-4 gap-y-0.5 px-4 py-3 text-left touch-manipulation transition-colors hover:bg-white/[0.04] active:bg-white/[0.06] sm:px-5',
                          'grid-cols-[minmax(0,1fr)_auto]',
                          moneyVisible
                            ? 'lg:grid-cols-[minmax(0,2.4fr)_0.9fr_0.7fr_0.9fr_1fr_1.1fr]'
                            : 'lg:grid-cols-[minmax(0,2.6fr)_1fr_1.2fr]'
                        )}
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-[14.5px] font-medium text-white">{i.name}</span>
                          <span className="block truncate text-[12.5px] text-white">
                            {i.category} · per {i.unit}
                            {moneyVisible && i.buy_price != null ? (
                              <span className="lg:hidden">
                                {' · '}buy {gbp(i.buy_price)}
                                {i.markup_percent != null ? ` +${i.markup_percent}%` : ''}
                              </span>
                            ) : null}
                            {i.supplier ? <span className="lg:hidden"> · {i.supplier}</span> : null}
                          </span>
                          {reason && <span className="mt-0.5 block text-[12px] font-medium text-orange-300">{reason}</span>}
                        </span>
                        {moneyVisible && (
                          <span className="hidden text-right text-[14px] tabular-nums text-white lg:block">{gbp(i.buy_price)}</span>
                        )}
                        {moneyVisible && (
                          <span className="hidden text-right text-[14px] tabular-nums text-white lg:block">
                            {i.markup_percent != null ? `${i.markup_percent}%` : '—'}
                          </span>
                        )}
                        <span className="text-right text-[15px] font-semibold tabular-nums text-elec-yellow">
                          {gbp(i.sell_price)}
                        </span>
                        {moneyVisible && (
                          <span
                            className={cn(
                              'hidden text-right text-[14px] tabular-nums lg:block',
                              i.last_paid_price != null && i.buy_price != null && i.last_paid_price > i.buy_price * 1.02
                                ? 'text-orange-300'
                                : 'text-white'
                            )}
                          >
                            {gbp(i.last_paid_price)}
                          </span>
                        )}
                        <span className="hidden truncate pl-3 text-[14px] text-white lg:block">{i.supplier ?? '—'}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {filtered.length > limit && (
                <div className="border-t border-white/[0.08] p-4">
                  <button type="button" onClick={() => setLimit((l) => l + PAGE)} className={cn(buttonSecondaryCn, 'w-full')}>
                    Show more ({(filtered.length - limit).toLocaleString()} left)
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      ) : (
        <section className="space-y-5 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          <div className={cardCn}>
            <h2 className="text-[15px] font-semibold text-white">Labour rates</h2>
            <p className="text-[13px] text-white">
              What you charge for time. Quotes use them, and job profit costs labour against them.
            </p>
            <div className={grid2Cn}>
              <div>
                <label className={labelCn} htmlFor="rate-day">
                  Day rate (£)
                </label>
                <input
                  id="rate-day"
                  inputMode="decimal"
                  value={dayRate}
                  onChange={(e) => /^\d*\.?\d{0,2}$/.test(e.target.value) && setDayRate(e.target.value)}
                  disabled={!isOwner}
                  placeholder="0.00"
                  className={inputCn}
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="rate-hour">
                  Hourly rate (£)
                </label>
                <input
                  id="rate-hour"
                  inputMode="decimal"
                  value={hourlyRate}
                  onChange={(e) => /^\d*\.?\d{0,2}$/.test(e.target.value) && setHourlyRate(e.target.value)}
                  disabled={!isOwner}
                  placeholder="0.00"
                  className={inputCn}
                />
              </div>
            </div>
          </div>

          {moneyVisible && (
            <div className={cardCn}>
              <h2 className="text-[15px] font-semibold text-white">Default markup</h2>
              <p className="text-[13px] text-white">
                Added to a buy price to give the sell price when an item has no markup of its own.
              </p>
              <div className={grid2Cn}>
                <div>
                  <label className={labelCn} htmlFor="rate-markup">
                    Markup (%)
                  </label>
                  <input
                    id="rate-markup"
                    inputMode="decimal"
                    value={markup}
                    onChange={(e) => /^\d*\.?\d{0,1}$/.test(e.target.value) && setMarkup(e.target.value)}
                    disabled={!isOwner}
                    placeholder="30"
                    className={inputCn}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="lg:col-span-2">
            {isOwner ? (
              <button
                type="button"
                data-help="pricebook.save-rates"
                onClick={saveRates}
                disabled={savingRates}
                className={cn(buttonPrimaryCn, 'w-full px-6 lg:w-auto')}
              >
                {savingRates ? 'Saving…' : 'Save rates'}
              </button>
            ) : (
              <p className="text-[13px] text-white">Only the owner can change the firm's rates.</p>
            )}
          </div>
        </section>
      )}

      <EditPriceBookItemSheet
        item={editing}
        open={showEdit}
        onOpenChange={setShowEdit}
        moneyVisible={moneyVisible}
        defaultMarkup={defaultMarkup}
        suppliers={suppliers}
        categories={categories.filter((c) => c !== ALL)}
      />
      <ImportPriceBookDialog
        open={showImport}
        onOpenChange={setShowImport}
        moneyVisible={moneyVisible}
        defaultMarkup={defaultMarkup}
      />
    </PageFrame>
  );
}

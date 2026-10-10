import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Upload, AlertCircle, Check } from 'lucide-react';
import Papa from 'papaparse';
import { toast } from 'sonner';
import { FormSheet } from '@/components/forms/FormSheet';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  labelCn,
  cardCn,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { Segments, StatusPill, KeyValue, plural } from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import { gbp } from '@/hooks/useFirmPriceBook';
import {
  previewPriceFile,
  useApplyPriceFile,
  wholesalerInfo,
  type ApplyResult,
  type ApplyRow,
  type PreviewRow,
  type PriceFileRow,
  type SupplierConnection,
} from '@/hooks/useWholesalers';

/* ==========================================================================
   Import a wholesaler's account price file (ELE-2066).

   1. Choose the file the branch or trade portal gave you (CSV or Excel).
      Columns are found by their headings; change any that are wrong.
   2. Check: every row is matched to the price book by product code, then
      name; a similar name waits for a person to tick it. Price changes
      against the last file show with their percentage.
   3. Save: the prices are kept, every move is logged, and linked price-book
      items get the new buy price (their sell price follows their markup).
   Quotes already sent are never changed; they get a read-only note.
   ========================================================================== */

type Stage = 'file' | 'review' | 'done';
type Col = 'code' | 'description' | 'price' | 'unit' | 'list';
type View = 'changes' | 'confirm' | 'linked' | 'new';

const NONE = '__none';
const MAX_ROWS = 20000;
const SHOW = 80;

const GUESS: Record<Col, string[]> = {
  code: [
    'product code',
    'prod code',
    'item code',
    'stock code',
    'part',
    'sku',
    'cat no',
    'catalogue',
    'code',
    'ref',
    'item no',
  ],
  description: ['description', 'desc', 'product name', 'name', 'product', 'item'],
  price: [
    'your price',
    'nett',
    'net price',
    'net',
    'trade',
    'account price',
    'cost',
    'buy',
    'unit price',
    'price',
  ],
  unit: ['uom', 'unit of', 'unit', 'per', 'pack'],
  list: ['list', 'rrp', 'retail'],
};

function guessColumns(headers: string[]): Record<Col, string> {
  const used = new Set<string>();
  const out = { code: NONE, description: NONE, price: NONE, unit: NONE, list: NONE } as Record<
    Col,
    string
  >;
  // Price before list, so "list price" is not taken as the trade price.
  for (const col of ['list', 'code', 'description', 'price', 'unit'] as Col[]) {
    for (const p of GUESS[col]) {
      const h = headers.find((x) => !used.has(x) && x.toLowerCase().trim().includes(p));
      if (h) {
        out[col] = h;
        used.add(h);
        break;
      }
    }
  }
  return out;
}

const money = (s: unknown) => {
  const v = parseFloat(String(s ?? '').replace(/[£$,\s]/g, ''));
  return Number.isFinite(v) ? v : NaN;
};

function buildRows(data: Record<string, unknown>[], cols: Record<Col, string>): PriceFileRow[] {
  if (cols.code === NONE || cols.price === NONE) return [];
  const out: PriceFileRow[] = [];
  for (const r of data) {
    const code = String(r[cols.code] ?? '').trim();
    const price = money(r[cols.price]);
    if (!code || !(price > 0) || price >= 1_000_000) continue;
    const list = cols.list !== NONE ? money(r[cols.list]) : NaN;
    out.push({
      code,
      description: cols.description !== NONE ? String(r[cols.description] ?? '').trim() : '',
      unit: cols.unit !== NONE ? String(r[cols.unit] ?? '').trim() || null : null,
      price: Math.round(price * 10000) / 10000,
      list_price: list > 0 ? list : null,
    });
  }
  return out;
}

const pct = (v: number) =>
  `${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v) < 1 ? Math.abs(v).toFixed(1) : Math.round(Math.abs(v))}%`;

export function PriceFileImportSheet({
  open,
  onOpenChange,
  accounts,
  accountId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accounts: SupplierConnection[];
  /** Preselected account. */
  accountId: string | null;
}) {
  const apply = useApplyPriceFile();
  const [stage, setStage] = useState<Stage>('file');
  const [connId, setConnId] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [cols, setCols] = useState<Record<Col, string>>(guessColumns([]));
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [preview, setPreview] = useState<PreviewRow[]>([]);
  const [confirmed, setConfirmed] = useState<Set<number>>(new Set());
  const [addNew, setAddNew] = useState(false);
  const [view, setView] = useState<View>('changes');
  const [limit, setLimit] = useState(SHOW);
  const [result, setResult] = useState<ApplyResult | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Each step opens at its top, not where the last one was scrolled to.
  useEffect(() => {
    topRef.current?.scrollIntoView({ block: 'start' });
  }, [stage]);

  useEffect(() => {
    if (!open) return;
    setStage('file');
    setConnId(accountId ?? accounts[0]?.id ?? '');
    setFileName(null);
    setData([]);
    setHeaders([]);
    setCols(guessColumns([]));
    setError(null);
    setPreview([]);
    setConfirmed(new Set());
    setAddNew(false);
    setResult(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, accountId]);

  const account = accounts.find((a) => a.id === connId) ?? null;
  const rows = useMemo(() => buildRows(data, cols), [data, cols]);

  const takeData = (d: Record<string, unknown>[]) => {
    const hs = d.length
      ? Object.keys(d[0]).filter((h) => h.trim() !== '' && !h.startsWith('__EMPTY'))
      : [];
    if (d.length === 0 || hs.length === 0) {
      setError('That file has no rows with headings.');
      return;
    }
    if (d.length > MAX_ROWS) {
      setError(
        `That file has ${d.length.toLocaleString()} rows. Import up to ${MAX_ROWS.toLocaleString()} at a time.`
      );
      return;
    }
    setHeaders(hs);
    setCols(guessColumns(hs));
    setData(d);
  };

  const parseFile = (file: File) => {
    setError(null);
    setData([]);
    setHeaders([]);
    setFileName(file.name);
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'csv' || ext === 'txt') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (res) => takeData(res.data as Record<string, unknown>[]),
        error: () => setError('That CSV could not be read.'),
      });
    } else if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const XLSX = await import('xlsx');
          const wb = XLSX.read(e.target?.result, { type: 'array' });
          const ws = wb.Sheets[wb.SheetNames[0]];
          takeData(XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: '' }));
        } catch {
          setError('That spreadsheet could not be read.');
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      setError('Choose a CSV or Excel file.');
    }
  };

  const check = async () => {
    if (!account || rows.length === 0) return;
    setChecking(true);
    try {
      const p = await previewPriceFile(account.id, rows);
      setPreview(p);
      setConfirmed(new Set());
      const changes = p.filter((r) => r.change_pct != null && r.change_pct !== 0).length;
      const toConfirm = p.filter((r) => r.match === 'similar').length;
      setView(changes > 0 ? 'changes' : toConfirm > 0 ? 'confirm' : 'linked');
      setLimit(SHOW);
      setStage('review');
    } catch (e) {
      toast.error((e as { message?: string })?.message || 'Could not check the file');
    } finally {
      setChecking(false);
    }
  };

  const groups = useMemo(() => {
    const g = {
      changes: [] as PreviewRow[],
      confirm: [] as PreviewRow[],
      linked: [] as PreviewRow[],
      new: [] as PreviewRow[],
    };
    for (const r of preview) {
      if (r.change_pct != null && r.change_pct !== 0) g.changes.push(r);
      if (r.match === 'similar') g.confirm.push(r);
      else if (r.match) g.linked.push(r);
      else g.new.push(r);
    }
    g.changes.sort((a, b) => Math.abs(b.change_pct ?? 0) - Math.abs(a.change_pct ?? 0));
    return g;
  }, [preview]);

  const alertPct = account?.price_alert_pct ?? 5;
  const bigMoves = groups.changes.filter((r) => Math.abs(r.change_pct ?? 0) >= alertPct).length;
  const willLink = groups.linked.length + confirmed.size;

  const save = async () => {
    if (!account) return;
    const payload: ApplyRow[] = rows.map((r, i) => {
      const p = preview[i];
      const base: ApplyRow = { ...r };
      if (!p?.item_id || !p.match) return { ...base, add: addNew };
      if (p.match === 'linked') return base;
      if (p.match === 'similar') {
        return confirmed.has(i)
          ? { ...base, item_id: p.item_id, match: 'similar' }
          : { ...base, add: addNew };
      }
      return { ...base, item_id: p.item_id, match: p.match };
    });
    try {
      const res = await apply.mutateAsync({ connectionId: account.id, rows: payload, fileName });
      setResult(res);
      setStage('done');
    } catch (e) {
      toast.error((e as { message?: string })?.message || 'Could not save the prices');
    }
  };

  const descFor = (r: PreviewRow) => rows[r.n]?.description || r.item_name || r.code || 'Item';

  const listed = groups[view];

  const footer =
    stage === 'file' ? (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className={cn(buttonSecondaryCn, 'flex-1 px-4')}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={check}
          disabled={!account || rows.length === 0 || checking}
          className={cn(buttonPrimaryCn, 'flex-[2] px-4')}
        >
          {checking
            ? 'Checking…'
            : rows.length > 0
              ? `Check ${plural(rows.length, 'price')}`
              : 'Choose a file'}
        </button>
      </div>
    ) : stage === 'review' ? (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setStage('file')}
          className={cn(buttonSecondaryCn, 'flex-1 px-4')}
        >
          Back
        </button>
        <button
          type="button"
          onClick={save}
          disabled={apply.isPending}
          className={cn(buttonPrimaryCn, 'flex-[2] px-4')}
        >
          {apply.isPending ? 'Saving…' : `Save ${plural(rows.length, 'price')}`}
        </button>
      </div>
    ) : (
      <button
        type="button"
        onClick={() => onOpenChange(false)}
        className={cn(buttonPrimaryCn, 'w-full px-4')}
      >
        Done
      </button>
    );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow={account ? account.display_name : 'Wholesaler prices'}
      title={
        stage === 'done'
          ? 'Prices saved'
          : stage === 'review'
            ? 'Check the prices'
            : 'Import a price file'
      }
      description={
        stage === 'file'
          ? 'The account price list your branch or trade portal gives you, as a CSV or Excel file.'
          : stage === 'review'
            ? `${plural(rows.length, 'price')} from ${fileName ?? 'the file'}. Nothing is saved until you tap Save.`
            : `From ${fileName ?? 'the file'}.`
      }
      bodyClassName="space-y-5 lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:space-y-0"
      footer={footer}
    >
      <div ref={topRef} aria-hidden className="-mb-5 h-0 lg:col-span-2 lg:-mb-8" />
      {stage === 'file' && (
        <>
          <div className="space-y-5">
            <section className={cardCn}>
              <h2 className="text-[15px] font-semibold text-white">The file</h2>
              {accounts.length > 1 && (
                <div>
                  <span className={labelCn}>Wholesaler account</span>
                  <MobileSelectPicker
                    value={connId}
                    onValueChange={setConnId}
                    title="Which account is this file for?"
                    options={accounts.map((a) => ({
                      value: a.id,
                      label: a.display_name,
                      description: a.account_number ? `Account ${a.account_number}` : undefined,
                    }))}
                  />
                </div>
              )}
              <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e: React.DragEvent) => {
                  e.preventDefault();
                  const f = e.dataTransfer.files[0];
                  if (f) parseFile(f);
                }}
                className="flex min-h-[132px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.22] px-4 py-6 text-center touch-manipulation hover:border-elec-yellow"
              >
                <Upload className="h-6 w-6 text-white" aria-hidden />
                <span className="break-all text-[14.5px] font-semibold text-white">
                  {fileName ?? 'Choose a CSV or Excel file'}
                </span>
                <span className="text-[12.5px] text-white">
                  {data.length > 0
                    ? `${data.length.toLocaleString()} rows. Tap to choose another.`
                    : 'It needs a product code and a price column.'}
                </span>
                <input
                  type="file"
                  accept=".csv,.txt,.xlsx,.xls"
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) parseFile(f);
                    e.target.value = '';
                  }}
                />
              </label>
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3.5 py-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" aria-hidden />
                  <p className="text-[13px] text-orange-300">{error}</p>
                </div>
              )}
            </section>

            {headers.length > 0 && (
              <section className={cardCn}>
                <h2 className="text-[15px] font-semibold text-white">Columns</h2>
                <p className="text-[13px] text-white">
                  Found from the headings. Change any that are wrong.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6">
                  {(
                    [
                      ['code', 'Product code'],
                      ['description', 'Description'],
                      ['price', 'Your price (net, each)'],
                      ['unit', 'Unit (optional)'],
                      ['list', 'List price (optional)'],
                    ] as [Col, string][]
                  ).map(([k, label]) => (
                    <div key={k}>
                      <span className={labelCn}>{label}</span>
                      <MobileSelectPicker
                        value={cols[k]}
                        onValueChange={(v) => setCols((c) => ({ ...c, [k]: v }))}
                        title={label}
                        options={[
                          { value: NONE, label: 'Not in this file' },
                          ...headers.map((h) => ({ value: h, label: h })),
                        ]}
                      />
                    </div>
                  ))}
                </div>
                {(cols.code === NONE || cols.price === NONE) && (
                  <p className="text-[13px] font-medium text-orange-300">
                    Pick the product code and price columns to go on.
                  </p>
                )}
              </section>
            )}
          </div>

          <aside className="space-y-5">
            {rows.length > 0 ? (
              <section className={cn(cardCn, 'space-y-3')}>
                <h2 className="text-[15px] font-semibold text-white">
                  {plural(rows.length, 'price')} found
                </h2>
                <ul className="-mx-1 divide-y divide-white/[0.08]">
                  {rows.slice(0, 6).map((r, i) => (
                    <li key={i} className="flex items-center justify-between gap-3 px-1 py-2.5">
                      <span className="min-w-0">
                        <span className="block text-[14px] font-medium leading-snug text-white line-clamp-2">
                          {r.description || r.code}
                        </span>
                        <span className="block truncate text-[12.5px] text-white">
                          {r.code}
                          {r.unit ? ` · per ${r.unit}` : ''}
                        </span>
                      </span>
                      <span className="shrink-0 text-[14px] font-semibold tabular-nums text-white">
                        {gbp(r.price)}
                      </span>
                    </li>
                  ))}
                </ul>
                {rows.length > 6 && (
                  <p className="text-[12.5px] text-white">
                    and {(rows.length - 6).toLocaleString()} more
                  </p>
                )}
              </section>
            ) : (
              <section className={cn(cardCn, 'space-y-3')}>
                <h2 className="text-[15px] font-semibold text-white">Getting the file</h2>
                <p className="text-[13.5px] leading-snug text-white">
                  {wholesalerInfo(account?.wholesaler).prices}
                </p>
                <p className="text-[13.5px] leading-snug text-white">
                  Each new file updates the buy price of items linked to this account, and flags
                  price rises on open quotes. Sent quotes are never changed.
                </p>
              </section>
            )}
          </aside>
        </>
      )}

      {stage === 'review' && (
        <>
          <div className="min-w-0 space-y-4">
            <Segments
              items={[
                { value: 'changes' as View, label: 'Changed', count: groups.changes.length },
                { value: 'confirm' as View, label: 'To check', count: groups.confirm.length },
                { value: 'linked' as View, label: 'Linked', count: groups.linked.length },
                { value: 'new' as View, label: 'Not in book', count: groups.new.length },
              ]}
              value={view}
              onChange={(v) => {
                setView(v);
                setLimit(SHOW);
              }}
            />
            <div className="-mx-4 overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border">
              {listed.length === 0 ? (
                <p className="px-4 py-5 text-[14px] text-white sm:px-5">
                  {view === 'changes'
                    ? account?.price_count
                      ? 'No price has changed since the last file.'
                      : 'This is the first file for this account, so there is nothing to compare yet.'
                    : view === 'confirm'
                      ? 'Nothing needs checking. Every match is by product code or exact name.'
                      : view === 'linked'
                        ? 'No row matched an item in your price book.'
                        : 'Every row matched an item in your price book.'}
                </p>
              ) : (
                <ul className="divide-y divide-white/[0.07]">
                  {listed.slice(0, limit).map((r) => {
                    const on = confirmed.has(r.n);
                    const rise = (r.change_pct ?? 0) > 0;
                    const big = Math.abs(r.change_pct ?? 0) >= alertPct;
                    return (
                      <li
                        key={r.n}
                        className="flex min-h-[64px] items-center gap-3 px-4 py-3 sm:px-5"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-[15px] font-semibold leading-snug text-white line-clamp-2">
                            {descFor(r)}
                          </p>
                          <p className="mt-0.5 text-[13px] text-white">
                            {r.code}
                            {view === 'changes' && r.current_price != null
                              ? ` · ${gbp(r.current_price)} to ${gbp(r.price)}`
                              : ` · ${gbp(r.price)}`}
                            {r.item_name &&
                            view !== 'new' &&
                            (r.match === 'similar' ||
                              r.item_name.trim().toLowerCase() !== descFor(r).trim().toLowerCase())
                              ? ` · ${r.match === 'similar' ? 'close to' : 'your'} ${r.item_name}`
                              : ''}
                          </p>
                        </div>
                        {view === 'confirm' ? (
                          <button
                            type="button"
                            aria-pressed={on}
                            onClick={() =>
                              setConfirmed((s) => {
                                const n = new Set(s);
                                if (n.has(r.n)) n.delete(r.n);
                                else n.add(r.n);
                                return n;
                              })
                            }
                            className={cn(
                              'flex h-11 shrink-0 items-center gap-1.5 rounded-full px-4 text-[13.5px] font-semibold touch-manipulation',
                              on
                                ? 'bg-elec-yellow text-black'
                                : 'border border-white/[0.16] text-white hover:bg-white/[0.06]'
                            )}
                          >
                            {on && <Check className="h-4 w-4" aria-hidden />}
                            {on ? 'Linked' : 'Link'}
                          </button>
                        ) : view === 'changes' && r.change_pct != null ? (
                          <StatusPill tone={big ? (rise ? 'red' : 'green') : 'neutral'}>
                            {pct(r.change_pct)}
                          </StatusPill>
                        ) : view === 'linked' ? (
                          <StatusPill>
                            {r.match === 'code' || r.match === 'linked' ? 'Code' : 'Name'}
                          </StatusPill>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              )}
              {listed.length > limit && (
                <div className="border-t border-white/[0.08] p-3 sm:p-4">
                  <button
                    type="button"
                    onClick={() => setLimit((l) => l + SHOW * 2)}
                    className={cn(buttonSecondaryCn, 'w-full')}
                  >
                    Show more ({(listed.length - limit).toLocaleString()} left)
                  </button>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-5">
            <section className="-mx-4 overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border">
              <div className="flex min-h-[52px] items-center border-b border-white/[0.07] px-4 sm:px-5">
                <h2 className="text-[16px] font-semibold tracking-tight text-white">
                  What will happen
                </h2>
              </div>
              <div className="divide-y divide-white/[0.07]">
                <KeyValue
                  label="Prices saved for this account"
                  value={rows.length.toLocaleString()}
                />
                <KeyValue label="Linked to your price book" value={willLink.toLocaleString()} />
                <KeyValue
                  label={`Moved ${alertPct}% or more`}
                  value={bigMoves.toLocaleString()}
                  tone={bigMoves > 0 ? 'yellow' : undefined}
                />
                <KeyValue
                  label="Not linked to an item"
                  value={(
                    groups.new.length +
                    groups.confirm.length -
                    confirmed.size
                  ).toLocaleString()}
                />
              </div>
            </section>

            <section className={cn(cardCn, 'space-y-3')}>
              <button
                type="button"
                role="switch"
                aria-checked={addNew}
                onClick={() => setAddNew((v) => !v)}
                className="flex min-h-11 w-full items-center justify-between gap-3 text-left touch-manipulation"
              >
                <span className="min-w-0">
                  <span className="block text-[14.5px] font-semibold text-white">
                    Add the rest to the price book
                  </span>
                  <span className="mt-0.5 block text-[12.5px] text-white">
                    {groups.new.length + groups.confirm.length - confirmed.size > 0
                      ? `${plural(groups.new.length + groups.confirm.length - confirmed.size, 'new item')}, at your default markup.`
                      : 'Nothing left to add.'}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'relative h-7 w-12 shrink-0 rounded-full transition-colors',
                    addNew ? 'bg-elec-yellow' : 'bg-white/[0.16]'
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform',
                      addNew ? 'translate-x-[22px] bg-black' : 'translate-x-0.5'
                    )}
                  />
                </span>
              </button>
              <p className="border-t border-white/[0.1] pt-3 text-[13px] leading-snug text-white">
                Linked items get this price as their buy price, and their sell price follows their
                markup. Items you buy from another supplier keep their own price. Sent quotes are
                not changed; they get a note instead.
              </p>
            </section>
          </aside>
        </>
      )}

      {stage === 'done' && result && (
        <>
          <section className="-mx-4 overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border">
            <div className="divide-y divide-white/[0.07]">
              <KeyValue label="Prices saved" value={result.rows.toLocaleString()} tone="green" />
              <KeyValue
                label="Changed since the last file"
                value={result.price_changes.toLocaleString()}
              />
              <KeyValue
                label={`Moved ${alertPct}% or more`}
                value={result.big_moves.toLocaleString()}
                tone={result.big_moves > 0 ? 'yellow' : undefined}
              />
              <KeyValue
                label="Price book buy prices updated"
                value={result.book_updated.toLocaleString()}
              />
              <KeyValue label="Added to the price book" value={result.added.toLocaleString()} />
            </div>
          </section>
          <section className={cn(cardCn, 'space-y-2')}>
            <h2 className="text-[15px] font-semibold text-white">Next</h2>
            <p className="text-[13.5px] leading-snug text-white">
              {result.big_moves > 0
                ? 'Big moves show under Price moves on the Wholesalers tab, with the open quotes they affect.'
                : 'New quotes and purchase orders use these prices now.'}{' '}
              Purchase orders to this account carry the product codes.
            </p>
          </section>
        </>
      )}
    </FormSheet>
  );
}

export default PriceFileImportSheet;

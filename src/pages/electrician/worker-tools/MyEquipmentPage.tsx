/**
 * MyEquipmentPage (ELE-2008 / ELE-1829): the kit on this worker's name or on
 * the van they drive, and the van's stock.
 *
 *  - My kit: confirm what the office issued, see PAT / calibration due, report
 *    a fault or loss with a photo, pass it to a colleague, hand it back.
 *  - Van stock: what is on the van, log materials used on a job (stock goes
 *    down, the office prices it at buy price on the server), undo a mistake
 *    within 24 hours, count the van.
 *
 * Data: get_my_kit and get_my_van_stock (SECURITY DEFINER, no prices ever).
 * Deep links: ?tool=<id> opens an item, ?tab=van opens the van, ?job=<id>
 * opens Materials used for that job.
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ScanBarcode, Search, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import { WT_EQUIPMENT_HELP } from '@/components/worker-tools/help/worker-help-2';
import { EmptyState, LoadingBlocks, StatStrip } from '@/components/employer/editorial';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  inputCn,
  labelCn,
  chipBase,
  chipOn,
  chipOff,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import {
  useMyKit,
  useMyVanStock,
  useConfirmTool,
  useUndoMaterialUse,
  useCountVanStock,
  type MyKitTool,
  type MyVan,
  type MyVanItem,
} from '@/hooks/useKit';
import type { HelpBlocker } from '@/components/hub/PageHelp';
import { MyToolSheet } from '@/components/worker-tools/kit/MyToolSheet';
import { dueInfo } from '@/components/worker-tools/kit/kitDates';
import { LogMaterialsSheet } from '@/components/worker-tools/kit/LogMaterialsSheet';
import { EquipmentBarcodeScanner } from '@/components/electrician-tools/site-safety/equipment/EquipmentBarcodeScanner';

type Tab = 'kit' | 'van';
type Filter = 'all' | 'due' | 'faulty';

const cardListCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] overflow-hidden';
const fmtQty = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/0+$/, '').replace(/\.$/, ''));

const isDue = (t: MyKitTool) => {
  const p = dueInfo(t.pat_due).days;
  const c = dueInfo(t.next_calibration).days;
  return (p != null && p <= 30) || (c != null && c <= 30);
};
const isOverdue = (t: MyKitTool) => {
  const p = dueInfo(t.pat_due).days;
  const c = dueInfo(t.next_calibration).days;
  return (p != null && p < 0) || (c != null && c < 0);
};
const isFaulty = (t: MyKitTool) => t.status === 'Under Repair' || t.status === 'Lost';

function nextDueLine(t: MyKitTool): { text: string; tone: string } | null {
  const pat = dueInfo(t.pat_due);
  const cal = dueInfo(t.next_calibration);
  const pick = [
    pat.days != null ? { k: 'PAT', ...pat } : null,
    cal.days != null ? { k: 'Calibration', ...cal } : null,
  ]
    .filter((x): x is NonNullable<typeof x> => !!x)
    .sort((a, b) => (a.days ?? 0) - (b.days ?? 0))[0];
  if (!pick) return null;
  return {
    text: `${pick.k}: ${pick.label}`,
    tone: pick.tone === 'red' ? 'text-red-300' : pick.tone === 'orange' ? 'text-orange-300' : 'text-white',
  };
}

export default function MyEquipmentPage() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: kit, isLoading } = useMyKit();
  const { data: vans = [], isLoading: loadingVans } = useMyVanStock();
  const confirm = useConfirmTool();
  const tools = useMemo(() => kit?.tools ?? [], [kit]);

  const tab: Tab = params.get('tab') === 'van' ? 'van' : 'kit';
  const toolId = params.get('tool');
  const jobParam = params.get('job');
  const setParam = (patch: Record<string, string | null>) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        for (const [k, v] of Object.entries(patch)) {
          if (v == null) next.delete(k);
          else next.set(k, v);
        }
        return next;
      },
      { replace: true }
    );

  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [scan, setScan] = useState(false);
  const [logVan, setLogVan] = useState<MyVan | null>(null);

  const selected = tools.find((t) => t.id === toolId) ?? null;
  useEffect(() => {
    if (!isLoading && toolId && !selected) {
      toast.message('That item is no longer on your name');
      setParam({ tool: null });
    }
  }, [isLoading, toolId, selected]); // eslint-disable-line react-hooks/exhaustive-deps

  // ?job=<id> (e.g. from My jobs) opens Materials used for that job.
  useEffect(() => {
    if (jobParam && vans.length > 0 && !logVan) {
      setParam({ tab: 'van' });
      setLogVan(vans[0]);
    }
  }, [jobParam, vans]); // eslint-disable-line react-hooks/exhaustive-deps

  const pending = tools.filter((t) => t.issue_state === 'pending');
  const dueCount = tools.filter(isDue).length;
  const overdueCount = tools.filter(isOverdue).length;
  const faultyCount = tools.filter(isFaulty).length;
  const hasVan = (kit?.vans.length ?? 0) > 0 || vans.length > 0;
  // Gap #3 / #22: "Materials used" from a job, but no van stock on this
  // person's name. Say so, and offer the way that works, instead of nothing.
  const noVanForJob = !!jobParam && !loadingVans && vans.length === 0;

  const q = search.trim().toLowerCase();
  const shown = tools.filter((t) => {
    if (filter === 'due' && !isDue(t)) return false;
    if (filter === 'faulty' && !isFaulty(t)) return false;
    return !q || `${t.name} ${t.category ?? ''} ${t.serial_number ?? ''}`.toLowerCase().includes(q);
  });

  const helpBlockers: HelpBlocker[] = [];
  if (pending.length > 0) {
    helpBlockers.push({ text: `${pending.length} ${pending.length === 1 ? 'item needs' : 'items need'} you to confirm you have it.` });
  }

  return (
    <WorkerToolPage
      eyebrow="Kit"
      title="My equipment"
      description="Kit on your name and on your van. Confirm what you have, report faults and log the materials you use."
      help={WT_EQUIPMENT_HELP}
      helpBlockers={helpBlockers}
    >
      {noVanForJob && (
        <section
          data-testid="materials-no-van"
          className="space-y-3 rounded-2xl border border-white/[0.14] bg-white/[0.04] p-4 sm:p-5"
        >
          <div>
            <h2 className="text-[15px] font-semibold text-white">No van stock on your name</h2>
            <p className="mt-1 text-[13.5px] leading-snug text-white">
              Materials used come off a van&rsquo;s stock, and the office hasn&rsquo;t put a van on
              your name yet. Add what you used to the job as a progress note instead (a photo of the
              packaging helps), and the office can cost it from there.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate(`/electrician/worker-tools/progress-notes?job=${jobParam}`)}
              className={cn(buttonPrimaryCn, 'w-full sm:w-auto sm:px-5')}
            >
              Add a progress note
            </button>
            <button
              type="button"
              onClick={() => navigate(`/electrician/worker-tools/jobs?job=${jobParam}`)}
              className={cn(buttonSecondaryCn, 'w-full sm:w-auto sm:px-5')}
            >
              Back to the job
            </button>
          </div>
          <p className="text-[12.5px] text-white">Ask the office to put a van on your name to log stock next time.</p>
        </section>
      )}

      {hasVan && (
        <div data-help="wt-equipment.tabs" className="grid grid-cols-2 gap-2 sm:max-w-sm">
          {(
            [
              ['kit', 'My kit'],
              ['van', 'Van stock'],
            ] as const
          ).map(([v, l]) => (
            <button
              key={v}
              type="button"
              onClick={() => setParam({ tab: v === 'kit' ? null : v })}
              className={cn(chipBase, tab === v ? chipOn : chipOff)}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      {tab === 'van' && hasVan ? (
        <VanTab vans={vans} loading={loadingVans} onLog={setLogVan} />
      ) : isLoading ? (
        <LoadingBlocks />
      ) : tools.length === 0 ? (
        <EmptyState
          title="No kit on your name"
          description="When the office issues you a tester, a drill or anything else, it shows here for you to confirm. Kit on the van you drive shows here too."
        />
      ) : (
        <div className="space-y-6">
          {pending.length > 0 && (
            <section data-help="wt-equipment.confirm" className="space-y-3 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4 sm:p-5">
              <h2 className="text-[15px] font-semibold text-white">
                Confirm you have {pending.length === 1 ? 'this' : `these ${pending.length}`}
              </h2>
              <ul className="space-y-2">
                {pending.map((t) => (
                  <li key={t.id} className="flex items-center gap-3">
                    <button type="button" onClick={() => setParam({ tool: t.id })} className="min-h-11 min-w-0 flex-1 text-left touch-manipulation">
                      <span className="block truncate text-[14.5px] font-semibold text-white">{t.name}</span>
                      <span className="block truncate text-[12.5px] text-white">
                        {[t.on_van ? `On van ${t.vehicle_registration ?? ''}`.trim() : 'On your name', t.issued_at ? `issued ${format(parseISO(t.issued_at), 'd MMM')}` : null]
                          .filter(Boolean)
                          .join(', ')}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => confirm.mutate(t.id)}
                      disabled={confirm.isPending}
                      className={cn(buttonPrimaryCn, 'h-11 shrink-0 px-4 text-[14px]')}
                    >
                      I have it
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <StatStrip
            columns={3}
            stats={[
              { label: 'With you', value: tools.length },
              { label: 'Due soon', value: dueCount, tone: dueCount > 0 ? 'orange' : undefined, onClick: () => setFilter('due') },
              {
                label: overdueCount > 0 ? 'Overdue' : 'Faulty',
                value: overdueCount > 0 ? overdueCount : faultyCount,
                tone: overdueCount + faultyCount > 0 ? 'red' : undefined,
                onClick: () => setFilter(overdueCount > 0 ? 'due' : 'faulty'),
              },
            ]}
          />

          <div className="flex items-end gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your kit"
                aria-label="Search your kit"
                className={cn(inputCn, 'pl-7')}
              />
            </div>
            <button
              type="button"
              data-help="wt-equipment.scan"
              onClick={() => setScan(true)}
              className="flex h-11 shrink-0 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-[14px] font-medium text-white touch-manipulation"
            >
              <ScanBarcode className="h-5 w-5" aria-hidden /> Scan
            </button>
          </div>

          <div data-help="wt-equipment.filters" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar sm:mx-0 sm:px-0">
            {(
              [
                ['all', `All · ${tools.length}`],
                ['due', `Due soon · ${dueCount}`],
                ['faulty', `Faulty or lost · ${faultyCount}`],
              ] as const
            ).map(([v, l]) => (
              <button
                key={v}
                type="button"
                onClick={() => setFilter(v)}
                className={cn(chipBase, 'shrink-0 whitespace-nowrap rounded-full px-4 text-[13px]', filter === v ? chipOn : chipOff)}
              >
                {l}
              </button>
            ))}
          </div>

          {shown.length === 0 ? (
            <EmptyState
              title={filter === 'due' ? 'Nothing due soon' : filter === 'faulty' ? 'Nothing faulty' : 'Nothing matches'}
              description="Try All."
              action="Show all"
              onAction={() => {
                setFilter('all');
                setSearch('');
              }}
            />
          ) : (
            <ul data-help="wt-equipment.list" className={cn(cardListCn, 'divide-y divide-white/[0.08]')}>
              {shown.map((t) => {
                const due = nextDueLine(t);
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => setParam({ tool: t.id })}
                      className="flex min-h-[72px] w-full items-center gap-3 px-4 py-3 text-left touch-manipulation hover:bg-white/[0.04] sm:px-5"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] font-semibold text-white">{t.name}</span>
                        <span className="block truncate text-[12.5px] text-white">
                          {[t.category, t.serial_number ? `S/N ${t.serial_number}` : null, t.on_van ? `On van ${t.vehicle_registration ?? ''}`.trim() : null]
                            .filter(Boolean)
                            .join(' · ')}
                        </span>
                        {due && <span className={cn('mt-0.5 block text-[12.5px] font-medium', due.tone)}>{due.text}</span>}
                      </span>
                      <span
                        className={cn(
                          'inline-flex h-6 shrink-0 items-center rounded-full border px-2.5 text-[11.5px] font-semibold',
                          t.issue_state === 'pending'
                            ? 'border-orange-500/40 text-orange-300'
                            : isFaulty(t)
                              ? 'border-red-500/40 text-red-300'
                              : 'border-white/[0.3] text-white'
                        )}
                      >
                        {t.issue_state === 'pending' ? 'Confirm' : t.status === 'Under Repair' ? 'Faulty' : t.status}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      <MyToolSheet tool={selected} onOpenChange={(o) => !o && setParam({ tool: null })} />
      <LogMaterialsSheet
        open={!!logVan}
        onOpenChange={(o) => {
          if (!o) {
            setLogVan(null);
            if (jobParam) setParam({ job: null });
          }
        }}
        van={logVan ? (vans.find((v) => v.id === logVan.id) ?? logVan) : null}
        initialJobId={jobParam}
      />
      <EquipmentBarcodeScanner
        open={scan}
        onClose={() => setScan(false)}
        title="Find your kit"
        description="Scan the barcode or serial label on the item"
        onScan={({ text }) => {
          setScan(false);
          const code = text.trim().toLowerCase();
          const hit = tools.find(
            (t) => (t.barcode ?? '').trim().toLowerCase() === code || (t.serial_number ?? '').trim().toLowerCase() === code
          );
          if (hit) setParam({ tool: hit.id });
          else toast.message('Not on your name', { description: 'If it should be, ask the office to issue it to you.' });
        }}
      />
    </WorkerToolPage>
  );
}

/* ── Van stock tab ────────────────────────────────────────────────────── */

function VanTab({ vans, loading, onLog }: { vans: MyVan[]; loading: boolean; onLog: (v: MyVan) => void }) {
  const undo = useUndoMaterialUse();
  const [countItem, setCountItem] = useState<MyVanItem | null>(null);

  if (loading) return <LoadingBlocks />;
  if (vans.length === 0) {
    return (
      <EmptyState
        title="You are not down as driving a van"
        description="When the office sets you as a van's driver, its stock shows here and you can log what you use on each job."
      />
    );
  }

  return (
    <div className="space-y-8">
      {vans.map((v) => {
        const low = v.items.filter((i) => i.low).length;
        return (
          <div key={v.id} className="space-y-4">
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 shrink-0 text-white" aria-hidden />
              <div className="min-w-0">
                <h2 className="text-[20px] font-semibold tracking-tight text-white">{v.registration ?? 'Your van'}</h2>
                <p className="text-[13px] text-white">
                  {v.items.length} {v.items.length === 1 ? 'item' : 'items'} stocked{low ? `, ${low} running low` : ''}
                </p>
              </div>
            </div>

            <button
              type="button"
              data-help="wt-equipment.log"
              onClick={() => onLog(v)}
              disabled={v.items.length === 0}
              className={cn(buttonPrimaryCn, 'w-full sm:w-auto sm:px-8')}
            >
              Log materials used on a job
            </button>

            <div className="space-y-5 lg:grid lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-6 lg:space-y-0">
              {v.items.length === 0 ? (
                <div className={cn(cardListCn, 'p-6 text-center')}>
                  <p className="text-[15px] font-semibold text-white">Nothing stocked yet</p>
                  <p className="mt-1 text-[13px] text-white">The office sets up what this van carries.</p>
                </div>
              ) : (
                <ul data-help="wt-equipment.stock" className={cn(cardListCn, 'divide-y divide-white/[0.08]')}>
                  {v.items.map((i) => (
                    <li key={i.id}>
                      <button
                        type="button"
                        onClick={() => setCountItem(i)}
                        className="flex min-h-[60px] w-full items-center gap-3 px-4 py-3 text-left touch-manipulation hover:bg-white/[0.04] sm:px-5"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[14.5px] font-semibold text-white">{i.name}</span>
                          <span className={cn('block text-[12.5px]', i.low ? 'text-red-300' : 'text-white')}>
                            {i.low ? (i.on_order ? 'Running low, more on order' : 'Running low, the office has been told') : `Tap to count`}
                          </span>
                        </span>
                        <span className="shrink-0 text-right">
                          <span className={cn('block text-[17px] font-semibold tabular-nums', i.low ? 'text-red-300' : 'text-white')}>
                            {fmtQty(i.qty)}
                          </span>
                          <span className="block text-[11.5px] text-white">{i.unit}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <section className={cn(cardListCn, 'p-4 sm:p-5')}>
                <h3 className="text-[15px] font-semibold text-white">What you logged</h3>
                {v.recent.length === 0 ? (
                  <p className="mt-1 text-[13px] text-white">Nothing yet.</p>
                ) : (
                  <ul className="mt-1 divide-y divide-white/[0.08]">
                    {v.recent.map((u) => (
                      <li key={u.id} className="flex items-center gap-3 py-2.5">
                        <span className="min-w-0 flex-1">
                          <span className="block text-[14px] text-white">
                            {fmtQty(u.qty)} × {u.name}
                            {u.reversed ? ' (undone)' : ''}
                          </span>
                          <span className="block truncate text-[12px] text-white">
                            {[u.job_title, format(parseISO(u.created_at), 'd MMM, HH:mm')].filter(Boolean).join(' · ')}
                          </span>
                        </span>
                        {u.can_undo && (
                          <button
                            type="button"
                            onClick={() => undo.mutate(u.id)}
                            disabled={undo.isPending}
                            className="h-11 shrink-0 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-[13px] font-medium text-white touch-manipulation"
                          >
                            Undo
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </div>
        );
      })}

      <CountSheet item={countItem} onClose={() => setCountItem(null)} />
    </div>
  );
}

function CountSheet({ item, onClose }: { item: MyVanItem | null; onClose: () => void }) {
  const count = useCountVanStock();
  const [qty, setQty] = useState('');
  useEffect(() => {
    if (item) setQty(fmtQty(item.qty));
  }, [item?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!item) return null;
  const n = Number(qty);
  const ok = qty.trim() !== '' && Number.isFinite(n) && n >= 0;
  return (
    <FormSheet
      open={!!item}
      onOpenChange={(o) => !o && onClose()}
      eyebrow="Count the van"
      title={item.name}
      description="Count what is actually on the van. It corrects the stock and tells the office if it is low."
      footer={
        <div className="flex gap-2">
          <button type="button" onClick={onClose} className={cn(buttonSecondaryCn, 'px-5')}>
            Cancel
          </button>
          <button
            type="button"
            disabled={!ok || count.isPending}
            onClick={async () => {
              try {
                await count.mutateAsync({ stockId: item.id, qty: n });
                onClose();
              } catch {
                /* hook toasts */
              }
            }}
            className={cn(buttonPrimaryCn, 'flex-1 px-5')}
          >
            {count.isPending ? 'Saving…' : 'Save count'}
          </button>
        </div>
      }
    >
      <div>
        <label className={labelCn} htmlFor="count-qty">
          How many {item.unit === 'each' ? '' : `${item.unit} `}are on the van
        </label>
        <input
          id="count-qty"
          type="number"
          inputMode="decimal"
          min={0}
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className={cn(inputCn, 'text-[22px]')}
        />
      </div>
    </FormSheet>
  );
}

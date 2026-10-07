import { useMemo, useState } from 'react';
import { ChevronLeft, Plus, ScanBarcode, Truck } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { StatStrip } from '@/components/employer/editorial';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { useVehicles } from '@/hooks/useFleet';
import { gbp } from '@/hooks/useFirmPriceBook';
import { useVanStock, useVanStockMoves, type VanStockLine } from '@/hooks/useKit';
import type { CompanyTool } from '@/hooks/useCompanyTools';
import { VanStockItemSheet } from '@/components/employer/kit/VanStockItemSheet';
import { EquipmentBarcodeScanner } from '@/components/electrician-tools/site-safety/equipment/EquipmentBarcodeScanner';
import { toast } from 'sonner';

/* ==========================================================================
   Van stock (ELE-1829), the second tab of the Kit register.

   Pick a van: what is on it, what is low, what is already on order, and what
   came off it onto which job. Office managers see quantities only; the owner
   and admins also see the buy-price cost of what was used.
   ========================================================================== */

const listCardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] overflow-hidden';

const fmtQty = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/0+$/, '').replace(/\.$/, ''));
const when = (iso: string) => format(parseISO(iso), 'd MMM, HH:mm');

export function VanStockPanel({
  vanId,
  onVanChange,
  tools,
  onOpenTool,
}: {
  vanId: string | null;
  onVanChange: (id: string | null) => void;
  tools: CompanyTool[];
  onOpenTool: (id: string) => void;
}) {
  const { data: vans = [], isLoading: loadingVans } = useVehicles();
  const { data: allLines = [], isLoading: loadingStock } = useVanStock(null);
  const [editLine, setEditLine] = useState<VanStockLine | null>(null);
  const [adding, setAdding] = useState(false);
  const [scan, setScan] = useState(false);

  const byVan = useMemo(() => {
    const m = new Map<string, { lines: number; low: number; ordered: number }>();
    for (const l of allLines) {
      const c = m.get(l.vehicle_id) ?? { lines: 0, low: 0, ordered: 0 };
      c.lines += 1;
      if (l.low) c.low += 1;
      if (l.on_order > 0) c.ordered += 1;
      m.set(l.vehicle_id, c);
    }
    return m;
  }, [allLines]);

  const van = vans.find((v) => v.id === vanId) ?? null;

  if (!van) {
    return (
      <div className="space-y-4">
        <p className="text-[14px] text-white">
          Pick a van to see what is on it. The driver logs what they use on each job, and you get a draft order when it runs low.
        </p>
        {loadingVans || loadingStock ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-white/[0.05]" />
            ))}
          </div>
        ) : vans.length === 0 ? (
          <div className={cn(listCardCn, 'p-6 text-center')}>
            <p className="text-[15px] font-semibold text-white">No vans yet</p>
            <p className="mt-1 text-[13px] text-white">Add your vans in Fleet, then come back to stock them.</p>
          </div>
        ) : (
          <ul data-help="stock.vans" className={cn(listCardCn, 'divide-y divide-white/[0.08]')}>
            {vans.map((v) => {
              const c = byVan.get(v.id);
              const kit = tools.filter((t) => t.assigned_vehicle_id === v.id).length;
              return (
                <li key={v.id}>
                  <button
                    type="button"
                    onClick={() => onVanChange(v.id)}
                    className="flex min-h-[68px] w-full items-center gap-3 px-4 py-3 text-left touch-manipulation hover:bg-white/[0.04] sm:px-5"
                  >
                    <Truck className="h-5 w-5 shrink-0 text-white" aria-hidden />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14.5px] font-semibold text-white">{v.registration}</span>
                      <span className="block truncate text-[12.5px] text-white">
                        {[
                          v.driver?.name ? `Driven by ${v.driver.name}` : 'No driver set',
                          c ? `${c.lines} ${c.lines === 1 ? 'item' : 'items'} stocked` : 'Nothing stocked yet',
                          kit ? `${kit} kit` : null,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </span>
                    </span>
                    {c && c.low > 0 && (
                      <span className="inline-flex h-6 shrink-0 items-center rounded-full border border-red-500/40 px-2.5 text-[11.5px] font-semibold text-red-300">
                        {c.low} low
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  return (
    <VanDetail
      vanId={van.id}
      registration={van.registration}
      driver={van.driver?.name ?? null}
      tools={tools.filter((t) => t.assigned_vehicle_id === van.id)}
      onBack={() => onVanChange(null)}
      onOpenTool={onOpenTool}
      onEdit={setEditLine}
      onAdd={() => setAdding(true)}
      onScan={() => setScan(true)}
      editLine={editLine}
      adding={adding}
      closeSheets={() => {
        setEditLine(null);
        setAdding(false);
      }}
      scan={scan}
      setScan={setScan}
    />
  );
}

function VanDetail({
  vanId,
  registration,
  driver,
  tools,
  onBack,
  onOpenTool,
  onEdit,
  onAdd,
  onScan,
  editLine,
  adding,
  closeSheets,
  scan,
  setScan,
}: {
  vanId: string;
  registration: string | null;
  driver: string | null;
  tools: CompanyTool[];
  onBack: () => void;
  onOpenTool: (id: string) => void;
  onEdit: (l: VanStockLine) => void;
  onAdd: () => void;
  onScan: () => void;
  editLine: VanStockLine | null;
  adding: boolean;
  closeSheets: () => void;
  scan: boolean;
  setScan: (b: boolean) => void;
}) {
  const { data: lines = [], isLoading } = useVanStock(vanId);
  const { data: moves = [] } = useVanStockMoves(vanId);
  const [filter, setFilter] = useState<'all' | 'low'>('all');
  const low = lines.filter((l) => l.low);
  const onOrder = lines.filter((l) => l.on_order > 0);
  const shown = filter === 'low' ? low : lines;
  const names = useMemo(() => new Set(lines.map((l) => l.name.trim().toLowerCase())), [lines]);
  const money = lines[0]?.money_visible ?? false;
  const usedValue = moves
    .filter((m) => m.kind === 'used' && !m.reversed)
    .reduce((s, m) => s + (m.line_cost ?? 0), 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-11 items-center gap-1 pr-3 text-[14px] font-semibold text-white touch-manipulation"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden /> All vans
        </button>
      </div>
      <div>
        <h2 className="text-[20px] font-semibold tracking-tight text-white">{registration ?? 'Van'}</h2>
        <p className="text-[13px] text-white">{driver ? `Driven by ${driver}. They log what they use on each job.` : 'No driver set. Set one in Fleet so they can log what they use.'}</p>
      </div>

      <StatStrip
        columns={3}
        stats={[
          { label: 'Items', value: lines.length, tone: 'orange' },
          { label: 'Low', value: low.length, tone: low.length ? 'red' : 'emerald', onClick: () => setFilter('low') },
          { label: 'On order', value: onOrder.length, tone: onOrder.length ? 'amber' : 'blue' },
        ]}
      />

      <div className="flex flex-col gap-2 sm:flex-row">
        <button type="button" data-help="stock.add" onClick={onAdd} className={cn(buttonPrimaryCn, 'inline-flex items-center justify-center gap-2 px-5 sm:w-auto')}>
          <Plus className="h-4 w-4" aria-hidden /> Add item
        </button>
        <button type="button" onClick={onScan} className={cn(buttonSecondaryCn, 'inline-flex items-center justify-center gap-2 px-5')}>
          <ScanBarcode className="h-4 w-4" aria-hidden /> Scan to find
        </button>
      </div>

      <div className="flex gap-2">
        {(
          [
            ['all', `All · ${lines.length}`],
            ['low', `Low · ${low.length}`],
          ] as const
        ).map(([v, l]) => (
          <button
            key={v}
            type="button"
            onClick={() => setFilter(v)}
            className={cn(
              'h-11 shrink-0 rounded-full border px-4 text-[13px] touch-manipulation',
              filter === v ? 'border-elec-yellow bg-elec-yellow font-semibold text-black' : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
            )}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="space-y-5 lg:grid lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-6 lg:space-y-0">
        <div className="space-y-5">
          {isLoading ? (
            <div className="h-24 animate-pulse rounded-xl bg-white/[0.05]" />
          ) : lines.length === 0 ? (
            <div className={cn(listCardCn, 'p-6 text-center')}>
              <p className="text-[15px] font-semibold text-white">Nothing stocked on this van</p>
              <p className="mt-1 text-[13px] text-white">Add the things it always carries: breakers, glands, clips, fixings.</p>
            </div>
          ) : shown.length === 0 ? (
            <div className={cn(listCardCn, 'p-6 text-center')}>
              <p className="text-[14px] text-white">Nothing is low on this van.</p>
            </div>
          ) : (
            <ul data-help="stock.list" className={cn(listCardCn, 'divide-y divide-white/[0.08]')}>
              {shown.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => onEdit(l)}
                    className="flex min-h-[64px] w-full items-center gap-3 px-4 py-3 text-left touch-manipulation hover:bg-white/[0.04] sm:px-5"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14.5px] font-semibold text-white">{l.name}</span>
                      <span className="block truncate text-[12.5px] text-white">
                        {[
                          l.min_qty > 0 ? `Reorder at ${fmtQty(l.min_qty)}` : 'No reorder level',
                          l.on_order > 0 ? `${fmtQty(l.on_order)} on order` : null,
                          l.supplier_name,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className={cn('block text-[17px] font-semibold tabular-nums', l.low ? 'text-red-300' : 'text-white')}>
                        {fmtQty(l.qty)}
                      </span>
                      <span className="block text-[11.5px] text-white">{l.unit}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {tools.length > 0 && (
            <section className={cn(listCardCn, 'p-4 sm:p-5')}>
              <h3 className="text-[15px] font-semibold text-white">Company kit on this van</h3>
              <ul className="mt-2 divide-y divide-white/[0.08]">
                {tools.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => onOpenTool(t.id)}
                      className="flex min-h-11 w-full items-center justify-between gap-3 py-2 text-left touch-manipulation"
                    >
                      <span className="truncate text-[14px] text-white">{t.name}</span>
                      <span className="shrink-0 text-[12px] text-white">
                        {t.issue_state === 'pending' ? 'Waiting to confirm' : t.status}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <section className={cn(listCardCn, 'p-4 sm:p-5')} data-help="stock.activity">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-white">Recent activity</h3>
            {money && usedValue > 0 && <span className="text-[12.5px] text-white">Used {gbp(usedValue)} at cost</span>}
          </div>
          {moves.length === 0 ? (
            <p className="mt-2 text-[13px] text-white">Nothing yet. When the driver logs materials on a job, it shows here.</p>
          ) : (
            <ul className="mt-2 divide-y divide-white/[0.08]">
              {moves.map((m) => (
                <li key={m.id} className="py-2.5">
                  <p className="text-[14px] text-white">
                    {m.kind === 'used'
                      ? `${fmtQty(m.qty)} × ${m.name} used${m.job_title ? ` on ${m.job_title}` : ''}`
                      : m.kind === 'received'
                        ? `${fmtQty(m.qty)} × ${m.name} delivered`
                        : m.kind === 'added'
                          ? `${m.name} added (${fmtQty(m.qty)})`
                          : `${m.name} counted at ${fmtQty(m.qty)}`}
                    {m.reversed ? ' (undone)' : ''}
                  </p>
                  <p className="text-[12px] text-white">
                    {[m.actor_name, when(m.created_at), m.line_cost != null && m.kind === 'used' ? gbp(m.line_cost) : null]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <VanStockItemSheet
        open={adding || !!editLine}
        onOpenChange={(o) => !o && closeSheets()}
        vehicleId={vanId}
        registration={registration}
        line={editLine}
        onVan={names}
      />
      <EquipmentBarcodeScanner
        open={scan}
        onClose={() => setScan(false)}
        title="Scan to find"
        description="Scan the barcode on the box"
        onScan={({ text }) => {
          setScan(false);
          const hit = lines.find((l) => (l.barcode ?? '').trim() === text.trim());
          if (hit) onEdit(hit);
          else toast.message('Not on this van', { description: 'Add it, then put the barcode on the item.' });
        }}
      />
    </div>
  );
}

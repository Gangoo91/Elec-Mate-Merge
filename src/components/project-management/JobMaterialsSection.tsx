import { useState } from 'react';
import {
  Package,
  Mail,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  Circle,
  CheckCircle2,
  FileText,
  Boxes,
  Loader2,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useJobMaterials, type StockItem } from '@/hooks/useJobMaterials';
import { PANEL } from '@/components/electrician/shared/surfaces';
import { cn } from '@/lib/utils';

const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);

interface JobMaterialsSectionProps {
  projectId: string;
  projectTitle?: string;
  projectLocation?: string | null;
  open: boolean;
  onToggle: () => void;
  /** Number of quotes linked to the job — shows the import shortcut when > 0. */
  quoteCount: number;
}

/**
 * Per-job materials list (S6): seeded from the quote, added by hand or from
 * own stock, ticked off on site. Ticking a stock-linked item decrements the
 * stock tracker and writes the movements ledger.
 */
export const JobMaterialsSection = ({
  projectId,
  projectTitle,
  projectLocation,
  open,
  onToggle,
  quoteCount,
}: JobMaterialsSectionProps) => {
  const {
    materials,
    isLoading,
    neededCount,
    totalCost,
    addMaterial,
    importFromQuotes,
    markGot,
    markNeeded,
    removeMaterial,
    searchStock,
  } = useJobMaterials(projectId);

  const [newName, setNewName] = useState('');
  const [newQty, setNewQty] = useState('1');
  const [adding, setAdding] = useState(false);
  const [importing, setImporting] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);
  const [stockQuery, setStockQuery] = useState('');
  const [stockResults, setStockResults] = useState<StockItem[]>([]);
  const [stockLoading, setStockLoading] = useState(false);

  const handleAdd = async () => {
    if (!newName.trim() || adding) return;
    setAdding(true);
    const ok = await addMaterial({ name: newName, quantity: Number(newQty) || 1 });
    if (ok) {
      setNewName('');
      setNewQty('1');
    }
    setAdding(false);
  };

  const handleImport = async () => {
    if (importing) return;
    setImporting(true);
    await importFromQuotes();
    setImporting(false);
  };

  const openStockSearch = async () => {
    setStockOpen((v) => !v);
    if (!stockOpen) {
      setNewQty('1'); // a leftover manual qty must not silently size stock picks (audit P2)
      setStockLoading(true);
      setStockResults(await searchStock(''));
      setStockLoading(false);
    }
  };

  const runStockSearch = async (q: string) => {
    setStockQuery(q);
    setStockLoading(true);
    setStockResults(await searchStock(q));
    setStockLoading(false);
  };

  const addStockItem = async (item: StockItem) => {
    // Honour the qty field; anything beyond genuine availability goes on as "to order"
    const qty = Math.max(1, Number(newQty) || 1);
    const short = qty > item.available;
    await addMaterial({
      name: item.name,
      quantity: qty,
      unit: item.unit || undefined,
      unitPrice: item.unit_cost ?? undefined,
      supplier: item.supplier || undefined,
      inventoryItemId: item.id,
      status: short ? 'ordered' : 'needed',
    });
    setStockOpen(false);
    setStockQuery('');
    setNewQty('1');
  };

  // D3 (ELE-1363): fire the outstanding list at a wholesaler as an RFQ
  const outstanding = materials.filter((m) => m.status === 'needed' || m.status === 'ordered');
  const handleRfq = () => {
    if (outstanding.length === 0) return;
    const lines = outstanding.map(
      (m) => `• ${Number(m.quantity)}${m.unit ? ` ${m.unit}` : '×'} — ${m.name}`
    );
    const subject = `Request for Quotation${projectTitle ? ` — ${projectTitle}` : ''}`;
    const body = [
      subject,
      projectLocation ? `Site: ${projectLocation}` : null,
      '',
      'Please price the following materials:',
      ...lines,
      '',
      'Sent from Elec-Mate',
    ]
      .filter((l) => l !== null)
      .join('\n');
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const ticked = (s: string) => s === 'got' || s === 'fitted';

  return (
    <Collapsible className={cn(PANEL, 'overflow-hidden')} open={open} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 min-h-[60px] touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.04] transition-colors group text-left">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="h-9 w-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
              <Package className="h-4 w-4 text-white/70" />
            </span>
            <span className="min-w-0">
              <span className="block text-[14px] font-semibold text-white leading-tight">
                Materials
              </span>
              <span className="block text-[11px] text-white/55 truncate leading-tight mt-0.5">
                {materials.length > 0
                  ? `${neededCount} to get${totalCost > 0 ? ` · ${gbp(totalCost)}` : ''}`
                  : 'Shopping list for this job'}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {materials.length > 0 && (
              <span className="text-[11px] font-semibold text-white/60 tabular-nums rounded-full bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 leading-none">
                {materials.length}
              </span>
            )}
            {open ? (
              <ChevronUp className="h-4 w-4 text-white/45" />
            ) : (
              <ChevronDown className="h-4 w-4 text-white/45" />
            )}
          </div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-3.5 sm:px-4 pb-4 space-y-3">
          {isLoading ? (
            <div className="flex justify-center py-6">
              <Loader2 className="h-4 w-4 animate-spin text-white/50" />
            </div>
          ) : (
            <>
              {/* Rows */}
              {materials.length > 0 && (
                <div className="divide-y divide-white/[0.05] rounded-xl border border-white/[0.06] overflow-hidden">
                  {materials.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center gap-3 px-3 py-2.5 bg-white/[0.02]"
                    >
                      <button
                        type="button"
                        aria-label={ticked(m.status) ? 'Mark as still needed' : 'Mark as got'}
                        onClick={() =>
                          ticked(m.status)
                            ? markNeeded(m.id, !!m.inventory_item_id)
                            : markGot(m.id, !!m.inventory_item_id)
                        }
                        className="h-11 w-8 -ml-1 flex items-center justify-center touch-manipulation shrink-0"
                      >
                        {ticked(m.status) ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <Circle className="h-5 w-5 text-white/30" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            'text-[13px] font-medium truncate',
                            ticked(m.status) ? 'text-white/40 line-through' : 'text-white'
                          )}
                        >
                          {m.name}
                        </p>
                        <p className="text-[11px] text-white/45">
                          {Number(m.quantity)}
                          {m.unit ? ` ${m.unit}` : '×'}
                          {m.status === 'ordered' ? ' · to order' : m.inventory_item_id ? ' · from stock' : ''}
                          {m.source === 'quote' ? ' · quoted' : ''}
                        </p>
                      </div>
                      {m.unit_price ? (
                        <span className="text-[12px] font-semibold text-white/70 tabular-nums shrink-0">
                          {gbp(Number(m.unit_price) * Number(m.quantity))}
                        </span>
                      ) : null}
                      <button
                        type="button"
                        aria-label="Remove material"
                        onClick={() => removeMaterial(m.id)}
                        className="h-11 w-8 flex items-center justify-center text-white/30 hover:text-white/60 touch-manipulation shrink-0"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add row */}
              <div className="flex gap-2">
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  placeholder="Add a material…"
                  className="flex-1 min-w-0 h-11 px-3 rounded-xl bg-white/[0.04] border border-white/[0.10] text-[13px] text-white placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/50 touch-manipulation"
                />
                <input
                  value={newQty}
                  onChange={(e) => setNewQty(e.target.value.replace(/[^0-9.]/g, ''))}
                  inputMode="decimal"
                  aria-label="Quantity"
                  className="w-14 h-11 px-2 rounded-xl bg-white/[0.04] border border-white/[0.10] text-[13px] text-white text-center focus:outline-none focus:border-elec-yellow/50 touch-manipulation"
                />
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!newName.trim() || adding}
                  aria-label="Add material"
                  className="h-11 w-11 rounded-xl bg-elec-yellow text-black flex items-center justify-center touch-manipulation active:scale-[0.96] disabled:opacity-40 shrink-0"
                >
                  {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                </button>
              </div>

              {/* Sources */}
              <div className="flex gap-2">
                {(quoteCount > 0 || materials.length === 0) && (
                  <button
                    type="button"
                    onClick={handleImport}
                    disabled={importing}
                    className="flex-1 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[12px] font-medium text-white/75 flex items-center justify-center gap-2 touch-manipulation active:bg-white/[0.06] disabled:opacity-50"
                  >
                    {importing ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <FileText className="h-3.5 w-3.5" />
                    )}
                    Import from quote
                  </button>
                )}
                <button
                  type="button"
                  onClick={openStockSearch}
                  className={cn(
                    'flex-1 h-10 rounded-xl border text-[12px] font-medium flex items-center justify-center gap-2 touch-manipulation',
                    stockOpen
                      ? 'bg-elec-yellow/[0.10] border-elec-yellow/[0.3] text-elec-yellow'
                      : 'bg-white/[0.04] border-white/[0.08] text-white/75 active:bg-white/[0.06]'
                  )}
                >
                  <Boxes className="h-3.5 w-3.5" />
                  From my stock
                </button>
                {outstanding.length > 0 && (
                  <button
                    type="button"
                    onClick={handleRfq}
                    className="flex-1 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[12px] font-medium text-white/75 flex items-center justify-center gap-2 touch-manipulation active:bg-white/[0.06]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Price it up
                  </button>
                )}
              </div>

              {/* Stock picker */}
              {stockOpen && (
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-2 space-y-2">
                  <input
                    value={stockQuery}
                    onChange={(e) => runStockSearch(e.target.value)}
                    placeholder="Search your stock…"
                    className="w-full h-10 px-3 rounded-lg bg-white/[0.04] border border-white/[0.10] text-[13px] text-white placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/50 touch-manipulation"
                  />
                  {stockLoading ? (
                    <div className="flex justify-center py-3">
                      <Loader2 className="h-4 w-4 animate-spin text-white/40" />
                    </div>
                  ) : stockResults.length === 0 ? (
                    <p className="text-[12px] text-white/45 text-center py-2">
                      Nothing in stock{stockQuery ? ` matching “${stockQuery}”` : ' yet'} — manage
                      it in Price book & stock.
                    </p>
                  ) : (
                    stockResults.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => addStockItem(item)}
                        className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-white/[0.05] active:bg-white/[0.07] touch-manipulation text-left"
                      >
                        <span className="flex-1 min-w-0">
                          <span className="block text-[13px] text-white truncate">{item.name}</span>
                          <span
                            className={cn(
                              'block text-[11px]',
                              item.available <= 0 ? 'text-red-300' : 'text-white/45'
                            )}
                          >
                            {item.available} available
                            {item.committed_elsewhere > 0
                              ? ` · ${item.committed_elsewhere} spoken for${
                                  item.committed_jobs?.length
                                    ? ` (${item.committed_jobs.slice(0, 2).join(', ')})`
                                    : ''
                                }`
                              : ''}
                            {item.unit_cost ? ` · ${gbp(Number(item.unit_cost))} each` : ''}
                          </span>
                        </span>
                        <Plus className="h-4 w-4 text-elec-yellow shrink-0" />
                      </button>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default JobMaterialsSection;

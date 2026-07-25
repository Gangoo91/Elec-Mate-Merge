import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, PoundSterling, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import {
  useJobCostEntries,
  type JobCostEntry,
  type NewJobCostEntry,
} from '@/hooks/useJobCostEntries';

interface StockSuggestion {
  id: string;
  name: string;
  available: number;
  unit_cost: number | null;
  supplier: string | null;
}

// ELE-1401 — per-visit cost tracker on the job detail. Log labour, materials
// and other costs as you go; invoice the lot at the end.

const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n || 0);

const CATEGORIES: Array<{ id: NewJobCostEntry['category']; label: string }> = [
  { id: 'labour', label: 'Labour' },
  { id: 'material', label: 'Material' },
  { id: 'other', label: 'Other' },
];

const todayISO = () => new Date().toISOString().split('T')[0];

const groupLabel = (iso: string) => {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
};

const metaLine = (e: JobCostEntry): string => {
  if (e.category === 'labour' && e.hours) {
    return `${e.hours} h × ${gbp(e.unit_cost || 0)}`;
  }
  if (e.category === 'material') {
    const qty = e.quantity ?? 1;
    return `${qty} × ${gbp(e.unit_cost || 0)}`;
  }
  return 'Other cost';
};

const inputCls =
  'w-full h-11 px-3 rounded-xl bg-white/[0.06] border border-white/[0.12] text-white text-[15px] placeholder:text-white/40 outline-none focus:border-elec-yellow/50 touch-manipulation [color-scheme:dark]';

export function JobCostsSection({ jobId }: { jobId: string }) {
  const {
    entries,
    total,
    uninvoicedTotal,
    invoicedTotal,
    externalUnbilled,
    externalTotal,
    runningTotal,
    isLoading,
    isAdding,
    addEntry,
    deleteEntry,
  } = useJobCostEntries(jobId);

  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [category, setCategory] = useState<NewJobCostEntry['category']>('labour');
  const [entryDate, setEntryDate] = useState(todayISO());
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unitCost, setUnitCost] = useState('');

  // Van-stock suggestions while typing a material — allocation-aware search
  // via the same RPC the materials list uses. Picking one prefills name and
  // cost; stock levels stay managed by the materials list (its lane).
  const [stockSuggestions, setStockSuggestions] = useState<StockSuggestion[]>([]);
  const stockSearchTimer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    if (category !== 'material' || description.trim().length < 2) {
      setStockSuggestions([]);
      return;
    }
    clearTimeout(stockSearchTimer.current);
    stockSearchTimer.current = setTimeout(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase as any).rpc('get_stock_availability', {
        p_project_id: jobId,
        p_query: description.trim(),
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const items = ((data || []) as any[])
        .filter((r) => Number(r.available) > 0)
        .slice(0, 3)
        .map((r) => ({
          id: r.id,
          name: r.name,
          available: Number(r.available) || 0,
          unit_cost: r.unit_cost != null ? Number(r.unit_cost) : null,
          supplier: r.supplier || null,
        }));
      setStockSuggestions(items);
    }, 300);
    return () => clearTimeout(stockSearchTimer.current);
  }, [description, category, jobId]);

  const pickStockItem = (item: StockSuggestion) => {
    setDescription(item.name);
    if (item.unit_cost != null && item.unit_cost > 0) setUnitCost(String(item.unit_cost));
    setStockSuggestions([]);
  };

  const lastLabourRate = useMemo(() => {
    const last = entries.find((e) => e.category === 'labour' && e.unit_cost);
    return last?.unit_cost ? String(last.unit_cost) : '';
  }, [entries]);

  const grouped = useMemo(() => {
    const byDate = new Map<string, JobCostEntry[]>();
    for (const e of entries) {
      const list = byDate.get(e.entry_date) || [];
      list.push(e);
      byDate.set(e.entry_date, list);
    }
    return Array.from(byDate.entries());
  }, [entries]);

  const resetForm = (cat: NewJobCostEntry['category'] = category) => {
    setDescription('');
    setHours('');
    setQuantity('1');
    setUnitCost(cat === 'labour' ? lastLabourRate : '');
    setEntryDate(todayISO());
  };

  const handleAdd = async () => {
    const unit = parseFloat(unitCost);
    const hrs = parseFloat(hours);
    const qty = parseFloat(quantity);
    if (!description.trim()) {
      toast.error('Add a short description');
      return;
    }
    if (category === 'labour' && (!(hrs > 0) || !(unit > 0))) {
      toast.error('Labour needs hours and an hourly rate');
      return;
    }
    if (category !== 'labour' && !(unit > 0)) {
      toast.error('Enter the cost');
      return;
    }
    try {
      await addEntry({
        entry_date: entryDate || todayISO(),
        category,
        description,
        hours: category === 'labour' ? hrs : undefined,
        quantity: category === 'material' ? (qty > 0 ? qty : 1) : undefined,
        unit_cost: unit,
      });
      // Keep the form open for rapid multi-logging (several materials per
      // visit is the normal case) — date, category and rate carry over.
      setDescription('');
      setHours('');
      setQuantity('1');
      if (category !== 'labour') setUnitCost('');
      toast.success('Cost logged');
    } catch {
      toast.error('Could not save — try again');
    }
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
        <CollapsibleTrigger asChild>
          <button className="w-full p-4 flex items-center justify-between touch-manipulation">
            <div className="flex items-center gap-2">
              <PoundSterling className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">Costs</span>
            </div>
            <div className="flex items-center gap-3">
              {(total > 0 || externalTotal > 0) && (
                <span className="text-sm font-semibold text-elec-yellow tabular-nums">
                  {gbp(runningTotal)}
                  {invoicedTotal > 0 && (
                    <span className="ml-1.5 text-[11px] font-medium text-white/50">
                      · {gbp(invoicedTotal)} invoiced
                    </span>
                  )}
                </span>
              )}
              <ChevronDown
                className={cn('h-4 w-4 text-white transition-transform', open && 'rotate-180')}
              />
            </div>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 pt-0 space-y-4">
            {entries.length === 0 && !isLoading && !adding && (
              <p className="text-[12.5px] text-white/55 leading-relaxed">
                Log time and materials as you go — invoice it all at the end.
              </p>
            )}

            {externalTotal > 0 && (
              <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[11.5px] text-white/60 leading-snug">
                  {externalUnbilled.timer > 0 && externalUnbilled.materials > 0
                    ? 'Timer sessions and materials list'
                    : externalUnbilled.timer > 0
                      ? 'Timer sessions'
                      : 'Materials list'}{' '}
                  — pulled onto the invoice automatically
                </span>
                <span className="text-[12.5px] font-semibold text-white/80 tabular-nums shrink-0">
                  {gbp(externalTotal)}
                </span>
              </div>
            )}

            {grouped.map(([date, dayEntries]) => (
              <div key={date}>
                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/45 mb-1.5">
                  {groupLabel(date)}
                </div>
                <div className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.06] overflow-hidden">
                  {dayEntries.map((e) => (
                    <div
                      key={e.id}
                      className={cn(
                        'flex items-center gap-3 px-3.5 py-3',
                        e.invoice_id && 'opacity-55'
                      )}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-[13.5px] font-medium text-white truncate">
                          {e.description}
                        </div>
                        <div className="mt-0.5 text-[11.5px] text-white/55">
                          {metaLine(e)}
                          {e.invoice_id && <span className="ml-2 text-emerald-400/80">Invoiced</span>}
                        </div>
                      </div>
                      <span className="text-[13.5px] font-semibold text-white tabular-nums shrink-0">
                        {gbp(e.total)}
                      </span>
                      {!e.invoice_id && (
                        <button
                          onClick={() => deleteEntry(e.id)}
                          className="h-8 w-8 rounded-lg flex items-center justify-center text-white/35 hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation shrink-0"
                          aria-label="Delete entry"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {adding ? (
              <div className="rounded-xl border border-white/[0.08] p-3.5 space-y-3">
                <div className="grid grid-cols-3 gap-1.5">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setCategory(c.id);
                        if (c.id === 'labour' && !unitCost) setUnitCost(lastLabourRate);
                      }}
                      className={cn(
                        'h-10 rounded-lg text-[13px] font-medium touch-manipulation transition-colors border',
                        category === c.id
                          ? 'border-elec-yellow/60 text-elec-yellow bg-elec-yellow/10'
                          : 'border-white/[0.08] text-white/70 bg-white/[0.04]'
                      )}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <input
                  className={inputCls}
                  autoFocus
                  placeholder={
                    category === 'labour'
                      ? 'What was the work?'
                      : category === 'material'
                        ? 'Material (add supplier if useful)'
                        : 'What was the cost?'
                  }
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {stockSuggestions.length > 0 && (
                  <div className="rounded-xl border border-white/[0.08] divide-y divide-white/[0.06] overflow-hidden">
                    {stockSuggestions.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => pickStockItem(item)}
                        className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-left hover:bg-white/[0.04] touch-manipulation"
                      >
                        <span className="text-[13px] text-white truncate">
                          {item.name}
                          <span className="ml-2 text-[11px] text-white/50">
                            {item.available} in stock
                          </span>
                        </span>
                        {item.unit_cost != null && item.unit_cost > 0 && (
                          <span className="text-[12px] font-medium text-elec-yellow tabular-nums shrink-0">
                            {gbp(item.unit_cost)}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    className={inputCls}
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                  />
                  {category === 'labour' ? (
                    <input
                      type="number"
                      inputMode="decimal"
                      className={inputCls}
                      placeholder="Hours"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                    />
                  ) : category === 'material' ? (
                    <input
                      type="number"
                      inputMode="decimal"
                      className={inputCls}
                      placeholder="Qty"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  ) : (
                    <div />
                  )}
                </div>
                <input
                  type="number"
                  inputMode="decimal"
                  className={inputCls}
                  placeholder={
                    category === 'labour'
                      ? 'Hourly rate (£)'
                      : category === 'material'
                        ? 'Unit cost (£)'
                        : 'Amount (£)'
                  }
                  value={unitCost}
                  onChange={(e) => setUnitCost(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setAdding(false)}
                    className="flex-1 h-11 rounded-xl border border-white/[0.08] text-white/70 text-[13.5px] font-medium touch-manipulation"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAdd}
                    disabled={isAdding}
                    className="flex-1 h-11 rounded-xl bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation disabled:opacity-60"
                  >
                    {isAdding ? 'Saving…' : 'Add cost'}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  resetForm();
                  setAdding(true);
                }}
                className="w-full h-11 rounded-xl border border-dashed border-white/[0.15] text-[13px] font-medium text-white/70 hover:text-white hover:border-white/[0.25] transition-colors touch-manipulation"
              >
                + Log time, material or cost
              </button>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export default JobCostsSection;

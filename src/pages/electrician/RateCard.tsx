import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  usePriceList,
  PriceListItem,
  RATE_CARD_CATEGORIES,
  CATEGORY_LABELS,
  PriceListCategory,
} from '@/hooks/usePriceList';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ALL = 'All' as const;
type Filter = typeof ALL | PriceListCategory;
const FILTERS: Filter[] = [ALL, ...RATE_CARD_CATEGORIES];

function fmt(v: number) {
  return `£${v.toFixed(2)}`;
}

function numOnly(val: string) {
  return val === '' || /^\d*\.?\d*$/.test(val);
}

const EXAMPLE_ITEMS = [
  { name: 'Install double socket', unit_price: 85, unit: 'each', category: 'labour' },
  { name: 'Install light fitting', unit_price: 65, unit: 'each', category: 'labour' },
  { name: 'Consumer unit replacement', unit_price: 450, unit: 'each', category: 'labour' },
  { name: 'EICR (1-bed flat)', unit_price: 150, unit: 'each', category: 'inspection' },
  { name: 'Call-out charge', unit_price: 60, unit: 'each', category: 'call-out' },
  { name: 'EV charger installation', unit_price: 650, unit: 'each', category: 'labour' },
];

// ─── Design language (matches the specialist certificates + price book) ────
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04]';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const chipBase =
  'h-11 px-4 rounded-full border text-[13px] whitespace-nowrap transition-colors ' +
  'touch-manipulation active:scale-[0.97]';

const searchInputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent ' +
  'pl-7 pr-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow ' +
  'transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 ' +
  'focus:ring-0 focus:outline-none touch-manipulation';

const fieldCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent ' +
  'px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow ' +
  'transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 ' +
  'focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

const labelCn = 'mb-1 block text-[12px] font-medium text-white';

/** Two up from sm, three from lg — a single column of rates wastes a desktop. */
const gridCn = 'grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export default function RateCard() {
  const { items, isLoading, createItem, updateItem, deleteItem } = usePriceList();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filter>(ALL);
  const [sheetMode, setSheetMode] = useState<'add' | 'edit' | null>(null);
  const [editTarget, setEditTarget] = useState<PriceListItem | null>(null);
  const [fieldName, setFieldName] = useState('');
  const [fieldDesc, setFieldDesc] = useState('');
  const [fieldPrice, setFieldPrice] = useState('');
  const [fieldUnit, setFieldUnit] = useState('each');
  const [fieldCategory, setFieldCategory] = useState<PriceListCategory>('labour');
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PriceListItem | null>(null);

  const filtered = useMemo(() => {
    let list = items;
    if (activeFilter !== ALL) list = list.filter((i) => i.category === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) => i.name.toLowerCase().includes(q) || (i.description || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [items, activeFilter, search]);

  const grouped = useMemo(() => {
    if (activeFilter !== ALL || search.trim()) return [{ label: null, items: filtered }];
    const groups: { label: string; cat: string; items: PriceListItem[] }[] = [];
    for (const cat of RATE_CARD_CATEGORIES) {
      const catItems = items.filter((i) => i.category === cat);
      if (catItems.length) groups.push({ label: CATEGORY_LABELS[cat], cat, items: catItems });
    }
    return groups;
  }, [items, filtered, activeFilter, search]);

  /** Adding a starter rate. Kept here rather than in the markup so the "add
   *  all" path and the single-tap path cannot drift. */
  const [addingStarter, setAddingStarter] = useState<string | null>(null);

  const addStarter = async (e: (typeof EXAMPLE_ITEMS)[number]) => {
    setAddingStarter(e.name);
    try {
      await createItem({
        name: e.name,
        unit_price: e.unit_price,
        unit: e.unit,
        category: e.category as PriceListCategory,
      });
      toast({ title: 'Rate added', description: `${e.name} · ${fmt(e.unit_price)}` });
    } finally {
      setAddingStarter(null);
    }
  };

  const addAllStarters = async () => {
    setAddingStarter('__all__');
    try {
      // Sequential: each insert refetches the list, and firing six at once
      // against the same list is how you get a half-applied batch.
      for (const e of EXAMPLE_ITEMS) {
        await createItem({
          name: e.name,
          unit_price: e.unit_price,
          unit: e.unit,
          category: e.category as PriceListCategory,
        });
      }
      toast({ title: `${EXAMPLE_ITEMS.length} rates added`, description: 'Edit any of them to match your prices.' });
    } finally {
      setAddingStarter(null);
    }
  };

  const openAdd = () => {
    setSheetMode('add');
    setEditTarget(null);
    setFieldName('');
    setFieldDesc('');
    setFieldPrice('');
    setFieldUnit('each');
    setFieldCategory('labour');
  };

  const openEdit = (item: PriceListItem) => {
    setSheetMode('edit');
    setEditTarget(item);
    setFieldName(item.name);
    setFieldDesc(item.description || '');
    setFieldPrice(item.unit_price.toFixed(2));
    setFieldUnit(item.unit);
    setFieldCategory(item.category as PriceListCategory);
  };

  const closeSheet = () => {
    setSheetMode(null);
    setEditTarget(null);
  };

  const handleSave = async () => {
    if (!fieldName.trim() || !fieldPrice) return;
    const price = parseFloat(fieldPrice);
    if (isNaN(price) || price < 0) {
      toast({ title: 'Invalid price', variant: 'destructive' });
      return;
    }
    setSaving(true);
    const payload = {
      name: fieldName.trim(),
      description: fieldDesc.trim() || null,
      unit_price: price,
      unit: fieldUnit.trim() || 'each',
      category: fieldCategory,
    };
    if (sheetMode === 'add') {
      const created = await createItem(payload);
      if (created) {
        toast({ title: 'Rate added', description: fieldName.trim() });
        closeSheet();
      }
    } else if (editTarget) {
      const ok = await updateItem(editTarget.id, payload);
      if (ok) {
        toast({ title: 'Rate updated' });
        closeSheet();
      }
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteItem(deleteTarget.id);
    toast({ title: 'Rate deleted' });
    setDeleteTarget(null);
  };

  // Totals
  const totalRates = items.length;
  const avgRate = totalRates > 0 ? items.reduce((s, i) => s + i.unit_price, 0) / totalRates : 0;
  const categoryCount = new Set(items.map((i) => i.category)).size;

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="max-w-6xl mx-auto lg:px-8">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
          <div className="px-4 py-2">
            <div className="flex items-center gap-3 h-11">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1 min-w-0">
                <h1 className="text-base font-semibold text-white">Rate card</h1>
              </div>
              {items.length > 0 && (
                <Button
                  onClick={openAdd}
                  size="sm"
                  className="h-9 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold px-3"
                >
                  <Plus className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Add Rate</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="px-4 py-4 space-y-5"
        >
          {isLoading ? (
            <div className="text-center py-16 text-white text-sm">Loading...</div>
          ) : items.length === 0 ? (
            /* ── Empty state ── */
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="py-10 text-center">
                <h2 className="text-[17px] font-semibold tracking-tight text-white">No rates yet</h2>
                <p className="mx-auto mt-1.5 max-w-sm text-[13px] text-white">
                  Fixed prices for the jobs you do most. Once they're here they show up as
                  quick picks while you're building a quote.
                </p>
                <button
                  onClick={openAdd}
                  className="mt-5 h-11 rounded-xl bg-elec-yellow px-5 text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
                >
                  Add your first rate
                </button>
              </div>

              {/* Starter suggestions — tappable, not decoration. They used to be
                  a read-only list, so someone facing an empty rate card was
                  shown six sensible prices and then had to type them in by
                  hand. Every one is now one press, with typical UK prices the
                  user can edit afterwards. */}
              <div className="space-y-3">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-[15px] font-semibold tracking-tight text-white">
                    Start from a common rate
                  </h2>
                  <button
                    onClick={addAllStarters}
                    disabled={addingStarter !== null}
                    className="text-[13px] font-semibold text-elec-yellow underline underline-offset-2 disabled:opacity-50 touch-manipulation"
                  >
                    Add all {EXAMPLE_ITEMS.length}
                  </button>
                </div>
                <p className="text-[12px] text-white">
                  Typical UK prices — add one and edit it to match what you charge.
                </p>
                <div className={gridCn}>
                  {EXAMPLE_ITEMS.map((e) => (
                    <button
                      key={e.name}
                      onClick={() => addStarter(e)}
                      disabled={addingStarter !== null}
                      className={cn(
                        cardCn,
                        'flex flex-col p-4 text-left transition-colors hover:from-white/[0.10] hover:to-white/[0.06] disabled:opacity-50 touch-manipulation active:scale-[0.99]'
                      )}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                        {CATEGORY_LABELS[e.category as PriceListCategory]}
                      </p>
                      <p className="mt-1 flex-1 text-[15px] font-semibold leading-snug tracking-tight text-white">
                        {e.name}
                      </p>
                      <div className="mt-3 flex items-baseline justify-between border-t border-white/[0.10] pt-3">
                        <span className="text-[20px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
                          {fmt(e.unit_price)}
                        </span>
                        <span className="text-[12px] font-semibold text-elec-yellow">
                          {addingStarter === e.name ? 'Adding…' : 'Add'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── Has rates ── */
            <>
              {/* KPI Strip */}
              <motion.div variants={itemVariants} className={cn(cardCn, 'grid grid-cols-3 overflow-hidden')}>
                <div className="px-3 py-3.5 sm:px-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Rates</p>
                  <p className="mt-1 text-[20px] font-bold leading-none tracking-tight text-white tabular-nums">{totalRates}</p>
                </div>
                <div className="border-l border-white/[0.10] px-3 py-3.5 sm:px-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Average</p>
                  <p className="mt-1 text-[20px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">{fmt(avgRate)}</p>
                </div>
                <div className="border-l border-white/[0.10] px-3 py-3.5 sm:px-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Categories</p>
                  <p className="mt-1 text-[20px] font-bold leading-none tracking-tight text-white tabular-nums">{categoryCount}</p>
                </div>
              </motion.div>

              {/* Search */}
              <motion.div variants={itemVariants} className="relative">
                <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                <input
                  type="text"
                  placeholder="Search your rates"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={searchInputCn}
                />
              </motion.div>

              {/* Category pills */}
              <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={cn(chipBase, activeFilter === f ? chipOn : chipOff)}
                  >
                    {f === ALL ? 'All' : CATEGORY_LABELS[f as PriceListCategory]}
                  </button>
                ))}
              </motion.div>

              {/* Items */}
              {filtered.length === 0 ? (
                <p className="text-center py-8 text-white text-sm">No matching rates.</p>
              ) : (
                <div className="space-y-6">
                  {grouped.map((group) => (
                    <motion.section key={group.label ?? 'all'} variants={itemVariants} className="space-y-3">
                      {group.label && (
                        <h2 className="text-[15px] font-semibold tracking-tight text-white">
                          {group.label}
                        </h2>
                      )}
                      {/* Two up from sm, three from lg. flex-col + flex-1 so a
                          long rate name never leaves one card taller than its
                          neighbours with the buttons out of line. */}
                      <div className={gridCn}>
                        {group.items.map((item) => (
                          <div key={item.id} className={cn(cardCn, 'flex flex-col p-4 sm:p-5')}>
                            <div className="flex-1">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                                {CATEGORY_LABELS[item.category as PriceListCategory] || item.category}
                              </p>
                              <p className="mt-1 text-[15px] font-semibold leading-snug tracking-tight text-white">
                                {item.name}
                              </p>
                              {item.description && (
                                <p className="mt-1 text-[12px] text-white line-clamp-2">{item.description}</p>
                              )}
                            </div>

                            <div className="mt-3 flex items-baseline justify-between border-t border-white/[0.10] pt-3">
                              <span className="text-[20px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
                                {fmt(item.unit_price)}
                              </span>
                              <span className="text-[12px] text-white">per {item.unit}</span>
                            </div>

                            <div className="mt-3 flex items-center gap-2">
                              <button
                                onClick={() => openEdit(item)}
                                className="h-11 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98]"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => setDeleteTarget(item)}
                                className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-[13px] font-medium text-red-300 transition-colors hover:bg-red-500/10 touch-manipulation active:scale-[0.98]"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.section>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.main>
      </div>

      {/* Add / Edit Sheet */}
      <Sheet open={!!sheetMode} onOpenChange={(open) => { if (!open) closeSheet(); }}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl overflow-y-auto bg-[#111114]">
          <SheetHeader>
            <SheetTitle className="text-[17px] font-semibold tracking-tight text-white">
              {sheetMode === 'add' ? 'Add a rate' : 'Edit rate'}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-5 space-y-5 pb-6">
            <div>
              <label className={labelCn}>Job or service</label>
              <input
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                placeholder="e.g. Install double socket"
                className={fieldCn}
              />
            </div>
            <div>
              <label className={labelCn}>What it covers</label>
              <input
                value={fieldDesc}
                onChange={(e) => setFieldDesc(e.target.value)}
                placeholder="Optional — e.g. back box, faceplate, wiring"
                className={fieldCn}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className={labelCn}>Price (£)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={fieldPrice}
                  placeholder="0.00"
                  onChange={(e) => { if (numOnly(e.target.value)) setFieldPrice(e.target.value); }}
                  className={cn(fieldCn, 'tabular-nums')}
                />
              </div>
              <div>
                <label className={labelCn}>Unit</label>
                <input
                  value={fieldUnit}
                  onChange={(e) => setFieldUnit(e.target.value)}
                  placeholder="each"
                  className={fieldCn}
                />
              </div>
            </div>

            {/* Chips rather than a dropdown: five short options, and a chip is
                one tap where a select is tap, scroll, tap. */}
            <div>
              <label className={labelCn}>Category</label>
              <div className="flex flex-wrap gap-2">
                {RATE_CARD_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFieldCategory(cat)}
                    className={cn(chipBase, fieldCategory === cat ? chipOn : chipOff)}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={!fieldName.trim() || !fieldPrice || saving}
              className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:opacity-40 touch-manipulation active:scale-[0.99]"
            >
              {saving ? 'Saving…' : sheetMode === 'add' ? 'Add rate' : 'Save changes'}
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete confirm */}
      <Sheet open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <SheetContent side="bottom" className="h-auto rounded-t-2xl">
          <SheetHeader>
            <SheetTitle className="text-white">Delete rate?</SheetTitle>
          </SheetHeader>
          <div className="mt-4 pb-6 space-y-4">
            <p className="text-white text-sm">
              Remove <span className="text-white font-medium">"{deleteTarget?.name}"</span> from your rate card?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 h-11 border-white/10 text-white bg-transparent touch-manipulation"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className="flex-1 h-11 bg-red-500 hover:bg-red-600 text-white font-semibold touch-manipulation"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Pencil, Trash2, Tag, Receipt, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

const CATEGORY_ICONS: Record<string, { color: string; bg: string; border: string }> = {
  labour: { color: 'text-elec-yellow', bg: 'bg-elec-yellow/10', border: 'border-elec-yellow/20' },
  'call-out': { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  materials: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  inspection: { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  other: { color: 'text-white', bg: 'bg-white/[0.05]', border: 'border-white/[0.08]' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
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
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                  <Receipt className="h-4 w-4 text-elec-yellow" />
                </div>
                <h1 className="text-base font-semibold text-white">Rate Card</h1>
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
            <motion.div variants={itemVariants} className="space-y-5">
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
                  <Receipt className="h-8 w-8 text-elec-yellow" />
                </div>
                <h2 className="text-base font-semibold text-white mb-1">No Rates Yet</h2>
                <p className="text-white text-xs mb-5 max-w-xs mx-auto">
                  Add your fixed prices for common jobs. They'll appear as quick-pick options in the quote builder.
                </p>
                <Button
                  onClick={openAdd}
                  className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  Add Your First Rate
                </Button>
              </div>

              {/* Starter suggestions */}
              <div className="space-y-3">
                <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
                  Common Rates to Get Started
                </h2>
                <div className="space-y-2">
                  {EXAMPLE_ITEMS.map((e) => (
                    <div key={e.name} className="card-surface p-3.5 flex items-center gap-3">
                      <div className={cn('p-2 rounded-xl', CATEGORY_ICONS[e.category].bg, CATEGORY_ICONS[e.category].border)}>
                        <Tag className={cn('h-4 w-4', CATEGORY_ICONS[e.category].color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">{e.name}</p>
                        <p className="text-[10px] text-white mt-0.5">{CATEGORY_LABELS[e.category as PriceListCategory]}</p>
                      </div>
                      <span className="text-sm font-bold text-elec-yellow flex-shrink-0">{fmt(e.unit_price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── Has rates ── */
            <>
              {/* KPI Strip */}
              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2">
                <div className="card-surface p-3 flex flex-col items-center">
                  <span className="text-lg font-bold text-white">{totalRates}</span>
                  <span className="text-[10px] text-white uppercase tracking-wider">Rates</span>
                </div>
                <div className="card-surface p-3 flex flex-col items-center">
                  <span className="text-lg font-bold text-elec-yellow">{fmt(avgRate)}</span>
                  <span className="text-[10px] text-white uppercase tracking-wider">Avg Rate</span>
                </div>
                <div className="card-surface p-3 flex flex-col items-center">
                  <span className="text-lg font-bold text-white">{categoryCount}</span>
                  <span className="text-[10px] text-white uppercase tracking-wider">Categories</span>
                </div>
              </motion.div>

              {/* Search */}
              <motion.div variants={itemVariants} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                <Input
                  placeholder="Search rates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 pl-10 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow touch-manipulation"
                />
              </motion.div>

              {/* Category pills */}
              <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={cn(
                      'h-9 px-3.5 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-manipulation active:scale-[0.97]',
                      activeFilter === f
                        ? 'bg-elec-yellow text-black'
                        : 'bg-white/[0.05] text-white border border-white/[0.08]'
                    )}
                  >
                    {f === ALL ? 'All' : CATEGORY_LABELS[f as PriceListCategory]}
                  </button>
                ))}
              </motion.div>

              {/* Items */}
              {filtered.length === 0 ? (
                <p className="text-center py-8 text-white text-sm">No matching rates.</p>
              ) : (
                <div className="space-y-5">
                  {grouped.map((group) => {
                    const catStyle = CATEGORY_ICONS[(group as any).cat] || CATEGORY_ICONS.other;
                    return (
                      <motion.section key={group.label ?? 'all'} variants={itemVariants} className="space-y-2">
                        {group.label && (
                          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
                            {group.label}
                          </h2>
                        )}
                        <div className="space-y-2">
                          {group.items.map((item) => {
                            const style = CATEGORY_ICONS[item.category] || CATEGORY_ICONS.other;
                            return (
                              <div
                                key={item.id}
                                className="group card-surface-interactive p-4 touch-manipulation"
                              >
                                <div className="flex items-center gap-3">
                                  <div className={cn('p-2 rounded-xl flex-shrink-0', style.bg, style.border)}>
                                    <Tag className={cn('h-4 w-4', style.color)} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white line-clamp-1">
                                      {item.name}
                                    </p>
                                    {item.description && (
                                      <p className="text-[11px] text-white mt-0.5 line-clamp-1">
                                        {item.description}
                                      </p>
                                    )}
                                    <p className="text-[10px] text-white mt-0.5">
                                      per {item.unit}
                                    </p>
                                  </div>
                                  <span className="text-lg font-bold text-elec-yellow flex-shrink-0">
                                    {fmt(item.unit_price)}
                                  </span>
                                </div>

                                {/* Actions row */}
                                <div className="flex items-center justify-end gap-1 mt-2 pt-2 border-t border-white/[0.04]">
                                  <button
                                    onClick={() => openEdit(item)}
                                    className="h-9 px-3 rounded-full flex items-center gap-1.5 text-xs font-medium text-white active:bg-white/[0.05] touch-manipulation"
                                  >
                                    <Pencil className="h-3 w-3" />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => setDeleteTarget(item)}
                                    className="h-9 px-3 rounded-full flex items-center gap-1.5 text-xs font-medium text-red-400 active:bg-red-500/10 touch-manipulation"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                    Delete
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.section>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </motion.main>
      </div>

      {/* Add / Edit Sheet */}
      <Sheet open={!!sheetMode} onOpenChange={(open) => { if (!open) closeSheet(); }}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              {sheetMode === 'add' ? <Plus className="h-5 w-5" /> : <Pencil className="h-5 w-5" />}
              {sheetMode === 'add' ? 'Add Rate' : 'Edit Rate'}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4 pb-6">
            <div>
              <label className="text-xs text-white mb-1 block">Job / Service Name *</label>
              <Input
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                placeholder="e.g., Install double socket"
                className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white touch-manipulation"
              />
            </div>
            <div>
              <label className="text-xs text-white mb-1 block">Description (optional)</label>
              <Input
                value={fieldDesc}
                onChange={(e) => setFieldDesc(e.target.value)}
                placeholder="e.g., Includes back box, faceplate, wiring"
                className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white touch-manipulation"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-white mb-1 block">Price (£) *</label>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={fieldPrice}
                  placeholder="0.00"
                  onChange={(e) => { if (numOnly(e.target.value)) setFieldPrice(e.target.value); }}
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white touch-manipulation"
                />
              </div>
              <div>
                <label className="text-xs text-white mb-1 block">Unit</label>
                <Input
                  value={fieldUnit}
                  onChange={(e) => setFieldUnit(e.target.value)}
                  placeholder="each"
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white touch-manipulation"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-white mb-1 block">Category</label>
              <Select value={fieldCategory} onValueChange={(v) => setFieldCategory(v as PriceListCategory)}>
                <SelectTrigger className="h-11 bg-white/[0.03] border-white/[0.08] text-white touch-manipulation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(0,0%,12%)] border-white/[0.08]">
                  {RATE_CARD_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-white focus:bg-white/10">
                      {CATEGORY_LABELS[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleSave}
              disabled={!fieldName.trim() || !fieldPrice || saving}
              className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-40"
            >
              {saving ? 'Saving...' : sheetMode === 'add' ? 'Add Rate' : 'Save Changes'}
            </Button>
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

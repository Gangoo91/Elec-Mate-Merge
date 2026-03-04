import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Search,
  Pencil,
  Trash2,
  Tag,
  Receipt,
  X,
  Check,
} from 'lucide-react';
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
import { cn } from '@/lib/utils';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ALL = 'All' as const;
type Filter = typeof ALL | PriceListCategory;

const FILTERS: Filter[] = [ALL, ...RATE_CARD_CATEGORIES];

function fmt(v: number) {
  return `£${v.toFixed(2)}`;
}

function numOnly(val: string) {
  return val === '' || /^\d*\.?\d*$/.test(val);
}

// ─── Default items shown when rate card is empty ──────────────────────────────

const EXAMPLE_ITEMS = [
  { name: 'Install double socket', unit_price: 85, unit: 'each', category: 'labour' },
  { name: 'Install light fitting', unit_price: 65, unit: 'each', category: 'labour' },
  { name: 'Consumer unit replacement', unit_price: 450, unit: 'each', category: 'labour' },
  { name: 'EICR (1-bed flat)', unit_price: 150, unit: 'each', category: 'inspection' },
  { name: 'Call-out charge', unit_price: 60, unit: 'each', category: 'call-out' },
  { name: 'EV charger installation', unit_price: 650, unit: 'each', category: 'labour' },
];

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="text-center py-10">
      <Receipt className="h-14 w-14 text-gray-600 mx-auto mb-4" />
      <h2 className="text-lg font-semibold text-white mb-2">No rates yet</h2>
      <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
        Add your fixed prices for common jobs. They'll appear as quick-pick options in the quote builder.
      </p>
      <p className="text-xs text-gray-600 mb-3">Common rates to get you started:</p>
      <div className="space-y-1.5 max-w-xs mx-auto mb-6 text-left">
        {EXAMPLE_ITEMS.map((e) => (
          <div key={e.name} className="flex justify-between text-xs px-3 py-2 bg-white/[0.03] rounded-lg border border-white/[0.05]">
            <span className="text-gray-400">{e.name}</span>
            <span className="text-elec-yellow font-medium">{fmt(e.unit_price)}</span>
          </div>
        ))}
      </div>
      <Button
        onClick={onAdd}
        className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Your First Rate
      </Button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function RateCard() {
  const { items, isLoading, createItem, updateItem, deleteItem } = usePriceList();
  const { toast } = useToast();
  const navigate = useNavigate();

  // ── Filters ──
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filter>(ALL);

  // ── Add / edit sheet ──
  const [sheetMode, setSheetMode] = useState<'add' | 'edit' | null>(null);
  const [editTarget, setEditTarget] = useState<PriceListItem | null>(null);
  const [fieldName, setFieldName] = useState('');
  const [fieldDesc, setFieldDesc] = useState('');
  const [fieldPrice, setFieldPrice] = useState('');
  const [fieldUnit, setFieldUnit] = useState('each');
  const [fieldCategory, setFieldCategory] = useState<PriceListCategory>('labour');
  const [saving, setSaving] = useState(false);

  // ── Delete confirm ──
  const [deleteTarget, setDeleteTarget] = useState<PriceListItem | null>(null);

  // ── Filtered items ──
  const filtered = useMemo(() => {
    let list = items;
    if (activeFilter !== ALL) list = list.filter(i => i.category === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.name.toLowerCase().includes(q) ||
        (i.description || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [items, activeFilter, search]);

  // ── Group by category for display ──
  const grouped = useMemo(() => {
    if (activeFilter !== ALL || search.trim()) {
      return [{ label: null, items: filtered }];
    }
    const groups: { label: string; items: PriceListItem[] }[] = [];
    for (const cat of RATE_CARD_CATEGORIES) {
      const catItems = items.filter(i => i.category === cat);
      if (catItems.length) groups.push({ label: CATEGORY_LABELS[cat], items: catItems });
    }
    return groups;
  }, [items, filtered, activeFilter, search]);

  // ── Sheet helpers ──
  const openAdd = () => {
    setSheetMode('add');
    setEditTarget(null);
    setFieldName(''); setFieldDesc(''); setFieldPrice('');
    setFieldUnit('each'); setFieldCategory('labour');
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

  const closeSheet = () => { setSheetMode(null); setEditTarget(null); };

  const handleSave = async () => {
    if (!fieldName.trim() || !fieldPrice) return;
    const price = parseFloat(fieldPrice);
    if (isNaN(price) || price < 0) {
      toast({ title: 'Invalid price', variant: 'destructive' }); return;
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

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="bg-background pb-24 sm:pb-8 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost" size="sm" onClick={() => navigate(-1)}
            className="mb-3 -ml-2 touch-manipulation h-10 text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />Back
          </Button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-xl">
                <Receipt className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">My Rate Card</h1>
                <p className="text-gray-400 text-sm">
                  {items.length} {items.length === 1 ? 'rate' : 'rates'}
                </p>
              </div>
            </div>
            {items.length > 0 && (
              <Button
                onClick={openAdd}
                className="h-10 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
              >
                <Plus className="h-4 w-4 mr-1.5" />Add Rate
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 space-y-3">
        {isLoading ? (
          <div className="text-center py-16 text-gray-500 text-sm">Loading...</div>
        ) : items.length === 0 ? (
          <EmptyState onAdd={openAdd} />
        ) : (
          <>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search rates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 pl-10 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 focus:border-elec-yellow touch-manipulation"
              />
            </div>

            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-manipulation active:scale-[0.97]',
                    activeFilter === f
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/[0.05] text-gray-400 border border-white/[0.08]'
                  )}
                >
                  {f === ALL ? 'All' : CATEGORY_LABELS[f as PriceListCategory]}
                </button>
              ))}
            </div>

            {/* Items — grouped by category when no filter active */}
            {filtered.length === 0 ? (
              <p className="text-center py-8 text-gray-500 text-sm">No matching rates.</p>
            ) : (
              <div className="space-y-4">
                {grouped.map((group) => (
                  <div key={group.label ?? 'all'}>
                    {group.label && (
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="h-3.5 w-3.5 text-gray-500" />
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {group.label}
                        </p>
                      </div>
                    )}
                    <div className="space-y-2">
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06] flex items-center gap-3"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white line-clamp-1">{item.name}</p>
                            {item.description && (
                              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.description}</p>
                            )}
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <p className="text-sm font-bold text-elec-yellow">
                              {fmt(item.unit_price)}
                            </p>
                            <p className="text-[11px] text-gray-500">per {item.unit}</p>
                          </div>
                          <div className="flex gap-1 flex-shrink-0">
                            <button
                              onClick={() => openEdit(item)}
                              className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.05] touch-manipulation"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(item)}
                              className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 touch-manipulation"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* FAB */}
      {items.length > 0 && (
        <button
          onClick={openAdd}
          className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 w-14 h-14 rounded-full bg-elec-yellow flex items-center justify-center shadow-lg shadow-elec-yellow/30 touch-manipulation active:scale-95 transition-transform z-50"
          aria-label="Add rate"
        >
          <Plus className="h-6 w-6 text-black" />
        </button>
      )}

      {/* ── Add / Edit Sheet ── */}
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
              <label className="text-xs text-gray-400 mb-1 block">Job / Service Name *</label>
              <Input
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                placeholder="e.g., Install double socket"
                className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1 block">Description (optional)</label>
              <Input
                value={fieldDesc}
                onChange={(e) => setFieldDesc(e.target.value)}
                placeholder="e.g., Includes back box, faceplate, wiring"
                className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Price (£) *</label>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={fieldPrice}
                  placeholder="0.00"
                  onChange={(e) => { if (numOnly(e.target.value)) setFieldPrice(e.target.value); }}
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Unit</label>
                <Input
                  value={fieldUnit}
                  onChange={(e) => setFieldUnit(e.target.value)}
                  placeholder="each"
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1 block">Category</label>
              <Select
                value={fieldCategory}
                onValueChange={(v) => setFieldCategory(v as PriceListCategory)}
              >
                <SelectTrigger className="h-11 bg-white/[0.03] border-white/[0.08] text-white touch-manipulation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1e] border-white/[0.08]">
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

      {/* ── Delete confirm sheet ── */}
      <Sheet open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <SheetContent side="bottom" className="h-auto rounded-t-2xl">
          <SheetHeader>
            <SheetTitle className="text-white">Delete rate?</SheetTitle>
          </SheetHeader>
          <div className="mt-4 pb-6 space-y-4">
            <p className="text-gray-400 text-sm">
              Remove <span className="text-white font-medium">"{deleteTarget?.name}"</span> from your rate card? This can't be undone.
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
                <Trash2 className="h-4 w-4 mr-2" />Delete
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

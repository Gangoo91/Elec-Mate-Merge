import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Search,
  Plus,
  Package,
  Pencil,
  AlertTriangle,
  Clock,
  Zap,
  Layers,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Trash2,
  X,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useMaterialsLists, MaterialsListItem } from '@/hooks/useMaterialsLists';
import { usePriceBookSettings } from '@/hooks/usePriceBookSettings';
import { usePriceBookBundles, PriceBookBundle, BundleLineItem } from '@/hooks/usePriceBookBundles';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// ─── Constants ────────────────────────────────────────────────────────────────

const STALE_DAYS = 60;

const CATEGORIES = ['All', 'Cable', 'Accessories', 'Tools', 'Safety', 'General'] as const;
type Category = (typeof CATEGORIES)[number];

const TABS = ['Items', 'Bundles'] as const;
type Tab = (typeof TABS)[number];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function deriveCategory(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('cable') || n.includes('wire') || n.includes('flex') || n.includes('t&e') || n.includes('swa'))
    return 'Cable';
  if (n.includes('socket') || n.includes('switch') || n.includes('connector') || n.includes('terminal') || n.includes('plate'))
    return 'Accessories';
  if (n.includes('tool') || n.includes('drill') || n.includes('screwdriver') || n.includes('plier') || n.includes('tester') || n.includes('multimeter'))
    return 'Tools';
  if (n.includes('safety') || n.includes('ppe') || n.includes('glove') || n.includes('goggle') || n.includes('helmet') || n.includes('hi-vis'))
    return 'Safety';
  return 'General';
}

function daysOld(isoDate?: string): number | null {
  if (!isoDate) return null;
  const diff = Date.now() - new Date(isoDate).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function formatGBP(v: number) {
  return `£${v.toFixed(2)}`;
}

function numInput(val: string, setter: (v: string) => void) {
  if (val === '' || /^\d*\.?\d*$/.test(val)) setter(val);
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface PricedItem {
  item: MaterialsListItem;
  listId: string;
  listName: string;
}

// ─── Sub-component ────────────────────────────────────────────────────────────

function StalenessChip({ days }: { days: number | null }) {
  if (days === null || days < STALE_DAYS) return null;
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-400/10 rounded-full px-2 py-0.5">
      <Clock className="h-2.5 w-2.5" />
      {days}d old
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PriceBook() {
  const { lists, updateItemDetails, addItem, createList } = useMaterialsLists();
  const { settings, updateMarkup, calcSellPrice } = usePriceBookSettings();
  const { bundles, createBundle, deleteBundle, bundleTotal } = usePriceBookBundles();
  const { toast } = useToast();
  const navigate = useNavigate();

  // ── Tab + category ──
  const [tab, setTab] = useState<Tab>('Items');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  // ── Edit item sheet ──
  const [editSheet, setEditSheet] = useState<PricedItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editCostPrice, setEditCostPrice] = useState('');
  const [editSellPrice, setEditSellPrice] = useState('');
  const [editMarkup, setEditMarkup] = useState('');
  const [editUnit, setEditUnit] = useState('');
  const [editSupplier, setEditSupplier] = useState('');
  const [editMode, setEditMode] = useState<'cost' | 'sell'>('cost');

  // ── Add item sheet ──
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCostPrice, setNewCostPrice] = useState('');
  const [newSellPrice, setNewSellPrice] = useState('');
  const [newUnit, setNewUnit] = useState('each');
  const [newSupplier, setNewSupplier] = useState('');
  const [newMode, setNewMode] = useState<'cost' | 'sell'>('cost');

  // ── Global markup inline edit ──
  const [editingMarkup, setEditingMarkup] = useState(false);
  const [markupInput, setMarkupInput] = useState('');

  // ── Bundle sheet ──
  const [bundleSheetOpen, setBundleSheetOpen] = useState(false);
  const [bundleName, setBundleName] = useState('');
  const [bundleDesc, setBundleDesc] = useState('');
  const [bundleLabourHours, setBundleLabourHours] = useState('');
  const [bundleItems, setBundleItems] = useState<BundleLineItem[]>([]);
  const [expandedBundle, setExpandedBundle] = useState<string | null>(null);

  // ── Computed ──
  const pricedItems = useMemo<PricedItem[]>(() => {
    const result: PricedItem[] = [];
    for (const list of lists) {
      for (const item of list.items) {
        if ((item.estimated_price ?? 0) > 0 || (item.cost_price ?? 0) > 0) {
          result.push({ item, listId: list.id, listName: list.name });
        }
      }
    }
    return result;
  }, [lists]);

  const staleCount = useMemo(
    () => pricedItems.filter((p) => (daysOld(p.item.price_updated_at) ?? 0) >= STALE_DAYS).length,
    [pricedItems]
  );

  const filtered = useMemo(() => {
    let items = pricedItems;
    if (activeCategory !== 'All') items = items.filter((p) => deriveCategory(p.item.name) === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((p) => p.item.name.toLowerCase().includes(q));
    }
    return items;
  }, [pricedItems, activeCategory, search]);

  // ─── Sell price derivation ──────────────────────────────────────────────────

  const getSellPrice = useCallback(
    (item: MaterialsListItem): number => {
      if ((item.estimated_price ?? 0) > 0) return item.estimated_price!;
      if ((item.cost_price ?? 0) > 0) return calcSellPrice(item.cost_price!, item.markup_percent);
      return 0;
    },
    [calcSellPrice]
  );

  // ─── Edit sheet ─────────────────────────────────────────────────────────────

  const openEditSheet = (p: PricedItem) => {
    const { item } = p;
    setEditSheet(p);
    setEditName(item.name);
    setEditUnit(item.unit || 'each');
    setEditSupplier(item.supplier || '');
    if ((item.cost_price ?? 0) > 0) {
      setEditMode('cost');
      setEditCostPrice(item.cost_price!.toFixed(2));
      setEditMarkup((item.markup_percent ?? settings.globalMarkupPercent).toFixed(0));
      setEditSellPrice(calcSellPrice(item.cost_price!, item.markup_percent).toFixed(2));
    } else {
      setEditMode('sell');
      setEditCostPrice('');
      setEditMarkup('');
      setEditSellPrice((item.estimated_price ?? 0).toFixed(2));
    }
  };

  const handleEditCostChange = (val: string) => {
    if (val !== '' && !/^\d*\.?\d*$/.test(val)) return;
    setEditCostPrice(val);
    const cost = parseFloat(val);
    const markup = parseFloat(editMarkup) || settings.globalMarkupPercent;
    if (!isNaN(cost) && cost > 0) setEditSellPrice(calcSellPrice(cost, markup).toFixed(2));
  };

  const handleEditMarkupChange = (val: string) => {
    if (val !== '' && !/^\d*\.?\d*$/.test(val)) return;
    setEditMarkup(val);
    const cost = parseFloat(editCostPrice);
    const markup = parseFloat(val);
    if (!isNaN(cost) && cost > 0 && !isNaN(markup)) setEditSellPrice(calcSellPrice(cost, markup).toFixed(2));
  };

  const handleSaveEdit = async () => {
    if (!editSheet) return;
    const updates: Partial<MaterialsListItem> = {
      name: editName.trim() || editSheet.item.name,
      unit: editUnit.trim() || 'each',
      supplier: editSupplier.trim() || undefined,
    };
    if (editMode === 'cost') {
      const cost = parseFloat(editCostPrice);
      if (isNaN(cost) || cost <= 0) { toast({ title: 'Invalid cost price', variant: 'destructive' }); return; }
      const markup = parseFloat(editMarkup);
      updates.cost_price = cost;
      updates.markup_percent = isNaN(markup) ? settings.globalMarkupPercent : markup;
      updates.estimated_price = calcSellPrice(cost, updates.markup_percent);
    } else {
      const sell = parseFloat(editSellPrice);
      if (isNaN(sell) || sell <= 0) { toast({ title: 'Invalid sell price', variant: 'destructive' }); return; }
      updates.estimated_price = sell;
      updates.cost_price = undefined;
      updates.markup_percent = undefined;
    }
    await updateItemDetails(editSheet.listId, editSheet.item.id, updates);
    toast({ title: 'Item updated' });
    setEditSheet(null);
  };

  // ─── Add item ───────────────────────────────────────────────────────────────

  const handleAddItem = async () => {
    if (!newName.trim()) return;

    let list = lists.find((l) => l.name === 'Price Book');
    if (!list) {
      const created = await createList('Price Book', 'Items added directly to My Price Book');
      if (!created) return;
      list = created;
    }

    if (newMode === 'cost') {
      const cost = parseFloat(newCostPrice);
      if (isNaN(cost) || cost <= 0) { toast({ title: 'Invalid cost price', variant: 'destructive' }); return; }
      const sellPrice = calcSellPrice(cost, settings.globalMarkupPercent);
      await addItem(list.id, {
        name: newName.trim(),
        current_price: sellPrice,
        cost_price: cost,
        markup_percent: settings.globalMarkupPercent,
        supplier_name: newSupplier.trim() || undefined,
      });
      toast({ title: 'Item added', description: `${newName.trim()} → sell ${formatGBP(sellPrice)}` });
    } else {
      const sell = parseFloat(newSellPrice);
      if (isNaN(sell) || sell <= 0) { toast({ title: 'Invalid sell price', variant: 'destructive' }); return; }
      await addItem(list.id, {
        name: newName.trim(),
        current_price: sell,
        supplier_name: newSupplier.trim() || undefined,
      });
      toast({ title: 'Item added', description: `${newName.trim()} → ${formatGBP(sell)}` });
    }

    setNewName(''); setNewCostPrice(''); setNewSellPrice('');
    setNewUnit('each'); setNewSupplier('');
    setAddSheetOpen(false);
  };

  // ─── Global markup ──────────────────────────────────────────────────────────

  const handleSaveMarkup = () => {
    const v = parseFloat(markupInput);
    if (!isNaN(v) && v >= 0) { updateMarkup(v); toast({ title: `Markup set to ${v}%` }); }
    setEditingMarkup(false);
  };

  // ─── Bundle creation ────────────────────────────────────────────────────────

  const addBundleItemFromPriceBook = (p: PricedItem) => {
    setBundleItems((prev) => [...prev, {
      id: crypto.randomUUID(),
      name: p.item.name,
      quantity: 1,
      unit: p.item.unit || 'each',
      unitPrice: getSellPrice(p.item),
      category: 'materials',
    }]);
  };

  const addBundleLabourLine = () => {
    setBundleItems((prev) => [...prev, {
      id: crypto.randomUUID(),
      name: 'Labour',
      quantity: 1,
      unit: 'hr',
      unitPrice: 0,
      category: 'labour',
    }]);
  };

  const updateBundleItemField = (id: string, field: 'quantity' | 'unitPrice' | 'name', raw: string) => {
    setBundleItems((prev) => prev.map((i) => {
      if (i.id !== id) return i;
      if (field === 'name') return { ...i, name: raw };
      const v = parseFloat(raw);
      if (!isNaN(v) && v >= 0) return { ...i, [field]: field === 'quantity' ? Math.max(1, v) : v };
      return i;
    }));
  };

  const removeBundleItem = (id: string) => setBundleItems((prev) => prev.filter((i) => i.id !== id));

  const handleCreateBundle = () => {
    if (!bundleName.trim() || bundleItems.length === 0) return;
    createBundle(bundleName, bundleItems, {
      description: bundleDesc || undefined,
      labourHours: parseFloat(bundleLabourHours) || undefined,
    });
    toast({ title: 'Bundle saved', description: bundleName });
    setBundleName(''); setBundleDesc(''); setBundleLabourHours('');
    setBundleItems([]); setBundleSheetOpen(false);
  };

  const resetBundleSheet = () => {
    setBundleName(''); setBundleDesc(''); setBundleLabourHours('');
    setBundleItems([]); setBundleSheetOpen(false);
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="bg-background pb-20 sm:pb-8 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}
            className="mb-3 -ml-2 touch-manipulation h-10 text-white">
            <ArrowLeft className="h-4 w-4 mr-1.5" />Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-xl">
              <BookOpen className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">My Price Book</h1>
              <div className="flex items-center gap-2">
                <p className="text-gray-400 text-sm">
                  {pricedItems.length} items · {bundles.length} bundles
                </p>
                {staleCount > 0 && (
                  <span className="text-[11px] text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />{staleCount} stale
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Markup banner */}
      <div className="bg-white/[0.02] border-b border-white/[0.06]">
        <div className="container mx-auto px-4 py-2.5 flex items-center justify-between">
          <span className="text-sm text-gray-400">Global markup on cost price</span>
          {editingMarkup ? (
            <div className="flex items-center gap-2">
              <Input
                type="text" inputMode="decimal" value={markupInput} autoFocus
                onChange={(e) => numInput(e.target.value, setMarkupInput)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSaveMarkup(); if (e.key === 'Escape') setEditingMarkup(false); }}
                className="h-8 w-20 text-right bg-white/[0.05] border-white/[0.1] text-white text-sm"
              />
              <span className="text-sm text-white">%</span>
              <button onClick={handleSaveMarkup} className="p-1 text-elec-yellow touch-manipulation"><Check className="h-4 w-4" /></button>
              <button onClick={() => setEditingMarkup(false)} className="p-1 text-gray-500 touch-manipulation"><X className="h-4 w-4" /></button>
            </div>
          ) : (
            <button onClick={() => { setMarkupInput(settings.globalMarkupPercent.toFixed(0)); setEditingMarkup(true); }}
              className="flex items-center gap-1.5 text-elec-yellow font-semibold text-sm touch-manipulation">
              {settings.globalMarkupPercent}%
              <Pencil className="h-3 w-3 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4">
        <div className="flex border-b border-white/[0.08] mb-4">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={cn(
                'px-4 py-3 text-sm font-medium transition-colors touch-manipulation border-b-2 -mb-px',
                tab === t ? 'text-white border-elec-yellow' : 'text-gray-500 border-transparent hover:text-gray-300'
              )}>
              {t}
              {t === 'Bundles' && bundles.length > 0 && (
                <Badge className="ml-1.5 h-4 w-4 p-0 text-[9px] bg-elec-yellow/20 text-elec-yellow border-0">
                  {bundles.length}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Items Tab ── */}
      {tab === 'Items' && (
        <div className="container mx-auto px-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="h-11 pl-10 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 focus:border-elec-yellow touch-manipulation" />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-manipulation active:scale-[0.97]',
                  activeCategory === cat ? 'bg-elec-yellow text-black' : 'bg-white/[0.05] text-gray-400 border border-white/[0.08]'
                )}>
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-14 w-14 text-gray-600 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-white mb-2">
                {pricedItems.length === 0 ? 'No priced items yet' : 'No matching items'}
              </h2>
              <p className="text-gray-400 mb-6 max-w-sm mx-auto text-sm">
                {pricedItems.length === 0
                  ? 'Add prices to your materials lists, or tap + to add items here.'
                  : 'Try a different search or category.'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((p) => {
                const sellPrice = getSellPrice(p.item);
                const hasCost = (p.item.cost_price ?? 0) > 0;
                const days = daysOld(p.item.price_updated_at);
                const stale = (days ?? 0) >= STALE_DAYS;
                return (
                  <button key={`${p.listId}-${p.item.id}`} onClick={() => openEditSheet(p)}
                    className={cn(
                      'w-full text-left p-3.5 bg-white/[0.03] rounded-xl border touch-manipulation active:scale-[0.99] transition-all',
                      stale ? 'border-amber-500/30' : 'border-white/[0.06]'
                    )}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-medium text-white line-clamp-1 flex-1">{p.item.name}</p>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-elec-yellow">
                          {formatGBP(sellPrice)} / {p.item.unit || 'each'}
                        </p>
                        {hasCost && (
                          <p className="text-[11px] text-gray-500">
                            cost {formatGBP(p.item.cost_price!)} · {(p.item.markup_percent ?? settings.globalMarkupPercent).toFixed(0)}% markup
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {p.item.supplier && <span className="text-xs text-gray-400">{p.item.supplier}</span>}
                      <StalenessChip days={days} />
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-white/[0.1] text-gray-500 ml-auto">
                        {p.listName}
                      </Badge>
                      <Pencil className="h-3 w-3 text-gray-600" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Bundles Tab ── */}
      {tab === 'Bundles' && (
        <div className="container mx-auto px-4 space-y-3">
          <p className="text-sm text-gray-400 mb-1">
            Save common job assemblies — tap to add all items to a quote at once.
          </p>

          {bundles.length === 0 ? (
            <div className="text-center py-12">
              <Layers className="h-12 w-12 text-gray-600 mx-auto mb-3" />
              <p className="text-white font-semibold mb-1">No bundles yet</p>
              <p className="text-gray-400 text-sm mb-4">
                Create your first bundle — e.g. "Consumer unit swap" with CU, MCBs, and labour.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {bundles.map((bundle) => {
                const total = bundleTotal(bundle);
                const expanded = expandedBundle === bundle.id;
                return (
                  <div key={bundle.id} className="bg-white/[0.03] rounded-xl border border-white/[0.06] overflow-hidden">
                    <button className="w-full p-3.5 text-left touch-manipulation"
                      onClick={() => setExpandedBundle(expanded ? null : bundle.id)}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white">{bundle.name}</p>
                          {bundle.description && (
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{bundle.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 ml-2">
                          <span className="text-sm font-bold text-elec-yellow">{formatGBP(total)}</span>
                          {expanded ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-white/[0.1] text-gray-500">
                          {bundle.items.length} items
                        </Badge>
                        {bundle.labourHours && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-white/[0.1] text-gray-500">
                            ~{bundle.labourHours}hr
                          </Badge>
                        )}
                      </div>
                    </button>
                    {expanded && (
                      <div className="border-t border-white/[0.06] px-3.5 pb-3">
                        <div className="space-y-1.5 mt-2.5 mb-3">
                          {bundle.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between text-xs">
                              <span className="text-gray-300 flex-1 min-w-0 line-clamp-1">{item.name}</span>
                              <span className="text-gray-500 ml-2 flex-shrink-0">
                                {item.quantity} × {formatGBP(item.unitPrice)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <button onClick={() => deleteBundle(bundle.id)}
                          className="w-full h-9 text-xs font-medium text-red-400 bg-red-400/10 rounded-lg flex items-center justify-center gap-1.5 touch-manipulation">
                          <Trash2 className="h-3.5 w-3.5" />Delete bundle
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <Button onClick={() => setBundleSheetOpen(true)}
            className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation">
            <Plus className="h-4 w-4 mr-2" />Create Bundle
          </Button>
        </div>
      )}

      {/* FAB — Items tab only */}
      {tab === 'Items' && (
        <button onClick={() => setAddSheetOpen(true)}
          className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 w-14 h-14 rounded-full bg-elec-yellow flex items-center justify-center shadow-lg shadow-elec-yellow/30 touch-manipulation active:scale-95 transition-transform z-50"
          aria-label="Add item">
          <Plus className="h-6 w-6 text-black" />
        </button>
      )}

      {/* ── Edit Item Sheet ── */}
      <Sheet open={!!editSheet} onOpenChange={(open) => !open && setEditSheet(null)}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <Pencil className="h-5 w-5" />Edit Item
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4 pb-6">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Item Name</label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)}
                className="h-11 bg-white/[0.03] border-white/[0.08] text-white touch-manipulation" />
            </div>

            {/* Mode toggle */}
            <div className="flex rounded-lg overflow-hidden border border-white/[0.08]">
              {(['cost', 'sell'] as const).map((m) => (
                <button key={m} onClick={() => setEditMode(m)}
                  className={cn('flex-1 py-2.5 text-sm font-medium transition-colors touch-manipulation',
                    editMode === m ? 'bg-elec-yellow text-black' : 'bg-white/[0.03] text-gray-400')}>
                  {m === 'cost' ? 'Cost + markup' : 'Sell price directly'}
                </button>
              ))}
            </div>

            {editMode === 'cost' ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Cost price (£)</label>
                    <Input type="text" inputMode="decimal" value={editCostPrice} placeholder="0.00"
                      onChange={(e) => handleEditCostChange(e.target.value)}
                      className="h-11 bg-white/[0.03] border-white/[0.08] text-white touch-manipulation" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Markup (%)</label>
                    <Input type="text" inputMode="decimal" value={editMarkup}
                      placeholder={`${settings.globalMarkupPercent} (global)`}
                      onChange={(e) => handleEditMarkupChange(e.target.value)}
                      className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-600 touch-manipulation" />
                  </div>
                </div>
                <div className="p-3 bg-elec-yellow/5 rounded-xl border border-elec-yellow/20">
                  <p className="text-xs text-gray-400">Sell price (goes on quote)</p>
                  <p className="text-lg font-bold text-elec-yellow mt-0.5">
                    {editSellPrice ? formatGBP(parseFloat(editSellPrice)) : '—'}
                  </p>
                </div>
              </>
            ) : (
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Sell price (£) — what goes on the quote</label>
                <Input type="text" inputMode="decimal" value={editSellPrice} placeholder="0.00"
                  onChange={(e) => { if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) setEditSellPrice(e.target.value); }}
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white touch-manipulation" />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Unit</label>
                <Input value={editUnit} onChange={(e) => setEditUnit(e.target.value)}
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white touch-manipulation" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Supplier</label>
                <Input value={editSupplier} onChange={(e) => setEditSupplier(e.target.value)} placeholder="Optional"
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation" />
              </div>
            </div>

            <Button onClick={handleSaveEdit}
              className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation">
              Save Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Add Item Sheet ── */}
      <Sheet open={addSheetOpen} onOpenChange={setAddSheetOpen}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <Plus className="h-5 w-5" />Add to Price Book
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4 pb-6">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Item Name *</label>
              <Input value={newName} onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., 2.5mm T&E 100m"
                className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation" />
            </div>

            <div className="flex rounded-lg overflow-hidden border border-white/[0.08]">
              {(['cost', 'sell'] as const).map((m) => (
                <button key={m} onClick={() => setNewMode(m)}
                  className={cn('flex-1 py-2.5 text-sm font-medium transition-colors touch-manipulation',
                    newMode === m ? 'bg-elec-yellow text-black' : 'bg-white/[0.03] text-gray-400')}>
                  {m === 'cost' ? 'Cost + markup' : 'Sell price directly'}
                </button>
              ))}
            </div>

            {newMode === 'cost' ? (
              <>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Cost price (£) *</label>
                  <Input type="text" inputMode="decimal" value={newCostPrice} placeholder="0.00"
                    onChange={(e) => numInput(e.target.value, setNewCostPrice)}
                    className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation" />
                </div>
                {newCostPrice && parseFloat(newCostPrice) > 0 && (
                  <div className="p-3 bg-elec-yellow/5 rounded-xl border border-elec-yellow/20">
                    <p className="text-xs text-gray-400">Sell price at {settings.globalMarkupPercent}% markup</p>
                    <p className="text-lg font-bold text-elec-yellow">
                      {formatGBP(calcSellPrice(parseFloat(newCostPrice)))}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Sell price (£) *</label>
                <Input type="text" inputMode="decimal" value={newSellPrice} placeholder="0.00"
                  onChange={(e) => numInput(e.target.value, setNewSellPrice)}
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation" />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Unit</label>
                <Input value={newUnit} onChange={(e) => setNewUnit(e.target.value)} placeholder="each"
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Supplier</label>
                <Input value={newSupplier} onChange={(e) => setNewSupplier(e.target.value)} placeholder="Optional"
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation" />
              </div>
            </div>

            <Button onClick={handleAddItem}
              disabled={!newName.trim() || (newMode === 'cost' ? !newCostPrice : !newSellPrice)}
              className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-40">
              <Plus className="h-4 w-4 mr-2" />Add Item
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Create Bundle Sheet ── */}
      <Sheet open={bundleSheetOpen} onOpenChange={(open) => { if (!open) resetBundleSheet(); }}>
        <SheetContent side="bottom" className="h-[92vh] rounded-t-2xl overflow-hidden p-0">
          <div className="flex flex-col h-full">
            <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/[0.06] flex-shrink-0">
              <div className="flex items-center justify-between">
                <SheetTitle className="flex items-center gap-2 text-white">
                  <Layers className="h-5 w-5" />Create Bundle
                </SheetTitle>
                <button onClick={resetBundleSheet} className="p-1 text-gray-500 touch-manipulation">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {/* Name + description */}
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Bundle Name *</label>
                <Input value={bundleName} onChange={(e) => setBundleName(e.target.value)}
                  placeholder="e.g., Consumer unit swap"
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Description (optional)</label>
                <Input value={bundleDesc} onChange={(e) => setBundleDesc(e.target.value)}
                  placeholder="e.g., Includes 18-way CU, MCBs, cabling, labour"
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Est. labour hours (optional — for your reference)</label>
                <Input type="text" inputMode="decimal" value={bundleLabourHours}
                  onChange={(e) => numInput(e.target.value, setBundleLabourHours)}
                  placeholder="e.g., 3.5"
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation" />
              </div>

              {/* Bundle items list with inline editing */}
              <div>
                <p className="text-xs text-gray-400 mb-2">
                  Items in bundle ({bundleItems.length})
                  {bundleItems.length > 0 && (
                    <span className="text-elec-yellow ml-2 font-semibold">
                      = {formatGBP(bundleItems.reduce((s, i) => s + i.quantity * i.unitPrice, 0))}
                    </span>
                  )}
                </p>

                {bundleItems.length === 0 ? (
                  <p className="text-xs text-gray-600 italic py-2">
                    Add items from your price book below, or add a labour line.
                  </p>
                ) : (
                  <div className="space-y-2 mb-3">
                    {bundleItems.map((item) => (
                      <div key={item.id}
                        className="p-2.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                        <div className="flex items-center gap-2 mb-2">
                          <Input value={item.name}
                            onChange={(e) => updateBundleItemField(item.id, 'name', e.target.value)}
                            className="h-8 flex-1 bg-white/[0.03] border-white/[0.08] text-white text-xs touch-manipulation" />
                          <button onClick={() => removeBundleItem(item.id)}
                            className="p-1 text-gray-600 touch-manipulation flex-shrink-0">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">Qty</span>
                            <Input type="text" inputMode="decimal"
                              value={item.quantity}
                              onChange={(e) => updateBundleItemField(item.id, 'quantity', e.target.value)}
                              className="h-8 w-14 text-center bg-white/[0.03] border-white/[0.08] text-white text-xs touch-manipulation" />
                          </div>
                          <span className="text-xs text-gray-500">×</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">£</span>
                            <Input type="text" inputMode="decimal"
                              value={item.unitPrice === 0 ? '' : item.unitPrice.toFixed(2)}
                              placeholder={item.category === 'labour' ? 'rate' : '0.00'}
                              onChange={(e) => updateBundleItemField(item.id, 'unitPrice', e.target.value)}
                              className="h-8 w-20 bg-white/[0.03] border-white/[0.08] text-white text-xs touch-manipulation" />
                          </div>
                          <span className="text-xs text-elec-yellow ml-auto font-semibold">
                            {formatGBP(item.quantity * item.unitPrice)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add labour line */}
                <button onClick={addBundleLabourLine}
                  className="w-full py-2 text-xs font-medium text-elec-yellow border border-elec-yellow/30 rounded-lg flex items-center justify-center gap-1.5 touch-manipulation mb-3 active:bg-elec-yellow/5">
                  <Plus className="h-3.5 w-3.5" />Add labour line
                </button>

                {/* Add from price book */}
                {pricedItems.length > 0 && (
                  <>
                    <p className="text-[11px] text-gray-500 mb-2">Add from price book:</p>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto rounded-xl border border-white/[0.05]">
                      {pricedItems.map((p) => (
                        <button key={`${p.listId}-${p.item.id}`} onClick={() => addBundleItemFromPriceBook(p)}
                          className="w-full flex items-center justify-between p-2.5 bg-white/[0.02] text-left touch-manipulation active:bg-white/[0.05] border-b border-white/[0.04] last:border-0">
                          <span className="text-xs text-gray-300 line-clamp-1 flex-1">{p.item.name}</span>
                          <span className="text-xs text-elec-yellow ml-2 flex-shrink-0">
                            {formatGBP(getSellPrice(p.item))}
                          </span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 pb-6 pt-3 border-t border-white/[0.06] flex-shrink-0">
              <Button onClick={handleCreateBundle}
                disabled={!bundleName.trim() || bundleItems.length === 0}
                className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-40">
                Save Bundle
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

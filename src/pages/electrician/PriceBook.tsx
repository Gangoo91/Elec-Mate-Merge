import { useState, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Search,
  Plus,
  Package,
  Pencil,
  Clock,
  Zap,
  Layers,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Trash2,
  X,
  Check,
  Receipt,
  FileText,
  Upload,
  ClipboardPaste,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMaterialsLists, MaterialsListItem } from '@/hooks/useMaterialsLists';
import { usePriceBookSettings } from '@/hooks/usePriceBookSettings';
import { usePriceBookBundles, BundleLineItem } from '@/hooks/usePriceBookBundles';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Constants ──────────────────────────────────────────────────────────────

const STALE_DAYS = 60;
const CATEGORIES = ['All', 'Cable', 'Accessories', 'Tools', 'Safety', 'General'] as const;
type Category = (typeof CATEGORIES)[number];
const TABS = ['Items', 'Bundles'] as const;
type Tab = (typeof TABS)[number];

// ─── Helpers ────────────────────────────────────────────────────────────────

function deriveCategory(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('cable') || n.includes('wire') || n.includes('flex') || n.includes('t&e') || n.includes('swa')) return 'Cable';
  if (n.includes('socket') || n.includes('switch') || n.includes('connector') || n.includes('terminal') || n.includes('plate')) return 'Accessories';
  if (n.includes('tool') || n.includes('drill') || n.includes('screwdriver') || n.includes('plier') || n.includes('tester') || n.includes('multimeter')) return 'Tools';
  if (n.includes('safety') || n.includes('ppe') || n.includes('glove') || n.includes('goggle') || n.includes('helmet') || n.includes('hi-vis')) return 'Safety';
  return 'General';
}

function daysOld(isoDate?: string): number | null {
  if (!isoDate) return null;
  return Math.floor((Date.now() - new Date(isoDate).getTime()) / (1000 * 60 * 60 * 24));
}

function formatGBP(v: number) { return `£${v.toFixed(2)}`; }
function numInput(val: string, setter: (v: string) => void) { if (val === '' || /^\d*\.?\d*$/.test(val)) setter(val); }

interface PricedItem { item: MaterialsListItem; listId: string; listName: string; }

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.03 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };

const CAT_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  Cable: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  Accessories: { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  Tools: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  Safety: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  General: { color: 'text-elec-yellow', bg: 'bg-elec-yellow/10', border: 'border-elec-yellow/20' },
};

// ─── Main ───────────────────────────────────────────────────────────────────

export default function PriceBook() {
  const { lists, updateItemDetails, addItem, createList } = useMaterialsLists();
  const { settings, updateMarkup, calcSellPrice } = usePriceBookSettings();
  const { bundles, createBundle, deleteBundle, bundleTotal } = usePriceBookBundles();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>('Items');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  // Edit item sheet
  const [editSheet, setEditSheet] = useState<PricedItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editCostPrice, setEditCostPrice] = useState('');
  const [editSellPrice, setEditSellPrice] = useState('');
  const [editMarkup, setEditMarkup] = useState('');
  const [editUnit, setEditUnit] = useState('');
  const [editSupplier, setEditSupplier] = useState('');
  const [editMode, setEditMode] = useState<'cost' | 'sell'>('cost');

  // Add item sheet
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCostPrice, setNewCostPrice] = useState('');
  const [newSellPrice, setNewSellPrice] = useState('');
  const [newUnit, setNewUnit] = useState('each');
  const [newSupplier, setNewSupplier] = useState('');
  const [newMode, setNewMode] = useState<'cost' | 'sell'>('cost');

  // Markup inline edit
  const [editingMarkup, setEditingMarkup] = useState(false);
  const [markupInput, setMarkupInput] = useState('');

  // Import sheet
  const [importSheetOpen, setImportSheetOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [importParsed, setImportParsed] = useState<{ name: string; price: number; unit: string; supplier: string }[]>([]);
  const [importing, setImporting] = useState(false);

  // Bundle sheet
  const [bundleSheetOpen, setBundleSheetOpen] = useState(false);
  const [bundleName, setBundleName] = useState('');
  const [bundleDesc, setBundleDesc] = useState('');
  const [bundleLabourHours, setBundleLabourHours] = useState('');
  const [bundleItems, setBundleItems] = useState<BundleLineItem[]>([]);
  const [expandedBundle, setExpandedBundle] = useState<string | null>(null);

  // Computed
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

  const staleCount = useMemo(() => pricedItems.filter((p) => (daysOld(p.item.price_updated_at) ?? 0) >= STALE_DAYS).length, [pricedItems]);

  const filtered = useMemo(() => {
    let items = pricedItems;
    if (activeCategory !== 'All') items = items.filter((p) => deriveCategory(p.item.name) === activeCategory);
    if (search.trim()) { const q = search.toLowerCase(); items = items.filter((p) => p.item.name.toLowerCase().includes(q)); }
    return items;
  }, [pricedItems, activeCategory, search]);

  const getSellPrice = useCallback((item: MaterialsListItem): number => {
    if ((item.estimated_price ?? 0) > 0) return item.estimated_price!;
    if ((item.cost_price ?? 0) > 0) return calcSellPrice(item.cost_price!, item.markup_percent);
    return 0;
  }, [calcSellPrice]);

  // Edit sheet
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
    const updates: Partial<MaterialsListItem> = { name: editName.trim() || editSheet.item.name, unit: editUnit.trim() || 'each', supplier: editSupplier.trim() || undefined };
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

  // Add item
  const handleAddItem = async () => {
    if (!newName.trim()) return;
    let list = lists.find((l) => l.name === 'Price Book');
    if (!list) { const created = await createList('Price Book', 'Items added directly to My Price Book'); if (!created) return; list = created; }
    if (newMode === 'cost') {
      const cost = parseFloat(newCostPrice);
      if (isNaN(cost) || cost <= 0) { toast({ title: 'Invalid cost price', variant: 'destructive' }); return; }
      const sellPrice = calcSellPrice(cost, settings.globalMarkupPercent);
      await addItem(list.id, { name: newName.trim(), current_price: sellPrice, cost_price: cost, markup_percent: settings.globalMarkupPercent, supplier_name: newSupplier.trim() || undefined });
      toast({ title: 'Item added', description: `${newName.trim()} → sell ${formatGBP(sellPrice)}` });
    } else {
      const sell = parseFloat(newSellPrice);
      if (isNaN(sell) || sell <= 0) { toast({ title: 'Invalid sell price', variant: 'destructive' }); return; }
      await addItem(list.id, { name: newName.trim(), current_price: sell, supplier_name: newSupplier.trim() || undefined });
      toast({ title: 'Item added', description: `${newName.trim()} → ${formatGBP(sell)}` });
    }
    setNewName(''); setNewCostPrice(''); setNewSellPrice(''); setNewUnit('each'); setNewSupplier(''); setAddSheetOpen(false);
  };

  // Markup
  const handleSaveMarkup = () => {
    const v = parseFloat(markupInput);
    if (!isNaN(v) && v >= 0) { updateMarkup(v); toast({ title: `Markup set to ${v}%` }); }
    setEditingMarkup(false);
  };

  // Bundle helpers
  const addBundleItemFromPriceBook = (p: PricedItem) => {
    setBundleItems((prev) => [...prev, { id: crypto.randomUUID(), name: p.item.name, quantity: 1, unit: p.item.unit || 'each', unitPrice: getSellPrice(p.item), category: 'materials' }]);
  };
  const addBundleLabourLine = () => {
    setBundleItems((prev) => [...prev, { id: crypto.randomUUID(), name: 'Labour', quantity: 1, unit: 'hr', unitPrice: 0, category: 'labour' }]);
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
    createBundle(bundleName, bundleItems, { description: bundleDesc || undefined, labourHours: parseFloat(bundleLabourHours) || undefined });
    toast({ title: 'Bundle saved', description: bundleName });
    resetBundleSheet();
  };
  const resetBundleSheet = () => { setBundleName(''); setBundleDesc(''); setBundleLabourHours(''); setBundleItems([]); setBundleSheetOpen(false); };

  // Import CSV/text parsing
  const parseImportText = (text: string) => {
    const lines = text.split('\n').filter((l) => l.trim());
    const parsed: typeof importParsed = [];
    for (const line of lines) {
      // Try comma, then tab separated
      const parts = line.includes('\t') ? line.split('\t') : line.split(',');
      const name = parts[0]?.trim();
      if (!name) continue;
      const price = parseFloat(parts[1]?.trim() || '0');
      const unit = parts[2]?.trim() || 'each';
      const supplier = parts[3]?.trim() || '';
      parsed.push({ name, price: isNaN(price) ? 0 : price, unit, supplier });
    }
    setImportParsed(parsed);
  };

  const handleImport = async () => {
    if (importParsed.length === 0) return;
    setImporting(true);
    let list = lists.find((l) => l.name === 'Price Book');
    if (!list) { const created = await createList('Price Book', 'Items added directly to My Price Book'); if (!created) { setImporting(false); return; } list = created; }
    let count = 0;
    for (const item of importParsed) {
      if (!item.name || item.price <= 0) continue;
      const sellPrice = calcSellPrice(item.price, settings.globalMarkupPercent);
      await addItem(list.id, { name: item.name, current_price: sellPrice, cost_price: item.price, markup_percent: settings.globalMarkupPercent, supplier_name: item.supplier || undefined });
      count++;
    }
    toast({ title: `${count} items imported`, description: `Added to Price Book with ${settings.globalMarkupPercent}% markup` });
    setImportText('');
    setImportParsed([]);
    setImportSheetOpen(false);
    setImporting(false);
  };

  // Add item/bundle to quote
  const handleAddToQuote = (name: string, price: number, unit: string) => {
    const sessionId = `pricebook_${crypto.randomUUID()}`;
    const data = {
      source: 'price_book',
      sourceLabel: 'Price Book',
      materials: [{ id: crypto.randomUUID(), description: name, category: 'materials' as const, quantity: 1, unitPrice: price, totalPrice: price, unit, notes: '' }],
    };
    localStorage.setItem(sessionId, JSON.stringify({ materialsData: data }));
    navigate(`/electrician/quote-builder/create?materialsSessionId=${sessionId}`);
  };

  const handleBundleToQuote = (bundle: typeof bundles[0]) => {
    const sessionId = `bundle_${crypto.randomUUID()}`;
    const data = {
      source: 'price_book_bundle',
      sourceLabel: bundle.name,
      materials: bundle.items.map((i) => ({ id: crypto.randomUUID(), description: i.name, category: i.category as 'materials' | 'labour', quantity: i.quantity, unitPrice: i.unitPrice, totalPrice: i.quantity * i.unitPrice, unit: i.unit, notes: '' })),
    };
    localStorage.setItem(sessionId, JSON.stringify({ materialsData: data }));
    navigate(`/electrician/quote-builder/create?materialsSessionId=${sessionId}`);
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="max-w-6xl mx-auto lg:px-8">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
          <div className="px-4 py-2">
            <div className="flex items-center gap-3 h-11">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <BookOpen className="h-4 w-4 text-blue-400" />
                </div>
                <h1 className="text-base font-semibold text-white">Price Book</h1>
              </div>
              {tab === 'Items' && (
                <Button variant="ghost" size="icon" onClick={() => setImportSheetOpen(true)} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-9 w-9 touch-manipulation">
                  <Upload className="h-4 w-4" />
                </Button>
              )}
              <Button onClick={() => (tab === 'Items' ? setAddSheetOpen(true) : setBundleSheetOpen(true))} size="sm" className="h-9 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold px-3">
                <Plus className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            </div>
          </div>

          {/* Tabs — segment control */}
          <div className="px-4 pb-2">
            <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    'flex-1 py-2 text-sm font-medium rounded-lg transition-all touch-manipulation',
                    tab === t ? 'bg-elec-yellow text-black' : 'text-white'
                  )}
                >
                  {t}
                  {t === 'Bundles' && bundles.length > 0 && (
                    <span className={cn('ml-1.5 text-[10px]', tab === t ? 'text-black/60' : 'text-white')}>({bundles.length})</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-5">
          {/* ── Items Tab ── */}
          {tab === 'Items' && (
            <>
              {/* KPI + Settings */}
              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2">
                <div className="card-surface p-3 flex flex-col items-center">
                  <span className="text-lg font-bold text-white">{pricedItems.length}</span>
                  <span className="text-[10px] text-white uppercase tracking-wider">Items</span>
                </div>
                <div className="card-surface p-3 flex flex-col items-center">
                  {editingMarkup ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text" inputMode="decimal" value={markupInput} autoFocus
                        onChange={(e) => numInput(e.target.value, setMarkupInput)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSaveMarkup(); if (e.key === 'Escape') setEditingMarkup(false); }}
                        onBlur={handleSaveMarkup}
                        className="w-10 h-7 text-center bg-transparent border border-elec-yellow/40 rounded text-elec-yellow font-bold text-lg focus:outline-none"
                      />
                      <span className="text-xs text-white">%</span>
                    </div>
                  ) : (
                    <button onClick={() => { setMarkupInput(settings.globalMarkupPercent.toFixed(0)); setEditingMarkup(true); }} className="touch-manipulation">
                      <span className="text-lg font-bold text-elec-yellow">{settings.globalMarkupPercent}%</span>
                    </button>
                  )}
                  <span className="text-[10px] text-white uppercase tracking-wider">Markup</span>
                </div>
                <div className="card-surface p-3 flex flex-col items-center">
                  <span className={cn('text-lg font-bold', staleCount > 0 ? 'text-amber-400' : 'text-white')}>{staleCount}</span>
                  <span className="text-[10px] text-white uppercase tracking-wider">Stale</span>
                </div>
              </motion.div>

              {/* Rate Card link */}
              <motion.div variants={itemVariants}>
                <Link to="/electrician/rate-card" className="group card-surface-interactive p-3.5 flex items-center gap-3 touch-manipulation active:scale-[0.98] transition-all block">
                  <div className="p-2 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 group-hover:scale-110 transition-transform">
                    <Receipt className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:text-elec-yellow transition-colors">Rate Card</p>
                    <p className="text-[10px] text-white">Labour & call-out prices for quotes</p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all">
                    <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black transition-all" />
                  </div>
                </Link>
              </motion.div>

              {/* Search */}
              <motion.div variants={itemVariants} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                <Input placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-11 pl-10 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white focus:border-elec-yellow touch-manipulation" />
              </motion.div>

              {/* Category pills */}
              <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {CATEGORIES.map((cat) => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={cn('h-9 px-3.5 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-manipulation active:scale-[0.97]', activeCategory === cat ? 'bg-elec-yellow text-black' : 'bg-white/[0.05] text-white border border-white/[0.08]')}>
                    {cat}
                  </button>
                ))}
              </motion.div>

              {/* Items */}
              {filtered.length === 0 ? (
                <motion.div variants={itemVariants} className="text-center py-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Package className="h-8 w-8 text-blue-400" />
                  </div>
                  <h2 className="text-base font-semibold text-white mb-1">{pricedItems.length === 0 ? 'No priced items yet' : 'No matching items'}</h2>
                  <p className="text-white text-xs mb-5 max-w-xs mx-auto">{pricedItems.length === 0 ? 'Add prices to your materials lists, or add your first item.' : 'Try a different search or category.'}</p>
                  {pricedItems.length === 0 && (
                    <div className="flex gap-2 justify-center">
                      <Button onClick={() => setAddSheetOpen(true)} className="h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"><Plus className="h-4 w-4 mr-1.5" />Add Item</Button>
                      <Link to="/electrician/materials"><Button variant="outline" className="h-11 touch-manipulation border-white/15 text-white"><Search className="h-4 w-4 mr-1.5" />Marketplace</Button></Link>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="space-y-2">
                  {filtered.map((p) => {
                    const sellPrice = getSellPrice(p.item);
                    const hasCost = (p.item.cost_price ?? 0) > 0;
                    const days = daysOld(p.item.price_updated_at);
                    const stale = (days ?? 0) >= STALE_DAYS;
                    const cat = deriveCategory(p.item.name);
                    const style = CAT_STYLES[cat] || CAT_STYLES.General;
                    return (
                      <motion.div key={`${p.listId}-${p.item.id}`} variants={itemVariants}>
                        <div className={cn('group card-surface-interactive overflow-hidden', stale && 'ring-1 ring-amber-500/30')}>
                          {/* Accent line */}
                          <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-20 group-hover:opacity-70 transition-opacity', stale ? 'from-amber-500 to-orange-400' : 'from-blue-500 via-blue-400 to-cyan-400')} />

                          <div className="relative z-10 p-4">
                            <div className="flex items-start gap-3">
                              <div className={cn('p-2 rounded-xl flex-shrink-0', style.bg, style.border)}>
                                <Package className={cn('h-4 w-4', style.color)} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white line-clamp-2">{p.item.name}</p>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  {p.item.supplier && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/[0.04] text-white border border-white/[0.06]">{p.item.supplier}</span>
                                  )}
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/[0.04] text-white border border-white/[0.06]">{p.listName}</span>
                                  {stale && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-0.5">
                                      <Clock className="h-2.5 w-2.5" />{days}d old
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="text-lg font-bold text-elec-yellow">{formatGBP(sellPrice)}</p>
                                <p className="text-[10px] text-white">per {p.item.unit || 'each'}</p>
                                {hasCost && (
                                  <p className="text-[10px] text-white mt-0.5">
                                    cost {formatGBP(p.item.cost_price!)} · {(p.item.markup_percent ?? settings.globalMarkupPercent).toFixed(0)}%
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/[0.04]">
                              <button onClick={() => handleAddToQuote(p.item.name, sellPrice, p.item.unit || 'each')} className="h-9 px-3 rounded-full flex items-center gap-1.5 text-xs font-medium text-elec-yellow active:bg-elec-yellow/5 touch-manipulation">
                                <FileText className="h-3 w-3" />Add to Quote
                              </button>
                              <div className="flex items-center gap-1">
                                <button onClick={() => openEditSheet(p)} className="h-9 px-3 rounded-full flex items-center gap-1.5 text-xs font-medium text-white active:bg-white/[0.05] touch-manipulation">
                                  <Pencil className="h-3 w-3" />Edit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* ── Bundles Tab ── */}
          {tab === 'Bundles' && (
            <>
              {bundles.length === 0 ? (
                <motion.div variants={itemVariants} className="text-center py-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <Layers className="h-8 w-8 text-purple-400" />
                  </div>
                  <h2 className="text-base font-semibold text-white mb-1">No Bundles Yet</h2>
                  <p className="text-white text-xs mb-5 max-w-xs mx-auto">
                    Group materials + labour into reusable bundles. E.g. "Consumer unit swap" with CU, MCBs, cabling, and labour.
                  </p>
                  <Button onClick={() => setBundleSheetOpen(true)} className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation">
                    <Plus className="h-4 w-4 mr-1.5" />Create Bundle
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">{bundles.length} Bundles</h2>
                  {bundles.map((bundle) => {
                    const total = bundleTotal(bundle);
                    const expanded = expandedBundle === bundle.id;
                    return (
                      <motion.div key={bundle.id} variants={itemVariants} className="card-surface-interactive overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 via-violet-400 to-indigo-400 opacity-20" />
                        <button className="w-full relative z-10 p-4 text-left touch-manipulation" onClick={() => setExpandedBundle(expanded ? null : bundle.id)}>
                          <div className="flex items-start gap-3">
                            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 flex-shrink-0">
                              <Layers className="h-5 w-5 text-purple-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-base font-semibold text-white">{bundle.name}</p>
                              {bundle.description && <p className="text-[11px] text-white mt-0.5 line-clamp-1">{bundle.description}</p>}
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/[0.04] text-white border border-white/[0.06]">{bundle.items.length} items</span>
                                {bundle.labourHours && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/[0.04] text-white border border-white/[0.06]">~{bundle.labourHours}hr</span>}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-lg font-bold text-elec-yellow">{formatGBP(total)}</span>
                              {expanded ? <ChevronUp className="h-4 w-4 text-white" /> : <ChevronDown className="h-4 w-4 text-white" />}
                            </div>
                          </div>
                        </button>
                        {expanded && (
                          <div className="border-t border-white/[0.06] px-4 pb-4">
                            <div className="space-y-1.5 mt-3 mb-3">
                              {bundle.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/[0.02]">
                                  <span className="text-white flex-1 min-w-0 line-clamp-1">{item.name}</span>
                                  <span className="text-white ml-2 flex-shrink-0">{item.quantity} × {formatGBP(item.unitPrice)}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={() => handleBundleToQuote(bundle)} className="flex-1 h-10 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-xs touch-manipulation">
                                <FileText className="h-3.5 w-3.5 mr-1.5" />Add to Quote
                              </Button>
                              <button onClick={() => deleteBundle(bundle.id)} className="h-10 px-4 text-xs font-medium text-red-400 bg-red-400/10 rounded-lg flex items-center gap-1.5 touch-manipulation">
                                <Trash2 className="h-3.5 w-3.5" />Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                  <Button onClick={() => setBundleSheetOpen(true)} className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation">
                    <Plus className="h-4 w-4 mr-1.5" />Create Bundle
                  </Button>
                </div>
              )}
            </>
          )}
        </motion.main>
      </div>

      {/* ── Edit Item Sheet ── */}
      <Sheet open={!!editSheet} onOpenChange={(open) => !open && setEditSheet(null)}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl overflow-y-auto">
          <SheetHeader><SheetTitle className="flex items-center gap-2 text-white"><Pencil className="h-5 w-5" />Edit Item</SheetTitle></SheetHeader>
          <div className="mt-4 space-y-4 pb-6">
            <div><label className="text-xs text-white mb-1 block">Item Name</label><Input value={editName} onChange={(e) => setEditName(e.target.value)} className="h-11 bg-white/[0.03] border-white/[0.08] text-white touch-manipulation" /></div>
            <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              {(['cost', 'sell'] as const).map((m) => (<button key={m} onClick={() => setEditMode(m)} className={cn('flex-1 py-2 text-sm font-medium rounded-lg transition-all touch-manipulation', editMode === m ? 'bg-elec-yellow text-black' : 'text-white')}>{m === 'cost' ? 'Cost + markup' : 'Sell price'}</button>))}
            </div>
            {editMode === 'cost' ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs text-white mb-1 block">Cost price (£)</label><Input type="text" inputMode="decimal" value={editCostPrice} placeholder="0.00" onChange={(e) => handleEditCostChange(e.target.value)} className="h-11 bg-white/[0.03] border-white/[0.08] text-white touch-manipulation" /></div>
                  <div><label className="text-xs text-white mb-1 block">Markup (%)</label><Input type="text" inputMode="decimal" value={editMarkup} placeholder={`${settings.globalMarkupPercent}`} onChange={(e) => handleEditMarkupChange(e.target.value)} className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white touch-manipulation" /></div>
                </div>
                <div className="card-surface p-3"><p className="text-[11px] text-white">Sell price (goes on quote)</p><p className="text-lg font-bold text-elec-yellow mt-0.5">{editSellPrice ? formatGBP(parseFloat(editSellPrice)) : '—'}</p></div>
              </>
            ) : (
              <div><label className="text-xs text-white mb-1 block">Sell price (£)</label><Input type="text" inputMode="decimal" value={editSellPrice} placeholder="0.00" onChange={(e) => { if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) setEditSellPrice(e.target.value); }} className="h-11 bg-white/[0.03] border-white/[0.08] text-white touch-manipulation" /></div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs text-white mb-1 block">Unit</label><Input value={editUnit} onChange={(e) => setEditUnit(e.target.value)} className="h-11 bg-white/[0.03] border-white/[0.08] text-white touch-manipulation" /></div>
              <div><label className="text-xs text-white mb-1 block">Supplier</label><Input value={editSupplier} onChange={(e) => setEditSupplier(e.target.value)} placeholder="Optional" className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white touch-manipulation" /></div>
            </div>
            <Button onClick={handleSaveEdit} className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation">Save Changes</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Add Item Sheet ── */}
      <Sheet open={addSheetOpen} onOpenChange={setAddSheetOpen}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl overflow-y-auto">
          <SheetHeader><SheetTitle className="flex items-center gap-2 text-white"><Plus className="h-5 w-5" />Add to Price Book</SheetTitle></SheetHeader>
          <div className="mt-4 space-y-4 pb-6">
            <div><label className="text-xs text-white mb-1 block">Item Name *</label><Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g., 2.5mm T&E 100m" className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white touch-manipulation" /></div>
            <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              {(['cost', 'sell'] as const).map((m) => (<button key={m} onClick={() => setNewMode(m)} className={cn('flex-1 py-2 text-sm font-medium rounded-lg transition-all touch-manipulation', newMode === m ? 'bg-elec-yellow text-black' : 'text-white')}>{m === 'cost' ? 'Cost + markup' : 'Sell price'}</button>))}
            </div>
            {newMode === 'cost' ? (
              <>
                <div><label className="text-xs text-white mb-1 block">Cost price (£) *</label><Input type="text" inputMode="decimal" value={newCostPrice} placeholder="0.00" onChange={(e) => numInput(e.target.value, setNewCostPrice)} className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white touch-manipulation" /></div>
                {newCostPrice && parseFloat(newCostPrice) > 0 && (
                  <div className="card-surface p-3"><p className="text-[11px] text-white">Sell price at {settings.globalMarkupPercent}% markup</p><p className="text-lg font-bold text-elec-yellow">{formatGBP(calcSellPrice(parseFloat(newCostPrice)))}</p></div>
                )}
              </>
            ) : (
              <div><label className="text-xs text-white mb-1 block">Sell price (£) *</label><Input type="text" inputMode="decimal" value={newSellPrice} placeholder="0.00" onChange={(e) => numInput(e.target.value, setNewSellPrice)} className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white touch-manipulation" /></div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs text-white mb-1 block">Unit</label><Input value={newUnit} onChange={(e) => setNewUnit(e.target.value)} placeholder="each" className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white touch-manipulation" /></div>
              <div><label className="text-xs text-white mb-1 block">Supplier</label><Input value={newSupplier} onChange={(e) => setNewSupplier(e.target.value)} placeholder="Optional" className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white touch-manipulation" /></div>
            </div>
            <Button onClick={handleAddItem} disabled={!newName.trim() || (newMode === 'cost' ? !newCostPrice : !newSellPrice)} className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-40"><Plus className="h-4 w-4 mr-1.5" />Add Item</Button>
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
                  <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <Layers className="h-4 w-4 text-purple-400" />
                  </div>
                  Create Bundle
                </SheetTitle>
                <button onClick={resetBundleSheet} className="h-9 w-9 rounded-full flex items-center justify-center text-white active:bg-white/10 touch-manipulation"><X className="h-5 w-5" /></button>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              <div><label className="text-xs text-white mb-1 block">Bundle Name *</label><Input value={bundleName} onChange={(e) => setBundleName(e.target.value)} placeholder="e.g., Consumer unit swap" className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white touch-manipulation" /></div>
              <div><label className="text-xs text-white mb-1 block">Description (optional)</label><Input value={bundleDesc} onChange={(e) => setBundleDesc(e.target.value)} placeholder="e.g., Includes 18-way CU, MCBs, cabling, labour" className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white touch-manipulation" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-white mb-1 block">Est. labour hours</label><Input type="text" inputMode="decimal" value={bundleLabourHours} onChange={(e) => numInput(e.target.value, setBundleLabourHours)} placeholder="e.g., 3.5" className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-white touch-manipulation" /></div>
                {bundleItems.length > 0 && (
                  <div className="card-surface p-3 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-elec-yellow">{formatGBP(bundleItems.reduce((s, i) => s + i.quantity * i.unitPrice, 0))}</span>
                    <span className="text-[10px] text-white uppercase tracking-wider">Total</span>
                  </div>
                )}
              </div>

              {/* Bundle items */}
              <div className="space-y-3">
                <h3 className="text-xs font-medium text-white uppercase tracking-wider">
                  Bundle Items ({bundleItems.length})
                </h3>

                {bundleItems.length === 0 && (
                  <div className="card-surface p-4 text-center">
                    <p className="text-xs text-white">Add items from your price book or add a labour line to get started.</p>
                  </div>
                )}

                {bundleItems.map((item) => (
                  <div key={item.id} className="card-surface-interactive p-3.5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className={cn('p-1.5 rounded-lg flex-shrink-0', item.category === 'labour' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-elec-yellow/10 border border-elec-yellow/20')}>
                        {item.category === 'labour' ? <Clock className="h-3 w-3 text-blue-400" /> : <Package className="h-3 w-3 text-elec-yellow" />}
                      </div>
                      <Input value={item.name} onChange={(e) => updateBundleItemField(item.id, 'name', e.target.value)} className="h-8 flex-1 bg-white/[0.03] border-white/[0.08] text-white text-xs touch-manipulation" />
                      <button onClick={() => removeBundleItem(item.id)} className="h-7 w-7 rounded-full flex items-center justify-center text-red-400 active:bg-red-500/10 touch-manipulation flex-shrink-0"><X className="h-3.5 w-3.5" /></button>
                    </div>
                    <div className="flex items-center gap-2 pl-8">
                      <div className="flex items-center gap-1.5 bg-white/[0.03] rounded-lg border border-white/[0.06] px-2 py-1">
                        <span className="text-[10px] text-white">Qty</span>
                        <Input type="text" inputMode="decimal" value={item.quantity} onChange={(e) => updateBundleItemField(item.id, 'quantity', e.target.value)} className="h-6 w-10 text-center bg-transparent border-0 text-white text-xs p-0 focus:ring-0" />
                      </div>
                      <span className="text-xs text-white">×</span>
                      <div className="flex items-center gap-1 bg-white/[0.03] rounded-lg border border-white/[0.06] px-2 py-1">
                        <span className="text-[10px] text-white">£</span>
                        <Input type="text" inputMode="decimal" value={item.unitPrice === 0 ? '' : item.unitPrice.toFixed(2)} placeholder={item.category === 'labour' ? 'rate' : '0.00'} onChange={(e) => updateBundleItemField(item.id, 'unitPrice', e.target.value)} className="h-6 w-16 bg-transparent border-0 text-white text-xs p-0 focus:ring-0" />
                      </div>
                      <span className="text-sm text-elec-yellow ml-auto font-bold">{formatGBP(item.quantity * item.unitPrice)}</span>
                    </div>
                  </div>
                ))}

                {/* Add buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={addBundleLabourLine} className="card-surface-interactive p-3 flex items-center gap-2 touch-manipulation active:scale-[0.98] transition-all">
                    <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20"><Clock className="h-3.5 w-3.5 text-blue-400" /></div>
                    <span className="text-xs font-medium text-white">Add Labour</span>
                  </button>
                  <button onClick={() => {/* scroll to price book picker below */}} className="card-surface-interactive p-3 flex items-center gap-2 touch-manipulation active:scale-[0.98] transition-all">
                    <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20"><Package className="h-3.5 w-3.5 text-elec-yellow" /></div>
                    <span className="text-xs font-medium text-white">Add Material</span>
                  </button>
                </div>
              </div>

              {/* Price book picker */}
              {pricedItems.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-white uppercase tracking-wider">From Price Book</h3>
                  <div className="space-y-1.5 max-h-56 overflow-y-auto">
                    {pricedItems.map((p) => {
                      const cat = deriveCategory(p.item.name);
                      const style = CAT_STYLES[cat] || CAT_STYLES.General;
                      return (
                        <button key={`${p.listId}-${p.item.id}`} onClick={() => addBundleItemFromPriceBook(p)} className="w-full card-surface p-3 flex items-center gap-2.5 text-left touch-manipulation active:scale-[0.98] transition-all">
                          <div className={cn('p-1.5 rounded-lg flex-shrink-0', style.bg, style.border)}>
                            <Package className={cn('h-3 w-3', style.color)} />
                          </div>
                          <span className="text-xs text-white line-clamp-1 flex-1">{p.item.name}</span>
                          <span className="text-xs text-elec-yellow font-semibold flex-shrink-0">{formatGBP(getSellPrice(p.item))}</span>
                          <Plus className="h-3.5 w-3.5 text-white flex-shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 pb-6 pt-3 border-t border-white/[0.06] flex-shrink-0">
              <Button onClick={handleCreateBundle} disabled={!bundleName.trim() || bundleItems.length === 0} className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-40">
                Save Bundle
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Import Sheet ── */}
      <Sheet open={importSheetOpen} onOpenChange={(open) => { if (!open) { setImportSheetOpen(false); setImportText(''); setImportParsed([]); } }}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Upload className="h-4 w-4 text-emerald-400" />
              </div>
              Import Price List
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4 pb-6">
            <p className="text-xs text-white leading-relaxed">
              Paste your price list from a spreadsheet. Format: <span className="text-elec-yellow font-medium">name, cost price, unit, supplier</span> — one item per line. Comma or tab separated.
            </p>

            <Textarea
              value={importText}
              onChange={(e) => {
                setImportText(e.target.value);
                parseImportText(e.target.value);
              }}
              placeholder={"2.5mm T&E 100m, 45.99, roll, Screwfix\n32A MCB Type B, 8.50, each, Toolstation\nLED Downlight 10W, 4.99, each, CEF"}
              className="min-h-[140px] text-sm font-mono touch-manipulation"
            />

            {/* Preview */}
            {importParsed.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-white uppercase tracking-wider">
                  Preview ({importParsed.length} items)
                </h3>
                <div className="max-h-48 overflow-y-auto space-y-1.5">
                  {importParsed.map((item, i) => (
                    <div key={i} className="card-surface p-3 flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white line-clamp-1">{item.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {item.supplier && <span className="text-[10px] text-white">{item.supplier}</span>}
                          <span className="text-[10px] text-white">per {item.unit}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-white">Cost: {formatGBP(item.price)}</p>
                        <p className="text-xs text-elec-yellow font-semibold">Sell: {item.price > 0 ? formatGBP(calcSellPrice(item.price)) : '—'}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card-surface p-3 flex items-center justify-between">
                  <span className="text-xs text-white">Markup applied: <span className="text-elec-yellow font-semibold">{settings.globalMarkupPercent}%</span></span>
                  <span className="text-xs text-white">{importParsed.filter((i) => i.price > 0).length} valid items</span>
                </div>
              </div>
            )}

            <Button
              onClick={handleImport}
              disabled={importParsed.filter((i) => i.price > 0).length === 0 || importing}
              className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-40"
            >
              {importing ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Importing...</>
              ) : (
                <><Upload className="h-4 w-4 mr-1.5" />Import {importParsed.filter((i) => i.price > 0).length} Items</>
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

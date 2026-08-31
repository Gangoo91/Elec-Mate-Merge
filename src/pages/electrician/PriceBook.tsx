import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { storageSetJSONSync } from '@/utils/storage';
import {
  ArrowLeft,
  Search,
  Plus,
  Clock,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  X,
  Upload,
  ClipboardPaste,
  Loader2,
  Boxes,
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
import { useMaterialsLists, normaliseItemName, MaterialsListItem } from '@/hooks/useMaterialsLists';
import { usePriceBookSettings } from '@/hooks/usePriceBookSettings';
import { usePriceBookBundles, BundleLineItem } from '@/hooks/usePriceBookBundles';
import { useInventoryStorage } from '@/hooks/useInventoryStorage';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import {
  LABOUR_GRADES,
  DEFAULT_LABOUR_GRADE,
  shortGradeLabel,
  rateForGrade,
  labourLinesFor,
  labourAllocations,
  describeLabour,
} from '@/utils/labourGrades';
import { parseLabourMatrix, looksLikeLabourMatrix } from '@/utils/labourMatrixImport';
import { rankMaterialMatches } from '@/data/materialSynonyms';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Constants ──────────────────────────────────────────────────────────────

const STALE_DAYS = 60;
/** Cards rendered per page — the list is not virtualised (see visibleLimit). */
const PAGE_SIZE = 60;
/** Above this, bulk grading asks first — it has no undo. */
const BULK_CONFIRM_ABOVE = 50;


/**
 * Categories are derived from the items themselves, not a fixed list.
 *
 * The old fixed set (Cable/Accessories/Tools/Safety/General) was keyword-matched
 * against merchant stock names. Against a trade labour book it put 55% of 1,256
 * items in "General", which is no filter at all. Imported rows are named
 * "SECTION — item — variant", so the section before the first dash IS the
 * category the book itself uses.
 */
const ALL_CATEGORY = 'All';
const TABS = ['Items', 'Bundles'] as const;
type Tab = (typeof TABS)[number];

// ─── Helpers ────────────────────────────────────────────────────────────────

function deriveCategory(name: string): string {
  // Imported labour-book rows carry their own section: "ISOLATORS FUSED
  // SWITCHES — 16 — Double Pole". Trust it over any keyword guess.
  const emDash = name.indexOf(' — ');
  if (emDash > 0) {
    const section = name.slice(0, emDash).trim();
    if (section.length > 2) return section;
  }
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

// ─── Design language ────────────────────────────────────────────────────────
// Matches the specialist certificates (src/components/inspection/ev-charging),
// which carry the current form language: cards go edge-to-edge on a phone and
// inset from `sm:` up, hierarchy comes from type rather than icons or rules,
// and every piece of text is full white — low-opacity white reads as grey.

/** Full-bleed on phones, inset card from sm: up. */
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04]';

/** Same surface, but for a row the whole of which is tappable. */
const cardInteractiveCn =
  cardCn + ' transition-colors hover:from-white/[0.10] hover:to-white/[0.06] touch-manipulation';

/** Single-choice chips — used for the tab switch and the category filter. */
const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const chipBase =
  'h-11 px-4 rounded-full border text-[13px] whitespace-nowrap transition-colors ' +
  'touch-manipulation active:scale-[0.97]';

/** Underline field — no filled box, no focus ring; the caret and the rule carry focus. */
const fieldCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent ' +
  'px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow ' +
  'transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 ' +
  'focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

/** Field label — sentence case, full white. Never white/60-70, which reads grey. */
const labelCn = 'mb-1 block text-[12px] font-medium text-white';

/** Underline field — no filled box, no focus ring; the caret and the rule carry focus. */
const searchInputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent ' +
  'pl-7 pr-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow ' +
  'transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 ' +
  'focus:ring-0 focus:outline-none touch-manipulation';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.03 } } };
// `as const` on the type: framer-motion's Variants wants the literal 'spring',
// and a widened string produced eight type errors off this one declaration.
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } } };

// ─── Main ───────────────────────────────────────────────────────────────────

export default function PriceBook() {
  const { lists, updateItemDetails, addItem, bulkUpsertItems, createList, removeItem, bulkSetLabourGrade } = useMaterialsLists();
  const { settings, updateMarkup, calcSellPrice } = usePriceBookSettings();
  const { bundles, createBundle, deleteBundle, bundleTotal } = usePriceBookBundles();
  const { items: stockItems } = useInventoryStorage();
  const { companyProfile } = useCompanyProfile();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Rate the labour allowance is costed at. Mirrors the quote builder so the
  // preview here matches what lands on the quote (ELE-1470).
  const hourlyRate = companyProfile?.hourly_rate ?? 0;
  // Per-grade rates (ELE-1445). Already populated for every profile and edited
  // from Profile -> Worker rates; the price book just needed to read them.
  // Memoised: a fresh object each render re-ran every memo that depends on it,
  // which with 1,200+ items meant recomputing the whole book on every keystroke.
  const rateSources = useMemo(
    () => ({
      workerRates: companyProfile?.worker_rates,
      hourlyRate: companyProfile?.hourly_rate,
    }),
    [companyProfile?.worker_rates, companyProfile?.hourly_rate]
  );

  // Live stock lookup for price-book items linked to a `personal_inventory` row.
  const stockById = useMemo(
    () => new Map(stockItems.map((s) => [s.id, s])),
    [stockItems],
  );
  const stockForItem = useCallback(
    (item: MaterialsListItem) =>
      item.personal_inventory_id ? stockById.get(item.personal_inventory_id) ?? null : null,
    [stockById],
  );

  const [tab, setTab] = useState<Tab>('Items');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);

  // Edit item sheet
  const [editSheet, setEditSheet] = useState<PricedItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editCostPrice, setEditCostPrice] = useState('');
  const [editSellPrice, setEditSellPrice] = useState('');
  const [editMarkup, setEditMarkup] = useState('');
  const [editUnit, setEditUnit] = useState('');
  const [editSupplier, setEditSupplier] = useState('');
  /** Hours per grade, keyed by grade id — "0.5 electrician + 0.5 apprentice". */
  const [editLabour, setEditLabour] = useState<Record<string, string>>({});
  const [showAllGrades, setShowAllGrades] = useState(false);
  const [editMode, setEditMode] = useState<'cost' | 'sell'>('cost');
  const [editStockId, setEditStockId] = useState<string | undefined>(undefined);

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
  const [importParsed, setImportParsed] = useState<{ name: string; price: number; unit: string; supplier: string; labourHours?: number; labourGrade?: string }[]>([]);
  /** Grade applied to imported rows that don't name one (ELE-1445). */
  const [importDefaultGrade, setImportDefaultGrade] = useState<string>(DEFAULT_LABOUR_GRADE);
  /** Which of the user's columns we mapped to what — null when the file had no usable header. */
  const [importCols, setImportCols] = useState<{ label: string; header: string }[] | null>(null);
  const [importing, setImporting] = useState(false);

  // Bundle sheet
  const [bundleSheetOpen, setBundleSheetOpen] = useState(false);
  const [bundleName, setBundleName] = useState('');
  const [bundleDesc, setBundleDesc] = useState('');
  const [bundleLabourHours, setBundleLabourHours] = useState('');
  const [bundlePickerSearch, setBundlePickerSearch] = useState('');
  const [bundleItems, setBundleItems] = useState<BundleLineItem[]>([]);
  const [expandedBundle, setExpandedBundle] = useState<string | null>(null);

  // Computed
  /**
   * Everything the page shows: stats, categories, search and the grid all read
   * this list.
   *
   * The gate used to be "has a price", which silently hid every labour-book
   * item — Sean's 1,244 imported times were in the database and invisible in
   * the app, because a time guide carries hours and no price. An item earns its
   * place here if it has a price OR a labour allowance.
   */
  const pricedItems = useMemo<PricedItem[]>(() => {
    const result: PricedItem[] = [];
    for (const list of lists) {
      for (const item of list.items) {
        const hasPrice = (item.estimated_price ?? 0) > 0 || (item.cost_price ?? 0) > 0;
        const hasLabour = labourAllocations(item).length > 0;
        if (hasPrice || hasLabour) {
          result.push({ item, listId: list.id, listName: list.name });
        }
      }
    }
    return result;
  }, [lists]);

  /** Real categories with counts, biggest first — 53 sections is too many to
   *  read in a fixed order, but the ones you use most float to the front. */
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of pricedItems) {
      const c = deriveCategory(p.item.name);
      counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    return [
      { name: ALL_CATEGORY, count: pricedItems.length },
      ...[...counts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([name, count]) => ({ name, count })),
    ];
  }, [pricedItems]);

  /** Book-wide figures. Labour is the bulk of this book now, so lead with it. */
  const bookStats = useMemo(() => {
    let priced = 0;
    let withTime = 0;
    let hours = 0;
    let labourValue = 0;
    for (const p of pricedItems) {
      // Inlined rather than calling getSellPrice: that useCallback is declared
      // below this memo, so referencing it here is a temporal dead zone.
      if ((p.item.estimated_price ?? 0) > 0 || (p.item.cost_price ?? 0) > 0) priced++;
      const l = labourLinesFor(p.item, 1, rateSources);
      if (l.totalHours > 0) {
        withTime++;
        hours += l.totalHours;
        labourValue += l.total;
      }
    }
    return {
      priced,
      withTime,
      hours: Math.round(hours * 10) / 10,
      labourValue: Math.round(labourValue),
    };
  }, [pricedItems, rateSources]);

  const [bulkGrading, setBulkGrading] = useState(false);
  const [bulkMode, setBulkMode] = useState<'only' | 'add'>('only');
  /** Grade awaiting a second tap when the batch is large. */
  const [armedGrade, setArmedGrade] = useState<string | null>(null);

  const staleCount = useMemo(() => pricedItems.filter((p) => (daysOld(p.item.price_updated_at) ?? 0) >= STALE_DAYS).length, [pricedItems]);

  /** Every name already in the book, normalised the same way the importer
   *  matches on, so the preview can say "new" or "updating" honestly. */
  const existingNames = useMemo(() => {
    const set = new Set<string>();
    for (const list of lists) for (const item of list.items) set.add(normaliseItemName(item.name));
    return set;
  }, [lists]);

  /** Price-book items offered inside the bundle builder, filtered by its own
   *  search so a large book stays usable. */
  const bundlePickerItems = useMemo(() => {
    const q = bundlePickerSearch.trim().toLowerCase();
    if (!q) return pricedItems;
    return rankMaterialMatches(pricedItems, q, (p) => p.item.name);
  }, [pricedItems, bundlePickerSearch]);

  /** What the import is actually about to do, counted before it runs. */
  const importSplit = useMemo(() => {
    let added = 0;
    let updated = 0;
    let skipped = 0;
    for (const row of importParsed) {
      // A row with a labour time but no price is still worth importing —
      // Sean Mulcahy's labour book is times only, and read strictly every one
      // of its rows was being skipped. Times merge onto the matching item
      // without touching its price.
      if (!row.name || (!(row.price > 0) && !((row.labourHours ?? 0) > 0))) {
        skipped++;
        continue;
      }
      if (existingNames.has(normaliseItemName(row.name))) updated++;
      else added++;
    }
    return { added, updated, skipped, valid: added + updated };
  }, [importParsed, existingNames]);

  const filtered = useMemo(() => {
    let items = pricedItems;
    if (activeCategory !== 'All') items = items.filter((p) => deriveCategory(p.item.name) === activeCategory);
    // Was a bare substring filter — no synonyms, no ranking. Now the same
    // ranked matcher the quote and invoice builders use, so all three agree.
    if (search.trim()) items = rankMaterialMatches(items, search, (p) => p.item.name);
    return items;
  }, [pricedItems, activeCategory, search]);

  /**
   * The list renders a card per item with no virtualisation. That was fine at
   * the 20–50 items a hand-built book holds; importing a trade labour book puts
   * 1,200+ in it, and rendering the lot locks a phone up on the exact device
   * this is used on. Render a page at a time instead.
   */
  const [visibleLimit, setVisibleLimit] = useState(PAGE_SIZE);
  const visible = useMemo(() => filtered.slice(0, visibleLimit), [filtered, visibleLimit]);
  // Any change of filter starts again from the top, or "Show more" would be
  // paging through a list the user has already narrowed.
  useEffect(() => setVisibleLimit(PAGE_SIZE), [activeCategory, search]);
  // Never leave a grade armed against a different set of items than the one the
  // user was looking at when they armed it.
  useEffect(() => setArmedGrade(null), [activeCategory, search, bulkMode]);

  /**
   * Items in the current filter that carry hours — what bulk grading acts on.
   * Grouped by list because an item's id only means something within its own
   * list, and the price book can show several at once.
   */
  const gradeable = useMemo(() => {
    const byList = new Map<string, string[]>();
    for (const p of filtered) {
      if (labourAllocations(p.item).length === 0) continue;
      const ids = byList.get(p.listId) ?? [];
      ids.push(p.item.id);
      byList.set(p.listId, ids);
    }
    return { byList, total: [...byList.values()].reduce((n, ids) => n + ids.length, 0) };
  }, [filtered]);

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
    const seeded: Record<string, string> = {};
    for (const a of labourAllocations(item)) seeded[a.grade] = String(a.hours);
    setEditLabour(seeded);
    setShowAllGrades(false);
    setEditStockId(item.personal_inventory_id);
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
    const updates: Partial<MaterialsListItem> = { name: editName.trim() || editSheet.item.name, unit: editUnit.trim() || 'each', supplier: editSupplier.trim() || undefined, personal_inventory_id: editStockId };
    // Blank clears the allowance rather than storing 0, so "no labour on this
    // item" and "zero hours" stay the same thing (ELE-1470).
    // Multi-grade allocation. Blank or zero clears that grade entirely rather
    // than storing 0, so "no apprentice on this" and "zero apprentice hours"
    // stay the same thing.
    const allocations = LABOUR_GRADES.map((g) => ({ grade: g.id, hours: parseFloat(editLabour[g.id] ?? '') }))
      .filter((a) => !isNaN(a.hours) && a.hours > 0);
    updates.labour = allocations.length > 0 ? allocations : undefined;
    // Keep the legacy pair in step so anything still reading it stays correct;
    // it mirrors the first allocation only.
    updates.labour_hours = allocations[0]?.hours;
    updates.labour_grade = allocations[0]?.grade;
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
  const resetBundleSheet = () => { setBundleName(''); setBundleDesc(''); setBundleLabourHours(''); setBundleItems([]); setBundlePickerSearch(''); setBundleSheetOpen(false); };

  // Import — parse price string (handles £, commas in numbers)
  const cleanPrice = (raw: string): number => {
    if (!raw) return 0;
    const cleaned = raw.replace(/[£$,\s]/g, '').trim();
    const val = parseFloat(cleaned);
    return isNaN(val) ? 0 : val;
  };

  // Detect if a line is a header row
  const isHeaderRow = (parts: string[]): boolean => {
    const joined = parts.join(' ').toLowerCase();
    return ['name', 'price', 'cost', 'description', 'item', 'product', 'unit price', 'labour', 'hours'].some((h) => joined.includes(h));
  };

  /**
   * Split a CSV line, respecting double quotes.
   *
   * A plain `.split(',')` tears "Cable, 2.5mm T&E" into two columns and shifts
   * every field after it — and Excel quotes exactly those fields, so a real
   * exported spreadsheet is where it breaks, not a hand-typed one.
   */
  const splitCsvLine = (line: string): string[] => {
    const out: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        out.push(cur.trim());
        cur = '';
      } else {
        cur += ch;
      }
    }
    out.push(cur.trim());
    return out;
  };

  /**
   * Map a header row to column positions (ELE-1470).
   *
   * The header used to be detected and then thrown away, after which columns
   * were read by position. That only works for a file written to our layout —
   * and the whole point is importing the spreadsheet the electrician already
   * has. Sean's is "all the rates per item on a csv already", in his order,
   * not ours. Read blind, his labour column would be taken as the price and a
   * 0.5h item at £30 would import as £0.50 with no labour time.
   *
   * Returns null when no column is recognisable, so the caller falls back to
   * the positional reader for headerless files.
   */
  const mapHeaderColumns = (parts: string[]) => {
    const norm = parts.map((p) => p.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim());
    const find = (...needles: string[]) =>
      norm.findIndex((h) => needles.some((n) => h.includes(n)));

    // Labour first: "labour rate" and "unit price" both contain price-ish
    // words, so the more specific match has to claim its column before the
    // price matcher gets to look at it.
    const labour = find('labour hour', 'labour time', 'labour', 'hours', 'hrs', 'minutes', 'mins', 'time');
    const price = norm.findIndex(
      (h, idx) =>
        idx !== labour &&
        ['price', 'cost', 'buy', 'trade', 'net', 'rate'].some((n) => h.includes(n))
    );
    const name = find('description', 'item', 'name', 'product', 'part');
    const unit = norm.findIndex((h, idx) => idx !== price && /\b(unit|uom|measure)\b/.test(h));
    const supplier = find('supplier', 'vendor', 'manufacturer', 'brand', 'merchant');
    // Who does the work (ELE-1445). Excluded from the labour match above by
    // being looked for separately — a "labour grade" column is not hours.
    const grade = norm.findIndex(
      (h, idx) =>
        idx !== labour &&
        ['grade', 'operative', 'worker', 'who', 'labour type', 'trade type'].some((c) => h.includes(c))
    );

    if (name < 0 && price < 0 && labour < 0) return null;

    // A column headed in minutes is stored as hours — the value means the same
    // thing either way, and importing "30" as thirty hours would be absurd.
    const labourInMinutes = labour >= 0 && /\b(minutes|mins)\b/.test(norm[labour]);

    return { name, price, unit, supplier, labour, labourInMinutes, grade };
  };

  /**
   * Labour allowance on import (ELE-1470).
   *
   * People write a time allowance every way there is, so accept every way
   * rather than make the electrician reformat a spreadsheet they already
   * maintain: "0.5", "0.5h", "30m", "30 mins", "1h 30m", "1:30", and "45"
   * where the column itself is headed in minutes.
   *
   * Returns undefined rather than a guess when nothing parses — a wrong labour
   * figure silently becomes a wrong invoice, so no value beats a bad one.
   */
  /**
   * Map a free-text grade from the electrician's own spreadsheet onto one of our
   * worker types (ELE-1445). Sean writes "Electrician" and "Apprentice"; other
   * books say "Spark", "Mate", "Improver". Anything unrecognised returns
   * undefined so the item falls back to electrician rather than being silently
   * costed at a labourer rate.
   */
  const cleanLabourGrade = (raw?: string): string | undefined => {
    if (!raw) return undefined;
    const v = raw.toLowerCase().replace(/[^a-z]/g, '');
    if (!v) return undefined;
    if (/(apprentice|improver|mate|trainee)/.test(v)) return 'apprentice';
    if (/(labour|labor|groundwork|handyman)/.test(v)) return 'labourer';
    if (/(design|engineer|estimat)/.test(v)) return 'designer';
    if (/(owner|director|principal|supervisor)/.test(v)) return 'owner';
    if (/(electrician|spark|qualified|jib|approved)/.test(v)) return 'electrician';
    return undefined;
  };

  const cleanLabourHours = (
    raw: string | undefined,
    columnIsMinutes = false
  ): number | undefined => {
    if (!raw) return undefined;
    const s = raw.toLowerCase().trim();
    if (!s) return undefined;

    // "1:30" — hours:minutes
    const clock = s.match(/^(\d+)\s*:\s*(\d{1,2})$/);
    if (clock) {
      const h = parseInt(clock[1], 10) + parseInt(clock[2], 10) / 60;
      return h > 0 ? Math.round(h * 100) / 100 : undefined;
    }

    // "1h 30m" / "1 hr 30 min" — combined units
    const combined = s.match(/(\d+(?:\.\d+)?)\s*h(?:ou)?r?s?\s*(\d+(?:\.\d+)?)\s*m/);
    if (combined) {
      const h = parseFloat(combined[1]) + parseFloat(combined[2]) / 60;
      return h > 0 ? Math.round(h * 100) / 100 : undefined;
    }

    const num = parseFloat(s.replace(/[^\d.]/g, ''));
    if (isNaN(num) || num <= 0) return undefined;

    // An explicit minute unit on the value wins over the column heading.
    // No leading \b: in "30m" the digit and the m are both word characters, so
    // there is no boundary between them and \bm never matches — which read
    // half an hour as thirty hours.
    const saysMinutes = /\d\s*m(?:in|ins|inute|inutes)?\.?\s*$/.test(s) && !/h/.test(s);
    const hours = saysMinutes || columnIsMinutes ? num / 60 : num;
    return hours > 0 ? Math.round(hours * 100) / 100 : undefined;
  };

  // Parse text (paste, CSV content, or extracted doc text) into items
  const parseImportText = (text: string) => {
    const lines = text.split(/\r?\n/).filter((l) => l.trim());
    const parsed: typeof importParsed = [];

    // Cross-tab labour book (ELE-1445). Trade time guides are grids — item
    // rating down the side, variant across the top, and often two tables side
    // by side on the same rows. Read one-item-per-row, the first time value
    // becomes the price and every other column is lost, so this has to be
    // detected before the list readers get a look.
    if (looksLikeLabourMatrix(text)) {
      const matrix = parseLabourMatrix(text);
      if (matrix.rows.length > 0) {
        // Same "here is what we read" panel as the list importer, so a matrix
        // paste is never silently reinterpreted.
        setImportCols([
          { label: 'Layout', header: 'Labour time guide (grid)' },
          {
            label: 'Sections',
            header: matrix.sections.slice(0, 3).join(', ') || 'none found',
          },
          {
            label: 'Variants',
            header: matrix.variants.slice(0, 4).join(', ') || 'none found',
          },
          { label: 'Times found', header: String(matrix.rows.length) },
        ]);
        setImportParsed(
          matrix.rows.map((r) => ({
            name: r.name,
            price: 0,
            unit: 'each',
            supplier: '',
            labourHours: r.labourHours,
          }))
        );
        return;
      }
    }

    // Delimiter is whichever separator the first line actually uses. Tabs come
    // from a spreadsheet paste, semicolons from Excel on a European locale.
    const first = lines[0] || '';
    const delimiter = first.includes('\t') ? '\t' : first.includes(';') ? ';' : ',';
    const split = (line: string) =>
      delimiter === ',' ? splitCsvLine(line) : line.split(delimiter).map((p) => p.trim());

    // If the file describes its own columns, believe it. Order and extra
    // columns then stop mattering, which is the difference between importing
    // OUR layout and importing the spreadsheet the electrician already keeps.
    const headerParts = split(first);
    const cols = isHeaderRow(headerParts) ? mapHeaderColumns(headerParts) : null;

    if (cols) {
      // Show which of their columns we read as what. A silent mapping is how a
      // trade price ends up imported as a labour time and nobody notices until
      // it is on a quote.
      setImportCols(
        (
          [
            ['Name', cols.name],
            ['Cost price', cols.price],
            ['Unit', cols.unit],
            ['Supplier', cols.supplier],
            [cols.labourInMinutes ? 'Labour (minutes)' : 'Labour time', cols.labour],
          ] as [string, number][]
        )
          .filter(([, idx]) => idx >= 0)
          .map(([label, idx]) => ({ label, header: headerParts[idx] }))
      );
      for (let i = 1; i < lines.length; i++) {
        const parts = split(lines[i]);
        const at = (idx: number) => (idx >= 0 ? parts[idx] : undefined);
        const name = (at(cols.name) ?? parts[0] ?? '').trim();
        if (!name) continue;
        parsed.push({
          name,
          price: cleanPrice(at(cols.price) || ''),
          unit: at(cols.unit)?.trim() || 'each',
          supplier: at(cols.supplier)?.trim() || '',
          labourHours: cleanLabourHours(at(cols.labour), cols.labourInMinutes),
          labourGrade: cleanLabourGrade(at(cols.grade)),
        });
      }
      setImportParsed(parsed);
      return;
    }

    setImportCols(null);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Tab-separated takes priority (unambiguous)
      if (line.includes('\t')) {
        const parts = line.split('\t');
        if (i === 0 && isHeaderRow(parts)) continue;
        const name = parts[0]?.trim();
        if (!name) continue;
        parsed.push({ name, price: cleanPrice(parts[1] || ''), unit: parts[2]?.trim() || 'each', supplier: parts[3]?.trim() || '', labourHours: cleanLabourHours(parts[4]) });
        continue;
      }
      // Headerless comma-separated — names might contain commas, so find the
      // first segment that looks like a price and treat everything before it
      // as the name. Quote-aware split so Excel's quoted fields survive.
      const parts = splitCsvLine(line);
      if (i === 0 && isHeaderRow(parts)) continue;
      if (parts.length === 1) {
        // Single value — just a name, no price
        if (parts[0]) parsed.push({ name: parts[0], price: 0, unit: 'each', supplier: '' });
        continue;
      }
      // Find the first part after index 0 that looks like a price
      let priceIdx = -1;
      for (let j = 1; j < parts.length; j++) {
        const cleaned = parts[j].replace(/[£$,\s]/g, '');
        if (/^\d+\.?\d*$/.test(cleaned) && parseFloat(cleaned) > 0) { priceIdx = j; break; }
      }
      if (priceIdx === -1) {
        // No price found — treat whole line as name
        parsed.push({ name: line.trim(), price: 0, unit: 'each', supplier: '' });
      } else {
        const name = parts.slice(0, priceIdx).join(', ').trim();
        if (!name) continue;
        parsed.push({
          name,
          price: cleanPrice(parts[priceIdx]),
          unit: parts[priceIdx + 1]?.trim() || 'each',
          supplier: parts[priceIdx + 2]?.trim() || '',
          labourHours: cleanLabourHours(parts[priceIdx + 3]),
        });
      }
    }
    setImportParsed(parsed);
  };

  // Handle file upload (CSV, XLSX, DOCX)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase();

    try {
      if (ext === 'csv' || ext === 'txt') {
        // CSV/TXT — read as text and parse
        const text = await file.text();
        setImportText(text);
        parseImportText(text);
      } else if (ext === 'xlsx' || ext === 'xls') {
        // Excel — use xlsx library
        const XLSX = await import('xlsx');
        const buffer = await file.arrayBuffer();
        const wb = XLSX.read(buffer, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const csv = XLSX.utils.sheet_to_csv(ws);
        setImportText(csv);
        parseImportText(csv);
      } else if (ext === 'docx') {
        // Word .docx — unzip and extract text from word/document.xml
        try {
          const JSZip = (await import('jszip')).default;
          const zip = await JSZip.loadAsync(await file.arrayBuffer());
          const docXml = await zip.file('word/document.xml')?.async('text');
          if (!docXml) throw new Error('No document.xml found');
          // Extract text from XML — get content between <w:t> tags, separate paragraphs with newlines
          const textParts: string[] = [];
          let currentLine = '';
          // Match paragraph boundaries and text runs
          const paragraphs = docXml.split(/<\/w:p>/);
          for (const para of paragraphs) {
            const texts = para.match(/<w:t[^>]*>([^<]*)<\/w:t>/g);
            if (texts) {
              currentLine = texts.map((t) => t.replace(/<[^>]+>/g, '')).join('');
              if (currentLine.trim()) textParts.push(currentLine.trim());
            }
          }
          const extracted = textParts.join('\n');
          if (!extracted.trim()) {
            toast({ title: 'No text found in document', description: 'The Word document appears to be empty or uses an unsupported format.', variant: 'destructive' });
          } else {
            setImportText(extracted);
            parseImportText(extracted);
          }
        } catch {
          toast({ title: 'Could not read Word document', description: 'Try saving as CSV or copy-paste the content instead.', variant: 'destructive' });
        }
      } else if (ext === 'doc') {
        toast({ title: 'Old Word format (.doc) not supported', description: 'Please save as .docx, .csv, or copy-paste the content.', variant: 'destructive' });
      } else {
        toast({ title: 'Unsupported file type', description: 'Please use CSV, Excel (.xlsx), or Word (.docx) files.', variant: 'destructive' });
      }
    } catch (err) {
      console.error('File import error:', err);
      toast({ title: 'Failed to read file', description: 'Please try pasting the content instead.', variant: 'destructive' });
    }

    // Reset the input so the same file can be re-selected
    e.target.value = '';
  };

  const handleImport = async () => {
    const validItems = importParsed.filter(
      (i) => i.name && (i.price > 0 || (i.labourHours ?? 0) > 0)
    );
    if (validItems.length === 0) return;
    setImporting(true);
    let list = lists.find((l) => l.name === 'Price Book');
    if (!list) { const created = await createList('Price Book', 'Items added directly to My Price Book'); if (!created) { setImporting(false); return; } list = created; }
    // One merged write, matching on name — re-importing the same list refreshes
    // prices instead of giving the electrician two of everything.
    const { added, updated } = await bulkUpsertItems(
      list.id,
      validItems.map((item) => ({
        name: item.name,
        current_price: calcSellPrice(item.price, settings.globalMarkupPercent),
        cost_price: item.price,
        markup_percent: settings.globalMarkupPercent,
        supplier_name: item.supplier || undefined,
        labour_hours: item.labourHours,
        // Only stamp a grade on rows that actually carry hours, and fall back
        // to the chosen default when the sheet does not name one.
        labour_grade: (item.labourHours ?? 0) > 0 ? (item.labourGrade || importDefaultGrade) : undefined,
      }))
    );
    const count = added + updated;
    const withLabour = validItems.filter((i) => (i.labourHours ?? 0) > 0).length;
    toast({
      title: updated > 0 ? `${added} added · ${updated} updated` : `${count} items imported`,
      description: `${settings.globalMarkupPercent}% markup applied${withLabour > 0 ? ` · ${withLabour} with labour times` : ''}`,
    });
    setImportText('');
    setImportParsed([]);
    setImportSheetOpen(false);
    setImporting(false);
  };

  // Add item/bundle to quote
  const handleAddToQuote = (item: MaterialsListItem, price: number, unit: string) => {
    const sessionId = `pricebook_${crypto.randomUUID()}`;
    const labour = labourLinesFor(item, 1, rateSources);
    const lines: {
      id: string;
      description: string;
      category: 'materials' | 'labour';
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      unit: string;
      notes: string;
    }[] = [];

    // A labour-book item has hours and no price. Sending a £0.00 materials line
    // would put a free item on a customer quote; send the labour instead.
    if (price > 0) {
      lines.push({
        id: crypto.randomUUID(),
        description: item.name,
        category: 'materials',
        quantity: 1,
        unitPrice: price,
        totalPrice: price,
        unit,
        notes: '',
      });
    }
    for (const line of labour.lines) {
      lines.push({
        id: crypto.randomUUID(),
        description: `Labour — ${item.name} (${shortGradeLabel(line.grade)})`,
        category: 'labour',
        quantity: line.hours,
        unitPrice: line.rate,
        totalPrice: line.total,
        unit: 'hour',
        notes: '',
      });
    }
    if (lines.length === 0) {
      toast({
        title: 'Nothing to add yet',
        description: 'This item has no price and no labour time.',
        variant: 'destructive',
      });
      return;
    }

    const data = { source: 'price_book', sourceLabel: 'Price Book', materials: lines };
    storageSetJSONSync(sessionId, { materialsData: data });
    navigate(`/electrician/quote-builder/create?materialsSessionId=${sessionId}`);
  };

  const handleBundleToQuote = (bundle: typeof bundles[0]) => {
    const sessionId = `bundle_${crypto.randomUUID()}`;
    const data = {
      source: 'price_book_bundle',
      sourceLabel: bundle.name,
      materials: bundle.items.map((i) => ({ id: crypto.randomUUID(), description: i.name, category: i.category as 'materials' | 'labour', quantity: i.quantity, unitPrice: i.unitPrice, totalPrice: i.quantity * i.unitPrice, unit: i.unit, notes: '' })),
    };
    storageSetJSONSync(sessionId, { materialsData: data });
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
              <div className="flex-1 min-w-0">
                <h1 className="text-base font-semibold text-white">Price Book</h1>
              </div>
              {tab === 'Items' && (
                <Button variant="ghost" size="icon" onClick={() => setImportSheetOpen(true)} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation">
                  <Upload className="h-4 w-4" />
                </Button>
              )}
              <Button onClick={() => (tab === 'Items' ? setAddSheetOpen(true) : setBundleSheetOpen(true))} size="sm" className="h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold px-3">
                <Plus className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            </div>
          </div>

          {/* Two choices, so chips rather than a filled segment control — the
              solid yellow bar shouted louder than anything it contained. */}
          <div className="flex gap-2 px-4 pb-3">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(chipBase, tab === t ? chipOn : chipOff)}
              >
                {t}
                {t === 'Bundles' && bundles.length > 0 && (
                  <span className="ml-1.5 tabular-nums">{bundles.length}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-5">
          {/* ── Items Tab ── */}
          {tab === 'Items' && (
            <>
              {/* One surface split into three, rather than three boxes with
                  three borders competing for the same glance. */}
              {/* Six figures, not three. "Stale" measured price age, which says
                  nothing about a book that is now mostly labour times — it moves
                  below as a warning, where a warning belongs. */}
              <motion.div variants={itemVariants} className={cn(cardCn, 'grid grid-cols-3 overflow-hidden sm:grid-cols-6')}>
                <div className="px-3 py-3.5 sm:px-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Items</p>
                  <p className="mt-1 text-[20px] font-bold tabular-nums leading-none tracking-tight text-white">
                    {pricedItems.length}
                  </p>
                </div>
                <div className="border-l border-white/[0.10] px-3 py-3.5 sm:px-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Materials</p>
                  <p className="mt-1 text-[20px] font-bold tabular-nums leading-none tracking-tight text-white">
                    {bookStats.priced}
                  </p>
                </div>
                <div className="border-l border-white/[0.10] px-3 py-3.5 sm:px-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Labour</p>
                  <p className="mt-1 text-[20px] font-bold tabular-nums leading-none tracking-tight text-blue-300">
                    {bookStats.withTime}
                  </p>
                </div>
                <div className="border-l border-white/[0.10] border-t sm:border-t-0 px-3 py-3.5 sm:px-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Hours</p>
                  <p className="mt-1 text-[20px] font-bold tabular-nums leading-none tracking-tight text-white">
                    {bookStats.hours}
                  </p>
                </div>
                <div className="border-l border-white/[0.10] border-t sm:border-t-0 px-3 py-3.5 sm:px-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Labour</p>
                  <p className="mt-1 text-[20px] font-bold tabular-nums leading-none tracking-tight text-blue-300">
                    {bookStats.labourValue > 0 ? formatGBP(bookStats.labourValue).replace('.00', '') : '—'}
                  </p>
                </div>
                <div className="border-l border-white/[0.10] border-t sm:border-t-0 px-3 py-3.5 sm:px-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Markup</p>
                  {editingMarkup ? (
                    <div className="mt-1 flex items-baseline gap-1">
                      <input
                        type="text" inputMode="decimal" value={markupInput} autoFocus
                        onChange={(e) => numInput(e.target.value, setMarkupInput)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSaveMarkup(); if (e.key === 'Escape') setEditingMarkup(false); }}
                        onBlur={handleSaveMarkup}
                        className="w-12 border-0 border-b border-elec-yellow bg-transparent p-0 text-[20px] font-bold leading-none tabular-nums text-elec-yellow caret-elec-yellow focus:outline-none focus:ring-0"
                      />
                      <span className="text-[13px] text-white">%</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setMarkupInput(settings.globalMarkupPercent.toFixed(0)); setEditingMarkup(true); }}
                      className="mt-1 block text-left touch-manipulation"
                    >
                      <span className="text-[20px] font-bold tabular-nums leading-none tracking-tight text-elec-yellow">
                        {settings.globalMarkupPercent}%
                      </span>
                    </button>
                  )}
                </div>
              </motion.div>

              {staleCount > 0 && (
                <motion.p variants={itemVariants} className="-mt-2 px-1 text-[12px] text-amber-400">
                  {staleCount} priced {staleCount === 1 ? 'item has' : 'items have'} not been
                  re-priced in {STALE_DAYS} days.
                </motion.p>
              )}

              {/* Rate Card link */}
              <motion.div variants={itemVariants}>
                <Link
                  to="/electrician/rate-card"
                  className={cn(cardInteractiveCn, 'flex items-center gap-3 p-4 sm:p-5 active:scale-[0.99]')}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold tracking-tight text-white">Rate card</p>
                    <p className="mt-0.5 text-[12px] text-white">Labour and call-out prices for quotes</p>
                  </div>
                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-elec-yellow" />
                </Link>
              </motion.div>

              {/* Search — underline, not a filled box */}
              <motion.div variants={itemVariants} className="relative">
                <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                <input
                  type="text"
                  placeholder="Search your price book"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={searchInputCn}
                />
              </motion.div>

              {/* Category filter */}
              <motion.div variants={itemVariants} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-hide sm:mx-0 sm:px-0">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={cn(chipBase, activeCategory === cat.name ? chipOn : chipOff)}
                  >
                    {cat.name}
                    <span className="ml-1.5 tabular-nums opacity-70">{cat.count}</span>
                  </button>
                ))}
              </motion.div>

              {/* Everything imported from a labour book lands as "electrician" —
                  the book does not say who does the work. Re-grading a section
                  is where the money is (an hour moved from £48 to £18 is £30),
                  so offer it against whatever the current filter shows rather
                  than one item at a time. */}
              {gradeable.total > 1 && (
                <motion.div variants={itemVariants} className={cn(cardCn, 'space-y-2')}>
                  <p className="text-[12px] font-semibold text-white">
                    Labour for {gradeable.total}{' '}
                    {activeCategory === ALL_CATEGORY ? 'timed items' : `items in ${activeCategory}`}
                  </p>
                  {/* Two-man tasks are the normal case on a board change or a
                      pull-in, so "add alongside" sits beside "move all to". */}
                  <div className="flex gap-2">
                    {([
                      { id: 'only' as const, label: 'Move all to' },
                      { id: 'add' as const, label: 'Add alongside' },
                    ]).map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setBulkMode(m.id)}
                        className={cn(
                          'h-9 flex-1 rounded-full border text-[12px] transition-colors touch-manipulation',
                          bulkMode === m.id
                            ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                            : 'border-white/[0.12] bg-white/[0.04] font-medium text-white'
                        )}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {LABOUR_GRADES.map((g) => {
                      const rate = rateForGrade(g.id, rateSources);
                      return (
                        <button
                          key={g.id}
                          disabled={bulkGrading}
                          onClick={async () => {
                            // With no filter this is every timed item in the
                            // book — re-grading 1,200 items on one tap, with no
                            // undo. Arm it on the first tap instead of throwing
                            // a browser confirm() at a mobile-first app.
                            if (gradeable.total > BULK_CONFIRM_ABOVE && armedGrade !== g.id) {
                              setArmedGrade(g.id);
                              return;
                            }
                            setArmedGrade(null);
                            setBulkGrading(true);
                            let changed = 0;
                            for (const [listId, ids] of gradeable.byList) {
                              changed += await bulkSetLabourGrade(listId, ids, g.id, bulkMode);
                            }
                            setBulkGrading(false);
                            toast({
                              title: changed > 0
                                ? bulkMode === 'add'
                                  ? `${shortGradeLabel(g.id)} added to ${changed} ${changed === 1 ? 'item' : 'items'}`
                                  : `${changed} ${changed === 1 ? 'item' : 'items'} moved to ${shortGradeLabel(g.id)}`
                                : 'Nothing to change',
                              description: changed > 0 && rate > 0
                                ? `Now costed at ${formatGBP(rate)}/hr.`
                                : undefined,
                            });
                          }}
                          className={cn(
                            'flex h-11 flex-col items-center justify-center rounded-xl border px-1 transition-all disabled:opacity-50 touch-manipulation',
                            armedGrade === g.id
                              ? 'border-elec-yellow bg-elec-yellow text-black'
                              : 'border-white/[0.12] bg-white/[0.06] text-white hover:border-white/[0.25]'
                          )}
                        >
                          <span className="text-[12px] font-medium">
                            {armedGrade === g.id ? 'Tap again' : shortGradeLabel(g.id)}
                          </span>
                          <span className="text-[10px] tabular-nums">
                            {armedGrade === g.id
                              ? `${gradeable.total} items`
                              : rate > 0
                                ? `${formatGBP(rate)}/hr`
                                : 'no rate'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Items */}
              {filtered.length === 0 ? (
                <motion.div variants={itemVariants} className="py-14 text-center">
                  <h2 className="text-[15px] font-semibold tracking-tight text-white">
                    {pricedItems.length === 0 ? 'No priced items yet' : 'No matching items'}
                  </h2>
                  <p className="mx-auto mt-1.5 max-w-xs text-[13px] text-white">
                    {pricedItems.length === 0
                      ? 'Import the price list you already keep, or add your first item by hand.'
                      : 'Try a different search or category.'}
                  </p>
                  {pricedItems.length === 0 && (
                    <div className="mt-5 flex justify-center gap-2">
                      <button
                        onClick={() => setImportSheetOpen(true)}
                        className="h-11 rounded-xl bg-elec-yellow px-5 text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
                      >
                        Import a price list
                      </button>
                      <button
                        onClick={() => setAddSheetOpen(true)}
                        className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.04] px-5 text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98]"
                      >
                        Add an item
                      </button>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* One column on a phone; two from lg, where a single column of
                   full-width cards leaves most of the screen empty. */
                <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
                  {visible.map((p) => {
                    const sellPrice = getSellPrice(p.item);
                    const hasCost = (p.item.cost_price ?? 0) > 0;
                    const days = daysOld(p.item.price_updated_at);
                    const stale = (days ?? 0) >= STALE_DAYS;
                    const cat = deriveCategory(p.item.name);
                    // Costed at the item's OWN grade — the card must agree with
                    // what the quote builder will charge, or he quotes one
                    // number and sees another here.
                    const itemLabour = labourLinesFor(p.item, 1, rateSources);
                    return (
                      <motion.div
                        key={`${p.listId}-${p.item.id}`}
                        variants={itemVariants}
                        className={cn(cardCn, 'flex flex-col p-4 sm:p-5', stale && 'border-y-amber-500/25 sm:border-x-amber-500/25')}
                      >
                        {/* flex-1 so short and long names produce cards of the
                            same height, with the actions level across a row. */}
                        <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="min-w-0 flex-1">
                            {/* Sections run to 40 characters ("CABLE LADDER &
                                ACCESSORIES (MEDIUM DUTY)") and this is 10px
                                uppercase with 0.16em tracking — unbounded it
                                wraps to three lines above every item name. */}
                            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-white" title={cat}>
                              {cat}
                            </p>
                            <p className="mt-1 text-[15px] font-semibold leading-snug tracking-tight text-white">
                              {p.item.name}
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] text-white">
                              {p.item.supplier && <span>{p.item.supplier}</span>}
                              <span>{p.listName}</span>
                              {(() => {
                                const stock = stockForItem(p.item);
                                if (!stock) return null;
                                const low = stock.low_stock_threshold != null && stock.quantity <= stock.low_stock_threshold;
                                return (
                                  <span className={cn('flex items-center gap-1', low ? 'text-amber-400' : 'text-emerald-400')}>
                                    <Boxes className="h-3 w-3" />
                                    {stock.quantity} in stock
                                  </span>
                                );
                              })()}
                              {stale && (
                                <span className="flex items-center gap-1 text-amber-400">
                                  <Clock className="h-3 w-3" />
                                  Priced {days}d ago
                                </span>
                              )}
                            </div>
                          </div>
                          {/* A labour-book item has hours and no price. Showing
                              £0.00 in 20px yellow made 1,256 of Sean's items
                              read as worthless; the time IS the value, so lead
                              with it and ask for the price quietly. */}
                          <div className="flex-shrink-0 text-right">
                            {sellPrice > 0 ? (
                              <>
                                <p className="text-[20px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
                                  {formatGBP(sellPrice)}
                                </p>
                                <p className="mt-1 text-[12px] text-white">per {p.item.unit || 'each'}</p>
                              </>
                            ) : itemLabour.total > 0 ? (
                              <>
                                <p className="text-[20px] font-bold leading-none tracking-tight text-blue-300 tabular-nums">
                                  {formatGBP(itemLabour.total)}
                                </p>
                                <p className="mt-1 text-[12px] text-white">labour only</p>
                              </>
                            ) : (
                              <p className="text-[13px] font-medium text-white">No price yet</p>
                            )}
                          </div>
                        </div>

                        {/* Cost basis and labour — the working behind the price,
                            kept apart from it so the sell price reads cleanly. */}
                        {(hasCost || labourAllocations(p.item).length > 0) && (
                          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/[0.10] pt-3 text-[12px] text-white tabular-nums">
                            {hasCost && (
                              <span>
                                Cost {formatGBP(p.item.cost_price!)} · {(p.item.markup_percent ?? settings.globalMarkupPercent).toFixed(0)}% markup
                              </span>
                            )}
                            {labourAllocations(p.item).length > 0 && (
                              <span>
                                {describeLabour(labourAllocations(p.item))}
                                {itemLabour.total > 0 && ` · ${formatGBP(itemLabour.total)}`}
                              </span>
                            )}
                          </div>
                        )}

                        </div>

                        <div className="mt-3 flex items-center gap-2 border-t border-white/[0.10] pt-3">
                          <button
                            onClick={() => handleAddToQuote(p.item, sellPrice, p.item.unit || 'each')}
                            className="h-11 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98]"
                          >
                            Add to quote
                          </button>
                          <button
                            onClick={() => openEditSheet(p)}
                            className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98]"
                          >
                            Edit
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Not virtualised — see visibleLimit. Always state the true total
                  so a paged list never reads as the whole book. */}
              {filtered.length > visible.length && (
                <button
                  onClick={() => setVisibleLimit((n) => n + PAGE_SIZE)}
                  className="mt-3 h-12 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.08] touch-manipulation"
                >
                  Show more · {visible.length} of {filtered.length}
                </button>
              )}
            </>
          )}

          {/* ── Bundles Tab ── */}
          {tab === 'Bundles' && (
            <>
              {bundles.length === 0 ? (
                <motion.div variants={itemVariants} className="py-14 text-center">
                  <h2 className="text-[15px] font-semibold tracking-tight text-white">No bundles yet</h2>
                  <p className="mx-auto mt-1.5 max-w-xs text-[13px] text-white">
                    Group materials and labour into something reusable — a consumer unit swap, say, with the board, MCBs, cabling and the time to fit it.
                  </p>
                  <button
                    onClick={() => setBundleSheetOpen(true)}
                    className="mt-5 h-11 rounded-xl bg-elec-yellow px-5 text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
                  >
                    Create a bundle
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <h2 className="text-[15px] font-semibold tracking-tight text-white">
                    {bundles.length} {bundles.length === 1 ? 'bundle' : 'bundles'}
                  </h2>
                  <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
                  {bundles.map((bundle) => {
                    const total = bundleTotal(bundle);
                    const expanded = expandedBundle === bundle.id;
                    return (
                      <motion.div key={bundle.id} variants={itemVariants} className={cn(cardCn, 'overflow-hidden')}>
                        <button
                          className="w-full p-4 text-left touch-manipulation sm:p-5"
                          onClick={() => setExpandedBundle(expanded ? null : bundle.id)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="min-w-0 flex-1">
                              <p className="text-[15px] font-semibold tracking-tight text-white">{bundle.name}</p>
                              {bundle.description && (
                                <p className="mt-0.5 line-clamp-1 text-[12px] text-white">{bundle.description}</p>
                              )}
                              <p className="mt-2 text-[12px] text-white tabular-nums">
                                {bundle.items.length} {bundle.items.length === 1 ? 'item' : 'items'}
                                {bundle.labourHours ? ` · ${bundle.labourHours}h labour` : ''}
                              </p>
                            </div>
                            <div className="flex flex-shrink-0 items-center gap-2">
                              <span className="text-[20px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
                                {formatGBP(total)}
                              </span>
                              {expanded ? (
                                <ChevronUp className="h-4 w-4 text-white" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-white" />
                              )}
                            </div>
                          </div>
                        </button>
                        {expanded && (
                          <div className="border-t border-white/[0.10] px-4 pb-4 sm:px-5 sm:pb-5">
                            <div className="mb-4 mt-3 space-y-2">
                              {bundle.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between gap-3 text-[13px]">
                                  <span className="line-clamp-1 min-w-0 flex-1 text-white">{item.name}</span>
                                  <span className="flex-shrink-0 text-white tabular-nums">
                                    {item.quantity} × {formatGBP(item.unitPrice)}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleBundleToQuote(bundle)}
                                className="h-11 flex-1 rounded-xl bg-elec-yellow text-[13px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
                              >
                                Add to quote
                              </button>
                              <button
                                onClick={() => deleteBundle(bundle.id)}
                                className="h-11 rounded-xl border border-red-500/25 bg-red-500/10 px-4 text-[13px] font-medium text-red-300 transition-colors hover:bg-red-500/15 touch-manipulation active:scale-[0.98]"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                  </div>
                  <button
                    onClick={() => setBundleSheetOpen(true)}
                    className="h-12 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.99]"
                  >
                    Create a bundle
                  </button>
                </div>
              )}
            </>
          )}
        </motion.main>
      </div>

      {/* ── Edit Item Sheet ── */}
      <Sheet open={!!editSheet} onOpenChange={(open) => !open && setEditSheet(null)}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl overflow-y-auto bg-[#111114]">
          <SheetHeader>
            <SheetTitle className="text-[17px] font-semibold tracking-tight text-white">Edit item</SheetTitle>
          </SheetHeader>
          <div className="mt-5 space-y-5 pb-6">
            <div>
              <label className={labelCn}>Item name</label>
              <input value={editName} onChange={(e) => setEditName(e.target.value)} className={fieldCn} />
            </div>

            {/* Two ways to price the same item, so chips rather than a filled
                segment control — the solid bar outweighed the fields below it. */}
            <div>
              <label className={labelCn}>Price by</label>
              <div className="flex gap-2">
                {(['cost', 'sell'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setEditMode(m)}
                    className={cn(chipBase, editMode === m ? chipOn : chipOff)}
                  >
                    {m === 'cost' ? 'Cost + markup' : 'Sell price'}
                  </button>
                ))}
              </div>
            </div>

            {editMode === 'cost' ? (
              <>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className={labelCn}>Cost price (£)</label>
                    <input type="text" inputMode="decimal" value={editCostPrice} placeholder="0.00" onChange={(e) => handleEditCostChange(e.target.value)} className={fieldCn} />
                  </div>
                  <div>
                    <label className={labelCn}>Markup (%)</label>
                    <input type="text" inputMode="decimal" value={editMarkup} placeholder={`${settings.globalMarkupPercent}`} onChange={(e) => handleEditMarkupChange(e.target.value)} className={fieldCn} />
                  </div>
                </div>
                <div className="flex items-baseline justify-between border-t border-white/[0.10] pt-4">
                  <span className="text-[13px] text-white">Sell price, as quoted</span>
                  <span className="text-[20px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
                    {editSellPrice ? formatGBP(parseFloat(editSellPrice)) : '—'}
                  </span>
                </div>
              </>
            ) : (
              <div>
                <label className={labelCn}>Sell price (£)</label>
                <input type="text" inputMode="decimal" value={editSellPrice} placeholder="0.00" onChange={(e) => { if (e.target.value === '' || /^\d*\.?\d*$/.test(e.target.value)) setEditSellPrice(e.target.value); }} className={fieldCn} />
              </div>
            )}

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className={labelCn}>Unit</label>
                <input value={editUnit} onChange={(e) => setEditUnit(e.target.value)} className={fieldCn} />
              </div>
              <div>
                <label className={labelCn}>Supplier</label>
                <input value={editSupplier} onChange={(e) => setEditSupplier(e.target.value)} placeholder="Optional" className={fieldCn} />
              </div>
            </div>

            {/* Labour per grade. A board change or a pull-in is an electrician
                AND an apprentice on site together — pricing that at one rate is
                wrong whichever rate you pick, so every grade gets its own box
                and only the ones with hours are charged (ELE-1445). */}
            <div>
              <label className={labelCn}>Labour time (hours per {editUnit.trim() || 'each'})</label>
              {/* Electrician and apprentice cover nearly every item; labourer,
                  designer and owner are rare. Showing all five always made an
                  already-long sheet longer on a phone, so the rest sit behind a
                  toggle — and any grade that already has hours stays visible. */}
              <div className="mt-1 space-y-2">
                {LABOUR_GRADES.filter(
                  (g) =>
                    showAllGrades ||
                    g.id === 'electrician' ||
                    g.id === 'apprentice' ||
                    parseFloat(editLabour[g.id] ?? '') > 0
                ).map((g) => {
                  const gradeRate = rateForGrade(g.id, rateSources);
                  const h = parseFloat(editLabour[g.id] ?? '');
                  const has = !isNaN(h) && h > 0;
                  return (
                    <div
                      key={g.id}
                      className={cn(
                        'flex items-center gap-3 rounded-xl border px-3 py-2 transition-colors',
                        has ? 'border-elec-yellow/50 bg-elec-yellow/[0.06]' : 'border-white/[0.12] bg-white/[0.03]'
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium text-white">{shortGradeLabel(g.id)}</p>
                        <p className="text-[11px] tabular-nums text-white">
                          {gradeRate > 0 ? `${formatGBP(gradeRate)}/hr` : 'No rate set'}
                        </p>
                      </div>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={editLabour[g.id] ?? ''}
                        placeholder="0"
                        aria-label={`${shortGradeLabel(g.id)} hours`}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v !== '' && !/^\d*\.?\d*$/.test(v)) return;
                          setEditLabour((prev) => ({ ...prev, [g.id]: v }));
                        }}
                        className="h-11 w-20 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-right text-base font-medium tabular-nums text-white caret-elec-yellow placeholder:text-white/25 focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                      />
                      <span className="w-14 text-right text-[12px] tabular-nums text-white">
                        {has && gradeRate > 0 ? formatGBP(h * gradeRate) : '—'}
                      </span>
                    </div>
                  );
                })}
              </div>
              {LABOUR_GRADES.some(
                (g) =>
                  g.id !== 'electrician' &&
                  g.id !== 'apprentice' &&
                  !(parseFloat(editLabour[g.id] ?? '') > 0)
              ) && (
                <button
                  type="button"
                  onClick={() => setShowAllGrades((v) => !v)}
                  className="mt-2 h-11 text-[12.5px] font-medium text-elec-yellow touch-manipulation"
                >
                  {showAllGrades ? 'Fewer grades' : 'More grades'}
                </button>
              )}
              <p className="mt-2 text-[12px] text-white">
                {(() => {
                  const allocs = LABOUR_GRADES
                    .map((g) => ({ grade: g.id, hours: parseFloat(editLabour[g.id] ?? '') }))
                    .filter((a) => !isNaN(a.hours) && a.hours > 0);
                  if (allocs.length === 0) return 'Leave blank to quote this item as materials only.';
                  const { total, totalHours } = labourLinesFor({ labour: allocs }, 1, rateSources);
                  if (total <= 0) return 'Set rates in Profile → Worker rates to cost this time.';
                  return `${describeLabour(allocs)} — ${totalHours}h, ${formatGBP(total)} per ${editUnit.trim() || 'each'}.`;
                })()}
              </p>
            </div>

            {/* Stock link — connect this price-book item to a stock item so quotes
                show availability and stock decrements when the invoice is raised. */}
            <div className="border-t border-white/[0.10] pt-4">
              <label className={labelCn}>Stock item</label>
              {stockItems.length === 0 ? (
                <p className="text-[12px] text-white">
                  No stock items yet — add some in Inventory to link them here.
                </p>
              ) : (
                <Select value={editStockId ?? '__none__'} onValueChange={(v) => setEditStockId(v === '__none__' ? undefined : v)}>
                  <SelectTrigger className="h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white focus:border-elec-yellow focus:ring-0 touch-manipulation">
                    <SelectValue placeholder="Not linked" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground">
                    <SelectItem value="__none__">Not linked</SelectItem>
                    {[...stockItems].sort((a, b) => a.name.localeCompare(b.name)).map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name} · {s.quantity} {s.unit} in stock</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {editStockId && stockById.get(editStockId) && (
                <p className="mt-1.5 text-[12px] text-white">
                  Quotes will show availability, and stock drops when you raise the invoice.
                </p>
              )}
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={handleSaveEdit}
                className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.99]"
              >
                Save changes
              </button>
              <button
                onClick={async () => {
                  if (!editSheet) return;
                  await removeItem(editSheet.listId, editSheet.item.id);
                  toast({ title: 'Item removed from price book' });
                  setEditSheet(null);
                }}
                className="h-12 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-red-300 transition-colors hover:bg-red-500/10 touch-manipulation active:scale-[0.99]"
              >
                Remove from price book
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Add Item Sheet ── */}
      <Sheet open={addSheetOpen} onOpenChange={setAddSheetOpen}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl overflow-y-auto bg-[#111114]">
          <SheetHeader>
            <SheetTitle className="text-[17px] font-semibold tracking-tight text-white">Add to price book</SheetTitle>
          </SheetHeader>
          <div className="mt-5 space-y-5 pb-6">
            <div>
              <label className={labelCn}>Item name</label>
              <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. 2.5mm T&E 100m" className={fieldCn} />
            </div>

            <div>
              <label className={labelCn}>Price by</label>
              <div className="flex gap-2">
                {(['cost', 'sell'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setNewMode(m)}
                    className={cn(chipBase, newMode === m ? chipOn : chipOff)}
                  >
                    {m === 'cost' ? 'Cost + markup' : 'Sell price'}
                  </button>
                ))}
              </div>
            </div>

            {newMode === 'cost' ? (
              <>
                <div>
                  <label className={labelCn}>Cost price (£)</label>
                  <input type="text" inputMode="decimal" value={newCostPrice} placeholder="0.00" onChange={(e) => numInput(e.target.value, setNewCostPrice)} className={fieldCn} />
                </div>
                {newCostPrice && parseFloat(newCostPrice) > 0 && (
                  <div className="flex items-baseline justify-between border-t border-white/[0.10] pt-4">
                    <span className="text-[13px] text-white">Sell price at {settings.globalMarkupPercent}% markup</span>
                    <span className="text-[20px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
                      {formatGBP(calcSellPrice(parseFloat(newCostPrice)))}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div>
                <label className={labelCn}>Sell price (£)</label>
                <input type="text" inputMode="decimal" value={newSellPrice} placeholder="0.00" onChange={(e) => numInput(e.target.value, setNewSellPrice)} className={fieldCn} />
              </div>
            )}

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className={labelCn}>Unit</label>
                <input value={newUnit} onChange={(e) => setNewUnit(e.target.value)} placeholder="each" className={fieldCn} />
              </div>
              <div>
                <label className={labelCn}>Supplier</label>
                <input value={newSupplier} onChange={(e) => setNewSupplier(e.target.value)} placeholder="Optional" className={fieldCn} />
              </div>
            </div>

            <button
              onClick={handleAddItem}
              disabled={!newName.trim() || (newMode === 'cost' ? !newCostPrice : !newSellPrice)}
              className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white/70 touch-manipulation active:scale-[0.99]"
            >
              Add item
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Create Bundle Sheet ── */}
      <Sheet open={bundleSheetOpen} onOpenChange={(open) => { if (!open) resetBundleSheet(); }}>
        <SheetContent side="bottom" className="h-[92vh] rounded-t-2xl overflow-hidden p-0 bg-[#111114]">
          <div className="flex flex-col h-full">
            {/* SheetContent renders its own close button, so the hand-rolled
                one here put two X's in the corner. Both did the same thing —
                closing runs onOpenChange, which already resets the form. */}
            <SheetHeader className="flex-shrink-0 border-b border-white/[0.08] px-4 pb-3 pt-4">
              <SheetTitle className="text-[17px] font-semibold tracking-tight text-white">
                Create a bundle
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
              <div>
                <label className={labelCn}>Bundle name</label>
                <input value={bundleName} onChange={(e) => setBundleName(e.target.value)} placeholder="e.g. Consumer unit swap" className={fieldCn} />
              </div>
              <div>
                <label className={labelCn}>Description</label>
                <input value={bundleDesc} onChange={(e) => setBundleDesc(e.target.value)} placeholder="Optional — what's included" className={fieldCn} />
              </div>
              <div>
                <label className={labelCn}>Estimated labour hours</label>
                <input type="text" inputMode="decimal" value={bundleLabourHours} onChange={(e) => numInput(e.target.value, setBundleLabourHours)} placeholder="e.g. 3.5" className={fieldCn} />
              </div>

              {/* What's in the bundle */}
              <div className="space-y-3 border-t border-white/[0.10] pt-5">
                <h3 className="text-[15px] font-semibold tracking-tight text-white">
                  What's in it{bundleItems.length > 0 ? ` · ${bundleItems.length}` : ''}
                </h3>

                {bundleItems.length === 0 && (
                  <p className="text-[13px] text-white">
                    Nothing yet. Add items from your price book below, or add a labour line.
                  </p>
                )}

                {bundleItems.map((item) => (
                  <div key={item.id} className="rounded-xl border border-white/[0.12] bg-white/[0.04] p-3.5">
                    <div className="flex items-center gap-2">
                      <span className={cn('flex-shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em]', item.category === 'labour' ? 'text-elec-yellow' : 'text-white')}>
                        {item.category === 'labour' ? 'Labour' : 'Material'}
                      </span>
                      <button
                        onClick={() => removeBundleItem(item.id)}
                        className="ml-auto h-8 w-8 flex-shrink-0 rounded-full text-[13px] font-medium text-red-300 transition-colors hover:bg-red-500/10 touch-manipulation"
                        aria-label="Remove from bundle"
                      >
                        <X className="mx-auto h-4 w-4" />
                      </button>
                    </div>
                    <input
                      value={item.name}
                      onChange={(e) => updateBundleItemField(item.id, 'name', e.target.value)}
                      className={cn(fieldCn, 'mt-1')}
                    />
                    <div className="mt-3 flex items-end gap-4">
                      <div className="w-16">
                        <label className={labelCn}>Qty</label>
                        <input type="text" inputMode="decimal" value={item.quantity} onChange={(e) => updateBundleItemField(item.id, 'quantity', e.target.value)} className={cn(fieldCn, 'tabular-nums')} />
                      </div>
                      <div className="w-24">
                        <label className={labelCn}>{item.category === 'labour' ? 'Rate (£)' : 'Price (£)'}</label>
                        <input type="text" inputMode="decimal" value={item.unitPrice === 0 ? '' : item.unitPrice.toFixed(2)} placeholder="0.00" onChange={(e) => updateBundleItemField(item.id, 'unitPrice', e.target.value)} className={cn(fieldCn, 'tabular-nums')} />
                      </div>
                      <span className="ml-auto pb-2 text-[15px] font-bold text-elec-yellow tabular-nums">
                        {formatGBP(item.quantity * item.unitPrice)}
                      </span>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addBundleLabourLine}
                  className="h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98]"
                >
                  Add a labour line
                </button>
              </div>

              {/* Price book picker */}
              {pricedItems.length > 0 && (
                <div className="space-y-3 border-t border-white/[0.10] pt-5">
                  <h3 className="text-[15px] font-semibold tracking-tight text-white">From your price book</h3>
                  {/* A search, because an electrician with a few hundred items
                      cannot scroll to the one they want. */}
                  {pricedItems.length > 6 && (
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                      <input
                        type="text"
                        value={bundlePickerSearch}
                        onChange={(e) => setBundlePickerSearch(e.target.value)}
                        placeholder="Search items"
                        className={searchInputCn}
                      />
                    </div>
                  )}
                  <div className="max-h-56 divide-y divide-white/[0.08] overflow-y-auto rounded-xl border border-white/[0.12] bg-white/[0.03]">
                    {bundlePickerItems.length === 0 ? (
                      <p className="p-3 text-[13px] text-white">No matching items.</p>
                    ) : (
                      bundlePickerItems.map((p) => (
                        <button
                          key={`${p.listId}-${p.item.id}`}
                          onClick={() => addBundleItemFromPriceBook(p)}
                          className="flex w-full items-center gap-3 p-3 text-left transition-colors hover:bg-white/[0.05] touch-manipulation"
                        >
                          <span className="line-clamp-1 flex-1 text-[13px] text-white">{p.item.name}</span>
                          <span className="flex-shrink-0 text-[13px] font-semibold text-elec-yellow tabular-nums">
                            {formatGBP(getSellPrice(p.item))}
                          </span>
                          <Plus className="h-4 w-4 flex-shrink-0 text-white" />
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Running total lives with the action, so it is visible while you
                build rather than scrolled away at the top. */}
            <div className="flex-shrink-0 border-t border-white/[0.08] px-4 pb-6 pt-3">
              <div className="mb-2.5 flex items-baseline justify-between">
                <span className="text-[13px] text-white">
                  {bundleItems.length} {bundleItems.length === 1 ? 'line' : 'lines'}
                </span>
                <span className="text-[20px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
                  {formatGBP(bundleItems.reduce((s, i) => s + i.quantity * i.unitPrice, 0))}
                </span>
              </div>
              <button
                onClick={handleCreateBundle}
                disabled={!bundleName.trim() || bundleItems.length === 0}
                className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white/70 touch-manipulation active:scale-[0.99]"
              >
                Save bundle
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Import Sheet ── */}
      <Sheet open={importSheetOpen} onOpenChange={(open) => { if (!open) { setImportSheetOpen(false); setImportText(''); setImportParsed([]); } }}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl overflow-y-auto bg-[#111114]">
          <SheetHeader>
            <SheetTitle className="text-white">Import Price List</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4 pb-6">
            <p className="text-[13px] leading-relaxed text-white">
              Bring in the price list you already keep. Your own column order is used, so
              nothing needs rearranging, and importing again later updates prices rather
              than duplicating items.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <label className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98]">
                <Upload className="h-4 w-4" />
                Choose a file
                <input
                  type="file"
                  accept=".csv,.txt,.xlsx,.xls,.docx,.doc"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  const sample =
                    'Item,Cost price,Unit,Supplier,Labour hours\n' +
                    '2.5mm T&E 100m,45.99,roll,Screwfix,0\n' +
                    '32A MCB Type B,8.50,each,Toolstation,0.25\n' +
                    '20A Rotary Isolator,30.05,each,CEF,0.5';
                  setImportText(sample);
                  parseImportText(sample);
                }}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98]"
              >
                <ClipboardPaste className="h-4 w-4" />
                Use an example
              </button>
            </div>

            <div>
              <label className={labelCn}>Or paste straight from your spreadsheet</label>
              <Textarea
                value={importText}
                onChange={(e) => {
                  setImportText(e.target.value);
                  parseImportText(e.target.value);
                }}
                placeholder={'Item, Cost price, Unit, Supplier, Labour hours\n2.5mm T&E 100m, 45.99, roll, Screwfix, 0\n32A MCB Type B, 8.50, each, Toolstation, 0.25'}
                className="min-h-[110px] rounded-xl border-white/[0.12] bg-white/[0.03] font-mono text-[13px] text-white placeholder:text-white/25 focus-visible:ring-0 focus:border-elec-yellow touch-manipulation"
              />
              <p className="mt-1.5 text-[12px] text-white">
                Labour time can be hours or minutes — 0.5, 30m, 1h 30m all work. Leave it out
                and items come in as materials only.
              </p>
            </div>

            {/* How their columns were read. Only shown when a header was found,
                because otherwise there is nothing honest to report. */}
            {importCols && importCols.length > 0 && (
              <div className="rounded-xl border border-white/[0.12] bg-white/[0.04] p-3.5">
                <p className="text-[12px] font-semibold text-white">Read from your file</p>
                <div className="mt-2 space-y-1">
                  {importCols.map((c) => (
                    <div key={c.label} className="flex items-baseline justify-between gap-3 text-[12px]">
                      <span className="text-white">{c.label}</span>
                      <span className="truncate font-mono text-white">{c.header}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preview */}
            {importParsed.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[13px] font-semibold tracking-tight text-white">Preview</h3>
                  <span className="text-[12px] text-white tabular-nums">
                    {importSplit.added} new · {importSplit.updated} updating
                    {importSplit.skipped > 0 && ` · ${importSplit.skipped} skipped`}
                  </span>
                </div>
                {/* Sean's book has a time against every item but no grade
                    column, so one choice here beats editing 300 items by hand
                    (ELE-1445). Rows that DO name a grade keep their own. */}
                {importParsed.some((i) => (i.labourHours ?? 0) > 0 && !i.labourGrade) && (
                  <div className="rounded-xl border border-white/[0.12] bg-white/[0.03] p-3">
                    <p className="text-[12px] font-semibold text-white">Who does this labour</p>
                    <p className="mt-0.5 text-[11px] text-white">
                      Applied to rows with a time but no grade of their own. Change any item later.
                    </p>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {LABOUR_GRADES.map((g) => {
                        const gradeRate = rateForGrade(g.id, rateSources);
                        const active = importDefaultGrade === g.id;
                        return (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => setImportDefaultGrade(g.id)}
                            className={cn(
                              'flex h-11 flex-col items-center justify-center rounded-xl border px-1 transition-all touch-manipulation',
                              active
                                ? 'border-elec-yellow bg-elec-yellow text-black'
                                : 'border-white/[0.12] bg-white/[0.06] text-white hover:border-white/[0.25]'
                            )}
                          >
                            <span className={cn('text-[12px]', active ? 'font-semibold' : 'font-medium')}>
                              {shortGradeLabel(g.id)}
                            </span>
                            <span className="text-[10px] tabular-nums">
                              {gradeRate > 0 ? `${formatGBP(gradeRate)}/hr` : 'no rate'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="max-h-56 divide-y divide-white/[0.08] overflow-y-auto rounded-xl border border-white/[0.12] bg-white/[0.03]">
                  {importParsed.map((item, i) => {
                    const isUpdate = existingNames.has(normaliseItemName(item.name));
                    const timeOnly = !(item.price > 0) && (item.labourHours ?? 0) > 0;
                    const invalid = !(item.price > 0) && !timeOnly;
                    return (
                      <div key={i} className={cn('flex items-center gap-3 p-3', invalid && 'opacity-45')}>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-1 text-[13px] font-medium text-white">{item.name}</p>
                          <p className="mt-0.5 text-[11px] text-white">
                            {invalid
                              ? 'No price or time found — this row will be skipped'
                              : [
                                  timeOnly
                                    ? isUpdate
                                      ? 'Labour time only — price kept'
                                      : 'Labour time only — add a price later'
                                    : isUpdate
                                      ? 'Updating'
                                      : 'New',
                                  `per ${item.unit}`,
                                  item.supplier || null,
                                  (item.labourHours ?? 0) > 0
                                    ? `${item.labourHours}h ${shortGradeLabel(item.labourGrade || importDefaultGrade).toLowerCase()}`
                                    : null,
                                ]
                                  .filter(Boolean)
                                  .join(' · ')}
                          </p>
                        </div>
                        {!invalid &&
                          (timeOnly ? (
                            /* No price in the file — showing £0.00 here would
                               read as "this item is free" rather than "this
                               import carries times". */
                            <div className="flex-shrink-0 text-right">
                              <p className="text-[13px] font-semibold text-blue-300 tabular-nums">
                                {item.labourHours}h
                              </p>
                              <p className="text-[11px] text-white">no price</p>
                            </div>
                          ) : (
                            <div className="flex-shrink-0 text-right">
                              <p className="text-[13px] font-semibold text-elec-yellow tabular-nums">
                                {formatGBP(calcSellPrice(item.price))}
                              </p>
                              <p className="text-[11px] text-white tabular-nums">
                                cost {formatGBP(item.price)}
                              </p>
                            </div>
                          ))}
                      </div>
                    );
                  })}
                </div>
                <p className="text-[12px] text-white">
                  Sell prices shown include your {settings.globalMarkupPercent}% markup.
                </p>
              </div>
            )}

            <button
              onClick={handleImport}
              disabled={importSplit.valid === 0 || importing}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white/70 touch-manipulation active:scale-[0.99]"
            >
              {importing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Importing…
                </>
              ) : importSplit.valid === 0 ? (
                'Nothing to import yet'
              ) : (
                `Import ${importSplit.valid} ${importSplit.valid === 1 ? 'item' : 'items'}`
              )}
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

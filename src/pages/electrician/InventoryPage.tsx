import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  Search,
  X,
  Loader2,
  ClipboardCopy,
  Import,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import { useInventoryStorage, InventorySort } from '@/hooks/useInventoryStorage';
import {
  InventoryItemCard,
  InventorySummaryCard,
  InventoryLowStockBanner,
  InventoryAddSheet,
  InventoryEditSheet,
  InventoryImportSheet,
} from '@/components/electrician/inventory';
import {
  INVENTORY_CATEGORIES,
  INVENTORY_LOCATIONS,
  InventoryCategory,
  InventoryLocation,
  InventoryItem,
  CreateInventoryInput,
} from '@/types/inventory';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

const SORT_OPTIONS: { id: InventorySort; label: string }[] = [
  { id: 'name', label: 'Name' },
  { id: 'quantity_asc', label: 'Lowest Stock' },
  { id: 'last_used', label: 'Last Used' },
  { id: 'recent', label: 'Newest' },
];

/** Common electrical materials for empty state quick-add */
const SUGGESTED_ITEMS: CreateInventoryInput[] = [
  {
    name: '2.5mm T&E Twin & Earth',
    category: 'cable',
    quantity: 0,
    unit: 'metres',
    location: 'van',
  },
  { name: '6mm T&E Twin & Earth', category: 'cable', quantity: 0, unit: 'metres', location: 'van' },
  {
    name: '1.5mm T&E Twin & Earth',
    category: 'cable',
    quantity: 0,
    unit: 'metres',
    location: 'van',
  },
  {
    name: '10mm T&E Twin & Earth',
    category: 'cable',
    quantity: 0,
    unit: 'metres',
    location: 'van',
  },
  {
    name: 'Twin Socket Outlets',
    category: 'accessories',
    quantity: 0,
    unit: 'each',
    location: 'van',
  },
  { name: 'Light Switches', category: 'accessories', quantity: 0, unit: 'each', location: 'van' },
  { name: '32A MCB Type B', category: 'mcbs_rcds', quantity: 0, unit: 'each', location: 'van' },
  { name: '20A MCB Type B', category: 'mcbs_rcds', quantity: 0, unit: 'each', location: 'van' },
  { name: '6A MCB Type B', category: 'mcbs_rcds', quantity: 0, unit: 'each', location: 'van' },
  { name: '40A 30mA RCBO', category: 'mcbs_rcds', quantity: 0, unit: 'each', location: 'van' },
  { name: 'Cable Clips (1.5mm)', category: 'fixings', quantity: 0, unit: 'boxes', location: 'van' },
  {
    name: 'Red Wall Plugs + Screws',
    category: 'fixings',
    quantity: 0,
    unit: 'boxes',
    location: 'van',
  },
];

export default function InventoryPage() {
  const navigate = useNavigate();
  const haptic = useHaptic();
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [showImportSheet, setShowImportSheet] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [applyingThresholds, setApplyingThresholds] = useState(false);
  const [dismissedThresholdPrompt, setDismissedThresholdPrompt] = useState(false);
  const [viewMode, setViewMode] = useState<'flat' | 'grouped'>('flat');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    items,
    itemsMissingThreshold,
    applyDefaultThresholds,
    filteredItems,
    lowStockItems,
    recentlyUsedItems,
    groupedByLocation,
    stats,
    loading,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    createItem,
    updateItem,
    deleteItem,
    adjustQuantity,
    moveItem,
    generateReorderList,
    refreshItems,
  } = useInventoryStorage();

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refreshItems();
    setIsRefreshing(false);
  }, [refreshItems]);

  const handleAdjust = useCallback(
    async (id: string, delta: number) => {
      haptic.light();
      const result = await adjustQuantity(id, delta);
      if (result.success && result.previousQuantity != null) {
        const item = items.find((i) => i.id === id);
        const name = item?.name || 'Item';
        const newQty = Math.max(
          0,
          Math.round(((result.previousQuantity ?? 0) + delta) * 100) / 100
        );
        const absDelta = Math.abs(delta);

        if (newQty <= 0 && delta < 0) {
          // Zero quantity — prompt to reorder
          haptic.warning();
          toast({
            title: `${name} — out of stock`,
            description: 'Add to reorder list?',
            action: (
              <Button
                variant="ghost"
                size="sm"
                className="text-amber-400 font-semibold"
                onClick={() => {
                  const text = generateReorderList();
                  if (text) navigator.clipboard.writeText(text);
                  toast({ title: 'Reorder list copied' });
                }}
              >
                Copy List
              </Button>
            ),
          });
        } else {
          const action = delta < 0 ? 'Removed' : 'Added';
          toast({
            title: `${action} ${absDelta} × ${name}`,
            description: 'Tap to undo',
            action: (
              <Button
                variant="ghost"
                size="sm"
                className="text-elec-yellow font-semibold"
                onClick={() => adjustQuantity(id, -delta)}
              >
                Undo
              </Button>
            ),
          });
        }
      }
    },
    [adjustQuantity, haptic, items, generateReorderList]
  );

  const handleDelete = useCallback(async () => {
    if (!deleteId) return;
    const success = await deleteItem(deleteId);
    if (success) {
      haptic.success();
      toast({ title: 'Item deleted' });
      setDeleteId(null);
      setEditItem(null);
    }
  }, [deleteId, deleteItem, haptic]);

  const handleLowStockTap = useCallback(() => {
    setFilters({ ...filters, lowStockOnly: !filters.lowStockOnly });
  }, [filters, setFilters]);

  const handleApplyThresholds = useCallback(async () => {
    setApplyingThresholds(true);
    const applied = await applyDefaultThresholds();
    setApplyingThresholds(false);
    if (applied > 0) {
      haptic.success();
      toast({
        title: `Alert levels set on ${applied} ${applied === 1 ? 'item' : 'items'}`,
        description: 'Change any of them by tapping the item.',
      });
    }
  }, [applyDefaultThresholds, haptic]);

  const handleCopyReorderList = useCallback(() => {
    const text = generateReorderList();
    if (!text) {
      toast({ title: 'No low stock items' });
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      haptic.success();
      toast({ title: 'Reorder list copied', description: 'Paste into WhatsApp or email' });
    });
  }, [generateReorderList, haptic]);

  const handleBatchImport = useCallback(
    async (newItems: CreateInventoryInput[]) => {
      for (const item of newItems) {
        await createItem(item);
      }
    },
    [createItem]
  );

  const handleQuickAdd = useCallback(
    async (suggested: CreateInventoryInput) => {
      haptic.light();
      const result = await createItem(suggested);
      if (result) {
        toast({ title: `Added ${suggested.name}`, description: 'Set the quantity you have' });
        setEditItem(result);
      }
    },
    [createItem, haptic]
  );

  // Whether the recently used section is showing
  const showRecentlyUsed =
    recentlyUsedItems.length > 0 &&
    !filters.searchQuery &&
    filters.category === 'all' &&
    filters.location === 'all' &&
    !filters.lowStockOnly;

  // Deduplicate: remove recently used items from the main list when the section is visible
  const mainListItems = useMemo(() => {
    if (!showRecentlyUsed) return filteredItems;
    const recentIds = new Set(recentlyUsedItems.slice(0, 3).map((i) => i.id));
    return filteredItems.filter((i) => !recentIds.has(i.id));
  }, [filteredItems, recentlyUsedItems, showRecentlyUsed]);

  /**
   * Items render as a responsive grid, not a single stretched column. The old
   * layout was mobile-shaped at every width: on a 1600px screen one column of
   * cards left two thirds of the display empty.
   */
  const renderItemGrid = (itemList: InventoryItem[]) => (
    <AnimatePresence mode="popLayout">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {itemList.map((item) => (
          <motion.div key={item.id} variants={itemVariants} layout exit={{ opacity: 0, scale: 0.97 }}>
            <InventoryItemCard
              item={item}
              onAdjust={handleAdjust}
              onTap={setEditItem}
              onDelete={(id) => setDeleteId(id)}
              searchQuery={filters.searchQuery}
            />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );

  const activeFilterCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.location !== 'all' ? 1 : 0) +
    (filters.lowStockOnly ? 1 : 0);

  const clearFilters = () =>
    setFilters({ ...filters, category: 'all', location: 'all', lowStockOnly: false });

  /**
   * One filter panel, rendered twice — as a sticky rail on desktop and inside a
   * bottom sheet on mobile. Previously sort, location and category shared a
   * single unlabelled scrolling row of 11px pills, so three different kinds of
   * control looked identical and none of them met the 44px target.
   */
  const filterPanel = (
    <div className="space-y-4">
      <div>
        <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">Sort</p>
        <div className="space-y-0.5">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSortBy(opt.id)}
              className={cn(
                'flex h-11 w-full items-center rounded-xl px-3 text-[13px] transition-colors touch-manipulation',
                sortBy === opt.id
                  ? 'bg-elec-yellow font-semibold text-black'
                  : 'font-medium text-white hover:bg-white/[0.06]'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
          Location
        </p>
        <div className="space-y-0.5">
          {INVENTORY_LOCATIONS.map((loc) => {
            const count = items.filter((i) => i.location === loc.id).length;
            const active = filters.location === loc.id;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() =>
                  setFilters({
                    ...filters,
                    location: active ? 'all' : (loc.id as InventoryLocation),
                  })
                }
                className={cn(
                  'flex h-11 w-full items-center justify-between rounded-xl px-3 text-[13px] transition-colors touch-manipulation',
                  active
                    ? 'bg-elec-yellow font-semibold text-black'
                    : 'font-medium text-white hover:bg-white/[0.06]'
                )}
              >
                <span>{loc.label}</span>
                <span className="tabular-nums opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
          Category
        </p>
        <div className="space-y-0.5">
          {INVENTORY_CATEGORIES.map((cat) => {
            const count = stats.byCategory[cat.id] ?? 0;
            const active = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  setFilters({
                    ...filters,
                    category: active ? 'all' : (cat.id as InventoryCategory),
                  })
                }
                className={cn(
                  'flex h-11 w-full items-center justify-between rounded-xl px-3 text-[13px] transition-colors touch-manipulation',
                  active
                    ? 'bg-elec-yellow font-semibold text-black'
                    : 'font-medium text-white hover:bg-white/[0.06]'
                )}
              >
                <span className="truncate">{cat.label}</span>
                <span className="tabular-nums opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2 border-t border-white/[0.08] pt-4">
        <button
          type="button"
          onClick={handleLowStockTap}
          className={cn(
            'flex h-11 w-full items-center justify-between rounded-xl px-3 text-[13px] transition-colors touch-manipulation',
            filters.lowStockOnly
              ? 'bg-amber-500 font-semibold text-black'
              : 'font-medium text-white hover:bg-white/[0.06]'
          )}
        >
          <span>Low stock only</span>
          <span className="tabular-nums opacity-70">{stats.lowStockCount}</span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode(viewMode === 'flat' ? 'grouped' : 'flat')}
          className="flex h-11 w-full items-center rounded-xl px-3 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.06] touch-manipulation"
        >
          {viewMode === 'flat' ? 'Group by location' : 'Show as one list'}
        </button>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex h-11 w-full items-center rounded-xl px-3 text-[13px] font-medium text-elec-yellow transition-colors hover:bg-white/[0.06] touch-manipulation"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );

  const searchField = (
    <div className="relative flex-1">
      <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
      <input
        value={filters.searchQuery}
        onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
        placeholder="Search your stock"
        className="h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent pl-6 pr-8 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white/25 hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
      />
      {filters.searchQuery && (
        <button
          type="button"
          onClick={() => setFilters({ ...filters, searchQuery: '' })}
          aria-label="Clear search"
          className="absolute right-0 top-1/2 flex h-11 w-8 -translate-y-1/2 items-center justify-center text-white touch-manipulation"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Stock Tracker | Electricians Tools | Elec-Mate</title>
        <meta
          name="description"
          content="Track your personal stock, van materials and garage inventory. Low stock alerts and quick quantity updates."
        />
      </Helmet>

      <div className="flex min-h-screen flex-col bg-background">
        <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-background/95 backdrop-blur-md">
          <div className="mx-auto w-full max-w-[1600px] px-4 lg:px-6">
            <div className="flex h-14 items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 flex-shrink-0 touch-manipulation"
                onClick={() => navigate('/electrician/business')}
                aria-label="Back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold tracking-tight text-white">Stock Tracker</h1>

              {/* Search is inline from md up — a full-screen takeover on a
                  1600px display is a phone pattern stretched. */}
              <div className="ml-4 hidden max-w-md flex-1 md:flex">{searchField}</div>

              <div className="ml-auto flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 touch-manipulation md:hidden"
                  onClick={() => setShowSearch((v) => !v)}
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 touch-manipulation"
                  onClick={() => setShowImportSheet(true)}
                  aria-label="Import stock"
                >
                  <Import className="h-5 w-5" />
                </Button>
                <button
                  type="button"
                  onClick={() => setShowAddSheet(true)}
                  className="flex h-11 items-center gap-2 rounded-xl bg-elec-yellow px-3 text-[13px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation sm:px-4"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add item</span>
                </button>
              </div>
            </div>

            {showSearch && <div className="pb-3 md:hidden">{searchField}</div>}

            {/* Mobile: one button into the full filter set, plus what is on. */}
            <div className="flex items-center gap-2 pb-3 lg:hidden">
              <button
                type="button"
                onClick={() => setShowFilterSheet(true)}
                className={cn(
                  'flex h-11 items-center gap-2 rounded-xl border px-3 text-[12.5px] font-medium transition-colors touch-manipulation',
                  activeFilterCount > 0
                    ? 'border-elec-yellow bg-elec-yellow text-black'
                    : 'border-white/[0.12] bg-white/[0.04] text-white'
                )}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && <span className="tabular-nums">{activeFilterCount}</span>}
              </button>
              <span className="truncate text-[12.5px] text-white">
                {SORT_OPTIONS.find((s) => s.id === sortBy)?.label}
                {filters.location !== 'all' &&
                  ` · ${INVENTORY_LOCATIONS.find((l) => l.id === filters.location)?.label}`}
                {filters.category !== 'all' &&
                  ` · ${INVENTORY_CATEGORIES.find((c) => c.id === filters.category)?.label}`}
                {filters.lowStockOnly && ' · Low stock'}
              </span>
            </div>
          </div>
        </header>

        <PullToRefresh onRefresh={handleRefresh} isRefreshing={isRefreshing || loading}>
          <div className="mx-auto w-full max-w-[1600px] px-4 pb-24 pt-4 lg:px-6">
            <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
              <aside className="hidden lg:block">
                <div className="sticky top-[72px] max-h-[calc(100vh-96px)] overflow-y-auto rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {filterPanel}
                </div>
              </aside>

              <main className="min-w-0">
                {loading ? (
                  /* Skeletons in the real layout rather than a spinner in the
                     middle of nowhere — the page does not jump when the data
                     lands, and it reads as fast rather than as blank. */
                  <div className="space-y-4" aria-busy="true" aria-label="Loading your stock">
                    <div className="-mx-4 h-[74px] animate-pulse border-y border-white/[0.14] bg-white/[0.05] sm:mx-0 sm:rounded-2xl sm:border-x" />
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-[104px] animate-pulse rounded-2xl border border-white/[0.12] bg-white/[0.04]"
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    <motion.div variants={itemVariants}>
                      <InventorySummaryCard stats={stats} items={items} />
                    </motion.div>

                    {/* Without an alert level an item can never report as low.
                        Offer to set them all from the unit defaults rather than
                        leaving the feature quietly switched off. */}
                    {itemsMissingThreshold.length > 0 && !dismissedThresholdPrompt && (
                      <motion.div
                        variants={itemVariants}
                        className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.08] p-4"
                      >
                        <p className="text-[14px] font-semibold text-white">
                          {itemsMissingThreshold.length}{' '}
                          {itemsMissingThreshold.length === 1 ? 'item has' : 'items have'} no alert
                          level
                        </p>
                        <p className="mt-1 text-[12.5px] text-white">
                          Nothing can show as low on stock until you set one. Start from the usual
                          levels for each unit — 5 each, 25 metres, 2 rolls — and change any of them
                          later.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={handleApplyThresholds}
                            disabled={applyingThresholds}
                            className="flex h-11 items-center gap-2 rounded-xl bg-elec-yellow px-4 text-[13px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white/70 touch-manipulation"
                          >
                            {applyingThresholds && <Loader2 className="h-4 w-4 animate-spin" />}
                            Set them for me
                          </button>
                          <button
                            type="button"
                            onClick={() => setDismissedThresholdPrompt(true)}
                            className="h-11 px-3 text-[13px] font-medium text-white touch-manipulation"
                          >
                            Not now
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {lowStockItems.length > 0 && (
                      <motion.div variants={itemVariants} className="space-y-2">
                        <InventoryLowStockBanner items={lowStockItems} onTap={handleLowStockTap} />
                        <button
                          type="button"
                          onClick={handleCopyReorderList}
                          className="flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-3 text-[12.5px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation"
                        >
                          <ClipboardCopy className="h-4 w-4" />
                          Copy reorder list
                        </button>
                      </motion.div>
                    )}

                    {showRecentlyUsed && (
                      <motion.div variants={itemVariants} className="space-y-3">
                        <p className="text-[13px] font-semibold tracking-tight text-white">
                          Recently used
                        </p>
                        {renderItemGrid(recentlyUsedItems.slice(0, 3))}
                        {mainListItems.length > 0 && (
                          <p className="border-t border-white/[0.08] pt-4 text-[13px] font-semibold tracking-tight text-white">
                            All items{' '}
                            <span className="font-normal tabular-nums">{mainListItems.length}</span>
                          </p>
                        )}
                      </motion.div>
                    )}

                    {filteredItems.length === 0 ? (
                      <motion.div variants={itemVariants}>
                        {filters.searchQuery || filters.lowStockOnly || activeFilterCount > 0 ? (
                          <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.03] px-6 py-12 text-center">
                            <p className="text-[15px] font-semibold text-white">
                              {filters.searchQuery ? 'No matching items' : 'Nothing here'}
                            </p>
                            <p className="mt-1 text-[12.5px] text-white">
                              {filters.searchQuery
                                ? 'Try a different search term.'
                                : 'No items match these filters.'}
                            </p>
                            {activeFilterCount > 0 && (
                              <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-3 h-11 px-3 text-[12.5px] font-medium text-elec-yellow touch-manipulation"
                              >
                                Clear filters
                              </button>
                            )}
                          </div>
                        ) : (
                          /* First run. On a wide screen the pitch and the
                             quick-add list sit side by side rather than the
                             list being pushed a screen below the fold. */
                          <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
                            <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-6">
                              <p className="text-[17px] font-semibold tracking-tight text-white">
                                Nothing in stock yet
                              </p>
                              <p className="mt-1 text-[13px] text-white">
                                Track what is in the van and the garage, so you know what to pick up
                                before you set off — not when you are already on site.
                              </p>
                              <button
                                type="button"
                                onClick={() => setShowAddSheet(true)}
                                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation"
                              >
                                <Plus className="h-4 w-4" />
                                Add an item
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowImportSheet(true)}
                                className="mt-2 flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] text-[13px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation"
                              >
                                Import a list
                              </button>
                            </div>

                            <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-4">
                              <p className="mb-3 text-[13px] font-semibold tracking-tight text-white">
                                Or start with what most vans carry
                              </p>
                              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                {SUGGESTED_ITEMS.map((suggested) => (
                                  <button
                                    key={suggested.name}
                                    type="button"
                                    onClick={() => handleQuickAdd(suggested)}
                                    className="flex min-h-[44px] items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-left transition-colors hover:bg-white/[0.06] touch-manipulation"
                                  >
                                    <Plus className="h-4 w-4 flex-shrink-0 text-elec-yellow" />
                                    <span className="min-w-0 flex-1 truncate text-[13px] text-white">
                                      {suggested.name}
                                    </span>
                                    <span className="flex-shrink-0 text-[11px] text-white">
                                      {suggested.unit}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ) : viewMode === 'grouped' ? (
                      <div className="space-y-6">
                        {groupedByLocation.map((group) => (
                          <motion.div key={group.location.id} variants={itemVariants} className="space-y-3">
                            <p className="text-[13px] font-semibold tracking-tight text-white">
                              {group.location.label}{' '}
                              <span className="font-normal tabular-nums">{group.items.length}</span>
                            </p>
                            {renderItemGrid(group.items)}
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      renderItemGrid(mainListItems)
                    )}
                  </motion.div>
                )}
              </main>
            </div>
          </div>
        </PullToRefresh>
      </div>

      {/* Mobile filters — a sheet, per the design language, not a drawer of
          pills wedged under the header. */}
      <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
        <SheetContent
          side="bottom"
          className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.1] bg-[#111114] p-0"
        >
          <div className="flex h-full flex-col">
            <div className="shrink-0 border-b border-white/[0.08] px-4 pb-3 pt-4">
              <h2 className="text-[17px] font-semibold tracking-tight text-white">Filters</h2>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              {filterPanel}
            </div>
            <div className="shrink-0 border-t border-white/[0.08] px-4 pb-6 pt-3">
              <button
                type="button"
                onClick={() => setShowFilterSheet(false)}
                className="h-12 w-full rounded-xl bg-elec-yellow text-[14px] font-semibold text-black touch-manipulation"
              >
                Show {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <InventoryAddSheet
        open={showAddSheet}
        onOpenChange={setShowAddSheet}
        onSave={createItem}
        existingItems={items}
        onUpdateExisting={(id, addQty) => adjustQuantity(id, addQty)}
      />

      <InventoryImportSheet
        open={showImportSheet}
        onOpenChange={setShowImportSheet}
        onImportItems={handleBatchImport}
        items={items}
      />

      <InventoryEditSheet
        item={editItem}
        onOpenChange={() => setEditItem(null)}
        onSave={updateItem}
        onDelete={(id) => {
          setDeleteId(id);
        }}
        onAdjust={handleAdjust}
        onMove={async (id, loc) => {
          const success = await moveItem(id, loc);
          if (success) {
            haptic.success();
            const locLabel = INVENTORY_LOCATIONS.find((l) => l.id === loc)?.label;
            toast({ title: `Moved to ${locLabel}` });
          }
          return success;
        }}
      />

      <ConfirmationDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete item"
        description="This removes the item from your stock. It cannot be undone."
        confirmText="Delete"
        onConfirm={handleDelete}
        variant="destructive"
      />
    </>
  );
}

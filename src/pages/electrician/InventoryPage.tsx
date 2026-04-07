import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  RefreshCw,
  Search,
  X,
  Loader2,
  Package,
  ArrowDownUp,
  LayoutList,
  List,
  ClipboardCopy,
  Clock,
  Import,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
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
  const [showSort, setShowSort] = useState(false);
  const [viewMode, setViewMode] = useState<'flat' | 'grouped'>('flat');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    items,
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
        const action = delta < 0 ? 'Removed' : 'Added';
        const absDelta = Math.abs(delta);
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
    },
    [adjustQuantity, haptic, items]
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

  const renderItemList = (itemList: InventoryItem[]) => (
    <AnimatePresence mode="popLayout">
      <div className="space-y-2">
        {itemList.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            layout
            exit={{ opacity: 0, scale: 0.95 }}
          >
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

  return (
    <>
      <Helmet>
        <title>Stock Tracker | Electricians Tools | Elec-Mate</title>
        <meta
          name="description"
          content="Track your personal stock, van materials and garage inventory. Low stock alerts and quick quantity updates."
        />
      </Helmet>

      {/* Full-screen search overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background flex flex-col"
          >
            <div className="flex items-center gap-2 px-4 py-3 h-14 border-b border-white/[0.06]">
              <Search className="h-5 w-5 text-white/40 flex-shrink-0" />
              <Input
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                placeholder="Search your stock..."
                className="h-10 flex-1 text-base bg-transparent border-0 focus:ring-0 focus:border-0 placeholder:text-white/30 touch-manipulation"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                className="text-elec-yellow font-medium flex-shrink-0 touch-manipulation"
                onClick={() => {
                  setShowSearch(false);
                  setFilters({ ...filters, searchQuery: '' });
                }}
              >
                Cancel
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
              {filters.searchQuery.trim() ? (
                filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <InventoryItemCard
                      key={item.id}
                      item={item}
                      onAdjust={handleAdjust}
                      onTap={(i) => {
                        setEditItem(i);
                        setShowSearch(false);
                      }}
                      onDelete={(id) => setDeleteId(id)}
                      searchQuery={filters.searchQuery}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-white/50 text-sm">
                      No items matching "{filters.searchQuery}"
                    </p>
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <Search className="h-10 w-10 text-white/10 mx-auto mb-3" />
                  <p className="text-white/40 text-sm">Search by name, supplier or description</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col min-h-screen bg-background">
        {/* Header — compact */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/[0.06]">
          <div className="flex items-center gap-2 px-4 py-3 h-14">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 flex-shrink-0"
              onClick={() => navigate('/electrician/business')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-white flex-1">Stock Tracker</h1>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setShowSearch(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setShowImportSheet(true)}
            >
              <Import className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setViewMode(viewMode === 'flat' ? 'grouped' : 'flat')}
            >
              {viewMode === 'flat' ? (
                <LayoutList className="h-5 w-5" />
              ) : (
                <List className="h-5 w-5" />
              )}
            </Button>
            <Button
              size="icon"
              className="h-9 w-9 bg-elec-yellow hover:bg-elec-yellow/90 text-black rounded-xl"
              onClick={() => setShowAddSheet(true)}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          {/* Single filter row: sort + location + category in one scrollable row */}
          <div className="flex gap-1.5 px-4 pb-2 overflow-x-auto scrollbar-hide">
            {/* Sort */}
            <button
              type="button"
              onClick={() => setShowSort(!showSort)}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap touch-manipulation flex-shrink-0 bg-white/[0.06] text-white/60 flex items-center gap-1"
            >
              <ArrowDownUp className="h-2.5 w-2.5" />
              {SORT_OPTIONS.find((s) => s.id === sortBy)?.label}
            </button>

            <div className="w-px h-5 bg-white/[0.08] self-center flex-shrink-0" />

            {/* Location pills */}
            {INVENTORY_LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() =>
                  setFilters({
                    ...filters,
                    location: filters.location === loc.id ? 'all' : (loc.id as InventoryLocation),
                  })
                }
                className={cn(
                  'px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap touch-manipulation transition-all flex-shrink-0',
                  filters.location === loc.id
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'bg-white/[0.04] text-white/40'
                )}
              >
                {loc.label}
              </button>
            ))}

            <div className="w-px h-5 bg-white/[0.08] self-center flex-shrink-0" />

            {/* Category pills */}
            {INVENTORY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  setFilters({
                    ...filters,
                    category: filters.category === cat.id ? 'all' : (cat.id as InventoryCategory),
                  })
                }
                className={cn(
                  'px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap touch-manipulation transition-all flex-shrink-0',
                  filters.category === cat.id
                    ? cat.filterActiveClass
                    : 'bg-white/[0.04] text-white/40'
                )}
              >
                {cat.label}
                {stats.byCategory[cat.id] ? ` ${stats.byCategory[cat.id]}` : ''}
              </button>
            ))}
          </div>

          {/* Sort options (shown when sort tapped) */}
          <AnimatePresence>
            {showSort && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex gap-1.5 px-4 pb-2 overflow-x-auto scrollbar-hide">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setSortBy(opt.id);
                        setShowSort(false);
                      }}
                      className={cn(
                        'px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap touch-manipulation flex-shrink-0',
                        sortBy === opt.id
                          ? 'bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30'
                          : 'bg-white/[0.04] text-white/50'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Content */}
        <PullToRefresh onRefresh={refreshItems} isRefreshing={loading}>
          <main className="flex-1 px-4 py-4 space-y-4 pb-24">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {/* Summary */}
                <motion.div variants={itemVariants}>
                  <InventorySummaryCard stats={stats} items={items} />
                </motion.div>

                {/* Low stock banner + reorder button */}
                {lowStockItems.length > 0 && (
                  <motion.div variants={itemVariants} className="space-y-2">
                    <InventoryLowStockBanner items={lowStockItems} onTap={handleLowStockTap} />
                    <button
                      type="button"
                      onClick={handleCopyReorderList}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] text-white/60 text-[12px] font-medium touch-manipulation active:bg-white/[0.08]"
                    >
                      <ClipboardCopy className="h-3 w-3" />
                      Copy reorder list
                    </button>
                  </motion.div>
                )}

                {/* Recently used section */}
                {recentlyUsedItems.length > 0 &&
                  !filters.searchQuery &&
                  filters.category === 'all' &&
                  filters.location === 'all' &&
                  !filters.lowStockOnly && (
                    <motion.div variants={itemVariants}>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-3.5 w-3.5 text-white/40" />
                        <p className="text-[12px] text-white/40 font-medium uppercase tracking-wider">
                          Recently Used
                        </p>
                      </div>
                      <div className="space-y-2">
                        {recentlyUsedItems.slice(0, 3).map((item) => (
                          <InventoryItemCard
                            key={`recent-${item.id}`}
                            item={item}
                            onAdjust={handleAdjust}
                            onTap={setEditItem}
                            onDelete={(id) => setDeleteId(id)}
                          />
                        ))}
                      </div>
                      {filteredItems.length > 0 && (
                        <div className="mt-4 mb-2 border-t border-white/[0.06] pt-4">
                          <p className="text-[12px] text-white/40 font-medium uppercase tracking-wider">
                            All Items
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}

                {/* Items */}
                {filteredItems.length === 0 ? (
                  <motion.div variants={itemVariants} className="text-center py-8">
                    <div className="max-w-sm mx-auto space-y-4">
                      <Package className="h-12 w-12 text-white/20 mx-auto" />
                      <p className="text-base font-semibold text-white">
                        {filters.searchQuery
                          ? 'No matching items'
                          : filters.lowStockOnly
                            ? 'No low stock items'
                            : 'No items yet'}
                      </p>
                      <p className="text-sm text-white/50">
                        {filters.searchQuery
                          ? 'Try a different search term'
                          : 'Add your first items or pick from common materials below'}
                      </p>

                      {/* Quick add button */}
                      {!filters.searchQuery && !filters.lowStockOnly && (
                        <>
                          <Button
                            onClick={() => setShowAddSheet(true)}
                            className="bg-elec-yellow hover:bg-elec-yellow/90 text-black rounded-xl touch-manipulation"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Custom Item
                          </Button>

                          {/* Suggested common items */}
                          <div className="pt-4 border-t border-white/[0.06]">
                            <p className="text-[12px] text-white/40 font-medium mb-3">
                              Quick Add Common Materials
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                              {SUGGESTED_ITEMS.map((suggested) => (
                                <button
                                  key={suggested.name}
                                  type="button"
                                  onClick={() => handleQuickAdd(suggested)}
                                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-left touch-manipulation active:bg-white/[0.06] transition-colors"
                                >
                                  <Plus className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                                  <span className="text-[14px] text-white">{suggested.name}</span>
                                  <span className="text-[11px] text-white/40 ml-auto flex-shrink-0">
                                    {suggested.unit}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                ) : viewMode === 'grouped' ? (
                  // Grouped by location view
                  <div className="space-y-6">
                    {groupedByLocation.map((group) => (
                      <motion.div key={group.location.id} variants={itemVariants}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                          <p className="text-[13px] text-white font-semibold">
                            {group.location.label}
                          </p>
                          <span className="text-[11px] text-white/40">
                            {group.items.length} item{group.items.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        {renderItemList(group.items)}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  // Flat list view
                  renderItemList(filteredItems)
                )}
              </motion.div>
            )}
          </main>
        </PullToRefresh>
      </div>

      {/* Sheets */}
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
        title="Delete Item"
        description="Are you sure you want to delete this item from your stock?"
        confirmText="Delete"
        onConfirm={handleDelete}
        variant="destructive"
      />
    </>
  );
}

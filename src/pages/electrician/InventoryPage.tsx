import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, RefreshCw, Search, X, Loader2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useInventoryStorage } from '@/hooks/useInventoryStorage';
import {
  InventoryItemCard,
  InventorySummaryCard,
  InventoryLowStockBanner,
  InventoryAddSheet,
  InventoryEditSheet,
} from '@/components/electrician/inventory';
import {
  INVENTORY_CATEGORIES,
  INVENTORY_LOCATIONS,
  InventoryCategory,
  InventoryLocation,
  InventoryItem,
} from '@/types/inventory';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export default function InventoryPage() {
  const navigate = useNavigate();
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    filteredItems,
    lowStockItems,
    stats,
    loading,
    filters,
    setFilters,
    createItem,
    updateItem,
    deleteItem,
    adjustQuantity,
    refreshItems,
  } = useInventoryStorage();

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refreshItems();
    setIsRefreshing(false);
  }, [refreshItems]);

  const handleDelete = useCallback(async () => {
    if (!deleteId) return;
    const success = await deleteItem(deleteId);
    if (success) {
      toast({ title: 'Item deleted' });
      setDeleteId(null);
      setEditItem(null);
    }
  }, [deleteId, deleteItem]);

  const handleLowStockTap = useCallback(() => {
    setFilters({ ...filters, lowStockOnly: !filters.lowStockOnly });
  }, [filters, setFilters]);

  return (
    <>
      <Helmet>
        <title>Stock Tracker | Electricians Tools | Elec-Mate</title>
        <meta
          name="description"
          content="Track your personal stock, van materials and garage inventory. Low stock alerts and quick quantity updates."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/[0.06]">
          {showSearch ? (
            <div className="flex items-center gap-2 px-4 py-3 h-14">
              <Input
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                placeholder="Search stock..."
                className="h-10 flex-1 text-base bg-white/[0.05] border-white/[0.08] focus:border-elec-yellow/50 touch-manipulation"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 flex-shrink-0"
                onClick={() => {
                  setShowSearch(false);
                  setFilters({ ...filters, searchQuery: '' });
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-4 py-3 h-14">
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
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={cn('h-5 w-5', isRefreshing && 'animate-spin')} />
              </Button>
              <Button
                size="icon"
                className="h-9 w-9 bg-elec-yellow hover:bg-elec-yellow/90 text-black rounded-xl"
                onClick={() => setShowAddSheet(true)}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Category filter pills */}
          <div className="flex gap-2 px-4 pb-2 overflow-x-auto scrollbar-hide">
            <button
              type="button"
              onClick={() => setFilters({ ...filters, category: 'all' })}
              className={cn(
                'px-3 py-1 rounded-full text-[12px] font-medium whitespace-nowrap touch-manipulation transition-all flex-shrink-0',
                filters.category === 'all'
                  ? 'bg-white/[0.15] text-white'
                  : 'bg-white/[0.04] text-white/50'
              )}
            >
              All
            </button>
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
                  'px-3 py-1 rounded-full text-[12px] font-medium whitespace-nowrap touch-manipulation transition-all flex-shrink-0',
                  filters.category === cat.id
                    ? `bg-${cat.colour}/20 text-white border border-${cat.colour}/30`
                    : 'bg-white/[0.04] text-white/50'
                )}
              >
                {cat.label}
                {stats.byCategory[cat.id] ? ` (${stats.byCategory[cat.id]})` : ''}
              </button>
            ))}
          </div>

          {/* Location filter pills */}
          <div className="flex gap-2 px-4 pb-2 overflow-x-auto scrollbar-hide">
            <button
              type="button"
              onClick={() => setFilters({ ...filters, location: 'all' })}
              className={cn(
                'px-3 py-1 rounded-full text-[12px] font-medium whitespace-nowrap touch-manipulation transition-all flex-shrink-0',
                filters.location === 'all'
                  ? 'bg-teal-500/20 text-white'
                  : 'bg-white/[0.04] text-white/50'
              )}
            >
              All Locations
            </button>
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
                  'px-3 py-1 rounded-full text-[12px] font-medium whitespace-nowrap touch-manipulation transition-all flex-shrink-0',
                  filters.location === loc.id
                    ? 'bg-teal-500/20 text-white border border-teal-500/30'
                    : 'bg-white/[0.04] text-white/50'
                )}
              >
                {loc.label}
                {stats.byLocation[loc.id] ? ` (${stats.byLocation[loc.id]})` : ''}
              </button>
            ))}
          </div>
        </header>

        {/* Content */}
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
                <InventorySummaryCard stats={stats} />
              </motion.div>

              {/* Low stock banner */}
              <motion.div variants={itemVariants}>
                <InventoryLowStockBanner items={lowStockItems} onTap={handleLowStockTap} />
              </motion.div>

              {/* Items */}
              {filteredItems.length === 0 ? (
                <motion.div variants={itemVariants} className="text-center py-12">
                  <div className="max-w-xs mx-auto space-y-4">
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
                        : 'Tap + to add your first item'}
                    </p>
                    {!filters.searchQuery && !filters.lowStockOnly && (
                      <Button
                        onClick={() => setShowAddSheet(true)}
                        className="bg-elec-yellow hover:bg-elec-yellow/90 text-black rounded-xl touch-manipulation"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Item
                      </Button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  <div className="space-y-2">
                    {filteredItems.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        layout
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <InventoryItemCard
                          item={item}
                          onAdjust={adjustQuantity}
                          onTap={setEditItem}
                        />
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </motion.div>
          )}
        </main>
      </div>

      {/* Sheets */}
      <InventoryAddSheet open={showAddSheet} onOpenChange={setShowAddSheet} onSave={createItem} />

      <InventoryEditSheet
        item={editItem}
        onOpenChange={() => setEditItem(null)}
        onSave={updateItem}
        onDelete={(id) => {
          setDeleteId(id);
        }}
        onAdjust={adjustQuantity}
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

import { useState, useMemo, useEffect } from 'react';
import { RefreshCw, Upload, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  EmptyState,
  LoadingBlocks,
  IconButton,
  Pill,
  Divider,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';
import {
  useSearchPriceBook,
  usePriceBookStats,
  useCreatePriceBookItem,
  useUpdatePriceBookItem,
  useDeletePriceBookItem,
} from '@/hooks/useFinance';
import { ImportPriceBookDialog } from '../dialogs/ImportPriceBookDialog';
import { EditPriceBookItemSheet } from '../dialogs/EditPriceBookItemSheet';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { toast } from 'sonner';
import type { PriceBookItem } from '@/services/financeService';

const CATEGORIES = [
  'All',
  'Cable',
  'Accessories',
  'Fixings',
  'Lighting',
  'Switches & Sockets',
  'Consumer Units',
  'Tools',
  'Testing',
  'Safety',
  'Other',
];

const TABS = [
  { value: 'materials', label: 'Materials' },
  { value: 'labour', label: 'Labour' },
  { value: 'equipment', label: 'Equipment' },
  { value: 'markup', label: 'Markup' },
];

// Equipment = the chargeable-kit slice of the same price book (no separate table).
const EQUIPMENT_CATEGORIES = ['Tools', 'Testing', 'Safety'];

export function PriceBookSection() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [tab, setTab] = useState('materials');
  const [showImportDialog, setShowImportDialog] = useState(false);

  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemBuyPrice, setNewItemBuyPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Cable');

  const [editItem, setEditItem] = useState<PriceBookItem | null>(null);
  const [showEditSheet, setShowEditSheet] = useState(false);

  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = usePriceBookStats();

  // Equipment is the same price book scoped to chargeable-kit categories.
  const isEquipment = tab === 'equipment';
  const effectiveCategory = isEquipment
    ? EQUIPMENT_CATEGORIES.includes(category)
      ? category
      : 'Tools'
    : category === 'All'
      ? undefined
      : category;

  const {
    data: searchResults,
    isLoading: searchLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch: refetchSearch,
  } = useSearchPriceBook(search, effectiveCategory);

  const createItem = useCreatePriceBookItem();
  const updateItem = useUpdatePriceBookItem();
  const deleteItem = useDeletePriceBookItem();

  // Labour rates + markup rules live on company_profiles — these are the firm
  // commercials that drive every quote, so we edit them here rather than add tables.
  const { companyProfile, saveCompanyProfile, loading: profileLoading } = useCompanyProfile();
  const [dayRate, setDayRate] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [overhead, setOverhead] = useState('');
  const [profit, setProfit] = useState('');
  const [markup, setMarkup] = useState('');
  const [savingRates, setSavingRates] = useState(false);

  // company_profiles.markup is the firm's default % — quick-add and quoting use it.
  const companyMarkup = (companyProfile as { markup?: number } | null)?.markup;
  const defaultMarkupPct = companyMarkup != null && companyMarkup > 0 ? companyMarkup : 30;

  useEffect(() => {
    if (!companyProfile) return;
    setDayRate(companyProfile.day_rate != null ? String(companyProfile.day_rate) : '');
    setHourlyRate(companyProfile.hourly_rate != null ? String(companyProfile.hourly_rate) : '');
    setOverhead(
      companyProfile.overhead_percentage != null ? String(companyProfile.overhead_percentage) : ''
    );
    setProfit(companyProfile.profit_margin != null ? String(companyProfile.profit_margin) : '');
    setMarkup(companyMarkup != null ? String(companyMarkup) : '');
  }, [companyProfile, companyMarkup]);

  const saveRates = async (patch: Partial<typeof companyProfile>) => {
    setSavingRates(true);
    try {
      await saveCompanyProfile(patch as never);
    } finally {
      setSavingRates(false);
    }
  };

  const items = searchResults?.pages.flatMap((p) => p.items) || [];
  const totalFound = searchResults?.pages[0]?.total || 0;

  const refresh = () => {
    refetchStats();
    refetchSearch();
    toast.success('Price book refreshed');
  };

  const handleEdit = (item: PriceBookItem) => {
    setEditItem(item);
    setShowEditSheet(true);
  };

  const handleSaveItem = async (id: string, updates: Partial<PriceBookItem>) => {
    await updateItem.mutateAsync({ id, updates });
  };

  const handleDeleteItem = async (id: string) => {
    await deleteItem.mutateAsync(id);
    toast.success('Item deleted from price book');
  };

  const handleQuickAdd = async () => {
    if (!newItemName.trim()) {
      toast.error('Please enter a material name');
      return;
    }

    const buyPrice = parseFloat(newItemBuyPrice) || 0;
    const sellPrice = buyPrice * (1 + defaultMarkupPct / 100);

    try {
      await createItem.mutateAsync({
        name: newItemName.trim(),
        buy_price: buyPrice,
        sell_price: sellPrice,
        category: newItemCategory,
        unit: 'each',
        supplier_id: null,
        stock_level: 0,
        reorder_level: 0,
        sku: null,
      });

      toast.success('Material added to price book');
      setNewItemName('');
      setNewItemBuyPrice('');
      setShowQuickAdd(false);
    } catch (error) {
      toast.error('Failed to add material');
    }
  };

  const showItemActions = tab === 'materials' || tab === 'equipment';
  const heroActions = (
    <>
      {showItemActions && (
        <>
          <SecondaryButton onClick={() => setShowImportDialog(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </SecondaryButton>
          <PrimaryButton
            onClick={() => {
              setNewItemCategory(tab === 'equipment' ? 'Tools' : 'Cable');
              setShowQuickAdd(true);
            }}
          >
            Add item
          </PrimaryButton>
        </>
      )}
      <IconButton onClick={refresh} aria-label="Refresh">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
    </>
  );

  if (statsLoading && !stats) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Money"
          title="Price Book"
          description="Labour rates, material costs and markup rules."
          tone="amber"
          actions={heroActions}
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <PageHero
        eyebrow="Money"
        title="Price Book"
        description="Labour rates, material costs and markup rules."
        tone="amber"
        actions={heroActions}
      />

      <StatStrip
        columns={4}
        stats={[
          {
            label: 'Materials',
            value: stats?.totalItems?.toLocaleString() ?? '0',
            tone: 'amber',
          },
          {
            label: 'Avg markup',
            value: stats ? `${stats.avgMarkup}%` : '0%',
            tone: 'blue',
          },
          {
            label: 'Low stock',
            value: stats?.lowStock?.toLocaleString() ?? '0',
            tone: 'purple',
          },
          {
            label: 'Stock value',
            value: stats ? `£${stats.stockValue.toLocaleString()}` : '£0',
                      },
        ]}
      />

      <FilterBar
        tabs={TABS}
        activeTab={tab}
        onTabChange={setTab}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search materials, SKUs..."
      />

      {showQuickAdd && (
        <ListCard>
          <ListCardHeader
            tone="yellow"
            title="Quick add material"
            meta={
              <button
                onClick={() => setShowQuickAdd(false)}
                className="h-8 w-8 rounded-full bg-white/[0.04] border border-white/[0.08] text-white inline-flex items-center justify-center hover:bg-white/[0.08] transition-colors touch-manipulation"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            }
          />
          <div className="p-5 sm:p-6 space-y-4">
            <Input
              placeholder="Material name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              autoFocus
className={inputClass}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white">£</span>
                <Input
                  type="number"
                  placeholder="Buy price"
                  value={newItemBuyPrice}
                  onChange={(e) => setNewItemBuyPrice(e.target.value)}
className={`${inputClass} pl-7`}
                  step="0.01"
                />
              </div>
              <Select value={newItemCategory} onValueChange={setNewItemCategory}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-white">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {newItemBuyPrice && (
              <div className="flex items-center gap-2">
                <Pill tone="emerald">
                  Sell £{(parseFloat(newItemBuyPrice) * (1 + defaultMarkupPct / 100)).toFixed(2)}
                </Pill>
                <span className="text-[12px] text-white">
                  {defaultMarkupPct}% markup applied
                </span>
              </div>
            )}

            <PrimaryButton
              onClick={handleQuickAdd}
              disabled={createItem.isPending || !newItemName.trim()}
              fullWidth
            >
              {createItem.isPending ? 'Adding...' : 'Add to price book'}
            </PrimaryButton>
          </div>
        </ListCard>
      )}

      <ListCard>
        <ListCardHeader
          tone="amber"
          title={
            tab === 'materials'
              ? 'Materials'
              : tab === 'labour'
                ? 'Labour rates'
                : tab === 'equipment'
                  ? 'Equipment'
                  : 'Markup rules'
          }
          meta={
            showItemActions ? (
              <Pill tone="amber">
                {search.length >= 2
                  ? `${totalFound.toLocaleString()} matches`
                  : `${stats?.totalItems?.toLocaleString() ?? 0} items`}
              </Pill>
            ) : undefined
          }
          action={search && showItemActions ? 'Clear' : undefined}
          onAction={search && showItemActions ? () => setSearch('') : undefined}
        />

        {(tab === 'materials' || isEquipment) && (
          <div className="px-5 sm:px-6 py-3 border-b border-white/[0.06] flex flex-wrap gap-2">
            {(isEquipment ? EQUIPMENT_CATEGORIES : CATEGORIES).map((cat) => {
              const active = (isEquipment ? effectiveCategory : category) === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={
                    'h-8 px-3 rounded-full text-[12px] font-medium whitespace-nowrap touch-manipulation transition-colors ' +
                    (active
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08]')
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {tab === 'labour' ? (
          <div className="p-5 sm:p-6 space-y-5">
            <p className="text-[13px] text-white/70">
              Your standard charge-out rates. These feed quote and job pricing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] text-white/70 mb-1.5 block">Day rate</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white">£</span>
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={dayRate}
                    onChange={(e) => setDayRate(e.target.value)}
                    className={`${inputClass} pl-7`}
                    step="0.01"
                  />
                </div>
              </div>
              <div>
                <label className="text-[12px] text-white/70 mb-1.5 block">Hourly rate</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white">£</span>
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className={`${inputClass} pl-7`}
                    step="0.01"
                  />
                </div>
              </div>
            </div>
            <PrimaryButton
              onClick={() =>
                saveRates({
                  day_rate: dayRate === '' ? null : parseFloat(dayRate),
                  hourly_rate: hourlyRate === '' ? null : parseFloat(hourlyRate),
                })
              }
              disabled={savingRates || profileLoading}
              fullWidth
            >
              {savingRates ? 'Saving…' : 'Save labour rates'}
            </PrimaryButton>
          </div>
        ) : tab === 'markup' ? (
          <div className="p-5 sm:p-6 space-y-5">
            <p className="text-[13px] text-white/70">
              Default commercials applied across quotes. Per-item markup lives on each material.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[12px] text-white/70 mb-1.5 block">Overhead %</label>
                <div className="relative">
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="0"
                    value={overhead}
                    onChange={(e) => setOverhead(e.target.value)}
                    className={`${inputClass} pr-7`}
                    step="0.5"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white">%</span>
                </div>
              </div>
              <div>
                <label className="text-[12px] text-white/70 mb-1.5 block">Profit margin %</label>
                <div className="relative">
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="0"
                    value={profit}
                    onChange={(e) => setProfit(e.target.value)}
                    className={`${inputClass} pr-7`}
                    step="0.5"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white">%</span>
                </div>
              </div>
              <div>
                <label className="text-[12px] text-white/70 mb-1.5 block">Default markup %</label>
                <div className="relative">
                  <Input
                    type="number"
                    inputMode="decimal"
                    placeholder="30"
                    value={markup}
                    onChange={(e) => setMarkup(e.target.value)}
                    className={`${inputClass} pr-7`}
                    step="1"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white">%</span>
                </div>
              </div>
            </div>
            <p className="text-[12px] text-white/50">
              Default markup is applied to new price-book items added via quick-add.
            </p>
            <PrimaryButton
              onClick={() =>
                saveRates({
                  overhead_percentage: overhead === '' ? null : parseFloat(overhead),
                  profit_margin: profit === '' ? null : parseFloat(profit),
                  markup: markup === '' ? null : parseFloat(markup),
                })
              }
              disabled={savingRates || profileLoading}
              fullWidth
            >
              {savingRates ? 'Saving…' : 'Save markup rules'}
            </PrimaryButton>
          </div>
        ) : search.length < 2 ? (
          <EmptyState
            title="Type at least 2 characters to search"
            description="Or ask your voice assistant for a price lookup."
            className="rounded-none border-0"
          />
        ) : searchLoading ? (
          <div className="p-5 sm:p-6">
            <LoadingBlocks />
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            title="No items found"
            description="Add a new item to your price book to get started."
            action="Add new item"
            onAction={() => setShowQuickAdd(true)}
            className="rounded-none border-0"
          />
        ) : (
          <>
            <ListBody>
              {items.map((item) => {
                const lowStock = item.stock_level <= item.reorder_level;
                return (
                  <ListRow
                    key={item.id}
                    title={item.name}
                    subtitle={
                      <span>
                        {item.category}
                        {item.sku && ` · ${item.sku}`}
                        {' · '}Cost £{item.buy_price.toFixed(2)}
                        {item.markup != null && ` · ${item.markup.toFixed(0)}% markup`}
                      </span>
                    }
                    trailing={
                      <>
                        {lowStock && <Pill tone="amber">Low stock</Pill>}
                        <span className="text-[14px] font-semibold text-elec-yellow tabular-nums">
                          £{item.sell_price.toFixed(2)}
                        </span>
                      </>
                    }
                    onClick={() => handleEdit(item)}
                  />
                );
              })}
            </ListBody>

            {hasNextPage && (
              <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06]">
                <SecondaryButton
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  fullWidth
                >
                  {isFetchingNextPage ? 'Loading...' : 'Load more'}
                </SecondaryButton>
              </div>
            )}
          </>
        )}
      </ListCard>

      <Divider />

      <ImportPriceBookDialog open={showImportDialog} onOpenChange={setShowImportDialog} />

      <EditPriceBookItemSheet
        item={editItem}
        open={showEditSheet}
        onOpenChange={setShowEditSheet}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
        isSaving={updateItem.isPending}
        isDeleting={deleteItem.isPending}
      />
    </PageFrame>
  );
}

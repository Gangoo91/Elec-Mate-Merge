import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Search,
  Plus,
  Tag,
  Package,
  Pencil,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useMaterialsLists, MaterialsListItem } from '@/hooks/useMaterialsLists';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface PricedItem {
  item: MaterialsListItem;
  listId: string;
  listName: string;
}

const CATEGORIES = ['All', 'Cable', 'Accessories', 'Tools', 'Safety', 'General'] as const;
type Category = (typeof CATEGORIES)[number];

function deriveCategory(item: MaterialsListItem): string {
  const name = item.name.toLowerCase();
  if (name.includes('cable') || name.includes('wire') || name.includes('flex') || name.includes('t&e') || name.includes('swa'))
    return 'Cable';
  if (name.includes('socket') || name.includes('switch') || name.includes('connector') || name.includes('terminal') || name.includes('plate') || name.includes('accessori'))
    return 'Accessories';
  if (name.includes('tool') || name.includes('drill') || name.includes('screwdriver') || name.includes('plier') || name.includes('tester') || name.includes('multimeter'))
    return 'Tools';
  if (name.includes('safety') || name.includes('ppe') || name.includes('glove') || name.includes('goggles') || name.includes('helmet') || name.includes('hi-vis'))
    return 'Safety';
  return 'General';
}

export default function PriceBook() {
  const { lists, updateItemPrice, addItem, createList } = useMaterialsLists();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [editSheet, setEditSheet] = useState<PricedItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editUnit, setEditUnit] = useState('');
  const [editSupplier, setEditSupplier] = useState('');
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newUnit, setNewUnit] = useState('each');
  const [newSupplier, setNewSupplier] = useState('');

  // Flatten all priced items across all lists
  const pricedItems = useMemo<PricedItem[]>(() => {
    const result: PricedItem[] = [];
    for (const list of lists) {
      for (const item of list.items) {
        if (item.estimated_price != null && item.estimated_price > 0) {
          result.push({ item, listId: list.id, listName: list.name });
        }
      }
    }
    return result;
  }, [lists]);

  // Filter by search + category
  const filtered = useMemo(() => {
    let items = pricedItems;
    if (activeCategory !== 'All') {
      items = items.filter((p) => deriveCategory(p.item) === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((p) => p.item.name.toLowerCase().includes(q));
    }
    return items;
  }, [pricedItems, activeCategory, search]);

  const openEditSheet = (p: PricedItem) => {
    setEditSheet(p);
    setEditName(p.item.name);
    setEditPrice(p.item.estimated_price?.toFixed(2) || '');
    setEditUnit(p.item.unit || 'each');
    setEditSupplier(p.item.supplier || '');
  };

  const handleSaveEdit = async () => {
    if (!editSheet) return;
    const parsed = parseFloat(editPrice);
    if (isNaN(parsed) || parsed <= 0) {
      toast({ title: 'Invalid price', description: 'Please enter a valid price.', variant: 'destructive' });
      return;
    }

    // Update the price (name/unit/supplier changes would require updating the full item,
    // but updateItemPrice handles the price update via JSONB)
    await updateItemPrice(editSheet.listId, editSheet.item.id, parsed);
    toast({ title: 'Price updated', description: `${editName} updated to £${parsed.toFixed(2)}` });
    setEditSheet(null);
  };

  const handleAddItem = async () => {
    if (!newName.trim() || !newPrice.trim()) {
      toast({ title: 'Missing fields', description: 'Name and price are required.', variant: 'destructive' });
      return;
    }
    const parsed = parseFloat(newPrice);
    if (isNaN(parsed) || parsed <= 0) {
      toast({ title: 'Invalid price', description: 'Please enter a valid price.', variant: 'destructive' });
      return;
    }

    // Find or create a "Price Book" list
    let priceBookList = lists.find((l) => l.name === 'Price Book');
    if (!priceBookList) {
      priceBookList = await createList('Price Book', 'Items added from My Price Book');
      if (!priceBookList) return;
    }

    await addItem(priceBookList.id, {
      name: newName.trim(),
      current_price: parsed,
      supplier_name: newSupplier.trim() || undefined,
    });

    toast({ title: 'Item added', description: `${newName.trim()} added to Price Book` });
    setNewName('');
    setNewPrice('');
    setNewUnit('each');
    setNewSupplier('');
    setAddSheetOpen(false);
  };

  return (
    <div className="bg-background pb-20 sm:pb-8 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-3 -ml-2 touch-manipulation h-10 text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back
          </Button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-xl">
                <BookOpen className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">My Price Book</h1>
                <p className="text-gray-400 text-sm">
                  {pricedItems.length} priced {pricedItems.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 pl-10 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 focus:border-elec-yellow focus:ring-elec-yellow/20 touch-manipulation"
          />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-manipulation active:scale-[0.97]',
                activeCategory === cat
                  ? 'bg-elec-yellow text-black'
                  : 'bg-white/[0.05] text-gray-400 border border-white/[0.08]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-14 w-14 text-gray-600 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-white mb-2">
              {pricedItems.length === 0 ? 'No priced items yet' : 'No matching items'}
            </h2>
            <p className="text-gray-400 mb-6 max-w-sm mx-auto">
              {pricedItems.length === 0
                ? 'Add prices to your materials or tap + to add items.'
                : 'Try a different search or category.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((p) => (
              <button
                key={`${p.listId}-${p.item.id}`}
                onClick={() => openEditSheet(p)}
                className="w-full text-left p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06] touch-manipulation active:scale-[0.99] transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-white line-clamp-1 flex-1 mr-2">
                    {p.item.name}
                  </p>
                  <span className="text-sm font-bold text-elec-yellow whitespace-nowrap">
                    £{p.item.estimated_price?.toFixed(2)} / {p.item.unit || 'each'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {p.item.supplier && (
                    <span className="text-xs text-gray-400">{p.item.supplier}</span>
                  )}
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 border-white/[0.1] text-gray-500"
                  >
                    {p.listName}
                  </Badge>
                  <Pencil className="h-3 w-3 text-gray-600 ml-auto" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setAddSheetOpen(true)}
        className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 w-14 h-14 rounded-full bg-elec-yellow flex items-center justify-center shadow-lg shadow-elec-yellow/30 touch-manipulation active:scale-95 transition-transform z-50"
        aria-label="Add item"
      >
        <Plus className="h-6 w-6 text-black" />
      </button>

      {/* Edit Price Sheet */}
      <Sheet open={!!editSheet} onOpenChange={(open) => !open && setEditSheet(null)}>
        <SheetContent side="bottom" className="h-auto max-h-[70vh] rounded-t-2xl">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <Pencil className="h-5 w-5" />
              Edit Item
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4 pb-6">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Item Name</label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="h-11 bg-white/[0.03] border-white/[0.08] text-white touch-manipulation"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Price (£)</label>
                <Input
                  type="text"
                  inputMode="decimal"
                  step="0.01"
                  value={editPrice}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '' || /^\d*\.?\d*$/.test(val)) setEditPrice(val);
                  }}
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white touch-manipulation"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Unit</label>
                <Input
                  value={editUnit}
                  onChange={(e) => setEditUnit(e.target.value)}
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white touch-manipulation"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Supplier</label>
              <Input
                value={editSupplier}
                onChange={(e) => setEditSupplier(e.target.value)}
                placeholder="Optional"
                className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation"
              />
            </div>
            <Button
              onClick={handleSaveEdit}
              className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
            >
              Save Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Add Item Sheet */}
      <Sheet open={addSheetOpen} onOpenChange={setAddSheetOpen}>
        <SheetContent side="bottom" className="h-auto max-h-[70vh] rounded-t-2xl">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <Plus className="h-5 w-5" />
              Add to Price Book
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4 pb-6">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Item Name *</label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., 2.5mm T&E 100m"
                className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Price (£) *</label>
                <Input
                  type="text"
                  inputMode="decimal"
                  step="0.01"
                  value={newPrice}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '' || /^\d*\.?\d*$/.test(val)) setNewPrice(val);
                  }}
                  placeholder="0.00"
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Unit</label>
                <Input
                  value={newUnit}
                  onChange={(e) => setNewUnit(e.target.value)}
                  placeholder="each"
                  className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Supplier</label>
              <Input
                value={newSupplier}
                onChange={(e) => setNewSupplier(e.target.value)}
                placeholder="Optional"
                className="h-11 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-gray-500 touch-manipulation"
              />
            </div>
            <Button
              onClick={handleAddItem}
              disabled={!newName.trim() || !newPrice.trim()}
              className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-40"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

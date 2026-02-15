import { useState } from 'react';
import { Plus, ListChecks, Package } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMaterialsLists } from '@/hooks/useMaterialsLists';
import { MarketplaceProduct } from '@/hooks/useMarketplaceSearch';
import { cn } from '@/lib/utils';

interface SaveToListSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: MarketplaceProduct | null;
}

/**
 * Bottom sheet for saving a product to a materials list.
 * Shows existing lists or prompts to create the first one.
 */
export function SaveToListSheet({ open, onOpenChange, product }: SaveToListSheetProps) {
  const { lists, isLoading, createList, addItem } = useMaterialsLists();
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSelectList = async (listId: string) => {
    if (!product || saving) return;
    setSaving(true);
    await addItem(listId, {
      id: product.id,
      name: product.brand ? `${product.brand} ${product.name}` : product.name,
      current_price: product.current_price,
      supplier_name: product.supplier_name,
      product_url: product.product_url,
      image_url: product.image_url,
    });
    setSaving(false);
    onOpenChange(false);
  };

  const handleCreateAndAdd = async () => {
    if (!newListName.trim() || !product || saving) return;
    setSaving(true);
    const newList = await createList(newListName.trim());
    if (newList) {
      await addItem(newList.id, {
        id: product.id,
        name: product.brand ? `${product.brand} ${product.name}` : product.name,
        current_price: product.current_price,
        supplier_name: product.supplier_name,
        product_url: product.product_url,
        image_url: product.image_url,
      });
    }
    setNewListName('');
    setShowNewListInput(false);
    setSaving(false);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-auto max-h-[60vh] rounded-t-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ListChecks className="h-5 w-5" />
            Save to List
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-2 overflow-y-auto pb-6">
          {/* Product preview */}
          {product && (
            <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50 mb-4">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-12 w-12 object-contain rounded bg-white p-1"
                />
              ) : (
                <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white line-clamp-1">
                  {product.brand ? `${product.brand} ${product.name}` : product.name}
                </p>
                <p className="text-xs text-white">
                  £{product.current_price?.toFixed(2)} &middot; {product.supplier_name}
                </p>
              </div>
            </div>
          )}

          {/* Loading state */}
          {isLoading && (
            <p className="text-center text-sm text-white py-4">Loading lists...</p>
          )}

          {/* No lists state */}
          {!isLoading && lists.length === 0 && !showNewListInput && (
            <div className="text-center py-6">
              <ListChecks className="h-10 w-10 text-white mx-auto mb-3" />
              <p className="text-sm text-white mb-4">Create your first list to start saving products</p>
              <Button
                onClick={() => setShowNewListInput(true)}
                className="h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First List
              </Button>
            </div>
          )}

          {/* Existing lists */}
          {!isLoading && lists.length > 0 && (
            <>
              {lists.map((list) => (
                <button
                  key={list.id}
                  onClick={() => handleSelectList(list.id)}
                  disabled={saving}
                  className={cn(
                    'w-full flex items-center justify-between p-3 rounded-lg border border-border/50 touch-manipulation',
                    'hover:border-elec-yellow/50 active:scale-[0.98] transition-all text-left',
                    saving && 'opacity-50'
                  )}
                >
                  <div>
                    <p className="text-sm font-medium text-white">{list.name}</p>
                    <p className="text-xs text-white">
                      {list.items.length} {list.items.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                  <Plus className="h-4 w-4 text-white" />
                </button>
              ))}
            </>
          )}

          {/* New list input */}
          {showNewListInput ? (
            <div className="flex gap-2 pt-2">
              <Input
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="List name..."
                className="h-11 flex-1"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateAndAdd();
                }}
              />
              <Button
                onClick={handleCreateAndAdd}
                disabled={!newListName.trim() || saving}
                className="h-11 px-4 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
              >
                {saving ? 'Saving...' : 'Create & Add'}
              </Button>
            </div>
          ) : (
            !isLoading && lists.length > 0 && (
              <button
                onClick={() => setShowNewListInput(true)}
                className="w-full flex items-center gap-2 p-3 rounded-lg border border-dashed border-border/50 touch-manipulation hover:border-elec-yellow/50 transition-all text-white text-sm"
              >
                <Plus className="h-4 w-4" />
                Create New List
              </button>
            )
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SaveToListSheet;

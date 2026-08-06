import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useMaterialsLists } from '@/hooks/useMaterialsLists';
import { MarketplaceProduct } from '@/hooks/useMarketplaceSearch';
import { cn } from '@/lib/utils';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';
import ProductImage from './ProductImage';

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
      <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl">
        <SheetHeader>
          <SheetTitle className="text-left text-[17px] font-semibold tracking-tight text-white">
            Save to a list
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-3 overflow-y-auto pb-6">
          {product && (
            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-3">
              <ProductImage
                src={product.image_url}
                alt={product.name}
                fallbackLabel={product.brand || product.supplier_name}
                sizeClassName="h-12 w-12 shrink-0"
                className="rounded-lg"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-[14px] font-semibold text-white">
                  {product.brand ? `${product.brand} ${product.name}` : product.name}
                </p>
                <p className="mt-0.5 text-[12px] text-white tabular-nums">
                  £{product.current_price?.toFixed(2)} · {product.supplier_name}
                </p>
              </div>
            </div>
          )}

          {isLoading && <p className="py-4 text-center text-[13px] text-white">Loading lists…</p>}

          {!isLoading && lists.length === 0 && !showNewListInput && (
            <div className="py-8 text-center">
              <h3 className="text-[15px] font-semibold tracking-tight text-white">No lists yet</h3>
              <p className="mx-auto mt-1.5 max-w-xs text-[13px] text-white">
                A list keeps what you need for a job in one place, ready to price up.
              </p>
              <button
                type="button"
                onClick={() => setShowNewListInput(true)}
                className="mt-5 h-11 rounded-xl bg-elec-yellow px-5 text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
              >
                Create a list
              </button>
            </div>
          )}

          {!isLoading && lists.length > 0 && (
            <div className="divide-y divide-white/[0.10] overflow-hidden rounded-2xl border border-white/[0.12]">
              {lists.map((list) => (
                <button
                  key={list.id}
                  type="button"
                  onClick={() => handleSelectList(list.id)}
                  disabled={saving}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 bg-white/[0.03] px-4 py-3.5 text-left transition-colors hover:bg-white/[0.06] touch-manipulation',
                    saving && 'opacity-50'
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold text-white">
                      {list.name}
                    </span>
                    <span className="mt-0.5 block text-[12px] text-white tabular-nums">
                      {list.items.length} {list.items.length === 1 ? 'item' : 'items'}
                    </span>
                  </span>
                  <span className="shrink-0 text-[12px] font-semibold text-elec-yellow">Add</span>
                </button>
              ))}
            </div>
          )}

          {showNewListInput ? (
            <div className="pt-1">
              <label className={labelCn} htmlFor="new-list-name">
                List name
              </label>
              <input
                id="new-list-name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Rewire — 42 Oak Avenue"
                className={inputCn}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateAndAdd();
                }}
              />
              <button
                type="button"
                onClick={handleCreateAndAdd}
                disabled={!newListName.trim() || saving}
                className="mt-3 h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors touch-manipulation active:scale-[0.98] disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Create and add'}
              </button>
            </div>
          ) : (
            !isLoading &&
            lists.length > 0 && (
              <button
                type="button"
                onClick={() => setShowNewListInput(true)}
                className="h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation"
              >
                New list
              </button>
            )
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SaveToListSheet;

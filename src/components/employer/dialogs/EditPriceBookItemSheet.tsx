import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Trash2, Save, Loader2 } from 'lucide-react';
import type { PriceBookItem } from '@/services/financeService';

const CATEGORIES = ['Cable', 'Accessories', 'Fixings', 'Lighting', 'Switches & Sockets', 'Consumer Units', 'Tools', 'Testing', 'Safety', 'Other'];
const UNITS = ['each', 'metre', 'roll', 'box', 'pack', 'pair', 'set', 'kg', 'litre'];

interface EditPriceBookItemSheetProps {
  item: PriceBookItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, updates: Partial<PriceBookItem>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isSaving?: boolean;
  isDeleting?: boolean;
}

export function EditPriceBookItemSheet({
  item,
  open,
  onOpenChange,
  onSave,
  onDelete,
  isSaving,
  isDeleting,
}: EditPriceBookItemSheetProps) {
  const isMobile = useIsMobile();

  const [name, setName] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [category, setCategory] = useState('Cable');
  const [unit, setUnit] = useState('each');
  const [sku, setSku] = useState('');
  const [stockLevel, setStockLevel] = useState('');
  const [reorderLevel, setReorderLevel] = useState('');

  // Reset form when item changes
  useEffect(() => {
    if (item) {
      setName(item.name);
      setBuyPrice(item.buy_price.toString());
      setSellPrice(item.sell_price.toString());
      setCategory(item.category);
      setUnit(item.unit);
      setSku(item.sku || '');
      setStockLevel(item.stock_level?.toString() || '0');
      setReorderLevel(item.reorder_level?.toString() || '0');
    }
  }, [item]);

  if (!item) return null;

  const handleSave = async () => {
    await onSave(item.id, {
      name,
      buy_price: parseFloat(buyPrice) || 0,
      sell_price: parseFloat(sellPrice) || 0,
      category,
      unit,
      sku: sku || null,
      stock_level: parseInt(stockLevel) || 0,
      reorder_level: parseInt(reorderLevel) || 0,
    });
    onOpenChange(false);
  };

  const handleDelete = async () => {
    await onDelete(item.id);
    onOpenChange(false);
  };

  const markup = buyPrice && sellPrice
    ? (((parseFloat(sellPrice) - parseFloat(buyPrice)) / parseFloat(buyPrice)) * 100).toFixed(1)
    : '0';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={cn(
          "flex flex-col p-0",
          isMobile ? "h-[90vh] rounded-t-2xl" : "w-[450px]"
        )}
      >
        {/* Header */}
        <SheetHeader className="p-4 border-b border-border shrink-0">
          <SheetTitle>Edit Material</SheetTitle>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Material name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="buyPrice">Buy Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
                <Input
                  id="buyPrice"
                  type="number"
                  step="0.01"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sellPrice">Sell Price</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
                <Input
                  id="sellPrice"
                  type="number"
                  step="0.01"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>
          </div>

          {buyPrice && sellPrice && (
            <p className="text-sm text-muted-foreground">
              Markup: {markup}%
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Unit</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map((u) => (
                    <SelectItem key={u} value={u}>{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sku">SKU (optional)</Label>
            <Input
              id="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="Product code"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="stockLevel">Stock Level</Label>
              <Input
                id="stockLevel"
                type="number"
                value={stockLevel}
                onChange={(e) => setStockLevel(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reorderLevel">Reorder Level</Label>
              <Input
                id="reorderLevel"
                type="number"
                value={reorderLevel}
                onChange={(e) => setReorderLevel(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border shrink-0 pb-safe space-y-3">
          <Button
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 h-11"
            onClick={handleSave}
            disabled={isSaving || !name.trim()}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-11 text-destructive hover:text-destructive hover:bg-destructive/10"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Item
                  </>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Material</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </SheetContent>
    </Sheet>
  );
}

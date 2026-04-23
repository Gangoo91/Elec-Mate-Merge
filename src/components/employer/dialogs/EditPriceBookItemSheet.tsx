import { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Trash2, Save, Loader2 } from 'lucide-react';
import type { PriceBookItem } from '@/services/financeService';
import {
  SheetShell,
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';

const CATEGORIES = [
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

  const markup =
    buyPrice && sellPrice
      ? (((parseFloat(sellPrice) - parseFloat(buyPrice)) / parseFloat(buyPrice)) * 100).toFixed(1)
      : '0';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={cn('p-0 overflow-hidden', isMobile ? 'h-[90vh]' : 'w-[480px]')}
      >
        <SheetShell
          eyebrow="Price book"
          title="Edit material"
          description="Update pricing, stock levels, and categorisation."
          footer={
            <>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DestructiveButton disabled={isDeleting}>
                    {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </DestructiveButton>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[hsl(0_0%_10%)] border-white/[0.08]">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Delete material</AlertDialogTitle>
                    <AlertDialogDescription className="text-white">
                      Are you sure you want to delete "{name}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-white/[0.06] text-white border-white/[0.1] hover:bg-white/[0.1]">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={handleSave} disabled={isSaving || !name.trim()} fullWidth>
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-1.5" />
                    Save
                  </>
                )}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Item details">
            <Field label="Name">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Material name"
                className={inputClass}
              />
            </Field>
            <FormGrid cols={2}>
              <Field label="Buy price (£)">
                <Input
                  type="number"
                  step="0.01"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Sell price (£)">
                <Input
                  type="number"
                  step="0.01"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            {buyPrice && sellPrice && (
              <p className="text-[11px] text-white">Markup: {markup}%</p>
            )}
            <FormGrid cols={2}>
              <Field label="Category">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Unit">
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {UNITS.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>
            <Field label="SKU (optional)">
              <Input
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Product code"
                className={inputClass}
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Stock">
            <FormGrid cols={2}>
              <Field label="Stock level">
                <Input
                  type="number"
                  value={stockLevel}
                  onChange={(e) => setStockLevel(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Reorder level">
                <Input
                  type="number"
                  value={reorderLevel}
                  onChange={(e) => setReorderLevel(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </FormCard>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

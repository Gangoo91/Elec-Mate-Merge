import { useReducer, useState, useMemo } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  InventoryCategory,
  InventoryLocation,
  InventoryUnit,
  INVENTORY_CATEGORIES,
  INVENTORY_LOCATIONS,
  INVENTORY_UNITS,
  UNIT_STEP,
  CreateInventoryInput,
} from '@/types/inventory';
import { toast } from '@/hooks/use-toast';

// Form state reducer
interface AddFormState {
  name: string;
  category: InventoryCategory;
  quantity: number;
  unit: InventoryUnit;
  location: InventoryLocation;
  lowStockThreshold: string;
  unitCost: string;
  supplier: string;
  notes: string;
  showMore: boolean;
}

type AddFormAction =
  | { type: 'SET'; field: keyof AddFormState; value: string | number | boolean }
  | { type: 'RESET' };

const INITIAL_STATE: AddFormState = {
  name: '',
  category: 'cable',
  quantity: 1,
  unit: 'each',
  location: 'van',
  lowStockThreshold: '',
  unitCost: '',
  supplier: '',
  notes: '',
  showMore: false,
};

function formReducer(state: AddFormState, action: AddFormAction): AddFormState {
  switch (action.type) {
    case 'SET':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

interface InventoryAddSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (input: CreateInventoryInput) => Promise<unknown>;
  existingItems?: { id: string; name: string; quantity: number; unit: string; location: string }[];
  onUpdateExisting?: (id: string, addQuantity: number) => void;
}

export function InventoryAddSheet({
  open,
  onOpenChange,
  onSave,
  existingItems = [],
  onUpdateExisting,
}: InventoryAddSheetProps) {
  const [form, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);

  const step = UNIT_STEP[form.unit] || 1;

  // Memoized duplicate check
  const duplicate = useMemo(
    () =>
      form.name.trim()
        ? existingItems.find((i) => i.name.toLowerCase() === form.name.trim().toLowerCase())
        : null,
    [form.name, existingItems]
  );

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast({ title: 'Enter an item name', variant: 'destructive' });
      return;
    }

    // If duplicate found, offer to merge
    if (duplicate && onUpdateExisting) {
      onUpdateExisting(duplicate.id, form.quantity);
      toast({
        title: 'Updated existing item',
        description: `Added ${form.quantity} to ${duplicate.name} (now ${duplicate.quantity + form.quantity} ${duplicate.unit})`,
      });
      dispatch({ type: 'RESET' });
      onOpenChange(false);
      return;
    }

    setSaving(true);
    const result = await onSave({
      name: form.name.trim(),
      category: form.category,
      quantity: form.quantity,
      unit: form.unit,
      location: form.location,
      low_stock_threshold: form.lowStockThreshold ? parseFloat(form.lowStockThreshold) : null,
      unit_cost: form.unitCost ? parseFloat(form.unitCost) : null,
      supplier: form.supplier.trim() || null,
      notes: form.notes.trim() || null,
    });
    setSaving(false);

    if (result) {
      toast({ title: 'Item added', description: form.name });
      dispatch({ type: 'RESET' });
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <div className="px-4 pt-6 pb-3 border-b border-white/[0.06]">
            <h2 className="text-lg font-semibold text-white">Add Item</h2>
            <p className="text-[12px] text-white mt-0.5">
              Add materials, tools or equipment to your stock
            </p>
          </div>

          {/* Form */}
          <div
            className={cn(
              'flex-1 overflow-y-auto px-4 py-4 space-y-6 transition-opacity',
              saving && 'pointer-events-none opacity-60'
            )}
          >
            {/* Name */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Item Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => dispatch({ type: 'SET', field: 'name', value: e.target.value })}
                placeholder="e.g. 6mm T&E Twin & Earth"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                autoFocus
              />
              {duplicate && (
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2">
                  <p className="text-[12px] text-amber-300">
                    "{duplicate.name}" already exists ({duplicate.quantity} {duplicate.unit} in{' '}
                    {duplicate.location}). Saving will add your quantity to the existing item.
                  </p>
                </div>
              )}
            </div>

            {/* Category pills */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Category</Label>
              <div className="flex flex-wrap gap-2">
                {INVENTORY_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => dispatch({ type: 'SET', field: 'category', value: cat.id })}
                    className={cn(
                      'px-4 py-2.5 rounded-full text-[13px] font-medium touch-manipulation transition-all min-h-[44px]',
                      form.category === cat.id
                        ? cat.pillActiveClass
                        : 'bg-white/[0.04] text-white border border-white/[0.06]'
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Unit */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white">Quantity</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl bg-white/[0.06] text-white"
                    onClick={() =>
                      dispatch({
                        type: 'SET',
                        field: 'quantity',
                        value: Math.max(0, Math.round((form.quantity - step) * 100) / 100),
                      })
                    }
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <Input
                    type="number"
                    value={form.quantity}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET',
                        field: 'quantity',
                        value: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="h-11 text-center text-base font-bold touch-manipulation border-white/30 focus:border-yellow-500"
                    min={0}
                    step={step}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl bg-white/[0.06] text-white"
                    onClick={() =>
                      dispatch({
                        type: 'SET',
                        field: 'quantity',
                        value: Math.round((form.quantity + step) * 100) / 100,
                      })
                    }
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white">Unit</Label>
                <Select
                  value={form.unit}
                  onValueChange={(v) => dispatch({ type: 'SET', field: 'unit', value: v })}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-elec-gray text-white">
                    {INVENTORY_UNITS.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.pluralLabel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location pills */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Location</Label>
              <div className="flex flex-wrap gap-2">
                {INVENTORY_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => dispatch({ type: 'SET', field: 'location', value: loc.id })}
                    className={cn(
                      'px-4 py-2.5 rounded-full text-[13px] font-medium touch-manipulation transition-all min-h-[44px]',
                      form.location === loc.id
                        ? 'bg-teal-500/20 text-white border border-teal-500/40'
                        : 'bg-white/[0.04] text-white border border-white/[0.06]'
                    )}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* More details (collapsible) */}
            <Collapsible
              open={form.showMore}
              onOpenChange={(v) => dispatch({ type: 'SET', field: 'showMore', value: v })}
            >
              <CollapsibleTrigger className="flex items-center gap-2 text-[13px] text-white font-medium touch-manipulation py-3 min-h-[44px]">
                <ChevronDown
                  className={cn('h-4 w-4 transition-transform', form.showMore && 'rotate-180')}
                />
                More details
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 pt-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white">Low Stock Alert</Label>
                  <Input
                    type="number"
                    value={form.lowStockThreshold}
                    onChange={(e) =>
                      dispatch({ type: 'SET', field: 'lowStockThreshold', value: e.target.value })
                    }
                    placeholder="Alert when quantity drops below..."
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
                    min={0}
                    step={step}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white">Unit Cost (£)</Label>
                  <Input
                    type="number"
                    value={form.unitCost}
                    onChange={(e) =>
                      dispatch({ type: 'SET', field: 'unitCost', value: e.target.value })
                    }
                    placeholder="Cost per unit"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
                    min={0}
                    step={0.01}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white">Supplier</Label>
                  <Input
                    value={form.supplier}
                    onChange={(e) =>
                      dispatch({ type: 'SET', field: 'supplier', value: e.target.value })
                    }
                    list="supplier-suggestions"
                    placeholder="e.g. CEF, Edmundson, Screwfix"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
                  />
                  <datalist id="supplier-suggestions">
                    <option value="CEF" />
                    <option value="Edmundson" />
                    <option value="Screwfix" />
                    <option value="Toolstation" />
                    <option value="City Electrical Factors" />
                    <option value="Rexel" />
                    <option value="Electric Center" />
                    <option value="Medlock" />
                  </datalist>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white">Notes</Label>
                  <Textarea
                    value={form.notes}
                    onChange={(e) =>
                      dispatch({ type: 'SET', field: 'notes', value: e.target.value })
                    }
                    placeholder="Any extra details..."
                    className="touch-manipulation text-base min-h-[80px] border-white/30 focus:border-yellow-500"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Save button */}
          <div className="p-4 border-t border-white/[0.06]">
            <Button
              onClick={handleSave}
              disabled={saving || !form.name.trim()}
              className="w-full h-12 text-base font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black rounded-xl touch-manipulation"
            >
              {saving ? 'Adding...' : duplicate ? 'Add to Existing' : 'Add Item'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

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
  DEFAULT_LOW_STOCK_THRESHOLD,
  defaultThresholdFor,
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
  /** Stops the unit-driven default clobbering a hand-typed level. */
  thresholdTouched: boolean;
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
  lowStockThreshold: String(DEFAULT_LOW_STOCK_THRESHOLD.each),
  unitCost: '',
  supplier: '',
  notes: '',
  showMore: false,
  thresholdTouched: false,
};

function formReducer(state: AddFormState, action: AddFormAction): AddFormState {
  switch (action.type) {
    case 'SET': {
      const next = { ...state, [action.field]: action.value };
      // Changing the unit re-seeds the alert level — 5 is sensible for sockets
      // and absurd for metres of cable — but never overwrites a number the
      // electrician typed themselves.
      if (action.field === 'unit' && !state.thresholdTouched) {
        next.lowStockThreshold = String(defaultThresholdFor(action.value as InventoryUnit));
      }
      if (action.field === 'lowStockThreshold') next.thresholdTouched = true;
      return next;
    }
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
      <SheetContent side="bottom"
          className="h-[88vh] overflow-hidden rounded-t-2xl border-t border-white/[0.14] bg-[#141419] p-0 focus:outline-none focus-visible:outline-none">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="mx-auto w-full max-w-5xl border-b border-white/[0.08] px-4 pb-4 pt-6">
            <h2 className="text-lg font-semibold text-white">Add Item</h2>
            <p className="text-[12px] text-white mt-0.5">
              Add materials, tools or equipment to your stock
            </p>
          </div>

          {/* Form */}
          <div
            className={cn(
              'mx-auto w-full max-w-5xl flex-1 overflow-y-auto px-4 py-5 transition-opacity',
              saving && 'pointer-events-none opacity-60'
            )}
          >
            <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
            {/* Name */}
            <div className="space-y-2 rounded-2xl border border-white/[0.12] bg-white/[0.04] p-4 lg:col-span-2">
              <Label className="text-[12px] font-medium text-white mb-1 block">Item Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => dispatch({ type: 'SET', field: 'name', value: e.target.value })}
                placeholder="e.g. 6mm T&E Twin & Earth"
                className="input-underline h-12 w-full rounded-xl border border-white/[0.14] bg-white/[0.06] px-3 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white/30 hover:border-white/[0.24] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation"
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
            <div className="space-y-2 rounded-2xl border border-white/[0.12] bg-white/[0.04] p-4 lg:col-span-2">
              <Label className="text-[12px] font-medium text-white mb-1 block">Category</Label>
              <div className="flex flex-wrap gap-2">
                {INVENTORY_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => dispatch({ type: 'SET', field: 'category', value: cat.id })}
                    className={cn(
                      'flex min-h-[44px] items-center rounded-xl border px-4 text-[13px] transition-colors touch-manipulation',
                      form.category === cat.id
                        ? cat.pillActiveClass
                        : 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:border-white/[0.25]'
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Unit */}
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/[0.12] bg-white/[0.04] p-4">
              <div className="space-y-2">
                <Label className="text-[12px] font-medium text-white mb-1 block">Quantity</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 flex-shrink-0 rounded-xl border border-white/[0.14] bg-white/[0.06] text-white transition-colors hover:bg-white/[0.12] touch-manipulation"
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
                    className="input-underline h-12 w-full rounded-xl border border-white/[0.14] bg-white/[0.06] px-3 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white/30 hover:border-white/[0.24] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation text-center font-bold"
                    min={0}
                    step={step}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 flex-shrink-0 rounded-xl border border-white/[0.14] bg-white/[0.06] text-white transition-colors hover:bg-white/[0.12] touch-manipulation"
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
                <Label className="text-[12px] font-medium text-white mb-1 block">Unit</Label>
                <Select
                  value={form.unit}
                  onValueChange={(v) => dispatch({ type: 'SET', field: 'unit', value: v })}
                >
                  <SelectTrigger className="h-12 rounded-xl border border-white/[0.14] bg-white/[0.06] px-3 text-base font-medium text-white transition-colors hover:border-white/[0.24] focus:border-elec-yellow focus:ring-0 touch-manipulation">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/[0.1] bg-[#111114] text-white">
                    {INVENTORY_UNITS.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.pluralLabel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Alert level — out of "More details" and into the form proper.
                Hidden, it was set on 3 of 42 items in production, which left the
                one feature a stock tracker exists for switched off for almost
                everybody. Pre-filled from the unit so it works untouched. */}
            <div className="space-y-2 rounded-2xl border border-white/[0.12] bg-white/[0.04] p-4">
              <Label className="text-[12px] font-medium text-white mb-1 block">Tell me when it drops below</Label>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  value={form.lowStockThreshold}
                  onChange={(e) =>
                    dispatch({ type: 'SET', field: 'lowStockThreshold', value: e.target.value })
                  }
                  className="input-underline h-12 w-full rounded-xl border border-white/[0.14] bg-white/[0.06] px-3 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white/30 hover:border-white/[0.24] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation w-28"
                  min={0}
                  step={step}
                />
                <span className="text-[13px] text-white">
                  {INVENTORY_UNITS.find((u) => u.id === form.unit)?.pluralLabel ?? form.unit}
                </span>
                {form.lowStockThreshold !== '' && (
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: 'SET', field: 'lowStockThreshold', value: '' })
                    }
                    className="ml-auto h-11 px-2 text-[12.5px] font-medium text-white touch-manipulation"
                  >
                    No alert
                  </button>
                )}
              </div>
            </div>

            {/* Location pills */}
            <div className="space-y-2 rounded-2xl border border-white/[0.12] bg-white/[0.04] p-4 lg:col-span-2">
              <Label className="text-[12px] font-medium text-white mb-1 block">Location</Label>
              <div className="flex flex-wrap gap-2">
                {INVENTORY_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => dispatch({ type: 'SET', field: 'location', value: loc.id })}
                    className={cn(
                      'flex min-h-[44px] items-center rounded-xl border px-4 text-[13px] transition-colors touch-manipulation',
                      form.location === loc.id
                        ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                        : 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:border-white/[0.25]'
                    )}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
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
                  <Label className="text-[12px] font-medium text-white mb-1 block">Unit Cost (£)</Label>
                  <Input
                    type="number"
                    value={form.unitCost}
                    onChange={(e) =>
                      dispatch({ type: 'SET', field: 'unitCost', value: e.target.value })
                    }
                    placeholder="Cost per unit"
                    className="input-underline h-12 w-full rounded-xl border border-white/[0.14] bg-white/[0.06] px-3 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white/30 hover:border-white/[0.24] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation"
                    min={0}
                    step={0.01}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[12px] font-medium text-white mb-1 block">Supplier</Label>
                  <Input
                    value={form.supplier}
                    onChange={(e) =>
                      dispatch({ type: 'SET', field: 'supplier', value: e.target.value })
                    }
                    list="supplier-suggestions"
                    placeholder="e.g. CEF, Edmundson, Screwfix"
                    className="input-underline h-12 w-full rounded-xl border border-white/[0.14] bg-white/[0.06] px-3 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white/30 hover:border-white/[0.24] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation"
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
                  <Label className="text-[12px] font-medium text-white mb-1 block">Notes</Label>
                  <Textarea
                    value={form.notes}
                    onChange={(e) =>
                      dispatch({ type: 'SET', field: 'notes', value: e.target.value })
                    }
                    placeholder="Any extra details..."
                    className="min-h-[96px] w-full resize-none rounded-xl border border-white/[0.14] bg-white/[0.06] px-3 py-2.5 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white/30 hover:border-white/[0.24] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Save button */}
          <div className="mx-auto w-full max-w-5xl border-t border-white/[0.08] p-4">
            <Button
              onClick={handleSave}
              disabled={saving || !form.name.trim()}
              className="h-12 w-full rounded-xl bg-elec-yellow text-base font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation disabled:bg-white/[0.08] disabled:text-white/40 disabled:hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-100"
            >
              {saving ? 'Adding...' : duplicate ? 'Add to Existing' : 'Add Item'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

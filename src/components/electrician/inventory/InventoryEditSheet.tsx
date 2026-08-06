import { useReducer, useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  useInventoryMovements,
  describeMovementReason,
} from '@/hooks/useInventoryMovements';
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
import { Minus, Plus, Trash2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  InventoryItem,
  InventoryCategory,
  InventoryLocation,
  InventoryUnit,
  INVENTORY_CATEGORIES,
  INVENTORY_LOCATIONS,
  INVENTORY_UNITS,
  UNIT_STEP,
  UpdateInventoryInput,
} from '@/types/inventory';

// Form state reducer — single state update per interaction
interface FormState {
  name: string;
  category: InventoryCategory;
  quantity: number;
  unit: InventoryUnit;
  location: InventoryLocation;
  lowStockThreshold: string;
  unitCost: string;
  supplier: string;
  notes: string;
}

type FormAction =
  | { type: 'SET'; field: keyof FormState; value: string | number }
  | { type: 'RESET'; payload: FormState };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return action.payload;
    default:
      return state;
  }
}

const INITIAL_STATE: FormState = {
  name: '',
  category: 'cable',
  quantity: 0,
  unit: 'each',
  location: 'van',
  lowStockThreshold: '',
  unitCost: '',
  supplier: '',
  notes: '',
};

interface InventoryEditSheetProps {
  item: InventoryItem | null;
  onOpenChange: (open: boolean) => void;
  onSave: (input: UpdateInventoryInput) => Promise<boolean>;
  onDelete: (id: string) => void;
  onAdjust: (id: string, delta: number) => void;
  onMove?: (id: string, location: InventoryLocation) => Promise<boolean>;
}

export function InventoryEditSheet({
  item,
  onOpenChange,
  onSave,
  onDelete,
  onAdjust,
  onMove,
}: InventoryEditSheetProps) {
  const [form, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const [saving, setSaving] = useState(false);
  const [moving, setMoving] = useState(false);
  const { movements, loading: movementsLoading } = useInventoryMovements(item?.id);

  // Sync form when item changes
  useEffect(() => {
    if (!item) return;
    dispatch({
      type: 'RESET',
      payload: {
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        unit: item.unit,
        location: item.location,
        lowStockThreshold: item.low_stock_threshold != null ? String(item.low_stock_threshold) : '',
        unitCost: item.unit_cost != null ? String(item.unit_cost) : '',
        supplier: item.supplier || '',
        notes: item.notes || '',
      },
    });
  }, [item]);

  const step = UNIT_STEP[form.unit] || 1;

  const handleSave = async () => {
    if (!item || !form.name.trim()) return;

    setSaving(true);
    const result = await onSave({
      id: item.id,
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
      onOpenChange(false);
    }
  };

  const handleMove = async (loc: InventoryLocation) => {
    dispatch({ type: 'SET', field: 'location', value: loc });
    if (onMove && item && loc !== item.location) {
      setMoving(true);
      await onMove(item.id, loc);
      setMoving(false);
    }
  };

  if (!item) return null;

  return (
    <Sheet open={!!item} onOpenChange={onOpenChange}>
      <SheetContent side="bottom"
          className="h-[88vh] overflow-hidden rounded-t-2xl border-t border-white/[0.14] bg-[#141419] p-0 focus:outline-none focus-visible:outline-none">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="mx-auto w-full max-w-5xl border-b border-white/[0.08] px-4 pb-4 pt-6">
            <h2 className="text-lg font-semibold text-white">Edit Item</h2>
            <p className="text-[12px] text-white mt-0.5">Update quantity, location or details</p>
          </div>

          {/* Form */}
          <div
            className={cn(
              'mx-auto w-full max-w-5xl flex-1 overflow-y-auto px-4 py-5 transition-opacity',
              saving && 'pointer-events-none opacity-60'
            )}
          >
            {/* Quantity adjuster — hero section */}
            <div className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] p-5">
              <p className="text-[11px] text-white text-center uppercase tracking-wider mb-3">
                Quantity
              </p>
              <div className="flex items-center justify-center gap-6">
                <button
                  type="button"
                  className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center touch-manipulation active:bg-white/[0.12] active:scale-95 transition-all"
                  onClick={() => {
                    const newQty = Math.max(0, Math.round((form.quantity - step) * 100) / 100);
                    dispatch({ type: 'SET', field: 'quantity', value: newQty });
                    onAdjust(item.id, -step);
                  }}
                >
                  <Minus className="h-6 w-6 text-white" />
                </button>
                <div className="text-center min-w-[90px]">
                  <p className="text-[36px] font-bold text-white leading-none">{form.quantity}</p>
                  <p className="text-[13px] text-white mt-1">
                    {form.unit !== 'each' ? form.unit : 'items'}
                  </p>
                </div>
                <button
                  type="button"
                  className="w-14 h-14 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center touch-manipulation active:bg-elec-yellow/20 active:scale-95 transition-all"
                  onClick={() => {
                    const newQty = Math.round((form.quantity + step) * 100) / 100;
                    dispatch({ type: 'SET', field: 'quantity', value: newQty });
                    onAdjust(item.id, step);
                  }}
                >
                  <Plus className="h-6 w-6 text-elec-yellow" />
                </button>
              </div>
              {item.last_used_date && (
                <p className="text-[11px] text-white text-center mt-3">
                  Last used{' '}
                  {new Date(item.last_used_date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </p>
              )}
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label className="text-[12px] font-medium text-white mb-1 block">Item Name</Label>
              <Input
                value={form.name}
                onChange={(e) => dispatch({ type: 'SET', field: 'name', value: e.target.value })}
                className="input-underline h-12 w-full rounded-xl border border-white/[0.14] bg-white/[0.06] px-3 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white/30 hover:border-white/[0.24] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation"
              />
            </div>

            {/* Category pills */}
            <div className="space-y-2">
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

            {/* Unit */}
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

            {/* Location — with instant move */}
            <div className="space-y-2">
              <Label className="text-[12px] font-medium text-white mb-1 block">
                Location{' '}
                {moving && <Loader2 className="inline h-3 w-3 animate-spin text-teal-400 ml-1" />}
                {!moving && form.location !== item.location && (
                  <span className="text-teal-400 text-[11px] ml-1">moved</span>
                )}
              </Label>
              <div className="flex flex-wrap gap-2">
                {INVENTORY_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => handleMove(loc.id)}
                    disabled={moving}
                    className={cn(
                      'flex min-h-[44px] items-center rounded-xl border px-4 text-[13px] transition-colors touch-manipulation',
                      form.location === loc.id
                        ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                        : 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:border-white/[0.25]',
                      moving && 'opacity-50'
                    )}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Low stock / cost / supplier / notes */}
            <div className="grid gap-4 lg:grid-cols-2 lg:items-start [&>div]:rounded-2xl [&>div]:border [&>div]:border-white/[0.12] [&>div]:bg-white/[0.04] [&>div]:p-4">
              <div className="space-y-2">
                <Label className="text-[12px] font-medium text-white mb-1 block">
                  Tell me when it drops below
                </Label>
                <Input
                  type="number"
                  value={form.lowStockThreshold}
                  onChange={(e) =>
                    dispatch({ type: 'SET', field: 'lowStockThreshold', value: e.target.value })
                  }
                  placeholder="No alert"
                  className="input-underline h-12 w-full rounded-xl border border-white/[0.14] bg-white/[0.06] px-3 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white/30 hover:border-white/[0.24] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation"
                  min={0}
                  step={step}
                />
              </div>
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
                  list="supplier-suggestions-edit"
                  placeholder="e.g. CEF, Edmundson, Screwfix"
                  className="input-underline h-12 w-full rounded-xl border border-white/[0.14] bg-white/[0.06] px-3 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white/30 hover:border-white/[0.24] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation"
                />
                <datalist id="supplier-suggestions-edit">
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
                  onChange={(e) => dispatch({ type: 'SET', field: 'notes', value: e.target.value })}
                  placeholder="Any extra details..."
                  className="min-h-[96px] w-full resize-none rounded-xl border border-white/[0.14] bg-white/[0.06] px-3 py-2.5 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white/30 hover:border-white/[0.24] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                />
              </div>
            </div>

            {/* Stock history. The ledger has been written on every invoice that
                carries stock-linked items since ELE-1014 and shown nowhere, so
                "why has my socket count dropped?" had no answer in the app. */}
            <div className="border-t border-white/[0.08] pt-4">
              <p className="mb-2 text-[13px] font-semibold tracking-tight text-white">
                Stock history
              </p>
              {movementsLoading ? (
                <p className="text-[12.5px] text-white">Loading…</p>
              ) : movements.length === 0 ? (
                <p className="text-[12.5px] text-white">
                  Nothing recorded yet. Movements appear here when this item is used on an invoice.
                </p>
              ) : (
                <ul className="space-y-1.5">
                  {movements.map((m) => (
                    <li
                      key={m.id}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5"
                    >
                      <span
                        className={cn(
                          'text-[14px] font-bold tabular-nums',
                          m.direction === 'in' ? 'text-emerald-400' : 'text-amber-400'
                        )}
                      >
                        {m.direction === 'in' ? '+' : '−'}
                        {m.quantity}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[12.5px] text-white">
                        {describeMovementReason(m.reason, m.direction)}
                        {m.note ? ` · ${m.note}` : ''}
                      </span>
                      <span className="flex-shrink-0 text-[11.5px] text-white">
                        {new Date(m.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Sticky footer — save + delete always visible */}
          <div className="mx-auto w-full max-w-5xl space-y-2 border-t border-white/[0.08] p-4">
            <Button
              onClick={handleSave}
              disabled={saving || !form.name.trim()}
              className="h-12 w-full rounded-xl bg-elec-yellow text-base font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation disabled:bg-white/[0.08] disabled:text-white/40 disabled:hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-100"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 h-11 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-[13px] font-medium touch-manipulation active:bg-red-500/15 transition-colors disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete Item
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

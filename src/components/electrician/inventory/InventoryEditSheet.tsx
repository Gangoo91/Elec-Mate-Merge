import { useState, useEffect } from 'react';
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
import { Minus, Plus, Trash2 } from 'lucide-react';
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
  formatQuantity,
} from '@/types/inventory';

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
  const [name, setName] = useState('');
  const [category, setCategory] = useState<InventoryCategory>('cable');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState<InventoryUnit>('each');
  const [location, setLocation] = useState<InventoryLocation>('van');
  const [lowStockThreshold, setLowStockThreshold] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [supplier, setSupplier] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  // Sync form when item changes
  useEffect(() => {
    if (!item) return;
    setName(item.name);
    setCategory(item.category);
    setQuantity(item.quantity);
    setUnit(item.unit);
    setLocation(item.location);
    setLowStockThreshold(item.low_stock_threshold != null ? String(item.low_stock_threshold) : '');
    setUnitCost(item.unit_cost != null ? String(item.unit_cost) : '');
    setSupplier(item.supplier || '');
    setNotes(item.notes || '');
  }, [item]);

  const step = UNIT_STEP[unit] || 1;

  const handleSave = async () => {
    if (!item || !name.trim()) return;

    setSaving(true);
    const result = await onSave({
      id: item.id,
      name: name.trim(),
      category,
      quantity,
      unit,
      location,
      low_stock_threshold: lowStockThreshold ? parseFloat(lowStockThreshold) : null,
      unit_cost: unitCost ? parseFloat(unitCost) : null,
      supplier: supplier.trim() || null,
      notes: notes.trim() || null,
    });
    setSaving(false);

    if (result) {
      onOpenChange(false);
    }
  };

  if (!item) return null;

  return (
    <Sheet open={!!item} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <div className="px-4 pt-6 pb-3 border-b border-white/[0.06]">
            <h2 className="text-lg font-semibold text-white">Edit Item</h2>
            <p className="text-[12px] text-white mt-0.5">Update quantity, location or details</p>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
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
                    const newQty = Math.max(0, Math.round((quantity - step) * 100) / 100);
                    setQuantity(newQty);
                    onAdjust(item.id, -step);
                  }}
                >
                  <Minus className="h-6 w-6 text-white" />
                </button>
                <div className="text-center min-w-[90px]">
                  <p className="text-[36px] font-bold text-white leading-none">{quantity}</p>
                  <p className="text-[13px] text-white mt-1">
                    {unit !== 'each' ? unit : 'items'}
                  </p>
                </div>
                <button
                  type="button"
                  className="w-14 h-14 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center touch-manipulation active:bg-elec-yellow/20 active:scale-95 transition-all"
                  onClick={() => {
                    const newQty = Math.round((quantity + step) * 100) / 100;
                    setQuantity(newQty);
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
              <Label className="text-sm font-medium text-white">Item Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>

            {/* Category pills */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Category</Label>
              <div className="flex flex-wrap gap-2">
                {INVENTORY_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-[13px] font-medium touch-manipulation transition-all',
                      category === cat.id
                        ? cat.pillActiveClass
                        : 'bg-white/[0.04] text-white border border-white/[0.06]'
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Unit */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Unit</Label>
              <Select value={unit} onValueChange={(v) => setUnit(v as InventoryUnit)}>
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

            {/* Location — with instant move */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">
                Location{' '}
                {location !== item.location && (
                  <span className="text-teal-400 text-[11px] ml-1">changed</span>
                )}
              </Label>
              <div className="flex flex-wrap gap-2">
                {INVENTORY_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => {
                      setLocation(loc.id);
                      if (onMove && item && loc.id !== item.location) {
                        onMove(item.id, loc.id);
                      }
                    }}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-[13px] font-medium touch-manipulation transition-all',
                      location === loc.id
                        ? 'bg-teal-500/20 text-white border border-teal-500/40'
                        : 'bg-white/[0.04] text-white border border-white/[0.06]'
                    )}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Low stock / cost / supplier / notes */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white">Low Stock Alert</Label>
                <Input
                  type="number"
                  value={lowStockThreshold}
                  onChange={(e) => setLowStockThreshold(e.target.value)}
                  placeholder="Alert when below..."
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
                  min={0}
                  step={step}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white">Unit Cost (£)</Label>
                <Input
                  type="number"
                  value={unitCost}
                  onChange={(e) => setUnitCost(e.target.value)}
                  placeholder="Cost per unit"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
                  min={0}
                  step={0.01}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-white">Supplier</Label>
                <Input
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  list="supplier-suggestions-edit"
                  placeholder="e.g. CEF, Edmundson, Screwfix"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
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
                <Label className="text-sm font-medium text-white">Notes</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any extra details..."
                  className="touch-manipulation text-base min-h-[80px] border-white/30 focus:border-yellow-500"
                />
              </div>
            </div>

            {/* Delete */}
            <div className="pt-2 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-[14px] font-medium touch-manipulation active:bg-red-500/15 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Delete Item
              </button>
            </div>
          </div>

          {/* Save button */}
          <div className="p-4 border-t border-white/[0.06]">
            <Button
              onClick={handleSave}
              disabled={saving || !name.trim()}
              className="w-full h-12 text-base font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black rounded-xl touch-manipulation"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

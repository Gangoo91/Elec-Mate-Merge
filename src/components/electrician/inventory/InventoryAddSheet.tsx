import { useState } from 'react';
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
import { ChevronDown, Minus, Plus, X } from 'lucide-react';
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

interface InventoryAddSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (input: CreateInventoryInput) => Promise<unknown>;
}

export function InventoryAddSheet({ open, onOpenChange, onSave }: InventoryAddSheetProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<InventoryCategory>('cable');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState<InventoryUnit>('each');
  const [location, setLocation] = useState<InventoryLocation>('van');
  const [lowStockThreshold, setLowStockThreshold] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [supplier, setSupplier] = useState('');
  const [notes, setNotes] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [saving, setSaving] = useState(false);

  const step = UNIT_STEP[unit] || 1;

  const reset = () => {
    setName('');
    setCategory('cable');
    setQuantity(1);
    setUnit('each');
    setLocation('van');
    setLowStockThreshold('');
    setUnitCost('');
    setSupplier('');
    setNotes('');
    setShowMore(false);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast({ title: 'Enter an item name', variant: 'destructive' });
      return;
    }

    setSaving(true);
    const result = await onSave({
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
      toast({ title: 'Item added', description: name });
      reset();
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <h2 className="text-lg font-semibold text-white">Add Item</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Item Name *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. 6mm T&E Twin & Earth"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                autoFocus
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
                        ? `bg-${cat.colour}/20 text-white border border-${cat.colour}/40`
                        : 'bg-white/[0.04] text-white/60 border border-white/[0.06]'
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
                    className="h-11 w-11 rounded-xl bg-white/[0.06] text-white touch-manipulation"
                    onClick={() =>
                      setQuantity(Math.max(0, Math.round((quantity - step) * 100) / 100))
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                    className="h-11 text-center text-base font-bold touch-manipulation border-white/30 focus:border-yellow-500"
                    min={0}
                    step={step}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11 rounded-xl bg-white/[0.06] text-white touch-manipulation"
                    onClick={() => setQuantity(Math.round((quantity + step) * 100) / 100)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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
            </div>

            {/* Location pills */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">Location</Label>
              <div className="flex flex-wrap gap-2">
                {INVENTORY_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setLocation(loc.id)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-[13px] font-medium touch-manipulation transition-all',
                      location === loc.id
                        ? 'bg-teal-500/20 text-white border border-teal-500/40'
                        : 'bg-white/[0.04] text-white/60 border border-white/[0.06]'
                    )}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* More details (collapsible) */}
            <Collapsible open={showMore} onOpenChange={setShowMore}>
              <CollapsibleTrigger className="flex items-center gap-2 text-[13px] text-white/60 font-medium touch-manipulation py-1">
                <ChevronDown
                  className={cn('h-4 w-4 transition-transform', showMore && 'rotate-180')}
                />
                More details
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 pt-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white">Low Stock Alert</Label>
                  <Input
                    type="number"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(e.target.value)}
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
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
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
              disabled={saving || !name.trim()}
              className="w-full h-12 text-base font-semibold bg-elec-yellow hover:bg-elec-yellow/90 text-black rounded-xl touch-manipulation"
            >
              {saving ? 'Adding...' : 'Add Item'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

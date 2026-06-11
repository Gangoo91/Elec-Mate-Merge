import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { ACCESSORY_CATEGORIES, type AccessoryType } from '@/data/siteVisit/accessoryTypes';

interface ItemTypePickerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accessories: AccessoryType[];
  selectedId?: string;
  onSelect: (accessory: AccessoryType) => void;
}

/**
 * Full-height bottom sheet item picker (replaces the inline 54-option
 * dropdown — audit ELE-1068). Type-to-filter plus category groups; every row
 * is a 48px touch target for gloved hands.
 */
export const ItemTypePickerSheet = ({
  open,
  onOpenChange,
  accessories,
  selectedId,
  onSelect,
}: ItemTypePickerSheetProps) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return accessories;
    return accessories.filter(
      (a) => a.label.toLowerCase().includes(q) || a.id.replace(/_/g, ' ').includes(q)
    );
  }, [accessories, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, AccessoryType[]>();
    for (const a of filtered) {
      const list = map.get(a.category) ?? [];
      list.push(a);
      map.set(a.category, list);
    }
    return map;
  }, [filtered]);

  const handleSelect = (accessory: AccessoryType) => {
    onSelect(accessory);
    setQuery('');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
        <div className="flex h-full flex-col bg-background">
          {/* Grab handle */}
          <div className="flex justify-center pt-2.5">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <SheetHeader className="px-4 pb-2 pt-3 text-left">
            <SheetTitle className="text-[16px] font-semibold text-white">Add item</SheetTitle>
          </SheetHeader>

          {/* Search — 16px font so iOS never zooms */}
          <div className="relative px-4 pb-3">
            <Search className="pointer-events-none absolute left-7 top-1/2 h-4 w-4 -translate-y-[60%] text-white/40" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search — try “led” or “socket”"
              className="h-11 touch-manipulation rounded-xl border-white/[0.1] bg-white/[0.05] pl-9 text-base text-white placeholder:text-white/40 focus:border-elec-yellow focus:ring-elec-yellow/20"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              enterKeyHint="search"
            />
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {filtered.length === 0 && (
              <p className="py-8 text-center text-sm text-white/55">
                Nothing matching “{query}” — try “custom item” for one-offs
              </p>
            )}
            {ACCESSORY_CATEGORIES.map((cat) => {
              const catItems = grouped.get(cat.id);
              if (!catItems || catItems.length === 0) return null;
              return (
                <div key={cat.id} className="mb-2">
                  <div className="sticky top-0 z-10 bg-background py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
                    {cat.label}
                  </div>
                  <div className="overflow-hidden rounded-xl border border-white/[0.06]">
                    {catItems.map((a, i) => (
                      <button
                        key={a.id}
                        onClick={() => handleSelect(a)}
                        className={`flex min-h-[48px] w-full items-center justify-between gap-3 px-3.5 text-left text-[14px] touch-manipulation active:bg-white/[0.08] ${
                          i > 0 ? 'border-t border-white/[0.05]' : ''
                        } ${
                          a.id === selectedId
                            ? 'bg-elec-yellow/[0.1] font-medium text-elec-yellow'
                            : 'bg-white/[0.02] text-white'
                        }`}
                      >
                        <span>{a.label}</span>
                        <span className="text-[11px] text-white/40">{a.defaultUnit}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

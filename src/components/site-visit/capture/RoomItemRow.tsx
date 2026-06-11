import React, { useState } from 'react';
import { Minus, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ItemTypePickerSheet } from './ItemTypePickerSheet';
import { getAccessoriesForRoom, type AccessoryType } from '@/data/siteVisit/accessoryTypes';
import type { SiteVisitItem, RoomType } from '@/types/siteVisit';

interface RoomItemRowProps {
  item: SiteVisitItem;
  roomType: RoomType;
  onUpdate: (updates: Partial<SiteVisitItem>) => void;
  onRemove: () => void;
}

export const RoomItemRow = ({ item, roomType, onUpdate, onRemove }: RoomItemRowProps) => {
  const [showNotes, setShowNotes] = useState(!!item.notes);
  const [pickerOpen, setPickerOpen] = useState(false);

  const accessories = getAccessoriesForRoom(roomType);
  const selected = accessories.find((a) => a.id === item.itemType);

  const handleTypeSelect = (accessory: AccessoryType) => {
    onUpdate({
      itemType: accessory.id,
      itemDescription: accessory.id === 'custom_item' ? '' : accessory.label,
      unit: accessory.defaultUnit,
    });
  };

  const isCustomItem = item.itemType === 'custom_item';

  return (
    <div className="space-y-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
      <div className="flex gap-2 items-start">
        {/* Item type — opens a searchable bottom sheet (was a 54-option dropdown) */}
        <div className="flex-1 min-w-0">
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className={`flex h-11 w-full items-center justify-between gap-2 rounded-xl border px-3.5 text-left text-sm touch-manipulation active:scale-[0.99] ${
              selected
                ? 'border-white/[0.1] bg-white/[0.05] text-white'
                : 'border-dashed border-white/20 bg-transparent text-white/50'
            }`}
          >
            <span className="truncate">{selected ? selected.label : 'Choose item…'}</span>
            <ChevronDown className="h-4 w-4 flex-shrink-0 text-white/40" />
          </button>
          <ItemTypePickerSheet
            open={pickerOpen}
            onOpenChange={setPickerOpen}
            accessories={accessories}
            selectedId={item.itemType || undefined}
            onSelect={handleTypeSelect}
          />
        </div>

        {/* Quantity stepper */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onUpdate({ quantity: Math.max(1, item.quantity - 1) })}
            className="h-11 w-11 touch-manipulation border-white/20 text-white"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={item.quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1;
              onUpdate({ quantity: Math.max(1, val) });
            }}
            className="h-11 w-14 text-center text-base text-white touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            enterKeyHint="done"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => onUpdate({ quantity: item.quantity + 1 })}
            className="h-11 w-11 touch-manipulation border-white/20 text-white"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Delete */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-11 w-11 touch-manipulation text-white hover:text-red-400 hover:bg-red-500/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Custom item description */}
      {isCustomItem && (
        <Input
          value={item.itemDescription || ''}
          onChange={(e) => onUpdate({ itemDescription: e.target.value })}
          placeholder="What is it? e.g. Dado trunking adaptor"
          className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
          autoCapitalize="sentences"
          autoComplete="off"
          enterKeyHint="done"
          autoFocus
        />
      )}

      {/* Expandable notes — proper tappable affordance (was 12px text) */}
      <button
        onClick={() => setShowNotes(!showNotes)}
        className="flex h-9 items-center gap-1.5 rounded-lg px-2 -ml-2 text-[13px] font-medium text-white/70 touch-manipulation active:bg-white/[0.06]"
      >
        {showNotes ? (
          <ChevronUp className="h-3.5 w-3.5" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )}
        Notes
      </button>
      {showNotes && (
        <Textarea
          value={item.notes || ''}
          onChange={(e) => onUpdate({ notes: e.target.value })}
          placeholder="Additional notes for this item..."
          className="touch-manipulation text-base min-h-[60px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
          autoCapitalize="sentences"
          spellCheck
          enterKeyHint="done"
        />
      )}
    </div>
  );
};

import { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { inputCn, textareaCn } from '@/components/forms/fieldStyles';
import { ItemTypePickerSheet } from './ItemTypePickerSheet';
import { getAccessoriesForRoom, type AccessoryType } from '@/data/siteVisit/accessoryTypes';
import type { SiteVisitItem, RoomType } from '@/types/siteVisit';

interface RoomItemRowProps {
  item: SiteVisitItem;
  roomType: RoomType;
  onUpdate: (updates: Partial<SiteVisitItem>) => void;
  onRemove: () => void;
}

/**
 * One line of the take-off: what it is, how many, and any note.
 *
 * The three controls used to share a single row — item picker, a 148px
 * quantity stepper and a delete button. On a 375px phone that left the item
 * name about 110px, so "13A twin switched socket" truncated to "13A twin…" on
 * the one control whose whole job is telling you what the line is. The name
 * now owns the top row and the stepper sits underneath it.
 */
export const RoomItemRow = ({ item, roomType, onUpdate, onRemove }: RoomItemRowProps) => {
  const [showNotes, setShowNotes] = useState(!!item.notes);
  const [pickerOpen, setPickerOpen] = useState(false);

  const accessories = getAccessoriesForRoom(roomType);
  const selected = accessories.find((a) => a.id === item.itemType);
  const isCustomItem = item.itemType === 'custom_item';

  const handleTypeSelect = (accessory: AccessoryType) => {
    onUpdate({
      itemType: accessory.id,
      itemDescription: accessory.id === 'custom_item' ? '' : accessory.label,
      unit: accessory.defaultUnit,
    });
  };

  const stepperButtonCn =
    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] text-white transition-colors hover:bg-white/[0.10] touch-manipulation active:scale-[0.97]';

  return (
    <div className="space-y-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
      {/* The name gets the full width. */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className={cn(
            'flex h-11 min-w-0 flex-1 items-center rounded-xl border px-3.5 text-left text-sm touch-manipulation active:scale-[0.99]',
            selected
              ? 'border-white/[0.12] bg-white/[0.06] text-white'
              : 'border-dashed border-white/25 bg-transparent text-white'
          )}
        >
          <span className="truncate">{selected ? selected.label : 'Choose item…'}</span>
        </button>

        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove item"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors hover:bg-red-500/10 hover:text-red-300 touch-manipulation"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <ItemTypePickerSheet
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        accessories={accessories}
        selectedId={item.itemType || undefined}
        onSelect={handleTypeSelect}
      />

      {isCustomItem && (
        <Input
          value={item.itemDescription || ''}
          onChange={(e) => onUpdate({ itemDescription: e.target.value })}
          placeholder="What is it? e.g. dado trunking adaptor"
          className={inputCn}
          autoCapitalize="sentences"
          autoComplete="off"
          enterKeyHint="done"
          autoFocus
        />
      )}

      {/* Quantity and notes share the second row — both are secondary to what
          the item actually is. */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onUpdate({ quantity: Math.max(1, item.quantity - 1) })}
            aria-label="One fewer"
            className={stepperButtonCn}
          >
            <Minus className="h-4 w-4" />
          </button>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={item.quantity}
            onChange={(e) => onUpdate({ quantity: Math.max(1, parseInt(e.target.value) || 1) })}
            aria-label="Quantity"
            className="h-11 w-14 shrink-0 rounded-xl border border-white/[0.12] bg-white/[0.06] text-center text-base font-semibold text-white tabular-nums caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            enterKeyHint="done"
          />
          <button
            type="button"
            onClick={() => onUpdate({ quantity: item.quantity + 1 })}
            aria-label="One more"
            className={stepperButtonCn}
          >
            <Plus className="h-4 w-4" />
          </button>
          {item.unit && (
            <span className="ml-1 shrink-0 text-[12px] text-white">{item.unit}</span>
          )}
        </div>

        <div className="flex-1" />

        {/* Was h-9 — under the 44px minimum on a control used with gloves on. */}
        <button
          type="button"
          onClick={() => setShowNotes(!showNotes)}
          className={cn(
            'h-11 shrink-0 rounded-xl px-3 text-[13px] font-semibold touch-manipulation',
            showNotes || item.notes ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {item.notes ? 'Note added' : showNotes ? 'Hide note' : 'Add note'}
        </button>
      </div>

      {showNotes && (
        <Textarea
          value={item.notes || ''}
          onChange={(e) => onUpdate({ notes: e.target.value })}
          placeholder="Anything worth remembering about this one"
          className={cn(textareaCn, 'min-h-[60px]')}
          autoCapitalize="sentences"
          spellCheck
          enterKeyHint="done"
        />
      )}
    </div>
  );
};

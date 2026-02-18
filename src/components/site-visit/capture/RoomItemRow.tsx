import React, { useState } from 'react';
import { Minus, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  getAccessoriesForRoom,
  getAccessoriesByCategory,
  ACCESSORY_CATEGORIES,
} from '@/data/siteVisit/accessoryTypes';
import type { SiteVisitItem, RoomType } from '@/types/siteVisit';

interface RoomItemRowProps {
  item: SiteVisitItem;
  roomType: RoomType;
  onUpdate: (updates: Partial<SiteVisitItem>) => void;
  onRemove: () => void;
}

export const RoomItemRow = ({ item, roomType, onUpdate, onRemove }: RoomItemRowProps) => {
  const [showNotes, setShowNotes] = useState(!!item.notes);

  const accessories = getAccessoriesForRoom(roomType);
  const grouped = getAccessoriesByCategory(accessories);

  const handleTypeChange = (accessoryId: string) => {
    const accessory = accessories.find((a) => a.id === accessoryId);
    if (accessory) {
      onUpdate({
        itemType: accessory.id,
        itemDescription: accessory.label,
        unit: accessory.defaultUnit,
      });
    }
  };

  return (
    <div className="space-y-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
      <div className="flex gap-2 items-start">
        {/* Accessory select */}
        <div className="flex-1 min-w-0">
          <Select value={item.itemType} onValueChange={handleTypeChange}>
            <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2 text-sm">
              <SelectValue placeholder="Select item..." />
            </SelectTrigger>
            <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground max-h-[40vh]">
              {ACCESSORY_CATEGORIES.map((cat) => {
                const catItems = grouped[cat.id];
                if (!catItems || catItems.length === 0) return null;
                return (
                  <SelectGroup key={cat.id}>
                    <SelectLabel className="text-xs text-white/50 font-semibold px-2">
                      {cat.label}
                    </SelectLabel>
                    {catItems.map((a) => (
                      <SelectItem key={a.id} value={a.id} className="touch-manipulation">
                        {a.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                );
              })}
            </SelectContent>
          </Select>
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
            type="number"
            value={item.quantity}
            onChange={(e) => onUpdate({ quantity: Math.max(1, parseInt(e.target.value) || 1) })}
            className="h-11 w-14 text-center text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            min={1}
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
          className="h-11 w-11 touch-manipulation text-white/50 hover:text-red-400 hover:bg-red-500/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Expandable notes */}
      <button
        onClick={() => setShowNotes(!showNotes)}
        className="flex items-center gap-1 text-xs text-white/70 touch-manipulation"
      >
        {showNotes ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        Notes
      </button>
      {showNotes && (
        <Textarea
          value={item.notes || ''}
          onChange={(e) => onUpdate({ notes: e.target.value })}
          placeholder="Additional notes for this item..."
          className="touch-manipulation text-base min-h-[60px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
        />
      )}
    </div>
  );
};

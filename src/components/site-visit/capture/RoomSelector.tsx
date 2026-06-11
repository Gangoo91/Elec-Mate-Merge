import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { getRoomTypesForProperty } from '@/data/siteVisit/roomTypes';
import type { RoomType, PropertyType, SiteVisitRoom } from '@/types/siteVisit';

interface RoomSelectorProps {
  existingRooms: SiteVisitRoom[];
  onAddRoom: (roomType: RoomType, roomName: string) => void;
  propertyType?: PropertyType;
}

/**
 * Tap-to-add room chips (was a dropdown + Add button — three interactions
 * where one will do). Rooms already added disappear from the grid; "Custom"
 * opens an inline name field.
 */
export const RoomSelector = ({ existingRooms, onAddRoom, propertyType }: RoomSelectorProps) => {
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState('');

  const usedTypes = new Set(existingRooms.map((r) => r.roomType));
  const usedNames = new Set(existingRooms.map((r) => r.roomName.trim().toLowerCase()));
  const roomTypes = getRoomTypesForProperty(propertyType);

  const availableTypes = roomTypes.filter((rt) => rt.type !== 'custom' && !usedTypes.has(rt.type));

  const handleAddCustom = () => {
    const name = customName.trim();
    if (!name) return;
    // No duplicate custom names — they make the scope and quote ambiguous
    if (usedNames.has(name.toLowerCase())) {
      setCustomName('');
      return;
    }
    onAddRoom('custom', name);
    setCustomName('');
    setShowCustom(false);
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-white">Add room — tap to add</label>
      <div className="flex flex-wrap gap-2">
        {availableTypes.map((rt) => (
          <button
            key={rt.type}
            type="button"
            onClick={() => onAddRoom(rt.type, rt.label)}
            className="flex h-11 items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 text-[13px] font-medium text-white transition-colors touch-manipulation hover:border-elec-yellow/40 hover:text-elec-yellow active:scale-[0.97] active:bg-elec-yellow/[0.1]"
          >
            <Plus className="h-3.5 w-3.5 text-elec-yellow/70" />
            {rt.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setShowCustom((s) => !s)}
          className={cn(
            'flex h-11 items-center gap-1.5 rounded-full border border-dashed px-4 text-[13px] font-medium transition-colors touch-manipulation active:scale-[0.97]',
            showCustom
              ? 'border-elec-yellow/60 bg-elec-yellow/[0.1] text-elec-yellow'
              : 'border-white/20 text-white/70 hover:border-elec-yellow/40 hover:text-elec-yellow'
          )}
        >
          <Plus className="h-3.5 w-3.5" />
          Custom…
        </button>
      </div>

      {showCustom && (
        <div className="flex gap-2">
          <Input
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddCustom();
            }}
            placeholder="e.g. Boot room, Plant room 2"
            className="h-11 flex-1 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
            autoCapitalize="words"
            autoComplete="off"
            enterKeyHint="done"
            autoFocus
          />
          <button
            type="button"
            onClick={handleAddCustom}
            disabled={!customName.trim()}
            className="h-11 rounded-xl bg-elec-yellow px-4 text-sm font-semibold text-black transition-transform touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.97] disabled:opacity-40"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

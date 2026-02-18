import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ROOM_TYPES } from '@/data/siteVisit/roomTypes';
import type { RoomType, SiteVisitRoom } from '@/types/siteVisit';

interface RoomSelectorProps {
  existingRooms: SiteVisitRoom[];
  onAddRoom: (roomType: RoomType, roomName: string) => void;
}

export const RoomSelector = ({ existingRooms, onAddRoom }: RoomSelectorProps) => {
  const [selectedType, setSelectedType] = useState<RoomType | ''>('');
  const [customName, setCustomName] = useState('');

  const usedTypes = new Set(existingRooms.map((r) => r.roomType));

  // Filter out already-added rooms (except custom, which can be added multiple times)
  const availableTypes = ROOM_TYPES.filter((rt) => rt.type === 'custom' || !usedTypes.has(rt.type));

  const handleAdd = () => {
    if (!selectedType) return;

    const roomDef = ROOM_TYPES.find((r) => r.type === selectedType);
    const name = selectedType === 'custom' ? customName.trim() : roomDef?.label || selectedType;

    if (selectedType === 'custom' && !customName.trim()) return;

    onAddRoom(selectedType, name);
    setSelectedType('');
    setCustomName('');
  };

  return (
    <div className="flex gap-2 items-end">
      <div className="flex-1 space-y-1">
        <label className="text-xs font-medium text-white">Add Room</label>
        <Select value={selectedType} onValueChange={(val) => setSelectedType(val as RoomType)}>
          <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
            <SelectValue placeholder="Select room type..." />
          </SelectTrigger>
          <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground">
            {availableTypes.map((rt) => (
              <SelectItem key={rt.type} value={rt.type} className="touch-manipulation">
                {rt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedType === 'custom' && (
        <div className="flex-1 space-y-1">
          <label className="text-xs font-medium text-white">Room Name</label>
          <Input
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="e.g. Boot Room"
            className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
          />
        </div>
      )}

      <Button
        onClick={handleAdd}
        disabled={!selectedType || (selectedType === 'custom' && !customName.trim())}
        className="h-11 px-4 touch-manipulation bg-emerald-600 hover:bg-emerald-700 text-white"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add
      </Button>
    </div>
  );
};

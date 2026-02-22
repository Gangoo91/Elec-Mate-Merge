import React, { useState } from 'react';
import { Plus, X, GripVertical, ChevronUp, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { SiteVisitRoom } from '@/types/siteVisit';

interface RoomListProps {
  rooms: SiteVisitRoom[];
  activeRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
  onRemoveRoom: (roomId: string) => void;
  onShowSelector: () => void;
  onReorderRooms?: (roomIds: string[]) => void;
}

export const RoomList = ({
  rooms,
  activeRoomId,
  onSelectRoom,
  onRemoveRoom,
  onShowSelector,
  onReorderRooms,
}: RoomListProps) => {
  const [reorderMode, setReorderMode] = useState(false);

  const handleMoveUp = (index: number) => {
    if (index === 0 || !onReorderRooms) return;
    const ids = rooms.map((r) => r.id);
    [ids[index - 1], ids[index]] = [ids[index], ids[index - 1]];
    onReorderRooms(ids);
  };

  const handleMoveDown = (index: number) => {
    if (index >= rooms.length - 1 || !onReorderRooms) return;
    const ids = rooms.map((r) => r.id);
    [ids[index], ids[index + 1]] = [ids[index + 1], ids[index]];
    onReorderRooms(ids);
  };

  if (reorderMode) {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-medium text-white">Reorder Rooms</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReorderMode(false)}
            className="h-8 px-2 text-xs text-emerald-400 touch-manipulation"
          >
            <Check className="h-3.5 w-3.5 mr-1" />
            Done
          </Button>
        </div>
        {rooms.map((room, index) => (
          <div
            key={room.id}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] min-h-[44px]"
          >
            <GripVertical className="h-4 w-4 text-white flex-shrink-0" />
            <span className="text-sm font-medium text-white flex-1">{room.roomName}</span>
            <button
              onClick={() => handleMoveUp(index)}
              disabled={index === 0}
              className="h-9 w-9 flex items-center justify-center rounded-lg touch-manipulation active:bg-white/10 disabled:opacity-30"
              aria-label="Move up"
            >
              <ChevronUp className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={() => handleMoveDown(index)}
              disabled={index >= rooms.length - 1}
              className="h-9 w-9 flex items-center justify-center rounded-lg touch-manipulation active:bg-white/10 disabled:opacity-30"
              aria-label="Move down"
            >
              <ChevronDown className="h-4 w-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {rooms.map((room) => (
        <button
          key={room.id}
          onClick={() => onSelectRoom(room.id)}
          className={cn(
            'relative flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border transition-all touch-manipulation min-h-[44px]',
            activeRoomId === room.id
              ? 'bg-elec-yellow/20 border-elec-yellow text-white'
              : 'bg-elec-gray border-white/10 text-white hover:border-white/20'
          )}
        >
          <span className="text-sm font-medium whitespace-nowrap">{room.roomName}</span>
          {room.items.length > 0 && (
            <Badge
              variant="secondary"
              className="h-5 min-w-[20px] px-1.5 text-[10px] font-bold bg-elec-yellow text-black"
            >
              {room.items.length}
            </Badge>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveRoom(room.id);
            }}
            className="ml-1 p-0.5 rounded-full hover:bg-red-500/20 transition-colors touch-manipulation"
          >
            <X className="h-3 w-3 text-white hover:text-red-400" />
          </button>
        </button>
      ))}

      {onReorderRooms && rooms.length > 1 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setReorderMode(true)}
          className="flex-shrink-0 h-11 px-3 touch-manipulation border-white/20 text-white hover:border-elec-yellow hover:text-elec-yellow"
        >
          <GripVertical className="h-4 w-4" />
        </Button>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={onShowSelector}
        className="flex-shrink-0 h-11 px-3 touch-manipulation border-dashed border-white/20 text-white hover:border-elec-yellow hover:text-elec-yellow"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

import React from 'react';
import { Plus, X } from 'lucide-react';
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
}

export const RoomList = ({
  rooms,
  activeRoomId,
  onSelectRoom,
  onRemoveRoom,
  onShowSelector,
}: RoomListProps) => {
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

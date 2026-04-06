import { Plus, X } from 'lucide-react';
import type { SavedRoom } from '@/hooks/useFloorPlanRooms';
import { cn } from '@/lib/utils';

interface SavedRoomsStripProps {
  rooms: SavedRoom[];
  activeRoomId: string | null;
  onRoomSelect: (roomId: string) => void;
  onNewRoom: () => void;
  onDeleteRoom: (roomId: string) => void;
}

export const SavedRoomsStrip = ({
  rooms,
  activeRoomId,
  onRoomSelect,
  onNewRoom,
  onDeleteRoom,
}: SavedRoomsStripProps) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide bg-black/40 border-b border-white/10 px-2 py-2">
      <div className="flex items-center gap-2 min-w-min">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => onRoomSelect(room.id)}
            className={cn(
              'relative flex-shrink-0 flex flex-col items-center touch-manipulation rounded-lg transition-all',
              activeRoomId === room.id
                ? 'ring-2 ring-elec-yellow'
                : 'ring-1 ring-white/20'
            )}
          >
            {/* Thumbnail */}
            <div className="w-[60px] h-[45px] rounded-t-lg overflow-hidden bg-white/5">
              {room.thumbnail ? (
                <img
                  src={room.thumbnail}
                  alt={room.name}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[10px] text-white/40">No preview</span>
                </div>
              )}
            </div>

            {/* Name */}
            <span className="text-[10px] text-white truncate w-[60px] text-center px-0.5 py-0.5">
              {room.name}
            </span>

            {/* Delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteRoom(room.id);
              }}
              className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center touch-manipulation"
            >
              <X className="h-3 w-3 text-white" />
            </button>
          </button>
        ))}

        {/* New room button */}
        <button
          onClick={onNewRoom}
          className="flex-shrink-0 w-[60px] h-[60px] rounded-lg border border-dashed border-white/30 flex items-center justify-center touch-manipulation hover:border-elec-yellow/50 transition-colors"
        >
          <Plus className="h-5 w-5 text-white/50" />
        </button>
      </div>
    </div>
  );
};

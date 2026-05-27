import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { SavedRoom } from '@/hooks/useFloorPlanRooms';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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
  const [pendingDelete, setPendingDelete] = useState<SavedRoom | null>(null);

  return (
    <>
      <div className="w-full overflow-x-auto scrollbar-hide bg-black/40 border-b border-white/10 px-2 py-2">
        <div className="flex items-center gap-2 min-w-min">
          {rooms.map((room) => {
            const isActive = activeRoomId === room.id;
            return (
              <div
                key={room.id}
                onClick={() => onRoomSelect(room.id)}
                className={cn(
                  'relative flex-shrink-0 flex flex-col items-center touch-manipulation rounded-lg transition-all cursor-pointer',
                  isActive
                    ? 'ring-2 ring-elec-yellow bg-elec-yellow/10'
                    : 'ring-1 ring-white/15 hover:ring-white/30'
                )}
              >
                {/* Thumbnail — bumped from 60x45 to 80x60 for legibility */}
                <div className="w-[80px] h-[60px] rounded-t-lg overflow-hidden bg-white/5">
                  {room.thumbnail ? (
                    <img
                      src={room.thumbnail}
                      alt={room.name}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[10px] text-white">No preview</span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <span
                  className={cn(
                    'text-[11px] truncate w-[80px] text-center px-1 py-1',
                    isActive ? 'text-elec-yellow font-semibold' : 'text-white'
                  )}
                >
                  {room.name}
                </span>

                {/* Delete button — bumped from 20px to 28px with proper
                    touch affordance. Confirms before deleting because a
                    saved room can hold 50+ placed symbols. */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPendingDelete(room);
                  }}
                  aria-label={`Delete room ${room.name}`}
                  className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-red-500 flex items-center justify-center touch-manipulation active:scale-90 transition-transform shadow-md ring-2 ring-background"
                >
                  <X className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                </button>
              </div>
            );
          })}

          {/* New room button */}
          <button
            onClick={onNewRoom}
            aria-label="Create new room"
            className="flex-shrink-0 w-[80px] h-[83px] rounded-lg border border-dashed border-white/30 flex items-center justify-center touch-manipulation hover:border-elec-yellow/50 active:scale-95 transition-all"
          >
            <Plus className="h-5 w-5 text-white/60" />
          </button>
        </div>
      </div>

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent className="bg-elec-gray border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete room?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              "{pendingDelete?.name}" — {pendingDelete?.symbolIds.length ?? 0} item
              {pendingDelete && pendingDelete.symbolIds.length !== 1 ? 's' : ''}. This
              can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/20 text-white hover:bg-white/10 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => {
                if (pendingDelete) onDeleteRoom(pendingDelete.id);
                setPendingDelete(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

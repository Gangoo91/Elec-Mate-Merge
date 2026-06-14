import React, { useEffect, useRef, useState } from 'react';
import { GripVertical, ChevronUp, ChevronDown, Check } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { RoomItemRow } from './RoomItemRow';
import { RoomPhotoCapture } from './RoomPhotoCapture';
import { RoomSmartPrompts } from './RoomSmartPrompts';
import { AddItemButton } from './AddItemButton';
import type { SiteVisitRoom, SiteVisitItem, SiteVisitPhoto } from '@/types/siteVisit';

interface RoomPanelProps {
  room: SiteVisitRoom;
  photos: SiteVisitPhoto[];
  visitId?: string;
  onAddItem: (roomId: string, item: Omit<SiteVisitItem, 'id' | 'roomId' | 'sortOrder'>) => void;
  onUpdateItem: (itemId: string, updates: Partial<SiteVisitItem>) => void;
  onRemoveItem: (roomId: string, itemId: string) => void;
  onReorderItems?: (roomId: string, itemIds: string[]) => void;
  onUpdateRoomNotes: (roomId: string, notes: string) => void;
  onAddPhoto: (photo: Omit<SiteVisitPhoto, 'id' | 'siteVisitId'>) => string | void;
  onRemovePhoto: (photoId: string) => void;
  onUpdatePhotoUrl?: (photoId: string, newUrl: string, storagePath?: string) => void;
  getPromptResponse: (promptKey: string, roomId?: string) => string | undefined;
  setPromptResponse: (
    promptKey: string,
    response: string,
    roomId?: string,
    question?: string
  ) => void;
}

export const RoomPanel = ({
  room,
  photos,
  visitId,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  onReorderItems,
  onUpdateRoomNotes,
  onAddPhoto,
  onRemovePhoto,
  onUpdatePhotoUrl,
  getPromptResponse,
  setPromptResponse,
}: RoomPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [reorderMode, setReorderMode] = useState(false);

  const moveItem = (index: number, dir: -1 | 1) => {
    if (!onReorderItems) return;
    const target = index + dir;
    if (target < 0 || target >= room.items.length) return;
    const ids = room.items.map((i) => i.id);
    [ids[index], ids[target]] = [ids[target], ids[index]];
    onReorderItems(room.id, ids);
  };

  // Bring the panel into view when switching rooms — adding a room used to
  // scroll to the top of the page, away from the room just added (audit P1)
  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [room.id]);

  const handleAddEmptyItem = () => {
    onAddItem(room.id, {
      itemType: '',
      itemDescription: '',
      quantity: 1,
      unit: 'each',
    });
  };

  const handleAddPhoto = (photoUrl: string, description?: string) =>
    onAddPhoto({
      roomId: room.id,
      photoUrl,
      description,
      photoPhase: 'before',
    });

  return (
    <div ref={panelRef} className="scroll-mt-20 space-y-4">
      {/* Room header — sticky so you always know which room you're filling
          in 400px down the panel (audit: navigation confusion) */}
      <div className="sticky top-14 z-20 -mx-1 flex items-center gap-2 rounded-lg bg-background/95 px-1 py-2 backdrop-blur-sm">
        <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
        <h3 className="text-base font-semibold text-white">{room.roomName}</h3>
        <span className="text-xs text-white/60">
          {room.items.length} item{room.items.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Items list */}
      <div className="space-y-2">
        {onReorderItems && room.items.length > 1 && (
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setReorderMode((m) => !m)}
              className="flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[12px] font-medium text-white/65 touch-manipulation active:bg-white/10"
            >
              {reorderMode ? (
                <>
                  <Check className="h-3.5 w-3.5 text-elec-yellow" />
                  Done
                </>
              ) : (
                <>
                  <GripVertical className="h-3.5 w-3.5" />
                  Reorder
                </>
              )}
            </button>
          </div>
        )}

        {reorderMode ? (
          room.items.map((item, index) => (
            <div
              key={item.id}
              className="flex min-h-[44px] items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2"
            >
              <GripVertical className="h-4 w-4 flex-shrink-0 text-white/50" />
              <span className="flex-1 truncate text-sm text-white">
                {item.itemDescription || item.itemType || 'Item'}
              </span>
              <span className="text-[11px] tabular-nums text-white/45">
                {item.quantity} {item.unit}
              </span>
              <button
                onClick={() => moveItem(index, -1)}
                disabled={index === 0}
                aria-label="Move up"
                className="flex h-9 w-9 items-center justify-center rounded-lg touch-manipulation active:bg-white/10 disabled:opacity-30"
              >
                <ChevronUp className="h-4 w-4 text-white" />
              </button>
              <button
                onClick={() => moveItem(index, 1)}
                disabled={index >= room.items.length - 1}
                aria-label="Move down"
                className="flex h-9 w-9 items-center justify-center rounded-lg touch-manipulation active:bg-white/10 disabled:opacity-30"
              >
                <ChevronDown className="h-4 w-4 text-white" />
              </button>
            </div>
          ))
        ) : (
          <>
            {room.items.map((item) => (
              <RoomItemRow
                key={item.id}
                item={item}
                roomType={room.roomType}
                onUpdate={(updates) => onUpdateItem(item.id, updates)}
                onRemove={() => onRemoveItem(room.id, item.id)}
              />
            ))}
            <AddItemButton onAdd={handleAddEmptyItem} />
          </>
        )}
      </div>

      {/* Room notes */}
      <div className="space-y-1">
        <label className="text-[11.5px] font-medium text-white/65">Room Notes</label>
        <Textarea
          value={room.notes || ''}
          onChange={(e) => onUpdateRoomNotes(room.id, e.target.value)}
          placeholder="Any notes about this room..."
          className="min-h-[60px] touch-manipulation text-base rounded-xl border-white/[0.12] bg-[hsl(0_0%_9%)] text-white placeholder:text-white/40 focus:border-elec-yellow/50 focus:ring-elec-yellow/20"
          autoCapitalize="sentences"
          spellCheck
          enterKeyHint="done"
        />
      </div>

      {/* Photos */}
      <RoomPhotoCapture
        photos={photos}
        roomId={room.id}
        photoPhase="before"
        visitId={visitId}
        onAddPhoto={handleAddPhoto}
        onRemovePhoto={onRemovePhoto}
        onUpdatePhotoUrl={onUpdatePhotoUrl}
      />

      {/* Smart prompts */}
      <RoomSmartPrompts
        roomType={room.roomType}
        roomId={room.id}
        getResponse={getPromptResponse}
        setResponse={setPromptResponse}
      />
    </div>
  );
};

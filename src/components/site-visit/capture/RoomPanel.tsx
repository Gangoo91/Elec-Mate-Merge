import React, { useEffect, useRef } from 'react';
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
  onUpdateRoomNotes,
  onAddPhoto,
  onRemovePhoto,
  onUpdatePhotoUrl,
  getPromptResponse,
  setPromptResponse,
}: RoomPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

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

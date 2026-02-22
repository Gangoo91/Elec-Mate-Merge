import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { RoomItemRow } from './RoomItemRow';
import { RoomPhotoCapture } from './RoomPhotoCapture';
import { RoomSmartPrompts } from './RoomSmartPrompts';
import { AddItemButton } from './AddItemButton';
import type { SiteVisitRoom, SiteVisitItem, SiteVisitPhoto } from '@/types/siteVisit';

interface RoomPanelProps {
  room: SiteVisitRoom;
  photos: SiteVisitPhoto[];
  onAddItem: (roomId: string, item: Omit<SiteVisitItem, 'id' | 'roomId' | 'sortOrder'>) => void;
  onUpdateItem: (itemId: string, updates: Partial<SiteVisitItem>) => void;
  onRemoveItem: (roomId: string, itemId: string) => void;
  onUpdateRoomNotes: (roomId: string, notes: string) => void;
  onAddPhoto: (photo: Omit<SiteVisitPhoto, 'id' | 'siteVisitId'>) => void;
  onRemovePhoto: (photoId: string) => void;
  onUpdatePhotoUrl?: (photoId: string, newUrl: string) => void;
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
  const handleAddEmptyItem = () => {
    onAddItem(room.id, {
      itemType: '',
      itemDescription: '',
      quantity: 1,
      unit: 'each',
    });
  };

  const handleAddPhoto = (photoUrl: string, description?: string) => {
    onAddPhoto({
      roomId: room.id,
      photoUrl,
      description,
      photoPhase: 'before',
    });
  };

  return (
    <div className="space-y-4">
      {/* Room header */}
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
        <h3 className="text-base font-semibold text-white">{room.roomName}</h3>
        <span className="text-xs text-white">
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
        <label className="text-xs font-medium text-white">Room Notes</label>
        <Textarea
          value={room.notes || ''}
          onChange={(e) => onUpdateRoomNotes(room.id, e.target.value)}
          placeholder="Any notes about this room..."
          className="touch-manipulation text-base min-h-[60px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
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

import React, { useState } from 'react';
import { GlobalPromptsPanel } from '../capture/GlobalPromptsPanel';
import { RoomList } from '../capture/RoomList';
import { RoomSelector } from '../capture/RoomSelector';
import { RoomPanel } from '../capture/RoomPanel';
import type {
  SiteVisit,
  SiteVisitRoom,
  SiteVisitItem,
  SiteVisitPhoto,
  RoomType,
} from '@/types/siteVisit';

interface SiteVisitCaptureStepProps {
  visit: SiteVisit;
  activeRoomId: string | null;
  onAddRoom: (roomType: RoomType, roomName: string) => string;
  onRemoveRoom: (roomId: string) => void;
  onSetActiveRoom: (roomId: string | null) => void;
  onAddItem: (roomId: string, item: Omit<SiteVisitItem, 'id' | 'roomId' | 'sortOrder'>) => void;
  onUpdateItem: (itemId: string, updates: Partial<SiteVisitItem>) => void;
  onRemoveItem: (roomId: string, itemId: string) => void;
  onUpdateRoomNotes: (roomId: string, notes: string) => void;
  onAddPhoto: (photo: Omit<SiteVisitPhoto, 'id' | 'siteVisitId'>) => void;
  onRemovePhoto: (photoId: string) => void;
  getPromptResponse: (promptKey: string, roomId?: string) => string | undefined;
  setPromptResponse: (
    promptKey: string,
    response: string,
    roomId?: string,
    question?: string
  ) => void;
}

export const SiteVisitCaptureStep = ({
  visit,
  activeRoomId,
  onAddRoom,
  onRemoveRoom,
  onSetActiveRoom,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  onUpdateRoomNotes,
  onAddPhoto,
  onRemovePhoto,
  getPromptResponse,
  setPromptResponse,
}: SiteVisitCaptureStepProps) => {
  const [showSelector, setShowSelector] = useState(visit.rooms.length === 0);

  const activeRoom = visit.rooms.find((r) => r.id === activeRoomId);

  const handleAddRoom = (roomType: RoomType, roomName: string) => {
    onAddRoom(roomType, roomName);
    setShowSelector(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">Room-by-Room Capture</h2>
        <p className="text-sm text-white mt-1">
          Add rooms and capture accessories, photos and prompts
        </p>
      </div>

      {/* Global prompts */}
      <GlobalPromptsPanel
        getResponse={(key) => getPromptResponse(key)}
        setResponse={setPromptResponse}
      />

      {/* Room list tabs */}
      {visit.rooms.length > 0 && (
        <RoomList
          rooms={visit.rooms}
          activeRoomId={activeRoomId}
          onSelectRoom={onSetActiveRoom}
          onRemoveRoom={onRemoveRoom}
          onShowSelector={() => setShowSelector(true)}
        />
      )}

      {/* Room selector */}
      {showSelector && <RoomSelector existingRooms={visit.rooms} onAddRoom={handleAddRoom} />}

      {/* Active room panel */}
      {activeRoom && (
        <RoomPanel
          room={activeRoom}
          photos={visit.photos}
          onAddItem={onAddItem}
          onUpdateItem={onUpdateItem}
          onRemoveItem={onRemoveItem}
          onUpdateRoomNotes={onUpdateRoomNotes}
          onAddPhoto={onAddPhoto}
          onRemovePhoto={onRemovePhoto}
          getPromptResponse={getPromptResponse}
          setPromptResponse={setPromptResponse}
        />
      )}

      {/* Empty state */}
      {visit.rooms.length === 0 && !showSelector && (
        <div className="text-center py-12">
          <p className="text-sm text-white">No rooms added yet. Add your first room above.</p>
        </div>
      )}
    </div>
  );
};

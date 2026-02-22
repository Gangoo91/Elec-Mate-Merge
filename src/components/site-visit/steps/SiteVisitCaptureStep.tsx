import React, { useState } from 'react';
import { Mic, PenLine } from 'lucide-react';
import { GlobalPromptsPanel } from '../capture/GlobalPromptsPanel';
import { RoomList } from '../capture/RoomList';
import { RoomSelector } from '../capture/RoomSelector';
import { RoomPanel } from '../capture/RoomPanel';
import { VoiceCaptureMode } from '../capture/VoiceCaptureMode';
import { CaptureTimer } from '../capture/CaptureTimer';
import { RoomTemplateSelector } from '../capture/RoomTemplateSelector';
import type {
  SiteVisit,
  SiteVisitRoom,
  SiteVisitItem,
  SiteVisitPhoto,
  RoomType,
} from '@/types/siteVisit';

type CaptureMode = 'manual' | 'voice';

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
  onUpdatePhotoUrl?: (photoId: string, newUrl: string) => void;
  getPromptResponse: (promptKey: string, roomId?: string) => string | undefined;
  setPromptResponse: (
    promptKey: string,
    response: string,
    roomId?: string,
    question?: string
  ) => void;
  onReorderRooms?: (roomIds: string[]) => void;
  captureSeconds?: number;
  onCaptureTimerTick?: (seconds: number) => void;
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
  onUpdatePhotoUrl,
  getPromptResponse,
  setPromptResponse,
  onReorderRooms,
  captureSeconds = 0,
  onCaptureTimerTick,
}: SiteVisitCaptureStepProps) => {
  const [showSelector, setShowSelector] = useState(visit.rooms.length === 0);
  const [captureMode, setCaptureMode] = useState<CaptureMode>('manual');
  const [showTemplates, setShowTemplates] = useState(
    visit.rooms.length === 0 && !!visit.propertyType
  );

  const activeRoom = visit.rooms.find((r) => r.id === activeRoomId);

  const handleAddRoom = (roomType: RoomType, roomName: string) => {
    onAddRoom(roomType, roomName);
    setShowSelector(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Room-by-Room Capture</h2>
          <p className="text-sm text-white mt-1">
            Add rooms and capture accessories, photos and prompts
          </p>
        </div>
        {onCaptureTimerTick && (
          <CaptureTimer
            isActive={true}
            initialSeconds={captureSeconds}
            onTick={onCaptureTimerTick}
          />
        )}
      </div>

      {/* Manual / Voice toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setCaptureMode('manual')}
          className={`flex-1 h-11 rounded-xl border text-sm font-medium transition-all touch-manipulation flex items-center justify-center gap-2 ${
            captureMode === 'manual'
              ? 'bg-elec-yellow/20 border-elec-yellow text-white'
              : 'bg-elec-gray border-white/10 text-white'
          }`}
        >
          <PenLine className="h-4 w-4" />
          Manual
        </button>
        <button
          onClick={() => setCaptureMode('voice')}
          className={`flex-1 h-11 rounded-xl border text-sm font-medium transition-all touch-manipulation flex items-center justify-center gap-2 ${
            captureMode === 'voice'
              ? 'bg-elec-yellow/20 border-elec-yellow text-white'
              : 'bg-elec-gray border-white/10 text-white'
          }`}
        >
          <Mic className="h-4 w-4" />
          Voice Capture
        </button>
      </div>

      {captureMode === 'voice' ? (
        <VoiceCaptureMode
          visit={visit}
          activeRoomId={activeRoomId}
          onAddRoom={onAddRoom}
          onSetActiveRoom={onSetActiveRoom}
          onAddItem={onAddItem}
          onUpdateItem={onUpdateItem}
          onRemoveItem={onRemoveItem}
          setPromptResponse={setPromptResponse}
          onAddPhoto={onAddPhoto}
        />
      ) : (
        <>
          {/* Room templates (shown when no rooms and property type is set) */}
          {showTemplates && captureMode === 'manual' && (
            <RoomTemplateSelector
              propertyType={visit.propertyType}
              onAddRoom={onAddRoom}
              onDismiss={() => setShowTemplates(false)}
            />
          )}

          {/* Global prompts */}
          <GlobalPromptsPanel
            getResponse={(key) => getPromptResponse(key)}
            setResponse={setPromptResponse}
            propertyType={visit.propertyType}
          />

          {/* Room list tabs */}
          {visit.rooms.length > 0 && (
            <RoomList
              rooms={visit.rooms}
              activeRoomId={activeRoomId}
              onSelectRoom={onSetActiveRoom}
              onRemoveRoom={onRemoveRoom}
              onShowSelector={() => setShowSelector(true)}
              onReorderRooms={onReorderRooms}
            />
          )}

          {/* Room selector */}
          {showSelector && (
            <RoomSelector
              existingRooms={visit.rooms}
              onAddRoom={handleAddRoom}
              propertyType={visit.propertyType}
            />
          )}

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
              onUpdatePhotoUrl={onUpdatePhotoUrl}
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
        </>
      )}
    </div>
  );
};

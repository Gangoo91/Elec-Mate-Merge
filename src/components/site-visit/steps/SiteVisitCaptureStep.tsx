import React, { useState, useEffect } from 'react';
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
  onReorderRooms?: (roomIds: string[]) => void;
  onReorderItems?: (roomId: string, itemIds: string[]) => void;
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
  onReorderItems,
  captureSeconds = 0,
  onCaptureTimerTick,
}: SiteVisitCaptureStepProps) => {
  const [showSelector, setShowSelector] = useState(visit.rooms.length === 0);
  const [captureMode, setCaptureMode] = useState<CaptureMode>('manual');
  const [showTemplates, setShowTemplates] = useState(
    visit.rooms.length === 0 && !!visit.propertyType
  );
  // Offline awareness for the WHOLE capture step — voice mode had a banner,
  // the mode people actually use didn't (audit P1)
  const [isOnline, setIsOnline] = useState(
    typeof navigator === 'undefined' ? true : navigator.onLine
  );
  useEffect(() => {
    const onUp = () => setIsOnline(true);
    const onDown = () => setIsOnline(false);
    window.addEventListener('online', onUp);
    window.addEventListener('offline', onDown);
    return () => {
      window.removeEventListener('online', onUp);
      window.removeEventListener('offline', onDown);
    };
  }, []);

  const activeRoom = visit.rooms.find((r) => r.id === activeRoomId);

  const handleAddRoom = (roomType: RoomType, roomName: string) => {
    onAddRoom(roomType, roomName);
    setShowSelector(false);
  };

  return (
    <div className="space-y-4">
      {!isOnline && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2.5 text-[12.5px] text-amber-200">
          Working offline — everything keeps saving to this device and syncs the moment signal
          returns. Photos upload then too.
        </div>
      )}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[18px] font-semibold tracking-tight text-white sm:text-[20px]">
            Room-by-room capture
          </h2>
          <p className="mt-1 text-[12.5px] text-white/65">
            Add rooms, capture items, photos and prompts.
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

      {/* Manual / Voice — segmented control */}
      <div className="grid grid-cols-2 gap-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-1">
        {(
          [
            { key: 'manual', label: 'Manual', Icon: PenLine },
            { key: 'voice', label: 'Voice capture', Icon: Mic },
          ] as const
        ).map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setCaptureMode(key)}
            className={`flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors touch-manipulation active:scale-[0.98] ${
              captureMode === key
                ? 'bg-elec-yellow font-semibold text-black'
                : 'text-white/65 hover:text-white'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
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
              visitId={visit.id}
              onAddItem={onAddItem}
              onUpdateItem={onUpdateItem}
              onRemoveItem={onRemoveItem}
              onReorderItems={onReorderItems}
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

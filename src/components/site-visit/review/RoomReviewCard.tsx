import React from 'react';
import type { SiteVisitRoom, SiteVisitPhoto, SiteVisitPrompt } from '@/types/siteVisit';

interface RoomReviewCardProps {
  room: SiteVisitRoom;
  photos: SiteVisitPhoto[];
  prompts: SiteVisitPrompt[];
}

export const RoomReviewCard = ({ room, photos, prompts }: RoomReviewCardProps) => {
  const roomPhotos = photos.filter((p) => p.roomId === room.id);
  const roomPrompts = prompts.filter((p) => p.roomId === room.id && p.response);

  return (
    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
        <h3 className="text-sm font-semibold text-white">{room.roomName}</h3>
        <span className="text-xs text-white ml-auto">
          {room.items.length} item{room.items.length !== 1 ? 's' : ''}
        </span>
      </div>

      {room.items.length > 0 && (
        <div className="space-y-1">
          {room.items.map((item) => (
            <div key={item.id} className="flex justify-between text-xs">
              <span className="text-white">{item.itemDescription || item.itemType}</span>
              <span className="text-white font-medium">x{item.quantity}</span>
            </div>
          ))}
        </div>
      )}

      {roomPhotos.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto">
          {roomPhotos.map((photo) => (
            <img
              key={photo.id}
              src={photo.photoUrl}
              alt={photo.description || 'Photo'}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
          ))}
        </div>
      )}

      {roomPrompts.length > 0 && (
        <div className="space-y-1 pt-1 border-t border-white/[0.06]">
          {roomPrompts.map((prompt) => (
            <div key={prompt.id} className="flex justify-between text-xs">
              <span className="text-white">{prompt.promptQuestion}</span>
              <span className="text-white font-medium">{prompt.response}</span>
            </div>
          ))}
        </div>
      )}

      {room.notes && <p className="text-xs text-white italic">{room.notes}</p>}
    </div>
  );
};

import React from 'react';
import { Home, Camera, HelpCircle, Package } from 'lucide-react';
import type { SiteVisit } from '@/types/siteVisit';
import { getRoomLabel } from '@/data/siteVisit/roomTypes';

interface SiteVisitReviewStepProps {
  visit: SiteVisit;
  totalRooms: number;
  totalItems: number;
  totalPhotos: number;
  totalPromptsAnswered: number;
}

export const SiteVisitReviewStep = ({
  visit,
  totalRooms,
  totalItems,
  totalPhotos,
  totalPromptsAnswered,
}: SiteVisitReviewStepProps) => {
  const beforePhotos = visit.photos.filter((p) => p.photoPhase === 'before');

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-white">Review Site Visit</h2>
        <p className="text-sm text-white mt-1">
          Check everything looks right before generating outputs
        </p>
      </div>

      {/* Summary stats bar */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { icon: Home, label: 'Rooms', value: totalRooms, colour: 'bg-blue-500' },
          { icon: Package, label: 'Items', value: totalItems, colour: 'bg-emerald-500' },
          { icon: Camera, label: 'Photos', value: totalPhotos, colour: 'bg-purple-500' },
          {
            icon: HelpCircle,
            label: 'Prompts',
            value: totalPromptsAnswered,
            colour: 'bg-orange-500',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
          >
            <div
              className={`w-8 h-8 rounded-lg ${stat.colour}/20 flex items-center justify-center mb-1`}
            >
              <stat.icon className={`h-4 w-4 ${stat.colour.replace('bg-', 'text-')}`} />
            </div>
            <p className="text-lg font-bold text-white">{stat.value}</p>
            <p className="text-[11px] text-white">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Client & property summary */}
      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
        <h3 className="text-sm font-semibold text-white">Client & Property</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-white/50">Client</p>
            <p className="text-white">{visit.customerName || '—'}</p>
          </div>
          <div>
            <p className="text-white/50">Phone</p>
            <p className="text-white">{visit.customerPhone || '—'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-white/50">Address</p>
            <p className="text-white">{visit.propertyAddress || '—'}</p>
          </div>
          <div>
            <p className="text-white/50">Postcode</p>
            <p className="text-white">{visit.propertyPostcode || '—'}</p>
          </div>
          <div>
            <p className="text-white/50">Type</p>
            <p className="text-white capitalize">{visit.propertyType || '—'}</p>
          </div>
        </div>
      </div>

      {/* Room-by-room cards */}
      {visit.rooms.map((room) => {
        const roomPhotos = beforePhotos.filter((p) => p.roomId === room.id);
        const roomPrompts = visit.prompts.filter((p) => p.roomId === room.id && p.response);

        return (
          <div
            key={room.id}
            className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
              <h3 className="text-sm font-semibold text-white">{room.roomName}</h3>
              <span className="text-xs text-white ml-auto">
                {room.items.length} item{room.items.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Items */}
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

            {/* Photo thumbnails */}
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

            {/* Prompt responses */}
            {roomPrompts.length > 0 && (
              <div className="space-y-1 pt-1 border-t border-white/[0.06]">
                {roomPrompts.map((prompt) => (
                  <div key={prompt.id} className="flex justify-between text-xs">
                    <span className="text-white/50">{prompt.promptQuestion}</span>
                    <span className="text-white font-medium">{prompt.response}</span>
                  </div>
                ))}
              </div>
            )}

            {room.notes && <p className="text-xs text-white/50 italic">{room.notes}</p>}
          </div>
        );
      })}

      {/* Global prompt responses */}
      {visit.prompts.filter((p) => !p.roomId && p.response).length > 0 && (
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
          <h3 className="text-sm font-semibold text-white">Property Assessment</h3>
          <div className="space-y-1">
            {visit.prompts
              .filter((p) => !p.roomId && p.response)
              .map((prompt) => (
                <div key={prompt.id} className="flex justify-between text-xs">
                  <span className="text-white/50">{prompt.promptQuestion}</span>
                  <span className="text-white font-medium">{prompt.response}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

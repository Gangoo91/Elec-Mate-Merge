import React from 'react';
import { Home, Camera, HelpCircle, Package } from 'lucide-react';
import type { SiteVisit } from '@/types/siteVisit';
import { SurveyAnalysisPanel } from '../review/SurveyAnalysisPanel';

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
      {/* Header */}
      <div className="bg-gradient-to-r from-elec-yellow/20 to-amber-600/20 border border-elec-yellow/30 rounded-xl px-4 py-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
          Review Site Visit
        </h2>
        <p className="text-sm text-white mt-0.5">
          Check everything looks right before generating outputs
        </p>
      </div>

      {/* Summary stats bar */}
      <div className="grid grid-cols-4 gap-2">
        <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mb-1">
            <Home className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-lg font-bold text-white">{totalRooms}</p>
          <p className="text-[11px] text-white">Rooms</p>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-1">
            <Package className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-lg font-bold text-white">{totalItems}</p>
          <p className="text-[11px] text-white">Items</p>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center mb-1">
            <Camera className="h-4 w-4 text-purple-400" />
          </div>
          <p className="text-lg font-bold text-white">{totalPhotos}</p>
          <p className="text-[11px] text-white">Photos</p>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center mb-1">
            <HelpCircle className="h-4 w-4 text-orange-400" />
          </div>
          <p className="text-lg font-bold text-white">{totalPromptsAnswered}</p>
          <p className="text-[11px] text-white">Prompts</p>
        </div>
      </div>

      {/* Client & property summary */}
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
        <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06]">
          <h3 className="text-sm font-semibold text-white">Client & Property</h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <p className="text-[11px] font-medium text-white mb-0.5">Client</p>
              <p className="text-sm text-white font-medium">{visit.customerName || '—'}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-white mb-0.5">Phone</p>
              <p className="text-sm text-white font-medium">{visit.customerPhone || '—'}</p>
            </div>
          </div>
          <div className="border-t border-white/[0.06] pt-3">
            <p className="text-[11px] font-medium text-white mb-0.5">Address</p>
            <p className="text-sm text-white font-medium">{visit.propertyAddress || '—'}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <p className="text-[11px] font-medium text-white mb-0.5">Postcode</p>
              <p className="text-sm text-white font-medium">{visit.propertyPostcode || '—'}</p>
            </div>
            <div>
              <p className="text-[11px] font-medium text-white mb-0.5">Type</p>
              <p className="text-sm text-white font-medium capitalize">
                {visit.propertyType || '—'}
              </p>
            </div>
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
            className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
          >
            {/* Room header */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06]">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
              <h3 className="text-sm font-semibold text-white">{room.roomName}</h3>
              <span className="text-xs text-white ml-auto">
                {room.items.length} item{room.items.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="p-4 space-y-3">
              {/* Items */}
              {room.items.length > 0 && (
                <div className="space-y-1.5">
                  {room.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-baseline text-xs">
                      <span className="text-white">{item.itemDescription || item.itemType}</span>
                      <span className="text-white font-semibold tabular-nums ml-2 flex-shrink-0">
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Photo thumbnails */}
              {roomPhotos.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pt-2 border-t border-white/[0.06]">
                  {roomPhotos.map((photo) => (
                    <img
                      key={photo.id}
                      src={photo.photoUrl}
                      alt={photo.description || 'Photo'}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-white/10"
                    />
                  ))}
                </div>
              )}

              {/* Prompt responses */}
              {roomPrompts.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                  {roomPrompts.map((prompt) => (
                    <div
                      key={prompt.id}
                      className="flex justify-between items-baseline text-xs gap-2"
                    >
                      <span className="text-white">{prompt.promptQuestion}</span>
                      <span className="text-elec-yellow font-medium flex-shrink-0">
                        {prompt.response}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {room.notes && (
                <p className="text-xs text-white italic pt-2 border-t border-white/[0.06]">
                  {room.notes}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* Global prompt responses */}
      {visit.prompts.filter((p) => !p.roomId && p.response).length > 0 && (
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white">Property Assessment</h3>
          </div>
          <div className="p-4 space-y-1.5">
            {visit.prompts
              .filter((p) => !p.roomId && p.response)
              .map((prompt) => (
                <div key={prompt.id} className="flex justify-between items-baseline text-xs gap-2">
                  <span className="text-white">{prompt.promptQuestion}</span>
                  <span className="text-elec-yellow font-medium flex-shrink-0">
                    {prompt.response}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* AI Analysis */}
      <SurveyAnalysisPanel visit={visit} />
    </div>
  );
};

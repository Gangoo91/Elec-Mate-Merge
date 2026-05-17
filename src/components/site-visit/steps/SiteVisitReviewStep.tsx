import React, { useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { SiteVisit } from '@/types/siteVisit';
import { SurveyAnalysisPanel } from '../review/SurveyAnalysisPanel';
import { GLOBAL_PROMPTS, ROOM_PROMPTS } from '@/data/siteVisit/smartPrompts';

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

  // Compute missing required prompts
  const missingPrompts = useMemo(() => {
    const missing: { label: string; question: string }[] = [];

    // Check global required prompts
    for (const prompt of GLOBAL_PROMPTS) {
      if (!prompt.required) continue;
      const answered = visit.prompts.find(
        (p) => p.promptKey === prompt.key && !p.roomId && p.response
      );
      if (!answered) {
        missing.push({ label: 'Property', question: prompt.question });
      }
    }

    // Check room-specific required prompts
    for (const room of visit.rooms) {
      for (const prompt of ROOM_PROMPTS) {
        if (!prompt.required) continue;
        if (prompt.roomTypes && !prompt.roomTypes.includes(room.roomType)) continue;
        const answered = visit.prompts.find(
          (p) => p.promptKey === prompt.key && p.roomId === room.id && p.response
        );
        if (!answered) {
          missing.push({ label: room.roomName, question: prompt.question });
        }
      }
    }

    return missing;
  }, [visit]);

  return (
    <div className="space-y-4">
      {/* Editorial header */}
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-5">
        <div
          aria-hidden
          className="-mx-5 -mt-5 mb-5 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0"
        />
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          REVIEW
        </div>
        <h2 className="mt-1.5 text-[18px] font-semibold tracking-tight text-white sm:text-[20px]">
          Check it before you generate
        </h2>
        <p className="mt-1 text-[12.5px] text-white/65">
          Last chance to fix anything missing — rooms, prompts or notes.
        </p>
      </div>

      {/* Editorial StatStrip */}
      <div className="grid grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06]">
        {[
          { label: 'Rooms', value: totalRooms },
          { label: 'Items', value: totalItems },
          { label: 'Photos', value: totalPhotos },
          { label: 'Prompts', value: totalPromptsAnswered },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="relative flex flex-col items-start bg-[hsl(0_0%_12%)] p-3 sm:p-4"
          >
            {i === 0 && (
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 opacity-80"
              />
            )}
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              {String(i + 1).padStart(2, '0')} · {stat.label}
            </div>
            <p className="mt-2 text-[22px] font-semibold tabular-nums leading-none tracking-tight text-white sm:text-[26px]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Missing required prompts warning */}
      {missingPrompts.length > 0 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0" />
            <p className="text-sm font-medium text-white">
              {missingPrompts.length} required prompt{missingPrompts.length !== 1 ? 's' : ''} not
              answered
            </p>
          </div>
          <div className="space-y-1 pl-6">
            {missingPrompts.map((mp, idx) => (
              <p key={idx} className="text-xs text-white">
                {mp.label}: {mp.question.replace('?', '')} not answered
              </p>
            ))}
          </div>
        </div>
      )}

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

import React, { useState } from 'react';
import { LayoutTemplate, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTemplatesForProperty, type RoomTemplate } from '@/data/siteVisit/roomTemplates';
import type { PropertyType, RoomType } from '@/types/siteVisit';

interface RoomTemplateSelectorProps {
  propertyType?: PropertyType;
  onAddRoom: (roomType: RoomType, roomName: string) => string;
  onDismiss: () => void;
}

export const RoomTemplateSelector = ({
  propertyType,
  onAddRoom,
  onDismiss,
}: RoomTemplateSelectorProps) => {
  const templates = getTemplatesForProperty(propertyType);
  const [selectedTemplate, setSelectedTemplate] = useState<RoomTemplate | null>(null);
  const [checkedRooms, setCheckedRooms] = useState<Set<number>>(new Set());

  const handleSelectTemplate = (template: RoomTemplate) => {
    setSelectedTemplate(template);
    setCheckedRooms(new Set(template.rooms.map((_, i) => i)));
  };

  const toggleRoom = (index: number) => {
    setCheckedRooms((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleAddSelected = () => {
    if (!selectedTemplate) return;
    for (const [i, room] of selectedTemplate.rooms.entries()) {
      if (checkedRooms.has(i)) {
        onAddRoom(room.roomType, room.roomName);
      }
    }
    onDismiss();
  };

  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06]">
        <LayoutTemplate className="h-4 w-4 text-elec-yellow" />
        <h3 className="flex-1 text-sm font-semibold text-white">Quick start</h3>
        {/* Visible skip — was buried at the bottom of the expanded card */}
        <button
          onClick={onDismiss}
          className="flex h-9 items-center rounded-full px-3 text-[12px] font-medium text-white/60 touch-manipulation hover:text-white active:bg-white/[0.06]"
        >
          Skip
        </button>
      </div>

      {!selectedTemplate ? (
        <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
          {templates.map((template, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectTemplate(template)}
              className="min-h-[48px] flex-shrink-0 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-left text-sm font-medium text-white transition-colors touch-manipulation hover:border-elec-yellow/40 active:scale-[0.97]"
            >
              {template.label}
              <span className="mt-0.5 block text-[10px] uppercase tracking-[0.14em] text-white/45">
                {template.rooms.length} rooms
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="p-3 space-y-3">
          <p className="text-xs text-white font-medium">
            {selectedTemplate.label} — select rooms to add:
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {selectedTemplate.rooms.map((room, idx) => (
              <button
                key={idx}
                onClick={() => toggleRoom(idx)}
                className={`flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors touch-manipulation active:scale-[0.98] ${
                  checkedRooms.has(idx)
                    ? 'border border-elec-yellow/50 bg-elec-yellow/[0.12] text-white'
                    : 'border border-white/[0.06] bg-white/[0.03] text-white/75'
                }`}
              >
                <div
                  className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded ${
                    checkedRooms.has(idx) ? 'bg-elec-yellow' : 'border border-white/30'
                  }`}
                >
                  {checkedRooms.has(idx) && <Check className="h-2.5 w-2.5 text-black" />}
                </div>
                {room.roomName}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedTemplate(null)}
              className="flex-1 h-11 touch-manipulation text-white border-white/20"
            >
              Back
            </Button>
            <Button
              size="sm"
              onClick={handleAddSelected}
              disabled={checkedRooms.size === 0}
              className="h-11 flex-1 touch-manipulation bg-elec-yellow font-semibold text-black transition-transform hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Add {checkedRooms.size} room{checkedRooms.size !== 1 ? 's' : ''}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

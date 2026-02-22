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
        <h3 className="text-sm font-semibold text-white">Quick Start Templates</h3>
      </div>

      {!selectedTemplate ? (
        <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
          {templates.map((template, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectTemplate(template)}
              className="flex-shrink-0 px-4 py-2.5 rounded-xl border border-white/10 bg-elec-gray text-sm font-medium text-white touch-manipulation min-h-[44px] hover:border-elec-yellow transition-colors"
            >
              {template.label}
              <span className="block text-[10px] text-white mt-0.5">
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
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium touch-manipulation transition-colors min-h-[44px] ${
                  checkedRooms.has(idx)
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-white'
                    : 'bg-white/[0.03] border border-white/[0.06] text-white'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                    checkedRooms.has(idx) ? 'bg-emerald-500' : 'border border-white/30'
                  }`}
                >
                  {checkedRooms.has(idx) && <Check className="h-2.5 w-2.5 text-white" />}
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
              className="flex-1 h-11 touch-manipulation bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
            >
              Add {checkedRooms.size} Room{checkedRooms.size !== 1 ? 's' : ''}
            </Button>
          </div>
          <button
            onClick={onDismiss}
            className="w-full text-center text-xs text-white underline underline-offset-2 py-1 touch-manipulation"
          >
            Skip — add rooms manually
          </button>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { FileText, User, MapPin, Home, Package } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import type { SiteVisit } from '@/types/siteVisit';

interface ScopeOfWorksEditorProps {
  visit: SiteVisit;
  assumptions: string;
  onAssumptionsChange: (val: string) => void;
}

export const ScopeOfWorksEditor = ({
  visit,
  assumptions,
  onAssumptionsChange,
}: ScopeOfWorksEditorProps) => {
  const globalPrompts = visit.prompts.filter((p) => !p.roomId && p.response);

  return (
    <div className="space-y-4">
      {/* Header / branding */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-elec-yellow/20 to-amber-600/20 border border-elec-yellow/30">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-base font-bold text-white">Scope of Works</h3>
        </div>
        <p className="text-xs text-white">
          Auto-generated from site visit — review before sending to client
        </p>
      </div>

      {/* Client details */}
      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <User className="h-4 w-4 text-blue-400" />
          <h4 className="text-sm font-semibold text-white">Client</h4>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-white/50">Name</p>
            <p className="text-white">{visit.customerName || '—'}</p>
          </div>
          <div>
            <p className="text-white/50">Phone</p>
            <p className="text-white">{visit.customerPhone || '—'}</p>
          </div>
          <div>
            <p className="text-white/50">Email</p>
            <p className="text-white">{visit.customerEmail || '—'}</p>
          </div>
        </div>
      </div>

      {/* Property */}
      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="h-4 w-4 text-emerald-400" />
          <h4 className="text-sm font-semibold text-white">Property</h4>
        </div>
        <div className="text-xs space-y-1">
          <p className="text-white">{visit.propertyAddress || '—'}</p>
          <p className="text-white">{visit.propertyPostcode || ''}</p>
          <p className="text-white capitalize">{visit.propertyType || ''}</p>
        </div>
      </div>

      {/* Property assessment (global prompts) */}
      {globalPrompts.length > 0 && (
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <Home className="h-4 w-4 text-orange-400" />
            <h4 className="text-sm font-semibold text-white">Property Assessment</h4>
          </div>
          <div className="space-y-1">
            {globalPrompts.map((p) => (
              <div key={p.id} className="flex justify-between text-xs">
                <span className="text-white">{p.promptQuestion}</span>
                <span className="text-white font-medium">{p.response}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Room-by-room work items */}
      {visit.rooms.map((room) => {
        const roomPrompts = visit.prompts.filter((p) => p.roomId === room.id && p.response);
        return (
          <div
            key={room.id}
            className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2"
          >
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-purple-400" />
              <h4 className="text-sm font-semibold text-white">{room.roomName}</h4>
            </div>

            {room.items.length > 0 ? (
              <div className="space-y-1">
                {room.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs">
                    <span className="text-white">{item.itemDescription}</span>
                    <span className="text-white font-medium">
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-white/50 italic">No items specified</p>
            )}

            {roomPrompts.length > 0 && (
              <div className="space-y-1 pt-1 border-t border-white/[0.06]">
                {roomPrompts.map((p) => (
                  <div key={p.id} className="flex justify-between text-xs">
                    <span className="text-white/50">{p.promptQuestion}</span>
                    <span className="text-white font-medium">{p.response}</span>
                  </div>
                ))}
              </div>
            )}

            {room.notes && <p className="text-xs text-white/50 italic">Note: {room.notes}</p>}
          </div>
        );
      })}

      {/* Assumptions / exclusions */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-white">Assumptions & Exclusions</label>
        <Textarea
          value={assumptions}
          onChange={(e) => onAssumptionsChange(e.target.value)}
          placeholder={`E.g.:\n- Price excludes making good / decoration\n- Existing cabling in good condition\n- Access available during normal working hours\n- Any additional work will be quoted separately`}
          className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
        />
      </div>
    </div>
  );
};

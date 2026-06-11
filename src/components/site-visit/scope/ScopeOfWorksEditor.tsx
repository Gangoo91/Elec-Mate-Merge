import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { getDefaultAssumptions } from '@/utils/defaultAssumptions';
import type { SiteVisit } from '@/types/siteVisit';

interface ScopeOfWorksEditorProps {
  visit: SiteVisit;
  assumptions: string;
  onAssumptionsChange: (val: string) => void;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
      {children}
    </div>
  );
}

/** Hairline key/value row used throughout the scope document */
function Row({ label, value, first }: { label: string; value: React.ReactNode; first?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-3 px-3.5 py-2',
        !first && 'border-t border-white/[0.05]'
      )}
    >
      <span className="text-[12px] text-white/55">{label}</span>
      <span className="text-right text-[12.5px] font-medium text-white">{value}</span>
    </div>
  );
}

/**
 * The scope document, rendered in the v2 editorial language — eyebrow
 * sections and hairline key/value tables. What the client will see, minus
 * the branding the PDF adds.
 */
export const ScopeOfWorksEditor = ({
  visit,
  assumptions,
  onAssumptionsChange,
}: ScopeOfWorksEditorProps) => {
  const globalPrompts = visit.prompts.filter((p) => !p.roomId && p.response);

  return (
    <div className="space-y-5">
      <div>
        <Eyebrow>SCOPE OF WORKS</Eyebrow>
        <p className="mt-1 text-[12px] text-white/55">
          Built from the walk-round — review before it goes to the client
        </p>
      </div>

      {/* Client + property — one combined hairline table */}
      <div className="overflow-hidden rounded-xl border border-white/[0.08]">
        <Row first label="Client" value={visit.customerName || '—'} />
        {visit.customerPhone && <Row label="Phone" value={visit.customerPhone} />}
        {visit.customerEmail && <Row label="Email" value={visit.customerEmail} />}
        <Row
          label="Property"
          value={
            <>
              {visit.propertyAddress || '—'}
              {visit.propertyPostcode ? `, ${visit.propertyPostcode}` : ''}
            </>
          }
        />
        {visit.propertyType && (
          <Row label="Type" value={<span className="capitalize">{visit.propertyType}</span>} />
        )}
      </div>

      {/* Property assessment */}
      {globalPrompts.length > 0 && (
        <div>
          <Eyebrow>PROPERTY ASSESSMENT</Eyebrow>
          <div className="mt-2 overflow-hidden rounded-xl border border-white/[0.08]">
            {globalPrompts.map((p, i) => (
              <Row key={p.id} first={i === 0} label={p.promptQuestion} value={p.response} />
            ))}
          </div>
        </div>
      )}

      {/* Room-by-room work items */}
      {visit.rooms.map((room) => {
        const roomPrompts = visit.prompts.filter((p) => p.roomId === room.id && p.response);
        return (
          <div key={room.id}>
            <Eyebrow>
              {room.roomName.toUpperCase()} · {room.items.length}{' '}
              {room.items.length === 1 ? 'ITEM' : 'ITEMS'}
            </Eyebrow>
            <div className="mt-2 overflow-hidden rounded-xl border border-white/[0.08]">
              {room.items.length > 0 ? (
                room.items.map((item, i) => (
                  <div
                    key={item.id}
                    className={cn(
                      'flex items-start justify-between gap-3 px-3.5 py-2',
                      i > 0 && 'border-t border-white/[0.05]'
                    )}
                  >
                    <span className="text-[12.5px] text-white">{item.itemDescription}</span>
                    <span className="flex-shrink-0 text-[12.5px] font-medium tabular-nums text-white">
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                ))
              ) : (
                <p className="px-3.5 py-2 text-[12px] italic text-white/45">No items specified</p>
              )}
              {roomPrompts.map((p) => (
                <Row key={p.id} label={p.promptQuestion} value={p.response} />
              ))}
              {room.notes && (
                <p className="border-t border-white/[0.05] px-3.5 py-2 text-[12px] text-white/65">
                  {room.notes}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* Assumptions / exclusions */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Eyebrow>ASSUMPTIONS &amp; EXCLUSIONS</Eyebrow>
          <button
            onClick={() => onAssumptionsChange(getDefaultAssumptions(visit.propertyType, visit))}
            className="flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-[12px] font-medium text-white/55 transition-colors touch-manipulation hover:text-white active:bg-white/[0.06]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset defaults
          </button>
        </div>
        <Textarea
          value={assumptions}
          onChange={(e) => onAssumptionsChange(e.target.value)}
          placeholder="Tap 'Reset defaults' to pre-fill smart assumptions"
          className="min-h-[180px] touch-manipulation rounded-xl border-white/[0.12] bg-[hsl(0_0%_9%)] text-base text-white placeholder:text-white/40 focus:border-elec-yellow/50 focus:ring-elec-yellow/20"
          autoCapitalize="sentences"
          spellCheck
          enterKeyHint="done"
        />
      </div>
    </div>
  );
};

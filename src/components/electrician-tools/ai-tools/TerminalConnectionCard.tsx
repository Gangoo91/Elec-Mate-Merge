/**
 * TerminalConnectionCard — editorial wire connection card.
 *
 * Drops Card chrome for editorial gradient surface. Wire colour swatch
 * preserved (it's load-bearing — the actual cable colour matters), but
 * sized smaller and paired with terminal monogram + connection description.
 */

import { Eyebrow } from '@/components/college/primitives';

interface TerminalConnectionCardProps {
  terminal: string;
  wireColour: string;
  connectionPoint: string;
  notes?: string;
}

const getWireColor = (colour: string) => {
  const colorMap: Record<string, string> = {
    brown: '#8B4513',
    blue: '#0066CC',
    green: '#22C55E',
    yellow: '#EAB308',
    grey: '#6B7280',
    black: '#1a1a1a',
  };
  const lower = colour.toLowerCase();
  if (lower.includes('green') && lower.includes('yellow')) {
    return 'linear-gradient(135deg, #22C55E 50%, #EAB308 50%)';
  }
  return colorMap[lower] || colour;
};

export const TerminalConnectionCard = ({
  terminal,
  wireColour,
  connectionPoint,
  notes,
}: TerminalConnectionCardProps) => {
  return (
    <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] hover:border-elec-yellow/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-4 sm:p-5 transition-colors">
      {/* Terminal label + colour swatch */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <Eyebrow>TERMINAL</Eyebrow>
          <div className="mt-1 font-mono text-[18px] font-semibold tabular-nums text-elec-yellow">
            {terminal}
          </div>
        </div>
        <div
          className="h-9 w-9 rounded-full border border-white/20 shadow-lg shrink-0"
          style={{ background: getWireColor(wireColour) }}
          aria-label={`Wire colour: ${wireColour}`}
        />
      </div>

      {/* Wire colour */}
      <div className="mt-3 pt-3 border-t border-white/[0.06]">
        <Eyebrow>WIRE</Eyebrow>
        <div className="mt-0.5 text-[14px] font-semibold text-white capitalize">
          {wireColour}
        </div>
      </div>

      {/* Connection */}
      <div className="mt-3 pt-3 border-t border-white/[0.06]">
        <Eyebrow>CONNECT TO</Eyebrow>
        <p className="mt-0.5 text-[12.5px] leading-relaxed text-white">{connectionPoint}</p>
      </div>

      {/* Notes */}
      {notes && (
        <div className="mt-3 pt-3 border-t border-white/[0.06]">
          <Eyebrow>NOTES</Eyebrow>
          <p className="mt-0.5 text-[12px] leading-relaxed text-white/85">{notes}</p>
        </div>
      )}
    </div>
  );
};

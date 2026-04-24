import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Regulation {
  id: string;
  regulation_number: string;
  section: string;
  content: string;
  amendment?: string;
  similarity: number;
}

interface RegulationSourcesProps {
  regulations: Regulation[];
  searchMethod?: string;
  /**
   * Optional callback fired when a regulation chip is clicked. When supplied
   * the parent is expected to open a RegulationDetailSheet (or similar) and
   * the inline expand-on-tap behaviour is suppressed.
   */
  onRegulationClick?: (regulationNumber: string) => void;
}

/**
 * RegulationSources — Editorial "Sources" card rendered below an assistant
 * message. Chips in a horizontal scroll row; clicking a chip expands that
 * regulation inline. Similarity rendered as plain tone-coloured text, not
 * a pill.
 *
 * Pass `onRegulationClick` to delegate to a modal/sheet viewer instead of the
 * inline expand behaviour.
 */
const RegulationSources = ({
  regulations,
  searchMethod,
  onRegulationClick,
}: RegulationSourcesProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!regulations || regulations.length === 0) {
    return null;
  }

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const methodLabel =
    searchMethod === 'direct'
      ? 'Direct match'
      : searchMethod === 'vector'
        ? 'AI match'
        : searchMethod === 'keyword'
          ? 'Keyword match'
          : null;

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Header row */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
            Sources · {regulations.length}{' '}
            {regulations.length === 1 ? 'regulation' : 'regulations'}
          </div>
          <div className="mt-0.5 text-[12px] text-white/70">
            BS 7671 A4:2026 cited in this answer
          </div>
        </div>
        {methodLabel && (
          <span className="shrink-0 text-[11px] font-medium text-purple-400">{methodLabel}</span>
        )}
      </div>

      {/* Horizontal chip row */}
      <div className="px-5 pb-3 flex items-center gap-2 overflow-x-auto hide-scrollbar">
        {regulations.map((reg, index) => {
          const id = reg.id || index.toString();
          const isExpanded = expandedId === id;
          const handleClick = () => {
            if (onRegulationClick) {
              onRegulationClick(reg.regulation_number);
              return;
            }
            toggleExpand(id);
          };
          return (
            <button
              key={id}
              onClick={handleClick}
              className={cn(
                'shrink-0 rounded-full px-3 py-1 text-[12px] font-medium transition-colors touch-manipulation',
                'border',
                isExpanded
                  ? 'bg-elec-yellow/15 border-elec-yellow/40 text-elec-yellow'
                  : 'bg-white/[0.02] border-white/[0.08] text-elec-yellow hover:bg-white/[0.06]'
              )}
            >
              Reg {reg.regulation_number}
            </button>
          );
        })}
      </div>

      {/* Expanded regulation */}
      {expandedId !== null && (
        <div className="border-t border-white/[0.06] px-5 py-4 space-y-2">
          {(() => {
            const reg = regulations.find(
              (r, i) => (r.id || i.toString()) === expandedId
            );
            if (!reg) return null;
            const similarityPct =
              searchMethod === 'direct' || reg.similarity >= 0.95
                ? 95
                : Math.round(reg.similarity * 100);
            const similarityTone =
              similarityPct >= 80
                ? 'text-emerald-400'
                : similarityPct >= 60
                  ? 'text-elec-yellow'
                  : 'text-white/55';
            return (
              <>
                <div className="flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
                      Reg {reg.regulation_number}
                      {reg.amendment && (
                        <span className="ml-2 text-white/55">· {reg.amendment}</span>
                      )}
                    </div>
                    <div className="mt-1 text-[15px] font-semibold text-white tracking-tight">
                      {reg.section}
                    </div>
                  </div>
                  <div className={cn('shrink-0 text-[11px] font-medium', similarityTone)}>
                    {similarityPct}% match
                  </div>
                </div>
                <p className="text-[13px] leading-relaxed text-white/70 whitespace-pre-wrap">
                  {reg.content}
                </p>
              </>
            );
          })()}
        </div>
      )}

      {/* Footer line */}
      <div className="border-t border-white/[0.06] px-5 py-3 text-[11px] text-white/55">
        Sourced from BS 7671:2018 + A4:2026 database
      </div>
    </div>
  );
};

export default RegulationSources;

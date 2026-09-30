import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useHaptic } from '@/hooks/useHaptic';

interface SymbolCountPanelProps {
  counts: { id: string; name: string; category: string; count: number }[];
  circuits?: {
    ref: string;
    label?: string;
    name: string;
    count: number;
    colour: string;
    /** From the linked EIC (planResults): a dot in the status colour, and its word. */
    result?: { colour: string; text: string };
  }[];
  hidden?: boolean;
  mobile?: boolean;
  bottomOffset?: number;
  /** Opens the board schedule and single-line diagram. */
  onOpenSchedule?: () => void;
  /** Points at a circuit on the drawing. */
  onShowCircuit?: (ref: string) => void;
}

const segOn = 'bg-elec-yellow text-black font-semibold';
const segOff = 'text-white font-medium hover:bg-white/[0.06]';

/**
 * The floating tally over the canvas: what is on the drawing, and which
 * circuit each item is on. Tapping a circuit shows it on the plan.
 */
export const SymbolCountPanel = ({
  counts,
  circuits,
  hidden = false,
  mobile = false,
  bottomOffset = 0,
  onOpenSchedule,
  onShowCircuit,
}: SymbolCountPanelProps) => {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<'items' | 'circuits'>('items');
  const haptic = useHaptic();

  if (counts.length === 0 || hidden) return null;

  const totalItems = counts.reduce((sum, s) => sum + s.count, 0);
  const circuitCount = circuits?.length ?? 0;
  const showCircuits = tab === 'circuits' && circuitCount > 0;

  const grouped = counts.reduce<Record<string, { name: string; count: number }[]>>((acc, item) => {
    (acc[item.category] ??= []).push({ name: item.name, count: item.count });
    return acc;
  }, {});
  const categoryOrder = Object.keys(grouped).sort();

  return (
    <div
      className={`absolute z-20 overflow-hidden rounded-2xl border border-white/[0.1] bg-black/80 shadow-2xl backdrop-blur-xl ${
        mobile
          ? 'left-2 right-2'
          : // Desktop clears the vertical tool rail (left-3, 150px wide).
            `left-4 lg:left-[178px] ${expanded ? 'w-[300px]' : 'w-auto'}`
      }`}
      // On phones the canvas scale bar sits just above the toolbar; clear it.
      style={{ bottom: `${(mobile ? 128 : 112) + bottomOffset}px` }}
    >
      <button
        type="button"
        onClick={() => {
          haptic.selection();
          setExpanded(!expanded);
        }}
        aria-expanded={expanded}
        className="flex h-11 w-full items-center justify-between gap-4 px-4 touch-manipulation"
      >
        <span className="text-[13px] font-semibold tabular-nums text-white">
          {totalItems} item{totalItems !== 1 ? 's' : ''}
          {circuitCount > 0 && (
            <span className="font-medium">
              {' '}
              · {circuitCount} circuit{circuitCount !== 1 ? 's' : ''}
            </span>
          )}
        </span>
        {expanded ? (
          <ChevronDown className="h-4 w-4 text-white" />
        ) : (
          <ChevronUp className="h-4 w-4 text-white" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-white/[0.1] px-3 pb-3 pt-2">
          {circuitCount > 0 && (
            <div className="mb-2 flex rounded-xl bg-white/[0.06] p-1">
              {(
                [
                  ['items', 'Items'],
                  ['circuits', 'Circuits'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    haptic.selection();
                    setTab(id);
                  }}
                  className={`h-11 flex-1 rounded-lg text-[13px] transition-colors touch-manipulation ${tab === id ? segOn : segOff}`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {!showCircuits && (
            <div
              className={`${mobile ? 'max-h-[34vh]' : 'max-h-[260px]'} space-y-3 overflow-y-auto px-1`}
            >
              {categoryOrder.map((cat) => (
                <div key={cat}>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-elec-yellow">
                    {cat}
                  </p>
                  {grouped[cat].map((item) => (
                    <div key={item.name} className="flex items-center justify-between py-0.5">
                      <span className="mr-3 truncate text-[13px] text-white">{item.name}</span>
                      <span className="text-[13px] font-semibold tabular-nums text-white">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {showCircuits && circuits && (
            <>
              <div className={`${mobile ? 'max-h-[30vh]' : 'max-h-[240px]'} overflow-y-auto`}>
                {circuits.map((c) => (
                  <button
                    key={c.ref}
                    type="button"
                    disabled={!onShowCircuit}
                    onClick={() => {
                      haptic.selection();
                      // On a phone the open panel would sit over what it points at.
                      if (mobile) setExpanded(false);
                      onShowCircuit?.(c.ref);
                    }}
                    className="flex min-h-11 w-full items-center gap-3 rounded-lg px-1 text-left touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.1]"
                  >
                    <span
                      className="h-5 w-[3px] shrink-0 rounded-full"
                      style={{ backgroundColor: c.colour }}
                    />
                    <span className="min-w-9 shrink-0 text-[13px] font-bold tabular-nums text-white">
                      {c.label ?? c.ref}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[13px] text-white">{c.name}</span>
                    {c.result && (
                      <span className="flex shrink-0 items-center gap-1 text-[12px] text-white">
                        <span
                          aria-hidden
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: c.result.colour }}
                        />
                        {c.result.text}
                      </span>
                    )}
                    <span className="text-[13px] font-semibold tabular-nums text-white">
                      {c.count}
                    </span>
                  </button>
                ))}
              </div>
              {onOpenSchedule && (
                <button
                  type="button"
                  onClick={() => {
                    haptic.selection();
                    onOpenSchedule();
                  }}
                  className="mt-2 h-11 w-full rounded-xl bg-elec-yellow text-[13px] font-semibold text-black touch-manipulation active:scale-[0.98]"
                >
                  Board schedule and single line
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

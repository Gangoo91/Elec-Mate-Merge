import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SymbolCountPanelProps {
  counts: { id: string; name: string; category: string; count: number }[];
}

export const SymbolCountPanel = ({ counts }: SymbolCountPanelProps) => {
  const [expanded, setExpanded] = useState(false);

  if (counts.length === 0) return null;

  const totalItems = counts.reduce((sum, s) => sum + s.count, 0);

  // Group by category
  const grouped = counts.reduce<Record<string, { name: string; count: number }[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push({ name: item.name, count: item.count });
    return acc;
  }, {});

  const categoryOrder = Object.keys(grouped).sort();

  return (
    <div className="absolute bottom-28 left-4 z-20 rounded-xl bg-black/70 backdrop-blur-lg min-w-[140px] max-w-[200px]">
      {/* Pill toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-3 py-1.5 touch-manipulation"
      >
        <span className="text-white text-xs font-medium">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
        {expanded ? (
          <ChevronDown className="h-3.5 w-3.5 text-white" />
        ) : (
          <ChevronUp className="h-3.5 w-3.5 text-white" />
        )}
      </button>

      {/* Expanded list */}
      {expanded && (
        <div className="max-h-[200px] overflow-y-auto px-3 pb-2 space-y-1.5">
          {categoryOrder.map((cat) => (
            <div key={cat}>
              <p className="text-elec-yellow text-[10px] uppercase font-semibold tracking-wide mt-1">
                {cat}
              </p>
              {grouped[cat].map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="text-white text-xs truncate mr-2">{item.name}</span>
                  <span className="text-white text-xs font-medium tabular-nums">{item.count}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

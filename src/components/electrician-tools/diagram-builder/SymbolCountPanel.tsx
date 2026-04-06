import { useState } from 'react';
import { ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { CIRCUIT_COLOURS } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';

interface SymbolCountPanelProps {
  counts: { id: string; name: string; category: string; count: number }[];
  circuits?: { ref: string; name: string; count: number; colour: string }[];
}

export const SymbolCountPanel = ({ counts, circuits }: SymbolCountPanelProps) => {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<'items' | 'circuits'>('items');

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
    <div className="absolute bottom-28 left-4 z-20 rounded-xl bg-black/70 backdrop-blur-lg min-w-[140px] max-w-[220px]">
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
        <div className="px-3 pb-2">
          {/* Tab pills */}
          {circuits && circuits.length > 0 && (
            <div className="flex gap-1 mb-1.5">
              <button
                onClick={() => setTab('items')}
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium touch-manipulation ${tab === 'items' ? 'bg-elec-yellow text-black' : 'bg-white/10 text-white'}`}
              >
                Items
              </button>
              <button
                onClick={() => setTab('circuits')}
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium touch-manipulation flex items-center gap-1 ${tab === 'circuits' ? 'bg-elec-yellow text-black' : 'bg-white/10 text-white'}`}
              >
                <Zap className="h-2.5 w-2.5" />
                Circuits
              </button>
            </div>
          )}

          {tab === 'items' && (
            <div className="max-h-[200px] overflow-y-auto space-y-1.5">
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

          {tab === 'circuits' && circuits && (
            <div className="max-h-[200px] overflow-y-auto space-y-1">
              {circuits.map((c) => (
                <div key={c.ref} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.colour }} />
                  <span className="text-white text-xs font-semibold min-w-[28px]">{c.ref}</span>
                  <span className="text-white text-xs truncate flex-1">{c.name}</span>
                  <span className="text-white text-xs font-medium tabular-nums">{c.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import { useState, useEffect } from 'react';
import { symbolRegistry, categories, type SymbolCategory } from './symbols/symbolRegistry';
import { loadSymbolSvg, getSymbolSvgSync } from './symbols/svgLoader';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface SymbolLibraryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSymbolSelect: (symbolId: string) => void;
  selectedSymbolId: string | null;
}

/** Small component that loads + renders a symbol SVG preview */
const SymbolPreview = ({ symbolId }: { symbolId: string }) => {
  const [svgHtml, setSvgHtml] = useState<string>(() => getSymbolSvgSync(symbolId) || '');

  useEffect(() => {
    if (!svgHtml) {
      loadSymbolSvg(symbolId).then(setSvgHtml);
    }
  }, [symbolId, svgHtml]);

  if (!svgHtml) return <div className="w-10 h-10 rounded bg-white/5" />;

  // The SVG loader replaces currentColor with #000000 for canvas rendering.
  // For the preview on dark background, swap to yellow (#EAB308).
  const previewHtml = svgHtml
    .replace(/#000000/g, '#EAB308')
    .replace(/currentColor/g, '#EAB308');

  return (
    <div
      className="w-10 h-10"
      dangerouslySetInnerHTML={{ __html: previewHtml }}
    />
  );
};

export const SymbolLibrary = ({
  open,
  onOpenChange,
  onSymbolSelect,
  selectedSymbolId,
}: SymbolLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<SymbolCategory | 'all'>('all');
  const [quickPackFilter, setQuickPackFilter] = useState<string[] | null>(null);

  const filteredSymbols = symbolRegistry.filter((symbol) => {
    if (quickPackFilter) {
      return quickPackFilter.includes(symbol.id);
    }
    const matchesSearch =
      !searchTerm ||
      symbol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      symbol.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || symbol.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[70vh] p-0 rounded-t-2xl overflow-hidden bg-elec-card border-white/10 flex flex-col"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <SheetHeader className="px-4 pb-3">
          <SheetTitle className="text-white text-lg font-semibold">Symbols</SheetTitle>
          <div className="relative mt-2">
            {!searchTerm && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
            )}
            <Input
              type="text"
              placeholder="Search symbols..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                'h-11 bg-elec-dark border-white/10 text-white text-base touch-manipulation',
                !searchTerm && 'pl-9'
              )}
            />
          </div>
        </SheetHeader>

        {/* Quick Packs — common room-specific symbol sets */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {[
              { label: 'Kitchen', symbols: ['socket-double-13a', 'socket-cooker-45a', 'socket-fused-spur', 'light-ceiling', 'switch-1way', 'extractor-fan', 'socket-switched-fused-spur'] },
              { label: 'Bedroom', symbols: ['socket-double-13a', 'light-ceiling', 'switch-2way', 'smoke-detector', 'socket-usb', 'socket-tv-aerial'] },
              { label: 'Bathroom', symbols: ['light-downlight', 'switch-pull-cord', 'socket-shaver', 'extractor-fan', 'light-bulkhead'] },
              { label: 'Living Room', symbols: ['socket-double-13a', 'light-ceiling', 'switch-dimmer', 'socket-tv-aerial', 'socket-data', 'smoke-detector'] },
              { label: 'Hallway', symbols: ['light-ceiling', 'switch-2way', 'smoke-detector', 'co-detector'] },
            ].map((pack) => (
              <button
                key={pack.label}
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                  setQuickPackFilter(pack.symbols);
                }}
                className={cn(
                  'flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-medium touch-manipulation active:scale-95 whitespace-nowrap',
                  quickPackFilter === pack.symbols
                    ? 'bg-elec-yellow/30 border border-elec-yellow/50 text-elec-yellow'
                    : 'bg-elec-yellow/10 border border-elec-yellow/20 text-elec-yellow'
                )}
              >
                {pack.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category pills — horizontal scroll */}
        <div className="flex gap-1.5 overflow-x-auto px-4 pb-3 scrollbar-hide">
          <button
            onClick={() => { setActiveCategory('all'); setQuickPackFilter(null); }}
            className={cn(
              'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all touch-manipulation h-8',
              activeCategory === 'all' && !quickPackFilter
                ? 'bg-elec-yellow text-black'
                : 'bg-white/5 border border-white/10 text-white'
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setQuickPackFilter(null); }}
              className={cn(
                'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all touch-manipulation whitespace-nowrap h-8',
                activeCategory === cat.id && !quickPackFilter
                  ? 'bg-elec-yellow text-black'
                  : 'bg-white/5 border border-white/10 text-white'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 4-col symbol grid — scrollable */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-6">
          <div className="grid grid-cols-4 gap-2">
            {filteredSymbols.map((symbol) => (
              <button
                key={symbol.id}
                onClick={() => onSymbolSelect(symbol.id)}
                className={cn(
                  'flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border transition-all touch-manipulation min-h-[80px]',
                  selectedSymbolId === symbol.id
                    ? 'border-elec-yellow bg-elec-yellow/10'
                    : 'border-white/10 bg-white/5 active:bg-white/10'
                )}
              >
                <SymbolPreview symbolId={symbol.id} />
                <span className="text-[10px] text-white text-center leading-tight line-clamp-2">
                  {symbol.name}
                </span>
              </button>
            ))}
          </div>

          {filteredSymbols.length === 0 && (
            <div className="text-center text-white/40 py-8 text-sm">
              No symbols found
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

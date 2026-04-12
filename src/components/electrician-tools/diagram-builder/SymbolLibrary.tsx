import { useState, useEffect, useRef } from 'react';
import { symbolRegistry, categories, type SymbolCategory } from './symbols/symbolRegistry';
import { loadSymbolSvg, getSymbolSvgSync } from './symbols/svgLoader';
import { Input } from '@/components/ui/input';
import { Search, Minus, Plus } from 'lucide-react';
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
  onSymbolSelect: (symbolId: string, quantity: number) => void;
  selectedSymbolId: string | null;
}

/** Small component that loads + renders a symbol SVG preview */
const SymbolPreview = ({ symbolId }: { symbolId: string }) => {
  const [svgHtml, setSvgHtml] = useState<string>(() => getSymbolSvgSync(symbolId) || '');

  useEffect(() => {
    if (!svgHtml) {
      loadSymbolSvg(symbolId).then(setSvgHtml);
    }
  }, [symbolId]);

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
  const [searchActive, setSearchActive] = useState(false);
  const [pendingSymbolId, setPendingSymbolId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Reset search state when sheet closes
  useEffect(() => {
    if (!open) {
      setSearchActive(false);
      setSearchTerm('');
      setPendingSymbolId(null);
      setQuantity(1);
    }
  }, [open]);

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

  const pendingSymbol = pendingSymbolId ? symbolRegistry.find((s) => s.id === pendingSymbolId) : null;

  const handleSymbolTap = (symbolId: string) => {
    if (pendingSymbolId === symbolId) {
      // Tapping same symbol again — deselect
      setPendingSymbolId(null);
      setQuantity(1);
    } else {
      setPendingSymbolId(symbolId);
      setQuantity(1);
    }
  };

  const handlePlace = () => {
    if (pendingSymbolId) {
      onSymbolSelect(pendingSymbolId, quantity);
      setPendingSymbolId(null);
      setQuantity(1);
    }
  };

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
          <SheetTitle className="text-white text-lg font-semibold">Electrical Items</SheetTitle>
          <div className="relative mt-2">
            {!searchActive ? (
              // Tappable search bar — does NOT focus an input or trigger keyboard
              <button
                type="button"
                onClick={() => {
                  setSearchActive(true);
                  setTimeout(() => searchInputRef.current?.focus(), 50);
                }}
                className="w-full h-11 bg-elec-dark border border-white/10 rounded-md px-3 flex items-center gap-2 touch-manipulation"
              >
                <Search className="h-4 w-4 text-white flex-shrink-0" />
                <span className="text-white text-base">Search items or fittings...</span>
              </button>
            ) : (
              <>
                {!searchTerm && (
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                )}
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search items or fittings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onBlur={() => {
                    if (!searchTerm) setSearchActive(false);
                  }}
                  className={cn(
                    'h-11 bg-elec-dark border-white/10 text-white text-base touch-manipulation',
                    !searchTerm && 'pl-9'
                  )}
                />
              </>
            )}
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
                onClick={() => handleSymbolTap(symbol.id)}
                className={cn(
                  'flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border transition-all touch-manipulation min-h-[80px]',
                  pendingSymbolId === symbol.id
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
            <div className="text-center text-white py-8 text-sm">
              No symbols found
            </div>
          )}
        </div>

        {/* Quantity picker + Place button — shown when a symbol is selected */}
        {pendingSymbol && (
          <div className="px-4 py-3 border-t border-white/10 bg-elec-dark flex items-center gap-3">
            <div className="flex items-center gap-1">
              <SymbolPreview symbolId={pendingSymbol.id} />
              <span className="text-white text-xs font-medium ml-1 max-w-[100px] truncate">{pendingSymbol.name}</span>
            </div>
            <div className="flex items-center gap-0 ml-auto">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10 rounded-l-lg bg-white/10 flex items-center justify-center touch-manipulation active:bg-white/20"
              >
                <Minus className="h-4 w-4 text-white" />
              </button>
              <div className="h-10 w-12 bg-white/5 flex items-center justify-center border-x border-white/10">
                <span className="text-white text-lg font-bold">{quantity}</span>
              </div>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(20, quantity + 1))}
                className="h-10 w-10 rounded-r-lg bg-white/10 flex items-center justify-center touch-manipulation active:bg-white/20"
              >
                <Plus className="h-4 w-4 text-white" />
              </button>
            </div>
            <button
              type="button"
              onClick={handlePlace}
              className="h-10 px-5 rounded-lg bg-elec-yellow text-black text-sm font-bold touch-manipulation active:scale-95"
            >
              Place {quantity > 1 ? quantity : ''}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

import { AlertTriangle } from 'lucide-react';
import { InventoryItem, formatQuantity } from '@/types/inventory';

interface InventoryLowStockBannerProps {
  items: InventoryItem[];
  onTap: () => void;
}

export function InventoryLowStockBanner({ items, onTap }: InventoryLowStockBannerProps) {
  if (items.length === 0) return null;

  return (
    <button
      type="button"
      onClick={onTap}
      className="w-full rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-left touch-manipulation active:bg-amber-500/15 transition-colors"
    >
      <div className="flex items-center gap-2 mb-1">
        <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0" />
        <p className="text-[14px] font-semibold text-amber-300">
          {items.length} item{items.length !== 1 ? 's' : ''} running low
        </p>
      </div>
      <p className="text-[12px] text-amber-300/70 ml-6">
        {items
          .slice(0, 3)
          .map((i) => `${i.name} (${formatQuantity(i.quantity, i.unit)})`)
          .join(', ')}
        {items.length > 3 ? ` +${items.length - 3} more` : ''}
      </p>
    </button>
  );
}

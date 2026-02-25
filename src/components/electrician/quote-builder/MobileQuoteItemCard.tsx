import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MobileInput } from '@/components/ui/mobile-input';
import { Trash2, Copy, Wrench, Package, Zap } from 'lucide-react';
import { QuoteItem } from '@/types/quote';

interface MobileQuoteItemCardProps {
  item: QuoteItem;
  onUpdate: (itemId: string, updates: Partial<QuoteItem>) => void;
  onRemove: (itemId: string) => void;
  onDuplicate: (item: QuoteItem) => void;
}

export const MobileQuoteItemCard = ({
  item,
  onUpdate,
  onRemove,
  onDuplicate,
}: MobileQuoteItemCardProps) => {
  const [qtyDraft, setQtyDraft] = useState(item.quantity === 0 ? '' : String(item.quantity));
  const [priceDraft, setPriceDraft] = useState(item.unitPrice === 0 ? '' : String(item.unitPrice));

  useEffect(() => { setQtyDraft(item.quantity === 0 ? '' : String(item.quantity)); }, [item.quantity]);
  useEffect(() => { setPriceDraft(item.unitPrice === 0 ? '' : String(item.unitPrice)); }, [item.unitPrice]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'labour':
        return <Wrench className="h-3 w-3" />;
      case 'materials':
        return <Package className="h-3 w-3" />;
      case 'equipment':
        return <Zap className="h-3 w-3" />;
      default:
        return <Package className="h-3 w-3" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'labour':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'materials':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'equipment':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <Card className="p-3 sm:p-4 border-2 border-primary/30 bg-gradient-to-br from-elec-card/80 to-elec-dark/30 shadow-lg space-y-3">
      {/* Header with category icon, price, and delete */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${getCategoryColor(item.category)}`}>
            {getCategoryIcon(item.category)}
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="font-bold text-primary text-lg">£{item.totalPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Prominent delete button */}
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onRemove(item.id)}
          className="h-10 w-10 p-0 bg-red-500/10 border border-red-500/30 text-red-600 hover:bg-red-500/20 flex-shrink-0"
          aria-label="Delete item"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Description */}
      <div>
        <p className="font-medium text-sm line-clamp-2">{item.description}</p>
      </div>

      {/* Quantity and unit price - Editable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <MobileInput
          label="Quantity"
          type="text"
          inputMode="decimal"
          value={qtyDraft}
          onChange={(e) => {
            const val = e.target.value;
            if (val === '' || /^\d*\.?\d*$/.test(val)) setQtyDraft(val);
          }}
          onBlur={() => {
            const parsed = parseFloat(qtyDraft);
            const val = isNaN(parsed) || parsed <= 0 ? 1 : parsed;
            onUpdate(item.id, { quantity: val });
            setQtyDraft(String(val));
          }}
          unit={item.unit}
        />
        <MobileInput
          label="Unit Price"
          type="text"
          inputMode="decimal"
          value={priceDraft}
          onChange={(e) => {
            const val = e.target.value;
            if (val === '' || /^\d*\.?\d*$/.test(val)) setPriceDraft(val);
          }}
          onBlur={() => {
            const parsed = parseFloat(priceDraft);
            const val = isNaN(parsed) ? 0 : parsed;
            onUpdate(item.id, { unitPrice: val });
            setPriceDraft(val === 0 ? '' : String(val));
          }}
          unit="£"
        />
      </div>

      {/* Notes if any */}
      {item.notes && (
        <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
          <span className="font-medium">Notes:</span> {item.notes}
        </div>
      )}

      {/* Action buttons */}
      <div className="pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDuplicate(item)}
          className="w-full h-11 border-primary/30 hover:bg-primary/10 hover:border-primary/50"
          aria-label="Duplicate item"
        >
          <Copy className="h-4 w-4" />
          <span className="ml-2">Duplicate Item</span>
        </Button>
      </div>
    </Card>
  );
};

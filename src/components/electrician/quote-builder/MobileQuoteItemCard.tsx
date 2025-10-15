import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Trash2, Copy, Wrench, Package, Zap } from "lucide-react";
import { QuoteItem } from "@/types/quote";

interface MobileQuoteItemCardProps {
  item: QuoteItem;
  onUpdate: (itemId: string, updates: Partial<QuoteItem>) => void;
  onRemove: (itemId: string) => void;
  onDuplicate: (item: QuoteItem) => void;
}

export const MobileQuoteItemCard = ({ item, onUpdate, onRemove, onDuplicate }: MobileQuoteItemCardProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'labour': return <Wrench className="h-3 w-3" />;
      case 'materials': return <Package className="h-3 w-3" />;
      case 'equipment': return <Zap className="h-3 w-3" />;
      default: return <Package className="h-3 w-3" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'labour': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'materials': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'equipment': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <Card className="p-3 sm:p-4 border-elec-yellow/20 bg-card/50 space-y-3">
      {/* Header with category and price */}
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <Badge variant="outline" className={`${getCategoryColor(item.category)} flex items-center gap-1 text-xs`}>
          {getCategoryIcon(item.category)}
          {item.category}
        </Badge>
        <span className="text-lg font-bold text-elec-yellow shrink-0">
          £{item.totalPrice.toFixed(2)}
        </span>
      </div>

      {/* Description */}
      <div>
        <p className="font-medium text-sm line-clamp-2">{item.description}</p>
      </div>

      {/* Quantity and unit price - Editable */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Quantity</label>
          <div className="relative">
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  onUpdate(item.id, { quantity: 0 });
                } else {
                  const parsed = parseFloat(value);
                  if (!isNaN(parsed) && parsed >= 0) {
                    onUpdate(item.id, { quantity: parsed });
                  }
                }
              }}
              onBlur={(e) => {
                const value = parseFloat(e.target.value);
                if (isNaN(value) || value <= 0) {
                  onUpdate(item.id, { quantity: 1 });
                }
              }}
              className="h-10 text-center text-sm pr-12"
              min="0.1"
              step="0.1"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
              {item.unit}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Unit Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
              £
            </span>
            <Input
              type="number"
              value={item.unitPrice}
              onChange={(e) => onUpdate(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
              className="h-10 text-right text-sm pl-7"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>

      {/* Notes if any */}
      {item.notes && (
        <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
          <span className="font-medium">Notes:</span> {item.notes}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDuplicate(item)}
          className="w-full sm:flex-1 h-9 text-xs border border-elec-yellow/20 hover:bg-elec-yellow/10"
        >
          <Copy className="h-3 w-3 mr-1" />
          Duplicate
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.id)}
          className="w-full sm:flex-1 h-9 text-xs border border-destructive/30 hover:bg-destructive/10 text-destructive"
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Remove
        </Button>
      </div>
    </Card>
  );
};

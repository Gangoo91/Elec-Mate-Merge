import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { Trash2, Copy, Edit3, Package, Wrench, Zap, Hash, DollarSign } from "lucide-react";
import { QuoteItem } from "@/types/quote";

interface QuoteItemsListProps {
  items: QuoteItem[];
  onUpdate: (itemId: string, updates: Partial<QuoteItem>) => void;
  onRemove: (itemId: string) => void;
  onDuplicate: (item: QuoteItem) => void;
}

export const QuoteItemsList = ({ items, onUpdate, onRemove, onDuplicate }: QuoteItemsListProps) => {
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'labour': return <Wrench className="h-4 w-4" />;
      case 'materials': return <Package className="h-4 w-4" />;
      case 'equipment': return <Zap className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  if (items.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-8 text-center">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No items added yet. Add your first quote item above.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Quote Items ({items.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mobile-optimized item cards */}
        <div className="block md:hidden space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="bg-background border border-border">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getCategoryIcon(item.category)}
                        <span className="text-xs uppercase font-medium text-muted-foreground">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="font-medium text-sm leading-tight">{item.description}</h4>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDuplicate(item)}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(item.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <MobileInputWrapper
                        label="Quantity"
                        value={item.quantity.toString()}
                        onChange={(value) => {
                          const parsed = parseFloat(value);
                          if (!isNaN(parsed) && parsed > 0) {
                            onUpdate(item.id, { quantity: parsed });
                          }
                        }}
                        type="number"
                        inputMode="numeric"
                        min="0.1"
                        step="0.1"
                        icon={<Hash className="h-4 w-4" />}
                        className="mb-0"
                      />
                    </div>
                    <div>
                      <MobileInputWrapper
                        label="Unit Price"
                        value={item.unitPrice.toString()}
                        onChange={(value) => {
                          const parsed = parseFloat(value);
                          if (!isNaN(parsed) && parsed >= 0) {
                            onUpdate(item.id, { unitPrice: parsed });
                          }
                        }}
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        min="0"
                        icon={<DollarSign className="h-4 w-4" />}
                        unit="£"
                        className="mb-0"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total:</span>
                      <span className="font-semibold text-lg">£{item.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Desktop table view */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-24">Qty</TableHead>
                <TableHead className="w-32">Unit Price</TableHead>
                <TableHead className="w-32">Total</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(item.category)}
                      <span className="capitalize">{item.category}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <MobileInputWrapper
                      value={item.quantity.toString()}
                      onChange={(value) => {
                        const parsed = parseFloat(value);
                        if (!isNaN(parsed) && parsed > 0) {
                          onUpdate(item.id, { quantity: parsed });
                        }
                      }}
                      type="number"
                      inputMode="numeric"
                      min="0.1"
                      step="0.1"
                      className="mb-0"
                    />
                  </TableCell>
                  <TableCell>
                    <MobileInputWrapper
                      value={item.unitPrice.toString()}
                      onChange={(value) => {
                        const parsed = parseFloat(value);
                        if (!isNaN(parsed) && parsed >= 0) {
                          onUpdate(item.id, { unitPrice: parsed });
                        }
                      }}
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      min="0"
                      unit="£"
                      className="mb-0"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    £{item.totalPrice.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDuplicate(item)}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(item.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2 font-semibold bg-muted/50">
                <TableCell colSpan={4}>Subtotal</TableCell>
                <TableCell className="font-bold text-lg">£{total.toFixed(2)}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Mobile total summary */}
        <div className="block md:hidden mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex justify-between items-center">
            <span className="text-base font-medium">Subtotal:</span>
            <span className="text-xl font-bold">£{total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
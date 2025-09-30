import { useState } from 'react';
import { InvoiceItem } from '@/types/invoice';
import { MobileButton } from '@/components/ui/mobile-button';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Calculator, AlertCircle, Wrench, Package, Zap } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface InvoiceItemsStepProps {
  additionalItems: InvoiceItem[];
  onAddItem: (item: Omit<InvoiceItem, 'id' | 'totalPrice'>) => void;
  onUpdateItem: (itemId: string, updates: Partial<InvoiceItem>) => void;
  onRemoveItem: (itemId: string) => void;
}

export const InvoiceItemsStep = ({
  additionalItems,
  onAddItem,
  onRemoveItem,
}: InvoiceItemsStepProps) => {
  const [newItem, setNewItem] = useState({
    description: '',
    quantity: 1,
    unit: 'each',
    unitPrice: 0,
    category: 'materials' as const,
    notes: '',
  });

  const handleAddItem = () => {
    if (!newItem.description.trim()) {
      toast({
        title: 'Description required',
        description: 'Please enter a description for the item',
        variant: 'destructive',
      });
      return;
    }
    
    if (newItem.unitPrice <= 0) {
      toast({
        title: 'Invalid price',
        description: 'Unit price must be greater than 0',
        variant: 'destructive',
      });
      return;
    }

    onAddItem(newItem);
    setNewItem({
      description: '',
      quantity: 1,
      unit: 'each',
      unitPrice: 0,
      category: 'materials',
      notes: '',
    });
    
    toast({
      title: 'Item added',
      description: 'Additional item has been added to the invoice',
      variant: 'success',
    });
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  const currentTotal = newItem.quantity * newItem.unitPrice;
  const additionalTotal = additionalItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Additional Items</h2>
        <p className="text-sm text-muted-foreground">
          Add any extra work or materials not included in the original quote.
        </p>
      </div>

      {/* Running Total Card */}
      {additionalItems.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                <span className="font-medium">Additional Items Total</span>
              </div>
              <span className="text-xl font-bold text-primary">
                {formatCurrency(additionalTotal)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add New Item Form */}
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Manual Item Entry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                <Input
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Item description"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-manual" className="text-sm font-medium">Category</Label>
                <Select value={newItem.category} onValueChange={(value: any) => setNewItem({ ...newItem, category: value })}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-background border shadow-lg">
                    <SelectItem value="labour">
                      <div className="flex items-center gap-2">
                        <Wrench className="h-4 w-4" />
                        Labour
                      </div>
                    </SelectItem>
                    <SelectItem value="materials">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Materials
                      </div>
                    </SelectItem>
                    <SelectItem value="equipment">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Equipment
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-sm font-medium">Quantity</Label>
                <Input
                  type="number"
                  value={newItem.quantity === 0 ? "" : newItem.quantity}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      setNewItem(prev => ({ ...prev, quantity: 0 }));
                    } else {
                      const parsed = parseFloat(value);
                      if (!isNaN(parsed) && parsed >= 0) {
                        setNewItem(prev => ({ ...prev, quantity: parsed }));
                      }
                    }
                  }}
                  onBlur={(e) => {
                    const value = parseFloat(e.target.value);
                    if (isNaN(value) || value <= 0) {
                      setNewItem(prev => ({ ...prev, quantity: 1 }));
                    }
                  }}
                  min="0.1"
                  step="0.1"
                  className="h-12"
                  placeholder="Enter quantity"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit-price" className="text-sm font-medium">Unit Price (£)</Label>
                <Input
                  type="number"
                  value={newItem.unitPrice}
                  onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
                  min="0"
                  step="0.01"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit" className="text-sm font-medium">Unit</Label>
                <Select value={newItem.unit} onValueChange={(value) => setNewItem(prev => ({ ...prev, unit: value }))}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-background border shadow-lg">
                    <SelectItem value="each">Each</SelectItem>
                    <SelectItem value="hour">Hour</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="metre">Metre</SelectItem>
                    <SelectItem value="linear metre">Linear Metre</SelectItem>
                    <SelectItem value="m²">Square Metre</SelectItem>
                    <SelectItem value="point">Point</SelectItem>
                    <SelectItem value="circuit">Circuit</SelectItem>
                    <SelectItem value="way">Way</SelectItem>
                    <SelectItem value="core">Core</SelectItem>
                    <SelectItem value="pack">Pack</SelectItem>
                    <SelectItem value="roll">Roll</SelectItem>
                    <SelectItem value="box">Box</SelectItem>
                    <SelectItem value="installation">Installation</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="panel">Panel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">Notes (Optional)</Label>
                <Textarea
                  value={newItem.notes}
                  onChange={(e) => setNewItem(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes"
                  rows={2}
                />
              </div>
            </div>

            <Button onClick={handleAddItem} className="w-full">
              Add Item to Invoice
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Items List */}
      {additionalItems.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Additional Items ({additionalItems.length})</span>
              <span className="text-sm font-normal text-muted-foreground">
                Total: {formatCurrency(additionalTotal)}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {additionalItems.map((item) => (
              <Card key={item.id} className="p-4 hover:bg-accent/50 transition-colors">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium">{item.description}</h4>
                      <span className="text-sm font-bold text-primary whitespace-nowrap">
                        {formatCurrency(item.totalPrice)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.quantity} {item.unit} × {formatCurrency(item.unitPrice)}
                    </div>
                    {item.notes && (
                      <p className="text-sm text-muted-foreground">{item.notes}</p>
                    )}
                  </div>
                  <MobileButton
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      onRemoveItem(item.id);
                      toast({
                        title: 'Item removed',
                        description: 'The item has been removed from the invoice',
                      });
                    }}
                    className="text-destructive shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </MobileButton>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card className="p-8 text-center border-dashed">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            No additional items yet. Add items above to include extra work or materials.
          </p>
        </Card>
      )}
    </div>
  );
};

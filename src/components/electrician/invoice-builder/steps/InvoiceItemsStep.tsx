import { useState } from 'react';
import { InvoiceItem } from '@/types/invoice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    if (newItem.description && newItem.unitPrice > 0) {
      onAddItem(newItem);
      setNewItem({
        description: '',
        quantity: 1,
        unit: 'each',
        unitPrice: 0,
        category: 'materials',
        notes: '',
      });
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Additional Items</h2>
        <p className="text-muted-foreground">
          Add any extra work or materials not included in the original quote.
        </p>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Add New Item</h3>
        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Enter item description"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={newItem.category}
                onValueChange={(value: any) => setNewItem({ ...newItem, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="labour">Labour</SelectItem>
                  <SelectItem value="materials">Materials</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0.01"
                step="0.01"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Select
                value={newItem.unit}
                onValueChange={(value) => setNewItem({ ...newItem, unit: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="each">Each</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="metres">Metres</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="unitPrice">Unit Price (£)</Label>
              <Input
                id="unitPrice"
                type="number"
                min="0"
                step="0.01"
                value={newItem.unitPrice}
                onChange={(e) => setNewItem({ ...newItem, unitPrice: parseFloat(e.target.value) })}
              />
            </div>
            <div className="flex items-end">
              <div className="text-sm">
                <div className="text-muted-foreground">Total</div>
                <div className="font-bold text-lg">
                  {formatCurrency(newItem.quantity * newItem.unitPrice)}
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={newItem.notes}
              onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
              placeholder="Additional details about this item"
              rows={2}
            />
          </div>

          <Button onClick={handleAddItem} className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </Card>

      {additionalItems.length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Additional Items ({additionalItems.length})</h3>
          <div className="space-y-2">
            {additionalItems.map((item) => (
              <div key={item.id} className="flex justify-between items-start p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{item.description}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.quantity} {item.unit} × {formatCurrency(item.unitPrice)} = {formatCurrency(item.totalPrice)}
                  </div>
                  {item.notes && (
                    <div className="text-sm text-muted-foreground mt-1">{item.notes}</div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveItem(item.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

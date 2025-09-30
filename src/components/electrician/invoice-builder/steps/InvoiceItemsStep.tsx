import { useState } from 'react';
import { InvoiceItem } from '@/types/invoice';
import { MobileButton } from '@/components/ui/mobile-button';
import { MobileInputWrapper } from '@/components/ui/mobile-input-wrapper';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Calculator, AlertCircle } from 'lucide-react';
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
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add New Item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Description Section */}
          <div className="space-y-4">
            <MobileInputWrapper
              label="Description"
              placeholder="e.g., Additional socket installation"
              value={newItem.description}
              onChange={(e: any) => setNewItem({ ...newItem, description: e.target.value })}
              hint="Brief description of the work or material"
            />
          </div>

          {/* Category & Type Section */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-semibold text-elec-light flex items-center gap-2">
              <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
              Category
            </Label>
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

          {/* Pricing Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-4 w-4 text-elec-yellow" />
              <h3 className="text-sm font-semibold text-elec-light">Pricing Details</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <MobileInputWrapper
                label="Quantity"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0.01"
                value={newItem.quantity.toString()}
                onChange={(e: any) => setNewItem({ ...newItem, quantity: parseFloat(e.target.value) || 0 })}
              />
              
              <div className="space-y-2">
                <Label htmlFor="unit" className="text-sm font-semibold text-elec-light flex items-center gap-2">
                  <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                  Unit
                </Label>
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <MobileInputWrapper
                label="Unit Price"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                value={newItem.unitPrice.toString()}
                onChange={(e: any) => setNewItem({ ...newItem, unitPrice: parseFloat(e.target.value) || 0 })}
                unit="£"
              />
              
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                  <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                  Total
                </Label>
                <div className="h-14 flex items-center justify-center rounded-xl border border-elec-yellow/30 bg-elec-yellow/5">
                  <span className="text-xl font-bold text-elec-yellow">
                    {formatCurrency(currentTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-semibold text-elec-light flex items-center gap-2">
              <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={newItem.notes}
              onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
              placeholder="Additional details about this item"
              rows={3}
              className="rounded-xl border-primary/30 hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200"
            />
          </div>

          {/* Add Button */}
          <MobileButton
            onClick={handleAddItem}
            icon={<Plus className="h-4 w-4" />}
            size="wide"
            className="w-full"
          >
            Add Item to Invoice
          </MobileButton>
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

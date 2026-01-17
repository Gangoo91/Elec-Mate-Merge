import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Plus, 
  Trash2, 
  Package, 
  Calculator,
  Truck,
  ShoppingCart
} from "lucide-react";
import { useCreateMaterialOrder, useNextOrderNumber, useSuppliers, usePriceBook } from "@/hooks/useFinance";
import { useJobs } from "@/hooks/useJobs";
import { useOptionalVoiceFormContext } from "@/contexts/VoiceFormContext";

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

interface CreateOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefillSupplier?: string;
  prefillItem?: string;
}

export function CreateOrderDialog({ open, onOpenChange, prefillSupplier, prefillItem }: CreateOrderDialogProps) {
  const [supplierId, setSupplierId] = useState(prefillSupplier || "");
  const [jobId, setJobId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<OrderItem[]>([]);
  const [newItem, setNewItem] = useState({ name: prefillItem || "", qty: 1, price: 0 });

  const { data: orderNumber } = useNextOrderNumber();
  const { data: suppliers = [] } = useSuppliers();
  const { data: priceBook = [] } = usePriceBook();
  const { data: jobs = [] } = useJobs();
  const createOrderMutation = useCreateMaterialOrder();

  const activeJobs = jobs.filter(j => j.status === "Active");
  const total = items.reduce((sum, item) => sum + (item.qty * item.price), 0);

  // Voice form registration
  const voiceContext = useOptionalVoiceFormContext();
  
  useEffect(() => {
    if (!open || !voiceContext) return;
    
    voiceContext.registerForm({
      formId: 'create-order',
      formName: 'Create Order',
      fields: [
        { name: 'supplier', label: 'Supplier', type: 'text', required: true },
        { name: 'job', label: 'Linked Job', type: 'text' },
        { name: 'notes', label: 'Notes', type: 'text' },
      ],
      actions: ['add_item'],
      onFillField: (field, value) => {
        const strValue = String(value);
        switch (field) {
          case 'supplier':
            const sup = suppliers.find(s => s.name.toLowerCase().includes(strValue.toLowerCase()));
            if (sup) setSupplierId(sup.id);
            break;
          case 'job':
            const job = activeJobs.find(j => j.title.toLowerCase().includes(strValue.toLowerCase()));
            if (job) setJobId(job.id);
            break;
          case 'notes': setNotes(strValue); break;
        }
      },
      onAction: (action, params) => {
        if (action === 'add_item' && params) {
          setItems(prev => [...prev, {
            id: crypto.randomUUID(),
            name: String(params.name || 'Item'),
            qty: Number(params.qty) || 1,
            price: Number(params.price) || 0
          }]);
        }
      },
      onSubmit: handleSubmit,
      onCancel: () => { resetForm(); onOpenChange(false); },
    });
    
    return () => voiceContext.unregisterForm('create-order');
  }, [open, voiceContext, suppliers, activeJobs]);

  const addItem = () => {
    if (!newItem.name) return;
    setItems([...items, {
      id: crypto.randomUUID(),
      name: newItem.name,
      qty: newItem.qty,
      price: newItem.price
    }]);
    setNewItem({ name: "", qty: 1, price: 0 });
  };

  const addFromPriceBook = (pbItem: any) => {
    setItems([...items, {
      id: crypto.randomUUID(),
      name: pbItem.name,
      qty: 1,
      price: Number(pbItem.buy_price)
    }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItemQty = (id: string, qty: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, qty } : item
    ));
  };

  const handleSubmit = async () => {
    if (!supplierId || items.length === 0) return;

    await createOrderMutation.mutateAsync({
      order_number: orderNumber || `ORD-${new Date().getFullYear()}-001`,
      supplier_id: supplierId,
      job_id: jobId,
      items: items,
      total,
      status: "Processing",
      order_date: new Date().toISOString().split('T')[0],
      delivery_date: null,
      ordered_by: "Admin",
      notes: notes || null
    });

    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setSupplierId("");
    setJobId(null);
    setNotes("");
    setItems([]);
    setNewItem({ name: "", qty: 1, price: 0 });
  };

  const selectedSupplier = suppliers.find(s => s.id === supplierId);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[95vh] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <SheetTitle className="text-lg">New Order</SheetTitle>
                  <p className="text-xs text-muted-foreground">{orderNumber}</p>
                </div>
              </div>
            </div>
          </SheetHeader>

          {/* Content */}
          <ScrollArea className="flex-1 px-4 py-4">
            <div className="space-y-4">
              {/* Supplier */}
              <div className="space-y-2">
                <Label>Supplier *</Label>
                <Select value={supplierId} onValueChange={setSupplierId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                        {supplier.discount_percent > 0 && (
                          <span className="text-success ml-2">({supplier.discount_percent}% off)</span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedSupplier && (
                  <p className="text-xs text-muted-foreground">
                    {selectedSupplier.delivery_days === 0 ? "Same day delivery" : `${selectedSupplier.delivery_days} day delivery`}
                  </p>
                )}
              </div>

              {/* Link to Job */}
              <div className="space-y-2">
                <Label>Link to Job (Optional)</Label>
                <Select value={jobId || "none"} onValueChange={(v) => setJobId(v === "none" ? null : v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No job linked</SelectItem>
                    {activeJobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Order Items */}
              {items.length > 0 && (
                <div className="space-y-2">
                  <Label>Order Items</Label>
                  {items.map((item) => (
                    <Card key={item.id} className="bg-elec-gray">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Input
                                type="number"
                                value={item.qty}
                                onChange={(e) => updateItemQty(item.id, Number(e.target.value))}
                                className="w-16 h-8 text-sm"
                                min={1}
                              />
                              <span className="text-xs text-muted-foreground">× £{item.price.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-bold">£{(item.qty * item.price).toFixed(2)}</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0 mt-1"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-3 w-3 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Add from Price Book */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Quick Add from Price Book
                </Label>
                <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                  {priceBook.slice(0, 8).map((item) => (
                    <Badge
                      key={item.id}
                      variant="outline"
                      className="shrink-0 cursor-pointer touch-feedback hover:bg-elec-yellow/10"
                      onClick={() => addFromPriceBook(item)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      {item.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Add Custom Item */}
              <Card className="bg-muted/30">
                <CardContent className="p-3 space-y-3">
                  <Label className="text-sm">Add Custom Item</Label>
                  <Input
                    placeholder="Item name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Quantity</Label>
                      <Input
                        type="number"
                        value={newItem.qty}
                        onChange={(e) => setNewItem({ ...newItem, qty: Number(e.target.value) })}
                        min={1}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Unit Price (£)</Label>
                      <Input
                        type="number"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                        min={0}
                        step={0.01}
                      />
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={addItem}
                    disabled={!newItem.name}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </CardContent>
              </Card>

              {/* Notes */}
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  placeholder="Delivery instructions, special requests, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[60px]"
                />
              </div>
            </div>
          </ScrollArea>

          {/* Totals Bar */}
          <div className="px-4 py-2 border-t border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Order Total</span>
              </div>
              <span className="text-xl font-bold text-elec-yellow">£{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Footer */}
          <SheetFooter className="px-4 py-3 border-t border-border pb-safe">
            <Button 
              className="w-full"
              onClick={handleSubmit}
              disabled={!supplierId || items.length === 0 || createOrderMutation.isPending}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Place Order
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

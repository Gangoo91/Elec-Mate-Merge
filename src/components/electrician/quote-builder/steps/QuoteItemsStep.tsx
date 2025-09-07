import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Wrench, Package, Zap, FileText, Search } from "lucide-react";
import { QuoteItem, JobTemplate } from "@/types/quote";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobTemplates } from "../JobTemplates";
import { LiveMaterialPricing } from "./LiveMaterialPricing";
import { useQuoteMaterialIntegration } from "@/hooks/useQuoteMaterialIntegration";

interface QuoteItemsStepProps {
  items: QuoteItem[];
  onAdd: (item: Omit<QuoteItem, 'id' | 'totalPrice'>) => void;
  onUpdate: (itemId: string, updates: Partial<QuoteItem>) => void;
  onRemove: (itemId: string) => void;
}

export const QuoteItemsStep = ({ items, onAdd, onUpdate, onRemove }: QuoteItemsStepProps) => {
  const { addMaterialToQuote, addMultipleMaterialsToQuote } = useQuoteMaterialIntegration(onAdd);
  
  const handleTemplateSelect = (template: JobTemplate) => {
    template.items.forEach(item => {
      onAdd(item);
    });
  };
  const [newItem, setNewItem] = useState({
    description: "",
    quantity: 1,
    unit: "each",
    unitPrice: 0,
    category: "labour" as const,
  });

  const handleAddItem = () => {
    if (newItem.description && newItem.unitPrice > 0) {
      onAdd(newItem);
      setNewItem({
        description: "",
        quantity: 1,
        unit: "each",
        unitPrice: 0,
        category: "labour" as const,
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'labour': return <Wrench className="h-4 w-4" />;
      case 'materials': return <Package className="h-4 w-4" />;
      case 'equipment': return <Zap className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <Tabs defaultValue="manual" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="manual" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Manual Entry
        </TabsTrigger>
        <TabsTrigger value="live-pricing" className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Live Pricing
        </TabsTrigger>
        <TabsTrigger value="templates" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Job Templates
        </TabsTrigger>
      </TabsList>

      <TabsContent value="live-pricing">
        <LiveMaterialPricing 
          onAddToQuote={addMaterialToQuote}
          onAddMultipleToQuote={addMultipleMaterialsToQuote}
        />
      </TabsContent>

      <TabsContent value="templates">
        <JobTemplates onSelectTemplate={handleTemplateSelect} />
      </TabsContent>

      <TabsContent value="manual" className="space-y-6">
      {/* Add New Item */}
      <Card className="bg-elec-gray/50 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="h-5 w-5" />
            Add Quote Item
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Description"
                value={newItem.description}
                onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            
            <div>
              <Select value={newItem.category} onValueChange={(value: any) => setNewItem(prev => ({ ...prev, category: value }))}>
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
            
            <div>
              <Input
                type="number"
                placeholder="Qty"
                value={newItem.quantity}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow empty string for deletion, otherwise parse the value
                  if (value === '') {
                    setNewItem(prev => ({ ...prev, quantity: 0 })); // Temporarily set to 0 to allow clearing
                  } else {
                    const parsed = parseInt(value);
                    if (!isNaN(parsed) && parsed >= 0) {
                      setNewItem(prev => ({ ...prev, quantity: parsed }));
                    }
                  }
                }}
                onBlur={(e) => {
                  // Ensure minimum value on blur
                  const value = parseInt(e.target.value);
                  if (isNaN(value) || value <= 0) {
                    setNewItem(prev => ({ ...prev, quantity: 1 }));
                  }
                }}
              />
            </div>
            
            <div>
              <Input
                placeholder="£ Price"
                type="number"
                step="0.01"
                value={newItem.unitPrice}
                onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
              />
            </div>
            
            <div>
              <Button 
                onClick={handleAddItem}
                className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                disabled={!newItem.description || newItem.unitPrice <= 0}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items List */}
      {items.length > 0 ? (
        <Card className="bg-elec-gray border-elec-yellow/20">
          <CardHeader>
            <CardTitle>Quote Items ({items.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
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
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Allow empty string for deletion, otherwise parse the value
                          if (value === '') {
                            onUpdate(item.id, { quantity: 0 }); // Temporarily set to 0 to allow clearing
                          } else {
                            const parsed = parseInt(value);
                            if (!isNaN(parsed) && parsed >= 0) {
                              onUpdate(item.id, { quantity: parsed });
                            }
                          }
                        }}
                        onBlur={(e) => {
                          // Ensure minimum value on blur
                          const value = parseInt(e.target.value);
                          if (isNaN(value) || value <= 0) {
                            onUpdate(item.id, { quantity: 1 });
                          }
                        }}
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => onUpdate(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      £{item.totalPrice.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 font-semibold">
                  <TableCell colSpan={4}>Subtotal</TableCell>
                  <TableCell>£{total.toFixed(2)}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-elec-gray border-elec-yellow/20">
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No items added yet. Add your first quote item above.</p>
          </CardContent>
        </Card>
      )}
      </TabsContent>
    </Tabs>
  );
};
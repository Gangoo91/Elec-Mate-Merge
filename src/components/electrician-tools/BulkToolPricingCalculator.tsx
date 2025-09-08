import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calculator, Plus, Minus, Package, TrendingDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ToolItem } from "@/hooks/useToolsData";

interface BulkItem {
  tool: ToolItem;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
}

interface BulkToolPricingCalculatorProps {
  categoryName: string;
  tools?: ToolItem[];
}

const BulkToolPricingCalculator: React.FC<BulkToolPricingCalculatorProps> = ({
  categoryName,
  tools = []
}) => {
  const [bulkItems, setBulkItems] = useState<BulkItem[]>([]);
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const isMobile = useIsMobile();

  // Use only provided tools - no fallback mock data
  const availableTools: ToolItem[] = tools.slice(0, 10);

  const parsePrice = (priceStr: string): number => {
    return parseFloat(priceStr.replace(/[£,]/g, '')) || 0;
  };

  const getBulkDiscount = (quantity: number): number => {
    if (quantity >= 20) return 15;
    if (quantity >= 10) return 10;
    if (quantity >= 5) return 5;
    return 0;
  };

  const addToBulk = () => {
    if (!selectedTool) return;
    
    const unitPrice = parsePrice(selectedTool.price);
    const discountPercent = getBulkDiscount(quantity);
    
    const existingIndex = bulkItems.findIndex(item => item.tool.id === selectedTool.id);
    
    if (existingIndex >= 0) {
      // Update existing item
      setBulkItems(prev => prev.map((item, index) => 
        index === existingIndex 
          ? { ...item, quantity: item.quantity + quantity, discountPercent: getBulkDiscount(item.quantity + quantity) }
          : item
      ));
    } else {
      // Add new item
      setBulkItems(prev => [...prev, {
        tool: selectedTool,
        quantity,
        unitPrice,
        discountPercent
      }]);
    }
    
    setSelectedTool(null);
    setQuantity(1);
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setBulkItems(prev => prev.filter((_, i) => i !== index));
      return;
    }
    
    setBulkItems(prev => prev.map((item, i) => 
      i === index 
        ? { ...item, quantity: newQuantity, discountPercent: getBulkDiscount(newQuantity) }
        : item
    ));
  };

  const totals = useMemo(() => {
    const subtotal = bulkItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const totalDiscount = bulkItems.reduce((sum, item) => {
      const itemSubtotal = item.unitPrice * item.quantity;
      return sum + (itemSubtotal * item.discountPercent / 100);
    }, 0);
    const total = subtotal - totalDiscount;
    
    return {
      subtotal,
      totalDiscount,
      total,
      itemCount: bulkItems.reduce((sum, item) => sum + item.quantity, 0)
    };
  }, [bulkItems]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calculator className="h-6 w-6 text-elec-yellow" />
          Bulk Tool Pricing
        </h2>
        <p className="text-muted-foreground">
          Calculate bulk discounts and total costs for {categoryName.toLowerCase()} purchases
        </p>
      </div>

      {/* Discount Tiers */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-elec-yellow" />
            Bulk Discount Tiers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">5%</div>
              <div className="text-sm text-muted-foreground">5-9 items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">10%</div>
              <div className="text-sm text-muted-foreground">10-19 items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">15%</div>
              <div className="text-sm text-muted-foreground">20+ items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">Custom</div>
              <div className="text-sm text-muted-foreground">50+ items</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Tools Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-lg">Add Tools to Bulk Order</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tool Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Select Tool</label>
            {availableTools.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <div className="text-sm">No tools available for bulk pricing</div>
                <div className="text-xs mt-1">Tools will appear here when category data loads</div>
              </div>
            ) : (
              <div className="grid gap-2 max-h-48 overflow-y-auto">
                {availableTools.map(tool => (
                <div
                  key={tool.id}
                  onClick={() => setSelectedTool(tool)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTool?.id === tool.id 
                      ? 'border-elec-yellow bg-elec-yellow/10' 
                      : 'border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm">{tool.name}</div>
                      <div className="text-xs text-muted-foreground">{tool.supplier}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-elec-yellow">{tool.price}</div>
                      <Badge variant="outline" className="text-xs">
                        {tool.stockStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            )}
          </div>

          {/* Quantity and Add */}
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium">Quantity</label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="bg-elec-gray border-elec-yellow/20"
              />
            </div>
            <Button
              onClick={addToBulk}
              disabled={!selectedTool}
              variant="gold"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add to Bulk
            </Button>
          </div>

          {selectedTool && quantity >= 5 && (
            <div className="p-3 bg-elec-yellow/10 rounded-lg border border-elec-yellow/30">
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-elec-yellow" />
                <span className="text-elec-yellow font-medium">
                  {getBulkDiscount(quantity)}% bulk discount applies
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Items List */}
      {bulkItems.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-elec-yellow" />
              Bulk Order Summary ({totals.itemCount} items)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bulkItems.map((item, index) => {
              const itemTotal = item.unitPrice * item.quantity;
              const itemDiscount = itemTotal * item.discountPercent / 100;
              const itemFinal = itemTotal - itemDiscount;
              
              return (
                <div key={item.tool.id} className="p-4 border border-elec-yellow/20 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.tool.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.tool.supplier}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-elec-yellow">
                        £{itemFinal.toFixed(2)}
                      </div>
                      {item.discountPercent > 0 && (
                        <div className="text-xs text-muted-foreground line-through">
                          £{itemTotal.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="min-w-[3ch] text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    {item.discountPercent > 0 && (
                      <Badge variant="gold" className="text-xs">
                        {item.discountPercent}% off
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mt-2 text-xs text-muted-foreground">
                    £{item.unitPrice.toFixed(2)} each × {item.quantity} = £{itemTotal.toFixed(2)}
                    {item.discountPercent > 0 && ` - £${itemDiscount.toFixed(2)} discount`}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Total Summary */}
      {bulkItems.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-yellow/5">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span>£{totals.subtotal.toFixed(2)}</span>
              </div>
              {totals.totalDiscount > 0 && (
                <div className="flex justify-between text-elec-yellow">
                  <span>Bulk Discount:</span>
                  <span>-£{totals.totalDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-elec-yellow/20 pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-elec-yellow">£{totals.total.toFixed(2)}</span>
                </div>
                {totals.totalDiscount > 0 && (
                  <div className="text-sm text-muted-foreground text-right">
                    You save £{totals.totalDiscount.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <Button variant="gold" className="flex-1">
                Request Quote
              </Button>
              <Button variant="outline" onClick={() => setBulkItems([])}>
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {bulkItems.length === 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6 text-center space-y-4">
            <Package className="h-12 w-12 text-elec-yellow mx-auto" />
            <h3 className="text-xl font-semibold">Start Your Bulk Order</h3>
            <p className="text-muted-foreground">
              Add tools to see bulk pricing and discounts. Save up to 15% on larger orders.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BulkToolPricingCalculator;
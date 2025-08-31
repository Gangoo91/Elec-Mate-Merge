import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Package, TrendingUp, TrendingDown, Plus, Minus } from "lucide-react";

interface BulkPricingItem {
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  savings: number;
}

interface BulkPricingData {
  productName: string;
  supplier: string;
  unitPrice: number;
  quantities: BulkPricingItem[];
  bulkDiscounts: { minQuantity: number; discountPercent: number; }[];
}

interface BulkPricingCalculatorProps {
  categoryId?: string;
  products?: any[];
  onCalculate?: (data: BulkPricingData[]) => void;
}

const BulkPricingCalculator = ({ categoryId, products = [], onCalculate }: BulkPricingCalculatorProps) => {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [customQuantities, setCustomQuantities] = useState<number[]>([1, 5, 10, 25, 50, 100]);
  const [bulkResults, setBulkResults] = useState<BulkPricingData[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [newQuantity, setNewQuantity] = useState<string>("");

  const addCustomQuantity = () => {
    const qty = parseInt(newQuantity);
    if (qty > 0 && !customQuantities.includes(qty)) {
      setCustomQuantities([...customQuantities, qty].sort((a, b) => a - b));
      setNewQuantity("");
    }
  };

  const removeQuantity = (qty: number) => {
    if (customQuantities.length > 1) {
      setCustomQuantities(customQuantities.filter(q => q !== qty));
    }
  };

  const calculateBulkPricing = async () => {
    if (!selectedProduct) return;
    
    setIsCalculating(true);
    try {
      const product = products.find(p => p.id.toString() === selectedProduct);
      if (!product) return;

      // Simulate bulk pricing calculation
      const basePrice = parseFloat(product.price.replace('£', ''));
      
      const bulkDiscounts = [
        { minQuantity: 1, discountPercent: 0 },
        { minQuantity: 5, discountPercent: 2 },
        { minQuantity: 10, discountPercent: 5 },
        { minQuantity: 25, discountPercent: 8 },
        { minQuantity: 50, discountPercent: 12 },
        { minQuantity: 100, discountPercent: 15 }
      ];

      const quantityPricing = customQuantities.map(qty => {
        const applicableDiscount = bulkDiscounts
          .filter(d => qty >= d.minQuantity)
          .sort((a, b) => b.discountPercent - a.discountPercent)[0] || bulkDiscounts[0];
        
        const unitPrice = basePrice * (1 - applicableDiscount.discountPercent / 100);
        const totalPrice = unitPrice * qty;
        const savings = (basePrice - unitPrice) * qty;

        return {
          quantity: qty,
          unitPrice: Math.round(unitPrice * 100) / 100,
          totalPrice: Math.round(totalPrice * 100) / 100,
          savings: Math.round(savings * 100) / 100
        };
      });

      const result: BulkPricingData = {
        productName: product.name,
        supplier: product.supplier,
        unitPrice: basePrice,
        quantities: quantityPricing,
        bulkDiscounts
      };

      setBulkResults([result]);
      onCalculate?.([result]);
    } catch (error) {
      console.error('Bulk pricing calculation failed:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const formatPrice = (price: number) => `£${price.toFixed(2)}`;
  const formatSavings = (savings: number) => savings > 0 ? `Save ${formatPrice(savings)}` : '';

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Bulk Pricing Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Product Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-200">Select Product</label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="bg-elec-dark border-purple-500/30 text-white">
                  <SelectValue placeholder="Choose a product to calculate bulk pricing" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-purple-500/30">
                  {products.map(product => (
                    <SelectItem key={product.id} value={product.id.toString()} className="text-white focus:bg-purple-500/20">
                      {product.name} - {product.supplier} ({product.price})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Quantities */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-purple-200">Quantities to Calculate</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {customQuantities.map(qty => (
                  <Badge 
                    key={qty} 
                    variant="outline" 
                    className="border-purple-500/30 text-purple-300 px-2 py-1 cursor-pointer hover:bg-purple-500/20"
                    onClick={() => removeQuantity(qty)}
                  >
                    {qty}
                    {customQuantities.length > 1 && <Minus className="h-3 w-3 ml-1" />}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Add quantity"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  className="bg-elec-dark border-purple-500/30 text-white"
                  min="1"
                />
                <Button 
                  size="sm" 
                  onClick={addCustomQuantity}
                  className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button 
              onClick={calculateBulkPricing}
              disabled={!selectedProduct || isCalculating}
              className="w-full bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
            >
              {isCalculating ? "Calculating..." : "Calculate Bulk Pricing"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {bulkResults.length > 0 && (
        <Card className="border-purple-500/30 bg-purple-500/5">
          <CardHeader>
            <CardTitle className="text-purple-300 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Bulk Pricing Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bulkResults.map((result, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">{result.productName}</h4>
                    <p className="text-sm text-muted-foreground">{result.supplier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-300">
                      Unit Price: {formatPrice(result.unitPrice)}
                    </p>
                  </div>
                </div>

                {/* Bulk Discount Tiers */}
                <div className="bg-purple-500/10 rounded-lg p-3">
                  <h5 className="font-medium text-purple-200 mb-2">Discount Tiers</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {result.bulkDiscounts.map((discount, idx) => (
                      <div key={idx} className="text-xs text-purple-200">
                        {discount.minQuantity}+ units: {discount.discountPercent}% off
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantity Pricing Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-purple-500/30">
                        <th className="text-left py-2 text-purple-200">Quantity</th>
                        <th className="text-right py-2 text-purple-200">Unit Price</th>
                        <th className="text-right py-2 text-purple-200">Total Price</th>
                        <th className="text-right py-2 text-purple-200">Savings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.quantities.map((qty, idx) => (
                        <tr key={idx} className="border-b border-purple-500/10">
                          <td className="py-2 text-white font-medium">{qty.quantity}</td>
                          <td className="py-2 text-right text-white">
                            {formatPrice(qty.unitPrice)}
                            {qty.unitPrice < result.unitPrice && (
                              <TrendingDown className="inline h-3 w-3 ml-1 text-green-400" />
                            )}
                          </td>
                          <td className="py-2 text-right text-purple-300 font-medium">
                            {formatPrice(qty.totalPrice)}
                          </td>
                          <td className="py-2 text-right">
                            {qty.savings > 0 ? (
                              <Badge className="bg-green-500/20 text-green-400 text-xs">
                                {formatSavings(qty.savings)}
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground text-xs">No savings</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Best Value Recommendation */}
                {result.quantities.length > 1 && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="font-medium text-green-300">Best Value Recommendation</span>
                    </div>
                    <p className="text-sm text-green-200">
                      {(() => {
                        const bestValue = result.quantities.reduce((best, current) => 
                          current.savings > best.savings ? current : best
                        );
                        return `Ordering ${bestValue.quantity} units gives you the best savings of ${formatSavings(bestValue.savings)} (${formatPrice(bestValue.unitPrice)} per unit).`;
                      })()}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BulkPricingCalculator;
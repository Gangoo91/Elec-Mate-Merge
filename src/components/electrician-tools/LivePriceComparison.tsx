
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, RefreshCw, ExternalLink, Star } from "lucide-react";

const LivePriceComparison = () => {
  const priceComparisons = [
    {
      tool: "Fluke 1663 Multifunction Tester",
      category: "Testing Equipment",
      prices: [
        { supplier: "RS Components", price: "£649.99", originalPrice: "£899.99", discount: "28%", stock: "In Stock", rating: 4.8 },
        { supplier: "City Electrical Factors", price: "£675.00", originalPrice: "£850.00", discount: "21%", stock: "2-3 Days", rating: 4.7 },
        { supplier: "Screwfix", price: "£699.99", originalPrice: "£849.99", discount: "18%", stock: "Click & Collect", rating: 4.6 },
        { supplier: "Amazon Business", price: "£729.00", originalPrice: null, discount: null, stock: "Prime Next Day", rating: 4.5 }
      ],
      trend: "down",
      trendPercent: "5.2%",
      lastUpdated: "2 minutes ago"
    },
    {
      tool: "DeWalt 18V Combi Drill Kit",
      category: "Power Tools",
      prices: [
        { supplier: "Toolstation", price: "£149.99", originalPrice: "£199.99", discount: "25%", stock: "In Stock", rating: 4.9 },
        { supplier: "Screwfix", price: "£159.99", originalPrice: "£199.99", discount: "20%", stock: "500+ Stores", rating: 4.8 },
        { supplier: "Amazon Business", price: "£164.99", originalPrice: "£189.99", discount: "13%", stock: "Prime", rating: 4.7 },
        { supplier: "B&Q Trade", price: "£179.99", originalPrice: "£199.99", discount: "10%", stock: "Order Online", rating: 4.4 }
      ],
      trend: "up",
      trendPercent: "2.1%",
      lastUpdated: "5 minutes ago"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Live Price Comparison</h2>
          <p className="text-muted-foreground">Real-time pricing from UK suppliers</p>
        </div>
        <Button variant="outline" size="sm" className="border-elec-yellow/30">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Prices
        </Button>
      </div>
      
      <div className="space-y-6">
        {priceComparisons.map((comparison, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-white">{comparison.tool}</CardTitle>
                  <p className="text-sm text-elec-yellow">{comparison.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1 text-sm ${
                    comparison.trend === 'up' ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {comparison.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {comparison.trendPercent}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Updated {comparison.lastUpdated}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {comparison.prices.map((price, priceIndex) => (
                  <div 
                    key={priceIndex} 
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      priceIndex === 0 
                        ? 'border-green-500/30 bg-green-500/10' 
                        : 'border-elec-yellow/20 bg-elec-dark/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{price.supplier}</span>
                        {priceIndex === 0 && (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">
                            Best Price
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-amber-400 fill-current" />
                        <span className="text-xs text-muted-foreground">{price.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground">
                        {price.stock}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {price.originalPrice && (
                          <>
                            <span className="text-sm line-through text-muted-foreground">
                              {price.originalPrice}
                            </span>
                            <Badge className="bg-elec-yellow/20 text-elec-yellow text-xs">
                              -{price.discount}
                            </Badge>
                          </>
                        )}
                        <span className="text-lg font-bold text-elec-yellow">
                          {price.price}
                        </span>
                      </div>
                      
                      <Button size="sm" variant="outline" className="border-elec-yellow/30">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-300">
                  💡 <strong>Tip:</strong> Prices include VAT where applicable. Check delivery costs and 
                  availability before ordering. Trade account discounts may apply.
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LivePriceComparison;

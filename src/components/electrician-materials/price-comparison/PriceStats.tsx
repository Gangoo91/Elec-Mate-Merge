import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingDown, Download, Plus } from "lucide-react";
import { PriceComparisonItem } from "@/types/materials";

export interface PriceComparisonResult {
  searchTerm: string;
  products: PriceComparisonItem[];
  cheapestPrice: number;
  averagePrice: number;
  priceRange: string;
  aiInsights?: any;
}

interface PriceStatsProps {
  comparisonResult: PriceComparisonResult;
  onExportToPDF?: () => void;
  onAddMultipleToQuote?: (materials: any[]) => void;
}

export const PriceStats = ({ 
  comparisonResult, 
  onExportToPDF, 
  onAddMultipleToQuote 
}: PriceStatsProps) => {
  const formatPrice = (price: number): string => {
    return `£${price.toFixed(2)}`;
  };

  const handleAddAllToQuote = () => {
    if (onAddMultipleToQuote) {
      const materials = comparisonResult.products.map(product => ({
        name: product.name,
        supplier: product.supplier,
        price: product.price,
        numericPrice: product.numericPrice,
        category: product.category,
        stockStatus: product.stockStatus
      }));
      onAddMultipleToQuote(materials);
    }
  };

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-xl">
              Price Comparison Results
            </CardTitle>
            <div className="flex gap-2">
              {onExportToPDF && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onExportToPDF}
                  className="text-xs"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              )}
              {onAddMultipleToQuote && comparisonResult.products.length > 1 && (
                <Button 
                  size="sm"
                  onClick={handleAddAllToQuote}
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 text-xs"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add All
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">
                {comparisonResult.products.length}
              </div>
              <div className="text-sm text-muted-foreground">Products Found</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {formatPrice(comparisonResult.cheapestPrice)}
              </div>
              <div className="text-sm text-muted-foreground">Best Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {formatPrice(comparisonResult.averagePrice)}
              </div>
              <div className="text-sm text-muted-foreground">Average Price</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-muted-foreground">
                {comparisonResult.priceRange}
              </div>
              <div className="text-sm text-muted-foreground">Price Range</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-elec-yellow/10">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <TrendingDown className="h-3 w-3 mr-1" />
              Best deals highlighted
            </Badge>
            <span className="text-sm text-muted-foreground">
              Search: "{comparisonResult.searchTerm}"
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingDown, Download, Plus } from "lucide-react";
import { PriceComparisonItem } from "./ProductCard";

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
      {/* Mobile-first Results Header */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-gray/80 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
            <CardTitle className="text-white text-lg md:text-xl font-semibold">
              Price Comparison Results
            </CardTitle>
            <div className="flex gap-2">
              {onExportToPDF && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onExportToPDF}
                  className="text-xs border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
              )}
              {onAddMultipleToQuote && comparisonResult.products.length > 1 && (
                <Button 
                  size="sm"
                  onClick={handleAddAllToQuote}
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 text-xs font-medium"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add All
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Mobile optimized stats grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-elec-yellow/10 rounded-lg p-4 text-center border border-elec-yellow/20">
              <div className="text-2xl md:text-3xl font-bold text-elec-yellow">
                {comparisonResult.products.length}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">
                Products Found
              </div>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4 text-center border border-green-500/20">
              <div className="text-2xl md:text-3xl font-bold text-green-400">
                {formatPrice(comparisonResult.cheapestPrice)}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">
                Best Price
              </div>
            </div>
          </div>
          
          {/* Secondary stats - single row on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex justify-between items-center p-3 bg-blue-500/5 rounded-lg border border-blue-500/10">
              <span className="text-sm text-muted-foreground">Average Price</span>
              <span className="text-lg font-semibold text-blue-400">
                {formatPrice(comparisonResult.averagePrice)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-500/5 rounded-lg border border-purple-500/10">
              <span className="text-sm text-muted-foreground">Price Range</span>
              <span className="text-sm font-medium text-purple-400">
                {comparisonResult.priceRange}
              </span>
            </div>
          </div>

          {/* Search info and badges */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 pt-4 border-t border-elec-yellow/10">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 w-fit">
              <TrendingDown className="h-3 w-3 mr-1" />
              Best deals highlighted
            </Badge>
            <div className="text-xs md:text-sm text-muted-foreground">
              <span className="text-elec-yellow font-medium">Search:</span> "{comparisonResult.searchTerm}"
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
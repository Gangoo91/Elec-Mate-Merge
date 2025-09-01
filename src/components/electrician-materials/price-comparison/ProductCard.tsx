import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, TrendingDown, Star, ExternalLink, Plus } from "lucide-react";
import { MobileButton } from "@/components/ui/mobile-button";
import { useIsMobile } from "@/hooks/use-mobile";

export interface PriceComparisonItem {
  id: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image: string;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  productUrl?: string;
  highlights?: string[];
  numericPrice: number;
  rating?: number;
  deliveryInfo?: string;
  originalPrice?: string;
  discount?: string;
}

interface ProductCardProps {
  product: PriceComparisonItem;
  isCheapest: boolean;
  savings: number;
  onAddToQuote?: (material: any, quantity?: number) => void;
}

export const ProductCard = ({ product, isCheapest, savings, onAddToQuote }: ProductCardProps) => {
  const isMobile = useIsMobile();

  const handleAddToQuote = () => {
    if (onAddToQuote) {
      onAddToQuote({
        name: product.name,
        supplier: product.supplier,
        price: product.price,
        numericPrice: product.numericPrice,
        category: product.category,
        stockStatus: product.stockStatus
      }, 1);
    }
  };

  return (
    <Card 
      className={`border transition-all hover:shadow-lg ${
        isCheapest 
          ? 'border-green-500/50 bg-green-500/5 ring-1 ring-green-500/20' 
          : 'border-elec-yellow/20 bg-elec-gray'
      }`}
    >
      <CardContent className="p-4">
        <div className={`${isMobile ? 'space-y-4' : 'flex items-center justify-between'}`}>
          {/* Mobile: Vertical layout */}
          {isMobile ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white text-sm">{product.supplier}</span>
                  {isCheapest && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                      <Crown className="h-3 w-3 mr-1" />
                      Best
                    </Badge>
                  )}
                </div>
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-400 fill-current" />
                    <span className="text-xs text-muted-foreground">{product.rating}</span>
                  </div>
                )}
              </div>
              
              {/* Product name */}
              <div>
                <h3 className="font-medium text-white text-sm leading-tight">{product.name}</h3>
                <p className="text-xs text-muted-foreground">{product.category}</p>
              </div>
              
              {/* Price and stock */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      product.stockStatus === 'In Stock' 
                        ? 'border-green-500/30 text-green-400' 
                        : product.stockStatus === 'Low Stock'
                        ? 'border-yellow-500/30 text-yellow-400'
                        : 'border-red-500/30 text-red-400'
                    }`}
                  >
                    {product.stockStatus}
                  </Badge>
                  {product.deliveryInfo && (
                    <span className="text-xs text-muted-foreground">{product.deliveryInfo}</span>
                  )}
                </div>
                
                <div className="text-right">
                  <span className="text-xl font-bold text-elec-yellow">{product.price}</span>
                  {savings > 0 && (
                    <div className="flex items-center gap-1 text-red-400 text-xs">
                      <TrendingDown className="h-3 w-3" />
                      +{savings}%
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-2">
                {onAddToQuote && (
                  <MobileButton
                    variant="default"
                    onClick={handleAddToQuote}
                    className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Quote
                  </MobileButton>
                )}
                {product.productUrl && (
                  <MobileButton
                    variant="outline"
                    onClick={() => window.open(product.productUrl, '_blank')}
                    className="flex-1"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View
                  </MobileButton>
                )}
              </div>
            </>
          ) : (
            /* Desktop: Horizontal layout */
            <>
              <div className="flex items-center gap-4 flex-1">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg bg-elec-gray"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-white text-wrap">{product.name}</h3>
                    {isCheapest && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Crown className="h-4 w-4 mr-1" />
                        Best Price
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm font-medium text-elec-yellow">{product.supplier}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        product.stockStatus === 'In Stock' 
                          ? 'border-green-500/30 text-green-400' 
                          : product.stockStatus === 'Low Stock'
                          ? 'border-yellow-500/30 text-yellow-400'
                          : 'border-red-500/30 text-red-400'
                      }`}
                    >
                      {product.stockStatus}
                    </Badge>
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <span className="text-sm text-muted-foreground">{product.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-2xl font-bold text-elec-yellow">{product.price}</div>
                    {savings > 0 && (
                      <div className="flex items-center gap-1 text-red-400 text-sm">
                        <TrendingDown className="h-4 w-4" />
                        +{savings}% more
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {onAddToQuote && (
                      <Button
                        onClick={handleAddToQuote}
                        className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Quote
                      </Button>
                    )}
                    {product.productUrl && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(product.productUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
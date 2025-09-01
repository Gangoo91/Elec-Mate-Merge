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
      className={`border transition-all hover:shadow-lg overflow-hidden ${
        isCheapest 
          ? 'border-green-500/50 bg-green-500/5 ring-1 ring-green-500/20' 
          : 'border-elec-yellow/20 bg-elec-gray'
      }`}
    >
      <CardContent className={`${isMobile ? 'p-3' : 'p-4'}`}>
        <div className={`${isMobile ? 'space-y-3' : 'flex items-center justify-between min-h-0'}`}>
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
              <div className="min-w-0">
                <h3 className="font-medium text-white text-sm leading-tight line-clamp-2 break-words">{product.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{product.category}</p>
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
              <div className={`${onAddToQuote && product.productUrl ? 'grid grid-cols-2 gap-2' : 'flex'}`}>
                {onAddToQuote && (
                  <MobileButton
                    variant="default"
                    size="sm"
                    onClick={handleAddToQuote}
                    className={`bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 text-xs h-10 ${!product.productUrl ? 'w-full' : ''}`}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </MobileButton>
                )}
                {product.productUrl && (
                  <MobileButton
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(product.productUrl, '_blank')}
                    className="text-xs h-10"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </MobileButton>
                )}
              </div>
            </>
          ) : (
            /* Desktop: Horizontal layout */
            <>
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-lg bg-elec-gray flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-white text-sm lg:text-base line-clamp-1">{product.name}</h3>
                    {isCheapest && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs flex-shrink-0">
                        <Crown className="h-3 w-3 mr-1" />
                        Best
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs lg:text-sm text-muted-foreground truncate">{product.category}</p>
                  <div className="flex items-center gap-2 lg:gap-3 mt-1 lg:mt-2 flex-wrap">
                    <span className="text-xs lg:text-sm font-medium text-elec-yellow">{product.supplier}</span>
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
                        <Star className="h-3 w-3 lg:h-4 lg:w-4 text-amber-400 fill-current" />
                        <span className="text-xs lg:text-sm text-muted-foreground">{product.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-2 lg:gap-4">
                  <div>
                    <div className="text-lg lg:text-2xl font-bold text-elec-yellow">{product.price}</div>
                    {savings > 0 && (
                      <div className="flex items-center gap-1 text-red-400 text-xs lg:text-sm">
                        <TrendingDown className="h-3 w-3 lg:h-4 lg:w-4" />
                        +{savings}%
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-1 lg:gap-2">
                    {onAddToQuote && (
                      <Button
                        size="sm"
                        onClick={handleAddToQuote}
                        className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 text-xs lg:text-sm h-8 lg:h-10 px-2 lg:px-4"
                      >
                        <Plus className="h-3 w-3 lg:h-4 lg:w-4 lg:mr-2" />
                        <span className="hidden lg:inline">Add</span>
                      </Button>
                    )}
                    {product.productUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(product.productUrl, '_blank')}
                        className="text-xs lg:text-sm h-8 lg:h-10 px-2 lg:px-3"
                      >
                        <ExternalLink className="h-3 w-3 lg:h-4 lg:w-4" />
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
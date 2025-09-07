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
  length?: string;
  specifications?: string;
  quantity?: string;
  cableType?: string;
  coreCount?: string;
  cableSize?: string;
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
                <span className="text-xs text-muted-foreground">{product.supplier}</span>
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-400 fill-current" />
                    <span className="text-xs text-muted-foreground">{product.rating}</span>
                  </div>
                )}
              </div>
              
              {/* Product name and specs */}
              <div>
                <h3 className="font-medium text-white text-sm leading-tight line-clamp-2 mb-1">{product.name}</h3>
                {(product.length || product.cableSize || product.coreCount) && (
                  <div className="flex flex-wrap gap-1 text-xs">
                    {product.length && (
                      <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-elec-yellow/30 text-elec-yellow">
                        {product.length}
                      </Badge>
                    )}
                    {product.cableSize && (
                      <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-elec-yellow/30 text-elec-yellow">
                        {product.cableSize}
                      </Badge>
                    )}
                    {product.coreCount && (
                      <Badge variant="outline" className="text-xs px-1.5 py-0.5 border-elec-yellow/30 text-elec-yellow">
                        {product.coreCount}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              
              {/* Product image */}
              <div>
                <img src={product.image || "/placeholder.svg"} alt={product.name} className="mx-auto" />
              </div>
              
              {/* Stock and price */}
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium text-elec-yellow">{product.price}</p>
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
                </div>
                
                {onAddToQuote && (
                  <Button
                    size="sm"
                    onClick={handleAddToQuote}
                    className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 h-8 px-3 text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                )}
              </div>
              
              {/* Optional view button */}
              {product.productUrl && (
                <MobileButton
                  variant="outline"
                  onClick={() => window.open(product.productUrl, '_blank')}
                  className="w-full"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Product
                </MobileButton>
              )}
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
                  <h3 className="font-medium text-white text-wrap leading-tight line-clamp-2 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-muted-foreground">{product.supplier}</span>
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
                        <Star className="h-3 w-3 text-amber-400 fill-current" />
                        <span className="text-xs text-muted-foreground">{product.rating}</span>
                      </div>
                    )}
                  </div>
                  {/* Product specifications */}
                  {(product.length || product.cableSize || product.coreCount || product.quantity) && (
                    <div className="flex flex-wrap gap-1">
                      {product.length && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5 border-elec-yellow/30 text-elec-yellow">
                          {product.length}
                        </Badge>
                      )}
                      {product.cableSize && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5 border-elec-yellow/30 text-elec-yellow">
                          {product.cableSize}
                        </Badge>
                      )}
                      {product.coreCount && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5 border-elec-yellow/30 text-elec-yellow">
                          {product.coreCount}
                        </Badge>
                      )}
                      {product.quantity && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5 border-blue-500/30 text-blue-400">
                          {product.quantity}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-lg font-semibold text-elec-yellow">{product.price}</div>
                  {savings > 0 && (
                    <div className="text-xs text-red-400">+{savings}% more</div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {onAddToQuote && (
                    <Button
                      size="sm"
                      onClick={handleAddToQuote}
                      className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 h-8 px-3 text-xs"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  )}
                  {product.productUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(product.productUrl, '_blank')}
                      className="h-8 w-8 p-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
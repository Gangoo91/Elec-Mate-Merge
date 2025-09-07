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

  // Process image URL to set width and height to 236
  const imageSrc = (() => {
    if (!product.image) return "/placeholder.svg";
    
    try {
      const url = new URL(product.image, window.location.origin);
      url.searchParams.set('wid', '236');
      url.searchParams.set('hei', '236');
      return url.toString();
    } catch {
      // If URL parsing fails, return original or placeholder
      return product.image || "/placeholder.svg";
    }
  })();

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
          ? 'border-green-500/50 bg-gradient-to-br from-green-500/5 to-green-500/10 ring-1 ring-green-500/20' 
          : 'border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-gray/80'
      }`}
    >
      <CardContent className="p-4">
        <div className={`${isMobile ? 'space-y-4' : 'flex items-center justify-between'}`}>
          {/* Mobile: Vertical layout */}
          {isMobile ? (
            <>
              {/* Price at top */}
              <div className="text-center py-2 border-b border-elec-yellow/10">
                <div className="text-xl font-bold text-elec-yellow">{product.price}</div>
                <div className="text-xs text-muted-foreground">per each</div>
              </div>
              
              {/* Product name centered */}
              <div className="text-center py-4">
                <h3 className="font-semibold text-white text-base leading-tight line-clamp-2 mb-2">{product.name}</h3>
                
                {/* Brand and model info */}
                <div className="text-sm text-elec-yellow font-medium mb-1">
                  {product.supplier} • {product.name.split(' ')[0]}
                </div>
                
                {/* Category */}
                <div className="text-xs text-muted-foreground mb-3">
                  {product.category}
                </div>
                
                {/* Specifications badges */}
                {(product.length || product.cableSize || product.coreCount) && (
                  <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                    {product.length && (
                      <Badge variant="outline" className="text-xs px-2 py-1 border-elec-yellow/40 text-elec-yellow bg-elec-yellow/5">
                        {product.length}
                      </Badge>
                    )}
                    {product.cableSize && (
                      <Badge variant="outline" className="text-xs px-2 py-1 border-blue-500/40 text-blue-400 bg-blue-500/5">
                        {product.cableSize}
                      </Badge>
                    )}
                    {product.coreCount && (
                      <Badge variant="outline" className="text-xs px-2 py-1 border-purple-500/40 text-purple-400 bg-purple-500/5">
                        {product.coreCount}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              
              {/* Product image centered */}
              <div className="flex justify-center py-2">
                <img 
                  src={imageSrc} 
                  alt={product.name} 
                  className="w-20 h-20 object-cover rounded-lg bg-elec-gray/50"
                />
              </div>
              
              {/* Stock status and rating */}
              <div className="flex items-center justify-between py-3 border-t border-elec-yellow/10">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      product.stockStatus === 'In Stock' 
                        ? 'border-green-500/30 text-green-400 bg-green-500/5' 
                        : product.stockStatus === 'Low Stock'
                        ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5'
                        : 'border-red-500/30 text-red-400 bg-red-500/5'
                    }`}
                  >
                    {product.stockStatus}
                  </Badge>
                  {isCheapest && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs px-2 py-0.5">
                      Best Value
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
              
              {/* Action buttons */}
              <div className="flex gap-2 pt-2">
                {onAddToQuote && (
                  <Button
                    size="sm"
                    onClick={handleAddToQuote}
                    className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 h-10 text-sm font-medium"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Quote
                  </Button>
                )}
                {product.productUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(product.productUrl, '_blank')}
                    className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 h-10 px-4"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </>
          ) : (
            /* Desktop: Horizontal layout */
            <>
              <div className="flex items-center gap-4 flex-1">
                <img 
                  src={imageSrc} 
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
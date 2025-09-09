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
    const src = product.image;
    if (!src) return "/placeholder.svg";
    
    let finalSrc = src;
    
    // Update image size parameters from 136x136 to 236x236
    if (finalSrc.includes("wid=136") && finalSrc.includes("hei=136")) {
      finalSrc = finalSrc.replace(/wid=136/g, "wid=236").replace(/hei=136/g, "hei=236");
    }
    
    return finalSrc;
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
      <CardContent className="p-3 sm:p-4">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          {/* Price at top on mobile */}
          <div className="flex justify-center mb-3">
            <div className="text-center">
              <div className="text-xl font-bold text-elec-yellow">
                £{product.price.replace(/[£$]/g, '')}
              </div>
              <div className="text-xs text-muted-foreground">per each</div>
              {savings > 0 && (
                <div className="text-xs text-red-400">+{savings}% more</div>
              )}
              {isCheapest && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs px-2 py-0.5 mt-1">
                  <Crown className="h-3 w-3 mr-1" />
                  Best Value
                </Badge>
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="flex items-center gap-3 mb-3">
            <div className="shrink-0">
              <img 
                src={imageSrc} 
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg bg-elec-gray/50"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 mb-1">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-elec-yellow font-medium">
                  {product.supplier}
                </span>
                <Badge 
                  variant="outline" 
                  className={`text-xs shrink-0 ${
                    product.stockStatus === 'In Stock' 
                      ? 'border-green-500/30 text-green-400 bg-green-500/5' 
                      : product.stockStatus === 'Low Stock'
                      ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5'
                      : 'border-red-500/30 text-red-400 bg-red-500/5'
                  }`}
                >
                  {product.stockStatus}
                </Badge>
              </div>
              
              <div className="text-xs text-muted-foreground">
                {product.category}
              </div>
            </div>
          </div>

          {/* Specifications badges */}
          {(product.length || product.cableSize || product.coreCount || product.quantity) && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.length && (
                <Badge variant="outline" className="text-xs px-2 py-0.5 border-elec-yellow/40 text-elec-yellow bg-elec-yellow/5">
                  {product.length}
                </Badge>
              )}
              {product.cableSize && (
                <Badge variant="outline" className="text-xs px-2 py-0.5 border-blue-500/40 text-blue-400 bg-blue-500/5">
                  {product.cableSize}
                </Badge>
              )}
              {product.coreCount && (
                <Badge variant="outline" className="text-xs px-2 py-0.5 border-purple-500/40 text-purple-400 bg-purple-500/5">
                  {product.coreCount}
                </Badge>
              )}
              {product.quantity && (
                <Badge variant="outline" className="text-xs px-2 py-0.5 border-orange-500/40 text-orange-400 bg-orange-500/5">
                  {product.quantity}
                </Badge>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            {onAddToQuote && (
              <Button
                size="sm"
                onClick={handleAddToQuote}
                className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 h-8 text-xs font-medium"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add to Quote
              </Button>
            )}
            {product.productUrl && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(product.productUrl, '_blank')}
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 h-8 w-8 p-0"
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-4">
          {/* Product Info */}
          <div className="flex-1 flex items-center gap-4">
            {/* Product Image */}
            <div className="shrink-0">
              <img 
                src={imageSrc} 
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg bg-elec-gray/50"
              />
            </div>
            
            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-base leading-tight line-clamp-2 mb-2">
                {product.name}
              </h3>
              
              {/* Brand and supplier info */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-elec-yellow font-medium">
                  {product.supplier}
                </span>
                <Badge 
                  variant="outline" 
                  className={`text-xs shrink-0 ${
                    product.stockStatus === 'In Stock' 
                      ? 'border-green-500/30 text-green-400 bg-green-500/5' 
                      : product.stockStatus === 'Low Stock'
                      ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/5'
                      : 'border-red-500/30 text-red-400 bg-red-500/5'
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
              
              {/* Specifications badges */}
              {(product.length || product.cableSize || product.coreCount || product.quantity) && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {product.length && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5 border-elec-yellow/40 text-elec-yellow bg-elec-yellow/5">
                      {product.length}
                    </Badge>
                  )}
                  {product.cableSize && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5 border-blue-500/40 text-blue-400 bg-blue-500/5">
                      {product.cableSize}
                    </Badge>
                  )}
                  {product.coreCount && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5 border-purple-500/40 text-purple-400 bg-purple-500/5">
                      {product.coreCount}
                    </Badge>
                  )}
                  {product.quantity && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5 border-orange-500/40 text-orange-400 bg-orange-500/5">
                      {product.quantity}
                    </Badge>
                  )}
                </div>
              )}
              
              {/* Category */}
              <div className="text-xs text-muted-foreground">
                {product.category}
              </div>
            </div>
          </div>
          
          {/* Price and Actions Section */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            {/* Price */}
            <div className="text-right">
              <div className="text-lg font-bold text-elec-yellow">
                £{product.price.replace(/[£$]/g, '')}
              </div>
              <div className="text-xs text-muted-foreground">per each</div>
              {savings > 0 && (
                <div className="text-xs text-red-400">+{savings}% more</div>
              )}
              {isCheapest && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs px-2 py-0.5 mt-1">
                  <Crown className="h-3 w-3 mr-1" />
                  Best Value
                </Badge>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2">
              {onAddToQuote && (
                <Button
                  size="sm"
                  onClick={handleAddToQuote}
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 h-8 text-xs font-medium"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add to Quote
                </Button>
              )}
              {product.productUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(product.productUrl, '_blank')}
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 h-8 w-8 p-0"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
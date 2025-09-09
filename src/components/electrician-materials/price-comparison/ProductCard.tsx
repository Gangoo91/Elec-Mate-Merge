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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
          {/* Mobile & Tablet: Vertical layout, Desktop: Horizontal */}
          <div className="flex-1 space-y-3 lg:space-y-0 lg:flex lg:items-center lg:gap-4">
            {/* Product Image */}
            <div className="flex justify-center lg:justify-start shrink-0">
              <img 
                src={imageSrc} 
                alt={product.name}
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-16 lg:h-16 object-cover rounded-lg bg-elec-gray/50"
              />
            </div>
            
            {/* Product Info */}
            <div className="flex-1 min-w-0 text-center lg:text-left">
              <h3 className="font-semibold text-white text-sm sm:text-base leading-tight line-clamp-2 mb-2">
                {product.name}
              </h3>
              
              {/* Brand and supplier info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start gap-1 sm:gap-3 mb-2">
                <span className="text-xs sm:text-sm text-elec-yellow font-medium">
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
                  <div className="flex items-center gap-1 justify-center lg:justify-start">
                    <Star className="h-3 w-3 text-amber-400 fill-current" />
                    <span className="text-xs text-muted-foreground">{product.rating}</span>
                  </div>
                )}
              </div>
              
              {/* Specifications badges */}
              {(product.length || product.cableSize || product.coreCount || product.quantity) && (
                <div className="flex flex-wrap justify-center lg:justify-start gap-1 mb-2">
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
              <div className="text-xs text-muted-foreground mb-2 lg:mb-0">
                {product.category}
              </div>
            </div>
          </div>
          
          {/* Price and Actions Section */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 lg:gap-2 lg:shrink-0">
            {/* Price */}
            <div className="text-center lg:text-right">
              <div className="text-lg sm:text-xl lg:text-lg font-bold text-elec-yellow">
                {product.price}
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
            <div className="flex gap-2 w-full sm:w-auto lg:w-full">
              {onAddToQuote && (
                <Button
                  size="sm"
                  onClick={handleAddToQuote}
                  className="flex-1 sm:flex-none lg:flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 h-9 text-xs sm:text-sm font-medium min-w-0"
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 shrink-0" />
                  <span className="truncate">Add to Quote</span>
                </Button>
              )}
              {product.productUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(product.productUrl, '_blank')}
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 h-9 w-9 sm:w-10 p-0 shrink-0"
                >
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
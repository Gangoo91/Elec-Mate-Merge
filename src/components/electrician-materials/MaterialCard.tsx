
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, ShoppingCart } from "lucide-react";
import { MaterialItem } from "@/data/electrician/productData";

interface MaterialCardProps {
  item: MaterialItem;
  onQuickAdd?: (item: MaterialItem) => void;
  onViewDetails?: (item: MaterialItem) => void;
}

const MaterialCard = ({ item, onQuickAdd, onViewDetails }: MaterialCardProps) => {
  const getStockColor = (status?: string) => {
    switch (status) {
      case "In Stock":
        return "text-green-400";
      case "Low Stock":
        return "text-yellow-400";
      case "Out of Stock":
        return "text-red-400";
      default:
        return "text-muted-foreground";
    }
  };

  const getStockDot = (status?: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-400";
      case "Low Stock":
        return "bg-yellow-400";
      case "Out of Stock":
        return "bg-red-400";
      default:
        return "bg-muted-foreground";
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd?.(item);
  };

  const handleViewDetails = () => {
    onViewDetails?.(item);
  };

  const currentPrice = item.isOnSale ? item.salePrice : item.price;
  const originalPrice = item.isOnSale ? item.price : undefined;

  return (
    <Card 
      className="group border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all duration-300 hover:shadow-lg hover:shadow-elec-yellow/10 cursor-pointer h-full"
      onClick={handleViewDetails}
    >
      <CardContent className="p-4 h-full flex flex-col">
        {/* Image placeholder */}
        <div className="aspect-square bg-elec-dark/50 rounded-lg mb-4 flex items-center justify-center border border-elec-yellow/10 group-hover:border-elec-yellow/30 transition-colors">
          <div className="text-4xl opacity-30">📦</div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Sale badge */}
          {item.isOnSale && (
            <div className="mb-2">
              <Badge variant="destructive" className="text-xs font-medium px-2 py-1">
                SALE
              </Badge>
            </div>
          )}

          {/* Title */}
          <h3 className="font-semibold text-white text-base mb-2 line-clamp-2 leading-tight group-hover:text-elec-yellow transition-colors">
            {item.name}
          </h3>

          {/* Supplier */}
          <p className="text-sm text-muted-foreground mb-3 capitalize">
            {item.supplier.replace(/-/g, ' ')}
          </p>

          {/* Highlights */}
          {item.highlights && item.highlights.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {item.highlights.slice(0, 2).map((highlight, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center text-xs px-2 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full font-medium"
                  >
                    {highlight}
                  </span>
                ))}
                {item.highlights.length > 2 && (
                  <span className="text-xs text-muted-foreground">
                    +{item.highlights.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Stock status and category chips */}
          <div className="space-y-2 mb-4">
            {/* Header with stock status */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-xs px-2.5 py-1 rounded-full font-medium shadow-sm transition-colors hover:bg-elec-yellow/20">
                  {item.category}
                </span>
              </div>
              {item.stockStatus && (
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${getStockDot(item.stockStatus)}`} />
                  <span className={`text-xs font-medium ${getStockColor(item.stockStatus)}`}>
                    {item.stockStatus}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Pricing section - pushed to bottom */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-elec-yellow">
                  {currentPrice}
                </span>
                {originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {originalPrice}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3 w-3 fill-current" />
                ))}
                <span className="text-xs text-muted-foreground ml-1">4.5</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark transition-all duration-200 text-sm h-8"
                onClick={handleQuickAdd}
              >
                <ShoppingCart className="h-3 w-3 mr-1.5" />
                Quick Add
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="px-3 text-elec-yellow hover:bg-elec-yellow/10 transition-all duration-200 h-8"
                onClick={handleViewDetails}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;

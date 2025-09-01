
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShoppingCart, Check, X } from "lucide-react";

interface MaterialItem {
  id: number;
  name: string;
  category: string;
  price: string;
  supplier: string;
  image: string;
  isOnSale?: boolean;
  salePrice?: string;
  stockStatus?: "In Stock" | "Low Stock" | "Out of Stock";
  highlights?: string[];
}

interface MaterialCardProps {
  item: MaterialItem;
  onAddToCompare?: (item: MaterialItem) => void;
  onRemoveFromCompare?: (itemId: string) => void;
  isSelected?: boolean;
  isCompareDisabled?: boolean;
}

const MaterialCard = ({ 
  item, 
  onAddToCompare, 
  onRemoveFromCompare, 
  isSelected = false, 
  isCompareDisabled = false 
}: MaterialCardProps) => {
  const handleCompareToggle = () => {
    if (isSelected && onRemoveFromCompare) {
      onRemoveFromCompare(item.id.toString());
    } else if (!isSelected && onAddToCompare && !isCompareDisabled) {
      onAddToCompare(item);
    }
  };

  // Parse price to handle both string and number formats
  const parsePrice = (price: string) => {
    const numericPrice = parseFloat(price.replace(/[£$,]/g, ''));
    return isNaN(numericPrice) ? 0 : numericPrice;
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base text-elec-yellow leading-tight line-clamp-2">
              {item.name}
            </CardTitle>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20 mt-2">
              {item.category}
            </span>
          </div>
          
          {(onAddToCompare || onRemoveFromCompare) && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCompareToggle}
              disabled={!isSelected && isCompareDisabled}
              className={`flex-shrink-0 ${isSelected ? 'bg-elec-yellow/20 border-elec-yellow' : ''}`}
            >
              {isSelected ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium text-white">Supplier:</span>{" "}
            <span className="text-muted-foreground">{item.supplier}</span>
          </div>
          {item.stockStatus && (
            <div>
              <span className="font-medium text-white">Stock:</span>{" "}
              <span className={`text-sm ${
                item.stockStatus === 'In Stock' ? 'text-green-400' :
                item.stockStatus === 'Low Stock' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {item.stockStatus}
              </span>
            </div>
          )}
          <div>
            <span className="font-medium text-white">Price:</span>{" "}
            {item.isOnSale && item.salePrice ? (
              <span className="space-x-2">
                <span className="text-red-400 line-through">{item.price}</span>
                <span className="text-elec-yellow font-semibold">{item.salePrice}</span>
              </span>
            ) : (
              <span className="text-elec-yellow font-semibold">{item.price}</span>
            )}
          </div>
          {item.highlights && item.highlights.length > 0 && (
            <div>
              <span className="font-medium text-white">Features:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.highlights.slice(0, 3).map((highlight, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5" />
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;

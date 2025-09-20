import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink, Plus, Check, Package } from "lucide-react";

import { MaterialItem as BaseMaterialItem } from "@/data/electrician/productData";

interface MaterialItem extends BaseMaterialItem {
  productUrl?: string;
}

interface MaterialCardProps {
  item: MaterialItem;
  onAddToCompare?: (item: MaterialItem) => void;
  onRemoveFromCompare?: (itemId: string) => void;
  isSelected?: boolean;
  isCompareDisabled?: boolean;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ 
  item, 
  onAddToCompare, 
  onRemoveFromCompare, 
  isSelected = false, 
  isCompareDisabled = false 
}) => {
  // Get stock status priority for consistent badge styling
  const getStockPriority = (status?: string) => {
    if (!status) return "optional";
    switch (status.toLowerCase()) {
      case "in stock": return "essential";
      case "low stock": return "recommended"; 
      default: return "optional";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "essential": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "recommended": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "optional": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  // Default URLs if not provided in the data
  const getProductUrl = () => {
    const supplier = (item.supplier || "").toLowerCase();
    const hosts: Record<string, string> = {
      "screwfix": "screwfix.com",
      "city electrical factors": "cef.co.uk",
      "city-electrical-factors": "cef.co.uk",
      "electricaldirect": "electricaldirect.co.uk",
      "toolstation": "toolstation.com",
    };
    const expectedHost = hosts[supplier];

    const buildSearch = (q: string) => {
      const term = encodeURIComponent(q);
      if (supplier.includes("electricaldirect")) return `https://www.electricaldirect.co.uk/search?query=${term}`;
      if (supplier.includes("city")) return `https://www.cef.co.uk/search?q=${term}`;
      if (supplier.includes("screwfix")) return `https://www.screwfix.com/search?search=${term}`;
      if (supplier.includes("toolstation")) return `https://www.toolstation.com/search?q=${term}`;
      return "#";
    };

    if (item.productUrl) {
      try {
        const base = expectedHost ? `https://www.${expectedHost}/` : undefined;
        const url = base ? new URL(item.productUrl, base) : new URL(item.productUrl);
        const isHttp = /^https?:$/.test(url.protocol);
        const hostOk = expectedHost ? url.hostname.endsWith(expectedHost) : true;
        if (isHttp && hostOk) return url.toString();
      } catch {
        // ignore and fall back
      }
    }

    return buildSearch(item.name);
  };

  return (
    <Card className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/10 hover:border-elec-yellow/30 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] transition-all duration-300 rounded-xl overflow-hidden h-full">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <Package className="h-5 w-5 text-elec-yellow" />
          <CardTitle className="text-elec-yellow text-lg">{item.name}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.supplier} • {item.category}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="border border-elec-yellow/30 rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-white text-sm">Product Details</h4>
              <Badge className={getPriorityColor(getStockPriority(item.stockStatus))} variant="outline">
                {item.stockStatus || "Available"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              {item.highlights && item.highlights.length > 0 
                ? item.highlights.slice(0, 2).join(" • ") 
                : `Quality ${item.category.toLowerCase()} from ${item.supplier}`}
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-elec-yellow font-medium">
                {item.isOnSale ? (
                  <>
                    <span className="text-amber-400">{item.salePrice}</span>
                    <span className="text-muted-foreground line-through ml-2">{item.price}</span>
                  </>
                ) : (
                  item.price
                )}
              </span>
              <span className="text-blue-300">{item.category}</span>
            </div>
          </div>
        </div>

        <Alert className="border-blue-500/30 bg-blue-500/10">
          <AlertDescription className="text-blue-200 text-xs">
            <strong>Electrician Tip:</strong> {item.highlights && item.highlights[0] 
              ? item.highlights[0] 
              : `This ${item.category.toLowerCase()} is suitable for professional electrical installations.`}
          </AlertDescription>
        </Alert>

        <Alert className="border-amber-500/30 bg-amber-500/10">
          <AlertDescription className="text-amber-200 text-xs">
            <strong>UK Consideration:</strong> Ensure this product meets current BS 7671 requirements for your specific application.
          </AlertDescription>
        </Alert>

        <div className="flex items-center gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
            onClick={() => window.open(getProductUrl(), '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Deal
          </Button>
          {onAddToCompare && (
            <Button
              onClick={() => {
                if (isSelected && onRemoveFromCompare) {
                  onRemoveFromCompare(String(item.id || item.name));
                } else if (!isCompareDisabled) {
                  onAddToCompare(item);
                }
              }}
              disabled={isCompareDisabled && !isSelected}
              variant="ghost"
              size="sm"
              className="px-3"
            >
              {isSelected ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
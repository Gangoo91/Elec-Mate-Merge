import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Tag, Clock } from "lucide-react";
import { ToolItem } from "@/hooks/useToolsData";

interface DealsOfTheDayBannerProps {
  deal?: ToolItem;
}

const DealsOfTheDayBanner = ({ deal }: DealsOfTheDayBannerProps) => {
  if (!deal || !deal.isOnSale) return null;

  const calculateSavings = () => {
    if (!deal.price || !deal.salePrice) return null;
    
    const originalPrice = parseFloat(deal.price.replace(/[£,]/g, ''));
    const salePrice = parseFloat(deal.salePrice.replace(/[£,]/g, ''));
    
    if (originalPrice && salePrice) {
      const savings = originalPrice - salePrice;
      const percentage = Math.round(((savings / originalPrice) * 100));
      return { savings: `£${savings.toFixed(2)}`, percentage };
    }
    return null;
  };

  const savings = calculateSavings();

  const getProductUrl = () => {
    const supplier = (deal.supplier || "").toLowerCase();
    const buildSearch = (q: string) => {
      const term = encodeURIComponent(q);
      if (supplier.includes("electricaldirect")) return `https://www.electricaldirect.co.uk/search?query=${term}`;
      if (supplier.includes("city")) return `https://www.cef.co.uk/search?q=${term}`;
      if (supplier.includes("screwfix")) return `https://www.screwfix.com/search?search=${term}`;
      if (supplier.includes("toolstation")) return `https://www.toolstation.com/search?q=${term}`;
      return "#";
    };

    return deal.productUrl || deal.view_product_url || buildSearch(deal.name);
  };

  return (
    <Card className="bg-gradient-to-r from-elec-yellow/20 to-elec-yellow/10 border-elec-yellow/40 shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 to-transparent"></div>
      <CardContent className="p-6 relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-elec-yellow" />
            <h2 className="text-lg font-bold text-elec-light">Deal of the Day</h2>
          </div>
          <div className="flex items-center gap-2 text-elec-yellow/80">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">Limited Time</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 items-center">
          {/* Product Image */}
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-elec-gray/30 border border-elec-yellow/20 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={deal.image || "/placeholder.svg"}
                alt={deal.name}
                className="w-full h-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow text-xs">
                {deal.category}
              </Badge>
              <Badge variant="destructive" className="text-xs font-bold animate-pulse">
                SALE
              </Badge>
              {savings && (
                <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400 text-xs">
                  Save {savings.percentage}%
                </Badge>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-elec-light leading-tight line-clamp-2">
              {deal.name}
            </h3>
            
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-elec-yellow">{deal.salePrice}</span>
              <span className="line-through text-text-muted text-lg">{deal.price}</span>
              {savings && (
                <span className="text-green-400 font-semibold">Save {savings.savings}</span>
              )}
            </div>
            
            <div className="text-sm text-text-muted">
              From <span className="font-medium text-elec-light">{deal.supplier}</span>
            </div>
            
            <a href={getProductUrl()} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button className="bg-elec-yellow text-elec-dark font-semibold hover:bg-elec-yellow/90 shadow-md hover:shadow-lg transition-all duration-200">
                Grab This Deal
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealsOfTheDayBanner;
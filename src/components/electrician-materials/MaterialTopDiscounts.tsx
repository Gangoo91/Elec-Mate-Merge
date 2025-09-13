import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, TrendingDown } from "lucide-react";

interface MaterialDeal {
  id: string | number;
  name: string;
  category: string;
  price: string;
  salePrice?: string;
  supplier: string;
  image: string;
  discount?: number;
  isOnSale?: boolean;
  stockStatus?: string;
  productUrl?: string;
}

interface MaterialTopDiscountsProps {
  deals: MaterialDeal[];
}

const MaterialTopDiscounts = ({ deals }: MaterialTopDiscountsProps) => {
  if (!deals || deals.length === 0) return null;

  const getProductUrl = (deal: MaterialDeal) => {
    if (deal.productUrl) return deal.productUrl;
    
    // Fallback search URLs
    const supplier = (deal.supplier || "").toLowerCase();
    const term = encodeURIComponent(deal.name);
    
    if (supplier.includes("screwfix")) return `https://www.screwfix.com/search?search=${term}`;
    if (supplier.includes("city")) return `https://www.cef.co.uk/search?q=${term}`;
    if (supplier.includes("electricaldirect")) return `https://www.electricaldirect.co.uk/search?query=${term}`;
    if (supplier.includes("toolstation")) return `https://www.toolstation.com/search?q=${term}`;
    
    return "#";
  };

  return (
    <Card className="bg-elec-card/50 border-elec-yellow/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-semibold text-elec-light">Top Discounts</h3>
          <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
            Save up to {deals[0]?.discount}%
          </Badge>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-elec-gray scrollbar-thumb-elec-yellow/30">
          {deals.map((deal, index) => (
            <div key={deal.id} className="flex-shrink-0 w-64">
              <Card className="h-full bg-elec-gray/50 border-elec-yellow/10 hover:border-elec-yellow/30 transition-all duration-200">
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    {/* Image */}
                    <div className="w-16 h-16 bg-elec-gray/30 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src={deal.image || "/placeholder.svg"}
                        alt={deal.name}
                        className="object-cover w-full h-full"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-1">
                        <Badge variant="destructive" className="text-xs font-bold">
                          {deal.discount}% OFF
                        </Badge>
                      </div>
                      
                      <h4 className="font-medium text-sm text-elec-light leading-tight mb-2 truncate">
                        {deal.name}
                      </h4>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold text-elec-yellow">{deal.salePrice}</span>
                        <span className="line-through text-muted-foreground text-xs">{deal.price}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 mb-2">
                        <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-[10px]">
                          {deal.supplier}
                        </Badge>
                      </div>
                      
                      <a href={getProductUrl(deal)} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="gold" className="w-full text-xs">
                          View Deal
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialTopDiscounts;
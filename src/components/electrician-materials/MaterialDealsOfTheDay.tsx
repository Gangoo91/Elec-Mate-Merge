import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ExternalLink, Zap } from "lucide-react";

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

interface MaterialDealsOfTheDayProps {
  deal: MaterialDeal | null;
}

const MaterialDealsOfTheDay = ({ deal }: MaterialDealsOfTheDayProps) => {
  if (!deal) return null;

  const getProductUrl = () => {
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
    <Card className="bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border-elec-yellow/30 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-elec-yellow" />
              <Badge variant="default" className="bg-elec-yellow text-elec-dark font-semibold">
                DEAL OF THE DAY
              </Badge>
              {deal.discount && (
                <Badge variant="destructive" className="font-bold">
                  {deal.discount}% OFF
                </Badge>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-elec-light mb-2">{deal.name}</h3>
            
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-elec-yellow">{deal.salePrice}</span>
                <span className="line-through text-muted-foreground">{deal.price}</span>
              </div>
              <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                {deal.supplier}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs">
                {deal.category}
              </Badge>
              {deal.stockStatus && (
                <Badge 
                  variant={deal.stockStatus === "In Stock" ? "success" : "warning"}
                  className="text-xs"
                >
                  {deal.stockStatus}
                </Badge>
              )}
            </div>
            
            <a href={getProductUrl()} target="_blank" rel="noopener noreferrer">
              <Button variant="gold" className="font-semibold">
                Shop Deal Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </div>
          
          {/* Image */}
          <div className="w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
            <div className="h-full bg-elec-gray/20 flex items-center justify-center overflow-hidden">
              <img
                src={deal.image || "/placeholder.svg"}
                alt={`${deal.name} deal`}
                className="object-cover w-full h-full"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialDealsOfTheDay;
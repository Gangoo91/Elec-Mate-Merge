import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Percent } from "lucide-react";
import { ToolItem } from "@/hooks/useToolsData";

interface TopDiscountsStripProps {
  deals: ToolItem[];
  maxDeals?: number;
}

const TopDiscountsStrip = ({ deals, maxDeals = 5 }: TopDiscountsStripProps) => {
  const topDeals = deals
    .filter(tool => tool.isOnSale && tool.salePrice)
    .slice(0, maxDeals);

  if (topDeals.length === 0) return null;

  const calculateSavings = (tool: ToolItem) => {
    if (!tool.price || !tool.salePrice) return null;
    
    const originalPrice = parseFloat(tool.price.replace(/[£,]/g, ''));
    const salePrice = parseFloat(tool.salePrice.replace(/[£,]/g, ''));
    
    if (originalPrice && salePrice) {
      const savings = originalPrice - salePrice;
      const percentage = Math.round(((savings / originalPrice) * 100));
      return { percentage, savings: `£${savings.toFixed(2)}` };
    }
    return null;
  };

  const getProductUrl = (tool: ToolItem) => {
    const supplier = (tool.supplier || "").toLowerCase();
    const buildSearch = (q: string) => {
      const term = encodeURIComponent(q);
      if (supplier.includes("electricaldirect")) return `https://www.electricaldirect.co.uk/search?query=${term}`;
      if (supplier.includes("city")) return `https://www.cef.co.uk/search?q=${term}`;
      if (supplier.includes("screwfix")) return `https://www.screwfix.com/search?search=${term}`;
      if (supplier.includes("toolstation")) return `https://www.toolstation.com/search?q=${term}`;
      return "#";
    };

    return tool.productUrl || tool.view_product_url || buildSearch(tool.name);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Percent className="h-5 w-5 text-elec-yellow" />
        <h3 className="text-lg font-semibold text-elec-light">Top 5 Discounts</h3>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth scrollbar-hide">
        {topDeals.map((tool, index) => {
          const savings = calculateSavings(tool);
          
          return (
            <Card key={tool.id || index} className="flex-shrink-0 w-64 bg-elec-card/40 border-elec-yellow/20 hover:border-elec-yellow/40 transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-elec-gray/30 border border-elec-yellow/10 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img
                      src={tool.image || "/placeholder.svg"}
                      alt={tool.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="destructive" className="text-xs font-bold">
                        SALE
                      </Badge>
                      {savings && (
                        <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400 text-xs">
                          {savings.percentage}% OFF
                        </Badge>
                      )}
                    </div>
                    
                    <h4 className="font-semibold text-elec-light text-sm line-clamp-2 mb-2">
                      {tool.name}
                    </h4>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-elec-yellow text-sm">{tool.salePrice}</span>
                      <span className="line-through text-text-muted text-xs">{tool.price}</span>
                    </div>
                    
                    <div className="text-xs text-text-muted mb-3">
                      {tool.supplier}
                    </div>
                    
                    <a href={getProductUrl(tool)} target="_blank" rel="noopener noreferrer" className="block">
                      <Button size="sm" variant="outline" className="w-full bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20 text-xs">
                        View Deal
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TopDiscountsStrip;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Plus, Minus, Check, Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ToolItem } from "@/hooks/useToolsData";

interface ToolCardProps {
  item: ToolItem;
  onAddToCompare?: (item: ToolItem) => void;
  onRemoveFromCompare?: (itemId: string) => void;
  isSelected?: boolean;
  isCompareDisabled?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  item, 
  onAddToCompare, 
  onRemoveFromCompare, 
  isSelected = false, 
  isCompareDisabled = false 
}) => {
  const isMobile = useIsMobile();

  // Extract tool-specific information
  const getToolInfo = () => {
    const name = item.name.toLowerCase();
    const info: { type?: string; power?: string; voltage?: string; cordless?: boolean } = {};
    
    // Tool type detection
    if (name.includes('drill')) info.type = 'Drill';
    else if (name.includes('saw')) info.type = 'Saw';
    else if (name.includes('grinder')) info.type = 'Grinder';
    else if (name.includes('multimeter')) info.type = 'Multimeter';
    else if (name.includes('tester')) info.type = 'Tester';
    else if (name.includes('screwdriver')) info.type = 'Screwdriver';
    else if (name.includes('pliers')) info.type = 'Pliers';
    
    // Power detection
    const powerMatch = name.match(/(\d+(?:\.\d+)?)\s*(?:w|watt)/);
    if (powerMatch) info.power = `${powerMatch[1]}W`;
    
    // Voltage detection
    const voltageMatch = name.match(/(\d+(?:\.\d+)?)\s*v(?:olt)?/);
    if (voltageMatch) info.voltage = `${voltageMatch[1]}V`;
    
    // Cordless detection
    info.cordless = name.includes('cordless') || name.includes('battery');
    
    return info;
  };

  const toolInfo = getToolInfo();
  const isPowerTool = item.category?.toLowerCase().includes('power') || toolInfo.cordless;

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

    if (item.productUrl || item.view_product_url) {
      try {
        const url = item.productUrl || item.view_product_url;
        const base = expectedHost ? `https://www.${expectedHost}/` : undefined;
        const fullUrl = base ? new URL(url!, base) : new URL(url!);
        const isHttp = /^https?:$/.test(fullUrl.protocol);
        const hostOk = expectedHost ? fullUrl.hostname.endsWith(expectedHost) : true;
        if (isHttp && hostOk) return fullUrl.toString();
      } catch {
        // ignore and fall back
      }
    }

    return buildSearch(item.name);
  };

  // Normalise image paths and update wid/hei parameters
  const imageSrc = (() => {
    const src = item.image;
    if (!src) return "/placeholder.svg";
    
    let finalSrc = src;
    
    // If it's not already an absolute URL, make it one
    if (!/^https?:\/\//i.test(src) && !src.startsWith("/")) {
      finalSrc = `/${src}`;
    }
    
    // Update image size parameters from 136x136 to 236x236
    if (finalSrc.includes("wid=136") && finalSrc.includes("hei=136")) {
      finalSrc = finalSrc.replace(/wid=136/g, "wid=236").replace(/hei=136/g, "hei=236");
    }
    
    return finalSrc;
  })();

  return (
    <Card className="group h-full hover:border-elec-yellow/30 transition-all duration-200">
      <CardContent className="p-4 h-full">
        {/* Header with stock status */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20 text-[10px]">
              {item.category}
            </Badge>
          </div>
          {item.stockStatus && (
            <Badge 
              variant={
                item.stockStatus === "In Stock" ? "success" :
                item.stockStatus === "Low Stock" ? "warning" :
                "destructive"
              }
              className="text-[10px]"
            >
              {item.stockStatus}
            </Badge>
          )}
        </div>

        {/* Product name */}
        <h3 className="font-semibold text-foreground mb-3 leading-snug">
          {item.name}
        </h3>

        {/* Image */}
        <div className={`bg-muted/50 border rounded ${isMobile ? 'h-40' : 'h-48'} mb-3 flex items-center justify-center overflow-hidden`}>
          <img
            src={imageSrc}
            alt={`${item.name} from ${item.supplier}`}
            loading="lazy"
            className="object-fill w-full h-full"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
          />
        </div>
        
        {/* Specifications - simplified */}
        {isPowerTool && (toolInfo.type || toolInfo.power || toolInfo.voltage) && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1 text-xs">
              {toolInfo.type && (
                <Badge variant="secondary" className="text-[10px]">
                  {toolInfo.type}
                </Badge>
              )}
              {toolInfo.power && (
                <Badge variant="secondary" className="text-[10px]">
                  {toolInfo.power}
                </Badge>
              )}
              {toolInfo.voltage && (
                <Badge variant="secondary" className="text-[10px]">
                  {toolInfo.voltage}
                </Badge>
              )}
              {toolInfo.cordless && (
                <Badge variant="secondary" className="text-[10px]">
                  Cordless
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {/* Supplier */}
        <div className="text-sm text-muted-foreground mb-3">
          {item.supplier}
        </div>
        
        {/* Highlights */}
        {item.highlights && item.highlights.length > 0 && (
          <div className="mb-3">
            <ul className="text-xs text-muted-foreground space-y-1">
              {item.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-elec-yellow rounded-full mr-2 flex-shrink-0"></span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Reviews */}
        {item.reviews && (
          <div className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-current text-yellow-500" />
            {item.reviews} reviews
          </div>
        )}
        
        {/* Price - prominent */}
        <div className="mb-4">
          {item.isOnSale ? (
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-elec-yellow">{item.salePrice}</span>
              <span className="line-through text-muted-foreground text-sm">{item.price}</span>
              <Badge variant="destructive" className="text-[10px]">SALE</Badge>
            </div>
          ) : (
            <span className="text-xl font-bold text-elec-yellow">{item.price}</span>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="space-y-2">
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
              variant={isSelected ? "gold" : "outline"}
              size="sm"
              className={`w-full ${isSelected ? '' : 'bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20'}`}
            >
              {isSelected ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Selected
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Compare
                </>
              )}
            </Button>
          )}
          
          <a href={getProductUrl()} target="_blank" rel="noopener noreferrer" className="block w-full">
            <Button variant="gold" size="sm" className="w-full">
              View Deal
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
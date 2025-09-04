
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Plus, Minus, Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  // Extract cable-specific information
  const getCableInfo = () => {
    const name = item.name.toLowerCase();
    const info: { type?: string; size?: string; length?: string; cores?: string } = {};
    
    // Cable type detection
    if (name.includes('twin') && name.includes('earth')) info.type = 'T&E';
    else if (name.includes('swa')) info.type = 'SWA';
    else if (name.includes('flex') || name.includes('flexible')) info.type = 'Flex';
    else if (name.includes('cat6') || name.includes('cat5')) info.type = 'Data';
    else if (name.includes('coax')) info.type = 'Coax';
    
    // Size detection
    const sizeMatch = name.match(/(\d+(?:\.\d+)?)\s*mm(?:2|²)?/);
    if (sizeMatch) info.size = `${sizeMatch[1]}mm²`;
    
    // Length detection
    const lengthMatch = name.match(/(\d+)\s*m(?:etre)?(?:s?)?\b/);
    if (lengthMatch) info.length = `${lengthMatch[1]}m`;
    
    // Core count detection
    const coreMatch = name.match(/(\d+)\s*core/);
    if (coreMatch) info.cores = `${coreMatch[1]} core`;
    
    return info;
  };

  const cableInfo = getCableInfo();
  const isCable = item.category.toLowerCase().includes('cable') || cableInfo.type;

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
        {isCable && (cableInfo.type || cableInfo.size || cableInfo.length) && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1 text-xs">
              {cableInfo.type && (
                <Badge variant="secondary" className="text-[10px]">
                  {cableInfo.type}
                </Badge>
              )}
              {cableInfo.size && (
                <Badge variant="secondary" className="text-[10px]">
                  {cableInfo.size}
                </Badge>
              )}
              {cableInfo.length && (
                <Badge variant="secondary" className="text-[10px]">
                  {cableInfo.length}
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

export default MaterialCard;

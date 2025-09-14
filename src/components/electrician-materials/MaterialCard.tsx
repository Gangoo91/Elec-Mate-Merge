
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
    <Card className="mobile-card group h-full hover:border-elec-yellow/30 transition-all duration-200 mobile-interactive bg-elec-card/30 border-elec-yellow/20">
      <CardContent className="p-4 h-full flex flex-col">
        {/* Header with stock status */}
        <div className="flex justify-between items-start mb-3 gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20 text-[10px] font-medium">
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
              className="text-[10px] font-medium flex-shrink-0"
            >
              {item.stockStatus}
            </Badge>
          )}
        </div>

        {/* Product name */}
        <h3 className="mobile-text font-semibold text-elec-light mb-3 leading-snug line-clamp-2">
          {item.name}
        </h3>

        {/* Image */}
        <div className={`bg-elec-gray/50 border border-elec-yellow/10 rounded-lg ${isMobile ? 'h-40' : 'h-48'} mb-3 flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:border-elec-yellow/20`}>
          <img
            src={imageSrc}
            alt={`${item.name} from ${item.supplier}`}
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
          />
        </div>
        
        {/* Specifications - simplified */}
        {isCable && (cableInfo.type || cableInfo.size || cableInfo.length) && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {cableInfo.type && (
                <Badge variant="secondary" className="text-[10px] bg-elec-gray/50 text-text-subtle border-elec-yellow/10">
                  {cableInfo.type}
                </Badge>
              )}
              {cableInfo.size && (
                <Badge variant="secondary" className="text-[10px] bg-elec-gray/50 text-text-subtle border-elec-yellow/10">
                  {cableInfo.size}
                </Badge>
              )}
              {cableInfo.length && (
                <Badge variant="secondary" className="text-[10px] bg-elec-gray/50 text-text-subtle border-elec-yellow/10">
                  {cableInfo.length}
                </Badge>
              )}
              {cableInfo.cores && (
                <Badge variant="secondary" className="text-[10px] bg-elec-gray/50 text-text-subtle border-elec-yellow/10">
                  {cableInfo.cores}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {/* Supplier */}
        <div className="mobile-small-text text-text-muted mb-3 font-medium">
          {item.supplier}
        </div>
        
        {/* Highlights */}
        {item.highlights && item.highlights.length > 0 && (
          <div className="mb-3 flex-1">
            <ul className="mobile-small-text text-text-subtle space-y-1.5 list-disc pl-4">
              {item.highlights.slice(0, 3).map((highlight, index) => (
                <li key={index} className="leading-relaxed">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Price - prominent */}
        <div className="mb-4 mt-auto">
          {item.isOnSale ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xl font-bold text-elec-yellow">{item.salePrice}</span>
              <span className="line-through text-text-muted mobile-small-text">{item.price}</span>
              <Badge variant="destructive" className="text-[10px] font-medium">SALE</Badge>
            </div>
          ) : (
            <span className="text-xl font-bold text-elec-yellow">{item.price}</span>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="mobile-input-spacing mt-auto">
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
              className={`w-full touch-target mobile-interactive ${isSelected ? 'shadow-sm' : 'bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20'}`}
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
            <Button variant="gold" size="sm" className="w-full touch-target mobile-interactive shadow-sm hover:shadow-md transition-shadow duration-200">
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

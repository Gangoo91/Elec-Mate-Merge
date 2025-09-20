
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Plus, Check, Star, Package, Users, Clock, CheckCircle } from "lucide-react";
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
    <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:border-elec-yellow/40 transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        {/* Simplified image section matching course cards */}
        <div className="relative -mx-6 -mt-6 mb-4">
          <div className="h-32 sm:h-36 overflow-hidden">
            <img
              src={imageSrc}
              alt={`${item.name} from ${item.supplier}`}
              loading="lazy"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
            />
          </div>
          {/* Simplified badges matching course card style */}
          <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-2">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
              {item.category}
            </Badge>
            {item.stockStatus && (
              <Badge 
                className={
                  item.stockStatus === "In Stock" 
                    ? "bg-green-500/20 text-green-400 border-green-500/30" :
                  item.stockStatus === "Low Stock" 
                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                    "bg-red-500/20 text-red-400 border-red-500/30"
                }
                variant="outline"
              >
                {item.stockStatus}
              </Badge>
            )}
          </div>
        </div>

        {/* Course card style header */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg leading-tight font-semibold line-clamp-2">
              {item.name}
            </h3>
            <p className="text-elec-yellow text-sm mt-1">
              {item.supplier}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-amber-400/20 text-amber-400 px-2 py-1 rounded text-xs">
            <Star className="h-3 w-3 fill-amber-400" />
            <span>4.2</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 flex-grow flex flex-col space-y-3">
        {/* Simplified product info matching course cards */}
        <div className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {item.highlights && item.highlights.length > 0 
            ? item.highlights.slice(0, 2).join(" • ") 
            : `Quality ${item.category.toLowerCase()} from ${item.supplier}`}
        </div>
        
        {/* Key metrics grid matching course card style */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <Package className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            <span>{isCable && cableInfo.type ? cableInfo.type : 'Standard'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            <span>{isCable && cableInfo.size ? cableInfo.size : 'Pro Grade'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            <span>{item.stockStatus || 'Available'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            <span>Quality: 4.2/5</span>
          </div>
        </div>

        {/* Product details */}
        {isCable && (cableInfo.length || cableInfo.cores) && (
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-xs text-elec-yellow">
              <Package className="h-3 w-3" />
              <span>Specifications:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {cableInfo.length && (
                <span className="text-xs bg-elec-dark/60 px-2 py-1 rounded-md">
                  {cableInfo.length}
                </span>
              )}
              {cableInfo.cores && (
                <span className="text-xs bg-elec-dark/60 px-2 py-1 rounded-md">
                  {cableInfo.cores}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Key features */}
        {item.highlights && item.highlights.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-xs text-elec-yellow">
              <CheckCircle className="h-3 w-3" />
              <span>Key Features:</span>
            </div>
            <div className="space-y-1">
              {item.highlights.slice(0, 2).map((highlight, index) => (
                <div key={index} className="flex items-center gap-1.5 text-xs">
                  <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                  <span className="text-muted-foreground">{highlight}</span>
                </div>
              ))}
              {item.highlights.length > 2 && (
                <div className="text-xs text-muted-foreground">
                  +{item.highlights.length - 2} more features
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-elec-yellow/10">
          <div className="space-y-1">
            {item.isOnSale ? (
              <>
                <p className="text-xs text-amber-400/80 flex items-center gap-1">
                  <Badge variant="destructive" className="text-xs mr-1">SALE</Badge>
                  {item.salePrice}
                </p>
                <p className="text-xs text-muted-foreground line-through">{item.price}</p>
              </>
            ) : (
              <p className="text-xs text-amber-400/80">{item.price}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              onClick={() => window.open(getProductUrl(), '_blank')}
            >
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
                className="p-2"
              >
                {isSelected ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;

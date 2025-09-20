
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Plus, Check, Star, Package, Users, Clock } from "lucide-react";
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
    <Card className="group bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl border border-white/10 hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] h-full cursor-pointer">
      {/* Image at the very top */}
      <div className="relative overflow-hidden rounded-t-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 overflow-hidden"></div>
        <div className={`${isMobile ? 'h-40' : 'h-48'} overflow-hidden`}>
          <img
            src={imageSrc}
            alt={`${item.name} from ${item.supplier}`}
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 transform-gpu"
            style={{ transformOrigin: 'center center' }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
          />
        </div>
        {/* Badges overlaid on image */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-20">
          <Badge variant="secondary" className="text-xs bg-black/70 text-white border-white/20 backdrop-blur-sm">
            {item.category}
          </Badge>
          {item.stockStatus && (
            <Badge 
              className={
                item.stockStatus === "In Stock" 
                  ? "bg-green-500/80 text-white border-green-500/30 backdrop-blur-sm" :
                item.stockStatus === "Low Stock" 
                  ? "bg-yellow-500/80 text-white border-yellow-500/30 backdrop-blur-sm" :
                  "bg-red-500/80 text-white border-red-500/30 backdrop-blur-sm"
              }
              variant="outline"
            >
              {item.stockStatus}
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-3 flex flex-col flex-1">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 
              className="font-semibold text-sm sm:text-base text-white group-hover:text-elec-yellow transition-colors line-clamp-2"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
            >
              {item.name}
            </h3>
            <p className="text-elec-yellow font-medium mt-1 text-xs sm:text-sm">
              {item.supplier}
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-white font-medium">4.2</span>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <div>
              <div className="text-white/60 text-xs">Type</div>
              <div className="text-white font-medium">{isCable && cableInfo.type ? cableInfo.type : 'Standard'}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <div>
              <div className="text-white/60 text-xs">Size</div>
              <div className="text-white font-medium">{isCable && cableInfo.size ? cableInfo.size : 'Standard'}</div>
            </div>
          </div>
        </div>

        {/* Additional specifications for cables */}
        {isCable && (cableInfo.length || cableInfo.cores) && (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {cableInfo.length && (
                <Badge variant="outline" className="text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
                  {cableInfo.length}
                </Badge>
              )}
              {cableInfo.cores && (
                <Badge variant="outline" className="text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
                  {cableInfo.cores}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Highlights */}
        {item.highlights && item.highlights.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white">Key Features:</h4>
            <div className="flex flex-wrap gap-1">
              {item.highlights.slice(0, 3).map((highlight, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
                  {highlight}
                </Badge>
              ))}
              {item.highlights.length > 3 && (
                <Badge variant="outline" className="text-xs text-white/60">
                  +{item.highlights.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Price section */}
        <div className="bg-background/30 rounded-lg p-3 border border-elec-yellow/10">
          <div className="text-xs text-white/60 mb-1">Price</div>
          {item.isOnSale ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-elec-yellow font-semibold text-lg">{item.salePrice}</span>
              <span className="line-through text-white/60 text-sm">{item.price}</span>
              <Badge variant="destructive" className="text-xs">SALE</Badge>
            </div>
          ) : (
            <span className="text-elec-yellow font-semibold text-lg">{item.price}</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-2">
          <Button 
            onClick={() => window.open(getProductUrl(), '_blank')}
            className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
          >
            View Deal
            <ExternalLink className="ml-2 h-4 w-4" />
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
              className="ml-2 p-2"
            >
              {isSelected ? (
                <Check className={`h-4 w-4 text-green-400`} />
              ) : (
                <Plus className="h-4 w-4 text-white/60" />
              )}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MaterialCard;

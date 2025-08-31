
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

import { MaterialItem as BaseMaterialItem } from "@/data/electrician/productData";

interface MaterialItem extends BaseMaterialItem {
  productUrl?: string;
}

interface MaterialCardProps {
  item: MaterialItem;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ item }) => {
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

  // Normalise image paths to ensure relative placeholders become absolute
  const imageSrc = (() => {
    const src = item.image;
    if (!src) return "/placeholder.svg";
    if (/^https?:\/\//i.test(src) || src.startsWith("/")) return src;
    return `/${src}`;
  })();

  return (
    <Card className="group h-full hover:border-elec-yellow/30 transition-all duration-200">
      <CardContent className="p-4 h-full">
        {/* Header with stock status */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className="bg-elec-yellow/20 text-elec-yellow text-xs px-2 py-1 rounded font-medium">
              {item.category}
            </span>
          </div>
          {item.stockStatus && (
            <span className={`text-xs px-2 py-1 rounded font-medium ${
              item.stockStatus === "In Stock" ? "bg-green-500/20 text-green-400" :
              item.stockStatus === "Low Stock" ? "bg-orange-500/20 text-orange-400" :
              "bg-red-500/20 text-red-400"
            }`}>
              {item.stockStatus}
            </span>
          )}
        </div>

        {/* Product name */}
        <h3 className="font-semibold text-foreground mb-3 leading-snug">
          {item.name}
        </h3>

        {/* Image */}
        <div className="bg-muted/50 border rounded h-32 mb-3 flex items-center justify-center overflow-hidden">
          <img
            src={imageSrc}
            alt={`${item.name} from ${item.supplier}`}
            loading="lazy"
            className="object-cover w-full h-full"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
          />
        </div>
        
        {/* Specifications - simplified */}
        {isCable && (cableInfo.type || cableInfo.size || cableInfo.length) && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1 text-xs">
              {cableInfo.type && (
                <span className="bg-muted text-muted-foreground px-2 py-1 rounded">
                  {cableInfo.type}
                </span>
              )}
              {cableInfo.size && (
                <span className="bg-muted text-muted-foreground px-2 py-1 rounded">
                  {cableInfo.size}
                </span>
              )}
              {cableInfo.length && (
                <span className="bg-muted text-muted-foreground px-2 py-1 rounded">
                  {cableInfo.length}
                </span>
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
              <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded font-medium">SALE</span>
            </div>
          ) : (
            <span className="text-xl font-bold text-elec-yellow">{item.price}</span>
          )}
        </div>
        
        {/* Action button */}
        <a href={getProductUrl()} target="_blank" rel="noopener noreferrer" className="block w-full">
          <Button className="w-full bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold">
            View Deal
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;

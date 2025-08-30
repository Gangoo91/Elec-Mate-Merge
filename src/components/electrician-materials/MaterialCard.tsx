
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
    <Card className="border-elec-yellow/20 bg-elec-gray flex flex-col h-full hover:border-elec-yellow/50 transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <span className="bg-elec-yellow/20 text-elec-yellow text-xs px-2 py-1 rounded">
            {item.category}
          </span>
          {item.stockStatus && (
            <span className={`text-xs px-2 py-1 rounded ${
              item.stockStatus === "In Stock" ? "bg-green-500/20 text-green-500" :
              item.stockStatus === "Low Stock" ? "bg-orange-500/20 text-orange-500" :
              "bg-red-500/20 text-red-500"
            }`}>
              {item.stockStatus}
            </span>
          )}
        </div>
        <CardTitle className="text-lg">{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 justify-between">
        <div className="bg-elec-card/50 h-32 rounded-md mb-4 flex items-center justify-center overflow-hidden">
          <img
            src={imageSrc}
            alt={`${item.name} from ${item.supplier} - electrical materials`}
            loading="lazy"
            className="object-contain w-full h-full"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
          />
        </div>
        
        <div className="space-y-4">
          {/* Cable-specific information */}
          {isCable && (cableInfo.type || cableInfo.size || cableInfo.length || cableInfo.cores) && (
            <div className="flex flex-wrap gap-1 mb-2">
              {cableInfo.type && (
                <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">
                  {cableInfo.type}
                </span>
              )}
              {cableInfo.size && (
                <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">
                  {cableInfo.size}
                </span>
              )}
              {cableInfo.length && (
                <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-1 rounded">
                  {cableInfo.length}
                </span>
              )}
              {cableInfo.cores && (
                <span className="bg-indigo-500/20 text-indigo-400 text-xs px-2 py-1 rounded">
                  {cableInfo.cores}
                </span>
              )}
            </div>
          )}
          
          <div className="text-sm text-muted-foreground">Supplier: {item.supplier}</div>
          
          <div className="flex items-baseline gap-2">
            {item.isOnSale ? (
              <>
                <span className="font-bold text-elec-yellow">{item.salePrice}</span>
                <span className="line-through text-muted-foreground text-sm">{item.price}</span>
              </>
            ) : (
              <span className="font-bold text-elec-yellow">{item.price}</span>
            )}
          </div>
          
          <div className="mt-auto">
            <a href={getProductUrl()} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full flex items-center gap-2">
                View Deal <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;

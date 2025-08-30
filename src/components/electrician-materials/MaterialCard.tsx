
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
    <Card className="group border-elec-yellow/20 bg-elec-gray flex flex-col h-full hover:border-elec-yellow/40 hover:shadow-lg hover:shadow-elec-yellow/10 transition-all duration-300 hover:scale-[1.02]">
      {/* Header Section */}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-wrap gap-1.5">
            <span className="bg-elec-yellow/20 text-elec-yellow text-xs px-2.5 py-1 rounded-full font-medium">
              Cables
            </span>
            {item.category && item.category !== "Cables" && (
              <span className="bg-blue-500/20 text-blue-400 text-xs px-2.5 py-1 rounded-full font-medium">
                {item.category}
              </span>
            )}
          </div>
          {item.stockStatus && (
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              item.stockStatus === "In Stock" ? "bg-green-500/20 text-green-400" :
              item.stockStatus === "Low Stock" ? "bg-orange-500/20 text-orange-400" :
              "bg-red-500/20 text-red-400"
            }`}>
              {item.stockStatus}
            </span>
          )}
        </div>
        <CardTitle className="text-lg font-semibold leading-tight group-hover:text-elec-yellow transition-colors duration-200">
          {item.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 px-6 pb-6">
        {/* Image Section */}
        <div className="relative bg-gradient-to-br from-elec-card/60 to-elec-card/40 border border-elec-yellow/10 h-36 rounded-lg mb-4 flex items-center justify-center overflow-hidden group-hover:border-elec-yellow/20 transition-all duration-300">
          <img
            src={imageSrc}
            alt={`${item.name} from ${item.supplier} - electrical materials`}
            loading="lazy"
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content Section */}
        <div className="flex flex-col flex-1 space-y-4">
          {/* Technical Specifications */}
          {isCable && (cableInfo.type || cableInfo.size || cableInfo.length || cableInfo.cores) && (
            <div className="bg-elec-card/30 border border-elec-yellow/10 rounded-lg p-3">
              <div className="text-xs font-medium text-muted-foreground mb-2">Specifications</div>
              <div className="flex flex-wrap gap-1.5">
                {cableInfo.type && (
                  <span className="bg-blue-500/15 text-blue-400 text-xs px-2 py-1 rounded-md font-medium">
                    {cableInfo.type}
                  </span>
                )}
                {cableInfo.size && (
                  <span className="bg-purple-500/15 text-purple-400 text-xs px-2 py-1 rounded-md font-medium">
                    {cableInfo.size}
                  </span>
                )}
                {cableInfo.length && (
                  <span className="bg-cyan-500/15 text-cyan-400 text-xs px-2 py-1 rounded-md font-medium">
                    {cableInfo.length}
                  </span>
                )}
                {cableInfo.cores && (
                  <span className="bg-indigo-500/15 text-indigo-400 text-xs px-2 py-1 rounded-md font-medium">
                    {cableInfo.cores}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Supplier Information */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-elec-yellow/60 rounded-full" />
            <span className="font-medium">Supplier:</span>
            <span>{item.supplier}</span>
          </div>
          
          {/* Price Section */}
          <div className="bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/20 rounded-lg p-3 mt-auto">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                {item.isOnSale ? (
                  <>
                    <span className="text-xl font-bold text-elec-yellow">{item.salePrice}</span>
                    <span className="line-through text-muted-foreground text-sm">{item.price}</span>
                    <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full font-medium">SALE</span>
                  </>
                ) : (
                  <span className="text-xl font-bold text-elec-yellow">{item.price}</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <a href={getProductUrl()} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button className="w-full bg-gradient-to-r from-elec-yellow to-elec-yellow/90 hover:from-elec-yellow/90 hover:to-elec-yellow text-elec-dark font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 group/btn">
              <span>View Deal</span>
              <ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;

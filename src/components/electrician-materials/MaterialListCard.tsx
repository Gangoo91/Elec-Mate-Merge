import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Plus, Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MaterialItem } from "@/hooks/useToolsForMaterials";

interface MaterialListCardProps {
  item: MaterialItem;
  onAddToCompare?: (item: MaterialItem) => void;
  onRemoveFromCompare?: (itemId: string) => void;
  isSelected?: boolean;
  isCompareDisabled?: boolean;
}

const MaterialListCard: React.FC<MaterialListCardProps> = ({ 
  item, 
  onAddToCompare, 
  onRemoveFromCompare, 
  isSelected = false, 
  isCompareDisabled = false 
}) => {
  const isMobile = useIsMobile();

  // Extract material-specific information
  const getMaterialInfo = () => {
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

  const materialInfo = getMaterialInfo();
  const isCable = item.category.toLowerCase().includes('cable') || materialInfo.type;

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

  // Normalise image paths
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
    <Card className="group hover:border-elec-yellow/30 transition-all duration-200 bg-elec-card/30 border-elec-yellow/20">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Image */}
          <div className="flex-shrink-0">
            <div className="bg-elec-gray/50 border border-elec-yellow/10 rounded-lg w-full md:w-24 h-24 flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:border-elec-yellow/20">
              <img
                src={imageSrc}
                alt={`${item.name} from ${item.supplier}`}
                loading="lazy"
                className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              {/* Product Info */}
              <div className="flex-1 min-w-0">
                {/* Header with badges */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20 text-[10px] font-medium">
                    {item.category}
                  </Badge>
                  {item.stockStatus && (
                    <Badge 
                      variant={
                        item.stockStatus === "In Stock" ? "success" :
                        item.stockStatus === "Low Stock" ? "warning" :
                        "destructive"
                      }
                      className="text-[10px] font-medium"
                    >
                      {item.stockStatus}
                    </Badge>
                  )}
                  {item.isOnSale && (
                    <Badge variant="destructive" className="text-[10px] font-medium">SALE</Badge>
                  )}
                </div>

                {/* Product name */}
                <h3 className="font-semibold text-elec-light mb-2 leading-snug line-clamp-2">
                  {item.name}
                </h3>

                {/* Specifications */}
                {isCable && (materialInfo.type || materialInfo.size || materialInfo.length) && (
                  <div className="mb-2">
                    <div className="flex flex-wrap gap-1">
                      {materialInfo.type && (
                        <Badge variant="secondary" className="text-[10px] bg-elec-gray/50 text-text-subtle border-elec-yellow/10">
                          {materialInfo.type}
                        </Badge>
                      )}
                      {materialInfo.size && (
                        <Badge variant="secondary" className="text-[10px] bg-elec-gray/50 text-text-subtle border-elec-yellow/10">
                          {materialInfo.size}
                        </Badge>
                      )}
                      {materialInfo.length && (
                        <Badge variant="secondary" className="text-[10px] bg-elec-gray/50 text-text-subtle border-elec-yellow/10">
                          {materialInfo.length}
                        </Badge>
                      )}
                      {materialInfo.cores && (
                        <Badge variant="secondary" className="text-[10px] bg-elec-gray/50 text-text-subtle border-elec-yellow/10">
                          {materialInfo.cores}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Supplier */}
                <div className="text-sm text-text-muted mb-2 font-medium">
                  {item.supplier}
                </div>

                {/* Highlights - truncated for list view */}
                {item.highlights && item.highlights.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs text-text-subtle line-clamp-2">
                      {item.highlights.slice(0, 2).join(" • ")}
                    </p>
                  </div>
                )}
              </div>

              {/* Price and Actions */}
              <div className="flex-shrink-0 text-right md:text-left">
                {/* Price */}
                <div className="mb-3">
                  {item.isOnSale ? (
                    <div className="flex flex-col md:items-end gap-1">
                      <span className="text-xl font-bold text-elec-yellow">{item.salePrice}</span>
                      <span className="line-through text-text-muted text-sm">{item.price}</span>
                    </div>
                  ) : (
                    <span className="text-xl font-bold text-elec-yellow">{item.price}</span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2 w-full md:w-32">
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
                      className={`w-full ${isSelected ? 'shadow-sm' : 'bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20'}`}
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
                    <Button variant="gold" size="sm" className="w-full shadow-sm hover:shadow-md transition-shadow duration-200">
                      View Deal
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialListCard;
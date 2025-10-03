import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Plus, 
  Check, 
  Package, 
  Star, 
  Clock, 
  Users, 
  CheckCircle, 
  Zap, 
  Shield, 
  TrendingUp, 
  Award, 
  Eye, 
  ShoppingCart,
  Timer
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useMemo } from "react";

import { MaterialItem as BaseMaterialItem } from "@/data/electrician/productData";

interface MaterialItem extends BaseMaterialItem {
  productUrl?: string;
  brand?: string;
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
  const [isHovered, setIsHovered] = useState(false);
  
  // Extract cable-specific information
  const getCableInfo = () => {
    const name = item.name.toLowerCase();
    const info: { 
      type?: string; 
      size?: string; 
      length?: string; 
      cores?: string;
      voltage?: string;
      standard?: string;
    } = {};
    
    // Cable type detection
    if (name.includes('twin') && name.includes('earth')) info.type = 'Twin & Earth';
    else if (name.includes('swa')) info.type = 'SWA Armoured';
    else if (name.includes('flex') || name.includes('flexible')) info.type = 'Flexible';
    else if (name.includes('cat6') || name.includes('cat5')) info.type = 'Data Cable';
    else if (name.includes('coax')) info.type = 'Coaxial';
    else if (name.includes('fire')) info.type = 'Fire Resistant';
    
    // Size detection
    const sizeMatch = name.match(/(\d+(?:\.\d+)?)\s*mm(?:2|²)?/);
    if (sizeMatch) info.size = `${sizeMatch[1]}mm²`;
    
    // Length detection
    const lengthMatch = name.match(/(\d+)\s*m(?:etre)?(?:s?)?\b/);
    if (lengthMatch) info.length = `${lengthMatch[1]}m`;
    
    // Core count detection
    const coreMatch = name.match(/(\d+)\s*core/);
    if (coreMatch) info.cores = `${coreMatch[1]} core`;
    
    // Voltage rating
    if (name.includes('1kv') || name.includes('1000v')) info.voltage = '1kV';
    else if (name.includes('300/500v')) info.voltage = '300/500V';
    else if (name.includes('450/750v')) info.voltage = '450/750V';
    
    // Standards
    if (name.includes('bs6724') || name.includes('6724')) info.standard = 'BS6724';
    else if (name.includes('bs7671') || name.includes('7671')) info.standard = 'BS7671';
    else info.standard = 'BS7671';
    
    return info;
  };

  const cableInfo = getCableInfo();
  const isCable = item.category.toLowerCase().includes('cable') || cableInfo.type;

  // Generate dynamic badges
  const getBadges = () => {
    const badges = [];
    
    if (item.isOnSale) {
      const originalPrice = parseFloat(item.price.replace(/[£,]/g, ''));
      const salePrice = parseFloat((item.salePrice || item.price).replace(/[£,]/g, ''));
      const discount = Math.round(((originalPrice - salePrice) / originalPrice) * 100);
      badges.push({ 
        text: `${discount}% OFF`, 
        className: "bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold",
        position: "top-right" 
      });
    }
    
    if (item.stockStatus === 'Low Stock') {
      badges.push({ 
        text: "Low Stock", 
        className: "bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-semibold",
        position: "top-left" 
      });
    }
    
    if (cableInfo.type) {
      badges.push({ 
        text: cableInfo.type, 
        className: "bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30 text-xs px-2 py-1 rounded-full",
        position: "bottom-left" 
      });
    }
    
    return badges;
  };

  // Generate consistent social proof based on item properties
  const getSocialProof = useMemo(() => {
    // Create a simple hash from item name to ensure consistency
    const hash = item.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseViews = (hash % 50) + 10;
    const rating = (4.2 + ((hash % 80) / 100)).toFixed(1);
    const reviews = (hash % 200) + 50;
    return { views: baseViews, rating: parseFloat(rating), reviews };
  }, [item.name]);

  const socialProof = getSocialProof;
  const badges = getBadges();

  // Get key metrics for display
  const getKeyMetrics = () => {
    const metrics = [];
    
    if (cableInfo.size) metrics.push({ label: "Size", value: cableInfo.size, icon: <Zap className="h-3 w-3" /> });
    if (cableInfo.cores) metrics.push({ label: "Cores", value: cableInfo.cores, icon: <Package className="h-3 w-3" /> });
    if (cableInfo.voltage) metrics.push({ label: "Voltage", value: cableInfo.voltage, icon: <Shield className="h-3 w-3" /> });
    if (cableInfo.standard) metrics.push({ label: "Standard", value: cableInfo.standard, icon: <Award className="h-3 w-3" /> });
    
    // Fill remaining slots with general info
    if (metrics.length < 4) {
      metrics.push({ label: "Rating", value: `${socialProof.rating}★`, icon: <Star className="h-3 w-3" /> });
    }
    if (metrics.length < 4) {
      metrics.push({ label: "Stock", value: item.stockStatus || 'Available', icon: <CheckCircle className="h-3 w-3" /> });
    }
    
    return metrics.slice(0, 4);
  };

  const keyMetrics = getKeyMetrics();

  // Get feature highlights
  const getFeatures = () => {
    const features = [];
    
    if (item.highlights && item.highlights.length > 0) {
      features.push(...item.highlights.slice(0, 3));
    } else {
      if (isCable) {
        features.push("Professional grade installation cable");
        if (cableInfo.type === 'Twin & Earth') features.push("Suitable for domestic wiring");
        if (cableInfo.type === 'SWA Armoured') features.push("External & underground use");
        if (cableInfo.standard) features.push(`${cableInfo.standard} compliant`);
      } else {
        features.push("High quality electrical component");
        features.push("Professional contractor grade");
        features.push("BS7671 18th edition compliant");
      }
    }
    
    return features.slice(0, 3);
  };

  const features = getFeatures();

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

  const discount = item.isOnSale && item.salePrice ? 
    Math.round(((parseFloat(item.price.replace(/[£,]/g, '')) - parseFloat(item.salePrice.replace(/[£,]/g, ''))) / parseFloat(item.price.replace(/[£,]/g, ''))) * 100) : 
    null;

  // Normalise image paths
  const imageSrc = (() => {
    const src = item.image;
    if (!src) return "/placeholder.svg";
    
    let finalSrc = src;
    
    // If it's not already an absolute URL, make it one
    if (!/^https?:\/\//i.test(src) && !src.startsWith("/")) {
      finalSrc = `/${src}`;
    }
    
    return finalSrc;
  })();

  return (
    <Card 
      className="group relative h-full overflow-hidden rounded-xl border border-border/50 bg-transparent bg-gradient-to-br from-white/15 via-white/8 to-transparent backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 cursor-pointer"
    >
      {/* Image section with gradient overlay */}
      <div className="relative overflow-hidden bg-gradient-to-br from-muted/50 to-background/50">
        <div className="aspect-square w-full max-h-32 flex items-center justify-center bg-white">
          <img
            src={imageSrc}
            alt={`${item.name} from ${item.supplier}`}
            loading="lazy"
            className="max-h-full max-w-full object-contain transition-all duration-500 group-hover:scale-110"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
          />
        </div>
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Top badges */}
        <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-1.5">
          <Badge className="rounded-full bg-background/95 text-foreground backdrop-blur-sm border-border/50 text-[10px] font-medium px-2 py-0.5 shadow-md">
            {item.category}
          </Badge>
          {discount && (
            <Badge className="rounded-full bg-destructive/95 text-destructive-foreground backdrop-blur-sm border-destructive/50 text-[10px] font-bold px-2 py-0.5 shadow-md">
              -{discount}%
            </Badge>
          )}
        </div>
        
        {/* Brand badge */}
        {item.brand && (
          <div className="absolute bottom-2 right-2">
            <Badge variant="secondary" className="rounded-full backdrop-blur-sm text-[9px] font-medium px-2 py-0.5 shadow-md flex items-center gap-1">
              <Award className="h-2.5 w-2.5" />
              {item.brand}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="flex flex-col gap-2.5 p-3">
        {/* Supplier */}
        <div className="flex items-center gap-1.5">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10">
            <Package className="h-2.5 w-2.5 text-primary" />
          </div>
          <span className="text-[10px] font-medium text-muted-foreground">{item.supplier}</span>
        </div>

        {/* Product title */}
        <h3 className="text-xs font-bold leading-tight text-foreground line-clamp-2 min-h-[2rem]">
          {item.name}
        </h3>

        {/* Features with icons */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-success/10">
              <Shield className="h-2.5 w-2.5 text-success" />
            </div>
            <span>BS7671</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-2.5 w-2.5 text-primary" />
            </div>
            <span>Pro Grade</span>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Price section with divider */}
        <div className="space-y-2 border-t border-border/50 pt-2.5">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-0.5">
              {item.isOnSale && item.salePrice && (
                <span className="text-[9px] text-muted-foreground line-through">
                  {item.price}
                </span>
              )}
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-primary">
                  {item.salePrice || item.price}
                </span>
                <span className="text-[9px] text-muted-foreground">VAT</span>
              </div>
            </div>
            <Badge variant="success" className="rounded-full text-[9px] font-semibold px-2 py-0.5">
              <CheckCircle className="mr-0.5 h-2.5 w-2.5" />
              Stock
            </Badge>
          </div>

          {/* Action buttons */}
          <div className="flex gap-1.5">
            <Button 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(getProductUrl(), '_blank');
              }}
              className="flex-1 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-sm hover:shadow-md transition-all h-7 text-[10px]"
            >
              <ShoppingCart className="mr-1 h-3 w-3" />
              View
            </Button>
            <Button 
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                if (isSelected && onRemoveFromCompare) {
                  onRemoveFromCompare(String(item.id || item.name));
                } else if (onAddToCompare) {
                  onAddToCompare(item);
                }
              }}
              disabled={isCompareDisabled && !isSelected}
              className="rounded-lg px-2 border-border/50 hover:bg-accent transition-all h-7"
            >
              {isSelected ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
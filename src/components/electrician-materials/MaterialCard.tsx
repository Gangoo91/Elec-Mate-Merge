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

  return (
    <Card 
      className="bg-transparent bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/10 hover:border-elec-yellow/30 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] transition-all duration-300 rounded-xl overflow-hidden h-full relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Section */}
      <div className="relative h-32 sm:h-36 bg-gradient-to-br from-elec-gray/50 to-elec-dark/30 overflow-hidden">
        <img 
          src={item.image || '/placeholder.svg'} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        
        {/* Dynamic Badges */}
        {badges.map((badge, index) => (
          <div
            key={index}
            className={`absolute ${
              badge.position === 'top-right' ? 'top-2 right-2' :
              badge.position === 'top-left' ? 'top-2 left-2' :
              badge.position === 'bottom-left' ? 'bottom-2 left-2' :
              'bottom-2 right-2'
            } ${badge.className} animate-fade-in`}
          >
            {badge.text}
          </div>
        ))}
        
        {/* Social Proof Overlay */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
          <Eye className="h-3 w-3 text-white/80" />
          <span className="text-xs text-white/80">{socialProof.views}</span>
        </div>
      </div>

      <CardHeader className="pb-3">
        {/* Header with supplier branding */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-elec-yellow" />
            <span className="text-xs text-muted-foreground">{item.supplier}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-muted-foreground">{socialProof.rating}</span>
            <span className="text-xs text-muted-foreground/60">({socialProof.reviews})</span>
          </div>
        </div>
        
        <CardTitle className="text-white text-sm leading-tight line-clamp-2">
          {item.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-0">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2">
          {keyMetrics.map((metric, index) => (
            <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
              <div className="text-elec-yellow">{metric.icon}</div>
              <div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
                <div className="text-xs font-medium text-white">{metric.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
              <span className="text-xs text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {/* Enhanced Footer */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          {/* Pricing Display */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {item.isOnSale ? (
                  <>
                    <span className="text-lg font-bold text-elec-yellow">{item.salePrice}</span>
                    <span className="text-sm text-muted-foreground line-through">{item.price}</span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-elec-yellow">{item.price}</span>
                )}
              </div>
              {item.stockStatus === 'Low Stock' && (
                <div className="flex items-center gap-1 mt-1">
                  <Timer className="h-3 w-3 text-amber-400" />
                  <span className="text-xs text-amber-400">Only few left</span>
                </div>
              )}
            </div>
            
            {/* Stock Status Badge */}
            <Badge 
              variant="outline" 
              className={
                item.stockStatus === 'In Stock' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                item.stockStatus === 'Low Stock' ? 'border-amber-500/30 text-amber-400 bg-amber-500/10' :
                'border-red-500/30 text-red-400 bg-red-500/10'
              }
            >
              {item.stockStatus || 'Available'}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 flex-1 transition-all duration-200"
              onClick={() => window.open(getProductUrl(), '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Product
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
                variant={isSelected ? "default" : "ghost"}
                size="sm"
                className={`p-2 transition-all duration-200 ${
                  isSelected 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30' 
                    : 'hover:bg-elec-yellow/10 hover:text-elec-yellow'
                }`}
              >
                {isSelected ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>

          {/* Mobile Quick Action Overlay */}
          {isMobile && isHovered && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 transform transition-transform duration-300">
              <Button 
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold"
                onClick={() => window.open(getProductUrl(), '_blank')}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Quick Buy
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
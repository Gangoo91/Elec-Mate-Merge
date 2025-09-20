import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Plus, Minus, Check, Star, Clock, Users, Package, CheckCircle, Zap, Shield, TrendingUp, Award, Eye, ShoppingCart, Timer, Flame } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ToolItem } from "@/hooks/useToolsData";
import { useState, useEffect } from "react";

interface ToolCardProps {
  item: ToolItem;
  onAddToCompare?: (item: ToolItem) => void;
  onRemoveFromCompare?: (itemId: string) => void;
  isSelected?: boolean;
  isCompareDisabled?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  item, 
  onAddToCompare, 
  onRemoveFromCompare, 
  isSelected = false, 
  isCompareDisabled = false 
}) => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState(0);

  // Simulate dynamic data for demonstration
  useEffect(() => {
    const baseViews = Math.floor(Math.random() * 50) + 10;
    setRecentlyViewed(baseViews);
  }, []);

  // Calculate discount percentage
  const getDiscountPercentage = () => {
    if (!item.isOnSale || !item.salePrice || !item.price) return null;
    
    const originalPrice = parseFloat(item.price.replace(/[£,]/g, ''));
    const salePrice = parseFloat(item.salePrice.replace(/[£,]/g, ''));
    
    if (originalPrice > salePrice) {
      return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
    }
    return null;
  };

  // Get dynamic badges based on tool characteristics
  const getDynamicBadges = () => {
    const badges = [];
    const discount = getDiscountPercentage();
    
    // Deal badges
    if (discount && discount >= 30) {
      badges.push({ label: "🔥 Hot Deal", variant: "destructive", animate: true });
    } else if (discount && discount >= 20) {
      badges.push({ label: "⚡ Flash Sale", variant: "warning", animate: true });
    } else if (item.isOnSale) {
      badges.push({ label: "💥 Sale", variant: "warning", animate: false });
    }
    
    // Trending badge
    if (recentlyViewed > 40) {
      badges.push({ label: "🔥 Trending", variant: "success", animate: true });
    } else if (recentlyViewed > 25) {
      badges.push({ label: "⭐ Popular", variant: "gold", animate: false });
    }
    
    // Professional badges
    const name = item.name.toLowerCase();
    if (name.includes('professional') || name.includes('pro')) {
      badges.push({ label: "👨‍🔧 Pro Grade", variant: "outline", animate: false });
    }
    
    // BS7671 compliance
    if (name.includes('test') || name.includes('meter') || item.category?.toLowerCase().includes('test')) {
      badges.push({ label: "✅ BS7671", variant: "success", animate: false });
    }
    
    return badges.slice(0, 2); // Limit to 2 badges to avoid clutter
  };

  // Get urgency indicators
  const getUrgencyIndicator = () => {
    if (item.stockStatus === "Low Stock") {
      return { text: "Only few left!", color: "text-red-400", icon: Timer };
    }
    if (recentlyViewed > 35) {
      return { text: `${recentlyViewed} people viewed today`, color: "text-amber-400", icon: Eye };
    }
    return null;
  };

  // Extract tool-specific information
  const getToolInfo = () => {
    const name = item.name.toLowerCase();
    const info: { type?: string; power?: string; voltage?: string; cordless?: boolean } = {};
    
    // Tool type detection
    if (name.includes('drill')) info.type = 'Drill';
    else if (name.includes('saw')) info.type = 'Saw';
    else if (name.includes('grinder')) info.type = 'Grinder';
    else if (name.includes('multimeter')) info.type = 'Multimeter';
    else if (name.includes('tester')) info.type = 'Tester';
    else if (name.includes('screwdriver')) info.type = 'Screwdriver';
    else if (name.includes('pliers')) info.type = 'Pliers';
    
    // Power detection
    const powerMatch = name.match(/(\d+(?:\.\d+)?)\s*(?:w|watt)/);
    if (powerMatch) info.power = `${powerMatch[1]}W`;
    
    // Voltage detection
    const voltageMatch = name.match(/(\d+(?:\.\d+)?)\s*v(?:olt)?/);
    if (voltageMatch) info.voltage = `${voltageMatch[1]}V`;
    
    // Cordless detection
    info.cordless = name.includes('cordless') || name.includes('battery');
    
    return info;
  };

  const toolInfo = getToolInfo();
  const isPowerTool = item.category?.toLowerCase().includes('power') || toolInfo.cordless;

  // Clean and validate rating/review data
  const getCleanReviewData = () => {
    const reviewText = item.reviews || '';
    
    // Filter out meaningless rating text patterns
    const emptyPatterns = [
      /^0\s*out\s*of\s*5\s*stars?\s*total\s*0\s*ratings?/i,
      /^0\s*stars?\s*out\s*of\s*5/i,
      /^no\s*ratings?/i,
      /^0\s*reviews?/i,
      /^\s*0\s*$/
    ];
    
    const isEmptyReview = emptyPatterns.some(pattern => pattern.test(reviewText));
    
    if (isEmptyReview || !reviewText.trim()) {
      return null;
    }
    
    // Extract meaningful rating info (e.g., "4.7 stars out of 5 (111)")
    const ratingMatch = reviewText.match(/(\d+(?:\.\d+)?)\s*(?:stars?\s*)?(?:out\s*of\s*\d+)?\s*\((\d+)\)/i);
    if (ratingMatch) {
      const rating = parseFloat(ratingMatch[1]);
      const count = parseInt(ratingMatch[2]);
      return { rating, count, text: reviewText };
    }
    
    // Extract simple review counts (e.g., "45 reviews")
    const countMatch = reviewText.match(/(\d+)\s*reviews?/i);
    if (countMatch) {
      const count = parseInt(countMatch[1]);
      if (count > 0) {
        return { count, text: reviewText };
      }
    }
    
    return null;
  };

  const reviewData = getCleanReviewData();

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

    if (item.productUrl || item.view_product_url) {
      try {
        const url = item.productUrl || item.view_product_url;
        const base = expectedHost ? `https://www.${expectedHost}/` : undefined;
        const fullUrl = base ? new URL(url!, base) : new URL(url!);
        const isHttp = /^https?:$/.test(fullUrl.protocol);
        const hostOk = expectedHost ? fullUrl.hostname.endsWith(expectedHost) : true;
        if (isHttp && hostOk) return fullUrl.toString();
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

  const dynamicBadges = getDynamicBadges();
  const urgencyIndicator = getUrgencyIndicator();
  const discount = getDiscountPercentage();

  return (
    <Card 
      className="bg-transparent bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/10 hover:border-elec-yellow/30 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] transition-all duration-300 rounded-xl overflow-hidden h-full relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        {/* Image section matching course cards */}
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
          {/* Enhanced badges overlaid on image */}
          <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-2 z-20">
            <div className="flex flex-col gap-1">
              <Badge className="bg-blue-600/90 text-white border-blue-400 text-xs shadow-lg backdrop-blur-sm">
                {item.category}
              </Badge>
              {/* Dynamic badges */}
              {dynamicBadges.map((badge, index) => (
                <Badge 
                  key={index}
                  className={`text-xs shadow-lg backdrop-blur-sm ${
                    badge.variant === "destructive" ? "bg-red-600/90 text-white border-red-400" :
                    badge.variant === "warning" ? "bg-yellow-600/90 text-white border-yellow-400" :
                    badge.variant === "success" ? "bg-green-600/90 text-white border-green-400" :
                    badge.variant === "gold" ? "bg-amber-600/90 text-white border-amber-400" :
                    "bg-purple-600/90 text-white border-purple-400"
                  } ${badge.animate ? "animate-pulse" : ""}`}
                  variant="outline"
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
            <div className="flex flex-col gap-1 items-end">
              {discount && (
                <Badge className="bg-red-600/95 text-white border-red-400 text-xs font-bold animate-pulse shadow-lg backdrop-blur-sm">
                  -{discount}%
                </Badge>
              )}
              {item.stockStatus && (
                <Badge 
                  className={`shadow-lg backdrop-blur-sm ${
                    item.stockStatus === "In Stock" 
                      ? "bg-green-600/90 text-white border-green-400" :
                    item.stockStatus === "Low Stock" 
                      ? "bg-yellow-600/90 text-white border-yellow-400 animate-pulse" :
                      "bg-red-600/90 text-white border-red-400 animate-pulse"
                  }`}
                  variant="outline"
                >
                  {item.stockStatus}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Interactive overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 ${isHovered ? 'opacity-100' : ''}`}>
            <Button 
              size="sm" 
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              onClick={() => window.open(getProductUrl(), '_blank')}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Quick View
            </Button>
          </div>
        </div>

        {/* Enhanced header with social proof */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg leading-tight font-semibold line-clamp-2 group-hover:text-elec-yellow transition-colors duration-200">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-elec-yellow text-sm">
                {item.supplier}
              </p>
              {urgencyIndicator && (
                <div className="flex items-center gap-1">
                  <urgencyIndicator.icon className={`h-3 w-3 ${urgencyIndicator.color}`} />
                  <span className={`text-xs ${urgencyIndicator.color}`}>
                    {urgencyIndicator.text}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 bg-amber-400/20 text-amber-400 px-2 py-1 rounded text-xs">
              <Star className="h-3 w-3 fill-amber-400" />
              <span>{reviewData?.rating || '4.2'}</span>
            </div>
            {recentlyViewed > 20 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>Popular</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 flex-grow flex flex-col space-y-3">
        {/* Tool description */}
        <div className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {item.highlights && item.highlights.length > 0 
            ? item.highlights.slice(0, 2).join(" • ") 
            : `Professional ${item.category?.toLowerCase() || 'tool'} from ${item.supplier}`}
        </div>
        
        {/* Enhanced metrics grid with professional context */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <Package className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            <span>{toolInfo.type || 'Tool'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {toolInfo.cordless ? (
              <Zap className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            ) : (
              <Users className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            )}
            <span>{toolInfo.power || toolInfo.voltage || 'Professional'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            <span>
              {item.category?.toLowerCase().includes('test') ? 'BS7671 Ready' : 
               toolInfo.type === 'Multimeter' ? 'CAT III/IV' : 
               'Professional'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="h-3 w-3 text-elec-yellow flex-shrink-0" />
            <span>{reviewData?.count ? `${reviewData.count} reviews` : 'Rated'}</span>
          </div>
        </div>

        {/* Tool specifications */}
        {isPowerTool && (toolInfo.cordless || toolInfo.voltage) && (
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-xs text-elec-yellow">
              <Package className="h-3 w-3" />
              <span>Specifications:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {toolInfo.cordless && (
                <span className="text-xs bg-elec-dark/60 px-2 py-1 rounded-md">
                  Cordless
                </span>
              )}
              {toolInfo.voltage && (
                <span className="text-xs bg-elec-dark/60 px-2 py-1 rounded-md">
                  {toolInfo.voltage}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Key features */}
        {item.highlights && item.highlights.length > 2 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-xs text-elec-yellow">
              <CheckCircle className="h-3 w-3" />
              <span>Key Features:</span>
            </div>
            <div className="space-y-1">
              {item.highlights.slice(2, 4).map((highlight, index) => (
                <div key={index} className="flex items-center gap-1.5 text-xs">
                  <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                  <span className="text-muted-foreground">{highlight}</span>
                </div>
              ))}
              {item.highlights.length > 4 && (
                <div className="text-xs text-muted-foreground">
                  +{item.highlights.length - 4} more features
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reviews section */}
        {reviewData && reviewData.count && reviewData.count > 0 && (
          <div className="border-t border-elec-yellow/10 pt-3 space-y-2">
            <p className="text-xs text-elec-yellow flex items-center gap-1.5">
              <Star className="h-3 w-3" />
              <span>Customer Reviews:</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-elec-dark/60 px-2 py-1 rounded-md">
                {reviewData.count} reviews
              </span>
              {reviewData.rating && (
                <span className="text-xs text-green-400">
                  {reviewData.rating} stars average
                </span>
              )}
            </div>
          </div>
        )}

        {/* Enhanced footer with better pricing display */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-elec-yellow/10">
          <div className="space-y-1">
            {item.isOnSale ? (
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-elec-yellow">{item.salePrice}</span>
                  {discount && (
                    <Badge variant="destructive" className="text-xs animate-pulse">
                      SAVE {discount}%
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-through">{item.price}</p>
              </div>
            ) : (
              <p className="text-lg font-bold text-elec-yellow">{item.price}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 transition-all duration-200 hover:scale-105"
              onClick={() => window.open(getProductUrl(), '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
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
                className="p-2 hover:scale-110 transition-transform duration-200"
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
        
        {/* Quick action bar for mobile */}
        {isMobile && isHovered && (
          <div className="absolute bottom-2 left-2 right-2 flex gap-2 animate-fade-in">
            <Button 
              size="sm" 
              className="flex-1 bg-elec-yellow/90 text-elec-dark hover:bg-elec-yellow"
              onClick={() => window.open(getProductUrl(), '_blank')}
            >
              Quick Buy
            </Button>
            {onAddToCompare && (
              <Button 
                size="sm" 
                variant="outline"
                className="border-elec-yellow/50"
                onClick={() => onAddToCompare && onAddToCompare(item)}
              >
                Compare
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ToolCard;
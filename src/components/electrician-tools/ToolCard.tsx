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
  onCardClick?: (item: ToolItem) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  item, 
  onAddToCompare, 
  onRemoveFromCompare, 
  isSelected = false, 
  isCompareDisabled = false,
  onCardClick
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

  // Get stock status info with colors
  const getStockStatusInfo = () => {
    switch (item.stockStatus) {
      case "In Stock":
        return { 
          text: "In Stock", 
          variant: "success" as const, 
          icon: CheckCircle,
          color: "text-success"
        };
      case "Low Stock":
        return { 
          text: "Low Stock", 
          variant: "warning" as const, 
          icon: Timer,
          color: "text-warning"
        };
      case "Out of Stock":
        return { 
          text: "Out of Stock", 
          variant: "destructive" as const, 
          icon: Package,
          color: "text-destructive"
        };
      default:
        return { 
          text: "In Stock", 
          variant: "success" as const, 
          icon: CheckCircle,
          color: "text-success"
        };
    }
  };

  const stockInfo = getStockStatusInfo();
  const StockIcon = stockInfo.icon;

  // Calculate savings amount
  const getSavingsAmount = () => {
    if (!item.isOnSale || !item.salePrice || !item.price) return null;
    
    const originalPrice = parseFloat(item.price.replace(/[£,]/g, ''));
    const salePrice = parseFloat(item.salePrice.replace(/[£,]/g, ''));
    
    if (originalPrice > salePrice) {
      const savings = originalPrice - salePrice;
      return `£${savings.toFixed(2)}`;
    }
    return null;
  };

  const savingsAmount = getSavingsAmount();

  return (
    <Card
      className="group relative h-full overflow-hidden rounded-xl border border-border/50 bg-elec-gray backdrop-blur-sm transition-all duration-300 touch-manipulation active:scale-[0.98] active:border-primary/60 sm:hover:border-primary/60 sm:hover:shadow-xl sm:hover:shadow-primary/20 sm:hover:-translate-y-1 cursor-pointer"
      onClick={() => onCardClick?.(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image section with enhanced sizing */}
      <div className="relative overflow-hidden bg-gradient-to-br from-muted/30 to-background/30">
        <div className="w-full h-[150px] flex items-center justify-center bg-white p-4">
          <img
            src={imageSrc}
            alt={`${item.name} from ${item.supplier}`}
            loading="lazy"
            className="max-h-full max-w-full object-contain transition-all duration-500 group-hover:scale-105"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
          />
        </div>
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 h-[150px] bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        
        
        {/* Brand chip */}
        {item.brand && (
          <div className="absolute bottom-3 right-3">
            <Badge variant="secondary" className="rounded-lg text-xs font-semibold px-3 py-1 flex items-center gap-1.5 backdrop-blur-md shadow-lg">
              <Award className="h-3 w-3" />
              {item.brand}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="flex flex-col gap-2 p-5 border border-primary/20 rounded-b-xl">
        {/* Product title - larger and more prominent */}
        <h3 className="text-sm font-bold leading-tight text-foreground line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
          {item.name}
        </h3>

        {/* Reviews/Rating if available */}
        {reviewData && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {reviewData.rating && (
                <>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-foreground">{reviewData.rating}</span>
                </>
              )}
            </div>
            {reviewData.count && (
              <span className="text-xs text-muted-foreground">({reviewData.count} reviews)</span>
            )}
          </div>
        )}

        {/* Product highlights/features */}
        {item.highlights && item.highlights.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground">Key Features:</h4>
            <ul className="space-y-1.5 text-left">
              {item.highlights.slice(0, 2).map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-foreground">
                  <Check className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Enhanced price section */}
        <div className="space-y-3 border-t border-primary/10 pt-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              {item.isOnSale && item.salePrice && (
                <>
                  <span className="text-xs text-muted-foreground line-through">
                    Was {item.price}
                  </span>
                  {savingsAmount && (
                    <span className="text-xs font-semibold text-success">
                      Save {savingsAmount}
                    </span>
                  )}
                </>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">
                  {item.salePrice || item.price}
                </span>
                <span className="text-xs text-muted-foreground">inc. VAT</span>
              </div>
            </div>
          </div>

          {/* Enhanced action buttons */}
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(getProductUrl(), '_blank');
              }}
              className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-md hover:shadow-lg sm:hover:scale-105 transition-all h-11 text-sm touch-manipulation active:scale-[0.98]"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Buy Now
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                if (isSelected && onRemoveFromCompare) {
                  onRemoveFromCompare(item.id.toString());
                } else if (onAddToCompare) {
                  onAddToCompare(item);
                }
              }}
              disabled={isCompareDisabled && !isSelected}
              className="rounded-xl px-0 w-11 h-11 border-border/50 hover:bg-accent sm:hover:scale-105 transition-all touch-manipulation active:scale-[0.98]"
            >
              {isSelected ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
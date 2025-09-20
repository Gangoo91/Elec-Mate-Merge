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
    <Card className="bg-[#1a1a1a] border-border/20 rounded-lg overflow-hidden">
      <CardContent className="p-4 space-y-3">
        {/* Header with Screwfix branding and rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-white">S</span>
            </div>
            <span className="text-xs text-muted-foreground">Screwfix</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-foreground">4.8</span>
            <span className="text-xs text-muted-foreground">(143)</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="text-sm font-medium text-foreground leading-tight">
          D-Line Safe-D30 U Clip Fire Rated Steel Cable Clips 25/30mm 100 Pack
        </h3>

        {/* 2x2 Information Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-background/30 rounded-md p-2 space-y-1">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-elec-yellow" />
              <span className="text-xs text-muted-foreground">Size</span>
            </div>
            <div className="text-xs font-medium text-foreground">30mm²</div>
          </div>
          
          <div className="bg-background/30 rounded-md p-2 space-y-1">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-blue-400" />
              <span className="text-xs text-muted-foreground">Standard</span>
            </div>
            <div className="text-xs font-medium text-foreground">BS7671</div>
          </div>
          
          <div className="bg-background/30 rounded-md p-2 space-y-1">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-400" />
              <span className="text-xs text-muted-foreground">Rating</span>
            </div>
            <div className="text-xs font-medium text-foreground">4.8★</div>
          </div>
          
          <div className="bg-background/30 rounded-md p-2 space-y-1">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-400" />
              <span className="text-xs text-muted-foreground">Stock</span>
            </div>
            <div className="text-xs font-medium text-foreground">In Stock</div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Check className="w-3 h-3 text-green-400" />
            <span className="text-xs text-muted-foreground">Professional grade installation cable</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3 h-3 text-green-400" />
            <span className="text-xs text-muted-foreground">BS7671 compliant</span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-elec-yellow">£15.50</span>
              <span className="text-xs text-muted-foreground line-through">£17.99</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Inc Vat</span>
              <Badge className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5">
                In Stock
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              onClick={() => window.open(getProductUrl(), '_blank')}
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-background text-xs px-3"
            >
              View Product
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => {
                if (isSelected && onRemoveFromCompare) {
                  onRemoveFromCompare(item.id.toString());
                } else if (onAddToCompare) {
                  onAddToCompare(item);
                }
              }}
              disabled={isCompareDisabled && !isSelected}
              className="w-8 h-8 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
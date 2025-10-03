import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Tag, Clock, Package, Shield, TrendingDown, Star } from "lucide-react";
import { ToolItem } from "@/hooks/useToolsData";

interface DealsOfTheDayBannerProps {
  deal?: ToolItem;
}

const DealsOfTheDayBanner = ({ deal }: DealsOfTheDayBannerProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0 });

  // Countdown timer - resets at midnight
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const diff = endOfDay.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft({ hours, minutes });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (!deal || !deal.isOnSale) return null;

  const calculateSavings = () => {
    if (!deal.price || !deal.salePrice) return null;
    
    const originalPrice = parseFloat(deal.price.replace(/[£,]/g, ''));
    const salePrice = parseFloat(deal.salePrice.replace(/[£,]/g, ''));
    
    if (originalPrice && salePrice) {
      const savings = originalPrice - salePrice;
      const percentage = Math.round(((savings / originalPrice) * 100));
      return { savings: `£${savings.toFixed(2)}`, percentage };
    }
    return null;
  };

  const savings = calculateSavings();

  const getProductUrl = () => {
    const supplier = (deal.supplier || "").toLowerCase();
    const buildSearch = (q: string) => {
      const term = encodeURIComponent(q);
      if (supplier.includes("electricaldirect")) return `https://www.electricaldirect.co.uk/search?query=${term}`;
      if (supplier.includes("city")) return `https://www.cef.co.uk/search?q=${term}`;
      if (supplier.includes("screwfix")) return `https://www.screwfix.com/search?search=${term}`;
      if (supplier.includes("toolstation")) return `https://www.toolstation.com/search?q=${term}`;
      return "#";
    };

    return deal.productUrl || deal.view_product_url || buildSearch(deal.name);
  };

  // Get product highlights/features
  const getProductHighlights = () => {
    const highlights = [];
    
    if (deal.stockStatus?.toLowerCase().includes('in stock')) {
      highlights.push({ icon: Package, text: 'In Stock', color: 'text-green-400' });
    }
    
    if (deal.supplier) {
      highlights.push({ icon: Shield, text: deal.supplier, color: 'text-elec-light' });
    }
    
    if (savings && savings.percentage >= 30) {
      highlights.push({ icon: TrendingDown, text: 'Huge Savings', color: 'text-elec-yellow' });
    }
    
    return highlights.slice(0, 3);
  };

  const highlights = getProductHighlights();

  return (
    <Card className="bg-gradient-to-br from-elec-yellow/15 via-elec-yellow/10 to-elec-dark/50 border-elec-yellow/50 shadow-xl relative overflow-hidden animate-fade-in">
      {/* Animated background shimmer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-elec-yellow/10 via-transparent to-elec-yellow/5 animate-pulse"></div>
      
      {/* Glow effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-elec-yellow/20 rounded-full blur-3xl"></div>
      
      <CardContent className="p-4 sm:p-6 relative">
        {/* Header with countdown */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 bg-elec-yellow/20 px-3 py-1.5 rounded-full border border-elec-yellow/30">
              <Tag className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow animate-pulse" />
              <h2 className="text-base sm:text-lg font-bold text-elec-light">Deal of the Day</h2>
            </div>
            <Badge variant="destructive" className="text-xs font-bold animate-pulse">
              LIVE
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 bg-elec-dark/60 px-3 py-1.5 rounded-lg border border-elec-yellow/20">
            <Clock className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-semibold text-elec-yellow">
              Ends in {timeLeft.hours}h {timeLeft.minutes}m
            </span>
          </div>
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 sm:gap-6 items-start">
          {/* Product Image */}
          <div className="flex justify-center md:justify-start">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-elec-gray/40 border-2 border-elec-yellow/30 rounded-xl flex items-center justify-center overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 group">
              <img
                src={deal.image || "/placeholder.svg"}
                alt={deal.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-3 sm:space-y-4">
            {/* Category and badges */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-elec-yellow/10 border-elec-yellow/40 text-elec-yellow text-xs font-medium">
                {deal.category}
              </Badge>
              {savings && (
                <Badge className="bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-500/40 text-green-400 text-xs font-bold">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Save {savings.percentage}%
                </Badge>
              )}
              {deal.stockStatus?.toLowerCase().includes('in stock') && (
                <Badge className="bg-green-500/10 border-green-500/30 text-green-400 text-xs">
                  <Package className="h-3 w-3 mr-1" />
                  In Stock
                </Badge>
              )}
            </div>
            
            {/* Product name */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-elec-light leading-tight line-clamp-2">
              {deal.name}
            </h3>
            
            {/* Price section */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-elec-yellow">
                {deal.salePrice}
              </span>
              <div className="flex flex-col gap-1">
                <span className="line-through text-text-muted text-base sm:text-lg">
                  {deal.price}
                </span>
                {savings && (
                  <span className="text-green-400 font-bold text-sm sm:text-base">
                    You save {savings.savings}
                  </span>
                )}
              </div>
            </div>
            
            {/* Product highlights */}
            {highlights.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <highlight.icon className={`h-4 w-4 ${highlight.color}`} />
                    <span className={highlight.color}>{highlight.text}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Supplier info */}
            <div className="text-sm text-text-muted pt-2 border-t border-elec-yellow/10">
              Available from <span className="font-semibold text-elec-light">{deal.supplier}</span>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a 
                href={getProductUrl()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1"
              >
                <Button className="w-full bg-gradient-to-r from-elec-yellow to-elec-yellow/90 text-elec-dark font-bold hover:from-elec-yellow/90 hover:to-elec-yellow shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 touch-target">
                  <Tag className="h-4 w-4 mr-2" />
                  Grab This Deal
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealsOfTheDayBanner;
import { useState } from "react";
import { format } from "date-fns";
import { DollarSign, Package, Eye, Star, ExternalLink, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useToolsData, type ToolItem } from "@/hooks/useToolsData";

interface ToolsFeaturedCarouselProps {
  className?: string;
}

const ToolsFeaturedCarousel = ({ className }: ToolsFeaturedCarouselProps) => {
  const { data: tools = [], isLoading } = useToolsData();

  // Get featured tools - prioritize deals, then fill with regular tools to ensure 6 items
  const getFeaturedTools = (allTools: ToolItem[]) => {
    const dealsFirst = allTools.filter(tool => tool.isOnSale || tool.salePrice);
    const regularTools = allTools.filter(tool => !tool.isOnSale && !tool.salePrice);
    const combined = [...dealsFirst, ...regularTools];
    return combined.slice(0, 6);
  };

  const featuredTools = getFeaturedTools(tools);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="h-8 bg-white/10 rounded w-48 animate-pulse" />
          <div className="h-4 bg-white/10 rounded w-64 animate-pulse" />
        </div>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-80 h-96 bg-white/10 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (featuredTools.length === 0) {
    return null;
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "Hand Tools": "bg-blue-500/20 border-blue-500/30 text-blue-300",
      "Power Tools": "bg-orange-500/20 border-orange-500/30 text-orange-300",
      "Testing Equipment": "bg-purple-500/20 border-purple-500/30 text-purple-300",
      "Safety Equipment": "bg-red-500/20 border-red-500/30 text-red-300",
      "Cable & Wire": "bg-green-500/20 border-green-500/30 text-green-300",
      "Electrical Components": "bg-cyan-500/20 border-cyan-500/30 text-cyan-300",
      "Tools": "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
    };
    return colors[category as keyof typeof colors] || "bg-white/10 border-white/20 text-white/80";
  };

  const getStockStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'in stock':
        return 'text-green-300';
      case 'low stock':
        return 'text-yellow-300';
      case 'out of stock':
        return 'text-red-300';
      default:
        return 'text-white/80';
    }
  };

  const getToolImage = (tool: ToolItem) => {
    if (tool.image && tool.image !== '/placeholder.svg') {
      return tool.image;
    }
    // Default tool category images
    const categoryImages = {
      "Hand Tools": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=250&fit=crop&auto=format",
      "Power Tools": "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=250&fit=crop&auto=format",
      "Testing Equipment": "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop&auto=format",
      "Safety Equipment": "https://images.unsplash.com/photo-1581093458791-9d15c0f8e8d6?w=400&h=250&fit=crop&auto=format",
    };
    return categoryImages[tool.category as keyof typeof categoryImages] || "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=250&fit=crop&auto=format";
  };

  const calculateDiscount = (price: string, salePrice: string) => {
    const originalPrice = parseFloat(price.replace(/[£,]/g, ''));
    const discountPrice = parseFloat(salePrice.replace(/[£,]/g, ''));
    if (originalPrice > 0 && discountPrice > 0) {
      return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
    }
    return 0;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Section Header */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Deal of the Day - Top Picks
        </h2>
        <p className="text-sm text-white/80">
          Featured tool deals and professional recommendations
        </p>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
          skipSnaps: false,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {featuredTools.map((tool, index) => {
            const discount = tool.salePrice ? calculateDiscount(tool.price, tool.salePrice) : 0;
            const isDeal = tool.isOnSale || discount > 0;

            return (
              <CarouselItem key={tool.id || index} className="pl-2 md:pl-4 basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[33%]">
                <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl border border-white/10 overflow-hidden group hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] h-full">
                  {/* Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={getToolImage(tool)}
                      alt={tool.name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className={cn("text-xs font-medium", getCategoryColor(tool.category || "Tools"))}>
                        {tool.category || "Tools"}
                      </Badge>
                    </div>

                    {/* Deal/Supplier Badge */}
                    <div className="absolute top-3 right-3">
                      {isDeal ? (
                        <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs bg-elec-yellow/10">
                          {discount > 0 ? `${discount}% OFF` : "DEAL"}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs">
                          {tool.supplier || "Screwfix"}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 space-y-3 flex flex-col h-[calc(100%-10rem)] sm:h-[calc(100%-12rem)]">
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-white/80">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          <span>{tool.salePrice || tool.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          <span className={getStockStatusColor(tool.stockStatus || "In Stock")}>
                            {tool.stockStatus || "In Stock"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{tool.supplier || "Screwfix"}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-white line-clamp-2 text-sm sm:text-base leading-tight flex-grow">
                      {tool.name}
                    </h3>

                    {/* Price & Description */}
                    <div className="space-y-1 flex-grow">
                      <div className="flex items-center gap-2">
                        {tool.salePrice && (
                          <span className="text-white/60 line-through text-xs">{tool.price}</span>
                        )}
                        <span className="text-elec-yellow font-medium text-sm">
                          {tool.salePrice || tool.price}
                        </span>
                      </div>
                      {tool.highlights && tool.highlights.length > 0 && (
                        <p className="text-white/90 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                          {tool.highlights[0]}
                        </p>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                      <div className="flex items-center gap-2 text-xs text-white/80">
                        <ShoppingCart className="h-3 w-3" />
                        <span>Order today</span>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-3 text-elec-yellow hover:bg-elec-yellow/10 hover:text-elec-yellow group/btn"
                        onClick={() => {
                          const url = tool.productUrl || tool.view_product_url || `https://www.screwfix.com/search/${encodeURIComponent(tool.name)}`;
                          window.open(url, '_blank');
                        }}
                      >
                        <span className="text-xs">Buy Now</span>
                        <ExternalLink className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        
        {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
        <CarouselPrevious className="hidden md:flex -left-4 h-10 w-10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50" />
        <CarouselNext className="hidden md:flex -right-4 h-10 w-10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50" />
      </Carousel>

      {/* Mobile scroll hint */}
      <div className="md:hidden flex items-center justify-center gap-2 text-xs text-white/60">
        <ChevronLeft className="h-3 w-3" />
        <span>Swipe to browse more tools</span>
        <ChevronRight className="h-3 w-3" />
      </div>
    </div>
  );
};

export default ToolsFeaturedCarousel;
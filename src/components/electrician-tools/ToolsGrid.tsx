import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Package, Eye, Star, Clock, ExternalLink, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ToolItem } from "@/hooks/useToolsData";

interface ToolsGridProps {
  tools: ToolItem[];
  excludeIds?: (string | number)[];
}

const ToolsGrid = ({ tools, excludeIds = [] }: ToolsGridProps) => {
  const filteredTools = tools.filter(tool => 
    !excludeIds.includes(tool.id || 0)
  );

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

  const calculateDiscount = (price: string, salePrice: string) => {
    const originalPrice = parseFloat(price.replace(/[£,]/g, ''));
    const discountPrice = parseFloat(salePrice.replace(/[£,]/g, ''));
    if (originalPrice > 0 && discountPrice > 0) {
      return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
    }
    return 0;
  };

  if (filteredTools.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-elec-yellow/10 flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="h-8 w-8 text-elec-yellow" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No Tools Found</h3>
        <p className="text-white/90">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTools.map((tool, index) => {
          const discount = tool.salePrice ? calculateDiscount(tool.price, tool.salePrice) : 0;
          const isDeal = tool.isOnSale || discount > 0;

          return (
            <div 
              key={tool.id || index}
              className="bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl border border-white/10 overflow-hidden group hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] h-full cursor-pointer"
              onClick={() => {
                const url = tool.productUrl || tool.view_product_url || `https://www.screwfix.com/search/${encodeURIComponent(tool.name)}`;
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-40 sm:h-48">
                <img
                  src={getToolImage(tool)}
                  alt={tool.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = getToolImage(tool);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
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
                <h3 className="font-semibold text-white line-clamp-2 leading-tight flex-grow text-sm sm:text-base" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
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
                    <p className="text-white/90 line-clamp-2 leading-relaxed flex-grow text-xs sm:text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      const url = tool.productUrl || tool.view_product_url || `https://www.screwfix.com/search/${encodeURIComponent(tool.name)}`;
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <span className="text-xs">View Deal</span>
                    <ExternalLink className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToolsGrid;
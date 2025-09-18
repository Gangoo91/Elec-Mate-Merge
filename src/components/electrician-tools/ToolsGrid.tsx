import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Truck, Star, Clock, ExternalLink, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ToolItem } from "@/hooks/useToolsData";

interface ToolsGridProps {
  tools: ToolItem[];
  excludeIds?: string[];
}

const ToolsGrid = ({ tools, excludeIds = [] }: ToolsGridProps) => {
  const filteredTools = excludeIds.length > 0 
    ? tools.filter(tool => !excludeIds.includes(tool.id?.toString() || ''))
    : tools;

  const getCategoryColor = (category: string) => {
    const colors = {
      "Hand Tools": "bg-blue-500/20 border-blue-500/30 text-blue-300",
      "Power Tools": "bg-red-500/20 border-red-500/30 text-red-300",
      "Testing Equipment": "bg-green-500/20 border-green-500/30 text-green-300",
      "Safety Equipment": "bg-orange-500/20 border-orange-500/30 text-orange-300",
      "Cable & Wire": "bg-purple-500/20 border-purple-500/30 text-purple-300",
      "Electrical Accessories": "bg-cyan-500/20 border-cyan-500/30 text-cyan-300",
      "Lighting": "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
      "Switches & Sockets": "bg-pink-500/20 border-pink-500/30 text-pink-300",
    };
    return colors[category as keyof typeof colors] || "bg-white/10 border-white/20 text-white/80";
  };

  const getSupplierColor = (supplier: string) => {
    const colors = {
      "Screwfix": "bg-emerald-500/20 border-emerald-500/30 text-emerald-300",
      "Toolstation": "bg-blue-500/20 border-blue-500/30 text-blue-300",
      "City Electrical Factors": "bg-red-500/20 border-red-500/30 text-red-300",
      "RS Components": "bg-purple-500/20 border-purple-500/30 text-purple-300",
      "Electrical Direct": "bg-orange-500/20 border-orange-500/30 text-orange-300",
    };
    return colors[supplier as keyof typeof colors] || "bg-elec-yellow/20 border-elec-yellow/30 text-elec-yellow";
  };

  const getToolImage = (tool: ToolItem) => {
    if (tool.image && tool.image !== '/placeholder.svg') {
      return tool.image;
    }
    
    // Default images based on category
    const categoryImages = {
      "Hand Tools": "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop&auto=format",
      "Power Tools": "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=250&fit=crop&auto=format",
      "Testing Equipment": "https://images.unsplash.com/photo-1581092786450-5da0bcf8b8e8?w=400&h=250&fit=crop&auto=format",
      "Safety Equipment": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop&auto=format",
      "Cable & Wire": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop&auto=format",
      "Electrical Accessories": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop&auto=format",
      "Lighting": "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=250&fit=crop&auto=format",
      "Switches & Sockets": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop&auto=format",
    };
    return categoryImages[tool.category as keyof typeof categoryImages] || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop&auto=format";
  };

  const getDiscountPercentage = (tool: ToolItem) => {
    if (!tool.salePrice || !tool.price) return null;
    
    const originalPrice = parseFloat(tool.price.replace(/[£,]/g, ''));
    const salePrice = parseFloat(tool.salePrice.replace(/[£,]/g, ''));
    
    if (originalPrice > salePrice) {
      const discount = Math.round(((originalPrice - salePrice) / originalPrice) * 100);
      return `${discount}%`;
    }
    return null;
  };

  const getStockStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'in stock':
        return 'text-green-400';
      case 'low stock':
        return 'text-amber-400';
      case 'out of stock':
        return 'text-red-400';
      default:
        return 'text-white/80';
    }
  };

  const getStockStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'in stock':
        return '●';
      case 'low stock':
        return '◐';
      case 'out of stock':
        return '○';
      default:
        return '●';
    }
  };

  if (filteredTools.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-elec-yellow/10 flex items-center justify-center mx-auto mb-4">
          <ExternalLink className="h-8 w-8 text-elec-yellow" />
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
        {filteredTools.map((tool, index) => (
          <div 
            key={tool.id || index}
            className="bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl border border-white/10 overflow-hidden group hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] h-full cursor-pointer"
            onClick={() => tool.productUrl && window.open(tool.productUrl, '_blank', 'noopener,noreferrer')}
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
                <Badge className={cn("text-xs font-medium", getCategoryColor(tool.category))}>
                  {tool.category}
                </Badge>
              </div>

              {/* Discount Badge */}
              {getDiscountPercentage(tool) && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-red-500/90 text-white text-xs font-bold">
                    -{getDiscountPercentage(tool)} OFF
                  </Badge>
                </div>
              )}

              {/* Stock Status */}
              <div className="absolute bottom-3 left-3">
                <div className="flex items-center gap-1 text-xs">
                  <span className={cn("text-lg leading-none", getStockStatusColor(tool.stockStatus))}>
                    {getStockStatusIcon(tool.stockStatus)}
                  </span>
                  <span className={getStockStatusColor(tool.stockStatus)}>
                    {tool.stockStatus || 'In Stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 space-y-3 flex flex-col h-[calc(100%-10rem)] sm:h-[calc(100%-12rem)]">
              {/* Supplier Badge */}
              <div className="flex items-center justify-between">
                <Badge className={cn("text-xs font-medium", getSupplierColor(tool.supplier))}>
                  {tool.supplier}
                </Badge>
                {tool.isOnSale && (
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-elec-yellow text-elec-yellow" />
                    <span className="text-xs text-elec-yellow font-medium">Sale</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-white line-clamp-2 leading-tight flex-grow text-sm sm:text-base" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                {tool.name}
              </h3>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-elec-yellow font-bold text-lg">
                    {tool.salePrice || tool.price}
                  </span>
                  {tool.salePrice && tool.price !== tool.salePrice && (
                    <span className="text-white/60 line-through text-sm">
                      {tool.price}
                    </span>
                  )}
                </div>
                {tool.highlights && tool.highlights.length > 0 && (
                  <p className="text-white/80 text-xs line-clamp-1">
                    {tool.highlights[0]}
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                <div className="text-xs text-white/80">
                  <Clock className="h-3 w-3 inline mr-1" />
                  <span>Order today</span>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-3 text-elec-yellow hover:bg-elec-yellow/10 hover:text-elec-yellow group/btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    tool.productUrl && window.open(tool.productUrl, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <span className="text-xs">View</span>
                  <ExternalLink className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsGrid;
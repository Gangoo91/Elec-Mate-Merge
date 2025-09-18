import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, ShoppingCart, ExternalLink, Pound, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToolItem } from "@/hooks/useToolsData";

interface ToolsGridProps {
  tools: ToolItem[];
  excludeIds?: (string | number)[];
  className?: string;
}

const ToolsGrid = ({ tools, excludeIds = [], className }: ToolsGridProps) => {
  const filteredTools = excludeIds.length > 0 
    ? tools.filter(tool => !excludeIds.includes(tool.id))
    : tools;

  const getCategoryColor = (category: string) => {
    const colors = {
      "Power Tools": "bg-red-500/20 border-red-500/30 text-red-300",
      "Hand Tools": "bg-blue-500/20 border-blue-500/30 text-blue-300", 
      "Testing Equipment": "bg-green-500/20 border-green-500/30 text-green-300",
      "Safety Equipment": "bg-orange-500/20 border-orange-500/30 text-orange-300",
      "Electrical Components": "bg-purple-500/20 border-purple-500/30 text-purple-300",
      "Cable Management": "bg-cyan-500/20 border-cyan-500/30 text-cyan-300",
      "Tools": "bg-blue-500/20 border-blue-500/30 text-blue-300"
    };
    return colors[category as keyof typeof colors] || "bg-white/10 border-white/20 text-white/80";
  };

  const getCategoryImage = (category: string) => {
    const images = {
      "Power Tools": "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=250&fit=crop&auto=format",
      "Hand Tools": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=250&fit=crop&auto=format",
      "Testing Equipment": "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop&auto=format",
      "Safety Equipment": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop&auto=format",
      "Electrical Components": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop&auto=format",
      "Cable Management": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop&auto=format",
      "Tools": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=250&fit=crop&auto=format",
    };
    return images[category as keyof typeof images] || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop&auto=format";
  };

  const getSupplierBadge = (tool: ToolItem) => {
    if (tool.isOnSale || tool.salePrice) {
      return "SALE";
    }
    return tool.supplier || "Screwfix";
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
    <div className={cn("space-y-8", className)}>
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTools.map((tool, index) => (
          <div 
            key={tool.id}
            className="bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl border border-white/10 overflow-hidden group hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] h-full cursor-pointer"
            onClick={() => tool.productUrl && window.open(tool.productUrl, '_blank', 'noopener,noreferrer')}
          >
            {/* Image */}
            <div className="relative overflow-hidden h-40 sm:h-48">
              <img
                src={tool.image || getCategoryImage(tool.category || "Tools")}
                alt={tool.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = getCategoryImage(tool.category || "Tools");
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <Badge className={cn("text-xs font-medium", getCategoryColor(tool.category || "Tools"))}>
                  {tool.category || "Tools"}
                </Badge>
              </div>

              {/* Supplier Badge */}
              <div className="absolute top-3 right-3">
                <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs">
                  {getSupplierBadge(tool)}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 space-y-3 flex flex-col h-[calc(100%-10rem)] sm:h-[calc(100%-12rem)]">
              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Pound className="h-3 w-3" />
                    <span>{tool.salePrice || tool.price || "£0"}</span>
                  </div>
                  {tool.stockStatus && (
                    <div className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      <span>{tool.stockStatus}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span>{tool.supplier || "Supplier"}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-white line-clamp-2 leading-tight flex-grow text-sm sm:text-base" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                {tool.name}
              </h3>

              {/* Summary */}
              <p className="text-white/90 line-clamp-2 leading-relaxed flex-grow text-xs sm:text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                {tool.highlights?.join(" • ") || "Professional grade tool for electricians"}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <Zap className="h-3 w-3" />
                  <span>{tool.stockStatus || "In Stock"}</span>
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
                  <span className="text-xs">View Deal</span>
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
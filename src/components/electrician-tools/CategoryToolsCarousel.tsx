import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ExternalLink, Star, TrendingUp } from "lucide-react";
import { type ToolItem } from "@/hooks/useToolsData";

interface CategoryToolsCarouselProps {
  tools: ToolItem[];
  categoryName: string;
  className?: string;
}

const CategoryToolsCarousel = ({ tools, categoryName, className = "" }: CategoryToolsCarouselProps) => {
  // Select top 6 tools with priority logic
  const top6Tools = useMemo(() => {
    if (!tools || tools.length === 0) return [];
    
    // Sort tools by priority: deals first, then regular tools
    const sortedTools = [...tools].sort((a, b) => {
      // Priority 1: On sale items first
      if (a.isOnSale && !b.isOnSale) return -1;
      if (!a.isOnSale && b.isOnSale) return 1;
      
      // Priority 2: Tools with highlights (popular features)
      const aHasHighlights = a.highlights && a.highlights.length > 0;
      const bHasHighlights = b.highlights && b.highlights.length > 0;
      if (aHasHighlights && !bHasHighlights) return -1;
      if (!aHasHighlights && bHasHighlights) return 1;
      
      // Priority 3: Alphabetical by name
      return (a.name || '').localeCompare(b.name || '');
    });
    
    return sortedTools.slice(0, 6);
  }, [tools]);

  // Generate product URL with fallbacks
  const getProductUrl = (tool: ToolItem): string => {
    if (tool.productUrl || tool.view_product_url) {
      return tool.productUrl || tool.view_product_url || '';
    }
    
    // Fallback URLs based on supplier
    const supplier = tool.supplier?.toLowerCase() || '';
    const searchTerm = encodeURIComponent(tool.name || '');
    
    if (supplier.includes('screwfix')) {
      return `https://www.screwfix.com/search?term=${searchTerm}`;
    } else if (supplier.includes('toolstation')) {
      return `https://www.toolstation.com/search?q=${searchTerm}`;
    } else if (supplier.includes('city electrical')) {
      return `https://www.cef.co.uk/catalogue/search?query=${searchTerm}`;
    }
    
    return `https://www.google.com/search?q=${searchTerm}+${supplier}+buy`;
  };

  if (top6Tools.length === 0) {
    return null;
  }

  return (
    <section className={`space-y-4 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          <h2 className="text-xl font-semibold text-elec-light">
            Top 6 {categoryName}
          </h2>
        </div>
        <Badge variant="outline" className="text-xs">
          {top6Tools.length} Featured
        </Badge>
      </div>

      {/* Carousel */}
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {top6Tools.map((tool, index) => (
            <CarouselItem key={tool.id || index} className="pl-2 md:pl-4 basis-[280px] md:basis-[320px]">
              <Card className="h-full mobile-card bg-elec-card/40 border-white/10 hover:border-elec-yellow/30 transition-all duration-300 group">
                <CardContent className="p-4 h-full flex flex-col">
                  {/* Image and badges */}
                  <div className="relative mb-3">
                    <div className="aspect-square rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
                      <img
                        src={tool.image || '/placeholder.svg'}
                        alt={tool.name || 'Tool'}
                        className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {tool.isOnSale && (
                        <Badge variant="destructive" className="text-xs font-semibold">
                          SALE
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {tool.category || 'Tools'}
                      </Badge>
                    </div>
                    
                    {tool.stockStatus && (
                      <Badge 
                        variant={tool.stockStatus === 'In Stock' ? 'success' : 'destructive'} 
                        className="absolute top-2 right-2 text-xs"
                      >
                        {tool.stockStatus}
                      </Badge>
                    )}
                  </div>

                  {/* Tool info */}
                  <div className="flex-1 space-y-3">
                    <h3 className="font-semibold text-elec-light text-sm leading-tight line-clamp-2">
                      {tool.name || 'Unknown Tool'}
                    </h3>
                    
                    <p className="text-xs text-text-muted line-clamp-1">
                      {tool.supplier || 'Screwfix'}
                    </p>

                    {/* Highlights */}
                    {tool.highlights && tool.highlights.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-elec-yellow" />
                        <span className="text-xs text-text-muted line-clamp-1">
                          {tool.highlights[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Price section with separator */}
                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        {tool.isOnSale && tool.salePrice ? (
                          <>
                            <span className="text-lg font-bold text-elec-yellow">
                              {tool.salePrice}
                            </span>
                            <span className="text-xs text-muted-foreground line-through">
                              {tool.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-elec-yellow">
                            {tool.price}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">inc. VAT</span>
                      </div>
                    </div>
                    
                    {/* Action button */}
                    <Button 
                      size="sm" 
                      variant="gold"
                      className="w-full touch-target mobile-interactive group-hover:scale-105 transition-transform duration-200"
                      asChild
                    >
                      <a 
                        href={getProductUrl(tool)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <span>Buy Now</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 bg-elec-card/80 border-white/10 text-elec-light hover:bg-elec-yellow/10 hover:text-elec-yellow" />
        <CarouselNext className="hidden md:flex -right-4 bg-elec-card/80 border-white/10 text-elec-light hover:bg-elec-yellow/10 hover:text-elec-yellow" />
      </Carousel>
    </section>
  );
};

export default CategoryToolsCarousel;
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
import { ExternalLink, Star, TrendingUp, Check, CheckCircle } from "lucide-react";
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
            <CarouselItem key={tool.id || index} className="pl-2 md:pl-4 basis-[200px] md:basis-[220px]">
              <Card className="h-full bg-transparent bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/10 hover:border-elec-yellow/30 hover:shadow-lg hover:shadow-elec-yellow/5 hover:scale-[1.02] transition-all duration-300 rounded-lg overflow-hidden group">
                {/* Compact Image section */}
                <div className="relative">
                  <div className="h-32 overflow-hidden">
                    <img
                      src={tool.image || '/placeholder.svg'}
                      alt={tool.name || 'Tool'}
                      className="object-cover w-full h-full transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  
                  {/* Compact badges */}
                  <div className="absolute top-1.5 left-1.5 right-1.5 flex items-start justify-between">
                    <Badge className="bg-background/90 text-foreground border-border text-[10px] px-1.5 py-0.5">
                      {tool.category || 'Tools'}
                    </Badge>
                    {tool.isOnSale && (
                      <Badge className="bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 font-bold">
                        SALE
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-2.5 flex-grow flex flex-col">
                  {/* Compact supplier and rating */}
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-elec-yellow" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                      <span className="font-medium text-foreground text-[10px]">{tool.supplier || 'Screwfix'}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-foreground text-[10px]">4.5</span>
                    </div>
                  </div>

                  {/* Compact title */}
                  <h3 className="text-xs font-semibold line-clamp-2 mb-2 text-foreground leading-tight">
                    {tool.name || 'Unknown Tool'}
                  </h3>

                  {/* Compact single-row info */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center gap-1 px-1.5 py-1 rounded bg-white/5 border border-white/10 flex-1">
                      <CheckCircle className="h-2.5 w-2.5 text-elec-yellow flex-shrink-0" />
                      <span className="text-[9px] text-muted-foreground">{tool.stockStatus || 'In Stock'}</span>
                    </div>
                    <div className="flex items-center gap-1 px-1.5 py-1 rounded bg-white/5 border border-white/10 flex-1">
                      <Star className="h-2.5 w-2.5 text-elec-yellow flex-shrink-0" />
                      <span className="text-[9px] text-muted-foreground">4.5/5</span>
                    </div>
                  </div>

                  {/* Compact price section */}
                  <div className="pt-2 border-t border-white/10 mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-col">
                        {tool.isOnSale && tool.salePrice ? (
                          <>
                            <span className="text-sm font-bold text-elec-yellow leading-none">
                              {tool.salePrice}
                            </span>
                            <span className="text-[9px] text-muted-foreground line-through">
                              {tool.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-bold text-elec-yellow leading-none">
                            {tool.price}
                          </span>
                        )}
                        <span className="text-[9px] text-muted-foreground">inc. VAT</span>
                      </div>
                    </div>

                    {/* Compact button */}
                    <Button 
                      size="sm" 
                      onClick={() => window.open(getProductUrl(tool), '_blank')}
                      className="w-full h-7 text-[10px] border border-elec-yellow text-elec-yellow bg-transparent hover:bg-elec-yellow hover:text-background transition-colors px-2"
                    >
                      <ExternalLink className="w-2.5 h-2.5 mr-1" />
                      View
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
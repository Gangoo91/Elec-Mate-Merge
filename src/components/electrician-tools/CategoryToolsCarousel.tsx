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
            <CarouselItem key={tool.id || index} className="pl-2 md:pl-4 basis-[280px] md:basis-[320px]">
              <Card className="h-full bg-transparent bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/10 hover:border-elec-yellow/30 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] transition-all duration-300 rounded-xl overflow-hidden group">
                {/* Image section */}
                <div className="relative">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={tool.image || '/placeholder.svg'}
                      alt={tool.name || 'Tool'}
                      className="object-cover w-full h-full transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  
                  {/* Simple badges overlaid on image */}
                  <div className="absolute top-2 left-2 right-2 flex items-start justify-between">
                    <Badge className="bg-background/90 text-foreground border-border text-xs">
                      {tool.category || 'Tools'}
                    </Badge>
                    {tool.isOnSale && (
                      <Badge className="bg-destructive text-destructive-foreground text-xs font-bold">
                        SALE
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-4 flex-grow flex flex-col">
                  {/* Supplier and rating section */}
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-elec-yellow" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                      <span className="font-medium text-foreground">{tool.supplier || 'Screwfix'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-foreground">4.5</span>
                    </div>
                  </div>

                  {/* Product title */}
                  <h3 className="text-lg font-semibold line-clamp-2 mb-4 text-foreground">
                    {tool.name || 'Unknown Tool'}
                  </h3>

                  {/* 2x2 Information grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
                      <Star className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-medium text-foreground text-left">Rating</span>
                        <span className="text-xs text-muted-foreground text-left">4.5/5</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
                      <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-medium text-foreground text-left">Stock</span>
                        <span className="text-xs text-muted-foreground text-left">{tool.stockStatus || 'In Stock'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features list */}
                  {tool.highlights && tool.highlights.length > 0 && (
                    <div className="space-y-1 mb-4">
                      {tool.highlights.slice(0, 2).map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Check className="h-3 w-3 text-green-400" />
                          <span className="line-clamp-1">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Price and stock section */}
                  <div className="space-y-3 pt-2 border-t border-white/10 mt-auto">
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
                      <Badge variant="success" className="text-xs">
                        {tool.stockStatus || 'In Stock'}
                      </Badge>
                    </div>
                  </div>

                  {/* Button section */}
                  <div className="flex gap-2 mt-3">
                    <Button 
                      size="sm" 
                      onClick={() => window.open(getProductUrl(tool), '_blank')}
                      className="flex-1 border border-elec-yellow text-elec-yellow bg-transparent hover:bg-elec-yellow hover:text-background transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Product
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
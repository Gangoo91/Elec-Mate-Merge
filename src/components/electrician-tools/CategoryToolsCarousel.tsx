import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TrendingUp, Sparkles } from "lucide-react";
import { type ToolItem } from "@/hooks/useToolsData";
import PremiumToolCard from "./PremiumToolCard";

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

  if (top6Tools.length === 0) {
    return null;
  }

  return (
    <section className={`space-y-4 sm:space-y-5 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Featured {categoryName}
            </h2>
            <p className="text-xs text-muted-foreground">
              Top picks from trusted suppliers
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className="bg-primary/10 text-primary border-primary/30 text-xs"
        >
          <TrendingUp className="h-3 w-3 mr-1" />
          {top6Tools.length} Featured
        </Badge>
      </div>

      {/* Premium Carousel */}
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 sm:-ml-4">
          {top6Tools.map((tool, index) => (
            <CarouselItem
              key={tool.id || index}
              className="pl-2 sm:pl-4 basis-[260px] sm:basis-[280px] md:basis-[300px]"
            >
              <PremiumToolCard
                item={tool}
                variant="compact"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 bg-background/90 backdrop-blur-sm border-border/50 text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all" />
        <CarouselNext className="hidden md:flex -right-4 bg-background/90 backdrop-blur-sm border-border/50 text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all" />
      </Carousel>
    </section>
  );
};

export default CategoryToolsCarousel;
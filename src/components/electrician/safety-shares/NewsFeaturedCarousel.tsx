import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock, Eye, Star, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
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
import { type NewsArticle } from "@/hooks/useIndustryNews";
import { isValidUrl } from "@/utils/urlUtils";

interface NewsFeaturedCarouselProps {
  articles: NewsArticle[];
  className?: string;
}

const NewsFeaturedCarousel = ({ articles, className }: NewsFeaturedCarouselProps) => {
  // Show up to 6 featured articles
  const featuredArticles = articles.filter(article => isValidUrl(article.external_url)).slice(0, 6);

  if (featuredArticles.length === 0) {
    return null;
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "Regulation": "bg-red-500/20 border-red-500/30 text-red-300",
      "Safety": "bg-orange-500/20 border-orange-500/30 text-orange-300",
      "Technology": "bg-blue-500/20 border-blue-500/30 text-blue-300",
      "Industry": "bg-green-500/20 border-green-500/30 text-green-300",
      "Standards": "bg-purple-500/20 border-purple-500/30 text-purple-300",
      "News": "bg-cyan-500/20 border-cyan-500/30 text-cyan-300",
      "Training": "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
    };
    return colors[category as keyof typeof colors] || "bg-white/10 border-white/20 text-white/80";
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  const getCategoryImage = (category: string) => {
    const images = {
      "Regulation": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop&auto=format",
      "Safety": "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=250&fit=crop&auto=format",
      "Technology": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=250&fit=crop&auto=format",
      "Industry": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop&auto=format",
      "Standards": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop&auto=format",
      "News": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop&auto=format",
      "Training": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&auto=format",
    };
    return images[category as keyof typeof images] || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop&auto=format";
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Featured News
          </h2>
          <p className="text-sm text-white/80">
            Latest industry updates and regulatory changes
          </p>
        </div>
        <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
          {featuredArticles.length} Articles
        </Badge>
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
          {featuredArticles.map((article, index) => (
            <CarouselItem key={article.id} className="pl-2 md:pl-4 basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[33%]">
              <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl border border-white/10 overflow-hidden group hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] h-full">
                {/* Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={article.image_url || getCategoryImage(article.category)}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className={cn("text-xs font-medium", getCategoryColor(article.category))}>
                      {article.category}
                    </Badge>
                  </div>

                  {/* Regulatory Body Badge */}
                  {article.regulatory_body && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs">
                        {article.regulatory_body}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 space-y-3 flex flex-col h-[calc(100%-10rem)] sm:h-[calc(100%-12rem)]">
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{article.view_count?.toLocaleString() || 0}</span>
                      </div>
                      {article.average_rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{article.average_rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{getReadTime(article.content)}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-white line-clamp-2 text-sm sm:text-base leading-tight flex-grow">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-white/90 text-xs sm:text-sm line-clamp-2 leading-relaxed flex-grow">
                    {article.summary}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <Calendar className="h-3 w-3" />
                      <span>{format(new Date(article.date_published), 'dd MMM yyyy')}</span>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-3 text-elec-yellow hover:bg-elec-yellow/10 hover:text-elec-yellow group/btn"
                      onClick={() => article.external_url && window.open(article.external_url, '_blank')}
                    >
                      <span className="text-xs">Read</span>
                      <ExternalLink className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
        <CarouselPrevious className="hidden md:flex -left-4 h-10 w-10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50" />
        <CarouselNext className="hidden md:flex -right-4 h-10 w-10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50" />
      </Carousel>

      {/* Mobile scroll hint */}
      <div className="md:hidden flex items-center justify-center gap-2 text-xs text-white/60">
        <ChevronLeft className="h-3 w-3" />
        <span>Swipe to browse more articles</span>
        <ChevronRight className="h-3 w-3" />
      </div>
    </div>
  );
};

export default NewsFeaturedCarousel;
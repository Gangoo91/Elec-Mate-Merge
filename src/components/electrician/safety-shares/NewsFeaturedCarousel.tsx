import { format } from "date-fns";
import { Clock, Eye, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { motion } from "framer-motion";

interface NewsFeaturedCarouselProps {
  articles: NewsArticle[];
  className?: string;
}

const NewsFeaturedCarousel = ({ articles, className }: NewsFeaturedCarouselProps) => {
  const featuredArticles = articles.filter(article => isValidUrl(article.external_url)).slice(0, 6);

  if (featuredArticles.length === 0) return null;

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Regulation": "bg-rose-500/80 text-white",
      "Safety": "bg-amber-500/80 text-white",
      "Technology": "bg-sky-500/80 text-white",
      "Industry": "bg-emerald-500/80 text-white",
      "Standards": "bg-violet-500/80 text-white",
      "News": "bg-cyan-500/80 text-white",
      "Training": "bg-yellow-500/80 text-black",
      "Technical": "bg-indigo-500/80 text-white",
      "BS7671": "bg-purple-500/80 text-white",
    };
    return colors[category] || "bg-white/20 text-white";
  };

  const getReadTime = (content: string) => {
    const words = content?.split(' ').length || 0;
    return Math.max(1, Math.ceil(words / 200));
  };

  const getCategoryImage = (category: string) => {
    const images: Record<string, string> = {
      "Regulation": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop&auto=format&q=80",
      "Safety": "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop&auto=format&q=80",
      "Technology": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop&auto=format&q=80",
      "Industry": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop&auto=format&q=80",
      "Standards": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop&auto=format&q=80",
      "News": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop&auto=format&q=80",
      "Training": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&auto=format&q=80",
      "Technical": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop&auto=format&q=80",
      "BS7671": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop&auto=format&q=80",
    };
    return images[category] || images["Industry"];
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Section label */}
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-medium text-white/50 uppercase tracking-wider">Featured</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        className="w-full -mx-1"
      >
        <CarouselContent className="ml-1">
          {featuredArticles.map((article, index) => (
            <CarouselItem
              key={article.id}
              className="pl-3 basis-[88%] sm:basis-[65%] md:basis-[48%] lg:basis-[35%]"
            >
              <motion.article
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open(article.external_url, '_blank')}
                className="relative h-[280px] sm:h-[320px] rounded-2xl overflow-hidden cursor-pointer group"
              >
                {/* Background Image */}
                <img
                  src={article.image_url || getCategoryImage(article.category)}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-4 sm:p-5 flex flex-col">
                  {/* Top row: Category + Read time */}
                  <div className="flex items-start justify-between">
                    <Badge className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-md", getCategoryColor(article.category))}>
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-white/60 text-[10px] bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                      <Clock className="h-3 w-3" />
                      <span>{getReadTime(article.content)} min</span>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Bottom content */}
                  <div className="space-y-2">
                    {/* Title */}
                    <h3 className="text-white font-semibold text-base sm:text-lg leading-snug line-clamp-2 group-hover:text-elec-yellow transition-colors">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                      {article.summary}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3 text-[11px] text-white/40">
                        <span>{format(new Date(article.date_published), 'MMM d')}</span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {article.view_count?.toLocaleString() || 0}
                        </span>
                      </div>

                      {/* Read indicator */}
                      <div className="flex items-center gap-1 text-elec-yellow text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Read
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-elec-yellow/30 transition-colors pointer-events-none" />
              </motion.article>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation - Desktop only */}
        <div className="hidden md:block">
          <CarouselPrevious className="-left-3 h-10 w-10 bg-black/50 backdrop-blur-sm border-white/10 text-white hover:bg-black/70 hover:border-white/20" />
          <CarouselNext className="-right-3 h-10 w-10 bg-black/50 backdrop-blur-sm border-white/10 text-white hover:bg-black/70 hover:border-white/20" />
        </div>
      </Carousel>

      {/* Mobile hint */}
      <p className="md:hidden text-center text-[10px] text-white/30 flex items-center justify-center gap-1">
        <ChevronLeft className="h-3 w-3" />
        Swipe for more
        <ChevronRight className="h-3 w-3" />
      </p>
    </div>
  );
};

export default NewsFeaturedCarousel;

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, Star, Clock, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { NewsArticle } from "@/hooks/useIndustryNews";
import { isValidUrl } from "@/utils/urlUtils";

// Placeholder image paths from public directory

interface NewsGridProps {
  articles: NewsArticle[];
  excludeId?: string;
}

const NewsGrid = ({ articles, excludeId }: NewsGridProps) => {
  const filteredArticles = excludeId 
    ? articles.filter(article => article.id !== excludeId)
    : articles;

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

  const getCategoryImage = (category: string) => {
    switch (category?.toLowerCase()) {
      case "bs7671":
        return "/news-placeholders/bs7671.jpg";
      case "hse":
      case "fire safety":
      case "construction safety":
      case "safety technology":
        return "/news-placeholders/hse.jpg";
      case "niceic":
        return "/news-placeholders/niceic.jpg";
      default:
        return "/news-placeholders/general.jpg";
    }
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    return readTime;
  };

  const isPopular = (article: NewsArticle) => article.view_count && article.view_count > 100;
  const isHighRated = (article: NewsArticle) => article.average_rating && article.average_rating >= 4.0;

  if (filteredArticles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-elec-yellow/10 flex items-center justify-center mx-auto mb-4">
          <ExternalLink className="h-8 w-8 text-elec-yellow" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No Articles Found</h3>
        <p className="text-white/90">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredArticles.map((article, index) => {
          const formattedDate = format(new Date(article.date_published), 'MMM dd, yyyy');
          const formattedTime = format(new Date(article.date_published), 'HH:mm');
          const readTime = getReadTime(article.content);
          const isFirst = index === 0;
          const isFeatured = isFirst && filteredArticles.length > 1;

          return (
            <div 
              key={article.id}
              className={`bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl border border-white/10 overflow-hidden group hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 hover:scale-[1.02] h-full cursor-pointer ${
                isFeatured ? 'md:col-span-2 xl:col-span-2' : ''
              }`}
              onClick={() => window.open(article.external_url, '_blank', 'noopener,noreferrer')}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${isFeatured ? 'h-40 sm:h-56' : 'h-32 sm:h-40'}`}>
                <img
                  src={article.image_url || getCategoryImage(article.category)}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = getCategoryImage(article.category);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
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
              <div className={`p-4 sm:p-5 space-y-3 flex flex-col ${isFeatured ? 'h-[calc(100%-14rem)] sm:h-[calc(100%-16rem)]' : 'h-[calc(100%-8rem)] sm:h-[calc(100%-10rem)]'}`}>
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
                    <span>{readTime} min read</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`font-semibold text-white line-clamp-2 leading-tight flex-grow ${
                  isFeatured ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                }`} style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                  {article.title}
                </h3>

                {/* Summary */}
                <p className={`text-white/90 line-clamp-2 leading-relaxed flex-grow ${
                  isFeatured ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                }`} style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(article.external_url, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <span className="text-xs">Read</span>
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

export default NewsGrid;
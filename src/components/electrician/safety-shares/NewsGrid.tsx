import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, Star, Clock, ExternalLink, TrendingUp } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import type { NewsArticle } from "@/hooks/useIndustryNews";
import { isValidUrl } from "@/utils/urlUtils";

interface NewsGridProps {
  articles: NewsArticle[];
  excludeId?: string;
}

const NewsGrid = ({ articles, excludeId }: NewsGridProps) => {
  const filteredArticles = excludeId 
    ? articles.filter(article => article.id !== excludeId)
    : articles;

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case "bs7671":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "hse":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "infrastructure":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "training":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "smart technology":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "electric vehicles":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "fire safety":
        return "bg-red-600/20 text-red-300 border-red-600/30";
      case "renewable energy":
        return "bg-green-600/20 text-green-300 border-green-600/30";
      case "testing standards":
        return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      case "healthcare":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30";
      case "regulation":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "smart grid":
        return "bg-teal-500/20 text-teal-400 border-teal-500/30";
      case "energy storage":
        return "bg-violet-500/20 text-violet-400 border-violet-500/30";
      case "construction safety":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "safety technology":
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
      case "apprenticeships":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30";
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
        <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
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
            <Card 
              key={article.id} 
              className={`group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl bg-elec-card/90 border-elec-yellow/10 hover:border-elec-yellow/30 relative overflow-hidden backdrop-blur-sm ${
                isFeatured ? 'md:col-span-2 xl:col-span-2' : ''
              }`}
              onClick={() => window.open(article.external_url, '_blank', 'noopener,noreferrer')}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-elec-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className={`p-6 h-full flex flex-col relative z-10 ${isFeatured ? 'sm:p-8' : ''}`}>
                {/* Header with badges and indicators */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={`${getCategoryColor(article.category)} text-xs font-semibold uppercase tracking-wide`}>
                      {article.category}
                    </Badge>
                    {isPopular(article) && (
                      <Badge className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 text-xs">
                        <TrendingUp className="h-2 w-2 mr-1" />
                        Popular
                      </Badge>
                    )}
                    {isHighRated(article) && (
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                        <Star className="h-2 w-2 mr-1 fill-current" />
                        Top Rated
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {readTime}m
                  </div>
                </div>

                {/* Title */}
                <h3 className={`font-bold text-white mb-3 leading-tight group-hover:text-elec-yellow transition-colors duration-300 ${
                  isFeatured ? 'text-xl sm:text-2xl line-clamp-3' : 'text-lg line-clamp-2'
                }`}>
                  {article.title}
                </h3>

                {/* Summary */}
                <p className={`text-muted-foreground mb-6 flex-grow leading-relaxed ${
                  isFeatured ? 'text-base line-clamp-4' : 'text-sm line-clamp-3'
                }`}>
                  {article.summary}
                </p>

                {/* Meta Information */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formattedDate}</span>
                      </div>
                      <span className="text-elec-yellow/60">•</span>
                      <span>{formattedTime}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {article.view_count !== undefined && (
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.view_count.toLocaleString()}</span>
                        </div>
                      )}
                      {article.average_rating && article.average_rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-elec-yellow" />
                          <span>{article.average_rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    size={isFeatured ? "default" : "sm"}
                    variant="outline"
                    className="w-full opacity-0 group-hover:opacity-100 transition-all duration-500 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 transform translate-y-2 group-hover:translate-y-0"
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Read Full Story
                  </Button>
                </div>
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-elec-yellow via-elec-yellow/80 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default NewsGrid;
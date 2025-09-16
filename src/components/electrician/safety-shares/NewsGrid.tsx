import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, Star, Clock, ExternalLink } from "lucide-react";
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
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.map((article) => (
        <Card 
          key={article.id}
          className="bg-elec-card border-elec-yellow/10 hover:border-elec-yellow/30 transition-all duration-300 hover:shadow-lg hover:shadow-elec-yellow/5 group cursor-pointer"
          onClick={() => window.open(article.external_url, '_blank', 'noopener,noreferrer')}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between mb-3">
              <Badge className={getCategoryColor(article.category)}>
                {article.category}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{getReadTime(article.content)}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors duration-200 line-clamp-2">
              {article.title}
            </h3>
          </CardHeader>
          
          <CardContent className="pt-0">
            <p className="text-gray-300 text-sm line-clamp-3 mb-4 leading-relaxed">
              {article.summary}
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{format(new Date(article.date_published), 'dd MMM')}</span>
                </div>
                
                {article.view_count !== undefined && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{article.view_count}</span>
                  </div>
                )}
                
                {article.average_rating && article.average_rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span>{article.average_rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-elec-yellow hover:bg-elec-yellow/10 hover:text-elec-yellow"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(article.external_url, '_blank', 'noopener,noreferrer');
                }}
                aria-label="Visit original article"
              >
                Visit Website
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
            
            <div className="mt-3 pt-3 border-t border-elec-yellow/10">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {article.source_name}
                </span>
                <span className="text-elec-yellow">
                  {formatDistanceToNow(new Date(article.date_published), { addSuffix: true })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NewsGrid;
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ExternalLink, Eye, Star, Bookmark } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import type { NewsArticle } from "@/hooks/useIndustryNews";
import { isValidUrl } from "@/utils/urlUtils";

// Placeholder image paths from public directory

interface NewsHeroProps {
  article: NewsArticle;
}

const NewsHero = ({ article }: NewsHeroProps) => {
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
      default:
        return "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30";
    }
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

  // Calculate read time (rough estimate: 200 words per minute)
  const readTime = Math.max(1, Math.ceil(article.content.split(' ').length / 200));

  return (
    <div className="relative">
      {/* Breaking News Banner */}
      <div className="bg-gradient-to-r from-elec-yellow via-elec-yellow/90 to-elec-yellow/70 text-elec-dark px-4 py-2 mb-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-elec-dark text-elec-yellow animate-pulse">
              FEATURED
            </Badge>
            <span className="font-bold text-sm">Latest Industry Update</span>
          </div>
          <div className="text-xs font-medium">
            {format(new Date(article.date_published), 'HH:mm')}
          </div>
        </div>
      </div>

      {/* Main Hero Card */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-elec-card/95 via-elec-card/90 to-elec-card/85 border-elec-yellow/20 hover:border-elec-yellow/30 transition-all duration-500 shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <CardContent className="relative p-6 sm:p-8 lg:p-12">
          {/* Top Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className={`${getCategoryColor(article.category)} font-semibold text-xs uppercase tracking-wide`}>
                {article.category}
              </Badge>
              {article.regulatory_body && (
                <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs">
                  {article.regulatory_body}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{article.view_count?.toLocaleString() || 0}</span>
              </div>
              {article.average_rating && article.average_rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current text-elec-yellow" />
                  <span>{article.average_rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Hero Content with Image */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Hero Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={article.image_url || getCategoryImage(article.category)}
                  alt={article.title}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = getCategoryImage(article.category);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                {article.title}
              </h1>

              {/* Summary */}
              <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed font-light">
                {article.summary}
              </p>

              {/* Publication Details */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">{format(new Date(article.date_published), 'EEEE, MMMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{readTime} min read</span>
                </div>
                <div className="text-elec-yellow font-medium">
                  {article.source_name || 'ElecMate News'}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold px-8 shadow-lg"
                  onClick={() => window.open(article.external_url, '_blank', 'noopener,noreferrer')}
                  aria-label="Visit original article"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Read Full Article
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                >
                  <Bookmark className="h-5 w-5 mr-2" />
                  Save for Later
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsHero;
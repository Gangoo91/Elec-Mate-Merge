import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import type { NewsArticle } from "@/hooks/useIndustryNews";
import { isValidUrl } from "@/utils/urlUtils";

interface NewsHeroProps {
  article: NewsArticle;
  onReadMore: (article: NewsArticle) => void;
}

const NewsHero = ({ article, onReadMore }: NewsHeroProps) => {
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

  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-elec-dark to-elec-gray border-elec-yellow/20">
      <CardContent className="p-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Badge className={getCategoryColor(article.category)}>
                {article.category}
              </Badge>
              <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                {article.regulatory_body}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                {article.title}
              </h1>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                {article.summary}
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(article.date_published), 'dd MMM yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{formatDistanceToNow(new Date(article.date_published), { addSuffix: true })}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => onReadMore(article)}
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 transition-all duration-200"
                size="lg"
              >
                Read Full Article
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              {isValidUrl(article.external_url) && (
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                  onClick={() => window.open(article.external_url, '_blank', 'noopener,noreferrer')}
                  aria-label="Visit original article"
                >
                  Visit Source
                  <ExternalLink className="h-5 w-5 ml-2" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="relative h-64 lg:h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/20 to-transparent rounded-lg">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 border-4 border-elec-yellow/30 rounded-full flex items-center justify-center">
                  <div className="w-20 h-20 bg-elec-yellow/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-elec-yellow">
                      {article.category.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsHero;
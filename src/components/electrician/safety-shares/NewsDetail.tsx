import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Eye, Star, Share2, Bookmark } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { useState } from "react";
import type { NewsArticle } from "@/hooks/useIndustryNews";

interface NewsDetailProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

const NewsDetail = ({ article, isOpen, onClose }: NewsDetailProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userRating, setUserRating] = useState(0);

  if (!article) return null;

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you could implement actual bookmarking logic
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    // Here you could implement actual rating logic
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-elec-dark border-elec-yellow/20">
        <DialogHeader className="border-b border-elec-yellow/20 pb-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className={getCategoryColor(article.category)}>
                {article.category}
              </Badge>
              <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                {article.regulatory_body}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{getReadTime(article.content)}</span>
              </div>
            </div>
            
            <DialogTitle className="text-2xl lg:text-3xl font-bold text-white leading-tight">
              {article.title}
            </DialogTitle>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(article.date_published), 'dd MMMM yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{formatDistanceToNow(new Date(article.date_published), { addSuffix: true })}</span>
              </div>
              {article.view_count !== undefined && (
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{article.view_count} views</span>
                </div>
              )}
            </div>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              {article.summary}
            </p>
          </div>
        </DialogHeader>
        
        <div className="py-6">
          <div className="prose prose-invert max-w-none">
            <div className="text-white leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </div>
        </div>
        
        {/* Interaction Footer */}
        <div className="border-t border-elec-yellow/20 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className={isBookmarked ? "text-elec-yellow" : "text-gray-400"}
              >
                <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-gray-400 hover:text-white"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground mr-2">Rate:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 cursor-pointer transition-colors ${
                      star <= userRating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-600 hover:text-yellow-400"
                    }`}
                    onClick={() => handleRating(star)}
                  />
                ))}
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Published by {article.source_name}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsDetail;
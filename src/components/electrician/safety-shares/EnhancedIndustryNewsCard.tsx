
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Newspaper, Clock, ExternalLink, Eye, MessageSquare, Bookmark, Search, Filter, Star, ThumbsUp } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  datePublished: string;
  readTime: string;
  views: number;
  comments: number;
  likes: number;
  bookmarked: boolean;
  rating: number;
}

const EnhancedIndustryNewsCard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [articles, setArticles] = useState<NewsArticle[]>([
    {
      id: "1",
      title: "HSE Issues Safety Alert for Electrical Contractors",
      summary: "New safety guidance issued following recent incidents on construction sites involving electrical work.",
      category: "HSE Updates",
      source: "HSE Press Releases",
      datePublished: "2024-06-14",
      readTime: "5 min",
      views: 1247,
      comments: 23,
      likes: 78,
      bookmarked: true,
      rating: 4.7
    },
    {
      id: "2",
      title: "BS7671 Amendment 2 Implementation Guide",
      summary: "Comprehensive guide to implementing the latest BS7671 Amendment 2 requirements for electrical installations.",
      category: "BS7671 Updates",
      source: "BS7671 Wiring Regulations",
      datePublished: "2024-06-13",
      readTime: "7 min",
      views: 892,
      comments: 34,
      likes: 56,
      bookmarked: false,
      rating: 4.5
    },
    {
      id: "3",
      title: "IET Announces New Technical Standards",
      summary: "The Institution of Engineering and Technology releases updated technical standards for electrical installations.",
      category: "IET Technical",
      source: "IET Technical News",
      datePublished: "2024-06-12",
      readTime: "4 min",
      views: 567,
      comments: 12,
      likes: 34,
      bookmarked: false,
      rating: 4.3
    },
    {
      id: "4",
      title: "£500M Infrastructure Project Awarded",
      summary: "Major electrical infrastructure contract awarded for new smart grid development across Northern England.",
      category: "Major Projects",
      source: "Construction News Projects",
      datePublished: "2024-06-11",
      readTime: "6 min",
      views: 743,
      comments: 18,
      likes: 42,
      bookmarked: true,
      rating: 4.4
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "hse updates": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "bs7671 updates": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "iet technical": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "major projects": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const toggleBookmark = (articleId: string) => {
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, bookmarked: !article.bookmarked }
        : article
    ));
  };

  const handleLike = (articleId: string) => {
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, likes: article.likes + 1 }
        : article
    ));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-600"
        }`}
      />
    ));
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSource = selectedSource === "all" || article.source === selectedSource;
    
    return matchesSearch && matchesCategory && matchesSource;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Enhanced Industry News</h2>
          <p className="text-muted-foreground">Interactive industry news with filtering, ratings, and bookmarking</p>
        </div>
        <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
          <Newspaper className="h-4 w-4 mr-2" />
          Subscribe to News
        </Button>
      </div>

      {/* Enhanced Filters */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-elec-dark/50 border-elec-yellow/30"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/30">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="HSE Updates">HSE Updates</SelectItem>
                <SelectItem value="BS7671 Updates">BS7671 Updates</SelectItem>
                <SelectItem value="IET Technical">IET Technical</SelectItem>
                <SelectItem value="Major Projects">Major Projects</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/30">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="HSE Press Releases">HSE Press Releases</SelectItem>
                <SelectItem value="BS7671 Wiring Regulations">BS7671 Wiring Regulations</SelectItem>
                <SelectItem value="IET Technical News">IET Technical News</SelectItem>
                <SelectItem value="Construction News Projects">Construction News Projects</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">by {article.source}</span>
                    <div className="flex items-center gap-1">
                      {renderStars(article.rating)}
                      <span className="text-xs text-muted-foreground ml-1">({article.rating})</span>
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg mb-2">
                    {article.title}
                  </CardTitle>
                  <p className="text-gray-300 text-sm">
                    {article.summary}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => toggleBookmark(article.id)}
                  className={article.bookmarked ? "text-elec-yellow" : "text-gray-400"}
                >
                  <Bookmark className={`h-4 w-4 ${article.bookmarked ? "fill-current" : ""}`} />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(article.datePublished).toLocaleDateString()}</span>
                  </div>
                  <span>{article.readTime} read</span>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{article.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{article.comments}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleLike(article.id)}
                    className="flex items-center gap-1 text-muted-foreground hover:text-elec-yellow p-0 h-auto"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{article.likes}</span>
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  asChild
                >
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Read Full Article
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No articles found matching your search criteria.
        </div>
      )}

      <div className="text-center pt-4">
        <Button variant="outline" className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10">
          Load More Articles
        </Button>
      </div>
    </div>
  );
};

export default EnhancedIndustryNewsCard;

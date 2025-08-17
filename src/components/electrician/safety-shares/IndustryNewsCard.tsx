
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Newspaper, Clock, ExternalLink, Eye, MessageSquare, Bookmark, Search, Filter, TrendingUp, BookmarkCheck } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  source: string;
  datePublished: string;
  readTime: string;
  views: number;
  comments: number;
  imageUrl?: string;
  trending?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

const IndustryNewsCard = () => {
  const [articles] = useState<NewsArticle[]>([
    {
      id: "1",
      title: "New BS 7671:2024 Amendment Released",
      summary: "The latest amendment to the wiring regulations includes important updates for EV charging installations and smart home technology.",
      content: "The Institution of Engineering and Technology (IET) has released Amendment 1 to BS 7671:2024...",
      category: "Regulations",
      source: "IET Wiring Matters",
      datePublished: "2024-06-14",
      readTime: "5 min",
      views: 1247,
      comments: 23,
      trending: true,
      priority: 'high'
    },
    {
      id: "2", 
      title: "Government Announces £2.5B Investment in Grid Infrastructure",
      summary: "Major investment package to modernise the UK's electrical grid infrastructure and support renewable energy transition.",
      content: "The government has announced a comprehensive investment programme...",
      category: "Government Policy",
      source: "GOV.UK",
      datePublished: "2024-06-13",
      readTime: "7 min",
      views: 892,
      comments: 34,
      priority: 'high'
    },
    {
      id: "3",
      title: "NICEIC Updates Inspection Procedures",
      summary: "New guidance on electrical installation inspections following industry feedback and safety concerns.",
      content: "NICEIC has published updated procedures for electrical installation inspections...",
      category: "Industry Updates",
      source: "NICEIC",
      datePublished: "2024-06-12",
      readTime: "4 min",
      views: 567,
      comments: 12,
      priority: 'medium'
    },
    {
      id: "4",
      title: "Skills Shortage Crisis: Industry Response",
      summary: "Electrical industry leaders discuss strategies to address the growing skills shortage and attract new talent.",
      content: "Industry representatives met this week to discuss the ongoing skills shortage...",
      category: "Industry Analysis",
      source: "Electrical Review",
      datePublished: "2024-06-11",
      readTime: "6 min",
      views: 723,
      comments: 18,
      trending: true,
      priority: 'medium'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const categories = ["all", ...Array.from(new Set(articles.map(article => article.category)))];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleBookmark = (articleId: string) => {
    const newBookmarks = new Set(bookmarkedArticles);
    if (newBookmarks.has(articleId)) {
      newBookmarks.delete(articleId);
    } else {
      newBookmarks.add(articleId);
    }
    setBookmarkedArticles(newBookmarks);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "regulations": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "government policy": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "industry updates": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "industry analysis": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-elec-yellow';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-transparent';
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Industry News</h2>
            <p className="text-muted-foreground">Latest regulatory updates and industry developments</p>
          </div>
          <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90 self-start sm:self-auto">
            <Newspaper className="h-4 w-4 mr-2" />
            Subscribe to News
          </Button>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-elec-gray border-elec-yellow/20 text-white placeholder:text-muted-foreground"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 bg-elec-gray border-elec-yellow/20 text-white">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-elec-yellow/20">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-white">
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found</span>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid gap-6">
        {filteredArticles.map((article) => (
          <Card 
            key={article.id} 
            className={`border-elec-yellow/20 bg-elec-gray border-l-4 ${getPriorityColor(article.priority)} hover:border-elec-yellow/40 transition-colors`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category}
                    </Badge>
                    {article.trending && (
                      <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">by {article.source}</span>
                  </div>
                  <CardTitle className="text-white text-lg mb-2 leading-tight">
                    {article.title}
                  </CardTitle>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {article.summary}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => toggleBookmark(article.id)}
                  className={`shrink-0 ${bookmarkedArticles.has(article.id) ? 'text-elec-yellow' : 'text-muted-foreground'} hover:text-elec-yellow`}
                >
                  {bookmarkedArticles.has(article.id) ? (
                    <BookmarkCheck className="h-4 w-4" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(article.datePublished).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{article.readTime} read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{article.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{article.comments}</span>
                  </div>
                </div>
                <Button size="sm" className="bg-elec-yellow text-black hover:bg-elec-yellow/90 self-start sm:self-auto">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read Article
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {filteredArticles.length > 0 && (
        <div className="text-center pt-4">
          <Button variant="outline" className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10">
            Load More Articles
          </Button>
        </div>
      )}

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-elec-yellow/10 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-elec-yellow" />
          </div>
          <p className="text-muted-foreground">No articles found matching your search criteria.</p>
          <Button 
            variant="ghost" 
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="mt-2 text-elec-yellow hover:bg-elec-yellow/10"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default IndustryNewsCard;

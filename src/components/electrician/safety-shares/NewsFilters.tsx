import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NewsArticle } from "@/hooks/useIndustryNews";

interface NewsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  articles: NewsArticle[];
}

const NewsFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  articles
}: NewsFiltersProps) => {
  // Get unique categories from articles
  const uniqueCategories = [...new Set(articles.map(article => article.category))].sort();

  const totalArticles = articles.length;
  const filteredCount = selectedCategory === 'all' ? totalArticles : 
    articles.filter(article => article.category === selectedCategory).length;

  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      {/* Enhanced Mobile-First News Toolbar */}
      <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/5 border border-white/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm w-full overflow-hidden shadow-lg">
        <div className="space-y-4 w-full min-w-0">
          {/* Search Bar - Full Width Mobile Optimized */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-elec-yellow/70 z-10" />
            <Input
              type="text"
              placeholder="Search news, regulations, safety updates..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 bg-white/5 border-white/20 text-white placeholder:text-white/70 focus:border-elec-yellow/60 focus:ring-2 focus:ring-elec-yellow/20 h-12 sm:h-14 text-base rounded-lg transition-all duration-200 touch-target"
            />
          </div>

          {/* Mobile-Optimized Filters Row */}
          <div className="flex flex-col gap-4 w-full min-w-0">
            {/* Quick Sort Buttons - Mobile First */}
            <div className="flex flex-wrap gap-2 sm:gap-3 w-full">
              <Button
                variant={sortBy === 'newest' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSortChange('newest')}
                className={`flex-1 min-w-[120px] touch-target min-h-[44px] transition-all duration-200 ${sortBy === 'newest' 
                  ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium shadow-lg" 
                  : "border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-white/5"
                }`}
              >
                <Clock className="h-4 w-4 mr-2" />
                Latest
              </Button>
              <Button
                variant={sortBy === 'views_desc' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSortChange('views_desc')}
                className={`flex-1 min-w-[120px] touch-target min-h-[44px] transition-all duration-200 ${sortBy === 'views_desc' 
                  ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium shadow-lg" 
                  : "border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-white/5"
                }`}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </Button>
            </div>

            {/* Dropdown Filters - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="w-full bg-white/5 border-white/30 text-white h-12 sm:h-11 rounded-lg hover:border-white/50 focus:border-elec-yellow/60 focus:ring-2 focus:ring-elec-yellow/20 transition-all duration-200 touch-target">
                  <Filter className="h-4 w-4 mr-2 text-elec-yellow" />
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark/95 border-white/30 backdrop-blur-md z-50 rounded-lg shadow-xl">
                  <SelectItem value="all" className="text-white hover:bg-elec-yellow/15 focus:bg-elec-yellow/15 rounded-md">
                    All Categories ({totalArticles})
                  </SelectItem>
                  {uniqueCategories.map((category) => {
                    const count = articles.filter(a => a.category === category).length;
                    return (
                      <SelectItem key={category} value={category} className="text-white hover:bg-elec-yellow/15 focus:bg-elec-yellow/15 rounded-md">
                        {category} ({count})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="w-full bg-white/5 border-white/30 text-white h-12 sm:h-11 rounded-lg hover:border-white/50 focus:border-elec-yellow/60 focus:ring-2 focus:ring-elec-yellow/20 transition-all duration-200 touch-target">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark/95 border-white/30 backdrop-blur-md z-50 rounded-lg shadow-xl">
                  <SelectItem value="newest" className="text-white hover:bg-elec-yellow/15 focus:bg-elec-yellow/15 rounded-md">Latest First</SelectItem>
                  <SelectItem value="oldest" className="text-white hover:bg-elec-yellow/15 focus:bg-elec-yellow/15 rounded-md">Oldest First</SelectItem>
                  <SelectItem value="title" className="text-white hover:bg-elec-yellow/15 focus:bg-elec-yellow/15 rounded-md">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Results Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow bg-elec-yellow/10 px-3 py-2 text-sm font-medium shadow-sm">
            {filteredCount} {filteredCount === 1 ? 'Article' : 'Articles'}
          </Badge>
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="bg-white/10 text-white border-white/30 px-3 py-2 text-sm">
              {selectedCategory}
            </Badge>
          )}
        </div>
        
        {searchTerm && (
          <div className="text-sm text-white bg-white/5 px-3 py-2 rounded-md border border-white/10 max-w-full overflow-hidden">
            <span className="text-elec-yellow font-medium">Search:</span> <span className="break-words">"{searchTerm}"</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFilters;
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
    <div className="space-y-4">
      {/* Professional News Toolbar */}
      <div className="bg-elec-card/50 border border-elec-yellow/10 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search electrical industry news..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-elec-dark/50 border-elec-yellow/20 text-white placeholder:text-muted-foreground focus:border-elec-yellow/40 h-11"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={sortBy === 'newest' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSortChange('newest')}
              className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10"
            >
              <Clock className="h-3 w-3 mr-1" />
              Latest
            </Button>
            <Button
              variant={sortBy === 'views_desc' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSortChange('views_desc')}
              className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Button>
          </div>

          {/* Advanced Filters */}
          <div className="flex gap-3">
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-48 bg-elec-dark/50 border-elec-yellow/20 text-white h-11">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                <SelectItem value="all" className="text-white hover:bg-elec-yellow/10">
                  All Categories ({totalArticles})
                </SelectItem>
                {uniqueCategories.map((category) => {
                  const count = articles.filter(a => a.category === category).length;
                  return (
                    <SelectItem key={category} value={category} className="text-white hover:bg-elec-yellow/10">
                      {category} ({count})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-40 bg-elec-dark/50 border-elec-yellow/20 text-white h-11">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                <SelectItem value="newest" className="text-white hover:bg-elec-yellow/10">Latest First</SelectItem>
                <SelectItem value="oldest" className="text-white hover:bg-elec-yellow/10">Oldest First</SelectItem>
                <SelectItem value="title" className="text-white hover:bg-elec-yellow/10">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
            {filteredCount} {filteredCount === 1 ? 'Article' : 'Articles'}
          </Badge>
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
              {selectedCategory}
            </Badge>
          )}
        </div>
        
        {searchTerm && (
          <div className="text-sm text-muted-foreground">
            Results for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFilters;
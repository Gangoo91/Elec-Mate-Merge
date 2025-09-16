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
    <div className="space-y-6 w-full">
      {/* Professional News Toolbar */}
      <div className="bg-elec-card/80 border border-elec-yellow/20 rounded-xl p-4 sm:p-6 backdrop-blur-sm w-full overflow-hidden">
        <div className="space-y-4 w-full min-w-0">
          {/* Search Bar - Full Width */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
            <Input
              type="text"
              placeholder="Search electrical industry news, regulations, safety updates..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 bg-elec-dark/70 border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/60 focus:ring-2 focus:ring-elec-yellow/20 h-12 text-base rounded-lg"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between w-full min-w-0">
            {/* Quick Sort Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 min-w-0">
              <Button
                variant={sortBy === 'newest' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSortChange('newest')}
                className={sortBy === 'newest' 
                  ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium" 
                  : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50 bg-transparent"
                }
              >
                <Clock className="h-4 w-4 mr-2" />
                Latest
              </Button>
              <Button
                variant={sortBy === 'views_desc' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSortChange('views_desc')}
                className={sortBy === 'views_desc' 
                  ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium" 
                  : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50 bg-transparent"
                }
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </Button>
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 w-full sm:w-auto min-w-0 max-w-full">
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="w-full sm:w-48 lg:w-56 bg-elec-dark/80 border-elec-yellow/30 text-white h-11 rounded-lg hover:border-elec-yellow/50 focus:border-elec-yellow/60 focus:ring-2 focus:ring-elec-yellow/20 min-w-0">
                  <Filter className="h-4 w-4 mr-2 text-elec-yellow" />
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark/95 border-elec-yellow/30 backdrop-blur-md z-50 rounded-lg shadow-xl">
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
                <SelectTrigger className="w-full sm:w-36 lg:w-44 bg-elec-dark/80 border-elec-yellow/30 text-white h-11 rounded-lg hover:border-elec-yellow/50 focus:border-elec-yellow/60 focus:ring-2 focus:ring-elec-yellow/20 min-w-0">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark/95 border-elec-yellow/30 backdrop-blur-md z-50 rounded-lg shadow-xl">
                  <SelectItem value="newest" className="text-white hover:bg-elec-yellow/15 focus:bg-elec-yellow/15 rounded-md">Latest First</SelectItem>
                  <SelectItem value="oldest" className="text-white hover:bg-elec-yellow/15 focus:bg-elec-yellow/15 rounded-md">Oldest First</SelectItem>
                  <SelectItem value="title" className="text-white hover:bg-elec-yellow/15 focus:bg-elec-yellow/15 rounded-md">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow bg-elec-yellow/10 px-3 py-1.5 text-sm font-medium">
            {filteredCount} {filteredCount === 1 ? 'Article' : 'Articles'}
          </Badge>
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 px-3 py-1.5 text-sm">
              Category: {selectedCategory}
            </Badge>
          )}
        </div>
        
        {searchTerm && (
          <div className="text-sm text-muted-foreground bg-elec-dark/30 px-3 py-1.5 rounded-md border border-elec-yellow/10">
            Search: "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFilters;
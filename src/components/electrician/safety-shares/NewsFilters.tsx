import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar } from "lucide-react";
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

  return (
    <div className="bg-elec-card rounded-xl border border-elec-yellow/10 p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-elec-yellow" />
        <h3 className="text-lg font-medium text-elec-yellow">Filter & Search</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-elec-dark/60 border-elec-yellow/20 text-white placeholder:text-muted-foreground focus:border-elec-yellow/40 focus:ring-elec-yellow/20"
          />
        </div>
        
        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="bg-elec-dark/60 border-elec-yellow/20 text-white hover:border-elec-yellow/30 focus:border-elec-yellow/40">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-elec-dark border-elec-yellow/30">
            <SelectItem value="all" className="text-white hover:bg-elec-yellow/15 focus:bg-elec-yellow/15">
              All Categories ({articles.length})
            </SelectItem>
            {uniqueCategories.map((category) => {
              const count = articles.filter(article => article.category === category).length;
              return (
                <SelectItem 
                  key={category} 
                  value={category}
                  className="text-white hover:bg-elec-yellow/15 focus:bg-elec-yellow/15"
                >
                  {category} ({count})
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        
        {/* Sort Options */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="bg-elec-dark/60 border-elec-yellow/20 text-white hover:border-elec-yellow/30 focus:border-elec-yellow/40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-elec-dark border-elec-yellow/30">
            <SelectItem value="newest" className="text-white hover:bg-elec-yellow/15 focus:bg-elec-yellow/15">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                Newest First
              </div>
            </SelectItem>
            <SelectItem value="oldest" className="text-white hover:bg-elec-yellow/15 focus:bg-elec-yellow/15">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                Oldest First
              </div>
            </SelectItem>
            <SelectItem value="title" className="text-white hover:bg-elec-yellow/15 focus:bg-elec-yellow/15">
              Alphabetical
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default NewsFilters;
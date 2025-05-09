
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChatFiltersProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  sortBy: "latest" | "popular";
  setSortBy: (sort: "latest" | "popular") => void;
}

const ChatFilters = ({
  categories,
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
}: ChatFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-elec-yellow/10 pb-3">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className={activeCategory === category ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90" : ""}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value as "latest" | "popular")}
        >
          <SelectTrigger className="w-[120px] bg-elec-gray-light/5 h-9 text-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="popular">Most Liked</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ChatFilters;

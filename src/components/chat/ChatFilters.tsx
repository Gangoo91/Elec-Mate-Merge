
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bookmark, Filter, Flame, Clock } from "lucide-react";

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
    <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
      <div className="flex gap-2 items-center">
        <Filter className="h-4 w-4 text-elec-yellow" />
        <span className="text-sm font-medium text-white">Filters:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className={`h-8 px-3 ${sortBy === "popular" ? "bg-elec-yellow/20 border-elec-yellow text-elec-yellow" : "bg-transparent"}`}
          onClick={() => setSortBy("popular")}
        >
          <Flame className="h-3.5 w-3.5 mr-1" />
          Popular
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 px-3 ${sortBy === "latest" ? "bg-elec-yellow/20 border-elec-yellow text-elec-yellow" : "bg-transparent"}`}
          onClick={() => setSortBy("latest")}
        >
          <Clock className="h-3.5 w-3.5 mr-1" />
          Latest
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3"
        >
          <Bookmark className="h-3.5 w-3.5 mr-1" />
          Saved
        </Button>
      </div>
      
      <div className="w-full h-px bg-elec-yellow/10 my-2" />
      
      <div className="flex items-center w-full gap-3 justify-between flex-wrap">
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
      </div>
    </div>
  );
};

export default ChatFilters;

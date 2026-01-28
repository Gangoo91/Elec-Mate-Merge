import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { courseCategories } from "@/components/apprentice/career/courses/enhancedCoursesData";
import type { EnhancedCareerCourse } from "@/components/apprentice/career/courses/enhancedCoursesData";

export interface CourseFilters {
  searchTerm: string;
  category: string;
  level: string;
  format: string;
  location: string;
  sortBy: string;
}

interface ModernCoursesFiltersProps {
  courses: EnhancedCareerCourse[];
  filters: CourseFilters;
  onFiltersChange: (filters: CourseFilters) => void;
  onReset: () => void;
  resultCount: number;
}

const categoryColors: Record<string, { bg: string; activeBg: string; text: string }> = {
  "All Categories": { bg: "bg-white/10", activeBg: "bg-blue-500", text: "text-white" },
  "Essential Updates": { bg: "bg-red-500/20", activeBg: "bg-red-500", text: "text-red-300" },
  "Emerging Technologies": { bg: "bg-green-500/20", activeBg: "bg-green-500", text: "text-green-300" },
  "Safety & Compliance": { bg: "bg-blue-500/20", activeBg: "bg-blue-500", text: "text-blue-300" },
  "Specialised Systems": { bg: "bg-purple-500/20", activeBg: "bg-purple-500", text: "text-purple-300" },
  "Professional Development": { bg: "bg-orange-500/20", activeBg: "bg-orange-500", text: "text-orange-300" },
  "Business Skills": { bg: "bg-cyan-500/20", activeBg: "bg-cyan-500", text: "text-cyan-300" },
};

const sortOptions = [
  { value: "rating", label: "Highest Rated" },
  { value: "demand", label: "Highest Demand" },
  { value: "title", label: "A-Z" },
  { value: "duration", label: "Shortest" },
  { value: "price", label: "Lowest Price" },
];

const ModernCoursesFilters = ({
  courses,
  filters,
  onFiltersChange,
  onReset,
  resultCount
}: ModernCoursesFiltersProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Extract unique values for filter options
  const levels = Array.from(new Set(courses.map(c => c.level))).sort();
  const formats = Array.from(new Set(courses.map(c => c.format.split(',')[0].trim()))).sort();

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', updateScrollButtons);
      return () => ref.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleFilterChange = (key: keyof CourseFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleCategorySelect = (category: string) => {
    const newCategory = category === "All Categories" ? "" : category;
    handleFilterChange("category", newCategory);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      searchTerm: "",
      category: "",
      level: "",
      format: "",
      location: "",
      sortBy: "rating"
    });
    onReset();
  };

  const activeFiltersCount = [
    filters.category,
    filters.level,
    filters.format,
    filters.location
  ].filter(Boolean).length;

  const selectedCategory = filters.category || "All Categories";

  return (
    <motion.div
      id="courses-filters"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-4"
    >
      {/* Category Pills Section */}
      <div className="relative">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-elec-gray/90 text-white hover:text-white hover:bg-elec-gray border border-white/10 rounded-full shadow-lg"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Scrollable Category Pills */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-1 py-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {courseCategories.map((category) => {
            const isSelected = selectedCategory === category;
            const colors = categoryColors[category] || categoryColors["All Categories"];

            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? `${colors.activeBg} text-white shadow-lg`
                    : `${colors.bg} ${colors.text} hover:bg-white/20`
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Right Scroll Button */}
        {canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-elec-gray/90 text-white hover:text-white hover:bg-elec-gray border border-white/10 rounded-full shadow-lg"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Advanced Filters Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="bg-white/5 border-white/10 text-white hover:text-white hover:bg-white/10 gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="bg-blue-500 text-white text-[10px] px-1.5 ml-1">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {/* Sort Dropdown */}
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
            <SelectTrigger className="h-9 w-36 bg-white/5 border-white/10 text-white text-sm">
              <ArrowUpDown className="h-3 w-3 mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-white/10">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-white hover:text-white hover:bg-white/10 gap-1"
            >
              <X className="h-3 w-3" />
              Clear
            </Button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-white">
          <span className="font-bold text-blue-400">{resultCount}</span> {resultCount === 1 ? 'course' : 'courses'}
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvanced && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-white/5 rounded-xl border border-white/10"
        >
          {/* Level Filter */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-white">Level</label>
            <Select value={filters.level || "all"} onValueChange={(value) => handleFilterChange("level", value === "all" ? "" : value)}>
              <SelectTrigger className="h-9 bg-white/5 border-white/10 text-white text-sm">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-white/10">
                <SelectItem value="all" className="text-white hover:bg-white/10">All Levels</SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level} value={level} className="text-white hover:bg-white/10">{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Format Filter */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-white">Format</label>
            <Select value={filters.format || "all"} onValueChange={(value) => handleFilterChange("format", value === "all" ? "" : value)}>
              <SelectTrigger className="h-9 bg-white/5 border-white/10 text-white text-sm">
                <SelectValue placeholder="All Formats" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-white/10">
                <SelectItem value="all" className="text-white hover:bg-white/10">All Formats</SelectItem>
                {formats.map((format) => (
                  <SelectItem key={format} value={format} className="text-white hover:bg-white/10">{format}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Demand Filter */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-white">Demand</label>
            <Select value={filters.location || "all"} onValueChange={(value) => handleFilterChange("location", value === "all" ? "" : value)}>
              <SelectTrigger className="h-9 bg-white/5 border-white/10 text-white text-sm">
                <SelectValue placeholder="All Demand" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-white/10">
                <SelectItem value="all" className="text-white hover:bg-white/10">All Demand</SelectItem>
                <SelectItem value="High" className="text-white hover:bg-white/10">High Demand</SelectItem>
                <SelectItem value="Medium" className="text-white hover:bg-white/10">Medium Demand</SelectItem>
                <SelectItem value="Low" className="text-white hover:bg-white/10">Low Demand</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      )}

      {/* Active Filter Badges */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <Badge className="bg-blue-500/20 text-blue-300 border-0 gap-1">
              {filters.category}
              <X
                className="h-3 w-3 cursor-pointer hover:text-white"
                onClick={() => handleFilterChange("category", "")}
              />
            </Badge>
          )}
          {filters.level && (
            <Badge className="bg-purple-500/20 text-purple-300 border-0 gap-1">
              {filters.level}
              <X
                className="h-3 w-3 cursor-pointer hover:text-white"
                onClick={() => handleFilterChange("level", "")}
              />
            </Badge>
          )}
          {filters.format && (
            <Badge className="bg-green-500/20 text-green-300 border-0 gap-1">
              {filters.format}
              <X
                className="h-3 w-3 cursor-pointer hover:text-white"
                onClick={() => handleFilterChange("format", "")}
              />
            </Badge>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ModernCoursesFilters;

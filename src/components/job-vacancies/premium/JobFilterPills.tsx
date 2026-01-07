/**
 * JobFilterPills - Horizontal scrollable filter chips
 * Multi-select toggles with count badges and clear functionality
 */

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Banknote,
  Award,
  Globe2,
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Check,
} from "lucide-react";
import { pillVariants } from "./animations/variants";

export interface JobFilters {
  jobTypes: string[];
  salaryRanges: string[];
  experience: string[];
  sources: string[];
}

interface JobFilterPillsProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  availableSources?: string[];
  className?: string;
}

// Filter configurations
const JOB_TYPES = [
  { id: "permanent", label: "Permanent" },
  { id: "contract", label: "Contract" },
  { id: "temporary", label: "Temporary" },
  { id: "apprenticeship", label: "Apprenticeship" },
];

const SALARY_RANGES = [
  { id: "20-30", label: "£20k-£30k" },
  { id: "30-40", label: "£30k-£40k" },
  { id: "40-50", label: "£40k-£50k" },
  { id: "50+", label: "£50k+" },
];

const EXPERIENCE_LEVELS = [
  { id: "entry", label: "Entry Level" },
  { id: "mid", label: "Mid Level" },
  { id: "senior", label: "Senior" },
];

const DEFAULT_SOURCES = ["Reed", "Indeed", "TotalJobs", "CV Library", "Jobs.co.uk"];

// Filter category component
const FilterCategory = ({
  icon: Icon,
  label,
  options,
  selected,
  onToggle,
  iconColor,
}: {
  icon: typeof Briefcase;
  label: string;
  options: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
  iconColor: string;
}) => (
  <div className="flex-shrink-0 flex items-center gap-2">
    {/* Category Label */}
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5">
      <Icon className={cn("h-3.5 w-3.5", iconColor)} />
      <span className="text-xs font-medium text-white/60">{label}</span>
    </div>

    {/* Options */}
    {options.map((option, index) => {
      const isSelected = selected.includes(option.id);
      return (
        <motion.button
          key={option.id}
          variants={pillVariants}
          initial="initial"
          animate="animate"
          whileTap="tap"
          custom={index}
          onClick={() => onToggle(option.id)}
          className={cn(
            "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium",
            "border transition-all duration-200",
            isSelected
              ? "bg-amber-500/30 border-amber-500/50 text-amber-300"
              : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80"
          )}
        >
          {isSelected && <Check className="h-3 w-3 mr-1 inline" />}
          {option.label}
        </motion.button>
      );
    })}
  </div>
);

const JobFilterPills = ({
  filters,
  onFiltersChange,
  availableSources = DEFAULT_SOURCES,
  className,
}: JobFilterPillsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  // Calculate active filter count
  const activeCount =
    filters.jobTypes.length +
    filters.salaryRanges.length +
    filters.experience.length +
    filters.sources.length;

  // Handle scroll position for fade effects
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftFade(scrollLeft > 10);
    setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => ref.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Toggle filter helpers
  const toggleJobType = (id: string) => {
    const newTypes = filters.jobTypes.includes(id)
      ? filters.jobTypes.filter((t) => t !== id)
      : [...filters.jobTypes, id];
    onFiltersChange({ ...filters, jobTypes: newTypes });
  };

  const toggleSalaryRange = (id: string) => {
    const newRanges = filters.salaryRanges.includes(id)
      ? filters.salaryRanges.filter((r) => r !== id)
      : [...filters.salaryRanges, id];
    onFiltersChange({ ...filters, salaryRanges: newRanges });
  };

  const toggleExperience = (id: string) => {
    const newExp = filters.experience.includes(id)
      ? filters.experience.filter((e) => e !== id)
      : [...filters.experience, id];
    onFiltersChange({ ...filters, experience: newExp });
  };

  const toggleSource = (id: string) => {
    const newSources = filters.sources.includes(id)
      ? filters.sources.filter((s) => s !== id)
      : [...filters.sources, id];
    onFiltersChange({ ...filters, sources: newSources });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      jobTypes: [],
      salaryRanges: [],
      experience: [],
      sources: [],
    });
  };

  // Scroll helpers
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  // Source options from available sources
  const sourceOptions = availableSources.map((s) => ({ id: s, label: s }));

  return (
    <div className={cn("space-y-3", className)}>
      {/* Header Row */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium text-white">Filters</span>
          {activeCount > 0 && (
            <Badge className="h-5 px-1.5 bg-amber-500/30 text-amber-300 border-amber-500/40 text-[10px]">
              {activeCount}
            </Badge>
          )}
        </div>

        <AnimatePresence>
          {activeCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-7 px-2 text-xs text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scrollable Filter Area */}
      <div className="relative">
        {/* Left Fade & Button */}
        <AnimatePresence>
          {showLeftFade && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-0 bottom-0 z-10 flex items-center"
            >
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollLeft}
                className="h-8 w-8 bg-background/80 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white rounded-full shadow-lg"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Fade & Button */}
        <AnimatePresence>
          {showRightFade && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-0 top-0 bottom-0 z-10 flex items-center"
            >
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollRight}
                className="h-8 w-8 bg-background/80 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white rounded-full shadow-lg"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide py-2 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Job Type Filters */}
          <FilterCategory
            icon={Briefcase}
            label="Type"
            options={JOB_TYPES}
            selected={filters.jobTypes}
            onToggle={toggleJobType}
            iconColor="text-amber-400"
          />

          {/* Salary Range Filters */}
          <FilterCategory
            icon={Banknote}
            label="Salary"
            options={SALARY_RANGES}
            selected={filters.salaryRanges}
            onToggle={toggleSalaryRange}
            iconColor="text-emerald-400"
          />

          {/* Experience Level Filters */}
          <FilterCategory
            icon={Award}
            label="Level"
            options={EXPERIENCE_LEVELS}
            selected={filters.experience}
            onToggle={toggleExperience}
            iconColor="text-blue-400"
          />

          {/* Source Filters */}
          <FilterCategory
            icon={Globe2}
            label="Source"
            options={sourceOptions}
            selected={filters.sources}
            onToggle={toggleSource}
            iconColor="text-purple-400"
          />
        </div>
      </div>

      {/* Active Filters Summary */}
      <AnimatePresence>
        {activeCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-1.5 px-1">
              {filters.jobTypes.map((type) => (
                <Badge
                  key={type}
                  className="bg-amber-500/20 border-amber-500/30 text-amber-300 text-[10px] cursor-pointer hover:bg-amber-500/30"
                  onClick={() => toggleJobType(type)}
                >
                  {JOB_TYPES.find((t) => t.id === type)?.label}
                  <X className="h-2.5 w-2.5 ml-1" />
                </Badge>
              ))}
              {filters.salaryRanges.map((range) => (
                <Badge
                  key={range}
                  className="bg-emerald-500/20 border-emerald-500/30 text-emerald-300 text-[10px] cursor-pointer hover:bg-emerald-500/30"
                  onClick={() => toggleSalaryRange(range)}
                >
                  {SALARY_RANGES.find((r) => r.id === range)?.label}
                  <X className="h-2.5 w-2.5 ml-1" />
                </Badge>
              ))}
              {filters.experience.map((exp) => (
                <Badge
                  key={exp}
                  className="bg-blue-500/20 border-blue-500/30 text-blue-300 text-[10px] cursor-pointer hover:bg-blue-500/30"
                  onClick={() => toggleExperience(exp)}
                >
                  {EXPERIENCE_LEVELS.find((e) => e.id === exp)?.label}
                  <X className="h-2.5 w-2.5 ml-1" />
                </Badge>
              ))}
              {filters.sources.map((source) => (
                <Badge
                  key={source}
                  className="bg-purple-500/20 border-purple-500/30 text-purple-300 text-[10px] cursor-pointer hover:bg-purple-500/30"
                  onClick={() => toggleSource(source)}
                >
                  {source}
                  <X className="h-2.5 w-2.5 ml-1" />
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobFilterPills;

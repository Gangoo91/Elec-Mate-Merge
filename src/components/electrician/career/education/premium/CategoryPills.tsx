/**
 * CategoryPills - Horizontal scrollable category chips
 * Native app feel with scroll snap, active state animations, and touch feedback
 */

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  FileText,
  Layers,
  Star,
  Zap,
} from "lucide-react";
import { pillVariants } from "./animations/variants";

interface Category {
  name: string;
  count: number;
}

interface CategoryPillsProps {
  categories: Category[];
  selected: string | null;
  onSelect: (category: string | null) => void;
  className?: string;
}

// Map category names to icons
const getCategoryIcon = (category: string) => {
  const iconMap: Record<string, typeof GraduationCap> = {
    Degree: GraduationCap,
    HNC: FileText,
    HND: FileText,
    Certificate: Award,
    Diploma: BookOpen,
    Apprenticeship: Briefcase,
    Foundation: Layers,
    Master: Star,
  };
  return iconMap[category] || Zap;
};

// Map category names to colors
const getCategoryColor = (category: string, isActive: boolean) => {
  if (isActive) {
    return "bg-purple-500 text-white border-purple-500 shadow-lg shadow-purple-500/30";
  }

  const colorMap: Record<string, string> = {
    Degree: "hover:bg-blue-500/20 hover:border-blue-500/40",
    HNC: "hover:bg-yellow-500/20 hover:border-yellow-500/40",
    HND: "hover:bg-pink-500/20 hover:border-pink-500/40",
    Certificate: "hover:bg-green-500/20 hover:border-green-500/40",
    Diploma: "hover:bg-purple-500/20 hover:border-purple-500/40",
    Apprenticeship: "hover:bg-orange-500/20 hover:border-orange-500/40",
    Foundation: "hover:bg-cyan-500/20 hover:border-cyan-500/40",
    Master: "hover:bg-red-500/20 hover:border-red-500/40",
  };

  return (
    colorMap[category] ||
    "hover:bg-white/10 hover:border-white/20"
  );
};

const CategoryPills = ({
  categories,
  selected,
  onSelect,
  className,
}: CategoryPillsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Scroll active category into view
  // Uses requestAnimationFrame to batch DOM reads and prevent layout thrashing
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const active = activeRef.current;

      // Batch DOM reads in rAF to avoid layout thrashing
      requestAnimationFrame(() => {
        const containerRect = container.getBoundingClientRect();
        const activeRect = active.getBoundingClientRect();

        // Check if active is out of view
        if (
          activeRect.left < containerRect.left ||
          activeRect.right > containerRect.right
        ) {
          active.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      });
    }
  }, [selected]);

  // All categories with count
  const allCategory = {
    name: "All",
    count: categories.reduce((sum, c) => sum + c.count, 0),
  };

  const allCategories = [allCategory, ...categories];

  return (
    <div className={cn("relative", className)}>
      {/* Left fade edge */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

      {/* Right fade edge */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3 scroll-snap-x -mx-4"
        style={{ scrollPaddingInline: "1rem" }}
      >
        {allCategories.map((category, index) => {
          const isActive = selected === category.name || (category.name === "All" && !selected);
          const Icon = category.name === "All" ? Layers : getCategoryIcon(category.name);

          return (
            <motion.button
              key={category.name}
              ref={isActive ? activeRef : undefined}
              custom={index}
              variants={pillVariants}
              initial="initial"
              animate="animate"
              whileTap="tap"
              onClick={() => onSelect(category.name === "All" ? null : category.name)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap",
                "border transition-all duration-200 scroll-snap-item touch-manipulation",
                "bg-white/5 text-white/70 border-white/10",
                getCategoryColor(category.name, isActive),
                isActive && "text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{category.name}</span>
              <Badge
                variant="secondary"
                className={cn(
                  "ml-1 px-1.5 py-0.5 text-xs min-w-[1.5rem] justify-center",
                  isActive
                    ? "bg-white/20 text-white border-transparent"
                    : "bg-white/10 text-white/60 border-white/10"
                )}
              >
                {category.count}
              </Badge>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPills;

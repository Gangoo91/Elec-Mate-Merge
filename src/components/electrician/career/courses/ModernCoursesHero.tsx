import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Users,
  Star,
  MapPin,
  RefreshCw,
  Search,
  Zap,
  Shield,
  Flame,
  Wrench,
  GraduationCap,
  Battery
} from "lucide-react";
import type { CourseAnalytics } from "@/components/apprentice/career/courses/enhancedCoursesData";
import { cn } from "@/lib/utils";

interface ModernCoursesHeroProps {
  analytics: CourseAnalytics | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFundingCalculator: () => void;
  onRefreshData?: () => void;
  isRefreshing?: boolean;
  locationQuery?: string;
  onLocationChange?: (location: string) => void;
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
}

// Category quick-access data
const QUICK_CATEGORIES = [
  { id: "18th-edition", label: "18th Edition", icon: Zap, color: "text-yellow-400" },
  { id: "inspection-testing", label: "Testing", icon: Shield, color: "text-blue-400" },
  { id: "ev-charging", label: "EV", icon: Battery, color: "text-green-400" },
  { id: "fire-alarm", label: "Fire Alarm", icon: Flame, color: "text-red-400" },
  { id: "pat-testing", label: "PAT", icon: Wrench, color: "text-purple-400" },
  { id: "level-3", label: "Level 3", icon: GraduationCap, color: "text-cyan-400" },
];

// Stat pill component for horizontal scroll
const StatPill = ({
  icon: Icon,
  value,
  label,
  color = "text-blue-400"
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
  color?: string;
}) => (
  <div className="flex-shrink-0 flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
    <Icon className={cn("h-4 w-4", color)} />
    <span className="text-sm font-semibold text-white">{value}</span>
    <span className="text-xs text-white/60">{label}</span>
  </div>
);

// Category pill component
const CategoryPill = ({
  id,
  label,
  icon: Icon,
  color,
  isSelected,
  onClick
}: {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex-shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all touch-manipulation",
      isSelected
        ? "bg-blue-500 text-white border border-blue-400"
        : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 active:scale-95"
    )}
  >
    <Icon className={cn("h-3.5 w-3.5", isSelected ? "text-white" : color)} />
    {label}
  </button>
);

const ModernCoursesHero = ({
  analytics,
  searchQuery,
  onSearchChange,
  onRefreshData,
  isRefreshing = false,
  locationQuery = "",
  onLocationChange,
  onCategorySelect,
  selectedCategory = "",
}: ModernCoursesHeroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="relative overflow-hidden bg-elec-gray/50 border border-blue-500/20 rounded-xl sm:rounded-2xl"
    >
      {/* Top Accent Line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500/60 via-blue-400 to-blue-500/60" />

      <div className="p-3 sm:p-5">
        {/* Compact Header Row */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <BookOpen className="h-5 w-5 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl font-semibold text-white">
              Training <span className="text-blue-400">Courses</span>
            </h1>
            <p className="text-xs text-white/60 hidden sm:block">
              Find accredited courses near you
            </p>
          </div>

          {/* Refresh Button */}
          {onRefreshData && (
            <Button
              onClick={onRefreshData}
              disabled={isRefreshing}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10"
            >
              <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
            </Button>
          )}
        </div>

        {/* Stats - Horizontal Scroll on Mobile */}
        {analytics && (
          <div className="flex gap-2 overflow-x-auto mt-3 -mx-3 px-3 pb-1 scrollbar-hide">
            <StatPill icon={BookOpen} value={analytics.totalCourses} label="Courses" color="text-blue-400" />
            <StatPill icon={Users} value={analytics.totalProviders} label="Providers" color="text-green-400" />
            <StatPill icon={MapPin} value="UK-Wide" label="Locations" color="text-purple-400" />
            <StatPill icon={Star} value={analytics.averageRating.toFixed(1)} label="Rating" color="text-yellow-400" />
          </div>
        )}

        {/* Search + Location Row */}
        <div className="flex gap-2 mt-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
            <Input
              type="text"
              placeholder="Course or topic..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-10 pl-9 bg-white/5 border-white/10 text-white text-sm placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/20 touch-manipulation"
            />
          </div>
          {onLocationChange && (
            <div className="relative w-24 sm:w-28">
              <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40 pointer-events-none" />
              <Input
                type="text"
                placeholder="Postcode"
                value={locationQuery}
                onChange={(e) => onLocationChange(e.target.value.toUpperCase())}
                maxLength={8}
                className="h-10 pl-7 bg-white/5 border-white/10 text-white text-sm placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/20 touch-manipulation uppercase"
              />
            </div>
          )}
        </div>

        {/* Quick Category Pills - Horizontal Scroll */}
        {onCategorySelect && (
          <div className="flex gap-2 overflow-x-auto mt-3 -mx-3 px-3 pb-1 scrollbar-hide">
            <button
              onClick={() => onCategorySelect("")}
              className={cn(
                "flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all touch-manipulation",
                !selectedCategory
                  ? "bg-blue-500 text-white border border-blue-400"
                  : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 active:scale-95"
              )}
            >
              All Courses
            </button>
            {QUICK_CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat.id}
                id={cat.id}
                label={cat.label}
                icon={cat.icon}
                color={cat.color}
                isSelected={selectedCategory === cat.id}
                onClick={() => onCategorySelect(cat.id)}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ModernCoursesHero;

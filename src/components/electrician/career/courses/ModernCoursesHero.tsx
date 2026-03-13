import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import {
  RefreshCw,
  Search,
  MapPin,
  Zap,
  Shield,
  Flame,
  Wrench,
  GraduationCap,
  Battery,
} from 'lucide-react';
import type { CourseAnalytics } from '@/components/apprentice/career/courses/enhancedCoursesData';
import { cn } from '@/lib/utils';

interface ModernCoursesHeroProps {
  analytics: CourseAnalytics | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onRefreshData?: () => void;
  isRefreshing?: boolean;
  locationQuery?: string;
  onLocationChange?: (location: string) => void;
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
}

// Category quick-access data
const QUICK_CATEGORIES = [
  { id: '18th-edition', label: '18th Edition', icon: Zap, color: 'text-yellow-400' },
  { id: 'inspection-testing', label: 'Testing', icon: Shield, color: 'text-blue-400' },
  { id: 'ev-charging', label: 'EV', icon: Battery, color: 'text-green-400' },
  { id: 'fire-alarm', label: 'Fire Alarm', icon: Flame, color: 'text-red-400' },
  { id: 'pat-testing', label: 'PAT', icon: Wrench, color: 'text-purple-400' },
  { id: 'level-3', label: 'Level 3', icon: GraduationCap, color: 'text-cyan-400' },
];

// Category pill component
const CategoryPill = ({
  label,
  icon: Icon,
  color,
  isSelected,
  onClick,
}: {
  label: string;
  icon: React.ElementType;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'flex-shrink-0 flex items-center gap-1.5 rounded-full px-3 h-11 text-xs font-medium transition-all touch-manipulation active:scale-95',
      isSelected
        ? 'bg-blue-500 text-white border border-blue-400'
        : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
    )}
  >
    <Icon className={cn('h-3.5 w-3.5', isSelected ? 'text-white' : color)} />
    {label}
  </button>
);

const ModernCoursesHero = ({
  analytics,
  searchQuery,
  onSearchChange,
  onRefreshData,
  isRefreshing = false,
  locationQuery = '',
  onLocationChange,
  onCategorySelect,
  selectedCategory = '',
}: ModernCoursesHeroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-2"
    >
      {/* Search + Postcode + Refresh Row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
          <Input
            type="text"
            placeholder="Course or topic..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 pl-9 bg-white/5 border-white/10 text-white text-sm placeholder:text-white focus:border-blue-500/50 focus:ring-blue-500/20 touch-manipulation"
          />
        </div>
        {onLocationChange && (
          <div className="relative w-28">
            <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white pointer-events-none" />
            <Input
              type="text"
              placeholder="Area"
              value={locationQuery}
              onChange={(e) => onLocationChange(e.target.value.toUpperCase())}
              maxLength={8}
              className="h-11 pl-7 bg-white/5 border-white/10 text-white text-sm placeholder:text-white focus:border-blue-500/50 focus:ring-blue-500/20 touch-manipulation uppercase"
            />
          </div>
        )}
        {onRefreshData && (
          <button
            onClick={onRefreshData}
            disabled={isRefreshing}
            className="h-11 w-11 flex-shrink-0 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 touch-manipulation active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
          </button>
        )}
      </div>

      {/* Quick Category Pills - Horizontal Scroll */}
      {onCategorySelect && (
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1 scrollbar-hide">
          <button
            onClick={() => onCategorySelect('')}
            className={cn(
              'flex-shrink-0 rounded-full px-3 h-11 text-xs font-medium transition-all touch-manipulation active:scale-95',
              !selectedCategory
                ? 'bg-blue-500 text-white border border-blue-400'
                : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
            )}
          >
            All
          </button>
          {QUICK_CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.id}
              label={cat.label}
              icon={cat.icon}
              color={cat.color}
              isSelected={selectedCategory === cat.id}
              onClick={() => onCategorySelect(cat.id)}
            />
          ))}
        </div>
      )}

      {/* Stats text line */}
      {analytics && (
        <p className="text-xs text-white">
          {analytics.totalCourses} courses from {analytics.totalProviders} providers
        </p>
      )}
    </motion.div>
  );
};

export default ModernCoursesHero;

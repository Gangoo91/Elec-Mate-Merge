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

const QUICK_CATEGORIES = [
  { id: '18th-edition', label: '18th Edition', icon: Zap, color: 'text-amber-400', activeBg: 'bg-amber-500/20', activeBorder: 'border-amber-500/40' },
  { id: 'inspection-testing', label: 'Testing', icon: Shield, color: 'text-sky-400', activeBg: 'bg-sky-500/20', activeBorder: 'border-sky-500/40' },
  { id: 'ev-charging', label: 'EV', icon: Battery, color: 'text-emerald-400', activeBg: 'bg-emerald-500/20', activeBorder: 'border-emerald-500/40' },
  { id: 'fire-alarm', label: 'Fire Alarm', icon: Flame, color: 'text-orange-400', activeBg: 'bg-orange-500/20', activeBorder: 'border-orange-500/40' },
  { id: 'pat-testing', label: 'PAT', icon: Wrench, color: 'text-violet-400', activeBg: 'bg-violet-500/20', activeBorder: 'border-violet-500/40' },
  { id: 'level-3', label: 'Level 3', icon: GraduationCap, color: 'text-cyan-400', activeBg: 'bg-cyan-500/20', activeBorder: 'border-cyan-500/40' },
];

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
      className="space-y-3"
    >
      {/* Search bar — unified pill with search + postcode */}
      <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-2xl p-1.5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 pl-9 bg-transparent border-0 text-white text-sm placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-0 touch-manipulation"
          />
        </div>
        {onLocationChange && (
          <>
            <div className="w-px h-6 bg-white/10" />
            <div className="relative w-28">
              <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-red-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Postcode"
                value={locationQuery}
                onChange={(e) => onLocationChange(e.target.value.toUpperCase())}
                maxLength={8}
                className="h-10 pl-7 bg-transparent border-0 text-white text-sm placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-0 touch-manipulation uppercase"
              />
            </div>
          </>
        )}
        {onRefreshData && (
          <button
            onClick={onRefreshData}
            disabled={isRefreshing}
            className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/[0.06] text-white touch-manipulation active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
          </button>
        )}
      </div>

      {/* Category chips — horizontal scroll */}
      {onCategorySelect && (
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1 scrollbar-hide">
          <button
            onClick={() => onCategorySelect('')}
            className={cn(
              'flex-shrink-0 rounded-full px-4 h-10 text-xs font-bold transition-all touch-manipulation active:scale-95',
              !selectedCategory
                ? 'bg-elec-yellow text-black'
                : 'bg-white/[0.08] text-white border border-white/10'
            )}
          >
            All Courses
          </button>
          {QUICK_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className={cn(
                  'flex-shrink-0 flex items-center gap-1.5 rounded-full px-3.5 h-10 text-xs font-bold transition-all touch-manipulation active:scale-95',
                  isSelected
                    ? cn(cat.activeBg, cat.activeBorder, 'border', cat.color)
                    : 'bg-white/[0.08] text-white border border-white/10'
                )}
              >
                <cat.icon className={cn('h-3.5 w-3.5', isSelected ? cat.color : cat.color)} />
                {cat.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Stats line */}
      {analytics && (
        <div className="flex items-center gap-2">
          <p className="text-xs text-white">
            <span className="font-bold text-blue-400">{analytics.totalCourses}</span> courses
            {' from '}
            <span className="font-semibold">{analytics.totalProviders}</span> providers
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ModernCoursesHero;

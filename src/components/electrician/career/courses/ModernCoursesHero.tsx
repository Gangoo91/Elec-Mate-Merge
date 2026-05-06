/**
 * ModernCoursesHero — editorial search + categories.
 *
 * Unified search/postcode pill (kept), uniform editorial category chips
 * (drops the per-category amber/sky/emerald/orange/violet/cyan colour
 * floods), tabular-num stat line. The icons stay because they're useful as
 * scanning hooks at thumb-size; their colour does not.
 */

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
  type LucideIcon,
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

const QUICK_CATEGORIES: { id: string; label: string; icon: LucideIcon }[] = [
  { id: '18th-edition', label: '18th Edition', icon: Zap },
  { id: 'inspection-testing', label: 'Testing', icon: Shield },
  { id: 'ev-charging', label: 'EV', icon: Battery },
  { id: 'fire-alarm', label: 'Fire alarm', icon: Flame },
  { id: 'pat-testing', label: 'PAT', icon: Wrench },
  { id: 'level-3', label: 'Level 3', icon: GraduationCap },
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="space-y-3"
    >
      {/* Unified search/postcode pill */}
      <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.10] rounded-2xl p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/65 pointer-events-none"
            aria-hidden
          />
          <Input
            type="text"
            placeholder="Search courses, qualifications, providers"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 pl-9 bg-transparent border-0 text-white text-[13.5px] placeholder:text-white/65 focus-visible:ring-0 focus-visible:ring-offset-0 touch-manipulation"
          />
        </div>
        {onLocationChange && (
          <>
            <div className="w-px h-6 bg-white/[0.08]" aria-hidden />
            <div className="relative w-28">
              <MapPin
                className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/65 pointer-events-none"
                aria-hidden
              />
              <Input
                type="text"
                placeholder="Postcode"
                value={locationQuery}
                onChange={(e) => onLocationChange(e.target.value.toUpperCase())}
                maxLength={8}
                className="h-10 pl-7 bg-transparent border-0 text-white text-[13px] placeholder:text-white/65 focus-visible:ring-0 focus-visible:ring-offset-0 touch-manipulation uppercase tabular-nums"
              />
            </div>
          </>
        )}
        {onRefreshData && (
          <button
            type="button"
            onClick={onRefreshData}
            disabled={isRefreshing}
            aria-label="Refresh"
            className="h-10 w-10 shrink-0 inline-flex items-center justify-center rounded-xl border border-white/[0.10] text-white/85 hover:text-white hover:border-white/[0.20] touch-manipulation active:scale-95 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
          </button>
        )}
      </div>

      {/* Category pills */}
      {onCategorySelect && (
        <div className="flex gap-1.5 overflow-x-auto -mx-4 px-4 pb-1 scrollbar-hide">
          <button
            type="button"
            onClick={() => onCategorySelect('')}
            className={cn(
              'shrink-0 inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.12em] border rounded-full px-3 h-9 touch-manipulation transition-colors',
              !selectedCategory
                ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                : 'text-white/85 border-white/15 hover:border-white/30'
            )}
          >
            All courses
          </button>
          {QUICK_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategorySelect(cat.id)}
                className={cn(
                  'shrink-0 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] border rounded-full px-3 h-9 touch-manipulation transition-colors',
                  isSelected
                    ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                    : 'text-white/85 border-white/15 hover:border-white/30'
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {cat.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Stats line */}
      {analytics && (
        <p className="text-[11px] tabular-nums text-white/85">
          <span className="font-semibold text-elec-yellow">{analytics.totalCourses}</span> courses
          {' · '}
          <span className="font-semibold">{analytics.totalProviders}</span> providers
        </p>
      )}
    </motion.div>
  );
};

export default ModernCoursesHero;

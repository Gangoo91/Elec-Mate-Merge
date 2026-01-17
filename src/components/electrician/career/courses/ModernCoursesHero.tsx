import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Users, Star, TrendingUp, Calculator, RefreshCw, Search } from "lucide-react";
import type { CourseAnalytics } from "@/components/apprentice/career/courses/enhancedCoursesData";
import { cn } from "@/lib/utils";

interface ModernCoursesHeroProps {
  analytics: CourseAnalytics | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFundingCalculator: () => void;
  onRefreshData?: () => void;
  isRefreshing?: boolean;
}

const ModernCoursesHero = ({
  analytics,
  searchQuery,
  onSearchChange,
  onFundingCalculator,
  onRefreshData,
  isRefreshing = false,
}: ModernCoursesHeroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-elec-gray/50 border border-blue-500/20 rounded-2xl"
    >
      {/* Top Accent Line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500/60 via-blue-400 to-blue-500/60" />

      <div className="p-4 sm:p-6">
        {/* Header Row */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <BookOpen className="h-7 w-7 text-blue-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Training <span className="text-blue-400">Courses</span>
            </h1>
            <p className="text-sm text-white mt-1">
              Professional certifications & qualifications
            </p>
          </div>

          {/* Refresh Button */}
          {onRefreshData && (
            <Button
              onClick={onRefreshData}
              disabled={isRefreshing}
              size="sm"
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/10"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          )}
        </div>

        {/* Quick Stats */}
        {analytics && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <BookOpen className="h-5 w-5 text-blue-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{analytics.totalCourses}</div>
              <div className="text-[10px] text-white">Courses</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <Users className="h-5 w-5 text-green-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{analytics.totalProviders}</div>
              <div className="text-[10px] text-white">Providers</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <Star className="h-5 w-5 text-elec-yellow mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{analytics.averageRating.toFixed(1)}</div>
              <div className="text-[10px] text-white">Avg Rating</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <TrendingUp className="h-5 w-5 text-red-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{analytics.highDemandCourses}</div>
              <div className="text-[10px] text-white">High Demand</div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mt-5">
          <div className="relative">
            {!searchQuery && (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 pointer-events-none" />
            )}
            <Input
              type="text"
              placeholder="Search courses, providers, or topics..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={cn(
                "bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-blue-500/50 focus:ring-blue-500/20",
                !searchQuery && "pl-10"
              )}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-5">
          <Button
            onClick={onFundingCalculator}
            className="bg-blue-500 text-white hover:bg-blue-600 gap-2"
          >
            <Calculator className="h-4 w-4" />
            Funding Calculator
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernCoursesHero;

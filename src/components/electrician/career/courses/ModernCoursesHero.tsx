import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, TrendingUp, Star, Calculator, RefreshCw, Clock, ChevronDown } from "lucide-react";
import type { CourseAnalytics } from "@/components/apprentice/career/courses/enhancedCoursesData";

interface ModernCoursesHeroProps {
  analytics: CourseAnalytics | null;
  onFundingCalculator: () => void;
  onRefreshData?: () => void;
  isRefreshing?: boolean;
  lastUpdated?: string | null;
}

const ModernCoursesHero = ({
  analytics,
  onFundingCalculator,
  onRefreshData,
  isRefreshing = false,
  lastUpdated,
}: ModernCoursesHeroProps) => {
  return (
    <div className="space-y-4">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-elec-gray/50 border border-blue-500/20 rounded-2xl"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500/60 via-blue-400 to-blue-500/60" />

        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <BookOpen className="h-7 w-7 text-blue-400" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                Training <span className="text-blue-400">Courses</span>
              </h1>
              <p className="text-sm text-white/60 mt-1">
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
                className="text-white/60 hover:text-white hover:bg-white/10"
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
                <div className="text-[10px] text-white/50">Courses</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <Users className="h-5 w-5 text-green-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white">{analytics.totalProviders}</div>
                <div className="text-[10px] text-white/50">Providers</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <Star className="h-5 w-5 text-elec-yellow mx-auto mb-1" />
                <div className="text-lg font-bold text-white">{analytics.averageRating.toFixed(1)}</div>
                <div className="text-[10px] text-white/50">Avg Rating</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <TrendingUp className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white">{analytics.highDemandCourses}</div>
                <div className="text-[10px] text-white/50">High Demand</div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-5">
            <Button
              onClick={onFundingCalculator}
              className="bg-blue-500 text-white hover:bg-blue-600 gap-2 flex-1 sm:flex-none"
            >
              <Calculator className="h-4 w-4" />
              Funding Calculator
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white/70 hover:text-white hover:bg-white/10 gap-2 flex-1 sm:flex-none"
              onClick={() => {
                const filterSection = document.getElementById("courses-filters");
                filterSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <ChevronDown className="h-4 w-4" />
              Browse Courses
            </Button>
          </div>

          {/* Last Updated */}
          {lastUpdated && (
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-white/50">
              <Clock className="h-3 w-3" />
              <span>Updated: {new Date(lastUpdated).toLocaleString()}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Popular Categories */}
      {analytics?.topCategories && analytics.topCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-elec-gray/50 border border-white/10 rounded-xl p-4"
        >
          <h3 className="text-sm font-medium text-white/70 mb-3">Popular Categories</h3>
          <div className="flex flex-wrap gap-2">
            {analytics.topCategories.slice(0, 6).map((category) => (
              <Badge
                key={category.name}
                variant="secondary"
                className="bg-white/10 text-white/80 border-white/10 hover:bg-blue-500/20 hover:text-blue-300 transition-colors cursor-pointer"
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ModernCoursesHero;

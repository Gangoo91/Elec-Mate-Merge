import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, TrendingUp, Star, Calculator, Zap, RefreshCw, Clock } from "lucide-react";
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
  lastUpdated 
}: ModernCoursesHeroProps) => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-elec-card/95 via-elec-card/90 to-elec-card/85 rounded-2xl border border-elec-yellow/20 p-6 sm:p-8 lg:p-10 mb-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 rounded-2xl"></div>
        
        <div className="relative space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-elec-yellow/20">
                <Zap className="h-8 w-8 text-elec-yellow" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Courses Hub
              </h1>
            </div>
            
            <p className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover the latest electrical courses and certifications to enhance your career. 
              From essential updates to emerging technologies, find training that powers your professional growth.
            </p>
          </div>

          {/* Statistics */}
          {analytics && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-5 w-5 text-elec-yellow" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white">{analytics.totalCourses}</div>
                <div className="text-xs sm:text-sm text-white/80">Courses</div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-elec-yellow" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white">{analytics.totalProviders}</div>
                <div className="text-xs sm:text-sm text-white/80">Providers</div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-5 w-5 text-elec-yellow" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white">{analytics.averageRating.toFixed(1)}</div>
                <div className="text-xs sm:text-sm text-white/80">Avg Rating</div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-elec-yellow" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white">{analytics.highDemandCourses}</div>
                <div className="text-xs sm:text-sm text-white/80">High Demand</div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={onFundingCalculator}
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold px-8 py-3 rounded-lg shadow-lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Funding Calculator
            </Button>
            
            {onRefreshData && (
              <Button
                onClick={onRefreshData}
                disabled={isRefreshing}
                variant="outline"
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 px-8 py-3 rounded-lg disabled:opacity-50"
              >
                <RefreshCw className={`h-5 w-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh Courses'}
              </Button>
            )}
            
            <Button
              variant="outline"
              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 px-8 py-3 rounded-lg"
              onClick={() => {
                const filterSection = document.getElementById('courses-filters');
                filterSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Browse Courses
            </Button>
          </div>

          {/* Last Updated Info */}
          {lastUpdated && (
            <div className="flex items-center justify-center gap-2 text-sm text-white/70">
              <Clock className="h-4 w-4" />
              <span>Last updated: {new Date(lastUpdated).toLocaleString()}</span>
            </div>
          )}

          {/* Top Categories Preview */}
          {analytics?.topCategories && analytics.topCategories.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white text-center">Popular Categories</h3>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {analytics.topCategories.slice(0, 6).map((category, index) => (
                  <Badge
                    key={category.name}
                    variant="secondary"
                    className="bg-white/10 text-white border-white/20 hover:bg-elec-yellow/20 hover:text-elec-yellow transition-colors cursor-pointer"
                  >
                    {category.name} ({category.count})
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernCoursesHero;
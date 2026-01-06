
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp, Users, Award, PoundSterling,
  BookOpen, Target, Star, Building, Sparkles
} from "lucide-react";
import { courseAnalytics } from "./enhancedCoursesData";

const CourseAnalyticsDashboard = () => {
  return (
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-3 text-white">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
          </div>
          UK Course Market Insights
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 relative">
        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl font-bold text-elec-yellow">{courseAnalytics.totalCourses}</div>
            <div className="text-xs text-white/70 mt-1">Available Courses</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl font-bold text-elec-yellow">{courseAnalytics.totalProviders}</div>
            <div className="text-xs text-white/70 mt-1">Training Providers</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl font-bold text-elec-yellow flex items-center justify-center gap-1">
              <Star className="h-5 w-5 fill-elec-yellow" />
              <span>{courseAnalytics.averageRating}</span>
            </div>
            <div className="text-xs text-white/70 mt-1">Average Rating</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl font-bold text-green-400">{courseAnalytics.highDemandCourses}</div>
            <div className="text-xs text-white/70 mt-1">High Demand</div>
          </div>
        </div>

        {/* Industry Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-green-500/20">
                  <Award className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-sm font-medium text-green-400">High Demand Skills</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{courseAnalytics.highDemandCourses}</div>
              <div className="text-xs text-white/70">courses in high demand</div>
              <div className="mt-2 text-xs text-green-400">
                Essential for career progression
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-blue-500/20">
                  <BookOpen className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-sm font-medium text-blue-400">Emerging Tech</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{courseAnalytics.emergingTechCourses}</div>
              <div className="text-xs text-white/70">future-ready courses</div>
              <div className="mt-2 text-xs text-blue-400">
                High salary impact potential
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-4 relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-amber-500/20">
                  <PoundSterling className="h-4 w-4 text-amber-400" />
                </div>
                <span className="text-sm font-medium text-amber-400">Salary Impact</span>
              </div>
              <div className="text-lg font-bold text-white mb-1">{courseAnalytics.averageSalaryImpact}</div>
              <div className="text-xs text-white/70">average annual increase</div>
              <div className="mt-2 text-xs text-amber-400">
                Based on industry data
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Categories */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <h4 className="text-sm font-medium mb-4 text-elec-yellow flex items-center gap-2">
            <div className="p-1.5 rounded bg-elec-yellow/20">
              <Target className="h-4 w-4" />
            </div>
            Most Popular Course Categories
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {courseAnalytics.topCategories.map((category, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-elec-yellow/30 transition-all">
                <div className="flex items-center gap-2">
                  <Building className="h-3.5 w-3.5 text-elec-yellow" />
                  <span className="text-sm text-white">{category.name}</span>
                </div>
                <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                  {category.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Market Trends */}
        <Card className="bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border-elec-yellow/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardContent className="p-4 relative">
            <h4 className="font-medium mb-4 text-elec-yellow flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              UK Market Trends 2026
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium mb-3 text-green-400 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Growing Demand
                </h5>
                <ul className="space-y-2 text-xs text-white/80">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    EV charging installation (+45% year-on-year)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    Smart building automation (+35%)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    Renewable energy systems (+40%)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    Data centre electrical work (+30%)
                  </li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <h5 className="font-medium mb-3 text-blue-400 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Skills Shortage Areas
                </h5>
                <ul className="space-y-2 text-xs text-white/80">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    Testing & inspection qualified electricians
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    Industrial automation specialists
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    ATEX certified professionals
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    Project management qualified sparks
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default CourseAnalyticsDashboard;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, Users, Award, PoundSterling, 
  BookOpen, Target, Star, Building 
} from "lucide-react";
import { courseAnalytics } from "./enhancedCoursesData";

const CourseAnalyticsDashboard = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          UK Course Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-elec-yellow">{courseAnalytics.totalCourses}</div>
            <div className="text-xs text-muted-foreground">Available Courses</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-elec-yellow">{courseAnalytics.totalProviders}</div>
            <div className="text-xs text-muted-foreground">Training Providers</div>
          </div>
          <div className="text-2xl font-bold text-elec-yellow flex items-center justify-center gap-1">
            <Star className="h-4 w-4 fill-elec-yellow" />
            <span>{courseAnalytics.averageRating}</span>
          </div>
          <div className="text-center space-y-1">
            <div className="text-xs text-muted-foreground">Average Rating</div>
          </div>
        </div>

        {/* Industry Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-elec-yellow/10 bg-elec-dark/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Award className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">High Demand Skills</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{courseAnalytics.highDemandCourses}</div>
              <div className="text-xs text-muted-foreground">courses in high demand</div>
              <div className="mt-2 text-xs text-green-400">
                Essential for career progression
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/10 bg-elec-dark/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Emerging Tech</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{courseAnalytics.emergingTechCourses}</div>
              <div className="text-xs text-muted-foreground">future-ready courses</div>
              <div className="mt-2 text-xs text-blue-400">
                High salary impact potential
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/10 bg-elec-dark/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <PoundSterling className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">Salary Impact</span>
              </div>
              <div className="text-lg font-bold text-white mb-1">{courseAnalytics.averageSalaryImpact}</div>
              <div className="text-xs text-muted-foreground">average annual increase</div>
              <div className="mt-2 text-xs text-amber-400">
                Based on industry data
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Categories */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-1">
            <Target className="h-4 w-4" />
            Most Popular Course Categories
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {courseAnalytics.topCategories.map((category, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-elec-dark/30 rounded-lg border border-elec-yellow/10">
                <div className="flex items-center gap-2">
                  <Building className="h-3 w-3 text-elec-yellow" />
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
        <Card className="bg-elec-yellow/5 border-elec-yellow/20">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 text-elec-yellow">UK Market Trends 2025</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium mb-2 text-green-400">Growing Demand:</h5>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• EV charging installation (+45% year-on-year)</li>
                  <li>• Smart building automation (+35%)</li>
                  <li>• Renewable energy systems (+40%)</li>
                  <li>• Data centre electrical work (+30%)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2 text-blue-400">Skills Shortage Areas:</h5>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Testing & inspection qualified electricians</li>
                  <li>• Industrial automation specialists</li>
                  <li>• ATEX certified professionals</li>
                  <li>• Project management qualified sparks</li>
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

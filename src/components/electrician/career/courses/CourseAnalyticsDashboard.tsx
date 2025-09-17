import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, TrendingUp, Award, Clock, PoundSterling, MapPin, Star } from "lucide-react";

interface CourseAnalytics {
  totalCourses: number;
  averageRating: number;
  topCategories: { name: string; count: number; growth: string; }[];
  averagePrice: string;
  averageDuration: string;
  topProviders: { name: string; courses: number; rating: number; }[];
  industryTrends: { trend: string; impact: string; }[];
  completionRate: number;
  employmentRate: number;
  salaryIncrease: string;
}

const courseAnalytics: CourseAnalytics = {
  totalCourses: 347,
  averageRating: 4.3,
  topCategories: [
    { name: "Electrical Installation", count: 89, growth: "+12%" },
    { name: "Inspection & Testing", count: 67, growth: "+8%" },
    { name: "Renewable Energy", count: 54, growth: "+24%" },
    { name: "Industrial Systems", count: 43, growth: "+6%" },
    { name: "Health & Safety", count: 38, growth: "+15%" }
  ],
  averagePrice: "£1,247",
  averageDuration: "5.2 days",
  topProviders: [
    { name: "City & Guilds", courses: 42, rating: 4.6 },
    { name: "NICEIC", courses: 38, rating: 4.5 },
    { name: "ECA", courses: 35, rating: 4.4 },
    { name: "JTL Training", courses: 29, rating: 4.3 }
  ],
  industryTrends: [
    { trend: "EV Charging Installation", impact: "High demand - 89% growth" },
    { trend: "Smart Home Technology", impact: "Growing market - 45% growth" },
    { trend: "Energy Storage Systems", impact: "Emerging field - 156% growth" },
    { trend: "Building Management Systems", impact: "Steady demand - 23% growth" }
  ],
  completionRate: 94,
  employmentRate: 87,
  salaryIncrease: "£3,200-£8,500"
};

const CourseAnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-elec-card border-elec-yellow/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Courses</p>
                <p className="text-2xl font-bold text-white">{courseAnalytics.totalCourses}</p>
              </div>
              <BookOpen className="h-8 w-8 text-elec-yellow" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-card border-elec-yellow/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Average Rating</p>
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-bold text-white">{courseAnalytics.averageRating}</p>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <Award className="h-8 w-8 text-elec-yellow" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-card border-elec-yellow/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Average Price</p>
                <p className="text-2xl font-bold text-white">{courseAnalytics.averagePrice}</p>
              </div>
              <PoundSterling className="h-8 w-8 text-elec-yellow" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-card border-elec-yellow/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Average Duration</p>
                <p className="text-2xl font-bold text-white">{courseAnalytics.averageDuration}</p>
              </div>
              <Clock className="h-8 w-8 text-elec-yellow" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Industry Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Categories */}
        <Card className="bg-elec-card border-elec-yellow/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              Popular Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courseAnalytics.topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background/20 rounded-lg">
                <div>
                  <p className="font-medium text-white">{category.name}</p>
                  <p className="text-sm text-white/60">{category.count} courses</p>
                </div>
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                  {category.growth}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Training Providers */}
        <Card className="bg-elec-card border-elec-yellow/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="h-5 w-5 text-elec-yellow" />
              Top Training Providers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courseAnalytics.topProviders.map((provider, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background/20 rounded-lg">
                <div>
                  <p className="font-medium text-white">{provider.name}</p>
                  <p className="text-sm text-white/60">{provider.courses} courses</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-white">{provider.rating}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Market Trends & Success Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Trends */}
        <Card className="bg-elec-card border-elec-yellow/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              Industry Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courseAnalytics.industryTrends.map((trend, index) => (
              <div key={index} className="p-3 bg-background/20 rounded-lg">
                <h4 className="font-medium text-white mb-1">{trend.trend}</h4>
                <p className="text-sm text-elec-yellow">{trend.impact}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Success Metrics */}
        <Card className="bg-elec-card border-elec-yellow/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Award className="h-5 w-5 text-elec-yellow" />
              Course Success Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-background/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60">Course Completion Rate</span>
                <span className="text-white font-medium">{courseAnalytics.completionRate}%</span>
              </div>
              <div className="w-full bg-background/30 rounded-full h-2">
                <div 
                  className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
                  style={{ width: `${courseAnalytics.completionRate}%` }}
                />
              </div>
            </div>

            <div className="p-3 bg-background/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60">Employment Rate</span>
                <span className="text-white font-medium">{courseAnalytics.employmentRate}%</span>
              </div>
              <div className="w-full bg-background/30 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${courseAnalytics.employmentRate}%` }}
                />
              </div>
            </div>

            <div className="p-3 bg-background/20 rounded-lg">
              <span className="text-white/60 block mb-1">Average Salary Increase</span>
              <span className="text-elec-yellow font-semibold text-lg">{courseAnalytics.salaryIncrease}</span>
              <p className="text-xs text-white/60 mt-1">Per year after course completion</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseAnalyticsDashboard;
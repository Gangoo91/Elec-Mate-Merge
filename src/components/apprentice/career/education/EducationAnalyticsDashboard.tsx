
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, Users, Award, PoundSterling, 
  BookOpen, Target, Star, Building, GraduationCap 
} from "lucide-react";

interface EducationAnalytics {
  totalCourses: number;
  totalProviders: number;
  averageRating: number;
  averageEmploymentRate: number;
  averageStartingSalary: string;
  highDemandPrograms: number;
  fundingOptionsAvailable: number;
  topCategories: Array<{ name: string; count: number }>;
}

const educationAnalytics: EducationAnalytics = {
  totalCourses: 250,
  totalProviders: 85,
  averageRating: 4.7,
  averageEmploymentRate: 94,
  averageStartingSalary: "£28,000 - £35,000",
  highDemandPrograms: 45,
  fundingOptionsAvailable: 12,
  topCategories: [
    { name: "Bachelor's Degrees", count: 89 },
    { name: "HNC/HND", count: 67 },
    { name: "Master's Degrees", count: 45 },
    { name: "Professional Certs", count: 32 },
    { name: "Foundation Degrees", count: 17 }
  ]
};

const EducationAnalyticsDashboard = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          UK Education Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-elec-yellow">{educationAnalytics.totalCourses}</div>
            <div className="text-xs text-muted-foreground">Available Programmes</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-elec-yellow">{educationAnalytics.totalProviders}</div>
            <div className="text-xs text-muted-foreground">Education Providers</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-elec-yellow flex items-center justify-center gap-1">
              <Star className="h-4 w-4 fill-elec-yellow" />
              <span>{educationAnalytics.averageRating}</span>
            </div>
            <div className="text-xs text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-elec-yellow">{educationAnalytics.averageEmploymentRate}%</div>
            <div className="text-xs text-muted-foreground">Employment Rate</div>
          </div>
        </div>

        {/* Industry Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-elec-yellow/10 bg-elec-dark/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">High Demand</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{educationAnalytics.highDemandPrograms}</div>
              <div className="text-xs text-muted-foreground">programmes in high demand</div>
              <div className="mt-2 text-xs text-green-400">
                Excellent career prospects
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/10 bg-elec-dark/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <PoundSterling className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Funding Available</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{educationAnalytics.fundingOptionsAvailable}</div>
              <div className="text-xs text-muted-foreground">different funding options</div>
              <div className="mt-2 text-xs text-blue-400">
                Multiple pathways to finance
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/10 bg-elec-dark/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Award className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">Starting Salary</span>
              </div>
              <div className="text-lg font-bold text-white mb-1">{educationAnalytics.averageStartingSalary}</div>
              <div className="text-xs text-muted-foreground">average graduate salary</div>
              <div className="mt-2 text-xs text-amber-400">
                Strong return on investment
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Categories */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-1">
            <Target className="h-4 w-4" />
            Most Popular Education Categories
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {educationAnalytics.topCategories.map((category, idx) => (
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
            <h4 className="font-medium mb-3 text-elec-yellow">UK Education Trends 2025</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium mb-2 text-green-400">Growth Areas:</h5>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Renewable energy programmes (+60% applications)</li>
                  <li>• Digital engineering courses (+40% demand)</li>
                  <li>• Part-time and flexible study (+35%)</li>
                  <li>• Work-based learning pathways (+50%)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2 text-blue-400">Industry Partnerships:</h5>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• 85% of programmes have employer links</li>
                  <li>• Average 94% employment rate post-graduation</li>
                  <li>• £12k+ average salary increase after qualification</li>
                  <li>• 78% receive job offers before graduation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default EducationAnalyticsDashboard;

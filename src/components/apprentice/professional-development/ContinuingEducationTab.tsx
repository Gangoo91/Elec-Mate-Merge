
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Calculator, 
  Clock, 
  Users, 
  Lightbulb,
  Award,
  TrendingUp,
  ExternalLink,
  Target,
  BarChart3,
  Map
} from "lucide-react";
import AdvancedFundingCalculator from "./AdvancedFundingCalculator";
import CourseCategories from "./CourseCategories";
import CoursePlanningGuide from "./CoursePlanningGuide";
import IndustryInsights from "./IndustryInsights";

const ContinuingEducationTab = () => {
  const benefits = [
    {
      title: "Stay Current",
      description: "Technology and regulations are constantly evolving. Continuing education keeps you relevant.",
      icon: TrendingUp
    },
    {
      title: "Higher Earnings",
      description: "Specialist skills command premium rates and open doors to better opportunities.",
      icon: Award
    },
    {
      title: "Future-Proof Career",
      description: "Green energy and smart technology are the future of electrical work.",
      icon: Lightbulb
    }
  ];

  const quickStats = [
    {
      title: "Average Salary Increase",
      value: "£8k-£15k",
      description: "After completing specialist training",
      icon: TrendingUp
    },
    {
      title: "Skills Shortage Areas",
      value: "5 Key Sectors",
      description: "Renewable energy, EV charging, smart tech, data centres, industrial automation",
      icon: Target
    },
    {
      title: "Funding Available",
      value: "Up to 100%",
      description: "Through Advanced Learner Loans and employer support",
      icon: Calculator
    },
    {
      title: "Course Completion Rate",
      value: "89%",
      description: "For electrical professionals undertaking further education",
      icon: Award
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Continuing Education & Training</h2>
        <p className="text-muted-foreground">
          Advance your career with further education and specialist training courses
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray/50">
            <CardContent className="p-4 text-center">
              <div className="mx-auto w-10 h-10 bg-elec-yellow/10 rounded-lg flex items-center justify-center mb-2">
                <stat.icon className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="text-lg font-bold text-elec-yellow">{stat.value}</div>
              <div className="text-sm font-medium text-white">{stat.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="calculator" className="flex items-center gap-2 text-xs lg:text-sm">
            <Calculator className="h-3 w-3 lg:h-4 lg:w-4" />
            <span className="hidden sm:inline">Calculator</span>
            <span className="sm:hidden">Calc</span>
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2 text-xs lg:text-sm">
            <BookOpen className="h-3 w-3 lg:h-4 lg:w-4" />
            <span className="hidden sm:inline">Courses</span>
            <span className="sm:hidden">Course</span>
          </TabsTrigger>
          <TabsTrigger value="planning" className="flex items-center gap-2 text-xs lg:text-sm">
            <Target className="h-3 w-3 lg:h-4 lg:w-4" />
            <span className="hidden sm:inline">Planning</span>
            <span className="sm:hidden">Plan</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2 text-xs lg:text-sm">
            <BarChart3 className="h-3 w-3 lg:h-4 lg:w-4" />
            <span className="hidden sm:inline">Insights</span>
            <span className="sm:hidden">Data</span>
          </TabsTrigger>
          <TabsTrigger value="benefits" className="flex items-center gap-2 text-xs lg:text-sm">
            <Award className="h-3 w-3 lg:h-4 lg:w-4" />
            <span className="hidden sm:inline">Benefits</span>
            <span className="sm:hidden">Why</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="mt-6">
          <AdvancedFundingCalculator />
        </TabsContent>

        <TabsContent value="courses" className="mt-6">
          <CourseCategories />
        </TabsContent>

        <TabsContent value="planning" className="mt-6">
          <CoursePlanningGuide />
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <IndustryInsights />
        </TabsContent>

        <TabsContent value="benefits" className="mt-6">
          <div className="space-y-6">
            {/* Benefits Section */}
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle>Why Continue Learning?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="text-center space-y-3">
                      <div className="mx-auto w-12 h-12 bg-elec-yellow/10 rounded-lg flex items-center justify-center">
                        <benefit.icon className="h-6 w-6 text-elec-yellow" />
                      </div>
                      <h3 className="font-semibold text-elec-yellow">{benefit.title}</h3>
                      <p className="text-sm text-elec-light/80">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Success Stories */}
            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Users className="h-5 w-5" />
                  Success Stories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="bg-elec-dark/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-400 mb-2">Sarah - Solar PV Specialist</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        "Completed MCS training after 3 years as a domestic electrician. Now earning 40% more 
                        installing solar systems and have a 6-month waiting list of customers."
                      </p>
                      <Badge variant="outline" className="text-xs text-green-400 border-green-400/30">
                        Salary: £28k → £39k
                      </Badge>
                    </div>
                    
                    <div className="bg-elec-dark/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-400 mb-2">James - EV Charging Expert</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        "Took EV charging course during lockdown. Started specialising in commercial installs 
                        and now run my own team of 4 electricians focused on rapid charging infrastructure."
                      </p>
                      <Badge variant="outline" className="text-xs text-blue-400 border-blue-400/30">
                        Salary: £32k → £52k + business owner
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-elec-dark/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-400 mb-2">Mike - Automation Engineer</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        "Completed HND part-time while working. Progressed from installation to design role 
                        in building automation. Now leading smart building projects across the Midlands."
                      </p>
                      <Badge variant="outline" className="text-xs text-purple-400 border-purple-400/30">
                        Salary: £35k → £58k
                      </Badge>
                    </div>

                    <div className="bg-elec-dark/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-400 mb-2">Lisa - Training Manager</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        "Used employer funding for teaching qualification. Moved from site work to training 
                        role with major contractor. Better work-life balance and steady progression."
                      </p>
                      <Badge variant="outline" className="text-xs text-orange-400 border-orange-400/30">
                        Salary: £36k → £45k + benefits
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Tips */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Calculator className="h-5 w-5" />
            Funding Tips & Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2 text-blue-400">Before You Apply</h4>
              <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                <li>Use our funding calculator to explore all options</li>
                <li>Check with your employer about training budgets</li>
                <li>Research regional and industry-specific grants</li>
                <li>Compare course providers and costs thoroughly</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 text-blue-400">Useful Resources</h4>
              <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                <li>Student Finance England for Advanced Learner Loans</li>
                <li>Local authority skills funding programmes</li>
                <li>Industry training boards and levy funds</li>
                <li>Charity and foundation educational grants</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuingEducationTab;

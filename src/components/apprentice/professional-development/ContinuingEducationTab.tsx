
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calculator,
  Users,
  Lightbulb,
  Award,
  TrendingUp,
  Target,
  BarChart3,
  Sparkles,
  GraduationCap,
  Zap,
  PoundSterling,
  ChevronRight,
  Star,
  Rocket,
  CheckCircle,
  Info
} from "lucide-react";
import AdvancedFundingCalculator from "./AdvancedFundingCalculator";
import CourseCategories from "./CourseCategories";
import CoursePlanningGuide from "./CoursePlanningGuide";
import IndustryInsights from "./IndustryInsights";

type TabId = "calculator" | "courses" | "planning" | "insights" | "benefits";

const ContinuingEducationTab = () => {
  const [activeTab, setActiveTab] = useState<TabId>("calculator");

  const benefits = [
    {
      title: "Stay Current",
      description: "Technology and regulations are constantly evolving. Continuing education keeps you relevant in a rapidly changing industry.",
      icon: TrendingUp,
      color: "blue",
      stat: "18th Edition updated 2022"
    },
    {
      title: "Higher Earnings",
      description: "Specialist skills command premium rates and open doors to better opportunities. EV and solar specialists earn 30-50% more.",
      icon: Award,
      color: "green",
      stat: "+£8-15k annually"
    },
    {
      title: "Future-Proof Career",
      description: "Green energy and smart technology are the future of electrical work. Position yourself for the net-zero transition.",
      icon: Lightbulb,
      color: "yellow",
      stat: "1.2M green jobs by 2030"
    }
  ];

  const quickStats = [
    {
      title: "Salary Increase",
      value: "£8k-£15k",
      description: "After specialist training",
      icon: PoundSterling,
      color: "green"
    },
    {
      title: "Growth Sectors",
      value: "5 Key",
      description: "EV, Solar, Heat Pumps, BESS, Smart",
      icon: Rocket,
      color: "blue"
    },
    {
      title: "Funding Available",
      value: "Up to 100%",
      description: "Loans & employer support",
      icon: Calculator,
      color: "purple"
    },
    {
      title: "Completion Rate",
      value: "89%",
      description: "For working electricians",
      icon: Award,
      color: "yellow"
    }
  ];

  const tabs = [
    { id: "calculator" as TabId, label: "Calculator", shortLabel: "Calc", icon: Calculator, color: "green" },
    { id: "courses" as TabId, label: "Courses", shortLabel: "Course", icon: BookOpen, color: "blue" },
    { id: "planning" as TabId, label: "Planning", shortLabel: "Plan", icon: Target, color: "purple" },
    { id: "insights" as TabId, label: "Insights", shortLabel: "Data", icon: BarChart3, color: "cyan" },
    { id: "benefits" as TabId, label: "Benefits", shortLabel: "Why", icon: Award, color: "yellow" }
  ];

  const successStories = [
    {
      name: "Sarah",
      title: "Solar PV Specialist",
      story: "Completed MCS training after 3 years as a domestic electrician. Now earning 40% more installing solar systems and have a 6-month waiting list.",
      salaryBefore: "£28k",
      salaryAfter: "£39k",
      color: "green"
    },
    {
      name: "James",
      title: "EV Charging Expert",
      story: "Took EV charging course during lockdown. Started specialising in commercial installs and now run my own team of 4 electricians.",
      salaryBefore: "£32k",
      salaryAfter: "£52k + business",
      color: "blue"
    },
    {
      name: "Mike",
      title: "Automation Engineer",
      story: "Completed HND part-time while working. Progressed from installation to design role in building automation across the Midlands.",
      salaryBefore: "£35k",
      salaryAfter: "£58k",
      color: "purple"
    },
    {
      name: "Lisa",
      title: "Training Manager",
      story: "Used employer funding for teaching qualification. Moved from site work to training role with major contractor.",
      salaryBefore: "£36k",
      salaryAfter: "£45k + benefits",
      color: "orange"
    }
  ];

  const colorMap: Record<string, {
    border: string;
    bg: string;
    icon: string;
    iconBg: string;
    badge: string;
    glow: string;
    activeBg: string;
  }> = {
    green: {
      border: "border-green-500/30 hover:border-green-500/50",
      bg: "bg-gradient-to-br from-white/5 to-green-950/20",
      icon: "text-green-400",
      iconBg: "bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30",
      badge: "bg-green-500/10 text-green-400 border-green-500/30",
      glow: "bg-green-500/5",
      activeBg: "bg-green-500/20 border-green-500/50"
    },
    blue: {
      border: "border-blue-500/30 hover:border-blue-500/50",
      bg: "bg-gradient-to-br from-white/5 to-blue-950/20",
      icon: "text-blue-400",
      iconBg: "bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      glow: "bg-blue-500/5",
      activeBg: "bg-blue-500/20 border-blue-500/50"
    },
    purple: {
      border: "border-purple-500/30 hover:border-purple-500/50",
      bg: "bg-gradient-to-br from-white/5 to-purple-950/20",
      icon: "text-purple-400",
      iconBg: "bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      glow: "bg-purple-500/5",
      activeBg: "bg-purple-500/20 border-purple-500/50"
    },
    cyan: {
      border: "border-cyan-500/30 hover:border-cyan-500/50",
      bg: "bg-gradient-to-br from-white/5 to-cyan-950/20",
      icon: "text-cyan-400",
      iconBg: "bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30",
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      glow: "bg-cyan-500/5",
      activeBg: "bg-cyan-500/20 border-cyan-500/50"
    },
    yellow: {
      border: "border-elec-yellow/30 hover:border-elec-yellow/50",
      bg: "bg-gradient-to-br from-white/5 to-yellow-950/20",
      icon: "text-elec-yellow",
      iconBg: "bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30",
      badge: "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30",
      glow: "bg-elec-yellow/5",
      activeBg: "bg-elec-yellow/20 border-elec-yellow/50"
    },
    orange: {
      border: "border-orange-500/30 hover:border-orange-500/50",
      bg: "bg-gradient-to-br from-white/5 to-orange-950/20",
      icon: "text-orange-400",
      iconBg: "bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30",
      badge: "bg-orange-500/10 text-orange-400 border-orange-500/30",
      glow: "bg-orange-500/5",
      activeBg: "bg-orange-500/20 border-orange-500/50"
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "calculator":
        return <AdvancedFundingCalculator />;
      case "courses":
        return <CourseCategories />;
      case "planning":
        return <CoursePlanningGuide />;
      case "insights":
        return <IndustryInsights />;
      case "benefits":
        return (
          <div className="space-y-6 animate-fade-in">
            {/* Benefits Grid */}
            <Card className="bg-gradient-to-br from-white/5 to-elec-card border-elec-yellow/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <CardHeader className="relative">
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
                    <Sparkles className="h-5 w-5 text-elec-yellow" />
                  </div>
                  Why Continue Learning?
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {benefits.map((benefit, index) => {
                    const colors = colorMap[benefit.color];
                    const Icon = benefit.icon;
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-xl ${colors.bg} ${colors.border} transition-all text-center`}
                      >
                        <div className={`mx-auto w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-3`}>
                          <Icon className={`h-6 w-6 ${colors.icon}`} />
                        </div>
                        <h3 className={`font-semibold ${colors.icon} mb-2`}>{benefit.title}</h3>
                        <p className="text-sm text-white/70 mb-3">{benefit.description}</p>
                        <Badge variant="outline" className={`text-xs ${colors.badge}`}>
                          {benefit.stat}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Success Stories */}
            <Card className="bg-gradient-to-br from-white/5 to-elec-card border-green-500/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <CardHeader className="relative">
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
                    <Users className="h-5 w-5 text-green-400" />
                  </div>
                  Success Stories
                </CardTitle>
                <p className="text-sm text-white/60">Real electricians who upskilled and transformed their careers</p>
              </CardHeader>
              <CardContent className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {successStories.map((story, index) => {
                    const colors = colorMap[story.color];
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-xl ${colors.bg} ${colors.border} transition-all`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-8 h-8 rounded-full ${colors.iconBg} flex items-center justify-center`}>
                            <Star className={`h-4 w-4 ${colors.icon}`} />
                          </div>
                          <div>
                            <h4 className={`font-semibold ${colors.icon}`}>{story.name}</h4>
                            <p className="text-xs text-white/60">{story.title}</p>
                          </div>
                        </div>
                        <p className="text-sm text-white/70 mb-3 line-clamp-3">
                          "{story.story}"
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] bg-white/5 text-white/60 border-white/20">
                            {story.salaryBefore}
                          </Badge>
                          <ChevronRight className="h-3 w-3 text-white/40" />
                          <Badge variant="outline" className={`text-[10px] ${colors.badge}`}>
                            {story.salaryAfter}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30">
            <GraduationCap className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-green-400 uppercase tracking-wider">Lifelong Learning</span>
            </div>
            <h2 className="text-lg font-semibold text-white mb-1">
              Continuing Education & Training
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              Advance your career with further education and specialist training.
              <span className="text-green-400 font-medium"> UK needs 18,000+ electricians</span> with green technology skills by 2030.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickStats.map((stat, index) => {
          const colors = colorMap[stat.color];
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className={`${colors.bg} ${colors.border} overflow-hidden relative transition-all`}
            >
              <div className={`absolute top-0 right-0 w-16 h-16 ${colors.glow} rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`} />
              <CardContent className="p-3 relative">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`h-4 w-4 ${colors.icon}`} />
                </div>
                <div className={`text-lg font-bold ${colors.icon}`}>{stat.value}</div>
                <div className="text-xs font-medium text-white">{stat.title}</div>
                <div className="text-[10px] text-white/60">{stat.description}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => {
          const colors = colorMap[tab.color];
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <Button
              key={tab.id}
              variant="outline"
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 h-10 px-3 whitespace-nowrap touch-manipulation active:scale-95 transition-all ${
                isActive
                  ? `${colors.activeBg} ${colors.icon}`
                  : "border-white/20 text-white/70 hover:text-white hover:border-white/40"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </Button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>

      {/* Funding Tips */}
      <Card className="bg-gradient-to-br from-white/5 to-elec-card border-blue-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            Funding Tips & Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <h4 className="font-semibold mb-3 text-blue-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Before You Apply
              </h4>
              <ul className="text-sm space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                  Use our funding calculator to explore all options
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                  Check with your employer about training budgets
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                  Research regional and industry-specific grants
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                  Compare course providers and costs thoroughly
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <h4 className="font-semibold mb-3 text-green-400 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Useful Resources
              </h4>
              <ul className="text-sm space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                  Student Finance England for Advanced Learner Loans
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                  Local authority skills funding programmes
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                  Industry training boards and levy funds
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                  Charity and foundation educational grants
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pro Tip */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Lightbulb className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <p className="font-medium text-purple-400 mb-1">Smart Investment</p>
            <p className="text-sm text-white/70">
              <span className="text-purple-400 font-medium">ROI on electrical training averages 200-400%</span> within 2 years.
              A £2,000 course can lead to £8,000+ additional annual income through specialist rates.
              Many employers will contribute 50-100% if you commit to staying with them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinuingEducationTab;

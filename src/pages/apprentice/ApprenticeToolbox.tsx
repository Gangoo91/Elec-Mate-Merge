
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import {
  MessageCircle,
  FileText,
  PoundSterling,
  Users,
  Clock,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Award,
  Banknote,
  Sparkles,
  ChevronRight,
  Wrench,
  GraduationCap,
  Target,
  Lightbulb
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import ActiveToolContent from "@/components/apprentice/toolbox/ActiveToolContent";

interface ToolboxItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
  description: string;
  category: "essential" | "skills" | "career" | "wellbeing";
  badge?: string;
  accentColor: "yellow" | "green" | "blue" | "purple" | "orange";
  stats?: { label: string; value: string }[];
}

const ApprenticeToolbox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTool = searchParams.get("tool") || null;
  const setActiveTool = (tool: string | null) => {
    if (tool) {
      setSearchParams({ tool }, { replace: false });
    } else {
      searchParams.delete("tool");
      setSearchParams(searchParams, { replace: false });
    }
  };

  const toolboxItems: ToolboxItem[] = [
    {
      id: "apprenticeship-expectations",
      title: "Apprenticeship Expectations",
      icon: CheckCircle,
      link: "/apprentice/toolbox/apprenticeship-expectations",
      description: "What to expect during your electrical apprenticeship journey - roles, responsibilities and milestones",
      category: "essential",
      badge: "Start Here",
      accentColor: "yellow",
      stats: [
        { label: "Duration", value: "3-4 yrs" },
        { label: "Key Stages", value: "5" }
      ]
    },
    {
      id: "off-job-training",
      title: "Off-the-Job Training",
      icon: Clock,
      link: "/apprentice/toolbox/off-job-training-guide",
      description: "Understanding your 20% off-the-job training requirements and what counts",
      category: "essential",
      accentColor: "blue",
      stats: [
        { label: "Requirement", value: "20%" },
        { label: "Weekly", value: "~6 hrs" }
      ]
    },
    {
      id: "apprenticeship-funding",
      title: "Apprenticeship Funding",
      icon: Banknote,
      link: "/apprentice/toolbox/apprenticeship-funding",
      description: "How apprenticeship funding works - levy, co-investment and CITB grants explained",
      category: "essential",
      badge: "2026 Updated",
      accentColor: "green",
      stats: [
        { label: "Max Funding", value: "£27k" },
        { label: "CITB Grant", value: "£2.5k/yr" }
      ]
    },
    {
      id: "end-point-assessment",
      title: "End Point Assessment (EPA)",
      icon: Award,
      link: "/apprentice/toolbox/end-point-assessment",
      description: "Everything about your final EPA - components, grades and preparation tips",
      category: "essential",
      accentColor: "purple",
      stats: [
        { label: "Components", value: "3" },
        { label: "Grades", value: "P/M/D" }
      ]
    },
    {
      id: "rights-and-pay",
      title: "Apprentice Rights & Pay",
      icon: PoundSterling,
      link: "/apprentice/rights-and-pay",
      description: "National wage tiers, your rights on site, and support when things go wrong",
      category: "essential",
      badge: "April 2026",
      accentColor: "green",
      stats: [
        { label: "Min Wage", value: "£8.00/hr" },
        { label: "21+ Rate", value: "£12.71/hr" }
      ]
    },
    {
      id: "site-jargon",
      title: "Site Jargon & Terminology",
      icon: MessageCircle,
      link: "/apprentice/toolbox/site-jargon",
      description: "Common electrical and construction terms you'll hear on site - don't get caught out!",
      category: "skills",
      accentColor: "yellow",
      stats: [
        { label: "Terms", value: "200+" },
        { label: "Categories", value: "8" }
      ]
    },
    {
      id: "portfolio-building",
      title: "Portfolio Building",
      icon: FileText,
      link: "/apprentice/toolbox/portfolio-building",
      description: "How to document your work and build a professional portfolio for EPA",
      category: "skills",
      accentColor: "blue",
      stats: [
        { label: "Evidence Types", value: "12" },
        { label: "Tips", value: "25+" }
      ]
    },
    {
      id: "communication-skills",
      title: "Communication Skills",
      icon: Users,
      link: "/apprentice/toolbox/communication-skills",
      description: "How to speak with supervisors, report problems, and take feedback professionally",
      category: "skills",
      accentColor: "purple",
      stats: [
        { label: "Scenarios", value: "10" },
        { label: "Templates", value: "5" }
      ]
    },
    {
      id: "study-tips",
      title: "Study Tips & Techniques",
      icon: BookOpen,
      link: "/apprentice/toolbox/study-tips",
      description: "Effective learning strategies for electrical theory and practical skills",
      category: "skills",
      accentColor: "blue",
      stats: [
        { label: "Techniques", value: "15+" },
        { label: "Resources", value: "10+" }
      ]
    },
    {
      id: "learning-from-mistakes",
      title: "Learning from Mistakes",
      icon: AlertTriangle,
      link: "/apprentice/toolbox/learning-from-mistakes",
      description: "How to handle errors professionally and turn them into learning opportunities",
      category: "wellbeing",
      accentColor: "orange",
      stats: [
        { label: "Case Studies", value: "8" },
        { label: "Tips", value: "12" }
      ]
    },
    {
      id: "time-management",
      title: "Time Management & Balance",
      icon: Calendar,
      link: "/apprentice/toolbox/time-management",
      description: "Manage your apprenticeship workload whilst maintaining a healthy work-life balance",
      category: "wellbeing",
      accentColor: "green",
      stats: [
        { label: "Strategies", value: "10" },
        { label: "Tools", value: "6" }
      ]
    }
  ];

  const categories = [
    { id: "essential", label: "Essential Knowledge", icon: Target, description: "Core information every apprentice needs" },
    { id: "skills", label: "Skills Development", icon: Lightbulb, description: "Build professional capabilities" },
    { id: "wellbeing", label: "Wellbeing & Growth", icon: Sparkles, description: "Personal development and support" }
  ];

  const colorMap = {
    yellow: {
      border: "border-elec-yellow/30 hover:border-elec-yellow/60",
      bg: "bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5",
      badge: "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30",
      icon: "text-elec-yellow",
      iconBg: "bg-elec-yellow/10",
      glow: "group-hover:shadow-elec-yellow/20"
    },
    green: {
      border: "border-green-500/30 hover:border-green-500/60",
      bg: "bg-gradient-to-br from-green-500/10 to-green-500/5",
      badge: "bg-green-500/20 text-green-400 border-green-500/30",
      icon: "text-green-400",
      iconBg: "bg-green-500/10",
      glow: "group-hover:shadow-green-500/20"
    },
    blue: {
      border: "border-blue-500/30 hover:border-blue-500/60",
      bg: "bg-gradient-to-br from-blue-500/10 to-blue-500/5",
      badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      icon: "text-blue-400",
      iconBg: "bg-blue-500/10",
      glow: "group-hover:shadow-blue-500/20"
    },
    purple: {
      border: "border-purple-500/30 hover:border-purple-500/60",
      bg: "bg-gradient-to-br from-purple-500/10 to-purple-500/5",
      badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      icon: "text-purple-400",
      iconBg: "bg-purple-500/10",
      glow: "group-hover:shadow-purple-500/20"
    },
    orange: {
      border: "border-orange-500/30 hover:border-orange-500/60",
      bg: "bg-gradient-to-br from-orange-500/10 to-orange-500/5",
      badge: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      icon: "text-orange-400",
      iconBg: "bg-orange-500/10",
      glow: "group-hover:shadow-orange-500/20"
    }
  };

  if (activeTool) {
    return <ActiveToolContent activeTool={activeTool} onClose={() => setActiveTool(null)} />;
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in px-2 sm:px-0">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 sm:p-3 bg-elec-yellow/10 rounded-xl border border-elec-yellow/20">
              <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-white">
                Apprentice Guidance Area
              </h1>
              <p className="text-sm text-white/70 mt-0.5 hidden sm:block">
                Everything you need to succeed in your apprenticeship
              </p>
            </div>
          </div>
          <p className="hidden sm:block text-base text-white/70 sm:ml-[72px]">
            Essential resources, skills development, and support for UK electrical apprentices
          </p>
        </div>
        <SmartBackButton className="flex-shrink-0 w-full sm:w-auto" />
      </div>

      {/* Quick Stats Banner - Hidden on mobile */}
      <div className="hidden sm:grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-elec-yellow/10 rounded-lg flex-shrink-0">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-elec-yellow truncate">11</div>
                <div className="text-[10px] sm:text-xs text-white/70 truncate">Guidance Topics</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-500/20 bg-gradient-to-br from-green-500/10 to-green-500/5">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-green-500/10 rounded-lg flex-shrink-0">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-green-400 truncate">3-4 yrs</div>
                <div className="text-[10px] sm:text-xs text-white/70 truncate">Typical Duration</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-blue-500/10 rounded-lg flex-shrink-0">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-blue-400 truncate">20%</div>
                <div className="text-[10px] sm:text-xs text-white/70 truncate">Off-Job Training</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-purple-500/5">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-purple-500/10 rounded-lg flex-shrink-0">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-purple-400 truncate">Level 3</div>
                <div className="text-[10px] sm:text-xs text-white/70 truncate">NVQ Qualification</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories with Cards */}
      {categories.map((category) => {
        const categoryItems = toolboxItems.filter(item => item.category === category.id);
        if (categoryItems.length === 0) return null;

        return (
          <div key={category.id} className="space-y-4">
            {/* Category Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <category.icon className="h-5 w-5 text-elec-yellow" />
                {category.label}
              </h3>
              <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs">
                {categoryItems.length} {categoryItems.length === 1 ? 'Topic' : 'Topics'}
              </Badge>
            </div>
            <p className="text-sm text-white/60 -mt-2">{category.description}</p>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryItems.map((item) => {
                const colors = colorMap[item.accentColor];
                const IconComponent = item.icon;

                return (
                  <Link to={item.link} key={item.id} className="focus:outline-none">
                    <Card
                      className={`group relative ${colors.border} ${colors.bg} h-full transition-all duration-300 cursor-pointer overflow-hidden hover:shadow-lg ${colors.glow} hover:-translate-y-1`}
                    >
                      {/* Badge */}
                      {item.badge && (
                        <div className="absolute top-3 right-3 z-10">
                          <Badge variant="outline" className={`${colors.badge} text-[10px] font-medium`}>
                            {item.badge}
                          </Badge>
                        </div>
                      )}

                      <CardHeader className="flex flex-row items-start gap-3 pb-2">
                        {/* Icon Container */}
                        <div className={`relative p-3 rounded-xl ${colors.iconBg} border border-white/5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                          <IconComponent className={`h-6 w-6 ${colors.icon}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base sm:text-lg font-semibold leading-tight text-white group-hover:text-elec-yellow transition-colors duration-300 pr-16">
                            {item.title}
                          </CardTitle>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0 pb-4 px-4">
                        <p className="text-xs sm:text-sm text-white/70 mb-3 line-clamp-2">
                          {item.description}
                        </p>

                        {item.stats && item.stats.length > 0 && (
                          <div className="grid grid-cols-2 gap-2">
                            {item.stats.map((stat, index) => (
                              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                                <div className={`text-sm font-bold ${colors.icon}`}>{stat.value}</div>
                                <div className="text-[10px] text-white/60">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>

                      {/* Explore indicator */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className={`flex items-center gap-1 text-xs ${colors.icon}`}>
                          <span>Open</span>
                          <ChevronRight className="h-3 w-3" />
                        </div>
                      </div>

                      {/* Bottom accent line */}
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent ${colors.icon} opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Help Banner */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <Sparkles className="h-8 w-8 text-elec-yellow flex-shrink-0" />
              <div>
                <h4 className="font-medium text-white">Need more help?</h4>
                <p className="text-xs text-white/70">Check out mental health resources or explore career progression options</p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Link to="/apprentice/mental-health" className="flex-1 sm:flex-initial">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-elec-yellow/30 hover:border-elec-yellow/50"
                >
                  Mental Health
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link to="/apprentice/career-progression" className="flex-1 sm:flex-initial">
                <Button
                  variant="accent"
                  size="sm"
                  className="w-full"
                >
                  Career Paths
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprenticeToolbox;

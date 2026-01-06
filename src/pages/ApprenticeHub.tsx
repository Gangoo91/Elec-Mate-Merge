import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Heart,
  WrenchIcon,
  Settings,
  GraduationCap,
  Zap,
  CheckSquare,
  Calculator,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  BookOpen,
  Brain,
} from "lucide-react";

const ApprenticeHub = () => {
  // Featured AI Tools card
  const featuredCard = {
    title: "AI Study Assistant",
    description: "Get instant help with electrical theory, regulations, and exam preparation from our AI-powered assistant",
    icon: Sparkles,
    link: "/apprentice/advanced-help"
  };

  // Main 2x2 grid - 4 most essential tools
  const mainResources = [
    {
      id: 1,
      title: "Electrical Calculators",
      description: "Cable sizing, voltage drop, fault current and more",
      icon: Calculator,
      link: "/apprentice/calculators"
    },
    {
      id: 2,
      title: "Portfolio & OJT",
      description: "Track hours, log evidence, build your portfolio",
      icon: Clock,
      link: "/apprentice/ojt"
    },
    {
      id: 3,
      title: "Mental Health Hub",
      description: "Wellbeing resources, support networks and guidance",
      icon: Heart,
      link: "/apprentice/mental-health"
    },
    {
      id: 4,
      title: "Inspection & Testing",
      description: "Testing procedures, fault finding, regulations and quizzes",
      icon: CheckSquare,
      link: "/apprentice/inspection-testing-hub"
    }
  ];

  // Additional tools section
  const additionalResources = [
    {
      id: 5,
      title: "On the Job Tools",
      description: "Quick references for daily work",
      icon: Settings,
      link: "/apprentice/on-job-tools"
    },
    {
      id: 6,
      title: "Guidance Area",
      description: "Tips, guides and best practices",
      icon: WrenchIcon,
      link: "/apprentice/toolbox"
    },
    {
      id: 7,
      title: "Career Development",
      description: "Plan your progression pathway",
      icon: GraduationCap,
      link: "/apprentice/professional-development"
    },
    {
      id: 8,
      title: "Study Centre",
      description: "Training materials and quizzes",
      icon: BookOpen,
      link: "/study-centre/apprentice"
    }
  ];

  return (
    <div className="min-h-screen mobile-safe-area">
      <div className="space-y-8 md:space-y-10 animate-fade-in px-4 sm:px-6 pb-8 md:pb-12">
        {/* Header */}
        <div className="flex flex-col gap-4 pt-4 md:pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Apprentice Hub
            </h1>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto h-12 sm:h-10 text-base sm:text-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <p className="text-base text-muted-foreground max-w-2xl">
            Everything you need to succeed in your electrical apprenticeship
          </p>
        </div>

        {/* Featured AI Assistant Card */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="h-1 w-1 rounded-full bg-elec-yellow"></div>
            <h2 className="text-xl sm:text-2xl font-bold">AI-Powered Learning</h2>
          </div>
          <Link to={featuredCard.link} className="block focus:outline-none group touch-manipulation">
            <Card className="border-elec-yellow/30 hover:border-elec-yellow/50 active:scale-[0.98] relative">
              <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="flex flex-col items-center justify-center text-center py-6 px-4 relative">
                <div className="p-3 rounded-2xl bg-elec-yellow/10 mb-3 group-hover:bg-elec-yellow/20 transition-colors duration-300">
                  <Sparkles className="h-10 w-10 text-elec-yellow" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold mb-2">
                  {featuredCard.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                  {featuredCard.description}
                </p>
                <div className="flex items-center gap-2 mt-4 text-elec-yellow text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                  <span>Start Learning</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Essential Tools Grid */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 px-1">
            <div className="h-1 w-1 rounded-full bg-elec-yellow"></div>
            <h2 className="text-xl sm:text-2xl font-bold">Essential Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {mainResources.map((resource) => (
              <Link to={resource.link} key={resource.id} className="block focus:outline-none group touch-manipulation">
                <Card className="hover:bg-[#222222] hover:border-elec-yellow/40 active:scale-[0.97] h-full min-h-[140px]">
                  <CardHeader className="flex flex-row items-start gap-4 py-5 sm:py-6 px-4 sm:px-5">
                    <div className="p-2.5 rounded-lg bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors duration-300 flex-shrink-0">
                      <resource.icon className="h-7 w-7 sm:h-8 sm:w-8 text-elec-yellow" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg font-semibold leading-tight mb-1.5">
                        {resource.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {resource.description}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-elec-yellow group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 px-1">
            <div className="h-1 w-1 rounded-full bg-elec-yellow"></div>
            <h2 className="text-xl sm:text-2xl font-bold">More Resources</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {additionalResources.map((resource) => (
              <Link to={resource.link} key={resource.id} className="block focus:outline-none group touch-manipulation">
                <Card className="hover:bg-[#222222] hover:border-elec-yellow/40 active:scale-[0.97] h-full min-h-[120px] sm:min-h-[130px]">
                  <CardHeader className="flex flex-col items-center justify-center text-center py-4 sm:py-5 px-3">
                    <div className="p-2 rounded-lg bg-elec-yellow/10 mb-2 group-hover:bg-elec-yellow/20 transition-colors duration-300">
                      <resource.icon className="h-6 w-6 sm:h-7 sm:w-7 text-elec-yellow" />
                    </div>
                    <CardTitle className="text-sm sm:text-base font-semibold leading-tight mb-1">
                      {resource.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground line-clamp-2 hidden sm:block">
                      {resource.description}
                    </p>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprenticeHub;

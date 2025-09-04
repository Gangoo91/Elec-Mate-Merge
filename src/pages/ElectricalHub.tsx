
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Heart, Brain, GraduationCap, Briefcase, ArrowLeft, Calculator, Zap, MapPin, Shield, PoundSterling, Sparkles, TrendingUp, Clock, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ElectricalHub = () => {
  const isMobile = useIsMobile();

  // Main 2x2 grid - 4 most frequently used tools for daily electrical work
  const mainResources = [
    {
      id: 1,
      title: "Electrical Calculations",
      description: "Cable sizing, voltage drop & load calculations",
      icon: Calculator,
      link: "/electrician/calculations",
      isPopular: true,
      usage: "Daily"
    },
    {
      id: 2,
      title: "Inspection & Testing",
      description: "EICR forms, test schedules & certificates",
      icon: Zap,
      link: "/electrician/inspection-testing",
      isNew: false,
      usage: "Weekly"
    },
    {
      id: 3,
      title: "Install Planner",
      description: "Design circuits & plan installations",
      icon: MapPin,
      link: "/electrician/install-planner",
      isNew: true,
      usage: "Weekly"
    },
    {
      id: 4,
      title: "Site Safety & RAMS",
      description: "Risk assessments & method statements",
      icon: Shield,
      link: "/electrician/site-safety",
      isPopular: false,
      usage: "Per Job"
    }
  ];

  // Additional tools - business, development, and reference resources  
  const additionalResources = [
    {
      id: 5,
      title: "Business Hub",
      description: "Quotes, invoices & job management",
      icon: Briefcase,
      link: "/electrician/business",
      category: "Business"
    },
    {
      id: 6,
      title: "Live Pricing",
      description: "Real-time material prices & availability",
      icon: PoundSterling,
      link: "/electrician/live-pricing",
      category: "Tools",
      isTrending: true
    },
    {
      id: 7,
      title: "AI Tooling",
      description: "Smart assistance & automation tools",
      icon: Brain,
      link: "/electrician-tools/ai-tooling",
      category: "AI",
      isNew: true
    },
    {
      id: 8,
      title: "Industry Updates",
      description: "Latest news & regulation changes",
      icon: Wrench,
      link: "/electrician/safety-shares/news",
      category: "Resources"
    },
    {
      id: 9,
      title: "Mental Health Hub",
      description: "Support & wellbeing resources",
      icon: Heart,
      link: "/electrician/mental-health",
      category: "Wellness"
    },
    {
      id: 10,
      title: "Career Progression", 
      description: "Training courses & skill development",
      icon: GraduationCap,
      link: "/electrician/career-progression",
      category: "Development"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-dark to-elec-gray/20">
      <div className="space-y-8 animate-fade-in px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section with Enhanced Visual Design */}
        <div className="space-y-4 pt-6 md:pt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-elec-yellow bg-clip-text text-transparent">
                  Electrical Workshop
                </h1>
                <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 hidden sm:flex">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Pro Tools
                </Badge>
              </div>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
                Professional electrical tools and resources for qualified electricians. 
                BS 7671 compliant calculations, testing forms, and project management.
              </p>
            </div>
            <Link to="/dashboard" className="flex-shrink-0 w-full sm:w-auto">
              <Button variant="outline" size={isMobile ? "lg" : "default"} className="w-full sm:w-auto border-elec-yellow/30 hover:border-elec-yellow/50">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
            <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-3 text-center">
              <div className="text-elec-yellow font-bold text-lg">14</div>
              <div className="text-xs text-muted-foreground">Active Tools</div>
            </div>
            <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-3 text-center">
              <div className="text-elec-yellow font-bold text-lg">24/7</div>
              <div className="text-xs text-muted-foreground">Available</div>
            </div>
            <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-3 text-center">
              <div className="text-green-400 font-bold text-lg">Live</div>
              <div className="text-xs text-muted-foreground">Pricing Data</div>
            </div>
            <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-3 text-center">
              <div className="text-blue-400 font-bold text-lg">AI</div>
              <div className="text-xs text-muted-foreground">Powered</div>
            </div>
          </div>
        </div>

        {/* Main Tools Grid - Enhanced Design */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Zap className="h-5 w-5 text-elec-yellow" />
              Core Professional Tools
            </h2>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow bg-elec-yellow/10 hidden sm:flex">
              <TrendingUp className="h-3 w-3 mr-1" />
              Most Used
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {mainResources.map((resource) => (
              <Link to={resource.link} key={resource.id} className="group focus:outline-none">
                <Card className="relative border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-gray/70 backdrop-blur-sm h-full hover:border-elec-yellow/50 transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/10 group-hover:scale-[1.02]">
                  {/* Status Badges */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    {resource.isNew && (
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                        NEW
                      </Badge>
                    )}
                    {resource.isPopular && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        HOT
                      </Badge>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-elec-yellow/20 rounded-lg group-hover:bg-elec-yellow/30 transition-colors">
                        <resource.icon className="h-8 w-8 text-elec-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-bold text-white group-hover:text-elec-yellow transition-colors">
                          {resource.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground mt-1">
                          {resource.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Usage: {resource.usage}
                      </div>
                      <div className="text-elec-yellow text-sm font-medium group-hover:text-white transition-colors">
                        Open Tool →
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Additional Resources Section - Improved Layout */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-elec-yellow" />
              Business & Development
            </h2>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow bg-elec-yellow/10 hidden sm:flex">
              <Users className="h-3 w-3 mr-1" />
              6 Tools
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalResources.map((resource) => (
              <Link to={resource.link} key={resource.id} className="group focus:outline-none">
                <Card className="border-elec-yellow/20 bg-elec-gray/50 backdrop-blur-sm h-full hover:border-elec-yellow/50 transition-all duration-300 hover:shadow-lg hover:shadow-elec-yellow/5 group-hover:scale-[1.02]">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow bg-elec-yellow/10 text-xs">
                        {resource.category}
                      </Badge>
                      {resource.isNew && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                          NEW
                        </Badge>
                      )}
                      {resource.isTrending && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          HOT
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-elec-yellow/20 rounded-lg group-hover:bg-elec-yellow/30 transition-colors">
                        <resource.icon className="h-6 w-6 text-elec-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base font-semibold text-white group-hover:text-elec-yellow transition-colors leading-tight">
                          {resource.title}
                        </CardTitle>
                        <CardDescription className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {resource.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Call-to-Action */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/20 rounded-xl p-6 text-center">
          <h3 className="text-lg font-bold text-white mb-2">Need Something Specific?</h3>
          <p className="text-muted-foreground mb-4">
            Can't find the tool you need? Let us know what would help your workflow.
          </p>
          <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            Request New Tool
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ElectricalHub;

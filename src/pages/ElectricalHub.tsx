
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Heart, Brain, GraduationCap, Briefcase, ArrowLeft, Calculator, Zap, Shield, PoundSterling, Sparkles, FileText, Receipt, ArrowRight } from "lucide-react";

const ElectricalHub = () => {
  // Main 4-card grid - Core daily tools
  const mainResources = [
    {
      id: 1,
      title: "Inspection & Testing",
      icon: Zap,
      link: "/electrician/inspection-testing"
    },
    {
      id: 2,
      title: "AI Tooling",
      icon: Brain,
      link: "/electrician-tools/ai-tooling"
    },
    {
      id: 3,
      title: "Site Safety & RAMS",
      icon: Shield,
      link: "/electrician/site-safety"
    },
    {
      id: 4,
      title: "Electrical Calculations",
      icon: Calculator,
      link: "/electrician/calculations"
    }
  ];

  // Additional tools - business, development, and reference resources  
  const additionalResources = [
    {
      id: 5,
      title: "Quote Builder",
      icon: FileText,
      link: "/electrician/quote-builder"
    },
    {
      id: 6,
      title: "Invoices",
      icon: PoundSterling,
      link: "/electrician/invoices"
    },
    {
      id: 7,
      title: "Business Hub",
      icon: Briefcase,
      link: "/electrician/business"
    },
    {
      id: 8,
      title: "Live Pricing",
      icon: PoundSterling,
      link: "/electrician/live-pricing"
    },
    {
      id: 9,
      title: "Industry Updates",
      icon: Wrench,
      link: "/electrician/safety-shares/news"
    },
    {
      id: 10,
      title: "Career Progression", 
      icon: GraduationCap,
      link: "/electrician/career-progression"
    }
  ];

  return (
    <div className="min-h-screen mobile-safe-area">
      <div className="space-y-8 md:space-y-10 animate-fade-in px-4 sm:px-6 md:px-8 pb-8 md:pb-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 pt-4 md:pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Electrical Hub
            </h1>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto h-12 sm:h-10 text-base sm:text-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <p className="text-base text-muted-foreground max-w-2xl">
            Access all your electrical tools, calculators, and resources in one place
          </p>
        </div>

        {/* Featured AI Design Consultation */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="h-1 w-1 rounded-full bg-elec-yellow"></div>
            <h2 className="text-xl sm:text-2xl font-bold">AI-Powered Tools</h2>
          </div>
          <Link to="/electrician/agent-selector" className="block focus:outline-none group touch-manipulation">
            <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-gray to-elec-gray/50 hover:from-elec-gray/90 hover:to-elec-gray/60 hover:border-elec-yellow/50 transition-all duration-300 active:scale-[0.98] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="flex flex-col items-center justify-center text-center py-8 md:py-10 px-6 relative">
                <div className="p-4 rounded-2xl bg-elec-yellow/10 mb-4 group-hover:bg-elec-yellow/20 transition-colors duration-300">
                  <Sparkles className="h-12 w-12 sm:h-14 sm:w-14 text-elec-yellow" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold mb-2">
                  AI Design Consultation
                </CardTitle>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                  Choose from 8 specialist agents for design, costing, installation, safety, testing, and project management
                </p>
                <div className="flex items-center gap-2 mt-5 text-elec-yellow text-base font-semibold group-hover:gap-3 transition-all duration-300">
                  <span>Choose Your Agent</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Core Daily Tools */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 px-1">
            <div className="h-1 w-1 rounded-full bg-elec-yellow"></div>
            <h2 className="text-xl sm:text-2xl font-bold">Core Daily Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {mainResources.map((resource) => (
              <Link to={resource.link} key={resource.id} className="block focus:outline-none group touch-manipulation">
                <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300 active:scale-[0.97] h-full min-h-[140px] sm:min-h-[160px]">
                  <CardHeader className="flex flex-col items-center justify-center text-center py-8 sm:py-10 px-4">
                    <div className="p-3 rounded-xl bg-elec-yellow/10 mb-4 group-hover:bg-elec-yellow/20 transition-colors duration-300">
                      <resource.icon className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-semibold leading-tight">{resource.title}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Business & Development Resources */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 px-1">
            <div className="h-1 w-1 rounded-full bg-elec-yellow"></div>
            <h2 className="text-xl sm:text-2xl font-bold">Business & Development</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {additionalResources.map((resource) => (
              <Link to={resource.link} key={resource.id} className="block focus:outline-none group touch-manipulation">
                <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 hover:border-elec-yellow/40 transition-all duration-300 active:scale-[0.97] h-full min-h-[120px] sm:min-h-[140px]">
                  <CardHeader className="flex flex-col items-center justify-center text-center py-6 sm:py-8 px-4">
                    <div className="p-2.5 rounded-lg bg-elec-yellow/10 mb-3 group-hover:bg-elec-yellow/20 transition-colors duration-300">
                      <resource.icon className="h-8 w-8 sm:h-9 sm:w-9 text-elec-yellow" />
                    </div>
                    <CardTitle className="text-base sm:text-lg font-semibold leading-tight">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElectricalHub;

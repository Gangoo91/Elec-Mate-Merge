
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { TrendingUp, PoundSterling, Clock, Target, BarChart3, ArrowLeft, Calculator, Building, CheckCircle } from "lucide-react";
import BusinessPlanningTab from "./BusinessPlanningTab";
import LegalComplianceTab from "./LegalComplianceTab";
import SupportResourcesTab from "./SupportResourcesTab";
import SafeLink from "@/components/common/SafeLink";

const EnhancedStartupTabs = () => {
  const statCards = [
    {
      icon: PoundSterling,
      title: "Average Startup Cost",
      value: "£15,000-35,000 initial investment",
      color: "text-elec-yellow"
    },
    {
      icon: Clock,
      title: "Break-even Timeline", 
      value: "6-12 months with proper planning",
      color: "text-elec-yellow"
    },
    {
      icon: Target,
      title: "Market Success Rate",
      value: "85% survival with business plan",
      color: "text-green-400"
    },
    {
      icon: BarChart3,
      title: "Average Year 1 Revenue",
      value: "£8,000-15,000 in Year 1",
      color: "text-blue-400"
    }
  ];

  return (
    <div className="min-h-screen bg-background space-y-6 animate-fade-in pb-12">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
            <TrendingUp className="h-8 w-8 text-elec-yellow" />
            Starting an Electrical Business
          </h1>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto">
            Your complete guide to establishing and growing a successful electrical contracting business in the UK
          </p>
          <SafeLink to="/electrician/business-development">
            <Button variant="outline" className="gap-2 border-elec-yellow/20 hover:bg-elec-yellow/10">
              <ArrowLeft className="h-4 w-4" />
              Back to Business Development
            </Button>
          </SafeLink>
        </div>

        {/* Featured Stats Card */}
        <div className="bg-blue-950/50 border border-blue-500/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="h-6 w-6 text-blue-400" />
            <span className="text-white font-medium">Key Business Insights</span>
          </div>
          <p className="text-blue-100">
            Comprehensive business planning increases success rates by 300% and reduces time-to-profitability by 40%.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statCards.map((stat, index) => (
            <Card key={index} className="bg-card/30 backdrop-blur border border-white/10 hover:border-white/20 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  <h3 className="font-semibold text-white">{stat.title}</h3>
                </div>
                <p className="text-muted-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          <MobileAccordion type="single" collapsible className="space-y-4">
            <MobileAccordionItem value="business-planning" className="bg-card/30 backdrop-blur border border-elec-yellow/20 rounded-lg">
              <MobileAccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-elec-yellow" />
                  <span className="text-white font-medium">Business Planning</span>
                </div>
              </MobileAccordionTrigger>
              <MobileAccordionContent className="px-6 pb-6">
                <BusinessPlanningTab />
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="market-research" className="bg-card/30 backdrop-blur border border-blue-500/20 rounded-lg">
              <MobileAccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                  <span className="text-white font-medium">Market Research & Analysis</span>
                </div>
              </MobileAccordionTrigger>
              <MobileAccordionContent className="px-6 pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Understanding your local market is crucial for business success. Research competitors, identify target customers, and analyse demand for electrical services in your area.
                  </p>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="financial-planning" className="bg-card/30 backdrop-blur border border-green-500/20 rounded-lg">
              <MobileAccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <PoundSterling className="h-5 w-5 text-green-400" />
                  <span className="text-white font-medium">Financial Planning & Investment</span>
                </div>
              </MobileAccordionTrigger>
              <MobileAccordionContent className="px-6 pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Secure adequate funding, create detailed financial projections, and establish proper accounting systems to ensure financial stability and growth.
                  </p>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="legal-setup" className="bg-card/30 backdrop-blur border border-purple-500/20 rounded-lg">
              <MobileAccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-purple-400" />
                  <span className="text-white font-medium">Business Structure & Legal Setup</span>
                </div>
              </MobileAccordionTrigger>
              <MobileAccordionContent className="px-6 pb-6">
                <LegalComplianceTab />
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="checklist" className="bg-card/30 backdrop-blur border border-orange-500/20 rounded-lg">
              <MobileAccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-orange-400" />
                  <span className="text-white font-medium">Planning Checklist & Milestones</span>
                </div>
              </MobileAccordionTrigger>
              <MobileAccordionContent className="px-6 pb-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Track your progress with our comprehensive checklist covering all essential steps from initial planning to business launch and beyond.
                  </p>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          </MobileAccordion>
        </div>

        {/* Bottom Notice */}
        <div className="bg-green-950/50 border border-green-500/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <span className="text-green-100 font-medium">Remember</span>
          </div>
          <p className="text-green-200/80">
            Starting a business is a significant step that requires careful planning and preparation. 
            While the journey can be challenging, with the right guidance and resources, you can build 
            a successful electrical contracting business. Take your time, seek advice when needed, 
            and remember that every successful business started with a single step.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedStartupTabs;

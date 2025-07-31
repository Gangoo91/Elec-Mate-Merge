
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { Calculator, TrendingUp, BarChart3, Target, PoundSterling, Users, MapPin, Lightbulb, CheckCircle, Building } from "lucide-react";
import UKMarketIntelligence from "./UKMarketIntelligence";
import InteractiveFinancialPlanner from "./InteractiveFinancialPlanner";
import PracticalGuidance from "./PracticalGuidance";

const BusinessPlanningTab = () => {
  const planningSteps = [
    {
      title: "Market Research & Analysis",
      icon: <BarChart3 className="h-5 w-5" />,
      description: "Understand your local market and competition",
      points: [
        "Identify target customer segments (domestic, commercial, industrial)",
        "Research competitor pricing and service offerings",
        "Assess market demand and seasonal variations",
        "Understand local regulations and council requirements",
        "Analyse population demographics and housing types",
        "Identify gaps in the market you could fill"
      ],
      timeframe: "2-3 weeks"
    },
    {
      title: "Financial Planning & Projections",
      icon: <PoundSterling className="h-5 w-5" />,
      description: "Calculate startup costs and project future income",
      points: [
        "Estimate initial equipment and tool investments",
        "Calculate vehicle and transport requirements",
        "Budget for insurance, certifications, and legal costs",
        "Plan working capital for first 6 months",
        "Project monthly revenue targets",
        "Create break-even analysis and cash flow forecasts"
      ],
      timeframe: "1 week"
    },
    {
      title: "Location & Territory Planning",
      icon: <MapPin className="h-5 w-5" />,
      description: "Define your operating area and customer reach",
      points: [
        "Map your primary service area based on travel times",
        "Identify high-opportunity neighbourhoods",
        "Consider proximity to suppliers and trade counters",
        "Plan for workshop or storage space requirements",
        "Analyse local competition density",
        "Evaluate potential for business growth in the area"
      ],
      timeframe: "1 week"
    }
  ];

  const marketResearchTips = [
    {
      title: "Customer Demand Analysis",
      tips: [
        "Check local property development and renovation activity",
        "Monitor planning applications for new builds",
        "Research average household income in target areas",
        "Identify areas with older housing requiring rewiring"
      ]
    },
    {
      title: "Competition Assessment",
      tips: [
        "Map existing electrical contractors in your area",
        "Check their Google reviews and service offerings",
        "Compare their pricing on common services",
        "Identify what they're missing that you could provide"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Calculator className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Comprehensive business planning toolkit for UK electrical contractors. Follow the step-by-step process below to build a successful electrical business.
        </AlertDescription>
      </Alert>

      <MobileAccordion type="single" collapsible className="space-y-4">
        
        {/* Market Research & Intelligence */}
        <MobileAccordionItem value="market-research">
          <MobileAccordionTrigger 
            icon={<BarChart3 className="h-5 w-5 text-blue-400" />}
            className="border-blue-500/50 bg-blue-500/10 text-blue-300"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold">Market Research & Intelligence</span>
              <span className="text-xs text-blue-200">Understand your market and opportunities</span>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Start here to understand the UK electrical market, pricing opportunities, and regional variations that will inform your business strategy.
              </div>
              <UKMarketIntelligence />
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Financial Planning */}
        <MobileAccordionItem value="financial-planning">
          <MobileAccordionTrigger 
            icon={<PoundSterling className="h-5 w-5 text-green-400" />}
            className="border-green-500/50 bg-green-500/10 text-green-300"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold">Financial Planning & Projections</span>
              <span className="text-xs text-green-200">Calculate costs and revenue projections</span>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Use our interactive tools to calculate startup costs, project revenues, and plan your financial strategy.
              </div>
              <InteractiveFinancialPlanner />
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Legal & Operational Setup */}
        <MobileAccordionItem value="legal-operational">
          <MobileAccordionTrigger 
            icon={<CheckCircle className="h-5 w-5 text-indigo-400" />}
            className="border-indigo-500/50 bg-indigo-500/10 text-indigo-300"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold">Legal & Operational Setup</span>
              <span className="text-xs text-indigo-200">Step-by-step business setup guides</span>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Complete guides for setting up your business legally and operationally, from certifications to systems.
              </div>
              <PracticalGuidance />
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Customer Acquisition Strategy */}
        <MobileAccordionItem value="customer-strategy">
          <MobileAccordionTrigger 
            icon={<Users className="h-5 w-5 text-purple-400" />}
            className="border-purple-500/50 bg-purple-500/10 text-purple-300"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold">Customer Acquisition Strategy</span>
              <span className="text-xs text-purple-200">Research and marketing guidance</span>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Learn how to research your local market and develop effective customer acquisition strategies.
              </div>
              <div className="space-y-4">
                {marketResearchTips.map((section, index) => (
                  <Card key={index} className="border-purple-500/30 bg-purple-500/5">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-purple-300 flex items-center gap-2 text-base">
                        <Lightbulb className="h-4 w-4" />
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {section.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2 text-sm text-purple-200 p-3 rounded-lg bg-purple-500/10">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Planning Checklist */}
        <MobileAccordionItem value="planning-checklist">
          <MobileAccordionTrigger 
            icon={<Target className="h-5 w-5 text-orange-400" />}
            className="border-orange-500/50 bg-orange-500/10 text-orange-300"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold">Planning Checklist & Milestones</span>
              <span className="text-xs text-orange-200">Track your progress and set goals</span>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="space-y-6">
              <div className="text-sm text-muted-foreground mb-4">
                Use this checklist to ensure you've covered all essential planning tasks and set measurable success metrics.
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-orange-200 mb-4 text-base flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Essential Planning Tasks
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "Complete market research in target area",
                      "Define service offerings and pricing",
                      "Calculate startup and running costs",
                      "Identify target customer segments",
                      "Plan marketing and customer acquisition",
                      "Set revenue and growth targets"
                    ].map((task, index) => (
                      <li key={index} className="flex items-start gap-3 text-orange-200 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="h-2 w-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="leading-relaxed text-sm">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-200 mb-4 text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Success Metrics
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "Monthly revenue targets",
                      "Customer acquisition goals", 
                      "Profit margin objectives",
                      "Market share aspirations",
                      "Service quality benchmarks",
                      "Business growth milestones"
                    ].map((metric, index) => (
                      <li key={index} className="flex items-start gap-3 text-orange-200 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="h-2 w-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="leading-relaxed text-sm">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

      </MobileAccordion>
    </div>
  );
};

export default BusinessPlanningTab;

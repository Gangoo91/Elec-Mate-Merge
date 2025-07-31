
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, TrendingUp, BarChart3, Target, PoundSterling, Users, MapPin, Lightbulb } from "lucide-react";
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
          Comprehensive business planning toolkit for UK electrical contractors. Use these interactive tools and resources to build a successful electrical business.
        </AlertDescription>
      </Alert>

      <UKMarketIntelligence />

      <InteractiveFinancialPlanner />

      <PracticalGuidance />

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Step-by-Step Implementation Guides
          </CardTitle>
          <p className="text-blue-200 text-sm">
            Detailed, actionable guides for every aspect of starting your electrical business
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {planningSteps.map((step, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray w-full">
                <CardHeader className="pb-4">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-3">
                      {step.icon}
                      <h3 className="text-lg md:text-xl font-semibold text-elec-yellow">{step.title}</h3>
                    </div>
                    <Badge variant="outline" className="text-xs self-start px-3 py-1">
                      {step.timeframe}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm md:text-base">{step.description}</p>
                  <div className="space-y-4">
                    {step.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-3 text-sm text-muted-foreground p-4 rounded-lg bg-elec-dark/30 w-full">
                        <Badge variant="outline" className="mt-1 h-2 w-2 rounded-full p-0 border-elec-yellow/50 bg-elec-yellow/20 flex-shrink-0" />
                        <span className="leading-relaxed flex-1">{point}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {marketResearchTips.map((section, index) => (
          <Card key={index} className="border-purple-500/50 bg-purple-500/10 w-full">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center gap-2 text-base md:text-lg">
                <Users className="h-5 w-5" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {section.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start gap-3 text-sm text-purple-200 p-4 rounded-lg bg-purple-500/5 w-full">
                    <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed flex-1">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Planning Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="w-full">
              <h4 className="font-semibold text-green-200 mb-6 text-base md:text-lg">Essential Planning Tasks</h4>
              <ul className="space-y-4 text-sm">
                {[
                  "Complete market research in target area",
                  "Define service offerings and pricing",
                  "Calculate startup and running costs",
                  "Identify target customer segments",
                  "Plan marketing and customer acquisition",
                  "Set revenue and growth targets"
                ].map((task, index) => (
                  <li key={index} className="flex items-start gap-3 text-green-200 p-4 rounded-lg bg-green-500/5 w-full">
                    <div className="h-2 w-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="leading-relaxed flex-1">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <h4 className="font-semibold text-green-200 mb-6 text-base md:text-lg">Success Metrics</h4>
              <ul className="space-y-4 text-sm">
                {[
                  "Monthly revenue targets",
                  "Customer acquisition goals",
                  "Profit margin objectives",
                  "Market share aspirations",
                  "Service quality benchmarks",
                  "Business growth milestones"
                ].map((metric, index) => (
                  <li key={index} className="flex items-start gap-3 text-green-200 p-4 rounded-lg bg-green-500/5 w-full">
                    <div className="h-2 w-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="leading-relaxed flex-1">{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessPlanningTab;

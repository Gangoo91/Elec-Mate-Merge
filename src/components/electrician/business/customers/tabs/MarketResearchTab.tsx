import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Search, Users, MapPin, TrendingUp, Target, BarChart3, Eye, Building, PoundSterling } from "lucide-react";

const MarketResearchTab = () => {
  const isMobile = useIsMobile();

  const marketMetrics = [
    {
      metric: "Market Penetration Rate",
      data: "5-15% of local market addressable",
      icon: <Target className="h-5 w-5 text-blue-400" />,
      detail: "Realistic market share for local electrical contractors"
    },
    {
      metric: "Customer Acquisition Cost",
      data: "£25-75 per customer acquired",
      icon: <PoundSterling className="h-5 w-5 text-green-400" />,
      detail: "Average investment needed to gain new customers"
    },
    {
      metric: "Local Competition Density",
      data: "3-8 competitors per 10k population",
      icon: <BarChart3 className="h-5 w-5 text-orange-400" />,
      detail: "Typical electrical contractor density in UK markets"
    },
    {
      metric: "Market Growth Potential",
      data: "12-18% annual market expansion",
      icon: <TrendingUp className="h-5 w-5 text-purple-400" />,
      detail: "Expected growth in electrical services demand"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-blue-400/50 bg-blue-400/10">
        <Search className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-400">
          Thorough market research can increase customer acquisition efficiency by 200-300% and reduce marketing spend by up to 40%.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {marketMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
            <div className="text-center space-y-2">
              {metric.icon}
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-white`}>{metric.metric}</div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{metric.data}</div>
            </div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        <MobileAccordionItem value="overview">
          <MobileAccordionTrigger icon={<Search className="h-5 w-5 text-blue-400" />}>
            Market Research Overview
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Understanding your market is the foundation of successful customer acquisition. Research helps identify opportunities, understand customer needs, and position your electrical services effectively in the local market.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Market Research Benefits</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Identify underserved market segments</li>
                    <li>• Understand local customer preferences</li>
                    <li>• Assess competitor strengths and weaknesses</li>
                    <li>• Determine optimal pricing strategies</li>
                    <li>• Plan effective marketing campaigns</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Key Research Areas</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Demographic analysis of service areas</li>
                    <li>• Property types and electrical needs</li>
                    <li>• Seasonal demand patterns</li>
                    <li>• Customer pain points and preferences</li>
                    <li>• Local regulatory requirements</li>
                  </ul>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
        
        <MobileAccordionItem value="demographics">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-green-400" />}>
            Customer Demographics
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Understanding your customer demographics helps target the right audience with appropriate messaging and services.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Residential Customers</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Homeowners aged 35-65</li>
                    <li>• Properties 15+ years old</li>
                    <li>• Household income £35k+</li>
                    <li>• Safety and reliability focused</li>
                    <li>• Prefer established contractors</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Commercial Clients</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Small to medium businesses</li>
                    <li>• Retail and office premises</li>
                    <li>• Compliance and efficiency driven</li>
                    <li>• Budget-conscious with quality focus</li>
                    <li>• Ongoing maintenance requirements</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Property Managers</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Landlords with multiple properties</li>
                    <li>• Property management companies</li>
                    <li>• Compliance and cost efficiency</li>
                    <li>• Regular maintenance contracts</li>
                    <li>• Emergency response capability</li>
                  </ul>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
        
        <MobileAccordionItem value="competition">
          <MobileAccordionTrigger icon={<BarChart3 className="h-5 w-5 text-orange-400" />}>
            Competition Analysis
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="text-sm text-muted-foreground">
                Analysing your competition helps identify gaps in the market and opportunities to differentiate your electrical services.
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Competitor Research Methods</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Google search for local electricians</li>
                    <li>• Check trade website listings</li>
                    <li>• Read customer reviews and ratings</li>
                    <li>• Analyse competitor websites and services</li>
                    <li>• Monitor social media presence</li>
                    <li>• Mystery shopping competitor quotes</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Key Evaluation Criteria</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Service range and specialisations</li>
                    <li>• Pricing structures and value propositions</li>
                    <li>• Customer service quality and responsiveness</li>
                    <li>• Online presence and marketing effectiveness</li>
                    <li>• Certifications and professional credentials</li>
                    <li>• Geographic coverage and availability</li>
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

export default MarketResearchTab;
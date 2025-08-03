import { Badge } from "@/components/ui/badge";
import { Search, Users, MapPin, TrendingUp, Target, BarChart3, Eye } from "lucide-react";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";

const MarketResearchTab = () => {
  return (
    <div className="space-y-4">
      <MobileAccordion type="multiple" className="space-y-4">
        {/* Market Research Overview */}
        <MobileAccordionItem value="overview" className="bg-card border border-elec-yellow/20 rounded-lg overflow-hidden">
          <MobileAccordionTrigger
            icon={<Search className="h-6 w-6 text-elec-yellow" />}
            className="bg-card border-b border-elec-yellow/20"
          >
            Market Research & Targeting
          </MobileAccordionTrigger>
          <MobileAccordionContent className="bg-card/50 backdrop-blur border-0">
            <div className="p-6 space-y-4">
              <p className="text-muted-foreground">
                Understanding your local market, competitors, and target customers is essential for developing effective customer acquisition strategies.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center space-y-2">
                  <Users className="h-8 w-8 text-elec-yellow mx-auto" />
                  <h4 className="font-semibold">Demographics</h4>
                  <p className="text-xs text-muted-foreground">Know your customers</p>
                </div>
                <div className="text-center space-y-2">
                  <MapPin className="h-8 w-8 text-elec-yellow mx-auto" />
                  <h4 className="font-semibold">Geographic Area</h4>
                  <p className="text-xs text-muted-foreground">Service boundaries</p>
                </div>
                <div className="text-center space-y-2">
                  <Eye className="h-8 w-8 text-elec-yellow mx-auto" />
                  <h4 className="font-semibold">Competition</h4>
                  <p className="text-xs text-muted-foreground">Competitor analysis</p>
                </div>
                <div className="text-center space-y-2">
                  <TrendingUp className="h-8 w-8 text-elec-yellow mx-auto" />
                  <h4 className="font-semibold">Demand Patterns</h4>
                  <p className="text-xs text-muted-foreground">Market trends</p>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Target Customer Segments */}
        <MobileAccordionItem value="segments" className="bg-card border border-elec-yellow/20 rounded-lg overflow-hidden">
          <MobileAccordionTrigger
            icon={<Users className="h-6 w-6 text-elec-yellow" />}
            className="bg-card border-b border-elec-yellow/20"
          >
            Target Customer Segments
          </MobileAccordionTrigger>
          <MobileAccordionContent className="bg-card/50 backdrop-blur border-0">
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Residential Customers</h4>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="mr-2 mb-1">Homeowners</Badge>
                    <Badge variant="secondary" className="mr-2 mb-1">Landlords</Badge>
                    <Badge variant="secondary" className="mr-2 mb-1">Property Developers</Badge>
                    <Badge variant="secondary" className="mr-2 mb-1">Estate Agents</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Focus on safety, reliability, and competitive pricing. Emphasise certifications and insurance coverage.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Commercial Customers</h4>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="mr-2 mb-1">Small Businesses</Badge>
                    <Badge variant="secondary" className="mr-2 mb-1">Retail Shops</Badge>
                    <Badge variant="secondary" className="mr-2 mb-1">Offices</Badge>
                    <Badge variant="secondary" className="mr-2 mb-1">Restaurants</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Highlight maintenance contracts, emergency response, and minimal business disruption.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-elec-yellow">Industrial Customers</h4>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="mr-2 mb-1">Factories</Badge>
                    <Badge variant="secondary" className="mr-2 mb-1">Warehouses</Badge>
                    <Badge variant="secondary" className="mr-2 mb-1">Data Centres</Badge>
                    <Badge variant="secondary" className="mr-2 mb-1">Hospitals</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Emphasise 24/7 availability, specialised expertise, and compliance with industry standards.
                  </p>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Market Analysis Framework */}
        <MobileAccordionItem value="analysis" className="bg-card border border-elec-yellow/20 rounded-lg overflow-hidden">
          <MobileAccordionTrigger
            icon={<BarChart3 className="h-6 w-6 text-elec-yellow" />}
            className="bg-card border-b border-elec-yellow/20"
          >
            Market Analysis Framework
          </MobileAccordionTrigger>
          <MobileAccordionContent className="bg-card/50 backdrop-blur border-0">
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-elec-yellow">SWOT Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded">
                    <h5 className="font-medium text-green-600 mb-2">Strengths</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Qualified electricians</li>
                      <li>• Local knowledge</li>
                      <li>• Competitive pricing</li>
                      <li>• Customer relationships</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded">
                    <h5 className="font-medium text-red-600 mb-2">Weaknesses</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Limited marketing budget</li>
                      <li>• Small team capacity</li>
                      <li>• Brand recognition</li>
                      <li>• Online presence</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded">
                    <h5 className="font-medium text-blue-600 mb-2">Opportunities</h5>
                    <ul className="text-sm space-y-1">
                      <li>• EV charging installations</li>
                      <li>• Smart home technology</li>
                      <li>• Energy efficiency upgrades</li>
                      <li>• New housing developments</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded">
                    <h5 className="font-medium text-orange-600 mb-2">Threats</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Large competitor entry</li>
                      <li>• Economic downturn</li>
                      <li>• Regulatory changes</li>
                      <li>• Skills shortage</li>
                    </ul>
                  </div>
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

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { Target, Users, MapPin, TrendingUp, Search, BarChart3, Lightbulb, AlertCircle } from "lucide-react";

const MarketResearchCard = () => {
  return (
    <div className="space-y-6">
      {/* Introduction Alert */}
      <Alert className="border-elec-yellow/20 bg-elec-card">
        <AlertCircle className="h-4 w-4 text-elec-yellow" />
        <AlertTitle className="text-elec-yellow">Critical Success Factor</AlertTitle>
        <AlertDescription>
          Successful electrical contractors spend 10-15% of their time on market research. Understanding your local market 
          and ideal customers is the foundation of sustainable business growth.
        </AlertDescription>
      </Alert>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
            <h3 className="font-semibold text-lg">3-5 Customer Types</h3>
            <p className="text-sm text-muted-foreground">Focus on specific segments</p>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="p-4 text-center">
            <MapPin className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
            <h3 className="font-semibold text-lg">5-10 Mile Radius</h3>
            <p className="text-sm text-muted-foreground">Optimal service area</p>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
            <h3 className="font-semibold text-lg">£45-85/hour</h3>
            <p className="text-sm text-muted-foreground">UK market rate range</p>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Accordions */}
      <MobileAccordion type="single" collapsible className="space-y-4">
        
        {/* Market Analysis */}
        <MobileAccordionItem value="market-analysis">
          <MobileAccordionTrigger 
            icon={<Search className="h-5 w-5 text-elec-yellow" />}
            className="bg-elec-card border-elec-yellow/20"
          >
            <span>Local Market Analysis</span>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Card className="border-t-0 rounded-t-none border-elec-yellow/20 bg-elec-card">
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">
                  Understanding your local electrical services market is crucial for positioning your business effectively.
                </p>
                
                <div className="space-y-3">
                  <div className="border-l-4 border-elec-yellow pl-4">
                    <h4 className="font-semibold mb-2">Demographic Research</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Use ONS data to identify household income levels in your area</li>
                      <li>• Research new housing developments and renovation activity</li>
                      <li>• Identify commercial and industrial growth areas</li>
                      <li>• Map out areas with older housing stock (more electrical work needed)</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-elec-yellow pl-4">
                    <h4 className="font-semibold mb-2">Seasonal Patterns</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Spring/Summer: Outdoor lighting, garden electrical work</li>
                      <li>• Autumn: Heating system preparations, safety checks</li>
                      <li>• Winter: Emergency callouts, indoor renovations</li>
                      <li>• Year-round: PAT testing, commercial maintenance contracts</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Customer Personas */}
        <MobileAccordionItem value="customer-personas">
          <MobileAccordionTrigger 
            icon={<Users className="h-5 w-5 text-elec-yellow" />}
            className="bg-elec-card border-elec-yellow/20"
          >
            <span>Customer Personas & Targeting</span>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Card className="border-t-0 rounded-t-none border-elec-yellow/20 bg-elec-card">
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">
                  Develop detailed profiles of your ideal customers to focus your marketing efforts effectively.
                </p>
                
                <div className="grid gap-4">
                  <div className="bg-elec-gray/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="gold">Primary</Badge>
                      <h4 className="font-semibold">Homeowners (25-55 years)</h4>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Income: £35,000-£80,000</li>
                      <li>• Property: Own their home, value: £200k-£600k</li>
                      <li>• Needs: Renovations, upgrades, safety improvements</li>
                      <li>• Decision factors: Quality, reliability, local reputation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-elec-gray/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="yellow">Secondary</Badge>
                      <h4 className="font-semibold">Landlords & Property Managers</h4>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Portfolio: 2-20+ properties</li>
                      <li>• Needs: Maintenance, safety certificates, quick response</li>
                      <li>• Decision factors: Cost efficiency, availability, compliance</li>
                      <li>• Opportunity: Ongoing contracts, multiple properties</li>
                    </ul>
                  </div>
                  
                  <div className="bg-elec-gray/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="success">Tertiary</Badge>
                      <h4 className="font-semibold">Small Businesses</h4>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Size: 1-50 employees</li>
                      <li>• Needs: Installation, maintenance, emergency response</li>
                      <li>• Decision factors: Minimal downtime, competitive pricing</li>
                      <li>• Opportunity: Regular maintenance contracts, upgrades</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Competitor Analysis */}
        <MobileAccordionItem value="competitor-analysis">
          <MobileAccordionTrigger 
            icon={<BarChart3 className="h-5 w-5 text-elec-yellow" />}
            className="bg-elec-card border-elec-yellow/20"
          >
            <span>Competitor Analysis</span>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Card className="border-t-0 rounded-t-none border-elec-yellow/20 bg-elec-card">
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">
                  Understand your competition to identify opportunities and differentiate your services.
                </p>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-elec-yellow pl-4">
                    <h4 className="font-semibold mb-2">Research Methods</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Google Maps search for "electrician near me"</li>
                      <li>• Check their websites, services offered, and pricing</li>
                      <li>• Read Google, Trustpilot, and Checkatrade reviews</li>
                      <li>• Analyse their social media presence and engagement</li>
                      <li>• Mystery shop their quote process</li>
                    </ul>
                  </div>
                  
                  <div className="bg-elec-gray/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Key Areas to Compare</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <h5 className="font-medium text-elec-yellow mb-1">Service Offerings</h5>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• Domestic vs commercial focus</li>
                          <li>• Emergency response times</li>
                          <li>• Speciality services offered</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-elec-yellow mb-1">Market Position</h5>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• Pricing structure (hourly/fixed)</li>
                          <li>• Geographic coverage area</li>
                          <li>• Brand reputation and reviews</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Market Opportunities */}
        <MobileAccordionItem value="market-opportunities">
          <MobileAccordionTrigger 
            icon={<Lightbulb className="h-5 w-5 text-elec-yellow" />}
            className="bg-elec-card border-elec-yellow/20"
          >
            <span>Market Opportunities & Niches</span>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Card className="border-t-0 rounded-t-none border-elec-yellow/20 bg-elec-card">
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">
                  Identify and target underserved market segments to establish a competitive advantage.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-elec-gray/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 text-elec-yellow">High-Growth Opportunities</h4>
                    <div className="grid gap-3">
                      <div className="border-l-2 border-green-500 pl-3">
                        <h5 className="font-medium">Smart Home Technology</h5>
                        <p className="text-sm text-muted-foreground">
                          Growing demand for home automation, smart lighting, and integrated systems.
                        </p>
                      </div>
                      <div className="border-l-2 border-blue-500 pl-3">
                        <h5 className="font-medium">EV Charging Installations</h5>
                        <p className="text-sm text-muted-foreground">
                          Rapidly expanding market as electric vehicle adoption increases.
                        </p>
                      </div>
                      <div className="border-l-2 border-purple-500 pl-3">
                        <h5 className="font-medium">Energy Efficiency Upgrades</h5>
                        <p className="text-sm text-muted-foreground">
                          LED conversions, efficient heating systems, and renewable energy integration.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-elec-yellow pl-4">
                    <h4 className="font-semibold mb-2">Market Gap Analysis</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Look for services no local competitors offer</li>
                      <li>• Identify complaints in competitor reviews as opportunities</li>
                      <li>• Consider 24/7 emergency services if not widely available</li>
                      <li>• Explore partnerships with builders, architects, or property developers</li>
                      <li>• Consider female-friendly services for safety-conscious customers</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MobileAccordionContent>
        </MobileAccordionItem>

      </MobileAccordion>
    </div>
  );
};

export default MarketResearchCard;

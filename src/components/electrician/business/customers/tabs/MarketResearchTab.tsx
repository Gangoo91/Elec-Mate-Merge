import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Users, MapPin, TrendingUp, Target, BarChart3, Eye, ChevronDown, Building2, Home, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const MarketResearchTab = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  // Function to get tab display name
  const getTabDisplayName = (tabValue: string) => {
    switch (tabValue) {
      case "overview": return "Market Overview";
      case "segments": return "Customer Segments";
      case "analysis": return "Market Analysis";
      case "competition": return "Competitor Research";
      case "targeting": return "Targeting Strategy";
      default: return tabValue;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6">
      <div className="text-center space-y-4 px-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Market Research & Targeting</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          Understanding your local market, competitors, and target customers is essential for developing effective customer acquisition strategies.
        </p>
      </div>

      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-blue-500/10 mb-6">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-6 w-6" />
            UK Electrical Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 bg-elec-dark/50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-2">£15B</div>
              <div className="text-xs sm:text-sm text-muted-foreground">UK electrical services market value</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-elec-dark/50 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-green-400 mb-2">180,000</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Registered electrical contractors</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-elec-dark/50 rounded-lg sm:col-span-2 lg:col-span-1">
              <div className="text-xl sm:text-2xl font-bold text-purple-400 mb-2">12%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Annual market growth rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        {isMobile ? (
          <div className="mb-4 bg-elec-dark rounded-md p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-between bg-transparent text-white">
                  {getTabDisplayName(activeTab)}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-full min-w-[300px] bg-elec-dark border-elec-gray/40 z-50 shadow-lg">
                <DropdownMenuItem onClick={() => setActiveTab("overview")} className="justify-center">
                  <Search className="h-4 w-4 mr-2" />
                  Market Overview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("segments")} className="justify-center">
                  <Users className="h-4 w-4 mr-2" />
                  Customer Segments
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("analysis")} className="justify-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Market Analysis
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("competition")} className="justify-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Competitor Research
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("targeting")} className="justify-center">
                  <Target className="h-4 w-4 mr-2" />
                  Targeting Strategy
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <TabsList className="mb-4 bg-elec-dark w-full grid grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-1 text-xs lg:text-sm">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="segments" className="flex items-center gap-1 text-xs lg:text-sm">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Segments</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-1 text-xs lg:text-sm">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="competition" className="flex items-center gap-1 text-xs lg:text-sm">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Competition</span>
            </TabsTrigger>
            <TabsTrigger value="targeting" className="flex items-center gap-1 text-xs lg:text-sm">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Targeting</span>
            </TabsTrigger>
          </TabsList>
        )}
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-elec-yellow" />
                Market Research Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="segments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-elec-yellow" />
                Target Customer Segments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-elec-yellow" />
                    <h4 className="font-semibold text-elec-yellow">Residential Customers</h4>
                  </div>
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
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-elec-yellow" />
                    <h4 className="font-semibold text-elec-yellow">Commercial Customers</h4>
                  </div>
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
                  <div className="flex items-center gap-2">
                    <Factory className="h-5 w-5 text-elec-yellow" />
                    <h4 className="font-semibold text-elec-yellow">Industrial Customers</h4>
                  </div>
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
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-elec-yellow" />
                Market Analysis Framework
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-elec-yellow">SWOT Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-elec-yellow/10 border border-elec-yellow/20 rounded">
                      <h5 className="font-medium text-elec-yellow mb-2">Strengths</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Qualified electricians</li>
                        <li>• Local knowledge</li>
                        <li>• Competitive pricing</li>
                        <li>• Customer relationships</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-elec-yellow/10 border border-elec-yellow/20 rounded">
                      <h5 className="font-medium text-elec-yellow mb-2">Weaknesses</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Limited marketing budget</li>
                        <li>• Small team capacity</li>
                        <li>• Brand recognition</li>
                        <li>• Online presence</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-elec-yellow/10 border border-elec-yellow/20 rounded">
                      <h5 className="font-medium text-elec-yellow mb-2">Opportunities</h5>
                      <ul className="text-sm space-y-1">
                        <li>• EV charging installations</li>
                        <li>• Smart home technology</li>
                        <li>• Energy efficiency upgrades</li>
                        <li>• New housing developments</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-elec-yellow/10 border border-elec-yellow/20 rounded">
                      <h5 className="font-medium text-elec-yellow mb-2">Threats</h5>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competition">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-elec-yellow" />
                Competitor Research
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Analysing your competition helps identify market gaps and positioning opportunities.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-elec-yellow">Research Areas</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Service offerings and specialities</li>
                      <li>• Pricing structures and strategies</li>
                      <li>• Marketing channels and messaging</li>
                      <li>• Customer reviews and feedback</li>
                      <li>• Online presence and SEO ranking</li>
                      <li>• Geographic coverage areas</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-elec-yellow">Analysis Tools</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Google Maps competitor listings</li>
                      <li>• Social media monitoring</li>
                      <li>• Website analysis tools</li>
                      <li>• Industry directories</li>
                      <li>• Customer surveys</li>
                      <li>• Local networking events</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targeting">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-elec-yellow" />
                Targeting Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Develop focused targeting strategies to maximise your marketing ROI and customer acquisition efficiency.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-elec-yellow">Geographic Targeting</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Define service radius (typically 20-30 miles)</li>
                      <li>• Focus on high-density residential areas</li>
                      <li>• Target new developments and business parks</li>
                      <li>• Consider travel time and fuel costs</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-elec-yellow">Demographic Targeting</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Age groups most likely to renovate</li>
                      <li>• Income levels for different services</li>
                      <li>• Property types and ownership status</li>
                      <li>• Seasonal demand patterns</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Market Research Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Effective market research is ongoing. Use these resources to stay informed about market trends, 
            competitor activities, and customer preferences in your local area.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button variant="outline" size="sm" className="border-elec-yellow/30 w-full sm:w-auto">
              Google Analytics
            </Button>
            <Button variant="outline" size="sm" className="border-blue-500/30 w-full sm:w-auto">
              Local Business Networks
            </Button>
            <Button variant="outline" size="sm" className="border-green-500/30 w-full sm:w-auto">
              Industry Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketResearchTab;
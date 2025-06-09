
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, CheckCircle, Battery, Zap, ArrowLeft, TrendingUp } from "lucide-react";

interface PowerToolsGuideProps {
  onBack: () => void;
}

const PowerToolsGuide = ({ onBack }: PowerToolsGuideProps) => {
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");

  const priorities = [
    { id: "versatility", label: "Versatility", description: "Tools that handle multiple tasks" },
    { id: "power", label: "Power", description: "Maximum performance for heavy work" },
    { id: "portability", label: "Portability", description: "Lightweight and compact tools" },
    { id: "battery", label: "Battery Life", description: "Long-lasting cordless operation" }
  ];

  const budgetRanges = [
    { id: "starter", label: "Starter Kit (£200-400)", description: "Essential tools for apprentices" },
    { id: "professional", label: "Professional (£400-800)", description: "Quality tools for daily use" },
    { id: "premium", label: "Premium (£800+)", description: "Top-tier professional equipment" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Guides
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-elec-yellow">Power Tools for Electricians Guide</h1>
          <p className="text-muted-foreground">Build your perfect toolkit step by step</p>
        </div>
      </div>

      <Tabs defaultValue="priority" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-elec-gray/50">
          <TabsTrigger value="priority">Priority List</TabsTrigger>
          <TabsTrigger value="brands">Brand Guide</TabsTrigger>
          <TabsTrigger value="cordless">Cordless vs Corded</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="priority" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow">Essential Power Tools Priority List</CardTitle>
              <p className="text-muted-foreground">Build your toolkit in the right order</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    priority: 1, 
                    tool: "Cordless Drill/Driver", 
                    price: "£80-200", 
                    reason: "Most used tool - drilling holes and driving screws",
                    recommendation: "DeWalt DCD796 or Makita DHP484"
                  },
                  { 
                    priority: 2, 
                    tool: "SDS Drill", 
                    price: "£120-300", 
                    reason: "Essential for masonry work and cable routing",
                    recommendation: "Bosch GBH 2-28 F or DeWalt DCH273"
                  },
                  { 
                    priority: 3, 
                    tool: "Angle Grinder", 
                    price: "£60-150", 
                    reason: "Cutting trunking, conduit, and metalwork",
                    recommendation: "Makita GA9020 or Bosch GWS 7-115"
                  },
                  { 
                    priority: 4, 
                    tool: "Reciprocating Saw", 
                    price: "£100-250", 
                    reason: "Versatile cutting tool for various materials",
                    recommendation: "Milwaukee M18 FSX or DeWalt DCS388"
                  },
                  { 
                    priority: 5, 
                    tool: "Multi-tool", 
                    price: "£80-200", 
                    reason: "Precision cutting and detail work",
                    recommendation: "Fein MultiMaster or Bosch GOP"
                  }
                ].map((item, index) => (
                  <Card key={index} className="border-elec-yellow/20 bg-elec-dark/30">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-elec-yellow text-black font-bold text-lg px-3 py-1">
                            #{item.priority}
                          </Badge>
                          <div>
                            <h3 className="font-bold text-white text-lg">{item.tool}</h3>
                            <p className="text-elec-yellow font-medium">{item.price}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-2">{item.reason}</p>
                      <p className="text-sm text-green-400">
                        <strong>Recommended:</strong> {item.recommendation}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="brands" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                brand: "DeWalt",
                rating: 4.8,
                strengths: ["Durability", "Power", "Professional grade"],
                weaknesses: ["Price", "Weight"],
                bestFor: "Heavy-duty professional use",
                priceRange: "££-£££"
              },
              {
                brand: "Makita",
                rating: 4.7,
                strengths: ["Reliability", "Ergonomics", "Battery life"],
                weaknesses: ["Limited colour options"],
                bestFor: "Daily professional use",
                priceRange: "££-£££"
              },
              {
                brand: "Milwaukee",
                rating: 4.6,
                strengths: ["Innovation", "Power", "Tool variety"],
                weaknesses: ["Price", "Availability"],
                bestFor: "Specialised applications",
                priceRange: "£££"
              },
              {
                brand: "Bosch Professional",
                rating: 4.5,
                strengths: ["Quality", "Precision", "German engineering"],
                weaknesses: ["Price"],
                bestFor: "Precision work",
                priceRange: "££-£££"
              },
              {
                brand: "Ryobi",
                rating: 4.2,
                strengths: ["Value", "Range", "Starter-friendly"],
                weaknesses: ["Durability", "Power"],
                bestFor: "Apprentices and light use",
                priceRange: "£"
              },
              {
                brand: "Festool",
                rating: 4.9,
                strengths: ["Precision", "Quality", "Dust extraction"],
                weaknesses: ["Very expensive", "Overkill for basic work"],
                bestFor: "Premium professional use",
                priceRange: "££££"
              }
            ].map((brand, index) => (
              <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-elec-yellow">{brand.brand}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-current" />
                      <span className="text-white">{brand.rating}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit">{brand.priceRange}</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-green-400 mb-1">Strengths</h4>
                    <div className="flex flex-wrap gap-1">
                      {brand.strengths.map((strength, idx) => (
                        <Badge key={idx} className="bg-green-500/20 text-green-400 text-xs">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-red-400 mb-1">Consider</h4>
                    <div className="flex flex-wrap gap-1">
                      {brand.weaknesses.map((weakness, idx) => (
                        <Badge key={idx} className="bg-red-500/20 text-red-400 text-xs">
                          {weakness}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">Best For</h4>
                    <p className="text-sm text-muted-foreground">{brand.bestFor}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cordless" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-green-500/30 bg-green-500/10">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Battery className="h-5 w-5" />
                  Cordless Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">Advantages</span>
                </div>
                <ul className="space-y-1 text-sm text-green-300 ml-6">
                  <li>• Complete mobility and flexibility</li>
                  <li>• No trip hazards from cables</li>
                  <li>• Quick setup and pack away</li>
                  <li>• Safe in wet conditions</li>
                  <li>• Battery systems across tool range</li>
                </ul>
                
                <div className="flex items-center gap-2 text-red-400 mt-4">
                  <span className="font-medium">Considerations</span>
                </div>
                <ul className="space-y-1 text-sm text-red-300 ml-6">
                  <li>• Battery life limitations</li>
                  <li>• Initial cost higher</li>
                  <li>• Power may be less than corded</li>
                  <li>• Need spare batteries</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-500/10">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Corded Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-blue-400">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">Advantages</span>
                </div>
                <ul className="space-y-1 text-sm text-blue-300 ml-6">
                  <li>• Consistent power output</li>
                  <li>• No battery concerns</li>
                  <li>• Lower initial cost</li>
                  <li>• Often more powerful</li>
                  <li>• Unlimited runtime</li>
                </ul>
                
                <div className="flex items-center gap-2 text-red-400 mt-4">
                  <span className="font-medium">Considerations</span>
                </div>
                <ul className="space-y-1 text-sm text-red-300 ml-6">
                  <li>• Limited by cable length</li>
                  <li>• Trip hazard from cables</li>
                  <li>• Requires power source</li>
                  <li>• Less convenient setup</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow">Battery Platform Strategy</CardTitle>
              <p className="text-muted-foreground">Choose one brand's battery system and stick with it</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-elec-dark/50 rounded-lg">
                  <h4 className="font-medium text-white mb-2">18V Systems</h4>
                  <p className="text-sm text-muted-foreground mb-2">Best for most electrical work</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• DeWalt XR</li>
                    <li>• Makita LXT</li>
                    <li>• Milwaukee M18</li>
                    <li>• Bosch Professional</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-elec-dark/50 rounded-lg">
                  <h4 className="font-medium text-white mb-2">12V Systems</h4>
                  <p className="text-sm text-muted-foreground mb-2">Compact tools for tight spaces</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• DeWalt MAX</li>
                    <li>• Makita CXT</li>
                    <li>• Milwaukee M12</li>
                    <li>• Bosch Professional</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-elec-dark/50 rounded-lg">
                  <h4 className="font-medium text-white mb-2">54V/FlexVolt</h4>
                  <p className="text-sm text-muted-foreground mb-2">Heavy-duty applications</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• DeWalt FlexVolt</li>
                    <li>• Makita 36V/18Vx2</li>
                    <li>• Milwaukee MX Fuel</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow">Daily Maintenance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Clean after use</h4>
                    <p className="text-sm text-muted-foreground">Remove dust and debris with compressed air</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Check for damage</h4>
                    <p className="text-sm text-muted-foreground">Inspect cords, cases, and chuck condition</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Store properly</h4>
                    <p className="text-sm text-muted-foreground">Use cases and avoid extreme temperatures</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-elec-yellow">Battery Care</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Battery className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Proper charging</h4>
                    <p className="text-sm text-muted-foreground">Use manufacturer's chargers only</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Battery className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Storage charge</h4>
                    <p className="text-sm text-muted-foreground">Store at 40-60% charge for longevity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Battery className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Temperature control</h4>
                    <p className="text-sm text-muted-foreground">Avoid extreme hot or cold conditions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PowerToolsGuide;

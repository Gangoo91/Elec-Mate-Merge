import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calculator, GitCompare, Heart, TrendingUp, Users, Star, Clock } from "lucide-react";
import GuideSelector from "./guides/GuideSelector";
import HandToolsGuide from "./guides/HandToolsGuide";
import PPESafetyGuide from "./guides/PPESafetyGuide";
import BudgetCalculator from "./guides/BudgetCalculator";
import { useState } from "react";

const ToolBuyingGuides = () => {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-white">Professional Buying Guides</h2>
        <p className="text-muted-foreground">
          Expert recommendations and tools to make informed purchasing decisions
        </p>
      </div>

      <Tabs defaultValue="guides" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-elec-gray/50 border border-elec-yellow/20">
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Guides
          </TabsTrigger>
          <TabsTrigger value="budget-calculator" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Budget Tool
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <GitCompare className="h-4 w-4" />
            Compare
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="roi-analysis" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            ROI Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-6">
          {selectedGuide === null ? (
            <GuideSelector onSelectGuide={setSelectedGuide} />
          ) : (
            <div className="space-y-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedGuide(null)}
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
              >
                ← Back to All Guides
              </Button>
              
              {selectedGuide === "hand-tools" && <HandToolsGuide />}
              {selectedGuide === "ppe" && <PPESafetyGuide />}
              
              {/* Placeholder for other guides */}
              {!["hand-tools", "ppe"].includes(selectedGuide) && (
                <Card className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader>
                    <CardTitle className="text-elec-yellow">Guide Coming Soon</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      This comprehensive guide is currently being developed by our experts. 
                      Check back soon for detailed recommendations and insights.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="budget-calculator" className="space-y-6">
          <BudgetCalculator />
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <GitCompare className="h-5 w-5" />
                Tool Comparison Engine
              </CardTitle>
              <p className="text-muted-foreground">
                Compare tools side-by-side with detailed specifications and pricing
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((slot) => (
                  <div key={slot} className="p-4 border border-elec-yellow/30 rounded-lg bg-elec-dark/30">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 mx-auto bg-elec-yellow/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">+</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Add Tool {slot}</p>
                      <Button variant="outline" size="sm" className="border-elec-yellow/30">
                        Select Tool
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-elec-yellow/20">
                <p className="text-xs text-muted-foreground text-center">
                  Feature in development - Compare specifications, prices, and reviews
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Professional Wishlist
              </CardTitle>
              <p className="text-muted-foreground">
                Save tools for later and track price changes
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium text-white mb-2">No saved tools yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start building your wishlist by browsing our tool categories
                </p>
                <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                  Browse Tools
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roi-analysis" className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Tool ROI Calculator
              </CardTitle>
              <p className="text-muted-foreground">
                Calculate the return on investment for professional tools
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-white">Tool Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground">Tool Cost (£)</label>
                      <input 
                        type="number" 
                        placeholder="599.99"
                        className="w-full mt-1 p-2 bg-elec-dark border border-elec-yellow/30 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Expected Lifespan (years)</label>
                      <input 
                        type="number" 
                        placeholder="5"
                        className="w-full mt-1 p-2 bg-elec-dark border border-elec-yellow/30 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Usage (hours/week)</label>
                      <input 
                        type="number" 
                        placeholder="20"
                        className="w-full mt-1 p-2 bg-elec-dark border border-elec-yellow/30 rounded text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-white">Business Impact</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground">Time Saved (min/job)</label>
                      <input 
                        type="number" 
                        placeholder="15"
                        className="w-full mt-1 p-2 bg-elec-dark border border-elec-yellow/30 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Hourly Rate (£)</label>
                      <input 
                        type="number" 
                        placeholder="45"
                        className="w-full mt-1 p-2 bg-elec-dark border border-elec-yellow/30 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Jobs per Week</label>
                      <input 
                        type="number" 
                        placeholder="10"
                        className="w-full mt-1 p-2 bg-elec-dark border border-elec-yellow/30 rounded text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                Calculate ROI
              </Button>
              
              <div className="pt-4 border-t border-elec-yellow/20">
                <p className="text-xs text-muted-foreground text-center">
                  Advanced ROI analysis with depreciation and opportunity cost calculations
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ToolBuyingGuides;

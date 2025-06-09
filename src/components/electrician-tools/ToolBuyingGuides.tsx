
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Compare, Heart, TrendingUp } from "lucide-react";
import GuideSelector from "./guides/GuideSelector";
import TestingEquipmentGuide from "./guides/TestingEquipmentGuide";
import PowerToolsGuide from "./guides/PowerToolsGuide";
import HandToolsGuide from "./guides/HandToolsGuide";
import PPESafetyGuide from "./guides/PPESafetyGuide";
import BudgetCalculator from "./guides/BudgetCalculator";

const ToolBuyingGuides = () => {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("guides");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [comparison, setComparison] = useState<string[]>([]);
  const [budgetCalculation, setBudgetCalculation] = useState<any>(null);

  const handleSelectGuide = (guideId: string) => {
    setSelectedGuide(guideId);
  };

  const handleBackToGuides = () => {
    setSelectedGuide(null);
  };

  const addToWishlist = (itemId: string) => {
    setWishlist(prev => [...prev, itemId]);
  };

  const addToComparison = (itemId: string) => {
    if (comparison.length < 4) {
      setComparison(prev => [...prev, itemId]);
    }
  };

  const renderGuideContent = () => {
    switch (selectedGuide) {
      case "testing-equipment":
        return <TestingEquipmentGuide onBack={handleBackToGuides} />;
      case "power-tools":
        return <PowerToolsGuide onBack={handleBackToGuides} />;
      case "hand-tools":
        return <HandToolsGuide onBack={handleBackToGuides} />;
      case "ppe":
        return <PPESafetyGuide onBack={handleBackToGuides} />;
      case "cable-tools":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={handleBackToGuides}
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
              >
                Back to Guides
              </Button>
              <h1 className="text-3xl font-bold text-elec-yellow">Cable Tools Guide</h1>
            </div>
            <div className="p-6 bg-elec-gray rounded-lg border border-elec-yellow/20">
              <p className="text-muted-foreground">
                Comprehensive cable tools guide coming soon! This will include cable preparation tools, 
                pulling equipment, and termination tools with detailed recommendations.
              </p>
            </div>
          </div>
        );
      case "storage":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={handleBackToGuides}
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
              >
                Back to Guides
              </Button>
              <h1 className="text-3xl font-bold text-elec-yellow">Tool Storage & Organisation</h1>
            </div>
            <div className="p-6 bg-elec-gray rounded-lg border border-elec-yellow/20">
              <p className="text-muted-foreground">
                Tool storage and organisation guide coming soon! This will cover tool boxes, 
                van storage solutions, and workshop organisation systems.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (selectedGuide) {
    return renderGuideContent();
  }

  const mockToolCategories = [
    { title: "Testing Equipment", estimatedCost: 800 },
    { title: "Power Tools", estimatedCost: 600 },
    { title: "Hand Tools", estimatedCost: 400 },
    { title: "PPE & Safety", estimatedCost: 200 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Expert Buying Guides</h2>
          <p className="text-muted-foreground">Professional recommendations with enhanced tools and calculators</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-elec-yellow/30"
            onClick={() => setActiveTab("wishlist")}
          >
            <Heart className="h-4 w-4 mr-2" />
            Wishlist ({wishlist.length})
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-elec-yellow/30"
            onClick={() => setActiveTab("comparison")}
          >
            <Compare className="h-4 w-4 mr-2" />
            Compare ({comparison.length})
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-elec-gray/50">
          <TabsTrigger value="guides">Buying Guides</TabsTrigger>
          <TabsTrigger value="calculator">Budget Calculator</TabsTrigger>
          <TabsTrigger value="comparison">Tool Comparison</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="guides">
          <GuideSelector onSelectGuide={handleSelectGuide} />
        </TabsContent>

        <TabsContent value="calculator">
          <BudgetCalculator 
            toolCategories={mockToolCategories}
            onCalculationUpdate={setBudgetCalculation}
          />
        </TabsContent>

        <TabsContent value="comparison">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Tool Comparison</h3>
              <p className="text-muted-foreground">Compare up to 4 tools side by side</p>
            </div>
            
            {comparison.length === 0 ? (
              <div className="p-8 bg-elec-gray rounded-lg border border-elec-yellow/20 text-center">
                <Compare className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
                <h4 className="text-white font-medium mb-2">No tools selected for comparison</h4>
                <p className="text-muted-foreground text-sm">
                  Select tools from the buying guides to compare features, prices, and specifications.
                </p>
              </div>
            ) : (
              <div className="p-6 bg-elec-gray rounded-lg border border-elec-yellow/20">
                <p className="text-muted-foreground">
                  Tool comparison feature coming soon! You have {comparison.length} tools selected for comparison.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="wishlist">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Your Wishlist</h3>
              <p className="text-muted-foreground">Save tools you're interested in and track price changes</p>
            </div>
            
            {wishlist.length === 0 ? (
              <div className="p-8 bg-elec-gray rounded-lg border border-elec-yellow/20 text-center">
                <Heart className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
                <h4 className="text-white font-medium mb-2">Your wishlist is empty</h4>
                <p className="text-muted-foreground text-sm">
                  Add tools to your wishlist from the buying guides to track prices and get alerts.
                </p>
              </div>
            ) : (
              <div className="p-6 bg-elec-gray rounded-lg border border-elec-yellow/20">
                <p className="text-muted-foreground">
                  Wishlist management coming soon! You have {wishlist.length} tools in your wishlist.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="roi">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">ROI Analysis & Business Tools</h3>
              <p className="text-muted-foreground">Calculate return on investment and business impact of tool purchases</p>
            </div>
            
            {budgetCalculation ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-elec-gray rounded-lg border border-elec-yellow/20">
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-elec-yellow" />
                    Investment Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Investment:</span>
                      <span className="text-elec-yellow font-bold">£{budgetCalculation.totalCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Budget:</span>
                      <span className="text-white">£{Math.round(budgetCalculation.monthlyBudget)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time to Complete:</span>
                      <span className="text-white">{budgetCalculation.monthsToComplete} months</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-elec-gray rounded-lg border border-elec-yellow/20">
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-elec-yellow" />
                    Business Impact
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Productivity Increase:</span>
                      <span className="text-green-400">+15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quality Improvement:</span>
                      <span className="text-green-400">+20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Break-even Point:</span>
                      <span className="text-white">8-12 months</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-elec-gray rounded-lg border border-elec-yellow/20 text-center">
                <Calculator className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
                <h4 className="text-white font-medium mb-2">Calculate Your ROI</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Use the Budget Calculator first to generate your ROI analysis.
                </p>
                <Button 
                  onClick={() => setActiveTab("calculator")}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  Go to Calculator
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ToolBuyingGuides;

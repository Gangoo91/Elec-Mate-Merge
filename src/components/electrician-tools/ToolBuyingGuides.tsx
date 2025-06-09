
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Calculator, ShoppingCart, Star, Users, Clock } from "lucide-react";
import GuideSelector from "./guides/GuideSelector";
import HandToolsGuide from "./guides/HandToolsGuide";
import PPESafetyGuide from "./guides/PPESafetyGuide";
import BudgetCalculator from "./guides/BudgetCalculator";

const ToolBuyingGuides = () => {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [showBudgetCalculator, setShowBudgetCalculator] = useState(false);
  const [budgetData, setBudgetData] = useState<any>(null);

  const handleSelectGuide = (guideId: string) => {
    setSelectedGuide(guideId);
  };

  const handleBackToGuides = () => {
    setSelectedGuide(null);
    setShowBudgetCalculator(false);
  };

  const handleBudgetCalculation = (calculationData: any) => {
    setBudgetData(calculationData);
  };

  const toolCategories = [
    { id: "testing", name: "Testing Equipment", priceRange: [25, 1500] },
    { id: "power", name: "Power Tools", priceRange: [45, 800] },
    { id: "hand", name: "Hand Tools", priceRange: [8, 120] },
    { id: "ppe", name: "PPE & Safety", priceRange: [5, 85] },
    { id: "inspection", name: "Inspection Tools", priceRange: [15, 250] },
    { id: "accessories", name: "Accessories", priceRange: [3, 150] }
  ];

  if (showBudgetCalculator) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="outline" 
            onClick={handleBackToGuides}
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Guides
          </Button>
          <h2 className="text-2xl font-semibold text-white">Tool Budget Calculator</h2>
        </div>
        <BudgetCalculator 
          toolCategories={toolCategories}
          onCalculationUpdate={handleBudgetCalculation}
        />
      </div>
    );
  }

  if (selectedGuide === "hand-tools") {
    return <HandToolsGuide onBack={handleBackToGuides} />;
  }

  if (selectedGuide === "ppe") {
    return <PPESafetyGuide onBack={handleBackToGuides} />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-white">Professional Buying Guides</h2>
        <p className="text-muted-foreground">
          Expert guidance to help you make informed tool purchasing decisions
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all cursor-pointer"
              onClick={() => setShowBudgetCalculator(true)}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-elec-yellow/20 rounded-lg">
                <Calculator className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <CardTitle className="text-lg text-white">Budget Calculator</CardTitle>
                <p className="text-sm text-muted-foreground">Plan your tool investments wisely</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-lg text-white">Quick Recommendations</CardTitle>
                <p className="text-sm text-muted-foreground">Get instant tool suggestions</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Comprehensive Guides */}
      <GuideSelector onSelectGuide={handleSelectGuide} />

      {/* Additional Resources */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-xl text-white">Why Use Our Buying Guides?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-amber-400" />
              <div>
                <p className="font-medium text-white">Expert Reviews</p>
                <p className="text-sm text-muted-foreground">Tested by professionals</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-400" />
              <div>
                <p className="font-medium text-white">Community Insights</p>
                <p className="text-sm text-muted-foreground">Real user experiences</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-green-400" />
              <div>
                <p className="font-medium text-white">Regular Updates</p>
                <p className="text-sm text-muted-foreground">Latest market trends</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolBuyingGuides;

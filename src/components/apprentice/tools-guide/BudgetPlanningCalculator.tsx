
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, PoundSterling, Calendar, TrendingUp } from "lucide-react";

interface ToolCategory {
  name: string;
  minCost: number;
  maxCost: number;
  priority: "essential" | "recommended" | "optional";
  timeframe: string;
}

const BudgetPlanningCalculator = () => {
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [timeframe, setTimeframe] = useState("12");
  
  const toolCategories: ToolCategory[] = [
    { name: "Hand Tools", minCost: 200, maxCost: 400, priority: "essential", timeframe: "Months 1-3" },
    { name: "Basic PPE", minCost: 100, maxCost: 200, priority: "essential", timeframe: "Month 1" },
    { name: "Power Tools", minCost: 300, maxCost: 800, priority: "recommended", timeframe: "Months 3-6" },
    { name: "Test Equipment", minCost: 400, maxCost: 1200, priority: "essential", timeframe: "Months 6-12" },
    { name: "Specialist Tools", minCost: 200, maxCost: 500, priority: "optional", timeframe: "Months 12+" }
  ];

  const calculateBudget = () => {
    const monthly = parseFloat(monthlyBudget);
    const months = parseInt(timeframe);
    if (!monthly || !months) return null;

    const totalBudget = monthly * months;
    const essentialCosts = toolCategories
      .filter(cat => cat.priority === "essential")
      .reduce((sum, cat) => sum + cat.minCost, 0);
    
    const maxEssentialCosts = toolCategories
      .filter(cat => cat.priority === "essential")
      .reduce((sum, cat) => sum + cat.maxCost, 0);

    return {
      totalBudget,
      essentialCosts,
      maxEssentialCosts,
      remainingBudget: totalBudget - essentialCosts,
      canAffordEssentials: totalBudget >= essentialCosts,
      canAffordQuality: totalBudget >= maxEssentialCosts
    };
  };

  const budget = calculateBudget();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "essential": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "recommended": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "optional": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          <CardTitle className="text-elec-yellow">Budget Planning Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Plan your tool investments based on your available budget and timeframe
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="monthly-budget" className="text-white">Monthly Budget (£)</Label>
            <Input
              id="monthly-budget"
              type="number"
              placeholder="150"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              className="bg-elec-gray border-elec-yellow/30"
            />
          </div>
          
          <div>
            <Label htmlFor="timeframe" className="text-white">Planning Period (months)</Label>
            <Input
              id="timeframe"
              type="number"
              placeholder="12"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-elec-gray border-elec-yellow/30"
            />
          </div>
        </div>

        {budget && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                <PoundSterling className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-lg font-bold text-blue-400">£{budget.totalBudget}</p>
              </div>
              
              <div className={`border rounded-lg p-3 text-center ${
                budget.canAffordEssentials 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <TrendingUp className={`h-6 w-6 mx-auto mb-1 ${
                  budget.canAffordEssentials ? 'text-green-400' : 'text-red-400'
                }`} />
                <p className="text-sm text-muted-foreground">Essential Tools</p>
                <p className={`text-lg font-bold ${
                  budget.canAffordEssentials ? 'text-green-400' : 'text-red-400'
                }`}>
                  £{budget.essentialCosts}
                </p>
              </div>
              
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3 text-center">
                <Calendar className="h-6 w-6 text-elec-yellow mx-auto mb-1" />
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-lg font-bold text-elec-yellow">£{budget.remainingBudget}</p>
              </div>
            </div>

            <div className="space-y-2">
              {!budget.canAffordEssentials && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-300 font-medium">Budget Alert</p>
                  <p className="text-sm text-red-200">
                    Your current budget may not cover all essential tools. Consider extending your timeframe or increasing monthly allocation.
                  </p>
                </div>
              )}
              
              {budget.canAffordQuality && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-green-300 font-medium">Excellent Planning!</p>
                  <p className="text-sm text-green-200">
                    Your budget allows for quality essential tools plus some recommended items.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div>
          <h4 className="font-medium text-white mb-3">Tool Category Breakdown</h4>
          <div className="space-y-3">
            {toolCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-elec-yellow/20 rounded-lg">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white">{category.name}</span>
                    <Badge className={getPriorityColor(category.priority)} variant="outline">
                      {category.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{category.timeframe}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-elec-yellow">£{category.minCost} - £{category.maxCost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetPlanningCalculator;

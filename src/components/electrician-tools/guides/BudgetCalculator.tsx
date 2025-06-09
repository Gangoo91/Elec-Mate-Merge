
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, DollarSign, Clock } from "lucide-react";

interface BudgetCalculatorProps {
  toolCategories: any[];
  onCalculationUpdate: (calculation: any) => void;
}

const BudgetCalculator = ({ toolCategories, onCalculationUpdate }: BudgetCalculatorProps) => {
  const [budget, setBudget] = useState([1000]);
  const [timeline, setTimeline] = useState([12]);
  const [experience, setExperience] = useState("apprentice");
  const [workType, setWorkType] = useState("domestic");

  const experienceLevels = {
    apprentice: { multiplier: 0.8, label: "Apprentice", priority: "essential" },
    intermediate: { multiplier: 1.0, label: "Intermediate", priority: "recommended" },
    professional: { multiplier: 1.3, label: "Professional", priority: "all" }
  };

  const workTypes = {
    domestic: { multiplier: 0.9, label: "Domestic" },
    commercial: { multiplier: 1.1, label: "Commercial" },
    industrial: { multiplier: 1.4, label: "Industrial" }
  };

  const calculateRecommendations = () => {
    const expLevel = experienceLevels[experience as keyof typeof experienceLevels];
    const workTypeLevel = workTypes[workType as keyof typeof workTypes];
    const monthlyBudget = budget[0] / timeline[0];
    
    // Mock calculation for tool recommendations
    const recommendations = toolCategories.map(category => {
      const adjustedPrice = 100 * expLevel.multiplier * workTypeLevel.multiplier;
      const priority = Math.random() > 0.5 ? "high" : "medium";
      
      return {
        category: category.title || "Tool Category",
        estimatedCost: Math.round(adjustedPrice),
        priority,
        timeline: Math.ceil(adjustedPrice / monthlyBudget),
        roiMonths: Math.floor(Math.random() * 12) + 6
      };
    });

    const totalCost = recommendations.reduce((sum, rec) => sum + rec.estimatedCost, 0);
    const monthsToComplete = Math.ceil(totalCost / monthlyBudget);

    const calculation = {
      totalBudget: budget[0],
      timeline: timeline[0],
      monthlyBudget,
      recommendations,
      totalCost,
      monthsToComplete,
      budgetUtilization: Math.min((totalCost / budget[0]) * 100, 100)
    };

    onCalculationUpdate(calculation);
    return calculation;
  };

  const calculation = calculateRecommendations();

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            Professional Tool Budget Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white mb-2 block">
                  Total Budget: £{budget[0]}
                </label>
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  max={5000}
                  min={200}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>£200</span>
                  <span>£5,000</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-2 block">
                  Timeline: {timeline[0]} months
                </label>
                <Slider
                  value={timeline}
                  onValueChange={setTimeline}
                  max={36}
                  min={3}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>3 months</span>
                  <span>36 months</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-2 block">Experience Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(experienceLevels).map(([key, level]) => (
                    <Button
                      key={key}
                      variant={experience === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setExperience(key)}
                      className={experience === key ? 
                        "bg-elec-yellow text-black" : 
                        "border-elec-yellow/30 hover:bg-elec-yellow/10"
                      }
                    >
                      {level.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white mb-2 block">Primary Work Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(workTypes).map(([key, type]) => (
                    <Button
                      key={key}
                      variant={workType === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setWorkType(key)}
                      className={workType === key ? 
                        "bg-elec-yellow text-black" : 
                        "border-elec-yellow/30 hover:bg-elec-yellow/10"
                      }
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-elec-yellow/10 rounded-lg border border-elec-yellow/20">
                <h3 className="text-elec-yellow font-medium mb-3">Budget Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Budget:</span>
                    <span className="text-white font-medium">£{calculation.totalBudget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Budget:</span>
                    <span className="text-white font-medium">£{Math.round(calculation.monthlyBudget)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Total Cost:</span>
                    <span className="text-elec-yellow font-medium">£{calculation.totalCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time to Complete:</span>
                    <span className="text-white font-medium">{calculation.monthsToComplete} months</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-elec-yellow/20">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Budget Utilization:</span>
                    <Badge className={calculation.budgetUtilization <= 100 ? 
                      "bg-green-500/20 text-green-400" : 
                      "bg-red-500/20 text-red-400"
                    }>
                      {Math.round(calculation.budgetUtilization)}%
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <h3 className="text-blue-300 font-medium mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  ROI Analysis
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average ROI:</span>
                    <span className="text-green-400 font-medium">
                      {Math.round(calculation.recommendations.reduce((sum, rec) => sum + rec.roiMonths, 0) / calculation.recommendations.length)} months
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best Investment:</span>
                    <span className="text-white font-medium">
                      {calculation.recommendations.reduce((best, rec) => 
                        rec.roiMonths < best.roiMonths ? rec : best
                      ).category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Recommended Purchase Order</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {calculation.recommendations
              .sort((a, b) => {
                if (a.priority === "high" && b.priority !== "high") return -1;
                if (b.priority === "high" && a.priority !== "high") return 1;
                return a.timeline - b.timeline;
              })
              .map((rec, index) => (
                <div key={index} className="p-3 bg-elec-dark/30 rounded-lg border border-elec-yellow/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-elec-yellow/20 text-elec-yellow">
                        {index + 1}
                      </Badge>
                      <div>
                        <h4 className="text-white font-medium text-sm">{rec.category}</h4>
                        <p className="text-xs text-muted-foreground">
                          ROI: {rec.roiMonths} months | Purchase by month {rec.timeline}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-elec-yellow font-medium">£{rec.estimatedCost}</div>
                      <Badge className={rec.priority === "high" ? 
                        "bg-red-500/20 text-red-400" : 
                        "bg-amber-500/20 text-amber-400"
                      }>
                        {rec.priority} priority
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetCalculator;

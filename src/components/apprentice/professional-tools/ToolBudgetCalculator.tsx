
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Calculator, PoundSterling, TrendingUp } from "lucide-react";
import { useState } from "react";

const ToolBudgetCalculator = () => {
  const [monthlyBudget, setMonthlyBudget] = useState<string>("200");
  const [timeframe, setTimeframe] = useState<string>("12");
  const [priority, setPriority] = useState<string>("essential");
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<{[key: string]: number}>({});

  const toolCosts = {
    essential: {
      "Basic hand tools": 300,
      "PPE & safety equipment": 150,
      "Basic test equipment": 200,
      "Tool storage": 100
    },
    recommended: {
      "Power tools": 500,
      "Advanced test equipment": 800,
      "Professional hand tools": 400,
      "Vehicle storage": 300
    },
    advanced: {
      "Specialist test equipment": 1200,
      "Professional power tools": 800,
      "Advanced PPE": 200,
      "Complete toolkit": 600
    }
  };

  const calculateBudget = () => {
    const monthly = parseFloat(monthlyBudget) || 0;
    const months = parseInt(timeframe) || 12;
    const total = monthly * months;
    setTotalBudget(total);

    const selectedTools = toolCosts[priority as keyof typeof toolCosts];
    const totalCost = Object.values(selectedTools).reduce((sum, cost) => sum + cost, 0);
    
    const budgetBreakdown: {[key: string]: number} = {};
    Object.entries(selectedTools).forEach(([tool, cost]) => {
      budgetBreakdown[tool] = (cost / totalCost) * total;
    });
    
    setBreakdown(budgetBreakdown);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-yellow/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          <CardTitle className="text-elec-yellow">Tool Budget Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="monthly-budget">Monthly Budget (£)</Label>
              <Input
                id="monthly-budget"
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                placeholder="200"
              />
            </div>
            
            <div>
              <Label htmlFor="timeframe">Timeframe (months)</Label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="18">18 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="priority">Priority Level</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="essential">Essential Only</SelectItem>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={calculateBudget} className="w-full">
            Calculate Budget Plan
          </Button>
          
          {totalBudget > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span className="text-white">Total Budget:</span>
                <span className="text-elec-yellow flex items-center gap-1">
                  <PoundSterling className="h-4 w-4" />
                  {totalBudget.toFixed(0)}
                </span>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-white">Recommended Allocation:</h4>
                {Object.entries(breakdown).map(([tool, amount]) => (
                  <div key={tool} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{tool}</span>
                      <span className="text-elec-yellow">£{amount.toFixed(0)}</span>
                    </div>
                    <Progress value={(amount / totalBudget) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolBudgetCalculator;

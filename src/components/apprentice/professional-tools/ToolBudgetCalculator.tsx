
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, PoundSterling, Wallet, Target } from "lucide-react";
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
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="relative">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30">
            <Calculator className="h-5 w-5 text-elec-yellow" />
          </div>
          Tool Budget Calculator
        </CardTitle>
        <p className="text-sm text-white/60">
          Plan your tool investments and see how your budget allocates
        </p>
      </CardHeader>
      <CardContent className="relative">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthly-budget" className="text-white/70">Monthly Budget (£)</Label>
              <Input
                id="monthly-budget"
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                placeholder="200"
                className="bg-white/10 border-white/20 focus:border-elec-yellow/50 h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeframe" className="text-white/70">Timeframe (months)</Label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="bg-white/10 border-white/20 h-11">
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

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-white/70">Priority Level</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="bg-white/10 border-white/20 h-11">
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

          <Button
            onClick={calculateBudget}
            className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium touch-manipulation active:scale-95 transition-all"
          >
            <Target className="h-4 w-4 mr-2" />
            Calculate Budget Plan
          </Button>

          {totalBudget > 0 && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-elec-yellow/20">
                    <Wallet className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <span className="text-white font-medium">Total Budget:</span>
                </div>
                <span className="text-elec-yellow font-bold text-xl flex items-center gap-1">
                  <PoundSterling className="h-5 w-5" />
                  {totalBudget.toFixed(0)}
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-white">Recommended Allocation:</h4>
                {Object.entries(breakdown).map(([tool, amount]) => (
                  <div key={tool} className="p-3 rounded-xl bg-white/10 border border-white/10">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/70">{tool}</span>
                      <span className="text-elec-yellow font-medium">£{amount.toFixed(0)}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-elec-yellow transition-all"
                        style={{ width: `${(amount / totalBudget) * 100}%` }}
                      />
                    </div>
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

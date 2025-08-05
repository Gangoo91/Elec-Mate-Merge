import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { MobileInput } from "@/components/ui/mobile-input";
import { Scenario, useCashFlow } from "@/hooks/use-cash-flow";
import { Target, TrendingUp, TrendingDown, BarChart3, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface ScenarioPlannerProps {
  scenarios: Scenario[];
  selectedScenario: string;
  onScenarioChange: (scenarioId: string) => void;
  monthlyProjections: any[];
  financialMetrics: any;
}

export const ScenarioPlanner = ({ 
  scenarios, 
  selectedScenario, 
  onScenarioChange, 
  monthlyProjections,
  financialMetrics 
}: ScenarioPlannerProps) => {
  const [whatIfMultiplier, setWhatIfMultiplier] = useState([1.0]);
  const [whatIfAnalysis, setWhatIfAnalysis] = useState<{
    newNetProfit: number;
    newMinBalance: number;
    impactDescription: string;
  } | null>(null);

  const runWhatIfAnalysis = () => {
    const multiplier = whatIfMultiplier[0];
    const newProjections = monthlyProjections.map(p => ({
      ...p,
      income: p.income * multiplier,
      netFlow: (p.income * multiplier) - p.expenses
    }));

    let cumulativeBalance = 5000; // Starting balance
    const updatedProjections = newProjections.map(p => {
      cumulativeBalance += p.netFlow;
      return { ...p, cumulativeBalance };
    });

    const newNetProfit = updatedProjections.reduce((sum, p) => sum + p.netFlow, 0);
    const newMinBalance = Math.min(...updatedProjections.map(p => p.cumulativeBalance));
    
    let impactDescription = "";
    const changePercent = ((multiplier - 1) * 100).toFixed(0);
    const profitChange = newNetProfit - financialMetrics.netProfit;
    
    if (multiplier > 1) {
      impactDescription = `${changePercent}% income increase would add £${profitChange.toFixed(0)} annual profit`;
    } else if (multiplier < 1) {
      impactDescription = `${Math.abs(Number(changePercent))}% income decrease would reduce annual profit by £${Math.abs(profitChange).toFixed(0)}`;
    } else {
      impactDescription = "No change from current projections";
    }

    setWhatIfAnalysis({
      newNetProfit,
      newMinBalance,
      impactDescription
    });
  };

  const getScenarioIcon = (scenarioId: string) => {
    switch (scenarioId) {
      case 'pessimistic':
        return <TrendingDown className="h-4 w-4" />;
      case 'optimistic':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const getScenarioColor = (scenarioId: string) => {
    switch (scenarioId) {
      case 'pessimistic':
        return 'destructive';
      case 'optimistic':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const scenarioComparison = scenarios.map(scenario => {
    const multiplier = scenario.multiplier;
    const projectedIncome = financialMetrics.totalIncome * multiplier;
    const projectedProfit = (financialMetrics.totalIncome * multiplier) - financialMetrics.totalExpenses;
    const projectedMargin = ((projectedProfit / projectedIncome) * 100);

    return {
      ...scenario,
      projectedIncome,
      projectedProfit,
      projectedMargin
    };
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="scenarios" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scenarios" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Scenarios
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Comparison
          </TabsTrigger>
          <TabsTrigger value="whatif" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            What-If
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader>
              <CardTitle className="text-white">Scenario Planning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Select different scenarios to see how they impact your cash flow projections.
              </p>
              
              <div className="grid gap-3">
                {scenarios.map(scenario => (
                  <div
                    key={scenario.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedScenario === scenario.id
                        ? 'border-elec-yellow bg-elec-yellow/10'
                        : 'border-secondary/40 hover:border-secondary/60'
                    }`}
                    onClick={() => onScenarioChange(scenario.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getScenarioIcon(scenario.id)}
                        <div>
                          <h4 className="font-medium text-white">{scenario.name}</h4>
                          <p className="text-sm text-muted-foreground">{scenario.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={getScenarioColor(scenario.id)}>
                          {(scenario.multiplier * 100).toFixed(0)}%
                        </Badge>
                        {selectedScenario === scenario.id && (
                          <Badge variant="outline" className="ml-2">Active</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader>
              <CardTitle className="text-white">Scenario Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-secondary/40">
                      <th className="text-left py-2 text-white">Scenario</th>
                      <th className="text-right py-2 text-white">Income</th>
                      <th className="text-right py-2 text-white">Profit</th>
                      <th className="text-right py-2 text-white">Margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarioComparison.map(scenario => (
                      <tr 
                        key={scenario.id}
                        className={`border-b border-secondary/20 ${
                          selectedScenario === scenario.id ? 'bg-elec-yellow/5' : ''
                        }`}
                      >
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            {getScenarioIcon(scenario.id)}
                            <span className="text-white font-medium">{scenario.name}</span>
                            {selectedScenario === scenario.id && (
                              <Badge variant="outline">Current</Badge>
                            )}
                          </div>
                        </td>
                        <td className="text-right py-3 text-green-400 font-medium">
                          £{scenario.projectedIncome.toFixed(0)}
                        </td>
                        <td className={`text-right py-3 font-medium ${
                          scenario.projectedProfit >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          £{scenario.projectedProfit.toFixed(0)}
                        </td>
                        <td className={`text-right py-3 font-medium ${
                          scenario.projectedMargin >= 10 ? 'text-green-400' : 
                          scenario.projectedMargin >= 0 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {scenario.projectedMargin.toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatif" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-card">
            <CardHeader>
              <CardTitle className="text-white">What-If Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-white font-medium mb-3 block">
                  Income Adjustment: {(whatIfMultiplier[0] * 100).toFixed(0)}%
                </label>
                <Slider
                  value={whatIfMultiplier}
                  onValueChange={setWhatIfMultiplier}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>50% (Crisis)</span>
                  <span>100% (Current)</span>
                  <span>200% (Boom)</span>
                </div>
              </div>

              <Button 
                onClick={runWhatIfAnalysis}
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                Run Analysis
              </Button>

              {whatIfAnalysis && (
                <div className="space-y-4 p-4 rounded-lg bg-secondary/20 border border-secondary/40">
                  <h4 className="font-medium text-white">Analysis Results</h4>
                  
                  <div className="grid gap-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Impact:</span>
                      <span className="text-white">{whatIfAnalysis.impactDescription}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">New Annual Profit:</span>
                      <span className={`font-medium ${
                        whatIfAnalysis.newNetProfit >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        £{whatIfAnalysis.newNetProfit.toFixed(0)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Minimum Cash Position:</span>
                      <span className={`font-medium ${
                        whatIfAnalysis.newMinBalance >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        £{whatIfAnalysis.newMinBalance.toFixed(0)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Profit Change:</span>
                      <span className={`font-medium ${
                        whatIfAnalysis.newNetProfit - financialMetrics.netProfit >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {whatIfAnalysis.newNetProfit - financialMetrics.netProfit >= 0 ? '+' : ''}
                        £{(whatIfAnalysis.newNetProfit - financialMetrics.netProfit).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  {whatIfAnalysis.newMinBalance < 0 && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                      <p className="text-destructive text-sm">
                        ⚠️ This scenario would result in negative cash flow. Consider building reserves or securing credit facilities.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileInput } from "@/components/ui/mobile-input";
import { Scenario, useCashFlow } from "@/hooks/use-cash-flow";
import { Target, TrendingUp, TrendingDown, BarChart3, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

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

    let cumulativeBalance = monthlyProjections[0]?.cumulativeBalance - monthlyProjections[0]?.netFlow || 5000;
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
      impactDescription = `${changePercent}% income increase would add £${profitChange.toLocaleString(undefined, { maximumFractionDigits: 0 })} annual profit`;
    } else if (multiplier < 1) {
      impactDescription = `${Math.abs(Number(changePercent))}% income decrease would reduce annual profit by £${Math.abs(profitChange).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    } else {
      impactDescription = "No change from current projections";
    }

    setWhatIfAnalysis({
      newNetProfit,
      newMinBalance,
      impactDescription
    });
  };

  // Run initial analysis on mount
  useEffect(() => {
    runWhatIfAnalysis();
  }, [monthlyProjections]);

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
              <CardTitle className="text-elec-light">Scenario Planning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-elec-light/80 text-sm">
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
                          <h4 className="font-medium text-elec-light">{scenario.name}</h4>
                          <p className="text-sm text-elec-light/70">{scenario.description}</p>
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
              <CardTitle className="text-elec-light">Scenario Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-secondary/40">
                      <th className="text-left py-2 text-elec-light">Scenario</th>
                      <th className="text-right py-2 text-elec-light">Income</th>
                      <th className="text-right py-2 text-elec-light">Profit</th>
                      <th className="text-right py-2 text-elec-light">Margin</th>
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
                            <span className="text-elec-light font-medium">{scenario.name}</span>
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
          <Card className="border-blue-400/30 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="text-elec-light">What-If Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-elec-light font-medium mb-3 block">
                  If my income changes by: <span className="text-elec-yellow font-bold">{((whatIfMultiplier[0] - 1) * 100).toFixed(0)}%</span>
                </label>
                <Slider
                  value={whatIfMultiplier}
                  onValueChange={(value) => {
                    setWhatIfMultiplier(value);
                    runWhatIfAnalysis();
                  }}
                  min={0.5}
                  max={2.0}
                  step={0.05}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-elec-light/70 mt-2">
                  <span>-50% (Crisis)</span>
                  <span>0% (Current)</span>
                  <span>+100% (Boom)</span>
                </div>
              </div>

              {whatIfAnalysis && (
                <div className="space-y-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <h4 className="font-medium text-elec-light">Live Results</h4>
                  
                  {/* Live results grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-elec-dark/50">
                      <p className="text-xs text-elec-light/70">New Annual Profit</p>
                      <p className={`text-xl font-bold ${
                        whatIfAnalysis.newNetProfit >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        £{whatIfAnalysis.newNetProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-elec-light/60 mt-1">
                        {whatIfAnalysis.newNetProfit - financialMetrics.netProfit >= 0 ? '+' : ''}
                        £{Math.abs(whatIfAnalysis.newNetProfit - financialMetrics.netProfit).toLocaleString(undefined, { maximumFractionDigits: 0 })} change
                      </p>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-elec-dark/50">
                      <p className="text-xs text-elec-light/70">Lowest Balance</p>
                      <p className={`text-xl font-bold ${
                        whatIfAnalysis.newMinBalance >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        £{whatIfAnalysis.newMinBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-elec-light/60 mt-1">
                        {whatIfAnalysis.newMinBalance >= 0 ? 'Safe' : 'Negative'}
                      </p>
                    </div>
                  </div>

                  {whatIfAnalysis.newMinBalance < 0 && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        At {((whatIfMultiplier[0] - 1) * 100).toFixed(0)}% income change, you'll go negative. 
                        Consider reducing expenses by £{Math.abs(whatIfAnalysis.newMinBalance).toLocaleString(undefined, { maximumFractionDigits: 0 })}.
                      </AlertDescription>
                    </Alert>
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
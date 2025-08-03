import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BarChart3, Target } from "lucide-react";

export const BreakEvenCalculator = () => {
  const [fixedCosts, setFixedCosts] = useState("");
  const [pricePerJob, setPricePerJob] = useState("");
  const [variableCostPerJob, setVariableCostPerJob] = useState("");
  const [result, setResult] = useState<{
    breakEvenJobs: number;
    breakEvenRevenue: number;
    contributionMargin: number;
    contributionMarginPercent: number;
  } | null>(null);

  const calculateBreakEven = () => {
    const fixed = parseFloat(fixedCosts) || 0;
    const price = parseFloat(pricePerJob) || 0;
    const variable = parseFloat(variableCostPerJob) || 0;

    const contributionMargin = price - variable;
    const contributionMarginPercent = price > 0 ? (contributionMargin / price) * 100 : 0;
    const breakEvenJobs = contributionMargin > 0 ? fixed / contributionMargin : 0;
    const breakEvenRevenue = breakEvenJobs * price;

    setResult({
      breakEvenJobs: Math.ceil(breakEvenJobs),
      breakEvenRevenue,
      contributionMargin,
      contributionMarginPercent
    });
  };

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-elec-yellow" />
          Break-Even Analysis
        </CardTitle>
        <CardDescription>
          Calculate how many jobs you need to cover your fixed costs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fixedCosts">Monthly Fixed Costs (£)</Label>
              <Input
                id="fixedCosts"
                type="number"
                placeholder="e.g. 3000"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Rent, insurance, van payments, etc.
              </p>
            </div>

            <div>
              <Label htmlFor="pricePerJob">Average Price Per Job (£)</Label>
              <Input
                id="pricePerJob"
                type="number"
                placeholder="e.g. 450"
                value={pricePerJob}
                onChange={(e) => setPricePerJob(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="variableCostPerJob">Variable Cost Per Job (£)</Label>
              <Input
                id="variableCostPerJob"
                type="number"
                placeholder="e.g. 200"
                value={variableCostPerJob}
                onChange={(e) => setVariableCostPerJob(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Materials, fuel, direct labour costs
              </p>
            </div>

            <Button onClick={calculateBreakEven} className="w-full">
              Calculate Break-Even Point
            </Button>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">What is Break-Even Analysis?</h4>
              <p className="text-sm text-muted-foreground">
                Break-even analysis shows the minimum number of jobs needed to cover all your costs. 
                It helps you understand your business viability and set realistic targets.
              </p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Key Formulas</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Contribution Margin = Price - Variable Costs</p>
                <p>Break-Even = Fixed Costs ÷ Contribution Margin</p>
              </div>
            </div>
          </div>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
            <h3 className="font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Break-Even Analysis Results
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Contribution Margin</div>
                <div className="font-medium">£{result.contributionMargin.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">
                  ({result.contributionMarginPercent.toFixed(1)}%)
                </div>
              </div>
              <div className="bg-elec-yellow/10 p-2 rounded">
                <div className="text-muted-foreground">Break-Even Jobs</div>
                <div className="font-bold text-lg text-elec-yellow">{result.breakEvenJobs}</div>
                <div className="text-xs text-muted-foreground">per month</div>
              </div>
              <div>
                <div className="text-muted-foreground">Break-Even Revenue</div>
                <div className="font-medium">£{result.breakEvenRevenue.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">per month</div>
              </div>
              <div>
                <div className="text-muted-foreground">Weekly Target</div>
                <div className="font-medium">{Math.ceil(result.breakEvenJobs / 4)} jobs</div>
                <div className="text-xs text-muted-foreground">approximate</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-background/50 rounded border border-elec-yellow/10">
              <p className="text-sm text-muted-foreground">
                <strong>Tip:</strong> Jobs above your break-even point contribute directly to profit. 
                Aim for 20-30% more jobs than break-even for healthy profitability.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};